import { useState } from 'react';
import {
  Share2, Link2, Copy, Check, Mail, Users, Globe,
  Shield, Clock, Download, Eye, Edit2, MessageSquare,
  UserPlus, Settings, X, AlertCircle, CheckCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { ColorAvatar } from '@/components/ui/color-avatar';
import { cn } from '@/lib/utils';
import type { Document } from '@/types/document.types';

interface ShareSettings {
  allowDownload: boolean;
  allowPrint: boolean;
  allowComment: boolean;
  requirePassword: boolean;
  expiryDate?: string;
  password?: string;
}

interface SharedUser {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'editor' | 'reviewer';
  sharedAt: string;
  lastAccessed?: string;
}

interface DocumentShareDialogProps {
  document: Document;
  open: boolean;
  onClose: () => void;
  onShare: (emails: string[], settings: ShareSettings, message?: string) => void;
  onGenerateLink: (settings: ShareSettings) => string;
  onRevokeAccess: (userId: string) => void;
}

export default function DocumentShareDialog({
  document,
  open,
  onClose,
  onShare,
  onGenerateLink,
  onRevokeAccess
}: DocumentShareDialogProps) {
  const [shareMode, setShareMode] = useState<'email' | 'link'>('email');
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [permission, setPermission] = useState<'viewer' | 'editor' | 'reviewer'>('viewer');
  const [settings, setSettings] = useState<ShareSettings>({
    allowDownload: true,
    allowPrint: true,
    allowComment: false,
    requirePassword: false,
  });
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  
  // Sample shared users
  const [sharedUsers] = useState<SharedUser[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'viewer',
      sharedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'editor',
      sharedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'reviewer',
      sharedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  
  const handleGenerateLink = () => {
    const link = onGenerateLink(settings);
    const baseUrl = window.location.origin;
    setShareLink(`${baseUrl}/share/${document.id}?token=${link}`);
  };
  
  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleSendInvites = async () => {
    if (!emails.trim()) return;
    
    setSending(true);
    const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onShare(emailList, { ...settings, allowComment: permission !== 'viewer' }, message);
    setSending(false);
    setEmails('');
    setMessage('');
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getPermissionBadge = (role: string) => {
    const colors = {
      viewer: 'bg-gray-100 text-gray-700',
      editor: 'bg-blue-100 text-blue-700',
      reviewer: 'bg-purple-100 text-purple-700',
    };
    return colors[role as keyof typeof colors] || colors.viewer;
  };
  
  const getPermissionIcon = (role: string) => {
    switch (role) {
      case 'viewer':
        return <Eye className="h-3 w-3" />;
      case 'editor':
        return <Edit2 className="h-3 w-3" />;
      case 'reviewer':
        return <MessageSquare className="h-3 w-3" />;
      default:
        return <Eye className="h-3 w-3" />;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share "{document.title}"
          </DialogTitle>
          <DialogDescription>
            Share this document with team members or generate a public link
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={shareMode} onValueChange={(v) => setShareMode(v as 'email' | 'link')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email Invite
            </TabsTrigger>
            <TabsTrigger value="link">
              <Link2 className="h-4 w-4 mr-2" />
              Share Link
            </TabsTrigger>
            <TabsTrigger value="people">
              <Users className="h-4 w-4 mr-2" />
              People ({sharedUsers.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emails">Email addresses</Label>
              <Input
                id="emails"
                placeholder="Enter email addresses separated by commas"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permission">Permission level</Label>
              <Select value={permission} onValueChange={(v) => setPermission(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>Viewer - Can view only</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="editor">
                    <div className="flex items-center gap-2">
                      <Edit2 className="h-4 w-4" />
                      <span>Editor - Can view and edit</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="reviewer">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Reviewer - Can view and comment</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a message to the invitation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Share settings</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="download" className="text-sm">Allow download</Label>
                </div>
                <Switch
                  id="download"
                  checked={settings.allowDownload}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, allowDownload: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="password" className="text-sm">Require password</Label>
                </div>
                <Switch
                  id="password"
                  checked={settings.requirePassword}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, requirePassword: checked }))
                  }
                />
              </div>
              
              {settings.requirePassword && (
                <Input
                  placeholder="Enter password"
                  type="password"
                  value={settings.password || ''}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, password: e.target.value }))
                  }
                />
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="expiry" className="text-sm">Set expiry date</Label>
                </div>
                <Input
                  id="expiry"
                  type="date"
                  className="w-auto"
                  value={settings.expiryDate || ''}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, expiryDate: e.target.value }))
                  }
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSendInvites} disabled={!emails.trim() || sending}>
                {sending ? 'Sending...' : 'Send Invites'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="link" className="space-y-4">
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                Anyone with this link can access the document with the permissions you set
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Link settings</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="link-download" className="text-sm">Allow download</Label>
                </div>
                <Switch
                  id="link-download"
                  checked={settings.allowDownload}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, allowDownload: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="link-comment" className="text-sm">Allow comments</Label>
                </div>
                <Switch
                  id="link-comment"
                  checked={settings.allowComment}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, allowComment: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="link-password" className="text-sm">Password protect</Label>
                </div>
                <Switch
                  id="link-password"
                  checked={settings.requirePassword}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, requirePassword: checked }))
                  }
                />
              </div>
              
              {settings.requirePassword && (
                <Input
                  placeholder="Enter password"
                  type="password"
                  value={settings.password || ''}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, password: e.target.value }))
                  }
                />
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <Label htmlFor="link-expiry" className="text-sm">Link expires</Label>
                </div>
                <Input
                  id="link-expiry"
                  type="date"
                  className="w-auto"
                  value={settings.expiryDate || ''}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, expiryDate: e.target.value }))
                  }
                />
              </div>
            </div>
            
            <Separator />
            
            {!shareLink ? (
              <Button onClick={handleGenerateLink} className="w-full">
                <Link2 className="h-4 w-4 mr-2" />
                Generate Share Link
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={shareLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant={copied ? "default" : "outline"}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Share link created successfully. This link will expire on {
                      settings.expiryDate 
                        ? new Date(settings.expiryDate).toLocaleDateString()
                        : 'never'
                    }
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="people" className="space-y-4">
            <div className="space-y-2">
              {sharedUsers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No one has access to this document yet</p>
                  <p className="text-sm">Share this document to collaborate with others</p>
                </div>
              ) : (
                sharedUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <ColorAvatar
                        name={user.name}
                        email={user.email}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          Shared {formatDate(user.sharedAt)}
                          {user.lastAccessed && (
                            <> • Last accessed {formatDate(user.lastAccessed)}</>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-xs", getPermissionBadge(user.role))}>
                        <span className="flex items-center gap-1">
                          {getPermissionIcon(user.role)}
                          {user.role}
                        </span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRevokeAccess(user.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
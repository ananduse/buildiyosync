import { useState, useMemo } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Search,
  Filter,
  Plus,
  Star,
  Archive,
  Trash2,
  MoreHorizontal,
  User,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Circle,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Calendar,
  Settings,
  Bookmark,
  Tag,
  Pin,
  Reply,
  Forward,
  Download,
  Eye,
  Bell,
  BellOff,
  Zap,
  Activity,
  TrendingUp,
  Building2,
  MapPin,
  Target,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  temperature: 'hot' | 'warm' | 'cold';
  assignedTo: {
    name: string;
    avatar: string;
  };
  lastActivity: Date;
}

interface Message {
  id: string;
  leadId: string;
  lead: Lead;
  type: 'email' | 'sms' | 'whatsapp' | 'call' | 'meeting' | 'note';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  from: string;
  to: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'scheduled';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  attachments?: {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  metadata?: {
    duration?: number; // for calls
    location?: string; // for meetings
    template?: string; // for templated messages
  };
}

interface CommunicationChannel {
  id: string;
  type: 'email' | 'sms' | 'whatsapp' | 'voice' | 'video';
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  unreadCount: number;
  color: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  type: 'email' | 'sms' | 'whatsapp' | 'call' | 'meeting';
  template?: string;
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    contact: 'John Smith',
    phone: '+1 555-123-4567',
    email: 'john@acme.com',
    status: 'qualified',
    temperature: 'hot',
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    lastActivity: new Date(2024, 0, 18)
  },
  {
    id: 'L002',
    name: 'TechStart Inc',
    company: 'TechStart Inc',
    contact: 'Emily Davis',
    phone: '+1 555-987-6543',
    email: 'emily@techstart.com',
    status: 'proposal',
    temperature: 'warm',
    assignedTo: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    lastActivity: new Date(2024, 0, 17)
  }
];

const mockMessages: Message[] = [
  {
    id: 'M001',
    leadId: 'L001',
    lead: mockLeads[0],
    type: 'email',
    direction: 'inbound',
    subject: 'Re: Project Proposal Follow-up',
    content: 'Hi Sarah, thank you for the detailed proposal. We have reviewed it and have a few questions. Could we schedule a call this week?',
    from: 'john@acme.com',
    to: 'sarah@company.com',
    timestamp: new Date(2024, 0, 20, 14, 30),
    status: 'read',
    priority: 'high',
    tags: ['proposal', 'follow-up'],
    attachments: [
      {
        id: 'A001',
        name: 'Requirements_v2.pdf',
        size: 245000,
        type: 'pdf',
        url: '/files/requirements_v2.pdf'
      }
    ]
  },
  {
    id: 'M002',
    leadId: 'L002',
    lead: mockLeads[1],
    type: 'whatsapp',
    direction: 'outbound',
    content: 'Hi Emily! Following up on our meeting yesterday. The proposal is ready for your review. 📋',
    from: 'Mike Chen',
    to: '+1 555-987-6543',
    timestamp: new Date(2024, 0, 20, 10, 15),
    status: 'delivered',
    priority: 'medium',
    tags: ['follow-up'],
    metadata: {
      template: 'proposal-ready'
    }
  },
  {
    id: 'M003',
    leadId: 'L001',
    lead: mockLeads[0],
    type: 'call',
    direction: 'outbound',
    content: 'Initial qualification call - discussed project scope and budget',
    from: 'Sarah Johnson',
    to: '+1 555-123-4567',
    timestamp: new Date(2024, 0, 19, 16, 0),
    status: 'delivered',
    priority: 'high',
    tags: ['qualification'],
    metadata: {
      duration: 1800 // 30 minutes
    }
  }
];

const channels: CommunicationChannel[] = [
  {
    id: 'email',
    type: 'email',
    name: 'Email',
    icon: Mail,
    enabled: true,
    unreadCount: 12,
    color: 'text-blue-600'
  },
  {
    id: 'sms',
    type: 'sms',
    name: 'SMS',
    icon: MessageSquare,
    enabled: true,
    unreadCount: 3,
    color: 'text-green-600'
  },
  {
    id: 'whatsapp',
    type: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageSquare,
    enabled: true,
    unreadCount: 7,
    color: 'text-emerald-600'
  },
  {
    id: 'voice',
    type: 'voice',
    name: 'Voice Calls',
    icon: Phone,
    enabled: true,
    unreadCount: 0,
    color: 'text-purple-600'
  },
  {
    id: 'video',
    type: 'video',
    name: 'Video Calls',
    icon: Video,
    enabled: false,
    unreadCount: 0,
    color: 'text-indigo-600'
  }
];

const quickActions: QuickAction[] = [
  {
    id: 'quick-email',
    label: 'Send Email',
    icon: Mail,
    type: 'email'
  },
  {
    id: 'quick-sms',
    label: 'Send SMS',
    icon: MessageSquare,
    type: 'sms'
  },
  {
    id: 'quick-whatsapp',
    label: 'WhatsApp',
    icon: MessageSquare,
    type: 'whatsapp'
  },
  {
    id: 'quick-call',
    label: 'Make Call',
    icon: Phone,
    type: 'call'
  },
  {
    id: 'schedule-meeting',
    label: 'Schedule Meeting',
    icon: Calendar,
    type: 'meeting'
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60);
    return `${minutes}m ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function getMessageTypeIcon(type: Message['type']) {
  switch (type) {
    case 'email': return Mail;
    case 'sms': return MessageSquare;
    case 'whatsapp': return MessageSquare;
    case 'call': return Phone;
    case 'meeting': return Calendar;
    case 'note': return FileText;
    default: return MessageSquare;
  }
}

function getStatusColor(status: Message['status']) {
  switch (status) {
    case 'sent': return 'text-blue-600';
    case 'delivered': return 'text-emerald-600';
    case 'read': return 'text-purple-600';
    case 'failed': return 'text-red-600';
    case 'scheduled': return 'text-amber-600';
    default: return 'text-gray-600';
  }
}

function getStatusIcon(status: Message['status']) {
  switch (status) {
    case 'sent': return Circle;
    case 'delivered': return CheckCircle;
    case 'read': return CheckCircle;
    case 'failed': return AlertCircle;
    case 'scheduled': return Clock;
    default: return Circle;
  }
}

function ChannelCard({ channel, onClick, isActive }: { 
  channel: CommunicationChannel; 
  onClick: () => void;
  isActive: boolean;
}) {
  const Icon = channel.icon;
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isActive && "ring-2 ring-primary shadow-md"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn("p-2 rounded-lg", channel.color.replace('text-', 'bg-').replace('600', '100'))}>
              <Icon className={cn("h-5 w-5", channel.color)} />
            </div>
            <div>
              <h3 className="font-semibold">{channel.name}</h3>
              <p className="text-sm text-gray-500">
                {channel.enabled ? 'Active' : 'Disabled'}
              </p>
            </div>
          </div>
          
          {channel.unreadCount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              {channel.unreadCount}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MessageCard({ message, onReply, onForward }: { 
  message: Message; 
  onReply: () => void;
  onForward: () => void;
}) {
  const Icon = getMessageTypeIcon(message.type);
  const StatusIcon = getStatusIcon(message.status);
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={message.lead.assignedTo.avatar} />
            <AvatarFallback>
              {getInitials(message.lead.contact)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{message.lead.contact}</h4>
                  <Badge variant="outline" className="text-xs">
                    {message.lead.company}
                  </Badge>
                  <div className={cn("p-1 rounded", message.type === 'whatsapp' ? 'bg-emerald-100' : 'bg-blue-100')}>
                    <Icon className={cn("h-3 w-3", message.type === 'whatsapp' ? 'text-emerald-600' : 'text-blue-600')} />
                  </div>
                </div>
                {message.subject && (
                  <p className="text-sm font-medium text-gray-700 mt-1">{message.subject}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <StatusIcon className={cn("h-3 w-3", getStatusColor(message.status))} />
                  <span>{formatTimestamp(message.timestamp)}</span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onReply}>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onForward}>
                      <Forward className="h-4 w-4 mr-2" />
                      Forward
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2" />
                      Star
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{message.content}</p>
            
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {message.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center space-x-2 p-2 border rounded-lg bg-gray-50">
                    <Paperclip className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{attachment.name}</span>
                    <span className="text-xs text-gray-500">
                      ({(attachment.size / 1024).toFixed(1)}KB)
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {message.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {message.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {message.metadata?.duration && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Duration: {Math.floor(message.metadata.duration / 60)}:{(message.metadata.duration % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComposeModal({ isOpen, onClose, type, leadId }: {
  isOpen: boolean;
  onClose: () => void;
  type: 'email' | 'sms' | 'whatsapp' | 'call';
  leadId?: string;
}) {
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Compose {type === 'email' ? 'Email' : type === 'sms' ? 'SMS' : type === 'whatsapp' ? 'WhatsApp' : 'Call Notes'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>To</Label>
            <Input placeholder="Select or enter recipient..." />
          </div>
          
          {type === 'email' && (
            <div>
              <Label>Subject</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
              />
            </div>
          )}
          
          <div>
            <Label>Message</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Enter your ${type} message...`}
              rows={6}
            />
          </div>
          
          {type === 'email' && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach File
              </Button>
              <Button variant="outline" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CommunicationHub() {
  const [selectedChannel, setSelectedChannel] = useState<string>('email');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState<'email' | 'sms' | 'whatsapp' | 'call'>('email');

  const filteredMessages = useMemo(() => {
    return mockMessages.filter(message => {
      const matchesSearch = !searchQuery || 
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.lead.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesChannel = selectedChannel === 'all' || message.type === selectedChannel;
      const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
      
      return matchesSearch && matchesChannel && matchesStatus;
    });
  }, [searchQuery, selectedChannel, filterStatus]);

  const handleCompose = (type: typeof composeType) => {
    setComposeType(type);
    setShowCompose(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Communication Hub</h1>
              <Badge variant="secondary">
                {channels.reduce((sum, c) => sum + c.unreadCount, 0)} unread
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Compose
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleCompose('email')}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCompose('sms')}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    SMS
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCompose('whatsapp')}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleCompose('call')}>
                    <Phone className="h-4 w-4 mr-2" />
                    Log Call
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Left Sidebar - Channels */}
          <div className="w-80 bg-white border-r flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-4">Communication Channels</h3>
              
              <div className="space-y-2">
                <ChannelCard
                  channel={{
                    id: 'all',
                    type: 'email',
                    name: 'All Messages',
                    icon: Activity,
                    enabled: true,
                    unreadCount: channels.reduce((sum, c) => sum + c.unreadCount, 0),
                    color: 'text-gray-600'
                  }}
                  onClick={() => setSelectedChannel('all')}
                  isActive={selectedChannel === 'all'}
                />
                
                {channels.map((channel) => (
                  <ChannelCard
                    key={channel.id}
                    channel={channel}
                    onClick={() => setSelectedChannel(channel.id)}
                    isActive={selectedChannel === channel.id}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b">
              <h4 className="font-semibold mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleCompose(action.type as typeof composeType)}
                      className="justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Communication Stats */}
            <div className="p-4">
              <h4 className="font-semibold mb-3">Today's Activity</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span>Emails</span>
                  </div>
                  <Badge variant="secondary">23 sent</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <span>Messages</span>
                  </div>
                  <Badge variant="secondary">15 sent</Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-purple-600" />
                    <span>Calls</span>
                  </div>
                  <Badge variant="secondary">8 made</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Tabs defaultValue="messages" className="flex-1 flex flex-col">
              <div className="border-b px-4 py-2">
                <TabsList>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="messages" className="flex-1 p-4">
                <div className="space-y-4">
                  {filteredMessages.length === 0 ? (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold mb-2">No messages found</h3>
                        <p className="text-gray-500 mb-4">
                          {searchQuery ? 'Try adjusting your search criteria' : 'Start a conversation with your leads'}
                        </p>
                        <Button onClick={() => handleCompose('email')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredMessages.map((message) => (
                      <MessageCard
                        key={message.id}
                        message={message}
                        onReply={() => handleCompose(message.type as typeof composeType)}
                        onForward={() => {}}
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="scheduled" className="flex-1 p-4">
                <Card>
                  <CardContent className="p-12 text-center">
                    <Clock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Scheduled Messages</h3>
                    <p className="text-gray-500">Manage your scheduled communications</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="templates" className="flex-1 p-4">
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Message Templates</h3>
                    <p className="text-gray-500">Create and manage reusable templates</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="flex-1 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Response Rate</p>
                          <p className="text-2xl font-bold">68%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-emerald-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Avg Response Time</p>
                          <p className="text-2xl font-bold">2.4h</p>
                        </div>
                        <Clock className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Messages Today</p>
                          <p className="text-2xl font-bold">47</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Engagement Score</p>
                          <p className="text-2xl font-bold">8.7</p>
                        </div>
                        <Zap className="h-8 w-8 text-amber-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Compose Modal */}
        <ComposeModal
          isOpen={showCompose}
          onClose={() => setShowCompose(false)}
          type={composeType}
        />
      </div>
    </TooltipProvider>
  );
}
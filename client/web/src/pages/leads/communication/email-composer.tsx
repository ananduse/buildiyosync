import { useState, useRef, useMemo } from 'react';
import {
  Mail,
  Send,
  Save,
  Paperclip,
  Image,
  Smile,
  Bold,
  Italic,
  Underline,
  List,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  Eye,
  Clock,
  Users,
  Plus,
  X,
  ChevronDown,
  FileText,
  Calendar,
  Star,
  Copy,
  Trash2,
  Settings,
  Zap,
  BookOpen,
  History,
  Upload,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Building2,
  Tag,
  Target,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'welcome' | 'follow-up' | 'proposal' | 'meeting' | 'closing' | 'custom';
  variables: string[];
  usage: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface EmailDraft {
  id: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  content: string;
  attachments: Attachment[];
  templateId?: string;
  scheduledAt?: Date;
  priority: 'high' | 'medium' | 'low';
  trackOpens: boolean;
  trackClicks: boolean;
  requireResponse: boolean;
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    contact: 'John Smith',
    email: 'john@acme.com',
    phone: '+1 555-123-4567',
    status: 'qualified',
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' }
  },
  {
    id: 'L002',
    name: 'TechStart Inc',
    company: 'TechStart Inc',
    contact: 'Emily Davis',
    email: 'emily@techstart.com',
    phone: '+1 555-987-6543',
    status: 'proposal',
    assignedTo: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' }
  }
];

const mockTemplates: EmailTemplate[] = [
  {
    id: 'T001',
    name: 'Welcome New Lead',
    subject: 'Welcome to {{company}} - Next Steps',
    content: `Hi {{contact_name}},

Thank you for your interest in our services! I'm {{assigned_to}}, and I'll be your dedicated contact throughout this process.

I've reviewed your initial requirements for {{project_type}}, and I believe we can provide exactly what you're looking for.

Next steps:
1. I'll prepare a custom proposal based on your needs
2. We'll schedule a call to discuss details
3. I'll provide you with references from similar projects

I'll reach out within the next 24 hours to schedule our conversation.

Best regards,
{{assigned_to}}
{{company}}`,
    category: 'welcome',
    variables: ['contact_name', 'company', 'assigned_to', 'project_type'],
    usage: 145,
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 18)
  },
  {
    id: 'T002',
    name: 'Proposal Follow-up',
    subject: 'Following up on your {{project_type}} proposal',
    content: `Hi {{contact_name}},

I wanted to follow up on the proposal I sent for your {{project_type}} project.

Key highlights from our proposal:
• Estimated timeline: {{timeline}}
• Total investment: {{budget_range}}
• Included services: {{services}}

I'm available to discuss any questions you might have or to schedule a call to walk through the details together.

Would you be available for a brief call this week?

Best regards,
{{assigned_to}}`,
    category: 'follow-up',
    variables: ['contact_name', 'project_type', 'timeline', 'budget_range', 'services', 'assigned_to'],
    usage: 89,
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 20)
  },
  {
    id: 'T003',
    name: 'Meeting Confirmation',
    subject: 'Meeting Confirmation - {{date}} at {{time}}',
    content: `Hi {{contact_name}},

This is to confirm our meeting scheduled for {{date}} at {{time}}.

Meeting Details:
• Date & Time: {{date}} at {{time}}
• Duration: {{duration}}
• Location/Platform: {{location}}
• Agenda: {{agenda}}

Please let me know if you need to reschedule or have any questions before our meeting.

Looking forward to speaking with you!

Best regards,
{{assigned_to}}`,
    category: 'meeting',
    variables: ['contact_name', 'date', 'time', 'duration', 'location', 'agenda', 'assigned_to'],
    usage: 67,
    createdAt: new Date(2024, 0, 12),
    updatedAt: new Date(2024, 0, 19)
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function ToolbarButton({ icon: Icon, label, isActive, onClick }: {
  icon: React.ComponentType<any>;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip content={label}>
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        onClick={onClick}
        className="h-8 w-8 p-0"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}

function RecipientSelector({ 
  recipients, 
  onAdd, 
  onRemove, 
  placeholder,
  leads 
}: {
  recipients: string[];
  onAdd: (email: string) => void;
  onRemove: (email: string) => void;
  placeholder: string;
  leads: Lead[];
}) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(() => {
    if (!inputValue) return [];
    return leads.filter(lead => 
      lead.email.toLowerCase().includes(inputValue.toLowerCase()) ||
      lead.contact.toLowerCase().includes(inputValue.toLowerCase()) ||
      lead.company.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5);
  }, [inputValue, leads]);

  const handleAddRecipient = (email: string) => {
    if (email && !recipients.includes(email)) {
      onAdd(email);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg min-h-10">
        {recipients.map((email) => (
          <Badge key={email} variant="secondary" className="px-2 py-1">
            {email}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
              onClick={() => onRemove(email)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValue) {
              e.preventDefault();
              handleAddRecipient(inputValue);
            }
          }}
          placeholder={recipients.length === 0 ? placeholder : ''}
          className="border-none shadow-none flex-1 min-w-32"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-10 mt-1">
          <CardContent className="p-2">
            {suggestions.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleAddRecipient(lead.email)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {getInitials(lead.contact)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{lead.contact}</p>
                  <p className="text-xs text-gray-500">{lead.email} • {lead.company}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TemplateSelector({ 
  templates, 
  onSelect 
}: { 
  templates: EmailTemplate[]; 
  onSelect: (template: EmailTemplate) => void; 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = !searchQuery || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, templates]);

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'welcome', label: 'Welcome' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'closing', label: 'Closing' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(template)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{template.name}</h4>
                      <Badge variant="outline" className="text-xs capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{template.content.substring(0, 100)}...</p>
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{template.usage} uses</span>
                      <span>Variables: {template.variables.length}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function AttachmentManager({ 
  attachments, 
  onAdd, 
  onRemove 
}: {
  attachments: Attachment[];
  onAdd: (file: File) => void;
  onRemove: (id: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => onAdd(file));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-4 w-4 mr-2" />
          Attach File
        </Button>
        
        <Button variant="outline" size="sm">
          <Image className="h-4 w-4 mr-2" />
          Insert Image
        </Button>
        
        <Button variant="outline" size="sm">
          <Link2 className="h-4 w-4 mr-2" />
          Insert Link
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {attachments.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Attachments ({attachments.length})</Label>
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center space-x-3 p-2 border rounded-lg">
              <FileText className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">{attachment.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(attachment.id)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EmailComposer() {
  const [draft, setDraft] = useState<EmailDraft>({
    id: 'draft-1',
    to: [],
    cc: [],
    bcc: [],
    subject: '',
    content: '',
    attachments: [],
    priority: 'medium',
    trackOpens: true,
    trackClicks: true,
    requireResponse: false
  });

  const [showCcBcc, setShowCcBcc] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setDraft(prev => ({
      ...prev,
      subject: template.subject,
      content: template.content,
      templateId: template.id
    }));
    setShowTemplates(false);
  };

  const handleSendEmail = () => {
    // Validate required fields
    if (draft.to.length === 0) {
      alert('Please add at least one recipient');
      return;
    }
    
    if (!draft.subject.trim()) {
      alert('Please add a subject');
      return;
    }
    
    if (!draft.content.trim()) {
      alert('Please add content to your email');
      return;
    }

    // Here you would typically send the email via your API
    console.log('Sending email:', draft);
    alert('Email sent successfully!');
  };

  const handleSaveDraft = () => {
    // Save draft logic
    console.log('Saving draft:', draft);
    alert('Draft saved!');
  };

  const handleAddAttachment = (file: File) => {
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    };
    
    setDraft(prev => ({
      ...prev,
      attachments: [...prev.attachments, newAttachment]
    }));
  };

  const handleRemoveAttachment = (id: string) => {
    setDraft(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== id)
    }));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Compose Email</h1>
              <Badge variant="secondary">Draft</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Send
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSendEmail}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSchedule(true)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Send
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button onClick={handleSendEmail}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Main Composer */}
          <div className="flex-1 flex flex-col bg-white">
            {!isPreview ? (
              <>
                {/* Compose Header */}
                <div className="p-6 border-b space-y-4">
                  {/* Recipients */}
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">To</Label>
                      <RecipientSelector
                        recipients={draft.to}
                        onAdd={(email) => setDraft(prev => ({ ...prev, to: [...prev.to, email] }))}
                        onRemove={(email) => setDraft(prev => ({ ...prev, to: prev.to.filter(e => e !== email) }))}
                        placeholder="Enter recipient emails..."
                        leads={mockLeads}
                      />
                    </div>

                    {(showCcBcc || draft.cc.length > 0 || draft.bcc.length > 0) && (
                      <>
                        <div>
                          <Label className="text-sm font-medium mb-2 block">CC</Label>
                          <RecipientSelector
                            recipients={draft.cc}
                            onAdd={(email) => setDraft(prev => ({ ...prev, cc: [...prev.cc, email] }))}
                            onRemove={(email) => setDraft(prev => ({ ...prev, cc: prev.cc.filter(e => e !== email) }))}
                            placeholder="CC recipients..."
                            leads={mockLeads}
                          />
                        </div>

                        <div>
                          <Label className="text-sm font-medium mb-2 block">BCC</Label>
                          <RecipientSelector
                            recipients={draft.bcc}
                            onAdd={(email) => setDraft(prev => ({ ...prev, bcc: [...prev.bcc, email] }))}
                            onRemove={(email) => setDraft(prev => ({ ...prev, bcc: prev.bcc.filter(e => e !== email) }))}
                            placeholder="BCC recipients..."
                            leads={mockLeads}
                          />
                        </div>
                      </>
                    )}

                    {!showCcBcc && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowCcBcc(true)}
                        className="text-blue-600"
                      >
                        + Add CC/BCC
                      </Button>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Subject</Label>
                    <Input
                      value={draft.subject}
                      onChange={(e) => setDraft(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Enter email subject..."
                      className="text-base"
                    />
                  </div>

                  {/* Priority and Options */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm">Priority:</Label>
                      <Select 
                        value={draft.priority} 
                        onValueChange={(value: any) => setDraft(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={draft.trackOpens}
                        onCheckedChange={(checked) => setDraft(prev => ({ ...prev, trackOpens: checked }))}
                      />
                      <Label className="text-sm">Track Opens</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={draft.trackClicks}
                        onCheckedChange={(checked) => setDraft(prev => ({ ...prev, trackClicks: checked }))}
                      />
                      <Label className="text-sm">Track Clicks</Label>
                    </div>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center space-x-1 p-3 border-b bg-gray-50">
                  <ToolbarButton icon={Bold} label="Bold" onClick={() => {}} />
                  <ToolbarButton icon={Italic} label="Italic" onClick={() => {}} />
                  <ToolbarButton icon={Underline} label="Underline" onClick={() => {}} />
                  <Separator orientation="vertical" className="h-6" />
                  <ToolbarButton icon={AlignLeft} label="Align Left" onClick={() => {}} />
                  <ToolbarButton icon={AlignCenter} label="Align Center" onClick={() => {}} />
                  <ToolbarButton icon={AlignRight} label="Align Right" onClick={() => {}} />
                  <Separator orientation="vertical" className="h-6" />
                  <ToolbarButton icon={List} label="Bullet List" onClick={() => {}} />
                  <ToolbarButton icon={Link2} label="Insert Link" onClick={() => {}} />
                  <ToolbarButton icon={Image} label="Insert Image" onClick={() => {}} />
                  <Separator orientation="vertical" className="h-6" />
                  <ToolbarButton icon={Type} label="Font Size" onClick={() => {}} />
                  <ToolbarButton icon={Palette} label="Text Color" onClick={() => {}} />
                  <Separator orientation="vertical" className="h-6" />
                  <ToolbarButton icon={Smile} label="Insert Emoji" onClick={() => {}} />
                </div>

                {/* Content Editor */}
                <div className="flex-1 p-6">
                  <Textarea
                    value={draft.content}
                    onChange={(e) => setDraft(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Compose your email..."
                    className="w-full h-full resize-none text-base leading-relaxed"
                  />
                </div>

                {/* Attachments */}
                {(draft.attachments.length > 0 || showCcBcc) && (
                  <div className="p-6 border-t">
                    <AttachmentManager
                      attachments={draft.attachments}
                      onAdd={handleAddAttachment}
                      onRemove={handleRemoveAttachment}
                    />
                  </div>
                )}
              </>
            ) : (
              /* Preview Mode */
              <div className="flex-1 p-6">
                <Card>
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold">Email Preview</span>
                        </div>
                        <Badge className={cn(
                          draft.priority === 'high' && 'bg-red-500',
                          draft.priority === 'medium' && 'bg-amber-500',
                          draft.priority === 'low' && 'bg-green-500'
                        )}>
                          {draft.priority} priority
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        <div>To: {draft.to.join(', ')}</div>
                        {draft.cc.length > 0 && <div>CC: {draft.cc.join(', ')}</div>}
                        {draft.bcc.length > 0 && <div>BCC: {draft.bcc.join(', ')}</div>}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{draft.subject}</h3>
                      </div>
                      
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700">
                          {draft.content}
                        </div>
                      </div>
                      
                      {draft.attachments.length > 0 && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Attachments ({draft.attachments.length})</h4>
                          <div className="flex flex-wrap gap-2">
                            {draft.attachments.map((attachment) => (
                              <Badge key={attachment.id} variant="outline">
                                <FileText className="h-3 w-3 mr-1" />
                                {attachment.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-gray-50 border-l flex flex-col">
            <Tabs defaultValue="templates" className="flex-1">
              <div className="border-b p-4">
                <TabsList className="w-full">
                  <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
                  <TabsTrigger value="variables" className="flex-1">Variables</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="templates" className="flex-1 p-4">
                <TemplateSelector
                  templates={mockTemplates}
                  onSelect={handleTemplateSelect}
                />
              </TabsContent>

              <TabsContent value="variables" className="flex-1 p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Available Variables</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Lead Information</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {['{{contact_name}}', '{{company}}', '{{email}}', '{{phone}}', '{{status}}', '{{assigned_to}}'].map((variable) => (
                          <Button
                            key={variable}
                            variant="outline"
                            size="sm"
                            className="text-xs justify-start h-8"
                            onClick={() => setDraft(prev => ({ ...prev, content: prev.content + ' ' + variable }))}
                          >
                            {variable}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Project Details</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {['{{project_type}}', '{{budget_range}}', '{{timeline}}', '{{services}}'].map((variable) => (
                          <Button
                            key={variable}
                            variant="outline"
                            size="sm"
                            className="text-xs justify-start h-8"
                            onClick={() => setDraft(prev => ({ ...prev, content: prev.content + ' ' + variable }))}
                          >
                            {variable}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Schedule Dialog */}
        <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Send Date & Time</Label>
                <Input type="datetime-local" />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSchedule(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowSchedule(false)}>
                  Schedule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default EmailComposer;
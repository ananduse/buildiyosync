import { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Plus,
  Search,
  Filter,
  Archive,
  Star,
  Reply,
  Forward,
  Paperclip,
  Download,
  MoreHorizontal,
  Trash2,
  Edit,
  PhoneCall,
  Video,
  Clock,
  User,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeadCommunicationsProps {
  leadId: string;
}

interface Communication {
  id: string;
  type: 'email' | 'sms' | 'call' | 'video_call' | 'chat';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  timestamp: string;
  status: 'delivered' | 'read' | 'replied' | 'failed' | 'pending';
  participants: {
    from: {
      name: string;
      email: string;
      phone?: string;
      avatar: string;
      role: string;
    };
    to: {
      name: string;
      email: string;
      phone?: string;
      avatar: string;
      role: string;
    }[];
  };
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
  metadata?: {
    duration?: string;
    callQuality?: 'excellent' | 'good' | 'fair' | 'poor';
    outcome?: string;
    followUpRequired?: boolean;
  };
  isStarred?: boolean;
  isArchived?: boolean;
}

interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms';
  subject?: string;
  content: string;
  category: string;
}

// Mock communications data
const mockCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    direction: 'outbound',
    subject: 'Project Proposal - Acme Corporation Office Complex',
    content: 'Dear John,\n\nThank you for taking the time to discuss your upcoming office complex project. As promised, I\'ve attached our comprehensive proposal including cost breakdown, timeline, and sustainable features.\n\nKey highlights:\n- Energy-efficient design reducing operating costs by 30%\n- Flexible floor plans accommodating future growth\n- Premium materials and modern aesthetic\n- Completion within 12 months\n\nI\'m confident our team can deliver exceptional results within your budget of $75,000. Please review the attached documents and let me know if you have any questions.\n\nLooking forward to moving forward together.\n\nBest regards,\nSarah Johnson',
    timestamp: '2024-01-15T10:15:00Z',
    status: 'read',
    participants: {
      from: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@buildingcompany.com',
        avatar: '/avatars/sarah.jpg',
        role: 'Sales Manager'
      },
      to: [{
        name: 'John Smith',
        email: 'john.smith@acme.com',
        avatar: '/avatars/john.jpg',
        role: 'Client'
      }]
    },
    attachments: [
      { name: 'Project_Proposal_v1.pdf', size: '2.1 MB', type: 'pdf' },
      { name: 'Cost_Breakdown.xlsx', size: '456 KB', type: 'excel' }
    ],
    isStarred: true
  },
  {
    id: '2',
    type: 'call',
    direction: 'outbound',
    content: 'Follow-up call to discuss proposal feedback and address client questions about sustainable features and timeline.',
    timestamp: '2024-01-14T14:30:00Z',
    status: 'delivered',
    participants: {
      from: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@buildingcompany.com',
        phone: '+1 (555) 123-4567',
        avatar: '/avatars/sarah.jpg',
        role: 'Sales Manager'
      },
      to: [{
        name: 'John Smith',
        email: 'john.smith@acme.com',
        phone: '+1 (555) 987-6543',
        avatar: '/avatars/john.jpg',
        role: 'Client'
      }]
    },
    metadata: {
      duration: '25 minutes',
      callQuality: 'excellent',
      outcome: 'Positive - Client interested, requesting site visit',
      followUpRequired: true
    }
  },
  {
    id: '3',
    type: 'email',
    direction: 'inbound',
    subject: 'Re: Project Proposal - Acme Corporation Office Complex',
    content: 'Hi Sarah,\n\nThank you for the comprehensive proposal. The team is impressed with your approach to sustainable building and the cost breakdown looks reasonable.\n\nWe have a few questions:\n1. Can you provide more details about the solar panel integration?\n2. What\'s the warranty coverage for the sustainable features?\n3. Are there any tax incentives we should be aware of?\n\nWe\'d also like to schedule a site visit next week if possible.\n\nBest regards,\nJohn Smith',
    timestamp: '2024-01-13T16:45:00Z',
    status: 'replied',
    participants: {
      from: {
        name: 'John Smith',
        email: 'john.smith@acme.com',
        avatar: '/avatars/john.jpg',
        role: 'Client'
      },
      to: [{
        name: 'Sarah Johnson',
        email: 'sarah.johnson@buildingcompany.com',
        avatar: '/avatars/sarah.jpg',
        role: 'Sales Manager'
      }]
    }
  },
  {
    id: '4',
    type: 'sms',
    direction: 'outbound',
    content: 'Hi John, just confirming our site visit scheduled for tomorrow at 2 PM. Please let me know if you need to reschedule. - Sarah',
    timestamp: '2024-01-12T11:30:00Z',
    status: 'delivered',
    participants: {
      from: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@buildingcompany.com',
        phone: '+1 (555) 123-4567',
        avatar: '/avatars/sarah.jpg',
        role: 'Sales Manager'
      },
      to: [{
        name: 'John Smith',
        email: 'john.smith@acme.com',
        phone: '+1 (555) 987-6543',
        avatar: '/avatars/john.jpg',
        role: 'Client'
      }]
    }
  },
  {
    id: '5',
    type: 'video_call',
    direction: 'outbound',
    content: 'Video conference to present initial design concepts and gather client feedback on architectural preferences.',
    timestamp: '2024-01-10T15:00:00Z',
    status: 'delivered',
    participants: {
      from: {
        name: 'Mike Chen',
        email: 'mike.chen@buildingcompany.com',
        avatar: '/avatars/mike.jpg',
        role: 'Project Manager'
      },
      to: [{
        name: 'John Smith',
        email: 'john.smith@acme.com',
        avatar: '/avatars/john.jpg',
        role: 'Client'
      }, {
        name: 'Jane Doe',
        email: 'jane.doe@acme.com',
        avatar: '/avatars/jane.jpg',
        role: 'Architect'
      }]
    },
    metadata: {
      duration: '45 minutes',
      callQuality: 'good',
      outcome: 'Client approved design direction, requested minor modifications'
    }
  }
];

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Initial Proposal Follow-up',
    type: 'email',
    subject: 'Follow-up on Your Project Proposal',
    content: 'Dear [Client Name],\n\nI hope this email finds you well. I wanted to follow up on the proposal we submitted for your [Project Type] project.\n\nOur team is excited about the opportunity to work with you and bring your vision to life. If you have any questions about the proposal or would like to discuss any aspects in more detail, please don\'t hesitate to reach out.\n\nWe\'re here to ensure the project meets all your requirements and expectations.\n\nBest regards,\n[Your Name]',
    category: 'Follow-up'
  },
  {
    id: '2',
    name: 'Appointment Reminder',
    type: 'sms',
    content: 'Hi [Client Name], this is a friendly reminder about our meeting scheduled for [Date] at [Time]. Looking forward to discussing your project! - [Your Name]',
    category: 'Reminders'
  },
  {
    id: '3',
    name: 'Thank You After Meeting',
    type: 'email',
    subject: 'Thank you for your time today',
    content: 'Dear [Client Name],\n\nThank you for taking the time to meet with us today. It was great to learn more about your project requirements and vision.\n\nAs discussed, we will:\n- [Action Item 1]\n- [Action Item 2]\n- [Action Item 3]\n\nWe will follow up with you by [Date] with the requested information.\n\nThank you again for considering us for your project.\n\nBest regards,\n[Your Name]',
    category: 'Thank You'
  }
];

function CommunicationIcon({ type, direction }: { type: Communication['type']; direction: Communication['direction'] }) {
  const iconMap = {
    email: Mail,
    sms: MessageSquare,
    call: Phone,
    video_call: Video,
    chat: MessageSquare
  };
  
  const Icon = iconMap[type];
  
  return (
    <div className={`p-2 rounded-full ${direction === 'inbound' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}

function CommunicationCard({ 
  communication, 
  onReply, 
  onForward, 
  onDelete 
}: { 
  communication: Communication;
  onReply: (comm: Communication) => void;
  onForward: (comm: Communication) => void;
  onDelete: (commId: string) => void;
}) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: diffInHours > 8760 ? 'numeric' : undefined
      });
    }
  };

  const getStatusIcon = (status: Communication['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'read':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'replied':
        return <Reply className="h-4 w-4 text-purple-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className={`hover:shadow-sm transition-shadow ${communication.direction === 'inbound' ? 'bg-blue-50/50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <CommunicationIcon type={communication.type} direction={communication.direction} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage 
                    src={communication.participants.from.avatar} 
                    alt={communication.participants.from.name} 
                  />
                  <AvatarFallback className="text-xs">
                    {communication.participants.from.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">
                  {communication.direction === 'inbound' ? 'From' : 'To'}: {communication.participants.from.name}
                </span>
                {communication.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {getStatusIcon(communication.status)}
                  <span className="text-xs text-muted-foreground capitalize">{communication.status}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(communication.timestamp)}
                </span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {communication.type === 'email' && (
                      <>
                        <DropdownMenuItem onClick={() => onReply(communication)}>
                          <Reply className="h-4 w-4 mr-2" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onForward(communication)}>
                          <Forward className="h-4 w-4 mr-2" />
                          Forward
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem>
                      <Star className="h-4 w-4 mr-2" />
                      {communication.isStarred ? 'Unstar' : 'Star'}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => onDelete(communication.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {communication.subject && (
              <h3 className="font-medium mb-2">{communication.subject}</h3>
            )}
            
            <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
              {communication.content}
            </p>
            
            {communication.attachments && communication.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {communication.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-md px-3 py-1">
                    <Paperclip className="h-3 w-3" />
                    <span className="text-xs">{attachment.name}</span>
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {communication.metadata && (
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                {communication.metadata.duration && (
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {communication.metadata.duration}
                  </span>
                )}
                {communication.metadata.callQuality && (
                  <span className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    {communication.metadata.callQuality}
                  </span>
                )}
                {communication.metadata.outcome && (
                  <span className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {communication.metadata.outcome}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComposeDialog({ 
  open, 
  onClose, 
  type,
  replyTo,
  templates
}: { 
  open: boolean; 
  onClose: () => void;
  type: 'email' | 'sms';
  replyTo?: Communication;
  templates: Template[];
}) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [to, setTo] = useState(replyTo?.participants.from.email || '');
  const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : '');
  const [content, setContent] = useState('');

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      if (template.subject) setSubject(template.subject);
      setContent(template.content);
    }
  };

  const handleSend = () => {
    // Implementation for sending communication
    console.log('Sending:', { type, to, subject, content });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {type === 'email' ? 'Compose Email' : 'Send SMS'}
            {replyTo && ' - Reply'}
          </DialogTitle>
          <DialogDescription>
            Send a {type} to the lead contact
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {templates.filter(t => t.type === type).length > 0 && (
            <div>
              <label className="text-sm font-medium">Use Template</label>
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates
                    .filter(t => t.type === type)
                    .map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium">To</label>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder={type === 'email' ? 'email@example.com' : '+1 (555) 123-4567'}
            />
          </div>
          
          {type === 'email' && (
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={type === 'email' ? 'Enter your message...' : 'Type your SMS message...'}
              rows={type === 'email' ? 8 : 4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSend}>
            <Send className="h-4 w-4 mr-2" />
            Send {type === 'email' ? 'Email' : 'SMS'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function LeadCommunicationsContent({ leadId }: LeadCommunicationsProps) {
  const [communications, setCommunications] = useState<Communication[]>(mockCommunications);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState<'email' | 'sms'>('email');
  const [replyTo, setReplyTo] = useState<Communication | undefined>();

  const handleReply = (communication: Communication) => {
    setReplyTo(communication);
    setComposeType('email');
    setShowCompose(true);
  };

  const handleForward = (communication: Communication) => {
    setReplyTo(communication);
    setComposeType('email');
    setShowCompose(true);
  };

  const handleDelete = (commId: string) => {
    setCommunications(prev => prev.filter(c => c.id !== commId));
  };

  const handleCompose = (type: 'email' | 'sms') => {
    setReplyTo(undefined);
    setComposeType(type);
    setShowCompose(true);
  };

  // Filter communications
  const filteredCommunications = communications.filter(comm => {
    if (filter !== 'all' && comm.type !== filter) return false;
    if (searchQuery && !comm.subject?.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !comm.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const communicationCounts = {
    total: communications.length,
    emails: communications.filter(c => c.type === 'email').length,
    sms: communications.filter(c => c.type === 'sms').length,
    calls: communications.filter(c => c.type === 'call' || c.type === 'video_call').length,
    unread: communications.filter(c => c.status === 'delivered' && c.direction === 'inbound').length
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/leads/dashboard" className="flex items-center hover:text-primary">
          <Home className="h-4 w-4 mr-1" />
          Leads
        </Link>
        <span>/</span>
        <Link to={`/leads/${leadId}`} className="hover:text-primary">
          Lead Details
        </Link>
        <span>/</span>
        <span className="text-foreground">Communications</span>
      </div>

      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/leads/${leadId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lead Details
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lead Communications Hub</h1>
          <p className="text-muted-foreground">Manage all communications with this lead</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={() => handleCompose('email')}>
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" onClick={() => handleCompose('sms')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send SMS
          </Button>
        </div>
      </div>

      {/* Communication Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{communicationCounts.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{communicationCounts.emails}</div>
            <div className="text-sm text-muted-foreground">Emails</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{communicationCounts.sms}</div>
            <div className="text-sm text-muted-foreground">SMS</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{communicationCounts.calls}</div>
            <div className="text-sm text-muted-foreground">Calls</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{communicationCounts.unread}</div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search communications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="video_call">Video Calls</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Communications List */}
      <div className="space-y-4">
        {filteredCommunications.map((communication) => (
          <CommunicationCard
            key={communication.id}
            communication={communication}
            onReply={handleReply}
            onForward={handleForward}
            onDelete={handleDelete}
          />
        ))}
        
        {filteredCommunications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No communications found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No communications match your current filters.
              </p>
              <div className="space-x-2">
                <Button onClick={() => handleCompose('email')}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={() => handleCompose('sms')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Compose Dialog */}
      <ComposeDialog
        open={showCompose}
        onClose={() => setShowCompose(false)}
        type={composeType}
        replyTo={replyTo}
        templates={mockTemplates}
      />
    </div>
  );
}
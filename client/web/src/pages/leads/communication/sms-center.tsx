import { useState, useMemo, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Plus,
  Users,
  User,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Circle,
  X,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Copy,
  Forward,
  Reply,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Calendar,
  Target,
  Activity,
  TrendingUp,
  BarChart3,
  Zap,
  Bell,
  BellOff,
  Edit,
  Eye,
  FileText,
  Tag,
  Building2,
  MapPin,
  DollarSign,
  Timer,
  Smartphone,
  Globe,
  ChevronDown,
  Info,
  Pin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
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
  tags: string[];
}

interface SMSMessage {
  id: string;
  conversationId: string;
  content: string;
  direction: 'inbound' | 'outbound';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'failed' | 'pending' | 'scheduled';
  sender: {
    id: string;
    name: string;
    phone: string;
    isLead: boolean;
  };
  recipient: {
    id: string;
    name: string;
    phone: string;
    isLead: boolean;
  };
  cost: number;
  segments: number;
  campaignId?: string;
  templateId?: string;
  scheduledAt?: Date;
  deliveredAt?: Date;
  errorMessage?: string;
}

interface SMSConversation {
  id: string;
  leadId: string;
  lead: Lead;
  lastMessage: SMSMessage;
  messageCount: number;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  tags: string[];
  createdAt: Date;
}

interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  category: 'welcome' | 'follow-up' | 'appointment' | 'promotion' | 'reminder' | 'custom';
  variables: string[];
  usage: number;
  performance: {
    sent: number;
    delivered: number;
    responses: number;
  };
  isActive: boolean;
  createdAt: Date;
}

interface SMSCampaign {
  id: string;
  name: string;
  description: string;
  templateId: string;
  template: SMSTemplate;
  recipients: Lead[];
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused' | 'cancelled';
  scheduledAt?: Date;
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
  responseCount: number;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
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
    lastActivity: new Date(2024, 0, 18),
    tags: ['high-value', 'urgent']
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
    lastActivity: new Date(2024, 0, 17),
    tags: ['follow-up']
  }
];

const mockMessages: SMSMessage[] = [
  {
    id: 'SMS001',
    conversationId: 'C001',
    content: 'Hi John, this is Sarah from BuildCorp. Thanks for your interest in our services. I\'d like to schedule a call to discuss your project.',
    direction: 'outbound',
    timestamp: new Date(2024, 0, 20, 10, 30),
    status: 'delivered',
    sender: {
      id: 'U001',
      name: 'Sarah Johnson',
      phone: '+1 555-999-0001',
      isLead: false
    },
    recipient: {
      id: 'L001',
      name: 'John Smith',
      phone: '+1 555-123-4567',
      isLead: true
    },
    cost: 0.0075,
    segments: 1,
    deliveredAt: new Date(2024, 0, 20, 10, 31)
  },
  {
    id: 'SMS002',
    conversationId: 'C001',
    content: 'Hi Sarah! Yes, I\'m very interested. When would be a good time for you? I\'m available this week.',
    direction: 'inbound',
    timestamp: new Date(2024, 0, 20, 11, 15),
    status: 'delivered',
    sender: {
      id: 'L001',
      name: 'John Smith',
      phone: '+1 555-123-4567',
      isLead: true
    },
    recipient: {
      id: 'U001',
      name: 'Sarah Johnson',
      phone: '+1 555-999-0001',
      isLead: false
    },
    cost: 0,
    segments: 1
  },
  {
    id: 'SMS003',
    conversationId: 'C001',
    content: 'Perfect! How about Wednesday at 2 PM? I can call you at this number or we can do a video call if you prefer.',
    direction: 'outbound',
    timestamp: new Date(2024, 0, 20, 11, 20),
    status: 'read',
    sender: {
      id: 'U001',
      name: 'Sarah Johnson',
      phone: '+1 555-999-0001',
      isLead: false
    },
    recipient: {
      id: 'L001',
      name: 'John Smith',
      phone: '+1 555-123-4567',
      isLead: true
    },
    cost: 0.0075,
    segments: 1,
    deliveredAt: new Date(2024, 0, 20, 11, 21)
  }
];

const mockConversations: SMSConversation[] = [
  {
    id: 'C001',
    leadId: 'L001',
    lead: mockLeads[0],
    lastMessage: mockMessages[2],
    messageCount: 3,
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    tags: ['urgent', 'hot-lead'],
    createdAt: new Date(2024, 0, 20)
  },
  {
    id: 'C002',
    leadId: 'L002',
    lead: mockLeads[1],
    lastMessage: mockMessages[0],
    messageCount: 1,
    unreadCount: 1,
    isPinned: false,
    isArchived: false,
    tags: ['follow-up'],
    createdAt: new Date(2024, 0, 19)
  }
];

const mockTemplates: SMSTemplate[] = [
  {
    id: 'T001',
    name: 'Initial Contact',
    content: 'Hi {{contact_name}}, this is {{assigned_to}} from {{company_name}}. Thanks for your interest in our {{service_type}}. I\'d like to schedule a brief call to discuss your project. When would be convenient?',
    category: 'welcome',
    variables: ['contact_name', 'assigned_to', 'company_name', 'service_type'],
    usage: 145,
    performance: {
      sent: 145,
      delivered: 142,
      responses: 89
    },
    isActive: true,
    createdAt: new Date(2024, 0, 10)
  },
  {
    id: 'T002',
    name: 'Appointment Reminder',
    content: 'Hi {{contact_name}}, this is a reminder of our meeting tomorrow at {{time}}. Please let me know if you need to reschedule. Looking forward to speaking with you!',
    category: 'reminder',
    variables: ['contact_name', 'time'],
    usage: 89,
    performance: {
      sent: 89,
      delivered: 87,
      responses: 12
    },
    isActive: true,
    createdAt: new Date(2024, 0, 15)
  }
];

const mockCampaigns: SMSCampaign[] = [
  {
    id: 'CAM001',
    name: 'Q1 Follow-up Campaign',
    description: 'Follow-up with qualified leads from Q1',
    templateId: 'T001',
    template: mockTemplates[0],
    recipients: mockLeads,
    status: 'completed',
    scheduledAt: new Date(2024, 0, 15, 9, 0),
    sentCount: 125,
    deliveredCount: 122,
    failedCount: 3,
    responseCount: 67,
    totalCost: 0.9375,
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 15)
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
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

function getMessageStatusIcon(status: SMSMessage['status']) {
  switch (status) {
    case 'sent': return Circle;
    case 'delivered': return CheckCircle;
    case 'failed': return AlertCircle;
    case 'pending': return Clock;
    case 'scheduled': return Calendar;
    default: return Circle;
  }
}

function getMessageStatusColor(status: SMSMessage['status']) {
  switch (status) {
    case 'sent': return 'text-gray-400';
    case 'delivered': return 'text-green-500';
    case 'failed': return 'text-red-500';
    case 'pending': return 'text-amber-500';
    case 'scheduled': return 'text-blue-500';
    default: return 'text-gray-400';
  }
}

function getCampaignStatusColor(status: SMSCampaign['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'sending': return 'bg-amber-100 text-amber-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-orange-100 text-orange-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function ConversationListItem({ conversation, isSelected, onClick }: {
  conversation: SMSConversation;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start space-x-3 p-3 cursor-pointer transition-colors hover:bg-gray-50",
        isSelected && "bg-blue-50 border-r-2 border-blue-500"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
            {getInitials(conversation.lead.contact)}
          </AvatarFallback>
        </Avatar>
        {conversation.unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-blue-500">
            {conversation.unreadCount}
          </Badge>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-sm truncate">{conversation.lead.contact}</h4>
            {conversation.isPinned && <Pin className="h-3 w-3 text-gray-400" />}
          </div>
          <span className="text-xs text-gray-500">{formatTimestamp(conversation.lastMessage.timestamp)}</span>
        </div>
        
        <p className="text-xs text-gray-500 truncate mb-1">{conversation.lead.company}</p>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700 truncate flex-1">
            {conversation.lastMessage.content}
          </p>
          
          {conversation.lastMessage.direction === 'outbound' && (
            <div className="ml-2">
              {(() => {
                const StatusIcon = getMessageStatusIcon(conversation.lastMessage.status);
                return (
                  <StatusIcon className={cn("h-3 w-3", getMessageStatusColor(conversation.lastMessage.status))} />
                );
              })()}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Smartphone className="h-3 w-3" />
            <span>{conversation.lead.phone}</span>
          </div>
          <span className="text-xs text-gray-500">{conversation.messageCount} msgs</span>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: SMSMessage }) {
  const isOutbound = message.direction === 'outbound';
  const StatusIcon = getMessageStatusIcon(message.status);
  
  return (
    <div className={cn("flex mb-4", isOutbound ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl",
        isOutbound 
          ? "bg-blue-500 text-white rounded-br-sm" 
          : "bg-white border rounded-bl-sm shadow-sm"
      )}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        
        <div className={cn(
          "flex items-center justify-between mt-2 text-xs",
          isOutbound ? "text-blue-100" : "text-gray-500"
        )}>
          <span>{formatTimestamp(message.timestamp)}</span>
          <div className="flex items-center space-x-1">
            {isOutbound && (
              <>
                <span>${message.cost.toFixed(4)}</span>
                <StatusIcon className={cn("h-3 w-3", 
                  isOutbound ? "text-blue-100" : getMessageStatusColor(message.status)
                )} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, onUse, onEdit }: {
  template: SMSTemplate;
  onUse: () => void;
  onEdit: () => void;
}) {
  const deliveryRate = template.performance.sent > 0 
    ? (template.performance.delivered / template.performance.sent) * 100 
    : 0;
  const responseRate = template.performance.sent > 0 
    ? (template.performance.responses / template.performance.sent) * 100 
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base mb-1">{template.name}</CardTitle>
            <Badge variant="outline" className="text-xs capitalize mb-2">
              {template.category}
            </Badge>
            <CardDescription className="text-sm line-clamp-2">
              {template.content}
            </CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onUse}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Use Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-sm font-medium">{template.usage}</p>
            <p className="text-xs text-gray-500">Sent</p>
          </div>
          <div>
            <p className="text-sm font-medium text-green-600">{deliveryRate.toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Delivered</p>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600">{responseRate.toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Response</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          <div className="flex flex-wrap gap-1">
            {template.variables.slice(0, 2).map((variable) => (
              <Badge key={variable} variant="secondary" className="text-xs">
                {`{{${variable}}}`}
              </Badge>
            ))}
            {template.variables.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{template.variables.length - 2}
              </Badge>
            )}
          </div>
          
          <Button size="sm" onClick={onUse}>
            Use
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignCard({ campaign }: { campaign: SMSCampaign }) {
  const deliveryRate = campaign.sentCount > 0 
    ? (campaign.deliveredCount / campaign.sentCount) * 100 
    : 0;
  const responseRate = campaign.sentCount > 0 
    ? (campaign.responseCount / campaign.sentCount) * 100 
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base mb-1">{campaign.name}</CardTitle>
            <Badge className={getCampaignStatusColor(campaign.status)} variant="secondary">
              {campaign.status}
            </Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center p-2 border rounded">
            <p className="text-lg font-bold">{campaign.sentCount}</p>
            <p className="text-xs text-gray-500">Sent</p>
          </div>
          <div className="text-center p-2 border rounded">
            <p className="text-lg font-bold text-green-600">{deliveryRate.toFixed(0)}%</p>
            <p className="text-xs text-gray-500">Delivered</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Recipients:</span>
            <span className="font-medium">{campaign.recipients.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Responses:</span>
            <span className="font-medium">{campaign.responseCount} ({responseRate.toFixed(1)}%)</span>
          </div>
          <div className="flex justify-between">
            <span>Total Cost:</span>
            <span className="font-medium">${campaign.totalCost.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SMSCenter() {
  const [selectedTab, setSelectedTab] = useState('conversations');
  const [selectedConversation, setSelectedConversation] = useState<SMSConversation | null>(mockConversations[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = useMemo(() => {
    return mockConversations.filter(conv =>
      conv.lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lead.phone.includes(searchQuery)
    );
  }, [searchQuery]);

  const conversationMessages = useMemo(() => {
    if (!selectedConversation) return [];
    return mockMessages.filter(msg => msg.conversationId === selectedConversation.id);
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;
    
    // Here you would typically send the message to your API
    console.log('Sending SMS:', message, 'to:', selectedConversation.lead.phone);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const smsStats = useMemo(() => {
    const totalSent = mockMessages.filter(m => m.direction === 'outbound').length;
    const totalReceived = mockMessages.filter(m => m.direction === 'inbound').length;
    const totalCost = mockMessages
      .filter(m => m.direction === 'outbound')
      .reduce((sum, m) => sum + m.cost, 0);
    const deliveryRate = mockMessages.filter(m => m.direction === 'outbound' && m.status === 'delivered').length / totalSent * 100;
    
    return { totalSent, totalReceived, totalCost, deliveryRate };
  }, []);

  return (
    <TooltipProvider>
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">SMS Center</h1>
              <Badge variant="secondary">
                {mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0)} unread
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium">{smsStats.totalSent}</p>
                  <p className="text-xs text-gray-500">Sent</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{smsStats.totalReceived}</p>
                  <p className="text-xs text-gray-500">Received</p>
                </div>
                <div>
                  <p className="text-sm font-medium">${smsStats.totalCost.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Cost</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">{smsStats.deliveryRate.toFixed(0)}%</p>
                  <p className="text-xs text-gray-500">Delivery</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowComposeDialog(true)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Compose SMS
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowCampaignDialog(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    SMS Campaign
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowTemplateDialog(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    SMS Template
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
            <div className="border-b px-4 py-2 bg-white">
              <TabsList>
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="conversations" className="flex-1 flex overflow-hidden">
              {/* Conversations List */}
              <div className="w-80 bg-white border-r flex flex-col">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  {filteredConversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-500">No conversations found</p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <ConversationListItem
                        key={conversation.id}
                        conversation={conversation}
                        isSelected={selectedConversation?.id === conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                      />
                    ))
                  )}
                </ScrollArea>
              </div>

              {/* Chat Area */}
              {selectedConversation ? (
                <div className="flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="bg-white border-b p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                            {getInitials(selectedConversation.lead.contact)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{selectedConversation.lead.contact}</h3>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-500">{selectedConversation.lead.company}</p>
                            <Badge variant="outline" className="text-xs">
                              {selectedConversation.lead.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Info className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              Star Conversation
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-1">
                      {conversationMessages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="bg-white border-t p-4">
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className="resize-none"
                          rows={3}
                          maxLength={160}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{message.length}/160 characters</span>
                          <span>~${(Math.ceil(message.length / 160) * 0.0075).toFixed(4)} cost</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">SMS Center</h3>
                    <p className="text-gray-500">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="templates" className="flex-1 p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">SMS Templates</h2>
                  <Button onClick={() => setShowTemplateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => setMessage(template.content)}
                    onEdit={() => setShowTemplateDialog(true)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="flex-1 p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">SMS Campaigns</h2>
                  <Button onClick={() => setShowCampaignDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Campaign
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Messages Sent</p>
                        <p className="text-2xl font-bold">{smsStats.totalSent}</p>
                      </div>
                      <MessageSquare className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Delivery Rate</p>
                        <p className="text-2xl font-bold text-green-600">{smsStats.deliveryRate.toFixed(0)}%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Cost</p>
                        <p className="text-2xl font-bold">${smsStats.totalCost.toFixed(2)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Responses</p>
                        <p className="text-2xl font-bold">{smsStats.totalReceived}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Compose Dialog */}
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Compose SMS</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>To</Label>
                <Input placeholder="Enter phone number..." />
              </div>
              
              <div>
                <Label>Message</Label>
                <Textarea
                  placeholder="Type your message..."
                  rows={4}
                  maxLength={160}
                />
                <div className="text-xs text-gray-500 mt-1">0/160 characters</div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowComposeDialog(false)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  MapPin,
  Building2,
  User,
  DollarSign,
  Clock,
  Star,
  Activity,
  FileText,
  CheckCircle,
  Edit,
  MoreHorizontal,
  ArrowLeft,
  Plus,
  Send,
  Upload,
  Download,
  Trash2,
  ExternalLink,
  Globe,
  Target,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Paperclip,
  Play,
  Mic,
  Image as ImageIcon,
  File,
  Video,
  Zap,
  Users,
  BarChart,
  Shield,
  Tag,
  History,
  MessageCircle,
  PhoneCall,
  Inbox,
  Settings,
  Share2,
  Bookmark,
  Bell,
  Copy,
  Link2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  CheckSquare,
  Square,
  Circle,
  XCircle,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Types
interface LeadDetail {
  id: string;
  leadNumber: string;
  name: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  secondaryEmail?: string;
  website?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source: string;
  score: number;
  temperature: 'hot' | 'warm' | 'cold';
  priority: 'high' | 'medium' | 'low';
  projectType: string;
  budget: string;
  budgetConfirmed: boolean;
  timeline: string;
  requirements: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    phone: string;
  };
  team: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
  }>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  nextActionDate: string;
  nextActionType: string;
  industry: string;
  companySize: string;
  annualRevenue: string;
  decisionMakers: Array<{
    name: string;
    designation: string;
    email: string;
    phone: string;
  }>;
  competitors: string[];
  painPoints: string[];
  solutionFit: number;
  winProbability: number;
  riskFactors: string[];
  bant: {
    budget: boolean;
    authority: boolean;
    need: boolean;
    timeline: boolean;
  };
}

interface TimelineActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'status' | 'document' | 'whatsapp' | 'task';
  title: string;
  description: string;
  outcome?: string;
  duration?: number;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  attachments?: Array<{
    name: string;
    size: string;
    type: string;
  }>;
}

interface Communication {
  id: string;
  type: 'email' | 'whatsapp' | 'sms' | 'call';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments?: Array<{
    name: string;
    size: string;
  }>;
}

interface Document {
  id: string;
  name: string;
  type: 'proposal' | 'contract' | 'invoice' | 'presentation' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  status: 'draft' | 'sent' | 'viewed' | 'signed';
  viewCount: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  dueDate: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  completedAt?: string;
}

// Mock data
const mockLead: LeadDetail = {
  id: 'L001',
  leadNumber: 'LD-2024-0001',
  name: 'Acme Corporation',
  company: 'Acme Corp',
  designation: 'CEO',
  email: 'john.smith@acme.com',
  phone: '+1 (555) 123-4567',
  alternatePhone: '+1 (555) 123-4568',
  secondaryEmail: 'info@acme.com',
  website: 'https://www.acme.com',
  socialMedia: {
    linkedin: 'https://linkedin.com/company/acme',
    twitter: 'https://twitter.com/acmecorp',
    facebook: 'https://facebook.com/acmecorp'
  },
  status: 'qualified',
  source: 'Website',
  score: 85,
  temperature: 'hot',
  priority: 'high',
  projectType: 'Commercial Building',
  budget: '$50K - $100K',
  budgetConfirmed: true,
  timeline: '3 months',
  requirements: 'Looking for a modern commercial building with sustainable features, parking facilities, and flexible office spaces.',
  location: {
    address: '123 Business Park',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    pincode: '10001'
  },
  assignedTo: {
    id: 'U001',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    email: 'sarah@company.com',
    phone: '+1 555-0101'
  },
  team: [
    { id: 'U002', name: 'Mike Chen', avatar: '/avatars/mike.jpg', role: 'Technical Lead' },
    { id: 'U003', name: 'Lisa Wang', avatar: '/avatars/lisa.jpg', role: 'Project Manager' }
  ],
  tags: ['Enterprise', 'High Value', 'Urgent', 'Referral'],
  createdAt: '2024-01-10',
  updatedAt: '2024-01-18',
  lastActivityAt: '2024-01-18 14:30',
  nextActionDate: '2024-01-20',
  nextActionType: 'Follow-up Call',
  industry: 'Technology',
  companySize: '100-500',
  annualRevenue: '$10M - $50M',
  decisionMakers: [
    { name: 'John Smith', designation: 'CEO', email: 'john@acme.com', phone: '+1 555-0001' },
    { name: 'Jane Doe', designation: 'CFO', email: 'jane@acme.com', phone: '+1 555-0002' }
  ],
  competitors: ['TechCorp', 'GlobalTech', 'InnovateCo'],
  painPoints: ['Scalability issues', 'High operational costs', 'Outdated infrastructure'],
  solutionFit: 92,
  winProbability: 78,
  riskFactors: ['Budget approval pending', 'Competitor offering lower price'],
  bant: {
    budget: true,
    authority: true,
    need: true,
    timeline: true
  }
};

const mockActivities: TimelineActivity[] = [
  {
    id: 'A001',
    type: 'call',
    title: 'Initial Discovery Call',
    description: 'Discussed project requirements and budget',
    outcome: 'Positive - scheduled follow-up meeting',
    duration: 45,
    user: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    timestamp: '2024-01-18 14:30'
  },
  {
    id: 'A002',
    type: 'email',
    title: 'Proposal Sent',
    description: 'Sent detailed project proposal with pricing',
    user: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    timestamp: '2024-01-17 10:00',
    attachments: [
      { name: 'Proposal_AcmeCorp.pdf', size: '2.4 MB', type: 'pdf' }
    ]
  },
  {
    id: 'A003',
    type: 'status',
    title: 'Status Changed',
    description: 'Lead status changed from Contacted to Qualified',
    user: { name: 'System', avatar: '' },
    timestamp: '2024-01-16 15:45'
  }
];

const mockCommunications: Communication[] = [
  {
    id: 'C001',
    type: 'email',
    direction: 'outbound',
    subject: 'Re: Project Requirements',
    content: 'Thank you for your interest in our services. Please find attached our detailed proposal...',
    from: 'sarah@company.com',
    to: 'john@acme.com',
    timestamp: '2024-01-17 10:00',
    status: 'read',
    attachments: [
      { name: 'Proposal.pdf', size: '2.4 MB' }
    ]
  },
  {
    id: 'C002',
    type: 'whatsapp',
    direction: 'inbound',
    content: 'Hi, I reviewed the proposal. Can we discuss the pricing?',
    from: '+1 555-123-4567',
    to: '+1 555-0101',
    timestamp: '2024-01-17 14:30',
    status: 'read'
  }
];

const mockDocuments: Document[] = [
  {
    id: 'D001',
    name: 'Project Proposal v2.pdf',
    type: 'proposal',
    size: '2.4 MB',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-01-17',
    lastModified: '2024-01-17',
    status: 'sent',
    viewCount: 5
  },
  {
    id: 'D002',
    name: 'Budget Breakdown.xlsx',
    type: 'other',
    size: '156 KB',
    uploadedBy: 'Mike Chen',
    uploadedAt: '2024-01-16',
    lastModified: '2024-01-16',
    status: 'viewed',
    viewCount: 3
  }
];

const mockTasks: Task[] = [
  {
    id: 'T001',
    title: 'Follow-up Call',
    description: 'Call to discuss proposal and answer questions',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-20',
    assignedTo: 'Sarah Johnson',
    createdBy: 'Mike Chen',
    createdAt: '2024-01-17'
  },
  {
    id: 'T002',
    title: 'Site Visit',
    description: 'Visit client location for requirements gathering',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-25',
    assignedTo: 'Lisa Wang',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-16'
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusColor(status: LeadDetail['status']) {
  const colors = {
    new: 'bg-gray-100 text-gray-800 border-gray-200',
    contacted: 'bg-blue-100 text-blue-800 border-blue-200',
    qualified: 'bg-amber-100 text-amber-800 border-amber-200',
    proposal: 'bg-purple-100 text-purple-800 border-purple-200',
    negotiation: 'bg-pink-100 text-pink-800 border-pink-200',
    won: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    lost: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status];
}

function getTemperatureIcon(temperature: LeadDetail['temperature']) {
  switch (temperature) {
    case 'hot': return '🔥';
    case 'warm': return '🌡️';
    case 'cold': return '❄️';
  }
}

function getPriorityColor(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    case 'low': return 'text-green-600 bg-green-50';
  }
}

function getActivityIcon(type: TimelineActivity['type']) {
  switch (type) {
    case 'call': return PhoneCall;
    case 'email': return Mail;
    case 'meeting': return Calendar;
    case 'note': return FileText;
    case 'status': return Activity;
    case 'document': return File;
    case 'whatsapp': return MessageSquare;
    case 'task': return CheckSquare;
  }
}

export function LeadDetailView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const lead = mockLead; // In real app, fetch based on id

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/leads">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Leads
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold">{lead.name}</h1>
                <Badge variant="outline" className="font-mono">
                  {lead.leadNumber}
                </Badge>
                <Badge className={cn("border", getStatusColor(lead.status))}>
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Follow
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="h-4 w-4 mr-2" />
                    Change Owner
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="h-4 w-4 mr-2" />
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Lead
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r p-6 space-y-6">
            {/* Lead Summary Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {getInitials(lead.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{lead.name}</h3>
                    <p className="text-sm text-gray-500">{lead.company}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Score</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3",
                            i < Math.round(lead.score / 20)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                      <span className="text-sm font-medium ml-1">{lead.score}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Temperature</span>
                    <div className="flex items-center space-x-1">
                      <span>{getTemperatureIcon(lead.temperature)}</span>
                      <span className="text-sm font-medium capitalize">{lead.temperature}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Priority</span>
                    <Badge className={cn("text-xs", getPriorityColor(lead.priority))}>
                      {lead.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 pt-2">
                    {lead.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Quick Information</h4>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="truncate">{lead.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{lead.location.city}, {lead.location.state}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{lead.industry}</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{lead.budget}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{lead.timeline}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm mb-3">Quick Actions</h4>
              <Button className="w-full justify-start" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <CheckSquare className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-9 w-full max-w-4xl">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="communications">Communications</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="proposals">Proposals</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500">Primary Contact</Label>
                          <p className="text-sm font-medium">{lead.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Designation</Label>
                          <p className="text-sm font-medium">{lead.designation}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Email</Label>
                          <p className="text-sm font-medium">{lead.email}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Phone</Label>
                          <p className="text-sm font-medium">{lead.phone}</p>
                        </div>
                      </div>
                      
                      {lead.socialMedia && (
                        <div>
                          <Label className="text-xs text-gray-500 mb-2 block">Social Media</Label>
                          <div className="flex space-x-2">
                            {lead.socialMedia.linkedin && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={lead.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {lead.socialMedia.twitter && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={lead.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                                  <Twitter className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {lead.socialMedia.facebook && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={lead.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                                  <Facebook className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Company Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500">Company Name</Label>
                          <p className="text-sm font-medium">{lead.company}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Industry</Label>
                          <p className="text-sm font-medium">{lead.industry}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Company Size</Label>
                          <p className="text-sm font-medium">{lead.companySize} employees</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Annual Revenue</Label>
                          <p className="text-sm font-medium">{lead.annualRevenue}</p>
                        </div>
                      </div>
                      
                      {lead.website && (
                        <div>
                          <Label className="text-xs text-gray-500">Website</Label>
                          <a 
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:underline flex items-center"
                          >
                            <Globe className="h-3 w-3 mr-1" />
                            {lead.website}
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Project Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Project Requirements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500">Project Type</Label>
                          <p className="text-sm font-medium">{lead.projectType}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Budget Range</Label>
                          <div className="flex items-center space-x-1">
                            <p className="text-sm font-medium">{lead.budget}</p>
                            {lead.budgetConfirmed && (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            )}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Timeline</Label>
                          <p className="text-sm font-medium">{lead.timeline}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Lead Source</Label>
                          <p className="text-sm font-medium">{lead.source}</p>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-gray-500">Detailed Requirements</Label>
                        <p className="text-sm mt-1">{lead.requirements}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead Qualification */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Lead Qualification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs text-gray-500">BANT Qualifiers</Label>
                            <span className="text-xs text-gray-500">
                              {Object.values(lead.bant).filter(v => v).length}/4
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox checked={lead.bant.budget} disabled />
                              <span className="text-sm">Budget</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox checked={lead.bant.authority} disabled />
                              <span className="text-sm">Authority</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox checked={lead.bant.need} disabled />
                              <span className="text-sm">Need</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox checked={lead.bant.timeline} disabled />
                              <span className="text-sm">Timeline</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs text-gray-500">Solution Fit</Label>
                            <span className="text-sm font-medium">{lead.solutionFit}%</span>
                          </div>
                          <Progress value={lead.solutionFit} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs text-gray-500">Win Probability</Label>
                            <span className="text-sm font-medium">{lead.winProbability}%</span>
                          </div>
                          <Progress value={lead.winProbability} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Decision Makers */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Decision Makers</CardTitle>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lead.decisionMakers.map((person, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                                {getInitials(person.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{person.name}</p>
                              <p className="text-xs text-gray-500">{person.designation}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Activity Timeline</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Activities</SelectItem>
                            <SelectItem value="calls">Calls</SelectItem>
                            <SelectItem value="emails">Emails</SelectItem>
                            <SelectItem value="meetings">Meetings</SelectItem>
                            <SelectItem value="notes">Notes</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Quick Add Bar */}
                      <div className="flex space-x-2 pb-4 border-b">
                        <Button size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Log Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-4">
                        {mockActivities.map((activity) => {
                          const Icon = getActivityIcon(activity.type);
                          
                          return (
                            <div key={activity.id} className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <div className={cn(
                                  "p-2 rounded-lg",
                                  activity.type === 'call' && "bg-green-100 text-green-600",
                                  activity.type === 'email' && "bg-blue-100 text-blue-600",
                                  activity.type === 'meeting' && "bg-purple-100 text-purple-600",
                                  activity.type === 'note' && "bg-gray-100 text-gray-600",
                                  activity.type === 'status' && "bg-amber-100 text-amber-600"
                                )}>
                                  <Icon className="h-4 w-4" />
                                </div>
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium text-sm">{activity.title}</p>
                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                    {activity.outcome && (
                                      <p className="text-sm text-gray-500 mt-1">
                                        <span className="font-medium">Outcome:</span> {activity.outcome}
                                      </p>
                                    )}
                                    {activity.duration && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Duration: {activity.duration} minutes
                                      </p>
                                    )}
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                
                                {activity.attachments && (
                                  <div className="flex flex-wrap gap-2">
                                    {activity.attachments.map((attachment, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs"
                                      >
                                        <Paperclip className="h-3 w-3" />
                                        <span>{attachment.name}</span>
                                        <span className="text-gray-500">({attachment.size})</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={activity.user.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {getInitials(activity.user.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{activity.user.name}</span>
                                  </div>
                                  <span>•</span>
                                  <span>{activity.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Communications Tab */}
              <TabsContent value="communications" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Channel Statistics */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Email</span>
                        </div>
                        <Badge>45</Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last: 2 hours ago
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium">WhatsApp</span>
                        </div>
                        <Badge>89</Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last: 30 mins ago
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">SMS</span>
                        </div>
                        <Badge>12</Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last: Yesterday
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-orange-600" />
                          <span className="text-sm font-medium">Calls</span>
                        </div>
                        <Badge>15</Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Last: Today 2:30 PM
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Communication List */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Communications</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCommunications.map((comm) => (
                        <div key={comm.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {comm.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                              {comm.type === 'whatsapp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                              {comm.type === 'sms' && <MessageCircle className="h-4 w-4 text-purple-600" />}
                              {comm.type === 'call' && <Phone className="h-4 w-4 text-orange-600" />}
                              
                              <span className="font-medium text-sm capitalize">{comm.type}</span>
                              <Badge variant="outline" className="text-xs">
                                {comm.direction}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-xs",
                                  comm.status === 'read' && "bg-green-50 text-green-700",
                                  comm.status === 'sent' && "bg-blue-50 text-blue-700",
                                  comm.status === 'delivered' && "bg-purple-50 text-purple-700",
                                  comm.status === 'failed' && "bg-red-50 text-red-700"
                                )}
                              >
                                {comm.status}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">{comm.timestamp}</span>
                          </div>
                          
                          {comm.subject && (
                            <p className="font-medium text-sm mb-1">{comm.subject}</p>
                          )}
                          
                          <p className="text-sm text-gray-600">{comm.content}</p>
                          
                          {comm.attachments && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {comm.attachments.map((attachment, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs"
                                >
                                  <Paperclip className="h-3 w-3" />
                                  <span>{attachment.name}</span>
                                  <span className="text-gray-500">({attachment.size})</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Documents</CardTitle>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-100 rounded">
                              <File className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {doc.size} • Uploaded by {doc.uploadedBy} • {doc.uploadedAt}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Tasks</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Task
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTasks.map((task) => (
                        <div key={task.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <Checkbox checked={task.status === 'completed'} />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{task.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                              </div>
                              <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                                {task.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                              <span>Due: {task.dueDate}</span>
                              <span>•</span>
                              <span>Assigned to: {task.assignedTo}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Proposals Tab */}
              <TabsContent value="proposals" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Proposals</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Proposal
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Commercial Building Proposal v2</p>
                            <p className="text-xs text-gray-500">Created Jan 17, 2024 • $75,000</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">Sent</Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded">
                            <FileText className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Initial Proposal v1</p>
                            <p className="text-xs text-gray-500">Created Jan 15, 2024 • $65,000</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Draft</Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Notes & Observations</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-blue-100 text-blue-600">SJ</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Sarah Johnson</span>
                            <span className="text-xs text-gray-500">Jan 18, 2024 at 2:30 PM</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm">
                          Client is very interested in sustainable building features. They emphasized the importance of 
                          LEED certification and energy-efficient systems. Budget is confirmed at $75K but they're 
                          willing to go up to $85K for additional green features.
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">Important</Badge>
                          <Badge variant="secondary" className="text-xs">Budget</Badge>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-purple-100 text-purple-600">MC</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">Mike Chen</span>
                            <span className="text-xs text-gray-500">Jan 16, 2024 at 4:15 PM</span>
                          </div>
                        </div>
                        <p className="text-sm">
                          Technical discussion went well. They're looking for flexible office spaces that can be 
                          reconfigured easily. Parking for 50+ vehicles is a must-have requirement.
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Badge variant="secondary" className="text-xs">Technical</Badge>
                          <Badge variant="secondary" className="text-xs">Requirements</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Lead Score Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Company Size</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={85} className="w-20 h-2" />
                            <span className="text-sm font-medium">85</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Budget Fit</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={90} className="w-20 h-2" />
                            <span className="text-sm font-medium">90</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Engagement</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={75} className="w-20 h-2" />
                            <span className="text-sm font-medium">75</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Timeline Match</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={95} className="w-20 h-2" />
                            <span className="text-sm font-medium">95</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Engagement Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Email Opens</span>
                          <span className="text-sm font-medium">67% (12/18)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Link Clicks</span>
                          <span className="text-sm font-medium">8 clicks</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Document Views</span>
                          <span className="text-sm font-medium">5 views</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Website Visits</span>
                          <span className="text-sm font-medium">12 visits</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Response Time</span>
                          <span className="text-sm font-medium">2.3 hours avg</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Conversion Probability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                        <p className="text-sm text-gray-500 mb-4">Likelihood to convert</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Historical patterns</span>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Engagement level</span>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Budget alignment</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Risk Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Budget approval pending</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm">Competitor offering lower price</span>
                        </div>
                        <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                          <Info className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Q1 budget cycle timing</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead History & Audit Trail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex space-x-3 p-3 border rounded-lg">
                        <div className="p-2 bg-blue-100 rounded">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Status changed to Qualified</p>
                            <span className="text-xs text-gray-500">Jan 16, 2024 3:45 PM</span>
                          </div>
                          <p className="text-sm text-gray-600">Changed from Contacted to Qualified</p>
                          <p className="text-xs text-gray-500">by Sarah Johnson</p>
                        </div>
                      </div>

                      <div className="flex space-x-3 p-3 border rounded-lg">
                        <div className="p-2 bg-green-100 rounded">
                          <User className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Lead assigned</p>
                            <span className="text-xs text-gray-500">Jan 15, 2024 10:30 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">Assigned to Sarah Johnson from Mike Chen</p>
                          <p className="text-xs text-gray-500">by System Auto-assignment</p>
                        </div>
                      </div>

                      <div className="flex space-x-3 p-3 border rounded-lg">
                        <div className="p-2 bg-purple-100 rounded">
                          <Star className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Lead score updated</p>
                            <span className="text-xs text-gray-500">Jan 14, 2024 2:15 PM</span>
                          </div>
                          <p className="text-sm text-gray-600">Score increased from 75 to 85</p>
                          <p className="text-xs text-gray-500">by Lead Scoring Engine</p>
                        </div>
                      </div>

                      <div className="flex space-x-3 p-3 border rounded-lg">
                        <div className="p-2 bg-gray-100 rounded">
                          <Plus className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Lead created</p>
                            <span className="text-xs text-gray-500">Jan 10, 2024 9:00 AM</span>
                          </div>
                          <p className="text-sm text-gray-600">Lead imported from website contact form</p>
                          <p className="text-xs text-gray-500">by Website Integration</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white border-l p-6 space-y-6">
            {/* Lead Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Lead Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Days in Pipeline</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Activities Count</span>
                  <span className="text-sm font-medium">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Email Open Rate</span>
                  <span className="text-sm font-medium">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Response Time</span>
                  <span className="text-sm font-medium">2.3 hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Engagement Score</span>
                  <div className="flex items-center space-x-1">
                    <Progress value={78} className="w-20 h-2" />
                    <span className="text-sm font-medium">78</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Collaboration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-2 block">Lead Owner</Label>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={lead.assignedTo.avatar} />
                      <AvatarFallback className="text-xs">
                        {getInitials(lead.assignedTo.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{lead.assignedTo.name}</p>
                      <p className="text-xs text-gray-500">{lead.assignedTo.email}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs text-gray-500 mb-2 block">Team Members</Label>
                  <div className="space-y-2">
                    {lead.team.map((member) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs font-medium">{member.name}</p>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Upcoming Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Follow-up Call</span>
                    <Badge variant="outline" className="text-xs">Tomorrow</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Call to discuss proposal</p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">Site Visit</span>
                    <Badge variant="outline" className="text-xs">Jan 25</Badge>
                  </div>
                  <p className="text-xs text-gray-600">Visit client location</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Related Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500 mb-2 block">Similar Leads</Label>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <Link to="#" className="text-blue-600 hover:underline">TechCorp Solutions</Link>
                      <p className="text-xs text-gray-500">85% match</p>
                    </div>
                    <div className="text-sm">
                      <Link to="#" className="text-blue-600 hover:underline">Global Enterprises</Link>
                      <p className="text-xs text-gray-500">72% match</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
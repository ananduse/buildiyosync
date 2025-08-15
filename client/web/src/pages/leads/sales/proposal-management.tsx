'use client';

import { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Share2,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Target,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Star,
  Archive,
  Trash2,
  PenTool,
  Upload,
  Link,
  Zap,
  TrendingUp,
  Award,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Proposal {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAvatar?: string;
  dealId: string;
  value: number;
  status: 'draft' | 'review' | 'sent' | 'viewed' | 'negotiation' | 'accepted' | 'rejected' | 'expired';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: {
    name: string;
    avatar?: string;
    email: string;
  };
  assignedTo?: {
    name: string;
    avatar?: string;
    email: string;
  };
  createdDate: string;
  lastModified: string;
  sentDate?: string;
  viewedDate?: string;
  responseDate?: string;
  expiryDate: string;
  version: number;
  template: string;
  sections: ProposalSection[];
  attachments: string[];
  approvals: ProposalApproval[];
  comments: ProposalComment[];
  analytics: {
    views: number;
    timeSpent: number; // in minutes
    sectionsViewed: string[];
    downloadCount: number;
    shareCount: number;
  };
  clientFeedback?: string;
  winProbability: number;
  competitorInfo?: string;
  nextFollowUp?: string;
  tags: string[];
  customFields?: Record<string, any>;
}

interface ProposalSection {
  id: string;
  name: string;
  type: 'executive-summary' | 'scope' | 'timeline' | 'pricing' | 'terms' | 'team' | 'portfolio' | 'appendix';
  content: string;
  isRequired: boolean;
  order: number;
  lastModified: string;
  modifiedBy: string;
}

interface ProposalApproval {
  id: string;
  approverName: string;
  approverRole: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  timestamp?: string;
  required: boolean;
}

interface ProposalComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  sectionId?: string;
  isInternal: boolean;
}

interface ProposalMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'currency' | 'days';
}

const proposalMetrics: ProposalMetric[] = [
  {
    id: 'total-proposals',
    title: 'Total Proposals',
    value: 45,
    change: 8.2,
    trend: 'up',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'win-rate',
    title: 'Win Rate',
    value: 32.5,
    change: 5.1,
    trend: 'up',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'percentage'
  },
  {
    id: 'avg-response-time',
    title: 'Avg Response Time',
    value: 5.2,
    change: -1.8,
    trend: 'down',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'days'
  },
  {
    id: 'total-value',
    title: 'Total Value',
    value: 12500000,
    change: 15.3,
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'currency'
  },
  {
    id: 'pending-approvals',
    title: 'Pending Approvals',
    value: 8,
    change: -12.5,
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'number'
  },
  {
    id: 'avg-proposal-value',
    title: 'Avg Proposal Value',
    value: 278000,
    change: 6.7,
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'currency'
  }
];

const mockProposals: Proposal[] = [
  {
    id: 'PROP001',
    title: 'Metro Plaza Commercial Development Proposal',
    description: 'Comprehensive proposal for the construction of a mixed-use commercial plaza with retail and office spaces',
    clientName: 'Sarah Martinez',
    clientCompany: 'Metro Development Corp',
    clientEmail: 'sarah.m@metrodev.com',
    clientPhone: '+1 (555) 123-4567',
    clientAvatar: '/avatars/sarah-m.jpg',
    dealId: 'DEAL001',
    value: 2500000,
    status: 'negotiation',
    priority: 'high',
    createdBy: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    assignedTo: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdDate: '2024-01-15',
    lastModified: '2024-01-30',
    sentDate: '2024-01-25',
    viewedDate: '2024-01-26',
    responseDate: '2024-01-28',
    expiryDate: '2024-02-25',
    version: 3,
    template: 'Commercial Construction Template',
    sections: [
      {
        id: 'SEC001',
        name: 'Executive Summary',
        type: 'executive-summary',
        content: 'Overview of the commercial plaza development project...',
        isRequired: true,
        order: 1,
        lastModified: '2024-01-30',
        modifiedBy: 'Mike Chen'
      },
      {
        id: 'SEC002',
        name: 'Project Scope',
        type: 'scope',
        content: 'Detailed scope of work including construction phases...',
        isRequired: true,
        order: 2,
        lastModified: '2024-01-29',
        modifiedBy: 'Lisa Wang'
      }
    ],
    attachments: ['floor_plans.pdf', 'material_specifications.pdf', 'timeline.pdf', 'permits.pdf'],
    approvals: [
      {
        id: 'APP001',
        approverName: 'John Smith',
        approverRole: 'Technical Director',
        status: 'approved',
        comment: 'Technical specifications look good',
        timestamp: '2024-01-24',
        required: true
      },
      {
        id: 'APP002',
        approverName: 'Emma Wilson',
        approverRole: 'Legal Counsel',
        status: 'pending',
        required: true
      }
    ],
    comments: [
      {
        id: 'COM001',
        authorName: 'Sarah Martinez',
        authorAvatar: '/avatars/sarah-m.jpg',
        content: 'Could we explore sustainable building options?',
        timestamp: '2024-01-28',
        sectionId: 'SEC002',
        isInternal: false
      }
    ],
    analytics: {
      views: 12,
      timeSpent: 45,
      sectionsViewed: ['SEC001', 'SEC002'],
      downloadCount: 3,
      shareCount: 2
    },
    clientFeedback: 'Impressed with the sustainability options. Would like to discuss LEED certification.',
    winProbability: 75,
    competitorInfo: 'Competing with BuildCorp - they submitted a lower bid',
    nextFollowUp: 'Schedule meeting to discuss LEED certification options',
    tags: ['commercial', 'high-value', 'sustainability', 'leed'],
    customFields: {
      projectSize: '50,000 sq ft',
      constructionType: 'Mixed-use commercial',
      sustainabilityRating: 'LEED Gold Target'
    }
  },
  {
    id: 'PROP002',
    title: 'Residential Complex Phase 2 Proposal',
    description: 'Proposal for the second phase of luxury residential complex construction',
    clientName: 'David Wilson',
    clientCompany: 'Green Valley Homes',
    clientEmail: 'david.w@greenvalley.com',
    clientPhone: '+1 (555) 987-6543',
    clientAvatar: '/avatars/david-w.jpg',
    dealId: 'DEAL002',
    value: 1800000,
    status: 'sent',
    priority: 'high',
    createdBy: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdDate: '2024-01-20',
    lastModified: '2024-01-29',
    sentDate: '2024-01-29',
    expiryDate: '2024-03-01',
    version: 2,
    template: 'Residential Construction Template',
    sections: [],
    attachments: ['residential_plans.pdf', 'sustainability_features.pdf'],
    approvals: [
      {
        id: 'APP003',
        approverName: 'Mike Chen',
        approverRole: 'Project Manager',
        status: 'approved',
        timestamp: '2024-01-28',
        required: true
      }
    ],
    comments: [],
    analytics: {
      views: 5,
      timeSpent: 22,
      sectionsViewed: [],
      downloadCount: 1,
      shareCount: 0
    },
    winProbability: 60,
    nextFollowUp: 'Follow up on proposal review status',
    tags: ['residential', 'luxury', 'phase-2'],
    customFields: {
      units: '120 units',
      targetCompletion: 'Q4 2024'
    }
  },
  {
    id: 'PROP003',
    title: 'Office Building Renovation Proposal',
    description: 'Complete renovation proposal for 25-story office building with modern amenities',
    clientName: 'Emily Rodriguez',
    clientCompany: 'TechStart Inc',
    clientEmail: 'emily.r@techstart.com',
    clientPhone: '+1 (555) 456-7890',
    clientAvatar: '/avatars/emily-r.jpg',
    dealId: 'DEAL003',
    value: 950000,
    status: 'draft',
    priority: 'medium',
    createdBy: {
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      email: 'james.w@buildiyo.com'
    },
    createdDate: '2024-01-25',
    lastModified: '2024-01-30',
    expiryDate: '2024-03-15',
    version: 1,
    template: 'Office Renovation Template',
    sections: [],
    attachments: ['renovation_scope.pdf'],
    approvals: [
      {
        id: 'APP004',
        approverName: 'Sarah Rodriguez',
        approverRole: 'Senior Manager',
        status: 'pending',
        required: true
      }
    ],
    comments: [],
    analytics: {
      views: 0,
      timeSpent: 0,
      sectionsViewed: [],
      downloadCount: 0,
      shareCount: 0
    },
    winProbability: 40,
    nextFollowUp: 'Complete proposal and submit for approval',
    tags: ['office', 'renovation', 'tech-company'],
    customFields: {
      floors: '25 floors',
      occupancy: '500+ employees'
    }
  }
];

function getStatusColor(status: Proposal['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'review': return 'bg-orange-100 text-orange-800';
    case 'sent': return 'bg-blue-100 text-blue-800';
    case 'viewed': return 'bg-purple-100 text-purple-800';
    case 'negotiation': return 'bg-yellow-100 text-yellow-800';
    case 'accepted': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'expired': return 'bg-gray-100 text-gray-600';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: Proposal['priority']) {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getApprovalStatusColor(status: ProposalApproval['status']) {
  switch (status) {
    case 'approved': return 'text-green-600';
    case 'rejected': return 'text-red-600';
    case 'pending': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'currency' | 'days') {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'days':
      return `${value.toFixed(1)} days`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export default function ProposalManagement() {
  const [proposals] = useState(mockProposals);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  const filteredProposals = useMemo(() => {
    return proposals.filter(proposal => {
      const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           proposal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           proposal.clientCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || proposal.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'all' || 
                             (proposal.assignedTo && proposal.assignedTo.name === assigneeFilter) ||
                             proposal.createdBy.name === assigneeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
    });
  }, [proposals, searchQuery, statusFilter, priorityFilter, assigneeFilter]);

  const summaryStats = useMemo(() => {
    const totalProposals = proposals.length;
    const activeProposals = proposals.filter(p => !['accepted', 'rejected', 'expired'].includes(p.status)).length;
    const totalValue = proposals.reduce((sum, p) => sum + p.value, 0);
    const avgWinProbability = proposals.reduce((sum, p) => sum + p.winProbability, 0) / totalProposals;
    const pendingApprovals = proposals.reduce((sum, p) => 
      sum + p.approvals.filter(a => a.status === 'pending').length, 0);

    return {
      totalProposals,
      activeProposals,
      totalValue,
      avgWinProbability,
      pendingApprovals
    };
  }, [proposals]);

  const uniqueAssignees = useMemo(() => {
    const assignees = new Set();
    proposals.forEach(p => {
      assignees.add(p.createdBy.name);
      if (p.assignedTo) assignees.add(p.assignedTo.name);
    });
    return Array.from(assignees) as string[];
  }, [proposals]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Proposal Management</h1>
          <p className="text-gray-600">Create, track, and manage sales proposals</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Template
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Proposal
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {proposalMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          
          return (
            <Card key={metric.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-semibold",
                    isPositive ? "text-emerald-600" : "text-red-600"
                  )}>
                    {isPositive ? '↗' : '↙'} {Math.abs(metric.change)}%
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-500">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatValue(metric.value, metric.format)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Proposal Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Proposals</TabsTrigger>
          <TabsTrigger value="all">All Proposals</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Active Proposals Tab */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search proposals..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {uniqueAssignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Proposals List */}
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{proposal.title}</h3>
                            <Badge className={cn("text-xs", getStatusColor(proposal.status))}>
                              {proposal.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getPriorityColor(proposal.priority))}>
                              {proposal.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{proposal.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{proposal.clientCompany}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{proposal.clientName}</span>
                            </div>
                            <span>•</span>
                            <span>Version {proposal.version}</span>
                          </div>
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
                              View Proposal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Proposal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Send to Client
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
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

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Proposal Value</p>
                          <p className="text-xl font-bold text-green-600">
                            ${proposal.value.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Win Probability</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={proposal.winProbability} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{proposal.winProbability}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Expires</p>
                          <p className="text-lg font-semibold">
                            {new Date(proposal.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Analytics</p>
                          <div className="flex items-center space-x-3 text-sm">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{proposal.analytics.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-3 w-3" />
                              <span>{proposal.analytics.downloadCount}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{proposal.analytics.timeSpent}m</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={proposal.createdBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {proposal.createdBy.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{proposal.createdBy.name}</span>
                          </div>
                          
                          {proposal.assignedTo && (
                            <>
                              <span className="text-gray-400">→</span>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={proposal.assignedTo.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {proposal.assignedTo.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600">{proposal.assignedTo.name}</span>
                              </div>
                            </>
                          )}
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <span>Modified: {new Date(proposal.lastModified).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {proposal.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Approvals Status */}
                      {proposal.approvals.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Approvals:</p>
                          <div className="flex flex-wrap gap-2">
                            {proposal.approvals.map((approval) => (
                              <div key={approval.id} className="flex items-center space-x-2 text-sm">
                                <span className="text-gray-600">{approval.approverName}:</span>
                                <Badge className={cn("text-xs", 
                                  approval.status === 'approved' ? "bg-green-100 text-green-800" :
                                  approval.status === 'rejected' ? "bg-red-100 text-red-800" :
                                  "bg-yellow-100 text-yellow-800"
                                )}>
                                  {approval.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {proposal.clientFeedback && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-1">Client Feedback:</p>
                          <p className="text-sm text-gray-600 italic">"{proposal.clientFeedback}"</p>
                        </div>
                      )}

                      {proposal.nextFollowUp && (
                        <div className="pt-2">
                          <p className="text-sm text-gray-600">
                            <strong>Next Follow-up:</strong> {proposal.nextFollowUp}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredProposals.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || assigneeFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first proposal to get started"
                    }
                  </p>
                  {(!searchQuery && statusFilter === 'all' && priorityFilter === 'all' && assigneeFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Proposal
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* All Proposals Tab */}
        <TabsContent value="all" className="space-y-6">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">All proposals view would include archived and historical proposals</p>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="text-center py-8">
            <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Proposal templates library would be displayed here</p>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Proposal performance trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Win Rate Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Win rate analysis chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
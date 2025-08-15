'use client';

import { useState, useMemo } from 'react';
import {
  RotateCcw,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Play,
  Pause,
  Stop,
  Clock,
  Users,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Settings,
  Upload,
  Share2,
  Zap,
  Bell,
  ArrowRight,
  Timer,
  UserCheck,
  Repeat,
  AlertCircle
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
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface FollowUpAction {
  id: string;
  type: 'email' | 'sms' | 'call' | 'task' | 'linkedin' | 'note';
  name: string;
  description: string;
  timing: {
    delay: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks';
    fromPrevious: boolean;
  };
  content?: {
    subject?: string;
    template?: string;
    message?: string;
    variables?: string[];
  };
  conditions?: {
    field: string;
    operator: 'equals' | 'not-equals' | 'greater' | 'less' | 'contains' | 'exists';
    value: string | number | boolean;
  }[];
  assignTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isActive: boolean;
  order: number;
}

interface FollowUpSequence {
  id: string;
  name: string;
  description: string;
  purpose: 'initial-contact' | 'post-meeting' | 'proposal-sent' | 'quote-sent' | 'dormant-reactivation' | 'nurturing' | 'closing';
  status: 'draft' | 'active' | 'paused' | 'archived';
  trigger: {
    type: 'manual' | 'automatic' | 'time-based' | 'event-based';
    conditions?: {
      leadStatus?: string[];
      leadScore?: { min: number; max: number };
      lastActivity?: { days: number; operator: 'greater' | 'less' };
      source?: string[];
    };
  };
  actions: FollowUpAction[];
  settings: {
    maxAttempts?: number;
    stopOnReply: boolean;
    stopOnMeeting: boolean;
    respectBusinessHours: boolean;
    timeZone: string;
    pauseOnWeekends: boolean;
  };
  targeting: {
    leadSources: string[];
    leadStatuses: string[];
    industries: string[];
    companySizes: string[];
    territories: string[];
  };
  metrics: {
    totalExecutions: number;
    successfulExecutions: number;
    completionRate: number;
    responseRate: number;
    meetingRate: number;
    conversionRate: number;
    avgTimeToResponse: number; // in hours
    lastExecuted?: string;
  };
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isTemplate: boolean;
  parentTemplateId?: string;
  customFields?: Record<string, any>;
}

interface SequenceMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'hours' | 'days';
}

const sequenceMetrics: SequenceMetric[] = [
  {
    id: 'total-sequences',
    title: 'Total Sequences',
    value: 34,
    change: 17.6,
    trend: 'up',
    icon: RotateCcw,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'active-sequences',
    title: 'Active Sequences',
    value: 28,
    change: 12.5,
    trend: 'up',
    icon: Play,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'number'
  },
  {
    id: 'avg-response-rate',
    title: 'Avg Response Rate',
    value: 32.4,
    change: 8.3,
    trend: 'up',
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage'
  },
  {
    id: 'avg-meeting-rate',
    title: 'Avg Meeting Rate',
    value: 18.7,
    change: 5.2,
    trend: 'up',
    icon: Calendar,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    format: 'percentage'
  },
  {
    id: 'leads-in-sequence',
    title: 'Leads in Sequence',
    value: 1567,
    change: 23.1,
    trend: 'up',
    icon: Users,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'number'
  },
  {
    id: 'avg-time-to-response',
    title: 'Avg Time to Response',
    value: 14.2,
    change: -3.7,
    trend: 'down',
    icon: Timer,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    format: 'hours'
  }
];

const mockSequences: FollowUpSequence[] = [
  {
    id: 'SEQ001',
    name: 'Initial Contact Sequence - Construction Leads',
    description: 'Multi-touch follow-up sequence for new construction project leads with personalized outreach',
    purpose: 'initial-contact',
    status: 'active',
    trigger: {
      type: 'automatic',
      conditions: {
        leadStatus: ['new', 'contacted'],
        leadScore: { min: 40, max: 100 },
        source: ['website', 'referral']
      }
    },
    actions: [
      {
        id: 'act1',
        type: 'email',
        name: 'Initial Contact Email',
        description: 'Personalized introduction email with company capabilities',
        timing: { delay: 4, unit: 'hours', fromPrevious: false },
        content: {
          subject: 'Your {{project_type}} Project - Let\'s Connect',
          template: 'initial-contact-construction',
          variables: ['first_name', 'project_type', 'company_name']
        },
        priority: 'high',
        isActive: true,
        order: 1
      },
      {
        id: 'act2',
        type: 'task',
        name: 'Research Lead Background',
        description: 'Create task to research lead\'s company and project details',
        timing: { delay: 1, unit: 'days', fromPrevious: true },
        assignTo: 'sales_rep',
        priority: 'medium',
        isActive: true,
        order: 2
      },
      {
        id: 'act3',
        type: 'call',
        name: 'Follow-up Call',
        description: 'Schedule follow-up call if no email response',
        timing: { delay: 3, unit: 'days', fromPrevious: true },
        conditions: [
          { field: 'email_replied', operator: 'equals', value: false }
        ],
        assignTo: 'sales_rep',
        priority: 'high',
        isActive: true,
        order: 3
      },
      {
        id: 'act4',
        type: 'linkedin',
        name: 'LinkedIn Connection',
        description: 'Send LinkedIn connection request with personalized message',
        timing: { delay: 2, unit: 'days', fromPrevious: true },
        content: {
          message: 'Hi {{first_name}}, I reached out about your {{project_type}} project. Would love to connect!'
        },
        priority: 'medium',
        isActive: true,
        order: 4
      },
      {
        id: 'act5',
        type: 'email',
        name: 'Case Study Follow-up',
        description: 'Share relevant case study and project examples',
        timing: { delay: 5, unit: 'days', fromPrevious: true },
        content: {
          subject: 'Similar {{project_type}} Projects We\'ve Completed',
          template: 'case-study-followup',
          variables: ['first_name', 'project_type']
        },
        conditions: [
          { field: 'call_completed', operator: 'equals', value: false }
        ],
        priority: 'medium',
        isActive: true,
        order: 5
      }
    ],
    settings: {
      maxAttempts: 5,
      stopOnReply: true,
      stopOnMeeting: true,
      respectBusinessHours: true,
      timeZone: 'America/New_York',
      pauseOnWeekends: true
    },
    targeting: {
      leadSources: ['website', 'referral', 'cold-outreach'],
      leadStatuses: ['new', 'contacted', 'qualified'],
      industries: ['construction', 'real-estate'],
      companySizes: ['small', 'medium', 'large'],
      territories: ['north-america', 'canada']
    },
    metrics: {
      totalExecutions: 342,
      successfulExecutions: 298,
      completionRate: 87.1,
      responseRate: 34.2,
      meetingRate: 21.8,
      conversionRate: 28.4,
      avgTimeToResponse: 18.5,
      lastExecuted: '2024-02-02T16:30:00Z'
    },
    createdBy: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah-j.jpg',
      email: 'sarah.j@buildiyo.com'
    },
    assignedTo: {
      id: 'user2',
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-01T14:20:00Z',
    tags: ['construction', 'initial-contact', 'high-converting', 'automated'],
    isTemplate: false
  },
  {
    id: 'SEQ002',
    name: 'Post-Proposal Follow-up Sequence',
    description: 'Structured follow-up sequence after sending project proposals to maintain engagement',
    purpose: 'proposal-sent',
    status: 'active',
    trigger: {
      type: 'event-based',
      conditions: {
        leadStatus: ['proposal-sent'],
        lastActivity: { days: 2, operator: 'greater' }
      }
    },
    actions: [
      {
        id: 'act1',
        type: 'email',
        name: 'Proposal Confirmation',
        description: 'Confirm proposal receipt and offer to answer questions',
        timing: { delay: 24, unit: 'hours', fromPrevious: false },
        content: {
          subject: 'Your {{project_name}} Proposal - Questions?',
          template: 'proposal-confirmation',
          variables: ['first_name', 'project_name', 'proposal_value']
        },
        priority: 'high',
        isActive: true,
        order: 1
      },
      {
        id: 'act2',
        type: 'task',
        name: 'Schedule Check-in Call',
        description: 'Create task to schedule follow-up call about proposal',
        timing: { delay: 3, unit: 'days', fromPrevious: true },
        assignTo: 'proposal_owner',
        priority: 'high',
        isActive: true,
        order: 2
      },
      {
        id: 'act3',
        type: 'call',
        name: 'Proposal Discussion Call',
        description: 'Call to discuss proposal details and address concerns',
        timing: { delay: 2, unit: 'days', fromPrevious: true },
        conditions: [
          { field: 'proposal_viewed', operator: 'equals', value: true }
        ],
        assignTo: 'proposal_owner',
        priority: 'urgent',
        isActive: true,
        order: 3
      },
      {
        id: 'act4',
        type: 'email',
        name: 'Value Proposition Reminder',
        description: 'Highlight key benefits and value propositions',
        timing: { delay: 1, unit: 'weeks', fromPrevious: true },
        content: {
          subject: 'Key Benefits of Our {{project_type}} Approach',
          template: 'value-proposition',
          variables: ['first_name', 'project_type', 'key_benefits']
        },
        conditions: [
          { field: 'call_completed', operator: 'equals', value: false }
        ],
        priority: 'medium',
        isActive: true,
        order: 4
      }
    ],
    settings: {
      maxAttempts: 4,
      stopOnReply: true,
      stopOnMeeting: true,
      respectBusinessHours: true,
      timeZone: 'America/New_York',
      pauseOnWeekends: true
    },
    targeting: {
      leadSources: ['all'],
      leadStatuses: ['proposal-sent', 'proposal-viewed'],
      industries: ['construction', 'real-estate', 'manufacturing'],
      companySizes: ['medium', 'large'],
      territories: ['all']
    },
    metrics: {
      totalExecutions: 156,
      successfulExecutions: 142,
      completionRate: 91.0,
      responseRate: 42.3,
      meetingRate: 35.9,
      conversionRate: 41.7,
      avgTimeToResponse: 12.3,
      lastExecuted: '2024-02-01T11:45:00Z'
    },
    createdBy: {
      id: 'user3',
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdAt: '2024-01-20T15:30:00Z',
    updatedAt: '2024-01-30T09:15:00Z',
    tags: ['proposal-followup', 'high-value', 'closing-focused'],
    isTemplate: false
  },
  {
    id: 'SEQ003',
    name: 'Dormant Lead Reactivation',
    description: 'Strategic sequence to re-engage leads that have been dormant for 60+ days',
    purpose: 'dormant-reactivation',
    status: 'active',
    trigger: {
      type: 'time-based',
      conditions: {
        leadStatus: ['qualified', 'contacted', 'follow-up'],
        lastActivity: { days: 60, operator: 'greater' }
      }
    },
    actions: [
      {
        id: 'act1',
        type: 'email',
        name: 'Reactivation Email',
        description: 'Friendly check-in with updated company information',
        timing: { delay: 0, unit: 'hours', fromPrevious: false },
        content: {
          subject: 'Checking in - {{company_name}} Updates',
          template: 'dormant-reactivation',
          variables: ['first_name', 'company_name', 'last_interaction']
        },
        priority: 'medium',
        isActive: true,
        order: 1
      },
      {
        id: 'act2',
        type: 'sms',
        name: 'Quick SMS Check-in',
        description: 'Brief SMS if no email response',
        timing: { delay: 1, unit: 'weeks', fromPrevious: true },
        content: {
          message: 'Hi {{first_name}}, just checking if you still have that {{project_type}} project in the works?'
        },
        conditions: [
          { field: 'email_opened', operator: 'equals', value: false }
        ],
        priority: 'low',
        isActive: true,
        order: 2
      },
      {
        id: 'act3',
        type: 'task',
        name: 'Manual Reactivation Review',
        description: 'Create task for sales rep to review lead status',
        timing: { delay: 2, unit: 'weeks', fromPrevious: true },
        assignTo: 'original_owner',
        priority: 'low',
        isActive: true,
        order: 3
      }
    ],
    settings: {
      maxAttempts: 3,
      stopOnReply: true,
      stopOnMeeting: false,
      respectBusinessHours: true,
      timeZone: 'America/New_York',
      pauseOnWeekends: true
    },
    targeting: {
      leadSources: ['all'],
      leadStatuses: ['qualified', 'contacted', 'follow-up', 'nurturing'],
      industries: ['all'],
      companySizes: ['all'],
      territories: ['all']
    },
    metrics: {
      totalExecutions: 89,
      successfulExecutions: 76,
      completionRate: 85.4,
      responseRate: 16.9,
      meetingRate: 9.0,
      conversionRate: 11.2,
      avgTimeToResponse: 72.4,
      lastExecuted: '2024-01-28T14:20:00Z'
    },
    createdBy: {
      id: 'user4',
      name: 'David Wilson',
      avatar: '/avatars/david-w.jpg',
      email: 'david.w@buildiyo.com'
    },
    createdAt: '2024-01-25T11:00:00Z',
    updatedAt: '2024-02-01T16:30:00Z',
    tags: ['reactivation', 'dormant-leads', 'low-touch'],
    isTemplate: false
  }
];

function getPurposeColor(purpose: FollowUpSequence['purpose']) {
  switch (purpose) {
    case 'initial-contact': return 'bg-blue-100 text-blue-800';
    case 'post-meeting': return 'bg-green-100 text-green-800';
    case 'proposal-sent': return 'bg-purple-100 text-purple-800';
    case 'quote-sent': return 'bg-orange-100 text-orange-800';
    case 'dormant-reactivation': return 'bg-red-100 text-red-800';
    case 'nurturing': return 'bg-yellow-100 text-yellow-800';
    case 'closing': return 'bg-indigo-100 text-indigo-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: FollowUpSequence['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'archived': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getActionTypeIcon(type: FollowUpAction['type']) {
  switch (type) {
    case 'email': return Mail;
    case 'sms': return MessageSquare;
    case 'call': return Phone;
    case 'task': return CheckCircle;
    case 'linkedin': return UserCheck;
    case 'note': return Edit;
    default: return Activity;
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'hours' | 'days') {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'hours':
      return `${value.toFixed(1)}h`;
    case 'days':
      return `${value.toFixed(0)} days`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export default function FollowUpSequences() {
  const [sequences] = useState(mockSequences);
  const [searchQuery, setSearchQuery] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSequence, setSelectedSequence] = useState<FollowUpSequence | null>(null);

  const filteredSequences = useMemo(() => {
    return sequences.filter(sequence => {
      const matchesSearch = sequence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sequence.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sequence.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPurpose = purposeFilter === 'all' || sequence.purpose === purposeFilter;
      const matchesStatus = statusFilter === 'all' || sequence.status === statusFilter;
      
      return matchesSearch && matchesPurpose && matchesStatus;
    });
  }, [sequences, searchQuery, purposeFilter, statusFilter]);

  const summaryStats = useMemo(() => {
    const totalSequences = sequences.length;
    const activeSequences = sequences.filter(s => s.status === 'active').length;
    const avgResponseRate = sequences.reduce((sum, s) => sum + s.metrics.responseRate, 0) / totalSequences;
    const totalLeadsInSequence = sequences.reduce((sum, s) => sum + s.metrics.totalExecutions, 0);

    return {
      totalSequences,
      activeSequences,
      avgResponseRate,
      totalLeadsInSequence
    };
  }, [sequences]);

  const uniquePurposes = useMemo(() => {
    const purposes = new Set(sequences.map(s => s.purpose));
    return Array.from(purposes);
  }, [sequences]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Follow-up Sequences</h1>
          <p className="text-gray-600">Automated multi-touch follow-up sequences for different lead scenarios</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Sequence
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Sequence
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {sequenceMetrics.map((metric) => {
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

      {/* Sequence Management Tabs */}
      <Tabs defaultValue="sequences" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sequences">All Sequences</TabsTrigger>
          <TabsTrigger value="builder">Sequence Builder</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* All Sequences Tab */}
        <TabsContent value="sequences" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search sequences..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={purposeFilter} onValueChange={setPurposeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Purposes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purposes</SelectItem>
                {uniquePurposes.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Sequences List */}
          <div className="space-y-4">
            {filteredSequences.map((sequence) => (
              <Card key={sequence.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{sequence.name}</h3>
                            <Badge className={cn("text-xs", getStatusColor(sequence.status))}>
                              {sequence.status.toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getPurposeColor(sequence.purpose))}>
                              {sequence.purpose.replace('-', ' ').toUpperCase()}
                            </Badge>
                            {sequence.isTemplate && (
                              <Badge className="bg-purple-100 text-purple-800 text-xs">
                                TEMPLATE
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{sequence.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Activity className="h-4 w-4" />
                              <span>{sequence.actions.length} actions</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Repeat className="h-4 w-4" />
                              <span>Max {sequence.settings.maxAttempts || 'unlimited'} attempts</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{sequence.metrics.totalExecutions} executions</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={sequence.status === 'active'}
                            size="sm"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedSequence(sequence)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Sequence
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Play className="h-4 w-4 mr-2" />
                                Test Sequence
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
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

                      {/* Actions Timeline */}
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-2">Sequence Actions:</p>
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                          {sequence.actions.slice(0, 5).map((action, index) => {
                            const ActionIcon = getActionTypeIcon(action.type);
                            return (
                              <div key={action.id} className="flex items-center space-x-2 flex-shrink-0">
                                <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                                  <ActionIcon className="h-3 w-3" />
                                  <span className="text-xs font-medium">{action.name}</span>
                                  <span className="text-xs text-gray-500">
                                    +{action.timing.delay}{action.timing.unit.charAt(0)}
                                  </span>
                                </div>
                                {index < Math.min(sequence.actions.length - 1, 4) && (
                                  <ArrowRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                )}
                              </div>
                            );
                          })}
                          {sequence.actions.length > 5 && (
                            <div className="text-xs text-gray-500 flex-shrink-0">
                              +{sequence.actions.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Response Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={sequence.metrics.responseRate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{sequence.metrics.responseRate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Meeting Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={sequence.metrics.meetingRate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{sequence.metrics.meetingRate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={sequence.metrics.conversionRate} className="flex-1 h-2" />
                            <span className="text-sm font-medium text-green-600">{sequence.metrics.conversionRate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Avg Response Time</p>
                          <p className="text-lg font-semibold">{sequence.metrics.avgTimeToResponse.toFixed(1)}h</p>
                        </div>
                      </div>

                      {/* Settings & Targeting */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Settings:</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>Business hours: {sequence.settings.respectBusinessHours ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Bell className="h-3 w-3" />
                              <span>Stop on reply: {sequence.settings.stopOnReply ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-3 w-3" />
                              <span>Weekends: {sequence.settings.pauseOnWeekends ? 'Paused' : 'Active'}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Targeting:</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Industries: {sequence.targeting.industries.slice(0, 2).join(', ')}{sequence.targeting.industries.length > 2 && ` +${sequence.targeting.industries.length - 2}`}</div>
                            <div>Company Sizes: {sequence.targeting.companySizes.slice(0, 2).join(', ')}{sequence.targeting.companySizes.length > 2 && ` +${sequence.targeting.companySizes.length - 2}`}</div>
                            <div>Lead Sources: {sequence.targeting.leadSources.slice(0, 2).join(', ')}{sequence.targeting.leadSources.length > 2 && ` +${sequence.targeting.leadSources.length - 2}`}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={sequence.createdBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {sequence.createdBy.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{sequence.createdBy.name}</span>
                          </div>
                          
                          {sequence.assignedTo && (
                            <>
                              <span className="text-gray-400">→</span>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={sequence.assignedTo.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {sequence.assignedTo.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600">{sequence.assignedTo.name}</span>
                              </div>
                            </>
                          )}
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>
                              {sequence.metrics.lastExecuted 
                                ? `Last run: ${new Date(sequence.metrics.lastExecuted).toLocaleDateString()}`
                                : 'Never run'
                              }
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {sequence.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {sequence.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{sequence.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSequences.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <RotateCcw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No follow-up sequences found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || purposeFilter !== 'all' || statusFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first follow-up sequence to get started"
                    }
                  </p>
                  {(!searchQuery && purposeFilter === 'all' && statusFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Sequence
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Sequence Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          <div className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Sequence builder interface would be displayed here</p>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Performance metrics and benchmarks would be displayed here</p>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sequence Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sequence performance analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Response Rate Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Response rate analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
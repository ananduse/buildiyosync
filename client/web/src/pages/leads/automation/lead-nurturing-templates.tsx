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
  Play,
  Pause,
  Star,
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
  Heart,
  ThumbsUp
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

interface NurturingStep {
  id: string;
  type: 'email' | 'sms' | 'call' | 'task' | 'wait' | 'condition';
  name: string;
  description: string;
  delay: {
    value: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks';
  };
  content?: {
    subject?: string;
    template?: string;
    variables?: string[];
  };
  conditions?: {
    field: string;
    operator: 'equals' | 'not-equals' | 'greater' | 'less' | 'contains';
    value: string | number;
  }[];
  order: number;
}

interface NurturingTemplate {
  id: string;
  name: string;
  description: string;
  category: 'new-lead' | 'follow-up' | 'engagement' | 'reactivation' | 'conversion' | 'retention';
  industry: 'construction' | 'real-estate' | 'manufacturing' | 'technology' | 'general';
  status: 'draft' | 'active' | 'paused' | 'archived';
  steps: NurturingStep[];
  duration: {
    value: number;
    unit: 'days' | 'weeks' | 'months';
  };
  targetAudience: {
    leadScore?: { min: number; max: number };
    source?: string[];
    company_size?: string[];
    location?: string[];
  };
  metrics: {
    totalUses: number;
    activeUses: number;
    completionRate: number;
    conversionRate: number;
    avgEngagement: number;
    lastUsed?: string;
  };
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  isFavorite: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  customization: {
    canEditContent: boolean;
    canEditTiming: boolean;
    canAddSteps: boolean;
    canRemoveSteps: boolean;
  };
  goals: string[];
  expectedOutcomes: {
    engagementIncrease: number;
    conversionRate: number;
    timeToConvert: number;
  };
}

interface TemplateMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'days' | 'currency';
}

const templateMetrics: TemplateMetric[] = [
  {
    id: 'total-templates',
    title: 'Total Templates',
    value: 47,
    change: 15.3,
    trend: 'up',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'active-templates',
    title: 'Active Templates',
    value: 32,
    change: 8.7,
    trend: 'up',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'number'
  },
  {
    id: 'avg-conversion-rate',
    title: 'Avg Conversion Rate',
    value: 24.8,
    change: 3.2,
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage'
  },
  {
    id: 'avg-completion-rate',
    title: 'Avg Completion Rate',
    value: 67.4,
    change: -2.1,
    trend: 'down',
    icon: CheckCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    format: 'percentage'
  },
  {
    id: 'total-leads-nurtured',
    title: 'Leads Nurtured',
    value: 3427,
    change: 22.6,
    trend: 'up',
    icon: Users,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'number'
  },
  {
    id: 'avg-engagement-score',
    title: 'Avg Engagement',
    value: 78.9,
    change: 5.4,
    trend: 'up',
    icon: TrendingUp,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    format: 'percentage'
  }
];

const mockTemplates: NurturingTemplate[] = [
  {
    id: 'TMPL001',
    name: 'New Construction Lead Welcome Series',
    description: 'Comprehensive 14-day nurturing sequence for new construction project leads with educational content and personal touch points',
    category: 'new-lead',
    industry: 'construction',
    status: 'active',
    steps: [
      {
        id: 'step1',
        type: 'email',
        name: 'Welcome & Introduction',
        description: 'Immediate welcome email with company introduction and what to expect',
        delay: { value: 0, unit: 'minutes' },
        content: {
          subject: 'Welcome to {{company_name}} - Your Construction Project Journey Begins',
          template: 'welcome-construction',
          variables: ['first_name', 'company_name', 'project_type']
        },
        order: 1
      },
      {
        id: 'step2',
        type: 'wait',
        name: 'Wait 1 Day',
        description: 'Allow time for initial email to be processed',
        delay: { value: 1, unit: 'days' },
        order: 2
      },
      {
        id: 'step3',
        type: 'email',
        name: 'Construction Planning Guide',
        description: 'Educational content about construction planning process',
        delay: { value: 0, unit: 'minutes' },
        content: {
          subject: 'Your Construction Planning Guide - 5 Essential Steps',
          template: 'planning-guide',
          variables: ['first_name', 'project_type']
        },
        order: 3
      },
      {
        id: 'step4',
        type: 'condition',
        name: 'Check Email Engagement',
        description: 'Check if lead opened previous emails',
        delay: { value: 2, unit: 'days' },
        conditions: [
          { field: 'email_opened', operator: 'equals', value: true }
        ],
        order: 4
      },
      {
        id: 'step5',
        type: 'task',
        name: 'Personal Follow-up Call',
        description: 'Create task for sales rep to make personal call',
        delay: { value: 0, unit: 'minutes' },
        order: 5
      }
    ],
    duration: { value: 14, unit: 'days' },
    targetAudience: {
      leadScore: { min: 30, max: 100 },
      source: ['website', 'referral'],
      company_size: ['small', 'medium', 'large']
    },
    metrics: {
      totalUses: 234,
      activeUses: 45,
      completionRate: 78.3,
      conversionRate: 32.1,
      avgEngagement: 85.7,
      lastUsed: '2024-02-02T14:30:00Z'
    },
    createdBy: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah-j.jpg',
      email: 'sarah.j@buildiyo.com'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-30T16:45:00Z',
    isPublic: true,
    isFavorite: true,
    rating: 4.8,
    reviews: 67,
    tags: ['construction', 'welcome-series', 'high-conversion', 'educational'],
    customization: {
      canEditContent: true,
      canEditTiming: true,
      canAddSteps: true,
      canRemoveSteps: false
    },
    goals: [
      'Welcome new construction leads',
      'Educate about construction process',
      'Build trust and credibility',
      'Schedule consultation call'
    ],
    expectedOutcomes: {
      engagementIncrease: 85,
      conversionRate: 32,
      timeToConvert: 14
    }
  },
  {
    id: 'TMPL002',
    name: 'Real Estate Follow-up Sequence',
    description: 'Multi-touch follow-up sequence for real estate leads who showed initial interest but haven\'t converted',
    category: 'follow-up',
    industry: 'real-estate',
    status: 'active',
    steps: [
      {
        id: 'step1',
        type: 'email',
        name: 'Thanks for Your Interest',
        description: 'Thank you email with relevant property information',
        delay: { value: 4, unit: 'hours' },
        content: {
          subject: 'Thank you for your interest in {{property_name}}',
          template: 'interest-thank-you',
          variables: ['first_name', 'property_name', 'property_type']
        },
        order: 1
      },
      {
        id: 'step2',
        type: 'wait',
        name: 'Wait 3 Days',
        description: 'Allow time for lead to review information',
        delay: { value: 3, unit: 'days' },
        order: 2
      },
      {
        id: 'step3',
        type: 'sms',
        name: 'Quick Check-in SMS',
        description: 'Brief SMS to check if they have any questions',
        delay: { value: 0, unit: 'minutes' },
        content: {
          template: 'check-in-sms',
          variables: ['first_name']
        },
        order: 3
      },
      {
        id: 'step4',
        type: 'wait',
        name: 'Wait 1 Week',
        description: 'Give space before next touch point',
        delay: { value: 1, unit: 'weeks' },
        order: 4
      },
      {
        id: 'step5',
        type: 'email',
        name: 'Market Insights & Similar Properties',
        description: 'Provide market insights and similar property suggestions',
        delay: { value: 0, unit: 'minutes' },
        content: {
          subject: 'Market Update: Similar Properties in {{area}}',
          template: 'market-insights',
          variables: ['first_name', 'area', 'property_type']
        },
        order: 5
      }
    ],
    duration: { value: 10, unit: 'days' },
    targetAudience: {
      leadScore: { min: 40, max: 80 },
      source: ['website', 'social_media'],
      location: ['urban', 'suburban']
    },
    metrics: {
      totalUses: 189,
      activeUses: 67,
      completionRate: 72.1,
      conversionRate: 28.4,
      avgEngagement: 79.2,
      lastUsed: '2024-02-01T11:20:00Z'
    },
    createdBy: {
      id: 'user2',
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-02-01T09:30:00Z',
    isPublic: true,
    isFavorite: false,
    rating: 4.6,
    reviews: 43,
    tags: ['real-estate', 'follow-up', 'multi-touch', 'conversion-focused'],
    customization: {
      canEditContent: true,
      canEditTiming: true,
      canAddSteps: true,
      canRemoveSteps: true
    },
    goals: [
      'Re-engage interested prospects',
      'Provide additional value',
      'Address potential objections',
      'Schedule property viewing'
    ],
    expectedOutcomes: {
      engagementIncrease: 79,
      conversionRate: 28,
      timeToConvert: 10
    }
  },
  {
    id: 'TMPL003',
    name: 'Lead Reactivation Campaign',
    description: 'Sophisticated campaign to re-engage cold leads who haven\'t interacted in 60+ days',
    category: 'reactivation',
    industry: 'general',
    status: 'active',
    steps: [
      {
        id: 'step1',
        type: 'email',
        name: 'We Miss You',
        description: 'Personalized re-engagement email',
        delay: { value: 0, unit: 'minutes' },
        content: {
          subject: 'We miss you, {{first_name}} - Special offer inside',
          template: 'reactivation-email',
          variables: ['first_name', 'last_interaction']
        },
        order: 1
      },
      {
        id: 'step2',
        type: 'condition',
        name: 'Check Email Open',
        description: 'Check if reactivation email was opened',
        delay: { value: 3, unit: 'days' },
        conditions: [
          { field: 'email_opened', operator: 'equals', value: false }
        ],
        order: 2
      },
      {
        id: 'step3',
        type: 'sms',
        name: 'Alternative Contact SMS',
        description: 'Try different channel if email not opened',
        delay: { value: 0, unit: 'minutes' },
        content: {
          template: 'reactivation-sms',
          variables: ['first_name']
        },
        order: 3
      },
      {
        id: 'step4',
        type: 'wait',
        name: 'Final Wait Period',
        description: 'Last chance period before marking inactive',
        delay: { value: 1, unit: 'weeks' },
        order: 4
      },
      {
        id: 'step5',
        type: 'task',
        name: 'Manual Review',
        description: 'Create task for manual review of lead status',
        delay: { value: 0, unit: 'minutes' },
        order: 5
      }
    ],
    duration: { value: 10, unit: 'days' },
    targetAudience: {
      leadScore: { min: 0, max: 30 },
      source: ['all']
    },
    metrics: {
      totalUses: 156,
      activeUses: 23,
      completionRate: 45.2,
      conversionRate: 12.8,
      avgEngagement: 34.6,
      lastUsed: '2024-01-28T16:15:00Z'
    },
    createdBy: {
      id: 'user3',
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdAt: '2024-01-25T11:30:00Z',
    updatedAt: '2024-01-30T14:20:00Z',
    isPublic: false,
    isFavorite: true,
    rating: 3.9,
    reviews: 28,
    tags: ['reactivation', 'cold-leads', 'multi-channel', 'last-chance'],
    customization: {
      canEditContent: true,
      canEditTiming: false,
      canAddSteps: false,
      canRemoveSteps: false
    },
    goals: [
      'Re-engage dormant leads',
      'Test alternative communication channels',
      'Identify truly dead leads',
      'Recover lost opportunities'
    ],
    expectedOutcomes: {
      engagementIncrease: 35,
      conversionRate: 13,
      timeToConvert: 10
    }
  }
];

function getCategoryColor(category: NurturingTemplate['category']) {
  switch (category) {
    case 'new-lead': return 'bg-green-100 text-green-800';
    case 'follow-up': return 'bg-blue-100 text-blue-800';
    case 'engagement': return 'bg-purple-100 text-purple-800';
    case 'reactivation': return 'bg-orange-100 text-orange-800';
    case 'conversion': return 'bg-red-100 text-red-800';
    case 'retention': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getIndustryColor(industry: NurturingTemplate['industry']) {
  switch (industry) {
    case 'construction': return 'bg-orange-100 text-orange-800';
    case 'real-estate': return 'bg-blue-100 text-blue-800';
    case 'manufacturing': return 'bg-gray-100 text-gray-800';
    case 'technology': return 'bg-purple-100 text-purple-800';
    case 'general': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: NurturingTemplate['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'archived': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStepTypeIcon(type: NurturingStep['type']) {
  switch (type) {
    case 'email': return Mail;
    case 'sms': return MessageSquare;
    case 'call': return Phone;
    case 'task': return CheckCircle;
    case 'wait': return Clock;
    case 'condition': return Target;
    default: return Activity;
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'days' | 'currency') {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'days':
      return `${value.toFixed(0)} days`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export default function LeadNurturingTemplates() {
  const [templates] = useState(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<NurturingTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
      const matchesIndustry = industryFilter === 'all' || template.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesIndustry && matchesStatus;
    });
  }, [templates, searchQuery, categoryFilter, industryFilter, statusFilter]);

  const summaryStats = useMemo(() => {
    const totalTemplates = templates.length;
    const activeTemplates = templates.filter(t => t.status === 'active').length;
    const avgConversionRate = templates.reduce((sum, t) => sum + t.metrics.conversionRate, 0) / totalTemplates;
    const totalLeadsNurtured = templates.reduce((sum, t) => sum + t.metrics.totalUses, 0);

    return {
      totalTemplates,
      activeTemplates,
      avgConversionRate,
      totalLeadsNurtured
    };
  }, [templates]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(templates.map(t => t.category));
    return Array.from(categories);
  }, [templates]);

  const uniqueIndustries = useMemo(() => {
    const industries = new Set(templates.map(t => t.industry));
    return Array.from(industries);
  }, [templates]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lead Nurturing Templates</h1>
          <p className="text-gray-600">Pre-built nurturing sequences for different lead types and industries</p>
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
            Create Template
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {templateMetrics.map((metric) => {
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

      {/* Template Management Tabs */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">All Templates</TabsTrigger>
          <TabsTrigger value="public">Public Library</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* All Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {uniqueIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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

          {/* Templates List */}
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{template.name}</h3>
                            <Badge className={cn("text-xs", getStatusColor(template.status))}>
                              {template.status.toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getCategoryColor(template.category))}>
                              {template.category.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getIndustryColor(template.industry))}>
                              {template.industry.replace('-', ' ').toUpperCase()}
                            </Badge>
                            {template.isPublic && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                PUBLIC
                              </Badge>
                            )}
                            {template.isFavorite && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{template.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Activity className="h-4 w-4" />
                              <span>{template.steps.length} steps</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{template.duration.value} {template.duration.unit}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{template.metrics.totalUses} uses</span>
                            </div>
                            {template.rating > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span>{template.rating.toFixed(1)} ({template.reviews})</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedTemplate(template)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Play className="h-4 w-4 mr-2" />
                              Use Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
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

                      {/* Steps Preview */}
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-2">Nurturing Steps:</p>
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                          {template.steps.slice(0, 5).map((step, index) => {
                            const StepIcon = getStepTypeIcon(step.type);
                            return (
                              <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                                <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                                  <StepIcon className="h-3 w-3" />
                                  <span className="text-xs font-medium">{step.name}</span>
                                </div>
                                {index < Math.min(template.steps.length - 1, 4) && (
                                  <div className="h-0.5 w-4 bg-gray-300 flex-shrink-0" />
                                )}
                              </div>
                            );
                          })}
                          {template.steps.length > 5 && (
                            <div className="text-xs text-gray-500 flex-shrink-0">
                              +{template.steps.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={template.metrics.conversionRate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{template.metrics.conversionRate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={template.metrics.completionRate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{template.metrics.completionRate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Engagement</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={template.metrics.avgEngagement} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{template.metrics.avgEngagement.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Active Uses</p>
                          <p className="text-lg font-semibold text-green-600">{template.metrics.activeUses}</p>
                        </div>
                      </div>

                      {/* Goals & Outcomes */}
                      <div className="pt-3 border-t">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Goals:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {template.goals.slice(0, 3).map((goal, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <Target className="h-3 w-3 text-gray-400" />
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Expected Outcomes:</p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Conversion: {template.expectedOutcomes.conversionRate}%</div>
                              <div>Engagement: +{template.expectedOutcomes.engagementIncrease}%</div>
                              <div>Time to Convert: {template.expectedOutcomes.timeToConvert} days</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={template.createdBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {template.createdBy.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{template.createdBy.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>Updated: {new Date(template.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTemplates.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || categoryFilter !== 'all' || industryFilter !== 'all' || statusFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first nurturing template to get started"
                    }
                  </p>
                  {(!searchQuery && categoryFilter === 'all' && industryFilter === 'all' && statusFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Public Library Tab */}
        <TabsContent value="public" className="space-y-6">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Public template library would be displayed here</p>
          </div>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Your favorite templates would be displayed here</p>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Template performance analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Conversion rate analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
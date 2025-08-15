'use client';

import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  User,
  Target,
  BarChart3,
  PieChart,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Star,
  Award,
  Handshake,
  FileText,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Building
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

interface Deal {
  id: string;
  title: string;
  description: string;
  company: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  contactAvatar?: string;
  value: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  source: string;
  assignedTo: {
    name: string;
    avatar?: string;
    email: string;
  };
  createdDate: string;
  lastActivity: string;
  nextAction: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dealType: 'new-business' | 'expansion' | 'renewal' | 'cross-sell' | 'upsell';
  competitorInfo?: string;
  lossReason?: string;
  tags: string[];
  documents: string[];
  activities: number;
  daysInStage: number;
  forecastCategory: 'pipeline' | 'best-case' | 'commit' | 'closed';
  productInterest: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  decisionMakers: string[];
  timeline: string;
  customFields?: Record<string, any>;
}

interface DealMetric {
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

const dealMetrics: DealMetric[] = [
  {
    id: 'total-pipeline-value',
    title: 'Total Pipeline Value',
    value: 8750000,
    change: 12.5,
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'currency'
  },
  {
    id: 'weighted-pipeline',
    title: 'Weighted Pipeline',
    value: 4680000,
    change: 8.7,
    trend: 'up',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'currency'
  },
  {
    id: 'avg-deal-size',
    title: 'Avg Deal Size',
    value: 125000,
    change: -3.2,
    trend: 'down',
    icon: BarChart3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'currency'
  },
  {
    id: 'win-rate',
    title: 'Win Rate',
    value: 28.5,
    change: 2.1,
    trend: 'up',
    icon: Award,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'percentage'
  },
  {
    id: 'avg-sales-cycle',
    title: 'Avg Sales Cycle',
    value: 45,
    change: -5.8,
    trend: 'down',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'days'
  },
  {
    id: 'deals-closing-this-month',
    title: 'Closing This Month',
    value: 12,
    change: 9.1,
    trend: 'up',
    icon: Calendar,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'number'
  }
];

const mockDeals: Deal[] = [
  {
    id: 'DEAL001',
    title: 'Metro Plaza Commercial Development',
    description: 'Large-scale commercial plaza development project with mixed-use facilities',
    company: 'Metro Development Corp',
    contactPerson: 'Sarah Martinez',
    contactEmail: 'sarah.m@metrodev.com',
    contactPhone: '+1 (555) 123-4567',
    contactAvatar: '/avatars/sarah-m.jpg',
    value: 2500000,
    expectedCloseDate: '2024-03-15',
    stage: 'negotiation',
    probability: 75,
    source: 'Website Inquiry',
    assignedTo: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    createdDate: '2024-01-10',
    lastActivity: '2024-01-30',
    nextAction: 'Review final contract terms and pricing',
    priority: 'high',
    dealType: 'new-business',
    competitorInfo: 'Competing with BuildCorp and ConstructPro',
    tags: ['commercial', 'large-project', 'high-value'],
    documents: ['proposal_v2.pdf', 'floor_plans.pdf', 'contract_draft.pdf'],
    activities: 25,
    daysInStage: 18,
    forecastCategory: 'commit',
    productInterest: ['Commercial Construction', 'Project Management', 'LEED Certification'],
    budgetRange: {
      min: 2000000,
      max: 3000000
    },
    decisionMakers: ['Sarah Martinez - CEO', 'John Davis - CFO', 'Emily Chen - Project Director'],
    timeline: 'Q1 2024',
    customFields: {
      projectSize: '50,000 sq ft',
      constructionType: 'Mixed-use commercial'
    }
  },
  {
    id: 'DEAL002',
    title: 'Residential Complex Phase 2',
    description: 'Second phase of luxury residential complex with 120 units',
    company: 'Green Valley Homes',
    contactPerson: 'David Wilson',
    contactEmail: 'david.w@greenvalley.com',
    contactPhone: '+1 (555) 987-6543',
    contactAvatar: '/avatars/david-w.jpg',
    value: 1800000,
    expectedCloseDate: '2024-02-28',
    stage: 'proposal',
    probability: 60,
    source: 'Referral',
    assignedTo: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdDate: '2024-01-05',
    lastActivity: '2024-01-29',
    nextAction: 'Present updated proposal with sustainability features',
    priority: 'high',
    dealType: 'expansion',
    tags: ['residential', 'luxury', 'repeat-client'],
    documents: ['proposal_residential.pdf', 'sustainability_plan.pdf'],
    activities: 18,
    daysInStage: 12,
    forecastCategory: 'best-case',
    productInterest: ['Residential Construction', 'Sustainable Building', 'Interior Design'],
    budgetRange: {
      min: 1500000,
      max: 2000000
    },
    decisionMakers: ['David Wilson - Development Director', 'Maria Garcia - Project Manager'],
    timeline: 'Q2 2024'
  },
  {
    id: 'DEAL003',
    title: 'Office Building Renovation',
    description: 'Complete renovation of 25-story office building with modern amenities',
    company: 'TechStart Inc',
    contactPerson: 'Emily Rodriguez',
    contactEmail: 'emily.r@techstart.com',
    contactPhone: '+1 (555) 456-7890',
    contactAvatar: '/avatars/emily-r.jpg',
    value: 950000,
    expectedCloseDate: '2024-04-30',
    stage: 'qualification',
    probability: 40,
    source: 'Cold Outreach',
    assignedTo: {
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      email: 'james.w@buildiyo.com'
    },
    createdDate: '2024-01-20',
    lastActivity: '2024-01-28',
    nextAction: 'Schedule site inspection and needs assessment',
    priority: 'medium',
    dealType: 'new-business',
    tags: ['office', 'renovation', 'tech-company'],
    documents: ['initial_proposal.pdf'],
    activities: 8,
    daysInStage: 10,
    forecastCategory: 'pipeline',
    productInterest: ['Office Renovation', 'Smart Building Systems', 'Energy Efficiency'],
    budgetRange: {
      min: 800000,
      max: 1200000
    },
    decisionMakers: ['Emily Rodriguez - COO', 'Michael Brown - Facilities Manager'],
    timeline: 'Q3 2024'
  },
  {
    id: 'DEAL004',
    title: 'Retail Store Chain Expansion',
    description: 'Construction of 5 new retail locations across the metropolitan area',
    company: 'Fashion Forward Retail',
    contactPerson: 'Jennifer Kim',
    contactEmail: 'jennifer.k@fashionforward.com',
    contactPhone: '+1 (555) 234-5678',
    value: 750000,
    expectedCloseDate: '2024-05-15',
    stage: 'closed-won',
    probability: 100,
    source: 'Trade Show',
    assignedTo: {
      name: 'Alex Thompson',
      avatar: '/avatars/alex.jpg',
      email: 'alex.t@buildiyo.com'
    },
    createdDate: '2023-12-15',
    lastActivity: '2024-01-25',
    actualCloseDate: '2024-01-25',
    nextAction: 'Begin construction planning and permits',
    priority: 'medium',
    dealType: 'new-business',
    tags: ['retail', 'multi-location', 'expansion'],
    documents: ['signed_contract.pdf', 'store_designs.pdf', 'permit_applications.pdf'],
    activities: 32,
    daysInStage: 0,
    forecastCategory: 'closed',
    productInterest: ['Retail Construction', 'Store Design', 'Project Coordination'],
    budgetRange: {
      min: 700000,
      max: 800000
    },
    decisionMakers: ['Jennifer Kim - VP Operations', 'Robert Chen - Real Estate Director'],
    timeline: 'Q2 2024'
  }
];

function getStageColor(stage: Deal['stage']) {
  switch (stage) {
    case 'prospecting': return 'bg-gray-100 text-gray-800';
    case 'qualification': return 'bg-blue-100 text-blue-800';
    case 'proposal': return 'bg-yellow-100 text-yellow-800';
    case 'negotiation': return 'bg-orange-100 text-orange-800';
    case 'closed-won': return 'bg-green-100 text-green-800';
    case 'closed-lost': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: Deal['priority']) {
  switch (priority) {
    case 'critical': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getDealTypeColor(dealType: Deal['dealType']) {
  switch (dealType) {
    case 'new-business': return 'bg-blue-100 text-blue-800';
    case 'expansion': return 'bg-green-100 text-green-800';
    case 'renewal': return 'bg-purple-100 text-purple-800';
    case 'cross-sell': return 'bg-yellow-100 text-yellow-800';
    case 'upsell': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'currency' | 'days') {
  switch (format) {
    case 'percentage':
      return `${value}%`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'days':
      return `${value} days`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export default function DealTracking() {
  const [deals] = useState(mockDeals);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deal.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
      const matchesAssignee = assigneeFilter === 'all' || deal.assignedTo.name === assigneeFilter;
      const matchesPriority = priorityFilter === 'all' || deal.priority === priorityFilter;
      
      return matchesSearch && matchesStage && matchesAssignee && matchesPriority;
    });
  }, [deals, searchQuery, stageFilter, assigneeFilter, priorityFilter]);

  const summaryStats = useMemo(() => {
    const activeDeals = deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage));
    const wonDeals = deals.filter(d => d.stage === 'closed-won');
    const totalPipelineValue = activeDeals.reduce((sum, d) => sum + d.value, 0);
    const weightedPipelineValue = activeDeals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0);
    const avgDealSize = totalPipelineValue / activeDeals.length || 0;
    const winRate = wonDeals.length / deals.filter(d => ['closed-won', 'closed-lost'].includes(d.stage)).length * 100 || 0;

    return {
      totalDeals: deals.length,
      activeDeals: activeDeals.length,
      wonDeals: wonDeals.length,
      totalPipelineValue,
      weightedPipelineValue,
      avgDealSize,
      winRate
    };
  }, [deals]);

  const stageDistribution = useMemo(() => {
    const stages = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
    return stages.map(stage => ({
      stage,
      count: deals.filter(d => d.stage === stage).length,
      value: deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.value, 0)
    }));
  }, [deals]);

  const uniqueAssignees = useMemo(() => {
    return Array.from(new Set(deals.map(d => d.assignedTo.name)));
  }, [deals]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Deal Tracking</h1>
          <p className="text-gray-600">Monitor and manage your sales pipeline</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dealMetrics.map((metric) => {
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
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
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

      {/* Analytics Tabs */}
      <Tabs defaultValue="pipeline" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="deals">Deal List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        {/* Pipeline View Tab */}
        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline by Stage */}
            <Card>
              <CardHeader>
                <CardTitle>Pipeline by Stage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stageDistribution.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("text-xs", getStageColor(stage.stage as Deal['stage']))}>
                          {stage.stage.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span>{stage.count} deals</span>
                      </div>
                      <span className="font-semibold">${(stage.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(stage.value / summaryStats.totalPipelineValue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Deals by Value */}
            <Card>
              <CardHeader>
                <CardTitle>Top Deals by Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deals
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 5)
                    .map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={deal.contactAvatar} />
                            <AvatarFallback className="text-xs">
                              {deal.contactPerson.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{deal.title}</p>
                            <p className="text-xs text-gray-600">{deal.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">${(deal.value / 1000).toFixed(0)}K</p>
                          <Badge className={cn("text-xs", getStageColor(deal.stage))}>
                            {deal.stage.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Deals by Assignee */}
            <Card>
              <CardHeader>
                <CardTitle>Deals by Assignee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uniqueAssignees.map((assignee) => {
                    const assigneeDeals = deals.filter(d => d.assignedTo.name === assignee);
                    const totalValue = assigneeDeals.reduce((sum, d) => sum + d.value, 0);
                    const avgProbability = assigneeDeals.reduce((sum, d) => sum + d.probability, 0) / assigneeDeals.length;
                    
                    return (
                      <div key={assignee} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={assigneeDeals[0]?.assignedTo.avatar} />
                            <AvatarFallback className="text-xs">
                              {assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{assignee}</p>
                            <p className="text-xs text-gray-600">{assigneeDeals.length} active deals</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">${(totalValue / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-gray-600">{Math.round(avgProbability)}% avg probability</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Closing This Month */}
            <Card>
              <CardHeader>
                <CardTitle>Closing This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deals
                    .filter(deal => {
                      const closeDate = new Date(deal.expectedCloseDate);
                      const now = new Date();
                      return closeDate.getMonth() === now.getMonth() && 
                             closeDate.getFullYear() === now.getFullYear() &&
                             !['closed-won', 'closed-lost'].includes(deal.stage);
                    })
                    .map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{deal.title}</p>
                          <p className="text-xs text-gray-600">{deal.company}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={cn("text-xs", getPriorityColor(deal.priority))}>
                              {deal.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {deal.probability}% probability
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">${(deal.value / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-600">
                            {new Date(deal.expectedCloseDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Deal List Tab */}
        <TabsContent value="deals" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search deals..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="prospecting">Prospecting</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed-won">Closed Won</SelectItem>
                <SelectItem value="closed-lost">Closed Lost</SelectItem>
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

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Deals List */}
          <div className="space-y-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{deal.title}</h3>
                            <Badge className={cn("text-xs", getStageColor(deal.stage))}>
                              {deal.stage.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getPriorityColor(deal.priority))}>
                              {deal.priority.toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getDealTypeColor(deal.dealType))}>
                              {deal.dealType.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{deal.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{deal.company}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{deal.contactPerson}</span>
                            </div>
                            <span>•</span>
                            <span>Created: {new Date(deal.createdDate).toLocaleDateString()}</span>
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Deal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Schedule Call
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Proposal
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Deal
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Deal Value</p>
                          <p className="text-xl font-bold text-green-600">
                            ${deal.value.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Probability</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={deal.probability} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{deal.probability}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Expected Close</p>
                          <p className="text-lg font-semibold">
                            {new Date(deal.expectedCloseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Days in Stage</p>
                          <p className="text-lg font-semibold">{deal.daysInStage} days</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={deal.assignedTo.avatar} />
                              <AvatarFallback className="text-xs">
                                {deal.assignedTo.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{deal.assignedTo.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <FileText className="h-4 w-4" />
                            <span>{deal.activities} activities</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {deal.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-sm text-gray-600">
                          <strong>Next Action:</strong> {deal.nextAction}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredDeals.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Handshake className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No deals found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || stageFilter !== 'all' || assigneeFilter !== 'all' || priorityFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first deal to get started"
                    }
                  </p>
                  {(!searchQuery && stageFilter === 'all' && assigneeFilter === 'all' && priorityFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Deal
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Velocity Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Deal velocity trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Win/Loss Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Win/loss analysis chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecasting Tab */}
        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Forecast</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Sales forecast chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Projections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Quarterly projections would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
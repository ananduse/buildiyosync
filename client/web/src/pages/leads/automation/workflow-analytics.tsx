'use client';

import { useState, useMemo } from 'react';
import {
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Target,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Settings,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  PieChart,
  LineChart,
  BarChart,
  Workflow,
  Timer,
  Award,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface WorkflowAnalyticsMetric {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'currency' | 'seconds' | 'days' | 'hours';
  description: string;
}

interface WorkflowPerformanceData {
  id: string;
  name: string;
  type: 'workflow' | 'sequence' | 'template' | 'welcome-series';
  category: string;
  status: 'active' | 'paused' | 'draft';
  metrics: {
    executions: number;
    success_rate: number;
    conversion_rate: number;
    engagement_rate: number;
    avg_execution_time: number;
    leads_processed: number;
    revenue_generated: number;
    cost_per_lead: number;
    roi: number;
  };
  trends: {
    executions_trend: number;
    success_rate_trend: number;
    conversion_trend: number;
    engagement_trend: number;
  };
  last_run: string;
  created_by: string;
}

interface TimeSeriesData {
  date: string;
  executions: number;
  success_rate: number;
  conversion_rate: number;
  engagement_rate: number;
  leads_processed: number;
}

interface ChannelPerformance {
  channel: 'email' | 'sms' | 'call' | 'task' | 'video' | 'linkedin';
  executions: number;
  success_rate: number;
  engagement_rate: number;
  conversion_rate: number;
  avg_response_time: number;
  cost_per_action: number;
}

const analyticsMetrics: WorkflowAnalyticsMetric[] = [
  {
    id: 'total-workflows',
    title: 'Active Workflows',
    value: 73,
    previousValue: 68,
    change: 7.4,
    trend: 'up',
    icon: Workflow,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number',
    description: 'Total number of active automation workflows'
  },
  {
    id: 'total-executions',
    title: 'Total Executions',
    value: 12847,
    previousValue: 11234,
    change: 14.4,
    trend: 'up',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'number',
    description: 'Total workflow executions this month'
  },
  {
    id: 'success-rate',
    title: 'Avg Success Rate',
    value: 87.3,
    previousValue: 84.8,
    change: 2.9,
    trend: 'up',
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'percentage',
    description: 'Average workflow success rate'
  },
  {
    id: 'conversion-rate',
    title: 'Avg Conversion Rate',
    value: 24.7,
    previousValue: 22.1,
    change: 11.8,
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage',
    description: 'Average conversion rate across all workflows'
  },
  {
    id: 'engagement-rate',
    title: 'Avg Engagement Rate',
    value: 78.9,
    previousValue: 81.2,
    change: -2.8,
    trend: 'down',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    format: 'percentage',
    description: 'Average engagement rate across all channels'
  },
  {
    id: 'avg-execution-time',
    title: 'Avg Execution Time',
    value: 4.2,
    previousValue: 5.1,
    change: -17.6,
    trend: 'down',
    icon: Timer,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    format: 'seconds',
    description: 'Average time to complete workflow execution'
  },
  {
    id: 'leads-processed',
    title: 'Leads Processed',
    value: 5423,
    previousValue: 4891,
    change: 10.9,
    trend: 'up',
    icon: Users,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    format: 'number',
    description: 'Total leads processed through workflows'
  },
  {
    id: 'revenue-generated',
    title: 'Revenue Generated',
    value: 2847000,
    previousValue: 2341000,
    change: 21.6,
    trend: 'up',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'currency',
    description: 'Revenue attributed to workflow conversions'
  },
  {
    id: 'cost-efficiency',
    title: 'Cost Per Lead',
    value: 23.40,
    previousValue: 28.90,
    change: -19.0,
    trend: 'down',
    icon: TrendingDown,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'currency',
    description: 'Average cost per lead through workflows'
  },
  {
    id: 'roi',
    title: 'Workflow ROI',
    value: 485,
    previousValue: 423,
    change: 14.7,
    trend: 'up',
    icon: TrendingUp,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'percentage',
    description: 'Return on investment from workflows'
  }
];

const mockWorkflowPerformance: WorkflowPerformanceData[] = [
  {
    id: 'WF001',
    name: 'Construction Lead Welcome Series',
    type: 'welcome-series',
    category: 'onboarding',
    status: 'active',
    metrics: {
      executions: 342,
      success_rate: 89.4,
      conversion_rate: 34.8,
      engagement_rate: 87.2,
      avg_execution_time: 2.3,
      leads_processed: 342,
      revenue_generated: 1240000,
      cost_per_lead: 18.50,
      roi: 520
    },
    trends: {
      executions_trend: 12.3,
      success_rate_trend: 3.2,
      conversion_trend: 8.7,
      engagement_trend: -1.4
    },
    last_run: '2024-02-02T14:30:00Z',
    created_by: 'Sarah Johnson'
  },
  {
    id: 'WF002',
    name: 'Post-Proposal Follow-up Sequence',
    type: 'sequence',
    category: 'follow-up',
    status: 'active',
    metrics: {
      executions: 156,
      success_rate: 91.0,
      conversion_rate: 41.7,
      engagement_rate: 84.6,
      avg_execution_time: 1.8,
      leads_processed: 156,
      revenue_generated: 890000,
      cost_per_lead: 24.80,
      roi: 445
    },
    trends: {
      executions_trend: 18.7,
      success_rate_trend: 5.1,
      conversion_trend: 12.4,
      engagement_trend: 2.8
    },
    last_run: '2024-02-01T11:45:00Z',
    created_by: 'Lisa Wang'
  },
  {
    id: 'WF003',
    name: 'Lead Scoring Automation',
    type: 'workflow',
    category: 'scoring',
    status: 'active',
    metrics: {
      executions: 1247,
      success_rate: 94.2,
      conversion_rate: 28.4,
      engagement_rate: 91.3,
      avg_execution_time: 0.8,
      leads_processed: 1247,
      revenue_generated: 567000,
      cost_per_lead: 8.20,
      roi: 380
    },
    trends: {
      executions_trend: 23.4,
      success_rate_trend: 1.8,
      conversion_trend: -2.1,
      engagement_trend: 4.2
    },
    last_run: '2024-02-02T16:15:00Z',
    created_by: 'Mike Chen'
  },
  {
    id: 'WF004',
    name: 'Dormant Lead Reactivation',
    type: 'sequence',
    category: 'reactivation',
    status: 'active',
    metrics: {
      executions: 89,
      success_rate: 67.4,
      conversion_rate: 11.2,
      engagement_rate: 43.8,
      avg_execution_time: 3.2,
      leads_processed: 89,
      revenue_generated: 78000,
      cost_per_lead: 45.60,
      roi: 165
    },
    trends: {
      executions_trend: -5.2,
      success_rate_trend: -8.3,
      conversion_trend: -12.8,
      engagement_trend: -15.7
    },
    last_run: '2024-01-28T14:20:00Z',
    created_by: 'David Wilson'
  }
];

const mockChannelPerformance: ChannelPerformance[] = [
  {
    channel: 'email',
    executions: 4823,
    success_rate: 91.2,
    engagement_rate: 76.8,
    conversion_rate: 28.4,
    avg_response_time: 14.2,
    cost_per_action: 2.40
  },
  {
    channel: 'sms',
    executions: 1247,
    success_rate: 87.6,
    engagement_rate: 84.3,
    conversion_rate: 19.7,
    avg_response_time: 3.8,
    cost_per_action: 1.20
  },
  {
    channel: 'call',
    executions: 789,
    success_rate: 78.9,
    engagement_rate: 92.4,
    conversion_rate: 45.7,
    avg_response_time: 0.5,
    cost_per_action: 12.50
  },
  {
    channel: 'task',
    executions: 2341,
    success_rate: 94.7,
    engagement_rate: 88.9,
    conversion_rate: 67.8,
    avg_response_time: 24.6,
    cost_per_action: 0.80
  },
  {
    channel: 'video',
    executions: 456,
    success_rate: 82.5,
    engagement_rate: 89.2,
    conversion_rate: 38.9,
    avg_response_time: 8.7,
    cost_per_action: 5.20
  },
  {
    channel: 'linkedin',
    executions: 234,
    success_rate: 71.8,
    engagement_rate: 65.4,
    conversion_rate: 22.6,
    avg_response_time: 32.4,
    cost_per_action: 3.80
  }
];

function formatValue(value: number, format: WorkflowAnalyticsMetric['format']) {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'seconds':
      return `${value.toFixed(1)}s`;
    case 'days':
      return `${value.toFixed(0)} days`;
    case 'hours':
      return `${value.toFixed(1)}h`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

function getChannelIcon(channel: ChannelPerformance['channel']) {
  switch (channel) {
    case 'email': return Mail;
    case 'sms': return MessageSquare;
    case 'call': return Phone;
    case 'task': return CheckCircle;
    case 'video': return Activity;
    case 'linkedin': return Users;
    default: return Activity;
  }
}

function getTypeColor(type: WorkflowPerformanceData['type']) {
  switch (type) {
    case 'workflow': return 'bg-blue-100 text-blue-800';
    case 'sequence': return 'bg-purple-100 text-purple-800';
    case 'template': return 'bg-green-100 text-green-800';
    case 'welcome-series': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPerformanceColor(value: number, threshold: { good: number; average: number }) {
  if (value >= threshold.good) return 'text-green-600';
  if (value >= threshold.average) return 'text-yellow-600';
  return 'text-red-600';
}

export default function WorkflowAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [workflowType, setWorkflowType] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('conversion-rate');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkflows = useMemo(() => {
    return mockWorkflowPerformance.filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = workflowType === 'all' || workflow.type === workflowType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, workflowType]);

  const topPerformers = useMemo(() => {
    return [...mockWorkflowPerformance]
      .sort((a, b) => b.metrics.roi - a.metrics.roi)
      .slice(0, 5);
  }, []);

  const underPerformers = useMemo(() => {
    return [...mockWorkflowPerformance]
      .filter(w => w.metrics.conversion_rate < 20 || w.metrics.success_rate < 80)
      .sort((a, b) => a.metrics.conversion_rate - b.metrics.conversion_rate)
      .slice(0, 3);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Workflow Analytics</h1>
          <p className="text-gray-600">Comprehensive analytics and performance insights for automation workflows</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {analyticsMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          const changeColor = metric.change > 0 ? 'text-emerald-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-600';
          const changeIcon = metric.change > 0 ? ArrowUp : metric.change < 0 ? ArrowDown : Minus;
          const ChangeIcon = changeIcon;
          
          return (
            <Card 
              key={metric.id} 
              className={cn(
                "hover:shadow-md transition-shadow cursor-pointer",
                selectedMetric === metric.id ? "ring-2 ring-blue-500" : ""
              )}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                  <div className={cn("flex items-center text-xs font-semibold", changeColor)}>
                    <ChangeIcon className="h-3 w-3 mr-1" />
                    {Math.abs(metric.change).toFixed(1)}%
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-500">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatValue(metric.value, metric.format)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="channels">Channel Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance trends chart would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">Showing conversion rates, success rates, and execution volumes over time</p>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Workflow Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { type: 'Workflows', count: 24, color: 'bg-blue-500' },
                    { type: 'Sequences', count: 18, color: 'bg-purple-500' },
                    { type: 'Templates', count: 15, color: 'bg-green-500' },
                    { type: 'Welcome Series', count: 12, color: 'bg-pink-500' }
                  ].map(item => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={cn("w-3 h-3 rounded-full", item.color)} />
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                      <span className="text-sm text-gray-600">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {topPerformers.map((workflow, index) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{workflow.name}</p>
                          <Badge className={cn("text-xs", getTypeColor(workflow.type))}>
                            {workflow.type.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{workflow.metrics.roi}% ROI</p>
                        <p className="text-xs text-gray-600">{workflow.metrics.conversion_rate.toFixed(1)}% conv</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Needs Attention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Needs Attention</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {underPerformers.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="text-sm font-medium">{workflow.name}</p>
                        <Badge className={cn("text-xs", getTypeColor(workflow.type))}>
                          {workflow.type.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-red-600">{workflow.metrics.conversion_rate.toFixed(1)}% conv</p>
                        <p className="text-xs text-gray-600">{workflow.metrics.success_rate.toFixed(1)}% success</p>
                      </div>
                    </div>
                  ))}
                </div>
                {underPerformers.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">All workflows performing well!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search workflows..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={workflowType} onValueChange={setWorkflowType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="workflow">Workflows</SelectItem>
                <SelectItem value="sequence">Sequences</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="welcome-series">Welcome Series</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure Metrics
            </Button>
          </div>

          {/* Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Workflow</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-right p-3">Executions</th>
                      <th className="text-right p-3">Success Rate</th>
                      <th className="text-right p-3">Conversion</th>
                      <th className="text-right p-3">Engagement</th>
                      <th className="text-right p-3">ROI</th>
                      <th className="text-right p-3">Last Run</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkflows.map((workflow) => (
                      <tr key={workflow.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{workflow.name}</p>
                            <p className="text-xs text-gray-600">by {workflow.created_by}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={cn("text-xs", getTypeColor(workflow.type))}>
                            {workflow.type.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="text-right p-3">
                          <div>
                            <p className="font-medium">{workflow.metrics.executions.toLocaleString()}</p>
                            <div className={cn(
                              "flex items-center justify-end text-xs",
                              workflow.trends.executions_trend > 0 ? "text-green-600" : 
                              workflow.trends.executions_trend < 0 ? "text-red-600" : "text-gray-600"
                            )}>
                              {workflow.trends.executions_trend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> :
                               workflow.trends.executions_trend < 0 ? <ArrowDown className="h-3 w-3 mr-1" /> :
                               <Minus className="h-3 w-3 mr-1" />}
                              {Math.abs(workflow.trends.executions_trend).toFixed(1)}%
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-3">
                          <div>
                            <p className={cn("font-medium", getPerformanceColor(workflow.metrics.success_rate, { good: 85, average: 70 }))}>
                              {workflow.metrics.success_rate.toFixed(1)}%
                            </p>
                            <div className={cn(
                              "flex items-center justify-end text-xs",
                              workflow.trends.success_rate_trend > 0 ? "text-green-600" : 
                              workflow.trends.success_rate_trend < 0 ? "text-red-600" : "text-gray-600"
                            )}>
                              {workflow.trends.success_rate_trend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> :
                               workflow.trends.success_rate_trend < 0 ? <ArrowDown className="h-3 w-3 mr-1" /> :
                               <Minus className="h-3 w-3 mr-1" />}
                              {Math.abs(workflow.trends.success_rate_trend).toFixed(1)}%
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-3">
                          <div>
                            <p className={cn("font-medium", getPerformanceColor(workflow.metrics.conversion_rate, { good: 30, average: 20 }))}>
                              {workflow.metrics.conversion_rate.toFixed(1)}%
                            </p>
                            <div className={cn(
                              "flex items-center justify-end text-xs",
                              workflow.trends.conversion_trend > 0 ? "text-green-600" : 
                              workflow.trends.conversion_trend < 0 ? "text-red-600" : "text-gray-600"
                            )}>
                              {workflow.trends.conversion_trend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> :
                               workflow.trends.conversion_trend < 0 ? <ArrowDown className="h-3 w-3 mr-1" /> :
                               <Minus className="h-3 w-3 mr-1" />}
                              {Math.abs(workflow.trends.conversion_trend).toFixed(1)}%
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-3">
                          <div>
                            <p className={cn("font-medium", getPerformanceColor(workflow.metrics.engagement_rate, { good: 80, average: 60 }))}>
                              {workflow.metrics.engagement_rate.toFixed(1)}%
                            </p>
                            <div className={cn(
                              "flex items-center justify-end text-xs",
                              workflow.trends.engagement_trend > 0 ? "text-green-600" : 
                              workflow.trends.engagement_trend < 0 ? "text-red-600" : "text-gray-600"
                            )}>
                              {workflow.trends.engagement_trend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> :
                               workflow.trends.engagement_trend < 0 ? <ArrowDown className="h-3 w-3 mr-1" /> :
                               <Minus className="h-3 w-3 mr-1" />}
                              {Math.abs(workflow.trends.engagement_trend).toFixed(1)}%
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-3">
                          <p className={cn("font-bold", getPerformanceColor(workflow.metrics.roi, { good: 300, average: 200 }))}>
                            {workflow.metrics.roi}%
                          </p>
                        </td>
                        <td className="text-right p-3">
                          <p className="text-xs text-gray-600">
                            {new Date(workflow.last_run).toLocaleDateString()}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channel Analysis Tab */}
        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockChannelPerformance.map((channel) => {
                  const Icon = getChannelIcon(channel.channel);
                  return (
                    <Card key={channel.channel} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-gray-600" />
                            <h3 className="font-semibold capitalize">{channel.channel}</h3>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {channel.executions.toLocaleString()} executions
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Success Rate</span>
                              <span className="font-medium">{channel.success_rate.toFixed(1)}%</span>
                            </div>
                            <Progress value={channel.success_rate} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Engagement Rate</span>
                              <span className="font-medium">{channel.engagement_rate.toFixed(1)}%</span>
                            </div>
                            <Progress value={channel.engagement_rate} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">Conversion Rate</span>
                              <span className="font-medium">{channel.conversion_rate.toFixed(1)}%</span>
                            </div>
                            <Progress value={channel.conversion_rate} className="h-2" />
                          </div>
                          
                          <div className="pt-2 border-t">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Avg Response Time</span>
                              <span className="font-medium">{channel.avg_response_time.toFixed(1)}h</span>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-gray-600">Cost per Action</span>
                              <span className="font-medium">${channel.cost_per_action.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Key Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      icon: ThumbsUp,
                      type: 'success',
                      title: 'Welcome Series Performing Exceptionally',
                      description: 'Your welcome series have 34.8% higher conversion rates than industry average',
                      color: 'text-green-600'
                    },
                    {
                      icon: TrendingUp,
                      type: 'improvement',
                      title: 'Email Engagement Trending Up',
                      description: 'Email workflows show 12.3% improvement in engagement over last month',
                      color: 'text-blue-600'
                    },
                    {
                      icon: AlertTriangle,
                      type: 'attention',
                      title: 'Reactivation Workflows Need Attention',
                      description: 'Dormant lead reactivation workflows have declining success rates',
                      color: 'text-orange-600'
                    },
                    {
                      icon: Target,
                      type: 'opportunity',
                      title: 'Optimization Opportunity',
                      description: 'Tasks have the highest conversion rate (67.8%) - consider increasing task-based workflows',
                      color: 'text-purple-600'
                    }
                  ].map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <insight.icon className={cn("h-5 w-5 mt-0.5", insight.color)} />
                      <div>
                        <p className="text-sm font-semibold">{insight.title}</p>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      priority: 'High',
                      title: 'Optimize Reactivation Workflows',
                      description: 'Review and update dormant lead reactivation sequences with fresh content and improved timing',
                      action: 'Review Workflows'
                    },
                    {
                      priority: 'Medium',
                      title: 'Expand Task-Based Automation',
                      description: 'Tasks show highest conversion rates. Create more automated task creation workflows',
                      action: 'Create Workflows'
                    },
                    {
                      priority: 'Low',
                      title: 'A/B Test Email Templates',
                      description: 'Test different email templates to improve the 76.8% engagement rate',
                      action: 'Setup Tests'
                    }
                  ].map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          className={cn("text-xs",
                            rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          )}
                        >
                          {rec.priority} Priority
                        </Badge>
                        <Button variant="outline" size="sm">
                          {rec.action}
                        </Button>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
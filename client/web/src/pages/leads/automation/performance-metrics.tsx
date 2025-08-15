import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Clock,
  Zap,
  Users,
  Mail,
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  DollarSign,
  Percent,
  Timer,
  Database,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Gauge,
  Workflow,
  SendHorizontal,
  RotateCcw,
  PlayCircle,
  Smartphone,
  Globe
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: 'percentage' | 'number' | 'seconds' | 'currency' | 'ratio';
  category: 'efficiency' | 'engagement' | 'conversion' | 'quality' | 'speed';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

interface WorkflowMetrics {
  workflowId: string;
  workflowName: string;
  type: 'email' | 'sms' | 'mixed' | 'nurturing' | 'follow-up';
  executions: number;
  successRate: number;
  conversionRate: number;
  avgExecutionTime: number;
  engagementScore: number;
  revenueAttribution: number;
  costPerExecution: number;
  roi: number;
  lastExecuted: string;
  trend: {
    executions: number;
    successRate: number;
    conversionRate: number;
    performance: 'improving' | 'declining' | 'stable';
  };
}

interface ChannelMetrics {
  channel: 'email' | 'sms' | 'call' | 'task' | 'video' | 'linkedin' | 'webhook';
  name: string;
  icon: React.ComponentType<any>;
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  responded: number;
  converted: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  responseRate: number;
  conversionRate: number;
  avgResponseTime: number;
  costPerAction: number;
  revenue: number;
  trend: {
    delivered: number;
    opened: number;
    converted: number;
  };
}

const PerformanceMetrics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'overall-success-rate',
      name: 'Overall Success Rate',
      value: 87.3,
      target: 85.0,
      previousValue: 84.8,
      change: 2.9,
      trend: 'up',
      unit: 'percentage',
      category: 'efficiency',
      icon: CheckCircle,
      color: 'text-green-600',
      description: 'Percentage of successfully executed automation actions'
    },
    {
      id: 'avg-execution-time',
      name: 'Avg Execution Time',
      value: 2.34,
      target: 3.0,
      previousValue: 2.67,
      change: -12.4,
      trend: 'up',
      unit: 'seconds',
      category: 'speed',
      icon: Timer,
      color: 'text-blue-600',
      description: 'Average time to complete automation actions'
    },
    {
      id: 'conversion-rate',
      name: 'Conversion Rate',
      value: 24.7,
      target: 20.0,
      previousValue: 22.1,
      change: 11.8,
      trend: 'up',
      unit: 'percentage',
      category: 'conversion',
      icon: Target,
      color: 'text-purple-600',
      description: 'Rate of leads converted through automation'
    },
    {
      id: 'engagement-score',
      name: 'Engagement Score',
      value: 78.9,
      target: 75.0,
      previousValue: 81.2,
      change: -2.8,
      trend: 'down',
      unit: 'number',
      category: 'engagement',
      icon: Users,
      color: 'text-orange-600',
      description: 'Overall engagement score across all channels'
    },
    {
      id: 'email-delivery-rate',
      name: 'Email Delivery Rate',
      value: 96.8,
      target: 95.0,
      previousValue: 95.4,
      change: 1.5,
      trend: 'up',
      unit: 'percentage',
      category: 'quality',
      icon: Mail,
      color: 'text-indigo-600',
      description: 'Percentage of emails successfully delivered'
    },
    {
      id: 'sms-delivery-rate',
      name: 'SMS Delivery Rate',
      value: 92.3,
      target: 90.0,
      previousValue: 93.1,
      change: -0.9,
      trend: 'down',
      unit: 'percentage',
      category: 'quality',
      icon: MessageSquare,
      color: 'text-green-600',
      description: 'Percentage of SMS messages successfully delivered'
    },
    {
      id: 'revenue-per-workflow',
      name: 'Revenue per Workflow',
      value: 3847,
      target: 3000,
      previousValue: 3234,
      change: 19.0,
      trend: 'up',
      unit: 'currency',
      category: 'conversion',
      icon: DollarSign,
      color: 'text-emerald-600',
      description: 'Average revenue generated per workflow execution'
    },
    {
      id: 'cost-efficiency',
      name: 'Cost Efficiency',
      value: 23.40,
      target: 30.0,
      previousValue: 28.90,
      change: -19.0,
      trend: 'up',
      unit: 'currency',
      category: 'efficiency',
      icon: TrendingDown,
      color: 'text-cyan-600',
      description: 'Cost per successful automation action'
    },
    {
      id: 'workflow-reliability',
      name: 'Workflow Reliability',
      value: 94.2,
      target: 90.0,
      previousValue: 91.8,
      change: 2.6,
      trend: 'up',
      unit: 'percentage',
      category: 'quality',
      icon: Workflow,
      color: 'text-violet-600',
      description: 'Percentage of workflows completing without errors'
    },
    {
      id: 'response-time',
      name: 'Response Time',
      value: 14.2,
      target: 20.0,
      previousValue: 16.8,
      change: -15.5,
      trend: 'up',
      unit: 'seconds',
      category: 'speed',
      icon: Zap,
      color: 'text-yellow-600',
      description: 'Average time to receive responses to automated actions'
    }
  ];

  // Mock data for workflow metrics
  const workflowMetrics: WorkflowMetrics[] = [
    {
      workflowId: 'WF001',
      workflowName: 'Construction Lead Welcome Series',
      type: 'email',
      executions: 1247,
      successRate: 89.4,
      conversionRate: 34.8,
      avgExecutionTime: 2.3,
      engagementScore: 87.2,
      revenueAttribution: 1240000,
      costPerExecution: 18.50,
      roi: 520,
      lastExecuted: '2024-01-15T14:30:00Z',
      trend: {
        executions: 12.3,
        successRate: 3.2,
        conversionRate: 8.7,
        performance: 'improving'
      }
    },
    {
      workflowId: 'WF002',
      workflowName: 'Post-Proposal Follow-up Sequence',
      type: 'mixed',
      executions: 892,
      successRate: 91.0,
      conversionRate: 41.7,
      avgExecutionTime: 1.8,
      engagementScore: 84.6,
      revenueAttribution: 890000,
      costPerExecution: 24.80,
      roi: 445,
      lastExecuted: '2024-01-15T11:45:00Z',
      trend: {
        executions: 18.7,
        successRate: 5.1,
        conversionRate: 12.4,
        performance: 'improving'
      }
    },
    {
      workflowId: 'WF003',
      workflowName: 'Lead Scoring Automation',
      type: 'nurturing',
      executions: 634,
      successRate: 94.2,
      conversionRate: 28.4,
      avgExecutionTime: 0.8,
      engagementScore: 91.3,
      revenueAttribution: 567000,
      costPerExecution: 8.20,
      roi: 380,
      lastExecuted: '2024-01-15T16:15:00Z',
      trend: {
        executions: 23.4,
        successRate: 1.8,
        conversionRate: -2.1,
        performance: 'stable'
      }
    },
    {
      workflowId: 'WF004',
      workflowName: 'Dormant Lead Reactivation',
      type: 'follow-up',
      executions: 298,
      successRate: 67.4,
      conversionRate: 11.2,
      avgExecutionTime: 3.2,
      engagementScore: 43.8,
      revenueAttribution: 78000,
      costPerExecution: 45.60,
      roi: 165,
      lastExecuted: '2024-01-14T14:20:00Z',
      trend: {
        executions: -5.2,
        successRate: -8.3,
        conversionRate: -12.8,
        performance: 'declining'
      }
    }
  ];

  // Mock data for channel metrics
  const channelMetrics: ChannelMetrics[] = [
    {
      channel: 'email',
      name: 'Email',
      icon: Mail,
      totalSent: 8934,
      delivered: 8648,
      opened: 3782,
      clicked: 1247,
      responded: 892,
      converted: 234,
      deliveryRate: 96.8,
      openRate: 43.7,
      clickRate: 33.0,
      responseRate: 23.6,
      conversionRate: 26.2,
      avgResponseTime: 14.2,
      costPerAction: 2.40,
      revenue: 567000,
      trend: {
        delivered: 2.3,
        opened: 8.4,
        converted: 15.7
      }
    },
    {
      channel: 'sms',
      name: 'SMS',
      icon: MessageSquare,
      totalSent: 3456,
      delivered: 3189,
      opened: 3021,
      clicked: 876,
      responded: 567,
      converted: 145,
      deliveryRate: 92.3,
      openRate: 94.8,
      clickRate: 29.0,
      responseRate: 18.8,
      conversionRate: 25.6,
      avgResponseTime: 3.8,
      costPerAction: 1.20,
      revenue: 189000,
      trend: {
        delivered: -0.9,
        opened: 1.2,
        converted: 12.4
      }
    },
    {
      channel: 'call',
      name: 'Phone Call',
      icon: Phone,
      totalSent: 1234,
      delivered: 987,
      opened: 987,
      clicked: 0,
      responded: 456,
      converted: 123,
      deliveryRate: 80.0,
      openRate: 100.0,
      clickRate: 0,
      responseRate: 46.2,
      conversionRate: 27.0,
      avgResponseTime: 0.5,
      costPerAction: 12.50,
      revenue: 234000,
      trend: {
        delivered: -3.2,
        opened: 0,
        converted: 8.9
      }
    },
    {
      channel: 'task',
      name: 'Task Assignment',
      icon: Calendar,
      totalSent: 2456,
      delivered: 2298,
      opened: 2298,
      clicked: 0,
      responded: 1876,
      converted: 234,
      deliveryRate: 93.6,
      openRate: 100.0,
      clickRate: 0,
      responseRate: 81.6,
      conversionRate: 12.5,
      avgResponseTime: 24.6,
      costPerAction: 0.80,
      revenue: 145000,
      trend: {
        delivered: 4.1,
        opened: 0,
        converted: 18.3
      }
    },
    {
      channel: 'video',
      name: 'Video Meeting',
      icon: Video,
      totalSent: 567,
      delivered: 432,
      opened: 398,
      clicked: 298,
      responded: 187,
      converted: 89,
      deliveryRate: 76.2,
      openRate: 92.1,
      clickRate: 74.9,
      responseRate: 47.0,
      conversionRate: 47.6,
      avgResponseTime: 8.7,
      costPerAction: 5.20,
      revenue: 178000,
      trend: {
        delivered: 6.8,
        opened: 12.3,
        converted: 22.1
      }
    },
    {
      channel: 'linkedin',
      name: 'LinkedIn',
      icon: Users,
      totalSent: 234,
      delivered: 198,
      opened: 156,
      clicked: 87,
      responded: 34,
      converted: 12,
      deliveryRate: 84.6,
      openRate: 78.8,
      clickRate: 55.8,
      responseRate: 21.8,
      conversionRate: 35.3,
      avgResponseTime: 32.4,
      costPerAction: 3.80,
      revenue: 45000,
      trend: {
        delivered: -2.1,
        opened: 5.7,
        converted: 9.1
      }
    }
  ];

  const formatValue = (value: number, unit: string): string => {
    switch (unit) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'seconds':
        return `${value.toFixed(1)}s`;
      case 'ratio':
        return `${value.toFixed(2)}:1`;
      default:
        return value.toLocaleString();
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getPerformanceColor = (current: number, target: number, isHigherBetter: boolean = true) => {
    const ratio = current / target;
    if (isHigherBetter) {
      if (ratio >= 1.1) return 'text-green-600';
      if (ratio >= 0.9) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (ratio <= 0.9) return 'text-green-600';
      if (ratio <= 1.1) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getWorkflowTypeColor = (type: string) => {
    const colors = {
      email: 'bg-blue-100 text-blue-800',
      sms: 'bg-green-100 text-green-800',
      mixed: 'bg-purple-100 text-purple-800',
      nurturing: 'bg-pink-100 text-pink-800',
      'follow-up': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredMetrics = performanceMetrics.filter(metric => {
    const matchesSearch = metric.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || metric.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Metrics</h1>
          <p className="text-muted-foreground">Comprehensive automation performance analytics and KPIs</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {performanceMetrics.slice(0, 5).map((metric) => {
              const Icon = metric.icon;
              const isOnTarget = metric.value >= metric.target;
              
              return (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      {getTrendIcon(metric.trend, metric.change)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{metric.name}</p>
                      <p className="text-2xl font-bold">{formatValue(metric.value, metric.unit)}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                        </span>
                        <span className={`${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                          Target: {formatValue(metric.target, metric.unit)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {performanceMetrics.slice(5).map((metric) => {
              const Icon = metric.icon;
              const isOnTarget = metric.value >= metric.target;
              
              return (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      {getTrendIcon(metric.trend, metric.change)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{metric.name}</p>
                      <p className="text-2xl font-bold">{formatValue(metric.value, metric.unit)}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                        </span>
                        <span className={`${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                          Target: {formatValue(metric.target, metric.unit)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Performance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">87.3%</div>
                  <p className="text-sm text-muted-foreground">Overall Success Rate</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">1,247</div>
                    <p className="text-xs text-muted-foreground">Total Executions</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">$2.8M</div>
                    <p className="text-xs text-muted-foreground">Revenue Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-blue-500" />
                  Speed Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2.3s</div>
                  <p className="text-sm text-muted-foreground">Avg Execution Time</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">14.2s</div>
                    <p className="text-xs text-muted-foreground">Response Time</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">94.2%</div>
                    <p className="text-xs text-muted-foreground">Reliability</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Financial Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$3,847</div>
                  <p className="text-sm text-muted-foreground">Revenue per Workflow</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">$23.40</div>
                    <p className="text-xs text-muted-foreground">Cost per Action</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">485%</div>
                    <p className="text-xs text-muted-foreground">Average ROI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance Analysis</CardTitle>
              <CardDescription>
                Detailed performance metrics for individual workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Workflow</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Executions</th>
                      <th className="text-left py-3 px-4 font-medium">Success Rate</th>
                      <th className="text-left py-3 px-4 font-medium">Conversion Rate</th>
                      <th className="text-left py-3 px-4 font-medium">Avg Time</th>
                      <th className="text-left py-3 px-4 font-medium">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium">ROI</th>
                      <th className="text-left py-3 px-4 font-medium">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflowMetrics.map((workflow) => (
                      <tr key={workflow.workflowId} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{workflow.workflowName}</p>
                            <p className="text-sm text-muted-foreground">{workflow.workflowId}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getWorkflowTypeColor(workflow.type)}>
                            {workflow.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{workflow.executions.toLocaleString()}</p>
                            <p className={`text-xs ${workflow.trend.executions >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {workflow.trend.executions >= 0 ? '+' : ''}{workflow.trend.executions.toFixed(1)}%
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{workflow.successRate.toFixed(1)}%</span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${workflow.successRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{workflow.conversionRate.toFixed(1)}%</span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${workflow.conversionRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{workflow.avgExecutionTime.toFixed(1)}s</td>
                        <td className="py-3 px-4 font-medium">${workflow.revenueAttribution.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-green-600">{workflow.roi}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={
                              workflow.trend.performance === 'improving' ? 'bg-green-100 text-green-800' :
                              workflow.trend.performance === 'declining' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {workflow.trend.performance}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channelMetrics.map((channel) => {
              const Icon = channel.icon;
              
              return (
                <Card key={channel.channel}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {channel.name}
                    </CardTitle>
                    <CardDescription>{channel.totalSent.toLocaleString()} total sent</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-2xl font-bold">{channel.delivered.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Delivered</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{channel.converted}</p>
                        <p className="text-sm text-muted-foreground">Conversions</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Delivery Rate</span>
                          <span className="font-medium">{channel.deliveryRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={channel.deliveryRate} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Open Rate</span>
                          <span className="font-medium">{channel.openRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={channel.openRate} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conversion Rate</span>
                          <span className="font-medium">{channel.conversionRate.toFixed(1)}%</span>
                        </div>
                        <Progress value={channel.conversionRate} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Avg Response Time</span>
                        <span className="font-medium">{channel.avgResponseTime}h</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cost per Action</span>
                        <span className="font-medium">${channel.costPerAction.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue</span>
                        <span className="font-medium text-green-600">${channel.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search metrics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="efficiency">Efficiency</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
                <SelectItem value="speed">Speed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Detailed Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
              <CardDescription>
                Complete list of all performance indicators with targets and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-left py-3 px-4 font-medium">Category</th>
                      <th className="text-left py-3 px-4 font-medium">Current Value</th>
                      <th className="text-left py-3 px-4 font-medium">Target</th>
                      <th className="text-left py-3 px-4 font-medium">Progress</th>
                      <th className="text-left py-3 px-4 font-medium">Change</th>
                      <th className="text-left py-3 px-4 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMetrics.map((metric) => {
                      const Icon = metric.icon;
                      const progressPercentage = Math.min((metric.value / metric.target) * 100, 100);
                      const isOnTarget = metric.value >= metric.target;
                      
                      return (
                        <tr key={metric.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Icon className={`h-5 w-5 ${metric.color}`} />
                              <div>
                                <p className="font-medium">{metric.name}</p>
                                <p className="text-sm text-muted-foreground">{metric.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="capitalize">
                              {metric.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-lg">
                              {formatValue(metric.value, metric.unit)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-muted-foreground">
                              {formatValue(metric.target, metric.unit)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Progress value={progressPercentage} className="w-20 h-2" />
                              <span className={`text-sm ${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                                {progressPercentage.toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {getTrendIcon(metric.trend, metric.change)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
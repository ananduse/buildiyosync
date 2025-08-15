import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  Users,
  Award,
  Calendar,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Building,
  MapPin,
  Phone,
  Mail,
  Calculator,
  FileText,
  Briefcase,
  CreditCard,
  Percent,
  Timer,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Eye,
  MoreVertical,
  ChevronRight,
  Zap,
  Globe,
  Handshake,
  TrendingUpIcon
} from 'lucide-react';

interface SalesMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  format: 'currency' | 'number' | 'percentage' | 'ratio';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

interface SalesOpportunity {
  id: string;
  leadName: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  lastActivity: string;
  source: string;
  assignedTo: {
    name: string;
    avatar?: string;
  };
  products: string[];
  notes: string;
  daysInStage: number;
}

interface SalesPerformance {
  userId: string;
  userName: string;
  avatar?: string;
  role: string;
  metrics: {
    revenue: number;
    deals: number;
    conversionRate: number;
    avgDealSize: number;
    activitiesLogged: number;
    callsMade: number;
    emailsSent: number;
    meetingsHeld: number;
  };
  targets: {
    revenue: number;
    deals: number;
    activities: number;
  };
  performance: {
    revenueProgress: number;
    dealsProgress: number;
    activitiesProgress: number;
    overallScore: number;
  };
  trends: {
    revenue: number;
    deals: number;
    activities: number;
  };
}

interface PipelineStage {
  id: string;
  name: string;
  deals: number;
  value: number;
  avgTimeInStage: number;
  conversionRate: number;
  color: string;
}

const SalesDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for sales metrics
  const salesMetrics: SalesMetric[] = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: 2847600,
      target: 2500000,
      previousValue: 2341000,
      change: 21.6,
      trend: 'up',
      format: 'currency',
      icon: DollarSign,
      color: 'text-green-600',
      description: 'Total revenue generated this period'
    },
    {
      id: 'deals-closed',
      title: 'Deals Closed',
      value: 147,
      target: 120,
      previousValue: 128,
      change: 14.8,
      trend: 'up',
      format: 'number',
      icon: Handshake,
      color: 'text-blue-600',
      description: 'Number of deals successfully closed'
    },
    {
      id: 'avg-deal-size',
      title: 'Avg Deal Size',
      value: 19370,
      target: 18000,
      previousValue: 18289,
      change: 5.9,
      trend: 'up',
      format: 'currency',
      icon: Calculator,
      color: 'text-purple-600',
      description: 'Average value per closed deal'
    },
    {
      id: 'win-rate',
      title: 'Win Rate',
      value: 24.7,
      target: 20.0,
      previousValue: 22.1,
      change: 11.8,
      trend: 'up',
      format: 'percentage',
      icon: Target,
      color: 'text-emerald-600',
      description: 'Percentage of opportunities won'
    },
    {
      id: 'pipeline-value',
      title: 'Pipeline Value',
      value: 4567800,
      target: 4000000,
      previousValue: 3987400,
      change: 14.5,
      trend: 'up',
      format: 'currency',
      icon: TrendingUp,
      color: 'text-orange-600',
      description: 'Total value of active opportunities'
    },
    {
      id: 'avg-sales-cycle',
      title: 'Avg Sales Cycle',
      value: 47,
      target: 60,
      previousValue: 52,
      change: -9.6,
      trend: 'up',
      format: 'number',
      icon: Clock,
      color: 'text-indigo-600',
      description: 'Average days from lead to close'
    },
    {
      id: 'conversion-rate',
      title: 'Lead Conversion Rate',
      value: 8.4,
      target: 7.0,
      previousValue: 7.8,
      change: 7.7,
      trend: 'up',
      format: 'percentage',
      icon: Users,
      color: 'text-cyan-600',
      description: 'Percentage of leads that become customers'
    },
    {
      id: 'forecast-accuracy',
      title: 'Forecast Accuracy',
      value: 87.3,
      target: 85.0,
      previousValue: 84.1,
      change: 3.8,
      trend: 'up',
      format: 'percentage',
      icon: Award,
      color: 'text-yellow-600',
      description: 'Accuracy of sales forecasting'
    }
  ];

  // Mock data for sales opportunities
  const salesOpportunities: SalesOpportunity[] = [
    {
      id: 'OPP001',
      leadName: 'Metropolitan Construction',
      company: 'Metro Build Corp',
      value: 245000,
      stage: 'proposal',
      probability: 75,
      expectedCloseDate: '2024-02-15',
      lastActivity: '2024-01-14T10:30:00Z',
      source: 'Website',
      assignedTo: { name: 'Sarah Johnson' },
      products: ['Enterprise Plan', 'Professional Services'],
      notes: 'Large commercial project, very interested in automation features',
      daysInStage: 12
    },
    {
      id: 'OPP002',
      leadName: 'Sunrise Real Estate Group',
      company: 'Sunrise Properties',
      value: 89500,
      stage: 'negotiation',
      probability: 85,
      expectedCloseDate: '2024-01-25',
      lastActivity: '2024-01-15T14:15:00Z',
      source: 'Referral',
      assignedTo: { name: 'Mike Chen' },
      products: ['Professional Plan', 'Add-on Modules'],
      notes: 'Ready to sign, just finalizing contract terms',
      daysInStage: 8
    },
    {
      id: 'OPP003',
      leadName: 'Green Valley Homes',
      company: 'Green Valley Development',
      value: 167000,
      stage: 'qualification',
      probability: 45,
      expectedCloseDate: '2024-03-01',
      lastActivity: '2024-01-13T09:45:00Z',
      source: 'Trade Show',
      assignedTo: { name: 'Lisa Wang' },
      products: ['Enterprise Plan'],
      notes: 'Evaluating multiple vendors, need to differentiate our solution',
      daysInStage: 18
    },
    {
      id: 'OPP004',
      leadName: 'Apex Building Solutions',
      company: 'Apex Construction',
      value: 312000,
      stage: 'proposal',
      probability: 65,
      expectedCloseDate: '2024-02-28',
      lastActivity: '2024-01-15T16:20:00Z',
      source: 'Cold Outreach',
      assignedTo: { name: 'David Wilson' },
      products: ['Enterprise Plan', 'Custom Integration'],
      notes: 'Complex integration requirements, technical discussion scheduled',
      daysInStage: 15
    },
    {
      id: 'OPP005',
      leadName: 'Urban Development LLC',
      company: 'Urban Projects',
      value: 125000,
      stage: 'prospecting',
      probability: 25,
      expectedCloseDate: '2024-04-15',
      lastActivity: '2024-01-12T11:30:00Z',
      source: 'LinkedIn',
      assignedTo: { name: 'Emma Davis' },
      products: ['Professional Plan'],
      notes: 'Initial contact made, scheduling discovery call',
      daysInStage: 5
    }
  ];

  // Mock data for sales team performance
  const salesPerformance: SalesPerformance[] = [
    {
      userId: 'USER001',
      userName: 'Sarah Johnson',
      role: 'Senior Sales Executive',
      metrics: {
        revenue: 847600,
        deals: 42,
        conversionRate: 28.5,
        avgDealSize: 20181,
        activitiesLogged: 342,
        callsMade: 156,
        emailsSent: 89,
        meetingsHeld: 23
      },
      targets: {
        revenue: 750000,
        deals: 35,
        activities: 300
      },
      performance: {
        revenueProgress: 113.0,
        dealsProgress: 120.0,
        activitiesProgress: 114.0,
        overallScore: 94.5
      },
      trends: {
        revenue: 18.3,
        deals: 12.7,
        activities: 8.9
      }
    },
    {
      userId: 'USER002',
      userName: 'Mike Chen',
      role: 'Sales Executive',
      metrics: {
        revenue: 623400,
        deals: 31,
        conversionRate: 22.1,
        avgDealSize: 20109,
        activitiesLogged: 287,
        callsMade: 134,
        emailsSent: 76,
        meetingsHeld: 18
      },
      targets: {
        revenue: 600000,
        deals: 30,
        activities: 280
      },
      performance: {
        revenueProgress: 103.9,
        dealsProgress: 103.3,
        activitiesProgress: 102.5,
        overallScore: 87.2
      },
      trends: {
        revenue: 14.7,
        deals: 8.4,
        activities: 12.1
      }
    },
    {
      userId: 'USER003',
      userName: 'Lisa Wang',
      role: 'Sales Executive',
      metrics: {
        revenue: 567200,
        deals: 28,
        conversionRate: 19.8,
        avgDealSize: 20257,
        activitiesLogged: 298,
        callsMade: 142,
        emailsSent: 83,
        meetingsHeld: 21
      },
      targets: {
        revenue: 600000,
        deals: 30,
        activities: 280
      },
      performance: {
        revenueProgress: 94.5,
        dealsProgress: 93.3,
        activitiesProgress: 106.4,
        overallScore: 82.1
      },
      trends: {
        revenue: 8.9,
        deals: -2.3,
        activities: 15.7
      }
    },
    {
      userId: 'USER004',
      userName: 'David Wilson',
      role: 'Junior Sales Executive',
      metrics: {
        revenue: 389400,
        deals: 18,
        conversionRate: 16.2,
        avgDealSize: 21633,
        activitiesLogged: 234,
        callsMade: 98,
        emailsSent: 67,
        meetingsHeld: 12
      },
      targets: {
        revenue: 400000,
        deals: 20,
        activities: 240
      },
      performance: {
        revenueProgress: 97.4,
        dealsProgress: 90.0,
        activitiesProgress: 97.5,
        overallScore: 78.3
      },
      trends: {
        revenue: 23.5,
        deals: 28.6,
        activities: 18.9
      }
    }
  ];

  // Mock data for pipeline stages
  const pipelineStages: PipelineStage[] = [
    {
      id: 'prospecting',
      name: 'Prospecting',
      deals: 23,
      value: 1245000,
      avgTimeInStage: 14,
      conversionRate: 65.2,
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: 'qualification',
      name: 'Qualification',
      deals: 18,
      value: 987000,
      avgTimeInStage: 21,
      conversionRate: 72.1,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'proposal',
      name: 'Proposal',
      deals: 12,
      value: 1567000,
      avgTimeInStage: 18,
      conversionRate: 58.3,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      deals: 8,
      value: 768000,
      avgTimeInStage: 12,
      conversionRate: 87.5,
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      deals: 147,
      value: 2847600,
      avgTimeInStage: 3,
      conversionRate: 100,
      color: 'bg-green-100 text-green-800'
    }
  ];

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'ratio':
        return `${value.toFixed(1)}:1`;
      default:
        return value.toLocaleString();
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getStageColor = (stage: string) => {
    const colors = {
      prospecting: 'bg-gray-100 text-gray-800',
      qualification: 'bg-blue-100 text-blue-800',
      proposal: 'bg-yellow-100 text-yellow-800',
      negotiation: 'bg-orange-100 text-orange-800',
      'closed-won': 'bg-green-100 text-green-800',
      'closed-lost': 'bg-red-100 text-red-800'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredOpportunities = salesOpportunities.filter(opp => 
    opp.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive sales performance analytics and pipeline insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
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
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="mid-market">Mid-Market</SelectItem>
              <SelectItem value="smb">Small Business</SelectItem>
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
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Sales Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesMetrics.slice(0, 4).map((metric) => {
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
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{formatValue(metric.value, metric.format)}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                        </span>
                        <span className={`${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                          {((metric.value / metric.target) * 100).toFixed(0)}% of target
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesMetrics.slice(4).map((metric) => {
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
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{formatValue(metric.value, metric.format)}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                        </span>
                        <span className={`${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                          {((metric.value / metric.target) * 100).toFixed(0)}% of target
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="h-5 w-5 text-green-500" />
                  Revenue Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$2.85M</div>
                  <p className="text-sm text-muted-foreground">Total Revenue (113.9% of target)</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Target Progress</span>
                    <span className="font-medium">113.9%</span>
                  </div>
                  <Progress value={113.9} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>$2.5M Target</span>
                    <span>+21.6% vs last period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Sales Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24.7%</div>
                  <p className="text-sm text-muted-foreground">Win Rate (123.5% of target)</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">47 days</div>
                    <p className="text-xs text-muted-foreground">Avg Sales Cycle</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">$19.4K</div>
                    <p className="text-xs text-muted-foreground">Avg Deal Size</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  Pipeline Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$4.57M</div>
                  <p className="text-sm text-muted-foreground">Pipeline Value (114.2% of target)</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">61</div>
                    <p className="text-xs text-muted-foreground">Active Deals</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">87.3%</div>
                    <p className="text-xs text-muted-foreground">Forecast Accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          {/* Pipeline Stages */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline Overview</CardTitle>
              <CardDescription>
                Current state of sales pipeline across all stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {pipelineStages.filter(stage => stage.id !== 'closed-won').map((stage) => (
                  <Card key={stage.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <Badge className={stage.color}>
                          {stage.name}
                        </Badge>
                        <div>
                          <p className="text-2xl font-bold">{stage.deals}</p>
                          <p className="text-sm text-muted-foreground">Deals</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-green-600">
                            ${(stage.value / 1000).toFixed(0)}K
                          </p>
                          <p className="text-xs text-muted-foreground">Total Value</p>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Avg Time:</span>
                            <span className="font-medium">{stage.avgTimeInStage} days</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Conv Rate:</span>
                            <span className="font-medium">{stage.conversionRate.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Velocity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-orange-500" />
                  Pipeline Velocity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {pipelineStages.filter(stage => stage.id !== 'closed-won').map((stage) => (
                    <div key={stage.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {stage.name}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{stage.avgTimeInStage} days</p>
                        <p className="text-xs text-muted-foreground">avg time</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Sales Cycle:</span>
                    <span className="font-bold text-blue-600">47 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-green-500" />
                  Conversion Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {pipelineStages.filter(stage => stage.id !== 'closed-won').map((stage) => (
                    <div key={stage.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{stage.name}</span>
                        <span className="font-medium">{stage.conversionRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={stage.conversionRate} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Overall Win Rate:</span>
                    <span className="font-bold text-green-600">24.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Team Performance</CardTitle>
              <CardDescription>
                Individual performance metrics and target progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Sales Rep</th>
                      <th className="text-left py-3 px-4 font-medium">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium">Deals</th>
                      <th className="text-left py-3 px-4 font-medium">Conversion Rate</th>
                      <th className="text-left py-3 px-4 font-medium">Avg Deal Size</th>
                      <th className="text-left py-3 px-4 font-medium">Activities</th>
                      <th className="text-left py-3 px-4 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesPerformance.map((rep) => (
                      <tr key={rep.userId} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{rep.userName}</p>
                            <p className="text-sm text-muted-foreground">{rep.role}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">${rep.metrics.revenue.toLocaleString()}</p>
                            <div className="flex items-center gap-1">
                              <Progress value={rep.performance.revenueProgress} className="w-16 h-1" />
                              <span className="text-xs">{rep.performance.revenueProgress.toFixed(0)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{rep.metrics.deals}</p>
                            <div className="flex items-center gap-1">
                              <Progress value={rep.performance.dealsProgress} className="w-16 h-1" />
                              <span className="text-xs">{rep.performance.dealsProgress.toFixed(0)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{rep.metrics.conversionRate.toFixed(1)}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">${rep.metrics.avgDealSize.toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{rep.metrics.activitiesLogged}</p>
                            <div className="flex items-center gap-1">
                              <Progress value={rep.performance.activitiesProgress} className="w-16 h-1" />
                              <span className="text-xs">{rep.performance.activitiesProgress.toFixed(0)}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${getPerformanceColor(rep.performance.overallScore)}`}>
                              {rep.performance.overallScore.toFixed(1)}
                            </span>
                            {rep.performance.overallScore >= 90 && <Star className="h-4 w-4 text-yellow-500" />}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="prospecting">Prospecting</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Opportunities Table */}
          <Card>
            <CardHeader>
              <CardTitle>Active Opportunities</CardTitle>
              <CardDescription>
                Current sales opportunities in the pipeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Opportunity</th>
                      <th className="text-left py-3 px-4 font-medium">Value</th>
                      <th className="text-left py-3 px-4 font-medium">Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Probability</th>
                      <th className="text-left py-3 px-4 font-medium">Expected Close</th>
                      <th className="text-left py-3 px-4 font-medium">Assigned To</th>
                      <th className="text-left py-3 px-4 font-medium">Days in Stage</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOpportunities.map((opp) => (
                      <tr key={opp.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{opp.leadName}</p>
                            <p className="text-sm text-muted-foreground">{opp.company}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-green-600">
                            ${opp.value.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStageColor(opp.stage)}>
                            {opp.stage.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={opp.probability} className="w-16 h-2" />
                            <span className="text-sm font-medium">{opp.probability}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">
                            {new Date(opp.expectedCloseDate).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{opp.assignedTo.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${opp.daysInStage > 30 ? 'text-red-600' : 'text-gray-600'}`}>
                            {opp.daysInStage} days
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default SalesDashboard;
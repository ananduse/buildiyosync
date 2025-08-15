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
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Building,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Zap,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Filter,
  Search,
  Briefcase,
  CreditCard,
  Percent,
  Calculator,
  FileText,
  MapPin,
  Phone,
  Mail,
  UserCheck,
  ThumbsUp,
  ShoppingCart,
  Package,
  Truck,
  Home,
  Factory,
  TrendingUpIcon,
  BarChart,
  Gauge,
  Crown,
  Shield,
  Lightbulb,
  Rocket,
  Brain
} from 'lucide-react';

interface ExecutiveMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  format: 'currency' | 'number' | 'percentage' | 'ratio';
  category: 'financial' | 'growth' | 'operational' | 'strategic' | 'market';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  insights: string[];
}

interface BusinessUnit {
  id: string;
  name: string;
  type: 'construction' | 'real-estate' | 'manufacturing' | 'technology' | 'services';
  revenue: number;
  revenueTarget: number;
  growth: number;
  marketShare: number;
  profitMargin: number;
  customerCount: number;
  employeeCount: number;
  satisfaction: number;
  performance: 'excellent' | 'good' | 'average' | 'below-average';
  risks: string[];
  opportunities: string[];
}

interface StrategicInitiative {
  id: string;
  name: string;
  category: 'digital-transformation' | 'market-expansion' | 'product-development' | 'operational-efficiency' | 'customer-experience';
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
  progress: number;
  budget: number;
  budgetUsed: number;
  expectedROI: number;
  timeline: {
    startDate: string;
    endDate: string;
    milestones: number;
    milestonesCompleted: number;
  };
  stakeholders: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  businessImpact: string;
}

interface MarketIntelligence {
  sector: string;
  marketSize: number;
  marketGrowth: number;
  ourMarketShare: number;
  competitorCount: number;
  threatLevel: 'low' | 'medium' | 'high';
  opportunities: string[];
  threats: string[];
  trends: string[];
  recommendations: string[];
}

const ExecutiveDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarter');
  const [selectedView, setSelectedView] = useState('summary');

  // Mock data for executive metrics
  const executiveMetrics: ExecutiveMetric[] = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: 12847600,
      target: 12000000,
      previousValue: 10341000,
      change: 24.2,
      trend: 'up',
      format: 'currency',
      category: 'financial',
      icon: DollarSign,
      color: 'text-green-600',
      description: 'Total company revenue this quarter',
      priority: 'critical',
      insights: ['23% above target', 'Strongest quarter in company history', 'Construction segment leading growth']
    },
    {
      id: 'profit-margin',
      title: 'Net Profit Margin',
      value: 18.7,
      target: 15.0,
      previousValue: 16.2,
      change: 15.4,
      trend: 'up',
      format: 'percentage',
      category: 'financial',
      icon: Calculator,
      color: 'text-emerald-600',
      description: 'Overall profit margin across all business units',
      priority: 'critical',
      insights: ['Exceeding industry average of 12%', 'Operational efficiency gains', 'Premium pricing strategy working']
    },
    {
      id: 'customer-growth',
      title: 'Customer Growth',
      value: 847,
      target: 600,
      previousValue: 623,
      change: 36.0,
      trend: 'up',
      format: 'number',
      category: 'growth',
      icon: Users,
      color: 'text-blue-600',
      description: 'New customers acquired this quarter',
      priority: 'high',
      insights: ['41% above target', 'Strong referral program impact', 'Digital marketing ROI improving']
    },
    {
      id: 'market-share',
      title: 'Market Share',
      value: 23.4,
      target: 20.0,
      previousValue: 21.1,
      change: 10.9,
      trend: 'up',
      format: 'percentage',
      category: 'market',
      icon: Globe,
      color: 'text-purple-600',
      description: 'Share of addressable market',
      priority: 'high',
      insights: ['Market leader in construction tech', 'Gaining share from competitors', 'Strong brand recognition']
    },
    {
      id: 'customer-lifetime-value',
      title: 'Customer LTV',
      value: 47800,
      target: 40000,
      previousValue: 42300,
      change: 13.0,
      trend: 'up',
      format: 'currency',
      category: 'strategic',
      icon: Award,
      color: 'text-orange-600',
      description: 'Average customer lifetime value',
      priority: 'medium',
      insights: ['Premium customers driving increase', 'Reduced churn rate', 'Upselling success']
    },
    {
      id: 'employee-satisfaction',
      title: 'Employee Satisfaction',
      value: 87.3,
      target: 85.0,
      previousValue: 84.1,
      change: 3.8,
      trend: 'up',
      format: 'percentage',
      category: 'operational',
      icon: ThumbsUp,
      color: 'text-indigo-600',
      description: 'Overall employee satisfaction score',
      priority: 'medium',
      insights: ['Above industry benchmark', 'Work-life balance improvements', 'Career development programs effective']
    },
    {
      id: 'innovation-index',
      title: 'Innovation Index',
      value: 76.2,
      target: 70.0,
      previousValue: 71.8,
      change: 6.1,
      trend: 'up',
      format: 'percentage',
      category: 'strategic',
      icon: Lightbulb,
      color: 'text-yellow-600',
      description: 'Innovation and R&D effectiveness score',
      priority: 'medium',
      insights: ['New product launches successful', 'Patent applications increased', 'Technology investments paying off']
    },
    {
      id: 'operational-efficiency',
      title: 'Operational Efficiency',
      value: 92.4,
      target: 88.0,
      previousValue: 89.7,
      change: 3.0,
      trend: 'up',
      format: 'percentage',
      category: 'operational',
      icon: Zap,
      color: 'text-cyan-600',
      description: 'Overall operational efficiency rating',
      priority: 'medium',
      insights: ['Automation initiatives successful', 'Process optimization ongoing', 'Cost reduction targets met']
    }
  ];

  // Mock data for business units
  const businessUnits: BusinessUnit[] = [
    {
      id: 'construction',
      name: 'Construction Solutions',
      type: 'construction',
      revenue: 5847600,
      revenueTarget: 5200000,
      growth: 28.4,
      marketShare: 34.2,
      profitMargin: 22.1,
      customerCount: 342,
      employeeCount: 87,
      satisfaction: 91.2,
      performance: 'excellent',
      risks: ['Material cost inflation', 'Labor shortage', 'Regulatory changes'],
      opportunities: ['Green building demand', 'Smart construction tech', 'International expansion']
    },
    {
      id: 'real-estate',
      name: 'Real Estate Technology',
      type: 'real-estate',
      revenue: 3567200,
      revenueTarget: 3800000,
      growth: 18.7,
      marketShare: 18.9,
      profitMargin: 19.3,
      customerCount: 289,
      employeeCount: 64,
      satisfaction: 87.8,
      performance: 'good',
      risks: ['Market volatility', 'Interest rate changes', 'Competition'],
      opportunities: ['PropTech integration', 'Virtual tours', 'AI-powered analytics']
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing Systems',
      type: 'manufacturing',
      revenue: 2167400,
      revenueTarget: 2400000,
      growth: 12.3,
      marketShare: 15.6,
      profitMargin: 16.8,
      customerCount: 156,
      employeeCount: 43,
      satisfaction: 84.5,
      performance: 'average',
      risks: ['Supply chain disruption', 'Technology obsolescence', 'Quality control'],
      opportunities: ['Industry 4.0 adoption', 'Automation upgrades', 'Sustainability solutions']
    },
    {
      id: 'technology',
      name: 'Technology Services',
      type: 'technology',
      revenue: 1265400,
      revenueTarget: 1600000,
      growth: 45.2,
      marketShare: 8.7,
      profitMargin: 28.9,
      customerCount: 89,
      employeeCount: 34,
      satisfaction: 93.1,
      performance: 'excellent',
      risks: ['Talent acquisition', 'Technology disruption', 'Security threats'],
      opportunities: ['AI/ML services', 'Cloud migration', 'Cybersecurity consulting']
    }
  ];

  // Mock data for strategic initiatives
  const strategicInitiatives: StrategicInitiative[] = [
    {
      id: 'digital-transformation',
      name: 'Digital Transformation Program',
      category: 'digital-transformation',
      status: 'in-progress',
      progress: 67.3,
      budget: 2800000,
      budgetUsed: 1876000,
      expectedROI: 340,
      timeline: {
        startDate: '2023-01-01',
        endDate: '2024-12-31',
        milestones: 12,
        milestonesCompleted: 8
      },
      stakeholders: ['CTO', 'COO', 'VP Engineering', 'VP Sales'],
      riskLevel: 'medium',
      businessImpact: 'Modernize technology stack and improve operational efficiency'
    },
    {
      id: 'market-expansion',
      name: 'International Market Expansion',
      category: 'market-expansion',
      status: 'planning',
      progress: 23.1,
      budget: 5200000,
      budgetUsed: 890000,
      expectedROI: 280,
      timeline: {
        startDate: '2024-03-01',
        endDate: '2025-12-31',
        milestones: 8,
        milestonesCompleted: 2
      },
      stakeholders: ['CEO', 'VP Sales', 'VP Marketing', 'Legal'],
      riskLevel: 'high',
      businessImpact: 'Enter new geographic markets and expand customer base'
    },
    {
      id: 'ai-integration',
      name: 'AI-Powered Product Suite',
      category: 'product-development',
      status: 'in-progress',
      progress: 45.8,
      budget: 1900000,
      budgetUsed: 967000,
      expectedROI: 450,
      timeline: {
        startDate: '2023-09-01',
        endDate: '2024-08-31',
        milestones: 6,
        milestonesCompleted: 3
      },
      stakeholders: ['CTO', 'VP Product', 'Head of AI', 'VP Engineering'],
      riskLevel: 'medium',
      businessImpact: 'Integrate AI capabilities across all product lines'
    },
    {
      id: 'sustainability',
      name: 'Sustainability Initiative',
      category: 'operational-efficiency',
      status: 'in-progress',
      progress: 78.9,
      budget: 1200000,
      budgetUsed: 934000,
      expectedROI: 180,
      timeline: {
        startDate: '2023-06-01',
        endDate: '2024-06-30',
        milestones: 10,
        milestonesCompleted: 8
      },
      stakeholders: ['COO', 'VP Operations', 'VP Marketing', 'Head of Sustainability'],
      riskLevel: 'low',
      businessImpact: 'Reduce environmental impact and improve brand positioning'
    }
  ];

  // Mock data for market intelligence
  const marketIntelligence: MarketIntelligence[] = [
    {
      sector: 'Construction Technology',
      marketSize: 24500000000,
      marketGrowth: 12.8,
      ourMarketShare: 23.4,
      competitorCount: 147,
      threatLevel: 'medium',
      opportunities: ['Smart building integration', 'Sustainability regulations', 'Remote work impact'],
      threats: ['New tech entrants', 'Economic uncertainty', 'Labor shortages'],
      trends: ['AI/ML adoption', 'Cloud-first solutions', 'Mobile workforce'],
      recommendations: ['Invest in AI capabilities', 'Expand cloud offerings', 'Focus on mobile UX']
    },
    {
      sector: 'Real Estate Technology',
      marketSize: 18700000000,
      marketGrowth: 15.2,
      ourMarketShare: 18.9,
      competitorCount: 234,
      threatLevel: 'high',
      opportunities: ['Virtual reality tours', 'Blockchain transactions', 'IoT integration'],
      threats: ['Big tech competition', 'Regulatory changes', 'Market saturation'],
      trends: ['PropTech consolidation', 'Virtual-first sales', 'Data analytics focus'],
      recommendations: ['Accelerate VR development', 'Explore blockchain', 'Enhance analytics']
    }
  ];

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case 'currency':
        return `$${(value / 1000000).toFixed(1)}M`;
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'below-average': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-500" />
            Executive Dashboard
          </h1>
          <p className="text-muted-foreground">Strategic insights and key business metrics for leadership</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Executive Summary</TabsTrigger>
          <TabsTrigger value="financial">Financial Performance</TabsTrigger>
          <TabsTrigger value="business-units">Business Units</TabsTrigger>
          <TabsTrigger value="strategic">Strategic Initiatives</TabsTrigger>
          <TabsTrigger value="market">Market Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {executiveMetrics.slice(0, 4).map((metric) => {
              const Icon = metric.icon;
              const isOnTarget = metric.value >= metric.target;
              
              return (
                <Card key={metric.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${getPriorityColor(metric.priority).replace('text-', 'bg-')}`} />
                  <CardContent className="p-4 pl-6">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend, metric.change)}
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(metric.priority)}`}>
                          {metric.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-bold">{formatValue(metric.value, metric.format)}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                        </span>
                        <span className={`${isOnTarget ? 'text-green-600' : 'text-red-600'}`}>
                          vs target
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Key Business Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {executiveMetrics.slice(0, 3).map((metric) => (
                    <div key={metric.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">{metric.title}</h4>
                      <ul className="space-y-1">
                        {metric.insights.map((insight, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-blue-500" />
                  Strategic Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {strategicInitiatives.slice(0, 4).map((initiative) => (
                    <div key={initiative.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{initiative.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={initiative.progress} className="w-24 h-2" />
                          <span className="text-xs text-muted-foreground">{initiative.progress.toFixed(0)}%</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(initiative.status)}>
                        {initiative.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-green-500" />
                Quarterly Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">$12.8M</div>
                  <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
                  <Badge className="bg-green-100 text-green-800">+24.2% YoY</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">18.7%</div>
                  <p className="text-sm text-muted-foreground mb-2">Net Profit Margin</p>
                  <Badge className="bg-blue-100 text-blue-800">+15.4% vs target</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">847</div>
                  <p className="text-sm text-muted-foreground mb-2">New Customers</p>
                  <Badge className="bg-purple-100 text-purple-800">+36.0% growth</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">23.4%</div>
                  <p className="text-sm text-muted-foreground mb-2">Market Share</p>
                  <Badge className="bg-orange-100 text-orange-800">+10.9% increase</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {executiveMetrics.filter(m => m.category === 'financial').map((metric) => {
              const Icon = metric.icon;
              
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
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Revenue Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Business Unit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessUnits.map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{unit.name}</span>
                          <span className="font-bold text-green-600">
                            ${(unit.revenue / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(unit.revenue / unit.revenueTarget) * 100} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {((unit.revenue / unit.revenueTarget) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profitability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessUnits.map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{unit.name}</p>
                        <p className="text-sm text-muted-foreground">{unit.customerCount} customers</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{unit.profitMargin.toFixed(1)}%</p>
                        <p className="text-sm text-muted-foreground">margin</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business-units" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessUnits.map((unit) => (
              <Card key={unit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {unit.name}
                    </CardTitle>
                    <Badge className={getPerformanceColor(unit.performance)}>
                      {unit.performance}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ${(unit.revenue / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{unit.growth.toFixed(1)}%</p>
                      <p className="text-sm text-muted-foreground">Growth</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Share</span>
                      <span className="font-medium">{unit.marketShare.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Profit Margin</span>
                      <span className="font-medium">{unit.profitMargin.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">{unit.satisfaction.toFixed(1)}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Risks</h4>
                    <ul className="space-y-1">
                      {unit.risks.slice(0, 2).map((risk, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-yellow-500" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Opportunities</h4>
                    <ul className="space-y-1">
                      {unit.opportunities.slice(0, 2).map((opportunity, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Lightbulb className="h-3 w-3 text-green-500" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="strategic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Initiative Portfolio</CardTitle>
              <CardDescription>
                Current strategic projects and their progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Initiative</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Progress</th>
                      <th className="text-left py-3 px-4 font-medium">Budget</th>
                      <th className="text-left py-3 px-4 font-medium">Expected ROI</th>
                      <th className="text-left py-3 px-4 font-medium">Risk Level</th>
                      <th className="text-left py-3 px-4 font-medium">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategicInitiatives.map((initiative) => (
                      <tr key={initiative.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{initiative.name}</p>
                            <p className="text-sm text-muted-foreground">{initiative.businessImpact}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(initiative.status)}>
                            {initiative.status.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={initiative.progress} className="w-20 h-2" />
                            <span className="text-sm font-medium">{initiative.progress.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">${(initiative.budgetUsed / 1000000).toFixed(1)}M</p>
                            <p className="text-xs text-muted-foreground">
                              of ${(initiative.budget / 1000000).toFixed(1)}M
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-green-600">{initiative.expectedROI}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${getRiskColor(initiative.riskLevel)}`}>
                            {initiative.riskLevel}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm">
                              {initiative.timeline.milestonesCompleted}/{initiative.timeline.milestones}
                            </p>
                            <p className="text-xs text-muted-foreground">milestones</p>
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

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketIntelligence.map((market) => (
              <Card key={market.sector}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {market.sector}
                  </CardTitle>
                  <CardDescription>
                    Market size: ${(market.marketSize / 1000000000).toFixed(1)}B | Growth: {market.marketGrowth}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{market.ourMarketShare.toFixed(1)}%</p>
                      <p className="text-sm text-muted-foreground">Our Market Share</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{market.competitorCount}</p>
                      <p className="text-sm text-muted-foreground">Competitors</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Threat Level</h4>
                      <Badge className={
                        market.threatLevel === 'high' ? 'bg-red-100 text-red-800' :
                        market.threatLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {market.threatLevel}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Opportunities</h4>
                    <ul className="space-y-1">
                      {market.opportunities.slice(0, 3).map((opportunity, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          {opportunity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Recommendations</h4>
                    <ul className="space-y-1">
                      {market.recommendations.slice(0, 3).map((recommendation, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <Target className="h-3 w-3 text-blue-500" />
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveDashboard;
import { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Activity,
  Eye,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart,
  MoreHorizontal,
  Clock,
  Star,
  Award,
  Zap,
  Building2,
  Globe,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Types
interface AnalyticsMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  suffix?: string;
  prefix?: string;
}

interface ConversionFunnelStage {
  id: string;
  name: string;
  value: number;
  percentage: number;
  dropoff: number;
  color: string;
}

interface PerformanceData {
  period: string;
  leads: number;
  conversions: number;
  revenue: number;
  activities: number;
}

interface TopPerformer {
  id: string;
  name: string;
  avatar: string;
  leadsCount: number;
  conversionRate: number;
  revenue: number;
  change: number;
  rank: number;
}

interface LeadSource {
  id: string;
  name: string;
  leads: number;
  conversions: number;
  revenue: number;
  cost: number;
  roi: number;
  color: string;
}

// Mock data
const mockMetrics: AnalyticsMetric[] = [
  {
    id: 'total-leads',
    title: 'Total Leads',
    value: 2456,
    change: 12.5,
    changeType: 'increase',
    icon: Users,
    color: 'text-blue-600',
    suffix: ''
  },
  {
    id: 'qualified-leads',
    title: 'Qualified Leads',
    value: 892,
    change: -3.2,
    changeType: 'decrease',
    icon: Target,
    color: 'text-emerald-600',
    suffix: ''
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 24.8,
    change: 5.1,
    changeType: 'increase',
    icon: TrendingUp,
    color: 'text-purple-600',
    suffix: '%'
  },
  {
    id: 'revenue',
    title: 'Revenue Generated',
    value: 487500,
    change: 18.9,
    changeType: 'increase',
    icon: DollarSign,
    color: 'text-amber-600',
    prefix: '$'
  },
  {
    id: 'avg-deal-size',
    title: 'Avg Deal Size',
    value: 12450,
    change: -2.1,
    changeType: 'decrease',
    icon: Award,
    color: 'text-rose-600',
    prefix: '$'
  },
  {
    id: 'lead-response-time',
    title: 'Avg Response Time',
    value: 2.3,
    change: -15.4,
    changeType: 'increase',
    icon: Clock,
    color: 'text-indigo-600',
    suffix: 'h'
  }
];

const mockFunnelData: ConversionFunnelStage[] = [
  {
    id: 'leads',
    name: 'Total Leads',
    value: 2456,
    percentage: 100,
    dropoff: 0,
    color: 'bg-blue-500'
  },
  {
    id: 'contacted',
    name: 'Contacted',
    value: 1967,
    percentage: 80.1,
    dropoff: 19.9,
    color: 'bg-cyan-500'
  },
  {
    id: 'qualified',
    name: 'Qualified',
    value: 892,
    percentage: 36.3,
    dropoff: 43.8,
    color: 'bg-emerald-500'
  },
  {
    id: 'proposal',
    name: 'Proposal Sent',
    value: 534,
    percentage: 21.7,
    dropoff: 14.6,
    color: 'bg-amber-500'
  },
  {
    id: 'negotiation',
    name: 'In Negotiation',
    value: 312,
    percentage: 12.7,
    dropoff: 9.0,
    color: 'bg-orange-500'
  },
  {
    id: 'won',
    name: 'Won',
    value: 187,
    percentage: 7.6,
    dropoff: 5.1,
    color: 'bg-emerald-600'
  }
];

const mockPerformanceData: PerformanceData[] = [
  { period: 'Jan', leads: 204, conversions: 48, revenue: 72000, activities: 892 },
  { period: 'Feb', leads: 189, conversions: 52, revenue: 78000, activities: 945 },
  { period: 'Mar', leads: 234, conversions: 61, revenue: 91500, activities: 1123 },
  { period: 'Apr', leads: 198, conversions: 45, revenue: 67500, activities: 887 },
  { period: 'May', leads: 267, conversions: 72, revenue: 108000, activities: 1234 },
  { period: 'Jun', leads: 298, conversions: 89, revenue: 133500, activities: 1456 }
];

const mockTopPerformers: TopPerformer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    leadsCount: 156,
    conversionRate: 34.6,
    revenue: 87500,
    change: 12.3,
    rank: 1
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '/avatars/mike.jpg',
    leadsCount: 134,
    conversionRate: 28.4,
    revenue: 76200,
    change: -3.2,
    rank: 2
  },
  {
    id: '3',
    name: 'Lisa Wang',
    avatar: '/avatars/lisa.jpg',
    leadsCount: 89,
    conversionRate: 31.5,
    revenue: 69800,
    change: 8.7,
    rank: 3
  },
  {
    id: '4',
    name: 'Alex Rivera',
    avatar: '/avatars/alex.jpg',
    leadsCount: 123,
    conversionRate: 22.8,
    revenue: 54300,
    change: 5.1,
    rank: 4
  }
];

const mockLeadSources: LeadSource[] = [
  {
    id: 'website',
    name: 'Website',
    leads: 892,
    conversions: 234,
    revenue: 156000,
    cost: 12500,
    roi: 1148,
    color: 'bg-blue-500'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    leads: 567,
    conversions: 145,
    revenue: 89500,
    cost: 8900,
    roi: 906,
    color: 'bg-purple-500'
  },
  {
    id: 'referrals',
    name: 'Referrals',
    leads: 234,
    conversions: 78,
    revenue: 67800,
    cost: 2400,
    roi: 2725,
    color: 'bg-emerald-500'
  },
  {
    id: 'paid-ads',
    name: 'Paid Advertising',
    leads: 678,
    conversions: 123,
    revenue: 78900,
    cost: 15600,
    roi: 406,
    color: 'bg-orange-500'
  },
  {
    id: 'email',
    name: 'Email Campaigns',
    leads: 345,
    conversions: 89,
    revenue: 45600,
    cost: 3400,
    roi: 1241,
    color: 'bg-cyan-500'
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatNumber(num: number, prefix = '', suffix = ''): string {
  if (num >= 1000000) {
    return `${prefix}${(num / 1000000).toFixed(1)}M${suffix}`;
  } else if (num >= 1000) {
    return `${prefix}${(num / 1000).toFixed(1)}K${suffix}`;
  }
  return `${prefix}${num.toLocaleString()}${suffix}`;
}

function MetricCard({ metric }: { metric: AnalyticsMetric }) {
  const Icon = metric.icon;
  const isPositiveChange = metric.changeType === 'increase' && metric.change > 0;
  const isNegativeChange = metric.changeType === 'decrease' && metric.change < 0;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn("p-2 rounded-lg", metric.color.replace('text-', 'bg-').replace('600', '100'))}>
              <Icon className={cn("h-6 w-6", metric.color)} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <p className="text-2xl font-bold">
                {formatNumber(metric.value, metric.prefix, metric.suffix)}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={cn(
              "flex items-center text-sm font-medium",
              isPositiveChange ? "text-emerald-600" : 
              isNegativeChange ? "text-red-600" : "text-gray-500"
            )}>
              {metric.change > 0 && <ArrowUpRight className="h-4 w-4 mr-1" />}
              {metric.change < 0 && <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(metric.change)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">vs last period</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ConversionFunnel({ data }: { data: ConversionFunnelStage[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Conversion Funnel</span>
        </CardTitle>
        <CardDescription>Lead progression through sales stages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((stage, index) => (
            <div key={stage.id} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{stage.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{stage.percentage.toFixed(1)}%</span>
                  <span className="font-semibold">{stage.value.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={cn("h-3 rounded-full transition-all duration-500", stage.color)}
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                
                {index > 0 && (
                  <div className="absolute -top-6 right-0 text-xs text-red-500">
                    -{stage.dropoff.toFixed(1)}% dropoff
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PerformanceChart({ data }: { data: PerformanceData[] }) {
  const maxValue = Math.max(...data.map(d => Math.max(d.leads, d.conversions, d.revenue / 1000)));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <LineChart className="h-5 w-5" />
          <span>Performance Trends</span>
        </CardTitle>
        <CardDescription>Monthly performance metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Leads</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span>Conversions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span>Revenue (K)</span>
            </div>
          </div>
          
          {/* Chart simulation */}
          <div className="grid grid-cols-6 gap-4 h-48">
            {data.map((item, index) => (
              <div key={item.period} className="flex flex-col items-center space-y-2">
                <div className="flex-1 flex flex-col justify-end space-y-1 w-full">
                  <Tooltip content={`Leads: ${item.leads}`}>
                    <div 
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${(item.leads / maxValue) * 100}%` }}
                    />
                  </Tooltip>
                  <Tooltip content={`Conversions: ${item.conversions}`}>
                    <div 
                      className="bg-emerald-500 rounded-t"
                      style={{ height: `${(item.conversions / maxValue) * 100}%` }}
                    />
                  </Tooltip>
                  <Tooltip content={`Revenue: $${item.revenue.toLocaleString()}`}>
                    <div 
                      className="bg-amber-500 rounded-t"
                      style={{ height: `${((item.revenue / 1000) / maxValue) * 100}%` }}
                    />
                  </Tooltip>
                </div>
                <span className="text-xs font-medium">{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopPerformersCard({ performers }: { performers: TopPerformer[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Top Performers</span>
        </CardTitle>
        <CardDescription>Sales team leaderboard this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {performers.map((performer) => (
            <div key={performer.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={performer.avatar} />
                    <AvatarFallback>{getInitials(performer.name)}</AvatarFallback>
                  </Avatar>
                  <Badge 
                    className={cn(
                      "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs",
                      performer.rank === 1 ? "bg-yellow-500" :
                      performer.rank === 2 ? "bg-gray-400" :
                      performer.rank === 3 ? "bg-orange-600" : "bg-blue-500"
                    )}
                  >
                    {performer.rank}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold">{performer.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{performer.leadsCount} leads</span>
                    <span>{performer.conversionRate}% conv.</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">${performer.revenue.toLocaleString()}</p>
                <div className={cn(
                  "text-sm flex items-center",
                  performer.change >= 0 ? "text-emerald-600" : "text-red-600"
                )}>
                  {performer.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(performer.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LeadSourcesCard({ sources }: { sources: LeadSource[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Lead Sources Performance</span>
        </CardTitle>
        <CardDescription>ROI and conversion by acquisition channel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={cn("w-4 h-4 rounded-full", source.color)} />
                  <h4 className="font-semibold">{source.name}</h4>
                </div>
                <Badge variant="outline">{source.roi}% ROI</Badge>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Leads</p>
                  <p className="font-medium">{source.leads}</p>
                </div>
                <div>
                  <p className="text-gray-500">Conversions</p>
                  <p className="font-medium">{source.conversions}</p>
                </div>
                <div>
                  <p className="text-gray-500">Revenue</p>
                  <p className="font-medium">${source.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Cost</p>
                  <p className="font-medium">${source.cost.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Conversion Rate</span>
                  <span>{((source.conversions / source.leads) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(source.conversions / source.leads) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadAnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('this-month');
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalLeads = mockMetrics.find(m => m.id === 'total-leads')?.value || 0;
  const qualifiedLeads = mockMetrics.find(m => m.id === 'qualified-leads')?.value || 0;
  const conversionRate = mockMetrics.find(m => m.id === 'conversion-rate')?.value || 0;
  const totalRevenue = mockMetrics.find(m => m.id === 'revenue')?.value || 0;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Lead Analytics</h1>
              <Badge variant="secondary">Real-time Insights</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
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
              
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {mockMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sources">Lead Sources</TabsTrigger>
              <TabsTrigger value="performance">Team Performance</TabsTrigger>
              <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceChart data={mockPerformanceData} />
                <ConversionFunnel data={mockFunnelData} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPerformersCard performers={mockTopPerformers} />
                
                {/* Quick Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>AI Insights</span>
                    </CardTitle>
                    <CardDescription>Key findings and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900">Conversion Rate Up</h4>
                          <p className="text-sm text-blue-700">Your team's conversion rate improved by 5.1% this month. Focus on qualifying leads earlier.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900">Response Time Alert</h4>
                          <p className="text-sm text-amber-700">Average response time is 2.3 hours. Consider automated responses for faster engagement.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg">
                        <Award className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-emerald-900">Top Channel</h4>
                          <p className="text-sm text-emerald-700">Referrals have the highest ROI at 2,725%. Invest more in referral programs.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LeadSourcesCard sources={mockLeadSources} />
                
                {/* Source Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Source Revenue Distribution</CardTitle>
                    <CardDescription>Revenue breakdown by acquisition channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockLeadSources.map((source) => {
                        const percentage = (source.revenue / mockLeadSources.reduce((sum, s) => sum + s.revenue, 0)) * 100;
                        return (
                          <div key={source.id} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center space-x-2">
                                <div className={cn("w-3 h-3 rounded-full", source.color)} />
                                <span>{source.name}</span>
                              </span>
                              <span className="font-medium">{percentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPerformersCard performers={mockTopPerformers} />
                
                {/* Team Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Team Statistics</CardTitle>
                    <CardDescription>Overall team performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <UserCheck className="h-5 w-5 text-blue-600" />
                          <span>Active Sales Reps</span>
                        </div>
                        <span className="font-semibold">12</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Target className="h-5 w-5 text-emerald-600" />
                          <span>Team Conversion Rate</span>
                        </div>
                        <span className="font-semibold">24.8%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-5 w-5 text-amber-600" />
                          <span>Total Team Revenue</span>
                        </div>
                        <span className="font-semibold">$487,500</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-purple-600" />
                          <span>Avg Response Time</span>
                        </div>
                        <span className="font-semibold">2.3 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="funnel" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ConversionFunnel data={mockFunnelData} />
                </div>
                
                {/* Funnel Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Funnel Analysis</CardTitle>
                    <CardDescription>Key bottlenecks and opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-1">Highest Dropoff</h4>
                        <p className="text-sm text-red-700">43.8% dropoff from Contacted to Qualified. Focus on lead qualification process.</p>
                      </div>
                      
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <h4 className="font-semibold text-emerald-900 mb-1">Strong Performance</h4>
                        <p className="text-sm text-emerald-700">80.1% contact rate from leads. Great initial engagement!</p>
                      </div>
                      
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-1">Optimization Opportunity</h4>
                        <p className="text-sm text-amber-700">5.1% dropoff in final stage. Review closing techniques.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}
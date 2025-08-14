import { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Clock,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  Flame,
  Snowflake,
  Thermometer,
  RefreshCw,
  Download,
  Settings,
  Filter,
  ChevronRight,
  UserCheck,
  Zap,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Types
interface KPIMetric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  alert?: 'success' | 'warning' | 'error';
  drilldownPath?: string;
}

interface FunnelStage {
  name: string;
  count: number;
  value: number;
  conversion: number;
  avgDays: number;
  color: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LeadSource {
  name: string;
  leads: number;
  conversion: number;
  roi: number;
  costPerLead: number;
  trend: 'up' | 'down';
  color: string;
}

interface TeamMember {
  rank: number;
  name: string;
  avatar: string;
  totalLeads: number;
  converted: number;
  inProgress: number;
  conversionRate: number;
  revenue: number;
  activityScore: number;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'whatsapp' | 'meeting' | 'note' | 'status' | 'score';
  description: string;
  leadName: string;
  user: string;
  userAvatar: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

interface InsightItem {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  count?: number;
}

// Mock data
const kpiMetrics: KPIMetric[] = [
  {
    title: 'Total Active Leads',
    value: 342,
    change: 12.5,
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    drilldownPath: '/leads/list?status=active'
  },
  {
    title: 'New Leads Today',
    value: 18,
    change: -5.2,
    trend: 'down',
    icon: UserCheck,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    alert: 'warning',
    drilldownPath: '/leads/list?created=today'
  },
  {
    title: 'Conversion Rate',
    value: '23.4%',
    change: 3.2,
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    alert: 'success',
    drilldownPath: '/leads/analytics/funnel'
  },
  {
    title: 'Avg Lead Value',
    value: '$45.2K',
    change: 8.7,
    trend: 'up',
    icon: DollarSign,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    drilldownPath: '/leads/analytics/value'
  },
  {
    title: 'Response Time',
    value: '2.3 hrs',
    change: -15.3,
    trend: 'down',
    icon: Clock,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    alert: 'success',
    drilldownPath: '/leads/analytics/performance'
  },
  {
    title: 'Pipeline Value',
    value: '$2.8M',
    change: 22.1,
    trend: 'up',
    icon: BarChart3,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    drilldownPath: '/leads/analytics/pipeline'
  }
];

const funnelStages: FunnelStage[] = [
  { name: 'New', count: 156, value: 3120000, conversion: 100, avgDays: 0, color: 'bg-gray-500', bgColor: 'bg-gray-50', icon: Users },
  { name: 'Contacted', count: 124, value: 2480000, conversion: 79.5, avgDays: 1.2, color: 'bg-blue-500', bgColor: 'bg-blue-50', icon: Phone },
  { name: 'Qualified', count: 89, value: 1780000, conversion: 71.8, avgDays: 3.5, color: 'bg-amber-500', bgColor: 'bg-amber-50', icon: Target },
  { name: 'Proposal', count: 45, value: 900000, conversion: 50.6, avgDays: 7.2, color: 'bg-purple-500', bgColor: 'bg-purple-50', icon: FileText },
  { name: 'Negotiation', count: 28, value: 560000, conversion: 62.2, avgDays: 12.4, color: 'bg-pink-500', bgColor: 'bg-pink-50', icon: MessageSquare },
  { name: 'Won', count: 18, value: 360000, conversion: 64.3, avgDays: 18.7, color: 'bg-emerald-500', bgColor: 'bg-emerald-50', icon: Trophy }
];

const leadSources: LeadSource[] = [
  { name: 'Website', leads: 145, conversion: 24.5, roi: 320, costPerLead: 45, trend: 'up', color: 'bg-blue-500' },
  { name: 'Social Media', leads: 89, conversion: 18.2, roi: 250, costPerLead: 62, trend: 'up', color: 'bg-purple-500' },
  { name: 'Referral', leads: 67, conversion: 42.3, roi: 480, costPerLead: 0, trend: 'up', color: 'bg-emerald-500' },
  { name: 'Cold Call', leads: 41, conversion: 12.5, roi: 150, costPerLead: 85, trend: 'down', color: 'bg-orange-500' }
];

const teamMembers: TeamMember[] = [
  { rank: 1, name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg', totalLeads: 87, converted: 23, inProgress: 45, conversionRate: 26.4, revenue: 450000, activityScore: 94 },
  { rank: 2, name: 'Mike Chen', avatar: '/avatars/mike.jpg', totalLeads: 76, converted: 18, inProgress: 38, conversionRate: 23.7, revenue: 380000, activityScore: 88 },
  { rank: 3, name: 'Lisa Wang', avatar: '/avatars/lisa.jpg', totalLeads: 69, converted: 15, inProgress: 32, conversionRate: 21.7, revenue: 320000, activityScore: 82 },
  { rank: 4, name: 'David Brown', avatar: '/avatars/david.jpg', totalLeads: 58, converted: 12, inProgress: 28, conversionRate: 20.7, revenue: 280000, activityScore: 76 }
];

const recentActivities: Activity[] = [
  { id: '1', type: 'call', description: 'Call completed with Acme Corp', leadName: 'Acme Corporation', user: 'Sarah Johnson', userAvatar: '/avatars/sarah.jpg', timestamp: '5 minutes ago', icon: Phone, iconColor: 'text-green-600' },
  { id: '2', type: 'email', description: 'Proposal sent to TechStart Inc', leadName: 'TechStart Inc', user: 'Mike Chen', userAvatar: '/avatars/mike.jpg', timestamp: '15 minutes ago', icon: Mail, iconColor: 'text-blue-600' },
  { id: '3', type: 'status', description: 'Status changed to Qualified', leadName: 'Global Industries', user: 'Lisa Wang', userAvatar: '/avatars/lisa.jpg', timestamp: '1 hour ago', icon: Activity, iconColor: 'text-purple-600' },
  { id: '4', type: 'meeting', description: 'Meeting scheduled for tomorrow', leadName: 'Creative Solutions', user: 'David Brown', userAvatar: '/avatars/david.jpg', timestamp: '2 hours ago', icon: Calendar, iconColor: 'text-orange-600' },
  { id: '5', type: 'whatsapp', description: 'WhatsApp message sent', leadName: 'Tech Innovations', user: 'Sarah Johnson', userAvatar: '/avatars/sarah.jpg', timestamp: '3 hours ago', icon: MessageSquare, iconColor: 'text-green-600' }
];

const aiInsights: InsightItem[] = [
  { priority: 'high', title: 'Overdue Follow-ups', description: '8 leads need immediate attention', action: 'View leads', count: 8 },
  { priority: 'high', title: 'Expiring Proposals', description: '3 proposals expire today', action: 'Review proposals', count: 3 },
  { priority: 'medium', title: 'Hot Leads Ready', description: '5 leads showing high engagement', action: 'Contact now', count: 5 },
  { priority: 'low', title: 'Re-engagement Opportunities', description: '12 cold leads can be re-engaged', action: 'Start campaign', count: 12 }
];

// Helper functions
function getAlertColor(alert?: 'success' | 'warning' | 'error') {
  switch (alert) {
    case 'success': return 'border-emerald-200 bg-emerald-50';
    case 'warning': return 'border-amber-200 bg-amber-50';
    case 'error': return 'border-red-200 bg-red-50';
    default: return '';
  }
}

function getPriorityColor(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700 border-red-200';
    case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
  }
}

export function LeadDashboard() {
  const [dateRange, setDateRange] = useState('this-month');
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<string | null>(null);

  // Calculate funnel metrics
  const funnelMetrics = useMemo(() => {
    const totalValue = funnelStages.reduce((sum, stage) => sum + stage.value, 0);
    const totalLeads = funnelStages[0].count;
    const wonLeads = funnelStages.find(s => s.name === 'Won')?.count || 0;
    const overallConversion = (wonLeads / totalLeads) * 100;
    
    return { totalValue, totalLeads, wonLeads, overallConversion };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Management Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Track, analyze, and optimize your sales pipeline</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
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
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI Insights Panel */}
        <Card className="border-gradient bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Insights & Recommendations</CardTitle>
                  <CardDescription>Priority actions for today</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-white">
                Updated 2 min ago
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-lg border bg-white/80 backdrop-blur-sm cursor-pointer transition-all hover:shadow-md",
                    getPriorityColor(insight.priority)
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <p className="text-xs mt-1 opacity-90">{insight.description}</p>
                    </div>
                    {insight.count && (
                      <Badge className="ml-2" variant="secondary">
                        {insight.count}
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" variant="ghost" className="w-full mt-2 text-xs">
                    {insight.action}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpiMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const isPositiveTrend = metric.trend === 'up' && metric.change > 0;
            
            return (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
                  getAlertColor(metric.alert)
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                      <Icon className={cn("h-5 w-5", metric.color)} />
                    </div>
                    <div className={cn(
                      "flex items-center text-xs font-semibold",
                      isPositiveTrend ? "text-emerald-600" : "text-red-600"
                    )}>
                      {isPositiveTrend ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">{metric.title}</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  
                  {metric.alert && (
                    <div className="absolute top-2 right-2">
                      {metric.alert === 'success' && <CheckCircle className="h-3 w-3 text-emerald-500" />}
                      {metric.alert === 'warning' && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                      {metric.alert === 'error' && <AlertCircle className="h-3 w-3 text-red-500" />}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Sales Funnel - 2 columns wide */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Interactive Sales Funnel</CardTitle>
                    <CardDescription>
                      Overall conversion: {funnelMetrics.overallConversion.toFixed(1)}% | 
                      Total value: ${(funnelMetrics.totalValue / 1000000).toFixed(1)}M
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelStages.map((stage, index) => {
                    const Icon = stage.icon;
                    const widthPercentage = (stage.count / funnelStages[0].count) * 100;
                    const isSelected = selectedFunnelStage === stage.name;
                    
                    return (
                      <div
                        key={stage.name}
                        className={cn(
                          "relative cursor-pointer transition-all",
                          isSelected && "scale-105"
                        )}
                        onClick={() => setSelectedFunnelStage(isSelected ? null : stage.name)}
                      >
                        <div className="flex items-center space-x-4">
                          {/* Stage Icon and Name */}
                          <div className="flex items-center space-x-2 w-32">
                            <div className={cn("p-2 rounded-lg", stage.bgColor)}>
                              <Icon className={cn("h-4 w-4", stage.color.replace('bg-', 'text-'))} />
                            </div>
                            <span className="text-sm font-medium">{stage.name}</span>
                          </div>
                          
                          {/* Funnel Bar */}
                          <div className="flex-1">
                            <div className="relative">
                              <div className="h-12 bg-gray-100 rounded-lg overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full flex items-center justify-between px-4 text-white text-sm font-medium transition-all",
                                    stage.color
                                  )}
                                  style={{ width: `${widthPercentage}%` }}
                                >
                                  <span>{stage.count} leads</span>
                                  <span>${(stage.value / 1000000).toFixed(1)}M</span>
                                </div>
                              </div>
                              
                              {/* Conversion Rate */}
                              {index > 0 && (
                                <div className="absolute -top-2 right-0 text-xs text-gray-500">
                                  {stage.conversion}% conversion
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Metrics */}
                          <div className="text-right text-xs text-gray-500 w-20">
                            <div>Avg {stage.avgDays}d</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Source Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Source Performance</CardTitle>
              <CardDescription>ROI and conversion by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadSources.map((source) => (
                  <div key={source.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={cn("w-3 h-3 rounded-full", source.color)} />
                        <span className="text-sm font-medium">{source.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {source.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className="text-xs text-gray-500">{source.leads} leads</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-500">Conversion</span>
                          <span className="font-medium">{source.conversion}%</span>
                        </div>
                        <Progress value={source.conversion} className="h-1.5" />
                      </div>
                      <div className="text-right">
                        <div className="text-gray-500">ROI</div>
                        <div className="font-semibold text-emerald-600">{source.roi}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Performance and Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Team Leaderboard */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Performance Leaderboard</CardTitle>
                <Tabs defaultValue="conversion" className="w-auto">
                  <TabsList className="h-8">
                    <TabsTrigger value="conversion" className="text-xs">Conversion</TabsTrigger>
                    <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
                    <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="w-8 text-center">
                      {member.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />}
                      {member.rank === 2 && <div className="text-lg font-bold text-gray-400">2</div>}
                      {member.rank === 3 && <div className="text-lg font-bold text-orange-600">3</div>}
                      {member.rank > 3 && <div className="text-lg text-gray-400">{member.rank}</div>}
                    </div>
                    
                    {/* Member Info */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{member.totalLeads} leads</span>
                        <span className="text-emerald-600 font-medium">{member.converted} won</span>
                        <span className="text-amber-600">{member.inProgress} active</span>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{member.conversionRate}%</div>
                      <div className="text-xs text-gray-500">${(member.revenue / 1000).toFixed(0)}K</div>
                    </div>
                    
                    {/* Activity Score */}
                    <div className="w-12">
                      <div className="relative w-10 h-10">
                        <svg className="w-10 h-10 transform -rotate-90">
                          <circle
                            cx="20"
                            cy="20"
                            r="16"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="20"
                            cy="20"
                            r="16"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={`${(member.activityScore / 100) * 100.5} 100.5`}
                            className="text-blue-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold">{member.activityScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity Timeline</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg bg-gray-50",
                        activity.iconColor
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{activity.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span className="font-medium">{activity.leadName}</span>
                          <span>•</span>
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                      
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={activity.userAvatar} />
                        <AvatarFallback className="text-xs">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Actions Widget */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Actions</CardTitle>
              <Badge variant="destructive">4 Overdue</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <Badge variant="destructive" className="text-xs">Overdue</Badge>
                </div>
                <p className="text-sm font-medium">Call Acme Corp</p>
                <p className="text-xs text-gray-500 mt-1">Was due 2 hours ago</p>
                <Button size="sm" className="w-full mt-2" variant="destructive">
                  Call Now
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <Mail className="h-4 w-4 text-amber-600" />
                  <Badge variant="outline" className="text-xs bg-amber-100">Today 2PM</Badge>
                </div>
                <p className="text-sm font-medium">Send proposal to TechStart</p>
                <p className="text-xs text-gray-500 mt-1">In 3 hours</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Prepare
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <Badge variant="outline" className="text-xs">Tomorrow</Badge>
                </div>
                <p className="text-sm font-medium">Meeting with Global Industries</p>
                <p className="text-xs text-gray-500 mt-1">Tomorrow at 10 AM</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  View Details
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                  <Badge variant="outline" className="text-xs">This Week</Badge>
                </div>
                <p className="text-sm font-medium">Follow up with 5 leads</p>
                <p className="text-xs text-gray-500 mt-1">By end of week</p>
                <Button size="sm" className="w-full mt-2" variant="outline">
                  Start
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
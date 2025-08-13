import { useState } from 'react';
import { AdvancedFilter, FilterRule } from '@/components/filters/advanced-filter';
import { DASHBOARD_FILTER_FIELDS } from '@/components/filters/filter-fields';
import { LeadFunnelChart, sampleFunnelData } from '@/components/charts/lead-funnel-chart';
import { 
  Plus, 
  Upload, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  FileText,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  const isPositive = trend === 'up';
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
          {Math.abs(change)}% from last month
        </div>
      </CardContent>
    </Card>
  );
}


interface ActivityItemProps {
  type: 'call' | 'email' | 'meeting' | 'note';
  subject: string;
  lead: string;
  user: string;
  time: string;
}

function ActivityItem({ type, subject, lead, user, time }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'note': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'call': return 'text-blue-500';
      case 'email': return 'text-green-500';
      case 'meeting': return 'text-purple-500';
      case 'note': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-full bg-gray-100 ${getIconColor()}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{subject}</p>
        <p className="text-sm text-muted-foreground">Lead: {lead}</p>
        <div className="flex items-center mt-1 text-xs text-muted-foreground">
          <span>{user}</span>
          <span className="mx-2">•</span>
          <span>{time}</span>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function LeadDashboardContent() {
  const [dateRange, setDateRange] = useState('month');
  const [filters, setFilters] = useState<FilterRule[]>([]);
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: FilterRule[]; }[]>([]);

  const handleStageClick = (stage: string) => {
    // Navigate to leads list with the stage filter applied
    const stageFilterUrl = `/leads/list?filter=status&value=${encodeURIComponent(stage)}`;
    
    // In a real application with React Router, you could use:
    // navigate(stageFilterUrl);
    
    // For now, we'll open in the same window
    window.location.href = stageFilterUrl;
    
    console.log(`Navigating to leads filtered by stage: ${stage}`);
  };

  const kpiData = [
    {
      title: 'Total Leads',
      value: '2,847',
      change: 12.5,
      trend: 'up' as const,
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'New Leads This Month',
      value: '248',
      change: 8.2,
      trend: 'up' as const,
      icon: <Plus className="h-4 w-4" />
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: -2.1,
      trend: 'down' as const,
      icon: <Target className="h-4 w-4" />
    },
    {
      title: 'Average Lead Value',
      value: '$12,450',
      change: 15.3,
      trend: 'up' as const,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: 'Hot Leads',
      value: '45',
      change: 6.7,
      trend: 'up' as const,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'Follow-ups Due Today',
      value: '18',
      change: -12.5,
      trend: 'down' as const,
      icon: <Calendar className="h-4 w-4" />
    }
  ];


  const recentActivities = [
    {
      type: 'call' as const,
      subject: 'Follow-up call scheduled',
      lead: 'Acme Corporation',
      user: 'Sarah Johnson',
      time: '2 hours ago'
    },
    {
      type: 'email' as const,
      subject: 'Proposal sent',
      lead: 'TechStart Inc',
      user: 'Mike Chen',
      time: '4 hours ago'
    },
    {
      type: 'meeting' as const,
      subject: 'Site visit completed',
      lead: 'Global Industries',
      user: 'Lisa Wang',
      time: '6 hours ago'
    },
    {
      type: 'note' as const,
      subject: 'Budget requirements updated',
      lead: 'Creative Solutions',
      user: 'David Brown',
      time: '1 day ago'
    }
  ];

  const leadSources = [
    { source: 'Website', count: 45, percentage: 35, color: 'bg-blue-500' },
    { source: 'Referrals', count: 32, percentage: 25, color: 'bg-green-500' },
    { source: 'Social Media', count: 28, percentage: 22, color: 'bg-purple-500' },
    { source: 'Cold Calls', count: 15, percentage: 12, color: 'bg-orange-500' },
    { source: 'Events', count: 8, percentage: 6, color: 'bg-yellow-500' }
  ];

  const teamPerformance = [
    { name: 'Sarah Johnson', leads: 45, conversions: 12, rate: '26.7%', avatar: '/avatars/sarah.jpg' },
    { name: 'Mike Chen', leads: 38, conversions: 9, rate: '23.7%', avatar: '/avatars/mike.jpg' },
    { name: 'Lisa Wang', leads: 42, conversions: 8, rate: '19.0%', avatar: '/avatars/lisa.jpg' },
    { name: 'David Brown', leads: 31, conversions: 6, rate: '19.4%', avatar: '/avatars/david.jpg' }
  ];

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Management Dashboard</h1>
          <p className="text-muted-foreground">Monitor your lead pipeline and team performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Lead
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Search leads, companies, or contacts..." 
          className="max-w-sm"
        />
        <AdvancedFilter
          fields={DASHBOARD_FILTER_FIELDS}
          filters={filters}
          onFiltersChange={setFilters}
          savedFilters={savedFilters}
          onSaveFilter={(name, filterRules) => setSavedFilters(prev => [...prev, { name, filters: filterRules }])}
          onLoadFilter={setFilters}
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 lg:gap-7.5">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
        {/* Lead Funnel Chart */}
        <div className="xl:col-span-2">
          <LeadFunnelChart 
            data={sampleFunnelData}
            onStageClick={handleStageClick}
          />
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest lead interactions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Performance</CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">{source.count} leads</span>
                    <span className="font-medium">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Top performing team members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.leads} leads • {member.conversions} converted</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{member.rate}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
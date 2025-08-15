import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  User,
  UserCheck,
  Award,
  Target,
  Star,
  Trophy,
  Medal,
  Crown,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Handshake,
  DollarSign,
  Percent,
  Hash,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  FileText,
  Briefcase,
  Building,
  MapPin,
  Globe,
  Zap,
  ChevronUp,
  ChevronDown,
  Info,
  AlertTriangle,
  Timer,
  Gauge
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  team: string;
  avatar?: string;
  isActive: boolean;
  startDate: string;
  manager: string;
  location: string;
  timezone: string;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
}

interface PerformanceMetrics {
  userId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  leads: {
    created: number;
    qualified: number;
    converted: number;
    lost: number;
    inProgress: number;
  };
  activities: {
    calls: number;
    emails: number;
    meetings: number;
    tasks: number;
    notes: number;
  };
  revenue: {
    generated: number;
    pipeline: number;
    closed: number;
    target: number;
  };
  quality: {
    leadScore: number;
    responseTime: number; // hours
    followUpRate: number; // percentage
    customerSatisfaction: number; // 1-5 scale
    dataCompleteness: number; // percentage
  };
  productivity: {
    hoursLogged: number;
    tasksCompleted: number;
    goalsAchieved: number;
    efficiency: number; // percentage
  };
  goals: {
    monthly: GoalProgress[];
    quarterly: GoalProgress[];
  };
}

interface GoalProgress {
  id: string;
  name: string;
  target: number;
  achieved: number;
  unit: string;
  deadline: string;
  status: 'on_track' | 'at_risk' | 'behind' | 'completed';
}

interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  topPerformers: number;
  averagePerformance: number;
  totalRevenue: number;
  totalLeads: number;
  conversionRate: number;
  teamEfficiency: number;
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  avatar?: string;
  department: string;
  score: number;
  metric: string;
  value: number;
  change: number;
  rank: number;
  badge?: string;
}

const TeamPerformance: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('performance');

  // Mock data for team members
  const teamMembers: TeamMember[] = [
    {
      id: 'user-001',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      title: 'Senior Sales Manager',
      department: 'Sales',
      team: 'Enterprise Sales',
      isActive: true,
      startDate: '2023-01-15',
      manager: 'John Director',
      location: 'New York, NY',
      timezone: 'EST',
      workingHours: { start: '09:00', end: '17:00', timezone: 'EST' }
    },
    {
      id: 'user-002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      title: 'Sales Representative',
      department: 'Sales',
      team: 'SMB Sales',
      isActive: true,
      startDate: '2023-03-20',
      manager: 'Sarah Wilson',
      location: 'San Francisco, CA',
      timezone: 'PST',
      workingHours: { start: '08:00', end: '16:00', timezone: 'PST' }
    },
    {
      id: 'user-003',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@company.com',
      title: 'Lead Development Representative',
      department: 'Marketing',
      team: 'Lead Generation',
      isActive: true,
      startDate: '2023-06-10',
      manager: 'Mark Marketing',
      location: 'Chicago, IL',
      timezone: 'CST',
      workingHours: { start: '09:00', end: '17:00', timezone: 'CST' }
    },
    {
      id: 'user-004',
      name: 'Alex Turner',
      email: 'alex.turner@company.com',
      title: 'Account Executive',
      department: 'Sales',
      team: 'Enterprise Sales',
      isActive: true,
      startDate: '2022-11-01',
      manager: 'Sarah Wilson',
      location: 'Boston, MA',
      timezone: 'EST',
      workingHours: { start: '08:30', end: '16:30', timezone: 'EST' }
    },
    {
      id: 'user-005',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      title: 'Sales Development Representative',
      department: 'Sales',
      team: 'SMB Sales',
      isActive: false,
      startDate: '2023-08-15',
      manager: 'Mike Chen',
      location: 'Austin, TX',
      timezone: 'CST',
      workingHours: { start: '09:00', end: '17:00', timezone: 'CST' }
    }
  ];

  // Mock performance metrics
  const performanceData: Record<string, PerformanceMetrics> = {
    'user-001': {
      userId: 'user-001',
      period: 'month',
      leads: { created: 145, qualified: 89, converted: 34, lost: 12, inProgress: 43 },
      activities: { calls: 287, emails: 456, meetings: 67, tasks: 123, notes: 234 },
      revenue: { generated: 750000, pipeline: 1200000, closed: 580000, target: 800000 },
      quality: { leadScore: 87, responseTime: 2.5, followUpRate: 92, customerSatisfaction: 4.6, dataCompleteness: 94 },
      productivity: { hoursLogged: 168, tasksCompleted: 89, goalsAchieved: 7, efficiency: 87 },
      goals: {
        monthly: [
          { id: 'goal-1', name: 'Revenue Target', target: 800000, achieved: 750000, unit: '$', deadline: '2024-01-31', status: 'on_track' },
          { id: 'goal-2', name: 'Lead Conversion', target: 40, achieved: 34, unit: 'leads', deadline: '2024-01-31', status: 'at_risk' }
        ],
        quarterly: [
          { id: 'goal-3', name: 'Q1 Pipeline', target: 2000000, achieved: 1200000, unit: '$', deadline: '2024-03-31', status: 'behind' }
        ]
      }
    },
    'user-002': {
      userId: 'user-002',
      period: 'month',
      leads: { created: 98, qualified: 67, converted: 28, lost: 8, inProgress: 31 },
      activities: { calls: 198, emails: 334, meetings: 45, tasks: 89, notes: 167 },
      revenue: { generated: 520000, pipeline: 890000, closed: 420000, target: 600000 },
      quality: { leadScore: 82, responseTime: 3.2, followUpRate: 88, customerSatisfaction: 4.3, dataCompleteness: 89 },
      productivity: { hoursLogged: 164, tasksCompleted: 76, goalsAchieved: 6, efficiency: 82 },
      goals: {
        monthly: [
          { id: 'goal-4', name: 'Revenue Target', target: 600000, achieved: 520000, unit: '$', deadline: '2024-01-31', status: 'on_track' }
        ],
        quarterly: []
      }
    },
    'user-003': {
      userId: 'user-003',
      period: 'month',
      leads: { created: 234, qualified: 156, converted: 0, lost: 23, inProgress: 133 },
      activities: { calls: 445, emails: 678, meetings: 23, tasks: 156, notes: 289 },
      revenue: { generated: 0, pipeline: 345000, closed: 0, target: 0 },
      quality: { leadScore: 78, responseTime: 1.8, followUpRate: 95, customerSatisfaction: 4.1, dataCompleteness: 91 },
      productivity: { hoursLogged: 172, tasksCompleted: 134, goalsAchieved: 8, efficiency: 89 },
      goals: {
        monthly: [
          { id: 'goal-5', name: 'Lead Generation', target: 200, achieved: 234, unit: 'leads', deadline: '2024-01-31', status: 'completed' }
        ],
        quarterly: []
      }
    }
  };

  // Mock team stats
  const teamStats: TeamStats = {
    totalMembers: 5,
    activeMembers: 4,
    topPerformers: 2,
    averagePerformance: 83.4,
    totalRevenue: 1270000,
    totalLeads: 477,
    conversionRate: 13.8,
    teamEfficiency: 86.3
  };

  // Mock leaderboard data
  const leaderboard: LeaderboardEntry[] = [
    {
      userId: 'user-001',
      name: 'Sarah Wilson',
      department: 'Sales',
      score: 94,
      metric: 'Revenue Generated',
      value: 750000,
      change: 12.5,
      rank: 1,
      badge: 'gold'
    },
    {
      userId: 'user-003',
      name: 'Lisa Johnson',
      department: 'Marketing',
      score: 89,
      metric: 'Leads Created',
      value: 234,
      change: 8.2,
      rank: 2,
      badge: 'silver'
    },
    {
      userId: 'user-002',
      name: 'Mike Chen',
      department: 'Sales',
      score: 82,
      metric: 'Conversion Rate',
      value: 28.6,
      change: -2.1,
      rank: 3,
      badge: 'bronze'
    },
    {
      userId: 'user-004',
      name: 'Alex Turner',
      department: 'Sales',
      score: 78,
      metric: 'Pipeline Value',
      value: 680000,
      change: 5.8,
      rank: 4
    }
  ];

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case 'gold': return Trophy;
      case 'silver': return Medal;
      case 'bronze': return Award;
      default: return Star;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'gold': return 'text-yellow-600';
      case 'silver': return 'text-gray-600';
      case 'bronze': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_track': return 'bg-blue-100 text-blue-800';
      case 'at_risk': return 'bg-yellow-100 text-yellow-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || member.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const getOverallPerformance = (userId: string): number => {
    const metrics = performanceData[userId];
    if (!metrics) return 0;
    
    // Calculate weighted performance score
    const conversionRate = (metrics.leads.converted / metrics.leads.qualified) * 100 || 0;
    const revenueAttainment = (metrics.revenue.generated / metrics.revenue.target) * 100 || 0;
    const qualityScore = metrics.quality.leadScore;
    const productivityScore = metrics.productivity.efficiency;
    
    return Math.round((conversionRate * 0.3 + revenueAttainment * 0.4 + qualityScore * 0.2 + productivityScore * 0.1));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Performance</h1>
          <p className="text-muted-foreground">Track and analyze team member performance and productivity</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Team Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Performance</p>
                <p className="text-2xl font-bold">{teamStats.averagePerformance}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+5.2% vs last month</span>
                </div>
              </div>
              <Gauge className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{teamStats.activeMembers}</p>
                <p className="text-xs text-muted-foreground">of {teamStats.totalMembers} total</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${teamStats.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+18.4% vs last month</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{teamStats.conversionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-red-600">-1.2% vs last month</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="individual">Individual Performance</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Overview</CardTitle>
                <CardDescription>Current team composition and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => {
                    const performance = getOverallPerformance(member.id);
                    const metrics = performanceData[member.id];
                    
                    return (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{member.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {member.team}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${member.isActive ? 'text-green-600 border-green-200' : 'text-gray-600 border-gray-200'}`}
                              >
                                {member.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getPerformanceColor(performance)}`}>
                              {performance}%
                            </span>
                            <Progress value={performance} className="w-16 h-2" />
                          </div>
                          {metrics && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {metrics.leads.converted} conversions
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest performing team members this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.slice(0, 3).map((entry) => {
                    const BadgeIcon = getBadgeIcon(entry.badge);
                    const TrendIcon = getTrendIcon(entry.change);
                    
                    return (
                      <div key={entry.userId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-1 rounded-full ${getBadgeColor(entry.badge)}`}>
                            <BadgeIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{entry.name}</p>
                            <p className="text-sm text-muted-foreground">{entry.metric}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">
                            {entry.metric.includes('Revenue') || entry.metric.includes('Pipeline') 
                              ? `$${entry.value.toLocaleString()}` 
                              : entry.metric.includes('Rate') 
                                ? `${entry.value}%` 
                                : entry.value.toLocaleString()
                            }
                          </p>
                          <div className="flex items-center gap-1">
                            <TrendIcon className={`h-3 w-3 ${getTrendColor(entry.change)}`} />
                            <span className={`text-xs ${getTrendColor(entry.change)}`}>
                              {entry.change > 0 ? '+' : ''}{entry.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Summary</CardTitle>
              <CardDescription>Key metrics and activities from the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,289</p>
                  <p className="text-sm text-muted-foreground">Calls Made</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <Mail className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">2,145</p>
                  <p className="text-sm text-muted-foreground">Emails Sent</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+8%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">178</p>
                  <p className="text-sm text-muted-foreground">Meetings</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3 text-red-600" />
                    <span className="text-xs text-red-600">-3%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <Handshake className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold">62</p>
                  <p className="text-sm text-muted-foreground">Deals Closed</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">+15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Leaderboard</CardTitle>
                  <CardDescription>Rankings based on overall performance score</CardDescription>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Overall Performance</SelectItem>
                    <SelectItem value="revenue">Revenue Generated</SelectItem>
                    <SelectItem value="leads">Leads Created</SelectItem>
                    <SelectItem value="conversion">Conversion Rate</SelectItem>
                    <SelectItem value="activities">Activities Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => {
                  const BadgeIcon = getBadgeIcon(entry.badge);
                  const TrendIcon = getTrendIcon(entry.change);
                  
                  return (
                    <div key={entry.userId} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-muted-foreground">#{entry.rank}</span>
                          {entry.badge && (
                            <BadgeIcon className={`h-5 w-5 ${getBadgeColor(entry.badge)}`} />
                          )}
                        </div>
                        
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        
                        <div>
                          <p className="font-semibold">{entry.name}</p>
                          <p className="text-sm text-muted-foreground">{entry.department}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">{entry.metric}</p>
                          <p className="font-medium">
                            {entry.metric.includes('Revenue') || entry.metric.includes('Pipeline') 
                              ? `$${entry.value.toLocaleString()}` 
                              : entry.metric.includes('Rate') 
                                ? `${entry.value}%` 
                                : entry.value.toLocaleString()
                            }
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Performance</p>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${getPerformanceColor(entry.score)}`}>
                              {entry.score}%
                            </span>
                            <Progress value={entry.score} className="w-20 h-2" />
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Change</p>
                          <div className="flex items-center gap-1">
                            <TrendIcon className={`h-4 w-4 ${getTrendColor(entry.change)}`} />
                            <span className={`font-medium ${getTrendColor(entry.change)}`}>
                              {entry.change > 0 ? '+' : ''}{entry.change}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="Enterprise Sales">Enterprise Sales</SelectItem>
                <SelectItem value="SMB Sales">SMB Sales</SelectItem>
                <SelectItem value="Lead Generation">Lead Generation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Individual Performance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMembers.map((member) => {
              const metrics = performanceData[member.id];
              const performance = getOverallPerformance(member.id);
              
              if (!metrics) return null;
              
              return (
                <Card key={member.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.title} • {member.team}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getPerformanceColor(performance)}>
                        {performance}% Performance
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Target className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                        <p className="text-sm text-muted-foreground">Leads Converted</p>
                        <p className="text-xl font-bold">{metrics.leads.converted}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-500 mx-auto mb-1" />
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-xl font-bold">${(metrics.revenue.generated / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                    
                    {/* Quality Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Lead Quality Score</span>
                        <div className="flex items-center gap-2">
                          <Progress value={metrics.quality.leadScore} className="w-20 h-2" />
                          <span className="text-sm font-medium">{metrics.quality.leadScore}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">{metrics.quality.responseTime}h avg</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Follow-up Rate</span>
                        <div className="flex items-center gap-2">
                          <Progress value={metrics.quality.followUpRate} className="w-20 h-2" />
                          <span className="text-sm font-medium">{metrics.quality.followUpRate}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Activities */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Calls</p>
                        <p className="font-medium">{metrics.activities.calls}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Emails</p>
                        <p className="font-medium">{metrics.activities.emails}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Meetings</p>
                        <p className="font-medium">{metrics.activities.meetings}</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMembers.map((member) => {
              const metrics = performanceData[member.id];
              if (!metrics) return null;
              
              const allGoals = [...metrics.goals.monthly, ...metrics.goals.quarterly];
              
              return (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.title}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {allGoals.map((goal) => {
                        const progress = Math.min((goal.achieved / goal.target) * 100, 100);
                        
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{goal.name}</span>
                              <Badge className={getGoalStatusColor(goal.status)}>
                                {goal.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span>
                                {goal.unit === '$' 
                                  ? `$${goal.achieved.toLocaleString()}` 
                                  : `${goal.achieved} ${goal.unit}`
                                } of {goal.unit === '$' 
                                  ? `$${goal.target.toLocaleString()}` 
                                  : `${goal.target} ${goal.unit}`
                                }
                              </span>
                              <span>{progress.toFixed(1)}%</span>
                            </div>
                            
                            <Progress value={progress} className="h-2" />
                            
                            <div className="text-xs text-muted-foreground">
                              Deadline: {new Date(goal.deadline).toLocaleDateString()}
                            </div>
                          </div>
                        );
                      })}
                      
                      {allGoals.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground">
                          <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No goals set for this period</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Team performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance trend chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Interactive chart showing team performance metrics over time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Distribution</CardTitle>
                <CardDescription>Breakdown of team activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Activity distribution chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Shows how team time is distributed across different activities
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>Revenue generation by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Revenue performance chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Compare revenue generation across team members
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
                <CardDescription>Data quality and customer satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Average Lead Score</span>
                    <span className="font-medium">82.3%</span>
                  </div>
                  <Progress value={82.3} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">4.3/5.0</span>
                  </div>
                  <Progress value={86} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Data Completeness</span>
                    <span className="font-medium">91.5%</span>
                  </div>
                  <Progress value={91.5} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Follow-up Rate</span>
                    <span className="font-medium">88.7%</span>
                  </div>
                  <Progress value={88.7} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamPerformance;
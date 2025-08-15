import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Activity,
  TrendingUp, 
  TrendingDown, 
  Minus,
  Clock,
  Users,
  Target,
  Award,
  Zap,
  Database,
  Server,
  Gauge,
  BarChart3,
  LineChart,
  PieChart,
  Timer,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
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
  Monitor,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  Download as DownloadIcon,
  Upload,
  MousePointer,
  Eye as EyeIcon,
  ClickPointer,
  UserCheck,
  UserX,
  RotateCcw,
  PlayCircle,
  StopCircle,
  PauseCircle
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: 'percentage' | 'number' | 'seconds' | 'mb' | 'ms' | 'ratio';
  category: 'system' | 'user' | 'engagement' | 'efficiency' | 'quality';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface UserActivity {
  userId: string;
  userName: string;
  role: string;
  lastActive: string;
  sessionsToday: number;
  avgSessionDuration: number;
  actionsPerformed: number;
  featuresUsed: string[];
  efficiency: {
    score: number;
    tasksCompleted: number;
    timeSpent: number;
    productivity: number;
  };
  engagement: {
    score: number;
    pagesViewed: number;
    clickThroughRate: number;
    bounceRate: number;
  };
}

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastChecked: string;
  details: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
}

interface FeatureUsage {
  feature: string;
  category: string;
  users: number;
  sessions: number;
  adoptionRate: number;
  satisfactionScore: number;
  avgTimeSpent: number;
  errorRate: number;
  trend: {
    users: number;
    sessions: number;
    satisfaction: number;
  };
}

const PerformanceDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'system-uptime',
      name: 'System Uptime',
      value: 99.8,
      target: 99.5,
      previousValue: 99.6,
      change: 0.2,
      trend: 'up',
      unit: 'percentage',
      category: 'system',
      icon: Server,
      color: 'text-green-600',
      description: 'Overall system availability and uptime',
      status: 'excellent'
    },
    {
      id: 'response-time',
      name: 'Avg Response Time',
      value: 245,
      target: 300,
      previousValue: 278,
      change: -11.9,
      trend: 'up',
      unit: 'ms',
      category: 'system',
      icon: Timer,
      color: 'text-blue-600',
      description: 'Average API response time across all endpoints',
      status: 'good'
    },
    {
      id: 'active-users',
      name: 'Active Users',
      value: 1247,
      target: 1000,
      previousValue: 1089,
      change: 14.5,
      trend: 'up',
      unit: 'number',
      category: 'user',
      icon: Users,
      color: 'text-purple-600',
      description: 'Number of active users in the last 24 hours',
      status: 'excellent'
    },
    {
      id: 'user-satisfaction',
      name: 'User Satisfaction',
      value: 87.3,
      target: 85.0,
      previousValue: 84.1,
      change: 3.8,
      trend: 'up',
      unit: 'percentage',
      category: 'engagement',
      icon: ThumbsUp,
      color: 'text-emerald-600',
      description: 'Overall user satisfaction score',
      status: 'excellent'
    },
    {
      id: 'feature-adoption',
      name: 'Feature Adoption',
      value: 73.2,
      target: 70.0,
      previousValue: 68.9,
      change: 6.2,
      trend: 'up',
      unit: 'percentage',
      category: 'engagement',
      icon: Target,
      color: 'text-orange-600',
      description: 'Rate of new feature adoption',
      status: 'good'
    },
    {
      id: 'task-completion',
      name: 'Task Completion Rate',
      value: 89.7,
      target: 85.0,
      previousValue: 86.4,
      change: 3.8,
      trend: 'up',
      unit: 'percentage',
      category: 'efficiency',
      icon: CheckCircle,
      color: 'text-indigo-600',
      description: 'Percentage of tasks completed successfully',
      status: 'excellent'
    },
    {
      id: 'error-rate',
      name: 'Error Rate',
      value: 0.3,
      target: 1.0,
      previousValue: 0.5,
      change: -40.0,
      trend: 'up',
      unit: 'percentage',
      category: 'quality',
      icon: XCircle,
      color: 'text-red-600',
      description: 'System error rate across all operations',
      status: 'excellent'
    },
    {
      id: 'data-quality',
      name: 'Data Quality Score',
      value: 94.2,
      target: 90.0,
      previousValue: 91.8,
      change: 2.6,
      trend: 'up',
      unit: 'percentage',
      category: 'quality',
      icon: Database,
      color: 'text-cyan-600',
      description: 'Overall data accuracy and completeness',
      status: 'excellent'
    },
    {
      id: 'automation-efficiency',
      name: 'Automation Efficiency',
      value: 76.8,
      target: 75.0,
      previousValue: 72.3,
      change: 6.2,
      trend: 'up',
      unit: 'percentage',
      category: 'efficiency',
      icon: Zap,
      color: 'text-yellow-600',
      description: 'Efficiency of automated processes',
      status: 'good'
    },
    {
      id: 'cpu-usage',
      name: 'CPU Usage',
      value: 45.2,
      target: 70.0,
      previousValue: 48.9,
      change: -7.6,
      trend: 'up',
      unit: 'percentage',
      category: 'system',
      icon: Cpu,
      color: 'text-gray-600',
      description: 'Average CPU utilization',
      status: 'good'
    }
  ];

  // Mock data for user activity
  const userActivity: UserActivity[] = [
    {
      userId: 'USER001',
      userName: 'Sarah Johnson',
      role: 'Sales Manager',
      lastActive: '2024-01-15T16:30:00Z',
      sessionsToday: 3,
      avgSessionDuration: 142,
      actionsPerformed: 89,
      featuresUsed: ['Dashboard', 'Leads', 'Reports', 'Analytics'],
      efficiency: {
        score: 94.5,
        tasksCompleted: 23,
        timeSpent: 387,
        productivity: 91.2
      },
      engagement: {
        score: 87.3,
        pagesViewed: 45,
        clickThroughRate: 23.4,
        bounceRate: 12.1
      }
    },
    {
      userId: 'USER002',
      userName: 'Mike Chen',
      role: 'Lead Developer',
      lastActive: '2024-01-15T16:45:00Z',
      sessionsToday: 2,
      avgSessionDuration: 198,
      actionsPerformed: 156,
      featuresUsed: ['Dashboard', 'Automation', 'Settings', 'Analytics'],
      efficiency: {
        score: 89.7,
        tasksCompleted: 31,
        timeSpent: 423,
        productivity: 88.4
      },
      engagement: {
        score: 92.1,
        pagesViewed: 67,
        clickThroughRate: 34.2,
        bounceRate: 8.7
      }
    },
    {
      userId: 'USER003',
      userName: 'Lisa Wang',
      role: 'Marketing Specialist',
      lastActive: '2024-01-15T15:20:00Z',
      sessionsToday: 4,
      avgSessionDuration: 98,
      actionsPerformed: 67,
      featuresUsed: ['Campaigns', 'Analytics', 'Reports'],
      efficiency: {
        score: 82.1,
        tasksCompleted: 18,
        timeSpent: 298,
        productivity: 79.8
      },
      engagement: {
        score: 79.5,
        pagesViewed: 34,
        clickThroughRate: 19.8,
        bounceRate: 15.3
      }
    }
  ];

  // Mock data for system health
  const systemHealth: SystemHealth[] = [
    {
      component: 'Web Server',
      status: 'healthy',
      uptime: 99.8,
      responseTime: 234,
      errorRate: 0.2,
      lastChecked: '2024-01-15T16:45:00Z',
      details: {
        cpu: 42.3,
        memory: 67.8,
        disk: 34.5,
        network: 23.1
      }
    },
    {
      component: 'Database',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 89,
      errorRate: 0.1,
      lastChecked: '2024-01-15T16:45:00Z',
      details: {
        cpu: 38.7,
        memory: 78.2,
        disk: 45.6,
        network: 19.4
      }
    },
    {
      component: 'API Gateway',
      status: 'warning',
      uptime: 98.9,
      responseTime: 456,
      errorRate: 0.8,
      lastChecked: '2024-01-15T16:44:00Z',
      details: {
        cpu: 72.1,
        memory: 89.3,
        disk: 23.4,
        network: 67.8
      }
    },
    {
      component: 'Email Service',
      status: 'healthy',
      uptime: 99.7,
      responseTime: 123,
      errorRate: 0.3,
      lastChecked: '2024-01-15T16:45:00Z',
      details: {
        cpu: 28.9,
        memory: 45.6,
        disk: 12.3,
        network: 34.7
      }
    }
  ];

  // Mock data for feature usage
  const featureUsage: FeatureUsage[] = [
    {
      feature: 'Lead Management',
      category: 'Core',
      users: 847,
      sessions: 3421,
      adoptionRate: 89.3,
      satisfactionScore: 4.6,
      avgTimeSpent: 23.4,
      errorRate: 0.2,
      trend: {
        users: 12.3,
        sessions: 18.7,
        satisfaction: 0.3
      }
    },
    {
      feature: 'Automation Workflows',
      category: 'Advanced',
      users: 623,
      sessions: 1876,
      adoptionRate: 65.7,
      satisfactionScore: 4.4,
      avgTimeSpent: 31.2,
      errorRate: 0.5,
      trend: {
        users: 28.9,
        sessions: 34.2,
        satisfaction: 0.2
      }
    },
    {
      feature: 'Analytics Dashboard',
      category: 'Reporting',
      users: 789,
      sessions: 2134,
      adoptionRate: 83.2,
      satisfactionScore: 4.5,
      avgTimeSpent: 18.7,
      errorRate: 0.1,
      trend: {
        users: 15.6,
        sessions: 22.1,
        satisfaction: 0.1
      }
    },
    {
      feature: 'Communication Hub',
      category: 'Communication',
      users: 567,
      sessions: 1432,
      adoptionRate: 59.8,
      satisfactionScore: 4.2,
      avgTimeSpent: 16.9,
      errorRate: 0.7,
      trend: {
        users: 8.4,
        sessions: 12.7,
        satisfaction: -0.1
      }
    }
  ];

  const formatValue = (value: number, unit: string): string => {
    switch (unit) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'seconds':
        return `${value.toFixed(1)}s`;
      case 'ms':
        return `${value.toFixed(0)}ms`;
      case 'mb':
        return `${value.toFixed(1)}MB`;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getHealthStatusBadge = (status: string) => {
    const configs = {
      healthy: { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      warning: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      critical: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      offline: { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' }
    };
    return configs[status as keyof typeof configs] || configs.offline;
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
          <h1 className="text-3xl font-bold">Performance Dashboard</h1>
          <p className="text-muted-foreground">System performance, user activity, and operational metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="features">Feature Usage</TabsTrigger>
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
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend, metric.change)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(metric.status)}`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
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
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend, metric.change)}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(metric.status)}`}
                        >
                          {metric.status}
                        </Badge>
                      </div>
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

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-green-500" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">245ms</div>
                    <p className="text-xs text-muted-foreground">Response Time</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">0.3%</div>
                    <p className="text-xs text-muted-foreground">Error Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
                  <p className="text-sm text-muted-foreground">Active Users (24h)</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">87.3%</div>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">73.2%</div>
                    <p className="text-xs text-muted-foreground">Feature Adoption</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">89.7%</div>
                  <p className="text-sm text-muted-foreground">Task Completion</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">76.8%</div>
                    <p className="text-xs text-muted-foreground">Automation Efficiency</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold">94.2%</div>
                    <p className="text-xs text-muted-foreground">Data Quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Health Monitoring</CardTitle>
              <CardDescription>
                Real-time monitoring of all system components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemHealth.map((component) => {
                  const statusConfig = getHealthStatusBadge(component.status);
                  
                  return (
                    <Card key={component.component} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">{component.component}</h3>
                          <Badge className={statusConfig.className}>
                            {component.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-2xl font-bold text-green-600">{component.uptime.toFixed(1)}%</p>
                            <p className="text-sm text-muted-foreground">Uptime</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{component.responseTime}ms</p>
                            <p className="text-sm text-muted-foreground">Response Time</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>CPU Usage</span>
                              <span className="font-medium">{component.details.cpu.toFixed(1)}%</span>
                            </div>
                            <Progress value={component.details.cpu} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Memory Usage</span>
                              <span className="font-medium">{component.details.memory.toFixed(1)}%</span>
                            </div>
                            <Progress value={component.details.memory} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Disk Usage</span>
                              <span className="font-medium">{component.details.disk.toFixed(1)}%</span>
                            </div>
                            <Progress value={component.details.disk} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t mt-4">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Error Rate: {component.errorRate.toFixed(1)}%</span>
                            <span>Last checked: {new Date(component.lastChecked).toLocaleTimeString()}</span>
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

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Analysis</CardTitle>
              <CardDescription>
                Detailed user behavior and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Sessions Today</th>
                      <th className="text-left py-3 px-4 font-medium">Avg Session</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                      <th className="text-left py-3 px-4 font-medium">Efficiency Score</th>
                      <th className="text-left py-3 px-4 font-medium">Engagement Score</th>
                      <th className="text-left py-3 px-4 font-medium">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userActivity.map((user) => (
                      <tr key={user.userId} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{user.userName}</p>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{user.sessionsToday}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{user.avgSessionDuration}m</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{user.actionsPerformed}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={user.efficiency.score} className="w-16 h-2" />
                            <span className="font-medium text-green-600">{user.efficiency.score.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={user.engagement.score} className="w-16 h-2" />
                            <span className="font-medium text-blue-600">{user.engagement.score.toFixed(1)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{new Date(user.lastActive).toLocaleTimeString()}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Analytics</CardTitle>
              <CardDescription>
                Analysis of feature adoption and user satisfaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featureUsage.map((feature) => (
                  <Card key={feature.feature} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{feature.feature}</h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {feature.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{feature.users}</p>
                          <p className="text-sm text-muted-foreground">Active Users</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Adoption Rate</span>
                            <span className="font-medium">{feature.adoptionRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={feature.adoptionRate} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-lg font-bold">{feature.sessions.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Sessions</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold">{feature.satisfactionScore.toFixed(1)}/5</p>
                            <p className="text-xs text-muted-foreground">Satisfaction</p>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Avg Time Spent</span>
                            <span className="font-medium">{feature.avgTimeSpent}m</span>
                          </div>
                          <div className="flex justify-between text-sm mt-1">
                            <span>Error Rate</span>
                            <span className={`font-medium ${feature.errorRate > 0.5 ? 'text-red-600' : 'text-green-600'}`}>
                              {feature.errorRate.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
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
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="efficiency">Efficiency</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Detailed Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Metrics</CardTitle>
              <CardDescription>
                Complete performance metrics with targets and trends
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
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Change</th>
                      <th className="text-left py-3 px-4 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMetrics.map((metric) => {
                      const Icon = metric.icon;
                      const progressPercentage = Math.min((metric.value / metric.target) * 100, 100);
                      
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
                            <Badge 
                              variant="outline" 
                              className={`${getStatusColor(metric.status)}`}
                            >
                              {metric.status}
                            </Badge>
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

export default PerformanceDashboard;
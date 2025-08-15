import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Server,
  Database,
  Globe,
  Clock,
  Cpu,
  HardDrive,
  Memory,
  Network,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Settings,
  Filter,
  Search,
  Calendar,
  Timer,
  Users,
  Eye,
  MoreVertical,
  Play,
  Pause,
  Square,
  Gauge,
  LineChart,
  PieChart,
  Target,
  Flame,
  Shield,
  Wifi,
  HelpCircle
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  category: 'system' | 'database' | 'application' | 'network' | 'user';
  value: number;
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  lastUpdated: string;
  historicalData: number[];
}

interface PerformanceAlert {
  id: string;
  metricId: string;
  metricName: string;
  level: 'warning' | 'critical';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  resolvedAt?: string;
  details: {
    currentValue: number;
    threshold: number;
    duration: string;
  };
}

interface SystemLoad {
  id: string;
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  activeUsers: number;
  responseTime: number;
}

interface PerformanceReport {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  metrics: string[];
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
  lastGenerated?: string;
  status: 'active' | 'paused' | 'error';
}

const PerformanceMonitoring: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [alertFilter, setAlertFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Mock performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'cpu-usage',
      name: 'CPU Usage',
      category: 'system',
      value: 68.5,
      unit: '%',
      threshold: { warning: 70, critical: 85 },
      status: 'good',
      trend: 'up',
      trendPercentage: 5.2,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [65, 67, 64, 68, 69, 66, 68, 70, 68]
    },
    {
      id: 'memory-usage',
      name: 'Memory Usage',
      category: 'system',
      value: 84.2,
      unit: '%',
      threshold: { warning: 80, critical: 90 },
      status: 'warning',
      trend: 'up',
      trendPercentage: 8.1,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [78, 80, 79, 82, 84, 83, 85, 84, 84]
    },
    {
      id: 'disk-usage',
      name: 'Disk Usage',
      category: 'system',
      value: 72.8,
      unit: '%',
      threshold: { warning: 80, critical: 90 },
      status: 'good',
      trend: 'stable',
      trendPercentage: 0.8,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [72, 73, 72, 73, 72, 73, 72, 73, 73]
    },
    {
      id: 'response-time',
      name: 'Average Response Time',
      category: 'application',
      value: 245,
      unit: 'ms',
      threshold: { warning: 500, critical: 1000 },
      status: 'good',
      trend: 'down',
      trendPercentage: -12.5,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [280, 275, 260, 250, 245, 240, 235, 245, 245]
    },
    {
      id: 'db-connections',
      name: 'Database Connections',
      category: 'database',
      value: 45,
      unit: 'connections',
      threshold: { warning: 80, critical: 95 },
      status: 'good',
      trend: 'stable',
      trendPercentage: 2.3,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [42, 44, 43, 45, 46, 44, 45, 43, 45]
    },
    {
      id: 'db-query-time',
      name: 'DB Query Time',
      category: 'database',
      value: 125,
      unit: 'ms',
      threshold: { warning: 200, critical: 500 },
      status: 'good',
      trend: 'down',
      trendPercentage: -8.1,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [135, 130, 128, 125, 120, 125, 122, 125, 125]
    },
    {
      id: 'active-users',
      name: 'Active Users',
      category: 'user',
      value: 1247,
      unit: 'users',
      threshold: { warning: 2000, critical: 2500 },
      status: 'good',
      trend: 'up',
      trendPercentage: 15.2,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [1080, 1120, 1180, 1220, 1200, 1240, 1250, 1247, 1247]
    },
    {
      id: 'error-rate',
      name: 'Error Rate',
      category: 'application',
      value: 0.85,
      unit: '%',
      threshold: { warning: 2, critical: 5 },
      status: 'good',
      trend: 'stable',
      trendPercentage: 0.1,
      lastUpdated: '2024-01-18T10:45:00Z',
      historicalData: [0.9, 0.8, 0.85, 0.9, 0.8, 0.85, 0.9, 0.85, 0.85]
    }
  ];

  // Mock performance alerts
  const performanceAlerts: PerformanceAlert[] = [
    {
      id: 'alert-001',
      metricId: 'memory-usage',
      metricName: 'Memory Usage',
      level: 'warning',
      message: 'Memory usage has exceeded warning threshold',
      timestamp: '2024-01-18T10:30:00Z',
      acknowledged: false,
      details: {
        currentValue: 84.2,
        threshold: 80,
        duration: '15 minutes'
      }
    },
    {
      id: 'alert-002',
      metricId: 'cpu-usage',
      metricName: 'CPU Usage',
      level: 'critical',
      message: 'CPU usage spike detected',
      timestamp: '2024-01-18T09:45:00Z',
      acknowledged: true,
      acknowledgedBy: 'admin@company.com',
      resolvedAt: '2024-01-18T10:15:00Z',
      details: {
        currentValue: 88.5,
        threshold: 85,
        duration: '8 minutes'
      }
    },
    {
      id: 'alert-003',
      metricId: 'response-time',
      metricName: 'Response Time',
      level: 'warning',
      message: 'Response time degradation detected',
      timestamp: '2024-01-18T08:20:00Z',
      acknowledged: true,
      acknowledgedBy: 'ops@company.com',
      resolvedAt: '2024-01-18T08:45:00Z',
      details: {
        currentValue: 750,
        threshold: 500,
        duration: '25 minutes'
      }
    }
  ];

  // Mock system load data
  const systemLoadData: SystemLoad[] = [
    {
      id: 'load-001',
      timestamp: '2024-01-18T10:00:00Z',
      cpu: 68.5,
      memory: 84.2,
      disk: 72.8,
      network: 34.5,
      activeUsers: 1247,
      responseTime: 245
    },
    {
      id: 'load-002',
      timestamp: '2024-01-18T09:00:00Z',
      cpu: 65.2,
      memory: 82.1,
      disk: 72.5,
      network: 32.8,
      activeUsers: 1180,
      responseTime: 235
    }
  ];

  // Mock performance reports
  const performanceReports: PerformanceReport[] = [
    {
      id: 'report-001',
      name: 'Daily System Performance',
      type: 'daily',
      metrics: ['cpu-usage', 'memory-usage', 'response-time'],
      schedule: {
        frequency: 'daily',
        time: '08:00',
        recipients: ['admin@company.com', 'ops@company.com']
      },
      lastGenerated: '2024-01-18T08:00:00Z',
      status: 'active'
    },
    {
      id: 'report-002',
      name: 'Weekly Performance Summary',
      type: 'weekly',
      metrics: ['cpu-usage', 'memory-usage', 'disk-usage', 'db-connections', 'active-users'],
      schedule: {
        frequency: 'weekly',
        time: '09:00',
        recipients: ['management@company.com']
      },
      lastGenerated: '2024-01-15T09:00:00Z',
      status: 'active'
    }
  ];

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'system': return Server;
      case 'database': return Database;
      case 'application': return Globe;
      case 'network': return Network;
      case 'user': return Users;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Activity;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
  };

  const handleResolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
  };

  const handleRefresh = () => {
    console.log('Refreshing performance data');
  };

  const exportPerformanceData = () => {
    console.log('Exporting performance data');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Monitoring</h1>
          <p className="text-muted-foreground mt-2">
            Monitor system performance, track metrics, and manage alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label>Auto Refresh</Label>
          </div>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportPerformanceData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {performanceMetrics.slice(0, 4).map((metric) => {
              const MetricIcon = getMetricIcon(metric.category);
              const TrendIcon = getTrendIcon(metric.trend);
              
              return (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <MetricIcon className="h-8 w-8 text-blue-600" />
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.name}</p>
                      <p className="text-2xl font-bold">
                        {metric.value}{metric.unit}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendIcon className={`h-3 w-3 ${getTrendColor(metric.trend)}`} />
                        <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                          {metric.trendPercentage}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* System Load Chart */}
          <Card>
            <CardHeader>
              <CardTitle>System Load Overview</CardTitle>
              <CardDescription>
                Real-time system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Performance charts would be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Latest performance alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {performanceAlerts.slice(0, 3).map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.level === 'critical' ? 'border-l-red-500 bg-red-50' : 
                      'border-l-orange-500 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{alert.metricName}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(alert.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={alert.level === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                          {alert.level}
                        </Badge>
                        {alert.acknowledged ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Detailed view of all performance metrics and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search metrics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="system">System</option>
                  <option value="database">Database</option>
                  <option value="application">Application</option>
                  <option value="network">Network</option>
                  <option value="user">User</option>
                </select>
              </div>

              {/* Metrics List */}
              <div className="space-y-4">
                {performanceMetrics.map((metric) => {
                  const MetricIcon = getMetricIcon(metric.category);
                  const TrendIcon = getTrendIcon(metric.trend);
                  
                  return (
                    <Card key={metric.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <MetricIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            
                            <div>
                              <h3 className="font-semibold">{metric.name}</h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                {metric.category} metric
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                {metric.value}{metric.unit}
                              </p>
                              <div className="flex items-center gap-1 justify-end">
                                <TrendIcon className={`h-3 w-3 ${getTrendColor(metric.trend)}`} />
                                <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                                  {metric.trendPercentage}%
                                </span>
                              </div>
                            </div>

                            <div className="text-right text-sm">
                              <p className="text-muted-foreground">Thresholds</p>
                              <p>Warning: {metric.threshold.warning}{metric.unit}</p>
                              <p>Critical: {metric.threshold.critical}{metric.unit}</p>
                            </div>

                            <Badge className={getStatusColor(metric.status)}>
                              {metric.status}
                            </Badge>

                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Mini Chart */}
                        <div className="mt-4 h-16 flex items-end gap-1">
                          {metric.historicalData.map((value, index) => (
                            <div
                              key={index}
                              className="flex-1 bg-blue-200 rounded-t"
                              style={{ height: `${(value / Math.max(...metric.historicalData)) * 100}%` }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Alerts</CardTitle>
              <CardDescription>
                Manage and respond to performance alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <select
                  value={alertFilter}
                  onChange={(e) => setAlertFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Alerts</option>
                  <option value="unacknowledged">Unacknowledged</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {performanceAlerts.map((alert) => (
                  <Card 
                    key={alert.id}
                    className={`border-l-4 ${
                      alert.level === 'critical' ? 'border-l-red-500' : 'border-l-orange-500'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${
                            alert.level === 'critical' ? 'bg-red-100' : 'bg-orange-100'
                          }`}>
                            <AlertTriangle className={`h-6 w-6 ${
                              alert.level === 'critical' ? 'text-red-600' : 'text-orange-600'
                            }`} />
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-semibold">{alert.metricName}</h3>
                              <p className="text-sm text-muted-foreground">{alert.message}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Current Value</p>
                                <p className="text-muted-foreground">
                                  {alert.details.currentValue}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Threshold</p>
                                <p className="text-muted-foreground">
                                  {alert.details.threshold}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Duration</p>
                                <p className="text-muted-foreground">
                                  {alert.details.duration}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDate(alert.timestamp)}</span>
                              </div>
                              {alert.acknowledged && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  <span>Acknowledged by {alert.acknowledgedBy}</span>
                                </div>
                              )}
                              {alert.resolvedAt && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  <span>Resolved at {formatDate(alert.resolvedAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={alert.level === 'critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                            {alert.level}
                          </Badge>
                          
                          {!alert.acknowledged && (
                            <Button 
                              size="sm" 
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Acknowledge
                            </Button>
                          )}
                          
                          {alert.acknowledged && !alert.resolvedAt && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Resolve
                            </Button>
                          )}

                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>
                Scheduled performance reports and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{report.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">
                            {report.type} report • {report.metrics.length} metrics
                          </p>
                          {report.lastGenerated && (
                            <p className="text-xs text-muted-foreground">
                              Last generated: {formatDate(report.lastGenerated)}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge className={report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {report.status}
                          </Badge>
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Generate
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
                            </Button>
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

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh performance data
                    </p>
                  </div>
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>

                <div>
                  <Label>Refresh Interval (seconds)</Label>
                  <Input
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    min="10"
                    max="300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email alerts for critical issues
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Browser push notifications for alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMonitoring;
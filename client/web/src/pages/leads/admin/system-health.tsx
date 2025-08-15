import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Cpu,
  MemoryStick,
  HardDrive,
  Database,
  Server,
  Globe,
  Wifi,
  Network,
  Monitor,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  RefreshCw,
  Download,
  Settings,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Search,
  Filter,
  Calendar,
  Timer,
  Target,
  Shield,
  Lock,
  Key,
  Users,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  FileText,
  Archive,
  Trash2,
  Edit,
  Copy,
  Plus,
  MoreVertical,
  ExternalLink,
  Link2,
  Router,
  Smartphone,
  Tablet,
  MousePointer,
  Keyboard,
  Headphones,
  Webcam,
  Printer,
  UsbIcon,
  HelpCircle,
  AlertCircle,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
  Battery,
  Power,
  PowerOff
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  category: 'performance' | 'resource' | 'network' | 'security' | 'database' | 'application';
  value: number;
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  history: Array<{ timestamp: string; value: number }>;
}

interface ServiceStatus {
  id: string;
  name: string;
  type: 'core' | 'database' | 'cache' | 'queue' | 'external' | 'monitoring';
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  uptime: number;
  lastRestart: string;
  version: string;
  port?: number;
  url?: string;
  healthCheck: {
    enabled: boolean;
    endpoint?: string;
    interval: number;
    timeout: number;
    lastCheck: string;
    responseTime: number;
  };
  dependencies: string[];
  metrics: {
    requests: number;
    errors: number;
    avgResponseTime: number;
    memory: number;
    cpu: number;
  };
}

interface SystemAlert {
  id: string;
  type: 'performance' | 'resource' | 'service' | 'security' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  component: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  impact: 'none' | 'low' | 'medium' | 'high';
  resolvedAt?: string;
  resolution?: string;
  assignedTo?: string;
  metadata: Record<string, any>;
  recommendations: string[];
}

interface SystemInfo {
  hostname: string;
  platform: string;
  architecture: string;
  nodeVersion: string;
  uptime: number;
  loadAverage: number[];
  totalMemory: number;
  freeMemory: number;
  cpuCount: number;
  timezone: string;
  environment: string;
  buildVersion: string;
  deploymentDate: string;
}

interface HealthStats {
  overallScore: number;
  activeAlerts: number;
  servicesRunning: number;
  totalServices: number;
  avgResponseTime: number;
  uptime: number;
  lastIncident: string;
  maintenanceWindow: string;
}

const SystemHealth: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [alertFilter, setAlertFilter] = useState('all');
  const [showResolved, setShowResolved] = useState(false);

  // Mock system metrics
  const systemMetrics: SystemMetric[] = [
    {
      id: 'cpu-usage',
      name: 'CPU Usage',
      category: 'performance',
      value: 68.5,
      unit: '%',
      threshold: { warning: 75, critical: 90 },
      status: 'healthy',
      trend: 'up',
      lastUpdated: '2024-01-18T16:45:00Z',
      history: [
        { timestamp: '2024-01-18T16:40:00Z', value: 65.2 },
        { timestamp: '2024-01-18T16:41:00Z', value: 67.1 },
        { timestamp: '2024-01-18T16:42:00Z', value: 66.8 },
        { timestamp: '2024-01-18T16:43:00Z', value: 68.3 },
        { timestamp: '2024-01-18T16:44:00Z', value: 67.9 },
        { timestamp: '2024-01-18T16:45:00Z', value: 68.5 }
      ]
    },
    {
      id: 'memory-usage',
      name: 'Memory Usage',
      category: 'resource',
      value: 82.3,
      unit: '%',
      threshold: { warning: 80, critical: 95 },
      status: 'warning',
      trend: 'stable',
      lastUpdated: '2024-01-18T16:45:00Z',
      history: [
        { timestamp: '2024-01-18T16:40:00Z', value: 81.5 },
        { timestamp: '2024-01-18T16:41:00Z', value: 82.1 },
        { timestamp: '2024-01-18T16:42:00Z', value: 82.3 },
        { timestamp: '2024-01-18T16:43:00Z', value: 82.0 },
        { timestamp: '2024-01-18T16:44:00Z', value: 82.4 },
        { timestamp: '2024-01-18T16:45:00Z', value: 82.3 }
      ]
    },
    {
      id: 'disk-usage',
      name: 'Disk Usage',
      category: 'resource',
      value: 45.7,
      unit: '%',
      threshold: { warning: 80, critical: 95 },
      status: 'healthy',
      trend: 'up',
      lastUpdated: '2024-01-18T16:45:00Z',
      history: [
        { timestamp: '2024-01-18T16:40:00Z', value: 45.2 },
        { timestamp: '2024-01-18T16:41:00Z', value: 45.4 },
        { timestamp: '2024-01-18T16:42:00Z', value: 45.5 },
        { timestamp: '2024-01-18T16:43:00Z', value: 45.6 },
        { timestamp: '2024-01-18T16:44:00Z', value: 45.7 },
        { timestamp: '2024-01-18T16:45:00Z', value: 45.7 }
      ]
    },
    {
      id: 'response-time',
      name: 'Avg Response Time',
      category: 'performance',
      value: 245,
      unit: 'ms',
      threshold: { warning: 500, critical: 1000 },
      status: 'healthy',
      trend: 'down',
      lastUpdated: '2024-01-18T16:45:00Z',
      history: [
        { timestamp: '2024-01-18T16:40:00Z', value: 267 },
        { timestamp: '2024-01-18T16:41:00Z', value: 251 },
        { timestamp: '2024-01-18T16:42:00Z', value: 248 },
        { timestamp: '2024-01-18T16:43:00Z', value: 246 },
        { timestamp: '2024-01-18T16:44:00Z', value: 247 },
        { timestamp: '2024-01-18T16:45:00Z', value: 245 }
      ]
    },
    {
      id: 'db-connections',
      name: 'Database Connections',
      category: 'database',
      value: 23,
      unit: 'connections',
      threshold: { warning: 80, critical: 95 },
      status: 'healthy',
      trend: 'stable',
      lastUpdated: '2024-01-18T16:45:00Z',
      history: [
        { timestamp: '2024-01-18T16:40:00Z', value: 22 },
        { timestamp: '2024-01-18T16:41:00Z', value: 24 },
        { timestamp: '2024-01-18T16:42:00Z', value: 23 },
        { timestamp: '2024-01-18T16:43:00Z', value: 23 },
        { timestamp: '2024-01-18T16:44:00Z', value: 24 },
        { timestamp: '2024-01-18T16:45:00Z', value: 23 }
      ]
    },
    {
      id: 'active-sessions',
      name: 'Active User Sessions',
      category: 'application',
      value: 156,
      unit: 'sessions',
      threshold: { warning: 500, critical: 800 },
      status: 'healthy',
      trend: 'up',
      lastUpdated: '2024-01-18T16:45:00Z',
      history: [
        { timestamp: '2024-01-18T16:40:00Z', value: 142 },
        { timestamp: '2024-01-18T16:41:00Z', value: 148 },
        { timestamp: '2024-01-18T16:42:00Z', value: 151 },
        { timestamp: '2024-01-18T16:43:00Z', value: 153 },
        { timestamp: '2024-01-18T16:44:00Z', value: 155 },
        { timestamp: '2024-01-18T16:45:00Z', value: 156 }
      ]
    }
  ];

  // Mock service statuses
  const serviceStatuses: ServiceStatus[] = [
    {
      id: 'api-server',
      name: 'API Server',
      type: 'core',
      status: 'running',
      uptime: 99.8,
      lastRestart: '2024-01-15T08:30:00Z',
      version: '2.1.3',
      port: 3000,
      url: 'https://api.company.com',
      healthCheck: {
        enabled: true,
        endpoint: '/health',
        interval: 30,
        timeout: 5,
        lastCheck: '2024-01-18T16:45:00Z',
        responseTime: 45
      },
      dependencies: ['database', 'cache'],
      metrics: {
        requests: 45678,
        errors: 12,
        avgResponseTime: 245,
        memory: 512,
        cpu: 15.3
      }
    },
    {
      id: 'database',
      name: 'PostgreSQL Database',
      type: 'database',
      status: 'running',
      uptime: 99.9,
      lastRestart: '2024-01-10T02:00:00Z',
      version: '15.4',
      port: 5432,
      healthCheck: {
        enabled: true,
        endpoint: '/ping',
        interval: 60,
        timeout: 10,
        lastCheck: '2024-01-18T16:45:00Z',
        responseTime: 12
      },
      dependencies: [],
      metrics: {
        requests: 89234,
        errors: 3,
        avgResponseTime: 23,
        memory: 2048,
        cpu: 8.7
      }
    },
    {
      id: 'redis-cache',
      name: 'Redis Cache',
      type: 'cache',
      status: 'running',
      uptime: 99.7,
      lastRestart: '2024-01-12T14:20:00Z',
      version: '7.2.1',
      port: 6379,
      healthCheck: {
        enabled: true,
        endpoint: '/ping',
        interval: 30,
        timeout: 5,
        lastCheck: '2024-01-18T16:45:00Z',
        responseTime: 8
      },
      dependencies: [],
      metrics: {
        requests: 123456,
        errors: 0,
        avgResponseTime: 5,
        memory: 128,
        cpu: 2.1
      }
    },
    {
      id: 'email-service',
      name: 'Email Service',
      type: 'external',
      status: 'running',
      uptime: 98.5,
      lastRestart: '2024-01-16T10:15:00Z',
      version: '1.8.2',
      healthCheck: {
        enabled: true,
        endpoint: '/status',
        interval: 120,
        timeout: 15,
        lastCheck: '2024-01-18T16:44:00Z',
        responseTime: 234
      },
      dependencies: ['api-server'],
      metrics: {
        requests: 5678,
        errors: 45,
        avgResponseTime: 1200,
        memory: 64,
        cpu: 3.2
      }
    },
    {
      id: 'backup-service',
      name: 'Backup Service',
      type: 'maintenance',
      status: 'error',
      uptime: 87.3,
      lastRestart: '2024-01-18T14:00:00Z',
      version: '1.2.0',
      healthCheck: {
        enabled: true,
        endpoint: '/health',
        interval: 300,
        timeout: 30,
        lastCheck: '2024-01-18T16:40:00Z',
        responseTime: 0
      },
      dependencies: ['database'],
      metrics: {
        requests: 0,
        errors: 15,
        avgResponseTime: 0,
        memory: 0,
        cpu: 0
      }
    }
  ];

  // Mock system alerts
  const systemAlerts: SystemAlert[] = [
    {
      id: 'alert-001',
      type: 'resource',
      severity: 'medium',
      title: 'High Memory Usage',
      description: 'System memory usage has exceeded 80% threshold',
      component: 'System Memory',
      timestamp: '2024-01-18T16:30:00Z',
      status: 'active',
      impact: 'low',
      metadata: {
        currentValue: 82.3,
        threshold: 80,
        trend: 'increasing'
      },
      recommendations: [
        'Review memory-intensive processes',
        'Consider scaling horizontally',
        'Monitor for memory leaks'
      ]
    },
    {
      id: 'alert-002',
      type: 'service',
      severity: 'high',
      title: 'Backup Service Failure',
      description: 'Backup service has stopped responding',
      component: 'Backup Service',
      timestamp: '2024-01-18T14:00:00Z',
      status: 'acknowledged',
      impact: 'medium',
      assignedTo: 'ops-team@company.com',
      metadata: {
        service: 'backup-service',
        errorCode: 'CONNECTION_FAILED',
        lastBackup: '2024-01-17T02:00:00Z'
      },
      recommendations: [
        'Restart backup service',
        'Check database connectivity',
        'Verify backup storage availability'
      ]
    },
    {
      id: 'alert-003',
      type: 'performance',
      severity: 'low',
      title: 'Increased Response Time',
      description: 'API response time has increased by 15%',
      component: 'API Server',
      timestamp: '2024-01-18T15:45:00Z',
      status: 'resolved',
      impact: 'low',
      resolvedAt: '2024-01-18T16:15:00Z',
      resolution: 'Database query optimization applied',
      metadata: {
        previousAvg: 215,
        currentAvg: 245,
        increase: 14.0
      },
      recommendations: [
        'Monitor query performance',
        'Review slow query logs',
        'Consider caching strategies'
      ]
    }
  ];

  // Mock system info
  const systemInfo: SystemInfo = {
    hostname: 'crm-prod-01',
    platform: 'linux',
    architecture: 'x64',
    nodeVersion: '20.11.0',
    uptime: 1234567,
    loadAverage: [1.45, 1.23, 0.98],
    totalMemory: 8589934592,
    freeMemory: 1503238554,
    cpuCount: 4,
    timezone: 'UTC',
    environment: 'production',
    buildVersion: '2.1.3-build.456',
    deploymentDate: '2024-01-15T08:30:00Z'
  };

  // Mock health stats
  const healthStats: HealthStats = {
    overallScore: 87.5,
    activeAlerts: 2,
    servicesRunning: 4,
    totalServices: 5,
    avgResponseTime: 245,
    uptime: 99.2,
    lastIncident: '2024-01-16T14:30:00Z',
    maintenanceWindow: '2024-01-21T02:00:00Z'
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      case 'unknown': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'core': return Server;
      case 'database': return Database;
      case 'cache': return Zap;
      case 'queue': return Activity;
      case 'external': return Globe;
      case 'monitoring': return Monitor;
      default: return Server;
    }
  };

  const formatUptime = (uptime: number): string => {
    return `${uptime.toFixed(1)}%`;
  };

  const formatMemory = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const formatDuration = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const refreshData = () => {
    console.log('Refreshing system health data');
  };

  const acknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
  };

  const resolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
  };

  const restartService = (serviceId: string) => {
    console.log('Restarting service:', serviceId);
  };

  const filteredAlerts = systemAlerts.filter(alert => {
    const matchesFilter = alertFilter === 'all' || alert.type === alertFilter;
    const matchesStatus = showResolved || alert.status !== 'resolved';
    return matchesFilter && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Health</h1>
          <p className="text-muted-foreground mt-2">
            Monitor system performance, resources, and service status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Health Score Card */}
      <Card className={`border-2 ${
        healthStats.overallScore >= 90 ? 'border-green-200 bg-green-50' :
        healthStats.overallScore >= 70 ? 'border-yellow-200 bg-yellow-50' :
        'border-red-200 bg-red-50'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                healthStats.overallScore >= 90 ? 'bg-green-100' :
                healthStats.overallScore >= 70 ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                {healthStats.overallScore >= 90 ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : healthStats.overallScore >= 70 ? (
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">System Health: {healthStats.overallScore}/100</h2>
                <p className={`text-sm font-medium ${
                  healthStats.overallScore >= 90 ? 'text-green-600' :
                  healthStats.overallScore >= 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  Status: {healthStats.overallScore >= 90 ? 'Healthy' : 
                           healthStats.overallScore >= 70 ? 'Warning' : 'Critical'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-lg font-bold">{healthStats.servicesRunning}/{healthStats.totalServices}</p>
                <p className="text-xs text-muted-foreground">Services Running</p>
              </div>
              <div>
                <p className="text-lg font-bold">{healthStats.uptime}%</p>
                <p className="text-xs text-muted-foreground">System Uptime</p>
              </div>
              <div>
                <p className="text-lg font-bold">{healthStats.avgResponseTime}ms</p>
                <p className="text-xs text-muted-foreground">Response Time</p>
              </div>
              <div>
                <p className="text-lg font-bold">{healthStats.activeAlerts}</p>
                <p className="text-xs text-muted-foreground">Active Alerts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="info">System Info</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Key Metrics */}
            {systemMetrics.slice(0, 6).map((metric) => {
              const TrendIcon = getTrendIcon(metric.trend);
              return (
                <Card key={metric.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{metric.name}</h3>
                      <TrendIcon className={`h-4 w-4 ${
                        metric.trend === 'up' ? 'text-red-500' :
                        metric.trend === 'down' ? 'text-green-500' :
                        'text-gray-500'
                      }`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-2xl font-bold ${getMetricColor(metric.status)}`}>
                          {metric.value}{metric.unit}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Updated {formatDate(metric.lastUpdated)}
                        </p>
                      </div>
                      <Badge className={
                        metric.status === 'healthy' ? 'bg-green-100 text-green-800' :
                        metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        metric.status === 'critical' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'healthy' ? 'bg-green-600' :
                            metric.status === 'warning' ? 'bg-yellow-600' :
                            metric.status === 'critical' ? 'bg-red-600' :
                            'bg-gray-600'
                          }`}
                          style={{ width: `${Math.min((metric.value / metric.threshold.critical) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                        <span>Warning: {metric.threshold.warning}</span>
                        <span>Critical: {metric.threshold.critical}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-500' :
                      alert.severity === 'high' ? 'text-orange-500' :
                      alert.severity === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getAlertSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge className={getAlertStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(alert.timestamp)} • {alert.component}
                      </p>
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
              <CardTitle>System Performance Metrics</CardTitle>
              <CardDescription>
                Real-time monitoring of system resources and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {systemMetrics.map((metric) => {
                  const TrendIcon = getTrendIcon(metric.trend);
                  return (
                    <Card key={metric.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{metric.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {metric.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendIcon className={`h-4 w-4 ${
                              metric.trend === 'up' ? 'text-red-500' :
                              metric.trend === 'down' ? 'text-green-500' :
                              'text-gray-500'
                            }`} />
                            <Badge className={
                              metric.status === 'healthy' ? 'bg-green-100 text-green-800' :
                              metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              metric.status === 'critical' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {metric.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className={`text-3xl font-bold ${getMetricColor(metric.status)}`}>
                              {metric.value}
                              <span className="text-lg text-muted-foreground ml-1">
                                {metric.unit}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Last updated: {formatDate(metric.lastUpdated)}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Current Usage</span>
                              <span>{metric.value}{metric.unit}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full transition-all ${
                                  metric.value >= metric.threshold.critical ? 'bg-red-600' :
                                  metric.value >= metric.threshold.warning ? 'bg-yellow-600' :
                                  'bg-green-600'
                                }`}
                                style={{ width: `${Math.min((metric.value / metric.threshold.critical) * 100, 100)}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Warning: {metric.threshold.warning}{metric.unit}</span>
                              <span>Critical: {metric.threshold.critical}{metric.unit}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Recent History:</p>
                            <div className="flex items-end gap-1 h-12">
                              {metric.history.map((point, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-200 rounded-sm flex-1"
                                  style={{ 
                                    height: `${(point.value / metric.threshold.critical) * 100}%`,
                                    minHeight: '2px'
                                  }}
                                  title={`${point.value}${metric.unit} at ${formatDate(point.timestamp)}`}
                                />
                              ))}
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

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>
                Monitor the status and health of all system services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceStatuses.map((service) => {
                  const ServiceIcon = getServiceIcon(service.type);
                  return (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-3 rounded-lg ${
                              service.status === 'running' ? 'bg-green-100' :
                              service.status === 'error' ? 'bg-red-100' :
                              service.status === 'maintenance' ? 'bg-yellow-100' :
                              'bg-gray-100'
                            }`}>
                              <ServiceIcon className={`h-6 w-6 ${
                                service.status === 'running' ? 'text-green-600' :
                                service.status === 'error' ? 'text-red-600' :
                                service.status === 'maintenance' ? 'text-yellow-600' :
                                'text-gray-600'
                              }`} />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{service.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Version {service.version} • Port {service.port}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {service.type}
                                  </Badge>
                                  <Badge className={getServiceStatusColor(service.status)}>
                                    {service.status}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Uptime</p>
                                  <p className="text-muted-foreground">{formatUptime(service.uptime)}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Response Time</p>
                                  <p className="text-muted-foreground">
                                    {service.healthCheck.responseTime}ms
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Requests</p>
                                  <p className="text-muted-foreground">
                                    {service.metrics.requests.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Errors</p>
                                  <p className="text-muted-foreground">
                                    {service.metrics.errors}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Resource Usage</p>
                                  <div className="space-y-1 mt-1">
                                    <div className="flex justify-between">
                                      <span>Memory:</span>
                                      <span>{service.metrics.memory}MB</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>CPU:</span>
                                      <span>{service.metrics.cpu}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="font-medium">Health Check</p>
                                  <div className="space-y-1 mt-1 text-muted-foreground">
                                    <div className="flex justify-between">
                                      <span>Interval:</span>
                                      <span>{service.healthCheck.interval}s</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Last Check:</span>
                                      <span>{formatDate(service.healthCheck.lastCheck)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {service.dependencies.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mb-1">Dependencies</p>
                                  <div className="flex gap-1 flex-wrap">
                                    {service.dependencies.map((dep) => (
                                      <Badge key={dep} variant="outline" className="text-xs">
                                        {dep}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {service.status !== 'running' && (
                              <Button 
                                size="sm"
                                onClick={() => restartService(service.id)}
                              >
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Restart
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
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

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Active alerts and incidents requiring attention
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
                  <option value="all">All Types</option>
                  <option value="performance">Performance</option>
                  <option value="resource">Resource</option>
                  <option value="service">Service</option>
                  <option value="security">Security</option>
                  <option value="maintenance">Maintenance</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showResolved}
                    onChange={(e) => setShowResolved(e.target.checked)}
                  />
                  <span className="text-sm">Show resolved alerts</span>
                </label>
              </div>

              {/* Alerts List */}
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={`border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500' :
                    alert.severity === 'high' ? 'border-l-orange-500' :
                    alert.severity === 'medium' ? 'border-l-yellow-500' :
                    'border-l-blue-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                            alert.severity === 'critical' ? 'text-red-500' :
                            alert.severity === 'high' ? 'text-orange-500' :
                            alert.severity === 'medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{alert.title}</h4>
                              <div className="flex items-center gap-2">
                                <Badge className={getAlertSeverityColor(alert.severity)}>
                                  {alert.severity}
                                </Badge>
                                <Badge className={getAlertStatusColor(alert.status)}>
                                  {alert.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {alert.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                              <div>
                                <p className="font-medium">Component</p>
                                <p className="text-muted-foreground">{alert.component}</p>
                              </div>
                              <div>
                                <p className="font-medium">Impact</p>
                                <p className="text-muted-foreground capitalize">{alert.impact}</p>
                              </div>
                              <div>
                                <p className="font-medium">Assigned To</p>
                                <p className="text-muted-foreground">
                                  {alert.assignedTo || 'Unassigned'}
                                </p>
                              </div>
                            </div>

                            {alert.recommendations.length > 0 && (
                              <div className="mb-3">
                                <p className="text-sm font-medium mb-1">Recommendations:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                  {alert.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Created: {formatDate(alert.timestamp)}</span>
                              {alert.resolvedAt && (
                                <span>Resolved: {formatDate(alert.resolvedAt)}</span>
                              )}
                            </div>

                            {alert.resolution && (
                              <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                                <p className="font-medium text-green-800">Resolution:</p>
                                <p className="text-green-700">{alert.resolution}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {alert.status === 'active' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => acknowledgeAlert(alert.id)}
                              >
                                Acknowledge
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => resolveAlert(alert.id)}
                              >
                                Resolve
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAlerts.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No alerts found</h3>
                  <p className="text-muted-foreground mt-2">
                    No alerts match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Hostname</p>
                      <p className="text-muted-foreground font-mono">{systemInfo.hostname}</p>
                    </div>
                    <div>
                      <p className="font-medium">Environment</p>
                      <p className="text-muted-foreground capitalize">{systemInfo.environment}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Platform</p>
                      <p className="text-muted-foreground">{systemInfo.platform} {systemInfo.architecture}</p>
                    </div>
                    <div>
                      <p className="font-medium">Node.js Version</p>
                      <p className="text-muted-foreground">{systemInfo.nodeVersion}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Build Version</p>
                      <p className="text-muted-foreground font-mono">{systemInfo.buildVersion}</p>
                    </div>
                    <div>
                      <p className="font-medium">Deployed</p>
                      <p className="text-muted-foreground">{formatDate(systemInfo.deploymentDate)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">System Uptime</p>
                      <p className="text-muted-foreground">{formatDuration(systemInfo.uptime)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Timezone</p>
                      <p className="text-muted-foreground">{systemInfo.timezone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">CPU Cores</p>
                      <p className="text-muted-foreground">{systemInfo.cpuCount}</p>
                    </div>
                    <div>
                      <p className="font-medium">Total Memory</p>
                      <p className="text-muted-foreground">{formatMemory(systemInfo.totalMemory)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Load Average</p>
                    <p className="text-muted-foreground">
                      1m: {systemInfo.loadAverage[0].toFixed(2)}, 
                      5m: {systemInfo.loadAverage[1].toFixed(2)}, 
                      15m: {systemInfo.loadAverage[2].toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monitoring Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically refresh data
                    </p>
                  </div>
                  <Switch
                    checked={autoRefresh}
                    onCheckedChange={setAutoRefresh}
                  />
                </div>

                <div>
                  <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                  <Input
                    id="refresh-interval"
                    type="number"
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                    className="mt-1"
                    disabled={!autoRefresh}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Alert Thresholds</Label>
                  
                  <div>
                    <Label htmlFor="cpu-warning">CPU Warning Threshold (%)</Label>
                    <Input
                      id="cpu-warning"
                      type="number"
                      defaultValue="75"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="memory-warning">Memory Warning Threshold (%)</Label>
                    <Input
                      id="memory-warning"
                      type="number"
                      defaultValue="80"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="disk-warning">Disk Warning Threshold (%)</Label>
                    <Input
                      id="disk-warning"
                      type="number"
                      defaultValue="80"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="response-warning">Response Time Warning (ms)</Label>
                    <Input
                      id="response-warning"
                      type="number"
                      defaultValue="500"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemHealth;
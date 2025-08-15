import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield,
  Activity,
  Eye,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Users,
  Monitor,
  Smartphone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Download,
  RefreshCw,
  Settings,
  Database,
  Globe,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  FileText,
  Edit,
  Trash2,
  Copy,
  Plus,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Wifi,
  Server,
  Key,
  ShieldAlert,
  AlertCircle,
  Target,
  Zap,
  Hash,
  Flag,
  Bell,
  Mail,
  Phone,
  Building,
  Navigation,
  MousePointer,
  Keyboard,
  Upload,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface AccessLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  resourceType: 'lead' | 'user' | 'system' | 'report' | 'setting' | 'api';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'success' | 'failed' | 'unauthorized' | 'forbidden' | 'error';
  statusCode: number;
  ipAddress: string;
  userAgent: string;
  location: {
    country: string;
    city: string;
    region: string;
  };
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
  };
  sessionId: string;
  duration?: number;
  changes?: Record<string, any>;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  flags: string[];
  metadata?: {
    referrer?: string;
    endpoint?: string;
    queryParams?: Record<string, any>;
    requestSize?: number;
    responseSize?: number;
  };
}

interface SecurityAlert {
  id: string;
  timestamp: string;
  type: 'suspicious_login' | 'multiple_failures' | 'unusual_access' | 'data_breach' | 'privilege_escalation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  userName?: string;
  description: string;
  details: string;
  ipAddress: string;
  location: string;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
  resolvedAt?: string;
  resolution?: string;
  affectedResources: string[];
  recommendations: string[];
}

interface AccessStats {
  totalLogs: number;
  uniqueUsers: number;
  successfulAccess: number;
  failedAttempts: number;
  suspiciousActivity: number;
  topActions: Array<{ action: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  peakHours: Array<{ hour: number; count: number }>;
  deviceBreakdown: Array<{ type: string; count: number }>;
}

const AccessLogs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('logs');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [showRealTime, setShowRealTime] = useState(false);

  // Mock access logs
  const accessLogs: AccessLog[] = [
    {
      id: 'log-001',
      timestamp: '2024-01-18T16:45:32Z',
      userId: 'user-001',
      userName: 'Sarah Wilson',
      userEmail: 'sarah@company.com',
      userRole: 'Sales Manager',
      action: 'View Lead Details',
      resource: 'Lead Profile',
      resourceId: 'lead-12345',
      resourceType: 'lead',
      method: 'GET',
      status: 'success',
      statusCode: 200,
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: {
        country: 'United States',
        city: 'New York',
        region: 'NY'
      },
      device: {
        type: 'desktop',
        browser: 'Chrome 120.0',
        os: 'Windows 10'
      },
      sessionId: 'sess-abc123',
      duration: 45,
      riskLevel: 'low',
      flags: ['normal_behavior'],
      metadata: {
        endpoint: '/api/leads/12345',
        responseSize: 2048
      }
    },
    {
      id: 'log-002',
      timestamp: '2024-01-18T16:44:18Z',
      userId: 'user-002',
      userName: 'Mike Chen',
      userEmail: 'mike@company.com',
      userRole: 'Sales Rep',
      action: 'Update Lead Status',
      resource: 'Lead Profile',
      resourceId: 'lead-67890',
      resourceType: 'lead',
      method: 'PUT',
      status: 'success',
      statusCode: 200,
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      location: {
        country: 'United States',
        city: 'San Francisco',
        region: 'CA'
      },
      device: {
        type: 'desktop',
        browser: 'Chrome 120.0',
        os: 'macOS 14.0'
      },
      sessionId: 'sess-def456',
      duration: 12,
      changes: {
        status: { from: 'qualified', to: 'proposal' },
        lastModified: '2024-01-18T16:44:18Z'
      },
      riskLevel: 'low',
      flags: ['data_modification'],
      metadata: {
        endpoint: '/api/leads/67890/status',
        requestSize: 128,
        responseSize: 256
      }
    },
    {
      id: 'log-003',
      timestamp: '2024-01-18T16:42:05Z',
      userId: 'user-003',
      userName: 'Alex Turner',
      userEmail: 'alex@company.com',
      userRole: 'Sales Rep',
      action: 'Failed Login Attempt',
      resource: 'Authentication',
      resourceType: 'system',
      method: 'POST',
      status: 'unauthorized',
      statusCode: 401,
      ipAddress: '203.0.113.42',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      location: {
        country: 'United Kingdom',
        city: 'London',
        region: 'England'
      },
      device: {
        type: 'mobile',
        browser: 'Safari 17.0',
        os: 'iOS 17.0'
      },
      sessionId: 'sess-ghi789',
      riskLevel: 'medium',
      flags: ['failed_authentication', 'unusual_location'],
      metadata: {
        endpoint: '/api/auth/login',
        requestSize: 64
      }
    },
    {
      id: 'log-004',
      timestamp: '2024-01-18T16:40:22Z',
      userId: 'user-004',
      userName: 'Lisa Johnson',
      userEmail: 'lisa@company.com',
      userRole: 'Admin',
      action: 'Export Lead Data',
      resource: 'Lead Database',
      resourceType: 'report',
      method: 'POST',
      status: 'success',
      statusCode: 200,
      ipAddress: '172.16.0.25',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      location: {
        country: 'United States',
        city: 'Austin',
        region: 'TX'
      },
      device: {
        type: 'desktop',
        browser: 'Firefox 121.0',
        os: 'Ubuntu 22.04'
      },
      sessionId: 'sess-jkl012',
      duration: 180,
      riskLevel: 'medium',
      flags: ['data_export', 'admin_action'],
      metadata: {
        endpoint: '/api/reports/export',
        queryParams: { format: 'csv', records: '1000' },
        responseSize: 1048576
      }
    },
    {
      id: 'log-005',
      timestamp: '2024-01-18T16:38:15Z',
      userId: 'unknown',
      userName: 'Unknown User',
      userEmail: 'unknown',
      userRole: 'Unknown',
      action: 'API Access Attempt',
      resource: 'API Endpoint',
      resourceType: 'api',
      method: 'GET',
      status: 'forbidden',
      statusCode: 403,
      ipAddress: '198.51.100.123',
      userAgent: 'curl/7.68.0',
      location: {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown'
      },
      device: {
        type: 'desktop',
        browser: 'curl',
        os: 'Unknown'
      },
      sessionId: 'none',
      riskLevel: 'high',
      flags: ['unauthorized_api', 'suspicious_user_agent', 'no_session'],
      metadata: {
        endpoint: '/api/leads/bulk',
        requestSize: 0
      }
    }
  ];

  // Mock security alerts
  const securityAlerts: SecurityAlert[] = [
    {
      id: 'alert-001',
      timestamp: '2024-01-18T16:45:00Z',
      type: 'multiple_failures',
      severity: 'medium',
      userId: 'user-003',
      userName: 'Alex Turner',
      description: 'Multiple failed login attempts detected',
      details: '5 failed login attempts from unusual location within 10 minutes',
      ipAddress: '203.0.113.42',
      location: 'London, UK',
      status: 'open',
      affectedResources: ['Authentication System'],
      recommendations: [
        'Verify user identity',
        'Consider temporary account lock',
        'Review access patterns'
      ]
    },
    {
      id: 'alert-002',
      timestamp: '2024-01-18T16:38:00Z',
      type: 'suspicious_login',
      severity: 'high',
      description: 'Unauthorized API access attempt',
      details: 'Attempted bulk data access with invalid credentials',
      ipAddress: '198.51.100.123',
      location: 'Unknown',
      status: 'investigating',
      assignedTo: 'security@company.com',
      affectedResources: ['Lead Database', 'API Gateway'],
      recommendations: [
        'Block IP address',
        'Review API security',
        'Check for data breach'
      ]
    }
  ];

  // Mock stats
  const stats: AccessStats = {
    totalLogs: 15847,
    uniqueUsers: 45,
    successfulAccess: 14523,
    failedAttempts: 1324,
    suspiciousActivity: 23,
    topActions: [
      { action: 'View Lead Details', count: 3456 },
      { action: 'Update Lead Status', count: 2134 },
      { action: 'Create Lead', count: 1876 },
      { action: 'Export Data', count: 567 },
      { action: 'Login', count: 445 }
    ],
    topLocations: [
      { location: 'New York, US', count: 4567 },
      { location: 'San Francisco, US', count: 3234 },
      { location: 'London, UK', count: 1876 },
      { location: 'Toronto, CA', count: 1234 },
      { location: 'Sydney, AU', count: 890 }
    ],
    peakHours: [
      { hour: 9, count: 1234 },
      { hour: 10, count: 1456 },
      { hour: 11, count: 1678 },
      { hour: 14, count: 1543 },
      { hour: 15, count: 1345 }
    ],
    deviceBreakdown: [
      { type: 'Desktop', count: 8934 },
      { type: 'Mobile', count: 4567 },
      { type: 'Tablet', count: 2346 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'unauthorized': return 'bg-orange-100 text-orange-800';
      case 'forbidden': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Login')) return LogIn;
    if (action.includes('Logout')) return LogOut;
    if (action.includes('View')) return Eye;
    if (action.includes('Update') || action.includes('Edit')) return Edit;
    if (action.includes('Delete')) return Trash2;
    if (action.includes('Create') || action.includes('Add')) return Plus;
    if (action.includes('Export')) return Download;
    if (action.includes('Import')) return Upload;
    return Activity;
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return Smartphone;
      case 'tablet': return Smartphone;
      case 'desktop': return Monitor;
      default: return Monitor;
    }
  };

  const formatDateTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  const filteredLogs = accessLogs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);
    
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesUser = userFilter === 'all' || log.userId === userFilter;
    
    return matchesSearch && matchesAction && matchesStatus && matchesUser;
  });

  const handleExportLogs = () => {
    console.log('Exporting access logs');
  };

  const handleAlertAction = (alertId: string, action: string) => {
    console.log('Alert action:', alertId, action);
  };

  const toggleLogDetails = (logId: string) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Access Logs</h1>
          <p className="text-muted-foreground mt-2">
            Monitor user activity and security events across the system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Access Events</p>
                <p className="text-2xl font-bold">{stats.totalLogs.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {((stats.successfulAccess / stats.totalLogs) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.successfulAccess.toLocaleString()} successful
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed Attempts</p>
                <p className="text-2xl font-bold">{stats.failedAttempts.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold">{stats.suspiciousActivity}</p>
                <p className="text-xs text-muted-foreground">Active investigations</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Access Logs</TabsTrigger>
          <TabsTrigger value="security">Security Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Access Logs</CardTitle>
              <CardDescription>
                Detailed audit trail of all user activities and system access
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Actions</option>
                  <option value="login">Login</option>
                  <option value="view">View</option>
                  <option value="update">Update</option>
                  <option value="create">Create</option>
                  <option value="delete">Delete</option>
                  <option value="export">Export</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="unauthorized">Unauthorized</option>
                  <option value="forbidden">Forbidden</option>
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
              </div>

              {/* Logs List */}
              <div className="space-y-2">
                {filteredLogs.map((log) => {
                  const ActionIcon = getActionIcon(log.action);
                  const DeviceIcon = getDeviceIcon(log.device.type);
                  const isExpanded = expandedLog === log.id;
                  
                  return (
                    <Card key={log.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Main Log Entry */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${
                                log.status === 'success' ? 'bg-green-100' : 
                                log.status === 'failed' || log.status === 'unauthorized' || log.status === 'forbidden' ? 'bg-red-100' : 
                                'bg-gray-100'
                              }`}>
                                <ActionIcon className={`h-4 w-4 ${
                                  log.status === 'success' ? 'text-green-600' : 
                                  log.status === 'failed' || log.status === 'unauthorized' || log.status === 'forbidden' ? 'text-red-600' : 
                                  'text-gray-600'
                                }`} />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium">{log.userName}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm">{log.action}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground">{log.resource}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDateTime(log.timestamp)}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Globe className="h-3 w-3" />
                                    {log.ipAddress}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DeviceIcon className="h-3 w-3" />
                                    {log.device.type} • {log.device.browser}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {log.location.city}, {log.location.country}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                              <Badge className={getRiskColor(log.riskLevel)}>
                                {log.riskLevel} risk
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleLogDetails(log.id)}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="border-t pt-3 mt-3 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="font-medium mb-1">Request Details</p>
                                  <div className="space-y-1 text-muted-foreground">
                                    <p>Method: {log.method}</p>
                                    <p>Status Code: {log.statusCode}</p>
                                    {log.duration && <p>Duration: {formatDuration(log.duration)}</p>}
                                    {log.metadata?.endpoint && <p>Endpoint: {log.metadata.endpoint}</p>}
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="font-medium mb-1">User Context</p>
                                  <div className="space-y-1 text-muted-foreground">
                                    <p>Role: {log.userRole}</p>
                                    <p>Session: {log.sessionId}</p>
                                    <p>User Agent: {log.userAgent.substring(0, 50)}...</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="font-medium mb-1">Location & Device</p>
                                  <div className="space-y-1 text-muted-foreground">
                                    <p>Region: {log.location.region}</p>
                                    <p>OS: {log.device.os}</p>
                                    <p>Browser: {log.device.browser}</p>
                                  </div>
                                </div>
                              </div>

                              {log.changes && (
                                <div>
                                  <p className="font-medium mb-2">Changes Made</p>
                                  <div className="bg-gray-50 p-3 rounded text-sm">
                                    <pre className="whitespace-pre-wrap">
                                      {JSON.stringify(log.changes, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              )}

                              {log.flags.length > 0 && (
                                <div>
                                  <p className="font-medium mb-2">Flags</p>
                                  <div className="flex gap-1 flex-wrap">
                                    {log.flags.map((flag) => (
                                      <Badge key={flag} variant="outline" className="text-xs">
                                        {flag.replace('_', ' ')}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {log.metadata && (
                                <div>
                                  <p className="font-medium mb-2">Metadata</p>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                                    {log.metadata.requestSize && (
                                      <p>Request Size: {log.metadata.requestSize} bytes</p>
                                    )}
                                    {log.metadata.responseSize && (
                                      <p>Response Size: {log.metadata.responseSize} bytes</p>
                                    )}
                                    {log.metadata.referrer && (
                                      <p>Referrer: {log.metadata.referrer}</p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredLogs.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No access logs found</h3>
                  <p className="text-muted-foreground mt-2">
                    No logs match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>
                Suspicious activities and security incidents requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <ShieldAlert className="h-5 w-5 text-orange-600" />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{alert.description}</h4>
                              <div className="flex items-center gap-2">
                                <Badge className={getSeverityColor(alert.severity)}>
                                  {alert.severity}
                                </Badge>
                                <Badge className={getStatusColor(alert.status)}>
                                  {alert.status}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                              {alert.details}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-medium">User</p>
                                <p className="text-muted-foreground">
                                  {alert.userName || 'Unknown'}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">IP Address</p>
                                <p className="text-muted-foreground">{alert.ipAddress}</p>
                              </div>
                              <div>
                                <p className="font-medium">Location</p>
                                <p className="text-muted-foreground">{alert.location}</p>
                              </div>
                            </div>

                            <div>
                              <p className="font-medium mb-1">Recommendations</p>
                              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                {alert.recommendations.map((rec, index) => (
                                  <li key={index}>{rec}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatDateTime(alert.timestamp)}</span>
                              {alert.assignedTo && (
                                <>
                                  <span>•</span>
                                  <span>Assigned to {alert.assignedTo}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          {alert.status === 'open' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, 'investigate')}
                              >
                                Investigate
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAlertAction(alert.id, 'false_positive')}
                              >
                                False Positive
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topActions.map((action, index) => (
                    <div key={action.action} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="text-sm">{action.action}</span>
                      </div>
                      <Badge>{action.count.toLocaleString()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topLocations.map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span className="text-sm">{location.location}</span>
                      </div>
                      <Badge>{location.count.toLocaleString()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.deviceBreakdown.map((device) => (
                    <div key={device.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(device.type.toLowerCase()) && 
                          React.createElement(getDeviceIcon(device.type.toLowerCase()), { 
                            className: "h-4 w-4" 
                          })
                        }
                        <span className="text-sm">{device.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: `${(device.count / stats.totalLogs) * 100}%` 
                            }}
                          />
                        </div>
                        <Badge>{device.count.toLocaleString()}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stats.peakHours.map((hour) => (
                    <div key={hour.hour} className="flex items-center justify-between">
                      <span className="text-sm">
                        {hour.hour.toString().padStart(2, '0')}:00
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ 
                              width: `${(hour.count / Math.max(...stats.peakHours.map(h => h.count))) * 100}%` 
                            }}
                          />
                        </div>
                        <Badge variant="outline">{hour.count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logging Configuration</CardTitle>
              <CardDescription>
                Configure what activities are logged and retention policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log User Actions</Label>
                      <p className="text-sm text-muted-foreground">
                        Record all user interactions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log API Requests</Label>
                      <p className="text-sm text-muted-foreground">
                        Track API endpoint access
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log Failed Attempts</Label>
                      <p className="text-sm text-muted-foreground">
                        Record failed login/access attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log Data Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        Track data modifications
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retention">Log Retention (days)</Label>
                    <Input
                      id="retention"
                      type="number"
                      defaultValue="90"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      How long to keep access logs
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="alert-threshold">Alert Threshold</Label>
                    <Input
                      id="alert-threshold"
                      type="number"
                      defaultValue="5"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Failed attempts before triggering alert
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Real-time Monitoring</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable real-time security monitoring
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email alerts for security events
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessLogs;
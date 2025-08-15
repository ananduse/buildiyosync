import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Calendar,
  Clock,
  Mail,
  Users,
  FileText,
  Settings,
  Play,
  Pause,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye,
  Copy,
  Archive,
  Zap,
  Target,
  BarChart3,
  DollarSign,
  Activity,
  Award,
  Building,
  Globe,
  TrendingUp,
  PieChart,
  Bell,
  Calendar as CalendarIcon,
  Clock3,
  ChevronDown,
  ChevronRight,
  Info,
  Star,
  Bookmark
} from 'lucide-react';

interface ScheduledReport {
  id: string;
  name: string;
  description: string;
  reportType: 'sales' | 'marketing' | 'operations' | 'performance' | 'compliance' | 'financial';
  category: string;
  status: 'active' | 'paused' | 'error' | 'draft';
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    time: string;
    timezone: string;
    daysOfWeek?: number[];
    dayOfMonth?: number;
    lastRun: string;
    nextRun: string;
  };
  delivery: {
    method: 'email' | 'download' | 'webhook' | 'ftp';
    recipients: string[];
    format: 'pdf' | 'excel' | 'csv';
    includeCharts: boolean;
    compressed: boolean;
  };
  parameters: {
    dateRange: string;
    filters: Record<string, any>;
    groupBy: string[];
    metrics: string[];
  };
  execution: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    averageDuration: number;
    lastDuration?: number;
    lastError?: string;
  };
  creator: {
    name: string;
    email: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  isBookmarked: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ReportExecution {
  id: string;
  reportId: string;
  reportName: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  startTime: string;
  endTime?: string;
  duration?: number;
  recordsProcessed?: number;
  fileSize?: number;
  deliveryStatus: 'pending' | 'sent' | 'failed';
  error?: string;
  downloadUrl?: string;
}

const ScheduledReports: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedReport, setSelectedReport] = useState<ScheduledReport | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for scheduled reports
  const scheduledReports: ScheduledReport[] = [
    {
      id: 'sr-001',
      name: 'Daily Sales Performance',
      description: 'Comprehensive daily sales metrics and team performance analysis',
      reportType: 'sales',
      category: 'Performance',
      status: 'active',
      schedule: {
        frequency: 'daily',
        time: '08:00',
        timezone: 'UTC',
        lastRun: '2024-01-15T08:00:00Z',
        nextRun: '2024-01-16T08:00:00Z'
      },
      delivery: {
        method: 'email',
        recipients: ['sales@company.com', 'manager@company.com'],
        format: 'pdf',
        includeCharts: true,
        compressed: false
      },
      parameters: {
        dateRange: 'yesterday',
        filters: { territory: 'all', product: 'all' },
        groupBy: ['territory', 'sales_rep'],
        metrics: ['revenue', 'leads', 'conversions', 'pipeline']
      },
      execution: {
        totalRuns: 127,
        successfulRuns: 125,
        failedRuns: 2,
        averageDuration: 45,
        lastDuration: 42
      },
      creator: {
        name: 'Sarah Wilson',
        email: 'sarah@company.com',
        avatar: 'SW'
      },
      createdAt: '2023-10-15T10:30:00Z',
      updatedAt: '2024-01-10T15:20:00Z',
      isBookmarked: true,
      priority: 'high'
    },
    {
      id: 'sr-002',
      name: 'Weekly Marketing ROI',
      description: 'Weekly analysis of marketing campaign performance and ROI metrics',
      reportType: 'marketing',
      category: 'Analytics',
      status: 'active',
      schedule: {
        frequency: 'weekly',
        time: '09:00',
        timezone: 'UTC',
        daysOfWeek: [1],
        lastRun: '2024-01-15T09:00:00Z',
        nextRun: '2024-01-22T09:00:00Z'
      },
      delivery: {
        method: 'email',
        recipients: ['marketing@company.com'],
        format: 'excel',
        includeCharts: true,
        compressed: false
      },
      parameters: {
        dateRange: 'last_week',
        filters: { channel: 'all', campaign_status: 'active' },
        groupBy: ['channel', 'campaign'],
        metrics: ['spend', 'impressions', 'clicks', 'conversions', 'roi']
      },
      execution: {
        totalRuns: 18,
        successfulRuns: 18,
        failedRuns: 0,
        averageDuration: 67,
        lastDuration: 72
      },
      creator: {
        name: 'Mike Chen',
        email: 'mike@company.com',
        avatar: 'MC'
      },
      createdAt: '2023-12-01T14:15:00Z',
      updatedAt: '2024-01-05T11:30:00Z',
      isBookmarked: false,
      priority: 'medium'
    },
    {
      id: 'sr-003',
      name: 'Monthly Executive Summary',
      description: 'High-level business metrics and KPIs for executive leadership',
      reportType: 'performance',
      category: 'Executive',
      status: 'active',
      schedule: {
        frequency: 'monthly',
        time: '07:00',
        timezone: 'UTC',
        dayOfMonth: 1,
        lastRun: '2024-01-01T07:00:00Z',
        nextRun: '2024-02-01T07:00:00Z'
      },
      delivery: {
        method: 'email',
        recipients: ['ceo@company.com', 'cfo@company.com', 'coo@company.com'],
        format: 'pdf',
        includeCharts: true,
        compressed: false
      },
      parameters: {
        dateRange: 'last_month',
        filters: {},
        groupBy: ['division', 'region'],
        metrics: ['revenue', 'growth', 'profit_margin', 'customer_acquisition']
      },
      execution: {
        totalRuns: 4,
        successfulRuns: 4,
        failedRuns: 0,
        averageDuration: 156,
        lastDuration: 142
      },
      creator: {
        name: 'Lisa Johnson',
        email: 'lisa@company.com',
        avatar: 'LJ'
      },
      createdAt: '2023-09-15T16:45:00Z',
      updatedAt: '2023-12-20T09:15:00Z',
      isBookmarked: true,
      priority: 'critical'
    },
    {
      id: 'sr-004',
      name: 'Lead Quality Assessment',
      description: 'Weekly lead scoring and quality analysis across all sources',
      reportType: 'operations',
      category: 'Quality',
      status: 'paused',
      schedule: {
        frequency: 'weekly',
        time: '10:30',
        timezone: 'UTC',
        daysOfWeek: [5],
        lastRun: '2024-01-12T10:30:00Z',
        nextRun: '2024-01-19T10:30:00Z'
      },
      delivery: {
        method: 'download',
        recipients: ['ops@company.com'],
        format: 'csv',
        includeCharts: false,
        compressed: true
      },
      parameters: {
        dateRange: 'last_week',
        filters: { lead_score: '>=50' },
        groupBy: ['source', 'industry'],
        metrics: ['lead_count', 'avg_score', 'conversion_rate']
      },
      execution: {
        totalRuns: 15,
        successfulRuns: 14,
        failedRuns: 1,
        averageDuration: 38,
        lastError: 'Database connection timeout'
      },
      creator: {
        name: 'Alex Turner',
        email: 'alex@company.com',
        avatar: 'AT'
      },
      createdAt: '2023-11-20T13:25:00Z',
      updatedAt: '2024-01-08T14:40:00Z',
      isBookmarked: false,
      priority: 'low'
    },
    {
      id: 'sr-005',
      name: 'Compliance Audit Report',
      description: 'Monthly GDPR compliance and data privacy audit summary',
      reportType: 'compliance',
      category: 'Legal',
      status: 'error',
      schedule: {
        frequency: 'monthly',
        time: '06:00',
        timezone: 'UTC',
        dayOfMonth: 15,
        lastRun: '2024-01-15T06:00:00Z',
        nextRun: '2024-02-15T06:00:00Z'
      },
      delivery: {
        method: 'email',
        recipients: ['legal@company.com', 'compliance@company.com'],
        format: 'pdf',
        includeCharts: false,
        compressed: false
      },
      parameters: {
        dateRange: 'last_month',
        filters: { compliance_type: 'gdpr' },
        groupBy: ['department'],
        metrics: ['compliance_score', 'violations', 'remediation_time']
      },
      execution: {
        totalRuns: 3,
        successfulRuns: 2,
        failedRuns: 1,
        averageDuration: 234,
        lastError: 'Access denied to compliance database'
      },
      creator: {
        name: 'Emma Davis',
        email: 'emma@company.com',
        avatar: 'ED'
      },
      createdAt: '2023-10-30T11:10:00Z',
      updatedAt: '2024-01-15T06:15:00Z',
      isBookmarked: false,
      priority: 'critical'
    }
  ];

  // Mock data for recent executions
  const recentExecutions: ReportExecution[] = [
    {
      id: 'ex-001',
      reportId: 'sr-001',
      reportName: 'Daily Sales Performance',
      status: 'completed',
      startTime: '2024-01-15T08:00:00Z',
      endTime: '2024-01-15T08:00:42Z',
      duration: 42,
      recordsProcessed: 1247,
      fileSize: 2.4,
      deliveryStatus: 'sent',
      downloadUrl: '/reports/daily-sales-2024-01-15.pdf'
    },
    {
      id: 'ex-002',
      reportId: 'sr-002',
      reportName: 'Weekly Marketing ROI',
      status: 'completed',
      startTime: '2024-01-15T09:00:00Z',
      endTime: '2024-01-15T09:01:12Z',
      duration: 72,
      recordsProcessed: 892,
      fileSize: 1.8,
      deliveryStatus: 'sent',
      downloadUrl: '/reports/weekly-marketing-2024-01-15.xlsx'
    },
    {
      id: 'ex-003',
      reportId: 'sr-005',
      reportName: 'Compliance Audit Report',
      status: 'failed',
      startTime: '2024-01-15T06:00:00Z',
      endTime: '2024-01-15T06:00:15Z',
      duration: 15,
      deliveryStatus: 'failed',
      error: 'Access denied to compliance database'
    },
    {
      id: 'ex-004',
      reportId: 'sr-001',
      reportName: 'Daily Sales Performance',
      status: 'running',
      startTime: '2024-01-16T08:00:00Z',
      deliveryStatus: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return Pause;
      case 'error': return AlertCircle;
      case 'draft': return Edit;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'draft': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getExecutionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'queued': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return DollarSign;
      case 'marketing': return Target;
      case 'operations': return Activity;
      case 'performance': return Award;
      case 'compliance': return CheckCircle;
      case 'financial': return BarChart3;
      default: return FileText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredReports = scheduledReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.reportType === filterType;
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'active' && report.status === 'active') ||
                      (selectedTab === 'paused' && report.status === 'paused') ||
                      (selectedTab === 'error' && report.status === 'error') ||
                      (selectedTab === 'draft' && report.status === 'draft');
    return matchesSearch && matchesType && matchesTab;
  });

  const runReport = (reportId: string) => {
    console.log(`Running report: ${reportId}`);
  };

  const pauseReport = (reportId: string) => {
    console.log(`Pausing report: ${reportId}`);
  };

  const deleteReport = (reportId: string) => {
    console.log(`Deleting report: ${reportId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scheduled Reports</h1>
          <p className="text-muted-foreground">Manage automated report generation and delivery</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active ({scheduledReports.filter(r => r.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({scheduledReports.filter(r => r.status === 'paused').length})</TabsTrigger>
            <TabsTrigger value="error">Errors ({scheduledReports.filter(r => r.status === 'error').length})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({scheduledReports.filter(r => r.status === 'draft').length})</TabsTrigger>
            <TabsTrigger value="executions">Recent Runs</TabsTrigger>
          </TabsList>
          
          {selectedTab !== 'executions' && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {filteredReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status);
              const TypeIcon = getReportTypeIcon(report.reportType);
              
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <TypeIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{report.name}</h3>
                            <Badge className={getPriorityColor(report.priority)}>
                              {report.priority}
                            </Badge>
                            {report.isBookmarked && (
                              <Bookmark className="h-4 w-4 text-blue-500 fill-current" />
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">{report.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1">
                              <StatusIcon className={`h-4 w-4 ${getStatusColor(report.status).split(' ')[0]}`} />
                              <span className="capitalize">{report.status}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{report.schedule.frequency} at {report.schedule.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span>{report.delivery.recipients.length} recipients</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="h-4 w-4 text-gray-500" />
                              <span>{report.execution.successfulRuns}/{report.execution.totalRuns} runs</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Last run: {new Date(report.schedule.lastRun).toLocaleString()}</span>
                            <span>Next run: {new Date(report.schedule.nextRun).toLocaleString()}</span>
                            <span>Avg duration: {report.execution.averageDuration}s</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => runReport(report.id)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => report.status === 'active' ? pauseReport(report.id) : runReport(report.id)}
                        >
                          {report.status === 'active' ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="paused" className="space-y-4">
          <div className="grid gap-4">
            {filteredReports.map((report) => {
              const StatusIcon = getStatusIcon(report.status);
              const TypeIcon = getReportTypeIcon(report.reportType);
              
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <TypeIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-600">{report.name}</h3>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                              Paused
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{report.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Was running {report.schedule.frequency} at {report.schedule.time}</span>
                            <span>Last run: {new Date(report.schedule.lastRun).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => runReport(report.id)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteReport(report.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="error" className="space-y-4">
          <div className="grid gap-4">
            {filteredReports.map((report) => {
              const TypeIcon = getReportTypeIcon(report.reportType);
              
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-red-50">
                          <TypeIcon className="h-6 w-6 text-red-600" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{report.name}</h3>
                            <Badge variant="destructive">
                              Error
                            </Badge>
                            <Badge className={getPriorityColor(report.priority)}>
                              {report.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{report.description}</p>
                          
                          {report.execution.lastError && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm text-red-700">{report.execution.lastError}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-6 text-sm">
                            <span>Failed runs: {report.execution.failedRuns}</span>
                            <span>Last attempt: {new Date(report.schedule.lastRun).toLocaleString()}</span>
                            <span>Success rate: {Math.round((report.execution.successfulRuns / report.execution.totalRuns) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => runReport(report.id)}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => pauseReport(report.id)}
                        >
                          <Pause className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <div className="text-center py-12">
            <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No draft reports</p>
            <p className="text-sm text-gray-500 mt-2">
              Create a new scheduled report to get started
            </p>
            <Button className="mt-4" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Report Schedule
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="executions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
              <CardDescription>Latest report generation and delivery status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExecutions.map((execution) => {
                  const StatusIcon = execution.status === 'completed' ? CheckCircle : 
                                   execution.status === 'running' ? RefreshCw :
                                   execution.status === 'failed' ? AlertCircle : Clock;
                  
                  return (
                    <div key={execution.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <StatusIcon className={`h-5 w-5 ${
                          execution.status === 'running' ? 'animate-spin' : ''
                        } ${getExecutionStatusColor(execution.status).split(' ')[0]}`} />
                        
                        <div>
                          <h4 className="font-medium">{execution.reportName}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Started: {new Date(execution.startTime).toLocaleString()}</span>
                            {execution.duration && (
                              <span>Duration: {execution.duration}s</span>
                            )}
                            {execution.recordsProcessed && (
                              <span>Records: {execution.recordsProcessed.toLocaleString()}</span>
                            )}
                            {execution.fileSize && (
                              <span>Size: {execution.fileSize}MB</span>
                            )}
                          </div>
                          {execution.error && (
                            <div className="text-sm text-red-600 mt-1">{execution.error}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getExecutionStatusColor(execution.status)}>
                          {execution.status}
                        </Badge>
                        {execution.deliveryStatus === 'sent' && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Delivered
                          </Badge>
                        )}
                        {execution.downloadUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduledReports;
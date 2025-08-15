import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Code,
  Database,
  Mail,
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Users,
  Zap,
  AlertTriangle,
  Info,
  Bug,
  Settings,
  PlayCircle,
  StopCircle,
  PauseCircle,
  SkipForward,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface AutomationLog {
  id: string;
  timestamp: string;
  workflowId: string;
  workflowName: string;
  leadId: string;
  leadName: string;
  actionType: 'email' | 'sms' | 'call' | 'task' | 'video' | 'linkedin' | 'webhook' | 'delay' | 'condition';
  status: 'success' | 'failed' | 'pending' | 'skipped' | 'cancelled';
  executionTime: number;
  error?: string;
  details: {
    trigger?: string;
    recipient?: string;
    subject?: string;
    content?: string;
    response?: string;
    metadata?: Record<string, any>;
  };
  userId: string;
  userName: string;
}

interface SystemEvent {
  id: string;
  timestamp: string;
  type: 'workflow_started' | 'workflow_completed' | 'workflow_failed' | 'system_error' | 'configuration_change' | 'performance_alert';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  details?: Record<string, any>;
  affectedWorkflows?: string[];
  userId?: string;
  userName?: string;
}

interface PerformanceMetric {
  timestamp: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  avgExecutionTime: number;
  peakMemoryUsage: number;
  queueSize: number;
}

const AutomationLogs: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  // Mock data for automation logs
  const automationLogs: AutomationLog[] = [
    {
      id: 'LOG001',
      timestamp: '2024-01-15T14:32:18Z',
      workflowId: 'WF001',
      workflowName: 'Construction Lead Welcome Series',
      leadId: 'LEAD123',
      leadName: 'John Smith Construction',
      actionType: 'email',
      status: 'success',
      executionTime: 2.4,
      details: {
        trigger: 'lead_created',
        recipient: 'john@smithconstruction.com',
        subject: 'Welcome to BuildiyoSync - Your Construction Partner',
        content: 'Thank you for your interest in our construction services...',
        response: 'Email sent successfully via SendGrid'
      },
      userId: 'USER001',
      userName: 'Sarah Johnson'
    },
    {
      id: 'LOG002',
      timestamp: '2024-01-15T14:25:42Z',
      workflowId: 'WF002',
      workflowName: 'Post-Proposal Follow-up Sequence',
      leadId: 'LEAD124',
      leadName: 'Metro Real Estate',
      actionType: 'sms',
      status: 'failed',
      executionTime: 0.8,
      error: 'Invalid phone number format',
      details: {
        trigger: 'proposal_sent',
        recipient: '+1-555-INVALID',
        content: 'Hi! Just wanted to follow up on the proposal we sent...',
        response: 'SMS delivery failed: Invalid phone number'
      },
      userId: 'USER002',
      userName: 'Mike Chen'
    },
    {
      id: 'LOG003',
      timestamp: '2024-01-15T14:18:15Z',
      workflowId: 'WF003',
      workflowName: 'Lead Scoring Automation',
      leadId: 'LEAD125',
      leadName: 'Green Valley Homes',
      actionType: 'condition',
      status: 'success',
      executionTime: 0.3,
      details: {
        trigger: 'score_calculation',
        metadata: {
          previousScore: 65,
          newScore: 78,
          factors: ['website_visit', 'email_open', 'document_download']
        }
      },
      userId: 'SYSTEM',
      userName: 'System'
    },
    {
      id: 'LOG004',
      timestamp: '2024-01-15T14:12:33Z',
      workflowId: 'WF001',
      workflowName: 'Construction Lead Welcome Series',
      leadId: 'LEAD126',
      leadName: 'Apex Building Solutions',
      actionType: 'task',
      status: 'success',
      executionTime: 1.2,
      details: {
        trigger: 'email_opened',
        content: 'Schedule follow-up call with Apex Building Solutions',
        metadata: {
          assignedTo: 'Sarah Johnson',
          dueDate: '2024-01-16T10:00:00Z',
          priority: 'high'
        }
      },
      userId: 'USER001',
      userName: 'Sarah Johnson'
    },
    {
      id: 'LOG005',
      timestamp: '2024-01-15T14:05:27Z',
      workflowId: 'WF004',
      workflowName: 'Dormant Lead Reactivation',
      leadId: 'LEAD127',
      leadName: 'Sunset Construction Co',
      actionType: 'video',
      status: 'pending',
      executionTime: 0,
      details: {
        trigger: 'dormant_lead_detected',
        content: 'Video meeting invitation: Reconnect with BuildiyoSync',
        metadata: {
          meetingUrl: 'https://zoom.us/j/1234567890',
          scheduledFor: '2024-01-16T15:00:00Z'
        }
      },
      userId: 'USER003',
      userName: 'Lisa Wang'
    },
    {
      id: 'LOG006',
      timestamp: '2024-01-15T13:58:14Z',
      workflowId: 'WF002',
      workflowName: 'Post-Proposal Follow-up Sequence',
      leadId: 'LEAD128',
      leadName: 'Urban Development LLC',
      actionType: 'call',
      status: 'skipped',
      executionTime: 0.1,
      details: {
        trigger: 'follow_up_scheduled',
        content: 'Automated call to Urban Development LLC',
        response: 'Call skipped: Lead opted out of phone communications'
      },
      userId: 'SYSTEM',
      userName: 'System'
    }
  ];

  // Mock data for system events
  const systemEvents: SystemEvent[] = [
    {
      id: 'EVT001',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'workflow_started',
      severity: 'info',
      title: 'Workflow Execution Started',
      description: 'Construction Lead Welcome Series workflow started for new lead',
      details: {
        workflowId: 'WF001',
        leadId: 'LEAD123',
        trigger: 'lead_created'
      },
      affectedWorkflows: ['WF001'],
      userId: 'USER001',
      userName: 'Sarah Johnson'
    },
    {
      id: 'EVT002',
      timestamp: '2024-01-15T14:25:00Z',
      type: 'workflow_failed',
      severity: 'error',
      title: 'SMS Delivery Failure',
      description: 'Failed to send SMS in Post-Proposal Follow-up Sequence due to invalid phone number',
      details: {
        workflowId: 'WF002',
        leadId: 'LEAD124',
        error: 'Invalid phone number format',
        actionType: 'sms'
      },
      affectedWorkflows: ['WF002'],
      userId: 'USER002',
      userName: 'Mike Chen'
    },
    {
      id: 'EVT003',
      timestamp: '2024-01-15T14:00:00Z',
      type: 'performance_alert',
      severity: 'warning',
      title: 'High Queue Volume Detected',
      description: 'Automation queue size exceeded threshold (>500 pending actions)',
      details: {
        queueSize: 547,
        threshold: 500,
        affectedActions: ['email', 'sms', 'task']
      }
    },
    {
      id: 'EVT004',
      timestamp: '2024-01-15T13:45:00Z',
      type: 'configuration_change',
      severity: 'info',
      title: 'Workflow Configuration Updated',
      description: 'Dormant Lead Reactivation workflow settings modified',
      details: {
        workflowId: 'WF004',
        changes: ['delay_time', 'email_template', 'trigger_conditions']
      },
      affectedWorkflows: ['WF004'],
      userId: 'USER003',
      userName: 'Lisa Wang'
    },
    {
      id: 'EVT005',
      timestamp: '2024-01-15T13:30:00Z',
      type: 'system_error',
      severity: 'critical',
      title: 'Database Connection Timeout',
      description: 'Temporary database connection issues affecting workflow executions',
      details: {
        duration: '5 minutes',
        affectedOperations: ['workflow_execution', 'log_writing', 'status_updates'],
        recovery: 'automatic'
      }
    }
  ];

  // Mock data for performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      timestamp: '2024-01-15T14:30:00Z',
      totalExecutions: 1247,
      successfulExecutions: 1089,
      failedExecutions: 158,
      avgExecutionTime: 2.3,
      peakMemoryUsage: 85.4,
      queueSize: 23
    },
    {
      timestamp: '2024-01-15T14:00:00Z',
      totalExecutions: 1198,
      successfulExecutions: 1045,
      failedExecutions: 153,
      avgExecutionTime: 2.1,
      peakMemoryUsage: 82.1,
      queueSize: 547
    },
    {
      timestamp: '2024-01-15T13:30:00Z',
      totalExecutions: 1156,
      successfulExecutions: 998,
      failedExecutions: 158,
      avgExecutionTime: 3.8,
      peakMemoryUsage: 91.2,
      queueSize: 89
    }
  ];

  const getStatusBadge = (status: string) => {
    const configs = {
      success: { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      failed: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      pending: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      skipped: { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' },
      cancelled: { variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'skipped': return <SkipForward className="h-4 w-4 text-gray-500" />;
      case 'cancelled': return <StopCircle className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'task': return <Calendar className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'linkedin': return <Users className="h-4 w-4" />;
      case 'webhook': return <Zap className="h-4 w-4" />;
      case 'delay': return <PauseCircle className="h-4 w-4" />;
      case 'condition': return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredLogs = automationLogs.filter(log => {
    const matchesSearch = log.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.workflowName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    const matchesWorkflow = selectedWorkflow === 'all' || log.workflowId === selectedWorkflow;
    return matchesSearch && matchesStatus && matchesWorkflow;
  });

  const toggleLogExpansion = (logId: string) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation Logs</h1>
          <p className="text-muted-foreground">Monitor workflow executions, system events, and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
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

      <Tabs defaultValue="execution-logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="execution-logs">Execution Logs</TabsTrigger>
          <TabsTrigger value="system-events">System Events</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="debug">Debug Info</TabsTrigger>
        </TabsList>

        <TabsContent value="execution-logs" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Workflow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workflows</SelectItem>
                <SelectItem value="WF001">Welcome Series</SelectItem>
                <SelectItem value="WF002">Follow-up Sequence</SelectItem>
                <SelectItem value="WF003">Lead Scoring</SelectItem>
                <SelectItem value="WF004">Reactivation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Execution Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Execution Logs</CardTitle>
              <CardDescription>
                Detailed logs of all automation workflow executions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => {
                  const statusConfig = getStatusBadge(log.status);
                  const isExpanded = expandedLog === log.id;
                  
                  return (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(log.status)}
                          <div className="flex items-center gap-2">
                            {getActionIcon(log.actionType)}
                            <span className="font-medium capitalize">{log.actionType}</span>
                          </div>
                          <div>
                            <p className="font-medium">{log.leadName}</p>
                            <p className="text-sm text-muted-foreground">{log.workflowName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={statusConfig.className}>
                            {log.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLogExpansion(log.id)}
                          >
                            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium text-sm mb-2">Execution Details</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Workflow ID:</span>
                                  <span>{log.workflowId}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Lead ID:</span>
                                  <span>{log.leadId}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Execution Time:</span>
                                  <span>{log.executionTime}s</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Executed By:</span>
                                  <span>{log.userName}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-2">Action Details</h4>
                              <div className="space-y-1 text-sm">
                                {log.details.trigger && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Trigger:</span>
                                    <span>{log.details.trigger}</span>
                                  </div>
                                )}
                                {log.details.recipient && (
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recipient:</span>
                                    <span>{log.details.recipient}</span>
                                  </div>
                                )}
                                {log.details.subject && (
                                  <div>
                                    <span className="text-muted-foreground">Subject:</span>
                                    <p className="text-sm mt-1">{log.details.subject}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {log.details.content && (
                            <div>
                              <h4 className="font-medium text-sm mb-2">Content</h4>
                              <div className="bg-gray-50 p-3 rounded text-sm">
                                {log.details.content}
                              </div>
                            </div>
                          )}

                          {log.error && (
                            <div>
                              <h4 className="font-medium text-sm mb-2 text-red-600">Error Details</h4>
                              <div className="bg-red-50 p-3 rounded text-sm text-red-700">
                                {log.error}
                              </div>
                            </div>
                          )}

                          {log.details.response && (
                            <div>
                              <h4 className="font-medium text-sm mb-2">Response</h4>
                              <div className="bg-gray-50 p-3 rounded text-sm">
                                {log.details.response}
                              </div>
                            </div>
                          )}

                          {log.details.metadata && (
                            <div>
                              <h4 className="font-medium text-sm mb-2">Metadata</h4>
                              <div className="bg-gray-50 p-3 rounded text-sm">
                                <pre>{JSON.stringify(log.details.metadata, null, 2)}</pre>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Events</CardTitle>
              <CardDescription>
                System-level events, alerts, and configuration changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemEvents.map((event) => (
                  <div key={event.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      {getSeverityIcon(event.severity)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        
                        {event.affectedWorkflows && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Affected Workflows: </span>
                            {event.affectedWorkflows.map((wf, index) => (
                              <Badge key={wf} variant="outline" className="ml-1">
                                {wf}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {event.userName && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">By: {event.userName}</span>
                          </div>
                        )}

                        {event.details && (
                          <details className="mt-3">
                            <summary className="text-sm cursor-pointer hover:text-blue-600">View Details</summary>
                            <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                              <pre>{JSON.stringify(event.details, null, 2)}</pre>
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600">87.3%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Execution Time</p>
                    <p className="text-2xl font-bold">2.3s</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Queue Size</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                  <Database className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Memory Usage</p>
                    <p className="text-2xl font-bold">85.4%</p>
                  </div>
                  <Activity className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Real-time performance data for automation system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Time</th>
                      <th className="text-left py-3 px-4">Total Executions</th>
                      <th className="text-left py-3 px-4">Success Rate</th>
                      <th className="text-left py-3 px-4">Avg Execution Time</th>
                      <th className="text-left py-3 px-4">Memory Usage</th>
                      <th className="text-left py-3 px-4">Queue Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceMetrics.map((metric, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{new Date(metric.timestamp).toLocaleTimeString()}</td>
                        <td className="py-3 px-4">{metric.totalExecutions}</td>
                        <td className="py-3 px-4">
                          <span className="text-green-600 font-medium">
                            {((metric.successfulExecutions / metric.totalExecutions) * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4">{metric.avgExecutionTime}s</td>
                        <td className="py-3 px-4">
                          <span className={metric.peakMemoryUsage > 90 ? 'text-red-600' : 'text-green-600'}>
                            {metric.peakMemoryUsage}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={metric.queueSize > 100 ? 'text-yellow-600' : 'text-green-600'}>
                            {metric.queueSize}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debug" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Debug Information
              </CardTitle>
              <CardDescription>
                System diagnostics and technical debugging information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">System Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Automation Service:</span>
                      <Badge className="bg-green-100 text-green-800">Running</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Queue Processor:</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Database Connection:</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Email Service:</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>SMS Service:</span>
                      <Badge className="bg-yellow-100 text-yellow-800">Rate Limited</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Max Concurrent Executions:</span>
                      <span>50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Queue Batch Size:</span>
                      <span>25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retry Attempts:</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Log Retention:</span>
                      <span>30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Debug Mode:</span>
                      <Badge variant="outline">Disabled</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Recent Errors</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2 text-sm font-mono">
                    <div className="text-red-600">[2024-01-15 14:25:42] ERROR: SMS delivery failed - Invalid phone number format</div>
                    <div className="text-yellow-600">[2024-01-15 13:30:15] WARN: Database connection timeout - retrying</div>
                    <div className="text-red-600">[2024-01-15 12:45:33] ERROR: Webhook endpoint unreachable - marking as failed</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" />
                  View Raw Logs
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  System Report
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Monitoring
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationLogs;
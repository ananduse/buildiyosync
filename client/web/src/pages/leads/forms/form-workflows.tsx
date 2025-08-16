import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus,
  Play,
  Pause,
  Settings,
  Edit,
  Copy,
  Trash2,
  Save,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  GitBranch,
  Zap,
  Mail,
  Phone,
  MessageSquare,
  Bell,
  Database,
  Globe,
  Webhook,
  Send,
  Filter,
  Users,
  Building,
  Calendar,
  Tag,
  FileText,
  Download,
  Upload,
  ExternalLink,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Info,
  HelpCircle,
  Code,
  Timer,
  Activity,
  Target,
  Flag,
  Lock,
  Unlock,
  RefreshCw,
  Search,
  Star,
  Bookmark,
  Share2,
  Archive,
  Workflow,
  LogicalOr,
  LogicalAnd,
  Equal,
  NotEqual,
  Hash,
  Type,
  ToggleLeft,
  List,
  Layers,
  Link2,
  Split,
  Merge,
  BarChart3,
  TrendingUp,
  DollarSign,
  Percent
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft' | 'error';
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  settings: WorkflowSettings;
  stats: WorkflowStats;
  lastRun?: Date;
  createdAt: Date;
}

interface WorkflowTrigger {
  type: 'form_submission' | 'field_change' | 'time_based' | 'manual' | 'webhook';
  formId?: string;
  fieldId?: string;
  event?: string;
  schedule?: string;
}

interface WorkflowStep {
  id: string;
  type: 'email' | 'sms' | 'webhook' | 'database' | 'crm' | 'delay' | 'condition' | 'split' | 'merge';
  name: string;
  config: StepConfig;
  position: { x: number; y: number };
  connections: string[];
  enabled: boolean;
}

interface StepConfig {
  // Email step
  emailTemplate?: string;
  recipients?: string[];
  subject?: string;
  body?: string;
  
  // SMS step
  phoneNumbers?: string[];
  message?: string;
  
  // Webhook step
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  payload?: any;
  
  // Database step
  action?: 'insert' | 'update' | 'delete' | 'query';
  table?: string;
  data?: Record<string, any>;
  
  // CRM step
  crmProvider?: 'hubspot' | 'salesforce' | 'pipedrive' | 'zoho';
  action_type?: 'create_contact' | 'update_contact' | 'create_deal' | 'create_task';
  mapping?: Record<string, string>;
  
  // Delay step
  delay?: number;
  unit?: 'minutes' | 'hours' | 'days';
  
  // Condition step
  conditions?: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
  logic?: 'AND' | 'OR';
  
  // Split step
  splitConditions?: Array<{
    name: string;
    condition: string;
    percentage?: number;
  }>;
  
  // General
  retryCount?: number;
  timeout?: number;
  errorHandling?: 'continue' | 'stop' | 'retry';
}

interface WorkflowCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
  value: any;
  logic: 'AND' | 'OR';
}

interface WorkflowSettings {
  enabled: boolean;
  maxExecutions?: number;
  timeWindow?: number;
  priority: 'low' | 'medium' | 'high';
  notifications: {
    onSuccess: boolean;
    onError: boolean;
    recipients: string[];
  };
}

interface WorkflowStats {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  avgExecutionTime: number;
  lastExecutionTime?: number;
  successRate: number;
}

const FormWorkflows: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState('workflows');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock workflows data
  const workflows: Workflow[] = [
    {
      id: '1',
      name: 'Lead Qualification & Follow-up',
      description: 'Automatically qualify leads and send personalized follow-up emails',
      status: 'active',
      trigger: {
        type: 'form_submission',
        formId: 'construction_lead_form'
      },
      steps: [
        {
          id: 'step1',
          type: 'condition',
          name: 'Qualify Lead',
          config: {
            conditions: [
              { field: 'budget', operator: 'greater_than', value: 50000 },
              { field: 'timeline', operator: 'equals', value: 'urgent' }
            ],
            logic: 'OR'
          },
          position: { x: 100, y: 100 },
          connections: ['step2', 'step5'],
          enabled: true
        },
        {
          id: 'step2',
          type: 'email',
          name: 'High-Priority Lead Email',
          config: {
            emailTemplate: 'high_priority_lead',
            recipients: ['sales@company.com'],
            subject: 'High-Priority Lead: {{company_name}}',
            body: 'New qualified lead from {{company_name}} with budget {{budget}}'
          },
          position: { x: 200, y: 50 },
          connections: ['step3'],
          enabled: true
        },
        {
          id: 'step3',
          type: 'crm',
          name: 'Create CRM Contact',
          config: {
            crmProvider: 'hubspot',
            action_type: 'create_contact',
            mapping: {
              'firstName': 'first_name',
              'lastName': 'last_name',
              'email': 'email',
              'company': 'company_name'
            }
          },
          position: { x: 300, y: 50 },
          connections: ['step4'],
          enabled: true
        },
        {
          id: 'step4',
          type: 'delay',
          name: 'Wait 1 Hour',
          config: {
            delay: 1,
            unit: 'hours'
          },
          position: { x: 400, y: 50 },
          connections: ['step6'],
          enabled: true
        },
        {
          id: 'step5',
          type: 'email',
          name: 'Standard Follow-up',
          config: {
            emailTemplate: 'standard_followup',
            recipients: ['{{email}}'],
            subject: 'Thank you for your interest!',
            body: 'Thank you for submitting your project details. We will review and get back to you within 24 hours.'
          },
          position: { x: 200, y: 150 },
          connections: [],
          enabled: true
        },
        {
          id: 'step6',
          type: 'sms',
          name: 'SMS Follow-up',
          config: {
            phoneNumbers: ['{{phone}}'],
            message: 'Hi {{first_name}}, thanks for your construction project inquiry. Our team will call you within 2 hours!'
          },
          position: { x: 500, y: 50 },
          connections: [],
          enabled: true
        }
      ],
      conditions: [],
      settings: {
        enabled: true,
        maxExecutions: 1000,
        timeWindow: 24,
        priority: 'high',
        notifications: {
          onSuccess: false,
          onError: true,
          recipients: ['admin@company.com']
        }
      },
      stats: {
        totalExecutions: 1247,
        successfulExecutions: 1198,
        failedExecutions: 49,
        avgExecutionTime: 2340,
        lastExecutionTime: 1834,
        successRate: 96.1
      },
      lastRun: new Date('2024-01-19T14:30:00'),
      createdAt: new Date('2024-01-01T09:00:00')
    },
    {
      id: '2',
      name: 'Enterprise Lead Routing',
      description: 'Route enterprise leads to senior sales team with immediate notifications',
      status: 'active',
      trigger: {
        type: 'form_submission',
        formId: 'enterprise_form'
      },
      steps: [
        {
          id: 'step1',
          type: 'condition',
          name: 'Check Enterprise Criteria',
          config: {
            conditions: [
              { field: 'company_size', operator: 'greater_than', value: 500 },
              { field: 'budget', operator: 'greater_than', value: 1000000 }
            ],
            logic: 'AND'
          },
          position: { x: 100, y: 100 },
          connections: ['step2'],
          enabled: true
        },
        {
          id: 'step2',
          type: 'split',
          name: 'Route by Industry',
          config: {
            splitConditions: [
              { name: 'Construction', condition: 'industry == construction', percentage: 40 },
              { name: 'Real Estate', condition: 'industry == real_estate', percentage: 35 },
              { name: 'Other', condition: 'default', percentage: 25 }
            ]
          },
          position: { x: 250, y: 100 },
          connections: ['step3', 'step4', 'step5'],
          enabled: true
        },
        {
          id: 'step3',
          type: 'email',
          name: 'Construction Team Alert',
          config: {
            recipients: ['construction-team@company.com'],
            subject: 'Enterprise Construction Lead',
            body: 'New enterprise construction lead requiring immediate attention'
          },
          position: { x: 400, y: 50 },
          connections: [],
          enabled: true
        },
        {
          id: 'step4',
          type: 'email',
          name: 'Real Estate Team Alert',
          config: {
            recipients: ['realestate-team@company.com'],
            subject: 'Enterprise Real Estate Lead',
            body: 'New enterprise real estate lead requiring immediate attention'
          },
          position: { x: 400, y: 100 },
          connections: [],
          enabled: true
        },
        {
          id: 'step5',
          type: 'email',
          name: 'General Sales Alert',
          config: {
            recipients: ['sales@company.com'],
            subject: 'Enterprise Lead - Other Industry',
            body: 'New enterprise lead requiring review and assignment'
          },
          position: { x: 400, y: 150 },
          connections: [],
          enabled: true
        }
      ],
      conditions: [],
      settings: {
        enabled: true,
        priority: 'high',
        notifications: {
          onSuccess: true,
          onError: true,
          recipients: ['admin@company.com']
        }
      },
      stats: {
        totalExecutions: 89,
        successfulExecutions: 87,
        failedExecutions: 2,
        avgExecutionTime: 1240,
        successRate: 97.8
      },
      lastRun: new Date('2024-01-19T16:45:00'),
      createdAt: new Date('2024-01-05T10:00:00')
    },
    {
      id: '3',
      name: 'Data Enrichment & Scoring',
      description: 'Enrich lead data and calculate lead scores automatically',
      status: 'active',
      trigger: {
        type: 'form_submission'
      },
      steps: [
        {
          id: 'step1',
          type: 'webhook',
          name: 'Enrich Company Data',
          config: {
            url: 'https://api.clearbit.com/v2/companies/find',
            method: 'GET',
            headers: {
              'Authorization': 'Bearer {{clearbit_api_key}}'
            }
          },
          position: { x: 100, y: 100 },
          connections: ['step2'],
          enabled: true
        },
        {
          id: 'step2',
          type: 'database',
          name: 'Calculate Lead Score',
          config: {
            action: 'update',
            table: 'leads',
            data: {
              'lead_score': '{{calculated_score}}',
              'enriched_data': '{{enrichment_result}}'
            }
          },
          position: { x: 250, y: 100 },
          connections: ['step3'],
          enabled: true
        },
        {
          id: 'step3',
          type: 'condition',
          name: 'High Score Filter',
          config: {
            conditions: [
              { field: 'lead_score', operator: 'greater_than', value: 80 }
            ]
          },
          position: { x: 400, y: 100 },
          connections: ['step4'],
          enabled: true
        },
        {
          id: 'step4',
          type: 'email',
          name: 'High Score Alert',
          config: {
            recipients: ['sales-manager@company.com'],
            subject: 'High-Score Lead Alert',
            body: 'New lead with score {{lead_score}} requires immediate attention'
          },
          position: { x: 550, y: 100 },
          connections: [],
          enabled: true
        }
      ],
      conditions: [],
      settings: {
        enabled: true,
        priority: 'medium',
        notifications: {
          onSuccess: false,
          onError: true,
          recipients: ['dev@company.com']
        }
      },
      stats: {
        totalExecutions: 2341,
        successfulExecutions: 2298,
        failedExecutions: 43,
        avgExecutionTime: 3200,
        successRate: 98.2
      },
      lastRun: new Date('2024-01-19T17:20:00'),
      createdAt: new Date('2024-01-08T11:30:00')
    }
  ];

  const stepTypes = [
    { type: 'email', name: 'Send Email', icon: Mail, description: 'Send automated emails' },
    { type: 'sms', name: 'Send SMS', icon: MessageSquare, description: 'Send text messages' },
    { type: 'webhook', name: 'Webhook', icon: Webhook, description: 'Call external APIs' },
    { type: 'database', name: 'Database', icon: Database, description: 'Database operations' },
    { type: 'crm', name: 'CRM Action', icon: Building, description: 'CRM integrations' },
    { type: 'delay', name: 'Delay', icon: Clock, description: 'Wait before next step' },
    { type: 'condition', name: 'Condition', icon: GitBranch, description: 'Conditional logic' },
    { type: 'split', name: 'Split Path', icon: Split, description: 'Split workflow paths' }
  ];

  const filteredWorkflows = workflows.filter(workflow => {
    return filterStatus === 'all' || workflow.status === filterStatus;
  });

  const getStatusColor = (status: Workflow['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Workflow['status']) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return Pause;
      case 'draft': return Edit;
      case 'error': return XCircle;
      default: return Clock;
    }
  };

  const renderWorkflowCard = (workflow: Workflow) => {
    const StatusIcon = getStatusIcon(workflow.status);
    
    return (
      <Card key={workflow.id} className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-base">{workflow.name}</CardTitle>
                <Badge className={getStatusColor(workflow.status)}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {workflow.status}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {workflow.description}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Workflow
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {workflow.status === 'active' && (
                  <DropdownMenuItem>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Workflow
                  </DropdownMenuItem>
                )}
                {workflow.status === 'inactive' && (
                  <DropdownMenuItem>
                    <Play className="h-4 w-4 mr-2" />
                    Activate Workflow
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Activity className="h-4 w-4 mr-2" />
                  View Logs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Workflow
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Workflow Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Executions</p>
                <p className="text-lg font-bold">{workflow.stats.totalExecutions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Success Rate</p>
                <p className="text-lg font-bold text-green-600">{workflow.stats.successRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Time</p>
                <p className="text-lg font-bold">{(workflow.stats.avgExecutionTime / 1000).toFixed(1)}s</p>
              </div>
            </div>

            <Separator />

            {/* Workflow Steps Preview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Steps ({workflow.steps.length})</h4>
                <Badge variant="outline" className="text-xs">
                  {workflow.trigger.type.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto">
                {workflow.steps.slice(0, 5).map((step, index) => {
                  const StepType = stepTypes.find(t => t.type === step.type);
                  const Icon = StepType?.icon || Settings;
                  
                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center min-w-0">
                        <div className={`p-1.5 rounded ${step.enabled ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Icon className={`h-3 w-3 ${step.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <span className="text-xs mt-1 text-center truncate max-w-16">
                          {step.name}
                        </span>
                      </div>
                      {index < Math.min(workflow.steps.length - 1, 4) && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
                {workflow.steps.length > 5 && (
                  <div className="text-xs text-muted-foreground ml-2">
                    +{workflow.steps.length - 5} more
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Last Run Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last run: {workflow.lastRun ? workflow.lastRun.toLocaleString() : 'Never'}
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                Priority: {workflow.settings.priority}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderWorkflowBuilder = () => {
    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Workflow Steps Library */}
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow Steps</CardTitle>
              <CardDescription>Drag steps to build your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stepTypes.map(stepType => {
                  const Icon = stepType.icon;
                  return (
                    <Button
                      key={stepType.type}
                      variant="outline"
                      className="w-full justify-start"
                      draggable
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <p className="text-sm font-medium">{stepType.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {stepType.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Canvas */}
        <div className="col-span-9">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Workflow Canvas</CardTitle>
                  <CardDescription>Design your workflow visually</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Test Run
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Workflow className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2">Drag workflow steps here to build your automation</p>
                  <p className="text-sm">Connect steps to create your workflow logic</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Form Submission Workflows</h1>
            <p className="text-muted-foreground mt-2">
              Automate actions when forms are submitted
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </Dialog>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Workflows</p>
                  <p className="text-2xl font-bold">
                    {workflows.filter(w => w.status === 'active').length}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Executions</p>
                  <p className="text-2xl font-bold">
                    {workflows.reduce((sum, w) => sum + w.stats.totalExecutions, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(workflows.reduce((sum, w) => sum + w.stats.successRate, 0) / workflows.length).toFixed(1)}%
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold">2.3s</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Timer className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="workflows">All Workflows</TabsTrigger>
            <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="logs">Execution Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search workflows..." className="pl-10" />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Workflows</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Workflows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkflows.map(renderWorkflowCard)}
            </div>

            {filteredWorkflows.length === 0 && (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <Workflow className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">No workflows found</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first workflow to automate form submissions
                    </p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Workflow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            {renderWorkflowBuilder()}
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Lead Qualification',
                  description: 'Automatically qualify leads and route to sales team',
                  icon: Target,
                  steps: 4
                },
                {
                  name: 'Email Follow-up Sequence',
                  description: 'Send a series of follow-up emails to new leads',
                  icon: Mail,
                  steps: 6
                },
                {
                  name: 'CRM Integration',
                  description: 'Sync form submissions with your CRM system',
                  icon: Building,
                  steps: 3
                },
                {
                  name: 'SMS Notifications',
                  description: 'Send instant SMS alerts for urgent submissions',
                  icon: MessageSquare,
                  steps: 2
                },
                {
                  name: 'Data Enrichment',
                  description: 'Enrich lead data with external APIs',
                  icon: Database,
                  steps: 5
                },
                {
                  name: 'Multi-channel Marketing',
                  description: 'Coordinate email, SMS, and social media outreach',
                  icon: Zap,
                  steps: 8
                }
              ].map((template, index) => {
                const Icon = template.icon;
                return (
                  <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {template.steps} steps
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Execution Logs</CardTitle>
                <CardDescription>
                  Monitor workflow executions and troubleshoot issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      workflow: 'Lead Qualification & Follow-up',
                      status: 'success',
                      execution: '2024-01-19 17:23:45',
                      duration: '2.3s',
                      trigger: 'Form submission from John Doe'
                    },
                    {
                      workflow: 'Enterprise Lead Routing',
                      status: 'success',
                      execution: '2024-01-19 17:18:32',
                      duration: '1.8s',
                      trigger: 'Form submission from Acme Corp'
                    },
                    {
                      workflow: 'Data Enrichment & Scoring',
                      status: 'error',
                      execution: '2024-01-19 17:15:21',
                      duration: '5.2s',
                      trigger: 'API timeout - Clearbit enrichment'
                    },
                    {
                      workflow: 'Lead Qualification & Follow-up',
                      status: 'success',
                      execution: '2024-01-19 17:12:09',
                      duration: '1.9s',
                      trigger: 'Form submission from Jane Smith'
                    }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {log.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{log.workflow}</p>
                          <p className="text-xs text-muted-foreground">{log.trigger}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{log.execution}</p>
                        <p className="text-xs text-muted-foreground">{log.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Workflow Dialog */}
      {showCreateDialog && (
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>
                Set up automated actions for form submissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Workflow Name</Label>
                <Input placeholder="Enter workflow name" className="mt-1" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Describe what this workflow does..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Trigger</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="form_submission">Form Submission</SelectItem>
                      <SelectItem value="field_change">Field Change</SelectItem>
                      <SelectItem value="time_based">Time-based</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Immediately</Label>
                  <p className="text-sm text-muted-foreground">
                    Start running this workflow after creation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowCreateDialog(false);
                setSelectedTab('builder');
              }}>
                Create & Configure
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FormWorkflows;
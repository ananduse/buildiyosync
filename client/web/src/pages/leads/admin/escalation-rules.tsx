import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Copy,
  Save,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUp,
  TrendingUp,
  Activity,
  BarChart3,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Bell,
  Calendar,
  Timer,
  Zap,
  Settings,
  Eye,
  Play,
  Pause,
  Target,
  Flag,
  Layers,
  GitBranch,
  Route,
  ShieldAlert,
  Workflow,
  AlertCircle,
  Info,
  Star,
  Hash,
  ChevronRight,
  ChevronDown,
  FileText,
  Database,
  Link2,
  Webhook,
  Send,
  UserPlus,
  Building,
  DollarSign,
  Percent,
  Calendar as CalendarIcon
} from 'lucide-react';

interface EscalationRule {
  id: string;
  name: string;
  description: string;
  category: 'time_based' | 'value_based' | 'activity_based' | 'status_based' | 'custom';
  priority: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  triggers: EscalationTrigger[];
  conditions: EscalationCondition[];
  actions: EscalationAction[];
  schedule: EscalationSchedule;
  notifications: EscalationNotification[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  stats: {
    totalTriggered: number;
    successfulEscalations: number;
    failedEscalations: number;
    avgEscalationTime: number;
    lastTriggered?: string;
  };
}

interface EscalationTrigger {
  id: string;
  type: 'time_delay' | 'inactivity' | 'missed_milestone' | 'threshold_breach' | 'status_change' | 'date_based';
  parameters: {
    duration?: number;
    unit?: 'minutes' | 'hours' | 'days' | 'weeks';
    threshold?: number;
    field?: string;
    value?: any;
    operator?: 'equals' | 'greater_than' | 'less_than' | 'contains';
  };
}

interface EscalationCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'exists';
  value: any;
  logicalOperator?: 'and' | 'or';
}

interface EscalationAction {
  id: string;
  type: 'reassign' | 'notify' | 'create_task' | 'send_email' | 'update_status' | 'add_tag' | 'webhook' | 'escalate_to_manager';
  parameters: {
    userId?: string;
    managerId?: string;
    message?: string;
    priority?: string;
    template?: string;
    webhook_url?: string;
    tag?: string;
    status?: string;
  };
  delay?: number;
  retryAttempts?: number;
}

interface EscalationSchedule {
  enabled: boolean;
  businessHoursOnly: boolean;
  timezone: string;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
  excludeHolidays: boolean;
}

interface EscalationNotification {
  id: string;
  recipient: 'owner' | 'manager' | 'team' | 'custom';
  recipientId?: string;
  method: 'email' | 'sms' | 'push' | 'slack' | 'teams';
  template: string;
  timing: 'immediate' | 'delayed' | 'scheduled';
  delay?: number;
}

interface EscalationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  rules: Partial<EscalationRule>[];
  useCase: string;
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

interface EscalationStats {
  totalRules: number;
  activeRules: number;
  totalEscalations: number;
  successRate: number;
  avgResponseTime: number;
  criticalEscalations: number;
  recentEscalations: number;
  topTrigger: string;
}

const EscalationRules: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreatingRule, setIsCreatingRule] = useState(false);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  // Mock escalation rules
  const escalationRules: EscalationRule[] = [
    {
      id: 'rule-001',
      name: 'High-Value Lead Inactivity',
      description: 'Escalate high-value leads that have been inactive for 24 hours',
      category: 'time_based',
      priority: 'high',
      isActive: true,
      triggers: [
        {
          id: 'trigger-001',
          type: 'inactivity',
          parameters: {
            duration: 24,
            unit: 'hours'
          }
        }
      ],
      conditions: [
        {
          id: 'cond-001',
          field: 'leadValue',
          operator: 'greater_than',
          value: 50000
        },
        {
          id: 'cond-002',
          field: 'status',
          operator: 'equals',
          value: 'qualified',
          logicalOperator: 'and'
        }
      ],
      actions: [
        {
          id: 'action-001',
          type: 'escalate_to_manager',
          parameters: {
            message: 'High-value lead requires immediate attention'
          }
        },
        {
          id: 'action-002',
          type: 'create_task',
          parameters: {
            priority: 'high',
            message: 'Follow up on high-value lead'
          },
          delay: 0
        }
      ],
      schedule: {
        enabled: true,
        businessHoursOnly: true,
        timezone: 'America/New_York',
        workingHours: { start: '09:00', end: '17:00' },
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        excludeHolidays: true
      },
      notifications: [
        {
          id: 'notif-001',
          recipient: 'manager',
          method: 'email',
          template: 'high_value_escalation',
          timing: 'immediate'
        }
      ],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-01T10:00:00Z',
      stats: {
        totalTriggered: 23,
        successfulEscalations: 21,
        failedEscalations: 2,
        avgEscalationTime: 1.2,
        lastTriggered: '2024-01-18T14:30:00Z'
      }
    },
    {
      id: 'rule-002',
      name: 'Overdue Follow-up Escalation',
      description: 'Escalate leads with overdue follow-up tasks',
      category: 'activity_based',
      priority: 'medium',
      isActive: true,
      triggers: [
        {
          id: 'trigger-002',
          type: 'missed_milestone',
          parameters: {
            field: 'nextFollowUp',
            duration: 2,
            unit: 'days'
          }
        }
      ],
      conditions: [
        {
          id: 'cond-003',
          field: 'hasOpenTasks',
          operator: 'equals',
          value: true
        }
      ],
      actions: [
        {
          id: 'action-003',
          type: 'notify',
          parameters: {
            userId: 'owner',
            message: 'You have overdue follow-up tasks'
          }
        },
        {
          id: 'action-004',
          type: 'escalate_to_manager',
          parameters: {
            message: 'Team member has overdue follow-ups'
          },
          delay: 24
        }
      ],
      schedule: {
        enabled: true,
        businessHoursOnly: false,
        timezone: 'America/New_York',
        workingHours: { start: '09:00', end: '17:00' },
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        excludeHolidays: false
      },
      notifications: [
        {
          id: 'notif-002',
          recipient: 'owner',
          method: 'email',
          template: 'overdue_followup',
          timing: 'immediate'
        }
      ],
      createdBy: 'sales@company.com',
      createdAt: '2024-01-02T11:30:00Z',
      stats: {
        totalTriggered: 45,
        successfulEscalations: 43,
        failedEscalations: 2,
        avgEscalationTime: 0.8,
        lastTriggered: '2024-01-18T09:15:00Z'
      }
    },
    {
      id: 'rule-003',
      name: 'Critical Deal Risk Alert',
      description: 'Immediate escalation for deals at risk of being lost',
      category: 'value_based',
      priority: 'critical',
      isActive: true,
      triggers: [
        {
          id: 'trigger-003',
          type: 'status_change',
          parameters: {
            field: 'status',
            value: 'at_risk'
          }
        }
      ],
      conditions: [
        {
          id: 'cond-004',
          field: 'dealValue',
          operator: 'greater_than',
          value: 100000
        }
      ],
      actions: [
        {
          id: 'action-005',
          type: 'escalate_to_manager',
          parameters: {
            message: 'CRITICAL: High-value deal at risk'
          }
        },
        {
          id: 'action-006',
          type: 'webhook',
          parameters: {
            webhook_url: 'https://api.company.com/alerts/critical'
          }
        }
      ],
      schedule: {
        enabled: true,
        businessHoursOnly: false,
        timezone: 'America/New_York',
        workingHours: { start: '00:00', end: '23:59' },
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        excludeHolidays: false
      },
      notifications: [
        {
          id: 'notif-003',
          recipient: 'manager',
          method: 'sms',
          template: 'critical_deal_risk',
          timing: 'immediate'
        }
      ],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-03T15:45:00Z',
      stats: {
        totalTriggered: 8,
        successfulEscalations: 8,
        failedEscalations: 0,
        avgEscalationTime: 0.1,
        lastTriggered: '2024-01-17T16:22:00Z'
      }
    },
    {
      id: 'rule-004',
      name: 'Lead Age Threshold',
      description: 'Escalate old leads that haven\'t been contacted',
      category: 'time_based',
      priority: 'low',
      isActive: false,
      triggers: [
        {
          id: 'trigger-004',
          type: 'time_delay',
          parameters: {
            duration: 7,
            unit: 'days'
          }
        }
      ],
      conditions: [
        {
          id: 'cond-005',
          field: 'lastContactDate',
          operator: 'exists',
          value: false
        }
      ],
      actions: [
        {
          id: 'action-007',
          type: 'reassign',
          parameters: {
            userId: 'lead-specialist'
          }
        }
      ],
      schedule: {
        enabled: true,
        businessHoursOnly: true,
        timezone: 'America/New_York',
        workingHours: { start: '09:00', end: '17:00' },
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        excludeHolidays: true
      },
      notifications: [
        {
          id: 'notif-004',
          recipient: 'team',
          method: 'email',
          template: 'lead_reassignment',
          timing: 'immediate'
        }
      ],
      createdBy: 'marketing@company.com',
      createdAt: '2024-01-04T09:20:00Z',
      stats: {
        totalTriggered: 156,
        successfulEscalations: 142,
        failedEscalations: 14,
        avgEscalationTime: 2.4,
        lastTriggered: '2024-01-16T11:45:00Z'
      }
    }
  ];

  // Mock templates
  const templates: EscalationTemplate[] = [
    {
      id: 'template-001',
      name: 'Enterprise Sales Escalation',
      description: 'Standard escalation rules for enterprise sales process',
      category: 'sales',
      rules: [
        { name: 'High-Value Inactivity', priority: 'high' },
        { name: 'Deal Risk Alert', priority: 'critical' },
        { name: 'Manager Review Required', priority: 'medium' }
      ],
      useCase: 'Large deal management and oversight',
      isDefault: true,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    },
    {
      id: 'template-002',
      name: 'SMB Quick Response',
      description: 'Fast escalation rules for small business leads',
      category: 'smb',
      rules: [
        { name: 'Rapid Response Required', priority: 'high' },
        { name: 'Follow-up Reminder', priority: 'medium' }
      ],
      useCase: 'High-velocity sales environments',
      isDefault: false,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    }
  ];

  // Mock stats
  const stats: EscalationStats = {
    totalRules: 15,
    activeRules: 12,
    totalEscalations: 342,
    successRate: 94.7,
    avgResponseTime: 1.8,
    criticalEscalations: 23,
    recentEscalations: 18,
    topTrigger: 'Inactivity Detection'
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'time_based': return Clock;
      case 'value_based': return DollarSign;
      case 'activity_based': return Activity;
      case 'status_based': return Flag;
      case 'custom': return Settings;
      default: return AlertTriangle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'time_based': return 'bg-blue-100 text-blue-800';
      case 'value_based': return 'bg-green-100 text-green-800';
      case 'activity_based': return 'bg-purple-100 text-purple-800';
      case 'status_based': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low': return Info;
      case 'medium': return AlertCircle;
      case 'high': return AlertTriangle;
      case 'critical': return ShieldAlert;
      default: return Info;
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'reassign': return UserPlus;
      case 'notify': return Bell;
      case 'create_task': return CheckCircle;
      case 'send_email': return Mail;
      case 'update_status': return Flag;
      case 'add_tag': return Hash;
      case 'webhook': return Webhook;
      case 'escalate_to_manager': return ArrowUp;
      default: return Zap;
    }
  };

  const filteredRules = escalationRules.filter(rule => {
    const matchesSearch = 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || rule.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || rule.priority === priorityFilter;
    const matchesStatus = showInactive || rule.isActive;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const handleToggleRule = (ruleId: string) => {
    console.log('Toggling rule:', ruleId);
  };

  const handleDeleteRule = (ruleId: string) => {
    console.log('Deleting rule:', ruleId);
  };

  const handleDuplicateRule = (ruleId: string) => {
    console.log('Duplicating rule:', ruleId);
  };

  const handleTestRule = (ruleId: string) => {
    console.log('Testing rule:', ruleId);
  };

  const createRule = () => {
    setIsCreatingRule(true);
  };

  const applyTemplate = (templateId: string) => {
    console.log('Applying template:', templateId);
  };

  const formatDuration = (duration: number, unit: string): string => {
    return `${duration} ${unit}${duration > 1 ? 's' : ''}`;
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Escalation Rules</h1>
          <p className="text-muted-foreground mt-2">
            Automate lead escalation based on time, activity, and value thresholds
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button onClick={createRule}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{stats.activeRules}</p>
                <p className="text-xs text-muted-foreground">of {stats.totalRules} total</p>
              </div>
              <Workflow className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{stats.avgResponseTime}h</p>
                <p className="text-xs text-muted-foreground">Time to escalate</p>
              </div>
              <Timer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold">{stats.criticalEscalations}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Escalation Rules</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escalation Rules</CardTitle>
              <CardDescription>
                Define automated escalation workflows based on triggers and conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rules..."
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
                  <option value="time_based">Time-based</option>
                  <option value="value_based">Value-based</option>
                  <option value="activity_based">Activity-based</option>
                  <option value="status_based">Status-based</option>
                  <option value="custom">Custom</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={showInactive}
                    onCheckedChange={setShowInactive}
                  />
                  <Label className="text-sm">Show Inactive</Label>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {filteredRules.map((rule) => {
                  const CategoryIcon = getCategoryIcon(rule.category);
                  const PriorityIcon = getPriorityIcon(rule.priority);
                  const isExpanded = expandedRule === rule.id;
                  
                  return (
                    <Card key={rule.id} className={`${!rule.isActive ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`p-2 rounded-lg ${rule.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <CategoryIcon className={`h-6 w-6 ${rule.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                      {rule.name}
                                      <PriorityIcon className="h-4 w-4" />
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {rule.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={getCategoryColor(rule.category)}>
                                      {rule.category.replace('_', ' ')}
                                    </Badge>
                                    <Badge className={getPriorityColor(rule.priority)}>
                                      {rule.priority}
                                    </Badge>
                                    <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                      {rule.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Activity className="h-3 w-3" />
                                    <span>{rule.stats.totalTriggered} triggered</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>{rule.stats.successfulEscalations} successful</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Timer className="h-3 w-3" />
                                    <span>{rule.stats.avgEscalationTime}h avg time</span>
                                  </div>
                                  {rule.stats.lastTriggered && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>Last: {formatDateTime(rule.stats.lastTriggered)}</span>
                                    </div>
                                  )}
                                </div>

                                {/* Expandable Details */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                                  className="p-0 h-auto text-blue-600 hover:text-blue-700"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronDown className="h-4 w-4 mr-1" />
                                      Hide Details
                                    </>
                                  ) : (
                                    <>
                                      <ChevronRight className="h-4 w-4 mr-1" />
                                      Show Details
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-4">
                              <Switch
                                checked={rule.isActive}
                                onCheckedChange={() => handleToggleRule(rule.id)}
                              />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleTestRule(rule.id)}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingRule(rule.id)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDuplicateRule(rule.id)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteRule(rule.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="border-t pt-4 space-y-4">
                              {/* Triggers */}
                              <div>
                                <h4 className="font-medium mb-2">Triggers</h4>
                                <div className="space-y-2">
                                  {rule.triggers.map((trigger) => (
                                    <div key={trigger.id} className="flex items-center gap-2 text-sm bg-blue-50 p-3 rounded">
                                      <Zap className="h-4 w-4 text-blue-600" />
                                      <span className="capitalize">{trigger.type.replace('_', ' ')}</span>
                                      {trigger.parameters.duration && trigger.parameters.unit && (
                                        <Badge variant="outline">
                                          {formatDuration(trigger.parameters.duration, trigger.parameters.unit)}
                                        </Badge>
                                      )}
                                      {trigger.parameters.field && trigger.parameters.value && (
                                        <Badge variant="outline">
                                          {trigger.parameters.field} = {trigger.parameters.value}
                                        </Badge>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Conditions */}
                              {rule.conditions.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Conditions</h4>
                                  <div className="space-y-1">
                                    {rule.conditions.map((condition, index) => (
                                      <div key={condition.id} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                                        {index > 0 && condition.logicalOperator && (
                                          <Badge variant="outline" className="text-xs">
                                            {condition.logicalOperator.toUpperCase()}
                                          </Badge>
                                        )}
                                        <span className="font-mono">{condition.field}</span>
                                        <span>{condition.operator.replace('_', ' ')}</span>
                                        <span className="font-mono">{condition.value?.toString()}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div>
                                <h4 className="font-medium mb-2">Actions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {rule.actions.map((action) => {
                                    const ActionIcon = getActionIcon(action.type);
                                    return (
                                      <div key={action.id} className="flex items-center gap-2 text-sm bg-green-50 p-3 rounded">
                                        <ActionIcon className="h-4 w-4 text-green-600" />
                                        <span className="capitalize">{action.type.replace('_', ' ')}</span>
                                        {action.delay && (
                                          <Badge variant="outline" className="text-xs">
                                            +{action.delay}h delay
                                          </Badge>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Schedule */}
                              <div>
                                <h4 className="font-medium mb-2">Schedule</h4>
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>
                                      {rule.schedule.businessHoursOnly ? 'Business hours only' : '24/7'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    <span>{rule.schedule.timezone}</span>
                                  </div>
                                  {rule.schedule.businessHoursOnly && (
                                    <Badge variant="outline">
                                      {rule.schedule.workingHours.start} - {rule.schedule.workingHours.end}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredRules.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No escalation rules found</h3>
                  <p className="text-muted-foreground mt-2">
                    No rules match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escalation Templates</CardTitle>
              <CardDescription>
                Pre-built escalation rule sets for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.isDefault && (
                          <Badge>Default</Badge>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Use case: {template.useCase}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Rules ({template.rules.length}):</p>
                          <div className="space-y-1">
                            {template.rules.map((rule, index) => (
                              <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                                <span>{rule.name}</span>
                                <Badge className={getPriorityColor(rule.priority || 'medium')}>
                                  {rule.priority}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => applyTemplate(template.id)}
                          >
                            Apply Template
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3 mr-1" />
                            Clone
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
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
                <CardTitle>Rule Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {escalationRules.slice(0, 5).map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{rule.name}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{rule.stats.totalTriggered} triggers</span>
                          <span>{((rule.stats.successfulEscalations / rule.stats.totalTriggered) * 100).toFixed(1)}% success</span>
                        </div>
                      </div>
                      <Badge className={rule.stats.avgEscalationTime < 2 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {rule.stats.avgEscalationTime}h
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Time-based</span>
                    </div>
                    <Badge>2 rules</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span>Value-based</span>
                    </div>
                    <Badge>1 rule</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-600" />
                      <span>Activity-based</span>
                    </div>
                    <Badge>1 rule</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-orange-600" />
                      <span>Status-based</span>
                    </div>
                    <Badge>0 rules</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Escalation Settings</CardTitle>
              <CardDescription>
                Configure global escalation parameters and defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-timezone">Default Timezone</Label>
                    <Input
                      id="default-timezone"
                      defaultValue="America/New_York"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="max-retries">Maximum Retry Attempts</Label>
                    <Input
                      id="max-retries"
                      type="number"
                      defaultValue="3"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Escalation Logging</Label>
                      <p className="text-sm text-muted-foreground">
                        Log all escalation activities
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Business Hours Only Default</Label>
                      <p className="text-sm text-muted-foreground">
                        New rules default to business hours
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notification-delay">Default Notification Delay (minutes)</Label>
                    <Input
                      id="notification-delay"
                      type="number"
                      defaultValue="0"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="escalation-limit">Daily Escalation Limit</Label>
                    <Input
                      id="escalation-limit"
                      type="number"
                      defaultValue="100"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Send Digest Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly escalation summaries
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-disable Failing Rules</Label>
                      <p className="text-sm text-muted-foreground">
                        Disable rules with high failure rates
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
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

export default EscalationRules;
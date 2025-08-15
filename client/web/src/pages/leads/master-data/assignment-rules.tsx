import { useState, useMemo } from 'react';
import {
  Route,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Activity,
  DollarSign,
  Users,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Building2,
  Home,
  Globe,
  Navigation,
  Map,
  Compass,
  Locate,
  MapIcon,
  Crosshair,
  Landmark,
  TreePine,
  Mountain,
  Waves,
  Layers,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Tag,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Gauge,
  User,
  UserCheck,
  UserX,
  Crown,
  Key,
  Lock,
  Unlock,
  Badge as BadgeIcon,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Video,
  GitBranch,
  Workflow,
  Play,
  Pause,
  Square,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Hash,
  Percent,
  Timer,
  Shuffle,
  BarChart2,
  TrendingUpIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Condition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'in_range' | 'is_empty' | 'is_not_empty';
  value: string | number | string[];
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'array';
}

interface Action {
  id: string;
  type: 'assign_user' | 'assign_team' | 'set_priority' | 'set_status' | 'add_tag' | 'send_notification' | 'create_task' | 'send_email';
  parameters: {
    [key: string]: any;
  };
}

interface AssignmentRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  isActive: boolean;
  category: 'lead_routing' | 'territory_based' | 'skill_based' | 'workload_balancing' | 'escalation' | 'follow_up';
  trigger: 'lead_created' | 'lead_updated' | 'time_based' | 'manual' | 'status_changed';
  conditions: {
    operator: 'AND' | 'OR';
    groups: {
      operator: 'AND' | 'OR';
      conditions: Condition[];
    }[];
  };
  actions: Action[];
  schedule?: {
    type: 'immediate' | 'delayed' | 'recurring';
    delay?: number; // in minutes
    recurringPattern?: 'daily' | 'weekly' | 'monthly';
    workingHoursOnly?: boolean;
  };
  performance: {
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    avgExecutionTime: number;
    lastExecuted?: Date;
    leadsProcessed: number;
    conversionImpact: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: Omit<AssignmentRule, 'id' | 'performance' | 'createdAt' | 'updatedAt' | 'createdBy'>;
}

// Mock data
const mockAssignmentRules: AssignmentRule[] = [
  {
    id: 'RULE001',
    name: 'High Value Lead Assignment',
    description: 'Routes high-value leads to senior sales agents',
    priority: 1,
    isActive: true,
    category: 'lead_routing',
    trigger: 'lead_created',
    conditions: {
      operator: 'AND',
      groups: [
        {
          operator: 'OR',
          conditions: [
            {
              id: 'C001',
              field: 'estimated_value',
              operator: 'greater_than',
              value: 50000,
              dataType: 'number'
            },
            {
              id: 'C002',
              field: 'lead_source',
              operator: 'equals',
              value: 'Referral',
              dataType: 'string'
            }
          ]
        },
        {
          operator: 'AND',
          conditions: [
            {
              id: 'C003',
              field: 'status',
              operator: 'equals',
              value: 'New',
              dataType: 'string'
            }
          ]
        }
      ]
    },
    actions: [
      {
        id: 'A001',
        type: 'assign_user',
        parameters: {
          userId: 'USER001',
          priority: 'high'
        }
      },
      {
        id: 'A002',
        type: 'send_notification',
        parameters: {
          recipient: 'USER001',
          message: 'High-value lead assigned',
          channels: ['email', 'push']
        }
      }
    ],
    schedule: {
      type: 'immediate',
      workingHoursOnly: false
    },
    performance: {
      totalExecutions: 156,
      successfulExecutions: 154,
      failedExecutions: 2,
      avgExecutionTime: 1.2,
      lastExecuted: new Date(2024, 0, 20, 14, 30),
      leadsProcessed: 156,
      conversionImpact: 23.5
    },
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 15),
    createdBy: 'Admin'
  },
  {
    id: 'RULE002',
    name: 'Territory-Based Assignment',
    description: 'Assigns leads to agents based on geographical territories',
    priority: 2,
    isActive: true,
    category: 'territory_based',
    trigger: 'lead_created',
    conditions: {
      operator: 'AND',
      groups: [
        {
          operator: 'OR',
          conditions: [
            {
              id: 'C004',
              field: 'location',
              operator: 'contains',
              value: 'California',
              dataType: 'string'
            },
            {
              id: 'C005',
              field: 'zip_code',
              operator: 'in_range',
              value: ['90000', '96999'],
              dataType: 'array'
            }
          ]
        }
      ]
    },
    actions: [
      {
        id: 'A003',
        type: 'assign_team',
        parameters: {
          teamId: 'TEAM001',
          distributionMethod: 'round_robin'
        }
      }
    ],
    schedule: {
      type: 'immediate',
      workingHoursOnly: true
    },
    performance: {
      totalExecutions: 423,
      successfulExecutions: 418,
      failedExecutions: 5,
      avgExecutionTime: 0.8,
      lastExecuted: new Date(2024, 0, 20, 16, 45),
      leadsProcessed: 423,
      conversionImpact: 18.7
    },
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2024, 0, 10),
    createdBy: 'Admin'
  },
  {
    id: 'RULE003',
    name: 'Workload Balancing',
    description: 'Distributes leads evenly among available agents',
    priority: 3,
    isActive: true,
    category: 'workload_balancing',
    trigger: 'lead_created',
    conditions: {
      operator: 'AND',
      groups: [
        {
          operator: 'AND',
          conditions: [
            {
              id: 'C006',
              field: 'assigned_user',
              operator: 'is_empty',
              value: '',
              dataType: 'string'
            },
            {
              id: 'C007',
              field: 'priority',
              operator: 'not_equals',
              value: 'urgent',
              dataType: 'string'
            }
          ]
        }
      ]
    },
    actions: [
      {
        id: 'A004',
        type: 'assign_user',
        parameters: {
          strategy: 'least_loaded',
          teamId: 'TEAM001'
        }
      }
    ],
    schedule: {
      type: 'immediate',
      workingHoursOnly: true
    },
    performance: {
      totalExecutions: 789,
      successfulExecutions: 781,
      failedExecutions: 8,
      avgExecutionTime: 1.5,
      lastExecuted: new Date(2024, 0, 20, 17, 20),
      leadsProcessed: 789,
      conversionImpact: 15.2
    },
    createdAt: new Date(2023, 9, 20),
    updatedAt: new Date(2024, 0, 5),
    createdBy: 'Admin'
  },
  {
    id: 'RULE004',
    name: 'Follow-up Escalation',
    description: 'Escalates leads without response after 24 hours',
    priority: 4,
    isActive: true,
    category: 'escalation',
    trigger: 'time_based',
    conditions: {
      operator: 'AND',
      groups: [
        {
          operator: 'AND',
          conditions: [
            {
              id: 'C008',
              field: 'last_activity',
              operator: 'greater_than',
              value: 24,
              dataType: 'number'
            },
            {
              id: 'C009',
              field: 'status',
              operator: 'equals',
              value: 'Contacted',
              dataType: 'string'
            }
          ]
        }
      ]
    },
    actions: [
      {
        id: 'A005',
        type: 'assign_user',
        parameters: {
          userId: 'USER001',
          escalation: true
        }
      },
      {
        id: 'A006',
        type: 'set_priority',
        parameters: {
          priority: 'high'
        }
      },
      {
        id: 'A007',
        type: 'send_notification',
        parameters: {
          recipient: 'USER001',
          message: 'Lead escalated due to no response',
          channels: ['email']
        }
      }
    ],
    schedule: {
      type: 'delayed',
      delay: 1440, // 24 hours
      workingHoursOnly: false
    },
    performance: {
      totalExecutions: 67,
      successfulExecutions: 65,
      failedExecutions: 2,
      avgExecutionTime: 2.1,
      lastExecuted: new Date(2024, 0, 19, 9, 15),
      leadsProcessed: 67,
      conversionImpact: 31.8
    },
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2023, 12, 20),
    createdBy: 'Admin'
  },
  {
    id: 'RULE005',
    name: 'Skill-Based Assignment',
    description: 'Routes commercial leads to agents with commercial expertise',
    priority: 2,
    isActive: true,
    category: 'skill_based',
    trigger: 'lead_created',
    conditions: {
      operator: 'AND',
      groups: [
        {
          operator: 'OR',
          conditions: [
            {
              id: 'C010',
              field: 'project_type',
              operator: 'contains',
              value: 'Commercial',
              dataType: 'string'
            },
            {
              id: 'C011',
              field: 'estimated_value',
              operator: 'greater_than',
              value: 100000,
              dataType: 'number'
            }
          ]
        }
      ]
    },
    actions: [
      {
        id: 'A008',
        type: 'assign_user',
        parameters: {
          skillRequired: 'Commercial Construction',
          teamId: 'TEAM002'
        }
      },
      {
        id: 'A009',
        type: 'add_tag',
        parameters: {
          tags: ['commercial', 'high-value']
        }
      }
    ],
    schedule: {
      type: 'immediate',
      workingHoursOnly: true
    },
    performance: {
      totalExecutions: 234,
      successfulExecutions: 228,
      failedExecutions: 6,
      avgExecutionTime: 1.8,
      lastExecuted: new Date(2024, 0, 20, 11, 30),
      leadsProcessed: 234,
      conversionImpact: 26.4
    },
    createdAt: new Date(2023, 7, 25),
    updatedAt: new Date(2024, 0, 8),
    createdBy: 'Admin'
  }
];

const mockRuleTemplates: RuleTemplate[] = [
  {
    id: 'TPL001',
    name: 'Round Robin Assignment',
    description: 'Distribute leads evenly among team members',
    category: 'workload_balancing',
    template: {
      name: 'Round Robin Assignment',
      description: 'Distribute leads evenly among team members',
      priority: 5,
      isActive: true,
      category: 'workload_balancing',
      trigger: 'lead_created',
      conditions: {
        operator: 'AND',
        groups: [
          {
            operator: 'AND',
            conditions: [
              {
                id: 'C_TPL001',
                field: 'assigned_user',
                operator: 'is_empty',
                value: '',
                dataType: 'string'
              }
            ]
          }
        ]
      },
      actions: [
        {
          id: 'A_TPL001',
          type: 'assign_team',
          parameters: {
            teamId: '',
            distributionMethod: 'round_robin'
          }
        }
      ],
      schedule: {
        type: 'immediate',
        workingHoursOnly: true
      }
    }
  },
  {
    id: 'TPL002',
    name: 'VIP Lead Routing',
    description: 'Route high-priority leads to senior agents',
    category: 'lead_routing',
    template: {
      name: 'VIP Lead Routing',
      description: 'Route high-priority leads to senior agents',
      priority: 1,
      isActive: true,
      category: 'lead_routing',
      trigger: 'lead_created',
      conditions: {
        operator: 'OR',
        groups: [
          {
            operator: 'OR',
            conditions: [
              {
                id: 'C_TPL002',
                field: 'priority',
                operator: 'equals',
                value: 'urgent',
                dataType: 'string'
              },
              {
                id: 'C_TPL003',
                field: 'estimated_value',
                operator: 'greater_than',
                value: 75000,
                dataType: 'number'
              }
            ]
          }
        ]
      },
      actions: [
        {
          id: 'A_TPL002',
          type: 'assign_user',
          parameters: {
            role: 'senior_agent',
            priority: 'high'
          }
        },
        {
          id: 'A_TPL003',
          type: 'send_notification',
          parameters: {
            message: 'VIP lead requires immediate attention',
            channels: ['email', 'sms']
          }
        }
      ],
      schedule: {
        type: 'immediate',
        workingHoursOnly: false
      }
    }
  }
];

// Helper functions
function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getSuccessRate(rule: AssignmentRule): number {
  return rule.performance.totalExecutions > 0 
    ? (rule.performance.successfulExecutions / rule.performance.totalExecutions) * 100 
    : 0;
}

function getCategoryIcon(category: AssignmentRule['category']) {
  switch (category) {
    case 'lead_routing': return Route;
    case 'territory_based': return MapPin;
    case 'skill_based': return Award;
    case 'workload_balancing': return BarChart2;
    case 'escalation': return TrendingUpIcon;
    case 'follow_up': return Clock;
    default: return Route;
  }
}

function getCategoryColor(category: AssignmentRule['category']) {
  switch (category) {
    case 'lead_routing': return 'bg-blue-500';
    case 'territory_based': return 'bg-emerald-500';
    case 'skill_based': return 'bg-purple-500';
    case 'workload_balancing': return 'bg-amber-500';
    case 'escalation': return 'bg-red-500';
    case 'follow_up': return 'bg-indigo-500';
    default: return 'bg-gray-500';
  }
}

function getTriggerIcon(trigger: AssignmentRule['trigger']) {
  switch (trigger) {
    case 'lead_created': return Plus;
    case 'lead_updated': return Edit;
    case 'time_based': return Clock;
    case 'manual': return User;
    case 'status_changed': return RefreshCw;
    default: return Zap;
  }
}

function getOperatorSymbol(operator: string) {
  switch (operator) {
    case 'equals': return '=';
    case 'not_equals': return '≠';
    case 'contains': return '⊃';
    case 'not_contains': return '⊅';
    case 'greater_than': return '>';
    case 'less_than': return '<';
    case 'in_range': return '∈';
    case 'is_empty': return '∅';
    case 'is_not_empty': return '≢∅';
    default: return '?';
  }
}

function AssignmentRuleCard({ rule, onEdit, onView, onToggle, onDelete, onTest }: {
  rule: AssignmentRule;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onTest: () => void;
}) {
  const CategoryIcon = getCategoryIcon(rule.category);
  const TriggerIcon = getTriggerIcon(rule.trigger);
  const successRate = getSuccessRate(rule);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={cn("p-2 rounded-lg text-white", getCategoryColor(rule.category))}>
              <CategoryIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{rule.name}</h3>
                <Badge variant="outline" className="text-xs">
                  P{rule.priority}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {rule.category.replace('_', ' ')}
                </Badge>
                {!rule.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <TriggerIcon className="h-3 w-3" />
                  <span className="capitalize">{rule.trigger.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Hash className="h-3 w-3" />
                  <span>{rule.conditions.groups.length} condition groups</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3" />
                  <span>{rule.actions.length} actions</span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Rule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onTest}>
                <Play className="h-4 w-4 mr-2" />
                Test Rule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {rule.isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Rule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold">{rule.performance.totalExecutions}</p>
            <p className="text-xs text-gray-500">Executions</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-green-600">{successRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Success Rate</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Leads Processed:</span>
            <span className="font-medium">{formatNumber(rule.performance.leadsProcessed)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Execution:</span>
            <span className="font-medium">{rule.performance.avgExecutionTime.toFixed(1)}s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Conversion Impact:</span>
            <span className="font-medium text-emerald-600">+{rule.performance.conversionImpact}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Executed:</span>
            <span className="font-medium">
              {rule.performance.lastExecuted 
                ? new Date(rule.performance.lastExecuted).toLocaleDateString()
                : 'Never'
              }
            </span>
          </div>
        </div>
        
        {/* Rule Status */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <div className={cn("w-2 h-2 rounded-full", rule.isActive ? "bg-emerald-500" : "bg-red-500")} />
            <span className="text-sm text-gray-600">
              {rule.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            Updated {new Date(rule.updatedAt).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function RuleTemplateCard({ template, onUse }: {
  template: RuleTemplate;
  onUse: () => void;
}) {
  const CategoryIcon = getCategoryIcon(template.template.category);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={cn("p-2 rounded-lg text-white", getCategoryColor(template.template.category))}>
              <CategoryIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant="secondary" className="text-xs capitalize">
                  {template.category.replace('_', ' ')}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Hash className="h-3 w-3" />
                  <span>{template.template.conditions.groups.length} conditions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3" />
                  <span>{template.template.actions.length} actions</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button size="sm" onClick={onUse}>
            <Plus className="h-4 w-4 mr-1" />
            Use Template
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export function AssignmentRules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTrigger, setSelectedTrigger] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('rules');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [rules, setRules] = useState(mockAssignmentRules);

  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesSearch = !searchQuery || 
        rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
      const matchesTrigger = selectedTrigger === 'all' || rule.trigger === selectedTrigger;
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'active' && rule.isActive) ||
        (selectedStatus === 'inactive' && !rule.isActive);
      
      return matchesSearch && matchesCategory && matchesTrigger && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedTrigger, selectedStatus, rules]);

  const overallStats = useMemo(() => {
    const totalRules = rules.length;
    const activeRules = rules.filter(r => r.isActive).length;
    const totalExecutions = rules.reduce((sum, r) => sum + r.performance.totalExecutions, 0);
    const totalLeadsProcessed = rules.reduce((sum, r) => sum + r.performance.leadsProcessed, 0);
    const avgSuccessRate = rules.length > 0 
      ? rules.reduce((sum, r) => sum + getSuccessRate(r), 0) / rules.length 
      : 0;
    const avgConversionImpact = rules.length > 0 
      ? rules.reduce((sum, r) => sum + r.performance.conversionImpact, 0) / rules.length 
      : 0;
    
    return { totalRules, activeRules, totalExecutions, totalLeadsProcessed, avgSuccessRate, avgConversionImpact };
  }, [rules]);

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Assignment Rules</h1>
              <Badge variant="secondary">{filteredRules.length} rules</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search rules..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="lead_routing">Lead Routing</SelectItem>
                  <SelectItem value="territory_based">Territory Based</SelectItem>
                  <SelectItem value="skill_based">Skill Based</SelectItem>
                  <SelectItem value="workload_balancing">Workload Balancing</SelectItem>
                  <SelectItem value="escalation">Escalation</SelectItem>
                  <SelectItem value="follow_up">Follow Up</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="rules">Assignment Rules</TabsTrigger>
              <TabsTrigger value="templates">Rule Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="logs">Execution Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Rules</p>
                        <p className="text-2xl font-bold">{overallStats.totalRules}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeRules} active</p>
                      </div>
                      <Route className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Executions</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalExecutions)}</p>
                        <p className="text-xs text-gray-500">All time</p>
                      </div>
                      <Zap className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Leads Processed</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalLeadsProcessed)}</p>
                        <p className="text-xs text-gray-500">Via automation</p>
                      </div>
                      <Users className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Success Rate</p>
                        <p className={cn("text-2xl font-bold", 
                          overallStats.avgSuccessRate > 95 ? "text-emerald-600" : 
                          overallStats.avgSuccessRate > 90 ? "text-amber-600" : "text-red-600"
                        )}>
                          {overallStats.avgSuccessRate.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Rule execution</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRules
                  .sort((a, b) => a.priority - b.priority)
                  .map((rule) => (
                    <AssignmentRuleCard
                      key={rule.id}
                      rule={rule}
                      onEdit={() => {}}
                      onView={() => {}}
                      onToggle={() => handleToggleRule(rule.id)}
                      onDelete={() => handleDeleteRule(rule.id)}
                      onTest={() => setShowTestDialog(true)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Rule Templates</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockRuleTemplates.map((template) => (
                  <RuleTemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => setShowAddDialog(true)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Rule Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Rule Performance Analysis</CardTitle>
                  <CardDescription>Performance metrics and impact analysis for assignment rules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rules
                      .sort((a, b) => b.performance.conversionImpact - a.performance.conversionImpact)
                      .map((rule) => {
                        const CategoryIcon = getCategoryIcon(rule.category);
                        const successRate = getSuccessRate(rule);
                        
                        return (
                          <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={cn("p-2 rounded-lg text-white", getCategoryColor(rule.category))}>
                                <CategoryIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{rule.name}</p>
                                <p className="text-sm text-gray-500">
                                  {rule.performance.totalExecutions} executions • {successRate.toFixed(1)}% success
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-right text-sm">
                              <div>
                                <p className="font-semibold text-emerald-600">+{rule.performance.conversionImpact}%</p>
                                <p className="text-gray-500">Impact</p>
                              </div>
                              <div>
                                <p className="font-semibold">{formatNumber(rule.performance.leadsProcessed)}</p>
                                <p className="text-gray-500">Leads</p>
                              </div>
                              <div>
                                <p className="font-semibold">{rule.performance.avgExecutionTime.toFixed(1)}s</p>
                                <p className="text-gray-500">Avg Time</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Category Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['lead_routing', 'territory_based', 'skill_based', 'workload_balancing', 'escalation', 'follow_up'].map((category) => {
                        const categoryRules = rules.filter(r => r.category === category);
                        const avgImpact = categoryRules.length > 0 
                          ? categoryRules.reduce((sum, r) => sum + r.performance.conversionImpact, 0) / categoryRules.length 
                          : 0;
                        const maxImpact = Math.max(...['lead_routing', 'territory_based', 'skill_based', 'workload_balancing', 'escalation', 'follow_up'].map(c => {
                          const rules_cat = rules.filter(r => r.category === c);
                          return rules_cat.length > 0 ? rules_cat.reduce((sum, r) => sum + r.performance.conversionImpact, 0) / rules_cat.length : 0;
                        }));
                        
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{category.replace('_', ' ')}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${maxImpact > 0 ? (avgImpact / maxImpact) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                +{avgImpact.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Execution Success Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rules
                        .sort((a, b) => getSuccessRate(b) - getSuccessRate(a))
                        .slice(0, 6)
                        .map((rule) => {
                          const successRate = getSuccessRate(rule);
                          
                          return (
                            <div key={rule.id} className="flex items-center justify-between">
                              <span className="text-sm">{rule.name}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-emerald-500 h-2 rounded-full"
                                    style={{ width: `${successRate}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12">
                                  {successRate.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Executions</CardTitle>
                  <CardDescription>Latest rule execution logs and results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rules
                      .filter(r => r.performance.lastExecuted)
                      .sort((a, b) => new Date(b.performance.lastExecuted!).getTime() - new Date(a.performance.lastExecuted!).getTime())
                      .slice(0, 10)
                      .map((rule) => {
                        const CategoryIcon = getCategoryIcon(rule.category);
                        
                        return (
                          <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={cn("p-2 rounded-lg text-white", getCategoryColor(rule.category))}>
                                <CategoryIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{rule.name}</p>
                                <p className="text-sm text-gray-500">
                                  {rule.performance.lastExecuted && new Date(rule.performance.lastExecuted).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <Badge variant={rule.performance.failedExecutions === 0 ? "default" : "destructive"}>
                                {rule.performance.failedExecutions === 0 ? 'Success' : 'Failed'}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {rule.performance.avgExecutionTime.toFixed(1)}s
                              </span>
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

        {/* Create Rule Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create Assignment Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rule Name</Label>
                  <Input placeholder="High Value Lead Assignment" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Input type="number" placeholder="1" min="1" max="10" />
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe what this rule does..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead_routing">Lead Routing</SelectItem>
                      <SelectItem value="territory_based">Territory Based</SelectItem>
                      <SelectItem value="skill_based">Skill Based</SelectItem>
                      <SelectItem value="workload_balancing">Workload Balancing</SelectItem>
                      <SelectItem value="escalation">Escalation</SelectItem>
                      <SelectItem value="follow_up">Follow Up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Trigger</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead_created">Lead Created</SelectItem>
                      <SelectItem value="lead_updated">Lead Updated</SelectItem>
                      <SelectItem value="time_based">Time Based</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="status_changed">Status Changed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Conditions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Conditions</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Condition
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-4 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estimated_value">Estimated Value</SelectItem>
                        <SelectItem value="lead_source">Lead Source</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="not_equals">Not Equals</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="less_than">Less Than</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Value" />
                    
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Actions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Actions</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Action
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Action Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assign_user">Assign User</SelectItem>
                        <SelectItem value="assign_team">Assign Team</SelectItem>
                        <SelectItem value="set_priority">Set Priority</SelectItem>
                        <SelectItem value="set_status">Set Status</SelectItem>
                        <SelectItem value="send_notification">Send Notification</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Parameters" />
                    
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Working Hours Only</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>
                Create Rule
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Test Rule Dialog */}
        <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Test Assignment Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Test Lead Data (JSON)</Label>
                <Textarea 
                  className="h-32 font-mono text-sm"
                  placeholder={`{
  "estimated_value": 75000,
  "lead_source": "Website",
  "location": "California",
  "priority": "high",
  "status": "New"
}`}
                />
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">Test Results</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rule Matched:</span>
                    <Badge variant="default">Yes</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Actions Triggered:</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Execution Time:</span>
                    <span>0.8s</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowTestDialog(false)}>
                Close
              </Button>
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Run Test
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default AssignmentRules;
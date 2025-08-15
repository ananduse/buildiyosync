'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Settings, 
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Play,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  Code,
  Zap,
  Mail,
  Phone,
  MessageSquare,
  User,
  Calendar,
  FileText,
  Database,
  Bell,
  Target,
  Activity,
  TrendingUp,
  Users,
  MapPin,
  Building,
  Tag,
  Clock,
  Globe,
  Briefcase,
  DollarSign,
  Hash,
  AlertCircle,
  CheckCircle2,
  Send,
  UserPlus,
  FileDown,
  Upload,
  RefreshCw,
  Link,
  Share,
  Archive,
  Star,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  Download,
  Printer,
  Clipboard,
  Image,
  Video,
  Mic,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

interface ActionBlock {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  parameters: ActionParameter[];
  isActive: boolean;
  usageCount: number;
  workflows: string[];
  avgExecutionTime: number;
  successRate: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ActionParameter {
  id: string;
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect' | 'textarea' | 'date' | 'email' | 'url' | 'phone' | 'file';
  required: boolean;
  defaultValue?: any;
  options?: { value: string; label: string; }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

const actionBlocks: ActionBlock[] = [
  // Communication Actions
  {
    id: 'send-email',
    name: 'Send Email',
    description: 'Send a personalized email to the lead',
    category: 'Communication',
    type: 'communication',
    icon: Mail,
    parameters: [
      { id: 'to', name: 'to', label: 'To Address', type: 'email', required: true },
      { id: 'subject', name: 'subject', label: 'Subject', type: 'string', required: true },
      { id: 'template', name: 'template', label: 'Email Template', type: 'select', required: true, 
        options: [
          { value: 'welcome', label: 'Welcome Email' },
          { value: 'follow-up', label: 'Follow-up Email' },
          { value: 'nurture', label: 'Nurture Sequence' }
        ]
      },
      { id: 'delay', name: 'delay', label: 'Delay (minutes)', type: 'number', required: false, defaultValue: 0 }
    ],
    isActive: true,
    usageCount: 1247,
    workflows: ['lead-nurture', 'welcome-sequence', 'follow-up-automation'],
    avgExecutionTime: 2.3,
    successRate: 98.5,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'send-sms',
    name: 'Send SMS',
    description: 'Send an SMS message to the lead',
    category: 'Communication',
    type: 'communication',
    icon: MessageSquare,
    parameters: [
      { id: 'to', name: 'to', label: 'Phone Number', type: 'phone', required: true },
      { id: 'message', name: 'message', label: 'Message', type: 'textarea', required: true },
      { id: 'delay', name: 'delay', label: 'Delay (minutes)', type: 'number', required: false, defaultValue: 0 }
    ],
    isActive: true,
    usageCount: 892,
    workflows: ['urgent-follow-up', 'appointment-reminder'],
    avgExecutionTime: 1.1,
    successRate: 99.2,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: 'schedule-call',
    name: 'Schedule Call',
    description: 'Schedule a call with the lead',
    category: 'Communication',
    type: 'scheduling',
    icon: Phone,
    parameters: [
      { id: 'date', name: 'date', label: 'Call Date', type: 'date', required: true },
      { id: 'duration', name: 'duration', label: 'Duration (minutes)', type: 'number', required: true, defaultValue: 30 },
      { id: 'assignee', name: 'assignee', label: 'Assigned To', type: 'select', required: true,
        options: [
          { value: 'auto', label: 'Auto-assign' },
          { value: 'sales-team', label: 'Sales Team' },
          { value: 'manager', label: 'Manager' }
        ]
      },
      { id: 'notes', name: 'notes', label: 'Call Notes', type: 'textarea', required: false }
    ],
    isActive: true,
    usageCount: 567,
    workflows: ['hot-lead-process', 'qualification-call'],
    avgExecutionTime: 3.2,
    successRate: 96.8,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T13:20:00Z'
  },

  // Lead Management Actions
  {
    id: 'update-status',
    name: 'Update Lead Status',
    description: 'Change the status of the lead',
    category: 'Lead Management',
    type: 'data-update',
    icon: Tag,
    parameters: [
      { id: 'status', name: 'status', label: 'New Status', type: 'select', required: true,
        options: [
          { value: 'new', label: 'New' },
          { value: 'contacted', label: 'Contacted' },
          { value: 'qualified', label: 'Qualified' },
          { value: 'hot', label: 'Hot' },
          { value: 'cold', label: 'Cold' },
          { value: 'converted', label: 'Converted' },
          { value: 'lost', label: 'Lost' }
        ]
      },
      { id: 'reason', name: 'reason', label: 'Reason for Change', type: 'textarea', required: false }
    ],
    isActive: true,
    usageCount: 2134,
    workflows: ['lead-scoring', 'qualification-process', 'conversion-tracking'],
    avgExecutionTime: 0.8,
    successRate: 99.8,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-16T10:10:00Z'
  },
  {
    id: 'assign-lead',
    name: 'Assign Lead',
    description: 'Assign the lead to a team member',
    category: 'Lead Management',
    type: 'assignment',
    icon: UserPlus,
    parameters: [
      { id: 'assignee', name: 'assignee', label: 'Assign To', type: 'select', required: true,
        options: [
          { value: 'round-robin', label: 'Round Robin' },
          { value: 'load-balance', label: 'Load Balance' },
          { value: 'territory', label: 'By Territory' },
          { value: 'specific-user', label: 'Specific User' }
        ]
      },
      { id: 'priority', name: 'priority', label: 'Priority', type: 'select', required: false,
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' }
        ]
      },
      { id: 'notes', name: 'notes', label: 'Assignment Notes', type: 'textarea', required: false }
    ],
    isActive: true,
    usageCount: 1567,
    workflows: ['auto-assignment', 'territory-routing', 'priority-assignment'],
    avgExecutionTime: 1.5,
    successRate: 97.4,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z'
  },
  {
    id: 'update-score',
    name: 'Update Lead Score',
    description: 'Modify the lead scoring value',
    category: 'Lead Management',
    type: 'scoring',
    icon: Target,
    parameters: [
      { id: 'operation', name: 'operation', label: 'Operation', type: 'select', required: true,
        options: [
          { value: 'add', label: 'Add Points' },
          { value: 'subtract', label: 'Subtract Points' },
          { value: 'set', label: 'Set Score' },
          { value: 'multiply', label: 'Multiply by' }
        ]
      },
      { id: 'value', name: 'value', label: 'Value', type: 'number', required: true },
      { id: 'reason', name: 'reason', label: 'Scoring Reason', type: 'string', required: false }
    ],
    isActive: true,
    usageCount: 987,
    workflows: ['lead-scoring', 'engagement-tracking', 'qualification-scoring'],
    avgExecutionTime: 0.6,
    successRate: 99.9,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  },

  // Task & Activity Actions
  {
    id: 'create-task',
    name: 'Create Task',
    description: 'Create a follow-up task for the lead',
    category: 'Tasks & Activities',
    type: 'task-creation',
    icon: CheckCircle2,
    parameters: [
      { id: 'title', name: 'title', label: 'Task Title', type: 'string', required: true },
      { id: 'description', name: 'description', label: 'Description', type: 'textarea', required: false },
      { id: 'due_date', name: 'due_date', label: 'Due Date', type: 'date', required: true },
      { id: 'priority', name: 'priority', label: 'Priority', type: 'select', required: false,
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' }
        ]
      },
      { id: 'assignee', name: 'assignee', label: 'Assign To', type: 'select', required: false,
        options: [
          { value: 'lead-owner', label: 'Lead Owner' },
          { value: 'manager', label: 'Manager' },
          { value: 'team', label: 'Team' }
        ]
      }
    ],
    isActive: true,
    usageCount: 1834,
    workflows: ['follow-up-automation', 'task-creation', 'reminder-system'],
    avgExecutionTime: 1.2,
    successRate: 98.9,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-22T08:15:00Z'
  },
  {
    id: 'schedule-meeting',
    name: 'Schedule Meeting',
    description: 'Schedule a meeting with the lead',
    category: 'Tasks & Activities',
    type: 'scheduling',
    icon: Calendar,
    parameters: [
      { id: 'title', name: 'title', label: 'Meeting Title', type: 'string', required: true },
      { id: 'date', name: 'date', label: 'Meeting Date', type: 'date', required: true },
      { id: 'duration', name: 'duration', label: 'Duration (minutes)', type: 'number', required: true, defaultValue: 60 },
      { id: 'type', name: 'type', label: 'Meeting Type', type: 'select', required: true,
        options: [
          { value: 'discovery', label: 'Discovery Call' },
          { value: 'demo', label: 'Product Demo' },
          { value: 'proposal', label: 'Proposal Review' },
          { value: 'negotiation', label: 'Negotiation' }
        ]
      },
      { id: 'location', name: 'location', label: 'Location/Link', type: 'string', required: false },
      { id: 'agenda', name: 'agenda', label: 'Meeting Agenda', type: 'textarea', required: false }
    ],
    isActive: true,
    usageCount: 743,
    workflows: ['demo-scheduling', 'qualification-meeting', 'proposal-review'],
    avgExecutionTime: 2.8,
    successRate: 97.1,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-17T15:30:00Z'
  },
  {
    id: 'log-activity',
    name: 'Log Activity',
    description: 'Record an activity or interaction with the lead',
    category: 'Tasks & Activities',
    type: 'logging',
    icon: Activity,
    parameters: [
      { id: 'type', name: 'type', label: 'Activity Type', type: 'select', required: true,
        options: [
          { value: 'call', label: 'Phone Call' },
          { value: 'email', label: 'Email' },
          { value: 'meeting', label: 'Meeting' },
          { value: 'note', label: 'Note' },
          { value: 'task', label: 'Task' }
        ]
      },
      { id: 'subject', name: 'subject', label: 'Subject', type: 'string', required: true },
      { id: 'description', name: 'description', label: 'Description', type: 'textarea', required: false },
      { id: 'outcome', name: 'outcome', label: 'Outcome', type: 'select', required: false,
        options: [
          { value: 'successful', label: 'Successful' },
          { value: 'no-answer', label: 'No Answer' },
          { value: 'busy', label: 'Busy' },
          { value: 'interested', label: 'Interested' },
          { value: 'not-interested', label: 'Not Interested' }
        ]
      }
    ],
    isActive: true,
    usageCount: 2567,
    workflows: ['activity-tracking', 'interaction-logging', 'follow-up-tracking'],
    avgExecutionTime: 0.9,
    successRate: 99.5,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T11:45:00Z'
  },

  // Integration Actions
  {
    id: 'webhook-call',
    name: 'Webhook Call',
    description: 'Make an HTTP request to an external webhook',
    category: 'Integrations',
    type: 'webhook',
    icon: ExternalLink,
    parameters: [
      { id: 'url', name: 'url', label: 'Webhook URL', type: 'url', required: true },
      { id: 'method', name: 'method', label: 'HTTP Method', type: 'select', required: true,
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      { id: 'headers', name: 'headers', label: 'Custom Headers', type: 'textarea', required: false },
      { id: 'payload', name: 'payload', label: 'Request Payload', type: 'textarea', required: false }
    ],
    isActive: true,
    usageCount: 456,
    workflows: ['crm-sync', 'external-notifications', 'data-export'],
    avgExecutionTime: 5.2,
    successRate: 94.3,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-14T09:30:00Z'
  },
  {
    id: 'database-update',
    name: 'Database Update',
    description: 'Update external database records',
    category: 'Integrations',
    type: 'database',
    icon: Database,
    parameters: [
      { id: 'connection', name: 'connection', label: 'Database Connection', type: 'select', required: true,
        options: [
          { value: 'crm', label: 'CRM Database' },
          { value: 'marketing', label: 'Marketing Platform' },
          { value: 'analytics', label: 'Analytics Database' }
        ]
      },
      { id: 'table', name: 'table', label: 'Table/Collection', type: 'string', required: true },
      { id: 'operation', name: 'operation', label: 'Operation', type: 'select', required: true,
        options: [
          { value: 'insert', label: 'Insert' },
          { value: 'update', label: 'Update' },
          { value: 'upsert', label: 'Insert or Update' }
        ]
      },
      { id: 'data', name: 'data', label: 'Data Mapping', type: 'textarea', required: true }
    ],
    isActive: false,
    usageCount: 123,
    workflows: ['data-sync', 'backup-creation'],
    avgExecutionTime: 7.8,
    successRate: 91.7,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },

  // Notification Actions
  {
    id: 'send-notification',
    name: 'Send Notification',
    description: 'Send an internal notification to team members',
    category: 'Notifications',
    type: 'notification',
    icon: Bell,
    parameters: [
      { id: 'recipients', name: 'recipients', label: 'Recipients', type: 'multiselect', required: true,
        options: [
          { value: 'lead-owner', label: 'Lead Owner' },
          { value: 'manager', label: 'Manager' },
          { value: 'sales-team', label: 'Sales Team' },
          { value: 'admin', label: 'Admin' }
        ]
      },
      { id: 'title', name: 'title', label: 'Notification Title', type: 'string', required: true },
      { id: 'message', name: 'message', label: 'Message', type: 'textarea', required: true },
      { id: 'priority', name: 'priority', label: 'Priority', type: 'select', required: false,
        options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' }
        ]
      }
    ],
    isActive: true,
    usageCount: 1345,
    workflows: ['alert-system', 'escalation-process', 'team-notifications'],
    avgExecutionTime: 1.1,
    successRate: 98.8,
    createdBy: 'System',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T16:00:00Z'
  }
];

const categories = [
  { id: 'all', name: 'All Categories', count: actionBlocks.length },
  { id: 'communication', name: 'Communication', count: 3 },
  { id: 'lead-management', name: 'Lead Management', count: 3 },
  { id: 'tasks-activities', name: 'Tasks & Activities', count: 3 },
  { id: 'integrations', name: 'Integrations', count: 2 },
  { id: 'notifications', name: 'Notifications', count: 1 }
];

export default function ActionBlocks() {
  const [selectedTab, setSelectedTab] = useState('actions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<ActionBlock | null>(null);
  
  const [newAction, setNewAction] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    parameters: [],
    isActive: true
  });

  const getStatusColor = (status: boolean) => {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredActions = actionBlocks.filter(action => {
    const matchesSearch = action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           action.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === selectedCategory;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && action.isActive) ||
                         (statusFilter === 'inactive' && !action.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalUsage = actionBlocks.reduce((sum, action) => sum + action.usageCount, 0);
  const activeActionsCount = actionBlocks.filter(action => action.isActive).length;
  const avgSuccessRate = actionBlocks.reduce((sum, action) => sum + action.successRate, 0) / actionBlocks.length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Action Blocks</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsBuilderOpen(true)}>
            <Code className="mr-2 h-4 w-4" />
            Action Builder
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Action
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Action Block</DialogTitle>
                <DialogDescription>
                  Create a custom action block for your workflow automation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="action-name">Action Name</Label>
                  <Input
                    id="action-name"
                    placeholder="Enter action name..."
                    value={newAction.name}
                    onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="action-description">Description</Label>
                  <Textarea
                    id="action-description"
                    placeholder="Describe what this action does..."
                    value={newAction.description}
                    onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="action-category">Category</Label>
                    <Select value={newAction.category} onValueChange={(value) => setNewAction({ ...newAction, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="lead-management">Lead Management</SelectItem>
                        <SelectItem value="tasks-activities">Tasks & Activities</SelectItem>
                        <SelectItem value="integrations">Integrations</SelectItem>
                        <SelectItem value="notifications">Notifications</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="action-type">Action Type</Label>
                    <Select value={newAction.type} onValueChange={(value) => setNewAction({ ...newAction, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="data-update">Data Update</SelectItem>
                        <SelectItem value="task-creation">Task Creation</SelectItem>
                        <SelectItem value="notification">Notification</SelectItem>
                        <SelectItem value="integration">Integration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="action-active"
                    checked={newAction.isActive}
                    onCheckedChange={(checked) => setNewAction({ ...newAction, isActive: checked })}
                  />
                  <Label htmlFor="action-active">Activate action immediately</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Action
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionBlocks.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Actions</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeActionsCount}</div>
            <p className="text-xs text-muted-foreground">
              {((activeActionsCount / actionBlocks.length) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all workflows
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Average across all actions
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="actions">Action Library</TabsTrigger>
          <TabsTrigger value="builder">Action Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Action Blocks Library</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search actions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Parameters</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <TableRow key={action.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Icon className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">{action.name}</div>
                              <div className="text-sm text-gray-500">{action.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{action.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{action.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium">{action.parameters.length}</span>
                            <span className="text-xs text-muted-foreground">params</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(action.isActive)}>
                            {action.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>{action.usageCount.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${action.successRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{action.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setSelectedAction(action)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Action
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Test Action
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Action Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create custom action blocks with parameters and validation
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label>Action Information</Label>
                    <div className="space-y-3 mt-2">
                      <Input placeholder="Action Name" />
                      <Textarea placeholder="Action Description" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="lead-management">Lead Management</SelectItem>
                          <SelectItem value="tasks-activities">Tasks & Activities</SelectItem>
                          <SelectItem value="integrations">Integrations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Parameters</Label>
                    <div className="space-y-3 mt-2">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Parameter 1</span>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid gap-2">
                          <Input placeholder="Parameter Name" className="text-xs" />
                          <Select>
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="string">String</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="boolean">Boolean</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="required" />
                            <Label htmlFor="required" className="text-xs">Required</Label>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Parameter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Action Logic (JavaScript)</Label>
                <Textarea 
                  placeholder="// Define your action logic here&#10;function executeAction(parameters) {&#10;  // Your code here&#10;  return { success: true, message: 'Action completed' };&#10;}"
                  className="h-32 font-mono text-sm"
                />
              </div>

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Test Action
                  </Button>
                  <Button variant="outline">
                    Load Template
                  </Button>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button>
                    Create Action
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Used Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actionBlocks
                    .sort((a, b) => b.usageCount - a.usageCount)
                    .slice(0, 5)
                    .map((action) => (
                      <div key={action.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm font-medium">{action.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {action.usageCount} uses
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actionBlocks
                    .sort((a, b) => b.successRate - a.successRate)
                    .slice(0, 5)
                    .map((action) => (
                      <div key={action.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm font-medium">{action.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {action.successRate}% success
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: 'Send Email',
                    workflow: 'Welcome Sequence',
                    status: 'success',
                    duration: '2.3s',
                    time: '2 minutes ago'
                  },
                  {
                    action: 'Update Lead Status',
                    workflow: 'Lead Scoring',
                    status: 'success',
                    duration: '0.8s',
                    time: '5 minutes ago'
                  },
                  {
                    action: 'Create Task',
                    workflow: 'Follow-up Automation',
                    status: 'success',
                    duration: '1.2s',
                    time: '12 minutes ago'
                  },
                  {
                    action: 'Send SMS',
                    workflow: 'Urgent Follow-up',
                    status: 'failed',
                    duration: '5.1s',
                    time: '18 minutes ago'
                  },
                  {
                    action: 'Webhook Call',
                    workflow: 'CRM Sync',
                    status: 'success',
                    duration: '4.2s',
                    time: '25 minutes ago'
                  }
                ].map((execution, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        execution.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                      }`}></div>
                      <div>
                        <div className="text-sm font-medium">{execution.action}</div>
                        <div className="text-sm text-muted-foreground">{execution.workflow}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{execution.duration}</div>
                      <div className="text-sm text-muted-foreground">{execution.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Details Dialog */}
      {selectedAction && (
        <Dialog open={!!selectedAction} onOpenChange={() => setSelectedAction(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <selectedAction.icon className="h-4 w-4 text-blue-600" />
                </div>
                <span>{selectedAction.name}</span>
              </DialogTitle>
              <DialogDescription>{selectedAction.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <div className="text-sm text-muted-foreground">{selectedAction.category}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="text-sm text-muted-foreground">{selectedAction.type}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Usage Count</Label>
                  <div className="text-sm text-muted-foreground">{selectedAction.usageCount.toLocaleString()}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Success Rate</Label>
                  <div className="text-sm text-muted-foreground">{selectedAction.successRate}%</div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Parameters</Label>
                <div className="mt-2 space-y-2">
                  {selectedAction.parameters.map((param) => (
                    <div key={param.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <span className="text-sm font-medium">{param.label}</span>
                        {param.required && <Badge variant="outline" className="ml-2 h-4 text-xs">Required</Badge>}
                      </div>
                      <Badge variant="secondary" className="text-xs">{param.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Used In Workflows</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedAction.workflows.map((workflow) => (
                    <Badge key={workflow} variant="outline">
                      {workflow}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAction(null)}>
                Close
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Action
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
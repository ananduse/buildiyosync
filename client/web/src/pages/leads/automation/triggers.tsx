'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Zap, 
  Clock, 
  Calendar, 
  Mail, 
  Phone, 
  Users, 
  Target, 
  Activity, 
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash2,
  Eye,
  Copy,
  Settings,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Database,
  ArrowRight,
  FileText,
  Bell,
  Tag,
  MapPin,
  Building,
  DollarSign,
  TrendingUp,
  Hash
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

interface TriggerEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  type: 'lead-created' | 'lead-updated' | 'field-changed' | 'status-changed' | 'email-opened' | 'email-clicked' | 'form-submitted' | 'page-visited' | 'time-based' | 'score-changed' | 'assignment-changed' | 'activity-completed';
  status: 'active' | 'inactive' | 'draft';
  conditions: any[];
  workflows: number;
  lastTriggered: string;
  totalTriggers: number;
  avgExecutionTime: number;
  successRate: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface TriggerTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultConditions: any[];
  usageCount: number;
  isPopular?: boolean;
}

const mockTriggers: TriggerEvent[] = [
  {
    id: '1',
    name: 'New Lead Created',
    description: 'Triggers when a new lead is added to the system',
    category: 'Lead Management',
    type: 'lead-created',
    status: 'active',
    conditions: [
      { field: 'source', operator: 'equals', value: 'website' }
    ],
    workflows: 3,
    lastTriggered: '2 minutes ago',
    totalTriggers: 1247,
    avgExecutionTime: 1.2,
    successRate: 98.5,
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Lead Status Change to Hot',
    description: 'Triggers when lead status changes to Hot or Qualified',
    category: 'Lead Management',
    type: 'status-changed',
    status: 'active',
    conditions: [
      { field: 'status', operator: 'in', value: ['hot', 'qualified'] }
    ],
    workflows: 2,
    lastTriggered: '15 minutes ago',
    totalTriggers: 892,
    avgExecutionTime: 2.1,
    successRate: 97.2,
    createdBy: 'Mike Chen',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    name: 'Email Opened - Follow-up',
    description: 'Triggers when a lead opens a follow-up email',
    category: 'Communication',
    type: 'email-opened',
    status: 'active',
    conditions: [
      { field: 'emailType', operator: 'equals', value: 'follow-up' }
    ],
    workflows: 1,
    lastTriggered: '1 hour ago',
    totalTriggers: 456,
    avgExecutionTime: 0.8,
    successRate: 99.1,
    createdBy: 'Emily Davis',
    createdAt: '2024-01-12T11:30:00Z',
    updatedAt: '2024-01-19T13:20:00Z'
  },
  {
    id: '4',
    name: 'High Value Lead Assignment',
    description: 'Triggers when lead value exceeds $50,000',
    category: 'Lead Management',
    type: 'field-changed',
    status: 'inactive',
    conditions: [
      { field: 'estimatedValue', operator: 'greater_than', value: 50000 }
    ],
    workflows: 1,
    lastTriggered: '3 days ago',
    totalTriggers: 234,
    avgExecutionTime: 3.5,
    successRate: 95.8,
    createdBy: 'David Wilson',
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-16T10:10:00Z'
  },
  {
    id: '5',
    name: 'Weekly Lead Review',
    description: 'Time-based trigger for weekly lead review process',
    category: 'Scheduled Tasks',
    type: 'time-based',
    status: 'active',
    conditions: [
      { field: 'schedule', operator: 'equals', value: 'weekly' },
      { field: 'day', operator: 'equals', value: 'monday' }
    ],
    workflows: 2,
    lastTriggered: '2 days ago',
    totalTriggers: 52,
    avgExecutionTime: 45.2,
    successRate: 100.0,
    createdBy: 'Lisa Thompson',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z'
  }
];

const triggerTemplates: TriggerTemplate[] = [
  {
    id: 'new-lead',
    name: 'New Lead Created',
    description: 'Automatically trigger when a new lead enters the system',
    category: 'Lead Management',
    type: 'lead-created',
    icon: Plus,
    defaultConditions: [],
    usageCount: 1247,
    isPopular: true
  },
  {
    id: 'status-change',
    name: 'Status Changed',
    description: 'Trigger when lead status changes to specific values',
    category: 'Lead Management',
    type: 'status-changed',
    icon: Target,
    defaultConditions: [
      { field: 'status', operator: 'equals', value: 'hot' }
    ],
    usageCount: 892
  },
  {
    id: 'email-opened',
    name: 'Email Opened',
    description: 'Trigger when lead opens an email from campaigns',
    category: 'Communication',
    type: 'email-opened',
    icon: Mail,
    defaultConditions: [
      { field: 'emailType', operator: 'equals', value: 'marketing' }
    ],
    usageCount: 678,
    isPopular: true
  },
  {
    id: 'form-submitted',
    name: 'Form Submitted',
    description: 'Trigger when lead submits a form on website',
    category: 'Web Activity',
    type: 'form-submitted',
    icon: FileText,
    defaultConditions: [
      { field: 'formType', operator: 'equals', value: 'contact' }
    ],
    usageCount: 543
  },
  {
    id: 'score-threshold',
    name: 'Score Threshold',
    description: 'Trigger when lead score reaches certain threshold',
    category: 'Lead Scoring',
    type: 'score-changed',
    icon: TrendingUp,
    defaultConditions: [
      { field: 'score', operator: 'greater_than', value: 80 }
    ],
    usageCount: 456
  },
  {
    id: 'time-based',
    name: 'Scheduled Trigger',
    description: 'Time-based trigger for recurring tasks',
    category: 'Scheduled Tasks',
    type: 'time-based',
    icon: Clock,
    defaultConditions: [
      { field: 'schedule', operator: 'equals', value: 'daily' }
    ],
    usageCount: 234
  }
];

const categories = [
  { id: 'all', name: 'All Categories', count: mockTriggers.length },
  { id: 'lead-management', name: 'Lead Management', count: 3 },
  { id: 'communication', name: 'Communication', count: 1 },
  { id: 'scheduled-tasks', name: 'Scheduled Tasks', count: 1 },
  { id: 'web-activity', name: 'Web Activity', count: 0 },
  { id: 'lead-scoring', name: 'Lead Scoring', count: 0 }
];

export default function TriggerEvents() {
  const [selectedTab, setSelectedTab] = useState('triggers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState<TriggerEvent | null>(null);
  const [newTrigger, setNewTrigger] = useState({
    name: '',
    description: '',
    category: '',
    type: '',
    conditions: [],
    isActive: true
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lead-created': return Plus;
      case 'lead-updated': return Edit;
      case 'status-changed': return Target;
      case 'email-opened': return Mail;
      case 'email-clicked': return ArrowRight;
      case 'form-submitted': return FileText;
      case 'time-based': return Clock;
      case 'score-changed': return TrendingUp;
      case 'field-changed': return Edit;
      case 'assignment-changed': return Users;
      default: return Zap;
    }
  };

  const filteredTriggers = mockTriggers.filter(trigger => {
    const matchesSearch = trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trigger.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           trigger.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesStatus = statusFilter === 'all' || trigger.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeTriggersCount = mockTriggers.filter(t => t.status === 'active').length;
  const totalExecutions = mockTriggers.reduce((sum, t) => sum + t.totalTriggers, 0);
  const avgSuccessRate = mockTriggers.reduce((sum, t) => sum + t.successRate, 0) / mockTriggers.length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trigger Events</h2>
        <div className="flex items-center space-x-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Trigger
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Trigger</DialogTitle>
                <DialogDescription>
                  Set up a new trigger event to automate your lead management workflows.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="trigger-name">Trigger Name</Label>
                  <Input
                    id="trigger-name"
                    placeholder="Enter trigger name..."
                    value={newTrigger.name}
                    onChange={(e) => setNewTrigger({ ...newTrigger, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="trigger-description">Description</Label>
                  <Textarea
                    id="trigger-description"
                    placeholder="Describe what this trigger does..."
                    value={newTrigger.description}
                    onChange={(e) => setNewTrigger({ ...newTrigger, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="trigger-category">Category</Label>
                    <Select value={newTrigger.category} onValueChange={(value) => setNewTrigger({ ...newTrigger, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead-management">Lead Management</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="web-activity">Web Activity</SelectItem>
                        <SelectItem value="lead-scoring">Lead Scoring</SelectItem>
                        <SelectItem value="scheduled-tasks">Scheduled Tasks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="trigger-type">Trigger Type</Label>
                    <Select value={newTrigger.type} onValueChange={(value) => setNewTrigger({ ...newTrigger, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead-created">Lead Created</SelectItem>
                        <SelectItem value="lead-updated">Lead Updated</SelectItem>
                        <SelectItem value="status-changed">Status Changed</SelectItem>
                        <SelectItem value="field-changed">Field Changed</SelectItem>
                        <SelectItem value="email-opened">Email Opened</SelectItem>
                        <SelectItem value="form-submitted">Form Submitted</SelectItem>
                        <SelectItem value="time-based">Time Based</SelectItem>
                        <SelectItem value="score-changed">Score Changed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="trigger-active"
                    checked={newTrigger.isActive}
                    onCheckedChange={(checked) => setNewTrigger({ ...newTrigger, isActive: checked })}
                  />
                  <Label htmlFor="trigger-active">Activate trigger immediately</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Trigger
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
            <CardTitle className="text-sm font-medium">Active Triggers</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTriggersCount}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExecutions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              +0.3% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Execution Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1s</div>
            <p className="text-xs text-muted-foreground">
              -0.2s from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="triggers">My Triggers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="triggers" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trigger Events</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search triggers..."
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
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Workflows</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Total Triggers</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTriggers.map((trigger) => {
                    const TypeIcon = getTypeIcon(trigger.type);
                    return (
                      <TableRow key={trigger.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <TypeIcon className="h-4 w-4 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <div className="font-medium">{trigger.name}</div>
                              <div className="text-sm text-gray-500">{trigger.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {trigger.type.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(trigger.status)}>
                            {trigger.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{trigger.workflows}</TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {trigger.lastTriggered}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${trigger.successRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{trigger.successRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{trigger.totalTriggers.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Trigger
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {trigger.status === 'active' ? (
                                  <>
                                    <Pause className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Play className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trigger Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose from pre-built trigger templates to get started quickly
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {triggerTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card key={template.id} className="relative">
                      {template.isPopular && (
                        <Badge className="absolute top-3 right-3 bg-orange-100 text-orange-800">
                          Popular
                        </Badge>
                      )}
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{template.category}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Used {template.usageCount} times
                          </div>
                          <Button size="sm">
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Trigger Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTriggers.slice(0, 5).map((trigger) => (
                    <div key={trigger.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-medium">{trigger.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trigger.totalTriggers} executions
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTriggers.slice(0, 5).map((trigger) => (
                    <div key={trigger.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-sm font-medium">{trigger.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {trigger.avgExecutionTime}s avg
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    trigger: 'New Lead Created',
                    action: 'Executed successfully',
                    time: '2 minutes ago',
                    status: 'success'
                  },
                  {
                    trigger: 'Email Opened - Follow-up',
                    action: 'Executed successfully',
                    time: '15 minutes ago',
                    status: 'success'
                  },
                  {
                    trigger: 'Lead Status Change to Hot',
                    action: 'Execution failed - timeout',
                    time: '1 hour ago',
                    status: 'error'
                  },
                  {
                    trigger: 'High Value Lead Assignment',
                    action: 'Skipped - conditions not met',
                    time: '2 hours ago',
                    status: 'skipped'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-600' :
                      activity.status === 'error' ? 'bg-red-600' :
                      'bg-yellow-600'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.trigger}</div>
                      <div className="text-sm text-muted-foreground">{activity.action}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
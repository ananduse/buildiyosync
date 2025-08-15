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
  Target,
  User,
  Calendar,
  MapPin,
  Building,
  Tag,
  Mail,
  Phone,
  DollarSign,
  Hash,
  Clock,
  Globe,
  Database,
  FileText,
  Activity,
  TrendingUp,
  Users,
  Briefcase
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

interface Condition {
  id: string;
  name: string;
  description: string;
  category: string;
  field: string;
  operator: string;
  value: any;
  dataType: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  isActive: boolean;
  usageCount: number;
  workflows: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ConditionGroup {
  id: string;
  name: string;
  description: string;
  operator: 'AND' | 'OR';
  conditions: (Condition | ConditionGroup)[];
  isActive: boolean;
  workflows: number;
}

interface FieldDefinition {
  id: string;
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'multiselect';
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  options?: { value: string; label: string; }[];
  description?: string;
}

const fieldDefinitions: FieldDefinition[] = [
  // Lead Basic Fields
  { id: 'firstName', name: 'first_name', label: 'First Name', type: 'string', category: 'Lead Info', icon: User },
  { id: 'lastName', name: 'last_name', label: 'Last Name', type: 'string', category: 'Lead Info', icon: User },
  { id: 'email', name: 'email', label: 'Email', type: 'string', category: 'Lead Info', icon: Mail },
  { id: 'phone', name: 'phone', label: 'Phone', type: 'string', category: 'Lead Info', icon: Phone },
  { id: 'company', name: 'company', label: 'Company', type: 'string', category: 'Lead Info', icon: Building },
  { id: 'jobTitle', name: 'job_title', label: 'Job Title', type: 'string', category: 'Lead Info', icon: Briefcase },
  
  // Lead Status & Classification
  { 
    id: 'status', 
    name: 'status', 
    label: 'Status', 
    type: 'select', 
    category: 'Lead Status', 
    icon: Tag,
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
  {
    id: 'source',
    name: 'source',
    label: 'Lead Source',
    type: 'select',
    category: 'Lead Status',
    icon: Globe,
    options: [
      { value: 'website', label: 'Website' },
      { value: 'social', label: 'Social Media' },
      { value: 'email', label: 'Email Campaign' },
      { value: 'referral', label: 'Referral' },
      { value: 'cold_call', label: 'Cold Call' },
      { value: 'trade_show', label: 'Trade Show' }
    ]
  },
  {
    id: 'industry',
    name: 'industry',
    label: 'Industry',
    type: 'select',
    category: 'Lead Status',
    icon: Building,
    options: [
      { value: 'technology', label: 'Technology' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'finance', label: 'Finance' },
      { value: 'education', label: 'Education' },
      { value: 'retail', label: 'Retail' },
      { value: 'manufacturing', label: 'Manufacturing' }
    ]
  },
  
  // Financial Fields
  { id: 'leadValue', name: 'lead_value', label: 'Lead Value', type: 'number', category: 'Financial', icon: DollarSign },
  { id: 'expectedRevenue', name: 'expected_revenue', label: 'Expected Revenue', type: 'number', category: 'Financial', icon: DollarSign },
  { id: 'budget', name: 'budget', label: 'Budget', type: 'number', category: 'Financial', icon: DollarSign },
  
  // Scoring & Analytics
  { id: 'leadScore', name: 'lead_score', label: 'Lead Score', type: 'number', category: 'Scoring', icon: Target },
  { id: 'engagementScore', name: 'engagement_score', label: 'Engagement Score', type: 'number', category: 'Scoring', icon: TrendingUp },
  { id: 'lastActivityDate', name: 'last_activity_date', label: 'Last Activity Date', type: 'date', category: 'Activity', icon: Clock },
  { id: 'emailOpens', name: 'email_opens', label: 'Email Opens', type: 'number', category: 'Activity', icon: Mail },
  { id: 'emailClicks', name: 'email_clicks', label: 'Email Clicks', type: 'number', category: 'Activity', icon: Mail },
  
  // Geographic Fields
  { id: 'city', name: 'city', label: 'City', type: 'string', category: 'Location', icon: MapPin },
  { id: 'state', name: 'state', label: 'State', type: 'string', category: 'Location', icon: MapPin },
  { id: 'country', name: 'country', label: 'Country', type: 'string', category: 'Location', icon: MapPin },
  { id: 'timezone', name: 'timezone', label: 'Timezone', type: 'string', category: 'Location', icon: Clock },
  
  // Assignment Fields
  { id: 'assignedTo', name: 'assigned_to', label: 'Assigned To', type: 'string', category: 'Assignment', icon: Users },
  { id: 'teamId', name: 'team_id', label: 'Team', type: 'string', category: 'Assignment', icon: Users },
  
  // Date Fields
  { id: 'createdAt', name: 'created_at', label: 'Created Date', type: 'date', category: 'Timeline', icon: Calendar },
  { id: 'updatedAt', name: 'updated_at', label: 'Updated Date', type: 'date', category: 'Timeline', icon: Calendar },
  { id: 'followUpDate', name: 'follow_up_date', label: 'Follow-up Date', type: 'date', category: 'Timeline', icon: Calendar }
];

const operators = {
  string: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' },
    { value: 'starts_with', label: 'Starts With' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'greater_than_equal', label: 'Greater Than or Equal' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'less_than_equal', label: 'Less Than or Equal' },
    { value: 'between', label: 'Between' },
    { value: 'not_between', label: 'Not Between' }
  ],
  boolean: [
    { value: 'is_true', label: 'Is True' },
    { value: 'is_false', label: 'Is False' }
  ],
  date: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
    { value: 'between', label: 'Between' },
    { value: 'in_last', label: 'In Last' },
    { value: 'in_next', label: 'In Next' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this_week', label: 'This Week' },
    { value: 'last_week', label: 'Last Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' }
  ],
  select: [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'in', label: 'Is One Of' },
    { value: 'not_in', label: 'Is Not One Of' }
  ]
};

const mockConditions: Condition[] = [
  {
    id: '1',
    name: 'High Value Lead',
    description: 'Lead value is greater than $10,000',
    category: 'Financial',
    field: 'lead_value',
    operator: 'greater_than',
    value: 10000,
    dataType: 'number',
    isActive: true,
    usageCount: 145,
    workflows: ['lead-scoring', 'priority-assignment'],
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Hot Lead Status',
    description: 'Lead status is Hot or Qualified',
    category: 'Lead Status',
    field: 'status',
    operator: 'in',
    value: ['hot', 'qualified'],
    dataType: 'array',
    isActive: true,
    usageCount: 234,
    workflows: ['hot-lead-alert', 'priority-follow-up'],
    createdBy: 'Mike Chen',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    name: 'Email Engagement',
    description: 'Email opens greater than 5 in last 30 days',
    category: 'Activity',
    field: 'email_opens',
    operator: 'greater_than',
    value: 5,
    dataType: 'number',
    isActive: true,
    usageCount: 89,
    workflows: ['engagement-nurture'],
    createdBy: 'Emily Davis',
    createdAt: '2024-01-10T11:30:00Z',
    updatedAt: '2024-01-19T13:20:00Z'
  },
  {
    id: '4',
    name: 'Technology Industry',
    description: 'Lead industry is Technology',
    category: 'Lead Status',
    field: 'industry',
    operator: 'equals',
    value: 'technology',
    dataType: 'string',
    isActive: false,
    usageCount: 67,
    workflows: ['tech-specific-workflow'],
    createdBy: 'David Wilson',
    createdAt: '2024-01-08T14:20:00Z',
    updatedAt: '2024-01-16T10:10:00Z'
  },
  {
    id: '5',
    name: 'Recent Activity',
    description: 'Last activity within 7 days',
    category: 'Activity',
    field: 'last_activity_date',
    operator: 'in_last',
    value: { amount: 7, unit: 'days' },
    dataType: 'date',
    isActive: true,
    usageCount: 156,
    workflows: ['active-lead-nurture', 'follow-up-sequence'],
    createdBy: 'Lisa Thompson',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-21T09:00:00Z'
  }
];

export default function ConditionBuilder() {
  const [selectedTab, setSelectedTab] = useState('conditions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  
  // Condition Builder State
  const [builderConditions, setBuilderConditions] = useState<any[]>([
    {
      id: '1',
      field: '',
      operator: '',
      value: '',
      logicalOperator: 'AND'
    }
  ]);

  const [newCondition, setNewCondition] = useState({
    name: '',
    description: '',
    category: '',
    field: '',
    operator: '',
    value: '',
    isActive: true
  });

  const categories = [
    { id: 'all', name: 'All Categories', count: mockConditions.length },
    { id: 'lead-info', name: 'Lead Info', count: 0 },
    { id: 'lead-status', name: 'Lead Status', count: 2 },
    { id: 'financial', name: 'Financial', count: 1 },
    { id: 'activity', name: 'Activity', count: 2 },
    { id: 'location', name: 'Location', count: 0 },
    { id: 'assignment', name: 'Assignment', count: 0 },
    { id: 'timeline', name: 'Timeline', count: 0 }
  ];

  const addCondition = () => {
    setBuilderConditions([
      ...builderConditions,
      {
        id: Date.now().toString(),
        field: '',
        operator: '',
        value: '',
        logicalOperator: 'AND'
      }
    ]);
  };

  const removeCondition = (id: string) => {
    setBuilderConditions(builderConditions.filter(c => c.id !== id));
  };

  const updateCondition = (id: string, updates: any) => {
    setBuilderConditions(builderConditions.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  const getFieldOperators = (fieldId: string) => {
    const field = fieldDefinitions.find(f => f.id === fieldId);
    if (!field) return [];
    return operators[field.type] || [];
  };

  const renderValueInput = (condition: any, index: number) => {
    const field = fieldDefinitions.find(f => f.id === condition.field);
    if (!field) return null;

    if (field.type === 'select' && field.options) {
      if (condition.operator === 'in' || condition.operator === 'not_in') {
        return (
          <div className="space-y-2">
            {field.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${condition.id}-${option.value}`}
                  checked={Array.isArray(condition.value) && condition.value.includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(condition.value) ? condition.value : [];
                    const newValues = checked
                      ? [...currentValues, option.value]
                      : currentValues.filter(v => v !== option.value);
                    updateCondition(condition.id, { value: newValues });
                  }}
                />
                <Label htmlFor={`${condition.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <Select 
            value={condition.value} 
            onValueChange={(value) => updateCondition(condition.id, { value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
    }

    if (field.type === 'number') {
      return (
        <Input
          type="number"
          placeholder="Enter number"
          value={condition.value}
          onChange={(e) => updateCondition(condition.id, { value: parseFloat(e.target.value) || 0 })}
        />
      );
    }

    if (field.type === 'date') {
      if (condition.operator === 'in_last' || condition.operator === 'in_next') {
        return (
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Amount"
              value={condition.value?.amount || ''}
              onChange={(e) => updateCondition(condition.id, { 
                value: { ...condition.value, amount: parseInt(e.target.value) || 0 }
              })}
              className="w-20"
            />
            <Select 
              value={condition.value?.unit || 'days'} 
              onValueChange={(unit) => updateCondition(condition.id, { 
                value: { ...condition.value, unit }
              })}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      } else if (condition.operator !== 'today' && condition.operator !== 'yesterday' && 
                 condition.operator !== 'this_week' && condition.operator !== 'last_week' &&
                 condition.operator !== 'this_month' && condition.operator !== 'last_month') {
        return (
          <Input
            type="date"
            value={condition.value}
            onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
          />
        );
      }
      return null;
    }

    if (field.type === 'boolean' || condition.operator === 'is_true' || condition.operator === 'is_false') {
      return null; // No value input needed for boolean operators
    }

    return (
      <Input
        type="text"
        placeholder="Enter value"
        value={condition.value}
        onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
      />
    );
  };

  const filteredConditions = mockConditions.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           condition.category.toLowerCase().replace(' ', '-') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Condition Builder</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsBuilderOpen(true)}>
            <Code className="mr-2 h-4 w-4" />
            Open Builder
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Condition
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Condition</DialogTitle>
                <DialogDescription>
                  Define a new condition for use in your workflow automation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="condition-name">Condition Name</Label>
                  <Input
                    id="condition-name"
                    placeholder="Enter condition name..."
                    value={newCondition.name}
                    onChange={(e) => setNewCondition({ ...newCondition, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="condition-description">Description</Label>
                  <Textarea
                    id="condition-description"
                    placeholder="Describe what this condition checks..."
                    value={newCondition.description}
                    onChange={(e) => setNewCondition({ ...newCondition, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="condition-category">Category</Label>
                  <Select value={newCondition.category} onValueChange={(value) => setNewCondition({ ...newCondition, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lead-info">Lead Info</SelectItem>
                      <SelectItem value="lead-status">Lead Status</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="timeline">Timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="condition-active"
                    checked={newCondition.isActive}
                    onCheckedChange={(checked) => setNewCondition({ ...newCondition, isActive: checked })}
                  />
                  <Label htmlFor="condition-active">Activate condition</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Condition
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
            <CardTitle className="text-sm font-medium">Total Conditions</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConditions.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conditions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockConditions.filter(c => c.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground">
              80% of total conditions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockConditions.reduce((sum, c) => sum + c.usageCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all workflows
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...mockConditions.map(c => c.usageCount))}
            </div>
            <p className="text-xs text-muted-foreground">
              Hot Lead Status condition
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="conditions">My Conditions</TabsTrigger>
          <TabsTrigger value="builder">Condition Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="conditions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Saved Conditions</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conditions..."
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConditions.map((condition) => (
                    <TableRow key={condition.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{condition.name}</div>
                          <div className="text-sm text-gray-500">{condition.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{condition.category}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{condition.field}</TableCell>
                      <TableCell className="font-mono text-sm">{condition.operator}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {Array.isArray(condition.value) 
                          ? condition.value.join(', ')
                          : typeof condition.value === 'object' 
                            ? JSON.stringify(condition.value)
                            : condition.value
                        }
                      </TableCell>
                      <TableCell>
                        <Badge className={condition.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {condition.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{condition.usageCount}</TableCell>
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
                              Edit Condition
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visual Condition Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Build complex conditions using a visual interface
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {builderConditions.map((condition, index) => (
                <div key={condition.id} className="space-y-4">
                  {index > 0 && (
                    <div className="flex justify-center">
                      <Select 
                        value={condition.logicalOperator} 
                        onValueChange={(value) => updateCondition(condition.id, { logicalOperator: value })}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AND">AND</SelectItem>
                          <SelectItem value="OR">OR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Field Selection */}
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 block">Field</Label>
                        <Select 
                          value={condition.field} 
                          onValueChange={(value) => updateCondition(condition.id, { field: value, operator: '', value: '' })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(
                              fieldDefinitions.reduce((acc, field) => {
                                if (!acc[field.category]) acc[field.category] = [];
                                acc[field.category].push(field);
                                return acc;
                              }, {} as Record<string, FieldDefinition[]>)
                            ).map(([category, fields]) => (
                              <div key={category}>
                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                  {category}
                                </div>
                                {fields.map((field) => {
                                  const Icon = field.icon;
                                  return (
                                    <SelectItem key={field.id} value={field.id}>
                                      <div className="flex items-center space-x-2">
                                        <Icon className="h-4 w-4" />
                                        <span>{field.label}</span>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Operator Selection */}
                      <div>
                        <Label className="text-xs text-muted-foreground mb-2 block">Operator</Label>
                        <Select 
                          value={condition.operator} 
                          onValueChange={(value) => updateCondition(condition.id, { operator: value, value: '' })}
                          disabled={!condition.field}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {getFieldOperators(condition.field).map((operator) => (
                              <SelectItem key={operator.value} value={operator.value}>
                                {operator.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Value Input */}
                      <div className="md:col-span-2">
                        <Label className="text-xs text-muted-foreground mb-2 block">Value</Label>
                        {renderValueInput(condition, index)}
                      </div>
                    </div>

                    {builderConditions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCondition(condition.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-between">
                <Button variant="outline" onClick={addCondition}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Condition
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Play className="mr-2 h-4 w-4" />
                    Test Conditions
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save as Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Condition Templates</CardTitle>
              <p className="text-sm text-muted-foreground">
                Pre-built condition templates for common use cases
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: 'High Value Lead',
                    description: 'Lead value greater than specified amount',
                    category: 'Financial',
                    icon: DollarSign,
                    conditions: 'lead_value > 10000',
                    usage: 145
                  },
                  {
                    name: 'Recent Engagement',
                    description: 'Lead has activity in recent timeframe',
                    category: 'Activity',
                    icon: Activity,
                    conditions: 'last_activity_date within 7 days',
                    usage: 156
                  },
                  {
                    name: 'Hot Lead Status',
                    description: 'Lead status indicates high interest',
                    category: 'Lead Status',
                    icon: Target,
                    conditions: 'status in [hot, qualified]',
                    usage: 234
                  },
                  {
                    name: 'Technology Sector',
                    description: 'Lead from technology industry',
                    category: 'Industry',
                    icon: Building,
                    conditions: 'industry = technology',
                    usage: 67
                  },
                  {
                    name: 'Email Engagement',
                    description: 'High email interaction metrics',
                    category: 'Communication',
                    icon: Mail,
                    conditions: 'email_opens > 5 AND email_clicks > 2',
                    usage: 89
                  },
                  {
                    name: 'Geographic Filter',
                    description: 'Lead from specific location',
                    category: 'Location',
                    icon: MapPin,
                    conditions: 'country = United States',
                    usage: 123
                  }
                ].map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <Card key={index}>
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
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="bg-gray-50 p-2 rounded text-xs font-mono mb-4">
                          {template.conditions}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Used {template.usage} times
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
      </Tabs>

      {/* Condition Builder Dialog */}
      <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Advanced Condition Builder</DialogTitle>
            <DialogDescription>
              Build complex conditional logic for your automation workflows
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {/* Builder content would go here - same as the builder tab but in a dialog */}
              <div className="text-center text-muted-foreground">
                Full builder interface would be rendered here
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBuilderOpen(false)}>
              Cancel
            </Button>
            <Button>
              Save Conditions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
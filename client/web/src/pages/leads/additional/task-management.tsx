'use client';

import { useState, useMemo } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  AlertCircle,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  Paperclip,
  Star,
  Archive,
  RefreshCw,
  Target,
  Users,
  Building,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'proposal' | 'site-visit' | 'documentation' | 'negotiation';
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  leadId?: string;
  leadName?: string;
  leadCompany?: string;
  dealId?: string;
  dealName?: string;
  dueDate: string;
  startDate?: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  attachments: string[];
  comments: TaskComment[];
  subtasks: Subtask[];
  dependencies: string[]; // Task IDs this task depends on
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
  isRecurring: boolean;
  recurrencePattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  customFields?: Record<string, any>;
}

interface TaskComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: string;
}

interface TaskMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'hours';
}

const taskMetrics: TaskMetric[] = [
  {
    id: 'total-tasks',
    title: 'Total Tasks',
    value: 127,
    change: 12.5,
    trend: 'up',
    icon: CheckSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'completed-rate',
    title: 'Completion Rate',
    value: 78.5,
    change: 5.2,
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'percentage'
  },
  {
    id: 'overdue-tasks',
    title: 'Overdue Tasks',
    value: 15,
    change: -8.3,
    trend: 'down',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'number'
  },
  {
    id: 'avg-completion-time',
    title: 'Avg Completion Time',
    value: 6.2,
    change: -1.5,
    trend: 'down',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'hours'
  },
  {
    id: 'active-tasks',
    title: 'Active Tasks',
    value: 42,
    change: 3.7,
    trend: 'up',
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    format: 'number'
  },
  {
    id: 'team-productivity',
    title: 'Team Productivity',
    value: 85.7,
    change: 7.1,
    trend: 'up',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'percentage'
  }
];

const mockTasks: Task[] = [
  {
    id: 'TASK001',
    title: 'Follow up on Metro Plaza Commercial Proposal',
    description: 'Contact client to discuss proposal feedback and address sustainability questions raised during review',
    status: 'in-progress',
    priority: 'high',
    type: 'follow-up',
    assignedTo: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah-j.jpg',
      email: 'sarah.j@buildiyo.com'
    },
    createdBy: {
      id: 'user2',
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    leadId: 'LEAD001',
    leadName: 'Sarah Martinez',
    leadCompany: 'Metro Development Corp',
    dealId: 'DEAL001',
    dealName: 'Metro Plaza Development',
    dueDate: '2024-02-05',
    startDate: '2024-01-30',
    estimatedHours: 2,
    actualHours: 1.5,
    tags: ['high-value', 'proposal', 'sustainability'],
    attachments: ['proposal_feedback.pdf', 'sustainability_options.docx'],
    comments: [
      {
        id: 'COM001',
        authorId: 'user1',
        authorName: 'Sarah Johnson',
        authorAvatar: '/avatars/sarah-j.jpg',
        content: 'Scheduled call for tomorrow at 2 PM to discuss LEED certification options',
        timestamp: '2024-02-01T10:30:00Z',
        isInternal: true
      }
    ],
    subtasks: [
      {
        id: 'SUB001',
        title: 'Research LEED Gold certification costs',
        completed: true,
        assignedTo: 'Sarah Johnson',
        dueDate: '2024-02-02'
      },
      {
        id: 'SUB002',
        title: 'Prepare sustainability upgrade proposal',
        completed: false,
        assignedTo: 'Sarah Johnson',
        dueDate: '2024-02-04'
      }
    ],
    dependencies: [],
    progress: 65,
    createdAt: '2024-01-30T09:00:00Z',
    updatedAt: '2024-02-01T10:30:00Z',
    isRecurring: false
  },
  {
    id: 'TASK002',
    title: 'Site Visit - Residential Complex Phase 2',
    description: 'Conduct site inspection and document current progress for Phase 2 residential development',
    status: 'todo',
    priority: 'medium',
    type: 'site-visit',
    assignedTo: {
      id: 'user3',
      name: 'David Wilson',
      avatar: '/avatars/david-w.jpg',
      email: 'david.w@buildiyo.com'
    },
    createdBy: {
      id: 'user4',
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    leadId: 'LEAD002',
    leadName: 'David Wilson',
    leadCompany: 'Green Valley Homes',
    dealId: 'DEAL002',
    dealName: 'Residential Complex Phase 2',
    dueDate: '2024-02-08',
    estimatedHours: 4,
    tags: ['site-visit', 'residential', 'inspection'],
    attachments: ['site_plans.pdf'],
    comments: [],
    subtasks: [
      {
        id: 'SUB003',
        title: 'Schedule site access with client',
        completed: false,
        assignedTo: 'David Wilson',
        dueDate: '2024-02-06'
      },
      {
        id: 'SUB004',
        title: 'Prepare inspection checklist',
        completed: false,
        assignedTo: 'David Wilson',
        dueDate: '2024-02-07'
      }
    ],
    dependencies: [],
    progress: 0,
    createdAt: '2024-02-01T14:00:00Z',
    updatedAt: '2024-02-01T14:00:00Z',
    isRecurring: false
  },
  {
    id: 'TASK003',
    title: 'Prepare Contract Documentation',
    description: 'Draft and review contract documents for Office Building Renovation project',
    status: 'review',
    priority: 'high',
    type: 'documentation',
    assignedTo: {
      id: 'user5',
      name: 'Emily Rodriguez',
      avatar: '/avatars/emily-r.jpg',
      email: 'emily.r@buildiyo.com'
    },
    createdBy: {
      id: 'user6',
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      email: 'james.w@buildiyo.com'
    },
    leadId: 'LEAD003',
    leadName: 'Emily Rodriguez',
    leadCompany: 'TechStart Inc',
    dealId: 'DEAL003',
    dealName: 'Office Building Renovation',
    dueDate: '2024-02-10',
    startDate: '2024-02-01',
    estimatedHours: 8,
    actualHours: 6,
    tags: ['contract', 'legal', 'documentation'],
    attachments: ['contract_draft_v2.docx', 'legal_review.pdf'],
    comments: [
      {
        id: 'COM002',
        authorId: 'user7',
        authorName: 'Legal Team',
        content: 'Contract looks good, minor revisions needed in section 4.2',
        timestamp: '2024-02-02T16:45:00Z',
        isInternal: true
      }
    ],
    subtasks: [
      {
        id: 'SUB005',
        title: 'Incorporate legal feedback',
        completed: false,
        assignedTo: 'Emily Rodriguez',
        dueDate: '2024-02-05'
      },
      {
        id: 'SUB006',
        title: 'Get final approval from management',
        completed: false,
        assignedTo: 'Emily Rodriguez',
        dueDate: '2024-02-08'
      }
    ],
    dependencies: [],
    progress: 80,
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-02T16:45:00Z',
    isRecurring: false
  },
  {
    id: 'TASK004',
    title: 'Weekly Client Check-in Call',
    description: 'Regular weekly check-in call with major clients to maintain relationships',
    status: 'completed',
    priority: 'medium',
    type: 'call',
    assignedTo: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah-j.jpg',
      email: 'sarah.j@buildiyo.com'
    },
    createdBy: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah-j.jpg',
      email: 'sarah.j@buildiyo.com'
    },
    dueDate: '2024-02-02',
    completedDate: '2024-02-02',
    estimatedHours: 1,
    actualHours: 1.5,
    tags: ['recurring', 'client-relationship', 'check-in'],
    attachments: [],
    comments: [
      {
        id: 'COM003',
        authorId: 'user1',
        authorName: 'Sarah Johnson',
        content: 'All clients satisfied with current progress, no issues raised',
        timestamp: '2024-02-02T11:30:00Z',
        isInternal: true
      }
    ],
    subtasks: [],
    dependencies: [],
    progress: 100,
    createdAt: '2024-01-26T09:00:00Z',
    updatedAt: '2024-02-02T11:30:00Z',
    isRecurring: true,
    recurrencePattern: {
      frequency: 'weekly',
      interval: 1,
      endDate: '2024-12-31'
    }
  }
];

function getStatusColor(status: Task['status']) {
  switch (status) {
    case 'todo': return 'bg-gray-100 text-gray-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'review': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: Task['priority']) {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTypeColor(type: Task['type']) {
  switch (type) {
    case 'call': return 'bg-blue-100 text-blue-800';
    case 'email': return 'bg-purple-100 text-purple-800';
    case 'meeting': return 'bg-green-100 text-green-800';
    case 'follow-up': return 'bg-orange-100 text-orange-800';
    case 'proposal': return 'bg-yellow-100 text-yellow-800';
    case 'site-visit': return 'bg-cyan-100 text-cyan-800';
    case 'documentation': return 'bg-gray-100 text-gray-800';
    case 'negotiation': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'hours') {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'hours':
      return `${value.toFixed(1)}h`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

function isOverdue(dueDate: string, status: Task['status']): boolean {
  if (status === 'completed' || status === 'cancelled') return false;
  return new Date(dueDate) < new Date();
}

export default function TaskManagement() {
  const [tasks] = useState(mockTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (task.leadName && task.leadName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           (task.leadCompany && task.leadCompany.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || task.type === typeFilter;
      const matchesAssignee = assigneeFilter === 'all' || task.assignedTo.name === assigneeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesAssignee;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, typeFilter, assigneeFilter]);

  const summaryStats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;
    const activeTasks = tasks.filter(t => ['todo', 'in-progress', 'review'].includes(t.status)).length;
    const avgProgress = tasks.reduce((sum, t) => sum + t.progress, 0) / totalTasks;

    return {
      totalTasks,
      completedTasks,
      overdueTasks,
      activeTasks,
      completionRate: (completedTasks / totalTasks) * 100,
      avgProgress
    };
  }, [tasks]);

  const uniqueAssignees = useMemo(() => {
    const assignees = new Set();
    tasks.forEach(t => {
      assignees.add(t.assignedTo.name);
      assignees.add(t.createdBy.name);
    });
    return Array.from(assignees) as string[];
  }, [tasks]);

  const uniqueTypes = useMemo(() => {
    const types = new Set();
    tasks.forEach(t => types.add(t.type));
    return Array.from(types) as string[];
  }, [tasks]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Task Management</h1>
          <p className="text-gray-600">Organize, track, and manage team tasks and activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {taskMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          
          return (
            <Card key={metric.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-semibold",
                    isPositive ? "text-emerald-600" : "text-red-600"
                  )}>
                    {isPositive ? '↗' : '↙'} {Math.abs(metric.change)}%
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-500">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatValue(metric.value, metric.format)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Task Management Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Active Tasks Tab */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {uniqueAssignees.map((assignee) => (
                  <SelectItem key={assignee} value={assignee}>{assignee}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <Badge className={cn("text-xs", getStatusColor(task.status))}>
                              {task.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                              {task.priority.toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getTypeColor(task.type))}>
                              {task.type.replace('-', ' ').toUpperCase()}
                            </Badge>
                            {isOverdue(task.dueDate, task.status) && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                OVERDUE
                              </Badge>
                            )}
                            {task.isRecurring && (
                              <Badge className="bg-purple-100 text-purple-800 text-xs">
                                RECURRING
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{task.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {task.leadName && (
                              <>
                                <div className="flex items-center space-x-1">
                                  <Building className="h-4 w-4" />
                                  <span>{task.leadCompany}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <User className="h-4 w-4" />
                                  <span>{task.leadName}</span>
                                </div>
                                <span>•</span>
                              </>
                            )}
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            {task.status !== 'completed' && (
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark Complete
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Assigned To</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignedTo.avatar} />
                              <AvatarFallback className="text-xs">
                                {task.assignedTo.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{task.assignedTo.name}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Time Tracking</p>
                          <p className="text-sm font-medium">
                            {task.actualHours ? `${task.actualHours}h` : '0h'} / {task.estimatedHours}h
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Subtasks</p>
                          <p className="text-sm font-medium">
                            {task.subtasks.filter(s => s.completed).length} / {task.subtasks.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Comments</p>
                          <p className="text-sm font-medium">{task.comments.length}</p>
                        </div>
                      </div>

                      {/* Subtasks */}
                      {task.subtasks.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Subtasks:</p>
                          <div className="space-y-1">
                            {task.subtasks.slice(0, 3).map((subtask) => (
                              <div key={subtask.id} className="flex items-center space-x-2 text-sm">
                                <div className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center",
                                  subtask.completed ? "bg-green-100 border-green-500" : "border-gray-300"
                                )}>
                                  {subtask.completed && <CheckCircle className="h-3 w-3 text-green-600" />}
                                </div>
                                <span className={subtask.completed ? "line-through text-gray-500" : "text-gray-700"}>
                                  {subtask.title}
                                </span>
                              </div>
                            ))}
                            {task.subtasks.length > 3 && (
                              <p className="text-xs text-gray-500">
                                +{task.subtasks.length - 3} more subtasks
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Tags and Attachments */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {task.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{task.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          {task.attachments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Paperclip className="h-4 w-4" />
                              <span>{task.attachments.length}</span>
                            </div>
                          )}
                          <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTasks.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || typeFilter !== 'all' || assigneeFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first task to get started"
                    }
                  </p>
                  {(!searchQuery && statusFilter === 'all' && priorityFilter === 'all' && typeFilter === 'all' && assigneeFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Task
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* All Tasks Tab */}
        <TabsContent value="all" className="space-y-6">
          <div className="text-center py-8">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">All tasks view would include archived and historical tasks</p>
          </div>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Task calendar view would be displayed here</p>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Task performance trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Productivity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Team productivity analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
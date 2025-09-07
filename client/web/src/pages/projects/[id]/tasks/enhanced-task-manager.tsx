import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  MessageSquare,
  Eye,
  Download,
  Upload,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  User,
  DollarSign,
  Flag,
  AlertCircle,
  CheckCircle2,
  Circle,
  ArrowUp,
  ArrowDown,
  Minus,
  PauseCircle,
  PlayCircle,
  XCircle,
  Users,
  FileText,
  Paperclip,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { format, parseISO, differenceInDays, addDays, isAfter } from 'date-fns';
import { toast } from 'sonner';

// Enhanced Task Interface
interface EnhancedTask {
  id: string;
  name: string;
  status: 'in-progress' | 'planning' | 'development' | 'to-do' | 'completed' | 'finalization';
  activityCategory: 'development' | 'planning' | 'finalization';
  assignee: {
    id: string;
    name: string;
    avatar?: string;
    team?: string;
  };
  priority: 'urgent' | 'high' | 'normal' | 'low';
  estimatedDuration: string;
  startDate: string;
  dueDate: string;
  dateVariance: number;
  estimatedCost: number;
  actualCost: number;
  comments: number;
  attachments: number;
  progress: number;
  team?: string;
  dependencies?: string[];
  subtasks?: EnhancedTask[];
  isExpanded?: boolean;
  level?: number;
  parentId?: string;
}

// Mock Data Generation
const generateMockTasks = (): EnhancedTask[] => {
  const tasks: EnhancedTask[] = [
    {
      id: '1',
      name: 'Site visit and evaluation',
      status: 'in-progress',
      activityCategory: 'planning',
      assignee: { id: '1', name: 'John Doe', team: 'Planning Team' },
      priority: 'urgent',
      estimatedDuration: '8/31/24 4am - 9/2/24 4am',
      startDate: '2024-08-31',
      dueDate: '2024-09-02',
      dateVariance: 2,
      estimatedCost: 25000,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 45,
      team: 'Planning Team'
    },
    {
      id: '2',
      name: 'Preparation of utilities and equipment',
      status: 'planning',
      activityCategory: 'planning',
      assignee: { id: '2', name: 'Jane Smith', team: 'Operations' },
      priority: 'high',
      estimatedDuration: '9/2/24 4am - 9/8/24 4am',
      startDate: '2024-09-02',
      dueDate: '2024-09-08',
      dateVariance: 7,
      estimatedCost: 25000,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 0,
      team: 'Operations'
    },
    {
      id: '3',
      name: 'Awarding of the construction contract',
      status: 'planning',
      activityCategory: 'planning',
      assignee: { id: '3', name: 'Mike Johnson', team: 'Procurement' },
      priority: 'urgent',
      estimatedDuration: '8/27/24 4am - 9/28/24 4am',
      startDate: '2024-08-27',
      dueDate: '2024-09-28',
      dateVariance: 1,
      estimatedCost: 0,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 20,
      team: 'Procurement'
    },
    {
      id: '4',
      name: 'Site excavation',
      status: 'development',
      activityCategory: 'development',
      assignee: { id: '4', name: 'Sarah Wilson', team: 'Construction' },
      priority: 'normal',
      estimatedDuration: '9/10/24 4am - 9/16/24 4am',
      startDate: '2024-09-10',
      dueDate: '2024-09-16',
      dateVariance: 6,
      estimatedCost: 2000,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 0,
      team: 'Construction',
      subtasks: [
        {
          id: '4.1',
          name: 'Floors and wall erection',
          status: 'development',
          activityCategory: 'development',
          assignee: { id: '4', name: 'Sarah Wilson', team: 'Construction' },
          priority: 'normal',
          estimatedDuration: '9/30/24 4am - 10/7/24 4am',
          startDate: '2024-09-30',
          dueDate: '2024-10-07',
          dateVariance: 7,
          estimatedCost: 11500,
          actualCost: 0,
          comments: 0,
          attachments: 0,
          progress: 0,
          team: 'Construction',
          parentId: '4'
        },
        {
          id: '4.2',
          name: 'Roof installment',
          status: 'to-do',
          activityCategory: 'development',
          assignee: { id: '5', name: 'Tom Brown', team: 'Construction' },
          priority: 'high',
          estimatedDuration: '10/7/24 4am - 10/13/24 4am',
          startDate: '2024-10-07',
          dueDate: '2024-10-13',
          dateVariance: 5,
          estimatedCost: 11500,
          actualCost: 0,
          comments: 0,
          attachments: 0,
          progress: 0,
          team: 'Construction',
          parentId: '4'
        }
      ]
    },
    {
      id: '5',
      name: 'Site clearing and preparation',
      status: 'development',
      activityCategory: 'development',
      assignee: { id: '5', name: 'Tom Brown', team: 'Construction' },
      priority: 'high',
      estimatedDuration: '9/2/24 4am - 9/8/24 4am',
      startDate: '2024-09-02',
      dueDate: '2024-09-08',
      dateVariance: 7,
      estimatedCost: 1250,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 30,
      team: 'Construction'
    },
    {
      id: '6',
      name: 'Installment of foundation and backfilling',
      status: 'in-progress',
      activityCategory: 'development',
      assignee: { id: '6', name: 'Emily Davis', team: 'Foundation' },
      priority: 'normal',
      estimatedDuration: '9/16/24 4am - 9/30/24 4am',
      startDate: '2024-09-16',
      dueDate: '2024-09-30',
      dateVariance: 14,
      estimatedCost: 0,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 15,
      team: 'Foundation',
      subtasks: [
        {
          id: '6.1',
          name: 'Footings installment',
          status: 'to-do',
          activityCategory: 'development',
          assignee: { id: '6', name: 'Emily Davis', team: 'Foundation' },
          priority: 'normal',
          estimatedDuration: '9/16/24 4am - 9/23/24 4am',
          startDate: '2024-09-16',
          dueDate: '2024-09-23',
          dateVariance: 7,
          estimatedCost: 11000,
          actualCost: 0,
          comments: 0,
          attachments: 0,
          progress: 0,
          team: 'Foundation',
          parentId: '6'
        },
        {
          id: '6.2',
          name: 'Wall foundation installment',
          status: 'to-do',
          activityCategory: 'development',
          assignee: { id: '6', name: 'Emily Davis', team: 'Foundation' },
          priority: 'normal',
          estimatedDuration: '9/23/24 4am - 9/30/24 4am',
          startDate: '2024-09-23',
          dueDate: '2024-09-30',
          dateVariance: 7,
          estimatedCost: 11000,
          actualCost: 0,
          comments: 0,
          attachments: 0,
          progress: 0,
          team: 'Foundation',
          parentId: '6'
        }
      ]
    },
    {
      id: '7',
      name: 'Wall exterior and interior finishing',
      status: 'finalization',
      activityCategory: 'finalization',
      assignee: { id: '7', name: 'Alex Chen', team: 'Finishing' },
      priority: 'normal',
      estimatedDuration: '10/12/24 4am - 10/16/24 4am',
      startDate: '2024-10-12',
      dueDate: '2024-10-16',
      dateVariance: 4,
      estimatedCost: 1800,
      actualCost: 0,
      comments: 0,
      attachments: 0,
      progress: 0,
      team: 'Finishing'
    }
  ];

  return tasks;
};

// Status Badge Component
const StatusBadge = ({ status }: { status: EnhancedTask['status'] }) => {
  const statusConfig = {
    'in-progress': { color: 'bg-blue-100 text-blue-800', icon: PlayCircle, label: 'In Progress' },
    'planning': { color: 'bg-purple-100 text-purple-800', icon: Circle, label: 'Planning' },
    'development': { color: 'bg-orange-100 text-orange-800', icon: Activity, label: 'Development' },
    'to-do': { color: 'bg-gray-100 text-gray-800', icon: Circle, label: 'To Do' },
    'completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle2, label: 'Completed' },
    'finalization': { color: 'bg-yellow-100 text-yellow-800', icon: PauseCircle, label: 'Finalization' }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={cn(config.color, 'font-medium')}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};

// Priority Badge Component
const PriorityBadge = ({ priority }: { priority: EnhancedTask['priority'] }) => {
  const priorityConfig = {
    urgent: { color: 'text-red-600', icon: AlertCircle, label: 'Urgent' },
    high: { color: 'text-orange-600', icon: ArrowUp, label: 'High' },
    normal: { color: 'text-blue-600', icon: Minus, label: 'Normal' },
    low: { color: 'text-gray-600', icon: ArrowDown, label: 'Low' }
  };

  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-center gap-1', config.color)}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
};

// Activity Category Badge Component
const ActivityCategoryBadge = ({ category }: { category: EnhancedTask['activityCategory'] }) => {
  const categoryConfig = {
    development: { color: 'bg-orange-100 text-orange-800', label: 'Development' },
    planning: { color: 'bg-purple-100 text-purple-800', label: 'Planning' },
    finalization: { color: 'bg-yellow-100 text-yellow-800', label: 'Finalization' }
  };

  const config = categoryConfig[category];

  return (
    <Badge variant="secondary" className={cn(config.color, 'font-medium')}>
      {config.label}
    </Badge>
  );
};

// Main Enhanced Task Manager Component
export default function EnhancedTaskManager() {
  const { id: projectId } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<EnhancedTask[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<EnhancedTask | null>(null);

  useEffect(() => {
    // Load mock tasks
    setLoading(true);
    setTimeout(() => {
      setTasks(generateMockTasks());
      setLoading(false);
    }, 500);
  }, [projectId]);

  // Toggle row expansion
  const toggleRowExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedRows(newExpanded);
  };

  // Toggle task selection
  const toggleTaskSelection = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  // Select all tasks
  const toggleAllSelection = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map(t => t.id)));
    }
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = !searchQuery || 
        task.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, filterStatus, filterPriority]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const planning = tasks.filter(t => t.activityCategory === 'planning').length;
    const development = tasks.filter(t => t.activityCategory === 'development').length;
    const finalization = tasks.filter(t => t.activityCategory === 'finalization').length;
    const totalCost = tasks.reduce((sum, t) => sum + t.estimatedCost, 0);
    const actualCost = tasks.reduce((sum, t) => sum + t.actualCost, 0);

    return { total, planning, development, finalization, totalCost, actualCost };
  }, [tasks]);

  // Render task row
  const renderTaskRow = (task: EnhancedTask, level: number = 0) => {
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    const isExpanded = expandedRows.has(task.id);
    const isSelected = selectedTasks.has(task.id);
    const variance = task.dateVariance;
    const varianceColor = variance > 0 ? 'text-red-600' : variance < 0 ? 'text-green-600' : 'text-gray-600';

    return (
      <>
        <tr 
          key={task.id}
          className={cn(
            'hover:bg-gray-50 border-b',
            isSelected && 'bg-blue-50',
            level > 0 && 'bg-gray-50/50'
          )}
        >
          {/* Checkbox */}
          <td className="px-3 py-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => toggleTaskSelection(task.id)}
            />
          </td>

          {/* Task Name with Expand */}
          <td className="px-3 py-2">
            <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
              {hasSubtasks && (
                <button
                  onClick={() => toggleRowExpansion(task.id)}
                  className="p-0.5 hover:bg-gray-200 rounded"
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}
              <span className="font-medium text-sm">{task.name}</span>
            </div>
          </td>

          {/* Status */}
          <td className="px-3 py-2">
            <StatusBadge status={task.status} />
          </td>

          {/* Activity Category */}
          <td className="px-3 py-2">
            <ActivityCategoryBadge category={task.activityCategory} />
          </td>

          {/* Assignee */}
          <td className="px-3 py-2">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">
                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{task.assignee.name}</p>
                {task.team && (
                  <p className="text-xs text-muted-foreground">{task.team}</p>
                )}
              </div>
            </div>
          </td>

          {/* Priority */}
          <td className="px-3 py-2">
            <PriorityBadge priority={task.priority} />
          </td>

          {/* Estimated Duration */}
          <td className="px-3 py-2">
            <div className="text-sm">{task.estimatedDuration}</div>
          </td>

          {/* Start Date */}
          <td className="px-3 py-2">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3 text-gray-400" />
              {format(parseISO(task.startDate), 'M/d/yy')}
            </div>
          </td>

          {/* Due Date */}
          <td className="px-3 py-2">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-3 w-3 text-gray-400" />
              {format(parseISO(task.dueDate), 'M/d/yy')}
            </div>
          </td>

          {/* Date Variance */}
          <td className="px-3 py-2">
            <div className={cn('flex items-center gap-1 text-sm font-medium', varianceColor)}>
              {variance > 0 ? <TrendingUp className="h-3 w-3" /> : variance < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
              {Math.abs(variance)}d
            </div>
          </td>

          {/* Estimated Cost */}
          <td className="px-3 py-2">
            <div className="text-sm font-medium">
              {task.estimatedCost > 0 ? `₹${task.estimatedCost.toLocaleString()}` : '-'}
            </div>
          </td>

          {/* Actual Cost */}
          <td className="px-3 py-2">
            <div className="text-sm font-medium">
              {task.actualCost > 0 ? `₹${task.actualCost.toLocaleString()}` : '-'}
            </div>
          </td>

          {/* Comments & Attachments */}
          <td className="px-3 py-2">
            <div className="flex items-center gap-3">
              {task.comments > 0 && (
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageSquare className="h-3 w-3" />
                  <span className="text-xs">{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-xs">{task.attachments}</span>
                </div>
              )}
            </div>
          </td>

          {/* Actions */}
          <td className="px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditingTask(task)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>

        {/* Render subtasks if expanded */}
        {isExpanded && hasSubtasks && task.subtasks?.map(subtask => 
          renderTaskRow(subtask, level + 1)
        )}
      </>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Stats */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.planning}</p>
            <p className="text-xs text-muted-foreground">Planning</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.development}</p>
            <p className="text-xs text-muted-foreground">Development</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.finalization}</p>
            <p className="text-xs text-muted-foreground">Finalization</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">₹{(stats.totalCost / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground">Estimated Cost</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">₹{(stats.actualCost / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground">Actual Cost</p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="px-6 py-3 border-b bg-white">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[150px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="finalization">Finalization</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-[150px] h-9">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowTaskDialog(true)} className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full min-w-[1400px]">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-3 text-left">
                <Checkbox
                  checked={selectedTasks.size === tasks.length && tasks.length > 0}
                  onCheckedChange={toggleAllSelection}
                />
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Name</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Status</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Activity Category</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Assignee</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Priority</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Estimated Duration</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Start Date</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Due Date</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Date Variance</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Estimated Cost</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Actual Cost</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">
                <MessageSquare className="h-4 w-4 inline mr-1" />
                <Paperclip className="h-4 w-4 inline" />
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={14} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                </td>
              </tr>
            ) : filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={14} className="text-center py-8 text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              filteredTasks.map(task => renderTaskRow(task))
            )}
          </tbody>
        </table>
      </div>

      {/* Task Dialog - Placeholder */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for the project
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-name">Task Name</Label>
              <Input id="task-name" placeholder="Enter task name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter task description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Task created successfully');
              setShowTaskDialog(false);
            }}>
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
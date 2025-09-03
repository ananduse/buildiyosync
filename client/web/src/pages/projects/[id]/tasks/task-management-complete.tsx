import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  ArrowUpCircle,
  ArrowDownCircle,
  MinusCircle,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Link2,
  Flag,
  Tag,
  Paperclip,
  MessageSquare,
  GitBranch,
  BarChart3,
  List,
  Kanban,
  GanttChart,
  CalendarDays,
  FileText,
  Download,
  Upload,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  Briefcase,
  Target,
  TrendingUp,
  AlertTriangle,
  XCircle,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Archive,
  Share2,
  Bell,
  History,
  Zap,
  Shield,
  DollarSign,
  Percent,
  Timer,
  Activity,
  Layers,
  GitMerge,
  GitPullRequest,
  Hash,
  FolderOpen,
  Home,
  ChevronLeft,
  Save,
  X,
  Check,
  PlusCircle,
  MinusSquare,
  Square,
  CheckSquare,
  ChevronUp,
  BarChart,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, addDays, isOverdue, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

// Types
interface Task {
  id: string;
  taskCode: string;
  title: string;
  description: string;
  type: 'task' | 'milestone' | 'subtask' | 'bug' | 'feature' | 'epic';
  status: 'todo' | 'in-progress' | 'in-review' | 'blocked' | 'completed' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    department: string;
  };
  reporter: {
    id: string;
    name: string;
    avatar: string;
  };
  startDate: string;
  dueDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  estimatedHours: number;
  actualHours: number;
  remainingHours: number;
  progress: number;
  dependencies: string[];
  blockedBy: string[];
  blocks: string[];
  subtasks: Task[];
  parentId?: string;
  tags: string[];
  attachments: number;
  comments: Comment[];
  watchers: string[];
  customFields: Record<string, any>;
  workLog: WorkLogEntry[];
  checklist: ChecklistItem[];
  budget: {
    estimated: number;
    actual: number;
    currency: string;
  };
  risk: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  effort: number;
  sprint?: string;
  epic?: string;
  labels: string[];
  lastUpdated: string;
  createdAt: string;
}

interface WorkLogEntry {
  id: string;
  user: string;
  date: string;
  hours: number;
  description: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  date: string;
}

// Mock data
const teamMembers = [
  { id: 'USR001', name: 'Rajesh Kumar', avatar: '', role: 'Senior Developer', department: 'Engineering' },
  { id: 'USR002', name: 'Priya Sharma', avatar: '', role: 'UI/UX Designer', department: 'Design' },
  { id: 'USR003', name: 'Amit Patel', avatar: '', role: 'Backend Developer', department: 'Engineering' },
  { id: 'USR004', name: 'Sneha Reddy', avatar: '', role: 'QA Engineer', department: 'Quality' },
  { id: 'USR005', name: 'Vikram Singh', avatar: '', role: 'Project Manager', department: 'Management' },
];

// Generate mock tasks
const generateMockTasks = (projectId: string): Task[] => {
  const tasks: Task[] = [];
  const taskTitles = [
    'Foundation Work - North Block',
    'Structural Framework Installation',
    'Electrical Wiring - Ground Floor',
    'Plumbing Installation - Phase 1',
    'Interior Design Planning',
    'HVAC System Installation',
    'Safety Inspection - Milestone',
    'Flooring Work - All Floors',
    'Painting and Finishing',
    'Landscaping Design',
  ];

  for (let i = 0; i < 10; i++) {
    const assignee = teamMembers[Math.floor(Math.random() * teamMembers.length)];
    const reporter = teamMembers[Math.floor(Math.random() * teamMembers.length)];
    const startDate = new Date(2024, 0, 1 + i * 3);
    const dueDate = addDays(startDate, Math.floor(Math.random() * 14) + 7);
    const progress = Math.floor(Math.random() * 101);
    
    const task: Task = {
      id: `TSK${String(i + 1).padStart(3, '0')}`,
      taskCode: `${projectId}-TSK-${String(i + 1).padStart(3, '0')}`,
      title: taskTitles[i % taskTitles.length],
      description: `Detailed description for ${taskTitles[i % taskTitles.length]}. This task involves coordination with multiple teams.`,
      type: i % 7 === 0 ? 'milestone' : 'task',
      status: progress === 100 ? 'completed' : progress > 50 ? 'in-progress' : 'todo',
      priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as Task['priority'],
      assignee,
      reporter,
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      estimatedHours: Math.floor(Math.random() * 40) + 8,
      actualHours: Math.floor(progress / 100 * (Math.random() * 40 + 8)),
      remainingHours: Math.floor((100 - progress) / 100 * (Math.random() * 40 + 8)),
      progress,
      dependencies: i > 0 && Math.random() > 0.7 ? [`TSK${String(i).padStart(3, '0')}`] : [],
      blockedBy: Math.random() > 0.9 ? [`TSK${String(Math.floor(Math.random() * i) + 1).padStart(3, '0')}`] : [],
      blocks: [],
      subtasks: [],
      tags: ['construction', 'phase-1'],
      attachments: Math.floor(Math.random() * 5),
      comments: [],
      watchers: [reporter.id],
      customFields: {},
      workLog: [],
      checklist: [
        { id: '1', text: 'Review requirements', completed: Math.random() > 0.5 },
        { id: '2', text: 'Prepare materials', completed: Math.random() > 0.5 },
        { id: '3', text: 'Execute task', completed: false },
      ],
      budget: {
        estimated: Math.floor(Math.random() * 100000) + 10000,
        actual: Math.floor(Math.random() * 100000) + 10000,
        currency: 'INR',
      },
      risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Task['risk'],
      impact: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as Task['impact'],
      effort: Math.floor(Math.random() * 13) + 1,
      labels: [],
      lastUpdated: new Date().toISOString(),
      createdAt: startDate.toISOString(),
    };

    // Add subtasks
    if (i < 5) {
      for (let j = 0; j < 3; j++) {
        task.subtasks.push({
          ...task,
          id: `TSK${String(i + 1).padStart(3, '0')}-SUB${j + 1}`,
          taskCode: `${projectId}-TSK-${String(i + 1).padStart(3, '0')}-SUB${j + 1}`,
          title: `Subtask ${j + 1}: ${task.title}`,
          type: 'subtask',
          parentId: task.id,
          subtasks: [],
        });
      }
    }

    tasks.push(task);
  }

  return tasks;
};

// Task Form Component
const TaskForm = ({ task, onSave, onCancel }: { task?: Task | null; onSave: (task: Partial<Task>) => void; onCancel: () => void }) => {
  const [formData, setFormData] = useState<Partial<Task>>(task || {
    title: '',
    description: '',
    type: 'task',
    status: 'todo',
    priority: 'medium',
    assignee: teamMembers[0],
    estimatedHours: 8,
    progress: 0,
    tags: [],
    checklist: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title *</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as Task['type'] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="task">Task</SelectItem>
              <SelectItem value="milestone">Milestone</SelectItem>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData({ ...formData, priority: value as Task['priority'] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as Task['status'] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">Assignee</Label>
          <Select
            value={formData.assignee?.id}
            onValueChange={(value) => {
              const assignee = teamMembers.find(m => m.id === value);
              if (assignee) setFormData({ ...formData, assignee });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {formData.startDate ? format(parseISO(formData.startDate), 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={formData.startDate ? parseISO(formData.startDate) : undefined}
                onSelect={(date) => setFormData({ ...formData, startDate: date?.toISOString() })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {formData.dueDate ? format(parseISO(formData.dueDate), 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={formData.dueDate ? parseISO(formData.dueDate) : undefined}
                onSelect={(date) => setFormData({ ...formData, dueDate: date?.toISOString() })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedHours">Estimated Hours</Label>
        <Input
          id="estimatedHours"
          type="number"
          value={formData.estimatedHours || 0}
          onChange={(e) => setFormData({ ...formData, estimatedHours: parseInt(e.target.value) })}
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="progress">Progress ({formData.progress || 0}%)</Label>
        <Slider
          id="progress"
          value={[formData.progress || 0]}
          onValueChange={(value) => setFormData({ ...formData, progress: value[0] })}
          max={100}
          step={5}
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogFooter>
    </form>
  );
};

// Main Component
export default function TaskManagementComplete() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<'list' | 'kanban' | 'gantt' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [groupBy, setGroupBy] = useState<'none' | 'status' | 'priority' | 'assignee'>('status');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineEditValue, setInlineEditValue] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockTasks = generateMockTasks(projectId || 'P001');
      setTasks(mockTasks);
      setLoading(false);
    };
    loadTasks();
  }, [projectId]);

  // Helper functions
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo': return <Circle className="h-4 w-4" />;
      case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-500" />;
      case 'in-review': return <RefreshCw className="h-4 w-4 text-orange-500" />;
      case 'blocked': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <Archive className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'high': return <ArrowUpCircle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <MinusCircle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <ArrowDownCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'task': return <CheckCircle2 className="h-4 w-4" />;
      case 'milestone': return <Flag className="h-4 w-4" />;
      case 'bug': return <AlertTriangle className="h-4 w-4" />;
      case 'feature': return <Zap className="h-4 w-4" />;
      case 'epic': return <Layers className="h-4 w-4" />;
      case 'subtask': return <GitMerge className="h-4 w-4" />;
    }
  };

  // Task operations
  const handleCreateTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: `TSK${String(tasks.length + 1).padStart(3, '0')}`,
      taskCode: `${projectId}-TSK-${String(tasks.length + 1).padStart(3, '0')}`,
      title: taskData.title || '',
      description: taskData.description || '',
      type: taskData.type || 'task',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || teamMembers[0],
      reporter: teamMembers[0],
      startDate: taskData.startDate || new Date().toISOString(),
      dueDate: taskData.dueDate || addDays(new Date(), 7).toISOString(),
      estimatedHours: taskData.estimatedHours || 8,
      actualHours: 0,
      remainingHours: taskData.estimatedHours || 8,
      progress: taskData.progress || 0,
      dependencies: [],
      blockedBy: [],
      blocks: [],
      subtasks: [],
      tags: taskData.tags || [],
      attachments: 0,
      comments: [],
      watchers: [],
      customFields: {},
      workLog: [],
      checklist: taskData.checklist || [],
      budget: { estimated: 0, actual: 0, currency: 'INR' },
      risk: 'low',
      impact: 'low',
      effort: 1,
      labels: [],
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setShowNewTaskDialog(false);
    toast.success('Task created successfully');
  };

  const handleUpdateTask = (taskData: Partial<Task>) => {
    if (!editingTask) return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...taskData, lastUpdated: new Date().toISOString() }
        : task
    ));
    setEditingTask(null);
    toast.success('Task updated successfully');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId && task.parentId !== taskId));
    toast.success('Task deleted successfully');
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, lastUpdated: new Date().toISOString() }
        : task
    ));
    toast.success('Status updated');
  };

  const handleInlineEdit = (taskId: string, field: keyof Task, value: any) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, [field]: value, lastUpdated: new Date().toISOString() }
        : task
    ));
    setInlineEditingId(null);
    toast.success('Task updated');
  };

  const handleAddSubtask = (parentId: string) => {
    const parent = tasks.find(t => t.id === parentId);
    if (!parent) return;

    const newSubtask: Task = {
      id: `${parentId}-SUB${parent.subtasks.length + 1}`,
      taskCode: `${parent.taskCode}-SUB${parent.subtasks.length + 1}`,
      title: `New Subtask`,
      description: '',
      type: 'subtask',
      status: 'todo',
      priority: 'medium',
      assignee: parent.assignee,
      reporter: parent.reporter,
      startDate: parent.startDate,
      dueDate: parent.dueDate,
      estimatedHours: 4,
      actualHours: 0,
      remainingHours: 4,
      progress: 0,
      dependencies: [],
      blockedBy: [],
      blocks: [],
      subtasks: [],
      parentId: parentId,
      tags: parent.tags,
      attachments: 0,
      comments: [],
      watchers: [],
      customFields: {},
      workLog: [],
      checklist: [],
      budget: { estimated: 0, actual: 0, currency: 'INR' },
      risk: 'low',
      impact: 'low',
      effort: 1,
      labels: [],
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    setTasks(tasks.map(task => 
      task.id === parentId 
        ? { ...task, subtasks: [...task.subtasks, newSubtask] }
        : task
    ));
    toast.success('Subtask added');
  };

  const toggleTaskExpand = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskCode.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      const matchesAssignee = selectedAssignee === 'all' || task.assignee.id === selectedAssignee;
      const matchesCompleted = showCompleted || task.status !== 'completed';

      return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesCompleted;
    });
  }, [tasks, searchQuery, selectedStatus, selectedPriority, selectedAssignee, showCompleted]);

  // Group tasks
  const groupedTasks = useMemo(() => {
    if (groupBy === 'none') return { 'All Tasks': filteredTasks };

    const groups: Record<string, Task[]> = {};
    
    filteredTasks.forEach(task => {
      let key = '';
      switch (groupBy) {
        case 'status':
          key = task.status;
          break;
        case 'priority':
          key = task.priority;
          break;
        case 'assignee':
          key = task.assignee.name;
          break;
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    });

    return groups;
  }, [filteredTasks, groupBy]);

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const overdue = tasks.filter(t => 
      t.status !== 'completed' && 
      new Date(t.dueDate) < new Date()
    ).length;

    return {
      total,
      completed,
      inProgress,
      blocked,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks]);

  // Render task row
  const renderTaskRow = (task: Task, level: number = 0) => (
    <div key={task.id} className={cn("group", level > 0 && "ml-8")}>
      <Card className="mb-2 hover:shadow-md transition-shadow">
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            {/* Expand/Collapse for tasks with subtasks */}
            {task.subtasks.length > 0 && (
              <button
                onClick={() => toggleTaskExpand(task.id)}
                className="mt-1 p-0.5 hover:bg-gray-100 rounded"
              >
                {expandedTasks.has(task.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
            
            {/* Checkbox */}
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={(checked) => 
                handleStatusChange(task.id, checked ? 'completed' : 'todo')
              }
              className="mt-1"
            />

            {/* Task content */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Task header */}
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(task.type)}
                    <span className="text-xs text-muted-foreground">{task.taskCode}</span>
                    {getPriorityIcon(task.priority)}
                    {getStatusIcon(task.status)}
                    {task.blockedBy.length > 0 && (
                      <Badge variant="destructive" className="text-xs">Blocked</Badge>
                    )}
                  </div>

                  {/* Task title - Inline editable */}
                  {inlineEditingId === task.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={inlineEditValue}
                        onChange={(e) => setInlineEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleInlineEdit(task.id, 'title', inlineEditValue);
                          } else if (e.key === 'Escape') {
                            setInlineEditingId(null);
                          }
                        }}
                        className="h-7"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleInlineEdit(task.id, 'title', inlineEditValue)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setInlineEditingId(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <h4 
                      className="font-medium text-sm mb-1 cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        setInlineEditingId(task.id);
                        setInlineEditValue(task.title);
                      }}
                    >
                      {task.title}
                    </h4>
                  )}

                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                    {task.description}
                  </p>

                  {/* Task meta */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{format(parseISO(task.dueDate), 'MMM d')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{task.assignee.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{task.estimatedHours}h</span>
                    </div>
                    {task.attachments > 0 && (
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        <span>{task.attachments}</span>
                      </div>
                    )}
                    {task.comments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{task.comments.length}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <div className="text-right mr-2">
                    <Progress value={task.progress} className="w-20 h-2" />
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                  
                  {/* Add Subtask button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddSubtask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingTask(task)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Task
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddSubtask(task.id)}>
                        <GitBranch className="h-4 w-4 mr-2" />
                        Add Subtask
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Render subtasks */}
      {expandedTasks.has(task.id) && task.subtasks.map(subtask => 
        renderTaskRow(subtask, level + 1)
      )}
    </div>
  );

  // Calendar view helpers
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = parseISO(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(selectedMonth));
    const end = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Tabs defaultValue="tasks" className="h-full flex flex-col">
        <div className="bg-white border-b px-6 py-3">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tasks" className="flex-1 flex flex-col mt-0">
          {/* Stats */}
          <div className="px-6 py-4 bg-white border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                <p className="text-xs text-muted-foreground">Blocked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{stats.overdue}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Progress value={stats.completionRate} className="h-2 w-16" />
                  <span className="text-sm font-bold">{stats.completionRate}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Progress</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-3 bg-white border-b">
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[140px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full sm:w-[140px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={groupBy} onValueChange={(v) => setGroupBy(v as any)}>
                  <SelectTrigger className="w-full sm:w-[140px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="status">By Status</SelectItem>
                    <SelectItem value="priority">By Priority</SelectItem>
                    <SelectItem value="assignee">By Assignee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex border rounded-md">
                  <Button
                    variant={view === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setView('list')}
                    className="rounded-r-none h-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === 'kanban' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setView('kanban')}
                    className="rounded-none border-x h-9"
                  >
                    <Kanban className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === 'gantt' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setView('gantt')}
                    className="rounded-none border-r h-9"
                  >
                    <GanttChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === 'calendar' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setView('calendar')}
                    className="rounded-l-none h-9"
                  >
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={() => setShowNewTaskDialog(true)} className="h-9">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : view === 'list' ? (
              <div className="p-6">
                {Object.entries(groupedTasks).map(([group, tasks]) => (
                  <div key={group} className="mb-6">
                    {groupBy !== 'none' && (
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        {groupBy === 'status' && getStatusIcon(group as Task['status'])}
                        {groupBy === 'priority' && getPriorityIcon(group as Task['priority'])}
                        <span className="capitalize">{group.replace('-', ' ')}</span>
                        <Badge variant="secondary">{tasks.length}</Badge>
                      </h3>
                    )}
                    <div>
                      {tasks.map(task => renderTaskRow(task))}
                    </div>
                  </div>
                ))}
              </div>
            ) : view === 'kanban' ? (
              <div className="h-full p-6">
                <div className="flex gap-4 h-full overflow-x-auto">
                  {['todo', 'in-progress', 'in-review', 'blocked', 'completed'].map(status => {
                    const statusTasks = filteredTasks.filter(t => t.status === status);
                    return (
                      <div key={status} className="flex-shrink-0 w-80 flex flex-col h-full">
                        <div className="bg-gray-100 rounded-lg p-3 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(status as Task['status'])}
                              <h3 className="font-medium capitalize">{status.replace('-', ' ')}</h3>
                              <Badge variant="secondary">{statusTasks.length}</Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <ScrollArea className="flex-1">
                            <div className="space-y-2 pr-2">
                              {statusTasks.map(task => (
                                <Card key={task.id} className="cursor-move hover:shadow-md transition-shadow">
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        {getTypeIcon(task.type)}
                                        <span className="text-xs text-muted-foreground">{task.taskCode}</span>
                                      </div>
                                      {getPriorityIcon(task.priority)}
                                    </div>
                                    <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                                    <div className="flex items-center justify-between">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-xs">
                                          {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-3 w-3" />
                                        {format(parseISO(task.dueDate), 'MMM d')}
                                      </div>
                                    </div>
                                    <Progress value={task.progress} className="mt-2 h-1" />
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : view === 'gantt' ? (
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gantt Chart</CardTitle>
                    <CardDescription>Timeline view of all tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="h-96">
                    <div className="border rounded-lg p-4 h-full overflow-auto">
                      <div className="space-y-2">
                        {filteredTasks.map(task => {
                          const startDate = parseISO(task.startDate);
                          const endDate = parseISO(task.dueDate);
                          const duration = differenceInDays(endDate, startDate) + 1;
                          const daysSinceStart = differenceInDays(startDate, new Date(2024, 0, 1));
                          
                          return (
                            <div key={task.id} className="flex items-center gap-4">
                              <div className="w-48 truncate text-sm">{task.title}</div>
                              <div className="flex-1 relative h-8">
                                <div className="absolute inset-0 bg-gray-100 rounded"></div>
                                <div 
                                  className={cn(
                                    "absolute h-full rounded flex items-center px-2 text-xs text-white",
                                    task.status === 'completed' ? 'bg-green-500' :
                                    task.status === 'in-progress' ? 'bg-blue-500' :
                                    task.status === 'blocked' ? 'bg-red-500' :
                                    'bg-gray-400'
                                  )}
                                  style={{
                                    left: `${daysSinceStart * 2}px`,
                                    width: `${duration * 10}px`,
                                  }}
                                >
                                  {task.progress}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="p-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Calendar View</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium">
                          {format(selectedMonth, 'MMMM yyyy')}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="bg-gray-50 p-2 text-center text-xs font-medium">
                          {day}
                        </div>
                      ))}
                      {getDaysInMonth().map(day => {
                        const dayTasks = getTasksForDate(day);
                        const isCurrentMonth = isSameMonth(day, selectedMonth);
                        
                        return (
                          <div
                            key={day.toISOString()}
                            className={cn(
                              "bg-white p-2 min-h-24 border-t",
                              !isCurrentMonth && "bg-gray-50 text-gray-400"
                            )}
                          >
                            <div className="text-xs font-medium mb-1">{format(day, 'd')}</div>
                            <div className="space-y-1">
                              {dayTasks.slice(0, 3).map(task => (
                                <div
                                  key={task.id}
                                  className={cn(
                                    "text-xs p-1 rounded truncate",
                                    task.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                    task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                    'bg-blue-100 text-blue-700'
                                  )}
                                  title={task.title}
                                >
                                  {task.title}
                                </div>
                              ))}
                              {dayTasks.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayTasks.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="overview" className="flex-1 p-6">
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Project Overview</h3>
            <p className="text-muted-foreground">Project dashboard and key metrics</p>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="flex-1 p-6">
          <div className="text-center py-12">
            <GanttChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Project Timeline</h3>
            <p className="text-muted-foreground">Gantt chart and milestones</p>
          </div>
        </TabsContent>

        <TabsContent value="team" className="flex-1 p-6">
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Team Management</h3>
            <p className="text-muted-foreground">Team members and resource allocation</p>
          </div>
        </TabsContent>

        <TabsContent value="files" className="flex-1 p-6">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Files & Documents</h3>
            <p className="text-muted-foreground">Project files and documentation</p>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="flex-1 p-6">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Activity Log</h3>
            <p className="text-muted-foreground">Recent project activities and updates</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to the project
            </DialogDescription>
          </DialogHeader>
          <TaskForm onSave={handleCreateTask} onCancel={() => setShowNewTaskDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            task={editingTask} 
            onSave={handleUpdateTask} 
            onCancel={() => setEditingTask(null)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
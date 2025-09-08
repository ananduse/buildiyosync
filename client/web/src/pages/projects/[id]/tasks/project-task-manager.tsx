import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  ClipboardList,
  ZoomIn,
  ZoomOut,
  Bug,
  Sparkles,
  Droplets,
  Wind,
  Flame,
  FlaskConical,
  Truck,
  Building2,
  Wrench,
  HardHat,
  Hammer,
  PaintBucket,
  Lightbulb,
  Cpu,
  Bolt,
  Package,
  TrendingDown,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
import { generateSampleTasks } from './simple-sample-tasks';
import ExactTasksTable from './exact-tasks-table';
import ComprehensiveTaskModal from './comprehensive-task-modal';

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

// Main Component - ONLY THE TASK CONTENT, NO TABS
export default function ProjectTaskManager() {
  const { id: projectId } = useParams<{ id: string }>();
  
  // State
  const sampleTasks = generateSampleTasks();
  console.log('Generated sample tasks:', sampleTasks);
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [view, setView] = useState<'list' | 'kanban' | 'gantt' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);
  const [groupBy, setGroupBy] = useState<'none' | 'status' | 'priority' | 'assignee'>('status');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [inlineEditingId, setInlineEditingId] = useState<string | null>(null);
  const [inlineEditValue, setInlineEditValue] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      // Tasks are already loaded from generateSampleTasks
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
      case 'task': return <ClipboardList className="h-4 w-4 text-slate-600" />;
      case 'milestone': return <Flag className="h-4 w-4 text-purple-600" />;
      case 'bug': return <Bug className="h-4 w-4 text-red-600" />;
      case 'feature': return <Sparkles className="h-4 w-4 text-blue-600" />;
      case 'epic': return <FolderOpen className="h-4 w-4 text-indigo-600" />;
      case 'subtask': return <GitBranch className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get icon based on task category/tags
  const getCategoryIcon = (task: Task) => {
    const tags = task.tags || [];
    const title = task.title.toLowerCase();
    
    // Construction-specific icons
    if (tags.includes('foundation') || title.includes('foundation')) {
      return <Building2 className="h-4 w-4 text-amber-600" />;
    }
    if (tags.includes('electrical') || title.includes('electrical') || title.includes('wiring')) {
      return <Bolt className="h-4 w-4 text-yellow-600" />;
    }
    if (tags.includes('plumbing') || title.includes('plumbing') || title.includes('water')) {
      return <Droplets className="h-4 w-4 text-blue-600" />;
    }
    if (tags.includes('structure') || title.includes('structural') || title.includes('framework')) {
      return <Building2 className="h-4 w-4 text-gray-700" />;
    }
    if (tags.includes('roofing') || title.includes('roof')) {
      return <HardHat className="h-4 w-4 text-red-600" />;
    }
    if (tags.includes('safety') || title.includes('safety') || title.includes('inspection')) {
      return <Shield className="h-4 w-4 text-green-600" />;
    }
    if (tags.includes('painting') || title.includes('painting') || title.includes('finishing')) {
      return <PaintBucket className="h-4 w-4 text-purple-600" />;
    }
    if (tags.includes('hvac') || title.includes('hvac') || title.includes('ventilation')) {
      return <Wind className="h-4 w-4 text-teal-600" />;
    }
    if (tags.includes('fire-safety') || title.includes('fire')) {
      return <Flame className="h-4 w-4 text-orange-600" />;
    }
    if (tags.includes('elevator') || title.includes('elevator')) {
      return <ArrowUpCircle className="h-4 w-4 text-purple-600" />;
    }
    if (tags.includes('materials') || title.includes('delivery') || title.includes('material')) {
      return <Truck className="h-4 w-4 text-slate-600" />;
    }
    if (tags.includes('meeting') || title.includes('meeting')) {
      return <Users className="h-4 w-4 text-blue-600" />;
    }
    if (tags.includes('testing') || title.includes('test')) {
      return <FlaskConical className="h-4 w-4 text-purple-600" />;
    }
    if (tags.includes('landscaping') || title.includes('landscaping') || title.includes('garden')) {
      return <Package className="h-4 w-4 text-green-600" />;
    }
    if (tags.includes('flooring') || title.includes('flooring') || title.includes('floor')) {
      return <Layers className="h-4 w-4 text-indigo-600" />;
    }
    if (tags.includes('interior') || title.includes('interior') || title.includes('design')) {
      return <Lightbulb className="h-4 w-4 text-amber-500" />;
    }
    if (tags.includes('maintenance') || title.includes('maintenance')) {
      return <Wrench className="h-4 w-4 text-gray-600" />;
    }
    if (tags.includes('excavation') || title.includes('excavation')) {
      return <Hammer className="h-4 w-4 text-brown-700" />;
    }
    if (tags.includes('concrete') || title.includes('concrete') || title.includes('cement')) {
      return <HardHat className="h-4 w-4 text-gray-600" />;
    }
    if (tags.includes('steel') || title.includes('steel') || title.includes('reinforcement')) {
      return <Bolt className="h-4 w-4 text-blue-gray-600" />;
    }
    if (tags.includes('automation') || title.includes('automation') || title.includes('smart')) {
      return <Cpu className="h-4 w-4 text-blue-600" />;
    }
    
    // Default to type icon
    return getTypeIcon(task.type);
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

  // Get activity category from task type
  const getActivityCategory = (task: Task) => {
    if (task.type === 'milestone' || task.status === 'todo') return 'Planning';
    if (task.status === 'in-progress' || task.status === 'in-review') return 'Development';
    if (task.status === 'completed' || task.status === 'blocked') return 'Finalization';
    return 'Development';
  };

  // Calculate date variance
  const calculateDateVariance = (task: Task) => {
    const today = new Date();
    const dueDate = parseISO(task.dueDate);
    const startDate = parseISO(task.startDate);
    const actualStart = task.actualStartDate ? parseISO(task.actualStartDate) : startDate;
    const variance = differenceInDays(dueDate, today);
    return variance;
  };

  // Render table row for list view
  const renderTableRow = (task: Task, level: number = 0) => {
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    const isExpanded = expandedTasks.has(task.id);
    const isSelected = selectedTasks.has(task.id);
    const variance = calculateDateVariance(task);
    const costVariance = task.budget.estimated > 0 
      ? Math.round(((task.budget.actual - task.budget.estimated) / task.budget.estimated) * 100)
      : 0;
    const category = getActivityCategory(task);
    
    // Status colors and labels matching the reference
    const getStatusBadge = (status: string) => {
      const statusMap: Record<string, { bg: string; text: string; label: string }> = {
        'in-progress': { bg: 'bg-blue-500', text: 'text-white', label: 'In Progress' },
        'todo': { bg: 'bg-gray-500', text: 'text-white', label: 'To Do' },
        'completed': { bg: 'bg-gray-500', text: 'text-white', label: 'Completed' },
        'in-review': { bg: 'bg-purple-500', text: 'text-white', label: 'Development' },
        'blocked': { bg: 'bg-gray-500', text: 'text-white', label: 'Development' }
      };
      return statusMap[status] || { bg: 'bg-gray-500', text: 'text-white', label: status };
    };

    // Activity category colors matching reference
    const getCategoryBadge = (category: string) => {
      const categoryMap: Record<string, { bg: string; text: string }> = {
        'Planning': { bg: 'bg-purple-500', text: 'text-white' },
        'Development': { bg: 'bg-blue-500', text: 'text-white' },
        'Finalization': { bg: 'bg-yellow-400', text: 'text-black' }
      };
      return categoryMap[category] || { bg: 'bg-gray-500', text: 'text-white' };
    };

    const statusBadge = getStatusBadge(task.status);
    const categoryBadge = getCategoryBadge(category);
    
    return (
      <>
        <tr 
          key={task.id}
          className={cn(
            'border-b border-gray-100 hover:bg-gray-50/50',
            isSelected && 'bg-blue-50/50',
            level > 0 && 'bg-gray-50/30'
          )}
        >
          {/* Checkbox */}
          <td className="px-3 py-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                const newSelected = new Set(selectedTasks);
                if (isSelected) {
                  newSelected.delete(task.id);
                } else {
                  newSelected.add(task.id);
                }
                setSelectedTasks(newSelected);
              }}
              className="h-4 w-4"
            />
          </td>

          {/* Name with expand */}
          <td className="px-2 py-2">
            <div className="flex items-center gap-1" style={{ paddingLeft: `${level * 16}px` }}>
              {hasSubtasks && (
                <button
                  onClick={() => toggleTaskExpand(task.id)}
                  className="p-0.5 hover:bg-gray-200 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-3 w-3 text-gray-500" />
                  )}
                </button>
              )}
              <Circle className={cn(
                "h-3 w-3",
                task.status === 'completed' ? "fill-green-500 text-green-500" : 
                task.status === 'in-progress' ? "fill-blue-500 text-blue-500" : 
                "text-gray-400"
              )} />
              <span className="text-[13px] text-gray-900">{task.title}</span>
            </div>
          </td>

          {/* Status */}
          <td className="px-2 py-2">
            <span className={cn(
              'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium',
              statusBadge.bg,
              statusBadge.text
            )}>
              {statusBadge.label}
            </span>
          </td>

          {/* Activity Category */}
          <td className="px-2 py-2">
            <span className={cn(
              'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium',
              categoryBadge.bg,
              categoryBadge.text
            )}>
              {category}
            </span>
          </td>

          {/* Assignee */}
          <td className="px-2 py-2">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-[12px] text-gray-700">{task.assignee.name}</span>
            </div>
          </td>

          {/* Priority */}
          <td className="px-2 py-2">
            <div className="flex items-center gap-1">
              <Flag className={cn(
                "h-3 w-3",
                task.priority === 'critical' || task.priority === 'high' ? 'text-red-500' : 'text-gray-400'
              )} />
              <span className={cn(
                "text-[12px] font-medium",
                task.priority === 'critical' || task.priority === 'high' ? 'text-red-600' : 'text-gray-600'
              )}>
                {task.priority === 'critical' ? 'Urgent' : 
                 task.priority === 'high' ? 'High' : 
                 task.priority === 'medium' ? 'Normal' : 'Low'}
              </span>
            </div>
          </td>

          {/* Estimated Duration */}
          <td className="px-2 py-2">
            <span className="text-[12px] text-gray-700">
              {format(parseISO(task.startDate), 'M/d/yy')} {format(parseISO(task.startDate), 'haaa').toLowerCase()} - 
              {format(parseISO(task.dueDate), 'M/d/yy')} {format(parseISO(task.dueDate), 'haaa').toLowerCase()}
            </span>
          </td>

          {/* Start Date */}
          <td className="px-2 py-2">
            <span className="text-[12px] text-gray-700">
              {format(parseISO(task.startDate), 'M/d/yyyy')}
            </span>
          </td>

          {/* Due Date */}
          <td className="px-2 py-2">
            <span className="text-[12px] text-gray-700">
              {format(parseISO(task.dueDate), 'M/d/yyyy')}
            </span>
          </td>

          {/* Date Closed */}
          <td className="px-2 py-2 text-center">
            <span className="text-[12px] text-gray-500">-</span>
          </td>

          {/* Date Variance */}
          <td className="px-2 py-2 text-center">
            <span className="text-[12px] text-gray-700">-</span>
          </td>

          {/* Estimated Cost */}
          <td className="px-2 py-2 text-right">
            <span className="text-[12px] text-gray-700 font-medium">
              {task.budget.estimated > 0 ? `$${task.budget.estimated.toLocaleString()}` : '-'}
            </span>
          </td>

          {/* Actual Cost */}
          <td className="px-2 py-2 text-right">
            <span className="text-[12px] text-gray-700 font-medium">
              {task.budget.actual > 0 ? `$${task.budget.actual.toLocaleString()}` : '-'}
            </span>
          </td>

          {/* Cost Variance % */}
          <td className="px-2 py-2 text-center">
            <MoreVertical className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600 mx-auto" />
          </td>
        </tr>

        {/* Render subtasks if expanded */}
        {isExpanded && hasSubtasks && task.subtasks?.map(subtask => 
          renderTableRow(subtask, level + 1)
        )}
      </>
    );
  };

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
                    {getCategoryIcon(task)}
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
    <div className="h-full flex flex-col bg-white">
      {/* Controls */}
      <div className="bg-white border-b">
        <div className="px-4 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-600">Group: Activity Category</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
              <span className="text-gray-300">|</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-[12px]"
                onClick={() => setShowNewTaskDialog(true)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Task
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Filter className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                Expanded
              </Button>
              <span className="text-gray-300">|</span>
              <div className="flex">
                <Button
                  variant={view === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('list')}
                  className="h-7 px-2 rounded-none rounded-l"
                >
                  <List className="h-3 w-3" />
                </Button>
                <Button
                  variant={view === 'kanban' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('kanban')}
                  className="h-7 px-2 rounded-none"
                >
                  <Kanban className="h-3 w-3" />
                </Button>
                <Button
                  variant={view === 'gantt' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('gantt')}
                  className="h-7 px-2 rounded-none"
                >
                  <BarChart3 className="h-3 w-3" />
                </Button>
                <Button
                  variant={view === 'calendar' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setView('calendar')}
                  className="h-7 px-2 rounded-none rounded-r"
                >
                  <Calendar className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : view === 'list' ? (
          <ExactTasksTable />
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
                                    {getCategoryIcon(task)}
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
          <div className="gantt-chart-container p-6">
            <Card className="w-full overflow-hidden">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="min-w-0">
                    <CardTitle>Interactive Gantt Chart</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Drag to reschedule • Click to view details • Track progress
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Today
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex h-[600px]">
                  {/* Task List Panel */}
                  <div className="w-80 border-r flex flex-col">
                    <div className="h-12 bg-muted/30 border-b px-4 flex items-center">
                      <span className="text-sm font-medium">Tasks</span>
                    </div>
                    <ScrollArea className="flex-1">
                      {filteredTasks.map((task) => (
                        <div key={task.id} className="h-12 border-b px-4 flex items-center hover:bg-muted/20">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {getCategoryIcon(task)}
                            <span className="text-sm truncate">{task.title}</span>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  
                  {/* Timeline Panel */}
                  <div className="flex-1 overflow-auto">
                    <div className="min-w-[1200px]">
                      {/* Timeline Header */}
                      <div className="h-12 bg-muted/30 border-b flex">
                        {Array.from({ length: 30 }, (_, i) => {
                          const date = addDays(new Date(), i - 7);
                          return (
                            <div key={i} className="flex-shrink-0 w-10 text-center border-r">
                              <div className="text-xs text-muted-foreground">
                                {format(date, 'd')}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {format(date, 'EEE')}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Task Bars */}
                      <div>
                        {filteredTasks.map((task) => {
                          const startDate = parseISO(task.startDate);
                          const endDate = parseISO(task.dueDate);
                          const today = new Date();
                          const startOffset = differenceInDays(startDate, addDays(today, -7));
                          const duration = differenceInDays(endDate, startDate) + 1;
                          
                          return (
                            <div key={task.id} className="h-12 border-b relative hover:bg-muted/20">
                              <div
                                className={cn(
                                  "absolute h-8 top-2 rounded-md flex items-center px-2 text-xs font-medium shadow-sm",
                                  task.status === 'completed' ? 'bg-green-500 text-white' :
                                  task.status === 'in-progress' ? 'bg-blue-500 text-white' :
                                  task.status === 'blocked' ? 'bg-red-500 text-white' :
                                  'bg-gray-400 text-white'
                                )}
                                style={{
                                  left: `${startOffset * 40}px`,
                                  width: `${duration * 40}px`,
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="truncate">{task.taskCode}</span>
                                  <span>{task.progress}%</span>
                                </div>
                              </div>
                              {/* Progress bar */}
                              <div
                                className="absolute h-1 bottom-1 bg-black/20 rounded"
                                style={{
                                  left: `${startOffset * 40}px`,
                                  width: `${(duration * 40 * task.progress) / 100}px`,
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Task Calendar</CardTitle>
                    <CardDescription>View and manage tasks by date</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="px-3 py-1 min-w-[140px] text-center">
                      <h2 className="text-sm font-semibold">
                        {format(selectedMonth, 'MMMM yyyy')}
                      </h2>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMonth(new Date())}
                      className="ml-2"
                    >
                      Today
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="bg-muted/50 p-3 text-center text-sm font-medium">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {getDaysInMonth().map(day => {
                    const dayTasks = getTasksForDate(day);
                    const isCurrentMonth = isSameMonth(day, selectedMonth);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={cn(
                          "bg-background min-h-[120px] p-2 border relative group cursor-pointer transition-colors",
                          !isCurrentMonth && "bg-muted/20 text-muted-foreground",
                          isToday && "bg-accent/10 ring-2 ring-accent ring-inset",
                          "hover:bg-muted/10"
                        )}
                        onClick={() => {
                          // Open new task dialog for this date
                          setEditingTask({
                            id: '',
                            title: '',
                            description: '',
                            status: 'todo',
                            priority: 'medium',
                            type: 'task',
                            assignee: { id: '1', name: 'John Doe', avatar: '' },
                            startDate: format(day, 'yyyy-MM-dd'),
                            dueDate: format(day, 'yyyy-MM-dd'),
                            progress: 0,
                            taskCode: `TASK-${Date.now()}`,
                            subtasks: [],
                            tags: [],
                            comments: [],
                            attachments: []
                          });
                          setShowNewTaskDialog(true);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={cn(
                            "text-sm font-medium",
                            isToday && "bg-accent text-accent-foreground rounded-full w-7 h-7 flex items-center justify-center"
                          )}>
                            {format(day, 'd')}
                          </span>
                          {dayTasks.length > 0 && (
                            <Badge variant="secondary" className="text-xs px-1 h-5">
                              {dayTasks.length}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          {dayTasks.slice(0, 2).map(task => (
                            <div
                              key={task.id}
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded cursor-pointer transition-colors",
                                task.priority === 'critical' ? 'bg-red-500/10 text-red-700 hover:bg-red-500/20' :
                                task.priority === 'high' ? 'bg-orange-500/10 text-orange-700 hover:bg-orange-500/20' :
                                task.status === 'completed' ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20' :
                                'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20'
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                // Edit this task
                                setEditingTask(task);
                                setShowNewTaskDialog(true);
                              }}
                              title={task.title}
                            >
                              <div className="flex items-center gap-1">
                                {getPriorityIcon(task.priority)}
                                <span className="truncate">{task.title}</span>
                              </div>
                            </div>
                          ))}
                          {dayTasks.length > 2 && (
                            <button
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left px-1.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Show all tasks for this day
                              }}
                            >
                              +{dayTasks.length - 2} more
                            </button>
                          )}
                        </div>
                        
                        {/* Add task button on hover */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Open new task dialog for this date
                            setEditingTask({
                              id: '',
                              title: '',
                              description: '',
                              status: 'todo',
                              priority: 'medium',
                              type: 'task',
                              assignee: { id: '1', name: 'John Doe', avatar: '' },
                              startDate: format(day, 'yyyy-MM-dd'),
                              dueDate: format(day, 'yyyy-MM-dd'),
                              progress: 0,
                              taskCode: `TASK-${Date.now()}`,
                              subtasks: [],
                              tags: [],
                              comments: [],
                              attachments: []
                            });
                            setShowNewTaskDialog(true);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
                
                {/* Legend */}
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500/10 rounded" />
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500/10 rounded" />
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500/10 rounded" />
                    <span>Normal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500/10 rounded" />
                    <span>Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Comprehensive Task Modal for Add/Edit */}
      <ComprehensiveTaskModal
        isOpen={showNewTaskDialog || !!editingTask}
        onClose={() => {
          setShowNewTaskDialog(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onSave={(taskData) => {
          if (editingTask) {
            handleUpdateTask(taskData);
          } else {
            handleCreateTask(taskData);
          }
        }}
        mode={editingTask ? 'edit' : 'add'}
      />
    </div>
  );
}
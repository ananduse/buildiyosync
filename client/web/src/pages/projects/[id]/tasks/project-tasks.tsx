import { useState, useMemo, useEffect } from 'react';
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
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, addDays, isOverdue, differenceInDays } from 'date-fns';

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
  subtasks: string[];
  parent?: string;
  tags: string[];
  attachments: number;
  comments: number;
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
  effort: number; // Story points
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

interface ProjectInfo {
  id: string;
  name: string;
  code: string;
  client: string;
  manager: string;
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
  status: string;
  totalTasks: number;
  completedTasks: number;
  team: number;
}

// Mock data generator
const generateMockTasks = (projectId: string): Task[] => {
  const tasks: Task[] = [];
  const taskTypes: Task['type'][] = ['task', 'milestone', 'bug', 'feature', 'epic'];
  const statuses: Task['status'][] = ['todo', 'in-progress', 'in-review', 'blocked', 'completed'];
  const priorities: Task['priority'][] = ['critical', 'high', 'medium', 'low'];
  
  const assignees = [
    { id: 'USR001', name: 'Rajesh Kumar', avatar: '', role: 'Senior Developer', department: 'Engineering' },
    { id: 'USR002', name: 'Priya Sharma', avatar: '', role: 'UI/UX Designer', department: 'Design' },
    { id: 'USR003', name: 'Amit Patel', avatar: '', role: 'Backend Developer', department: 'Engineering' },
    { id: 'USR004', name: 'Sneha Reddy', avatar: '', role: 'QA Engineer', department: 'Quality' },
    { id: 'USR005', name: 'Vikram Singh', avatar: '', role: 'Project Manager', department: 'Management' },
  ];

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
    'Security System Setup',
    'Final Quality Check',
    'Client Walkthrough',
    'Documentation Preparation',
    'Permit Renewals',
    'Material Procurement - Cement',
    'Material Procurement - Steel',
    'Site Preparation',
    'Excavation Work',
    'Concrete Pouring - Foundation',
    'Brick Work - External Walls',
    'Roof Installation',
    'Window and Door Fitting',
    'Kitchen Setup',
    'Bathroom Fixtures Installation',
    'Electrical Panel Setup',
    'Network Cabling',
    'Solar Panel Installation',
    'Water Tank Installation',
    'Drainage System Setup',
    'Parking Area Construction',
    'Boundary Wall Construction',
    'Gate Installation',
    'Garden Development',
    'Swimming Pool Construction',
    'Fire Safety System',
    'Elevator Installation',
    'Staircase Construction',
    'Balcony Railing Installation',
    'Waterproofing Treatment',
  ];

  for (let i = 0; i < 40; i++) {
    const assignee = assignees[Math.floor(Math.random() * assignees.length)];
    const reporter = assignees[Math.floor(Math.random() * assignees.length)];
    const startDate = new Date(2024, 0, 1 + Math.floor(Math.random() * 365));
    const dueDate = addDays(startDate, Math.floor(Math.random() * 30) + 1);
    const progress = Math.floor(Math.random() * 101);
    
    tasks.push({
      id: `TSK${String(i + 1).padStart(3, '0')}`,
      taskCode: `${projectId}-TSK-${String(i + 1).padStart(3, '0')}`,
      title: taskTitles[i % taskTitles.length],
      description: `Detailed description for ${taskTitles[i % taskTitles.length]}. This task involves multiple steps and coordination with various teams.`,
      type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
      status: progress === 100 ? 'completed' : statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      assignee,
      reporter,
      startDate: startDate.toISOString(),
      dueDate: dueDate.toISOString(),
      estimatedHours: Math.floor(Math.random() * 40) + 8,
      actualHours: Math.floor(Math.random() * 40),
      remainingHours: Math.floor(Math.random() * 20),
      progress,
      dependencies: i > 0 && Math.random() > 0.7 ? [`TSK${String(i).padStart(3, '0')}`] : [],
      blockedBy: Math.random() > 0.9 ? [`TSK${String(Math.floor(Math.random() * i) + 1).padStart(3, '0')}`] : [],
      blocks: [],
      subtasks: Math.random() > 0.8 ? [`TSK${String(i + 41).padStart(3, '0')}`, `TSK${String(i + 42).padStart(3, '0')}`] : [],
      tags: ['construction', 'phase-1', 'priority'],
      attachments: Math.floor(Math.random() * 5),
      comments: Math.floor(Math.random() * 10),
      watchers: [reporter.id],
      customFields: {},
      workLog: [],
      checklist: [
        { id: '1', text: 'Review requirements', completed: Math.random() > 0.5 },
        { id: '2', text: 'Prepare materials', completed: Math.random() > 0.5 },
        { id: '3', text: 'Execute task', completed: Math.random() > 0.5 },
        { id: '4', text: 'Quality check', completed: Math.random() > 0.5 },
      ],
      budget: {
        estimated: Math.floor(Math.random() * 100000) + 10000,
        actual: Math.floor(Math.random() * 100000) + 10000,
        currency: 'INR',
      },
      risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Task['risk'],
      impact: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as Task['impact'],
      effort: Math.floor(Math.random() * 13) + 1,
      labels: ['frontend', 'backend', 'urgent', 'review'][Math.floor(Math.random() * 4)].split(' '),
      lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: startDate.toISOString(),
    });
  }

  return tasks;
};

// Component
export default function ProjectTasks() {
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
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'progress'>('dueDate');
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock project info
  const projectInfo: ProjectInfo = {
    id: projectId || 'P001',
    name: 'Sunrise Apartments Complex',
    code: 'SAC-2024',
    client: 'Sunrise Developers Ltd.',
    manager: 'Vikram Singh',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 50000000,
    progress: 35,
    status: 'active',
    totalTasks: 0,
    completedTasks: 0,
    team: 25,
  };

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const mockTasks = generateMockTasks(projectId || 'P001');
      setTasks(mockTasks);
      setLoading(false);
    };
    loadTasks();
  }, [projectId]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const overdue = tasks.filter(t => 
      t.status !== 'completed' && 
      new Date(t.dueDate) < new Date()
    ).length;
    const highPriority = tasks.filter(t => 
      t.priority === 'critical' || t.priority === 'high'
    ).length;

    return {
      total,
      completed,
      inProgress,
      blocked,
      overdue,
      highPriority,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks]);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
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

  return (
    <div className="h-full flex flex-col">
      {/* Project Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/projects/list')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Projects
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{projectInfo.name}</h1>
                <Badge variant="outline">{projectInfo.code}</Badge>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {projectInfo.client} • Managed by {projectInfo.manager}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Tasks</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <List className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <PlayCircle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Blocked</p>
                  <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.overdue}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.highPriority}</p>
                </div>
                <Flag className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Completion</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={stats.completionRate} className="h-2 flex-1" />
                    <span className="text-sm font-semibold">{stats.completionRate}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Status" />
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
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Priority" />
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
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Group by" />
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setView('list')}
                      className="rounded-r-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'kanban' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setView('kanban')}
                      className="rounded-none border-x"
                    >
                      <Kanban className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Kanban Board</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'gantt' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setView('gantt')}
                      className="rounded-none border-r"
                    >
                      <GanttChart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Gantt Chart</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'calendar' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setView('calendar')}
                      className="rounded-l-none"
                    >
                      <CalendarDays className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Calendar View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button onClick={() => setShowNewTaskDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
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
                    <Badge variant="secondary" className="ml-2">{tasks.length}</Badge>
                  </h3>
                )}
                <div className="space-y-2">
                  {tasks.map(task => (
                    <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Checkbox className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {getTypeIcon(task.type)}
                                  <span className="text-xs text-muted-foreground">{task.taskCode}</span>
                                  {getPriorityIcon(task.priority)}
                                  {getStatusIcon(task.status)}
                                  {task.blockedBy.length > 0 && (
                                    <Badge variant="destructive" className="text-xs">Blocked</Badge>
                                  )}
                                  {new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
                                    <Badge variant="destructive" className="text-xs">Overdue</Badge>
                                  )}
                                </div>
                                <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                  {task.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.estimatedHours}h</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{task.assignee.name}</span>
                                  </div>
                                  {task.attachments > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Paperclip className="h-3 w-3" />
                                      <span>{task.attachments}</span>
                                    </div>
                                  )}
                                  {task.comments > 0 && (
                                    <div className="flex items-center gap-1">
                                      <MessageSquare className="h-3 w-3" />
                                      <span>{task.comments}</span>
                                    </div>
                                  )}
                                  {task.subtasks.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <GitBranch className="h-3 w-3" />
                                      <span>{task.subtasks.length}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <div className="text-xs text-muted-foreground mb-1">Progress</div>
                                  <div className="flex items-center gap-2">
                                    <Progress value={task.progress} className="w-20 h-2" />
                                    <span className="text-xs font-medium">{task.progress}%</span>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Task
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Link2 className="h-4 w-4 mr-2" />
                                      Copy Link
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : view === 'kanban' ? (
          <div className="p-6">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {['todo', 'in-progress', 'in-review', 'blocked', 'completed'].map(status => {
                const statusTasks = filteredTasks.filter(t => t.status === status);
                return (
                  <div key={status} className="flex-shrink-0 w-80">
                    <div className="bg-gray-100 rounded-lg p-3">
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
                      <div className="space-y-2">
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
                                  <AvatarImage src={task.assignee.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {format(new Date(task.dueDate), 'MMM d')}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : view === 'gantt' ? (
          <div className="p-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <GanttChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Gantt Chart View</h3>
                  <p className="text-muted-foreground">
                    Interactive Gantt chart with task dependencies and timeline visualization
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="p-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Calendar View</h3>
                  <p className="text-muted-foreground">
                    View tasks in a calendar layout with due dates and milestones
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
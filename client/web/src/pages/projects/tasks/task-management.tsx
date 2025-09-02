import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Timer,
  Play,
  Pause,
  RotateCcw,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Flag,
  Tag,
  Paperclip,
  MessageSquare,
  BarChart3,
  Target,
  TrendingUp,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Layers,
  GitBranch,
  Zap,
  FileText,
  Download,
  Upload,
  Settings,
  List,
  Kanban,
  CalendarDays,
  User,
  Building2,
  Package,
  Wrench,
  Shield,
  DollarSign,
  Percent,
  HardHat,
  Hash,
  Link,
  Image,
  File
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
// import { DatePickerWithRange } from '@/components/ui/date-range-picker'; // TODO: Add date range picker component

// Task type based on PRD
interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'civil' | 'electrical' | 'plumbing' | 'interior' | 'landscape' | 'general';
  phase: string;
  milestone?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked' | 'cancelled';
  assignee: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  assignedBy: {
    name: string;
    date: string;
  };
  dependencies: string[];
  blockedBy?: string;
  startDate: string;
  dueDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  estimatedHours: number;
  actualHours: number;
  progress: number;
  budget: {
    estimated: number;
    actual: number;
    currency: string;
  };
  materials?: {
    required: string[];
    delivered: string[];
    pending: string[];
  };
  checklist: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  attachments: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedBy: string;
    uploadedAt: string;
  }[];
  comments: {
    id: string;
    author: string;
    message: string;
    timestamp: string;
  }[];
  qualityChecks: {
    required: boolean;
    completed: boolean;
    approvedBy?: string;
    date?: string;
  };
  safetyChecks: {
    required: boolean;
    completed: boolean;
    inspector?: string;
    date?: string;
  };
  customerApproval: {
    required: boolean;
    status: 'pending' | 'approved' | 'rejected' | 'na';
    approvedBy?: string;
    date?: string;
    comments?: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  riskLevel: 'low' | 'medium' | 'high';
  impactOnSchedule: 'none' | 'minor' | 'major' | 'critical';
}

export default function TaskManagement() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar' | 'gantt'>('list');
  const [showAddTask, setShowAddTask] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);

  // Mock tasks data based on PRD
  const tasks: Task[] = [
    {
      id: 'TSK001',
      code: 'SKY-TSK-001',
      title: 'Foundation Excavation - Block A',
      description: 'Complete excavation work for Block A foundation including soil testing and preparation',
      category: 'civil',
      phase: 'Foundation',
      milestone: 'Foundation Complete',
      priority: 'high',
      status: 'completed',
      assignee: {
        id: 'USR001',
        name: 'Rakesh Verma',
        avatar: '/avatars/user1.jpg',
        role: 'Site Supervisor'
      },
      assignedBy: {
        name: 'Amit Sharma',
        date: '2024-01-15'
      },
      dependencies: [],
      startDate: '2024-01-20',
      dueDate: '2024-01-25',
      actualStartDate: '2024-01-20',
      actualEndDate: '2024-01-24',
      estimatedHours: 120,
      actualHours: 110,
      progress: 100,
      budget: {
        estimated: 500000,
        actual: 480000,
        currency: 'INR'
      },
      materials: {
        required: ['Excavator', 'Dumper', 'Safety Equipment'],
        delivered: ['Excavator', 'Dumper', 'Safety Equipment'],
        pending: []
      },
      checklist: [
        { id: 'CHK001', title: 'Site marking completed', completed: true },
        { id: 'CHK002', title: 'Excavation depth verified', completed: true },
        { id: 'CHK003', title: 'Soil test report submitted', completed: true },
        { id: 'CHK004', title: 'Safety measures in place', completed: true }
      ],
      attachments: [
        {
          id: 'ATT001',
          name: 'Excavation_Plan.pdf',
          type: 'application/pdf',
          size: '2.5 MB',
          uploadedBy: 'Amit Sharma',
          uploadedAt: '2024-01-19'
        }
      ],
      comments: [
        {
          id: 'COM001',
          author: 'Rakesh Verma',
          message: 'Excavation completed ahead of schedule',
          timestamp: '2024-01-24 16:30'
        }
      ],
      qualityChecks: {
        required: true,
        completed: true,
        approvedBy: 'Quality Inspector',
        date: '2024-01-24'
      },
      safetyChecks: {
        required: true,
        completed: true,
        inspector: 'Safety Officer',
        date: '2024-01-20'
      },
      customerApproval: {
        required: false,
        status: 'na'
      },
      tags: ['foundation', 'civil-work', 'block-a'],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-24',
      completedAt: '2024-01-24',
      riskLevel: 'low',
      impactOnSchedule: 'none'
    },
    {
      id: 'TSK002',
      code: 'SKY-TSK-002',
      title: 'RCC Slab Casting - 10th Floor',
      description: 'Complete RCC slab casting for 10th floor including reinforcement and concrete pouring',
      category: 'civil',
      phase: 'Structure',
      milestone: 'Structure (10 floors)',
      priority: 'critical',
      status: 'in-progress',
      assignee: {
        id: 'USR002',
        name: 'ABC Construction',
        role: 'Civil Contractor'
      },
      assignedBy: {
        name: 'Amit Sharma',
        date: '2024-01-16'
      },
      dependencies: ['TSK001'],
      startDate: '2024-01-25',
      dueDate: '2024-01-30',
      actualStartDate: '2024-01-25',
      estimatedHours: 180,
      actualHours: 72,
      progress: 65,
      budget: {
        estimated: 1500000,
        actual: 950000,
        currency: 'INR'
      },
      materials: {
        required: ['Steel Reinforcement', 'Concrete M30', 'Shuttering Material'],
        delivered: ['Steel Reinforcement', 'Concrete M30'],
        pending: ['Additional Shuttering']
      },
      checklist: [
        { id: 'CHK001', title: 'Reinforcement tied as per drawing', completed: true },
        { id: 'CHK002', title: 'Shuttering completed', completed: true },
        { id: 'CHK003', title: 'Concrete pour started', completed: true },
        { id: 'CHK004', title: 'Curing process initiated', completed: false }
      ],
      attachments: [
        {
          id: 'ATT001',
          name: 'Slab_Layout_10F.dwg',
          type: 'application/dwg',
          size: '5.2 MB',
          uploadedBy: 'Priya Patel',
          uploadedAt: '2024-01-24'
        }
      ],
      comments: [
        {
          id: 'COM001',
          author: 'Site Engineer',
          message: 'Steel reinforcement inspection completed',
          timestamp: '2024-01-26 10:30'
        }
      ],
      qualityChecks: {
        required: true,
        completed: false
      },
      safetyChecks: {
        required: true,
        completed: true,
        inspector: 'Safety Officer',
        date: '2024-01-25'
      },
      customerApproval: {
        required: true,
        status: 'pending'
      },
      tags: ['structure', 'rcc', 'floor-10'],
      createdAt: '2024-01-16',
      updatedAt: '2024-01-27',
      riskLevel: 'medium',
      impactOnSchedule: 'minor'
    },
    {
      id: 'TSK003',
      code: 'SKY-TSK-003',
      title: 'Electrical Conduit Installation - 5th Floor',
      description: 'Install electrical conduits and junction boxes as per approved electrical layout',
      category: 'electrical',
      phase: 'MEP',
      priority: 'medium',
      status: 'todo',
      assignee: {
        id: 'USR003',
        name: 'XYZ Electricals',
        role: 'Electrical Contractor'
      },
      assignedBy: {
        name: 'Amit Sharma',
        date: '2024-01-17'
      },
      dependencies: ['TSK002'],
      startDate: '2024-02-01',
      dueDate: '2024-02-05',
      estimatedHours: 80,
      actualHours: 0,
      progress: 0,
      budget: {
        estimated: 350000,
        actual: 0,
        currency: 'INR'
      },
      materials: {
        required: ['PVC Conduits', 'Junction Boxes', 'GI Wire'],
        delivered: [],
        pending: ['PVC Conduits', 'Junction Boxes', 'GI Wire']
      },
      checklist: [
        { id: 'CHK001', title: 'Layout marking completed', completed: false },
        { id: 'CHK002', title: 'Conduits installed', completed: false },
        { id: 'CHK003', title: 'Junction boxes fixed', completed: false },
        { id: 'CHK004', title: 'Inspection completed', completed: false }
      ],
      attachments: [],
      comments: [],
      qualityChecks: {
        required: true,
        completed: false
      },
      safetyChecks: {
        required: true,
        completed: false
      },
      customerApproval: {
        required: false,
        status: 'na'
      },
      tags: ['electrical', 'mep', 'floor-5'],
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17',
      riskLevel: 'low',
      impactOnSchedule: 'none'
    },
    {
      id: 'TSK004',
      code: 'SKY-TSK-004',
      title: 'Plumbing Rough-in - Tower B',
      description: 'Complete plumbing rough-in work including water supply and drainage lines',
      category: 'plumbing',
      phase: 'MEP',
      priority: 'high',
      status: 'blocked',
      assignee: {
        id: 'USR004',
        name: 'PQR Plumbing',
        role: 'Plumbing Contractor'
      },
      assignedBy: {
        name: 'Amit Sharma',
        date: '2024-01-18'
      },
      dependencies: ['TSK002'],
      blockedBy: 'Material delivery delayed',
      startDate: '2024-01-28',
      dueDate: '2024-02-02',
      estimatedHours: 120,
      actualHours: 0,
      progress: 0,
      budget: {
        estimated: 450000,
        actual: 0,
        currency: 'INR'
      },
      materials: {
        required: ['CPVC Pipes', 'PVC Pipes', 'Fittings', 'Valves'],
        delivered: [],
        pending: ['CPVC Pipes', 'PVC Pipes', 'Fittings', 'Valves']
      },
      checklist: [
        { id: 'CHK001', title: 'Layout approved', completed: true },
        { id: 'CHK002', title: 'Material procured', completed: false },
        { id: 'CHK003', title: 'Installation started', completed: false },
        { id: 'CHK004', title: 'Pressure testing done', completed: false }
      ],
      attachments: [],
      comments: [
        {
          id: 'COM001',
          author: 'PQR Plumbing',
          message: 'Waiting for CPVC pipe delivery from vendor',
          timestamp: '2024-01-27 14:00'
        }
      ],
      qualityChecks: {
        required: true,
        completed: false
      },
      safetyChecks: {
        required: false,
        status: 'na'
      },
      customerApproval: {
        required: false,
        status: 'na'
      },
      tags: ['plumbing', 'mep', 'tower-b'],
      createdAt: '2024-01-18',
      updatedAt: '2024-01-27',
      riskLevel: 'high',
      impactOnSchedule: 'major'
    },
    {
      id: 'TSK005',
      code: 'SKY-TSK-005',
      title: 'Interior Design Review - Sample Flat',
      description: 'Review and approve interior design for sample flat including materials and finishes',
      category: 'interior',
      phase: 'Finishing',
      priority: 'medium',
      status: 'review',
      assignee: {
        id: 'USR005',
        name: 'Design Studio',
        role: 'Interior Designer'
      },
      assignedBy: {
        name: 'Amit Sharma',
        date: '2024-01-19'
      },
      dependencies: [],
      startDate: '2024-01-25',
      dueDate: '2024-01-28',
      estimatedHours: 40,
      actualHours: 35,
      progress: 85,
      budget: {
        estimated: 250000,
        actual: 225000,
        currency: 'INR'
      },
      checklist: [
        { id: 'CHK001', title: 'Design concept presented', completed: true },
        { id: 'CHK002', title: '3D renders prepared', completed: true },
        { id: 'CHK003', title: 'Material samples ready', completed: true },
        { id: 'CHK004', title: 'Customer approval obtained', completed: false }
      ],
      attachments: [
        {
          id: 'ATT001',
          name: 'Interior_Design_Concept.pdf',
          type: 'application/pdf',
          size: '15.3 MB',
          uploadedBy: 'Design Studio',
          uploadedAt: '2024-01-26'
        },
        {
          id: 'ATT002',
          name: '3D_Renders.zip',
          type: 'application/zip',
          size: '45.8 MB',
          uploadedBy: 'Design Studio',
          uploadedAt: '2024-01-26'
        }
      ],
      comments: [
        {
          id: 'COM001',
          author: 'Rajesh Kumar',
          message: 'Please revise the living room color scheme',
          timestamp: '2024-01-27 11:00'
        }
      ],
      qualityChecks: {
        required: false,
        status: 'na'
      },
      safetyChecks: {
        required: false,
        status: 'na'
      },
      customerApproval: {
        required: true,
        status: 'pending',
        comments: 'Awaiting final review from customer'
      },
      tags: ['interior', 'design', 'sample-flat'],
      createdAt: '2024-01-19',
      updatedAt: '2024-01-27',
      riskLevel: 'low',
      impactOnSchedule: 'minor'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'review': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'blocked': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'todo': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      case 'cancelled': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Timer className="h-4 w-4" />;
      case 'review': return <AlertCircle className="h-4 w-4" />;
      case 'blocked': return <XCircle className="h-4 w-4" />;
      case 'todo': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'civil': return Building2;
      case 'electrical': return Zap;
      case 'plumbing': return Wrench;
      case 'interior': return Package;
      case 'landscape': return Layers;
      default: return CheckSquare;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignee.name === assigneeFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">
            Track and manage all project tasks, milestones, and deliverables
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Tasks
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to the project with details and assignments
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input id="title" placeholder="Enter task title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="interior">Interior</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter task description and requirements"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assign To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rakesh">Rakesh Verma</SelectItem>
                        <SelectItem value="abc">ABC Construction</SelectItem>
                        <SelectItem value="xyz">XYZ Electricals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phase">Phase</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select phase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="foundation">Foundation</SelectItem>
                        <SelectItem value="structure">Structure</SelectItem>
                        <SelectItem value="mep">MEP</SelectItem>
                        <SelectItem value="finishing">Finishing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Estimated Hours</Label>
                    <Input type="number" placeholder="Hours" />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Budget</Label>
                    <Input type="number" placeholder="Amount in INR" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Requirements</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="quality" />
                      <Label htmlFor="quality" className="text-sm">Quality Check Required</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="safety" />
                      <Label htmlFor="safety" className="text-sm">Safety Check Required</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="approval" />
                      <Label htmlFor="approval" className="text-sm">Customer Approval Required</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddTask(false)}>
                  Create Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Across all phases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">42</div>
            <Progress value={27} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98</div>
            <p className="text-xs text-muted-foreground">
              63% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">8</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">16</div>
            <p className="text-xs text-muted-foreground">
              Past deadline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-muted-foreground">
              High priority
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-none border-x"
                  onClick={() => setViewMode('kanban')}
                >
                  <Kanban className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode('calendar')}
                >
                  <CalendarDays className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'gantt' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode('gantt')}
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List View */}
      {viewMode === 'list' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Checks</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => {
                  const CategoryIcon = getCategoryIcon(task.category);
                  const isExpanded = expandedTasks.includes(task.id);
                  return (
                    <React.Fragment key={task.id}>
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => toggleTaskExpansion(task.id)}
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <div className="font-medium">{task.title}</div>
                              <div className="text-sm text-muted-foreground">{task.code}</div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {task.phase}
                                </Badge>
                                {task.milestone && (
                                  <Badge variant="outline" className="text-xs">
                                    <GitBranch className="h-3 w-3 mr-1" />
                                    {task.milestone}
                                  </Badge>
                                )}
                              </div>
                              {task.blockedBy && (
                                <Alert className="mt-2 p-2">
                                  <AlertTriangle className="h-3 w-3" />
                                  <AlertDescription className="text-xs">
                                    Blocked: {task.blockedBy}
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>
                                {task.assignee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{task.assignee.name}</div>
                              <div className="text-xs text-muted-foreground">{task.assignee.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <Badge className={getStatusColor(task.status)}>
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Progress value={task.progress} className="w-[80px] h-2" />
                              <span className="text-sm font-medium">{task.progress}%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {task.actualHours}/{task.estimatedHours}h
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            {new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
                              <Badge variant="destructive" className="text-xs">
                                Overdue
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {task.qualityChecks.required && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge 
                                      variant={task.qualityChecks.completed ? 'success' : 'secondary'}
                                      className="text-xs"
                                    >
                                      <Shield className="h-3 w-3" />
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Quality Check {task.qualityChecks.completed ? 'Completed' : 'Pending'}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {task.safetyChecks.required && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge 
                                      variant={task.safetyChecks.completed ? 'success' : 'secondary'}
                                      className="text-xs"
                                    >
                                      <HardHat className="h-3 w-3" />
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Safety Check {task.safetyChecks.completed ? 'Completed' : 'Pending'}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {task.customerApproval.required && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Badge 
                                      variant={
                                        task.customerApproval.status === 'approved' ? 'success' :
                                        task.customerApproval.status === 'rejected' ? 'destructive' :
                                        'secondary'
                                      }
                                      className="text-xs"
                                    >
                                      <User className="h-3 w-3" />
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Customer Approval: {task.customerApproval.status}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <User className="h-4 w-4 mr-2" />
                                Reassign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Add Comment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Paperclip className="h-4 w-4 mr-2" />
                                Attach Files
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  <Flag className="h-4 w-4 mr-2" />
                                  Change Priority
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>Critical</DropdownMenuItem>
                                  <DropdownMenuItem>High</DropdownMenuItem>
                                  <DropdownMenuItem>Medium</DropdownMenuItem>
                                  <DropdownMenuItem>Low</DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  <Timer className="h-4 w-4 mr-2" />
                                  Change Status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem>To Do</DropdownMenuItem>
                                  <DropdownMenuItem>In Progress</DropdownMenuItem>
                                  <DropdownMenuItem>Review</DropdownMenuItem>
                                  <DropdownMenuItem>Completed</DropdownMenuItem>
                                  <DropdownMenuItem>Blocked</DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={10} className="bg-muted/30">
                            <div className="p-4 space-y-4">
                              {/* Task Description */}
                              <div>
                                <h4 className="text-sm font-semibold mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                              </div>

                              {/* Checklist */}
                              {task.checklist.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Checklist</h4>
                                  <div className="space-y-2">
                                    {task.checklist.map(item => (
                                      <div key={item.id} className="flex items-center gap-2">
                                        <Checkbox checked={item.completed} />
                                        <span className={cn(
                                          "text-sm",
                                          item.completed && "line-through text-muted-foreground"
                                        )}>
                                          {item.title}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Materials */}
                              {task.materials && (
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Materials</h4>
                                  <div className="grid grid-cols-3 gap-4">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Required</p>
                                      <div className="space-y-1">
                                        {task.materials.required.map(item => (
                                          <Badge key={item} variant="outline" className="text-xs">
                                            {item}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Delivered</p>
                                      <div className="space-y-1">
                                        {task.materials.delivered.map(item => (
                                          <Badge key={item} variant="success" className="text-xs">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            {item}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">Pending</p>
                                      <div className="space-y-1">
                                        {task.materials.pending.map(item => (
                                          <Badge key={item} variant="secondary" className="text-xs">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {item}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Attachments and Comments */}
                              <div className="grid grid-cols-2 gap-4">
                                {task.attachments.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold mb-2">Attachments</h4>
                                    <div className="space-y-2">
                                      {task.attachments.map(file => (
                                        <div key={file.id} className="flex items-center gap-2 text-sm">
                                          <File className="h-4 w-4 text-muted-foreground" />
                                          <span className="text-blue-600 hover:underline cursor-pointer">
                                            {file.name}
                                          </span>
                                          <span className="text-xs text-muted-foreground">({file.size})</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {task.comments.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-semibold mb-2">Recent Comments</h4>
                                    <div className="space-y-2">
                                      {task.comments.map(comment => (
                                        <div key={comment.id} className="text-sm">
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">{comment.author}</span>
                                            <span className="text-xs text-muted-foreground">
                                              {comment.timestamp}
                                            </span>
                                          </div>
                                          <p className="text-muted-foreground">{comment.message}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Kanban View Placeholder */}
      {viewMode === 'kanban' && (
        <div className="grid gap-4 md:grid-cols-4">
          {['todo', 'in-progress', 'review', 'completed'].map(status => (
            <Card key={status}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base capitalize">{status.replace('-', ' ')}</CardTitle>
                <CardDescription>
                  {filteredTasks.filter(t => t.status === status).length} tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {filteredTasks
                      .filter(task => task.status === status)
                      .map(task => {
                        const CategoryIcon = getCategoryIcon(task.category);
                        return (
                          <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-2">
                                    <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{task.code}</span>
                                  </div>
                                  <Badge className={getPriorityColor(task.priority)} variant="outline">
                                    {task.priority}
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-sm">{task.title}</h4>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={task.assignee.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {task.assignee.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">
                                    {task.assignee.name}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Progress value={task.progress} className="w-full h-1" />
                                  <span className="text-xs ml-2">{task.progress}%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                  <div className="flex gap-1">
                                    {task.attachments.length > 0 && (
                                      <Badge variant="outline" className="h-5 px-1">
                                        <Paperclip className="h-3 w-3" />
                                      </Badge>
                                    )}
                                    {task.comments.length > 0 && (
                                      <Badge variant="outline" className="h-5 px-1">
                                        <MessageSquare className="h-3 w-3" />
                                        {task.comments.length}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
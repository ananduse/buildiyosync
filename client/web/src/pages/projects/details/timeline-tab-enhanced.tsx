import React, { useState, useMemo } from 'react';
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, isAfter } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Clock,
  Target,
  Briefcase,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CalendarDays,
  Timer,
  CheckCircle2,
  Circle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Flag,
  Milestone,
  GitBranch,
  Activity,
  BarChart3,
  Grid3X3,
  List,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CalendarRange,
  ArrowRight,
  Users,
  DollarSign,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  CheckSquare,
  Square,
  Info,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Layers,
  FileText,
} from 'lucide-react';

import { cn } from '@/lib/utils';

// Helper function to generate random avatar colors matching the team reference
const getRandomAvatarColor = () => {
  const colors = [
    'bg-red-600',      // Red
    'bg-orange-600',   // Orange  
    'bg-amber-600',    // Amber
    'bg-yellow-600',   // Yellow
    'bg-lime-600',     // Lime
    'bg-green-600',    // Green
    'bg-emerald-600',  // Emerald
    'bg-teal-600',     // Teal
    'bg-cyan-600',     // Cyan
    'bg-sky-600',      // Sky
    'bg-blue-600',     // Blue
    'bg-indigo-600',   // Indigo
    'bg-violet-600',   // Violet
    'bg-purple-600',   // Purple
    'bg-fuchsia-600',  // Fuchsia
    'bg-pink-600',     // Pink
    'bg-rose-600',     // Rose
    'bg-stone-600',    // Stone
    'bg-neutral-600',  // Neutral
    'bg-zinc-600',     // Zinc
    'bg-gray-700',     // Gray (darker)
    'bg-slate-700',    // Slate (darker)
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Store avatar colors to maintain consistency for the same user
const avatarColors = new Map<string, string>();

const getAvatarColor = (id: string) => {
  if (!avatarColors.has(id)) {
    avatarColors.set(id, getRandomAvatarColor());
  }
  return avatarColors.get(id) || 'bg-gray-500';
};

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
} from 'recharts';

interface TimelineTabEnhancedProps {
  project: any;
}

export function TimelineTabEnhanced({ project }: TimelineTabEnhancedProps) {
  const [viewMode, setViewMode] = useState<'timeline' | 'gantt' | 'calendar' | 'list'>('timeline');
  
  // Disable page scroll when in Gantt view
  React.useEffect(() => {
    if (viewMode === 'gantt') {
      document.body.classList.add('gantt-active');
    } else {
      document.body.classList.remove('gantt-active');
    }
    
    return () => {
      document.body.classList.remove('gantt-active');
    };
  }, [viewMode]);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(project.timeline.startDate),
    to: new Date(project.timeline.endDate)
  });
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');
  const [showCriticalPath, setShowCriticalPath] = useState(true);
  const [editingMilestone, setEditingMilestone] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Enhanced milestones with sub-tasks and dependencies
  const enhancedMilestones = [
    {
      id: 1,
      name: 'Real Estate Project Management',
      type: 'project',
      status: 'in-progress',
      startDate: '2024-08-06',
      endDate: '2025-05-01',
      progress: 16.67,
      assignee: '',
      budget: 100000000,
      dependencies: [],
      expanded: true,
      risk: 'medium',
      criticalPath: true,
      tasks: 11,
      completedTasks: 2,
      description: 'Complete real estate development project',
      subtasks: [
        {
          id: 11,
          parentId: 1,
          name: 'Awarding of the construction contract',
          type: 'task',
          status: 'completed',
          startDate: '2024-08-06',
          endDate: '2024-08-12',
          progress: 100,
          assignee: 'Sarah Johnson',
          dependencies: []
        },
        {
          id: 12,
          parentId: 1,
          name: 'Site visit and evaluation',
          type: 'task',
          status: 'completed',
          startDate: '2024-08-07',
          endDate: '2024-08-09',
          progress: 100,
          assignee: 'John Smith',
          dependencies: []
        },
        {
          id: 13,
          parentId: 1,
          name: 'Site cleaning and preparation',
          type: 'task',
          status: 'in-progress',
          startDate: '2024-08-10',
          endDate: '2024-08-20',
          progress: 60,
          assignee: 'Mike Chen',
          dependencies: [12]
        },
        {
          id: 14,
          parentId: 1,
          name: 'Preparation of utilities and equipment',
          type: 'task',
          status: 'in-progress',
          startDate: '2024-08-12',
          endDate: '2024-08-25',
          progress: 40,
          assignee: 'Emily Davis',
          dependencies: [13]
        },
        {
          id: 15,
          parentId: 1,
          name: 'Site excavation',
          type: 'task',
          status: 'pending',
          startDate: '2024-08-21',
          endDate: '2024-09-10',
          progress: 0,
          assignee: 'Robert Wilson',
          dependencies: [13]
        },
        {
          id: 16,
          parentId: 1,
          name: 'Installment of foundation and backfill',
          type: 'task',
          status: 'pending',
          startDate: '2024-09-11',
          endDate: '2024-10-15',
          progress: 0,
          assignee: 'Lisa Anderson',
          dependencies: [15]
        },
        {
          id: 17,
          parentId: 1,
          name: 'Floors and wall erection',
          type: 'task',
          status: 'pending',
          startDate: '2024-10-16',
          endDate: '2024-12-30',
          progress: 0,
          assignee: 'David Brown',
          dependencies: [16]
        },
        {
          id: 18,
          parentId: 1,
          name: 'Roof installment',
          type: 'task',
          status: 'pending',
          startDate: '2025-01-02',
          endDate: '2025-02-15',
          progress: 0,
          assignee: 'Jennifer Lee',
          dependencies: [17]
        },
        {
          id: 19,
          parentId: 1,
          name: 'Wall exterior and interior finishing',
          type: 'task',
          status: 'pending',
          startDate: '2025-02-16',
          endDate: '2025-03-30',
          progress: 0,
          assignee: 'Chris Martin',
          dependencies: [18]
        },
        {
          id: 20,
          parentId: 1,
          name: 'Electrical and plumbing works',
          type: 'task',
          status: 'pending',
          startDate: '2025-02-01',
          endDate: '2025-04-15',
          progress: 0,
          assignee: 'Kevin White',
          dependencies: [17]
        },
        {
          id: 21,
          parentId: 1,
          name: 'Aesthetics and finishings',
          type: 'task',
          status: 'pending',
          startDate: '2025-04-16',
          endDate: '2025-05-01',
          progress: 0,
          assignee: 'Amanda Green',
          dependencies: [19, 20]
        }
      ]
    },
    {
      id: 2,
      name: 'Infrastructure Development',
      type: 'project',
      status: 'pending',
      startDate: '2024-09-01',
      endDate: '2025-03-15',
      progress: 0,
      assignee: '',
      budget: 50000000,
      dependencies: [],
      expanded: false,
      risk: 'high',
      criticalPath: true,
      tasks: 8,
      completedTasks: 0,
      description: 'Infrastructure and utilities setup',
      subtasks: [
        {
          id: 22,
          parentId: 2,
          name: 'Road Construction',
          type: 'task',
          status: 'pending',
          startDate: '2024-09-01',
          endDate: '2024-10-15',
          progress: 0,
          assignee: 'Michael Brown',
          dependencies: []
        },
        {
          id: 23,
          parentId: 2,
          name: 'Water Supply System',
          type: 'task',
          status: 'pending',
          startDate: '2024-10-16',
          endDate: '2024-11-30',
          progress: 0,
          assignee: 'Susan Davis',
          dependencies: [22]
        },
        {
          id: 24,
          parentId: 2,
          name: 'Electrical Grid Setup',
          type: 'task',
          status: 'pending',
          startDate: '2024-12-01',
          endDate: '2025-01-15',
          progress: 0,
          assignee: 'James Wilson',
          dependencies: [22]
        },
        {
          id: 25,
          parentId: 2,
          name: 'Sewage System',
          type: 'task',
          status: 'pending',
          startDate: '2025-01-16',
          endDate: '2025-02-28',
          progress: 0,
          assignee: 'Patricia Garcia',
          dependencies: [23]
        },
        {
          id: 26,
          parentId: 2,
          name: 'Telecommunications',
          type: 'task',
          status: 'pending',
          startDate: '2025-02-01',
          endDate: '2025-03-15',
          progress: 0,
          assignee: 'Thomas Martinez',
          dependencies: [24]
        }
      ]
    },
    {
      id: 3,
      name: 'Landscaping & External Works',
      type: 'project',
      status: 'pending',
      startDate: '2025-03-01',
      endDate: '2025-06-30',
      progress: 0,
      assignee: '',
      budget: 15000000,
      dependencies: [],
      expanded: false,
      risk: 'low',
      criticalPath: false,
      tasks: 6,
      completedTasks: 0,
      description: 'External beautification and landscaping',
      subtasks: [
        {
          id: 31,
          parentId: 3,
          name: 'Garden Design',
          type: 'task',
          status: 'pending',
          startDate: '2025-03-01',
          endDate: '2025-03-15',
          progress: 0,
          assignee: 'Nancy Robinson',
          dependencies: []
        },
        {
          id: 32,
          parentId: 3,
          name: 'Tree Planting',
          type: 'task',
          status: 'pending',
          startDate: '2025-03-16',
          endDate: '2025-04-15',
          progress: 0,
          assignee: 'Daniel Clark',
          dependencies: [31]
        },
        {
          id: 33,
          parentId: 3,
          name: 'Lawn Installation',
          type: 'task',
          status: 'pending',
          startDate: '2025-04-16',
          endDate: '2025-05-15',
          progress: 0,
          assignee: 'Maria Rodriguez',
          dependencies: [31]
        },
        {
          id: 34,
          parentId: 3,
          name: 'Pathway Construction',
          type: 'task',
          status: 'pending',
          startDate: '2025-05-16',
          endDate: '2025-06-15',
          progress: 0,
          assignee: 'Charles Lewis',
          dependencies: [32, 33]
        },
        {
          id: 35,
          parentId: 3,
          name: 'Outdoor Lighting',
          type: 'task',
          status: 'pending',
          startDate: '2025-06-16',
          endDate: '2025-06-30',
          progress: 0,
          assignee: 'Barbara Walker',
          dependencies: [34]
        }
      ]
    }
  ];

  // Get all tasks including subtasks
  const getAllTasksFlat = () => {
    const tasks: any[] = [];
    enhancedMilestones.forEach(project => {
      tasks.push(project);
      if (project.subtasks) {
        tasks.push(...project.subtasks);
      }
    });
    return tasks;
  };
  
  // Filter milestones based on status
  const filteredMilestones = useMemo(() => {
    const allTasks = getAllTasksFlat();
    if (filterStatus === 'all') return allTasks;
    return allTasks.filter(t => t.status === filterStatus);
  }, [filterStatus]);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allTasks = getAllTasksFlat();
    const completed = allTasks.filter(t => t.status === 'completed').length;
    return allTasks.length > 0 ? (completed / allTasks.length) * 100 : 0;
  }, []);

  // Milestone progress data for chart
  const milestoneProgressData = enhancedMilestones.map(m => ({
    name: m.name.length > 20 ? m.name.substring(0, 20) + '...' : m.name,
    planned: 100,
    actual: m.progress,
    fill: m.status === 'completed' ? '#10b981' : m.status === 'in-progress' ? '#3b82f6' : '#e5e7eb'
  }));

  // Calculate timeline statistics
  const timelineStats = {
    totalDuration: differenceInDays(new Date(project.timeline.endDate), new Date(project.timeline.startDate)),
    elapsedDays: differenceInDays(new Date(), new Date(project.timeline.startDate)),
    remainingDays: differenceInDays(new Date(project.timeline.endDate), new Date()),
    completedMilestones: getAllTasksFlat().filter(t => t.status === 'completed').length,
    delayedMilestones: getAllTasksFlat().filter(t => t.actualEndDate && new Date(t.actualEndDate) > new Date(t.endDate)).length,
    criticalPathMilestones: getAllTasksFlat().filter(t => t.criticalPath).length,
    totalBudget: enhancedMilestones[0]?.budget || 100000000,
    spentBudget: enhancedMilestones[0]?.budget ? enhancedMilestones[0].budget * (enhancedMilestones[0].progress / 100) : 0
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2;
      case 'in-progress': return Timer;
      case 'pending': return Circle;
      default: return Circle;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Gantt chart view component with drag-and-drop and sub-tasks
  const GanttView = () => {
    const [projects, setProjects] = useState(enhancedMilestones);
    const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set([1]));
    const [draggedItem, setDraggedItem] = useState<any>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const [resizeStart, setResizeStart] = useState({ x: 0, width: 0 });
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTaskParent, setNewTaskParent] = useState<number | null>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    
    // Disable body scroll when Gantt is mounted
    React.useEffect(() => {
      // Add class to body
      document.body.classList.add('gantt-active');
      
      // Cleanup function to remove class when component unmounts
      return () => {
        document.body.classList.remove('gantt-active');
      };
    }, []);
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Calculate timeline units based on zoom level and date range
    const startDate = dateRange.from || new Date('2024-01-01');
    const endDate = dateRange.to || new Date('2025-12-31');
    const totalDays = differenceInDays(endDate, startDate);
    
    // Zoom level configurations
    const zoomConfig = {
      week: { pixelsPerUnit: 100, unitsPerMonth: 4.3, label: 'Week', format: (date: Date) => `W${format(date, 'w')} ${format(date, 'MMM')}` },
      month: { pixelsPerUnit: 60, unitsPerMonth: 1, label: 'Month', format: (date: Date) => format(date, 'MMM yyyy') },
      quarter: { pixelsPerUnit: 180, unitsPerMonth: 0.33, label: 'Quarter', format: (date: Date) => `Q${Math.ceil((date.getMonth() + 1) / 3)} ${format(date, 'yyyy')}` },
      year: { pixelsPerUnit: 240, unitsPerMonth: 0.083, label: 'Year', format: (date: Date) => format(date, 'yyyy') }
    };
    
    const currentZoom = zoomConfig[zoomLevel];
    const totalMonths = totalDays / 30;
    const totalUnits = totalMonths * currentZoom.unitsPerMonth;
    const pixelsPerDay = currentZoom.pixelsPerUnit / (zoomLevel === 'week' ? 7 : zoomLevel === 'month' ? 30 : zoomLevel === 'quarter' ? 90 : 365);
    
    // Generate timeline headers based on zoom level
    const getTimelineHeaders = () => {
      const headers = [];
      let currentDate = new Date(startDate);
      
      if (zoomLevel === 'week') {
        while (currentDate <= endDate) {
          headers.push({ date: new Date(currentDate), label: currentZoom.format(currentDate) });
          currentDate = addDays(currentDate, 7);
        }
      } else if (zoomLevel === 'month') {
        while (currentDate <= endDate) {
          headers.push({ date: new Date(currentDate), label: currentZoom.format(currentDate) });
          currentDate = addDays(currentDate, 30);
        }
      } else if (zoomLevel === 'quarter') {
        while (currentDate <= endDate) {
          headers.push({ date: new Date(currentDate), label: currentZoom.format(currentDate) });
          currentDate = addDays(currentDate, 90);
        }
      } else if (zoomLevel === 'year') {
        while (currentDate <= endDate) {
          headers.push({ date: new Date(currentDate), label: currentZoom.format(currentDate) });
          currentDate = addDays(currentDate, 365);
        }
      }
      
      return headers;
    };
    
    const timelineHeaders = getTimelineHeaders();
    
    // Get all tasks (flattened) for display
    const getAllTasks = () => {
      const tasks: any[] = [];
      projects.forEach(project => {
        tasks.push(project);
        if (expandedProjects.has(project.id) && project.subtasks) {
          tasks.push(...project.subtasks);
        }
      });
      return tasks;
    };
    
    const allTasks = getAllTasks();
    
    // Toggle project expansion
    const toggleProject = (projectId: number) => {
      setExpandedProjects(prev => {
        const newSet = new Set(prev);
        if (newSet.has(projectId)) {
          newSet.delete(projectId);
        } else {
          newSet.add(projectId);
        }
        return newSet;
      });
    };
    
    // Handle edit milestone
    const handleEditMilestone = (milestone: any) => {
      setEditingMilestone(milestone);
      setShowEditDialog(true);
    };

    // Handle drag start
    const handleDragStart = (e: React.MouseEvent, milestone: any) => {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setDraggedItem(milestone);
      e.preventDefault();
    };

    // Handle drag
    const handleDrag = (e: React.MouseEvent) => {
      if (!draggedItem) return;

      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - dragOffset.x - 264; // Subtract sidebar width
      const dayPosition = Math.max(0, x / pixelsPerDay);
      
      setProjects(prev => prev.map(p => {
        if (p.id === draggedItem.id) {
          const duration = differenceInDays(new Date(p.endDate), new Date(p.startDate));
          const newStartDate = addDays(startDate, dayPosition);
          const newEndDate = addDays(newStartDate, duration);
          
          return {
            ...p,
            startDate: format(newStartDate, 'yyyy-MM-dd'),
            endDate: format(newEndDate, 'yyyy-MM-dd')
          };
        }
        return p;
      }));
    };

    // Handle resize start
    const handleResizeStart = (e: React.MouseEvent, milestoneId: string, currentWidth: number) => {
      e.stopPropagation();
      setIsResizing(milestoneId);
      setResizeStart({ x: e.clientX, width: currentWidth });
      e.preventDefault();
    };

    // Handle resize
    const handleResize = (e: React.MouseEvent) => {
      if (!isResizing) return;

      const deltaX = e.clientX - resizeStart.x;
      const newWidth = Math.max(pixelsPerDay * 7, resizeStart.width + deltaX); // Min 1 week
      const newDuration = Math.round(newWidth / pixelsPerDay);
      
      setProjects(prev => prev.map(p => {
        if (p.id.toString() === isResizing) {
          const newEndDate = addDays(new Date(p.startDate), newDuration);
          return {
            ...p,
            endDate: format(newEndDate, 'yyyy-MM-dd')
          };
        }
        return p;
      }));
    };

    // Handle mouse up
    const handleMouseUp = () => {
      setDraggedItem(null);
      setIsResizing(null);
    };

    return (
      <Card className="w-full max-w-full overflow-hidden h-[calc(100vh-200px)]">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <CardTitle>Interactive Gantt Chart</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Drag to reschedule • Resize edges • Double-click to edit • Filter by date/status
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="justify-start text-left font-normal">
                    <CalendarRange className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              
              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border rounded-md">
                <Button 
                  variant={zoomLevel === 'week' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-none rounded-l-md h-8"
                  onClick={() => setZoomLevel('week')}
                >
                  Week
                </Button>
                <Button 
                  variant={zoomLevel === 'month' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-none h-8"
                  onClick={() => setZoomLevel('month')}
                >
                  Month
                </Button>
                <Button 
                  variant={zoomLevel === 'quarter' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-none h-8"
                  onClick={() => setZoomLevel('quarter')}
                >
                  Quarter
                </Button>
                <Button 
                  variant={zoomLevel === 'year' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  className="rounded-none rounded-r-md h-8"
                  onClick={() => setZoomLevel('year')}
                >
                  Year
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent 
          className="p-0 relative h-[calc(100%-120px)]"
          onMouseMove={(e) => {
            if (draggedItem) handleDrag(e);
            if (isResizing) handleResize(e);
          }}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex h-full border-t w-full max-w-full" style={{ overflow: 'hidden' }}>
            {/* Fixed Left Panel */}
            <div className="w-[350px] min-w-[350px] max-w-[350px] border-r bg-background flex-shrink-0 flex flex-col relative z-10">
              {/* Left Panel Header */}
              <div className="h-12 border-b bg-muted/30 flex items-center px-4 flex-shrink-0">
                <span className="font-semibold text-sm flex-1">Task Name</span>
                <span className="text-xs text-muted-foreground w-20 text-right">Assignee</span>
              </div>
              
              {/* Left Panel Rows */}
              <div className="flex-1 gantt-scrollbar" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                {allTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={cn(
                      "h-12 border-b hover:bg-muted/50 flex items-center group transition-colors",
                      task.type === 'task' && "bg-muted/5"
                    )}
                    style={{ paddingLeft: task.type === 'task' ? '3rem' : '1rem', paddingRight: '1rem' }}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {/* Expand/Collapse Icon for projects */}
                      {task.type === 'project' ? (
                        <button 
                          onClick={() => toggleProject(task.id)}
                          className="p-0.5 hover:bg-muted rounded flex-shrink-0"
                        >
                          {expandedProjects.has(task.id) ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </button>
                      ) : (
                        <div className="w-5 flex-shrink-0" />
                      )}
                      
                      {/* Status Indicator */}
                      <div className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0",
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-400'
                      )} />
                      
                      {/* Task Name */}
                      <span className={cn(
                        "text-sm truncate flex-1 pr-2",
                        task.type === 'project' ? "font-semibold text-foreground" : "font-normal text-muted-foreground"
                      )}>
                        {task.name}
                      </span>
                      
                      {/* Assignee Avatar */}
                      {task.assignee && (
                        <Avatar className="h-5 w-5 flex-shrink-0">
                          <AvatarFallback className={cn(
                            getAvatarColor(task.id + task.assignee), 
                            'text-white text-[9px] font-bold'
                          )}>
                            {task.assignee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {/* Add Task Button */}
                <div className="h-12 border-b hover:bg-muted/50 flex items-center px-4">
                  <button 
                    onClick={() => setShowAddTask(true)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Right Timeline */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden bg-muted/5">
              {/* Timeline Header - Fixed height, scrolls with content */}
              <div className="h-12 border-b bg-muted/30 flex-shrink-0 gantt-header-sync">
                <div 
                  className="h-full"
                  style={{ transform: `translateX(-${scrollLeft}px)` }}
                >
                  <div className="flex h-full" style={{ width: timelineHeaders.length * currentZoom.pixelsPerUnit }}>
                    {timelineHeaders.map((header, i) => (
                      <div 
                        key={i} 
                        className="border-r flex items-center justify-center text-xs font-medium bg-background flex-shrink-0"
                        style={{ width: currentZoom.pixelsPerUnit }}
                      >
                        {header.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Timeline Content - Scrollable area */}
              <div 
                className="flex-1 gantt-content-scroll"
                onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
              >
                <div 
                  className="relative min-h-full"
                  style={{ width: timelineHeaders.length * currentZoom.pixelsPerUnit }}
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {timelineHeaders.map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute top-0 bottom-0 border-r border-muted"
                        style={{ left: i * currentZoom.pixelsPerUnit }}
                      />
                    ))}
                  </div>
                  
                  {/* Task Bars */}
                  {allTasks.map((task, index) => {
                    const tStartDate = new Date(task.startDate);
                    const tEndDate = new Date(task.endDate);
                    const startOffset = differenceInDays(tStartDate, startDate);
                    const duration = differenceInDays(tEndDate, tStartDate);
                    const barLeft = startOffset * pixelsPerDay;
                    const barWidth = duration * pixelsPerDay;
                    
                    return (
                      <div 
                        key={task.id} 
                        className="h-12 border-b relative group hover:bg-muted/20"
                      >
                        {/* Dependency lines */}
                        {task.dependencies && task.dependencies.map((depId: number) => {
                          const dep = allTasks.find(t => t.id === depId);
                          if (!dep) return null;
                          const depEndOffset = differenceInDays(new Date(dep.endDate), startDate);
                          const depIndex = allTasks.findIndex(t => t.id === depId);
                          const verticalOffset = (index - depIndex) * 48;
                          
                          return (
                            <svg key={depId} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                              <defs>
                                <marker id={`arrow-${task.id}-${depId}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                                </marker>
                              </defs>
                              <path
                                d={`M ${depEndOffset * pixelsPerDay} ${24 - verticalOffset} 
                                   Q ${(depEndOffset * pixelsPerDay + barLeft) / 2} ${24 - verticalOffset / 2},
                                     ${barLeft - 5} 24`}
                                stroke="#94a3b8"
                                strokeWidth="1.5"
                                fill="none"
                                strokeDasharray="4 2"
                                markerEnd={`url(#arrow-${task.id}-${depId})`}
                                opacity="0.5"
                              />
                            </svg>
                          );
                        })}
                        
                        {/* Task Bar */}
                        <div 
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 h-8 rounded cursor-move transition-all hover:shadow-lg",
                            "flex items-center px-2",
                            task.status === 'completed' ? 'bg-green-500' :
                            task.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-400',
                            task.type === 'project' && 'font-semibold',
                            draggedItem?.id === task.id && 'opacity-70 shadow-2xl'
                          )}
                          style={{
                            left: Math.max(0, barLeft),
                            width: barWidth,
                            zIndex: draggedItem?.id === task.id ? 10 : 1
                          }}
                          onMouseDown={(e) => handleDragStart(e, task)}
                          onDoubleClick={() => handleEditMilestone(task)}
                        >
                          {/* Progress fill */}
                          <div 
                            className="absolute inset-0 bg-black/20 rounded"
                            style={{ width: `${task.progress}%` }}
                          />
                          
                          {/* Content */}
                          {barWidth > 40 && (
                            <span className="relative text-xs text-white font-medium z-10 truncate">
                              {task.progress}%
                            </span>
                          )}
                          
                          {/* Resize handle */}
                          <div 
                            className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/30 group-hover:opacity-100 opacity-0 transition-opacity"
                            onMouseDown={(e) => handleResizeStart(e, task.id.toString(), barWidth)}
                          />
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Today line */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
                    style={{ 
                      left: differenceInDays(new Date(), startDate) * pixelsPerDay,
                      zIndex: 20
                    }}
                  >
                    <div className="absolute -top-6 -left-6 text-xs font-semibold text-red-500 bg-background px-1 rounded">
                      Today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Toolbar */}
          <div className="p-3 border-t bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowAddTask(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Milestone
                </Button>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-red-500 rounded" />
                  <span>Critical Path</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0 border-t-2 border-dashed border-gray-500" />
                  <span>Dependencies</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Showing {allTasks.length} tasks • {allTasks.filter(t => t.status === 'completed').length} completed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Calendar view component
  const CalendarView = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const days = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    });

    const getMilestonesForDate = (date: Date) => {
      return enhancedMilestones.filter(m => {
        const start = new Date(m.startDate);
        const end = new Date(m.endDate);
        return date >= start && date <= end;
      });
    };

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Calendar View - {format(currentMonth, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(prev => addDays(prev, -30))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentMonth(prev => addDays(prev, 30))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px bg-muted">
            {/* Weekday headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-background p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map(day => {
              const milestones = getMilestonesForDate(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isCurrentDay = isToday(day);
              
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "bg-background p-2 min-h-[100px] border",
                    !isCurrentMonth && "opacity-50",
                    isCurrentDay && "bg-blue-50 dark:bg-blue-950"
                  )}
                >
                  <div className="text-sm font-medium mb-1">
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {milestones.slice(0, 3).map(m => (
                      <div
                        key={m.id}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80",
                          m.status === 'completed' && "bg-green-100 text-green-700",
                          m.status === 'in-progress' && "bg-blue-100 text-blue-700",
                          m.status === 'pending' && "bg-gray-100 text-gray-700"
                        )}
                        onClick={() => setSelectedMilestone(m.id.toString())}
                      >
                        {m.name}
                      </div>
                    ))}
                    {milestones.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{milestones.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 w-full max-w-full" style={{ overflow: viewMode === 'gantt' ? 'hidden' : 'auto' }}>
      {/* Enhanced Timeline Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Project Timeline & Milestones</h2>
            <p className="text-muted-foreground">
              {format(new Date(project.timeline.startDate), 'MMM dd, yyyy')} - {format(new Date(project.timeline.endDate), 'MMM dd, yyyy')}
              • {timelineStats.totalDuration} days • {overallProgress.toFixed(0)}% complete
            </p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range: any) => setDateRange(range)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={() => setShowCriticalPath(!showCriticalPath)}>
              <GitBranch className="h-4 w-4 mr-2" />
              {showCriticalPath ? 'Hide' : 'Show'} Critical Path
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
          <TabsList>
            <TabsTrigger value="timeline">
              <Activity className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="gantt">
              <BarChart3 className="h-4 w-4 mr-2" />
              Gantt Chart
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Timeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Progress</p>
                <p className="text-2xl font-bold">{overallProgress.toFixed(0)}%</p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Milestones</p>
                <p className="text-2xl font-bold">{timelineStats.completedMilestones}/{enhancedMilestones.length}</p>
              </div>
              <Flag className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Days Elapsed</p>
                <p className="text-2xl font-bold">{timelineStats.elapsedDays}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Days Remaining</p>
                <p className="text-2xl font-bold">{timelineStats.remainingDays}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Critical Path</p>
                <p className="text-2xl font-bold">{timelineStats.criticalPathMilestones}</p>
              </div>
              <GitBranch className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-red-600">{timelineStats.delayedMilestones}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Content */}
      {viewMode === 'timeline' && (
        <>
          {/* Milestone Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Milestone Progress Overview</CardTitle>
              <CardDescription>Comparison of planned vs actual progress for each milestone</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={milestoneProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="actual" name="Actual Progress" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enhanced Milestones Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Milestone Timeline</CardTitle>
              <CardDescription>Interactive timeline with milestone details and dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
                
                {/* Milestones */}
                <div className="space-y-8">
                  {filteredMilestones.filter(t => t.type !== 'task').map((milestone, index) => {
                    const Icon = getMilestoneIcon(milestone.status);
                    const isExpanded = selectedMilestone === milestone.id?.toString();
                    
                    return (
                      <div key={milestone.id} className="relative flex gap-6">
                        {/* Timeline dot with connecting line */}
                        <div className="relative">
                          <div className={cn(
                            "absolute left-1.5 h-6 w-6 rounded-full border-4 border-white dark:border-gray-950 z-10",
                            milestone.status === 'completed' ? "bg-green-500" :
                            milestone.status === 'in-progress' ? "bg-blue-500" :
                            "bg-gray-300"
                          )}>
                            <Icon className="h-3 w-3 text-white absolute top-0.5 left-0.5" />
                          </div>
                          {milestone.criticalPath && showCriticalPath && index < filteredMilestones.length - 1 && (
                            <div className="absolute left-5 top-6 bottom-0 w-0.5 bg-orange-500" />
                          )}
                        </div>
                        
                        {/* Milestone Content Card */}
                        <div className="flex-1 -mt-1">
                          <Card 
                            className={cn(
                              "cursor-pointer transition-all",
                              isExpanded && "shadow-lg",
                              milestone.criticalPath && showCriticalPath && "border-orange-200 dark:border-orange-900"
                            )}
                            onClick={() => setSelectedMilestone(isExpanded ? null : milestone.id.toString())}
                          >
                            <CardContent className="p-4">
                              {/* Header */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-lg">{milestone.name}</h4>
                                    <Badge variant={
                                      milestone.status === 'completed' ? 'success' :
                                      milestone.status === 'in-progress' ? 'default' :
                                      'secondary'
                                    }>
                                      {milestone.status}
                                    </Badge>
                                    {milestone.criticalPath && (
                                      <Badge variant="destructive" className="text-xs">
                                        Critical Path
                                      </Badge>
                                    )}
                                    <Badge className={cn("text-xs", getRiskColor(milestone.risk))}>
                                      {milestone.risk} risk
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {format(new Date(milestone.startDate), 'MMM dd')} - {format(new Date(milestone.endDate), 'MMM dd, yyyy')}
                                    {milestone.actualEndDate && (
                                      <span className={cn(
                                        "ml-2",
                                        new Date(milestone.actualEndDate) > new Date(milestone.endDate) ? "text-red-600" : "text-green-600"
                                      )}>
                                        (Actual: {format(new Date(milestone.actualEndDate), 'MMM dd')})
                                      </span>
                                    )}
                                  </p>
                                </div>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Milestone
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Users className="h-4 w-4 mr-2" />
                                      Manage Team
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {/* Progress and Stats */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Progress</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={milestone.progress} className="flex-1" />
                                    <span className="text-sm font-medium">{milestone.progress}%</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Tasks</p>
                                  <div className="flex items-center gap-2">
                                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{milestone.completedTasks}/{milestone.tasks}</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Budget</p>
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">${(milestone.budget / 1000000).toFixed(1)}M</span>
                                  </div>
                                </div>
                              </div>

                              {/* Assignee */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className={cn(getAvatarColor(milestone.id + milestone.assignee), 'text-white font-bold text-xs')}>
                                      {milestone.assignee.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">
                                    Assigned to {milestone.assignee}
                                  </span>
                                </div>
                                
                                {milestone.dependencies.length > 0 && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <GitBranch className="h-3 w-3" />
                                    Depends on {milestone.dependencies.length} milestone{milestone.dependencies.length > 1 && 's'}
                                  </div>
                                )}
                              </div>

                              {/* Expanded Details */}
                              {isExpanded && (
                                <div className="mt-4 pt-4 border-t space-y-3">
                                  <div>
                                    <p className="text-sm font-medium mb-1">Description</p>
                                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                                  </div>
                                  
                                  {milestone.dependencies.length > 0 && (
                                    <div>
                                      <p className="text-sm font-medium mb-1">Dependencies</p>
                                      <div className="flex gap-2">
                                        {milestone.dependencies.map(depId => {
                                          const dep = enhancedMilestones.find(m => m.id === depId);
                                          return dep ? (
                                            <Badge key={depId} variant="outline">
                                              {dep.name}
                                            </Badge>
                                          ) : null;
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="flex gap-2">
                                    <Button size="sm" className="flex-1">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Tasks
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                      <Users className="h-4 w-4 mr-2" />
                                      Team Details
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Documents
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {viewMode === 'gantt' && <GanttView />}
      {viewMode === 'calendar' && <CalendarView />}
      
      {viewMode === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle>Milestone List View</CardTitle>
            <CardDescription>Detailed table view of all project milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMilestones.filter(t => t.type !== 'task').map((milestone) => (
                  <TableRow key={milestone.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {milestone.criticalPath && (
                          <Badge variant="destructive" className="text-xs">CP</Badge>
                        )}
                        <span className="font-medium">{milestone.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(milestone.startDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(new Date(milestone.endDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      {differenceInDays(new Date(milestone.endDate), new Date(milestone.startDate))} days
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={milestone.progress} className="w-20" />
                        <span className="text-sm">{milestone.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{milestone.completedTasks}/{milestone.tasks}</TableCell>
                    <TableCell>${(milestone.budget / 1000000).toFixed(1)}M</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className={cn(getAvatarColor(milestone.id + milestone.assignee), 'text-white font-bold text-xs')}>
                            {milestone.assignee.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{milestone.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        milestone.status === 'completed' ? 'success' :
                        milestone.status === 'in-progress' ? 'default' :
                        'secondary'
                      }>
                        {milestone.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(milestone.risk)}>
                        {milestone.risk}
                      </Badge>
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
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            Manage Team
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
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
      )}

      {/* Edit Milestone Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Milestone</DialogTitle>
            <DialogDescription>
              Update milestone details, dates, and assignments
            </DialogDescription>
          </DialogHeader>
          {editingMilestone && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Milestone Name</Label>
                  <Input 
                    id="name" 
                    value={editingMilestone.name} 
                    onChange={(e) => setEditingMilestone({...editingMilestone, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={editingMilestone.status} 
                    onValueChange={(value) => setEditingMilestone({...editingMilestone, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {format(new Date(editingMilestone.startDate), 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(editingMilestone.startDate)}
                        onSelect={(date) => date && setEditingMilestone({
                          ...editingMilestone, 
                          startDate: format(date, 'yyyy-MM-dd')
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {format(new Date(editingMilestone.endDate), 'PPP')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(editingMilestone.endDate)}
                        onSelect={(date) => date && setEditingMilestone({
                          ...editingMilestone, 
                          endDate: format(date, 'yyyy-MM-dd')
                        })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input 
                    id="assignee" 
                    value={editingMilestone.assignee} 
                    onChange={(e) => setEditingMilestone({...editingMilestone, assignee: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="progress" 
                      type="number" 
                      min="0" 
                      max="100"
                      value={editingMilestone.progress} 
                      onChange={(e) => setEditingMilestone({...editingMilestone, progress: parseInt(e.target.value)})}
                      className="flex-1"
                    />
                    <Progress value={editingMilestone.progress} className="w-20" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input 
                    id="budget" 
                    type="number"
                    value={editingMilestone.budget} 
                    onChange={(e) => setEditingMilestone({...editingMilestone, budget: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="risk">Risk Level</Label>
                  <Select 
                    value={editingMilestone.risk} 
                    onValueChange={(value) => setEditingMilestone({...editingMilestone, risk: value})}
                  >
                    <SelectTrigger id="risk">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  rows={3}
                  value={editingMilestone.description} 
                  onChange={(e) => setEditingMilestone({...editingMilestone, description: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="criticalPath"
                  checked={editingMilestone.criticalPath}
                  onCheckedChange={(checked) => setEditingMilestone({...editingMilestone, criticalPath: checked})}
                />
                <Label htmlFor="criticalPath" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  This milestone is on the critical path
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Here you would normally save to backend
              console.log('Saving milestone:', editingMilestone);
              setShowEditDialog(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
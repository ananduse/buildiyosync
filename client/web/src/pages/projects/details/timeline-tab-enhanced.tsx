import { useState, useMemo } from 'react';
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, isAfter } from 'date-fns';
import {
  Calendar,
  Clock,
  Target,
  Briefcase,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
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
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(project.timeline.startDate),
    to: new Date(project.timeline.endDate)
  });
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'day' | 'week' | 'month' | 'quarter'>('month');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');
  const [showCriticalPath, setShowCriticalPath] = useState(true);

  // Enhanced milestones with dependencies and resources
  const enhancedMilestones = [
    {
      id: 1,
      name: 'Site Preparation',
      status: 'completed',
      startDate: '2024-01-20',
      endDate: '2024-02-15',
      actualEndDate: '2024-02-10',
      progress: 100,
      assignee: 'Mike Chen',
      budget: 5000000,
      dependencies: [],
      tasks: 15,
      completedTasks: 15,
      criticalPath: true,
      risk: 'low',
      description: 'Site clearing, grading, and preparation for construction'
    },
    {
      id: 2,
      name: 'Foundation Complete',
      status: 'completed',
      startDate: '2024-02-16',
      endDate: '2024-04-30',
      actualEndDate: '2024-05-05',
      progress: 100,
      assignee: 'Sarah Johnson',
      budget: 15000000,
      dependencies: [1],
      tasks: 28,
      completedTasks: 28,
      criticalPath: true,
      risk: 'low',
      description: 'Foundation excavation, concrete pouring, and waterproofing'
    },
    {
      id: 3,
      name: 'Structural Frame 50%',
      status: 'in-progress',
      startDate: '2024-05-06',
      endDate: '2024-08-15',
      progress: 75,
      assignee: 'Emily Davis',
      budget: 25000000,
      dependencies: [2],
      tasks: 45,
      completedTasks: 34,
      criticalPath: true,
      risk: 'medium',
      description: 'Steel frame erection and concrete structure'
    },
    {
      id: 4,
      name: 'Structural Frame Complete',
      status: 'pending',
      startDate: '2024-08-16',
      endDate: '2024-11-30',
      progress: 0,
      assignee: 'Emily Davis',
      budget: 20000000,
      dependencies: [3],
      tasks: 40,
      completedTasks: 0,
      criticalPath: true,
      risk: 'medium',
      description: 'Complete structural frame and roof installation'
    },
    {
      id: 5,
      name: 'MEP Installation',
      status: 'pending',
      startDate: '2024-12-01',
      endDate: '2025-03-15',
      progress: 0,
      assignee: 'Robert Wilson',
      budget: 30000000,
      dependencies: [4],
      tasks: 60,
      completedTasks: 0,
      criticalPath: true,
      risk: 'high',
      description: 'Mechanical, electrical, and plumbing systems installation'
    },
    {
      id: 6,
      name: 'Interior Finishing',
      status: 'pending',
      startDate: '2025-03-16',
      endDate: '2025-07-30',
      progress: 0,
      assignee: 'Lisa Anderson',
      budget: 35000000,
      dependencies: [5],
      tasks: 80,
      completedTasks: 0,
      criticalPath: false,
      risk: 'low',
      description: 'Interior walls, flooring, painting, and fixtures'
    },
    {
      id: 7,
      name: 'Final Inspection',
      status: 'pending',
      startDate: '2025-08-01',
      endDate: '2025-11-15',
      progress: 0,
      assignee: 'John Anderson',
      budget: 2000000,
      dependencies: [6],
      tasks: 20,
      completedTasks: 0,
      criticalPath: true,
      risk: 'low',
      description: 'Quality checks, safety inspections, and certifications'
    },
    {
      id: 8,
      name: 'Project Handover',
      status: 'pending',
      startDate: '2025-11-16',
      endDate: '2025-12-31',
      progress: 0,
      assignee: 'Sarah Johnson',
      budget: 3000000,
      dependencies: [7],
      tasks: 10,
      completedTasks: 0,
      criticalPath: true,
      risk: 'low',
      description: 'Final documentation, training, and handover to client'
    }
  ];

  // Filter milestones based on status
  const filteredMilestones = useMemo(() => {
    if (filterStatus === 'all') return enhancedMilestones;
    return enhancedMilestones.filter(m => m.status === filterStatus);
  }, [filterStatus]);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const totalWeight = filteredMilestones.reduce((sum, m) => sum + m.tasks, 0);
    const completedWeight = filteredMilestones.reduce((sum, m) => sum + m.completedTasks, 0);
    return totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0;
  }, [filteredMilestones]);

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
    completedMilestones: enhancedMilestones.filter(m => m.status === 'completed').length,
    delayedMilestones: enhancedMilestones.filter(m => m.actualEndDate && new Date(m.actualEndDate) > new Date(m.endDate)).length,
    criticalPathMilestones: enhancedMilestones.filter(m => m.criticalPath).length,
    totalBudget: enhancedMilestones.reduce((sum, m) => sum + m.budget, 0),
    spentBudget: enhancedMilestones.filter(m => m.status === 'completed').reduce((sum, m) => sum + m.budget, 0)
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

  // Gantt chart view component
  const GanttView = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const totalMonths = 24; // 2 years

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gantt Chart View</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setZoomLevel('day')}>
                <ZoomIn className="h-4 w-4 mr-1" />
                Day
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel('week')}>
                Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel('month')}>
                Month
              </Button>
              <Button variant="outline" size="sm" onClick={() => setZoomLevel('quarter')}>
                <ZoomOut className="h-4 w-4 mr-1" />
                Quarter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full">
            <div className="min-w-[1200px]">
              {/* Timeline header */}
              <div className="flex border-b">
                <div className="w-64 p-2 font-semibold border-r">Milestone</div>
                <div className="flex flex-1">
                  {Array.from({ length: totalMonths }).map((_, i) => (
                    <div key={i} className="flex-1 min-w-[50px] p-2 text-xs text-center border-r">
                      {months[i % 12]} {Math.floor(i / 12) + 2024}
                    </div>
                  ))}
                </div>
              </div>

              {/* Gantt rows */}
              {enhancedMilestones.map((milestone) => {
                const startMonth = differenceInDays(new Date(milestone.startDate), new Date('2024-01-01')) / 30;
                const duration = differenceInDays(new Date(milestone.endDate), new Date(milestone.startDate)) / 30;
                
                return (
                  <div key={milestone.id} className="flex border-b hover:bg-muted/50">
                    <div className="w-64 p-3 border-r">
                      <div className="flex items-center gap-2">
                        {getMilestoneIcon(milestone.status) === CheckCircle2 && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                        {getMilestoneIcon(milestone.status) === Timer && <Timer className="h-4 w-4 text-blue-600" />}
                        {getMilestoneIcon(milestone.status) === Circle && <Circle className="h-4 w-4 text-gray-400" />}
                        <span className="text-sm font-medium truncate">{milestone.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {milestone.progress}%
                        </Badge>
                        {milestone.criticalPath && (
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="relative flex flex-1">
                      {/* Progress bar */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 h-8 rounded"
                        style={{
                          left: `${(startMonth / totalMonths) * 100}%`,
                          width: `${(duration / totalMonths) * 100}%`,
                          background: milestone.status === 'completed' ? '#10b981' : 
                                     milestone.status === 'in-progress' ? '#3b82f6' : '#e5e7eb'
                        }}
                      >
                        <div 
                          className="h-full bg-opacity-50 rounded flex items-center px-2"
                          style={{
                            width: `${milestone.progress}%`,
                            background: milestone.status === 'completed' ? '#10b981' : 
                                       milestone.status === 'in-progress' ? '#60a5fa' : '#9ca3af'
                          }}
                        >
                          <span className="text-xs text-white font-medium">
                            {milestone.progress > 20 && `${milestone.progress}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
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
    <div className="space-y-6">
      {/* Enhanced Timeline Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
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
                <CalendarComponent
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
              <Calendar className="h-4 w-4 mr-2" />
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
              <Calendar className="h-8 w-8 text-muted-foreground" />
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
                  {filteredMilestones.map((milestone, index) => {
                    const Icon = getMilestoneIcon(milestone.status);
                    const isExpanded = selectedMilestone === milestone.id.toString();
                    
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
                                    <AvatarFallback className="text-xs">
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
                {filteredMilestones.map((milestone) => (
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
                          <AvatarFallback className="text-xs">
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
    </div>
  );
}
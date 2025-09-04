import { useState, useMemo } from 'react';
import { format, differenceInDays, addDays, isToday, isTomorrow, isPast } from 'date-fns';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Target,
  Activity,
  AlertTriangle,
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileText,
  Package,
  Truck,
  HardHat,
  BarChart3,
  PieChart,
  ChevronRight,
  Info,
  CircleDollarSign,
  Timer,
  Flag,
  Layers,
  GitBranch,
  Hash,
  Briefcase,
  Award,
  Shield,
  PlayCircle,
  PauseCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Plus,
  ListTodo,
  CheckSquare,
  Square,
  XCircle,
  UserPlus,
  Star,
  Zap,
  Wrench,
  PaintBucket,
  Hammer,
  Droplets,
  Flame,
  Wind,
  Bolt,
  Home,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Share2,
  Settings,
  Filter,
  Search,
  Bell,
  MessageSquare,
  ThumbsUp,
  Heart,
  Bookmark,
  Link2,
  Copy,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Gauge,
  Cpu,
  Database,
  Server,
  Lightbulb,
  Box,
  Package2,
  ShoppingCart,
  CreditCard,
  Receipt,
  Calculator,
  Percent,
  TrendingUpIcon,
  CalendarDays,
  CalendarClock,
  ClipboardList,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ProjectOverviewProps {
  project: any;
}

export default function StunningProjectOverview({ project }: ProjectOverviewProps) {
  const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const scheduleVariance = differenceInDays(new Date(project.timeline.estimatedEndDate), new Date(project.timeline.endDate));
    const budgetUtilization = (project.budget.spent / project.budget.total) * 100;
    const taskCompletionRate = (project.tasks.completed / project.tasks.total) * 100;
    const daysRemaining = differenceInDays(new Date(project.timeline.endDate), new Date());
    const costPerDay = project.budget.spent / project.timeline.daysElapsed;
    const projectedCost = costPerDay * project.timeline.duration;
    const costVariance = project.budget.total - projectedCost;

    return {
      scheduleVariance,
      budgetUtilization,
      taskCompletionRate,
      daysRemaining,
      costPerDay,
      projectedCost,
      costVariance,
      efficiency: project.performance.efficiency,
      qualityScore: project.performance.qualityIndex,
      safetyScore: project.performance.safetyIndex,
    };
  }, [project]);

  // Sample upcoming tasks
  const upcomingTasks = [
    { id: 1, title: 'Complete foundation inspection', priority: 'high', status: 'in-progress', dueDate: new Date(), assignee: 'John Doe', completion: 75 },
    { id: 2, title: 'Install electrical wiring - Floor 3', priority: 'medium', status: 'pending', dueDate: addDays(new Date(), 1), assignee: 'Mike Wilson', completion: 0 },
    { id: 3, title: 'Plumbing installation - North Wing', priority: 'high', status: 'in-progress', dueDate: addDays(new Date(), 2), assignee: 'Sarah Chen', completion: 45 },
    { id: 4, title: 'Safety audit preparation', priority: 'critical', status: 'pending', dueDate: addDays(new Date(), 3), assignee: 'Tom Brown', completion: 0 },
    { id: 5, title: 'Material procurement for Phase 3', priority: 'medium', status: 'pending', dueDate: addDays(new Date(), 5), assignee: 'Lisa Park', completion: 0 },
  ];

  // Sample todos
  const todos = [
    { id: 1, text: 'Review and approve structural drawings', completed: false, priority: 'high' },
    { id: 2, text: 'Schedule meeting with contractors', completed: true, priority: 'medium' },
    { id: 3, text: 'Submit safety compliance report', completed: false, priority: 'critical' },
    { id: 4, text: 'Order materials for next phase', completed: false, priority: 'high' },
    { id: 5, text: 'Update project timeline', completed: true, priority: 'low' },
  ];

  // Material requirements
  const materialRequirements = [
    { id: 1, name: 'Cement', required: 500, unit: 'tons', received: 350, pending: 150, status: 'partial', icon: Package },
    { id: 2, name: 'Steel Bars', required: 200, unit: 'tons', received: 200, pending: 0, status: 'complete', icon: Layers },
    { id: 3, name: 'Bricks', required: 50000, unit: 'pcs', received: 30000, pending: 20000, status: 'partial', icon: Box },
    { id: 4, name: 'Sand', required: 300, unit: 'tons', received: 100, pending: 200, status: 'ordered', icon: Package2 },
    { id: 5, name: 'Electrical Cables', required: 5000, unit: 'meters', received: 0, pending: 5000, status: 'pending', icon: Zap },
  ];

  // Current team members
  const currentTeam = [
    { id: 1, name: 'Rajesh Kumar', role: 'Project Manager', avatar: '', status: 'online', rating: 4.8 },
    { id: 2, name: 'Sarah Wilson', role: 'Site Engineer', avatar: '', status: 'online', rating: 4.6 },
    { id: 3, name: 'Mike Chen', role: 'Safety Officer', avatar: '', status: 'busy', rating: 4.9 },
    { id: 4, name: 'Priya Sharma', role: 'Quality Inspector', avatar: '', status: 'online', rating: 4.7 },
    { id: 5, name: 'Tom Anderson', role: 'Supervisor', avatar: '', status: 'offline', rating: 4.5 },
  ];

  // Milestone progress data
  const milestoneProgress = [
    { name: 'Foundation', completed: 100, total: 100, status: 'completed', color: '#10b981' },
    { name: 'Structure', completed: 75, total: 100, status: 'in-progress', color: '#3b82f6' },
    { name: 'MEP', completed: 30, total: 100, status: 'in-progress', color: '#f59e0b' },
    { name: 'Finishing', completed: 5, total: 100, status: 'pending', color: '#94a3b8' },
  ];

  // Budget breakdown with visual data
  const budgetData = [
    { name: 'Allocated', value: project.budget.total, color: '#e2e8f0' },
    { name: 'Spent', value: project.budget.spent, color: '#3b82f6' },
    { name: 'Committed', value: project.budget.committed || project.budget.total * 0.2, color: '#10b981' },
    { name: 'Remaining', value: project.budget.total - project.budget.spent - (project.budget.committed || project.budget.total * 0.2), color: '#f59e0b' },
  ];

  // Progress chart data
  const progressTrend = [
    { week: 'W1', progress: 12 },
    { week: 'W2', progress: 28 },
    { week: 'W3', progress: 42 },
    { week: 'W4', progress: 58 },
    { week: 'W5', progress: 71 },
    { week: 'Current', progress: project.timeline.progress },
  ];

  // Helper functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Circle className="h-4 w-4 text-gray-400" />;
      case 'blocked': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getMaterialStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-700';
      case 'partial': return 'bg-yellow-100 text-yellow-700';
      case 'ordered': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTeamStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Overall Progress */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10" />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{project.timeline.progress}%</span>
              <span className="flex items-center text-sm font-medium text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5%
              </span>
            </div>
            <Progress value={project.timeline.progress} className="mt-3 h-2" />
            <p className="text-xs text-gray-500 mt-2">{metrics.daysRemaining} days remaining</p>
          </CardContent>
        </Card>

        {/* Budget Status */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10" />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Budget Status</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">₹{(project.budget.spent / 10000000).toFixed(1)}Cr</span>
              <span className="text-sm text-gray-500">/ {(project.budget.total / 10000000).toFixed(1)}Cr</span>
            </div>
            <Progress value={metrics.budgetUtilization} className="mt-3 h-2" />
            <p className="text-xs text-gray-500 mt-2">₹{(metrics.costPerDay / 100000).toFixed(1)}L daily burn</p>
          </CardContent>
        </Card>

        {/* Tasks Status */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-600/10" />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Tasks Status</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{project.tasks.completed}</span>
              <span className="text-sm text-gray-500">/ {project.tasks.total}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">{project.tasks.inProgress} Active</Badge>
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">{project.tasks.overdue} Overdue</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-600/10" />
          <CardHeader className="relative pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Team Performance</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">89%</span>
              <span className="text-sm text-gray-500">efficiency</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex -space-x-2">
                {currentTeam.slice(0, 3).map((member, i) => (
                  <Avatar key={i} className="h-7 w-7 border-2 border-white">
                    <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="h-7 w-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">+{currentTeam.length - 3}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{project.team.totalMembers} members</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Tasks & Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
                <CardDescription>Next 5 priority tasks</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="group relative bg-white border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                            <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {task.assignee}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {isToday(task.dueDate) ? 'Today' : isTomorrow(task.dueDate) ? 'Tomorrow' : format(task.dueDate, 'MMM dd')}
                            </div>
                          </div>
                          {task.status === 'in-progress' && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-medium">{task.completion}%</span>
                              </div>
                              <Progress value={task.completion} className="h-1.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="h-3 w-3 mr-2" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="h-3 w-3 mr-2" /> Edit Task</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600"><Trash2 className="h-3 w-3 mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Today's Checklist</CardTitle>
              <Badge variant="secondary">{todos.filter(t => !t.completed).length} pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[380px] pr-4">
              <div className="space-y-3">
                {todos.map((todo) => (
                  <div key={todo.id} className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border transition-all",
                    todo.completed ? "bg-gray-50 opacity-60" : "bg-white hover:shadow-sm"
                  )}>
                    <Checkbox 
                      checked={todo.completed}
                      className="mt-0.5"
                      onCheckedChange={() => {}}
                    />
                    <div className="flex-1">
                      <p className={cn(
                        "text-sm",
                        todo.completed ? "line-through text-gray-500" : "text-gray-900"
                      )}>{todo.text}</p>
                      <Badge variant="outline" className={cn("text-xs mt-1", getPriorityColor(todo.priority))}>
                        {todo.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Milestone Progress & Budget */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Milestone Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Milestone Progress</CardTitle>
            <CardDescription>Major project phases completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestoneProgress.map((milestone, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {milestone.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="font-medium text-gray-900">{milestone.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{milestone.completed}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={milestone.completed} className="h-3" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white mix-blend-difference">
                        {milestone.completed}/{milestone.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Overall Completion</span>
              <span className="font-bold text-lg text-gray-900">{project.timeline.progress}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Budget Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Budget Overview</CardTitle>
            <CardDescription>Financial allocation and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: any) => `₹${(value / 10000000).toFixed(2)} Cr`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {budgetData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                  <div>
                    <p className="text-xs text-gray-500">{item.name}</p>
                    <p className="text-sm font-medium text-gray-900">₹{(item.value / 10000000).toFixed(1)}Cr</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Material Requirements & Current Team */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Material Requirements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Material Requirements</CardTitle>
              <Button size="sm" variant="outline">
                <Truck className="h-4 w-4 mr-1" />
                Track Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {materialRequirements.map((material) => {
                const Icon = material.icon;
                const percentReceived = (material.received / material.required) * 100;
                return (
                  <div key={material.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{material.name}</p>
                          <p className="text-xs text-gray-500">
                            {material.received}/{material.required} {material.unit}
                          </p>
                        </div>
                      </div>
                      <Badge className={cn("text-xs", getMaterialStatusColor(material.status))}>
                        {material.status}
                      </Badge>
                    </div>
                    <Progress value={percentReceived} className="h-2" />
                    {material.pending > 0 && (
                      <p className="text-xs text-orange-600 mt-1">
                        {material.pending} {material.unit} pending delivery
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Team */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Current Team</CardTitle>
              <Button size="sm" variant="outline">
                <UserPlus className="h-4 w-4 mr-1" />
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentTeam.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                        getTeamStatusColor(member.status)
                      )} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn(
                          "h-3 w-3",
                          i < Math.floor(member.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        )} />
                      ))}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Phone className="h-3 w-3 mr-2" /> Call</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="h-3 w-3 mr-2" /> Email</DropdownMenuItem>
                        <DropdownMenuItem><MessageSquare className="h-3 w-3 mr-2" /> Message</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Weekly Progress Trend</CardTitle>
          <CardDescription>Project completion rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={progressTrend}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <RechartsTooltip />
              <Area type="monotone" dataKey="progress" stroke="#3b82f6" fillOpacity={1} fill="url(#progressGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
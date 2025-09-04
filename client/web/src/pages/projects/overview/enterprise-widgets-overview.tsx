import { useState, useMemo } from 'react';
import { format, differenceInDays, addDays, isToday, isTomorrow, isPast, startOfWeek, endOfWeek } from 'date-fns';
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
  CalendarDays,
  CalendarClock,
  ClipboardList,
  UserCheck,
  UserX,
  Ban,
  IndianRupee,
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Construction,
  Factory,
  Drill,
  Pickaxe,
  PersonStanding,
  ShieldCheck,
  ShieldAlert,
  FileBarChart,
  FileSpreadsheet,
  TrendingUpIcon,
  TrendingDownIcon,
  Sparkles,
  ArrowUp,
  ArrowDown,
  MinusCircle,
  PlusCircle,
  AlertOctagon,
  CheckCircle,
  XOctagon,
  HelpCircle,
  InfoIcon,
  Loader2,
  RotateCw,
  ClipboardCopy,
  FolderOpen,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  ComposedChart,
  Scatter,
} from 'recharts';

interface ProjectOverviewProps {
  project: any;
}

export default function EnterpriseWidgetsOverview({ project }: ProjectOverviewProps) {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

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

  // Widget 1: Tasks and Progress
  const TasksProgressWidget = () => {
    const taskData = [
      { category: 'Foundation', completed: 45, total: 50, percentage: 90, trend: 'up' },
      { category: 'Structure', completed: 32, total: 40, percentage: 80, trend: 'up' },
      { category: 'Electrical', completed: 18, total: 30, percentage: 60, trend: 'stable' },
      { category: 'Plumbing', completed: 12, total: 25, percentage: 48, trend: 'down' },
      { category: 'Finishing', completed: 5, total: 35, percentage: 14, trend: 'stable' },
    ];

    const weeklyTaskProgress = [
      { day: 'Mon', completed: 12, pending: 8 },
      { day: 'Tue', completed: 15, pending: 6 },
      { day: 'Wed', completed: 18, pending: 7 },
      { day: 'Thu', completed: 14, pending: 9 },
      { day: 'Fri', completed: 20, pending: 5 },
      { day: 'Sat', completed: 16, pending: 6 },
      { day: 'Sun', completed: 8, pending: 4 },
    ];

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClipboardCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Tasks & Progress</CardTitle>
                <CardDescription className="text-xs">{project.tasks.completed} of {project.tasks.total} completed</CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View All Tasks</DropdownMenuItem>
                <DropdownMenuItem>Export Report</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Progress */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-2xl font-bold text-blue-600">{Math.round(metrics.taskCompletionRate)}%</span>
              </div>
              <Progress value={metrics.taskCompletionRate} className="h-3" />
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>{project.tasks.completed} Completed</span>
                <span>{project.tasks.inProgress} In Progress</span>
                <span>{project.tasks.pending} Pending</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-2">
              {taskData.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      task.percentage >= 80 ? "bg-green-500" :
                      task.percentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                    )} />
                    <span className="text-sm font-medium text-gray-700">{task.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{task.completed}/{task.total}</p>
                      <Progress value={task.percentage} className="h-1 w-20" />
                    </div>
                    {task.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : task.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Chart */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Weekly Progress</p>
              <ResponsiveContainer width="100%" height={120}>
                <RechartsBarChart data={weeklyTaskProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <RechartsTooltip />
                  <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Widget 2: Milestone Progress
  const MilestoneProgressWidget = () => {
    const milestones = [
      { id: 1, name: 'Site Preparation', status: 'completed', progress: 100, startDate: '2024-01-15', endDate: '2024-02-15', daysLeft: 0 },
      { id: 2, name: 'Foundation', status: 'completed', progress: 100, startDate: '2024-02-16', endDate: '2024-04-30', daysLeft: 0 },
      { id: 3, name: 'Structure', status: 'in-progress', progress: 65, startDate: '2024-05-01', endDate: '2024-08-31', daysLeft: 45 },
      { id: 4, name: 'MEP Installation', status: 'upcoming', progress: 0, startDate: '2024-09-01', endDate: '2024-11-30', daysLeft: 120 },
      { id: 5, name: 'Finishing', status: 'upcoming', progress: 0, startDate: '2024-12-01', endDate: '2025-03-31', daysLeft: 210 },
    ];

    const milestoneRadialData = [
      { name: 'Progress', value: project.timeline.progress, fill: '#3b82f6' }
    ];

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Flag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Milestone Progress</CardTitle>
                <CardDescription className="text-xs">5 major milestones</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {milestones.filter(m => m.status === 'completed').length}/5 Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Radial Progress */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={140} height={140}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={milestoneRadialData}>
                  <RadialBar dataKey="value" cornerRadius={10} fill="#3b82f6" />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <p className="text-2xl font-bold text-gray-900">{project.timeline.progress}%</p>
                <p className="text-xs text-gray-500">Overall</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600 font-medium">Completed</p>
                <p className="text-xl font-bold text-green-700">{milestones.filter(m => m.status === 'completed').length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">In Progress</p>
                <p className="text-xl font-bold text-blue-700">{milestones.filter(m => m.status === 'in-progress').length}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600 font-medium">Upcoming</p>
                <p className="text-xl font-bold text-gray-700">{milestones.filter(m => m.status === 'upcoming').length}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Timeline */}
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm",
                    milestone.status === 'completed' ? "bg-green-500" :
                    milestone.status === 'in-progress' ? "bg-blue-500" : "bg-gray-300"
                  )}>
                    {milestone.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                      {milestone.status === 'in-progress' && (
                        <span className="text-xs text-blue-600 font-medium">{milestone.daysLeft} days left</span>
                      )}
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(milestone.startDate), 'MMM dd')} - {format(new Date(milestone.endDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                {index < milestones.length - 1 && (
                  <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Widget 3: Budget and Progress
  const BudgetProgressWidget = () => {
    const budgetCategories = [
      { category: 'Labor', allocated: 5000000, spent: 3500000, percentage: 70, icon: Users },
      { category: 'Materials', allocated: 4000000, spent: 3200000, percentage: 80, icon: Package },
      { category: 'Equipment', allocated: 2000000, spent: 1500000, percentage: 75, icon: Drill },
      { category: 'Subcontractors', allocated: 1500000, spent: 800000, percentage: 53, icon: HardHat },
    ];

    const monthlySpending = [
      { month: 'Jan', budget: 1.2, actual: 1.1 },
      { month: 'Feb', budget: 1.5, actual: 1.4 },
      { month: 'Mar', budget: 1.8, actual: 1.9 },
      { month: 'Apr', budget: 2.0, actual: 2.1 },
      { month: 'May', budget: 2.2, actual: 2.0 },
      { month: 'Jun', budget: 2.5, actual: 2.3 },
    ];

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <IndianRupee className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Budget & Progress</CardTitle>
                <CardDescription className="text-xs">₹{(project.budget.spent / 10000000).toFixed(1)}Cr of ₹{(project.budget.total / 10000000).toFixed(1)}Cr</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={metrics.costVariance >= 0 ? "default" : "destructive"} className="text-xs">
                {metrics.costVariance >= 0 ? 'Under Budget' : 'Over Budget'}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Budget Overview */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 font-medium">Allocated</p>
              <p className="text-lg font-bold text-blue-700">₹{(project.budget.total / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 font-medium">Spent</p>
              <p className="text-lg font-bold text-green-700">₹{(project.budget.spent / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-600 font-medium">Remaining</p>
              <p className="text-lg font-bold text-orange-700">₹{((project.budget.total - project.budget.spent) / 10000000).toFixed(1)}Cr</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3 mb-4">
            {budgetCategories.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.percentage} className="h-2 w-24" />
                    <span className="text-xs text-gray-600 w-10 text-right">{item.percentage}%</span>
                    <span className="text-xs font-medium text-gray-900">₹{(item.spent / 100000).toFixed(0)}L</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Trend */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Monthly Spending (in Cr)</p>
            <ResponsiveContainer width="100%" height={120}>
              <ComposedChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" fill="#3b82f6" fillOpacity={0.1} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Widget 4: Todo and Pending
  const TodoPendingWidget = () => {
    const todos = [
      { id: 1, text: 'Review structural drawings', priority: 'high', dueToday: true },
      { id: 2, text: 'Approve material purchase order', priority: 'critical', dueToday: true },
      { id: 3, text: 'Safety inspection report', priority: 'high', dueToday: false },
      { id: 4, text: 'Weekly progress meeting', priority: 'medium', dueToday: true },
      { id: 5, text: 'Update project timeline', priority: 'low', dueToday: false },
    ];

    const pendingItems = [
      { type: 'Approvals', count: 8, urgent: 3, icon: CheckSquare, color: 'text-blue-600' },
      { type: 'Documents', count: 12, urgent: 5, icon: FileText, color: 'text-purple-600' },
      { type: 'Inspections', count: 4, urgent: 2, icon: ClipboardCheck, color: 'text-orange-600' },
      { type: 'Payments', count: 6, urgent: 4, icon: CreditCard, color: 'text-green-600' },
    ];

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ListTodo className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Todo & Pending</CardTitle>
                <CardDescription className="text-xs">Today's priorities</CardDescription>
              </div>
            </div>
            <Badge variant="destructive" className="text-xs">
              {todos.filter(t => t.dueToday).length} Due Today
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-9">
              <TabsTrigger value="todo" className="text-xs">Todo List</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs">Pending Items</TabsTrigger>
            </TabsList>

            <TabsContent value="todo" className="mt-3 space-y-2">
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Checkbox className="mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{todo.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        todo.priority === 'critical' ? "border-red-500 text-red-600" :
                        todo.priority === 'high' ? "border-orange-500 text-orange-600" :
                        todo.priority === 'medium' ? "border-yellow-500 text-yellow-600" :
                        "border-green-500 text-green-600"
                      )}>
                        {todo.priority}
                      </Badge>
                      {todo.dueToday && (
                        <Badge variant="destructive" className="text-xs">Today</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Plus className="h-3 w-3 mr-1" />
                Add Todo
              </Button>
            </TabsContent>

            <TabsContent value="pending" className="mt-3 space-y-3">
              {pendingItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-5 w-5", item.color)} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.type}</p>
                        <p className="text-xs text-gray-500">{item.count} total items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.urgent > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {item.urgent} Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>Total Pending</span>
                  <span className="font-bold text-gray-900">{pendingItems.reduce((sum, item) => sum + item.count, 0)}</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  // Widget 5: Materials Request
  const MaterialsRequestWidget = () => {
    const requests = [
      { id: 1, material: 'Cement - 100 bags', status: 'approved', priority: 'high', requestedBy: 'Site Manager', date: '2024-11-25' },
      { id: 2, material: 'Steel bars - 5 tons', status: 'pending', priority: 'critical', requestedBy: 'Engineer', date: '2024-11-24' },
      { id: 3, material: 'Bricks - 10,000 pcs', status: 'ordered', priority: 'medium', requestedBy: 'Contractor', date: '2024-11-23' },
      { id: 4, material: 'Sand - 20 tons', status: 'delivered', priority: 'low', requestedBy: 'Supervisor', date: '2024-11-22' },
    ];

    const materialStock = [
      { name: 'Cement', current: 150, required: 500, unit: 'bags', status: 'low' },
      { name: 'Steel', current: 8, required: 15, unit: 'tons', status: 'moderate' },
      { name: 'Bricks', current: 25000, required: 30000, unit: 'pcs', status: 'good' },
      { name: 'Sand', current: 5, required: 50, unit: 'tons', status: 'critical' },
    ];

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'approved': return 'bg-green-100 text-green-700';
        case 'pending': return 'bg-yellow-100 text-yellow-700';
        case 'ordered': return 'bg-blue-100 text-blue-700';
        case 'delivered': return 'bg-gray-100 text-gray-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };

    const getStockStatusColor = (status: string) => {
      switch (status) {
        case 'good': return 'text-green-600';
        case 'moderate': return 'text-yellow-600';
        case 'low': return 'text-orange-600';
        case 'critical': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Package className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Materials Request</CardTitle>
                <CardDescription className="text-xs">Procurement & Inventory</CardDescription>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Plus className="h-3 w-3 mr-1" />
              Request
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-9">
              <TabsTrigger value="requests" className="text-xs">Recent Requests</TabsTrigger>
              <TabsTrigger value="stock" className="text-xs">Stock Level</TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="mt-3">
              <ScrollArea className="h-[280px]">
                <div className="space-y-2">
                  {requests.map((request) => (
                    <div key={request.id} className="p-3 border rounded-lg hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.material}</p>
                          <p className="text-xs text-gray-500">by {request.requestedBy}</p>
                        </div>
                        <Badge className={cn("text-xs", getStatusColor(request.status))}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          request.priority === 'critical' ? "border-red-500 text-red-600" :
                          request.priority === 'high' ? "border-orange-500 text-orange-600" :
                          request.priority === 'medium' ? "border-yellow-500 text-yellow-600" :
                          "border-green-500 text-green-600"
                        )}>
                          {request.priority} priority
                        </Badge>
                        <span className="text-xs text-gray-500">{request.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="stock" className="mt-3">
              <div className="space-y-3">
                {materialStock.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.current} / {item.required} {item.unit}
                        </p>
                      </div>
                      <span className={cn("text-xs font-medium", getStockStatusColor(item.status))}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <Progress value={(item.current / item.required) * 100} className="h-2" />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-3 w-3 mr-1" />
                  View Full Inventory
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  // Widget 6: Team Management
  const TeamManagementWidget = () => {
    const teamStats = {
      total: 145,
      present: 132,
      absent: 8,
      onLeave: 5,
      efficiency: 89,
    };

    const departments = [
      { name: 'Engineering', count: 35, present: 32, icon: Cpu },
      { name: 'Construction', count: 65, present: 60, icon: Construction },
      { name: 'Safety', count: 12, present: 11, icon: ShieldCheck },
      { name: 'Quality', count: 8, present: 8, icon: Award },
      { name: 'Admin', count: 10, present: 9, icon: Briefcase },
    ];

    const topPerformers = [
      { name: 'Rajesh Kumar', role: 'Site Engineer', rating: 4.9, tasks: 45 },
      { name: 'Priya Sharma', role: 'QA Lead', rating: 4.8, tasks: 38 },
      { name: 'Mike Wilson', role: 'Supervisor', rating: 4.7, tasks: 42 },
    ];

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Team Management</CardTitle>
                <CardDescription className="text-xs">{teamStats.total} Total Members</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-xs bg-green-600">
                {teamStats.present} Present
              </Badge>
              <Badge variant="destructive" className="text-xs">
                {teamStats.absent} Absent
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Attendance Overview */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <UserCheck className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-700">{teamStats.present}</p>
              <p className="text-xs text-blue-600">Present</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <UserX className="h-4 w-4 text-red-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-red-700">{teamStats.absent}</p>
              <p className="text-xs text-red-600">Absent</p>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-yellow-700">{teamStats.onLeave}</p>
              <p className="text-xs text-yellow-600">Leave</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-700">{teamStats.efficiency}%</p>
              <p className="text-xs text-green-600">Efficiency</p>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="space-y-2 mb-4">
            <p className="text-xs font-medium text-gray-600">Department Distribution</p>
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{dept.present}/{dept.count}</span>
                    <Progress value={(dept.present / dept.count) * 100} className="h-1.5 w-16" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Performers */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Top Performers</p>
            <div className="space-y-2">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {performer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-500">{performer.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn(
                          "h-3 w-3",
                          i < Math.floor(performer.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        )} />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {performer.tasks} tasks
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Widget 7: Labour Reports
  const LabourReportsWidget = () => {
    const labourData = {
      totalHours: 1250,
      overtimeHours: 180,
      productivity: 92,
      safetyIncidents: 0,
    };

    const weeklyLabour = [
      { day: 'Mon', regular: 180, overtime: 20 },
      { day: 'Tue', regular: 185, overtime: 15 },
      { day: 'Wed', regular: 175, overtime: 25 },
      { day: 'Thu', regular: 190, overtime: 10 },
      { day: 'Fri', regular: 195, overtime: 30 },
      { day: 'Sat', regular: 150, overtime: 40 },
      { day: 'Sun', regular: 80, overtime: 10 },
    ];

    const costBreakdown = [
      { category: 'Regular Wages', amount: 850000, percentage: 70 },
      { category: 'Overtime', amount: 180000, percentage: 15 },
      { category: 'Benefits', amount: 120000, percentage: 10 },
      { category: 'Insurance', amount: 60000, percentage: 5 },
    ];

    return (
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-transparent rounded-bl-full" />
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-100 rounded-lg">
                <FileBarChart className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Labour Reports</CardTitle>
                <CardDescription className="text-xs">Workforce Analytics</CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Weekly Report</DropdownMenuItem>
                <DropdownMenuItem>Monthly Report</DropdownMenuItem>
                <DropdownMenuItem>Custom Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <Clock className="h-4 w-4 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-700">{(labourData.totalHours / 1000).toFixed(1)}K</p>
              <p className="text-xs text-blue-600">Total Hrs</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <Timer className="h-4 w-4 text-orange-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-orange-700">{labourData.overtimeHours}</p>
              <p className="text-xs text-orange-600">Overtime</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-700">{labourData.productivity}%</p>
              <p className="text-xs text-green-600">Productivity</p>
            </div>
            <div className="text-center p-2 bg-emerald-50 rounded-lg">
              <ShieldCheck className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-emerald-700">{labourData.safetyIncidents}</p>
              <p className="text-xs text-emerald-600">Incidents</p>
            </div>
          </div>

          {/* Weekly Hours Chart */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-600 mb-2">Weekly Labour Hours</p>
            <ResponsiveContainer width="100%" height={120}>
              <RechartsBarChart data={weeklyLabour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip />
                <Bar dataKey="regular" fill="#3b82f6" stackId="a" />
                <Bar dataKey="overtime" fill="#f59e0b" stackId="a" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Breakdown */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">Labour Cost Breakdown</p>
            <div className="space-y-2">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={item.percentage} className="h-1.5 w-20" />
                    <span className="text-xs font-medium text-gray-900 w-16 text-right">
                      ₹{(item.amount / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Labour Cost</span>
              <span className="text-lg font-bold text-gray-900">
                ₹{(costBreakdown.reduce((sum, item) => sum + item.amount, 0) / 100000).toFixed(1)}L
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <TasksProgressWidget />
        <MilestoneProgressWidget />
        <BudgetProgressWidget />
        <TodoPendingWidget />
        <MaterialsRequestWidget />
        <TeamManagementWidget />
      </div>

      {/* Full Width Labour Reports */}
      <LabourReportsWidget />
    </div>
  );
}
import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Calendar,
  FileText,
  Package,
  Truck,
  HardHat,
  Ruler,
  Hammer,
  BarChart3,
  PieChart,
  Target,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Loader2,
  Wrench,
  ClipboardCheck,
  Calculator,
  Receipt,
  ShieldCheck,
  MapPin,
  Layers,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Types
interface ProjectKPI {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  alert?: 'success' | 'warning' | 'error';
  drilldownPath?: string;
  suffix?: string;
}

interface ProjectPhase {
  name: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  budget: number;
  spent: number;
  tasks: number;
  completedTasks: number;
}

interface TaskStatus {
  category: string;
  pending: number;
  inProgress: number;
  completed: number;
  delayed: number;
  total: number;
}

interface BudgetCategory {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  variance: number;
  trend: 'up' | 'down' | 'stable';
}

interface ResourceUtilization {
  type: string;
  allocated: number;
  utilized: number;
  available: number;
  efficiency: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProjectIssue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  dateRaised: string;
  assignedTo: string;
  status: 'open' | 'in-progress' | 'resolved';
  impactArea: string;
}

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedProject, setSelectedProject] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - KPIs
  const kpiMetrics: ProjectKPI[] = [
    {
      title: 'Total Projects',
      value: 48,
      change: 12.5,
      trend: 'up',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      drilldownPath: '/projects/list'
    },
    {
      title: 'Active Projects',
      value: 32,
      change: 8.3,
      trend: 'up',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      drilldownPath: '/projects/active'
    },
    {
      title: 'Total Budget',
      value: '₹12.5Cr',
      change: -2.4,
      trend: 'down',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      alert: 'warning',
      drilldownPath: '/projects/budget'
    },
    {
      title: 'Overall Progress',
      value: '68%',
      change: 5.2,
      trend: 'up',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      drilldownPath: '/projects/progress'
    },
    {
      title: 'Resources',
      value: 256,
      change: 15.8,
      trend: 'up',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      suffix: 'Active',
      drilldownPath: '/projects/resources'
    },
    {
      title: 'Pending Tasks',
      value: 147,
      change: -8.6,
      trend: 'down',
      icon: ClipboardCheck,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      alert: 'error',
      drilldownPath: '/projects/tasks'
    }
  ];

  // Project phases data
  const projectPhases: ProjectPhase[] = [
    {
      name: 'Site Survey & Planning',
      progress: 100,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'completed',
      budget: 500000,
      spent: 485000,
      tasks: 25,
      completedTasks: 25
    },
    {
      name: 'Foundation',
      progress: 100,
      startDate: '2024-02-16',
      endDate: '2024-03-30',
      status: 'completed',
      budget: 2500000,
      spent: 2450000,
      tasks: 45,
      completedTasks: 45
    },
    {
      name: 'Structure',
      progress: 75,
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      status: 'in-progress',
      budget: 3500000,
      spent: 2625000,
      tasks: 60,
      completedTasks: 45
    },
    {
      name: 'MEP Works',
      progress: 45,
      startDate: '2024-05-15',
      endDate: '2024-08-15',
      status: 'in-progress',
      budget: 1800000,
      spent: 810000,
      tasks: 40,
      completedTasks: 18
    },
    {
      name: 'Interior & Finishing',
      progress: 15,
      startDate: '2024-07-01',
      endDate: '2024-10-30',
      status: 'in-progress',
      budget: 2200000,
      spent: 330000,
      tasks: 50,
      completedTasks: 8
    },
    {
      name: 'External Works',
      progress: 0,
      startDate: '2024-09-01',
      endDate: '2024-11-15',
      status: 'pending',
      budget: 800000,
      spent: 0,
      tasks: 20,
      completedTasks: 0
    }
  ];

  // Task status data
  const taskStatusData: TaskStatus[] = [
    { category: 'Civil Works', pending: 12, inProgress: 8, completed: 45, delayed: 3, total: 68 },
    { category: 'Electrical', pending: 8, inProgress: 5, completed: 22, delayed: 2, total: 37 },
    { category: 'Plumbing', pending: 6, inProgress: 4, completed: 18, delayed: 1, total: 29 },
    { category: 'Interior', pending: 15, inProgress: 10, completed: 12, delayed: 5, total: 42 },
    { category: 'Documentation', pending: 4, inProgress: 2, completed: 28, delayed: 0, total: 34 }
  ];

  // Budget breakdown
  const budgetBreakdown: BudgetCategory[] = [
    { category: 'Materials', allocated: 4500000, spent: 3200000, remaining: 1300000, variance: -5.2, trend: 'up' },
    { category: 'Labor', allocated: 2800000, spent: 2100000, remaining: 700000, variance: 2.3, trend: 'stable' },
    { category: 'Equipment', allocated: 800000, spent: 650000, remaining: 150000, variance: -8.5, trend: 'up' },
    { category: 'Subcontractors', allocated: 1500000, spent: 1200000, remaining: 300000, variance: 1.2, trend: 'stable' },
    { category: 'Permits & Legal', allocated: 300000, spent: 250000, remaining: 50000, variance: 0, trend: 'stable' },
    { category: 'Contingency', allocated: 600000, spent: 200000, remaining: 400000, variance: 0, trend: 'stable' }
  ];

  // Resource utilization
  const resourceUtilization: ResourceUtilization[] = [
    { type: 'Manpower', allocated: 85, utilized: 72, available: 13, efficiency: 84.7, icon: Users },
    { type: 'Equipment', allocated: 42, utilized: 38, available: 4, efficiency: 90.5, icon: Wrench },
    { type: 'Vehicles', allocated: 15, utilized: 12, available: 3, efficiency: 80.0, icon: Truck },
    { type: 'Materials', allocated: 100, utilized: 68, available: 32, efficiency: 68.0, icon: Package }
  ];

  // Project issues
  const projectIssues: ProjectIssue[] = [
    {
      id: 'ISS001',
      title: 'Material delivery delay - Steel reinforcement',
      severity: 'critical',
      category: 'Supply Chain',
      dateRaised: '2024-03-10',
      assignedTo: 'Procurement Team',
      status: 'in-progress',
      impactArea: 'Structure Phase'
    },
    {
      id: 'ISS002',
      title: 'Weather delays affecting concrete pouring',
      severity: 'high',
      category: 'Environmental',
      dateRaised: '2024-03-12',
      assignedTo: 'Site Supervisor',
      status: 'open',
      impactArea: 'Foundation'
    },
    {
      id: 'ISS003',
      title: 'Skilled labor shortage for MEP works',
      severity: 'medium',
      category: 'Resource',
      dateRaised: '2024-03-08',
      assignedTo: 'HR Team',
      status: 'in-progress',
      impactArea: 'MEP Phase'
    }
  ];

  // Progress chart data
  const progressChartData = [
    { month: 'Jan', planned: 10, actual: 9, cumulative: 9 },
    { month: 'Feb', planned: 20, actual: 18, cumulative: 27 },
    { month: 'Mar', planned: 35, actual: 32, cumulative: 59 },
    { month: 'Apr', planned: 50, actual: 45, cumulative: 104 },
    { month: 'May', planned: 65, actual: 58, cumulative: 162 },
    { month: 'Jun', planned: 75, actual: 68, cumulative: 230 }
  ];

  // Cost variance data
  const costVarianceData = [
    { month: 'Jan', budget: 1000000, actual: 950000 },
    { month: 'Feb', budget: 1500000, actual: 1480000 },
    { month: 'Mar', budget: 2000000, actual: 2100000 },
    { month: 'Apr', budget: 1800000, actual: 1850000 },
    { month: 'May', budget: 1600000, actual: 1550000 },
    { month: 'Jun', budget: 1700000, actual: 1670000 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'delayed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4">

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {kpiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={index} 
              className={cn(
                "cursor-pointer hover:shadow-lg transition-all",
                metric.alert === 'error' && "border-red-200",
                metric.alert === 'warning' && "border-yellow-200"
              )}
              onClick={() => metric.drilldownPath && navigate(metric.drilldownPath)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                  {metric.trend === 'up' ? (
                    <span className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      {Math.abs(metric.change)}%
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-red-600">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      {Math.abs(metric.change)}%
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {metric.title} {metric.suffix && `(${metric.suffix})`}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Phases */}
            <Card>
              <CardHeader>
                <CardTitle>Project Phases</CardTitle>
                <CardDescription>Current status of all project phases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectPhases.map((phase, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{phase.name}</span>
                          <Badge className={getStatusColor(phase.status)}>
                            {phase.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">{phase.progress}%</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{phase.completedTasks}/{phase.tasks} tasks</span>
                        <span>₹{(phase.spent / 100000).toFixed(1)}L / ₹{(phase.budget / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task Status */}
            <Card>
              <CardHeader>
                <CardTitle>Task Status by Category</CardTitle>
                <CardDescription>Overview of tasks across different work categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taskStatusData.map((task, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{task.category}</span>
                        <span className="text-sm text-gray-500">{task.total} tasks</span>
                      </div>
                      <div className="flex gap-1 h-6">
                        <div 
                          className="bg-green-500 rounded-l"
                          style={{ width: `${(task.completed / task.total) * 100}%` }}
                          title={`Completed: ${task.completed}`}
                        />
                        <div 
                          className="bg-blue-500"
                          style={{ width: `${(task.inProgress / task.total) * 100}%` }}
                          title={`In Progress: ${task.inProgress}`}
                        />
                        <div 
                          className="bg-gray-400"
                          style={{ width: `${(task.pending / task.total) * 100}%` }}
                          title={`Pending: ${task.pending}`}
                        />
                        <div 
                          className="bg-red-500 rounded-r"
                          style={{ width: `${(task.delayed / task.total) * 100}%` }}
                          title={`Delayed: ${task.delayed}`}
                        />
                      </div>
                      <div className="flex gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded" />
                          Completed ({task.completed})
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-500 rounded" />
                          In Progress ({task.inProgress})
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-gray-400 rounded" />
                          Pending ({task.pending})
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded" />
                          Delayed ({task.delayed})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Project Progress Trend</CardTitle>
              <CardDescription>Planned vs Actual progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="planned" stroke="#8884d8" name="Planned %" />
                  <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual %" />
                  <Line type="monotone" dataKey="cumulative" stroke="#ffc658" name="Cumulative Tasks" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>Budget distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetBreakdown.map((budget, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{budget.category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            ₹{(budget.spent / 100000).toFixed(1)}L / ₹{(budget.allocated / 100000).toFixed(1)}L
                          </span>
                          {budget.trend === 'up' && <TrendingUp className="h-3 w-3 text-red-500" />}
                          {budget.trend === 'down' && <TrendingDown className="h-3 w-3 text-green-500" />}
                        </div>
                      </div>
                      <Progress value={(budget.spent / budget.allocated) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Spent: {((budget.spent / budget.allocated) * 100).toFixed(1)}%</span>
                        <span>Remaining: ₹{(budget.remaining / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Variance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Variance Analysis</CardTitle>
                <CardDescription>Budget vs Actual spending over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costVarianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `₹${(value / 100000).toFixed(1)}L`} />
                    <Legend />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resourceUtilization.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-gray-400" />
                      <Badge variant={resource.efficiency > 80 ? "default" : "secondary"}>
                        {resource.efficiency}% Efficiency
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{resource.type}</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Allocated</span>
                          <span className="font-medium">{resource.allocated}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Utilized</span>
                          <span className="font-medium">{resource.utilized}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Available</span>
                          <span className="font-medium">{resource.available}</span>
                        </div>
                      </div>
                      <Progress value={resource.efficiency} className="h-2 mt-3" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Issues & Risks</CardTitle>
              <CardDescription>Current project issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectIssues.map((issue) => (
                  <div key={issue.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getSeverityColor(issue.severity)}>
                          {issue.severity}
                        </Badge>
                        <Badge variant="outline">{issue.category}</Badge>
                        <Badge variant="outline">{issue.status}</Badge>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{issue.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>ID: {issue.id}</span>
                        <span>Raised: {issue.dateRaised}</span>
                        <span>Assigned to: {issue.assignedTo}</span>
                        <span>Impact: {issue.impactArea}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign To</DropdownMenuItem>
                        <DropdownMenuItem>Add Comment</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
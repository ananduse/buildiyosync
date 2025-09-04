import { useState, useMemo } from 'react';
import { format, differenceInDays, addDays } from 'date-fns';
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
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

export default function ProfessionalProjectOverview({ project }: ProjectOverviewProps) {
  // Calculate key metrics
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

  // Progress data for chart
  const progressData = [
    { month: 'Jan', planned: 10, actual: 8 },
    { month: 'Feb', planned: 20, actual: 18 },
    { month: 'Mar', planned: 35, actual: 32 },
    { month: 'Apr', planned: 50, actual: 48 },
    { month: 'May', planned: 65, actual: 63 },
    { month: 'Jun', planned: 80, actual: 78 },
    { month: 'Current', planned: 90, actual: project.timeline.progress },
  ];

  // Budget breakdown
  const budgetBreakdown = [
    { name: 'Labor', value: 35, amount: project.budget.spent * 0.35, color: '#3b82f6' },
    { name: 'Materials', value: 40, amount: project.budget.spent * 0.40, color: '#10b981' },
    { name: 'Equipment', value: 15, amount: project.budget.spent * 0.15, color: '#f59e0b' },
    { name: 'Others', value: 10, amount: project.budget.spent * 0.10, color: '#8b5cf6' },
  ];

  // Task breakdown
  const taskBreakdown = [
    { name: 'Completed', value: project.tasks.completed, color: '#10b981' },
    { name: 'In Progress', value: project.tasks.inProgress, color: '#3b82f6' },
    { name: 'Pending', value: project.tasks.pending, color: '#94a3b8' },
    { name: 'Overdue', value: project.tasks.overdue, color: '#ef4444' },
  ];

  // Upcoming milestones
  const upcomingMilestones = project.milestones
    .filter((m: any) => m.status !== 'completed')
    .slice(0, 4);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Schedule Card */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Schedule</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.daysRemaining} days
            </div>
            <p className="text-xs text-gray-500 mt-1">Remaining</p>
            <div className="flex items-center gap-2 mt-3">
              <Progress value={project.timeline.progress} className="flex-1 h-1.5" />
              <span className="text-xs font-medium text-gray-600">{project.timeline.progress}%</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-500">{project.timeline.daysElapsed} days elapsed</span>
              {metrics.scheduleVariance >= 0 ? (
                <span className="text-green-600 font-medium">On Track</span>
              ) : (
                <span className="text-red-600 font-medium">{Math.abs(metrics.scheduleVariance)}d Behind</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Budget Card */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ₹{(project.budget.spent / 10000000).toFixed(2)} Cr
            </div>
            <p className="text-xs text-gray-500 mt-1">Spent of ₹{(project.budget.total / 10000000).toFixed(1)} Cr</p>
            <div className="flex items-center gap-2 mt-3">
              <Progress value={metrics.budgetUtilization} className="flex-1 h-1.5" />
              <span className="text-xs font-medium text-gray-600">{metrics.budgetUtilization.toFixed(0)}%</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-500">₹{(metrics.costPerDay / 100000).toFixed(1)}L/day</span>
              {metrics.costVariance >= 0 ? (
                <span className="text-green-600 font-medium">Within Budget</span>
              ) : (
                <span className="text-red-600 font-medium">₹{Math.abs(metrics.costVariance / 10000000).toFixed(1)}Cr Over</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Tasks</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {project.tasks.completed}/{project.tasks.total}
            </div>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
            <div className="flex items-center gap-2 mt-3">
              <Progress value={metrics.taskCompletionRate} className="flex-1 h-1.5" />
              <span className="text-xs font-medium text-gray-600">{metrics.taskCompletionRate.toFixed(0)}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-xs">
                <span className="text-gray-500">Active: </span>
                <span className="font-medium text-blue-600">{project.tasks.inProgress}</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Overdue: </span>
                <span className="font-medium text-red-600">{project.tasks.overdue}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality & Safety Card */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Quality & Safety</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold text-gray-900">{metrics.qualityScore}%</div>
              <span className="text-sm text-gray-500">Quality</span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <div className="text-2xl font-bold text-gray-900">{metrics.safetyScore}%</div>
              <span className="text-sm text-gray-500">Safety</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="text-xs">
                <span className="text-gray-500">Defects: </span>
                <span className="font-medium text-yellow-600">{project.defectRate}%</span>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Incidents: </span>
                <span className="font-medium text-green-600">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Project Progress</CardTitle>
            <CardDescription>Planned vs Actual Progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="planned" stroke="#94a3b8" fillOpacity={1} fill="url(#colorPlanned)" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" strokeWidth={2} />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-900">Upcoming Milestones</CardTitle>
              <Badge variant="outline" className="text-xs">{upcomingMilestones.length} Pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMilestones.map((milestone: any, index: number) => (
              <div key={milestone.id} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "mt-1 h-2 w-2 rounded-full",
                      milestone.status === 'in-progress' ? "bg-blue-500" : "bg-gray-300"
                    )} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {format(new Date(milestone.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
                {index < upcomingMilestones.length - 1 && <Separator />}
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full mt-2">
              View All Milestones
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Budget and Tasks Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Budget Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Budget Allocation</CardTitle>
            <CardDescription>Cost distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={180}>
                  <RechartsPieChart>
                    <Pie
                      data={budgetBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                    >
                      {budgetBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {budgetBreakdown.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ₹{(item.amount / 10000000).toFixed(2)} Cr
                    </div>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Remaining</span>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{((project.budget.total - project.budget.spent) / 10000000).toFixed(2)} Cr
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Task Status</CardTitle>
            <CardDescription>Current task distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taskBreakdown.map((task, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.color }} />
                      <span className="text-sm text-gray-600">{task.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{task.value}</span>
                  </div>
                  <Progress 
                    value={(task.value / project.tasks.total) * 100} 
                    className="h-1.5"
                    style={{ 
                      '--progress-background': task.color 
                    } as any}
                  />
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Critical Tasks</p>
                <p className="text-lg font-semibold text-red-600">{project.tasks.critical || 8}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">Today's Due</p>
                <p className="text-lg font-semibold text-orange-600">{project.tasks.todaysDue || 5}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Information Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Project ID</span>
              <span className="text-sm font-medium text-gray-900">{project.id}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Customer</span>
              <span className="text-sm font-medium text-gray-900">{project.customer.name}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Location</span>
              <span className="text-sm font-medium text-gray-900">{project.location.city}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Phase</span>
              <Badge variant="outline" className="text-xs">{project.phase}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Priority</span>
              <Badge className={cn("text-xs", getPriorityColor(project.priority))}>
                {project.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Team Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Team Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Project Manager</span>
              <span className="text-sm font-medium text-gray-900">{project.team.projectManager.name}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Members</span>
              <span className="text-sm font-medium text-gray-900">{project.team.totalMembers}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Employees</span>
              <span className="text-sm font-medium text-gray-900">{project.team.employees}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Contractors</span>
              <span className="text-sm font-medium text-gray-900">{project.team.contractors}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Utilization</span>
              <span className="text-sm font-medium text-green-600">89%</span>
            </div>
          </CardContent>
        </Card>

        {/* Risk Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Risk Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{project.risks?.high || 2}</div>
                <p className="text-xs text-gray-500 mt-1">High</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{project.risks?.medium || 5}</div>
                <p className="text-xs text-gray-500 mt-1">Medium</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{project.risks?.low || 8}</div>
                <p className="text-xs text-gray-500 mt-1">Low</p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Risks</span>
                <span className="font-medium text-gray-900">{project.risks?.total || 15}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Mitigation Rate</span>
                <span className="font-medium text-green-600">73%</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View Risk Register
              <AlertTriangle className="h-3 w-3 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">Recent Activities</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: CheckCircle2, title: 'Foundation work completed', time: '2 hours ago', color: 'text-green-600' },
              { icon: AlertTriangle, title: 'Material delivery delayed', time: '5 hours ago', color: 'text-yellow-600' },
              { icon: Users, title: '5 new workers assigned', time: '1 day ago', color: 'text-blue-600' },
              { icon: FileText, title: 'Safety report submitted', time: '2 days ago', color: 'text-purple-600' },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <Icon className={cn("h-4 w-4 mt-0.5", activity.color)} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
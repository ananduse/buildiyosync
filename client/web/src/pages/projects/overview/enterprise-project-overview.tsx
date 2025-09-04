import { useState, useMemo, useEffect } from 'react';
import { format, differenceInDays, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Target,
  BarChart3,
  Activity,
  Shield,
  Award,
  Zap,
  CircleDollarSign,
  FileText,
  Briefcase,
  MapPin,
  Timer,
  Gauge,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Info,
  Package,
  Truck,
  HardHat,
  Wrench,
  AlertCircle,
  ChevronRight,
  Plus,
  Filter,
  Download,
  Upload,
  Share2,
  Settings,
  MoreVertical,
  ExternalLink,
  Eye,
  Edit,
  Flag,
  GitBranch,
  Layers,
  PieChart,
  LineChart,
  Home,
  Percent,
  Calculator,
  Receipt,
  CreditCard,
  Wallet,
  Hash,
  ThumbsUp,
  MessageSquare,
  Bell,
  Star,
  BookOpen,
  ClipboardCheck,
  UserCheck,
  FolderOpen,
  Database,
  Server,
  Cloud,
  Cpu,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Copy,
  Printer,
  Mail,
  Phone,
  Video,
  Mic,
  Volume2,
  WifiOff,
  Wifi,
  Battery,
  BatteryLow,
  Wind,
  Droplets,
  Flame,
  Lightbulb,
  Bolt,
  PaintBucket,
  Hammer,
  Package2,
  BarChart2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter,
  Treemap,
} from 'recharts';

interface ProjectOverviewProps {
  project: any;
}

export default function EnterpriseProjectOverview({ project }: ProjectOverviewProps) {
  const [timeRange, setTimeRange] = useState('month');
  const [metricsView, setMetricsView] = useState<'overview' | 'detailed'>('overview');
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  // Calculate comprehensive metrics
  const metrics = useMemo(() => {
    const scheduleVariance = differenceInDays(new Date(project.timeline.estimatedEndDate), new Date(project.timeline.endDate));
    const budgetVariance = project.budget.total - project.budget.spent;
    const costPerformance = project.budget.total / project.budget.spent;
    const schedulePerformance = project.timeline.duration / project.timeline.daysElapsed;
    const taskCompletionRate = (project.tasks.completed / project.tasks.total) * 100;
    const resourceUtilization = (project.team.employees / (project.team.employees + project.team.contractors)) * 100;
    const qualityScore = project.performance.qualityIndex;
    const safetyScore = project.performance.safetyIndex;
    const riskScore = 100 - ((project.risks?.high || 0) * 10 + (project.risks?.medium || 0) * 5 + (project.risks?.low || 0) * 2);
    const overallHealth = (taskCompletionRate + qualityScore + safetyScore + riskScore) / 4;

    return {
      scheduleVariance,
      budgetVariance,
      costPerformance,
      schedulePerformance,
      taskCompletionRate,
      resourceUtilization,
      qualityScore,
      safetyScore,
      riskScore,
      overallHealth,
      burnRate: project.budget.spent / project.timeline.daysElapsed,
      velocity: project.tasks.completed / (project.timeline.daysElapsed / 7), // tasks per week
      efficiency: project.performance.efficiency,
      productivity: project.performance.productivity,
      customerSatisfaction: project.performance.customerSatisfaction || 85,
      teamMorale: project.performance.teamMorale || 78,
      changeRequests: project.changeRequests || 12,
      defectRate: project.defectRate || 2.3,
      rework: project.rework || 5,
      roi: ((project.budget.revenue - project.budget.spent) / project.budget.spent) * 100,
    };
  }, [project]);

  // Enhanced KPI data
  const kpiData = [
    {
      id: 'schedule',
      title: 'Schedule Performance',
      value: `${project.timeline.progress}%`,
      subtitle: 'On Track',
      change: metrics.scheduleVariance > 0 ? '+' + metrics.scheduleVariance : metrics.scheduleVariance.toString(),
      changeLabel: 'days',
      trend: metrics.scheduleVariance >= 0 ? 'up' : 'down',
      icon: Clock,
      color: 'blue',
      sparklineData: [65, 68, 72, 75, 78, 82, 85, 88],
      target: 100,
      actual: project.timeline.progress,
    },
    {
      id: 'budget',
      title: 'Budget Performance',
      value: `$${(project.budget.spent / 1000000).toFixed(1)}M`,
      subtitle: `of $${(project.budget.total / 1000000).toFixed(1)}M`,
      change: metrics.budgetVariance > 0 ? '+' + (metrics.budgetVariance / 1000000).toFixed(1) : (metrics.budgetVariance / 1000000).toFixed(1),
      changeLabel: 'M',
      trend: metrics.budgetVariance >= 0 ? 'up' : 'down',
      icon: DollarSign,
      color: 'green',
      sparklineData: [2.1, 2.3, 2.5, 2.8, 3.1, 3.4, 3.7, 4.2],
      target: project.budget.total,
      actual: project.budget.spent,
    },
    {
      id: 'quality',
      title: 'Quality Index',
      value: `${metrics.qualityScore}%`,
      subtitle: 'Excellent',
      change: '+2.5',
      changeLabel: '%',
      trend: 'up',
      icon: Award,
      color: 'purple',
      sparklineData: [92, 93, 91, 94, 95, 96, 97, 98],
      target: 95,
      actual: metrics.qualityScore,
    },
    {
      id: 'safety',
      title: 'Safety Index',
      value: `${metrics.safetyScore}%`,
      subtitle: '0 Incidents',
      change: '+1.2',
      changeLabel: '%',
      trend: 'up',
      icon: Shield,
      color: 'emerald',
      sparklineData: [96, 97, 97, 98, 99, 99, 100, 100],
      target: 100,
      actual: metrics.safetyScore,
    },
    {
      id: 'tasks',
      title: 'Task Completion',
      value: `${project.tasks.completed}/${project.tasks.total}`,
      subtitle: `${Math.round(metrics.taskCompletionRate)}% Complete`,
      change: `+${Math.round(metrics.velocity)}`,
      changeLabel: '/week',
      trend: 'up',
      icon: ClipboardCheck,
      color: 'orange',
      sparklineData: [145, 152, 168, 175, 182, 195, 208, 215],
      target: project.tasks.total,
      actual: project.tasks.completed,
    },
    {
      id: 'team',
      title: 'Resource Utilization',
      value: `${Math.round(metrics.resourceUtilization)}%`,
      subtitle: `${project.team.totalMembers} Active`,
      change: '+5',
      changeLabel: 'members',
      trend: 'up',
      icon: Users,
      color: 'indigo',
      sparklineData: [72, 75, 78, 80, 82, 85, 87, 89],
      target: 95,
      actual: metrics.resourceUtilization,
    },
  ];

  // Performance chart data
  const performanceChartData = [
    { month: 'Jan', planned: 10, actual: 8, budget: 0.8, quality: 92 },
    { month: 'Feb', planned: 20, actual: 18, budget: 1.5, quality: 94 },
    { month: 'Mar', planned: 35, actual: 32, budget: 2.3, quality: 95 },
    { month: 'Apr', planned: 50, actual: 48, budget: 3.1, quality: 96 },
    { month: 'May', planned: 65, actual: 63, budget: 3.9, quality: 97 },
    { month: 'Jun', planned: 80, actual: 78, budget: 4.7, quality: 98 },
    { month: 'Jul', planned: 90, actual: 88, budget: 5.2, quality: 98 },
    { month: 'Aug', planned: 100, actual: 95, budget: 5.8, quality: 99 },
  ];

  // Resource allocation data
  const resourceAllocationData = [
    { name: 'Engineers', value: 45, fill: '#3b82f6' },
    { name: 'Workers', value: 120, fill: '#10b981' },
    { name: 'Supervisors', value: 15, fill: '#f59e0b' },
    { name: 'Contractors', value: 35, fill: '#8b5cf6' },
    { name: 'Consultants', value: 8, fill: '#ef4444' },
  ];

  // Risk matrix data
  const riskMatrixData = [
    { risk: 'Weather Delays', probability: 70, impact: 60, category: 'Environmental' },
    { risk: 'Material Shortage', probability: 40, impact: 80, category: 'Supply Chain' },
    { risk: 'Labor Disputes', probability: 20, impact: 90, category: 'Human Resources' },
    { risk: 'Design Changes', probability: 60, impact: 50, category: 'Technical' },
    { risk: 'Permit Issues', probability: 30, impact: 70, category: 'Regulatory' },
    { risk: 'Budget Overrun', probability: 50, impact: 85, category: 'Financial' },
  ];

  // Milestone timeline data
  const milestoneData = [
    { name: 'Foundation Complete', date: '2024-02-15', progress: 100, status: 'completed' },
    { name: 'Structure Frame', date: '2024-04-30', progress: 100, status: 'completed' },
    { name: 'Roofing Complete', date: '2024-06-15', progress: 85, status: 'in-progress' },
    { name: 'MEP Installation', date: '2024-08-30', progress: 45, status: 'in-progress' },
    { name: 'Interior Finishing', date: '2024-10-15', progress: 15, status: 'pending' },
    { name: 'Final Inspection', date: '2024-12-01', progress: 0, status: 'pending' },
  ];

  // Cost breakdown data
  const costBreakdownData = [
    { category: 'Labor', planned: 2500000, actual: 2450000, variance: 50000 },
    { category: 'Materials', planned: 3200000, actual: 3350000, variance: -150000 },
    { category: 'Equipment', planned: 800000, actual: 750000, variance: 50000 },
    { category: 'Subcontractors', planned: 1500000, actual: 1480000, variance: 20000 },
    { category: 'Overhead', planned: 500000, actual: 520000, variance: -20000 },
    { category: 'Contingency', planned: 300000, actual: 150000, variance: 150000 },
  ];

  // Activity heatmap data
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let week = 0; week < 12; week++) {
      for (let day = 0; day < 7; day++) {
        const date = addDays(today, -((12 - week) * 7) + day);
        data.push({
          date: format(date, 'yyyy-MM-dd'),
          value: Math.floor(Math.random() * 100),
          activities: Math.floor(Math.random() * 20),
        });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  // Get status color
  const getStatusColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <ArrowRight className="h-4 w-4 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Dashboard Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Customize Layout</DropdownMenuItem>
              <DropdownMenuItem>Configure Widgets</DropdownMenuItem>
              <DropdownMenuItem>Set Alerts</DropdownMenuItem>
              <DropdownMenuItem>View Preferences</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Executive Summary Card */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Executive Summary</CardTitle>
              <CardDescription className="text-base mt-1">
                Project health score: <span className={cn("font-bold text-lg", metrics.overallHealth >= 80 ? "text-green-600" : metrics.overallHealth >= 60 ? "text-yellow-600" : "text-red-600")}>
                  {Math.round(metrics.overallHealth)}%
                </span>
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                {project.status.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                Phase: {project.phase}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Schedule</p>
              <p className="text-2xl font-bold">{project.timeline.progress}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.scheduleVariance > 0 ? `${metrics.scheduleVariance} days ahead` : `${Math.abs(metrics.scheduleVariance)} days behind`}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="text-2xl font-bold">${(project.budget.spent / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((project.budget.spent / project.budget.total) * 100).toFixed(0)}% utilized
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quality</p>
              <p className="text-2xl font-bold">{metrics.qualityScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.defectRate}% defect rate
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Safety</p>
              <p className="text-2xl font-bold">{metrics.safetyScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Zero incidents
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Next Milestone:</span>
              <span className="font-medium">{milestoneData.find(m => m.status === 'in-progress')?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Days Remaining:</span>
              <span className="font-medium">{differenceInDays(new Date(project.timeline.endDate), new Date())} days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedKPI(kpi.id)}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Icon className={cn("h-5 w-5", `text-${kpi.color}-600`)} />
                  {getTrendIcon(kpi.trend)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.subtitle}</p>
                <div className="mt-3">
                  <Progress value={(kpi.actual / kpi.target) * 100} className="h-1" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-medium">
                    {kpi.change} {kpi.changeLabel}
                  </span>
                  <RechartsLineChart width={60} height={20} data={kpi.sparklineData.map((v, i) => ({ value: v }))}>
                    <Line type="monotone" dataKey="value" stroke={`var(--${kpi.color}-600)`} strokeWidth={1.5} dot={false} />
                  </RechartsLineChart>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Trends</CardTitle>
              <Tabs value={metricsView} onValueChange={(v) => setMetricsView(v as any)} className="w-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="detailed" className="text-xs">Detailed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" />
                <RechartsTooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="planned" fill="#e0e7ff" stroke="#6366f1" strokeWidth={2} name="Planned Progress" />
                <Line yAxisId="left" type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Actual Progress" />
                <Bar yAxisId="right" dataKey="budget" fill="#f59e0b" name="Budget (M)" />
                {metricsView === 'detailed' && (
                  <Line yAxisId="left" type="monotone" dataKey="quality" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Quality Index" />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Assessment Matrix */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Risk Matrix</CardTitle>
              <Badge variant="outline">6 Active Risks</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskMatrixData.slice(0, 5).map((risk, index) => {
                const riskLevel = risk.probability * risk.impact / 100;
                const riskColor = riskLevel > 60 ? 'bg-red-100 text-red-700' : riskLevel > 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{risk.risk}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground">P: {risk.probability}%</span>
                        <span className="text-xs text-muted-foreground">I: {risk.impact}%</span>
                        <Badge variant="secondary" className="text-xs">{risk.category}</Badge>
                      </div>
                    </div>
                    <Badge className={cn("ml-2", riskColor)}>
                      {riskLevel > 60 ? 'High' : riskLevel > 30 ? 'Medium' : 'Low'}
                    </Badge>
                  </div>
                );
              })}
              <Button variant="outline" className="w-full" size="sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View All Risks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource & Financial Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resource Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Current workforce distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={resourceAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {resourceAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {resourceAllocationData.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: resource.fill }} />
                      <span className="text-sm">{resource.name}</span>
                    </div>
                    <span className="text-sm font-medium">{resource.value}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-bold">{resourceAllocationData.reduce((sum, r) => sum + r.value, 0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
            <CardDescription>Budget allocation and variance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {costBreakdownData.map((cost, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{cost.category}</span>
                    <span className={cn("font-medium", cost.variance >= 0 ? "text-green-600" : "text-red-600")}>
                      {cost.variance >= 0 ? '+' : ''}{(cost.variance / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress 
                      value={(cost.actual / cost.planned) * 100} 
                      className="flex-1 h-2"
                    />
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {((cost.actual / cost.planned) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Planned</p>
                <p className="font-bold text-lg">${(costBreakdownData.reduce((sum, c) => sum + c.planned, 0) / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Actual</p>
                <p className="font-bold text-lg">${(costBreakdownData.reduce((sum, c) => sum + c.actual, 0) / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestone Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Milestone Timeline</CardTitle>
              <CardDescription>Major project deliverables and checkpoints</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestoneData.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      milestone.status === 'completed' ? "bg-green-100" :
                      milestone.status === 'in-progress' ? "bg-blue-100" : "bg-gray-100"
                    )}>
                      {milestone.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      {milestone.status === 'in-progress' && <Clock className="h-5 w-5 text-blue-600" />}
                      {milestone.status === 'pending' && <Circle className="h-5 w-5 text-gray-400" />}
                    </div>
                    {index < milestoneData.length - 1 && (
                      <div className="absolute top-10 left-5 w-0.5 h-12 bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{milestone.name}</p>
                        <p className="text-sm text-muted-foreground">Due: {format(new Date(milestone.date), 'MMM dd, yyyy')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          milestone.status === 'completed' ? 'default' :
                          milestone.status === 'in-progress' ? 'secondary' : 'outline'
                        }>
                          {milestone.status}
                        </Badge>
                        <span className="text-sm font-medium">{milestone.progress}%</span>
                      </div>
                    </div>
                    <Progress value={milestone.progress} className="mt-2 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Heatmap & Recent Updates */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Heatmap */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Heatmap</CardTitle>
            <CardDescription>Project activity over the last 12 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-xs text-center text-muted-foreground font-medium">
                  {day}
                </div>
              ))}
              {heatmapData.map((day, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={cn(
                          "w-full aspect-square rounded-sm cursor-pointer hover:ring-2 hover:ring-primary",
                          day.value > 80 ? "bg-green-600" :
                          day.value > 60 ? "bg-green-500" :
                          day.value > 40 ? "bg-green-400" :
                          day.value > 20 ? "bg-green-300" :
                          day.value > 0 ? "bg-green-200" : "bg-gray-100"
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">{format(new Date(day.date), 'MMM dd, yyyy')}</p>
                      <p className="text-xs text-muted-foreground">{day.activities} activities</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-muted-foreground">Less activity</span>
              <div className="flex items-center gap-1">
                {[20, 40, 60, 80, 100].map((level, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-sm",
                      level > 80 ? "bg-green-600" :
                      level > 60 ? "bg-green-500" :
                      level > 40 ? "bg-green-400" :
                      level > 20 ? "bg-green-300" : "bg-green-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">More activity</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Updates</CardTitle>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {[
                  { type: 'milestone', title: 'Foundation work completed', time: '2 hours ago', icon: Flag, color: 'text-green-600' },
                  { type: 'risk', title: 'New risk identified: Weather delays', time: '4 hours ago', icon: AlertTriangle, color: 'text-yellow-600' },
                  { type: 'task', title: '15 tasks completed today', time: '6 hours ago', icon: CheckCircle2, color: 'text-blue-600' },
                  { type: 'budget', title: 'Budget review meeting scheduled', time: '8 hours ago', icon: DollarSign, color: 'text-purple-600' },
                  { type: 'team', title: '5 new team members onboarded', time: '1 day ago', icon: Users, color: 'text-indigo-600' },
                  { type: 'quality', title: 'Quality inspection passed', time: '2 days ago', icon: Award, color: 'text-emerald-600' },
                ].map((update, index) => {
                  const Icon = update.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <Icon className={cn("h-4 w-4 mt-0.5", update.color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{update.title}</p>
                        <p className="text-xs text-muted-foreground">{update.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
            <Button variant="outline" className="justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
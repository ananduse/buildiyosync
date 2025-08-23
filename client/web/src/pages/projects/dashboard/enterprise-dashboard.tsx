import { useState, useMemo } from 'react';
import {
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Calendar,
  FileText,
  Target,
  Shield,
  Package,
  Briefcase,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  MoreVertical,
  Download,
  RefreshCw,
  Filter,
  ChevronRight,
  CircleDollarSign,
  Timer,
  ClipboardCheck,
  Hammer,
  HardHat,
  Truck,
  AlertCircle,
  CheckSquare,
  XCircle,
  CircleCheck,
  CircleX,
  Layers,
  GitBranch,
  Zap,
  Award,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  Plus,
  MapPin,
  Gauge,
  TrendingUpIcon,
  Percent,
  CalendarDays,
  FileCheck,
  UserCheck,
  AlertOctagon,
  Cpu,
  Database,
  Wallet,
  CreditCard,
  Receipt,
  BadgeDollarSign,
  Construction,
  LucideIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Treemap,
  Scatter,
  ScatterChart,
  ZAxis,
  RadialBarChart,
  RadialBar,
  Funnel,
  FunnelChart,
  LabelList
} from 'recharts';

// Utility functions
function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

// Custom chart components
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 1000 
              ? formatCurrency(entry.value) 
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Metric Card Component with Sparkline
function MetricCardWithChart({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon, 
  color, 
  trend,
  sparklineData 
}: {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
}) {
  const isPositive = trend === 'up' && change > 0;
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : ArrowRight;
  
  const sparklineChartData = sparklineData?.map((val, idx) => ({ value: val, index: idx })) || [];
  
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-2 rounded-lg", color)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendIcon className={cn("h-3 w-3", isPositive ? "text-green-500" : "text-red-500")} />
              <span className={cn("text-xs font-medium", isPositive ? "text-green-500" : "text-red-500")}>
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            </div>
          </div>
          {sparklineData && (
            <div className="h-12 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineChartData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={isPositive ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
      <div className={cn("absolute bottom-0 left-0 right-0 h-1", color.replace('text', 'bg'))} />
    </Card>
  );
}

// Generate comprehensive mock data
const generateRevenueTrend = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    revenue: Math.floor(Math.random() * 3000000) + 5000000,
    expenses: Math.floor(Math.random() * 2000000) + 3000000,
    profit: Math.floor(Math.random() * 1000000) + 1500000,
    forecast: Math.floor(Math.random() * 3500000) + 5500000,
  }));
};

const generateProjectPhases = () => [
  { phase: 'Planning', projects: 35, value: 12500000 },
  { phase: 'Design', projects: 28, value: 8900000 },
  { phase: 'Permits', projects: 15, value: 4200000 },
  { phase: 'Foundation', projects: 22, value: 15600000 },
  { phase: 'Construction', projects: 85, value: 125000000 },
  { phase: 'Finishing', projects: 45, value: 35000000 },
  { phase: 'Handover', projects: 12, value: 5500000 },
];

const generateLocationData = () => [
  { location: 'New York', projects: 45, revenue: 25000000, growth: 12 },
  { location: 'California', projects: 38, revenue: 22000000, growth: 8 },
  { location: 'Texas', projects: 32, revenue: 18000000, growth: 15 },
  { location: 'Florida', projects: 28, revenue: 15000000, growth: -3 },
  { location: 'Illinois', projects: 22, revenue: 12000000, growth: 5 },
  { location: 'Washington', projects: 18, revenue: 10000000, growth: 18 },
];

const generateRiskMatrix = () => [
  { risk: 'Budget Overrun', probability: 65, impact: 85, projects: 12 },
  { risk: 'Schedule Delay', probability: 45, impact: 70, projects: 8 },
  { risk: 'Resource Shortage', probability: 30, impact: 60, projects: 5 },
  { risk: 'Quality Issues', probability: 25, impact: 75, projects: 3 },
  { risk: 'Safety Incidents', probability: 15, impact: 95, projects: 2 },
  { risk: 'Regulatory Changes', probability: 40, impact: 50, projects: 6 },
];

const generateCashFlow = () => {
  const weeks = ['W1', 'W2', 'W3', 'W4'];
  return weeks.map(week => ({
    week,
    inflow: Math.floor(Math.random() * 2000000) + 3000000,
    outflow: Math.floor(Math.random() * 1500000) + 2000000,
    netCash: Math.floor(Math.random() * 500000) + 1000000,
  }));
};

const generateTeamPerformance = () => [
  { team: 'Engineering', efficiency: 92, projects: 15, utilization: 88 },
  { team: 'Construction', efficiency: 85, projects: 22, utilization: 95 },
  { team: 'Design', efficiency: 88, projects: 12, utilization: 78 },
  { team: 'Procurement', efficiency: 90, projects: 8, utilization: 82 },
  { team: 'QA/QC', efficiency: 95, projects: 10, utilization: 75 },
  { team: 'Project Mgmt', efficiency: 87, projects: 18, utilization: 92 },
];

const generateMilestoneProgress = () => [
  { milestone: 'Q1 Targets', planned: 25, achieved: 22, percentage: 88 },
  { milestone: 'Q2 Targets', planned: 30, achieved: 28, percentage: 93 },
  { milestone: 'Q3 Targets', planned: 35, achieved: 30, percentage: 86 },
  { milestone: 'Q4 Targets', planned: 40, achieved: 15, percentage: 38 },
];

const generateVendorPerformance = () => [
  { vendor: 'ABC Supplies', rating: 4.5, orders: 156, onTime: 94 },
  { vendor: 'XYZ Materials', rating: 4.2, orders: 132, onTime: 88 },
  { vendor: 'Global Tools', rating: 4.8, orders: 98, onTime: 97 },
  { vendor: 'Pro Equipment', rating: 3.9, orders: 76, onTime: 82 },
  { vendor: 'BuildMart', rating: 4.6, orders: 145, onTime: 91 },
];

// Main Dashboard Component
export default function EnterpriseDashboard() {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);
  
  // Generate all data
  const revenueTrend = useMemo(() => generateRevenueTrend(), []);
  const projectPhases = useMemo(() => generateProjectPhases(), []);
  const locationData = useMemo(() => generateLocationData(), []);
  const riskMatrix = useMemo(() => generateRiskMatrix(), []);
  const cashFlow = useMemo(() => generateCashFlow(), []);
  const teamPerformance = useMemo(() => generateTeamPerformance(), []);
  const milestoneProgress = useMemo(() => generateMilestoneProgress(), []);
  const vendorPerformance = useMemo(() => generateVendorPerformance(), []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Key metrics with sparkline data
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$258.4M',
      change: 12.5,
      changeLabel: 'vs last period',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100',
      trend: 'up' as const,
      sparklineData: [45, 52, 48, 65, 72, 68, 85, 92]
    },
    {
      title: 'Active Projects',
      value: '147',
      change: 8.2,
      changeLabel: 'from last month',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100',
      trend: 'up' as const,
      sparklineData: [125, 130, 128, 135, 140, 138, 145, 147]
    },
    {
      title: 'Completion Rate',
      value: '87.3%',
      change: -2.1,
      changeLabel: 'from target',
      icon: CheckCircle2,
      color: 'text-purple-600 bg-purple-100',
      trend: 'down' as const,
      sparklineData: [92, 90, 88, 89, 87, 85, 86, 87.3]
    },
    {
      title: 'Total Workforce',
      value: '1,284',
      change: 15.3,
      changeLabel: 'new hires',
      icon: Users,
      color: 'text-orange-600 bg-orange-100',
      trend: 'up' as const,
      sparklineData: [1100, 1120, 1150, 1180, 1200, 1230, 1250, 1284]
    },
  ];

  // Project statistics
  const projectStats = {
    byStatus: [
      { name: 'Active', value: 85, fill: '#10b981' },
      { name: 'Planning', value: 35, fill: '#3b82f6' },
      { name: 'On Hold', value: 18, fill: '#f59e0b' },
      { name: 'Completed', value: 45, fill: '#8b5cf6' },
      { name: 'Cancelled', value: 7, fill: '#ef4444' },
    ],
    byType: [
      { name: 'Commercial', value: 65, fill: '#3b82f6' },
      { name: 'Residential', value: 45, fill: '#10b981' },
      { name: 'Infrastructure', value: 30, fill: '#f59e0b' },
      { name: 'Industrial', value: 35, fill: '#8b5cf6' },
      { name: 'Renovation', value: 15, fill: '#ec4899' },
    ],
    byPriority: [
      { priority: 'Critical', count: 12, percentage: 6 },
      { priority: 'High', count: 38, percentage: 19 },
      { priority: 'Medium', count: 85, percentage: 43 },
      { priority: 'Low', count: 65, percentage: 32 },
    ]
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enterprise Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time project insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button variant={timeRange === '24h' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeRange('24h')}>
              24H
            </Button>
            <Button variant={timeRange === '7d' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeRange('7d')}>
              7D
            </Button>
            <Button variant={timeRange === '30d' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeRange('30d')}>
              30D
            </Button>
            <Button variant={timeRange === '90d' ? 'default' : 'ghost'} size="sm" onClick={() => setTimeRange('90d')}>
              90D
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCardWithChart key={index} {...metric} />
        ))}
      </div>

      {/* Financial Overview Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Trend - 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Financial Performance</CardTitle>
              <CardDescription>Revenue, expenses, and profit trends</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export Data</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Configure</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={revenueTrend}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => formatCurrency(value)} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="url(#revenueGradient)" />
                <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="url(#profitGradient)" />
                <Bar dataKey="expenses" fill="#ef4444" opacity={0.8} radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cash Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Cash Flow</CardTitle>
            <CardDescription>Inflow vs Outflow</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={cashFlow} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => formatCurrency(value)} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="inflow" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="outflow" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Bar dataKey="netCash" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Projects Analysis Section */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Projects by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={projectStats.byStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {projectStats.byStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {projectStats.byStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Projects by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={projectStats.byType}>
                <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" className="fill-primary">
                  {projectStats.byType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RadialBar>
                <RechartsTooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {projectStats.byType.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectStats.byPriority.map((item, index) => {
                const colors = ['bg-red-500', 'bg-orange-500', 'bg-blue-500', 'bg-gray-400'];
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.priority}</span>
                      <span className="text-muted-foreground">{item.count} projects</span>
                    </div>
                    <div className="relative h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn("absolute left-0 top-0 h-full transition-all duration-500", colors[index])}
                        style={{ width: `${item.percentage}%` }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Milestone Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quarterly Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={milestoneProgress} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis type="number" className="text-xs" domain={[0, 100]} />
                <YAxis dataKey="milestone" type="category" className="text-xs" width={60} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                  <LabelList dataKey="percentage" position="right" formatter={(value: number) => `${value}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Phases and Location Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Phases */}
        <Card>
          <CardHeader>
            <CardTitle>Projects by Phase</CardTitle>
            <CardDescription>Current distribution across construction phases</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={projectPhases}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="phase" className="text-xs" />
                <YAxis yAxisId="left" className="text-xs" />
                <YAxis yAxisId="right" orientation="right" className="text-xs" tickFormatter={(value) => formatCurrency(value)} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="projects" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Performance</CardTitle>
            <CardDescription>Projects and revenue by location</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {locationData.map((location, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{location.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {location.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className={cn("text-sm font-medium", 
                          location.growth > 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {Math.abs(location.growth)}%
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Projects:</span>
                        <span className="ml-2 font-medium">{location.projects}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="ml-2 font-medium">{formatCurrency(location.revenue)}</span>
                      </div>
                    </div>
                    <Progress value={(location.projects / 45) * 100} className="mt-2 h-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Risk and Team Performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Risk Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment Matrix</CardTitle>
            <CardDescription>Probability vs Impact analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  type="number" 
                  dataKey="probability" 
                  name="Probability" 
                  unit="%" 
                  className="text-xs"
                  domain={[0, 100]}
                />
                <YAxis 
                  type="number" 
                  dataKey="impact" 
                  name="Impact" 
                  unit="%" 
                  className="text-xs"
                  domain={[0, 100]}
                />
                <ZAxis type="number" dataKey="projects" range={[50, 400]} />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Scatter name="Risks" data={riskMatrix} fill="#ef4444">
                  {riskMatrix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.probability > 50 && entry.impact > 50 ? '#ef4444' :
                      entry.probability > 30 || entry.impact > 60 ? '#f59e0b' :
                      '#10b981'
                    } />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Low Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>High Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Efficiency and utilization metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={teamPerformance}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="team" className="text-xs" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                <Radar name="Efficiency" dataKey="efficiency" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="Utilization" dataKey="utilization" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vendor Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Vendors</CardTitle>
            <CardDescription>Performance ratings and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorPerformance.map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{vendor.vendor}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn("h-3 w-3", 
                              i < Math.floor(vendor.rating) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300"
                            )}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          {vendor.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{vendor.orders} orders</span>
                      <span>{vendor.onTime}% on-time</span>
                    </div>
                    <Progress value={vendor.onTime} className="mt-2 h-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Project Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128 days</div>
            <Progress value={65} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">18 days ahead of schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <Progress value={78.5} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">Optimal range: 75-85%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Safety Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <Progress value={98.2} className="mt-2 h-2 [&>div]:bg-green-500" />
            <p className="text-xs text-muted-foreground mt-1">45 days without incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <Progress value={96} className="mt-2 h-2 [&>div]:bg-yellow-500" />
            <p className="text-xs text-muted-foreground mt-1">Based on 284 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest project updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {[
                  { icon: CheckCircle2, color: 'text-green-500', title: 'Milestone Achieved', desc: 'Foundation completed for Tower A', time: '2 hours ago', user: 'Sarah J.' },
                  { icon: AlertTriangle, color: 'text-yellow-500', title: 'Risk Identified', desc: 'Material shortage risk in Project Delta', time: '4 hours ago', user: 'Mike C.' },
                  { icon: DollarSign, color: 'text-blue-500', title: 'Payment Processed', desc: '$2.5M payment to ABC Contractors', time: '6 hours ago', user: 'System' },
                  { icon: Users, color: 'text-purple-500', title: 'Team Update', desc: '15 new workers assigned to Site B', time: '8 hours ago', user: 'Lisa W.' },
                  { icon: FileCheck, color: 'text-green-500', title: 'Document Approved', desc: 'Environmental clearance approved', time: '12 hours ago', user: 'Admin' },
                  { icon: Construction, color: 'text-orange-500', title: 'Phase Started', desc: 'Construction phase began for Mall Project', time: '1 day ago', user: 'David B.' },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={cn("mt-0.5", activity.color)}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.desc}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Critical Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Budget', message: '3 projects exceeding budget by >10%', severity: 'high', icon: DollarSign },
                { type: 'Schedule', message: '5 projects behind schedule', severity: 'medium', icon: Clock },
                { type: 'Compliance', message: '2 permits expiring this week', severity: 'high', icon: Shield },
                { type: 'Safety', message: 'Safety audit due in 3 days', severity: 'medium', icon: AlertOctagon },
                { type: 'Resources', message: 'Equipment shortage reported', severity: 'low', icon: Package },
              ].map((alert, index) => (
                <div key={index} className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border",
                  alert.severity === 'high' && "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950",
                  alert.severity === 'medium' && "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950",
                  alert.severity === 'low' && "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
                )}>
                  <alert.icon className={cn("h-5 w-5",
                    alert.severity === 'high' && "text-red-500",
                    alert.severity === 'medium' && "text-yellow-500",
                    alert.severity === 'low' && "text-blue-500"
                  )} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Footer */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Button variant="outline" className="justify-start bg-white dark:bg-gray-800">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
            <Button variant="outline" className="justify-start bg-white dark:bg-gray-800">
              <Users className="mr-2 h-4 w-4" />
              Assign Team
            </Button>
            <Button variant="outline" className="justify-start bg-white dark:bg-gray-800">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="justify-start bg-white dark:bg-gray-800">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="justify-start bg-white dark:bg-gray-800">
              <MessageSquare className="mr-2 h-4 w-4" />
              Send Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function for Star rating
function Star({ className, ...props }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
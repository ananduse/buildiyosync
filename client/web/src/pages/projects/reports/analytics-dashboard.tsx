import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Calendar,
  Package,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Zap,
  Building2,
  FileText,
  Download,
  Filter,
  RefreshCw,
  Settings,
  ArrowUp,
  ArrowDown,
  Info,
  PieChart,
  LineChart,
  Percent,
  IndianRupee,
  Timer,
  Shield,
  Award,
  Briefcase,
  Home,
  Layers,
  GitBranch,
  UserCheck,
  Truck,
  ClipboardCheck,
  HardHat,
  AlertCircle,
  ChevronRight,
  Eye,
  Share2,
  Printer,
  Mail,
  MessageSquare,
  Star,
  Hash,
  MapPin,
  Wrench
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from '@/components/ui/dropdown-menu';
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
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [projectFilter, setProjectFilter] = useState('all');
  const [viewMode, setViewMode] = useState('overview');

  // Mock data for charts based on PRD
  const budgetTrendData = [
    { month: 'Jan', planned: 4500000, actual: 4200000, variance: 300000 },
    { month: 'Feb', planned: 8500000, actual: 8100000, variance: 400000 },
    { month: 'Mar', planned: 12500000, actual: 12800000, variance: -300000 },
    { month: 'Apr', planned: 18500000, actual: 17900000, variance: 600000 },
    { month: 'May', planned: 24500000, actual: 24200000, variance: 300000 },
    { month: 'Jun', planned: 32500000, actual: 31800000, variance: 700000 },
  ];

  const taskProgressData = [
    { name: 'Completed', value: 98, color: '#10b981' },
    { name: 'In Progress', value: 42, color: '#3b82f6' },
    { name: 'Review', value: 8, color: '#8b5cf6' },
    { name: 'Blocked', value: 8, color: '#ef4444' },
  ];

  const phaseProgressData = [
    { phase: 'Foundation', planned: 100, actual: 100, status: 'completed' },
    { phase: 'Structure', planned: 80, actual: 75, status: 'in-progress' },
    { phase: 'MEP', planned: 60, actual: 45, status: 'in-progress' },
    { phase: 'Interior', planned: 40, actual: 25, status: 'pending' },
    { phase: 'Finishing', planned: 20, actual: 10, status: 'pending' },
  ];

  const resourceUtilizationData = [
    { resource: 'Manpower', utilization: 85 },
    { resource: 'Equipment', utilization: 72 },
    { resource: 'Materials', utilization: 68 },
    { resource: 'Contractors', utilization: 90 },
    { resource: 'Vendors', utilization: 75 },
  ];

  const safetyMetricsData = [
    { subject: 'Training', A: 95, fullMark: 100 },
    { subject: 'Compliance', A: 88, fullMark: 100 },
    { subject: 'Incidents', A: 92, fullMark: 100 },
    { subject: 'Equipment', A: 85, fullMark: 100 },
    { subject: 'Reporting', A: 90, fullMark: 100 },
  ];

  const qualityScoreData = [
    { week: 'W1', score: 88 },
    { week: 'W2', score: 92 },
    { week: 'W3', score: 85 },
    { week: 'W4', score: 95 },
    { week: 'W5', score: 90 },
    { week: 'W6', score: 93 },
  ];

  const dprComplianceData = [
    { day: 'Mon', submitted: 12, pending: 2 },
    { day: 'Tue', submitted: 14, pending: 1 },
    { day: 'Wed', submitted: 13, pending: 2 },
    { day: 'Thu', submitted: 15, pending: 0 },
    { day: 'Fri', submitted: 14, pending: 1 },
    { day: 'Sat', submitted: 10, pending: 5 },
    { day: 'Sun', submitted: 8, pending: 7 },
  ];

  const materialCostBreakdown = [
    { category: 'Steel', value: 45000000, percentage: 36 },
    { category: 'Cement', value: 35000000, percentage: 28 },
    { category: 'Electrical', value: 20000000, percentage: 16 },
    { category: 'Plumbing', value: 15000000, percentage: 12 },
    { category: 'Others', value: 10000000, percentage: 8 },
  ];

  const projectKPIs = [
    { metric: 'Schedule Variance', value: -5, unit: 'days', trend: 'down', status: 'warning' },
    { metric: 'Cost Variance', value: 2.5, unit: '%', trend: 'up', status: 'success' },
    { metric: 'Quality Score', value: 92, unit: '%', trend: 'up', status: 'success' },
    { metric: 'Safety Index', value: 95, unit: '%', trend: 'up', status: 'success' },
    { metric: 'Customer Satisfaction', value: 4.5, unit: '/5', trend: 'up', status: 'success' },
    { metric: 'Resource Efficiency', value: 78, unit: '%', trend: 'down', status: 'warning' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive project insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="skyline">Skyline Towers</SelectItem>
              <SelectItem value="green-valley">Green Valley</SelectItem>
              <SelectItem value="tech-park">Tech Park</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                PDF Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Excel Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="h-4 w-4 mr-2" />
                Print Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Email Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Customer Access Info */}
      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle>Customer Dashboard Access</AlertTitle>
        <AlertDescription>
          All reports and analytics are available to customers in real-time. 
          Last viewed by Rajesh Kumar on Jan 18, 2024 at 3:30 PM
        </AlertDescription>
      </Alert>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {projectKPIs.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.metric}</CardTitle>
              <div className={cn("flex items-center gap-1", getStatusColor(kpi.status))}>
                {getTrendIcon(kpi.trend)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.value}{kpi.unit}
              </div>
              <Progress 
                value={kpi.metric === 'Schedule Variance' ? 95 : kpi.value} 
                className="h-1 mt-2" 
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="quality">Quality & Safety</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="executive">Executive</TabsTrigger>
        </TabsList>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Budget Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Utilization Trend</CardTitle>
                <CardDescription>Planned vs Actual expenditure over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={budgetTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000000).toFixed(0)}M`} />
                    <RechartsTooltip 
                      formatter={(value: number) => `₹${(value / 1000000).toFixed(2)}M`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="planned" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stackId="2" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Material Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Material Cost Distribution</CardTitle>
                <CardDescription>Breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={materialCostBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {materialCostBreakdown.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} 
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => `₹${(value / 10000000).toFixed(2)}Cr`} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Budget Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Category Analysis</CardTitle>
              <CardDescription>Detailed breakdown by construction phases</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Committed</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { category: 'Foundation', allocated: 120000000, spent: 118000000, committed: 2000000 },
                    { category: 'Structure', allocated: 250000000, spent: 180000000, committed: 45000000 },
                    { category: 'MEP', allocated: 85000000, spent: 35000000, committed: 20000000 },
                    { category: 'Interior', allocated: 127500000, spent: 45000000, committed: 30000000 },
                    { category: 'External Dev', allocated: 45000000, spent: 12000000, committed: 8000000 },
                  ].map((item) => {
                    const available = item.allocated - item.spent - item.committed;
                    const utilization = ((item.spent + item.committed) / item.allocated) * 100;
                    return (
                      <TableRow key={item.category}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>₹{(item.allocated / 10000000).toFixed(2)}Cr</TableCell>
                        <TableCell>₹{(item.spent / 10000000).toFixed(2)}Cr</TableCell>
                        <TableCell>₹{(item.committed / 10000000).toFixed(2)}Cr</TableCell>
                        <TableCell>₹{(available / 10000000).toFixed(2)}Cr</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={utilization} className="w-[60px] h-2" />
                            <span className="text-sm">{utilization.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={utilization > 90 ? 'destructive' : utilization > 70 ? 'secondary' : 'success'}
                          >
                            {utilization > 90 ? 'Critical' : utilization > 70 ? 'Monitor' : 'Healthy'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Phase Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Phase-wise Progress</CardTitle>
                <CardDescription>Planned vs Actual completion</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={phaseProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="phase" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="#3b82f6" />
                    <Bar dataKey="actual" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Task Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
                <CardDescription>Current task breakdown by status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={taskProgressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {taskProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {taskProgressData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value} tasks</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Milestone Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Milestone Achievement Timeline</CardTitle>
              <CardDescription>Key project milestones and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Foundation Complete', date: '2024-02-15', status: 'completed', delay: 0 },
                  { name: 'Structure 50%', date: '2024-04-30', status: 'completed', delay: 0 },
                  { name: 'Structure Complete', date: '2024-07-31', status: 'in-progress', delay: 5 },
                  { name: 'MEP Installation', date: '2024-09-30', status: 'pending', delay: 0 },
                  { name: 'Interior Works', date: '2024-11-30', status: 'pending', delay: 0 },
                  { name: 'Project Handover', date: '2024-12-31', status: 'pending', delay: 0 },
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : milestone.status === 'in-progress' ? (
                        <Timer className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <p className="font-medium">{milestone.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Target: {new Date(milestone.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {milestone.delay > 0 && (
                        <Badge variant="destructive">
                          {milestone.delay} days delay
                        </Badge>
                      )}
                      <Badge 
                        variant={
                          milestone.status === 'completed' ? 'success' :
                          milestone.status === 'in-progress' ? 'default' :
                          'secondary'
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Resource Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Current utilization rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={resourceUtilizationData}>
                    <RadialBar dataKey="utilization" cornerRadius={10} fill="#3b82f6" />
                    <Legend />
                    <RechartsTooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {resourceUtilizationData.map((item) => (
                    <div key={item.resource} className="flex items-center justify-between">
                      <span className="text-sm">{item.resource}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={item.utilization} className="w-[100px] h-2" />
                        <span className="text-sm font-medium">{item.utilization}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance Metrics</CardTitle>
                <CardDescription>Productivity and efficiency indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { team: 'Civil Team', productivity: 92, tasks: 45, onTime: 88 },
                    { team: 'Electrical Team', productivity: 85, tasks: 32, onTime: 90 },
                    { team: 'Plumbing Team', productivity: 78, tasks: 28, onTime: 82 },
                    { team: 'Interior Team', productivity: 88, tasks: 25, onTime: 95 },
                    { team: 'Landscape Team', productivity: 70, tasks: 15, onTime: 75 },
                  ].map((team) => (
                    <div key={team.team} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{team.team}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{team.tasks} tasks</span>
                          <Badge variant="outline">{team.onTime}% on-time</Badge>
                        </div>
                      </div>
                      <Progress value={team.productivity} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Material Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Material Delivery & Consumption</CardTitle>
              <CardDescription>Track material orders and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Ordered</TableHead>
                    <TableHead>Delivered</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Next Delivery</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { material: 'Steel (MT)', ordered: 500, delivered: 450, used: 420, nextDelivery: '2024-01-25' },
                    { material: 'Cement (Bags)', ordered: 10000, delivered: 8500, used: 7800, nextDelivery: '2024-01-24' },
                    { material: 'Bricks (Units)', ordered: 500000, delivered: 450000, used: 425000, nextDelivery: '2024-01-26' },
                    { material: 'Sand (Cu.m)', ordered: 1000, delivered: 850, used: 800, nextDelivery: '2024-01-23' },
                    { material: 'Aggregate (Cu.m)', ordered: 800, delivered: 700, used: 650, nextDelivery: '2024-01-27' },
                  ].map((item) => {
                    const inStock = item.delivered - item.used;
                    const stockPercentage = (inStock / item.delivered) * 100;
                    return (
                      <TableRow key={item.material}>
                        <TableCell className="font-medium">{item.material}</TableCell>
                        <TableCell>{item.ordered.toLocaleString()}</TableCell>
                        <TableCell>{item.delivered.toLocaleString()}</TableCell>
                        <TableCell>{item.used.toLocaleString()}</TableCell>
                        <TableCell>{inStock.toLocaleString()}</TableCell>
                        <TableCell>{new Date(item.nextDelivery).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={stockPercentage < 10 ? 'destructive' : stockPercentage < 20 ? 'secondary' : 'success'}
                          >
                            {stockPercentage < 10 ? 'Low Stock' : stockPercentage < 20 ? 'Monitor' : 'Adequate'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality & Safety Tab */}
        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Quality Score Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Score Trend</CardTitle>
                <CardDescription>Weekly quality assessment scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={qualityScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[80, 100]} />
                    <RechartsTooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Safety Metrics Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Performance Indicators</CardTitle>
                <CardDescription>Multi-dimensional safety assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={safetyMetricsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name="Safety Score" 
                      dataKey="A" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.6} 
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Inspection Results */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quality Inspections</CardTitle>
              <CardDescription>Latest inspection results and compliance status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Area/Component</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Checklist Items</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead>Issues Found</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: '2024-01-17', area: '10th Floor Slab', inspector: 'Quality Team A', items: 25, passRate: 92, issues: 2 },
                    { date: '2024-01-16', area: 'Electrical Work - 5F', inspector: 'External Auditor', items: 20, passRate: 95, issues: 1 },
                    { date: '2024-01-15', area: 'Plumbing - Tower B', inspector: 'Quality Team B', items: 18, passRate: 88, issues: 3 },
                    { date: '2024-01-14', area: 'Foundation Block C', inspector: 'Structural Engineer', items: 30, passRate: 100, issues: 0 },
                    { date: '2024-01-13', area: 'Safety Equipment', inspector: 'Safety Officer', items: 15, passRate: 93, issues: 1 },
                  ].map((inspection, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(inspection.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{inspection.area}</TableCell>
                      <TableCell>{inspection.inspector}</TableCell>
                      <TableCell>{inspection.items}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={inspection.passRate} className="w-[60px] h-2" />
                          <span className="text-sm">{inspection.passRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={inspection.issues > 2 ? 'destructive' : inspection.issues > 0 ? 'secondary' : 'success'}>
                          {inspection.issues} issues
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {inspection.passRate === 100 ? (
                          <Badge variant="success">Passed</Badge>
                        ) : inspection.passRate >= 90 ? (
                          <Badge variant="secondary">Minor Issues</Badge>
                        ) : (
                          <Badge variant="destructive">Needs Attention</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* DPR Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>DPR Submission Compliance</CardTitle>
                <CardDescription>Daily Progress Report submission status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dprComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="submitted" stackId="a" fill="#10b981" />
                    <Bar dataKey="pending" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Regulatory Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance Status</CardTitle>
                <CardDescription>Permits and approvals tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { item: 'Building Permit', status: 'valid', expiry: '2025-12-31' },
                    { item: 'Environmental Clearance', status: 'valid', expiry: '2026-11-14' },
                    { item: 'Fire NOC', status: 'renewal', expiry: '2024-02-15' },
                    { item: 'Labour License', status: 'valid', expiry: '2024-12-31' },
                    { item: 'Electrical Safety', status: 'valid', expiry: '2024-06-30' },
                    { item: 'Structural Stability', status: 'pending', expiry: 'N/A' },
                  ].map((item) => (
                    <div key={item.item} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === 'valid' ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : item.status === 'renewal' ? (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium">{item.item}</p>
                          {item.expiry !== 'N/A' && (
                            <p className="text-sm text-muted-foreground">
                              Expires: {new Date(item.expiry).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant={
                          item.status === 'valid' ? 'success' :
                          item.status === 'renewal' ? 'secondary' :
                          'outline'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Approval Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Approval Status</CardTitle>
              <CardDescription>Track customer approvals and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { item: 'Floor Plan - Tower A', type: 'Design', submitted: '2024-01-10', customer: 'Rajesh Kumar', status: 'approved', responseTime: '2 days', comments: 'Looks good' },
                    { item: 'Material Selection', type: 'Materials', submitted: '2024-01-12', customer: 'Priya Singh', status: 'approved', responseTime: '1 day', comments: 'Approved with minor changes' },
                    { item: 'Interior Design', type: 'Design', submitted: '2024-01-15', customer: 'Amit Patel', status: 'pending', responseTime: '-', comments: 'Under review' },
                    { item: 'Budget Revision', type: 'Financial', submitted: '2024-01-14', customer: 'Rajesh Kumar', status: 'rejected', responseTime: '3 days', comments: 'Need more details' },
                    { item: 'Timeline Extension', type: 'Schedule', submitted: '2024-01-16', customer: 'All Customers', status: 'pending', responseTime: '-', comments: 'Awaiting response' },
                  ].map((approval, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{approval.item}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{approval.type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(approval.submitted).toLocaleDateString()}</TableCell>
                      <TableCell>{approval.customer}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            approval.status === 'approved' ? 'success' :
                            approval.status === 'rejected' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {approval.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{approval.responseTime}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {approval.comments}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Executive Summary Tab */}
        <TabsContent value="executive" className="space-y-4">
          {/* Executive Dashboard Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Project Health Score</CardTitle>
                <CardDescription>Overall project performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="text-4xl font-bold text-center">85%</div>
                    <p className="text-sm text-muted-foreground text-center mt-2">Healthy</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Schedule</span>
                    <span className="font-medium">On Track</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Budget</span>
                    <span className="font-medium text-green-600">Under Budget</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quality</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Safety</span>
                    <span className="font-medium">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Risks & Issues</CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-sm">Material Delay</AlertTitle>
                    <AlertDescription className="text-xs">
                      Steel delivery delayed by 3 days
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-sm">Weather Impact</AlertTitle>
                    <AlertDescription className="text-xs">
                      Rain forecast may affect concrete work
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="text-sm">Permit Renewal</AlertTitle>
                    <AlertDescription className="text-xs">
                      Fire NOC renewal due in 30 days
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction</CardTitle>
                <CardDescription>Based on recent feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={cn(
                            "h-6 w-6",
                            star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <div className="text-2xl font-bold">4.5/5</div>
                    <p className="text-sm text-muted-foreground mt-1">Excellent</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Communication</span>
                    <span className="font-medium">4.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality</span>
                    <span className="font-medium">4.6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Timeline</span>
                    <span className="font-medium">4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transparency</span>
                    <span className="font-medium">4.7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary Report */}
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>High-level project overview for stakeholders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="grid gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Project Status</h4>
                    <p className="text-sm text-muted-foreground">
                      The Skyline Towers Phase 2 project is currently at 68% completion with all major milestones on track. 
                      The project is operating within budget with a positive variance of 2.5%. Quality metrics remain strong at 92%, 
                      and safety performance exceeds targets at 95%.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements This Period</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Completed 10th floor slab casting ahead of schedule</li>
                      <li>• Achieved 100% safety compliance for the month</li>
                      <li>• Customer satisfaction rating improved to 4.5/5</li>
                      <li>• Successfully passed structural audit for floors 1-10</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Upcoming Milestones</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete structure up to 15th floor by Feb 15</li>
                      <li>• Begin MEP installation on lower floors</li>
                      <li>• Interior work commencement for sample flat</li>
                      <li>• Customer walkthrough scheduled for Feb 20</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Action Items</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Expedite steel delivery to avoid delays</li>
                      <li>• Renew Fire NOC before expiry</li>
                      <li>• Address customer feedback on design changes</li>
                      <li>• Prepare for upcoming weather challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { useState, useEffect } from 'react';
import {
  Building2, TrendingUp, AlertTriangle, CheckCircle, Clock, Users, Calendar,
  DollarSign, Shield, HardHat, FileText, Package, Wrench, Zap, Target,
  Activity, BarChart3, PieChart, TrendingDown, AlertCircle, Info,
  ChevronRight, ArrowUp, ArrowDown, MoreVertical, Eye, Download,
  Bell, Settings, Filter, Search, RefreshCw, Layers, GitBranch
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Import comprehensive project management data
import {
  sampleProjectManagementData,
  getActiveTasks,
  getUpcomingMilestones,
  getHighPriorityRisks,
  getPendingApprovals,
  ProjectManagement
} from '@/data/sample-project-management';

export default function EnhancedProjectDashboard() {
  const [selectedProject, setSelectedProject] = useState<ProjectManagement>(sampleProjectManagementData[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('month');

  // Calculate dashboard metrics
  const calculateMetrics = () => {
    const project = selectedProject;
    
    // Schedule metrics
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = project.tasks.filter(t => {
      const dueDate = new Date(t.endDate);
      return dueDate < new Date() && t.status !== 'completed';
    }).length;
    
    // Financial metrics
    const budgetUtilization = (project.actualCost! / project.approvedBudget) * 100;
    const costVariance = ((project.actualCost! - project.estimatedBudget) / project.estimatedBudget) * 100;
    
    // Risk metrics
    const highRisks = project.riskRegister.filter(r => r.riskScore >= 12).length;
    const activeRisks = project.riskRegister.filter(r => r.status !== 'closed').length;
    
    // Quality & Safety metrics
    const qualityScore = project.kpis?.qualityScore || 0;
    const safetyScore = project.kpis?.safetyScore || 0;
    const safetyIncidents = project.safetyIncidents.length;
    
    // Resource metrics
    const activeResources = project.resources.filter(r => r.allocatedTo.length > 0).length;
    const resourceUtilization = project.resources.reduce((acc, r) => acc + r.availability, 0) / project.resources.length;
    
    return {
      schedule: {
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate: (completedTasks / totalTasks) * 100,
        scheduleVariance: project.kpis?.scheduleVariance || 0
      },
      financial: {
        budgetUtilization,
        costVariance,
        totalBudget: project.approvedBudget,
        spent: project.actualCost || 0,
        remaining: project.approvedBudget - (project.actualCost || 0)
      },
      risk: {
        highRisks,
        activeRisks,
        totalRisks: project.riskRegister.length
      },
      quality: {
        qualityScore,
        safetyScore,
        safetyIncidents,
        qualityLogs: project.qualityLogs.length,
        passRate: project.qualityLogs.filter(q => q.result === 'pass').length / project.qualityLogs.length * 100
      },
      resources: {
        activeResources,
        totalResources: project.resources.length,
        utilization: resourceUtilization
      }
    };
  };

  const metrics = calculateMetrics();
  const activeTasks = getActiveTasks();
  const upcomingMilestones = getUpcomingMilestones(30);
  const highPriorityRisks = getHighPriorityRisks();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(2)} L`;
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">{selectedProject.projectName}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            <span className="block sm:inline">Project Code: {selectedProject.projectCode}</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Status: {selectedProject.projectStatus}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="hidden sm:inline-flex">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <Button className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((metrics.schedule.completedTasks / metrics.schedule.totalTasks) * 100).toFixed(1)}%
            </div>
            <Progress value={(metrics.schedule.completedTasks / metrics.schedule.totalTasks) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {metrics.schedule.completedTasks} of {metrics.schedule.totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.financial.budgetUtilization.toFixed(1)}%</div>
            <Progress value={metrics.financial.budgetUtilization} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {formatNumber(metrics.financial.spent)} of {formatNumber(metrics.financial.totalBudget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{metrics.quality.qualityScore}</div>
              <span className="text-sm text-green-600">+2.5%</span>
            </div>
            <Progress value={metrics.quality.qualityScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Target: 95 | Pass Rate: {metrics.quality.passRate.toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Performance</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{metrics.quality.safetyScore}</div>
              <span className="text-sm text-green-600">Excellent</span>
            </div>
            <Progress value={metrics.quality.safetyScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {metrics.quality.safetyIncidents} incidents this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Key milestones and deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedProject.milestones.slice(0, 5).map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      milestone.status === 'achieved' ? "bg-green-100" : "bg-gray-100"
                    )}>
                      {milestone.status === 'achieved' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(milestone.date).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {milestone.paymentLinked && (
                      <Badge variant="outline" className="text-xs">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {milestone.paymentPercentage}%
                      </Badge>
                    )}
                    {milestone.criticalPath && (
                      <Badge variant="destructive" className="text-xs">
                        Critical Path
                      </Badge>
                    )}
                    <Badge className={cn(
                      "text-xs",
                      milestone.status === 'achieved' && "bg-green-100 text-green-700",
                      milestone.status === 'pending' && "bg-yellow-100 text-yellow-700",
                      milestone.status === 'delayed' && "bg-red-100 text-red-700"
                    )}>
                      {milestone.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Overview</CardTitle>
            <CardDescription>Active risks requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Risks</span>
                <span className="text-2xl font-bold">{metrics.risk.totalRisks}</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">High Priority</span>
                  </div>
                  <span className="font-medium">{metrics.risk.highRisks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Active Risks</span>
                  </div>
                  <span className="font-medium">{metrics.risk.activeRisks}</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                {highPriorityRisks.slice(0, 3).map((risk) => (
                  <Alert key={risk.id} className="py-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>{risk.title}</strong>
                      <p className="text-muted-foreground mt-1">{risk.category} - Score: {risk.riskScore}</p>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Tasks</CardTitle>
                  <CardDescription>Tasks currently in progress</CardDescription>
                </div>
                <Button size="sm">View All Tasks</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedProject.tasks.filter(t => t.status === 'in-progress').map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.code}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {task.assignee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={task.percentComplete} className="w-16" />
                          <span className="text-sm">{task.percentComplete}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(task.endDate).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "text-xs",
                          task.priority === 'critical' && "bg-red-100 text-red-700",
                          task.priority === 'high' && "bg-orange-100 text-orange-700",
                          task.priority === 'medium' && "bg-yellow-100 text-yellow-700",
                          task.priority === 'low' && "bg-green-100 text-green-700"
                        )}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {task.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Human Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProject.resources.filter(r => r.type === 'human').slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{resource.availability}%</p>
                        <p className="text-xs text-muted-foreground">Available</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProject.resources.filter(r => r.type === 'equipment').slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.vendor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(resource.rate)}</p>
                        <p className="text-xs text-muted-foreground">{resource.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProject.resources.filter(r => r.type === 'material').slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{resource.name}</p>
                        <p className="text-xs text-muted-foreground">{resource.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{resource.totalAllocated}</p>
                        <p className="text-xs text-muted-foreground">{resource.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(selectedProject.costBreakdown || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(value / selectedProject.approvedBudget) * 100} className="w-20" />
                        <span className="text-sm font-medium">{formatNumber(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProject.invoices.slice(0, 4).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{invoice.invoiceNumber}</p>
                        <p className="text-xs text-muted-foreground">{invoice.vendor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatNumber(invoice.totalAmount)}</p>
                        <Badge className={cn(
                          "text-xs",
                          invoice.status === 'paid' && "bg-green-100 text-green-700",
                          invoice.status === 'submitted' && "bg-blue-100 text-blue-700",
                          invoice.status === 'overdue' && "bg-red-100 text-red-700"
                        )}>
                          {invoice.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quality Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedProject.qualityLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{log.element}</p>
                        <p className="text-xs text-muted-foreground">{log.area}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.date).toLocaleDateString('en-IN')}
                        </span>
                        <Badge className={cn(
                          "text-xs",
                          log.result === 'pass' && "bg-green-100 text-green-700",
                          log.result === 'fail' && "bg-red-100 text-red-700",
                          log.result === 'conditional' && "bg-yellow-100 text-yellow-700"
                        )}>
                          {log.result}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProject.safetyIncidents.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">No incidents reported</p>
                    <p className="text-xs text-muted-foreground">Maintaining excellent safety record</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedProject.safetyIncidents.slice(0, 3).map((incident) => (
                      <Alert key={incident.id} className="py-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-medium">{incident.type}</p>
                              <p className="text-xs text-muted-foreground">{incident.location}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {incident.status}
                            </Badge>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Vendors</CardTitle>
              <CardDescription>Contractors and suppliers currently engaged</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Contract Value</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedProject.vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{vendor.companyName}</p>
                          <p className="text-xs text-muted-foreground">{vendor.contact.primaryContact}</p>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{vendor.type}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {vendor.specialization.slice(0, 2).map((spec) => (
                            <Badge key={spec} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{formatNumber(vendor.totalBusinessValue)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{vendor.performanceRating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "w-1 h-3 mx-0.5",
                                  i < Math.floor(vendor.performanceRating)
                                    ? "bg-yellow-400"
                                    : "bg-gray-200"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Reports</CardTitle>
                  <CardDescription>Generated reports and documents</CardDescription>
                </div>
                <Button size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedProject.reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Generated by {report.generatedBy} on {new Date(report.generatedDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {report.type}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Status Bar */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span>System Status: Online</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-muted-foreground">
                Last Updated: {new Date().toLocaleTimeString('en-IN')}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                Next Review: {new Date(selectedProject.nextReviewDate || '').toLocaleDateString('en-IN')}
              </span>
              <Badge variant="outline">
                Data Source: ERP System
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
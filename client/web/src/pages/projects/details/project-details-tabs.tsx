import { useState, lazy, Suspense } from 'react';
import { format } from 'date-fns';
import {
  Users,
  DollarSign,
  FileText,
  CheckSquare,
  BarChart3,
  Activity,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  UserPlus,
  UserCheck,
  Shield,
  Award,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  FolderOpen,
  File,
  Image,
  Film,
  FileX,
  Paperclip,
  ExternalLink,
  Copy,
  Share2,
  Printer,
  Archive,
  ChevronRight,
  Building2,
  MapPin,
  Briefcase,
  Target,
  DollarSignIcon,
  CircleDollarSign,
  Receipt,
  CreditCard,
  Wallet,
  Calculator,
  ArrowUp,
  ArrowDown,
  Info,
  HelpCircle,
  Settings,
  ChevronDown,
  Hash,
  Percent,
  Timer,
  Flag,
  GitBranch,
  Zap,
  MessageCircle,
  ThumbsUp,
  Heart,
  ArrowRight,
  Save,
  CheckCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ProjectCalendar } from './project-calendar';

// Lazy load the ProjectDocuments component
const ProjectDocuments = lazy(() => import('@/pages/projects/documents/project-documents'));

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

interface ProjectDetailsTabsProps {
  project: any;
  activeTab: string;
}

export function TeamTab({ project }: { project: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock team members data
  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Project Manager', department: 'Management', email: 'sarah.j@company.com', phone: '+1 555-0101', avatar: '', status: 'active', allocation: 100 },
    { id: 2, name: 'Mike Chen', role: 'Site Manager', department: 'Construction', email: 'mike.c@company.com', phone: '+1 555-0102', avatar: '', status: 'active', allocation: 100 },
    { id: 3, name: 'Emily Davis', role: 'Lead Engineer', department: 'Engineering', email: 'emily.d@company.com', phone: '+1 555-0103', avatar: '', status: 'active', allocation: 80 },
    { id: 4, name: 'Robert Wilson', role: 'Safety Officer', department: 'Safety', email: 'robert.w@company.com', phone: '+1 555-0104', avatar: '', status: 'active', allocation: 100 },
    { id: 5, name: 'Lisa Anderson', role: 'Quality Manager', department: 'Quality', email: 'lisa.a@company.com', phone: '+1 555-0105', avatar: '', status: 'active', allocation: 75 },
    { id: 6, name: 'James Brown', role: 'Procurement Manager', department: 'Procurement', email: 'james.b@company.com', phone: '+1 555-0106', avatar: '', status: 'active', allocation: 90 },
  ];

  const departmentData = project.team.departments.map((dept: any) => ({
    ...dept,
    fill: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'][project.team.departments.indexOf(dept)]
  }));

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team & Resources</h2>
          <p className="text-muted-foreground">
            {project.team.totalMembers} total members across {project.team.departments.length} departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{project.team.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-2xl font-bold">{project.team.employees}</p>
              </div>
              <UserCheck className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contractors</p>
                <p className="text-2xl font-bold">{project.team.contractors}</p>
              </div>
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{project.team.departments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Team members by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>By department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {departmentData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>All project team members and their details</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {project.team.departments.map((dept: any) => (
                    <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className={cn(getAvatarColor(member.id), 'text-white font-bold text-sm')}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={member.allocation} className="w-16" />
                      <span className="text-sm">{member.allocation}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                      {member.status}
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Remove from Project
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
    </div>
  );
}

export function BudgetTab({ project }: { project: any }) {
  const budgetBreakdown = [
    { category: 'Labor', allocated: 45000000, spent: 18000000, percentage: 40 },
    { category: 'Materials', allocated: 35000000, spent: 12500000, percentage: 35.7 },
    { category: 'Equipment', allocated: 20000000, spent: 7000000, percentage: 35 },
    { category: 'Subcontractors', allocated: 15000000, spent: 4500000, percentage: 30 },
    { category: 'Overhead', allocated: 5000000, spent: 500000, percentage: 10 },
  ];

  const monthlySpending = [
    { month: 'Jan', planned: 8000000, actual: 7500000 },
    { month: 'Feb', planned: 9000000, actual: 8800000 },
    { month: 'Mar', planned: 10000000, actual: 9500000 },
    { month: 'Apr', planned: 11000000, actual: 10800000 },
    { month: 'May', planned: 12000000, actual: 11500000 },
    { month: 'Jun', planned: 13000000, actual: 12400000 },
  ];

  return (
    <div className="space-y-6">
      {/* Budget Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budget & Financials</h2>
          <p className="text-muted-foreground">
            Total Budget: ${(project.budget.total / 1000000).toFixed(1)}M | 
            Spent: ${(project.budget.spent / 1000000).toFixed(1)}M ({((project.budget.spent / project.budget.total) * 100).toFixed(1)}%)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">${(project.budget.total / 1000000).toFixed(1)}M</p>
              </div>
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold">${(project.budget.spent / 1000000).toFixed(1)}M</p>
              </div>
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Committed</p>
                <p className="text-2xl font-bold">${(project.budget.committed / 1000000).toFixed(1)}M</p>
              </div>
              <Receipt className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-green-600">${(project.budget.remaining / 1000000).toFixed(1)}M</p>
              </div>
              <CircleDollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CPI</p>
                <p className="text-2xl font-bold flex items-center gap-1">
                  {project.budget.costPerformanceIndex}
                  {project.budget.costPerformanceIndex >= 1 ? (
                    <ArrowUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-600" />
                  )}
                </p>
              </div>
              <Target className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trend</CardTitle>
          <CardDescription>Planned vs Actual monthly spending</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
              <RechartsTooltip formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} name="Planned" />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Breakdown by Category</CardTitle>
          <CardDescription>Allocation and spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetBreakdown.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>${(item.allocated / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>${(item.spent / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>${((item.allocated - item.spent) / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.percentage} className="w-20" />
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.percentage > 80 ? "destructive" : item.percentage > 60 ? "warning" : "success"}>
                      {item.percentage > 80 ? "High" : item.percentage > 60 ? "Medium" : "Low"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function TasksTab({ project }: { project: any }) {
  const tasks = [
    { id: 1, title: 'Complete foundation inspection', status: 'completed', priority: 'high', assignee: 'Mike Chen', dueDate: '2024-11-15', progress: 100 },
    { id: 2, title: 'Install electrical wiring - Floor 5', status: 'in-progress', priority: 'high', assignee: 'John Doe', dueDate: '2024-11-25', progress: 65 },
    { id: 3, title: 'Review structural drawings', status: 'in-progress', priority: 'medium', assignee: 'Emily Davis', dueDate: '2024-11-22', progress: 40 },
    { id: 4, title: 'Order HVAC equipment', status: 'pending', priority: 'high', assignee: 'James Brown', dueDate: '2024-11-28', progress: 0 },
    { id: 5, title: 'Safety training session', status: 'pending', priority: 'medium', assignee: 'Robert Wilson', dueDate: '2024-11-30', progress: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Tasks Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tasks & Activities</h2>
          <p className="text-muted-foreground">
            {project.tasks.total} total tasks | {project.tasks.completed} completed | {project.tasks.overdue} overdue
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{project.tasks.total}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{project.tasks.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{project.tasks.inProgress}</p>
              </div>
              <Timer className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{project.tasks.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-orange-600">{project.tasks.critical}</p>
              </div>
              <Flag className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tasks</CardTitle>
          <CardDescription>Current and upcoming project tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox checked={task.status === 'completed'} />
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={cn(getAvatarColor(task.id + task.assignee), 'text-white font-bold text-xs')}>
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      task.priority === 'high' ? 'destructive' :
                      task.priority === 'medium' ? 'warning' :
                      'secondary'
                    }>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="w-20" />
                      <span className="text-sm">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      task.status === 'completed' ? 'success' :
                      task.status === 'in-progress' ? 'default' :
                      'secondary'
                    }>
                      {task.status}
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
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Reassign
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Task
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
    </div>
  );
}

export function DocumentsTab({ project }: { project: any }) {
  // Use the full ProjectDocuments component with lazy loading
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    }>
      <div className="h-full -m-6">
        <ProjectDocuments />
      </div>
    </Suspense>
  );
}

export function DetailsTab({ project }: { project: any }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState<any>(null);

  // Initialize with project details or defaults
  const projectDetails = {
    plot: {
      size: '12,500 sq ft',
      dimensions: '100 x 125 ft',
      facing: 'North-East',
      soilType: 'Clay Loam',
      topography: 'Level Ground',
      surveyNumber: 'SV-2024-001',
      zoning: 'Commercial Mixed Use',
      setbacks: {
        front: '20 ft',
        rear: '15 ft',
        left: '10 ft',
        right: '10 ft'
      }
    },
    design: {
      architect: 'Sterling Architecture Inc.',
      structuralEngineer: 'BuildStrong Consultants',
      mepConsultant: 'MEP Solutions Ltd.',
      landscapeDesigner: 'GreenScape Studios',
      interiorDesigner: 'Elite Interiors',
      designStyle: 'Modern Contemporary',
      sustainabilityRating: 'LEED Gold',
      approvalStatus: 'Approved',
      approvalDate: '2024-01-10',
      permitNumber: 'BP-2024-0156'
    },
    structure: {
      type: 'RCC Frame Structure',
      foundation: 'Raft Foundation',
      floors: 45,
      basements: 3,
      towers: 2,
      totalUnits: 240,
      parkingLevels: 5,
      totalParkingSpaces: 480,
      builtUpArea: '450,000 sq ft',
      carpetArea: '320,000 sq ft',
      commonArea: '130,000 sq ft',
      efficiency: '71%'
    },
    units: {
      residential: [
        { type: '1 BHK', count: 60, area: '650 sq ft', price: '$250,000' },
        { type: '2 BHK', count: 80, area: '1,100 sq ft', price: '$420,000' },
        { type: '3 BHK', count: 60, area: '1,500 sq ft', price: '$650,000' },
        { type: '4 BHK', count: 30, area: '2,200 sq ft', price: '$950,000' },
        { type: 'Penthouse', count: 10, area: '3,500 sq ft', price: '$1,500,000' }
      ],
      commercial: [
        { type: 'Retail Shops', count: 25, area: '200-500 sq ft', price: '$500-1,500/sq ft' },
        { type: 'Office Spaces', count: 15, area: '1,000-5,000 sq ft', price: '$80/sq ft/month' },
        { type: 'Food Court', count: 1, area: '8,000 sq ft', price: 'On Lease' }
      ]
    },
    amenities: [
      'Swimming Pool', 'Gymnasium', 'Clubhouse', 'Children\'s Play Area',
      'Jogging Track', 'Basketball Court', 'Tennis Court', 'Amphitheater',
      'Party Hall', 'Guest Suites', 'Spa & Sauna', 'Yoga Studio',
      'Library', 'Business Center', 'Cafeteria', 'Medical Center'
    ],
    specifications: {
      flooring: 'Vitrified Tiles / Wooden Flooring',
      kitchen: 'Modular Kitchen with Granite Platform',
      bathroom: 'Premium CP Fittings, Anti-skid Tiles',
      doors: 'Main - Teak Wood, Internal - Flush Doors',
      windows: 'UPVC with Mosquito Mesh',
      electricals: 'Concealed Copper Wiring, LED Fixtures',
      plumbing: 'CPVC Pipes, Premium Fittings',
      paint: 'Premium Emulsion Paint',
      elevator: '6 High-speed Elevators per Tower',
      security: '24x7 CCTV, Access Control, Intercom'
    },
    timeline: {
      projectStart: '2024-01-15',
      foundationComplete: '2024-04-30',
      structureComplete: '2024-11-30',
      mepComplete: '2025-03-15',
      finishingComplete: '2025-07-30',
      handover: '2025-12-31',
      possessionStart: '2026-01-15'
    },
    compliance: {
      environmentalClearance: 'EC-2023-1245',
      fireSafety: 'FS-2024-0089',
      occupancyCertificate: 'Pending',
      completionCertificate: 'Pending',
      buildingPlan: 'BP-2024-0156',
      waterConnection: 'Applied',
      electricityConnection: 'Sanctioned',
      sewerageConnection: 'Approved'
    },
    financial: {
      totalProjectCost: '$125,000,000',
      landCost: '$25,000,000',
      constructionCost: '$85,000,000',
      otherCosts: '$15,000,000',
      expectedRevenue: '$175,000,000',
      expectedROI: '40%',
      fundingSource: 'Bank Loan (60%) + Equity (40%)',
      bankName: 'National Development Bank',
      loanAmount: '$75,000,000',
      loanStatus: 'Disbursed - 45%'
    }
  };

  const handleEdit = () => {
    setEditedDetails({ ...projectDetails });
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Here you would save the edited details to your backend
    console.log('Saving details:', editedDetails);
    setIsEditMode(false);
    // Show success message
  };

  const handleCancel = () => {
    setEditedDetails(null);
    setIsEditMode(false);
  };

  const details = editedDetails || projectDetails;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Details</h2>
          <p className="text-muted-foreground">
            Comprehensive information about the project from plot to handover
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditMode ? (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Plot Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Plot Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground">Plot Size</Label>
              <p className="font-medium">{details.plot.size}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Dimensions</Label>
              <p className="font-medium">{details.plot.dimensions}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Facing</Label>
              <p className="font-medium">{details.plot.facing}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Soil Type</Label>
              <p className="font-medium">{details.plot.soilType}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Survey Number</Label>
              <p className="font-medium">{details.plot.surveyNumber}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Zoning</Label>
              <p className="font-medium">{details.plot.zoning}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design & Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Design & Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground">Architect</Label>
              <p className="font-medium">{details.design.architect}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Structural Engineer</Label>
              <p className="font-medium">{details.design.structuralEngineer}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Design Style</Label>
              <p className="font-medium">{details.design.designStyle}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Sustainability Rating</Label>
              <Badge className="bg-green-100 text-green-700">{details.design.sustainabilityRating}</Badge>
            </div>
            <div>
              <Label className="text-muted-foreground">Permit Number</Label>
              <p className="font-medium">{details.design.permitNumber}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Approval Status</Label>
              <Badge className="bg-green-100 text-green-700">{details.design.approvalStatus}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Structure & Construction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-muted-foreground">Structure Type</Label>
              <p className="font-medium">{details.structure.type}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Total Floors</Label>
              <p className="font-medium">{details.structure.floors}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Basements</Label>
              <p className="font-medium">{details.structure.basements}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Total Units</Label>
              <p className="font-medium">{details.structure.totalUnits}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Built-up Area</Label>
              <p className="font-medium">{details.structure.builtUpArea}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Carpet Area</Label>
              <p className="font-medium">{details.structure.carpetArea}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Parking Spaces</Label>
              <p className="font-medium">{details.structure.totalParkingSpaces}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Efficiency</Label>
              <p className="font-medium">{details.structure.efficiency}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Residential Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.units.residential.map((unit: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{unit.type}</TableCell>
                    <TableCell>{unit.count}</TableCell>
                    <TableCell>{unit.area}</TableCell>
                    <TableCell>{unit.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Commercial Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details.units.commercial.map((unit: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{unit.type}</TableCell>
                    <TableCell>{unit.count}</TableCell>
                    <TableCell>{unit.area}</TableCell>
                    <TableCell>{unit.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(details.specifications).map(([key, value]) => (
              <div key={key}>
                <Label className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {details.amenities.map((amenity: string, index: number) => (
              <Badge key={index} variant="secondary" className="justify-start p-2">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-muted-foreground">Project Start</Label>
              <p className="font-medium">{format(new Date(details.timeline.projectStart), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Structure Complete</Label>
              <p className="font-medium">{format(new Date(details.timeline.structureComplete), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Finishing Complete</Label>
              <p className="font-medium">{format(new Date(details.timeline.finishingComplete), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Handover</Label>
              <p className="font-medium">{format(new Date(details.timeline.handover), 'MMM dd, yyyy')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground">Total Project Cost</Label>
              <p className="font-medium text-lg">{details.financial.totalProjectCost}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Expected Revenue</Label>
              <p className="font-medium text-lg">{details.financial.expectedRevenue}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Expected ROI</Label>
              <Badge className="bg-green-100 text-green-700 text-lg px-3 py-1">{details.financial.expectedROI}</Badge>
            </div>
            <div>
              <Label className="text-muted-foreground">Land Cost</Label>
              <p className="font-medium">{details.financial.landCost}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Construction Cost</Label>
              <p className="font-medium">{details.financial.constructionCost}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Loan Status</Label>
              <p className="font-medium">{details.financial.loanStatus}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Approvals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance & Approvals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(details.compliance).map(([key, value]: [string, any]) => (
              <div key={key}>
                <Label className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{value}</p>
                  {value === 'Approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {value === 'Pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ReportsTab({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive project performance analytics and reporting
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Schedule Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(project.performance.spi * 100).toFixed(0)}%</div>
            <Progress value={project.performance.spi * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Cost Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(project.performance.cpi * 100).toFixed(0)}%</div>
            <Progress value={project.performance.cpi * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.performance.qualityIndex}%</div>
            <Progress value={project.performance.qualityIndex} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.performance.safetyIndex}%</div>
            <Progress value={project.performance.safetyIndex} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <BarChart3 className="h-12 w-12 mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Weekly Progress Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed weekly progress analysis with milestone tracking
            </p>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <DollarSign className="h-12 w-12 mb-4 text-green-600" />
            <h3 className="font-semibold mb-2">Financial Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete financial overview with budget analysis
            </p>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <Shield className="h-12 w-12 mb-4 text-orange-600" />
            <h3 className="font-semibold mb-2">Safety & Compliance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Safety incidents and compliance status report
            </p>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function CalendarTab({ project }: { project: any }) {
  return (
    <div className="h-full">
      <ProjectCalendar project={project} />
    </div>
  );
}

export function ActivityTab({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      {/* Activity Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Activity Feed</h2>
          <p className="text-muted-foreground">
            Complete project activity history and audit trail
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </Button>
        </div>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {project.activities.map((activity: any) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center",
                      activity.type === 'milestone' && "bg-green-100",
                      activity.type === 'issue' && "bg-yellow-100",
                      activity.type === 'document' && "bg-blue-100",
                      activity.type === 'meeting' && "bg-purple-100"
                    )}>
                      <Icon className={cn("h-5 w-5", activity.color)} />
                    </div>
                    {activity.id !== project.activities.length && (
                      <div className="absolute top-10 left-5 w-0.5 h-16 bg-border" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-muted-foreground">{activity.user}</span>
                          <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
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
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Add Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
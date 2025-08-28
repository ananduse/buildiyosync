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
  Palette,
  Home,
  ArrowUp,
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
  const [activeSection, setActiveSection] = useState<string>('plot');

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

  // Section navigation items
  const sections = [
    { id: 'plot', label: 'Plot Info', icon: MapPin },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'structure', label: 'Structure', icon: Building2 },
    { id: 'units', label: 'Units', icon: Home },
    { id: 'specs', label: 'Specifications', icon: Settings },
    { id: 'amenities', label: 'Amenities', icon: Star },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'compliance', label: 'Compliance', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Modern Header with Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Project Details
            </h2>
            <p className="text-muted-foreground mt-2">
              Comprehensive information about the project from plot to handover
            </p>
          </div>
          <div className="flex gap-2">
            {!isEditMode ? (
              <>
                <Button variant="ghost" size="sm" className="hover:bg-white/50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-white/50">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap",
                activeSection === section.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              )}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Plot Details */}
      {(activeSection === 'plot' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xl">Plot Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Plot Size</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.plot.size}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Dimensions</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.plot.dimensions}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Facing</Label>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.plot.facing}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Premium</Badge>
                </div>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Soil Type</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.plot.soilType}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Survey Number</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.plot.surveyNumber}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Zoning</Label>
                <Badge variant="outline" className="text-base px-3 py-1">{details.plot.zoning}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Design & Architecture */}
      {(activeSection === 'design' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Palette className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xl">Design & Architecture</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Architect</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.design.architect}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Structural Engineer</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.design.structuralEngineer}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Design Style</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.design.designStyle}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Sustainability</Label>
                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1">
                  {details.design.sustainabilityRating}
                </Badge>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Permit Number</Label>
                <p className="text-lg font-semibold group-hover:text-primary transition-colors">{details.design.permitNumber}</p>
              </div>
              <div className="group">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Status</Label>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {details.design.approvalStatus}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Structure Details */}
      {(activeSection === 'structure' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-amber-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Building2 className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xl">Structure & Construction</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Floors</Label>
                <p className="text-2xl font-bold text-gray-800">{details.structure.floors}</p>
                <p className="text-xs text-muted-foreground">+ {details.structure.basements} Basements</p>
              </div>
              <div className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Total Units</Label>
                <p className="text-2xl font-bold text-gray-800">{details.structure.totalUnits}</p>
                <p className="text-xs text-muted-foreground">Residential + Commercial</p>
              </div>
              <div className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Parking</Label>
                <p className="text-2xl font-bold text-gray-800">{details.structure.totalParkingSpaces}</p>
                <p className="text-xs text-muted-foreground">Spaces Available</p>
              </div>
              <div className="group p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Efficiency</Label>
                <p className="text-2xl font-bold text-green-600">{details.structure.efficiency}</p>
                <p className="text-xs text-muted-foreground">Carpet/Built-up</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Built-up Area</p>
                <p className="text-xl font-bold">{details.structure.builtUpArea}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Carpet Area</p>
                <p className="text-xl font-bold">{details.structure.carpetArea}</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">Common Area</p>
                <p className="text-xl font-bold">{details.structure.commonArea}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Unit Types */}
      {(activeSection === 'units' || activeSection === 'all') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-1" />
            <CardHeader className="bg-gradient-to-br from-indigo-50 to-white">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Home className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-xl">Residential Units</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold text-center">Count</TableHead>
                    <TableHead className="font-semibold">Area</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.units.residential.map((unit: any, index: number) => (
                    <TableRow key={index} className="hover:bg-indigo-50/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {unit.type === 'Penthouse' && <Star className="h-4 w-4 text-yellow-500" />}
                          {unit.type}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{unit.count}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{unit.area}</TableCell>
                      <TableCell className="font-semibold text-indigo-600">{unit.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-1" />
            <CardHeader className="bg-gradient-to-br from-teal-50 to-white">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-teal-600" />
                </div>
                <span className="text-xl">Commercial Units</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold text-center">Count</TableHead>
                    <TableHead className="font-semibold">Area</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {details.units.commercial.map((unit: any, index: number) => (
                    <TableRow key={index} className="hover:bg-teal-50/50 transition-colors">
                      <TableCell className="font-medium">{unit.type}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{unit.count}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{unit.area}</TableCell>
                      <TableCell className="font-semibold text-teal-600">{unit.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Specifications */}
      {(activeSection === 'specs' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-1" />
          <CardHeader className="bg-gradient-to-br from-gray-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-xl">Technical Specifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(details.specifications).map(([key, value]) => (
                <div key={key} className="group p-4 border rounded-lg hover:border-primary hover:bg-gray-50 transition-all">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
                    {key === 'security' && <Shield className="h-3 w-3" />}
                    {key === 'elevator' && <ArrowUp className="h-3 w-3" />}
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <p className="font-medium text-gray-800 group-hover:text-primary transition-colors">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amenities */}
      {(activeSection === 'amenities' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-emerald-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Star className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-xl">Premium Amenities</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {details.amenities.map((amenity: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg hover:from-emerald-100 hover:to-green-100 transition-colors cursor-pointer"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      {(activeSection === 'timeline' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-cyan-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <Clock className="h-5 w-5 text-cyan-600" />
              </div>
              <span className="text-xl">Project Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative">
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-400 rounded-full top-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full mx-auto mb-3 border-4 border-white shadow-lg" />
                  <Badge variant="secondary" className="mb-2">Start</Badge>
                  <p className="font-bold text-lg">{format(new Date(details.timeline.projectStart), 'MMM dd')}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(details.timeline.projectStart), 'yyyy')}</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full mx-auto mb-3 border-4 border-white shadow-lg" />
                  <Badge variant="secondary" className="mb-2">Structure</Badge>
                  <p className="font-bold text-lg">{format(new Date(details.timeline.structureComplete), 'MMM dd')}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(details.timeline.structureComplete), 'yyyy')}</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full mx-auto mb-3 border-4 border-white shadow-lg" />
                  <Badge variant="secondary" className="mb-2">Finishing</Badge>
                  <p className="font-bold text-lg">{format(new Date(details.timeline.finishingComplete), 'MMM dd')}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(details.timeline.finishingComplete), 'yyyy')}</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-3 border-4 border-white shadow-lg" />
                  <Badge className="mb-2 bg-green-100 text-green-700">Handover</Badge>
                  <p className="font-bold text-lg">{format(new Date(details.timeline.handover), 'MMM dd')}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(details.timeline.handover), 'yyyy')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Details */}
      {(activeSection === 'financial' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-yellow-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-xl">Financial Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Total Cost</Label>
                <p className="text-3xl font-bold text-gray-800">{details.financial.totalProjectCost}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Expected Revenue</Label>
                <p className="text-3xl font-bold text-green-600">{details.financial.expectedRevenue}</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Expected ROI</Label>
                <p className="text-3xl font-bold text-blue-600">{details.financial.expectedROI}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Land Cost</Label>
                <p className="font-semibold text-lg mt-1">{details.financial.landCost}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Construction</Label>
                <p className="font-semibold text-lg mt-1">{details.financial.constructionCost}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Loan Status</Label>
                <p className="font-semibold text-lg mt-1">{details.financial.loanStatus}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance & Approvals */}
      {(activeSection === 'compliance' || activeSection === 'all') && (
        <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-1" />
          <CardHeader className="bg-gradient-to-br from-red-50 to-white">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-xl">Compliance & Approvals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(details.compliance).map(([key, value]: [string, any]) => (
                <div key={key} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{value}</p>
                    {value === 'Approved' && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    )}
                    {value === 'Pending' && (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {value === 'Applied' && (
                      <Badge className="bg-blue-100 text-blue-700">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        Applied
                      </Badge>
                    )}
                    {value === 'Sanctioned' && (
                      <Badge className="bg-indigo-100 text-indigo-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* View All Button */}
      {activeSection !== 'all' && (
        <div className="text-center pt-4">
          <Button
            onClick={() => setActiveSection('all')}
            variant="outline"
            className="px-8"
          >
            View All Sections
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
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
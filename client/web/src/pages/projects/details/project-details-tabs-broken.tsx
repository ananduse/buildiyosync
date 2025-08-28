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
  Square,
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

  // Essential project requirements only
  const projectDetails = {
    // Plot Requirements
    plotSize: '12,500 sq ft',
    dimensions: '100 x 125 ft', 
    facing: 'North-East',
    
    // Building Configuration
    floors: '45',
    basements: '3',
    towers: '2',
    totalUnits: '240',
    parkingSpaces: '480',
    
    // Area Distribution
    builtUpArea: '450,000 sq ft',
    carpetArea: '320,000 sq ft',
    
    // Unit Mix
    units: [
      { type: '1 BHK', count: '60', area: '650 sq ft' },
      { type: '2 BHK', count: '80', area: '1,100 sq ft' },
      { type: '3 BHK', count: '60', area: '1,500 sq ft' },
      { type: '4 BHK', count: '30', area: '2,200 sq ft' },
      { type: 'Penthouse', count: '10', area: '3,500 sq ft' }
    ],
    
    // Elevation & Design
    elevationStyle: 'Modern Contemporary',
    exteriorFinish: 'Glass Facade with ACP Cladding',
    buildingHeight: '450 ft',
    
    // Core Specifications
    structureType: 'RCC Frame Structure',
    slabThickness: '150mm - 200mm',
    wallType: 'AAC Blocks',
    
    // Essential Amenities
    amenities: [
      'Swimming Pool',
      'Gymnasium', 
      'Clubhouse',
      'Children\'s Play Area',
      'Parking',
      'Power Backup',
      'Security System'
    ]
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Project Requirements</h2>
        <div className="flex gap-2">
          {!isEditMode ? (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Plot & Land Requirements */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Plot & Land</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Plot Size</p>
              <p className="font-medium">{details.plotSize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dimensions</p>
              <p className="font-medium">{details.dimensions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Facing</p>
              <p className="font-medium">{details.facing}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Configuration */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Building Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.floors}</p>
              <p className="text-xs text-gray-500">Floors</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.basements}</p>
              <p className="text-xs text-gray-500">Basements</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.towers}</p>
              <p className="text-xs text-gray-500">Towers</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.totalUnits}</p>
              <p className="text-xs text-gray-500">Total Units</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.parkingSpaces}</p>
              <p className="text-xs text-gray-500">Parking</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Built-up Area</p>
              <p className="font-medium">{details.builtUpArea}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carpet Area</p>
              <p className="font-medium">{details.carpetArea}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Mix */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Unit Mix</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Units</TableHead>
                <TableHead>Area</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.units.map((unit: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{unit.type}</TableCell>
                  <TableCell className="text-center">{unit.count}</TableCell>
                  <TableCell>{unit.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Elevation & Design */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Elevation & Design</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Elevation Style</p>
              <p className="font-medium">{details.elevationStyle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exterior Finish</p>
              <p className="font-medium">{details.exteriorFinish}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Building Height</p>
              <p className="font-medium">{details.buildingHeight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Specifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Core Specifications</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Structure Type</p>
              <p className="font-medium">{details.structureType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Slab Thickness</p>
              <p className="font-medium">{details.slabThickness}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wall Type</p>
              <p className="font-medium">{details.wallType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essential Amenities */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Essential Amenities</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {details.amenities.map((amenity: string, index: number) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

                    <div className="p-3 bg-green-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Expected ROI</p>
                      <p className="text-2xl font-semibold mt-1 text-green-600">{details.financial.expectedROI}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Project Status Timeline */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200" />
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white" />
                      <div className="flex-1">
                        <p className="font-medium">Design & Planning</p>
                        <p className="text-sm text-gray-500">Completed - Approved</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white" />
                      <div className="flex-1">
                        <p className="font-medium">Permits & Approvals</p>
                        <p className="text-sm text-gray-500">Completed - All permits obtained</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-white animate-pulse" />
                      <div className="flex-1">
                        <p className="font-medium">Construction</p>
                        <p className="text-sm text-gray-500">In Progress - 45% Complete</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative z-10 w-4 h-4 bg-gray-300 rounded-full ring-4 ring-white" />
                      <div className="flex-1">
                        <p className="font-medium">Handover</p>
                        <p className="text-sm text-gray-500">Scheduled - Dec 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plot Information Section */}
        {activeSection === 'plot' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Plot Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Plot Size</dt>
                  <dd className="text-lg font-semibold">{details.plot.size}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Dimensions</dt>
                  <dd className="text-lg font-semibold">{details.plot.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Facing</dt>
                  <dd className="text-lg font-semibold">{details.plot.facing}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Soil Type</dt>
                  <dd className="text-lg font-semibold">{details.plot.soilType}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Survey Number</dt>
                  <dd className="text-lg font-semibold">{details.plot.surveyNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Zoning</dt>
                  <dd className="text-lg font-semibold">{details.plot.zoning}</dd>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Design Section */}
        {activeSection === 'design' && (

          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Design & Architecture</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Architect</dt>
                  <dd className="text-lg font-semibold">{details.design.architect}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Structural Engineer</dt>
                  <dd className="text-lg font-semibold">{details.design.structuralEngineer}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Design Style</dt>
                  <dd className="text-lg font-semibold">{details.design.designStyle}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">MEP Consultant</dt>
                  <dd className="text-lg font-semibold">{details.design.mepConsultant}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Sustainability Rating</dt>
                  <dd>
                    <Badge variant="secondary" className="mt-1">
                      {details.design.sustainabilityRating}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 mb-1">Permit Number</dt>
                  <dd className="text-lg font-semibold">{details.design.permitNumber}</dd>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Structure Section */}
        {activeSection === 'structure' && (

          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Structure & Construction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Area Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Built-up Area</p>
                    <p className="text-xl font-semibold">{details.structure.builtUpArea}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Carpet Area</p>
                    <p className="text-xl font-semibold">{details.structure.carpetArea}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Common Area</p>
                    <p className="text-xl font-semibold">{details.structure.commonArea}</p>
                  </div>
                </div>

                {/* Structure Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Structure Type</dt>
                    <dd className="text-lg font-semibold">{details.structure.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Total Floors</dt>
                    <dd className="text-lg font-semibold">{details.structure.floors}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Total Units</dt>
                    <dd className="text-lg font-semibold">{details.structure.totalUnits}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 mb-1">Parking Spaces</dt>
                    <dd className="text-lg font-semibold">{details.structure.totalParkingSpaces}</dd>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Units Section */}
        {activeSection === 'units' && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-gray-600" />
                  <CardTitle className="text-lg font-medium">Residential Units</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-center">Count</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.units.residential.map((unit: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{unit.type}</TableCell>
                        <TableCell className="text-center">{unit.count}</TableCell>
                        <TableCell>{unit.area}</TableCell>
                        <TableCell className="text-right font-medium">{unit.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-600" />
                  <CardTitle className="text-lg font-medium">Commercial Units</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-center">Count</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.units.commercial.map((unit: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{unit.type}</TableCell>
                        <TableCell className="text-center">{unit.count}</TableCell>
                        <TableCell>{unit.area}</TableCell>
                        <TableCell className="text-right font-medium">{unit.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Other Sections - Keep them simple */}
        {activeSection === 'amenities' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Amenities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {details.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Sections */}
        {activeSection === 'specifications' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Specifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(details.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-medium text-right max-w-[60%]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'timeline' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Project Timeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {Object.entries(details.timeline).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
                    <span className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm font-semibold">
                      {format(new Date(value), 'MMMM dd, yyyy')}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'financial' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Financial Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Land Cost</span>
                      <span className="text-sm font-medium">{details.financial.landCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Construction Cost</span>
                      <span className="text-sm font-medium">{details.financial.constructionCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Other Costs</span>
                      <span className="text-sm font-medium">{details.financial.otherCosts}</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Project Cost</span>
                        <span className="font-semibold">{details.financial.totalProjectCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">Revenue & Returns</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expected Revenue</span>
                      <span className="text-sm font-medium text-green-600">{details.financial.expectedRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Expected ROI</span>
                      <span className="text-sm font-medium text-green-600">{details.financial.expectedROI}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Funding Source</span>
                      <span className="text-sm font-medium">{details.financial.fundingSource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Loan Status</span>
                      <span className="text-sm font-medium">{details.financial.loanStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'compliance' && (
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-medium">Compliance & Approvals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(details.compliance).map(([key, value]: [string, any]) => (
                  <div key={key} className="p-4 bg-gray-50 rounded-lg">
                    <dt className="text-sm text-gray-500 mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="flex items-center justify-between">
                      <span className="text-sm font-medium">{value}</span>
                      {value === 'Approved' && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      {value === 'Pending' && (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                    </dd>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
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
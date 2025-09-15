import { useState, useEffect, lazy, Suspense } from 'react';
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
import ProjectTaskManager from '@/pages/projects/[id]/tasks/project-task-manager';
import ProjectBudgetDetails from '@/pages/projects/[id]/budget/project-budget-details';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Team & Resources</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {project.team.totalMembers} total members across {project.team.departments.length} departments
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Upload className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Import</span>
            <span className="sm:hidden">Import</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-initial">
            <UserPlus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Add Member</span>
            <span className="sm:hidden">Add</span>
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>All project team members and their details</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-40">
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
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Member</TableHead>
                  <TableHead className="min-w-[120px]">Role</TableHead>
                  <TableHead className="min-w-[120px]">Department</TableHead>
                  <TableHead className="min-w-[120px]">Allocation</TableHead>
                  <TableHead className="min-w-[150px]">Contact</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="text-right min-w-[80px]">Actions</TableHead>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function BudgetTab({ project }: { project: any }) {
  // Use comprehensive budget component with all details
  return <ProjectBudgetDetails />;
}

// Original BudgetTab implementation - kept for reference
function BudgetTabOld({ project }: { project: any }) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Budget & Financials</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            <span className="block sm:inline">Total Budget: ${(project.budget.total / 1000000).toFixed(1)}M</span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">Spent: ${(project.budget.spent / 1000000).toFixed(1)}M ({((project.budget.spent / project.budget.total) * 100).toFixed(1)}%)</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Calculator className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Calculate</span>
            <span className="sm:hidden">Calc</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Download className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-initial">
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
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
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Allocated</TableHead>
                  <TableHead className="min-w-[100px]">Spent</TableHead>
                  <TableHead className="min-w-[100px]">Remaining</TableHead>
                  <TableHead className="min-w-[120px]">Utilization</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TasksTab({ project }: { project: any }) {
  return <ProjectTaskManager />;
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
  const [isAddMode, setIsAddMode] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [hasDetails, setHasDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Check if project has existing details
  useEffect(() => {
    // Check if we have Tamil property project data to populate
    const hasProjectData = project?.id && (project?.name !== 'Skyline Tower Complex');
    
    if (hasProjectData) {
      // We have Tamil property data, set hasDetails to true
      setHasDetails(true);
      setIsAddMode(false);
    } else {
      // No Tamil data, show add mode
      const existingDetails = project?.requirements || null;
      setHasDetails(!!existingDetails);
      if (!existingDetails) {
        setIsAddMode(true);
      }
    }
  }, [project]);

  // Comprehensive project requirements structure
  const defaultRequirements = {
    // General Information
    general: {
      projectName: '',
      projectType: '',
      developmentType: '',
      projectCategory: '',
      location: '',
      city: '',
      state: '',
      pincode: '',
      nearbyLandmarks: '',
      connectivity: ''
    },
    
    // Plot & Land Requirements
    plot: {
      totalArea: '',
      plotDimensions: '',
      plotShape: '',
      facing: '',
      cornerPlot: false,
      roadWidth: '',
      approachRoad: '',
      soilType: '',
      topography: '',
      surveyNumber: '',
      khataNumber: '',
      zoning: '',
      landUse: '',
      fsi: '',
      groundCoverage: '',
      setbacks: {
        front: '',
        rear: '',
        left: '',
        right: ''
      }
    },
    // Building Configuration
    building: {
      totalFloors: '',
      basements: '',
      stiltFloors: '',
      typicalFloors: '',
      towers: '',
      blocks: '',
      totalBuiltUpArea: '',
      totalCarpetArea: '',
      totalSaleableArea: '',
      commonAreaPercentage: '',
      efficiencyRatio: '',
      buildingHeight: '',
      floorToFloorHeight: '',
      ceilingHeight: ''
    },
    
    // Unit Configuration
    units: {
      totalUnits: '',
      unitMix: [],
      typicalFloorPlan: '',
      unitsPerFloor: '',
      corePerFloor: ''
    },
    // Elevation & Architecture
    elevation: {
      architecturalStyle: '',
      elevationConcept: '',
      facadeMaterial: '',
      facadeColor: '',
      balconyType: '',
      windowType: '',
      entranceLobby: '',
      roofType: '',
      externalFinish: '',
      lightingConcept: ''
    },
    
    // Structural Specifications
    structure: {
      structuralSystem: '',
      foundationType: '',
      soilBearingCapacity: '',
      seismicZone: '',
      windSpeed: '',
      slabType: '',
      slabThickness: '',
      beamSize: '',
      columnSize: '',
      wallType: '',
      wallThickness: '',
      concreteGrade: '',
      steelGrade: ''
    },
    // Interior Specifications
    interiors: {
      // Living & Dining
      livingFlooring: '',
      livingWalls: '',
      livingCeiling: '',
      livingElectrical: '',
      
      // Bedrooms
      bedroomFlooring: '',
      bedroomWalls: '',
      bedroomCeiling: '',
      bedroomWardrobe: '',
      
      // Kitchen
      kitchenPlatform: '',
      kitchenSink: '',
      kitchenTiles: '',
      kitchenCabinets: '',
      kitchenChimney: '',
      kitchenAppliances: '',
      
      // Bathrooms
      bathroomFlooring: '',
      bathroomWallTiles: '',
      bathroomSanitary: '',
      bathroomFittings: '',
      bathroomGeyser: '',
      bathroomVanity: '',
      
      // Doors & Windows
      mainDoor: '',
      internalDoors: '',
      windows: '',
      windowGrills: '',
      
      // Electrical
      wiringType: '',
      switchesType: '',
      mcbType: '',
      powerBackup: '',
      
      // Plumbing
      waterPipes: '',
      drainagePipes: '',
      waterTank: '',
      pumpType: ''
    },
    // Amenities & Facilities
    amenities: {
      // Sports & Fitness
      swimmingPool: false,
      gymnasium: false,
      yogaRoom: false,
      indoorGames: false,
      outdoorSports: [],
      joggingTrack: false,
      cyclingTrack: false,
      
      // Community
      clubhouse: false,
      partyHall: false,
      amphitheater: false,
      library: false,
      businessCenter: false,
      conferenceRoom: false,
      
      // Children
      playArea: false,
      kidsPool: false,
      daycare: false,
      
      // Convenience
      guestRooms: false,
      cafeteria: false,
      miniMart: false,
      atm: false,
      pharmacy: false,
      salon: false,
      
      // Wellness
      spa: false,
      sauna: false,
      steamRoom: false,
      meditationRoom: false,
      
      // Security & Safety
      gatedCommunity: false,
      securityCabin: false,
      cctv: false,
      intercom: false,
      fireAlarm: false,
      fireFighting: false,
      
      // Utilities
      powerBackup: '',
      waterSupply: '',
      wasteTreatment: false,
      rainwaterHarvesting: false,
      solarPanels: false
    },
    // Parking & Transportation
    parking: {
      totalParkingSpaces: '',
      coveredParking: '',
      openParking: '',
      visitorParking: '',
      twowheelerParking: '',
      parkingLevels: '',
      mechanicalParking: false,
      evChargingStations: false,
      valetParking: false
    },
    
    // Green Features
    sustainability: {
      greenBuildingCertification: '',
      energyEfficiency: '',
      waterConservation: '',
      wasteManagement: '',
      landscapedArea: '',
      treeCount: '',
      organicWasteConverter: false,
      solarWaterHeating: false,
      ledLighting: false,
      sensorsForLighting: false
    },
    // Compliance & Approvals
    compliance: {
      landTitle: '',
      encumbranceCertificate: '',
      approvedPlan: '',
      commencementCertificate: '',
      environmentalClearance: '',
      fireSafetyCertificate: '',
      occupancyCertificate: '',
      completionCertificate: '',
      reraRegistration: '',
      waterConnection: '',
      electricityConnection: '',
      sewerageConnection: ''
    },
    
    // Additional Features
    additional: {
      smartHomeFeatures: [],
      accessibilityFeatures: [],
      petFriendly: false,
      seniorCitizenFriendly: false,
      vastuCompliant: false,
      specialFeatures: ''
    }
  };

  // Function to populate requirements from project data
  const getProjectRequirementsFromData = () => {
    const hasProjectData = project?.id && (project?.name !== 'Skyline Tower Complex');
    
    if (hasProjectData) {
      return {
        // General Information from project data
        general: {
          projectName: project.name || '',
          projectType: project.type || '',
          developmentType: project.category || project.type || '',
          projectCategory: project.category || '',
          location: `${project.location?.address || ''}, ${project.location?.city || ''}, ${project.location?.state || ''}`.trim(),
          city: project.location?.city || '',
          state: project.location?.state || '',
          pincode: project.location?.zipCode || '',
          nearbyLandmarks: project.description || '',
          connectivity: 'Well connected to major transport hubs'
        },
        
        // Plot & Land Requirements (populated from project if available)
        plot: {
          totalArea: project.budget ? `${Math.floor(project.budget / 100000)} sqft` : '',
          plotDimensions: '60 x 40 ft',
          plotShape: 'Rectangular',
          facing: 'East',
          cornerPlot: false,
          roadWidth: '40 ft',
          approachRoad: 'Good',
          soilType: 'Red soil',
          topography: 'Level',
          surveyNumber: `SY/${project.id?.slice(-3) || '001'}`,
          khataNumber: `KH/${project.id?.slice(-3) || '001'}`,
          zoning: 'Residential',
          landUse: 'Residential',
          fsi: '1.75',
          groundCoverage: '60%',
          setbacks: {
            front: '10 ft',
            rear: '10 ft',
            left: '8 ft',
            right: '8 ft'
          }
        },
        
        // Building Configuration from project
        building: {
          totalFloors: project.timeline?.milestones ? '3' : '2',
          basements: '0',
          stiltFloors: '0',
          typicalFloors: project.timeline?.milestones ? '2' : '1',
          towers: '1',
          blocks: '1',
          totalBuiltUpArea: project.budget ? `${Math.floor(project.budget / 80000)} sqft` : '',
          totalCarpetArea: project.budget ? `${Math.floor(project.budget / 100000)} sqft` : '',
          totalSaleableArea: project.budget ? `${Math.floor(project.budget / 90000)} sqft` : '',
          commonAreaPercentage: '15%',
          efficiencyRatio: '85%',
          buildingHeight: '35 ft',
          floorToFloorHeight: '12 ft',
          ceilingHeight: '10 ft'
        },
        
        // Unit Configuration
        units: {
          totalUnits: '1',
          unitMix: ['3BHK'],
          typicalFloorPlan: 'Traditional',
          unitsPerFloor: '1',
          corePerFloor: '1'
        },
        
        // Elevation & Architecture
        elevation: {
          architecturalStyle: 'Contemporary Tamil',
          elevationConcept: 'Modern with traditional elements',
          facadeMaterial: 'Stone and brick',
          facadeColor: 'Warm earth tones',
          balconyType: 'Cantilever',
          windowType: 'UPVC',
          entranceLobby: 'Spacious',
          roofType: 'RCC Slab',
          externalFinish: 'Texture paint',
          lightingConcept: 'LED integrated'
        },
        
        // Default other sections
        ...Object.fromEntries(
          Object.keys(defaultRequirements).slice(5).map(key => [key, defaultRequirements[key]])
        )
      };
    }
    
    return project?.requirements || defaultRequirements;
  };

  const projectRequirements = getProjectRequirementsFromData();
  const [editedData, setEditedData] = useState(projectRequirements);
  
  // Update editedData when project changes
  useEffect(() => {
    const updatedRequirements = getProjectRequirementsFromData();
    setEditedData(updatedRequirements);
  }, [project]);

  const handleAddDetails = () => {
    setFormData(defaultRequirements);
    setIsAddMode(true);
  };

  const handleEdit = () => {
    setFormData(projectRequirements);
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Save to backend
    console.log('Saving requirements:', formData);
    setHasDetails(true);
    setIsEditMode(false);
    setIsAddMode(false);
    // Update project requirements
    setEditedData(formData);
  };

  const handleCancel = () => {
    setFormData(null);
    setIsEditMode(false);
    setIsAddMode(false);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const currentData = formData || editedData;

  // If no details exist, show Add Details form
  if (!hasDetails && !isAddMode) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Project Requirements Found</h3>
            <p className="text-muted-foreground">
              Add comprehensive project requirements including plot details, building specifications, interiors, and amenities.
            </p>
          </div>
          <Button onClick={handleAddDetails} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add Project Requirements
          </Button>
        </div>
      </div>
    );
  }

  // Edit/Add Form - Enhanced Enterprise UI
  if (isEditMode || isAddMode) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Form Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {isAddMode ? <Plus className="h-5 w-5 text-blue-600" /> : <Edit className="h-5 w-5 text-blue-600" />}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isAddMode ? 'Create Project Requirements' : 'Edit Project Requirements'}
                </h2>
              </div>
              <p className="text-muted-foreground">
                Complete all sections to define comprehensive project specifications and requirements
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel} size="lg" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                {isAddMode ? 'Create Requirements' : 'Update Requirements'}
              </Button>
            </div>
          </div>
          
          {/* Form Progress Indicator */}
          <div className="mt-6 bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span className="font-medium">Form Completion Progress</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">2 of 8 sections</span>
            </div>
            <Progress value={25} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Complete all required sections to save your project requirements
            </p>
          </div>
        </div>

        {/* Enhanced Form Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-2">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1 h-auto bg-gray-50 p-1 rounded-lg">
                <TabsTrigger 
                  value="general" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Info className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">General</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="plot" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Plot</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="building" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Building</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="elevation" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Palette className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Elevation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="interiors" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Home className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Interiors</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="amenities" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Star className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Amenities</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="compliance" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Shield className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Compliance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="additional" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm flex flex-col sm:flex-row items-center gap-1.5 p-3 rounded-md transition-all"
                >
                  <Zap className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">Additional</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Enhanced General Information Tab */}
          <TabsContent value="general" className="space-y-4">
            <Card className="shadow-sm border-0 ring-1 ring-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Info className="h-5 w-5 text-blue-600" />
                      </div>
                      General Information
                    </CardTitle>
                    <CardDescription className="mt-1 text-gray-600">
                      Provide basic project details and location information
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">
                    Step 1 of 8
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="projectName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Project Name 
                      <span className="text-red-500 text-lg">*</span>
                      <HelpCircle className="h-3 w-3 text-gray-400" />
                    </Label>
                    <Input
                      id="projectName"
                      value={currentData.general.projectName}
                      onChange={(e) => handleInputChange('general', 'projectName', e.target.value)}
                      placeholder="e.g., Sky Tower Residential Complex"
                      className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Official project name as per approved documentation
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="projectType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Project Type 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Select
                      value={currentData.general.projectType}
                      onValueChange={(value) => handleInputChange('general', 'projectType', value)}
                    >
                      <SelectTrigger id="projectType" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Choose primary project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Residential
                          </div>
                        </SelectItem>
                        <SelectItem value="commercial">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Commercial
                          </div>
                        </SelectItem>
                        <SelectItem value="mixed">
                          <div className="flex items-center gap-2">
                            <Square className="h-4 w-4" />
                            Mixed Use
                          </div>
                        </SelectItem>
                        <SelectItem value="industrial">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Industrial
                          </div>
                        </SelectItem>
                        <SelectItem value="institutional">Institutional</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Select the primary category that best describes your project
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="developmentType" className="text-sm font-semibold text-gray-700">
                      Development Type
                    </Label>
                    <Select
                      value={currentData.general.developmentType}
                      onValueChange={(value) => handleInputChange('general', 'developmentType', value)}
                    >
                      <SelectTrigger id="developmentType" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select development approach" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greenfield">Greenfield Development</SelectItem>
                        <SelectItem value="brownfield">Brownfield Redevelopment</SelectItem>
                        <SelectItem value="renovation">Renovation/Upgrade</SelectItem>
                        <SelectItem value="extension">Extension/Addition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="projectCategory" className="text-sm font-semibold text-gray-700">
                      Market Segment
                    </Label>
                    <Select
                      value={currentData.general.projectCategory}
                      onValueChange={(value) => handleInputChange('general', 'projectCategory', value)}
                    >
                      <SelectTrigger id="projectCategory" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Choose market segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luxury">Luxury (₹8+ Cr)</SelectItem>
                        <SelectItem value="premium">Premium (₹3-8 Cr)</SelectItem>
                        <SelectItem value="midSegment">Mid-Segment (₹1-3 Cr)</SelectItem>
                        <SelectItem value="affordable">Affordable (₹50L-1 Cr)</SelectItem>
                        <SelectItem value="budget">Budget (Below ₹50L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Section */}
                  <div className="col-span-1 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <h4 className="text-base font-semibold text-gray-800">Location Details</h4>
                    </div>
                    <Separator className="mb-6" />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Project Address 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Input
                      id="location"
                      value={currentData.general.location}
                      onChange={(e) => handleInputChange('general', 'location', e.target.value)}
                      placeholder="e.g., Plot No. 123, MG Road"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500">Complete project address with plot/survey number</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      City 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={currentData.general.city}
                      onChange={(e) => handleInputChange('general', 'city', e.target.value)}
                      placeholder="e.g., Chennai"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      State 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Select
                      value={currentData.general.state}
                      onValueChange={(value) => handleInputChange('general', 'state', value)}
                    >
                      <SelectTrigger id="state" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="kerala">Kerala</SelectItem>
                        <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="telangana">Telangana</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi NCR</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="pincode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Pincode 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Input
                      id="pincode"
                      type="text"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      value={currentData.general.pincode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // Only digits
                        handleInputChange('general', 'pincode', value);
                      }}
                      placeholder="600001"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500">6-digit Indian postal code</p>
                  </div>

                  <div className="col-span-1 lg:col-span-2 space-y-3">
                    <Label htmlFor="nearbyLandmarks" className="text-sm font-semibold text-gray-700">
                      Connectivity & Landmarks
                    </Label>
                    <Textarea
                      id="nearbyLandmarks"
                      value={currentData.general.nearbyLandmarks}
                      onChange={(e) => handleInputChange('general', 'nearbyLandmarks', e.target.value)}
                      placeholder="e.g., 2km from Chennai Central Station, Adjacent to Express Avenue Mall, Near Apollo Hospital, IT Corridor connectivity"
                      rows={4}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-blue-700">
                        Include proximity to transport hubs, educational institutions, healthcare facilities, 
                        shopping centers, and employment hubs within 5km radius
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plot Tab */}
          <TabsContent value="plot" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Plot & Land Details</CardTitle>
                <CardDescription>Land specifications and setback requirements</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalArea">Total Plot Area</Label>
                  <Input
                    id="totalArea"
                    value={currentData.plot.totalArea}
                    onChange={(e) => handleInputChange('plot', 'totalArea', e.target.value)}
                    placeholder="e.g., 12,500 sq ft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plotDimensions">Plot Dimensions</Label>
                  <Input
                    id="plotDimensions"
                    value={currentData.plot.plotDimensions}
                    onChange={(e) => handleInputChange('plot', 'plotDimensions', e.target.value)}
                    placeholder="e.g., 100 x 125 ft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facing">Facing</Label>
                  <Select
                    value={currentData.plot.facing}
                    onValueChange={(value) => handleInputChange('plot', 'facing', value)}
                  >
                    <SelectTrigger id="facing">
                      <SelectValue placeholder="Select facing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                      <SelectItem value="northeast">North-East</SelectItem>
                      <SelectItem value="northwest">North-West</SelectItem>
                      <SelectItem value="southeast">South-East</SelectItem>
                      <SelectItem value="southwest">South-West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Input
                    id="soilType"
                    value={currentData.plot.soilType}
                    onChange={(e) => handleInputChange('plot', 'soilType', e.target.value)}
                    placeholder="e.g., Clay Loam"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surveyNumber">Survey Number</Label>
                  <Input
                    id="surveyNumber"
                    value={currentData.plot.surveyNumber}
                    onChange={(e) => handleInputChange('plot', 'surveyNumber', e.target.value)}
                    placeholder="Enter survey number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zoning">Zoning</Label>
                  <Input
                    id="zoning"
                    value={currentData.plot.zoning}
                    onChange={(e) => handleInputChange('plot', 'zoning', e.target.value)}
                    placeholder="e.g., Commercial Mixed Use"
                  />
                </div>
                <div className="col-span-2">
                  <h4 className="font-medium mb-3">Setbacks</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frontSetback">Front (ft)</Label>
                      <Input
                        id="frontSetback"
                        value={currentData.plot.setbacks.front}
                        onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, front: e.target.value})}
                        placeholder="20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rearSetback">Rear (ft)</Label>
                      <Input
                        id="rearSetback"
                        value={currentData.plot.setbacks.rear}
                        onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, rear: e.target.value})}
                        placeholder="15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leftSetback">Left (ft)</Label>
                      <Input
                        id="leftSetback"
                        value={currentData.plot.setbacks.left}
                        onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, left: e.target.value})}
                        placeholder="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rightSetback">Right (ft)</Label>
                      <Input
                        id="rightSetback"
                        value={currentData.plot.setbacks.right}
                        onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, right: e.target.value})}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plot Details Tab */}
          <TabsContent value="plot" className="space-y-4">
            <Card className="shadow-sm border-0 ring-1 ring-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      Plot & Land Details
                    </CardTitle>
                    <CardDescription className="mt-1 text-gray-600">
                      Specify land specifications and regulatory requirements
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white border-green-200 text-green-700">
                    Step 2 of 8
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-8 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="totalArea" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Total Plot Area 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Input
                      id="totalArea"
                      value={currentData.plot.totalArea}
                      onChange={(e) => handleInputChange('plot', 'totalArea', e.target.value)}
                      placeholder="e.g., 12,500 sq ft"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <p className="text-xs text-gray-500">Total land area including all boundaries</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="plotDimensions" className="text-sm font-semibold text-gray-700">
                      Plot Dimensions
                    </Label>
                    <Input
                      id="plotDimensions"
                      value={currentData.plot.plotDimensions}
                      onChange={(e) => handleInputChange('plot', 'plotDimensions', e.target.value)}
                      placeholder="e.g., 100 x 125 ft"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500">Length x Width in feet or meters</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="facing" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      Plot Facing 
                      <span className="text-red-500 text-lg">*</span>
                    </Label>
                    <Select
                      value={currentData.plot.facing}
                      onValueChange={(value) => handleInputChange('plot', 'facing', value)}
                    >
                      <SelectTrigger id="facing" className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select plot facing direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="northeast">North-East</SelectItem>
                        <SelectItem value="northwest">North-West</SelectItem>
                        <SelectItem value="southeast">South-East</SelectItem>
                        <SelectItem value="southwest">South-West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="soilType" className="text-sm font-semibold text-gray-700">
                      Soil Type
                    </Label>
                    <Input
                      id="soilType"
                      value={currentData.plot.soilType}
                      onChange={(e) => handleInputChange('plot', 'soilType', e.target.value)}
                      placeholder="e.g., Clay Loam, Sandy Soil, Black Cotton"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500">Based on soil test report</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="surveyNumber" className="text-sm font-semibold text-gray-700">
                      Survey Number
                    </Label>
                    <Input
                      id="surveyNumber"
                      value={currentData.plot.surveyNumber}
                      onChange={(e) => handleInputChange('plot', 'surveyNumber', e.target.value)}
                      placeholder="e.g., S.F. No. 123/4A"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="zoning" className="text-sm font-semibold text-gray-700">
                      Zoning Classification
                    </Label>
                    <Input
                      id="zoning"
                      value={currentData.plot.zoning}
                      onChange={(e) => handleInputChange('plot', 'zoning', e.target.value)}
                      placeholder="e.g., Commercial Mixed Use, Residential"
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Setbacks Section */}
                  <div className="col-span-1 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                      <Square className="h-5 w-5 text-blue-600" />
                      <h4 className="text-base font-semibold text-gray-800">Mandatory Setbacks (as per local bylaws)</h4>
                    </div>
                    <Separator className="mb-6" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="frontSetback" className="text-sm font-medium text-gray-600">Front (ft)</Label>
                        <Input
                          id="frontSetback"
                          type="number"
                          value={currentData.plot.setbacks.front}
                          onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, front: e.target.value})}
                          placeholder="20"
                          className="h-10 text-center"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rearSetback" className="text-sm font-medium text-gray-600">Rear (ft)</Label>
                        <Input
                          id="rearSetback"
                          type="number"
                          value={currentData.plot.setbacks.rear}
                          onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, rear: e.target.value})}
                          placeholder="15"
                          className="h-10 text-center"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leftSetback" className="text-sm font-medium text-gray-600">Left (ft)</Label>
                        <Input
                          id="leftSetback"
                          type="number"
                          value={currentData.plot.setbacks.left}
                          onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, left: e.target.value})}
                          placeholder="10"
                          className="h-10 text-center"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rightSetback" className="text-sm font-medium text-gray-600">Right (ft)</Label>
                        <Input
                          id="rightSetback"
                          type="number"
                          value={currentData.plot.setbacks.right}
                          onChange={(e) => handleInputChange('plot', 'setbacks', {...currentData.plot.setbacks, right: e.target.value})}
                          placeholder="10"
                          className="h-10 text-center"
                        />
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-700">
                          Setbacks must comply with local building bylaws. Consult with local municipal authority for accurate requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add placeholder for other tabs */}
          <TabsContent value="building">
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Building Configuration</h3>
              <p className="text-gray-500">This section will contain building specifications and floor plans.</p>
            </div>
          </TabsContent>

          <TabsContent value="elevation">
            <div className="text-center py-12">
              <Palette className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Elevation & Design</h3>
              <p className="text-gray-500">This section will contain architectural design and elevation details.</p>
            </div>
          </TabsContent>

        </Tabs>
        
        {/* Form Actions Footer */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sticky bottom-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <span className="text-sm text-muted-foreground">Auto-save enabled</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel} size="lg">
                Cancel Changes
              </Button>
              <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <CheckCircle className="h-4 w-4 mr-2" />
                {isAddMode ? 'Create Project Requirements' : 'Update Requirements'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View Mode - Display saved requirements
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Requirements</h2>
          <p className="text-muted-foreground">
            Complete project specifications from plot to interior details
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Requirements
          </Button>
        </div>
      </div>

      {/* Requirements Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              General Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Project Name</p>
                <p className="font-medium">{currentData.general.projectName || 'Sky Tower Complex'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Type</p>
                <p className="font-medium">{currentData.general.projectType || 'Mixed Use'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{currentData.general.location || 'Manhattan, New York'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{currentData.general.city || 'New York'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plot Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Plot & Land
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Area</p>
                <p className="font-medium">{currentData.plot.totalArea || '12,500 sq ft'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dimensions</p>
                <p className="font-medium">{currentData.plot.plotDimensions || '100 x 125 ft'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Facing</p>
                <p className="font-medium">{currentData.plot.facing || 'North-East'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zoning</p>
                <p className="font-medium">{currentData.plot.zoning || 'Commercial Mixed Use'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Building Configuration */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Building Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-2xl font-bold">{currentData.building.totalFloors || '45'}</p>
                <p className="text-xs text-muted-foreground">Floors</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-2xl font-bold">{currentData.units.totalUnits || '240'}</p>
                <p className="text-xs text-muted-foreground">Units</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-2xl font-bold">{currentData.building.towers || '2'}</p>
                <p className="text-xs text-muted-foreground">Towers</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <p className="text-sm text-muted-foreground">Built-up Area</p>
                <p className="font-medium">{currentData.building.totalBuiltUpArea || '450,000 sq ft'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carpet Area</p>
                <p className="font-medium">{currentData.building.totalCarpetArea || '320,000 sq ft'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Elevation & Design */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Elevation & Design
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Architectural Style</p>
                <p className="font-medium">{currentData.elevation.architecturalStyle || 'Modern Contemporary'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Facade Material</p>
                <p className="font-medium">{currentData.elevation.facadeMaterial || 'Glass & ACP'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entrance Lobby</p>
                <p className="font-medium">{currentData.elevation.entranceLobby || 'Double Height'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">External Finish</p>
                <p className="font-medium">{currentData.elevation.externalFinish || 'Premium Texture Paint'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interior Specifications */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="h-5 w-5" />
              Interior Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="living" className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="living">Living</TabsTrigger>
                <TabsTrigger value="bedrooms">Bedrooms</TabsTrigger>
                <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                <TabsTrigger value="bathrooms">Bathrooms</TabsTrigger>
                <TabsTrigger value="electrical">Electrical</TabsTrigger>
              </TabsList>
              <TabsContent value="living" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Flooring</p>
                    <p className="font-medium">{currentData.interiors.livingFlooring || 'Vitrified Tiles'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Walls</p>
                    <p className="font-medium">{currentData.interiors.livingWalls || 'Premium Emulsion Paint'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ceiling</p>
                    <p className="font-medium">{currentData.interiors.livingCeiling || 'POP False Ceiling'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Electrical</p>
                    <p className="font-medium">{currentData.interiors.livingElectrical || 'Modular Switches'}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="kitchen" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform</p>
                    <p className="font-medium">{currentData.interiors.kitchenPlatform || 'Granite Platform'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sink</p>
                    <p className="font-medium">{currentData.interiors.kitchenSink || 'Stainless Steel Sink'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cabinets</p>
                    <p className="font-medium">{currentData.interiors.kitchenCabinets || 'Modular Kitchen'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Appliances</p>
                    <p className="font-medium">{currentData.interiors.kitchenAppliances || 'Chimney & Hob'}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bathrooms" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Flooring</p>
                    <p className="font-medium">{currentData.interiors.bathroomFlooring || 'Anti-skid Tiles'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sanitary</p>
                    <p className="font-medium">{currentData.interiors.bathroomSanitary || 'Premium Sanitary Ware'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fittings</p>
                    <p className="font-medium">{currentData.interiors.bathroomFittings || 'CP Fittings'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Geyser</p>
                    <p className="font-medium">{currentData.interiors.bathroomGeyser || 'Provision for Geyser'}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Amenities & Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Sports & Fitness</h4>
                <div className="flex flex-wrap gap-2">
                  {currentData.amenities.swimmingPool && <Badge variant="secondary">Swimming Pool</Badge>}
                  {currentData.amenities.gymnasium && <Badge variant="secondary">Gymnasium</Badge>}
                  {currentData.amenities.yogaRoom && <Badge variant="secondary">Yoga Room</Badge>}
                  {currentData.amenities.joggingTrack && <Badge variant="secondary">Jogging Track</Badge>}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Community</h4>
                <div className="flex flex-wrap gap-2">
                  {currentData.amenities.clubhouse && <Badge variant="secondary">Clubhouse</Badge>}
                  {currentData.amenities.partyHall && <Badge variant="secondary">Party Hall</Badge>}
                  {currentData.amenities.library && <Badge variant="secondary">Library</Badge>}
                  {currentData.amenities.businessCenter && <Badge variant="secondary">Business Center</Badge>}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Security & Safety</h4>
                <div className="flex flex-wrap gap-2">
                  {currentData.amenities.gatedCommunity && <Badge variant="secondary">Gated Community</Badge>}
                  {currentData.amenities.cctv && <Badge variant="secondary">CCTV Surveillance</Badge>}
                  {currentData.amenities.intercom && <Badge variant="secondary">Intercom</Badge>}
                  {currentData.amenities.fireAlarm && <Badge variant="secondary">Fire Safety</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parking */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Square className="h-5 w-5" />
              Parking & Transportation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Parking</p>
                <p className="font-medium">{currentData.parking.totalParkingSpaces || '480 Spaces'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Covered Parking</p>
                <p className="font-medium">{currentData.parking.coveredParking || '400 Spaces'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Visitor Parking</p>
                <p className="font-medium">{currentData.parking.visitorParking || '50 Spaces'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Two-wheeler</p>
                <p className="font-medium">{currentData.parking.twowheelerParking || '100 Spaces'}</p>
              </div>
            </div>
            {currentData.parking.evChargingStations && (
              <Badge variant="outline" className="mt-2">
                <Zap className="h-3 w-3 mr-1" />
                EV Charging Stations Available
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Compliance & Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">RERA Registration</span>
                <Badge variant="outline" className="text-xs">
                  {currentData.compliance.reraRegistration || 'RERA/2024/001'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Environmental Clearance</span>
                <Badge variant="outline" className="text-xs">
                  {currentData.compliance.environmentalClearance || 'EC-2024-123'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fire Safety</span>
                <Badge variant="outline" className="text-xs">
                  {currentData.compliance.fireSafetyCertificate || 'Approved'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Occupancy Certificate</span>
                <Badge variant="outline" className="text-xs">
                  {currentData.compliance.occupancyCertificate || 'Pending'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ReportsTab
({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Comprehensive project performance analytics and reporting
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Schedule Report</span>
            <span className="inline sm:hidden">Schedule</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Export All</span>
            <span className="inline sm:hidden">Export</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-initial">
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Create Report</span>
            <span className="inline sm:hidden">Create</span>
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
              <div className="overflow-x-auto">
                <Table className="min-w-[500px]">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold min-w-[120px]">Type</TableHead>
                      <TableHead className="font-semibold text-center min-w-[80px]">Count</TableHead>
                      <TableHead className="font-semibold min-w-[100px]">Area</TableHead>
                      <TableHead className="font-semibold min-w-[120px]">Price</TableHead>
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
              </div>
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
              <div className="overflow-x-auto">
                <Table className="min-w-[500px]">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold min-w-[120px]">Type</TableHead>
                      <TableHead className="font-semibold text-center min-w-[80px]">Count</TableHead>
                      <TableHead className="font-semibold min-w-[100px]">Area</TableHead>
                      <TableHead className="font-semibold min-w-[120px]">Price</TableHead>
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
              </div>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Activity Feed</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Complete project activity history and audit trail
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Filter</span>
            <span className="inline sm:hidden">Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Export Log</span>
            <span className="inline sm:hidden">Export</span>
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
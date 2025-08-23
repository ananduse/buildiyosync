import { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Award,
  Briefcase,
  HardHat,
  Shield,
  Star,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Building2,
  Wrench,
  Truck,
  ClipboardCheck,
  DollarSign,
  Timer,
  CalendarDays,
  MessageSquare,
  FileText,
  Settings,
  ChevronDown,
  Info,
  BarChart3,
  Target,
  Zap,
  Coffee,
  Home,
  Car,
  Package,
  Paintbrush,
  Hammer
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Team member type based on PRD
interface TeamMember {
  id: string;
  name: string;
  role: string;
  type: 'employee' | 'contractor' | 'vendor' | 'consultant';
  specialization?: string;
  avatar?: string;
  email: string;
  phone: string;
  company?: string;
  license?: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  availability: 'available' | 'busy' | 'away';
  currentProject?: string;
  workload: number; // percentage
  tasksAssigned: number;
  tasksCompleted: number;
  performance: {
    rating: number;
    attendance: number;
    productivity: number;
    quality: number;
  };
  skills: string[];
  certifications: string[];
  experience: number; // years
  dailyRate?: number;
  overtimeHours?: number;
  location?: string;
  permissions: {
    viewDPR: boolean;
    submitDPR: boolean;
    approveWork: boolean;
    manageMaterials: boolean;
    viewBudget: boolean;
  };
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  documents: {
    total: number;
    pending: number;
  };
  safetyTraining: {
    completed: boolean;
    expiryDate?: string;
  };
  lastActive: string;
}

export default function TeamManagement() {
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showAddMember, setShowAddMember] = useState(false);

  // Mock team data based on PRD
  const teamMembers: TeamMember[] = [
    {
      id: 'TM001',
      name: 'Amit Sharma',
      role: 'Project Manager',
      type: 'employee',
      avatar: '/avatars/pm1.jpg',
      email: 'amit.sharma@company.com',
      phone: '+91 98765 12345',
      joinDate: '2024-01-15',
      status: 'active',
      availability: 'available',
      currentProject: 'Skyline Towers',
      workload: 85,
      tasksAssigned: 45,
      tasksCompleted: 38,
      performance: {
        rating: 4.5,
        attendance: 98,
        productivity: 92,
        quality: 95
      },
      skills: ['Project Planning', 'Risk Management', 'Team Leadership', 'Budget Control'],
      certifications: ['PMP', 'PRINCE2'],
      experience: 12,
      permissions: {
        viewDPR: true,
        submitDPR: true,
        approveWork: true,
        manageMaterials: true,
        viewBudget: true
      },
      documents: {
        total: 15,
        pending: 0
      },
      safetyTraining: {
        completed: true,
        expiryDate: '2025-01-14'
      },
      lastActive: '10 minutes ago'
    },
    {
      id: 'TM002',
      name: 'Priya Patel',
      role: 'Architect',
      type: 'consultant',
      specialization: 'Residential Design',
      avatar: '/avatars/arch1.jpg',
      email: 'priya@designstudio.com',
      phone: '+91 98765 54321',
      company: 'Design Studio Associates',
      license: 'ARCH/2020/1234',
      joinDate: '2024-01-10',
      status: 'active',
      availability: 'busy',
      currentProject: 'Skyline Towers',
      workload: 70,
      tasksAssigned: 25,
      tasksCompleted: 20,
      performance: {
        rating: 4.8,
        attendance: 95,
        productivity: 88,
        quality: 98
      },
      skills: ['AutoCAD', '3D Modeling', 'Sustainable Design', 'Interior Planning'],
      certifications: ['LEED AP', 'IGBC AP'],
      experience: 15,
      dailyRate: 15000,
      permissions: {
        viewDPR: true,
        submitDPR: false,
        approveWork: true,
        manageMaterials: false,
        viewBudget: true
      },
      documents: {
        total: 12,
        pending: 2
      },
      safetyTraining: {
        completed: true,
        expiryDate: '2024-12-31'
      },
      lastActive: '2 hours ago'
    },
    {
      id: 'TM003',
      name: 'Rakesh Verma',
      role: 'Site Supervisor',
      type: 'employee',
      avatar: '/avatars/ss1.jpg',
      email: 'rakesh.verma@company.com',
      phone: '+91 98765 11111',
      joinDate: '2024-01-15',
      status: 'active',
      availability: 'available',
      currentProject: 'Skyline Towers',
      workload: 95,
      tasksAssigned: 60,
      tasksCompleted: 52,
      performance: {
        rating: 4.2,
        attendance: 100,
        productivity: 85,
        quality: 90
      },
      skills: ['Site Management', 'Quality Control', 'Safety Compliance', 'Team Coordination'],
      certifications: ['Safety Officer Certificate'],
      experience: 15,
      permissions: {
        viewDPR: true,
        submitDPR: true,
        approveWork: false,
        manageMaterials: true,
        viewBudget: false
      },
      documents: {
        total: 8,
        pending: 0
      },
      safetyTraining: {
        completed: true,
        expiryDate: '2024-11-30'
      },
      lastActive: '1 hour ago'
    },
    {
      id: 'TM004',
      name: 'ABC Construction',
      role: 'Civil Contractor',
      type: 'contractor',
      specialization: 'Structural Work',
      email: 'info@abcconstruction.com',
      phone: '+91 98765 22222',
      company: 'ABC Construction Pvt Ltd',
      joinDate: '2024-01-20',
      status: 'active',
      availability: 'available',
      currentProject: 'Skyline Towers',
      workload: 80,
      tasksAssigned: 35,
      tasksCompleted: 28,
      performance: {
        rating: 4.0,
        attendance: 92,
        productivity: 82,
        quality: 88
      },
      skills: ['RCC Work', 'Foundation', 'Structural Steel', 'Masonry'],
      certifications: ['ISO 9001', 'ISO 45001'],
      experience: 20,
      dailyRate: 50000,
      permissions: {
        viewDPR: true,
        submitDPR: true,
        approveWork: false,
        manageMaterials: true,
        viewBudget: false
      },
      documents: {
        total: 25,
        pending: 3
      },
      safetyTraining: {
        completed: true,
        expiryDate: '2024-10-15'
      },
      lastActive: '3 hours ago'
    },
    {
      id: 'TM005',
      name: 'XYZ Electricals',
      role: 'Electrical Contractor',
      type: 'contractor',
      specialization: 'MEP - Electrical',
      email: 'contact@xyzelectricals.com',
      phone: '+91 98765 33333',
      company: 'XYZ Electricals Ltd',
      joinDate: '2024-02-01',
      status: 'active',
      availability: 'available',
      currentProject: 'Skyline Towers',
      workload: 60,
      tasksAssigned: 20,
      tasksCompleted: 12,
      performance: {
        rating: 4.3,
        attendance: 90,
        productivity: 78,
        quality: 92
      },
      skills: ['HT/LT Systems', 'Fire Alarm', 'Home Automation', 'Solar Systems'],
      certifications: ['Electrical Contractor License'],
      experience: 15,
      dailyRate: 35000,
      permissions: {
        viewDPR: true,
        submitDPR: true,
        approveWork: false,
        manageMaterials: true,
        viewBudget: false
      },
      documents: {
        total: 18,
        pending: 1
      },
      safetyTraining: {
        completed: true,
        expiryDate: '2024-09-30'
      },
      lastActive: '1 day ago'
    }
  ];

  const getRoleIcon = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes('manager')) return Briefcase;
    if (lowerRole.includes('architect')) return Building2;
    if (lowerRole.includes('supervisor')) return HardHat;
    if (lowerRole.includes('civil')) return Home;
    if (lowerRole.includes('electrical')) return Zap;
    if (lowerRole.includes('plumbing')) return Wrench;
    if (lowerRole.includes('interior')) return Paintbrush;
    if (lowerRole.includes('contractor')) return Hammer;
    if (lowerRole.includes('vendor')) return Truck;
    return Users;
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'away': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.type === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage project team members, contractors, and vendors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new team member, contractor, or vendor to the project
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" placeholder="e.g., Site Engineer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Company name (if applicable)" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="viewDPR" />
                      <Label htmlFor="viewDPR" className="text-sm">View DPR</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="submitDPR" />
                      <Label htmlFor="submitDPR" className="text-sm">Submit DPR</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="approveWork" />
                      <Label htmlFor="approveWork" className="text-sm">Approve Work</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="manageMaterials" />
                      <Label htmlFor="manageMaterials" className="text-sm">Manage Materials</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddMember(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddMember(false)}>
                  Add Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              38 active today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <Hammer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              8 on site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Workload</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.3/5</div>
            <p className="text-xs text-muted-foreground">
              Team average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Training</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Compliance rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="employee">Employees</SelectItem>
                  <SelectItem value="contractor">Contractors</SelectItem>
                  <SelectItem value="vendor">Vendors</SelectItem>
                  <SelectItem value="consultant">Consultants</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'table' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid View */}
      {viewMode === 'grid' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => {
            const RoleIcon = getRoleIcon(member.role);
            return (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <RoleIcon className="h-3 w-3" />
                          {member.role}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <UserX className="h-4 w-4 mr-2" />
                          Remove from Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status and Availability */}
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                    <Badge variant="outline" className={getAvailabilityColor(member.availability)}>
                      {member.availability}
                    </Badge>
                    {member.type !== 'employee' && (
                      <Badge variant="secondary">
                        {member.type}
                      </Badge>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{member.phone}</span>
                    </div>
                    {member.company && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span>{member.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Workload and Tasks */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Workload</span>
                      <span className={cn(
                        "font-medium",
                        member.workload > 90 ? "text-red-600" : 
                        member.workload > 70 ? "text-yellow-600" : 
                        "text-green-600"
                      )}>
                        {member.workload}%
                      </span>
                    </div>
                    <Progress value={member.workload} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{member.tasksCompleted}/{member.tasksAssigned} tasks</span>
                      <span>Last active: {member.lastActive}</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="text-lg font-bold flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {member.performance.rating}
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <div className={cn(
                        "text-lg font-bold",
                        getPerformanceColor(member.performance.productivity)
                      )}>
                        {member.performance.productivity}%
                      </div>
                      <div className="text-xs text-muted-foreground">Productivity</div>
                    </div>
                  </div>

                  {/* Safety Training Status */}
                  {member.safetyTraining.completed && (
                    <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded text-sm">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <Shield className="h-4 w-4" />
                        <span>Safety Trained</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Valid till {member.safetyTraining.expiryDate}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="h-4 w-4 mr-2" />
                      View Tasks
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Performance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Team Members Table View */}
      {viewMode === 'table' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Role & Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Safety</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            {member.company && (
                              <p className="text-xs text-muted-foreground">{member.company}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <RoleIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{member.role}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {member.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{member.email}</div>
                          <div className="text-xs text-muted-foreground">{member.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <Badge variant="outline" className={cn("text-xs", getAvailabilityColor(member.availability))}>
                            {member.availability}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={member.workload} className="w-[60px] h-2" />
                            <span className="text-sm font-medium">{member.workload}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {member.tasksCompleted}/{member.tasksAssigned} tasks
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-sm font-medium">{member.performance.rating}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {member.performance.productivity}% productive
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {member.safetyTraining.completed ? (
                          <Badge variant="success" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Trained
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
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
                              <FileText className="h-4 w-4 mr-2" />
                              View Tasks
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Performance Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <UserX className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
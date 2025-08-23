import { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  Download,
  Plus,
  Calendar,
  Users,
  DollarSign,
  Clock,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowUpDown,
  ChevronDown,
  Target,
  TrendingUp,
  Package,
  Briefcase,
  Home,
  Building,
  Layers,
  HardHat,
  Grid3X3,
  List,
  RefreshCw,
  Upload,
  Settings,
  Copy,
  ExternalLink,
  MessageSquare,
  Activity,
  User,
  Percent,
  ArrowUp,
  ArrowDown,
  Info,
  Shield,
  Star,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

// Enhanced Project Type based on PRD
interface EnterpriseProject {
  id: string;
  code: string;
  name: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    type: 'self-registered' | 'company-created';
    registeredDate: string;
  };
  workspace: {
    id: string;
    name: string;
    logo?: string;
  };
  type: 'residential' | 'commercial' | 'industrial' | 'infrastructure';
  constructionType: 'new' | 'renovation' | 'interior';
  location: {
    address: string;
    city: string;
    state: string;
    mapUrl?: string;
    coordinates?: { lat: number; lng: number };
  };
  specifications: {
    plotArea: number;
    builtUpArea: number;
    floors: number;
    units?: number;
    parkingSpaces?: number;
    gardenArea?: number;
  };
  status: {
    phase: 'initiation' | 'planning' | 'execution' | 'monitoring' | 'closing';
    health: 'on-track' | 'at-risk' | 'delayed' | 'critical';
    lastUpdated: string;
  };
  budget: {
    total: number;
    allocated: {
      construction: number;
      interior: number;
      mep: number;
      contingency: number;
    };
    spent: number;
    pending: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    plannedEndDate: string;
    actualEndDate?: string;
    daysRemaining: number;
    percentComplete: number;
    milestones: {
      total: number;
      completed: number;
    };
  };
  team: {
    projectManager: {
      name: string;
      avatar?: string;
      contact: string;
    };
    architect?: {
      name: string;
      avatar?: string;
      contact: string;
    };
    siteSupervisor?: {
      name: string;
      avatar?: string;
      contact: string;
    };
    totalMembers: number;
    contractors: number;
    vendors: number;
  };
  regulatory: {
    approvalAuthority?: string;
    permitNumbers?: string[];
    sanctionedPlanStatus: 'pending' | 'approved' | 'rejected' | 'na';
    environmentalClearance: boolean;
    fireNOC: boolean;
  };
  dpr: {
    lastSubmitted?: string;
    pendingReview: number;
    approved: number;
  };
  materials: {
    totalOrders: number;
    delivered: number;
    pending: number;
    totalValue: number;
  };
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
  issues: {
    open: number;
    resolved: number;
    escalated: number;
  };
  lastActivity: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  riskLevel: 'low' | 'medium' | 'high';
}

export default function EnterpriseProjectList() {
  const navigate = useNavigate();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'kanban'>('table');

  // Enhanced mock data based on PRD
  const projects: EnterpriseProject[] = [
    {
      id: 'PRJ001',
      code: 'SKY-2024-02',
      name: 'Skyline Towers - Phase 2',
      customer: {
        id: 'CUST001',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
        avatar: '/avatars/customer1.jpg',
        type: 'self-registered',
        registeredDate: '2023-12-15'
      },
      workspace: {
        id: 'WS001',
        name: 'Kumar Developers',
        logo: '/logos/kumar-dev.png'
      },
      type: 'residential',
      constructionType: 'new',
      location: {
        address: 'Plot 42, Sector 18',
        city: 'Gurgaon',
        state: 'Haryana',
        mapUrl: 'https://maps.google.com/...',
        coordinates: { lat: 28.4595, lng: 77.0266 }
      },
      specifications: {
        plotArea: 25000,
        builtUpArea: 125000,
        floors: 24,
        units: 180,
        parkingSpaces: 360,
        gardenArea: 5000
      },
      status: {
        phase: 'execution',
        health: 'on-track',
        lastUpdated: '2024-01-18T10:30:00'
      },
      budget: {
        total: 850000000,
        allocated: {
          construction: 595000000,
          interior: 127500000,
          mep: 85000000,
          contingency: 42500000
        },
        spent: 578000000,
        pending: 272000000,
        currency: 'INR'
      },
      timeline: {
        startDate: '2024-01-15',
        plannedEndDate: '2024-12-31',
        percentComplete: 68,
        daysRemaining: 245,
        milestones: {
          total: 12,
          completed: 8
        }
      },
      team: {
        projectManager: {
          name: 'Amit Sharma',
          avatar: '/avatars/pm1.jpg',
          contact: '+91 98765 12345'
        },
        architect: {
          name: 'Priya Patel',
          avatar: '/avatars/arch1.jpg',
          contact: '+91 98765 54321'
        },
        siteSupervisor: {
          name: 'Rakesh Verma',
          avatar: '/avatars/ss1.jpg',
          contact: '+91 98765 11111'
        },
        totalMembers: 45,
        contractors: 8,
        vendors: 12
      },
      regulatory: {
        approvalAuthority: 'GMDA',
        permitNumbers: ['GMDA/2024/001', 'FIRE/2024/042'],
        sanctionedPlanStatus: 'approved',
        environmentalClearance: true,
        fireNOC: true
      },
      dpr: {
        lastSubmitted: '2024-01-17',
        pendingReview: 2,
        approved: 15
      },
      materials: {
        totalOrders: 45,
        delivered: 32,
        pending: 13,
        totalValue: 125000000
      },
      tasks: {
        total: 156,
        completed: 98,
        inProgress: 42,
        overdue: 16
      },
      issues: {
        open: 8,
        resolved: 24,
        escalated: 2
      },
      lastActivity: '2 hours ago',
      priority: 'high',
      riskLevel: 'low'
    },
    // Add more mock projects...
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'on-track': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'at-risk': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'delayed': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-3 w-3" />;
      case 'high': return <ArrowUp className="h-3 w-3" />;
      case 'medium': return <ArrowDown className="h-3 w-3" />;
      case 'low': return <Info className="h-3 w-3" />;
      default: return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return Home;
      case 'commercial': return Building;
      case 'industrial': return Building2;
      case 'infrastructure': return Layers;
      default: return Building2;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status.health === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    const matchesCustomer = customerFilter === 'all' || project.customer.type === customerFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCustomer;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Enterprise Projects</h1>
          <p className="text-muted-foreground">
            Manage and monitor all construction projects with full customer visibility
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
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                12%
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="secondary" className="text-xs">124 Self</Badge>
              <Badge variant="secondary" className="text-xs">32 Company</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹285Cr</div>
            <Progress value={68} className="h-1 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">68% utilized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Schedule</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">32</div>
            <p className="text-xs text-muted-foreground">
              5 projects at risk
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DPR Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">18</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">24</div>
            <p className="text-xs text-muted-foreground">
              8 escalated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Actions Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            {/* Search and View Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects, codes, customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode('table')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="rounded-none border-x"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode('kanban')}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>

                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Customize Columns</DropdownMenuItem>
                    <DropdownMenuItem>Save View</DropdownMenuItem>
                    <DropdownMenuItem>Export Data</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Health Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="on-track">On Track</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>

              <Select value={customerFilter} onValueChange={setCustomerFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Customer Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="self-registered">Self Registered</SelectItem>
                  <SelectItem value="company-created">Company Created</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent Activity</SelectItem>
                  <SelectItem value="name">Project Name</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>

              {selectedProjects.length > 0 && (
                <div className="flex items-center gap-2 ml-auto">
                  <Badge variant="secondary">
                    {selectedProjects.length} selected
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table View */}
      {viewMode === 'table' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Project Details</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status & Health</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>DPR & Issues</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => {
                  const TypeIcon = getTypeIcon(project.type);
                  return (
                    <TableRow key={project.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <TypeIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-muted-foreground">{project.code}</div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {project.specifications.builtUpArea.toLocaleString()} sqft
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {project.specifications.floors} floors
                              </Badge>
                              {project.specifications.units && (
                                <Badge variant="outline" className="text-xs">
                                  {project.specifications.units} units
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {project.location.city}, {project.location.state}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={project.customer.avatar} />
                                <AvatarFallback>
                                  {project.customer.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium">{project.customer.name}</div>
                                <Badge 
                                  variant={project.customer.type === 'self-registered' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {project.customer.type === 'self-registered' ? 'Self' : 'Company'}
                                </Badge>
                              </div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold">Customer Details</h4>
                              <div className="space-y-1">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Email:</span> {project.customer.email}
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Phone:</span> {project.customer.phone}
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Registered:</span> {project.customer.registeredDate}
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Badge className={getHealthColor(project.status.health)}>
                            {project.status.health.replace('-', ' ')}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {project.status.phase}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {getPriorityIcon(project.priority)}
                                </TooltipTrigger>
                                <TooltipContent>
                                  Priority: {project.priority}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Progress value={project.timeline.percentComplete} className="w-[100px] h-2" />
                            <span className="text-sm font-medium">{project.timeline.percentComplete}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.timeline.milestones.completed}/{project.timeline.milestones.total} milestones
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {project.timeline.daysRemaining > 0 
                              ? `${project.timeline.daysRemaining} days left`
                              : 'Completed'}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            ₹{(project.budget.spent / 10000000).toFixed(1)}Cr
                          </div>
                          <div className="text-xs text-muted-foreground">
                            of ₹{(project.budget.total / 10000000).toFixed(1)}Cr
                          </div>
                          <Progress 
                            value={(project.budget.spent / project.budget.total) * 100} 
                            className="w-[100px] h-1" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{project.team.totalMembers} members</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            PM: {project.team.projectManager.name.split(' ')[0]}
                          </div>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">
                              {project.team.contractors} contractors
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={project.dpr.pendingReview > 0 ? 'destructive' : 'secondary'} className="text-xs">
                              {project.dpr.pendingReview} DPR pending
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={project.issues.open > 0 ? 'destructive' : 'secondary'} className="text-xs">
                              {project.issues.open} issues
                            </Badge>
                            {project.issues.escalated > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {project.issues.escalated} escalated
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/customer-view`)}>
                              <User className="h-4 w-4 mr-2" />
                              Customer View
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <Activity className="h-4 w-4 mr-2" />
                                Quick Actions
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Review DPR
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Send Update
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Schedule Meeting
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Reports
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Budget Report</DropdownMenuItem>
                                <DropdownMenuItem>Progress Report</DropdownMenuItem>
                                <DropdownMenuItem>Material Report</DropdownMenuItem>
                                <DropdownMenuItem>Team Report</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Share Access
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Archive Project
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

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const TypeIcon = getTypeIcon(project.type);
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-muted rounded-lg">
                        <TypeIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{project.name}</CardTitle>
                        <CardDescription>{project.code}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={project.customer.avatar} />
                        <AvatarFallback>
                          {project.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{project.customer.name}</p>
                        <Badge 
                          variant={project.customer.type === 'self-registered' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {project.customer.type === 'self-registered' ? 'Self' : 'Company'}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getHealthColor(project.status.health)}>
                      {project.status.health.replace('-', ' ')}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.timeline.percentComplete}%</span>
                    </div>
                    <Progress value={project.timeline.percentComplete} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.timeline.milestones.completed}/{project.timeline.milestones.total} milestones</span>
                      <span>{project.timeline.daysRemaining} days left</span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Budget</span>
                      <span className="font-medium">
                        ₹{(project.budget.spent / 10000000).toFixed(1)}Cr / ₹{(project.budget.total / 10000000).toFixed(1)}Cr
                      </span>
                    </div>
                    <Progress 
                      value={(project.budget.spent / project.budget.total) * 100} 
                      className="h-2" 
                    />
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="text-lg font-bold">{project.team.totalMembers}</div>
                      <div className="text-xs text-muted-foreground">Team</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="text-lg font-bold text-yellow-600">{project.dpr.pendingReview}</div>
                      <div className="text-xs text-muted-foreground">DPR Pending</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="text-lg font-bold text-red-600">{project.issues.open}</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate(`/projects/${project.id}/customer-view`)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Customer View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
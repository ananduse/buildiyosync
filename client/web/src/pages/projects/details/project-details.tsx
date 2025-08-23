import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  Calendar,
  Users,
  DollarSign,
  Clock,
  MapPin,
  FileText,
  CheckCircle,
  AlertTriangle,
  Activity,
  Package,
  Briefcase,
  Home,
  Shield,
  Star,
  BarChart3,
  ArrowLeft,
  Share2,
  Edit,
  MoreVertical,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  TrendingUp,
  TrendingDown,
  Target,
  Layers,
  HardHat,
  Truck,
  ClipboardCheck,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Percent,
  IndianRupee,
  Timer,
  UserCheck,
  Settings,
  Info,
  ExternalLink,
  Copy,
  Bell,
  Zap,
  GitBranch,
  Camera,
  Paperclip
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data based on PRD
  const project = {
    id: 'PRJ001',
    code: 'SKY-2024-02',
    name: 'Skyline Towers - Phase 2',
    description: 'Premium residential complex with modern amenities and sustainable design features',
    customer: {
      id: 'CUST001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      avatar: '/avatars/customer1.jpg',
      type: 'self-registered',
      registeredDate: '2023-12-15',
      company: 'Kumar Enterprises',
      hasFullAccess: true,
      lastLogin: '2024-01-18 10:30 AM'
    },
    workspace: {
      id: 'WS001',
      name: 'Kumar Developers',
      logo: '/logos/kumar-dev.png',
      registration: 'REG/2020/KD001',
      gst: 'GST123456789'
    },
    type: 'residential',
    constructionType: 'new',
    location: {
      address: 'Plot 42, Sector 18, Gurgaon',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      coordinates: { lat: 28.4595, lng: 77.0266 },
      mapUrl: 'https://maps.google.com/...'
    },
    specifications: {
      plotArea: 25000,
      builtUpArea: 125000,
      floors: 24,
      units: 180,
      parkingSpaces: 360,
      gardenArea: 5000,
      setbacks: {
        front: 30,
        rear: 20,
        left: 15,
        right: 15
      }
    },
    status: {
      phase: 'execution',
      health: 'on-track',
      lastUpdated: '2024-01-18T10:30:00',
      completionPercentage: 68
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
      currency: 'INR',
      lastRevision: '2024-01-10',
      approvedBy: 'Rajesh Kumar',
      changeRequests: 3
    },
    timeline: {
      startDate: '2024-01-15',
      plannedEndDate: '2024-12-31',
      revisedEndDate: '2025-01-15',
      percentComplete: 68,
      daysRemaining: 245,
      daysElapsed: 120,
      milestones: [
        { name: 'Foundation', status: 'completed', date: '2024-02-15' },
        { name: 'Structure (10 floors)', status: 'completed', date: '2024-04-30' },
        { name: 'Structure (20 floors)', status: 'completed', date: '2024-07-31' },
        { name: 'Structure Complete', status: 'in-progress', date: '2024-09-30' },
        { name: 'MEP Installation', status: 'pending', date: '2024-11-30' },
        { name: 'Finishing Works', status: 'pending', date: '2024-12-31' }
      ]
    },
    team: {
      projectManager: {
        name: 'Amit Sharma',
        avatar: '/avatars/pm1.jpg',
        contact: '+91 98765 12345',
        email: 'amit.sharma@kumardevelopers.com'
      },
      architect: {
        name: 'Priya Patel',
        firm: 'Design Studio Associates',
        avatar: '/avatars/arch1.jpg',
        contact: '+91 98765 54321',
        license: 'ARCH/2020/1234'
      },
      siteSupervisor: {
        name: 'Rakesh Verma',
        avatar: '/avatars/ss1.jpg',
        contact: '+91 98765 11111',
        yearsExperience: 15
      },
      contractors: [
        { name: 'ABC Construction', type: 'Civil', contact: '+91 98765 22222' },
        { name: 'XYZ Electricals', type: 'Electrical', contact: '+91 98765 33333' },
        { name: 'PQR Plumbing', type: 'Plumbing', contact: '+91 98765 44444' }
      ],
      totalMembers: 45,
      activeToday: 38
    },
    regulatory: {
      approvalAuthority: 'GMDA',
      permitNumbers: ['GMDA/2024/001', 'FIRE/2024/042', 'ENV/2024/015'],
      sanctionedPlanStatus: 'approved',
      sanctionedPlanDate: '2023-12-01',
      environmentalClearance: { status: true, date: '2023-11-15', validTill: '2026-11-14' },
      fireNOC: { status: true, date: '2023-12-10', validTill: '2025-12-09' },
      occupancyCertificate: { status: 'pending' }
    },
    dpr: {
      totalSubmitted: 120,
      pendingReview: 2,
      approved: 115,
      rejected: 3,
      lastSubmitted: '2024-01-17',
      submissionTime: '18:00',
      nextDue: '2024-01-18'
    },
    materials: {
      totalOrders: 45,
      delivered: 32,
      inTransit: 5,
      pending: 8,
      totalValue: 125000000,
      topVendors: [
        { name: 'Steel Corp', amount: 45000000, orders: 12 },
        { name: 'Cement Industries', amount: 35000000, orders: 8 },
        { name: 'Glass Works', amount: 25000000, orders: 5 }
      ]
    },
    quality: {
      inspections: {
        total: 45,
        passed: 42,
        failed: 3,
        pending: 5
      },
      lastInspection: '2024-01-16',
      nextInspection: '2024-01-20',
      qualityScore: 92
    },
    safety: {
      incidents: {
        total: 2,
        minor: 2,
        major: 0,
        fatal: 0
      },
      lastIncident: '2024-01-05',
      safetyScore: 95,
      trainingSessions: 12,
      safeDays: 13
    },
    issues: {
      open: 8,
      inProgress: 5,
      resolved: 24,
      escalated: 2,
      critical: 1
    },
    documents: {
      total: 245,
      drawings: 85,
      contracts: 25,
      reports: 95,
      photos: 40,
      lastUploaded: '2024-01-17'
    },
    communications: {
      unreadMessages: 5,
      totalMessages: 156,
      meetings: {
        scheduled: 3,
        completed: 28
      }
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'on-track': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'at-risk': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'delayed': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Timer className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/projects')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <Badge variant="outline">{project.code}</Badge>
              <Badge className={getHealthColor(project.status.health)}>
                {project.status.health.replace('-', ' ')}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              {project.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Bell className="h-4 w-4 mr-2" />
                Configure Alerts
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Archive Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Customer Access Banner */}
      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle>Customer Has Full Access</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <div>
            <span className="font-medium">{project.customer.name}</span> can view all project data, documents, 
            and progress in real-time. Last accessed: {project.customer.lastLogin}
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View as Customer
          </Button>
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.status.completionPercentage}%</div>
            <Progress value={project.status.completionPercentage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {project.timeline.daysElapsed} days elapsed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{(project.budget.spent / 10000000).toFixed(1)}Cr
            </div>
            <div className="text-xs text-muted-foreground">
              of ₹{(project.budget.total / 10000000).toFixed(1)}Cr
            </div>
            <Progress 
              value={(project.budget.spent / project.budget.total) * 100} 
              className="h-2 mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.timeline.daysRemaining}</div>
            <p className="text-xs text-muted-foreground">
              Target: {new Date(project.timeline.plannedEndDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.team.activeToday}/{project.team.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              On site today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{project.quality.qualityScore}%</div>
            <p className="text-xs text-muted-foreground">
              {project.quality.inspections.passed}/{project.quality.inspections.total} passed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="dpr">DPR</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{project.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Construction Type</p>
                    <p className="font-medium capitalize">{project.constructionType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Area</p>
                    <p className="font-medium">{project.specifications.builtUpArea.toLocaleString()} sqft</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Floors</p>
                    <p className="font-medium">{project.specifications.floors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Units</p>
                    <p className="font-medium">{project.specifications.units}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parking</p>
                    <p className="font-medium">{project.specifications.parkingSpaces} spaces</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Location</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{project.location.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.location.city}, {project.location.state} - {project.location.pincode}
                      </p>
                      <Button variant="link" size="sm" className="px-0 h-auto">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View on Map
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={project.customer.avatar} />
                    <AvatarFallback>
                      {project.customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{project.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{project.customer.company}</p>
                    <Badge 
                      variant={project.customer.type === 'self-registered' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {project.customer.type === 'self-registered' ? 'Self Registered' : 'Company Created'}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Registered: {project.customer.registeredDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Login: {project.customer.lastLogin}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Regulatory Compliance */}
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Sanctioned Plan</span>
                    </div>
                    <Badge variant="success">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Environmental Clearance</span>
                    </div>
                    <Badge variant="success">Valid till {project.regulatory.environmentalClearance.validTill}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Fire NOC</span>
                    </div>
                    <Badge variant="success">Valid till {project.regulatory.fireNOC.validTill}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Occupancy Certificate</span>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Permit Numbers</p>
                    <div className="flex flex-wrap gap-2">
                      {project.regulatory.permitNumbers.map(permit => (
                        <Badge key={permit} variant="outline" className="text-xs">
                          {permit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">DPR Status</span>
                      <Badge variant={project.dpr.pendingReview > 0 ? 'destructive' : 'success'}>
                        {project.dpr.pendingReview} Pending
                      </Badge>
                    </div>
                    <Progress value={(project.dpr.approved / project.dpr.totalSubmitted) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {project.dpr.approved}/{project.dpr.totalSubmitted} Approved
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Materials</span>
                      <Badge variant="secondary">
                        {project.materials.pending} Pending
                      </Badge>
                    </div>
                    <Progress value={(project.materials.delivered / project.materials.totalOrders) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {project.materials.delivered}/{project.materials.totalOrders} Delivered
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Issues</span>
                      <Badge variant={project.issues.critical > 0 ? 'destructive' : 'secondary'}>
                        {project.issues.open} Open
                      </Badge>
                    </div>
                    <Progress value={(project.issues.resolved / (project.issues.resolved + project.issues.open)) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {project.issues.resolved} Resolved
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Safety</span>
                      <Badge variant="success">
                        {project.safety.safeDays} Safe Days
                      </Badge>
                    </div>
                    <Progress value={project.safety.safetyScore} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Score: {project.safety.safetyScore}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Milestones Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>Track major project phases and deliverables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-9 top-3 bottom-3 w-0.5 bg-muted"></div>
                <div className="space-y-4">
                  {project.timeline.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-background border-2">
                        {getMilestoneIcon(milestone.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{milestone.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(milestone.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              milestone.status === 'completed' ? 'success' :
                              milestone.status === 'in-progress' ? 'default' :
                              'secondary'
                            }
                          >
                            {milestone.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates and actions on the project</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {[
                    { icon: FileText, title: 'DPR Submitted', description: 'Daily progress report for Jan 17', time: '2 hours ago', color: 'text-blue-600' },
                    { icon: CheckCircle2, title: 'Task Completed', description: '10th floor slab casting completed', time: '4 hours ago', color: 'text-green-600' },
                    { icon: Truck, title: 'Material Delivered', description: '50 tons of steel delivered on site', time: '6 hours ago', color: 'text-purple-600' },
                    { icon: Users, title: 'Team Update', description: '5 new workers added to site team', time: '8 hours ago', color: 'text-orange-600' },
                    { icon: AlertTriangle, title: 'Issue Raised', description: 'Delay in electrical material delivery', time: '1 day ago', color: 'text-red-600' },
                    { icon: Camera, title: 'Photos Uploaded', description: '20 site progress photos added', time: '1 day ago', color: 'text-indigo-600' },
                  ].map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={cn("mt-0.5", activity.color)}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
                <CardDescription>Detailed allocation and utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Allocated</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Remaining</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(project.budget.allocated).map(([key, value]) => {
                      const spent = (value * 0.68); // Mock calculation
                      const remaining = value - spent;
                      return (
                        <TableRow key={key}>
                          <TableCell className="font-medium capitalize">{key}</TableCell>
                          <TableCell>₹{(value / 10000000).toFixed(2)}Cr</TableCell>
                          <TableCell>₹{(spent / 10000000).toFixed(2)}Cr</TableCell>
                          <TableCell>₹{(remaining / 10000000).toFixed(2)}Cr</TableCell>
                          <TableCell>
                            <Progress value={(spent / value) * 100} className="h-2" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Budget</span>
                    <span className="font-medium">₹{(project.budget.total / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Spent</span>
                    <span className="font-medium text-orange-600">₹{(project.budget.spent / 10000000).toFixed(1)}Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className="font-medium text-green-600">₹{(project.budget.pending / 10000000).toFixed(1)}Cr</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Change Requests</p>
                  <Badge variant="outline">{project.budget.changeRequests} pending approval</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Last Revision</p>
                  <p className="text-sm">{project.budget.lastRevision}</p>
                  <p className="text-xs text-muted-foreground">Approved by {project.budget.approvedBy}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional tabs content would go here */}
      </Tabs>
    </div>
  );
}
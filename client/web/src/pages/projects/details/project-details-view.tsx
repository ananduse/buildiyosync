import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format, differenceInDays, addDays, subDays } from 'date-fns';
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
  Timer,
  UserCheck,
  Settings,
  Info,
  ExternalLink,
  Copy,
  Bell,
  Zap,
  GitBranch,
  Hammer,
  Wrench,
  CircleDollarSign,
  Award,
  Flag,
  FolderOpen,
  Upload,
  Paperclip,
  Image,
  Film,
  File,
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  Search,
  Printer,
  Send,
  Archive,
  Trash2,
  RefreshCw,
  Save,
  X,
  CheckSquare,
  Square,
  Circle,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Gauge,
  Cpu,
  Wallet,
  CreditCard,
  Receipt,
  Calculator,
  TrendingUpIcon,
  TrendingDownIcon,
  Hash,
  CalendarDays,
  CalendarClock,
  UserPlus,
  UserMinus,
  UsersIcon,
  MessageCircle,
  MessagesSquare,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Bookmark,
  Share,
  Link2,
  Unlink,
  Camera,
  Video,
  Mic,
  Volume2,
  Wifi,
  WifiOff,
  Database,
  Server,
  Cloud,
  CloudDownload,
  CloudUpload,
  HelpCircle,
  BookOpen,
  Clipboard,
  ClipboardList,
  ClipboardCopy,
  ClipboardPaste,
  FolderPlus,
  FilePlus,
  FileX,
  FolderX,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Import tab components
import { 
  TeamTab, 
  BudgetTab, 
  TasksTab, 
  DocumentsTab, 
  ReportsTab,
  CalendarTab,
  ActivityTab 
} from './project-details-tabs';
import { TimelineTabEnhanced } from './timeline-tab-enhanced';

// Helper function to generate random avatar colors
const getRandomAvatarColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-fuchsia-500',
    'bg-rose-500',
    'bg-sky-500',
    'bg-amber-500',
    'bg-lime-500',
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

// Mock project data - in real app, this would come from API
const generateMockProjectDetails = () => {
  return {
    id: 'PRJ-2024-001',
    name: 'Skyline Tower Complex',
    description: 'A premium 45-story mixed-use development featuring luxury residences, commercial spaces, and recreational facilities.',
    type: 'commercial',
    status: 'active',
    priority: 'high',
    phase: 'construction',
    
    customer: {
      id: 'CUST-001',
      name: 'Metropolitan Development Corp',
      type: 'enterprise',
      contact: {
        name: 'John Anderson',
        email: 'john.anderson@metrodev.com',
        phone: '+1 (555) 123-4567',
        position: 'Project Director'
      },
      logo: '',
      rating: 4.8,
      totalProjects: 12,
      activeProjects: 3
    },

    location: {
      address: '1234 Downtown Boulevard',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },

    timeline: {
      startDate: '2024-01-15',
      endDate: '2025-12-31',
      actualStartDate: '2024-01-20',
      estimatedEndDate: '2025-11-30',
      progress: 35,
      duration: 716,
      daysElapsed: 250,
      daysRemaining: 466,
      isDelayed: false,
      delayDays: 0,
      workingDays: 520,
      holidays: 45,
      weatherDays: 15
    },

    milestones: [
      { id: 1, name: 'Site Preparation', status: 'completed', date: '2024-02-15', completedDate: '2024-02-10' },
      { id: 2, name: 'Foundation Complete', status: 'completed', date: '2024-04-30', completedDate: '2024-05-05' },
      { id: 3, name: 'Structural Frame 50%', status: 'in-progress', date: '2024-08-15', progress: 75 },
      { id: 4, name: 'Structural Frame Complete', status: 'pending', date: '2024-11-30' },
      { id: 5, name: 'MEP Installation', status: 'pending', date: '2025-03-15' },
      { id: 6, name: 'Interior Finishing', status: 'pending', date: '2025-07-30' },
      { id: 7, name: 'Final Inspection', status: 'pending', date: '2025-11-15' },
      { id: 8, name: 'Project Handover', status: 'pending', date: '2025-12-31' }
    ],

    budget: {
      total: 125000000,
      allocated: 120000000,
      spent: 42500000,
      committed: 35000000,
      remaining: 77500000,
      contingency: 5000000,
      currency: 'USD',
      lastUpdated: '2024-11-20',
      costVariance: -2500000,
      costPerformanceIndex: 0.98,
      earnedValue: 41650000,
      plannedValue: 43750000,
      actualCost: 42500000
    },

    financials: {
      revenue: 150000000,
      profit: 25000000,
      margin: 16.67,
      invoiced: 35000000,
      received: 32000000,
      outstanding: 3000000,
      retentions: 1500000,
      penalties: 0,
      bonuses: 500000
    },

    team: {
      projectManager: {
        id: 'PM-001',
        name: 'Sarah Johnson',
        avatar: '',
        email: 'sarah.johnson@company.com',
        phone: '+1 (555) 234-5678',
        experience: '15 years',
        certification: ['PMP', 'LEED AP']
      },
      siteManager: {
        id: 'SM-001',
        name: 'Mike Chen',
        avatar: '',
        email: 'mike.chen@company.com',
        phone: '+1 (555) 345-6789'
      },
      totalMembers: 145,
      employees: 85,
      contractors: 45,
      vendors: 15,
      departments: [
        { name: 'Engineering', count: 35 },
        { name: 'Construction', count: 65 },
        { name: 'Safety', count: 12 },
        { name: 'Quality', count: 8 },
        { name: 'Administration', count: 10 },
        { name: 'Finance', count: 5 },
        { name: 'Procurement', count: 10 }
      ]
    },

    tasks: {
      total: 245,
      completed: 98,
      inProgress: 45,
      pending: 82,
      overdue: 20,
      critical: 8,
      todaysDue: 5,
      weekDue: 22
    },

    risks: {
      total: 18,
      high: 3,
      medium: 8,
      low: 7,
      mitigated: 12,
      active: 6,
      categories: [
        { name: 'Weather', count: 3 },
        { name: 'Supply Chain', count: 5 },
        { name: 'Technical', count: 4 },
        { name: 'Financial', count: 2 },
        { name: 'Regulatory', count: 2 },
        { name: 'Safety', count: 2 }
      ]
    },

    issues: {
      total: 25,
      critical: 2,
      major: 5,
      minor: 18,
      resolved: 20,
      open: 5,
      avgResolutionTime: '3.5 days'
    },

    compliance: {
      safety: 95,
      quality: 92,
      environmental: 88,
      regulatory: 94,
      overall: 92.25,
      certifications: ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
      lastAudit: '2024-10-15',
      nextAudit: '2024-12-15',
      violations: 0,
      warnings: 2
    },

    resources: {
      equipment: [
        { name: 'Tower Cranes', total: 4, active: 3, maintenance: 1 },
        { name: 'Excavators', total: 6, active: 4, maintenance: 2 },
        { name: 'Concrete Pumps', total: 3, active: 2, maintenance: 1 },
        { name: 'Generators', total: 8, active: 6, maintenance: 2 }
      ],
      materials: [
        { name: 'Concrete', unit: 'm³', used: 12500, total: 35000, percentage: 35.7 },
        { name: 'Steel', unit: 'tons', used: 3200, total: 8500, percentage: 37.6 },
        { name: 'Glass', unit: 'm²', used: 5000, total: 25000, percentage: 20 },
        { name: 'Cables', unit: 'km', used: 45, total: 150, percentage: 30 }
      ]
    },

    documents: {
      total: 342,
      categories: [
        { name: 'Contracts', count: 15, icon: FileText },
        { name: 'Drawings', count: 125, icon: FileCheck },
        { name: 'Reports', count: 45, icon: ClipboardCheck },
        { name: 'Permits', count: 22, icon: Shield },
        { name: 'Photos', count: 85, icon: Image },
        { name: 'Videos', count: 12, icon: Film },
        { name: 'Specifications', count: 38, icon: FileText }
      ],
      recentUploads: [
        { name: 'Structural_Analysis_Report_Nov.pdf', size: '2.4 MB', date: '2024-11-20', uploader: 'John Doe' },
        { name: 'Site_Photos_Week_47.zip', size: '145 MB', date: '2024-11-19', uploader: 'Mike Chen' },
        { name: 'Safety_Inspection_Report.pdf', size: '1.2 MB', date: '2024-11-18', uploader: 'Sarah Johnson' }
      ]
    },

    weather: {
      current: { condition: 'Clear', temp: 72, humidity: 65, wind: 8 },
      forecast: [
        { day: 'Mon', condition: 'Sunny', high: 75, low: 62, rainChance: 0 },
        { day: 'Tue', condition: 'Partly Cloudy', high: 73, low: 61, rainChance: 10 },
        { day: 'Wed', condition: 'Rain', high: 68, low: 58, rainChance: 80 },
        { day: 'Thu', condition: 'Cloudy', high: 70, low: 59, rainChance: 30 },
        { day: 'Fri', condition: 'Sunny', high: 74, low: 63, rainChance: 5 }
      ],
      impactDays: 3,
      delayRisk: 'low'
    },

    quality: {
      score: 94,
      inspections: {
        total: 125,
        passed: 118,
        failed: 7,
        pending: 5
      },
      defects: {
        total: 45,
        critical: 2,
        major: 12,
        minor: 31,
        resolved: 40
      },
      rework: {
        instances: 8,
        cost: 125000,
        percentage: 0.29
      }
    },

    safety: {
      score: 96,
      incidents: {
        total: 3,
        major: 0,
        minor: 3,
        nearMiss: 12
      },
      daysWithoutIncident: 45,
      trainingSessions: 24,
      toolboxTalks: 156,
      safetyAudits: 12,
      complianceRate: 98.5
    },

    communications: {
      meetings: {
        total: 145,
        upcoming: 5,
        minutes: 140
      },
      rfi: {
        total: 89,
        open: 12,
        closed: 77,
        avgResponseTime: '2.3 days'
      },
      submittals: {
        total: 156,
        approved: 142,
        rejected: 8,
        pending: 6
      },
      changeOrders: {
        total: 18,
        approved: 14,
        pending: 3,
        rejected: 1,
        value: 2500000
      }
    },

    performance: {
      spi: 0.98, // Schedule Performance Index
      cpi: 0.97, // Cost Performance Index
      productivity: 92,
      efficiency: 89,
      qualityIndex: 94,
      safetyIndex: 96,
      overallHealth: 'good'
    },

    activities: [
      {
        id: 1,
        type: 'milestone',
        title: 'Foundation work completed',
        description: 'Successfully completed foundation work 5 days ahead of schedule',
        user: 'Mike Chen',
        timestamp: '2024-11-20 14:30',
        icon: CheckCircle2,
        color: 'text-green-600'
      },
      {
        id: 2,
        type: 'issue',
        title: 'Material delivery delayed',
        description: 'Steel beam delivery postponed by 2 days due to supplier issues',
        user: 'Sarah Johnson',
        timestamp: '2024-11-20 11:15',
        icon: AlertTriangle,
        color: 'text-yellow-600'
      },
      {
        id: 3,
        type: 'document',
        title: 'Safety report uploaded',
        description: 'Weekly safety inspection report has been uploaded',
        user: 'John Doe',
        timestamp: '2024-11-20 09:00',
        icon: FileText,
        color: 'text-blue-600'
      },
      {
        id: 4,
        type: 'meeting',
        title: 'Client meeting scheduled',
        description: 'Progress review meeting with client scheduled for tomorrow',
        user: 'Sarah Johnson',
        timestamp: '2024-11-19 16:45',
        icon: Calendar,
        color: 'text-purple-600'
      }
    ]
  };
};

export default function ProjectDetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedView, setSelectedView] = useState('details');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data - in real app, fetch based on ID
  const project = useMemo(() => generateMockProjectDetails(), []);

  // Calculate various metrics
  const scheduleVariance = differenceInDays(new Date(project.timeline.estimatedEndDate), new Date(project.timeline.endDate));
  const budgetUtilization = (project.budget.spent / project.budget.total) * 100;
  const timeElapsed = (project.timeline.daysElapsed / project.timeline.duration) * 100;
  
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      'on-hold': 'bg-yellow-100 text-yellow-700',
      delayed: 'bg-red-100 text-red-700',
      completed: 'bg-gray-100 text-gray-700',
      planning: 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getHealthColor = (health: string) => {
    const colors: Record<string, string> = {
      excellent: 'text-green-600',
      good: 'text-blue-600',
      fair: 'text-yellow-600',
      poor: 'text-orange-600',
      critical: 'text-red-600'
    };
    return colors[health] || 'text-gray-600';
  };

  const getHealthIcon = (health: string) => {
    if (health === 'excellent' || health === 'good') return TrendingUp;
    if (health === 'fair') return ArrowRight;
    return TrendingDown;
  };

  const HealthIcon = getHealthIcon(project.performance.overallHealth);

  // Chart data
  const budgetChartData = [
    { name: 'Spent', value: project.budget.spent, fill: '#3b82f6' },
    { name: 'Committed', value: project.budget.committed, fill: '#10b981' },
    { name: 'Remaining', value: project.budget.remaining, fill: '#e5e7eb' }
  ];

  const progressChartData = [
    { month: 'Jan', planned: 5, actual: 4 },
    { month: 'Feb', planned: 10, actual: 9 },
    { month: 'Mar', planned: 18, actual: 16 },
    { month: 'Apr', planned: 25, actual: 24 },
    { month: 'May', planned: 32, actual: 30 },
    { month: 'Jun', planned: 38, actual: 35 },
  ];

  const resourceUtilizationData = [
    { resource: 'Labor', utilization: 85 },
    { resource: 'Equipment', utilization: 72 },
    { resource: 'Materials', utilization: 68 },
    { resource: 'Subcontractors', utilization: 90 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/projects/list">All Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/projects/list')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{project.name}</h1>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority} priority
                  </Badge>
                  <Badge variant="outline">
                    {project.phase}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    <span>{project.id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span>{project.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{project.location.city}, {project.location.state}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(new Date(project.timeline.startDate), 'MMM dd, yyyy')} - {format(new Date(project.timeline.endDate), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HealthIcon className={cn("h-3 w-3", getHealthColor(project.performance.overallHealth))} />
                    <span className={getHealthColor(project.performance.overallHealth)}>
                      {project.performance.overallHealth} health
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-12 p-0 bg-transparent border-b-0 w-full justify-start">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Layers className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Users className="h-4 w-4 mr-2" />
                Team
              </TabsTrigger>
              <TabsTrigger 
                value="budget" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Budget
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <CheckSquare className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger 
                value="calendar" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
              >
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.timeline.progress}%</div>
                  <Progress value={project.timeline.progress} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {project.timeline.daysElapsed} of {project.timeline.duration} days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Budget Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${(project.budget.spent / 1000000).toFixed(1)}M
                  </div>
                  <Progress 
                    value={budgetUtilization} 
                    className={cn("mt-2", budgetUtilization > 90 && "[&>div]:bg-red-500")}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {budgetUtilization.toFixed(1)}% of ${(project.budget.total / 1000000).toFixed(1)}M
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Schedule Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    {project.performance.spi}
                    {project.performance.spi >= 1 ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="mt-2">
                    <Badge variant={project.timeline.isDelayed ? "destructive" : "success"}>
                      {project.timeline.isDelayed ? `${project.timeline.delayDays} days delayed` : 'On Schedule'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {project.timeline.daysRemaining} days remaining
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Team Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{project.team.totalMembers}</div>
                  <div className="flex gap-4 mt-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Employees:</span>
                      <span className="ml-1 font-medium">{project.team.employees}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contractors:</span>
                      <span className="ml-1 font-medium">{project.team.contractors}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {project.team.departments.length} departments
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                    <CardDescription>Planned vs Actual progress comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={progressChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="planned" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="Planned"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="Actual"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Milestones</CardTitle>
                        <CardDescription>Key project milestones and deliverables</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Milestone
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center",
                            milestone.status === 'completed' ? "bg-green-100" :
                            milestone.status === 'in-progress' ? "bg-blue-100" :
                            "bg-gray-100"
                          )}>
                            {milestone.status === 'completed' ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : milestone.status === 'in-progress' ? (
                              <Timer className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{milestone.name}</p>
                              {milestone.status === 'in-progress' && milestone.progress && (
                                <Badge variant="outline" className="text-xs">
                                  {milestone.progress}%
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {milestone.status === 'completed' && milestone.completedDate
                                ? `Completed on ${format(new Date(milestone.completedDate), 'MMM dd, yyyy')}`
                                : `Due ${format(new Date(milestone.date), 'MMM dd, yyyy')}`}
                            </p>
                          </div>

                          {milestone.status === 'in-progress' && milestone.progress && (
                            <Progress value={milestone.progress} className="w-24" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>Latest project updates and changes</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                          <div key={activity.id} className="flex gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center bg-gray-100"
                            )}>
                              <Icon className={cn("h-4 w-4", activity.color)} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-xs text-muted-foreground">{activity.user}</p>
                                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - 1 col */}
              <div className="space-y-6">
                {/* Project Health */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Schedule</span>
                        <div className="flex items-center gap-2">
                          <Progress value={project.performance.spi * 100} className="w-24" />
                          <span className="text-sm font-medium">{(project.performance.spi * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Budget</span>
                        <div className="flex items-center gap-2">
                          <Progress value={project.performance.cpi * 100} className="w-24" />
                          <span className="text-sm font-medium">{(project.performance.cpi * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quality</span>
                        <div className="flex items-center gap-2">
                          <Progress value={project.quality.score} className="w-24" />
                          <span className="text-sm font-medium">{project.quality.score}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Safety</span>
                        <div className="flex items-center gap-2">
                          <Progress value={project.safety.score} className="w-24" />
                          <span className="text-sm font-medium">{project.safety.score}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Compliance</span>
                        <div className="flex items-center gap-2">
                          <Progress value={project.compliance.overall} className="w-24" />
                          <span className="text-sm font-medium">{project.compliance.overall.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Health</span>
                      <Badge className={cn(
                        "capitalize",
                        project.performance.overallHealth === 'excellent' && "bg-green-100 text-green-700",
                        project.performance.overallHealth === 'good' && "bg-blue-100 text-blue-700",
                        project.performance.overallHealth === 'fair' && "bg-yellow-100 text-yellow-700",
                        project.performance.overallHealth === 'poor' && "bg-orange-100 text-orange-700",
                        project.performance.overallHealth === 'critical' && "bg-red-100 text-red-700"
                      )}>
                        {project.performance.overallHealth}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Breakdown</CardTitle>
                    <CardDescription>
                      Total: ${(project.budget.total / 1000000).toFixed(1)}M
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={budgetChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {budgetChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="space-y-2 mt-4">
                      {budgetChartData.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded" style={{ backgroundColor: item.fill }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">
                            ${(item.value / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Key Contacts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Key Contacts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={project.team.projectManager.avatar} />
                          <AvatarFallback className={cn(getAvatarColor(project.team.projectManager.id), 'text-white')}>
                            {project.team.projectManager.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{project.team.projectManager.name}</p>
                          <p className="text-xs text-muted-foreground">Project Manager</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={project.team.siteManager.avatar} />
                          <AvatarFallback className={cn(getAvatarColor(project.team.siteManager.id), 'text-white')}>
                            {project.team.siteManager.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{project.team.siteManager.name}</p>
                          <p className="text-xs text-muted-foreground">Site Manager</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className={cn(getAvatarColor(project.customer.id), 'text-white')}>
                            {project.customer.contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{project.customer.contact.name}</p>
                          <p className="text-xs text-muted-foreground">Client Representative</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      View All Contacts
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      New Report
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      Create Task
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && <TimelineTabEnhanced project={project} />}

        {activeTab === 'team' && <TeamTab project={project} />}
        {activeTab === 'budget' && <BudgetTab project={project} />}
        {activeTab === 'tasks' && <TasksTab project={project} />}
        {activeTab === 'documents' && <DocumentsTab project={project} />}
        {activeTab === 'reports' && <ReportsTab project={project} />}
        {activeTab === 'calendar' && <CalendarTab project={project} />}
        {activeTab === 'activity' && <ActivityTab project={project} />}
      </div>
    </div>
  );
}
import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
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
  LayoutGrid,
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
  Flag,
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
  ListTodo,
  FolderOpenIcon,
  BarChart2,
  ActivityIcon,
  Kanban,
} from 'lucide-react';

import { cn } from '@/lib/utils';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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

// Import tab components for project views
import { 
  TeamTab, 
  BudgetTab, 
  TasksTab, 
  DocumentsTab, 
  ReportsTab,
  CalendarTab,
  ActivityTab,
  DetailsTab 
} from './project-details-tabs';
import { TimelineTabEnhanced } from './timeline-tab-enhanced';

// Import Tamil property data
import { tamilPropertyProjects } from '@/data/tamil-property-projects';
import { sampleProjects, getProjectById } from '@/data/sample-projects';

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

// Generate project details from Tamil property data
const generateMockProjectDetails = (projectId?: string) => {
  // Try to get project from sampleProjects (which includes Tamil projects)
  const sampleProject = projectId ? getProjectById(projectId) : null;
  
  if (sampleProject) {
    // Find corresponding Tamil property project for extended data
    const tamilProject = tamilPropertyProjects.find(p => p.projectId === sampleProject.id);
    
    if (tamilProject) {
      // Use Tamil project data
      return {
        id: tamilProject.projectId,
        name: tamilProject.project_name,
        description: `${tamilProject.configuration} ${tamilProject.property_type} project in ${tamilProject.location.locality}, ${tamilProject.location.city}. ${tamilProject.property_details.super_built_up_area_sqft || tamilProject.property_details.plot_area_sqft} sqft with ${tamilProject.amenities.join(', ')}.`,
        type: tamilProject.property_type.toLowerCase(),
        status: sampleProject.status,
        priority: sampleProject.priority,
        phase: tamilProject.projectPhase,
        
        customer: {
          id: `CUST-${tamilProject.property_id}`,
          name: tamilProject.builder,
          type: 'enterprise',
          contact: {
            name: tamilProject.owner,
            email: `${tamilProject.owner.toLowerCase().replace(/[^a-z]/g, '')}@${tamilProject.builder.toLowerCase().replace(/[^a-z]/g, '')}.com`,
            phone: tamilProject.contact_details?.phone || '+91 98765 43210',
            position: 'Project Director'
          },
          logo: '',
          rating: 4.8,
          totalProjects: 12,
          activeProjects: 3
        },

        location: {
          address: tamilProject.location.address || tamilProject.location.locality,
          city: tamilProject.location.city,
          state: tamilProject.location.state,
          country: 'India',
          zipCode: tamilProject.location.pincode || '600001',
          coordinates: {
            lat: tamilProject.location.coordinates?.lat || 13.0827,
            lng: tamilProject.location.coordinates?.lng || 80.2707
          }
        },

        timeline: {
          startDate: tamilProject.startDate,
          endDate: tamilProject.endDate,
          actualStartDate: tamilProject.startDate,
          estimatedEndDate: tamilProject.endDate,
          progress: tamilProject.progress,
          duration: Math.ceil((new Date(tamilProject.endDate).getTime() - new Date(tamilProject.startDate).getTime()) / (1000 * 60 * 60 * 24)),
          daysElapsed: Math.ceil((Date.now() - new Date(tamilProject.startDate).getTime()) / (1000 * 60 * 60 * 24)),
          daysRemaining: Math.ceil((new Date(tamilProject.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
          isDelayed: false,
          delayDays: 0,
          workingDays: Math.ceil((new Date(tamilProject.endDate).getTime() - new Date(tamilProject.startDate).getTime()) / (1000 * 60 * 60 * 24) * 0.7),
          holidays: 45,
          weatherDays: 15,
          milestones: tamilProject.milestones || [
            { id: 'M1', name: 'Site Preparation', status: 'completed', date: tamilProject.startDate },
            { id: 'M2', name: 'Foundation Complete', status: tamilProject.progress > 20 ? 'completed' : 'pending', date: '2024-04-30' },
            { id: 'M3', name: 'Structure Complete', status: tamilProject.progress > 50 ? 'completed' : 'in-progress', date: '2024-08-15' },
            { id: 'M4', name: 'MEP Installation', status: 'pending', date: '2025-03-15' },
            { id: 'M5', name: 'Interior Finishing', status: 'pending', date: '2025-07-30' },
            { id: 'M6', name: 'Final Inspection', status: 'pending', date: '2025-11-15' },
            { id: 'M7', name: 'Project Handover', status: 'pending', date: tamilProject.endDate }
          ]
        },

        milestones: tamilProject.milestones || [
          { id: 1, name: 'Site Preparation', status: 'completed', date: tamilProject.startDate, completedDate: tamilProject.startDate },
          { id: 2, name: 'Foundation Complete', status: tamilProject.progress > 20 ? 'completed' : 'pending', date: '2024-04-30', progress: tamilProject.progress > 20 ? 100 : 0 },
          { id: 3, name: 'Structure Complete', status: tamilProject.progress > 50 ? 'completed' : tamilProject.progress > 30 ? 'in-progress' : 'pending', date: '2024-08-15', progress: tamilProject.progress > 50 ? 100 : tamilProject.progress * 2 },
          { id: 4, name: 'MEP Installation', status: tamilProject.progress > 70 ? 'completed' : tamilProject.progress > 60 ? 'in-progress' : 'pending', date: '2025-03-15' },
          { id: 5, name: 'Interior Finishing', status: tamilProject.progress > 85 ? 'completed' : tamilProject.progress > 75 ? 'in-progress' : 'pending', date: '2025-07-30' },
          { id: 6, name: 'Final Inspection', status: tamilProject.progress > 95 ? 'completed' : tamilProject.progress > 90 ? 'in-progress' : 'pending', date: '2025-11-15' },
          { id: 7, name: 'Project Handover', status: tamilProject.progress >= 100 ? 'completed' : 'pending', date: tamilProject.endDate }
        ],

        budget: {
          total: tamilProject.budget,
          allocated: tamilProject.budget * 0.96,
          spent: tamilProject.spent,
          committed: tamilProject.budget * 0.28,
          remaining: tamilProject.budget - tamilProject.spent,
          contingency: tamilProject.budget * 0.04,
          currency: 'INR',
          lastUpdated: '2024-11-20',
          costVariance: -2500000,
          costPerformanceIndex: 0.98,
          earnedValue: tamilProject.spent * 0.98,
          plannedValue: tamilProject.budget * (tamilProject.progress / 100),
          actualCost: tamilProject.spent
        },

        financials: {
          revenue: tamilProject.pricing?.base_price || tamilProject.budget * 1.2,
          profit: (tamilProject.pricing?.base_price || tamilProject.budget * 1.2) * 0.167,
          margin: 16.67,
          invoiced: tamilProject.spent * 0.82,
          received: tamilProject.spent * 0.75,
          outstanding: tamilProject.spent * 0.07,
          retentions: tamilProject.spent * 0.035,
          penalties: 0,
          bonuses: 500000
        },

        team: {
          projectManager: {
            id: 'PM-001',
            name: tamilProject.owner,
            avatar: '',
            email: `${tamilProject.owner.toLowerCase().replace(/[^a-z]/g, '')}@company.com`,
            phone: tamilProject.contact_details?.phone || '+91 98765 43210',
            experience: '15 years',
            certification: ['PMP', 'LEED AP']
          },
          siteManager: {
            id: 'SM-001',
            name: tamilProject.team?.[0] || 'Mr. A. Kumar',
            avatar: '',
            email: `${(tamilProject.team?.[0] || 'kumar').toLowerCase().replace(/[^a-z]/g, '')}@company.com`,
            phone: '+91 98765 43211'
          },
          totalMembers: tamilProject.team?.length || 145,
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

        tasks: tamilProject.tasks || {
          total: 245,
          completed: Math.floor(245 * tamilProject.progress / 100),
          inProgress: 45,
          pending: Math.floor(245 * (100 - tamilProject.progress) / 100),
          overdue: 20,
          critical: 8,
          todaysDue: 5,
          weekDue: 22
        },

        risks: {
          total: 18,
          high: tamilProject.riskLevel === 'high' ? 6 : tamilProject.riskLevel === 'critical' ? 8 : 3,
          medium: tamilProject.riskLevel === 'medium' ? 8 : 5,
          low: 7,
          mitigated: 12,
          active: 6,
          level: tamilProject.riskLevel || 'medium',
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
          safety: tamilProject.safetyScore || 95,
          quality: tamilProject.qualityScore || 92,
          environmental: 88,
          regulatory: 94,
          overall: ((tamilProject.safetyScore || 95) + (tamilProject.qualityScore || 92) + 88 + 94) / 4,
          certifications: tamilProject.compliance?.certifications || ['ISO 9001', 'ISO 14001', 'OHSAS 18001'],
          lastAudit: '2024-10-15',
          nextAudit: '2024-12-15',
          violations: 0,
          warnings: 2
        },

        resources: {
          equipment: tamilProject.resources?.equipment || [
            { name: 'Tower Cranes', total: 4, active: 3, maintenance: 1 },
            { name: 'Excavators', total: 6, active: 4, maintenance: 2 },
            { name: 'Concrete Pumps', total: 3, active: 2, maintenance: 1 },
            { name: 'Generators', total: 8, active: 6, maintenance: 2 }
          ],
          materials: tamilProject.resources?.materials || [
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
            { name: 'Structural_Analysis_Report_Nov.pdf', size: '2.4 MB', date: '2024-11-20', uploader: tamilProject.owner },
            { name: 'Site_Photos_Week_47.zip', size: '145 MB', date: '2024-11-19', uploader: tamilProject.team?.[0] || 'Site Manager' },
            { name: 'Safety_Inspection_Report.pdf', size: '1.2 MB', date: '2024-11-18', uploader: tamilProject.owner }
          ]
        },

        weather: {
          current: { condition: 'Clear', temp: 28, humidity: 65, wind: 8 },
          forecast: [
            { day: 'Mon', condition: 'Sunny', high: 32, low: 24, rainChance: 0 },
            { day: 'Tue', condition: 'Partly Cloudy', high: 31, low: 23, rainChance: 10 },
            { day: 'Wed', condition: 'Rain', high: 28, low: 22, rainChance: 80 },
            { day: 'Thu', condition: 'Cloudy', high: 29, low: 23, rainChance: 30 },
            { day: 'Fri', condition: 'Sunny', high: 31, low: 24, rainChance: 5 }
          ],
          impactDays: 3,
          delayRisk: 'low'
        },

        quality: {
          score: tamilProject.qualityScore || 94,
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
          score: tamilProject.safetyScore || 96,
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
          spi: 0.98,
          cpi: 0.97,
          productivity: 92,
          efficiency: 89,
          qualityIndex: tamilProject.qualityScore || 94,
          safetyIndex: tamilProject.safetyScore || 96,
          overallHealth: tamilProject.qualityScore >= 90 ? 'good' : 'fair'
        },

        activities: [
          {
            id: 1,
            type: 'milestone',
            title: 'Foundation work completed',
            description: 'Successfully completed foundation work as per schedule',
            user: tamilProject.owner,
            timestamp: '2024-11-20 14:30',
            icon: CheckCircle2,
            color: 'text-green-600'
          },
          {
            id: 2,
            type: 'issue',
            title: 'Material delivery update',
            description: 'Construction materials delivered on time',
            user: tamilProject.team?.[0] || 'Site Manager',
            timestamp: '2024-11-20 11:15',
            icon: AlertTriangle,
            color: 'text-yellow-600'
          },
          {
            id: 3,
            type: 'document',
            title: 'Safety report uploaded',
            description: 'Weekly safety inspection report has been uploaded',
            user: tamilProject.owner,
            timestamp: '2024-11-20 09:00',
            icon: FileText,
            color: 'text-blue-600'
          },
          {
            id: 4,
            type: 'meeting',
            title: 'Client meeting scheduled',
            description: 'Progress review meeting with client scheduled',
            user: tamilProject.owner,
            timestamp: '2024-11-19 16:45',
            icon: Calendar,
            color: 'text-purple-600'
          }
        ]
      };
    }
  }

  // Fallback to default mock data if project not found
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
      weatherDays: 15,
      milestones: [
        { id: 'M1', name: 'Site Preparation', status: 'completed', date: '2024-02-15' },
        { id: 'M2', name: 'Foundation Complete', status: 'completed', date: '2024-04-30' },
        { id: 'M3', name: 'Structural Frame 50%', status: 'in-progress', date: '2024-08-15' },
        { id: 'M4', name: 'Structural Frame Complete', status: 'pending', date: '2024-11-30' },
        { id: 'M5', name: 'MEP Installation', status: 'pending', date: '2025-03-15' },
        { id: 'M6', name: 'Interior Finishing', status: 'pending', date: '2025-07-30' },
        { id: 'M7', name: 'Final Inspection', status: 'pending', date: '2025-11-15' },
        { id: 'M8', name: 'Project Handover', status: 'pending', date: '2025-12-31' }
      ]
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
      level: 'medium',
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
  const location = useLocation();
  const [selectedView, setSelectedView] = useState('details');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Determine active tab from URL
  const getActiveTab = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const validTabs = ['overview', 'activity', 'timeline', 'team', 'tasks', 'budget', 'documents', 'calendar', 'reports', 'details'];
    
    if (validTabs.includes(lastSegment)) {
      return lastSegment;
    }
    return 'overview'; // default tab
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  
  // Update active tab when URL changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);
  
  // Get project data based on ID from Tamil projects
  const project = useMemo(() => generateMockProjectDetails(id), [id]);

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

  const getRiskColor = (level: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
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
        <div className="container mx-auto py-4 max-w-[1600px] px-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/projects">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/projects/list">All Projects</Link>
                </BreadcrumbLink>
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
      </div>

      {/* Tab Navigation - Moved to top */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-[1600px] px-0">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value);
              navigate(`/projects/${id}/${value}`);
            }}
            className="w-full"
          >
            <TabsList 
              variant="line" 
              size="md"
              className="flex items-center border-b-0 border-border px-2 sm:px-4 lg:px-6 gap-0 sm:gap-2 md:gap-4 lg:gap-6 bg-transparent w-full justify-start overflow-x-auto scrollbar-none [&_button]:border-b-2 [&_button_svg]:size-4 [&_button]:text-secondary-foreground min-h-[48px]"
            >
              <TabsTrigger 
                value="overview" 
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="inline sm:hidden">View</span>
              </TabsTrigger>
              <TabsTrigger 
                value="activity"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Activity</span>
                <span className="inline sm:hidden">Act</span>
              </TabsTrigger>
              <TabsTrigger 
                value="timeline"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Timeline</span>
                <span className="inline sm:hidden">Time</span>
              </TabsTrigger>
              <TabsTrigger 
                value="team"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Team</span>
                <span className="inline sm:hidden">Team</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <CheckSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Tasks</span>
                <span className="inline sm:hidden">Task</span>
              </TabsTrigger>
              <TabsTrigger 
                value="budget"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Budget</span>
                <span className="inline sm:hidden">$$</span>
              </TabsTrigger>
              <TabsTrigger 
                value="documents"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Documents</span>
                <span className="inline sm:hidden">Docs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calendar"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Calendar</span>
                <span className="inline sm:hidden">Cal</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reports"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Reports</span>
                <span className="inline sm:hidden">Rep</span>
              </TabsTrigger>
              <TabsTrigger 
                value="details"
                className="flex-shrink-0 cursor-pointer whitespace-nowrap inline-flex justify-center items-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&:hover_svg]:text-primary [&[data-state=active]_svg]:text-primary border-b-2 text-muted-foreground border-transparent hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary gap-1 sm:gap-1.5 lg:gap-2 [&_svg]:size-3 sm:[&_svg]:size-4 text-xs sm:text-sm py-2.5 sm:py-2.5 px-2 sm:px-3 lg:px-4 min-w-fit"
              >
                <Info className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Details</span>
                <span className="inline sm:hidden">Info</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto max-w-[1600px] p-2 sm:p-4 lg:p-6">
        <Tabs value={activeTab} className="space-y-6">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.timeline.progress}%</div>
                <Progress value={project.timeline.progress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {project.timeline.daysElapsed} of {project.timeline.duration} days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
                <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(project.budget.spent / 1000000).toFixed(1)}M
                </div>
                <Progress value={budgetUtilization} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  of ${(project.budget.total / 1000000).toFixed(0)}M total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {project.tasks.completed}/{project.tasks.total}
                </div>
                <Progress value={(project.tasks.completed / project.tasks.total) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {project.tasks.inProgress} in progress
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{project.team.totalMembers}</div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs text-muted-foreground">
                    {project.team.employees} employees
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.team.contractors} contractors
                  </span>
                </div>
              </CardContent>
            </Card>
        </div>

        {/* Project Overview */}
        <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div>
                  <h4 className="font-semibold mb-2">Schedule Performance</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={progressChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line type="monotone" dataKey="planned" stroke="#94a3b8" strokeWidth={2} />
                      <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Budget Distribution</h4>
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
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
        </Card>

        {/* Project Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project ID:</span>
                  <span className="font-medium">{project.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">{project.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{project.location.city}, {project.location.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phase:</span>
                  <Badge>{project.phase}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-medium">{format(new Date(project.timeline.startDate), 'MMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="font-medium">{format(new Date(project.timeline.endDate), 'MMM dd, yyyy')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall Health:</span>
                  <span className="font-medium capitalize">{project.performance.overallHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Efficiency:</span>
                  <span className="font-medium">{project.performance.efficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quality Index:</span>
                  <span className="font-medium">{project.performance.qualityIndex}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Safety Index:</span>
                  <span className="font-medium">{project.performance.safetyIndex}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Productivity:</span>
                  <span className="font-medium">{project.performance.productivity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost Performance (CPI):</span>
                  <span className="font-medium">{project.performance.cpi}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Key Milestones</CardTitle>
            <CardDescription>Track progress of major project milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.milestones.slice(0, 5).map((milestone: any) => (
                <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {milestone.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                    {milestone.status === 'in-progress' && <Clock className="h-5 w-5 text-blue-600" />}
                    {milestone.status === 'pending' && <Circle className="h-5 w-5 text-gray-400" />}
                    <div>
                      <p className="font-medium">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">Due: {format(new Date(milestone.date), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                  <Badge variant={milestone.status === 'completed' ? 'default' : milestone.status === 'in-progress' ? 'secondary' : 'outline'}>
                    {milestone.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Navigate to different project sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/timeline`)}>
                <Calendar className="h-4 w-4 mr-2" />
                View Timeline
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/tasks`)}>
                <ListTodo className="h-4 w-4 mr-2" />
                Manage Tasks
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/team`)}>
                <Users className="h-4 w-4 mr-2" />
                Team Members
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/documents`)}>
                <FolderOpenIcon className="h-4 w-4 mr-2" />
                Documents
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/budget`)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Budget
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/calendar`)}>
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/reports`)}>
                <BarChart2 className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => navigate(`/projects/${id}/activity`)}>
                <ActivityIcon className="h-4 w-4 mr-2" />
                Activity
              </Button>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <ActivityTab project={project} />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <TimelineTabEnhanced project={project} />
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <TeamTab project={project} />
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <TasksTab project={project} />
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <BudgetTab project={project} />
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <DocumentsTab project={project} />
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarTab project={project} />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <ReportsTab project={project} />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <DetailsTab project={project} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
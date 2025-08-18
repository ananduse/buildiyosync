import { useState, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  Download,
  Upload,
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
  Grid3x3,
  List,
  LayoutGrid,
  Ruler,
  Square,
  Calculator,
  Receipt,
  FileBarChart,
  Shield,
  Activity,
  Hammer,
  Truck,
  ClipboardList,
  AlertCircle,
  Info,
  Star,
  Copy,
  Archive,
  Send,
  Phone,
  Mail,
  MessageSquare,
  Palette,
  TreePine,
  Mountain,
  Zap,
  Gauge,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Comprehensive Project Type
interface Project {
  // Basic Information
  id: string;
  code: string;
  name: string;
  type: 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'mixed-use' | 'renovation';
  subType: string;
  category: string;
  
  // Location & Site Details
  location: {
    plotNumber: string;
    street: string;
    area: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    latitude: number;
    longitude: number;
    landmark: string;
  };
  
  // Plot & Construction Details
  plotDetails: {
    totalArea: number;
    totalAreaUnit: 'sqft' | 'sqm' | 'acres' | 'hectares';
    plotLength: number;
    plotWidth: number;
    plotShape: string;
    facing: string;
    cornerPlot: boolean;
    roadWidth: number;
    setbacks: {
      front: number;
      rear: number;
      left: number;
      right: number;
    };
  };
  
  // Construction Details
  construction: {
    builtUpArea: number;
    carpetArea: number;
    superBuiltUpArea: number;
    floors: number;
    basements: number;
    units: number;
    parkingSpaces: number;
    constructionType: string;
    structureType: string;
    foundationType: string;
    roofType: string;
    wallType: string;
    flooringType: string;
  };
  
  // Client Information
  client: {
    id: string;
    name: string;
    company: string;
    type: 'individual' | 'corporate' | 'government' | 'ngo';
    contact: string;
    email: string;
    phone: string;
    alternatePhone: string;
    address: string;
    gst: string;
    pan: string;
    avatar: string;
    rating: number;
    previousProjects: number;
  };
  
  // Project Team
  team: {
    projectManager: {
      id: string;
      name: string;
      avatar: string;
      contact: string;
      experience: string;
    };
    architect: {
      id: string;
      name: string;
      firm: string;
      license: string;
      contact: string;
    };
    structuralEngineer: {
      id: string;
      name: string;
      license: string;
      contact: string;
    };
    siteSupervisor: {
      id: string;
      name: string;
      contact: string;
    };
    contractors: Array<{
      id: string;
      name: string;
      type: string;
      contact: string;
    }>;
    totalMembers: number;
  };
  
  // Financial Details
  financial: {
    estimatedBudget: number;
    approvedBudget: number;
    currentSpent: number;
    pendingPayments: number;
    receivedPayments: number;
    profitMargin: number;
    currency: string;
    paymentTerms: string;
    bankGuarantee: boolean;
    performanceBond: boolean;
    retentionAmount: number;
    mobilizationAdvance: number;
    budgetBreakdown: {
      materials: number;
      labor: number;
      equipment: number;
      subcontractors: number;
      overheads: number;
      contingency: number;
    };
  };
  
  // Timeline & Schedule
  timeline: {
    startDate: string;
    endDate: string;
    actualStartDate: string;
    expectedEndDate: string;
    duration: number;
    daysElapsed: number;
    daysRemaining: number;
    isDelayed: boolean;
    delayReason: string;
    delayDays: number;
    criticalPath: string[];
    milestones: Array<{
      name: string;
      date: string;
      status: string;
      payment: number;
    }>;
  };
  
  // Status & Progress
  status: {
    overall: 'planning' | 'approval' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled' | 'delayed';
    phase: string;
    progress: number;
    healthScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    qualityScore: number;
    safetyScore: number;
    complianceScore: number;
  };
  
  // Tasks & Activities
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
    overdue: number;
    todaysTasks: number;
    weeklyTasks: number;
  };
  
  // Documents & Approvals
  documents: {
    total: number;
    drawings: number;
    permits: number;
    contracts: number;
    reports: number;
    approvalsPending: number;
    approvalsReceived: number;
  };
  
  // Resources
  resources: {
    manpower: {
      allocated: number;
      present: number;
      skilled: number;
      unskilled: number;
    };
    equipment: {
      total: number;
      active: number;
      maintenance: number;
    };
    materials: {
      ordered: number;
      delivered: number;
      consumed: number;
      wastage: number;
    };
  };
  
  // Compliance & Certifications
  compliance: {
    environmentalClearance: boolean;
    buildingPermit: boolean;
    fireNOC: boolean;
    electricalNOC: boolean;
    waterConnection: boolean;
    sewerageConnection: boolean;
    occupancyCertificate: boolean;
    completionCertificate: boolean;
  };
  
  // Metrics & Analytics
  metrics: {
    roi: number;
    efficiency: number;
    productivity: number;
    costVariance: number;
    scheduleVariance: number;
    earnedValue: number;
    plannedValue: number;
    actualCost: number;
    cpi: number; // Cost Performance Index
    spi: number; // Schedule Performance Index
  };
  
  // Additional Info
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  isFavorite: boolean;
  isArchived: boolean;
}

export default function ProjectEnterprise() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'card' | 'list'>('table');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock comprehensive project data
  const projects: Project[] = [
    {
      id: 'PRJ001',
      code: 'SKY-2024-001',
      name: 'Skyline Towers - Luxury Residential Complex',
      type: 'residential',
      subType: 'High-Rise Apartments',
      category: 'Premium',
      location: {
        plotNumber: 'Plot 42A',
        street: 'MG Road',
        area: 'Sector 42',
        city: 'Gurgaon',
        state: 'Haryana',
        country: 'India',
        pincode: '122001',
        latitude: 28.4595,
        longitude: 77.0266,
        landmark: 'Near Metro Station'
      },
      plotDetails: {
        totalArea: 50000,
        totalAreaUnit: 'sqft',
        plotLength: 250,
        plotWidth: 200,
        plotShape: 'Rectangular',
        facing: 'North-East',
        cornerPlot: true,
        roadWidth: 60,
        setbacks: {
          front: 20,
          rear: 15,
          left: 10,
          right: 10
        }
      },
      construction: {
        builtUpArea: 125000,
        carpetArea: 95000,
        superBuiltUpArea: 140000,
        floors: 24,
        basements: 3,
        units: 120,
        parkingSpaces: 240,
        constructionType: 'RCC Frame',
        structureType: 'Moment Resisting Frame',
        foundationType: 'Pile Foundation',
        roofType: 'Flat Roof with Waterproofing',
        wallType: 'AAC Blocks',
        flooringType: 'Vitrified Tiles'
      },
      client: {
        id: 'CLT001',
        name: 'Rajesh Kumar',
        company: 'Kumar Developers Pvt Ltd',
        type: 'corporate',
        contact: 'CEO',
        email: 'rajesh@kumardevelopers.com',
        phone: '+91 98765 43210',
        alternatePhone: '+91 98765 43211',
        address: 'Tower A, Business Park, Gurgaon',
        gst: 'GST123456789',
        pan: 'ABCDE1234F',
        avatar: '/avatars/client1.jpg',
        rating: 4.8,
        previousProjects: 12
      },
      team: {
        projectManager: {
          id: 'PM001',
          name: 'Amit Sharma',
          avatar: '/avatars/pm1.jpg',
          contact: '+91 98765 12345',
          experience: '15 years'
        },
        architect: {
          id: 'ARC001',
          name: 'Ar. Priya Patel',
          firm: 'Design Studios',
          license: 'COA/2020/12345',
          contact: '+91 98765 23456'
        },
        structuralEngineer: {
          id: 'SE001',
          name: 'Er. Vikram Singh',
          license: 'IEI/2019/54321',
          contact: '+91 98765 34567'
        },
        siteSupervisor: {
          id: 'SS001',
          name: 'Rakesh Verma',
          contact: '+91 98765 45678'
        },
        contractors: [
          { id: 'CON001', name: 'ABC Constructions', type: 'Civil', contact: '+91 98765 56789' },
          { id: 'CON002', name: 'XYZ Electricals', type: 'Electrical', contact: '+91 98765 67890' },
          { id: 'CON003', name: 'PQR Plumbing', type: 'Plumbing', contact: '+91 98765 78901' }
        ],
        totalMembers: 45
      },
      financial: {
        estimatedBudget: 850000000,
        approvedBudget: 825000000,
        currentSpent: 578000000,
        pendingPayments: 45000000,
        receivedPayments: 533000000,
        profitMargin: 18.5,
        currency: 'INR',
        paymentTerms: '30% Advance, 40% During Construction, 30% on Completion',
        bankGuarantee: true,
        performanceBond: true,
        retentionAmount: 41250000,
        mobilizationAdvance: 82500000,
        budgetBreakdown: {
          materials: 371250000,
          labor: 206250000,
          equipment: 82500000,
          subcontractors: 123750000,
          overheads: 33000000,
          contingency: 8250000
        }
      },
      timeline: {
        startDate: '2024-01-15',
        endDate: '2025-12-31',
        actualStartDate: '2024-01-20',
        expectedEndDate: '2026-01-15',
        duration: 720,
        daysElapsed: 180,
        daysRemaining: 540,
        isDelayed: true,
        delayReason: 'Material shortage due to supply chain issues',
        delayDays: 15,
        criticalPath: ['Foundation', 'Structure', 'MEP', 'Finishing'],
        milestones: [
          { name: 'Foundation Complete', date: '2024-04-15', status: 'completed', payment: 82500000 },
          { name: 'Structure 50%', date: '2024-08-15', status: 'in-progress', payment: 165000000 },
          { name: 'MEP Installation', date: '2025-02-15', status: 'pending', payment: 123750000 },
          { name: 'Project Completion', date: '2025-12-31', status: 'pending', payment: 247500000 }
        ]
      },
      status: {
        overall: 'in-progress',
        phase: 'Structural Work',
        progress: 68,
        healthScore: 82,
        riskLevel: 'medium',
        priority: 'high',
        qualityScore: 88,
        safetyScore: 92,
        complianceScore: 95
      },
      tasks: {
        total: 156,
        completed: 98,
        inProgress: 35,
        pending: 17,
        overdue: 6,
        todaysTasks: 8,
        weeklyTasks: 42
      },
      documents: {
        total: 245,
        drawings: 85,
        permits: 12,
        contracts: 15,
        reports: 133,
        approvalsPending: 3,
        approvalsReceived: 9
      },
      resources: {
        manpower: {
          allocated: 120,
          present: 108,
          skilled: 45,
          unskilled: 63
        },
        equipment: {
          total: 25,
          active: 22,
          maintenance: 3
        },
        materials: {
          ordered: 85,
          delivered: 72,
          consumed: 68,
          wastage: 2.5
        }
      },
      compliance: {
        environmentalClearance: true,
        buildingPermit: true,
        fireNOC: true,
        electricalNOC: false,
        waterConnection: true,
        sewerageConnection: true,
        occupancyCertificate: false,
        completionCertificate: false
      },
      metrics: {
        roi: 22.5,
        efficiency: 87,
        productivity: 91,
        costVariance: -2.3,
        scheduleVariance: -5.2,
        earnedValue: 561000000,
        plannedValue: 578000000,
        actualCost: 578000000,
        cpi: 0.97,
        spi: 0.95
      },
      notes: 'Premium residential project with modern amenities including swimming pool, gym, clubhouse, and landscaped gardens.',
      tags: ['luxury', 'high-rise', 'gurgaon', 'residential', 'premium'],
      createdAt: '2023-11-15',
      updatedAt: '2024-03-10',
      lastActivity: '2 hours ago',
      isFavorite: true,
      isArchived: false
    },
    // Add more mock projects as needed...
  ];

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || project.status.overall === filterStatus;
      const matchesType = filterType === 'all' || project.type === filterType;
      const matchesPriority = filterPriority === 'all' || project.status.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [projects, searchQuery, filterStatus, filterType, filterPriority]);

  // Sorting logic
  const sortedProjects = useMemo(() => {
    const sorted = [...filteredProjects];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'progress':
        return sorted.sort((a, b) => b.status.progress - a.status.progress);
      case 'budget':
        return sorted.sort((a, b) => b.financial.approvedBudget - a.financial.approvedBudget);
      case 'deadline':
        return sorted.sort((a, b) => new Date(a.timeline.endDate).getTime() - new Date(b.timeline.endDate).getTime());
      default:
        return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }
  }, [filteredProjects, sortBy]);

  const getStatusColor = (status: string) => {
    const colors = {
      'planning': 'bg-blue-100 text-blue-700',
      'approval': 'bg-purple-100 text-purple-700',
      'in-progress': 'bg-green-100 text-green-700',
      'on-hold': 'bg-yellow-100 text-yellow-700',
      'completed': 'bg-gray-100 text-gray-700',
      'cancelled': 'bg-red-100 text-red-700',
      'delayed': 'bg-orange-100 text-orange-700'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Zap className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Info className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      'critical': 'text-red-600 bg-red-50',
      'high': 'text-orange-600 bg-orange-50',
      'medium': 'text-yellow-600 bg-yellow-50',
      'low': 'text-green-600 bg-green-50'
    };
    return colors[risk as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const selectAllProjects = () => {
    if (selectedProjects.length === sortedProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(sortedProjects.map(p => p.id));
    }
  };

  // Table View Component
  const TableView = () => (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedProjects.length === sortedProjects.length}
                  onCheckedChange={selectAllProjects}
                />
              </TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
              <TooltipProvider key={project.id}>
                <TableRow className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProjects([...selectedProjects, project.id]);
                        } else {
                          setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Building2 className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.code}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {project.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {project.construction.floors} floors
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {project.plotDetails.totalArea.toLocaleString()} {project.plotDetails.totalAreaUnit}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md p-4">
                        <div className="space-y-2">
                          <div className="font-semibold">{project.name}</div>
                          <div className="text-sm space-y-1">
                            <div>Type: {project.type} - {project.subType}</div>
                            <div>Built-up Area: {project.construction.builtUpArea.toLocaleString()} sqft</div>
                            <div>Units: {project.construction.units}</div>
                            <div>Parking: {project.construction.parkingSpaces} spaces</div>
                            <div>Structure: {project.construction.constructionType}</div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={project.client.avatar} />
                            <AvatarFallback>{project.client.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{project.client.name}</div>
                            <div className="text-xs text-gray-500">{project.client.company}</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1 text-sm">
                          <div>Type: {project.client.type}</div>
                          <div>Rating: ⭐ {project.client.rating}</div>
                          <div>Previous Projects: {project.client.previousProjects}</div>
                          <div>Contact: {project.client.phone}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <div>
                            <div className="text-sm">{project.location.city}</div>
                            <div className="text-xs text-gray-500">{project.location.area}</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1 text-sm">
                          <div>{project.location.plotNumber}, {project.location.street}</div>
                          <div>{project.location.area}, {project.location.city}</div>
                          <div>{project.location.state} - {project.location.pincode}</div>
                          <div>Landmark: {project.location.landmark}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge className={getStatusColor(project.status.overall)}>
                        {project.status.overall}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(project.status.priority)}
                        <span className="text-xs">{project.status.priority}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Progress value={project.status.progress} className="w-[80px] h-2" />
                            <span className="text-sm font-medium">{project.status.progress}%</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Phase: {project.status.phase}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1 text-sm">
                          <div>Health Score: {project.status.healthScore}/100</div>
                          <div>Quality: {project.status.qualityScore}/100</div>
                          <div>Safety: {project.status.safetyScore}/100</div>
                          <div>Compliance: {project.status.complianceScore}/100</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <div className="text-sm font-medium">
                            {formatCurrency(project.financial.currentSpent)}
                          </div>
                          <div className="text-xs text-gray-500">
                            of {formatCurrency(project.financial.approvedBudget)}
                          </div>
                          <Progress 
                            value={(project.financial.currentSpent / project.financial.approvedBudget) * 100} 
                            className="w-[80px] h-1 mt-1" 
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <div className="space-y-2 text-sm">
                          <div>Estimated: {formatCurrency(project.financial.estimatedBudget)}</div>
                          <div>Approved: {formatCurrency(project.financial.approvedBudget)}</div>
                          <div>Spent: {formatCurrency(project.financial.currentSpent)}</div>
                          <div>Pending: {formatCurrency(project.financial.pendingPayments)}</div>
                          <div>Profit Margin: {project.financial.profitMargin}%</div>
                          <Separator className="my-2" />
                          <div className="font-semibold">Budget Breakdown:</div>
                          <div>Materials: {formatCurrency(project.financial.budgetBreakdown.materials)}</div>
                          <div>Labor: {formatCurrency(project.financial.budgetBreakdown.labor)}</div>
                          <div>Equipment: {formatCurrency(project.financial.budgetBreakdown.equipment)}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <div className="text-sm">
                            {new Date(project.timeline.endDate).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.timeline.daysRemaining} days left
                          </div>
                          {project.timeline.isDelayed && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              Delayed by {project.timeline.delayDays} days
                            </Badge>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1 text-sm">
                          <div>Start: {new Date(project.timeline.startDate).toLocaleDateString()}</div>
                          <div>End: {new Date(project.timeline.endDate).toLocaleDateString()}</div>
                          <div>Duration: {project.timeline.duration} days</div>
                          <div>Elapsed: {project.timeline.daysElapsed} days</div>
                          {project.timeline.isDelayed && (
                            <div className="text-red-600">Reason: {project.timeline.delayReason}</div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{project.team.totalMembers}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1 text-sm">
                          <div>PM: {project.team.projectManager.name}</div>
                          <div>Architect: {project.team.architect.name}</div>
                          <div>Site Supervisor: {project.team.siteSupervisor.name}</div>
                          <div>Contractors: {project.team.contractors.length}</div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", getRiskColor(project.status.riskLevel))}>
                      {project.status.riskLevel}
                    </Badge>
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
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/edit`)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/tasks`)}>
                          <ClipboardList className="h-4 w-4 mr-2" />
                          Manage Tasks
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/budget`)}>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Financial Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/team`)}>
                          <Users className="h-4 w-4 mr-2" />
                          Team Management
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/documents`)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Documents
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TooltipProvider>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Card View Component
  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedProjects.map((project) => (
        <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-base line-clamp-1">{project.name}</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">{project.code}</p>
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
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status and Priority */}
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(project.status.overall)}>
                {project.status.overall}
              </Badge>
              <div className="flex items-center gap-1">
                {getPriorityIcon(project.status.priority)}
                <Badge className={cn("text-xs", getRiskColor(project.status.riskLevel))}>
                  {project.status.riskLevel} risk
                </Badge>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">{project.status.progress}%</span>
              </div>
              <Progress value={project.status.progress} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">{project.status.phase}</p>
            </div>

            {/* Client */}
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={project.client.avatar} />
                <AvatarFallback>{project.client.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{project.client.name}</p>
                <p className="text-xs text-gray-500">{project.client.company}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <div className="flex-1">
                <p className="text-sm">{project.location.city}</p>
                <p className="text-xs text-gray-500">{project.location.area}</p>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Budget</span>
                <span className="text-sm font-medium">
                  {((project.financial.currentSpent / project.financial.approvedBudget) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(project.financial.currentSpent / project.financial.approvedBudget) * 100} 
                className="h-2" 
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatCurrency(project.financial.currentSpent)}</span>
                <span>{formatCurrency(project.financial.approvedBudget)}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {new Date(project.timeline.endDate).toLocaleDateString()}
                </span>
              </div>
              {project.timeline.isDelayed ? (
                <Badge variant="destructive" className="text-xs">
                  Delayed {project.timeline.delayDays}d
                </Badge>
              ) : (
                <span className="text-xs text-gray-500">
                  {project.timeline.daysRemaining}d left
                </span>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div className="text-center">
                <p className="text-xs text-gray-500">Tasks</p>
                <p className="text-sm font-medium">{project.tasks.completed}/{project.tasks.total}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Team</p>
                <p className="text-sm font-medium">{project.team.totalMembers}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Docs</p>
                <p className="text-sm font-medium">{project.documents.total}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 pt-2">
              {project.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="space-y-4">
      {sortedProjects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              {/* Project Icon */}
              <div className="p-3 bg-gray-100 rounded-lg">
                <Building2 className="h-8 w-8 text-gray-600" />
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.code} • {project.type} - {project.subType}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(project.status.overall)}>
                      {project.status.overall}
                    </Badge>
                    {getPriorityIcon(project.status.priority)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Client</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={project.client.avatar} />
                        <AvatarFallback>{project.client.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{project.client.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{project.location.city}</p>
                    <p className="text-xs text-gray-500">{project.location.area}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Progress</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={project.status.progress} className="w-16 h-2" />
                      <span className="text-sm font-medium">{project.status.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium">{formatCurrency(project.financial.approvedBudget)}</p>
                    <p className="text-xs text-gray-500">Spent: {((project.financial.currentSpent / project.financial.approvedBudget) * 100).toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Timeline</p>
                    <p className="text-sm font-medium">{new Date(project.timeline.endDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{project.timeline.daysRemaining} days left</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Risk Level</p>
                    <Badge className={cn("text-xs mt-1", getRiskColor(project.status.riskLevel))}>
                      {project.status.riskLevel}
                    </Badge>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    <span>{project.plotDetails.totalArea.toLocaleString()} {project.plotDetails.totalAreaUnit}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{project.construction.floors} floors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    <span>{project.construction.units} units</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team.totalMembers} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClipboardList className="h-4 w-4" />
                    <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{project.documents.total} docs</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-500 mt-1">Manage and monitor all construction projects</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/projects/import')}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" onClick={() => navigate('/projects/export')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => navigate('/projects/new')}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status.overall === 'in-progress').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Delayed</p>
                <p className="text-2xl font-bold text-red-600">
                  {projects.filter(p => p.timeline.isDelayed).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-xl font-bold">
                  {formatCurrency(projects.reduce((sum, p) => sum + p.financial.approvedBudget, 0))}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(projects.reduce((sum, p) => sum + p.status.progress, 0) / projects.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Area</p>
                <p className="text-xl font-bold">
                  {projects.reduce((sum, p) => sum + p.plotDetails.totalArea, 0).toLocaleString()} sqft
                </p>
              </div>
              <Square className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects, codes, clients, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Mode Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('card')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <Grid3x3 className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            Showing {sortedProjects.length} of {projects.length} projects
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'table' && <TableView />}
      {viewMode === 'card' && <CardView />}
      {viewMode === 'list' && <ListView />}
    </div>
  );
}
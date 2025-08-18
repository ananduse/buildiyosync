'use client';

import React, { useState } from 'react';
import {
  Building2, MapPin, Users, DollarSign, Clock, TrendingUp,
  Calendar, FileText, Package, Shield, AlertTriangle, CheckCircle,
  Home, Briefcase, Ruler, Calculator, Camera, Palette, HardHat,
  Truck, Wrench, BarChart3, PieChart, Activity, Target,
  Plus, Filter, Search, Download, Upload, Settings, Eye,
  Edit, Trash2, MoreVertical, ChevronRight, Star, Flag,
  ArrowUp, ArrowDown, Minus, Info, Copy, Share2, Printer,
  Mail, Phone, MessageSquare, Video, Bell, Bookmark, Hash,
  Layers, Grid3x3, List, LayoutGrid, Table, Kanban, Map,
  Gauge, Zap, Award, TrendingDown, DollarSign as Dollar,
  IndianRupee, Euro, PoundSterling, Database, FolderOpen,
  GitBranch, Cpu, Smartphone, Monitor, Tablet, Square
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Industry-specific project types
const PROJECT_TYPES = {
  architecture: {
    label: 'Architecture',
    icon: Building2,
    color: 'blue',
    subtypes: [
      'Residential Complex', 'Commercial Building', 'Industrial Facility',
      'Institutional', 'Mixed-Use Development', 'Renovation/Restoration',
      'Urban Planning', 'Landscape Architecture'
    ]
  },
  interior: {
    label: 'Interior Design',
    icon: Palette,
    color: 'purple',
    subtypes: [
      'Residential Interior', 'Office Interior', 'Retail Space',
      'Hospitality', 'Healthcare', 'Educational', 'Exhibition Design',
      'Furniture Design'
    ]
  },
  construction: {
    label: 'Construction',
    icon: HardHat,
    color: 'orange',
    subtypes: [
      'New Construction', 'Renovation', 'Infrastructure', 'Roads & Highways',
      'Bridges', 'Utilities', 'Demolition', 'Site Development'
    ]
  },
  realEstate: {
    label: 'Real Estate',
    icon: Home,
    color: 'green',
    subtypes: [
      'Land Development', 'Property Management', 'Sales Project',
      'Rental Project', 'Township', 'Gated Community', 'Commercial Complex',
      'SEZ Development'
    ]
  }
};

// Comprehensive project interface for all industries
interface Project {
  // Basic Information
  id: string;
  projectCode: string;
  projectName: string;
  projectType: keyof typeof PROJECT_TYPES;
  projectSubtype: string;
  description: string;
  status: 'planning' | 'design' | 'approval' | 'construction' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // Location & Site Details
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
    googleMapsLink?: string;
    landmark?: string;
  };
  
  siteDetails: {
    totalArea: number;
    totalAreaUnit: 'sqft' | 'sqm' | 'acres' | 'hectares';
    plotArea: number;
    builtUpArea: number;
    carpetArea: number;
    superBuiltUpArea: number;
    commonArea: number;
    
    // For construction/architecture
    numberOfFloors?: number;
    numberOfBasements?: number;
    numberOfTowers?: number;
    numberOfUnits?: number;
    parkingSpaces?: number;
    
    // Setbacks
    setbacks: {
      front: number;
      rear: number;
      left: number;
      right: number;
    };
    
    // Site conditions
    soilType?: string;
    topography?: string;
    accessibility?: string;
    utilities?: string[];
  };
  
  // Design Specifications (Architecture & Interior)
  designSpecs: {
    architecturalStyle?: string;
    designTheme?: string;
    sustainabilityRating?: 'LEED' | 'GRIHA' | 'IGBC' | 'EDGE' | 'None';
    sustainabilityLevel?: 'Platinum' | 'Gold' | 'Silver' | 'Certified';
    
    // Materials
    structureType?: string;
    foundationType?: string;
    wallMaterial?: string;
    roofingMaterial?: string;
    flooringTypes?: string[];
    facadeMaterial?: string;
    
    // Interior specific
    colorPalette?: string[];
    furnitureStyle?: string;
    lightingPlan?: string;
    acousticRequirements?: string;
    
    // MEP (Mechanical, Electrical, Plumbing)
    hvacSystem?: string;
    electricalLoad?: string;
    waterRequirement?: string;
    fireProtectionSystem?: string;
    elevators?: number;
    escalators?: number;
  };
  
  // Financial Details
  financial: {
    estimatedCost: number;
    approvedBudget: number;
    currentSpent: number;
    currency: 'INR' | 'USD' | 'EUR' | 'GBP';
    
    costBreakdown: {
      land: number;
      construction: number;
      materials: number;
      labor: number;
      equipment: number;
      permits: number;
      consultancy: number;
      contingency: number;
      other: number;
    };
    
    paymentSchedule: {
      milestone: string;
      amount: number;
      dueDate: string;
      status: 'pending' | 'paid' | 'overdue';
    }[];
    
    fundingSources: {
      source: string;
      amount: number;
      type: 'loan' | 'investment' | 'self-funded' | 'grant';
    }[];
    
    roi?: number;
    paybackPeriod?: number;
    irr?: number;
  };
  
  // Timeline & Milestones
  timeline: {
    projectStartDate: string;
    expectedCompletionDate: string;
    actualCompletionDate?: string;
    
    phases: {
      name: string;
      startDate: string;
      endDate: string;
      status: 'upcoming' | 'in-progress' | 'completed' | 'delayed';
      completion: number;
      dependencies?: string[];
    }[];
    
    milestones: {
      name: string;
      date: string;
      status: 'pending' | 'achieved' | 'missed';
      critical: boolean;
    }[];
    
    delays?: {
      reason: string;
      impact: string;
      duration: number;
      resolution?: string;
    }[];
  };
  
  // Team & Stakeholders
  team: {
    projectManager: {
      name: string;
      email: string;
      phone: string;
      company?: string;
    };
    
    architect?: {
      name: string;
      firm: string;
      registrationNumber: string;
      email: string;
      phone: string;
    };
    
    interiorDesigner?: {
      name: string;
      firm: string;
      email: string;
      phone: string;
    };
    
    structuralEngineer?: {
      name: string;
      firm: string;
      licenseNumber: string;
      email: string;
      phone: string;
    };
    
    contractor?: {
      name: string;
      company: string;
      licenseNumber: string;
      email: string;
      phone: string;
    };
    
    consultants?: {
      role: string;
      name: string;
      company: string;
      email: string;
      phone: string;
    }[];
    
    client: {
      name: string;
      company?: string;
      email: string;
      phone: string;
      requirements?: string;
    };
    
    vendors?: {
      category: string;
      name: string;
      company: string;
      email: string;
      phone: string;
      contractValue?: number;
    }[];
  };
  
  // Regulatory & Compliance
  regulatory: {
    buildingPermitNumber?: string;
    buildingPermitDate?: string;
    buildingPermitStatus?: 'applied' | 'approved' | 'rejected' | 'expired';
    
    environmentalClearance?: {
      required: boolean;
      status?: 'applied' | 'approved' | 'rejected';
      number?: string;
      validUntil?: string;
    };
    
    fireNOC?: {
      status: 'applied' | 'approved' | 'rejected' | 'not-required';
      number?: string;
      validUntil?: string;
    };
    
    occupancyCertificate?: {
      status: 'pending' | 'approved' | 'rejected';
      number?: string;
      date?: string;
    };
    
    otherPermits?: {
      type: string;
      number: string;
      status: string;
      validUntil?: string;
    }[];
    
    inspections?: {
      type: string;
      date: string;
      inspector: string;
      status: 'scheduled' | 'passed' | 'failed' | 'pending';
      remarks?: string;
    }[];
  };
  
  // Documents & Media
  documents: {
    category: 'drawings' | 'permits' | 'contracts' | 'reports' | 'photos' | 'videos' | 'other';
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    uploadedBy: string;
    version?: string;
    url: string;
  }[];
  
  // Quality & Safety
  qualitySafety: {
    qualityChecks: {
      item: string;
      standard: string;
      lastChecked: string;
      status: 'pass' | 'fail' | 'pending';
      remarks?: string;
    }[];
    
    safetyIncidents?: {
      date: string;
      type: string;
      severity: 'minor' | 'major' | 'critical';
      description: string;
      actionTaken?: string;
    }[];
    
    certifications?: {
      type: string;
      issuedBy: string;
      date: string;
      validUntil?: string;
    }[];
  };
  
  // Analytics & Metrics
  metrics: {
    progressPercentage: number;
    budgetUtilization: number;
    scheduleVariance: number;
    costVariance: number;
    qualityScore: number;
    safetyScore: number;
    clientSatisfaction?: number;
    productivityIndex?: number;
    riskScore: 'low' | 'medium' | 'high';
  };
  
  // For Real Estate specific
  realEstateDetails?: {
    propertyType: 'residential' | 'commercial' | 'industrial' | 'mixed';
    numberOfUnits: number;
    unitTypes: {
      type: string;
      size: number;
      count: number;
      pricePerUnit: number;
      sold: number;
      available: number;
    }[];
    
    amenities: string[];
    nearbyFacilities: string[];
    
    pricing: {
      basePrice: number;
      pricePerSqft: number;
      maintenanceCharges?: number;
      parkingCharges?: number;
      otherCharges?: number;
    };
    
    marketing: {
      listingDate?: string;
      marketingChannels?: string[];
      leadCount?: number;
      conversionRate?: number;
    };
  };
  
  // Notes & Communication
  notes?: string;
  lastUpdated: string;
  createdDate: string;
  createdBy: string;
}

// Sample data generator
const generateSampleProjects = (): Project[] => {
  return [
    {
      id: 'PRJ001',
      projectCode: 'ARC-2024-001',
      projectName: 'Skyline Tower Complex',
      projectType: 'architecture',
      projectSubtype: 'Mixed-Use Development',
      description: 'A 45-story mixed-use development with retail, office, and residential spaces',
      status: 'construction',
      priority: 'high',
      
      location: {
        address: 'Plot No. 45, Sector 62',
        city: 'Noida',
        state: 'Uttar Pradesh',
        country: 'India',
        pincode: '201309',
        latitude: 28.6139,
        longitude: 77.2090,
        landmark: 'Near Metro Station'
      },
      
      siteDetails: {
        totalArea: 50000,
        totalAreaUnit: 'sqm',
        plotArea: 45000,
        builtUpArea: 180000,
        carpetArea: 144000,
        superBuiltUpArea: 198000,
        commonArea: 18000,
        numberOfFloors: 45,
        numberOfBasements: 3,
        numberOfTowers: 2,
        numberOfUnits: 450,
        parkingSpaces: 900,
        setbacks: {
          front: 15,
          rear: 12,
          left: 10,
          right: 10
        },
        soilType: 'Sandy Loam',
        topography: 'Flat',
        accessibility: 'Metro, Highway',
        utilities: ['Electricity', 'Water', 'Sewage', 'Gas', 'Fiber Optic']
      },
      
      designSpecs: {
        architecturalStyle: 'Contemporary Modern',
        designTheme: 'Sustainable Urban Living',
        sustainabilityRating: 'LEED',
        sustainabilityLevel: 'Gold',
        structureType: 'RCC Frame',
        foundationType: 'Pile Foundation',
        wallMaterial: 'AAC Blocks',
        roofingMaterial: 'Green Roof System',
        flooringTypes: ['Italian Marble', 'Engineered Wood', 'Vitrified Tiles'],
        facadeMaterial: 'Glass Curtain Wall with Aluminum Composite',
        hvacSystem: 'VRF System',
        electricalLoad: '5000 KVA',
        waterRequirement: '500 KLD',
        fireProtectionSystem: 'Sprinkler + Hydrant',
        elevators: 8,
        escalators: 4
      },
      
      financial: {
        estimatedCost: 4500000000,
        approvedBudget: 5000000000,
        currentSpent: 2250000000,
        currency: 'INR',
        costBreakdown: {
          land: 1000000000,
          construction: 2500000000,
          materials: 800000000,
          labor: 500000000,
          equipment: 200000000,
          permits: 50000000,
          consultancy: 150000000,
          contingency: 250000000,
          other: 50000000
        },
        paymentSchedule: [
          { milestone: 'Foundation Complete', amount: 500000000, dueDate: '2024-03-15', status: 'paid' },
          { milestone: '10th Floor Complete', amount: 750000000, dueDate: '2024-06-15', status: 'paid' },
          { milestone: '25th Floor Complete', amount: 1000000000, dueDate: '2024-09-15', status: 'pending' },
          { milestone: 'Structure Complete', amount: 1250000000, dueDate: '2024-12-15', status: 'pending' },
          { milestone: 'Project Handover', amount: 1500000000, dueDate: '2025-06-15', status: 'pending' }
        ],
        fundingSources: [
          { source: 'Bank Loan - HDFC', amount: 3000000000, type: 'loan' },
          { source: 'Private Investors', amount: 1500000000, type: 'investment' },
          { source: 'Company Funds', amount: 500000000, type: 'self-funded' }
        ],
        roi: 24.5,
        paybackPeriod: 7,
        irr: 18.2
      },
      
      timeline: {
        projectStartDate: '2023-06-01',
        expectedCompletionDate: '2025-06-30',
        phases: [
          { name: 'Design & Planning', startDate: '2023-06-01', endDate: '2023-09-30', status: 'completed', completion: 100 },
          { name: 'Approvals & Permits', startDate: '2023-08-01', endDate: '2023-12-31', status: 'completed', completion: 100 },
          { name: 'Foundation', startDate: '2024-01-01', endDate: '2024-03-31', status: 'completed', completion: 100 },
          { name: 'Structure', startDate: '2024-04-01', endDate: '2024-12-31', status: 'in-progress', completion: 45 },
          { name: 'MEP & Finishing', startDate: '2024-10-01', endDate: '2025-04-30', status: 'upcoming', completion: 0 },
          { name: 'Landscaping & Handover', startDate: '2025-03-01', endDate: '2025-06-30', status: 'upcoming', completion: 0 }
        ],
        milestones: [
          { name: 'Project Kickoff', date: '2023-06-01', status: 'achieved', critical: true },
          { name: 'Design Approval', date: '2023-09-15', status: 'achieved', critical: true },
          { name: 'Building Permit', date: '2023-12-15', status: 'achieved', critical: true },
          { name: 'Foundation Complete', date: '2024-03-31', status: 'achieved', critical: true },
          { name: '50% Structure', date: '2024-08-31', status: 'pending', critical: true },
          { name: 'Top-Out', date: '2024-12-31', status: 'pending', critical: true },
          { name: 'Occupancy Certificate', date: '2025-05-31', status: 'pending', critical: true }
        ]
      },
      
      team: {
        projectManager: {
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@skyline.com',
          phone: '+91 98765 43210',
          company: 'Skyline Developers'
        },
        architect: {
          name: 'Ar. Priya Sharma',
          firm: 'Design Studios International',
          registrationNumber: 'CA/2010/45678',
          email: 'priya@designstudios.com',
          phone: '+91 98765 12345'
        },
        structuralEngineer: {
          name: 'Er. Amit Singh',
          firm: 'Structural Solutions Pvt Ltd',
          licenseNumber: 'SE/2008/12345',
          email: 'amit@structural.com',
          phone: '+91 98765 67890'
        },
        contractor: {
          name: 'Vikram Builders',
          company: 'Vikram Construction Co.',
          licenseNumber: 'CON/2005/98765',
          email: 'info@vikrambuilders.com',
          phone: '+91 98765 11111'
        },
        client: {
          name: 'Skyline Realty Pvt Ltd',
          company: 'Skyline Group',
          email: 'projects@skylinegroup.com',
          phone: '+91 11 4567 8900',
          requirements: 'Premium mixed-use development with focus on sustainability'
        }
      },
      
      regulatory: {
        buildingPermitNumber: 'BP/2023/NOI/4567',
        buildingPermitDate: '2023-12-15',
        buildingPermitStatus: 'approved',
        environmentalClearance: {
          required: true,
          status: 'approved',
          number: 'EC/2023/UP/789',
          validUntil: '2028-12-31'
        },
        fireNOC: {
          status: 'approved',
          number: 'FIRE/2024/NOI/123',
          validUntil: '2025-12-31'
        },
        occupancyCertificate: {
          status: 'pending',
          number: '',
          date: ''
        }
      },
      
      documents: [
        {
          category: 'drawings',
          name: 'Master Plan Layout',
          type: 'PDF',
          size: '45.2 MB',
          uploadDate: '2023-09-01',
          uploadedBy: 'Ar. Priya Sharma',
          version: 'v3.2',
          url: '/documents/masterplan.pdf'
        },
        {
          category: 'permits',
          name: 'Building Permit',
          type: 'PDF',
          size: '2.3 MB',
          uploadDate: '2023-12-16',
          uploadedBy: 'Rajesh Kumar',
          version: 'v1.0',
          url: '/documents/permit.pdf'
        }
      ],
      
      qualitySafety: {
        qualityChecks: [
          { item: 'Concrete Strength', standard: 'IS 456:2000', lastChecked: '2024-08-15', status: 'pass', remarks: 'M30 grade achieved' },
          { item: 'Steel Quality', standard: 'IS 1786:2008', lastChecked: '2024-08-10', status: 'pass', remarks: 'Fe500D grade confirmed' },
          { item: 'Electrical Wiring', standard: 'IS 732:2019', lastChecked: '2024-08-01', status: 'pending', remarks: 'Scheduled for next week' }
        ],
        safetyIncidents: [
          { date: '2024-07-15', type: 'Minor Fall', severity: 'minor', description: 'Worker slipped on wet surface', actionTaken: 'Safety training conducted' }
        ],
        certifications: [
          { type: 'ISO 9001:2015', issuedBy: 'BSI', date: '2023-01-15', validUntil: '2026-01-14' },
          { type: 'ISO 45001:2018', issuedBy: 'BSI', date: '2023-01-15', validUntil: '2026-01-14' }
        ]
      },
      
      metrics: {
        progressPercentage: 45,
        budgetUtilization: 45,
        scheduleVariance: -2,
        costVariance: 3,
        qualityScore: 92,
        safetyScore: 88,
        clientSatisfaction: 85,
        productivityIndex: 1.05,
        riskScore: 'medium'
      },
      
      notes: 'Project is progressing well with minor delays due to monsoon. Client satisfied with quality.',
      lastUpdated: '2024-08-18',
      createdDate: '2023-05-15',
      createdBy: 'Admin'
    },
    // Add more sample projects here...
  ];
};

export default function EnterpriseProjectDashboard() {
  const [projects] = useState<Project[]>(generateSampleProjects());
  const [selectedView, setSelectedView] = useState<'grid' | 'list' | 'kanban' | 'table'>('grid');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Calculate statistics
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => ['planning', 'design', 'approval', 'construction'].includes(p.status)).length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.financial.approvedBudget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.financial.currentSpent, 0),
    averageProgress: Math.round(projects.reduce((sum, p) => sum + p.metrics.progressPercentage, 0) / projects.length)
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Enterprise Project Management</h1>
                <p className="text-sm text-gray-500 mt-1">Architecture • Interior Design • Construction • Real Estate</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>
                        Choose your industry and fill in the project details
                      </DialogDescription>
                    </DialogHeader>
                    <ProjectCreationForm onClose={() => setShowCreateDialog(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Projects</p>
                    <p className="text-2xl font-bold">{stats.totalProjects}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Active Projects</p>
                    <p className="text-2xl font-bold">{stats.activeProjects}</p>
                    <p className="text-xs text-gray-500 mt-1">{Math.round(stats.activeProjects / stats.totalProjects * 100)}% of total</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Budget</p>
                    <p className="text-2xl font-bold">₹{(stats.totalBudget / 10000000).toFixed(1)}Cr</p>
                    <p className="text-xs text-gray-500 mt-1">Across all projects</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <IndianRupee className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Budget Utilized</p>
                    <p className="text-2xl font-bold">{Math.round(stats.totalSpent / stats.totalBudget * 100)}%</p>
                    <p className="text-xs text-blue-600 mt-1">₹{(stats.totalSpent / 10000000).toFixed(1)}Cr spent</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Avg Progress</p>
                    <p className="text-2xl font-bold">{stats.averageProgress}%</p>
                    <Progress value={stats.averageProgress} className="h-1 mt-2" />
                  </div>
                  <div className="h-12 w-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-cyan-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-2xl font-bold">{stats.completedProjects}</p>
                    <p className="text-xs text-green-600 mt-1">This quarter</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="architecture">Architecture</SelectItem>
                  <SelectItem value="interior">Interior Design</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="realEstate">Real Estate</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>Planning</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Design</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Construction</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>Critical</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>High</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Medium</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Low</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2">
              <div className="bg-white border rounded-lg p-1 flex gap-1">
                <Button
                  variant={selectedView === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedView === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedView === 'kanban' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('kanban')}
                >
                  <Kanban className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedView === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('table')}
                >
                  <Table className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Projects Display */}
          {selectedView === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {selectedView === 'list' && (
            <div className="space-y-4">
              {projects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))}
            </div>
          )}

          {selectedView === 'kanban' && (
            <ProjectKanbanBoard projects={projects} />
          )}

          {selectedView === 'table' && (
            <ProjectTable projects={projects} />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: Project }) {
  const TypeIcon = PROJECT_TYPES[project.projectType].icon;
  const statusColors = {
    planning: 'bg-gray-100 text-gray-700',
    design: 'bg-blue-100 text-blue-700',
    approval: 'bg-yellow-100 text-yellow-700',
    construction: 'bg-orange-100 text-orange-700',
    completed: 'bg-green-100 text-green-700',
    'on-hold': 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-500'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-10 w-10 rounded-lg flex items-center justify-center",
              `bg-${PROJECT_TYPES[project.projectType].color}-100`
            )}>
              <TypeIcon className={cn(
                "h-5 w-5",
                `text-${PROJECT_TYPES[project.projectType].color}-600`
              )} />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold line-clamp-1">
                {project.projectName}
              </CardTitle>
              <p className="text-xs text-gray-500">{project.projectCode}</p>
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
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={cn("text-xs", statusColors[project.status])}>
              {project.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {project.projectSubtype}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{project.location.city}, {project.location.state}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Users className="h-3 w-3" />
              <span>{project.team.projectManager.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="h-3 w-3" />
              <span>Due {new Date(project.timeline.expectedCompletionDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{project.metrics.progressPercentage}%</span>
            </div>
            <Progress value={project.metrics.progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t">
            <div className="text-center">
              <p className="text-xs text-gray-500">Budget</p>
              <p className="text-sm font-semibold">₹{(project.financial.approvedBudget / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Spent</p>
              <p className="text-sm font-semibold">₹{(project.financial.currentSpent / 10000000).toFixed(1)}Cr</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Project List Item Component
function ProjectListItem({ project }: { project: Project }) {
  const TypeIcon = PROJECT_TYPES[project.projectType].icon;
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className={cn(
              "h-12 w-12 rounded-lg flex items-center justify-center",
              `bg-${PROJECT_TYPES[project.projectType].color}-100`
            )}>
              <TypeIcon className={cn(
                "h-6 w-6",
                `text-${PROJECT_TYPES[project.projectType].color}-600`
              )} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold">{project.projectName}</h3>
                <Badge variant="outline" className="text-xs">
                  {project.projectCode}
                </Badge>
                <Badge className="text-xs">
                  {project.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {project.location.city}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {project.siteDetails.totalArea} {project.siteDetails.totalAreaUnit}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.team.projectManager.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.timeline.expectedCompletionDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-semibold">₹{(project.financial.approvedBudget / 10000000).toFixed(1)}Cr</p>
            </div>
            
            <div className="w-32">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{project.metrics.progressPercentage}%</span>
              </div>
              <Progress value={project.metrics.progressPercentage} className="h-2" />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>Generate Report</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Project Kanban Board Component
function ProjectKanbanBoard({ projects }: { projects: Project[] }) {
  const columns = [
    { id: 'planning', title: 'Planning', color: 'gray' },
    { id: 'design', title: 'Design', color: 'blue' },
    { id: 'approval', title: 'Approval', color: 'yellow' },
    { id: 'construction', title: 'Construction', color: 'orange' },
    { id: 'completed', title: 'Completed', color: 'green' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-shrink-0 w-80">
          <div className={cn(
            "rounded-t-lg px-4 py-2 flex items-center justify-between",
            `bg-${column.color}-100`
          )}>
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {projects.filter(p => p.status === column.id).length}
            </Badge>
          </div>
          <div className="bg-gray-50 rounded-b-lg p-2 min-h-[400px] space-y-2">
            {projects
              .filter(p => p.status === column.id)
              .map((project) => (
                <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-1">{project.projectName}</h4>
                      <Badge variant="outline" className="text-xs">
                        {PROJECT_TYPES[project.projectType].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{project.projectCode}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{project.location.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(project.timeline.expectedCompletionDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={project.metrics.progressPercentage} className="h-1" />
                      <p className="text-xs text-gray-500 mt-1">{project.metrics.progressPercentage}% complete</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Project Table Component
function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <UITable>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const TypeIcon = PROJECT_TYPES[project.projectType].icon;
            return (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{project.projectName}</p>
                    <p className="text-xs text-gray-500">{project.projectCode}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <TypeIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{PROJECT_TYPES[project.projectType].label}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{project.location.city}</p>
                    <p className="text-xs text-gray-500">{project.location.state}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs">{project.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="w-24">
                    <Progress value={project.metrics.progressPercentage} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">{project.metrics.progressPercentage}%</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>₹{(project.financial.approvedBudget / 10000000).toFixed(1)}Cr</p>
                    <p className="text-xs text-gray-500">
                      Spent: {Math.round(project.financial.currentSpent / project.financial.approvedBudget * 100)}%
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{new Date(project.timeline.expectedCompletionDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">
                      {Math.ceil((new Date(project.timeline.expectedCompletionDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className="text-xs">
                        {project.team.projectManager.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className="text-xs">+3</AvatarFallback>
                    </Avatar>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Reports</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </UITable>
    </Card>
  );
}

// Project Creation Form Component
function ProjectCreationForm({ onClose }: { onClose: () => void }) {
  const [selectedIndustry, setSelectedIndustry] = useState<keyof typeof PROJECT_TYPES>('architecture');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: 'Basic Info', icon: Info },
    { id: 2, name: 'Location', icon: MapPin },
    { id: 3, name: 'Specifications', icon: Ruler },
    { id: 4, name: 'Financial', icon: DollarSign },
    { id: 5, name: 'Team', icon: Users },
    { id: 6, name: 'Timeline', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                currentStep === step.id
                  ? "bg-blue-600 text-white"
                  : currentStep > step.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500"
              )}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <StepIcon className="h-5 w-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-full h-0.5 mx-2",
                  currentStep > step.id ? "bg-green-600" : "bg-gray-200"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Project Name *</Label>
              <Input placeholder="Enter project name" />
            </div>
            <div>
              <Label>Project Code *</Label>
              <Input placeholder="Auto-generated or enter manually" />
            </div>
          </div>
          
          <div>
            <Label>Industry Type *</Label>
            <RadioGroup value={selectedIndustry} onValueChange={(value) => setSelectedIndustry(value as keyof typeof PROJECT_TYPES)}>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {Object.entries(PROJECT_TYPES).map(([key, type]) => {
                  const Icon = type.icon;
                  return (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="h-4 w-4" />
                        {type.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label>Project Subtype *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select subtype" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES[selectedIndustry].subtypes.map((subtype) => (
                  <SelectItem key={subtype} value={subtype}>
                    {subtype}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Enter project description" rows={3} />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="approval">Approval</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {currentStep === steps.length ? (
            <Button onClick={onClose}>
              Create Project
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
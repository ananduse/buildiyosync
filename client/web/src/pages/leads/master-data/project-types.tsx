import { useState, useMemo } from 'react';
import {
  FolderOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Activity,
  DollarSign,
  Users,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Building2,
  Home,
  Factory,
  ShoppingBag,
  Wrench,
  Palette,
  Hammer,
  HardHat,
  Workflow,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Copy,
  Tag,
  Layers,
  TreePine,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCcw,
  MapPin,
  Calculator,
  Clipboard,
  Archive
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  order: number;
  estimatedDuration: number; // in days
  prerequisites: string[];
  deliverables: string[];
  isRequired: boolean;
}

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  phases: ProjectPhase[];
  estimatedDuration: number;
  estimatedCost: number;
  resources: string[];
  requirements: string[];
}

interface ProjectType {
  id: string;
  name: string;
  description: string;
  category: 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'renovation' | 'maintenance' | 'design' | 'consulting';
  complexity: 'simple' | 'medium' | 'complex' | 'enterprise';
  isActive: boolean;
  color: string;
  icon: string;
  template: ProjectTemplate;
  workflow: {
    autoAssignment: boolean;
    approvalRequired: boolean;
    milestoneTracking: boolean;
    budgetTracking: boolean;
    timeTracking: boolean;
    qualityChecks: boolean;
  };
  pricing: {
    basePrice: number;
    pricePerUnit?: number;
    unit?: string;
    minimumPrice: number;
    maximumPrice?: number;
    factors: string[];
  };
  metadata: {
    tags: string[];
    industries: string[];
    seasonality: 'high' | 'medium' | 'low';
    location: 'indoor' | 'outdoor' | 'both';
    permits: string[];
    insurance: string[];
  };
  performance: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalRevenue: number;
    avgProjectValue: number;
    avgDuration: number;
    onTimeCompletion: number;
    onBudgetCompletion: number;
    customerSatisfaction: number;
    profitMargin: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<any>;
}

// Mock data
const projectCategories: ProjectCategory[] = [
  {
    id: 'residential',
    name: 'Residential',
    description: 'Single-family homes, apartments, and residential developments',
    color: 'bg-blue-500',
    icon: Home
  },
  {
    id: 'commercial',
    name: 'Commercial',
    description: 'Office buildings, retail spaces, and commercial facilities',
    color: 'bg-purple-500',
    icon: Building2
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'Manufacturing facilities, warehouses, and industrial complexes',
    color: 'bg-gray-500',
    icon: Factory
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    description: 'Roads, bridges, utilities, and public infrastructure',
    color: 'bg-amber-500',
    icon: Wrench
  },
  {
    id: 'renovation',
    name: 'Renovation',
    description: 'Remodeling, upgrades, and renovation projects',
    color: 'bg-emerald-500',
    icon: Palette
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Ongoing maintenance and repair services',
    color: 'bg-red-500',
    icon: Hammer
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Architectural design and planning services',
    color: 'bg-indigo-500',
    icon: FileText
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Project consulting and advisory services',
    color: 'bg-rose-500',
    icon: Users
  }
];

const mockProjectTypes: ProjectType[] = [
  {
    id: 'PT001',
    name: 'Single Family Home Construction',
    description: 'Complete construction of single-family residential homes',
    category: 'residential',
    complexity: 'complex',
    isActive: true,
    color: '#3B82F6',
    icon: 'home',
    template: {
      id: 'TPL001',
      name: 'Standard Home Construction',
      description: 'Standard template for single-family home construction',
      phases: [
        {
          id: 'PH001',
          name: 'Planning & Permits',
          description: 'Site planning, permits, and approvals',
          order: 1,
          estimatedDuration: 30,
          prerequisites: [],
          deliverables: ['Building Permit', 'Site Plan', 'Utility Connections'],
          isRequired: true
        },
        {
          id: 'PH002',
          name: 'Site Preparation',
          description: 'Excavation and foundation preparation',
          order: 2,
          estimatedDuration: 14,
          prerequisites: ['PH001'],
          deliverables: ['Site Cleared', 'Foundation Ready'],
          isRequired: true
        },
        {
          id: 'PH003',
          name: 'Foundation',
          description: 'Foundation and basement construction',
          order: 3,
          estimatedDuration: 21,
          prerequisites: ['PH002'],
          deliverables: ['Foundation Complete', 'Basement Framed'],
          isRequired: true
        },
        {
          id: 'PH004',
          name: 'Framing',
          description: 'Structural framing and roofing',
          order: 4,
          estimatedDuration: 28,
          prerequisites: ['PH003'],
          deliverables: ['Frame Complete', 'Roof Installed'],
          isRequired: true
        },
        {
          id: 'PH005',
          name: 'MEP Systems',
          description: 'Mechanical, electrical, and plumbing systems',
          order: 5,
          estimatedDuration: 35,
          prerequisites: ['PH004'],
          deliverables: ['Electrical Rough-in', 'Plumbing Rough-in', 'HVAC Install'],
          isRequired: true
        },
        {
          id: 'PH006',
          name: 'Finishing',
          description: 'Interior and exterior finishing work',
          order: 6,
          estimatedDuration: 42,
          prerequisites: ['PH005'],
          deliverables: ['Interior Complete', 'Exterior Complete'],
          isRequired: true
        }
      ],
      estimatedDuration: 170,
      estimatedCost: 350000,
      resources: ['General Contractor', 'Electrician', 'Plumber', 'HVAC Technician'],
      requirements: ['Building Permit', 'Site Survey', 'Architectural Plans']
    },
    workflow: {
      autoAssignment: true,
      approvalRequired: true,
      milestoneTracking: true,
      budgetTracking: true,
      timeTracking: true,
      qualityChecks: true
    },
    pricing: {
      basePrice: 200000,
      pricePerUnit: 150,
      unit: 'sq ft',
      minimumPrice: 250000,
      maximumPrice: 750000,
      factors: ['Size', 'Location', 'Finishes', 'Upgrades']
    },
    metadata: {
      tags: ['residential', 'new-construction', 'single-family'],
      industries: ['Residential Construction', 'Real Estate Development'],
      seasonality: 'high',
      location: 'outdoor',
      permits: ['Building Permit', 'Electrical Permit', 'Plumbing Permit'],
      insurance: ['General Liability', 'Workers Compensation', 'Property Insurance']
    },
    performance: {
      totalProjects: 45,
      activeProjects: 12,
      completedProjects: 33,
      totalRevenue: 18500000,
      avgProjectValue: 411111,
      avgDuration: 185,
      onTimeCompletion: 78.8,
      onBudgetCompletion: 85.2,
      customerSatisfaction: 4.6,
      profitMargin: 18.5,
      trend: 'up',
      trendPercentage: 12.3
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'Admin'
  },
  {
    id: 'PT002',
    name: 'Kitchen Renovation',
    description: 'Complete kitchen remodeling and renovation',
    category: 'renovation',
    complexity: 'medium',
    isActive: true,
    color: '#10B981',
    icon: 'palette',
    template: {
      id: 'TPL002',
      name: 'Standard Kitchen Renovation',
      description: 'Standard template for kitchen renovation projects',
      phases: [
        {
          id: 'PH007',
          name: 'Design & Planning',
          description: 'Kitchen design and material selection',
          order: 1,
          estimatedDuration: 14,
          prerequisites: [],
          deliverables: ['Design Plans', 'Material List', 'Permits'],
          isRequired: true
        },
        {
          id: 'PH008',
          name: 'Demolition',
          description: 'Remove existing kitchen components',
          order: 2,
          estimatedDuration: 3,
          prerequisites: ['PH007'],
          deliverables: ['Space Cleared', 'Disposal Complete'],
          isRequired: true
        },
        {
          id: 'PH009',
          name: 'Rough Work',
          description: 'Electrical, plumbing, and structural work',
          order: 3,
          estimatedDuration: 7,
          prerequisites: ['PH008'],
          deliverables: ['Electrical Updated', 'Plumbing Updated'],
          isRequired: true
        },
        {
          id: 'PH010',
          name: 'Installation',
          description: 'Install cabinets, countertops, and appliances',
          order: 4,
          estimatedDuration: 10,
          prerequisites: ['PH009'],
          deliverables: ['Cabinets Installed', 'Countertops Installed'],
          isRequired: true
        },
        {
          id: 'PH011',
          name: 'Finishing',
          description: 'Final touches and cleanup',
          order: 5,
          estimatedDuration: 5,
          prerequisites: ['PH010'],
          deliverables: ['Project Complete', 'Final Inspection'],
          isRequired: true
        }
      ],
      estimatedDuration: 39,
      estimatedCost: 45000,
      resources: ['General Contractor', 'Electrician', 'Plumber', 'Cabinet Installer'],
      requirements: ['Homeowner Permit', 'Design Approval']
    },
    workflow: {
      autoAssignment: true,
      approvalRequired: false,
      milestoneTracking: true,
      budgetTracking: true,
      timeTracking: true,
      qualityChecks: true
    },
    pricing: {
      basePrice: 25000,
      pricePerUnit: 200,
      unit: 'sq ft',
      minimumPrice: 15000,
      maximumPrice: 100000,
      factors: ['Size', 'Materials', 'Appliances', 'Finishes']
    },
    metadata: {
      tags: ['renovation', 'kitchen', 'remodeling'],
      industries: ['Home Improvement', 'Interior Design'],
      seasonality: 'medium',
      location: 'indoor',
      permits: ['Electrical Permit', 'Plumbing Permit'],
      insurance: ['General Liability', 'Property Insurance']
    },
    performance: {
      totalProjects: 128,
      activeProjects: 23,
      completedProjects: 105,
      totalRevenue: 6450000,
      avgProjectValue: 50391,
      avgDuration: 42,
      onTimeCompletion: 89.5,
      onBudgetCompletion: 92.1,
      customerSatisfaction: 4.8,
      profitMargin: 22.3,
      trend: 'up',
      trendPercentage: 18.7
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'Admin'
  },
  {
    id: 'PT003',
    name: 'Commercial Office Build-out',
    description: 'Tenant improvement and office space construction',
    category: 'commercial',
    complexity: 'complex',
    isActive: true,
    color: '#8B5CF6',
    icon: 'building-2',
    template: {
      id: 'TPL003',
      name: 'Standard Office Build-out',
      description: 'Standard template for commercial office construction',
      phases: [
        {
          id: 'PH012',
          name: 'Design & Permits',
          description: 'Space planning and permit acquisition',
          order: 1,
          estimatedDuration: 21,
          prerequisites: [],
          deliverables: ['Space Plan', 'Building Permit', 'ADA Compliance'],
          isRequired: true
        },
        {
          id: 'PH013',
          name: 'MEP Design',
          description: 'Mechanical, electrical, and plumbing design',
          order: 2,
          estimatedDuration: 14,
          prerequisites: ['PH012'],
          deliverables: ['MEP Plans', 'Load Calculations'],
          isRequired: true
        },
        {
          id: 'PH014',
          name: 'Construction',
          description: 'Build-out construction work',
          order: 3,
          estimatedDuration: 45,
          prerequisites: ['PH013'],
          deliverables: ['Framing Complete', 'MEP Installed'],
          isRequired: true
        },
        {
          id: 'PH015',
          name: 'Finishes',
          description: 'Interior finishes and fixtures',
          order: 4,
          estimatedDuration: 28,
          prerequisites: ['PH014'],
          deliverables: ['Finishes Complete', 'Fixtures Installed'],
          isRequired: true
        }
      ],
      estimatedDuration: 108,
      estimatedCost: 125000,
      resources: ['Project Manager', 'General Contractor', 'MEP Contractors'],
      requirements: ['Tenant Permit', 'Building Owner Approval']
    },
    workflow: {
      autoAssignment: true,
      approvalRequired: true,
      milestoneTracking: true,
      budgetTracking: true,
      timeTracking: true,
      qualityChecks: true
    },
    pricing: {
      basePrice: 75000,
      pricePerUnit: 85,
      unit: 'sq ft',
      minimumPrice: 50000,
      maximumPrice: 500000,
      factors: ['Size', 'Finishes', 'Technology', 'Timeline']
    },
    metadata: {
      tags: ['commercial', 'office', 'tenant-improvement'],
      industries: ['Commercial Construction', 'Office Development'],
      seasonality: 'low',
      location: 'indoor',
      permits: ['Building Permit', 'Electrical Permit', 'Fire Department'],
      insurance: ['General Liability', 'Professional Liability', 'Workers Compensation']
    },
    performance: {
      totalProjects: 67,
      activeProjects: 15,
      completedProjects: 52,
      totalRevenue: 9850000,
      avgProjectValue: 147015,
      avgDuration: 115,
      onTimeCompletion: 82.7,
      onBudgetCompletion: 78.8,
      customerSatisfaction: 4.4,
      profitMargin: 15.8,
      trend: 'stable',
      trendPercentage: 3.2
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'Admin'
  },
  {
    id: 'PT004',
    name: 'Roof Replacement',
    description: 'Complete roof replacement and repair services',
    category: 'maintenance',
    complexity: 'medium',
    isActive: true,
    color: '#EF4444',
    icon: 'hard-hat',
    template: {
      id: 'TPL004',
      name: 'Standard Roof Replacement',
      description: 'Standard template for roof replacement projects',
      phases: [
        {
          id: 'PH016',
          name: 'Inspection & Estimate',
          description: 'Roof inspection and detailed estimate',
          order: 1,
          estimatedDuration: 2,
          prerequisites: [],
          deliverables: ['Inspection Report', 'Material List', 'Estimate'],
          isRequired: true
        },
        {
          id: 'PH017',
          name: 'Material Delivery',
          description: 'Order and deliver roofing materials',
          order: 2,
          estimatedDuration: 3,
          prerequisites: ['PH016'],
          deliverables: ['Materials On-site', 'Equipment Ready'],
          isRequired: true
        },
        {
          id: 'PH018',
          name: 'Tear-off',
          description: 'Remove existing roofing materials',
          order: 3,
          estimatedDuration: 1,
          prerequisites: ['PH017'],
          deliverables: ['Old Roof Removed', 'Deck Inspected'],
          isRequired: true
        },
        {
          id: 'PH019',
          name: 'Installation',
          description: 'Install new roofing system',
          order: 4,
          estimatedDuration: 2,
          prerequisites: ['PH018'],
          deliverables: ['New Roof Installed', 'Flashing Complete'],
          isRequired: true
        },
        {
          id: 'PH020',
          name: 'Cleanup & Inspection',
          description: 'Final cleanup and quality inspection',
          order: 5,
          estimatedDuration: 1,
          prerequisites: ['PH019'],
          deliverables: ['Site Clean', 'Final Inspection'],
          isRequired: true
        }
      ],
      estimatedDuration: 9,
      estimatedCost: 18000,
      resources: ['Roofing Crew', 'Safety Coordinator'],
      requirements: ['Homeowner Permit', 'Weather Window']
    },
    workflow: {
      autoAssignment: true,
      approvalRequired: false,
      milestoneTracking: true,
      budgetTracking: true,
      timeTracking: true,
      qualityChecks: true
    },
    pricing: {
      basePrice: 12000,
      pricePerUnit: 8,
      unit: 'sq ft',
      minimumPrice: 8000,
      maximumPrice: 45000,
      factors: ['Size', 'Material Type', 'Complexity', 'Access']
    },
    metadata: {
      tags: ['roofing', 'replacement', 'maintenance'],
      industries: ['Roofing', 'Home Maintenance'],
      seasonality: 'high',
      location: 'outdoor',
      permits: ['Building Permit'],
      insurance: ['General Liability', 'Workers Compensation']
    },
    performance: {
      totalProjects: 234,
      activeProjects: 18,
      completedProjects: 216,
      totalRevenue: 4680000,
      avgProjectValue: 20000,
      avgDuration: 8,
      onTimeCompletion: 95.8,
      onBudgetCompletion: 91.2,
      customerSatisfaction: 4.7,
      profitMargin: 28.5,
      trend: 'up',
      trendPercentage: 15.9
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 17),
    createdBy: 'Admin'
  }
];

// Helper functions
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getTrendIcon(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up': return ArrowUpRight;
    case 'down': return ArrowDownRight;
    case 'stable': return Activity;
  }
}

function getTrendColor(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up': return 'text-emerald-600';
    case 'down': return 'text-red-600';
    case 'stable': return 'text-gray-600';
  }
}

function getComplexityColor(complexity: ProjectType['complexity']) {
  switch (complexity) {
    case 'simple': return 'text-emerald-600 bg-emerald-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    case 'complex': return 'text-red-600 bg-red-50';
    case 'enterprise': return 'text-purple-600 bg-purple-50';
  }
}

function getProjectTypeIcon(icon: string) {
  switch (icon) {
    case 'home': return Home;
    case 'building-2': return Building2;
    case 'palette': return Palette;
    case 'hard-hat': return HardHat;
    case 'wrench': return Wrench;
    case 'hammer': return Hammer;
    case 'factory': return Factory;
    case 'file-text': return FileText;
    default: return FolderOpen;
  }
}

function ProjectTypeCard({ projectType, onEdit, onView, onToggle, onDelete }: {
  projectType: ProjectType;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const Icon = getProjectTypeIcon(projectType.icon);
  const TrendIcon = getTrendIcon(projectType.performance.trend);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div 
              className="p-2 rounded-lg text-white"
              style={{ backgroundColor: projectType.color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{projectType.name}</h3>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getComplexityColor(projectType.complexity))}
                >
                  {projectType.complexity}
                </Badge>
                {!projectType.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
                {projectType.workflow.autoAssignment && (
                  <Tooltip content="Auto Assignment Enabled">
                    <Zap className="h-3 w-3 text-amber-500" />
                  </Tooltip>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{projectType.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{projectType.template.estimatedDuration} days</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{formatCurrency(projectType.template.estimatedCost)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Layers className="h-3 w-3" />
                  <span>{projectType.template.phases.length} phases</span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Type
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Workflow className="h-4 w-4 mr-2" />
                Edit Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {projectType.isActive ? (
                  <>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Template
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold">{projectType.performance.totalProjects}</p>
            <p className="text-xs text-gray-500">Total Projects</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-blue-600">{projectType.performance.activeProjects}</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Value:</span>
            <span className="font-medium">{formatCurrency(projectType.performance.avgProjectValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">On Time:</span>
            <span className="font-medium">{projectType.performance.onTimeCompletion.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">On Budget:</span>
            <span className="font-medium">{projectType.performance.onBudgetCompletion.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Satisfaction:</span>
            <span className="font-medium">{projectType.performance.customerSatisfaction.toFixed(1)}/5</span>
          </div>
        </div>
        
        {/* Profit Margin */}
        <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(projectType.performance.trend))}>
          <TrendIcon className="h-4 w-4" />
          <span>{projectType.performance.profitMargin.toFixed(1)}% profit margin</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category, projectTypes }: {
  category: ProjectCategory;
  projectTypes: ProjectType[];
}) {
  const categoryStats = useMemo(() => {
    const totalProjects = projectTypes.reduce((sum, pt) => sum + pt.performance.totalProjects, 0);
    const totalRevenue = projectTypes.reduce((sum, pt) => sum + pt.performance.totalRevenue, 0);
    const avgMargin = projectTypes.length > 0 
      ? projectTypes.reduce((sum, pt) => sum + pt.performance.profitMargin, 0) / projectTypes.length 
      : 0;
    const avgSatisfaction = projectTypes.length > 0 
      ? projectTypes.reduce((sum, pt) => sum + pt.performance.customerSatisfaction, 0) / projectTypes.length 
      : 0;
    
    return { totalProjects, totalRevenue, avgMargin, avgSatisfaction };
  }, [projectTypes]);

  const Icon = category.icon;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className={cn("p-2 rounded-lg text-white", category.color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base">{category.name}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center">
            <p className="text-lg font-bold">{projectTypes.length}</p>
            <p className="text-xs text-gray-500">Project Types</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{formatNumber(categoryStats.totalProjects)}</p>
            <p className="text-xs text-gray-500">Total Projects</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Revenue:</span>
            <span className="font-medium">{formatCurrency(categoryStats.totalRevenue)}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Margin:</span>
            <span className="font-medium">{categoryStats.avgMargin.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Satisfaction:</span>
            <span className="font-medium">{categoryStats.avgSatisfaction.toFixed(1)}/5</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectTypes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [selectedTab, setSelectedTab] = useState('types');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [projectTypes, setProjectTypes] = useState(mockProjectTypes);

  const filteredProjectTypes = useMemo(() => {
    return projectTypes.filter(projectType => {
      const matchesSearch = !searchQuery || 
        projectType.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        projectType.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || projectType.category === selectedCategory;
      const matchesComplexity = selectedComplexity === 'all' || projectType.complexity === selectedComplexity;
      
      return matchesSearch && matchesCategory && matchesComplexity;
    });
  }, [searchQuery, selectedCategory, selectedComplexity, projectTypes]);

  const overallStats = useMemo(() => {
    const totalTypes = projectTypes.length;
    const activeTypes = projectTypes.filter(pt => pt.isActive).length;
    const totalProjects = projectTypes.reduce((sum, pt) => sum + pt.performance.totalProjects, 0);
    const totalRevenue = projectTypes.reduce((sum, pt) => sum + pt.performance.totalRevenue, 0);
    const avgMargin = projectTypes.length > 0 
      ? projectTypes.reduce((sum, pt) => sum + pt.performance.profitMargin, 0) / projectTypes.length 
      : 0;
    const avgSatisfaction = projectTypes.length > 0 
      ? projectTypes.reduce((sum, pt) => sum + pt.performance.customerSatisfaction, 0) / projectTypes.length 
      : 0;
    
    return { totalTypes, activeTypes, totalProjects, totalRevenue, avgMargin, avgSatisfaction };
  }, [projectTypes]);

  const handleToggleProjectType = (projectTypeId: string) => {
    setProjectTypes(prev => prev.map(pt => 
      pt.id === projectTypeId ? { ...pt, isActive: !pt.isActive } : pt
    ));
  };

  const handleDeleteProjectType = (projectTypeId: string) => {
    setProjectTypes(prev => prev.filter(pt => pt.id !== projectTypeId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Project Types</h1>
              <Badge variant="secondary">{filteredProjectTypes.length} types</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search project types..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {projectCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Complexity</SelectItem>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Type
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="types">All Types</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Project Types</p>
                        <p className="text-2xl font-bold">{overallStats.totalTypes}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeTypes} active</p>
                      </div>
                      <FolderOpen className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Projects</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalProjects)}</p>
                        <p className="text-xs text-gray-500">All types</p>
                      </div>
                      <Archive className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold">{formatCurrency(overallStats.totalRevenue)}</p>
                        <p className="text-xs text-gray-500">Generated</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Margin</p>
                        <p className={cn("text-2xl font-bold", 
                          overallStats.avgMargin > 20 ? "text-emerald-600" : 
                          overallStats.avgMargin > 15 ? "text-amber-600" : "text-red-600"
                        )}>
                          {overallStats.avgMargin.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Profit margin</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjectTypes.map((projectType) => (
                  <ProjectTypeCard
                    key={projectType.id}
                    projectType={projectType}
                    onEdit={() => {}}
                    onView={() => {}}
                    onToggle={() => handleToggleProjectType(projectType.id)}
                    onDelete={() => handleDeleteProjectType(projectType.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectCategories.map((category) => {
                  const categoryProjectTypes = projectTypes.filter(pt => pt.category === category.id);
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      projectTypes={categoryProjectTypes}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projectTypes.map((projectType) => (
                  <Card key={projectType.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="p-2 rounded-lg text-white"
                          style={{ backgroundColor: projectType.color }}
                        >
                          {React.createElement(getProjectTypeIcon(projectType.icon), { className: "h-5 w-5" })}
                        </div>
                        <div>
                          <CardTitle className="text-base">{projectType.template.name}</CardTitle>
                          <CardDescription>{projectType.template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <p className="font-semibold">{projectType.template.phases.length}</p>
                            <p className="text-gray-500">Phases</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">{projectType.template.estimatedDuration}</p>
                            <p className="text-gray-500">Days</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">{formatCurrency(projectType.template.estimatedCost)}</p>
                            <p className="text-gray-500">Cost</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Template Phases</h4>
                          <div className="space-y-1">
                            {projectType.template.phases.map((phase, index) => (
                              <div key={phase.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                <div className="flex items-center space-x-2">
                                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center">
                                    {index + 1}
                                  </span>
                                  <span>{phase.name}</span>
                                </div>
                                <span className="text-gray-500">{phase.estimatedDuration}d</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Performance Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Type Performance</CardTitle>
                  <CardDescription>Comparison of key performance metrics across project types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectTypes
                      .sort((a, b) => b.performance.profitMargin - a.performance.profitMargin)
                      .map((projectType) => {
                        const Icon = getProjectTypeIcon(projectType.icon);
                        return (
                          <div key={projectType.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="p-2 rounded-lg text-white"
                                style={{ backgroundColor: projectType.color }}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{projectType.name}</p>
                                <p className="text-sm text-gray-500">
                                  {projectType.performance.totalProjects} projects • {projectType.template.estimatedDuration} days avg
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-right text-sm">
                              <div>
                                <p className="font-semibold text-emerald-600">{projectType.performance.profitMargin.toFixed(1)}%</p>
                                <p className="text-gray-500">Profit</p>
                              </div>
                              <div>
                                <p className="font-semibold">{projectType.performance.onTimeCompletion.toFixed(1)}%</p>
                                <p className="text-gray-500">On Time</p>
                              </div>
                              <div>
                                <p className="font-semibold">{projectType.performance.customerSatisfaction.toFixed(1)}/5</p>
                                <p className="text-gray-500">Rating</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Metrics by Complexity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Complexity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['simple', 'medium', 'complex', 'enterprise'].map((complexity) => {
                        const typesByComplexity = projectTypes.filter(pt => pt.complexity === complexity);
                        const totalRevenue = typesByComplexity.reduce((sum, pt) => sum + pt.performance.totalRevenue, 0);
                        const maxRevenue = Math.max(...['simple', 'medium', 'complex', 'enterprise'].map(c => 
                          projectTypes.filter(pt => pt.complexity === c).reduce((sum, pt) => sum + pt.performance.totalRevenue, 0)
                        ));
                        
                        return (
                          <div key={complexity} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{complexity}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${(totalRevenue / maxRevenue) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-20 text-right">
                                {formatCurrency(totalRevenue)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Duration by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {projectCategories.map((category) => {
                        const categoryTypes = projectTypes.filter(pt => pt.category === category.id);
                        const avgDuration = categoryTypes.length > 0 
                          ? categoryTypes.reduce((sum, pt) => sum + pt.template.estimatedDuration, 0) / categoryTypes.length 
                          : 0;
                        const maxDuration = Math.max(...projectCategories.map(c => {
                          const types = projectTypes.filter(pt => pt.category === c.id);
                          return types.length > 0 ? types.reduce((sum, pt) => sum + pt.template.estimatedDuration, 0) / types.length : 0;
                        }));
                        
                        return (
                          <div key={category.id} className="flex items-center justify-between">
                            <span className="text-sm">{category.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${maxDuration > 0 ? (avgDuration / maxDuration) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {avgDuration.toFixed(0)}d
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Project Type Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Project Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Project Type Name</Label>
                  <Input placeholder="e.g., Kitchen Renovation" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe this project type..." />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Complexity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="complex">Complex</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Estimated Duration (days)</Label>
                  <Input type="number" placeholder="30" />
                </div>
                <div>
                  <Label>Estimated Cost</Label>
                  <Input type="number" placeholder="25000" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Base Price</Label>
                  <Input type="number" placeholder="15000" />
                </div>
                <div>
                  <Label>Price per Unit</Label>
                  <Input type="number" placeholder="150" />
                </div>
              </div>
              
              <div>
                <Label>Workflow Features</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Auto Assignment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Approval Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Milestone Tracking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>Budget Tracking</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input placeholder="renovation, kitchen, remodeling" />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>
                Create Project Type
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
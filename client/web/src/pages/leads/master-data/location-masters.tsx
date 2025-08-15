import React, { useState, useMemo } from 'react';
import {
  MapPin,
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
  Globe,
  Navigation,
  Map,
  Route,
  Compass,
  Locate,
  MapIcon,
  Crosshair,
  Landmark,
  TreePine,
  Mountain,
  Waves,
  Layers,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Tag,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Gauge
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
interface GeographicalBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface LocationManager {
  id: string;
  name: string;
  role: 'manager' | 'supervisor' | 'coordinator';
  email: string;
  phone: string;
  territories: string[];
}

interface ServiceArea {
  id: string;
  name: string;
  description: string;
  radius: number; // in miles/km
  travelTime: number; // in minutes
  serviceTypes: string[];
  priority: 'high' | 'medium' | 'low';
}

interface Location {
  id: string;
  name: string;
  code: string;
  type: 'country' | 'state' | 'city' | 'county' | 'district' | 'zone' | 'territory' | 'neighborhood';
  parentId?: string;
  level: number;
  isActive: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  bounds?: GeographicalBounds;
  address: {
    street?: string;
    city: string;
    state: string;
    zipCode?: string;
    country: string;
  };
  metadata: {
    population?: number;
    area?: number; // in sq km
    timeZone: string;
    currency?: string;
    language?: string;
    economicLevel?: 'high' | 'medium' | 'low';
    urbanization?: 'urban' | 'suburban' | 'rural';
    demographics?: {
      averageIncome?: number;
      homeOwnership?: number;
      averageAge?: number;
    };
  };
  serviceInfo: {
    isServiceable: boolean;
    serviceAreas: ServiceArea[];
    managers: LocationManager[];
    restrictions?: string[];
    permits: string[];
    regulations: string[];
  };
  performance: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalRevenue: number;
    avgLeadValue: number;
    conversionRate: number;
    marketPenetration: number;
    competitionLevel: 'high' | 'medium' | 'low';
    seasonality: 'high' | 'medium' | 'low';
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
    growthPotential: number;
  };
  children?: Location[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface LocationCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<any>;
}

// Mock data
const locationCategories: LocationCategory[] = [
  {
    id: 'metropolitan',
    name: 'Metropolitan Areas',
    description: 'Major metropolitan regions and urban centers',
    color: 'bg-blue-500',
    icon: Building2
  },
  {
    id: 'suburban',
    name: 'Suburban Regions',
    description: 'Suburban communities and residential areas',
    color: 'bg-emerald-500',
    icon: Home
  },
  {
    id: 'rural',
    name: 'Rural Areas',
    description: 'Rural communities and countryside regions',
    color: 'bg-green-500',
    icon: TreePine
  },
  {
    id: 'coastal',
    name: 'Coastal Regions',
    description: 'Coastal cities and waterfront communities',
    color: 'bg-cyan-500',
    icon: Waves
  },
  {
    id: 'mountain',
    name: 'Mountain Regions',
    description: 'Mountain communities and elevated areas',
    color: 'bg-stone-500',
    icon: Mountain
  },
  {
    id: 'industrial',
    name: 'Industrial Zones',
    description: 'Industrial parks and commercial districts',
    color: 'bg-gray-500',
    icon: Building2
  }
];

const mockLocations: Location[] = [
  {
    id: 'LOC001',
    name: 'California',
    code: 'CA',
    type: 'state',
    level: 1,
    isActive: true,
    coordinates: {
      latitude: 36.7783,
      longitude: -119.4179
    },
    bounds: {
      north: 42.0,
      south: 32.5,
      east: -114.1,
      west: -124.4
    },
    address: {
      city: '',
      state: 'California',
      country: 'United States'
    },
    metadata: {
      population: 39538223,
      area: 423970,
      timeZone: 'PST',
      currency: 'USD',
      language: 'English',
      economicLevel: 'high',
      urbanization: 'urban',
      demographics: {
        averageIncome: 75235,
        homeOwnership: 54.9,
        averageAge: 36.5
      }
    },
    serviceInfo: {
      isServiceable: true,
      serviceAreas: [
        {
          id: 'SA001',
          name: 'Northern California',
          description: 'San Francisco Bay Area and surrounding regions',
          radius: 150,
          travelTime: 120,
          serviceTypes: ['residential', 'commercial', 'industrial'],
          priority: 'high'
        },
        {
          id: 'SA002',
          name: 'Southern California',
          description: 'Los Angeles, Orange County, and San Diego regions',
          radius: 200,
          travelTime: 180,
          serviceTypes: ['residential', 'commercial'],
          priority: 'high'
        }
      ],
      managers: [
        {
          id: 'MGR001',
          name: 'John Smith',
          role: 'manager',
          email: 'john.smith@company.com',
          phone: '+1-555-0101',
          territories: ['Northern California', 'Central Valley']
        }
      ],
      permits: ['State License', 'Contractor License'],
      regulations: ['California Building Code', 'Environmental Regulations']
    },
    performance: {
      totalLeads: 1245,
      qualifiedLeads: 789,
      convertedLeads: 234,
      totalRevenue: 12500000,
      avgLeadValue: 10040,
      conversionRate: 18.8,
      marketPenetration: 2.5,
      competitionLevel: 'high',
      seasonality: 'medium',
      trend: 'up',
      trendPercentage: 15.3,
      growthPotential: 85
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'Admin'
  },
  {
    id: 'LOC002',
    name: 'Los Angeles',
    code: 'LA',
    type: 'city',
    parentId: 'LOC001',
    level: 2,
    isActive: true,
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    bounds: {
      north: 34.8,
      south: 33.7,
      east: -117.6,
      west: -118.9
    },
    address: {
      city: 'Los Angeles',
      state: 'California',
      country: 'United States'
    },
    metadata: {
      population: 3898747,
      area: 1302,
      timeZone: 'PST',
      currency: 'USD',
      language: 'English',
      economicLevel: 'high',
      urbanization: 'urban',
      demographics: {
        averageIncome: 65290,
        homeOwnership: 36.2,
        averageAge: 35.8
      }
    },
    serviceInfo: {
      isServiceable: true,
      serviceAreas: [
        {
          id: 'SA003',
          name: 'Downtown LA',
          description: 'Central business district and urban core',
          radius: 25,
          travelTime: 45,
          serviceTypes: ['commercial', 'high-rise'],
          priority: 'high'
        },
        {
          id: 'SA004',
          name: 'Greater LA Area',
          description: 'Surrounding metropolitan area',
          radius: 50,
          travelTime: 90,
          serviceTypes: ['residential', 'commercial'],
          priority: 'medium'
        }
      ],
      managers: [
        {
          id: 'MGR002',
          name: 'Maria Garcia',
          role: 'supervisor',
          email: 'maria.garcia@company.com',
          phone: '+1-555-0102',
          territories: ['Downtown LA', 'West LA']
        }
      ],
      permits: ['City Permit', 'Fire Department Approval'],
      regulations: ['LA Building Code', 'Seismic Requirements']
    },
    performance: {
      totalLeads: 456,
      qualifiedLeads: 298,
      convertedLeads: 89,
      totalRevenue: 5800000,
      avgLeadValue: 12719,
      conversionRate: 19.5,
      marketPenetration: 1.8,
      competitionLevel: 'high',
      seasonality: 'low',
      trend: 'up',
      trendPercentage: 22.1,
      growthPotential: 75
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'Admin'
  },
  {
    id: 'LOC003',
    name: 'San Francisco',
    code: 'SF',
    type: 'city',
    parentId: 'LOC001',
    level: 2,
    isActive: true,
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    bounds: {
      north: 37.8,
      south: 37.7,
      east: -122.3,
      west: -122.5
    },
    address: {
      city: 'San Francisco',
      state: 'California',
      country: 'United States'
    },
    metadata: {
      population: 873965,
      area: 121,
      timeZone: 'PST',
      currency: 'USD',
      language: 'English',
      economicLevel: 'high',
      urbanization: 'urban',
      demographics: {
        averageIncome: 96265,
        homeOwnership: 37.1,
        averageAge: 38.5
      }
    },
    serviceInfo: {
      isServiceable: true,
      serviceAreas: [
        {
          id: 'SA005',
          name: 'San Francisco Proper',
          description: 'City limits and immediate area',
          radius: 15,
          travelTime: 30,
          serviceTypes: ['residential', 'commercial'],
          priority: 'high'
        }
      ],
      managers: [
        {
          id: 'MGR003',
          name: 'David Chen',
          role: 'coordinator',
          email: 'david.chen@company.com',
          phone: '+1-555-0103',
          territories: ['San Francisco']
        }
      ],
      permits: ['SF Building Permit', 'Historic District Approval'],
      regulations: ['SF Building Code', 'Historic Preservation']
    },
    performance: {
      totalLeads: 234,
      qualifiedLeads: 189,
      convertedLeads: 67,
      totalRevenue: 4200000,
      avgLeadValue: 17949,
      conversionRate: 28.6,
      marketPenetration: 3.2,
      competitionLevel: 'high',
      seasonality: 'low',
      trend: 'stable',
      trendPercentage: 5.8,
      growthPotential: 60
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'Admin'
  },
  {
    id: 'LOC004',
    name: 'Texas',
    code: 'TX',
    type: 'state',
    level: 1,
    isActive: true,
    coordinates: {
      latitude: 31.9686,
      longitude: -99.9018
    },
    bounds: {
      north: 36.5,
      south: 25.8,
      east: -93.5,
      west: -106.6
    },
    address: {
      city: '',
      state: 'Texas',
      country: 'United States'
    },
    metadata: {
      population: 29145505,
      area: 695662,
      timeZone: 'CST',
      currency: 'USD',
      language: 'English',
      economicLevel: 'medium',
      urbanization: 'suburban',
      demographics: {
        averageIncome: 64034,
        homeOwnership: 62.1,
        averageAge: 34.8
      }
    },
    serviceInfo: {
      isServiceable: true,
      serviceAreas: [
        {
          id: 'SA006',
          name: 'North Texas',
          description: 'Dallas-Fort Worth metroplex',
          radius: 100,
          travelTime: 90,
          serviceTypes: ['residential', 'commercial'],
          priority: 'high'
        },
        {
          id: 'SA007',
          name: 'South Texas',
          description: 'Houston and surrounding areas',
          radius: 120,
          travelTime: 100,
          serviceTypes: ['residential', 'industrial'],
          priority: 'high'
        }
      ],
      managers: [
        {
          id: 'MGR004',
          name: 'Sarah Johnson',
          role: 'manager',
          email: 'sarah.johnson@company.com',
          phone: '+1-555-0104',
          territories: ['North Texas', 'Central Texas']
        }
      ],
      permits: ['Texas State License'],
      regulations: ['Texas Building Standards']
    },
    performance: {
      totalLeads: 789,
      qualifiedLeads: 567,
      convertedLeads: 178,
      totalRevenue: 8900000,
      avgLeadValue: 11283,
      conversionRate: 22.6,
      marketPenetration: 1.9,
      competitionLevel: 'medium',
      seasonality: 'high',
      trend: 'up',
      trendPercentage: 28.4,
      growthPotential: 92
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 17),
    createdBy: 'Admin'
  },
  {
    id: 'LOC005',
    name: 'Austin',
    code: 'ATX',
    type: 'city',
    parentId: 'LOC004',
    level: 2,
    isActive: true,
    coordinates: {
      latitude: 30.2672,
      longitude: -97.7431
    },
    bounds: {
      north: 30.5,
      south: 30.0,
      east: -97.5,
      west: -98.0
    },
    address: {
      city: 'Austin',
      state: 'Texas',
      country: 'United States'
    },
    metadata: {
      population: 978908,
      area: 827,
      timeZone: 'CST',
      currency: 'USD',
      language: 'English',
      economicLevel: 'high',
      urbanization: 'urban',
      demographics: {
        averageIncome: 75752,
        homeOwnership: 42.8,
        averageAge: 33.9
      }
    },
    serviceInfo: {
      isServiceable: true,
      serviceAreas: [
        {
          id: 'SA008',
          name: 'Austin Metro',
          description: 'Austin metropolitan area',
          radius: 40,
          travelTime: 60,
          serviceTypes: ['residential', 'commercial', 'tech'],
          priority: 'high'
        }
      ],
      managers: [
        {
          id: 'MGR005',
          name: 'Mike Rodriguez',
          role: 'supervisor',
          email: 'mike.rodriguez@company.com',
          phone: '+1-555-0105',
          territories: ['Austin Metro']
        }
      ],
      permits: ['Austin Building Permit'],
      regulations: ['Austin Green Building Program']
    },
    performance: {
      totalLeads: 198,
      qualifiedLeads: 156,
      convertedLeads: 67,
      totalRevenue: 3400000,
      avgLeadValue: 17172,
      conversionRate: 33.8,
      marketPenetration: 4.1,
      competitionLevel: 'medium',
      seasonality: 'medium',
      trend: 'up',
      trendPercentage: 35.2,
      growthPotential: 88
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 16),
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

function getLocationTypeIcon(type: Location['type']) {
  switch (type) {
    case 'country': return Globe;
    case 'state': return Map;
    case 'city': return Building2;
    case 'county': return Landmark;
    case 'district': return Route;
    case 'zone': return Target;
    case 'territory': return Compass;
    case 'neighborhood': return Home;
    default: return MapPin;
  }
}

function getCompetitionColor(level: 'high' | 'medium' | 'low') {
  switch (level) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    case 'low': return 'text-emerald-600 bg-emerald-50';
  }
}

function getEconomicLevelColor(level: 'high' | 'medium' | 'low') {
  switch (level) {
    case 'high': return 'text-emerald-600 bg-emerald-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    case 'low': return 'text-red-600 bg-red-50';
  }
}

function LocationCard({ location, onEdit, onView, onToggle, onDelete }: {
  location: Location;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const TypeIcon = getLocationTypeIcon(location.type);
  const TrendIcon = getTrendIcon(location.performance.trend);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-blue-500 text-white">
              <TypeIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{location.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {location.code}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {location.type}
                </Badge>
                {location.level > 1 && (
                  <Badge variant="outline" className="text-xs">
                    L{location.level}
                  </Badge>
                )}
                {!location.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
                {location.serviceInfo.isServiceable && (
                  <Tooltip content="Serviceable Area">
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                  </Tooltip>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{location.address.city}, {location.address.state}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {location.metadata.population && (
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{formatNumber(location.metadata.population)}</span>
                  </div>
                )}
                {location.metadata.economicLevel && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span className={cn("px-1 rounded text-xs", getEconomicLevelColor(location.metadata.economicLevel))}>
                      {location.metadata.economicLevel} income
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>{location.serviceInfo.serviceAreas.length} areas</span>
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
                Edit Location
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Route className="h-4 w-4 mr-2" />
                Manage Areas
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                Assign Managers
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {location.isActive ? (
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
                Export Data
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
            <p className="text-lg font-bold">{location.performance.totalLeads}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-green-600">{location.performance.conversionRate}%</p>
            <p className="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Revenue:</span>
            <span className="font-medium">{formatCurrency(location.performance.totalRevenue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Lead Value:</span>
            <span className="font-medium">{formatCurrency(location.performance.avgLeadValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Market Penetration:</span>
            <span className="font-medium">{location.performance.marketPenetration}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Competition:</span>
            <span className={cn("text-xs px-1 rounded font-medium", getCompetitionColor(location.performance.competitionLevel))}>
              {location.performance.competitionLevel}
            </span>
          </div>
        </div>
        
        {/* Growth Potential */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Growth Potential:</span>
            <span className="font-medium">{location.performance.growthPotential}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: `${location.performance.growthPotential}%` }}
            />
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(location.performance.trend))}>
          <TrendIcon className="h-4 w-4" />
          <span>
            {location.performance.trend === 'up' ? '+' : location.performance.trend === 'down' ? '-' : ''}
            {Math.abs(location.performance.trendPercentage)}% trend
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category, locations }: {
  category: LocationCategory;
  locations: Location[];
}) {
  const categoryStats = useMemo(() => {
    const totalLeads = locations.reduce((sum, l) => sum + l.performance.totalLeads, 0);
    const totalRevenue = locations.reduce((sum, l) => sum + l.performance.totalRevenue, 0);
    const avgConversion = locations.length > 0 
      ? locations.reduce((sum, l) => sum + l.performance.conversionRate, 0) / locations.length 
      : 0;
    const avgGrowth = locations.length > 0 
      ? locations.reduce((sum, l) => sum + l.performance.growthPotential, 0) / locations.length 
      : 0;
    
    return { totalLeads, totalRevenue, avgConversion, avgGrowth };
  }, [locations]);

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
            <p className="text-lg font-bold">{locations.length}</p>
            <p className="text-xs text-gray-500">Locations</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{formatNumber(categoryStats.totalLeads)}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Revenue:</span>
            <span className="font-medium">{formatCurrency(categoryStats.totalRevenue)}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Conversion:</span>
            <span className="font-medium">{categoryStats.avgConversion.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Growth Potential:</span>
            <span className="font-medium">{categoryStats.avgGrowth.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LocationMasters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTab, setSelectedTab] = useState('locations');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [locations, setLocations] = useState(mockLocations);

  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesSearch = !searchQuery || 
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || location.type === selectedType;
      const matchesLevel = selectedLevel === 'all' || location.level === parseInt(selectedLevel);
      
      return matchesSearch && matchesType && matchesLevel;
    });
  }, [searchQuery, selectedType, selectedLevel, locations]);

  const overallStats = useMemo(() => {
    const totalLocations = locations.length;
    const activeLocations = locations.filter(l => l.isActive).length;
    const serviceableLocations = locations.filter(l => l.serviceInfo.isServiceable).length;
    const totalLeads = locations.reduce((sum, l) => sum + l.performance.totalLeads, 0);
    const totalRevenue = locations.reduce((sum, l) => sum + l.performance.totalRevenue, 0);
    const avgPenetration = locations.length > 0 
      ? locations.reduce((sum, l) => sum + l.performance.marketPenetration, 0) / locations.length 
      : 0;
    const totalPopulation = locations.reduce((sum, l) => sum + (l.metadata.population || 0), 0);
    
    return { totalLocations, activeLocations, serviceableLocations, totalLeads, totalRevenue, avgPenetration, totalPopulation };
  }, [locations]);

  const handleToggleLocation = (locationId: string) => {
    setLocations(prev => prev.map(l => 
      l.id === locationId ? { ...l, isActive: !l.isActive } : l
    ));
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocations(prev => prev.filter(l => l.id !== locationId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Location Masters</h1>
              <Badge variant="secondary">{filteredLocations.length} locations</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search locations..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="county">County</SelectItem>
                  <SelectItem value="district">District</SelectItem>
                  <SelectItem value="zone">Zone</SelectItem>
                  <SelectItem value="territory">Territory</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="2">Level 2</SelectItem>
                  <SelectItem value="3">Level 3</SelectItem>
                  <SelectItem value="4">Level 4</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="locations">All Locations</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
              <TabsTrigger value="territories">Territories</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="locations" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Locations</p>
                        <p className="text-2xl font-bold">{overallStats.totalLocations}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeLocations} active</p>
                      </div>
                      <MapPin className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Serviceable Areas</p>
                        <p className="text-2xl font-bold">{overallStats.serviceableLocations}</p>
                        <p className="text-xs text-gray-500">Active service areas</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Population</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalPopulation)}</p>
                        <p className="text-xs text-gray-500">Market reach</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Penetration</p>
                        <p className="text-2xl font-bold">{overallStats.avgPenetration.toFixed(1)}%</p>
                        <p className="text-xs text-gray-500">Market penetration</p>
                      </div>
                      <Target className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Locations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onEdit={() => {}}
                    onView={() => {}}
                    onToggle={() => handleToggleLocation(location.id)}
                    onDelete={() => handleDeleteLocation(location.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hierarchy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TreePine className="h-5 w-5" />
                    <span>Location Hierarchy</span>
                  </CardTitle>
                  <CardDescription>Hierarchical view of geographical locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locations
                      .filter(l => l.level === 1)
                      .map((location) => {
                        const children = locations.filter(l => l.parentId === location.id);
                        const TypeIcon = getLocationTypeIcon(location.type);
                        
                        return (
                          <div key={location.id} className="border rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="p-2 rounded-lg bg-blue-500 text-white">
                                <TypeIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{location.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {location.metadata.population ? formatNumber(location.metadata.population) + ' population' : ''}
                                  {location.metadata.area ? ` • ${formatNumber(location.metadata.area)} km²` : ''}
                                </p>
                              </div>
                              <div className="ml-auto">
                                <Badge variant="outline">{location.performance.totalLeads} leads</Badge>
                              </div>
                            </div>
                            
                            {children.length > 0 && (
                              <div className="ml-6 space-y-2">
                                {children.map((child) => {
                                  const ChildIcon = getLocationTypeIcon(child.type);
                                  return (
                                    <div key={child.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                      <div className="p-1 rounded bg-blue-400 text-white">
                                        <ChildIcon className="h-3 w-3" />
                                      </div>
                                      <span className="text-sm">{child.name}</span>
                                      <span className="text-xs text-gray-500">
                                        {child.metadata.population ? formatNumber(child.metadata.population) : ''}
                                      </span>
                                      <Badge variant="secondary" className="text-xs ml-auto">
                                        {child.performance.totalLeads} leads
                                      </Badge>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="territories" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {locations
                  .filter(l => l.serviceInfo.serviceAreas.length > 0)
                  .map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-blue-500 text-white">
                            {React.createElement(getLocationTypeIcon(location.type), { className: "h-5 w-5" })}
                          </div>
                          <div>
                            <CardTitle className="text-base">{location.name}</CardTitle>
                            <CardDescription>{location.serviceInfo.serviceAreas.length} service areas</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Service Areas */}
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Service Areas</h4>
                            <div className="space-y-1">
                              {location.serviceInfo.serviceAreas.map((area) => (
                                <div key={area.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                  <div className="flex items-center space-x-2">
                                    <Route className="h-3 w-3 text-blue-500" />
                                    <span>{area.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <span>{area.radius}mi</span>
                                    <Badge 
                                      variant={area.priority === 'high' ? 'default' : 'secondary'} 
                                      className="text-xs"
                                    >
                                      {area.priority}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Managers */}
                          {location.serviceInfo.managers.length > 0 && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">Territory Managers</h4>
                              <div className="space-y-1">
                                {location.serviceInfo.managers.map((manager) => (
                                  <div key={manager.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                    <div className="flex items-center space-x-2">
                                      <Users className="h-3 w-3 text-emerald-500" />
                                      <span>{manager.name}</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs capitalize">
                                      {manager.role}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Areas
                            </Button>
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-2" />
                              Assign Manager
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Performance by Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Location Performance</CardTitle>
                  <CardDescription>Key performance metrics by geographical location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locations
                      .sort((a, b) => b.performance.totalRevenue - a.performance.totalRevenue)
                      .slice(0, 8)
                      .map((location) => {
                        const TypeIcon = getLocationTypeIcon(location.type);
                        return (
                          <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-blue-500 text-white">
                                <TypeIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{location.name}</p>
                                <p className="text-sm text-gray-500">
                                  {location.performance.totalLeads} leads • {location.performance.marketPenetration}% penetration
                                </p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-right text-sm">
                              <div>
                                <p className="font-semibold text-emerald-600">
                                  {formatCurrency(location.performance.totalRevenue)}
                                </p>
                                <p className="text-gray-500">Revenue</p>
                              </div>
                              <div>
                                <p className="font-semibold">{location.performance.conversionRate.toFixed(1)}%</p>
                                <p className="text-gray-500">Conversion</p>
                              </div>
                              <div>
                                <p className="font-semibold">{location.performance.growthPotential}%</p>
                                <p className="text-gray-500">Growth</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Penetration by Economic Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['high', 'medium', 'low'].map((level) => {
                        const locationsByLevel = locations.filter(l => l.metadata.economicLevel === level);
                        const avgPenetration = locationsByLevel.length > 0 
                          ? locationsByLevel.reduce((sum, l) => sum + l.performance.marketPenetration, 0) / locationsByLevel.length 
                          : 0;
                        const maxPenetration = Math.max(...['high', 'medium', 'low'].map(l => {
                          const locs = locations.filter(loc => loc.metadata.economicLevel === l);
                          return locs.length > 0 ? locs.reduce((sum, loc) => sum + loc.performance.marketPenetration, 0) / locs.length : 0;
                        }));
                        
                        return (
                          <div key={level} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{level} Income</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${maxPenetration > 0 ? (avgPenetration / maxPenetration) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {avgPenetration.toFixed(1)}%
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
                    <CardTitle>Competition Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['high', 'medium', 'low'].map((level) => {
                        const locationsByCompetition = locations.filter(l => l.performance.competitionLevel === level);
                        const avgRevenue = locationsByCompetition.length > 0 
                          ? locationsByCompetition.reduce((sum, l) => sum + l.performance.totalRevenue, 0) / locationsByCompetition.length 
                          : 0;
                        const maxRevenue = Math.max(...['high', 'medium', 'low'].map(l => {
                          const locs = locations.filter(loc => loc.performance.competitionLevel === l);
                          return locs.length > 0 ? locs.reduce((sum, loc) => sum + loc.performance.totalRevenue, 0) / locs.length : 0;
                        }));
                        
                        return (
                          <div key={level} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{level} Competition</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${maxRevenue > 0 ? (avgRevenue / maxRevenue) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {formatCurrency(avgRevenue)}
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

        {/* Add Location Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location Name</Label>
                  <Input placeholder="e.g., Miami" />
                </div>
                <div>
                  <Label>Location Code</Label>
                  <Input placeholder="e.g., MIA" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                      <SelectItem value="county">County</SelectItem>
                      <SelectItem value="district">District</SelectItem>
                      <SelectItem value="zone">Zone</SelectItem>
                      <SelectItem value="territory">Territory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                      <SelectItem value="4">Level 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Parent Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Latitude</Label>
                  <Input type="number" step="0.000001" placeholder="34.0522" />
                </div>
                <div>
                  <Label>Longitude</Label>
                  <Input type="number" step="0.000001" placeholder="-118.2437" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input placeholder="Miami" />
                </div>
                <div>
                  <Label>State</Label>
                  <Input placeholder="Florida" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Population</Label>
                  <Input type="number" placeholder="500000" />
                </div>
                <div>
                  <Label>Area (sq km)</Label>
                  <Input type="number" placeholder="150" />
                </div>
                <div>
                  <Label>Time Zone</Label>
                  <Input placeholder="EST" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Economic Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Urbanization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">Urban</SelectItem>
                      <SelectItem value="suburban">Suburban</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Serviceable</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>
                Create Location
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default LocationMasters;
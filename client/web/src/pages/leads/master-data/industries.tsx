import { useState, useMemo } from 'react';
import {
  Building2,
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
  Factory,
  Briefcase,
  Home,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Car,
  Plane,
  Utensils,
  Wrench,
  Palette,
  Globe,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Tag,
  TreePine,
  Layers
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
interface Industry {
  id: string;
  name: string;
  description: string;
  code: string;
  parentId?: string;
  level: number; // 1: Sector, 2: Industry Group, 3: Industry, 4: Sub-industry
  isActive: boolean;
  color: string;
  icon: string;
  metadata: {
    naicsCode?: string;
    sicCode?: string;
    keywords: string[];
    regulations?: string[];
    seasonality?: 'high' | 'medium' | 'low';
    marketSize?: string;
  };
  performance: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalRevenue: number;
    avgLeadValue: number;
    avgDealSize: number;
    conversionRate: number;
    salesCycle: number; // in days
    lifetimeValue: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
    growthRate: number;
  };
  children?: Industry[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface IndustryCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<any>;
  count: number;
}

// Mock data
const industryCategories: IndustryCategory[] = [
  {
    id: 'construction',
    name: 'Construction & Real Estate',
    description: 'Building, construction, real estate, and property development',
    color: 'bg-amber-500',
    icon: Building2,
    count: 15
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Industrial manufacturing, production, and processing',
    color: 'bg-blue-500',
    icon: Factory,
    count: 12
  },
  {
    id: 'services',
    name: 'Professional Services',
    description: 'Business services, consulting, and professional firms',
    color: 'bg-purple-500',
    icon: Briefcase,
    count: 18
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description: 'Retail stores, online commerce, and consumer goods',
    color: 'bg-emerald-500',
    icon: ShoppingBag,
    count: 10
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical services, healthcare facilities, and wellness',
    color: 'bg-red-500',
    icon: Stethoscope,
    count: 8
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, IT services, and technology companies',
    color: 'bg-indigo-500',
    icon: Zap,
    count: 14
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Educational institutions, training, and learning services',
    color: 'bg-rose-500',
    icon: GraduationCap,
    count: 6
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    description: 'Hotels, restaurants, travel, and entertainment',
    color: 'bg-orange-500',
    icon: Utensils,
    count: 9
  }
];

const mockIndustries: Industry[] = [
  {
    id: 'IND001',
    name: 'Residential Construction',
    description: 'Single-family and multi-family residential building construction',
    code: 'RES-CONST',
    parentId: undefined,
    level: 1,
    isActive: true,
    color: '#F59E0B',
    icon: 'home',
    metadata: {
      naicsCode: '236',
      sicCode: '1521',
      keywords: ['residential', 'construction', 'building', 'homes'],
      regulations: ['Building Codes', 'Safety Standards', 'Environmental'],
      seasonality: 'high',
      marketSize: '$1.8T'
    },
    performance: {
      totalLeads: 345,
      qualifiedLeads: 198,
      convertedLeads: 89,
      totalRevenue: 4250000,
      avgLeadValue: 12319,
      avgDealSize: 47752,
      conversionRate: 25.8,
      salesCycle: 45,
      lifetimeValue: 125000,
      trend: 'up',
      trendPercentage: 15.2,
      growthRate: 12.5
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'Admin'
  },
  {
    id: 'IND002',
    name: 'Commercial Construction',
    description: 'Office buildings, retail spaces, and commercial facilities',
    code: 'COM-CONST',
    parentId: undefined,
    level: 1,
    isActive: true,
    color: '#3B82F6',
    icon: 'building-2',
    metadata: {
      naicsCode: '237',
      sicCode: '1522',
      keywords: ['commercial', 'office', 'retail', 'construction'],
      regulations: ['ADA Compliance', 'Fire Safety', 'Zoning'],
      seasonality: 'medium',
      marketSize: '$2.1T'
    },
    performance: {
      totalLeads: 287,
      qualifiedLeads: 189,
      convertedLeads: 67,
      totalRevenue: 8950000,
      avgLeadValue: 31184,
      avgDealSize: 133582,
      conversionRate: 23.3,
      salesCycle: 75,
      lifetimeValue: 485000,
      trend: 'up',
      trendPercentage: 8.7,
      growthRate: 18.3
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'Admin'
  },
  {
    id: 'IND003',
    name: 'Infrastructure & Heavy Construction',
    description: 'Roads, bridges, utilities, and heavy civil construction',
    code: 'INFRA-CONST',
    parentId: undefined,
    level: 1,
    isActive: true,
    color: '#EF4444',
    icon: 'wrench',
    metadata: {
      naicsCode: '237',
      sicCode: '1611',
      keywords: ['infrastructure', 'roads', 'bridges', 'utilities'],
      regulations: ['DOT Standards', 'Environmental Impact', 'Safety'],
      seasonality: 'low',
      marketSize: '$875B'
    },
    performance: {
      totalLeads: 156,
      qualifiedLeads: 98,
      convertedLeads: 34,
      totalRevenue: 12500000,
      avgLeadValue: 80128,
      avgDealSize: 367647,
      conversionRate: 21.8,
      salesCycle: 120,
      lifetimeValue: 1250000,
      trend: 'stable',
      trendPercentage: 2.1,
      growthRate: 5.8
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'Admin'
  },
  {
    id: 'IND004',
    name: 'Renovation & Remodeling',
    description: 'Home improvement, renovation, and remodeling services',
    code: 'RENO-REMOD',
    parentId: 'IND001',
    level: 2,
    isActive: true,
    color: '#10B981',
    icon: 'palette',
    metadata: {
      naicsCode: '238',
      sicCode: '1799',
      keywords: ['renovation', 'remodeling', 'improvement', 'upgrade'],
      regulations: ['Building Permits', 'Safety Codes'],
      seasonality: 'high',
      marketSize: '$425B'
    },
    performance: {
      totalLeads: 567,
      qualifiedLeads: 398,
      convertedLeads: 189,
      totalRevenue: 2850000,
      avgLeadValue: 5026,
      avgDealSize: 15079,
      conversionRate: 33.3,
      salesCycle: 21,
      lifetimeValue: 45000,
      trend: 'up',
      trendPercentage: 22.5,
      growthRate: 28.9
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 17),
    createdBy: 'Admin'
  },
  {
    id: 'IND005',
    name: 'Software Development',
    description: 'Custom software development and application services',
    code: 'SOFT-DEV',
    parentId: undefined,
    level: 1,
    isActive: true,
    color: '#8B5CF6',
    icon: 'zap',
    metadata: {
      naicsCode: '541511',
      sicCode: '7371',
      keywords: ['software', 'development', 'programming', 'applications'],
      regulations: ['Data Privacy', 'Security Standards'],
      seasonality: 'low',
      marketSize: '$650B'
    },
    performance: {
      totalLeads: 234,
      qualifiedLeads: 167,
      convertedLeads: 78,
      totalRevenue: 3450000,
      avgLeadValue: 14744,
      avgDealSize: 44231,
      conversionRate: 33.3,
      salesCycle: 60,
      lifetimeValue: 185000,
      trend: 'up',
      trendPercentage: 35.8,
      growthRate: 42.1
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 16),
    createdBy: 'Admin'
  },
  {
    id: 'IND006',
    name: 'Healthcare Services',
    description: 'Medical practices, clinics, and healthcare facilities',
    code: 'HEALTH-SERV',
    parentId: undefined,
    level: 1,
    isActive: true,
    color: '#F97316',
    icon: 'stethoscope',
    metadata: {
      naicsCode: '621',
      sicCode: '8011',
      keywords: ['healthcare', 'medical', 'clinic', 'practice'],
      regulations: ['HIPAA', 'Medical Licensing', 'Safety Standards'],
      seasonality: 'low',
      marketSize: '$4.3T'
    },
    performance: {
      totalLeads: 189,
      qualifiedLeads: 156,
      convertedLeads: 89,
      totalRevenue: 1890000,
      avgLeadValue: 10000,
      avgDealSize: 21236,
      conversionRate: 47.1,
      salesCycle: 30,
      lifetimeValue: 85000,
      trend: 'up',
      trendPercentage: 18.3,
      growthRate: 25.7
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 15),
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

function getIndustryIcon(icon: string) {
  switch (icon) {
    case 'home': return Home;
    case 'building-2': return Building2;
    case 'wrench': return Wrench;
    case 'palette': return Palette;
    case 'zap': return Zap;
    case 'stethoscope': return Stethoscope;
    case 'factory': return Factory;
    case 'briefcase': return Briefcase;
    case 'shopping-bag': return ShoppingBag;
    case 'graduation-cap': return GraduationCap;
    case 'utensils': return Utensils;
    case 'car': return Car;
    case 'plane': return Plane;
    default: return Building2;
  }
}

function getSeasonalityColor(seasonality: 'high' | 'medium' | 'low') {
  switch (seasonality) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    case 'low': return 'text-emerald-600 bg-emerald-50';
  }
}

function IndustryCard({ industry, onEdit, onView, onToggle, onDelete }: {
  industry: Industry;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const Icon = getIndustryIcon(industry.icon);
  const TrendIcon = getTrendIcon(industry.performance.trend);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div 
              className="p-2 rounded-lg text-white"
              style={{ backgroundColor: industry.color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{industry.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {industry.code}
                </Badge>
                {industry.level > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    L{industry.level}
                  </Badge>
                )}
                {!industry.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{industry.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {industry.metadata.seasonality && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span className={cn("px-1 rounded text-xs", getSeasonalityColor(industry.metadata.seasonality))}>
                      {industry.metadata.seasonality} season
                    </span>
                  </div>
                )}
                {industry.metadata.marketSize && (
                  <div className="flex items-center space-x-1">
                    <PieChart className="h-3 w-3" />
                    <span>{industry.metadata.marketSize} market</span>
                  </div>
                )}
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
                Edit Industry
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {industry.isActive ? (
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
            <p className="text-lg font-bold">{industry.performance.totalLeads}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-green-600">{industry.performance.conversionRate}%</p>
            <p className="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Revenue:</span>
            <span className="font-medium">{formatCurrency(industry.performance.totalRevenue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Deal Size:</span>
            <span className="font-medium">{formatCurrency(industry.performance.avgDealSize)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sales Cycle:</span>
            <span className="font-medium">{industry.performance.salesCycle} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">LTV:</span>
            <span className="font-medium">{formatCurrency(industry.performance.lifetimeValue)}</span>
          </div>
        </div>
        
        {/* Growth Indicator */}
        <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(industry.performance.trend))}>
          <TrendIcon className="h-4 w-4" />
          <span>
            {industry.performance.trend === 'up' ? '+' : industry.performance.trend === 'down' ? '-' : ''}
            {Math.abs(industry.performance.growthRate)}% growth rate
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category, industries }: {
  category: IndustryCategory;
  industries: Industry[];
}) {
  const categoryStats = useMemo(() => {
    const totalLeads = industries.reduce((sum, i) => sum + i.performance.totalLeads, 0);
    const totalRevenue = industries.reduce((sum, i) => sum + i.performance.totalRevenue, 0);
    const avgConversion = industries.length > 0 
      ? industries.reduce((sum, i) => sum + i.performance.conversionRate, 0) / industries.length 
      : 0;
    const avgGrowth = industries.length > 0 
      ? industries.reduce((sum, i) => sum + i.performance.growthRate, 0) / industries.length 
      : 0;
    
    return { totalLeads, totalRevenue, avgConversion, avgGrowth };
  }, [industries]);

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
            <p className="text-lg font-bold">{industries.length}</p>
            <p className="text-xs text-gray-500">Industries</p>
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
            <span>Avg Growth:</span>
            <span className={cn("font-medium", 
              categoryStats.avgGrowth > 15 ? "text-emerald-600" : 
              categoryStats.avgGrowth > 5 ? "text-amber-600" : "text-red-600"
            )}>
              {categoryStats.avgGrowth.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Industries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTab, setSelectedTab] = useState('industries');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [industries, setIndustries] = useState(mockIndustries);

  const filteredIndustries = useMemo(() => {
    return industries.filter(industry => {
      const matchesSearch = !searchQuery || 
        industry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLevel = selectedLevel === 'all' || industry.level === parseInt(selectedLevel);
      
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel, industries]);

  const overallStats = useMemo(() => {
    const totalIndustries = industries.length;
    const activeIndustries = industries.filter(i => i.isActive).length;
    const totalLeads = industries.reduce((sum, i) => sum + i.performance.totalLeads, 0);
    const totalRevenue = industries.reduce((sum, i) => sum + i.performance.totalRevenue, 0);
    const avgConversion = industries.length > 0 
      ? industries.reduce((sum, i) => sum + i.performance.conversionRate, 0) / industries.length 
      : 0;
    const avgGrowth = industries.length > 0 
      ? industries.reduce((sum, i) => sum + i.performance.growthRate, 0) / industries.length 
      : 0;
    
    return { totalIndustries, activeIndustries, totalLeads, totalRevenue, avgConversion, avgGrowth };
  }, [industries]);

  const handleToggleIndustry = (industryId: string) => {
    setIndustries(prev => prev.map(i => 
      i.id === industryId ? { ...i, isActive: !i.isActive } : i
    ));
  };

  const handleDeleteIndustry = (industryId: string) => {
    setIndustries(prev => prev.filter(i => i.id !== industryId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Industries</h1>
              <Badge variant="secondary">{filteredIndustries.length} industries</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search industries..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
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
                Add Industry
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="industries">All Industries</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="industries" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Industries</p>
                        <p className="text-2xl font-bold">{overallStats.totalIndustries}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeIndustries} active</p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Leads</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalLeads)}</p>
                        <p className="text-xs text-gray-500">All industries</p>
                      </div>
                      <Users className="h-8 w-8 text-emerald-500" />
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
                        <p className="text-sm text-gray-500">Avg Growth</p>
                        <p className={cn("text-2xl font-bold", 
                          overallStats.avgGrowth > 15 ? "text-emerald-600" : 
                          overallStats.avgGrowth > 5 ? "text-amber-600" : "text-red-600"
                        )}>
                          {overallStats.avgGrowth.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Growth rate</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Industries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIndustries.map((industry) => (
                  <IndustryCard
                    key={industry.id}
                    industry={industry}
                    onEdit={() => {}}
                    onView={() => {}}
                    onToggle={() => handleToggleIndustry(industry.id)}
                    onDelete={() => handleDeleteIndustry(industry.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industryCategories.map((category) => {
                  const categoryIndustries = industries.filter(i => {
                    // Simple categorization based on keywords
                    const keywords = i.metadata.keywords.join(' ').toLowerCase();
                    switch (category.id) {
                      case 'construction':
                        return keywords.includes('construction') || keywords.includes('building') || keywords.includes('renovation');
                      case 'technology':
                        return keywords.includes('software') || keywords.includes('tech') || keywords.includes('development');
                      case 'healthcare':
                        return keywords.includes('healthcare') || keywords.includes('medical') || keywords.includes('clinic');
                      default:
                        return false;
                    }
                  });
                  
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      industries={categoryIndustries}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="hierarchy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TreePine className="h-5 w-5" />
                    <span>Industry Hierarchy</span>
                  </CardTitle>
                  <CardDescription>Hierarchical view of industry classification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {industries
                      .filter(i => i.level === 1)
                      .map((industry) => {
                        const children = industries.filter(i => i.parentId === industry.id);
                        const Icon = getIndustryIcon(industry.icon);
                        
                        return (
                          <div key={industry.id} className="border rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div 
                                className="p-2 rounded-lg text-white"
                                style={{ backgroundColor: industry.color }}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{industry.name}</h3>
                                <p className="text-sm text-gray-600">{industry.description}</p>
                              </div>
                              <div className="ml-auto">
                                <Badge variant="outline">{industry.performance.totalLeads} leads</Badge>
                              </div>
                            </div>
                            
                            {children.length > 0 && (
                              <div className="ml-6 space-y-2">
                                {children.map((child) => {
                                  const ChildIcon = getIndustryIcon(child.icon);
                                  return (
                                    <div key={child.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                      <div 
                                        className="p-1 rounded text-white"
                                        style={{ backgroundColor: child.color }}
                                      >
                                        <ChildIcon className="h-3 w-3" />
                                      </div>
                                      <span className="text-sm">{child.name}</span>
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

            <TabsContent value="analytics" className="space-y-6">
              {/* Top Performing Industries */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Industries</CardTitle>
                  <CardDescription>Industries with highest revenue and growth rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...industries]
                      .sort((a, b) => b.performance.totalRevenue - a.performance.totalRevenue)
                      .slice(0, 5)
                      .map((industry, index) => {
                        const Icon = getIndustryIcon(industry.icon);
                        return (
                          <div key={industry.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium">
                                {index + 1}
                              </div>
                              <div 
                                className="p-2 rounded-lg text-white"
                                style={{ backgroundColor: industry.color }}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{industry.name}</p>
                                <p className="text-sm text-gray-500">
                                  {industry.performance.totalLeads} leads • {industry.performance.salesCycle} days cycle
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold text-emerald-600">
                                {formatCurrency(industry.performance.totalRevenue)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {industry.performance.growthRate.toFixed(1)}% growth
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Industry Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Rates by Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {industries
                        .sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
                        .slice(0, 6)
                        .map((industry) => (
                          <div key={industry.id} className="flex items-center justify-between">
                            <span className="text-sm">{industry.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${Math.min(industry.performance.conversionRate, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {industry.performance.conversionRate}%
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sales Cycle Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {industries
                        .sort((a, b) => a.performance.salesCycle - b.performance.salesCycle)
                        .slice(0, 6)
                        .map((industry) => (
                          <div key={industry.id} className="flex items-center justify-between">
                            <span className="text-sm">{industry.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${Math.min((industry.performance.salesCycle / 120) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {industry.performance.salesCycle}d
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Industry Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Industry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Industry Name</Label>
                  <Input placeholder="e.g., Residential Construction" />
                </div>
                <div>
                  <Label>Industry Code</Label>
                  <Input placeholder="e.g., RES-CONST" />
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe this industry..." />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1 - Sector</SelectItem>
                      <SelectItem value="2">Level 2 - Industry Group</SelectItem>
                      <SelectItem value="3">Level 3 - Industry</SelectItem>
                      <SelectItem value="4">Level 4 - Sub-industry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>NAICS Code</Label>
                  <Input placeholder="e.g., 236" />
                </div>
                <div>
                  <Label>SIC Code</Label>
                  <Input placeholder="e.g., 1521" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Seasonality</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select seasonality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Market Size</Label>
                  <Input placeholder="e.g., $1.8T" />
                </div>
              </div>
              
              <div>
                <Label>Keywords (comma-separated)</Label>
                <Input placeholder="construction, building, residential, homes" />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>
                  Create Industry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
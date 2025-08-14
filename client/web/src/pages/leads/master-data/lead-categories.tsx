import { useState, useMemo } from 'react';
import {
  Folder,
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
  Tag,
  FolderPlus,
  FolderOpen,
  Grid,
  List,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  Target,
  Activity,
  DollarSign,
  Calendar,
  Clock,
  Building2,
  Home,
  Factory,
  Store,
  Truck,
  Palette,
  Copy,
  Archive,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Link2,
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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Types
interface LeadCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  icon: string;
  parentId: string | null;
  level: number;
  order: number;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean;
  children?: LeadCategory[];
  metadata: {
    keywords: string[];
    tags: string[];
    customFields: {
      [key: string]: any;
    };
  };
  settings: {
    autoAssignRules: {
      enabled: boolean;
      criteria: string[];
      assignTo: string;
    };
    scoringRules: {
      baseScore: number;
      multiplier: number;
    };
    notifications: {
      onAssignment: boolean;
      recipients: string[];
    };
  };
  performance: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    avgLeadValue: number;
    conversionRate: number;
    avgSalesCycle: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface CategoryHierarchy {
  category: LeadCategory;
  children: CategoryHierarchy[];
  path: string[];
}

// Mock data
const mockLeadCategories: LeadCategory[] = [
  {
    id: 'CAT001',
    name: 'Residential Projects',
    description: 'Home construction, renovation, and improvement projects',
    slug: 'residential-projects',
    color: '#3B82F6',
    icon: 'home',
    parentId: null,
    level: 0,
    order: 1,
    isActive: true,
    isDefault: true,
    isSystem: false,
    metadata: {
      keywords: ['home', 'residential', 'house', 'renovation', 'remodel'],
      tags: ['high-volume', 'seasonal'],
      customFields: {
        avgProjectSize: 'medium',
        seasonality: 'spring-summer'
      }
    },
    settings: {
      autoAssignRules: {
        enabled: true,
        criteria: ['location', 'project-size'],
        assignTo: 'residential-team'
      },
      scoringRules: {
        baseScore: 50,
        multiplier: 1.2
      },
      notifications: {
        onAssignment: true,
        recipients: ['residential-manager', 'assigned-rep']
      }
    },
    performance: {
      totalLeads: 234,
      qualifiedLeads: 145,
      convertedLeads: 67,
      avgLeadValue: 75000,
      conversionRate: 28.6,
      avgSalesCycle: 45,
      trend: 'up',
      trendPercentage: 12.5
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'Admin'
  },
  {
    id: 'CAT002',
    name: 'Kitchen Remodeling',
    description: 'Kitchen renovation and remodeling projects',
    slug: 'kitchen-remodeling',
    color: '#10B981',
    icon: 'home',
    parentId: 'CAT001',
    level: 1,
    order: 1,
    isActive: true,
    isDefault: false,
    isSystem: false,
    metadata: {
      keywords: ['kitchen', 'remodel', 'renovation', 'cabinets', 'countertops'],
      tags: ['high-value', 'quick-close'],
      customFields: {
        avgBudget: '50000-100000',
        timeline: '6-8 weeks'
      }
    },
    settings: {
      autoAssignRules: {
        enabled: true,
        criteria: ['budget-range', 'timeline'],
        assignTo: 'kitchen-specialist'
      },
      scoringRules: {
        baseScore: 70,
        multiplier: 1.5
      },
      notifications: {
        onAssignment: true,
        recipients: ['kitchen-team', 'design-team']
      }
    },
    performance: {
      totalLeads: 89,
      qualifiedLeads: 67,
      convertedLeads: 34,
      avgLeadValue: 87500,
      conversionRate: 38.2,
      avgSalesCycle: 32,
      trend: 'up',
      trendPercentage: 15.3
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'Sales Manager'
  },
  {
    id: 'CAT003',
    name: 'Bathroom Renovation',
    description: 'Bathroom remodeling and renovation projects',
    slug: 'bathroom-renovation',
    color: '#8B5CF6',
    icon: 'home',
    parentId: 'CAT001',
    level: 1,
    order: 2,
    isActive: true,
    isDefault: false,
    isSystem: false,
    metadata: {
      keywords: ['bathroom', 'renovation', 'remodel', 'tile', 'plumbing'],
      tags: ['medium-value', 'quick-turnaround'],
      customFields: {
        avgBudget: '25000-75000',
        timeline: '3-5 weeks'
      }
    },
    settings: {
      autoAssignRules: {
        enabled: true,
        criteria: ['project-complexity'],
        assignTo: 'bathroom-specialist'
      },
      scoringRules: {
        baseScore: 60,
        multiplier: 1.3
      },
      notifications: {
        onAssignment: true,
        recipients: ['bathroom-team']
      }
    },
    performance: {
      totalLeads: 67,
      qualifiedLeads: 45,
      convertedLeads: 23,
      avgLeadValue: 52000,
      conversionRate: 34.3,
      avgSalesCycle: 28,
      trend: 'stable',
      trendPercentage: 2.1
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'Sales Manager'
  },
  {
    id: 'CAT004',
    name: 'Commercial Projects',
    description: 'Commercial construction and renovation projects',
    slug: 'commercial-projects',
    color: '#F59E0B',
    icon: 'building-2',
    parentId: null,
    level: 0,
    order: 2,
    isActive: true,
    isDefault: false,
    isSystem: false,
    metadata: {
      keywords: ['commercial', 'office', 'retail', 'warehouse', 'business'],
      tags: ['high-value', 'long-cycle', 'complex'],
      customFields: {
        avgProjectSize: 'large',
        decisionProcess: 'committee'
      }
    },
    settings: {
      autoAssignRules: {
        enabled: true,
        criteria: ['project-value', 'complexity'],
        assignTo: 'commercial-team'
      },
      scoringRules: {
        baseScore: 80,
        multiplier: 2.0
      },
      notifications: {
        onAssignment: true,
        recipients: ['commercial-manager', 'senior-rep']
      }
    },
    performance: {
      totalLeads: 156,
      qualifiedLeads: 98,
      convertedLeads: 34,
      avgLeadValue: 275000,
      conversionRate: 21.8,
      avgSalesCycle: 120,
      trend: 'up',
      trendPercentage: 8.7
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 17),
    createdBy: 'Admin'
  },
  {
    id: 'CAT005',
    name: 'Office Buildings',
    description: 'Office construction and tenant improvements',
    slug: 'office-buildings',
    color: '#EF4444',
    icon: 'building-2',
    parentId: 'CAT004',
    level: 1,
    order: 1,
    isActive: true,
    isDefault: false,
    isSystem: false,
    metadata: {
      keywords: ['office', 'corporate', 'tenant-improvement', 'workspace'],
      tags: ['enterprise', 'long-term'],
      customFields: {
        avgSquareFootage: '10000-50000',
        timeline: '6-18 months'
      }
    },
    settings: {
      autoAssignRules: {
        enabled: true,
        criteria: ['square-footage', 'budget'],
        assignTo: 'office-specialist'
      },
      scoringRules: {
        baseScore: 85,
        multiplier: 2.2
      },
      notifications: {
        onAssignment: true,
        recipients: ['commercial-team', 'project-manager']
      }
    },
    performance: {
      totalLeads: 45,
      qualifiedLeads: 32,
      convertedLeads: 12,
      avgLeadValue: 425000,
      conversionRate: 26.7,
      avgSalesCycle: 145,
      trend: 'up',
      trendPercentage: 11.2
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 16),
    createdBy: 'Commercial Manager'
  },
  {
    id: 'CAT006',
    name: 'Industrial Projects',
    description: 'Manufacturing facilities, warehouses, and industrial construction',
    slug: 'industrial-projects',
    color: '#6B7280',
    icon: 'factory',
    parentId: null,
    level: 0,
    order: 3,
    isActive: true,
    isDefault: false,
    isSystem: false,
    metadata: {
      keywords: ['industrial', 'manufacturing', 'warehouse', 'facility'],
      tags: ['mega-projects', 'specialized'],
      customFields: {
        projectType: 'heavy-industrial',
        compliance: 'high'
      }
    },
    settings: {
      autoAssignRules: {
        enabled: true,
        criteria: ['project-complexity', 'compliance-requirements'],
        assignTo: 'industrial-team'
      },
      scoringRules: {
        baseScore: 90,
        multiplier: 3.0
      },
      notifications: {
        onAssignment: true,
        recipients: ['industrial-manager', 'compliance-team']
      }
    },
    performance: {
      totalLeads: 23,
      qualifiedLeads: 18,
      convertedLeads: 8,
      avgLeadValue: 850000,
      conversionRate: 34.8,
      avgSalesCycle: 180,
      trend: 'stable',
      trendPercentage: -1.5
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 15),
    createdBy: 'Admin'
  }
];

// Helper functions
function getCategoryIcon(iconName: string) {
  const icons = {
    'home': Home,
    'building-2': Building2,
    'factory': Factory,
    'store': Store,
    'truck': Truck,
    'folder': Folder,
    'tag': Tag
  };
  return icons[iconName as keyof typeof icons] || Folder;
}

function buildCategoryHierarchy(categories: LeadCategory[]): CategoryHierarchy[] {
  const categoryMap = new Map<string, LeadCategory>();
  categories.forEach(cat => categoryMap.set(cat.id, cat));

  const buildTree = (parentId: string | null, path: string[] = []): CategoryHierarchy[] => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .sort((a, b) => a.order - b.order)
      .map(category => ({
        category,
        path: [...path, category.name],
        children: buildTree(category.id, [...path, category.name])
      }));
  };

  return buildTree(null);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
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

function CategoryCard({ category, hierarchy, onEdit, onView, onToggle, onDelete }: {
  category: LeadCategory;
  hierarchy: CategoryHierarchy;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const CategoryIcon = getCategoryIcon(category.icon);
  const TrendIcon = getTrendIcon(category.performance.trend);
  const hasChildren = hierarchy.children.length > 0;

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div 
              className="p-2 rounded-lg text-white flex items-center justify-center relative"
              style={{ backgroundColor: category.color }}
            >
              <CategoryIcon className="h-5 w-5" />
              {hasChildren && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <FolderPlus className="h-2 w-2 text-gray-600" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{category.name}</h3>
                {category.isDefault && (
                  <Badge variant="outline" className="text-xs">
                    Default
                  </Badge>
                )}
                {category.isSystem && (
                  <Tooltip content="System Category">
                    <Badge variant="outline" className="text-xs">
                      System
                    </Badge>
                  </Tooltip>
                )}
                {!category.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{category.description}</p>
              
              {/* Breadcrumb */}
              {hierarchy.path.length > 1 && (
                <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                  {hierarchy.path.slice(0, -1).map((pathName, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <span>{pathName}</span>
                      <span>/</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Level {category.level}
                </Badge>
                {hasChildren && (
                  <Badge variant="outline" className="text-xs">
                    {hierarchy.children.length} sub-categories
                  </Badge>
                )}
                {category.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
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
                Edit Category
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {category.isActive ? (
                  <>
                    <Archive className="h-4 w-4 mr-2" />
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
                <Plus className="h-4 w-4 mr-2" />
                Add Sub-category
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!category.isSystem && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold">{category.performance.totalLeads}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-green-600">{category.performance.conversionRate}%</p>
            <p className="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Lead Value:</span>
            <span className="font-medium">{formatCurrency(category.performance.avgLeadValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sales Cycle:</span>
            <span className="font-medium">{category.performance.avgSalesCycle} days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Qualified Rate:</span>
            <span className="font-medium">
              {((category.performance.qualifiedLeads / category.performance.totalLeads) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(category.performance.trend))}>
          <TrendIcon className="h-4 w-4" />
          <span>
            {category.performance.trend === 'up' ? '+' : category.performance.trend === 'down' ? '-' : '±'}
            {Math.abs(category.performance.trendPercentage)}% this month
          </span>
        </div>

        {/* Auto-assignment Indicator */}
        {category.settings.autoAssignRules.enabled && (
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Zap className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-gray-600">Auto-assignment enabled</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CategoryTreeView({ hierarchies, level = 0, onEdit, onView, onToggle, onDelete }: {
  hierarchies: CategoryHierarchy[];
  level?: number;
  onEdit: (category: LeadCategory) => void;
  onView: (category: LeadCategory) => void;
  onToggle: (category: LeadCategory) => void;
  onDelete: (category: LeadCategory) => void;
}) {
  return (
    <div className={cn("space-y-2", level > 0 && "ml-6 pl-4 border-l-2 border-gray-200")}>
      {hierarchies.map((hierarchy) => (
        <div key={hierarchy.category.id}>
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
            <div 
              className="p-2 rounded text-white flex items-center justify-center"
              style={{ backgroundColor: hierarchy.category.color }}
            >
              {React.createElement(getCategoryIcon(hierarchy.category.icon), { className: "h-4 w-4" })}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{hierarchy.category.name}</h4>
                {hierarchy.category.isDefault && (
                  <Badge variant="outline" className="text-xs">Default</Badge>
                )}
                {!hierarchy.category.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200 text-xs">
                    Inactive
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{hierarchy.category.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                <span>{hierarchy.category.performance.totalLeads} leads</span>
                <span>{hierarchy.category.performance.conversionRate}% conversion</span>
                <span>{formatCurrency(hierarchy.category.performance.avgLeadValue)} avg value</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => onView(hierarchy.category)}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(hierarchy.category)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onToggle(hierarchy.category)}>
                {hierarchy.category.isActive ? (
                  <Archive className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {hierarchy.children.length > 0 && (
            <CategoryTreeView
              hierarchies={hierarchy.children}
              level={level + 1}
              onEdit={onEdit}
              onView={onView}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function LeadCategories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');
  const [selectedTab, setSelectedTab] = useState('categories');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [categories, setCategories] = useState(mockLeadCategories);

  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const matchesSearch = !searchQuery || 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.metadata.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesLevel = selectedLevel === 'all' || category.level.toString() === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel, categories]);

  const categoryHierarchy = useMemo(() => {
    return buildCategoryHierarchy(filteredCategories);
  }, [filteredCategories]);

  const categoryStats = useMemo(() => {
    const totalCategories = categories.length;
    const activeCategories = categories.filter(c => c.isActive).length;
    const totalLeads = categories.reduce((sum, c) => sum + c.performance.totalLeads, 0);
    const totalRevenue = categories.reduce((sum, c) => 
      sum + (c.performance.convertedLeads * c.performance.avgLeadValue), 0
    );
    const avgConversion = categories.length > 0 
      ? categories.reduce((sum, c) => sum + c.performance.conversionRate, 0) / categories.length 
      : 0;
    const avgSalesCycle = categories.length > 0 
      ? categories.reduce((sum, c) => sum + c.performance.avgSalesCycle, 0) / categories.length 
      : 0;
    
    return { totalCategories, activeCategories, totalLeads, totalRevenue, avgConversion, avgSalesCycle };
  }, [categories]);

  const handleToggleCategory = (category: LeadCategory) => {
    setCategories(prev => prev.map(c => 
      c.id === category.id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const handleDeleteCategory = (category: LeadCategory) => {
    if (!category.isSystem) {
      setCategories(prev => prev.filter(c => c.id !== category.id));
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Lead Categories</h1>
              <Badge variant="secondary">{filteredCategories.length} categories</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search categories..."
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
                  <SelectItem value="0">Level 0</SelectItem>
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="2">Level 2</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'tree' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tree')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="hierarchy">Hierarchy</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Categories</p>
                        <p className="text-2xl font-bold">{categoryStats.totalCategories}</p>
                        <p className="text-xs text-gray-500">{categoryStats.activeCategories} active</p>
                      </div>
                      <Folder className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Leads</p>
                        <p className="text-2xl font-bold">{categoryStats.totalLeads}</p>
                        <p className="text-xs text-gray-500">All categories</p>
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
                        <p className="text-2xl font-bold">{formatCurrency(categoryStats.totalRevenue)}</p>
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
                        <p className="text-sm text-gray-500">Avg Conversion</p>
                        <p className="text-2xl font-bold">{categoryStats.avgConversion.toFixed(1)}%</p>
                        <p className="text-xs text-gray-500">All categories</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Sales Cycle</p>
                        <p className="text-2xl font-bold">{Math.round(categoryStats.avgSalesCycle)}</p>
                        <p className="text-xs text-gray-500">Days</p>
                      </div>
                      <Clock className="h-8 w-8 text-rose-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Automation</p>
                        <p className="text-2xl font-bold text-green-600">Active</p>
                        <p className="text-xs text-gray-500">Auto-assignment</p>
                      </div>
                      <Zap className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Categories Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryHierarchy.map((hierarchy) => (
                    <CategoryCard
                      key={hierarchy.category.id}
                      category={hierarchy.category}
                      hierarchy={hierarchy}
                      onEdit={() => {}}
                      onView={() => {}}
                      onToggle={() => handleToggleCategory(hierarchy.category)}
                      onDelete={() => handleDeleteCategory(hierarchy.category)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Category Tree</CardTitle>
                    <CardDescription>Hierarchical view of all categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CategoryTreeView
                      hierarchies={categoryHierarchy}
                      onEdit={() => {}}
                      onView={() => {}}
                      onToggle={handleToggleCategory}
                      onDelete={handleDeleteCategory}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="hierarchy" className="space-y-6">
              {/* Category Hierarchy Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Hierarchy</CardTitle>
                  <CardDescription>Manage parent-child relationships between categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryTreeView
                    hierarchies={categoryHierarchy}
                    onEdit={() => {}}
                    onView={() => {}}
                    onToggle={handleToggleCategory}
                    onDelete={handleDeleteCategory}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Performance Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Analyze performance metrics across all categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredCategories
                      .sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
                      .map((category) => {
                        const CategoryIcon = getCategoryIcon(category.icon);
                        const TrendIcon = getTrendIcon(category.performance.trend);
                        
                        return (
                          <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div 
                                className="p-2 rounded text-white"
                                style={{ backgroundColor: category.color }}
                              >
                                <CategoryIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{category.name}</h4>
                                <p className="text-sm text-gray-500">{category.performance.totalLeads} leads</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                              <div className="text-center">
                                <p className="text-sm font-medium">{category.performance.conversionRate}%</p>
                                <p className="text-xs text-gray-500">Conversion</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium">{formatCurrency(category.performance.avgLeadValue)}</p>
                                <p className="text-xs text-gray-500">Avg Value</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium">{category.performance.avgSalesCycle}d</p>
                                <p className="text-xs text-gray-500">Sales Cycle</p>
                              </div>
                              <div className={cn("text-center", getTrendColor(category.performance.trend))}>
                                <div className="flex items-center space-x-1">
                                  <TrendIcon className="h-4 w-4" />
                                  <span className="text-sm font-medium">{Math.abs(category.performance.trendPercentage)}%</span>
                                </div>
                                <p className="text-xs">Trend</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Category Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category Name</Label>
                  <Input placeholder="e.g., Healthcare Projects" />
                </div>
                <div>
                  <Label>Parent Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None (Top Level)</SelectItem>
                      {categories.filter(c => c.level === 0).map((category) => (
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
                <Textarea placeholder="Describe this category and what types of leads belong here..." />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Color</Label>
                  <Input type="color" defaultValue="#3B82F6" />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="building-2">Building</SelectItem>
                      <SelectItem value="factory">Factory</SelectItem>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Order</Label>
                  <Input type="number" placeholder="1" min="1" />
                </div>
              </div>
              
              <div>
                <Label>Keywords (comma-separated)</Label>
                <Input placeholder="healthcare, medical, hospital, clinic" />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Enable Auto-assignment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Send Notifications</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>
                  Create Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
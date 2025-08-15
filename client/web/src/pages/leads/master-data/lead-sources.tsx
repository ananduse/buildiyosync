import { useState, useMemo } from 'react';
import {
  Globe,
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
  Mail,
  MessageSquare,
  Phone,
  Share2,
  ExternalLink,
  Tag,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  Palette,
  Link2,
  FileText
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
interface LeadSource {
  id: string;
  name: string;
  description: string;
  category: 'digital' | 'traditional' | 'referral' | 'event' | 'direct' | 'partnership';
  type: 'website' | 'social-media' | 'email-campaign' | 'google-ads' | 'facebook-ads' | 'referral' | 'cold-call' | 'event' | 'direct-mail' | 'partnership' | 'trade-show' | 'webinar' | 'other';
  url?: string;
  cost: number;
  isActive: boolean;
  trackingEnabled: boolean;
  color: string;
  icon: string;
  metadata: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    trackingPixel?: string;
    conversionGoal?: string;
  };
  performance: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalRevenue: number;
    avgLeadValue: number;
    conversionRate: number;
    costPerLead: number;
    roi: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface SourceCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<any>;
}

// Mock data
const sourceCategories: SourceCategory[] = [
  {
    id: 'digital',
    name: 'Digital Marketing',
    description: 'Online marketing channels and digital advertising',
    color: 'bg-blue-500',
    icon: Globe
  },
  {
    id: 'traditional',
    name: 'Traditional Marketing',
    description: 'Print, radio, TV, and offline advertising',
    color: 'bg-purple-500',
    icon: FileText
  },
  {
    id: 'referral',
    name: 'Referrals',
    description: 'Customer and partner referrals',
    color: 'bg-emerald-500',
    icon: Users
  },
  {
    id: 'event',
    name: 'Events',
    description: 'Trade shows, conferences, and networking events',
    color: 'bg-amber-500',
    icon: Calendar
  },
  {
    id: 'direct',
    name: 'Direct Contact',
    description: 'Direct inquiries and inbound contacts',
    color: 'bg-rose-500',
    icon: Phone
  },
  {
    id: 'partnership',
    name: 'Partnerships',
    description: 'Partner referrals and joint ventures',
    color: 'bg-indigo-500',
    icon: Building2
  }
];

const mockLeadSources: LeadSource[] = [
  {
    id: 'LS001',
    name: 'Company Website',
    description: 'Organic traffic and contact form submissions from main website',
    category: 'digital',
    type: 'website',
    url: 'https://company.com',
    cost: 500,
    isActive: true,
    trackingEnabled: true,
    color: '#3B82F6',
    icon: 'globe',
    metadata: {
      utmSource: 'website',
      utmMedium: 'organic',
      conversionGoal: 'contact-form'
    },
    performance: {
      totalLeads: 156,
      qualifiedLeads: 89,
      convertedLeads: 23,
      totalRevenue: 287500,
      avgLeadValue: 1842,
      conversionRate: 14.7,
      costPerLead: 3.21,
      roi: 575,
      trend: 'up',
      trendPercentage: 12.5
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'Admin'
  },
  {
    id: 'LS002',
    name: 'Google Ads',
    description: 'Google Ads search and display campaigns',
    category: 'digital',
    type: 'google-ads',
    url: 'https://ads.google.com',
    cost: 2500,
    isActive: true,
    trackingEnabled: true,
    color: '#10B981',
    icon: 'target',
    metadata: {
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'construction-services'
    },
    performance: {
      totalLeads: 234,
      qualifiedLeads: 145,
      convertedLeads: 67,
      totalRevenue: 675000,
      avgLeadValue: 2884,
      conversionRate: 28.6,
      costPerLead: 10.68,
      roi: 270,
      trend: 'up',
      trendPercentage: 8.3
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'Marketing Team'
  },
  {
    id: 'LS003',
    name: 'Facebook Ads',
    description: 'Facebook and Instagram advertising campaigns',
    category: 'digital',
    type: 'facebook-ads',
    url: 'https://facebook.com/ads',
    cost: 1800,
    isActive: true,
    trackingEnabled: true,
    color: '#8B5CF6',
    icon: 'share-2',
    metadata: {
      utmSource: 'facebook',
      utmMedium: 'social',
      utmCampaign: 'home-renovation'
    },
    performance: {
      totalLeads: 189,
      qualifiedLeads: 98,
      convertedLeads: 34,
      totalRevenue: 425000,
      avgLeadValue: 2249,
      conversionRate: 18.0,
      costPerLead: 9.52,
      roi: 236,
      trend: 'down',
      trendPercentage: -5.2
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'Marketing Team'
  },
  {
    id: 'LS004',
    name: 'Customer Referrals',
    description: 'Referrals from existing customers',
    category: 'referral',
    type: 'referral',
    cost: 0,
    isActive: true,
    trackingEnabled: true,
    color: '#F59E0B',
    icon: 'users',
    metadata: {},
    performance: {
      totalLeads: 67,
      qualifiedLeads: 62,
      convertedLeads: 45,
      totalRevenue: 892500,
      avgLeadValue: 13321,
      conversionRate: 67.2,
      costPerLead: 0,
      roi: 999,
      trend: 'up',
      trendPercentage: 23.1
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 17),
    createdBy: 'Sales Team'
  },
  {
    id: 'LS005',
    name: 'Trade Shows',
    description: 'Construction and home improvement trade shows',
    category: 'event',
    type: 'trade-show',
    cost: 5000,
    isActive: true,
    trackingEnabled: true,
    color: '#EF4444',
    icon: 'calendar',
    metadata: {},
    performance: {
      totalLeads: 78,
      qualifiedLeads: 45,
      convertedLeads: 18,
      totalRevenue: 450000,
      avgLeadValue: 5769,
      conversionRate: 23.1,
      costPerLead: 64.10,
      roi: 90,
      trend: 'stable',
      trendPercentage: 1.2
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 16),
    createdBy: 'Sales Team'
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

function getSourceTypeIcon(type: LeadSource['type']) {
  switch (type) {
    case 'website': return Globe;
    case 'social-media': return Share2;
    case 'email-campaign': return Mail;
    case 'google-ads': return Target;
    case 'facebook-ads': return Share2;
    case 'referral': return Users;
    case 'cold-call': return Phone;
    case 'event': return Calendar;
    case 'direct-mail': return Mail;
    case 'partnership': return Building2;
    case 'trade-show': return Calendar;
    case 'webinar': return Users;
    default: return Globe;
  }
}

function LeadSourceCard({ source, onEdit, onView, onToggle, onDelete }: {
  source: LeadSource;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const TypeIcon = getSourceTypeIcon(source.type);
  const TrendIcon = getTrendIcon(source.performance.trend);
  const category = sourceCategories.find(c => c.id === source.category);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div 
              className="p-2 rounded-lg text-white"
              style={{ backgroundColor: source.color }}
            >
              <TypeIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{source.name}</h3>
                {!source.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
                {source.trackingEnabled && (
                  <Tooltip content="Tracking Enabled">
                    <Zap className="h-3 w-3 text-amber-500" />
                  </Tooltip>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{source.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                {category && (
                  <div className="flex items-center space-x-1">
                    <div className={cn("w-2 h-2 rounded-full", category.color)} />
                    <span>{category.name}</span>
                  </div>
                )}
                {source.url && (
                  <div className="flex items-center space-x-1">
                    <ExternalLink className="h-3 w-3" />
                    <span>Tracked URL</span>
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
                Edit Source
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {source.isActive ? (
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
            <p className="text-lg font-bold">{source.performance.totalLeads}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-green-600">{source.performance.conversionRate}%</p>
            <p className="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Revenue:</span>
            <span className="font-medium">{formatCurrency(source.performance.totalRevenue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cost per Lead:</span>
            <span className="font-medium">${source.performance.costPerLead.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ROI:</span>
            <span className={cn("font-medium flex items-center space-x-1",
              source.performance.roi > 200 ? "text-emerald-600" : 
              source.performance.roi > 100 ? "text-amber-600" : "text-red-600"
            )}>
              <span>{source.performance.roi}%</span>
              <TrendIcon className="h-3 w-3" />
            </span>
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(source.performance.trend))}>
          <TrendIcon className="h-4 w-4" />
          <span>
            {source.performance.trend === 'up' ? '+' : source.performance.trend === 'down' ? '-' : ''}
            {Math.abs(source.performance.trendPercentage)}% from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category, sources }: {
  category: SourceCategory;
  sources: LeadSource[];
}) {
  const categoryStats = useMemo(() => {
    const totalLeads = sources.reduce((sum, s) => sum + s.performance.totalLeads, 0);
    const totalRevenue = sources.reduce((sum, s) => sum + s.performance.totalRevenue, 0);
    const totalCost = sources.reduce((sum, s) => sum + s.cost, 0);
    const avgConversion = sources.length > 0 
      ? sources.reduce((sum, s) => sum + s.performance.conversionRate, 0) / sources.length 
      : 0;
    
    return { totalLeads, totalRevenue, totalCost, avgConversion };
  }, [sources]);

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
            <p className="text-lg font-bold">{sources.length}</p>
            <p className="text-xs text-gray-500">Sources</p>
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
            <span>Cost:</span>
            <span className="font-medium">{formatCurrency(categoryStats.totalCost)}</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Conversion:</span>
            <span className="font-medium">{categoryStats.avgConversion.toFixed(1)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadSources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('sources');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [sources, setSources] = useState(mockLeadSources);

  const filteredSources = useMemo(() => {
    return sources.filter(source => {
      const matchesSearch = !searchQuery || 
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || source.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, sources]);

  const overallStats = useMemo(() => {
    const totalSources = sources.length;
    const activeSources = sources.filter(s => s.isActive).length;
    const totalLeads = sources.reduce((sum, s) => sum + s.performance.totalLeads, 0);
    const totalRevenue = sources.reduce((sum, s) => sum + s.performance.totalRevenue, 0);
    const totalCost = sources.reduce((sum, s) => sum + s.cost, 0);
    const avgConversion = sources.length > 0 
      ? sources.reduce((sum, s) => sum + s.performance.conversionRate, 0) / sources.length 
      : 0;
    const roi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;
    
    return { totalSources, activeSources, totalLeads, totalRevenue, totalCost, avgConversion, roi };
  }, [sources]);

  const handleToggleSource = (sourceId: string) => {
    setSources(prev => prev.map(s => 
      s.id === sourceId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleDeleteSource = (sourceId: string) => {
    setSources(prev => prev.filter(s => s.id !== sourceId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Lead Sources</h1>
              <Badge variant="secondary">{filteredSources.length} sources</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search sources..."
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
                  {sourceCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Source
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="sources">All Sources</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Sources</p>
                        <p className="text-2xl font-bold">{overallStats.totalSources}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeSources} active</p>
                      </div>
                      <Globe className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Leads</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalLeads)}</p>
                        <p className="text-xs text-gray-500">All sources</p>
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
                        <p className="text-sm text-gray-500">Overall ROI</p>
                        <p className={cn("text-2xl font-bold", 
                          overallStats.roi > 200 ? "text-emerald-600" : 
                          overallStats.roi > 100 ? "text-amber-600" : "text-red-600"
                        )}>
                          {overallStats.roi.toFixed(0)}%
                        </p>
                        <p className="text-xs text-gray-500">Return on investment</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSources.map((source) => (
                  <LeadSourceCard
                    key={source.id}
                    source={source}
                    onEdit={() => {}}
                    onView={() => {}}
                    onToggle={() => handleToggleSource(source.id)}
                    onDelete={() => handleDeleteSource(source.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sourceCategories.map((category) => {
                  const categorySources = sources.filter(s => s.category === category.id);
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      sources={categorySources}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Sources</CardTitle>
                  <CardDescription>Sources with highest ROI and conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...sources]
                      .sort((a, b) => b.performance.roi - a.performance.roi)
                      .slice(0, 5)
                      .map((source, index) => {
                        const TypeIcon = getSourceTypeIcon(source.type);
                        return (
                          <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm font-medium">
                                {index + 1}
                              </div>
                              <div 
                                className="p-2 rounded-lg text-white"
                                style={{ backgroundColor: source.color }}
                              >
                                <TypeIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{source.name}</p>
                                <p className="text-sm text-gray-500">{source.performance.totalLeads} leads</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold text-emerald-600">{source.performance.roi}% ROI</p>
                              <p className="text-sm text-gray-500">{source.performance.conversionRate}% conversion</p>
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

        {/* Add Source Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead Source</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Source Name</Label>
                  <Input placeholder="e.g., LinkedIn Ads" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceCategories.map((category) => (
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
                <Textarea placeholder="Describe this lead source..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tracking URL</Label>
                  <Input placeholder="https://example.com" />
                </div>
                <div>
                  <Label>Monthly Cost</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Enable Tracking</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>
                  Create Source
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default LeadSources;
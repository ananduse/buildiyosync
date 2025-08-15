import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Plus,
  Edit,
  Trash2,
  Settings,
  Search,
  Filter,
  Building,
  Users,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Copy,
  RefreshCw,
  Save,
  X,
  Info,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Hash,
  Calendar,
  DollarSign,
  Percent,
  Building2,
  Factory,
  Store,
  Home,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Download,
  Upload,
  Zap,
  Crown,
  Briefcase
} from 'lucide-react';

interface CompanySize {
  id: string;
  name: string;
  description: string;
  category: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  employeeRange: {
    min: number;
    max: number | null; // null for unlimited
  };
  revenueRange?: {
    min: number;
    max: number | null;
    currency: string;
  };
  isActive: boolean;
  isDefault: boolean;
  color: string;
  icon: string;
  order: number;
  characteristics: string[];
  targetMarkets: string[];
  salesApproach: string;
  averageDealSize?: number;
  salesCycle?: number; // in days
  decisionMakers: string[];
  metrics: {
    totalLeads: number;
    conversionRate: number;
    averageDealValue: number;
    leadsThisMonth: number;
    wonDeals: number;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface SizeTemplate {
  id: string;
  name: string;
  description: string;
  region: string;
  industry?: string;
  sizes: Omit<CompanySize, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'metrics'>[];
  isPopular: boolean;
}

const CompanySizes: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('sizes');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSize, setEditingSize] = useState<CompanySize | null>(null);

  // Mock data for company sizes
  const companySizes: CompanySize[] = [
    {
      id: 'size-001',
      name: 'Startup',
      description: 'Early-stage companies with high growth potential',
      category: 'startup',
      employeeRange: { min: 1, max: 10 },
      revenueRange: { min: 0, max: 1000000, currency: 'USD' },
      isActive: true,
      isDefault: false,
      color: '#F59E0B',
      icon: 'zap',
      order: 1,
      characteristics: [
        'Limited budget',
        'Quick decision-making',
        'High growth potential',
        'Technology-focused',
        'Flexible processes'
      ],
      targetMarkets: ['Technology', 'SaaS', 'E-commerce', 'FinTech'],
      salesApproach: 'Product-led growth, founder sales, low-touch model',
      averageDealSize: 5000,
      salesCycle: 30,
      decisionMakers: ['Founder', 'CEO', 'CTO'],
      metrics: {
        totalLeads: 347,
        conversionRate: 15,
        averageDealValue: 4800,
        leadsThisMonth: 28,
        wonDeals: 52
      },
      createdAt: '2023-06-15T10:00:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      createdBy: 'Sales Manager'
    },
    {
      id: 'size-002',
      name: 'Small Business',
      description: 'Established small businesses with steady growth',
      category: 'small',
      employeeRange: { min: 11, max: 50 },
      revenueRange: { min: 1000000, max: 10000000, currency: 'USD' },
      isActive: true,
      isDefault: true,
      color: '#10B981',
      icon: 'store',
      order: 2,
      characteristics: [
        'Budget conscious',
        'Proven business model',
        'Local market focus',
        'Relationship-driven',
        'Established processes'
      ],
      targetMarkets: ['Professional Services', 'Retail', 'Healthcare', 'Manufacturing'],
      salesApproach: 'Relationship-based selling, demos, consultative approach',
      averageDealSize: 15000,
      salesCycle: 45,
      decisionMakers: ['Owner', 'General Manager', 'Operations Manager'],
      metrics: {
        totalLeads: 892,
        conversionRate: 28,
        averageDealValue: 14200,
        leadsThisMonth: 67,
        wonDeals: 249
      },
      createdAt: '2023-06-15T10:05:00Z',
      updatedAt: '2024-01-08T11:20:00Z',
      createdBy: 'Sales Manager'
    },
    {
      id: 'size-003',
      name: 'Mid-Market',
      description: 'Growing companies with established operations',
      category: 'medium',
      employeeRange: { min: 51, max: 200 },
      revenueRange: { min: 10000000, max: 100000000, currency: 'USD' },
      isActive: true,
      isDefault: false,
      color: '#3B82F6',
      icon: 'building',
      order: 3,
      characteristics: [
        'Structured procurement',
        'Multiple decision makers',
        'Growth-oriented',
        'Process improvements',
        'Competitive analysis'
      ],
      targetMarkets: ['Manufacturing', 'Technology', 'Financial Services', 'Healthcare'],
      salesApproach: 'Solution selling, ROI focus, stakeholder management',
      averageDealSize: 50000,
      salesCycle: 90,
      decisionMakers: ['VP Sales', 'IT Director', 'Operations Director', 'CFO'],
      metrics: {
        totalLeads: 456,
        conversionRate: 35,
        averageDealValue: 48500,
        leadsThisMonth: 34,
        wonDeals: 159
      },
      createdAt: '2023-06-15T10:10:00Z',
      updatedAt: '2023-12-20T16:45:00Z',
      createdBy: 'Sales Director'
    },
    {
      id: 'size-004',
      name: 'Large Enterprise',
      description: 'Large corporations with complex organizational structures',
      category: 'large',
      employeeRange: { min: 201, max: 1000 },
      revenueRange: { min: 100000000, max: 1000000000, currency: 'USD' },
      isActive: true,
      isDefault: false,
      color: '#8B5CF6',
      icon: 'building2',
      order: 4,
      characteristics: [
        'Complex decision process',
        'Budget allocated annually',
        'Risk-averse culture',
        'Compliance requirements',
        'Vendor management'
      ],
      targetMarkets: ['Fortune 1000', 'Financial Services', 'Healthcare', 'Government'],
      salesApproach: 'Enterprise selling, committee selling, proof of concept',
      averageDealSize: 200000,
      salesCycle: 180,
      decisionMakers: ['C-Suite', 'VP/SVP', 'IT Director', 'Procurement', 'Legal'],
      metrics: {
        totalLeads: 178,
        conversionRate: 45,
        averageDealValue: 195000,
        leadsThisMonth: 12,
        wonDeals: 80
      },
      createdAt: '2023-06-15T10:15:00Z',
      updatedAt: '2024-01-05T09:30:00Z',
      createdBy: 'Enterprise Sales Manager'
    },
    {
      id: 'size-005',
      name: 'Global Enterprise',
      description: 'Multinational corporations with global operations',
      category: 'enterprise',
      employeeRange: { min: 1000, max: null },
      revenueRange: { min: 1000000000, max: null, currency: 'USD' },
      isActive: true,
      isDefault: false,
      color: '#DC2626',
      icon: 'crown',
      order: 5,
      characteristics: [
        'Global presence',
        'Multiple divisions',
        'Extensive compliance',
        'Strategic partnerships',
        'Complex integrations'
      ],
      targetMarkets: ['Fortune 500', 'Global Corporations', 'Government', 'Defense'],
      salesApproach: 'Strategic account management, executive sponsorship',
      averageDealSize: 1000000,
      salesCycle: 365,
      decisionMakers: ['CEO', 'Board Members', 'Division Presidents', 'Global IT', 'Chief Procurement'],
      metrics: {
        totalLeads: 45,
        conversionRate: 65,
        averageDealValue: 950000,
        leadsThisMonth: 3,
        wonDeals: 29
      },
      createdAt: '2023-06-15T10:20:00Z',
      updatedAt: '2023-11-30T14:15:00Z',
      createdBy: 'VP Sales'
    }
  ];

  // Mock data for size templates
  const sizeTemplates: SizeTemplate[] = [
    {
      id: 'template-001',
      name: 'North American Standard',
      description: 'Standard company size classifications for North American market',
      region: 'North America',
      isPopular: true,
      sizes: [
        { name: 'Micro Business', description: '1-9 employees', category: 'startup', employeeRange: { min: 1, max: 9 }, isActive: true, isDefault: false, color: '#F59E0B', icon: 'home', order: 1, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] },
        { name: 'Small Business', description: '10-49 employees', category: 'small', employeeRange: { min: 10, max: 49 }, isActive: true, isDefault: true, color: '#10B981', icon: 'store', order: 2, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] },
        { name: 'Medium Business', description: '50-249 employees', category: 'medium', employeeRange: { min: 50, max: 249 }, isActive: true, isDefault: false, color: '#3B82F6', icon: 'building', order: 3, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] },
        { name: 'Large Enterprise', description: '250+ employees', category: 'large', employeeRange: { min: 250, max: null }, isActive: true, isDefault: false, color: '#8B5CF6', icon: 'building2', order: 4, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] }
      ]
    },
    {
      id: 'template-002',
      name: 'European Union Standard',
      description: 'EU classification based on employee count and revenue',
      region: 'Europe',
      isPopular: true,
      sizes: [
        { name: 'Micro Enterprise', description: '1-9 employees, <€2M revenue', category: 'startup', employeeRange: { min: 1, max: 9 }, revenueRange: { min: 0, max: 2000000, currency: 'EUR' }, isActive: true, isDefault: false, color: '#F59E0B', icon: 'home', order: 1, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] },
        { name: 'Small Enterprise', description: '10-49 employees, <€10M revenue', category: 'small', employeeRange: { min: 10, max: 49 }, revenueRange: { min: 2000000, max: 10000000, currency: 'EUR' }, isActive: true, isDefault: true, color: '#10B981', icon: 'store', order: 2, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] },
        { name: 'Medium Enterprise', description: '50-249 employees, <€50M revenue', category: 'medium', employeeRange: { min: 50, max: 249 }, revenueRange: { min: 10000000, max: 50000000, currency: 'EUR' }, isActive: true, isDefault: false, color: '#3B82F6', icon: 'building', order: 3, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] },
        { name: 'Large Enterprise', description: '250+ employees, €50M+ revenue', category: 'large', employeeRange: { min: 250, max: null }, revenueRange: { min: 50000000, max: null, currency: 'EUR' }, isActive: true, isDefault: false, color: '#8B5CF6', icon: 'building2', order: 4, characteristics: [], targetMarkets: [], salesApproach: '', decisionMakers: [] }
      ]
    }
  ];

  const getSizeIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return Zap;
      case 'store': return Store;
      case 'building': return Building;
      case 'building2': return Building2;
      case 'factory': return Factory;
      case 'crown': return Crown;
      case 'home': return Home;
      case 'briefcase': return Briefcase;
      default: return Building;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'startup': return 'bg-yellow-100 text-yellow-800';
      case 'small': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'large': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEmployeeRange = (range: { min: number; max: number | null }) => {
    if (range.max === null) {
      return `${range.min.toLocaleString()}+`;
    }
    return `${range.min.toLocaleString()}-${range.max.toLocaleString()}`;
  };

  const formatRevenueRange = (range?: { min: number; max: number | null; currency: string }) => {
    if (!range) return 'Not specified';
    const formatAmount = (amount: number) => {
      if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`;
      if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
      if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
      return amount.toString();
    };
    
    const min = formatAmount(range.min);
    const max = range.max === null ? '+' : formatAmount(range.max);
    return `${range.currency} ${min}${range.max === null ? '' : `-${max}`}`;
  };

  const sortedSizes = [...companySizes].sort((a, b) => a.order - b.order);
  
  const filteredSizes = sortedSizes.filter(size => {
    const matchesSearch = size.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         size.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || size.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleSizeStatus = (sizeId: string) => {
    console.log(`Toggling status for size: ${sizeId}`);
  };

  const deleteSize = (sizeId: string) => {
    console.log(`Deleting size: ${sizeId}`);
  };

  const duplicateSize = (sizeId: string) => {
    console.log(`Duplicating size: ${sizeId}`);
  };

  const applyTemplate = (templateId: string) => {
    console.log(`Applying template: ${templateId}`);
  };

  const moveSize = (sizeId: string, direction: 'up' | 'down') => {
    console.log(`Moving size ${sizeId} ${direction}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Company Sizes</h1>
          <p className="text-muted-foreground">Manage company size classifications for lead segmentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Size
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="sizes">Company Sizes</TabsTrigger>
          <TabsTrigger value="templates">Size Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="sizes" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search company sizes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="small">Small Business</SelectItem>
                <SelectItem value="medium">Mid-Market</SelectItem>
                <SelectItem value="large">Large Enterprise</SelectItem>
                <SelectItem value="enterprise">Global Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Company Sizes List */}
          <div className="space-y-4">
            {filteredSizes.map((size, index) => {
              const SizeIcon = getSizeIcon(size.icon);
              
              return (
                <Card key={size.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex flex-col items-center gap-2">
                          <div 
                            className="p-3 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: size.color + '20' }}
                          >
                            <SizeIcon 
                              className="h-6 w-6"
                              style={{ color: size.color }}
                            />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            #{size.order}
                          </Badge>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{size.name}</h3>
                            {size.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                            <Badge className={getCategoryColor(size.category)}>
                              {size.category}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={size.isActive ? 'text-green-600 border-green-200' : 'text-gray-600 border-gray-200'}
                            >
                              {size.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{size.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Employees</p>
                              <p className="font-medium">{formatEmployeeRange(size.employeeRange)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Revenue</p>
                              <p className="font-medium">{formatRevenueRange(size.revenueRange)}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Avg Deal Size</p>
                              <p className="font-medium">
                                {size.averageDealSize ? `$${size.averageDealSize.toLocaleString()}` : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Sales Cycle</p>
                              <p className="font-medium">
                                {size.salesCycle ? `${size.salesCycle} days` : 'N/A'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Leads</p>
                              <p className="font-medium">{size.metrics.totalLeads.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Conversion Rate</p>
                              <p className="font-medium">{size.metrics.conversionRate}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Avg Deal Value</p>
                              <p className="font-medium">${size.metrics.averageDealValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Won Deals</p>
                              <p className="font-medium">{size.metrics.wonDeals}</p>
                            </div>
                          </div>
                          
                          {size.characteristics.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Key Characteristics:</p>
                              <div className="flex flex-wrap gap-1">
                                {size.characteristics.slice(0, 4).map(char => (
                                  <Badge key={char} variant="outline" className="text-xs">
                                    {char}
                                  </Badge>
                                ))}
                                {size.characteristics.length > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{size.characteristics.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {size.targetMarkets.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Target Markets:</p>
                              <p className="text-sm text-muted-foreground">
                                {size.targetMarkets.join(', ')}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created: {new Date(size.createdAt).toLocaleDateString()}</span>
                            <span>Updated: {new Date(size.updatedAt).toLocaleDateString()}</span>
                            <span>By: {size.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveSize(size.id, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveSize(size.id, 'down')}
                            disabled={index === filteredSizes.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSize(size)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => duplicateSize(size.id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSizeStatus(size.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteSize(size.id)}
                            disabled={size.isDefault}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Size Templates</CardTitle>
              <CardDescription>Pre-configured size classifications for different regions and industries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sizeTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{template.name}</h3>
                              {template.isPopular && (
                                <Badge variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Region: </span>
                            <span>{template.region}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Sizes: </span>
                            <span>{template.sizes.length}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Size Categories:</p>
                          <div className="space-y-1">
                            {template.sizes.map((size, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs">
                                <div 
                                  className="w-3 h-3 rounded" 
                                  style={{ backgroundColor: size.color }}
                                />
                                <span className="font-medium">{size.name}</span>
                                <span className="text-muted-foreground">
                                  ({formatEmployeeRange(size.employeeRange)} employees)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => applyTemplate(template.id)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Apply Template
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Companies</p>
                    <p className="text-3xl font-bold">1,918</p>
                    <p className="text-sm text-green-600">+8.2% from last month</p>
                  </div>
                  <Building className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                    <p className="text-3xl font-bold">$64.2K</p>
                    <p className="text-sm text-green-600">+12.5% from last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Conversion</p>
                    <p className="text-3xl font-bold">65%</p>
                    <p className="text-sm text-muted-foreground">Global Enterprise</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sizes</p>
                    <p className="text-3xl font-bold">{companySizes.filter(s => s.isActive).length}</p>
                    <p className="text-sm text-muted-foreground">of {companySizes.length} total</p>
                  </div>
                  <Target className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lead Distribution by Company Size</CardTitle>
              <CardDescription>Current lead distribution across different company sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedSizes.filter(s => s.isActive).map((size) => {
                  const totalLeads = sortedSizes.reduce((sum, s) => sum + s.metrics.totalLeads, 0);
                  const percentage = (size.metrics.totalLeads / totalLeads) * 100;
                  
                  return (
                    <div key={size.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: size.color }}
                          />
                          <span className="font-medium">{size.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{size.metrics.totalLeads.toLocaleString()} leads</span>
                          <span className="text-muted-foreground">{percentage.toFixed(1)}%</span>
                          <span className="text-green-600">{size.metrics.conversionRate}% conv.</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: size.color 
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Classification Settings</CardTitle>
                <CardDescription>Configure how companies are classified by size</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Classification Method</Label>
                  <Select defaultValue="employees">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employees">Employee Count</SelectItem>
                      <SelectItem value="revenue">Annual Revenue</SelectItem>
                      <SelectItem value="both">Both Metrics</SelectItem>
                      <SelectItem value="manual">Manual Classification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="autoClassify" defaultChecked />
                  <Label htmlFor="autoClassify">Auto-classify new companies</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="updateExisting" />
                  <Label htmlFor="updateExisting">Update existing classifications</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Configure data sources for company information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>LinkedIn integration</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Clearbit enrichment</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>ZoomInfo data</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Manual data entry</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Data refresh frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySizes;
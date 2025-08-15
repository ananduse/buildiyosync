import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  MapPin,
  Map,
  Globe,
  Navigation,
  Compass,
  Target,
  Users,
  User,
  UserCheck,
  Building,
  Building2,
  Briefcase,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  Copy,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Calendar,
  Phone,
  Mail,
  Star,
  Award,
  Flag,
  Layers,
  Grid,
  List,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  Lock,
  Unlock,
  Zap,
  Hash,
  Percent
} from 'lucide-react';

interface Territory {
  id: string;
  name: string;
  description: string;
  type: 'geographic' | 'account_based' | 'industry' | 'company_size' | 'hybrid';
  status: 'active' | 'inactive' | 'pending';
  assignedTo: string[];
  manager: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  rules: TerritoryRule[];
  coverage: {
    geographic?: {
      countries: string[];
      states: string[];
      cities: string[];
      zipCodes: string[];
      radius?: {
        center: { lat: number; lng: number };
        radiusKm: number;
      };
    };
    account?: {
      companies: string[];
      industries: string[];
      companySizes: string[];
      revenueRange: { min: number; max: number };
    };
    custom?: {
      field: string;
      operator: string;
      value: any;
    }[];
  };
  performance: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    revenue: number;
    conversionRate: number;
    avgDealSize: number;
    activitiesCount: number;
  };
  goals: {
    revenueTarget: number;
    leadsTarget: number;
    conversionTarget: number;
    period: 'monthly' | 'quarterly' | 'yearly';
  };
}

interface TerritoryRule {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'in' | 'between' | 'greater_than' | 'less_than';
  value: any;
  priority: number;
  isActive: boolean;
}

interface TerritoryAssignment {
  id: string;
  territoryId: string;
  userId: string;
  role: 'owner' | 'manager' | 'collaborator';
  assignedBy: string;
  assignedAt: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  permissions: string[];
}

interface TerritoryConflict {
  id: string;
  type: 'overlap' | 'gap' | 'duplicate_assignment';
  territories: string[];
  affectedLeads: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestedResolution: string;
  createdAt: string;
}

interface TerritoryStats {
  totalTerritories: number;
  activeTerritories: number;
  totalCoverage: number;
  avgPerformance: number;
  totalRevenue: number;
  totalLeads: number;
  conflicts: number;
  unassignedLeads: number;
}

const TerritoryManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('territories');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [expandedTerritories, setExpandedTerritories] = useState<Set<string>>(new Set());

  // Mock data for territories
  const territories: Territory[] = [
    {
      id: 'territory-001',
      name: 'North America - Enterprise',
      description: 'Large enterprise accounts across North America',
      type: 'hybrid',
      status: 'active',
      assignedTo: ['user-001', 'user-004'],
      manager: 'user-001',
      createdBy: 'admin@company.com',
      createdAt: '2023-06-15T10:00:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      rules: [
        {
          id: 'rule-001',
          field: 'company_size',
          operator: 'in',
          value: ['Enterprise', 'Large'],
          priority: 1,
          isActive: true
        },
        {
          id: 'rule-002',
          field: 'region',
          operator: 'in',
          value: ['North America', 'USA', 'Canada'],
          priority: 2,
          isActive: true
        }
      ],
      coverage: {
        geographic: {
          countries: ['USA', 'Canada'],
          states: ['CA', 'NY', 'TX', 'FL', 'ON', 'BC'],
          cities: ['New York', 'Los Angeles', 'Toronto', 'Vancouver'],
          zipCodes: []
        },
        account: {
          companies: ['Tech Corp', 'Global Inc', 'Mega Solutions'],
          industries: ['Technology', 'Finance', 'Healthcare'],
          companySizes: ['Enterprise', 'Large'],
          revenueRange: { min: 100000000, max: 0 }
        }
      },
      performance: {
        totalLeads: 234,
        qualifiedLeads: 167,
        convertedLeads: 45,
        revenue: 2750000,
        conversionRate: 19.2,
        avgDealSize: 61111,
        activitiesCount: 1245
      },
      goals: {
        revenueTarget: 3000000,
        leadsTarget: 300,
        conversionTarget: 20,
        period: 'quarterly'
      }
    },
    {
      id: 'territory-002',
      name: 'West Coast - SMB',
      description: 'Small and medium businesses in West Coast states',
      type: 'geographic',
      status: 'active',
      assignedTo: ['user-002'],
      manager: 'user-002',
      createdBy: 'manager@company.com',
      createdAt: '2023-07-20T11:15:00Z',
      updatedAt: '2024-01-08T16:20:00Z',
      rules: [
        {
          id: 'rule-003',
          field: 'state',
          operator: 'in',
          value: ['CA', 'WA', 'OR', 'NV'],
          priority: 1,
          isActive: true
        },
        {
          id: 'rule-004',
          field: 'company_size',
          operator: 'in',
          value: ['Small', 'Medium'],
          priority: 2,
          isActive: true
        }
      ],
      coverage: {
        geographic: {
          countries: ['USA'],
          states: ['CA', 'WA', 'OR', 'NV'],
          cities: ['San Francisco', 'Los Angeles', 'Seattle', 'Portland'],
          zipCodes: []
        },
        account: {
          companies: [],
          industries: ['Technology', 'Retail', 'Manufacturing'],
          companySizes: ['Small', 'Medium'],
          revenueRange: { min: 1000000, max: 50000000 }
        }
      },
      performance: {
        totalLeads: 456,
        qualifiedLeads: 298,
        convertedLeads: 78,
        revenue: 1890000,
        conversionRate: 17.1,
        avgDealSize: 24231,
        activitiesCount: 2134
      },
      goals: {
        revenueTarget: 2200000,
        leadsTarget: 500,
        conversionTarget: 18,
        period: 'quarterly'
      }
    },
    {
      id: 'territory-003',
      name: 'Healthcare - National',
      description: 'Healthcare industry accounts nationwide',
      type: 'industry',
      status: 'active',
      assignedTo: ['user-003'],
      manager: 'user-003',
      createdBy: 'sales@company.com',
      createdAt: '2023-08-10T09:30:00Z',
      updatedAt: '2024-01-05T12:45:00Z',
      rules: [
        {
          id: 'rule-005',
          field: 'industry',
          operator: 'equals',
          value: 'Healthcare',
          priority: 1,
          isActive: true
        }
      ],
      coverage: {
        account: {
          companies: ['MedCorp', 'Health Systems Inc'],
          industries: ['Healthcare'],
          companySizes: ['Small', 'Medium', 'Large'],
          revenueRange: { min: 5000000, max: 0 }
        }
      },
      performance: {
        totalLeads: 189,
        qualifiedLeads: 134,
        convertedLeads: 32,
        revenue: 1450000,
        conversionRate: 16.9,
        avgDealSize: 45312,
        activitiesCount: 876
      },
      goals: {
        revenueTarget: 1800000,
        leadsTarget: 250,
        conversionTarget: 18,
        period: 'quarterly'
      }
    },
    {
      id: 'territory-004',
      name: 'East Coast - Mid-Market',
      description: 'Mid-market companies in Eastern United States',
      type: 'hybrid',
      status: 'active',
      assignedTo: ['user-004', 'user-005'],
      manager: 'user-004',
      createdBy: 'regional@company.com',
      createdAt: '2023-09-05T14:20:00Z',
      updatedAt: '2023-12-15T10:30:00Z',
      rules: [
        {
          id: 'rule-006',
          field: 'state',
          operator: 'in',
          value: ['NY', 'MA', 'CT', 'NJ', 'PA', 'FL'],
          priority: 1,
          isActive: true
        },
        {
          id: 'rule-007',
          field: 'annual_revenue',
          operator: 'between',
          value: [10000000, 100000000],
          priority: 2,
          isActive: true
        }
      ],
      coverage: {
        geographic: {
          countries: ['USA'],
          states: ['NY', 'MA', 'CT', 'NJ', 'PA', 'FL'],
          cities: ['New York', 'Boston', 'Philadelphia', 'Miami'],
          zipCodes: []
        },
        account: {
          companies: [],
          industries: ['Finance', 'Technology', 'Manufacturing'],
          companySizes: ['Medium', 'Large'],
          revenueRange: { min: 10000000, max: 100000000 }
        }
      },
      performance: {
        totalLeads: 312,
        qualifiedLeads: 201,
        convertedLeads: 52,
        revenue: 2100000,
        conversionRate: 16.7,
        avgDealSize: 40385,
        activitiesCount: 1567
      },
      goals: {
        revenueTarget: 2500000,
        leadsTarget: 400,
        conversionTarget: 18,
        period: 'quarterly'
      }
    }
  ];

  // Mock territory conflicts
  const conflicts: TerritoryConflict[] = [
    {
      id: 'conflict-001',
      type: 'overlap',
      territories: ['territory-001', 'territory-004'],
      affectedLeads: 23,
      severity: 'medium',
      description: 'Geographic overlap in New York area for enterprise accounts',
      suggestedResolution: 'Define clearer revenue boundaries or assign based on company size',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'conflict-002',
      type: 'gap',
      territories: [],
      affectedLeads: 45,
      severity: 'high',
      description: 'No territory coverage for Midwest region small businesses',
      suggestedResolution: 'Create new territory or extend existing West Coast territory',
      createdAt: '2024-01-14T14:20:00Z'
    }
  ];

  // Mock stats
  const stats: TerritoryStats = {
    totalTerritories: 4,
    activeTerritories: 4,
    totalCoverage: 87.3,
    avgPerformance: 82.5,
    totalRevenue: 8190000,
    totalLeads: 1191,
    conflicts: 2,
    unassignedLeads: 68
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'geographic': return MapPin;
      case 'account_based': return Building;
      case 'industry': return Briefcase;
      case 'company_size': return Building2;
      case 'hybrid': return Layers;
      default: return Map;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'geographic': return 'bg-blue-100 text-blue-800';
      case 'account_based': return 'bg-green-100 text-green-800';
      case 'industry': return 'bg-purple-100 text-purple-800';
      case 'company_size': return 'bg-orange-100 text-orange-800';
      case 'hybrid': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const calculateGoalProgress = (territory: Territory): number => {
    const revenueProgress = (territory.performance.revenue / territory.goals.revenueTarget) * 100;
    const leadsProgress = (territory.performance.totalLeads / territory.goals.leadsTarget) * 100;
    const conversionProgress = (territory.performance.conversionRate / territory.goals.conversionTarget) * 100;
    
    return Math.round((revenueProgress + leadsProgress + conversionProgress) / 3);
  };

  const filteredTerritories = territories.filter(territory => {
    const matchesSearch = territory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         territory.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || territory.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || territory.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleTerritoryExpansion = (territoryId: string) => {
    const newExpanded = new Set(expandedTerritories);
    if (newExpanded.has(territoryId)) {
      newExpanded.delete(territoryId);
    } else {
      newExpanded.add(territoryId);
    }
    setExpandedTerritories(newExpanded);
  };

  const createTerritory = () => {
    console.log('Creating new territory');
  };

  const resolveConflict = (conflictId: string) => {
    console.log(`Resolving conflict: ${conflictId}`);
  };

  const rebalanceTerritories = () => {
    console.log('Rebalancing territories');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Territory Management</h1>
          <p className="text-muted-foreground">Manage sales territories and account assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={rebalanceTerritories}>
            <Shuffle className="h-4 w-4 mr-2" />
            Rebalance
          </Button>
          <Button size="sm" onClick={createTerritory}>
            <Plus className="h-4 w-4 mr-2" />
            Create Territory
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl font-bold">{stats.totalCoverage}%</p>
                <Progress value={stats.totalCoverage} className="h-2 mt-2" />
              </div>
              <Globe className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Territories</p>
                <p className="text-2xl font-bold">{stats.activeTerritories}</p>
                <p className="text-xs text-muted-foreground">of {stats.totalTerritories} total</p>
              </div>
              <Map className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.5% vs last quarter</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conflicts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.conflicts}</p>
                <p className="text-xs text-muted-foreground">{stats.unassignedLeads} unassigned leads</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {conflicts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Territory Conflicts Detected</p>
                  <p className="text-sm text-orange-700">
                    {conflicts.length} conflict(s) need attention. {conflicts.reduce((sum, c) => sum + c.affectedLeads, 0)} leads affected.
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="border-orange-300">
                <Eye className="h-4 w-4 mr-2" />
                Review Conflicts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="territories">Territories</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="territories" className="space-y-6">
          {/* Filters and View Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search territories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Territory Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="geographic">Geographic</SelectItem>
                  <SelectItem value="account_based">Account-Based</SelectItem>
                  <SelectItem value="industry">Industry</SelectItem>
                  <SelectItem value="company_size">Company Size</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Territories Display */}
          {viewMode === 'map' ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Interactive Territory Map</h3>
                  <p className="text-gray-600 mt-2">
                    Visual representation of territory boundaries and coverage
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Map integration would show geographic territories with overlays
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerritories.map((territory) => {
                const TypeIcon = getTypeIcon(territory.type);
                const goalProgress = calculateGoalProgress(territory);
                
                return (
                  <Card key={territory.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-50">
                            <TypeIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{territory.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getTypeColor(territory.type)}>
                                {territory.type.replace('_', ' ')}
                              </Badge>
                              <Badge className={getStatusColor(territory.status)}>
                                {territory.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription>{territory.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <DollarSign className="h-4 w-4 text-green-500 mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="font-bold">${(territory.performance.revenue / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Users className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">Leads</p>
                          <p className="font-bold">{territory.performance.totalLeads}</p>
                        </div>
                      </div>
                      
                      {/* Goal Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Goal Progress</span>
                          <span className={`text-sm font-medium ${getPerformanceColor(goalProgress)}`}>
                            {goalProgress}%
                          </span>
                        </div>
                        <Progress value={goalProgress} className="h-2" />
                      </div>
                      
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Conversion:</span>
                          <span className="ml-1 font-medium">{territory.performance.conversionRate}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Deal:</span>
                          <span className="ml-1 font-medium">${territory.performance.avgDealSize.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Qualified:</span>
                          <span className="ml-1 font-medium">{territory.performance.qualifiedLeads}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Activities:</span>
                          <span className="ml-1 font-medium">{territory.performance.activitiesCount}</span>
                        </div>
                      </div>
                      
                      {/* Assigned Team */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Assigned to:</span>
                        <div className="flex items-center gap-1">
                          {territory.assignedTo.slice(0, 2).map((userId, index) => (
                            <div key={userId} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-xs">{index + 1}</span>
                            </div>
                          ))}
                          {territory.assignedTo.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{territory.assignedTo.length - 2}</span>
                          )}
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTerritories.map((territory) => {
                const TypeIcon = getTypeIcon(territory.type);
                const goalProgress = calculateGoalProgress(territory);
                const isExpanded = expandedTerritories.has(territory.id);
                
                return (
                  <Card key={territory.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Territory Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleTerritoryExpansion(territory.id)}
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <div className="p-2 rounded-lg bg-gray-50">
                              <TypeIcon className="h-5 w-5 text-gray-600" />
                            </div>
                            
                            <div>
                              <h3 className="text-lg font-semibold">{territory.name}</h3>
                              <p className="text-sm text-muted-foreground">{territory.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getTypeColor(territory.type)}>
                                  {territory.type.replace('_', ' ')}
                                </Badge>
                                <Badge className={getStatusColor(territory.status)}>
                                  {territory.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Revenue</p>
                              <p className="font-bold">${(territory.performance.revenue / 1000).toFixed(0)}K</p>
                            </div>
                            
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Leads</p>
                              <p className="font-bold">{territory.performance.totalLeads}</p>
                            </div>
                            
                            <div className="text-center min-w-24">
                              <p className="text-sm text-muted-foreground">Goal Progress</p>
                              <div className="flex items-center gap-2">
                                <Progress value={goalProgress} className="w-16 h-2" />
                                <span className={`text-sm font-medium ${getPerformanceColor(goalProgress)}`}>
                                  {goalProgress}%
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="ml-12 space-y-4 pt-4 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Coverage Details */}
                              <div>
                                <h4 className="font-medium mb-3">Coverage</h4>
                                {territory.coverage.geographic && (
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-sm text-muted-foreground">Countries: </span>
                                      <span className="text-sm">{territory.coverage.geographic.countries.join(', ')}</span>
                                    </div>
                                    <div>
                                      <span className="text-sm text-muted-foreground">States: </span>
                                      <span className="text-sm">{territory.coverage.geographic.states.join(', ')}</span>
                                    </div>
                                  </div>
                                )}
                                {territory.coverage.account && (
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-sm text-muted-foreground">Industries: </span>
                                      <span className="text-sm">{territory.coverage.account.industries.join(', ')}</span>
                                    </div>
                                    <div>
                                      <span className="text-sm text-muted-foreground">Company Sizes: </span>
                                      <span className="text-sm">{territory.coverage.account.companySizes.join(', ')}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Performance Metrics */}
                              <div>
                                <h4 className="font-medium mb-3">Performance</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Conversion Rate:</span>
                                    <span className="font-medium">{territory.performance.conversionRate}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Qualified Leads:</span>
                                    <span className="font-medium">{territory.performance.qualifiedLeads}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Converted:</span>
                                    <span className="font-medium">{territory.performance.convertedLeads}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Avg Deal Size:</span>
                                    <span className="font-medium">${territory.performance.avgDealSize.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Goals */}
                              <div>
                                <h4 className="font-medium mb-3">Goals ({territory.goals.period})</h4>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Revenue Target</span>
                                      <span>${(territory.goals.revenueTarget / 1000).toFixed(0)}K</span>
                                    </div>
                                    <Progress 
                                      value={(territory.performance.revenue / territory.goals.revenueTarget) * 100} 
                                      className="h-2" 
                                    />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Leads Target</span>
                                      <span>{territory.goals.leadsTarget}</span>
                                    </div>
                                    <Progress 
                                      value={(territory.performance.totalLeads / territory.goals.leadsTarget) * 100} 
                                      className="h-2" 
                                    />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Conversion Target</span>
                                      <span>{territory.goals.conversionTarget}%</span>
                                    </div>
                                    <Progress 
                                      value={(territory.performance.conversionRate / territory.goals.conversionTarget) * 100} 
                                      className="h-2" 
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Territory Assignments</CardTitle>
              <CardDescription>Manage team member territory assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Territory assignment management</p>
                <p className="text-sm text-gray-500 mt-2">
                  Assign team members to territories with specific roles and permissions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Territory Conflicts</CardTitle>
              <CardDescription>Resolve overlaps and gaps in territory coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conflicts.map((conflict) => (
                  <div key={conflict.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {conflict.type.replace('_', ' ')}
                          </Badge>
                          <Badge className={`${getSeverityColor(conflict.severity)} bg-opacity-10`}>
                            {conflict.severity}
                          </Badge>
                        </div>
                        
                        <p className="font-medium">{conflict.description}</p>
                        <p className="text-sm text-muted-foreground">{conflict.suggestedResolution}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Affected leads: {conflict.affectedLeads}</span>
                          <span>Detected: {new Date(conflict.createdAt).toLocaleDateString()}</span>
                          {conflict.territories.length > 0 && (
                            <span>Territories: {conflict.territories.length}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => resolveConflict(conflict.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {conflicts.length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-lg font-medium">No Territory Conflicts</p>
                    <p className="text-muted-foreground mt-2">
                      All territories are properly configured with no overlaps or gaps
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Territory Performance</CardTitle>
                <CardDescription>Revenue and conversion by territory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Territory performance chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Compare performance metrics across territories
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coverage Analysis</CardTitle>
                <CardDescription>Geographic and market coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Coverage distribution chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Visualize market coverage and gaps
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Territory Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Coverage</span>
                    <span className="font-medium">{stats.totalCoverage}%</span>
                  </div>
                  <Progress value={stats.totalCoverage} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Avg Performance</span>
                    <span className="font-medium">{stats.avgPerformance}%</span>
                  </div>
                  <Progress value={stats.avgPerformance} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Territory Balance</span>
                    <span className="font-medium">78.5%</span>
                  </div>
                  <Progress value={78.5} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Assignment Efficiency</span>
                    <span className="font-medium">91.2%</span>
                  </div>
                  <Progress value={91.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Distribution</CardTitle>
                <CardDescription>Leads by territory and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-lg font-bold">{stats.totalLeads}</p>
                    <p className="text-sm text-blue-700">Total Leads</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {territories.reduce((sum, t) => sum + t.performance.convertedLeads, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">Converted</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{stats.unassignedLeads}</p>
                      <p className="text-sm text-muted-foreground">Unassigned</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Territory Settings</CardTitle>
                <CardDescription>Configure territory management behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Auto-assignment based on rules</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Prevent territory overlaps</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Alert on coverage gaps</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Default territory type</Label>
                  <Select defaultValue="geographic">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="geographic">Geographic</SelectItem>
                      <SelectItem value="account_based">Account-Based</SelectItem>
                      <SelectItem value="industry">Industry</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Coverage threshold (%)</Label>
                  <Input type="number" defaultValue="85" min="0" max="100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure territory alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email on territory conflicts</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Alert on unassigned leads</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Weekly territory reports</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification recipients</Label>
                  <Input placeholder="territory-admin@company.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Conflict alert threshold</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
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

export default TerritoryManagement;
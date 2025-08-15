import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Wrench,
  Plus,
  Edit,
  Trash2,
  Copy,
  Save,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Star,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Target,
  Zap,
  Building2,
  Home,
  Settings,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Hash,
  Percent
} from 'lucide-react';

interface ServiceType {
  id: string;
  name: string;
  description: string;
  category: 'construction' | 'design' | 'consultation' | 'maintenance' | 'custom';
  isActive: boolean;
  pricing: {
    type: 'fixed' | 'hourly' | 'project' | 'custom';
    baseRate?: number;
    currency: string;
    minRate?: number;
    maxRate?: number;
  };
  duration: {
    estimated: number;
    unit: 'hours' | 'days' | 'weeks' | 'months';
    isFlexible: boolean;
  };
  requirements: string[];
  skills: string[];
  materials: string[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  stats: {
    totalProjects: number;
    avgRating: number;
    totalRevenue: number;
    completionRate: number;
  };
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  serviceCount: number;
  isActive: boolean;
}

const ServiceTypes: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  // Mock service types
  const serviceTypes: ServiceType[] = [
    {
      id: 'ST001',
      name: 'Residential Construction',
      description: 'Complete residential building construction from foundation to finish',
      category: 'construction',
      isActive: true,
      pricing: {
        type: 'project',
        baseRate: 150000,
        currency: 'USD',
        minRate: 100000,
        maxRate: 500000
      },
      duration: {
        estimated: 6,
        unit: 'months',
        isFlexible: true
      },
      requirements: [
        'Building permits',
        'Site preparation',
        'Utility connections',
        'Safety compliance'
      ],
      skills: [
        'Foundation work',
        'Framing',
        'Electrical',
        'Plumbing',
        'Finishing'
      ],
      materials: [
        'Concrete',
        'Lumber',
        'Roofing materials',
        'Insulation',
        'Drywall'
      ],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-01T10:00:00Z',
      stats: {
        totalProjects: 45,
        avgRating: 4.8,
        totalRevenue: 6750000,
        completionRate: 96.5
      }
    },
    {
      id: 'ST002',
      name: 'Commercial Office Build-out',
      description: 'Interior construction and fit-out for commercial office spaces',
      category: 'construction',
      isActive: true,
      pricing: {
        type: 'hourly',
        baseRate: 85,
        currency: 'USD',
        minRate: 50,
        maxRate: 150
      },
      duration: {
        estimated: 8,
        unit: 'weeks',
        isFlexible: true
      },
      requirements: [
        'Building codes compliance',
        'ADA compliance',
        'Fire safety systems',
        'HVAC coordination'
      ],
      skills: [
        'Commercial carpentry',
        'Ceiling installation',
        'Flooring',
        'Electrical systems',
        'Data cabling'
      ],
      materials: [
        'Drywall',
        'Flooring materials',
        'Ceiling tiles',
        'Paint',
        'Hardware'
      ],
      createdBy: 'manager@company.com',
      createdAt: '2024-01-02T14:30:00Z',
      stats: {
        totalProjects: 67,
        avgRating: 4.6,
        totalRevenue: 3420000,
        completionRate: 94.2
      }
    },
    {
      id: 'ST003',
      name: 'Architectural Design Services',
      description: 'Complete architectural design from concept to construction documents',
      category: 'design',
      isActive: true,
      pricing: {
        type: 'project',
        baseRate: 25000,
        currency: 'USD',
        minRate: 15000,
        maxRate: 100000
      },
      duration: {
        estimated: 12,
        unit: 'weeks',
        isFlexible: true
      },
      requirements: [
        'Client brief',
        'Site survey',
        'Zoning compliance',
        'Building code review'
      ],
      skills: [
        'AutoCAD',
        'Revit',
        'SketchUp',
        'Structural design',
        'Building codes'
      ],
      materials: [
        'Design software',
        'Printing materials',
        'Survey equipment',
        'Presentation materials'
      ],
      createdBy: 'design@company.com',
      createdAt: '2024-01-03T09:15:00Z',
      stats: {
        totalProjects: 123,
        avgRating: 4.9,
        totalRevenue: 4920000,
        completionRate: 98.1
      }
    },
    {
      id: 'ST004',
      name: 'Project Management Consultation',
      description: 'Professional project management services for construction projects',
      category: 'consultation',
      isActive: true,
      pricing: {
        type: 'hourly',
        baseRate: 125,
        currency: 'USD',
        minRate: 100,
        maxRate: 200
      },
      duration: {
        estimated: 3,
        unit: 'months',
        isFlexible: true
      },
      requirements: [
        'PMP certification',
        'Construction experience',
        'Schedule development',
        'Risk assessment'
      ],
      skills: [
        'Project planning',
        'Risk management',
        'Cost control',
        'Quality assurance',
        'Stakeholder management'
      ],
      materials: [
        'Project management software',
        'Documentation templates',
        'Reporting tools',
        'Communication platforms'
      ],
      createdBy: 'pm@company.com',
      createdAt: '2024-01-04T11:45:00Z',
      stats: {
        totalProjects: 89,
        avgRating: 4.7,
        totalRevenue: 2234000,
        completionRate: 97.8
      }
    },
    {
      id: 'ST005',
      name: 'Facility Maintenance Services',
      description: 'Ongoing maintenance and repair services for completed projects',
      category: 'maintenance',
      isActive: false,
      pricing: {
        type: 'fixed',
        baseRate: 2500,
        currency: 'USD',
        minRate: 1500,
        maxRate: 5000
      },
      duration: {
        estimated: 12,
        unit: 'months',
        isFlexible: false
      },
      requirements: [
        'Maintenance agreement',
        'Emergency response capability',
        'Licensed technicians',
        'Insurance coverage'
      ],
      skills: [
        'HVAC maintenance',
        'Electrical repair',
        'Plumbing',
        'General carpentry',
        'Preventive maintenance'
      ],
      materials: [
        'Maintenance supplies',
        'Replacement parts',
        'Cleaning materials',
        'Safety equipment'
      ],
      createdBy: 'maintenance@company.com',
      createdAt: '2024-01-05T16:20:00Z',
      stats: {
        totalProjects: 234,
        avgRating: 4.4,
        totalRevenue: 1872000,
        completionRate: 92.5
      }
    }
  ];

  // Mock categories
  const categories: ServiceCategory[] = [
    {
      id: 'CAT001',
      name: 'Construction',
      description: 'Building and construction services',
      icon: 'Building2',
      color: 'blue',
      serviceCount: 12,
      isActive: true
    },
    {
      id: 'CAT002',
      name: 'Design',
      description: 'Architectural and design services',
      icon: 'Target',
      color: 'purple',
      serviceCount: 8,
      isActive: true
    },
    {
      id: 'CAT003',
      name: 'Consultation',
      description: 'Professional consulting services',
      icon: 'Users',
      color: 'green',
      serviceCount: 6,
      isActive: true
    },
    {
      id: 'CAT004',
      name: 'Maintenance',
      description: 'Ongoing maintenance and support',
      icon: 'Wrench',
      color: 'orange',
      serviceCount: 4,
      isActive: true
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'construction': return 'bg-blue-100 text-blue-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'consultation': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'construction': return Building2;
      case 'design': return Target;
      case 'consultation': return Users;
      case 'maintenance': return Wrench;
      case 'custom': return Settings;
      default: return Wrench;
    }
  };

  const filteredServices = serviceTypes.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = showInactive || service.isActive;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleService = (serviceId: string) => {
    console.log('Toggling service:', serviceId);
  };

  const handleDeleteService = (serviceId: string) => {
    console.log('Deleting service:', serviceId);
  };

  const handleDuplicateService = (serviceId: string) => {
    console.log('Duplicating service:', serviceId);
  };

  const createService = () => {
    setIsCreatingService(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Service Types</h1>
          <p className="text-muted-foreground mt-2">
            Manage service offerings and pricing structures
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={createService}>
            <Plus className="h-4 w-4 mr-2" />
            New Service
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Services</p>
                <p className="text-2xl font-bold">{serviceTypes.length}</p>
                <p className="text-xs text-muted-foreground">
                  {serviceTypes.filter(s => s.isActive).length} active
                </p>
              </div>
              <Wrench className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">
                  {serviceTypes.reduce((sum, s) => sum + s.stats.totalProjects, 0)}
                </p>
                <p className="text-xs text-muted-foreground">All services</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${(serviceTypes.reduce((sum, s) => sum + s.stats.totalRevenue, 0) / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground">All time</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {(serviceTypes.reduce((sum, s) => sum + s.stats.avgRating, 0) / serviceTypes.length).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Out of 5.0</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Service Types</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Types</CardTitle>
              <CardDescription>
                Manage service offerings, pricing, and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="construction">Construction</option>
                  <option value="design">Design</option>
                  <option value="consultation">Consultation</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="custom">Custom</option>
                </select>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={showInactive}
                    onCheckedChange={setShowInactive}
                  />
                  <Label className="text-sm">Show Inactive</Label>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-4">
                {filteredServices.map((service) => {
                  const CategoryIcon = getCategoryIcon(service.category);
                  
                  return (
                    <Card key={service.id} className={`${!service.isActive ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-2 rounded-lg ${service.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                              <CategoryIcon className={`h-6 w-6 ${service.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              {/* Header */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{service.name}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {service.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getCategoryColor(service.category)}>
                                    {service.category}
                                  </Badge>
                                  <Badge variant="outline">
                                    {service.pricing.type} pricing
                                  </Badge>
                                  <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {service.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                </div>
                              </div>

                              {/* Pricing & Duration */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Pricing</p>
                                  <p className="text-sm text-muted-foreground">
                                    {service.pricing.type === 'fixed' && `$${service.pricing.baseRate?.toLocaleString()} fixed`}
                                    {service.pricing.type === 'hourly' && `$${service.pricing.baseRate}/hour`}
                                    {service.pricing.type === 'project' && `$${service.pricing.minRate?.toLocaleString()} - $${service.pricing.maxRate?.toLocaleString()}`}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Duration</p>
                                  <p className="text-sm text-muted-foreground">
                                    {service.duration.estimated} {service.duration.unit}
                                    {service.duration.isFlexible && ' (flexible)'}
                                  </p>
                                </div>
                              </div>

                              {/* Stats */}
                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Activity className="h-3 w-3" />
                                  <span>{service.stats.totalProjects} projects</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  <span>{service.stats.avgRating}/5.0 rating</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>${(service.stats.totalRevenue / 1000000).toFixed(1)}M revenue</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>{service.stats.completionRate}% completion</span>
                                </div>
                              </div>

                              {/* Skills & Materials */}
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium">Required Skills</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {service.skills.slice(0, 3).map((skill) => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                    {service.skills.length > 3 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{service.skills.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            <Switch
                              checked={service.isActive}
                              onCheckedChange={() => handleToggleService(service.id)}
                            />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingService(service.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDuplicateService(service.id)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No service types found</h3>
                  <p className="text-muted-foreground mt-2">
                    No services match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
              <CardDescription>
                Organize services into logical categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-${category.color}-100`}>
                            <Building2 className={`h-5 w-5 text-${category.color}-600`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {category.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {category.serviceCount} services
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
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

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Type Settings</CardTitle>
              <CardDescription>
                Configure service type management preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-currency">Default Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-approve New Services</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve new service types
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Pricing</Label>
                      <p className="text-sm text-muted-foreground">
                        Make pricing mandatory for all services
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notification-email">Notification Email</Label>
                    <Input
                      id="notification-email"
                      type="email"
                      defaultValue="admin@company.com"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email for service type notifications
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Service Analytics</Label>
                      <p className="text-sm text-muted-foreground">
                        Track service performance metrics
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Client Visibility</Label>
                      <p className="text-sm text-muted-foreground">
                        Show services in client portal
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceTypes;
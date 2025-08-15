import { useState, useMemo } from 'react';
import {
  Map as MapIcon,
  Search,
  Filter,
  Layers,
  MapPin,
  Navigation,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  Download,
  RefreshCw,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  User,
  Building2,
  DollarSign,
  Target,
  Activity,
  TrendingUp,
  Users,
  Globe,
  Compass,
  Route,
  Calendar,
  Clock,
  Star,
  Plus,
  List,
  Grid,
  MoreHorizontal,
  Info,
  Share2,
  Bookmark
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface LeadLocation {
  id: string;
  name: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  temperature: 'hot' | 'warm' | 'cold';
  priority: 'high' | 'medium' | 'low';
  score: number;
  budget: string;
  estimatedValue: number;
  assignedTo: {
    name: string;
    avatar: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    pincode: string;
  };
  createdAt: Date;
  lastActivity: Date;
  nextAction?: {
    type: string;
    date: Date;
  };
  projectType: string;
  source: string;
}

interface LocationCluster {
  id: string;
  lat: number;
  lng: number;
  leads: LeadLocation[];
  totalValue: number;
  avgScore: number;
  city: string;
  state: string;
}

interface MapLayer {
  id: string;
  name: string;
  description: string;
  visible: boolean;
  color: string;
  type: 'heatmap' | 'clusters' | 'routes' | 'territories';
}

// Mock data
const mockLeadLocations: LeadLocation[] = [
  {
    id: 'L001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    contact: 'John Smith',
    phone: '+1 555-123-4567',
    email: 'john@acme.com',
    status: 'qualified',
    temperature: 'hot',
    priority: 'high',
    score: 85,
    budget: '$50K - $100K',
    estimatedValue: 75000,
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    location: {
      address: '123 Business Park',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      pincode: '10001'
    },
    createdAt: new Date(2024, 0, 10),
    lastActivity: new Date(2024, 0, 18),
    nextAction: { type: 'call', date: new Date(2024, 0, 25) },
    projectType: 'Commercial Building',
    source: 'Website'
  },
  {
    id: 'L002',
    name: 'TechStart Inc',
    company: 'TechStart Inc',
    contact: 'Emily Davis',
    phone: '+1 555-987-6543',
    email: 'emily@techstart.com',
    status: 'proposal',
    temperature: 'warm',
    priority: 'medium',
    score: 72,
    budget: '$100K - $250K',
    estimatedValue: 175000,
    assignedTo: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    location: {
      address: '456 Tech Valley',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      lat: 37.7749,
      lng: -122.4194,
      pincode: '94102'
    },
    createdAt: new Date(2024, 0, 8),
    lastActivity: new Date(2024, 0, 17),
    nextAction: { type: 'meeting', date: new Date(2024, 0, 26) },
    projectType: 'Office Complex',
    source: 'Referral'
  },
  {
    id: 'L003',
    name: 'Global Industries',
    company: 'Global Industries',
    contact: 'Robert Wilson',
    phone: '+1 555-456-7890',
    email: 'r.wilson@global.com',
    status: 'contacted',
    temperature: 'cold',
    priority: 'low',
    score: 67,
    budget: '$25K - $50K',
    estimatedValue: 37500,
    assignedTo: { name: 'Lisa Wang', avatar: '/avatars/lisa.jpg' },
    location: {
      address: '789 Industrial Ave',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      lat: 41.8781,
      lng: -87.6298,
      pincode: '60601'
    },
    createdAt: new Date(2024, 0, 5),
    lastActivity: new Date(2024, 0, 12),
    projectType: 'Warehouse',
    source: 'Cold Call'
  }
];

const defaultLayers: MapLayer[] = [
  {
    id: 'leads',
    name: 'Lead Markers',
    description: 'Individual lead locations',
    visible: true,
    color: '#3B82F6',
    type: 'clusters'
  },
  {
    id: 'heatmap',
    name: 'Lead Density',
    description: 'Heat map showing lead concentration',
    visible: false,
    color: '#EF4444',
    type: 'heatmap'
  },
  {
    id: 'territories',
    name: 'Sales Territories',
    description: 'Sales territory boundaries',
    visible: false,
    color: '#10B981',
    type: 'territories'
  },
  {
    id: 'routes',
    name: 'Visit Routes',
    description: 'Optimized visit routes',
    visible: false,
    color: '#F59E0B',
    type: 'routes'
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusColor(status: LeadLocation['status']) {
  switch (status) {
    case 'new': return 'bg-gray-500';
    case 'contacted': return 'bg-blue-500';
    case 'qualified': return 'bg-amber-500';
    case 'proposal': return 'bg-purple-500';
    case 'negotiation': return 'bg-pink-500';
    case 'won': return 'bg-emerald-500';
    case 'lost': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
}

function getTemperatureColor(temperature: LeadLocation['temperature']) {
  switch (temperature) {
    case 'hot': return 'border-red-500 shadow-red-200';
    case 'warm': return 'border-amber-500 shadow-amber-200';
    case 'cold': return 'border-blue-500 shadow-blue-200';
    default: return 'border-gray-500 shadow-gray-200';
  }
}

function getPriorityIcon(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high': return '🔴';
    case 'medium': return '🟡';
    case 'low': return '🟢';
  }
}

function LeadMapMarker({ lead, onClick }: { lead: LeadLocation; onClick: () => void }) {
  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all hover:scale-110 hover:shadow-lg",
        "w-8 h-8 rounded-full border-2 shadow-md",
        getStatusColor(lead.status),
        getTemperatureColor(lead.temperature)
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
        {getPriorityIcon(lead.priority)}
      </div>
      
      {/* Pulse animation for hot leads */}
      {lead.temperature === 'hot' && (
        <div className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping" />
      )}
    </div>
  );
}

function LeadInfoCard({ lead }: { lead: LeadLocation }) {
  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {getInitials(lead.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{lead.name}</CardTitle>
              <CardDescription>{lead.company}</CardDescription>
            </div>
          </div>
          <Badge className={cn("text-white", getStatusColor(lead.status))}>
            {lead.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-gray-400" />
            <span>{lead.contact}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-400" />
            <span>{lead.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span>{lead.location.city}, {lead.location.state}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 py-2 border-t border-b">
          <div>
            <p className="text-xs text-gray-500">Lead Score</p>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{lead.score}/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Estimated Value</p>
            <p className="text-sm font-medium">${lead.estimatedValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Temperature</p>
            <Badge variant="outline" className={cn(
              "text-xs capitalize",
              lead.temperature === 'hot' && "border-red-200 text-red-700",
              lead.temperature === 'warm' && "border-amber-200 text-amber-700",
              lead.temperature === 'cold' && "border-blue-200 text-blue-700"
            )}>
              {lead.temperature}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-gray-500">Assigned To</p>
            <div className="flex items-center space-x-1">
              <Avatar className="h-4 w-4">
                <AvatarImage src={lead.assignedTo.avatar} />
                <AvatarFallback className="text-xs">
                  {getInitials(lead.assignedTo.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{lead.assignedTo.name}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Mail className="h-3 w-3 mr-1" />
            Email
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <MessageSquare className="h-3 w-3 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MapLegend({ layers, onLayerToggle }: { layers: MapLayer[]; onLayerToggle: (layerId: string) => void }) {
  return (
    <Card className="absolute top-4 right-4 w-64 z-10">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center">
          <Layers className="h-4 w-4 mr-2" />
          Map Layers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              <div>
                <p className="text-sm font-medium">{layer.name}</p>
                <p className="text-xs text-gray-500">{layer.description}</p>
              </div>
            </div>
            <Switch
              checked={layer.visible}
              onCheckedChange={() => onLayerToggle(layer.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function LocationInsights({ leads }: { leads: LeadLocation[] }) {
  const insights = useMemo(() => {
    const cityStats = leads.reduce((acc, lead) => {
      const city = lead.location.city;
      if (!acc[city]) {
        acc[city] = { count: 0, totalValue: 0, avgScore: 0, statuses: {} };
      }
      acc[city].count += 1;
      acc[city].totalValue += lead.estimatedValue;
      acc[city].avgScore += lead.score;
      
      const status = lead.status;
      acc[city].statuses[status] = (acc[city].statuses[status] || 0) + 1;
      
      return acc;
    }, {} as any);

    // Calculate averages and sort by total value
    const cityInsights = Object.entries(cityStats).map(([city, stats]: [string, any]) => ({
      city,
      count: stats.count,
      totalValue: stats.totalValue,
      avgScore: Math.round(stats.avgScore / stats.count),
      conversionRate: ((stats.statuses.won || 0) / stats.count) * 100,
      topStatus: Object.entries(stats.statuses).sort((a: any, b: any) => b[1] - a[1])[0]?.[0]
    })).sort((a, b) => b.totalValue - a.totalValue);

    return cityInsights.slice(0, 5); // Top 5 cities
  }, [leads]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Location Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.city} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{insight.city}</h4>
                <Badge variant="secondary">{insight.count} leads</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Total Value</p>
                  <p className="font-medium">${(insight.totalValue / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Avg Score</p>
                  <p className="font-medium">{insight.avgScore}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Conversion</p>
                  <p className="font-medium">{insight.conversionRate.toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="mt-2">
                <Progress value={insight.conversionRate} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MapControls({ onZoomIn, onZoomOut, onReset, onRoute }: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onRoute: () => void;
}) {
  return (
    <Card className="absolute bottom-4 right-4 z-10">
      <CardContent className="p-2">
        <div className="flex flex-col space-y-2">
          <Tooltip content="Zoom In">
            <Button size="sm" variant="outline" onClick={onZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Zoom Out">
            <Button size="sm" variant="outline" onClick={onZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Reset View">
            <Button size="sm" variant="outline" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Separator />
          <Tooltip content="Plan Route">
            <Button size="sm" variant="outline" onClick={onRoute}>
              <Route className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadMapView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [selectedLead, setSelectedLead] = useState<LeadLocation | null>(null);
  const [mapLayers, setMapLayers] = useState(defaultLayers);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Center of USA
  const [mapZoom, setMapZoom] = useState(4);

  const filteredLeads = useMemo(() => {
    return mockLeadLocations.filter(lead => {
      const matchesSearch = !searchQuery || 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
      const matchesAssignee = filterAssignee === 'all' || lead.assignedTo.name === filterAssignee;
      
      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [searchQuery, filterStatus, filterAssignee]);

  const handleLayerToggle = (layerId: string) => {
    setMapLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleMarkerClick = (lead: LeadLocation) => {
    setSelectedLead(lead);
    setMapCenter({ lat: lead.location.lat, lng: lead.location.lng });
    setMapZoom(12);
  };

  const mapStats = useMemo(() => {
    const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
    const avgScore = filteredLeads.length > 0 
      ? filteredLeads.reduce((sum, lead) => sum + lead.score, 0) / filteredLeads.length 
      : 0;
    const hotLeads = filteredLeads.filter(lead => lead.temperature === 'hot').length;
    const highPriority = filteredLeads.filter(lead => lead.priority === 'high').length;
    
    return { totalValue, avgScore, hotLeads, highPriority };
  }, [filteredLeads]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Lead Map</h1>
              <Badge variant="secondary">{filteredLeads.length} locations</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search leads or locations..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r flex flex-col">
            {/* Stats */}
            <div className="p-4 border-b">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Total Value</p>
                        <p className="text-lg font-bold">${(mapStats.totalValue / 1000000).toFixed(1)}M</p>
                      </div>
                      <DollarSign className="h-5 w-5 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Avg Score</p>
                        <p className="text-lg font-bold">{Math.round(mapStats.avgScore)}</p>
                      </div>
                      <Target className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Hot Leads</p>
                        <p className="text-lg font-bold">{mapStats.hotLeads}</p>
                      </div>
                      <Activity className="h-5 w-5 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">High Priority</p>
                        <p className="text-lg font-bold">{mapStats.highPriority}</p>
                      </div>
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Location Insights */}
            <div className="p-4">
              <LocationInsights leads={filteredLeads} />
            </div>

            {/* Lead List */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Leads on Map</h3>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className={cn(
                        "p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50",
                        selectedLead?.id === lead.id && "ring-2 ring-primary bg-blue-50"
                      )}
                      onClick={() => handleMarkerClick(lead)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{lead.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{lead.company}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {lead.location.city}, {lead.location.state}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={cn("text-xs", getStatusColor(lead.status), "text-white")}>
                            {lead.status}
                          </Badge>
                          <span className="text-xs font-medium">
                            ${(lead.estimatedValue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative">
            {/* Map Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                  backgroundSize: '20px 20px'
                }} />
              </div>
              
              {/* Map markers simulation */}
              <div className="relative w-full h-full">
                {filteredLeads.map((lead, index) => (
                  <div
                    key={lead.id}
                    className="absolute"
                    style={{
                      left: `${30 + (index * 15) % 60}%`,
                      top: `${20 + (index * 20) % 60}%`
                    }}
                  >
                    <LeadMapMarker
                      lead={lead}
                      onClick={() => handleMarkerClick(lead)}
                    />
                  </div>
                ))}
              </div>
              
              {/* Center message */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <Globe className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-600 text-lg font-medium">Interactive Map View</p>
                  <p className="text-gray-500 text-sm">Map integration would display here</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Google Maps / Mapbox / OpenStreetMap integration
                  </p>
                </div>
              </div>
            </div>

            {/* Map Overlays */}
            <MapLegend layers={mapLayers} onLayerToggle={handleLayerToggle} />
            
            <MapControls
              onZoomIn={() => setMapZoom(prev => Math.min(prev + 1, 18))}
              onZoomOut={() => setMapZoom(prev => Math.max(prev - 1, 1))}
              onReset={() => {
                setMapCenter({ lat: 39.8283, lng: -98.5795 });
                setMapZoom(4);
                setSelectedLead(null);
              }}
              onRoute={() => {
                // Route planning functionality
                console.log('Planning route for selected leads');
              }}
            />

            {/* Selected Lead Info */}
            {selectedLead && (
              <div className="absolute bottom-4 left-4 z-10">
                <LeadInfoCard lead={selectedLead} />
              </div>
            )}

            {/* Compass */}
            <div className="absolute top-4 left-4 z-10">
              <Card className="w-16 h-16">
                <CardContent className="p-0 flex items-center justify-center h-full">
                  <Compass className="h-8 w-8 text-gray-600" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default LeadMapView;
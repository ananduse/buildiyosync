import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  X,
  Save,
  Star,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Building2,
  Phone,
  Mail,
  Target,
  Activity,
  Clock,
  Tag,
  ChevronDown,
  Sliders,
  BookmarkPlus,
  History,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Types
interface SearchFilter {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in' | 'is_null' | 'is_not_null';
  value: any;
  label: string;
}

interface SavedSearch {
  id: string;
  name: string;
  description: string;
  filters: SearchFilter[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  createdBy: string;
  usageCount: number;
  isFavorite: boolean;
}

interface Lead {
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
  source: string;
  industry: string;
  projectType: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  assignedTo: {
    name: string;
    avatar: string;
  };
  createdAt: Date;
  lastActivity: Date;
  nextAction?: {
    type: string;
    date: Date;
    description: string;
  };
  tags: string[];
}

interface SearchField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'number' | 'date' | 'daterange' | 'boolean';
  options?: { value: string; label: string; }[];
  category: string;
}

// Mock data
const searchFields: SearchField[] = [
  // Basic Info
  { id: 'name', label: 'Lead Name', type: 'text', category: 'Basic Info' },
  { id: 'company', label: 'Company', type: 'text', category: 'Basic Info' },
  { id: 'contact', label: 'Contact Person', type: 'text', category: 'Basic Info' },
  { id: 'email', label: 'Email', type: 'text', category: 'Basic Info' },
  { id: 'phone', label: 'Phone', type: 'text', category: 'Basic Info' },
  
  // Classification
  { 
    id: 'status', 
    label: 'Status', 
    type: 'select', 
    category: 'Classification',
    options: [
      { value: 'new', label: 'New' },
      { value: 'contacted', label: 'Contacted' },
      { value: 'qualified', label: 'Qualified' },
      { value: 'proposal', label: 'Proposal' },
      { value: 'negotiation', label: 'Negotiation' },
      { value: 'won', label: 'Won' },
      { value: 'lost', label: 'Lost' }
    ]
  },
  { 
    id: 'temperature', 
    label: 'Temperature', 
    type: 'select', 
    category: 'Classification',
    options: [
      { value: 'hot', label: 'Hot' },
      { value: 'warm', label: 'Warm' },
      { value: 'cold', label: 'Cold' }
    ]
  },
  { 
    id: 'priority', 
    label: 'Priority', 
    type: 'select', 
    category: 'Classification',
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ]
  },
  
  // Metrics
  { id: 'score', label: 'Lead Score', type: 'number', category: 'Metrics' },
  { id: 'estimatedValue', label: 'Estimated Value', type: 'number', category: 'Metrics' },
  
  // Location
  { id: 'city', label: 'City', type: 'text', category: 'Location' },
  { id: 'state', label: 'State', type: 'text', category: 'Location' },
  { id: 'country', label: 'Country', type: 'text', category: 'Location' },
  
  // Business
  { 
    id: 'industry', 
    label: 'Industry', 
    type: 'select', 
    category: 'Business',
    options: [
      { value: 'construction', label: 'Construction' },
      { value: 'real-estate', label: 'Real Estate' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'retail', label: 'Retail' },
      { value: 'technology', label: 'Technology' }
    ]
  },
  { 
    id: 'projectType', 
    label: 'Project Type', 
    type: 'select', 
    category: 'Business',
    options: [
      { value: 'commercial', label: 'Commercial Building' },
      { value: 'residential', label: 'Residential' },
      { value: 'industrial', label: 'Industrial' },
      { value: 'office', label: 'Office Complex' }
    ]
  },
  { 
    id: 'source', 
    label: 'Lead Source', 
    type: 'select', 
    category: 'Business',
    options: [
      { value: 'website', label: 'Website' },
      { value: 'referral', label: 'Referral' },
      { value: 'social-media', label: 'Social Media' },
      { value: 'cold-call', label: 'Cold Call' },
      { value: 'email', label: 'Email Campaign' }
    ]
  },
  
  // Dates
  { id: 'createdAt', label: 'Created Date', type: 'daterange', category: 'Dates' },
  { id: 'lastActivity', label: 'Last Activity', type: 'daterange', category: 'Dates' },
  { id: 'nextActionDate', label: 'Next Action Date', type: 'daterange', category: 'Dates' },
  
  // Assignment
  { id: 'assignedTo', label: 'Assigned To', type: 'text', category: 'Assignment' }
];

const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    name: 'Hot Qualified Leads',
    description: 'High-priority qualified leads with temperature hot',
    filters: [
      { id: '1', field: 'status', operator: 'equals', value: 'qualified', label: 'Status equals Qualified' },
      { id: '2', field: 'temperature', operator: 'equals', value: 'hot', label: 'Temperature equals Hot' },
      { id: '3', field: 'score', operator: 'greater_than', value: 70, label: 'Score greater than 70' }
    ],
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 20),
    isPublic: true,
    createdBy: 'Sarah Johnson',
    usageCount: 45,
    isFavorite: true
  },
  {
    id: '2',
    name: 'High Value Prospects',
    description: 'Leads with estimated value over $100K',
    filters: [
      { id: '1', field: 'estimatedValue', operator: 'greater_than', value: 100000, label: 'Value > $100K' },
      { id: '2', field: 'status', operator: 'in', value: ['qualified', 'proposal', 'negotiation'], label: 'Status in pipeline' }
    ],
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 18),
    isPublic: false,
    createdBy: 'Mike Chen',
    usageCount: 23,
    isFavorite: false
  }
];

const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Acme Corporation Project',
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
    source: 'website',
    industry: 'construction',
    projectType: 'commercial',
    location: { city: 'New York', state: 'NY', country: 'USA' },
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    createdAt: new Date(2024, 0, 10),
    lastActivity: new Date(2024, 0, 18),
    nextAction: { type: 'call', date: new Date(2024, 0, 25), description: 'Follow-up call' },
    tags: ['urgent', 'high-value', 'corporate']
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusColor(status: Lead['status']) {
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

function FilterRow({ 
  filter, 
  onUpdate, 
  onRemove, 
  fields 
}: { 
  filter: SearchFilter; 
  onUpdate: (filter: SearchFilter) => void; 
  onRemove: () => void;
  fields: SearchField[];
}) {
  const selectedField = fields.find(f => f.id === filter.field);
  
  const operators = useMemo(() => {
    if (!selectedField) return [];
    
    switch (selectedField.type) {
      case 'text':
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'starts_with', label: 'Starts with' },
          { value: 'ends_with', label: 'Ends with' }
        ];
      case 'number':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'greater_than', label: 'Greater than' },
          { value: 'less_than', label: 'Less than' },
          { value: 'between', label: 'Between' }
        ];
      case 'select':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'in', label: 'In' }
        ];
      case 'date':
      case 'daterange':
        return [
          { value: 'equals', label: 'On' },
          { value: 'greater_than', label: 'After' },
          { value: 'less_than', label: 'Before' },
          { value: 'between', label: 'Between' }
        ];
      default:
        return [{ value: 'equals', label: 'Equals' }];
    }
  }, [selectedField]);

  return (
    <div className="flex items-center space-x-2 p-3 border rounded-lg bg-gray-50">
      <Select value={filter.field} onValueChange={(value) => onUpdate({ ...filter, field: value })}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(
            fields.reduce((groups, field) => ({
              ...groups,
              [field.category]: [...(groups[field.category] || []), field]
            }), {} as Record<string, SearchField[]>)
          ).map(([category, categoryFields]) => (
            <div key={category}>
              <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                {category}
              </div>
              {categoryFields.map((field) => (
                <SelectItem key={field.id} value={field.id}>
                  {field.label}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>

      <Select value={filter.operator} onValueChange={(value: any) => onUpdate({ ...filter, operator: value })}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {operators.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Value Input */}
      {selectedField?.type === 'text' && (
        <Input
          value={filter.value || ''}
          onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
          placeholder="Enter value..."
          className="flex-1"
        />
      )}
      
      {selectedField?.type === 'number' && (
        <Input
          type="number"
          value={filter.value || ''}
          onChange={(e) => onUpdate({ ...filter, value: parseInt(e.target.value) || 0 })}
          placeholder="Enter number..."
          className="flex-1"
        />
      )}
      
      {selectedField?.type === 'select' && selectedField.options && (
        <Select value={filter.value} onValueChange={(value) => onUpdate({ ...filter, value })}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {selectedField.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="text-red-600 hover:text-red-700"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

function SavedSearchCard({ savedSearch, onLoad, onDelete }: { 
  savedSearch: SavedSearch; 
  onLoad: () => void;
  onDelete: () => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onLoad}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold">{savedSearch.name}</h4>
              {savedSearch.isFavorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              {savedSearch.isPublic && <Badge variant="secondary" className="text-xs">Public</Badge>}
            </div>
            <p className="text-sm text-gray-600 mb-2">{savedSearch.description}</p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{savedSearch.filters.length} filters</span>
              <span>{savedSearch.usageCount} uses</span>
              <span>by {savedSearch.createdBy}</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onLoad(); }}>
                <Eye className="h-4 w-4 mr-2" />
                Load Search
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

function LeadResultCard({ lead }: { lead: Lead }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                {getInitials(lead.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold">{lead.name}</h4>
                <Badge className={cn("text-white text-xs", getStatusColor(lead.status))}>
                  {lead.status}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{lead.company}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3 text-gray-400" />
                    <span>{lead.contact}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span>{lead.location.city}, {lead.location.state}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3 text-gray-400" />
                    <span>Score: {lead.score}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3 text-gray-400" />
                    <span>${lead.estimatedValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Building2 className="h-3 w-3 text-gray-400" />
                    <span>{lead.projectType}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-3">
                {lead.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={lead.assignedTo.avatar} />
                <AvatarFallback className="text-xs">
                  {getInitials(lead.assignedTo.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500">{lead.assignedTo.name}</span>
            </div>
            
            <div className="flex space-x-1">
              <Button size="sm" variant="outline">
                <Phone className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdvancedLeadSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [savedSearches, setSavedSearches] = useState(mockSavedSearches);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchResults, setSearchResults] = useState<Lead[]>(mockLeads);
  const [isSearching, setIsSearching] = useState(false);

  const addFilter = () => {
    const newFilter: SearchFilter = {
      id: Date.now().toString(),
      field: 'name',
      operator: 'contains',
      value: '',
      label: 'Name contains'
    };
    setFilters([...filters, newFilter]);
  };

  const updateFilter = (index: number, updatedFilter: SearchFilter) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const clearAllFilters = () => {
    setFilters([]);
    setSearchQuery('');
  };

  const executeSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockLeads);
      setIsSearching(false);
    }, 1000);
  };

  const loadSavedSearch = (savedSearch: SavedSearch) => {
    setFilters(savedSearch.filters);
    setSearchQuery('');
    executeSearch();
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Advanced Lead Search</h1>
              <Badge variant="secondary">{searchResults.length} results</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-screen">
          {/* Left Sidebar - Search Builder */}
          <div className="w-96 bg-white border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Quick search leads..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Advanced Filters</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addFilter}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Filter
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {filters.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Filter className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No filters applied</p>
                    <p className="text-sm">Add filters to refine your search</p>
                  </div>
                ) : (
                  filters.map((filter, index) => (
                    <FilterRow
                      key={filter.id}
                      filter={filter}
                      onUpdate={(updatedFilter) => updateFilter(index, updatedFilter)}
                      onRemove={() => removeFilter(index)}
                      fields={searchFields}
                    />
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-3">
              <div className="flex space-x-2">
                <Button
                  className="flex-1"
                  onClick={executeSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(true)}
                  disabled={filters.length === 0}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </div>
              
              {filters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Tabs */}
            <Tabs defaultValue="results" className="flex-1 flex flex-col">
              <TabsList className="w-fit m-4 mb-0">
                <TabsTrigger value="results">Search Results</TabsTrigger>
                <TabsTrigger value="saved">Saved Searches</TabsTrigger>
                <TabsTrigger value="history">Search History</TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="flex-1 p-4 pt-0">
                <div className="space-y-4">
                  {/* Active Filters Display */}
                  {filters.length > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Active Filters</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                          >
                            Clear All
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {filters.map((filter, index) => (
                            <Badge key={filter.id} variant="secondary" className="px-3 py-1">
                              {filter.label}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-2 hover:bg-transparent"
                                onClick={() => removeFilter(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Search Results */}
                  <div className="space-y-4">
                    {searchResults.map((lead) => (
                      <LeadResultCard key={lead.id} lead={lead} />
                    ))}
                    
                    {searchResults.length === 0 && (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                          <h3 className="text-lg font-semibold mb-2">No results found</h3>
                          <p className="text-gray-500 mb-4">
                            Try adjusting your search criteria or remove some filters
                          </p>
                          <Button variant="outline" onClick={clearAllFilters}>
                            Clear Filters
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="saved" className="flex-1 p-4 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Saved Searches</h3>
                    <Button size="sm">
                      <BookmarkPlus className="h-4 w-4 mr-2" />
                      New Search
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedSearches.map((savedSearch) => (
                      <SavedSearchCard
                        key={savedSearch.id}
                        savedSearch={savedSearch}
                        onLoad={() => loadSavedSearch(savedSearch)}
                        onDelete={() => setSavedSearches(savedSearches.filter(s => s.id !== savedSearch.id))}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="flex-1 p-4 pt-0">
                <Card>
                  <CardContent className="p-12 text-center">
                    <History className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">Search History</h3>
                    <p className="text-gray-500">Your recent searches will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Save Search Dialog */}
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Search</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="search-name">Search Name</Label>
                <Input id="search-name" placeholder="Enter search name..." />
              </div>
              
              <div>
                <Label htmlFor="search-description">Description</Label>
                <Input id="search-description" placeholder="Describe this search..." />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="public-search" />
                <Label htmlFor="public-search">Make this search public</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="favorite-search" />
                <Label htmlFor="favorite-search">Add to favorites</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowSaveDialog(false)}>
                  Save Search
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default AdvancedLeadSearch;
import { useState, useMemo } from 'react';
import {
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Download,
  Upload,
  Grid3X3,
  List,
  Map as MapIcon,
  ChevronDown,
  X,
  MessageSquare,
  Activity,
  DollarSign,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { SimpleFilter, SimpleFilterRule } from '@/components/filters/simple-filter';
import { LEAD_FILTER_FIELDS } from '@/components/filters/filter-fields';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';

interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  budget: string;
  projectType: string;
  location: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  lastContact: string;
  nextFollowUp: string;
  createdDate: string;
}

const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    contact: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@acme.com',
    source: 'Website',
    score: 85,
    status: 'qualified',
    budget: '$50K - $100K',
    projectType: 'Commercial Building',
    location: 'New York, NY',
    assignedTo: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg'
    },
    lastContact: '2024-01-15',
    nextFollowUp: '2024-01-20',
    createdDate: '2024-01-10'
  },
  {
    id: 'L002',
    name: 'TechStart Inc',
    company: 'TechStart Inc',
    contact: 'Emily Davis',
    phone: '+1 (555) 987-6543',
    email: 'emily@techstart.com',
    source: 'Referral',
    score: 92,
    status: 'proposal',
    budget: '$100K - $250K',
    projectType: 'Office Complex',
    location: 'San Francisco, CA',
    assignedTo: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg'
    },
    lastContact: '2024-01-14',
    nextFollowUp: '2024-01-18',
    createdDate: '2024-01-08'
  },
  {
    id: 'L003',
    name: 'Global Industries',
    company: 'Global Industries',
    contact: 'Robert Wilson',
    phone: '+1 (555) 456-7890',
    email: 'r.wilson@global.com',
    source: 'Cold Call',
    score: 67,
    status: 'contacted',
    budget: '$25K - $50K',
    projectType: 'Warehouse',
    location: 'Chicago, IL',
    assignedTo: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg'
    },
    lastContact: '2024-01-12',
    nextFollowUp: '2024-01-22',
    createdDate: '2024-01-05'
  }
];

function getStatusColor(status: Lead['status']) {
  const colors = {
    new: 'bg-gray-100 text-gray-800',
    contacted: 'bg-blue-100 text-blue-800',
    qualified: 'bg-yellow-100 text-yellow-800',
    proposal: 'bg-orange-100 text-orange-800',
    negotiation: 'bg-purple-100 text-purple-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800'
  };
  return colors[status];
}

function getStatusLabel(status: Lead['status']) {
  const labels = {
    new: 'New',
    contacted: 'Contacted',
    qualified: 'Qualified',
    proposal: 'Proposal Sent',
    negotiation: 'Negotiation',
    won: 'Won',
    lost: 'Lost'
  };
  return labels[status];
}

function LeadScoreStars({ score }: { score: number }) {
  const stars = Math.round(score / 20); // Convert 0-100 to 0-5 stars
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{score}</span>
    </div>
  );
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  return (
    <Collapsible open={isOpen}>
      <CollapsibleContent>
        <Card className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Lead Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Lead Status</label>
                <div className="space-y-2">
                  {['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox id={status.toLowerCase()} />
                      <label htmlFor={status.toLowerCase()} className="text-sm">{status}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lead Source */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Lead Source</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="cold-call">Cold Call</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assigned To */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Assigned To</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All team members" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="lisa">Lisa Wang</SelectItem>
                    <SelectItem value="david">David Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Save Filter</Button>
              <Button variant="ghost" size="sm">Clear All</Button>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ActionsCell({ row }: { row: Row<Lead> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/leads/${row.original.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/leads/${row.original.id}/activities`}>
            <Activity className="h-4 w-4 mr-2" />
            Activities
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/leads/${row.original.id}/communications`}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Communications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/leads/${row.original.id}/convert`}>
            <Edit className="h-4 w-4 mr-2" />
            Convert to Project
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Lead
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AllLeadsContent() {
  const [view, setView] = useState<'list' | 'kanban' | 'calendar' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SimpleFilterRule[]>([]);
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: SimpleFilterRule[]; }[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdDate', desc: true },
  ]);

  // Apply filters function
  const applyFilters = (lead: any, filterRules: SimpleFilterRule[]) => {
    if (filterRules.length === 0) return true;
    
    let result = true;
    let currentGroup = true;
    let currentConnector: 'AND' | 'OR' = 'AND';
    
    for (let i = 0; i < filterRules.length; i++) {
      const rule = filterRules[i];
      const fieldValue = lead[rule.field];
      let ruleResult = false;
      
      // Apply operator logic
      switch (rule.operator) {
        case 'equals':
          ruleResult = fieldValue === rule.value;
          break;
        case 'not_equals':
          ruleResult = fieldValue !== rule.value;
          break;
        case 'contains':
          ruleResult = String(fieldValue).toLowerCase().includes(String(rule.value).toLowerCase());
          break;
        case 'not_contains':
          ruleResult = !String(fieldValue).toLowerCase().includes(String(rule.value).toLowerCase());
          break;
        case 'starts_with':
          ruleResult = String(fieldValue).toLowerCase().startsWith(String(rule.value).toLowerCase());
          break;
        case 'ends_with':
          ruleResult = String(fieldValue).toLowerCase().endsWith(String(rule.value).toLowerCase());
          break;
        case 'greater_than':
          ruleResult = Number(fieldValue) > Number(rule.value);
          break;
        case 'less_than':
          ruleResult = Number(fieldValue) < Number(rule.value);
          break;
        case 'is_empty':
          ruleResult = !fieldValue || fieldValue === '';
          break;
        case 'is_not_empty':
          ruleResult = fieldValue && fieldValue !== '';
          break;
        case 'is_true':
          ruleResult = Boolean(fieldValue) === true;
          break;
        case 'is_false':
          ruleResult = Boolean(fieldValue) === false;
          break;
        default:
          ruleResult = true;
      }
      
      // Apply connector logic
      if (i === 0) {
        currentGroup = ruleResult;
      } else {
        if (rule.connector === 'OR') {
          currentGroup = currentGroup || ruleResult;
        } else {
          currentGroup = currentGroup && ruleResult;
        }
      }
    }
    
    return currentGroup;
  };

  // Filter data based on search and advanced filters
  const filteredData = useMemo(() => {
    return mockLeads.filter((lead) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        lead.name.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower) ||
        lead.contact.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.location.toLowerCase().includes(searchLower);
      
      // Advanced filters
      const matchesFilters = applyFilters(lead, filters);
      
      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  // Handle save filter
  const handleSaveFilter = (name: string, filterRules: SimpleFilterRule[]) => {
    setSavedFilters(prev => [...prev, { name, filters: filterRules }]);
  };

  // Handle load filter
  const handleLoadFilter = (filterRules: SimpleFilterRule[]) => {
    setFilters(filterRules);
  };

  // Define columns for the data grid
  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        id: 'select',
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        id: 'lead',
        accessorFn: (row) => row.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Lead Name" column={column} />
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">{row.original.company}</p>
            <Badge variant="outline" className="text-xs mt-1">{row.original.source}</Badge>
          </div>
        ),
        enableSorting: true,
        size: 250,
      },
      {
        id: 'contact',
        accessorFn: (row) => row.contact,
        header: ({ column }) => (
          <DataGridColumnHeader title="Contact" column={column} />
        ),
        cell: ({ row }) => (
          <div className="space-y-1">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-sm">{row.original.contact}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto hover:text-primary cursor-pointer text-xs"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`tel:${row.original.phone}`, '_self');
              }}
            >
              <Phone className="h-3 w-3 mr-1" />
              {row.original.phone}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto hover:text-primary cursor-pointer text-xs block"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${row.original.email}`, '_self');
              }}
            >
              <Mail className="h-3 w-3 mr-1" />
              {row.original.email.length > 20 ? `${row.original.email.slice(0, 20)}...` : row.original.email}
            </Button>
          </div>
        ),
        enableSorting: true,
        size: 220,
      },
      {
        id: 'score',
        accessorFn: (row) => row.score,
        header: ({ column }) => (
          <DataGridColumnHeader title="Score" column={column} />
        ),
        cell: ({ row }) => <LeadScoreStars score={row.original.score} />,
        enableSorting: true,
        size: 120,
      },
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => (
          <Badge className={getStatusColor(row.original.status)}>
            {getStatusLabel(row.original.status)}
          </Badge>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: 'budget',
        accessorFn: (row) => row.budget,
        header: ({ column }) => (
          <DataGridColumnHeader title="Budget" column={column} />
        ),
        cell: ({ row }) => (
          <div>
            <div className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="font-medium">{row.original.budget}</span>
            </div>
            <p className="text-xs text-muted-foreground">{row.original.projectType}</p>
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'assignedTo',
        accessorFn: (row) => row.assignedTo.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Assigned To" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={row.original.assignedTo.avatar} />
              <AvatarFallback className="text-xs">
                {row.original.assignedTo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{row.original.assignedTo.name}</span>
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: 'location',
        accessorFn: (row) => row.location,
        header: ({ column }) => (
          <DataGridColumnHeader title="Location" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center text-sm">
            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{row.original.location}</span>
          </div>
        ),
        enableSorting: true,
        size: 150,
      },
      {
        id: 'nextFollowUp',
        accessorFn: (row) => row.nextFollowUp,
        header: ({ column }) => (
          <DataGridColumnHeader title="Follow-up" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{row.original.nextFollowUp}</span>
            </div>
            <p className="text-xs text-muted-foreground">Next follow-up</p>
          </div>
        ),
        enableSorting: true,
        size: 140,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ActionsCell row={row} />,
        enableSorting: false,
        size: 50,
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: Lead) => row.id,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-tight">All Leads</h1>
          <Badge variant="secondary">{filteredData.length} total</Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* View Switcher */}
          <div className="flex border rounded-lg p-1">
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('kanban')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('calendar')}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('map')}
            >
              <MapIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter */}
          <SimpleFilter
            fields={LEAD_FILTER_FIELDS}
            filters={filters}
            onFiltersChange={setFilters}
            savedFilters={savedFilters}
            onSaveFilter={handleSaveFilter}
            onLoadFilter={handleLoadFilter}
          />

          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search leads..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        </div>

        {/* Bulk Actions */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} selected
            </span>
            <Button variant="outline" size="sm">Assign</Button>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>


      {/* Data Grid */}
      <DataGrid
        table={table}
        recordCount={filteredData.length}
        tableLayout={{
          cellBorder: false,
          rowBorder: true,
          stripped: false,
          headerBorder: true,
          headerBackground: true,
          columnsResizable: true,
        }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <DataGridTable />
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <DataGridPagination />
      </DataGrid>
    </div>
  );
}
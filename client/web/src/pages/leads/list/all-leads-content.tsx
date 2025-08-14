import { useState, useMemo } from 'react';
import {
  Plus,
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
  Upload,
  Grid3X3,
  List,
  Map as MapIcon,
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
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
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

// Generate consistent initials from a name
function getInitials(fullName: string): string {
  if (!fullName) {
    return '';
  }
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${(parts[0][0] || '').toUpperCase()}${(parts[1][0] || '').toUpperCase()}`;
}

// Convert a string to a visually distinct, stable HSL color
function stringToHslColor(input: string, saturation = 65, lightness = 55): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
  // eslint-disable-next-line no-bitwise
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
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

function getStatusGradient(status: Lead['status']) {
  const map: Record<Lead['status'], string> = {
    new: 'bg-gradient-to-r from-slate-500 to-slate-600 text-white',
    contacted: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    qualified: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
    proposal: 'bg-gradient-to-r from-orange-500 to-rose-500 text-white',
    negotiation: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    won: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    lost: 'bg-gradient-to-r from-red-500 to-rose-600 text-white',
  };
  return map[status];
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
    
    let currentGroup = true;
    
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
        cell: ({ row }) => {
          const initials = getInitials(row.original.name);
          const bg = stringToHslColor(row.original.name);
          return (
            <HoverCard openDelay={120}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Avatar className="h-8 w-8 ring-1 ring-border shadow-sm">
                    <AvatarImage src="" />
                    <AvatarFallback
                      className="text-[10px] font-semibold text-white"
                      style={{ backgroundColor: bg }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none hover:underline">{row.original.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{row.original.company}</span>
                      <Badge className={`${getStatusGradient(row.original.status)} text-[10px] px-1.5 py-0.5 border-0`}> 
                        {getStatusLabel(row.original.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10 ring-1 ring-border shadow">
                    <AvatarImage src="" />
                    <AvatarFallback
                      className="text-xs font-semibold text-white"
                      style={{ backgroundColor: bg }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="font-semibold">{row.original.name}</p>
                    <p className="text-xs text-muted-foreground">{row.original.company}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {row.original.location}</div>
                      <div className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> Next: {row.original.nextFollowUp}</div>
                      <div className="flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" /> {row.original.phone}</div>
                      <div className="flex items-center gap-1 text-muted-foreground"><Mail className="h-3 w-3" /> {row.original.email}</div>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        },
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
        cell: ({ row }) => {
          const initials = getInitials(row.original.assignedTo.name);
          const bg = stringToHslColor(row.original.assignedTo.name, 60, 50);
          return (
            <HoverCard openDelay={120}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-7 w-7 ring-1 ring-border shadow-sm">
                    <AvatarImage src={row.original.assignedTo.avatar} />
                    <AvatarFallback
                      className="text-[10px] font-semibold text-white"
                      style={{ backgroundColor: bg }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm hover:underline">{row.original.assignedTo.name}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 ring-1 ring-border shadow">
                    <AvatarImage src={row.original.assignedTo.avatar} />
                    <AvatarFallback
                      className="text-xs font-semibold text-white"
                      style={{ backgroundColor: bg }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{row.original.assignedTo.name}</p>
                    <p className="text-xs text-muted-foreground">Owner</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        },
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
              variant={view === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'kanban' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('kanban')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'calendar' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setView('calendar')}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'map' ? 'primary' : 'ghost'}
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
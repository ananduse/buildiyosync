import { useState, useMemo, useEffect } from 'react';
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
  User,
  Filter,
  Download,
  Settings,
  RefreshCw,
  X,
  CheckSquare,
  Copy,
  ExternalLink,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileText,
  Users
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
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
     
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }
   
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
  },
  {
    id: 'L004',
    name: 'Creative Solutions Ltd',
    company: 'Creative Solutions',
    contact: 'Sarah Martinez',
    phone: '+1 (555) 234-5678',
    email: 'sarah.m@creative.com',
    source: 'Social Media',
    score: 78,
    status: 'new',
    budget: '$75K - $150K',
    projectType: 'Retail Space',
    location: 'Austin, TX',
    assignedTo: {
      name: 'David Brown',
      avatar: '/avatars/david.jpg'
    },
    lastContact: '2024-01-16',
    nextFollowUp: '2024-01-19',
    createdDate: '2024-01-12'
  },
  {
    id: 'L005',
    name: 'Innovation Hub',
    company: 'Innovation Hub',
    contact: 'Michael Chen',
    phone: '+1 (555) 345-6789',
    email: 'michael@innovationhub.com',
    source: 'Website',
    score: 95,
    status: 'won',
    budget: '$200K - $500K',
    projectType: 'Technology Center',
    location: 'Seattle, WA',
    assignedTo: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg'
    },
    lastContact: '2024-01-17',
    nextFollowUp: '2024-01-21',
    createdDate: '2024-01-09'
  },
  {
    id: 'L006',
    name: 'Metro Developers',
    company: 'Metro Developers',
    contact: 'Lisa Thompson',
    phone: '+1 (555) 456-7891',
    email: 'lisa.t@metrodev.com',
    source: 'Referral',
    score: 43,
    status: 'lost',
    budget: '$30K - $60K',
    projectType: 'Residential',
    location: 'Denver, CO',
    assignedTo: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg'
    },
    lastContact: '2024-01-11',
    nextFollowUp: '2024-01-25',
    createdDate: '2024-01-06'
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

function ActionsCell({ row, onDelete }: { row: Row<Lead>; onDelete: (lead: Lead) => void }) {
  const [isCallActive, setIsCallActive] = useState(false);
  
  const handleCall = () => {
    setIsCallActive(true);
    window.open(`tel:${row.original.phone}`, '_self');
    setTimeout(() => setIsCallActive(false), 3000);
  };

  const handleEmail = () => {
    window.open(`mailto:${row.original.email}`, '_self');
  };

  const handleWhatsApp = () => {
    const phoneNumber = row.original.phone.replace(/\D/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleCopyInfo = () => {
    const info = `${row.original.name}\n${row.original.contact}\n${row.original.phone}\n${row.original.email}`;
    navigator.clipboard.writeText(info);
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Quick Actions */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className={`h-8 w-8 p-0 ${isCallActive ? 'bg-green-100 text-green-600' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCall();
              }}
            >
              <Phone className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Call Lead</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleEmail();
              }}
            >
              <Mail className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Send Email</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleWhatsApp();
              }}
            >
              <MessageSquare className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>WhatsApp</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link to={`/leads/${row.original.id}/view`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/leads/${row.original.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Lead
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={`/leads/${row.original.id}/activities`}>
              <Activity className="h-4 w-4 mr-2" />
              View Activities
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/leads/${row.original.id}/communications`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Communications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopyInfo}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Info
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/leads/${row.original.id}/convert`}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Convert to Project
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-red-600 focus:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row.original);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Lead
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function AllLeadsContent() {
  const [view, setView] = useState<'list' | 'kanban' | 'calendar' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SimpleFilterRule[]>([]);
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: SimpleFilterRule[]; }[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdDate', desc: true },
  ]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');

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

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Handle bulk actions
  const handleBulkDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log('Bulk deleting:', selectedRows.map(row => row.original.id));
    table.resetRowSelection();
  };

  const handleBulkAssign = (assignee: string) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log('Bulk assigning to:', assignee, selectedRows.map(row => row.original.id));
    table.resetRowSelection();
  };

  const handleBulkStatusChange = (status: string) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log('Bulk status change to:', status, selectedRows.map(row => row.original.id));
    table.resetRowSelection();
  };

  // Handle export
  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const dataToExport = selectedRows.length > 0 
      ? selectedRows.map(row => row.original)
      : filteredData;
    console.log(`Exporting ${dataToExport.length} leads as ${format}`);
  };

  // Handle delete lead
  const handleDeleteLead = (lead: Lead) => {
    setLeadToDelete(lead);
    setShowDeleteDialog(true);
  };

  const confirmDeleteLead = () => {
    if (leadToDelete) {
      console.log('Deleting lead:', leadToDelete.id);
      setShowDeleteDialog(false);
      setLeadToDelete(null);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Trigger search with 300ms delay
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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
        cell: ({ row }) => <ActionsCell row={row} onDelete={handleDeleteLead} />,
        enableSorting: false,
        size: 120,
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
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold tracking-tight">All Leads</h1>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{filteredData.length} total</Badge>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Badge variant="outline">
                  {table.getFilteredSelectedRowModel().rows.length} selected
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            {/* Export Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('excel')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Switcher */}
            <div className="flex border rounded-lg p-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('list')}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>List View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'kanban' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('kanban')}
                      className="h-8 w-8 p-0"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Kanban View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'calendar' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('calendar')}
                      className="h-8 w-8 p-0"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Calendar View</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'map' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('map')}
                      className="h-8 w-8 p-0"
                    >
                      <MapIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Map View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Import</span>
            </Button>

            <Button size="sm" asChild>
              <Link to="/leads/new">
                <Plus className="h-4 w-4 mr-2" />
                New Lead
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
              <SelectItem value="cold_call">Cold Call</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All Assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="mike">Mike Chen</SelectItem>
              <SelectItem value="lisa">Lisa Wang</SelectItem>
              <SelectItem value="david">David Brown</SelectItem>
            </SelectContent>
          </Select>

          {/* Advanced Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            className={filterPanelOpen ? 'bg-muted' : ''}
          >
            <Filter className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Filters</span>
            {filters.length > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {filters.length}
              </Badge>
            )}
          </Button>

          {/* Clear Filters */}
          {(selectedStatus !== 'all' || selectedSource !== 'all' || selectedAssignee !== 'all' || filters.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedStatus('all');
                setSelectedSource('all');
                setSelectedAssignee('all');
                setFilters([]);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {filterPanelOpen && (
          <Card>
            <CardContent className="p-4">
              <SimpleFilter
                fields={LEAD_FILTER_FIELDS}
                filters={filters}
                onFiltersChange={setFilters}
                savedFilters={savedFilters}
                onSaveFilter={handleSaveFilter}
                onLoadFilter={handleLoadFilter}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced Search and Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {/* Enhanced Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search leads by name, company, email..."
              className="pl-10 w-full sm:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Page Size Selector */}
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => setPagination(prev => ({ ...prev, pageSize: parseInt(value), pageIndex: 0 }))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions Bar */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Card className="w-full sm:w-auto">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {table.getFilteredSelectedRowModel().rows.length} of {filteredData.length} selected
                </span>
                
                {/* Bulk Assign */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Assign
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAssign('sarah')}>
                      <User className="h-4 w-4 mr-2" />
                      Sarah Johnson
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAssign('mike')}>
                      <User className="h-4 w-4 mr-2" />
                      Mike Chen
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAssign('lisa')}>
                      <User className="h-4 w-4 mr-2" />
                      Lisa Wang
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAssign('david')}>
                      <User className="h-4 w-4 mr-2" />
                      David Brown
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Bulk Status Change */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4 mr-2" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange('contacted')}>
                      Mark as Contacted
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange('qualified')}>
                      Mark as Qualified
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange('proposal')}>
                      Mark as Proposal Sent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange('won')}>
                      Mark as Won
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange('lost')}>
                      Mark as Lost
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Bulk Export */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Selected
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as Excel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Bulk Delete */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>

                {/* Clear Selection */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => table.resetRowSelection()}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>


      {/* Enhanced Data Grid */}
      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <DataGrid
          table={table}
          recordCount={filteredData.length}
          tableLayout={{
            cellBorder: false,
            rowBorder: true,
            stripped: true,
            headerBorder: true,
            headerBackground: true,
            columnsResizable: true,
          }}
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <DataGridTable className="min-w-full" />
              </div>
              
              {/* Empty State */}
              {filteredData.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No leads found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filters.length > 0 || selectedStatus !== 'all' 
                      ? "Try adjusting your search or filters"
                      : "Get started by creating your first lead"
                    }
                  </p>
                  {(!searchQuery && filters.length === 0 && selectedStatus === 'all') && (
                    <Button asChild>
                      <Link to="/leads/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Lead
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Pagination */}
          <DataGridPagination />
        </DataGrid>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the lead{" "}
              <span className="font-semibold">{leadToDelete?.name}</span>?
              This action cannot be undone and will remove all associated data including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Contact information</li>
                <li>Communication history</li>
                <li>Activities and notes</li>
                <li>Documents and attachments</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteLead}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Lead
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
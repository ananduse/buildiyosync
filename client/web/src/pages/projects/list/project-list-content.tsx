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
  Users,
  Building2,
  HardHat,
  Briefcase,
  Home,
  Factory,
  TreePine,
  Shield,
  ClipboardCheck,
  Hammer,
  Wrench,
  CircleDollarSign,
  Timer,
  Target,
  Award,
  AlertCircle,
  TrendingDown
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
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Progress } from '@/components/ui/progress';

interface Project {
  id: string;
  name: string;
  customer: {
    name: string;
    type: 'self-registered' | 'company-created';
    avatar?: string;
  };
  projectType: 'commercial' | 'residential' | 'infrastructure' | 'industrial' | 'renovation';
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  phase: 'design' | 'permits' | 'foundation' | 'construction' | 'finishing' | 'handover';
  budget: {
    total: number;
    spent: number;
    allocated: number;
  };
  timeline: {
    startDate: string;
    endDate: string;
    progress: number;
  };
  location: string;
  projectManager: {
    name: string;
    avatar?: string;
  };
  team: {
    employees: number;
    contractors: number;
    vendors: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  risks: number;
  issues: number;
  compliance: {
    safety: number;
    regulatory: number;
  };
  lastDPR: string;
  nextMilestone: string;
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

// Generate 200 sample projects
const generateMockProjects = (): Project[] => {
  const projectNames = [
    'Skyline Tower', 'Green Valley Residential', 'Metro Plaza', 'Harbor View Complex', 'Mountain Ridge Homes',
    'Riverside Apartments', 'Central Business Tower', 'Sunset Boulevard Mall', 'Innovation Hub', 'Tech Park',
    'Medical Center Expansion', 'University Campus', 'Sports Complex', 'Convention Center', 'Airport Terminal',
    'Bridge Reconstruction', 'Highway Extension', 'Tunnel Project', 'Railway Station', 'Port Facility',
    'Shopping District', 'Entertainment Complex', 'Hotel Resort', 'Office Park', 'Industrial Zone',
    'Warehouse Facility', 'Distribution Center', 'Manufacturing Plant', 'Data Center', 'Research Lab',
    'School Building', 'Hospital Wing', 'Community Center', 'Library Renovation', 'Museum Extension',
    'Theater Restoration', 'Stadium Upgrade', 'Arena Development', 'Aquatic Center', 'Recreation Park',
    'Residential Complex', 'Mixed-Use Development', 'Urban Renewal', 'Historic Preservation', 'Eco Village',
    'Smart City Project', 'Solar Farm', 'Wind Power Station', 'Water Treatment Plant', 'Power Grid Upgrade'
  ];

  const customerNames = [
    'Metropolitan Development Corp', 'Global Construction Inc', 'Premier Builders', 'Urban Developers',
    'Innovative Structures', 'BuildRight Partners', 'Construction Masters', 'Development Solutions',
    'Property Investments Group', 'Real Estate Ventures', 'Commercial Properties LLC', 'Residential Builders',
    'Infrastructure Partners', 'City Planning Dept', 'State Development Agency', 'Federal Projects Office',
    'International Builders', 'Local Contractors Union', 'Regional Development Fund', 'National Construction',
    'Alpha Builders', 'Beta Development', 'Gamma Properties', 'Delta Construction', 'Epsilon Ventures',
    'Zeta Holdings', 'Eta Investments', 'Theta Builders', 'Iota Development', 'Kappa Properties',
    'Lambda Construction', 'Mu Ventures', 'Nu Holdings', 'Xi Investments', 'Omicron Builders',
    'Pi Development', 'Rho Properties', 'Sigma Construction', 'Tau Ventures', 'Upsilon Holdings',
    'Phi Investments', 'Chi Builders', 'Psi Development', 'Omega Properties', 'Apex Construction'
  ];

  const managerNames = [
    'Sarah Johnson', 'Mike Chen', 'Lisa Wang', 'David Brown', 'Emily Davis',
    'Robert Wilson', 'Jennifer Lee', 'James Smith', 'Maria Garcia', 'John Anderson',
    'Patricia Martinez', 'Michael Rodriguez', 'Linda Williams', 'Richard Jones', 'Barbara Taylor',
    'Thomas Moore', 'Nancy Jackson', 'Christopher White', 'Karen Harris', 'Daniel Martin',
    'Betty Thompson', 'Mark Lewis', 'Sandra Walker', 'Paul Hall', 'Ashley Allen',
    'Kenneth Young', 'Dorothy King', 'Steven Wright', 'Helen Lopez', 'Gary Hill',
    'Amy Scott', 'Brian Green', 'Melissa Adams', 'Ronald Baker', 'Stephanie Nelson',
    'Eric Carter', 'Anna Mitchell', 'Kevin Perez', 'Brenda Roberts', 'Jason Turner'
  ];

  const locations = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Boston, MA',
    'El Paso, TX', 'Detroit, MI', 'Nashville, TN', 'Portland, OR', 'Memphis, TN',
    'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD', 'Milwaukee, WI',
    'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Mesa, AZ', 'Sacramento, CA',
    'Atlanta, GA', 'Kansas City, MO', 'Colorado Springs, CO', 'Miami, FL', 'Raleigh, NC',
    'Omaha, NE', 'Long Beach, CA', 'Virginia Beach, VA', 'Oakland, CA', 'Minneapolis, MN'
  ];

  const milestones = [
    'Foundation Complete', 'Structure Framing', 'Roof Installation', 'Electrical Rough-in', 'Plumbing Installation',
    'HVAC Installation', 'Insulation Complete', 'Drywall Installation', 'Flooring Installation', 'Paint Complete',
    'Final Inspections', 'Permit Approval', 'Site Preparation', 'Excavation Complete', 'Concrete Pour',
    'Steel Erection', 'Facade Installation', 'Interior Fit-out', 'Landscaping', 'Project Handover',
    'Design Approval', 'Contractor Selection', 'Material Procurement', 'Quality Check', 'Safety Inspection',
    'Environmental Assessment', 'Utility Connections', 'Road Access', 'Parking Complete', 'Signage Installation'
  ];

  const projects: Project[] = [];
  const statuses: Project['status'][] = ['planning', 'active', 'on-hold', 'completed', 'cancelled'];
  const phases: Project['phase'][] = ['design', 'permits', 'foundation', 'construction', 'finishing', 'handover'];
  const types: Project['projectType'][] = ['commercial', 'residential', 'infrastructure', 'industrial', 'renovation'];
  const priorities: Project['priority'][] = ['low', 'medium', 'high', 'critical'];
  const customerTypes: ('self-registered' | 'company-created')[] = ['self-registered', 'company-created'];

  // Generate 200 projects
  for (let i = 1; i <= 200; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const phase = phases[Math.floor(Math.random() * phases.length)];
    const projectType = types[Math.floor(Math.random() * types.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const customerType = customerTypes[Math.floor(Math.random() * customerTypes.length)];
    
    const totalBudget = Math.floor(Math.random() * 20000000) + 500000;
    const progress = status === 'completed' ? 100 : 
                    status === 'cancelled' ? Math.floor(Math.random() * 30) :
                    status === 'planning' ? Math.floor(Math.random() * 15) :
                    Math.floor(Math.random() * 85) + 10;
    
    const spentPercentage = progress / 100 * (0.8 + Math.random() * 0.4); // 80-120% of progress
    const spent = Math.floor(totalBudget * spentPercentage);
    const allocated = Math.floor(totalBudget * (0.7 + Math.random() * 0.3));
    
    const startDate = new Date(2022 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const endDate = new Date(startDate.getTime() + (Math.random() * 1000 * 60 * 60 * 24 * 365 * 2)); // Up to 2 years
    
    const projectNumber = i.toString().padStart(3, '0');
    const projectNameIndex = Math.floor(Math.random() * projectNames.length);
    const suffix = i > 50 ? ` Phase ${Math.ceil((i - 50) / 50)}` : '';
    
    projects.push({
      id: `P${projectNumber}`,
      name: `${projectNames[projectNameIndex]}${suffix}`,
      customer: {
        name: customerNames[Math.floor(Math.random() * customerNames.length)],
        type: customerType
      },
      projectType,
      status,
      phase,
      budget: {
        total: totalBudget,
        spent,
        allocated
      },
      timeline: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        progress
      },
      location: locations[Math.floor(Math.random() * locations.length)],
      projectManager: {
        name: managerNames[Math.floor(Math.random() * managerNames.length)]
      },
      team: {
        employees: Math.floor(Math.random() * 50) + 5,
        contractors: Math.floor(Math.random() * 30) + 2,
        vendors: Math.floor(Math.random() * 15) + 1
      },
      priority,
      risks: priority === 'critical' ? Math.floor(Math.random() * 8) + 2 : Math.floor(Math.random() * 5),
      issues: status === 'on-hold' ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 3),
      compliance: {
        safety: Math.floor(Math.random() * 30) + 70, // 70-100
        regulatory: Math.floor(Math.random() * 35) + 65 // 65-100
      },
      lastDPR: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      nextMilestone: status === 'cancelled' ? 'N/A' : milestones[Math.floor(Math.random() * milestones.length)],
      createdDate: new Date(startDate.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }

  return projects;
};

const mockProjects: Project[] = generateMockProjects();

function getStatusColor(status: Project['status']) {
  const colors = {
    planning: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    'on-hold': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status];
}

function getStatusLabel(status: Project['status']) {
  const labels = {
    planning: 'Planning',
    active: 'Active',
    'on-hold': 'On Hold',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };
  return labels[status];
}

function getPhaseColor(phase: Project['phase']) {
  const colors = {
    design: 'bg-purple-100 text-purple-800',
    permits: 'bg-orange-100 text-orange-800',
    foundation: 'bg-amber-100 text-amber-800',
    construction: 'bg-blue-100 text-blue-800',
    finishing: 'bg-green-100 text-green-800',
    handover: 'bg-teal-100 text-teal-800'
  };
  return colors[phase];
}

function getPhaseLabel(phase: Project['phase']) {
  const labels = {
    design: 'Design',
    permits: 'Permits',
    foundation: 'Foundation',
    construction: 'Construction',
    finishing: 'Finishing',
    handover: 'Handover'
  };
  return labels[phase];
}

function getPriorityColor(priority: Project['priority']) {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };
  return colors[priority];
}

function getProjectTypeIcon(type: Project['projectType']) {
  const icons = {
    commercial: Building2,
    residential: Home,
    infrastructure: TreePine,
    industrial: Factory,
    renovation: Hammer
  };
  const Icon = icons[type];
  return <Icon className="h-4 w-4" />;
}

function ActionsCell({ row, onDelete }: { row: Row<Project>; onDelete: (project: Project) => void }) {
  const handleViewDPR = () => {
    console.log('View DPR for:', row.original.id);
  };

  const handleOpenChat = () => {
    console.log('Open chat for:', row.original.id);
  };

  const handleViewDocuments = () => {
    console.log('View documents for:', row.original.id);
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
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDPR();
              }}
            >
              <ClipboardCheck className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>View DPR</TooltipContent>
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
                handleOpenChat();
              }}
            >
              <MessageSquare className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Team Chat</TooltipContent>
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
                handleViewDocuments();
              }}
            >
              <FileText className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Documents</TooltipContent>
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
            <Link to={`/projects/${row.original.id}/details`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/projects/${row.original.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to={`/projects/${row.original.id}/team`}>
              <Users className="h-4 w-4 mr-2" />
              Team Management
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/projects/${row.original.id}/tasks`}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Tasks
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={`/projects/${row.original.id}/analytics`}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate Project
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ExternalLink className="h-4 w-4 mr-2" />
            Share with Customer
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
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function ProjectListContent() {
  const [view, setView] = useState<'list' | 'grid' | 'kanban' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SimpleFilterRule[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'project', desc: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return mockProjects.filter((project) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        project.name.toLowerCase().includes(searchLower) ||
        project.customer.name.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.projectManager.name.toLowerCase().includes(searchLower);
      
      // Status filter
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      
      // Type filter
      const matchesType = selectedType === 'all' || project.projectType === selectedType;
      
      // Priority filter
      const matchesPriority = selectedPriority === 'all' || project.priority === selectedPriority;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [searchQuery, selectedStatus, selectedType, selectedPriority]);

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

  const handleBulkAssign = (manager: string) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    console.log('Bulk assigning to:', manager, selectedRows.map(row => row.original.id));
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
    console.log(`Exporting ${dataToExport.length} projects as ${format}`);
  };

  // Handle delete project
  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      console.log('Deleting project:', projectToDelete.id);
      setShowDeleteDialog(false);
      setProjectToDelete(null);
    }
  };

  // Define columns for the data grid
  const columns = useMemo<ColumnDef<Project>[]>(
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
        id: 'project',
        accessorFn: (row) => row.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Project" column={column} />
        ),
        cell: ({ row }) => {
          const initials = getInitials(row.original.name);
          const bg = stringToHslColor(row.original.name);
          return (
            <HoverCard openDelay={120}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-1 ring-border shadow-sm">
                      <AvatarImage src="" />
                      <AvatarFallback
                        className="text-xs font-semibold text-white"
                        style={{ backgroundColor: bg }}
                      >
                        {getProjectTypeIcon(row.original.projectType)}
                      </AvatarFallback>
                    </Avatar>
                    {row.original.priority === 'critical' && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium leading-none hover:underline">{row.original.name}</p>
                      {row.original.customer.type === 'self-registered' && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          <User className="h-2 w-2 mr-1" />
                          Customer
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{row.original.customer.name}</span>
                      <Badge className={`${getStatusColor(row.original.status)} text-[10px] px-1.5 py-0.5 border-0`}> 
                        {getStatusLabel(row.original.status)}
                      </Badge>
                      <Badge className={`${getPhaseColor(row.original.phase)} text-[10px] px-1.5 py-0.5 border-0`}>
                        {getPhaseLabel(row.original.phase)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12 ring-1 ring-border shadow">
                      <AvatarImage src="" />
                      <AvatarFallback
                        className="text-sm font-semibold text-white"
                        style={{ backgroundColor: bg }}
                      >
                        {getProjectTypeIcon(row.original.projectType)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{row.original.name}</p>
                      <p className="text-sm text-muted-foreground">{row.original.customer.name}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getStatusColor(row.original.status)}>
                          {getStatusLabel(row.original.status)}
                        </Badge>
                        <Badge className={getPhaseColor(row.original.phase)}>
                          {getPhaseLabel(row.original.phase)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {row.original.location}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {row.original.timeline.startDate} - {row.original.timeline.endDate}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" /> {row.original.team.employees + row.original.team.contractors + row.original.team.vendors} team members
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Target className="h-3 w-3" /> {row.original.nextMilestone}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{row.original.timeline.progress}%</span>
                      </div>
                      <Progress value={row.original.timeline.progress} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Budget Used</span>
                        <span>${(row.original.budget.spent / 1000000).toFixed(1)}M / ${(row.original.budget.total / 1000000).toFixed(1)}M</span>
                      </div>
                      <Progress value={(row.original.budget.spent / row.original.budget.total) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        },
        enableSorting: true,
        size: 280,
      },
      {
        id: 'progress',
        accessorFn: (row) => row.timeline.progress,
        header: ({ column }) => (
          <DataGridColumnHeader title="Progress" column={column} />
        ),
        cell: ({ row }) => (
          <div className="w-20">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>{row.original.timeline.progress}%</span>
            </div>
            <Progress value={row.original.timeline.progress} className="h-2" />
          </div>
        ),
        enableSorting: true,
        size: 100,
      },
      {
        id: 'budget',
        accessorFn: (row) => row.budget.total,
        header: ({ column }) => (
          <DataGridColumnHeader title="Budget" column={column} />
        ),
        cell: ({ row }) => {
          const spent = row.original.budget.spent;
          const total = row.original.budget.total;
          const percentage = (spent / total) * 100;
          const isOverBudget = spent > row.original.budget.allocated;
          
          return (
            <div className="space-y-1">
              <div className="flex items-center">
                <CircleDollarSign className={`h-3 w-3 mr-1 ${isOverBudget ? 'text-red-500' : 'text-green-500'}`} />
                <span className="text-sm font-medium">
                  ${(total / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={percentage} className={`h-1.5 w-16 ${isOverBudget ? '[&>div]:bg-red-500' : ''}`} />
                <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
              </div>
            </div>
          );
        },
        enableSorting: true,
        size: 140,
      },
      {
        id: 'team',
        accessorFn: (row) => row.team.employees + row.team.contractors + row.team.vendors,
        header: ({ column }) => (
          <DataGridColumnHeader title="Team" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium border-2 border-white">
                      {row.original.team.employees}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{row.original.team.employees} Employees</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium border-2 border-white">
                      {row.original.team.contractors}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{row.original.team.contractors} Contractors</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium border-2 border-white">
                      {row.original.team.vendors}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{row.original.team.vendors} Vendors</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-xs text-muted-foreground">
              {row.original.team.employees + row.original.team.contractors + row.original.team.vendors} total
            </span>
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: 'projectManager',
        accessorFn: (row) => row.projectManager.name,
        header: ({ column }) => (
          <DataGridColumnHeader title="Project Manager" column={column} />
        ),
        cell: ({ row }) => {
          const initials = getInitials(row.original.projectManager.name);
          const bg = stringToHslColor(row.original.projectManager.name, 60, 50);
          return (
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 ring-1 ring-border shadow-sm">
                <AvatarImage src={row.original.projectManager.avatar} />
                <AvatarFallback
                  className="text-[10px] font-semibold text-white"
                  style={{ backgroundColor: bg }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{row.original.projectManager.name}</span>
            </div>
          );
        },
        enableSorting: true,
        size: 180,
      },
      {
        id: 'risks',
        accessorFn: (row) => row.risks + row.issues,
        header: ({ column }) => (
          <DataGridColumnHeader title="Risks & Issues" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.risks > 0 && (
              <Badge variant="outline" className="text-xs border-orange-200 bg-orange-50 text-orange-700">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {row.original.risks} risks
              </Badge>
            )}
            {row.original.issues > 0 && (
              <Badge variant="outline" className="text-xs border-red-200 bg-red-50 text-red-700">
                <AlertCircle className="h-3 w-3 mr-1" />
                {row.original.issues} issues
              </Badge>
            )}
            {row.original.risks === 0 && row.original.issues === 0 && (
              <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                Clear
              </Badge>
            )}
          </div>
        ),
        enableSorting: true,
        size: 160,
      },
      {
        id: 'compliance',
        accessorFn: (row) => (row.compliance.safety + row.compliance.regulatory) / 2,
        header: ({ column }) => (
          <DataGridColumnHeader title="Compliance" column={column} />
        ),
        cell: ({ row }) => {
          const avgCompliance = (row.original.compliance.safety + row.original.compliance.regulatory) / 2;
          const complianceColor = avgCompliance >= 95 ? 'text-green-600' : avgCompliance >= 80 ? 'text-yellow-600' : 'text-red-600';
          
          return (
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Shield className={`h-3 w-3 ${complianceColor}`} />
                <span className={`text-sm font-medium ${complianceColor}`}>
                  {avgCompliance.toFixed(0)}%
                </span>
              </div>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="text-[10px] px-1">
                        S: {row.original.compliance.safety}%
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Safety Compliance</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge variant="outline" className="text-[10px] px-1">
                        R: {row.original.compliance.regulatory}%
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Regulatory Compliance</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          );
        },
        enableSorting: true,
        size: 120,
      },
      {
        id: 'priority',
        accessorFn: (row) => row.priority,
        header: ({ column }) => (
          <DataGridColumnHeader title="Priority" column={column} />
        ),
        cell: ({ row }) => (
          <Badge className={getPriorityColor(row.original.priority)}>
            {row.original.priority.charAt(0).toUpperCase() + row.original.priority.slice(1)}
          </Badge>
        ),
        enableSorting: true,
        size: 100,
      },
      {
        id: 'lastDPR',
        accessorFn: (row) => row.lastDPR,
        header: ({ column }) => (
          <DataGridColumnHeader title="Last DPR" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-sm">
            <div className="flex items-center">
              <ClipboardCheck className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{row.original.lastDPR}</span>
            </div>
            <p className="text-xs text-muted-foreground">Daily Report</p>
          </div>
        ),
        enableSorting: true,
        size: 120,
      },
      {
        id: 'actions',
        header: '',
        cell: ({ row }) => <ActionsCell row={row} onDelete={handleDeleteProject} />,
        enableSorting: false,
        size: 140,
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: Project) => row.id,
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

  // Grid View Component
  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {table.getRowModel().rows.map((row) => {
        const project = row.original;
        const avgCompliance = (project.compliance.safety + project.compliance.regulatory) / 2;
        const budgetPercentage = (project.budget.spent / project.budget.total) * 100;
        
        return (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getProjectTypeIcon(project.projectType)}
                  </div>
                  <div>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{project.customer.name}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/projects/${project.id}/details`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/projects/${project.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Badge className={getStatusColor(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
                <Badge className={getPhaseColor(project.phase)}>
                  {getPhaseLabel(project.phase)}
                </Badge>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{project.timeline.progress}%</span>
                  </div>
                  <Progress value={project.timeline.progress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Budget</span>
                    <span>${(project.budget.spent / 1000000).toFixed(1)}M / ${(project.budget.total / 1000000).toFixed(1)}M</span>
                  </div>
                  <Progress 
                    value={budgetPercentage} 
                    className={`h-2 ${budgetPercentage > 90 ? '[&>div]:bg-red-500' : ''}`} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{project.team.employees + project.team.contractors + project.team.vendors}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.projectManager.avatar} />
                    <AvatarFallback className="text-[10px]">
                      {getInitials(project.projectManager.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{project.projectManager.name}</span>
                </div>
                <div className="flex gap-1">
                  {project.risks > 0 && (
                    <Badge variant="outline" className="text-[10px] px-1 border-orange-200">
                      {project.risks}R
                    </Badge>
                  )}
                  {project.issues > 0 && (
                    <Badge variant="outline" className="text-[10px] px-1 border-red-200">
                      {project.issues}I
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px] px-1">
                    {avgCompliance.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      {/* Enhanced Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
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
            {/* Add New Project */}
            <Button asChild>
              <Link to="/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>

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
                      variant={view === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('grid')}
                      className="h-8 w-8 p-0"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Grid View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects, customers, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Bulk Actions Bar */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">
              {table.getFilteredSelectedRowModel().rows.length} selected
            </span>
            <div className="flex gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => handleBulkAssign('manager')}>
                <Users className="h-4 w-4 mr-2" />
                Assign
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkStatusChange('active')}>
                <Activity className="h-4 w-4 mr-2" />
                Change Status
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:text-red-600"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => table.resetRowSelection()}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Data Display */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : view === 'list' ? (
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
        />
      ) : view === 'grid' ? (
        <>
          <GridView />
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, pageIndex: Math.max(0, prev.pageIndex - 1) }))}
                disabled={pagination.pageIndex === 0}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.pageIndex + 1} of {Math.ceil(filteredData.length / pagination.pageSize)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
                disabled={pagination.pageIndex >= Math.ceil(filteredData.length / pagination.pageSize) - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : null}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project "{projectToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProject} className="bg-red-600 hover:bg-red-700">
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
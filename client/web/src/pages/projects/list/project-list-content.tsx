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
import { DataGridTable } from '@/components/ui/data-grid-table';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { SimpleFilter, SimpleFilterRule } from '@/components/filters/simple-filter';
import {
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CardTable, CardFooter } from '@/components/ui/card';

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

// Import Tamil property projects data
import { tamilPropertyProjects } from '@/data/tamil-property-projects';
import { sampleProjects } from '@/data/sample-projects';

// Generate sample projects using real Indian data
const generateMockProjects = (): Project[] => {
  // Use actual Indian property projects as base
  const baseProjects = [...sampleProjects];
  
  // Tamil project names for additional variety
  const projectNames = [
    'Ramasamy House', 'Sundaram Villa', 'Moorthy Apartments', 'Gopal Residency', 'Murugan Complex',
    'Krishnan Villa Estate', 'Subramani Flats', 'Natarajan House', 'Kannan Towers', 'Selvam Garden',
    'Venkatesan Homes', 'Balaji Gardens', 'Ganesh Residency', 'Kumar Villa', 'Rajan Apartments',
    'Srinivasan Complex', 'Lakshmi Towers', 'Saravana Homes', 'Karthik Gardens', 'Senthil Flats',
    'Balamurugan Estate', 'Annamalai Residency', 'Dhanasekaran Villa', 'Easwaran Homes', 'Pandian Complex',
    'Arumugam Gardens', 'Kathiresan Towers', 'Manikandan Flats', 'Rajendran Estate', 'Sivakumar Homes',
    'Thangaraj Villa', 'Veeramani Complex', 'Muthukumar Gardens', 'Palani Residency', 'Ayyappan Towers',
    'Dhanapal Homes', 'Ganesan Estate', 'Jayaraman Flats', 'Kalidasan Complex', 'Manoharan Villa'
  ];

  const customerNames = [
    'Ramasamy Constructions', 'Sundaram Developers', 'Moorthy & Sons Builders', 'Gopal Estates Pvt Ltd',
    'Murugan Properties', 'Krishnan Developers', 'Subramani Constructions', 'Natarajan Builders',
    'Kannan Group', 'Selvam Developers', 'Venkatesan Builders', 'Balaji Constructions',
    'Ganesh Properties', 'Kumar Estates', 'Rajan Builders', 'Srinivasan Developers',
    'Lakshmi Constructions', 'Saravana Properties', 'Karthik Builders', 'Senthil Estates',
    'Balamurugan Developers', 'Annamalai Builders', 'Dhanasekaran Properties', 'Easwaran Constructions',
    'Pandian Estates', 'Arumugam Builders', 'Kathiresan Developers', 'Manikandan Properties',
    'Rajendran Builders', 'Sivakumar Constructions', 'Thangaraj Estates', 'Veeramani Developers',
    'Muthukumar Properties', 'Palani Builders', 'Ayyappan Constructions', 'Dhanapal Estates',
    'Ganesan Developers', 'Jayaraman Properties', 'Kalidasan Builders', 'Manoharan Constructions'
  ];

  const managerNames = [
    'Mr. P. Ramasamy', 'Mr. K. Sundaram', 'Mr. S. Moorthy', 'Mr. R. Gopal', 'Mr. V. Murugan',
    'Mr. T. Krishnan', 'Mr. P. Subramani', 'Mr. M. Natarajan', 'Mr. A. Selvam', 'Mr. S. Venkatesan',
    'Mr. R. Balaji', 'Mr. K. Ganesh', 'Mr. V. Kumar', 'Mr. N. Rajan', 'Mr. T. Srinivasan',
    'Mrs. L. Lakshmi', 'Mr. S. Saravanan', 'Mr. K. Karthik', 'Mr. M. Senthil', 'Mr. B. Balamurugan',
    'Mr. A. Annamalai', 'Mr. D. Dhanasekaran', 'Mr. E. Easwaran', 'Mr. P. Pandian', 'Mr. A. Arumugam',
    'Mr. K. Kathiresan', 'Mr. M. Manikandan', 'Mr. R. Rajendran', 'Mr. S. Sivakumar', 'Mr. T. Thangaraj',
    'Mr. V. Veeramani', 'Mr. M. Muthukumar', 'Mr. P. Palani', 'Mr. A. Ayyappan', 'Mr. D. Dhanapal',
    'Mr. G. Ganesan', 'Mr. J. Jayaraman', 'Mr. K. Kalidasan', 'Mr. M. Manoharan', 'Mrs. P. Priya'
  ];

  const locations = [
    'T. Nagar, Chennai', 'Velachery, Chennai', 'Adyar, Chennai', 'Besant Nagar, Chennai', 'Mylapore, Chennai',
    'Anna Nagar, Chennai', 'Nungambakkam, Chennai', 'Alwarpet, Chennai', 'Kodambakkam, Chennai', 'Vadapalani, Chennai',
    'Chromepet, Chennai', 'Tambaram, Chennai', 'Thoraipakkam, Chennai', 'Sholinganallur, Chennai', 'Perungudi, Chennai',
    'Guindy, Chennai', 'Saidapet, Chennai', 'Ashok Nagar, Chennai', 'K.K. Nagar, Chennai', 'West Mambalam, Chennai',
    'Porur, Chennai', 'Madipakkam, Chennai', 'Pallikaranai, Chennai', 'Medavakkam, Chennai', 'Nanganallur, Chennai',
    'Triplicane, Chennai', 'Royapettah, Chennai', 'Teynampet, Chennai', 'Raja Annamalaipuram, Chennai', 'Boat Club, Chennai',
    'ECR Road, Chennai', 'OMR Road, Chennai', 'GST Road, Chennai', 'Mount Road, Chennai', 'Poonamallee, Chennai',
    'Coimbatore, Tamil Nadu', 'Madurai, Tamil Nadu', 'Trichy, Tamil Nadu', 'Salem, Tamil Nadu', 'Tirunelveli, Tamil Nadu',
    'Kanchipuram, Tamil Nadu', 'Vellore, Tamil Nadu', 'Erode, Tamil Nadu', 'Tiruppur, Tamil Nadu', 'Thanjavur, Tamil Nadu'
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

  // First add all real Indian property projects
  baseProjects.forEach((project, index) => {
    const projectNumber = (index + 1).toString().padStart(3, '0');
    
    projects.push({
      id: project.id,
      projectNumber: `PRJ-${projectNumber}`,
      projectName: project.name,
      projectType: project.projectType as any || 'commercial',
      status: project.status as any,
      phase: project.currentPhase || 'construction',
      priority: project.priority as any,
      location: project.location,
      progress: project.progress,
      budget: {
        total: project.budget,
        spent: project.spent,
        allocated: Math.floor(project.budget * 0.85),
        currency: 'INR'
      },
      schedule: {
        startDate: project.startDate,
        endDate: project.endDate,
        actualStartDate: project.startDate,
        actualEndDate: project.status === 'completed' ? project.endDate : undefined,
        daysRemaining: Math.floor((new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        variance: project.riskLevel === 'high' ? -15 : project.riskLevel === 'medium' ? -5 : 2
      },
      customer: {
        id: `CUST-${projectNumber}`,
        name: project.client,
        type: 'company-created',
        contact: {
          email: `contact@${project.client.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: '+91 98765 43210',
          address: project.location
        },
        rating: 4 + Math.random(),
        totalProjects: Math.floor(Math.random() * 10) + 1
      },
      projectManager: {
        id: `PM-${projectNumber}`,
        name: project.manager,
        email: `${project.manager.toLowerCase().replace(/\s+/g, '.')}@buildiyosync.com`,
        phone: '+91 98765 12345',
        department: 'Project Management',
        avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${project.manager}`
      },
      team: {
        totalMembers: project.team.length + Math.floor(Math.random() * 20) + 10,
        keyMembers: project.team.map((member, idx) => ({
          id: `TM-${projectNumber}-${idx}`,
          name: member,
          role: 'Team Lead',
          avatar: `https://api.dicebear.com/7.x/personas/svg?seed=${member}`
        }))
      },
      stats: {
        tasksTotal: project.totalTasks || Math.floor(Math.random() * 200) + 50,
        tasksCompleted: project.completedTasks || Math.floor(Math.random() * 100) + 20,
        issuesOpen: Math.floor(Math.random() * 10),
        risksIdentified: project.activeRisks || Math.floor(Math.random() * 5),
        changeRequests: project.pendingApprovals || Math.floor(Math.random() * 3),
        documentsCount: project.documentsCount || Math.floor(Math.random() * 50) + 10
      },
      quality: {
        score: project.qualityScore || 85 + Math.floor(Math.random() * 15),
        lastInspection: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        nextInspection: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        certifications: ['ISO 9001', 'ISO 14001']
      },
      safety: {
        score: project.safetyScore || 90 + Math.floor(Math.random() * 10),
        incidents: 0,
        lastIncident: null,
        trainingSessions: Math.floor(Math.random() * 10) + 5
      },
      milestones: {
        next: project.nextMilestone || 'Phase Completion',
        upcoming: project.upcomingMilestones || [],
        completed: Math.floor(Math.random() * 10) + 2,
        total: Math.floor(Math.random() * 20) + 10
      },
      tags: project.tags,
      createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  });

  // Generate additional projects to reach 200
  const additionalProjectsNeeded = 200 - projects.length;
  for (let i = 1; i <= additionalProjectsNeeded; i++) {
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
    pageSize: 10,
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
                    <Avatar className="h-10 w-10">
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
                    <Avatar className="h-12 w-12">
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
              <Avatar className="h-7 w-7">
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
        const isOverBudget = project.budget.spent > project.budget.allocated;
        const initials = getInitials(project.name);
        const bg = stringToHslColor(project.name);
        
        return (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback
                      className="text-xs font-semibold text-white"
                      style={{ backgroundColor: bg }}
                    >
                      {getProjectTypeIcon(project.projectType)}
                    </AvatarFallback>
                  </Avatar>
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
    <div>
      {/* Enhanced Header */}
      <div className="flex flex-col space-y-4 px-6 py-4">
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
        <div className="flex flex-col sm:flex-row gap-3 px-6 pb-4">
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

          <DataGridColumnVisibility table={table} trigger={<Button variant="outline" size="sm">Columns</Button>} />
        </div>

        {/* Bulk Actions Bar */}
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center gap-2 p-3 mx-6 mb-4 bg-muted/50 rounded-lg">
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
            dense: true,
            cellBorder: false,
            rowBorder: true,
            stripped: false,
            headerBorder: true,
            headerBackground: true,
            columnsResizable: true,
            columnsVisibility: true,
            columnsPinnable: true,
          }}
        >
          <Card className="shadow-none border-t border-l-0 border-r-0 border-b-0 rounded-none">
            <CardTable>
              <ScrollArea>
                <DataGridTable />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardTable>
            <CardFooter className="px-4 py-0">
              <DataGridPagination 
                className="py-1" 
                sizes={[10, 20, 50, 100, 200]}
              />
            </CardFooter>
          </Card>
        </DataGrid>
      ) : view === 'grid' ? (
        <div className="px-6">
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
        </div>
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
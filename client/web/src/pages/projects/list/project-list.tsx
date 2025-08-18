import { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  Download,
  Plus,
  Calendar,
  Users,
  DollarSign,
  Clock,
  MapPin,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowUpDown,
  ChevronDown,
  Target,
  TrendingUp,
  Package,
  Briefcase,
  Home,
  Building,
  Layers,
  HardHat
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Types
interface Project {
  id: string;
  name: string;
  code: string;
  type: 'residential' | 'commercial' | 'industrial' | 'infrastructure';
  client: {
    name: string;
    company: string;
    avatar: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
  };
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  phases: {
    total: number;
    completed: number;
  };
  budget: {
    total: number;
    spent: number;
    currency: string;
  };
  timeline: {
    startDate: string;
    endDate: string;
    daysRemaining: number;
  };
  team: {
    projectManager: string;
    siteSupervisor: string;
    totalMembers: number;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  };
  lastActivity: string;
  sqft: number;
  floors: number;
}

export default function ProjectList() {
  const navigate = useNavigate();
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Mock data
  const projects: Project[] = [
    {
      id: 'PRJ001',
      name: 'Skyline Towers - Phase 2',
      code: 'SKY-2024-02',
      type: 'residential',
      client: {
        name: 'Rajesh Kumar',
        company: 'Kumar Developers',
        avatar: '/avatars/client1.jpg'
      },
      location: {
        address: 'Sector 42, Gurgaon',
        city: 'Gurgaon',
        state: 'Haryana'
      },
      status: 'in-progress',
      priority: 'high',
      progress: 68,
      phases: {
        total: 8,
        completed: 5
      },
      budget: {
        total: 85000000,
        spent: 57800000,
        currency: 'INR'
      },
      timeline: {
        startDate: '2024-01-15',
        endDate: '2024-12-31',
        daysRemaining: 245
      },
      team: {
        projectManager: 'Amit Sharma',
        siteSupervisor: 'Rakesh Verma',
        totalMembers: 45
      },
      tasks: {
        total: 156,
        completed: 98,
        pending: 42,
        overdue: 16
      },
      lastActivity: '2 hours ago',
      sqft: 125000,
      floors: 24
    },
    {
      id: 'PRJ002',
      name: 'Green Valley Villas',
      code: 'GVV-2024-01',
      type: 'residential',
      client: {
        name: 'Priya Patel',
        company: 'Green Homes Ltd',
        avatar: '/avatars/client2.jpg'
      },
      location: {
        address: 'Whitefield',
        city: 'Bangalore',
        state: 'Karnataka'
      },
      status: 'in-progress',
      priority: 'medium',
      progress: 45,
      phases: {
        total: 6,
        completed: 3
      },
      budget: {
        total: 45000000,
        spent: 20250000,
        currency: 'INR'
      },
      timeline: {
        startDate: '2024-02-01',
        endDate: '2024-10-31',
        daysRemaining: 180
      },
      team: {
        projectManager: 'Sunita Reddy',
        siteSupervisor: 'Mahesh Kumar',
        totalMembers: 32
      },
      tasks: {
        total: 120,
        completed: 54,
        pending: 50,
        overdue: 16
      },
      lastActivity: '1 day ago',
      sqft: 85000,
      floors: 4
    },
    {
      id: 'PRJ003',
      name: 'Tech Park Complex',
      code: 'TPC-2024-03',
      type: 'commercial',
      client: {
        name: 'Global Tech Solutions',
        company: 'GTS Infrastructure',
        avatar: '/avatars/client3.jpg'
      },
      location: {
        address: 'HITEC City',
        city: 'Hyderabad',
        state: 'Telangana'
      },
      status: 'planning',
      priority: 'critical',
      progress: 15,
      phases: {
        total: 10,
        completed: 1
      },
      budget: {
        total: 250000000,
        spent: 37500000,
        currency: 'INR'
      },
      timeline: {
        startDate: '2024-03-01',
        endDate: '2025-06-30',
        daysRemaining: 450
      },
      team: {
        projectManager: 'Vikram Singh',
        siteSupervisor: 'To be assigned',
        totalMembers: 12
      },
      tasks: {
        total: 280,
        completed: 42,
        pending: 200,
        overdue: 38
      },
      lastActivity: '3 hours ago',
      sqft: 350000,
      floors: 15
    },
    {
      id: 'PRJ004',
      name: 'Metro Mall Extension',
      code: 'MME-2024-01',
      type: 'commercial',
      client: {
        name: 'Metro Holdings',
        company: 'Metro Group',
        avatar: '/avatars/client4.jpg'
      },
      location: {
        address: 'Andheri West',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      status: 'delayed',
      priority: 'high',
      progress: 72,
      phases: {
        total: 5,
        completed: 3
      },
      budget: {
        total: 120000000,
        spent: 95000000,
        currency: 'INR'
      },
      timeline: {
        startDate: '2023-10-01',
        endDate: '2024-08-31',
        daysRemaining: 120
      },
      team: {
        projectManager: 'Arun Mehta',
        siteSupervisor: 'Suresh Patil',
        totalMembers: 58
      },
      tasks: {
        total: 180,
        completed: 130,
        pending: 35,
        overdue: 15
      },
      lastActivity: '5 hours ago',
      sqft: 180000,
      floors: 6
    },
    {
      id: 'PRJ005',
      name: 'Riverside Apartments',
      code: 'RSA-2024-02',
      type: 'residential',
      client: {
        name: 'Sharma Builders',
        company: 'Sharma Construction',
        avatar: '/avatars/client5.jpg'
      },
      location: {
        address: 'Powai',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      status: 'completed',
      priority: 'low',
      progress: 100,
      phases: {
        total: 7,
        completed: 7
      },
      budget: {
        total: 65000000,
        spent: 63000000,
        currency: 'INR'
      },
      timeline: {
        startDate: '2023-06-01',
        endDate: '2024-03-15',
        daysRemaining: 0
      },
      team: {
        projectManager: 'Neha Gupta',
        siteSupervisor: 'Ravi Kumar',
        totalMembers: 38
      },
      tasks: {
        total: 145,
        completed: 145,
        pending: 0,
        overdue: 0
      },
      lastActivity: '1 week ago',
      sqft: 95000,
      floors: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-green-100 text-green-700';
      case 'on-hold': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'delayed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return Home;
      case 'commercial': return Building;
      case 'industrial': return Building2;
      case 'infrastructure': return Layers;
      default: return Building2;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const selectAllProjects = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map(p => p.id));
    }
  };

  return (
    <div className="p-4">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Projects</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">32</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Delayed</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold">₹56.5Cr</p>
              </div>
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects, codes, or clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedProjects.length === filteredProjects.length}
                    onCheckedChange={selectAllProjects}
                  />
                </TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => {
                const TypeIcon = getTypeIcon(project.type);
                return (
                  <TableRow key={project.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedProjects.includes(project.id)}
                        onCheckedChange={() => toggleProjectSelection(project.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.code}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {project.sqft.toLocaleString()} sqft
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {project.floors} floors
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.client.avatar} />
                          <AvatarFallback>{project.client.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{project.client.name}</div>
                          <div className="text-xs text-gray-500">{project.client.company}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <div>
                          <div className="text-sm">{project.location.city}</div>
                          <div className="text-xs text-gray-500">{project.location.state}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={cn("ml-1", getPriorityColor(project.priority))}>
                          {project.priority}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="w-[80px] h-2" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.phases.completed}/{project.phases.total} phases
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm font-medium">
                          ₹{(project.budget.spent / 10000000).toFixed(1)}Cr
                        </div>
                        <div className="text-xs text-gray-500">
                          of ₹{(project.budget.total / 10000000).toFixed(1)}Cr
                        </div>
                        <Progress 
                          value={(project.budget.spent / project.budget.total) * 100} 
                          className="w-[80px] h-1 mt-1" 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">
                          {new Date(project.timeline.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {project.timeline.daysRemaining > 0 
                            ? `${project.timeline.daysRemaining} days left`
                            : 'Completed'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-sm">{project.team.totalMembers}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        PM: {project.team.projectManager.split(' ')[0]}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/tasks`)}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Tasks
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/budget`)}>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Budget Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Users,
  User,
  UserCheck,
  UserX,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Zap,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Info,
  Eye,
  Edit,
  Trash2,
  Plus,
  X,
  ArrowRight,
  ArrowLeft,
  Scale,
  Gauge,
  Timer,
  Briefcase,
  Building,
  MapPin,
  Globe,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Download,
  Upload,
  Percent,
  Hash,
  DollarSign,
  Star,
  Award,
  Flag,
  Layers,
  Grid,
  List,
  MoreVertical
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  team: string;
  skills: string[];
  capacity: number; // Total capacity in hours per week
  availability: number; // Available hours per week
  timezone: string;
  location: string;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
  };
  isActive: boolean;
  currentWorkload: WorkloadItem[];
  preferences: {
    leadTypes: string[];
    industries: string[];
    maxLeadsPerDay: number;
    autoAssign: boolean;
  };
}

interface WorkloadItem {
  id: string;
  type: 'lead' | 'task' | 'meeting' | 'project';
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedHours: number;
  actualHours?: number;
  deadline?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedBy: string;
  assignedAt: string;
}

interface LoadBalancingRule {
  id: string;
  name: string;
  description: string;
  type: 'capacity' | 'skills' | 'location' | 'priority' | 'round_robin' | 'custom';
  isActive: boolean;
  priority: number;
  conditions: {
    field: string;
    operator: string;
    value: any;
  }[];
  actions: {
    type: string;
    value: any;
  }[];
  createdBy: string;
  createdAt: string;
  lastExecuted?: string;
}

interface BalancingStats {
  totalCapacity: number;
  utilizationRate: number;
  overloadedMembers: number;
  underutilizedMembers: number;
  autoAssignmentsToday: number;
  manualAssignmentsToday: number;
  balanceScore: number;
  efficiencyGain: number;
}

interface DistributionSuggestion {
  id: string;
  type: 'redistribute' | 'reassign' | 'add_capacity' | 'optimize';
  title: string;
  description: string;
  fromMember?: string;
  toMember?: string;
  workloadItems: string[];
  impact: {
    balanceImprovement: number;
    efficiencyGain: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  estimatedTimeToComplete: number;
}

const LoadBalancing: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [isAutoBalancing, setIsAutoBalancing] = useState(true);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Mock data for team members with workload
  const teamMembers: TeamMember[] = [
    {
      id: 'user-001',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      title: 'Senior Sales Manager',
      department: 'Sales',
      team: 'Enterprise Sales',
      skills: ['Enterprise Sales', 'Account Management', 'Negotiation', 'CRM'],
      capacity: 40,
      availability: 8,
      timezone: 'EST',
      location: 'New York, NY',
      workingHours: { start: '09:00', end: '17:00', timezone: 'EST' },
      isActive: true,
      currentWorkload: [
        {
          id: 'work-001',
          type: 'lead',
          title: 'Enterprise Lead - Tech Corp',
          priority: 'high',
          estimatedHours: 8,
          actualHours: 6,
          deadline: '2024-01-25',
          status: 'in_progress',
          assignedBy: 'Manager',
          assignedAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 'work-002',
          type: 'meeting',
          title: 'Client Demo Preparation',
          priority: 'medium',
          estimatedHours: 4,
          deadline: '2024-01-22',
          status: 'pending',
          assignedBy: 'Manager',
          assignedAt: '2024-01-16T11:00:00Z'
        }
      ],
      preferences: {
        leadTypes: ['Enterprise', 'Strategic'],
        industries: ['Technology', 'Finance'],
        maxLeadsPerDay: 5,
        autoAssign: true
      }
    },
    {
      id: 'user-002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      title: 'Sales Representative',
      department: 'Sales',
      team: 'SMB Sales',
      skills: ['SMB Sales', 'Cold Calling', 'Email Marketing', 'Lead Qualification'],
      capacity: 40,
      availability: 22,
      timezone: 'PST',
      location: 'San Francisco, CA',
      workingHours: { start: '08:00', end: '16:00', timezone: 'PST' },
      isActive: true,
      currentWorkload: [
        {
          id: 'work-003',
          type: 'lead',
          title: 'SMB Lead - StartupXYZ',
          priority: 'medium',
          estimatedHours: 3,
          actualHours: 2,
          deadline: '2024-01-24',
          status: 'in_progress',
          assignedBy: 'Auto-Assignment',
          assignedAt: '2024-01-17T09:30:00Z'
        }
      ],
      preferences: {
        leadTypes: ['SMB', 'Startup'],
        industries: ['Technology', 'Healthcare', 'Retail'],
        maxLeadsPerDay: 8,
        autoAssign: true
      }
    },
    {
      id: 'user-003',
      name: 'Lisa Johnson',
      email: 'lisa.johnson@company.com',
      title: 'Lead Development Representative',
      department: 'Marketing',
      team: 'Lead Generation',
      skills: ['Lead Generation', 'Cold Outreach', 'Social Selling', 'Research'],
      capacity: 40,
      availability: 5,
      timezone: 'CST',
      location: 'Chicago, IL',
      workingHours: { start: '09:00', end: '17:00', timezone: 'CST' },
      isActive: true,
      currentWorkload: [
        {
          id: 'work-004',
          type: 'task',
          title: 'Lead Research Campaign',
          priority: 'high',
          estimatedHours: 12,
          actualHours: 8,
          deadline: '2024-01-26',
          status: 'in_progress',
          assignedBy: 'Marketing Manager',
          assignedAt: '2024-01-14T14:00:00Z'
        },
        {
          id: 'work-005',
          type: 'project',
          title: 'Q1 Lead Generation Strategy',
          priority: 'urgent',
          estimatedHours: 20,
          actualHours: 15,
          deadline: '2024-01-30',
          status: 'in_progress',
          assignedBy: 'Director',
          assignedAt: '2024-01-10T10:00:00Z'
        }
      ],
      preferences: {
        leadTypes: ['Inbound', 'Research'],
        industries: ['Technology', 'Manufacturing'],
        maxLeadsPerDay: 12,
        autoAssign: true
      }
    },
    {
      id: 'user-004',
      name: 'Alex Turner',
      email: 'alex.turner@company.com',
      title: 'Account Executive',
      department: 'Sales',
      team: 'Enterprise Sales',
      skills: ['Account Management', 'Upselling', 'Customer Success', 'Presentations'],
      capacity: 40,
      availability: 18,
      timezone: 'EST',
      location: 'Boston, MA',
      workingHours: { start: '08:30', end: '16:30', timezone: 'EST' },
      isActive: true,
      currentWorkload: [
        {
          id: 'work-006',
          type: 'lead',
          title: 'Account Expansion - Global Inc',
          priority: 'high',
          estimatedHours: 6,
          actualHours: 3,
          deadline: '2024-01-28',
          status: 'pending',
          assignedBy: 'Manager',
          assignedAt: '2024-01-18T13:00:00Z'
        }
      ],
      preferences: {
        leadTypes: ['Enterprise', 'Existing Account'],
        industries: ['Finance', 'Technology'],
        maxLeadsPerDay: 4,
        autoAssign: true
      }
    }
  ];

  // Mock balancing rules
  const balancingRules: LoadBalancingRule[] = [
    {
      id: 'rule-001',
      name: 'Capacity-Based Assignment',
      description: 'Assign leads to team members with available capacity',
      type: 'capacity',
      isActive: true,
      priority: 1,
      conditions: [
        { field: 'availability', operator: 'greater_than', value: 5 }
      ],
      actions: [
        { type: 'assign_lead', value: 'lowest_utilization' }
      ],
      createdBy: 'System Admin',
      createdAt: '2023-12-01T10:00:00Z',
      lastExecuted: '2024-01-18T14:30:00Z'
    },
    {
      id: 'rule-002',
      name: 'Skills Matching',
      description: 'Match leads to team members based on required skills',
      type: 'skills',
      isActive: true,
      priority: 2,
      conditions: [
        { field: 'leadType', operator: 'equals', value: 'Enterprise' },
        { field: 'skills', operator: 'contains', value: 'Enterprise Sales' }
      ],
      actions: [
        { type: 'assign_lead', value: 'best_skills_match' }
      ],
      createdBy: 'Sales Manager',
      createdAt: '2023-12-05T11:30:00Z',
      lastExecuted: '2024-01-18T12:15:00Z'
    },
    {
      id: 'rule-003',
      name: 'Timezone Preference',
      description: 'Assign leads based on timezone compatibility',
      type: 'location',
      isActive: true,
      priority: 3,
      conditions: [
        { field: 'lead_timezone', operator: 'matches', value: 'member_timezone' }
      ],
      actions: [
        { type: 'prioritize_assignment', value: 'timezone_match' }
      ],
      createdBy: 'Operations Manager',
      createdAt: '2023-12-10T09:00:00Z',
      lastExecuted: '2024-01-18T11:45:00Z'
    }
  ];

  // Mock stats
  const stats: BalancingStats = {
    totalCapacity: 160,
    utilizationRate: 78.5,
    overloadedMembers: 1,
    underutilizedMembers: 1,
    autoAssignmentsToday: 23,
    manualAssignmentsToday: 7,
    balanceScore: 82.3,
    efficiencyGain: 15.2
  };

  // Mock distribution suggestions
  const suggestions: DistributionSuggestion[] = [
    {
      id: 'sug-001',
      type: 'redistribute',
      title: 'Redistribute Workload from Lisa',
      description: 'Lisa Johnson is at 87.5% capacity. Consider redistributing some tasks.',
      fromMember: 'user-003',
      toMember: 'user-002',
      workloadItems: ['work-004'],
      impact: {
        balanceImprovement: 12.5,
        efficiencyGain: 8.3,
        riskLevel: 'low'
      },
      estimatedTimeToComplete: 2
    },
    {
      id: 'sug-002',
      type: 'reassign',
      title: 'Reassign Enterprise Lead to Alex',
      description: 'Alex Turner has capacity and better skills match for enterprise leads.',
      fromMember: 'user-001',
      toMember: 'user-004',
      workloadItems: ['work-001'],
      impact: {
        balanceImprovement: 8.7,
        efficiencyGain: 15.2,
        riskLevel: 'medium'
      },
      estimatedTimeToComplete: 1
    },
    {
      id: 'sug-003',
      type: 'optimize',
      title: 'Optimize Mike\'s Schedule',
      description: 'Mike Chen has 55% available capacity that could be better utilized.',
      toMember: 'user-002',
      workloadItems: [],
      impact: {
        balanceImprovement: 15.3,
        efficiencyGain: 22.1,
        riskLevel: 'low'
      },
      estimatedTimeToComplete: 3
    }
  ];

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 80) return 'text-orange-600';
    if (utilization >= 70) return 'text-yellow-600';
    if (utilization >= 50) return 'text-green-600';
    return 'text-blue-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getWorkloadIcon = (type: string) => {
    switch (type) {
      case 'lead': return Users;
      case 'task': return FileText;
      case 'meeting': return Calendar;
      case 'project': return Briefcase;
      default: return Activity;
    }
  };

  const calculateUtilization = (member: TeamMember): number => {
    const totalEstimatedHours = member.currentWorkload.reduce((sum, item) => sum + item.estimatedHours, 0);
    return Math.round((totalEstimatedHours / member.capacity) * 100);
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || member.team === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  const applySuggestion = (suggestionId: string) => {
    console.log(`Applying suggestion: ${suggestionId}`);
  };

  const dismissSuggestion = (suggestionId: string) => {
    console.log(`Dismissing suggestion: ${suggestionId}`);
  };

  const redistributeWorkload = () => {
    console.log('Starting workload redistribution');
  };

  const runAutoBalancing = () => {
    console.log('Running auto-balancing algorithm');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Load Balancing</h1>
          <p className="text-muted-foreground">Optimize workload distribution across team members</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
            <Scale className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Auto-Balance:</span>
            <Switch
              checked={isAutoBalancing}
              onCheckedChange={setIsAutoBalancing}
            />
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={runAutoBalancing}>
            <Zap className="h-4 w-4 mr-2" />
            Run Auto-Balance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Utilization</p>
                <p className="text-2xl font-bold">{stats.utilizationRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+5.3% vs last week</span>
                </div>
              </div>
              <Gauge className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Balance Score</p>
                <p className="text-2xl font-bold">{stats.balanceScore}%</p>
                <Progress value={stats.balanceScore} className="h-2 mt-2" />
              </div>
              <Scale className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto Assignments</p>
                <p className="text-2xl font-bold">{stats.autoAssignmentsToday}</p>
                <p className="text-xs text-muted-foreground">vs {stats.manualAssignmentsToday} manual</p>
              </div>
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency Gain</p>
                <p className="text-2xl font-bold text-green-600">+{stats.efficiencyGain}%</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workload">Workload Distribution</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="rules">Balancing Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Alerts */}
          {(stats.overloadedMembers > 0 || stats.underutilizedMembers > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.overloadedMembers > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-orange-800">Overloaded Members</p>
                        <p className="text-sm text-orange-700">
                          {stats.overloadedMembers} team member(s) are over capacity
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {stats.underutilizedMembers > 0 && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Info className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Underutilized Members</p>
                        <p className="text-sm text-blue-700">
                          {stats.underutilizedMembers} team member(s) have available capacity
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Team Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Workload Overview</CardTitle>
                  <CardDescription>Current workload distribution across team members</CardDescription>
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
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map((member) => {
                    const utilization = calculateUtilization(member);
                    
                    return (
                      <Card key={member.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-sm text-muted-foreground">{member.title}</p>
                                </div>
                              </div>
                              <Badge 
                                variant="outline"
                                className={member.isActive ? 'text-green-600 border-green-200' : 'text-gray-600 border-gray-200'}
                              >
                                {member.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Utilization</span>
                                <span className={`text-sm font-medium ${getUtilizationColor(utilization)}`}>
                                  {utilization}%
                                </span>
                              </div>
                              <Progress value={utilization} className="h-2" />
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Capacity: {member.capacity}h</span>
                                <span>Available: {member.availability}h</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Current Workload ({member.currentWorkload.length})</p>
                              {member.currentWorkload.slice(0, 2).map((item) => {
                                const WorkloadIcon = getWorkloadIcon(item.type);
                                
                                return (
                                  <div key={item.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                    <WorkloadIcon className="h-3 w-3 text-gray-500" />
                                    <span className="text-xs flex-1 truncate">{item.title}</span>
                                    <Badge className={getPriorityColor(item.priority)} size="sm">
                                      {item.priority}
                                    </Badge>
                                  </div>
                                );
                              })}
                              {member.currentWorkload.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{member.currentWorkload.length - 2} more items
                                </p>
                              )}
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-3 w-3 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMembers.map((member) => {
                    const utilization = calculateUtilization(member);
                    
                    return (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <p className="font-medium">{member.name}</p>
                              <Badge variant="outline" className="text-xs">{member.team}</Badge>
                              <Badge 
                                variant="outline"
                                className={member.isActive ? 'text-green-600 border-green-200' : 'text-gray-600 border-gray-200'}
                              >
                                {member.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{member.title} • {member.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Workload</p>
                            <p className="font-medium">{member.currentWorkload.length} items</p>
                          </div>
                          
                          <div className="text-center min-w-24">
                            <p className="text-sm text-muted-foreground">Utilization</p>
                            <div className="flex items-center gap-2">
                              <Progress value={utilization} className="w-16 h-2" />
                              <span className={`text-sm font-medium ${getUtilizationColor(utilization)}`}>
                                {utilization}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Available</p>
                            <p className="font-medium">{member.availability}h</p>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="Enterprise Sales">Enterprise Sales</SelectItem>
                <SelectItem value="SMB Sales">SMB Sales</SelectItem>
                <SelectItem value="Lead Generation">Lead Generation</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={redistributeWorkload}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Redistribute
            </Button>
          </div>

          {/* Detailed Workload View */}
          <div className="space-y-6">
            {filteredMembers.map((member) => {
              const utilization = calculateUtilization(member);
              
              return (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.title} • {member.team}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Utilization</p>
                          <div className="flex items-center gap-2">
                            <Progress value={utilization} className="w-20 h-2" />
                            <span className={`font-medium ${getUtilizationColor(utilization)}`}>
                              {utilization}%
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Assign Work
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Capacity Info */}
                      <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Total Capacity</p>
                          <p className="font-medium">{member.capacity}h/week</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Current Load</p>
                          <p className="font-medium">
                            {member.currentWorkload.reduce((sum, item) => sum + item.estimatedHours, 0)}h
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Available</p>
                          <p className="font-medium text-green-600">{member.availability}h</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Working Hours</p>
                          <p className="font-medium">{member.workingHours.start}-{member.workingHours.end}</p>
                        </div>
                      </div>
                      
                      {/* Current Workload */}
                      {member.currentWorkload.length > 0 ? (
                        <div className="space-y-3">
                          <h4 className="font-medium">Current Workload ({member.currentWorkload.length} items)</h4>
                          {member.currentWorkload.map((item) => {
                            const WorkloadIcon = getWorkloadIcon(item.type);
                            
                            return (
                              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <WorkloadIcon className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <p className="font-medium">{item.title}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                      <span>Type: {item.type}</span>
                                      <span>Estimated: {item.estimatedHours}h</span>
                                      {item.actualHours && <span>Actual: {item.actualHours}h</span>}
                                      {item.deadline && <span>Due: {new Date(item.deadline).toLocaleDateString()}</span>}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Badge className={getPriorityColor(item.priority)}>
                                    {item.priority}
                                  </Badge>
                                  <Badge className={getStatusColor(item.status)}>
                                    {item.status.replace('_', ' ')}
                                  </Badge>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No current workload</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Suggestions</CardTitle>
              <CardDescription>AI-powered recommendations to improve workload balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="capitalize">
                            {suggestion.type.replace('_', ' ')}
                          </Badge>
                          <h4 className="font-medium">{suggestion.title}</h4>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Balance Improvement</p>
                            <p className="font-medium text-green-600">+{suggestion.impact.balanceImprovement}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Efficiency Gain</p>
                            <p className="font-medium text-blue-600">+{suggestion.impact.efficiencyGain}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Risk Level</p>
                            <p className={`font-medium ${getRiskColor(suggestion.impact.riskLevel)}`}>
                              {suggestion.impact.riskLevel}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Estimated time: {suggestion.estimatedTimeToComplete}h</span>
                          {suggestion.workloadItems.length > 0 && (
                            <span>{suggestion.workloadItems.length} items affected</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          size="sm" 
                          onClick={() => applySuggestion(suggestion.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => dismissSuggestion(suggestion.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {suggestions.length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-lg font-medium">Workload is Well Balanced</p>
                    <p className="text-muted-foreground mt-2">
                      No optimization suggestions at this time
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Load Balancing Rules</CardTitle>
                  <CardDescription>Configure automatic workload distribution rules</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {balancingRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{rule.priority}
                        </Badge>
                        <Switch checked={rule.isActive} />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{rule.name}</h4>
                          <Badge variant="outline" className="text-xs capitalize">
                            {rule.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {new Date(rule.createdAt).toLocaleDateString()}</span>
                          {rule.lastExecuted && (
                            <span>Last executed: {new Date(rule.lastExecuted).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilization Trends</CardTitle>
                <CardDescription>Team utilization over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Utilization trend chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Shows team utilization patterns and trends
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workload Distribution</CardTitle>
                <CardDescription>Current workload by team member</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Workload distribution chart</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Visualizes how work is distributed across the team
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Balance Metrics</CardTitle>
                <CardDescription>Key balance and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Workload Balance</span>
                    <span className="font-medium">{stats.balanceScore}%</span>
                  </div>
                  <Progress value={stats.balanceScore} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Auto-Assignment Success</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Response Time</span>
                    <span className="font-medium">2.1h avg</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span>Capacity Utilization</span>
                    <span className="font-medium">{stats.utilizationRate}%</span>
                  </div>
                  <Progress value={stats.utilizationRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Impact</CardTitle>
                <CardDescription>How load balancing affects performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-green-800">+{stats.efficiencyGain}%</p>
                    <p className="text-sm text-green-700">Efficiency Improvement</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{stats.autoAssignmentsToday}</p>
                      <p className="text-sm text-muted-foreground">Auto Assignments</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2.3h</p>
                      <p className="text-sm text-muted-foreground">Time Saved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoadBalancing;
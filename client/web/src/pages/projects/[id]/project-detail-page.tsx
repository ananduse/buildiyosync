import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ChevronLeft,
  Share2,
  Settings,
  Home,
  Activity,
  GitBranch,
  Users,
  ClipboardList,
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  Info,
  Building2,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import ProjectTaskManager from './tasks/project-task-manager';

// Project Info Type
interface ProjectInfo {
  id: string;
  name: string;
  code: string;
  client: string;
  manager: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  status: 'active' | 'on-hold' | 'completed' | 'planning';
  type: string;
  location: string;
  team: number;
  description: string;
}

// Mock project data
const getProjectInfo = (projectId: string): ProjectInfo => ({
  id: projectId,
  name: 'Sunrise Apartments Complex',
  code: 'SAC-2024',
  client: 'Sunrise Developers Ltd.',
  manager: 'Vikram Singh',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  budget: 50000000,
  spent: 17500000,
  progress: 35,
  status: 'active',
  type: 'Residential Complex',
  location: 'Whitefield, Bangalore',
  team: 25,
  description: 'A premium residential complex with 150 apartments, featuring modern amenities including swimming pool, gym, clubhouse, and landscaped gardens.',
});

export default function ProjectDetailPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);

  useEffect(() => {
    // Load project info
    const info = getProjectInfo(projectId || 'P001');
    setProjectInfo(info);
  }, [projectId]);

  if (!projectInfo) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Project Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/projects/list')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Projects
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{projectInfo.name}</h1>
                <Badge variant="outline">{projectInfo.code}</Badge>
                <Badge className={getStatusColor(projectInfo.status)}>
                  {projectInfo.status.charAt(0).toUpperCase() + projectInfo.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {projectInfo.client} • Managed by {projectInfo.manager}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="bg-white border-b px-6">
          <TabsList className="h-10 bg-transparent p-0 gap-4">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <Home className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <Activity className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <GitBranch className="h-4 w-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <Users className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <ClipboardList className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <DollarSign className="h-4 w-4 mr-2" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-10 pb-2">
              <Info className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <TabsContent value="overview" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <div className="grid gap-6">
              {/* Project Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projectInfo.progress}%</div>
                    <Progress value={projectInfo.progress} className="mt-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{(projectInfo.spent / 1000000).toFixed(1)}M</div>
                    <p className="text-xs text-muted-foreground">of ₹{(projectInfo.budget / 1000000).toFixed(1)}M</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{projectInfo.team}</div>
                    <p className="text-xs text-muted-foreground">Active members</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8 months</div>
                    <p className="text-xs text-muted-foreground">Until deadline</p>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                  <CardDescription>{projectInfo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Type:</span>
                        <span className="text-sm">{projectInfo.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Location:</span>
                        <span className="text-sm">{projectInfo.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Duration:</span>
                        <span className="text-sm">Jan 2024 - Dec 2024</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Client:</span>
                        <span className="text-sm">{projectInfo.client}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Status:</span>
                        <Badge className={getStatusColor(projectInfo.status)}>
                          {projectInfo.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Budget:</span>
                        <span className="text-sm">₹{(projectInfo.budget / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Task completed', detail: 'Foundation work completed', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-500' },
                      { action: 'Document uploaded', detail: 'Safety inspection report added', time: '5 hours ago', icon: FileText, color: 'text-blue-500' },
                      { action: 'Team member added', detail: 'Rajesh Kumar joined as Site Engineer', time: '1 day ago', icon: Users, color: 'text-purple-500' },
                      { action: 'Milestone reached', detail: 'Phase 1 completed', time: '3 days ago', icon: TrendingUp, color: 'text-orange-500' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.detail}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Activity Feed</h3>
                <p className="text-muted-foreground">All project activities and updates will appear here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Project Timeline</h3>
                <p className="text-muted-foreground">Gantt chart and milestones visualization</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Vikram Singh', role: 'Project Manager', avatar: 'VS', status: 'online' },
                { name: 'Priya Sharma', role: 'Architect', avatar: 'PS', status: 'online' },
                { name: 'Rajesh Kumar', role: 'Site Engineer', avatar: 'RK', status: 'offline' },
                { name: 'Amit Patel', role: 'Safety Officer', avatar: 'AP', status: 'online' },
                { name: 'Sneha Reddy', role: 'Quality Engineer', avatar: 'SR', status: 'offline' },
                { name: 'Mohammed Ali', role: 'Contractor', avatar: 'MA', status: 'online' },
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <div className={`h-2 w-2 rounded-full ${member.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* TASKS TAB - Using our complete task manager */}
        <TabsContent value="tasks" className="flex-1 -mt-[10px] p-0">
          <ProjectTaskManager />
        </TabsContent>

        <TabsContent value="budget" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Budget Management</h3>
                <p className="text-muted-foreground">Financial tracking and budget allocation</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Documents</h3>
                <p className="text-muted-foreground">Project files and documentation</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Project Calendar</h3>
                <p className="text-muted-foreground">Events, deadlines and milestones</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Reports & Analytics</h3>
                <p className="text-muted-foreground">Project performance and analytics</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="flex-1 overflow-auto mt-0 p-0">
          <div className="p-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Project Details</h3>
                <p className="text-muted-foreground">Comprehensive project information</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
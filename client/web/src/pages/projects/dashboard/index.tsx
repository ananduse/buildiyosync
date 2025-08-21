import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Calendar,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProjectDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" />
                12%
              </span>
              {' '}from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 inline-flex items-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                8%
              </span>
              {' '}from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              Across 8 teams
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Your team's ongoing projects</CardDescription>
            </div>
            <Button size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Website Redesign',
                team: 'Design Team',
                progress: 65,
                status: 'On Track',
                statusColor: 'text-green-600 bg-green-50',
                dueDate: '2024-02-15',
              },
              {
                name: 'Mobile App Development',
                team: 'Development Team',
                progress: 42,
                status: 'At Risk',
                statusColor: 'text-yellow-600 bg-yellow-50',
                dueDate: '2024-03-01',
              },
              {
                name: 'Marketing Campaign',
                team: 'Marketing Team',
                progress: 89,
                status: 'Ahead',
                statusColor: 'text-blue-600 bg-blue-50',
                dueDate: '2024-01-30',
              },
              {
                name: 'Database Migration',
                team: 'DevOps Team',
                progress: 25,
                status: 'Delayed',
                statusColor: 'text-red-600 bg-red-50',
                dueDate: '2024-02-28',
              },
            ].map((project) => (
              <div key={project.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h4 className="font-semibold">{project.name}</h4>
                    <Badge variant="secondary" className={project.statusColor}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.team}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due {project.dueDate}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Assign Team</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Team Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle2,
                  iconColor: 'text-green-600',
                  title: 'Task completed',
                  description: 'Homepage design approved',
                  time: '2 hours ago',
                },
                {
                  icon: Users,
                  iconColor: 'text-blue-600',
                  title: 'Team member added',
                  description: 'John Doe joined Development Team',
                  time: '4 hours ago',
                },
                {
                  icon: AlertCircle,
                  iconColor: 'text-yellow-600',
                  title: 'Deadline approaching',
                  description: 'Marketing Campaign due in 3 days',
                  time: '6 hours ago',
                },
                {
                  icon: BarChart3,
                  iconColor: 'text-purple-600',
                  title: 'Milestone reached',
                  description: 'Phase 2 completed for Mobile App',
                  time: '1 day ago',
                },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex gap-3">
                    <div className={`mt-0.5 ${activity.iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Task completion by team this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { team: 'Design Team', completed: 18, total: 20, color: 'bg-blue-500' },
                { team: 'Development Team', completed: 24, total: 30, color: 'bg-green-500' },
                { team: 'Marketing Team', completed: 15, total: 18, color: 'bg-purple-500' },
                { team: 'DevOps Team', completed: 10, total: 15, color: 'bg-orange-500' },
                { team: 'QA Team', completed: 12, total: 12, color: 'bg-pink-500' },
              ].map((team) => (
                <div key={team.team} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{team.team}</span>
                    <span className="text-sm text-muted-foreground">
                      {team.completed}/{team.total} tasks
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={(team.completed / team.total) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;
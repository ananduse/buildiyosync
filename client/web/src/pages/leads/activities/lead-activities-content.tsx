import { useState } from 'react';
import {
  Clock,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  User,
  Building,
  Target,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Send,
  Upload,
  ArrowLeft,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeadActivitiesProps {
  leadId: string;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'proposal' | 'task' | 'status_change' | 'file_upload';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  metadata?: {
    duration?: string;
    outcome?: string;
    attachments?: string[];
    priority?: 'low' | 'medium' | 'high';
    status?: string;
  };
}

interface ActivityFilter {
  type: string;
  user: string;
  dateRange: string;
}

// Mock activities data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Follow-up call with John Smith',
    description: 'Discussed project timeline and budget requirements. Client confirmed interest in sustainable building features.',
    timestamp: '2024-01-15T14:30:00Z',
    user: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'Sales Manager'
    },
    metadata: {
      duration: '25 minutes',
      outcome: 'Positive',
      priority: 'high'
    }
  },
  {
    id: '2',
    type: 'email',
    title: 'Sent project proposal',
    description: 'Comprehensive proposal including cost breakdown, timeline, and sustainable features as requested.',
    timestamp: '2024-01-15T10:15:00Z',
    user: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      role: 'Project Manager'
    },
    metadata: {
      attachments: ['proposal_v1.pdf', 'cost_breakdown.xlsx']
    }
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Site visit scheduled',
    description: 'Meeting scheduled for January 20th to visit the construction site and discuss specific requirements.',
    timestamp: '2024-01-14T16:45:00Z',
    user: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      role: 'Coordinator'
    },
    metadata: {
      priority: 'medium'
    }
  },
  {
    id: '4',
    type: 'status_change',
    title: 'Lead status updated',
    description: 'Status changed from "Contacted" to "Proposal Sent" following client meeting.',
    timestamp: '2024-01-14T11:20:00Z',
    user: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'Sales Manager'
    },
    metadata: {
      status: 'Proposal Sent'
    }
  },
  {
    id: '5',
    type: 'note',
    title: 'Client preferences noted',
    description: 'Client specifically mentioned preference for glass facades and modern interior design. Budget approved for premium materials.',
    timestamp: '2024-01-13T13:10:00Z',
    user: {
      name: 'David Brown',
      avatar: '/avatars/david.jpg',
      role: 'Designer'
    },
    metadata: {
      priority: 'low'
    }
  },
  {
    id: '6',
    type: 'file_upload',
    title: 'Documents uploaded',
    description: 'Client uploaded building permits and architectural drawings for review.',
    timestamp: '2024-01-13T09:30:00Z',
    user: {
      name: 'John Smith',
      avatar: '/avatars/john.jpg',
      role: 'Client'
    },
    metadata: {
      attachments: ['building_permit.pdf', 'site_plan.dwg', 'architectural_drawings.pdf']
    }
  },
  {
    id: '7',
    type: 'task',
    title: 'Technical review completed',
    description: 'Engineering team completed technical feasibility review. All requirements are achievable within budget.',
    timestamp: '2024-01-12T15:45:00Z',
    user: {
      name: 'Emma Wilson',
      avatar: '/avatars/emma.jpg',
      role: 'Engineer'
    },
    metadata: {
      priority: 'high',
      outcome: 'Approved'
    }
  }
];

function ActivityIcon({ type }: { type: Activity['type'] }) {
  const iconMap = {
    call: Phone,
    email: Mail,
    meeting: Calendar,
    note: FileText,
    proposal: Target,
    task: CheckCircle,
    status_change: AlertCircle,
    file_upload: Upload
  };
  
  const Icon = iconMap[type];
  
  const colorMap = {
    call: 'text-blue-600',
    email: 'text-green-600',
    meeting: 'text-purple-600',
    note: 'text-yellow-600',
    proposal: 'text-orange-600',
    task: 'text-emerald-600',
    status_change: 'text-indigo-600',
    file_upload: 'text-gray-600'
  };
  
  return <Icon className={`h-5 w-5 ${colorMap[type]}`} />;
}

function ActivityCard({ activity, onEdit, onDelete }: { 
  activity: Activity; 
  onEdit: (activity: Activity) => void;
  onDelete: (activityId: string) => void;
}) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const { date, time } = formatTimestamp(activity.timestamp);

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <ActivityIcon type={activity.type} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-sm">{activity.title}</h3>
                {activity.metadata?.priority && (
                  <Badge 
                    variant={
                      activity.metadata.priority === 'high' ? 'destructive' :
                      activity.metadata.priority === 'medium' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {activity.metadata.priority}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
              
              {activity.metadata && (
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {activity.metadata.duration && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.metadata.duration}
                    </span>
                  )}
                  {activity.metadata.outcome && (
                    <span className="flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {activity.metadata.outcome}
                    </span>
                  )}
                  {activity.metadata.attachments && (
                    <span className="flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {activity.metadata.attachments.length} files
                    </span>
                  )}
                  {activity.metadata.status && (
                    <span className="flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {activity.metadata.status}
                    </span>
                  )}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">
                      {activity.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-xs">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-muted-foreground"> • {activity.user.role}</span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {date} at {time}
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(activity)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive"
                onClick={() => onDelete(activity.id)}
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

function AddActivityDialog({ 
  open, 
  onClose, 
  onAdd 
}: { 
  open: boolean; 
  onClose: () => void;
  onAdd: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}) {
  const [activityType, setActivityType] = useState<Activity['type']>('note');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    
    onAdd({
      type: activityType,
      title,
      description,
      user: {
        name: 'Current User',
        avatar: '/avatars/current-user.jpg',
        role: 'Sales Manager'
      }
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setActivityType('note');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>
            Record a new activity for this lead
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Activity Type</label>
            <Select value={activityType} onValueChange={(value) => setActivityType(value as Activity['type'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="file_upload">File Upload</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter activity title"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter activity description"
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function LeadActivitiesContent({ leadId }: LeadActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [filters, setFilters] = useState<ActivityFilter>({
    type: 'all',
    user: 'all',
    dateRange: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddActivity = (newActivity: Omit<Activity, 'id' | 'timestamp'>) => {
    const activity: Activity = {
      ...newActivity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setActivities(prev => [activity, ...prev]);
  };

  const handleEditActivity = (activity: Activity) => {
    // Implementation for editing activity
    console.log('Edit activity:', activity);
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(prev => prev.filter(a => a.id !== activityId));
  };

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    if (filters.type !== 'all' && activity.type !== filters.type) return false;
    if (filters.user !== 'all' && !activity.user.name.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !activity.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  const activityCounts = {
    total: activities.length,
    calls: activities.filter(a => a.type === 'call').length,
    emails: activities.filter(a => a.type === 'email').length,
    meetings: activities.filter(a => a.type === 'meeting').length,
    notes: activities.filter(a => a.type === 'note').length
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/leads/dashboard" className="flex items-center hover:text-primary">
          <Home className="h-4 w-4 mr-1" />
          Leads
        </Link>
        <span>/</span>
        <Link to={`/leads/${leadId}`} className="hover:text-primary">
          Lead Details
        </Link>
        <span>/</span>
        <span className="text-foreground">Activities</span>
      </div>

      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/leads/${leadId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lead Details
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lead Activities Timeline</h1>
          <p className="text-muted-foreground">Track all interactions and activities for this lead</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{activityCounts.total}</div>
            <div className="text-sm text-muted-foreground">Total Activities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{activityCounts.calls}</div>
            <div className="text-sm text-muted-foreground">Calls</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{activityCounts.emails}</div>
            <div className="text-sm text-muted-foreground">Emails</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{activityCounts.meetings}</div>
            <div className="text-sm text-muted-foreground">Meetings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{activityCounts.notes}</div>
            <div className="text-sm text-muted-foreground">Notes</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="proposal">Proposals</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {Object.entries(groupedActivities).map(([date, dayActivities]) => (
          <div key={date}>
            <div className="flex items-center mb-4">
              <div className="font-medium text-sm text-muted-foreground">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <Separator className="flex-1 ml-4" />
            </div>
            
            <div className="space-y-3">
              {dayActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={handleEditActivity}
                  onDelete={handleDeleteActivity}
                />
              ))}
            </div>
          </div>
        ))}
        
        {filteredActivities.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No activities found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No activities match your current filters.
              </p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Activity
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Activity Dialog */}
      <AddActivityDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onAdd={handleAddActivity}
      />
    </div>
  );
}
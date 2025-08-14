'use client';

import { useState, useMemo } from 'react';
import { Calendar, Clock, Users, MapPin, Video, Phone, Calendar as CalendarIcon, Plus, Edit, Trash2, Search, Filter, Download, Upload, Bell, Settings, User, Building, Mail, ExternalLink, CheckCircle, AlertCircle, XCircle, BarChart3, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

interface Meeting {
  id: string;
  title: string;
  leadId: string;
  leadName: string;
  leadCompany: string;
  type: 'discovery' | 'demo' | 'proposal' | 'negotiation' | 'closing' | 'follow-up' | 'check-in';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startTime: string;
  endTime: string;
  duration: number;
  location: string;
  meetingType: 'in-person' | 'video' | 'phone' | 'hybrid';
  platform?: string;
  meetingLink?: string;
  agenda: string;
  notes: string;
  attendees: {
    id: string;
    name: string;
    email: string;
    role: string;
    type: 'internal' | 'external';
    status: 'invited' | 'accepted' | 'declined' | 'tentative';
  }[];
  reminderSettings: {
    enabled: boolean;
    leadTime: number;
    method: 'email' | 'sms' | 'push' | 'all';
  };
  recordingSettings: {
    enabled: boolean;
    autoTranscribe: boolean;
    shareWithLead: boolean;
  };
  followUpSettings: {
    autoCreateTask: boolean;
    taskDueDate: string;
    taskAssignee: string;
  };
  outcome?: {
    status: 'successful' | 'unsuccessful' | 'reschedule';
    nextSteps: string;
    leadScore: number;
    followUpRequired: boolean;
    conversionProbability: number;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface AvailabilitySlot {
  id: string;
  userId: string;
  userName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface MeetingTemplate {
  id: string;
  name: string;
  type: string;
  duration: number;
  agenda: string;
  location: string;
  meetingType: 'in-person' | 'video' | 'phone' | 'hybrid';
  reminderSettings: {
    enabled: boolean;
    leadTime: number;
    method: 'email' | 'sms' | 'push' | 'all';
  };
  isActive: boolean;
  usageCount: number;
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Discovery Call - Acme Corp',
    leadId: 'lead-1',
    leadName: 'John Smith',
    leadCompany: 'Acme Corp',
    type: 'discovery',
    status: 'scheduled',
    priority: 'high',
    startTime: '2024-03-20T10:00:00Z',
    endTime: '2024-03-20T11:00:00Z',
    duration: 60,
    location: 'Video Call',
    meetingType: 'video',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    agenda: 'Understand business requirements, pain points, and decision-making process',
    notes: 'Lead is interested in our enterprise solution. Budget approved.',
    attendees: [
      { id: '1', name: 'John Smith', email: 'john@acme.com', role: 'CTO', type: 'external', status: 'accepted' },
      { id: '2', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Sales Manager', type: 'internal', status: 'accepted' }
    ],
    reminderSettings: {
      enabled: true,
      leadTime: 15,
      method: 'email'
    },
    recordingSettings: {
      enabled: true,
      autoTranscribe: true,
      shareWithLead: false
    },
    followUpSettings: {
      autoCreateTask: true,
      taskDueDate: '2024-03-21T10:00:00Z',
      taskAssignee: 'sarah@company.com'
    },
    createdBy: 'sarah@company.com',
    createdAt: '2024-03-18T09:00:00Z',
    updatedAt: '2024-03-19T14:30:00Z'
  },
  {
    id: '2',
    title: 'Product Demo - TechStart Inc',
    leadId: 'lead-2',
    leadName: 'Mike Wilson',
    leadCompany: 'TechStart Inc',
    type: 'demo',
    status: 'completed',
    priority: 'medium',
    startTime: '2024-03-18T14:00:00Z',
    endTime: '2024-03-18T15:30:00Z',
    duration: 90,
    location: 'Conference Room A',
    meetingType: 'in-person',
    agenda: 'Product demonstration, Q&A session, pricing discussion',
    notes: 'Great engagement during demo. Interested in premium features.',
    attendees: [
      { id: '3', name: 'Mike Wilson', email: 'mike@techstart.com', role: 'CEO', type: 'external', status: 'accepted' },
      { id: '4', name: 'Alex Brown', email: 'alex@company.com', role: 'Solutions Engineer', type: 'internal', status: 'accepted' }
    ],
    reminderSettings: {
      enabled: true,
      leadTime: 30,
      method: 'all'
    },
    recordingSettings: {
      enabled: false,
      autoTranscribe: false,
      shareWithLead: false
    },
    followUpSettings: {
      autoCreateTask: true,
      taskDueDate: '2024-03-19T10:00:00Z',
      taskAssignee: 'alex@company.com'
    },
    outcome: {
      status: 'successful',
      nextSteps: 'Send proposal and contract draft',
      leadScore: 85,
      followUpRequired: true,
      conversionProbability: 75
    },
    createdBy: 'alex@company.com',
    createdAt: '2024-03-15T11:00:00Z',
    updatedAt: '2024-03-18T16:00:00Z'
  }
];

const mockAvailability: AvailabilitySlot[] = [
  { id: '1', userId: 'sarah', userName: 'Sarah Johnson', dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true },
  { id: '2', userId: 'sarah', userName: 'Sarah Johnson', dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true },
  { id: '3', userId: 'alex', userName: 'Alex Brown', dayOfWeek: 1, startTime: '10:00', endTime: '18:00', isActive: true },
  { id: '4', userId: 'alex', userName: 'Alex Brown', dayOfWeek: 3, startTime: '10:00', endTime: '18:00', isActive: true }
];

const mockTemplates: MeetingTemplate[] = [
  {
    id: '1',
    name: 'Discovery Call Template',
    type: 'discovery',
    duration: 45,
    agenda: 'Introduction, pain points discussion, current solution review, next steps',
    location: 'Video Call',
    meetingType: 'video',
    reminderSettings: {
      enabled: true,
      leadTime: 15,
      method: 'email'
    },
    isActive: true,
    usageCount: 156
  },
  {
    id: '2',
    name: 'Product Demo Template',
    type: 'demo',
    duration: 60,
    agenda: 'Product overview, feature demonstration, Q&A, pricing discussion',
    location: 'Conference Room',
    meetingType: 'in-person',
    reminderSettings: {
      enabled: true,
      leadTime: 30,
      method: 'all'
    },
    isActive: true,
    usageCount: 89
  }
];

const meetingTypeColors = {
  discovery: 'bg-blue-100 text-blue-800 border-blue-200',
  demo: 'bg-purple-100 text-purple-800 border-purple-200',
  proposal: 'bg-green-100 text-green-800 border-green-200',
  negotiation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  closing: 'bg-red-100 text-red-800 border-red-200',
  'follow-up': 'bg-gray-100 text-gray-800 border-gray-200',
  'check-in': 'bg-indigo-100 text-indigo-800 border-indigo-200'
};

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  completed: 'bg-gray-100 text-gray-800 border-gray-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  'no-show': 'bg-orange-100 text-orange-800 border-orange-200',
  rescheduled: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  urgent: 'bg-red-100 text-red-800 border-red-200'
};

export default function MeetingScheduler() {
  const [selectedTab, setSelectedTab] = useState('meetings');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'timeline'>('list');

  const filteredMeetings = useMemo(() => {
    return mockMeetings.filter(meeting => {
      const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meeting.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meeting.leadCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
      const matchesType = typeFilter === 'all' || meeting.type === typeFilter;
      const matchesPriority = priorityFilter === 'all' || meeting.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [searchQuery, statusFilter, typeFilter, priorityFilter]);

  const meetingStats = useMemo(() => {
    const total = mockMeetings.length;
    const scheduled = mockMeetings.filter(m => m.status === 'scheduled').length;
    const completed = mockMeetings.filter(m => m.status === 'completed').length;
    const cancelled = mockMeetings.filter(m => m.status === 'cancelled').length;
    const noShows = mockMeetings.filter(m => m.status === 'no-show').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    const showRate = total > 0 ? ((total - noShows - cancelled) / total) * 100 : 0;
    
    return { total, scheduled, completed, cancelled, noShows, completionRate, showRate };
  }, []);

  const upcomingMeetings = mockMeetings
    .filter(meeting => meeting.status === 'scheduled' || meeting.status === 'confirmed')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedMeeting(meeting)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{meeting.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Building className="h-4 w-4" />
              <span>{meeting.leadCompany}</span>
              <User className="h-4 w-4 ml-2" />
              <span>{meeting.leadName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{new Date(meeting.startTime).toLocaleString()}</span>
              <span>({meeting.duration} min)</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={statusColors[meeting.status]}>{meeting.status}</Badge>
            <Badge className={priorityColors[meeting.priority]}>{meeting.priority}</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <Badge className={meetingTypeColors[meeting.type]}>{meeting.type}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            {meeting.meetingType === 'video' && <Video className="h-4 w-4" />}
            {meeting.meetingType === 'phone' && <Phone className="h-4 w-4" />}
            {meeting.meetingType === 'in-person' && <MapPin className="h-4 w-4" />}
            <span className="capitalize">{meeting.meetingType}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{meeting.attendees.length} attendees</span>
          </div>
        </div>
        
        {meeting.agenda && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{meeting.agenda}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Created by {meeting.createdBy}</span>
          </div>
          <div className="flex items-center gap-2">
            {meeting.reminderSettings.enabled && <Bell className="h-4 w-4 text-blue-600" />}
            {meeting.recordingSettings.enabled && <Video className="h-4 w-4 text-purple-600" />}
            {meeting.meetingLink && <ExternalLink className="h-4 w-4 text-green-600" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CalendarView = () => (
    <div className="bg-white rounded-lg border p-6">
      <div className="grid grid-cols-7 gap-4 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-700 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="border rounded-lg p-2 h-24 text-sm">
            <div className="font-medium mb-1">{((i % 31) + 1)}</div>
            {i === 10 && (
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                Discovery Call
              </div>
            )}
            {i === 15 && (
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                Demo
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const AvailabilityManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Availability Settings</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Availability
        </Button>
      </div>
      
      <div className="grid gap-4">
        {mockAvailability.map(slot => (
          <Card key={slot.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="font-medium">{slot.userName}</div>
                  <div className="text-sm text-gray-600">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.dayOfWeek]}
                  </div>
                  <div className="text-sm text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <Switch checked={slot.isActive} />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const TemplateManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Meeting Templates</h3>
        <Button onClick={() => setIsTemplateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>
      
      <div className="grid gap-4">
        {mockTemplates.map(template => (
          <Card key={template.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">{template.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{template.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className={meetingTypeColors[template.type as keyof typeof meetingTypeColors]}>
                        {template.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Used {template.usageCount} times</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={template.isActive} />
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {template.agenda && (
                <p className="text-sm text-gray-600 mb-3">{template.agenda}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {template.meetingType === 'video' && <Video className="h-4 w-4" />}
                  {template.meetingType === 'phone' && <Phone className="h-4 w-4" />}
                  {template.meetingType === 'in-person' && <MapPin className="h-4 w-4" />}
                  <span className="capitalize">{template.meetingType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{template.location}</span>
                </div>
                {template.reminderSettings.enabled && (
                  <div className="flex items-center gap-1">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <span>Reminders enabled</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                <p className="text-2xl font-bold text-gray-900">{meetingStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{meetingStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{meetingStats.completionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Show Rate</p>
                <p className="text-2xl font-bold text-gray-900">{meetingStats.showRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meeting Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                mockMeetings.reduce((acc, meeting) => {
                  acc[meeting.type] = (acc[meeting.type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={meetingTypeColors[type as keyof typeof meetingTypeColors]}>
                      {type}
                    </Badge>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMeetings.map(meeting => (
                <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{meeting.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(meeting.startTime).toLocaleDateString()} at {new Date(meeting.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <Badge className={statusColors[meeting.status]}>{meeting.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CreateMeetingDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Meeting</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Meeting Title</Label>
              <Input id="title" placeholder="Enter meeting title" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Meeting Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discovery">Discovery Call</SelectItem>
                    <SelectItem value="demo">Product Demo</SelectItem>
                    <SelectItem value="proposal">Proposal Meeting</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closing">Closing Meeting</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input id="startTime" type="datetime-local" />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="60" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="meetingType">Meeting Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location">Location/Platform</Label>
              <Input id="location" placeholder="Conference room or meeting link" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="agenda">Agenda</Label>
              <Textarea id="agenda" rows={4} placeholder="Meeting agenda and objectives" />
            </div>
            
            <div>
              <Label>Attendees</Label>
              <div className="space-y-2">
                <Input placeholder="Search and add attendees..." />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">John Smith <X className="h-3 w-3 ml-1" /></Badge>
                  <Badge variant="secondary">Sarah Johnson <X className="h-3 w-3 ml-1" /></Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Meeting Settings</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="recording" />
                <Label htmlFor="recording">Enable recording</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="transcription" />
                <Label htmlFor="transcription">Auto-transcribe</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="reminder" defaultChecked />
                <Label htmlFor="reminder">Send reminders</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="followup" defaultChecked />
                <Label htmlFor="followup">Create follow-up task</Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Schedule Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meeting Scheduler</h1>
              <p className="text-gray-600">Schedule and manage lead meetings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="meetings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search meetings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="discovery">Discovery</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closing">Closing</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                >
                  Timeline
                </Button>
              </div>
            </div>

            {viewMode === 'list' && (
              <div className="grid gap-4">
                {filteredMeetings.map(meeting => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
                {filteredMeetings.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No meetings found matching your criteria
                  </div>
                )}
              </div>
            )}

            {viewMode === 'calendar' && <CalendarView />}

            {viewMode === 'timeline' && (
              <div className="bg-white rounded-lg border p-6">
                <div className="space-y-4">
                  {filteredMeetings
                    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                    .map((meeting, index) => (
                      <div key={meeting.id} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                          {index < filteredMeetings.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{meeting.title}</h4>
                            <Badge className={statusColors[meeting.status]}>{meeting.status}</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(meeting.startTime).toLocaleString()} - {meeting.leadName} at {meeting.leadCompany}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityManagement />
          </TabsContent>

          <TabsContent value="templates">
            <TemplateManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsView />
          </TabsContent>
        </Tabs>
      </div>

      <CreateMeetingDialog />

      {selectedMeeting && (
        <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedMeeting.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Lead Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedMeeting.leadName}</p>
                    <p className="text-sm text-gray-600">{selectedMeeting.leadCompany}</p>
                  </div>
                </div>
                
                <div>
                  <Label>Meeting Details</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(selectedMeeting.startTime).toLocaleString()}</span>
                      <span>({selectedMeeting.duration} min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedMeeting.meetingType === 'video' && <Video className="h-4 w-4" />}
                      {selectedMeeting.meetingType === 'phone' && <Phone className="h-4 w-4" />}
                      {selectedMeeting.meetingType === 'in-person' && <MapPin className="h-4 w-4" />}
                      <span className="capitalize">{selectedMeeting.meetingType}</span>
                      <span>- {selectedMeeting.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Status & Priority</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={statusColors[selectedMeeting.status]}>
                      {selectedMeeting.status}
                    </Badge>
                    <Badge className={priorityColors[selectedMeeting.priority]}>
                      {selectedMeeting.priority}
                    </Badge>
                    <Badge className={meetingTypeColors[selectedMeeting.type]}>
                      {selectedMeeting.type}
                    </Badge>
                  </div>
                </div>
                
                {selectedMeeting.meetingLink && (
                  <div>
                    <Label>Meeting Link</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input value={selectedMeeting.meetingLink} readOnly />
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {selectedMeeting.agenda && (
                  <div>
                    <Label>Agenda</Label>
                    <div className="bg-gray-50 rounded-lg p-4 mt-1">
                      <p className="text-sm">{selectedMeeting.agenda}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <Label>Attendees ({selectedMeeting.attendees.length})</Label>
                  <div className="space-y-2 mt-1">
                    {selectedMeeting.attendees.map(attendee => (
                      <div key={attendee.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="font-medium text-sm">{attendee.name}</p>
                          <p className="text-xs text-gray-600">{attendee.email} - {attendee.role}</p>
                        </div>
                        <Badge variant={attendee.status === 'accepted' ? 'default' : 'secondary'} className="text-xs">
                          {attendee.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedMeeting.outcome && (
                  <div>
                    <Label>Meeting Outcome</Label>
                    <div className="bg-gray-50 rounded-lg p-4 mt-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {selectedMeeting.outcome.status === 'successful' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {selectedMeeting.outcome.status === 'unsuccessful' && <XCircle className="h-4 w-4 text-red-600" />}
                        {selectedMeeting.outcome.status === 'reschedule' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                        <span className="capitalize font-medium">{selectedMeeting.outcome.status}</span>
                      </div>
                      <p className="text-sm">{selectedMeeting.outcome.nextSteps}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Lead Score: {selectedMeeting.outcome.leadScore}/100</span>
                        <span>Conversion: {selectedMeeting.outcome.conversionProbability}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Meeting
              </Button>
              {selectedMeeting.status === 'scheduled' && (
                <Button>
                  <Video className="h-4 w-4 mr-2" />
                  Join Meeting
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
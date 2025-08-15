'use client';

import { useState, useMemo } from 'react';
import {
  Video,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  Phone,
  MoreHorizontal,
  Play,
  Square,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Share2,
  Download,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  FileText,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface VideoMeeting {
  id: string;
  title: string;
  description: string;
  hostName: string;
  hostAvatar: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  participants: Participant[];
  invitedCount: number;
  joinedCount: number;
  maxParticipants: number;
  meetingType: 'consultation' | 'presentation' | 'follow-up' | 'demo' | 'internal';
  meetingUrl: string;
  recordingUrl?: string;
  agenda?: string[];
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  leadId?: string;
  projectId?: string;
  duration?: number; // in minutes
  isRecorded: boolean;
  notes?: string;
  followUpTasks?: string[];
}

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'host' | 'attendee' | 'presenter';
  status: 'invited' | 'accepted' | 'declined' | 'joined' | 'left';
  joinTime?: string;
  leaveTime?: string;
  connectionQuality?: 'excellent' | 'good' | 'fair' | 'poor';
}

const mockMeetings: VideoMeeting[] = [
  {
    id: 'VM001',
    title: 'Commercial Project Consultation',
    description: 'Initial consultation meeting with Metro Development Corp for their commercial plaza project',
    hostName: 'Mike Chen',
    hostAvatar: '/avatars/mike.jpg',
    scheduledStart: '2024-01-30T14:00:00',
    scheduledEnd: '2024-01-30T15:00:00',
    actualStart: '2024-01-30T14:02:00',
    status: 'live',
    participants: [
      {
        id: 'P001',
        name: 'Sarah Johnson',
        email: 'sarah.j@metrodev.com',
        role: 'attendee',
        status: 'joined',
        joinTime: '14:02',
        connectionQuality: 'excellent'
      },
      {
        id: 'P002',
        name: 'Mike Chen',
        email: 'mike.c@buildiyo.com',
        role: 'host',
        status: 'joined',
        joinTime: '14:00',
        connectionQuality: 'excellent'
      }
    ],
    invitedCount: 3,
    joinedCount: 2,
    maxParticipants: 10,
    meetingType: 'consultation',
    meetingUrl: 'https://meet.buildiyo.com/vm001',
    agenda: [
      'Project overview and requirements',
      'Timeline discussion',
      'Budget estimation',
      'Next steps planning'
    ],
    tags: ['commercial', 'high-value', 'new-client'],
    priority: 'high',
    leadId: 'LEAD001',
    isRecorded: true,
    notes: 'Client seems very interested. Follow up with detailed proposal.'
  },
  {
    id: 'VM002',
    title: 'Weekly Team Standup',
    description: 'Weekly internal team meeting to discuss project progress and roadblocks',
    hostName: 'Lisa Wang',
    hostAvatar: '/avatars/lisa.jpg',
    scheduledStart: '2024-01-31T09:00:00',
    scheduledEnd: '2024-01-31T09:30:00',
    status: 'scheduled',
    participants: [
      {
        id: 'P003',
        name: 'James Wilson',
        email: 'james.w@buildiyo.com',
        role: 'attendee',
        status: 'accepted'
      },
      {
        id: 'P004',
        name: 'Emily Rodriguez',
        email: 'emily.r@buildiyo.com',
        role: 'attendee',
        status: 'accepted'
      }
    ],
    invitedCount: 5,
    joinedCount: 0,
    maxParticipants: 10,
    meetingType: 'internal',
    meetingUrl: 'https://meet.buildiyo.com/vm002',
    agenda: [
      'Project status updates',
      'Resource allocation',
      'Upcoming deadlines',
      'Team announcements'
    ],
    tags: ['internal', 'recurring', 'team'],
    priority: 'medium',
    isRecorded: false
  },
  {
    id: 'VM003',
    title: 'Home Renovation Demo',
    description: 'Product demonstration for residential renovation services',
    hostName: 'David Martinez',
    hostAvatar: '/avatars/david.jpg',
    scheduledStart: '2024-01-29T16:00:00',
    scheduledEnd: '2024-01-29T17:00:00',
    actualStart: '2024-01-29T16:00:00',
    actualEnd: '2024-01-29T17:15:00',
    status: 'ended',
    participants: [
      {
        id: 'P005',
        name: 'Jennifer Smith',
        email: 'jen.smith@email.com',
        role: 'attendee',
        status: 'left',
        joinTime: '16:00',
        leaveTime: '17:15',
        connectionQuality: 'good'
      }
    ],
    invitedCount: 2,
    joinedCount: 2,
    maxParticipants: 5,
    meetingType: 'demo',
    meetingUrl: 'https://meet.buildiyo.com/vm003',
    recordingUrl: 'https://recordings.buildiyo.com/vm003.mp4',
    agenda: [
      'Service overview',
      'Portfolio presentation',
      'Q&A session',
      'Quote discussion'
    ],
    tags: ['residential', 'demo', 'conversion'],
    priority: 'high',
    leadId: 'LEAD003',
    duration: 75,
    isRecorded: true,
    notes: 'Great engagement. Client requested detailed quote.',
    followUpTasks: [
      'Send detailed quote',
      'Schedule site visit',
      'Follow up in 3 days'
    ]
  }
];

function getStatusColor(status: VideoMeeting['status']) {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'live': return 'bg-green-100 text-green-800 animate-pulse';
    case 'ended': return 'bg-gray-100 text-gray-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: VideoMeeting['priority']) {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getParticipantStatusColor(status: Participant['status']) {
  switch (status) {
    case 'joined': return 'text-green-600';
    case 'accepted': return 'text-blue-600';
    case 'declined': return 'text-red-600';
    case 'left': return 'text-gray-600';
    case 'invited': return 'text-yellow-600';
    default: return 'text-gray-600';
  }
}

export default function VideoMeetings() {
  const [meetings] = useState(mockMeetings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredMeetings = useMemo(() => {
    return meetings.filter(meeting => {
      const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meeting.hostName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
      const matchesType = typeFilter === 'all' || meeting.meetingType === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [meetings, searchQuery, statusFilter, typeFilter]);

  const summaryStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const scheduledToday = meetings.filter(m => 
      m.scheduledStart.startsWith(today) && m.status === 'scheduled'
    ).length;
    const liveMeetings = meetings.filter(m => m.status === 'live').length;
    const totalParticipants = meetings.reduce((sum, m) => sum + m.joinedCount, 0);
    const avgDuration = meetings
      .filter(m => m.duration)
      .reduce((sum, m) => sum + (m.duration || 0), 0) / 
      meetings.filter(m => m.duration).length || 0;

    return {
      scheduledToday,
      liveMeetings,
      totalParticipants,
      avgDuration: Math.round(avgDuration)
    };
  }, [meetings]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Video Meetings</h1>
          <p className="text-gray-600">Manage and track your video conferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled Today</p>
                <p className="text-2xl font-bold">{summaryStats.scheduledToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Live Meetings</p>
                <p className="text-2xl font-bold">{summaryStats.liveMeetings}</p>
              </div>
              <div className="relative">
                <Video className="h-8 w-8 text-green-600" />
                {summaryStats.liveMeetings > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Participants</p>
                <p className="text-2xl font-bold">{summaryStats.totalParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold">{summaryStats.avgDuration}m</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search meetings..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="presentation">Presentation</SelectItem>
            <SelectItem value="demo">Demo</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{meeting.title}</h3>
                        <Badge className={cn("text-xs", getStatusColor(meeting.status))}>
                          {meeting.status.toUpperCase()}
                        </Badge>
                        <Badge className={cn("text-xs", getPriorityColor(meeting.priority))}>
                          {meeting.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{meeting.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>Host: {meeting.hostName}</span>
                        <span>•</span>
                        <span>
                          {new Date(meeting.scheduledStart).toLocaleDateString()} at{' '}
                          {new Date(meeting.scheduledStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>•</span>
                        <span>
                          Duration: {Math.round((new Date(meeting.scheduledEnd).getTime() - new Date(meeting.scheduledStart).getTime()) / 60000)}m
                        </span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {meeting.status === 'scheduled' && (
                          <DropdownMenuItem>
                            <Video className="h-4 w-4 mr-2" />
                            Join Meeting
                          </DropdownMenuItem>
                        )}
                        {meeting.status === 'live' && (
                          <DropdownMenuItem>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Join Live
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite Participants
                        </DropdownMenuItem>
                        {meeting.recordingUrl && (
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Recording
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Cancel Meeting
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {meeting.meetingType}
                    </Badge>
                    {meeting.isRecorded && (
                      <Badge variant="secondary" className="text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        Recorded
                      </Badge>
                    )}
                    {meeting.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Participants</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex -space-x-2">
                          {meeting.participants.slice(0, 3).map((participant, index) => (
                            <Avatar key={index} className="h-6 w-6 border-2 border-white">
                              <AvatarImage src={participant.avatar} />
                              <AvatarFallback className="text-xs">
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {meeting.participants.length > 3 && (
                            <div className="h-6 w-6 bg-gray-100 border-2 border-white rounded-full flex items-center justify-center text-xs text-gray-600">
                              +{meeting.participants.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {meeting.joinedCount}/{meeting.invitedCount}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Meeting URL</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded truncate">
                          {meeting.meetingUrl.replace('https://', '')}
                        </code>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {meeting.status === 'live' && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium">Live Now</span>
                          </div>
                        )}
                        {meeting.status === 'scheduled' && (
                          <span className="text-sm text-blue-600 font-medium">
                            Starts in {Math.round((new Date(meeting.scheduledStart).getTime() - new Date().getTime()) / (1000 * 60 * 60))}h
                          </span>
                        )}
                        {meeting.status === 'ended' && meeting.duration && (
                          <span className="text-sm text-gray-600">
                            Duration: {meeting.duration}m
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {meeting.agenda && meeting.agenda.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">Agenda:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meeting.agenda.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-gray-400">{index + 1}.</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {meeting.agenda.length > 3 && (
                          <li className="text-gray-400 text-xs">
                            +{meeting.agenda.length - 3} more items
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {meeting.notes && (
                    <div className="pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                      <p className="text-sm text-gray-600">{meeting.notes}</p>
                    </div>
                  )}

                  {meeting.followUpTasks && meeting.followUpTasks.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">Follow-up Tasks:</p>
                      <div className="space-y-1">
                        {meeting.followUpTasks.map((task, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMeetings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meetings found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? "Try adjusting your search or filters"
                  : "Schedule your first meeting to get started"
                }
              </p>
              {(!searchQuery && statusFilter === 'all' && typeFilter === 'all') && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
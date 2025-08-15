'use client';

import { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  User,
  MessageSquare,
  Mail,
  Phone,
  Video,
  FileText,
  Star,
  Filter,
  Search,
  Download,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Reply,
  Forward,
  Share2,
  PhoneIncoming,
  PhoneOutgoing,
  Send,
  Paperclip,
  Tag,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'sms' | 'note' | 'task' | 'lead_created' | 'status_change' | 'assignment' | 'document' | 'quote' | 'payment';
  title: string;
  description: string;
  timestamp: string;
  contactName?: string;
  contactAvatar?: string;
  agentName: string;
  agentAvatar?: string;
  duration?: number; // for calls/meetings
  status: 'completed' | 'pending' | 'failed' | 'cancelled' | 'scheduled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  leadId?: string;
  projectId?: string;
  tags: string[];
  direction?: 'inbound' | 'outbound' | 'internal';
  outcome?: 'successful' | 'failed' | 'pending' | 'follow_up_required';
  nextAction?: string;
  attachments?: string[];
  relatedEvents?: string[];
  isStarred: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
  value?: number; // for deals, quotes, etc.
  metadata?: {
    oldValue?: string;
    newValue?: string;
    reason?: string;
    amount?: number;
    currency?: string;
  };
}

const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'TL001',
    type: 'lead_created',
    title: 'New Lead Created',
    description: 'Sarah Martinez submitted a contact form through the website for commercial building services',
    timestamp: '2024-01-30T09:00:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'System',
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD001',
    tags: ['lead-creation', 'website', 'commercial'],
    direction: 'inbound',
    outcome: 'successful',
    isStarred: false,
    sentiment: 'neutral',
    metadata: {
      reason: 'Website form submission'
    }
  },
  {
    id: 'TL002',
    type: 'assignment',
    title: 'Lead Assigned',
    description: 'Lead assigned to Mike Chen for follow-up based on commercial building expertise',
    timestamp: '2024-01-30T09:15:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Lisa Wang',
    agentAvatar: '/avatars/lisa.jpg',
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD001',
    tags: ['assignment', 'commercial'],
    direction: 'internal',
    outcome: 'successful',
    isStarred: false,
    metadata: {
      oldValue: 'Unassigned',
      newValue: 'Mike Chen',
      reason: 'Commercial expertise match'
    }
  },
  {
    id: 'TL003',
    type: 'call',
    title: 'Initial Consultation Call',
    description: 'Called Sarah to discuss her commercial plaza development project requirements',
    timestamp: '2024-01-30T10:30:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    duration: 720,
    status: 'completed',
    priority: 'high',
    leadId: 'LEAD001',
    tags: ['consultation', 'commercial', 'plaza'],
    direction: 'outbound',
    outcome: 'successful',
    nextAction: 'Send detailed proposal',
    isStarred: true,
    sentiment: 'positive',
    value: 2500000,
    metadata: {
      amount: 2500000,
      currency: 'USD'
    }
  },
  {
    id: 'TL004',
    type: 'email',
    title: 'Proposal Sent',
    description: 'Detailed proposal for commercial plaza development sent with floor plans and timeline',
    timestamp: '2024-01-30T14:30:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    status: 'completed',
    priority: 'high',
    leadId: 'LEAD001',
    tags: ['proposal', 'commercial', 'documentation'],
    direction: 'outbound',
    outcome: 'pending',
    nextAction: 'Follow up in 3 days',
    attachments: ['proposal_v1.pdf', 'floor_plans.pdf', 'timeline.pdf'],
    isStarred: true,
    sentiment: 'positive'
  },
  {
    id: 'TL005',
    type: 'status_change',
    title: 'Status Updated',
    description: 'Lead status changed from "New" to "Proposal Sent" after sending detailed proposal',
    timestamp: '2024-01-30T14:35:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD001',
    tags: ['status-change', 'proposal'],
    direction: 'internal',
    outcome: 'successful',
    isStarred: false,
    metadata: {
      oldValue: 'New',
      newValue: 'Proposal Sent',
      reason: 'Proposal documentation sent'
    }
  },
  {
    id: 'TL006',
    type: 'meeting',
    title: 'Site Visit Scheduled',
    description: 'Video meeting to discuss site visit and answer technical questions',
    timestamp: '2024-01-31T16:00:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    duration: 1800,
    status: 'scheduled',
    priority: 'high',
    leadId: 'LEAD001',
    tags: ['meeting', 'site-visit', 'technical'],
    direction: 'outbound',
    outcome: 'pending',
    nextAction: 'Prepare site assessment checklist',
    isStarred: false,
    sentiment: 'positive'
  },
  {
    id: 'TL007',
    type: 'note',
    title: 'Client Requirements Update',
    description: 'Updated client requirements based on feedback: need LEED certification and sustainable materials',
    timestamp: '2024-01-31T11:00:00',
    contactName: 'Sarah Martinez',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD001',
    tags: ['requirements', 'leed', 'sustainability'],
    direction: 'internal',
    outcome: 'successful',
    nextAction: 'Research LEED certified contractors',
    isStarred: false
  }
];

function getEventIcon(type: TimelineEvent['type'], direction?: TimelineEvent['direction']) {
  switch (type) {
    case 'email':
      return direction === 'inbound' ? <Mail className="h-4 w-4" /> : <Send className="h-4 w-4" />;
    case 'call':
      return direction === 'inbound' ? <PhoneIncoming className="h-4 w-4" /> : <PhoneOutgoing className="h-4 w-4" />;
    case 'meeting':
      return <Video className="h-4 w-4" />;
    case 'sms':
      return <MessageSquare className="h-4 w-4" />;
    case 'note':
      return <FileText className="h-4 w-4" />;
    case 'task':
      return <CheckCircle className="h-4 w-4" />;
    case 'lead_created':
      return <Plus className="h-4 w-4" />;
    case 'status_change':
      return <ArrowRight className="h-4 w-4" />;
    case 'assignment':
      return <User className="h-4 w-4" />;
    case 'document':
      return <Paperclip className="h-4 w-4" />;
    case 'quote':
      return <FileText className="h-4 w-4" />;
    case 'payment':
      return <Target className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
}

function getEventColor(type: TimelineEvent['type'], outcome?: TimelineEvent['outcome']) {
  const baseColors = {
    email: 'blue',
    call: 'green',
    meeting: 'purple',
    sms: 'indigo',
    note: 'gray',
    task: 'emerald',
    lead_created: 'cyan',
    status_change: 'orange',
    assignment: 'pink',
    document: 'violet',
    quote: 'yellow',
    payment: 'emerald'
  };

  const color = baseColors[type] || 'gray';
  
  if (outcome === 'failed') return 'red';
  if (outcome === 'pending') return 'yellow';
  
  return color;
}

function getStatusColor(status: TimelineEvent['status']) {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'failed': return 'bg-red-100 text-red-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: TimelineEvent['priority']) {
  switch (priority) {
    case 'critical': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getSentimentColor(sentiment?: TimelineEvent['sentiment']) {
  switch (sentiment) {
    case 'positive': return 'text-green-600';
    case 'neutral': return 'text-yellow-600';
    case 'negative': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export default function InteractionTimeline() {
  const [events] = useState(mockTimelineEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contactFilter, setContactFilter] = useState<string>('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (event.contactName && event.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           event.agentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesContact = contactFilter === 'all' || event.contactName === contactFilter;
      const matchesStarred = !showStarredOnly || event.isStarred;
      
      return matchesSearch && matchesType && matchesStatus && matchesContact && matchesStarred;
    });
  }, [events, searchQuery, typeFilter, statusFilter, contactFilter, showStarredOnly]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [filteredEvents]);

  const summaryStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = events.filter(e => e.timestamp.startsWith(today)).length;
    const completedEvents = events.filter(e => e.status === 'completed').length;
    const pendingEvents = events.filter(e => e.status === 'pending' || e.status === 'scheduled').length;
    const starredEvents = events.filter(e => e.isStarred).length;

    return {
      todayEvents,
      completedEvents,
      pendingEvents,
      starredEvents
    };
  }, [events]);

  const uniqueContacts = useMemo(() => {
    const contacts = Array.from(new Set(events.map(e => e.contactName).filter(Boolean)));
    return contacts;
  }, [events]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Interaction Timeline</h1>
          <p className="text-gray-600">Comprehensive timeline of all customer interactions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant={showStarredOnly ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowStarredOnly(!showStarredOnly)}
          >
            <Star className={cn("h-4 w-4 mr-2", showStarredOnly && "fill-current")} />
            Starred
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Events</p>
                <p className="text-2xl font-bold">{summaryStats.todayEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{summaryStats.completedEvents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending/Scheduled</p>
                <p className="text-2xl font-bold">{summaryStats.pendingEvents}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Starred</p>
                <p className="text-2xl font-bold">{summaryStats.starredEvents}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search interactions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="call">Call</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="note">Note</SelectItem>
            <SelectItem value="task">Task</SelectItem>
            <SelectItem value="lead_created">Lead Created</SelectItem>
            <SelectItem value="status_change">Status Change</SelectItem>
            <SelectItem value="assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={contactFilter} onValueChange={setContactFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Contacts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contacts</SelectItem>
            {uniqueContacts.map((contact) => (
              <SelectItem key={contact} value={contact}>{contact}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {sortedEvents.map((event, index) => {
                const eventColor = getEventColor(event.type, event.outcome);
                
                return (
                  <div key={event.id} className="relative flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className={cn(
                      "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-md",
                      `bg-${eventColor}-100`
                    )}>
                      <div className={cn("text-white", `text-${eventColor}-600`)}>
                        {getEventIcon(event.type, event.direction)}
                      </div>
                    </div>

                    {/* Event content */}
                    <div className="flex-1 min-w-0 pb-8">
                      <div className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              {event.isStarred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                              <Badge className={cn("text-xs", getStatusColor(event.status))}>
                                {event.status}
                              </Badge>
                              <Badge className={cn("text-xs", getPriorityColor(event.priority))}>
                                {event.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-3">{event.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={event.agentAvatar} />
                                  <AvatarFallback className="text-xs">
                                    {event.agentName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{event.agentName}</span>
                              </div>
                              {event.contactName && (
                                <>
                                  <ArrowRight className="h-3 w-3" />
                                  <div className="flex items-center space-x-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarImage src={event.contactAvatar} />
                                      <AvatarFallback className="text-xs">
                                        {event.contactName.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{event.contactName}</span>
                                  </div>
                                </>
                              )}
                              <span>•</span>
                              <span>{new Date(event.timestamp).toLocaleString()}</span>
                              {event.duration && (
                                <>
                                  <span>•</span>
                                  <span>Duration: {formatDuration(event.duration)}</span>
                                </>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {event.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center space-x-2 text-sm">
                                {event.sentiment && (
                                  <span className={cn("font-medium", getSentimentColor(event.sentiment))}>
                                    {event.sentiment}
                                  </span>
                                )}
                                {event.value && (
                                  <span className="font-semibold text-green-600">
                                    ${event.value.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            {event.nextAction && (
                              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <p className="text-sm text-yellow-800">
                                  <strong>Next Action:</strong> {event.nextAction}
                                </p>
                              </div>
                            )}

                            {event.attachments && event.attachments.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                                <div className="flex flex-wrap gap-2">
                                  {event.attachments.map((attachment, attIndex) => (
                                    <div key={attIndex} className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                      <Paperclip className="h-3 w-3" />
                                      <span>{attachment}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {event.metadata && (
                              <div className="mt-3 text-sm text-gray-600">
                                {event.metadata.oldValue && event.metadata.newValue && (
                                  <p>
                                    Changed from <span className="font-medium">{event.metadata.oldValue}</span> to{' '}
                                    <span className="font-medium">{event.metadata.newValue}</span>
                                    {event.metadata.reason && (
                                      <span className="text-gray-500"> ({event.metadata.reason})</span>
                                    )}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="h-4 w-4 mr-2" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Forward className="h-4 w-4 mr-2" />
                                Forward
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                {event.isStarred ? 'Unstar' : 'Star'}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {sortedEvents.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No interactions found</h3>
                  <p className="text-gray-600">
                    {searchQuery || typeFilter !== 'all' || statusFilter !== 'all' || contactFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Interactions will appear here as they occur"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
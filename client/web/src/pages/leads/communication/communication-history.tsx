'use client';

import { useState, useMemo } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Video,
  FileText,
  Calendar,
  User,
  Search,
  Filter,
  Clock,
  ArrowRight,
  PhoneIncoming,
  PhoneOutgoing,
  Send,
  Reply,
  Forward,
  Download,
  ExternalLink,
  Tag,
  Star,
  Archive,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy
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

interface CommunicationRecord {
  id: string;
  type: 'email' | 'call' | 'sms' | 'meeting' | 'note' | 'task' | 'document';
  direction: 'inbound' | 'outbound' | 'internal';
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAvatar?: string;
  agentName: string;
  agentAvatar?: string;
  subject?: string;
  content: string;
  timestamp: string;
  duration?: number; // for calls/meetings in seconds
  status: 'sent' | 'delivered' | 'read' | 'replied' | 'completed' | 'failed' | 'scheduled' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  leadId?: string;
  projectId?: string;
  tags: string[];
  attachments?: string[];
  followUpRequired: boolean;
  followUpDate?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  outcome?: 'successful' | 'pending' | 'failed';
  notes?: string;
  isStarred: boolean;
  isArchived: boolean;
}

const mockCommunications: CommunicationRecord[] = [
  {
    id: 'COM001',
    type: 'email',
    direction: 'outbound',
    contactName: 'Sarah Martinez',
    contactEmail: 'sarah.m@metrodev.com',
    contactAvatar: '/avatars/sarah-m.jpg',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    subject: 'Commercial Plaza Project Proposal',
    content: 'Thank you for your interest in our commercial building services. I\'ve attached a detailed proposal for your plaza development project...',
    timestamp: '2024-01-30T14:30:00',
    status: 'read',
    priority: 'high',
    leadId: 'LEAD001',
    tags: ['proposal', 'commercial', 'high-value'],
    attachments: ['proposal_v1.pdf', 'floor_plans.pdf'],
    followUpRequired: true,
    followUpDate: '2024-02-05',
    sentiment: 'positive',
    outcome: 'successful',
    isStarred: true,
    isArchived: false
  },
  {
    id: 'COM002',
    type: 'call',
    direction: 'inbound',
    contactName: 'John Davis',
    contactPhone: '+1 (555) 987-6543',
    contactAvatar: '/avatars/john-d.jpg',
    agentName: 'Lisa Wang',
    agentAvatar: '/avatars/lisa.jpg',
    subject: 'Follow-up on Residential Renovation',
    content: 'Customer called to discuss timeline and budget adjustments for the kitchen renovation project. Positive conversation, customer is ready to proceed.',
    timestamp: '2024-01-30T10:15:00',
    duration: 420,
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD002',
    tags: ['follow-up', 'residential', 'kitchen'],
    followUpRequired: true,
    followUpDate: '2024-02-01',
    sentiment: 'positive',
    outcome: 'successful',
    notes: 'Customer requested slight timeline extension',
    isStarred: false,
    isArchived: false
  },
  {
    id: 'COM003',
    type: 'meeting',
    direction: 'outbound',
    contactName: 'Emily Chen',
    contactEmail: 'emily.c@startup.com',
    contactAvatar: '/avatars/emily-c.jpg',
    agentName: 'James Wilson',
    agentAvatar: '/avatars/james.jpg',
    subject: 'Office Space Consultation',
    content: 'Initial consultation meeting to discuss office renovation requirements for startup company. Covered space planning, timeline, and budget.',
    timestamp: '2024-01-29T16:00:00',
    duration: 3600,
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD003',
    tags: ['consultation', 'office-space', 'startup'],
    followUpRequired: true,
    followUpDate: '2024-02-02',
    sentiment: 'positive',
    outcome: 'successful',
    notes: 'Great potential, need to send detailed quote',
    isStarred: false,
    isArchived: false
  },
  {
    id: 'COM004',
    type: 'sms',
    direction: 'outbound',
    contactName: 'Michael Brown',
    contactPhone: '+1 (555) 456-7890',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    content: 'Hi Michael, just wanted to confirm our appointment tomorrow at 2 PM for the site visit. Please let me know if you need to reschedule.',
    timestamp: '2024-01-29T15:30:00',
    status: 'delivered',
    priority: 'low',
    leadId: 'LEAD004',
    tags: ['appointment', 'site-visit'],
    followUpRequired: false,
    sentiment: 'neutral',
    outcome: 'pending',
    isStarred: false,
    isArchived: false
  },
  {
    id: 'COM005',
    type: 'note',
    direction: 'internal',
    contactName: 'Project Team',
    agentName: 'Lisa Wang',
    agentAvatar: '/avatars/lisa.jpg',
    subject: 'Client Requirements Update',
    content: 'Updated client requirements based on yesterday\'s meeting. They want to add a conference room and modify the kitchen layout.',
    timestamp: '2024-01-29T09:45:00',
    status: 'completed',
    priority: 'medium',
    projectId: 'PROJ001',
    tags: ['internal', 'requirements', 'update'],
    followUpRequired: false,
    isStarred: false,
    isArchived: false
  }
];

function getCommunicationIcon(type: CommunicationRecord['type'], direction?: CommunicationRecord['direction']) {
  switch (type) {
    case 'email':
      return direction === 'inbound' ? <Mail className="h-4 w-4 text-blue-600" /> : <Send className="h-4 w-4 text-blue-600" />;
    case 'call':
      return direction === 'inbound' ? <PhoneIncoming className="h-4 w-4 text-green-600" /> : <PhoneOutgoing className="h-4 w-4 text-green-600" />;
    case 'sms':
      return <MessageSquare className="h-4 w-4 text-purple-600" />;
    case 'meeting':
      return <Video className="h-4 w-4 text-orange-600" />;
    case 'note':
      return <FileText className="h-4 w-4 text-gray-600" />;
    case 'task':
      return <Calendar className="h-4 w-4 text-red-600" />;
    case 'document':
      return <FileText className="h-4 w-4 text-indigo-600" />;
    default:
      return <MessageSquare className="h-4 w-4 text-gray-600" />;
  }
}

function getStatusColor(status: CommunicationRecord['status']) {
  switch (status) {
    case 'sent': return 'bg-blue-100 text-blue-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'read': return 'bg-emerald-100 text-emerald-800';
    case 'replied': return 'bg-purple-100 text-purple-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'failed': return 'bg-red-100 text-red-800';
    case 'scheduled': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: CommunicationRecord['priority']) {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getSentimentColor(sentiment?: CommunicationRecord['sentiment']) {
  switch (sentiment) {
    case 'positive': return 'text-green-600';
    case 'neutral': return 'text-yellow-600';
    case 'negative': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function CommunicationHistory() {
  const [communications] = useState(mockCommunications);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contactFilter, setContactFilter] = useState<string>('all');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const filteredCommunications = useMemo(() => {
    return communications.filter(comm => {
      const matchesSearch = comm.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (comm.subject && comm.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           comm.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           comm.agentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || comm.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || comm.status === statusFilter;
      const matchesContact = contactFilter === 'all' || comm.contactName === contactFilter;
      const matchesStarred = !showStarredOnly || comm.isStarred;
      
      return matchesSearch && matchesType && matchesStatus && matchesContact && matchesStarred && !comm.isArchived;
    });
  }, [communications, searchQuery, typeFilter, statusFilter, contactFilter, showStarredOnly]);

  const summaryStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayCommunications = communications.filter(c => 
      c.timestamp.startsWith(today)
    ).length;
    const totalEmails = communications.filter(c => c.type === 'email').length;
    const totalCalls = communications.filter(c => c.type === 'call').length;
    const followUpsRequired = communications.filter(c => c.followUpRequired && !c.isArchived).length;

    return {
      todayCommunications,
      totalEmails,
      totalCalls,
      followUpsRequired
    };
  }, [communications]);

  const uniqueContacts = useMemo(() => {
    const contacts = Array.from(new Set(communications.map(c => c.contactName)));
    return contacts;
  }, [communications]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Communication History</h1>
          <p className="text-gray-600">Track all interactions with leads and customers</p>
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
                <p className="text-sm text-gray-600">Today's Communications</p>
                <p className="text-2xl font-bold">{summaryStats.todayCommunications}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Emails</p>
                <p className="text-2xl font-bold">{summaryStats.totalEmails}</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calls</p>
                <p className="text-2xl font-bold">{summaryStats.totalCalls}</p>
              </div>
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Follow-ups Required</p>
                <p className="text-2xl font-bold">{summaryStats.followUpsRequired}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search communications..."
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
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="note">Note</SelectItem>
            <SelectItem value="task">Task</SelectItem>
            <SelectItem value="document">Document</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
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

      {/* Communications List */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredCommunications.map((comm, index) => (
              <div key={comm.id} className={cn(
                "p-6 border-b hover:bg-gray-50 transition-colors",
                index === filteredCommunications.length - 1 && "border-b-0"
              )}>
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getCommunicationIcon(comm.type, comm.direction)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-lg">{comm.contactName}</h4>
                          {comm.isStarred && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                          <Badge className={cn("text-xs", getStatusColor(comm.status))}>
                            {comm.status}
                          </Badge>
                          <Badge className={cn("text-xs", getPriorityColor(comm.priority))}>
                            {comm.priority}
                          </Badge>
                        </div>

                        {comm.subject && (
                          <h5 className="font-medium text-gray-900 mb-2">{comm.subject}</h5>
                        )}

                        <p className="text-gray-600 mb-3 line-clamp-2">{comm.content}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={comm.agentAvatar} />
                              <AvatarFallback className="text-xs">
                                {comm.agentName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{comm.agentName}</span>
                          </div>
                          <span>•</span>
                          <span>{new Date(comm.timestamp).toLocaleString()}</span>
                          {comm.duration && (
                            <>
                              <span>•</span>
                              <span>Duration: {formatDuration(comm.duration)}</span>
                            </>
                          )}
                          {comm.sentiment && (
                            <>
                              <span>•</span>
                              <span className={cn("font-medium", getSentimentColor(comm.sentiment))}>
                                {comm.sentiment} sentiment
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {comm.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-2">
                            {comm.followUpRequired && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                Follow-up: {comm.followUpDate ? new Date(comm.followUpDate).toLocaleDateString() : 'Required'}
                              </Badge>
                            )}
                            {comm.attachments && comm.attachments.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {comm.attachments.length} attachment{comm.attachments.length > 1 ? 's' : ''}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {comm.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                              <strong>Notes:</strong> {comm.notes}
                            </p>
                          </div>
                        )}

                        {comm.attachments && comm.attachments.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                            <div className="flex flex-wrap gap-2">
                              {comm.attachments.map((attachment, attIndex) => (
                                <div key={attIndex} className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                  <FileText className="h-3 w-3" />
                                  <span>{attachment}</span>
                                  <Download className="h-3 w-3 cursor-pointer hover:text-blue-800" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
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
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="h-4 w-4 mr-2" />
                              {comm.isStarred ? 'Unstar' : 'Star'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
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
              </div>
            ))}

            {filteredCommunications.length === 0 && (
              <div className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No communications found</h3>
                <p className="text-gray-600">
                  {searchQuery || typeFilter !== 'all' || statusFilter !== 'all' || contactFilter !== 'all'
                    ? "Try adjusting your search or filters"
                    : "Communication history will appear here as you interact with leads"
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
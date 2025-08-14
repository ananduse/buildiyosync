import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  Video,
  FileText,
  AlertCircle,
  CheckCircle,
  Calendar as MeetingIcon,
  Users,
  Target,
  DollarSign,
  Activity,
  Eye,
  Edit,
  MoreHorizontal,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek, isToday } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Types
interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  temperature: 'hot' | 'warm' | 'cold';
  priority: 'high' | 'medium' | 'low';
  score: number;
  assignedTo: {
    name: string;
    avatar: string;
  };
  nextAction?: {
    type: string;
    date: Date;
    description: string;
  };
  createdAt: Date;
  location: string;
  budget: string;
}

interface CalendarEvent {
  id: string;
  leadId: string;
  lead: Lead;
  type: 'call' | 'meeting' | 'email' | 'follow-up' | 'deadline' | 'reminder';
  title: string;
  description: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  duration?: number;
  location?: string;
  attendees?: string[];
  priority: 'high' | 'medium' | 'low';
  status: 'scheduled' | 'completed' | 'cancelled' | 'missed';
  reminder?: {
    time: number;
    unit: 'minutes' | 'hours' | 'days';
  };
}

interface CalendarViewProps {
  viewType: 'month' | 'week' | 'day' | 'agenda';
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    contact: 'John Smith',
    phone: '+1 555-123-4567',
    email: 'john@acme.com',
    status: 'qualified',
    temperature: 'hot',
    priority: 'high',
    score: 85,
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    nextAction: {
      type: 'call',
      date: new Date(2024, 0, 25, 14, 0),
      description: 'Follow-up call to discuss proposal'
    },
    createdAt: new Date(2024, 0, 10),
    location: 'New York, NY',
    budget: '$50K - $100K'
  },
  {
    id: 'L002',
    name: 'TechStart Inc',
    company: 'TechStart Inc',
    contact: 'Emily Davis',
    phone: '+1 555-987-6543',
    email: 'emily@techstart.com',
    status: 'proposal',
    temperature: 'warm',
    priority: 'medium',
    score: 72,
    assignedTo: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    nextAction: {
      type: 'meeting',
      date: new Date(2024, 0, 26, 10, 30),
      description: 'Client meeting to present proposal'
    },
    createdAt: new Date(2024, 0, 8),
    location: 'San Francisco, CA',
    budget: '$100K - $250K'
  }
];

const mockEvents: CalendarEvent[] = [
  {
    id: 'E001',
    leadId: 'L001',
    lead: mockLeads[0],
    type: 'call',
    title: 'Follow-up Call - Acme Corporation',
    description: 'Discuss proposal details and answer questions',
    date: new Date(2024, 0, 25, 14, 0),
    startTime: '2:00 PM',
    endTime: '2:30 PM',
    duration: 30,
    priority: 'high',
    status: 'scheduled',
    reminder: { time: 15, unit: 'minutes' }
  },
  {
    id: 'E002',
    leadId: 'L002',
    lead: mockLeads[1],
    type: 'meeting',
    title: 'Proposal Presentation - TechStart Inc',
    description: 'Present final proposal and discuss terms',
    date: new Date(2024, 0, 26, 10, 30),
    startTime: '10:30 AM',
    endTime: '12:00 PM',
    duration: 90,
    location: 'Conference Room A',
    attendees: ['Emily Davis', 'Mike Chen', 'Sarah Johnson'],
    priority: 'high',
    status: 'scheduled',
    reminder: { time: 1, unit: 'hours' }
  },
  {
    id: 'E003',
    leadId: 'L001',
    type: 'follow-up',
    lead: mockLeads[0],
    title: 'Send Contract - Acme Corporation',
    description: 'Send signed contract for review',
    date: new Date(2024, 0, 28),
    priority: 'medium',
    status: 'scheduled'
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getEventTypeColor(type: CalendarEvent['type']) {
  switch (type) {
    case 'call': return 'bg-blue-500 text-white border-blue-600';
    case 'meeting': return 'bg-purple-500 text-white border-purple-600';
    case 'email': return 'bg-green-500 text-white border-green-600';
    case 'follow-up': return 'bg-orange-500 text-white border-orange-600';
    case 'deadline': return 'bg-red-500 text-white border-red-600';
    case 'reminder': return 'bg-gray-500 text-white border-gray-600';
    default: return 'bg-gray-500 text-white border-gray-600';
  }
}

function getEventTypeIcon(type: CalendarEvent['type']) {
  switch (type) {
    case 'call': return Phone;
    case 'meeting': return Users;
    case 'email': return Mail;
    case 'follow-up': return Target;
    case 'deadline': return AlertCircle;
    case 'reminder': return Clock;
    default: return Activity;
  }
}

function getPriorityColor(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high': return 'border-l-red-500';
    case 'medium': return 'border-l-amber-500';
    case 'low': return 'border-l-green-500';
  }
}

function CalendarEventCard({ event, compact = false }: { event: CalendarEvent; compact?: boolean }) {
  const Icon = getEventTypeIcon(event.type);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className={cn(
            "p-2 rounded-lg cursor-pointer transition-all hover:shadow-md border-l-4",
            getEventTypeColor(event.type),
            getPriorityColor(event.priority),
            compact ? "text-xs" : "text-sm"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 mb-1">
                <Icon className={cn("h-3 w-3", compact ? "h-2 w-2" : "h-3 w-3")} />
                <span className="font-medium truncate">{event.title}</span>
              </div>
              {event.startTime && (
                <div className="flex items-center space-x-1 text-xs opacity-75">
                  <Clock className="h-2 w-2" />
                  <span>{event.startTime}</span>
                  {event.duration && <span>({event.duration}min)</span>}
                </div>
              )}
            </div>
            {!compact && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Event
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">{event.title}</h4>
              <p className="text-sm text-gray-500">{event.description}</p>
            </div>
            <Badge className={getEventTypeColor(event.type)}>
              {event.type}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{format(event.date, 'PPP')}</span>
              {event.startTime && <span>at {event.startTime}</span>}
            </div>
            
            {event.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{event.location}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span>{event.lead.contact}</span>
              <span className="text-gray-400">({event.lead.company})</span>
            </div>
            
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span>{event.attendees.length} attendees</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t">
            <Badge variant="outline" className={cn(
              "text-xs",
              event.priority === 'high' && "border-red-200 text-red-700",
              event.priority === 'medium' && "border-amber-200 text-amber-700",
              event.priority === 'low' && "border-green-200 text-green-700"
            )}>
              {event.priority} priority
            </Badge>
            
            <div className="flex space-x-1">
              <Button size="sm" variant="outline">
                <Phone className="h-3 w-3 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-3 w-3 mr-1" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function MonthView({ currentDate, events }: { currentDate: Date; events: CalendarEvent[] }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-gray-50 p-3 text-center font-medium text-sm text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDate = isToday(day);

          return (
            <div
              key={index}
              className={cn(
                "bg-white min-h-32 p-2 hover:bg-gray-50 transition-colors",
                !isCurrentMonth && "bg-gray-50 text-gray-400"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "text-sm font-medium",
                  isTodayDate && "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs"
                )}>
                  {format(day, 'd')}
                </span>
                {dayEvents.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {dayEvents.length}
                  </Badge>
                )}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <CalendarEventCard key={event.id} event={event} compact />
                ))}
                
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 text-center py-1">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ currentDate, events }: { currentDate: Date; events: CalendarEvent[] }) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ 
    start: weekStart, 
    end: new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000) 
  });

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    return {
      hour,
      label: format(new Date().setHours(hour, 0, 0, 0), 'ha')
    };
  });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Week Header */}
      <div className="grid grid-cols-8 border-b">
        <div className="p-4 border-r">
          <span className="text-sm font-medium text-gray-600">Time</span>
        </div>
        {weekDays.map((day) => (
          <div key={day.toString()} className="p-4 text-center border-r last:border-r-0">
            <div className="text-sm text-gray-600 font-medium">
              {format(day, 'EEE')}
            </div>
            <div className={cn(
              "text-lg font-semibold mt-1",
              isToday(day) && "bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto"
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

      {/* Week Body */}
      <div className="max-h-96 overflow-y-auto">
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r">
            {timeSlots.map((slot) => (
              <div key={slot.hour} className="h-12 p-2 border-b text-xs text-gray-500 text-center">
                {slot.label}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div key={day.toString()} className="border-r last:border-r-0">
                {timeSlots.map((slot) => {
                  const slotEvents = dayEvents.filter(event => {
                    if (event.startTime) {
                      const eventHour = parseInt(event.startTime.split(':')[0]);
                      return eventHour === slot.hour;
                    }
                    return false;
                  });

                  return (
                    <div key={slot.hour} className="h-12 border-b p-1 hover:bg-gray-50">
                      {slotEvents.map((event) => (
                        <CalendarEventCard key={event.id} event={event} compact />
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AgendaView({ events }: { events: CalendarEvent[] }) {
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: CalendarEvent[] } = {};
    
    events.forEach(event => {
      const dateKey = format(event.date, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });

    // Sort events within each day
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (a.startTime && b.startTime) {
          return a.startTime.localeCompare(b.startTime);
        }
        return 0;
      });
    });

    return groups;
  }, [events]);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([dateKey, dayEvents]) => (
        <Card key={dateKey}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>{format(new Date(dateKey), 'EEEE, MMMM d, yyyy')}</span>
              <Badge variant="secondary">{dayEvents.length} events</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dayEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={event.lead.assignedTo.avatar} />
                      <AvatarFallback>
                        {getInitials(event.lead.assignedTo.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {event.startTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.startTime}</span>
                          {event.duration && <span>({event.duration}min)</span>}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{event.lead.contact}</span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          event.priority === 'high' && "border-red-200 text-red-700",
                          event.priority === 'medium' && "border-amber-200 text-amber-700",
                          event.priority === 'low' && "border-green-200 text-green-700"
                        )}>
                          {event.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {event.lead.company} • {event.lead.location}
                        </span>
                      </div>
                      
                      <div className="flex space-x-1">
                        <Tooltip content="Call lead">
                          <Button size="sm" variant="outline">
                            <Phone className="h-3 w-3" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Send email">
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                        </Tooltip>
                        <Tooltip content="WhatsApp">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function LeadCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = !searchQuery || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || event.lead.status === filterStatus;
      const matchesAssignee = filterAssignee === 'all' || event.lead.assignedTo.name === filterAssignee;
      
      return matchesSearch && matchesStatus && matchesAssignee;
    });
  }, [searchQuery, filterStatus, filterAssignee]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Lead Calendar</h1>
              <Badge variant="secondary">{filteredEvents.length} events</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Calendar Navigation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold min-w-48 text-center">
                      {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                </div>

                <Tabs value={viewType} onValueChange={(value: any) => setViewType(value)}>
                  <TabsList>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Views */}
          <div className="min-h-96">
            {viewType === 'month' && (
              <MonthView currentDate={currentDate} events={filteredEvents} />
            )}
            
            {viewType === 'week' && (
              <WeekView currentDate={currentDate} events={filteredEvents} />
            )}
            
            {viewType === 'day' && (
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {format(currentDate, 'EEEE, MMMM d, yyyy')}
                </h3>
                <div className="space-y-3">
                  {filteredEvents
                    .filter(event => isSameDay(event.date, currentDate))
                    .map((event) => (
                      <CalendarEventCard key={event.id} event={event} />
                    ))}
                  
                  {filteredEvents.filter(event => isSameDay(event.date, currentDate)).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No events scheduled for this day</p>
                  )}
                </div>
              </div>
            )}
            
            {viewType === 'agenda' && (
              <AgendaView events={filteredEvents} />
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Today's Events</p>
                    <p className="text-2xl font-bold">
                      {filteredEvents.filter(e => isToday(e.date)).length}
                    </p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">This Week</p>
                    <p className="text-2xl font-bold">
                      {filteredEvents.filter(e => {
                        const weekStart = startOfWeek(new Date());
                        const weekEnd = endOfWeek(new Date());
                        return e.date >= weekStart && e.date <= weekEnd;
                      }).length}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">High Priority</p>
                    <p className="text-2xl font-bold">
                      {filteredEvents.filter(e => e.priority === 'high').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold">
                      {filteredEvents.filter(e => e.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
import { useState, useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek,
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  addMonths,
  subMonths,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  startOfDay,
  endOfDay,
  isWithinInterval,
  isSameDay,
  differenceInMinutes,
  addHours,
  setHours,
  setMinutes
} from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  MoreVertical,
  Filter,
  Search,
  Grid3X3,
  List,
  CalendarDays,
  Settings,
  Download,
  Upload,
  Eye,
  EyeOff,
  Copy,
  Star,
  Bell,
  Tag,
  Palette,
  CheckSquare,
  X,
  AlertCircle,
  Video,
  Phone,
  MessageSquare,
  FileText,
  Link,
  Repeat,
  ChevronDown
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Helper function to generate random avatar colors
const getRandomAvatarColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const avatarColors = new Map<string, string>();
const getAvatarColor = (id: string) => {
  if (!avatarColors.has(id)) {
    avatarColors.set(id, getRandomAvatarColor());
  }
  return avatarColors.get(id) || 'bg-gray-500';
};

// Event categories with colors
const eventCategories = [
  { id: 'meeting', name: 'Meeting', color: 'bg-blue-500', icon: Users },
  { id: 'milestone', name: 'Milestone', color: 'bg-purple-500', icon: CheckSquare },
  { id: 'deadline', name: 'Deadline', color: 'bg-red-500', icon: AlertCircle },
  { id: 'task', name: 'Task', color: 'bg-green-500', icon: FileText },
  { id: 'call', name: 'Call', color: 'bg-yellow-500', icon: Phone },
  { id: 'review', name: 'Review', color: 'bg-orange-500', icon: Eye },
  { id: 'site-visit', name: 'Site Visit', color: 'bg-teal-500', icon: MapPin },
  { id: 'other', name: 'Other', color: 'bg-gray-500', icon: CalendarIcon },
];

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  category: string;
  location?: string;
  attendees?: string[];
  isAllDay: boolean;
  color?: string;
  reminder?: number; // minutes before
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly';
  status?: 'confirmed' | 'tentative' | 'cancelled';
  createdBy: string;
  attachments?: string[];
}

interface ProjectCalendarProps {
  project: any;
}

export function ProjectCalendar({ project }: ProjectCalendarProps) {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Get current date for relative event dates
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  const [events, setEvents] = useState<CalendarEvent[]>([
    // Meeting category events
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      description: 'Initial project kickoff with all stakeholders',
      startDate: new Date(currentYear, currentMonth, currentDay - 5, 9, 0),
      endDate: new Date(currentYear, currentMonth, currentDay - 5, 11, 0),
      category: 'meeting',
      location: 'Conference Room A',
      attendees: ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis'],
      isAllDay: false,
      reminder: 30,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '2',
      title: 'Weekly Team Standup',
      description: 'Regular team sync meeting',
      startDate: new Date(currentYear, currentMonth, currentDay, 10, 0),
      endDate: new Date(currentYear, currentMonth, currentDay, 10, 30),
      category: 'meeting',
      location: 'Virtual - Teams',
      attendees: ['Development Team'],
      isAllDay: false,
      reminder: 15,
      recurring: 'weekly',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    
    // Milestone category events
    {
      id: '3',
      title: 'Foundation Complete',
      description: 'Foundation work completion milestone',
      startDate: new Date(currentYear, currentMonth, currentDay - 10, 0, 0),
      endDate: new Date(currentYear, currentMonth, currentDay - 10, 23, 59),
      category: 'milestone',
      location: 'Construction Site',
      isAllDay: true,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '4',
      title: 'Phase 1 Delivery',
      description: 'First phase of project delivery',
      startDate: new Date(currentYear, currentMonth, currentDay + 15, 0, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 15, 23, 59),
      category: 'milestone',
      isAllDay: true,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM002'
    },
    
    // Deadline category events
    {
      id: '5',
      title: 'Permit Submission Deadline',
      description: 'Final date for permit documentation submission',
      startDate: new Date(currentYear, currentMonth, currentDay + 3, 17, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 3, 17, 0),
      category: 'deadline',
      isAllDay: false,
      reminder: 1440, // 1 day before
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '6',
      title: 'Budget Report Due',
      description: 'Q4 budget report submission',
      startDate: new Date(currentYear, currentMonth, currentDay + 7, 23, 59),
      endDate: new Date(currentYear, currentMonth, currentDay + 7, 23, 59),
      category: 'deadline',
      isAllDay: false,
      reminder: 120,
      recurring: 'none',
      status: 'tentative',
      createdBy: 'PM003'
    },
    
    // Task category events
    {
      id: '7',
      title: 'Site Preparation',
      description: 'Clear and prepare construction site',
      startDate: new Date(currentYear, currentMonth, currentDay - 2, 8, 0),
      endDate: new Date(currentYear, currentMonth, currentDay - 2, 17, 0),
      category: 'task',
      location: 'Site A - North Section',
      attendees: ['Construction Crew A'],
      isAllDay: false,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM002'
    },
    {
      id: '8',
      title: 'Install Electrical Wiring',
      description: 'Complete electrical wiring for Building B',
      startDate: new Date(currentYear, currentMonth, currentDay + 1, 9, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 1, 16, 0),
      category: 'task',
      location: 'Building B',
      attendees: ['Electrical Team'],
      isAllDay: false,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    
    // Call category events
    {
      id: '9',
      title: 'Client Check-in Call',
      description: 'Weekly progress update call with client',
      startDate: new Date(currentYear, currentMonth, currentDay + 2, 14, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 2, 14, 30),
      category: 'call',
      attendees: ['Client Representative', 'Project Manager'],
      isAllDay: false,
      reminder: 15,
      recurring: 'weekly',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '10',
      title: 'Vendor Discussion',
      description: 'Discuss material delivery schedule',
      startDate: new Date(currentYear, currentMonth, currentDay, 15, 30),
      endDate: new Date(currentYear, currentMonth, currentDay, 16, 0),
      category: 'call',
      attendees: ['Vendor Manager'],
      isAllDay: false,
      reminder: 30,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM002'
    },
    
    // Review category events
    {
      id: '11',
      title: 'Design Review Session',
      description: 'Review architectural designs for Phase 2',
      startDate: new Date(currentYear, currentMonth, currentDay + 4, 13, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 4, 15, 0),
      category: 'review',
      location: 'Design Studio',
      attendees: ['Architect', 'Design Team', 'Project Manager'],
      isAllDay: false,
      reminder: 60,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '12',
      title: 'Safety Compliance Review',
      description: 'Monthly safety standards review',
      startDate: new Date(currentYear, currentMonth, currentDay + 10, 10, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 10, 12, 0),
      category: 'review',
      location: 'Site Office',
      attendees: ['Safety Officer', 'Site Manager'],
      isAllDay: false,
      recurring: 'monthly',
      status: 'confirmed',
      createdBy: 'PM003'
    },
    
    // Site Visit category events
    {
      id: '13',
      title: 'Client Site Inspection',
      description: 'Monthly client walkthrough and inspection',
      startDate: new Date(currentYear, currentMonth, currentDay + 5, 9, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 5, 11, 0),
      category: 'site-visit',
      location: 'Main Construction Site',
      attendees: ['Client Team', 'Project Manager', 'Site Manager'],
      isAllDay: false,
      reminder: 120,
      recurring: 'monthly',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '14',
      title: 'Quality Inspection Visit',
      description: 'External quality auditor visit',
      startDate: new Date(currentYear, currentMonth, currentDay + 8, 14, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 8, 17, 0),
      category: 'site-visit',
      location: 'All Sites',
      attendees: ['Quality Auditor', 'QA Team'],
      isAllDay: false,
      reminder: 1440,
      recurring: 'none',
      status: 'tentative',
      createdBy: 'PM002'
    },
    
    // Other category events
    {
      id: '15',
      title: 'Team Building Event',
      description: 'Quarterly team building activity',
      startDate: new Date(currentYear, currentMonth, currentDay + 12, 16, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 12, 20, 0),
      category: 'other',
      location: 'City Park',
      attendees: ['All Team Members'],
      isAllDay: false,
      reminder: 1440,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'PM001'
    },
    {
      id: '16',
      title: 'Office Closed - Holiday',
      description: 'National Holiday',
      startDate: new Date(currentYear, currentMonth, currentDay + 20, 0, 0),
      endDate: new Date(currentYear, currentMonth, currentDay + 20, 23, 59),
      category: 'other',
      isAllDay: true,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'ADMIN'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(eventCategories.map(c => c.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [showWeekends, setShowWeekends] = useState(true);
  const [showWeekNumbers, setShowWeekNumbers] = useState(false);

  // Get calendar days based on view mode
  const calendarDays = useMemo(() => {
    if (viewMode === 'month') {
      const start = startOfWeek(startOfMonth(currentDate));
      const end = endOfWeek(endOfMonth(currentDate));
      return eachDayOfInterval({ start, end });
    } else if (viewMode === 'week') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    } else if (viewMode === 'day') {
      return [currentDate];
    }
    return [];
  }, [currentDate, viewMode]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesCategory = selectedCategories.includes(event.category);
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategories, searchQuery]);

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventStart = startOfDay(event.startDate);
      const eventEnd = startOfDay(event.endDate);
      const currentDay = startOfDay(date);
      
      return isWithinInterval(currentDay, { start: eventStart, end: eventEnd }) ||
             isSameDay(eventStart, currentDay) ||
             isSameDay(eventEnd, currentDay);
    });
  };

  // Handle navigation
  const handlePrevious = () => {
    if (viewMode === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else if (viewMode === 'day') setCurrentDate(subDays(currentDate, 1));
  };

  const handleNext = () => {
    if (viewMode === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else if (viewMode === 'day') setCurrentDate(addDays(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Create new event
  const handleCreateEvent = (date?: Date) => {
    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: '',
      description: '',
      startDate: date || new Date(),
      endDate: addHours(date || new Date(), 1),
      category: 'meeting',
      isAllDay: false,
      recurring: 'none',
      status: 'confirmed',
      createdBy: 'current-user'
    };
    setEditingEvent(newEvent);
    setShowEventDialog(true);
  };

  // Edit event
  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent({ ...event });
    setShowEventDialog(true);
  };

  // Save event
  const handleSaveEvent = () => {
    if (!editingEvent || !editingEvent.title.trim()) {
      alert('Please enter a title for the event');
      return;
    }
    
    if (editingEvent.id.startsWith('event-')) {
      // New event
      setEvents([...events, editingEvent]);
      console.log('Event created successfully');
    } else {
      // Update existing event
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
      console.log('Event updated successfully');
    }
    
    setShowEventDialog(false);
    setEditingEvent(null);
  };

  // Delete event
  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter(e => e.id !== selectedEvent.id));
    console.log('Event deleted successfully');
    setShowDeleteDialog(false);
    setSelectedEvent(null);
  };

  // Month view component
  const MonthView = () => (
    <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
      {/* Day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
        (!showWeekends && (index === 0 || index === 6)) ? null : (
          <div key={day} className="bg-muted/50 p-2 text-center text-sm font-medium">
            {day}
          </div>
        )
      ))}
      
      {/* Calendar days */}
      {calendarDays.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
        
        if (!showWeekends && isWeekend) return null;
        
        return (
          <div
            key={day.toString()}
            className={cn(
              "min-h-[120px] bg-background p-2 border-t",
              !isCurrentMonth && "bg-muted/30",
              isToday(day) && "bg-accent/10"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={cn(
                "text-sm font-medium",
                isToday(day) && "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center",
                !isCurrentMonth && "text-muted-foreground"
              )}>
                {format(day, 'd')}
              </span>
              {showWeekNumbers && day.getDay() === 0 && (
                <span className="text-xs text-muted-foreground">
                  W{format(day, 'w')}
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map(event => {
                const category = eventCategories.find(c => c.id === event.category);
                return (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs p-1 rounded cursor-pointer truncate transition-all relative",
                      category?.color || 'bg-gray-500',
                      "text-white hover:opacity-80 hover:scale-105",
                      event.status === 'tentative' && 'opacity-70 border border-dashed'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEvent(event);
                    }}
                    title={`${event.title}${event.description ? '\n' + event.description : ''}${event.location ? '\n📍 ' + event.location : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      {!event.isAllDay && (
                        <Clock className="h-3 w-3 flex-shrink-0" />
                      )}
                      <span className="truncate font-medium">{event.title}</span>
                      {event.recurring !== 'none' && (
                        <Repeat className="h-3 w-3 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
              {dayEvents.length > 3 && (
                <button className="text-xs text-muted-foreground hover:text-foreground">
                  +{dayEvents.length - 3} more
                </button>
              )}
            </div>
            
            {/* Add event button */}
            <button
              className="w-full mt-1 opacity-0 hover:opacity-100 transition-opacity"
              onClick={() => handleCreateEvent(day)}
            >
              <Plus className="h-4 w-4 mx-auto text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        );
      })}
    </div>
  );

  // Week view component
  const WeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="flex">
        {/* Time column */}
        <div className="w-16 pr-2">
          <div className="h-10" /> {/* Header spacer */}
          {hours.map(hour => (
            <div key={hour} className="h-20 text-xs text-muted-foreground text-right">
              {format(setHours(new Date(), hour), 'ha')}
            </div>
          ))}
        </div>
        
        {/* Days columns */}
        <div className="flex-1 grid grid-cols-7 gap-px bg-border">
          {calendarDays.map(day => {
            const dayEvents = getEventsForDay(day);
            const isWeekend = day.getDay() === 0 || day.getDay() === 6;
            
            if (!showWeekends && isWeekend) return null;
            
            return (
              <div key={day.toString()} className="bg-background">
                {/* Day header */}
                <div className={cn(
                  "h-10 p-2 border-b text-center",
                  isToday(day) && "bg-accent/10"
                )}>
                  <div className="text-sm font-medium">{format(day, 'EEE')}</div>
                  <div className={cn(
                    "text-xs",
                    isToday(day) && "bg-primary text-primary-foreground rounded-full w-6 h-6 mx-auto flex items-center justify-center"
                  )}>
                    {format(day, 'd')}
                  </div>
                </div>
                
                {/* Hour slots */}
                <div className="relative">
                  {hours.map(hour => (
                    <div
                      key={hour}
                      className="h-20 border-b border-dashed hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleCreateEvent(setHours(day, hour))}
                    />
                  ))}
                  
                  {/* Events */}
                  {dayEvents.map(event => {
                    const category = eventCategories.find(c => c.id === event.category);
                    const startHour = event.startDate.getHours();
                    const duration = differenceInMinutes(event.endDate, event.startDate) / 60;
                    
                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "absolute left-1 right-1 p-1 rounded text-white text-xs cursor-pointer hover:opacity-90 transition-opacity",
                          category?.color || 'bg-gray-500'
                        )}
                        style={{
                          top: `${startHour * 80}px`,
                          height: `${duration * 80 - 4}px`,
                          minHeight: '20px'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        {duration > 0.5 && (
                          <div className="text-xs opacity-90">
                            {format(event.startDate, 'h:mm a')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Day view component
  const DayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = getEventsForDay(currentDate);
    
    return (
      <div className="flex">
        {/* Time column */}
        <div className="w-20 pr-4">
          {hours.map(hour => (
            <div key={hour} className="h-20 text-sm text-muted-foreground text-right">
              {format(setHours(new Date(), hour), 'h:mm a')}
            </div>
          ))}
        </div>
        
        {/* Events column */}
        <div className="flex-1 relative border-l">
          {hours.map(hour => (
            <div
              key={hour}
              className="h-20 border-b border-dashed hover:bg-muted/50 cursor-pointer"
              onClick={() => handleCreateEvent(setHours(currentDate, hour))}
            />
          ))}
          
          {/* Events */}
          {dayEvents.map(event => {
            const category = eventCategories.find(c => c.id === event.category);
            const startHour = event.startDate.getHours() + event.startDate.getMinutes() / 60;
            const duration = differenceInMinutes(event.endDate, event.startDate) / 60;
            
            return (
              <div
                key={event.id}
                className={cn(
                  "absolute left-4 right-4 p-3 rounded-lg text-white cursor-pointer",
                  category?.color || 'bg-gray-500'
                )}
                style={{
                  top: `${startHour * 80}px`,
                  height: `${duration * 80 - 8}px`,
                  minHeight: '60px'
                }}
                onClick={() => handleEditEvent(event)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-sm opacity-90 mt-1">
                      {format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    )}
                    {event.attendees && event.attendees.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="h-3 w-3" />
                        <span className="text-sm">{event.attendees.length} attendees</span>
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
          
          {/* Current time indicator */}
          {isToday(currentDate) && (
            <div
              className="absolute left-0 right-0 border-t-2 border-red-500"
              style={{
                top: `${(new Date().getHours() + new Date().getMinutes() / 60) * 80}px`
              }}
            >
              <div className="absolute -left-2 -top-2 w-4 h-4 bg-red-500 rounded-full" />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Agenda view component
  const AgendaView = () => {
    const upcomingEvents = filteredEvents
      .filter(event => event.startDate >= new Date())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    
    const groupedEvents = upcomingEvents.reduce((groups, event) => {
      const date = format(event.startDate, 'yyyy-MM-dd');
      if (!groups[date]) groups[date] = [];
      groups[date].push(event);
      return groups;
    }, {} as Record<string, CalendarEvent[]>);
    
    return (
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date}>
            <div className="flex items-center gap-4 mb-3">
              <h3 className="font-semibold text-lg">
                {format(new Date(date), 'EEEE, MMMM d, yyyy')}
              </h3>
              {isToday(new Date(date)) && (
                <Badge variant="default">Today</Badge>
              )}
            </div>
            
            <div className="space-y-2">
              {dayEvents.map(event => {
                const category = eventCategories.find(c => c.id === event.category);
                const Icon = category?.icon || CalendarIcon;
                
                return (
                  <Card 
                    key={event.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleEditEvent(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-2 rounded-lg text-white",
                          category?.color || 'bg-gray-500'
                        )}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {event.isAllDay ? 'All day' : `${format(event.startDate, 'h:mm a')} - ${format(event.endDate, 'h:mm a')}`}
                              </p>
                              
                              {event.description && (
                                <p className="text-sm mt-2">{event.description}</p>
                              )}
                              
                              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                                {event.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                  </div>
                                )}
                                {event.attendees && event.attendees.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {event.attendees.length} attendees
                                  </div>
                                )}
                                {event.recurring !== 'none' && (
                                  <div className="flex items-center gap-1">
                                    <Repeat className="h-3 w-3" />
                                    {event.recurring}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditEvent(event);
                                }}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedEvent(event);
                                    setShowDeleteDialog(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
        
        {upcomingEvents.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No upcoming events</p>
            <Button className="mt-4" onClick={() => handleCreateEvent()}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleToday}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <h2 className="text-xl font-semibold">
            {viewMode === 'month' && format(currentDate, 'MMMM yyyy')}
            {viewMode === 'week' && `Week of ${format(startOfWeek(currentDate), 'MMM d, yyyy')}`}
            {viewMode === 'day' && format(currentDate, 'EEEE, MMMM d, yyyy')}
            {viewMode === 'agenda' && 'Upcoming Events'}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          
          {/* View Mode Tabs */}
          <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          {/* Settings Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Calendar Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showWeekends}
                onCheckedChange={setShowWeekends}
              >
                Show weekends
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showWeekNumbers}
                onCheckedChange={setShowWeekNumbers}
              >
                Show week numbers
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Import events
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Add Event Button */}
          <Button onClick={() => handleCreateEvent()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Categories:</span>
              {eventCategories.map(category => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (selectedCategories.includes(category.id)) {
                        setSelectedCategories(selectedCategories.filter(c => c !== category.id));
                      } else {
                        setSelectedCategories([...selectedCategories, category.id]);
                      }
                    }}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategories(eventCategories.map(c => c.id))}
              >
                Show All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategories([])}
              >
                Hide All
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Calendar View */}
      <Card>
        <CardContent className="p-4">
          <ScrollArea className="w-full">
            {viewMode === 'month' && <MonthView />}
            {viewMode === 'week' && <WeekView />}
            {viewMode === 'day' && <DayView />}
            {viewMode === 'agenda' && <AgendaView />}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingEvent?.id.startsWith('event-') ? 'Create Event' : 'Edit Event'}
            </DialogTitle>
            <DialogDescription>
              Fill in the event details below
            </DialogDescription>
          </DialogHeader>
          
          {editingEvent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="Event title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingEvent.category}
                  onValueChange={(value) => setEditingEvent({ ...editingEvent, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map(category => {
                      const Icon = category.icon;
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          <span className="flex items-center gap-2">
                            <span className={cn("p-1 rounded", category.color)}>
                              <Icon className="h-3 w-3 text-white" />
                            </span>
                            {category.name}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date & Time</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={format(editingEvent.startDate, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setEditingEvent({ 
                      ...editingEvent, 
                      startDate: new Date(e.target.value) 
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date & Time</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={format(editingEvent.endDate, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setEditingEvent({ 
                      ...editingEvent, 
                      endDate: new Date(e.target.value) 
                    })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="allDay"
                  checked={editingEvent.isAllDay}
                  onCheckedChange={(checked) => setEditingEvent({ ...editingEvent, isAllDay: checked })}
                />
                <Label htmlFor="allDay">All day event</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editingEvent.location || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  placeholder="Event description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder">Reminder</Label>
                  <Select
                    value={editingEvent.reminder?.toString() || '0'}
                    onValueChange={(value) => setEditingEvent({ 
                      ...editingEvent, 
                      reminder: parseInt(value) 
                    })}
                  >
                    <SelectTrigger id="reminder">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No reminder</SelectItem>
                      <SelectItem value="15">15 minutes before</SelectItem>
                      <SelectItem value="30">30 minutes before</SelectItem>
                      <SelectItem value="60">1 hour before</SelectItem>
                      <SelectItem value="120">2 hours before</SelectItem>
                      <SelectItem value="1440">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recurring">Recurring</Label>
                  <Select
                    value={editingEvent.recurring || 'none'}
                    onValueChange={(value: any) => setEditingEvent({ 
                      ...editingEvent, 
                      recurring: value 
                    })}
                  >
                    <SelectTrigger id="recurring">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Does not repeat</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attendees">Attendees</Label>
                <Input
                  id="attendees"
                  value={editingEvent.attendees?.join(', ') || ''}
                  onChange={(e) => setEditingEvent({ 
                    ...editingEvent, 
                    attendees: e.target.value.split(',').map(a => a.trim()).filter(a => a) 
                  })}
                  placeholder="Enter attendee names separated by commas"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>
              {editingEvent?.id.startsWith('event-') ? 'Create Event' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
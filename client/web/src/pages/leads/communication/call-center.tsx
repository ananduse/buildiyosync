import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  RotateCcw,
  Clock,
  Calendar,
  User,
  Users,
  Search,
  Filter,
  Plus,
  Settings,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Edit,
  Eye,
  Copy,
  Share2,
  Activity,
  TrendingUp,
  Target,
  BarChart3,
  Timer,
  Headphones,
  Voicemail,
  PhoneForwarded,
  Zap,
  AlertCircle,
  CheckCircle,
  Info,
  Building2,
  MapPin,
  Mail,
  MessageSquare,
  FileText,
  Tag,
  DollarSign,
  Globe,
  Smartphone,
  UserCheck,
  UserX,
  Maximize2,
  Minimize2,
  Record,
  StopCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
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
  assignedTo: {
    name: string;
    avatar: string;
  };
  lastActivity: Date;
  tags: string[];
  location: {
    city: string;
    state: string;
    country: string;
  };
  estimatedValue: number;
}

interface CallRecord {
  id: string;
  leadId: string;
  lead: Lead;
  direction: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'busy' | 'no-answer' | 'voicemail' | 'failed' | 'in-progress';
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  cost: number;
  recording?: {
    id: string;
    url: string;
    duration: number;
    transcription?: string;
  };
  notes: string;
  outcome: 'appointment-scheduled' | 'follow-up-needed' | 'not-interested' | 'callback-requested' | 'qualified' | 'proposal-sent' | 'other' | '';
  nextAction?: {
    type: string;
    date: Date;
    description: string;
  };
  tags: string[];
  rating: 1 | 2 | 3 | 4 | 5 | null;
  createdBy: string;
}

interface CallQueue {
  id: string;
  name: string;
  description: string;
  leads: Lead[];
  priority: 'high' | 'medium' | 'low';
  assignedAgents: string[];
  callsToday: number;
  completionRate: number;
  avgCallDuration: number;
  isActive: boolean;
}

interface CallAgent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'available' | 'busy' | 'break' | 'offline';
  extension: string;
  callsToday: number;
  talkTime: number; // in seconds
  avgCallDuration: number;
  connectionRate: number;
  activeCall?: {
    leadId: string;
    startTime: Date;
    isRecording: boolean;
  };
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
    assignedTo: { name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
    lastActivity: new Date(2024, 0, 18),
    tags: ['high-value', 'urgent'],
    location: { city: 'New York', state: 'NY', country: 'USA' },
    estimatedValue: 75000
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
    assignedTo: { name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
    lastActivity: new Date(2024, 0, 17),
    tags: ['follow-up'],
    location: { city: 'San Francisco', state: 'CA', country: 'USA' },
    estimatedValue: 120000
  }
];

const mockCallRecords: CallRecord[] = [
  {
    id: 'C001',
    leadId: 'L001',
    lead: mockLeads[0],
    direction: 'outbound',
    status: 'completed',
    startTime: new Date(2024, 0, 20, 10, 30),
    endTime: new Date(2024, 0, 20, 10, 47),
    duration: 1020, // 17 minutes
    cost: 0.25,
    recording: {
      id: 'R001',
      url: '/recordings/call-001.mp3',
      duration: 1020,
      transcription: 'Discussed project requirements and timeline. Client is very interested and wants to move forward quickly.'
    },
    notes: 'Great conversation! John is ready to move forward with the project. He mentioned they have a tight timeline and need to start by March 1st. Scheduled follow-up meeting for next Tuesday.',
    outcome: 'appointment-scheduled',
    nextAction: {
      type: 'meeting',
      date: new Date(2024, 0, 23, 14, 0),
      description: 'Follow-up meeting to present detailed proposal'
    },
    tags: ['qualified', 'hot-lead', 'timeline-urgent'],
    rating: 5,
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'C002',
    leadId: 'L002',
    lead: mockLeads[1],
    direction: 'inbound',
    status: 'completed',
    startTime: new Date(2024, 0, 20, 14, 15),
    endTime: new Date(2024, 0, 20, 14, 32),
    duration: 1020,
    cost: 0,
    notes: 'Emily called to ask about our services. Interested in office renovation project. Budget seems good.',
    outcome: 'follow-up-needed',
    nextAction: {
      type: 'call',
      date: new Date(2024, 0, 22, 11, 0),
      description: 'Follow-up call to discuss project details'
    },
    tags: ['inbound', 'interested'],
    rating: 4,
    createdBy: 'Mike Chen'
  }
];

const mockQueues: CallQueue[] = [
  {
    id: 'Q001',
    name: 'Hot Leads',
    description: 'High priority leads requiring immediate attention',
    leads: mockLeads.filter(l => l.temperature === 'hot'),
    priority: 'high',
    assignedAgents: ['A001', 'A002'],
    callsToday: 45,
    completionRate: 78,
    avgCallDuration: 12.5,
    isActive: true
  },
  {
    id: 'Q002',
    name: 'Follow-up Queue',
    description: 'Leads requiring follow-up calls',
    leads: mockLeads.filter(l => l.tags.includes('follow-up')),
    priority: 'medium',
    assignedAgents: ['A001', 'A003'],
    callsToday: 23,
    completionRate: 65,
    avgCallDuration: 8.2,
    isActive: true
  }
];

const mockAgents: CallAgent[] = [
  {
    id: 'A001',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    avatar: '/avatars/sarah.jpg',
    status: 'available',
    extension: '1001',
    callsToday: 12,
    talkTime: 4800, // 80 minutes
    avgCallDuration: 400, // 6.67 minutes
    connectionRate: 85,
    activeCall: {
      leadId: 'L001',
      startTime: new Date(2024, 0, 20, 15, 30),
      isRecording: true
    }
  },
  {
    id: 'A002',
    name: 'Mike Chen',
    email: 'mike@company.com',
    avatar: '/avatars/mike.jpg',
    status: 'busy',
    extension: '1002',
    callsToday: 8,
    talkTime: 3200,
    avgCallDuration: 400,
    connectionRate: 78
  }
];

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

function getCallStatusColor(status: CallRecord['status']) {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-100';
    case 'missed': return 'text-red-600 bg-red-100';
    case 'busy': return 'text-orange-600 bg-orange-100';
    case 'no-answer': return 'text-gray-600 bg-gray-100';
    case 'voicemail': return 'text-blue-600 bg-blue-100';
    case 'failed': return 'text-red-600 bg-red-100';
    case 'in-progress': return 'text-amber-600 bg-amber-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}

function getCallStatusIcon(status: CallRecord['status']) {
  switch (status) {
    case 'completed': return PhoneCall;
    case 'missed': return PhoneMissed;
    case 'busy': return PhoneCall;
    case 'no-answer': return Phone;
    case 'voicemail': return Voicemail;
    case 'failed': return AlertCircle;
    case 'in-progress': return PhoneCall;
    default: return Phone;
  }
}

function getAgentStatusColor(status: CallAgent['status']) {
  switch (status) {
    case 'available': return 'text-green-600 bg-green-100';
    case 'busy': return 'text-red-600 bg-red-100';
    case 'break': return 'text-amber-600 bg-amber-100';
    case 'offline': return 'text-gray-600 bg-gray-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}

function CallRecordCard({ call, onView, onEdit }: {
  call: CallRecord;
  onView: () => void;
  onEdit: () => void;
}) {
  const StatusIcon = getCallStatusIcon(call.status);
  const DirectionIcon = call.direction === 'inbound' ? PhoneIncoming : PhoneOutgoing;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                {getInitials(call.lead.contact)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold">{call.lead.contact}</h4>
                <DirectionIcon className={cn("h-4 w-4", 
                  call.direction === 'inbound' ? 'text-green-600' : 'text-blue-600'
                )} />
                <Badge className={cn("text-xs", getCallStatusColor(call.status))}>
                  {call.status}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{call.lead.company}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(call.startTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Timer className="h-3 w-3" />
                  <span>{formatDuration(call.duration)}</span>
                </div>
                {call.cost > 0 && (
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>${call.cost.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              {call.notes && (
                <p className="text-sm text-gray-700 line-clamp-2">{call.notes}</p>
              )}
              
              {call.outcome && (
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs capitalize">
                    {call.outcome.replace('-', ' ')}
                  </Badge>
                  {call.rating && (
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn("h-3 w-3", 
                            star <= call.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              {call.recording && (
                <DropdownMenuItem>
                  <Play className="h-4 w-4 mr-2" />
                  Play Recording
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Notes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call Again
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Copy Number
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

function AgentCard({ agent }: { agent: CallAgent }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={agent.avatar} />
              <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
              agent.status === 'available' && "bg-green-500",
              agent.status === 'busy' && "bg-red-500",
              agent.status === 'break' && "bg-amber-500",
              agent.status === 'offline' && "bg-gray-500"
            )} />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold">{agent.name}</h4>
            <div className="flex items-center space-x-2">
              <Badge className={cn("text-xs", getAgentStatusColor(agent.status))}>
                {agent.status}
              </Badge>
              <span className="text-xs text-gray-500">Ext. {agent.extension}</span>
            </div>
          </div>
        </div>
        
        {agent.activeCall && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <PhoneCall className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Active Call</span>
              {agent.activeCall.isRecording && (
                <Badge variant="outline" className="text-xs">
                  <Record className="h-3 w-3 mr-1" />
                  Recording
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Duration: {formatDuration(Math.floor((new Date().getTime() - agent.activeCall.startTime.getTime()) / 1000))}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center">
            <p className="font-semibold">{agent.callsToday}</p>
            <p className="text-xs text-gray-500">Calls Today</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{agent.connectionRate}%</p>
            <p className="text-xs text-gray-500">Connect Rate</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{formatDuration(agent.talkTime)}</p>
            <p className="text-xs text-gray-500">Talk Time</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{formatDuration(agent.avgCallDuration)}</p>
            <p className="text-xs text-gray-500">Avg Duration</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QueueCard({ queue }: { queue: CallQueue }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base mb-1">{queue.name}</CardTitle>
            <CardDescription className="text-sm">{queue.description}</CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant={queue.isActive ? "default" : "secondary"}>
              {queue.isActive ? "Active" : "Paused"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Queue
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  Manage Agents
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {queue.isActive ? 'Pause' : 'Activate'} Queue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="text-center">
            <p className="text-lg font-bold">{queue.leads.length}</p>
            <p className="text-xs text-gray-500">Leads</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{queue.callsToday}</p>
            <p className="text-xs text-gray-500">Calls Today</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{queue.completionRate}%</p>
            <p className="text-xs text-gray-500">Completion</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Priority:</span>
            <Badge variant="outline" className={cn(
              "text-xs capitalize",
              queue.priority === 'high' && "border-red-200 text-red-700",
              queue.priority === 'medium' && "border-amber-200 text-amber-700",
              queue.priority === 'low' && "border-green-200 text-green-700"
            )}>
              {queue.priority}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span>Avg Duration:</span>
            <span className="font-medium">{queue.avgCallDuration.toFixed(1)} min</span>
          </div>
          <div className="flex justify-between">
            <span>Assigned Agents:</span>
            <span className="font-medium">{queue.assignedAgents.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CallCenter() {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDialer, setShowDialer] = useState(false);
  const [dialerNumber, setDialerNumber] = useState('');
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  const filteredCalls = useMemo(() => {
    return mockCallRecords.filter(call => {
      const matchesSearch = !searchQuery || 
        call.lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.lead.phone.includes(searchQuery);
      
      const matchesStatus = filterStatus === 'all' || call.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, filterStatus]);

  const callStats = useMemo(() => {
    const totalCalls = mockCallRecords.length;
    const completedCalls = mockCallRecords.filter(c => c.status === 'completed').length;
    const totalDuration = mockCallRecords.reduce((sum, c) => sum + c.duration, 0);
    const totalCost = mockCallRecords.reduce((sum, c) => sum + c.cost, 0);
    const avgDuration = totalCalls > 0 ? totalDuration / totalCalls : 0;
    const connectionRate = totalCalls > 0 ? (completedCalls / totalCalls) * 100 : 0;
    
    return { totalCalls, completedCalls, totalDuration, totalCost, avgDuration, connectionRate };
  }, []);

  // Simulate call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallInProgress) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallInProgress]);

  const handleStartCall = (number: string) => {
    setDialerNumber(number);
    setIsCallInProgress(true);
    setCallTimer(0);
    console.log('Starting call to:', number);
  };

  const handleEndCall = () => {
    setIsCallInProgress(false);
    setCallTimer(0);
    setShowDialer(false);
    console.log('Call ended after:', callTimer, 'seconds');
  };

  return (
    <TooltipProvider>
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Call Center</h1>
              <Badge variant="secondary">{callStats.totalCalls} calls today</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium">{callStats.totalCalls}</p>
                  <p className="text-xs text-gray-500">Total Calls</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">{callStats.connectionRate.toFixed(0)}%</p>
                  <p className="text-xs text-gray-500">Connect Rate</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{formatDuration(Math.floor(callStats.avgDuration))}</p>
                  <p className="text-xs text-gray-500">Avg Duration</p>
                </div>
                <div>
                  <p className="text-sm font-medium">${callStats.totalCost.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Total Cost</p>
                </div>
              </div>
              
              <Separator orientation="vertical" className="h-8" />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowDialer(true)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Dialer
              </Button>
              
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
            <div className="border-b px-4 py-2 bg-white">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="call-history">Call History</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="queues">Call Queues</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="flex-1 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Active Agents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Active Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAgents.map((agent) => (
                        <div key={agent.id} className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={agent.avatar} />
                              <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white",
                              agent.status === 'available' && "bg-green-500",
                              agent.status === 'busy' && "bg-red-500",
                              agent.status === 'break' && "bg-amber-500",
                              agent.status === 'offline' && "bg-gray-500"
                            )} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{agent.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{agent.status}</p>
                          </div>
                          <span className="text-xs text-gray-500">{agent.callsToday}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Calls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Calls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockCallRecords.slice(0, 5).map((call) => {
                        const StatusIcon = getCallStatusIcon(call.status);
                        return (
                          <div key={call.id} className="flex items-center space-x-3">
                            <StatusIcon className={cn("h-4 w-4", 
                              call.status === 'completed' && "text-green-600",
                              call.status === 'missed' && "text-red-600"
                            )} />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{call.lead.contact}</p>
                              <p className="text-xs text-gray-500">{formatTime(call.startTime)}</p>
                            </div>
                            <span className="text-xs text-gray-500">{formatDuration(call.duration)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Queue Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Queue Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockQueues.map((queue) => (
                        <div key={queue.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{queue.name}</p>
                            <p className="text-xs text-gray-500">{queue.leads.length} leads</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{queue.completionRate}%</p>
                            <p className="text-xs text-gray-500">completion</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <PhoneCall className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-2xl font-bold">{callStats.totalCalls}</p>
                        <p className="text-sm text-gray-500">Total Calls</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-2xl font-bold">{callStats.completedCalls}</p>
                        <p className="text-sm text-gray-500">Completed</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Timer className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <p className="text-2xl font-bold">{formatDuration(Math.floor(callStats.avgDuration))}</p>
                        <p className="text-sm text-gray-500">Avg Duration</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Target className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="text-2xl font-bold">{callStats.connectionRate.toFixed(0)}%</p>
                        <p className="text-sm text-gray-500">Connect Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="h-16" onClick={() => setShowDialer(true)}>
                        <div className="text-center">
                          <Phone className="h-6 w-6 mx-auto mb-1" />
                          <span>Make Call</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <Users className="h-6 w-6 mx-auto mb-1" />
                          <span>View Queues</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <BarChart3 className="h-6 w-6 mx-auto mb-1" />
                          <span>Reports</span>
                        </div>
                      </Button>
                      <Button variant="outline" className="h-16">
                        <div className="text-center">
                          <Settings className="h-6 w-6 mx-auto mb-1" />
                          <span>Settings</span>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="call-history" className="flex-1 p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Call History</h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search calls..."
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
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="missed">Missed</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="no-answer">No Answer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredCalls.map((call) => (
                    <CallRecordCard
                      key={call.id}
                      call={call}
                      onView={() => {}}
                      onEdit={() => {}}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agents" className="flex-1 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Call Agents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="queues" className="flex-1 p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Call Queues</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Queue
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockQueues.map((queue) => (
                    <QueueCard key={queue.id} queue={queue} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Calls</p>
                        <p className="text-2xl font-bold">{callStats.totalCalls}</p>
                      </div>
                      <PhoneCall className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Connection Rate</p>
                        <p className="text-2xl font-bold text-green-600">{callStats.connectionRate.toFixed(0)}%</p>
                      </div>
                      <Target className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Duration</p>
                        <p className="text-2xl font-bold">{formatDuration(Math.floor(callStats.avgDuration))}</p>
                      </div>
                      <Timer className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Cost</p>
                        <p className="text-2xl font-bold">${callStats.totalCost.toFixed(2)}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Call Dialer Dialog */}
        <Dialog open={showDialer} onOpenChange={setShowDialer}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {isCallInProgress ? 'Call in Progress' : 'Phone Dialer'}
              </DialogTitle>
            </DialogHeader>
            
            {isCallInProgress ? (
              <div className="space-y-6 text-center">
                <Avatar className="h-20 w-20 mx-auto">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xl">
                    {dialerNumber ? getInitials(dialerNumber) : 'UK'}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-semibold text-lg">{dialerNumber || 'Unknown'}</p>
                  <p className="text-gray-500">Call Duration: {formatDuration(callTimer)}</p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Record className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" onClick={handleEndCall}>
                    <StopCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    value={dialerNumber}
                    onChange={(e) => setDialerNumber(e.target.value)}
                    placeholder="Enter phone number..."
                  />
                </div>
                
                {/* Number Pad */}
                <div className="grid grid-cols-3 gap-2">
                  {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      className="h-12"
                      onClick={() => setDialerNumber(prev => prev + num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                
                <div className="flex justify-between space-x-2">
                  <Button variant="outline" onClick={() => setDialerNumber('')}>
                    Clear
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => handleStartCall(dialerNumber)}
                    disabled={!dialerNumber}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
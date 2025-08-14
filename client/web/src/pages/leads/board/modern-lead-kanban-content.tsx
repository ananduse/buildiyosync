import { useState, useCallback } from 'react';
import {
  Plus,
  Filter,
  Settings,
  MoreHorizontal,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  User,
  Star,
  Flame,
  AlertTriangle,
  CircleDot,
  ArrowRight,
  Target,
  Users,
  MessageCircle,
  FileCheck,
  Handshake,
  Trophy,
  XCircle,
  Zap,
  TrendingUp,
  Activity,
  Building2,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Progress } from '@/components/ui/progress';
import { 
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
  type KanbanMoveEvent
} from '@/components/ui/kanban';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
  temperature: 'hot' | 'warm' | 'cold';
  score: number;
  source: string;
  projectType: string;
  location: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  daysInStage: number;
  estimatedValue: number;
  tags: string[];
  lastActivity: string;
  completionPercentage: number;
}

interface KanbanColumnData {
  id: string;
  title: string;
  color: string;
  bgGradient: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  wipLimit?: number;
}

const COLUMN_CONFIG: Record<string, KanbanColumnData> = {
  new: {
    id: 'new',
    title: 'New Leads',
    color: 'text-slate-700',
    bgGradient: 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200',
    icon: Users,
    description: 'Fresh leads waiting to be contacted'
  },
  contacted: {
    id: 'contacted',
    title: 'Contacted',
    color: 'text-blue-700',
    bgGradient: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    icon: MessageCircle,
    description: 'Leads that have been reached out to'
  },
  qualified: {
    id: 'qualified',
    title: 'Qualified',
    color: 'text-amber-700',
    bgGradient: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200',
    icon: Target,
    description: 'Leads that meet our qualification criteria'
  },
  proposal: {
    id: 'proposal',
    title: 'Proposal Sent',
    color: 'text-orange-700',
    bgGradient: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    icon: FileCheck,
    description: 'Proposals have been submitted'
  },
  negotiation: {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'text-purple-700',
    bgGradient: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    icon: Handshake,
    description: 'Active price and terms negotiations'
  },
  won: {
    id: 'won',
    title: 'Won',
    color: 'text-emerald-700',
    bgGradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200',
    icon: Trophy,
    description: 'Successfully closed deals'
  },
  lost: {
    id: 'lost',
    title: 'Lost',
    color: 'text-red-700',
    bgGradient: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    icon: XCircle,
    description: 'Deals that did not close'
  }
};

const mockData: Record<string, Lead[]> = {
  new: [
    {
      id: 'L001',
      name: 'Acme Corporation',
      company: 'Acme Corp',
      contact: 'John Smith',
      email: 'john@acme.com',
      phone: '+1 555-0123',
      budget: '$50K - $100K',
      priority: 'high',
      temperature: 'hot',
      score: 85,
      source: 'Website',
      projectType: 'Commercial Building',
      location: 'New York, NY',
      assignedTo: {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg'
      },
      dueDate: '2024-01-25',
      daysInStage: 3,
      estimatedValue: 75000,
      tags: ['Enterprise', 'High Value'],
      lastActivity: 'Initial contact made',
      completionPercentage: 15
    },
    {
      id: 'L002',
      name: 'TechStart Inc',
      company: 'TechStart Inc',
      contact: 'Emily Davis',
      email: 'emily@techstart.com',
      phone: '+1 555-0456',
      budget: '$100K - $250K',
      priority: 'medium',
      temperature: 'warm',
      score: 72,
      source: 'Referral',
      projectType: 'Office Complex',
      location: 'San Francisco, CA',
      assignedTo: {
        name: 'Mike Chen',
        avatar: '/avatars/mike.jpg'
      },
      dueDate: '2024-01-28',
      daysInStage: 1,
      estimatedValue: 175000,
      tags: ['Tech', 'Referral'],
      lastActivity: 'LinkedIn connection accepted',
      completionPercentage: 10
    }
  ],
  contacted: [
    {
      id: 'L003',
      name: 'Global Industries',
      company: 'Global Industries',
      contact: 'Robert Wilson',
      email: 'r.wilson@global.com',
      phone: '+1 555-0789',
      budget: '$25K - $50K',
      priority: 'medium',
      temperature: 'warm',
      score: 68,
      source: 'Cold Call',
      projectType: 'Warehouse',
      location: 'Chicago, IL',
      assignedTo: {
        name: 'Lisa Wang',
        avatar: '/avatars/lisa.jpg'
      },
      dueDate: '2024-01-30',
      daysInStage: 5,
      estimatedValue: 37500,
      tags: ['Manufacturing', 'Cold Call'],
      lastActivity: 'Phone call scheduled',
      completionPercentage: 25
    }
  ],
  qualified: [
    {
      id: 'L004',
      name: 'Creative Solutions',
      company: 'Creative Solutions',
      contact: 'Maria Garcia',
      email: 'maria@creative.com',
      phone: '+1 555-0321',
      budget: '$75K - $150K',
      priority: 'high',
      temperature: 'hot',
      score: 91,
      source: 'Social Media',
      projectType: 'Retail Space',
      location: 'Miami, FL',
      assignedTo: {
        name: 'David Brown',
        avatar: '/avatars/david.jpg'
      },
      dueDate: '2024-01-26',
      daysInStage: 7,
      estimatedValue: 112500,
      tags: ['Creative', 'Retail'],
      lastActivity: 'Requirements gathering completed',
      completionPercentage: 45
    }
  ],
  proposal: [],
  negotiation: [],
  won: [],
  lost: []
};

function getPriorityConfig(priority: Lead['priority']) {
  switch (priority) {
    case 'high':
      return {
        icon: Flame,
        color: 'text-red-500',
        bg: 'bg-red-50',
        border: 'border-red-200'
      };
    case 'medium':
      return {
        icon: AlertTriangle,
        color: 'text-yellow-500',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200'
      };
    case 'low':
      return {
        icon: CircleDot,
        color: 'text-green-500',
        bg: 'bg-green-50',
        border: 'border-green-200'
      };
    default:
      return {
        icon: CircleDot,
        color: 'text-gray-500',
        bg: 'bg-gray-50',
        border: 'border-gray-200'
      };
  }
}

function getTemperatureConfig(temperature: Lead['temperature']) {
  switch (temperature) {
    case 'hot':
      return {
        color: 'bg-gradient-to-r from-red-500 to-orange-500',
        label: 'Hot',
        textColor: 'text-red-600'
      };
    case 'warm':
      return {
        color: 'bg-gradient-to-r from-orange-500 to-yellow-500',
        label: 'Warm',
        textColor: 'text-orange-600'
      };
    case 'cold':
      return {
        color: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        label: 'Cold',
        textColor: 'text-blue-600'
      };
    default:
      return {
        color: 'bg-gray-500',
        label: 'Unknown',
        textColor: 'text-gray-600'
      };
  }
}

function LeadScoreIndicator({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${(score / 100) * 75.4} 75.4`}
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`stop-color-${getScoreColor(score).split(' ')[0].replace('from-', '')}`} />
              <stop offset="100%" className={`stop-color-${getScoreColor(score).split(' ')[1].replace('to-', '')}`} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold">{score}</span>
        </div>
      </div>
    </div>
  );
}

interface LeadCardProps {
  lead: Lead;
}

function LeadCard({ lead }: LeadCardProps) {
  const priorityConfig = getPriorityConfig(lead.priority);
  const temperatureConfig = getTemperatureConfig(lead.temperature);
  const PriorityIcon = priorityConfig.icon;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <KanbanItem value={lead.id} className="group">
          <Card className="relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <div 
              className="absolute left-0 top-0 h-full w-1 rounded-l-lg"
              style={{
                background: temperatureConfig.color
              }}
            />
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {lead.name}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {lead.company}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 ml-2">
                  <KanbanItemHandle>
                    <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100" />
                  </KanbanItemHandle>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Lead
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center text-xs text-gray-600 mt-2">
                <User className="h-3 w-3 mr-1" />
                <span className="truncate">{lead.contact}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              {/* Priority & Score Row */}
              <div className="flex items-center justify-between">
                <div className={cn(
                  "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                  priorityConfig.bg,
                  priorityConfig.border,
                  priorityConfig.color
                )}>
                  <PriorityIcon className="h-3 w-3" />
                  <span className="capitalize">{lead.priority}</span>
                </div>
                <LeadScoreIndicator score={lead.score} />
              </div>

              {/* Budget & Value */}
              <div className="space-y-2">
                <div className="flex items-center text-xs text-emerald-600 font-semibold">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>${lead.estimatedValue.toLocaleString()}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Budget: {lead.budget}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-gray-700 font-medium">{lead.completionPercentage}%</span>
                </div>
                <Progress value={lead.completionPercentage} className="h-1.5" />
              </div>

              {/* Tags */}
              {lead.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {lead.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                  {lead.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{lead.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Avatar className="h-5 w-5 ring-2 ring-white shadow-sm">
                    <AvatarImage src={lead.assignedTo.avatar} />
                    <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {lead.assignedTo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{lead.daysInStage}d</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </KanbanItem>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-4" side="right">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-3">
            <div className={cn(
              "p-2 rounded-lg",
              temperatureConfig.color.includes('gradient') ? temperatureConfig.color : `bg-${temperatureConfig.color}`
            )}>
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{lead.name}</h3>
              <p className="text-sm text-gray-500">{lead.company}</p>
            </div>
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium", temperatureConfig.textColor)}>
              {temperatureConfig.label}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">{lead.contact}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{lead.location}</span>
            </div>
          </div>

          {/* Project & Financial Info */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div>
              <p className="text-xs text-gray-500 mb-1">Project Type</p>
              <p className="text-sm font-medium">{lead.projectType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Source</p>
              <p className="text-sm font-medium">{lead.source}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
              <p className="text-sm font-semibold text-emerald-600">${lead.estimatedValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Lead Score</p>
              <p className="text-sm font-semibold">{lead.score}/100</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-1">Last Activity</p>
            <div className="flex items-center text-sm">
              <Activity className="h-3 w-3 mr-2 text-green-500" />
              <span>{lead.lastActivity}</span>
            </div>
          </div>

          {/* Assigned To */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={lead.assignedTo.avatar} />
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {lead.assignedTo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{lead.assignedTo.name}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Due {lead.dueDate}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

interface ModernKanbanColumnProps {
  columnId: string;
  leads: Lead[];
}

function ModernKanbanColumn({ columnId, leads }: ModernKanbanColumnProps) {
  const config = COLUMN_CONFIG[columnId];
  const Icon = config.icon;
  const totalValue = leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);
  const avgScore = leads.length > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length) : 0;

  return (
    <KanbanColumn value={columnId} className="w-80">
      <div className={cn(
        "h-full flex flex-col rounded-xl border-2 shadow-sm backdrop-blur-sm",
        config.bgGradient
      )}>
        {/* Column Header */}
        <div className="p-4 border-b border-white/20 bg-white/30 rounded-t-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "p-2 rounded-lg bg-white/50 shadow-sm",
                config.color
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className={cn("font-semibold text-sm", config.color)}>{config.title}</h3>
                <p className="text-xs text-gray-500">{config.description}</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-white/20">
                  <Settings className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Column Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Filter className="h-4 w-4 mr-2" />
                  Set WIP Limit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-2 bg-white/30 rounded-lg">
              <div className="font-semibold text-gray-800">{leads.length}</div>
              <div className="text-gray-600">Leads</div>
            </div>
            <div className="text-center p-2 bg-white/30 rounded-lg">
              <div className="font-semibold text-emerald-600">${(totalValue / 1000).toFixed(0)}K</div>
              <div className="text-gray-600">Value</div>
            </div>
            <div className="text-center p-2 bg-white/30 rounded-lg">
              <div className="font-semibold text-blue-600">{avgScore}</div>
              <div className="text-gray-600">Avg Score</div>
            </div>
          </div>
        </div>

        {/* Column Content */}
        <KanbanColumnContent value={columnId} className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-350px)]">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Icon className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm font-medium">No leads yet</p>
              <p className="text-xs text-center px-4">Drag leads here or click add to get started</p>
            </div>
          ) : (
            leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))
          )}
        </KanbanColumnContent>
      </div>
    </KanbanColumn>
  );
}

export function ModernLeadKanbanContent() {
  const [kanbanData, setKanbanData] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeamMember, setFilterTeamMember] = useState('all');

  const handleMove = useCallback((event: KanbanMoveEvent) => {
    const { activeContainer, overContainer, activeIndex, overIndex } = event;
    
    if (activeContainer === overContainer) {
      // Reorder within same column
      const column = [...kanbanData[activeContainer]];
      const [movedItem] = column.splice(activeIndex, 1);
      column.splice(overIndex, 0, movedItem);
      
      setKanbanData(prev => ({
        ...prev,
        [activeContainer]: column
      }));
    } else {
      // Move between columns
      const sourceColumn = [...kanbanData[activeContainer]];
      const destColumn = [...kanbanData[overContainer]];
      const [movedItem] = sourceColumn.splice(activeIndex, 1);
      destColumn.splice(overIndex, 0, movedItem);
      
      setKanbanData(prev => ({
        ...prev,
        [activeContainer]: sourceColumn,
        [overContainer]: destColumn
      }));
    }
  }, [kanbanData]);

  const getItemValue = useCallback((lead: Lead) => lead.id, []);

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-gray-50 border-b">
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Lead Pipeline Board
            </h1>
            <p className="text-gray-600 mt-1">Drag and drop leads through your sales funnel</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Input 
              placeholder="Search leads..." 
              className="w-64" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={filterTeamMember} onValueChange={setFilterTeamMember}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="lisa">Lisa Wang</SelectItem>
                <SelectItem value="david">David Brown</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <Kanban
            value={kanbanData}
            onValueChange={setKanbanData}
            getItemValue={getItemValue}
            onMove={handleMove}
            className="h-full"
          >
            <div className="p-6 h-full min-w-max">
              <KanbanBoard className="grid-cols-none grid-flow-col auto-cols-[20rem] gap-4 h-full auto-rows-fr">
                {Object.keys(COLUMN_CONFIG).map((columnId) => (
                  <ModernKanbanColumn
                    key={columnId}
                    columnId={columnId}
                    leads={kanbanData[columnId] || []}
                  />
                ))}
              </KanbanBoard>
            </div>

            <KanbanOverlay className="shadow-2xl" />
          </Kanban>
        </div>
      </div>
    </TooltipProvider>
  );
}
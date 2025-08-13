import { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  leads: Lead[];
  wipLimit?: number;
}

const mockColumns: KanbanColumn[] = [
  {
    id: 'new',
    title: 'New Leads',
    color: 'border-gray-300 bg-gray-50',
    leads: [
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
        estimatedValue: 75000
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
        estimatedValue: 175000
      }
    ]
  },
  {
    id: 'contacted',
    title: 'Contacted',
    color: 'border-blue-300 bg-blue-50',
    leads: [
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
        estimatedValue: 37500
      }
    ]
  },
  {
    id: 'qualified',
    title: 'Qualified',
    color: 'border-yellow-300 bg-yellow-50',
    leads: [
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
        estimatedValue: 112500
      }
    ]
  },
  {
    id: 'proposal',
    title: 'Proposal Sent',
    color: 'border-orange-300 bg-orange-50',
    leads: []
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'border-purple-300 bg-purple-50',
    leads: []
  },
  {
    id: 'won',
    title: 'Won',
    color: 'border-green-300 bg-green-50',
    leads: []
  },
  {
    id: 'lost',
    title: 'Lost',
    color: 'border-red-300 bg-red-50',
    leads: []
  },
  {
    id: 'onhold',
    title: 'On Hold',
    color: 'border-gray-400 bg-gray-100',
    leads: []
  }
];

function getPriorityIcon(priority: Lead['priority']) {
  switch (priority) {
    case 'high': return <Flame className="h-3 w-3 text-red-500" />;
    case 'medium': return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
    case 'low': return <CircleDot className="h-3 w-3 text-green-500" />;
    default: return null;
  }
}

function getTemperatureColor(temperature: Lead['temperature']) {
  switch (temperature) {
    case 'hot': return 'bg-red-500';
    case 'warm': return 'bg-orange-500';
    case 'cold': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
}

function LeadScoreStars({ score }: { score: number }) {
  const stars = Math.round(score / 20);
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onView: (lead: Lead) => void;
}

function LeadCard({ lead, onEdit, onView }: LeadCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="mb-3 cursor-move hover:shadow-md transition-shadow border-l-4"
      style={{ borderLeftColor: getTemperatureColor(lead.temperature).replace('bg-', '') }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{lead.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
          </div>
          {isHovered && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(lead)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(lead)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Lead
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        {/* Contact Info */}
        <div className="text-xs text-muted-foreground">
          <p className="truncate">{lead.contact}</p>
        </div>

        {/* Budget Badge */}
        <Badge variant="secondary" className="text-xs">
          <DollarSign className="h-3 w-3 mr-1" />
          {lead.budget}
        </Badge>

        {/* Priority & Score Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {getPriorityIcon(lead.priority)}
            <span className="text-xs capitalize">{lead.priority}</span>
          </div>
          <LeadScoreStars score={lead.score} />
        </div>

        {/* Project Type */}
        <p className="text-xs text-muted-foreground truncate">
          {lead.projectType}
        </p>

        {/* Location */}
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{lead.location}</span>
        </div>

        {/* Assigned User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Avatar className="h-5 w-5">
              <AvatarImage src={lead.assignedTo.avatar} />
              <AvatarFallback className="text-xs">
                {lead.assignedTo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs truncate">{lead.assignedTo.name}</span>
          </div>
        </div>

        {/* Due Date & Days in Stage */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{lead.dueDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{lead.daysInStage}d</span>
          </div>
        </div>

        {/* Source Icon */}
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            {lead.source}
          </Badge>
          <div className="text-xs font-medium text-green-600">
            ${lead.estimatedValue.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KanbanColumnProps {
  column: KanbanColumn;
  onAddLead: (columnId: string) => void;
  onEditLead: (lead: Lead) => void;
  onViewLead: (lead: Lead) => void;
  isCollapsed: boolean;
  onToggleCollapse: (columnId: string) => void;
}

function KanbanColumnComponent({ 
  column, 
  onAddLead, 
  onEditLead, 
  onViewLead,
  isCollapsed,
  onToggleCollapse 
}: KanbanColumnProps) {
  const totalValue = column.leads.reduce((sum, lead) => sum + lead.estimatedValue, 0);

  return (
    <div className={`flex-shrink-0 w-80 ${column.color} border rounded-lg`}>
      {/* Column Header */}
      <div className="p-4 border-b bg-white/50 rounded-t-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {column.leads.length}
            </Badge>
            {column.wipLimit && (
              <Badge 
                variant={column.leads.length > column.wipLimit ? "destructive" : "outline"}
                className="text-xs"
              >
                WIP: {column.leads.length}/{column.wipLimit}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleCollapse(column.id)}
              className="h-6 w-6 p-0"
            >
              <ArrowRight className={`h-3 w-3 transition-transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Column</DropdownMenuItem>
                <DropdownMenuItem>Set WIP Limit</DropdownMenuItem>
                <DropdownMenuItem>Column Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Total Value: <span className="font-medium text-green-600">${totalValue.toLocaleString()}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddLead(column.id)}
          className="w-full mt-2 h-8 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Lead
        </Button>
      </div>

      {/* Column Content */}
      {!isCollapsed && (
        <div className="p-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {column.leads.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <CircleDot className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No leads in this stage</p>
            </div>
          ) : (
            <div className="space-y-3">
              {column.leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={onEditLead}
                  onView={onViewLead}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function LeadKanbanContent() {
  const [columns, setColumns] = useState(mockColumns);
  const [collapsedColumns, setCollapsedColumns] = useState<string[]>([]);
  const [filterTeamMember, setFilterTeamMember] = useState('all');

  const handleAddLead = (columnId: string) => {
    console.log('Add lead to column:', columnId);
    // TODO: Open add lead modal
  };

  const handleEditLead = (lead: Lead) => {
    console.log('Edit lead:', lead);
    // TODO: Open edit lead modal
  };

  const handleViewLead = (lead: Lead) => {
    console.log('View lead:', lead);
    // TODO: Navigate to lead detail page
  };

  const handleToggleCollapse = (columnId: string) => {
    setCollapsedColumns(prev =>
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lead Pipeline</h1>
          <p className="text-muted-foreground">Manage your leads through the sales funnel</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Input placeholder="Search leads..." className="w-64" />
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
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Board Settings
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div 
        className="overflow-x-auto overflow-y-hidden" 
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e0 #f7fafc',
          height: 'calc(100vh - 200px)'
        }}
      >
        <div className="flex space-x-4 h-full pb-4" style={{ minWidth: 'calc(320px * 8)' }}>
          {columns.map((column) => (
            <KanbanColumnComponent
              key={column.id}
              column={column}
              onAddLead={handleAddLead}
              onEditLead={handleEditLead}
              onViewLead={handleViewLead}
              isCollapsed={collapsedColumns.includes(column.id)}
              onToggleCollapse={handleToggleCollapse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import { useState, useMemo } from 'react';
import {
  Flag,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Star,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  Activity,
  CheckCircle,
  AlertCircle,
  Circle,
  Play,
  Pause,
  Square,
  Copy,
  Palette,
  Tag,
  Filter,
  SortAsc,
  SortDesc,
  Shuffle,
  Lock,
  Unlock,
  Zap,
  Timer,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { cn } from '@/lib/utils';

// Types
interface LeadStatus {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  category: 'active' | 'pending' | 'converted' | 'closed';
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost' | 'nurture' | 'unqualified';
  order: number;
  isActive: boolean;
  isDefault: boolean;
  isSystem: boolean; // System statuses cannot be deleted
  canEdit: boolean;
  canDelete: boolean;
  permissions: {
    canChangeFrom: string[];
    canChangeTo: string[];
    requiredFields: string[];
    allowedRoles: string[];
  };
  automation: {
    autoAdvance: boolean;
    autoAdvanceAfter: number; // days
    autoAdvanceTo: string;
    notifications: {
      onEntry: boolean;
      onExit: boolean;
      onTimeout: boolean;
      recipients: string[];
    };
    actions: {
      sendEmail: boolean;
      createTask: boolean;
      updateScore: boolean;
      assignTo: string;
    };
  };
  metrics: {
    totalLeads: number;
    averageTime: number; // days in this status
    conversionRate: number;
    exitRate: number;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface StatusWorkflow {
  id: string;
  name: string;
  description: string;
  statuses: LeadStatus[];
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
}

interface StatusTransition {
  from: string;
  to: string;
  count: number;
  percentage: number;
  averageTime: number;
}

// Mock data
const mockLeadStatuses: LeadStatus[] = [
  {
    id: 'ST001',
    name: 'New Lead',
    description: 'Recently captured leads that haven\'t been contacted yet',
    color: '#3B82F6',
    icon: 'circle',
    category: 'active',
    stage: 'new',
    order: 1,
    isActive: true,
    isDefault: true,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: [],
      canChangeTo: ['ST002', 'ST008'],
      requiredFields: [],
      allowedRoles: ['admin', 'sales-manager', 'sales-rep']
    },
    automation: {
      autoAdvance: true,
      autoAdvanceAfter: 3,
      autoAdvanceTo: 'ST002',
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: true,
        recipients: ['assigned-user', 'sales-manager']
      },
      actions: {
        sendEmail: true,
        createTask: true,
        updateScore: false,
        assignTo: 'round-robin'
      }
    },
    metrics: {
      totalLeads: 145,
      averageTime: 2.3,
      conversionRate: 75.2,
      exitRate: 24.8,
      trend: 'up',
      trendPercentage: 12.5
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'System'
  },
  {
    id: 'ST002',
    name: 'Contacted',
    description: 'Lead has been initially contacted by sales team',
    color: '#10B981',
    icon: 'phone',
    category: 'active',
    stage: 'contacted',
    order: 2,
    isActive: true,
    isDefault: false,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: ['ST001'],
      canChangeTo: ['ST003', 'ST008', 'ST007'],
      requiredFields: ['contact-method', 'contact-notes'],
      allowedRoles: ['admin', 'sales-manager', 'sales-rep']
    },
    automation: {
      autoAdvance: false,
      autoAdvanceAfter: 0,
      autoAdvanceTo: '',
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: false,
        recipients: ['assigned-user']
      },
      actions: {
        sendEmail: false,
        createTask: true,
        updateScore: true,
        assignTo: ''
      }
    },
    metrics: {
      totalLeads: 109,
      averageTime: 4.7,
      conversionRate: 68.8,
      exitRate: 31.2,
      trend: 'stable',
      trendPercentage: 2.1
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'System'
  },
  {
    id: 'ST003',
    name: 'Qualified',
    description: 'Lead meets qualification criteria and shows genuine interest',
    color: '#F59E0B',
    icon: 'target',
    category: 'active',
    stage: 'qualified',
    order: 3,
    isActive: true,
    isDefault: false,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: ['ST002'],
      canChangeTo: ['ST004', 'ST008'],
      requiredFields: ['budget', 'timeline', 'decision-maker'],
      allowedRoles: ['admin', 'sales-manager', 'sales-rep']
    },
    automation: {
      autoAdvance: false,
      autoAdvanceAfter: 0,
      autoAdvanceTo: '',
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: true,
        recipients: ['assigned-user', 'sales-manager']
      },
      actions: {
        sendEmail: true,
        createTask: true,
        updateScore: true,
        assignTo: ''
      }
    },
    metrics: {
      totalLeads: 75,
      averageTime: 8.2,
      conversionRate: 84.0,
      exitRate: 16.0,
      trend: 'up',
      trendPercentage: 8.7
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'System'
  },
  {
    id: 'ST004',
    name: 'Proposal Sent',
    description: 'Formal proposal has been sent to the lead',
    color: '#8B5CF6',
    icon: 'file-text',
    category: 'active',
    stage: 'proposal',
    order: 4,
    isActive: true,
    isDefault: false,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: ['ST003'],
      canChangeTo: ['ST005', 'ST006', 'ST007'],
      requiredFields: ['proposal-document', 'proposal-value'],
      allowedRoles: ['admin', 'sales-manager', 'sales-rep']
    },
    automation: {
      autoAdvance: false,
      autoAdvanceAfter: 0,
      autoAdvanceTo: '',
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: true,
        recipients: ['assigned-user', 'sales-manager']
      },
      actions: {
        sendEmail: true,
        createTask: true,
        updateScore: false,
        assignTo: ''
      }
    },
    metrics: {
      totalLeads: 63,
      averageTime: 12.5,
      conversionRate: 55.6,
      exitRate: 44.4,
      trend: 'down',
      trendPercentage: -3.2
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 17),
    createdBy: 'System'
  },
  {
    id: 'ST005',
    name: 'In Negotiation',
    description: 'Actively negotiating terms and pricing with the lead',
    color: '#EC4899',
    icon: 'handshake',
    category: 'active',
    stage: 'negotiation',
    order: 5,
    isActive: true,
    isDefault: false,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: ['ST004'],
      canChangeTo: ['ST006', 'ST007'],
      requiredFields: ['negotiation-notes'],
      allowedRoles: ['admin', 'sales-manager']
    },
    automation: {
      autoAdvance: false,
      autoAdvanceAfter: 0,
      autoAdvanceTo: '',
      notifications: {
        onEntry: true,
        onExit: true,
        onTimeout: true,
        recipients: ['assigned-user', 'sales-manager', 'sales-director']
      },
      actions: {
        sendEmail: false,
        createTask: true,
        updateScore: true,
        assignTo: ''
      }
    },
    metrics: {
      totalLeads: 35,
      averageTime: 18.7,
      conversionRate: 71.4,
      exitRate: 28.6,
      trend: 'stable',
      trendPercentage: 1.8
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 16),
    createdBy: 'System'
  },
  {
    id: 'ST006',
    name: 'Won',
    description: 'Lead has been successfully converted to customer',
    color: '#059669',
    icon: 'check-circle',
    category: 'converted',
    stage: 'won',
    order: 6,
    isActive: true,
    isDefault: false,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: ['ST004', 'ST005'],
      canChangeTo: [],
      requiredFields: ['deal-value', 'close-date'],
      allowedRoles: ['admin', 'sales-manager', 'sales-rep']
    },
    automation: {
      autoAdvance: false,
      autoAdvanceAfter: 0,
      autoAdvanceTo: '',
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: false,
        recipients: ['assigned-user', 'sales-manager', 'sales-director']
      },
      actions: {
        sendEmail: true,
        createTask: false,
        updateScore: false,
        assignTo: ''
      }
    },
    metrics: {
      totalLeads: 25,
      averageTime: 0,
      conversionRate: 100,
      exitRate: 0,
      trend: 'up',
      trendPercentage: 15.6
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 15),
    createdBy: 'System'
  },
  {
    id: 'ST007',
    name: 'Lost',
    description: 'Lead was not converted - lost to competitor or not interested',
    color: '#DC2626',
    icon: 'x-circle',
    category: 'closed',
    stage: 'lost',
    order: 7,
    isActive: true,
    isDefault: false,
    isSystem: true,
    canEdit: true,
    canDelete: false,
    permissions: {
      canChangeFrom: ['ST002', 'ST003', 'ST004', 'ST005'],
      canChangeTo: ['ST009'],
      requiredFields: ['lost-reason'],
      allowedRoles: ['admin', 'sales-manager', 'sales-rep']
    },
    automation: {
      autoAdvance: false,
      autoAdvanceAfter: 0,
      autoAdvanceTo: '',
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: false,
        recipients: ['assigned-user', 'sales-manager']
      },
      actions: {
        sendEmail: false,
        createTask: false,
        updateScore: false,
        assignTo: ''
      }
    },
    metrics: {
      totalLeads: 18,
      averageTime: 0,
      conversionRate: 0,
      exitRate: 100,
      trend: 'down',
      trendPercentage: -8.3
    },
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 14),
    createdBy: 'System'
  }
];

// Helper functions
function getStatusIcon(iconName: string) {
  const icons = {
    'circle': Circle,
    'phone': Activity,
    'target': Target,
    'file-text': Flag,
    'handshake': Users,
    'check-circle': CheckCircle,
    'x-circle': AlertCircle,
    'clock': Clock,
    'star': Star,
    'flag': Flag
  };
  return icons[iconName as keyof typeof icons] || Circle;
}

function getCategoryColor(category: LeadStatus['category']) {
  switch (category) {
    case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'converted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'closed': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getTrendIcon(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up': return TrendingUp;
    case 'down': return ArrowDown;
    case 'stable': return Activity;
  }
}

function getTrendColor(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up': return 'text-emerald-600';
    case 'down': return 'text-red-600';
    case 'stable': return 'text-gray-600';
  }
}

function SortableStatusCard({ status, onEdit, onView, onToggle, onDelete }: {
  status: LeadStatus;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: status.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group",
        isDragging && "opacity-75 rotate-2 scale-105"
      )}
    >
      <StatusCard
        status={status}
        onEdit={onEdit}
        onView={onView}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </div>
  );
}

function StatusCard({ status, onEdit, onView, onToggle, onDelete, provided, snapshot }: {
  status: LeadStatus;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
  provided?: any;
  snapshot?: any;
}) {
  const StatusIcon = getStatusIcon(status.icon);
  const TrendIcon = getTrendIcon(status.metrics.trend);

  return (
    <div
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      className={cn(
        "group",
        snapshot?.isDragging && "opacity-75 rotate-2 scale-105"
      )}
    >
      <Card className={cn(
        "hover:shadow-md transition-all",
        !status.isActive && "opacity-60",
        snapshot?.isDragging && "shadow-xl"
      )}>
        <CardHeader className="pb-3" {...provided?.dragHandleProps}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div 
                className="p-2 rounded-lg text-white flex items-center justify-center"
                style={{ backgroundColor: status.color }}
              >
                <StatusIcon className="h-4 w-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold">{status.name}</h3>
                  {status.isDefault && (
                    <Badge variant="outline" className="text-xs">
                      Default
                    </Badge>
                  )}
                  {status.isSystem && (
                    <Tooltip content="System Status">
                      <Lock className="h-3 w-3 text-gray-400" />
                    </Tooltip>
                  )}
                  {!status.isActive && (
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      Inactive
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{status.description}</p>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(status.category)} variant="outline">
                    {status.category}
                  </Badge>
                  <span className="text-xs text-gray-500">Order: {status.order}</span>
                </div>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onView}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                {status.canEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Status
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={onToggle}>
                  {status.isActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </DropdownMenuItem>
                {status.canDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onDelete} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 border rounded">
              <p className="text-lg font-bold">{status.metrics.totalLeads}</p>
              <p className="text-xs text-gray-500">Current Leads</p>
            </div>
            <div className="text-center p-2 border rounded">
              <p className="text-lg font-bold text-green-600">{status.metrics.conversionRate}%</p>
              <p className="text-xs text-gray-500">Conversion</p>
            </div>
          </div>
          
          {/* Performance Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Time:</span>
              <span className="font-medium">{status.metrics.averageTime.toFixed(1)} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exit Rate:</span>
              <span className="font-medium">{status.metrics.exitRate}%</span>
            </div>
          </div>
          
          {/* Trend Indicator */}
          <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(status.metrics.trend))}>
            <TrendIcon className="h-4 w-4" />
            <span>
              {status.metrics.trend === 'up' ? '+' : status.metrics.trend === 'down' ? '-' : '±'}
              {Math.abs(status.metrics.trendPercentage)}% this month
            </span>
          </div>

          {/* Automation Indicators */}
          {(status.automation.autoAdvance || status.automation.notifications.onEntry || status.automation.actions.sendEmail) && (
            <div className="flex items-center space-x-2 pt-2 border-t">
              {status.automation.autoAdvance && (
                <Tooltip content="Auto-advance enabled">
                  <Timer className="h-4 w-4 text-blue-500" />
                </Tooltip>
              )}
              {status.automation.notifications.onEntry && (
                <Tooltip content="Entry notifications">
                  <Zap className="h-4 w-4 text-amber-500" />
                </Tooltip>
              )}
              {status.automation.actions.sendEmail && (
                <Tooltip content="Auto-email">
                  <Settings className="h-4 w-4 text-green-500" />
                </Tooltip>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function LeadStatuses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('statuses');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [statuses, setStatuses] = useState(mockLeadStatuses);

  const filteredStatuses = useMemo(() => {
    return statuses.filter(status => {
      const matchesSearch = !searchQuery || 
        status.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        status.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || status.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.order - b.order);
  }, [searchQuery, selectedCategory, statuses]);

  const statusStats = useMemo(() => {
    const total = statuses.length;
    const active = statuses.filter(s => s.isActive).length;
    const totalLeads = statuses.reduce((sum, s) => sum + s.metrics.totalLeads, 0);
    const avgConversion = statuses.length > 0 
      ? statuses.reduce((sum, s) => sum + s.metrics.conversionRate, 0) / statuses.length 
      : 0;
    const avgTime = statuses.length > 0 
      ? statuses.reduce((sum, s) => sum + s.metrics.averageTime, 0) / statuses.length 
      : 0;
    
    return { total, active, totalLeads, avgConversion, avgTime };
  }, [statuses]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = filteredStatuses.findIndex(status => status.id === active.id);
      const newIndex = filteredStatuses.findIndex(status => status.id === over.id);

      const reorderedStatuses = arrayMove(filteredStatuses, oldIndex, newIndex);
      
      // Update order numbers
      const updatedStatuses = statuses.map(status => {
        const newIndex = reorderedStatuses.findIndex(item => item.id === status.id);
        if (newIndex !== -1) {
          return { ...status, order: newIndex + 1 };
        }
        return status;
      });

      setStatuses(updatedStatuses);
    }
  };

  const handleToggleStatus = (statusId: string) => {
    setStatuses(prev => prev.map(s => 
      s.id === statusId ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const handleDeleteStatus = (statusId: string) => {
    setStatuses(prev => prev.filter(s => s.id !== statusId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Lead Statuses</h1>
              <Badge variant="secondary">{filteredStatuses.length} statuses</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search statuses..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Status
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="statuses">Status Management</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="statuses" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Statuses</p>
                        <p className="text-2xl font-bold">{statusStats.total}</p>
                        <p className="text-xs text-gray-500">{statusStats.active} active</p>
                      </div>
                      <Flag className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Leads</p>
                        <p className="text-2xl font-bold">{statusStats.totalLeads}</p>
                        <p className="text-xs text-gray-500">In pipeline</p>
                      </div>
                      <Users className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Conversion</p>
                        <p className="text-2xl font-bold">{statusStats.avgConversion.toFixed(1)}%</p>
                        <p className="text-xs text-gray-500">All statuses</p>
                      </div>
                      <Target className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Time</p>
                        <p className="text-2xl font-bold">{statusStats.avgTime.toFixed(1)}</p>
                        <p className="text-xs text-gray-500">Days per status</p>
                      </div>
                      <Clock className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">System Status</p>
                        <p className="text-2xl font-bold text-green-600">Active</p>
                        <p className="text-xs text-gray-500">All workflows</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Drag and Drop Status Cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Status Pipeline</h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Auto-Sort
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
                
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={filteredStatuses.map(status => status.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredStatuses.map((status) => (
                        <SortableStatusCard
                          key={status.id}
                          status={status}
                          onEdit={() => {}}
                          onView={() => {}}
                          onToggle={() => handleToggleStatus(status.id)}
                          onDelete={() => handleDeleteStatus(status.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              {/* Status Flow Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Flow</CardTitle>
                  <CardDescription>Visual representation of lead status transitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center space-x-4 overflow-x-auto py-4">
                    {filteredStatuses.map((status, index) => (
                      <div key={status.id} className="flex items-center space-x-4">
                        <div className="flex flex-col items-center space-y-2">
                          <div 
                            className="p-4 rounded-full text-white flex items-center justify-center"
                            style={{ backgroundColor: status.color }}
                          >
                            {React.createElement(getStatusIcon(status.icon), { className: "h-6 w-6" })}
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-sm">{status.name}</p>
                            <p className="text-xs text-gray-500">{status.metrics.totalLeads} leads</p>
                          </div>
                        </div>
                        
                        {index < filteredStatuses.length - 1 && (
                          <ArrowRight className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Transition Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Transition Rules</CardTitle>
                  <CardDescription>Configure which statuses can transition to which other statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStatuses.map((status) => (
                      <div key={status.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="p-2 rounded text-white"
                              style={{ backgroundColor: status.color }}
                            >
                              {React.createElement(getStatusIcon(status.icon), { className: "h-4 w-4" })}
                            </div>
                            <h4 className="font-semibold">{status.name}</h4>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Rules
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium mb-2">Can change from:</p>
                            <div className="flex flex-wrap gap-1">
                              {status.permissions.canChangeFrom.length === 0 ? (
                                <Badge variant="outline">None</Badge>
                              ) : (
                                status.permissions.canChangeFrom.map((fromId) => {
                                  const fromStatus = statuses.find(s => s.id === fromId);
                                  return fromStatus ? (
                                    <Badge key={fromId} variant="outline">{fromStatus.name}</Badge>
                                  ) : null;
                                })
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-medium mb-2">Can change to:</p>
                            <div className="flex flex-wrap gap-1">
                              {status.permissions.canChangeTo.length === 0 ? (
                                <Badge variant="outline">Final Status</Badge>
                              ) : (
                                status.permissions.canChangeTo.map((toId) => {
                                  const toStatus = statuses.find(s => s.id === toId);
                                  return toStatus ? (
                                    <Badge key={toId} variant="outline">{toStatus.name}</Badge>
                                  ) : null;
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Status Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Performance</CardTitle>
                  <CardDescription>Analyze how leads perform in each status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStatuses.map((status) => (
                      <div key={status.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div 
                            className="p-2 rounded text-white"
                            style={{ backgroundColor: status.color }}
                          >
                            {React.createElement(getStatusIcon(status.icon), { className: "h-4 w-4" })}
                          </div>
                          <div>
                            <h4 className="font-semibold">{status.name}</h4>
                            <p className="text-sm text-gray-500">{status.metrics.totalLeads} leads</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm font-medium">{status.metrics.conversionRate}%</p>
                            <p className="text-xs text-gray-500">Conversion</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{status.metrics.averageTime.toFixed(1)}d</p>
                            <p className="text-xs text-gray-500">Avg Time</p>
                          </div>
                          <div className={cn("text-center", getTrendColor(status.metrics.trend))}>
                            <div className="flex items-center space-x-1">
                              {React.createElement(getTrendIcon(status.metrics.trend), { className: "h-4 w-4" })}
                              <span className="text-sm font-medium">{Math.abs(status.metrics.trendPercentage)}%</span>
                            </div>
                            <p className="text-xs">Trend</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Status Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Lead Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status Name</Label>
                  <Input placeholder="e.g., Under Review" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe when leads should be in this status..." />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Color</Label>
                  <Input type="color" defaultValue="#3B82F6" />
                </div>
                <div>
                  <Label>Icon</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="target">Target</SelectItem>
                      <SelectItem value="flag">Flag</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Order</Label>
                  <Input type="number" placeholder="1" min="1" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Allow Manual Entry</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Auto-advance</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowAddDialog(false)}>
                  Create Status
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default LeadStatuses;
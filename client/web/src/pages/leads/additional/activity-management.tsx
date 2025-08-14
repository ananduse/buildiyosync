import { useState, useMemo } from 'react';
import {
  Activity,
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
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  DollarSign,
  Users,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Building2,
  Home,
  Globe,
  Navigation,
  Map,
  Route,
  Compass,
  Locate,
  MapIcon,
  Crosshair,
  Landmark,
  TreePine,
  Mountain,
  Waves,
  Layers,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Tag,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Gauge,
  User,
  UserCheck,
  UserX,
  Crown,
  Key,
  Lock,
  Unlock,
  Badge as BadgeIcon,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Video,
  GitBranch,
  Workflow,
  Play,
  Pause,
  Square,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Hash,
  Percent,
  Timer,
  Shuffle,
  BarChart2,
  TrendingUpIcon,
  Calculator,
  Scale,
  Minus,
  Thermometer,
  Brain,
  Lightbulb,
  Sparkles,
  CheckSquare,
  ClipboardList,
  Clipboard,
  Archive,
  FolderOpen,
  FileCheck,
  Send,
  Calendar as CalendarCheck,
  AlarmClock,
  PlayCircle,
  PauseCircle,
  StopCircle
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
import { cn } from '@/lib/utils';

// Types
interface ActivityTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedDuration: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  steps: string[];
}

interface ActivityRecord {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note' | 'demo' | 'proposal' | 'follow_up' | 'research' | 'other';
  category: 'sales' | 'marketing' | 'support' | 'administrative' | 'follow_up' | 'qualification';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  leadId: string;
  leadName: string;
  assignedTo: string;
  assignedBy: string;
  dueDate: Date;
  completedDate?: Date;
  estimatedDuration: number; // in minutes
  actualDuration?: number; // in minutes
  outcome?: 'successful' | 'unsuccessful' | 'rescheduled' | 'no_answer' | 'follow_up_required';
  tags: string[];
  attachments: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
  relatedActivities: string[];
  automation: {
    isAutomated: boolean;
    triggeredBy?: string;
    workflowId?: string;
    nextActivity?: string;
  };
  performance: {
    responseTime: number; // in hours
    completionTime: number; // in hours
    qualityScore: number;
    customerSatisfaction?: number;
  };
  metadata: {
    source: 'manual' | 'automated' | 'imported' | 'api';
    device?: string;
    location?: string;
    ip?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface TaskChecklist {
  id: string;
  activityId: string;
  items: {
    id: string;
    text: string;
    isCompleted: boolean;
    completedBy?: string;
    completedAt?: Date;
  }[];
}

interface ActivitySummary {
  totalActivities: number;
  completedActivities: number;
  pendingActivities: number;
  overdueActivities: number;
  avgCompletionTime: number;
  avgQualityScore: number;
  productivityScore: number;
}

// Mock data
const mockActivityTemplates: ActivityTemplate[] = [
  {
    id: 'TMPL001',
    name: 'Initial Lead Contact',
    description: 'First contact with new lead including qualification questions',
    category: 'qualification',
    estimatedDuration: 30,
    priority: 'high',
    steps: [
      'Review lead information and source',
      'Prepare qualification questions',
      'Make initial contact call',
      'Complete lead qualification form',
      'Schedule follow-up if qualified'
    ]
  },
  {
    id: 'TMPL002',
    name: 'Product Demo Preparation',
    description: 'Prepare and conduct product demonstration',
    category: 'sales',
    estimatedDuration: 60,
    priority: 'high',
    steps: [
      'Research client requirements',
      'Customize demo environment',
      'Prepare presentation materials',
      'Conduct demo session',
      'Gather feedback and next steps'
    ]
  },
  {
    id: 'TMPL003',
    name: 'Follow-up Email Campaign',
    description: 'Automated follow-up email sequence',
    category: 'follow_up',
    estimatedDuration: 15,
    priority: 'medium',
    steps: [
      'Select appropriate email template',
      'Personalize content for lead',
      'Schedule email delivery',
      'Track open and click rates',
      'Plan next follow-up based on engagement'
    ]
  }
];

const mockActivities: ActivityRecord[] = [
  {
    id: 'ACT001',
    title: 'Initial Qualification Call',
    description: 'First contact call to qualify lead requirements and budget',
    type: 'call',
    category: 'qualification',
    status: 'completed',
    priority: 'high',
    leadId: 'LEAD001',
    leadName: 'ABC Construction Co.',
    assignedTo: 'John Smith',
    assignedBy: 'Sales Manager',
    dueDate: new Date(2024, 0, 18, 10, 0),
    completedDate: new Date(2024, 0, 18, 10, 25),
    estimatedDuration: 30,
    actualDuration: 25,
    outcome: 'successful',
    tags: ['qualification', 'initial-contact', 'construction'],
    attachments: [
      {
        id: 'ATT001',
        name: 'Call Notes.pdf',
        type: 'application/pdf',
        size: 245000,
        url: '/files/call-notes-001.pdf'
      }
    ],
    relatedActivities: ['ACT002'],
    automation: {
      isAutomated: false
    },
    performance: {
      responseTime: 2.5,
      completionTime: 0.4,
      qualityScore: 8.7,
      customerSatisfaction: 4.5
    },
    metadata: {
      source: 'manual',
      device: 'Desktop',
      location: 'San Francisco Office'
    },
    createdAt: new Date(2024, 0, 17, 15, 30),
    updatedAt: new Date(2024, 0, 18, 10, 25),
    createdBy: 'John Smith'
  },
  {
    id: 'ACT002',
    title: 'Send Project Information',
    description: 'Email detailed project information and pricing guide',
    type: 'email',
    category: 'follow_up',
    status: 'completed',
    priority: 'medium',
    leadId: 'LEAD001',
    leadName: 'ABC Construction Co.',
    assignedTo: 'John Smith',
    assignedBy: 'System',
    dueDate: new Date(2024, 0, 18, 16, 0),
    completedDate: new Date(2024, 0, 18, 15, 45),
    estimatedDuration: 15,
    actualDuration: 10,
    outcome: 'successful',
    tags: ['follow-up', 'information', 'pricing'],
    attachments: [
      {
        id: 'ATT002',
        name: 'Project Info Package.pdf',
        type: 'application/pdf',
        size: 1200000,
        url: '/files/project-info-001.pdf'
      },
      {
        id: 'ATT003',
        name: 'Pricing Guide.xlsx',
        type: 'application/vnd.ms-excel',
        size: 450000,
        url: '/files/pricing-guide-001.xlsx'
      }
    ],
    relatedActivities: ['ACT001', 'ACT003'],
    automation: {
      isAutomated: true,
      triggeredBy: 'ACT001',
      workflowId: 'WF001',
      nextActivity: 'ACT003'
    },
    performance: {
      responseTime: 0.25,
      completionTime: 0.17,
      qualityScore: 9.2
    },
    metadata: {
      source: 'automated',
      device: 'Server'
    },
    createdAt: new Date(2024, 0, 18, 10, 30),
    updatedAt: new Date(2024, 0, 18, 15, 45),
    createdBy: 'System'
  },
  {
    id: 'ACT003',
    title: 'Schedule Product Demo',
    description: 'Schedule and conduct product demonstration meeting',
    type: 'meeting',
    category: 'sales',
    status: 'in_progress',
    priority: 'high',
    leadId: 'LEAD001',
    leadName: 'ABC Construction Co.',
    assignedTo: 'John Smith',
    assignedBy: 'John Smith',
    dueDate: new Date(2024, 0, 22, 14, 0),
    estimatedDuration: 60,
    tags: ['demo', 'presentation', 'sales'],
    attachments: [],
    relatedActivities: ['ACT002'],
    automation: {
      isAutomated: false
    },
    performance: {
      responseTime: 1.2,
      completionTime: 0,
      qualityScore: 0
    },
    metadata: {
      source: 'manual',
      device: 'Mobile'
    },
    createdAt: new Date(2024, 0, 19, 9, 15),
    updatedAt: new Date(2024, 0, 20, 11, 30),
    createdBy: 'John Smith'
  },
  {
    id: 'ACT004',
    title: 'Follow-up Call - Project Timeline',
    description: 'Discuss project timeline and next steps after demo',
    type: 'call',
    category: 'follow_up',
    status: 'pending',
    priority: 'medium',
    leadId: 'LEAD002',
    leadName: 'XYZ Development LLC',
    assignedTo: 'Maria Garcia',
    assignedBy: 'Sales Manager',
    dueDate: new Date(2024, 0, 24, 11, 0),
    estimatedDuration: 20,
    tags: ['follow-up', 'timeline', 'next-steps'],
    attachments: [],
    relatedActivities: [],
    automation: {
      isAutomated: true,
      triggeredBy: 'ACT003',
      workflowId: 'WF002'
    },
    performance: {
      responseTime: 0,
      completionTime: 0,
      qualityScore: 0
    },
    metadata: {
      source: 'automated'
    },
    createdAt: new Date(2024, 0, 20, 16, 45),
    updatedAt: new Date(2024, 0, 20, 16, 45),
    createdBy: 'System'
  },
  {
    id: 'ACT005',
    title: 'Market Research - Competitor Analysis',
    description: 'Research competitor pricing and service offerings',
    type: 'research',
    category: 'marketing',
    status: 'on_hold',
    priority: 'low',
    leadId: 'LEAD003',
    leadName: 'BuildRight Solutions',
    assignedTo: 'David Chen',
    assignedBy: 'Marketing Manager',
    dueDate: new Date(2024, 0, 25, 17, 0),
    estimatedDuration: 120,
    tags: ['research', 'competitor', 'analysis'],
    attachments: [
      {
        id: 'ATT004',
        name: 'Competitor Research Template.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: 95000,
        url: '/files/competitor-template.docx'
      }
    ],
    relatedActivities: [],
    automation: {
      isAutomated: false
    },
    performance: {
      responseTime: 24.5,
      completionTime: 0,
      qualityScore: 0
    },
    metadata: {
      source: 'manual',
      device: 'Desktop',
      location: 'Remote'
    },
    createdAt: new Date(2024, 0, 19, 14, 20),
    updatedAt: new Date(2024, 0, 20, 9, 10),
    createdBy: 'Marketing Manager'
  }
];

// Helper functions
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getActivityTypeIcon(type: ActivityRecord['type']) {
  switch (type) {
    case 'call': return Phone;
    case 'email': return Mail;
    case 'meeting': return Users;
    case 'task': return CheckSquare;
    case 'note': return FileText;
    case 'demo': return PlayCircle;
    case 'proposal': return FileCheck;
    case 'follow_up': return RotateCcw;
    case 'research': return Search;
    case 'other': return Activity;
    default: return Activity;
  }
}

function getStatusColor(status: ActivityRecord['status']) {
  switch (status) {
    case 'pending': return 'text-amber-600 bg-amber-50';
    case 'in_progress': return 'text-blue-600 bg-blue-50';
    case 'completed': return 'text-emerald-600 bg-emerald-50';
    case 'cancelled': return 'text-red-600 bg-red-50';
    case 'on_hold': return 'text-gray-600 bg-gray-50';
  }
}

function getPriorityColor(priority: ActivityRecord['priority']) {
  switch (priority) {
    case 'low': return 'text-gray-600 bg-gray-50';
    case 'medium': return 'text-blue-600 bg-blue-50';
    case 'high': return 'text-amber-600 bg-amber-50';
    case 'urgent': return 'text-red-600 bg-red-50';
  }
}

function getOutcomeColor(outcome?: ActivityRecord['outcome']) {
  switch (outcome) {
    case 'successful': return 'text-emerald-600 bg-emerald-50';
    case 'unsuccessful': return 'text-red-600 bg-red-50';
    case 'rescheduled': return 'text-amber-600 bg-amber-50';
    case 'no_answer': return 'text-gray-600 bg-gray-50';
    case 'follow_up_required': return 'text-blue-600 bg-blue-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function ActivityCard({ activity, onEdit, onView, onComplete, onDelete }: {
  activity: ActivityRecord;
  onEdit: () => void;
  onView: () => void;
  onComplete: () => void;
  onDelete: () => void;
}) {
  const TypeIcon = getActivityTypeIcon(activity.type);
  const isOverdue = new Date(activity.dueDate) < new Date() && activity.status !== 'completed';

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-blue-500 text-white">
              <TypeIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{activity.title}</h3>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getStatusColor(activity.status))}
                >
                  {activity.status.replace('_', ' ')}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getPriorityColor(activity.priority))}
                >
                  {activity.priority}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs">
                    Overdue
                  </Badge>
                )}
                {activity.automation.isAutomated && (
                  <Tooltip content="Automated Activity">
                    <Zap className="h-3 w-3 text-amber-500" />
                  </Tooltip>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{activity.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building2 className="h-3 w-3" />
                  <span>{activity.leadName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDuration(activity.estimatedDuration)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(activity.dueDate).toLocaleDateString()}</span>
                </div>
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
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Activity
              </DropdownMenuItem>
              {activity.status !== 'completed' && (
                <DropdownMenuItem onClick={onComplete}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardList className="h-4 w-4 mr-2" />
                Create Template
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Tag className="h-4 w-4 mr-2" />
                Add Tags
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Attach Files
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress and Metrics */}
        {activity.status === 'completed' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 border rounded-lg">
              <p className="text-lg font-bold">{activity.actualDuration || 0}m</p>
              <p className="text-xs text-gray-500">Actual Duration</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <p className="text-lg font-bold text-green-600">{activity.performance.qualityScore}/10</p>
              <p className="text-xs text-gray-500">Quality Score</p>
            </div>
          </div>
        )}
        
        {/* Activity Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium capitalize">{activity.type.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium capitalize">{activity.category}</span>
          </div>
          {activity.outcome && (
            <div className="flex justify-between">
              <span className="text-gray-600">Outcome:</span>
              <Badge 
                variant="outline" 
                className={cn("text-xs", getOutcomeColor(activity.outcome))}
              >
                {activity.outcome.replace('_', ' ')}
              </Badge>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Attachments:</span>
            <span className="font-medium">{activity.attachments.length} files</span>
          </div>
        </div>
        
        {/* Tags */}
        {activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {activity.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {activity.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{activity.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {/* Status Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-gray-500">
            Created {new Date(activity.createdAt).toLocaleDateString()}
          </div>
          {activity.completedDate && (
            <div className="text-xs text-emerald-600">
              Completed {new Date(activity.completedDate).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityTemplateCard({ template, onUse }: {
  template: ActivityTemplate;
  onUse: () => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-purple-500 text-white">
              <ClipboardList className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant="secondary" className="text-xs capitalize">
                  {template.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getPriorityColor(template.priority))}
                >
                  {template.priority}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDuration(template.estimatedDuration)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckSquare className="h-3 w-3" />
                  <span>{template.steps.length} steps</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button size="sm" onClick={onUse}>
            <Plus className="h-4 w-4 mr-1" />
            Use Template
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export function ActivityManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedTab, setSelectedTab] = useState('activities');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [activities, setActivities] = useState(mockActivities);

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = !searchQuery || 
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.leadName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || activity.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || activity.priority === selectedPriority;
      
      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  }, [searchQuery, selectedType, selectedStatus, selectedPriority, activities]);

  const activitySummary = useMemo(() => {
    const totalActivities = activities.length;
    const completedActivities = activities.filter(a => a.status === 'completed').length;
    const pendingActivities = activities.filter(a => a.status === 'pending').length;
    const overdueActivities = activities.filter(a => 
      new Date(a.dueDate) < new Date() && a.status !== 'completed'
    ).length;
    
    const completedWithDuration = activities.filter(a => a.actualDuration && a.status === 'completed');
    const avgCompletionTime = completedWithDuration.length > 0 
      ? completedWithDuration.reduce((sum, a) => sum + (a.actualDuration || 0), 0) / completedWithDuration.length 
      : 0;
    
    const activitiesWithScore = activities.filter(a => a.performance.qualityScore > 0);
    const avgQualityScore = activitiesWithScore.length > 0 
      ? activitiesWithScore.reduce((sum, a) => sum + a.performance.qualityScore, 0) / activitiesWithScore.length 
      : 0;
    
    const productivityScore = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
    
    return {
      totalActivities,
      completedActivities,
      pendingActivities,
      overdueActivities,
      avgCompletionTime,
      avgQualityScore,
      productivityScore
    };
  }, [activities]);

  const handleCompleteActivity = (activityId: string) => {
    setActivities(prev => prev.map(a => 
      a.id === activityId ? { 
        ...a, 
        status: 'completed' as const,
        completedDate: new Date(),
        actualDuration: a.estimatedDuration // Mock actual duration
      } : a
    ));
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(prev => prev.filter(a => a.id !== activityId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Activity Management</h1>
              <Badge variant="secondary">{filteredActivities.length} activities</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                  <SelectItem value="demo">Demo</SelectItem>
                  <SelectItem value="follow_up">Follow-up</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" onClick={() => setShowTemplateDialog(true)}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Templates
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Activity
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="activities">All Activities</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="activities" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Activities</p>
                        <p className="text-2xl font-bold">{activitySummary.totalActivities}</p>
                        <p className="text-xs text-gray-500">{activitySummary.completedActivities} completed</p>
                      </div>
                      <Activity className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-2xl font-bold">{activitySummary.pendingActivities}</p>
                        <p className="text-xs text-gray-500">{activitySummary.overdueActivities} overdue</p>
                      </div>
                      <Clock className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Completion</p>
                        <p className="text-2xl font-bold">{formatDuration(Math.round(activitySummary.avgCompletionTime))}</p>
                        <p className="text-xs text-gray-500">Time per activity</p>
                      </div>
                      <Timer className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Quality Score</p>
                        <p className={cn("text-2xl font-bold", 
                          activitySummary.avgQualityScore > 8 ? "text-emerald-600" : 
                          activitySummary.avgQualityScore > 6 ? "text-amber-600" : "text-red-600"
                        )}>
                          {activitySummary.avgQualityScore.toFixed(1)}/10
                        </p>
                        <p className="text-xs text-gray-500">Average quality</p>
                      </div>
                      <Star className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onEdit={() => {}}
                      onView={() => {}}
                      onComplete={() => handleCompleteActivity(activity.id)}
                      onDelete={() => handleDeleteActivity(activity.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Calendar</CardTitle>
                  <CardDescription>View activities in calendar format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Calendar integration would be implemented here</p>
                      <p className="text-sm text-gray-400">Shows activities by date with drag-and-drop scheduling</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Activity Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Performance Analysis</CardTitle>
                  <CardDescription>Performance metrics and completion rates by activity type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['call', 'email', 'meeting', 'task', 'demo', 'follow_up'].map((type) => {
                      const typeActivities = activities.filter(a => a.type === type);
                      const completed = typeActivities.filter(a => a.status === 'completed').length;
                      const completionRate = typeActivities.length > 0 ? (completed / typeActivities.length) * 100 : 0;
                      const avgQuality = typeActivities.filter(a => a.performance.qualityScore > 0);
                      const qualityScore = avgQuality.length > 0 
                        ? avgQuality.reduce((sum, a) => sum + a.performance.qualityScore, 0) / avgQuality.length 
                        : 0;
                      
                      const TypeIcon = getActivityTypeIcon(type as ActivityRecord['type']);
                      
                      return (
                        <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-blue-500 text-white">
                              <TypeIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium capitalize">{type.replace('_', ' ')}</p>
                              <p className="text-sm text-gray-500">
                                {typeActivities.length} activities • {completed} completed
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-right text-sm">
                            <div>
                              <p className="font-semibold text-emerald-600">{completionRate.toFixed(1)}%</p>
                              <p className="text-gray-500">Completion</p>
                            </div>
                            <div>
                              <p className="font-semibold">{qualityScore.toFixed(1)}/10</p>
                              <p className="text-gray-500">Quality</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Productivity Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rates by Priority</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['urgent', 'high', 'medium', 'low'].map((priority) => {
                        const priorityActivities = activities.filter(a => a.priority === priority);
                        const completed = priorityActivities.filter(a => a.status === 'completed').length;
                        const completionRate = priorityActivities.length > 0 ? (completed / priorityActivities.length) * 100 : 0;
                        const maxRate = Math.max(...['urgent', 'high', 'medium', 'low'].map(p => {
                          const acts = activities.filter(a => a.priority === p);
                          const comp = acts.filter(a => a.status === 'completed').length;
                          return acts.length > 0 ? (comp / acts.length) * 100 : 0;
                        }));
                        
                        return (
                          <div key={priority} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{priority}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${maxRate > 0 ? (completionRate / maxRate) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {completionRate.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {activities
                        .filter(a => a.performance.responseTime > 0)
                        .sort((a, b) => a.performance.responseTime - b.performance.responseTime)
                        .slice(0, 6)
                        .map((activity) => {
                          const maxResponseTime = Math.max(...activities.map(a => a.performance.responseTime));
                          
                          return (
                            <div key={activity.id} className="flex items-center justify-between">
                              <span className="text-sm">{activity.title}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-emerald-500 h-2 rounded-full"
                                    style={{ width: `${maxResponseTime > 0 ? (activity.performance.responseTime / maxResponseTime) * 100 : 0}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12">
                                  {activity.performance.responseTime.toFixed(1)}h
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Automation</CardTitle>
                  <CardDescription>Automated workflows and activity triggers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities
                      .filter(a => a.automation.isAutomated)
                      .map((activity) => {
                        const TypeIcon = getActivityTypeIcon(activity.type);
                        
                        return (
                          <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-amber-500 text-white">
                                <TypeIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-sm text-gray-500">
                                  {activity.automation.triggeredBy ? `Triggered by: ${activity.automation.triggeredBy}` : 'Auto-triggered'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {activity.automation.workflowId || 'Auto'}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs", getStatusColor(activity.status))}
                              >
                                {activity.status}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    
                    {activities.filter(a => a.automation.isAutomated).length === 0 && (
                      <div className="text-center py-8">
                        <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No automated activities found</p>
                        <p className="text-sm text-gray-400">Create workflow rules to automate activity creation</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add Activity Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Follow-up call with client" />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Detailed description of the activity..." />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Lead</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LEAD001">ABC Construction Co.</SelectItem>
                      <SelectItem value="LEAD002">XYZ Development LLC</SelectItem>
                      <SelectItem value="LEAD003">BuildRight Solutions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="maria">Maria Garcia</SelectItem>
                      <SelectItem value="david">David Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Priority</Label>
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
                  <Label>Due Date</Label>
                  <Input type="datetime-local" />
                </div>
                <div>
                  <Label>Estimated Duration (minutes)</Label>
                  <Input type="number" placeholder="30" />
                </div>
              </div>
              
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input placeholder="follow-up, qualified, high-value" />
              </div>
              
              <div className="space-y-2">
                <Label>Task Checklist</Label>
                <div className="space-y-2">
                  <Input placeholder="Checklist item 1" />
                  <Input placeholder="Checklist item 2" />
                  <Input placeholder="Checklist item 3" />
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Send Notification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Add to Calendar</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>
                Create Activity
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Templates Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Activity Templates</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Choose from pre-defined activity templates</p>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {mockActivityTemplates.map((template) => (
                  <ActivityTemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => {
                      setShowTemplateDialog(false);
                      setShowAddDialog(true);
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
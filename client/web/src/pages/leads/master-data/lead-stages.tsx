import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Plus,
  Edit,
  Trash2,
  Settings,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Award,
  Star,
  Flag,
  Circle,
  Square,
  Triangle,
  Diamond,
  Eye,
  Copy,
  RefreshCw,
  Save,
  X,
  Info,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  StopCircle,
  MoreVertical,
  DragHandle,
  Palette,
  Hash,
  Calendar,
  Timer,
  Percent,
  DollarSign,
  Building,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

interface LeadStage {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
  isDefault: boolean;
  category: 'qualification' | 'nurturing' | 'proposal' | 'closing' | 'won' | 'lost';
  probability: number;
  expectedDuration: number; // in days
  requiredActions: string[];
  automationTriggers: string[];
  notifications: {
    onEntry: boolean;
    onExit: boolean;
    onTimeout: boolean;
    recipients: string[];
  };
  metrics: {
    totalLeads: number;
    averageStayTime: number;
    conversionRate: number;
    leadsThisMonth: number;
  };
  transitions: {
    allowedNext: string[];
    allowedPrevious: string[];
    autoAdvanceAfter?: number; // days
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface StageTemplate {
  id: string;
  name: string;
  description: string;
  stages: Omit<LeadStage, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'metrics'>[];
  industry: string;
  businessModel: string;
  isPopular: boolean;
}

const LeadStages: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('stages');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingStage, setEditingStage] = useState<LeadStage | null>(null);
  const [draggedStage, setDraggedStage] = useState<string | null>(null);

  // Mock data for lead stages
  const leadStages: LeadStage[] = [
    {
      id: 'stage-001',
      name: 'New Lead',
      description: 'Newly acquired leads that need initial qualification',
      color: '#3B82F6',
      icon: 'circle',
      order: 1,
      isActive: true,
      isDefault: true,
      category: 'qualification',
      probability: 10,
      expectedDuration: 3,
      requiredActions: ['Initial contact', 'Qualification call', 'Needs assessment'],
      automationTriggers: ['welcome_email', 'assign_to_rep'],
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: true,
        recipients: ['sales@company.com']
      },
      metrics: {
        totalLeads: 1247,
        averageStayTime: 2.5,
        conversionRate: 65,
        leadsThisMonth: 89
      },
      transitions: {
        allowedNext: ['stage-002', 'stage-007'],
        allowedPrevious: [],
        autoAdvanceAfter: 7
      },
      createdAt: '2023-06-15T10:00:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      createdBy: 'System Admin'
    },
    {
      id: 'stage-002',
      name: 'Qualified',
      description: 'Leads that have been qualified and show genuine interest',
      color: '#10B981',
      icon: 'checkCircle',
      order: 2,
      isActive: true,
      isDefault: false,
      category: 'qualification',
      probability: 25,
      expectedDuration: 5,
      requiredActions: ['Budget confirmation', 'Decision maker identified', 'Timeline established'],
      automationTriggers: ['assign_specialist', 'send_proposal_template'],
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: false,
        recipients: ['qualified@company.com', 'sales-manager@company.com']
      },
      metrics: {
        totalLeads: 567,
        averageStayTime: 4.2,
        conversionRate: 78,
        leadsThisMonth: 45
      },
      transitions: {
        allowedNext: ['stage-003', 'stage-007'],
        allowedPrevious: ['stage-001']
      },
      createdAt: '2023-06-15T10:05:00Z',
      updatedAt: '2024-01-08T11:20:00Z',
      createdBy: 'Sales Manager'
    },
    {
      id: 'stage-003',
      name: 'Needs Analysis',
      description: 'Deep dive into customer requirements and pain points',
      color: '#F59E0B',
      icon: 'target',
      order: 3,
      isActive: true,
      isDefault: false,
      category: 'nurturing',
      probability: 40,
      expectedDuration: 7,
      requiredActions: ['Requirements gathering', 'Pain point analysis', 'Solution mapping'],
      automationTriggers: ['schedule_demo', 'send_case_studies'],
      notifications: {
        onEntry: false,
        onExit: false,
        onTimeout: true,
        recipients: ['specialists@company.com']
      },
      metrics: {
        totalLeads: 234,
        averageStayTime: 6.8,
        conversionRate: 72,
        leadsThisMonth: 23
      },
      transitions: {
        allowedNext: ['stage-004', 'stage-007'],
        allowedPrevious: ['stage-002']
      },
      createdAt: '2023-06-15T10:10:00Z',
      updatedAt: '2023-12-20T16:45:00Z',
      createdBy: 'Sales Manager'
    },
    {
      id: 'stage-004',
      name: 'Proposal Sent',
      description: 'Formal proposal or quote has been submitted to the prospect',
      color: '#8B5CF6',
      icon: 'fileText',
      order: 4,
      isActive: true,
      isDefault: false,
      category: 'proposal',
      probability: 60,
      expectedDuration: 14,
      requiredActions: ['Proposal review call', 'Address objections', 'Negotiate terms'],
      automationTriggers: ['proposal_follow_up', 'schedule_review_call'],
      notifications: {
        onEntry: true,
        onExit: true,
        onTimeout: true,
        recipients: ['proposals@company.com', 'sales-director@company.com']
      },
      metrics: {
        totalLeads: 156,
        averageStayTime: 12.3,
        conversionRate: 58,
        leadsThisMonth: 18
      },
      transitions: {
        allowedNext: ['stage-005', 'stage-006', 'stage-007'],
        allowedPrevious: ['stage-003']
      },
      createdAt: '2023-06-15T10:15:00Z',
      updatedAt: '2024-01-05T09:30:00Z',
      createdBy: 'Sales Manager'
    },
    {
      id: 'stage-005',
      name: 'Negotiation',
      description: 'Active negotiation of terms, pricing, and contract details',
      color: '#EF4444',
      icon: 'users',
      order: 5,
      isActive: true,
      isDefault: false,
      category: 'closing',
      probability: 80,
      expectedDuration: 10,
      requiredActions: ['Price negotiation', 'Contract review', 'Final approval'],
      automationTriggers: ['escalate_to_director', 'prepare_contract'],
      notifications: {
        onEntry: true,
        onExit: true,
        onTimeout: true,
        recipients: ['negotiations@company.com', 'legal@company.com']
      },
      metrics: {
        totalLeads: 67,
        averageStayTime: 8.7,
        conversionRate: 85,
        leadsThisMonth: 12
      },
      transitions: {
        allowedNext: ['stage-006', 'stage-007'],
        allowedPrevious: ['stage-004']
      },
      createdAt: '2023-06-15T10:20:00Z',
      updatedAt: '2023-11-30T14:15:00Z',
      createdBy: 'Sales Director'
    },
    {
      id: 'stage-006',
      name: 'Closed Won',
      description: 'Successfully converted leads - deals that were won',
      color: '#059669',
      icon: 'trophy',
      order: 6,
      isActive: true,
      isDefault: false,
      category: 'won',
      probability: 100,
      expectedDuration: 0,
      requiredActions: ['Contract signed', 'Onboarding initiated', 'Success team handoff'],
      automationTriggers: ['welcome_customer', 'schedule_onboarding'],
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: false,
        recipients: ['won@company.com', 'success@company.com', 'finance@company.com']
      },
      metrics: {
        totalLeads: 234,
        averageStayTime: 0,
        conversionRate: 100,
        leadsThisMonth: 28
      },
      transitions: {
        allowedNext: [],
        allowedPrevious: ['stage-005', 'stage-004']
      },
      createdAt: '2023-06-15T10:25:00Z',
      updatedAt: '2024-01-12T10:00:00Z',
      createdBy: 'System Admin'
    },
    {
      id: 'stage-007',
      name: 'Closed Lost',
      description: 'Leads that were not converted - deals that were lost',
      color: '#6B7280',
      icon: 'x',
      order: 7,
      isActive: true,
      isDefault: false,
      category: 'lost',
      probability: 0,
      expectedDuration: 0,
      requiredActions: ['Lost reason documented', 'Feedback collected', 'Future follow-up scheduled'],
      automationTriggers: ['add_to_nurture_campaign', 'schedule_future_contact'],
      notifications: {
        onEntry: true,
        onExit: false,
        onTimeout: false,
        recipients: ['lost@company.com', 'marketing@company.com']
      },
      metrics: {
        totalLeads: 456,
        averageStayTime: 0,
        conversionRate: 0,
        leadsThisMonth: 23
      },
      transitions: {
        allowedNext: [],
        allowedPrevious: ['stage-001', 'stage-002', 'stage-003', 'stage-004', 'stage-005']
      },
      createdAt: '2023-06-15T10:30:00Z',
      updatedAt: '2024-01-01T08:45:00Z',
      createdBy: 'System Admin'
    }
  ];

  // Mock data for stage templates
  const stageTemplates: StageTemplate[] = [
    {
      id: 'template-001',
      name: 'B2B SaaS Sales Pipeline',
      description: 'Standard sales pipeline for B2B SaaS companies',
      industry: 'Technology',
      businessModel: 'B2B SaaS',
      isPopular: true,
      stages: [
        { name: 'Lead', description: 'Initial contact', color: '#3B82F6', icon: 'circle', order: 1, isActive: true, isDefault: true, category: 'qualification', probability: 5, expectedDuration: 2, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Qualified', description: 'Qualified prospect', color: '#10B981', icon: 'checkCircle', order: 2, isActive: true, isDefault: false, category: 'qualification', probability: 20, expectedDuration: 3, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Demo', description: 'Product demonstration', color: '#F59E0B', icon: 'play', order: 3, isActive: true, isDefault: false, category: 'nurturing', probability: 40, expectedDuration: 5, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Proposal', description: 'Proposal sent', color: '#8B5CF6', icon: 'fileText', order: 4, isActive: true, isDefault: false, category: 'proposal', probability: 70, expectedDuration: 7, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Closed Won', description: 'Deal won', color: '#059669', icon: 'trophy', order: 5, isActive: true, isDefault: false, category: 'won', probability: 100, expectedDuration: 0, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Closed Lost', description: 'Deal lost', color: '#6B7280', icon: 'x', order: 6, isActive: true, isDefault: false, category: 'lost', probability: 0, expectedDuration: 0, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } }
      ]
    },
    {
      id: 'template-002',
      name: 'E-commerce Lead Pipeline',
      description: 'Optimized for e-commerce and online retail',
      industry: 'Retail',
      businessModel: 'E-commerce',
      isPopular: false,
      stages: [
        { name: 'Visitor', description: 'Website visitor', color: '#3B82F6', icon: 'eye', order: 1, isActive: true, isDefault: true, category: 'qualification', probability: 2, expectedDuration: 1, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Interest', description: 'Showed interest', color: '#F59E0B', icon: 'heart', order: 2, isActive: true, isDefault: false, category: 'qualification', probability: 15, expectedDuration: 2, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Cart', description: 'Added to cart', color: '#8B5CF6', icon: 'shopping-cart', order: 3, isActive: true, isDefault: false, category: 'nurturing', probability: 60, expectedDuration: 1, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Purchase', description: 'Completed purchase', color: '#059669', icon: 'credit-card', order: 4, isActive: true, isDefault: false, category: 'won', probability: 100, expectedDuration: 0, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } },
        { name: 'Abandoned', description: 'Abandoned process', color: '#6B7280', icon: 'x', order: 5, isActive: true, isDefault: false, category: 'lost', probability: 0, expectedDuration: 0, requiredActions: [], automationTriggers: [], notifications: { onEntry: false, onExit: false, onTimeout: false, recipients: [] }, transitions: { allowedNext: [], allowedPrevious: [] } }
      ]
    }
  ];

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'circle': return Circle;
      case 'checkCircle': return CheckCircle;
      case 'target': return Target;
      case 'fileText': return FileText;
      case 'users': return Users;
      case 'trophy': return Award;
      case 'x': return X;
      case 'star': return Star;
      case 'flag': return Flag;
      default: return Circle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'qualification': return 'bg-blue-100 text-blue-800';
      case 'nurturing': return 'bg-yellow-100 text-yellow-800';
      case 'proposal': return 'bg-purple-100 text-purple-800';
      case 'closing': return 'bg-orange-100 text-orange-800';
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedStages = [...leadStages].sort((a, b) => a.order - b.order);
  
  const filteredStages = sortedStages.filter(stage =>
    stage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moveStage = (stageId: string, direction: 'up' | 'down') => {
    console.log(`Moving stage ${stageId} ${direction}`);
  };

  const toggleStageStatus = (stageId: string) => {
    console.log(`Toggling status for stage: ${stageId}`);
  };

  const deleteStage = (stageId: string) => {
    console.log(`Deleting stage: ${stageId}`);
  };

  const duplicateStage = (stageId: string) => {
    console.log(`Duplicating stage: ${stageId}`);
  };

  const applyTemplate = (templateId: string) => {
    console.log(`Applying template: ${templateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Stages</h1>
          <p className="text-muted-foreground">Configure and manage your lead pipeline stages</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Stage
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="stages">Pipeline Stages</TabsTrigger>
          <TabsTrigger value="templates">Stage Templates</TabsTrigger>
          <TabsTrigger value="analytics">Stage Analytics</TabsTrigger>
          <TabsTrigger value="settings">Stage Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="stages" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stages List */}
          <div className="space-y-4">
            {filteredStages.map((stage, index) => {
              const StageIcon = getStageIcon(stage.icon);
              
              return (
                <Card key={stage.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex flex-col items-center gap-2">
                          <div 
                            className="p-3 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: stage.color + '20' }}
                          >
                            <StageIcon 
                              className="h-6 w-6"
                              style={{ color: stage.color }}
                            />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            #{stage.order}
                          </Badge>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{stage.name}</h3>
                            {stage.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                            <Badge className={getCategoryColor(stage.category)}>
                              {stage.category}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={stage.isActive ? 'text-green-600 border-green-200' : 'text-gray-600 border-gray-200'}
                            >
                              {stage.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{stage.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Probability</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 transition-all"
                                    style={{ width: `${stage.probability}%` }}
                                  />
                                </div>
                                <span className="font-medium">{stage.probability}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-medium">{stage.expectedDuration} days</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Total Leads</p>
                              <p className="font-medium">{stage.metrics.totalLeads.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Conversion</p>
                              <p className="font-medium">{stage.metrics.conversionRate}%</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Actions: {stage.requiredActions.length}</span>
                            <span>Triggers: {stage.automationTriggers.length}</span>
                            <span>Avg Stay: {stage.metrics.averageStayTime} days</span>
                            <span>This Month: {stage.metrics.leadsThisMonth}</span>
                          </div>
                          
                          {stage.requiredActions.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Required Actions:</p>
                              <div className="flex flex-wrap gap-1">
                                {stage.requiredActions.slice(0, 3).map(action => (
                                  <Badge key={action} variant="outline" className="text-xs">
                                    {action}
                                  </Badge>
                                ))}
                                {stage.requiredActions.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{stage.requiredActions.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveStage(stage.id, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => moveStage(stage.id, 'down')}
                            disabled={index === filteredStages.length - 1}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingStage(stage)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => duplicateStage(stage.id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleStageStatus(stage.id)}
                            className={stage.isActive ? '' : 'opacity-50'}
                          >
                            {stage.isActive ? <PauseCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteStage(stage.id)}
                            disabled={stage.isDefault}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stage Templates</CardTitle>
              <CardDescription>Pre-configured stage setups for different industries and business models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stageTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{template.name}</h3>
                              {template.isPopular && (
                                <Badge variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Industry: </span>
                            <span>{template.industry}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Model: </span>
                            <span>{template.businessModel}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Stages: </span>
                            <span>{template.stages.length}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Stage Preview:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.stages.slice(0, 4).map((stage, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-xs">
                                <div 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ backgroundColor: stage.color }}
                                />
                                <span>{stage.name}</span>
                              </div>
                            ))}
                            {template.stages.length > 4 && (
                              <span className="text-xs text-muted-foreground">+{template.stages.length - 4} more</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => applyTemplate(template.id)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Apply Template
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-3xl font-bold">2,961</p>
                    <p className="text-sm text-green-600">+12.5% from last month</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Conversion</p>
                    <p className="text-3xl font-bold">68.2%</p>
                    <p className="text-sm text-green-600">+3.1% from last month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Cycle Time</p>
                    <p className="text-3xl font-bold">18.4</p>
                    <p className="text-sm text-muted-foreground">days</p>
                  </div>
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Stages</p>
                    <p className="text-3xl font-bold">{leadStages.filter(s => s.isActive).length}</p>
                    <p className="text-sm text-muted-foreground">of {leadStages.length} total</p>
                  </div>
                  <Target className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stage Performance</CardTitle>
              <CardDescription>Current leads distribution across pipeline stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedStages.filter(s => s.isActive).map((stage) => {
                  const percentage = (stage.metrics.totalLeads / sortedStages.reduce((sum, s) => sum + s.metrics.totalLeads, 0)) * 100;
                  
                  return (
                    <div key={stage.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: stage.color }}
                          />
                          <span className="font-medium">{stage.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{stage.metrics.totalLeads} leads</span>
                          <span className="text-muted-foreground">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: stage.color 
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Settings</CardTitle>
                <CardDescription>Configure global pipeline behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Allow stage skipping</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require stage completion</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Auto-advance on timeout</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Track stage history</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Default stage timeout (days)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure stage transition notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email on stage entry</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Email on stage timeout</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Slack notifications</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Default notification recipients</Label>
                  <Input placeholder="sales@company.com, manager@company.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification template</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Template</SelectItem>
                      <SelectItem value="detailed">Detailed Template</SelectItem>
                      <SelectItem value="minimal">Minimal Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadStages;
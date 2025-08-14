'use client';

import { useState, useMemo } from 'react';
import { Clock, Calendar, User, Bell, CheckCircle, AlertCircle, XCircle, Plus, Edit, Trash2, Search, Filter, Download, Upload, Settings, Mail, Phone, MessageSquare, Video, FileText, Tag, Target, TrendingUp, BarChart3, Users, Building, MapPin, Star, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

interface FollowUp {
  id: string;
  leadId: string;
  leadName: string;
  leadCompany: string;
  leadEmail: string;
  leadPhone: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'demo' | 'proposal' | 'contract' | 'check-in';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled' | 'skipped';
  dueDate: string;
  scheduledDate?: string;
  completedDate?: string;
  assignedTo: string;
  assignedBy: string;
  source: 'manual' | 'automation' | 'template' | 'meeting' | 'email' | 'campaign';
  tags: string[];
  context: {
    previousInteraction?: string;
    leadScore: number;
    leadStage: string;
    dealValue?: number;
    probability?: number;
  };
  automation: {
    isAutomated: boolean;
    sequence?: string;
    step?: number;
    nextAction?: string;
    conditions?: string[];
  };
  reminder: {
    enabled: boolean;
    method: 'email' | 'sms' | 'push' | 'all';
    time: number; // minutes before due date
    sent: boolean;
  };
  outcome?: {
    result: 'successful' | 'unsuccessful' | 'reschedule' | 'no-response';
    notes: string;
    nextFollowUp?: string;
    leadProgression?: 'advanced' | 'maintained' | 'declined';
    conversionProbability?: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface FollowUpSequence {
  id: string;
  name: string;
  description: string;
  trigger: 'lead-created' | 'meeting-completed' | 'email-opened' | 'no-response' | 'manual';
  isActive: boolean;
  steps: {
    id: string;
    order: number;
    type: 'call' | 'email' | 'meeting' | 'task';
    title: string;
    description: string;
    delay: number; // hours
    conditions?: string[];
    template?: string;
  }[];
  performance: {
    totalExecutions: number;
    completionRate: number;
    conversionRate: number;
    avgResponseTime: number;
  };
}

interface FollowUpTemplate {
  id: string;
  name: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedDuration: number; // minutes
  tags: string[];
  isActive: boolean;
  usageCount: number;
}

const mockFollowUps: FollowUp[] = [
  {
    id: '1',
    leadId: 'lead-1',
    leadName: 'John Smith',
    leadCompany: 'Acme Corp',
    leadEmail: 'john@acme.com',
    leadPhone: '+1234567890',
    title: 'Follow-up on product demo',
    description: 'Reach out to discuss demo feedback and next steps for implementation',
    type: 'call',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-03-21T10:00:00Z',
    assignedTo: 'sarah@company.com',
    assignedBy: 'manager@company.com',
    source: 'meeting',
    tags: ['demo', 'implementation', 'enterprise'],
    context: {
      previousInteraction: 'Product demo completed on 2024-03-20',
      leadScore: 85,
      leadStage: 'qualified',
      dealValue: 50000,
      probability: 75
    },
    automation: {
      isAutomated: true,
      sequence: 'post-demo-sequence',
      step: 1,
      nextAction: 'Send pricing proposal',
      conditions: ['demo-completed', 'positive-feedback']
    },
    reminder: {
      enabled: true,
      method: 'email',
      time: 30,
      sent: false
    },
    createdAt: '2024-03-20T15:30:00Z',
    updatedAt: '2024-03-20T15:30:00Z'
  },
  {
    id: '2',
    leadId: 'lead-2',
    leadName: 'Mike Wilson',
    leadCompany: 'TechStart Inc',
    leadEmail: 'mike@techstart.com',
    leadPhone: '+1234567891',
    title: 'Send proposal and pricing',
    description: 'Prepare and send detailed proposal with custom pricing based on requirements',
    type: 'email',
    priority: 'urgent',
    status: 'overdue',
    dueDate: '2024-03-19T14:00:00Z',
    assignedTo: 'alex@company.com',
    assignedBy: 'sarah@company.com',
    source: 'automation',
    tags: ['proposal', 'pricing', 'urgent'],
    context: {
      previousInteraction: 'Requirements gathering call on 2024-03-18',
      leadScore: 90,
      leadStage: 'proposal',
      dealValue: 75000,
      probability: 80
    },
    automation: {
      isAutomated: true,
      sequence: 'proposal-sequence',
      step: 2,
      nextAction: 'Schedule negotiation call',
      conditions: ['requirements-gathered', 'budget-confirmed']
    },
    reminder: {
      enabled: true,
      method: 'all',
      time: 60,
      sent: true
    },
    createdAt: '2024-03-18T16:00:00Z',
    updatedAt: '2024-03-19T10:00:00Z'
  },
  {
    id: '3',
    leadId: 'lead-3',
    leadName: 'Sarah Davis',
    leadCompany: 'Digital Solutions',
    leadEmail: 'sarah@digital.com',
    leadPhone: '+1234567892',
    title: 'Check-in call after trial period',
    description: 'Follow up on trial experience and discuss conversion to paid plan',
    type: 'call',
    priority: 'medium',
    status: 'completed',
    dueDate: '2024-03-18T11:00:00Z',
    completedDate: '2024-03-18T10:45:00Z',
    assignedTo: 'lisa@company.com',
    assignedBy: 'system',
    source: 'automation',
    tags: ['trial', 'conversion', 'check-in'],
    context: {
      previousInteraction: 'Started 14-day trial on 2024-03-04',
      leadScore: 72,
      leadStage: 'trial',
      dealValue: 25000,
      probability: 60
    },
    automation: {
      isAutomated: true,
      sequence: 'trial-follow-up',
      step: 3,
      nextAction: 'Send contract and onboarding materials',
      conditions: ['trial-active', 'usage-threshold-met']
    },
    reminder: {
      enabled: true,
      method: 'email',
      time: 15,
      sent: true
    },
    outcome: {
      result: 'successful',
      notes: 'Very positive feedback on trial. Ready to move forward with annual subscription.',
      nextFollowUp: 'Send contract and schedule onboarding call',
      leadProgression: 'advanced',
      conversionProbability: 90
    },
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z'
  }
];

const mockSequences: FollowUpSequence[] = [
  {
    id: '1',
    name: 'Post-Demo Follow-up Sequence',
    description: 'Automated sequence after product demo completion',
    trigger: 'meeting-completed',
    isActive: true,
    steps: [
      {
        id: '1',
        order: 1,
        type: 'call',
        title: 'Demo feedback call',
        description: 'Gather feedback and discuss next steps',
        delay: 24,
        conditions: ['demo-completed']
      },
      {
        id: '2',
        order: 2,
        type: 'email',
        title: 'Send proposal',
        description: 'Prepare and send detailed proposal',
        delay: 72,
        conditions: ['positive-feedback'],
        template: 'proposal-template-1'
      },
      {
        id: '3',
        order: 3,
        type: 'call',
        title: 'Proposal discussion',
        description: 'Review proposal and handle objections',
        delay: 120,
        conditions: ['proposal-sent']
      }
    ],
    performance: {
      totalExecutions: 156,
      completionRate: 78,
      conversionRate: 45,
      avgResponseTime: 2.5
    }
  },
  {
    id: '2',
    name: 'Trial Follow-up Sequence',
    description: 'Follow-up sequence for trial users',
    trigger: 'lead-created',
    isActive: true,
    steps: [
      {
        id: '1',
        order: 1,
        type: 'email',
        title: 'Welcome and setup',
        description: 'Send welcome email with setup instructions',
        delay: 1,
        template: 'trial-welcome'
      },
      {
        id: '2',
        order: 2,
        type: 'call',
        title: 'Onboarding call',
        description: 'Schedule call to help with setup',
        delay: 48,
        conditions: ['trial-started']
      },
      {
        id: '3',
        order: 3,
        type: 'call',
        title: 'Mid-trial check-in',
        description: 'Check progress and provide assistance',
        delay: 168,
        conditions: ['trial-active']
      }
    ],
    performance: {
      totalExecutions: 234,
      completionRate: 85,
      conversionRate: 32,
      avgResponseTime: 1.8
    }
  }
];

const mockTemplates: FollowUpTemplate[] = [
  {
    id: '1',
    name: 'Demo Follow-up Call',
    type: 'call',
    title: 'Follow-up on product demo',
    description: 'Discuss demo feedback, answer questions, and plan next steps',
    priority: 'high',
    estimatedDuration: 30,
    tags: ['demo', 'follow-up', 'discovery'],
    isActive: true,
    usageCount: 89
  },
  {
    id: '2',
    name: 'Proposal Follow-up Email',
    type: 'email',
    title: 'Following up on our proposal',
    description: 'Check if they have reviewed the proposal and schedule discussion',
    priority: 'medium',
    estimatedDuration: 15,
    tags: ['proposal', 'email', 'follow-up'],
    isActive: true,
    usageCount: 156
  }
];

const typeColors = {
  call: 'bg-blue-100 text-blue-800 border-blue-200',
  email: 'bg-green-100 text-green-800 border-green-200',
  meeting: 'bg-purple-100 text-purple-800 border-purple-200',
  task: 'bg-orange-100 text-orange-800 border-orange-200',
  demo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  proposal: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  contract: 'bg-red-100 text-red-800 border-red-200',
  'check-in': 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  overdue: 'bg-red-100 text-red-800 border-red-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  skipped: 'bg-purple-100 text-purple-800 border-purple-200'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  urgent: 'bg-red-100 text-red-800 border-red-200'
};

export default function FollowUpManager() {
  const [selectedTab, setSelectedTab] = useState('follow-ups');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSequenceDialogOpen, setIsSequenceDialogOpen] = useState(false);
  const [expandedSequences, setExpandedSequences] = useState<Set<string>>(new Set());

  const filteredFollowUps = useMemo(() => {
    return mockFollowUps.filter(followUp => {
      const matchesSearch = followUp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           followUp.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           followUp.leadCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || followUp.status === statusFilter;
      const matchesType = typeFilter === 'all' || followUp.type === typeFilter;
      const matchesPriority = priorityFilter === 'all' || followUp.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'all' || followUp.assignedTo === assigneeFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesAssignee;
    });
  }, [searchQuery, statusFilter, typeFilter, priorityFilter, assigneeFilter]);

  const followUpStats = useMemo(() => {
    const total = mockFollowUps.length;
    const pending = mockFollowUps.filter(f => f.status === 'pending').length;
    const overdue = mockFollowUps.filter(f => f.status === 'overdue').length;
    const completed = mockFollowUps.filter(f => f.status === 'completed').length;
    const inProgress = mockFollowUps.filter(f => f.status === 'in-progress').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    const overdueRate = total > 0 ? (overdue / total) * 100 : 0;
    
    const avgLeadScore = mockFollowUps.reduce((sum, f) => sum + f.context.leadScore, 0) / total;
    const totalDealValue = mockFollowUps.reduce((sum, f) => sum + (f.context.dealValue || 0), 0);
    
    return { total, pending, overdue, completed, inProgress, completionRate, overdueRate, avgLeadScore, totalDealValue };
  }, []);

  const toggleSequenceExpansion = (sequenceId: string) => {
    const newExpanded = new Set(expandedSequences);
    if (newExpanded.has(sequenceId)) {
      newExpanded.delete(sequenceId);
    } else {
      newExpanded.add(sequenceId);
    }
    setExpandedSequences(newExpanded);
  };

  const FollowUpCard = ({ followUp }: { followUp: FollowUp }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedFollowUp(followUp)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{followUp.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Building className="h-4 w-4" />
              <span>{followUp.leadCompany}</span>
              <User className="h-4 w-4 ml-2" />
              <span>{followUp.leadName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Due: {new Date(followUp.dueDate).toLocaleString()}</span>
              {followUp.context.dealValue && (
                <>
                  <Target className="h-4 w-4 ml-2" />
                  <span>${followUp.context.dealValue.toLocaleString()}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={statusColors[followUp.status]}>{followUp.status}</Badge>
            <Badge className={priorityColors[followUp.priority]}>{followUp.priority}</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <Badge className={typeColors[followUp.type]}>{followUp.type}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-4 w-4" />
            <span>Score: {followUp.context.leadScore}/100</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>{followUp.context.probability || 0}% probability</span>
          </div>
        </div>
        
        {followUp.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{followUp.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Assigned to {followUp.assignedTo}</span>
            {followUp.automation.isAutomated && (
              <Badge variant="outline" className="text-xs">Automated</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {followUp.reminder.enabled && <Bell className="h-4 w-4 text-blue-600" />}
            {followUp.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SequenceCard = ({ sequence }: { sequence: FollowUpSequence }) => {
    const isExpanded = expandedSequences.has(sequence.id);
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSequenceExpansion(sequence.id)}
                  className="p-0 h-6 w-6"
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                <h3 className="font-semibold text-lg">{sequence.name}</h3>
                <Switch checked={sequence.isActive} />
              </div>
              <p className="text-sm text-gray-600 mb-2">{sequence.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Trigger: {sequence.trigger}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>{sequence.steps.length} steps</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{sequence.performance.conversionRate}% conversion</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{sequence.performance.totalExecutions}</div>
              <div className="text-sm text-gray-600">Executions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{sequence.performance.completionRate}%</div>
              <div className="text-sm text-gray-600">Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{sequence.performance.conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{sequence.performance.avgResponseTime}d</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
          </div>
          
          {isExpanded && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Sequence Steps</h4>
              <div className="space-y-3">
                {sequence.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.order}
                      </div>
                      <Badge className={typeColors[step.type]}>{step.type}</Badge>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      After {step.delay}h
                    </div>
                    {index < sequence.steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Follow-ups</p>
                <p className="text-2xl font-bold text-gray-900">{followUpStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">{followUpStats.overdue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{followUpStats.completionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Lead Score</p>
                <p className="text-2xl font-bold text-gray-900">{followUpStats.avgLeadScore.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Follow-up Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                mockFollowUps.reduce((acc, followUp) => {
                  acc[followUp.type] = (acc[followUp.type] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={typeColors[type as keyof typeof typeColors]}>
                      {type}
                    </Badge>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Deal Value Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Pipeline Value</span>
                <span className="text-2xl font-bold text-green-600">
                  ${followUpStats.totalDealValue.toLocaleString()}
                </span>
              </div>
              <Progress value={followUpStats.completionRate} className="h-3" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Completed: </span>
                  <span className="font-medium">{followUpStats.completed}</span>
                </div>
                <div>
                  <span className="text-gray-600">In Progress: </span>
                  <span className="font-medium">{followUpStats.inProgress}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CreateFollowUpDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Follow-up Task</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title</Label>
              <Input id="title" placeholder="Enter follow-up title" />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} placeholder="Describe the follow-up task" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
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
                    <SelectItem value="proposal">Proposal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
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
            
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="datetime-local" />
            </div>
            
            <div>
              <Label htmlFor="assignee">Assign To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah@company.com">Sarah Johnson</SelectItem>
                  <SelectItem value="alex@company.com">Alex Brown</SelectItem>
                  <SelectItem value="lisa@company.com">Lisa Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="lead">Select Lead</Label>
              <div className="space-y-2">
                <Input placeholder="Search leads..." />
                <div className="border rounded-lg p-3 bg-gray-50">
                  <p className="font-medium">John Smith - Acme Corp</p>
                  <p className="text-sm text-gray-600">john@acme.com • Score: 85/100</p>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Enter tags (comma separated)" />
            </div>
            
            <div className="space-y-3">
              <Label>Automation Settings</Label>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="automated" />
                <Label htmlFor="automated">Add to automation sequence</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="reminder" defaultChecked />
                <Label htmlFor="reminder">Enable reminders</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="followup" />
                <Label htmlFor="followup">Auto-create next follow-up</Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="template">Use Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo-followup">Demo Follow-up Call</SelectItem>
                  <SelectItem value="proposal-followup">Proposal Follow-up Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Create Follow-up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Follow-up Manager</h1>
              <p className="text-gray-600">Manage and automate lead follow-ups</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Follow-up
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
            <TabsTrigger value="sequences">Sequences</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="follow-ups" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search follow-ups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {filteredFollowUps.length} results
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredFollowUps.map(followUp => (
                <FollowUpCard key={followUp.id} followUp={followUp} />
              ))}
              {filteredFollowUps.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No follow-ups found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sequences" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Automation Sequences</h3>
              <Button onClick={() => setIsSequenceDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Sequence
              </Button>
            </div>
            
            <div className="grid gap-6">
              {mockSequences.map(sequence => (
                <SequenceCard key={sequence.id} sequence={sequence} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Follow-up Templates</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
            
            <div className="grid gap-4">
              {mockTemplates.map(template => (
                <Card key={template.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge className={typeColors[template.type]}>{template.type}</Badge>
                          <Badge className={priorityColors[template.priority]}>{template.priority}</Badge>
                          <span>{template.estimatedDuration} min</span>
                          <span>Used {template.usageCount} times</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={template.isActive} />
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsView />
          </TabsContent>
        </Tabs>
      </div>

      <CreateFollowUpDialog />

      {selectedFollowUp && (
        <Dialog open={!!selectedFollowUp} onOpenChange={() => setSelectedFollowUp(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedFollowUp.title}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Lead Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedFollowUp.leadName}</p>
                    <p className="text-sm text-gray-600">{selectedFollowUp.leadCompany}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <Mail className="h-4 w-4" />
                      <span>{selectedFollowUp.leadEmail}</span>
                      <Phone className="h-4 w-4 ml-2" />
                      <span>{selectedFollowUp.leadPhone}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Task Details</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={typeColors[selectedFollowUp.type]}>{selectedFollowUp.type}</Badge>
                      <Badge className={statusColors[selectedFollowUp.status]}>{selectedFollowUp.status}</Badge>
                      <Badge className={priorityColors[selectedFollowUp.priority]}>{selectedFollowUp.priority}</Badge>
                    </div>
                    <div className="text-sm">
                      <p><strong>Due:</strong> {new Date(selectedFollowUp.dueDate).toLocaleString()}</p>
                      <p><strong>Assigned to:</strong> {selectedFollowUp.assignedTo}</p>
                      <p><strong>Source:</strong> {selectedFollowUp.source}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Lead Context</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Lead Score:</strong> {selectedFollowUp.context.leadScore}/100</p>
                        <p><strong>Stage:</strong> {selectedFollowUp.context.leadStage}</p>
                      </div>
                      <div>
                        {selectedFollowUp.context.dealValue && (
                          <p><strong>Deal Value:</strong> ${selectedFollowUp.context.dealValue.toLocaleString()}</p>
                        )}
                        {selectedFollowUp.context.probability && (
                          <p><strong>Probability:</strong> {selectedFollowUp.context.probability}%</p>
                        )}
                      </div>
                    </div>
                    {selectedFollowUp.context.previousInteraction && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm"><strong>Previous Interaction:</strong></p>
                        <p className="text-sm text-gray-600">{selectedFollowUp.context.previousInteraction}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm">{selectedFollowUp.description}</p>
                  </div>
                </div>
                
                {selectedFollowUp.automation.isAutomated && (
                  <div>
                    <Label>Automation Details</Label>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Automated</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><strong>Sequence:</strong> {selectedFollowUp.automation.sequence}</p>
                        <p><strong>Step:</strong> {selectedFollowUp.automation.step}</p>
                        {selectedFollowUp.automation.nextAction && (
                          <p><strong>Next Action:</strong> {selectedFollowUp.automation.nextAction}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedFollowUp.outcome && (
                  <div>
                    <Label>Outcome</Label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {selectedFollowUp.outcome.result === 'successful' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {selectedFollowUp.outcome.result === 'unsuccessful' && <XCircle className="h-4 w-4 text-red-600" />}
                        {selectedFollowUp.outcome.result === 'reschedule' && <Clock className="h-4 w-4 text-yellow-600" />}
                        <span className="capitalize font-medium">{selectedFollowUp.outcome.result}</span>
                      </div>
                      <p className="text-sm mb-2">{selectedFollowUp.outcome.notes}</p>
                      {selectedFollowUp.outcome.nextFollowUp && (
                        <p className="text-sm"><strong>Next:</strong> {selectedFollowUp.outcome.nextFollowUp}</p>
                      )}
                      {selectedFollowUp.outcome.conversionProbability && (
                        <p className="text-sm"><strong>New Probability:</strong> {selectedFollowUp.outcome.conversionProbability}%</p>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedFollowUp.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Follow-up
              </Button>
              {selectedFollowUp.status === 'pending' && (
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
'use client';

import { useState, useMemo } from 'react';
import { Users, Edit, Trash2, Mail, MessageSquare, Phone, Tag, FileText, Download, Upload, Settings, Plus, Play, Pause, CheckCircle, XCircle, AlertCircle, Clock, Filter, Search, BarChart3, TrendingUp, Target, Zap, RefreshCw, ArrowRight, User, Building, MapPin, Star } from 'lucide-react';
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

interface BulkOperation {
  id: string;
  name: string;
  description: string;
  type: 'update' | 'delete' | 'export' | 'import' | 'assign' | 'communicate' | 'tag' | 'score' | 'status';
  status: 'draft' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetCriteria: {
    leadScore?: { min: number; max: number };
    industry?: string[];
    location?: string[];
    leadSource?: string[];
    leadStatus?: string[];
    lastActivity?: string;
    customFilters?: { field: string; operator: string; value: string }[];
  };
  operation: {
    action: string;
    parameters: { [key: string]: any };
    template?: string;
    schedule?: {
      type: 'immediate' | 'scheduled' | 'recurring';
      startTime?: string;
      endTime?: string;
      frequency?: string;
      interval?: number;
    };
  };
  progress: {
    totalLeads: number;
    processedLeads: number;
    successfulOperations: number;
    failedOperations: number;
    skippedOperations: number;
    startedAt?: string;
    completedAt?: string;
    estimatedTimeRemaining?: number;
  };
  validation: {
    isValid: boolean;
    warnings: string[];
    errors: string[];
    affectedLeads: number;
    estimatedCost?: number;
    estimatedDuration?: number;
  };
  results?: {
    summary: string;
    successRate: number;
    details: {
      leadId: string;
      leadName: string;
      status: 'success' | 'failed' | 'skipped';
      message?: string;
      before?: { [key: string]: any };
      after?: { [key: string]: any };
    }[];
    metrics: {
      avgProcessingTime: number;
      throughput: number;
      errorRate: number;
    };
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface BulkTemplate {
  id: string;
  name: string;
  category: 'communication' | 'data-management' | 'lead-nurturing' | 'scoring' | 'assignment';
  description: string;
  operationType: 'update' | 'delete' | 'export' | 'import' | 'assign' | 'communicate' | 'tag' | 'score' | 'status';
  defaultCriteria: {
    leadScore?: { min: number; max: number };
    industry?: string[];
    leadStatus?: string[];
  };
  parameters: { [key: string]: any };
  estimatedDuration: number;
  successRate: number;
  isActive: boolean;
  usageCount: number;
  lastUsed?: string;
}

interface LeadSelection {
  criteria: {
    leadScore?: { min: number; max: number };
    industry?: string[];
    location?: string[];
    leadSource?: string[];
    leadStatus?: string[];
    lastActivity?: string;
    tags?: string[];
  };
  selectedLeads: string[];
  totalMatched: number;
  previewLeads: {
    id: string;
    name: string;
    email: string;
    company: string;
    score: number;
    status: string;
    lastActivity: string;
  }[];
}

const mockBulkOperations: BulkOperation[] = [
  {
    id: '1',
    name: 'Weekly Newsletter Campaign',
    description: 'Send weekly newsletter to all qualified leads in technology sector',
    type: 'communicate',
    status: 'completed',
    priority: 'medium',
    targetCriteria: {
      leadScore: { min: 50, max: 100 },
      industry: ['Technology', 'Software'],
      leadStatus: ['qualified', 'nurturing'],
      lastActivity: 'within-30-days'
    },
    operation: {
      action: 'send-email',
      parameters: {
        template: 'weekly-newsletter-tech',
        subject: 'Weekly Tech Insights - {{company_name}}',
        personalizations: ['first_name', 'company_name', 'industry'],
        trackOpens: true,
        trackClicks: true
      },
      schedule: {
        type: 'scheduled',
        startTime: '2024-03-20T09:00:00Z'
      }
    },
    progress: {
      totalLeads: 1250,
      processedLeads: 1250,
      successfulOperations: 1198,
      failedOperations: 32,
      skippedOperations: 20,
      startedAt: '2024-03-20T09:00:00Z',
      completedAt: '2024-03-20T09:45:00Z'
    },
    validation: {
      isValid: true,
      warnings: ['32 leads have invalid email addresses'],
      errors: [],
      affectedLeads: 1250,
      estimatedCost: 62.50,
      estimatedDuration: 45
    },
    results: {
      summary: 'Newsletter sent successfully to 1,198 leads with 95.8% success rate',
      successRate: 95.8,
      details: [],
      metrics: {
        avgProcessingTime: 2.1,
        throughput: 27.8,
        errorRate: 4.2
      }
    },
    createdBy: 'marketing@company.com',
    createdAt: '2024-03-19T14:30:00Z',
    updatedAt: '2024-03-20T09:45:00Z'
  },
  {
    id: '2',
    name: 'Lead Score Update - Q1 Review',
    description: 'Update lead scores based on Q1 activity and engagement metrics',
    type: 'score',
    status: 'running',
    priority: 'high',
    targetCriteria: {
      lastActivity: 'within-90-days',
      customFilters: [
        { field: 'email_opens', operator: '>', value: '5' },
        { field: 'page_views', operator: '>', value: '10' }
      ]
    },
    operation: {
      action: 'recalculate-score',
      parameters: {
        scoringModel: 'q1-2024-model',
        includeEngagement: true,
        includeFirmographic: true,
        includeBehavioral: true,
        decayFactor: 0.1
      }
    },
    progress: {
      totalLeads: 3420,
      processedLeads: 2156,
      successfulOperations: 2089,
      failedOperations: 45,
      skippedOperations: 22,
      startedAt: '2024-03-20T10:15:00Z',
      estimatedTimeRemaining: 25
    },
    validation: {
      isValid: true,
      warnings: ['Score changes may affect existing automation rules'],
      errors: [],
      affectedLeads: 3420,
      estimatedDuration: 65
    },
    createdBy: 'ops@company.com',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T15:30:00Z'
  },
  {
    id: '3',
    name: 'Inactive Lead Cleanup',
    description: 'Archive leads with no activity in the last 6 months',
    type: 'update',
    status: 'draft',
    priority: 'low',
    targetCriteria: {
      lastActivity: 'older-than-180-days',
      leadStatus: ['cold', 'unresponsive']
    },
    operation: {
      action: 'update-status',
      parameters: {
        newStatus: 'archived',
        reason: 'Inactive for 6+ months',
        preserveData: true,
        notifyAssignee: false
      }
    },
    progress: {
      totalLeads: 0,
      processedLeads: 0,
      successfulOperations: 0,
      failedOperations: 0,
      skippedOperations: 0
    },
    validation: {
      isValid: true,
      warnings: [],
      errors: [],
      affectedLeads: 456,
      estimatedDuration: 15
    },
    createdBy: 'admin@company.com',
    createdAt: '2024-03-20T16:00:00Z',
    updatedAt: '2024-03-20T16:00:00Z'
  }
];

const mockBulkTemplates: BulkTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email Series',
    category: 'communication',
    description: 'Send welcome email series to new leads',
    operationType: 'communicate',
    defaultCriteria: {
      leadStatus: ['new', 'uncontacted']
    },
    parameters: {
      emailTemplate: 'welcome-series-1',
      delay: 0,
      trackEngagement: true
    },
    estimatedDuration: 20,
    successRate: 94,
    isActive: true,
    usageCount: 89,
    lastUsed: '2024-03-18T14:20:00Z'
  },
  {
    id: '2',
    name: 'Lead Score Recalculation',
    category: 'scoring',
    description: 'Recalculate lead scores using latest model',
    operationType: 'score',
    defaultCriteria: {
      leadScore: { min: 0, max: 100 }
    },
    parameters: {
      scoringModel: 'standard',
      includeEngagement: true,
      includeFirmographic: true
    },
    estimatedDuration: 45,
    successRate: 98,
    isActive: true,
    usageCount: 156,
    lastUsed: '2024-03-19T10:15:00Z'
  },
  {
    id: '3',
    name: 'Territory Assignment',
    category: 'assignment',
    description: 'Assign leads to sales reps based on territory',
    operationType: 'assign',
    defaultCriteria: {
      leadStatus: ['qualified', 'hot']
    },
    parameters: {
      assignmentRule: 'territory-based',
      notifyAssignee: true,
      createTask: true
    },
    estimatedDuration: 30,
    successRate: 91,
    isActive: true,
    usageCount: 67,
    lastUsed: '2024-03-17T16:45:00Z'
  }
];

const mockLeadSelection: LeadSelection = {
  criteria: {
    leadScore: { min: 70, max: 100 },
    industry: ['Technology'],
    leadStatus: ['qualified']
  },
  selectedLeads: [],
  totalMatched: 234,
  previewLeads: [
    {
      id: 'lead-1',
      name: 'John Smith',
      email: 'john@acme.com',
      company: 'Acme Corp',
      score: 85,
      status: 'qualified',
      lastActivity: '2024-03-19T14:30:00Z'
    },
    {
      id: 'lead-2',
      name: 'Sarah Davis',
      email: 'sarah@techstart.com',
      company: 'TechStart Inc',
      score: 92,
      status: 'qualified',
      lastActivity: '2024-03-20T10:15:00Z'
    },
    {
      id: 'lead-3',
      name: 'Mike Wilson',
      email: 'mike@innovation.com',
      company: 'Innovation Labs',
      score: 78,
      status: 'qualified',
      lastActivity: '2024-03-18T16:45:00Z'
    }
  ]
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  queued: 'bg-blue-100 text-blue-800 border-blue-200',
  running: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
  paused: 'bg-orange-100 text-orange-800 border-orange-200'
};

const typeColors = {
  update: 'bg-blue-100 text-blue-800 border-blue-200',
  delete: 'bg-red-100 text-red-800 border-red-200',
  export: 'bg-green-100 text-green-800 border-green-200',
  import: 'bg-purple-100 text-purple-800 border-purple-200',
  assign: 'bg-orange-100 text-orange-800 border-orange-200',
  communicate: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  tag: 'bg-pink-100 text-pink-800 border-pink-200',
  score: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  status: 'bg-teal-100 text-teal-800 border-teal-200'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  urgent: 'bg-red-100 text-red-800 border-red-200'
};

const categoryColors = {
  communication: 'bg-blue-100 text-blue-800 border-blue-200',
  'data-management': 'bg-green-100 text-green-800 border-green-200',
  'lead-nurturing': 'bg-purple-100 text-purple-800 border-purple-200',
  scoring: 'bg-orange-100 text-orange-800 border-orange-200',
  assignment: 'bg-indigo-100 text-indigo-800 border-indigo-200'
};

export default function BulkOperations() {
  const [selectedTab, setSelectedTab] = useState('operations');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedOperation, setSelectedOperation] = useState<BulkOperation | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<BulkTemplate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const filteredOperations = useMemo(() => {
    return mockBulkOperations.filter(operation => {
      const matchesSearch = operation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           operation.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || operation.status === statusFilter;
      const matchesType = typeFilter === 'all' || operation.type === typeFilter;
      const matchesPriority = priorityFilter === 'all' || operation.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [searchQuery, statusFilter, typeFilter, priorityFilter]);

  const operationStats = useMemo(() => {
    const total = mockBulkOperations.length;
    const running = mockBulkOperations.filter(op => op.status === 'running').length;
    const completed = mockBulkOperations.filter(op => op.status === 'completed').length;
    const failed = mockBulkOperations.filter(op => op.status === 'failed').length;
    const totalProcessed = mockBulkOperations.reduce((sum, op) => sum + op.progress.processedLeads, 0);
    const totalSuccess = mockBulkOperations.reduce((sum, op) => sum + op.progress.successfulOperations, 0);
    const avgSuccessRate = totalProcessed > 0 ? (totalSuccess / totalProcessed) * 100 : 0;
    
    return { total, running, completed, failed, totalProcessed, totalSuccess, avgSuccessRate };
  }, []);

  const BulkOperationCard = ({ operation }: { operation: BulkOperation }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedOperation(operation)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{operation.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{operation.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Created: {new Date(operation.createdAt).toLocaleString()}</span>
              {operation.progress.completedAt && (
                <>
                  <span>•</span>
                  <span>Completed: {new Date(operation.progress.completedAt).toLocaleString()}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={statusColors[operation.status]}>{operation.status}</Badge>
            <Badge className={priorityColors[operation.priority]}>{operation.priority}</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Badge className={typeColors[operation.type]}>{operation.type}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{operation.progress.totalLeads.toLocaleString()} leads</span>
          </div>
          {operation.validation.estimatedCost && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Target className="h-4 w-4" />
              <span>${operation.validation.estimatedCost.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>
              {operation.progress.processedLeads.toLocaleString()} / {operation.progress.totalLeads.toLocaleString()}
            </span>
          </div>
          <Progress value={(operation.progress.processedLeads / operation.progress.totalLeads) * 100} className="h-2" />
          
          {operation.status === 'running' && operation.progress.estimatedTimeRemaining && (
            <div className="text-sm text-gray-600">
              Estimated time remaining: {operation.progress.estimatedTimeRemaining} minutes
            </div>
          )}
          
          {operation.results && (
            <div className="grid grid-cols-3 gap-4 pt-2 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{operation.progress.successfulOperations.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Success</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{operation.progress.failedOperations.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{operation.progress.skippedOperations.toLocaleString()}</div>
                <div className="text-xs text-gray-600">Skipped</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            by {operation.createdBy}
          </div>
          <div className="flex items-center gap-2">
            {operation.status === 'running' && (
              <Button variant="outline" size="sm">
                <Pause className="h-4 w-4" />
              </Button>
            )}
            {operation.status === 'paused' && (
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4" />
              </Button>
            )}
            {operation.status === 'completed' && operation.results && (
              <Badge variant="outline" className="text-xs">
                {operation.results.successRate.toFixed(1)}% success
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TemplateCard = ({ template }: { template: BulkTemplate }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedTemplate(template)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Badge className={categoryColors[template.category]}>{template.category}</Badge>
              <Badge className={typeColors[template.operationType]}>{template.operationType}</Badge>
              <span>Used {template.usageCount} times</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={template.isActive} />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{template.estimatedDuration}</div>
            <div className="text-xs text-gray-600">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{template.successRate}%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{template.usageCount}</div>
            <div className="text-xs text-gray-600">Uses</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {template.lastUsed && `Last used: ${new Date(template.lastUsed).toLocaleDateString()}`}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm">
              Use Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LeadSelectionStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Target Leads</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="leadScore">Lead Score Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Min score" type="number" />
                <Input placeholder="Max score" type="number" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="industry">Industries</Label>
              <Input placeholder="Select industries..." />
            </div>
            
            <div>
              <Label htmlFor="location">Locations</Label>
              <Input placeholder="Select locations..." />
            </div>
            
            <div>
              <Label htmlFor="leadSource">Lead Sources</Label>
              <Input placeholder="Select sources..." />
            </div>
            
            <div>
              <Label htmlFor="leadStatus">Lead Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="nurturing">Nurturing</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="lastActivity">Last Activity</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="older">Older</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Matching Leads</h4>
                <Badge variant="outline">{mockLeadSelection.totalMatched} leads</Badge>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockLeadSelection.previewLeads.map(lead => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div className="flex items-center gap-3">
                      <Checkbox />
                      <div>
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs text-gray-600">{lead.company}</p>
                        <p className="text-xs text-gray-600">{lead.email}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{lead.score}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{lead.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Preview All Matching Leads
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
          Previous
        </Button>
        <Button onClick={() => setCurrentStep(currentStep + 1)}>
          Next: Configure Operation
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const OperationConfigStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configure Operation</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="operationType">Operation Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="communicate">Send Communication</SelectItem>
                  <SelectItem value="update">Update Lead Data</SelectItem>
                  <SelectItem value="assign">Assign to User</SelectItem>
                  <SelectItem value="tag">Add/Remove Tags</SelectItem>
                  <SelectItem value="score">Update Score</SelectItem>
                  <SelectItem value="status">Change Status</SelectItem>
                  <SelectItem value="export">Export Data</SelectItem>
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
            
            <div>
              <Label htmlFor="template">Use Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Email Series</SelectItem>
                  <SelectItem value="newsletter">Weekly Newsletter</SelectItem>
                  <SelectItem value="followup">Follow-up Sequence</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="When to run" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Operation Parameters</Label>
              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div>
                  <Label htmlFor="emailSubject">Email Subject</Label>
                  <Input placeholder="Enter email subject" />
                </div>
                <div>
                  <Label htmlFor="emailTemplate">Email Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newsletter">Newsletter Template</SelectItem>
                      <SelectItem value="welcome">Welcome Template</SelectItem>
                      <SelectItem value="followup">Follow-up Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Personalization Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <Label>Include first name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <Label>Include company name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <Label>Include industry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox defaultChecked />
                      <Label>Track opens and clicks</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
          Previous
        </Button>
        <Button onClick={() => setCurrentStep(currentStep + 1)}>
          Next: Review & Validate
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const ValidationStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review & Validate</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Operation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Operation Type:</span>
                    <span className="font-medium">Send Communication</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Leads:</span>
                    <span className="font-medium">234 leads</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Duration:</span>
                    <span className="font-medium">15 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Cost:</span>
                    <span className="font-medium">$11.70</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Priority:</span>
                    <Badge className={priorityColors.medium}>Medium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Target Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Lead Score:</strong> 70 - 100</div>
                  <div><strong>Industry:</strong> Technology</div>
                  <div><strong>Status:</strong> Qualified</div>
                  <div><strong>Last Activity:</strong> Within 30 days</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Validation Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Operation is valid</div>
                      <div className="text-gray-600">All parameters are correctly configured</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Warning</div>
                      <div className="text-gray-600">12 leads have invalid email addresses</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Rate limits OK</div>
                      <div className="text-gray-600">Within API rate limits for selected time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview Sample</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm space-y-2">
                    <div><strong>Subject:</strong> Weekly Tech Insights - Acme Corp</div>
                    <div><strong>To:</strong> john@acme.com</div>
                    <div className="border-t pt-2">
                      <div>Hi John,</div>
                      <div className="mt-2">We hope this email finds you well at Acme Corp...</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
          Previous
        </Button>
        <Button onClick={() => setIsCreateDialogOpen(false)}>
          <Play className="h-4 w-4 mr-2" />
          Execute Operation
        </Button>
      </div>
    </div>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Operations</p>
                <p className="text-2xl font-bold text-gray-900">{operationStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Play className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Running</p>
                <p className="text-2xl font-bold text-gray-900">{operationStats.running}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{operationStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{operationStats.avgSuccessRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Operation Types Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                mockBulkOperations.reduce((acc, op) => {
                  if (!acc[op.type]) {
                    acc[op.type] = { count: 0, success: 0, total: 0 };
                  }
                  acc[op.type].count++;
                  acc[op.type].success += op.progress.successfulOperations;
                  acc[op.type].total += op.progress.processedLeads;
                  return acc;
                }, {} as Record<string, any>)
              ).map(([type, stats]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className={typeColors[type as keyof typeof typeColors]}>
                      {type}
                    </Badge>
                    <span className="text-sm">{stats.count} operations</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{stats.total.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(1) : 0}%</div>
                      <div className="text-xs text-gray-600">Success</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBulkOperations.slice(0, 5).map(operation => (
                <div key={operation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{operation.name}</p>
                    <p className="text-xs text-gray-600">
                      {operation.progress.processedLeads.toLocaleString()} / {operation.progress.totalLeads.toLocaleString()} leads
                    </p>
                  </div>
                  <Badge className={statusColors[operation.status]}>{operation.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CreateOperationDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Bulk Operation</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {currentStep === 1 && <LeadSelectionStep />}
          {currentStep === 2 && <OperationConfigStep />}
          {currentStep === 3 && <ValidationStep />}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bulk Operations</h1>
              <p className="text-gray-600">Mass lead management and operations</p>
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
            <Button onClick={() => {
              setCurrentStep(1);
              setIsCreateDialogOpen(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Operation
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="queue">Queue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search operations..."
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="queued">Queued</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="communicate">Communicate</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="assign">Assign</SelectItem>
                    <SelectItem value="score">Score</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
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
                  {filteredOperations.length} operations
                </Badge>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredOperations.map(operation => (
                <BulkOperationCard key={operation.id} operation={operation} />
              ))}
              {filteredOperations.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No operations found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Operation Templates</h3>
              <Button onClick={() => setIsTemplateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockBulkTemplates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="queue" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Operation Queue</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause All
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {mockBulkOperations
                .filter(op => ['queued', 'running', 'paused'].includes(op.status))
                .map(operation => (
                  <Card key={operation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{operation.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Badge className={typeColors[operation.type]}>{operation.type}</Badge>
                              <span>{operation.progress.totalLeads.toLocaleString()} leads</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {operation.progress.processedLeads.toLocaleString()} / {operation.progress.totalLeads.toLocaleString()}
                            </div>
                            <Progress 
                              value={(operation.progress.processedLeads / operation.progress.totalLeads) * 100} 
                              className="w-32 h-2" 
                            />
                          </div>
                          <Badge className={statusColors[operation.status]}>{operation.status}</Badge>
                          <div className="flex items-center gap-1">
                            {operation.status === 'running' && (
                              <Button variant="outline" size="sm">
                                <Pause className="h-4 w-4" />
                              </Button>
                            )}
                            {operation.status === 'paused' && (
                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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

      <CreateOperationDialog />

      {selectedOperation && (
        <Dialog open={!!selectedOperation} onOpenChange={() => setSelectedOperation(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedOperation.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Operation Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm mb-3">{selectedOperation.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Type:</strong> {selectedOperation.type}</p>
                        <p><strong>Status:</strong> {selectedOperation.status}</p>
                        <p><strong>Priority:</strong> {selectedOperation.priority}</p>
                      </div>
                      <div>
                        <p><strong>Created:</strong> {new Date(selectedOperation.createdAt).toLocaleString()}</p>
                        <p><strong>Created by:</strong> {selectedOperation.createdBy}</p>
                        {selectedOperation.validation.estimatedCost && (
                          <p><strong>Cost:</strong> ${selectedOperation.validation.estimatedCost.toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Progress</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>
                        {selectedOperation.progress.processedLeads.toLocaleString()} / {selectedOperation.progress.totalLeads.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(selectedOperation.progress.processedLeads / selectedOperation.progress.totalLeads) * 100} className="h-3" />
                    
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{selectedOperation.progress.successfulOperations.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{selectedOperation.progress.failedOperations.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Failed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{selectedOperation.progress.skippedOperations.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Skipped</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedOperation.results && (
                  <div>
                    <h4 className="font-medium mb-3">Results Summary</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm mb-3">{selectedOperation.results.summary}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Success Rate:</strong> {selectedOperation.results.successRate.toFixed(1)}%</p>
                          <p><strong>Processing Time:</strong> {selectedOperation.results.metrics.avgProcessingTime.toFixed(1)}s avg</p>
                        </div>
                        <div>
                          <p><strong>Throughput:</strong> {selectedOperation.results.metrics.throughput.toFixed(1)}/min</p>
                          <p><strong>Error Rate:</strong> {selectedOperation.results.metrics.errorRate.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Target Criteria</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      {selectedOperation.targetCriteria.leadScore && (
                        <div><strong>Lead Score:</strong> {selectedOperation.targetCriteria.leadScore.min} - {selectedOperation.targetCriteria.leadScore.max}</div>
                      )}
                      {selectedOperation.targetCriteria.industry && (
                        <div><strong>Industry:</strong> {selectedOperation.targetCriteria.industry.join(', ')}</div>
                      )}
                      {selectedOperation.targetCriteria.leadStatus && (
                        <div><strong>Status:</strong> {selectedOperation.targetCriteria.leadStatus.join(', ')}</div>
                      )}
                      {selectedOperation.targetCriteria.lastActivity && (
                        <div><strong>Last Activity:</strong> {selectedOperation.targetCriteria.lastActivity}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Operation Parameters</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>Action:</strong> {selectedOperation.operation.action}</div>
                      {selectedOperation.operation.template && (
                        <div><strong>Template:</strong> {selectedOperation.operation.template}</div>
                      )}
                      {Object.entries(selectedOperation.operation.parameters).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {
                            typeof value === 'object' ? JSON.stringify(value) : String(value)
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {selectedOperation.validation.warnings.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">Warnings</h4>
                    <div className="space-y-2">
                      {selectedOperation.validation.warnings.map((warning, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <span className="text-sm">{warning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
              {selectedOperation.status === 'running' && (
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Operation
                </Button>
              )}
              {selectedOperation.status === 'paused' && (
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Resume Operation
                </Button>
              )}
              {selectedOperation.status === 'completed' && (
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Again
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
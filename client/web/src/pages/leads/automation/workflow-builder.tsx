'use client';

import { useState, useMemo, useCallback } from 'react';
import { GitBranch, Zap, Play, Pause, Stop, Plus, Save, Copy, Edit, Trash2, Settings, Eye, Download, Upload, RefreshCw, Filter, Calendar, Mail, Phone, MessageSquare, Target, Users, Building, Tag, Clock, AlertCircle, CheckCircle, XCircle, ArrowRight, MoreHorizontal, Search } from 'lucide-react';
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

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay' | 'branch';
  name: string;
  description?: string;
  config: {
    triggerType?: 'lead-created' | 'lead-updated' | 'email-opened' | 'form-submitted' | 'score-changed' | 'time-based';
    conditionType?: 'field-value' | 'lead-score' | 'time-since' | 'activity-count' | 'custom';
    actionType?: 'send-email' | 'create-task' | 'update-field' | 'assign-user' | 'add-tag' | 'send-sms' | 'webhook';
    field?: string;
    operator?: 'equals' | 'not-equals' | 'greater' | 'less' | 'contains' | 'starts-with' | 'is-empty';
    value?: string | number | boolean;
    template?: string;
    delay?: { value: number; unit: 'minutes' | 'hours' | 'days' | 'weeks' };
    webhook?: { url: string; method: 'GET' | 'POST'; headers?: Record<string, string> };
  };
  position: { x: number; y: number };
  connections: string[];
  isActive: boolean;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'archived';
  category: 'lead-nurturing' | 'follow-up' | 'scoring' | 'assignment' | 'communication' | 'custom';
  nodes: WorkflowNode[];
  triggers: number;
  actions: number;
  executions: number;
  successRate: number;
  lastRun?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  version: number;
  isTemplate: boolean;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'lead-nurturing' | 'welcome-series' | 'follow-up' | 'scoring' | 'assignment';
  nodes: Partial<WorkflowNode>[];
  usageCount: number;
  rating: number;
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedSetupTime: number;
  features: string[];
  previewImage?: string;
  createdBy: string;
  isPublic: boolean;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'New Lead Welcome Sequence',
    description: 'Automated welcome email series for new leads with follow-up tasks',
    status: 'active',
    category: 'lead-nurturing',
    nodes: [
      {
        id: 'trigger-1',
        type: 'trigger',
        name: 'Lead Created',
        config: { triggerType: 'lead-created' },
        position: { x: 100, y: 100 },
        connections: ['action-1'],
        isActive: true
      },
      {
        id: 'action-1',
        type: 'action',
        name: 'Send Welcome Email',
        config: { actionType: 'send-email', template: 'welcome-email' },
        position: { x: 300, y: 100 },
        connections: ['delay-1'],
        isActive: true
      },
      {
        id: 'delay-1',
        type: 'delay',
        name: 'Wait 1 Day',
        config: { delay: { value: 1, unit: 'days' } },
        position: { x: 500, y: 100 },
        connections: ['action-2'],
        isActive: true
      },
      {
        id: 'action-2',
        type: 'action',
        name: 'Create Follow-up Task',
        config: { actionType: 'create-task' },
        position: { x: 700, y: 100 },
        connections: [],
        isActive: true
      }
    ],
    triggers: 1,
    actions: 2,
    executions: 1247,
    successRate: 94.5,
    lastRun: '2024-03-20T15:30:00Z',
    createdBy: 'sarah@company.com',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    tags: ['welcome', 'automation', 'email'],
    version: 2,
    isTemplate: false
  },
  {
    id: '2',
    name: 'Lead Scoring Automation',
    description: 'Dynamic lead scoring based on activities and engagement',
    status: 'active',
    category: 'scoring',
    nodes: [
      {
        id: 'trigger-2',
        type: 'trigger',
        name: 'Email Opened',
        config: { triggerType: 'email-opened' },
        position: { x: 100, y: 100 },
        connections: ['condition-1'],
        isActive: true
      },
      {
        id: 'condition-1',
        type: 'condition',
        name: 'Check Lead Score',
        config: { conditionType: 'lead-score', operator: 'less', value: 80 },
        position: { x: 300, y: 100 },
        connections: ['action-3', 'action-4'],
        isActive: true
      },
      {
        id: 'action-3',
        type: 'action',
        name: 'Increase Score +10',
        config: { actionType: 'update-field', field: 'score', value: '+10' },
        position: { x: 500, y: 50 },
        connections: [],
        isActive: true
      },
      {
        id: 'action-4',
        type: 'action',
        name: 'Assign to Sales Rep',
        config: { actionType: 'assign-user' },
        position: { x: 500, y: 150 },
        connections: [],
        isActive: true
      }
    ],
    triggers: 1,
    actions: 2,
    executions: 3421,
    successRate: 87.2,
    lastRun: '2024-03-20T16:15:00Z',
    createdBy: 'alex@company.com',
    createdAt: '2024-03-10T14:00:00Z',
    updatedAt: '2024-03-18T11:30:00Z',
    tags: ['scoring', 'engagement', 'assignment'],
    version: 3,
    isTemplate: false
  }
];

const mockTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'Lead Nurturing Campaign',
    description: 'Multi-touch nurturing sequence with email, SMS, and task creation',
    category: 'lead-nurturing',
    nodes: [],
    usageCount: 156,
    rating: 4.8,
    complexity: 'intermediate',
    estimatedSetupTime: 30,
    features: ['Email sequences', 'SMS follow-up', 'Task automation', 'Lead scoring'],
    createdBy: 'Buildiyo Team',
    isPublic: true
  },
  {
    id: '2',
    name: 'Welcome Series for New Leads',
    description: 'Onboarding workflow for new leads with personalized content',
    category: 'welcome-series',
    nodes: [],
    usageCount: 234,
    rating: 4.9,
    complexity: 'simple',
    estimatedSetupTime: 15,
    features: ['Welcome emails', 'Onboarding tasks', 'Progress tracking'],
    createdBy: 'Buildiyo Team',
    isPublic: true
  },
  {
    id: '3',
    name: 'Intelligent Lead Scoring',
    description: 'Advanced scoring workflow based on behavior and engagement',
    category: 'scoring',
    nodes: [],
    usageCount: 89,
    rating: 4.7,
    complexity: 'advanced',
    estimatedSetupTime: 45,
    features: ['Behavioral scoring', 'Engagement tracking', 'Auto-assignment', 'Hot lead alerts'],
    createdBy: 'Buildiyo Team',
    isPublic: true
  }
];

const nodeTypeColors = {
  trigger: 'bg-green-100 text-green-800 border-green-200',
  condition: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  action: 'bg-blue-100 text-blue-800 border-blue-200',
  delay: 'bg-purple-100 text-purple-800 border-purple-200',
  branch: 'bg-orange-100 text-orange-800 border-orange-200'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  archived: 'bg-red-100 text-red-800 border-red-200'
};

const categoryColors = {
  'lead-nurturing': 'bg-blue-100 text-blue-800 border-blue-200',
  'follow-up': 'bg-green-100 text-green-800 border-green-200',
  'scoring': 'bg-purple-100 text-purple-800 border-purple-200',
  'assignment': 'bg-orange-100 text-orange-800 border-orange-200',
  'communication': 'bg-pink-100 text-pink-800 border-pink-200',
  'custom': 'bg-gray-100 text-gray-800 border-gray-200'
};

const complexityColors = {
  simple: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

export default function WorkflowBuilder() {
  const [selectedTab, setSelectedTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(mockWorkflows[0]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [builderMode, setBuilderMode] = useState<'design' | 'test' | 'analytics'>('design');
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredWorkflows = useMemo(() => {
    return mockWorkflows.filter(workflow => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || workflow.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const WorkflowCard = ({ workflow }: { workflow: Workflow }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedWorkflow(workflow)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{workflow.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
            <div className="flex items-center gap-2">
              <Badge className={statusColors[workflow.status]}>{workflow.status}</Badge>
              <Badge className={categoryColors[workflow.category]}>{workflow.category}</Badge>
              {workflow.isTemplate && <Badge variant="outline">Template</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{workflow.triggers}</div>
            <div className="text-xs text-gray-600">Triggers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{workflow.actions}</div>
            <div className="text-xs text-gray-600">Actions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{workflow.executions.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Executions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{workflow.successRate}%</div>
            <div className="text-xs text-gray-600">Success</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {workflow.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
            {workflow.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">+{workflow.tags.length - 3}</Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            v{workflow.version} • {workflow.lastRun && `Last run: ${new Date(workflow.lastRun).toLocaleDateString()}`}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const WorkflowCanvas = ({ workflow }: { workflow: Workflow }) => (
    <div className="bg-gray-50 border rounded-lg p-8 min-h-[600px] relative overflow-auto">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Workflow Nodes */}
      <div className="relative">
        {workflow.nodes.map((node, index) => (
          <div
            key={node.id}
            className={`absolute w-48 cursor-pointer transition-all ${
              selectedNode?.id === node.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
            style={{ left: node.position.x, top: node.position.y }}
            onClick={() => setSelectedNode(node)}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={nodeTypeColors[node.type]} size="sm">
                    {node.type}
                  </Badge>
                  {!node.isActive && <Badge variant="outline" size="sm">Disabled</Badge>}
                </div>
                <h4 className="font-medium text-sm mb-1">{node.name}</h4>
                {node.description && (
                  <p className="text-xs text-gray-600">{node.description}</p>
                )}
              </CardContent>
            </Card>
            
            {/* Connection arrows */}
            {node.connections.map(connectionId => {
              const targetNode = workflow.nodes.find(n => n.id === connectionId);
              if (!targetNode) return null;
              
              return (
                <div
                  key={connectionId}
                  className="absolute w-0.5 bg-blue-400"
                  style={{
                    left: '100%',
                    top: '50%',
                    width: targetNode.position.x - node.position.x - 192,
                    height: '2px',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <ArrowRight className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Add Node Button */}
        <div className="absolute top-4 right-4">
          <Button onClick={() => setIsNodeDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </div>
      </div>
    </div>
  );

  const NodeConfigPanel = () => {
    if (!selectedNode) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Node Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nodeName">Node Name</Label>
            <Input id="nodeName" defaultValue={selectedNode.name} />
          </div>
          
          <div>
            <Label htmlFor="nodeType">Node Type</Label>
            <Select defaultValue={selectedNode.type}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trigger">Trigger</SelectItem>
                <SelectItem value="condition">Condition</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="delay">Delay</SelectItem>
                <SelectItem value="branch">Branch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedNode.type === 'trigger' && (
            <div>
              <Label htmlFor="triggerType">Trigger Type</Label>
              <Select defaultValue={selectedNode.config.triggerType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead-created">Lead Created</SelectItem>
                  <SelectItem value="lead-updated">Lead Updated</SelectItem>
                  <SelectItem value="email-opened">Email Opened</SelectItem>
                  <SelectItem value="form-submitted">Form Submitted</SelectItem>
                  <SelectItem value="score-changed">Score Changed</SelectItem>
                  <SelectItem value="time-based">Time Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {selectedNode.type === 'condition' && (
            <>
              <div>
                <Label htmlFor="conditionType">Condition Type</Label>
                <Select defaultValue={selectedNode.config.conditionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="field-value">Field Value</SelectItem>
                    <SelectItem value="lead-score">Lead Score</SelectItem>
                    <SelectItem value="time-since">Time Since</SelectItem>
                    <SelectItem value="activity-count">Activity Count</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="operator">Operator</Label>
                  <Select defaultValue={selectedNode.config.operator}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="not-equals">Not Equals</SelectItem>
                      <SelectItem value="greater">Greater Than</SelectItem>
                      <SelectItem value="less">Less Than</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input id="value" defaultValue={selectedNode.config.value?.toString()} />
                </div>
              </div>
            </>
          )}
          
          {selectedNode.type === 'action' && (
            <>
              <div>
                <Label htmlFor="actionType">Action Type</Label>
                <Select defaultValue={selectedNode.config.actionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send-email">Send Email</SelectItem>
                    <SelectItem value="create-task">Create Task</SelectItem>
                    <SelectItem value="update-field">Update Field</SelectItem>
                    <SelectItem value="assign-user">Assign User</SelectItem>
                    <SelectItem value="add-tag">Add Tag</SelectItem>
                    <SelectItem value="send-sms">Send SMS</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedNode.config.actionType === 'send-email' && (
                <div>
                  <Label htmlFor="template">Email Template</Label>
                  <Select defaultValue={selectedNode.config.template}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome-email">Welcome Email</SelectItem>
                      <SelectItem value="follow-up-email">Follow-up Email</SelectItem>
                      <SelectItem value="nurture-email">Nurture Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedNode.config.actionType === 'webhook' && (
                <>
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input id="webhookUrl" placeholder="https://api.example.com/webhook" />
                  </div>
                  <div>
                    <Label htmlFor="webhookMethod">Method</Label>
                    <Select defaultValue="POST">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </>
          )}
          
          {selectedNode.type === 'delay' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="delayValue">Delay Value</Label>
                <Input 
                  id="delayValue" 
                  type="number" 
                  defaultValue={selectedNode.config.delay?.value} 
                />
              </div>
              <div>
                <Label htmlFor="delayUnit">Unit</Label>
                <Select defaultValue={selectedNode.config.delay?.unit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div>
            <Label htmlFor="nodeDescription">Description</Label>
            <Textarea 
              id="nodeDescription" 
              placeholder="Optional description..." 
              defaultValue={selectedNode.description}
              rows={2}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch checked={selectedNode.isActive} />
            <Label>Node is active</Label>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TemplateCard = ({ template }: { template: WorkflowTemplate }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <Badge className={complexityColors[template.complexity]}>
                {template.complexity}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            <Badge className={categoryColors[template.category]}>{template.category}</Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <div className="text-lg font-bold text-yellow-500">{template.rating}</div>
              <div className="text-sm text-gray-600">★</div>
            </div>
            <div className="text-xs text-gray-600">{template.usageCount} uses</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Setup Time:</span>
            <span className="font-medium">{template.estimatedSetupTime} min</span>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Features:</div>
            <div className="flex flex-wrap gap-1">
              {template.features.slice(0, 3).map(feature => (
                <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
              ))}
              {template.features.length > 3 && (
                <Badge variant="outline" className="text-xs">+{template.features.length - 3}</Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            by {template.createdBy}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm">
              Use Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AddNodeDialog = () => (
    <Dialog open={isNodeDialogOpen} onOpenChange={setIsNodeDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Workflow Node</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Node Type</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {Object.entries(nodeTypeColors).map(([type, colorClass]) => (
                  <Card key={type} className="cursor-pointer hover:bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${colorClass}`}>
                        {type === 'trigger' && <Zap className="h-4 w-4" />}
                        {type === 'condition' && <Filter className="h-4 w-4" />}
                        {type === 'action' && <Target className="h-4 w-4" />}
                        {type === 'delay' && <Clock className="h-4 w-4" />}
                        {type === 'branch' && <GitBranch className="h-4 w-4" />}
                      </div>
                      <p className="text-sm font-medium capitalize">{type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="newNodeName">Node Name</Label>
              <Input id="newNodeName" placeholder="Enter node name" />
            </div>
            
            <div>
              <Label htmlFor="newNodeDescription">Description</Label>
              <Textarea id="newNodeDescription" placeholder="Optional description..." rows={3} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Quick Templates</Label>
              <div className="space-y-2 mt-2">
                {[
                  { name: 'Send Welcome Email', type: 'action', icon: Mail },
                  { name: 'Check Lead Score', type: 'condition', icon: Target },
                  { name: 'Wait 1 Day', type: 'delay', icon: Clock },
                  { name: 'Create Follow-up Task', type: 'action', icon: CheckCircle },
                  { name: 'Send SMS Reminder', type: 'action', icon: MessageSquare }
                ].map(template => {
                  const Icon = template.icon;
                  return (
                    <Card key={template.name} className="cursor-pointer hover:bg-gray-50">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-gray-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{template.name}</p>
                            <Badge className={nodeTypeColors[template.type as keyof typeof nodeTypeColors]} size="sm">
                              {template.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="bg-white rounded border p-4 text-center text-gray-500">
                Node preview will appear here
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsNodeDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsNodeDialogOpen(false)}>
            Add Node
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
            <GitBranch className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Builder</h1>
              <p className="text-gray-600">Design and automate lead management workflows</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedTab === 'builder' && selectedWorkflow && (
              <div className="flex items-center gap-2">
                <Button
                  variant={builderMode === 'design' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBuilderMode('design')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Design
                </Button>
                <Button
                  variant={builderMode === 'test' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBuilderMode('test')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Test
                </Button>
                <Button
                  variant={builderMode === 'analytics' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBuilderMode('analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="workflows">My Workflows</TabsTrigger>
              <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="workflows" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search workflows..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="lead-nurturing">Lead Nurturing</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="scoring">Scoring</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {filteredWorkflows.length} workflows
                  </Badge>
                </div>
              </div>

              <div className="grid gap-6">
                {filteredWorkflows.map(workflow => (
                  <WorkflowCard key={workflow.id} workflow={workflow} />
                ))}
                {filteredWorkflows.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No workflows found matching your criteria
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="builder" className="space-y-6">
              {selectedWorkflow ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{selectedWorkflow.name}</h2>
                      <p className="text-gray-600">{selectedWorkflow.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[selectedWorkflow.status]}>
                        {selectedWorkflow.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Test Run
                      </Button>
                    </div>
                  </div>
                  
                  <WorkflowCanvas workflow={selectedWorkflow} />
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Select a workflow to edit or create a new one
                </div>
              )}
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Workflow Templates</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockTemplates.map(template => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {selectedTab === 'builder' && builderMode === 'design' && (
          <div className="w-80 border-l bg-white p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Node Library</h3>
                <div className="space-y-2">
                  {Object.entries(nodeTypeColors).map(([type, colorClass]) => (
                    <Card 
                      key={type} 
                      className="cursor-pointer hover:bg-gray-50" 
                      onClick={() => setIsNodeDialogOpen(true)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClass}`}>
                            {type === 'trigger' && <Zap className="h-3 w-3" />}
                            {type === 'condition' && <Filter className="h-3 w-3" />}
                            {type === 'action' && <Target className="h-3 w-3" />}
                            {type === 'delay' && <Clock className="h-3 w-3" />}
                            {type === 'branch' && <GitBranch className="h-3 w-3" />}
                          </div>
                          <span className="text-sm font-medium capitalize">{type}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <NodeConfigPanel />
            </div>
          </div>
        )}
      </div>

      <AddNodeDialog />
    </div>
  );
}
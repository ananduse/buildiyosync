'use client';

import { useState, useMemo } from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock, ArrowRight, ArrowLeft, Users, Building, FileText, Target, Star, TrendingUp, Calendar, Mail, Phone, MessageSquare, DollarSign, Briefcase, User, MapPin, Tag, Settings, Plus, Edit, Trash2, Eye, Download, Upload, RefreshCw, Zap, Database } from 'lucide-react';
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

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  score: number;
  status: string;
  source: string;
  assignedTo: string;
  value: number;
  probability: number;
  lastActivity: string;
  tags: string[];
  industry: string;
  location: string;
  companySize: string;
  budget: number;
  timeline: string;
  painPoints: string[];
  requirements: string[];
  decisionMakers: string[];
  activities: {
    id: string;
    type: string;
    date: string;
    description: string;
    outcome: string;
  }[];
  communications: {
    id: string;
    type: 'email' | 'call' | 'meeting' | 'sms';
    date: string;
    subject: string;
    status: string;
  }[];
}

interface ConversionChecklist {
  category: string;
  items: {
    id: string;
    title: string;
    description: string;
    required: boolean;
    completed: boolean;
    completedBy?: string;
    completedAt?: string;
    notes?: string;
    evidence?: string[];
  }[];
}

interface ConversionTemplate {
  id: string;
  name: string;
  targetType: 'customer' | 'project' | 'opportunity';
  industry: string[];
  valueRange: { min: number; max: number };
  checklist: ConversionChecklist[];
  estimatedDuration: number;
  successRate: number;
  usageCount: number;
  isActive: boolean;
}

interface ConversionProcess {
  id: string;
  leadId: string;
  targetType: 'customer' | 'project' | 'opportunity';
  status: 'preparing' | 'in-progress' | 'completed' | 'failed' | 'cancelled';
  currentStep: number;
  totalSteps: number;
  startedAt: string;
  completedAt?: string;
  template?: string;
  checklist: ConversionChecklist[];
  assignedTo: string;
  approver?: string;
  notes: string;
  conversionValue: number;
  postConversionActions: {
    id: string;
    type: 'create-project' | 'setup-customer' | 'send-contract' | 'schedule-kickoff' | 'assign-team' | 'create-tasks';
    title: string;
    description: string;
    completed: boolean;
    assignedTo: string;
    dueDate: string;
  }[];
}

const mockLead: Lead = {
  id: 'lead-1',
  name: 'John Smith',
  email: 'john@acme.com',
  phone: '+1-555-0123',
  company: 'Acme Corp',
  position: 'CTO',
  score: 92,
  status: 'qualified',
  source: 'website',
  assignedTo: 'sarah@company.com',
  value: 75000,
  probability: 85,
  lastActivity: '2024-03-20T15:30:00Z',
  tags: ['enterprise', 'hot', 'decision-maker'],
  industry: 'Technology',
  location: 'San Francisco, CA',
  companySize: '500-1000',
  budget: 100000,
  timeline: '3-6 months',
  painPoints: ['Manual processes', 'Data silos', 'Scalability issues'],
  requirements: ['Cloud solution', 'API integration', '24/7 support'],
  decisionMakers: ['John Smith (CTO)', 'Mary Johnson (CEO)', 'Bob Wilson (CFO)'],
  activities: [
    {
      id: '1',
      type: 'demo',
      date: '2024-03-18T14:00:00Z',
      description: 'Product demonstration',
      outcome: 'Very positive feedback, interested in enterprise features'
    },
    {
      id: '2',
      type: 'call',
      date: '2024-03-15T10:30:00Z',
      description: 'Discovery call',
      outcome: 'Identified key pain points and requirements'
    }
  ],
  communications: [
    {
      id: '1',
      type: 'email',
      date: '2024-03-20T09:00:00Z',
      subject: 'Follow-up on demo and next steps',
      status: 'sent'
    },
    {
      id: '2',
      type: 'meeting',
      date: '2024-03-18T14:00:00Z',
      subject: 'Product Demo Session',
      status: 'completed'
    }
  ]
};

const mockConversionTemplates: ConversionTemplate[] = [
  {
    id: '1',
    name: 'Enterprise Customer Conversion',
    targetType: 'customer',
    industry: ['Technology', 'Healthcare', 'Finance'],
    valueRange: { min: 50000, max: 500000 },
    checklist: [
      {
        category: 'Lead Qualification',
        items: [
          {
            id: '1',
            title: 'Budget Confirmed',
            description: 'Lead has confirmed budget availability and authority',
            required: true,
            completed: true,
            completedBy: 'sarah@company.com',
            completedAt: '2024-03-18T10:00:00Z',
            notes: 'Confirmed $100K budget approved by CFO'
          },
          {
            id: '2',
            title: 'Decision Makers Identified',
            description: 'All key decision makers have been identified and engaged',
            required: true,
            completed: true,
            completedBy: 'sarah@company.com',
            completedAt: '2024-03-15T15:30:00Z'
          },
          {
            id: '3',
            title: 'Timeline Established',
            description: 'Implementation timeline and go-live date agreed upon',
            required: true,
            completed: false
          }
        ]
      },
      {
        category: 'Technical Validation',
        items: [
          {
            id: '4',
            title: 'Technical Requirements Documented',
            description: 'Complete technical requirements and specifications documented',
            required: true,
            completed: true,
            completedBy: 'alex@company.com',
            completedAt: '2024-03-19T14:00:00Z'
          },
          {
            id: '5',
            title: 'Integration Feasibility Confirmed',
            description: 'Technical team has confirmed integration feasibility',
            required: true,
            completed: false
          },
          {
            id: '6',
            title: 'Security Review Completed',
            description: 'Security assessment and compliance requirements reviewed',
            required: false,
            completed: false
          }
        ]
      },
      {
        category: 'Business Validation',
        items: [
          {
            id: '7',
            title: 'ROI Analysis Completed',
            description: 'Return on investment analysis completed and approved',
            required: true,
            completed: true,
            completedBy: 'sarah@company.com',
            completedAt: '2024-03-17T11:00:00Z'
          },
          {
            id: '8',
            title: 'References Provided',
            description: 'Customer references from similar implementations provided',
            required: false,
            completed: true,
            completedBy: 'sarah@company.com',
            completedAt: '2024-03-16T16:00:00Z'
          }
        ]
      }
    ],
    estimatedDuration: 14,
    successRate: 78,
    usageCount: 156,
    isActive: true
  }
];

const mockConversionProcess: ConversionProcess = {
  id: 'conv-1',
  leadId: 'lead-1',
  targetType: 'customer',
  status: 'in-progress',
  currentStep: 2,
  totalSteps: 5,
  startedAt: '2024-03-20T09:00:00Z',
  template: '1',
  checklist: mockConversionTemplates[0].checklist,
  assignedTo: 'sarah@company.com',
  approver: 'manager@company.com',
  notes: 'High-value enterprise conversion. All stakeholders engaged.',
  conversionValue: 75000,
  postConversionActions: [
    {
      id: '1',
      type: 'create-project',
      title: 'Create Implementation Project',
      description: 'Set up project structure and team assignments',
      completed: false,
      assignedTo: 'pm@company.com',
      dueDate: '2024-03-25T17:00:00Z'
    },
    {
      id: '2',
      type: 'send-contract',
      title: 'Send Customer Contract',
      description: 'Prepare and send contract for signature',
      completed: false,
      assignedTo: 'legal@company.com',
      dueDate: '2024-03-22T17:00:00Z'
    },
    {
      id: '3',
      type: 'schedule-kickoff',
      title: 'Schedule Kickoff Meeting',
      description: 'Schedule project kickoff with customer team',
      completed: false,
      assignedTo: 'sarah@company.com',
      dueDate: '2024-03-30T17:00:00Z'
    },
    {
      id: '4',
      type: 'assign-team',
      title: 'Assign Implementation Team',
      description: 'Assign technical and project management resources',
      completed: false,
      assignedTo: 'manager@company.com',
      dueDate: '2024-03-27T17:00:00Z'
    }
  ]
};

const statusColors = {
  preparing: 'bg-gray-100 text-gray-800 border-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  cancelled: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const targetTypeColors = {
  customer: 'bg-green-100 text-green-800 border-green-200',
  project: 'bg-blue-100 text-blue-800 border-blue-200',
  opportunity: 'bg-purple-100 text-purple-800 border-purple-200'
};

export default function LeadConversionWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<ConversionTemplate | null>(null);
  const [conversionType, setConversionType] = useState<'customer' | 'project' | 'opportunity'>('customer');
  const [checklist, setChecklist] = useState<ConversionChecklist[]>(mockConversionTemplates[0].checklist);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [postConversionActions, setPostConversionActions] = useState(mockConversionProcess.postConversionActions);

  const totalChecklistItems = useMemo(() => {
    return checklist.reduce((total, category) => total + category.items.length, 0);
  }, [checklist]);

  const completedChecklistItems = useMemo(() => {
    return checklist.reduce((total, category) => 
      total + category.items.filter(item => item.completed).length, 0
    );
  }, [checklist]);

  const requiredItems = useMemo(() => {
    return checklist.reduce((total, category) => 
      total + category.items.filter(item => item.required).length, 0
    );
  }, [checklist]);

  const completedRequiredItems = useMemo(() => {
    return checklist.reduce((total, category) => 
      total + category.items.filter(item => item.required && item.completed).length, 0
    );
  }, [checklist]);

  const canProceedToConversion = useMemo(() => {
    return completedRequiredItems === requiredItems;
  }, [completedRequiredItems, requiredItems]);

  const updateChecklistItem = (categoryIndex: number, itemIndex: number, updates: any) => {
    const newChecklist = [...checklist];
    newChecklist[categoryIndex].items[itemIndex] = {
      ...newChecklist[categoryIndex].items[itemIndex],
      ...updates
    };
    setChecklist(newChecklist);
  };

  const LeadOverviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Lead Conversion - Overview</h2>
        <p className="text-gray-600 mb-6">
          Review lead information and select conversion type to begin the conversion process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Lead Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{mockLead.name}</h3>
                <p className="text-gray-600">{mockLead.position} at {mockLead.company}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Score: {mockLead.score}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{mockLead.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{mockLead.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Industry</p>
                <p className="font-medium">{mockLead.industry}</p>
              </div>
              <div>
                <p className="text-gray-600">Company Size</p>
                <p className="font-medium">{mockLead.companySize}</p>
              </div>
              <div>
                <p className="text-gray-600">Budget</p>
                <p className="font-medium">${mockLead.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Timeline</p>
                <p className="font-medium">{mockLead.timeline}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {mockLead.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Conversion Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="conversionType">Conversion Type</Label>
              <Select value={conversionType} onValueChange={(value: any) => setConversionType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select conversion type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Convert to Customer</SelectItem>
                  <SelectItem value="project">Convert to Project</SelectItem>
                  <SelectItem value="opportunity">Convert to Opportunity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="template">Conversion Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enterprise">Enterprise Customer Conversion</SelectItem>
                  <SelectItem value="smb">SMB Customer Conversion</SelectItem>
                  <SelectItem value="project">Project Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="value">Expected Value</Label>
              <Input 
                type="number" 
                placeholder="75000" 
                defaultValue={mockLead.value}
              />
            </div>

            <div>
              <Label htmlFor="assignee">Assigned To</Label>
              <Select defaultValue={mockLead.assignedTo}>
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

            <div>
              <Label htmlFor="approver">Approver</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select approver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager@company.com">Sales Manager</SelectItem>
                  <SelectItem value="director@company.com">Sales Director</SelectItem>
                  <SelectItem value="vp@company.com">VP of Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setCurrentStep(2)}>
          Continue to Pre-Conversion Checklist
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const PreConversionChecklistStep = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Pre-Conversion Checklist</h2>
          <p className="text-gray-600">
            Complete all required items before proceeding with conversion.
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {completedChecklistItems} / {totalChecklistItems}
          </div>
          <div className="text-sm text-gray-600">Items Completed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {checklist.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category.category}</span>
                  <Badge variant="outline">
                    {category.items.filter(item => item.completed).length} / {category.items.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={(checked) => 
                            updateChecklistItem(categoryIndex, itemIndex, {
                              completed: checked,
                              completedBy: checked ? 'current-user@company.com' : undefined,
                              completedAt: checked ? new Date().toISOString() : undefined
                            })
                          }
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{item.title}</h4>
                            {item.required && (
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                                Required
                              </Badge>
                            )}
                            {item.completed && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          
                          {item.completed && (
                            <div className="bg-green-50 rounded p-2 text-sm">
                              <p className="text-green-800">
                                ✓ Completed by {item.completedBy} on {new Date(item.completedAt!).toLocaleDateString()}
                              </p>
                              {item.notes && (
                                <p className="text-green-700 mt-1">Note: {item.notes}</p>
                              )}
                            </div>
                          )}
                          
                          {!item.completed && (
                            <div className="mt-2">
                              <Label htmlFor={`notes-${item.id}`} className="text-xs">Notes (optional)</Label>
                              <Textarea
                                id={`notes-${item.id}`}
                                placeholder="Add notes about this item..."
                                className="mt-1 text-sm"
                                rows={2}
                                onChange={(e) => 
                                  updateChecklistItem(categoryIndex, itemIndex, {
                                    notes: e.target.value
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round((completedChecklistItems / totalChecklistItems) * 100)}%</span>
                  </div>
                  <Progress value={(completedChecklistItems / totalChecklistItems) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Required Items</span>
                    <span>{completedRequiredItems} / {requiredItems}</span>
                  </div>
                  <Progress value={(completedRequiredItems / requiredItems) * 100} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{completedChecklistItems}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{totalChecklistItems - completedChecklistItems}</div>
                    <div className="text-xs text-gray-600">Remaining</div>
                  </div>
                </div>

                {!canProceedToConversion && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Action Required</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Complete all required items to proceed with conversion.
                    </p>
                  </div>
                )}

                {canProceedToConversion && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Ready for Conversion</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      All required items completed. You can proceed with conversion.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLead.activities.slice(0, 3).map(activity => (
                  <div key={activity.id} className="border rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.type}
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {new Date(activity.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">{activity.description}</p>
                    <p className="text-xs text-gray-600">{activity.outcome}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          disabled={!canProceedToConversion}
        >
          Continue to Conversion
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const ConversionExecutionStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Execute Conversion</h2>
        <p className="text-gray-600">
          Review conversion details and execute the conversion process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Lead</span>
              <span>{mockLead.name} - {mockLead.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Conversion Type</span>
              <Badge className={targetTypeColors[conversionType]}>
                {conversionType}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Expected Value</span>
              <span>${mockLead.value.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Probability</span>
              <span>{mockLead.probability}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Assigned To</span>
              <span>{mockLead.assignedTo}</span>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Checklist Status</span>
                <span>{completedChecklistItems} / {totalChecklistItems}</span>
              </div>
              <Progress value={(completedChecklistItems / totalChecklistItems) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="conversionDate">Conversion Date</Label>
              <Input type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
            </div>
            
            <div>
              <Label htmlFor="reason">Conversion Reason</Label>
              <Textarea 
                placeholder="Describe why this lead is being converted..."
                rows={3}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Post-Conversion Actions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Create customer record</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Send welcome email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Create onboarding tasks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label>Schedule kickoff meeting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label>Generate contract</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Notify sales team</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>Notify customer success</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <Label>Notify finance team</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Ready to Convert</h4>
                <p className="text-blue-800 text-sm mb-3">
                  This will convert <strong>{mockLead.name}</strong> from <strong>{mockLead.company}</strong> 
                  into a <strong>{conversionType}</strong> with an expected value of <strong>${mockLead.value.toLocaleString()}</strong>.
                </p>
                <div className="text-xs text-blue-700">
                  <p>• Customer record will be created automatically</p>
                  <p>• Welcome email will be sent</p>
                  <p>• Onboarding tasks will be generated</p>
                  <p>• Sales team will be notified</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <Button 
          onClick={() => setCurrentStep(4)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Zap className="h-4 w-4 mr-2" />
          Execute Conversion
        </Button>
      </div>
    </div>
  );

  const PostConversionStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Conversion Successful!</h2>
        <p className="text-gray-600">
          {mockLead.name} from {mockLead.company} has been successfully converted to a {conversionType}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion ID</span>
              <span className="font-mono">CONV-2024-0156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed At</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer ID</span>
              <span className="font-mono">CUST-2024-0789</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Value</span>
              <span className="font-semibold text-green-600">${mockLead.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sales Rep</span>
              <span>{mockLead.assignedTo}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automated Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Customer record created</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Welcome email sent</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Sales team notified</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Onboarding tasks being created...</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Customer success team notification pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post-Conversion Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postConversionActions.map(action => (
              <div key={action.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Checkbox checked={action.completed} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{action.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {action.type.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-600">
                          Due: {new Date(action.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      <span>Assigned to {action.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          View Customer Record
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Follow-up
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Start New Conversion
        </Button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <LeadOverviewStep />;
      case 2:
        return <PreConversionChecklistStep />;
      case 3:
        return <ConversionExecutionStep />;
      case 4:
        return <PostConversionStep />;
      default:
        return <LeadOverviewStep />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Conversion Wizard</h1>
              <p className="text-gray-600">Convert qualified leads to customers, projects, or opportunities</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={statusColors[mockConversionProcess.status]}>
              {mockConversionProcess.status}
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="w-full">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {[
                { number: 1, title: 'Overview', icon: User },
                { number: 2, title: 'Checklist', icon: CheckCircle },
                { number: 3, title: 'Convert', icon: Target },
                { number: 4, title: 'Complete', icon: CheckCircle }
              ].map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex flex-col items-center ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isActive ? 'border-blue-600 bg-blue-50' : 
                        isCompleted ? 'border-green-600 bg-green-50' : 
                        'border-gray-300 bg-gray-50'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className="text-sm font-medium mt-2">{step.title}</span>
                    </div>
                    {index < 3 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
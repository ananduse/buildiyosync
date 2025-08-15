import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Target,
  Plus,
  Edit,
  Trash2,
  Copy,
  Save,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Star,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Users,
  User,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Mail,
  Phone,
  Globe,
  FileText,
  Settings,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Hash,
  Percent,
  Equal,
  X,
  ChevronRight,
  ChevronLeft,
  Zap,
  Database,
  Link
} from 'lucide-react';

interface QualificationRule {
  id: string;
  name: string;
  description: string;
  category: 'demographic' | 'behavioral' | 'firmographic' | 'engagement' | 'custom';
  priority: number;
  weight: number;
  isActive: boolean;
  conditions: QualificationCondition[];
  actions: QualificationAction[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  stats: {
    totalApplied: number;
    passedCount: number;
    passRate: number;
    avgScore: number;
  };
}

interface QualificationCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'in' | 'not_in' | 'exists' | 'not_exists';
  value: any;
  logicalOperator?: 'and' | 'or';
}

interface QualificationAction {
  id: string;
  type: 'set_score' | 'add_score' | 'subtract_score' | 'set_status' | 'add_tag' | 'assign_user' | 'create_task' | 'send_email';
  parameters: Record<string, any>;
}

interface QualificationTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  rules: Partial<QualificationRule>[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

interface QualificationStats {
  totalRules: number;
  activeRules: number;
  totalLeadsProcessed: number;
  averageQualificationScore: number;
  qualificationRate: number;
  topPerformingRule: string;
  recentlyProcessed: number;
}

const QualificationCriteria: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreatingRule, setIsCreatingRule] = useState(false);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);

  // Mock qualification rules
  const qualificationRules: QualificationRule[] = [
    {
      id: 'rule-001',
      name: 'Enterprise Budget Threshold',
      description: 'Qualify leads with enterprise-level budget requirements',
      category: 'firmographic',
      priority: 1,
      weight: 25,
      isActive: true,
      conditions: [
        {
          id: 'cond-001',
          field: 'annualRevenue',
          operator: 'greater_than',
          value: 10000000
        },
        {
          id: 'cond-002',
          field: 'employeeCount',
          operator: 'greater_than',
          value: 100,
          logicalOperator: 'and'
        }
      ],
      actions: [
        {
          id: 'action-001',
          type: 'add_score',
          parameters: { points: 25 }
        },
        {
          id: 'action-002',
          type: 'add_tag',
          parameters: { tag: 'enterprise' }
        }
      ],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-01T10:00:00Z',
      stats: {
        totalApplied: 156,
        passedCount: 89,
        passRate: 57.1,
        avgScore: 78.5
      }
    },
    {
      id: 'rule-002',
      name: 'High Engagement Score',
      description: 'Qualify leads showing high engagement with our content',
      category: 'behavioral',
      priority: 2,
      weight: 20,
      isActive: true,
      conditions: [
        {
          id: 'cond-003',
          field: 'emailOpens',
          operator: 'greater_than',
          value: 10
        },
        {
          id: 'cond-004',
          field: 'pageViews',
          operator: 'greater_than',
          value: 20,
          logicalOperator: 'and'
        },
        {
          id: 'cond-005',
          field: 'downloadCount',
          operator: 'greater_than',
          value: 2,
          logicalOperator: 'and'
        }
      ],
      actions: [
        {
          id: 'action-003',
          type: 'add_score',
          parameters: { points: 20 }
        },
        {
          id: 'action-004',
          type: 'add_tag',
          parameters: { tag: 'high-engagement' }
        }
      ],
      createdBy: 'marketing@company.com',
      createdAt: '2024-01-02T14:30:00Z',
      stats: {
        totalApplied: 234,
        passedCount: 167,
        passRate: 71.4,
        avgScore: 82.3
      }
    },
    {
      id: 'rule-003',
      name: 'Decision Maker Role',
      description: 'Qualify leads in decision-making positions',
      category: 'demographic',
      priority: 3,
      weight: 15,
      isActive: true,
      conditions: [
        {
          id: 'cond-006',
          field: 'jobTitle',
          operator: 'contains',
          value: 'VP|Director|Manager|CEO|CTO|CIO'
        }
      ],
      actions: [
        {
          id: 'action-005',
          type: 'add_score',
          parameters: { points: 15 }
        },
        {
          id: 'action-006',
          type: 'add_tag',
          parameters: { tag: 'decision-maker' }
        }
      ],
      createdBy: 'sales@company.com',
      createdAt: '2024-01-03T09:15:00Z',
      stats: {
        totalApplied: 198,
        passedCount: 134,
        passRate: 67.7,
        avgScore: 75.8
      }
    },
    {
      id: 'rule-004',
      name: 'Technology Industry Focus',
      description: 'Prioritize leads from technology industry',
      category: 'firmographic',
      priority: 4,
      weight: 10,
      isActive: true,
      conditions: [
        {
          id: 'cond-007',
          field: 'industry',
          operator: 'in',
          value: ['Technology', 'Software', 'IT Services', 'SaaS']
        }
      ],
      actions: [
        {
          id: 'action-007',
          type: 'add_score',
          parameters: { points: 10 }
        },
        {
          id: 'action-008',
          type: 'assign_user',
          parameters: { userId: 'tech-specialist' }
        }
      ],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-04T11:45:00Z',
      stats: {
        totalApplied: 145,
        passedCount: 98,
        passRate: 67.6,
        avgScore: 71.2
      }
    },
    {
      id: 'rule-005',
      name: 'Urgent Inquiry',
      description: 'Fast-track leads with urgent requirements',
      category: 'engagement',
      priority: 5,
      weight: 30,
      isActive: false,
      conditions: [
        {
          id: 'cond-008',
          field: 'inquiryType',
          operator: 'contains',
          value: 'urgent|immediate|asap'
        },
        {
          id: 'cond-009',
          field: 'timeline',
          operator: 'less_than',
          value: 30,
          logicalOperator: 'or'
        }
      ],
      actions: [
        {
          id: 'action-009',
          type: 'set_score',
          parameters: { score: 90 }
        },
        {
          id: 'action-010',
          type: 'create_task',
          parameters: { 
            title: 'Urgent lead follow-up',
            priority: 'high',
            dueDate: 'today'
          }
        }
      ],
      createdBy: 'sales@company.com',
      createdAt: '2024-01-05T16:20:00Z',
      stats: {
        totalApplied: 67,
        passedCount: 58,
        passRate: 86.6,
        avgScore: 88.4
      }
    }
  ];

  // Mock templates
  const templates: QualificationTemplate[] = [
    {
      id: 'template-001',
      name: 'B2B SaaS Template',
      description: 'Standard qualification criteria for B2B SaaS companies',
      industry: 'SaaS',
      rules: [
        { name: 'Company Size', weight: 20 },
        { name: 'Budget Authority', weight: 25 },
        { name: 'Timeline', weight: 15 },
        { name: 'Pain Points', weight: 20 },
        { name: 'Technology Stack', weight: 20 }
      ],
      isDefault: true,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    },
    {
      id: 'template-002',
      name: 'Enterprise Sales Template',
      description: 'Qualification criteria for enterprise-level sales',
      industry: 'Enterprise',
      rules: [
        { name: 'Annual Revenue', weight: 30 },
        { name: 'Decision Process', weight: 25 },
        { name: 'Implementation Readiness', weight: 25 },
        { name: 'Stakeholder Access', weight: 20 }
      ],
      isDefault: false,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    }
  ];

  // Mock stats
  const stats: QualificationStats = {
    totalRules: 12,
    activeRules: 8,
    totalLeadsProcessed: 1247,
    averageQualificationScore: 67.8,
    qualificationRate: 64.2,
    topPerformingRule: 'High Engagement Score',
    recentlyProcessed: 89
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demographic': return User;
      case 'behavioral': return Activity;
      case 'firmographic': return Building;
      case 'engagement': return TrendingUp;
      case 'custom': return Settings;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'demographic': return 'bg-blue-100 text-blue-800';
      case 'behavioral': return 'bg-green-100 text-green-800';
      case 'firmographic': return 'bg-purple-100 text-purple-800';
      case 'engagement': return 'bg-orange-100 text-orange-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOperatorSymbol = (operator: string) => {
    switch (operator) {
      case 'equals': return <Equal className="h-3 w-3" />;
      case 'not_equals': return <X className="h-3 w-3" />;
      case 'greater_than': return <ChevronRight className="h-3 w-3" />;
      case 'less_than': return <ChevronLeft className="h-3 w-3" />;
      case 'contains': return <Search className="h-3 w-3" />;
      case 'not_contains': return <XCircle className="h-3 w-3" />;
      case 'in': return <ArrowDown className="h-3 w-3" />;
      case 'not_in': return <ArrowUp className="h-3 w-3" />;
      case 'exists': return <CheckCircle className="h-3 w-3" />;
      case 'not_exists': return <XCircle className="h-3 w-3" />;
      default: return <Equal className="h-3 w-3" />;
    }
  };

  const filteredRules = qualificationRules.filter(rule => {
    const matchesSearch = 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || rule.category === categoryFilter;
    const matchesStatus = showInactive || rule.isActive;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleRule = (ruleId: string) => {
    console.log('Toggling rule:', ruleId);
  };

  const handleDeleteRule = (ruleId: string) => {
    console.log('Deleting rule:', ruleId);
  };

  const handleDuplicateRule = (ruleId: string) => {
    console.log('Duplicating rule:', ruleId);
  };

  const createRule = () => {
    setIsCreatingRule(true);
  };

  const applyTemplate = (templateId: string) => {
    console.log('Applying template:', templateId);
  };

  const testRules = () => {
    console.log('Testing qualification rules');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Qualification Criteria</h1>
          <p className="text-muted-foreground mt-2">
            Define and manage lead qualification rules and scoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={testRules}>
            <Zap className="h-4 w-4 mr-2" />
            Test Rules
          </Button>
          <Button onClick={createRule}>
            <Plus className="h-4 w-4 mr-2" />
            New Rule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{stats.activeRules}</p>
                <p className="text-xs text-muted-foreground">of {stats.totalRules} total</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Qualification Rate</p>
                <p className="text-2xl font-bold">{stats.qualificationRate}%</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold">{stats.averageQualificationScore}</p>
                <p className="text-xs text-muted-foreground">Out of 100</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leads Processed</p>
                <p className="text-2xl font-bold">{stats.totalLeadsProcessed}</p>
                <p className="text-xs text-muted-foreground">All time</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Qualification Rules</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualification Rules</CardTitle>
              <CardDescription>
                Create and manage rules that determine lead qualification scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="demographic">Demographic</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="firmographic">Firmographic</option>
                  <option value="engagement">Engagement</option>
                  <option value="custom">Custom</option>
                </select>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={showInactive}
                    onCheckedChange={setShowInactive}
                  />
                  <Label className="text-sm">Show Inactive</Label>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-4">
                {filteredRules.map((rule) => {
                  const CategoryIcon = getCategoryIcon(rule.category);
                  
                  return (
                    <Card key={rule.id} className={`${!rule.isActive ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-2 rounded-lg ${rule.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                              <CategoryIcon className={`h-6 w-6 ${rule.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              {/* Header */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{rule.name}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {rule.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getCategoryColor(rule.category)}>
                                    {rule.category}
                                  </Badge>
                                  <Badge variant="outline">
                                    Weight: {rule.weight}%
                                  </Badge>
                                  <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {rule.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                </div>
                              </div>

                              {/* Conditions */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Conditions:</p>
                                <div className="space-y-1">
                                  {rule.conditions.map((condition, index) => (
                                    <div key={condition.id} className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded">
                                      {index > 0 && condition.logicalOperator && (
                                        <Badge variant="outline" className="text-xs">
                                          {condition.logicalOperator.toUpperCase()}
                                        </Badge>
                                      )}
                                      <span className="font-mono">{condition.field}</span>
                                      {getOperatorSymbol(condition.operator)}
                                      <span className="font-mono">{condition.value?.toString()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium">Actions:</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {rule.actions.map((action) => (
                                    <Badge key={action.id} variant="outline" className="text-xs">
                                      {action.type.replace('_', ' ').toUpperCase()}
                                      {action.parameters.points && ` (+${action.parameters.points})`}
                                      {action.parameters.score && ` (=${action.parameters.score})`}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Stats */}
                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Activity className="h-3 w-3" />
                                  <span>{rule.stats.totalApplied} applied</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>{rule.stats.passRate}% pass rate</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  <span>{rule.stats.avgScore} avg score</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Hash className="h-3 w-3" />
                                  <span>Priority {rule.priority}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            <Switch
                              checked={rule.isActive}
                              onCheckedChange={() => handleToggleRule(rule.id)}
                            />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingRule(rule.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDuplicateRule(rule.id)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteRule(rule.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredRules.length === 0 && (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No qualification rules found</h3>
                  <p className="text-muted-foreground mt-2">
                    No rules match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualification Templates</CardTitle>
              <CardDescription>
                Pre-built qualification criteria templates for different industries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.isDefault && (
                          <Badge>Default</Badge>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Industry: {template.industry}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Rules ({template.rules.length}):</p>
                          <div className="space-y-1">
                            {template.rules.map((rule, index) => (
                              <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                                <span>{rule.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {rule.weight}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => applyTemplate(template.id)}
                          >
                            Apply Template
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3 mr-1" />
                            Clone
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Rule Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualificationRules.slice(0, 5).map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{rule.name}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{rule.stats.totalApplied} applied</span>
                          <span>{rule.stats.passRate}% pass rate</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={rule.stats.passRate > 70 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                          {rule.stats.avgScore}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-purple-600" />
                      <span>Firmographic</span>
                    </div>
                    <Badge>3 rules</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span>Behavioral</span>
                    </div>
                    <Badge>2 rules</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>Demographic</span>
                    </div>
                    <Badge>2 rules</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                      <span>Engagement</span>
                    </div>
                    <Badge>1 rule</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Qualification Settings</CardTitle>
              <CardDescription>
                Configure global qualification parameters and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="min-score">Minimum Qualification Score</Label>
                    <Input
                      id="min-score"
                      type="number"
                      defaultValue="60"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum score required for a lead to be considered qualified
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="max-score">Maximum Score</Label>
                    <Input
                      id="max-score"
                      type="number"
                      defaultValue="100"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-qualification</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically qualify leads meeting criteria
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Real-time Processing</Label>
                      <p className="text-sm text-muted-foreground">
                        Process qualification rules in real-time
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="decay-period">Score Decay Period (days)</Label>
                    <Input
                      id="decay-period"
                      type="number"
                      defaultValue="30"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      How often to recalculate qualification scores
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="batch-size">Batch Processing Size</Label>
                    <Input
                      id="batch-size"
                      type="number"
                      defaultValue="100"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Send Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users of qualification changes
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Log All Activities</Label>
                      <p className="text-sm text-muted-foreground">
                        Keep detailed logs of qualification processing
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QualificationCriteria;
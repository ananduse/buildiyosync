import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch,
  Plus,
  Trash2,
  Copy,
  Save,
  Eye,
  Settings,
  Move,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
  ArrowDown,
  Filter,
  Target,
  Workflow,
  Check,
  Plus as LogicalOr,
  Check as LogicalAnd,
  Equal,
  X as NotEqual,
  ChevronRight,
  ChevronDown,
  Code,
  Play,
  Pause,
  RefreshCw,
  Download,
  Bug,
  FileText,
  Calculator,
  Calendar,
  Clock,
  User,
  Building,
  MapPin,
  DollarSign,
  Percent,
  Hash,
  Type,
  ToggleLeft,
  CheckSquare,
  Circle,
  List,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FieldRule {
  id: string;
  fieldId: string;
  conditions: Condition[];
  logic: 'AND' | 'OR';
  actions: Action[];
  priority: number;
  enabled: boolean;
}

interface Condition {
  id: string;
  sourceFieldId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 
            'less_than' | 'is_empty' | 'is_not_empty' | 'matches_regex' | 'in_list';
  value: any;
  type: 'value' | 'field' | 'formula';
}

interface Action {
  id: string;
  type: 'show' | 'hide' | 'enable' | 'disable' | 'set_value' | 'clear_value' | 
        'add_class' | 'remove_class' | 'validate' | 'calculate' | 'fetch_data' | 'trigger_webhook';
  targetFieldId?: string;
  value?: any;
  settings?: Record<string, any>;
}

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: { label: string; value: string }[];
}

interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  conditions: Partial<Condition>[];
  actions: Partial<Action>[];
}

const FormConditionalLogic: React.FC = () => {
  const [rules, setRules] = useState<FieldRule[]>([
    {
      id: '1',
      fieldId: 'budget',
      conditions: [
        {
          id: 'c1',
          sourceFieldId: 'project_type',
          operator: 'equals',
          value: 'enterprise',
          type: 'value'
        }
      ],
      logic: 'AND',
      actions: [
        {
          id: 'a1',
          type: 'show',
          targetFieldId: 'budget'
        },
        {
          id: 'a2',
          type: 'set_value',
          targetFieldId: 'budget_min',
          value: '500000'
        }
      ],
      priority: 1,
      enabled: true
    },
    {
      id: '2',
      fieldId: 'company_details',
      conditions: [
        {
          id: 'c2',
          sourceFieldId: 'company_size',
          operator: 'greater_than',
          value: '50',
          type: 'value'
        },
        {
          id: 'c3',
          sourceFieldId: 'industry',
          operator: 'in_list',
          value: ['construction', 'real_estate', 'architecture'],
          type: 'value'
        }
      ],
      logic: 'OR',
      actions: [
        {
          id: 'a3',
          type: 'show',
          targetFieldId: 'company_details'
        },
        {
          id: 'a4',
          type: 'validate',
          settings: {
            required: true,
            minLength: 100
          }
        }
      ],
      priority: 2,
      enabled: true
    }
  ]);

  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);

  // Mock form fields
  const formFields: FormField[] = [
    { id: 'name', label: 'Full Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'company', label: 'Company', type: 'text', required: false },
    { id: 'company_size', label: 'Company Size', type: 'number', required: false },
    { id: 'industry', label: 'Industry', type: 'select', required: false,
      options: [
        { label: 'Construction', value: 'construction' },
        { label: 'Real Estate', value: 'real_estate' },
        { label: 'Architecture', value: 'architecture' },
        { label: 'Engineering', value: 'engineering' }
      ]
    },
    { id: 'project_type', label: 'Project Type', type: 'select', required: true,
      options: [
        { label: 'Small Business', value: 'small' },
        { label: 'Mid-Market', value: 'midmarket' },
        { label: 'Enterprise', value: 'enterprise' }
      ]
    },
    { id: 'budget', label: 'Budget', type: 'number', required: false },
    { id: 'budget_min', label: 'Minimum Budget', type: 'number', required: false },
    { id: 'timeline', label: 'Timeline', type: 'select', required: false,
      options: [
        { label: 'Immediate', value: 'immediate' },
        { label: '1-3 Months', value: '1-3_months' },
        { label: '3-6 Months', value: '3-6_months' },
        { label: '6+ Months', value: '6+_months' }
      ]
    },
    { id: 'company_details', label: 'Company Details', type: 'textarea', required: false },
    { id: 'additional_info', label: 'Additional Information', type: 'textarea', required: false }
  ];

  const ruleTemplates: RuleTemplate[] = [
    {
      id: 'progressive_disclosure',
      name: 'Progressive Disclosure',
      description: 'Show fields based on previous answers',
      icon: Eye,
      category: 'Visibility',
      conditions: [{ operator: 'equals', type: 'value' }],
      actions: [{ type: 'show' }]
    },
    {
      id: 'dynamic_validation',
      name: 'Dynamic Validation',
      description: 'Change validation rules based on context',
      icon: CheckCircle,
      category: 'Validation',
      conditions: [{ operator: 'not_empty', type: 'value' }],
      actions: [{ type: 'validate' }]
    },
    {
      id: 'calculated_fields',
      name: 'Calculated Fields',
      description: 'Auto-calculate values based on other fields',
      icon: Calculator,
      category: 'Calculation',
      conditions: [{ operator: 'greater_than', type: 'value' }],
      actions: [{ type: 'calculate' }]
    },
    {
      id: 'conditional_requirements',
      name: 'Conditional Requirements',
      description: 'Make fields required based on conditions',
      icon: AlertTriangle,
      category: 'Validation',
      conditions: [{ operator: 'equals', type: 'value' }],
      actions: [{ type: 'validate', settings: { required: true } }]
    },
    {
      id: 'data_prefill',
      name: 'Data Pre-fill',
      description: 'Auto-fill fields based on selections',
      icon: Zap,
      category: 'Automation',
      conditions: [{ operator: 'equals', type: 'value' }],
      actions: [{ type: 'set_value' }]
    },
    {
      id: 'api_integration',
      name: 'API Integration',
      description: 'Fetch data from external sources',
      icon: Workflow,
      category: 'Integration',
      conditions: [{ operator: 'not_empty', type: 'value' }],
      actions: [{ type: 'fetch_data' }]
    }
  ];

  const operators = [
    { value: 'equals', label: 'Equals', icon: Equal },
    { value: 'not_equals', label: 'Not Equals', icon: NotEqual },
    { value: 'contains', label: 'Contains', icon: Filter },
    { value: 'not_contains', label: 'Does Not Contain', icon: X },
    { value: 'greater_than', label: 'Greater Than', icon: ChevronRight },
    { value: 'less_than', label: 'Less Than', icon: ChevronRight },
    { value: 'is_empty', label: 'Is Empty', icon: Circle },
    { value: 'is_not_empty', label: 'Is Not Empty', icon: CheckCircle },
    { value: 'matches_regex', label: 'Matches Pattern', icon: Code },
    { value: 'in_list', label: 'In List', icon: List }
  ];

  const actionTypes = [
    { value: 'show', label: 'Show Field', icon: Eye },
    { value: 'hide', label: 'Hide Field', icon: Eye },
    { value: 'enable', label: 'Enable Field', icon: ToggleLeft },
    { value: 'disable', label: 'Disable Field', icon: ToggleLeft },
    { value: 'set_value', label: 'Set Value', icon: Type },
    { value: 'clear_value', label: 'Clear Value', icon: X },
    { value: 'validate', label: 'Apply Validation', icon: CheckCircle },
    { value: 'calculate', label: 'Calculate Value', icon: Calculator },
    { value: 'fetch_data', label: 'Fetch Data', icon: Download },
    { value: 'trigger_webhook', label: 'Trigger Webhook', icon: Zap }
  ];

  const addRule = (template?: RuleTemplate) => {
    const newRule: FieldRule = {
      id: `rule_${Date.now()}`,
      fieldId: '',
      conditions: template?.conditions.map((c, i) => ({
        id: `c_${Date.now()}_${i}`,
        sourceFieldId: '',
        operator: c.operator || 'equals',
        value: c.value || '',
        type: c.type || 'value'
      })) || [{
        id: `c_${Date.now()}`,
        sourceFieldId: '',
        operator: 'equals',
        value: '',
        type: 'value'
      }],
      logic: 'AND',
      actions: template?.actions.map((a, i) => ({
        id: `a_${Date.now()}_${i}`,
        type: a.type || 'show',
        targetFieldId: '',
        value: a.value,
        settings: a.settings
      })) || [{
        id: `a_${Date.now()}`,
        type: 'show',
        targetFieldId: ''
      }],
      priority: rules.length + 1,
      enabled: true
    };

    setRules([...rules, newRule]);
    setSelectedRule(newRule.id);
    setShowRuleBuilder(true);
  };

  const updateRule = (ruleId: string, updates: Partial<FieldRule>) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
    if (selectedRule === ruleId) {
      setSelectedRule(null);
    }
  };

  const addCondition = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    const newCondition: Condition = {
      id: `c_${Date.now()}`,
      sourceFieldId: '',
      operator: 'equals',
      value: '',
      type: 'value'
    };

    updateRule(ruleId, {
      conditions: [...rule.conditions, newCondition]
    });
  };

  const updateCondition = (ruleId: string, conditionId: string, updates: Partial<Condition>) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    updateRule(ruleId, {
      conditions: rule.conditions.map(c => 
        c.id === conditionId ? { ...c, ...updates } : c
      )
    });
  };

  const deleteCondition = (ruleId: string, conditionId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    updateRule(ruleId, {
      conditions: rule.conditions.filter(c => c.id !== conditionId)
    });
  };

  const addAction = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    const newAction: Action = {
      id: `a_${Date.now()}`,
      type: 'show',
      targetFieldId: ''
    };

    updateRule(ruleId, {
      actions: [...rule.actions, newAction]
    });
  };

  const updateAction = (ruleId: string, actionId: string, updates: Partial<Action>) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    updateRule(ruleId, {
      actions: rule.actions.map(a => 
        a.id === actionId ? { ...a, ...updates } : a
      )
    });
  };

  const deleteAction = (ruleId: string, actionId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;

    updateRule(ruleId, {
      actions: rule.actions.filter(a => a.id !== actionId)
    });
  };

  const renderRuleBuilder = (rule: FieldRule) => {
    return (
      <div className="space-y-6">
        {/* Rule Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rule Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Rule Name</Label>
                <Input 
                  placeholder="Enter rule name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Priority</Label>
                <Input 
                  type="number"
                  value={rule.priority}
                  onChange={(e) => updateRule(rule.id, { priority: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Rule Enabled</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle to enable or disable this rule
                </p>
              </div>
              <Switch
                checked={rule.enabled}
                onCheckedChange={(enabled) => updateRule(rule.id, { enabled })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Conditions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Conditions</CardTitle>
                <CardDescription>Define when this rule should trigger</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={rule.logic}
                  onValueChange={(logic) => updateRule(rule.id, { logic: logic as 'AND' | 'OR' })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">
                      <div className="flex items-center">
                        <LogicalAnd className="h-3 w-3 mr-1" />
                        AND
                      </div>
                    </SelectItem>
                    <SelectItem value="OR">
                      <div className="flex items-center">
                        <LogicalOr className="h-3 w-3 mr-1" />
                        OR
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={() => addCondition(rule.id)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rule.conditions.map((condition, index) => (
                <div key={condition.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Source Field</Label>
                        <Select
                          value={condition.sourceFieldId}
                          onValueChange={(value) => updateCondition(rule.id, condition.id, { sourceFieldId: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {formFields.map(field => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Operator</Label>
                        <Select
                          value={condition.operator}
                          onValueChange={(value) => updateCondition(rule.id, condition.id, { operator: value as any })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {operators.map(op => {
                              const Icon = op.icon;
                              return (
                                <SelectItem key={op.value} value={op.value}>
                                  <div className="flex items-center">
                                    <Icon className="h-3 w-3 mr-2" />
                                    {op.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Value</Label>
                        {condition.operator === 'in_list' ? (
                          <Textarea
                            value={Array.isArray(condition.value) ? condition.value.join(', ') : condition.value}
                            onChange={(e) => updateCondition(rule.id, condition.id, { 
                              value: e.target.value.split(',').map(v => v.trim()) 
                            })}
                            placeholder="Enter comma-separated values"
                            className="mt-1 min-h-[38px]"
                            rows={1}
                          />
                        ) : condition.operator === 'is_empty' || condition.operator === 'is_not_empty' ? (
                          <div className="mt-1 px-3 py-2 text-sm text-muted-foreground border rounded-md bg-gray-50">
                            No value needed
                          </div>
                        ) : (
                          <Input
                            value={condition.value}
                            onChange={(e) => updateCondition(rule.id, condition.id, { value: e.target.value })}
                            placeholder="Enter value"
                            className="mt-1"
                          />
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteCondition(rule.id, condition.id)}
                      className="mt-6"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {index < rule.conditions.length - 1 && (
                    <div className="flex items-center justify-center mt-3">
                      <Badge variant="outline" className="text-xs">
                        {rule.logic}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Actions</CardTitle>
                <CardDescription>Define what happens when conditions are met</CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => addAction(rule.id)}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Action
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rule.actions.map((action) => (
                <div key={action.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Action Type</Label>
                        <Select
                          value={action.type}
                          onValueChange={(value) => updateAction(rule.id, action.id, { type: value as any })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {actionTypes.map(type => {
                              const Icon = type.icon;
                              return (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center">
                                    <Icon className="h-3 w-3 mr-2" />
                                    {type.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Target Field</Label>
                        <Select
                          value={action.targetFieldId || ''}
                          onValueChange={(value) => updateAction(rule.id, action.id, { targetFieldId: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {formFields.map(field => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Value/Settings</Label>
                        {action.type === 'set_value' || action.type === 'calculate' ? (
                          <Input
                            value={action.value || ''}
                            onChange={(e) => updateAction(rule.id, action.id, { value: e.target.value })}
                            placeholder="Enter value or formula"
                            className="mt-1"
                          />
                        ) : action.type === 'validate' ? (
                          <Button size="sm" variant="outline" className="mt-1 w-full">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        ) : action.type === 'trigger_webhook' ? (
                          <Input
                            value={action.settings?.url || ''}
                            onChange={(e) => updateAction(rule.id, action.id, { 
                              settings: { ...action.settings, url: e.target.value }
                            })}
                            placeholder="Webhook URL"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 px-3 py-2 text-sm text-muted-foreground border rounded-md bg-gray-50">
                            No configuration needed
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAction(rule.id, action.id)}
                      className="mt-6"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Rule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Test Rule</CardTitle>
            <CardDescription>Test your rule with sample data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Enter test values to see how your rule behaves
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-2 gap-4">
                {rule.conditions.map(condition => {
                  const field = formFields.find(f => f.id === condition.sourceFieldId);
                  if (!field) return null;
                  
                  return (
                    <div key={condition.id}>
                      <Label>{field.label}</Label>
                      {field.type === 'select' ? (
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select value" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input 
                          type={field.type}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="mt-1"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={() => setTestMode(!testMode)}>
                  {testMode ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop Test
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Test
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Bug className="h-4 w-4 mr-2" />
                  Debug Mode
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Conditional Logic & Rules</h1>
            <p className="text-muted-foreground mt-2">
              Create dynamic forms with conditional fields and smart validation
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Code className="h-4 w-4 mr-2" />
              View Code
            </Button>
            <Button onClick={() => setShowRuleBuilder(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Rule Templates */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rule Templates</CardTitle>
                <CardDescription>Quick-start templates for common scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {ruleTemplates.map(template => {
                      const Icon = template.icon;
                      return (
                        <Button
                          key={template.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => addRule(template)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          <div className="text-left">
                            <p className="text-sm font-medium">{template.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {template.description}
                            </p>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Rule Statistics */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-base">Rule Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Rules</span>
                    <span className="text-sm font-medium">{rules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Rules</span>
                    <span className="text-sm font-medium">
                      {rules.filter(r => r.enabled).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conditions</span>
                    <span className="text-sm font-medium">
                      {rules.reduce((acc, r) => acc + r.conditions.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Actions</span>
                    <span className="text-sm font-medium">
                      {rules.reduce((acc, r) => acc + r.actions.length, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {showRuleBuilder && selectedRule ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowRuleBuilder(false);
                      setSelectedRule(null);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Rules
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Rule
                    </Button>
                  </div>
                </div>
                {renderRuleBuilder(rules.find(r => r.id === selectedRule)!)}
              </div>
            ) : (
              <Tabs defaultValue="rules">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="rules">Active Rules</TabsTrigger>
                  <TabsTrigger value="flow">Rule Flow</TabsTrigger>
                  <TabsTrigger value="testing">Testing</TabsTrigger>
                </TabsList>

                <TabsContent value="rules" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configured Rules</CardTitle>
                      <CardDescription>
                        Manage your form's conditional logic and business rules
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {rules.map((rule, index) => (
                          <Collapsible key={rule.id}>
                            <div className="p-4 border rounded-lg">
                              <CollapsibleTrigger className="w-full">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <ChevronRight className="h-4 w-4" />
                                    <div className="text-left">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">Rule #{index + 1}</span>
                                        <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                                          {rule.enabled ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <Badge variant="outline">
                                          Priority: {rule.priority}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {rule.conditions.length} conditions → {rule.actions.length} actions
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={rule.enabled}
                                      onCheckedChange={(enabled) => updateRule(rule.id, { enabled })}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRule(rule.id);
                                        setShowRuleBuilder(true);
                                      }}
                                    >
                                      <Settings className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteRule(rule.id);
                                      }}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="mt-4 pt-4 border-t">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Conditions ({rule.logic})</h4>
                                      <div className="space-y-2">
                                        {rule.conditions.map(condition => {
                                          const field = formFields.find(f => f.id === condition.sourceFieldId);
                                          return (
                                            <div key={condition.id} className="text-sm text-muted-foreground">
                                              {field?.label || condition.sourceFieldId} {condition.operator} {
                                                Array.isArray(condition.value) 
                                                  ? condition.value.join(', ')
                                                  : condition.value
                                              }
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Actions</h4>
                                      <div className="space-y-2">
                                        {rule.actions.map(action => {
                                          const field = formFields.find(f => f.id === action.targetFieldId);
                                          return (
                                            <div key={action.id} className="text-sm text-muted-foreground">
                                              {action.type} → {field?.label || action.targetFieldId}
                                              {action.value && ` (${action.value})`}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </div>
                          </Collapsible>
                        ))}

                        {rules.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Workflow className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                            <p className="mb-4">No rules configured yet</p>
                            <Button onClick={() => setShowRuleBuilder(true)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Create Your First Rule
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="flow" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rule Execution Flow</CardTitle>
                      <CardDescription>
                        Visual representation of how rules are evaluated
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-8 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <GitBranch className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-muted-foreground">
                              Rule flow visualization coming soon
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rule Testing Suite</CardTitle>
                      <CardDescription>
                        Test your rules with different scenarios
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Create test scenarios to validate your conditional logic before deployment
                          </AlertDescription>
                        </Alert>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Test Input</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {formFields.slice(0, 5).map(field => (
                                  <div key={field.id}>
                                    <Label className="text-xs">{field.label}</Label>
                                    {field.type === 'select' ? (
                                      <Select>
                                        <SelectTrigger className="mt-1">
                                          <SelectValue placeholder="Select value" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {field.options?.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                              {option.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    ) : (
                                      <Input 
                                        type={field.type}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        className="mt-1"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Test Output</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="p-2 bg-green-50 rounded text-sm">
                                  <span className="text-green-700">✓ Rule #1 triggered</span>
                                </div>
                                <div className="p-2 bg-gray-50 rounded text-sm">
                                  <span className="text-gray-700">- Rule #2 skipped</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="text-sm text-muted-foreground">
                                  <p>Actions executed:</p>
                                  <ul className="ml-4 mt-1">
                                    <li>• Show budget field</li>
                                    <li>• Set minimum budget to $500,000</li>
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button>
                            <Play className="h-4 w-4 mr-2" />
                            Run Test
                          </Button>
                          <Button variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                          <Button variant="outline">
                            <Save className="h-4 w-4 mr-2" />
                            Save Scenario
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormConditionalLogic;
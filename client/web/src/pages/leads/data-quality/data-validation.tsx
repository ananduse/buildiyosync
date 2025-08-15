import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  Upload,
  Hash,
  Percent,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Clock,
  User,
  Building,
  Briefcase,
  CreditCard,
  Link,
  Code,
  Database,
  Server,
  Terminal,
  Bug,
  CheckSquare,
  Square,
  CircleSlash,
  AlertOctagon
} from 'lucide-react';

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  field: string;
  fieldType: 'text' | 'email' | 'phone' | 'number' | 'date' | 'url' | 'custom';
  validationType: 'required' | 'format' | 'range' | 'length' | 'unique' | 'regex' | 'custom';
  conditions: {
    pattern?: string;
    min?: number;
    max?: number;
    allowedValues?: string[];
    customLogic?: string;
  };
  severity: 'error' | 'warning' | 'info';
  isActive: boolean;
  autoCorrect: boolean;
  correctionAction?: string;
  appliesTo: string[];
  failureCount: number;
  lastChecked?: string;
  createdBy: string;
  createdAt: string;
}

interface ValidationIssue {
  id: string;
  recordId: string;
  recordType: 'lead' | 'contact' | 'company';
  recordName: string;
  field: string;
  currentValue: any;
  suggestedValue?: any;
  rule: string;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  detectedAt: string;
  status: 'open' | 'fixed' | 'ignored';
  fixedAt?: string;
  fixedBy?: string;
}

interface ValidationStats {
  totalRecords: number;
  validRecords: number;
  recordsWithIssues: number;
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  dataQualityScore: number;
  autoFixedToday: number;
  manualFixedToday: number;
}

interface FieldQuality {
  field: string;
  completeness: number;
  accuracy: number;
  consistency: number;
  uniqueness: number;
  issueCount: number;
  lastValidated: string;
}

const DataValidation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('issues');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('open');
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState(false);

  // Mock data for validation rules
  const validationRules: ValidationRule[] = [
    {
      id: 'rule-001',
      name: 'Email Format Validation',
      description: 'Validates email addresses against RFC 5322 standard',
      field: 'email',
      fieldType: 'email',
      validationType: 'format',
      conditions: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      },
      severity: 'error',
      isActive: true,
      autoCorrect: false,
      appliesTo: ['leads', 'contacts'],
      failureCount: 234,
      lastChecked: '2024-01-15T14:30:00Z',
      createdBy: 'System Admin',
      createdAt: '2023-06-15T10:00:00Z'
    },
    {
      id: 'rule-002',
      name: 'Phone Number Format',
      description: 'Ensures phone numbers are in valid international format',
      field: 'phone',
      fieldType: 'phone',
      validationType: 'format',
      conditions: {
        pattern: '^\\+?[1-9]\\d{1,14}$'
      },
      severity: 'warning',
      isActive: true,
      autoCorrect: true,
      correctionAction: 'Format to E.164',
      appliesTo: ['leads', 'contacts'],
      failureCount: 156,
      lastChecked: '2024-01-15T14:30:00Z',
      createdBy: 'Data Manager',
      createdAt: '2023-07-20T11:15:00Z'
    },
    {
      id: 'rule-003',
      name: 'Required Company Name',
      description: 'Company name is required for all B2B leads',
      field: 'company',
      fieldType: 'text',
      validationType: 'required',
      conditions: {},
      severity: 'error',
      isActive: true,
      autoCorrect: false,
      appliesTo: ['leads'],
      failureCount: 89,
      lastChecked: '2024-01-15T14:30:00Z',
      createdBy: 'Sales Manager',
      createdAt: '2023-08-10T09:30:00Z'
    },
    {
      id: 'rule-004',
      name: 'Lead Score Range',
      description: 'Lead score must be between 0 and 100',
      field: 'score',
      fieldType: 'number',
      validationType: 'range',
      conditions: {
        min: 0,
        max: 100
      },
      severity: 'warning',
      isActive: true,
      autoCorrect: true,
      correctionAction: 'Cap at boundaries',
      appliesTo: ['leads'],
      failureCount: 45,
      lastChecked: '2024-01-15T14:30:00Z',
      createdBy: 'Marketing Manager',
      createdAt: '2023-09-05T14:20:00Z'
    },
    {
      id: 'rule-005',
      name: 'Website URL Validation',
      description: 'Validates website URLs are properly formatted',
      field: 'website',
      fieldType: 'url',
      validationType: 'format',
      conditions: {
        pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$'
      },
      severity: 'info',
      isActive: true,
      autoCorrect: true,
      correctionAction: 'Add https:// prefix',
      appliesTo: ['companies'],
      failureCount: 67,
      lastChecked: '2024-01-15T14:30:00Z',
      createdBy: 'IT Admin',
      createdAt: '2023-10-12T16:45:00Z'
    }
  ];

  // Mock data for validation issues
  const validationIssues: ValidationIssue[] = [
    {
      id: 'issue-001',
      recordId: 'lead-123',
      recordType: 'lead',
      recordName: 'John Smith',
      field: 'email',
      currentValue: 'john.smith@',
      suggestedValue: 'john.smith@company.com',
      rule: 'Email Format Validation',
      ruleId: 'rule-001',
      severity: 'error',
      message: 'Invalid email format: missing domain',
      detectedAt: '2024-01-15T14:30:00Z',
      status: 'open'
    },
    {
      id: 'issue-002',
      recordId: 'lead-124',
      recordType: 'lead',
      recordName: 'Sarah Johnson',
      field: 'phone',
      currentValue: '555-1234',
      suggestedValue: '+1-555-555-1234',
      rule: 'Phone Number Format',
      ruleId: 'rule-002',
      severity: 'warning',
      message: 'Phone number missing country code',
      detectedAt: '2024-01-15T14:25:00Z',
      status: 'open'
    },
    {
      id: 'issue-003',
      recordId: 'lead-125',
      recordType: 'lead',
      recordName: 'Mike Chen',
      field: 'company',
      currentValue: null,
      suggestedValue: null,
      rule: 'Required Company Name',
      ruleId: 'rule-003',
      severity: 'error',
      message: 'Company name is required for B2B leads',
      detectedAt: '2024-01-15T14:20:00Z',
      status: 'open'
    },
    {
      id: 'issue-004',
      recordId: 'lead-126',
      recordType: 'lead',
      recordName: 'Lisa Davis',
      field: 'score',
      currentValue: 150,
      suggestedValue: 100,
      rule: 'Lead Score Range',
      ruleId: 'rule-004',
      severity: 'warning',
      message: 'Lead score exceeds maximum value of 100',
      detectedAt: '2024-01-15T14:15:00Z',
      status: 'fixed',
      fixedAt: '2024-01-15T14:16:00Z',
      fixedBy: 'Auto-correction'
    },
    {
      id: 'issue-005',
      recordId: 'company-456',
      recordType: 'company',
      recordName: 'Tech Startup Inc',
      field: 'website',
      currentValue: 'techstartup.com',
      suggestedValue: 'https://techstartup.com',
      rule: 'Website URL Validation',
      ruleId: 'rule-005',
      severity: 'info',
      message: 'Website URL missing protocol',
      detectedAt: '2024-01-15T14:10:00Z',
      status: 'open'
    }
  ];

  // Mock stats
  const stats: ValidationStats = {
    totalRecords: 12456,
    validRecords: 10234,
    recordsWithIssues: 2222,
    totalIssues: 3456,
    criticalIssues: 523,
    warningIssues: 1234,
    infoIssues: 1699,
    dataQualityScore: 82.2,
    autoFixedToday: 234,
    manualFixedToday: 89
  };

  // Mock field quality data
  const fieldQuality: FieldQuality[] = [
    { field: 'email', completeness: 95, accuracy: 88, consistency: 92, uniqueness: 99, issueCount: 234, lastValidated: '2024-01-15T14:30:00Z' },
    { field: 'phone', completeness: 87, accuracy: 75, consistency: 80, uniqueness: 98, issueCount: 156, lastValidated: '2024-01-15T14:30:00Z' },
    { field: 'company', completeness: 78, accuracy: 95, consistency: 90, uniqueness: 100, issueCount: 89, lastValidated: '2024-01-15T14:30:00Z' },
    { field: 'name', completeness: 99, accuracy: 98, consistency: 97, uniqueness: 95, issueCount: 12, lastValidated: '2024-01-15T14:30:00Z' },
    { field: 'website', completeness: 65, accuracy: 82, consistency: 85, uniqueness: 100, issueCount: 67, lastValidated: '2024-01-15T14:30:00Z' }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return ShieldX;
      case 'warning': return ShieldAlert;
      case 'info': return Shield;
      default: return Shield;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFieldIcon = (fieldType: string) => {
    switch (fieldType) {
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'url': return Globe;
      case 'date': return Calendar;
      case 'number': return Hash;
      default: return FileText;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredIssues = validationIssues.filter(issue => {
    const matchesSearch = issue.recordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || issue.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const toggleIssueSelection = (issueId: string) => {
    const newSelection = new Set(selectedIssues);
    if (newSelection.has(issueId)) {
      newSelection.delete(issueId);
    } else {
      newSelection.add(issueId);
    }
    setSelectedIssues(newSelection);
  };

  const runValidation = () => {
    setIsValidating(true);
    setTimeout(() => setIsValidating(false), 3000);
  };

  const autoFixIssues = () => {
    console.log('Auto-fixing selected issues');
  };

  const ignoreIssues = () => {
    console.log('Ignoring selected issues');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Validation</h1>
          <p className="text-muted-foreground">Ensure data quality with comprehensive validation rules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={runValidation}
            disabled={isValidating}
          >
            {isValidating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Validation
              </>
            )}
          </Button>
          <Button 
            size="sm"
            onClick={autoFixIssues}
            disabled={selectedIssues.size === 0}
          >
            <Zap className="h-4 w-4 mr-2" />
            Auto-Fix ({selectedIssues.size})
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <p className="text-2xl font-bold">{stats.dataQualityScore}%</p>
                <Progress value={stats.dataQualityScore} className="h-2 mt-2" />
              </div>
              <ShieldCheck className={`h-8 w-8 ${getQualityColor(stats.dataQualityScore)}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issues</p>
                <p className="text-2xl font-bold">{stats.totalIssues.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{stats.recordsWithIssues} records</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{stats.criticalIssues}</p>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </div>
              <ShieldX className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Fixed</p>
                <p className="text-2xl font-bold text-green-600">{stats.autoFixedToday}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valid Records</p>
                <p className="text-2xl font-bold">{((stats.validRecords / stats.totalRecords) * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">{stats.validRecords.toLocaleString()} of {stats.totalRecords.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="issues">Validation Issues</TabsTrigger>
          <TabsTrigger value="rules">Validation Rules</TabsTrigger>
          <TabsTrigger value="quality">Field Quality</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="error">Errors</SelectItem>
                <SelectItem value="warning">Warnings</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="ignored">Ignored</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Issues List */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">
                        <Checkbox 
                          checked={selectedIssues.size === filteredIssues.length && filteredIssues.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedIssues(new Set(filteredIssues.map(i => i.id)));
                            } else {
                              setSelectedIssues(new Set());
                            }
                          }}
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Record</th>
                      <th className="text-left py-3 px-4 font-medium">Field</th>
                      <th className="text-left py-3 px-4 font-medium">Issue</th>
                      <th className="text-left py-3 px-4 font-medium">Current Value</th>
                      <th className="text-left py-3 px-4 font-medium">Suggested</th>
                      <th className="text-left py-3 px-4 font-medium">Severity</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((issue) => {
                      const SeverityIcon = getSeverityIcon(issue.severity);
                      
                      return (
                        <tr key={issue.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <Checkbox
                              checked={selectedIssues.has(issue.id)}
                              onCheckedChange={() => toggleIssueSelection(issue.id)}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{issue.recordName}</p>
                              <p className="text-xs text-muted-foreground">{issue.recordType}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{issue.field}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs">
                              <p className="text-sm">{issue.message}</p>
                              <p className="text-xs text-muted-foreground">{issue.rule}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {issue.currentValue || 'null'}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            {issue.suggestedValue && (
                              <code className="text-xs bg-green-100 px-2 py-1 rounded">
                                {issue.suggestedValue}
                              </code>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getSeverityColor(issue.severity)}>
                              <SeverityIcon className="h-3 w-3 mr-1" />
                              {issue.severity}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={
                              issue.status === 'open' ? 'default' : 
                              issue.status === 'fixed' ? 'secondary' : 
                              'outline'
                            }>
                              {issue.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {issue.suggestedValue && issue.status === 'open' && (
                                <Button variant="ghost" size="sm">
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedIssues.size > 0 && (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <span className="text-sm font-medium">{selectedIssues.size} issues selected</span>
              <Button size="sm" onClick={autoFixIssues}>
                <Zap className="h-3 w-3 mr-1" />
                Auto-Fix
              </Button>
              <Button variant="outline" size="sm" onClick={ignoreIssues}>
                <X className="h-3 w-3 mr-1" />
                Ignore
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Validation Rules</CardTitle>
              <CardDescription>Configure data validation rules and auto-correction settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationRules.map((rule) => {
                  const FieldIcon = getFieldIcon(rule.fieldType);
                  const SeverityIcon = getSeverityIcon(rule.severity);
                  
                  return (
                    <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Switch checked={rule.isActive} />
                        
                        <FieldIcon className="h-5 w-5 text-gray-500" />
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{rule.name}</h4>
                            <Badge className={getSeverityColor(rule.severity)}>
                              <SeverityIcon className="h-3 w-3 mr-1" />
                              {rule.severity}
                            </Badge>
                            {rule.autoCorrect && (
                              <Badge variant="outline" className="text-green-600 border-green-200">
                                <Zap className="h-3 w-3 mr-1" />
                                Auto-Correct
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Field: {rule.field}</span>
                            <span>Type: {rule.validationType}</span>
                            <span>Applies to: {rule.appliesTo.join(', ')}</span>
                            <span>Failures: {rule.failureCount}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Field Quality Metrics</CardTitle>
              <CardDescription>Data quality assessment by field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fieldQuality.map((field) => (
                  <div key={field.field} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium capitalize">{field.field}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {field.issueCount} issues
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last validated: {new Date(field.lastValidated).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Completeness</span>
                          <span className={`text-sm font-medium ${getQualityColor(field.completeness)}`}>
                            {field.completeness}%
                          </span>
                        </div>
                        <Progress value={field.completeness} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Accuracy</span>
                          <span className={`text-sm font-medium ${getQualityColor(field.accuracy)}`}>
                            {field.accuracy}%
                          </span>
                        </div>
                        <Progress value={field.accuracy} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Consistency</span>
                          <span className={`text-sm font-medium ${getQualityColor(field.consistency)}`}>
                            {field.consistency}%
                          </span>
                        </div>
                        <Progress value={field.consistency} className="h-2" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Uniqueness</span>
                          <span className={`text-sm font-medium ${getQualityColor(field.uniqueness)}`}>
                            {field.uniqueness}%
                          </span>
                        </div>
                        <Progress value={field.uniqueness} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Validation Settings</CardTitle>
                <CardDescription>Configure validation behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable real-time validation</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Block invalid data entry</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Auto-correct when possible</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Validation frequency</Label>
                  <Select defaultValue="hourly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Batch size for validation</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure validation alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email on critical errors</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Dashboard notifications</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Weekly quality report</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Alert threshold (%)</Label>
                  <Input type="number" defaultValue="80" min="0" max="100" />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification recipients</Label>
                  <Input placeholder="admin@company.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataValidation;
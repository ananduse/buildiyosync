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
  Shield,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  Database,
  Key,
  Globe,
  Bell,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  Plus,
  Edit,
  Copy,
  Save,
  RefreshCw,
  MoreVertical,
  Archive,
  Unarchive,
  ShieldCheck,
  ShieldX,
  UserX,
  FileX,
  Zap,
  Link2,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  CheckSquare,
  Square,
  Timer,
  History
} from 'lucide-react';

interface PrivacyPolicy {
  id: string;
  name: string;
  description: string;
  category: 'retention' | 'consent' | 'processing' | 'deletion' | 'access';
  isActive: boolean;
  rules: PrivacyRule[];
  legalBasis: string;
  dataTypes: string[];
  retentionPeriod: number;
  retentionUnit: 'days' | 'months' | 'years';
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  stats: {
    recordsAffected: number;
    lastApplied: string;
    complianceRate: number;
  };
}

interface PrivacyRule {
  id: string;
  type: 'auto_delete' | 'anonymize' | 'export' | 'restrict_processing' | 'require_consent';
  conditions: PrivacyCondition[];
  actions: PrivacyAction[];
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
  };
}

interface PrivacyCondition {
  id: string;
  field: string;
  operator: 'older_than' | 'equals' | 'contains' | 'in' | 'exists';
  value: any;
  logicalOperator?: 'and' | 'or';
}

interface PrivacyAction {
  id: string;
  type: 'delete' | 'anonymize' | 'encrypt' | 'export' | 'notify' | 'flag';
  parameters: Record<string, any>;
}

interface ConsentRecord {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  consentType: 'marketing' | 'processing' | 'profiling' | 'third_party';
  consentGiven: boolean;
  consentDate: string;
  consentSource: 'form' | 'email' | 'phone' | 'website' | 'import';
  consentDetails: {
    ipAddress?: string;
    userAgent?: string;
    doubleOptIn?: boolean;
    witnessedBy?: string;
  };
  revokedDate?: string;
  revokedReason?: string;
  status: 'active' | 'revoked' | 'expired' | 'pending';
  expiryDate?: string;
  lastUpdated: string;
}

interface DataRequest {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  requestType: 'access' | 'portability' | 'rectification' | 'erasure' | 'restriction';
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  requestDate: string;
  completionDate?: string;
  requestDetails: string;
  responseDetails?: string;
  attachments: string[];
  handledBy?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  legalDeadline: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface PrivacyStats {
  totalPolicies: number;
  activePolicies: number;
  consentRecords: number;
  consentRate: number;
  pendingRequests: number;
  completedRequests: number;
  averageResponseTime: number;
  complianceScore: number;
}

const DataPrivacy: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('policies');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  // Mock privacy policies
  const privacyPolicies: PrivacyPolicy[] = [
    {
      id: 'policy-001',
      name: 'GDPR Lead Data Retention',
      description: 'Automatically delete lead data after 3 years of inactivity',
      category: 'retention',
      isActive: true,
      rules: [
        {
          id: 'rule-001',
          type: 'auto_delete',
          conditions: [
            {
              id: 'cond-001',
              field: 'lastActivity',
              operator: 'older_than',
              value: 3
            }
          ],
          actions: [
            {
              id: 'action-001',
              type: 'notify',
              parameters: { template: 'retention_warning', days_before: 30 }
            },
            {
              id: 'action-002',
              type: 'delete',
              parameters: { backup: true }
            }
          ],
          schedule: {
            frequency: 'monthly',
            time: '02:00'
          }
        }
      ],
      legalBasis: 'GDPR Article 17 - Right to erasure',
      dataTypes: ['personal_info', 'contact_details', 'interaction_history'],
      retentionPeriod: 3,
      retentionUnit: 'years',
      createdBy: 'privacy-officer@company.com',
      createdAt: '2024-01-01T10:00:00Z',
      stats: {
        recordsAffected: 2456,
        lastApplied: '2024-01-15T02:00:00Z',
        complianceRate: 98.5
      }
    },
    {
      id: 'policy-002',
      name: 'Marketing Consent Verification',
      description: 'Verify and manage marketing consent for all leads',
      category: 'consent',
      isActive: true,
      rules: [
        {
          id: 'rule-002',
          type: 'require_consent',
          conditions: [
            {
              id: 'cond-002',
              field: 'source',
              operator: 'in',
              value: ['website', 'form', 'import']
            }
          ],
          actions: [
            {
              id: 'action-003',
              type: 'flag',
              parameters: { flag: 'consent_required' }
            },
            {
              id: 'action-004',
              type: 'restrict_processing',
              parameters: { activities: ['email_marketing', 'profiling'] }
            }
          ]
        }
      ],
      legalBasis: 'GDPR Article 6 - Lawfulness of processing',
      dataTypes: ['marketing_preferences', 'contact_details'],
      retentionPeriod: 2,
      retentionUnit: 'years',
      createdBy: 'marketing@company.com',
      createdAt: '2024-01-02T14:30:00Z',
      stats: {
        recordsAffected: 8934,
        lastApplied: '2024-01-18T14:00:00Z',
        complianceRate: 92.3
      }
    },
    {
      id: 'policy-003',
      name: 'Data Anonymization',
      description: 'Anonymize personal data after conversion or closure',
      category: 'processing',
      isActive: true,
      rules: [
        {
          id: 'rule-003',
          type: 'anonymize',
          conditions: [
            {
              id: 'cond-003',
              field: 'status',
              operator: 'in',
              value: ['converted', 'closed_lost']
            },
            {
              id: 'cond-004',
              field: 'lastActivity',
              operator: 'older_than',
              value: 365,
              logicalOperator: 'and'
            }
          ],
          actions: [
            {
              id: 'action-005',
              type: 'anonymize',
              parameters: { 
                fields: ['name', 'email', 'phone', 'address'],
                preserve_stats: true
              }
            }
          ],
          schedule: {
            frequency: 'monthly',
            time: '01:00'
          }
        }
      ],
      legalBasis: 'GDPR Article 5 - Principles of processing',
      dataTypes: ['personal_identifiers', 'contact_details'],
      retentionPeriod: 1,
      retentionUnit: 'years',
      createdBy: 'privacy-officer@company.com',
      createdAt: '2024-01-03T11:15:00Z',
      stats: {
        recordsAffected: 1823,
        lastApplied: '2024-01-18T01:00:00Z',
        complianceRate: 100.0
      }
    }
  ];

  // Mock consent records
  const consentRecords: ConsentRecord[] = [
    {
      id: 'consent-001',
      leadId: 'lead-001',
      leadName: 'John Smith',
      leadEmail: 'john@example.com',
      consentType: 'marketing',
      consentGiven: true,
      consentDate: '2024-01-15T10:30:00Z',
      consentSource: 'form',
      consentDetails: {
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0...',
        doubleOptIn: true
      },
      status: 'active',
      expiryDate: '2026-01-15T10:30:00Z',
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: 'consent-002',
      leadId: 'lead-002',
      leadName: 'Sarah Johnson',
      leadEmail: 'sarah@example.com',
      consentType: 'processing',
      consentGiven: false,
      consentDate: '2024-01-10T14:20:00Z',
      consentSource: 'email',
      consentDetails: {
        doubleOptIn: false
      },
      revokedDate: '2024-01-12T09:15:00Z',
      revokedReason: 'User request via email',
      status: 'revoked',
      lastUpdated: '2024-01-12T09:15:00Z'
    }
  ];

  // Mock data requests
  const dataRequests: DataRequest[] = [
    {
      id: 'request-001',
      leadId: 'lead-003',
      leadName: 'Mike Wilson',
      leadEmail: 'mike@example.com',
      requestType: 'access',
      status: 'pending',
      requestDate: '2024-01-16T11:00:00Z',
      requestDetails: 'Request for all personal data we hold',
      attachments: [],
      verificationStatus: 'verified',
      legalDeadline: '2024-02-15T11:00:00Z',
      priority: 'medium'
    },
    {
      id: 'request-002',
      leadId: 'lead-004',
      leadName: 'Lisa Brown',
      leadEmail: 'lisa@example.com',
      requestType: 'erasure',
      status: 'completed',
      requestDate: '2024-01-14T09:30:00Z',
      completionDate: '2024-01-16T14:45:00Z',
      requestDetails: 'Delete all my personal information',
      responseDetails: 'All data deleted as requested',
      attachments: ['deletion_confirmation.pdf'],
      handledBy: 'privacy-officer@company.com',
      verificationStatus: 'verified',
      legalDeadline: '2024-02-13T09:30:00Z',
      priority: 'high'
    }
  ];

  // Mock stats
  const stats: PrivacyStats = {
    totalPolicies: 8,
    activePolicies: 6,
    consentRecords: 12567,
    consentRate: 78.4,
    pendingRequests: 5,
    completedRequests: 23,
    averageResponseTime: 14.2,
    complianceScore: 94.7
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'retention': return Clock;
      case 'consent': return CheckCircle;
      case 'processing': return Database;
      case 'deletion': return Trash2;
      case 'access': return Eye;
      default: return Shield;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'retention': return 'bg-blue-100 text-blue-800';
      case 'consent': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'deletion': return 'bg-red-100 text-red-800';
      case 'access': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'revoked': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handlePolicyToggle = (policyId: string) => {
    console.log('Toggling policy:', policyId);
  };

  const handleConsentUpdate = (consentId: string, granted: boolean) => {
    console.log('Updating consent:', consentId, granted);
  };

  const handleRequestAction = (requestId: string, action: string) => {
    console.log('Request action:', requestId, action);
  };

  const runPrivacyAudit = () => {
    console.log('Running privacy audit');
  };

  const exportPrivacyReport = () => {
    console.log('Exporting privacy report');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Privacy</h1>
          <p className="text-muted-foreground mt-2">
            Manage GDPR compliance, data retention, and privacy policies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={runPrivacyAudit}>
            <Shield className="h-4 w-4 mr-2" />
            Privacy Audit
          </Button>
          <Button variant="outline" onClick={exportPrivacyReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold">{stats.complianceScore}%</p>
                <p className="text-xs text-muted-foreground">Overall compliance</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consent Rate</p>
                <p className="text-2xl font-bold">{stats.consentRate}%</p>
                <p className="text-xs text-muted-foreground">Active consents</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                <p className="text-xs text-muted-foreground">Data subject requests</p>
              </div>
              <Timer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{stats.averageResponseTime}</p>
                <p className="text-xs text-muted-foreground">Days to respond</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="policies">Privacy Policies</TabsTrigger>
          <TabsTrigger value="consent">Consent Management</TabsTrigger>
          <TabsTrigger value="requests">Data Requests</TabsTrigger>
          <TabsTrigger value="reports">Reports & Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policies</CardTitle>
              <CardDescription>
                Configure automated privacy policies and data retention rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search policies..."
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
                  <option value="retention">Retention</option>
                  <option value="consent">Consent</option>
                  <option value="processing">Processing</option>
                  <option value="deletion">Deletion</option>
                  <option value="access">Access</option>
                </select>

                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Policy
                </Button>
              </div>

              {/* Policies List */}
              <div className="space-y-4">
                {privacyPolicies.map((policy) => {
                  const CategoryIcon = getCategoryIcon(policy.category);
                  
                  return (
                    <Card key={policy.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <CategoryIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">{policy.name}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {policy.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getCategoryColor(policy.category)}>
                                    {policy.category}
                                  </Badge>
                                  <Badge className={policy.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {policy.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Legal Basis</p>
                                  <p className="text-muted-foreground">{policy.legalBasis}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Retention Period</p>
                                  <p className="text-muted-foreground">
                                    {policy.retentionPeriod} {policy.retentionUnit}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Data Types</p>
                                  <div className="flex gap-1 flex-wrap">
                                    {policy.dataTypes.map((type) => (
                                      <Badge key={type} variant="outline" className="text-xs">
                                        {type.replace('_', ' ')}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{policy.stats.recordsAffected} records</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>{policy.stats.complianceRate}% compliant</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Last applied: {formatDate(policy.stats.lastApplied)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Switch
                              checked={policy.isActive}
                              onCheckedChange={() => handlePolicyToggle(policy.id)}
                            />
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Copy className="h-3 w-3" />
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent Management</CardTitle>
              <CardDescription>
                Track and manage consent records for all leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consentRecords.map((consent) => (
                  <Card key={consent.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{consent.leadName}</p>
                            <p className="text-sm text-muted-foreground">{consent.leadEmail}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium capitalize">
                              {consent.consentType} Consent
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(consent.consentDate)} via {consent.consentSource}
                            </p>
                          </div>

                          <Badge className={getStatusColor(consent.status)}>
                            {consent.status}
                          </Badge>

                          <div className="flex items-center gap-2">
                            <Switch
                              checked={consent.consentGiven && consent.status === 'active'}
                              onCheckedChange={(checked) => handleConsentUpdate(consent.id, checked)}
                              disabled={consent.status === 'revoked'}
                            />
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {consent.consentDetails.doubleOptIn && (
                        <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Double opt-in verified
                        </div>
                      )}

                      {consent.revokedDate && (
                        <div className="mt-2 text-xs text-red-600">
                          Revoked: {formatDate(consent.revokedDate)} - {consent.revokedReason}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Subject Requests</CardTitle>
              <CardDescription>
                Handle GDPR data access, portability, and erasure requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataRequests.map((request) => {
                  const daysLeft = getDaysUntilDeadline(request.legalDeadline);
                  
                  return (
                    <Card key={request.id} className={`border-l-4 ${
                      daysLeft < 7 ? 'border-l-red-500' : 
                      daysLeft < 14 ? 'border-l-orange-500' : 
                      'border-l-blue-500'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{request.leadName}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {request.leadEmail}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getPriorityColor(request.priority)}>
                                    {request.priority}
                                  </Badge>
                                  <Badge className={getStatusColor(request.status)}>
                                    {request.status}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Request Type</p>
                                  <p className="text-muted-foreground capitalize">
                                    {request.requestType}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Request Date</p>
                                  <p className="text-muted-foreground">
                                    {formatDate(request.requestDate)}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Legal Deadline</p>
                                  <p className={`${daysLeft < 7 ? 'text-red-600' : daysLeft < 14 ? 'text-orange-600' : 'text-muted-foreground'}`}>
                                    {daysLeft} days left
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium">Request Details</p>
                                <p className="text-sm text-muted-foreground">
                                  {request.requestDetails}
                                </p>
                              </div>

                              {request.responseDetails && (
                                <div>
                                  <p className="text-sm font-medium">Response</p>
                                  <p className="text-sm text-muted-foreground">
                                    {request.responseDetails}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {request.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm"
                                  onClick={() => handleRequestAction(request.id, 'approve')}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Process
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRequestAction(request.id, 'reject')}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Active Policies</span>
                    <Badge>{stats.activePolicies} of {stats.totalPolicies}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Consent Records</span>
                    <Badge>{stats.consentRecords.toLocaleString()}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pending Requests</span>
                    <Badge className={stats.pendingRequests > 5 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}>
                      {stats.pendingRequests}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compliance Score</span>
                    <Badge className="bg-green-100 text-green-800">
                      {stats.complianceScore}%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Run Privacy Audit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export GDPR Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Data Inventory Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataPrivacy;
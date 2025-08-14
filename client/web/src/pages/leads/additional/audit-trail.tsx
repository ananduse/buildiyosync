'use client';

import { useState, useMemo } from 'react';
import { Shield, Eye, Clock, User, Edit, Trash2, Plus, Search, Filter, Download, Calendar, AlertCircle, CheckCircle, XCircle, Settings, FileText, Mail, Phone, MessageSquare, Tag, TrendingUp, BarChart3, Target, Building, MapPin, Star, Database, Zap, RefreshCw } from 'lucide-react';
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

interface AuditLog {
  id: string;
  timestamp: string;
  entityType: 'lead' | 'contact' | 'company' | 'activity' | 'campaign' | 'user' | 'system';
  entityId: string;
  entityName: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'merge' | 'assign' | 'communication' | 'status_change' | 'score_update';
  category: 'data' | 'communication' | 'security' | 'system' | 'workflow' | 'integration' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  details: {
    field?: string;
    oldValue?: any;
    newValue?: any;
    reason?: string;
    source?: string;
    metadata?: { [key: string]: any };
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    ip?: string;
    userAgent?: string;
    location?: string;
  };
  system: {
    version: string;
    module: string;
    sessionId?: string;
    requestId?: string;
    apiEndpoint?: string;
    method?: string;
  };
  compliance: {
    gdprRelevant: boolean;
    dataCategory?: 'personal' | 'sensitive' | 'public' | 'internal';
    retentionPeriod?: number;
    legalBasis?: string;
  };
  tags: string[];
  isReversible: boolean;
  relatedLogs?: string[];
}

interface AuditFilter {
  entityType: string;
  action: string;
  category: string;
  severity: string;
  user: string;
  dateRange: { start: string; end: string };
  searchQuery: string;
}

interface ComplianceReport {
  id: string;
  name: string;
  type: 'gdpr' | 'ccpa' | 'sox' | 'hipaa' | 'custom';
  description: string;
  status: 'generating' | 'ready' | 'expired' | 'failed';
  generatedAt: string;
  periodStart: string;
  periodEnd: string;
  totalRecords: number;
  criticalFindings: number;
  recommendations: string[];
  downloadUrl?: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-03-20T15:30:00Z',
    entityType: 'lead',
    entityId: 'lead-1',
    entityName: 'John Smith - Acme Corp',
    action: 'update',
    category: 'data',
    severity: 'medium',
    description: 'Lead information updated',
    details: {
      field: 'phone',
      oldValue: '+1-555-0123',
      newValue: '+1-555-0124',
      reason: 'Lead provided updated contact information',
      source: 'manual'
    },
    user: {
      id: 'user-1',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Sales Manager',
      ip: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      location: 'New York, NY'
    },
    system: {
      version: '2.1.0',
      module: 'lead-management',
      sessionId: 'sess_abc123',
      requestId: 'req_xyz789',
      apiEndpoint: '/api/leads/lead-1',
      method: 'PUT'
    },
    compliance: {
      gdprRelevant: true,
      dataCategory: 'personal',
      retentionPeriod: 2555, // days
      legalBasis: 'legitimate interest'
    },
    tags: ['lead-update', 'contact-info'],
    isReversible: true,
    relatedLogs: []
  },
  {
    id: '2',
    timestamp: '2024-03-20T14:45:00Z',
    entityType: 'lead',
    entityId: 'lead-2',
    entityName: 'Mike Wilson - TechStart Inc',
    action: 'communication',
    category: 'communication',
    severity: 'low',
    description: 'Email sent to lead',
    details: {
      reason: 'Weekly newsletter campaign',
      source: 'automated',
      metadata: {
        emailTemplate: 'weekly-newsletter-tech',
        campaignId: 'camp-123',
        opened: false,
        clicked: false
      }
    },
    user: {
      id: 'system',
      name: 'System Automation',
      email: 'system@company.com',
      role: 'System',
      ip: '10.0.0.1'
    },
    system: {
      version: '2.1.0',
      module: 'campaign-manager',
      sessionId: 'sess_def456',
      requestId: 'req_uvw123'
    },
    compliance: {
      gdprRelevant: true,
      dataCategory: 'personal',
      retentionPeriod: 1095,
      legalBasis: 'consent'
    },
    tags: ['email', 'automation', 'campaign'],
    isReversible: false
  },
  {
    id: '3',
    timestamp: '2024-03-20T13:20:00Z',
    entityType: 'lead',
    entityId: 'lead-3',
    entityName: 'Sarah Davis - Digital Solutions',
    action: 'score_update',
    category: 'workflow',
    severity: 'medium',
    description: 'Lead score automatically updated',
    details: {
      field: 'score',
      oldValue: 72,
      newValue: 85,
      reason: 'Behavioral scoring update - high engagement detected',
      source: 'automated',
      metadata: {
        scoringModel: 'behavioral-v2.1',
        factors: ['email_opens', 'website_visits', 'content_downloads'],
        confidence: 0.92
      }
    },
    user: {
      id: 'system',
      name: 'Scoring Engine',
      email: 'scoring@company.com',
      role: 'System'
    },
    system: {
      version: '2.1.0',
      module: 'scoring-engine',
      sessionId: 'sess_ghi789'
    },
    compliance: {
      gdprRelevant: false,
      dataCategory: 'internal'
    },
    tags: ['scoring', 'automation', 'behavioral'],
    isReversible: false
  },
  {
    id: '4',
    timestamp: '2024-03-20T12:10:00Z',
    entityType: 'user',
    entityId: 'user-2',
    entityName: 'Alex Brown',
    action: 'view',
    category: 'security',
    severity: 'low',
    description: 'User accessed sensitive lead data',
    details: {
      reason: 'Reviewed lead for qualification assessment',
      source: 'manual',
      metadata: {
        viewedFields: ['financial_info', 'revenue', 'budget'],
        accessReason: 'Sales qualification review',
        dataClassification: 'confidential'
      }
    },
    user: {
      id: 'user-2',
      name: 'Alex Brown',
      email: 'alex@company.com',
      role: 'Sales Rep',
      ip: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (macOS Intel Mac OS X 10.15)',
      location: 'San Francisco, CA'
    },
    system: {
      version: '2.1.0',
      module: 'lead-details',
      sessionId: 'sess_jkl012'
    },
    compliance: {
      gdprRelevant: true,
      dataCategory: 'sensitive',
      retentionPeriod: 2555,
      legalBasis: 'legitimate interest'
    },
    tags: ['data-access', 'sensitive-data', 'qualification'],
    isReversible: false
  },
  {
    id: '5',
    timestamp: '2024-03-20T11:30:00Z',
    entityType: 'system',
    entityId: 'bulk-op-1',
    entityName: 'Weekly Newsletter Campaign',
    action: 'export',
    category: 'compliance',
    severity: 'high',
    description: 'Bulk data export performed',
    details: {
      reason: 'GDPR data subject access request',
      source: 'manual',
      metadata: {
        recordCount: 1250,
        exportFormat: 'CSV',
        encryptionUsed: true,
        dataTypes: ['personal_info', 'communication_history'],
        legalRequestId: 'GDPR-REQ-2024-0156'
      }
    },
    user: {
      id: 'user-3',
      name: 'Lisa Wilson',
      email: 'lisa@company.com',
      role: 'Compliance Officer',
      ip: '192.168.1.110',
      location: 'London, UK'
    },
    system: {
      version: '2.1.0',
      module: 'compliance-manager',
      sessionId: 'sess_mno345'
    },
    compliance: {
      gdprRelevant: true,
      dataCategory: 'personal',
      retentionPeriod: 3650,
      legalBasis: 'legal obligation'
    },
    tags: ['gdpr', 'export', 'compliance', 'data-subject-request'],
    isReversible: false
  }
];

const mockComplianceReports: ComplianceReport[] = [
  {
    id: '1',
    name: 'GDPR Compliance Report - March 2024',
    type: 'gdpr',
    description: 'Monthly GDPR compliance assessment including data processing activities and consent tracking',
    status: 'ready',
    generatedAt: '2024-03-21T09:00:00Z',
    periodStart: '2024-03-01T00:00:00Z',
    periodEnd: '2024-03-31T23:59:59Z',
    totalRecords: 15234,
    criticalFindings: 3,
    recommendations: [
      'Update privacy policy to reflect new data processing activities',
      'Implement automated consent renewal for leads older than 2 years',
      'Review and document legal basis for behavioural profiling'
    ],
    downloadUrl: '/reports/gdpr-march-2024.pdf'
  },
  {
    id: '2',
    name: 'Data Access Log - Q1 2024',
    type: 'custom',
    description: 'Quarterly review of sensitive data access patterns and anomaly detection',
    status: 'generating',
    generatedAt: '2024-03-20T16:30:00Z',
    periodStart: '2024-01-01T00:00:00Z',
    periodEnd: '2024-03-31T23:59:59Z',
    totalRecords: 0,
    criticalFindings: 0,
    recommendations: []
  }
];

const actionColors = {
  create: 'bg-green-100 text-green-800 border-green-200',
  update: 'bg-blue-100 text-blue-800 border-blue-200',
  delete: 'bg-red-100 text-red-800 border-red-200',
  view: 'bg-gray-100 text-gray-800 border-gray-200',
  export: 'bg-purple-100 text-purple-800 border-purple-200',
  import: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  merge: 'bg-orange-100 text-orange-800 border-orange-200',
  assign: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  communication: 'bg-pink-100 text-pink-800 border-pink-200',
  status_change: 'bg-teal-100 text-teal-800 border-teal-200',
  score_update: 'bg-cyan-100 text-cyan-800 border-cyan-200'
};

const categoryColors = {
  data: 'bg-blue-100 text-blue-800 border-blue-200',
  communication: 'bg-green-100 text-green-800 border-green-200',
  security: 'bg-red-100 text-red-800 border-red-200',
  system: 'bg-gray-100 text-gray-800 border-gray-200',
  workflow: 'bg-purple-100 text-purple-800 border-purple-200',
  integration: 'bg-orange-100 text-orange-800 border-orange-200',
  compliance: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const severityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
};

const entityTypeColors = {
  lead: 'bg-blue-100 text-blue-800 border-blue-200',
  contact: 'bg-green-100 text-green-800 border-green-200',
  company: 'bg-purple-100 text-purple-800 border-purple-200',
  activity: 'bg-orange-100 text-orange-800 border-orange-200',
  campaign: 'bg-pink-100 text-pink-800 border-pink-200',
  user: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  system: 'bg-gray-100 text-gray-800 border-gray-200'
};

const reportStatusColors = {
  generating: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  ready: 'bg-green-100 text-green-800 border-green-200',
  expired: 'bg-gray-100 text-gray-800 border-gray-200',
  failed: 'bg-red-100 text-red-800 border-red-200'
};

export default function AuditTrail() {
  const [selectedTab, setSelectedTab] = useState('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter(log => {
      const matchesSearch = log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           log.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           log.user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesEntityType = entityTypeFilter === 'all' || log.entityType === entityTypeFilter;
      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      const matchesUser = userFilter === 'all' || log.user.id === userFilter;
      
      let matchesDateRange = true;
      if (dateRange.start && dateRange.end) {
        const logDate = new Date(log.timestamp);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        matchesDateRange = logDate >= startDate && logDate <= endDate;
      }
      
      return matchesSearch && matchesEntityType && matchesAction && matchesCategory && 
             matchesSeverity && matchesUser && matchesDateRange;
    });
  }, [searchQuery, entityTypeFilter, actionFilter, categoryFilter, severityFilter, userFilter, dateRange]);

  const auditStats = useMemo(() => {
    const total = mockAuditLogs.length;
    const critical = mockAuditLogs.filter(log => log.severity === 'critical').length;
    const high = mockAuditLogs.filter(log => log.severity === 'high').length;
    const gdprRelevant = mockAuditLogs.filter(log => log.compliance.gdprRelevant).length;
    const systemActions = mockAuditLogs.filter(log => log.user.id === 'system').length;
    const uniqueUsers = new Set(mockAuditLogs.map(log => log.user.id)).size;
    const dataChanges = mockAuditLogs.filter(log => log.category === 'data').length;
    const securityEvents = mockAuditLogs.filter(log => log.category === 'security').length;
    
    return { total, critical, high, gdprRelevant, systemActions, uniqueUsers, dataChanges, securityEvents };
  }, []);

  const AuditLogCard = ({ log }: { log: AuditLog }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedLog(log)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{log.entityName}</h3>
              <Badge className={entityTypeColors[log.entityType]}>{log.entityType}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{log.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{new Date(log.timestamp).toLocaleString()}</span>
              <User className="h-4 w-4 ml-2" />
              <span>{log.user.name}</span>
              <span>({log.user.role})</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={severityColors[log.severity]}>{log.severity}</Badge>
            <div className="text-sm text-gray-500">ID: {log.id}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Badge className={actionColors[log.action]}>{log.action}</Badge>
          <Badge className={categoryColors[log.category]}>{log.category}</Badge>
          {log.compliance.gdprRelevant && (
            <Badge variant="outline" className="text-xs">GDPR</Badge>
          )}
          {log.isReversible && (
            <Badge variant="outline" className="text-xs">Reversible</Badge>
          )}
        </div>
        
        {log.details.field && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="text-sm">
              <div className="font-medium mb-1">Field Changed: {log.details.field}</div>
              {log.details.oldValue && (
                <div className="text-gray-600">
                  <span className="line-through">Old: {String(log.details.oldValue)}</span>
                </div>
              )}
              <div className="text-green-600">
                New: {String(log.details.newValue)}
              </div>
              {log.details.reason && (
                <div className="text-gray-600 mt-1">
                  Reason: {log.details.reason}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {log.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
            {log.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">+{log.tags.length - 3}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {log.user.ip && (
              <>
                <span>{log.user.ip}</span>
                {log.user.location && (
                  <>
                    <span>•</span>
                    <span>{log.user.location}</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ComplianceReportCard = ({ report }: { report: ComplianceReport }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{report.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{report.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(report.periodStart).toLocaleDateString()} - {new Date(report.periodEnd).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={reportStatusColors[report.status]}>{report.status}</Badge>
            <div className="text-sm text-gray-500 capitalize">{report.type}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{report.totalRecords.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Records</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{report.criticalFindings}</div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{report.recommendations.length}</div>
            <div className="text-xs text-gray-600">Actions</div>
          </div>
        </div>
        
        {report.recommendations.length > 0 && (
          <div className="space-y-2 mb-4">
            <div className="text-sm font-medium">Top Recommendations:</div>
            <div className="space-y-1">
              {report.recommendations.slice(0, 2).map((rec, index) => (
                <div key={index} className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                  • {rec}
                </div>
              ))}
              {report.recommendations.length > 2 && (
                <div className="text-sm text-gray-500">
                  +{report.recommendations.length - 2} more recommendations
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Generated: {new Date(report.generatedAt).toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            {report.status === 'ready' && report.downloadUrl && (
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{auditStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Critical Events</p>
                <p className="text-2xl font-bold text-gray-900">{auditStats.critical}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">GDPR Events</p>
                <p className="text-2xl font-bold text-gray-900">{auditStats.gdprRelevant}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{auditStats.uniqueUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                mockAuditLogs.reduce((acc, log) => {
                  acc[log.category] = (acc[log.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className={categoryColors[category as keyof typeof categoryColors]}>
                      {category}
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
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                mockAuditLogs.reduce((acc, log) => {
                  const userName = log.user.name;
                  if (!acc[userName]) {
                    acc[userName] = { count: 0, role: log.user.role };
                  }
                  acc[userName].count++;
                  return acc;
                }, {} as Record<string, { count: number; role: string }>)
              )
              .sort(([,a], [,b]) => b.count - a.count)
              .slice(0, 5)
              .map(([userName, data]) => (
                <div key={userName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-gray-600">{data.role}</p>
                  </div>
                  <span className="font-medium">{data.count} events</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Security Events Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAuditLogs
              .filter(log => log.category === 'security' || log.severity === 'high' || log.severity === 'critical')
              .slice(0, 8)
              .map(log => (
                <div key={log.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{log.description}</span>
                      <Badge className={severityColors[log.severity]}>{log.severity}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {log.entityName} • {log.user.name} • {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedLog(log)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ExportDialog = () => (
    <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Export Audit Logs</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exportFormat">Export Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['Timestamp', 'Entity', 'Action', 'User', 'IP Address', 'Details', 'Compliance Info', 'System Info'].map(field => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox defaultChecked />
                  <Label>{field}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label>Filter Options</Label>
            <div className="space-y-3 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>Only GDPR-relevant events</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>Only security events</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>Only high/critical severity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox defaultChecked />
                <Label>Encrypt export file</Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsExportDialogOpen(false)}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
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
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
              <p className="text-gray-600">Track and monitor all system activities</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="security">Security Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search audit logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Entity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="data">Data</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {filteredLogs.length} events
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredLogs.map(log => (
                <AuditLogCard key={log.id} log={log} />
              ))}
              {filteredLogs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No audit logs found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Compliance Reports</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            
            <div className="grid gap-6">
              {mockComplianceReports.map(report => (
                <ComplianceReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Security Events</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {mockAuditLogs.filter(log => log.category === 'security').length} security events
                </Badge>
                <Badge variant="outline">
                  {mockAuditLogs.filter(log => log.severity === 'critical').length} critical
                </Badge>
              </div>
            </div>
            
            <div className="grid gap-4">
              {mockAuditLogs
                .filter(log => log.category === 'security' || log.severity === 'high' || log.severity === 'critical')
                .map(log => (
                  <AuditLogCard key={log.id} log={log} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsView />
          </TabsContent>
        </Tabs>
      </div>

      <ExportDialog />

      {selectedLog && (
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Audit Log Details</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Event Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>ID:</strong> {selectedLog.id}</div>
                      <div><strong>Timestamp:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</div>
                      <div><strong>Entity:</strong> {selectedLog.entityName}</div>
                      <div><strong>Description:</strong> {selectedLog.description}</div>
                      <div className="flex items-center gap-2">
                        <strong>Badges:</strong>
                        <Badge className={entityTypeColors[selectedLog.entityType]}>{selectedLog.entityType}</Badge>
                        <Badge className={actionColors[selectedLog.action]}>{selectedLog.action}</Badge>
                        <Badge className={categoryColors[selectedLog.category]}>{selectedLog.category}</Badge>
                        <Badge className={severityColors[selectedLog.severity]}>{selectedLog.severity}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>User Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {selectedLog.user.name}</div>
                      <div><strong>Email:</strong> {selectedLog.user.email}</div>
                      <div><strong>Role:</strong> {selectedLog.user.role}</div>
                      {selectedLog.user.ip && <div><strong>IP Address:</strong> {selectedLog.user.ip}</div>}
                      {selectedLog.user.location && <div><strong>Location:</strong> {selectedLog.user.location}</div>}
                      {selectedLog.user.userAgent && (
                        <div><strong>User Agent:</strong> {selectedLog.user.userAgent}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>System Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>Version:</strong> {selectedLog.system.version}</div>
                      <div><strong>Module:</strong> {selectedLog.system.module}</div>
                      {selectedLog.system.sessionId && <div><strong>Session ID:</strong> {selectedLog.system.sessionId}</div>}
                      {selectedLog.system.requestId && <div><strong>Request ID:</strong> {selectedLog.system.requestId}</div>}
                      {selectedLog.system.apiEndpoint && <div><strong>API Endpoint:</strong> {selectedLog.system.apiEndpoint}</div>}
                      {selectedLog.system.method && <div><strong>Method:</strong> {selectedLog.system.method}</div>}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Change Details</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      {selectedLog.details.field && <div><strong>Field:</strong> {selectedLog.details.field}</div>}
                      {selectedLog.details.oldValue && (
                        <div>
                          <strong>Old Value:</strong>
                          <div className="bg-red-50 p-2 rounded mt-1 text-red-800">
                            {JSON.stringify(selectedLog.details.oldValue, null, 2)}
                          </div>
                        </div>
                      )}
                      {selectedLog.details.newValue && (
                        <div>
                          <strong>New Value:</strong>
                          <div className="bg-green-50 p-2 rounded mt-1 text-green-800">
                            {JSON.stringify(selectedLog.details.newValue, null, 2)}
                          </div>
                        </div>
                      )}
                      {selectedLog.details.reason && <div><strong>Reason:</strong> {selectedLog.details.reason}</div>}
                      {selectedLog.details.source && <div><strong>Source:</strong> {selectedLog.details.source}</div>}
                    </div>
                  </div>
                </div>
                
                {selectedLog.details.metadata && (
                  <div>
                    <Label>Metadata</Label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm whitespace-pre-wrap">
                        {JSON.stringify(selectedLog.details.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                
                <div>
                  <Label>Compliance Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>GDPR Relevant:</strong> {selectedLog.compliance.gdprRelevant ? 'Yes' : 'No'}</div>
                      {selectedLog.compliance.dataCategory && (
                        <div><strong>Data Category:</strong> {selectedLog.compliance.dataCategory}</div>
                      )}
                      {selectedLog.compliance.retentionPeriod && (
                        <div><strong>Retention Period:</strong> {selectedLog.compliance.retentionPeriod} days</div>
                      )}
                      {selectedLog.compliance.legalBasis && (
                        <div><strong>Legal Basis:</strong> {selectedLog.compliance.legalBasis}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Tags & Attributes</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {selectedLog.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="text-sm">
                        <div><strong>Reversible:</strong> {selectedLog.isReversible ? 'Yes' : 'No'}</div>
                        {selectedLog.relatedLogs && selectedLog.relatedLogs.length > 0 && (
                          <div><strong>Related Logs:</strong> {selectedLog.relatedLogs.length}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export Event
              </Button>
              {selectedLog.isReversible && (
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Revert Change
                </Button>
              )}
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                View Related
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
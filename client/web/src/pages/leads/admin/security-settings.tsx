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
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  Mail,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  Save,
  RefreshCw,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Copy,
  MoreVertical,
  Search,
  Filter,
  Bell,
  BellOff,
  Users,
  User,
  Building,
  Database,
  Server,
  Wifi,
  Router,
  Activity,
  BarChart3,
  TrendingUp,
  Zap,
  Target,
  Flag,
  Hash,
  Link2,
  ExternalLink,
  FileText,
  HelpCircle,
  Wrench,
  Cog,
  Monitor,
  MousePointer,
  Keyboard,
  Calendar,
  Timer,
  History,
  Archive,
  Cpu,
  HardDrive,
  MemoryStick,
  NetworkIcon
} from 'lucide-react';

interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  category: 'authentication' | 'authorization' | 'encryption' | 'network' | 'data' | 'session' | 'audit';
  isActive: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  rules: SecurityRule[];
  enforcement: 'strict' | 'moderate' | 'permissive';
  exceptions: string[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  stats: {
    violationCount: number;
    lastViolation?: string;
    complianceRate: number;
  };
}

interface SecurityRule {
  id: string;
  type: 'password_policy' | 'session_timeout' | 'ip_whitelist' | 'rate_limit' | 'encryption_requirement';
  parameters: Record<string, any>;
  enabled: boolean;
}

interface TwoFactorSettings {
  enabled: boolean;
  required: boolean;
  methods: Array<{
    type: 'sms' | 'email' | 'totp' | 'backup_codes';
    enabled: boolean;
    default: boolean;
  }>;
  backupCodes: {
    generated: boolean;
    count: number;
    lastGenerated?: string;
  };
  trustedDevices: {
    enabled: boolean;
    duration: number;
    maxDevices: number;
  };
}

interface IPWhitelist {
  id: string;
  name: string;
  ipAddress: string;
  subnet?: string;
  description: string;
  createdBy: string;
  createdAt: string;
  isActive: boolean;
  lastUsed?: string;
  usage: {
    totalRequests: number;
    lastRequest?: string;
  };
}

interface SecurityAlert {
  id: string;
  type: 'policy_violation' | 'suspicious_activity' | 'failed_authentication' | 'configuration_change';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  status: 'open' | 'acknowledged' | 'resolved';
  affectedUser?: string;
  ipAddress?: string;
  details: Record<string, any>;
  recommendations: string[];
}

interface SecurityStats {
  overallScore: number;
  activePolicies: number;
  totalViolations: number;
  criticalAlerts: number;
  twoFactorAdoption: number;
  encryptionCoverage: number;
  lastSecurityAudit: string;
  complianceStatus: 'compliant' | 'warning' | 'non_compliant';
}

const SecuritySettings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false);

  // Mock security policies
  const securityPolicies: SecurityPolicy[] = [
    {
      id: 'policy-001',
      name: 'Strong Password Requirements',
      description: 'Enforce strong password policies for all users',
      category: 'authentication',
      isActive: true,
      severity: 'high',
      rules: [
        {
          id: 'rule-001',
          type: 'password_policy',
          parameters: {
            minLength: 12,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            preventReuse: 5,
            maxAge: 90
          },
          enabled: true
        }
      ],
      enforcement: 'strict',
      exceptions: [],
      createdBy: 'security@company.com',
      createdAt: '2024-01-01T10:00:00Z',
      stats: {
        violationCount: 23,
        lastViolation: '2024-01-17T14:30:00Z',
        complianceRate: 92.3
      }
    },
    {
      id: 'policy-002',
      name: 'Session Security',
      description: 'Manage user session security and timeouts',
      category: 'session',
      isActive: true,
      severity: 'medium',
      rules: [
        {
          id: 'rule-002',
          type: 'session_timeout',
          parameters: {
            idleTimeout: 1800,
            absoluteTimeout: 28800,
            concurrentSessions: 3,
            requireReauth: true
          },
          enabled: true
        }
      ],
      enforcement: 'moderate',
      exceptions: ['admin@company.com'],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-02T11:30:00Z',
      stats: {
        violationCount: 45,
        lastViolation: '2024-01-18T09:15:00Z',
        complianceRate: 87.6
      }
    },
    {
      id: 'policy-003',
      name: 'IP Address Restrictions',
      description: 'Control access based on IP address whitelist',
      category: 'network',
      isActive: true,
      severity: 'critical',
      rules: [
        {
          id: 'rule-003',
          type: 'ip_whitelist',
          parameters: {
            enforceWhitelist: true,
            allowVPN: false,
            blockTor: true,
            geoBlocking: ['CN', 'RU', 'KP']
          },
          enabled: true
        }
      ],
      enforcement: 'strict',
      exceptions: [],
      createdBy: 'security@company.com',
      createdAt: '2024-01-03T15:45:00Z',
      stats: {
        violationCount: 156,
        lastViolation: '2024-01-18T16:20:00Z',
        complianceRate: 94.8
      }
    },
    {
      id: 'policy-004',
      name: 'Data Encryption Standards',
      description: 'Ensure all sensitive data is encrypted',
      category: 'encryption',
      isActive: true,
      severity: 'critical',
      rules: [
        {
          id: 'rule-004',
          type: 'encryption_requirement',
          parameters: {
            transitEncryption: 'TLS1.3',
            restEncryption: 'AES-256',
            keyRotation: 90,
            hashing: 'bcrypt'
          },
          enabled: true
        }
      ],
      enforcement: 'strict',
      exceptions: [],
      createdBy: 'security@company.com',
      createdAt: '2024-01-04T12:20:00Z',
      stats: {
        violationCount: 2,
        lastViolation: '2024-01-10T08:30:00Z',
        complianceRate: 99.8
      }
    }
  ];

  // Mock 2FA settings
  const twoFactorSettings: TwoFactorSettings = {
    enabled: true,
    required: false,
    methods: [
      { type: 'totp', enabled: true, default: true },
      { type: 'sms', enabled: true, default: false },
      { type: 'email', enabled: true, default: false },
      { type: 'backup_codes', enabled: true, default: false }
    ],
    backupCodes: {
      generated: true,
      count: 8,
      lastGenerated: '2024-01-15T10:30:00Z'
    },
    trustedDevices: {
      enabled: true,
      duration: 30,
      maxDevices: 5
    }
  };

  // Mock IP whitelist
  const ipWhitelist: IPWhitelist[] = [
    {
      id: 'ip-001',
      name: 'Office Network',
      ipAddress: '192.168.1.0',
      subnet: '/24',
      description: 'Main office network range',
      createdBy: 'admin@company.com',
      createdAt: '2024-01-01T10:00:00Z',
      isActive: true,
      lastUsed: '2024-01-18T16:45:00Z',
      usage: {
        totalRequests: 45678,
        lastRequest: '2024-01-18T16:45:00Z'
      }
    },
    {
      id: 'ip-002',
      name: 'Remote Office VPN',
      ipAddress: '10.0.0.0',
      subnet: '/16',
      description: 'VPN access for remote workers',
      createdBy: 'network@company.com',
      createdAt: '2024-01-05T14:20:00Z',
      isActive: true,
      lastUsed: '2024-01-18T15:30:00Z',
      usage: {
        totalRequests: 12345,
        lastRequest: '2024-01-18T15:30:00Z'
      }
    }
  ];

  // Mock security alerts
  const securityAlerts: SecurityAlert[] = [
    {
      id: 'alert-001',
      type: 'policy_violation',
      severity: 'medium',
      title: 'Password Policy Violation',
      description: 'User attempted to set weak password',
      timestamp: '2024-01-18T14:30:00Z',
      status: 'open',
      affectedUser: 'user-123',
      details: {
        policy: 'Strong Password Requirements',
        violation: 'Password length insufficient'
      },
      recommendations: [
        'Notify user of password requirements',
        'Force password reset on next login'
      ]
    },
    {
      id: 'alert-002',
      type: 'suspicious_activity',
      severity: 'high',
      title: 'Multiple Failed Login Attempts',
      description: 'Unusual login pattern detected',
      timestamp: '2024-01-18T13:15:00Z',
      status: 'acknowledged',
      affectedUser: 'user-456',
      ipAddress: '203.0.113.42',
      details: {
        attempts: 8,
        timespan: '10 minutes',
        locations: ['London, UK', 'New York, US']
      },
      recommendations: [
        'Temporarily lock account',
        'Require additional authentication',
        'Investigate IP address'
      ]
    }
  ];

  // Mock stats
  const stats: SecurityStats = {
    overallScore: 89.5,
    activePolicies: 12,
    totalViolations: 234,
    criticalAlerts: 3,
    twoFactorAdoption: 78.4,
    encryptionCoverage: 99.2,
    lastSecurityAudit: '2024-01-15T10:00:00Z',
    complianceStatus: 'compliant'
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return Key;
      case 'authorization': return Shield;
      case 'encryption': return Lock;
      case 'network': return Globe;
      case 'data': return Database;
      case 'session': return Clock;
      case 'audit': return Activity;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'authentication': return 'bg-blue-100 text-blue-800';
      case 'authorization': return 'bg-green-100 text-green-800';
      case 'encryption': return 'bg-purple-100 text-purple-800';
      case 'network': return 'bg-orange-100 text-orange-800';
      case 'data': return 'bg-red-100 text-red-800';
      case 'session': return 'bg-yellow-100 text-yellow-800';
      case 'audit': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'non_compliant': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePolicyToggle = (policyId: string) => {
    console.log('Toggling policy:', policyId);
  };

  const handleIPToggle = (ipId: string) => {
    console.log('Toggling IP:', ipId);
  };

  const handleAlertAction = (alertId: string, action: string) => {
    console.log('Alert action:', alertId, action);
  };

  const runSecurityAudit = () => {
    console.log('Running security audit');
  };

  const generateBackupCodes = () => {
    console.log('Generating backup codes');
  };

  const resetSecuritySettings = () => {
    console.log('Resetting security settings');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system security policies and access controls
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={runSecurityAudit}>
            <Shield className="h-4 w-4 mr-2" />
            Security Audit
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </div>
      </div>

      {/* Security Score Card */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <ShieldCheck className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Security Score: {stats.overallScore}/100</h2>
                <p className={`text-sm font-medium ${getComplianceColor(stats.complianceStatus)}`}>
                  Status: {stats.complianceStatus.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-lg font-bold">{stats.activePolicies}</p>
                <p className="text-xs text-muted-foreground">Active Policies</p>
              </div>
              <div>
                <p className="text-lg font-bold">{stats.twoFactorAdoption}%</p>
                <p className="text-xs text-muted-foreground">2FA Adoption</p>
              </div>
              <div>
                <p className="text-lg font-bold">{stats.encryptionCoverage}%</p>
                <p className="text-xs text-muted-foreground">Encryption Coverage</p>
              </div>
              <div>
                <p className="text-lg font-bold">{stats.criticalAlerts}</p>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="network">Network Security</TabsTrigger>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="audit">Audit & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityPolicies.slice(0, 4).map((policy) => {
                    const CategoryIcon = getCategoryIcon(policy.category);
                    return (
                      <div key={policy.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">{policy.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {policy.stats.complianceRate}% compliant
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(policy.severity)}>
                            {policy.severity}
                          </Badge>
                          <Switch
                            checked={policy.isActive}
                            onCheckedChange={() => handlePolicyToggle(policy.id)}
                            size="sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Security Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 border rounded">
                      <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                        alert.severity === 'critical' ? 'text-red-500' :
                        alert.severity === 'high' ? 'text-orange-500' :
                        alert.severity === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {alert.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(alert.timestamp)}
                        </p>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>
                Configure and manage system security policies
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                  <option value="authentication">Authentication</option>
                  <option value="authorization">Authorization</option>
                  <option value="encryption">Encryption</option>
                  <option value="network">Network</option>
                  <option value="session">Session</option>
                  <option value="audit">Audit</option>
                </select>

                <Button onClick={() => setIsCreatingPolicy(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Policy
                </Button>
              </div>

              <div className="space-y-4">
                {securityPolicies.map((policy) => {
                  const CategoryIcon = getCategoryIcon(policy.category);
                  
                  return (
                    <Card key={policy.id}>
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
                                  <Badge className={getSeverityColor(policy.severity)}>
                                    {policy.severity}
                                  </Badge>
                                  <Badge className={policy.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {policy.isActive ? 'Active' : 'Inactive'}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <p className="font-medium">Enforcement</p>
                                  <p className="text-muted-foreground capitalize">{policy.enforcement}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Compliance Rate</p>
                                  <p className="text-muted-foreground">{policy.stats.complianceRate}%</p>
                                </div>
                                <div>
                                  <p className="font-medium">Violations</p>
                                  <p className="text-muted-foreground">{policy.stats.violationCount}</p>
                                </div>
                              </div>

                              {policy.rules.length > 0 && (
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Active Rules:</p>
                                  <div className="flex gap-2 flex-wrap">
                                    {policy.rules.map((rule) => (
                                      <Badge key={rule.id} variant="outline" className="text-xs">
                                        {rule.type.replace('_', ' ').toLowerCase()}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
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

        <TabsContent value="authentication" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Configure multi-factor authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to enable two-factor authentication
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorSettings.enabled}
                    onCheckedChange={() => {}}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Make two-factor authentication mandatory
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorSettings.required}
                    onCheckedChange={() => {}}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Authentication Methods</Label>
                  {twoFactorSettings.methods.map((method) => (
                    <div key={method.type} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        {method.type === 'totp' && <Smartphone className="h-4 w-4" />}
                        {method.type === 'sms' && <Smartphone className="h-4 w-4" />}
                        {method.type === 'email' && <Mail className="h-4 w-4" />}
                        {method.type === 'backup_codes' && <Key className="h-4 w-4" />}
                        <span className="capitalize">
                          {method.type === 'totp' ? 'Authenticator App' : method.type.replace('_', ' ')}
                        </span>
                        {method.default && <Badge variant="outline">Default</Badge>}
                      </div>
                      <Switch
                        checked={method.enabled}
                        onCheckedChange={() => {}}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label>Backup Codes</Label>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="text-sm font-medium">
                        {twoFactorSettings.backupCodes.count} codes available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Generated: {formatDate(twoFactorSettings.backupCodes.lastGenerated!)}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" onClick={generateBackupCodes}>
                      Regenerate
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Trusted Devices</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="trust-duration">Trust Duration (days)</Label>
                      <Input
                        id="trust-duration"
                        type="number"
                        defaultValue={twoFactorSettings.trustedDevices.duration}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-devices">Max Devices</Label>
                      <Input
                        id="max-devices"
                        type="number"
                        defaultValue={twoFactorSettings.trustedDevices.maxDevices}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
                <CardDescription>
                  Configure password requirements and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="min-length">Minimum Length</Label>
                  <Input
                    id="min-length"
                    type="number"
                    defaultValue="12"
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Uppercase Letters</Label>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Lowercase Letters</Label>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Numbers</Label>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Special Characters</Label>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label htmlFor="prevent-reuse">Prevent Password Reuse (last N passwords)</Label>
                  <Input
                    id="prevent-reuse"
                    type="number"
                    defaultValue="5"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="max-age">Password Max Age (days)</Label>
                  <Input
                    id="max-age"
                    type="number"
                    defaultValue="90"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="lockout-attempts">Lockout After Failed Attempts</Label>
                  <Input
                    id="lockout-attempts"
                    type="number"
                    defaultValue="5"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                  <Input
                    id="lockout-duration"
                    type="number"
                    defaultValue="30"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>IP Address Whitelist</CardTitle>
              <CardDescription>
                Manage allowed IP addresses and network ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search IP addresses..."
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add IP Range
                </Button>
              </div>

              <div className="space-y-3">
                {ipWhitelist.map((ip) => (
                  <Card key={ip.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-blue-100 rounded">
                            <Globe className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {ip.name} - {ip.ipAddress}{ip.subnet}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ip.description}
                            </p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span>Created: {formatDate(ip.createdAt)}</span>
                              <span>Requests: {ip.usage.totalRequests.toLocaleString()}</span>
                              {ip.lastUsed && (
                                <span>Last used: {formatDate(ip.lastUsed)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={ip.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {ip.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={ip.isActive}
                            onCheckedChange={() => handleIPToggle(ip.id)}
                          />
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
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

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>
                Active security alerts requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <Card key={alert.id} className={`border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500' :
                    alert.severity === 'high' ? 'border-l-orange-500' :
                    alert.severity === 'medium' ? 'border-l-yellow-500' :
                    'border-l-blue-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                            alert.severity === 'critical' ? 'text-red-500' :
                            alert.severity === 'high' ? 'text-orange-500' :
                            alert.severity === 'medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-medium">{alert.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                              <div>
                                <p className="font-medium">Affected User</p>
                                <p className="text-muted-foreground">
                                  {alert.affectedUser || 'N/A'}
                                </p>
                              </div>
                              {alert.ipAddress && (
                                <div>
                                  <p className="font-medium">IP Address</p>
                                  <p className="text-muted-foreground">{alert.ipAddress}</p>
                                </div>
                              )}
                            </div>

                            <div className="mt-3">
                              <p className="font-medium text-sm mb-1">Recommendations:</p>
                              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                {alert.recommendations.map((rec, index) => (
                                  <li key={index}>{rec}</li>
                                ))}
                              </ul>
                            </div>

                            <p className="text-xs text-muted-foreground mt-3">
                              {formatDate(alert.timestamp)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          {alert.status === 'open' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                              >
                                Acknowledge
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAlertAction(alert.id, 'resolve')}
                              >
                                Resolve
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-3 w-3" />
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

        <TabsContent value="audit" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Security Score</span>
                    <Badge className="bg-green-100 text-green-800">
                      {stats.overallScore}/100
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compliance Status</span>
                    <Badge className={stats.complianceStatus === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {stats.complianceStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Audit</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(stats.lastSecurityAudit)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Violations</span>
                    <Badge className={stats.totalViolations > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {stats.totalViolations}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={runSecurityAudit}>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Audit
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Security Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={resetSecuritySettings}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>
                Global security settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Security Logging</Label>
                      <p className="text-sm text-muted-foreground">
                        Log all security-related events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Real-time Monitoring</Label>
                      <p className="text-sm text-muted-foreground">
                        Monitor security events in real-time
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Threat Response</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically respond to threats
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Send Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Email notifications for security events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="audit-retention">Audit Log Retention (days)</Label>
                    <Input
                      id="audit-retention"
                      type="number"
                      defaultValue="365"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="threat-threshold">Threat Detection Threshold</Label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md">
                      <option value="low">Low</option>
                      <option value="medium" selected>Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="notification-email">Security Notification Email</Label>
                    <Input
                      id="notification-email"
                      type="email"
                      defaultValue="security@company.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="backup-frequency">Config Backup Frequency</Label>
                    <select className="w-full mt-1 px-3 py-2 border rounded-md">
                      <option value="daily">Daily</option>
                      <option value="weekly" selected>Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
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

export default SecuritySettings;
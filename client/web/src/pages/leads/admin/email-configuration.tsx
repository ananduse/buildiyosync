import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Mail,
  Send,
  Settings,
  TestTube,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  Copy,
  Edit,
  Trash2,
  Plus,
  Server,
  Lock,
  Key,
  Globe,
  Clock,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Image,
  Link,
  Zap,
  Bell,
  Filter,
  Search,
  Upload,
  Download
} from 'lucide-react';

interface EmailProvider {
  id: string;
  name: string;
  type: 'smtp' | 'api' | 'service';
  isActive: boolean;
  isDefault: boolean;
  config: {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    apiKey?: string;
    encryption?: 'tls' | 'ssl' | 'none';
    authentication?: boolean;
  };
  limits: {
    dailyLimit: number;
    hourlyLimit: number;
    monthlyLimit: number;
    currentUsage: number;
  };
  stats: {
    totalSent: number;
    delivered: number;
    bounced: number;
    complaints: number;
    reputation: number;
  };
  createdAt: string;
  lastUsed?: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'welcome' | 'followup' | 'proposal' | 'reminder' | 'notification' | 'custom';
  isActive: boolean;
  language: string;
  content: {
    html: string;
    text: string;
  };
  variables: string[];
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    openRate: number;
    clickRate: number;
  };
  createdBy: string;
  createdAt: string;
  lastUsed?: string;
}

const EmailConfiguration: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('providers');
  const [showPasswords, setShowPasswords] = useState(false);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Mock email providers
  const emailProviders: EmailProvider[] = [
    {
      id: 'provider-001',
      name: 'Primary SMTP Server',
      type: 'smtp',
      isActive: true,
      isDefault: true,
      config: {
        host: 'smtp.company.com',
        port: 587,
        username: 'noreply@company.com',
        password: '********',
        encryption: 'tls',
        authentication: true
      },
      limits: {
        dailyLimit: 10000,
        hourlyLimit: 500,
        monthlyLimit: 250000,
        currentUsage: 2456
      },
      stats: {
        totalSent: 15487,
        delivered: 14523,
        bounced: 234,
        complaints: 12,
        reputation: 98.5
      },
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-18T14:30:00Z'
    },
    {
      id: 'provider-002',
      name: 'SendGrid API',
      type: 'api',
      isActive: true,
      isDefault: false,
      config: {
        apiKey: 'SG.************************',
        host: 'api.sendgrid.com'
      },
      limits: {
        dailyLimit: 40000,
        hourlyLimit: 2000,
        monthlyLimit: 1000000,
        currentUsage: 8932
      },
      stats: {
        totalSent: 45632,
        delivered: 44128,
        bounced: 891,
        complaints: 45,
        reputation: 96.8
      },
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-18T12:15:00Z'
    },
    {
      id: 'provider-003',
      name: 'Backup SMTP',
      type: 'smtp',
      isActive: false,
      isDefault: false,
      config: {
        host: 'backup.smtp.com',
        port: 465,
        username: 'backup@company.com',
        password: '********',
        encryption: 'ssl',
        authentication: true
      },
      limits: {
        dailyLimit: 5000,
        hourlyLimit: 200,
        monthlyLimit: 100000,
        currentUsage: 0
      },
      stats: {
        totalSent: 0,
        delivered: 0,
        bounced: 0,
        complaints: 0,
        reputation: 100
      },
      createdAt: '2024-01-01T00:00:00Z'
    }
  ];

  // Mock email templates
  const emailTemplates: EmailTemplate[] = [
    {
      id: 'template-001',
      name: 'Lead Welcome Email',
      subject: 'Welcome to BuildCorp - Thank you for your inquiry!',
      category: 'welcome',
      isActive: true,
      language: 'en',
      content: {
        html: '<h1>Welcome {{name}}!</h1><p>Thank you for reaching out about your {{projectType}} project...</p>',
        text: 'Welcome {{name}}! Thank you for reaching out about your {{projectType}} project...'
      },
      variables: ['name', 'projectType', 'budget', 'timeline'],
      stats: {
        sent: 1234,
        opened: 987,
        clicked: 234,
        converted: 89,
        openRate: 80.0,
        clickRate: 18.9
      },
      createdBy: 'admin@company.com',
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-18T10:30:00Z'
    },
    {
      id: 'template-002',
      name: 'Follow-up Reminder',
      subject: 'Following up on your {{projectType}} project',
      category: 'followup',
      isActive: true,
      language: 'en',
      content: {
        html: '<p>Hi {{name}},</p><p>I wanted to follow up on our conversation about your {{projectType}} project...</p>',
        text: 'Hi {{name}}, I wanted to follow up on our conversation about your {{projectType}} project...'
      },
      variables: ['name', 'projectType', 'lastContactDate', 'nextSteps'],
      stats: {
        sent: 2156,
        opened: 1543,
        clicked: 445,
        converted: 178,
        openRate: 71.6,
        clickRate: 20.6
      },
      createdBy: 'sales@company.com',
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-18T09:45:00Z'
    },
    {
      id: 'template-003',
      name: 'Proposal Sent Notification',
      subject: 'Your project proposal is ready - {{proposalNumber}}',
      category: 'proposal',
      isActive: true,
      language: 'en',
      content: {
        html: '<h2>Your Proposal is Ready!</h2><p>Hi {{name}},</p><p>Please find attached your detailed proposal for the {{projectType}} project...</p>',
        text: 'Your Proposal is Ready! Hi {{name}}, Please find attached your detailed proposal for the {{projectType}} project...'
      },
      variables: ['name', 'projectType', 'proposalNumber', 'totalAmount', 'validUntil'],
      stats: {
        sent: 456,
        opened: 398,
        clicked: 156,
        converted: 89,
        openRate: 87.3,
        clickRate: 34.2
      },
      createdBy: 'proposals@company.com',
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-17T16:20:00Z'
    }
  ];

  const getProviderTypeColor = (type: string) => {
    switch (type) {
      case 'smtp': return 'bg-blue-100 text-blue-800';
      case 'api': return 'bg-green-100 text-green-800';
      case 'service': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'welcome': return 'bg-blue-100 text-blue-800';
      case 'followup': return 'bg-orange-100 text-orange-800';
      case 'proposal': return 'bg-green-100 text-green-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'notification': return 'bg-purple-100 text-purple-800';
      case 'custom': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTestProvider = async (providerId: string) => {
    setTestingProvider(providerId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingProvider(null);
    console.log('Testing provider:', providerId);
  };

  const handleSetDefault = (providerId: string) => {
    console.log('Setting default provider:', providerId);
  };

  const handleToggleProvider = (providerId: string) => {
    console.log('Toggling provider:', providerId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Manage email providers, templates, and delivery settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">
                  {emailProviders.reduce((sum, p) => sum + p.stats.totalSent, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <Send className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold">
                  {((emailProviders.reduce((sum, p) => sum + p.stats.delivered, 0) / 
                     emailProviders.reduce((sum, p) => sum + p.stats.totalSent, 0)) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Providers</p>
                <p className="text-2xl font-bold">
                  {emailProviders.filter(p => p.isActive).length}
                </p>
                <p className="text-xs text-muted-foreground">
                  of {emailProviders.length} total
                </p>
              </div>
              <Server className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reputation Score</p>
                <p className="text-2xl font-bold">
                  {(emailProviders.reduce((sum, p) => sum + p.stats.reputation, 0) / emailProviders.length).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Average</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers">Email Providers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Providers</CardTitle>
                  <CardDescription>
                    Configure SMTP servers and email service providers
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowPasswords(!showPasswords)}>
                    {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showPasswords ? 'Hide' : 'Show'} Passwords
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailProviders.map((provider) => (
                  <Card key={provider.id} className={`${!provider.isActive ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`p-2 rounded-lg ${provider.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            {provider.type === 'smtp' && <Server className={`h-6 w-6 ${provider.isActive ? 'text-blue-600' : 'text-gray-400'}`} />}
                            {provider.type === 'api' && <Zap className={`h-6 w-6 ${provider.isActive ? 'text-green-600' : 'text-gray-400'}`} />}
                            {provider.type === 'service' && <Globe className={`h-6 w-6 ${provider.isActive ? 'text-purple-600' : 'text-gray-400'}`} />}
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                                  {provider.isDefault && (
                                    <Badge className="bg-blue-100 text-blue-800">Default</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {provider.config.host} • Last used: {provider.lastUsed ? new Date(provider.lastUsed).toLocaleDateString() : 'Never'}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getProviderTypeColor(provider.type)}>
                                  {provider.type.toUpperCase()}
                                </Badge>
                                <Badge className={provider.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  {provider.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                            </div>

                            {/* Configuration */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium">Configuration</p>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  {provider.type === 'smtp' && (
                                    <>
                                      <p>Host: {provider.config.host}</p>
                                      <p>Port: {provider.config.port}</p>
                                      <p>Username: {provider.config.username}</p>
                                      <p>Password: {showPasswords ? provider.config.password : '********'}</p>
                                      <p>Encryption: {provider.config.encryption?.toUpperCase()}</p>
                                    </>
                                  )}
                                  {provider.type === 'api' && (
                                    <>
                                      <p>Host: {provider.config.host}</p>
                                      <p>API Key: {showPasswords ? provider.config.apiKey : '********************'}</p>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Usage & Limits</p>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <p>Daily: {provider.limits.currentUsage.toLocaleString()} / {provider.limits.dailyLimit.toLocaleString()}</p>
                                  <p>Hourly Limit: {provider.limits.hourlyLimit.toLocaleString()}</p>
                                  <p>Monthly Limit: {provider.limits.monthlyLimit.toLocaleString()}</p>
                                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: `${(provider.limits.currentUsage / provider.limits.dailyLimit) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Send className="h-3 w-3" />
                                <span>{provider.stats.totalSent.toLocaleString()} sent</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                <span>{((provider.stats.delivered / provider.stats.totalSent) * 100).toFixed(1)}% delivered</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <XCircle className="h-3 w-3" />
                                <span>{provider.stats.bounced} bounced</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                <span>{provider.stats.reputation}% reputation</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTestProvider(provider.id)}
                            disabled={testingProvider === provider.id}
                          >
                            {testingProvider === provider.id ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <TestTube className="h-3 w-3" />
                            )}
                            Test
                          </Button>
                          {!provider.isDefault && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSetDefault(provider.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Switch
                            checked={provider.isActive}
                            onCheckedChange={() => handleToggleProvider(provider.id)}
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>
                    Manage email templates for automated communications
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{template.name}</h3>
                            <Badge className={getCategoryColor(template.category)}>
                              {template.category}
                            </Badge>
                            <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {template.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Subject: {template.subject}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Performance</p>
                              <div className="space-y-1 text-muted-foreground">
                                <p>{template.stats.sent} sent</p>
                                <p>{template.stats.openRate}% open rate</p>
                                <p>{template.stats.clickRate}% click rate</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Variables</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {template.variables.slice(0, 3).map((variable) => (
                                  <Badge key={variable} variant="secondary" className="text-xs">
                                    {'{' + '{' + variable + '}' + '}'}
                                  </Badge>
                                ))}
                                {template.variables.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{template.variables.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Details</p>
                              <div className="space-y-1 text-muted-foreground">
                                <p>Language: {template.language.toUpperCase()}</p>
                                <p>Created: {new Date(template.createdAt).toLocaleDateString()}</p>
                                <p>Last used: {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString() : 'Never'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3 mr-1" />
                            Clone
                          </Button>
                          <Switch checked={template.isActive} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure global email settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="from-name">Default From Name</Label>
                    <Input
                      id="from-name"
                      defaultValue="BuildCorp Team"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="from-email">Default From Email</Label>
                    <Input
                      id="from-email"
                      type="email"
                      defaultValue="noreply@company.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reply-to">Reply-To Email</Label>
                    <Input
                      id="reply-to"
                      type="email"
                      defaultValue="support@company.com"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Track email opens and clicks
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retry-attempts">Retry Attempts</Label>
                    <Select defaultValue="3">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 attempt</SelectItem>
                        <SelectItem value="2">2 attempts</SelectItem>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <Select defaultValue="100">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 emails</SelectItem>
                        <SelectItem value="100">100 emails</SelectItem>
                        <SelectItem value="200">200 emails</SelectItem>
                        <SelectItem value="500">500 emails</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Bounce Handling</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically handle email bounces
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>DKIM Signing</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable DKIM email authentication
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
                <Button variant="outline">
                  <TestTube className="h-4 w-4 mr-2" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Delivery Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailProviders.filter(p => p.isActive).map((provider) => (
                    <div key={provider.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{provider.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {((provider.stats.delivered / provider.stats.totalSent) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(provider.stats.delivered / provider.stats.totalSent) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Template Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailTemplates.slice(0, 3).map((template) => (
                    <div key={template.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{template.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {template.stats.sent} sent • {template.stats.openRate}% opened
                        </p>
                      </div>
                      <Badge className={template.stats.openRate > 70 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {template.stats.clickRate}% CTR
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailConfiguration;
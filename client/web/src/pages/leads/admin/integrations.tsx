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
  Plug,
  Settings,
  Link,
  Unlink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Edit,
  Trash2,
  Plus,
  Key,
  Globe,
  Database,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  BarChart3,
  Users,
  Building,
  CreditCard,
  Lock,
  Shield,
  Zap,
  Activity,
  TrendingUp,
  Clock,
  Bell,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Download,
  Upload
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'crm' | 'email' | 'communication' | 'analytics' | 'payment' | 'calendar' | 'storage' | 'automation';
  provider: string;
  version: string;
  isActive: boolean;
  isConnected: boolean;
  lastSync?: string;
  config: {
    apiKey?: string;
    apiSecret?: string;
    webhookUrl?: string;
    syncFrequency?: 'realtime' | 'hourly' | 'daily' | 'weekly';
    syncDirection?: 'bidirectional' | 'import' | 'export';
  };
  stats: {
    totalRecords: number;
    lastSync: number;
    syncErrors: number;
    successRate: number;
  };
  features: string[];
  pricing: {
    plan: string;
    cost: number;
    currency: string;
  };
  status: 'connected' | 'disconnected' | 'error' | 'syncing' | 'pending';
  createdAt: string;
  updatedAt?: string;
}

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  isActive: boolean;
  secret: string;
  retryCount: number;
  successCount: number;
  failureCount: number;
  lastTriggered?: string;
  lastResponse?: {
    status: number;
    responseTime: number;
  };
}

const Integrations: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('integrations');
  const [showSecrets, setShowSecrets] = useState(false);
  const [connectingIntegration, setConnectingIntegration] = useState<string | null>(null);

  // Mock integrations
  const integrations: Integration[] = [
    {
      id: 'int-001',
      name: 'HubSpot CRM',
      description: 'Sync leads, contacts, and deals with HubSpot CRM',
      category: 'crm',
      provider: 'HubSpot',
      version: 'v3',
      isActive: true,
      isConnected: true,
      lastSync: '2024-01-18T14:30:00Z',
      config: {
        apiKey: 'hub_************************',
        syncFrequency: 'hourly',
        syncDirection: 'bidirectional'
      },
      stats: {
        totalRecords: 15467,
        lastSync: 1234,
        syncErrors: 3,
        successRate: 99.8
      },
      features: ['Lead Sync', 'Contact Sync', 'Deal Tracking', 'Activity History'],
      pricing: {
        plan: 'Professional',
        cost: 45,
        currency: 'USD'
      },
      status: 'connected',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-18T14:30:00Z'
    },
    {
      id: 'int-002',
      name: 'Mailchimp',
      description: 'Sync email contacts and marketing campaigns',
      category: 'email',
      provider: 'Mailchimp',
      version: 'v3.0',
      isActive: true,
      isConnected: true,
      lastSync: '2024-01-18T12:15:00Z',
      config: {
        apiKey: 'mc_************************',
        syncFrequency: 'daily',
        syncDirection: 'export'
      },
      stats: {
        totalRecords: 8932,
        lastSync: 892,
        syncErrors: 0,
        successRate: 100.0
      },
      features: ['Contact Export', 'List Management', 'Campaign Tracking', 'Automation'],
      pricing: {
        plan: 'Standard',
        cost: 20,
        currency: 'USD'
      },
      status: 'connected',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-18T12:15:00Z'
    },
    {
      id: 'int-003',
      name: 'Slack Notifications',
      description: 'Send lead notifications and updates to Slack channels',
      category: 'communication',
      provider: 'Slack',
      version: 'v1.7',
      isActive: true,
      isConnected: true,
      lastSync: '2024-01-18T16:45:00Z',
      config: {
        webhookUrl: 'https://hooks.slack.com/services/***',
        syncFrequency: 'realtime'
      },
      stats: {
        totalRecords: 456,
        lastSync: 23,
        syncErrors: 1,
        successRate: 97.8
      },
      features: ['Real-time Notifications', 'Custom Channels', 'Rich Messages', 'Thread Replies'],
      pricing: {
        plan: 'Free',
        cost: 0,
        currency: 'USD'
      },
      status: 'connected',
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-18T16:45:00Z'
    },
    {
      id: 'int-004',
      name: 'Google Analytics',
      description: 'Track website visitors and lead conversion sources',
      category: 'analytics',
      provider: 'Google',
      version: 'v4',
      isActive: true,
      isConnected: false,
      config: {
        apiKey: 'ga4_************************',
        syncFrequency: 'daily',
        syncDirection: 'import'
      },
      stats: {
        totalRecords: 0,
        lastSync: 0,
        syncErrors: 5,
        successRate: 0
      },
      features: ['Visitor Tracking', 'Conversion Analytics', 'Source Attribution', 'Goal Tracking'],
      pricing: {
        plan: 'Free',
        cost: 0,
        currency: 'USD'
      },
      status: 'error',
      createdAt: '2024-01-04T00:00:00Z'
    },
    {
      id: 'int-005',
      name: 'Stripe Payments',
      description: 'Process payments and track invoice status',
      category: 'payment',
      provider: 'Stripe',
      version: 'v1',
      isActive: false,
      isConnected: false,
      config: {
        apiKey: 'sk_test_************************',
        apiSecret: 'whsec_************************',
        webhookUrl: 'https://api.company.com/webhooks/stripe',
        syncFrequency: 'realtime'
      },
      stats: {
        totalRecords: 0,
        lastSync: 0,
        syncErrors: 0,
        successRate: 0
      },
      features: ['Payment Processing', 'Invoice Tracking', 'Subscription Management', 'Refund Handling'],
      pricing: {
        plan: 'Pay per transaction',
        cost: 2.9,
        currency: 'USD'
      },
      status: 'disconnected',
      createdAt: '2024-01-05T00:00:00Z'
    }
  ];

  // Mock webhooks
  const webhooks: WebhookEndpoint[] = [
    {
      id: 'webhook-001',
      name: 'New Lead Notification',
      url: 'https://hooks.slack.com/services/T123/B456/XYZ789',
      events: ['lead.created', 'lead.updated'],
      isActive: true,
      secret: 'whsec_1234567890abcdef',
      retryCount: 3,
      successCount: 1234,
      failureCount: 5,
      lastTriggered: '2024-01-18T15:30:00Z',
      lastResponse: {
        status: 200,
        responseTime: 145
      }
    },
    {
      id: 'webhook-002',
      name: 'Deal Status Updates',
      url: 'https://api.crm.company.com/webhooks/deals',
      events: ['deal.won', 'deal.lost', 'deal.stage_changed'],
      isActive: true,
      secret: 'whsec_abcdef1234567890',
      retryCount: 5,
      successCount: 892,
      failureCount: 12,
      lastTriggered: '2024-01-18T14:15:00Z',
      lastResponse: {
        status: 200,
        responseTime: 89
      }
    },
    {
      id: 'webhook-003',
      name: 'Payment Notifications',
      url: 'https://billing.company.com/webhook',
      events: ['invoice.paid', 'invoice.overdue', 'payment.failed'],
      isActive: false,
      secret: 'whsec_xyz789abc123def',
      retryCount: 3,
      successCount: 0,
      failureCount: 8,
      lastTriggered: '2024-01-15T10:20:00Z',
      lastResponse: {
        status: 500,
        responseTime: 5000
      }
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crm': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'communication': return 'bg-purple-100 text-purple-800';
      case 'analytics': return 'bg-orange-100 text-orange-800';
      case 'payment': return 'bg-red-100 text-red-800';
      case 'calendar': return 'bg-yellow-100 text-yellow-800';
      case 'storage': return 'bg-gray-100 text-gray-800';
      case 'automation': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'crm': return Database;
      case 'email': return Mail;
      case 'communication': return MessageSquare;
      case 'analytics': return BarChart3;
      case 'payment': return CreditCard;
      case 'calendar': return Calendar;
      case 'storage': return FileText;
      case 'automation': return Zap;
      default: return Plug;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConnectIntegration = async (integrationId: string) => {
    setConnectingIntegration(integrationId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectingIntegration(null);
    console.log('Connecting integration:', integrationId);
  };

  const handleDisconnectIntegration = (integrationId: string) => {
    console.log('Disconnecting integration:', integrationId);
  };

  const handleSyncIntegration = (integrationId: string) => {
    console.log('Syncing integration:', integrationId);
  };

  const handleTestWebhook = (webhookId: string) => {
    console.log('Testing webhook:', webhookId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Connect and manage third-party services and applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Integrations</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
                <p className="text-xs text-muted-foreground">
                  {integrations.filter(i => i.isActive).length} active
                </p>
              </div>
              <Plug className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold">
                  {integrations.filter(i => i.isConnected).length}
                </p>
                <p className="text-xs text-muted-foreground">Services</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">
                  {integrations.reduce((sum, i) => sum + i.stats.totalRecords, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Synced</p>
              </div>
              <Database className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {(integrations.filter(i => i.isConnected).reduce((sum, i) => sum + i.stats.successRate, 0) / 
                    Math.max(integrations.filter(i => i.isConnected).length, 1)).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Average</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Available Integrations</CardTitle>
                  <CardDescription>
                    Connect with third-party services to enhance your workflow
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowSecrets(!showSecrets)}>
                    {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showSecrets ? 'Hide' : 'Show'} Secrets
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => {
                  const CategoryIcon = getCategoryIcon(integration.category);
                  
                  return (
                    <Card key={integration.id} className={`${!integration.isActive ? 'opacity-60' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-2 rounded-lg ${integration.isConnected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                              <CategoryIcon className={`h-6 w-6 ${integration.isConnected ? 'text-blue-600' : 'text-gray-400'}`} />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              {/* Header */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg">{integration.name}</h3>
                                    <Badge variant="outline">{integration.provider}</Badge>
                                    <Badge variant="outline" className="text-xs">v{integration.version}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {integration.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getCategoryColor(integration.category)}>
                                    {integration.category}
                                  </Badge>
                                  <Badge className={getStatusColor(integration.status)}>
                                    {integration.status}
                                  </Badge>
                                </div>
                              </div>

                              {/* Configuration & Stats */}
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Configuration</p>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    {integration.config.apiKey && (
                                      <p>API Key: {showSecrets ? integration.config.apiKey : '********************'}</p>
                                    )}
                                    {integration.config.syncFrequency && (
                                      <p>Sync: {integration.config.syncFrequency}</p>
                                    )}
                                    {integration.config.syncDirection && (
                                      <p>Direction: {integration.config.syncDirection}</p>
                                    )}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Statistics</p>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>Records: {integration.stats.totalRecords.toLocaleString()}</p>
                                    <p>Success: {integration.stats.successRate}%</p>
                                    <p>Errors: {integration.stats.syncErrors}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Pricing</p>
                                  <div className="space-y-1 text-sm text-muted-foreground">
                                    <p>Plan: {integration.pricing.plan}</p>
                                    <p>Cost: ${integration.pricing.cost}/{integration.pricing.plan === 'Pay per transaction' ? 'transaction' : 'month'}</p>
                                    <p>Last sync: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Features */}
                              <div>
                                <p className="text-sm font-medium mb-2">Features</p>
                                <div className="flex flex-wrap gap-1">
                                  {integration.features.map((feature) => (
                                    <Badge key={feature} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 ml-4">
                            {integration.isConnected ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleSyncIntegration(integration.id)}
                                >
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Sync
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDisconnectIntegration(integration.id)}
                                >
                                  <Unlink className="h-3 w-3 mr-1" />
                                  Disconnect
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleConnectIntegration(integration.id)}
                                disabled={connectingIntegration === integration.id}
                              >
                                {connectingIntegration === integration.id ? (
                                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                ) : (
                                  <Link className="h-3 w-3 mr-1" />
                                )}
                                Connect
                              </Button>
                            )}
                            <Switch
                              checked={integration.isActive}
                              size="sm"
                            />
                            <Button size="sm" variant="outline">
                              <Settings className="h-3 w-3" />
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

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhook Endpoints</CardTitle>
                  <CardDescription>
                    Configure webhook endpoints for real-time notifications
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <Card key={webhook.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{webhook.name}</h3>
                            <Badge className={webhook.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {webhook.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {webhook.url}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Events</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {webhook.events.map((event) => (
                                  <Badge key={event} variant="secondary" className="text-xs">
                                    {event}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Statistics</p>
                              <div className="space-y-1 text-muted-foreground">
                                <p>Success: {webhook.successCount}</p>
                                <p>Failures: {webhook.failureCount}</p>
                                <p>Retries: {webhook.retryCount}</p>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Last Response</p>
                              <div className="space-y-1 text-muted-foreground">
                                <p>Status: {webhook.lastResponse?.status}</p>
                                <p>Response time: {webhook.lastResponse?.responseTime}ms</p>
                                <p>Triggered: {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}</p>
                              </div>
                            </div>
                          </div>

                          {webhook.secret && (
                            <div className="mt-3">
                              <p className="text-sm font-medium">Secret</p>
                              <p className="text-sm text-muted-foreground font-mono">
                                {showSecrets ? webhook.secret : '********************'}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTestWebhook(webhook.id)}
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Test
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3 mr-1" />
                            Clone
                          </Button>
                          <Switch checked={webhook.isActive} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage API keys for external integrations
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Production API Key</h3>
                        <p className="text-sm text-muted-foreground">
                          sk_live_{showSecrets ? '1234567890abcdef' : '********************'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created: Jan 1, 2024 • Last used: 2 hours ago
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Test API Key</h3>
                        <p className="text-sm text-muted-foreground">
                          sk_test_{showSecrets ? 'abcdef1234567890' : '********************'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Created: Jan 1, 2024 • Last used: Never
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Test</Badge>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure global integration preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="default-sync">Default Sync Frequency</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger className="mt-1">
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

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-retry Failed Syncs</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically retry failed synchronizations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Webhook Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send webhook notifications for integration events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      defaultValue="30"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="retry-attempts">Max Retry Attempts</Label>
                    <Input
                      id="retry-attempts"
                      type="number"
                      defaultValue="3"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable rate limiting for API requests
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

export default Integrations;
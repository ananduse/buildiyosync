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
  Zap,
  Plus,
  Trash2,
  Copy,
  Send,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  Code,
  Shield,
  RefreshCw,
  ExternalLink,
  FileText,
  Key,
  Globe,
  Server,
  Database,
  Webhook,
  MonitorSpeaker,
  Download,
  Filter
} from 'lucide-react';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers: Record<string, string>;
  events: string[];
  enabled: boolean;
  retryCount: number;
  timeout: number;
  secret?: string;
  createdAt: Date;
  lastTriggered?: Date;
  successCount: number;
  failureCount: number;
}

interface WebhookEvent {
  id: string;
  webhookId: string;
  eventType: string;
  timestamp: Date;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempts: number;
  nextRetry?: Date;
  responseTime?: number;
  responseStatus?: number;
  responseBody?: string;
  payload: any;
  error?: string;
}

interface WebhookTemplate {
  id: string;
  name: string;
  description: string;
  provider: string;
  url: string;
  headers: Record<string, string>;
  payloadTransform: string;
  category: 'crm' | 'email' | 'notification' | 'analytics' | 'custom';
}

const WebhookIntegration: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('endpoints');
  const [selectedWebhook, setSelectedWebhook] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Mock data
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([
    {
      id: 'wh_001',
      name: 'CRM Integration',
      url: 'https://api.salesforce.com/webhook',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sf_token_***',
        'Content-Type': 'application/json'
      },
      events: ['form.submitted', 'lead.qualified'],
      enabled: true,
      retryCount: 3,
      timeout: 30000,
      secret: 'wh_secret_***',
      createdAt: new Date('2024-01-15'),
      lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
      successCount: 1245,
      failureCount: 23
    },
    {
      id: 'wh_002',
      name: 'Slack Notifications',
      url: 'https://hooks.slack.com/services/xxx/yyy/zzz',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      events: ['form.submitted'],
      enabled: true,
      retryCount: 2,
      timeout: 15000,
      createdAt: new Date('2024-02-01'),
      lastTriggered: new Date(Date.now() - 5 * 60 * 1000),
      successCount: 456,
      failureCount: 8
    }
  ]);

  const [events, setEvents] = useState<WebhookEvent[]>([
    {
      id: 'evt_001',
      webhookId: 'wh_001',
      eventType: 'form.submitted',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'delivered',
      attempts: 1,
      responseTime: 245,
      responseStatus: 200,
      responseBody: '{"success": true, "id": "lead_123"}',
      payload: {
        formId: 'form_123',
        submission: {
          name: 'John Doe',
          email: 'john@example.com',
          company: 'Acme Corp'
        }
      }
    },
    {
      id: 'evt_002',
      webhookId: 'wh_001',
      eventType: 'form.submitted',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'failed',
      attempts: 3,
      nextRetry: new Date(Date.now() + 5 * 60 * 1000),
      responseTime: 30000,
      responseStatus: 404,
      error: 'Endpoint not found',
      payload: {
        formId: 'form_456',
        submission: {
          name: 'Jane Smith',
          email: 'jane@example.com'
        }
      }
    }
  ]);

  const templates: WebhookTemplate[] = [
    {
      id: 'tpl_salesforce',
      name: 'Salesforce CRM',
      description: 'Send leads directly to Salesforce',
      provider: 'Salesforce',
      url: 'https://api.salesforce.com/services/data/v58.0/sobjects/Lead/',
      headers: {
        'Authorization': 'Bearer YOUR_SALESFORCE_TOKEN',
        'Content-Type': 'application/json'
      },
      payloadTransform: `{
  "FirstName": "{{submission.name.split(' ')[0]}}",
  "LastName": "{{submission.name.split(' ')[1]}}",
  "Email": "{{submission.email}}",
  "Company": "{{submission.company}}",
  "LeadSource": "Website Form"
}`,
      category: 'crm'
    },
    {
      id: 'tpl_hubspot',
      name: 'HubSpot CRM',
      description: 'Create contacts in HubSpot',
      provider: 'HubSpot',
      url: 'https://api.hubapi.com/contacts/v1/contact/',
      headers: {
        'Authorization': 'Bearer YOUR_HUBSPOT_TOKEN',
        'Content-Type': 'application/json'
      },
      payloadTransform: `{
  "properties": [
    {"property": "email", "value": "{{submission.email}}"},
    {"property": "firstname", "value": "{{submission.name}}"},
    {"property": "company", "value": "{{submission.company}}"}
  ]
}`,
      category: 'crm'
    },
    {
      id: 'tpl_slack',
      name: 'Slack Notification',
      description: 'Post notifications to Slack',
      provider: 'Slack',
      url: 'YOUR_SLACK_WEBHOOK_URL',
      headers: {
        'Content-Type': 'application/json'
      },
      payloadTransform: `{
  "text": "New lead received!",
  "attachments": [{
    "color": "good",
    "fields": [
      {"title": "Name", "value": "{{submission.name}}", "short": true},
      {"title": "Email", "value": "{{submission.email}}", "short": true},
      {"title": "Company", "value": "{{submission.company}}", "short": true}
    ]
  }]
}`,
      category: 'notification'
    }
  ];

  const eventTypes = [
    { id: 'form.viewed', name: 'Form Viewed', description: 'Triggered when a form is displayed' },
    { id: 'form.started', name: 'Form Started', description: 'Triggered when user starts filling the form' },
    { id: 'form.submitted', name: 'Form Submitted', description: 'Triggered when form is successfully submitted' },
    { id: 'form.abandoned', name: 'Form Abandoned', description: 'Triggered when user leaves without submitting' },
    { id: 'lead.qualified', name: 'Lead Qualified', description: 'Triggered when lead meets qualification criteria' },
    { id: 'lead.scored', name: 'Lead Scored', description: 'Triggered when lead score is calculated' }
  ];

  const getStatusColor = (status: WebhookEvent['status']) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'retrying': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: WebhookEvent['status']) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'failed': return XCircle;
      case 'pending': return Clock;
      case 'retrying': return RefreshCw;
      default: return Activity;
    }
  };

  const testWebhook = async (webhookId: string) => {
    // Mock test implementation
    console.log('Testing webhook:', webhookId);
  };

  const retryFailedEvent = async (eventId: string) => {
    // Mock retry implementation
    console.log('Retrying event:', eventId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Webhook Integration</h1>
            <p className="text-muted-foreground mt-2">
              Connect your forms to external services and APIs with real-time webhooks
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Webhook
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="events">Event Logs</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {webhooks.map((webhook) => (
                <Card key={webhook.id} className={`cursor-pointer transition-colors ${
                  selectedWebhook === webhook.id ? 'ring-2 ring-blue-500' : ''
                }`} onClick={() => setSelectedWebhook(webhook.id)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Webhook className="h-5 w-5" />
                        <CardTitle className="text-base">{webhook.name}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant={webhook.enabled ? 'outline' : 'secondary'}>
                          {webhook.enabled ? 'Active' : 'Disabled'}
                        </Badge>
                        <Switch 
                          checked={webhook.enabled}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="text-muted-foreground">URL</div>
                        <div className="font-mono text-xs truncate">{webhook.url}</div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Method</span>
                        <Badge variant="outline">{webhook.method}</Badge>
                      </div>

                      <div className="text-sm">
                        <div className="text-muted-foreground mb-1">Events</div>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="secondary" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-green-600 font-medium">{webhook.successCount}</span>
                          <span className="text-muted-foreground ml-1">success</span>
                        </div>
                        <div>
                          <span className="text-red-600 font-medium">{webhook.failureCount}</span>
                          <span className="text-muted-foreground ml-1">failed</span>
                        </div>
                      </div>

                      {webhook.lastTriggered && (
                        <div className="text-xs text-muted-foreground">
                          Last triggered: {webhook.lastTriggered.toLocaleString()}
                        </div>
                      )}

                      <div className="flex gap-1 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            testWebhook(webhook.id);
                          }}
                          className="flex-1"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Test
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Webhook Card */}
              <Card 
                className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsCreating(true)}
              >
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-medium">Add Webhook</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect to external services
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Webhook Details */}
            {selectedWebhook && (
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Configuration</CardTitle>
                  <CardDescription>Configure webhook settings and payload</CardDescription>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const webhook = webhooks.find(w => w.id === selectedWebhook);
                    if (!webhook) return null;

                    return (
                      <Tabs defaultValue="config">
                        <TabsList>
                          <TabsTrigger value="config">Configuration</TabsTrigger>
                          <TabsTrigger value="headers">Headers</TabsTrigger>
                          <TabsTrigger value="payload">Payload</TabsTrigger>
                          <TabsTrigger value="security">Security</TabsTrigger>
                        </TabsList>

                        <TabsContent value="config" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Webhook Name</Label>
                              <Input value={webhook.name} className="mt-1" />
                            </div>
                            <div>
                              <Label>HTTP Method</Label>
                              <Select value={webhook.method}>
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="POST">POST</SelectItem>
                                  <SelectItem value="PUT">PUT</SelectItem>
                                  <SelectItem value="PATCH">PATCH</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label>Webhook URL</Label>
                            <Input value={webhook.url} className="mt-1 font-mono" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Timeout (ms)</Label>
                              <Input value={webhook.timeout} type="number" className="mt-1" />
                            </div>
                            <div>
                              <Label>Retry Count</Label>
                              <Input value={webhook.retryCount} type="number" className="mt-1" />
                            </div>
                          </div>

                          <div>
                            <Label>Events to Subscribe</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {eventTypes.map((eventType) => (
                                <div key={eventType.id} className="flex items-center space-x-2">
                                  <input 
                                    type="checkbox" 
                                    checked={webhook.events.includes(eventType.id)}
                                    className="rounded"
                                  />
                                  <div>
                                    <div className="text-sm font-medium">{eventType.name}</div>
                                    <div className="text-xs text-muted-foreground">{eventType.description}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="headers" className="space-y-4">
                          <div>
                            <Label>HTTP Headers</Label>
                            <div className="space-y-2 mt-2">
                              {Object.entries(webhook.headers).map(([key, value], index) => (
                                <div key={index} className="flex gap-2">
                                  <Input value={key} placeholder="Header name" className="flex-1" />
                                  <Input 
                                    value={value} 
                                    placeholder="Header value" 
                                    className="flex-1"
                                    type={key.toLowerCase().includes('auth') ? 'password' : 'text'}
                                  />
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              <Button size="sm" variant="outline">
                                <Plus className="h-3 w-3 mr-1" />
                                Add Header
                              </Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="payload" className="space-y-4">
                          <div>
                            <Label>Payload Template</Label>
                            <Textarea
                              className="mt-1 font-mono text-sm min-h-64"
                              placeholder="JSON payload template with variables"
                              defaultValue={`{
  "event": "{{event.type}}",
  "timestamp": "{{event.timestamp}}",
  "form": {
    "id": "{{form.id}}",
    "name": "{{form.name}}"
  },
  "submission": {
    "id": "{{submission.id}}",
    "data": {{submission.data}},
    "metadata": {
      "ip": "{{submission.ip}}",
      "userAgent": "{{submission.userAgent}}",
      "referrer": "{{submission.referrer}}"
    }
  }
}`}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Use double curly braces for variables: {`{{variable.name}}`}
                          </div>
                        </TabsContent>

                        <TabsContent value="security" className="space-y-4">
                          <div>
                            <Label>Webhook Secret</Label>
                            <div className="flex gap-2 mt-1">
                              <Input 
                                type="password" 
                                value={webhook.secret}
                                placeholder="Optional secret for signature verification"
                              />
                              <Button size="sm" variant="outline">
                                <RefreshCw className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Used to generate HMAC-SHA256 signature in X-Buildiyo-Signature header
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label>SSL Verification</Label>
                              <div className="text-xs text-muted-foreground">
                                Verify SSL certificates for HTTPS endpoints
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Follow Redirects</Label>
                              <div className="text-xs text-muted-foreground">
                                Follow HTTP redirects automatically
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </TabsContent>
                      </Tabs>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Event Logs</h2>
                <p className="text-muted-foreground">Recent webhook delivery attempts and their status</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <Card>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {events.map((event) => {
                      const StatusIcon = getStatusIcon(event.status);
                      const webhook = webhooks.find(w => w.id === event.webhookId);
                      
                      return (
                        <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <StatusIcon className={`h-4 w-4 ${getStatusColor(event.status).split(' ')[0]}`} />
                            <div>
                              <div className="font-medium text-sm">
                                {webhook?.name} • {event.eventType}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {event.timestamp.toLocaleString()}
                              </div>
                              {event.error && (
                                <div className="text-xs text-red-600 mt-1">
                                  {event.error}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right text-xs">
                              <Badge className={`${getStatusColor(event.status)} mb-1`}>
                                {event.status}
                              </Badge>
                              <div className="text-muted-foreground">
                                {event.attempts} attempt{event.attempts !== 1 ? 's' : ''}
                                {event.responseTime && ` • ${event.responseTime}ms`}
                              </div>
                              {event.responseStatus && (
                                <Badge variant="outline" className="mt-1">
                                  {event.responseStatus}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              {event.status === 'failed' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => retryFailedEvent(event.id)}
                                >
                                  <RotateCcw className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Webhook Templates</h2>
              <p className="text-muted-foreground mb-4">
                Pre-configured templates for popular services and integrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="text-muted-foreground">Provider</div>
                        <div className="font-medium">{template.provider}</div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="text-muted-foreground">Endpoint</div>
                        <div className="font-mono text-xs truncate bg-gray-100 p-1 rounded">
                          {template.url}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Plus className="h-3 w-3 mr-1" />
                          Use Template
                        </Button>
                        <Button size="sm" variant="outline">
                          <Code className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Webhooks</p>
                      <p className="text-2xl font-bold">{webhooks.length}</p>
                    </div>
                    <Webhook className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">98.2%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response</p>
                      <p className="text-2xl font-bold">245ms</p>
                    </div>
                    <Activity className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Failed Today</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Performance</CardTitle>
                  <CardDescription>Response times and success rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-2" />
                      <p>Performance chart would be rendered here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Distribution</CardTitle>
                  <CardDescription>Webhook events by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {eventTypes.slice(0, 4).map((eventType) => (
                      <div key={eventType.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{eventType.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${Math.random() * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-12 text-right">
                            {Math.floor(Math.random() * 100)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WebhookIntegration;
import React, { useState, useEffect } from 'react';
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
import { Separator } from '@/components/ui/separator';
import { 
  Code,
  Globe,
  Key,
  Lock,
  Send,
  Activity,
  AlertTriangle,
  CheckCircle,
  Copy,
  Download,
  RefreshCw,
  Settings,
  Zap,
  Database,
  Server,
  Shield,
  Clock,
  BarChart3,
  FileText,
  ExternalLink,
  Play,
  Pause,
  StopCircle
} from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  authentication: 'none' | 'api_key' | 'jwt' | 'basic';
  rateLimit: number;
  enabled: boolean;
}

interface WebhookEvent {
  id: string;
  timestamp: Date;
  formId: string;
  event: 'form_submitted' | 'form_viewed' | 'form_abandoned';
  payload: any;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempts: number;
  lastAttempt?: Date;
  nextRetry?: Date;
  response?: {
    status: number;
    message: string;
  };
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: Date;
  lastUsed?: Date;
  expiresAt?: Date;
  enabled: boolean;
}

const FormIntegrationAPI: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('endpoints');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [apiKeys, setAPIKeys] = useState<APIKey[]>([]);

  // Mock data
  const endpoints: APIEndpoint[] = [
    {
      id: 'submit_form',
      name: 'Submit Form',
      method: 'POST',
      path: '/api/v1/forms/{form_id}/submit',
      description: 'Submit form data and create a new lead',
      authentication: 'api_key',
      rateLimit: 100,
      enabled: true
    },
    {
      id: 'get_form',
      name: 'Get Form Schema',
      method: 'GET',
      path: '/api/v1/forms/{form_id}',
      description: 'Retrieve form configuration and field definitions',
      authentication: 'api_key',
      rateLimit: 200,
      enabled: true
    },
    {
      id: 'list_submissions',
      name: 'List Submissions',
      method: 'GET',
      path: '/api/v1/forms/{form_id}/submissions',
      description: 'Retrieve form submissions with pagination and filtering',
      authentication: 'jwt',
      rateLimit: 50,
      enabled: true
    },
    {
      id: 'get_analytics',
      name: 'Get Analytics',
      method: 'GET',
      path: '/api/v1/forms/{form_id}/analytics',
      description: 'Retrieve form performance analytics and metrics',
      authentication: 'jwt',
      rateLimit: 20,
      enabled: true
    },
    {
      id: 'update_form',
      name: 'Update Form',
      method: 'PUT',
      path: '/api/v1/forms/{form_id}',
      description: 'Update form configuration and settings',
      authentication: 'jwt',
      rateLimit: 10,
      enabled: true
    }
  ];

  useEffect(() => {
    // Mock webhook events
    const mockEvents: WebhookEvent[] = [
      {
        id: 'evt_1',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        formId: 'form_123',
        event: 'form_submitted',
        payload: { name: 'John Doe', email: 'john@example.com' },
        status: 'delivered',
        attempts: 1,
        lastAttempt: new Date(Date.now() - 5 * 60 * 1000),
        response: { status: 200, message: 'OK' }
      },
      {
        id: 'evt_2',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        formId: 'form_123',
        event: 'form_viewed',
        payload: { userAgent: 'Mozilla/5.0...', ip: '192.168.1.1' },
        status: 'failed',
        attempts: 3,
        lastAttempt: new Date(Date.now() - 10 * 60 * 1000),
        nextRetry: new Date(Date.now() + 5 * 60 * 1000),
        response: { status: 404, message: 'Not Found' }
      }
    ];
    setWebhookEvents(mockEvents);

    // Mock API keys
    const mockKeys: APIKey[] = [
      {
        id: 'key_1',
        name: 'Production API Key',
        key: 'bld_live_sk_123...789',
        permissions: ['forms:read', 'forms:write', 'submissions:read'],
        createdAt: new Date('2024-01-15'),
        lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        enabled: true
      },
      {
        id: 'key_2',
        name: 'Development Key',
        key: 'bld_test_sk_456...012',
        permissions: ['forms:read', 'submissions:read'],
        createdAt: new Date('2024-02-01'),
        lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000),
        expiresAt: new Date('2024-12-31'),
        enabled: true
      }
    ];
    setAPIKeys(mockKeys);
  }, []);

  const generateCurlExample = (endpoint: APIEndpoint) => {
    const baseUrl = 'https://api.buildiyo.com';
    const fullUrl = `${baseUrl}${endpoint.path.replace('{form_id}', 'form_123')}`;
    
    const authHeader = endpoint.authentication === 'api_key' 
      ? '-H "Authorization: Bearer bld_live_sk_123...789"'
      : endpoint.authentication === 'jwt'
      ? '-H "Authorization: Bearer jwt_token_here"'
      : '';

    if (endpoint.method === 'GET') {
      return `curl -X GET "${fullUrl}" \\
  ${authHeader} \\
  -H "Content-Type: application/json"`;
    } else if (endpoint.method === 'POST') {
      return `curl -X POST "${fullUrl}" \\
  ${authHeader} \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "project_type": "commercial"
  }'`;
    }

    return `curl -X ${endpoint.method} "${fullUrl}" \\
  ${authHeader} \\
  -H "Content-Type: application/json"`;
  };

  const generateJavaScriptExample = (endpoint: APIEndpoint) => {
    const baseUrl = 'https://api.buildiyo.com';
    const fullUrl = `${baseUrl}${endpoint.path.replace('{form_id}', 'form_123')}`;

    if (endpoint.method === 'POST') {
      return `const response = await fetch('${fullUrl}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer bld_live_sk_123...789'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Corp',
    project_type: 'commercial'
  })
});

const result = await response.json();
console.log('Form submitted:', result);`;
    }

    return `const response = await fetch('${fullUrl}', {
  method: '${endpoint.method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer bld_live_sk_123...789'
  }
});

const data = await response.json();
console.log('Response:', data);`;
  };

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
      case 'failed': return AlertTriangle;
      case 'pending': return Clock;
      case 'retrying': return RefreshCw;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Form Integration API</h1>
            <p className="text-muted-foreground mt-2">
              Complete API documentation and integration tools for form management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              API Docs
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              SDK
            </Button>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Test API
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-4">
            <div className="grid grid-cols-12 gap-6">
              {/* Endpoint List */}
              <div className="col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Available Endpoints</CardTitle>
                    <CardDescription>RESTful API endpoints for form operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {endpoints.map((endpoint) => (
                        <div
                          key={endpoint.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedEndpoint === endpoint.id 
                              ? 'bg-blue-50 border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedEndpoint(endpoint.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant={endpoint.method === 'GET' ? 'outline' : 'default'}
                              className="text-xs"
                            >
                              {endpoint.method}
                            </Badge>
                            {!endpoint.enabled && (
                              <Badge variant="secondary" className="text-xs">Disabled</Badge>
                            )}
                          </div>
                          <h4 className="font-medium text-sm">{endpoint.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {endpoint.path}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Endpoint Details */}
              <div className="col-span-8">
                {selectedEndpoint ? (
                  (() => {
                    const endpoint = endpoints.find(e => e.id === selectedEndpoint);
                    if (!endpoint) return null;

                    return (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <Badge variant={endpoint.method === 'GET' ? 'outline' : 'default'}>
                                    {endpoint.method}
                                  </Badge>
                                  {endpoint.name}
                                </CardTitle>
                                <CardDescription className="mt-2">
                                  {endpoint.description}
                                </CardDescription>
                              </div>
                              <Switch checked={endpoint.enabled} />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Endpoint</Label>
                                  <div className="mt-1 p-2 bg-gray-100 rounded font-mono text-sm">
                                    {endpoint.path}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Authentication</Label>
                                  <div className="mt-1 p-2 bg-gray-100 rounded text-sm capitalize">
                                    {endpoint.authentication.replace('_', ' ')}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Rate Limit</Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {endpoint.rateLimit} requests per minute
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Code Examples</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="curl">
                              <TabsList>
                                <TabsTrigger value="curl">cURL</TabsTrigger>
                                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                                <TabsTrigger value="python">Python</TabsTrigger>
                              </TabsList>

                              <TabsContent value="curl" className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>cURL Command</Label>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigator.clipboard.writeText(generateCurlExample(endpoint))}
                                  >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </Button>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto">
                                  <code>{generateCurlExample(endpoint)}</code>
                                </pre>
                              </TabsContent>

                              <TabsContent value="javascript" className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>JavaScript Fetch</Label>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigator.clipboard.writeText(generateJavaScriptExample(endpoint))}
                                  >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </Button>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto">
                                  <code>{generateJavaScriptExample(endpoint)}</code>
                                </pre>
                              </TabsContent>

                              <TabsContent value="python" className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>Python Requests</Label>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                  >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </Button>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto">
                                  <code>{`import requests

url = "https://api.buildiyo.com${endpoint.path.replace('{form_id}', 'form_123')}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer bld_live_sk_123...789"
}

${endpoint.method === 'POST' ? `data = {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "project_type": "commercial"
}

response = requests.${endpoint.method.toLowerCase()}(url, json=data, headers=headers)` : `response = requests.${endpoint.method.toLowerCase()}(url, headers=headers)`}
print(response.json())`}</code>
                                </pre>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })()
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Select an Endpoint</h3>
                        <p className="text-muted-foreground">
                          Choose an API endpoint from the list to view documentation and examples
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2" />
                    Webhook Configuration
                  </CardTitle>
                  <CardDescription>Configure webhook endpoints and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Webhook URL</Label>
                    <Input
                      placeholder="https://your-server.com/webhook"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Events to Send</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Form Submitted</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Form Viewed</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Form Abandoned</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Secret Key</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="password"
                        placeholder="webhook_secret_key"
                        readOnly
                      />
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Webhook
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Webhook Statistics
                  </CardTitle>
                  <CardDescription>Performance metrics for webhook deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">98.5%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">1.2s</div>
                        <div className="text-sm text-muted-foreground">Avg Response</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">1,234</div>
                        <div className="text-sm text-muted-foreground">Total Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">18</div>
                        <div className="text-sm text-muted-foreground">Failed</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Test Webhook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Events</CardTitle>
                <CardDescription>Latest webhook delivery attempts and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {webhookEvents.map((event) => {
                    const StatusIcon = getStatusIcon(event.status);
                    return (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <StatusIcon className={`h-4 w-4 ${getStatusColor(event.status).split(' ')[0]}`} />
                          <div>
                            <div className="font-medium text-sm">
                              {event.event.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {event.timestamp.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                            {event.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {event.attempts} attempt{event.attempts !== 1 ? 's' : ''}
                          </div>
                          {event.response && (
                            <Badge variant="outline" className="text-xs">
                              {event.response.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">API Keys</h2>
                <p className="text-muted-foreground">Manage authentication keys for API access</p>
              </div>
              <Button>
                <Key className="h-4 w-4 mr-2" />
                Create New Key
              </Button>
            </div>

            <div className="grid gap-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{apiKey.name}</h3>
                          <Badge variant={apiKey.enabled ? 'outline' : 'secondary'}>
                            {apiKey.enabled ? 'Active' : 'Disabled'}
                          </Badge>
                          {apiKey.expiresAt && (
                            <Badge variant="outline" className="text-xs">
                              Expires {apiKey.expiresAt.toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {apiKey.key}
                          </code>
                          <Button size="sm" variant="outline">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {apiKey.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {apiKey.createdAt.toLocaleDateString()}
                          {apiKey.lastUsed && (
                            <span className="ml-3">
                              Last used: {apiKey.lastUsed.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Switch checked={apiKey.enabled} />
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
                      <p className="text-sm text-muted-foreground">API Requests</p>
                      <p className="text-2xl font-bold">12,456</p>
                      <p className="text-xs text-green-600">+12% from last week</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">99.2%</p>
                      <p className="text-xs text-green-600">+0.3% improvement</p>
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
                      <p className="text-xs text-red-600">+15ms slower</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Forms</p>
                      <p className="text-2xl font-bold">23</p>
                      <p className="text-xs text-blue-600">2 new this week</p>
                    </div>
                    <Database className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage Trends</CardTitle>
                  <CardDescription>Request volume over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Usage chart would be rendered here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Distribution</CardTitle>
                  <CardDescription>Common error types and frequencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rate Limit Exceeded</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Invalid API Key</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Validation Error</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Server Error</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-700 h-2 rounded-full" style={{ width: '5%' }} />
                        </div>
                        <span className="text-xs text-muted-foreground">5%</span>
                      </div>
                    </div>
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

export default FormIntegrationAPI;
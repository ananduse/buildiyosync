import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Key,
  Shield,
  Code,
  Globe,
  Activity,
  BarChart3,
  Settings,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Database,
  Server,
  Lock,
  Unlock,
  ExternalLink,
  FileText,
  Download,
  Upload,
  Zap,
  Target,
  Award,
  TrendingUp,
  DollarSign,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Info,
  AlertTriangle,
  Star,
  Bookmark,
  Archive,
  History,
  Terminal,
  Network,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  description: string;
  key: string;
  type: 'full_access' | 'read_only' | 'write_only' | 'custom';
  status: 'active' | 'inactive' | 'expired' | 'revoked';
  permissions: string[];
  rateLimits: {
    requestsPerMinute: number;
    requestsPerHour: number;
    requestsPerDay: number;
  };
  usage: {
    totalRequests: number;
    todayRequests: number;
    lastUsed?: string;
    averageDaily: number;
  };
  restrictions: {
    ipWhitelist: string[];
    allowedDomains: string[];
    expiry?: string;
  };
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
}

interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  category: 'leads' | 'contacts' | 'companies' | 'activities' | 'reports' | 'system';
  version: string;
  authentication: 'required' | 'optional' | 'none';
  rateLimited: boolean;
  deprecated: boolean;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses: {
    code: number;
    description: string;
    example: any;
  }[];
}

interface APIUsage {
  timestamp: string;
  endpoint: string;
  method: string;
  responseCode: number;
  responseTime: number;
  userAgent: string;
  ipAddress: string;
  apiKey: string;
  requestSize: number;
  responseSize: number;
}

const APIAccess: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('keys');
  const [searchTerm, setSearchTerm] = useState('');
  const [showKey, setShowKey] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for API keys
  const apiKeys: APIKey[] = [
    {
      id: 'key-001',
      name: 'Production Integration',
      description: 'Main production API key for website integration',
      key: 'sk_prod_1234567890abcdef1234567890abcdef',
      type: 'full_access',
      status: 'active',
      permissions: ['leads:read', 'leads:write', 'contacts:read', 'contacts:write', 'reports:read'],
      rateLimits: {
        requestsPerMinute: 1000,
        requestsPerHour: 10000,
        requestsPerDay: 100000
      },
      usage: {
        totalRequests: 2456789,
        todayRequests: 1234,
        lastUsed: '2024-01-15T14:30:00Z',
        averageDaily: 8765
      },
      restrictions: {
        ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
        allowedDomains: ['company.com', '*.company.com'],
        expiry: '2024-12-31T23:59:59Z'
      },
      createdBy: 'System Admin',
      createdAt: '2023-06-15T10:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z'
    },
    {
      id: 'key-002',
      name: 'Mobile App Key',
      description: 'API key for mobile application access',
      key: 'sk_mobile_abcdef1234567890abcdef1234567890',
      type: 'read_only',
      status: 'active',
      permissions: ['leads:read', 'contacts:read', 'companies:read'],
      rateLimits: {
        requestsPerMinute: 500,
        requestsPerHour: 5000,
        requestsPerDay: 50000
      },
      usage: {
        totalRequests: 456789,
        todayRequests: 567,
        lastUsed: '2024-01-15T16:45:00Z',
        averageDaily: 1234
      },
      restrictions: {
        ipWhitelist: [],
        allowedDomains: ['mobile.company.com']
      },
      createdBy: 'Mobile Team',
      createdAt: '2023-09-10T14:20:00Z'
    },
    {
      id: 'key-003',
      name: 'Analytics Dashboard',
      description: 'Read-only access for analytics and reporting dashboard',
      key: 'sk_analytics_1234567890abcdefghijklmnopqrstuv',
      type: 'custom',
      status: 'active',
      permissions: ['reports:read', 'analytics:read', 'leads:read'],
      rateLimits: {
        requestsPerMinute: 200,
        requestsPerHour: 2000,
        requestsPerDay: 20000
      },
      usage: {
        totalRequests: 89012,
        todayRequests: 234,
        lastUsed: '2024-01-15T12:15:00Z',
        averageDaily: 567
      },
      restrictions: {
        ipWhitelist: ['203.0.113.0/24'],
        allowedDomains: ['analytics.company.com']
      },
      createdBy: 'Analytics Team',
      createdAt: '2023-11-01T09:30:00Z'
    },
    {
      id: 'key-004',
      name: 'Development Testing',
      description: 'Development environment API key for testing',
      key: 'sk_dev_testing1234567890abcdefghijklmnop',
      type: 'full_access',
      status: 'inactive',
      permissions: ['*'],
      rateLimits: {
        requestsPerMinute: 100,
        requestsPerHour: 1000,
        requestsPerDay: 10000
      },
      usage: {
        totalRequests: 12345,
        todayRequests: 0,
        lastUsed: '2024-01-10T18:20:00Z',
        averageDaily: 45
      },
      restrictions: {
        ipWhitelist: [],
        allowedDomains: ['dev.company.com', 'localhost:3000']
      },
      createdBy: 'Development Team',
      createdAt: '2024-01-01T00:00:00Z',
      expiresAt: '2024-03-31T23:59:59Z'
    }
  ];

  // Mock data for API endpoints
  const apiEndpoints: APIEndpoint[] = [
    {
      id: 'endpoint-001',
      path: '/api/v1/leads',
      method: 'GET',
      description: 'Retrieve a list of leads with filtering and pagination',
      category: 'leads',
      version: 'v1',
      authentication: 'required',
      rateLimited: true,
      deprecated: false,
      parameters: [
        { name: 'page', type: 'integer', required: false, description: 'Page number for pagination' },
        { name: 'limit', type: 'integer', required: false, description: 'Number of results per page' },
        { name: 'status', type: 'string', required: false, description: 'Filter by lead status' },
        { name: 'source', type: 'string', required: false, description: 'Filter by lead source' }
      ],
      responses: [
        { code: 200, description: 'Successful response', example: { leads: [], pagination: {} } },
        { code: 401, description: 'Unauthorized', example: { error: 'Invalid API key' } },
        { code: 429, description: 'Rate limit exceeded', example: { error: 'Too many requests' } }
      ]
    },
    {
      id: 'endpoint-002',
      path: '/api/v1/leads/{id}',
      method: 'GET',
      description: 'Retrieve a specific lead by ID',
      category: 'leads',
      version: 'v1',
      authentication: 'required',
      rateLimited: true,
      deprecated: false,
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Lead ID' },
        { name: 'include', type: 'string', required: false, description: 'Include related data (activities, contacts)' }
      ],
      responses: [
        { code: 200, description: 'Lead found', example: { id: '123', name: 'John Doe' } },
        { code: 404, description: 'Lead not found', example: { error: 'Lead not found' } }
      ]
    },
    {
      id: 'endpoint-003',
      path: '/api/v1/leads',
      method: 'POST',
      description: 'Create a new lead',
      category: 'leads',
      version: 'v1',
      authentication: 'required',
      rateLimited: true,
      deprecated: false,
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Lead name' },
        { name: 'email', type: 'string', required: true, description: 'Lead email' },
        { name: 'phone', type: 'string', required: false, description: 'Lead phone number' },
        { name: 'company', type: 'string', required: false, description: 'Company name' }
      ],
      responses: [
        { code: 201, description: 'Lead created', example: { id: '123', name: 'John Doe' } },
        { code: 400, description: 'Validation error', example: { error: 'Invalid email format' } }
      ]
    },
    {
      id: 'endpoint-004',
      path: '/api/v1/reports/leads',
      method: 'GET',
      description: 'Generate lead analytics report',
      category: 'reports',
      version: 'v1',
      authentication: 'required',
      rateLimited: true,
      deprecated: false,
      parameters: [
        { name: 'from_date', type: 'date', required: true, description: 'Start date for report' },
        { name: 'to_date', type: 'date', required: true, description: 'End date for report' },
        { name: 'format', type: 'string', required: false, description: 'Report format (json, csv, pdf)' }
      ],
      responses: [
        { code: 200, description: 'Report generated', example: { data: [], summary: {} } }
      ]
    }
  ];

  // Mock data for API usage
  const apiUsage: APIUsage[] = [
    {
      timestamp: '2024-01-15T14:30:15Z',
      endpoint: '/api/v1/leads',
      method: 'GET',
      responseCode: 200,
      responseTime: 145,
      userAgent: 'CompanyApp/1.0',
      ipAddress: '192.168.1.100',
      apiKey: 'key-001',
      requestSize: 0,
      responseSize: 2456
    },
    {
      timestamp: '2024-01-15T14:30:12Z',
      endpoint: '/api/v1/leads/123',
      method: 'GET',
      responseCode: 200,
      responseTime: 89,
      userAgent: 'MobileApp/2.1',
      ipAddress: '10.0.0.50',
      apiKey: 'key-002',
      requestSize: 0,
      responseSize: 1234
    },
    {
      timestamp: '2024-01-15T14:30:08Z',
      endpoint: '/api/v1/reports/leads',
      method: 'GET',
      responseCode: 200,
      responseTime: 2340,
      userAgent: 'Analytics/1.5',
      ipAddress: '203.0.113.10',
      apiKey: 'key-003',
      requestSize: 156,
      responseSize: 45678
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return AlertCircle;
      case 'expired': return Clock;
      case 'revoked': return Lock;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-yellow-600 bg-yellow-50';
      case 'expired': return 'text-red-600 bg-red-50';
      case 'revoked': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full_access': return Shield;
      case 'read_only': return Eye;
      case 'write_only': return Edit;
      case 'custom': return Settings;
      default: return Key;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-blue-600 bg-blue-100';
      case 'POST': return 'text-green-600 bg-green-100';
      case 'PUT': return 'text-yellow-600 bg-yellow-100';
      case 'DELETE': return 'text-red-600 bg-red-100';
      case 'PATCH': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '...' + key.substring(key.length - 4);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const revokeKey = (keyId: string) => {
    console.log(`Revoking API key: ${keyId}`);
  };

  const regenerateKey = (keyId: string) => {
    console.log(`Regenerating API key: ${keyId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Access</h1>
          <p className="text-muted-foreground">Manage API keys, endpoints, and integration access</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Documentation
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="usage">Usage Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          {/* API Keys */}
          <div className="space-y-4">
            {apiKeys.map((key) => {
              const StatusIcon = getStatusIcon(key.status);
              const TypeIcon = getTypeIcon(key.type);
              const usagePercentage = (key.usage.todayRequests / key.rateLimits.requestsPerDay) * 100;
              
              return (
                <Card key={key.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <TypeIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{key.name}</h3>
                            <Badge className={getStatusColor(key.status)}>
                              {key.status}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {key.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{key.description}</p>
                          
                          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <Key className="h-4 w-4 text-gray-500" />
                            <code className="flex-1 text-sm font-mono">
                              {showKey === key.id ? key.key : maskKey(key.key)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                            >
                              {showKey === key.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(key.key)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Requests</p>
                              <p className="font-medium">{key.usage.totalRequests.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Today's Usage</p>
                              <p className="font-medium">{key.usage.todayRequests.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Daily Average</p>
                              <p className="font-medium">{key.usage.averageDaily.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Used</p>
                              <p className="font-medium">
                                {key.usage.lastUsed ? new Date(key.usage.lastUsed).toLocaleDateString() : 'Never'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Daily Usage</span>
                              <span>{key.usage.todayRequests} / {key.rateLimits.requestsPerDay.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all"
                                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {key.permissions.slice(0, 3).map(permission => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                            {key.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{key.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                            {key.expiresAt && (
                              <span>Expires: {new Date(key.expiresAt).toLocaleDateString()}</span>
                            )}
                            <span>By: {key.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => regenerateKey(key.id)}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => revokeKey(key.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Available API endpoints and their documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint) => (
                  <div key={endpoint.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getMethodColor(endpoint.method)}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono">{endpoint.path}</code>
                        {endpoint.deprecated && (
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            Deprecated
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary">{endpoint.category}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{endpoint.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Version: </span>
                        <span>{endpoint.version}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Auth: </span>
                        <span className="capitalize">{endpoint.authentication}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rate Limited: </span>
                        <span>{endpoint.rateLimited ? 'Yes' : 'No'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Parameters: </span>
                        <span>{endpoint.parameters.length}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Code className="h-3 w-3 mr-1" />
                        Try It
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-3 w-3 mr-1" />
                        Docs
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy URL
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Logs</CardTitle>
              <CardDescription>Recent API requests and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiUsage.map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge className={getMethodColor(log.method)}>
                        {log.method}
                      </Badge>
                      
                      <div>
                        <code className="text-sm font-mono">{log.endpoint}</code>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(log.timestamp).toLocaleString()} • {log.userAgent}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant={log.responseCode === 200 ? 'default' : 'destructive'}>
                        {log.responseCode}
                      </Badge>
                      <span>{log.responseTime}ms</span>
                      <span>{log.responseSize} bytes</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
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
                <CardTitle>Rate Limiting</CardTitle>
                <CardDescription>Configure global API rate limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Requests Per Minute</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Requests Per Hour</Label>
                  <Input type="number" defaultValue="10000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Requests Per Day</Label>
                  <Input type="number" defaultValue="100000" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="adaptive" />
                  <Label htmlFor="adaptive">Enable adaptive rate limiting</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure API security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Require HTTPS</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Log all requests</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Block suspicious IPs</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>API Key Prefix</Label>
                  <Input defaultValue="sk_" />
                </div>
                
                <div className="space-y-2">
                  <Label>Default Key Expiry (days)</Label>
                  <Input type="number" defaultValue="365" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIAccess;
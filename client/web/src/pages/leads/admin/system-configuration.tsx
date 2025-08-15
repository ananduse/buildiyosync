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
  Settings,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Globe,
  Mail,
  Database,
  Server,
  Shield,
  Key,
  Clock,
  Bell,
  FileText,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Eye,
  EyeOff,
  Zap,
  Activity,
  BarChart3,
  Users,
  MessageSquare,
  Phone,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Copy,
  ExternalLink,
  HelpCircle,
  Wrench,
  Cog,
  MonitorSpeaker,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  NetworkIcon
} from 'lucide-react';

interface SystemConfig {
  id: string;
  category: 'general' | 'email' | 'database' | 'integration' | 'security' | 'performance' | 'notification' | 'backup';
  key: string;
  name: string;
  description: string;
  value: string | number | boolean;
  defaultValue: string | number | boolean;
  type: 'text' | 'number' | 'boolean' | 'password' | 'select' | 'textarea' | 'json';
  options?: string[];
  validation?: {
    required: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  isEditable: boolean;
  requiresRestart: boolean;
  isSecret: boolean;
  lastModified?: string;
  modifiedBy?: string;
}

interface ConfigTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  configs: Partial<SystemConfig>[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastRestart: string;
  configurationIssues: ConfigurationIssue[];
  systemResources: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
}

interface ConfigurationIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  message: string;
  recommendation: string;
  configKey?: string;
  detectedAt: string;
}

const SystemConfiguration: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  const [editingConfig, setEditingConfig] = useState<string | null>(null);

  // Mock system configurations
  const configurations: SystemConfig[] = [
    {
      id: 'config-001',
      category: 'general',
      key: 'SYSTEM_NAME',
      name: 'System Name',
      description: 'Display name for the application',
      value: 'Buildiyo CRM',
      defaultValue: 'Buildiyo CRM',
      type: 'text',
      validation: { required: true },
      isEditable: true,
      requiresRestart: false,
      isSecret: false,
      lastModified: '2024-01-18T10:30:00Z',
      modifiedBy: 'admin@company.com'
    },
    {
      id: 'config-002',
      category: 'general',
      key: 'SYSTEM_TIMEZONE',
      name: 'System Timezone',
      description: 'Default timezone for the application',
      value: 'America/New_York',
      defaultValue: 'UTC',
      type: 'select',
      options: ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'],
      validation: { required: true },
      isEditable: true,
      requiresRestart: true,
      isSecret: false
    },
    {
      id: 'config-003',
      category: 'general',
      key: 'MAX_LEADS_PER_USER',
      name: 'Max Leads Per User',
      description: 'Maximum number of leads a user can own',
      value: 500,
      defaultValue: 100,
      type: 'number',
      validation: { required: true, min: 1, max: 10000 },
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    },
    {
      id: 'config-004',
      category: 'email',
      key: 'SMTP_HOST',
      name: 'SMTP Host',
      description: 'SMTP server hostname for email sending',
      value: 'smtp.company.com',
      defaultValue: '',
      type: 'text',
      validation: { required: true },
      isEditable: true,
      requiresRestart: true,
      isSecret: false
    },
    {
      id: 'config-005',
      category: 'email',
      key: 'SMTP_PASSWORD',
      name: 'SMTP Password',
      description: 'Password for SMTP authentication',
      value: '********',
      defaultValue: '',
      type: 'password',
      validation: { required: true },
      isEditable: true,
      requiresRestart: true,
      isSecret: true
    },
    {
      id: 'config-006',
      category: 'database',
      key: 'DB_POOL_SIZE',
      name: 'Database Pool Size',
      description: 'Maximum number of database connections',
      value: 20,
      defaultValue: 10,
      type: 'number',
      validation: { required: true, min: 1, max: 100 },
      isEditable: true,
      requiresRestart: true,
      isSecret: false
    },
    {
      id: 'config-007',
      category: 'security',
      key: 'SESSION_TIMEOUT',
      name: 'Session Timeout (minutes)',
      description: 'How long user sessions remain active',
      value: 480,
      defaultValue: 60,
      type: 'number',
      validation: { required: true, min: 5, max: 1440 },
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    },
    {
      id: 'config-008',
      category: 'security',
      key: 'ENABLE_2FA',
      name: 'Enable Two-Factor Authentication',
      description: 'Require 2FA for all users',
      value: true,
      defaultValue: false,
      type: 'boolean',
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    },
    {
      id: 'config-009',
      category: 'performance',
      key: 'CACHE_TTL',
      name: 'Cache TTL (seconds)',
      description: 'How long to cache data',
      value: 3600,
      defaultValue: 300,
      type: 'number',
      validation: { required: true, min: 60, max: 86400 },
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    },
    {
      id: 'config-010',
      category: 'notification',
      key: 'ENABLE_EMAIL_NOTIFICATIONS',
      name: 'Enable Email Notifications',
      description: 'Send email notifications to users',
      value: true,
      defaultValue: true,
      type: 'boolean',
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    },
    {
      id: 'config-011',
      category: 'backup',
      key: 'AUTO_BACKUP_INTERVAL',
      name: 'Auto Backup Interval (hours)',
      description: 'How often to automatically backup data',
      value: 24,
      defaultValue: 168,
      type: 'number',
      validation: { required: true, min: 1, max: 720 },
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    },
    {
      id: 'config-012',
      category: 'integration',
      key: 'WEBHOOK_URL',
      name: 'Webhook URL',
      description: 'URL for sending webhook notifications',
      value: 'https://api.company.com/webhooks',
      defaultValue: '',
      type: 'text',
      isEditable: true,
      requiresRestart: false,
      isSecret: false
    }
  ];

  // Mock system health
  const systemHealth: SystemHealth = {
    status: 'healthy',
    uptime: 95.8,
    lastRestart: '2024-01-15T08:30:00Z',
    configurationIssues: [
      {
        id: 'issue-001',
        severity: 'medium',
        category: 'email',
        message: 'SMTP configuration not tested recently',
        recommendation: 'Send a test email to verify SMTP settings',
        configKey: 'SMTP_HOST',
        detectedAt: '2024-01-18T14:00:00Z'
      },
      {
        id: 'issue-002',
        severity: 'low',
        category: 'performance',
        message: 'Cache hit rate below optimal',
        recommendation: 'Consider increasing cache TTL for frequently accessed data',
        configKey: 'CACHE_TTL',
        detectedAt: '2024-01-18T12:15:00Z'
      }
    ],
    systemResources: {
      cpu: 68,
      memory: 72,
      disk: 45,
      network: 23
    }
  };

  // Mock configuration templates
  const templates: ConfigTemplate[] = [
    {
      id: 'template-001',
      name: 'Production Environment',
      description: 'Optimized settings for production deployment',
      category: 'environment',
      configs: [
        { key: 'CACHE_TTL', value: 7200 },
        { key: 'SESSION_TIMEOUT', value: 480 },
        { key: 'ENABLE_2FA', value: true }
      ],
      isDefault: true,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    },
    {
      id: 'template-002',
      name: 'Development Environment',
      description: 'Settings optimized for development',
      category: 'environment',
      configs: [
        { key: 'CACHE_TTL', value: 60 },
        { key: 'SESSION_TIMEOUT', value: 1440 },
        { key: 'ENABLE_2FA', value: false }
      ],
      isDefault: false,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return Settings;
      case 'email': return Mail;
      case 'database': return Database;
      case 'integration': return Zap;
      case 'security': return Shield;
      case 'performance': return BarChart3;
      case 'notification': return Bell;
      case 'backup': return Upload;
      default: return Cog;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredConfigs = configurations.filter(config => {
    const matchesSearch = 
      config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.key.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || config.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleSaveConfig = (configId: string, newValue: any) => {
    console.log('Saving config:', configId, newValue);
    setHasUnsavedChanges(false);
    setEditingConfig(null);
  };

  const handleResetConfig = (configId: string) => {
    console.log('Resetting config:', configId);
    setHasUnsavedChanges(true);
  };

  const applyTemplate = (templateId: string) => {
    console.log('Applying template:', templateId);
    setHasUnsavedChanges(true);
  };

  const exportConfiguration = () => {
    console.log('Exporting configuration');
  };

  const importConfiguration = () => {
    console.log('Importing configuration');
  };

  const testConfiguration = (configKey: string) => {
    console.log('Testing configuration:', configKey);
  };

  const renderConfigValue = (config: SystemConfig) => {
    if (config.isSecret && !showSecrets) {
      return '••••••••';
    }

    if (editingConfig === config.id) {
      switch (config.type) {
        case 'boolean':
          return (
            <Switch
              checked={config.value as boolean}
              onCheckedChange={(checked) => handleSaveConfig(config.id, checked)}
            />
          );
        case 'select':
          return (
            <select
              value={config.value as string}
              onChange={(e) => handleSaveConfig(config.id, e.target.value)}
              className="px-3 py-1 border rounded"
            >
              {config.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        case 'textarea':
          return (
            <Textarea
              value={config.value as string}
              onChange={(e) => handleSaveConfig(config.id, e.target.value)}
              className="min-h-[80px]"
            />
          );
        case 'number':
          return (
            <Input
              type="number"
              value={config.value as number}
              onChange={(e) => handleSaveConfig(config.id, parseInt(e.target.value))}
              min={config.validation?.min}
              max={config.validation?.max}
            />
          );
        default:
          return (
            <Input
              type={config.type === 'password' ? 'password' : 'text'}
              value={config.value as string}
              onChange={(e) => handleSaveConfig(config.id, e.target.value)}
            />
          );
      }
    }

    switch (config.type) {
      case 'boolean':
        return config.value ? (
          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800">Disabled</Badge>
        );
      default:
        return <span className="font-mono">{config.value?.toString()}</span>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground mt-2">
            Manage system settings and configuration parameters
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Badge className="bg-orange-100 text-orange-800">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={exportConfiguration}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={importConfiguration}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStatusColor(systemHealth.status)}`}>
                {systemHealth.status.toUpperCase()}
              </div>
              <p className="text-sm text-muted-foreground">System Status</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{systemHealth.uptime}%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{systemHealth.configurationIssues.length}</div>
              <p className="text-sm text-muted-foreground">Config Issues</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {new Date(systemHealth.lastRestart).toLocaleDateString()}
              </div>
              <p className="text-sm text-muted-foreground">Last Restart</p>
            </div>
          </div>

          {/* System Resources */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CPU</span>
                <span className="text-sm font-medium">{systemHealth.systemResources.cpu}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${systemHealth.systemResources.cpu}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Memory</span>
                <span className="text-sm font-medium">{systemHealth.systemResources.memory}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${systemHealth.systemResources.memory}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Disk</span>
                <span className="text-sm font-medium">{systemHealth.systemResources.disk}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${systemHealth.systemResources.disk}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Network</span>
                <span className="text-sm font-medium">{systemHealth.systemResources.network}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${systemHealth.systemResources.network}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Issues */}
      {systemHealth.configurationIssues.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Configuration Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.configurationIssues.map((issue) => (
                <div key={issue.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <Badge className={getSeverityColor(issue.severity)}>
                    {issue.severity}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium">{issue.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {issue.recommendation}
                    </p>
                    {issue.configKey && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => testConfiguration(issue.configKey!)}
                      >
                        <Wrench className="h-3 w-3 mr-1" />
                        Test Configuration
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="configurations">All Configurations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Configuration</CardTitle>
              <CardDescription>
                Most commonly modified system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredConfigs
                  .filter(c => ['SYSTEM_NAME', 'SYSTEM_TIMEZONE', 'SESSION_TIMEOUT', 'ENABLE_2FA'].includes(c.key))
                  .map((config) => {
                    const CategoryIcon = getCategoryIcon(config.category);
                    
                    return (
                      <div key={config.id} className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryIcon className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium">{config.name}</h4>
                          {config.requiresRestart && (
                            <Badge variant="outline" className="text-xs">
                              Requires Restart
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {config.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {renderConfigValue(config)}
                          </div>
                          {config.isEditable && editingConfig !== config.id && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingConfig(config.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configurations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All System Configurations</CardTitle>
              <CardDescription>
                Complete list of system configuration parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search configurations..."
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
                  <option value="general">General</option>
                  <option value="email">Email</option>
                  <option value="database">Database</option>
                  <option value="integration">Integration</option>
                  <option value="security">Security</option>
                  <option value="performance">Performance</option>
                  <option value="notification">Notification</option>
                  <option value="backup">Backup</option>
                </select>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={showSecrets}
                    onCheckedChange={setShowSecrets}
                  />
                  <Label className="text-sm">Show Secrets</Label>
                </div>
              </div>

              {/* Configurations Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 font-medium grid grid-cols-12 gap-4">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-3">Value</div>
                  <div className="col-span-2">Modified</div>
                  <div className="col-span-2">Actions</div>
                </div>
                
                <div className="divide-y">
                  {filteredConfigs.map((config) => {
                    const CategoryIcon = getCategoryIcon(config.category);
                    
                    return (
                      <div key={config.id} className="px-4 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            {config.isSecret && <Key className="h-3 w-3 text-gray-400" />}
                            <div>
                              <p className="font-medium">{config.name}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {config.key}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {config.description}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-4 w-4 text-blue-600" />
                            <span className="text-sm capitalize">{config.category}</span>
                          </div>
                          {config.requiresRestart && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Restart Required
                            </Badge>
                          )}
                        </div>
                        
                        <div className="col-span-3">
                          {renderConfigValue(config)}
                          {config.value !== config.defaultValue && (
                            <div className="flex items-center gap-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                Modified
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <div className="col-span-2">
                          {config.lastModified && (
                            <div>
                              <p className="text-sm">
                                {new Date(config.lastModified).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                by {config.modifiedBy}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="col-span-2">
                          <div className="flex items-center gap-1">
                            {config.isEditable && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingConfig(config.id)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            )}
                            {config.value !== config.defaultValue && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleResetConfig(config.id)}
                              >
                                <RefreshCw className="h-3 w-3" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {filteredConfigs.length === 0 && (
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No configurations found</h3>
                  <p className="text-muted-foreground mt-2">
                    No configurations match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Templates</CardTitle>
              <CardDescription>
                Pre-configured settings for different environments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.isDefault && (
                          <Badge>Default</Badge>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">
                          Configurations ({template.configs.length}):
                        </p>
                        <div className="space-y-1">
                          {template.configs.map((config, index) => (
                            <div key={index} className="text-xs font-mono bg-gray-50 p-2 rounded">
                              {config.key}: {config.value?.toString()}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => applyTemplate(template.id)}
                        >
                          Apply Template
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="h-3 w-3 mr-1" />
                          Clone
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart Application
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Rebuild Cache
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Health Check
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Logs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="h-4 w-4 mr-2" />
                  Backup Configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfiguration;
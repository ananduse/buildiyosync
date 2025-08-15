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
  User,
  Users,
  Mail,
  Phone,
  Globe,
  Database,
  Shield,
  Bell,
  Activity,
  BarChart3,
  Clock,
  Calendar,
  Target,
  Zap,
  Filter,
  Search,
  Download,
  Upload,
  Save,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  ExternalLink,
  FileText,
  Image,
  Video,
  Mic,
  Camera,
  MapPin,
  Building,
  Tag,
  Hash,
  Link2,
  Bookmark,
  Star,
  Heart,
  Flag,
  Archive,
  MoreVertical,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SystemSetting {
  id: string;
  category: 'general' | 'notifications' | 'automation' | 'security' | 'integrations' | 'appearance';
  name: string;
  description: string;
  type: 'boolean' | 'string' | 'number' | 'select' | 'multi-select';
  value: any;
  defaultValue: any;
  options?: Array<{ value: string; label: string }>;
  isAdvanced?: boolean;
  requiresRestart?: boolean;
}

interface NotificationRule {
  id: string;
  name: string;
  event: string;
  channels: string[];
  recipients: string[];
  template: string;
  conditions?: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
  isActive: boolean;
  lastTriggered?: string;
}

interface IntegrationConfig {
  id: string;
  name: string;
  type: 'email' | 'crm' | 'marketing' | 'analytics' | 'communication' | 'storage';
  status: 'active' | 'inactive' | 'error' | 'pending';
  provider: string;
  settings: Record<string, any>;
  lastSync?: string;
  errorMessage?: string;
}

const LeadManagementSettings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Mock system settings
  const systemSettings: SystemSetting[] = [
    {
      id: 'auto-assign-leads',
      category: 'general',
      name: 'Auto-assign New Leads',
      description: 'Automatically assign incoming leads to team members based on rules',
      type: 'boolean',
      value: true,
      defaultValue: true
    },
    {
      id: 'lead-scoring-enabled',
      category: 'general',
      name: 'Enable Lead Scoring',
      description: 'Automatically calculate lead scores based on configured criteria',
      type: 'boolean',
      value: true,
      defaultValue: true
    },
    {
      id: 'default-lead-source',
      category: 'general',
      name: 'Default Lead Source',
      description: 'Default source for manually created leads',
      type: 'select',
      value: 'manual',
      defaultValue: 'manual',
      options: [
        { value: 'manual', label: 'Manual Entry' },
        { value: 'website', label: 'Website' },
        { value: 'referral', label: 'Referral' },
        { value: 'advertising', label: 'Advertising' }
      ]
    },
    {
      id: 'lead-retention-days',
      category: 'general',
      name: 'Lead Retention Period (Days)',
      description: 'Number of days to keep lead data before archiving',
      type: 'number',
      value: 365,
      defaultValue: 365,
      isAdvanced: true
    },
    {
      id: 'duplicate-detection',
      category: 'general',
      name: 'Enable Duplicate Detection',
      description: 'Automatically detect and merge duplicate leads',
      type: 'boolean',
      value: true,
      defaultValue: true
    },
    {
      id: 'email-notifications',
      category: 'notifications',
      name: 'Email Notifications',
      description: 'Send email notifications for lead activities',
      type: 'boolean',
      value: true,
      defaultValue: true
    },
    {
      id: 'push-notifications',
      category: 'notifications',
      name: 'Browser Push Notifications',
      description: 'Show browser push notifications for important events',
      type: 'boolean',
      value: false,
      defaultValue: false
    },
    {
      id: 'notification-frequency',
      category: 'notifications',
      name: 'Notification Frequency',
      description: 'How often to send notification summaries',
      type: 'select',
      value: 'immediate',
      defaultValue: 'immediate',
      options: [
        { value: 'immediate', label: 'Immediate' },
        { value: 'hourly', label: 'Hourly' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' }
      ]
    },
    {
      id: 'auto-workflows',
      category: 'automation',
      name: 'Enable Automation Workflows',
      description: 'Allow automated workflows to run on leads',
      type: 'boolean',
      value: true,
      defaultValue: true
    },
    {
      id: 'follow-up-reminders',
      category: 'automation',
      name: 'Automatic Follow-up Reminders',
      description: 'Create automatic follow-up tasks for leads',
      type: 'boolean',
      value: true,
      defaultValue: true
    },
    {
      id: 'session-timeout',
      category: 'security',
      name: 'Session Timeout (Minutes)',
      description: 'Automatically log out users after inactivity',
      type: 'number',
      value: 60,
      defaultValue: 60,
      isAdvanced: true
    },
    {
      id: 'require-2fa',
      category: 'security',
      name: 'Require Two-Factor Authentication',
      description: 'Force all users to enable 2FA',
      type: 'boolean',
      value: false,
      defaultValue: false,
      isAdvanced: true
    },
    {
      id: 'theme',
      category: 'appearance',
      name: 'Default Theme',
      description: 'Default color theme for new users',
      type: 'select',
      value: 'light',
      defaultValue: 'light',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'auto', label: 'Auto (System)' }
      ]
    },
    {
      id: 'items-per-page',
      category: 'appearance',
      name: 'Items Per Page',
      description: 'Default number of items to show in lists',
      type: 'select',
      value: '25',
      defaultValue: '25',
      options: [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' }
      ]
    }
  ];

  // Mock notification rules
  const notificationRules: NotificationRule[] = [
    {
      id: 'new-lead-notification',
      name: 'New Lead Created',
      event: 'lead_created',
      channels: ['email', 'push'],
      recipients: ['assigned_user', 'team_lead'],
      template: 'new_lead_template',
      isActive: true,
      lastTriggered: '2024-01-18T10:30:00Z'
    },
    {
      id: 'lead-converted',
      name: 'Lead Converted',
      event: 'lead_converted',
      channels: ['email'],
      recipients: ['assigned_user', 'sales_manager'],
      template: 'lead_conversion_template',
      conditions: [
        { field: 'lead_value', operator: 'greater_than', value: 10000 }
      ],
      isActive: true,
      lastTriggered: '2024-01-17T15:45:00Z'
    },
    {
      id: 'follow-up-reminder',
      name: 'Follow-up Reminder',
      event: 'follow_up_due',
      channels: ['email', 'push'],
      recipients: ['assigned_user'],
      template: 'follow_up_reminder_template',
      isActive: true,
      lastTriggered: '2024-01-18T09:00:00Z'
    }
  ];

  // Mock integration configs
  const integrationConfigs: IntegrationConfig[] = [
    {
      id: 'email-provider',
      name: 'Email Service',
      type: 'email',
      status: 'active',
      provider: 'SendGrid',
      settings: {
        apiKey: '***********',
        fromEmail: 'noreply@company.com',
        templates: ['welcome', 'follow_up', 'conversion']
      },
      lastSync: '2024-01-18T10:00:00Z'
    },
    {
      id: 'crm-integration',
      name: 'CRM Integration',
      type: 'crm',
      status: 'active',
      provider: 'Salesforce',
      settings: {
        instanceUrl: 'https://company.salesforce.com',
        clientId: 'app_client_id',
        syncFrequency: 'every_hour'
      },
      lastSync: '2024-01-18T09:30:00Z'
    },
    {
      id: 'analytics-tracking',
      name: 'Analytics Tracking',
      type: 'analytics',
      status: 'error',
      provider: 'Google Analytics',
      settings: {
        trackingId: 'GA-XXXXXXXXX',
        enableEcommerce: true
      },
      errorMessage: 'Invalid tracking ID format'
    },
    {
      id: 'sms-service',
      name: 'SMS Service',
      type: 'communication',
      status: 'inactive',
      provider: 'Twilio',
      settings: {
        accountSid: 'AC***********',
        authToken: '***********',
        fromNumber: '+1234567890'
      }
    }
  ];

  const filteredSettings = systemSettings.filter(setting => {
    const matchesSearch = !searchTerm || 
      setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      setting.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAdvanced = showAdvanced || !setting.isAdvanced;
    return matchesSearch && matchesAdvanced;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general': return Settings;
      case 'notifications': return Bell;
      case 'automation': return Zap;
      case 'security': return Shield;
      case 'integrations': return Link2;
      case 'appearance': return Eye;
      default: return Settings;
    }
  };

  const getIntegrationStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'crm': return Database;
      case 'marketing': return Target;
      case 'analytics': return BarChart3;
      case 'communication': return Phone;
      case 'storage': return Archive;
      default: return Link2;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSettingChange = (settingId: string, value: any) => {
    setUnsavedChanges(true);
    console.log('Setting changed:', settingId, value);
  };

  const handleSaveSettings = () => {
    setUnsavedChanges(false);
    console.log('Saving settings');
  };

  const handleResetSettings = () => {
    setUnsavedChanges(false);
    console.log('Resetting settings to defaults');
  };

  const handleTestIntegration = (integrationId: string) => {
    console.log('Testing integration:', integrationId);
  };

  const handleConfigureIntegration = (integrationId: string) => {
    console.log('Configuring integration:', integrationId);
  };

  const handleToggleNotificationRule = (ruleId: string) => {
    console.log('Toggling notification rule:', ruleId);
  };

  const renderSettingControl = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <Switch
            checked={setting.value}
            onCheckedChange={(checked) => handleSettingChange(setting.id, checked)}
          />
        );
      case 'string':
        return (
          <Input
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, Number(e.target.value))}
          />
        );
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return <span>Unsupported setting type</span>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Management Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system settings, notifications, and integrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unsavedChanges && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings} disabled={!unsavedChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic configuration options for lead management
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search settings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    checked={showAdvanced}
                    onCheckedChange={setShowAdvanced}
                  />
                  <Label>Show Advanced</Label>
                </div>
              </div>

              {/* Settings List */}
              <div className="space-y-6">
                {['general', 'appearance'].map((category) => {
                  const categorySettings = filteredSettings.filter(s => s.category === category);
                  if (categorySettings.length === 0) return null;
                  
                  const CategoryIcon = getCategoryIcon(category);
                  
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-4">
                        <CategoryIcon className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold capitalize">{category}</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {categorySettings.map((setting) => (
                          <Card key={setting.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Label className="font-medium">{setting.name}</Label>
                                    {setting.isAdvanced && (
                                      <Badge variant="outline" className="text-xs">
                                        Advanced
                                      </Badge>
                                    )}
                                    {setting.requiresRestart && (
                                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                                        Requires Restart
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {setting.description}
                                  </p>
                                </div>
                                
                                <div className="ml-4">
                                  {renderSettingControl(setting)}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how users receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Notification Settings */}
              <div className="space-y-6 mb-6">
                {filteredSettings
                  .filter(s => s.category === 'notifications')
                  .map((setting) => (
                    <Card key={setting.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Label className="font-medium">{setting.name}</Label>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <div className="ml-4">
                            {renderSettingControl(setting)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Notification Rules */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Notification Rules</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>

                <div className="space-y-3">
                  {notificationRules.map((rule) => (
                    <Card key={rule.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{rule.name}</h4>
                              <Badge variant="outline">{rule.event}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Bell className="h-3 w-3" />
                                <span>{rule.channels.join(', ')}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{rule.recipients.join(', ')}</span>
                              </div>
                              {rule.lastTriggered && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Last: {formatDate(rule.lastTriggered)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Switch
                              checked={rule.isActive}
                              onCheckedChange={() => handleToggleNotificationRule(rule.id)}
                            />
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <CardDescription>
                Configure automated workflows and processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredSettings
                  .filter(s => s.category === 'automation')
                  .map((setting) => (
                    <Card key={setting.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <Label className="font-medium">{setting.name}</Label>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <div className="ml-4">
                            {renderSettingControl(setting)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredSettings
                  .filter(s => s.category === 'security')
                  .map((setting) => (
                    <Card key={setting.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Label className="font-medium">{setting.name}</Label>
                              {setting.isAdvanced && (
                                <Badge variant="outline" className="text-xs">
                                  Advanced
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                          <div className="ml-4">
                            {renderSettingControl(setting)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Manage external service integrations and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrationConfigs.map((integration) => {
                  const IntegrationIcon = getIntegrationIcon(integration.type);
                  
                  return (
                    <Card key={integration.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <IntegrationIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{integration.name}</h3>
                                <Badge className={getIntegrationStatusColor(integration.status)}>
                                  {integration.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  <span className="capitalize">{integration.type}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Building className="h-3 w-3" />
                                  <span>{integration.provider}</span>
                                </div>
                                {integration.lastSync && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>Last sync: {formatDate(integration.lastSync)}</span>
                                  </div>
                                )}
                              </div>
                              {integration.errorMessage && (
                                <p className="text-sm text-red-600 mt-1">
                                  <AlertTriangle className="h-3 w-3 inline mr-1" />
                                  {integration.errorMessage}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleTestIntegration(integration.id)}
                            >
                              Test
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleConfigureIntegration(integration.id)}
                            >
                              Configure
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
      </Tabs>
    </div>
  );
};

export default LeadManagementSettings;
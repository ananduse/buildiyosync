import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Download,
  Upload,
  FileText,
  FileSpreadsheet,
  FileImage,
  Database,
  Cloud,
  Settings,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  Trash2,
  Eye,
  Share2,
  Archive,
  RefreshCw,
  Plus,
  FolderOpen,
  Users,
  Lock,
  Globe,
  Mail,
  Link,
  Copy,
  ExternalLink,
  Zap,
  Target,
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  DollarSign,
  Building,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Bookmark,
  Info,
  ChevronDown,
  ChevronRight,
  X
} from 'lucide-react';

interface ExportJob {
  id: string;
  name: string;
  description: string;
  type: 'data' | 'report' | 'dashboard' | 'backup';
  format: 'csv' | 'xlsx' | 'pdf' | 'json' | 'xml' | 'sql' | 'zip';
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  size: number;
  recordCount: number;
  startTime: string;
  endTime?: string;
  downloadUrl?: string;
  expiresAt: string;
  creator: {
    name: string;
    email: string;
    avatar: string;
  };
  parameters: {
    dataSource: string;
    dateRange: string;
    filters: Record<string, any>;
    includeImages: boolean;
    compressed: boolean;
  };
  sharing: {
    isPublic: boolean;
    allowedUsers: string[];
    downloadCount: number;
    maxDownloads?: number;
  };
  error?: string;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'leads' | 'sales' | 'marketing' | 'reports' | 'system';
  type: 'data' | 'report' | 'dashboard';
  format: string[];
  fields: string[];
  filters: string[];
  isPopular: boolean;
  usageCount: number;
  lastUsed?: string;
  estimatedTime: string;
  estimatedSize: string;
}

interface CloudStorage {
  id: string;
  name: string;
  provider: 'google_drive' | 'dropbox' | 'onedrive' | 'aws_s3' | 'azure_blob';
  status: 'connected' | 'disconnected' | 'error';
  capacity: number;
  used: number;
  isDefault: boolean;
}

const ExportCenter: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('exports');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for export jobs
  const exportJobs: ExportJob[] = [
    {
      id: 'exp-001',
      name: 'All Leads Data Export',
      description: 'Complete lead database export with contact information and activity history',
      type: 'data',
      format: 'xlsx',
      status: 'completed',
      progress: 100,
      size: 15.7,
      recordCount: 12478,
      startTime: '2024-01-15T10:30:00Z',
      endTime: '2024-01-15T10:34:23Z',
      downloadUrl: '/exports/leads-2024-01-15.xlsx',
      expiresAt: '2024-01-22T10:34:23Z',
      creator: {
        name: 'Sarah Wilson',
        email: 'sarah@company.com',
        avatar: 'SW'
      },
      parameters: {
        dataSource: 'leads',
        dateRange: 'all_time',
        filters: { status: 'all' },
        includeImages: false,
        compressed: false
      },
      sharing: {
        isPublic: false,
        allowedUsers: ['sarah@company.com', 'manager@company.com'],
        downloadCount: 3,
        maxDownloads: 10
      }
    },
    {
      id: 'exp-002',
      name: 'Q4 Sales Report',
      description: 'Quarterly sales performance report with charts and analytics',
      type: 'report',
      format: 'pdf',
      status: 'processing',
      progress: 65,
      size: 8.2,
      recordCount: 3456,
      startTime: '2024-01-15T14:20:00Z',
      expiresAt: '2024-01-22T14:20:00Z',
      creator: {
        name: 'Mike Chen',
        email: 'mike@company.com',
        avatar: 'MC'
      },
      parameters: {
        dataSource: 'sales',
        dateRange: 'q4_2023',
        filters: { territory: 'all' },
        includeImages: true,
        compressed: false
      },
      sharing: {
        isPublic: false,
        allowedUsers: ['mike@company.com', 'executives@company.com'],
        downloadCount: 0
      }
    },
    {
      id: 'exp-003',
      name: 'Marketing Campaigns Data',
      description: 'Campaign performance data with detailed metrics and ROI analysis',
      type: 'data',
      format: 'csv',
      status: 'queued',
      progress: 0,
      size: 0,
      recordCount: 0,
      startTime: '2024-01-15T16:00:00Z',
      expiresAt: '2024-01-22T16:00:00Z',
      creator: {
        name: 'Lisa Johnson',
        email: 'lisa@company.com',
        avatar: 'LJ'
      },
      parameters: {
        dataSource: 'campaigns',
        dateRange: 'last_6_months',
        filters: { status: 'active' },
        includeImages: false,
        compressed: true
      },
      sharing: {
        isPublic: false,
        allowedUsers: ['lisa@company.com'],
        downloadCount: 0
      }
    },
    {
      id: 'exp-004',
      name: 'Customer Database Backup',
      description: 'Complete customer database backup with all related tables',
      type: 'backup',
      format: 'sql',
      status: 'failed',
      progress: 25,
      size: 0,
      recordCount: 0,
      startTime: '2024-01-15T02:00:00Z',
      endTime: '2024-01-15T02:15:00Z',
      expiresAt: '2024-01-22T02:00:00Z',
      creator: {
        name: 'Alex Turner',
        email: 'alex@company.com',
        avatar: 'AT'
      },
      parameters: {
        dataSource: 'full_database',
        dateRange: 'all_time',
        filters: {},
        includeImages: true,
        compressed: true
      },
      sharing: {
        isPublic: false,
        allowedUsers: ['alex@company.com'],
        downloadCount: 0
      },
      error: 'Database connection timeout during export process'
    }
  ];

  // Mock data for export templates
  const exportTemplates: ExportTemplate[] = [
    {
      id: 'tpl-001',
      name: 'Lead Contact List',
      description: 'Basic contact information for all leads',
      category: 'leads',
      type: 'data',
      format: ['csv', 'xlsx'],
      fields: ['name', 'email', 'phone', 'company', 'status', 'source'],
      filters: ['status', 'source', 'date_range', 'score_range'],
      isPopular: true,
      usageCount: 127,
      lastUsed: '2024-01-15T10:30:00Z',
      estimatedTime: '2-5 minutes',
      estimatedSize: '1-10 MB'
    },
    {
      id: 'tpl-002',
      name: 'Sales Pipeline Report',
      description: 'Detailed sales pipeline analysis with forecasting',
      category: 'sales',
      type: 'report',
      format: ['pdf', 'xlsx'],
      fields: ['deal_name', 'value', 'stage', 'probability', 'close_date', 'owner'],
      filters: ['stage', 'owner', 'value_range', 'date_range'],
      isPopular: true,
      usageCount: 89,
      lastUsed: '2024-01-14T16:45:00Z',
      estimatedTime: '5-10 minutes',
      estimatedSize: '5-15 MB'
    },
    {
      id: 'tpl-003',
      name: 'Marketing Analytics Dashboard',
      description: 'Campaign performance and ROI metrics visualization',
      category: 'marketing',
      type: 'dashboard',
      format: ['pdf'],
      fields: ['campaign', 'spend', 'impressions', 'clicks', 'conversions', 'roi'],
      filters: ['campaign_type', 'date_range', 'budget_range'],
      isPopular: false,
      usageCount: 34,
      lastUsed: '2024-01-12T09:20:00Z',
      estimatedTime: '3-8 minutes',
      estimatedSize: '2-8 MB'
    },
    {
      id: 'tpl-004',
      name: 'Activity Summary Report',
      description: 'Team activity and productivity summary',
      category: 'reports',
      type: 'report',
      format: ['pdf', 'xlsx', 'csv'],
      fields: ['user', 'calls', 'emails', 'meetings', 'tasks', 'deals_closed'],
      filters: ['user', 'team', 'date_range', 'activity_type'],
      isPopular: true,
      usageCount: 156,
      lastUsed: '2024-01-15T08:15:00Z',
      estimatedTime: '1-3 minutes',
      estimatedSize: '1-5 MB'
    }
  ];

  // Mock data for cloud storage
  const cloudStorages: CloudStorage[] = [
    {
      id: 'cs-001',
      name: 'Company Google Drive',
      provider: 'google_drive',
      status: 'connected',
      capacity: 1000,
      used: 456.7,
      isDefault: true
    },
    {
      id: 'cs-002',
      name: 'Dropbox Business',
      provider: 'dropbox',
      status: 'connected',
      capacity: 2000,
      used: 234.5,
      isDefault: false
    },
    {
      id: 'cs-003',
      name: 'AWS S3 Bucket',
      provider: 'aws_s3',
      status: 'connected',
      capacity: 5000,
      used: 1234.6,
      isDefault: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Loader;
      case 'queued': return Clock;
      case 'failed': return AlertCircle;
      case 'cancelled': return X;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'queued': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'cancelled': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'xlsx': case 'csv': return FileSpreadsheet;
      case 'pdf': return FileText;
      case 'json': case 'xml': case 'sql': return Database;
      case 'zip': return Archive;
      default: return FileText;
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google_drive': return Globe;
      case 'dropbox': return Cloud;
      case 'onedrive': return Cloud;
      case 'aws_s3': return Database;
      case 'azure_blob': return Cloud;
      default: return Cloud;
    }
  };

  const filteredExports = exportJobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const cancelExport = (jobId: string) => {
    console.log(`Cancelling export: ${jobId}`);
  };

  const retryExport = (jobId: string) => {
    console.log(`Retrying export: ${jobId}`);
  };

  const downloadExport = (jobId: string) => {
    console.log(`Downloading export: ${jobId}`);
  };

  const deleteExport = (jobId: string) => {
    console.log(`Deleting export: ${jobId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Export Center</h1>
          <p className="text-muted-foreground">Manage data exports, reports, and file sharing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="exports">Export Jobs</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="storage">Cloud Storage</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="exports" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Jobs */}
          <div className="space-y-4">
            {filteredExports.map((job) => {
              const StatusIcon = getStatusIcon(job.status);
              const FormatIcon = getFormatIcon(job.format);
              
              return (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <FormatIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{job.name}</h3>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <Badge variant="outline">
                              {job.format.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{job.description}</p>
                          
                          {job.status === 'processing' && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span>{job.progress}%</span>
                              </div>
                              <Progress value={job.progress} className="h-2" />
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Size</p>
                              <p className="font-medium">
                                {job.size > 0 ? `${job.size.toFixed(1)} MB` : 'Calculating...'}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Records</p>
                              <p className="font-medium">
                                {job.recordCount > 0 ? job.recordCount.toLocaleString() : 'Counting...'}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Started</p>
                              <p className="font-medium">
                                {new Date(job.startTime).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Expires</p>
                              <p className="font-medium">
                                {new Date(job.expiresAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          {job.error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm text-red-700">{job.error}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created by {job.creator.name}</span>
                            {job.sharing.downloadCount > 0 && (
                              <span>{job.sharing.downloadCount} downloads</span>
                            )}
                            {job.sharing.isPublic && (
                              <Badge variant="outline" className="text-xs">
                                <Globe className="h-3 w-3 mr-1" />
                                Public
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {job.status === 'completed' && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => downloadExport(job.id)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                        
                        {job.status === 'processing' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelExport(job.id)}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        )}
                        
                        {job.status === 'failed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => retryExport(job.id)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Retry
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteExport(job.id)}
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

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Templates</CardTitle>
              <CardDescription>Pre-configured export templates for common data exports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {exportTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{template.name}</h3>
                              {template.isPopular && (
                                <Badge variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Formats: </span>
                            <span>{template.format.join(', ').toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fields: </span>
                            <span>{template.fields.length} columns</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Usage: </span>
                            <span>{template.usageCount} times</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <span>⏱️ {template.estimatedTime}</span>
                          <span>📁 {template.estimatedSize}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Use Template
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-3 w-3" />
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

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cloud Storage Connections</CardTitle>
              <CardDescription>Manage your cloud storage integrations for automated exports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cloudStorages.map((storage) => {
                  const ProviderIcon = getProviderIcon(storage.provider);
                  const usagePercentage = (storage.used / storage.capacity) * 100;
                  
                  return (
                    <div key={storage.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <ProviderIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{storage.name}</h4>
                            {storage.isDefault && (
                              <Badge variant="outline" className="text-xs">Default</Badge>
                            )}
                            <Badge className={
                              storage.status === 'connected' ? 'bg-green-100 text-green-800' :
                              storage.status === 'error' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {storage.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm w-64">
                              <span>Storage Usage</span>
                              <span>{storage.used.toFixed(1)} GB / {storage.capacity} GB</span>
                            </div>
                            <Progress value={usagePercentage} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                <Card className="border-dashed">
                  <CardContent className="flex items-center justify-center p-8">
                    <div className="text-center space-y-3">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Connect Additional Storage</p>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Storage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Defaults</CardTitle>
                <CardDescription>Configure default settings for data exports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Format</Label>
                  <Select defaultValue="xlsx">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>File Retention Period</Label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="compress" defaultChecked />
                  <Label htmlFor="compress">Compress large files automatically</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="email" />
                  <Label htmlFor="email">Email notification on completion</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure export security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="encryption" defaultChecked />
                  <Label htmlFor="encryption">Encrypt exported files</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="watermark" />
                  <Label htmlFor="watermark">Add watermarks to PDFs</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="audit" defaultChecked />
                  <Label htmlFor="audit">Log all export activities</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Maximum File Size (MB)</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                
                <div className="space-y-2">
                  <Label>Concurrent Export Limit</Label>
                  <Input type="number" defaultValue="5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportCenter;
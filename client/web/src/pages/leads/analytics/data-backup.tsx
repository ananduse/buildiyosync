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
import { Switch } from '@/components/ui/switch';
import { 
  Database,
  HardDrive,
  Cloud,
  Shield,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Loader,
  Calendar,
  Archive,
  FolderOpen,
  FileText,
  Lock,
  Key,
  Server,
  Globe,
  Activity,
  BarChart3,
  Users,
  Building,
  Target,
  DollarSign,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  Trash2,
  Eye,
  Copy,
  Edit,
  Search,
  Filter,
  History,
  AlertTriangle,
  Info,
  Star,
  Bookmark,
  ExternalLink,
  FileCheck,
  FileX,
  Timer,
  Zap,
  TrendingUp,
  Award,
  PieChart
} from 'lucide-react';

interface BackupJob {
  id: string;
  name: string;
  description: string;
  type: 'full' | 'incremental' | 'differential' | 'selective';
  schedule: {
    frequency: 'manual' | 'daily' | 'weekly' | 'monthly';
    time?: string;
    dayOfWeek?: number;
    dayOfMonth?: number;
    nextRun?: string;
  };
  status: 'active' | 'paused' | 'error' | 'running' | 'completed';
  lastRun?: string;
  lastSize?: number;
  progress?: number;
  retention: {
    period: number;
    unit: 'days' | 'weeks' | 'months';
    maxBackups: number;
  };
  destination: {
    type: 'local' | 'cloud' | 'remote';
    location: string;
    encrypted: boolean;
    compressed: boolean;
  };
  includedTables: string[];
  excludedTables: string[];
  execution: {
    totalRuns: number;
    successfulRuns: number;
    failedRuns: number;
    averageDuration: number;
    averageSize: number;
  };
  creator: string;
  createdAt: string;
  updatedAt: string;
}

interface BackupHistory {
  id: string;
  jobId: string;
  jobName: string;
  timestamp: string;
  type: 'full' | 'incremental' | 'differential' | 'selective';
  status: 'completed' | 'failed' | 'partial';
  size: number;
  duration: number;
  tablesBackedUp: number;
  recordsBackedUp: number;
  destination: string;
  checksum: string;
  error?: string;
  restorable: boolean;
}

interface StorageLocation {
  id: string;
  name: string;
  type: 'local' | 'aws_s3' | 'google_cloud' | 'azure_blob' | 'ftp' | 'sftp';
  status: 'connected' | 'disconnected' | 'error';
  capacity?: number;
  used?: number;
  isDefault: boolean;
  encrypted: boolean;
  configuration: Record<string, any>;
}

const DataBackup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for backup jobs
  const backupJobs: BackupJob[] = [
    {
      id: 'backup-001',
      name: 'Full Database Backup',
      description: 'Complete backup of all lead management data including files',
      type: 'full',
      schedule: {
        frequency: 'daily',
        time: '02:00',
        nextRun: '2024-01-16T02:00:00Z'
      },
      status: 'active',
      lastRun: '2024-01-15T02:00:00Z',
      lastSize: 2.3,
      retention: {
        period: 30,
        unit: 'days',
        maxBackups: 10
      },
      destination: {
        type: 'cloud',
        location: 'AWS S3 - Primary',
        encrypted: true,
        compressed: true
      },
      includedTables: ['leads', 'contacts', 'companies', 'activities', 'communications', 'deals', 'users'],
      excludedTables: ['temp_data', 'session_logs'],
      execution: {
        totalRuns: 127,
        successfulRuns: 125,
        failedRuns: 2,
        averageDuration: 1847,
        averageSize: 2.1
      },
      creator: 'System Admin',
      createdAt: '2023-10-01T00:00:00Z',
      updatedAt: '2024-01-10T15:30:00Z'
    },
    {
      id: 'backup-002',
      name: 'Lead Data Incremental',
      description: 'Incremental backup of lead and contact data changes',
      type: 'incremental',
      schedule: {
        frequency: 'daily',
        time: '06:00',
        nextRun: '2024-01-16T06:00:00Z'
      },
      status: 'active',
      lastRun: '2024-01-15T06:00:00Z',
      lastSize: 0.3,
      retention: {
        period: 7,
        unit: 'days',
        maxBackups: 50
      },
      destination: {
        type: 'cloud',
        location: 'Google Cloud Storage',
        encrypted: true,
        compressed: false
      },
      includedTables: ['leads', 'contacts', 'activities'],
      excludedTables: ['audit_logs', 'temp_data'],
      execution: {
        totalRuns: 89,
        successfulRuns: 87,
        failedRuns: 2,
        averageDuration: 234,
        averageSize: 0.4
      },
      creator: 'Data Manager',
      createdAt: '2023-11-15T08:30:00Z',
      updatedAt: '2024-01-08T10:15:00Z'
    },
    {
      id: 'backup-003',
      name: 'Weekly Configuration Backup',
      description: 'Weekly backup of system configuration and settings',
      type: 'selective',
      schedule: {
        frequency: 'weekly',
        dayOfWeek: 0,
        time: '01:00',
        nextRun: '2024-01-21T01:00:00Z'
      },
      status: 'active',
      lastRun: '2024-01-14T01:00:00Z',
      lastSize: 0.1,
      retention: {
        period: 3,
        unit: 'months',
        maxBackups: 20
      },
      destination: {
        type: 'local',
        location: '/backups/config',
        encrypted: false,
        compressed: true
      },
      includedTables: ['settings', 'users', 'roles', 'permissions'],
      excludedTables: ['leads', 'contacts', 'activities'],
      execution: {
        totalRuns: 18,
        successfulRuns: 18,
        failedRuns: 0,
        averageDuration: 67,
        averageSize: 0.1
      },
      creator: 'IT Admin',
      createdAt: '2023-12-01T10:00:00Z',
      updatedAt: '2023-12-01T10:00:00Z'
    },
    {
      id: 'backup-004',
      name: 'Critical Data Backup',
      description: 'High-priority backup of essential business data',
      type: 'selective',
      schedule: {
        frequency: 'manual'
      },
      status: 'running',
      progress: 45,
      retention: {
        period: 1,
        unit: 'months',
        maxBackups: 5
      },
      destination: {
        type: 'cloud',
        location: 'Azure Blob Storage',
        encrypted: true,
        compressed: true
      },
      includedTables: ['leads', 'deals', 'companies', 'contacts'],
      excludedTables: ['logs', 'temp_data', 'cache'],
      execution: {
        totalRuns: 12,
        successfulRuns: 10,
        failedRuns: 2,
        averageDuration: 892,
        averageSize: 1.2
      },
      creator: 'Backup Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T14:30:00Z'
    }
  ];

  // Mock data for backup history
  const backupHistory: BackupHistory[] = [
    {
      id: 'hist-001',
      jobId: 'backup-001',
      jobName: 'Full Database Backup',
      timestamp: '2024-01-15T02:00:00Z',
      type: 'full',
      status: 'completed',
      size: 2.3,
      duration: 1847,
      tablesBackedUp: 12,
      recordsBackedUp: 45678,
      destination: 'AWS S3 - Primary',
      checksum: 'sha256:a1b2c3d4e5f6...',
      restorable: true
    },
    {
      id: 'hist-002',
      jobId: 'backup-002',
      jobName: 'Lead Data Incremental',
      timestamp: '2024-01-15T06:00:00Z',
      type: 'incremental',
      status: 'completed',
      size: 0.3,
      duration: 234,
      tablesBackedUp: 3,
      recordsBackedUp: 1234,
      destination: 'Google Cloud Storage',
      checksum: 'sha256:f6e5d4c3b2a1...',
      restorable: true
    },
    {
      id: 'hist-003',
      jobId: 'backup-001',
      jobName: 'Full Database Backup',
      timestamp: '2024-01-14T02:00:00Z',
      type: 'full',
      status: 'failed',
      size: 0,
      duration: 156,
      tablesBackedUp: 0,
      recordsBackedUp: 0,
      destination: 'AWS S3 - Primary',
      checksum: '',
      error: 'Connection timeout to storage provider',
      restorable: false
    }
  ];

  // Mock data for storage locations
  const storageLocations: StorageLocation[] = [
    {
      id: 'storage-001',
      name: 'AWS S3 - Primary',
      type: 'aws_s3',
      status: 'connected',
      capacity: 1000,
      used: 567,
      isDefault: true,
      encrypted: true,
      configuration: {
        bucket: 'company-backups-primary',
        region: 'us-east-1'
      }
    },
    {
      id: 'storage-002',
      name: 'Google Cloud Storage',
      type: 'google_cloud',
      status: 'connected',
      capacity: 500,
      used: 123,
      isDefault: false,
      encrypted: true,
      configuration: {
        bucket: 'backup-storage-gcs',
        project: 'company-project'
      }
    },
    {
      id: 'storage-003',
      name: 'Local Backup Drive',
      type: 'local',
      status: 'connected',
      capacity: 2000,
      used: 890,
      isDefault: false,
      encrypted: false,
      configuration: {
        path: '/backups/local'
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return Pause;
      case 'error': return AlertCircle;
      case 'running': return Loader;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full': return Database;
      case 'incremental': return TrendingUp;
      case 'differential': return BarChart3;
      case 'selective': return Target;
      default: return Archive;
    }
  };

  const getStorageIcon = (type: string) => {
    switch (type) {
      case 'aws_s3': return Cloud;
      case 'google_cloud': return Cloud;
      case 'azure_blob': return Cloud;
      case 'local': return HardDrive;
      case 'ftp': case 'sftp': return Server;
      default: return Archive;
    }
  };

  const filteredJobs = backupJobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const runBackup = (jobId: string) => {
    console.log(`Running backup: ${jobId}`);
  };

  const pauseBackup = (jobId: string) => {
    console.log(`Pausing backup: ${jobId}`);
  };

  const deleteBackup = (jobId: string) => {
    console.log(`Deleting backup: ${jobId}`);
  };

  const restoreBackup = (historyId: string) => {
    console.log(`Restoring from backup: ${historyId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Backup</h1>
          <p className="text-muted-foreground">Manage database backups and disaster recovery</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Backup Job
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="jobs">Backup Jobs</TabsTrigger>
          <TabsTrigger value="history">Backup History</TabsTrigger>
          <TabsTrigger value="storage">Storage Locations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search backup jobs..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="running">Running</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Backup Jobs */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const StatusIcon = getStatusIcon(job.status);
              const TypeIcon = getTypeIcon(job.type);
              
              return (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <TypeIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{job.name}</h3>
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {job.type}
                            </Badge>
                            {job.destination.encrypted && (
                              <Badge variant="outline" className="text-green-600 border-green-200">
                                <Lock className="h-3 w-3 mr-1" />
                                Encrypted
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">{job.description}</p>
                          
                          {job.status === 'running' && job.progress && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Backup Progress</span>
                                <span>{job.progress}%</span>
                              </div>
                              <Progress value={job.progress} className="h-2" />
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Schedule</p>
                              <p className="font-medium capitalize">
                                {job.schedule.frequency === 'manual' ? 'Manual' : 
                                 `${job.schedule.frequency} at ${job.schedule.time || 'N/A'}`}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Destination</p>
                              <p className="font-medium">{job.destination.location}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Size</p>
                              <p className="font-medium">
                                {job.lastSize ? `${job.lastSize.toFixed(1)} GB` : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Success Rate</p>
                              <p className="font-medium">
                                {Math.round((job.execution.successfulRuns / job.execution.totalRuns) * 100)}%
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Tables: {job.includedTables.length}</span>
                            <span>Retention: {job.retention.period} {job.retention.unit}</span>
                            {job.lastRun && (
                              <span>Last run: {new Date(job.lastRun).toLocaleString()}</span>
                            )}
                            {job.schedule.nextRun && (
                              <span>Next run: {new Date(job.schedule.nextRun).toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {job.status !== 'running' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => runBackup(job.id)}
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Run Now
                          </Button>
                        )}
                        
                        {job.status === 'running' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => pauseBackup(job.id)}
                          >
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-3 w-3" />
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
                          onClick={() => deleteBackup(job.id)}
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

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>Recent backup executions and restore points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backupHistory.map((backup) => {
                  const StatusIcon = backup.status === 'completed' ? CheckCircle :
                                   backup.status === 'failed' ? AlertCircle : Clock;
                  const TypeIcon = getTypeIcon(backup.type);
                  
                  return (
                    <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <StatusIcon className={`h-5 w-5 ${
                          backup.status === 'completed' ? 'text-green-600' :
                          backup.status === 'failed' ? 'text-red-600' : 'text-gray-600'
                        }`} />
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <TypeIcon className="h-4 w-4 text-gray-600" />
                            <h4 className="font-medium">{backup.jobName}</h4>
                            <Badge variant="outline" className="text-xs capitalize">
                              {backup.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>{new Date(backup.timestamp).toLocaleString()}</span>
                            <span>{backup.size.toFixed(1)} GB</span>
                            <span>{Math.floor(backup.duration / 60)}m {backup.duration % 60}s</span>
                            <span>{backup.recordsBackedUp.toLocaleString()} records</span>
                          </div>
                          
                          {backup.error && (
                            <p className="text-sm text-red-600">{backup.error}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={
                          backup.status === 'completed' ? 'bg-green-100 text-green-800' :
                          backup.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {backup.status}
                        </Badge>
                        
                        {backup.restorable && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => restoreBackup(backup.id)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Restore
                          </Button>
                        )}
                        
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Locations</CardTitle>
              <CardDescription>Configure backup storage destinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {storageLocations.map((storage) => {
                  const StorageIcon = getStorageIcon(storage.type);
                  const usagePercentage = storage.capacity ? (storage.used! / storage.capacity) * 100 : 0;
                  
                  return (
                    <div key={storage.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <StorageIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{storage.name}</h4>
                            {storage.isDefault && (
                              <Badge variant="outline" className="text-xs">Default</Badge>
                            )}
                            {storage.encrypted && (
                              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                <Lock className="h-3 w-3 mr-1" />
                                Encrypted
                              </Badge>
                            )}
                            <Badge className={
                              storage.status === 'connected' ? 'bg-green-100 text-green-800' :
                              storage.status === 'error' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {storage.status}
                            </Badge>
                          </div>
                          
                          {storage.capacity && (
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-sm w-64">
                                <span>Storage Usage</span>
                                <span>{storage.used?.toFixed(1)} GB / {storage.capacity} GB</span>
                              </div>
                              <Progress value={usagePercentage} className="h-2" />
                            </div>
                          )}
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
                      <p className="text-gray-600">Add New Storage Location</p>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Configure Storage
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
                <CardTitle>Backup Defaults</CardTitle>
                <CardDescription>Configure default backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Backup Type</Label>
                  <Select defaultValue="incremental">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Backup</SelectItem>
                      <SelectItem value="incremental">Incremental</SelectItem>
                      <SelectItem value="differential">Differential</SelectItem>
                      <SelectItem value="selective">Selective</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Default Retention Period</Label>
                  <div className="flex gap-2">
                    <Input type="number" defaultValue="30" className="flex-1" />
                    <Select defaultValue="days">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="compress" defaultChecked />
                  <Label htmlFor="compress">Compress backups by default</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="encrypt" defaultChecked />
                  <Label htmlFor="encrypt">Encrypt backups by default</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure backup notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email on successful backup</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Email on backup failure</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Alert on storage low space</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input type="email" defaultValue="admin@company.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Storage Alert Threshold (%)</Label>
                  <Input type="number" defaultValue="80" min="1" max="100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataBackup;
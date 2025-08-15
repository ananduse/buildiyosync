import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Trash2,
  Archive,
  Brush,
  Recycle,
  Database,
  HardDrive,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Shield,
  Eye,
  Edit,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Download,
  Upload,
  Hash,
  Percent,
  Calendar,
  Clock,
  User,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  CreditCard,
  Link,
  Code,
  Server,
  Terminal,
  Bug,
  CheckSquare,
  Square,
  CircleSlash,
  AlertOctagon,
  Trash,
  RotateCcw,
  Loader,
  Timer,
  Award,
  Star,
  Flag,
  Info,
  AlertTriangle
} from 'lucide-react';

interface CleanupTask {
  id: string;
  name: string;
  description: string;
  type: 'archive' | 'delete' | 'merge' | 'standardize' | 'enrich' | 'deduplicate';
  category: 'maintenance' | 'optimization' | 'compliance' | 'quality';
  criteria: {
    field?: string;
    condition: string;
    value: any;
    dateRange?: {
      field: string;
      operator: 'older_than' | 'newer_than' | 'between';
      value: string | number;
      unit?: 'days' | 'months' | 'years';
    };
  };
  affectedRecords: number;
  estimatedTime: number; // in minutes
  lastRun?: string;
  nextRun?: string;
  isScheduled: boolean;
  isActive: boolean;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    time: string;
    dayOfWeek?: number;
    dayOfMonth?: number;
  };
  results?: {
    processed: number;
    archived: number;
    deleted: number;
    merged: number;
    errors: number;
  };
  createdBy: string;
  createdAt: string;
}

interface CleanupRule {
  id: string;
  name: string;
  description: string;
  field: string;
  action: 'standardize' | 'format' | 'replace' | 'remove' | 'enrich';
  pattern: string;
  replacement?: string;
  isActive: boolean;
  appliesTo: string[];
  affectedCount: number;
  lastApplied?: string;
}

interface CleanupStats {
  totalRecords: number;
  cleanRecords: number;
  recordsNeedingCleanup: number;
  archivedRecords: number;
  deletedRecords: number;
  storageFreed: number;
  cleanupTasksRun: number;
  dataQualityImprovement: number;
}

const DataCleanup: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  // Mock data for cleanup tasks
  const cleanupTasks: CleanupTask[] = [
    {
      id: 'task-001',
      name: 'Archive Old Leads',
      description: 'Archive leads older than 2 years with no activity',
      type: 'archive',
      category: 'maintenance',
      criteria: {
        condition: 'no_activity_and_age',
        value: '2 years',
        dateRange: {
          field: 'last_activity',
          operator: 'older_than',
          value: 730,
          unit: 'days'
        }
      },
      affectedRecords: 1247,
      estimatedTime: 45,
      lastRun: '2024-01-01T02:00:00Z',
      nextRun: '2024-04-01T02:00:00Z',
      isScheduled: true,
      isActive: true,
      schedule: {
        frequency: 'quarterly',
        time: '02:00',
        dayOfMonth: 1
      },
      results: {
        processed: 1189,
        archived: 1145,
        deleted: 0,
        merged: 0,
        errors: 44
      },
      createdBy: 'Data Admin',
      createdAt: '2023-06-15T10:00:00Z'
    },
    {
      id: 'task-002',
      name: 'Delete Incomplete Records',
      description: 'Remove records with less than 30% data completeness',
      type: 'delete',
      category: 'quality',
      criteria: {
        condition: 'data_completeness_below',
        value: 30
      },
      affectedRecords: 456,
      estimatedTime: 15,
      lastRun: '2024-01-10T03:00:00Z',
      isScheduled: false,
      isActive: true,
      results: {
        processed: 423,
        archived: 0,
        deleted: 398,
        merged: 0,
        errors: 25
      },
      createdBy: 'Quality Manager',
      createdAt: '2023-08-20T14:30:00Z'
    },
    {
      id: 'task-003',
      name: 'Standardize Phone Numbers',
      description: 'Format all phone numbers to E.164 international standard',
      type: 'standardize',
      category: 'quality',
      criteria: {
        field: 'phone',
        condition: 'format_to_e164',
        value: 'E.164'
      },
      affectedRecords: 2341,
      estimatedTime: 30,
      lastRun: '2024-01-14T01:00:00Z',
      nextRun: '2024-01-21T01:00:00Z',
      isScheduled: true,
      isActive: true,
      schedule: {
        frequency: 'weekly',
        time: '01:00',
        dayOfWeek: 0
      },
      results: {
        processed: 2298,
        archived: 0,
        deleted: 0,
        merged: 0,
        errors: 43
      },
      createdBy: 'Data Manager',
      createdAt: '2023-09-10T11:15:00Z'
    },
    {
      id: 'task-004',
      name: 'Merge Company Duplicates',
      description: 'Automatically merge companies with 90%+ similarity',
      type: 'merge',
      category: 'optimization',
      criteria: {
        condition: 'similarity_above',
        value: 90
      },
      affectedRecords: 89,
      estimatedTime: 60,
      isScheduled: false,
      isActive: false,
      createdBy: 'Operations Manager',
      createdAt: '2023-10-05T16:20:00Z'
    },
    {
      id: 'task-005',
      name: 'Enrich Missing Data',
      description: 'Populate missing company data from external sources',
      type: 'enrich',
      category: 'quality',
      criteria: {
        condition: 'missing_company_data',
        value: ['industry', 'size', 'website']
      },
      affectedRecords: 567,
      estimatedTime: 120,
      lastRun: '2024-01-12T06:00:00Z',
      nextRun: '2024-02-12T06:00:00Z',
      isScheduled: true,
      isActive: true,
      schedule: {
        frequency: 'monthly',
        time: '06:00',
        dayOfMonth: 12
      },
      results: {
        processed: 523,
        archived: 0,
        deleted: 0,
        merged: 0,
        errors: 44
      },
      createdBy: 'Marketing Manager',
      createdAt: '2023-11-15T09:45:00Z'
    }
  ];

  // Mock data for cleanup rules
  const cleanupRules: CleanupRule[] = [
    {
      id: 'rule-001',
      name: 'Standardize Email Domains',
      description: 'Convert common email domain variations to standard format',
      field: 'email',
      action: 'replace',
      pattern: '@(gmail|googlemail)\\.com$',
      replacement: '@gmail.com',
      isActive: true,
      appliesTo: ['leads', 'contacts'],
      affectedCount: 234,
      lastApplied: '2024-01-15T10:00:00Z'
    },
    {
      id: 'rule-002',
      name: 'Format Company Names',
      description: 'Remove common suffixes and standardize capitalization',
      field: 'company',
      action: 'standardize',
      pattern: '\\s+(Inc|LLC|Corp|Ltd)\\.?$',
      isActive: true,
      appliesTo: ['companies', 'leads'],
      affectedCount: 456,
      lastApplied: '2024-01-14T15:30:00Z'
    },
    {
      id: 'rule-003',
      name: 'Clean Phone Numbers',
      description: 'Remove special characters and format consistently',
      field: 'phone',
      action: 'format',
      pattern: '[^0-9+]',
      replacement: '',
      isActive: true,
      appliesTo: ['leads', 'contacts'],
      affectedCount: 789,
      lastApplied: '2024-01-15T08:45:00Z'
    },
    {
      id: 'rule-004',
      name: 'Remove Test Data',
      description: 'Remove records with test/dummy email addresses',
      field: 'email',
      action: 'remove',
      pattern: '@(test|example|dummy|temp)\\.com$',
      isActive: true,
      appliesTo: ['leads', 'contacts'],
      affectedCount: 12,
      lastApplied: '2024-01-13T12:00:00Z'
    }
  ];

  // Mock stats
  const stats: CleanupStats = {
    totalRecords: 45678,
    cleanRecords: 38945,
    recordsNeedingCleanup: 6733,
    archivedRecords: 12456,
    deletedRecords: 3456,
    storageFreed: 4.7,
    cleanupTasksRun: 127,
    dataQualityImprovement: 15.3
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'archive': return Archive;
      case 'delete': return Trash2;
      case 'merge': return Link;
      case 'standardize': return CheckCircle;
      case 'enrich': return Star;
      case 'deduplicate': return Copy;
      default: return Brush;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'archive': return 'text-blue-600 bg-blue-50';
      case 'delete': return 'text-red-600 bg-red-50';
      case 'merge': return 'text-purple-600 bg-purple-50';
      case 'standardize': return 'text-green-600 bg-green-50';
      case 'enrich': return 'text-yellow-600 bg-yellow-50';
      case 'deduplicate': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'optimization': return 'bg-green-100 text-green-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      case 'quality': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = cleanupTasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || task.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const toggleTaskSelection = (taskId: string) => {
    const newSelection = new Set(selectedTasks);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasks(newSelection);
  };

  const runCleanupTask = (taskId: string) => {
    setIsRunning(true);
    console.log(`Running cleanup task: ${taskId}`);
    setTimeout(() => setIsRunning(false), 3000);
  };

  const runSelectedTasks = () => {
    if (selectedTasks.size > 0) {
      setIsRunning(true);
      console.log(`Running ${selectedTasks.size} cleanup tasks`);
      setTimeout(() => {
        setIsRunning(false);
        setSelectedTasks(new Set());
      }, 5000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Cleanup</h1>
          <p className="text-muted-foreground">Automate data maintenance and quality improvement</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={runSelectedTasks}
            disabled={selectedTasks.size === 0 || isRunning}
          >
            {isRunning ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Selected ({selectedTasks.size})
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clean Records</p>
                <p className="text-2xl font-bold">{((stats.cleanRecords / stats.totalRecords) * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">{stats.cleanRecords.toLocaleString()} of {stats.totalRecords.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Cleanup</p>
                <p className="text-2xl font-bold text-orange-600">{stats.recordsNeedingCleanup.toLocaleString()}</p>
                <p className="text-xs text-green-600">-{stats.dataQualityImprovement}% this month</p>
              </div>
              <Brush className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Freed</p>
                <p className="text-2xl font-bold">{stats.storageFreed} GB</p>
                <p className="text-xs text-muted-foreground">{stats.archivedRecords.toLocaleString()} archived</p>
              </div>
              <HardDrive className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks Run</p>
                <p className="text-2xl font-bold">{stats.cleanupTasksRun}</p>
                <p className="text-xs text-muted-foreground">{stats.deletedRecords.toLocaleString()} deleted</p>
              </div>
              <Activity className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="tasks">Cleanup Tasks</TabsTrigger>
          <TabsTrigger value="rules">Cleanup Rules</TabsTrigger>
          <TabsTrigger value="history">Cleanup History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cleanup tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Task Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="merge">Merge</SelectItem>
                <SelectItem value="standardize">Standardize</SelectItem>
                <SelectItem value="enrich">Enrich</SelectItem>
                <SelectItem value="deduplicate">Deduplicate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const TypeIcon = getTypeIcon(task.type);
              
              return (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Checkbox
                          checked={selectedTasks.has(task.id)}
                          onCheckedChange={() => toggleTaskSelection(task.id)}
                        />
                        
                        <div className="p-2 rounded-lg bg-gray-50">
                          <TypeIcon 
                            className="h-6 w-6"
                            style={{ color: getTypeColor(task.type).split(' ')[0].replace('text-', '') }}
                          />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{task.name}</h3>
                            <Badge className={getTypeColor(task.type)}>
                              {task.type}
                            </Badge>
                            <Badge className={getCategoryColor(task.category)}>
                              {task.category}
                            </Badge>
                            {task.isScheduled && (
                              <Badge variant="outline" className="text-blue-600 border-blue-200">
                                <Calendar className="h-3 w-3 mr-1" />
                                Scheduled
                              </Badge>
                            )}
                            <Badge 
                              variant="outline"
                              className={task.isActive ? 'text-green-600 border-green-200' : 'text-gray-600 border-gray-200'}
                            >
                              {task.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{task.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Affected Records</p>
                              <p className="font-medium">{task.affectedRecords.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Estimated Time</p>
                              <p className="font-medium">{task.estimatedTime} minutes</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Run</p>
                              <p className="font-medium">
                                {task.lastRun ? new Date(task.lastRun).toLocaleDateString() : 'Never'}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Next Run</p>
                              <p className="font-medium">
                                {task.nextRun ? new Date(task.nextRun).toLocaleDateString() : 'Not scheduled'}
                              </p>
                            </div>
                          </div>
                          
                          {task.results && (
                            <div className="flex items-center gap-6 text-sm">
                              <span>Processed: {task.results.processed.toLocaleString()}</span>
                              {task.results.archived > 0 && <span>Archived: {task.results.archived.toLocaleString()}</span>}
                              {task.results.deleted > 0 && <span>Deleted: {task.results.deleted.toLocaleString()}</span>}
                              {task.results.merged > 0 && <span>Merged: {task.results.merged.toLocaleString()}</span>}
                              {task.results.errors > 0 && <span className="text-red-600">Errors: {task.results.errors}</span>}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                            <span>By: {task.createdBy}</span>
                            {task.schedule && (
                              <span>Schedule: {task.schedule.frequency} at {task.schedule.time}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => runCleanupTask(task.id)}
                          disabled={!task.isActive || isRunning}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run Now
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
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cleanup Rules</CardTitle>
              <CardDescription>Configure automatic data cleanup and standardization rules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cleanupRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch checked={rule.isActive} />
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{rule.name}</h4>
                          <Badge variant="outline" className="text-xs capitalize">
                            {rule.action}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {rule.field}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Applies to: {rule.appliesTo.join(', ')}</span>
                          <span>Affected: {rule.affectedCount} records</span>
                          {rule.lastApplied && (
                            <span>Last applied: {new Date(rule.lastApplied).toLocaleDateString()}</span>
                          )}
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">Pattern: </span>
                          <code className="bg-gray-100 px-2 py-1 rounded">{rule.pattern}</code>
                          {rule.replacement && (
                            <>
                              <span className="text-muted-foreground"> → </span>
                              <code className="bg-green-100 px-2 py-1 rounded">{rule.replacement}</code>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cleanup History</CardTitle>
              <CardDescription>Track of all cleanup operations and their results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cleanupTasks.filter(t => t.results).map((task) => {
                  const TypeIcon = getTypeIcon(task.type);
                  
                  return (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <TypeIcon className="h-5 w-5 text-gray-500" />
                        
                        <div>
                          <h4 className="font-medium">{task.name}</h4>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>Last run: {task.lastRun && new Date(task.lastRun).toLocaleString()}</span>
                            <span>Processed: {task.results?.processed}</span>
                            {task.results?.archived && task.results.archived > 0 && (
                              <span>Archived: {task.results.archived}</span>
                            )}
                            {task.results?.deleted && task.results.deleted > 0 && (
                              <span>Deleted: {task.results.deleted}</span>
                            )}
                            {task.results?.errors && task.results.errors > 0 && (
                              <span className="text-red-600">Errors: {task.results.errors}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(task.type)}>
                          {task.type}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cleanup Settings</CardTitle>
                <CardDescription>Configure cleanup behavior and safety measures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable automatic cleanup</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require confirmation for deletion</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Create backup before cleanup</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Maximum records per batch</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                
                <div className="space-y-2">
                  <Label>Cleanup execution window</Label>
                  <Select defaultValue="night">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anytime">Anytime</SelectItem>
                      <SelectItem value="night">Night hours only</SelectItem>
                      <SelectItem value="weekend">Weekends only</SelectItem>
                      <SelectItem value="maintenance">Maintenance windows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Archive retention period (days)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure cleanup notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email on completion</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Alert on errors</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Weekly cleanup summary</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification recipients</Label>
                  <Input placeholder="admin@company.com, data@company.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Error threshold (%)</Label>
                  <Input type="number" defaultValue="5" min="0" max="100" />
                </div>
                
                <div className="space-y-2">
                  <Label>Cleanup report format</Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary only</SelectItem>
                      <SelectItem value="detailed">Detailed report</SelectItem>
                      <SelectItem value="full">Full audit trail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataCleanup;
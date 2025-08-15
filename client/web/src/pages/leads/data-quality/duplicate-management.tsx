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
  AlertTriangle,
  Info,
  Users,
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Clock,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Shield,
  Eye,
  EyeOff,
  Merge,
  GitMerge,
  GitBranch,
  Copy,
  Trash2,
  Edit,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Link,
  Unlink,
  Database,
  FileText,
  Download,
  Upload,
  Hash,
  Percent,
  DollarSign,
  Star,
  Award,
  Flag,
  History,
  UserCheck,
  UserX,
  Building2,
  Briefcase
} from 'lucide-react';

interface DuplicateGroup {
  id: string;
  matchScore: number;
  matchType: 'exact' | 'high' | 'medium' | 'low';
  matchFields: string[];
  records: DuplicateRecord[];
  suggestedMaster?: string;
  autoMergeEligible: boolean;
  mergeConflicts: string[];
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  status: 'pending' | 'reviewed' | 'merged' | 'ignored';
}

interface DuplicateRecord {
  id: string;
  type: 'lead' | 'contact' | 'company';
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  source: string;
  status: string;
  score?: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  lastActivity?: string;
  dataCompleteness: number;
  activities: number;
  deals: number;
  isMaster?: boolean;
  mergeableFields: Record<string, any>;
  conflictingFields: Record<string, any>;
}

interface MergeRule {
  id: string;
  name: string;
  description: string;
  field: string;
  mergeStrategy: 'newest' | 'oldest' | 'highest_value' | 'most_complete' | 'master_only' | 'manual';
  isActive: boolean;
  priority: number;
}

interface DuplicateStats {
  totalDuplicates: number;
  pendingReview: number;
  autoMergeEligible: number;
  mergedThisMonth: number;
  savedStorage: number;
  dataQualityScore: number;
}

const DuplicateManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('duplicates');
  const [searchTerm, setSearchTerm] = useState('');
  const [matchTypeFilter, setMatchTypeFilter] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState<DuplicateGroup | null>(null);
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Mock data for duplicate groups
  const duplicateGroups: DuplicateGroup[] = [
    {
      id: 'dup-001',
      matchScore: 95,
      matchType: 'exact',
      matchFields: ['email', 'phone', 'company'],
      records: [
        {
          id: 'rec-001',
          type: 'lead',
          name: 'John Smith',
          email: 'john.smith@company.com',
          phone: '+1 234-567-8900',
          company: 'Tech Corp',
          title: 'Sales Manager',
          source: 'Website',
          status: 'Qualified',
          score: 85,
          owner: 'Sarah Wilson',
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T14:30:00Z',
          lastActivity: '2024-01-15T14:30:00Z',
          dataCompleteness: 90,
          activities: 12,
          deals: 2,
          isMaster: true,
          mergeableFields: {
            linkedin: 'linkedin.com/in/johnsmith',
            website: 'techcorp.com'
          },
          conflictingFields: {
            title: 'Sales Manager'
          }
        },
        {
          id: 'rec-002',
          type: 'lead',
          name: 'John W. Smith',
          email: 'john.smith@company.com',
          phone: '+1 (234) 567-8900',
          company: 'Tech Corp Inc.',
          title: 'Regional Sales Manager',
          source: 'LinkedIn',
          status: 'New',
          score: 65,
          owner: 'Mike Chen',
          createdAt: '2024-01-12T11:30:00Z',
          updatedAt: '2024-01-12T11:30:00Z',
          dataCompleteness: 75,
          activities: 3,
          deals: 0,
          mergeableFields: {
            department: 'Sales'
          },
          conflictingFields: {
            title: 'Regional Sales Manager'
          }
        }
      ],
      suggestedMaster: 'rec-001',
      autoMergeEligible: false,
      mergeConflicts: ['title'],
      createdAt: '2024-01-15T16:00:00Z',
      status: 'pending'
    },
    {
      id: 'dup-002',
      matchScore: 88,
      matchType: 'high',
      matchFields: ['email', 'company'],
      records: [
        {
          id: 'rec-003',
          type: 'contact',
          name: 'Sarah Johnson',
          email: 'sarah.j@techstartup.io',
          phone: '+1 555-0123',
          company: 'TechStartup',
          title: 'CEO',
          source: 'Conference',
          status: 'Active',
          owner: 'Lisa Johnson',
          createdAt: '2023-12-01T09:00:00Z',
          updatedAt: '2024-01-14T10:15:00Z',
          lastActivity: '2024-01-14T10:15:00Z',
          dataCompleteness: 95,
          activities: 45,
          deals: 5,
          isMaster: true,
          mergeableFields: {},
          conflictingFields: {}
        },
        {
          id: 'rec-004',
          type: 'contact',
          name: 'Sarah Johnson',
          email: 'sarah.j@techstartup.io',
          company: 'TechStartup Inc',
          title: 'Chief Executive Officer',
          source: 'Webinar',
          status: 'Active',
          owner: 'Lisa Johnson',
          createdAt: '2024-01-08T14:20:00Z',
          updatedAt: '2024-01-08T14:20:00Z',
          dataCompleteness: 60,
          activities: 2,
          deals: 0,
          mergeableFields: {
            phone: '+1 555-0123'
          },
          conflictingFields: {
            title: 'Chief Executive Officer'
          }
        }
      ],
      suggestedMaster: 'rec-003',
      autoMergeEligible: true,
      mergeConflicts: [],
      createdAt: '2024-01-15T15:30:00Z',
      status: 'pending'
    },
    {
      id: 'dup-003',
      matchScore: 72,
      matchType: 'medium',
      matchFields: ['company', 'name_similarity'],
      records: [
        {
          id: 'rec-005',
          type: 'company',
          name: 'Global Enterprises',
          company: 'Global Enterprises',
          source: 'Import',
          status: 'Customer',
          owner: 'Alex Turner',
          createdAt: '2023-06-15T10:00:00Z',
          updatedAt: '2024-01-10T11:45:00Z',
          dataCompleteness: 85,
          activities: 234,
          deals: 12,
          isMaster: true,
          mergeableFields: {},
          conflictingFields: {}
        },
        {
          id: 'rec-006',
          type: 'company',
          name: 'Global Enterprises LLC',
          company: 'Global Enterprises LLC',
          source: 'Manual',
          status: 'Prospect',
          owner: 'Emma Davis',
          createdAt: '2024-01-05T13:20:00Z',
          updatedAt: '2024-01-05T13:20:00Z',
          dataCompleteness: 40,
          activities: 5,
          deals: 0,
          mergeableFields: {},
          conflictingFields: {
            status: 'Prospect'
          }
        },
        {
          id: 'rec-007',
          type: 'company',
          name: 'Global Enterprise Solutions',
          company: 'Global Enterprise Solutions',
          source: 'Partner',
          status: 'Lead',
          owner: 'David Kim',
          createdAt: '2024-01-11T16:00:00Z',
          updatedAt: '2024-01-11T16:00:00Z',
          dataCompleteness: 55,
          activities: 8,
          deals: 1,
          mergeableFields: {},
          conflictingFields: {
            status: 'Lead'
          }
        }
      ],
      suggestedMaster: 'rec-005',
      autoMergeEligible: false,
      mergeConflicts: ['status', 'owner'],
      createdAt: '2024-01-15T14:00:00Z',
      status: 'reviewed',
      reviewedAt: '2024-01-15T14:30:00Z',
      reviewedBy: 'Admin User'
    }
  ];

  // Mock data for merge rules
  const mergeRules: MergeRule[] = [
    {
      id: 'rule-001',
      name: 'Email Priority',
      description: 'Use the most recent email address',
      field: 'email',
      mergeStrategy: 'newest',
      isActive: true,
      priority: 1
    },
    {
      id: 'rule-002',
      name: 'Lead Score',
      description: 'Keep the highest lead score',
      field: 'score',
      mergeStrategy: 'highest_value',
      isActive: true,
      priority: 2
    },
    {
      id: 'rule-003',
      name: 'Company Name',
      description: 'Use the most complete company name',
      field: 'company',
      mergeStrategy: 'most_complete',
      isActive: true,
      priority: 3
    },
    {
      id: 'rule-004',
      name: 'Owner Assignment',
      description: 'Keep the owner from master record',
      field: 'owner',
      mergeStrategy: 'master_only',
      isActive: true,
      priority: 4
    },
    {
      id: 'rule-005',
      name: 'Job Title',
      description: 'Manual review required for title conflicts',
      field: 'title',
      mergeStrategy: 'manual',
      isActive: true,
      priority: 5
    }
  ];

  // Mock stats
  const stats: DuplicateStats = {
    totalDuplicates: 234,
    pendingReview: 89,
    autoMergeEligible: 45,
    mergedThisMonth: 127,
    savedStorage: 2.3,
    dataQualityScore: 87
  };

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'exact': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lead': return Users;
      case 'contact': return UserCheck;
      case 'company': return Building;
      default: return Users;
    }
  };

  const filteredGroups = duplicateGroups.filter(group => {
    const matchesSearch = group.records.some(record => 
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = matchTypeFilter === 'all' || group.matchType === matchTypeFilter;
    return matchesSearch && matchesType;
  });

  const toggleGroupExpansion = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const selectMasterRecord = (groupId: string, recordId: string) => {
    setSelectedMaster(recordId);
  };

  const mergeRecords = (groupId: string) => {
    console.log(`Merging records in group: ${groupId}`);
  };

  const ignoreGroup = (groupId: string) => {
    console.log(`Ignoring duplicate group: ${groupId}`);
  };

  const autoMergeAll = () => {
    console.log('Auto-merging all eligible groups');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Duplicate Management</h1>
          <p className="text-muted-foreground">Identify and merge duplicate records to maintain data quality</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Scan for Duplicates
          </Button>
          <Button 
            size="sm" 
            onClick={autoMergeAll}
            disabled={stats.autoMergeEligible === 0}
          >
            <Zap className="h-4 w-4 mr-2" />
            Auto-Merge ({stats.autoMergeEligible})
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Duplicates</p>
                <p className="text-2xl font-bold">{stats.totalDuplicates}</p>
              </div>
              <Copy className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReview}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Auto-Merge Ready</p>
                <p className="text-2xl font-bold text-green-600">{stats.autoMergeEligible}</p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Merged This Month</p>
                <p className="text-2xl font-bold">{stats.mergedThisMonth}</p>
              </div>
              <GitMerge className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Saved</p>
                <p className="text-2xl font-bold">{stats.savedStorage} GB</p>
              </div>
              <Database className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <p className="text-2xl font-bold text-blue-600">{stats.dataQualityScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="duplicates">Duplicate Groups</TabsTrigger>
          <TabsTrigger value="rules">Merge Rules</TabsTrigger>
          <TabsTrigger value="history">Merge History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="duplicates" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search duplicates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={matchTypeFilter} onValueChange={setMatchTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Match Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="exact">Exact Match</SelectItem>
                <SelectItem value="high">High Confidence</SelectItem>
                <SelectItem value="medium">Medium Confidence</SelectItem>
                <SelectItem value="low">Low Confidence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duplicate Groups */}
          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Group Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleGroupExpansion(group.id)}
                        >
                          {expandedGroups.has(group.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <GitBranch className="h-5 w-5 text-gray-500" />
                            <span className="font-medium">{group.records.length} Records</span>
                          </div>
                          
                          <Badge className={getMatchTypeColor(group.matchType)}>
                            {group.matchScore}% Match
                          </Badge>
                          
                          <Badge variant="outline" className="capitalize">
                            {group.matchType} Confidence
                          </Badge>
                          
                          {group.autoMergeEligible && (
                            <Badge className="bg-green-100 text-green-800">
                              <Zap className="h-3 w-3 mr-1" />
                              Auto-Merge Ready
                            </Badge>
                          )}
                          
                          {group.status === 'reviewed' && (
                            <Badge variant="secondary">
                              <Eye className="h-3 w-3 mr-1" />
                              Reviewed
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => mergeRecords(group.id)}
                          disabled={!selectedMaster && !group.suggestedMaster}
                        >
                          <GitMerge className="h-3 w-3 mr-1" />
                          Merge
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => ignoreGroup(group.id)}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Ignore
                        </Button>
                      </div>
                    </div>
                    
                    {/* Matching Fields */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Matched on:</span>
                      <div className="flex items-center gap-2">
                        {group.matchFields.map(field => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                      {group.mergeConflicts.length > 0 && (
                        <>
                          <span>Conflicts:</span>
                          <div className="flex items-center gap-2">
                            {group.mergeConflicts.map(conflict => (
                              <Badge key={conflict} variant="outline" className="text-xs text-orange-600 border-orange-200">
                                {conflict}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Expanded Records */}
                    {expandedGroups.has(group.id) && (
                      <div className="space-y-3 ml-8">
                        {group.records.map((record) => {
                          const TypeIcon = getTypeIcon(record.type);
                          
                          return (
                            <div 
                              key={record.id} 
                              className={`border rounded-lg p-4 ${
                                (selectedMaster === record.id || (!selectedMaster && record.isMaster)) 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : ''
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    checked={selectedMaster === record.id || (!selectedMaster && record.isMaster)}
                                    onCheckedChange={() => selectMasterRecord(group.id, record.id)}
                                  />
                                  
                                  <TypeIcon className="h-5 w-5 text-gray-500 mt-0.5" />
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{record.name}</span>
                                      {record.isMaster && (
                                        <Badge variant="outline" className="text-xs">
                                          <Star className="h-3 w-3 mr-1 fill-current" />
                                          Suggested Master
                                        </Badge>
                                      )}
                                      <Badge variant="outline" className="text-xs capitalize">
                                        {record.type}
                                      </Badge>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                      {record.email && (
                                        <div className="flex items-center gap-1">
                                          <Mail className="h-3 w-3 text-gray-400" />
                                          <span>{record.email}</span>
                                        </div>
                                      )}
                                      {record.phone && (
                                        <div className="flex items-center gap-1">
                                          <Phone className="h-3 w-3 text-gray-400" />
                                          <span>{record.phone}</span>
                                        </div>
                                      )}
                                      {record.company && (
                                        <div className="flex items-center gap-1">
                                          <Building className="h-3 w-3 text-gray-400" />
                                          <span>{record.company}</span>
                                        </div>
                                      )}
                                      {record.title && (
                                        <div className="flex items-center gap-1">
                                          <Briefcase className="h-3 w-3 text-gray-400" />
                                          <span>{record.title}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                                      <span>Owner: {record.owner}</span>
                                      <span>Source: {record.source}</span>
                                      <span>Status: {record.status}</span>
                                      {record.score && <span>Score: {record.score}</span>}
                                      <span>Activities: {record.activities}</span>
                                      <span>Deals: {record.deals}</span>
                                      <span>Data: {record.dataCompleteness}%</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span>Created: {new Date(record.createdAt).toLocaleDateString()}</span>
                                      <span>Updated: {new Date(record.updatedAt).toLocaleDateString()}</span>
                                      {record.lastActivity && (
                                        <span>Last Activity: {new Date(record.lastActivity).toLocaleDateString()}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Merge Rules</CardTitle>
              <CardDescription>Configure how duplicate records are merged</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mergeRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{rule.priority}
                        </Badge>
                        <Switch checked={rule.isActive} />
                      </div>
                      
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Field: {rule.field}</span>
                          <span>Strategy: {rule.mergeStrategy.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Merge History</CardTitle>
              <CardDescription>Track of all merged duplicate records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No merge history available</p>
                <p className="text-sm text-gray-500 mt-2">
                  Merged records will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Settings</CardTitle>
                <CardDescription>Configure duplicate detection parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Match Threshold (%)</Label>
                  <Input type="number" defaultValue="70" min="50" max="100" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="autoScan" defaultChecked />
                  <Label htmlFor="autoScan">Enable automatic scanning</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="preventCreate" defaultChecked />
                  <Label htmlFor="preventCreate">Prevent duplicate creation</Label>
                </div>
                
                <div className="space-y-2">
                  <Label>Scan Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Merge Settings</CardTitle>
                <CardDescription>Configure merge behavior and automation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable auto-merge</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Auto-merge confidence (%)</Label>
                  <Input type="number" defaultValue="95" min="80" max="100" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Preserve audit trail</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Notify on merge</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Merge notification recipients</Label>
                  <Input placeholder="admin@company.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DuplicateManagement;
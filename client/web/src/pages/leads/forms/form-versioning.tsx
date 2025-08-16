import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  GitBranch,
  Clock,
  User,
  Eye,
  Copy,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Edit,
  Save,
  RefreshCw,
  Download,
  Upload,
  Shield,
  History,
  Diff,
  Merge,
  GitCommit,
  GitPullRequest,
  Archive,
  Trash2,
  Lock,
  Unlock,
  Calendar,
  Tag,
  Filter,
  Search,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormVersion {
  id: string;
  version: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived' | 'deprecated';
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  changes: {
    added: number;
    modified: number;
    removed: number;
  };
  fields: number;
  submissions: number;
  conversionRate: number;
  parent?: string;
  branches: string[];
  tags: string[];
  audit: {
    action: string;
    timestamp: Date;
    user: string;
    details: string;
  }[];
}

const FormVersioning: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('v2.1.0');
  const [compareMode, setCompareMode] = useState(false);
  const [compareVersions, setCompareVersions] = useState<[string?, string?]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock version history
  const versions: FormVersion[] = [
    {
      id: 'v2.1.0',
      version: 'v2.1.0',
      name: 'Multi-step Enhancement',
      description: 'Added multi-step form functionality with progress tracking',
      status: 'published',
      createdBy: {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com'
      },
      createdAt: new Date('2024-01-15T10:00:00'),
      updatedAt: new Date('2024-01-15T14:30:00'),
      publishedAt: new Date('2024-01-15T15:00:00'),
      changes: { added: 5, modified: 12, removed: 2 },
      fields: 24,
      submissions: 1834,
      conversionRate: 18.7,
      parent: 'v2.0.0',
      branches: ['feature/multi-step', 'hotfix/validation'],
      tags: ['stable', 'production'],
      audit: [
        {
          action: 'Published',
          timestamp: new Date('2024-01-15T15:00:00'),
          user: 'Sarah Chen',
          details: 'Published to production'
        },
        {
          action: 'Reviewed',
          timestamp: new Date('2024-01-15T14:00:00'),
          user: 'Mike Johnson',
          details: 'Approved for production'
        },
        {
          action: 'Created',
          timestamp: new Date('2024-01-15T10:00:00'),
          user: 'Sarah Chen',
          details: 'Initial version created from v2.0.0'
        }
      ]
    },
    {
      id: 'v2.0.0',
      version: 'v2.0.0',
      name: 'Major Redesign',
      description: 'Complete form redesign with new UI components and validation rules',
      status: 'archived',
      createdBy: {
        id: '2',
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com'
      },
      createdAt: new Date('2024-01-01T09:00:00'),
      updatedAt: new Date('2024-01-10T16:00:00'),
      publishedAt: new Date('2024-01-02T10:00:00'),
      changes: { added: 18, modified: 35, removed: 12 },
      fields: 21,
      submissions: 5421,
      conversionRate: 15.3,
      parent: 'v1.5.0',
      branches: ['feature/new-ui', 'feature/validation'],
      tags: ['major-release'],
      audit: [
        {
          action: 'Archived',
          timestamp: new Date('2024-01-16T09:00:00'),
          user: 'Admin',
          details: 'Archived after v2.1.0 release'
        },
        {
          action: 'Published',
          timestamp: new Date('2024-01-02T10:00:00'),
          user: 'Mike Johnson',
          details: 'Published major redesign'
        }
      ]
    },
    {
      id: 'v2.2.0-draft',
      version: 'v2.2.0-draft',
      name: 'A/B Testing Features',
      description: 'Implementing A/B testing capabilities for form optimization',
      status: 'draft',
      createdBy: {
        id: '3',
        name: 'Emily Davis',
        email: 'emily.davis@company.com'
      },
      createdAt: new Date('2024-01-18T11:00:00'),
      updatedAt: new Date('2024-01-19T15:30:00'),
      changes: { added: 8, modified: 6, removed: 0 },
      fields: 26,
      submissions: 0,
      conversionRate: 0,
      parent: 'v2.1.0',
      branches: ['feature/ab-testing'],
      tags: ['experimental', 'testing'],
      audit: [
        {
          action: 'Modified',
          timestamp: new Date('2024-01-19T15:30:00'),
          user: 'Emily Davis',
          details: 'Added variant configuration'
        },
        {
          action: 'Created',
          timestamp: new Date('2024-01-18T11:00:00'),
          user: 'Emily Davis',
          details: 'Started A/B testing implementation'
        }
      ]
    },
    {
      id: 'v1.5.0',
      version: 'v1.5.0',
      name: 'Legacy Stable',
      description: 'Last stable version before major redesign',
      status: 'deprecated',
      createdBy: {
        id: '4',
        name: 'John Smith',
        email: 'john.smith@company.com'
      },
      createdAt: new Date('2023-11-15T08:00:00'),
      updatedAt: new Date('2023-12-20T17:00:00'),
      publishedAt: new Date('2023-11-16T09:00:00'),
      changes: { added: 3, modified: 8, removed: 1 },
      fields: 15,
      submissions: 12853,
      conversionRate: 12.1,
      branches: [],
      tags: ['legacy', 'stable'],
      audit: [
        {
          action: 'Deprecated',
          timestamp: new Date('2024-01-02T10:00:00'),
          user: 'Admin',
          details: 'Deprecated after v2.0.0 release'
        }
      ]
    }
  ];

  const getStatusColor = (status: FormVersion['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: FormVersion['status']) => {
    switch (status) {
      case 'published': return CheckCircle;
      case 'draft': return Edit;
      case 'archived': return Archive;
      case 'deprecated': return AlertTriangle;
      default: return FileText;
    }
  };

  const filteredVersions = versions.filter(version => {
    const matchesStatus = filterStatus === 'all' || version.status === filterStatus;
    const matchesSearch = version.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          version.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          version.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const currentVersion = versions.find(v => v.id === selectedVersion);

  const renderVersionTimeline = () => {
    return (
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        {filteredVersions.map((version, index) => {
          const StatusIcon = getStatusIcon(version.status);
          return (
            <div key={version.id} className="relative flex items-start mb-6">
              <div className="absolute left-8 w-0.5 bg-gray-200"></div>
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${
                version.status === 'published' ? 'bg-green-100' :
                version.status === 'draft' ? 'bg-yellow-100' :
                version.status === 'archived' ? 'bg-gray-100' :
                'bg-red-100'
              }`}>
                <StatusIcon className={`h-6 w-6 ${
                  version.status === 'published' ? 'text-green-600' :
                  version.status === 'draft' ? 'text-yellow-600' :
                  version.status === 'archived' ? 'text-gray-600' :
                  'text-red-600'
                }`} />
              </div>
              <div 
                className={`ml-4 flex-1 p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedVersion === version.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedVersion(version.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{version.version}</h3>
                      <Badge className={getStatusColor(version.status)}>
                        {version.status}
                      </Badge>
                      {version.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{version.name}</p>
                    <p className="text-sm text-muted-foreground mb-3">{version.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {version.createdBy.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {version.createdAt.toLocaleDateString()}
                      </div>
                      {version.publishedAt && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Published {version.publishedAt.toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-6 mt-3">
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-green-600">+{version.changes.added} added</span>
                        <span className="text-blue-600">~{version.changes.modified} modified</span>
                        <span className="text-red-600">-{version.changes.removed} removed</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{version.fields} fields</span>
                        <span>{version.submissions.toLocaleString()} submissions</span>
                        <span>{version.conversionRate}% conversion</span>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <GitBranch className="h-4 w-4 mr-2" />
                        Create Branch
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Version
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Diff className="h-4 w-4 mr-2" />
                        Compare Changes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {version.status === 'draft' && (
                        <DropdownMenuItem className="text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Publish Version
                        </DropdownMenuItem>
                      )}
                      {version.status === 'published' && (
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive Version
                        </DropdownMenuItem>
                      )}
                      {version.status !== 'published' && (
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Version
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderComparisonView = () => {
    if (!compareVersions[0] || !compareVersions[1]) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <Diff className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-4">Select two versions to compare changes</p>
              <div className="flex items-center justify-center gap-4">
                <Select
                  value={compareVersions[0]}
                  onValueChange={(value) => setCompareVersions([value, compareVersions[1]])}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select first version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map(version => (
                      <SelectItem key={version.id} value={version.id}>
                        {version.version} - {version.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">vs</span>
                <Select
                  value={compareVersions[1]}
                  onValueChange={(value) => setCompareVersions([compareVersions[0], value])}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select second version" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map(version => (
                      <SelectItem 
                        key={version.id} 
                        value={version.id}
                        disabled={version.id === compareVersions[0]}
                      >
                        {version.version} - {version.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const v1 = versions.find(v => v.id === compareVersions[0]);
    const v2 = versions.find(v => v.id === compareVersions[1]);

    if (!v1 || !v2) return null;

    return (
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{v1.version}</CardTitle>
            <CardDescription>{v1.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-xs">Status</Label>
                <Badge className={`${getStatusColor(v1.status)} mt-1`}>
                  {v1.status}
                </Badge>
              </div>
              <div>
                <Label className="text-xs">Fields</Label>
                <p className="text-sm font-medium">{v1.fields}</p>
              </div>
              <div>
                <Label className="text-xs">Submissions</Label>
                <p className="text-sm font-medium">{v1.submissions.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-xs">Conversion Rate</Label>
                <p className="text-sm font-medium">{v1.conversionRate}%</p>
              </div>
              <div>
                <Label className="text-xs">Created</Label>
                <p className="text-sm">{v1.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{v2.version}</CardTitle>
            <CardDescription>{v2.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-xs">Status</Label>
                <Badge className={`${getStatusColor(v2.status)} mt-1`}>
                  {v2.status}
                </Badge>
              </div>
              <div>
                <Label className="text-xs">Fields</Label>
                <p className="text-sm font-medium">
                  {v2.fields}
                  {v2.fields > v1.fields && (
                    <span className="text-green-600 ml-2">+{v2.fields - v1.fields}</span>
                  )}
                  {v2.fields < v1.fields && (
                    <span className="text-red-600 ml-2">{v2.fields - v1.fields}</span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-xs">Submissions</Label>
                <p className="text-sm font-medium">
                  {v2.submissions.toLocaleString()}
                  {v2.submissions > v1.submissions && (
                    <span className="text-green-600 ml-2">
                      +{(v2.submissions - v1.submissions).toLocaleString()}
                    </span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-xs">Conversion Rate</Label>
                <p className="text-sm font-medium">
                  {v2.conversionRate}%
                  {v2.conversionRate > v1.conversionRate && (
                    <span className="text-green-600 ml-2">
                      +{(v2.conversionRate - v1.conversionRate).toFixed(1)}%
                    </span>
                  )}
                  {v2.conversionRate < v1.conversionRate && (
                    <span className="text-red-600 ml-2">
                      {(v2.conversionRate - v1.conversionRate).toFixed(1)}%
                    </span>
                  )}
                </p>
              </div>
              <div>
                <Label className="text-xs">Created</Label>
                <p className="text-sm">{v2.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Change Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="text-sm font-medium text-green-900 mb-2">Added in {v2.version}</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• New conditional logic for project type field</li>
                  <li>• Budget range field with predefined options</li>
                  <li>• Multi-step form navigation</li>
                  <li>• Progress indicator component</li>
                  <li>• Auto-save functionality</li>
                </ul>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Modified</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Updated validation rules for email field</li>
                  <li>• Improved phone number formatting</li>
                  <li>• Enhanced form submission workflow</li>
                  <li>• Optimized field rendering performance</li>
                </ul>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="text-sm font-medium text-red-900 mb-2">Removed from {v1.version}</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Legacy jQuery validation</li>
                  <li>• Deprecated API endpoints</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Form Version Control</h1>
            <p className="text-muted-foreground mt-2">
              Manage form versions, track changes, and maintain audit trails
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setCompareMode(!compareMode)}>
              <Diff className="h-4 w-4 mr-2" />
              {compareMode ? 'Timeline View' : 'Compare Versions'}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <GitBranch className="h-4 w-4 mr-2" />
                  Create New Version
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Form Version</DialogTitle>
                  <DialogDescription>
                    Create a new version based on an existing form version
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Base Version</Label>
                    <Select defaultValue="v2.1.0">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {versions.filter(v => v.status === 'published').map(version => (
                          <SelectItem key={version.id} value={version.id}>
                            {version.version} - {version.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Version Number</Label>
                    <Input placeholder="v2.2.0" className="mt-1" />
                  </div>
                  <div>
                    <Label>Version Name</Label>
                    <Input placeholder="Feature Enhancement" className="mt-1" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe the changes in this version..." 
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    <GitBranch className="h-4 w-4 mr-2" />
                    Create Version
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search versions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Versions</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          {/* Version Timeline / Comparison */}
          <div className={compareMode ? "col-span-12" : "col-span-8"}>
            {compareMode ? renderComparisonView() : (
              <Card>
                <CardHeader>
                  <CardTitle>Version Timeline</CardTitle>
                  <CardDescription>
                    Track the evolution of your form across different versions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    {renderVersionTimeline()}
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Version Details */}
          {!compareMode && currentVersion && (
            <div className="col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Version Details</CardTitle>
                  <CardDescription>{currentVersion.version}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Version Info */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge className={getStatusColor(currentVersion.status)}>
                          {currentVersion.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Created By</span>
                        <span className="text-sm">{currentVersion.createdBy.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Created</span>
                        <span className="text-sm">
                          {currentVersion.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      {currentVersion.publishedAt && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Published</span>
                          <span className="text-sm">
                            {currentVersion.publishedAt.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Statistics */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fields</span>
                        <span className="text-sm font-medium">{currentVersion.fields}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Submissions</span>
                        <span className="text-sm font-medium">
                          {currentVersion.submissions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Conversion Rate</span>
                        <span className="text-sm font-medium">{currentVersion.conversionRate}%</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Changes */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Changes</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">
                          +{currentVersion.changes.added}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">
                          ~{currentVersion.changes.modified}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-muted-foreground">
                          -{currentVersion.changes.removed}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Audit Trail */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Audit Trail</h3>
                    <ScrollArea className="h-48">
                      <div className="space-y-3">
                        {currentVersion.audit.map((entry, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5"></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{entry.action}</span>
                                <span className="text-xs text-muted-foreground">
                                  {entry.timestamp.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {entry.user} - {entry.details}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Version
                    </Button>
                    {currentVersion.status === 'draft' && (
                      <Button className="w-full" variant="default">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Publish Version
                      </Button>
                    )}
                    {currentVersion.status === 'published' && (
                      <Button className="w-full" variant="outline">
                        <GitBranch className="h-4 w-4 mr-2" />
                        Create Branch
                      </Button>
                    )}
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Version
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormVersioning;
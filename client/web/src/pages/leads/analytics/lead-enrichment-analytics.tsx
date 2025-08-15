import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Database,
  Users,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Minus,
  Globe,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Star,
  Gauge,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Hash,
  Tag,
  FileText,
  Settings,
  Info,
  HelpCircle,
  Sparkles,
  Link2,
  ShieldCheck,
  AlertCircle,
  Plus,
  Edit
} from 'lucide-react';

interface EnrichmentMetric {
  id: string;
  name: string;
  category: 'quality' | 'coverage' | 'accuracy' | 'performance' | 'cost';
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'stable';
  target?: number;
  description: string;
  lastUpdated: string;
}

interface EnrichmentSource {
  id: string;
  name: string;
  provider: string;
  type: 'api' | 'database' | 'manual' | 'third_party';
  status: 'active' | 'inactive' | 'error' | 'rate_limited';
  fieldsEnriched: string[];
  successRate: number;
  avgResponseTime: number;
  costPerEnrichment: number;
  totalEnrichments: number;
  lastEnrichment: string;
  errorRate: number;
  rateLimitRemaining?: number;
}

interface EnrichmentJob {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'queued' | 'paused';
  leadsProcessed: number;
  totalLeads: number;
  fieldsEnriched: string[];
  sources: string[];
  startedAt: string;
  completedAt?: string;
  duration?: number;
  successCount: number;
  errorCount: number;
  costEstimate: number;
  createdBy: string;
}

interface QualityReport {
  id: string;
  field: string;
  completeness: number;
  accuracy: number;
  freshness: number;
  consistency: number;
  overallScore: number;
  issues: Array<{
    type: 'missing' | 'invalid' | 'outdated' | 'inconsistent';
    count: number;
    examples: string[];
  }>;
  trends: {
    completeness: number;
    accuracy: number;
  };
}

const LeadEnrichmentAnalytics: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Mock enrichment metrics
  const enrichmentMetrics: EnrichmentMetric[] = [
    {
      id: 'enrichment-rate',
      name: 'Enrichment Success Rate',
      category: 'performance',
      value: 87.3,
      unit: '%',
      change: 5.2,
      changeType: 'increase',
      target: 90,
      description: 'Percentage of leads successfully enriched with additional data',
      lastUpdated: '2024-01-18T10:30:00Z'
    },
    {
      id: 'data-completeness',
      name: 'Data Completeness',
      category: 'quality',
      value: 78.6,
      unit: '%',
      change: 3.1,
      changeType: 'increase',
      target: 85,
      description: 'Percentage of lead fields that contain valid data',
      lastUpdated: '2024-01-18T10:30:00Z'
    },
    {
      id: 'accuracy-score',
      name: 'Data Accuracy Score',
      category: 'accuracy',
      value: 92.1,
      unit: '%',
      change: -1.8,
      changeType: 'decrease',
      target: 95,
      description: 'Accuracy of enriched data based on verification checks',
      lastUpdated: '2024-01-18T10:30:00Z'
    },
    {
      id: 'avg-response-time',
      name: 'Avg Response Time',
      category: 'performance',
      value: 2.4,
      unit: 's',
      change: -0.3,
      changeType: 'decrease',
      target: 2.0,
      description: 'Average time to enrich a single lead record',
      lastUpdated: '2024-01-18T10:30:00Z'
    },
    {
      id: 'cost-per-lead',
      name: 'Cost Per Lead',
      category: 'cost',
      value: 0.15,
      unit: '$',
      change: 0.02,
      changeType: 'increase',
      description: 'Average cost to enrich one lead with additional data',
      lastUpdated: '2024-01-18T10:30:00Z'
    },
    {
      id: 'coverage-rate',
      name: 'Field Coverage Rate',
      category: 'coverage',
      value: 65.4,
      unit: '%',
      change: 8.7,
      changeType: 'increase',
      target: 75,
      description: 'Percentage of available data fields that are populated',
      lastUpdated: '2024-01-18T10:30:00Z'
    }
  ];

  // Mock enrichment sources
  const enrichmentSources: EnrichmentSource[] = [
    {
      id: 'clearbit-api',
      name: 'Company Data API',
      provider: 'Clearbit',
      type: 'api',
      status: 'active',
      fieldsEnriched: ['company_name', 'industry', 'company_size', 'website', 'linkedin'],
      successRate: 89.5,
      avgResponseTime: 1.2,
      costPerEnrichment: 0.05,
      totalEnrichments: 15420,
      lastEnrichment: '2024-01-18T10:25:00Z',
      errorRate: 2.3,
      rateLimitRemaining: 4500
    },
    {
      id: 'hunter-email',
      name: 'Email Finder',
      provider: 'Hunter.io',
      type: 'api',
      status: 'active',
      fieldsEnriched: ['email', 'email_verified', 'confidence_score'],
      successRate: 76.2,
      avgResponseTime: 0.8,
      costPerEnrichment: 0.02,
      totalEnrichments: 8930,
      lastEnrichment: '2024-01-18T10:20:00Z',
      errorRate: 5.1,
      rateLimitRemaining: 2300
    },
    {
      id: 'linkedin-scraper',
      name: 'LinkedIn Enrichment',
      provider: 'ProspectAPI',
      type: 'api',
      status: 'rate_limited',
      fieldsEnriched: ['linkedin_profile', 'job_title', 'experience', 'connections'],
      successRate: 82.7,
      avgResponseTime: 3.1,
      costPerEnrichment: 0.08,
      totalEnrichments: 3456,
      lastEnrichment: '2024-01-18T09:45:00Z',
      errorRate: 8.2,
      rateLimitRemaining: 0
    },
    {
      id: 'phone-validator',
      name: 'Phone Validation',
      provider: 'Twilio Lookup',
      type: 'api',
      status: 'active',
      fieldsEnriched: ['phone_verified', 'phone_type', 'carrier', 'country_code'],
      successRate: 94.3,
      avgResponseTime: 0.5,
      costPerEnrichment: 0.01,
      totalEnrichments: 12780,
      lastEnrichment: '2024-01-18T10:28:00Z',
      errorRate: 1.2,
      rateLimitRemaining: 8900
    },
    {
      id: 'internal-db',
      name: 'Internal Database',
      provider: 'Internal',
      type: 'database',
      status: 'active',
      fieldsEnriched: ['lead_score', 'lead_stage', 'previous_interactions', 'tags'],
      successRate: 100.0,
      avgResponseTime: 0.1,
      costPerEnrichment: 0.00,
      totalEnrichments: 25630,
      lastEnrichment: '2024-01-18T10:30:00Z',
      errorRate: 0.0
    }
  ];

  // Mock enrichment jobs
  const enrichmentJobs: EnrichmentJob[] = [
    {
      id: 'job-001',
      name: 'Weekly Lead Enrichment',
      status: 'running',
      leadsProcessed: 847,
      totalLeads: 1250,
      fieldsEnriched: ['company_name', 'industry', 'email', 'phone'],
      sources: ['clearbit-api', 'hunter-email', 'phone-validator'],
      startedAt: '2024-01-18T08:00:00Z',
      successCount: 782,
      errorCount: 65,
      costEstimate: 62.50,
      createdBy: 'admin@company.com'
    },
    {
      id: 'job-002',
      name: 'New Leads Enrichment',
      status: 'completed',
      leadsProcessed: 340,
      totalLeads: 340,
      fieldsEnriched: ['company_size', 'linkedin_profile', 'job_title'],
      sources: ['clearbit-api', 'linkedin-scraper'],
      startedAt: '2024-01-17T14:00:00Z',
      completedAt: '2024-01-17T14:45:00Z',
      duration: 45,
      successCount: 298,
      errorCount: 42,
      costEstimate: 44.20,
      createdBy: 'marketing@company.com'
    },
    {
      id: 'job-003',
      name: 'Phone Number Validation',
      status: 'failed',
      leadsProcessed: 120,
      totalLeads: 500,
      fieldsEnriched: ['phone_verified'],
      sources: ['phone-validator'],
      startedAt: '2024-01-17T10:00:00Z',
      successCount: 118,
      errorCount: 2,
      costEstimate: 5.00,
      createdBy: 'sales@company.com'
    }
  ];

  // Mock quality reports
  const qualityReports: QualityReport[] = [
    {
      id: 'email-quality',
      field: 'Email',
      completeness: 85.2,
      accuracy: 92.7,
      freshness: 78.9,
      consistency: 96.1,
      overallScore: 88.2,
      issues: [
        { type: 'missing', count: 148, examples: ['lead-123', 'lead-456', 'lead-789'] },
        { type: 'invalid', count: 23, examples: ['invalid@', 'test@test', 'no-domain'] },
        { type: 'outdated', count: 67, examples: ['old@company.com', 'ex@former.co'] }
      ],
      trends: { completeness: 3.2, accuracy: -1.1 }
    },
    {
      id: 'company-quality',
      field: 'Company Name',
      completeness: 76.8,
      accuracy: 89.4,
      freshness: 85.3,
      consistency: 82.7,
      overallScore: 83.5,
      issues: [
        { type: 'missing', count: 232, examples: ['lead-234', 'lead-567'] },
        { type: 'inconsistent', count: 45, examples: ['Apple Inc', 'Apple', 'Apple Computer'] }
      ],
      trends: { completeness: 5.7, accuracy: 2.3 }
    },
    {
      id: 'phone-quality',
      field: 'Phone Number',
      completeness: 67.3,
      accuracy: 94.1,
      freshness: 88.6,
      consistency: 91.8,
      overallScore: 85.5,
      issues: [
        { type: 'missing', count: 327, examples: ['lead-345', 'lead-678'] },
        { type: 'invalid', count: 19, examples: ['123-456', '000-000-0000'] }
      ],
      trends: { completeness: 8.9, accuracy: 1.7 }
    }
  ];

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'quality': return CheckCircle;
      case 'coverage': return Target;
      case 'accuracy': return ShieldCheck;
      case 'performance': return Zap;
      case 'cost': return Database;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'rate_limited': return 'bg-orange-100 text-orange-800';
      case 'queued': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return TrendingUp;
      case 'decrease': return TrendingDown;
      case 'stable': return Minus;
      default: return Minus;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const calculateProgress = (processed: number, total: number): number => {
    return Math.round((processed / total) * 100);
  };

  const handleRefreshData = () => {
    console.log('Refreshing enrichment data');
  };

  const handleExportData = () => {
    console.log('Exporting enrichment analytics');
  };

  const handleSourceSettings = (sourceId: string) => {
    console.log('Configuring source:', sourceId);
  };

  const handleJobAction = (jobId: string, action: string) => {
    console.log('Job action:', jobId, action);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Enrichment Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Monitor data enrichment performance, quality metrics, and ROI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button variant="outline" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {enrichmentMetrics.map((metric) => {
          const MetricIcon = getMetricIcon(metric.category);
          const ChangeIcon = getChangeIcon(metric.changeType);
          
          return (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <MetricIcon className="h-8 w-8 text-blue-600" />
                  {metric.target && (
                    <Badge variant={metric.value >= metric.target ? 'default' : 'destructive'} className="text-xs">
                      {metric.value >= metric.target ? 'On Target' : 'Below Target'}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold">
                    {metric.value}{metric.unit}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <ChangeIcon className={`h-3 w-3 ${getChangeColor(metric.changeType)}`} />
                    <span className={`text-xs ${getChangeColor(metric.changeType)}`}>
                      {Math.abs(metric.change)}{metric.unit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="jobs">Enrichment Jobs</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enrichment Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Enrichment Performance Trends</CardTitle>
                <CardDescription>
                  Success rate and volume over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Performance charts would be rendered here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Coverage Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Field Coverage Analysis</CardTitle>
                <CardDescription>
                  Data completeness by field type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {qualityReports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{report.field}</span>
                          <span className={`text-sm font-bold ${getQualityColor(report.completeness)}`}>
                            {report.completeness}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              report.completeness >= 90 ? 'bg-green-500' :
                              report.completeness >= 75 ? 'bg-yellow-500' :
                              report.completeness >= 60 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${report.completeness}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Enrichment Activity</CardTitle>
              <CardDescription>
                Latest enrichment jobs and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {enrichmentJobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{job.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{job.leadsProcessed}/{job.totalLeads} leads</span>
                          <span>${job.costEstimate}</span>
                          <span>{formatDate(job.startedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      {job.status === 'running' && (
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${calculateProgress(job.leadsProcessed, job.totalLeads)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
              <CardDescription>
                Manage and monitor enrichment data sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrichmentSources.map((source) => (
                  <Card key={source.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Database className="h-6 w-6 text-blue-600" />
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{source.name}</h3>
                                <Badge className={getStatusColor(source.status)}>
                                  {source.status}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                  {source.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Provider: {source.provider}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Success Rate</p>
                                <p className={`text-lg font-bold ${getQualityColor(source.successRate)}`}>
                                  {source.successRate}%
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Avg Response</p>
                                <p className="text-lg font-bold">
                                  {source.avgResponseTime}s
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Cost/Enrichment</p>
                                <p className="text-lg font-bold">
                                  ${source.costPerEnrichment}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Total Enrichments</p>
                                <p className="text-lg font-bold">
                                  {source.totalEnrichments.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2">Enriched Fields:</p>
                              <div className="flex gap-1 flex-wrap">
                                {source.fieldsEnriched.map((field) => (
                                  <Badge key={field} variant="secondary" className="text-xs">
                                    {field.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Last: {formatDate(source.lastEnrichment)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                <span>Error rate: {source.errorRate}%</span>
                              </div>
                              {source.rateLimitRemaining !== undefined && (
                                <div className="flex items-center gap-1">
                                  <Gauge className="h-3 w-3" />
                                  <span>Limit: {source.rateLimitRemaining}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleSourceSettings(source.id)}
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="h-3 w-3" />
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

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Enrichment Jobs</CardTitle>
                  <CardDescription>
                    Monitor and manage data enrichment processes
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrichmentJobs.map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Zap className="h-6 w-6 text-blue-600" />
                          </div>
                          
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold">{job.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Created by {job.createdBy}
                                </p>
                              </div>
                              <Badge className={getStatusColor(job.status)}>
                                {job.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Progress</p>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${calculateProgress(job.leadsProcessed, job.totalLeads)}%` }}
                                    />
                                  </div>
                                  <span className="text-xs">
                                    {job.leadsProcessed}/{job.totalLeads}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium">Success Rate</p>
                                <p className="text-lg font-bold text-green-600">
                                  {Math.round((job.successCount / job.leadsProcessed) * 100)}%
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Cost Estimate</p>
                                <p className="text-lg font-bold">
                                  ${job.costEstimate}
                                </p>
                              </div>
                              <div>
                                <p className="font-medium">Duration</p>
                                <p className="text-lg font-bold">
                                  {job.duration ? formatDuration(job.duration) : 'Running...'}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2">Enrichment Sources:</p>
                              <div className="flex gap-2 flex-wrap">
                                {job.sources.map((sourceId) => {
                                  const source = enrichmentSources.find(s => s.id === sourceId);
                                  return (
                                    <Badge key={sourceId} variant="outline" className="text-xs">
                                      {source?.name || sourceId}
                                    </Badge>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Started: {formatDate(job.startedAt)}</span>
                              </div>
                              {job.completedAt && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Completed: {formatDate(job.completedAt)}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>{job.successCount} success</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <XCircle className="h-3 w-3 text-red-600" />
                                <span>{job.errorCount} errors</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {job.status === 'running' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleJobAction(job.id, 'pause')}
                              >
                                Pause
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleJobAction(job.id, 'stop')}
                              >
                                Stop
                              </Button>
                            </>
                          )}
                          {job.status === 'failed' && (
                            <Button 
                              size="sm"
                              onClick={() => handleJobAction(job.id, 'retry')}
                            >
                              Retry
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
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

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Reports</CardTitle>
              <CardDescription>
                Analyze data completeness, accuracy, and consistency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {qualityReports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{report.field}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getQualityColor(report.overallScore)} bg-opacity-10`}>
                            Overall Score: {report.overallScore}%
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Completeness</span>
                            <span className={`text-sm font-bold ${getQualityColor(report.completeness)}`}>
                              {report.completeness}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getQualityColor(report.completeness) === 'text-green-600' ? 'bg-green-500' : 
                                getQualityColor(report.completeness) === 'text-yellow-600' ? 'bg-yellow-500' :
                                getQualityColor(report.completeness) === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${report.completeness}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">
                              +{report.trends.completeness}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Accuracy</span>
                            <span className={`text-sm font-bold ${getQualityColor(report.accuracy)}`}>
                              {report.accuracy}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getQualityColor(report.accuracy) === 'text-green-600' ? 'bg-green-500' : 
                                getQualityColor(report.accuracy) === 'text-yellow-600' ? 'bg-yellow-500' :
                                getQualityColor(report.accuracy) === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${report.accuracy}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <TrendingDown className="h-3 w-3 text-red-600" />
                            <span className="text-xs text-red-600">
                              {report.trends.accuracy}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Freshness</span>
                            <span className={`text-sm font-bold ${getQualityColor(report.freshness)}`}>
                              {report.freshness}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getQualityColor(report.freshness) === 'text-green-600' ? 'bg-green-500' : 
                                getQualityColor(report.freshness) === 'text-yellow-600' ? 'bg-yellow-500' :
                                getQualityColor(report.freshness) === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${report.freshness}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Consistency</span>
                            <span className={`text-sm font-bold ${getQualityColor(report.consistency)}`}>
                              {report.consistency}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getQualityColor(report.consistency) === 'text-green-600' ? 'bg-green-500' : 
                                getQualityColor(report.consistency) === 'text-yellow-600' ? 'bg-yellow-500' :
                                getQualityColor(report.consistency) === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${report.consistency}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Data Issues</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {report.issues.map((issue, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium capitalize">
                                  {issue.type.replace('_', ' ')}
                                </span>
                                <Badge variant="outline">{issue.count}</Badge>
                              </div>
                              <div className="space-y-1">
                                {issue.examples.slice(0, 2).map((example, idx) => (
                                  <p key={idx} className="text-xs text-muted-foreground font-mono">
                                    {example}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
                <CardDescription>
                  Return on investment from data enrichment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Enrichment Cost</span>
                    <span className="font-bold">$2,347.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Leads Converted (Enriched)</span>
                    <span className="font-bold">147</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Deal Value</span>
                    <span className="font-bold">$12,500</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">ROI</span>
                      <span className="text-2xl font-bold text-green-600">684%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      $16.35 return for every $1 invested
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions to improve enrichment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Improve Email Coverage</p>
                      <p className="text-xs text-muted-foreground">
                        Add ZoomInfo integration to increase email discovery by ~15%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Optimize Source Priority</p>
                      <p className="text-xs text-muted-foreground">
                        Use Clearbit before Hunter.io to reduce API costs by 12%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Schedule Enrichment</p>
                      <p className="text-xs text-muted-foreground">
                        Run jobs during off-peak hours to improve performance
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadEnrichmentAnalytics;
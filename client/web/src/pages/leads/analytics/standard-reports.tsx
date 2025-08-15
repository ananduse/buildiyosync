import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  Clock,
  Download,
  Search,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  Play,
  Share,
  Bookmark,
  BookmarkCheck,
  Star,
  ArrowRight,
  FileBarChart,
  Activity,
  Award,
  Building,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingDown,
  Gauge,
  Database,
  Clock3,
  Calendar as CalendarIcon
} from 'lucide-react';

interface StandardReport {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'marketing' | 'operations' | 'performance' | 'compliance' | 'financial';
  type: 'dashboard' | 'table' | 'chart' | 'summary' | 'detailed';
  frequency: 'real-time' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastGenerated: string;
  averageGenerationTime: number;
  popularity: number;
  rating: number;
  dataPoints: number;
  filters: string[];
  formats: ('pdf' | 'excel' | 'csv' | 'email')[];
  isBookmarked: boolean;
  isScheduled: boolean;
  metrics: {
    leads: number;
    conversions: number;
    revenue: number;
    growth: number;
  };
  preview: {
    chartType: 'bar' | 'line' | 'pie' | 'table' | 'metric';
    data: any[];
  };
}

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedTime: string;
  complexity: 'simple' | 'moderate' | 'complex';
  parameters: string[];
  outputFormats: string[];
  sampleData: boolean;
}

const StandardReports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<StandardReport | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for standard reports
  const standardReports: StandardReport[] = [
    {
      id: 'sales-performance',
      name: 'Sales Performance Report',
      description: 'Comprehensive analysis of sales team performance, conversion rates, and revenue metrics',
      category: 'sales',
      type: 'dashboard',
      frequency: 'daily',
      lastGenerated: '2024-01-15T10:30:00Z',
      averageGenerationTime: 45,
      popularity: 94,
      rating: 4.8,
      dataPoints: 1247,
      filters: ['Date Range', 'Sales Rep', 'Territory', 'Product'],
      formats: ['pdf', 'excel', 'email'],
      isBookmarked: true,
      isScheduled: true,
      metrics: {
        leads: 1247,
        conversions: 298,
        revenue: 847600,
        growth: 18.5
      },
      preview: {
        chartType: 'bar',
        data: [
          { month: 'Jan', revenue: 850000 },
          { month: 'Feb', revenue: 920000 },
          { month: 'Mar', revenue: 1020000 }
        ]
      }
    },
    {
      id: 'lead-conversion-funnel',
      name: 'Lead Conversion Funnel',
      description: 'Track lead progression through sales stages and identify conversion bottlenecks',
      category: 'sales',
      type: 'chart',
      frequency: 'real-time',
      lastGenerated: '2024-01-15T16:45:00Z',
      averageGenerationTime: 23,
      popularity: 87,
      rating: 4.6,
      dataPoints: 2341,
      filters: ['Date Range', 'Source', 'Industry', 'Lead Score'],
      formats: ['pdf', 'excel', 'csv'],
      isBookmarked: false,
      isScheduled: false,
      metrics: {
        leads: 2341,
        conversions: 567,
        revenue: 1234000,
        growth: 24.2
      },
      preview: {
        chartType: 'bar',
        data: [
          { stage: 'New', count: 2341 },
          { stage: 'Qualified', count: 1876 },
          { stage: 'Proposal', count: 891 },
          { stage: 'Closed Won', count: 567 }
        ]
      }
    },
    {
      id: 'marketing-roi',
      name: 'Marketing ROI Analysis',
      description: 'Analyze marketing campaign effectiveness and return on investment across channels',
      category: 'marketing',
      type: 'summary',
      frequency: 'monthly',
      lastGenerated: '2024-01-14T14:20:00Z',
      averageGenerationTime: 67,
      popularity: 76,
      rating: 4.4,
      dataPoints: 892,
      filters: ['Campaign', 'Channel', 'Date Range', 'Budget Range'],
      formats: ['pdf', 'excel', 'email'],
      isBookmarked: true,
      isScheduled: true,
      metrics: {
        leads: 892,
        conversions: 234,
        revenue: 567000,
        growth: 15.3
      },
      preview: {
        chartType: 'pie',
        data: [
          { channel: 'Email', leads: 234 },
          { channel: 'Social', leads: 189 },
          { channel: 'PPC', leads: 156 },
          { channel: 'SEO', leads: 143 }
        ]
      }
    },
    {
      id: 'activity-summary',
      name: 'Daily Activity Summary',
      description: 'Overview of daily lead management activities, calls, emails, and meetings',
      category: 'operations',
      type: 'table',
      frequency: 'daily',
      lastGenerated: '2024-01-15T09:00:00Z',
      averageGenerationTime: 15,
      popularity: 92,
      rating: 4.7,
      dataPoints: 456,
      filters: ['Date', 'User', 'Activity Type', 'Status'],
      formats: ['pdf', 'excel', 'csv', 'email'],
      isBookmarked: true,
      isScheduled: true,
      metrics: {
        leads: 456,
        conversions: 89,
        revenue: 234000,
        growth: 12.1
      },
      preview: {
        chartType: 'table',
        data: [
          { activity: 'Calls', count: 156 },
          { activity: 'Emails', count: 89 },
          { activity: 'Meetings', count: 34 },
          { activity: 'Follow-ups', count: 67 }
        ]
      }
    },
    {
      id: 'lead-source-analysis',
      name: 'Lead Source Analysis',
      description: 'Breakdown of lead sources with quality metrics and conversion rates',
      category: 'marketing',
      type: 'chart',
      frequency: 'weekly',
      lastGenerated: '2024-01-14T12:00:00Z',
      averageGenerationTime: 38,
      popularity: 83,
      rating: 4.5,
      dataPoints: 1567,
      filters: ['Date Range', 'Source Type', 'Industry', 'Geography'],
      formats: ['pdf', 'excel', 'csv'],
      isBookmarked: false,
      isScheduled: false,
      metrics: {
        leads: 1567,
        conversions: 378,
        revenue: 678000,
        growth: 20.7
      },
      preview: {
        chartType: 'pie',
        data: [
          { source: 'Website', leads: 567 },
          { source: 'Referral', leads: 342 },
          { source: 'Events', leads: 234 },
          { source: 'Social', leads: 189 }
        ]
      }
    },
    {
      id: 'team-performance',
      name: 'Team Performance Dashboard',
      description: 'Individual and team performance metrics with productivity insights',
      category: 'performance',
      type: 'dashboard',
      frequency: 'weekly',
      lastGenerated: '2024-01-15T08:30:00Z',
      averageGenerationTime: 52,
      popularity: 89,
      rating: 4.6,
      dataPoints: 234,
      filters: ['Team', 'Individual', 'Date Range', 'Metrics'],
      formats: ['pdf', 'excel', 'email'],
      isBookmarked: true,
      isScheduled: false,
      metrics: {
        leads: 234,
        conversions: 67,
        revenue: 456000,
        growth: 16.8
      },
      preview: {
        chartType: 'bar',
        data: [
          { rep: 'Sarah', deals: 45 },
          { rep: 'Mike', deals: 38 },
          { rep: 'Lisa', deals: 32 },
          { rep: 'Alex', deals: 29 }
        ]
      }
    },
    {
      id: 'compliance-audit',
      name: 'Compliance Audit Report',
      description: 'GDPR compliance, data retention, and privacy audit summary',
      category: 'compliance',
      type: 'detailed',
      frequency: 'monthly',
      lastGenerated: '2024-01-14T16:00:00Z',
      averageGenerationTime: 89,
      popularity: 65,
      rating: 4.3,
      dataPoints: 789,
      filters: ['Compliance Type', 'Date Range', 'Department', 'Risk Level'],
      formats: ['pdf', 'excel'],
      isBookmarked: false,
      isScheduled: true,
      metrics: {
        leads: 789,
        conversions: 156,
        revenue: 345000,
        growth: 8.9
      },
      preview: {
        chartType: 'metric',
        data: [
          { metric: 'Compliance Score', value: 94.2 },
          { metric: 'Data Quality', value: 87.8 },
          { metric: 'Privacy Score', value: 96.1 }
        ]
      }
    },
    {
      id: 'revenue-forecast',
      name: 'Revenue Forecast Report',
      description: 'Predictive revenue analysis with pipeline projections and trend analysis',
      category: 'financial',
      type: 'summary',
      frequency: 'monthly',
      lastGenerated: '2024-01-15T11:00:00Z',
      averageGenerationTime: 74,
      popularity: 91,
      rating: 4.9,
      dataPoints: 567,
      filters: ['Forecast Period', 'Confidence Level', 'Product Line', 'Territory'],
      formats: ['pdf', 'excel', 'email'],
      isBookmarked: true,
      isScheduled: true,
      metrics: {
        leads: 567,
        conversions: 189,
        revenue: 2340000,
        growth: 28.4
      },
      preview: {
        chartType: 'line',
        data: [
          { month: 'Feb', forecast: 2400000 },
          { month: 'Mar', forecast: 2650000 },
          { month: 'Apr', forecast: 2890000 }
        ]
      }
    }
  ];

  // Mock data for report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'custom-sales',
      name: 'Custom Sales Report',
      category: 'Sales',
      description: 'Build your own sales performance report with custom metrics',
      estimatedTime: '5-10 minutes',
      complexity: 'moderate',
      parameters: ['Date Range', 'Metrics', 'Grouping', 'Filters'],
      outputFormats: ['PDF', 'Excel', 'CSV'],
      sampleData: true
    },
    {
      id: 'lead-analysis',
      name: 'Lead Analysis Report',
      category: 'Marketing',
      description: 'Comprehensive lead quality and source analysis',
      estimatedTime: '3-5 minutes',
      complexity: 'simple',
      parameters: ['Time Period', 'Source Filters', 'Quality Metrics'],
      outputFormats: ['PDF', 'Excel'],
      sampleData: true
    },
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      category: 'Executive',
      description: 'High-level business metrics and KPIs for leadership',
      estimatedTime: '2-3 minutes',
      complexity: 'simple',
      parameters: ['Period', 'Business Units', 'Key Metrics'],
      outputFormats: ['PDF', 'Email'],
      sampleData: false
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return DollarSign;
      case 'marketing': return Target;
      case 'operations': return Activity;
      case 'performance': return Award;
      case 'compliance': return CheckCircle;
      case 'financial': return BarChart3;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-green-100 text-green-800';
      case 'marketing': return 'bg-blue-100 text-blue-800';
      case 'operations': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'complex': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'real-time': return Activity;
      case 'daily': return Clock;
      case 'weekly': return Calendar;
      case 'monthly': return CalendarIcon;
      case 'quarterly': return Calendar;
      default: return Clock;
    }
  };

  const filteredReports = standardReports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const generateReport = (reportId: string) => {
    // Simulate report generation
    console.log(`Generating report: ${reportId}`);
  };

  const toggleBookmark = (reportId: string) => {
    // Toggle bookmark status
    console.log(`Toggling bookmark for report: ${reportId}`);
  };

  const scheduleReport = (reportId: string) => {
    // Open scheduling dialog
    console.log(`Scheduling report: ${reportId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Standard Reports</h1>
          <p className="text-muted-foreground">Pre-built reports and analytics for lead management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Standard Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filters and Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                  <div className="bg-current rounded-sm" />
                </div>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <div className="space-y-1">
                  <div className="h-0.5 w-4 bg-current rounded" />
                  <div className="h-0.5 w-4 bg-current rounded" />
                  <div className="h-0.5 w-4 bg-current rounded" />
                </div>
              </Button>
            </div>
          </div>

          {/* Reports Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => {
                const CategoryIcon = getCategoryIcon(report.category);
                const FrequencyIcon = getFrequencyIcon(report.frequency);
                
                return (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-5 w-5 text-gray-600" />
                          <Badge className={getCategoryColor(report.category)}>
                            {report.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleBookmark(report.id)}
                          >
                            {report.isBookmarked ? (
                              <BookmarkCheck className="h-3 w-3 text-blue-500" />
                            ) : (
                              <Bookmark className="h-3 w-3" />
                            )}
                          </Button>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">{report.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {report.metrics.leads.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Data Points</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {report.metrics.growth.toFixed(1)}%
                          </p>
                          <p className="text-sm text-muted-foreground">Growth</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <FrequencyIcon className="h-3 w-3" />
                          <span className="capitalize">{report.frequency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{report.averageGenerationTime}s</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                        <span>{report.popularity}% popularity</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => generateReport(report.id)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => scheduleReport(report.id)}
                        >
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {report.formats.map(format => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Report</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Frequency</th>
                        <th className="text-left py-3 px-4 font-medium">Data Points</th>
                        <th className="text-left py-3 px-4 font-medium">Last Generated</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => {
                        const CategoryIcon = getCategoryIcon(report.category);
                        
                        return (
                          <tr key={report.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <CategoryIcon className="h-4 w-4 text-gray-600" />
                                <div>
                                  <p className="font-medium">{report.name}</p>
                                  <p className="text-sm text-muted-foreground truncate max-w-xs">
                                    {report.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getCategoryColor(report.category)}>
                                {report.category}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 capitalize">{report.type}</td>
                            <td className="py-3 px-4 capitalize">{report.frequency}</td>
                            <td className="py-3 px-4">{report.dataPoints.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              {new Date(report.lastGenerated).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => generateReport(report.id)}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedReport(report)}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleBookmark(report.id)}
                                >
                                  {report.isBookmarked ? (
                                    <BookmarkCheck className="h-3 w-3 text-blue-500" />
                                  ) : (
                                    <Bookmark className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Create custom reports using these pre-configured templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{template.category}</Badge>
                          <div className={`text-sm font-medium ${getComplexityColor(template.complexity)}`}>
                            {template.complexity}
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-3 w-3" />
                            <span>{template.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-3 w-3" />
                            <span>{template.parameters.length} parameters</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Download className="h-3 w-3" />
                            <span>{template.outputFormats.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="flex-1">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Use Template
                          </Button>
                          <Button variant="outline" size="sm">
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

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Manage automated report generation and delivery schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {standardReports.filter(r => r.isScheduled).map((report) => {
                  const CategoryIcon = getCategoryIcon(report.category);
                  
                  return (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CategoryIcon className="h-5 w-5 text-gray-600" />
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {report.frequency} • {report.formats.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {standardReports.filter(r => r.isScheduled).length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No scheduled reports</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Schedule reports for automatic generation and delivery
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StandardReports;
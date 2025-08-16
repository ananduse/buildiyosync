import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Send,
  Target,
  Clock,
  Users,
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  MapPin,
  Share2,
  ArrowUp,
  ArrowDown,
  Minus,
  ExternalLink
} from 'lucide-react';

interface FormAnalyticsData {
  overview: {
    totalViews: number;
    totalSubmissions: number;
    conversionRate: number;
    averageTime: number;
    uniqueVisitors: number;
    returningVisitors: number;
  };
  trends: {
    period: string;
    views: number[];
    submissions: number[];
    conversions: number[];
    dates: string[];
  };
  fieldAnalytics: {
    [fieldId: string]: {
      fieldName: string;
      interactions: number;
      completions: number;
      errors: number;
      abandonmentRate: number;
      averageTime: number;
    };
  };
  trafficSources: {
    source: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
    value: number;
  }[];
  deviceBreakdown: {
    device: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
  }[];
  geographicData: {
    country: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
  }[];
  timeAnalytics: {
    hourly: { hour: number; submissions: number }[];
    daily: { day: string; submissions: number }[];
  };
  heatmapData: {
    fieldId: string;
    x: number;
    y: number;
    clicks: number;
    attention: number;
  }[];
}

const FormAnalyticsDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock analytics data
  const analytics: FormAnalyticsData = {
    overview: {
      totalViews: 15672,
      totalSubmissions: 2341,
      conversionRate: 14.9,
      averageTime: 2.5,
      uniqueVisitors: 12845,
      returningVisitors: 2827
    },
    trends: {
      period: '7d',
      views: [1200, 1350, 1100, 1500, 1400, 1600, 1750],
      submissions: [180, 195, 165, 220, 210, 240, 260],
      conversions: [15.0, 14.4, 15.0, 14.7, 15.0, 15.0, 14.9],
      dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    fieldAnalytics: {
      'name': {
        fieldName: 'Full Name',
        interactions: 15672,
        completions: 14890,
        errors: 320,
        abandonmentRate: 5.0,
        averageTime: 15.2
      },
      'email': {
        fieldName: 'Email Address',
        interactions: 14890,
        completions: 13654,
        errors: 856,
        abandonmentRate: 8.3,
        averageTime: 18.7
      },
      'phone': {
        fieldName: 'Phone Number',
        interactions: 13654,
        completions: 12234,
        errors: 445,
        abandonmentRate: 10.4,
        averageTime: 22.1
      },
      'company': {
        fieldName: 'Company Name',
        interactions: 12234,
        completions: 11567,
        errors: 156,
        abandonmentRate: 5.5,
        averageTime: 12.8
      },
      'project_type': {
        fieldName: 'Project Type',
        interactions: 11567,
        completions: 10234,
        errors: 78,
        abandonmentRate: 11.5,
        averageTime: 25.4
      },
      'budget': {
        fieldName: 'Budget Range',
        interactions: 10234,
        completions: 8967,
        errors: 45,
        abandonmentRate: 12.4,
        averageTime: 28.9
      },
      'message': {
        fieldName: 'Project Details',
        interactions: 8967,
        completions: 7234,
        errors: 23,
        abandonmentRate: 19.3,
        averageTime: 125.6
      }
    },
    trafficSources: [
      { source: 'Direct', visitors: 5834, conversions: 987, conversionRate: 16.9, value: 4235 },
      { source: 'Google Ads', visitors: 3456, conversions: 456, conversionRate: 13.2, value: 1890 },
      { source: 'Social Media', visitors: 2789, conversions: 378, conversionRate: 13.6, value: 1567 },
      { source: 'Email Campaign', visitors: 2345, conversions: 345, conversionRate: 14.7, value: 1234 },
      { source: 'Organic Search', visitors: 1248, conversions: 175, conversionRate: 14.0, value: 789 }
    ],
    deviceBreakdown: [
      { device: 'Desktop', visitors: 8765, conversions: 1456, conversionRate: 16.6 },
      { device: 'Mobile', visitors: 5432, conversions: 678, conversionRate: 12.5 },
      { device: 'Tablet', visitors: 1475, conversions: 207, conversionRate: 14.0 }
    ],
    geographicData: [
      { country: 'United States', visitors: 7845, conversions: 1234, conversionRate: 15.7 },
      { country: 'Canada', visitors: 2345, conversions: 345, conversionRate: 14.7 },
      { country: 'United Kingdom', visitors: 1876, conversions: 276, conversionRate: 14.7 },
      { country: 'Australia', visitors: 1456, conversions: 198, conversionRate: 13.6 },
      { country: 'Germany', visitors: 1234, conversions: 167, conversionRate: 13.5 }
    ],
    timeAnalytics: {
      hourly: [
        { hour: 0, submissions: 12 }, { hour: 1, submissions: 8 }, { hour: 2, submissions: 5 },
        { hour: 3, submissions: 4 }, { hour: 4, submissions: 6 }, { hour: 5, submissions: 15 },
        { hour: 6, submissions: 32 }, { hour: 7, submissions: 45 }, { hour: 8, submissions: 78 },
        { hour: 9, submissions: 95 }, { hour: 10, submissions: 112 }, { hour: 11, submissions: 134 },
        { hour: 12, submissions: 145 }, { hour: 13, submissions: 156 }, { hour: 14, submissions: 167 },
        { hour: 15, submissions: 178 }, { hour: 16, submissions: 165 }, { hour: 17, submissions: 143 },
        { hour: 18, submissions: 124 }, { hour: 19, submissions: 98 }, { hour: 20, submissions: 76 },
        { hour: 21, submissions: 54 }, { hour: 22, submissions: 34 }, { hour: 23, submissions: 23 }
      ],
      daily: [
        { day: 'Monday', submissions: 287 }, { day: 'Tuesday', submissions: 312 },
        { day: 'Wednesday', submissions: 298 }, { day: 'Thursday', submissions: 356 },
        { day: 'Friday', submissions: 389 }, { day: 'Saturday', submissions: 267 },
        { day: 'Sunday', submissions: 234 }
      ]
    },
    heatmapData: []
  };

  const getChangeIndicator = (value: number, comparison: number) => {
    const change = ((value - comparison) / comparison) * 100;
    if (change > 0) {
      return { icon: ArrowUp, color: 'text-green-600', value: `+${change.toFixed(1)}%` };
    } else if (change < 0) {
      return { icon: ArrowDown, color: 'text-red-600', value: `${change.toFixed(1)}%` };
    } else {
      return { icon: Minus, color: 'text-gray-600', value: '0%' };
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, change }: any) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <div className="flex items-center gap-1 mt-1">
                {change && (
                  <>
                    <change.icon className={`h-3 w-3 ${change.color}`} />
                    <span className={`text-xs ${change.color}`}>{change.value}</span>
                    <span className="text-xs text-muted-foreground">{subtitle}</span>
                  </>
                )}
              </div>
            )}
          </div>
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Form Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive analytics and insights for your forms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                <SelectItem value="form_123">Lead Capture Form</SelectItem>
                <SelectItem value="form_456">Contact Form</SelectItem>
                <SelectItem value="form_789">Quote Request Form</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Today</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
            <TabsTrigger value="realtime">Real-time</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Views"
                value={analytics.overview.totalViews.toLocaleString()}
                subtitle="vs last period"
                icon={Eye}
                change={getChangeIndicator(analytics.overview.totalViews, 14234)}
              />
              <StatCard
                title="Submissions"
                value={analytics.overview.totalSubmissions.toLocaleString()}
                subtitle="vs last period"
                icon={Send}
                change={getChangeIndicator(analytics.overview.totalSubmissions, 2156)}
              />
              <StatCard
                title="Conversion Rate"
                value={`${analytics.overview.conversionRate}%`}
                subtitle="vs last period"
                icon={Target}
                change={getChangeIndicator(analytics.overview.conversionRate, 13.8)}
              />
              <StatCard
                title="Avg. Time"
                value={`${analytics.overview.averageTime}m`}
                subtitle="vs last period"
                icon={Clock}
                change={getChangeIndicator(analytics.overview.averageTime, 2.8)}
              />
            </div>

            {/* Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Views, submissions, and conversion rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive chart would be rendered here</p>
                    <p className="text-sm">Showing data for {analytics.trends.period}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Unique Visitors</span>
                      <span className="font-medium">{analytics.overview.uniqueVisitors.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Returning Visitors</span>
                      <span className="font-medium">{analytics.overview.returningVisitors.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Return Rate</span>
                      <span className="font-medium">
                        {((analytics.overview.returningVisitors / analytics.overview.uniqueVisitors) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.trafficSources.slice(0, 3).map((source, index) => (
                      <div key={source.source} className="flex items-center justify-between">
                        <span className="text-sm">{source.source}</span>
                        <div className="text-right">
                          <div className="font-medium">{source.visitors.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {source.conversionRate.toFixed(1)}% conv.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Field Performance Analysis</CardTitle>
                <CardDescription>How each form field performs and where users drop off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.fieldAnalytics).map(([fieldId, field]) => (
                    <div key={fieldId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{field.fieldName}</h4>
                        <Badge 
                          variant={field.abandonmentRate > 15 ? 'destructive' : field.abandonmentRate > 10 ? 'secondary' : 'outline'}
                        >
                          {field.abandonmentRate.toFixed(1)}% abandon
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Interactions</span>
                          <div className="font-medium">{field.interactions.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Completions</span>
                          <div className="font-medium">{field.completions.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Errors</span>
                          <div className="font-medium text-red-600">{field.errors}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg. Time</span>
                          <div className="font-medium">{field.averageTime.toFixed(1)}s</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex text-xs text-muted-foreground mb-1">
                          <span>Completion Rate: {((field.completions / field.interactions) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${(field.completions / field.interactions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your form visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.trafficSources.map((source) => (
                      <div key={source.source} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{source.source}</span>
                            <span className="text-sm text-muted-foreground">
                              {source.visitors.toLocaleString()} visitors
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{source.conversions} conversions</span>
                            <span>{source.conversionRate.toFixed(1)}% rate</span>
                          </div>
                          <div className="mt-2 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(source.visitors / analytics.trafficSources[0].visitors) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>Form performance across devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.deviceBreakdown.map((device) => {
                      const Icon = device.device === 'Desktop' ? Monitor : 
                                  device.device === 'Mobile' ? Smartphone : 
                                  device.device === 'Tablet' ? Tablet : Monitor;
                      
                      return (
                        <div key={device.device} className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{device.device}</span>
                              <span className="text-sm text-muted-foreground">
                                {device.conversionRate.toFixed(1)}%
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {device.visitors.toLocaleString()} visitors, {device.conversions} conversions
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${device.conversionRate}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Form performance by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {analytics.geographicData.map((country) => (
                      <div key={country.country} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{country.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{country.visitors.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {country.conversionRate.toFixed(1)}% conv.
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Globe className="h-12 w-12 mx-auto mb-2" />
                      <p>World map visualization</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Submissions</CardTitle>
                  <CardDescription>When users submit forms throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Clock className="h-12 w-12 mx-auto mb-2" />
                      <p>24-hour activity chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Daily Submissions</CardTitle>
                  <CardDescription>Form submissions by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.timeAnalytics.daily.map((day) => (
                      <div key={day.day} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{day.day}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ 
                                width: `${(day.submissions / Math.max(...analytics.timeAnalytics.daily.map(d => d.submissions))) * 100}%` 
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {day.submissions}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Form Interaction Heatmap</CardTitle>
                <CardDescription>Visual representation of where users interact with your form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-2" />
                    <p>Form heatmap visualization</p>
                    <p className="text-sm">Shows click and attention patterns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">{analytics.overview.conversionRate}%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Form Completions</p>
                      <p className="text-2xl font-bold">{analytics.overview.totalSubmissions.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Abandonments</p>
                      <p className="text-2xl font-bold">{(analytics.overview.totalViews - analytics.overview.totalSubmissions).toLocaleString()}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>Step-by-step breakdown of form completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.fieldAnalytics).map(([fieldId, field], index) => {
                    const completionRate = (field.completions / analytics.overview.totalViews) * 100;
                    return (
                      <div key={fieldId} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                              {index + 1}
                            </div>
                            <span className="font-medium">{field.fieldName}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{field.completions.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              {completionRate.toFixed(1)}% of total
                            </div>
                          </div>
                        </div>
                        <div className="ml-8">
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${completionRate}%` }}
                            />
                          </div>
                        </div>
                        {field.errors > 0 && (
                          <div className="ml-8 mt-1 text-xs text-red-600">
                            {field.errors} errors ({((field.errors / field.interactions) * 100).toFixed(1)}% error rate)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Forms Started</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <MousePointer className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Submissions</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Send className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion</p>
                      <p className="text-2xl font-bold">37.5%</p>
                    </div>
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Activity Feed</CardTitle>
                <CardDescription>Live updates of form interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { time: '2 seconds ago', action: 'Form submitted', user: 'User from New York', icon: CheckCircle, color: 'text-green-600' },
                    { time: '15 seconds ago', action: 'Started form', user: 'User from California', icon: MousePointer, color: 'text-blue-600' },
                    { time: '32 seconds ago', action: 'Viewed form', user: 'User from Texas', icon: Eye, color: 'text-gray-600' },
                    { time: '1 minute ago', action: 'Form abandoned', user: 'User from Florida', icon: AlertTriangle, color: 'text-red-600' },
                    { time: '2 minutes ago', action: 'Form submitted', user: 'User from Illinois', icon: CheckCircle, color: 'text-green-600' },
                    { time: '3 minutes ago', action: 'Started form', user: 'User from Ohio', icon: MousePointer, color: 'text-blue-600' }
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                        <Icon className={`h-4 w-4 ${activity.color}`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">
                            {activity.user} • {activity.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FormAnalyticsDashboard;
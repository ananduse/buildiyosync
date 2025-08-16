import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  Target,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Settings,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  DollarSign,
  Percent,
  Hash,
  Play,
  Pause,
  Stop,
  SkipForward,
  Rewind,
  Search,
  Plus,
  Minus,
  Equal,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Building,
  User,
  Star,
  Heart,
  MessageSquare,
  Send,
  Archive,
  Bookmark,
  Flag,
  Shield,
  Lock,
  Unlock,
  Activity,
  PieChart,
  LineChart,
  AreaChart,
  Layers,
  Grid,
  List,
  Navigation,
  Maximize,
  Minimize
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormAnalytics {
  formId: string;
  formName: string;
  timeRange: string;
  overview: OverviewMetrics;
  performance: PerformanceMetrics;
  conversion: ConversionMetrics;
  fields: FieldAnalytics[];
  traffic: TrafficAnalytics;
  devices: DeviceAnalytics;
  geography: GeographyAnalytics;
  behavior: BehaviorAnalytics;
  trends: TrendAnalytics;
}

interface OverviewMetrics {
  totalViews: number;
  uniqueVisitors: number;
  submissions: number;
  conversionRate: number;
  averageTime: number;
  bounceRate: number;
  returnVisitors: number;
  mobileTraffic: number;
}

interface PerformanceMetrics {
  loadTime: number;
  firstInteraction: number;
  completionTime: number;
  errorRate: number;
  abandonmentRate: number;
  fieldErrors: number;
  validationErrors: number;
  successfulSubmissions: number;
}

interface ConversionMetrics {
  conversionFunnel: FunnelStep[];
  conversionBySource: Record<string, number>;
  conversionByDevice: Record<string, number>;
  conversionByTime: HourlyData[];
  conversionByDay: DailyData[];
}

interface FunnelStep {
  step: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  dropoffRate: number;
}

interface FieldAnalytics {
  fieldId: string;
  fieldName: string;
  fieldType: string;
  interactions: number;
  completions: number;
  errors: number;
  averageTime: number;
  abandonmentRate: number;
  errorMessages: Record<string, number>;
  mostCommonValues: Array<{ value: string; count: number }>;
}

interface TrafficAnalytics {
  sources: Record<string, number>;
  referrers: Record<string, number>;
  campaigns: Record<string, number>;
  keywords: Record<string, number>;
}

interface DeviceAnalytics {
  devices: Record<string, number>;
  browsers: Record<string, number>;
  operatingSystems: Record<string, number>;
  screenResolutions: Record<string, number>;
}

interface GeographyAnalytics {
  countries: Record<string, number>;
  regions: Record<string, number>;
  cities: Record<string, number>;
  languages: Record<string, number>;
}

interface BehaviorAnalytics {
  scrollDepth: Record<string, number>;
  timeOnPage: Record<string, number>;
  clickHeatmap: Array<{ x: number; y: number; count: number }>;
  formInteractions: Array<{
    timestamp: Date;
    action: string;
    field: string;
    value?: string;
  }>;
}

interface TrendAnalytics {
  daily: DailyData[];
  hourly: HourlyData[];
  weekly: WeeklyData[];
  monthly: MonthlyData[];
}

interface DailyData {
  date: string;
  views: number;
  submissions: number;
  conversionRate: number;
}

interface HourlyData {
  hour: number;
  views: number;
  submissions: number;
  conversionRate: number;
}

interface WeeklyData {
  week: string;
  views: number;
  submissions: number;
  conversionRate: number;
}

interface MonthlyData {
  month: string;
  views: number;
  submissions: number;
  conversionRate: number;
}

const AdvancedFormAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('conversion_rate');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock analytics data
  const analytics: FormAnalytics = {
    formId: 'construction_lead_form',
    formName: 'Construction Lead Capture Form',
    timeRange: '7d',
    overview: {
      totalViews: 15247,
      uniqueVisitors: 12834,
      submissions: 2156,
      conversionRate: 14.1,
      averageTime: 247,
      bounceRate: 32.4,
      returnVisitors: 1876,
      mobileTraffic: 68.3
    },
    performance: {
      loadTime: 1.2,
      firstInteraction: 3.4,
      completionTime: 187,
      errorRate: 8.7,
      abandonmentRate: 23.6,
      fieldErrors: 324,
      validationErrors: 156,
      successfulSubmissions: 2156
    },
    conversion: {
      conversionFunnel: [
        { step: 'Page View', visitors: 15247, conversions: 15247, conversionRate: 100, dropoffRate: 0 },
        { step: 'Form Start', visitors: 12834, conversions: 12834, conversionRate: 84.2, dropoffRate: 15.8 },
        { step: 'Step 1 Complete', visitors: 10567, conversions: 10567, conversionRate: 82.3, dropoffRate: 17.7 },
        { step: 'Step 2 Complete', visitors: 8234, conversions: 8234, conversionRate: 77.9, dropoffRate: 22.1 },
        { step: 'Step 3 Complete', visitors: 6847, conversions: 6847, conversionRate: 83.1, dropoffRate: 16.9 },
        { step: 'Form Submit', visitors: 2156, conversions: 2156, conversionRate: 31.5, dropoffRate: 68.5 }
      ],
      conversionBySource: {
        'Direct': 18.7,
        'Google Ads': 22.3,
        'Social Media': 12.8,
        'Email Campaign': 31.2,
        'Referral': 15.4
      },
      conversionByDevice: {
        'Desktop': 19.2,
        'Mobile': 12.3,
        'Tablet': 16.8
      },
      conversionByTime: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        views: Math.floor(Math.random() * 800) + 200,
        submissions: Math.floor(Math.random() * 120) + 20,
        conversionRate: Math.random() * 10 + 10
      })),
      conversionByDay: Array.from({ length: 7 }, (_, day) => ({
        date: new Date(Date.now() - (6 - day) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 3000) + 1000,
        submissions: Math.floor(Math.random() * 400) + 100,
        conversionRate: Math.random() * 8 + 12
      }))
    },
    fields: [
      {
        fieldId: 'first_name',
        fieldName: 'First Name',
        fieldType: 'text',
        interactions: 12834,
        completions: 12456,
        errors: 45,
        averageTime: 8.3,
        abandonmentRate: 2.9,
        errorMessages: {
          'Field is required': 32,
          'Invalid characters': 8,
          'Too short': 5
        },
        mostCommonValues: [
          { value: 'John', count: 234 },
          { value: 'Michael', count: 198 },
          { value: 'David', count: 167 }
        ]
      },
      {
        fieldId: 'email',
        fieldName: 'Email Address',
        fieldType: 'email',
        interactions: 12456,
        completions: 11987,
        errors: 234,
        averageTime: 12.7,
        abandonmentRate: 3.8,
        errorMessages: {
          'Invalid email format': 187,
          'Field is required': 34,
          'Email already exists': 13
        },
        mostCommonValues: [
          { value: 'gmail.com', count: 4567 },
          { value: 'yahoo.com', count: 2341 },
          { value: 'outlook.com', count: 1876 }
        ]
      },
      {
        fieldId: 'company_name',
        fieldName: 'Company Name',
        fieldType: 'text',
        interactions: 11987,
        completions: 10234,
        errors: 89,
        averageTime: 15.2,
        abandonmentRate: 14.6,
        errorMessages: {
          'Field is required': 67,
          'Too short': 15,
          'Invalid characters': 7
        },
        mostCommonValues: [
          { value: 'ABC Construction', count: 45 },
          { value: 'XYZ Builders', count: 38 },
          { value: 'Modern Homes', count: 31 }
        ]
      },
      {
        fieldId: 'project_budget',
        fieldName: 'Project Budget',
        fieldType: 'select',
        interactions: 10234,
        completions: 8967,
        errors: 12,
        averageTime: 18.9,
        abandonmentRate: 12.4,
        errorMessages: {
          'Please select an option': 12
        },
        mostCommonValues: [
          { value: '$100k-$250k', count: 2876 },
          { value: '$250k-$500k', count: 2341 },
          { value: '$50k-$100k', count: 1987 }
        ]
      }
    ],
    traffic: {
      sources: {
        'Direct': 4523,
        'Google Search': 3876,
        'Google Ads': 2341,
        'Social Media': 1987,
        'Email': 1345,
        'Referral': 1175
      },
      referrers: {
        'google.com': 3876,
        'facebook.com': 1234,
        'linkedin.com': 876,
        'twitter.com': 654,
        'instagram.com': 432
      },
      campaigns: {
        'Construction Leads Q1': 2341,
        'Brand Awareness': 1876,
        'Retargeting Campaign': 987,
        'Local Services': 654
      },
      keywords: {
        'construction company': 1234,
        'home builders': 987,
        'renovation contractors': 765,
        'building services': 543
      }
    },
    devices: {
      devices: {
        'Mobile': 68.3,
        'Desktop': 24.7,
        'Tablet': 7.0
      },
      browsers: {
        'Chrome': 52.3,
        'Safari': 28.7,
        'Firefox': 11.2,
        'Edge': 5.8,
        'Other': 2.0
      },
      operatingSystems: {
        'iOS': 34.5,
        'Android': 33.8,
        'Windows': 24.7,
        'macOS': 6.2,
        'Other': 0.8
      },
      screenResolutions: {
        '375x667': 18.3,
        '414x896': 15.7,
        '390x844': 12.4,
        '1920x1080': 11.8,
        '1366x768': 9.2
      }
    },
    geography: {
      countries: {
        'United States': 78.3,
        'Canada': 12.7,
        'United Kingdom': 4.2,
        'Australia': 2.8,
        'Other': 2.0
      },
      regions: {
        'California': 18.7,
        'Texas': 14.2,
        'Florida': 11.3,
        'New York': 9.8,
        'Illinois': 7.6
      },
      cities: {
        'Los Angeles': 8.7,
        'New York': 7.2,
        'Chicago': 5.9,
        'Houston': 5.4,
        'Phoenix': 4.8
      },
      languages: {
        'en-US': 82.3,
        'es-ES': 7.8,
        'fr-FR': 3.2,
        'de-DE': 2.9,
        'Other': 3.8
      }
    },
    behavior: {
      scrollDepth: {
        '25%': 89.3,
        '50%': 76.8,
        '75%': 62.4,
        '100%': 34.7
      },
      timeOnPage: {
        '0-30s': 23.4,
        '30-60s': 31.2,
        '1-2m': 28.7,
        '2-5m': 12.8,
        '5m+': 3.9
      },
      clickHeatmap: [
        { x: 50, y: 200, count: 1234 },
        { x: 150, y: 350, count: 987 },
        { x: 300, y: 450, count: 765 }
      ],
      formInteractions: []
    },
    trends: {
      daily: Array.from({ length: 30 }, (_, day) => ({
        date: new Date(Date.now() - (29 - day) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 1000) + 500,
        submissions: Math.floor(Math.random() * 150) + 50,
        conversionRate: Math.random() * 10 + 10
      })),
      hourly: Array.from({ length: 24 }, (_, hour) => ({
        hour,
        views: Math.floor(Math.random() * 800) + 200,
        submissions: Math.floor(Math.random() * 120) + 20,
        conversionRate: Math.random() * 10 + 10
      })),
      weekly: [],
      monthly: []
    }
  };

  const renderMetricCard = (title: string, value: string | number, change: number, icon: React.ComponentType<any>, suffix?: string) => {
    const Icon = icon;
    const isPositive = change > 0;
    const changeIcon = isPositive ? ArrowUp : ArrowDown;
    const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
    
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">
                {typeof value === 'number' ? value.toLocaleString() : value}
                {suffix}
              </p>
              <div className={`flex items-center text-sm ${changeColor}`}>
                {React.createElement(changeIcon, { className: 'h-3 w-3 mr-1' })}
                {Math.abs(change).toFixed(1)}% vs last period
              </div>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFunnelStep = (step: FunnelStep, index: number, total: number) => {
    const isLast = index === total - 1;
    
    return (
      <div key={step.step} className="flex items-center">
        <div className="flex-1">
          <Card className="relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{step.step}</h3>
                <Badge variant="outline">
                  {step.conversionRate.toFixed(1)}%
                </Badge>
              </div>
              <div className="space-y-2">
                <Progress value={step.conversionRate} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{step.visitors.toLocaleString()} visitors</span>
                  <span>{step.conversions.toLocaleString()} conversions</span>
                </div>
                {step.dropoffRate > 0 && (
                  <div className="text-xs text-red-600">
                    {step.dropoffRate.toFixed(1)}% drop-off rate
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {!isLast && (
          <div className="flex items-center justify-center w-12">
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
    );
  };

  const renderFieldAnalytics = (field: FieldAnalytics) => {
    return (
      <Card key={field.fieldId}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{field.fieldName}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {field.fieldType}
              </Badge>
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
                  <Settings className="h-4 w-4 mr-2" />
                  Optimize Field
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Completion Rate</p>
              <p className="text-lg font-bold">
                {((field.completions / field.interactions) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Avg. Time</p>
              <p className="text-lg font-bold">{field.averageTime.toFixed(1)}s</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Errors</p>
              <p className="text-lg font-bold text-red-600">{field.errors}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Abandonment</p>
              <p className="text-lg font-bold text-orange-600">
                {field.abandonmentRate.toFixed(1)}%
              </p>
            </div>
          </div>

          <Separator className="mb-4" />

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Top Errors</h4>
              <div className="space-y-1">
                {Object.entries(field.errorMessages).slice(0, 3).map(([error, count]) => (
                  <div key={error} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{error}</span>
                    <Badge variant="outline" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {field.mostCommonValues.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Most Common Values</h4>
                <div className="space-y-1">
                  {field.mostCommonValues.slice(0, 3).map((item) => (
                    <div key={item.value} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground truncate">{item.value}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Advanced Form Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Deep insights into form performance and user behavior
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => setShowExportDialog(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Share2 className="h-4 w-4 mr-2" />
              Share Report
            </Button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {renderMetricCard('Total Views', analytics.overview.totalViews, 12.5, Eye)}
          {renderMetricCard('Conversions', analytics.overview.submissions, 8.3, Target)}
          {renderMetricCard('Conversion Rate', analytics.overview.conversionRate, 5.7, Percent, '%')}
          {renderMetricCard('Avg. Time', analytics.overview.averageTime, -3.2, Clock, 's')}
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="fields">Field Analysis</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
            <TabsTrigger value="devices">Devices & Tech</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance Metrics</CardTitle>
                  <CardDescription>Technical performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Load Time</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{analytics.performance.loadTime}s</span>
                        <div className={`h-2 w-2 rounded-full ${analytics.performance.loadTime < 2 ? 'bg-green-500' : 'bg-orange-500'}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">First Interaction</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{analytics.performance.firstInteraction}s</span>
                        <div className={`h-2 w-2 rounded-full ${analytics.performance.firstInteraction < 5 ? 'bg-green-500' : 'bg-orange-500'}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{analytics.performance.errorRate}%</span>
                        <div className={`h-2 w-2 rounded-full ${analytics.performance.errorRate < 10 ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Abandonment Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{analytics.performance.abandonmentRate}%</span>
                        <div className={`h-2 w-2 rounded-full ${analytics.performance.abandonmentRate < 25 ? 'bg-green-500' : 'bg-orange-500'}`} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Insights</CardTitle>
                  <CardDescription>AI-powered recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Alert>
                      <TrendingUp className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Mobile conversion rate is 32% lower</strong> than desktop. Consider optimizing for mobile users.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Peak conversion time is 2-4 PM EST.</strong> Schedule campaigns during these hours for better results.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Company Name field has 14.6% abandonment.</strong> Consider making it optional or adding help text.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conversion Trends</CardTitle>
                <CardDescription>Daily conversion rate over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p>Interactive chart would be displayed here</p>
                    <p className="text-sm">Showing conversion trends over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conversion Funnel Analysis</CardTitle>
                <CardDescription>
                  Track user journey from first visit to form submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.conversion.conversionFunnel.map((step, index) => 
                    renderFunnelStep(step, index, analytics.conversion.conversionFunnel.length)
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conversion by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.conversion.conversionBySource).map(([source, rate]) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="text-sm">{source}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(rate / 35) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {rate.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conversion by Device</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.conversion.conversionByDevice).map(([device, rate]) => (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {device === 'Desktop' && <Monitor className="h-4 w-4" />}
                          {device === 'Mobile' && <Smartphone className="h-4 w-4" />}
                          {device === 'Tablet' && <Tablet className="h-4 w-4" />}
                          <span className="text-sm">{device}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(rate / 25) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {rate.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fields" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analytics.fields.map(renderFieldAnalytics)}
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.traffic.sources).map(([source, count]) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="text-sm">{source}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(count / 5000) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-16 text-right">
                            {count.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Referrers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.traffic.referrers).map(([referrer, count]) => (
                      <div key={referrer} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{referrer}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.traffic.campaigns).map(([campaign, count]) => (
                      <div key={campaign} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{campaign}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.traffic.keywords).map(([keyword, count]) => (
                      <div key={keyword} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">"{keyword}"</span>
                        </div>
                        <span className="text-sm font-medium">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Device Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.devices.devices).map(([device, percentage]) => (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {device === 'Mobile' && <Smartphone className="h-4 w-4" />}
                          {device === 'Desktop' && <Monitor className="h-4 w-4" />}
                          {device === 'Tablet' && <Tablet className="h-4 w-4" />}
                          <span className="text-sm">{device}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Browsers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.devices.browsers).map(([browser, percentage]) => (
                      <div key={browser} className="flex items-center justify-between">
                        <span className="text-sm">{browser}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(percentage / 60) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Operating Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.devices.operatingSystems).map(([os, percentage]) => (
                      <div key={os} className="flex items-center justify-between">
                        <span className="text-sm">{os}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(percentage / 40) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Screen Resolutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.devices.screenResolutions).map(([resolution, percentage]) => (
                      <div key={resolution} className="flex items-center justify-between">
                        <span className="text-sm font-mono">{resolution}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full" 
                              style={{ width: `${(percentage / 20) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Scroll Depth</CardTitle>
                  <CardDescription>How far users scroll through the form</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.behavior.scrollDepth).map(([depth, percentage]) => (
                      <div key={depth} className="flex items-center justify-between">
                        <span className="text-sm">Scrolled to {depth}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Time on Page</CardTitle>
                  <CardDescription>How long users spend on the form</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(analytics.behavior.timeOnPage).map(([time, percentage]) => (
                      <div key={time} className="flex items-center justify-between">
                        <span className="text-sm">{time}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-teal-600 h-2 rounded-full" 
                              style={{ width: `${(percentage / 35) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Click Heatmap</CardTitle>
                  <CardDescription>Visual representation of user interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MousePointer className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p>Interactive heatmap would be displayed here</p>
                      <p className="text-sm">Showing click patterns and hotspots</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Export Dialog */}
      {showExportDialog && (
        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Analytics Report</DialogTitle>
              <DialogDescription>
                Choose the format and data to include in your export
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Export Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                    <SelectItem value="json">JSON Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Include Data</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="overview" defaultChecked />
                    <Label htmlFor="overview">Overview Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="funnel" defaultChecked />
                    <Label htmlFor="funnel">Conversion Funnel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="fields" defaultChecked />
                    <Label htmlFor="fields">Field Analytics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="traffic" />
                    <Label htmlFor="traffic">Traffic Sources</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowExportDialog(false)}>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdvancedFormAnalytics;
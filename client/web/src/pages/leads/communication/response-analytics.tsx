'use client';

import { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  MessageSquare,
  Mail,
  Phone,
  Video,
  Users,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointerClick,
  Reply,
  Forward,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Timer,
  Zap,
  Activity,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ResponseMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'duration' | 'currency';
  description: string;
}

interface ChannelPerformance {
  channel: 'email' | 'phone' | 'sms' | 'chat' | 'video' | 'social';
  name: string;
  totalSent: number;
  responded: number;
  responseRate: number;
  avgResponseTime: number; // in minutes
  conversions: number;
  conversionRate: number;
  satisfaction: number;
  cost: number;
  roi: number;
}

interface ResponsePattern {
  timeSlot: string;
  hour: number;
  emailResponses: number;
  callResponses: number;
  chatResponses: number;
  totalResponses: number;
  responseRate: number;
}

interface SentimentAnalysis {
  period: string;
  positive: number;
  neutral: number;
  negative: number;
  totalResponses: number;
  avgSentiment: number;
  topKeywords: string[];
  urgentCount: number;
  escalationRate: number;
}

const responseMetrics: ResponseMetric[] = [
  {
    id: 'overall-response-rate',
    title: 'Overall Response Rate',
    value: 68.5,
    change: 4.2,
    trend: 'up',
    icon: Reply,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'percentage',
    description: 'Percentage of outreach that receives a response'
  },
  {
    id: 'avg-response-time',
    title: 'Avg Response Time',
    value: 147,
    change: -12.3,
    trend: 'down',
    icon: Clock,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'duration',
    description: 'Average time to receive customer response'
  },
  {
    id: 'engagement-score',
    title: 'Engagement Score',
    value: 8.2,
    change: 0.7,
    trend: 'up',
    icon: Activity,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'number',
    description: 'Overall customer engagement rating (1-10)'
  },
  {
    id: 'conversion-rate',
    title: 'Response to Conversion',
    value: 23.4,
    change: 1.8,
    trend: 'up',
    icon: Target,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'percentage',
    description: 'Percentage of responses that convert to opportunities'
  },
  {
    id: 'sentiment-score',
    title: 'Sentiment Score',
    value: 7.8,
    change: 0.3,
    trend: 'up',
    icon: CheckCircle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'number',
    description: 'Average sentiment rating of responses (1-10)'
  },
  {
    id: 'escalation-rate',
    title: 'Escalation Rate',
    value: 8.2,
    change: -1.5,
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'percentage',
    description: 'Percentage of responses requiring escalation'
  }
];

const channelPerformance: ChannelPerformance[] = [
  {
    channel: 'email',
    name: 'Email',
    totalSent: 1247,
    responded: 789,
    responseRate: 63.3,
    avgResponseTime: 285,
    conversions: 156,
    conversionRate: 19.8,
    satisfaction: 8.2,
    cost: 450,
    roi: 340
  },
  {
    channel: 'phone',
    name: 'Phone Calls',
    totalSent: 456,
    responded: 342,
    responseRate: 75.0,
    avgResponseTime: 0, // immediate
    conversions: 98,
    conversionRate: 28.7,
    satisfaction: 8.7,
    cost: 890,
    roi: 280
  },
  {
    channel: 'sms',
    name: 'SMS',
    totalSent: 892,
    responded: 623,
    responseRate: 69.8,
    avgResponseTime: 45,
    conversions: 87,
    conversionRate: 14.0,
    satisfaction: 7.9,
    cost: 180,
    roi: 450
  },
  {
    channel: 'chat',
    name: 'Live Chat',
    totalSent: 234,
    responded: 198,
    responseRate: 84.6,
    avgResponseTime: 12,
    conversions: 45,
    conversionRate: 22.7,
    satisfaction: 9.1,
    cost: 120,
    roi: 380
  },
  {
    channel: 'video',
    name: 'Video Meetings',
    totalSent: 89,
    responded: 76,
    responseRate: 85.4,
    avgResponseTime: 0,
    conversions: 32,
    conversionRate: 42.1,
    satisfaction: 9.3,
    cost: 250,
    roi: 520
  },
  {
    channel: 'social',
    name: 'Social Media',
    totalSent: 345,
    responded: 198,
    responseRate: 57.4,
    avgResponseTime: 180,
    conversions: 23,
    conversionRate: 11.6,
    satisfaction: 7.5,
    cost: 300,
    roi: 180
  }
];

const responsePatterns: ResponsePattern[] = [
  { timeSlot: '9 AM', hour: 9, emailResponses: 45, callResponses: 23, chatResponses: 12, totalResponses: 80, responseRate: 72 },
  { timeSlot: '10 AM', hour: 10, emailResponses: 52, callResponses: 28, chatResponses: 18, totalResponses: 98, responseRate: 78 },
  { timeSlot: '11 AM', hour: 11, emailResponses: 48, callResponses: 31, chatResponses: 15, totalResponses: 94, responseRate: 75 },
  { timeSlot: '12 PM', hour: 12, emailResponses: 38, callResponses: 18, chatResponses: 8, totalResponses: 64, responseRate: 58 },
  { timeSlot: '1 PM', hour: 13, emailResponses: 35, callResponses: 15, chatResponses: 6, totalResponses: 56, responseRate: 52 },
  { timeSlot: '2 PM', hour: 14, emailResponses: 41, callResponses: 22, chatResponses: 14, totalResponses: 77, responseRate: 68 },
  { timeSlot: '3 PM', hour: 15, emailResponses: 44, callResponses: 26, chatResponses: 16, totalResponses: 86, responseRate: 71 },
  { timeSlot: '4 PM', hour: 16, emailResponses: 39, callResponses: 21, chatResponses: 11, totalResponses: 71, responseRate: 65 },
  { timeSlot: '5 PM', hour: 17, emailResponses: 28, callResponses: 12, chatResponses: 5, totalResponses: 45, responseRate: 48 }
];

const sentimentData: SentimentAnalysis[] = [
  {
    period: 'This Week',
    positive: 68,
    neutral: 24,
    negative: 8,
    totalResponses: 456,
    avgSentiment: 7.8,
    topKeywords: ['interested', 'excellent', 'professional', 'satisfied', 'recommend'],
    urgentCount: 12,
    escalationRate: 2.6
  },
  {
    period: 'Last Week',
    positive: 64,
    neutral: 28,
    negative: 8,
    totalResponses: 423,
    avgSentiment: 7.5,
    topKeywords: ['good', 'helpful', 'quick', 'responsive', 'quality'],
    urgentCount: 15,
    escalationRate: 3.5
  }
];

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function formatValue(value: number, format: 'number' | 'percentage' | 'duration' | 'currency') {
  switch (format) {
    case 'percentage':
      return `${value}%`;
    case 'duration':
      return formatDuration(value);
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'number':
    default:
      if (value < 10) {
        return value.toFixed(1);
      }
      return value.toLocaleString();
  }
}

function getChannelIcon(channel: ChannelPerformance['channel']) {
  switch (channel) {
    case 'email': return <Mail className="h-4 w-4" />;
    case 'phone': return <Phone className="h-4 w-4" />;
    case 'sms': return <MessageSquare className="h-4 w-4" />;
    case 'chat': return <MessageSquare className="h-4 w-4" />;
    case 'video': return <Video className="h-4 w-4" />;
    case 'social': return <Users className="h-4 w-4" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
}

function getChannelColor(channel: ChannelPerformance['channel']) {
  switch (channel) {
    case 'email': return 'text-blue-600 bg-blue-100';
    case 'phone': return 'text-green-600 bg-green-100';
    case 'sms': return 'text-purple-600 bg-purple-100';
    case 'chat': return 'text-orange-600 bg-orange-100';
    case 'video': return 'text-red-600 bg-red-100';
    case 'social': return 'text-indigo-600 bg-indigo-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}

export default function ResponseAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedChannel, setSelectedChannel] = useState('all');

  const filteredChannels = useMemo(() => {
    if (selectedChannel === 'all') return channelPerformance;
    return channelPerformance.filter(channel => channel.channel === selectedChannel);
  }, [selectedChannel]);

  const summaryStats = useMemo(() => {
    const totalSent = channelPerformance.reduce((sum, ch) => sum + ch.totalSent, 0);
    const totalResponded = channelPerformance.reduce((sum, ch) => sum + ch.responded, 0);
    const totalConversions = channelPerformance.reduce((sum, ch) => sum + ch.conversions, 0);
    const weightedAvgResponseTime = channelPerformance.reduce((sum, ch) => 
      sum + (ch.avgResponseTime * ch.responded), 0) / totalResponded;

    return {
      totalSent,
      totalResponded,
      totalConversions,
      overallResponseRate: (totalResponded / totalSent) * 100,
      overallConversionRate: (totalConversions / totalResponded) * 100,
      avgResponseTime: Math.round(weightedAvgResponseTime)
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Response Analytics</h1>
          <p className="text-gray-600">Analyze customer response patterns and engagement metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {responseMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = (metric.trend === 'up' && !metric.id.includes('escalation')) || 
                            (metric.trend === 'down' && metric.id.includes('escalation'));
          
          return (
            <Card key={metric.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-semibold",
                    isPositive ? "text-emerald-600" : "text-red-600"
                  )}>
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-xs text-gray-500">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatValue(metric.value, metric.format)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
          <TabsTrigger value="patterns">Response Patterns</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Rate Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Response Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Messages Sent</span>
                    <span className="font-semibold">{summaryStats.totalSent.toLocaleString()}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Responses Received</span>
                    <span className="font-semibold">
                      {summaryStats.totalResponded.toLocaleString()} ({summaryStats.overallResponseRate.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={summaryStats.overallResponseRate} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Converted to Opportunities</span>
                    <span className="font-semibold">
                      {summaryStats.totalConversions.toLocaleString()} ({summaryStats.overallConversionRate.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={summaryStats.overallConversionRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Channels */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelPerformance
                    .sort((a, b) => b.conversionRate - a.conversionRate)
                    .slice(0, 4)
                    .map((channel, index) => (
                      <div key={channel.channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={cn("p-2 rounded-lg", getChannelColor(channel.channel))}>
                            {getChannelIcon(channel.channel)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{channel.name}</p>
                            <p className="text-xs text-gray-600">
                              {channel.responded}/{channel.totalSent} responses
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{channel.conversionRate.toFixed(1)}%</p>
                          <p className="text-xs text-gray-600">conversion</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { range: 'Immediate (0-5 min)', percentage: 35, count: 234 },
                  { range: 'Quick (5-30 min)', percentage: 28, count: 187 },
                  { range: 'Standard (30min-2hr)', percentage: 22, count: 147 },
                  { range: 'Delayed (2hr-24hr)', percentage: 12, count: 80 },
                  { range: 'Late (24hr+)', percentage: 3, count: 20 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.range}</span>
                      <span>{item.count} responses ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Engagement Quality */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">8.2</p>
                    <p className="text-xs text-green-700">Satisfaction Score</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">7.8</p>
                    <p className="text-xs text-blue-700">Engagement Score</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">23.4%</p>
                    <p className="text-xs text-purple-700">Conversion Rate</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Timer className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">{formatDuration(summaryStats.avgResponseTime)}</p>
                    <p className="text-xs text-yellow-700">Avg Response Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Channel Performance Tab */}
        <TabsContent value="channels" className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="chat">Live Chat</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredChannels.map((channel) => (
              <Card key={channel.channel} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={cn("p-3 rounded-lg", getChannelColor(channel.channel))}>
                        {getChannelIcon(channel.channel)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{channel.name}</h3>
                        <p className="text-sm text-gray-600">
                          {channel.totalSent.toLocaleString()} messages sent
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-600">{channel.responseRate.toFixed(1)}%</p>
                        <p className="text-xs text-gray-500">Response Rate</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">
                          {channel.avgResponseTime > 0 ? formatDuration(channel.avgResponseTime) : 'Instant'}
                        </p>
                        <p className="text-xs text-gray-500">Avg Response Time</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">{channel.conversionRate.toFixed(1)}%</p>
                        <p className="text-xs text-gray-500">Conversion Rate</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-600">{channel.satisfaction.toFixed(1)}/10</p>
                        <p className="text-xs text-gray-500">Satisfaction</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-600">${channel.cost.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Cost</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-600">{channel.roi}%</p>
                        <p className="text-xs text-gray-500">ROI</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Response Patterns Tab */}
        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Response Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Hourly response pattern chart would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Peak: 10-11 AM (78% response rate)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Channel Response Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Channel distribution chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Best Response Times by Hour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {responsePatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-semibold text-sm">{pattern.timeSlot}</p>
                          <p className="text-xs text-gray-600">{pattern.responseRate}% rate</p>
                        </div>
                        <div className="flex space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4 text-blue-600" />
                            <span>{pattern.emailResponses}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4 text-green-600" />
                            <span>{pattern.callResponses}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4 text-purple-600" />
                            <span>{pattern.chatResponses}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{pattern.totalResponses}</p>
                        <p className="text-xs text-gray-600">total responses</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sentiment Analysis Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sentimentData.map((data, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{data.period} Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{data.positive}%</p>
                      <p className="text-xs text-green-700">Positive</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{data.neutral}%</p>
                      <p className="text-xs text-yellow-700">Neutral</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{data.negative}%</p>
                      <p className="text-xs text-red-700">Negative</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Sentiment Score</span>
                      <span className="font-semibold">{data.avgSentiment}/10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Responses</span>
                      <span className="font-semibold">{data.totalResponses.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Urgent Issues</span>
                      <span className="font-semibold text-red-600">{data.urgentCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Escalation Rate</span>
                      <span className="font-semibold">{data.escalationRate}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Top Keywords:</p>
                    <div className="flex flex-wrap gap-1">
                      {data.topKeywords.map((keyword, keyIndex) => (
                        <Badge key={keyIndex} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
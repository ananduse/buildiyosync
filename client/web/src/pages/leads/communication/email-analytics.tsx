'use client';

import { useState, useMemo } from 'react';
import {
  Mail,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  UserX,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Target,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EmailMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'currency';
}

interface CampaignPerformance {
  campaignId: string;
  name: string;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  conversions: number;
  revenue: number;
  sentDate: string;
}

const emailMetrics: EmailMetric[] = [
  {
    id: 'sent',
    title: 'Emails Sent',
    value: 15420,
    change: 12.5,
    trend: 'up',
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'delivered',
    title: 'Delivery Rate',
    value: 97.8,
    change: 1.2,
    trend: 'up',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'percentage'
  },
  {
    id: 'opened',
    title: 'Open Rate',
    value: 24.7,
    change: -2.3,
    trend: 'down',
    icon: Eye,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'percentage'
  },
  {
    id: 'clicked',
    title: 'Click Rate',
    value: 4.2,
    change: 0.8,
    trend: 'up',
    icon: MousePointerClick,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage'
  },
  {
    id: 'bounced',
    title: 'Bounce Rate',
    value: 2.2,
    change: -0.5,
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'percentage'
  },
  {
    id: 'unsubscribed',
    title: 'Unsubscribe Rate',
    value: 0.8,
    change: 0.1,
    trend: 'up',
    icon: UserX,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    format: 'percentage'
  }
];

const campaignPerformance: CampaignPerformance[] = [
  {
    campaignId: 'EC001',
    name: 'Q1 Lead Nurturing Campaign',
    sent: 1247,
    delivered: 1219,
    opened: 305,
    clicked: 47,
    bounced: 15,
    unsubscribed: 10,
    conversions: 12,
    revenue: 180000,
    sentDate: '2024-01-20'
  },
  {
    campaignId: 'EC003',
    name: 'Spring Promotion - Limited Time',
    sent: 2156,
    delivered: 2108,
    opened: 548,
    clicked: 89,
    bounced: 28,
    unsubscribed: 18,
    conversions: 23,
    revenue: 285000,
    sentDate: '2024-01-25'
  },
  {
    campaignId: 'EC005',
    name: 'Weekly Newsletter #12',
    sent: 3450,
    delivered: 3398,
    opened: 621,
    clicked: 78,
    bounced: 42,
    unsubscribed: 12,
    conversions: 8,
    revenue: 45000,
    sentDate: '2024-01-28'
  }
];

const formatValue = (value: number, format: 'number' | 'percentage' | 'currency') => {
  switch (format) {
    case 'percentage':
      return `${value}%`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'number':
    default:
      return value.toLocaleString();
  }
};

export default function EmailAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const aggregatedStats = useMemo(() => {
    const totalSent = campaignPerformance.reduce((sum, c) => sum + c.sent, 0);
    const totalDelivered = campaignPerformance.reduce((sum, c) => sum + c.delivered, 0);
    const totalOpened = campaignPerformance.reduce((sum, c) => sum + c.opened, 0);
    const totalClicked = campaignPerformance.reduce((sum, c) => sum + c.clicked, 0);
    const totalRevenue = campaignPerformance.reduce((sum, c) => sum + c.revenue, 0);
    const totalConversions = campaignPerformance.reduce((sum, c) => sum + c.conversions, 0);

    return {
      deliveryRate: Math.round((totalDelivered / totalSent) * 100 * 10) / 10,
      openRate: Math.round((totalOpened / totalDelivered) * 100 * 10) / 10,
      clickRate: Math.round((totalClicked / totalOpened) * 100 * 10) / 10,
      conversionRate: Math.round((totalConversions / totalClicked) * 100 * 10) / 10,
      revenue: totalRevenue,
      conversions: totalConversions
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Email Analytics</h1>
          <p className="text-gray-600">Track and analyze your email campaign performance</p>
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
        {emailMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up' && metric.change > 0;
          
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
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="segments">Audience Segments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Email Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emails Sent</span>
                    <span className="font-semibold">15,420</span>
                  </div>
                  <Progress value={100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Delivered</span>
                    <span className="font-semibold">15,083 (97.8%)</span>
                  </div>
                  <Progress value={97.8} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Opened</span>
                    <span className="font-semibold">3,725 (24.7%)</span>
                  </div>
                  <Progress value={24.7} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Clicked</span>
                    <span className="font-semibold">635 (4.2%)</span>
                  </div>
                  <Progress value={17.0} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Converted</span>
                    <span className="font-semibold">43 (6.8%)</span>
                  </div>
                  <Progress value={6.8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Subject Line Performance</p>
                      <p className="text-xs text-gray-600 mt-1">Questions in subject lines perform 23% better</p>
                    </div>
                    <Badge variant="secondary">+23%</Badge>
                  </div>
                  
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Call-to-Action Buttons</p>
                      <p className="text-xs text-gray-600 mt-1">"Get Started" vs "Learn More" - 31% higher CTR</p>
                    </div>
                    <Badge variant="secondary">+31%</Badge>
                  </div>
                  
                  <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Send Time Analysis</p>
                      <p className="text-xs text-gray-600 mt-1">Tuesday 10 AM shows highest open rates</p>
                    </div>
                    <Badge variant="secondary">Best</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Campaign Performance Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Comparison</CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metrics</SelectItem>
                    <SelectItem value="open-rate">Open Rate</SelectItem>
                    <SelectItem value="click-rate">Click Rate</SelectItem>
                    <SelectItem value="conversion-rate">Conversion Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignPerformance.map((campaign) => {
                  const openRate = Math.round((campaign.opened / campaign.delivered) * 100 * 10) / 10;
                  const clickRate = Math.round((campaign.clicked / campaign.opened) * 100 * 10) / 10;
                  const conversionRate = Math.round((campaign.conversions / campaign.clicked) * 100 * 10) / 10;
                  
                  return (
                    <div key={campaign.campaignId} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <p className="text-sm text-gray-600">Sent on {new Date(campaign.sentDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold">{campaign.sent.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Sent</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-blue-600">{openRate}%</p>
                            <p className="text-xs text-gray-500">Open Rate</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-purple-600">{clickRate}%</p>
                            <p className="text-xs text-gray-500">Click Rate</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-green-600">{campaign.conversions}</p>
                            <p className="text-xs text-gray-500">Conversions</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-emerald-600">${campaign.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Revenue</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Email performance trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Email engagement patterns chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { segment: 'New Leads', size: 3420, openRate: 28.5, clickRate: 5.2, conversions: 23 },
                  { segment: 'Active Prospects', size: 1890, openRate: 22.1, clickRate: 3.8, conversions: 18 },
                  { segment: 'Existing Customers', size: 2150, openRate: 31.2, clickRate: 6.1, conversions: 35 },
                  { segment: 'Inactive Contacts', size: 1205, openRate: 15.3, clickRate: 2.1, conversions: 4 }
                ].map((segment, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold">{segment.segment}</h4>
                        <p className="text-sm text-gray-600">{segment.size.toLocaleString()} contacts</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-blue-600">{segment.openRate}%</p>
                          <p className="text-xs text-gray-500">Open Rate</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-purple-600">{segment.clickRate}%</p>
                          <p className="text-xs text-gray-500">Click Rate</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-600">{segment.conversions}</p>
                          <p className="text-xs text-gray-500">Conversions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
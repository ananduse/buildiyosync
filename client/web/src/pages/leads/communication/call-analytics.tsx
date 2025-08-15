'use client';

import { useState, useMemo } from 'react';
import {
  Phone,
  TrendingUp,
  TrendingDown,
  Clock,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Users,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare,
  Timer,
  Headphones,
  Star,
  Volume2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface CallMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'duration' | 'currency';
}

interface CallRecord {
  id: string;
  contactName: string;
  contactPhone: string;
  agentName: string;
  agentAvatar?: string;
  callType: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'busy' | 'voicemail' | 'failed';
  duration: number; // in seconds
  startTime: string;
  endTime?: string;
  leadId?: string;
  tags: string[];
  notes?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  converted: boolean;
  followUpRequired: boolean;
  recordingUrl?: string;
  transcriptUrl?: string;
}

interface AgentPerformance {
  agentId: string;
  agentName: string;
  agentAvatar?: string;
  totalCalls: number;
  totalDuration: number;
  averageDuration: number;
  successRate: number;
  conversionRate: number;
  customerSatisfaction: number;
  missedCalls: number;
  followUpsCompleted: number;
  followUpsPending: number;
}

const callMetrics: CallMetric[] = [
  {
    id: 'total-calls',
    title: 'Total Calls',
    value: 1247,
    change: 8.2,
    trend: 'up',
    icon: Phone,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'answer-rate',
    title: 'Answer Rate',
    value: 78.5,
    change: 3.1,
    trend: 'up',
    icon: PhoneIncoming,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'percentage'
  },
  {
    id: 'avg-duration',
    title: 'Avg Call Duration',
    value: 312,
    change: -15.2,
    trend: 'down',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'duration'
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 12.8,
    change: 2.3,
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage'
  },
  {
    id: 'customer-satisfaction',
    title: 'Customer Satisfaction',
    value: 4.2,
    change: 0.3,
    trend: 'up',
    icon: Star,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'number'
  },
  {
    id: 'missed-calls',
    title: 'Missed Call Rate',
    value: 21.5,
    change: -2.8,
    trend: 'down',
    icon: PhoneMissed,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'percentage'
  }
];

const mockCallRecords: CallRecord[] = [
  {
    id: 'C001',
    contactName: 'Sarah Martinez',
    contactPhone: '+1 (555) 123-4567',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    callType: 'inbound',
    status: 'completed',
    duration: 420,
    startTime: '2024-01-30T14:30:00',
    endTime: '2024-01-30T14:37:00',
    leadId: 'LEAD001',
    tags: ['commercial', 'high-value'],
    notes: 'Interested in commercial building services. Scheduled follow-up meeting.',
    sentiment: 'positive',
    quality: 'excellent',
    converted: true,
    followUpRequired: true,
    recordingUrl: '/recordings/c001.mp3',
    transcriptUrl: '/transcripts/c001.txt'
  },
  {
    id: 'C002',
    contactName: 'John Davis',
    contactPhone: '+1 (555) 987-6543',
    agentName: 'Lisa Wang',
    agentAvatar: '/avatars/lisa.jpg',
    callType: 'outbound',
    status: 'completed',
    duration: 180,
    startTime: '2024-01-30T15:15:00',
    endTime: '2024-01-30T15:18:00',
    leadId: 'LEAD002',
    tags: ['follow-up', 'residential'],
    notes: 'Follow-up call. Customer needs more time to decide.',
    sentiment: 'neutral',
    quality: 'good',
    converted: false,
    followUpRequired: true
  },
  {
    id: 'C003',
    contactName: 'Emily Chen',
    contactPhone: '+1 (555) 456-7890',
    agentName: 'James Wilson',
    agentAvatar: '/avatars/james.jpg',
    callType: 'inbound',
    status: 'missed',
    duration: 0,
    startTime: '2024-01-30T16:45:00',
    tags: ['prospect', 'urgent'],
    sentiment: 'neutral',
    quality: 'poor',
    converted: false,
    followUpRequired: true
  }
];

const mockAgentPerformance: AgentPerformance[] = [
  {
    agentId: 'A001',
    agentName: 'Mike Chen',
    agentAvatar: '/avatars/mike.jpg',
    totalCalls: 156,
    totalDuration: 28800, // 8 hours
    averageDuration: 185,
    successRate: 82.1,
    conversionRate: 15.4,
    customerSatisfaction: 4.5,
    missedCalls: 12,
    followUpsCompleted: 45,
    followUpsPending: 8
  },
  {
    agentId: 'A002',
    agentName: 'Lisa Wang',
    agentAvatar: '/avatars/lisa.jpg',
    totalCalls: 134,
    totalDuration: 24300, // 6.75 hours
    averageDuration: 181,
    successRate: 79.9,
    conversionRate: 13.2,
    customerSatisfaction: 4.3,
    missedCalls: 18,
    followUpsCompleted: 38,
    followUpsPending: 12
  },
  {
    agentId: 'A003',
    agentName: 'James Wilson',
    agentAvatar: '/avatars/james.jpg',
    totalCalls: 98,
    totalDuration: 16200, // 4.5 hours
    averageDuration: 165,
    successRate: 75.5,
    conversionRate: 11.8,
    customerSatisfaction: 4.1,
    missedCalls: 24,
    followUpsCompleted: 28,
    followUpsPending: 15
  }
];

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
      return value.toLocaleString();
  }
}

function getStatusColor(status: CallRecord['status']) {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'missed': return 'bg-red-100 text-red-800';
    case 'busy': return 'bg-yellow-100 text-yellow-800';
    case 'voicemail': return 'bg-blue-100 text-blue-800';
    case 'failed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getSentimentColor(sentiment: CallRecord['sentiment']) {
  switch (sentiment) {
    case 'positive': return 'text-green-600';
    case 'neutral': return 'text-yellow-600';
    case 'negative': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

function getQualityColor(quality: CallRecord['quality']) {
  switch (quality) {
    case 'excellent': return 'text-green-600';
    case 'good': return 'text-blue-600';
    case 'fair': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

export default function CallAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedAgent, setSelectedAgent] = useState('all');

  const filteredCalls = useMemo(() => {
    if (selectedAgent === 'all') return mockCallRecords;
    return mockCallRecords.filter(call => call.agentName === selectedAgent);
  }, [selectedAgent]);

  const callSummaryStats = useMemo(() => {
    const totalCalls = filteredCalls.length;
    const completedCalls = filteredCalls.filter(call => call.status === 'completed').length;
    const totalDuration = filteredCalls.reduce((sum, call) => sum + call.duration, 0);
    const avgDuration = totalDuration / completedCalls || 0;
    const conversionRate = (filteredCalls.filter(call => call.converted).length / totalCalls) * 100;

    return {
      totalCalls,
      completedCalls,
      totalDuration,
      avgDuration: Math.round(avgDuration),
      conversionRate: Math.round(conversionRate * 10) / 10
    };
  }, [filteredCalls]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Call Analytics</h1>
          <p className="text-gray-600">Track and analyze call performance metrics</p>
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
        {callMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = (metric.trend === 'up' && !metric.id.includes('missed')) || 
                            (metric.trend === 'down' && metric.id.includes('missed'));
          
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
          <TabsTrigger value="call-logs">Call Logs</TabsTrigger>
          <TabsTrigger value="agent-performance">Agent Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends & Patterns</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Call Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Call Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PhoneIncoming className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Inbound Calls</span>
                    </div>
                    <span className="font-semibold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Outbound Calls</span>
                    </div>
                    <span className="font-semibold">32%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Call Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle>Call Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">78.5%</p>
                    <p className="text-xs text-green-700">Completed</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">21.5%</p>
                    <p className="text-xs text-red-700">Missed/Failed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Call Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { quality: 'Excellent', percentage: 45, color: 'bg-green-600' },
                  { quality: 'Good', percentage: 32, color: 'bg-blue-600' },
                  { quality: 'Fair', percentage: 18, color: 'bg-yellow-600' },
                  { quality: 'Poor', percentage: 5, color: 'bg-red-600' }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.quality}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn("h-2 rounded-full", item.color)} 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Peak Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Peak Call Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Peak hours chart would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Peak: 10 AM - 12 PM (35% of daily calls)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Call Logs Tab */}
        <TabsContent value="call-logs" className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Agents" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                <SelectItem value="Lisa Wang">Lisa Wang</SelectItem>
                <SelectItem value="James Wilson">James Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredCalls.map((call, index) => (
                  <div key={call.id} className={cn(
                    "p-4 border-b hover:bg-gray-50 transition-colors",
                    index === filteredCalls.length - 1 && "border-b-0"
                  )}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              {call.callType === 'inbound' ? (
                                <PhoneIncoming className="h-4 w-4 text-green-600" />
                              ) : (
                                <PhoneOutgoing className="h-4 w-4 text-blue-600" />
                              )}
                              <h4 className="font-semibold">{call.contactName}</h4>
                              <Badge className={cn("text-xs", getStatusColor(call.status))}>
                                {call.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{call.contactPhone}</p>
                          </div>
                          
                          <div className="text-right text-sm text-gray-500">
                            <p>{new Date(call.startTime).toLocaleString()}</p>
                            {call.duration > 0 && (
                              <p>Duration: {formatDuration(call.duration)}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={call.agentAvatar} />
                              <AvatarFallback className="text-xs">
                                {call.agentName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600">{call.agentName}</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <span className="text-gray-500">Quality:</span>
                            <span className={cn("font-medium", getQualityColor(call.quality))}>
                              {call.quality}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <span className="text-gray-500">Sentiment:</span>
                            <span className={cn("font-medium", getSentimentColor(call.sentiment))}>
                              {call.sentiment}
                            </span>
                          </div>

                          {call.converted && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Converted
                            </Badge>
                          )}

                          {call.followUpRequired && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              Follow-up Required
                            </Badge>
                          )}
                        </div>

                        {call.notes && (
                          <p className="text-sm text-gray-600 italic">{call.notes}</p>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {call.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Performance Tab */}
        <TabsContent value="agent-performance" className="space-y-6">
          <div className="grid gap-4">
            {mockAgentPerformance.map((agent) => (
              <Card key={agent.agentId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={agent.agentAvatar} />
                        <AvatarFallback>
                          {agent.agentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{agent.agentName}</h3>
                        <p className="text-sm text-gray-600">{agent.totalCalls} total calls</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-600">{agent.successRate}%</p>
                        <p className="text-xs text-gray-500">Success Rate</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">{agent.conversionRate}%</p>
                        <p className="text-xs text-gray-500">Conversion</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">{formatDuration(agent.averageDuration)}</p>
                        <p className="text-xs text-gray-500">Avg Duration</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-600">{agent.customerSatisfaction}/5</p>
                        <p className="text-xs text-gray-500">Satisfaction</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-600">{agent.followUpsCompleted}</p>
                        <p className="text-xs text-gray-500">Follow-ups Done</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-600">{agent.followUpsPending}</p>
                        <p className="text-xs text-gray-500">Pending</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Volume Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Call volume trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
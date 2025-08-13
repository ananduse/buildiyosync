import { useState } from 'react';
import { LeadFunnelChart, sampleFunnelData } from '@/components/charts/lead-funnel-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Target } from 'lucide-react';

interface FunnelMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export function LeadFunnelContent() {
  const [dateRange, setDateRange] = useState('month');
  
  const handleStageClick = (stage: string) => {
    // Navigate to leads list with the stage filter applied
    const stageFilterUrl = `/leads/list?filter=status&value=${encodeURIComponent(stage)}`;
    window.location.href = stageFilterUrl;
    console.log(`Navigating to leads filtered by stage: ${stage}`);
  };

  const funnelMetrics: FunnelMetric[] = [
    {
      label: 'Total Conversion Rate',
      value: '13.9%',
      change: 2.5,
      trend: 'up'
    },
    {
      label: 'Average Days in Pipeline',
      value: '28 days',
      change: -3.2,
      trend: 'down'
    },
    {
      label: 'Drop-off Rate',
      value: '31.2%',
      change: -5.8,
      trend: 'down'
    },
    {
      label: 'Win Rate (Closed)',
      value: '65.4%',
      change: 8.1,
      trend: 'up'
    }
  ];

  const stageInsights = [
    {
      stage: 'New → Contacted',
      insight: 'Strong initial response rate. Consider increasing lead generation efforts.',
      color: 'text-green-600',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      stage: 'Qualified → Proposal',
      insight: 'High qualification rate indicates good lead scoring. Maintain current approach.',
      color: 'text-blue-600',
      icon: <Target className="h-4 w-4" />
    },
    {
      stage: 'Proposal → Negotiation',
      insight: 'Lower conversion here. Review proposal quality and pricing strategy.',
      color: 'text-orange-600',
      icon: <TrendingDown className="h-4 w-4" />
    },
    {
      stage: 'Negotiation → Won',
      insight: 'Strong closing rate. Sales team performing well in final stages.',
      color: 'text-green-600',
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Funnel Analysis</h1>
          <p className="text-muted-foreground">Detailed view of your lead conversion pipeline</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {funnelMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              {metric.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-xs ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(metric.change)}% from last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Funnel Chart */}
      <LeadFunnelChart 
        data={sampleFunnelData}
        onStageClick={handleStageClick}
      />

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Stage-by-Stage Insights
          </CardTitle>
          <CardDescription>
            AI-powered recommendations to improve your funnel performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {stageInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <div className={`p-2 rounded-full bg-muted ${insight.color}`}>
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {insight.stage}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
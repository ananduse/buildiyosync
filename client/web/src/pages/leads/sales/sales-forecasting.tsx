'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Award,
  Zap,
  Activity,
  Eye,
  Settings,
  Plus,
  Building,
  Calculator
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ForecastMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'currency' | 'percentage' | 'number' | 'days';
  confidence: 'high' | 'medium' | 'low';
}

interface QuarterlyForecast {
  quarter: string;
  year: number;
  pipelineValue: number;
  weightedPipeline: number;
  commitForecast: number;
  bestCaseForecast: number;
  target: number;
  actualClosed?: number;
  deals: {
    total: number;
    commit: number;
    bestCase: number;
    pipeline: number;
  };
  confidence: number;
  riskFactors: string[];
  opportunities: string[];
}

interface TeamForecast {
  teamMemberId: string;
  name: string;
  avatar?: string;
  role: string;
  quota: number;
  pipelineValue: number;
  weightedPipeline: number;
  commitForecast: number;
  achievementPercentage: number;
  dealsInPipeline: number;
  averageDealSize: number;
  winRate: number;
  salesCycle: number;
  riskLevel: 'low' | 'medium' | 'high';
  nextQuarterProjection: number;
}

interface ForecastScenario {
  id: string;
  name: string;
  description: string;
  probability: number;
  revenue: number;
  deals: number;
  assumptions: string[];
  risks: string[];
  isActive: boolean;
}

const forecastMetrics: ForecastMetric[] = [
  {
    id: 'quarterly-forecast',
    title: 'Q1 2024 Forecast',
    value: 8750000,
    target: 10000000,
    change: 5.2,
    trend: 'up',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'currency',
    confidence: 'high'
  },
  {
    id: 'commit-forecast',
    title: 'Commit Forecast',
    value: 6200000,
    target: 7500000,
    change: 8.1,
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'currency',
    confidence: 'high'
  },
  {
    id: 'best-case-forecast',
    title: 'Best Case Forecast',
    value: 11800000,
    target: 12000000,
    change: 12.5,
    trend: 'up',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'currency',
    confidence: 'medium'
  },
  {
    id: 'quota-attainment',
    title: 'Quota Attainment',
    value: 87.5,
    target: 100,
    change: 3.2,
    trend: 'up',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage',
    confidence: 'high'
  },
  {
    id: 'forecast-accuracy',
    title: 'Forecast Accuracy',
    value: 92.3,
    target: 95,
    change: -1.8,
    trend: 'down',
    icon: Activity,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'percentage',
    confidence: 'medium'
  },
  {
    id: 'deals-at-risk',
    title: 'Deals at Risk',
    value: 8,
    target: 5,
    change: -12.5,
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    format: 'number',
    confidence: 'high'
  }
];

const quarterlyForecasts: QuarterlyForecast[] = [
  {
    quarter: 'Q1',
    year: 2024,
    pipelineValue: 15800000,
    weightedPipeline: 8750000,
    commitForecast: 6200000,
    bestCaseForecast: 11800000,
    target: 10000000,
    actualClosed: 4200000,
    deals: {
      total: 78,
      commit: 28,
      bestCase: 45,
      pipeline: 78
    },
    confidence: 85,
    riskFactors: [
      'Economic uncertainty affecting commercial projects',
      '3 large deals may slip to Q2',
      'New competitor pricing pressure'
    ],
    opportunities: [
      'Strong pipeline in residential sector',
      'Government infrastructure projects opening',
      'Partnership opportunities with tech companies'
    ]
  },
  {
    quarter: 'Q2',
    year: 2024,
    pipelineValue: 12400000,
    weightedPipeline: 7800000,
    commitForecast: 5800000,
    bestCaseForecast: 10200000,
    target: 9500000,
    deals: {
      total: 65,
      commit: 24,
      bestCase: 38,
      pipeline: 65
    },
    confidence: 78,
    riskFactors: [
      'Seasonal slowdown in Q2',
      'Key personnel vacation schedules',
      'Material cost increases'
    ],
    opportunities: [
      'Summer construction season boost',
      'Q1 deal renewals and expansions',
      'New market segment penetration'
    ]
  },
  {
    quarter: 'Q3',
    year: 2024,
    pipelineValue: 14200000,
    weightedPipeline: 9100000,
    commitForecast: 6800000,
    bestCaseForecast: 12500000,
    target: 11000000,
    deals: {
      total: 82,
      commit: 32,
      bestCase: 48,
      pipeline: 82
    },
    confidence: 72,
    riskFactors: [
      'Hurricane season impact on projects',
      'Supply chain disruptions',
      'Interest rate volatility'
    ],
    opportunities: [
      'Back-to-school construction projects',
      'Q4 budget planning cycles',
      'Green building incentives'
    ]
  },
  {
    quarter: 'Q4',
    year: 2024,
    pipelineValue: 16800000,
    weightedPipeline: 10200000,
    commitForecast: 7500000,
    bestCaseForecast: 13800000,
    target: 12500000,
    deals: {
      total: 95,
      commit: 38,
      bestCase: 55,
      pipeline: 95
    },
    confidence: 68,
    riskFactors: [
      'Year-end budget freezes',
      'Holiday schedule delays',
      'Weather-related project delays'
    ],
    opportunities: [
      'Year-end budget spending rush',
      'Tax incentive deadlines',
      'Next year project planning'
    ]
  }
];

const teamForecasts: TeamForecast[] = [
  {
    teamMemberId: 'TM001',
    name: 'Mike Chen',
    avatar: '/avatars/mike.jpg',
    role: 'Senior Sales Manager',
    quota: 2500000,
    pipelineValue: 3200000,
    weightedPipeline: 1850000,
    commitForecast: 1400000,
    achievementPercentage: 74.0,
    dealsInPipeline: 12,
    averageDealSize: 266667,
    winRate: 28.5,
    salesCycle: 45,
    riskLevel: 'low',
    nextQuarterProjection: 1650000
  },
  {
    teamMemberId: 'TM002',
    name: 'Lisa Wang',
    avatar: '/avatars/lisa.jpg',
    role: 'Sales Manager',
    quota: 2000000,
    pipelineValue: 2400000,
    weightedPipeline: 1440000,
    commitForecast: 1080000,
    achievementPercentage: 72.0,
    dealsInPipeline: 15,
    averageDealSize: 160000,
    winRate: 31.2,
    salesCycle: 38,
    riskLevel: 'medium',
    nextQuarterProjection: 1320000
  },
  {
    teamMemberId: 'TM003',
    name: 'James Wilson',
    avatar: '/avatars/james.jpg',
    role: 'Sales Manager',
    quota: 1800000,
    pipelineValue: 2100000,
    weightedPipeline: 1155000,
    commitForecast: 900000,
    achievementPercentage: 64.2,
    dealsInPipeline: 18,
    averageDealSize: 116667,
    winRate: 25.8,
    salesCycle: 52,
    riskLevel: 'high',
    nextQuarterProjection: 1080000
  },
  {
    teamMemberId: 'TM004',
    name: 'Sarah Rodriguez',
    avatar: '/avatars/sarah-r.jpg',
    role: 'Account Executive',
    quota: 1500000,
    pipelineValue: 1800000,
    weightedPipeline: 1080000,
    commitForecast: 810000,
    achievementPercentage: 81.0,
    dealsInPipeline: 20,
    averageDealSize: 90000,
    winRate: 35.4,
    salesCycle: 35,
    riskLevel: 'low',
    nextQuarterProjection: 975000
  }
];

const forecastScenarios: ForecastScenario[] = [
  {
    id: 'conservative',
    name: 'Conservative Scenario',
    description: 'Based on commit forecast with 90% confidence deals',
    probability: 90,
    revenue: 6200000,
    deals: 28,
    assumptions: [
      'Only high-probability deals close',
      'No major economic disruptions',
      'Current team performance maintained'
    ],
    risks: [
      'May miss growth targets',
      'Conservative estimates may be too low',
      'Lost opportunities to competitors'
    ],
    isActive: false
  },
  {
    id: 'realistic',
    name: 'Realistic Scenario',
    description: 'Weighted pipeline forecast based on historical performance',
    probability: 75,
    revenue: 8750000,
    deals: 42,
    assumptions: [
      'Historical win rates maintained',
      'Current pipeline converts normally',
      'Seasonal patterns follow trends'
    ],
    risks: [
      'Market conditions remain stable',
      'Key deals may slip to next quarter',
      'Competition pricing pressure'
    ],
    isActive: true
  },
  {
    id: 'optimistic',
    name: 'Optimistic Scenario',
    description: 'Best case scenario with favorable market conditions',
    probability: 40,
    revenue: 11800000,
    deals: 58,
    assumptions: [
      'All opportunities convert positively',
      'New market opportunities emerge',
      'Team performance exceeds targets'
    ],
    risks: [
      'Overestimating market demand',
      'Resource constraints limit delivery',
      'Economic factors turn negative'
    ],
    isActive: false
  }
];

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

function formatValue(value: number, format: 'currency' | 'percentage' | 'number' | 'days') {
  switch (format) {
    case 'currency':
      return formatCurrency(value);
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'days':
      return `${value} days`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

function getConfidenceColor(confidence: 'high' | 'medium' | 'low') {
  switch (confidence) {
    case 'high': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getRiskLevelColor(risk: 'low' | 'medium' | 'high') {
  switch (risk) {
    case 'low': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'high': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function SalesForecasting() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1_2024');
  const [selectedScenario, setSelectedScenario] = useState('realistic');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');

  const currentQuarter = useMemo(() => {
    return quarterlyForecasts.find(q => `${q.quarter}_${q.year}` === selectedPeriod) || quarterlyForecasts[0];
  }, [selectedPeriod]);

  const activeScenario = useMemo(() => {
    return forecastScenarios.find(s => s.id === selectedScenario) || forecastScenarios[1];
  }, [selectedScenario]);

  const filteredTeamForecasts = useMemo(() => {
    if (selectedTeamMember === 'all') return teamForecasts;
    return teamForecasts.filter(tm => tm.teamMemberId === selectedTeamMember);
  }, [selectedTeamMember]);

  const teamSummary = useMemo(() => {
    const totalQuota = teamForecasts.reduce((sum, tm) => sum + tm.quota, 0);
    const totalPipeline = teamForecasts.reduce((sum, tm) => sum + tm.pipelineValue, 0);
    const totalCommit = teamForecasts.reduce((sum, tm) => sum + tm.commitForecast, 0);
    const avgAchievement = teamForecasts.reduce((sum, tm) => sum + tm.achievementPercentage, 0) / teamForecasts.length;

    return {
      totalQuota,
      totalPipeline,
      totalCommit,
      avgAchievement,
      quotaAttainment: (totalCommit / totalQuota) * 100
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sales Forecasting</h1>
          <p className="text-gray-600">Analyze and predict sales performance across quarters</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Q1_2024">Q1 2024</SelectItem>
              <SelectItem value="Q2_2024">Q2 2024</SelectItem>
              <SelectItem value="Q3_2024">Q3 2024</SelectItem>
              <SelectItem value="Q4_2024">Q4 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
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
        {forecastMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          const achievementPercentage = (metric.value / metric.target) * 100;
          
          return (
            <Card key={metric.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2 rounded-lg", metric.bgColor)}>
                    <Icon className={cn("h-5 w-5", metric.color)} />
                  </div>
                  <div className="flex flex-col items-end space-y-1">
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
                    <Badge className={cn("text-xs", getConfidenceColor(metric.confidence))}>
                      {metric.confidence} confidence
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    {formatValue(metric.value, metric.format)}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Target: {formatValue(metric.target, metric.format)}</span>
                      <span>{achievementPercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={Math.min(achievementPercentage, 100)} className="h-1 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Forecast Tabs */}
      <Tabs defaultValue="quarterly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="quarterly">Quarterly Forecast</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends & Analysis</TabsTrigger>
        </TabsList>

        {/* Quarterly Forecast Tab */}
        <TabsContent value="quarterly" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Quarter Overview */}
            <Card>
              <CardHeader>
                <CardTitle>{currentQuarter.quarter} {currentQuarter.year} Forecast Overview</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={cn("text-xs", getConfidenceColor(
                    currentQuarter.confidence > 80 ? 'high' : 
                    currentQuarter.confidence > 60 ? 'medium' : 'low'
                  ))}>
                    {currentQuarter.confidence}% confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(currentQuarter.commitForecast)}
                    </p>
                    <p className="text-xs text-blue-700">Commit Forecast</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(currentQuarter.bestCaseForecast)}
                    </p>
                    <p className="text-xs text-green-700">Best Case</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(currentQuarter.target)}
                    </p>
                    <p className="text-xs text-purple-700">Target</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {currentQuarter.deals.commit}
                    </p>
                    <p className="text-xs text-yellow-700">Commit Deals</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Commit vs Target</span>
                    <span className="font-semibold">
                      {((currentQuarter.commitForecast / currentQuarter.target) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(currentQuarter.commitForecast / currentQuarter.target) * 100} 
                    className="h-2" 
                  />
                </div>

                {currentQuarter.actualClosed && (
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Actual Closed (YTD)</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(currentQuarter.actualClosed)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Annual Forecast Trend */}
            <Card>
              <CardHeader>
                <CardTitle>2024 Forecast Trend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {quarterlyForecasts.map((quarter, index) => (
                    <div key={`${quarter.quarter}_${quarter.year}`} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{quarter.quarter} {quarter.year}</span>
                          <Badge className={cn("text-xs", 
                            quarter.quarter === currentQuarter.quarter ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                          )}>
                            {quarter.confidence}% confidence
                          </Badge>
                        </div>
                        <span className="font-semibold">{formatCurrency(quarter.commitForecast)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={cn("h-2 rounded-full", 
                            quarter.quarter === currentQuarter.quarter ? "bg-blue-600" : "bg-gray-400"
                          )}
                          style={{ width: `${(quarter.commitForecast / quarter.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuarter.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-800">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentQuarter.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Scenario Planning Tab */}
        <TabsContent value="scenarios" className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {forecastScenarios.map((scenario) => (
                  <SelectItem key={scenario.id} value={scenario.id}>
                    {scenario.name} ({scenario.probability}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Scenario
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Scenario Details */}
            <Card>
              <CardHeader>
                <CardTitle>{activeScenario.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">
                    {activeScenario.probability}% probability
                  </Badge>
                  {activeScenario.isActive && (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{activeScenario.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(activeScenario.revenue)}
                    </p>
                    <p className="text-xs text-green-700">Projected Revenue</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{activeScenario.deals}</p>
                    <p className="text-xs text-blue-700">Expected Deals</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Assumptions:</p>
                  <ul className="space-y-1">
                    {activeScenario.assumptions.map((assumption, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                        <span>{assumption}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Risk Factors:</p>
                  <ul className="space-y-1">
                    {activeScenario.risks.map((risk, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <AlertTriangle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Scenario Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecastScenarios.map((scenario) => (
                    <div 
                      key={scenario.id} 
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors",
                        scenario.id === selectedScenario ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                      )}
                      onClick={() => setSelectedScenario(scenario.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-sm">{scenario.name}</h4>
                          {scenario.isActive && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{formatCurrency(scenario.revenue)}</p>
                          <p className="text-xs text-gray-500">{scenario.probability}% probability</p>
                        </div>
                      </div>
                      <Progress value={scenario.probability} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Performance Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="flex items-center space-x-4 mb-4">
            <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Team Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                {teamForecasts.map((member) => (
                  <SelectItem key={member.teamMemberId} value={member.teamMemberId}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Team Forecast Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(teamSummary.totalQuota)}
                  </p>
                  <p className="text-xs text-blue-700">Total Quota</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(teamSummary.totalCommit)}
                  </p>
                  <p className="text-xs text-green-700">Commit Forecast</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {teamSummary.quotaAttainment.toFixed(1)}%
                  </p>
                  <p className="text-xs text-purple-700">Quota Attainment</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {teamSummary.avgAchievement.toFixed(1)}%
                  </p>
                  <p className="text-xs text-yellow-700">Avg Achievement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Team Member Forecasts */}
          <div className="grid gap-4">
            {filteredTeamForecasts.map((member) => (
              <Card key={member.teamMemberId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={cn("text-xs", getRiskLevelColor(member.riskLevel))}>
                            {member.riskLevel} risk
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(member.quota)}
                        </p>
                        <p className="text-xs text-gray-500">Quota</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">
                          {formatCurrency(member.commitForecast)}
                        </p>
                        <p className="text-xs text-gray-500">Commit</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">
                          {member.achievementPercentage.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Achievement</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-yellow-600">{member.dealsInPipeline}</p>
                        <p className="text-xs text-gray-500">Pipeline Deals</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-600">
                          {member.winRate.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Win Rate</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-red-600">{member.salesCycle}</p>
                        <p className="text-xs text-gray-500">Cycle (days)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quota Achievement Progress</span>
                      <span className="font-semibold">{member.achievementPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={member.achievementPercentage} className="h-2 mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Trends & Analysis Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Accuracy Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Forecast accuracy trends chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Velocity Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Pipeline velocity analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Pattern Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Seasonal patterns chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Factor Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Market factor impact analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
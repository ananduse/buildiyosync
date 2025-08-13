import { useState } from 'react';
import {
  Download,
  FileText,
  Share,
  Calendar,
  Printer,
  Mail,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReportCard {
  title: string;
  value: string;
  change: number;
  period: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface PipelineData {
  stage: string;
  leads: number;
  value: number;
  conversionRate: number;
  avgTime: number;
}

interface SourceData {
  source: string;
  leads: number;
  cost: number;
  costPerLead: number;
  conversionRate: number;
  roi: number;
}

interface TeamMemberData {
  name: string;
  avatar: string;
  leads: number;
  conversions: number;
  conversionRate: number;
  totalValue: number;
  activities: number;
}

function ReportSummaryCard({ title, value, change, period, trend, icon }: ReportCard) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3" />
          )}
          {Math.abs(change)}% from {period}
        </div>
      </CardContent>
    </Card>
  );
}

function LeadPipelineReport() {
  const pipelineData: PipelineData[] = [
    { stage: 'New Leads', leads: 342, value: 4200000, conversionRate: 100, avgTime: 0 },
    { stage: 'Contacted', leads: 268, value: 3800000, conversionRate: 78.4, avgTime: 2.5 },
    { stage: 'Qualified', leads: 156, value: 2900000, conversionRate: 45.6, avgTime: 5.2 },
    { stage: 'Proposal Sent', leads: 89, value: 2100000, conversionRate: 26.0, avgTime: 8.7 },
    { stage: 'Negotiation', leads: 34, value: 1200000, conversionRate: 9.9, avgTime: 12.3 },
    { stage: 'Won', leads: 23, value: 890000, conversionRate: 6.7, avgTime: 18.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Lead Pipeline Report
        </CardTitle>
        <CardDescription>
          Funnel visualization with stage-wise breakdown and bottleneck analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pipelineData.map((stage, index) => (
            <div key={stage.stage} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-gray-400' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-yellow-500' :
                    index === 3 ? 'bg-orange-500' :
                    index === 4 ? 'bg-purple-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium">{stage.stage}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <span>{stage.leads} leads</span>
                  <span>${(stage.value / 1000000).toFixed(1)}M</span>
                  <span>{stage.conversionRate}%</span>
                  <span>{stage.avgTime} days avg</span>
                </div>
              </div>
              <Progress value={stage.conversionRate} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SourceAnalysisReport() {
  const sourceData: SourceData[] = [
    { source: 'Website', leads: 145, cost: 12000, costPerLead: 83, conversionRate: 28.5, roi: 340 },
    { source: 'Referrals', leads: 98, cost: 0, costPerLead: 0, conversionRate: 45.2, roi: 0 },
    { source: 'Social Media', leads: 87, cost: 8500, costPerLead: 98, conversionRate: 22.1, roi: 225 },
    { source: 'Cold Calls', leads: 56, cost: 15000, costPerLead: 268, conversionRate: 18.9, roi: 70 },
    { source: 'Events', leads: 34, cost: 25000, costPerLead: 735, conversionRate: 35.3, roi: 48 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChart className="h-5 w-5 mr-2" />
          Source Analysis Report
        </CardTitle>
        <CardDescription>
          Lead source performance with cost analysis and ROI breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Cost/Lead</TableHead>
              <TableHead>Conversion Rate</TableHead>
              <TableHead>ROI %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sourceData.map((source) => (
              <TableRow key={source.source}>
                <TableCell className="font-medium">{source.source}</TableCell>
                <TableCell>{source.leads}</TableCell>
                <TableCell>${source.cost.toLocaleString()}</TableCell>
                <TableCell>${source.costPerLead}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={source.conversionRate} className="w-16 h-2" />
                    <span className="text-sm">{source.conversionRate}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={source.roi > 200 ? "default" : source.roi > 100 ? "secondary" : "destructive"}>
                    {source.roi}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function TeamPerformanceReport() {
  const teamData: TeamMemberData[] = [
    {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      leads: 85,
      conversions: 23,
      conversionRate: 27.1,
      totalValue: 345000,
      activities: 156
    },
    {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      leads: 72,
      conversions: 18,
      conversionRate: 25.0,
      totalValue: 290000,
      activities: 134
    },
    {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      leads: 68,
      conversions: 15,
      conversionRate: 22.1,
      totalValue: 245000,
      activities: 128
    },
    {
      name: 'David Brown',
      avatar: '/avatars/david.jpg',
      leads: 61,
      conversions: 12,
      conversionRate: 19.7,
      totalValue: 185000,
      activities: 98
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Team Performance Report
        </CardTitle>
        <CardDescription>
          Individual performance metrics and team comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamData.map((member, index) => (
            <div key={member.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {member.leads} leads • {member.conversions} conversions
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <div className="flex items-center space-x-2">
                    <Progress value={member.conversionRate} className="w-16 h-2" />
                    <span className="font-medium">{member.conversionRate}%</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="font-medium text-green-600">${member.totalValue.toLocaleString()}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="font-medium">{member.activities}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ConversionAnalysisReport() {
  const winReasons = [
    { reason: 'Competitive Pricing', percentage: 35, count: 28 },
    { reason: 'Superior Quality', percentage: 28, count: 22 },
    { reason: 'Timeline Alignment', percentage: 18, count: 14 },
    { reason: 'Strong Relationship', percentage: 12, count: 10 },
    { reason: 'Unique Solution', percentage: 7, count: 5 },
  ];

  const lossReasons = [
    { reason: 'Price Too High', percentage: 42, count: 34 },
    { reason: 'Lost to Competitor', percentage: 28, count: 23 },
    { reason: 'Budget Constraints', percentage: 15, count: 12 },
    { reason: 'Timeline Issues', percentage: 10, count: 8 },
    { reason: 'Requirements Changed', percentage: 5, count: 4 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Conversion Analysis Report
        </CardTitle>
        <CardDescription>
          Win/loss reasons and conversion patterns by project type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
          {/* Win Reasons */}
          <div>
            <h3 className="font-medium mb-4 text-green-600">Win Reasons</h3>
            <div className="space-y-3">
              {winReasons.map((reason) => (
                <div key={reason.reason} className="flex items-center justify-between">
                  <span className="text-sm">{reason.reason}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={reason.percentage} className="w-20 h-2" />
                    <span className="text-sm font-medium w-12">{reason.percentage}%</span>
                    <span className="text-xs text-muted-foreground">({reason.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loss Reasons */}
          <div>
            <h3 className="font-medium mb-4 text-red-600">Loss Reasons</h3>
            <div className="space-y-3">
              {lossReasons.map((reason) => (
                <div key={reason.reason} className="flex items-center justify-between">
                  <span className="text-sm">{reason.reason}</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={reason.percentage} className="w-20 h-2" />
                    <span className="text-sm font-medium w-12">{reason.percentage}%</span>
                    <span className="text-xs text-muted-foreground">({reason.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-4">Conversion by Project Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7.5">
            {[
              { type: 'Commercial', conversion: 28.5, value: '$2.1M' },
              { type: 'Residential', conversion: 35.2, value: '$1.8M' },
              { type: 'Industrial', conversion: 22.1, value: '$3.2M' },
              { type: 'Infrastructure', conversion: 31.8, value: '$4.5M' },
            ].map((project) => (
              <div key={project.type} className="text-center p-4 border rounded-lg">
                <h4 className="font-medium">{project.type}</h4>
                <p className="text-2xl font-bold text-blue-600">{project.conversion}%</p>
                <p className="text-sm text-muted-foreground">{project.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadReportsContent() {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  const summaryCards: ReportCard[] = [
    {
      title: 'Total Leads (MTD)',
      value: '2,847',
      change: 12.5,
      period: 'last month',
      trend: 'up',
      icon: <Users className="h-4 w-4" />
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: -2.1,
      period: 'last quarter',
      trend: 'down',
      icon: <Target className="h-4 w-4" />
    },
    {
      title: 'Avg Conversion Time',
      value: '18.5 days',
      change: -8.3,
      period: 'last month',
      trend: 'up',
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: 'Win/Loss Ratio',
      value: '2.3:1',
      change: 15.2,
      period: 'last quarter',
      trend: 'up',
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <div className="grid gap-5 lg:gap-7.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into lead performance and trends</p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7.5">
        {summaryCards.map((card, index) => (
          <ReportSummaryCard key={index} {...card} />
        ))}
      </div>

      {/* Report Tabs */}
      <Tabs value={reportType} onValueChange={setReportType}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Schedule Email
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <LeadPipelineReport />
              <ConversionAnalysisReport />
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <LeadPipelineReport />
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <SourceAnalysisReport />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamPerformanceReport />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
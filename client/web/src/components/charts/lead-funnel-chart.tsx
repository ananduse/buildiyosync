import { useState } from 'react';
import { ChevronRight, TrendingDown, TrendingUp, Users, Target, Award, Zap, MessageCircle, FileCheck, Handshake, Trophy, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FunnelStage {
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  label: string;
  count: number;
  color: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LeadFunnelChartProps {
  data: FunnelStage[];
  onStageClick?: (stage: string) => void;
  className?: string;
}

const stageConfig = {
  new: {
    label: 'New Leads',
    color: 'text-slate-700',
    bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
    borderColor: 'border-slate-200',
    shadowColor: 'shadow-slate-200/50',
    glowColor: 'group-hover:shadow-slate-300/60',
    iconBg: 'bg-slate-200',
    iconColor: 'text-slate-600',
    icon: Users,
  },
  contacted: {
    label: 'Contacted',
    color: 'text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    shadowColor: 'shadow-blue-200/50',
    glowColor: 'group-hover:shadow-blue-300/60',
    iconBg: 'bg-blue-200',
    iconColor: 'text-blue-600',
    icon: MessageCircle,
  },
  qualified: {
    label: 'Qualified',
    color: 'text-amber-700',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    borderColor: 'border-amber-200',
    shadowColor: 'shadow-amber-200/50',
    glowColor: 'group-hover:shadow-amber-300/60',
    iconBg: 'bg-amber-200',
    iconColor: 'text-amber-600',
    icon: Target,
  },
  proposal: {
    label: 'Proposal Sent',
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    borderColor: 'border-orange-200',
    shadowColor: 'shadow-orange-200/50',
    glowColor: 'group-hover:shadow-orange-300/60',
    iconBg: 'bg-orange-200',
    iconColor: 'text-orange-600',
    icon: FileCheck,
  },
  negotiation: {
    label: 'Negotiation',
    color: 'text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    shadowColor: 'shadow-purple-200/50',
    glowColor: 'group-hover:shadow-purple-300/60',
    iconBg: 'bg-purple-200',
    iconColor: 'text-purple-600',
    icon: Handshake,
  },
  won: {
    label: 'Won',
    color: 'text-emerald-700',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    borderColor: 'border-emerald-200',
    shadowColor: 'shadow-emerald-200/50',
    glowColor: 'group-hover:shadow-emerald-300/60',
    iconBg: 'bg-emerald-200',
    iconColor: 'text-emerald-600',
    icon: Trophy,
  },
  lost: {
    label: 'Lost',
    color: 'text-red-700',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    borderColor: 'border-red-200',
    shadowColor: 'shadow-red-200/50',
    glowColor: 'group-hover:shadow-red-300/60',
    iconBg: 'bg-red-200',
    iconColor: 'text-red-600',
    icon: XCircle,
  },
};

function FunnelStageCard({ 
  stage, 
  isLast, 
  conversionRate, 
  trend,
  onClick
}: { 
  stage: FunnelStage;
  isLast: boolean;
  conversionRate?: number;
  trend?: 'up' | 'down' | 'stable';
  onClick?: () => void;
}) {
  const config = stageConfig[stage.stage];
  const Icon = config.icon;
  
  return (
    <div className="flex items-center">
      {/* Stage Card */}
      <Button
        variant="ghost"
        onClick={onClick}
        className={cn(
          "p-0 h-auto hover:bg-transparent group transition-all duration-300 ease-out",
          onClick && "cursor-pointer"
        )}
      >
        <div className={cn(
          "relative p-4 sm:p-5 lg:p-6 rounded-2xl border-2 transition-all duration-300 ease-out w-full backdrop-blur-sm",
          // Dynamic width based on whether it's an outcome stage
          stage.stage === 'won' || stage.stage === 'lost' 
            ? "max-w-[160px] sm:max-w-[180px] lg:max-w-[200px]" 
            : "max-w-[140px] sm:max-w-[150px] lg:max-w-[160px]",
          config.bgColor,
          config.borderColor,
          config.shadowColor,
          "shadow-lg",
          onClick && [
            "group-hover:shadow-xl group-hover:scale-[1.02] group-hover:-translate-y-1",
            config.glowColor
          ]
        )}>
          
          {/* Animated Background Glow */}
          <div className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300",
            config.bgColor.replace('from-', 'from-').replace('to-', 'to-').replace('-50', '-200').replace('-100', '-300')
          )} />
          
          {/* Icon Container */}
          <div className="flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
            <div className={cn(
              "p-2 sm:p-2.5 lg:p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
              config.iconBg,
              "shadow-sm"
            )}>
              <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 transition-colors duration-300", config.iconColor)} />
            </div>
          </div>
          
          {/* Stage Label */}
          <div className={cn(
            "text-xs sm:text-sm font-semibold text-center mb-2 sm:mb-3 transition-colors duration-300 leading-tight",
            config.color,
            "group-hover:text-opacity-90"
          )}>
            {config.label}
          </div>
          
          {/* Count with Animation */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-gray-800 group-hover:to-gray-500 transition-all duration-300">
            {stage.count.toLocaleString()}
          </div>
          
          {/* Conversion Rate Badge */}
          {conversionRate !== undefined && (
            <div className="flex items-center justify-center">
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs px-3 py-1.5 font-medium rounded-full border shadow-sm transition-all duration-300",
                  trend === 'up' && "bg-emerald-50 text-emerald-700 border-emerald-200 group-hover:bg-emerald-100",
                  trend === 'down' && "bg-red-50 text-red-700 border-red-200 group-hover:bg-red-100",
                  trend === 'stable' && "bg-slate-50 text-slate-700 border-slate-200 group-hover:bg-slate-100"
                )}
              >
                {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                {conversionRate.toFixed(1)}%
              </Badge>
            </div>
          )}
          
          {/* Subtle Border Highlight */}
          <div className={cn(
            "absolute inset-0 rounded-2xl border-2 border-transparent",
            "group-hover:border-white/20 transition-all duration-300"
          )} />
        </div>
      </Button>
      
      {/* Compact Arrow Connector */}
      {!isLast && (
        <div className="mx-1 sm:mx-2 lg:mx-3 relative flex-shrink-0">
          <div className="flex items-center">
            {/* Arrow Line */}
            <div className="w-4 sm:w-6 lg:w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full" />
            {/* Arrow Head */}
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 -ml-1 drop-shadow-sm" />
          </div>
          
          {/* Conversion Flow Indicator */}
          {conversionRate !== undefined && (
            <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2">
              <div className={cn(
                "px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-sm border backdrop-blur-sm whitespace-nowrap",
                trend === 'up' && "bg-emerald-50/80 text-emerald-600 border-emerald-200",
                trend === 'down' && "bg-red-50/80 text-red-600 border-red-200",
                trend === 'stable' && "bg-slate-50/80 text-slate-600 border-slate-200"
              )}>
                {conversionRate.toFixed(0)}%
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ConversionMetrics({ data }: { data: FunnelStage[] }) {
  const totalLeads = data.find(stage => stage.stage === 'new')?.count || 0;
  const wonLeads = data.find(stage => stage.stage === 'won')?.count || 0;
  const lostLeads = data.find(stage => stage.stage === 'lost')?.count || 0;
  
  const overallConversion = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
  const winRate = (wonLeads + lostLeads) > 0 ? (wonLeads / (wonLeads + lostLeads)) * 100 : 0;
  
  const metrics = [
    {
      label: 'Total Leads',
      value: totalLeads.toLocaleString(),
      icon: Users,
      color: 'text-slate-600',
      bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
      iconBg: 'bg-slate-200',
    },
    {
      label: 'Conversion Rate',
      value: `${overallConversion.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-200',
    },
    {
      label: 'Win Rate',
      value: `${winRate.toFixed(1)}%`,
      icon: Trophy,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-200',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div 
            key={index}
            className={cn(
              "relative p-4 sm:p-5 lg:p-6 rounded-2xl border-2 border-opacity-50 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl cursor-pointer group backdrop-blur-sm",
              metric.bgColor
            )}
          >
            {/* Background Glow Effect */}
            <div className={cn(
              "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300",
              metric.bgColor.replace('-50', '-200').replace('-100', '-300')
            )} />
            
            {/* Icon */}
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className={cn(
                "p-2 sm:p-2.5 lg:p-3 rounded-xl shadow-sm transition-all duration-300 group-hover:scale-110",
                metric.iconBg
              )}>
                <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", metric.color)} />
              </div>
            </div>
            
            {/* Value */}
            <div className="text-center">
              <div className={cn(
                "text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300",
                metric.color
              )}>
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {metric.label}
              </div>
            </div>
            
            {/* Subtle Border Highlight */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300" />
          </div>
        );
      })}
    </div>
  );
}

export function LeadFunnelChart({ data, onStageClick, className }: LeadFunnelChartProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  
  // Calculate conversion rates
  const getConversionRate = (currentIndex: number): number | undefined => {
    if (currentIndex === 0) return undefined;
    const current = data[currentIndex];
    const previous = data[currentIndex - 1];
    if (previous.count === 0) return 0;
    return (current.count / previous.count) * 100;
  };
  
  // Get trend for conversion rate (mock data - in real app, compare with previous period)
  const getTrend = (stage: string): 'up' | 'down' | 'stable' => {
    const trends: Record<string, 'up' | 'down' | 'stable'> = {
      contacted: 'up',
      qualified: 'down',
      proposal: 'up',
      negotiation: 'stable',
      won: 'up',
      lost: 'down',
    };
    return trends[stage] || 'stable';
  };
  
  // Filter out won/lost for main funnel, but include them for metrics
  const mainFunnelStages = data.filter(stage => 
    !['won', 'lost'].includes(stage.stage)
  );
  
  const closedStages = data.filter(stage => 
    ['won', 'lost'].includes(stage.stage)
  );
  
  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-200/50">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Lead Funnel Analysis
            </h3>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Interactive pipeline conversion tracking
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-slate-50/30">
        {/* Main Funnel Flow */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-emerald-100 rounded-3xl" />
          </div>
          
          <div className="relative pb-8 pt-4">
            {/* Desktop/Tablet: Horizontal Layout */}
            <div className="hidden sm:flex w-full items-center justify-between px-2 sm:px-4">
              {mainFunnelStages.map((stage, index) => (
                <FunnelStageCard
                  key={stage.stage}
                  stage={stage}
                  isLast={index === mainFunnelStages.length - 1}
                  conversionRate={getConversionRate(index)}
                  trend={getTrend(stage.stage)}
                  onClick={onStageClick ? () => onStageClick(stage.stage) : undefined}
                />
              ))}
            </div>
            
            {/* Mobile: Vertical Layout */}
            <div className="flex sm:hidden flex-col items-center space-y-4 px-2">
              {mainFunnelStages.map((stage, index) => (
                <div key={stage.stage} className="flex flex-col items-center">
                  <div className="w-full max-w-[200px]">
                    <FunnelStageCard
                      stage={stage}
                      isLast={true} // No arrows in vertical layout
                      conversionRate={getConversionRate(index)}
                      trend={getTrend(stage.stage)}
                      onClick={onStageClick ? () => onStageClick(stage.stage) : undefined}
                    />
                  </div>
                  {/* Vertical Arrow */}
                  {index < mainFunnelStages.length - 1 && (
                    <div className="my-2 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full" />
                      <div className="transform rotate-90">
                        <ChevronRight className="h-4 w-4 text-gray-400 drop-shadow-sm" />
                      </div>
                      {/* Conversion Rate */}
                      {getConversionRate(index + 1) !== undefined && (
                        <div className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium shadow-sm border backdrop-blur-sm mt-1",
                          getTrend(mainFunnelStages[index + 1]?.stage) === 'up' && "bg-emerald-50/80 text-emerald-600 border-emerald-200",
                          getTrend(mainFunnelStages[index + 1]?.stage) === 'down' && "bg-red-50/80 text-red-600 border-red-200",
                          getTrend(mainFunnelStages[index + 1]?.stage) === 'stable' && "bg-slate-50/80 text-slate-600 border-slate-200"
                        )}>
                          {getConversionRate(index + 1)?.toFixed(0)}%
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Outcomes Section */}
        {closedStages.length > 0 && (
          <div className="mt-12 relative">
            {/* Elegant Section Divider */}
            <div className="flex items-center mb-10">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <div className="px-8 py-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-full border-2 border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-slate-700">Final Outcomes</span>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>
            
            {/* Enhanced Outcome Cards Layout */}
            <div className="relative">
              {/* Background Pattern for Outcomes */}
              <div className="absolute inset-0 opacity-5 rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 via-slate-100 to-red-100 rounded-3xl" />
              </div>
              
              <div className="relative flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 px-4 py-8">
                {/* Won */}
                {closedStages.find(stage => stage.stage === 'won') && (
                  <FunnelStageCard
                    stage={closedStages.find(stage => stage.stage === 'won')!}
                    isLast={true}
                    onClick={onStageClick ? () => onStageClick('won') : undefined}
                  />
                )}
                
                {/* VS Separator */}
                <div className="flex flex-col items-center">
                  <div className="px-4 py-2 bg-slate-200 rounded-full border border-slate-300 shadow-sm">
                    <span className="text-sm font-bold text-slate-600">VS</span>
                  </div>
                </div>
                
                {/* Lost */}
                {closedStages.find(stage => stage.stage === 'lost') && (
                  <FunnelStageCard
                    stage={closedStages.find(stage => stage.stage === 'lost')!}
                    isLast={true}
                    onClick={onStageClick ? () => onStageClick('lost') : undefined}
                  />
                )}
              </div>
              
              {/* Outcome Summary Bar */}
              <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
                    <span className="font-medium text-slate-700">
                      Total Closed: {closedStages.reduce((sum, stage) => sum + stage.count, 0)} leads
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-emerald-700 font-semibold">
                      Won: {closedStages.find(s => s.stage === 'won')?.count || 0}
                    </div>
                    <div className="text-red-700 font-semibold">
                      Lost: {closedStages.find(s => s.stage === 'lost')?.count || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Conversion Metrics */}
        <ConversionMetrics data={data} />
        
        {/* Interactive Insights Panel */}
        <div className="mt-8 relative">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100/50 shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-200 text-blue-700">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-900">Smart Insights</h4>
                <p className="text-sm text-blue-700">AI-powered funnel optimization tips</p>
              </div>
            </div>
            
            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Click any stage to view filtered lead details</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span>Green trends indicate improving performance</span>
              </div>
              <div className="flex items-start gap-2">
                <TrendingDown className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span>Focus optimization on declining conversion rates</span>
              </div>
              <div className="flex items-start gap-2">
                <Trophy className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Track win rates to measure sales effectiveness</span>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-2 right-2 opacity-10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample data with modern design integration
export const sampleFunnelData: FunnelStage[] = [
  {
    stage: 'new',
    label: 'New Leads',
    count: 245,
    color: 'text-slate-700',
    bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100',
    icon: Users,
  },
  {
    stage: 'contacted',
    label: 'Contacted',
    count: 189,
    color: 'text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    icon: MessageCircle,
  },
  {
    stage: 'qualified',
    label: 'Qualified',
    count: 124,
    color: 'text-amber-700',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    icon: Target,
  },
  {
    stage: 'proposal',
    label: 'Proposal Sent',
    count: 87,
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    icon: FileCheck,
  },
  {
    stage: 'negotiation',
    label: 'Negotiation',
    count: 52,
    color: 'text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    icon: Handshake,
  },
  {
    stage: 'won',
    label: 'Won',
    count: 34,
    color: 'text-emerald-700',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    icon: Trophy,
  },
  {
    stage: 'lost',
    label: 'Lost',
    count: 18,
    color: 'text-red-700',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    icon: XCircle,
  },
];
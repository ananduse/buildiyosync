import { useState } from 'react';
import { ChevronRight, TrendingDown, TrendingUp, Users, Target, Award } from 'lucide-react';
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
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200',
    icon: Users,
  },
  contacted: {
    label: 'Contacted',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200',
    icon: Target,
  },
  qualified: {
    label: 'Qualified',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200',
    icon: Award,
  },
  proposal: {
    label: 'Proposal Sent',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-200',
    icon: Target,
  },
  negotiation: {
    label: 'Negotiation',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200',
    icon: Users,
  },
  won: {
    label: 'Won',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    icon: Award,
  },
  lost: {
    label: 'Lost',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    icon: TrendingDown,
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
          "p-0 h-auto hover:bg-transparent group transition-all duration-200",
          onClick && "cursor-pointer"
        )}
      >
        <div className={cn(
          "relative p-4 rounded-lg border-2 transition-all duration-200 min-w-[140px]",
          config.bgColor,
          config.borderColor,
          onClick && "group-hover:shadow-md group-hover:scale-105"
        )}>
          {/* Icon */}
          <div className="flex items-center justify-center mb-2">
            <Icon className={cn("h-6 w-6", config.color)} />
          </div>
          
          {/* Stage Label */}
          <div className={cn("text-sm font-medium text-center mb-1", config.color)}>
            {config.label}
          </div>
          
          {/* Count */}
          <div className="text-2xl font-bold text-center mb-2">
            {stage.count.toLocaleString()}
          </div>
          
          {/* Conversion Rate */}
          {conversionRate !== undefined && (
            <div className="flex items-center justify-center">
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs px-2 py-1",
                  trend === 'up' && "bg-green-100 text-green-700",
                  trend === 'down' && "bg-red-100 text-red-700",
                  trend === 'stable' && "bg-gray-100 text-gray-700"
                )}
              >
                {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                {conversionRate.toFixed(1)}%
              </Badge>
            </div>
          )}
        </div>
      </Button>
      
      {/* Arrow */}
      {!isLast && (
        <div className="mx-2 text-gray-400">
          <ChevronRight className="h-5 w-5" />
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
  
  return (
    <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">{totalLeads}</div>
        <div className="text-sm text-gray-600">Total Leads</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">{overallConversion.toFixed(1)}%</div>
        <div className="text-sm text-gray-600">Conversion Rate</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{winRate.toFixed(1)}%</div>
        <div className="text-sm text-gray-600">Win Rate</div>
      </div>
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
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Lead Funnel Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main Funnel Flow */}
        <div className="flex items-center justify-center overflow-x-auto pb-4">
          <div className="flex items-center min-w-max">
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
        </div>
        
        {/* Outcomes Section */}
        {closedStages.length > 0 && (
          <div className="mt-8">
            <div className="text-sm font-medium text-gray-700 mb-4 text-center">
              Final Outcomes
            </div>
            <div className="flex items-center justify-center gap-8">
              {closedStages.map((stage) => (
                <FunnelStageCard
                  key={stage.stage}
                  stage={stage}
                  isLast={true}
                  onClick={onStageClick ? () => onStageClick(stage.stage) : undefined}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Conversion Metrics */}
        <ConversionMetrics data={data} />
        
        {/* Stage Details */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-900 mb-2">
            💡 Funnel Insights
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <div>• Click any stage to view detailed lead list</div>
            <div>• Conversion rates show stage-to-stage performance</div>
            <div>• Green arrows indicate improving conversion rates</div>
            <div>• Focus on stages with declining conversion rates</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample data for testing
export const sampleFunnelData: FunnelStage[] = [
  {
    stage: 'new',
    label: 'New Leads',
    count: 245,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: Users,
  },
  {
    stage: 'contacted',
    label: 'Contacted',
    count: 189,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: Target,
  },
  {
    stage: 'qualified',
    label: 'Qualified',
    count: 124,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    icon: Award,
  },
  {
    stage: 'proposal',
    label: 'Proposal Sent',
    count: 87,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    icon: Target,
  },
  {
    stage: 'negotiation',
    label: 'Negotiation',
    count: 52,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: Users,
  },
  {
    stage: 'won',
    label: 'Won',
    count: 34,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: Award,
  },
  {
    stage: 'lost',
    label: 'Lost',
    count: 18,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: TrendingDown,
  },
];
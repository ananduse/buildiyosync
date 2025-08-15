import { useState, useMemo } from 'react';
import {
  Target,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Users,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Building2,
  Home,
  Globe,
  Navigation,
  Map,
  Route,
  Compass,
  Locate,
  MapIcon,
  Crosshair,
  Landmark,
  TreePine,
  Mountain,
  Waves,
  Layers,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Tag,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Gauge,
  User,
  UserCheck,
  UserX,
  Crown,
  Key,
  Lock,
  Unlock,
  Badge as BadgeIcon,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Video,
  GitBranch,
  Workflow,
  Play,
  Pause,
  Square,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Hash,
  Percent,
  Timer,
  Shuffle,
  BarChart2,
  TrendingUpIcon,
  Calculator,
  Scale,
  Minus,
  Thermometer,
  Brain,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface ScoreCriteria {
  id: string;
  field: string;
  condition: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range' | 'exists' | 'not_exists';
  value: string | number | string[];
  score: number;
  weight: number;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'array';
}

interface ScoreRange {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  priority: 'hot' | 'warm' | 'cold' | 'unqualified';
  actions: string[];
  description: string;
}

interface ScoringRule {
  id: string;
  name: string;
  description: string;
  category: 'demographic' | 'firmographic' | 'behavioral' | 'engagement' | 'intent' | 'fit' | 'timing';
  isActive: boolean;
  priority: number;
  criteria: ScoreCriteria[];
  ranges: ScoreRange[];
  settings: {
    autoRecalculate: boolean;
    recalculateFrequency: 'real-time' | 'hourly' | 'daily' | 'weekly';
    decayEnabled: boolean;
    decayRate: number; // percentage per day
    minimumScore: number;
    maximumScore: number;
  };
  performance: {
    totalLeadsScored: number;
    avgScore: number;
    scoreDistribution: {
      hot: number;
      warm: number;
      cold: number;
      unqualified: number;
    };
    conversionRateByRange: {
      hot: number;
      warm: number;
      cold: number;
      unqualified: number;
    };
    lastCalculated: Date;
    calculationTime: number;
    accuracy: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface ScoreTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  template: Omit<ScoringRule, 'id' | 'performance' | 'createdAt' | 'updatedAt' | 'createdBy'>;
}

// Mock data
const mockScoringRules: ScoringRule[] = [
  {
    id: 'SCORE001',
    name: 'Lead Quality Score',
    description: 'Primary scoring model for overall lead qualification',
    category: 'fit',
    isActive: true,
    priority: 1,
    criteria: [
      {
        id: 'C001',
        field: 'estimated_value',
        condition: 'greater_than',
        value: 50000,
        score: 25,
        weight: 1.5,
        dataType: 'number'
      },
      {
        id: 'C002',
        field: 'lead_source',
        condition: 'equals',
        value: 'Referral',
        score: 20,
        weight: 1.3,
        dataType: 'string'
      },
      {
        id: 'C003',
        field: 'company_size',
        condition: 'greater_than',
        value: 100,
        score: 15,
        weight: 1.2,
        dataType: 'number'
      },
      {
        id: 'C004',
        field: 'industry',
        condition: 'contains',
        value: 'Construction',
        score: 15,
        weight: 1.1,
        dataType: 'string'
      },
      {
        id: 'C005',
        field: 'location',
        condition: 'contains',
        value: 'California',
        score: 10,
        weight: 1.0,
        dataType: 'string'
      }
    ],
    ranges: [
      {
        id: 'R001',
        name: 'Hot Leads',
        minScore: 80,
        maxScore: 100,
        color: '#EF4444',
        priority: 'hot',
        actions: ['immediate_assignment', 'priority_flag', 'manager_notification'],
        description: 'High-quality leads requiring immediate attention'
      },
      {
        id: 'R002',
        name: 'Warm Leads',
        minScore: 60,
        maxScore: 79,
        color: '#F59E0B',
        priority: 'warm',
        actions: ['standard_assignment', 'follow_up_sequence'],
        description: 'Qualified leads with good potential'
      },
      {
        id: 'R003',
        name: 'Cold Leads',
        minScore: 40,
        maxScore: 59,
        color: '#3B82F6',
        priority: 'cold',
        actions: ['nurture_campaign', 'delayed_follow_up'],
        description: 'Leads requiring nurturing and development'
      },
      {
        id: 'R004',
        name: 'Unqualified',
        minScore: 0,
        maxScore: 39,
        color: '#6B7280',
        priority: 'unqualified',
        actions: ['archive', 'disqualify'],
        description: 'Leads that do not meet qualification criteria'
      }
    ],
    settings: {
      autoRecalculate: true,
      recalculateFrequency: 'real-time',
      decayEnabled: true,
      decayRate: 2.5,
      minimumScore: 0,
      maximumScore: 100
    },
    performance: {
      totalLeadsScored: 1456,
      avgScore: 67.3,
      scoreDistribution: {
        hot: 234,
        warm: 512,
        cold: 456,
        unqualified: 254
      },
      conversionRateByRange: {
        hot: 45.2,
        warm: 28.7,
        cold: 12.1,
        unqualified: 2.3
      },
      lastCalculated: new Date(2024, 0, 20, 16, 30),
      calculationTime: 2.8,
      accuracy: 87.5
    },
    createdAt: new Date(2023, 11, 1),
    updatedAt: new Date(2024, 0, 15),
    createdBy: 'Admin'
  },
  {
    id: 'SCORE002',
    name: 'Engagement Score',
    description: 'Measures lead engagement and interaction levels',
    category: 'engagement',
    isActive: true,
    priority: 2,
    criteria: [
      {
        id: 'C006',
        field: 'email_opens',
        condition: 'greater_than',
        value: 3,
        score: 20,
        weight: 1.2,
        dataType: 'number'
      },
      {
        id: 'C007',
        field: 'website_visits',
        condition: 'greater_than',
        value: 5,
        score: 15,
        weight: 1.1,
        dataType: 'number'
      },
      {
        id: 'C008',
        field: 'form_submissions',
        condition: 'greater_than',
        value: 1,
        score: 25,
        weight: 1.3,
        dataType: 'number'
      },
      {
        id: 'C009',
        field: 'last_activity_days',
        condition: 'less_than',
        value: 7,
        score: 15,
        weight: 1.0,
        dataType: 'number'
      }
    ],
    ranges: [
      {
        id: 'R005',
        name: 'Highly Engaged',
        minScore: 75,
        maxScore: 100,
        color: '#10B981',
        priority: 'hot',
        actions: ['immediate_call', 'personalized_email'],
        description: 'Leads showing high engagement signals'
      },
      {
        id: 'R006',
        name: 'Moderately Engaged',
        minScore: 50,
        maxScore: 74,
        color: '#F59E0B',
        priority: 'warm',
        actions: ['follow_up_call', 'content_sharing'],
        description: 'Leads with moderate engagement'
      },
      {
        id: 'R007',
        name: 'Low Engagement',
        minScore: 25,
        maxScore: 49,
        color: '#3B82F6',
        priority: 'cold',
        actions: ['re_engagement_campaign'],
        description: 'Leads with minimal engagement'
      },
      {
        id: 'R008',
        name: 'No Engagement',
        minScore: 0,
        maxScore: 24,
        color: '#6B7280',
        priority: 'unqualified',
        actions: ['suppress_from_campaigns'],
        description: 'Leads showing no engagement'
      }
    ],
    settings: {
      autoRecalculate: true,
      recalculateFrequency: 'hourly',
      decayEnabled: true,
      decayRate: 5.0,
      minimumScore: 0,
      maximumScore: 100
    },
    performance: {
      totalLeadsScored: 2134,
      avgScore: 52.8,
      scoreDistribution: {
        hot: 187,
        warm: 543,
        cold: 798,
        unqualified: 606
      },
      conversionRateByRange: {
        hot: 38.7,
        warm: 22.4,
        cold: 8.9,
        unqualified: 1.2
      },
      lastCalculated: new Date(2024, 0, 20, 17, 0),
      calculationTime: 1.2,
      accuracy: 82.3
    },
    createdAt: new Date(2023, 10, 15),
    updatedAt: new Date(2024, 0, 12),
    createdBy: 'Marketing Team'
  },
  {
    id: 'SCORE003',
    name: 'Intent Signals',
    description: 'Identifies buying intent based on behavior patterns',
    category: 'intent',
    isActive: true,
    priority: 3,
    criteria: [
      {
        id: 'C010',
        field: 'pricing_page_visits',
        condition: 'greater_than',
        value: 0,
        score: 30,
        weight: 1.5,
        dataType: 'number'
      },
      {
        id: 'C011',
        field: 'demo_request',
        condition: 'equals',
        value: 'true',
        score: 40,
        weight: 2.0,
        dataType: 'boolean'
      },
      {
        id: 'C012',
        field: 'content_downloads',
        condition: 'greater_than',
        value: 2,
        score: 20,
        weight: 1.2,
        dataType: 'number'
      },
      {
        id: 'C013',
        field: 'competitor_research',
        condition: 'equals',
        value: 'true',
        score: 25,
        weight: 1.3,
        dataType: 'boolean'
      }
    ],
    ranges: [
      {
        id: 'R009',
        name: 'High Intent',
        minScore: 70,
        maxScore: 100,
        color: '#8B5CF6',
        priority: 'hot',
        actions: ['immediate_sales_call', 'custom_proposal'],
        description: 'Strong buying intent signals detected'
      },
      {
        id: 'R010',
        name: 'Medium Intent',
        minScore: 40,
        maxScore: 69,
        color: '#F59E0B',
        priority: 'warm',
        actions: ['product_demo', 'case_study_sharing'],
        description: 'Moderate buying intent'
      },
      {
        id: 'R011',
        name: 'Low Intent',
        minScore: 20,
        maxScore: 39,
        color: '#3B82F6',
        priority: 'cold',
        actions: ['educational_content'],
        description: 'Early stage research'
      },
      {
        id: 'R012',
        name: 'No Intent',
        minScore: 0,
        maxScore: 19,
        color: '#6B7280',
        priority: 'unqualified',
        actions: ['awareness_campaigns'],
        description: 'No clear buying intent'
      }
    ],
    settings: {
      autoRecalculate: true,
      recalculateFrequency: 'real-time',
      decayEnabled: true,
      decayRate: 3.0,
      minimumScore: 0,
      maximumScore: 100
    },
    performance: {
      totalLeadsScored: 987,
      avgScore: 43.2,
      scoreDistribution: {
        hot: 98,
        warm: 234,
        cold: 345,
        unqualified: 310
      },
      conversionRateByRange: {
        hot: 52.8,
        warm: 31.2,
        cold: 15.6,
        unqualified: 3.1
      },
      lastCalculated: new Date(2024, 0, 20, 16, 45),
      calculationTime: 0.9,
      accuracy: 91.2
    },
    createdAt: new Date(2023, 9, 20),
    updatedAt: new Date(2024, 0, 10),
    createdBy: 'Sales Team'
  },
  {
    id: 'SCORE004',
    name: 'Timing Score',
    description: 'Evaluates optimal timing for sales engagement',
    category: 'timing',
    isActive: true,
    priority: 4,
    criteria: [
      {
        id: 'C014',
        field: 'business_hours_activity',
        condition: 'equals',
        value: 'true',
        score: 15,
        weight: 1.1,
        dataType: 'boolean'
      },
      {
        id: 'C015',
        field: 'project_timeline',
        condition: 'less_than',
        value: 90,
        score: 25,
        weight: 1.4,
        dataType: 'number'
      },
      {
        id: 'C016',
        field: 'budget_cycle',
        condition: 'equals',
        value: 'Q4',
        score: 20,
        weight: 1.3,
        dataType: 'string'
      },
      {
        id: 'C017',
        field: 'seasonal_factor',
        condition: 'equals',
        value: 'high',
        score: 10,
        weight: 1.0,
        dataType: 'string'
      }
    ],
    ranges: [
      {
        id: 'R013',
        name: 'Perfect Timing',
        minScore: 70,
        maxScore: 100,
        color: '#10B981',
        priority: 'hot',
        actions: ['immediate_outreach', 'priority_scheduling'],
        description: 'Optimal timing for engagement'
      },
      {
        id: 'R014',
        name: 'Good Timing',
        minScore: 50,
        maxScore: 69,
        color: '#F59E0B',
        priority: 'warm',
        actions: ['scheduled_follow_up'],
        description: 'Favorable timing conditions'
      },
      {
        id: 'R015',
        name: 'Moderate Timing',
        minScore: 30,
        maxScore: 49,
        color: '#3B82F6',
        priority: 'cold',
        actions: ['timing_optimization'],
        description: 'Timing could be improved'
      },
      {
        id: 'R016',
        name: 'Poor Timing',
        minScore: 0,
        maxScore: 29,
        color: '#6B7280',
        priority: 'unqualified',
        actions: ['delay_engagement'],
        description: 'Unfavorable timing conditions'
      }
    ],
    settings: {
      autoRecalculate: true,
      recalculateFrequency: 'daily',
      decayEnabled: false,
      decayRate: 0,
      minimumScore: 0,
      maximumScore: 100
    },
    performance: {
      totalLeadsScored: 1789,
      avgScore: 58.7,
      scoreDistribution: {
        hot: 267,
        warm: 534,
        cold: 623,
        unqualified: 365
      },
      conversionRateByRange: {
        hot: 41.9,
        warm: 25.3,
        cold: 11.8,
        unqualified: 4.7
      },
      lastCalculated: new Date(2024, 0, 20, 8, 0),
      calculationTime: 3.5,
      accuracy: 79.8
    },
    createdAt: new Date(2023, 8, 10),
    updatedAt: new Date(2024, 0, 8),
    createdBy: 'Admin'
  }
];

const mockScoreTemplates: ScoreTemplate[] = [
  {
    id: 'TMPL001',
    name: 'B2B Lead Qualification',
    description: 'Standard B2B lead scoring template',
    category: 'fit',
    template: {
      name: 'B2B Lead Qualification',
      description: 'Standard B2B lead scoring template',
      category: 'fit',
      isActive: true,
      priority: 1,
      criteria: [
        {
          id: 'TC001',
          field: 'company_size',
          condition: 'greater_than',
          value: 50,
          score: 20,
          weight: 1.2,
          dataType: 'number'
        },
        {
          id: 'TC002',
          field: 'job_title',
          condition: 'contains',
          value: 'Manager',
          score: 15,
          weight: 1.1,
          dataType: 'string'
        }
      ],
      ranges: [
        {
          id: 'TR001',
          name: 'Qualified',
          minScore: 60,
          maxScore: 100,
          color: '#10B981',
          priority: 'hot',
          actions: ['sales_qualified'],
          description: 'Meets qualification criteria'
        },
        {
          id: 'TR002',
          name: 'Unqualified',
          minScore: 0,
          maxScore: 59,
          color: '#6B7280',
          priority: 'unqualified',
          actions: ['marketing_qualified'],
          description: 'Requires further qualification'
        }
      ],
      settings: {
        autoRecalculate: true,
        recalculateFrequency: 'real-time',
        decayEnabled: false,
        decayRate: 0,
        minimumScore: 0,
        maximumScore: 100
      }
    }
  }
];

// Helper functions
function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getCategoryIcon(category: ScoringRule['category']) {
  switch (category) {
    case 'demographic': return Users;
    case 'firmographic': return Building2;
    case 'behavioral': return Activity;
    case 'engagement': return MessageSquare;
    case 'intent': return Target;
    case 'fit': return CheckCircle;
    case 'timing': return Clock;
    default: return Star;
  }
}

function getCategoryColor(category: ScoringRule['category']) {
  switch (category) {
    case 'demographic': return 'bg-blue-500';
    case 'firmographic': return 'bg-purple-500';
    case 'behavioral': return 'bg-emerald-500';
    case 'engagement': return 'bg-amber-500';
    case 'intent': return 'bg-red-500';
    case 'fit': return 'bg-indigo-500';
    case 'timing': return 'bg-rose-500';
    default: return 'bg-gray-500';
  }
}

function getPriorityColor(priority: ScoreRange['priority']) {
  switch (priority) {
    case 'hot': return 'text-red-600 bg-red-50';
    case 'warm': return 'text-amber-600 bg-amber-50';
    case 'cold': return 'text-blue-600 bg-blue-50';
    case 'unqualified': return 'text-gray-600 bg-gray-50';
  }
}

function getConditionSymbol(condition: string) {
  switch (condition) {
    case 'equals': return '=';
    case 'contains': return '⊃';
    case 'greater_than': return '>';
    case 'less_than': return '<';
    case 'in_range': return '∈';
    case 'exists': return '∃';
    case 'not_exists': return '∄';
    default: return '?';
  }
}

function ScoringRuleCard({ rule, onEdit, onView, onToggle, onDelete, onCalculate }: {
  rule: ScoringRule;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onCalculate: () => void;
}) {
  const CategoryIcon = getCategoryIcon(rule.category);
  const totalLeads = Object.values(rule.performance.scoreDistribution).reduce((sum, count) => sum + count, 0);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={cn("p-2 rounded-lg text-white", getCategoryColor(rule.category))}>
              <CategoryIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{rule.name}</h3>
                <Badge variant="outline" className="text-xs">
                  P{rule.priority}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {rule.category}
                </Badge>
                {!rule.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
                {rule.settings.autoRecalculate && (
                  <Tooltip content="Auto Recalculate Enabled">
                    <RefreshCw className="h-3 w-3 text-emerald-500" />
                  </Tooltip>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Scale className="h-3 w-3" />
                  <span>{rule.criteria.length} criteria</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>{rule.ranges.length} ranges</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Thermometer className="h-3 w-3" />
                  <span>Avg: {rule.performance.avgScore.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Rule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onCalculate}>
                <Calculator className="h-4 w-4 mr-2" />
                Recalculate Scores
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {rule.isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Rule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Score Distribution */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Score Distribution:</span>
            <span className="font-medium">{formatNumber(totalLeads)} leads</span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {rule.ranges.map((range) => {
              const count = rule.performance.scoreDistribution[range.priority];
              const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
              
              return (
                <Tooltip key={range.id} content={`${range.name}: ${count} leads`}>
                  <div 
                    className="h-2 rounded"
                    style={{ 
                      backgroundColor: range.color,
                      width: `${percentage}%`,
                      minWidth: '8px'
                    }}
                  />
                </Tooltip>
              );
            })}
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold">{rule.performance.totalLeadsScored}</p>
            <p className="text-xs text-gray-500">Leads Scored</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-purple-600">{rule.performance.accuracy.toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Accuracy</p>
          </div>
        </div>
        
        {/* Performance Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Hot Leads:</span>
            <span className="font-medium text-red-600">
              {rule.performance.scoreDistribution.hot} ({rule.performance.conversionRateByRange.hot}% conv.)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Calculation Time:</span>
            <span className="font-medium">{rule.performance.calculationTime.toFixed(1)}s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated:</span>
            <span className="font-medium">
              {new Date(rule.performance.lastCalculated).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Settings Indicators */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            <div className={cn("w-2 h-2 rounded-full", rule.isActive ? "bg-emerald-500" : "bg-red-500")} />
            <span className="text-sm text-gray-600">
              {rule.settings.recalculateFrequency}
            </span>
            {rule.settings.decayEnabled && (
              <Badge variant="outline" className="text-xs">
                -{rule.settings.decayRate}%/day
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            Range: {rule.settings.minimumScore}-{rule.settings.maximumScore}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function ScoreTemplateCard({ template, onUse }: {
  template: ScoreTemplate;
  onUse: () => void;
}) {
  const CategoryIcon = getCategoryIcon(template.template.category);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={cn("p-2 rounded-lg text-white", getCategoryColor(template.template.category))}>
              <CategoryIcon className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant="secondary" className="text-xs capitalize">
                  {template.category}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Scale className="h-3 w-3" />
                  <span>{template.template.criteria.length} criteria</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>{template.template.ranges.length} ranges</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button size="sm" onClick={onUse}>
            <Plus className="h-4 w-4 mr-1" />
            Use Template
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export function ScoringRules() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('rules');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showCalculatorDialog, setShowCalculatorDialog] = useState(false);
  const [rules, setRules] = useState(mockScoringRules);

  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesSearch = !searchQuery || 
        rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'active' && rule.isActive) ||
        (selectedStatus === 'inactive' && !rule.isActive);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus, rules]);

  const overallStats = useMemo(() => {
    const totalRules = rules.length;
    const activeRules = rules.filter(r => r.isActive).length;
    const totalLeadsScored = rules.reduce((sum, r) => sum + r.performance.totalLeadsScored, 0);
    const avgAccuracy = rules.length > 0 
      ? rules.reduce((sum, r) => sum + r.performance.accuracy, 0) / rules.length 
      : 0;
    const totalHotLeads = rules.reduce((sum, r) => sum + r.performance.scoreDistribution.hot, 0);
    const avgConversionRate = rules.length > 0 
      ? rules.reduce((sum, r) => sum + r.performance.conversionRateByRange.hot, 0) / rules.length 
      : 0;
    
    return { totalRules, activeRules, totalLeadsScored, avgAccuracy, totalHotLeads, avgConversionRate };
  }, [rules]);

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Scoring Rules</h1>
              <Badge variant="secondary">{filteredRules.length} rules</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search scoring rules..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="demographic">Demographic</SelectItem>
                  <SelectItem value="firmographic">Firmographic</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="intent">Intent</SelectItem>
                  <SelectItem value="fit">Fit</SelectItem>
                  <SelectItem value="timing">Timing</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" onClick={() => setShowCalculatorDialog(true)}>
                <Calculator className="h-4 w-4 mr-2" />
                Score Calculator
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Rule
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="rules">Scoring Rules</TabsTrigger>
              <TabsTrigger value="templates">Rule Templates</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="simulator">Score Simulator</TabsTrigger>
            </TabsList>

            <TabsContent value="rules" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Scoring Rules</p>
                        <p className="text-2xl font-bold">{overallStats.totalRules}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeRules} active</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Leads Scored</p>
                        <p className="text-2xl font-bold">{formatNumber(overallStats.totalLeadsScored)}</p>
                        <p className="text-xs text-gray-500">Total processed</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Hot Leads</p>
                        <p className="text-2xl font-bold text-red-600">{formatNumber(overallStats.totalHotLeads)}</p>
                        <p className="text-xs text-gray-500">High-quality leads</p>
                      </div>
                      <Sparkles className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Accuracy</p>
                        <p className={cn("text-2xl font-bold", 
                          overallStats.avgAccuracy > 85 ? "text-emerald-600" : 
                          overallStats.avgAccuracy > 75 ? "text-amber-600" : "text-red-600"
                        )}>
                          {overallStats.avgAccuracy.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Scoring accuracy</p>
                      </div>
                      <Brain className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Scoring Rules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRules
                  .sort((a, b) => a.priority - b.priority)
                  .map((rule) => (
                    <ScoringRuleCard
                      key={rule.id}
                      rule={rule}
                      onEdit={() => {}}
                      onView={() => {}}
                      onToggle={() => handleToggleRule(rule.id)}
                      onDelete={() => handleDeleteRule(rule.id)}
                      onCalculate={() => {}}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Scoring Templates</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockScoreTemplates.map((template) => (
                  <ScoreTemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => setShowAddDialog(true)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Score Distribution Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution Analysis</CardTitle>
                  <CardDescription>Lead distribution across scoring ranges and conversion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rules.map((rule) => {
                      const CategoryIcon = getCategoryIcon(rule.category);
                      const totalLeads = Object.values(rule.performance.scoreDistribution).reduce((sum, count) => sum + count, 0);
                      
                      return (
                        <div key={rule.id} className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className={cn("p-2 rounded-lg text-white", getCategoryColor(rule.category))}>
                              <CategoryIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{rule.name}</p>
                              <p className="text-sm text-gray-500">{formatNumber(totalLeads)} leads scored</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4">
                            {rule.ranges.map((range) => {
                              const count = rule.performance.scoreDistribution[range.priority];
                              const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                              const conversionRate = rule.performance.conversionRateByRange[range.priority];
                              
                              return (
                                <div key={range.id} className="text-center p-3 border rounded-lg">
                                  <div 
                                    className="w-full h-2 rounded mb-2"
                                    style={{ backgroundColor: range.color }}
                                  />
                                  <p className="font-semibold">{count}</p>
                                  <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                                  <p className="text-xs font-medium">{conversionRate}% conv.</p>
                                  <p className="text-xs text-gray-600">{range.name}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Accuracy by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['demographic', 'firmographic', 'behavioral', 'engagement', 'intent', 'fit', 'timing'].map((category) => {
                        const categoryRules = rules.filter(r => r.category === category);
                        const avgAccuracy = categoryRules.length > 0 
                          ? categoryRules.reduce((sum, r) => sum + r.performance.accuracy, 0) / categoryRules.length 
                          : 0;
                        const maxAccuracy = Math.max(...['demographic', 'firmographic', 'behavioral', 'engagement', 'intent', 'fit', 'timing'].map(c => {
                          const rules_cat = rules.filter(r => r.category === c);
                          return rules_cat.length > 0 ? rules_cat.reduce((sum, r) => sum + r.performance.accuracy, 0) / rules_cat.length : 0;
                        }));
                        
                        return (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{category}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${maxAccuracy > 0 ? (avgAccuracy / maxAccuracy) * 100 : 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {avgAccuracy.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conversion Rate Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rules
                        .sort((a, b) => b.performance.conversionRateByRange.hot - a.performance.conversionRateByRange.hot)
                        .map((rule) => {
                          const hotConversion = rule.performance.conversionRateByRange.hot;
                          const maxConversion = Math.max(...rules.map(r => r.performance.conversionRateByRange.hot));
                          
                          return (
                            <div key={rule.id} className="flex items-center justify-between">
                              <span className="text-sm">{rule.name}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${maxConversion > 0 ? (hotConversion / maxConversion) * 100 : 0}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12">
                                  {hotConversion.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="simulator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Score Simulator</CardTitle>
                  <CardDescription>Test how different lead attributes affect scoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Fields */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Lead Attributes</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Estimated Value</Label>
                          <Input type="number" placeholder="50000" />
                        </div>
                        <div>
                          <Label>Company Size</Label>
                          <Input type="number" placeholder="100" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Lead Source</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Referral">Referral</SelectItem>
                              <SelectItem value="Website">Website</SelectItem>
                              <SelectItem value="Google Ads">Google Ads</SelectItem>
                              <SelectItem value="Social Media">Social Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Industry</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Construction">Construction</SelectItem>
                              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Email Opens</Label>
                          <Input type="number" placeholder="5" />
                        </div>
                        <div>
                          <Label>Website Visits</Label>
                          <Input type="number" placeholder="8" />
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Score
                      </Button>
                    </div>
                    
                    {/* Results */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Scoring Results</h4>
                      
                      <div className="border rounded-lg p-4 space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-red-600 mb-2">87</div>
                          <div className="text-lg font-medium text-red-600">Hot Lead</div>
                          <div className="text-sm text-gray-500">High priority for immediate contact</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Lead Quality Score:</span>
                            <span className="font-medium">35 points</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Engagement Score:</span>
                            <span className="font-medium">28 points</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Intent Signals:</span>
                            <span className="font-medium">24 points</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-medium">
                              <span>Total Score:</span>
                              <span>87 / 100</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Recommended Actions:</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Immediate assignment to senior agent</li>
                            <li>• Priority flag in CRM</li>
                            <li>• Manager notification</li>
                            <li>• Schedule demo call within 24 hours</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Scoring Rule Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create Scoring Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Rule Name</Label>
                  <Input placeholder="Lead Quality Score" />
                </div>
                <div>
                  <Label>Priority</Label>
                  <Input type="number" placeholder="1" min="1" max="10" />
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe what this scoring rule evaluates..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="demographic">Demographic</SelectItem>
                      <SelectItem value="firmographic">Firmographic</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="intent">Intent</SelectItem>
                      <SelectItem value="fit">Fit</SelectItem>
                      <SelectItem value="timing">Timing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Recalculate Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Criteria Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Scoring Criteria</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Criteria
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-6 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estimated_value">Estimated Value</SelectItem>
                        <SelectItem value="company_size">Company Size</SelectItem>
                        <SelectItem value="lead_source">Lead Source</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="less_than">Less Than</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Value" />
                    <Input type="number" placeholder="Score" />
                    <Input type="number" step="0.1" placeholder="Weight" />
                    
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Score Ranges Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Score Ranges</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Range
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-6 gap-2">
                    <Input placeholder="Range Name" />
                    <Input type="number" placeholder="Min Score" />
                    <Input type="number" placeholder="Max Score" />
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hot">Hot</SelectItem>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="cold">Cold</SelectItem>
                        <SelectItem value="unqualified">Unqualified</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Input placeholder="Color" />
                    
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Minimum Score</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div>
                  <Label>Maximum Score</Label>
                  <Input type="number" placeholder="100" />
                </div>
                <div>
                  <Label>Decay Rate (%/day)</Label>
                  <Input type="number" step="0.1" placeholder="2.5" />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Auto Recalculate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Enable Score Decay</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>
                Create Rule
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Score Calculator Dialog */}
        <Dialog open={showCalculatorDialog} onOpenChange={setShowCalculatorDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Bulk Score Calculator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Scoring Rules</Label>
                <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                  {rules.map((rule) => (
                    <div key={rule.id} className="flex items-center space-x-2 py-2">
                      <input type="checkbox" defaultChecked={rule.isActive} />
                      <span>{rule.name}</span>
                      <Badge variant="secondary" className="text-xs">{rule.category}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Calculation Options</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Recalculate all leads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Only leads without scores</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span className="text-sm">Apply score decay</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">Calculation Preview</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total leads to process:</span>
                    <span className="font-medium">1,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated time:</span>
                    <span className="font-medium">~3 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rules to apply:</span>
                    <span className="font-medium">4 active rules</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCalculatorDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCalculatorDialog(false)}>
                <Calculator className="h-4 w-4 mr-2" />
                Start Calculation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default ScoringRules;
'use client';

import { useState, useMemo } from 'react';
import {
  Heart,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Play,
  Pause,
  Stop,
  Clock,
  Users,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Settings,
  Upload,
  Share2,
  Zap,
  Bell,
  ArrowRight,
  Timer,
  UserCheck,
  Sparkles,
  Gift,
  BookOpen,
  Video,
  FileText,
  Star,
  Award,
  Smile
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface WelcomeStep {
  id: string;
  type: 'email' | 'sms' | 'video' | 'pdf' | 'task' | 'survey' | 'gift' | 'call';
  name: string;
  description: string;
  timing: {
    delay: number;
    unit: 'minutes' | 'hours' | 'days' | 'weeks';
    optimal_time?: string; // e.g., "9:00 AM"
  };
  content: {
    subject?: string;
    template?: string;
    message?: string;
    media_url?: string;
    attachment_url?: string;
    variables?: string[];
    personalization?: string[];
  };
  goals: string[];
  engagement_tracking: {
    track_opens: boolean;
    track_clicks: boolean;
    track_downloads: boolean;
    track_video_views: boolean;
  };
  followup_conditions?: {
    if_not_engaged: {
      action: 'skip' | 'reminder' | 'alternative';
      delay_hours: number;
    };
    if_highly_engaged: {
      action: 'accelerate' | 'bonus_content' | 'personal_call';
    };
  };
  order: number;
  isActive: boolean;
}

interface WelcomeSeries {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'education' | 'relationship' | 'product-intro' | 'value-demo' | 'community';
  industry: 'construction' | 'real-estate' | 'manufacturing' | 'technology' | 'general';
  status: 'draft' | 'active' | 'paused' | 'archived';
  trigger: {
    type: 'lead-created' | 'form-submitted' | 'first-contact' | 'qualification-met' | 'manual';
    conditions?: {
      lead_source?: string[];
      lead_score?: { min: number; max: number };
      company_size?: string[];
      location?: string[];
    };
  };
  steps: WelcomeStep[];
  duration: {
    total_days: number;
    active_period: 'business_days' | 'calendar_days';
  };
  personalization: {
    use_company_name: boolean;
    use_project_type: boolean;
    use_location: boolean;
    use_referral_source: boolean;
    custom_fields: string[];
  };
  branding: {
    company_logo: boolean;
    brand_colors: boolean;
    custom_signature: boolean;
    video_intro: boolean;
  };
  metrics: {
    total_enrollments: number;
    active_enrollments: number;
    completion_rate: number;
    engagement_rate: number;
    conversion_rate: number;
    avg_time_to_convert: number; // in days
    nps_score?: number;
    satisfaction_rating?: number;
    last_enrollment?: string;
  };
  outcomes: {
    primary_goal: string;
    success_metrics: string[];
    expected_conversion_rate: number;
    benchmark_completion_rate: number;
  };
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isTemplate: boolean;
  is_favorite: boolean;
  sharing: {
    is_public: boolean;
    team_access: boolean;
    external_sharing: boolean;
  };
}

interface SeriesMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'days' | 'score';
}

const seriesMetrics: SeriesMetric[] = [
  {
    id: 'total-series',
    title: 'Welcome Series',
    value: 18,
    change: 12.5,
    trend: 'up',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    format: 'number'
  },
  {
    id: 'active-enrollments',
    title: 'Active Enrollments',
    value: 456,
    change: 23.4,
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'avg-completion-rate',
    title: 'Avg Completion Rate',
    value: 78.9,
    change: 5.7,
    trend: 'up',
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'percentage'
  },
  {
    id: 'avg-engagement-rate',
    title: 'Avg Engagement Rate',
    value: 84.3,
    change: 8.2,
    trend: 'up',
    icon: Activity,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'percentage'
  },
  {
    id: 'avg-conversion-rate',
    title: 'Avg Conversion Rate',
    value: 31.7,
    change: 4.1,
    trend: 'up',
    icon: Target,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    format: 'percentage'
  },
  {
    id: 'avg-satisfaction',
    title: 'Satisfaction Score',
    value: 4.6,
    change: 0.3,
    trend: 'up',
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'score'
  }
];

const mockWelcomeSeries: WelcomeSeries[] = [
  {
    id: 'WELCOME001',
    name: 'Construction Project Welcome Journey',
    description: 'Comprehensive 7-day welcome series for new construction leads with educational content, company introduction, and relationship building',
    category: 'onboarding',
    industry: 'construction',
    status: 'active',
    trigger: {
      type: 'form-submitted',
      conditions: {
        lead_source: ['website', 'referral'],
        company_size: ['medium', 'large'],
        location: ['north-america']
      }
    },
    steps: [
      {
        id: 'step1',
        type: 'email',
        name: 'Welcome & Personal Introduction',
        description: 'Warm welcome email with personal video introduction from team lead',
        timing: { delay: 30, unit: 'minutes', optimal_time: '9:00 AM' },
        content: {
          subject: 'Welcome to {{company_name}} - Your Construction Partner',
          template: 'welcome-video-intro',
          message: 'Welcome! I\'m excited to personally guide you through your {{project_type}} journey.',
          media_url: '/videos/welcome-intro.mp4',
          variables: ['first_name', 'company_name', 'project_type'],
          personalization: ['company_branding', 'industry_specific']
        },
        goals: ['Create personal connection', 'Set expectations', 'Build trust'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: false,
          track_video_views: true
        },
        order: 1,
        isActive: true
      },
      {
        id: 'step2',
        type: 'pdf',
        name: 'Construction Planning Guide',
        description: 'Comprehensive PDF guide on construction project planning and best practices',
        timing: { delay: 1, unit: 'days', optimal_time: '10:00 AM' },
        content: {
          subject: 'Your Construction Planning Toolkit - Free Download',
          template: 'resource-delivery',
          attachment_url: '/resources/construction-planning-guide.pdf',
          variables: ['first_name', 'project_type']
        },
        goals: ['Provide immediate value', 'Position as expert', 'Educational support'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: true,
          track_video_views: false
        },
        followup_conditions: {
          if_not_engaged: {
            action: 'reminder',
            delay_hours: 48
          },
          if_highly_engaged: {
            action: 'bonus_content'
          }
        },
        order: 2,
        isActive: true
      },
      {
        id: 'step3',
        type: 'video',
        name: 'Behind-the-Scenes Tour',
        description: 'Virtual tour of construction facilities and meet-the-team video',
        timing: { delay: 3, unit: 'days', optimal_time: '2:00 PM' },
        content: {
          subject: 'Take a Virtual Tour of Our Facilities',
          template: 'video-tour',
          media_url: '/videos/facility-tour.mp4',
          variables: ['first_name']
        },
        goals: ['Build trust through transparency', 'Showcase capabilities', 'Humanize the brand'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: false,
          track_video_views: true
        },
        order: 3,
        isActive: true
      },
      {
        id: 'step4',
        type: 'survey',
        name: 'Project Needs Assessment',
        description: 'Short survey to better understand project requirements and timeline',
        timing: { delay: 5, unit: 'days', optimal_time: '11:00 AM' },
        content: {
          subject: 'Help Us Understand Your {{project_type}} Vision',
          template: 'needs-survey',
          variables: ['first_name', 'project_type']
        },
        goals: ['Gather project intelligence', 'Increase engagement', 'Personalize future communications'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: false,
          track_video_views: false
        },
        order: 4,
        isActive: true
      },
      {
        id: 'step5',
        type: 'gift',
        name: 'Welcome Gift Package',
        description: 'Physical welcome package with branded materials and local gift card',
        timing: { delay: 7, unit: 'days' },
        content: {
          subject: 'A Special Welcome Gift is On Its Way!',
          template: 'gift-notification',
          message: 'We\'ve sent a small token of appreciation to your office.',
          variables: ['first_name', 'company_name']
        },
        goals: ['Create memorable experience', 'Stand out from competition', 'Show appreciation'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: false,
          track_downloads: false,
          track_video_views: false
        },
        order: 5,
        isActive: true
      },
      {
        id: 'step6',
        type: 'task',
        name: 'Personal Consultation Scheduling',
        description: 'Create task for sales rep to schedule one-on-one consultation',
        timing: { delay: 10, unit: 'days' },
        content: {
          template: 'consultation-task',
          variables: ['first_name', 'project_type', 'survey_responses']
        },
        goals: ['Move to sales conversation', 'Provide personalized consultation', 'Convert to opportunity'],
        engagement_tracking: {
          track_opens: false,
          track_clicks: false,
          track_downloads: false,
          track_video_views: false
        },
        order: 6,
        isActive: true
      }
    ],
    duration: {
      total_days: 14,
      active_period: 'business_days'
    },
    personalization: {
      use_company_name: true,
      use_project_type: true,
      use_location: true,
      use_referral_source: true,
      custom_fields: ['budget_range', 'timeline', 'previous_projects']
    },
    branding: {
      company_logo: true,
      brand_colors: true,
      custom_signature: true,
      video_intro: true
    },
    metrics: {
      total_enrollments: 342,
      active_enrollments: 45,
      completion_rate: 82.7,
      engagement_rate: 89.4,
      conversion_rate: 34.8,
      avg_time_to_convert: 18,
      nps_score: 8.7,
      satisfaction_rating: 4.6,
      last_enrollment: '2024-02-02T14:30:00Z'
    },
    outcomes: {
      primary_goal: 'Convert new leads to qualified opportunities',
      success_metrics: ['Engagement rate > 80%', 'Conversion rate > 30%', 'NPS score > 8'],
      expected_conversion_rate: 35.0,
      benchmark_completion_rate: 80.0
    },
    createdBy: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah-j.jpg',
      email: 'sarah.j@buildiyo.com'
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-01T16:45:00Z',
    tags: ['construction', 'onboarding', 'high-converting', 'video-heavy'],
    isTemplate: false,
    is_favorite: true,
    sharing: {
      is_public: true,
      team_access: true,
      external_sharing: false
    }
  },
  {
    id: 'WELCOME002',
    name: 'Real Estate Investor Welcome Series',
    description: '5-day streamlined welcome series for real estate investors with market insights and investment opportunities',
    category: 'education',
    industry: 'real-estate',
    status: 'active',
    trigger: {
      type: 'lead-created',
      conditions: {
        lead_source: ['website', 'cold-outreach'],
        company_size: ['small', 'medium']
      }
    },
    steps: [
      {
        id: 'step1',
        type: 'email',
        name: 'Welcome & Market Overview',
        description: 'Welcome email with current market trends and opportunities',
        timing: { delay: 2, unit: 'hours', optimal_time: '9:00 AM' },
        content: {
          subject: 'Welcome {{first_name}} - Your Real Estate Investment Journey Begins',
          template: 'real-estate-welcome',
          variables: ['first_name', 'location', 'investment_type'],
          personalization: ['market_specific', 'investment_focus']
        },
        goals: ['Welcome new investor', 'Share market insights', 'Set expectations'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: false,
          track_video_views: false
        },
        order: 1,
        isActive: true
      },
      {
        id: 'step2',
        type: 'pdf',
        name: 'Investment Strategy Guide',
        description: 'Comprehensive guide on real estate investment strategies',
        timing: { delay: 2, unit: 'days', optimal_time: '10:00 AM' },
        content: {
          subject: 'Your Investment Strategy Playbook - Free Download',
          template: 'strategy-guide',
          attachment_url: '/resources/investment-strategy-guide.pdf',
          variables: ['first_name', 'investment_type']
        },
        goals: ['Provide educational value', 'Build authority', 'Nurture interest'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: true,
          track_video_views: false
        },
        order: 2,
        isActive: true
      },
      {
        id: 'step3',
        type: 'email',
        name: 'Success Stories & Case Studies',
        description: 'Share success stories from other investors in similar situations',
        timing: { delay: 4, unit: 'days', optimal_time: '11:00 AM' },
        content: {
          subject: 'How {{similar_investor}} Achieved 25% ROI',
          template: 'success-stories',
          variables: ['first_name', 'investment_type', 'similar_investor']
        },
        goals: ['Social proof', 'Inspire confidence', 'Show potential outcomes'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: false,
          track_video_views: false
        },
        order: 3,
        isActive: true
      }
    ],
    duration: {
      total_days: 5,
      active_period: 'calendar_days'
    },
    personalization: {
      use_company_name: false,
      use_project_type: true,
      use_location: true,
      use_referral_source: false,
      custom_fields: ['investment_budget', 'investment_timeline', 'risk_tolerance']
    },
    branding: {
      company_logo: true,
      brand_colors: true,
      custom_signature: true,
      video_intro: false
    },
    metrics: {
      total_enrollments: 189,
      active_enrollments: 67,
      completion_rate: 74.6,
      engagement_rate: 81.2,
      conversion_rate: 28.4,
      avg_time_to_convert: 12,
      satisfaction_rating: 4.3,
      last_enrollment: '2024-02-01T11:20:00Z'
    },
    outcomes: {
      primary_goal: 'Educate and nurture real estate investors',
      success_metrics: ['Engagement rate > 75%', 'Download rate > 60%', 'Conversion rate > 25%'],
      expected_conversion_rate: 30.0,
      benchmark_completion_rate: 75.0
    },
    createdBy: {
      id: 'user2',
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-30T09:30:00Z',
    tags: ['real-estate', 'education', 'case-studies', 'investors'],
    isTemplate: false,
    is_favorite: false,
    sharing: {
      is_public: true,
      team_access: true,
      external_sharing: false
    }
  },
  {
    id: 'WELCOME003',
    name: 'First-Time Customer Welcome Experience',
    description: 'Premium welcome experience for high-value first-time customers with personalized onboarding',
    category: 'relationship',
    industry: 'general',
    status: 'active',
    trigger: {
      type: 'qualification-met',
      conditions: {
        lead_score: { min: 80, max: 100 },
        company_size: ['large']
      }
    },
    steps: [
      {
        id: 'step1',
        type: 'video',
        name: 'Personal CEO Welcome',
        description: 'Personal video message from CEO welcoming the customer',
        timing: { delay: 1, unit: 'hours', optimal_time: '9:00 AM' },
        content: {
          subject: 'A Personal Welcome from Our CEO',
          template: 'ceo-welcome-video',
          media_url: '/videos/ceo-welcome.mp4',
          variables: ['first_name', 'company_name']
        },
        goals: ['Create VIP feeling', 'Show company commitment', 'Build strong relationship'],
        engagement_tracking: {
          track_opens: true,
          track_clicks: true,
          track_downloads: false,
          track_video_views: true
        },
        order: 1,
        isActive: true
      },
      {
        id: 'step2',
        type: 'call',
        name: 'Welcome Call Scheduling',
        description: 'Schedule personal welcome call with account manager',
        timing: { delay: 1, unit: 'days' },
        content: {
          template: 'welcome-call-scheduling',
          variables: ['first_name', 'account_manager']
        },
        goals: ['Personal connection', 'Address questions', 'Set expectations'],
        engagement_tracking: {
          track_opens: false,
          track_clicks: false,
          track_downloads: false,
          track_video_views: false
        },
        order: 2,
        isActive: true
      }
    ],
    duration: {
      total_days: 3,
      active_period: 'business_days'
    },
    personalization: {
      use_company_name: true,
      use_project_type: true,
      use_location: false,
      use_referral_source: false,
      custom_fields: ['account_manager', 'project_value']
    },
    branding: {
      company_logo: true,
      brand_colors: true,
      custom_signature: true,
      video_intro: true
    },
    metrics: {
      total_enrollments: 23,
      active_enrollments: 8,
      completion_rate: 95.7,
      engagement_rate: 97.8,
      conversion_rate: 87.0,
      avg_time_to_convert: 5,
      nps_score: 9.2,
      satisfaction_rating: 4.9,
      last_enrollment: '2024-01-28T16:15:00Z'
    },
    outcomes: {
      primary_goal: 'Create exceptional first impression for high-value customers',
      success_metrics: ['NPS score > 9', 'Completion rate > 90%', 'Conversion rate > 80%'],
      expected_conversion_rate: 85.0,
      benchmark_completion_rate: 95.0
    },
    createdBy: {
      id: 'user3',
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdAt: '2024-01-25T11:30:00Z',
    updatedAt: '2024-01-30T14:20:00Z',
    tags: ['vip-experience', 'high-value', 'personalized', 'relationship-building'],
    isTemplate: false,
    is_favorite: true,
    sharing: {
      is_public: false,
      team_access: true,
      external_sharing: false
    }
  }
];

function getCategoryColor(category: WelcomeSeries['category']) {
  switch (category) {
    case 'onboarding': return 'bg-blue-100 text-blue-800';
    case 'education': return 'bg-green-100 text-green-800';
    case 'relationship': return 'bg-pink-100 text-pink-800';
    case 'product-intro': return 'bg-purple-100 text-purple-800';
    case 'value-demo': return 'bg-orange-100 text-orange-800';
    case 'community': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getIndustryColor(industry: WelcomeSeries['industry']) {
  switch (industry) {
    case 'construction': return 'bg-orange-100 text-orange-800';
    case 'real-estate': return 'bg-blue-100 text-blue-800';
    case 'manufacturing': return 'bg-gray-100 text-gray-800';
    case 'technology': return 'bg-purple-100 text-purple-800';
    case 'general': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusColor(status: WelcomeSeries['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'archived': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStepTypeIcon(type: WelcomeStep['type']) {
  switch (type) {
    case 'email': return Mail;
    case 'sms': return MessageSquare;
    case 'video': return Video;
    case 'pdf': return FileText;
    case 'task': return CheckCircle;
    case 'survey': return FileText;
    case 'gift': return Gift;
    case 'call': return Phone;
    default: return Activity;
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'days' | 'score') {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'days':
      return `${value.toFixed(0)} days`;
    case 'score':
      return `${value.toFixed(1)}/5`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export default function WelcomeSeries() {
  const [series] = useState(mockWelcomeSeries);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSeries, setSelectedSeries] = useState<WelcomeSeries | null>(null);

  const filteredSeries = useMemo(() => {
    return series.filter(welcomeSeries => {
      const matchesSearch = welcomeSeries.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           welcomeSeries.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           welcomeSeries.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || welcomeSeries.category === categoryFilter;
      const matchesIndustry = industryFilter === 'all' || welcomeSeries.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || welcomeSeries.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesIndustry && matchesStatus;
    });
  }, [series, searchQuery, categoryFilter, industryFilter, statusFilter]);

  const summaryStats = useMemo(() => {
    const totalSeries = series.length;
    const activeSeries = series.filter(s => s.status === 'active').length;
    const avgEngagementRate = series.reduce((sum, s) => sum + s.metrics.engagement_rate, 0) / totalSeries;
    const totalEnrollments = series.reduce((sum, s) => sum + s.metrics.total_enrollments, 0);

    return {
      totalSeries,
      activeSeries,
      avgEngagementRate,
      totalEnrollments
    };
  }, [series]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set(series.map(s => s.category));
    return Array.from(categories);
  }, [series]);

  const uniqueIndustries = useMemo(() => {
    const industries = new Set(series.map(s => s.industry));
    return Array.from(industries);
  }, [series]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome Series</h1>
          <p className="text-gray-600">Automated welcome sequences to onboard and engage new leads</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Series
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Welcome Series
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {seriesMetrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend === 'up';
          
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
                    {isPositive ? '↗' : '↙'} {Math.abs(metric.change)}%
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

      {/* Welcome Series Management Tabs */}
      <Tabs defaultValue="series" className="space-y-6">
        <TabsList>
          <TabsTrigger value="series">All Series</TabsTrigger>
          <TabsTrigger value="builder">Series Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* All Series Tab */}
        <TabsContent value="series" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search welcome series..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {uniqueIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Series List */}
          <div className="space-y-4">
            {filteredSeries.map((welcomeSeries) => (
              <Card key={welcomeSeries.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{welcomeSeries.name}</h3>
                            <Badge className={cn("text-xs", getStatusColor(welcomeSeries.status))}>
                              {welcomeSeries.status.toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getCategoryColor(welcomeSeries.category))}>
                              {welcomeSeries.category.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getIndustryColor(welcomeSeries.industry))}>
                              {welcomeSeries.industry.replace('-', ' ').toUpperCase()}
                            </Badge>
                            {welcomeSeries.isTemplate && (
                              <Badge className="bg-purple-100 text-purple-800 text-xs">
                                TEMPLATE
                              </Badge>
                            )}
                            {welcomeSeries.is_favorite && (
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{welcomeSeries.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Activity className="h-4 w-4" />
                              <span>{welcomeSeries.steps.length} steps</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{welcomeSeries.duration.total_days} days</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{welcomeSeries.metrics.total_enrollments} enrollments</span>
                            </div>
                            {welcomeSeries.metrics.nps_score && (
                              <>
                                <span>•</span>
                                <div className="flex items-center space-x-1">
                                  <Smile className="h-4 w-4" />
                                  <span>NPS {welcomeSeries.metrics.nps_score.toFixed(1)}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={welcomeSeries.status === 'active'}
                            size="sm"
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedSeries(welcomeSeries)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Series
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Play className="h-4 w-4 mr-2" />
                                Test Series
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Steps Preview */}
                      <div className="pt-3 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-2">Welcome Journey:</p>
                        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                          {welcomeSeries.steps.slice(0, 5).map((step, index) => {
                            const StepIcon = getStepTypeIcon(step.type);
                            return (
                              <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                                <div className="flex items-center space-x-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-2 py-1 border border-pink-200">
                                  <StepIcon className="h-3 w-3 text-pink-600" />
                                  <span className="text-xs font-medium text-pink-800">{step.name}</span>
                                  <span className="text-xs text-pink-600">
                                    +{step.timing.delay}{step.timing.unit.charAt(0)}
                                  </span>
                                </div>
                                {index < Math.min(welcomeSeries.steps.length - 1, 4) && (
                                  <Sparkles className="h-3 w-3 text-pink-400 flex-shrink-0" />
                                )}
                              </div>
                            );
                          })}
                          {welcomeSeries.steps.length > 5 && (
                            <div className="text-xs text-gray-500 flex-shrink-0">
                              +{welcomeSeries.steps.length - 5} more
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={welcomeSeries.metrics.completion_rate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{welcomeSeries.metrics.completion_rate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Engagement Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={welcomeSeries.metrics.engagement_rate} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{welcomeSeries.metrics.engagement_rate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={welcomeSeries.metrics.conversion_rate} className="flex-1 h-2" />
                            <span className="text-sm font-medium text-green-600">{welcomeSeries.metrics.conversion_rate.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Active Enrollments</p>
                          <p className="text-lg font-semibold text-blue-600">{welcomeSeries.metrics.active_enrollments}</p>
                        </div>
                      </div>

                      {/* Goals & Personalization */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Primary Goal:</p>
                          <p className="text-sm text-gray-600">{welcomeSeries.outcomes.primary_goal}</p>
                          
                          <p className="text-sm font-medium text-gray-700 mb-1 mt-2">Success Metrics:</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            {welcomeSeries.outcomes.success_metrics.slice(0, 2).map((metric, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Target className="h-3 w-3 text-gray-400" />
                                <span>{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Personalization:</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>Company branding: {welcomeSeries.branding.company_logo ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>Video intro: {welcomeSeries.branding.video_intro ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>Custom fields: {welcomeSeries.personalization.custom_fields.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={welcomeSeries.createdBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {welcomeSeries.createdBy.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{welcomeSeries.createdBy.name}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>Updated: {new Date(welcomeSeries.updatedAt).toLocaleDateString()}</span>
                          </div>
                          
                          {welcomeSeries.metrics.satisfaction_rating && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{welcomeSeries.metrics.satisfaction_rating.toFixed(1)}/5</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {welcomeSeries.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {welcomeSeries.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{welcomeSeries.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSeries.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No welcome series found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || categoryFilter !== 'all' || industryFilter !== 'all' || statusFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first welcome series to get started"
                    }
                  </p>
                  {(!searchQuery && categoryFilter === 'all' && industryFilter === 'all' && statusFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Welcome Series
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Series Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          <div className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Welcome series builder interface would be displayed here</p>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="text-center py-8">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Welcome series templates would be displayed here</p>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Series Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Welcome series performance analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Engagement analysis would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
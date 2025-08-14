'use client';

import { useState, useMemo } from 'react';
import { Megaphone, Users, Mail, MessageSquare, Phone, Calendar, Target, TrendingUp, BarChart3, Play, Pause, Stop, Edit, Trash2, Copy, Settings, Plus, Search, Filter, Download, Upload, Eye, CheckCircle, AlertCircle, XCircle, Clock, Star, Tag, Building, User, MapPin, DollarSign, Zap, Send, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'sms' | 'social' | 'direct-mail' | 'webinar' | 'event' | 'multi-channel';
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  objective: 'lead-generation' | 'nurturing' | 'qualification' | 'conversion' | 'retention' | 'reactivation';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  targetAudience: {
    totalLeads: number;
    segments: string[];
    criteria: {
      leadScore?: { min: number; max: number };
      industry?: string[];
      location?: string[];
      companySize?: string[];
      leadSource?: string[];
      lastActivity?: string;
    };
  };
  channels: {
    id: string;
    type: 'email' | 'sms' | 'social' | 'direct-mail' | 'phone';
    weight: number;
    isActive: boolean;
    settings: {
      template?: string;
      sendTime?: string;
      frequency?: string;
      personalizations?: string[];
    };
  }[];
  content: {
    subject?: string;
    message: string;
    ctaText?: string;
    ctaLink?: string;
    attachments?: string[];
    variables?: { [key: string]: string };
  };
  automation: {
    isAutomated: boolean;
    triggers: string[];
    conditions: string[];
    actions: string[];
    sequence?: {
      id: string;
      steps: {
        order: number;
        delay: number;
        channel: string;
        content: string;
        conditions?: string[];
      }[];
    };
  };
  tracking: {
    utmParameters: {
      source?: string;
      medium?: string;
      campaign?: string;
      term?: string;
      content?: string;
    };
    conversionGoals: {
      id: string;
      name: string;
      type: 'page-visit' | 'form-submit' | 'demo-request' | 'purchase' | 'custom';
      value: number;
      isActive: boolean;
    }[];
  };
  performance: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    replied: number;
    converted: number;
    unsubscribed: number;
    bounced: number;
    cost: number;
    revenue: number;
    roi: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    conversionRate: number;
    responseRate: number;
  };
  schedule: {
    isScheduled: boolean;
    timezone: string;
    sendTimes: {
      dayOfWeek: number;
      hour: number;
      minute: number;
    }[];
    frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
    interval?: number;
    endCondition: 'date' | 'count' | 'goal' | 'manual';
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface CampaignTemplate {
  id: string;
  name: string;
  category: 'welcome' | 'nurturing' | 'reactivation' | 'promotion' | 'event' | 'follow-up';
  description: string;
  type: 'email' | 'sms' | 'multi-channel';
  objective: string;
  estimatedDuration: number;
  targetAudience: string;
  expectedResults: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
  };
  content: {
    subject?: string;
    message: string;
    ctaText?: string;
  };
  isActive: boolean;
  usageCount: number;
  performance: {
    avgOpenRate: number;
    avgClickRate: number;
    avgConversionRate: number;
    avgRoi: number;
  };
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Enterprise Lead Nurturing Q1 2024',
    description: 'Multi-channel campaign to nurture high-value enterprise leads through educational content and personalized outreach',
    type: 'multi-channel',
    status: 'active',
    priority: 'high',
    objective: 'nurturing',
    startDate: '2024-03-15T09:00:00Z',
    endDate: '2024-06-15T17:00:00Z',
    budget: 50000,
    spent: 18500,
    targetAudience: {
      totalLeads: 1250,
      segments: ['Enterprise', 'High-Value', 'Technology'],
      criteria: {
        leadScore: { min: 70, max: 100 },
        industry: ['Technology', 'Healthcare', 'Finance'],
        companySize: ['500-1000', '1000+'],
        leadSource: ['Website', 'Referral', 'Event'],
        lastActivity: 'within-30-days'
      }
    },
    channels: [
      {
        id: '1',
        type: 'email',
        weight: 60,
        isActive: true,
        settings: {
          template: 'enterprise-nurture-template',
          sendTime: '10:00',
          frequency: 'weekly',
          personalizations: ['company-name', 'industry', 'use-case']
        }
      },
      {
        id: '2',
        type: 'sms',
        weight: 20,
        isActive: true,
        settings: {
          template: 'enterprise-sms-template',
          sendTime: '14:00',
          frequency: 'bi-weekly'
        }
      },
      {
        id: '3',
        type: 'social',
        weight: 20,
        isActive: true,
        settings: {
          template: 'linkedin-message-template',
          frequency: 'monthly'
        }
      }
    ],
    content: {
      subject: 'Transforming {{company}} with Modern Solutions',
      message: 'Hi {{first_name}}, I noticed {{company}} is in the {{industry}} sector. Our solution has helped similar companies increase efficiency by {{percentage}}%...',
      ctaText: 'Schedule a Demo',
      ctaLink: 'https://example.com/demo?utm_source=email&utm_campaign=enterprise-nurture',
      variables: {
        'percentage': '35',
        'use-case': 'automation'
      }
    },
    automation: {
      isAutomated: true,
      triggers: ['lead-score-increase', 'email-open', 'website-visit'],
      conditions: ['lead-score > 70', 'last-activity < 30-days'],
      actions: ['send-email', 'create-task', 'notify-sales'],
      sequence: {
        id: 'enterprise-sequence-1',
        steps: [
          {
            order: 1,
            delay: 0,
            channel: 'email',
            content: 'Welcome email with industry insights',
            conditions: ['new-lead']
          },
          {
            order: 2,
            delay: 168, // 7 days
            channel: 'email',
            content: 'Case study relevant to their industry'
          },
          {
            order: 3,
            delay: 336, // 14 days
            channel: 'sms',
            content: 'Quick check-in and demo offer',
            conditions: ['email-engagement > 2']
          }
        ]
      }
    },
    tracking: {
      utmParameters: {
        source: 'email',
        medium: 'campaign',
        campaign: 'enterprise-nurture-q1-2024',
        content: 'nurture-series'
      },
      conversionGoals: [
        {
          id: '1',
          name: 'Demo Request',
          type: 'demo-request',
          value: 500,
          isActive: true
        },
        {
          id: '2',
          name: 'Proposal Request',
          type: 'form-submit',
          value: 2000,
          isActive: true
        }
      ]
    },
    performance: {
      sent: 8750,
      delivered: 8532,
      opened: 4266,
      clicked: 1280,
      replied: 234,
      converted: 89,
      unsubscribed: 12,
      bounced: 218,
      cost: 18500,
      revenue: 445000,
      roi: 2305,
      deliveryRate: 97.5,
      openRate: 50.0,
      clickRate: 15.0,
      conversionRate: 7.0,
      responseRate: 2.7
    },
    schedule: {
      isScheduled: true,
      timezone: 'UTC-5',
      sendTimes: [
        { dayOfWeek: 2, hour: 10, minute: 0 }, // Tuesday 10:00 AM
        { dayOfWeek: 4, hour: 14, minute: 0 }  // Thursday 2:00 PM
      ],
      frequency: 'weekly',
      endCondition: 'date'
    },
    createdBy: 'sarah@company.com',
    createdAt: '2024-03-10T14:30:00Z',
    updatedAt: '2024-03-20T16:45:00Z'
  },
  {
    id: '2',
    name: 'SMB Quick Start Campaign',
    description: 'Fast-track campaign for small and medium businesses focusing on immediate value and quick wins',
    type: 'email',
    status: 'completed',
    priority: 'medium',
    objective: 'conversion',
    startDate: '2024-02-01T08:00:00Z',
    endDate: '2024-02-29T18:00:00Z',
    budget: 15000,
    spent: 14200,
    targetAudience: {
      totalLeads: 2500,
      segments: ['SMB', 'Quick-Convert', 'Budget-Conscious'],
      criteria: {
        leadScore: { min: 40, max: 80 },
        companySize: ['1-50', '50-200'],
        leadSource: ['Google-Ads', 'Social-Media'],
        lastActivity: 'within-14-days'
      }
    },
    channels: [
      {
        id: '1',
        type: 'email',
        weight: 100,
        isActive: true,
        settings: {
          template: 'smb-conversion-template',
          sendTime: '09:00',
          frequency: 'daily',
          personalizations: ['first-name', 'company-name', 'pain-point']
        }
      }
    ],
    content: {
      subject: '{{first_name}}, Ready to solve {{pain_point}} in 30 days?',
      message: 'Hi {{first_name}}, Small businesses like {{company}} often struggle with {{pain_point}}. Our 30-day solution can help...',
      ctaText: 'Start Free Trial',
      ctaLink: 'https://example.com/trial?utm_source=email&utm_campaign=smb-quickstart',
      variables: {
        'pain-point': 'lead management'
      }
    },
    automation: {
      isAutomated: true,
      triggers: ['form-submit', 'trial-signup'],
      conditions: ['company-size < 200', 'budget < 10000'],
      actions: ['send-welcome-series', 'assign-to-smb-team']
    },
    tracking: {
      utmParameters: {
        source: 'email',
        medium: 'campaign',
        campaign: 'smb-quickstart-feb-2024',
        content: 'conversion-series'
      },
      conversionGoals: [
        {
          id: '1',
          name: 'Trial Signup',
          type: 'form-submit',
          value: 100,
          isActive: true
        },
        {
          id: '2',
          name: 'Paid Conversion',
          type: 'purchase',
          value: 1000,
          isActive: true
        }
      ]
    },
    performance: {
      sent: 12500,
      delivered: 12125,
      opened: 5093,
      clicked: 1528,
      replied: 156,
      converted: 234,
      unsubscribed: 67,
      bounced: 375,
      cost: 14200,
      revenue: 234000,
      roi: 1548,
      deliveryRate: 97.0,
      openRate: 42.0,
      clickRate: 12.6,
      conversionRate: 15.3,
      responseRate: 1.2
    },
    schedule: {
      isScheduled: true,
      timezone: 'UTC-5',
      sendTimes: [
        { dayOfWeek: 1, hour: 9, minute: 0 },  // Monday 9:00 AM
        { dayOfWeek: 3, hour: 9, minute: 0 },  // Wednesday 9:00 AM
        { dayOfWeek: 5, hour: 9, minute: 0 }   // Friday 9:00 AM
      ],
      frequency: 'custom',
      interval: 2,
      endCondition: 'date'
    },
    createdBy: 'alex@company.com',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z'
  }
];

const mockTemplates: CampaignTemplate[] = [
  {
    id: '1',
    name: 'Welcome & Onboarding Series',
    category: 'welcome',
    description: 'Multi-touch welcome series for new leads with educational content and clear next steps',
    type: 'email',
    objective: 'Lead nurturing and initial engagement',
    estimatedDuration: 21,
    targetAudience: 'New leads from all sources',
    expectedResults: {
      openRate: 65,
      clickRate: 25,
      conversionRate: 8
    },
    content: {
      subject: 'Welcome to {{company_name}}, {{first_name}}!',
      message: 'Thanks for your interest in our solution. Over the next few days, we\'ll share valuable insights...',
      ctaText: 'Get Started'
    },
    isActive: true,
    usageCount: 89,
    performance: {
      avgOpenRate: 68,
      avgClickRate: 28,
      avgConversionRate: 12,
      avgRoi: 450
    }
  },
  {
    id: '2',
    name: 'Reactivation Campaign',
    category: 'reactivation',
    description: 'Re-engage inactive leads with special offers and updated value propositions',
    type: 'multi-channel',
    objective: 'Reactivate dormant leads',
    estimatedDuration: 14,
    targetAudience: 'Leads inactive for 60+ days',
    expectedResults: {
      openRate: 35,
      clickRate: 15,
      conversionRate: 5
    },
    content: {
      subject: 'We miss you, {{first_name}} - Special offer inside',
      message: 'It\'s been a while since we heard from you. Here\'s what\'s new and a special offer...',
      ctaText: 'Redeem Offer'
    },
    isActive: true,
    usageCount: 156,
    performance: {
      avgOpenRate: 38,
      avgClickRate: 18,
      avgConversionRate: 7,
      avgRoi: 280
    }
  }
];

const typeColors = {
  email: 'bg-blue-100 text-blue-800 border-blue-200',
  sms: 'bg-green-100 text-green-800 border-green-200',
  social: 'bg-purple-100 text-purple-800 border-purple-200',
  'direct-mail': 'bg-orange-100 text-orange-800 border-orange-200',
  webinar: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  event: 'bg-pink-100 text-pink-800 border-pink-200',
  'multi-channel': 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 border-gray-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  urgent: 'bg-red-100 text-red-800 border-red-200'
};

export default function CampaignManager() {
  const [selectedTab, setSelectedTab] = useState('campaigns');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [objectiveFilter, setObjectiveFilter] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const filteredCampaigns = useMemo(() => {
    return mockCampaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
      const matchesObjective = objectiveFilter === 'all' || campaign.objective === objectiveFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesObjective;
    });
  }, [searchQuery, statusFilter, typeFilter, objectiveFilter]);

  const campaignStats = useMemo(() => {
    const total = mockCampaigns.length;
    const active = mockCampaigns.filter(c => c.status === 'active').length;
    const completed = mockCampaigns.filter(c => c.status === 'completed').length;
    const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = mockCampaigns.reduce((sum, c) => sum + c.performance.revenue, 0);
    const avgRoi = mockCampaigns.length > 0 ? mockCampaigns.reduce((sum, c) => sum + c.performance.roi, 0) / mockCampaigns.length : 0;
    const totalLeads = mockCampaigns.reduce((sum, c) => sum + c.targetAudience.totalLeads, 0);
    const totalConverted = mockCampaigns.reduce((sum, c) => sum + c.performance.converted, 0);
    
    return { 
      total, active, completed, totalBudget, totalSpent, totalRevenue, avgRoi, totalLeads, totalConverted,
      conversionRate: totalLeads > 0 ? (totalConverted / totalLeads) * 100 : 0,
      budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
    };
  }, []);

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedCampaign(campaign)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Users className="h-4 w-4" />
              <span>{campaign.targetAudience.totalLeads.toLocaleString()} leads</span>
              <DollarSign className="h-4 w-4 ml-2" />
              <span>${campaign.budget.toLocaleString()} budget</span>
              <Calendar className="h-4 w-4 ml-2" />
              <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
            <Badge className={priorityColors[campaign.priority]}>{campaign.priority}</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Badge className={typeColors[campaign.type]}>{campaign.type}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Target className="h-4 w-4" />
            <span className="capitalize">{campaign.objective}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>ROI: {campaign.performance.roi}%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{campaign.performance.sent.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Sent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{campaign.performance.openRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Opened</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{campaign.performance.clickRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Clicked</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">{campaign.performance.converted}</div>
            <div className="text-xs text-gray-600">Converted</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Progress value={(campaign.spent / campaign.budget) * 100} className="w-24 h-2" />
            <span className="text-sm text-gray-500">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {campaign.automation.isAutomated && <Zap className="h-4 w-4 text-yellow-600" />}
            {campaign.channels.length > 1 && <Globe className="h-4 w-4 text-blue-600" />}
            <span className="text-sm text-gray-500">by {campaign.createdBy}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TemplateCard = ({ template }: { template: CampaignTemplate }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <Badge className={typeColors[template.type]}>{template.type}</Badge>
              <span className="capitalize">{template.category}</span>
              <span>{template.estimatedDuration} days</span>
              <span>Used {template.usageCount} times</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={template.isActive} />
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{template.performance.avgOpenRate}%</div>
            <div className="text-xs text-gray-600">Avg Open Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{template.performance.avgClickRate}%</div>
            <div className="text-xs text-gray-600">Avg Click Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{template.performance.avgConversionRate}%</div>
            <div className="text-xs text-gray-600">Avg Conversion</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Target: {template.targetAudience}</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm">
              Use Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Megaphone className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Play className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average ROI</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.avgRoi.toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{campaignStats.conversionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Budget</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${campaignStats.totalBudget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Spent</span>
                <span className="text-lg font-bold text-orange-600">
                  ${campaignStats.totalSpent.toLocaleString()}
                </span>
              </div>
              <Progress value={campaignStats.budgetUtilization} className="h-3" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Utilization</span>
                <span className="font-medium">{campaignStats.budgetUtilization.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Revenue</span>
                <span className="text-2xl font-bold text-green-600">
                  ${campaignStats.totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                mockCampaigns.reduce((acc, campaign) => {
                  if (!acc[campaign.type]) {
                    acc[campaign.type] = {
                      count: 0,
                      avgRoi: 0,
                      avgConversion: 0,
                      totalRevenue: 0
                    };
                  }
                  acc[campaign.type].count++;
                  acc[campaign.type].avgRoi += campaign.performance.roi;
                  acc[campaign.type].avgConversion += campaign.performance.conversionRate;
                  acc[campaign.type].totalRevenue += campaign.performance.revenue;
                  return acc;
                }, {} as Record<string, any>)
              ).map(([type, stats]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Badge className={typeColors[type as keyof typeof typeColors]}>
                      {type}
                    </Badge>
                    <span className="text-sm">{stats.count} campaigns</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{(stats.avgRoi / stats.count).toFixed(0)}%</div>
                      <div className="text-xs text-gray-600">Avg ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const CreateCampaignDialog = () => (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>
              <div>
                <Label htmlFor="objective">Objective</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="nurturing">Lead Nurturing</SelectItem>
                    <SelectItem value="qualification">Lead Qualification</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="retention">Retention</SelectItem>
                    <SelectItem value="reactivation">Reactivation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={3} placeholder="Describe your campaign" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Campaign Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="multi-channel">Multi-Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="10000" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="datetime-local" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="datetime-local" />
              </div>
            </div>
            
            <div>
              <Label>Content</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input id="subject" placeholder="Campaign subject line" />
                </div>
                <div>
                  <Label htmlFor="ctaText">CTA Text</Label>
                  <Input id="ctaText" placeholder="Call to action text" />
                </div>
              </div>
              <div className="mt-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={4} placeholder="Campaign message content" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Target Audience</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="leadScore">Lead Score Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="industry">Industries</Label>
                  <Input placeholder="Select industries..." />
                </div>
                
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="50-200">50-200 employees</SelectItem>
                      <SelectItem value="200-1000">200-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="leadSource">Lead Sources</Label>
                  <Input placeholder="Select sources..." />
                </div>
              </div>
            </div>
            
            <div>
              <Label>Automation Settings</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="automated" />
                  <Label htmlFor="automated">Enable automation</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="tracking" defaultChecked />
                  <Label htmlFor="tracking">Track performance</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="abtest" />
                  <Label htmlFor="abtest">A/B test content</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="personalize" defaultChecked />
                  <Label htmlFor="personalize">Personalize content</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="template">Use Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome">Welcome Series</SelectItem>
                  <SelectItem value="reactivation">Reactivation Campaign</SelectItem>
                  <SelectItem value="nurturing">Nurturing Sequence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Save as Draft
          </Button>
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Create Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campaign Manager</h1>
              <p className="text-gray-600">Create and manage marketing campaigns</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="multi-channel">Multi-Channel</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={objectiveFilter} onValueChange={setObjectiveFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Objective" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Objectives</SelectItem>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="nurturing">Nurturing</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                    <SelectItem value="retention">Retention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {filteredCampaigns.length} campaigns
                </Badge>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredCampaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
              {filteredCampaigns.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No campaigns found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Campaign Templates</h3>
              <Button onClick={() => setIsTemplateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
            
            <div className="grid gap-6">
              {mockTemplates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockCampaigns.map(campaign => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{campaign.name}</span>
                      <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Sent</span>
                          <span className="font-medium">{campaign.performance.sent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Delivered</span>
                          <span className="font-medium">{campaign.performance.deliveryRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Opened</span>
                          <span className="font-medium">{campaign.performance.openRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Clicked</span>
                          <span className="font-medium">{campaign.performance.clickRate}%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Converted</span>
                          <span className="font-medium">{campaign.performance.converted}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Revenue</span>
                          <span className="font-medium">${campaign.performance.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">ROI</span>
                          <span className="font-medium text-green-600">{campaign.performance.roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Unsubscribed</span>
                          <span className="font-medium">{campaign.performance.unsubscribed}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Budget Utilization</span>
                        <span className="text-sm">${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsView />
          </TabsContent>
        </Tabs>
      </div>

      <CreateCampaignDialog />

      {selectedCampaign && (
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCampaign.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Campaign Overview</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm mb-3">{selectedCampaign.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Type:</strong> {selectedCampaign.type}</p>
                        <p><strong>Objective:</strong> {selectedCampaign.objective}</p>
                        <p><strong>Status:</strong> {selectedCampaign.status}</p>
                      </div>
                      <div>
                        <p><strong>Budget:</strong> ${selectedCampaign.budget.toLocaleString()}</p>
                        <p><strong>Spent:</strong> ${selectedCampaign.spent.toLocaleString()}</p>
                        <p><strong>ROI:</strong> {selectedCampaign.performance.roi}%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedCampaign.performance.sent.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Sent</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{selectedCampaign.performance.openRate}%</div>
                        <div className="text-sm text-gray-600">Open Rate</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedCampaign.performance.clickRate}%</div>
                        <div className="text-sm text-gray-600">Click Rate</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{selectedCampaign.performance.converted}</div>
                        <div className="text-sm text-gray-600">Converted</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Campaign Content</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>Subject:</strong> {selectedCampaign.content.subject}</div>
                      <div><strong>Message:</strong></div>
                      <div className="bg-white rounded p-3 border">{selectedCampaign.content.message}</div>
                      {selectedCampaign.content.ctaText && (
                        <div><strong>CTA:</strong> {selectedCampaign.content.ctaText}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Target Audience</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div><strong>Total Leads:</strong> {selectedCampaign.targetAudience.totalLeads.toLocaleString()}</div>
                      <div><strong>Segments:</strong></div>
                      <div className="flex flex-wrap gap-1">
                        {selectedCampaign.targetAudience.segments.map(segment => (
                          <Badge key={segment} variant="secondary" className="text-xs">{segment}</Badge>
                        ))}
                      </div>
                      {selectedCampaign.targetAudience.criteria.leadScore && (
                        <div><strong>Lead Score:</strong> {selectedCampaign.targetAudience.criteria.leadScore.min}-{selectedCampaign.targetAudience.criteria.leadScore.max}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Channels</h4>
                  <div className="space-y-2">
                    {selectedCampaign.channels.map(channel => (
                      <div key={channel.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={typeColors[channel.type]}>{channel.type}</Badge>
                          <span className="text-sm font-medium">{channel.weight}%</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {channel.settings.frequency && (
                            <div>Frequency: {channel.settings.frequency}</div>
                          )}
                          {channel.settings.sendTime && (
                            <div>Send Time: {channel.settings.sendTime}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedCampaign.automation.isAutomated && (
                  <div>
                    <h4 className="font-medium mb-3">Automation</h4>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">Automated Campaign</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div><strong>Triggers:</strong> {selectedCampaign.automation.triggers.join(', ')}</div>
                        <div><strong>Conditions:</strong> {selectedCampaign.automation.conditions.join(', ')}</div>
                        <div><strong>Actions:</strong> {selectedCampaign.automation.actions.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Campaign
              </Button>
              {selectedCampaign.status === 'active' ? (
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause Campaign
                </Button>
              ) : selectedCampaign.status === 'paused' ? (
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Resume Campaign
                </Button>
              ) : selectedCampaign.status === 'draft' ? (
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Launch Campaign
                </Button>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
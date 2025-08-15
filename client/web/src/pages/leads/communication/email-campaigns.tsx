'use client';

import { useState, useMemo } from 'react';
import {
  Mail,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  TrendingUp,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Send,
  Target,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  type: 'newsletter' | 'promotional' | 'nurturing' | 'follow-up' | 'welcome';
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'completed';
  recipients: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  createdBy: string;
  createdAt: string;
  scheduledAt?: string;
  sentAt?: string;
  template: string;
  segment: string;
  priority: 'low' | 'medium' | 'high';
  budget?: number;
  conversions: number;
  revenue?: number;
}

const mockCampaigns: EmailCampaign[] = [
  {
    id: 'EC001',
    name: 'Q1 Lead Nurturing Campaign',
    subject: 'Discover Your Dream Home - Special Offers Inside',
    type: 'nurturing',
    status: 'completed',
    recipients: 1247,
    openRate: 24.5,
    clickRate: 3.8,
    bounceRate: 1.2,
    unsubscribeRate: 0.8,
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-15',
    scheduledAt: '2024-01-20T09:00:00',
    sentAt: '2024-01-20T09:00:00',
    template: 'Nurturing Template A',
    segment: 'New Leads',
    priority: 'high',
    budget: 500,
    conversions: 12,
    revenue: 180000
  },
  {
    id: 'EC002',
    name: 'Welcome Series - New Subscribers',
    subject: 'Welcome to Buildiyo - Your Journey Starts Here',
    type: 'welcome',
    status: 'sending',
    recipients: 89,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
    createdBy: 'Mike Chen',
    createdAt: '2024-01-18',
    scheduledAt: '2024-01-22T10:30:00',
    template: 'Welcome Series Template',
    segment: 'Recent Subscribers',
    priority: 'medium',
    conversions: 0
  },
  {
    id: 'EC003',
    name: 'Spring Promotion - Limited Time',
    subject: '🌸 Spring Special: 20% Off All Services',
    type: 'promotional',
    status: 'scheduled',
    recipients: 2156,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
    createdBy: 'Lisa Wang',
    createdAt: '2024-01-19',
    scheduledAt: '2024-01-25T08:00:00',
    template: 'Promotional Template B',
    segment: 'Active Prospects',
    priority: 'high',
    budget: 800,
    conversions: 0
  }
];

function getStatusColor(status: EmailCampaign['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-700';
    case 'scheduled': return 'bg-blue-100 text-blue-700';
    case 'sending': return 'bg-yellow-100 text-yellow-700';
    case 'sent': return 'bg-green-100 text-green-700';
    case 'paused': return 'bg-orange-100 text-orange-700';
    case 'completed': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function getPriorityColor(priority: EmailCampaign['priority']) {
  switch (priority) {
    case 'high': return 'text-red-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
}

export default function EmailCampaigns() {
  const [campaigns] = useState(mockCampaigns);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           campaign.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      const matchesTab = selectedTab === 'all' || campaign.type === selectedTab;
      
      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [campaigns, searchQuery, statusFilter, selectedTab]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const activeCampaigns = campaigns.filter(c => ['sending', 'scheduled'].includes(c.status)).length;
    const totalSent = campaigns.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.recipients, 0);
    const avgOpenRate = campaigns.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.openRate, 0) / 
                       campaigns.filter(c => c.status === 'completed').length;
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    
    return {
      activeCampaigns,
      totalSent,
      avgOpenRate: Math.round(avgOpenRate * 10) / 10,
      totalConversions
    };
  }, [campaigns]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Email Campaigns</h1>
          <p className="text-gray-600">Manage and analyze your email marketing campaigns</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">{summaryStats.activeCampaigns}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold">{summaryStats.totalSent.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Send className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold">{summaryStats.avgOpenRate}%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">{summaryStats.totalConversions}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search campaigns..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="sending">Sending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Type Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          <TabsTrigger value="promotional">Promotional</TabsTrigger>
          <TabsTrigger value="nurturing">Nurturing</TabsTrigger>
          <TabsTrigger value="welcome">Welcome</TabsTrigger>
          <TabsTrigger value="follow-up">Follow-up</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {/* Campaign List */}
          <div className="grid gap-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Campaign Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">{campaign.name}</h3>
                            <Badge className={cn("text-xs", getStatusColor(campaign.status))}>
                              {campaign.status}
                            </Badge>
                            <div className={cn("text-xs font-medium", getPriorityColor(campaign.priority))}>
                              {campaign.priority.toUpperCase()}
                            </div>
                          </div>
                          <p className="text-gray-600">{campaign.subject}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span>Recipients: {campaign.recipients.toLocaleString()}</span>
                            <span>•</span>
                            <span>Template: {campaign.template}</span>
                            <span>•</span>
                            <span>Created by {campaign.createdBy}</span>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            {campaign.status === 'sending' && (
                              <DropdownMenuItem>
                                <Pause className="h-4 w-4 mr-2" />
                                Pause Campaign
                              </DropdownMenuItem>
                            )}
                            {campaign.status === 'paused' && (
                              <DropdownMenuItem>
                                <Play className="h-4 w-4 mr-2" />
                                Resume Campaign
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Campaign Metrics */}
                      {campaign.status === 'completed' && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-blue-600">{campaign.openRate}%</div>
                            <div className="text-xs text-gray-500">Open Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-green-600">{campaign.clickRate}%</div>
                            <div className="text-xs text-gray-500">Click Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-purple-600">{campaign.conversions}</div>
                            <div className="text-xs text-gray-500">Conversions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-emerald-600">
                              ${campaign.revenue?.toLocaleString() || '0'}
                            </div>
                            <div className="text-xs text-gray-500">Revenue</div>
                          </div>
                        </div>
                      )}

                      {/* Progress for sending campaigns */}
                      {campaign.status === 'sending' && (
                        <div className="pt-3 border-t">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Sending Progress</span>
                            <span>65% completed</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? "Try adjusting your search or filters"
                    : "Create your first email campaign to get started"
                  }
                </p>
                {(!searchQuery && statusFilter === 'all') && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
'use client';

import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Calendar,
  User,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Opportunity {
  id: string;
  name: string;
  company: string;
  contactPerson: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  closeDate: string;
  createdDate: string;
  lastActivity: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  source: string;
  type: 'new-business' | 'existing-customer' | 'referral';
  priority: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  expectedRevenue: number;
  daysInStage: number;
  activities: number;
  nextAction: string;
}

const mockOpportunities: Opportunity[] = [
  {
    id: 'OPP001',
    name: 'Commercial Plaza Development',
    company: 'Metro Development Corp',
    contactPerson: 'Sarah Johnson',
    value: 2500000,
    stage: 'proposal',
    probability: 75,
    closeDate: '2024-02-15',
    createdDate: '2024-01-10',
    lastActivity: '2024-01-28',
    assignedTo: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg'
    },
    source: 'Website Inquiry',
    type: 'new-business',
    priority: 'high',
    tags: ['commercial', 'large-project'],
    expectedRevenue: 1875000,
    daysInStage: 15,
    activities: 12,
    nextAction: 'Follow up on proposal feedback'
  },
  {
    id: 'OPP002',
    name: 'Residential Complex Phase 2',
    company: 'Green Valley Homes',
    contactPerson: 'David Martinez',
    value: 1800000,
    stage: 'negotiation',
    probability: 85,
    closeDate: '2024-02-28',
    createdDate: '2023-12-15',
    lastActivity: '2024-01-29',
    assignedTo: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg'
    },
    source: 'Referral',
    type: 'existing-customer',
    priority: 'critical',
    tags: ['residential', 'repeat-customer'],
    expectedRevenue: 1530000,
    daysInStage: 22,
    activities: 18,
    nextAction: 'Contract review meeting'
  },
  {
    id: 'OPP003',
    name: 'Office Building Renovation',
    company: 'TechStart Inc',
    contactPerson: 'Emily Chen',
    value: 950000,
    stage: 'qualification',
    probability: 45,
    closeDate: '2024-03-30',
    createdDate: '2024-01-20',
    lastActivity: '2024-01-27',
    assignedTo: {
      name: 'James Wilson',
      avatar: '/avatars/james.jpg'
    },
    source: 'Cold Outreach',
    type: 'new-business',
    priority: 'medium',
    tags: ['renovation', 'office'],
    expectedRevenue: 427500,
    daysInStage: 8,
    activities: 5,
    nextAction: 'Site visit scheduled'
  }
];

function getStageColor(stage: Opportunity['stage']) {
  switch (stage) {
    case 'prospecting': return 'bg-gray-100 text-gray-800';
    case 'qualification': return 'bg-blue-100 text-blue-800';
    case 'proposal': return 'bg-yellow-100 text-yellow-800';
    case 'negotiation': return 'bg-orange-100 text-orange-800';
    case 'closed-won': return 'bg-green-100 text-green-800';
    case 'closed-lost': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: Opportunity['priority']) {
  switch (priority) {
    case 'critical': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function OpportunityManagement() {
  const [opportunities] = useState(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           opp.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === 'all' || opp.stage === stageFilter;
      const matchesPriority = priorityFilter === 'all' || opp.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'all' || opp.assignedTo.name === assigneeFilter;
      
      return matchesSearch && matchesStage && matchesPriority && matchesAssignee;
    });
  }, [opportunities, searchQuery, stageFilter, priorityFilter, assigneeFilter]);

  const summaryStats = useMemo(() => {
    const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
    const weightedValue = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
    const avgDealSize = totalValue / opportunities.length;
    const winRate = (opportunities.filter(opp => opp.stage === 'closed-won').length / 
                    opportunities.filter(opp => ['closed-won', 'closed-lost'].includes(opp.stage)).length) * 100;

    return {
      totalOpportunities: opportunities.length,
      totalPipelineValue: totalValue,
      weightedPipelineValue: weightedValue,
      avgDealSize,
      winRate: Math.round(winRate * 10) / 10 || 0
    };
  }, [opportunities]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Opportunity Management</h1>
          <p className="text-gray-600">Track and manage your sales opportunities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Opportunity
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Opportunities</p>
                <p className="text-2xl font-bold">{summaryStats.totalOpportunities}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold">${(summaryStats.totalPipelineValue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weighted Value</p>
                <p className="text-2xl font-bold">${(summaryStats.weightedPipelineValue / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Deal Size</p>
                <p className="text-2xl font-bold">${(summaryStats.avgDealSize / 1000).toFixed(0)}K</p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold">{summaryStats.winRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search opportunities..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Stages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="prospecting">Prospecting</SelectItem>
            <SelectItem value="qualification">Qualification</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed-won">Closed Won</SelectItem>
            <SelectItem value="closed-lost">Closed Lost</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Assignees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            <SelectItem value="Mike Chen">Mike Chen</SelectItem>
            <SelectItem value="Lisa Wang">Lisa Wang</SelectItem>
            <SelectItem value="James Wilson">James Wilson</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{opportunity.name}</h3>
                      <p className="text-gray-600">{opportunity.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>Contact: {opportunity.contactPerson}</span>
                        <span>•</span>
                        <span>Source: {opportunity.source}</span>
                        <span>•</span>
                        <span>Created: {new Date(opportunity.createdDate).toLocaleDateString()}</span>
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
                          Edit Opportunity
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Activity
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getStageColor(opportunity.stage)}>
                      {opportunity.stage.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(opportunity.priority)}>
                      {opportunity.priority.toUpperCase()}
                    </Badge>
                    {opportunity.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Opportunity Value</p>
                      <p className="text-xl font-bold text-green-600">
                        ${opportunity.value.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Revenue</p>
                      <p className="text-lg font-semibold">
                        ${opportunity.expectedRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Close Date</p>
                      <p className="text-lg font-semibold">
                        {new Date(opportunity.closeDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={opportunity.assignedTo.avatar} />
                          <AvatarFallback className="text-xs">
                            {opportunity.assignedTo.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{opportunity.assignedTo.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{opportunity.daysInStage} days in stage</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Probability</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={opportunity.probability} className="w-20 h-2" />
                          <span className="text-sm font-medium">{opportunity.probability}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-gray-600">
                      <strong>Next Action:</strong> {opportunity.nextAction}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOpportunities.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || stageFilter !== 'all' || priorityFilter !== 'all'
                  ? "Try adjusting your search or filters"
                  : "Create your first opportunity to get started"
                }
              </p>
              {(!searchQuery && stageFilter === 'all' && priorityFilter === 'all') && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Opportunity
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
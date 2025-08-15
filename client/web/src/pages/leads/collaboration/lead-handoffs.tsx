import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search,
  ArrowRightCircle,
  Users,
  User,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Star,
  Filter,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  TrendingUp,
  Activity,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  Building,
  MapPin,
  DollarSign,
  Percent,
  Target,
  Zap,
  History,
  Archive,
  Send,
  UserPlus,
  UserMinus,
  Bell,
  Settings,
  Download,
  Upload,
  Copy,
  Share
} from 'lucide-react';

interface LeadHandoff {
  id: string;
  leadId: string;
  leadName: string;
  leadCompany: string;
  leadEmail: string;
  leadPhone: string;
  leadValue: number;
  leadStage: string;
  leadSource: string;
  fromUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    department: string;
  };
  toUser: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    department: string;
  };
  reason: string;
  notes: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  type: 'transfer' | 'backup' | 'collaboration' | 'escalation';
  handoffData: {
    leadHistory: HandoffHistoryItem[];
    attachments: HandoffAttachment[];
    tags: string[];
    followUpRequired: boolean;
    followUpDate?: string;
    expectedOutcome: string;
  };
  timeline: {
    createdAt: string;
    acceptedAt?: string;
    completedAt?: string;
    rejectedAt?: string;
  };
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  metadata?: {
    automatedHandoff: boolean;
    workloadBalancing: boolean;
    territoryChange: boolean;
    vacationCover: boolean;
  };
}

interface HandoffHistoryItem {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  timestamp: string;
  details?: any;
}

interface HandoffAttachment {
  id: string;
  name: string;
  type: 'document' | 'image' | 'note' | 'email';
  url: string;
  size?: number;
  uploadedAt: string;
  uploadedBy: string;
}

interface HandoffTemplate {
  id: string;
  name: string;
  description: string;
  reason: string;
  notes: string;
  followUpRequired: boolean;
  followUpDays: number;
  tags: string[];
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
}

interface HandoffStats {
  totalHandoffs: number;
  pendingHandoffs: number;
  completedHandoffs: number;
  averageHandoffTime: number;
  successRate: number;
  activeTransfers: number;
  rejectedHandoffs: number;
  automatedHandoffs: number;
}

const LeadHandoffs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [selectedHandoff, setSelectedHandoff] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreatingHandoff, setIsCreatingHandoff] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  // Mock data for handoffs
  const handoffs: LeadHandoff[] = [
    {
      id: 'handoff-001',
      leadId: 'lead-001',
      leadName: 'John Smith',
      leadCompany: 'Tech Solutions Inc',
      leadEmail: 'john@techsolutions.com',
      leadPhone: '+1-555-0123',
      leadValue: 45000,
      leadStage: 'Qualified',
      leadSource: 'Website',
      fromUser: {
        id: 'user-001',
        name: 'Sarah Wilson',
        email: 'sarah@company.com',
        role: 'Sales Rep',
        department: 'Sales'
      },
      toUser: {
        id: 'user-002',
        name: 'Mike Chen',
        email: 'mike@company.com',
        role: 'Senior Sales Rep',
        department: 'Sales'
      },
      reason: 'Territory reassignment due to account growth',
      notes: 'Lead is highly interested in our enterprise solution. Has budget approved for Q2. Previous meetings went well.',
      priority: 'high',
      status: 'pending',
      type: 'transfer',
      handoffData: {
        leadHistory: [
          {
            id: 'hist-001',
            action: 'Lead Created',
            description: 'Lead generated from website form',
            performedBy: 'System',
            timestamp: '2024-01-15T10:00:00Z'
          },
          {
            id: 'hist-002',
            action: 'First Contact',
            description: 'Initial discovery call completed',
            performedBy: 'sarah@company.com',
            timestamp: '2024-01-16T14:30:00Z'
          },
          {
            id: 'hist-003',
            action: 'Meeting Scheduled',
            description: 'Product demo scheduled for next week',
            performedBy: 'sarah@company.com',
            timestamp: '2024-01-17T16:00:00Z'
          }
        ],
        attachments: [
          {
            id: 'att-001',
            name: 'Lead-Discovery-Notes.pdf',
            type: 'document',
            url: '/files/discovery-notes.pdf',
            size: 1024000,
            uploadedAt: '2024-01-17T10:30:00Z',
            uploadedBy: 'sarah@company.com'
          }
        ],
        tags: ['enterprise', 'high-value', 'q2-budget'],
        followUpRequired: true,
        followUpDate: '2024-01-20T10:00:00Z',
        expectedOutcome: 'Demo presentation and proposal preparation'
      },
      timeline: {
        createdAt: '2024-01-18T09:00:00Z'
      },
      createdBy: 'user-001',
      createdAt: '2024-01-18T09:00:00Z',
      metadata: {
        automatedHandoff: false,
        workloadBalancing: false,
        territoryChange: true,
        vacationCover: false
      }
    },
    {
      id: 'handoff-002',
      leadId: 'lead-002',
      leadName: 'Emily Johnson',
      leadCompany: 'Marketing Pro Ltd',
      leadEmail: 'emily@marketingpro.com',
      leadPhone: '+1-555-0124',
      leadValue: 22000,
      leadStage: 'Proposal',
      leadSource: 'Referral',
      fromUser: {
        id: 'user-003',
        name: 'Alex Turner',
        email: 'alex@company.com',
        role: 'Sales Rep',
        department: 'Sales'
      },
      toUser: {
        id: 'user-004',
        name: 'Lisa Davis',
        email: 'lisa@company.com',
        role: 'Account Manager',
        department: 'Account Management'
      },
      reason: 'Lead reached proposal stage, requires account management expertise',
      notes: 'Proposal submitted, waiting for decision. Great relationship established. Budget confirmed.',
      priority: 'normal',
      status: 'accepted',
      type: 'escalation',
      handoffData: {
        leadHistory: [
          {
            id: 'hist-004',
            action: 'Proposal Sent',
            description: 'Comprehensive proposal submitted',
            performedBy: 'alex@company.com',
            timestamp: '2024-01-14T15:00:00Z'
          }
        ],
        attachments: [
          {
            id: 'att-002',
            name: 'Proposal-MarketingPro.pdf',
            type: 'document',
            url: '/files/proposal.pdf',
            size: 2048000,
            uploadedAt: '2024-01-14T15:00:00Z',
            uploadedBy: 'alex@company.com'
          }
        ],
        tags: ['proposal-stage', 'referral', 'mid-value'],
        followUpRequired: true,
        followUpDate: '2024-01-19T14:00:00Z',
        expectedOutcome: 'Contract negotiation and closing'
      },
      timeline: {
        createdAt: '2024-01-17T11:00:00Z',
        acceptedAt: '2024-01-17T14:30:00Z'
      },
      createdBy: 'user-003',
      createdAt: '2024-01-17T11:00:00Z',
      metadata: {
        automatedHandoff: true,
        workloadBalancing: false,
        territoryChange: false,
        vacationCover: false
      }
    },
    {
      id: 'handoff-003',
      leadId: 'lead-003',
      leadName: 'Robert Brown',
      leadCompany: 'Construction Corp',
      leadEmail: 'robert@construction.com',
      leadPhone: '+1-555-0125',
      leadValue: 78000,
      leadStage: 'Negotiation',
      leadSource: 'Cold Call',
      fromUser: {
        id: 'user-002',
        name: 'Mike Chen',
        email: 'mike@company.com',
        role: 'Senior Sales Rep',
        department: 'Sales'
      },
      toUser: {
        id: 'user-005',
        name: 'Jennifer White',
        email: 'jennifer@company.com',
        role: 'Sales Manager',
        department: 'Sales'
      },
      reason: 'High-value deal requires management approval and oversight',
      notes: 'Large construction project. Multiple stakeholders involved. Negotiating contract terms.',
      priority: 'urgent',
      status: 'completed',
      type: 'escalation',
      handoffData: {
        leadHistory: [
          {
            id: 'hist-005',
            action: 'Contract Negotiation',
            description: 'Initial contract terms discussed',
            performedBy: 'mike@company.com',
            timestamp: '2024-01-12T10:00:00Z'
          }
        ],
        attachments: [],
        tags: ['high-value', 'construction', 'negotiation'],
        followUpRequired: false,
        expectedOutcome: 'Contract execution and project kickoff'
      },
      timeline: {
        createdAt: '2024-01-16T08:00:00Z',
        acceptedAt: '2024-01-16T10:30:00Z',
        completedAt: '2024-01-17T16:00:00Z'
      },
      createdBy: 'user-002',
      createdAt: '2024-01-16T08:00:00Z',
      metadata: {
        automatedHandoff: false,
        workloadBalancing: false,
        territoryChange: false,
        vacationCover: false
      }
    }
  ];

  // Mock handoff templates
  const templates: HandoffTemplate[] = [
    {
      id: 'template-001',
      name: 'Territory Transfer',
      description: 'Standard template for territory-based lead transfers',
      reason: 'Lead reassignment due to territory changes',
      notes: 'Please review lead history and contact within 24 hours.',
      followUpRequired: true,
      followUpDays: 1,
      tags: ['territory', 'standard'],
      isDefault: true,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    },
    {
      id: 'template-002',
      name: 'Workload Balance',
      description: 'Template for workload balancing handoffs',
      reason: 'Lead redistribution for workload optimization',
      notes: 'This lead has been reassigned to balance team workload.',
      followUpRequired: true,
      followUpDays: 2,
      tags: ['workload', 'balance'],
      isDefault: false,
      createdBy: 'admin',
      createdAt: '2024-01-01T10:00:00Z'
    }
  ];

  // Mock stats
  const stats: HandoffStats = {
    totalHandoffs: 156,
    pendingHandoffs: 12,
    completedHandoffs: 134,
    averageHandoffTime: 4.2,
    successRate: 94.5,
    activeTransfers: 8,
    rejectedHandoffs: 10,
    automatedHandoffs: 89
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'transfer': return ArrowRightCircle;
      case 'backup': return Users;
      case 'collaboration': return MessageSquare;
      case 'escalation': return TrendingUp;
      default: return ArrowRightCircle;
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredHandoffs = handoffs.filter(handoff => {
    const matchesSearch = 
      handoff.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      handoff.leadCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      handoff.fromUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      handoff.toUser.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || handoff.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || handoff.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAcceptHandoff = (handoffId: string) => {
    console.log('Accepting handoff:', handoffId);
  };

  const handleRejectHandoff = (handoffId: string) => {
    console.log('Rejecting handoff:', handoffId);
  };

  const handleCompleteHandoff = (handoffId: string) => {
    console.log('Completing handoff:', handoffId);
  };

  const createHandoff = () => {
    setIsCreatingHandoff(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lead Handoffs</h1>
          <p className="text-muted-foreground mt-2">
            Manage lead transfers and collaboration between team members
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowTemplates(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button onClick={createHandoff}>
            <Plus className="h-4 w-4 mr-2" />
            New Handoff
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Handoffs</p>
                <p className="text-2xl font-bold">{stats.pendingHandoffs}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Transfers</p>
                <p className="text-2xl font-bold">{stats.activeTransfers}</p>
              </div>
              <ArrowRightCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Handoff Time</p>
                <p className="text-2xl font-bold">{stats.averageHandoffTime}h</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Handoffs</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Lead Handoffs</CardTitle>
              <CardDescription>
                Manage ongoing lead transfers and collaborations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search handoffs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Handoffs List */}
              <div className="space-y-4">
                {filteredHandoffs.map((handoff) => {
                  const TypeIcon = getTypeIcon(handoff.type);
                  
                  return (
                    <Card key={handoff.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <TypeIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              {/* Header Info */}
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {handoff.leadName} - {handoff.leadCompany}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getStatusColor(handoff.status)}>
                                      {handoff.status}
                                    </Badge>
                                    <Badge className={getPriorityColor(handoff.priority)}>
                                      {handoff.priority}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {formatCurrency(handoff.leadValue)}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-muted-foreground">
                                    Created {formatDate(handoff.createdAt)}
                                  </p>
                                  {handoff.handoffData.followUpRequired && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Bell className="h-3 w-3 text-orange-500" />
                                      <span className="text-xs text-orange-600">
                                        Follow-up required
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Transfer Details */}
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{handoff.fromUser.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {handoff.fromUser.role}
                                    </p>
                                  </div>
                                </div>

                                <ArrowRightCircle className="h-5 w-5 text-muted-foreground" />

                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{handoff.toUser.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {handoff.toUser.role}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Reason and Notes */}
                              <div className="space-y-2">
                                <div>
                                  <p className="text-sm font-medium">Reason:</p>
                                  <p className="text-sm text-muted-foreground">
                                    {handoff.reason}
                                  </p>
                                </div>
                                {handoff.notes && (
                                  <div>
                                    <p className="text-sm font-medium">Notes:</p>
                                    <p className="text-sm text-muted-foreground">
                                      {handoff.notes}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Tags and Metadata */}
                              <div className="flex items-center gap-2 flex-wrap">
                                {handoff.handoffData.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {handoff.metadata?.automatedHandoff && (
                                  <Badge variant="outline" className="text-xs">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Automated
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 ml-4">
                            {handoff.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleAcceptHandoff(handoff.id)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRejectHandoff(handoff.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {handoff.status === 'accepted' && (
                              <Button 
                                size="sm"
                                onClick={() => handleCompleteHandoff(handoff.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {filteredHandoffs.length === 0 && (
                <div className="text-center py-12">
                  <ArrowRightCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No handoffs found</h3>
                  <p className="text-muted-foreground mt-2">
                    No handoffs match your current filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>
                Handoffs waiting for your acceptance or rejection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {handoffs.filter(h => h.status === 'pending').map((handoff) => (
                  <Card key={handoff.id} className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {handoff.leadName} - {handoff.leadCompany}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            From: {handoff.fromUser.name}
                          </p>
                          <p className="text-sm text-orange-600 mt-1">
                            {handoff.reason}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={() => handleAcceptHandoff(handoff.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRejectHandoff(handoff.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Handoffs</CardTitle>
              <CardDescription>
                Successfully completed lead transfers and handoffs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {handoffs.filter(h => h.status === 'completed').map((handoff) => (
                  <Card key={handoff.id} className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {handoff.leadName} - {handoff.leadCompany}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {handoff.fromUser.name} → {handoff.toUser.name}
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            Completed {formatDate(handoff.timeline.completedAt!)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Handoff Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Handoffs</span>
                    <Badge>{stats.totalHandoffs}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Success Rate</span>
                    <Badge className="bg-green-100 text-green-800">
                      {stats.successRate}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Time</span>
                    <Badge>{stats.averageHandoffTime} hours</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Automated Handoffs</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {stats.automatedHandoffs}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Handoff Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowRightCircle className="h-4 w-4 text-blue-600" />
                      <span>Transfers</span>
                    </div>
                    <Badge>67</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span>Escalations</span>
                    </div>
                    <Badge>34</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>Collaborations</span>
                    </div>
                    <Badge>28</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-orange-600" />
                      <span>Backup Coverage</span>
                    </div>
                    <Badge>27</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadHandoffs;
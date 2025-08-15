'use client';

import { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Share2,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Building,
  Mail,
  Phone,
  PenTool,
  Shield,
  Award,
  Activity,
  Target,
  TrendingUp,
  Handshake,
  FileSignature,
  Lock,
  Unlock,
  Copy,
  Archive,
  Trash2,
  ExternalLink,
  AlertCircle,
  BookOpen,
  CreditCard
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
import { cn } from '@/lib/utils';

interface Contract {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAvatar?: string;
  dealId: string;
  proposalId?: string;
  contractValue: number;
  status: 'draft' | 'review' | 'pending-signature' | 'partially-signed' | 'fully-signed' | 'executed' | 'expired' | 'terminated' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  contractType: 'construction' | 'service' | 'maintenance' | 'consulting' | 'supply' | 'framework' | 'amendment';
  createdBy: {
    name: string;
    avatar?: string;
    email: string;
  };
  assignedTo?: {
    name: string;
    avatar?: string;
    email: string;
  };
  legalReviewer?: {
    name: string;
    avatar?: string;
    email: string;
  };
  createdDate: string;
  lastModified: string;
  effectiveDate: string;
  expirationDate: string;
  signedDate?: string;
  completionDate?: string;
  version: number;
  template: string;
  clauses: ContractClause[];
  signatures: ContractSignature[];
  amendments: ContractAmendment[];
  attachments: string[];
  milestones: ContractMilestone[];
  paymentTerms: {
    type: 'milestone' | 'monthly' | 'upfront' | 'completion' | 'custom';
    schedule: PaymentSchedule[];
    currency: string;
    lateFee: number;
    gracePeriod: number; // in days
  };
  risks: ContractRisk[];
  complianceChecks: ComplianceCheck[];
  notifications: ContractNotification[];
  tags: string[];
  customFields?: Record<string, any>;
}

interface ContractClause {
  id: string;
  type: 'scope' | 'payment' | 'timeline' | 'liability' | 'termination' | 'warranty' | 'confidentiality' | 'ip' | 'custom';
  title: string;
  content: string;
  isStandard: boolean;
  isRequired: boolean;
  lastModified: string;
  modifiedBy: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface ContractSignature {
  id: string;
  signerName: string;
  signerRole: string;
  signerEmail: string;
  signerType: 'client' | 'internal' | 'witness' | 'guarantor';
  status: 'pending' | 'signed' | 'declined';
  signedDate?: string;
  ipAddress?: string;
  deviceInfo?: string;
  signatureMethod: 'digital' | 'electronic' | 'wet' | 'esign';
  isRequired: boolean;
  order: number;
}

interface ContractAmendment {
  id: string;
  title: string;
  description: string;
  type: 'scope-change' | 'price-adjustment' | 'timeline-extension' | 'terms-modification' | 'other';
  valueImpact: number;
  timelineImpact: number; // in days
  createdBy: string;
  createdDate: string;
  approvedBy?: string;
  approvedDate?: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'executed';
}

interface ContractMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completionDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
  paymentAmount: number;
  dependencies: string[];
  deliverables: string[];
  approver: string;
}

interface PaymentSchedule {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  milestoneId?: string;
}

interface ContractRisk {
  id: string;
  type: 'financial' | 'legal' | 'operational' | 'timeline' | 'quality' | 'regulatory';
  title: string;
  description: string;
  probability: number; // 1-100
  impact: number; // 1-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  owner: string;
  status: 'identified' | 'mitigated' | 'accepted' | 'transferred' | 'avoided';
}

interface ComplianceCheck {
  id: string;
  type: 'legal' | 'financial' | 'regulatory' | 'internal' | 'quality';
  requirement: string;
  status: 'pending' | 'compliant' | 'non-compliant' | 'waived';
  checkedBy?: string;
  checkedDate?: string;
  notes?: string;
  dueDate: string;
}

interface ContractNotification {
  id: string;
  type: 'expiry-warning' | 'payment-due' | 'milestone-due' | 'signature-required' | 'amendment-required' | 'renewal-notice';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  sentDate?: string;
  recipients: string[];
  status: 'scheduled' | 'sent' | 'delivered' | 'read' | 'dismissed';
}

interface ContractMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  bgColor: string;
  format: 'number' | 'percentage' | 'currency' | 'days';
}

const contractMetrics: ContractMetric[] = [
  {
    id: 'total-contracts',
    title: 'Total Contracts',
    value: 127,
    change: 12.3,
    trend: 'up',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    format: 'number'
  },
  {
    id: 'active-contracts',
    title: 'Active Contracts',
    value: 89,
    change: 8.7,
    trend: 'up',
    icon: Activity,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    format: 'number'
  },
  {
    id: 'contract-value',
    title: 'Total Contract Value',
    value: 45800000,
    change: 18.5,
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    format: 'currency'
  },
  {
    id: 'avg-cycle-time',
    title: 'Avg Cycle Time',
    value: 12.5,
    change: -15.2,
    trend: 'down',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    format: 'days'
  },
  {
    id: 'pending-signatures',
    title: 'Pending Signatures',
    value: 15,
    change: -8.3,
    trend: 'down',
    icon: FileSignature,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    format: 'number'
  },
  {
    id: 'compliance-rate',
    title: 'Compliance Rate',
    value: 94.2,
    change: 2.1,
    trend: 'up',
    icon: Shield,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    format: 'percentage'
  }
];

const mockContracts: Contract[] = [
  {
    id: 'CONT001',
    title: 'Metro Plaza Commercial Development Contract',
    description: 'Master construction contract for the Metro Plaza commercial development project',
    clientName: 'Sarah Martinez',
    clientCompany: 'Metro Development Corp',
    clientEmail: 'sarah.m@metrodev.com',
    clientPhone: '+1 (555) 123-4567',
    clientAvatar: '/avatars/sarah-m.jpg',
    dealId: 'DEAL001',
    proposalId: 'PROP001',
    contractValue: 2500000,
    status: 'pending-signature',
    priority: 'high',
    contractType: 'construction',
    createdBy: {
      name: 'Mike Chen',
      avatar: '/avatars/mike.jpg',
      email: 'mike.c@buildiyo.com'
    },
    assignedTo: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    legalReviewer: {
      name: 'David Johnson',
      avatar: '/avatars/david-j.jpg',
      email: 'david.j@buildiyo.com'
    },
    createdDate: '2024-01-20',
    lastModified: '2024-01-30',
    effectiveDate: '2024-02-15',
    expirationDate: '2024-12-31',
    version: 2,
    template: 'Commercial Construction Master Agreement',
    clauses: [
      {
        id: 'CL001',
        type: 'scope',
        title: 'Project Scope and Deliverables',
        content: 'Detailed scope of work for commercial plaza construction...',
        isStandard: true,
        isRequired: true,
        lastModified: '2024-01-30',
        modifiedBy: 'Mike Chen',
        riskLevel: 'medium'
      }
    ],
    signatures: [
      {
        id: 'SIG001',
        signerName: 'Sarah Martinez',
        signerRole: 'CEO',
        signerEmail: 'sarah.m@metrodev.com',
        signerType: 'client',
        status: 'pending',
        signatureMethod: 'digital',
        isRequired: true,
        order: 1
      },
      {
        id: 'SIG002',
        signerName: 'Mike Chen',
        signerRole: 'Project Director',
        signerEmail: 'mike.c@buildiyo.com',
        signerType: 'internal',
        status: 'signed',
        signedDate: '2024-01-30',
        signatureMethod: 'digital',
        isRequired: true,
        order: 2
      }
    ],
    amendments: [],
    attachments: ['contract_v2.pdf', 'project_specifications.pdf', 'insurance_certificates.pdf'],
    milestones: [
      {
        id: 'MS001',
        title: 'Foundation Completion',
        description: 'Complete foundation and basement construction',
        dueDate: '2024-04-15',
        status: 'pending',
        paymentAmount: 500000,
        dependencies: [],
        deliverables: ['Foundation inspection certificate', 'Concrete test results'],
        approver: 'Sarah Martinez'
      },
      {
        id: 'MS002',
        title: 'Structural Framework',
        description: 'Complete steel framework and structural elements',
        dueDate: '2024-07-15',
        status: 'pending',
        paymentAmount: 750000,
        dependencies: ['MS001'],
        deliverables: ['Structural inspection certificate', 'Safety compliance report'],
        approver: 'Sarah Martinez'
      }
    ],
    paymentTerms: {
      type: 'milestone',
      schedule: [
        {
          id: 'PAY001',
          description: 'Contract Signing Payment',
          amount: 250000,
          dueDate: '2024-02-15',
          status: 'pending'
        },
        {
          id: 'PAY002',
          description: 'Foundation Milestone',
          amount: 500000,
          dueDate: '2024-04-15',
          status: 'pending',
          milestoneId: 'MS001'
        }
      ],
      currency: 'USD',
      lateFee: 2.5,
      gracePeriod: 10
    },
    risks: [
      {
        id: 'RISK001',
        type: 'timeline',
        title: 'Weather Delays',
        description: 'Potential delays due to adverse weather conditions',
        probability: 60,
        impact: 70,
        riskLevel: 'medium',
        mitigation: 'Build weather contingency into schedule',
        owner: 'Mike Chen',
        status: 'identified'
      }
    ],
    complianceChecks: [
      {
        id: 'COMP001',
        type: 'legal',
        requirement: 'Contract legal review completion',
        status: 'compliant',
        checkedBy: 'David Johnson',
        checkedDate: '2024-01-29',
        dueDate: '2024-01-30'
      }
    ],
    notifications: [
      {
        id: 'NOT001',
        type: 'signature-required',
        title: 'Contract Signature Required',
        message: 'Sarah Martinez signature required to proceed',
        priority: 'high',
        scheduledDate: '2024-02-01',
        recipients: ['sarah.m@metrodev.com'],
        status: 'scheduled'
      }
    ],
    tags: ['commercial', 'high-value', 'construction', 'metro'],
    customFields: {
      projectType: 'Commercial Plaza',
      permitNumbers: ['BP-2024-001', 'ENV-2024-003'],
      insuranceRequired: '$5M liability coverage'
    }
  },
  {
    id: 'CONT002',
    title: 'Residential Phase 2 Construction Contract',
    description: 'Construction contract for Green Valley residential complex phase 2',
    clientName: 'David Wilson',
    clientCompany: 'Green Valley Homes',
    clientEmail: 'david.w@greenvalley.com',
    clientPhone: '+1 (555) 987-6543',
    clientAvatar: '/avatars/david-w.jpg',
    dealId: 'DEAL002',
    proposalId: 'PROP002',
    contractValue: 1800000,
    status: 'executed',
    priority: 'high',
    contractType: 'construction',
    createdBy: {
      name: 'Lisa Wang',
      avatar: '/avatars/lisa.jpg',
      email: 'lisa.w@buildiyo.com'
    },
    createdDate: '2024-01-10',
    lastModified: '2024-01-25',
    effectiveDate: '2024-02-01',
    expirationDate: '2024-11-30',
    signedDate: '2024-01-25',
    version: 1,
    template: 'Residential Construction Agreement',
    clauses: [],
    signatures: [
      {
        id: 'SIG003',
        signerName: 'David Wilson',
        signerRole: 'Development Director',
        signerEmail: 'david.w@greenvalley.com',
        signerType: 'client',
        status: 'signed',
        signedDate: '2024-01-25',
        signatureMethod: 'digital',
        isRequired: true,
        order: 1
      }
    ],
    amendments: [],
    attachments: ['signed_contract.pdf', 'architectural_plans.pdf'],
    milestones: [],
    paymentTerms: {
      type: 'monthly',
      schedule: [],
      currency: 'USD',
      lateFee: 1.5,
      gracePeriod: 15
    },
    risks: [],
    complianceChecks: [],
    notifications: [],
    tags: ['residential', 'luxury', 'phase-2'],
    customFields: {
      units: '120 residential units',
      targetCompletion: 'Q4 2024'
    }
  },
  {
    id: 'CONT003',
    title: 'Office Renovation Service Agreement',
    description: 'Service agreement for TechStart office building renovation project',
    clientName: 'Emily Rodriguez',
    clientCompany: 'TechStart Inc',
    clientEmail: 'emily.r@techstart.com',
    clientPhone: '+1 (555) 456-7890',
    clientAvatar: '/avatars/emily-r.jpg',
    dealId: 'DEAL003',
    contractValue: 950000,
    status: 'draft',
    priority: 'medium',
    contractType: 'service',
    createdBy: {
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      email: 'james.w@buildiyo.com'
    },
    createdDate: '2024-01-28',
    lastModified: '2024-01-30',
    effectiveDate: '2024-03-01',
    expirationDate: '2024-12-31',
    version: 1,
    template: 'Service Agreement Template',
    clauses: [],
    signatures: [],
    amendments: [],
    attachments: ['draft_agreement.pdf'],
    milestones: [],
    paymentTerms: {
      type: 'milestone',
      schedule: [],
      currency: 'USD',
      lateFee: 2.0,
      gracePeriod: 7
    },
    risks: [],
    complianceChecks: [
      {
        id: 'COMP002',
        type: 'legal',
        requirement: 'Legal review pending',
        status: 'pending',
        dueDate: '2024-02-05'
      }
    ],
    notifications: [],
    tags: ['office', 'renovation', 'tech-company'],
    customFields: {
      floors: '25 floors',
      estimatedOccupancy: '500+ employees'
    }
  }
];

function getStatusColor(status: Contract['status']) {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'review': return 'bg-orange-100 text-orange-800';
    case 'pending-signature': return 'bg-blue-100 text-blue-800';
    case 'partially-signed': return 'bg-purple-100 text-purple-800';
    case 'fully-signed': return 'bg-indigo-100 text-indigo-800';
    case 'executed': return 'bg-green-100 text-green-800';
    case 'expired': return 'bg-gray-100 text-gray-600';
    case 'terminated': return 'bg-red-100 text-red-800';
    case 'completed': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getPriorityColor(priority: Contract['priority']) {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getContractTypeColor(type: Contract['contractType']) {
  switch (type) {
    case 'construction': return 'bg-blue-100 text-blue-800';
    case 'service': return 'bg-green-100 text-green-800';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800';
    case 'consulting': return 'bg-purple-100 text-purple-800';
    case 'supply': return 'bg-orange-100 text-orange-800';
    case 'framework': return 'bg-indigo-100 text-indigo-800';
    case 'amendment': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function formatValue(value: number, format: 'number' | 'percentage' | 'currency' | 'days') {
  switch (format) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return `$${value.toLocaleString()}`;
    case 'days':
      return `${value.toFixed(1)} days`;
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export default function ContractManagement() {
  const [contracts] = useState(mockContracts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredContracts = useMemo(() => {
    return contracts.filter(contract => {
      const matchesSearch = contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contract.clientCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
      const matchesType = typeFilter === 'all' || contract.contractType === typeFilter;
      const matchesPriority = priorityFilter === 'all' || contract.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [contracts, searchQuery, statusFilter, typeFilter, priorityFilter]);

  const summaryStats = useMemo(() => {
    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(c => 
      ['executed', 'fully-signed', 'partially-signed'].includes(c.status)
    ).length;
    const totalValue = contracts.reduce((sum, c) => sum + c.contractValue, 0);
    const pendingSignatures = contracts.reduce((sum, c) => 
      sum + c.signatures.filter(s => s.status === 'pending').length, 0);
    const expiringCount = contracts.filter(c => {
      const expiryDate = new Date(c.expirationDate);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length;

    return {
      totalContracts,
      activeContracts,
      totalValue,
      pendingSignatures,
      expiringCount
    };
  }, [contracts]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contract Management</h1>
          <p className="text-gray-600">Manage contracts, signatures, and compliance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Contract
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {contractMetrics.map((metric) => {
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

      {/* Contract Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Contracts</TabsTrigger>
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
          <TabsTrigger value="all">All Contracts</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Active Contracts Tab */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contracts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="pending-signature">Pending Signature</SelectItem>
                <SelectItem value="fully-signed">Fully Signed</SelectItem>
                <SelectItem value="executed">Executed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="supply">Supply</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Contracts List */}
          <div className="space-y-4">
            {filteredContracts.map((contract) => (
              <Card key={contract.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{contract.title}</h3>
                            <Badge className={cn("text-xs", getStatusColor(contract.status))}>
                              {contract.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getPriorityColor(contract.priority))}>
                              {contract.priority.toUpperCase()}
                            </Badge>
                            <Badge className={cn("text-xs", getContractTypeColor(contract.contractType))}>
                              {contract.contractType}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{contract.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{contract.clientCompany}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{contract.clientName}</span>
                            </div>
                            <span>•</span>
                            <span>Version {contract.version}</span>
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
                              View Contract
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Contract
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileSignature className="h-4 w-4 mr-2" />
                              Request Signatures
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PenTool className="h-4 w-4 mr-2" />
                              Create Amendment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Terminate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-sm text-gray-600">Contract Value</p>
                          <p className="text-xl font-bold text-green-600">
                            ${contract.contractValue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Effective Date</p>
                          <p className="text-lg font-semibold">
                            {new Date(contract.effectiveDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Expiration Date</p>
                          <p className="text-lg font-semibold">
                            {new Date(contract.expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Signatures</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold">
                              {contract.signatures.filter(s => s.status === 'signed').length}/
                              {contract.signatures.length}
                            </span>
                            <Progress 
                              value={(contract.signatures.filter(s => s.status === 'signed').length / contract.signatures.length) * 100} 
                              className="flex-1 h-2" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Signature Status */}
                      {contract.signatures.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Signature Status:</p>
                          <div className="flex flex-wrap gap-2">
                            {contract.signatures.map((signature) => (
                              <div key={signature.id} className="flex items-center space-x-2 text-sm">
                                <span className="text-gray-600">{signature.signerName}:</span>
                                <Badge className={cn("text-xs", 
                                  signature.status === 'signed' ? "bg-green-100 text-green-800" :
                                  signature.status === 'declined' ? "bg-red-100 text-red-800" :
                                  "bg-yellow-100 text-yellow-800"
                                )}>
                                  {signature.status}
                                </Badge>
                                {signature.status === 'signed' && signature.signedDate && (
                                  <span className="text-xs text-gray-500">
                                    ({new Date(signature.signedDate).toLocaleDateString()})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Milestones */}
                      {contract.milestones.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Key Milestones:</p>
                          <div className="space-y-2">
                            {contract.milestones.slice(0, 2).map((milestone) => (
                              <div key={milestone.id} className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-gray-400" />
                                  <span>{milestone.title}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-green-600 font-medium">
                                    ${milestone.paymentAmount.toLocaleString()}
                                  </span>
                                  <span className="text-gray-500">
                                    {new Date(milestone.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                            {contract.milestones.length > 2 && (
                              <p className="text-xs text-gray-500">
                                +{contract.milestones.length - 2} more milestones
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Risk Indicators */}
                      {contract.risks.length > 0 && (
                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium text-gray-700 mb-2">Risk Factors:</p>
                          <div className="flex flex-wrap gap-2">
                            {contract.risks.map((risk) => (
                              <Badge key={risk.id} className={cn("text-xs",
                                risk.riskLevel === 'critical' ? "bg-red-100 text-red-800" :
                                risk.riskLevel === 'high' ? "bg-orange-100 text-orange-800" :
                                risk.riskLevel === 'medium' ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              )}>
                                {risk.title} ({risk.riskLevel})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={contract.createdBy.avatar} />
                              <AvatarFallback className="text-xs">
                                {contract.createdBy.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">{contract.createdBy.name}</span>
                          </div>
                          
                          {contract.assignedTo && (
                            <>
                              <span className="text-gray-400">→</span>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={contract.assignedTo.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {contract.assignedTo.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-600">{contract.assignedTo.name}</span>
                              </div>
                            </>
                          )}
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <span>Modified: {new Date(contract.lastModified).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {contract.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredContracts.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No contracts found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' || priorityFilter !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Create your first contract to get started"
                    }
                  </p>
                  {(!searchQuery && statusFilter === 'all' && typeFilter === 'all' && priorityFilter === 'all') && (
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Contract
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Pending Actions Tab */}
        <TabsContent value="pending" className="space-y-6">
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Pending actions and approvals would be displayed here</p>
          </div>
        </TabsContent>

        {/* All Contracts Tab */}
        <TabsContent value="all" className="space-y-6">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Complete contracts archive would be displayed here</p>
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Compliance tracking and audit trails would be displayed here</p>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Contract templates library would be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
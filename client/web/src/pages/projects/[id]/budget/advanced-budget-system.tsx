import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Calendar,
  FileText,
  Download,
  Upload,
  Plus,
  Filter,
  Search,
  MoreVertical,
  Receipt,
  CreditCard,
  Wallet,
  Building2,
  Users,
  Package,
  Truck,
  Wrench,
  HardHat,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  Banknote,
  PiggyBank,
  Target,
  Briefcase,
  Home,
  Paintbrush,
  Ruler,
  Hammer,
  Shield,
  Award,
  Star,
  ChevronRight,
  CircleDollarSign,
  Calculator,
  FileCheck,
  UserCheck,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Flag,
  MapPin,
  GitBranch,
  Layers,
  Database,
  Bell,
  Edit,
  Trash2,
  Eye,
  Send,
  Check,
  X,
  RefreshCw,
  FileDown,
  FilePlus,
  History,
  Printer,
  Mail,
  Phone,
  Link,
  ExternalLink,
  Copy,
  Share2,
  Settings,
  HelpCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Percent
} from 'lucide-react';

// Enhanced Types
interface ProjectStage {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  committed: number;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
  completion: number;
  milestones: Milestone[];
  risks: Risk[];
  dependencies: string[];
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'upcoming' | 'overdue';
  category: 'construction' | 'architecture' | 'interior' | 'other';
  description: string;
  documents: Document[];
  approvals: Approval[];
}

interface PaymentDetail {
  id: string;
  date: string;
  category: string;
  subCategory: string;
  vendor: string;
  description: string;
  amount: number;
  tax: number;
  totalAmount: number;
  status: 'paid' | 'approved' | 'pending' | 'rejected' | 'scheduled';
  invoiceNo: string;
  poNumber?: string;
  approvedBy?: string;
  paidOn?: string;
  dueDate: string;
  paymentMethod?: string;
  transactionId?: string;
  bankDetails?: BankDetails;
  attachments: string[];
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedDate: string;
}

interface Approval {
  id: string;
  approverName: string;
  approverRole: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
  comments?: string;
}

interface Risk {
  id: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  mitigation: string;
}

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  panNumber: string;
  totalBusiness: number;
  pendingAmount: number;
  rating: number;
}

export default function AdvancedBudgetSystem() {
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('this-month');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentDetail | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Project Budget Data
  const totalProjectBudget = 250000000;
  const totalSpent = 87500000;
  const totalCommitted = 45000000;
  const totalPending = 12500000;
  const totalAvailable = totalProjectBudget - totalSpent - totalCommitted - totalPending;
  const overallProgress = ((totalSpent + totalCommitted) / totalProjectBudget) * 100;

  // Enhanced Project Stages
  const projectStages: ProjectStage[] = [
    {
      id: 'stage1',
      name: 'Foundation & Structure',
      description: 'Site preparation, foundation laying, and structural framework',
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      budget: 75000000,
      spent: 65000000,
      committed: 5000000,
      status: 'completed',
      completion: 100,
      dependencies: [],
      risks: [
        {
          id: 'r1',
          description: 'Weather delays during monsoon',
          impact: 'high',
          probability: 'medium',
          mitigation: 'Schedule critical work before monsoon season'
        }
      ],
      milestones: [
        {
          id: 'm1',
          name: 'Site Clearance & Excavation',
          date: '2024-01-15',
          amount: 5000000,
          status: 'paid',
          category: 'construction',
          description: 'Site preparation and excavation work',
          documents: [
            {
              id: 'd1',
              name: 'Excavation Report.pdf',
              type: 'pdf',
              url: '/documents/excavation-report.pdf',
              uploadedDate: '2024-01-16'
            }
          ],
          approvals: [
            {
              id: 'a1',
              approverName: 'Rajesh Kumar',
              approverRole: 'Project Manager',
              status: 'approved',
              date: '2024-01-14',
              comments: 'Approved as per plan'
            }
          ]
        },
        {
          id: 'm2',
          name: 'Foundation Laying',
          date: '2024-02-01',
          amount: 15000000,
          status: 'paid',
          category: 'construction',
          description: 'Foundation and basement work',
          documents: [],
          approvals: [
            {
              id: 'a2',
              approverName: 'Amit Sharma',
              approverRole: 'Chief Engineer',
              status: 'approved',
              date: '2024-01-31'
            }
          ]
        }
      ]
    },
    {
      id: 'stage2',
      name: 'Building Construction',
      description: 'Walls, roofing, and external structure completion',
      startDate: '2024-05-01',
      endDate: '2024-08-31',
      budget: 80000000,
      spent: 22500000,
      committed: 20000000,
      status: 'in-progress',
      completion: 35,
      dependencies: ['stage1'],
      risks: [
        {
          id: 'r2',
          description: 'Material price fluctuation',
          impact: 'medium',
          probability: 'high',
          mitigation: 'Lock in prices with advance orders'
        },
        {
          id: 'r3',
          description: 'Labor shortage',
          impact: 'medium',
          probability: 'medium',
          mitigation: 'Maintain backup contractor list'
        }
      ],
      milestones: [
        {
          id: 'm5',
          name: 'Brick Work - Ground Floor',
          date: '2024-05-15',
          amount: 10000000,
          status: 'paid',
          category: 'construction',
          description: 'Ground floor brick work and walls',
          documents: [],
          approvals: []
        },
        {
          id: 'm6',
          name: 'First Floor Slab Casting',
          date: '2024-06-30',
          amount: 12000000,
          status: 'pending',
          category: 'construction',
          description: 'First floor slab casting and curing',
          documents: [],
          approvals: [
            {
              id: 'a3',
              approverName: 'Rajesh Kumar',
              approverRole: 'Project Manager',
              status: 'pending',
              date: '2024-06-25'
            }
          ]
        }
      ]
    }
  ];

  // Vendor Database
  const vendors: Vendor[] = [
    {
      id: 'v1',
      name: 'UltraTech Cement Ltd',
      category: 'Materials',
      contactPerson: 'Suresh Patel',
      phone: '+91 9876543210',
      email: 'suresh@ultratech.com',
      address: 'Industrial Area, Sector 5, Mumbai',
      gstNumber: '27AABCU9603R1ZX',
      panNumber: 'AABCU9603R',
      totalBusiness: 5000000,
      pendingAmount: 250000,
      rating: 4.5
    },
    {
      id: 'v2',
      name: 'Tata Steel Limited',
      category: 'Materials',
      contactPerson: 'Vikram Singh',
      phone: '+91 9876543211',
      email: 'vikram@tatasteel.com',
      address: 'Steel City, Jamshedpur',
      gstNumber: '27AALCT1234R1ZX',
      panNumber: 'AALCT1234R',
      totalBusiness: 8000000,
      pendingAmount: 650000,
      rating: 4.8
    },
    {
      id: 'v3',
      name: 'ABC Construction Contractors',
      category: 'Labor',
      contactPerson: 'Mohammed Ali',
      phone: '+91 9876543212',
      email: 'ali@abcconstruction.com',
      address: 'Construction House, Delhi',
      gstNumber: '07AABCA1234R1ZX',
      panNumber: 'AABCA1234R',
      totalBusiness: 15000000,
      pendingAmount: 1250000,
      rating: 4.2
    }
  ];

  // Enhanced Payment Details with all fields
  const upcomingPayments: PaymentDetail[] = [
    {
      id: 'up1',
      date: '2024-01-20',
      category: 'Materials',
      subCategory: 'Cement',
      vendor: 'UltraTech Cement Ltd',
      description: 'Cement supply for roof casting - 500 bags Grade 53',
      amount: 225000,
      tax: 25000,
      totalAmount: 250000,
      status: 'scheduled',
      invoiceNo: 'UTC/2024/0145',
      poNumber: 'PO/2024/0089',
      dueDate: '2024-01-20',
      paymentMethod: 'Bank Transfer',
      bankDetails: {
        bankName: 'HDFC Bank',
        accountNumber: '50200012345678',
        ifscCode: 'HDFC0001234',
        branch: 'Mumbai Main Branch'
      },
      attachments: ['invoice.pdf', 'po.pdf']
    },
    {
      id: 'up2',
      date: '2024-01-22',
      category: 'Labor',
      subCategory: 'Skilled Workers',
      vendor: 'Labor Contractor - Team A',
      description: 'Weekly wages for 25 skilled workers + 10 helpers',
      amount: 175000,
      tax: 12500,
      totalAmount: 187500,
      status: 'pending',
      invoiceNo: 'WAGE/2024/W03',
      dueDate: '2024-01-22',
      paymentMethod: 'Cash',
      attachments: ['attendance.xlsx']
    },
    {
      id: 'up3',
      date: '2024-01-25',
      category: 'Architecture',
      subCategory: 'Consultation',
      vendor: 'Design Associates Pvt Ltd',
      description: 'Monthly consultation and site supervision fee',
      amount: 135000,
      tax: 15000,
      totalAmount: 150000,
      status: 'approved',
      invoiceNo: 'DA/2024/JAN',
      dueDate: '2024-01-25',
      approvedBy: 'Rajesh Kumar',
      paymentMethod: 'Cheque',
      attachments: ['consultation-report.pdf', 'invoice.pdf']
    }
  ];

  // Helper Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled':
      case 'upcoming':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'overdue':
      case 'delayed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)} K`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const getRiskColor = (impact: string, probability: string) => {
    if (impact === 'high' && probability === 'high') return 'text-red-600 bg-red-50';
    if (impact === 'high' || probability === 'high') return 'text-orange-600 bg-orange-50';
    if (impact === 'medium' || probability === 'medium') return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  // Filter and Sort Functions
  const filteredPayments = useMemo(() => {
    let filtered = [...upcomingPayments];
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status === filterStatus);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'amount':
          return b.totalAmount - a.totalAmount;
        case 'vendor':
          return a.vendor.localeCompare(b.vendor);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [upcomingPayments, filterStatus, selectedCategory, searchTerm, sortBy]);

  // Calculate Category Totals
  const categoryTotals = useMemo(() => {
    const totals = new Map();
    upcomingPayments.forEach(payment => {
      const current = totals.get(payment.category) || 0;
      totals.set(payment.category, current + payment.totalAmount);
    });
    return totals;
  }, [upcomingPayments]);

  return (
    <div className="p-6 space-y-6">
      <TooltipProvider>
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments, vendors, invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Materials">Materials</SelectItem>
                <SelectItem value="Labor">Labor</SelectItem>
                <SelectItem value="Architecture">Architecture</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm" onClick={() => setShowAddPayment(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Budget</p>
                  <p className="text-xl font-bold">{formatCurrency(totalProjectBudget)}</p>
                  <p className="text-xs text-gray-500 mt-1">Approved</p>
                </div>
                <PiggyBank className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Spent</p>
                  <p className="text-xl font-bold">{formatCurrency(totalSpent)}</p>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">{((totalSpent / totalProjectBudget) * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <Banknote className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Committed</p>
                  <p className="text-xl font-bold">{formatCurrency(totalCommitted)}</p>
                  <p className="text-xs text-gray-500 mt-1">In process</p>
                </div>
                <FileCheck className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending</p>
                  <p className="text-xl font-bold">{formatCurrency(totalPending)}</p>
                  <p className="text-xs text-gray-500 mt-1">Approval req.</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Available</p>
                  <p className="text-xl font-bold">{formatCurrency(totalAvailable)}</p>
                  <div className="flex items-center mt-1">
                    <Target className="h-3 w-3 text-purple-600 mr-1" />
                    <p className="text-xs text-purple-600">{((totalAvailable / totalProjectBudget) * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <Wallet className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Utilization</p>
                  <p className="text-xl font-bold">{overallProgress.toFixed(1)}%</p>
                  <Progress value={overallProgress} className="h-1.5 mt-1" />
                </div>
                <PieChart className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-8 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stages">Stages</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Budget Progress Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Budget Allocation & Utilization</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Overall Project Progress</span>
                    <span className="font-semibold">{formatCurrency(totalSpent + totalCommitted)} of {formatCurrency(totalProjectBudget)}</span>
                  </div>
                  <div className="relative">
                    <div className="flex h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="bg-green-500 transition-all duration-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(totalSpent / totalProjectBudget) * 100}%` }}
                          >
                            {((totalSpent / totalProjectBudget) * 100).toFixed(0)}%
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Spent: {formatCurrency(totalSpent)}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="bg-yellow-500 transition-all duration-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(totalCommitted / totalProjectBudget) * 100}%` }}
                          >
                            {((totalCommitted / totalProjectBudget) * 100).toFixed(0)}%
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Committed: {formatCurrency(totalCommitted)}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="bg-orange-500 transition-all duration-500 flex items-center justify-center text-white text-xs font-medium"
                            style={{ width: `${(totalPending / totalProjectBudget) * 100}%` }}
                          >
                            {((totalPending / totalProjectBudget) * 100).toFixed(0)}%
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pending: {formatCurrency(totalPending)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded" />
                      <span>Spent ({((totalSpent / totalProjectBudget) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded" />
                      <span>Committed ({((totalCommitted / totalProjectBudget) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded" />
                      <span>Pending ({((totalPending / totalProjectBudget) * 100).toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-200 rounded" />
                      <span>Available ({((totalAvailable / totalProjectBudget) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingPayments.slice(0, 5).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            payment.category === 'Materials' ? 'bg-blue-100' :
                            payment.category === 'Labor' ? 'bg-green-100' :
                            payment.category === 'Architecture' ? 'bg-purple-100' :
                            'bg-gray-100'
                          }`}>
                            {payment.category === 'Materials' ? <Package className="h-4 w-4 text-blue-600" /> :
                             payment.category === 'Labor' ? <Users className="h-4 w-4 text-green-600" /> :
                             payment.category === 'Architecture' ? <Ruler className="h-4 w-4 text-purple-600" /> :
                             <Receipt className="h-4 w-4 text-gray-600" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{payment.vendor}</p>
                            <p className="text-xs text-gray-500">{payment.description.substring(0, 30)}...</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{formatCurrency(payment.totalAmount)}</p>
                          <Badge className={`text-xs ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingPayments.filter(p => p.status === 'pending').slice(0, 5).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{payment.description.substring(0, 40)}...</p>
                          <p className="text-xs text-gray-500">{payment.vendor} • Due: {payment.dueDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{formatCurrency(payment.totalAmount)}</span>
                          <Button size="sm" variant="outline">
                            <Check className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stages Tab */}
          <TabsContent value="stages" className="space-y-6">
            {projectStages.map((stage, index) => (
              <Card key={stage.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                      ${stage.status === 'completed' ? 'bg-green-500' : 
                        stage.status === 'in-progress' ? 'bg-blue-500' : 
                        stage.status === 'delayed' ? 'bg-red-500' : 'bg-gray-400'}`}>
                      {stage.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : 
                       stage.status === 'in-progress' ? <Activity className="h-6 w-6" /> :
                       stage.status === 'delayed' ? <AlertTriangle className="h-6 w-6" /> :
                       <Clock className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {stage.name}
                            <Badge className={getStatusColor(stage.status)}>
                              {stage.status}
                            </Badge>
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {stage.startDate} - {stage.endDate}
                            </span>
                            {stage.dependencies.length > 0 && (
                              <span className="flex items-center gap-1">
                                <GitBranch className="h-3 w-3" />
                                Dependencies: {stage.dependencies.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{stage.completion}%</p>
                          <p className="text-sm text-gray-600">Complete</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Stage Budget</span>
                          <span className="font-semibold">{formatCurrency(stage.budget)}</span>
                        </div>
                        <Progress value={stage.completion} className="h-2" />
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Spent: </span>
                            <span className="font-semibold text-green-600">{formatCurrency(stage.spent)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Committed: </span>
                            <span className="font-semibold text-yellow-600">{formatCurrency(stage.committed)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Available: </span>
                            <span className="font-semibold text-blue-600">{formatCurrency(stage.budget - stage.spent - stage.committed)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Utilization: </span>
                            <span className="font-semibold">{((stage.spent / stage.budget) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Stage Risks */}
                      {stage.risks.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Risk Assessment
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {stage.risks.map((risk) => (
                              <div key={risk.id} className={`p-2 rounded-lg border ${getRiskColor(risk.impact, risk.probability)}`}>
                                <p className="text-xs font-medium">{risk.description}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs">
                                  <Badge variant="outline" className="text-xs">
                                    Impact: {risk.impact}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Probability: {risk.probability}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">Mitigation: {risk.mitigation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Stage Milestones */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Flag className="h-4 w-4" />
                          Milestones
                        </h4>
                        <div className="space-y-2">
                          {stage.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full
                                  ${milestone.status === 'paid' ? 'bg-green-500' :
                                    milestone.status === 'pending' ? 'bg-yellow-500' :
                                    milestone.status === 'overdue' ? 'bg-red-500' : 'bg-gray-400'}`} 
                                />
                                <div>
                                  <p className="text-sm font-medium">{milestone.name}</p>
                                  <p className="text-xs text-gray-500">{milestone.date} • {milestone.category}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-sm font-semibold">{formatCurrency(milestone.amount)}</p>
                                  <Badge className={`text-xs ${getStatusColor(milestone.status)}`}>
                                    {milestone.status}
                                  </Badge>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <FileDown className="h-4 w-4 mr-2" />
                                      Download Documents
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Milestone
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Payment Management</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Total Pending:</span>
                    <span className="text-xl font-bold text-orange-600">
                      {formatCurrency(filteredPayments.reduce((sum, p) => sum + p.totalAmount, 0))}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Tax</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.dueDate}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{payment.description.substring(0, 40)}...</p>
                            <p className="text-xs text-gray-500">{payment.subCategory}</p>
                          </div>
                        </TableCell>
                        <TableCell>{payment.vendor}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{payment.invoiceNo}</p>
                            {payment.poNumber && (
                              <p className="text-xs text-gray-500">PO: {payment.poNumber}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(payment.amount)}</TableCell>
                        <TableCell>{formatCurrency(payment.tax)}</TableCell>
                        <TableCell className="font-semibold">{formatCurrency(payment.totalAmount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Check className="h-4 w-4 mr-2" />
                                Approve Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Process Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileDown className="h-4 w-4 mr-2" />
                                Download Invoice
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendors.map((vendor) => (
                <Card key={vendor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <Badge variant="outline" className="mt-1">{vendor.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vendor.rating}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{vendor.contactPerson}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-xs">{vendor.email}</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 text-xs">Total Business</p>
                        <p className="font-semibold">{formatCurrency(vendor.totalBusiness)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs">Pending</p>
                        <p className="font-semibold text-orange-600">{formatCurrency(vendor.pendingAmount)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Send className="h-3 w-3 mr-1" />
                        Pay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Material Procurement & Tracking</CardTitle>
                <CardDescription>Manage material orders, deliveries, and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Cement', 'Steel', 'Bricks', 'Sand', 'Aggregates', 'Tiles', 'Paint', 'Electrical'].map((material) => (
                    <div key={material} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{material}</h4>
                          <p className="text-sm text-gray-600">Multiple vendors available</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Spent</p>
                          <p className="font-semibold">{formatCurrency(Math.random() * 5000000)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Pending</p>
                          <p className="font-semibold text-orange-600">{formatCurrency(Math.random() * 500000)}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Labor Tab */}
          <TabsContent value="labor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Labor Management & Payments</CardTitle>
                <CardDescription>Track workforce, attendance, and wage payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Workers</p>
                          <p className="text-2xl font-bold">156</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">This Month</p>
                          <p className="text-2xl font-bold">{formatCurrency(2500000)}</p>
                        </div>
                        <Banknote className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Pending Wages</p>
                          <p className="text-2xl font-bold">{formatCurrency(450000)}</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contractor/Team</TableHead>
                      <TableHead>Workers</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Daily Rate</TableHead>
                      <TableHead>This Week</TableHead>
                      <TableHead>Total Paid</TableHead>
                      <TableHead>Pending</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Team A - Foundation', workers: 25, category: 'Skilled', rate: 800, week: 140000, paid: 2100000, pending: 140000 },
                      { name: 'Team B - Masonry', workers: 20, category: 'Skilled', rate: 750, week: 105000, paid: 1575000, pending: 105000 },
                      { name: 'Team C - Helpers', workers: 30, category: 'Unskilled', rate: 500, week: 105000, paid: 1050000, pending: 0 },
                      { name: 'Electrical Contractors', workers: 12, category: 'Specialized', rate: 1000, week: 84000, paid: 840000, pending: 84000 },
                      { name: 'Plumbing Team', workers: 8, category: 'Specialized', rate: 950, week: 53200, paid: 532000, pending: 53200 },
                    ].map((team, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{team.name}</TableCell>
                        <TableCell>{team.workers}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{team.category}</Badge>
                        </TableCell>
                        <TableCell>₹{team.rate}/day</TableCell>
                        <TableCell>{formatCurrency(team.week)}</TableCell>
                        <TableCell>{formatCurrency(team.paid)}</TableCell>
                        <TableCell className="font-semibold text-orange-600">
                          {formatCurrency(team.pending)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            {team.pending > 0 && (
                              <Button size="sm">
                                <Send className="h-3 w-3 mr-1" />
                                Pay
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
                <CardDescription>Track and manage all project milestones and deliverables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectStages.flatMap(stage => 
                    stage.milestones.map(milestone => ({
                      ...milestone,
                      stageName: stage.name,
                      stageStatus: stage.status
                    }))
                  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((milestone) => (
                    <Card key={milestone.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div className={`p-3 rounded-lg
                              ${milestone.category === 'construction' ? 'bg-blue-50' :
                                milestone.category === 'architecture' ? 'bg-purple-50' :
                                milestone.category === 'interior' ? 'bg-pink-50' : 'bg-gray-50'}`}>
                              {milestone.category === 'construction' ? <Building2 className="h-5 w-5 text-blue-600" /> :
                               milestone.category === 'architecture' ? <Ruler className="h-5 w-5 text-purple-600" /> :
                               milestone.category === 'interior' ? <Paintbrush className="h-5 w-5 text-pink-600" /> :
                               <Flag className="h-5 w-5 text-gray-600" />}
                            </div>
                            <div>
                              <h4 className="font-semibold">{milestone.name}</h4>
                              <p className="text-sm text-gray-600">{milestone.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="flex items-center gap-1">
                                  <Layers className="h-3 w-3" />
                                  {milestone.stageName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {milestone.date}
                                </span>
                                <Badge variant="outline" className="capitalize">
                                  {milestone.category}
                                </Badge>
                              </div>
                              {milestone.approvals.length > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                  {milestone.approvals.map((approval) => (
                                    <Tooltip key={approval.id}>
                                      <TooltipTrigger>
                                        <Badge 
                                          variant="outline" 
                                          className={`text-xs ${
                                            approval.status === 'approved' ? 'bg-green-50' :
                                            approval.status === 'pending' ? 'bg-yellow-50' : 'bg-red-50'
                                          }`}
                                        >
                                          <UserCheck className="h-3 w-3 mr-1" />
                                          {approval.approverRole}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{approval.approverName}</p>
                                        <p className="text-xs">{approval.status} - {approval.date}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-2xl font-bold">{formatCurrency(milestone.amount)}</p>
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                            <div className="flex gap-2 mt-2">
                              {milestone.documents.length > 0 && (
                                <Button size="sm" variant="outline">
                                  <FileDown className="h-3 w-3 mr-1" />
                                  Docs ({milestone.documents.length})
                                </Button>
                              )}
                              {milestone.status === 'upcoming' && (
                                <Button size="sm" variant="outline">
                                  <Bell className="h-3 w-3 mr-1" />
                                  Remind
                                </Button>
                              )}
                              {milestone.status === 'pending' && (
                                <Button size="sm">
                                  <Check className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                    <Badge className="bg-green-100 text-green-800">Good</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">Budget Health</h3>
                  <p className="text-2xl font-bold mb-2">92/100</p>
                  <p className="text-xs text-gray-600">2% under budget projection</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Cost Performance</h3>
                  <p className="text-2xl font-bold mb-2">1.08 CPI</p>
                  <p className="text-xs text-gray-600">8% cost savings achieved</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <Badge className="bg-yellow-100 text-yellow-800">On Track</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">Schedule Performance</h3>
                  <p className="text-2xl font-bold mb-2">0.95 SPI</p>
                  <p className="text-xs text-gray-600">5% behind schedule</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <PiggyBank className="h-8 w-8 text-purple-600" />
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Savings Achieved</h3>
                  <p className="text-2xl font-bold mb-2">{formatCurrency(5000000)}</p>
                  <p className="text-xs text-gray-600">Through optimization</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary Reports</CardTitle>
                <CardDescription>Generate and download comprehensive budget reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Monthly Budget Report', description: 'Detailed monthly expenses and budget analysis', icon: Calendar },
                    { name: 'Vendor Payment Summary', description: 'All vendor transactions and pending payments', icon: Users },
                    { name: 'Category-wise Breakdown', description: 'Expenses grouped by categories', icon: PieChart },
                    { name: 'Milestone Progress Report', description: 'Milestone completion and payment status', icon: Flag },
                    { name: 'Cash Flow Statement', description: 'Income and expense cash flow analysis', icon: TrendingUp },
                    { name: 'Tax Report', description: 'GST and tax calculations summary', icon: Receipt }
                  ].map((report, index) => {
                    const Icon = report.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <Icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{report.name}</h4>
                            <p className="text-sm text-gray-600">{report.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Generate
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Payment Dialog */}
        <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>
                Enter payment details to add a new transaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map(vendor => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="materials">Materials</SelectItem>
                      <SelectItem value="labor">Labor</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="interior">Interior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter payment description" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tax">Tax</Label>
                  <Input id="tax" type="number" placeholder="0.00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="total">Total Amount</Label>
                  <Input id="total" type="number" placeholder="0.00" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="invoice">Invoice Number</Label>
                  <Input id="invoice" placeholder="INV-XXXX" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddPayment(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddPayment(false)}>
                Add Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </div>
  );
}
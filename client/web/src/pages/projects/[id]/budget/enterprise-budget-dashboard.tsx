import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Calendar,
  FileText,
  Download,
  Filter,
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
  Milestone,
  GitBranch,
  Layers,
  Database,
  Bell,
  Plus,
  Wallet,
  Receipt,
  MoreVertical,
  CreditCard,
  Upload
} from 'lucide-react';

// Types
interface ProjectStage {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  status: 'completed' | 'in-progress' | 'upcoming' | 'delayed';
  completion: number;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  name: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'upcoming' | 'overdue';
  category: 'construction' | 'architecture' | 'interior' | 'other';
  description: string;
}

interface PaymentDetail {
  id: string;
  date: string;
  category: string;
  subCategory: string;
  vendor: string;
  description: string;
  amount: number;
  status: 'paid' | 'approved' | 'pending' | 'rejected' | 'scheduled';
  invoiceNo: string;
  approvedBy?: string;
  paidOn?: string;
  dueDate: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface BudgetCategory {
  name: string;
  icon: any;
  allocated: number;
  spent: number;
  committed: number;
  pending: number;
  available: number;
  percentage: number;
  color: string;
  bgColor: string;
  subCategories?: SubCategory[];
}

interface SubCategory {
  name: string;
  allocated: number;
  spent: number;
  pending: number;
}

export default function EnterpriseBudgetDashboard() {
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('this-month');

  // Project Budget Overview
  const totalProjectBudget = 250000000; // ₹25 Crores
  const totalSpent = 87500000; // ₹8.75 Crores
  const totalCommitted = 45000000; // ₹4.5 Crores
  const totalPending = 12500000; // ₹1.25 Crores
  const totalAvailable = totalProjectBudget - totalSpent - totalCommitted - totalPending;
  const overallProgress = ((totalSpent + totalCommitted) / totalProjectBudget) * 100;

  // Project Stages with Milestones
  const projectStages: ProjectStage[] = [
    {
      id: 'stage1',
      name: 'Foundation & Structure',
      description: 'Site preparation, foundation laying, and structural framework',
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      budget: 75000000,
      spent: 65000000,
      status: 'completed',
      completion: 100,
      milestones: [
        {
          id: 'm1',
          name: 'Site Clearance & Excavation',
          date: '2024-01-15',
          amount: 5000000,
          status: 'paid',
          category: 'construction',
          description: 'Site preparation and excavation work'
        },
        {
          id: 'm2',
          name: 'Foundation Laying',
          date: '2024-02-01',
          amount: 15000000,
          status: 'paid',
          category: 'construction',
          description: 'Foundation and basement work'
        },
        {
          id: 'm3',
          name: 'Structural Framework',
          date: '2024-03-15',
          amount: 25000000,
          status: 'paid',
          category: 'construction',
          description: 'RCC structure and framework'
        },
        {
          id: 'm4',
          name: 'Architect Design Approval',
          date: '2024-01-10',
          amount: 2000000,
          status: 'paid',
          category: 'architecture',
          description: 'Final architectural design and approvals'
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
      status: 'in-progress',
      completion: 35,
      milestones: [
        {
          id: 'm5',
          name: 'Brick Work - First Floor',
          date: '2024-05-15',
          amount: 10000000,
          status: 'paid',
          category: 'construction',
          description: 'First floor brick work and walls'
        },
        {
          id: 'm6',
          name: 'Roofing & Waterproofing',
          date: '2024-06-30',
          amount: 12000000,
          status: 'pending',
          category: 'construction',
          description: 'Roofing structure and waterproofing'
        },
        {
          id: 'm7',
          name: 'External Plastering',
          date: '2024-07-31',
          amount: 8000000,
          status: 'upcoming',
          category: 'construction',
          description: 'External wall plastering and finishing'
        }
      ]
    },
    {
      id: 'stage3',
      name: 'Interior & MEP',
      description: 'Interior design, electrical, plumbing, and mechanical works',
      startDate: '2024-09-01',
      endDate: '2024-12-31',
      budget: 60000000,
      spent: 0,
      status: 'upcoming',
      completion: 0,
      milestones: [
        {
          id: 'm8',
          name: 'Interior Design Finalization',
          date: '2024-09-01',
          amount: 3000000,
          status: 'upcoming',
          category: 'interior',
          description: 'Complete interior design and material selection'
        },
        {
          id: 'm9',
          name: 'Electrical & Plumbing',
          date: '2024-10-15',
          amount: 15000000,
          status: 'upcoming',
          category: 'construction',
          description: 'Complete electrical and plumbing installation'
        },
        {
          id: 'm10',
          name: 'Interior Furnishing',
          date: '2024-11-30',
          amount: 20000000,
          status: 'upcoming',
          category: 'interior',
          description: 'Furniture, fixtures, and interior decoration'
        }
      ]
    },
    {
      id: 'stage4',
      name: 'Finishing & Handover',
      description: 'Final touches, landscaping, and project handover',
      startDate: '2025-01-01',
      endDate: '2025-02-28',
      budget: 35000000,
      spent: 0,
      status: 'upcoming',
      completion: 0,
      milestones: [
        {
          id: 'm11',
          name: 'Landscaping & External',
          date: '2025-01-15',
          amount: 10000000,
          status: 'upcoming',
          category: 'construction',
          description: 'Garden, parking, and external beautification'
        },
        {
          id: 'm12',
          name: 'Final Inspection & Handover',
          date: '2025-02-28',
          amount: 5000000,
          status: 'upcoming',
          category: 'other',
          description: 'Quality checks and project handover'
        }
      ]
    }
  ];

  // Budget Categories with detailed breakdown
  const budgetCategories: BudgetCategory[] = [
    {
      name: 'Construction',
      icon: Building2,
      allocated: 120000000,
      spent: 52000000,
      committed: 25000000,
      pending: 8000000,
      available: 35000000,
      percentage: 64,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      subCategories: [
        { name: 'Foundation', allocated: 30000000, spent: 28000000, pending: 0 },
        { name: 'Structure', allocated: 40000000, spent: 15000000, pending: 5000000 },
        { name: 'Roofing', allocated: 15000000, spent: 5000000, pending: 3000000 },
        { name: 'External Works', allocated: 20000000, spent: 4000000, pending: 0 },
        { name: 'Finishing', allocated: 15000000, spent: 0, pending: 0 }
      ]
    },
    {
      name: 'Materials',
      icon: Package,
      allocated: 60000000,
      spent: 22000000,
      committed: 12000000,
      pending: 3000000,
      available: 23000000,
      percentage: 57,
      color: '#10b981',
      bgColor: '#d1fae5',
      subCategories: [
        { name: 'Cement & Concrete', allocated: 15000000, spent: 10000000, pending: 1000000 },
        { name: 'Steel & Iron', allocated: 20000000, spent: 8000000, pending: 2000000 },
        { name: 'Bricks & Blocks', allocated: 10000000, spent: 4000000, pending: 0 },
        { name: 'Sand & Aggregates', allocated: 8000000, spent: 0, pending: 0 },
        { name: 'Other Materials', allocated: 7000000, spent: 0, pending: 0 }
      ]
    },
    {
      name: 'Labor',
      icon: HardHat,
      allocated: 35000000,
      spent: 10000000,
      committed: 5000000,
      pending: 1500000,
      available: 18500000,
      percentage: 47,
      color: '#f59e0b',
      bgColor: '#fed7aa',
      subCategories: [
        { name: 'Skilled Workers', allocated: 20000000, spent: 7000000, pending: 1000000 },
        { name: 'Unskilled Workers', allocated: 10000000, spent: 3000000, pending: 500000 },
        { name: 'Supervisors', allocated: 5000000, spent: 0, pending: 0 }
      ]
    },
    {
      name: 'Architecture',
      icon: Ruler,
      allocated: 12000000,
      spent: 3000000,
      committed: 2000000,
      pending: 0,
      available: 7000000,
      percentage: 42,
      color: '#8b5cf6',
      bgColor: '#e9d5ff',
      subCategories: [
        { name: 'Design & Planning', allocated: 5000000, spent: 2000000, pending: 0 },
        { name: 'Consultation', allocated: 3000000, spent: 1000000, pending: 0 },
        { name: 'Approvals & Permits', allocated: 2000000, spent: 0, pending: 0 },
        { name: 'Site Supervision', allocated: 2000000, spent: 0, pending: 0 }
      ]
    },
    {
      name: 'Interior Design',
      icon: Paintbrush,
      allocated: 15000000,
      spent: 500000,
      committed: 1000000,
      pending: 0,
      available: 13500000,
      percentage: 10,
      color: '#ec4899',
      bgColor: '#fce7f3',
      subCategories: [
        { name: 'Design Consultation', allocated: 3000000, spent: 500000, pending: 0 },
        { name: 'Furniture', allocated: 7000000, spent: 0, pending: 0 },
        { name: 'Fixtures', allocated: 3000000, spent: 0, pending: 0 },
        { name: 'Decoration', allocated: 2000000, spent: 0, pending: 0 }
      ]
    },
    {
      name: 'Equipment',
      icon: Wrench,
      allocated: 8000000,
      spent: 0,
      committed: 0,
      pending: 0,
      available: 8000000,
      percentage: 0,
      color: '#06b6d4',
      bgColor: '#cffafe',
      subCategories: [
        { name: 'Heavy Machinery', allocated: 5000000, spent: 0, pending: 0 },
        { name: 'Tools & Equipment', allocated: 3000000, spent: 0, pending: 0 }
      ]
    }
  ];

  // Upcoming Payments
  const upcomingPayments: PaymentDetail[] = [
    {
      id: 'up1',
      date: '2024-01-20',
      category: 'Materials',
      subCategory: 'Cement',
      vendor: 'UltraTech Cement Ltd',
      description: 'Cement supply for roof casting - 500 bags',
      amount: 250000,
      status: 'scheduled',
      invoiceNo: 'UTC/2024/0145',
      dueDate: '2024-01-20',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'up2',
      date: '2024-01-22',
      category: 'Labor',
      subCategory: 'Skilled Workers',
      vendor: 'Labor Contractor - Team A',
      description: 'Weekly wages for 25 workers',
      amount: 187500,
      status: 'pending',
      invoiceNo: 'WAGE/2024/W03',
      dueDate: '2024-01-22',
      paymentMethod: 'Cash'
    },
    {
      id: 'up3',
      date: '2024-01-25',
      category: 'Architecture',
      subCategory: 'Consultation',
      vendor: 'Design Associates Pvt Ltd',
      description: 'Monthly consultation fee',
      amount: 150000,
      status: 'approved',
      invoiceNo: 'DA/2024/JAN',
      dueDate: '2024-01-25',
      approvedBy: 'Project Manager',
      paymentMethod: 'Cheque'
    },
    {
      id: 'up4',
      date: '2024-01-28',
      category: 'Equipment',
      subCategory: 'Rental',
      vendor: 'Heavy Equipment Rentals',
      description: 'Crane rental for 5 days',
      amount: 75000,
      status: 'pending',
      invoiceNo: 'HER/2024/0089',
      dueDate: '2024-01-28',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'up5',
      date: '2024-01-30',
      category: 'Materials',
      subCategory: 'Steel',
      vendor: 'Tata Steel Limited',
      description: '10 tons TMT bars for first floor',
      amount: 650000,
      status: 'approved',
      invoiceNo: 'TSL/2024/0234',
      dueDate: '2024-01-30',
      approvedBy: 'Purchase Manager',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'up6',
      date: '2024-02-01',
      category: 'Construction',
      subCategory: 'Milestone Payment',
      vendor: 'Main Contractor',
      description: 'Milestone: Foundation completion',
      amount: 5000000,
      status: 'scheduled',
      invoiceNo: 'MILE/2024/002',
      dueDate: '2024-02-01',
      paymentMethod: 'Bank Transfer'
    }
  ];

  // Recent Expenses
  const recentExpenses: PaymentDetail[] = [
    {
      id: 'exp1',
      date: '2024-01-15',
      category: 'Materials',
      subCategory: 'Bricks',
      vendor: 'ABC Brick Works',
      description: '10,000 red bricks delivered',
      amount: 85000,
      status: 'paid',
      invoiceNo: 'ABW/2024/0123',
      paidOn: '2024-01-15',
      dueDate: '2024-01-15',
      transactionId: 'TXN123456789',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'exp2',
      date: '2024-01-14',
      category: 'Labor',
      subCategory: 'Daily Wages',
      vendor: 'Site Supervisor',
      description: 'Daily wages for 30 workers',
      amount: 45000,
      status: 'paid',
      invoiceNo: 'WAGE/2024/D014',
      paidOn: '2024-01-14',
      dueDate: '2024-01-14',
      paymentMethod: 'Cash'
    },
    {
      id: 'exp3',
      date: '2024-01-13',
      category: 'Architecture',
      subCategory: 'Design',
      vendor: 'Creative Designs Studio',
      description: 'Interior design concept development',
      amount: 200000,
      status: 'paid',
      invoiceNo: 'CDS/2024/0045',
      paidOn: '2024-01-14',
      dueDate: '2024-01-20',
      transactionId: 'TXN123456790',
      paymentMethod: 'Cheque'
    }
  ];

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
    } else {
      return `₹${(amount / 1000).toFixed(1)} K`;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enterprise Budget Management
            </h1>
            <p className="text-gray-600 mt-1">Comprehensive financial tracking and milestone management</p>
          </div>
          <div className="flex gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalProjectBudget)}</p>
                <p className="text-xs text-blue-600 mt-1">Approved project budget</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-lg">
                <PiggyBank className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Spent</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(totalSpent)}</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  <p className="text-xs text-green-600">{((totalSpent / totalProjectBudget) * 100).toFixed(1)}% utilized</p>
                </div>
              </div>
              <div className="p-3 bg-green-200 rounded-lg">
                <Banknote className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Committed</p>
                <p className="text-2xl font-bold text-yellow-900">{formatCurrency(totalCommitted)}</p>
                <p className="text-xs text-yellow-700 mt-1">Approved for payment</p>
              </div>
              <div className="p-3 bg-yellow-200 rounded-lg">
                <FileCheck className="h-6 w-6 text-yellow-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Pending</p>
                <p className="text-2xl font-bold text-orange-900">{formatCurrency(totalPending)}</p>
                <p className="text-xs text-orange-600 mt-1">Awaiting approval</p>
              </div>
              <div className="p-3 bg-orange-200 rounded-lg">
                <Clock className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Available</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(totalAvailable)}</p>
                <div className="flex items-center mt-1">
                  <Target className="h-3 w-3 text-purple-600 mr-1" />
                  <p className="text-xs text-purple-600">{((totalAvailable / totalProjectBudget) * 100).toFixed(1)}% remaining</p>
                </div>
              </div>
              <div className="p-3 bg-purple-200 rounded-lg">
                <Wallet className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overall Budget Utilization</CardTitle>
              <CardDescription>Project financial progress and allocation status</CardDescription>
            </div>
            <Badge className={`text-sm px-3 py-1 ${overallProgress > 80 ? 'bg-red-100 text-red-800' : overallProgress > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              {overallProgress.toFixed(1)}% Utilized
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Committed</span>
              <span className="font-semibold">{formatCurrency(totalSpent + totalCommitted)} of {formatCurrency(totalProjectBudget)}</span>
            </div>
            <div className="relative">
              <div className="flex h-6 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                  style={{ width: `${(totalSpent / totalProjectBudget) * 100}%` }}
                />
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                  style={{ width: `${(totalCommitted / totalProjectBudget) * 100}%` }}
                />
                <div 
                  className="bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${(totalPending / totalProjectBudget) * 100}%` }}
                />
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
                <div className="w-3 h-3 bg-gray-300 rounded" />
                <span>Available ({((totalAvailable / totalProjectBudget) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="stages" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full bg-white">
          <TabsTrigger value="stages" className="data-[state=active]:bg-blue-50">
            <Layers className="h-4 w-4 mr-2" />
            Project Stages
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-blue-50">
            <PieChart className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-50">
            <CalendarClock className="h-4 w-4 mr-2" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-blue-50">
            <Receipt className="h-4 w-4 mr-2" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="milestones" className="data-[state=active]:bg-blue-50">
            <Flag className="h-4 w-4 mr-2" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Project Stages Tab */}
        <TabsContent value="stages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Stages & Progress</CardTitle>
              <CardDescription>Track progress and budget allocation across project phases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {projectStages.map((stage, index) => (
                <div key={stage.id} className="relative">
                  {index < projectStages.length - 1 && (
                    <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gray-200" />
                  )}
                  <div className="flex gap-4">
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold
                        ${stage.status === 'completed' ? 'bg-green-500' : 
                          stage.status === 'in-progress' ? 'bg-blue-500' : 
                          stage.status === 'delayed' ? 'bg-red-500' : 'bg-gray-400'}`}>
                        {stage.status === 'completed' ? <CheckCircle2 className="h-6 w-6" /> : 
                         stage.status === 'in-progress' ? <Activity className="h-6 w-6" /> :
                         stage.status === 'delayed' ? <AlertTriangle className="h-6 w-6" /> :
                         <Clock className="h-6 w-6" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Card className={`${stage.status === 'in-progress' ? 'border-blue-500 shadow-lg' : ''}`}>
                        <CardContent className="p-6">
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
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{stage.completion}%</p>
                              <p className="text-sm text-gray-600">Complete</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Stage Budget</span>
                              <span className="font-semibold">{formatCurrency(stage.budget)}</span>
                            </div>
                            <Progress value={stage.completion} className="h-3" />
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Spent: </span>
                                <span className="font-semibold text-green-600">{formatCurrency(stage.spent)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Remaining: </span>
                                <span className="font-semibold text-blue-600">{formatCurrency(stage.budget - stage.spent)}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Utilization: </span>
                                <span className="font-semibold">{((stage.spent / stage.budget) * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Stage Milestones */}
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                              <Milestone className="h-4 w-4" />
                              Key Milestones
                            </h4>
                            <div className="space-y-2">
                              {stage.milestones.map((milestone) => (
                                <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full
                                      ${milestone.status === 'paid' ? 'bg-green-500' :
                                        milestone.status === 'pending' ? 'bg-yellow-500' :
                                        milestone.status === 'overdue' ? 'bg-red-500' : 'bg-gray-400'}`} 
                                    />
                                    <div>
                                      <p className="text-sm font-medium">{milestone.name}</p>
                                      <p className="text-xs text-gray-500">{milestone.date}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-semibold">{formatCurrency(milestone.amount)}</p>
                                    <Badge className={`text-xs ${getStatusColor(milestone.status)}`}>
                                      {milestone.status}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {budgetCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={category.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: category.bgColor }}>
                          <CategoryIcon className="h-6 w-6" style={{ color: category.color }} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>Budget allocation and spending</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Export Data</DropdownMenuItem>
                          <DropdownMenuItem>Add Payment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Budget Utilization</span>
                        <span className="font-semibold">{category.percentage}%</span>
                      </div>
                      <Progress value={category.percentage} className="h-3" style={{ background: category.bgColor }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${category.percentage}%`, backgroundColor: category.color }} />
                      </Progress>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Allocated:</span>
                          <span className="font-semibold">{formatCurrency(category.allocated)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Spent:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(category.spent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Committed:</span>
                          <span className="font-semibold text-yellow-600">{formatCurrency(category.committed)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending:</span>
                          <span className="font-semibold text-orange-600">{formatCurrency(category.pending)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Available:</span>
                          <span className="font-semibold text-blue-600">{formatCurrency(category.available)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">% of Total:</span>
                          <span className="font-semibold">{((category.allocated / totalProjectBudget) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {category.subCategories && (
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-semibold mb-3">Subcategories</h4>
                        <div className="space-y-2">
                          {category.subCategories.map((sub) => (
                            <div key={sub.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{sub.name}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-600">
                                  {formatCurrency(sub.spent)} / {formatCurrency(sub.allocated)}
                                </span>
                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full"
                                    style={{ 
                                      width: `${(sub.spent / sub.allocated) * 100}%`,
                                      backgroundColor: category.color 
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Upcoming Payments Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Scheduled payments for the next 30 days</CardDescription>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Due</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatCurrency(upcomingPayments.reduce((sum, p) => sum + p.amount, 0))}
                    </p>
                  </div>
                  <Button variant="outline">
                    <CalendarCheck className="h-4 w-4 mr-2" />
                    Schedule All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <Card key={payment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <CalendarClock className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold">{payment.description}</h4>
                              <Badge className={getStatusColor(payment.status)}>
                                {payment.status}
                              </Badge>
                              <Badge variant="outline">{payment.category}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {payment.vendor}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Due: {payment.dueDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {payment.invoiceNo}
                              </span>
                              {payment.paymentMethod && (
                                <span className="flex items-center gap-1">
                                  <CreditCard className="h-3 w-3" />
                                  {payment.paymentMethod}
                                </span>
                              )}
                            </div>
                            {payment.approvedBy && (
                              <div className="flex items-center gap-1 text-xs text-green-600">
                                <UserCheck className="h-3 w-3" />
                                Approved by {payment.approvedBy}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-xl font-bold">{formatCurrency(payment.amount)}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              Schedule
                            </Button>
                            <Button size="sm">
                              <Banknote className="h-3 w-3 mr-1" />
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Calendar</CardTitle>
              <CardDescription>Visual timeline of upcoming payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center">
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const dayPayments = upcomingPayments.filter(p => {
                    const pDate = new Date(p.dueDate);
                    return pDate.toDateString() === date.toDateString();
                  });
                  const totalAmount = dayPayments.reduce((sum, p) => sum + p.amount, 0);
                  
                  return (
                    <div key={i} className={`p-3 rounded-lg border ${totalAmount > 0 ? 'bg-orange-50 border-orange-200' : 'bg-gray-50'}`}>
                      <p className="text-xs text-gray-600">{date.getDate()}</p>
                      {totalAmount > 0 && (
                        <>
                          <p className="text-xs font-semibold mt-1">{formatCurrency(totalAmount)}</p>
                          <p className="text-xs text-gray-500">{dayPayments.length} payment{dayPayments.length > 1 ? 's' : ''}</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Expenses</CardTitle>
                  <CardDescription>Detailed transaction history and payment records</CardDescription>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.date}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-xs text-gray-500">{expense.subCategory}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{expense.invoiceNo}</p>
                          {expense.transactionId && (
                            <p className="text-xs text-gray-500">TXN: {expense.transactionId}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(expense.status)}>
                          {expense.status}
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
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>Key deliverables and payment milestones across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectStages.flatMap(stage => 
                  stage.milestones.map(milestone => ({
                    ...milestone,
                    stageName: stage.name
                  }))
                ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((milestone) => (
                  <Card key={milestone.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className={`p-3 rounded-lg
                            ${milestone.category === 'construction' ? 'bg-blue-100' :
                              milestone.category === 'architecture' ? 'bg-purple-100' :
                              milestone.category === 'interior' ? 'bg-pink-100' : 'bg-gray-100'}`}>
                            {milestone.category === 'construction' ? <Building2 className="h-5 w-5 text-blue-600" /> :
                             milestone.category === 'architecture' ? <Ruler className="h-5 w-5 text-purple-600" /> :
                             milestone.category === 'interior' ? <Paintbrush className="h-5 w-5 text-pink-600" /> :
                             <Flag className="h-5 w-5 text-gray-600" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{milestone.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
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
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-2xl font-bold">{formatCurrency(milestone.amount)}</p>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                          {milestone.status === 'upcoming' && (
                            <Button size="sm" variant="outline" className="block w-full mt-2">
                              <Bell className="h-3 w-3 mr-1" />
                              Set Reminder
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Monthly spending patterns and projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Average Monthly Spend</span>
                    </div>
                    <span className="text-xl font-bold">{formatCurrency(totalSpent / 12)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Current Month</span>
                    </div>
                    <span className="text-xl font-bold">{formatCurrency(8750000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">Projected Total</span>
                    </div>
                    <span className="text-xl font-bold">{formatCurrency(245000000)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Performance Indicators</CardTitle>
                <CardDescription>Key financial metrics and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Cost Performance Index (CPI)</p>
                      <p className="text-lg font-semibold">Budget Efficiency</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">1.08</p>
                      <p className="text-xs text-green-600">Good</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Schedule Performance Index</p>
                      <p className="text-lg font-semibold">Timeline Efficiency</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">0.95</p>
                      <p className="text-xs text-blue-600">On Track</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Estimate at Completion</p>
                      <p className="text-lg font-semibold">Projected Final Cost</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(245000000)}</p>
                      <p className="text-xs text-purple-600">2% under budget</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Budget Health Score */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Health Analysis</CardTitle>
              <CardDescription>Overall financial health and risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Risk Level</p>
                  <p className="text-xl font-bold text-green-600">Low</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-xl font-bold text-blue-600">92/100</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Efficiency</p>
                  <p className="text-xl font-bold text-purple-600">87%</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Database className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Savings</p>
                  <p className="text-xl font-bold text-orange-600">{formatCurrency(5000000)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
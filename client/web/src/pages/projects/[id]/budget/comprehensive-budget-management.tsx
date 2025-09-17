import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
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
  Percent,
  MessageSquare,
  Paperclip,
  FileSpreadsheet,
  UserPlus,
  ClipboardList,
  Timer,
  Hash,
  ArrowUpDown,
  CircleCheck,
  CircleX,
  CircleMinus,
  Coins,
  HandCoins,
  ReceiptText,
  FileBarChart,
  Landmark
} from 'lucide-react';

// Comprehensive Types
interface PaymentWorkflow {
  id: string;
  level: number;
  role: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  comments?: string;
  signature?: string;
}

interface DetailedPayment {
  id: string;
  referenceNo: string;
  date: string;
  category: string;
  subCategory: string;
  vendor: VendorDetails;
  description: string;
  items: PaymentItem[];
  subtotal: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: 'draft' | 'pending' | 'approved' | 'processing' | 'paid' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  invoiceNo: string;
  poNumber?: string;
  workOrderNo?: string;
  dueDate: string;
  paymentTerms: string;
  paymentMethod?: string;
  transactionDetails?: TransactionDetails;
  attachments: Attachment[];
  workflow: PaymentWorkflow[];
  comments: Comment[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  hsnCode?: string;
}

interface VendorDetails {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  panNumber: string;
  bankDetails: BankDetails;
}

interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  ifscCode: string;
  branch: string;
  swiftCode?: string;
}

interface TransactionDetails {
  transactionId: string;
  transactionDate: string;
  paymentMode: string;
  bankName?: string;
  chequeNo?: string;
  utrNumber?: string;
  receiptNo?: string;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface Comment {
  id: string;
  user: string;
  role: string;
  message: string;
  timestamp: string;
}

interface ProjectMilestone {
  id: string;
  stageId: string;
  stageName: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  amount: number;
  receivedAmount: number;
  pendingAmount: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'delayed';
  paymentStatus: 'not-started' | 'partial' | 'full';
  deliverables: string[];
  dependencies: string[];
  payments: MilestonePayment[];
  receipts: MilestoneReceipt[];
  comments: Comment[];
  risks: Risk[];
}

interface MilestonePayment {
  id: string;
  date: string;
  amount: number;
  type: string;
  vendor: string;
  status: string;
  reference: string;
}

interface MilestoneReceipt {
  id: string;
  date: string;
  amount: number;
  from: string;
  reference: string;
  type: 'advance' | 'milestone' | 'final';
}

interface Risk {
  id: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  probability: 'high' | 'medium' | 'low';
  mitigation: string;
  status: 'active' | 'mitigated' | 'closed';
}

interface MaterialPayment {
  id: string;
  material: string;
  vendor: string;
  orderDate: string;
  deliveryDate: string;
  paymentDate: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  tax: number;
  total: number;
  status: 'ordered' | 'delivered' | 'partial' | 'paid' | 'cancelled';
  quality: 'approved' | 'rejected' | 'pending';
  approvals: PaymentWorkflow[];
  challanNo: string;
  invoiceNo: string;
  remarks?: string;
}

interface LaborPayment {
  id: string;
  contractorName: string;
  category: 'skilled' | 'unskilled' | 'supervisor' | 'engineer';
  workerCount: number;
  period: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  presentDays: number;
  rate: number;
  basicAmount: number;
  overtime: number;
  bonus: number;
  deductions: number;
  netAmount: number;
  status: 'due' | 'approved' | 'paid' | 'hold';
  paymentMode: string;
  attendance: AttendanceRecord[];
  advances: AdvancePayment[];
}

interface AttendanceRecord {
  date: string;
  present: number;
  absent: number;
  overtime: number;
}

interface AdvancePayment {
  date: string;
  amount: number;
  purpose: string;
  status: string;
}

export default function ComprehensiveBudgetManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPayment, setSelectedPayment] = useState<DetailedPayment | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [showLaborDialog, setShowLaborDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [dateRange, setDateRange] = useState('this-month');

  // Project Financial Data
  const totalBudget = 250000000;
  const totalReceived = 75000000;
  const totalSpent = 87500000;
  const totalCommitted = 45000000;
  const totalPending = 12500000;
  const cashInHand = totalReceived - totalSpent;
  const totalDue = totalBudget - totalReceived;

  // Next Payments Data
  const nextPayments = [
    {
      id: 'np1',
      date: '2024-01-20',
      vendor: 'UltraTech Cement Ltd',
      amount: 250000,
      category: 'Materials',
      urgency: 'high',
      daysLeft: 2
    },
    {
      id: 'np2',
      date: '2024-01-22',
      vendor: 'Labor Contractor Team A',
      amount: 187500,
      category: 'Labor',
      urgency: 'urgent',
      daysLeft: 4
    },
    {
      id: 'np3',
      date: '2024-01-25',
      vendor: 'Tata Steel Limited',
      amount: 650000,
      category: 'Materials',
      urgency: 'medium',
      daysLeft: 7
    },
    {
      id: 'np4',
      date: '2024-01-28',
      vendor: 'Design Associates',
      amount: 150000,
      category: 'Architecture',
      urgency: 'low',
      daysLeft: 10
    },
    {
      id: 'np5',
      date: '2024-02-01',
      vendor: 'Electrical Contractor',
      amount: 320000,
      category: 'Construction',
      urgency: 'medium',
      daysLeft: 14
    }
  ];

  // Milestones with integrated stages
  const projectMilestones: ProjectMilestone[] = [
    {
      id: 'm1',
      stageId: 's1',
      stageName: 'Foundation & Structure',
      name: 'Foundation Completion',
      description: 'Complete foundation work including excavation, PCC, and RCC',
      startDate: '2024-01-01',
      endDate: '2024-02-28',
      amount: 25000000,
      receivedAmount: 20000000,
      pendingAmount: 5000000,
      status: 'completed',
      paymentStatus: 'partial',
      deliverables: ['Excavation Report', 'Soil Test Certificate', 'Foundation Drawings'],
      dependencies: [],
      payments: [
        {
          id: 'mp1',
          date: '2024-01-15',
          amount: 5000000,
          type: 'Material - Cement',
          vendor: 'UltraTech Cement',
          status: 'paid',
          reference: 'PAY/2024/001'
        },
        {
          id: 'mp2',
          date: '2024-01-20',
          amount: 3000000,
          type: 'Labor - Foundation',
          vendor: 'ABC Contractors',
          status: 'paid',
          reference: 'PAY/2024/002'
        }
      ],
      receipts: [
        {
          id: 'mr1',
          date: '2024-01-05',
          amount: 10000000,
          from: 'Client',
          reference: 'ADV/2024/001',
          type: 'advance'
        },
        {
          id: 'mr2',
          date: '2024-02-01',
          amount: 10000000,
          from: 'Client',
          reference: 'MILE/2024/001',
          type: 'milestone'
        }
      ],
      comments: [
        {
          id: 'c1',
          user: 'Rajesh Kumar',
          role: 'Project Manager',
          message: 'Foundation work completed on schedule',
          timestamp: '2024-02-28 10:30 AM'
        }
      ],
      risks: [
        {
          id: 'r1',
          description: 'Monsoon delay risk',
          impact: 'high',
          probability: 'medium',
          mitigation: 'Accelerate work before monsoon',
          status: 'mitigated'
        }
      ]
    },
    {
      id: 'm2',
      stageId: 's2',
      stageName: 'Building Construction',
      name: 'Structure Completion - Ground Floor',
      description: 'Complete ground floor structure including columns, beams, and slab',
      startDate: '2024-03-01',
      endDate: '2024-04-30',
      amount: 30000000,
      receivedAmount: 15000000,
      pendingAmount: 15000000,
      status: 'in-progress',
      paymentStatus: 'partial',
      deliverables: ['Structural Drawings', 'Quality Test Reports', 'Progress Photos'],
      dependencies: ['m1'],
      payments: [
        {
          id: 'mp3',
          date: '2024-03-10',
          amount: 8000000,
          type: 'Material - Steel',
          vendor: 'Tata Steel',
          status: 'paid',
          reference: 'PAY/2024/003'
        },
        {
          id: 'mp4',
          date: '2024-03-15',
          amount: 4000000,
          type: 'Labor - Structure',
          vendor: 'XYZ Contractors',
          status: 'pending',
          reference: 'PAY/2024/004'
        }
      ],
      receipts: [
        {
          id: 'mr3',
          date: '2024-03-05',
          amount: 15000000,
          from: 'Client',
          reference: 'MILE/2024/002',
          type: 'milestone'
        }
      ],
      comments: [
        {
          id: 'c2',
          user: 'Amit Sharma',
          role: 'Site Engineer',
          message: 'Steel work in progress, 60% completed',
          timestamp: '2024-03-20 02:15 PM'
        }
      ],
      risks: [
        {
          id: 'r2',
          description: 'Material shortage risk',
          impact: 'medium',
          probability: 'low',
          mitigation: 'Maintain buffer stock',
          status: 'active'
        }
      ]
    }
  ];

  // Material Payments
  const materialPayments: MaterialPayment[] = [
    {
      id: 'mat1',
      material: 'Cement - Grade 53',
      vendor: 'UltraTech Cement Ltd',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-15',
      paymentDate: '2024-01-20',
      quantity: 500,
      unit: 'Bags',
      rate: 450,
      amount: 225000,
      tax: 25000,
      total: 250000,
      status: 'delivered',
      quality: 'approved',
      approvals: [
        {
          id: 'a1',
          level: 1,
          role: 'Site Engineer',
          approver: 'Amit Sharma',
          status: 'approved',
          date: '2024-01-16',
          comments: 'Quality approved'
        },
        {
          id: 'a2',
          level: 2,
          role: 'Project Manager',
          approver: 'Rajesh Kumar',
          status: 'approved',
          date: '2024-01-17',
          comments: 'Payment approved'
        }
      ],
      challanNo: 'CH/2024/0145',
      invoiceNo: 'INV/2024/0234',
      remarks: 'Urgent requirement for slab casting'
    },
    {
      id: 'mat2',
      material: 'TMT Steel Bars - 12mm',
      vendor: 'Tata Steel Limited',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-18',
      paymentDate: '2024-01-25',
      quantity: 10,
      unit: 'Tons',
      rate: 65000,
      amount: 650000,
      tax: 72000,
      total: 722000,
      status: 'ordered',
      quality: 'pending',
      approvals: [
        {
          id: 'a3',
          level: 1,
          role: 'Purchase Manager',
          approver: 'Suresh Patel',
          status: 'approved',
          date: '2024-01-13',
          comments: 'Order approved'
        }
      ],
      challanNo: 'Pending',
      invoiceNo: 'Pending',
      remarks: 'For first floor columns'
    }
  ];

  // Labor Payments
  const laborPayments: LaborPayment[] = [
    {
      id: 'lab1',
      contractorName: 'ABC Construction - Team A',
      category: 'skilled',
      workerCount: 25,
      period: 'Weekly',
      fromDate: '2024-01-15',
      toDate: '2024-01-21',
      totalDays: 7,
      presentDays: 6.5,
      rate: 800,
      basicAmount: 130000,
      overtime: 12000,
      bonus: 5000,
      deductions: 2000,
      netAmount: 145000,
      status: 'approved',
      paymentMode: 'Bank Transfer',
      attendance: [
        { date: '2024-01-15', present: 25, absent: 0, overtime: 2 },
        { date: '2024-01-16', present: 24, absent: 1, overtime: 3 },
        { date: '2024-01-17', present: 25, absent: 0, overtime: 2 },
        { date: '2024-01-18', present: 23, absent: 2, overtime: 0 },
        { date: '2024-01-19', present: 25, absent: 0, overtime: 4 },
        { date: '2024-01-20', present: 20, absent: 5, overtime: 0 },
        { date: '2024-01-21', present: 0, absent: 25, overtime: 0 }
      ],
      advances: [
        { date: '2024-01-10', amount: 10000, purpose: 'Emergency advance', status: 'deducted' }
      ]
    },
    {
      id: 'lab2',
      contractorName: 'XYZ Labor Contractor',
      category: 'unskilled',
      workerCount: 30,
      period: 'Weekly',
      fromDate: '2024-01-15',
      toDate: '2024-01-21',
      totalDays: 7,
      presentDays: 6,
      rate: 500,
      basicAmount: 90000,
      overtime: 5000,
      bonus: 0,
      deductions: 0,
      netAmount: 95000,
      status: 'due',
      paymentMode: 'Cash',
      attendance: [],
      advances: []
    }
  ];

  // Helper Functions
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'paid': 'bg-green-100 text-green-800 border-green-200',
      'completed': 'bg-green-100 text-green-800 border-green-200',
      'approved': 'bg-blue-100 text-blue-800 border-blue-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'due': 'bg-orange-100 text-orange-800 border-orange-200',
      'overdue': 'bg-red-100 text-red-800 border-red-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200',
      'cancelled': 'bg-gray-100 text-gray-800 border-gray-200',
      'draft': 'bg-gray-100 text-gray-800 border-gray-200',
      'processing': 'bg-purple-100 text-purple-800 border-purple-200',
      'partial': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'hold': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const exportToExcel = () => {
    // Implementation for Excel export
    console.log('Exporting to Excel...');
  };

  const exportToPDF = () => {
    // Implementation for PDF export
    console.log('Exporting to PDF...');
  };

  // Payment Form Component
  const PaymentForm = ({ onClose }: { onClose: () => void }) => {
    const [paymentData, setPaymentData] = useState({
      vendor: '',
      category: '',
      subCategory: '',
      description: '',
      items: [{ description: '', quantity: 1, unit: 'Nos', rate: 0, amount: 0 }],
      paymentTerms: 'Immediate',
      priority: 'medium',
      dueDate: '',
      workflow: [
        { level: 1, role: 'Site Engineer', approver: '', status: 'pending' as const },
        { level: 2, role: 'Project Manager', approver: '', status: 'pending' as const },
        { level: 3, role: 'Finance Head', approver: '', status: 'pending' as const }
      ]
    });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor *</Label>
            <Select onValueChange={(value) => setPaymentData({ ...paymentData, vendor: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultratech">UltraTech Cement Ltd</SelectItem>
                <SelectItem value="tata">Tata Steel Limited</SelectItem>
                <SelectItem value="abc">ABC Contractors</SelectItem>
                <SelectItem value="new">+ Add New Vendor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select onValueChange={(value) => setPaymentData({ ...paymentData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="materials">Materials</SelectItem>
                <SelectItem value="labor">Labor</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="subcontractor">Subcontractor</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
                <SelectItem value="interior">Interior</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea 
            id="description"
            placeholder="Enter payment description and purpose"
            value={paymentData.description}
            onChange={(e) => setPaymentData({ ...paymentData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Line Items</Label>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setPaymentData({
                ...paymentData,
                items: [...paymentData.items, { description: '', quantity: 1, unit: 'Nos', rate: 0, amount: 0 }]
              })}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Item
            </Button>
          </div>
          <div className="border rounded-lg p-4 space-y-2">
            {paymentData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-2">
                <Input 
                  placeholder="Description" 
                  className="col-span-2"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...paymentData.items];
                    newItems[index].description = e.target.value;
                    setPaymentData({ ...paymentData, items: newItems });
                  }}
                />
                <Input 
                  type="number" 
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...paymentData.items];
                    newItems[index].quantity = Number(e.target.value);
                    newItems[index].amount = newItems[index].quantity * newItems[index].rate;
                    setPaymentData({ ...paymentData, items: newItems });
                  }}
                />
                <Select 
                  value={item.unit}
                  onValueChange={(value) => {
                    const newItems = [...paymentData.items];
                    newItems[index].unit = value;
                    setPaymentData({ ...paymentData, items: newItems });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nos">Nos</SelectItem>
                    <SelectItem value="Kg">Kg</SelectItem>
                    <SelectItem value="Ton">Ton</SelectItem>
                    <SelectItem value="Bag">Bag</SelectItem>
                    <SelectItem value="Sqft">Sqft</SelectItem>
                    <SelectItem value="Cum">Cum</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  type="number" 
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => {
                    const newItems = [...paymentData.items];
                    newItems[index].rate = Number(e.target.value);
                    newItems[index].amount = newItems[index].quantity * newItems[index].rate;
                    setPaymentData({ ...paymentData, items: newItems });
                  }}
                />
                <Input 
                  type="number" 
                  placeholder="Amount"
                  value={item.amount}
                  disabled
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Select 
              value={paymentData.paymentTerms}
              onValueChange={(value) => setPaymentData({ ...paymentData, paymentTerms: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Immediate">Immediate</SelectItem>
                <SelectItem value="7 Days">7 Days</SelectItem>
                <SelectItem value="15 Days">15 Days</SelectItem>
                <SelectItem value="30 Days">30 Days</SelectItem>
                <SelectItem value="45 Days">45 Days</SelectItem>
                <SelectItem value="60 Days">60 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select 
              value={paymentData.priority}
              onValueChange={(value) => setPaymentData({ ...paymentData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input 
              type="date" 
              id="dueDate"
              value={paymentData.dueDate}
              onChange={(e) => setPaymentData({ ...paymentData, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Approval Workflow</Label>
          <div className="border rounded-lg p-4 space-y-2">
            {paymentData.workflow.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="w-20">Level {step.level}</Badge>
                <Input value={step.role} disabled className="flex-1" />
                <Input 
                  placeholder="Select approver"
                  value={step.approver}
                  onChange={(e) => {
                    const newWorkflow = [...paymentData.workflow];
                    newWorkflow[index].approver = e.target.value;
                    setPaymentData({ ...paymentData, workflow: newWorkflow });
                  }}
                  className="flex-1"
                />
                <Badge className={getStatusColor(step.status)}>
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="sendNotification" />
          <Label htmlFor="sendNotification">Send notification to approvers</Label>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <TooltipProvider>
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search payments, vendors, invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="due">Due</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="labor">Labor</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" onClick={exportToExcel}>
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" onClick={exportToPDF}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button onClick={() => setShowPaymentDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="milestones">Stages & Milestones</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab - Enhanced */}
          <TabsContent value="overview" className="space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Total Budget</p>
                    <p className="text-xl font-bold">{formatCurrency(totalBudget)}</p>
                    <Progress value={100} className="h-1" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Total Received</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(totalReceived)}</p>
                    <Progress value={(totalReceived / totalBudget) * 100} className="h-1" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="text-xl font-bold text-orange-600">{formatCurrency(totalSpent)}</p>
                    <Progress value={(totalSpent / totalBudget) * 100} className="h-1" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Cash in Hand</p>
                    <p className="text-xl font-bold text-blue-600">{formatCurrency(cashInHand)}</p>
                    <p className="text-xs text-green-600">Available</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Total Due</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(totalDue)}</p>
                    <p className="text-xs text-red-600">From client</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Pending Bills</p>
                    <p className="text-xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
                    <p className="text-xs text-yellow-600">To be paid</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Payments Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Next Payments Due</CardTitle>
                    <CardDescription>Upcoming payments in next 15 days</CardDescription>
                  </div>
                  <Badge variant="destructive">
                    Total: {formatCurrency(nextPayments.reduce((sum, p) => sum + p.amount, 0))}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nextPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${getUrgencyColor(payment.urgency)}`}>
                          {payment.urgency === 'urgent' ? <AlertCircle className="h-5 w-5" /> :
                           payment.urgency === 'high' ? <AlertTriangle className="h-5 w-5" /> :
                           payment.urgency === 'medium' ? <Clock className="h-5 w-5" /> :
                           <CalendarClock className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{payment.vendor}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{payment.category}</span>
                            <span>•</span>
                            <span>Due: {payment.date}</span>
                            <span>•</span>
                            <span className={payment.daysLeft <= 3 ? 'text-red-600 font-medium' : ''}>
                              {payment.daysLeft} days left
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(payment.amount)}</p>
                          <Badge className={`text-xs ${getUrgencyColor(payment.urgency)}`}>
                            {payment.urgency}
                          </Badge>
                        </div>
                        <Button size="sm">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Budget Utilization Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Flow Analysis</CardTitle>
                <CardDescription>Money in vs Money out</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Money Received</span>
                      <span className="font-medium">{formatCurrency(totalReceived)}</span>
                    </div>
                    <Progress value={(totalReceived / totalBudget) * 100} className="h-2 bg-gray-100">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${(totalReceived / totalBudget) * 100}%` }} />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Money Spent</span>
                      <span className="font-medium">{formatCurrency(totalSpent)}</span>
                    </div>
                    <Progress value={(totalSpent / totalBudget) * 100} className="h-2 bg-gray-100">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Balance Available</span>
                      <span className="font-medium">{formatCurrency(cashInHand)}</span>
                    </div>
                    <Progress value={(cashInHand / totalBudget) * 100} className="h-2 bg-gray-100">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(cashInHand / totalBudget) * 100}%` }} />
                    </Progress>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stages & Milestones Tab - Integrated */}
          <TabsContent value="milestones" className="space-y-6">
            {projectMilestones.map((milestone) => (
              <Card key={milestone.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{milestone.name}</CardTitle>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                        <Badge variant="outline" className={
                          milestone.paymentStatus === 'full' ? 'text-green-600' :
                          milestone.paymentStatus === 'partial' ? 'text-yellow-600' :
                          'text-gray-600'
                        }>
                          Payment: {milestone.paymentStatus}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        {milestone.stageName} • {milestone.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {milestone.startDate} to {milestone.endDate}
                        </span>
                        {milestone.dependencies.length > 0 && (
                          <span className="flex items-center gap-1">
                            <GitBranch className="h-3 w-3" />
                            Dependencies: {milestone.dependencies.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatCurrency(milestone.amount)}</p>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p className="text-green-600">Received: {formatCurrency(milestone.receivedAmount)}</p>
                        <p className="text-orange-600">Pending: {formatCurrency(milestone.pendingAmount)}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Financial Progress</span>
                      <span>{((milestone.receivedAmount / milestone.amount) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(milestone.receivedAmount / milestone.amount) * 100} className="h-2" />
                  </div>

                  {/* Payments and Receipts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Payments Made */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                          Payments Made
                        </h4>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {milestone.payments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                            <div className="text-sm">
                              <p className="font-medium">{payment.type}</p>
                              <p className="text-xs text-muted-foreground">
                                {payment.vendor} • {payment.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                              <Badge className={`text-xs ${getStatusColor(payment.status)}`}>
                                {payment.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Receipts */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                          Receipts
                        </h4>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {milestone.receipts.map((receipt) => (
                          <div key={receipt.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                            <div className="text-sm">
                              <p className="font-medium">{receipt.type} Payment</p>
                              <p className="text-xs text-muted-foreground">
                                {receipt.from} • {receipt.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{formatCurrency(receipt.amount)}</p>
                              <p className="text-xs text-muted-foreground">{receipt.reference}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Comments & Updates
                      </h4>
                      <Button size="sm" variant="outline">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Comment
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {milestone.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">{comment.user}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{comment.role}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Payments Tab - Enhanced */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Payments</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      Total: {formatCurrency(87500000)}
                    </Badge>
                    <Button size="sm" onClick={() => setShowPaymentDialog(true)}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Payment
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Date</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">2024-01-{15 + i}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">UltraTech Cement Ltd</p>
                            <p className="text-xs text-muted-foreground">Suresh Patel</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">Cement Grade 53 - 500 bags</p>
                            <p className="text-xs text-muted-foreground">For roof slab casting</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Materials</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>INV/2024/0{234 + i}</p>
                            <p className="text-xs text-muted-foreground">PO/2024/0{123 + i}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(250000 + i * 10000)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(i % 3 === 0 ? 'paid' : i % 3 === 1 ? 'approved' : 'pending')}>
                            {i % 3 === 0 ? 'paid' : i % 3 === 1 ? 'approved' : 'pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Check className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Process Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileDown className="h-4 w-4 mr-2" />
                                Download Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <History className="h-4 w-4 mr-2" />
                                View History
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
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

          {/* Materials Tab - Enhanced */}
          <TabsContent value="materials" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Material Procurement & Payments</CardTitle>
                  <Button size="sm" onClick={() => setShowMaterialDialog(true)}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Material Order
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead>Payment Due</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materialPayments.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p>{material.material}</p>
                            <p className="text-xs text-muted-foreground">{material.remarks}</p>
                          </div>
                        </TableCell>
                        <TableCell>{material.vendor}</TableCell>
                        <TableCell>{material.orderDate}</TableCell>
                        <TableCell>{material.deliveryDate}</TableCell>
                        <TableCell>{material.paymentDate}</TableCell>
                        <TableCell>
                          {material.quantity} {material.unit}
                        </TableCell>
                        <TableCell className="text-right">
                          <div>
                            <p className="font-semibold">{formatCurrency(material.total)}</p>
                            <p className="text-xs text-muted-foreground">
                              +Tax: {formatCurrency(material.tax)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            material.quality === 'approved' ? 'bg-green-100 text-green-800' :
                            material.quality === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {material.quality}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(material.status)}>
                            {material.status}
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
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Quality
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="h-4 w-4 mr-2" />
                                Process Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileDown className="h-4 w-4 mr-2" />
                                Download Challan
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

          {/* Labor Tab - Enhanced */}
          <TabsContent value="labor" className="space-y-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Workers</p>
                      <p className="text-2xl font-bold">185</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week Due</p>
                      <p className="text-2xl font-bold">{formatCurrency(875000)}</p>
                    </div>
                    <Banknote className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Paid</p>
                      <p className="text-2xl font-bold">{formatCurrency(12500000)}</p>
                    </div>
                    <HandCoins className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{formatCurrency(450000)}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Labor Payment Management</CardTitle>
                  <Button size="sm" onClick={() => setShowLaborDialog(true)}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Payment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contractor/Team</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Workers</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Basic</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead className="text-right">Net Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {laborPayments.map((labor) => (
                      <TableRow key={labor.id}>
                        <TableCell className="font-medium">{labor.contractorName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {labor.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{labor.workerCount}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{labor.period}</p>
                            <p className="text-xs text-muted-foreground">
                              {labor.fromDate} to {labor.toDate}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{labor.presentDays}/{labor.totalDays}</TableCell>
                        <TableCell>{formatCurrency(labor.basicAmount)}</TableCell>
                        <TableCell>{formatCurrency(labor.overtime)}</TableCell>
                        <TableCell className="text-red-600">
                          {labor.deductions > 0 ? `-${formatCurrency(labor.deductions)}` : '-'}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatCurrency(labor.netAmount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(labor.status)}>
                            {labor.status}
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
                                <ClipboardList className="h-4 w-4 mr-2" />
                                View Attendance
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calculator className="h-4 w-4 mr-2" />
                                Calculate Wages
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
                                Download Slip
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

          {/* Reports Tab - Enhanced */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold">Budget Health</h3>
                  <p className="text-2xl font-bold">92/100</p>
                  <p className="text-xs text-muted-foreground">Excellent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold">Cost Performance</h3>
                  <p className="text-2xl font-bold">1.08 CPI</p>
                  <p className="text-xs text-muted-foreground">8% savings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Activity className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold">Cash Flow</h3>
                  <p className="text-2xl font-bold">Positive</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(cashInHand)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <PiggyBank className="h-8 w-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold">Total Savings</h3>
                  <p className="text-2xl font-bold">{formatCurrency(5000000)}</p>
                  <p className="text-xs text-muted-foreground">2% of budget</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Export detailed financial reports in PDF or Excel format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      name: 'Complete Budget Report', 
                      description: 'Full project budget analysis with all transactions',
                      icon: FileBarChart,
                      format: 'pdf'
                    },
                    { 
                      name: 'Payment Summary', 
                      description: 'All payments categorized by vendor and type',
                      icon: Receipt,
                      format: 'excel'
                    },
                    { 
                      name: 'Material Report', 
                      description: 'Complete material procurement and payment details',
                      icon: Package,
                      format: 'excel'
                    },
                    { 
                      name: 'Labor Wages Report', 
                      description: 'Detailed labor payment and attendance records',
                      icon: Users,
                      format: 'excel'
                    },
                    { 
                      name: 'Milestone Report', 
                      description: 'Stage-wise milestone completion and payments',
                      icon: Flag,
                      format: 'pdf'
                    },
                    { 
                      name: 'Cash Flow Statement', 
                      description: 'Money received vs spent analysis',
                      icon: TrendingUp,
                      format: 'pdf'
                    },
                    { 
                      name: 'Tax Report', 
                      description: 'GST and tax summary for all transactions',
                      icon: FileText,
                      format: 'excel'
                    },
                    { 
                      name: 'Vendor Statement', 
                      description: 'Individual vendor payment history',
                      icon: Building2,
                      format: 'pdf'
                    }
                  ].map((report) => {
                    const Icon = report.icon;
                    return (
                      <div key={report.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{report.name}</h4>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {report.format === 'pdf' ? (
                            <Button variant="outline" size="sm" onClick={exportToPDF}>
                              <FileText className="h-4 w-4 mr-2" />
                              PDF
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={exportToExcel}>
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Excel
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>
                Enter complete payment details including workflow approvals
              </DialogDescription>
            </DialogHeader>
            <PaymentForm onClose={() => setShowPaymentDialog(false)} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Submit for Approval
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </div>
  );
}
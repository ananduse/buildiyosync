import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
  parseISO,
  startOfDay,
  endOfDay,
  differenceInDays,
  addHours,
  getHours,
  getMinutes,
  setHours,
  setMinutes
} from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Calendar,
  CalendarDays,
  CalendarRange,
  CalendarPlus,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Building2,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Copy,
  MoreVertical,
  MoreHorizontal,
  Package,
  Users,
  Wrench,
  Hammer,
  Home,
  Briefcase,
  UserCheck,
  Phone,
  Mail,
  Hash,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Eye,
  EyeOff,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  Timer,
  AlertTriangle,
  Info,
  Banknote,
  CreditCard,
  Smartphone,
  Landmark,
  Receipt,
  Target,
  BarChart3,
  ListFilter,
  LayoutGrid,
  List,
  SlidersHorizontal,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Circle,
  CircleDot,
  Repeat,
  Zap,
  Star,
  StarOff,
  Tag,
  Tags,
  Palette,
  PaintBucket,
  Move,
  GripVertical,
  Maximize2,
  Minimize2,
  Settings,
  Settings2,
  Bell,
  BellOff,
  MessageSquare,
  Send,
  Paperclip,
  Link,
  ExternalLink,
  History,
  RotateCw,
  Check,
  X,
  PlayCircle,
  PauseCircle,
  StopCircle,
  FastForward,
  Rewind,
  SkipForward,
  SkipBack,
} from 'lucide-react';

interface Payment {
  id: string;
  vendor: string;
  amount: number;
  category: string;
  subCategory: string;
  description: string;
  date: Date;
  time: string;
  endTime?: string;
  status: 'scheduled' | 'pending' | 'approved' | 'paid' | 'overdue' | 'cancelled' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  invoiceNo?: string;
  paymentMethod?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  notes?: string;
  tags?: string[];
  color?: string;
  attachments?: string[];
  recurring?: {
    type: 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
    interval?: number;
    endDate?: Date;
    occurrences?: number;
  };
  milestoneId?: string;
  stageId?: string;
  dependsOn?: string[];
  blockedBy?: string[];
  reminder?: {
    enabled: boolean;
    before: number;
    unit: 'minutes' | 'hours' | 'days';
  };
}

const categorySubcategories: { [key: string]: string[] } = {
  materials: ['cement', 'steel', 'bricks', 'sand', 'paint', 'tiles', 'electrical', 'plumbing', 'glass', 'wood'],
  labor: ['skilled-workers', 'helpers', 'supervisors', 'contractors', 'specialists'],
  equipment: ['machinery', 'tools', 'vehicles', 'safety-gear', 'scaffolding'],
  consultation: ['architect', 'structural-engineer', 'interior-designer', 'project-manager', 'legal'],
  service: ['transport', 'utilities', 'maintenance', 'security', 'cleaning'],
  rent: ['site-office', 'storage', 'accommodation', 'equipment-rental'],
  miscellaneous: ['permits', 'insurance', 'documentation', 'contingency', 'other']
};

const paymentColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
];

export default function AdvancedPaymentScheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'day' | 'agenda' | 'timeline'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [draggedPayment, setDraggedPayment] = useState<Payment | null>(null);
  const [dropTarget, setDropTarget] = useState<{ date: Date; time?: string } | null>(null);
  const [showMiniCalendar, setShowMiniCalendar] = useState(true);
  const [showPaymentList, setShowPaymentList] = useState(true);
  const [viewScale, setViewScale] = useState(100);
  const [groupBy, setGroupBy] = useState<'none' | 'category' | 'status' | 'priority'>('none');

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      vendor: 'UltraTech Cement Ltd',
      amount: 250000,
      category: 'materials',
      subCategory: 'cement',
      description: 'Cement supply for roof casting - 500 bags Grade 53',
      date: new Date(2024, 0, 20),
      time: '10:00',
      endTime: '11:00',
      status: 'scheduled',
      priority: 'high',
      invoiceNo: 'UTC/2024/0145',
      paymentMethod: 'bank-transfer',
      contactPerson: 'Mr. Suresh Kumar',
      phone: '+91 98765 43210',
      email: 'suresh@ultratech.com',
      tags: ['bulk-order', 'urgent'],
      color: '#3B82F6',
      reminder: { enabled: true, before: 1, unit: 'days' }
    },
    {
      id: '2',
      vendor: 'Labor Contractor Team A',
      amount: 187500,
      category: 'labor',
      subCategory: 'skilled-workers',
      description: 'Weekly wages for 25 workers - Week 3',
      date: new Date(2024, 0, 22),
      time: '14:00',
      status: 'pending',
      priority: 'urgent',
      invoiceNo: 'WAGE/2024/W03',
      paymentMethod: 'cash',
      tags: ['weekly', 'wages'],
      color: '#EF4444',
      recurring: {
        type: 'weekly',
        endDate: new Date(2024, 11, 31)
      }
    },
    {
      id: '3',
      vendor: 'Design Associates Pvt Ltd',
      amount: 150000,
      category: 'consultation',
      subCategory: 'architect',
      description: 'Monthly architectural consultation and site supervision',
      date: new Date(2024, 0, 25),
      time: '11:00',
      endTime: '12:30',
      status: 'approved',
      priority: 'medium',
      invoiceNo: 'DA/2024/JAN',
      paymentMethod: 'cheque',
      tags: ['monthly', 'consultation'],
      color: '#10B981',
      recurring: {
        type: 'monthly',
        endDate: new Date(2024, 11, 25),
      },
    },
    {
      id: '4',
      vendor: 'Tata Steel Limited',
      amount: 650000,
      category: 'materials',
      subCategory: 'steel',
      description: '10 tons TMT bars (Fe-500) for first floor slab',
      date: new Date(2024, 0, 30),
      time: '09:00',
      status: 'scheduled',
      priority: 'high',
      invoiceNo: 'TSL/2024/0234',
      paymentMethod: 'bank-transfer',
      tags: ['bulk-order', 'critical'],
      color: '#8B5CF6',
    },
    {
      id: '5',
      vendor: 'Electricals Hub',
      amount: 85000,
      category: 'materials',
      subCategory: 'electrical',
      description: 'Electrical wiring and fixtures for ground floor',
      date: new Date(2024, 0, 18),
      time: '15:00',
      status: 'paid',
      priority: 'medium',
      invoiceNo: 'EH/2024/0089',
      paymentMethod: 'upi',
      tags: ['electrical', 'phase-1'],
      color: '#F59E0B',
    },
  ]);

  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    vendor: '',
    amount: 0,
    category: '',
    subCategory: '',
    description: '',
    date: selectedDate || new Date(),
    time: '10:00',
    status: 'scheduled',
    priority: 'medium',
    paymentMethod: 'bank-transfer',
    tags: [],
    color: paymentColors[0],
    reminder: { enabled: false, before: 1, unit: 'days' }
  });

  const getDaysInView = () => {
    if (viewType === 'month') {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const startWeek = startOfWeek(start);
      const endWeek = endOfWeek(end);
      return eachDayOfInterval({ start: startWeek, end: endWeek });
    } else if (viewType === 'week') {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      return eachDayOfInterval({ start, end });
    } else if (viewType === 'day') {
      return [currentDate];
    }
    return [];
  };

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesCategory = filterCategory === 'all' || payment.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || payment.priority === filterPriority;
      const matchesTags = filterTags.length === 0 ||
        (payment.tags && filterTags.some(tag => payment.tags?.includes(tag)));
      const matchesSearch = searchQuery === '' ||
        payment.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.invoiceNo?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesPriority && matchesTags && matchesSearch;
    });
  }, [payments, filterCategory, filterStatus, filterPriority, filterTags, searchQuery]);

  const getPaymentsForDate = (date: Date) => {
    return filteredPayments.filter(payment => isSameDay(payment.date, date));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)} K`;
    } else {
      return `₹${amount}`;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'paid': 'bg-gray-100 text-gray-800 border-gray-200',
      'overdue': 'bg-red-100 text-red-800 border-red-200',
      'cancelled': 'bg-gray-100 text-gray-500 border-gray-200',
      'on-hold': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <CalendarClock className="h-3 w-3" />;
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'approved': return <CheckCircle2 className="h-3 w-3" />;
      case 'paid': return <Banknote className="h-3 w-3" />;
      case 'overdue': return <AlertTriangle className="h-3 w-3" />;
      case 'cancelled': return <XCircle className="h-3 w-3" />;
      case 'on-hold': return <PauseCircle className="h-3 w-3" />;
      default: return <Circle className="h-3 w-3" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Zap className="h-3 w-3" />;
      case 'high': return <ArrowUp className="h-3 w-3" />;
      case 'medium': return <ArrowRight className="h-3 w-3" />;
      case 'low': return <ArrowDown className="h-3 w-3" />;
      default: return null;
    }
  };

  const navigateCalendar = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentDate(new Date());
      return;
    }

    if (viewType === 'month') {
      setCurrentDate(prev => addMonths(prev, direction === 'next' ? 1 : -1));
    } else if (viewType === 'week') {
      setCurrentDate(prev => addWeeks(prev, direction === 'next' ? 1 : -1));
    } else if (viewType === 'day') {
      setCurrentDate(prev => addDays(prev, direction === 'next' ? 1 : -1));
    }
  };

  const handleDragStart = (e: React.DragEvent, payment: Payment) => {
    setDraggedPayment(payment);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, date: Date, time?: string) => {
    e.preventDefault();
    if (draggedPayment) {
      const updatedPayments = payments.map(p =>
        p.id === draggedPayment.id
          ? { ...p, date, time: time || p.time }
          : p
      );
      setPayments(updatedPayments);
      setDraggedPayment(null);
      setDropTarget(null);
    }
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'approve':
        setPayments(prev => prev.map(p =>
          selectedPayments.includes(p.id) ? { ...p, status: 'approved' } : p
        ));
        break;
      case 'markPaid':
        setPayments(prev => prev.map(p =>
          selectedPayments.includes(p.id) ? { ...p, status: 'paid' } : p
        ));
        break;
      case 'delete':
        setPayments(prev => prev.filter(p => !selectedPayments.includes(p.id)));
        break;
    }
    setSelectedPayments([]);
  };

  const addPayment = () => {
    const payment: Payment = {
      id: Date.now().toString(),
      vendor: newPayment.vendor || '',
      amount: newPayment.amount || 0,
      category: newPayment.category || '',
      subCategory: newPayment.subCategory || '',
      description: newPayment.description || '',
      date: newPayment.date || new Date(),
      time: newPayment.time || '10:00',
      status: newPayment.status as Payment['status'] || 'scheduled',
      priority: newPayment.priority as Payment['priority'] || 'medium',
      paymentMethod: newPayment.paymentMethod,
      contactPerson: newPayment.contactPerson,
      phone: newPayment.phone,
      email: newPayment.email,
      notes: newPayment.notes,
      tags: newPayment.tags,
      color: newPayment.color,
      recurring: newPayment.recurring,
      reminder: newPayment.reminder
    };

    setPayments([...payments, payment]);
    setShowAddPayment(false);
    setNewPayment({
      vendor: '',
      amount: 0,
      category: '',
      subCategory: '',
      description: '',
      date: new Date(),
      time: '10:00',
      status: 'scheduled',
      priority: 'medium',
      paymentMethod: 'bank-transfer',
      tags: [],
      color: paymentColors[0],
      reminder: { enabled: false, before: 1, unit: 'days' }
    });
  };

  const upcomingPayments = useMemo(() => {
    const next7Days = filteredPayments.filter(p => {
      const daysDiff = differenceInDays(p.date, new Date());
      return daysDiff >= 0 && daysDiff <= 7;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
    return next7Days;
  }, [filteredPayments]);

  const overduePayments = useMemo(() => {
    return filteredPayments.filter(p =>
      p.status !== 'paid' && p.status !== 'cancelled' && isBefore(p.date, startOfDay(new Date()))
    );
  }, [filteredPayments]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={cn(
        "border-r transition-all duration-300",
        showPaymentList ? "w-80" : "w-0 overflow-hidden"
      )}>
        <div className="p-4 space-y-4">
          {/* Mini Calendar */}
          {showMiniCalendar && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={(date) => {
                    setSelectedDate(date || null);
                    if (date) setCurrentDate(date);
                  }}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
          )}

          {/* Upcoming Payments */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Upcoming (7 days)</CardTitle>
                <Badge variant="secondary">{upcomingPayments.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {upcomingPayments.map(payment => (
                    <div
                      key={payment.id}
                      className="p-2 rounded border hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{payment.vendor}</span>
                        <Badge variant="outline" className="text-xs">
                          {format(payment.date, 'MMM d')}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {formatCurrency(payment.amount)}
                      </div>
                    </div>
                  ))}
                  {upcomingPayments.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No upcoming payments</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Overdue Payments */}
          {overduePayments.length > 0 && (
            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-red-600">Overdue</CardTitle>
                  <Badge variant="destructive">{overduePayments.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[150px]">
                  <div className="space-y-2">
                    {overduePayments.map(payment => (
                      <div
                        key={payment.id}
                        className="p-2 rounded border border-red-200 bg-red-50 cursor-pointer"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{payment.vendor}</span>
                          <Badge variant="destructive" className="text-xs">
                            {differenceInDays(new Date(), payment.date)} days
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {formatCurrency(payment.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPaymentList(!showPaymentList)}
              >
                {showPaymentList ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Payment Scheduler</h1>
                <p className="text-muted-foreground">Manage and track all project payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {selectedPayments.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Bulk Actions ({selectedPayments.length})
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAction('approve')}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('markPaid')}>
                      <Banknote className="mr-2 h-4 w-4" />
                      Mark as Paid
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleBulkAction('delete')}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <Button onClick={() => setShowAddPayment(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Schedule
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Payments
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Search and Filters */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {(filterCategory !== 'all' || filterStatus !== 'all' || filterPriority !== 'all') && (
                      <Badge variant="secondary" className="ml-1">Active</Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {Object.keys(categorySubcategories).map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select value={filterPriority} onValueChange={setFilterPriority}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setFilterCategory('all');
                        setFilterStatus('all');
                        setFilterPriority('all');
                        setFilterTags([]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3">
              <Select value={groupBy} onValueChange={(value: any) => setGroupBy(value)}>
                <SelectTrigger className="w-[150px]">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Grouping</SelectItem>
                  <SelectItem value="category">By Category</SelectItem>
                  <SelectItem value="status">By Status</SelectItem>
                  <SelectItem value="priority">By Priority</SelectItem>
                </SelectContent>
              </Select>

              <Tabs value={viewType} onValueChange={(value: any) => setViewType(value)}>
                <TabsList>
                  <TabsTrigger value="month" title="Month View">
                    <CalendarDays className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="week" title="Week View">
                    <CalendarRange className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="day" title="Day View">
                    <Calendar className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="agenda" title="Agenda View">
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="timeline" title="Timeline View">
                    <BarChart3 className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewScale(Math.max(50, viewScale - 10))}
                  disabled={viewScale <= 50}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <span className="text-sm w-12 text-center">{viewScale}%</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewScale(Math.min(150, viewScale + 10))}
                  disabled={viewScale >= 150}
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="border-b px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateCalendar('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateCalendar('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => navigateCalendar('today')}>
                Today
              </Button>
            </div>

            <h2 className="text-lg font-semibold">
              {viewType === 'month' && format(currentDate, 'MMMM yyyy')}
              {viewType === 'week' && `Week of ${format(startOfWeek(currentDate), 'MMM d, yyyy')}`}
              {viewType === 'day' && format(currentDate, 'EEEE, MMMM d, yyyy')}
              {viewType === 'agenda' && 'Payment Agenda'}
              {viewType === 'timeline' && 'Payment Timeline'}
            </h2>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Scheduled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Overdue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 overflow-auto p-6">
          {viewType === 'month' && (
            <div
              className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden"
              style={{ transform: `scale(${viewScale / 100})`, transformOrigin: 'top left' }}
            >
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium">
                  {day}
                </div>
              ))}

              {getDaysInView().map((day, index) => {
                const dayPayments = getPaymentsForDate(day);
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const dayTotal = dayPayments.reduce((sum, p) => sum + p.amount, 0);

                return (
                  <div
                    key={index}
                    className={cn(
                      "bg-white min-h-[120px] p-2 transition-colors relative",
                      !isCurrentMonth && "bg-gray-50",
                      isToday(day) && "bg-blue-50",
                      selectedDate && isSameDay(day, selectedDate) && "ring-2 ring-blue-500",
                      dropTarget && isSameDay(dropTarget.date, day) && "bg-blue-100"
                    )}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day)}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={cn(
                        "text-sm font-medium",
                        !isCurrentMonth && "text-gray-400",
                        isToday(day) && "text-blue-600 font-bold"
                      )}>
                        {format(day, 'd')}
                      </span>
                      {dayTotal > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {formatCurrency(dayTotal)}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayPayments.slice(0, 3).map(payment => (
                        <div
                          key={payment.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, payment)}
                          className={cn(
                            "text-xs p-1 rounded cursor-move hover:shadow-sm transition-shadow",
                            "border-l-2"
                          )}
                          style={{
                            backgroundColor: `${payment.color}20`,
                            borderLeftColor: payment.color
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPayment(payment);
                          }}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1 flex-1 min-w-0">
                              {getStatusIcon(payment.status)}
                              <span className="truncate font-medium">{payment.vendor}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {payment.recurring && <RefreshCw className="h-3 w-3" />}
                              {getPriorityIcon(payment.priority)}
                            </div>
                          </div>
                          <div className="text-gray-600 truncate">
                            {formatCurrency(payment.amount)}
                          </div>
                        </div>
                      ))}
                      {dayPayments.length > 3 && (
                        <div className="text-xs text-center text-gray-500 py-1">
                          +{dayPayments.length - 3} more
                        </div>
                      )}
                      {dayPayments.length === 0 && (
                        <Button
                          variant="ghost"
                          className="w-full h-8 text-xs opacity-0 hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(day);
                            setShowAddPayment(true);
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewType === 'agenda' && (
            <div className="space-y-6">
              {Array.from(new Set(filteredPayments.map(p => format(p.date, 'yyyy-MM-dd')))).sort().map(dateStr => {
                const date = parseISO(dateStr);
                const datePayments = filteredPayments.filter(p => isSameDay(p.date, date));
                const dateTotal = datePayments.reduce((sum, p) => sum + p.amount, 0);

                return (
                  <div key={dateStr} className="bg-white rounded-lg border">
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">
                            {format(date, 'EEEE, MMMM d, yyyy')}
                          </h3>
                          {isToday(date) && (
                            <Badge variant="default">Today</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {datePayments.length} payment{datePayments.length !== 1 ? 's' : ''}
                          </Badge>
                          <Badge variant="secondary">
                            {formatCurrency(dateTotal)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y">
                      {datePayments.map(payment => (
                        <div
                          key={payment.id}
                          className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedPayment(payment)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div
                                  className="w-1 h-12 rounded"
                                  style={{ backgroundColor: payment.color }}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold">{payment.vendor}</h4>
                                    <Badge className={getStatusColor(payment.status)}>
                                      {getStatusIcon(payment.status)}
                                      <span className="ml-1">{payment.status}</span>
                                    </Badge>
                                    {payment.priority !== 'medium' && (
                                      <Badge variant="outline">
                                        {getPriorityIcon(payment.priority)}
                                        <span className="ml-1">{payment.priority}</span>
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">{payment.description}</p>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {payment.time}
                                      {payment.endTime && ` - ${payment.endTime}`}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Tag className="h-3 w-3" />
                                      {payment.category}
                                    </span>
                                    {payment.invoiceNo && (
                                      <span className="flex items-center gap-1">
                                        <Hash className="h-3 w-3" />
                                        {payment.invoiceNo}
                                      </span>
                                    )}
                                    {payment.tags && payment.tags.length > 0 && (
                                      <div className="flex items-center gap-1">
                                        {payment.tags.map(tag => (
                                          <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setEditingPayment(payment)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Mark as Paid
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Payment Dialog */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPayment ? 'Edit Payment' : 'Schedule New Payment'}
            </DialogTitle>
            <DialogDescription>
              Enter complete payment details and scheduling information
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendor">Vendor Name *</Label>
                  <Input
                    id="vendor"
                    placeholder="Enter vendor name"
                    value={newPayment.vendor}
                    onChange={(e) => setNewPayment({ ...newPayment, vendor: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newPayment.category}
                    onValueChange={(value) => setNewPayment({ ...newPayment, category: value, subCategory: '' })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categorySubcategories).map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select
                    value={newPayment.subCategory}
                    onValueChange={(value) => setNewPayment({ ...newPayment, subCategory: value })}
                    disabled={!newPayment.category}
                  >
                    <SelectTrigger id="subcategory">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {newPayment.category && categorySubcategories[newPayment.category].map(sub => (
                        <SelectItem key={sub} value={sub}>
                          {sub.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter payment description and details"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newPayment.status}
                    onValueChange={(value) => setNewPayment({ ...newPayment, status: value as Payment['status'] })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newPayment.priority}
                    onValueChange={(value) => setNewPayment({ ...newPayment, priority: value as Payment['priority'] })}
                  >
                    <SelectTrigger id="priority">
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
                <div>
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    value={newPayment.paymentMethod}
                    onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
                  >
                    <SelectTrigger id="payment-method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Payment Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {newPayment.date ? format(newPayment.date, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={newPayment.date}
                        onSelect={(date) => setNewPayment({ ...newPayment, date: date || new Date() })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="time">Start Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newPayment.time}
                    onChange={(e) => setNewPayment({ ...newPayment, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time (Optional)</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={newPayment.endTime || ''}
                    onChange={(e) => setNewPayment({ ...newPayment, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recurring" className="text-base">Recurring Payment</Label>
                  <Switch
                    id="recurring"
                    checked={!!newPayment.recurring}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewPayment({
                          ...newPayment,
                          recurring: { type: 'monthly' }
                        });
                      } else {
                        setNewPayment({ ...newPayment, recurring: undefined });
                      }
                    }}
                  />
                </div>

                {newPayment.recurring && (
                  <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Frequency</Label>
                      <Select
                        value={newPayment.recurring.type}
                        onValueChange={(value) => setNewPayment({
                          ...newPayment,
                          recurring: { ...newPayment.recurring!, type: value as any }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>End Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <Calendar className="mr-2 h-4 w-4" />
                            {newPayment.recurring.endDate ? format(newPayment.recurring.endDate, 'PP') : 'No end date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={newPayment.recurring.endDate}
                            onSelect={(date) => setNewPayment({
                              ...newPayment,
                              recurring: { ...newPayment.recurring!, endDate: date || undefined }
                            })}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Occurrences</Label>
                      <Input
                        type="number"
                        placeholder="Unlimited"
                        value={newPayment.recurring.occurrences || ''}
                        onChange={(e) => setNewPayment({
                          ...newPayment,
                          recurring: { ...newPayment.recurring!, occurrences: parseInt(e.target.value) || undefined }
                        })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Label htmlFor="reminder" className="text-base">Payment Reminder</Label>
                  <Switch
                    id="reminder"
                    checked={newPayment.reminder?.enabled || false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewPayment({
                          ...newPayment,
                          reminder: { enabled: true, before: 1, unit: 'days' }
                        });
                      } else {
                        setNewPayment({
                          ...newPayment,
                          reminder: { enabled: false, before: 1, unit: 'days' }
                        });
                      }
                    }}
                  />
                </div>

                {newPayment.reminder?.enabled && (
                  <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Remind Before</Label>
                      <Input
                        type="number"
                        value={newPayment.reminder.before}
                        onChange={(e) => setNewPayment({
                          ...newPayment,
                          reminder: { ...newPayment.reminder!, before: parseInt(e.target.value) || 1 }
                        })}
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Select
                        value={newPayment.reminder.unit}
                        onValueChange={(value) => setNewPayment({
                          ...newPayment,
                          reminder: { ...newPayment.reminder!, unit: value as any }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input
                    id="contact-person"
                    placeholder="Enter contact name"
                    value={newPayment.contactPerson || ''}
                    onChange={(e) => setNewPayment({ ...newPayment, contactPerson: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={newPayment.phone || ''}
                    onChange={(e) => setNewPayment({ ...newPayment, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={newPayment.email || ''}
                  onChange={(e) => setNewPayment({ ...newPayment, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information or special instructions"
                  value={newPayment.notes || ''}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div>
                <Label>Color Theme</Label>
                <div className="flex gap-2 mt-2">
                  {paymentColors.map(color => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        newPayment.color === color ? "border-gray-900" : "border-gray-300"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewPayment({ ...newPayment, color })}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['urgent', 'bulk-order', 'critical', 'monthly', 'weekly', 'phase-1', 'phase-2'].map(tag => (
                    <Badge
                      key={tag}
                      variant={newPayment.tags?.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const tags = newPayment.tags || [];
                        if (tags.includes(tag)) {
                          setNewPayment({ ...newPayment, tags: tags.filter(t => t !== tag) });
                        } else {
                          setNewPayment({ ...newPayment, tags: [...tags, tag] });
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="invoice">Invoice Number</Label>
                <Input
                  id="invoice"
                  placeholder="INV-2024-001"
                  value={newPayment.invoiceNo || ''}
                  onChange={(e) => setNewPayment({ ...newPayment, invoiceNo: e.target.value })}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowAddPayment(false)}>
              Cancel
            </Button>
            <Button onClick={addPayment}>
              {editingPayment ? 'Update Payment' : 'Schedule Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedPayment.vendor}</h3>
                  <p className="text-gray-600 mt-1">{selectedPayment.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge className={getStatusColor(selectedPayment.status)}>
                      {getStatusIcon(selectedPayment.status)}
                      <span className="ml-1">{selectedPayment.status}</span>
                    </Badge>
                    <Badge variant="outline">
                      {getPriorityIcon(selectedPayment.priority)}
                      <span className="ml-1">{selectedPayment.priority} priority</span>
                    </Badge>
                    {selectedPayment.recurring && (
                      <Badge variant="outline">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Recurring
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{formatCurrency(selectedPayment.amount)}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(selectedPayment.date, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Schedule</h4>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {format(selectedPayment.date, 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Time:</span> {selectedPayment.time}
                        {selectedPayment.endTime && ` - ${selectedPayment.endTime}`}
                      </p>
                      {selectedPayment.recurring && (
                        <p className="text-sm">
                          <span className="font-medium">Recurring:</span> {selectedPayment.recurring.type}
                          {selectedPayment.recurring.endDate && ` until ${format(selectedPayment.recurring.endDate, 'PP')}`}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Payment Details</h4>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Category:</span> {selectedPayment.category}
                        {selectedPayment.subCategory && ` / ${selectedPayment.subCategory}`}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Method:</span> {selectedPayment.paymentMethod || 'Not specified'}
                      </p>
                      {selectedPayment.invoiceNo && (
                        <p className="text-sm">
                          <span className="font-medium">Invoice:</span> {selectedPayment.invoiceNo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                    <div className="space-y-1">
                      {selectedPayment.contactPerson && (
                        <p className="text-sm">
                          <span className="font-medium">Contact:</span> {selectedPayment.contactPerson}
                        </p>
                      )}
                      {selectedPayment.phone && (
                        <p className="text-sm">
                          <span className="font-medium">Phone:</span> {selectedPayment.phone}
                        </p>
                      )}
                      {selectedPayment.email && (
                        <p className="text-sm">
                          <span className="font-medium">Email:</span> {selectedPayment.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedPayment.tags && selectedPayment.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPayment.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedPayment.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
                  <p className="text-sm text-gray-700">{selectedPayment.notes}</p>
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                Close
              </Button>
              <Button variant="outline" onClick={() => {
                setEditingPayment(selectedPayment);
                setNewPayment(selectedPayment);
                setSelectedPayment(null);
                setShowAddPayment(true);
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Payment
              </Button>
              <Button>
                <Banknote className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
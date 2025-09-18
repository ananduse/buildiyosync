import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Calendar,
  CalendarDays,
  CalendarRange,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
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
  Download,
  Upload,
  Eye,
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
  Circle,
  CircleDot,
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
  status: 'scheduled' | 'pending' | 'approved' | 'paid' | 'overdue' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  invoiceNo?: string;
  paymentMethod?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  notes?: string;
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    endDate?: Date;
  };
}

export default function PaymentSchedulerCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample payments data
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      vendor: 'UltraTech Cement Ltd',
      amount: 250000,
      category: 'materials',
      subCategory: 'cement',
      description: 'Cement supply for roof casting - 500 bags',
      date: new Date(2024, 0, 20),
      time: '10:00',
      status: 'scheduled',
      priority: 'high',
      invoiceNo: 'UTC/2024/0145',
      paymentMethod: 'bank-transfer',
      contactPerson: 'Mr. Suresh Kumar',
      phone: '+91 98765 43210',
      email: 'suresh@ultratech.com',
    },
    {
      id: '2',
      vendor: 'Labor Contractor Team A',
      amount: 187500,
      category: 'labor',
      subCategory: 'skilled-workers',
      description: 'Weekly wages for 25 workers',
      date: new Date(2024, 0, 22),
      time: '14:00',
      status: 'pending',
      priority: 'urgent',
      invoiceNo: 'WAGE/2024/W03',
      paymentMethod: 'cash',
    },
    {
      id: '3',
      vendor: 'Design Associates Pvt Ltd',
      amount: 150000,
      category: 'consultation',
      subCategory: 'architect',
      description: 'Monthly consultation fee',
      date: new Date(2024, 0, 25),
      time: '11:00',
      status: 'approved',
      priority: 'medium',
      invoiceNo: 'DA/2024/JAN',
      paymentMethod: 'cheque',
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
      description: '10 tons TMT bars for first floor',
      date: new Date(2024, 0, 30),
      time: '09:00',
      status: 'scheduled',
      priority: 'high',
      invoiceNo: 'TSL/2024/0234',
      paymentMethod: 'bank-transfer',
    },
  ]);

  // Get days for calendar view
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

  // Filter payments
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesCategory = filterCategory === 'all' || payment.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
      const matchesSearch = searchQuery === '' ||
        payment.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [payments, filterCategory, filterStatus, searchQuery]);

  // Get payments for a specific date
  const getPaymentsForDate = (date: Date) => {
    return filteredPayments.filter(payment => isSameDay(payment.date, date));
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${(amount / 1000).toFixed(1)} K`;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'scheduled': 'bg-blue-100 text-blue-800 border-blue-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'paid': 'bg-gray-100 text-gray-800 border-gray-200',
      'overdue': 'bg-red-100 text-red-800 border-red-200',
      'cancelled': 'bg-gray-100 text-gray-500 border-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'low': 'text-green-600',
      'medium': 'text-yellow-600',
      'high': 'text-orange-600',
      'urgent': 'text-red-600',
    };
    return colors[priority] || 'text-gray-600';
  };

  // Navigate calendar
  const navigateCalendar = (direction: 'prev' | 'next') => {
    if (viewType === 'month') {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + (direction === 'next' ? 1 : -1), 1));
    } else if (viewType === 'week') {
      setCurrentDate(prev => addDays(prev, direction === 'next' ? 7 : -7));
    } else if (viewType === 'day') {
      setCurrentDate(prev => addDays(prev, direction === 'next' ? 1 : -1));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Payment Scheduler</h1>
          <p className="text-muted-foreground">Manage and schedule all project payments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowAddPayment(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[150px]">
                  <ListFilter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="labor">Labor</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <Tabs value={viewType} onValueChange={(value: any) => setViewType(value)}>
                <TabsList>
                  <TabsTrigger value="month">
                    <CalendarDays className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="week">
                    <CalendarRange className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="day">
                    <Calendar className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Navigation */}
      {viewType !== 'list' && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateCalendar('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateCalendar('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
              </div>
              <h2 className="text-lg font-semibold">
                {viewType === 'month' && format(currentDate, 'MMMM yyyy')}
                {viewType === 'week' && `Week of ${format(startOfWeek(currentDate), 'MMM d, yyyy')}`}
                {viewType === 'day' && format(currentDate, 'EEEE, MMMM d, yyyy')}
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3 w-3 text-blue-600" />
                  <span>Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3 w-3 text-yellow-600" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3 w-3 text-green-600" />
                  <span>Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3 w-3 text-red-600" />
                  <span>Overdue</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      {viewType !== 'list' ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {viewType === 'month' && (
              <div className="grid grid-cols-7">
                {/* Weekday Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium bg-gray-50 border-r border-b">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {getDaysInView().map((day, index) => {
                  const dayPayments = getPaymentsForDate(day);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const dayTotal = dayPayments.reduce((sum, p) => sum + p.amount, 0);

                  return (
                    <div
                      key={index}
                      className={cn(
                        "min-h-[120px] p-2 border-r border-b cursor-pointer transition-colors",
                        !isCurrentMonth && "bg-gray-50",
                        isToday(day) && "bg-blue-50",
                        selectedDate && isSameDay(day, selectedDate) && "bg-blue-100"
                      )}
                      onClick={() => {
                        setSelectedDate(day);
                        if (dayPayments.length === 0) {
                          setShowAddPayment(true);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between mb-1">
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
                            className="text-xs p-1 rounded bg-white border hover:shadow-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPayment(payment);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <div className={cn(
                                  "w-2 h-2 rounded-full",
                                  payment.status === 'scheduled' && "bg-blue-500",
                                  payment.status === 'pending' && "bg-yellow-500",
                                  payment.status === 'approved' && "bg-green-500",
                                  payment.status === 'overdue' && "bg-red-500"
                                )} />
                                <span className="truncate">{payment.vendor}</span>
                              </div>
                              {payment.recurring && (
                                <RefreshCw className="h-3 w-3 text-gray-400" />
                              )}
                            </div>
                            <div className="text-gray-600 truncate">
                              {formatCurrency(payment.amount)}
                            </div>
                          </div>
                        ))}
                        {dayPayments.length > 3 && (
                          <div className="text-xs text-center text-gray-500">
                            +{dayPayments.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewType === 'week' && (
              <div className="grid grid-cols-8">
                {/* Time Column */}
                <div className="border-r">
                  <div className="h-[50px] border-b bg-gray-50"></div>
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="h-[60px] border-b p-2 text-xs text-gray-500 bg-gray-50">
                      {i.toString().padStart(2, '0')}:00
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {getDaysInView().map((day, dayIndex) => (
                  <div key={dayIndex} className="border-r">
                    <div className="h-[50px] border-b p-2 text-center bg-gray-50">
                      <div className={cn(
                        "text-sm font-medium",
                        isToday(day) && "text-blue-600"
                      )}>
                        {format(day, 'EEE')}
                      </div>
                      <div className={cn(
                        "text-lg",
                        isToday(day) && "font-bold text-blue-600"
                      )}>
                        {format(day, 'd')}
                      </div>
                    </div>

                    {/* Hour Slots */}
                    {Array.from({ length: 24 }, (_, hour) => {
                      const hourPayments = getPaymentsForDate(day).filter(p => {
                        const paymentHour = parseInt(p.time.split(':')[0]);
                        return paymentHour === hour;
                      });

                      return (
                        <div
                          key={hour}
                          className="h-[60px] border-b p-1 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedDate(day);
                            setShowAddPayment(true);
                          }}
                        >
                          {hourPayments.map(payment => (
                            <div
                              key={payment.id}
                              className={cn(
                                "text-xs p-1 mb-1 rounded cursor-pointer",
                                payment.status === 'scheduled' && "bg-blue-100 text-blue-800",
                                payment.status === 'pending' && "bg-yellow-100 text-yellow-800",
                                payment.status === 'approved' && "bg-green-100 text-green-800",
                                payment.status === 'overdue' && "bg-red-100 text-red-800"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPayment(payment);
                              }}
                            >
                              <div className="font-medium truncate">{payment.vendor}</div>
                              <div>{formatCurrency(payment.amount)}</div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {viewType === 'day' && (
              <div className="grid grid-cols-[100px_1fr]">
                {/* Time Column */}
                {Array.from({ length: 24 }, (_, hour) => (
                  <React.Fragment key={hour}>
                    <div className="p-2 text-sm text-gray-500 border-r border-b bg-gray-50">
                      {hour.toString().padStart(2, '0')}:00
                    </div>
                    <div
                      className="p-2 border-b hover:bg-gray-50 cursor-pointer min-h-[80px]"
                      onClick={() => setShowAddPayment(true)}
                    >
                      {getPaymentsForDate(currentDate)
                        .filter(p => parseInt(p.time.split(':')[0]) === hour)
                        .map(payment => (
                          <div
                            key={payment.id}
                            className={cn(
                              "mb-2 p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow",
                              payment.status === 'scheduled' && "bg-blue-50 border-blue-200",
                              payment.status === 'pending' && "bg-yellow-50 border-yellow-200",
                              payment.status === 'approved' && "bg-green-50 border-green-200",
                              payment.status === 'overdue' && "bg-red-50 border-red-200"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPayment(payment);
                            }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{payment.vendor}</span>
                                  <Badge className={getStatusColor(payment.status)}>
                                    {payment.status}
                                  </Badge>
                                  <Badge variant="outline" className={getPriorityColor(payment.priority)}>
                                    {payment.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{payment.description}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                  <span>{payment.time}</span>
                                  <span>•</span>
                                  <span>{payment.category}</span>
                                  <span>•</span>
                                  <span>{payment.invoiceNo}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Duplicate
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
                  </React.Fragment>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-3 text-left text-sm font-medium">Date & Time</th>
                    <th className="p-3 text-left text-sm font-medium">Vendor</th>
                    <th className="p-3 text-left text-sm font-medium">Description</th>
                    <th className="p-3 text-left text-sm font-medium">Category</th>
                    <th className="p-3 text-left text-sm font-medium">Amount</th>
                    <th className="p-3 text-left text-sm font-medium">Status</th>
                    <th className="p-3 text-left text-sm font-medium">Priority</th>
                    <th className="p-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map(payment => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{format(payment.date, 'MMM d, yyyy')}</div>
                          <div className="text-sm text-gray-500">{payment.time}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div className="font-medium">{payment.vendor}</div>
                          {payment.contactPerson && (
                            <div className="text-sm text-gray-500">{payment.contactPerson}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{payment.description}</div>
                        {payment.invoiceNo && (
                          <div className="text-xs text-gray-500">Invoice: {payment.invoiceNo}</div>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{payment.category}</Badge>
                      </td>
                      <td className="p-3 font-semibold">{formatCurrency(payment.amount)}</td>
                      <td className="p-3">
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className={getPriorityColor(payment.priority)}>
                          {payment.priority}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedPayment(payment)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Payment Dialog */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedDate ? `Schedule Payment for ${format(selectedDate, 'MMMM d, yyyy')}` : 'Add New Payment'}
            </DialogTitle>
            <DialogDescription>
              Enter payment details and scheduling information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Vendor *</Label>
                <Input placeholder="Enter vendor name" />
              </div>
              <div>
                <Label>Amount *</Label>
                <Input type="number" placeholder="Enter amount" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="materials">Materials</SelectItem>
                    <SelectItem value="labor">Labor</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select defaultValue="medium">
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
            </div>

            <div>
              <Label>Description</Label>
              <Textarea placeholder="Enter payment description" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={(date) => setSelectedDate(date || null)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Time</Label>
                <Input type="time" defaultValue="10:00" />
              </div>
              <div>
                <Label>Payment Method</Label>
                <Select defaultValue="bank-transfer">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                Recurring Payment
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" placeholder="End date (optional)" />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Contact Person</Label>
                <Input placeholder="Name" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPayment(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddPayment(false)}>
              Schedule Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg">{selectedPayment.vendor}</h3>
                  <p className="text-sm text-gray-600">{selectedPayment.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{formatCurrency(selectedPayment.amount)}</p>
                  <Badge className={getStatusColor(selectedPayment.status)}>
                    {selectedPayment.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {format(selectedPayment.date, 'MMMM d, yyyy')} at {selectedPayment.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{selectedPayment.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <Badge variant="outline" className={getPriorityColor(selectedPayment.priority)}>
                    {selectedPayment.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{selectedPayment.paymentMethod || 'Not specified'}</p>
                </div>
              </div>

              {selectedPayment.contactPerson && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Contact Information</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {selectedPayment.contactPerson && (
                      <div>
                        <p className="text-gray-500">Contact Person</p>
                        <p>{selectedPayment.contactPerson}</p>
                      </div>
                    )}
                    {selectedPayment.phone && (
                      <div>
                        <p className="text-gray-500">Phone</p>
                        <p>{selectedPayment.phone}</p>
                      </div>
                    )}
                    {selectedPayment.email && (
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p>{selectedPayment.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                Close
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
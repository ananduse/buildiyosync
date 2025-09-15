import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  IndianRupee
} from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  icon: any;
  allocated: number;
  spent: number;
  pending: number;
  percentage: number;
  status: 'on-track' | 'warning' | 'over-budget';
  items: number;
}

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  vendor: string;
  amount: number;
  status: 'paid' | 'pending' | 'approved' | 'rejected';
  invoice: string;
  approvedBy?: string;
}

interface Payment {
  id: string;
  date: string;
  type: string;
  recipient: string;
  amount: number;
  method: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function ProjectBudgetDetails() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Budget data
  const totalBudget = 50000000;
  const totalSpent = 17500000;
  const totalPending = 3250000;
  const totalCommitted = totalSpent + totalPending;
  const remainingBudget = totalBudget - totalCommitted;
  const budgetUtilization = (totalCommitted / totalBudget) * 100;

  const categories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Labor & Wages',
      icon: Users,
      allocated: 15000000,
      spent: 6500000,
      pending: 750000,
      percentage: 48,
      status: 'on-track',
      items: 125
    },
    {
      id: '2',
      name: 'Materials',
      icon: Package,
      allocated: 18000000,
      spent: 7200000,
      pending: 1500000,
      percentage: 48,
      status: 'on-track',
      items: 89
    },
    {
      id: '3',
      name: 'Equipment',
      icon: Wrench,
      allocated: 8000000,
      spent: 2100000,
      pending: 500000,
      percentage: 33,
      status: 'on-track',
      items: 34
    },
    {
      id: '4',
      name: 'Subcontractors',
      icon: Building2,
      allocated: 5000000,
      spent: 1200000,
      pending: 300000,
      percentage: 30,
      status: 'on-track',
      items: 12
    },
    {
      id: '5',
      name: 'Transportation',
      icon: Truck,
      allocated: 2000000,
      spent: 300000,
      pending: 100000,
      percentage: 20,
      status: 'on-track',
      items: 45
    },
    {
      id: '6',
      name: 'Miscellaneous',
      icon: MoreVertical,
      allocated: 2000000,
      spent: 200000,
      pending: 100000,
      percentage: 15,
      status: 'on-track',
      items: 28
    }
  ];

  const recentExpenses: Expense[] = [
    {
      id: '1',
      date: '2024-01-15',
      category: 'Materials',
      description: 'Cement - 500 bags',
      vendor: 'ABC Suppliers',
      amount: 175000,
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: '2',
      date: '2024-01-14',
      category: 'Labor',
      description: 'Weekly wages - Team A',
      vendor: 'Internal',
      amount: 85000,
      status: 'approved',
      invoice: 'PAY-2024-045',
      approvedBy: 'Vikram Singh'
    },
    {
      id: '3',
      date: '2024-01-13',
      category: 'Equipment',
      description: 'Crane rental - 3 days',
      vendor: 'Heavy Machinery Ltd',
      amount: 45000,
      status: 'pending',
      invoice: 'INV-2024-089'
    },
    {
      id: '4',
      date: '2024-01-12',
      category: 'Materials',
      description: 'Steel bars - 10 tons',
      vendor: 'Steel Works Co',
      amount: 520000,
      status: 'paid',
      invoice: 'INV-2024-088'
    },
    {
      id: '5',
      date: '2024-01-11',
      category: 'Subcontractor',
      description: 'Electrical work - Phase 1',
      vendor: 'ElectroTech Services',
      amount: 150000,
      status: 'approved',
      invoice: 'INV-2024-087',
      approvedBy: 'Vikram Singh'
    }
  ];

  const upcomingPayments: Payment[] = [
    {
      id: '1',
      date: '2024-01-20',
      type: 'Vendor Payment',
      recipient: 'ABC Suppliers',
      amount: 250000,
      method: 'Bank Transfer',
      reference: 'PAY-VEN-001',
      status: 'pending'
    },
    {
      id: '2',
      date: '2024-01-21',
      type: 'Salary',
      recipient: 'Monthly Salaries',
      amount: 450000,
      method: 'Bank Transfer',
      reference: 'SAL-JAN-2024',
      status: 'pending'
    },
    {
      id: '3',
      date: '2024-01-22',
      type: 'Equipment Rental',
      recipient: 'Heavy Machinery Ltd',
      amount: 75000,
      method: 'Cheque',
      reference: 'CHQ-0012345',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'over-budget':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{(totalBudget / 1000000).toFixed(1)}M</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Allocated for project</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{(totalSpent / 1000000).toFixed(1)}M</span>
              <Badge variant="outline" className="text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                35%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Bills</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{(totalPending / 1000000).toFixed(1)}M</span>
              <Badge variant="outline" className="text-xs bg-yellow-50">
                12 bills
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{(remainingBudget / 1000000).toFixed(1)}M</span>
              <Badge variant="outline" className="text-xs bg-green-50">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {(100 - budgetUtilization).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Available budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Utilization Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Budget Utilization</CardTitle>
              <CardDescription>Overall budget consumption and allocation</CardDescription>
            </div>
            <Badge variant={budgetUtilization > 80 ? 'destructive' : budgetUtilization > 60 ? 'secondary' : 'outline'}>
              {budgetUtilization.toFixed(1)}% Used
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Committed Amount</span>
              <span className="font-medium">₹{(totalCommitted / 1000000).toFixed(1)}M of ₹{(totalBudget / 1000000).toFixed(1)}M</span>
            </div>
            <Progress value={budgetUtilization} className="h-3" />
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded" />
                <span>Spent ({((totalSpent / totalBudget) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded" />
                <span>Pending ({((totalPending / totalBudget) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded" />
                <span>Available ({((remainingBudget / totalBudget) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Categories</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Budget Categories</CardTitle>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-xs text-muted-foreground">{category.items} transactions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(category.spent / 1000000).toFixed(2)}M</p>
                          <p className="text-xs text-muted-foreground">
                            of ₹{(category.allocated / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Budget utilization</span>
                          <span className={`font-medium ${getCategoryStatusColor(category.status)}`}>
                            {category.percentage}%
                          </span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Pending: ₹{(category.pending / 100000).toFixed(1)}L</span>
                          <span>Remaining: ₹{((category.allocated - category.spent - category.pending) / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4 mt-4">
          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Expenses</CardTitle>
                  <CardDescription>Latest transactions and bills</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent rounded-lg">
                        <Receipt className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{expense.description}</h4>
                          <Badge variant="outline" className="text-xs">
                            {expense.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{expense.vendor}</span>
                          <span>•</span>
                          <span>{expense.invoice}</span>
                          <span>•</span>
                          <span>{expense.date}</span>
                          {expense.approvedBy && (
                            <>
                              <span>•</span>
                              <span>Approved by {expense.approvedBy}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">₹{expense.amount.toLocaleString()}</p>
                        <Badge className={`text-xs mt-1 ${getStatusColor(expense.status)}`}>
                          {expense.status}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  View All Expenses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4 mt-4">
          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Payments</CardTitle>
                  <CardDescription>Scheduled payments for the next 30 days</CardDescription>
                </div>
                <Badge variant="outline">
                  Total: ₹{upcomingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent rounded-lg">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{payment.recipient}</h4>
                          <Badge variant="outline" className="text-xs">
                            {payment.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Due: {payment.date}</span>
                          <span>•</span>
                          <span>{payment.method}</span>
                          <span>•</span>
                          <span>{payment.reference}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                        <Badge className={`text-xs mt-1 ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                        <Button size="sm">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹7.75L</p>
                <p className="text-xs text-muted-foreground mt-1">5 payments due</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">₹32.5L</p>
                <p className="text-xs text-muted-foreground mt-1">18 payments due</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">₹2.3L</p>
                <p className="text-xs text-muted-foreground mt-1">3 payments overdue</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4 mt-4">
          {/* Cost Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Cost Trend Analysis</CardTitle>
                <CardDescription>Monthly spending pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Month</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹5.2M</span>
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        12%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Month</span>
                    <span className="font-semibold">₹4.6M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Monthly</span>
                    <span className="font-semibold">₹4.8M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Health</CardTitle>
                <CardDescription>Financial status indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">On Track</span>
                    </div>
                    <span className="font-semibold">4 categories</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Warning</span>
                    </div>
                    <span className="font-semibold">1 category</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Over Budget</span>
                    </div>
                    <span className="font-semibold">1 category</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Recommendations</CardTitle>
              <CardDescription>Suggestions to optimize budget utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Material costs increasing</p>
                    <p className="text-xs text-muted-foreground">
                      Material expenses have increased by 15% compared to last month. Consider bulk purchasing or negotiating better rates.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Equipment rental optimization</p>
                    <p className="text-xs text-muted-foreground">
                      You could save ₹2.3L by optimizing equipment rental schedules and avoiding idle time.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Labor efficiency improved</p>
                    <p className="text-xs text-muted-foreground">
                      Labor costs are 8% below budget due to improved productivity. Continue current practices.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
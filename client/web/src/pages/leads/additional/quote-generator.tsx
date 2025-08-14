import { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Activity,
  DollarSign,
  Users,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Building2,
  Home,
  Globe,
  Navigation,
  Map,
  Route,
  Compass,
  Locate,
  MapIcon,
  Crosshair,
  Landmark,
  TreePine,
  Mountain,
  Waves,
  Layers,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  Tag,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Gauge,
  User,
  UserCheck,
  UserX,
  Crown,
  Key,
  Lock,
  Unlock,
  Badge as BadgeIcon,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Video,
  GitBranch,
  Workflow,
  Play,
  Pause,
  Square,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ChevronDown,
  Hash,
  Percent,
  Timer,
  Shuffle,
  BarChart2,
  TrendingUpIcon,
  Calculator,
  Scale,
  Minus,
  Thermometer,
  Brain,
  Lightbulb,
  Sparkles,
  CheckSquare,
  ClipboardList,
  Clipboard,
  Archive,
  FolderOpen,
  FileCheck,
  Send,
  Calendar as CalendarCheck,
  AlarmClock,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Package,
  Wrench,
  Hammer,
  HardHat,
  Truck,
  Receipt
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface QuoteLineItem {
  id: string;
  category: 'material' | 'labor' | 'equipment' | 'subcontractor' | 'permit' | 'other';
  name: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  markup: number;
  tax: number;
  discount: number;
  isOptional: boolean;
  notes?: string;
}

interface PricingRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'formula';
  value: number | string;
  conditions: string[];
  isActive: boolean;
}

interface QuoteTemplate {
  id: string;
  name: string;
  description: string;
  projectType: string;
  lineItems: QuoteLineItem[];
  terms: string;
  validityDays: number;
  markup: number;
  isActive: boolean;
}

interface Quote {
  id: string;
  number: string;
  title: string;
  description: string;
  leadId: string;
  leadName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  projectType: string;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected' | 'expired' | 'revised';
  version: number;
  lineItems: QuoteLineItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  markup: number;
  marginPercent: number;
  validUntil: Date;
  terms: string;
  notes: string;
  attachments: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
  approvals: {
    level: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    date?: Date;
    notes?: string;
  }[];
  history: {
    action: string;
    user: string;
    timestamp: Date;
    notes?: string;
  }[];
  performance: {
    viewedAt?: Date;
    viewCount: number;
    downloadCount: number;
    responseTime?: number; // hours
    conversionProbability: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface PricingModel {
  id: string;
  name: string;
  type: 'fixed' | 'unit_based' | 'time_materials' | 'cost_plus' | 'value_based';
  description: string;
  basePrice?: number;
  unitPrice?: number;
  hourlyRate?: number;
  markupPercent: number;
  factors: {
    name: string;
    type: 'multiplier' | 'additive' | 'percentage';
    value: number;
    condition?: string;
  }[];
  isActive: boolean;
}

// Mock data
const mockQuoteTemplates: QuoteTemplate[] = [
  {
    id: 'TPL001',
    name: 'Residential Kitchen Renovation',
    description: 'Standard template for kitchen renovation projects',
    projectType: 'Kitchen Renovation',
    lineItems: [
      {
        id: 'LI001',
        category: 'material',
        name: 'Kitchen Cabinets',
        description: 'Custom kitchen cabinets with soft-close doors',
        quantity: 1,
        unit: 'set',
        unitPrice: 8500,
        totalPrice: 8500,
        markup: 25,
        tax: 0,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI002',
        category: 'material',
        name: 'Granite Countertops',
        description: 'Premium granite countertops with edge finishing',
        quantity: 25,
        unit: 'sq ft',
        unitPrice: 85,
        totalPrice: 2125,
        markup: 30,
        tax: 0,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI003',
        category: 'labor',
        name: 'Installation Labor',
        description: 'Professional installation including plumbing and electrical',
        quantity: 40,
        unit: 'hours',
        unitPrice: 75,
        totalPrice: 3000,
        markup: 0,
        tax: 0,
        discount: 0,
        isOptional: false
      }
    ],
    terms: 'Payment terms: 50% deposit, 50% on completion. Warranty: 2 years on workmanship.',
    validityDays: 30,
    markup: 20,
    isActive: true
  }
];

const mockQuotes: Quote[] = [
  {
    id: 'QUO001',
    number: 'Q-2024-001',
    title: 'Kitchen Renovation - Smith Residence',
    description: 'Complete kitchen renovation including cabinets, countertops, and appliances',
    leadId: 'LEAD001',
    leadName: 'Smith Family',
    contactName: 'John Smith',
    contactEmail: 'john.smith@email.com',
    contactPhone: '+1-555-0101',
    projectType: 'Kitchen Renovation',
    status: 'sent',
    version: 1,
    lineItems: [
      {
        id: 'LI001',
        category: 'material',
        name: 'Kitchen Cabinets',
        description: 'Custom oak cabinets with soft-close doors and drawers',
        quantity: 1,
        unit: 'set',
        unitPrice: 9500,
        totalPrice: 9500,
        markup: 25,
        tax: 712.5,
        discount: 0,
        isOptional: false,
        notes: 'Upgraded to premium hardware'
      },
      {
        id: 'LI002',
        category: 'material',
        name: 'Quartz Countertops',
        description: 'Premium quartz countertops with undermount sink cutout',
        quantity: 28,
        unit: 'sq ft',
        unitPrice: 95,
        totalPrice: 2660,
        markup: 30,
        tax: 199.5,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI003',
        category: 'labor',
        name: 'Installation & Setup',
        description: 'Professional installation including plumbing and electrical work',
        quantity: 45,
        unit: 'hours',
        unitPrice: 85,
        totalPrice: 3825,
        markup: 0,
        tax: 0,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI004',
        category: 'equipment',
        name: 'Appliance Package',
        description: 'Stainless steel appliance package (refrigerator, range, dishwasher)',
        quantity: 1,
        unit: 'package',
        unitPrice: 4200,
        totalPrice: 4200,
        markup: 15,
        tax: 315,
        discount: 200,
        isOptional: true,
        notes: 'Optional upgrade package'
      }
    ],
    subtotal: 19985,
    taxAmount: 1227,
    discountAmount: 200,
    totalAmount: 21012,
    markup: 22.5,
    marginPercent: 18.3,
    validUntil: new Date(2024, 1, 20),
    terms: 'Payment: 50% deposit required, 25% at midpoint, 25% on completion. All materials guaranteed for 2 years. Labor warranty 1 year.',
    notes: 'Project timeline: 2-3 weeks. Customer requested premium finishes.',
    attachments: [
      {
        id: 'ATT001',
        name: 'Kitchen Design Plans.pdf',
        type: 'application/pdf',
        size: 2100000,
        url: '/attachments/kitchen-plans-001.pdf'
      },
      {
        id: 'ATT002',
        name: 'Material Specifications.xlsx',
        type: 'application/vnd.ms-excel',
        size: 450000,
        url: '/attachments/materials-spec-001.xlsx'
      }
    ],
    approvals: [
      {
        level: 'Manager',
        approver: 'Sales Manager',
        status: 'approved',
        date: new Date(2024, 0, 18),
        notes: 'Approved with standard markup'
      }
    ],
    history: [
      {
        action: 'Quote Created',
        user: 'John Smith',
        timestamp: new Date(2024, 0, 17, 14, 30)
      },
      {
        action: 'Quote Sent',
        user: 'John Smith',
        timestamp: new Date(2024, 0, 18, 10, 15)
      },
      {
        action: 'Quote Viewed',
        user: 'Customer',
        timestamp: new Date(2024, 0, 18, 16, 45)
      }
    ],
    performance: {
      viewedAt: new Date(2024, 0, 18, 16, 45),
      viewCount: 3,
      downloadCount: 1,
      responseTime: 6.5,
      conversionProbability: 72
    },
    createdAt: new Date(2024, 0, 17, 14, 30),
    updatedAt: new Date(2024, 0, 18, 16, 45),
    createdBy: 'John Smith'
  },
  {
    id: 'QUO002',
    number: 'Q-2024-002',
    title: 'Bathroom Remodel - Johnson Home',
    description: 'Master bathroom renovation with luxury finishes',
    leadId: 'LEAD002',
    leadName: 'Johnson Family',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah.johnson@email.com',
    contactPhone: '+1-555-0202',
    projectType: 'Bathroom Renovation',
    status: 'draft',
    version: 1,
    lineItems: [
      {
        id: 'LI005',
        category: 'material',
        name: 'Tile Package',
        description: 'Porcelain floor and wall tiles with decorative accent',
        quantity: 85,
        unit: 'sq ft',
        unitPrice: 12,
        totalPrice: 1020,
        markup: 40,
        tax: 76.5,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI006',
        category: 'material',
        name: 'Vanity & Mirror',
        description: 'Double vanity with quartz top and LED mirror',
        quantity: 1,
        unit: 'set',
        unitPrice: 2800,
        totalPrice: 2800,
        markup: 25,
        tax: 210,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI007',
        category: 'labor',
        name: 'Renovation Labor',
        description: 'Complete bathroom renovation including plumbing updates',
        quantity: 60,
        unit: 'hours',
        unitPrice: 95,
        totalPrice: 5700,
        markup: 0,
        tax: 0,
        discount: 0,
        isOptional: false
      }
    ],
    subtotal: 9520,
    taxAmount: 286.5,
    discountAmount: 0,
    totalAmount: 9806.5,
    markup: 28.7,
    marginPercent: 22.3,
    validUntil: new Date(2024, 1, 25),
    terms: 'Standard payment terms apply. Project completion: 3-4 weeks.',
    notes: 'Awaiting final material selections from customer.',
    attachments: [],
    approvals: [
      {
        level: 'Manager',
        approver: 'Sales Manager',
        status: 'pending'
      }
    ],
    history: [
      {
        action: 'Quote Created',
        user: 'Maria Garcia',
        timestamp: new Date(2024, 0, 19, 11, 20)
      }
    ],
    performance: {
      viewCount: 0,
      downloadCount: 0,
      conversionProbability: 0
    },
    createdAt: new Date(2024, 0, 19, 11, 20),
    updatedAt: new Date(2024, 0, 19, 11, 20),
    createdBy: 'Maria Garcia'
  },
  {
    id: 'QUO003',
    number: 'Q-2024-003',
    title: 'Deck Construction - Williams Property',
    description: 'New composite deck with railing and lighting',
    leadId: 'LEAD003',
    leadName: 'Williams Family',
    contactName: 'Mike Williams',
    contactEmail: 'mike.williams@email.com',
    contactPhone: '+1-555-0303',
    projectType: 'Deck Construction',
    status: 'accepted',
    version: 2,
    lineItems: [
      {
        id: 'LI008',
        category: 'material',
        name: 'Composite Decking',
        description: 'Premium composite decking boards with hidden fasteners',
        quantity: 320,
        unit: 'sq ft',
        unitPrice: 8.5,
        totalPrice: 2720,
        markup: 35,
        tax: 204,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI009',
        category: 'material',
        name: 'Railing System',
        description: 'Aluminum railing with glass panels',
        quantity: 48,
        unit: 'linear ft',
        unitPrice: 65,
        totalPrice: 3120,
        markup: 30,
        tax: 234,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI010',
        category: 'labor',
        name: 'Construction Labor',
        description: 'Deck framing, installation, and finishing',
        quantity: 35,
        unit: 'hours',
        unitPrice: 90,
        totalPrice: 3150,
        markup: 0,
        tax: 0,
        discount: 0,
        isOptional: false
      },
      {
        id: 'LI011',
        category: 'equipment',
        name: 'LED Lighting Package',
        description: 'Under-rail LED lighting with transformer',
        quantity: 1,
        unit: 'package',
        unitPrice: 850,
        totalPrice: 850,
        markup: 25,
        tax: 63.75,
        discount: 0,
        isOptional: true,
        notes: 'Added per customer request'
      }
    ],
    subtotal: 9840,
    taxAmount: 501.75,
    discountAmount: 0,
    totalAmount: 10341.75,
    markup: 25.8,
    marginPercent: 20.5,
    validUntil: new Date(2024, 2, 1),
    terms: 'Accepted quote. Construction to begin within 2 weeks. Weather dependent.',
    notes: 'Customer accepted with LED lighting upgrade. Permit application submitted.',
    attachments: [
      {
        id: 'ATT003',
        name: 'Deck Plans Revised.pdf',
        type: 'application/pdf',
        size: 1800000,
        url: '/attachments/deck-plans-revised.pdf'
      }
    ],
    approvals: [
      {
        level: 'Manager',
        approver: 'Sales Manager',
        status: 'approved',
        date: new Date(2024, 0, 20),
        notes: 'Approved for construction'
      }
    ],
    history: [
      {
        action: 'Quote Created',
        user: 'David Chen',
        timestamp: new Date(2024, 0, 18, 9, 45)
      },
      {
        action: 'Quote Revised',
        user: 'David Chen',
        timestamp: new Date(2024, 0, 19, 14, 20)
      },
      {
        action: 'Quote Accepted',
        user: 'Customer',
        timestamp: new Date(2024, 0, 20, 8, 30)
      }
    ],
    performance: {
      viewedAt: new Date(2024, 0, 19, 10, 15),
      viewCount: 5,
      downloadCount: 2,
      responseTime: 18.7,
      conversionProbability: 95
    },
    createdAt: new Date(2024, 0, 18, 9, 45),
    updatedAt: new Date(2024, 0, 20, 8, 30),
    createdBy: 'David Chen'
  }
];

const mockPricingModels: PricingModel[] = [
  {
    id: 'PM001',
    name: 'Standard Residential',
    type: 'unit_based',
    description: 'Standard pricing model for residential projects',
    unitPrice: 150,
    markupPercent: 25,
    factors: [
      { name: 'High-end finishes', type: 'multiplier', value: 1.3 },
      { name: 'Rush job', type: 'multiplier', value: 1.15, condition: 'timeline < 4 weeks' },
      { name: 'Volume discount', type: 'percentage', value: -5, condition: 'project_value > 50000' }
    ],
    isActive: true
  },
  {
    id: 'PM002',
    name: 'Commercial Fixed Price',
    type: 'fixed',
    description: 'Fixed pricing for standard commercial projects',
    basePrice: 75000,
    markupPercent: 18,
    factors: [
      { name: 'After hours work', type: 'additive', value: 5000 },
      { name: 'Specialized equipment', type: 'multiplier', value: 1.2 }
    ],
    isActive: true
  }
];

// Helper functions
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getStatusColor(status: Quote['status']) {
  switch (status) {
    case 'draft': return 'text-gray-600 bg-gray-50';
    case 'sent': return 'text-blue-600 bg-blue-50';
    case 'viewed': return 'text-purple-600 bg-purple-50';
    case 'accepted': return 'text-emerald-600 bg-emerald-50';
    case 'rejected': return 'text-red-600 bg-red-50';
    case 'expired': return 'text-amber-600 bg-amber-50';
    case 'revised': return 'text-indigo-600 bg-indigo-50';
  }
}

function getCategoryIcon(category: QuoteLineItem['category']) {
  switch (category) {
    case 'material': return Package;
    case 'labor': return Users;
    case 'equipment': return Wrench;
    case 'subcontractor': return HardHat;
    case 'permit': return FileCheck;
    case 'other': return Tag;
    default: return Package;
  }
}

function QuoteCard({ quote, onEdit, onView, onSend, onDuplicate, onDelete }: {
  quote: Quote;
  onEdit: () => void;
  onView: () => void;
  onSend: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const isExpired = new Date(quote.validUntil) < new Date();
  const daysUntilExpiry = Math.ceil((new Date(quote.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500 text-white">
              <Receipt className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{quote.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {quote.number}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getStatusColor(quote.status))}
                >
                  {quote.status}
                </Badge>
                {quote.version > 1 && (
                  <Badge variant="secondary" className="text-xs">
                    v{quote.version}
                  </Badge>
                )}
                {isExpired && quote.status !== 'accepted' && (
                  <Badge variant="destructive" className="text-xs">
                    Expired
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{quote.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{quote.contactName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building2 className="h-3 w-3" />
                  <span>{quote.leadName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : 'Expired'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Quote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Quote
              </DropdownMenuItem>
              {quote.status === 'draft' && (
                <DropdownMenuItem onClick={onSend}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Quote
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Convert to Proposal
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="h-4 w-4 mr-2" />
                Create Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Pricing Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold">{formatCurrency(quote.totalAmount)}</p>
            <p className="text-xs text-gray-500">Total Amount</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-emerald-600">{quote.marginPercent.toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Profit Margin</p>
          </div>
        </div>
        
        {/* Quote Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">{formatCurrency(quote.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">{formatCurrency(quote.taxAmount)}</span>
          </div>
          {quote.discountAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium text-emerald-600">-{formatCurrency(quote.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Line Items:</span>
            <span className="font-medium">{quote.lineItems.length} items</span>
          </div>
        </div>
        
        {/* Performance Indicators */}
        {quote.performance.viewCount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Engagement:</span>
              <span className="font-medium">
                {quote.performance.viewCount} views, {quote.performance.downloadCount} downloads
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Conversion Probability:</span>
              <span className={cn("font-medium",
                quote.performance.conversionProbability > 70 ? "text-emerald-600" :
                quote.performance.conversionProbability > 40 ? "text-amber-600" : "text-red-600"
              )}>
                {quote.performance.conversionProbability}%
              </span>
            </div>
          </div>
        )}
        
        {/* Status Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-gray-500">
            Created {new Date(quote.createdAt).toLocaleDateString()}
          </div>
          {quote.performance.viewedAt && (
            <div className="text-xs text-blue-600">
              Last viewed {new Date(quote.performance.viewedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function QuoteTemplateCard({ template, onUse, onEdit }: {
  template: QuoteTemplate;
  onUse: () => void;
  onEdit: () => void;
}) {
  const totalValue = template.lineItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-purple-500 text-white">
              <ClipboardList className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {template.projectType}
                </Badge>
                {!template.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Package className="h-3 w-3" />
                  <span>{template.lineItems.length} items</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-3 w-3" />
                  <span>{formatCurrency(totalValue)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Percent className="h-3 w-3" />
                  <span>{template.markup}% markup</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={onUse}>
              <Plus className="h-4 w-4 mr-1" />
              Use
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export function QuoteGenerator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProjectType, setSelectedProjectType] = useState('all');
  const [selectedTab, setSelectedTab] = useState('quotes');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [quotes, setQuotes] = useState(mockQuotes);

  const filteredQuotes = useMemo(() => {
    return quotes.filter(quote => {
      const matchesSearch = !searchQuery || 
        quote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.leadName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || quote.status === selectedStatus;
      const matchesProjectType = selectedProjectType === 'all' || quote.projectType === selectedProjectType;
      
      return matchesSearch && matchesStatus && matchesProjectType;
    });
  }, [searchQuery, selectedStatus, selectedProjectType, quotes]);

  const quoteStats = useMemo(() => {
    const totalQuotes = quotes.length;
    const totalValue = quotes.reduce((sum, q) => sum + q.totalAmount, 0);
    const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
    const acceptanceRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes) * 100 : 0;
    const avgValue = totalQuotes > 0 ? totalValue / totalQuotes : 0;
    const avgMargin = totalQuotes > 0 
      ? quotes.reduce((sum, q) => sum + q.marginPercent, 0) / totalQuotes 
      : 0;
    
    return {
      totalQuotes,
      totalValue,
      acceptedQuotes,
      acceptanceRate,
      avgValue,
      avgMargin
    };
  }, [quotes]);

  const handleSendQuote = (quoteId: string) => {
    setQuotes(prev => prev.map(q => 
      q.id === quoteId ? { ...q, status: 'sent' as const } : q
    ));
  };

  const handleDeleteQuote = (quoteId: string) => {
    setQuotes(prev => prev.filter(q => q.id !== quoteId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Quote Generator</h1>
              <Badge variant="secondary">{filteredQuotes.length} quotes</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search quotes..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" onClick={() => setShowTemplateDialog(true)}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Templates
              </Button>
              
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 mr-2" />
                Pricing Calculator
              </Button>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Quote
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="quotes">All Quotes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Models</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Quotes</p>
                        <p className="text-2xl font-bold">{quoteStats.totalQuotes}</p>
                        <p className="text-xs text-gray-500">{quoteStats.acceptedQuotes} accepted</p>
                      </div>
                      <Receipt className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Value</p>
                        <p className="text-2xl font-bold">{formatCurrency(quoteStats.totalValue)}</p>
                        <p className="text-xs text-gray-500">All quotes</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Acceptance Rate</p>
                        <p className={cn("text-2xl font-bold", 
                          quoteStats.acceptanceRate > 60 ? "text-emerald-600" : 
                          quoteStats.acceptanceRate > 40 ? "text-amber-600" : "text-red-600"
                        )}>
                          {quoteStats.acceptanceRate.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Conversion rate</p>
                      </div>
                      <Target className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Margin</p>
                        <p className={cn("text-2xl font-bold", 
                          quoteStats.avgMargin > 25 ? "text-emerald-600" : 
                          quoteStats.avgMargin > 15 ? "text-amber-600" : "text-red-600"
                        )}>
                          {quoteStats.avgMargin.toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">Profit margin</p>
                      </div>
                      <Percent className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quotes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuotes
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((quote) => (
                    <QuoteCard
                      key={quote.id}
                      quote={quote}
                      onEdit={() => {}}
                      onView={() => {}}
                      onSend={() => handleSendQuote(quote.id)}
                      onDuplicate={() => {}}
                      onDelete={() => handleDeleteQuote(quote.id)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Quote Templates</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockQuoteTemplates.map((template) => (
                  <QuoteTemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => setShowCreateDialog(true)}
                    onEdit={() => {}}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Pricing Models</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Model
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPricingModels.map((model) => (
                  <Card key={model.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">{model.name}</CardTitle>
                          <CardDescription>{model.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {model.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {model.basePrice && (
                            <div>
                              <span className="text-gray-600">Base Price:</span>
                              <span className="font-medium ml-2">{formatCurrency(model.basePrice)}</span>
                            </div>
                          )}
                          {model.unitPrice && (
                            <div>
                              <span className="text-gray-600">Unit Price:</span>
                              <span className="font-medium ml-2">{formatCurrency(model.unitPrice)}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Markup:</span>
                            <span className="font-medium ml-2">{model.markupPercent}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Factors:</span>
                            <span className="font-medium ml-2">{model.factors.length}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Pricing Factors:</p>
                          {model.factors.slice(0, 2).map((factor, index) => (
                            <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                              {factor.name}: {factor.type === 'multiplier' ? `×${factor.value}` : 
                                factor.type === 'percentage' ? `${factor.value}%` : `+${formatCurrency(factor.value)}`}
                            </div>
                          ))}
                          {model.factors.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{model.factors.length - 2} more factors
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm">
                            <Calculator className="h-4 w-4 mr-1" />
                            Use Model
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Quote Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Quote Performance Analysis</CardTitle>
                  <CardDescription>Conversion rates and performance metrics by project type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Kitchen Renovation', 'Bathroom Renovation', 'Deck Construction'].map((projectType) => {
                      const typeQuotes = quotes.filter(q => q.projectType === projectType);
                      const accepted = typeQuotes.filter(q => q.status === 'accepted').length;
                      const conversionRate = typeQuotes.length > 0 ? (accepted / typeQuotes.length) * 100 : 0;
                      const avgValue = typeQuotes.length > 0 
                        ? typeQuotes.reduce((sum, q) => sum + q.totalAmount, 0) / typeQuotes.length 
                        : 0;
                      const avgMargin = typeQuotes.length > 0 
                        ? typeQuotes.reduce((sum, q) => sum + q.marginPercent, 0) / typeQuotes.length 
                        : 0;
                      
                      return (
                        <div key={projectType} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-emerald-500 text-white">
                              <Receipt className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">{projectType}</p>
                              <p className="text-sm text-gray-500">
                                {typeQuotes.length} quotes • {accepted} accepted
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-right text-sm">
                            <div>
                              <p className="font-semibold text-emerald-600">{conversionRate.toFixed(1)}%</p>
                              <p className="text-gray-500">Conversion</p>
                            </div>
                            <div>
                              <p className="font-semibold">{formatCurrency(avgValue)}</p>
                              <p className="text-gray-500">Avg Value</p>
                            </div>
                            <div>
                              <p className="font-semibold">{avgMargin.toFixed(1)}%</p>
                              <p className="text-gray-500">Avg Margin</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quote Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired'].map((status) => {
                        const statusQuotes = quotes.filter(q => q.status === status);
                        const percentage = quotes.length > 0 ? (statusQuotes.length / quotes.length) * 100 : 0;
                        
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{status}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {statusQuotes.length}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {quotes
                        .filter(q => q.performance.responseTime)
                        .sort((a, b) => (a.performance.responseTime || 0) - (b.performance.responseTime || 0))
                        .slice(0, 6)
                        .map((quote) => {
                          const maxResponseTime = Math.max(...quotes.map(q => q.performance.responseTime || 0));
                          const responseTime = quote.performance.responseTime || 0;
                          
                          return (
                            <div key={quote.id} className="flex items-center justify-between">
                              <span className="text-sm">{quote.title}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{ width: `${maxResponseTime > 0 ? (responseTime / maxResponseTime) * 100 : 0}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-12">
                                  {responseTime.toFixed(1)}h
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Create Quote Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Quote Title</Label>
                  <Input placeholder="Kitchen Renovation - Smith Residence" />
                </div>
                <div>
                  <Label>Project Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
                      <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
                      <SelectItem value="deck">Deck Construction</SelectItem>
                      <SelectItem value="addition">Home Addition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Detailed description of the project..." />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Lead</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LEAD001">Smith Family</SelectItem>
                      <SelectItem value="LEAD002">Johnson Family</SelectItem>
                      <SelectItem value="LEAD003">Williams Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Contact Name</Label>
                  <Input placeholder="John Smith" />
                </div>
                <div>
                  <Label>Contact Email</Label>
                  <Input type="email" placeholder="john.smith@email.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Valid Until</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Quote Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockQuoteTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Line Items Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Line Items</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-8 gap-2 text-sm font-medium text-gray-600">
                    <span>Category</span>
                    <span className="col-span-2">Description</span>
                    <span>Qty</span>
                    <span>Unit</span>
                    <span>Unit Price</span>
                    <span>Total</span>
                    <span>Actions</span>
                  </div>
                  
                  <div className="grid grid-cols-8 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="labor">Labor</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="permit">Permit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input className="col-span-2" placeholder="Item description" />
                    <Input type="number" placeholder="1" />
                    <Input placeholder="each" />
                    <Input type="number" placeholder="0.00" />
                    <Input placeholder="0.00" disabled />
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Markup %</Label>
                  <Input type="number" placeholder="25" />
                </div>
                <div>
                  <Label>Tax Rate %</Label>
                  <Input type="number" placeholder="7.5" />
                </div>
                <div>
                  <Label>Discount Amount</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label>Terms & Conditions</Label>
                <Textarea placeholder="Payment terms, warranty information, project timeline..." />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Require Approval</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Auto-send</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button onClick={() => setShowCreateDialog(false)}>
                Create Quote
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Templates Dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Quote Templates</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Choose from pre-defined quote templates</p>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {mockQuoteTemplates.map((template) => (
                  <QuoteTemplateCard
                    key={template.id}
                    template={template}
                    onUse={() => {
                      setShowTemplateDialog(false);
                      setShowCreateDialog(true);
                    }}
                    onEdit={() => {}}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
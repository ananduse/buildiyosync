'use client';

import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Building2,
  List,
  Grid,
  Calendar,
  DollarSign,
  Users,
  ClipboardCheck,
  FileText,
  Package,
  Truck,
  HardHat,
  Ruler,
  Hammer,
  Calculator,
  Receipt,
  ShieldCheck,
  MapPin,
  Layers,
  Briefcase,
  Clock,
  MessageSquare,
  Settings,
  Activity,
  Target,
  AlertTriangle,
  TrendingUp,
  FolderOpen,
  GitBranch,
  CheckCircle,
  Upload,
  Download,
  Camera,
  Wrench,
  Shield,
  Database,
  PieChart,
  Bell,
  UserCheck,
  Building,
  Warehouse,
  FileSearch,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Plus,
  Home,
  Palette,
  ShoppingCart,
  Mic,
  Bot,
  Flag,
  CalendarDays,
  Repeat,
  Eye,
  BookOpen,
  Share2,
  HelpCircle,
  History,
  Key,
  UserPlus,
  Gauge,
  PackageCheck,
  TruckIcon,
  FileBarChart,
  Megaphone,
  CircleDollarSign,
  ClipboardList,
  FileSpreadsheet,
  BarChart,
  Image,
  Headphones,
  FolderKanban
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MoreVertical } from 'lucide-react';

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isNew?: boolean;
  children?: SidebarLink[];
}

interface SidebarSection {
  title: string;
  links: SidebarLink[];
}

// Organized navigation sections based on project.md requirements
const navigationSections: SidebarSection[] = [
  {
    title: 'Overview',
    links: [
      {
        name: 'Enterprise View',
        href: '/projects/enterprise',
        icon: Building2,
        badge: 'PRO',
        isNew: true
      },
      {
        name: 'Dashboard',
        href: '/projects/dashboard',
        icon: BarChart3,
        badge: '48'
      },
      {
        name: 'Project List',
        href: '/projects/list',
        icon: List
      },
      {
        name: 'Kanban Board',
        href: '/projects/kanban',
        icon: FolderKanban
      },
      {
        name: 'Calendar View',
        href: '/projects/calendar',
        icon: Calendar
      },
      {
        name: 'Timeline & Gantt',
        href: '/projects/timeline',
        icon: GitBranch
      }
    ]
  },
  {
    title: 'Project Management',
    links: [
      {
        name: 'Create Project',
        href: '/projects/new',
        icon: Plus
      },
      {
        name: 'Project Details',
        href: '/projects/details',
        icon: Building2,
        children: [
          { name: 'Site Survey', href: '/projects/site-survey', icon: MapPin },
          { name: 'Project Stages', href: '/projects/stages', icon: Layers },
          { name: 'Scope & Planning', href: '/projects/planning', icon: Target }
        ]
      },
      {
        name: 'Tasks & Activities',
        href: '/projects/tasks',
        icon: ClipboardCheck,
        badge: '147',
        children: [
          { name: 'Daily Tasks', href: '/projects/tasks/daily', icon: CheckCircle },
          { name: 'Task Categories', href: '/projects/tasks/categories', icon: Grid },
          { name: 'Gantt Chart', href: '/projects/tasks/gantt', icon: BarChart },
          { name: 'Hindrances', href: '/projects/tasks/issues', icon: AlertTriangle }
        ]
      },
      {
        name: 'Site Progress',
        href: '/projects/progress',
        icon: TrendingUp,
        children: [
          { name: 'DPR (Daily Report)', href: '/projects/dpr', icon: FileBarChart },
          { name: 'Progress Photos', href: '/projects/progress/photos', icon: Camera },
          { name: 'Milestones', href: '/projects/milestones', icon: Flag }
        ]
      }
    ]
  },
  {
    title: 'Financial Management',
    links: [
      {
        name: 'Budget Control',
        href: '/projects/budget',
        icon: Calculator,
        badge: '₹12.5Cr',
        children: [
          { name: 'Budget Planning', href: '/projects/budget/planning', icon: CircleDollarSign },
          { name: 'Cost Tracking', href: '/projects/budget/tracking', icon: Receipt },
          { name: 'Variance Analysis', href: '/projects/budget/variance', icon: BarChart3 }
        ]
      },
      {
        name: 'Finance',
        href: '/projects/finance',
        icon: DollarSign,
        children: [
          { name: 'Payments Received', href: '/projects/finance/received', icon: Download },
          { name: 'Bills & Invoices', href: '/projects/finance/bills', icon: FileText },
          { name: 'Expenses', href: '/projects/finance/expenses', icon: CreditCard }
        ]
      },
      {
        name: 'Quotations',
        href: '/projects/quotations',
        icon: FileSpreadsheet,
        children: [
          { name: 'Create Quote', href: '/projects/quotations/new', icon: Plus },
          { name: 'Templates', href: '/projects/quotations/templates', icon: FileText },
          { name: 'BOQ/BOM', href: '/projects/boq', icon: ClipboardList }
        ]
      }
    ]
  },
  {
    title: 'Resource Management',
    links: [
      {
        name: 'Manpower',
        href: '/projects/manpower',
        icon: Users,
        badge: '256',
        children: [
          { name: 'Labor Management', href: '/projects/labor', icon: HardHat },
          { name: 'Contractors', href: '/projects/contractors', icon: Briefcase },
          { name: 'Site Supervisors', href: '/projects/supervisors', icon: UserCheck },
          { name: 'Attendance', href: '/projects/attendance', icon: Clock }
        ]
      },
      {
        name: 'Materials',
        href: '/projects/materials',
        icon: Package,
        children: [
          { name: 'Material Requests', href: '/projects/materials/requests', icon: Upload },
          { name: 'Material Usage', href: '/projects/materials/usage', icon: PackageCheck },
          { name: 'Material Library', href: '/projects/materials/library', icon: Database },
          { name: 'Consumption Report', href: '/projects/materials/consumption', icon: PieChart }
        ]
      },
      {
        name: 'Equipment',
        href: '/projects/equipment',
        icon: Wrench,
        children: [
          { name: 'Equipment List', href: '/projects/equipment/list', icon: List },
          { name: 'Maintenance', href: '/projects/equipment/maintenance', icon: Shield },
          { name: 'Allocation', href: '/projects/equipment/allocation', icon: Share2 }
        ]
      },
      {
        name: 'Inventory',
        href: '/projects/inventory',
        icon: Warehouse,
        children: [
          { name: 'Stock Management', href: '/projects/inventory/stock', icon: Package },
          { name: 'Transfer Stock', href: '/projects/inventory/transfer', icon: Truck },
          { name: 'Site Transfer', href: '/projects/inventory/site-transfer', icon: TruckIcon }
        ]
      }
    ]
  },
  {
    title: 'Procurement & Vendors',
    links: [
      {
        name: 'Procurement',
        href: '/projects/procurement',
        icon: ShoppingCart,
        children: [
          { name: 'RFQ', href: '/projects/procurement/rfq', icon: FileSearch },
          { name: 'Indents', href: '/projects/procurement/indents', icon: ClipboardList },
          { name: 'Purchase Orders', href: '/projects/procurement/po', icon: Receipt },
          { name: 'GRN', href: '/projects/procurement/grn', icon: CheckCircle }
        ]
      },
      {
        name: 'Suppliers/Vendors',
        href: '/projects/vendors',
        icon: Building,
        children: [
          { name: 'Vendor List', href: '/projects/vendors/list', icon: List },
          { name: 'Payables', href: '/projects/vendors/payables', icon: CreditCard },
          { name: 'Performance', href: '/projects/vendors/performance', icon: Gauge }
        ]
      }
    ]
  },
  {
    title: 'Documentation',
    links: [
      {
        name: 'Designs & Approval',
        href: '/projects/designs',
        icon: Palette,
        children: [
          { name: 'Mood Boards', href: '/projects/designs/mood-boards', icon: Image },
          { name: 'Approval Stages', href: '/projects/designs/approvals', icon: CheckCircle },
          { name: 'Recce Reports', href: '/projects/designs/recce', icon: Camera }
        ]
      }
    ]
  },
  {
    title: 'Quality & Safety',
    links: [
      {
        name: 'Quality Management',
        href: '/projects/quality',
        icon: ShieldCheck,
        children: [
          { name: 'Quality Checks', href: '/projects/quality/checks', icon: CheckCircle },
          { name: 'Audit Reports', href: '/projects/quality/audits', icon: FileSearch },
          { name: 'Track Issues', href: '/projects/quality/issues', icon: AlertTriangle }
        ]
      },
      {
        name: 'Safety Management',
        href: '/projects/safety',
        icon: Shield,
        children: [
          { name: 'Safety Protocols', href: '/projects/safety/protocols', icon: Shield },
          { name: 'Incidents', href: '/projects/safety/incidents', icon: AlertTriangle },
          { name: 'Training', href: '/projects/safety/training', icon: BookOpen }
        ]
      }
    ]
  },
  {
    title: 'Communication',
    links: [
      {
        name: 'Team Chat',
        href: '/projects/chat',
        icon: MessageSquare,
        badge: '12'
      },
      {
        name: 'WhatsApp Integration',
        href: '/projects/whatsapp',
        icon: MessageSquare,
        isNew: true
      },
      {
        name: 'Voice Notes',
        href: '/projects/voice-notes',
        icon: Mic
      },
      {
        name: 'Client Complaints',
        href: '/projects/complaints',
        icon: AlertTriangle,
        badge: '3'
      },
      {
        name: 'Notifications',
        href: '/projects/notifications',
        icon: Bell,
        badge: '8'
      }
    ]
  },
  {
    title: 'Reports & Analytics',
    links: [
      {
        name: 'Progress Reports',
        href: '/projects/reports/progress',
        icon: FileBarChart
      },
      {
        name: 'Status Reports',
        href: '/projects/reports/status',
        icon: Activity
      },
      {
        name: 'Financial Reports',
        href: '/projects/reports/financial',
        icon: DollarSign
      },
      {
        name: 'Custom Reports',
        href: '/projects/reports/custom',
        icon: BarChart3
      },
      {
        name: 'Export Center',
        href: '/projects/reports/export',
        icon: Download
      }
    ]
  },
  {
    title: 'AI & Automation',
    links: [
      {
        name: 'AI Assistant',
        href: '/projects/ai',
        icon: Bot,
        isNew: true,
        children: [
          { name: 'Document Reader', href: '/projects/ai/document-reader', icon: FileSearch },
          { name: 'Plan Analysis', href: '/projects/ai/plan-analysis', icon: Ruler },
          { name: 'Voice Transcripts', href: '/projects/ai/transcripts', icon: Mic }
        ]
      },
      {
        name: 'Automation',
        href: '/projects/automation',
        icon: Repeat,
        children: [
          { name: 'Workflows', href: '/projects/automation/workflows', icon: GitBranch },
          { name: 'Reminders', href: '/projects/automation/reminders', icon: Bell },
          { name: 'Schedules', href: '/projects/automation/schedules', icon: CalendarDays }
        ]
      }
    ]
  },
  {
    title: 'Administration',
    links: [
      {
        name: 'Settings',
        href: '/projects/settings',
        icon: Settings,
        children: [
          { name: 'General', href: '/projects/settings/general', icon: Settings },
          { name: 'Workspace', href: '/projects/settings/workspace', icon: Building2 },
          { name: 'Currency', href: '/projects/settings/currency', icon: DollarSign },
          { name: 'Permissions', href: '/projects/settings/permissions', icon: Key }
        ]
      },
      {
        name: 'Users & Roles',
        href: '/projects/users',
        icon: UserPlus
      },
      {
        name: 'Activity Log',
        href: '/projects/activity',
        icon: History
      },
      {
        name: 'Help & Support',
        href: '/projects/help',
        icon: HelpCircle
      }
    ]
  }
];

interface ProjectSidebarProps {
  isCollapsed?: boolean;
}

export default function ProjectSidebar({ isCollapsed = false }: ProjectSidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Overview', 'Project Management']);
  const [expandedLinks, setExpandedLinks] = useState<string[]>([]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionTitle)
        ? prev.filter(t => t !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const toggleLink = (linkName: string) => {
    setExpandedLinks(prev =>
      prev.includes(linkName)
        ? prev.filter(n => n !== linkName)
        : [...prev, linkName]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  if (isCollapsed) {
    // Collapsed view - Icons only
    return (
      <TooltipProvider>
        <div className="flex h-full w-16 flex-col border-r bg-white shadow-sm">
          {/* Header - Icon only */}
          <div className="flex h-14 items-center justify-center border-b bg-gradient-to-r from-blue-50 to-white">
            <Tooltip>
              <TooltipTrigger asChild>
                <Building2 className="h-6 w-6 text-blue-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Projects Management</p>
              </TooltipContent>
            </Tooltip>
          </div>

        {/* Enterprise Quick Access - Icon only */}
        <div className="p-2 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon"
                className="w-full h-10 bg-white hover:bg-gray-50"
                onClick={() => window.location.href = '/projects/enterprise'}
              >
                <Building2 className="h-5 w-5 text-blue-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Enterprise Dashboard (PRO)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Navigation Icons */}
        <ScrollArea className="flex-1 py-2">
          <div className="space-y-1 px-2">
            {navigationSections.map((section) => (
              <div key={section.title} className="space-y-1">
                {section.links.slice(0, 5).map((link) => (
                  <Tooltip key={link.href}>
                    <TooltipTrigger asChild>
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center justify-center h-10 w-full rounded-lg transition-colors",
                          isActive(link.href)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <div>
                        <p className="font-medium">{link.name}</p>
                        {link.badge && (
                          <p className="text-xs text-gray-500">{link.badge}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
                {section.links.length > 5 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center h-8 w-full text-gray-400">
                        <MoreVertical className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-xs">+{section.links.length - 5} more</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer - Icon only */}
        <div className="border-t bg-gray-50 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = '/projects/new'}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>New Project</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      </TooltipProvider>
    );
  }

  // Expanded view - Full sidebar
  return (
    <div className="flex h-full w-full flex-col border-r bg-white shadow-sm">
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b bg-gradient-to-r from-blue-50 to-white px-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
            <p className="text-xs text-gray-500">Management System</p>
          </div>
        </div>
      </div>

      {/* Enterprise Quick Access */}
      <div className="p-3 border-b bg-gradient-to-r from-blue-600 to-blue-700">
        <Button 
          className="w-full bg-white hover:bg-gray-50 text-blue-700 font-semibold shadow-sm"
          onClick={() => window.location.href = '/projects/enterprise'}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Enterprise Dashboard
          <Badge className="ml-2 bg-blue-100 text-blue-700">PRO</Badge>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 border-b bg-gray-50 p-3">
        <div className="text-center">
          <p className="text-lg font-bold text-blue-600">48</p>
          <p className="text-xs text-gray-500">Projects</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">32</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-orange-600">5</p>
          <p className="text-xs text-gray-500">Delayed</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-4">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <span>{section.title}</span>
                {expandedSections.includes(section.title) ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
              
              {expandedSections.includes(section.title) && (
                <div className="mt-1 space-y-1">
                  {section.links.map((link) => (
                    <div key={link.href}>
                      <Link
                        to={link.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive(link.href)
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                        onClick={(e) => {
                          if (link.children) {
                            e.preventDefault();
                            toggleLink(link.name);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <link.icon className="h-4 w-4" />
                          <span>{link.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {link.badge && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                              {link.badge}
                            </Badge>
                          )}
                          {link.isNew && (
                            <Badge className="h-5 bg-green-100 px-1.5 text-xs text-green-700">
                              NEW
                            </Badge>
                          )}
                          {link.children && (
                            expandedLinks.includes(link.name) ? (
                              <ChevronDown className="h-3 w-3" />
                            ) : (
                              <ChevronRight className="h-3 w-3" />
                            )
                          )}
                        </div>
                      </Link>
                      
                      {/* Child Links */}
                      {link.children && expandedLinks.includes(link.name) && (
                        <div className="ml-6 mt-1 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors",
                                isActive(child.href)
                                  ? "bg-blue-50 text-blue-600 font-medium"
                                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                              )}
                            >
                              <child.icon className="h-3 w-3" />
                              <span>{child.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t bg-gray-50 p-3">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          onClick={() => window.location.href = '/projects/new'}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
    </div>
  );
}
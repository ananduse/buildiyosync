'use client';

import { Link, useLocation } from 'react-router-dom';
import { 
  Users, List, Grid3x3, Calendar, Map, GitBranch, Search,
  Clock, BarChart3, MessageSquare, Mail, Phone, Video,
  WhatsApp, MessageCircle, Headphones, TrendingUp, FileText,
  Database, Settings, Shield, Layers, Target, Filter,
  UserPlus, Upload, Download, Activity, PieChart, DollarSign,
  Briefcase, Building2, Globe, Hash, Tag, FolderOpen,
  GitMerge, Zap, Bell, ChevronDown, ChevronRight, Plus,
  Home, Eye, Edit, Trash2, MoreVertical, Star, Flag,
  CheckCircle, XCircle, AlertTriangle, Info, HelpCircle,
  Award, Gauge, Package, Truck, Calculator, Receipt,
  CreditCard, Wallet, TrendingDown, BarChart2, LineChart,
  Sparkles, Bot, Cpu, Smartphone, Monitor, Tablet,
  Mic, Camera, Image, FileBarChart, FileSpreadsheet,
  ClipboardList, ClipboardCheck, ClipboardX, BookOpen,
  GraduationCap, Lightbulb, Rocket, Trophy, Gift,
  Heart, ThumbsUp, Coffee, Palette, Brush, Code,
  Terminal, GitCommit, GitPullRequest, Archive, Inbox,
  Send, RefreshCw, RotateCw, Repeat, Share2, Copy,
  Link2, ExternalLink, Printer, Save, FolderPlus,
  UserCheck, UserX, Users2, UserCog, Key, Lock,
  Unlock, ShieldCheck, ShieldAlert, AlertOctagon,
  CheckSquare, Square, Circle, CircleCheck, MinusCircle,
  PlusCircle, XOctagon, AlertCircle, HelpOctagon,
  BellRing, BellOff, VolumeX, Volume2,
  Wifi, WifiOff, Cloud, CloudOff, Sun, Moon,
  Sunrise, Sunset, Wind, Droplets, Thermometer,
  Umbrella, CloudRain, CloudSnow, Tornado, Rainbow,
  Workflow, BrainCircuit, Boxes, Network, Binary
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

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  isNew?: boolean;
  isPro?: boolean;
  children?: SidebarLink[];
}

interface SidebarSection {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  links: SidebarLink[];
}

// Icon mapping for sections that might not have icons defined
const Webhook = Network;
const Megaphone = Bell;
const Wrench = Settings;
const Plug = GitBranch;

// Comprehensive Lead Management Navigation Structure
const navigationSections: SidebarSection[] = [
  {
    title: 'Overview',
    icon: Home,
    links: [
      {
        name: 'Dashboard',
        href: '/leads/dashboard',
        icon: BarChart3,
      },
      {
        name: 'All Leads',
        href: '/leads/list',
        icon: List,
      },
      {
        name: 'Board View',
        href: '/leads/board',
        icon: Grid3x3
      },
      {
        name: 'Calendar',
        href: '/leads/calendar',
        icon: Calendar,
      },
      {
        name: 'Map View',
        href: '/leads/map',
        icon: Map,
        isNew: true
      },
      {
        name: 'Pipeline',
        href: '/leads/pipeline',
        icon: GitBranch,
      }
    ]
  },
  {
    title: 'Lead Management',
    icon: Users,
    links: [
      {
        name: 'Add New Lead',
        href: '/leads/add',
        icon: UserPlus,
      },
      {
        name: 'Import/Export',
        href: '/leads/import-export',
        icon: Upload,
        children: [
          { name: 'Import CSV', href: '/leads/import/csv', icon: Upload },
          { name: 'Import Excel', href: '/leads/import/excel', icon: FileSpreadsheet },
          { name: 'Export Data', href: '/leads/export', icon: Download },
          { name: 'Backup', href: '/leads/backup', icon: Archive }
        ]
      },
      {
        name: 'Lead Details',
        href: '/leads/detail',
        icon: Eye,
        children: [
          { name: 'Profile View', href: '/leads/profile', icon: UserCheck },
          { name: 'Activity Log', href: '/leads/activity', icon: Activity },
          { name: 'Communication', href: '/leads/communication', icon: MessageSquare },
          { name: 'Documents', href: '/leads/documents', icon: FolderOpen }
        ]
      },
      {
        name: 'Lead Conversion',
        href: '/leads/conversion',
        icon: GitMerge,
        isPro: true
      },
      {
        name: 'Advanced Search',
        href: '/leads/search',
        icon: Search
      },
      {
        name: 'Timeline View',
        href: '/leads/timeline',
        icon: Clock
      }
    ]
  },
  {
    title: 'Communication',
    icon: MessageSquare,
    links: [
      {
        name: 'Communication Hub',
        href: '/leads/communication/hub',
        icon: MessageSquare,
      },
      {
        name: 'Email',
        href: '/leads/communication/email',
        icon: Mail,
        children: [
          { name: 'Composer', href: '/leads/communication/email-composer', icon: Edit },
          { name: 'Templates', href: '/leads/communication/email-templates', icon: FileText },
          { name: 'Campaigns', href: '/leads/communication/campaigns', icon: Rocket },
          { name: 'Analytics', href: '/leads/communication/email-analytics', icon: BarChart2 }
        ]
      },
      {
        name: 'WhatsApp',
        href: '/leads/communication/whatsapp',
        icon: MessageCircle,
        isNew: true
      },
      {
        name: 'SMS Center',
        href: '/leads/communication/sms',
        icon: Smartphone
      },
      {
        name: 'Call Center',
        href: '/leads/communication/call-center',
        icon: Phone,
        children: [
          { name: 'Active Calls', href: '/leads/communication/active-calls', icon: Phone },
          { name: 'Call Logs', href: '/leads/communication/call-logs', icon: ClipboardList },
          { name: 'Call Analytics', href: '/leads/communication/call-analytics', icon: BarChart3 },
          { name: 'Recording', href: '/leads/communication/recordings', icon: Mic }
        ]
      },
      {
        name: 'Video Meetings',
        href: '/leads/communication/video-meetings',
        icon: Video
      },
      {
        name: 'Live Chat',
        href: '/leads/communication/live-chat',
        icon: MessageSquare,
      }
    ]
  },
  {
    title: 'Sales & CRM',
    icon: DollarSign,
    links: [
      {
        name: 'Opportunities',
        href: '/leads/sales/opportunities',
        icon: Target,
      },
      {
        name: 'Deals',
        href: '/leads/sales/deals',
        icon: Briefcase,
        children: [
          { name: 'Active Deals', href: '/leads/sales/active-deals', icon: TrendingUp },
          { name: 'Won Deals', href: '/leads/sales/won-deals', icon: Trophy },
          { name: 'Lost Deals', href: '/leads/sales/lost-deals', icon: XCircle },
          { name: 'Deal Analytics', href: '/leads/sales/deal-analytics', icon: PieChart }
        ]
      },
      {
        name: 'Quotes',
        href: '/leads/sales/quotes',
        icon: Receipt,
        children: [
          { name: 'Create Quote', href: '/leads/additional/quote-generator', icon: Plus },
          { name: 'Quote Templates', href: '/leads/sales/quote-templates', icon: FileText },
          { name: 'Pending Quotes', href: '/leads/sales/pending-quotes', icon: Clock },
          { name: 'Approved Quotes', href: '/leads/sales/approved-quotes', icon: CheckCircle }
        ]
      },
      {
        name: 'Contracts',
        href: '/leads/sales/contracts',
        icon: FileText
      },
      {
        name: 'Proposals',
        href: '/leads/sales/proposals',
        icon: FileBarChart,
        children: [
          { name: 'Create Proposal', href: '/leads/additional/proposal-management', icon: Plus },
          { name: 'Templates', href: '/leads/sales/proposal-templates', icon: FileText },
          { name: 'Tracking', href: '/leads/sales/proposal-tracking', icon: Eye }
        ]
      },
      {
        name: 'Forecasting',
        href: '/leads/sales/forecasting',
        icon: TrendingUp,
        isPro: true
      },
      {
        name: 'Commission',
        href: '/leads/sales/commission',
        icon: Calculator
      }
    ]
  },
  {
    title: 'Automation',
    icon: Zap,
    links: [
      {
        name: 'Workflow Builder',
        href: '/leads/automation/workflow-builder',
        icon: Workflow,
        isPro: true
      },
      {
        name: 'Triggers',
        href: '/leads/automation/triggers',
        icon: Zap,
        children: [
          { name: 'Event Triggers', href: '/leads/automation/triggers', icon: Bell },
          { name: 'Time Triggers', href: '/leads/automation/time-triggers', icon: Clock },
          { name: 'Conditions', href: '/leads/automation/conditions', icon: GitBranch },
          { name: 'Actions', href: '/leads/automation/actions', icon: Rocket }
        ]
      },
      {
        name: 'Lead Nurturing',
        href: '/leads/automation/templates/nurturing',
        icon: Heart,
        children: [
          { name: 'Welcome Series', href: '/leads/automation/templates/welcome', icon: Gift },
          { name: 'Follow-up Sequences', href: '/leads/automation/templates/followup', icon: Repeat },
          { name: 'Re-engagement', href: '/leads/automation/re-engagement', icon: RefreshCw },
          { name: 'Drip Campaigns', href: '/leads/automation/drip', icon: Droplets }
        ]
      },
      {
        name: 'AI Assistant',
        href: '/leads/automation/ai',
        icon: Bot,
        isNew: true,
        isPro: true
      },
      {
        name: 'Automation Logs',
        href: '/leads/automation/logs',
        icon: ClipboardList
      },
      {
        name: 'Performance',
        href: '/leads/automation/metrics',
        icon: Gauge
      }
    ]
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    links: [
      {
        name: 'Analytics Dashboard',
        href: '/leads/analytics/dashboard',
        icon: PieChart,
      },
      {
        name: 'Sales Analytics',
        href: '/leads/analytics/sales-dashboard',
        icon: TrendingUp
      },
      {
        name: 'Performance',
        href: '/leads/analytics/performance-dashboard',
        icon: Activity
      },
      {
        name: 'Executive View',
        href: '/leads/analytics/executive-dashboard',
        icon: Briefcase,
        isPro: true
      },
      {
        name: 'Reports',
        href: '/leads/analytics/reports',
        icon: FileBarChart,
        children: [
          { name: 'Standard Reports', href: '/leads/analytics/standard-reports', icon: FileText },
          { name: 'Custom Reports', href: '/leads/analytics/custom-reports', icon: FileSpreadsheet },
          { name: 'Scheduled Reports', href: '/leads/analytics/scheduled-reports', icon: Clock },
          { name: 'Report Builder', href: '/leads/analytics/report-builder', icon: Brush }
        ]
      },
      {
        name: 'Export Center',
        href: '/leads/analytics/export-center',
        icon: Download
      },
      {
        name: 'API Access',
        href: '/leads/analytics/api',
        icon: Code,
        isPro: true
      }
    ]
  },
  {
    title: 'Master Data',
    icon: Database,
    links: [
      {
        name: 'Lead Sources',
        href: '/leads/master-data/lead-sources',
        icon: Globe
      },
      {
        name: 'Lead Status',
        href: '/leads/master-data/lead-statuses',
        icon: Flag
      },
      {
        name: 'Categories',
        href: '/leads/master-data/lead-categories',
        icon: Tag
      },
      {
        name: 'Industries',
        href: '/leads/master-data/industries',
        icon: Building2
      },
      {
        name: 'Locations',
        href: '/leads/master-data/countries',
        icon: Map,
        children: [
          { name: 'Countries', href: '/leads/countries', icon: Globe },
          { name: 'States', href: '/leads/states', icon: Map },
          { name: 'Cities', href: '/leads/master-data/cities', icon: Building2 },
          { name: 'Territories', href: '/leads/territories', icon: Layers }
        ]
      },
      {
        name: 'Project Types',
        href: '/leads/project-types',
        icon: Briefcase
      },
      {
        name: 'Service Types',
        href: '/leads/service-types',
        icon: Wrench
      },
      {
        name: 'Custom Fields',
        href: '/leads/master-data/custom-fields',
        icon: Edit,
        isPro: true
      }
    ]
  },
  {
    title: 'Team & Collaboration',
    icon: Users2,
    links: [
      {
        name: 'Team Management',
        href: '/leads/team/management',
        icon: Users,
        children: [
          { name: 'Team Members', href: '/leads/master-data/team-management', icon: Users2 },
          { name: 'Roles', href: '/leads/team/roles', icon: Shield },
          { name: 'Performance', href: '/leads/team/performance', icon: TrendingUp },
          { name: 'Load Balancing', href: '/leads/team/load-balancing', icon: Gauge }
        ]
      },
      {
        name: 'Assignment Rules',
        href: '/leads/master-data/assignment-rules',
        icon: GitMerge
      },
      {
        name: 'Territories',
        href: '/leads/team/territories',
        icon: Map
      },
      {
        name: 'Collaboration',
        href: '/leads/collaboration',
        icon: Users2,
        children: [
          { name: 'Shared Notes', href: '/leads/collaboration/notes', icon: BookOpen },
          { name: 'Internal Chat', href: '/leads/collaboration/messaging', icon: MessageSquare },
          { name: 'Lead Handoffs', href: '/leads/collaboration/handoffs', icon: GitMerge },
          { name: 'Team Activity', href: '/leads/collaboration/activity', icon: Activity }
        ]
      },
      {
        name: 'Scoring Rules',
        href: '/leads/master-data/scoring-rules',
        icon: Star
      }
    ]
  },
  {
    title: 'Forms & Landing',
    icon: FileText,
    links: [
      {
        name: 'Form Builder',
        href: '/leads/forms/builder',
        icon: Edit,
      },
      {
        name: 'Form Templates',
        href: '/leads/forms/templates',
        icon: FileText
      },
      {
        name: 'Multi-Step Forms',
        href: '/leads/forms/multi-step',
        icon: GitBranch
      },
      {
        name: 'Form Analytics',
        href: '/leads/forms/analytics',
        icon: BarChart3,
        children: [
          { name: 'Overview', href: '/leads/forms/analytics/overview', icon: PieChart },
          { name: 'Funnel Analysis', href: '/leads/forms/analytics/funnel', icon: Filter },
          { name: 'Field Analysis', href: '/leads/forms/analytics/fields', icon: List },
          { name: 'A/B Testing', href: '/leads/forms/ab-testing', icon: GitBranch }
        ]
      },
      {
        name: 'Submissions',
        href: '/leads/forms/submissions',
        icon: Inbox,
      },
      {
        name: 'Webhooks',
        href: '/leads/forms/webhooks',
        icon: Webhook,
        isPro: true
      }
    ]
  },
  {
    title: 'Additional Tools',
    icon: Package,
    links: [
      {
        name: 'Meeting Scheduler',
        href: '/leads/additional/meeting-scheduler',
        icon: Calendar
      },
      {
        name: 'Follow-up Manager',
        href: '/leads/additional/follow-up-manager',
        icon: Clock
      },
      {
        name: 'Task Management',
        href: '/leads/additional/task-management',
        icon: CheckSquare
      },
      {
        name: 'Campaign Manager',
        href: '/leads/additional/campaign-manager',
        icon: Megaphone
      },
      {
        name: 'Document Manager',
        href: '/leads/additional/document-management',
        icon: FolderOpen
      },
      {
        name: 'Lead Tools',
        href: '/leads/additional/lead-tools',
        icon: Wrench
      },
      {
        name: 'Bulk Operations',
        href: '/leads/additional/bulk-operations',
        icon: Boxes
      },
      {
        name: 'Audit Trail',
        href: '/leads/additional/audit-trail',
        icon: Shield
      }
    ]
  },
  {
    title: 'Data Quality',
    icon: ShieldCheck,
    links: [
      {
        name: 'Duplicate Management',
        href: '/leads/data-quality/duplicates',
        icon: Copy,
      },
      {
        name: 'Data Validation',
        href: '/leads/data-quality/validation',
        icon: CheckCircle
      },
      {
        name: 'Data Cleanup',
        href: '/leads/data-quality/cleanup',
        icon: Trash2
      },
      {
        name: 'Data Enrichment',
        href: '/leads/analytics/enrichment',
        icon: Sparkles,
        isPro: true
      }
    ]
  },
  {
    title: 'Administration',
    icon: Settings,
    links: [
      {
        name: 'General Settings',
        href: '/leads/admin/general-settings',
        icon: Settings
      },
      {
        name: 'Email Configuration',
        href: '/leads/admin/email-settings',
        icon: Mail
      },
      {
        name: 'Integrations',
        href: '/leads/admin/integrations',
        icon: Plug,
        children: [
          { name: 'CRM Integration', href: '/leads/admin/integrations/crm', icon: Database },
          { name: 'Email Services', href: '/leads/admin/integrations/email', icon: Mail },
          { name: 'Calendar Sync', href: '/leads/admin/integrations/calendar', icon: Calendar },
          { name: 'API Settings', href: '/leads/admin/integrations/api', icon: Code }
        ]
      },
      {
        name: 'Security',
        href: '/leads/admin/security',
        icon: Shield,
        children: [
          { name: 'Access Control', href: '/leads/admin/security', icon: Lock },
          { name: 'Data Privacy', href: '/leads/admin/privacy', icon: ShieldCheck },
          { name: 'Access Logs', href: '/leads/admin/access-logs', icon: ClipboardList },
          { name: 'Audit Logs', href: '/leads/admin/logs', icon: FileText }
        ]
      },
      {
        name: 'System Health',
        href: '/leads/admin/system-health',
        icon: Activity
      },
      {
        name: 'Performance',
        href: '/leads/admin/performance',
        icon: Gauge
      },
      {
        name: 'Backup & Restore',
        href: '/leads/admin/backup',
        icon: Archive,
        isPro: true
      }
    ]
  }
];

interface LeadSidebarProps {
  isCollapsed?: boolean;
}

export default function LeadSidebar({ isCollapsed = false }: LeadSidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['Overview']);
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
                <Users className="h-6 w-6 text-blue-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Lead Management</p>
              </TooltipContent>
            </Tooltip>
          </div>


          {/* Navigation Icons - Main sections only */}
          <ScrollArea className="flex-1 py-2">
            <div className="space-y-2 px-2">
              {navigationSections.map((section) => {
                const SectionIcon = section.icon;
                if (!SectionIcon) return null;
                
                return (
                  <Tooltip key={section.title}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                          "w-full h-10",
                          "hover:bg-blue-50 hover:text-blue-600"
                        )}
                        onClick={() => {
                          // Navigate to first link in the section
                          if (section.links.length > 0) {
                            window.location.href = section.links[0].href;
                          }
                        }}
                      >
                        <SectionIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-medium">{section.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </ScrollArea>

          {/* Footer Actions - Icons only */}
          <div className="border-t bg-gray-50 p-2 space-y-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon"
                  variant="outline"
                  className="w-full h-10"
                  onClick={() => window.location.href = '/leads/settings'}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Lead Settings</p>
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
          <Users className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Leads</h2>
            <p className="text-xs text-gray-500">CRM System</p>
          </div>
        </div>
      </div>



      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-4">
          {navigationSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    {SectionIcon && <SectionIcon className="h-3 w-3" />}
                    <span>{section.title}</span>
                  </div>
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
                              : "text-gray-600 hover:bg-blue-50 hover:text-gray-900"
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
                              <Badge 
                                variant={link.badgeColor || "secondary"} 
                                className="h-5 px-1.5 text-xs"
                              >
                                {link.badge}
                              </Badge>
                            )}
                            {link.isNew && (
                              <Badge className="h-5 bg-blue-100 px-1.5 text-xs text-blue-700">
                                NEW
                              </Badge>
                            )}
                            {link.isPro && (
                              <Badge className="h-5 bg-purple-100 px-1.5 text-xs text-purple-700">
                                PRO
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
                                    : "text-gray-500 hover:bg-blue-50 hover:text-gray-900"
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
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t bg-gray-50 p-3 space-y-2">
        <Button 
          variant="outline"
          className="w-full justify-start" 
          onClick={() => window.location.href = '/leads/settings'}
        >
          <Settings className="h-4 w-4 mr-2" />
          Lead Settings
        </Button>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Last sync: 2 mins ago</span>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <RefreshCw className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
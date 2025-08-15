'use client';

import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Zap, 
  Database, 
  Shield, 
  Settings,
  Eye,
  List,
  Grid,
  Calendar,
  Map,
  Target,
  Search,
  Clock,
  Mail,
  Phone,
  Smartphone,
  Video,
  FileText,
  CalendarDays,
  Bell,
  Megaphone,
  Wrench,
  Building,
  MapPin,
  Tag,
  GitBranch,
  Activity,
  PieChart,
  RefreshCw,
  Download,
  Globe,
  Copy,
  CheckCircle2,
  Trash2,
  Award,
  Scale,
  Share,
  Link2,
  CheckCircle,
  AlertTriangle,
  Lock,
  Wrench as ToolIcon,
  Gauge
} from 'lucide-react';

export interface NavigationLink {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  isNew?: boolean;
}

export const allNavigationLinks: Record<string, NavigationLink[]> = {
  // Overview & Dashboard
  'overview': [
    {
      title: 'Dashboard',
      href: '/leads/dashboard',
      icon: BarChart3,
      description: 'Main dashboard with key metrics and insights',
      badge: '15'
    },
    {
      title: 'Recent Activity',
      href: '/leads/timeline',
      icon: Clock,
      description: 'Timeline of recent lead activities'
    }
  ],

  // Lead Management - Core Views
  'lead-views': [
    {
      title: 'All Leads',
      href: '/leads/list',
      icon: List,
      description: 'Complete list of all leads with filters',
      badge: '1,247'
    },
    {
      title: 'Kanban Board',
      href: '/leads/board',
      icon: Grid,
      description: 'Visual kanban board for lead pipeline'
    },
    {
      title: 'Calendar View',
      href: '/leads/calendar',
      icon: Calendar,
      description: 'Calendar view of lead activities and follow-ups'
    },
    {
      title: 'Map View',
      href: '/leads/map',
      icon: Map,
      description: 'Geographical distribution of leads'
    },
    {
      title: 'Pipeline View',
      href: '/leads/pipeline',
      icon: TrendingUp,
      description: 'Sales pipeline visualization',
      isNew: true
    }
  ],

  // Lead Operations
  'lead-operations': [
    {
      title: 'Lead Details',
      href: '/leads/detail',
      icon: Eye,
      description: 'Detailed view of individual leads'
    },
    {
      title: 'Add New Lead',
      href: '/leads/add',
      icon: Users,
      description: 'Create a new lead entry'
    },
    {
      title: 'Lead Conversion',
      href: '/leads/conversion',
      icon: Target,
      description: 'Convert leads to customers',
      badge: 'New'
    },
    {
      title: 'Advanced Search',
      href: '/leads/search',
      icon: Search,
      description: 'Advanced search and filtering'
    },
    {
      title: 'Import/Export',
      href: '/leads/import-export',
      icon: RefreshCw,
      description: 'Bulk import and export operations'
    }
  ],

  // Communication Hub
  'communication': [
    {
      title: 'Communication Center',
      href: '/leads/communication/hub',
      icon: MessageSquare,
      description: 'Unified communication dashboard',
      badge: '12'
    },
    {
      title: 'Email Composer',
      href: '/leads/communication/email-composer',
      icon: Mail,
      description: 'Compose and send emails'
    },
    {
      title: 'Email Templates',
      href: '/leads/communication/email-templates',
      icon: FileText,
      description: 'Manage email templates',
      badge: '24'
    },
    {
      title: 'WhatsApp Business',
      href: '/leads/communication/whatsapp',
      icon: MessageSquare,
      description: 'WhatsApp business messaging',
      badge: '8'
    },
    {
      title: 'SMS Marketing',
      href: '/leads/communication/sms',
      icon: Smartphone,
      description: 'SMS campaigns and messaging',
      badge: '3'
    },
    {
      title: 'Call Center',
      href: '/leads/communication/call-center',
      icon: Phone,
      description: 'Voice calling and dialer'
    },
    {
      title: 'Video Meetings',
      href: '/leads/communication/video-meetings',
      icon: Video,
      description: 'Video conferencing integration'
    },
    {
      title: 'Communication History',
      href: '/leads/communication/history',
      icon: Clock,
      description: 'Complete communication history'
    },
    {
      title: 'Communication Analytics',
      href: '/leads/communication/analytics',
      icon: TrendingUp,
      description: 'Communication performance metrics'
    }
  ],

  // Sales Operations
  'sales': [
    {
      title: 'Opportunity Management',
      href: '/leads/sales/opportunities',
      icon: Target,
      description: 'Track sales opportunities'
    },
    {
      title: 'Deal Tracking',
      href: '/leads/sales/deals',
      icon: TrendingUp,
      description: 'Monitor deals in progress'
    },
    {
      title: 'Quote Generator',
      href: '/leads/additional/quote-generator',
      icon: FileText,
      description: 'Generate quotes and proposals'
    },
    {
      title: 'Meeting Scheduler',
      href: '/leads/additional/meeting-scheduler',
      icon: CalendarDays,
      description: 'Schedule meetings with leads'
    },
    {
      title: 'Follow-up Manager',
      href: '/leads/additional/follow-up-manager',
      icon: Bell,
      description: 'Manage follow-up tasks'
    },
    {
      title: 'Task Management',
      href: '/leads/additional/task-management',
      icon: CheckCircle2,
      description: 'Lead-related task tracking'
    }
  ],

  // Automation & Workflows
  'automation': [
    {
      title: 'Workflow Designer',
      href: '/leads/automation/workflow-builder',
      icon: Zap,
      description: 'Visual workflow builder',
      badge: 'New'
    },
    {
      title: 'Trigger Events',
      href: '/leads/automation/triggers',
      icon: Target,
      description: 'Define workflow triggers',
      badge: '15'
    },
    {
      title: 'Condition Builder',
      href: '/leads/automation/conditions',
      icon: GitBranch,
      description: 'Build conditional logic',
      badge: '8'
    },
    {
      title: 'Action Blocks',
      href: '/leads/automation/actions',
      icon: Activity,
      description: 'Workflow action library',
      badge: '12'
    },
    {
      title: 'Workflow Analytics',
      href: '/leads/automation/analytics',
      icon: BarChart3,
      description: 'Automation performance metrics'
    }
  ],

  // Analytics & Reporting
  'analytics': [
    {
      title: 'Lead Analytics Dashboard',
      href: '/leads/analytics/dashboard',
      icon: BarChart3,
      description: 'Main analytics dashboard'
    },
    {
      title: 'Sales Dashboard',
      href: '/leads/analytics/sales-dashboard',
      icon: TrendingUp,
      description: 'Sales performance analytics'
    },
    {
      title: 'Report Builder',
      href: '/leads/analytics/report-builder',
      icon: PieChart,
      description: 'Custom report designer',
      badge: 'New'
    },
    {
      title: 'Standard Reports',
      href: '/leads/analytics/standard-reports',
      icon: FileText,
      description: 'Pre-built report templates'
    },
    {
      title: 'Custom Reports',
      href: '/leads/analytics/custom-reports',
      icon: FileText,
      description: 'User-created custom reports'
    },
    {
      title: 'Export Center',
      href: '/leads/analytics/export-center',
      icon: Download,
      description: 'Data export and download'
    }
  ],

  // Data Management & Master Data
  'data-management': [
    {
      title: 'Lead Sources',
      href: '/leads/master-data/lead-sources',
      icon: Globe,
      description: 'Manage lead sources',
      badge: '12'
    },
    {
      title: 'Lead Statuses',
      href: '/leads/master-data/lead-statuses',
      icon: Tag,
      description: 'Configure lead statuses',
      badge: '8'
    },
    {
      title: 'Lead Categories',
      href: '/leads/master-data/lead-categories',
      icon: Grid,
      description: 'Organize lead categories',
      badge: '6'
    },
    {
      title: 'Industries',
      href: '/leads/master-data/industries',
      icon: Building,
      description: 'Industry classifications'
    },
    {
      title: 'Project Types',
      href: '/leads/master-data/project-types',
      icon: FileText,
      description: 'Project type definitions'
    },
    {
      title: 'Team Management',
      href: '/leads/master-data/team-management',
      icon: Users,
      description: 'Manage team members and roles'
    },
    {
      title: 'Assignment Rules',
      href: '/leads/master-data/assignment-rules',
      icon: GitBranch,
      description: 'Lead assignment automation'
    },
    {
      title: 'Scoring Rules',
      href: '/leads/master-data/scoring-rules',
      icon: Target,
      description: 'Lead scoring configuration'
    }
  ],

  // Tools & Utilities
  'tools': [
    {
      title: 'Lead Tools',
      href: '/leads/additional/lead-tools',
      icon: Wrench,
      description: 'Lead enrichment and verification'
    },
    {
      title: 'Bulk Operations',
      href: '/leads/additional/bulk-operations',
      icon: Users,
      description: 'Mass lead operations'
    },
    {
      title: 'Campaign Manager',
      href: '/leads/additional/campaign-manager',
      icon: Megaphone,
      description: 'Marketing campaign management'
    },
    {
      title: 'Activity Management',
      href: '/leads/additional/activity-management',
      icon: Activity,
      description: 'Track lead activities'
    },
    {
      title: 'Document Management',
      href: '/leads/additional/document-management',
      icon: FileText,
      description: 'Lead-related documents'
    },
    {
      title: 'Proposal Management',
      href: '/leads/additional/proposal-management',
      icon: FileText,
      description: 'Create and track proposals'
    }
  ],

  // Administration & Settings
  'administration': [
    {
      title: 'General Settings',
      href: '/leads/admin/general-settings',
      icon: Settings,
      description: 'System configuration'
    },
    {
      title: 'Email Configuration',
      href: '/leads/admin/email-settings',
      icon: Mail,
      description: 'Email server settings'
    },
    {
      title: 'Integrations',
      href: '/leads/admin/integrations',
      icon: Link2,
      description: 'Third-party integrations'
    },
    {
      title: 'Audit Trail',
      href: '/leads/additional/audit-trail',
      icon: Shield,
      description: 'System audit logs'
    },
    {
      title: 'Data Privacy (GDPR)',
      href: '/leads/admin/privacy',
      icon: Shield,
      description: 'Privacy and compliance'
    },
    {
      title: 'Security Settings',
      href: '/leads/admin/security',
      icon: Lock,
      description: 'Security configuration'
    },
    {
      title: 'System Health',
      href: '/leads/admin/system-health',
      icon: Activity,
      description: 'System monitoring'
    },
    {
      title: 'Performance Monitoring',
      href: '/leads/admin/performance',
      icon: Gauge,
      description: 'Performance metrics'
    }
  ]
};

// Flattened list of all navigation links for easy searching
export const getAllNavigationLinks = (): NavigationLink[] => {
  return Object.values(allNavigationLinks).flat();
};

// Get navigation links by category
export const getNavigationLinksByCategory = (category: string): NavigationLink[] => {
  return allNavigationLinks[category] || [];
};

// Search navigation links
export const searchNavigationLinks = (query: string): NavigationLink[] => {
  const allLinks = getAllNavigationLinks();
  const searchTerm = query.toLowerCase();
  
  return allLinks.filter(link => 
    link.title.toLowerCase().includes(searchTerm) ||
    (link.description && link.description.toLowerCase().includes(searchTerm))
  );
};

// Quick access links for most commonly used features
export const quickAccessLinks: NavigationLink[] = [
  {
    title: 'Dashboard',
    href: '/leads/dashboard',
    icon: BarChart3,
    description: 'Main dashboard overview'
  },
  {
    title: 'All Leads',
    href: '/leads/list',
    icon: List,
    description: 'View all leads',
    badge: '1,247'
  },
  {
    title: 'Add New Lead',
    href: '/leads/add',
    icon: Users,
    description: 'Create new lead'
  },
  {
    title: 'Kanban Board',
    href: '/leads/board',
    icon: Grid,
    description: 'Visual pipeline'
  },
  {
    title: 'Communication Center',
    href: '/leads/communication/hub',
    icon: MessageSquare,
    description: 'Unified communications',
    badge: '12'
  },
  {
    title: 'Email Composer',
    href: '/leads/communication/email-composer',
    icon: Mail,
    description: 'Send emails'
  },
  {
    title: 'Advanced Search',
    href: '/leads/search',
    icon: Search,
    description: 'Find leads'
  },
  {
    title: 'Workflow Builder',
    href: '/leads/automation/workflow-builder',
    icon: Zap,
    description: 'Automate processes',
    isNew: true
  }
];

// Component to display navigation index
interface NavigationIndexProps {
  category?: string;
  showDescriptions?: boolean;
  showBadges?: boolean;
}

export default function NavigationIndex({ 
  category, 
  showDescriptions = true, 
  showBadges = true 
}: NavigationIndexProps) {
  const links = category ? getNavigationLinksByCategory(category) : quickAccessLinks;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            to={link.href}
            className="group block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  {showBadges && link.badge && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {link.badge}
                    </span>
                  )}
                  {showBadges && link.isNew && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </div>
                {showDescriptions && link.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {link.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
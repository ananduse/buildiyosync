import {
  AlertCircle,
  Award,
  Badge,
  BarChart3,
  Bell,
  Bitcoin,
  Bolt,
  Book,
  Briefcase,
  Building,
  CalendarCheck,
  Captions,
  CheckCircle,
  Code,
  Codepen,
  Coffee,
  Database,
  File as DocumentIcon,
  Euro,
  Eye,
  File,
  FileQuestion,
  FileText,
  Flag,
  Ghost,
  Gift,
  Grid,
  Heart,
  HelpCircle,
  Kanban,
  Key,
  Layout,
  LayoutGrid,
  LifeBuoy,
  MessageSquare,
  Monitor,
  Network,
  Users as PeopleIcon,
  Plug,
  ScrollText,
  Settings,
  Share2,
  Shield,
  ShieldOff,
  ShieldUser,
  ShoppingCart,
  SquareMousePointer,
  Star,
  Target,
  Theater,
  ThumbsUp,
  TrendingUp,
  UserCheck,
  UserCircle,
  Users,
  Briefcase as WorkIcon,
  Zap,
} from 'lucide-react';
import { type MenuConfig } from './types';

export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    path: '/',
  },
  { heading: 'Projects' },
  {
    title: 'All Projects',
    icon: Briefcase,
    children: [
      { title: 'Project List', path: '/projects/list' },
      { title: 'Project Grid', path: '/projects/grid' },
      { title: 'Create Project', path: '/projects/create' },
    ],
  },
  {
    title: 'Project Management',
    icon: Eye,
    children: [
      { title: 'Overview', path: '/projects/overview' },
      { title: 'Timeline', path: '/projects/timeline' },
      { title: 'Team', path: '/projects/team' },
      { title: 'Budget', path: '/projects/budget' },
      { title: 'Tasks', path: '/projects/tasks' },
      { title: 'Documents', path: '/projects/documents' },
      { title: 'Reports', path: '/projects/reports' },
      { title: 'Calendar', path: '/projects/calendar' },
      { title: 'Activity', path: '/projects/activity' },
    ],
  },
  {
    title: 'Project Settings',
    icon: Settings,
    children: [
      { title: 'Project Templates', path: '/projects/templates' },
      { title: 'Resource Management', path: '/projects/resources' },
    ],
  },
  { heading: 'Lead Management' },
  {
    title: 'Leads Overview',
    icon: Target,
    children: [
      { title: 'Dashboard', path: '/leads/dashboard' },
      { title: 'Recent Activity', path: '/leads/timeline' },
    ],
  },
  {
    title: 'Lead Views',
    icon: Eye,
    children: [
      { title: 'All Leads', path: '/leads/list', badge: '1,247' },
      { title: 'Kanban Board', path: '/leads/board' },
      { title: 'Calendar View', path: '/leads/calendar' },
      { title: 'Map View', path: '/leads/map' },
      { title: 'Pipeline View', path: '/leads/pipeline', badge: 'New' },
    ],
  },
  {
    title: 'Lead Operations',
    icon: Settings,
    children: [
      { title: 'Add New Lead', path: '/leads/add' },
      { title: 'Lead Details', path: '/leads/detail' },
      { title: 'Lead Conversion', path: '/leads/conversion', badge: 'New' },
      { title: 'Advanced Search', path: '/leads/search' },
      { title: 'Import/Export', path: '/leads/import-export' },
      { title: 'Bulk Operations', path: '/leads/additional/bulk-operations' },
    ],
  },
  {
    title: 'Communication Hub',
    icon: MessageSquare,
    children: [
      { title: 'Communication Center', path: '/leads/communication/hub', badge: '12' },
      {
        title: 'Email Marketing',
        children: [
          { title: 'Compose Email', path: '/leads/communication/email-composer' },
          { title: 'Email Templates', path: '/leads/communication/email-templates', badge: '24' },
          { title: 'Email Campaigns', path: '/leads/communication/campaigns' },
          { title: 'Email Analytics', path: '/leads/communication/email-analytics' },
        ],
      },
      {
        title: 'Messaging Channels',
        children: [
          { title: 'WhatsApp Business', path: '/leads/communication/whatsapp', badge: '8' },
          { title: 'SMS Marketing', path: '/leads/communication/sms', badge: '3' },
          { title: 'Live Chat', path: '/leads/communication/live-chat' },
        ],
      },
      {
        title: 'Voice & Video',
        children: [
          { title: 'Call Center', path: '/leads/communication/call-center' },
          { title: 'Video Meetings', path: '/leads/communication/video-meetings' },
          { title: 'Call Analytics', path: '/leads/communication/call-analytics' },
        ],
      },
      {
        title: 'Communication Tracking',
        children: [
          { title: 'Communication History', path: '/leads/communication/history' },
          { title: 'Interaction Timeline', path: '/leads/communication/timeline' },
          { title: 'Response Analytics', path: '/leads/communication/analytics' },
        ],
      },
    ],
  },
  {
    title: 'Sales Operations',
    icon: TrendingUp,
    children: [
      {
        title: 'Sales Pipeline',
        children: [
          { title: 'Opportunity Management', path: '/leads/sales/opportunities' },
          { title: 'Deal Tracking', path: '/leads/sales/deals' },
          { title: 'Sales Forecasting', path: '/leads/sales/forecasting' },
        ],
      },
      {
        title: 'Quotations & Proposals',
        children: [
          { title: 'Quote Generator', path: '/leads/additional/quote-generator' },
          { title: 'Proposal Management', path: '/leads/additional/proposal-management' },
          { title: 'Contract Management', path: '/leads/sales/contracts' },
        ],
      },
      {
        title: 'Sales Activities',
        children: [
          { title: 'Meeting Scheduler', path: '/leads/additional/meeting-scheduler' },
          { title: 'Follow-up Manager', path: '/leads/additional/follow-up-manager' },
          { title: 'Task Management', path: '/leads/additional/task-management' },
        ],
      },
    ],
  },
  {
    title: 'Automation & Workflows',
    icon: Zap,
    children: [
      { title: 'Workflow Designer', path: '/leads/automation/workflow-builder', badge: 'New' },
      {
        title: 'Automation Components',
        children: [
          { title: 'Trigger Events', path: '/leads/automation/triggers', badge: '15' },
          { title: 'Condition Builder', path: '/leads/automation/conditions', badge: '8' },
          { title: 'Action Blocks', path: '/leads/automation/actions', badge: '12' },
        ],
      },
      {
        title: 'Automation Templates',
        children: [
          { title: 'Lead Nurturing Templates', path: '/leads/automation/templates/nurturing' },
          { title: 'Follow-up Sequences', path: '/leads/automation/templates/followup' },
          { title: 'Welcome Series', path: '/leads/automation/templates/welcome' },
        ],
      },
      {
        title: 'Monitoring & Analytics',
        children: [
          { title: 'Workflow Analytics', path: '/leads/automation/analytics' },
          { title: 'Automation Logs', path: '/leads/automation/logs' },
          { title: 'Performance Metrics', path: '/leads/automation/metrics' },
        ],
      },
    ],
  },
  {
    title: 'Analytics & Reporting',
    icon: BarChart3,
    children: [
      {
        title: 'Dashboards',
        children: [
          { title: 'Lead Analytics', path: '/leads/analytics/dashboard' },
          { title: 'Sales Dashboard', path: '/leads/analytics/sales-dashboard' },
          { title: 'Performance Dashboard', path: '/leads/analytics/performance-dashboard' },
          { title: 'Executive Dashboard', path: '/leads/analytics/executive-dashboard' },
        ],
      },
      { title: 'Report Builder', path: '/leads/analytics/report-builder', badge: 'New' },
      {
        title: 'Reports',
        children: [
          { title: 'Standard Reports', path: '/leads/analytics/standard-reports' },
          { title: 'Custom Reports', path: '/leads/analytics/custom-reports' },
          { title: 'Scheduled Reports', path: '/leads/analytics/scheduled-reports' },
        ],
      },
      {
        title: 'Data Export',
        children: [
          { title: 'Export Center', path: '/leads/analytics/export-center' },
          { title: 'Data Backup', path: '/leads/analytics/backup' },
          { title: 'API Access', path: '/leads/analytics/api' },
        ],
      },
    ],
  },
  {
    title: 'Data Management',
    icon: Database,
    children: [
      {
        title: 'Lead Data',
        children: [
          { title: 'Lead Sources', path: '/leads/master-data/lead-sources', badge: '12' },
          { title: 'Lead Statuses', path: '/leads/master-data/lead-statuses', badge: '8' },
          { title: 'Lead Categories', path: '/leads/master-data/lead-categories', badge: '6' },
          { title: 'Lead Stages', path: '/leads/master-data/lead-stages' },
        ],
      },
      {
        title: 'Organizational Data',
        children: [
          { title: 'Industries', path: '/leads/master-data/industries' },
          { title: 'Company Sizes', path: '/leads/master-data/company-sizes' },
          { title: 'Project Types', path: '/leads/master-data/project-types' },
          { title: 'Service Types', path: '/leads/master-data/service-types' },
        ],
      },
      {
        title: 'Geographical Data',
        children: [
          { title: 'Countries', path: '/leads/master-data/countries' },
          { title: 'States/Regions', path: '/leads/master-data/states' },
          { title: 'Cities', path: '/leads/master-data/cities' },
          { title: 'Sales Territories', path: '/leads/master-data/territories' },
        ],
      },
      {
        title: 'Data Quality',
        children: [
          { title: 'Lead Enrichment Tools', path: '/leads/additional/lead-tools' },
          { title: 'Duplicate Management', path: '/leads/data-quality/duplicates' },
          { title: 'Data Validation', path: '/leads/data-quality/validation' },
          { title: 'Data Cleanup', path: '/leads/data-quality/cleanup' },
        ],
      },
    ],
  },
  {
    title: 'Team & Collaboration',
    icon: Users,
    children: [
      {
        title: 'Team Management',
        children: [
          { title: 'Team Members', path: '/leads/master-data/team-management' },
          { title: 'Roles & Permissions', path: '/leads/team/roles' },
          { title: 'Team Performance', path: '/leads/team/performance' },
        ],
      },
      {
        title: 'Assignment & Distribution',
        children: [
          { title: 'Assignment Rules', path: '/leads/master-data/assignment-rules' },
          { title: 'Load Balancing', path: '/leads/team/load-balancing' },
          { title: 'Territory Management', path: '/leads/team/territories' },
        ],
      },
      {
        title: 'Collaboration Tools',
        children: [
          { title: 'Shared Notes', path: '/leads/collaboration/notes' },
          { title: 'Internal Messaging', path: '/leads/collaboration/messaging' },
          { title: 'Lead Handoffs', path: '/leads/collaboration/handoffs' },
        ],
      },
    ],
  },
  {
    title: 'Administration',
    icon: Settings,
    children: [
      {
        title: 'System Configuration',
        children: [
          { title: 'General Settings', path: '/leads/admin/general-settings' },
          { title: 'Email Configuration', path: '/leads/admin/email-settings' },
          { title: 'Integrations', path: '/leads/admin/integrations' },
        ],
      },
      {
        title: 'Business Rules',
        children: [
          { title: 'Lead Scoring Rules', path: '/leads/master-data/scoring-rules' },
          { title: 'Qualification Criteria', path: '/leads/admin/qualification' },
          { title: 'Escalation Rules', path: '/leads/admin/escalation' },
        ],
      },
      {
        title: 'Compliance & Security',
        children: [
          { title: 'Audit Trail', path: '/leads/additional/audit-trail' },
          { title: 'Data Privacy (GDPR)', path: '/leads/admin/privacy' },
          { title: 'Access Logs', path: '/leads/admin/access-logs' },
          { title: 'Security Settings', path: '/leads/admin/security' },
        ],
      },
      {
        title: 'System Maintenance',
        children: [
          { title: 'System Health', path: '/leads/admin/system-health' },
          { title: 'Performance Monitoring', path: '/leads/admin/performance' },
          { title: 'System Logs', path: '/leads/admin/logs' },
        ],
      },
    ],
  },
  { heading: 'User' },
  {
    title: 'Public Profile',
    icon: UserCircle,
    children: [
      {
        title: 'Profiles',
        children: [
          { title: 'Default', path: '/public-profile/profiles/default' },
          { title: 'Creator', path: '/public-profile/profiles/creator' },
          { title: 'Company', path: '/public-profile/profiles/company' },
          { title: 'NFT', path: '/public-profile/profiles/nft' },
          { title: 'Blogger', path: '/public-profile/profiles/blogger' },
          { title: 'CRM', path: '/public-profile/profiles/crm' },
          {
            title: 'More',
            collapse: true,
            collapseTitle: 'Show less',
            expandTitle: 'Show 4 more',
            children: [
              { title: 'Gamer', path: '/public-profile/profiles/gamer' },
              { title: 'Feeds', path: '/public-profile/profiles/feeds' },
              { title: 'Plain', path: '/public-profile/profiles/plain' },
              { title: 'Modal', path: '/public-profile/profiles/modal' },
            ],
          },
        ],
      },
      {
        title: 'Projects',
        children: [
          { title: '3 Columns', path: '/public-profile/projects/3-columns' },
          { title: '2 Columns', path: '/public-profile/projects/2-columns' },
        ],
      },
      { title: 'Works', path: '/public-profile/works' },
      { title: 'Teams', path: '/public-profile/teams' },
      { title: 'Network', path: '/public-profile/network' },
      { title: 'Activity', path: '/public-profile/activity' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Campaigns - Card', path: '/public-profile/campaigns/card' },
          { title: 'Campaigns - List', path: '/public-profile/campaigns/list' },
          { title: 'Empty', path: '/public-profile/empty' },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    icon: Settings,
    children: [
      {
        title: 'Account',
        children: [
          { title: 'Get Started', path: '/account/home/get-started' },
          { title: 'User Profile', path: '/account/home/user-profile' },
          { title: 'Company Profile', path: '/account/home/company-profile' },
          {
            title: 'Settings - With Sidebar',
            path: '/account/home/settings-sidebar',
          },
          {
            title: 'Settings - Enterprise',
            path: '/account/home/settings-enterprise',
          },
          { title: 'Settings - Plain', path: '/account/home/settings-plain' },
          { title: 'Settings - Modal', path: '/account/home/settings-modal' },
        ],
      },
      {
        title: 'Billing',
        children: [
          { title: 'Billing - Basic', path: '/account/billing/basic' },
          {
            title: 'Billing - Enterprise',
            path: '/account/billing/enterprise',
          },
          { title: 'Plans', path: '/account/billing/plans' },
          { title: 'Billing History', path: '/account/billing/history' },
        ],
      },
      {
        title: 'Security',
        children: [
          { title: 'Get Started', path: '/account/security/get-started' },
          { title: 'Security Overview', path: '/account/security/overview' },
          {
            title: 'Allowed IP Addresses',
            path: '/account/security/allowed-ip-addresses',
          },
          {
            title: 'Privacy Settings',
            path: '/account/security/privacy-settings',
          },
          {
            title: 'Device Management',
            path: '/account/security/device-management',
          },
          {
            title: 'Backup & Recovery',
            path: '/account/security/backup-and-recovery',
          },
          {
            title: 'Current Sessions',
            path: '/account/security/current-sessions',
          },
          { title: 'Security Log', path: '/account/security/security-log' },
        ],
      },
      {
        title: 'Members & Roles',
        children: [
          { title: 'Teams Starter', path: '/account/members/team-starter' },
          { title: 'Teams', path: '/account/members/teams' },
          { title: 'Team Info', path: '/account/members/team-info' },
          {
            title: 'Members Starter',
            path: '/account/members/members-starter',
          },
          { title: 'Team Members', path: '/account/members/team-members' },
          { title: 'Import Members', path: '/account/members/import-members' },
          { title: 'Roles', path: '/account/members/roles' },
          {
            title: 'Permissions - Toggler',
            path: '/account/members/permissions-toggle',
          },
          {
            title: 'Permissions - Check',
            path: '/account/members/permissions-check',
          },
        ],
      },
      { title: 'Integrations', path: '/account/integrations' },
      { title: 'Notifications', path: '/account/notifications' },
      { title: 'API Keys', path: '/account/api-keys' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Appearance', path: '/account/appearance' },
          { title: 'Invite a Friend', path: '/account/invite-a-friend' },
          { title: 'Activity', path: '/account/activity' },
        ],
      },
    ],
  },
  {
    title: 'Network',
    icon: Users,
    children: [
      { title: 'Get Started', path: '/network/get-started' },
      {
        title: 'User Cards',
        children: [
          { title: 'Mini Cards', path: '/network/user-cards/mini-cards' },
          { title: 'Team Crew', path: '/network/user-cards/team-crew' },
          { title: 'Author', path: '/network/user-cards/author' },
          { title: 'NFT', path: '/network/user-cards/nft' },
          { title: 'Social', path: '/network/user-cards/social' },
        ],
      },
      {
        title: 'User Table',
        children: [
          { title: 'Team Crew', path: '/network/user-table/team-crew' },
          { title: 'App Roster', path: '/network/user-table/app-roster' },
          {
            title: 'Market Authors',
            path: '/network/user-table/market-authors',
          },
          { title: 'SaaS Users', path: '/network/user-table/saas-users' },
          { title: 'Store Clients', path: '/network/user-table/store-clients' },
          { title: 'Visitors', path: '/network/user-table/visitors' },
        ],
      },
      { title: 'Cooperations', path: '/network/cooperations', disabled: true },
      { title: 'Leads', path: '/network/leads', disabled: true },
      { title: 'Donators', path: '/network/donators', disabled: true },
    ],
  },
  {
    title: 'Authentication',
    icon: ShieldUser,
    children: [
      {
        title: 'Classic',
        children: [
          { title: 'Sign In', path: '/auth/classic/signin' },
          { title: 'Sign Up', path: '/auth/classic/signup' },
          { title: '2FA', path: '/auth/classic/2fa' },
          { title: 'Check Email', path: '/auth/classic/check-email' },
          {
            title: 'Reset Password',
            children: [
              {
                title: 'Enter Email',
                path: '/auth/classic/request-reset',
              },
              {
                title: 'Check Email',
                path: '/auth/classic/reset-password/check-email',
              },
              {
                title: 'Password Changed',
                path: '/auth/classic/reset-password/changed',
              },
            ],
          },
        ],
      },
      {
        title: 'Branded',
        children: [
          { title: 'Sign In', path: '/auth/signin' },
          { title: 'Sign Up', path: '/auth/signup' },
          { title: '2FA', path: '/auth/2fa' },
          { title: 'Check Email', path: '/auth/check-email' },
          {
            title: 'Reset Password',
            children: [
              {
                title: 'Enter Email',
                path: '/auth/request-reset',
              },
              {
                title: 'Check Email',
                path: '/auth/reset-password/check-email',
              },
              {
                title: 'Password Changed',
                path: '/auth/reset-password/changed',
              },
            ],
          },
        ],
      },
      { title: 'Welcome Message', path: '/auth/welcome-message' },
      { title: 'Account Deactivated', path: '/auth/account-deactivated' },
      { title: 'Error 404', path: '/error/404' },
      { title: 'Error 500', path: '/error/500' },
    ],
  },
  { heading: 'Apps' },
  {
    title: 'Store - Client',
    icon: Users,
    children: [
      { title: 'Home', path: '/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/store-client/search-results-list',
      },
      { title: 'Product Details', path: '/store-client/product-details' },
      { title: 'Wishlist', path: '/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/store-client/my-orders' },
      { title: 'Order Receipt', path: '/store-client/order-receipt' },
    ],
  },
  {
    title: 'Store - Admin',
    icon: Bolt,
    disabled: true,
    children: [
      { title: 'Dashboard', path: '/store-admin/dashboard' },
      {
        title: 'Inventory',
        children: [
          {
            title: 'All Products',
            path: '/store-admin/inventory/all-products',
          },
          {
            title: 'Current Stock',
            path: '/store-admin/inventory/current-stock',
          },
          {
            title: 'Inbound Stock',
            path: '/store-admin/inventory/inbound-stock',
          },
          {
            title: 'Outbound Stock',
            path: '/store-admin/inventory/outbound-stock',
          },
          {
            title: 'Stock Planner',
            path: '/store-admin/inventory/stock-planner',
          },
          { title: 'Track Shipping', path: '/' },
          { title: 'Create Shipping Label', path: '/' },
        ],
      },
    ],
  },
  { title: 'Store - Services', icon: Codepen, disabled: true },
  { title: 'AI Promt', icon: Theater, disabled: true },
  { title: 'Invoice Generator', icon: ScrollText, disabled: true },
];

export const MENU_SIDEBAR_CUSTOM: MenuConfig = [
  {
    title: 'Store - Client',
    icon: Users,
    children: [
      { title: 'Home', path: '/store-client/home' },
      {
        title: 'Search Results',
        children: [
          {
            title: 'Search Results - Grid',
            path: '/store-client/search-results-grid',
          },
          {
            title: 'Search Results - List',
            path: '/store-client/search-results-list',
          },
        ],
      },
      {
        title: 'Overlays',
        children: [
          { title: 'Product Details', path: '/store-client/product-details' },
          { title: 'Wishlist', path: '/store-client/wishlist' },
        ],
      },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/store-client/my-orders' },
      { title: 'Order Receipt', path: '/store-client/order-receipt' },
    ],
  },
];

export const MENU_SIDEBAR_COMPACT: MenuConfig = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    path: '/',
  },
  {
    title: 'Public Profile',
    icon: UserCircle,
    children: [
      {
        title: 'Profiles',
        children: [
          { title: 'Default', path: '/public-profile/profiles/default' },
          { title: 'Creator', path: '/public-profile/profiles/creator' },
          { title: 'Company', path: '/public-profile/profiles/company' },
          { title: 'NFT', path: '/public-profile/profiles/nft' },
          { title: 'Blogger', path: '/public-profile/profiles/blogger' },
          { title: 'CRM', path: '/public-profile/profiles/crm' },
          {
            title: 'More',
            collapse: true,
            collapseTitle: 'Show less',
            expandTitle: 'Show 4 more',
            children: [
              { title: 'Gamer', path: '/public-profile/profiles/gamer' },
              { title: 'Feeds', path: '/public-profile/profiles/feeds' },
              { title: 'Plain', path: '/public-profile/profiles/plain' },
              { title: 'Modal', path: '/public-profile/profiles/modal' },
            ],
          },
        ],
      },
      {
        title: 'Projects',
        children: [
          { title: '3 Columns', path: '/public-profile/projects/3-columns' },
          { title: '2 Columns', path: '/public-profile/projects/2-columns' },
        ],
      },
      { title: 'Works', path: '/public-profile/works' },
      { title: 'Teams', path: '/public-profile/teams' },
      { title: 'Network', path: '/public-profile/network' },
      { title: 'Activity', path: '/public-profile/activity' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Campaigns - Card', path: '/public-profile/campaigns/card' },
          { title: 'Campaigns - List', path: '/public-profile/campaigns/list' },
          { title: 'Empty', path: '/public-profile/empty' },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    icon: Settings,
    children: [
      {
        title: 'Account',
        children: [
          { title: 'Get Started', path: '/account/home/get-started' },
          { title: 'User Profile', path: '/account/home/user-profile' },
          { title: 'Company Profile', path: '/account/home/company-profile' },
          {
            title: 'Settings - With Sidebar',
            path: '/account/home/settings-sidebar',
          },
          {
            title: 'Settings - Enterprise',
            path: '/account/home/settings-enterprise',
          },
          { title: 'Settings - Plain', path: '/account/home/settings-plain' },
          { title: 'Settings - Modal', path: '/account/home/settings-modal' },
        ],
      },
      {
        title: 'Billing',
        children: [
          { title: 'Billing - Basic', path: '/account/billing/basic' },
          {
            title: 'Billing - Enterprise',
            path: '/account/billing/enterprise',
          },
          { title: 'Plans', path: '/account/billing/plans' },
          { title: 'Billing History', path: '/account/billing/history' },
        ],
      },
      {
        title: 'Security',
        children: [
          { title: 'Get Started', path: '/account/security/get-started' },
          { title: 'Security Overview', path: '/account/security/overview' },
          {
            title: 'Allowed IP Addresses',
            path: '/account/security/allowed-ip-addresses',
          },
          {
            title: 'Privacy Settings',
            path: '/account/security/privacy-settings',
          },
          {
            title: 'Device Management',
            path: '/account/security/device-management',
          },
          {
            title: 'Backup & Recovery',
            path: '/account/security/backup-and-recovery',
          },
          {
            title: 'Current Sessions',
            path: '/account/security/current-sessions',
          },
          { title: 'Security Log', path: '/account/security/security-log' },
        ],
      },
      {
        title: 'Members & Roles',
        children: [
          { title: 'Teams Starter', path: '/account/members/team-starter' },
          { title: 'Teams', path: '/account/members/teams' },
          { title: 'Team Info', path: '/account/members/team-info' },
          {
            title: 'Members Starter',
            path: '/account/members/members-starter',
          },
          { title: 'Team Members', path: '/account/members/team-members' },
          { title: 'Import Members', path: '/account/members/import-members' },
          { title: 'Roles', path: '/account/members/roles' },
          {
            title: 'Permissions - Toggler',
            path: '/account/members/permissions-toggle',
          },
          {
            title: 'Permissions - Check',
            path: '/account/members/permissions-check',
          },
        ],
      },
      { title: 'Integrations', path: '/account/integrations' },
      { title: 'Notifications', path: '/account/notifications' },
      { title: 'API Keys', path: '/account/api-keys' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Appearance', path: '/account/appearance' },
          { title: 'Invite a Friend', path: '/account/invite-a-friend' },
          { title: 'Activity', path: '/account/activity' },
        ],
      },
    ],
  },
  {
    title: 'Network',
    icon: Users,
    children: [
      { title: 'Get Started', path: '/network/get-started' },
      {
        title: 'User Cards',
        children: [
          { title: 'Mini Cards', path: '/network/user-cards/mini-cards' },
          { title: 'Team Crew', path: '/network/user-cards/team-crew' },
          { title: 'Author', path: '/network/user-cards/author' },
          { title: 'NFT', path: '/network/user-cards/nft' },
          { title: 'Social', path: '/network/user-cards/social' },
        ],
      },
      {
        title: 'User Table',
        children: [
          { title: 'Team Crew', path: '/network/user-table/team-crew' },
          { title: 'App Roster', path: '/network/user-table/app-roster' },
          {
            title: 'Market Authors',
            path: '/network/user-table/market-authors',
          },
          { title: 'SaaS Users', path: '/network/user-table/saas-users' },
          { title: 'Store Clients', path: '/network/user-table/store-clients' },
          { title: 'Visitors', path: '/network/user-table/visitors' },
        ],
      },
      { title: 'Cooperations', path: '/network/cooperations', disabled: true },
      { title: 'Leads', path: '/network/leads', disabled: true },
      { title: 'Donators', path: '/network/donators', disabled: true },
    ],
  },
  {
    title: 'Store - Client',
    icon: ShoppingCart,
    children: [
      { title: 'Home', path: '/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/store-client/search-results-list',
      },
      { title: 'Product Details', path: '/store-client/product-details' },
      { title: 'Wishlist', path: '/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/store-client/my-orders' },
      { title: 'Order Receipt', path: '/store-client/order-receipt' },
    ],
  },
  {
    title: 'Authentication',
    icon: Shield,
    children: [
      {
        title: 'Classic',
        children: [
          { title: 'Sign In', path: '/auth/classic/signin' },
          { title: 'Sign Up', path: '/auth/classic/signup' },
          { title: '2FA', path: '/auth/classic/2fa' },
          { title: 'Check Email', path: '/auth/classic/check-email' },
          {
            title: 'Reset Password',
            children: [
              {
                title: 'Enter Email',
                path: '/auth/classic/request-reset',
              },
              {
                title: 'Check Email',
                path: '/auth/classic/reset-password/check-email',
              },
              {
                title: 'Password Changed',
                path: '/auth/classic/reset-password/changed',
              },
            ],
          },
        ],
      },
      {
        title: 'Branded',
        children: [
          { title: 'Sign In', path: '/auth/signin' },
          { title: 'Sign Up', path: '/auth/signup' },
          { title: '2FA', path: '/auth/2fa' },
          { title: 'Check Email', path: '/auth/check-email' },
          {
            title: 'Reset Password',
            children: [
              {
                title: 'Enter Email',
                path: '/auth/request-reset',
              },
              {
                title: 'Check Email',
                path: '/auth/reset-password/check-email',
              },
              {
                title: 'Password Changed',
                path: '/auth/reset-password/changed',
              },
            ],
          },
        ],
      },
      { title: 'Welcome Message', path: '/auth/welcome-message' },
      { title: 'Account Deactivated', path: '/auth/account-deactivated' },
      { title: 'Error 404', path: '/error/404' },
      { title: 'Error 500', path: '/error/500' },
    ],
  },
];

export const MENU_MEGA: MenuConfig = [
  { title: 'Home', path: '/' },
  {
    title: 'Profiles',
    children: [
      {
        title: 'Profiles',
        children: [
          {
            children: [
              {
                title: 'Default',
                icon: Badge,
                path: '/public-profile/profiles/default',
              },
              {
                title: 'Creator',
                icon: Coffee,
                path: '/public-profile/profiles/creator',
              },
              {
                title: 'Company',
                icon: Building,
                path: '/public-profile/profiles/company',
              },
              {
                title: 'NFT',
                icon: Bitcoin,
                path: '/public-profile/profiles/nft',
              },
              {
                title: 'Blogger',
                icon: MessageSquare,
                path: '/public-profile/profiles/blogger',
              },
              {
                title: 'CRM',
                icon: Monitor,
                path: '/public-profile/profiles/crm',
              },
              {
                title: 'Gamer',
                icon: Ghost,
                path: '/public-profile/profiles/gamer',
              },
            ],
          },
          {
            children: [
              {
                title: 'Feeds',
                icon: Book,
                path: '/public-profile/profiles/feeds',
              },
              {
                title: 'Plain',
                icon: File,
                path: '/public-profile/profiles/plain',
              },
              {
                title: 'Modal',
                icon: SquareMousePointer,
                path: '/public-profile/profiles/modal',
              },
              {
                title: 'Freelancer',
                icon: Briefcase,
                path: '#',
                disabled: true,
              },
              { title: 'Developer', icon: Code, path: '#', disabled: true },
              { title: 'Team', icon: Users, path: '#', disabled: true },
              {
                title: 'Events',
                icon: CalendarCheck,
                path: '#',
                disabled: true,
              },
            ],
          },
        ],
      },
      {
        title: 'Other Pages',
        children: [
          {
            children: [
              {
                title: 'Projects - 3 Cols',
                icon: Layout,
                path: '/public-profile/projects/3-columns',
              },
              {
                title: 'Projects - 2 Cols',
                icon: Grid,
                path: '/public-profile/projects/2-columns',
              },
              { title: 'Works', icon: WorkIcon, path: '/public-profile/works' },
              {
                title: 'Teams',
                icon: PeopleIcon,
                path: '/public-profile/teams',
              },
              {
                title: 'Network',
                icon: Network,
                path: '/public-profile/network',
              },
              {
                title: 'Activity',
                icon: TrendingUp,
                path: '/public-profile/activity',
              },
              {
                title: 'Campaigns - Card',
                icon: LayoutGrid,
                path: '/public-profile/campaigns/card',
              },
            ],
          },
          {
            children: [
              {
                title: 'Campaigns - List',
                icon: Kanban,
                path: '/public-profile/campaigns/list',
              },
              { title: 'Empty', icon: FileText, path: '/public-profile/empty' },
              {
                title: 'Documents',
                icon: DocumentIcon,
                path: '#',
                disabled: true,
              },
              { title: 'Badges', icon: Award, path: '#', disabled: true },
              { title: 'Awards', icon: Gift, path: '#', disabled: true },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    children: [
      {
        title: 'General Pages',
        children: [
          { title: 'Integrations', icon: Plug, path: '/account/integrations' },
          {
            title: 'Notifications',
            icon: Bell,
            path: '/account/notifications',
          },
          { title: 'API Keys', icon: Key, path: '/account/api-keys' },
          { title: 'Appearance', icon: Eye, path: '/account/appearance' },
          {
            title: 'Invite a Friend',
            icon: UserCheck,
            path: '/account/invite-a-friend',
          },
          { title: 'Activity', icon: LifeBuoy, path: '/account/activity' },
          { title: 'Brand', icon: CheckCircle, disabled: true },
          { title: 'Get Paid', icon: Euro, disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'Account Home',
            children: [
              { title: 'Get Started', path: '/account/home/get-started' },
              { title: 'User Profile', path: '/account/home/user-profile' },
              {
                title: 'Company Profile',
                path: '/account/home/company-profile',
              },
              { title: 'With Sidebar', path: '/account/home/settings-sidebar' },
              {
                title: 'Enterprise',
                path: '/account/home/settings-enterprise',
              },
              { title: 'Plain', path: '/account/home/settings-plain' },
              { title: 'Modal', path: '/account/home/settings-modal' },
            ],
          },
          {
            title: 'Billing',
            children: [
              { title: 'Basic Billing', path: '/account/billing/basic' },
              { title: 'Enterprise', path: '/account/billing/enterprise' },
              { title: 'Plans', path: '/account/billing/plans' },
              { title: 'Billing History', path: '/account/billing/history' },
              { title: 'Tax Info', disabled: true },
              { title: 'Invoices', disabled: true },
              { title: 'Gateaways', disabled: true },
            ],
          },
          {
            title: 'Security',
            children: [
              { title: 'Get Started', path: '/account/security/get-started' },
              {
                title: 'Security Overview',
                path: '/account/security/overview',
              },
              {
                title: 'IP Addresses',
                path: '/account/security/allowed-ip-addresses',
              },
              {
                title: 'Privacy Settings',
                path: '/account/security/privacy-settings',
              },
              {
                title: 'Device Management',
                path: '/account/security/device-management',
              },
              {
                title: 'Backup & Recovery',
                path: '/account/security/backup-and-recovery',
              },
              {
                title: 'Current Sessions',
                path: '/account/security/current-sessions',
              },
              { title: 'Security Log', path: '/account/security/security-log' },
            ],
          },
          {
            title: 'Members & Roles',
            children: [
              { title: 'Teams Starter', path: '/account/members/team-starter' },
              { title: 'Teams', path: '/account/members/teams' },
              { title: 'Team Info', path: '/account/members/team-info' },
              {
                title: 'Members Starter',
                path: '/account/members/members-starter',
              },
              { title: 'Team Members', path: '/account/members/team-members' },
              {
                title: 'Import Members',
                path: '/account/members/import-members',
              },
              { title: 'Roles', path: '/account/members/roles' },
              {
                title: 'Permissions - Toggler',
                path: '/account/members/permissions-toggle',
              },
              {
                title: 'Permissions - Check',
                path: '/account/members/permissions-check',
              },
            ],
          },
          {
            title: 'Other Pages',
            children: [
              { title: 'Integrations', path: '/account/integrations' },
              { title: 'Notifications', path: '/account/notifications' },
              { title: 'API Keys', path: '/account/api-keys' },
              { title: 'Appearance', path: '/account/appearance' },
              { title: 'Invite a Friend', path: '/account/invite-a-friend' },
              { title: 'Activity', path: '/account/activity' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Network',
    children: [
      {
        title: 'General Pages',
        children: [
          { title: 'Get Started', icon: Flag, path: '/network/get-started' },
          { title: 'Colleagues', icon: Users, path: '#', disabled: true },
          { title: 'Donators', icon: Heart, path: '#', disabled: true },
          { title: 'Leads', icon: Zap, path: '#', disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'User Cards',
            children: [
              { title: 'Mini Cards', path: '/network/user-cards/mini-cards' },
              { title: 'Team Members', path: '/network/user-cards/team-crew' },
              { title: 'Authors', path: '/network/user-cards/author' },
              { title: 'NFT Users', path: '/network/user-cards/nft' },
              { title: 'Social Users', path: '/network/user-cards/social' },
              { title: 'Gamers', path: '#', disabled: true },
            ],
          },
          {
            title: 'User Base',
            badge: 'Datatables',
            children: [
              { title: 'Team Crew', path: '/network/user-table/team-crew' },
              { title: 'App Roster', path: '/network/user-table/app-roster' },
              {
                title: 'Market Authors',
                path: '/network/user-table/market-authors',
              },
              { title: 'SaaS Users', path: '/network/user-table/saas-users' },
              {
                title: 'Store Clients',
                path: '/network/user-table/store-clients',
              },
              { title: 'Visitors', path: '/network/user-table/visitors' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Authentication',
    children: [
      {
        title: 'General pages',
        children: [
          {
            title: 'Classic Layout',
            children: [
              { title: 'Sign In', path: '/auth/classic/signin' },
              { title: 'Sign Up', path: '/auth/classic/signup' },
              { title: '2FA', path: '/auth/classic/2fa' },
              { title: 'Check Email', path: '/auth/classic/check-email' },
              {
                title: 'Reset Password',
                children: [
                  {
                    title: 'Enter Email',
                    path: '/auth/classic/reset-password',
                  },
                  {
                    title: 'Check Email',
                    path: '/auth/classic/reset-password/check-email',
                  },
                  {
                    title: 'Password is Changed',
                    path: '/auth/classic/reset-password/changed',
                  },
                ],
              },
            ],
          },
          {
            title: 'Branded Layout',
            children: [
              { title: 'Sign In', path: '/auth/signin' },
              { title: 'Sign Up', path: '/auth/signup' },
              { title: '2FA', path: '/auth/2fa' },
              { title: 'Check Email', path: '/auth/check-email' },
              {
                title: 'Reset Password',
                children: [
                  {
                    title: 'Enter Email',
                    path: '/auth/reset-password',
                  },
                  {
                    title: 'Check Email',
                    path: '/auth/reset-password/check-email',
                  },
                  {
                    title: 'Password is Changed',
                    path: '/auth/reset-password/changed',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Other Pages',
        children: [
          {
            title: 'Welcome Message',
            icon: ThumbsUp,
            path: '/auth/welcome-message',
          },
          {
            title: 'Account Deactivated',
            icon: ShieldOff,
            path: '/auth/account-deactivated',
          },
          { title: 'Error 404', icon: HelpCircle, path: '/error/404' },
          { title: 'Error 500', icon: AlertCircle, path: '/error/500' },
        ],
      },
    ],
  },
  {
    title: 'Store ',
    children: [
      {
        title: 'Store - Client',
        children: [
          {
            children: [
              { title: 'Home', path: '/store-client/home' },
              {
                title: 'Search Results - Grid',
                path: '/store-client/search-results-grid',
              },
              {
                title: 'Search Results - List',
                path: '/store-client/search-results-list',
              },
              {
                title: 'Product Details',
                path: '/store-client/product-details',
              },
              { title: 'Wishlist', path: '/store-client/wishlist' },
              { title: 'My Orders', path: '/store-client/my-orders' },
            ],
          },
          {
            children: [
              {
                title: 'Checkout - Order Summary',
                path: '/store-client/checkout/order-summary',
              },
              {
                title: 'Checkout - Shipping Info',
                path: '/store-client/checkout/shipping-info',
              },
              {
                title: 'Checkout - Payment Method',
                path: '/store-client/checkout/payment-method',
              },
              {
                title: 'Checkout - Order Placed',
                path: '/store-client/checkout/order-placed',
              },
              { title: 'Order Receipt', path: '/store-client/order-receipt' },
            ],
          },
        ],
      },
    ],
  },
];

export const MENU_MEGA_MOBILE: MenuConfig = [
  { title: 'Home', path: '/' },
  {
    title: 'Profiles',
    children: [
      {
        title: 'Profiles',
        children: [
          {
            title: 'Default',
            icon: Badge,
            path: '/public-profile/profiles/default',
          },
          {
            title: 'Creator',
            icon: Coffee,
            path: '/public-profile/profiles/creator',
          },
          {
            title: 'Company',
            icon: Building,
            path: '/public-profile/profiles/company',
          },
          { title: 'NFT', icon: Bitcoin, path: '/public-profile/profiles/nft' },
          {
            title: 'Blogger',
            icon: MessageSquare,
            path: '/public-profile/profiles/blogger',
          },
          { title: 'CRM', icon: Monitor, path: '/public-profile/profiles/crm' },
          {
            title: 'Gamer',
            icon: Ghost,
            path: '/public-profile/profiles/gamer',
          },
          {
            title: 'Feeds',
            icon: Book,
            path: '/public-profile/profiles/feeds',
          },
          {
            title: 'Plain',
            icon: File,
            path: '/public-profile/profiles/plain',
          },
          {
            title: 'Modal',
            icon: SquareMousePointer,
            path: '/public-profile/profiles/modal',
          },
          { title: 'Freelancer', icon: Briefcase, path: '#', disabled: true },
          { title: 'Developer', icon: Code, path: '#', disabled: true },
          { title: 'Team', icon: Users, path: '#', disabled: true },
          { title: 'Events', icon: CalendarCheck, path: '#', disabled: true },
        ],
      },
      {
        title: 'Other Pages',
        children: [
          {
            title: 'Projects - 3 Cols',
            icon: Layout,
            path: '/public-profile/projects/3-columns',
          },
          {
            title: 'Projects - 2 Cols',
            icon: Grid,
            path: '/public-profile/projects/2-columns',
          },
          { title: 'Works', icon: WorkIcon, path: '/public-profile/works' },
          { title: 'Teams', icon: PeopleIcon, path: '/public-profile/teams' },
          { title: 'Network', icon: Network, path: '/public-profile/network' },
          {
            title: 'Activity',
            icon: TrendingUp,
            path: '/public-profile/activity',
          },
          {
            title: 'Campaigns - Card',
            icon: LayoutGrid,
            path: '/public-profile/campaigns/card',
          },
          {
            title: 'Campaigns - List',
            icon: Kanban,
            path: '/public-profile/campaigns/list',
          },
          { title: 'Empty', icon: FileText, path: '/public-profile/empty' },
          { title: 'Documents', icon: DocumentIcon, path: '#', disabled: true },
          { title: 'Badges', icon: Award, path: '#', disabled: true },
          { title: 'Awards', icon: Gift, path: '#', disabled: true },
        ],
      },
    ],
  },
  {
    title: 'My Account',
    children: [
      {
        title: 'General Pages',
        children: [
          { title: 'Integrations', icon: Plug, path: '/account/integrations' },
          {
            title: 'Notifications',
            icon: Bell,
            path: '/account/notifications',
          },
          { title: 'API Keys', icon: Key, path: '/account/api-keys' },
          { title: 'Appearance', icon: Eye, path: '/account/appearance' },
          {
            title: 'Invite a Friend',
            icon: UserCheck,
            path: '/account/invite-a-friend',
          },
          { title: 'Activity', icon: LifeBuoy, path: '/account/activity' },
          { title: 'Brand', icon: CheckCircle, disabled: true },
          { title: 'Get Paid', icon: Euro, disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'Account Home',
            children: [
              { title: 'Get Started', path: '/account/home/get-started' },
              { title: 'User Profile', path: '/account/home/user-profile' },
              {
                title: 'Company Profile',
                path: '/account/home/company-profile',
              },
              { title: 'With Sidebar', path: '/account/home/settings-sidebar' },
              {
                title: 'Enterprise',
                path: '/account/home/settings-enterprise',
              },
              { title: 'Plain', path: '/account/home/settings-plain' },
              { title: 'Modal', path: '/account/home/settings-modal' },
            ],
          },
          {
            title: 'Billing',
            children: [
              { title: 'Basic Billing', path: '/account/billing/basic' },
              { title: 'Enterprise', path: '/account/billing/enterprise' },
              { title: 'Plans', path: '/account/billing/plans' },
              { title: 'Billing History', path: '/account/billing/history' },
              { title: 'Tax Info', disabled: true },
              { title: 'Invoices', disabled: true },
              { title: 'Gateaways', disabled: true },
            ],
          },
          {
            title: 'Security',
            children: [
              { title: 'Get Started', path: '/account/security/get-started' },
              {
                title: 'Security Overview',
                path: '/account/security/overview',
              },
              {
                title: 'IP Addresses',
                path: '/account/security/allowed-ip-addresses',
              },
              {
                title: 'Privacy Settings',
                path: '/account/security/privacy-settings',
              },
              {
                title: 'Device Management',
                path: '/account/security/device-management',
              },
              {
                title: 'Backup & Recovery',
                path: '/account/security/backup-and-recovery',
              },
              {
                title: 'Current Sessions',
                path: '/account/security/current-sessions',
              },
              { title: 'Security Log', path: '/account/security/security-log' },
            ],
          },
          {
            title: 'Members & Roles',
            children: [
              { title: 'Teams Starter', path: '/account/members/team-starter' },
              { title: 'Teams', path: '/account/members/teams' },
              { title: 'Team Info', path: '/account/members/team-info' },
              {
                title: 'Members Starter',
                path: '/account/members/members-starter',
              },
              { title: 'Team Members', path: '/account/members/team-members' },
              {
                title: 'Import Members',
                path: '/account/members/import-members',
              },
              { title: 'Roles', path: '/account/members/roles' },
              {
                title: 'Permissions - Toggler',
                path: '/account/members/permissions-toggle',
              },
              {
                title: 'Permissions - Check',
                path: '/account/members/permissions-check',
              },
            ],
          },
          {
            title: 'Other Pages',
            children: [
              { title: 'Integrations', path: '/account/integrations' },
              { title: 'Notifications', path: '/account/notifications' },
              { title: 'API Keys', path: '/account/api-keys' },
              { title: 'Appearance', path: '/account/appearance' },
              { title: 'Invite a Friend', path: '/account/invite-a-friend' },
              { title: 'Activity', path: '/account/activity' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Network',
    children: [
      {
        title: 'General Pages',
        children: [
          { title: 'Get Started', icon: Flag, path: '/network/get-started' },
          { title: 'Colleagues', icon: Users, path: '#', disabled: true },
          { title: 'Donators', icon: Heart, path: '#', disabled: true },
          { title: 'Leads', icon: Zap, path: '#', disabled: true },
        ],
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'User Cards',
            children: [
              { title: 'Mini Cards', path: '/network/user-cards/mini-cards' },
              { title: 'Team Members', path: '/network/user-cards/team-crew' },
              { title: 'Authors', path: '/network/user-cards/author' },
              { title: 'NFT Users', path: '/network/user-cards/nft' },
              { title: 'Social Users', path: '/network/user-cards/social' },
              { title: 'Gamers', path: '#', disabled: true },
            ],
          },
          {
            title: 'User Base',
            badge: 'Datatables',
            children: [
              { title: 'Team Crew', path: '/network/user-table/team-crew' },
              { title: 'App Roster', path: '/network/user-table/app-roster' },
              {
                title: 'Market Authors',
                path: '/network/user-table/market-authors',
              },
              { title: 'SaaS Users', path: '/network/user-table/saas-users' },
              {
                title: 'Store Clients',
                path: '/network/user-table/store-clients',
              },
              { title: 'Visitors', path: '/network/user-table/visitors' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Store - Client',
    children: [
      { title: 'Home', path: '/store-client/home' },
      {
        title: 'Search Results - Grid',
        path: '/store-client/search-results-grid',
      },
      {
        title: 'Search Results - List',
        path: '/store-client/search-results-list',
      },
      { title: 'Product Details', path: '/store-client/product-details' },
      { title: 'Wishlist', path: '/store-client/wishlist' },
      {
        title: 'Checkout',
        children: [
          {
            title: 'Order Summary',
            path: '/store-client/checkout/order-summary',
          },
          {
            title: 'Shipping Info',
            path: '/store-client/checkout/shipping-info',
          },
          {
            title: 'Payment Method',
            path: '/store-client/checkout/payment-method',
          },
          {
            title: 'Order Placed',
            path: '/store-client/checkout/order-placed',
          },
        ],
      },
      { title: 'My Orders', path: '/store-client/my-orders' },
      { title: 'Order Receipt', path: '/store-client/order-receipt' },
    ],
  },
  {
    title: 'Authentication',
    children: [
      {
        title: 'General pages',
        children: [
          {
            title: 'Classic Layout',
            children: [
              { title: 'Sign In', path: '/auth/classic/signin' },
              { title: 'Sign Up', path: '/auth/classic/signup' },
              { title: '2FA', path: '/auth/classic/2fa' },
              { title: 'Check Email', path: '/auth/classic/check-email' },
              {
                title: 'Reset Password',
                children: [
                  {
                    title: 'Enter Email',
                    path: '/auth/classic/request-reset',
                  },
                  {
                    title: 'Check Email',
                    path: '/auth/classic/reset-password/check-email',
                  },
                  {
                    title: 'Password is Changed',
                    path: '/auth/classic/reset-password/changed',
                  },
                ],
              },
            ],
          },
          {
            title: 'Branded Layout',
            children: [
              { title: 'Sign In', path: '/auth/signin' },
              { title: 'Sign Up', path: '/auth/signup' },
              { title: '2FA', path: '/auth/2fa' },
              { title: 'Check Email', path: '/auth/check-email' },
              {
                title: 'Reset Password',
                children: [
                  {
                    title: 'Enter Email',
                    path: '/auth/request-reset',
                  },
                  {
                    title: 'Check Email',
                    path: '/auth/reset-password/check-email',
                  },
                  {
                    title: 'Password is Changed',
                    path: '/auth/reset-password/changed',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Other Pages',
        children: [
          {
            title: 'Welcome Message',
            icon: ThumbsUp,
            path: '/auth/welcome-message',
          },
          {
            title: 'Account Deactivated',
            icon: ShieldOff,
            path: '/auth/account-deactivated',
          },
          { title: 'Error 404', icon: HelpCircle, path: '/error/404' },
          { title: 'Error 500', icon: AlertCircle, path: '/error/500' },
        ],
      },
    ],
  },
  {
    title: 'Help',
    children: [
      {
        title: 'Getting Started',
        icon: Coffee,
        path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/installation',
      },
      {
        title: 'Support Forum',
        icon: AlertCircle,
        children: [
          {
            title: 'All Questions',
            icon: FileQuestion,
            path: 'https://devs.keenthemes.com',
          },
          {
            title: 'Popular Questions',
            icon: Star,
            path: 'https://devs.keenthemes.com/popular',
          },
          {
            title: 'Ask Question',
            icon: HelpCircle,
            path: 'https://devs.keenthemes.com/question/create',
          },
        ],
      },
      {
        title: 'Licenses & FAQ',
        icon: Captions,
        path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/license',
      },
      {
        title: 'Documentation',
        icon: FileQuestion,
        path: 'https://keenthemes.com/metronic/tailwind/docs',
      },
      { separator: true },
      {
        title: 'Contact Us',
        icon: Share2,
        path: 'https://keenthemes.com/contact',
      },
    ],
  },
];

export const MENU_HELP: MenuConfig = [
  {
    title: 'Getting Started',
    icon: Coffee,
    path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/installation',
  },
  {
    title: 'Support Forum',
    icon: AlertCircle,
    children: [
      {
        title: 'All Questions',
        icon: FileQuestion,
        path: 'https://devs.keenthemes.com',
      },
      {
        title: 'Popular Questions',
        icon: Star,
        path: 'https://devs.keenthemes.com/popular',
      },
      {
        title: 'Ask Question',
        icon: HelpCircle,
        path: 'https://devs.keenthemes.com/question/create',
      },
    ],
  },
  {
    title: 'Licenses & FAQ',
    icon: Captions,
    path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/license',
  },
  {
    title: 'Documentation',
    icon: FileQuestion,
    path: 'https://keenthemes.com/metronic/tailwind/docs',
  },
  { separator: true },
  { title: 'Contact Us', icon: Share2, path: 'https://keenthemes.com/contact' },
];

export const MENU_ROOT: MenuConfig = [
  {
    title: 'Public Profile',
    icon: UserCircle,
    rootPath: '/public-profile/',
    path: 'public-profile/profiles/default',
    childrenIndex: 2,
  },
  {
    title: 'Account',
    icon: Settings,
    rootPath: '/account/',
    path: '/',
    childrenIndex: 3,
  },
  {
    title: 'Network',
    icon: Users,
    rootPath: '/network/',
    path: 'network/get-started',
    childrenIndex: 4,
  },
  {
    title: 'Store - Client',
    icon: ShoppingCart,
    rootPath: '/store-client/',
    path: 'store-client/home',
    childrenIndex: 4,
  },
  {
    title: 'Authentication',
    icon: Shield,
    rootPath: '/authentication/',
    path: 'authentication/get-started',
    childrenIndex: 5,
  },
];

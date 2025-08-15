'use client';

import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

const routeMap: Record<string, { label: string; parent?: string; }> = {
  // Overview
  '/leads': { label: 'Lead Management' },
  '/leads/dashboard': { label: 'Dashboard', parent: '/leads' },
  '/leads/timeline': { label: 'Recent Activity', parent: '/leads' },

  // Lead Management
  '/leads/list': { label: 'All Leads', parent: '/leads' },
  '/leads/board': { label: 'Kanban Board', parent: '/leads' },
  '/leads/calendar': { label: 'Calendar View', parent: '/leads' },
  '/leads/map': { label: 'Map View', parent: '/leads' },
  '/leads/pipeline': { label: 'Pipeline View', parent: '/leads' },
  '/leads/detail': { label: 'Lead Details', parent: '/leads' },
  '/leads/add': { label: 'Add New Lead', parent: '/leads' },
  '/leads/import-export': { label: 'Import/Export', parent: '/leads' },
  '/leads/conversion': { label: 'Lead Conversion', parent: '/leads' },
  '/leads/search': { label: 'Advanced Search', parent: '/leads' },
  '/leads/scoring': { label: 'Lead Scoring', parent: '/leads' },

  // Communication Hub
  '/leads/communication': { label: 'Communication Hub', parent: '/leads' },
  '/leads/communication/hub': { label: 'Communication Center', parent: '/leads/communication' },
  '/leads/communication/email-composer': { label: 'Compose Email', parent: '/leads/communication' },
  '/leads/communication/email-templates': { label: 'Email Templates', parent: '/leads/communication' },
  '/leads/communication/campaigns': { label: 'Email Campaigns', parent: '/leads/communication' },
  '/leads/communication/email-analytics': { label: 'Email Analytics', parent: '/leads/communication' },
  '/leads/communication/whatsapp': { label: 'WhatsApp Business', parent: '/leads/communication' },
  '/leads/communication/sms': { label: 'SMS Marketing', parent: '/leads/communication' },
  '/leads/communication/live-chat': { label: 'Live Chat', parent: '/leads/communication' },
  '/leads/communication/call-center': { label: 'Call Center', parent: '/leads/communication' },
  '/leads/communication/video-meetings': { label: 'Video Meetings', parent: '/leads/communication' },
  '/leads/communication/call-analytics': { label: 'Call Analytics', parent: '/leads/communication' },
  '/leads/communication/history': { label: 'Communication History', parent: '/leads/communication' },
  '/leads/communication/timeline': { label: 'Interaction Timeline', parent: '/leads/communication' },
  '/leads/communication/analytics': { label: 'Response Analytics', parent: '/leads/communication' },

  // Sales Operations
  '/leads/sales': { label: 'Sales Operations', parent: '/leads' },
  '/leads/sales/opportunities': { label: 'Opportunity Management', parent: '/leads/sales' },
  '/leads/sales/deals': { label: 'Deal Tracking', parent: '/leads/sales' },
  '/leads/sales/forecasting': { label: 'Sales Forecasting', parent: '/leads/sales' },
  '/leads/sales/contracts': { label: 'Contract Management', parent: '/leads/sales' },

  // Additional Tools
  '/leads/additional': { label: 'Additional Tools', parent: '/leads' },
  '/leads/additional/quote-generator': { label: 'Quote Generator', parent: '/leads/additional' },
  '/leads/additional/proposal-management': { label: 'Proposal Management', parent: '/leads/additional' },
  '/leads/additional/meeting-scheduler': { label: 'Meeting Scheduler', parent: '/leads/additional' },
  '/leads/additional/follow-up-manager': { label: 'Follow-up Manager', parent: '/leads/additional' },
  '/leads/additional/task-management': { label: 'Task Management', parent: '/leads/additional' },
  '/leads/additional/activity-management': { label: 'Activity Management', parent: '/leads/additional' },
  '/leads/additional/document-management': { label: 'Document Management', parent: '/leads/additional' },
  '/leads/additional/campaign-manager': { label: 'Campaign Manager', parent: '/leads/additional' },
  '/leads/additional/lead-tools': { label: 'Lead Enrichment Tools', parent: '/leads/additional' },
  '/leads/additional/bulk-operations': { label: 'Bulk Operations', parent: '/leads/additional' },
  '/leads/additional/audit-trail': { label: 'Audit Trail', parent: '/leads/additional' },

  // Automation & Workflows
  '/leads/automation': { label: 'Automation & Workflows', parent: '/leads' },
  '/leads/automation/workflow-builder': { label: 'Workflow Designer', parent: '/leads/automation' },
  '/leads/automation/triggers': { label: 'Trigger Events', parent: '/leads/automation' },
  '/leads/automation/conditions': { label: 'Condition Builder', parent: '/leads/automation' },
  '/leads/automation/actions': { label: 'Action Blocks', parent: '/leads/automation' },
  '/leads/automation/templates/nurturing': { label: 'Lead Nurturing Templates', parent: '/leads/automation' },
  '/leads/automation/templates/followup': { label: 'Follow-up Sequences', parent: '/leads/automation' },
  '/leads/automation/templates/welcome': { label: 'Welcome Series', parent: '/leads/automation' },
  '/leads/automation/analytics': { label: 'Workflow Analytics', parent: '/leads/automation' },
  '/leads/automation/logs': { label: 'Automation Logs', parent: '/leads/automation' },
  '/leads/automation/metrics': { label: 'Performance Metrics', parent: '/leads/automation' },

  // Analytics & Reporting
  '/leads/analytics': { label: 'Analytics & Reporting', parent: '/leads' },
  '/leads/analytics/dashboard': { label: 'Lead Analytics', parent: '/leads/analytics' },
  '/leads/analytics/sales-dashboard': { label: 'Sales Dashboard', parent: '/leads/analytics' },
  '/leads/analytics/performance-dashboard': { label: 'Performance Dashboard', parent: '/leads/analytics' },
  '/leads/analytics/executive-dashboard': { label: 'Executive Dashboard', parent: '/leads/analytics' },
  '/leads/analytics/report-builder': { label: 'Report Builder', parent: '/leads/analytics' },
  '/leads/analytics/standard-reports': { label: 'Standard Reports', parent: '/leads/analytics' },
  '/leads/analytics/custom-reports': { label: 'Custom Reports', parent: '/leads/analytics' },
  '/leads/analytics/scheduled-reports': { label: 'Scheduled Reports', parent: '/leads/analytics' },
  '/leads/analytics/export-center': { label: 'Export Center', parent: '/leads/analytics' },
  '/leads/analytics/backup': { label: 'Data Backup', parent: '/leads/analytics' },
  '/leads/analytics/api': { label: 'API Access', parent: '/leads/analytics' },

  // Data Management
  '/leads/master-data': { label: 'Data Management', parent: '/leads' },
  '/leads/master-data/lead-sources': { label: 'Lead Sources', parent: '/leads/master-data' },
  '/leads/master-data/lead-statuses': { label: 'Lead Statuses', parent: '/leads/master-data' },
  '/leads/master-data/lead-categories': { label: 'Lead Categories', parent: '/leads/master-data' },
  '/leads/master-data/lead-stages': { label: 'Lead Stages', parent: '/leads/master-data' },
  '/leads/master-data/industries': { label: 'Industries', parent: '/leads/master-data' },
  '/leads/master-data/company-sizes': { label: 'Company Sizes', parent: '/leads/master-data' },
  '/leads/master-data/project-types': { label: 'Project Types', parent: '/leads/master-data' },
  '/leads/master-data/service-types': { label: 'Service Types', parent: '/leads/master-data' },
  '/leads/master-data/countries': { label: 'Countries', parent: '/leads/master-data' },
  '/leads/master-data/states': { label: 'States/Regions', parent: '/leads/master-data' },
  '/leads/master-data/cities': { label: 'Cities', parent: '/leads/master-data' },
  '/leads/master-data/territories': { label: 'Sales Territories', parent: '/leads/master-data' },
  '/leads/master-data/team-management': { label: 'Team Members', parent: '/leads/master-data' },
  '/leads/master-data/assignment-rules': { label: 'Assignment Rules', parent: '/leads/master-data' },
  '/leads/master-data/scoring-rules': { label: 'Lead Scoring Rules', parent: '/leads/master-data' },

  // Data Quality
  '/leads/data-quality': { label: 'Data Quality', parent: '/leads/master-data' },
  '/leads/data-quality/duplicates': { label: 'Duplicate Management', parent: '/leads/data-quality' },
  '/leads/data-quality/validation': { label: 'Data Validation', parent: '/leads/data-quality' },
  '/leads/data-quality/cleanup': { label: 'Data Cleanup', parent: '/leads/data-quality' },

  // Team & Collaboration
  '/leads/team': { label: 'Team & Collaboration', parent: '/leads' },
  '/leads/team/roles': { label: 'Roles & Permissions', parent: '/leads/team' },
  '/leads/team/performance': { label: 'Team Performance', parent: '/leads/team' },
  '/leads/team/load-balancing': { label: 'Load Balancing', parent: '/leads/team' },
  '/leads/team/territories': { label: 'Territory Management', parent: '/leads/team' },
  '/leads/collaboration': { label: 'Collaboration Tools', parent: '/leads/team' },
  '/leads/collaboration/notes': { label: 'Shared Notes', parent: '/leads/collaboration' },
  '/leads/collaboration/messaging': { label: 'Internal Messaging', parent: '/leads/collaboration' },
  '/leads/collaboration/handoffs': { label: 'Lead Handoffs', parent: '/leads/collaboration' },

  // Administration
  '/leads/admin': { label: 'Administration', parent: '/leads' },
  '/leads/admin/general-settings': { label: 'General Settings', parent: '/leads/admin' },
  '/leads/admin/email-settings': { label: 'Email Configuration', parent: '/leads/admin' },
  '/leads/admin/integrations': { label: 'Integrations', parent: '/leads/admin' },
  '/leads/admin/qualification': { label: 'Qualification Criteria', parent: '/leads/admin' },
  '/leads/admin/escalation': { label: 'Escalation Rules', parent: '/leads/admin' },
  '/leads/admin/privacy': { label: 'Data Privacy (GDPR)', parent: '/leads/admin' },
  '/leads/admin/access-logs': { label: 'Access Logs', parent: '/leads/admin' },
  '/leads/admin/security': { label: 'Security Settings', parent: '/leads/admin' },
  '/leads/admin/system-health': { label: 'System Health', parent: '/leads/admin' },
  '/leads/admin/performance': { label: 'Performance Monitoring', parent: '/leads/admin' },
  '/leads/admin/logs': { label: 'System Logs', parent: '/leads/admin' },

  // Settings
  '/leads/settings': { label: 'Settings', parent: '/leads' }
};

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Find current route info
  const currentRoute = routeMap[pathname];
  
  if (!currentRoute) {
    // Fallback for unknown routes
    const pathSegments = pathname.split('/').filter(Boolean);
    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const isLast = index === pathSegments.length - 1;
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        href: isLast ? undefined : href,
        isActive: isLast
      });
    });
    return breadcrumbs;
  }

  // Build breadcrumb chain by following parent relationships
  const routeChain: string[] = [];
  let currentPath = pathname;
  
  while (currentPath && routeMap[currentPath]) {
    routeChain.unshift(currentPath);
    currentPath = routeMap[currentPath].parent || '';
  }

  // Convert route chain to breadcrumb items
  routeChain.forEach((path, index) => {
    const route = routeMap[path];
    const isLast = index === routeChain.length - 1;
    
    breadcrumbs.push({
      label: route.label,
      href: isLast ? undefined : path,
      isActive: isLast
    });
  });

  return breadcrumbs;
}

interface BreadcrumbProps {
  className?: string;
}

export default function Breadcrumb({ className }: BreadcrumbProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const breadcrumbs = buildBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-foreground transition-colors"
            >
              {index === 0 ? (
                <Home className="h-4 w-4" />
              ) : (
                item.label
              )}
            </Link>
          ) : (
            <span className={cn(
              'font-medium',
              item.isActive ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
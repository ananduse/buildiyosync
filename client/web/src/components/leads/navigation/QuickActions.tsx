'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  Upload,
  Users,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Target,
  BarChart3,
  Settings,
  Zap,
  FileText,
  RefreshCw,
  Eye,
  Edit,
  Copy,
  Archive,
  Star,
  Flag,
  Bookmark,
  Share,
  MoreHorizontal,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Note: Tooltip component would need to be implemented in shadcn/ui
// For now, we'll use a simpler approach without tooltips

interface QuickAction {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  badge?: string | number;
  tooltip?: string;
  shortcut?: string;
  isNew?: boolean;
}

// Define quick actions based on current page context
const getQuickActionsForPath = (pathname: string): QuickAction[] => {
  const baseActions: QuickAction[] = [
    {
      id: 'add-lead',
      label: 'Add Lead',
      href: '/leads/add',
      icon: Plus,
      tooltip: 'Create a new lead (Ctrl+N)',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'search',
      label: 'Search',
      href: '/leads/search',
      icon: Search,
      variant: 'outline',
      tooltip: 'Advanced search (Ctrl+F)',
      shortcut: 'Ctrl+F'
    }
  ];

  // Context-specific actions based on current page
  if (pathname.includes('/leads/list') || pathname.includes('/leads/board')) {
    return [
      ...baseActions,
      {
        id: 'bulk-operations',
        label: 'Bulk Actions',
        href: '/leads/additional/bulk-operations',
        icon: Users,
        variant: 'outline',
        tooltip: 'Perform bulk operations'
      },
      {
        id: 'import-export',
        label: 'Import/Export',
        href: '/leads/import-export',
        icon: RefreshCw,
        variant: 'outline',
        tooltip: 'Import or export leads'
      },
      {
        id: 'filters',
        label: 'Filters',
        href: '#',
        icon: Filter,
        variant: 'ghost',
        badge: '3',
        tooltip: 'Active filters'
      }
    ];
  }

  if (pathname.includes('/communication')) {
    return [
      ...baseActions,
      {
        id: 'compose-email',
        label: 'Compose',
        href: '/leads/communication/email-composer',
        icon: Mail,
        tooltip: 'Compose new email'
      },
      {
        id: 'call-center',
        label: 'Call',
        href: '/leads/communication/call-center',
        icon: Phone,
        variant: 'outline',
        tooltip: 'Open call center'
      },
      {
        id: 'sms-center',
        label: 'SMS',
        href: '/leads/communication/sms',
        icon: MessageSquare,
        variant: 'outline',
        badge: '5',
        tooltip: 'SMS center with 5 pending'
      }
    ];
  }

  if (pathname.includes('/analytics')) {
    return [
      ...baseActions,
      {
        id: 'report-builder',
        label: 'Report Builder',
        href: '/leads/analytics/report-builder',
        icon: BarChart3,
        isNew: true,
        tooltip: 'Create custom reports'
      },
      {
        id: 'export-data',
        label: 'Export',
        href: '/leads/analytics/export-center',
        icon: Download,
        variant: 'outline',
        tooltip: 'Export analytics data'
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/leads/analytics/dashboard',
        icon: Eye,
        variant: 'outline',
        tooltip: 'View lead analytics dashboard'
      }
    ];
  }

  if (pathname.includes('/automation')) {
    return [
      ...baseActions,
      {
        id: 'workflow-builder',
        label: 'Build Workflow',
        href: '/leads/automation/workflow-builder',
        icon: Zap,
        isNew: true,
        tooltip: 'Create new workflow'
      },
      {
        id: 'triggers',
        label: 'Triggers',
        href: '/leads/automation/triggers',
        icon: Target,
        variant: 'outline',
        badge: '15',
        tooltip: '15 active triggers'
      },
      {
        id: 'actions',
        label: 'Actions',
        href: '/leads/automation/actions',
        icon: Play,
        variant: 'outline',
        badge: '12',
        tooltip: '12 action blocks'
      }
    ];
  }

  if (pathname.includes('/master-data') || pathname.includes('/admin')) {
    return [
      ...baseActions,
      {
        id: 'settings',
        label: 'Settings',
        href: '/leads/settings',
        icon: Settings,
        variant: 'outline',
        tooltip: 'System settings'
      },
      {
        id: 'backup',
        label: 'Backup',
        href: '/leads/analytics/backup',
        icon: Archive,
        variant: 'outline',
        tooltip: 'Data backup'
      }
    ];
  }

  // Default actions for other pages
  return [
    ...baseActions,
    {
      id: 'dashboard',
      label: 'Dashboard',
      href: '/leads/dashboard',
      icon: BarChart3,
      variant: 'outline',
      tooltip: 'Go to dashboard'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      href: '/leads/calendar',
      icon: Calendar,
      variant: 'outline',
      tooltip: 'View calendar'
    }
  ];
};

const moreActions: QuickAction[] = [
  {
    id: 'duplicate',
    label: 'Duplicate',
    href: '#',
    icon: Copy,
    tooltip: 'Duplicate current item'
  },
  {
    id: 'bookmark',
    label: 'Bookmark',
    href: '#',
    icon: Bookmark,
    tooltip: 'Add to bookmarks'
  },
  {
    id: 'flag',
    label: 'Flag for Follow-up',
    href: '#',
    icon: Flag,
    tooltip: 'Flag for follow-up'
  },
  {
    id: 'share',
    label: 'Share',
    href: '#',
    icon: Share,
    tooltip: 'Share with team'
  },
  {
    id: 'archive',
    label: 'Archive',
    href: '#',
    icon: Archive,
    tooltip: 'Archive item'
  }
];

interface QuickActionsProps {
  className?: string;
}

export default function QuickActions({ className }: QuickActionsProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['add-lead', 'search']));
  
  const quickActions = getQuickActionsForPath(pathname);
  const primaryActions = quickActions.slice(0, 4); // Show first 4 actions directly
  const secondaryActions = quickActions.slice(4); // Rest go in dropdown

  const toggleFavorite = (actionId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(actionId)) {
      newFavorites.delete(actionId);
    } else {
      newFavorites.add(actionId);
    }
    setFavorites(newFavorites);
  };

  const ActionButton = ({ action, size = 'sm' }: { action: QuickAction; size?: 'sm' | 'default' }) => (
    <Button
      key={action.id}
      asChild
      variant={action.variant || 'default'}
      size={size}
      className="relative"
      title={action.tooltip}
    >
      <Link to={action.href}>
        <action.icon className="h-4 w-4" />
        <span className="ml-2">{action.label}</span>
        {action.badge && (
          <Badge 
            variant={action.variant === 'default' ? 'secondary' : 'default'} 
            className="ml-2 h-5 text-xs"
          >
            {action.badge}
          </Badge>
        )}
        {action.isNew && (
          <Badge className="ml-2 h-5 text-xs bg-green-600">
            New
          </Badge>
        )}
      </Link>
    </Button>
  );

  if (quickActions.length === 0) return null;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Primary Actions */}
      <div className="flex items-center space-x-2">
        {primaryActions.map(action => (
          <ActionButton key={action.id} action={action} />
        ))}
      </div>

      {/* More Actions Dropdown */}
      {(secondaryActions.length > 0 || moreActions.length > 0) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {secondaryActions.map(action => (
              <DropdownMenuItem key={action.id} asChild>
                <Link to={action.href} className="flex items-center">
                  <action.icon className="mr-2 h-4 w-4" />
                  <span>{action.label}</span>
                  {action.badge && (
                    <Badge variant="secondary" className="ml-auto h-5 text-xs">
                      {action.badge}
                    </Badge>
                  )}
                  {action.isNew && (
                    <Badge className="ml-auto h-5 text-xs bg-green-600">
                      New
                    </Badge>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
            
            {secondaryActions.length > 0 && moreActions.length > 0 && (
              <DropdownMenuSeparator />
            )}
            
            <DropdownMenuLabel>More Actions</DropdownMenuLabel>
            {moreActions.map(action => (
              <DropdownMenuItem key={action.id}>
                <action.icon className="mr-2 h-4 w-4" />
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Favorites Toggle (for customization) */}
      <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-gray-200">
        <span className="text-xs text-muted-foreground">Quick:</span>
        <div className="flex items-center space-x-1">
          {quickActions.slice(0, 2).map(action => (
            <Button
              key={`fav-${action.id}`}
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(action.id)}
              className="h-6 w-6 p-0"
            >
              <Star 
                className={`h-3 w-3 ${
                  favorites.has(action.id) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-muted-foreground'
                }`} 
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
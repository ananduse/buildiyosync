import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ChevronRight,
  ChevronDown,
  Home,
  FormInput,
  Users,
  Building,
  BarChart3,
  Workflow,
  TestTube,
  FileTemplate,
  GitBranch,
  Edit,
  Eye,
  Settings,
  Database,
  Mail,
  Zap,
  Target,
  TrendingUp,
  MousePointer,
  Crosshair,
  Clock,
  Download,
  Bell,
  Shield,
  Webhook,
  Smartphone,
  Layers,
  Copy,
  Star,
  ArrowLeft,
  ExternalLink,
  Share2,
  Bookmark,
  History,
  MoreHorizontal
} from 'lucide-react';

interface BreadcrumbItem {
  id: string;
  label: string;
  path?: string;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
  children?: BreadcrumbItem[];
  badge?: string;
  description?: string;
  isNew?: boolean;
  requiresPro?: boolean;
}

interface BreadcrumbNavigationProps {
  showBackButton?: boolean;
  showActions?: boolean;
  customActions?: React.ReactNode;
  maxItems?: number;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  showBackButton = true,
  showActions = true,
  customActions,
  maxItems = 5
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation structure for forms section
  const navigationStructure: Record<string, BreadcrumbItem> = {
    '/': {
      id: 'home',
      label: 'Home',
      path: '/',
      icon: Home
    },
    '/leads': {
      id: 'leads',
      label: 'Leads',
      path: '/leads',
      icon: Users
    },
    '/leads/forms': {
      id: 'forms',
      label: 'Forms',
      path: '/leads/forms',
      icon: FormInput,
      children: [
        {
          id: 'all-forms',
          label: 'All Forms',
          path: '/leads/forms',
          icon: FormInput
        },
        {
          id: 'recent-forms',
          label: 'Recent Forms',
          path: '/leads/forms/recent',
          icon: Clock
        },
        {
          id: 'starred-forms',
          label: 'Starred Forms',
          path: '/leads/forms/starred',
          icon: Star
        }
      ]
    },
    '/leads/forms/builder': {
      id: 'form-builder',
      label: 'Form Builder',
      path: '/leads/forms/builder',
      icon: Edit,
      description: 'Create and customize forms'
    },
    '/leads/forms/templates': {
      id: 'templates',
      label: 'Templates Library',
      path: '/leads/forms/templates',
      icon: FileTemplate,
      badge: '50+',
      description: 'Pre-built form templates'
    },
    '/leads/forms/multi-step': {
      id: 'multi-step',
      label: 'Multi-Step Forms',
      path: '/leads/forms/multi-step',
      icon: Layers,
      description: 'Advanced multi-step form builder',
      isNew: true
    },
    '/leads/forms/conditional-logic': {
      id: 'conditional-logic',
      label: 'Conditional Logic',
      path: '/leads/forms/conditional-logic',
      icon: GitBranch,
      description: 'Smart form logic and rules',
      requiresPro: true
    },
    '/leads/forms/versioning': {
      id: 'versioning',
      label: 'Version Control',
      path: '/leads/forms/versioning',
      icon: GitBranch,
      description: 'Form version management',
      requiresPro: true
    },
    '/leads/forms/analytics': {
      id: 'analytics',
      label: 'Analytics',
      path: '/leads/forms/analytics',
      icon: BarChart3,
      children: [
        {
          id: 'overview',
          label: 'Performance Overview',
          path: '/leads/forms/analytics/overview',
          icon: TrendingUp
        },
        {
          id: 'advanced-analytics',
          label: 'Advanced Analytics',
          path: '/leads/forms/analytics/advanced',
          icon: BarChart3,
          requiresPro: true
        },
        {
          id: 'conversion-funnel',
          label: 'Conversion Funnel',
          path: '/leads/forms/analytics/funnel',
          icon: Target
        },
        {
          id: 'field-analytics',
          label: 'Field Analytics',
          path: '/leads/forms/analytics/fields',
          icon: MousePointer
        },
        {
          id: 'heatmaps',
          label: 'User Heatmaps',
          path: '/leads/forms/analytics/heatmaps',
          icon: Crosshair,
          isNew: true
        }
      ]
    },
    '/leads/forms/workflows': {
      id: 'workflows',
      label: 'Form Workflows',
      path: '/leads/forms/workflows',
      icon: Workflow,
      description: 'Automate form submissions'
    },
    '/leads/forms/ab-testing': {
      id: 'ab-testing',
      label: 'A/B Testing',
      path: '/leads/forms/ab-testing',
      icon: TestTube,
      description: 'Test form variations',
      requiresPro: true
    },
    '/leads/forms/submissions': {
      id: 'submissions',
      label: 'Form Submissions',
      path: '/leads/forms/submissions',
      icon: Database,
      badge: '1.2k',
      children: [
        {
          id: 'all-submissions',
          label: 'All Submissions',
          path: '/leads/forms/submissions/all',
          icon: Database
        },
        {
          id: 'recent-submissions',
          label: 'Recent Submissions',
          path: '/leads/forms/submissions/recent',
          icon: Clock
        },
        {
          id: 'export-data',
          label: 'Export Data',
          path: '/leads/forms/submissions/export',
          icon: Download
        }
      ]
    },
    '/leads/forms/integrations': {
      id: 'integrations',
      label: 'Integrations',
      path: '/leads/forms/integrations',
      icon: Zap,
      badge: '20+',
      description: 'Connect with external services'
    },
    '/leads/forms/settings': {
      id: 'settings',
      label: 'Settings',
      path: '/leads/forms/settings',
      icon: Settings,
      children: [
        {
          id: 'general-settings',
          label: 'General Settings',
          path: '/leads/forms/settings/general',
          icon: Settings
        },
        {
          id: 'security',
          label: 'Security & Privacy',
          path: '/leads/forms/settings/security',
          icon: Shield
        },
        {
          id: 'notifications',
          label: 'Notifications',
          path: '/leads/forms/settings/notifications',
          icon: Bell
        },
        {
          id: 'team-access',
          label: 'Team Access',
          path: '/leads/forms/settings/team',
          icon: Users
        }
      ]
    }
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = '';

    // Always start with home
    breadcrumbs.push(navigationStructure['/']);

    // Build path progressively
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const item = navigationStructure[currentPath];
      
      if (item) {
        breadcrumbs.push({
          ...item,
          isActive: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const currentPage = breadcrumbs[breadcrumbs.length - 1];
  const parentPage = breadcrumbs[breadcrumbs.length - 2];

  // Handle breadcrumb overflow
  const displayBreadcrumbs = breadcrumbs.length > maxItems 
    ? [
        breadcrumbs[0], // Home
        { id: 'overflow', label: '...', path: undefined },
        ...breadcrumbs.slice(-2) // Last 2 items
      ]
    : breadcrumbs;

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const handleBack = () => {
    if (parentPage?.path) {
      navigate(parentPage.path);
    } else {
      navigate(-1);
    }
  };

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const Icon = item.icon;

    if (item.id === 'overflow') {
      return (
        <DropdownMenu key={item.id}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-auto p-1">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {breadcrumbs.slice(1, -2).map(hiddenItem => {
              const HiddenIcon = hiddenItem.icon;
              return (
                <DropdownMenuItem
                  key={hiddenItem.id}
                  onClick={() => handleNavigation(hiddenItem.path)}
                >
                  {HiddenIcon && <HiddenIcon className="h-4 w-4 mr-2" />}
                  {hiddenItem.label}
                  {hiddenItem.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {hiddenItem.badge}
                    </Badge>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    if (isLast) {
      return (
        <div key={item.id} className="flex items-center">
          {item.children && item.children.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-1 font-medium text-gray-900">
                  <div className="flex items-center">
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge className="ml-2 text-xs bg-green-100 text-green-800">
                        NEW
                      </Badge>
                    )}
                    {item.requiresPro && (
                      <Badge className="ml-2 text-xs bg-purple-100 text-purple-800">
                        PRO
                      </Badge>
                    )}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {item.children.map(child => {
                  const ChildIcon = child.icon;
                  return (
                    <DropdownMenuItem
                      key={child.id}
                      onClick={() => handleNavigation(child.path)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          {ChildIcon && <ChildIcon className="h-4 w-4 mr-2" />}
                          <div>
                            <div className="flex items-center">
                              {child.label}
                              {child.isNew && (
                                <Badge className="ml-2 text-xs bg-green-100 text-green-800">
                                  NEW
                                </Badge>
                              )}
                              {child.requiresPro && (
                                <Badge className="ml-2 text-xs bg-purple-100 text-purple-800">
                                  PRO
                                </Badge>
                              )}
                            </div>
                            {child.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {child.description}
                              </p>
                            )}
                          </div>
                        </div>
                        {child.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {child.badge}
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center font-medium text-gray-900">
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {item.badge}
                </Badge>
              )}
              {item.isNew && (
                <Badge className="ml-2 text-xs bg-green-100 text-green-800">
                  NEW
                </Badge>
              )}
              {item.requiresPro && (
                <Badge className="ml-2 text-xs bg-purple-100 text-purple-800">
                  PRO
                </Badge>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className="h-auto p-1 text-gray-600 hover:text-gray-900"
        onClick={() => handleNavigation(item.path)}
      >
        <div className="flex items-center">
          {Icon && <Icon className="h-4 w-4 mr-2" />}
          {item.label}
          {item.badge && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {item.badge}
            </Badge>
          )}
        </div>
      </Button>
    );
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        {/* Back Button */}
        {showBackButton && breadcrumbs.length > 2 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-sm">
          {displayBreadcrumbs.map((item, index) => {
            const isLast = index === displayBreadcrumbs.length - 1;
            return (
              <React.Fragment key={item.id}>
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                )}
                {renderBreadcrumbItem(item, index, isLast)}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Page Description */}
        {currentPage?.description && (
          <>
            <Separator orientation="vertical" className="h-4 mx-3" />
            <span className="text-sm text-muted-foreground">
              {currentPage.description}
            </span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex items-center space-x-2">
          {customActions || (
            <>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Page Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BreadcrumbNavigation;
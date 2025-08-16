import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Home,
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Settings,
  HelpCircle,
  Bell,
  User,
  Menu,
  X,
  FormInput,
  BarChart3,
  Workflow,
  TestTube,
  FileTemplate,
  GitBranch,
  Layers,
  Zap,
  Target,
  Users,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  DollarSign,
  Shield,
  Lock,
  Eye,
  Edit,
  Copy,
  Download,
  Share2,
  Archive,
  Trash2,
  Star,
  Bookmark,
  Flag,
  Clock,
  Activity,
  TrendingUp,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Layout,
  Palette,
  Code,
  Webhook,
  ExternalLink,
  RefreshCw,
  Filter,
  SortAsc,
  MoreVertical,
  ChevronLeft,
  ArrowLeft,
  Navigation,
  Compass,
  Map,
  Route,
  MapPin,
  Crosshair,
  MousePointer
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string | number;
  children?: NavigationItem[];
  description?: string;
  isNew?: boolean;
  isPopular?: boolean;
  requiresPro?: boolean;
}

interface Breadcrumb {
  label: string;
  path?: string;
  icon?: React.ComponentType<any>;
}

const FormsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['forms', 'analytics']);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/leads/forms/dashboard',
      description: 'Overview of all form activities'
    },
    {
      id: 'forms',
      label: 'Forms Management',
      icon: FormInput,
      path: '/leads/forms',
      children: [
        {
          id: 'form-builder',
          label: 'Form Builder',
          icon: Edit,
          path: '/leads/forms/builder',
          description: 'Create and customize forms',
          isPopular: true
        },
        {
          id: 'form-templates',
          label: 'Templates Library',
          icon: FileTemplate,
          path: '/leads/forms/templates',
          badge: '50+',
          description: 'Pre-built form templates'
        },
        {
          id: 'multi-step',
          label: 'Multi-Step Forms',
          icon: Layers,
          path: '/leads/forms/multi-step',
          description: 'Advanced multi-step form builder',
          isNew: true
        },
        {
          id: 'conditional-logic',
          label: 'Conditional Logic',
          icon: GitBranch,
          path: '/leads/forms/conditional-logic',
          description: 'Smart form logic and rules',
          requiresPro: true
        },
        {
          id: 'form-versioning',
          label: 'Version Control',
          icon: GitBranch,
          path: '/leads/forms/versioning',
          description: 'Form version management',
          requiresPro: true
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Insights',
      icon: BarChart3,
      path: '/leads/forms/analytics',
      children: [
        {
          id: 'overview',
          label: 'Performance Overview',
          icon: TrendingUp,
          path: '/leads/forms/analytics/overview',
          description: 'Key performance metrics'
        },
        {
          id: 'advanced-analytics',
          label: 'Advanced Analytics',
          icon: BarChart3,
          path: '/leads/forms/analytics/advanced',
          description: 'Detailed form analytics',
          requiresPro: true
        },
        {
          id: 'conversion-funnel',
          label: 'Conversion Funnel',
          icon: Target,
          path: '/leads/forms/analytics/funnel',
          description: 'Track conversion paths'
        },
        {
          id: 'field-analytics',
          label: 'Field Analytics',
          icon: MousePointer,
          path: '/leads/forms/analytics/fields',
          description: 'Individual field performance'
        },
        {
          id: 'heatmaps',
          label: 'User Heatmaps',
          icon: Crosshair,
          path: '/leads/forms/analytics/heatmaps',
          description: 'Visual user interaction data',
          isNew: true
        }
      ]
    },
    {
      id: 'automation',
      label: 'Automation & Workflows',
      icon: Workflow,
      path: '/leads/forms/automation',
      children: [
        {
          id: 'workflows',
          label: 'Form Workflows',
          icon: Workflow,
          path: '/leads/forms/workflows',
          description: 'Automate form submissions'
        },
        {
          id: 'email-automation',
          label: 'Email Automation',
          icon: Mail,
          path: '/leads/forms/automation/email',
          description: 'Automated email sequences'
        },
        {
          id: 'integrations',
          label: 'Integrations',
          icon: Zap,
          path: '/leads/forms/integrations',
          badge: '20+',
          description: 'Connect with external services'
        },
        {
          id: 'webhooks',
          label: 'Webhooks',
          icon: Webhook,
          path: '/leads/forms/webhooks',
          description: 'Real-time data sync'
        }
      ]
    },
    {
      id: 'testing',
      label: 'Testing & Optimization',
      icon: TestTube,
      path: '/leads/forms/testing',
      children: [
        {
          id: 'ab-testing',
          label: 'A/B Testing',
          icon: TestTube,
          path: '/leads/forms/ab-testing',
          description: 'Test form variations',
          requiresPro: true
        },
        {
          id: 'form-preview',
          label: 'Form Preview',
          icon: Eye,
          path: '/leads/forms/preview',
          description: 'Preview forms before publishing'
        },
        {
          id: 'device-testing',
          label: 'Device Testing',
          icon: Smartphone,
          path: '/leads/forms/device-testing',
          description: 'Test across devices'
        }
      ]
    },
    {
      id: 'submissions',
      label: 'Form Submissions',
      icon: Database,
      path: '/leads/forms/submissions',
      badge: '1.2k',
      children: [
        {
          id: 'all-submissions',
          label: 'All Submissions',
          icon: Database,
          path: '/leads/forms/submissions/all',
          description: 'View all form submissions'
        },
        {
          id: 'recent-submissions',
          label: 'Recent Submissions',
          icon: Clock,
          path: '/leads/forms/submissions/recent',
          description: 'Latest form submissions'
        },
        {
          id: 'export-data',
          label: 'Export Data',
          icon: Download,
          path: '/leads/forms/submissions/export',
          description: 'Export submission data'
        }
      ]
    },
    {
      id: 'settings',
      label: 'Settings & Configuration',
      icon: Settings,
      path: '/leads/forms/settings',
      children: [
        {
          id: 'form-settings',
          label: 'Form Settings',
          icon: Settings,
          path: '/leads/forms/settings/general',
          description: 'General form configuration'
        },
        {
          id: 'security',
          label: 'Security & Privacy',
          icon: Shield,
          path: '/leads/forms/settings/security',
          description: 'Security and privacy settings'
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          path: '/leads/forms/settings/notifications',
          description: 'Configure notifications'
        },
        {
          id: 'team-access',
          label: 'Team Access',
          icon: Users,
          path: '/leads/forms/settings/team',
          description: 'Manage team permissions'
        }
      ]
    }
  ];

  const generateBreadcrumbs = (): Breadcrumb[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Home', path: '/', icon: Home }
    ];

    // Add leads section
    if (pathSegments.includes('leads')) {
      breadcrumbs.push({ label: 'Leads', path: '/leads', icon: Users });
    }

    // Add forms section
    if (pathSegments.includes('forms')) {
      breadcrumbs.push({ label: 'Forms', path: '/leads/forms', icon: FormInput });
    }

    // Add specific form pages
    const currentPath = location.pathname;
    const findItemByPath = (items: NavigationItem[], path: string): NavigationItem | null => {
      for (const item of items) {
        if (item.path === path) return item;
        if (item.children) {
          const found = findItemByPath(item.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    const currentItem = findItemByPath(navigationItems, currentPath);
    if (currentItem && currentItem.path !== '/leads/forms') {
      breadcrumbs.push({ 
        label: currentItem.label, 
        icon: currentItem.icon 
      });
    }

    return breadcrumbs;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const filteredNavigation = navigationItems.filter(item => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    
    const matchesItem = item.label.toLowerCase().includes(searchLower) ||
                       item.description?.toLowerCase().includes(searchLower);
    
    const hasMatchingChild = item.children?.some(child => 
      child.label.toLowerCase().includes(searchLower) ||
      child.description?.toLowerCase().includes(searchLower)
    );
    
    return matchesItem || hasMatchingChild;
  });

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);
    const isActive = isActivePath(item.path);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleSection(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start ${level > 0 ? 'pl-8' : 'pl-4'} ${
                isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {item.badge}
                </Badge>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 ml-2" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-4 border-l border-gray-200 pl-2">
              {item.children?.map(child => renderNavigationItem(child, level + 1))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={`w-full justify-start ${level > 0 ? 'pl-8' : 'pl-4'} ${
          isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
        }`}
        onClick={() => navigate(item.path)}
      >
        <Icon className="h-4 w-4 mr-3" />
        <span className="flex-1 text-left">{item.label}</span>
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
        {item.isPopular && (
          <Star className="h-3 w-3 ml-2 text-yellow-500 fill-current" />
        )}
        {item.requiresPro && (
          <Badge className="ml-2 text-xs bg-purple-100 text-purple-800">
            PRO
          </Badge>
        )}
      </Button>
    );
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="ml-3 text-lg font-semibold">Forms</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          sidebarOpen ? 'w-80' : 'w-16'
        } transition-all duration-300 bg-white border-r border-gray-200 min-h-screen ${
          mobileMenuOpen ? 'block' : 'hidden lg:block'
        } fixed lg:relative z-40 lg:z-auto`}>
          
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex items-center">
                  <FormInput className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold">Forms Center</h2>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex"
              >
                {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Form
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <FileTemplate className="h-4 w-4 mr-1" />
                    Template
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Copy className="h-4 w-4 mr-1" />
                    Duplicate
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          {sidebarOpen && (
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search forms, analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {filteredNavigation.map(item => renderNavigationItem(item))}
            </div>
          </ScrollArea>

          {/* Sidebar Footer */}
          {sidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Navigation Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                    <div className="flex items-center">
                      {crumb.icon && (
                        <crumb.icon className="h-4 w-4 mr-1 text-gray-500" />
                      )}
                      {crumb.path ? (
                        <button
                          onClick={() => navigate(crumb.path!)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {crumb.label}
                        </button>
                      ) : (
                        <span className="text-gray-900 font-medium">{crumb.label}</span>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </nav>

              {/* Action Bar */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      John Doe
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default FormsLayout;
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  Calendar,
  ClipboardCheck,
  TrendingUp,
  Settings,
  Plus,
  ChevronRight,
  ChevronLeft,
  Building2,
  Briefcase,
  Home,
  Factory,
  Hammer,
  Target,
  Shield,
  AlertCircle,
  Timer,
  DollarSign,
  MessageSquare,
  MapPin,
  BarChart3,
  FileSearch,
  GitBranch,
  Layers,
  Package,
  Truck,
  Wrench,
  HardHat,
  TreePine,
  Zap,
  Bell,
  Archive,
  Search,
  Filter,
  Grid3X3,
  List,
  LayoutGrid,
  Map as MapIcon,
  Menu,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Navigation item type
interface NavItem {
  id: string;
  title: string;
  icon?: React.ElementType;
  path?: string;
  badge?: string | number;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children?: NavItem[];
  separator?: boolean;
  isNew?: boolean;
  isPro?: boolean;
}

// Project navigation structure
const projectNavigation: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/projects/dashboard',
    badge: 'New',
    badgeVariant: 'secondary',
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: Briefcase,
    children: [
      {
        id: 'all-projects',
        title: 'All Projects',
        icon: FolderOpen,
        path: '/projects/list',
        badge: '245',
      },
      {
        id: 'active',
        title: 'Active Projects',
        icon: Zap,
        path: '/projects/active',
        badge: '89',
        badgeVariant: 'default',
      },
      {
        id: 'planning',
        title: 'In Planning',
        icon: Target,
        path: '/projects/planning',
        badge: '34',
      },
      {
        id: 'completed',
        title: 'Completed',
        icon: Shield,
        path: '/projects/completed',
        badge: '122',
      },
      {
        id: 'on-hold',
        title: 'On Hold',
        icon: Timer,
        path: '/projects/on-hold',
        badge: '12',
        badgeVariant: 'destructive',
      },
      {
        id: 'archived',
        title: 'Archived',
        icon: Archive,
        path: '/projects/archived',
      },
    ],
  },
  {
    id: 'project-types',
    title: 'Project Types',
    icon: Layers,
    children: [
      {
        id: 'commercial',
        title: 'Commercial',
        icon: Building2,
        path: '/projects/type/commercial',
        badge: '67',
      },
      {
        id: 'residential',
        title: 'Residential',
        icon: Home,
        path: '/projects/type/residential',
        badge: '89',
      },
      {
        id: 'infrastructure',
        title: 'Infrastructure',
        icon: TreePine,
        path: '/projects/type/infrastructure',
        badge: '23',
      },
      {
        id: 'industrial',
        title: 'Industrial',
        icon: Factory,
        path: '/projects/type/industrial',
        badge: '45',
      },
      {
        id: 'renovation',
        title: 'Renovation',
        icon: Hammer,
        path: '/projects/type/renovation',
        badge: '21',
      },
    ],
  },
  {
    id: 'separator-1',
    separator: true,
  },
  {
    id: 'management',
    title: 'Management',
    icon: ClipboardCheck,
    children: [
      {
        id: 'tasks',
        title: 'Tasks & Activities',
        icon: ClipboardCheck,
        path: '/projects/tasks',
        badge: '156',
      },
      {
        id: 'team',
        title: 'Team Management',
        icon: Users,
        path: '/projects/team',
      },
      {
        id: 'schedule',
        title: 'Schedule & Timeline',
        icon: Calendar,
        path: '/projects/schedule',
      },
      {
        id: 'resources',
        title: 'Resources',
        icon: Package,
        path: '/projects/resources',
      },
      {
        id: 'vendors',
        title: 'Vendors & Suppliers',
        icon: Truck,
        path: '/projects/vendors',
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    icon: BarChart3,
    children: [
      {
        id: 'progress',
        title: 'Progress Tracking',
        icon: TrendingUp,
        path: '/projects/progress',
        isNew: true,
      },
      {
        id: 'dpr',
        title: 'Daily Reports (DPR)',
        icon: FileText,
        path: '/projects/dpr',
        badge: 'Today',
        badgeVariant: 'secondary',
      },
      {
        id: 'issues',
        title: 'Issues & Risks',
        icon: AlertCircle,
        path: '/projects/issues',
        badge: '8',
        badgeVariant: 'destructive',
      },
      {
        id: 'quality',
        title: 'Quality Control',
        icon: Shield,
        path: '/projects/quality',
      },
      {
        id: 'safety',
        title: 'Safety Compliance',
        icon: HardHat,
        path: '/projects/safety',
      },
    ],
  },
  {
    id: 'financials',
    title: 'Financials',
    icon: DollarSign,
    children: [
      {
        id: 'budget',
        title: 'Budget Management',
        icon: DollarSign,
        path: '/projects/budget',
      },
      {
        id: 'expenses',
        title: 'Expenses',
        icon: FileText,
        path: '/projects/expenses',
      },
      {
        id: 'invoices',
        title: 'Invoices',
        icon: FileSearch,
        path: '/projects/invoices',
      },
      {
        id: 'payments',
        title: 'Payments',
        icon: GitBranch,
        path: '/projects/payments',
      },
    ],
  },
  {
    id: 'separator-2',
    separator: true,
  },
  {
    id: 'communication',
    title: 'Communication',
    icon: MessageSquare,
    children: [
      {
        id: 'messages',
        title: 'Messages',
        icon: MessageSquare,
        path: '/projects/messages',
        badge: '3',
        badgeVariant: 'default',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: Bell,
        path: '/projects/notifications',
        badge: '12',
      },
      {
        id: 'meetings',
        title: 'Meetings',
        icon: Calendar,
        path: '/projects/meetings',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    path: '/projects/analytics',
    isPro: true,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    path: '/projects/settings',
  },
];

// Quick actions
const quickActions = [
  {
    id: 'new-project',
    title: 'New Project',
    icon: Plus,
    path: '/projects/new',
  },
  {
    id: 'search',
    title: 'Search',
    icon: Search,
    action: () => console.log('Search clicked'),
  },
  {
    id: 'filter',
    title: 'Filter',
    icon: Filter,
    action: () => console.log('Filter clicked'),
  },
];

// View options
const viewOptions = [
  { id: 'list', icon: List, title: 'List View' },
  { id: 'grid', icon: Grid3X3, title: 'Grid View' },
  { id: 'kanban', icon: LayoutGrid, title: 'Kanban View' },
  { id: 'map', icon: MapIcon, title: 'Map View' },
];

interface ProjectSidebarHoverProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
  mobileOpen?: boolean;
  onMobileToggle?: (open: boolean) => void;
}

export function ProjectSidebarHover({ 
  collapsed = false, 
  onCollapse, 
  className,
  mobileOpen = false,
  onMobileToggle
}: ProjectSidebarHoverProps) {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState('list');
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(mobileOpen);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on tablets
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mobile menu backdrop click and keyboard navigation
  useEffect(() => {
    const handleBackdropClick = (e: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        handleMobileClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        handleMobileClose();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleBackdropClick);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('sidebar-open');
      
      // Focus management - focus first menu item when opened
      setTimeout(() => {
        const firstLink = mobileMenuRef.current?.querySelector('a[role="menuitem"]') as HTMLElement;
        firstLink?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.removeEventListener('mousedown', handleBackdropClick);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      document.body.classList.remove('sidebar-open');
    };
  }, [isMobileMenuOpen]);

  // Handle swipe gestures on mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartX || !isMobile) return;

    const touchEndX = e.touches[0].clientX;
    const diffX = touchStartX - touchEndX;

    // Swipe left to close
    if (diffX > 50 && isMobileMenuOpen) {
      handleMobileClose();
      setTouchStartX(null);
    }
    // Swipe right to open (from left edge)
    else if (diffX < -50 && !isMobileMenuOpen && touchStartX < 30) {
      handleMobileOpen();
      setTouchStartX(null);
    }
  }, [touchStartX, isMobile, isMobileMenuOpen]);

  const handleTouchEnd = useCallback(() => {
    setTouchStartX(null);
  }, []);

  // Clear submenu timeout
  const clearSubmenuTimeout = () => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
  };

  // Handle mouse enter on menu item
  const handleMouseEnter = (itemId: string, hasChildren: boolean) => {
    if (isMobile) return; // Disable hover on mobile
    clearSubmenuTimeout();
    setHoveredItem(itemId);
    // Always set active submenu when collapsed, or when has children
    if (hasChildren || isCollapsed) {
      setActiveSubmenu(itemId);
    }
  };

  // Handle click on menu item (for mobile)
  const handleItemClick = (itemId: string, hasChildren: boolean, e: React.MouseEvent) => {
    if (isMobile && hasChildren) {
      e.preventDefault();
      setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
    }
  };

  // Handle mouse leave from menu item
  const handleMouseLeave = () => {
    clearSubmenuTimeout();
    submenuTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setActiveSubmenu(null);
    }, 300); // Delay before hiding submenu
  };

  // Handle submenu mouse enter
  const handleSubmenuMouseEnter = () => {
    clearSubmenuTimeout();
  };

  // Handle submenu mouse leave
  const handleSubmenuMouseLeave = () => {
    handleMouseLeave();
  };

  // Check if path is active
  const isPathActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Check if item has active child
  const hasActiveChild = (item: NavItem) => {
    if (!item.children) return false;
    return item.children.some(child => isPathActive(child.path));
  };

  // Render navigation item
  const renderNavItem = (item: NavItem) => {
    if (item.separator) {
      return <Separator key={item.id} className="my-2" />;
    }

    const isActive = isPathActive(item.path) || hasActiveChild(item);
    const isHovered = hoveredItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    // Show submenu when:
    // 1. Has children and is the active submenu
    // 2. Sidebar is collapsed and item is hovered (shows title + children)
    const showSubmenu = (activeSubmenu === item.id && hasChildren) || (isCollapsed && isHovered && !isMobile);

    return (
      <div
        key={item.id}
        className="relative"
        onMouseEnter={() => handleMouseEnter(item.id, hasChildren)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.path || '#'}
          className={cn(
            'flex items-center gap-3 rounded-lg text-sm transition-all',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            isCollapsed && !isMobile ? 'px-2 py-2 justify-center' : 'px-3 py-2',
            'hover:bg-accent hover:text-accent-foreground',
            'min-h-[44px] md:min-h-[40px]', // Touch-friendly sizes
            isActive && 'bg-accent text-accent-foreground font-medium',
            isHovered && !isMobile && 'bg-accent/50',
            'sidebar-item' // For mobile touch feedback
          )}
          role="menuitem"
          aria-current={isActive ? 'page' : undefined}
          aria-expanded={hasChildren ? activeSubmenu === item.id : undefined}
          aria-haspopup={hasChildren ? 'menu' : undefined}
          onClick={(e) => {
            if (!item.path && hasChildren) {
              e.preventDefault();
            }
            handleItemClick(item.id, hasChildren, e);
            // Close mobile menu on navigation
            if (isMobile && item.path && !hasChildren) {
              handleMobileClose();
            }
          }}
        >
          {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
          {(!isCollapsed || isMobile) && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant={item.badgeVariant || 'secondary'} className="h-5 px-1.5 text-xs">
                  {item.badge}
                </Badge>
              )}
              {item.isNew && (
                <Badge variant="default" className="h-5 px-1.5 text-xs">
                  NEW
                </Badge>
              )}
              {item.isPro && (
                <Badge variant="outline" className="h-5 px-1.5 text-xs">
                  PRO
                </Badge>
              )}
              {hasChildren && (
                <ChevronRight className={cn(
                  'h-4 w-4 transition-transform',
                  showSubmenu && 'rotate-90'
                )} />
              )}
            </>
          )}
        </Link>

        {/* Submenu - shows on hover for desktop (including collapsed state), on click for mobile */}
        {showSubmenu && (
          <div
            className={cn(
              isMobile ? 'relative mt-1' : 'absolute top-0 z-50',
              !isMobile && (isCollapsed ? 'left-full ml-2' : 'left-full ml-1'),
              !isMobile && 'min-w-[240px] rounded-lg border bg-popover/95 backdrop-blur-sm p-1.5 shadow-xl',
              !isMobile && 'animate-in fade-in-0 zoom-in-95 slide-in-from-left-2',
              !isMobile && 'border-border/50',
              isMobile && 'ml-4 space-y-1'
            )}
            onMouseEnter={!isMobile ? handleSubmenuMouseEnter : undefined}
            onMouseLeave={!isMobile ? handleSubmenuMouseLeave : undefined}
          >
            {/* Show title when collapsed on desktop only */}
            {isCollapsed && !isMobile && (
              <div className="px-3 py-2 border-b mb-1">
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                  <span className="font-medium text-sm">{item.title}</span>
                  {item.badge && (
                    <Badge variant={item.badgeVariant || 'secondary'} className="h-4 px-1 text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Show children if they exist, otherwise show quick actions */}
            {hasChildren ? (
              item.children?.map((child) => {
                const isChildActive = isPathActive(child.path);
                return (
                  <Link
                    key={child.id}
                    to={child.path || '#'}
                    className={cn(
                      'flex items-center gap-3 rounded-md text-sm transition-all',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                      isMobile ? 'px-4 py-2.5 min-h-[40px]' : 'px-3 py-2',
                      'hover:bg-accent hover:text-accent-foreground',
                      isChildActive && 'bg-accent text-accent-foreground font-medium',
                      'sidebar-item'
                    )}
                    role="menuitem"
                    aria-current={isChildActive ? 'page' : undefined}
                    onClick={() => {
                      if (isMobile) {
                        handleMobileClose();
                      }
                    }}
                  >
                    {child.icon && <child.icon className="h-4 w-4 flex-shrink-0" />}
                    <span className="flex-1">{child.title}</span>
                    {child.badge && (
                      <Badge variant={child.badgeVariant || 'secondary'} className="h-5 px-1.5 text-xs">
                        {child.badge}
                      </Badge>
                    )}
                    {child.isNew && (
                      <Badge variant="default" className="h-5 px-1.5 text-xs">
                        NEW
                      </Badge>
                    )}
                  </Link>
                );
              })
            ) : isCollapsed && !isMobile && (
              // Show quick info for items without children when sidebar is collapsed on desktop
              <div className="px-3 py-2 text-sm">
                <p className="text-muted-foreground">Click to navigate</p>
                {item.path && (
                  <p className="text-xs text-muted-foreground mt-1">{item.path}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Handle collapse toggle
  const handleCollapse = () => {
    if (isMobile) return; // Don't collapse on mobile
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  // Handle mobile menu open/close
  const handleMobileOpen = () => {
    setIsMobileMenuOpen(true);
    onMobileToggle?.(true);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);
    onMobileToggle?.(false);
  };

  // Effect to sync collapsed prop
  useEffect(() => {
    if (!isMobile) {
      setIsCollapsed(collapsed);
    }
  }, [collapsed, isMobile]);

  // Effect to sync mobile open prop
  useEffect(() => {
    setIsMobileMenuOpen(mobileOpen);
  }, [mobileOpen]);

  // Mobile menu button (separate from sidebar)
  if (isMobile && !isMobileMenuOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 h-10 w-10 md:hidden shadow-lg bg-background/95 backdrop-blur-sm border"
        onClick={handleMobileOpen}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={handleMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        ref={mobileMenuRef}
        className={cn(
          "flex h-full flex-col bg-background",
          // Mobile styles
          isMobile && [
            "fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[320px] border-r shadow-xl",
            "sidebar-transition",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          ],
          // Tablet styles  
          !isMobile && window.innerWidth < 1024 && [
            "border-r transition-all duration-300",
            "w-16" // Always collapsed on tablet
          ],
          // Desktop styles
          !isMobile && window.innerWidth >= 1024 && [
            "border-r transition-all duration-300",
            isCollapsed ? "w-16" : "w-64 lg:w-72 xl:w-80 2xl:w-64"
          ],
          className
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="navigation"
        aria-label="Project navigation"
      >
        {/* Header with Toggle */}
        <div className={cn(
          "border-b",
          isCollapsed && !isMobile ? "p-2" : "p-4"
        )}>
          <div className="flex items-center justify-between">
            {(!isCollapsed || isMobile) && (
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Project Management</h2>
                <p className="text-xs text-muted-foreground mt-1">Manage all your projects</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              onClick={isMobile ? handleMobileClose : handleCollapse}
              aria-label={isMobile ? 'Close menu' : (isCollapsed ? 'Expand sidebar' : 'Collapse sidebar')}
            >
              {isMobile ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : (isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />)}
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        {(!isCollapsed || isMobile) && (
          <div className="p-4 border-b">
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className="flex-1 min-w-[60px]"
                onClick={action.action}
                asChild={!!action.path}
                aria-label={action.title}
              >
                {action.path ? (
                  <Link to={action.path}>
                    <action.icon className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <action.icon className="h-4 w-4" />
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

        {/* View Options */}
        {(!isCollapsed || isMobile) && (
          <div className="px-4 py-2 border-b">
            <div className="flex gap-1 overflow-x-auto">
            {viewOptions.map((view) => (
              <Button
                key={view.id}
                variant={selectedView === view.id ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 h-8 min-w-[40px]"
                onClick={() => setSelectedView(view.id)}
                aria-label={view.title}
                aria-pressed={selectedView === view.id}
              >
                <view.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-2 sidebar-scroll">
          <nav className="space-y-1" role="menu">
            {projectNavigation.map(renderNavItem)}
          </nav>
        </ScrollArea>

        {/* Footer Stats */}
        {(!isCollapsed || isMobile) && (
          <div className="p-4 border-t">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Total Projects</span>
                <span className="text-lg font-semibold">245</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Active</span>
                <span className="text-lg font-semibold text-green-600">89</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
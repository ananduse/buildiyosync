import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Menu,
  X,
  Home,
  Search,
  Plus,
  Bell,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Star,
  Clock,
  Bookmark,
  FormInput,
  Edit,
  Eye,
  BarChart3,
  Database,
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
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Layout,
  Palette,
  Code,
  Type,
  AtSign,
  Hash,
  CheckSquare,
  RadioButton,
  List,
  Upload,
  Download,
  Share2,
  Copy,
  Archive,
  Trash2,
  Flag,
  Activity,
  TrendingUp,
  MousePointer,
  Crosshair,
  RefreshCw,
  Filter,
  SortAsc,
  MoreVertical,
  ExternalLink,
  Maximize,
  Minimize,
  Navigation,
  Compass,
  Map,
  Route,
  MapPin,
  Grid,
  Folder,
  FolderOpen,
  FileText,
  Image,
  Video,
  Headphones,
  Paperclip,
  Link,
  Percent,
  ToggleLeft,
  PieChart,
  LineChart,
  AreaChart,
  Webhook
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

interface MobileNavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  badge?: string | number;
  children?: MobileNavigationItem[];
  description?: string;
  isNew?: boolean;
  isPopular?: boolean;
  requiresPro?: boolean;
  shortcut?: string;
  category?: string;
  lastUsed?: Date;
  usageCount?: number;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  isPopular?: boolean;
  isPrimary?: boolean;
}

interface MobileNavigationProps {
  showBottomNav?: boolean;
  showQuickActions?: boolean;
  compactMode?: boolean;
  maxRecentItems?: number;
  customActions?: QuickAction[];
  onItemSelect?: (item: MobileNavigationItem) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  showBottomNav = true,
  showQuickActions = true,
  compactMode = false,
  maxRecentItems = 5,
  customActions = [],
  onItemSelect
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['forms']);
  const [recentItems, setRecentItems] = useState<MobileNavigationItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>(['form-builder', 'analytics', 'templates']);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items optimized for mobile
  const navigationItems: MobileNavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/leads/forms/dashboard',
      description: 'Overview of all forms',
      category: 'Main'
    },
    {
      id: 'forms',
      label: 'Forms',
      icon: FormInput,
      children: [
        {
          id: 'all-forms',
          label: 'All Forms',
          icon: Folder,
          path: '/leads/forms',
          badge: '12',
          description: 'View all forms'
        },
        {
          id: 'form-builder',
          label: 'Form Builder',
          icon: Edit,
          path: '/leads/forms/builder',
          description: 'Create and edit forms',
          isPopular: true
        },
        {
          id: 'templates',
          label: 'Templates',
          icon: FileTemplate,
          path: '/leads/forms/templates',
          badge: '50+',
          description: 'Form templates',
          isPopular: true
        },
        {
          id: 'multi-step',
          label: 'Multi-Step',
          icon: Layers,
          path: '/leads/forms/multi-step',
          description: 'Multi-step forms',
          isNew: true
        },
        {
          id: 'conditional-logic',
          label: 'Logic',
          icon: GitBranch,
          path: '/leads/forms/conditional-logic',
          description: 'Conditional logic',
          requiresPro: true
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      children: [
        {
          id: 'overview',
          label: 'Overview',
          icon: TrendingUp,
          path: '/leads/forms/analytics/overview',
          description: 'Performance overview'
        },
        {
          id: 'advanced-analytics',
          label: 'Advanced',
          icon: BarChart3,
          path: '/leads/forms/analytics/advanced',
          description: 'Detailed analytics',
          requiresPro: true
        },
        {
          id: 'funnel',
          label: 'Funnel',
          icon: Target,
          path: '/leads/forms/analytics/funnel',
          description: 'Conversion funnel'
        },
        {
          id: 'heatmaps',
          label: 'Heatmaps',
          icon: Crosshair,
          path: '/leads/forms/analytics/heatmaps',
          description: 'User heatmaps',
          isNew: true
        }
      ]
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: Workflow,
      children: [
        {
          id: 'workflows',
          label: 'Workflows',
          icon: Workflow,
          path: '/leads/forms/workflows',
          description: 'Form workflows'
        },
        {
          id: 'integrations',
          label: 'Integrations',
          icon: Zap,
          path: '/leads/forms/integrations',
          badge: '20+',
          description: 'External integrations'
        },
        {
          id: 'webhooks',
          label: 'Webhooks',
          icon: Webhook,
          path: '/leads/forms/webhooks',
          description: 'Real-time webhooks'
        }
      ]
    },
    {
      id: 'testing',
      label: 'Testing',
      icon: TestTube,
      children: [
        {
          id: 'ab-testing',
          label: 'A/B Testing',
          icon: TestTube,
          path: '/leads/forms/ab-testing',
          description: 'Test variations',
          requiresPro: true
        },
        {
          id: 'preview',
          label: 'Preview',
          icon: Eye,
          path: '/leads/forms/preview',
          description: 'Preview forms'
        }
      ]
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: Database,
      path: '/leads/forms/submissions',
      badge: '1.2k',
      description: 'Form submissions'
    }
  ];

  // Quick actions for mobile
  const quickActions: QuickAction[] = [
    {
      id: 'new-form',
      label: 'New Form',
      icon: Plus,
      action: () => navigate('/leads/forms/builder/new'),
      isPrimary: true,
      isPopular: true
    },
    {
      id: 'scan-qr',
      label: 'Scan QR',
      icon: Smartphone,
      action: () => {
        // Open QR scanner
        console.log('Opening QR scanner...');
      },
      isPopular: true
    },
    {
      id: 'voice-search',
      label: 'Voice Search',
      icon: Headphones,
      action: () => {
        // Start voice search
        console.log('Starting voice search...');
      }
    },
    {
      id: 'quick-share',
      label: 'Share',
      icon: Share2,
      action: () => {
        // Quick share
        console.log('Quick share...');
      }
    },
    ...customActions
  ];

  // Recent items based on usage
  useEffect(() => {
    const mockRecentItems: MobileNavigationItem[] = [
      {
        id: 'recent-1',
        label: 'Lead Form',
        icon: Building,
        path: '/leads/forms/builder/lead-form',
        lastUsed: new Date(Date.now() - 1000 * 60 * 30),
        usageCount: 15
      },
      {
        id: 'recent-2',
        label: 'Contact Template',
        icon: Mail,
        path: '/leads/forms/templates/contact',
        lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2),
        usageCount: 8
      },
      {
        id: 'recent-3',
        label: 'Survey Form',
        icon: MessageSquare,
        path: '/leads/forms/multi-step/survey',
        lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 6),
        usageCount: 3
      }
    ];
    setRecentItems(mockRecentItems.slice(0, maxRecentItems));
  }, [maxRecentItems]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleFavorite = (itemId: string) => {
    setFavoriteItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemSelect = (item: MobileNavigationItem) => {
    if (item.path) {
      navigate(item.path);
    }
    onItemSelect?.(item);
    setIsMenuOpen(false);
  };

  const isActivePath = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1h ago';
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return '1d ago';
    return `${days}d ago`;
  };

  const filteredItems = navigationItems.filter(item => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    
    const itemMatches = item.label.toLowerCase().includes(searchLower) ||
                       item.description?.toLowerCase().includes(searchLower);
    
    const childMatches = item.children?.some(child =>
      child.label.toLowerCase().includes(searchLower) ||
      child.description?.toLowerCase().includes(searchLower)
    );
    
    return itemMatches || childMatches;
  });

  const renderNavigationItem = (item: MobileNavigationItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.includes(item.id);
    const isActive = isActivePath(item.path);
    const isFavorite = favoriteItems.includes(item.id);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleSection(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start ${level > 0 ? 'pl-8' : 'pl-4'} py-3 h-auto`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.label}</span>
                  <div className="flex items-center">
                    {item.badge && (
                      <Badge variant="secondary" className="mr-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-4 border-l border-gray-200 pl-2 mt-2">
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
        className={`w-full justify-start ${level > 0 ? 'pl-8' : 'pl-4'} py-3 h-auto ${
          isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
        }`}
        onClick={() => handleItemSelect(item)}
      >
        <Icon className="h-5 w-5 mr-3" />
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between">
            <span className="font-medium">{item.label}</span>
            <div className="flex items-center">
              {isFavorite && (
                <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
              )}
              {item.badge && (
                <Badge variant="secondary" className="mr-1 text-xs">
                  {item.badge}
                </Badge>
              )}
              {item.isNew && (
                <Badge className="mr-1 text-xs bg-green-100 text-green-800">
                  NEW
                </Badge>
              )}
              {item.requiresPro && (
                <Badge className="mr-1 text-xs bg-purple-100 text-purple-800">
                  PRO
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.id);
                }}
              >
                <Star className={`h-3 w-3 ${
                  isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'
                }`} />
              </Button>
            </div>
          </div>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          )}
        </div>
      </Button>
    );
  };

  const renderQuickAction = (action: QuickAction) => {
    const Icon = action.icon;
    
    return (
      <Button
        key={action.id}
        variant={action.isPrimary ? "default" : "outline"}
        size="sm"
        onClick={action.action}
        className="flex-1 flex-col h-16 gap-1"
      >
        <Icon className="h-5 w-5" />
        <span className="text-xs">{action.label}</span>
      </Button>
    );
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center">
                        <FormInput className="h-6 w-6 text-blue-600 mr-2" />
                        Forms Center
                      </SheetTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </SheetHeader>

                  {/* Search */}
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  {showQuickActions && (
                    <div className="p-4 border-b">
                      <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.slice(0, 4).map(renderQuickAction)}
                      </div>
                    </div>
                  )}

                  {/* Favorites */}
                  {favoriteItems.length > 0 && (
                    <div className="p-4 border-b">
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                        Favorites
                      </h3>
                      <div className="space-y-1">
                        {navigationItems
                          .flatMap(item => [item, ...(item.children || [])])
                          .filter(item => favoriteItems.includes(item.id))
                          .map(item => renderNavigationItem(item))}
                      </div>
                    </div>
                  )}

                  {/* Recent Items */}
                  {recentItems.length > 0 && (
                    <div className="p-4 border-b">
                      <h3 className="text-sm font-medium mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Recent
                      </h3>
                      <div className="space-y-1">
                        {recentItems.map(item => (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start pl-4 py-3 h-auto"
                            onClick={() => handleItemSelect(item)}
                          >
                            <item.icon className="h-5 w-5 mr-3" />
                            <div className="flex-1 text-left">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatTimeAgo(item.lastUsed!)} • {item.usageCount} uses
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-2">
                      {filteredItems.map(item => renderNavigationItem(item))}
                    </div>
                  </ScrollArea>

                  {/* Footer */}
                  <div className="p-4 border-t">
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" size="sm">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help & Support
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="ml-3 text-lg font-semibold">Forms</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 py-2">
            {[
              { icon: Home, label: 'Home', path: '/leads/forms' },
              { icon: Edit, label: 'Builder', path: '/leads/forms/builder' },
              { icon: BarChart3, label: 'Analytics', path: '/leads/forms/analytics', badge: '24' },
              { icon: Database, label: 'Data', path: '/leads/forms/submissions', badge: '156' },
              { icon: Settings, label: 'Settings', path: '/leads/forms/settings' }
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={`flex-col h-16 gap-1 relative ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Drawer */}
      <Drawer open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DrawerContent className="h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Search Forms</DrawerTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search forms, analytics, settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </DrawerHeader>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Recent Searches */}
              <div>
                <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['form builder', 'analytics', 'templates', 'workflows'].map(term => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Results</h3>
                  <div className="space-y-2">
                    {filteredItems
                      .flatMap(item => [item, ...(item.children || [])])
                      .filter(item => 
                        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 10)
                      .map(item => {
                        const Icon = item.icon;
                        return (
                          <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full justify-start py-3 h-auto"
                            onClick={() => {
                              handleItemSelect(item);
                              setIsSearchOpen(false);
                            }}
                          >
                            <Icon className="h-5 w-5 mr-3" />
                            <div className="flex-1 text-left">
                              <div className="font-medium">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-muted-foreground">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Button>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Quick Actions in Search */}
              <div>
                <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map(action => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        className="flex items-center justify-start py-3"
                        onClick={() => {
                          action.action();
                          setIsSearchOpen(false);
                        }}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      {/* Floating Action Button */}
      {showQuickActions && (
        <div className="lg:hidden fixed bottom-20 right-4 z-40">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="rounded-full w-14 h-14 shadow-lg"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {quickActions.map(action => {
                const Icon = action.icon;
                return (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={action.action}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.label}
                    {action.isPopular && (
                      <Star className="h-3 w-3 ml-auto text-yellow-500 fill-current" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
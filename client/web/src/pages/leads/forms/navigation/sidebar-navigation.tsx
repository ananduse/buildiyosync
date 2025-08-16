import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Settings,
  HelpCircle,
  Bell,
  User,
  Pin,
  PinOff,
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
  MousePointer,
  Home,
  Folder,
  FolderOpen,
  FileText,
  Image,
  Video,
  Headphones,
  Paperclip,
  Link,
  Hash,
  AtSign,
  Percent,
  DollarSign as Currency,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  ToggleLeft,
  CheckSquare,
  RadioButton,
  List,
  Type,
  AlignLeft,
  Bold,
  Italic,
  Underline,
  Upload,
  Download as DownloadIcon
} from 'lucide-react';

interface NavigationSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  items: NavigationItem[];
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  badge?: string | number;
  description?: string;
  isPinned?: boolean;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string | number;
  description?: string;
  isNew?: boolean;
  isPopular?: boolean;
  requiresPro?: boolean;
  isActive?: boolean;
  children?: NavigationItem[];
  shortcut?: string;
  lastUsed?: Date;
  usageCount?: number;
}

interface SidebarNavigationProps {
  isCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  showPinnedItems?: boolean;
  showRecentItems?: boolean;
  showShortcuts?: boolean;
  customSections?: NavigationSection[];
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  isCollapsed = false,
  onCollapseChange,
  showPinnedItems = true,
  showRecentItems = true,
  showShortcuts = true,
  customSections = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['forms', 'analytics', 'recent']);
  const [pinnedItems, setPinnedItems] = useState<string[]>(['form-builder', 'templates', 'analytics-overview']);
  const [compactMode, setCompactMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Form field types for quick access
  const fieldTypes: NavigationItem[] = [
    { id: 'text', label: 'Text Input', icon: Type, path: '/field/text', shortcut: 'T' },
    { id: 'email', label: 'Email', icon: AtSign, path: '/field/email', shortcut: 'E' },
    { id: 'phone', label: 'Phone', icon: Phone, path: '/field/phone', shortcut: 'P' },
    { id: 'textarea', label: 'Text Area', icon: AlignLeft, path: '/field/textarea', shortcut: 'A' },
    { id: 'select', label: 'Dropdown', icon: List, path: '/field/select', shortcut: 'D' },
    { id: 'checkbox', label: 'Checkbox', icon: CheckSquare, path: '/field/checkbox', shortcut: 'C' },
    { id: 'radio', label: 'Radio Button', icon: RadioButton, path: '/field/radio', shortcut: 'R' },
    { id: 'date', label: 'Date', icon: CalendarIcon, path: '/field/date', shortcut: 'Shift+D' },
    { id: 'number', label: 'Number', icon: Hash, path: '/field/number', shortcut: 'N' },
    { id: 'file', label: 'File Upload', icon: Upload, path: '/field/file', shortcut: 'F' }
  ];

  const navigationSections: NavigationSection[] = [
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      icon: Zap,
      isCollapsible: false,
      items: [
        {
          id: 'new-form',
          label: 'New Form',
          icon: Plus,
          path: '/leads/forms/builder/new',
          shortcut: 'Ctrl+N',
          isPopular: true
        },
        {
          id: 'duplicate-form',
          label: 'Duplicate Form',
          icon: Copy,
          path: '/leads/forms/duplicate',
          shortcut: 'Ctrl+D'
        },
        {
          id: 'import-form',
          label: 'Import Form',
          icon: Upload,
          path: '/leads/forms/import',
          shortcut: 'Ctrl+I'
        }
      ]
    },
    {
      id: 'forms',
      title: 'Forms Management',
      icon: FormInput,
      isCollapsible: true,
      defaultExpanded: true,
      badge: '12',
      items: [
        {
          id: 'all-forms',
          label: 'All Forms',
          icon: Folder,
          path: '/leads/forms',
          badge: '12',
          shortcut: 'Ctrl+A'
        },
        {
          id: 'form-builder',
          label: 'Form Builder',
          icon: Edit,
          path: '/leads/forms/builder',
          description: 'Create and customize forms',
          isPopular: true,
          shortcut: 'Ctrl+B'
        },
        {
          id: 'templates',
          label: 'Templates Library',
          icon: FileTemplate,
          path: '/leads/forms/templates',
          badge: '50+',
          description: 'Pre-built form templates',
          shortcut: 'Ctrl+T'
        },
        {
          id: 'multi-step',
          label: 'Multi-Step Forms',
          icon: Layers,
          path: '/leads/forms/multi-step',
          description: 'Advanced multi-step forms',
          isNew: true,
          shortcut: 'Ctrl+M'
        },
        {
          id: 'conditional-logic',
          label: 'Conditional Logic',
          icon: GitBranch,
          path: '/leads/forms/conditional-logic',
          description: 'Smart form logic',
          requiresPro: true,
          shortcut: 'Ctrl+L'
        },
        {
          id: 'versioning',
          label: 'Version Control',
          icon: GitBranch,
          path: '/leads/forms/versioning',
          description: 'Form version management',
          requiresPro: true,
          shortcut: 'Ctrl+V'
        }
      ]
    },
    {
      id: 'field-types',
      title: 'Form Fields',
      icon: Type,
      isCollapsible: true,
      defaultExpanded: false,
      description: 'Drag and drop form fields',
      items: fieldTypes
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      icon: BarChart3,
      isCollapsible: true,
      defaultExpanded: true,
      items: [
        {
          id: 'analytics-overview',
          label: 'Performance Overview',
          icon: TrendingUp,
          path: '/leads/forms/analytics/overview',
          description: 'Key performance metrics',
          shortcut: 'Ctrl+O'
        },
        {
          id: 'advanced-analytics',
          label: 'Advanced Analytics',
          icon: BarChart3,
          path: '/leads/forms/analytics/advanced',
          description: 'Detailed analytics',
          requiresPro: true,
          shortcut: 'Ctrl+Shift+A'
        },
        {
          id: 'conversion-funnel',
          label: 'Conversion Funnel',
          icon: Target,
          path: '/leads/forms/analytics/funnel',
          description: 'Track conversion paths',
          shortcut: 'Ctrl+F'
        },
        {
          id: 'field-analytics',
          label: 'Field Analytics',
          icon: MousePointer,
          path: '/leads/forms/analytics/fields',
          description: 'Field performance data',
          shortcut: 'Ctrl+Shift+F'
        },
        {
          id: 'heatmaps',
          label: 'User Heatmaps',
          icon: Crosshair,
          path: '/leads/forms/analytics/heatmaps',
          description: 'Visual interaction data',
          isNew: true,
          shortcut: 'Ctrl+H'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Automation & Workflows',
      icon: Workflow,
      isCollapsible: true,
      defaultExpanded: false,
      items: [
        {
          id: 'workflows',
          label: 'Form Workflows',
          icon: Workflow,
          path: '/leads/forms/workflows',
          description: 'Automate submissions',
          shortcut: 'Ctrl+W'
        },
        {
          id: 'email-automation',
          label: 'Email Automation',
          icon: Mail,
          path: '/leads/forms/automation/email',
          description: 'Email sequences',
          shortcut: 'Ctrl+E'
        },
        {
          id: 'integrations',
          label: 'Integrations',
          icon: Zap,
          path: '/leads/forms/integrations',
          badge: '20+',
          description: 'External services',
          shortcut: 'Ctrl+I'
        },
        {
          id: 'webhooks',
          label: 'Webhooks',
          icon: Webhook,
          path: '/leads/forms/webhooks',
          description: 'Real-time sync',
          shortcut: 'Ctrl+Shift+W'
        }
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Optimization',
      icon: TestTube,
      isCollapsible: true,
      defaultExpanded: false,
      items: [
        {
          id: 'ab-testing',
          label: 'A/B Testing',
          icon: TestTube,
          path: '/leads/forms/ab-testing',
          description: 'Test variations',
          requiresPro: true,
          shortcut: 'Ctrl+Shift+T'
        },
        {
          id: 'form-preview',
          label: 'Form Preview',
          icon: Eye,
          path: '/leads/forms/preview',
          description: 'Preview forms',
          shortcut: 'Ctrl+P'
        },
        {
          id: 'device-testing',
          label: 'Device Testing',
          icon: Smartphone,
          path: '/leads/forms/device-testing',
          description: 'Test across devices',
          shortcut: 'Ctrl+Shift+D'
        }
      ]
    },
    {
      id: 'submissions',
      title: 'Form Submissions',
      icon: Database,
      isCollapsible: true,
      defaultExpanded: false,
      badge: '1.2k',
      items: [
        {
          id: 'all-submissions',
          label: 'All Submissions',
          icon: Database,
          path: '/leads/forms/submissions/all',
          badge: '1.2k',
          shortcut: 'Ctrl+S'
        },
        {
          id: 'recent-submissions',
          label: 'Recent Submissions',
          icon: Clock,
          path: '/leads/forms/submissions/recent',
          description: 'Latest submissions',
          shortcut: 'Ctrl+R'
        },
        {
          id: 'export-data',
          label: 'Export Data',
          icon: DownloadIcon,
          path: '/leads/forms/submissions/export',
          description: 'Export data',
          shortcut: 'Ctrl+Shift+E'
        }
      ]
    },
    ...customSections
  ];

  // Recent items based on usage
  const recentItems: NavigationItem[] = [
    {
      id: 'recent-1',
      label: 'Construction Lead Form',
      icon: Building,
      path: '/leads/forms/builder/construction-lead',
      lastUsed: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      usageCount: 15
    },
    {
      id: 'recent-2',
      label: 'Contact Form Template',
      icon: Mail,
      path: '/leads/forms/templates/contact',
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      usageCount: 8
    },
    {
      id: 'recent-3',
      label: 'Multi-step Survey',
      icon: Layers,
      path: '/leads/forms/multi-step/survey',
      lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      usageCount: 3
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const togglePin = (itemId: string) => {
    setPinnedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isPinned = (itemId: string) => pinnedItems.includes(itemId);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const Icon = item.icon;
    const isActive = isActivePath(item.path);
    const itemPinned = isPinned(item.id);

    const itemContent = (
      <div className="group relative">
        <Button
          variant="ghost"
          className={`w-full justify-start ${level > 0 ? 'pl-8' : 'pl-4'} ${
            isActive ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
          } ${compactMode ? 'py-1' : 'py-2'}`}
          onClick={() => navigate(item.path)}
        >
          <Icon className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} mr-3 flex-shrink-0`} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              <div className="flex items-center gap-1 ml-2">
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                {item.isNew && (
                  <Badge className="text-xs bg-green-100 text-green-800">
                    NEW
                  </Badge>
                )}
                {item.isPopular && (
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                )}
                {item.requiresPro && (
                  <Badge className="text-xs bg-purple-100 text-purple-800">
                    PRO
                  </Badge>
                )}
                {itemPinned && (
                  <Pin className="h-3 w-3 text-gray-400" />
                )}
              </div>
            </>
          )}
        </Button>
        
        {!isCollapsed && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1">
              {item.shortcut && (
                <Badge variant="outline" className="text-xs">
                  {item.shortcut}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(item.id);
                }}
              >
                {itemPinned ? (
                  <PinOff className="h-3 w-3" />
                ) : (
                  <Pin className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              {itemContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <div>
                <p className="font-medium">{item.label}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
                {item.shortcut && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Shortcut: {item.shortcut}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return itemContent;
  };

  const renderSection = (section: NavigationSection) => {
    const isExpanded = expandedSections.includes(section.id);
    const SectionIcon = section.icon;

    if (isCollapsed) {
      return (
        <TooltipProvider key={section.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mb-2">
                <div className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100">
                  <SectionIcon className="h-5 w-5" />
                </div>
                <Separator className="my-2" />
                <div className="space-y-1">
                  {section.items.map(item => renderNavigationItem(item))}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <div>
                <p className="font-medium">{section.title}</p>
                {section.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {section.description}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (!section.isCollapsible) {
      return (
        <div key={section.id} className="mb-4">
          <div className="flex items-center px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <SectionIcon className="h-4 w-4 mr-2" />
            {section.title}
            {section.badge && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {section.badge}
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            {section.items.map(item => renderNavigationItem(item))}
          </div>
        </div>
      );
    }

    return (
      <div key={section.id} className="mb-2">
        <Collapsible open={isExpanded} onOpenChange={() => toggleSection(section.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <SectionIcon className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{section.title}</span>
              {section.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {section.badge}
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
            <div className="space-y-1 mt-1">
              {section.items.map(item => renderNavigationItem(item))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  const filteredSections = navigationSections.filter(section => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const sectionMatches = section.title.toLowerCase().includes(searchLower);
    const hasMatchingItem = section.items.some(item => 
      item.label.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );
    
    return sectionMatches || hasMatchingItem;
  });

  return (
    <div className={`${
      isCollapsed ? 'w-16' : 'w-80'
    } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col h-full`}>
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <FormInput className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Forms Center</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapseChange?.(!isCollapsed)}
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Settings */}
      {!isCollapsed && (
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span>Compact Mode</span>
            <Switch
              checked={compactMode}
              onCheckedChange={setCompactMode}
            />
          </div>
        </div>
      )}

      {/* Navigation Content */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Pinned Items */}
          {!isCollapsed && showPinnedItems && pinnedItems.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Pin className="h-4 w-4 mr-2" />
                Pinned
              </div>
              <div className="space-y-1 mt-2">
                {navigationSections.flatMap(section => section.items)
                  .filter(item => pinnedItems.includes(item.id))
                  .map(item => renderNavigationItem(item))}
              </div>
              <Separator className="my-3" />
            </div>
          )}

          {/* Recent Items */}
          {!isCollapsed && showRecentItems && recentItems.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </div>
              <div className="space-y-1 mt-2">
                {recentItems.map(item => (
                  <div key={item.id} className="group relative">
                    <Button
                      variant="ghost"
                      className="w-full justify-start pl-4 py-2 hover:bg-gray-100"
                      onClick={() => navigate(item.path)}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      <div className="flex-1 text-left">
                        <div className="truncate">{item.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(item.lastUsed!)} • {item.usageCount} uses
                        </div>
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
            </div>
          )}

          {/* Main Navigation */}
          <div className="space-y-2">
            {filteredSections.map(renderSection)}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
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
  );
};

export default SidebarNavigation;
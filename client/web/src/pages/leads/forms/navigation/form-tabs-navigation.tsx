import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Edit,
  Eye,
  Settings,
  BarChart3,
  Workflow,
  TestTube,
  Share2,
  Download,
  Copy,
  Save,
  Archive,
  Trash2,
  Star,
  Clock,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Code,
  Palette,
  Layout,
  Layers,
  GitBranch,
  Target,
  MousePointer,
  TrendingUp,
  Database,
  Mail,
  Bell,
  Shield,
  Lock,
  Zap,
  Plus,
  X,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Maximize,
  Minimize,
  RefreshCw,
  Filter,
  Search,
  SortAsc,
  Calendar,
  Flag,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Info,
  HelpCircle,
  FileText,
  Image,
  Video,
  Headphones,
  Paperclip,
  Link,
  Hash,
  Type,
  AtSign,
  Phone,
  MessageSquare,
  DollarSign,
  Percent,
  ToggleLeft,
  CheckSquare,
  RadioButton,
  List,
  Upload,
  Crosshair,
  Activity,
  PieChart,
  LineChart,
  AreaChart,
  Navigation
} from 'lucide-react';

interface FormTab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  component?: React.ComponentType<any>;
  badge?: string | number;
  isActive?: boolean;
  isModified?: boolean;
  hasErrors?: boolean;
  hasWarnings?: boolean;
  canClose?: boolean;
  isPinned?: boolean;
  lastModified?: Date;
  description?: string;
  shortcut?: string;
}

interface TabGroup {
  id: string;
  label: string;
  tabs: FormTab[];
  isCollapsible?: boolean;
  isExpanded?: boolean;
  priority?: number;
}

interface FormTabsNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  maxTabs?: number;
  showTabGroups?: boolean;
  allowReordering?: boolean;
  showTabActions?: boolean;
  compactMode?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  customTabs?: FormTab[];
}

const FormTabsNavigation: React.FC<FormTabsNavigationProps> = ({
  activeTab = 'builder',
  onTabChange,
  onTabClose,
  maxTabs = 10,
  showTabGroups = true,
  allowReordering = true,
  showTabActions = true,
  compactMode = false,
  position = 'top',
  customTabs = []
}) => {
  const [openTabs, setOpenTabs] = useState<FormTab[]>([]);
  const [tabGroups, setTabGroups] = useState<TabGroup[]>([]);
  const [draggedTab, setDraggedTab] = useState<string | null>(null);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Default form editing tabs
  const defaultTabs: FormTab[] = [
    {
      id: 'builder',
      label: 'Form Builder',
      icon: Edit,
      path: '/leads/forms/builder',
      description: 'Design and build your form',
      shortcut: 'Ctrl+1',
      isPinned: true
    },
    {
      id: 'fields',
      label: 'Fields',
      icon: Type,
      path: '/leads/forms/builder/fields',
      description: 'Manage form fields',
      shortcut: 'Ctrl+2'
    },
    {
      id: 'design',
      label: 'Design',
      icon: Palette,
      path: '/leads/forms/builder/design',
      description: 'Customize form appearance',
      shortcut: 'Ctrl+3'
    },
    {
      id: 'logic',
      label: 'Logic',
      icon: GitBranch,
      path: '/leads/forms/builder/logic',
      description: 'Add conditional logic',
      shortcut: 'Ctrl+4',
      badge: 'PRO'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/leads/forms/builder/settings',
      description: 'Form configuration',
      shortcut: 'Ctrl+5'
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: Eye,
      path: '/leads/forms/builder/preview',
      description: 'Preview your form',
      shortcut: 'Ctrl+P'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/leads/forms/analytics',
      description: 'View form performance',
      shortcut: 'Ctrl+A',
      badge: '24'
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: Database,
      path: '/leads/forms/submissions',
      description: 'View form submissions',
      shortcut: 'Ctrl+S',
      badge: '156'
    },
    {
      id: 'workflows',
      label: 'Workflows',
      icon: Workflow,
      path: '/leads/forms/workflows',
      description: 'Automation workflows',
      shortcut: 'Ctrl+W'
    },
    {
      id: 'testing',
      label: 'A/B Testing',
      icon: TestTube,
      path: '/leads/forms/ab-testing',
      description: 'Test form variations',
      shortcut: 'Ctrl+T',
      badge: 'PRO'
    },
    ...customTabs
  ];

  // Grouped tabs for better organization
  const defaultTabGroups: TabGroup[] = [
    {
      id: 'builder',
      label: 'Form Builder',
      priority: 1,
      isExpanded: true,
      tabs: [
        defaultTabs.find(t => t.id === 'builder')!,
        defaultTabs.find(t => t.id === 'fields')!,
        defaultTabs.find(t => t.id === 'design')!,
        defaultTabs.find(t => t.id === 'logic')!,
        defaultTabs.find(t => t.id === 'settings')!
      ]
    },
    {
      id: 'testing',
      label: 'Testing & Preview',
      priority: 2,
      isExpanded: true,
      tabs: [
        defaultTabs.find(t => t.id === 'preview')!,
        defaultTabs.find(t => t.id === 'testing')!
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Data',
      priority: 3,
      isExpanded: true,
      tabs: [
        defaultTabs.find(t => t.id === 'analytics')!,
        defaultTabs.find(t => t.id === 'submissions')!
      ]
    },
    {
      id: 'automation',
      label: 'Automation',
      priority: 4,
      isExpanded: false,
      tabs: [
        defaultTabs.find(t => t.id === 'workflows')!
      ]
    }
  ];

  useEffect(() => {
    // Initialize with some default open tabs
    setOpenTabs([
      { ...defaultTabs.find(t => t.id === 'builder')!, isActive: activeTab === 'builder' },
      { ...defaultTabs.find(t => t.id === 'preview')!, isActive: activeTab === 'preview' },
      { ...defaultTabs.find(t => t.id === 'analytics')!, isActive: activeTab === 'analytics' }
    ]);
    setTabGroups(defaultTabGroups);
  }, []);

  const openTab = (tab: FormTab) => {
    const existingTab = openTabs.find(t => t.id === tab.id);
    
    if (!existingTab) {
      if (openTabs.length >= maxTabs) {
        // Remove least recently used tab (not pinned)
        const removableTab = openTabs.find(t => !t.isPinned);
        if (removableTab) {
          closeTab(removableTab.id);
        }
      }
      
      setOpenTabs(prev => [
        ...prev.map(t => ({ ...t, isActive: false })),
        { ...tab, isActive: true, lastModified: new Date() }
      ]);
    } else {
      setOpenTabs(prev => prev.map(t => ({
        ...t,
        isActive: t.id === tab.id
      })));
    }

    if (tab.path) {
      navigate(tab.path);
    }
    
    onTabChange?.(tab.id);
  };

  const closeTab = (tabId: string) => {
    const tab = openTabs.find(t => t.id === tabId);
    if (tab && !tab.isPinned) {
      setOpenTabs(prev => {
        const filtered = prev.filter(t => t.id !== tabId);
        // If closing active tab, activate the next one
        if (tab.isActive && filtered.length > 0) {
          const nextTab = filtered[filtered.length - 1];
          nextTab.isActive = true;
          if (nextTab.path) {
            navigate(nextTab.path);
          }
          onTabChange?.(nextTab.id);
        }
        return filtered;
      });
      onTabClose?.(tabId);
    }
  };

  const closeAllTabs = () => {
    setOpenTabs(prev => prev.filter(t => t.isPinned));
  };

  const closeOtherTabs = (keepTabId: string) => {
    setOpenTabs(prev => prev.filter(t => t.id === keepTabId || t.isPinned));
  };

  const pinTab = (tabId: string) => {
    setOpenTabs(prev => prev.map(t => 
      t.id === tabId ? { ...t, isPinned: !t.isPinned } : t
    ));
  };

  const moveTab = (fromIndex: number, toIndex: number) => {
    if (!allowReordering) return;
    
    setOpenTabs(prev => {
      const newTabs = [...prev];
      const [movedTab] = newTabs.splice(fromIndex, 1);
      newTabs.splice(toIndex, 0, movedTab);
      return newTabs;
    });
  };

  const handleTabDragStart = (tabId: string) => {
    if (allowReordering) {
      setDraggedTab(tabId);
    }
  };

  const handleTabDragOver = (e: React.DragEvent, targetTabId: string) => {
    e.preventDefault();
    if (!draggedTab || draggedTab === targetTabId) return;

    const draggedIndex = openTabs.findIndex(t => t.id === draggedTab);
    const targetIndex = openTabs.findIndex(t => t.id === targetTabId);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      moveTab(draggedIndex, targetIndex);
    }
  };

  const handleTabDragEnd = () => {
    setDraggedTab(null);
  };

  const renderTab = (tab: FormTab, index: number) => {
    const Icon = tab.icon;
    const isOverflow = index >= maxTabs - 1 && openTabs.length > maxTabs;

    if (isOverflow) return null;

    return (
      <div
        key={tab.id}
        className={`group relative flex items-center ${
          compactMode ? 'px-2 py-1' : 'px-3 py-2'
        } border-r border-gray-200 cursor-pointer transition-colors ${
          tab.isActive 
            ? 'bg-white border-b-2 border-b-blue-500 text-blue-600' 
            : 'bg-gray-50 hover:bg-gray-100'
        } ${tab.hasErrors ? 'border-b-2 border-b-red-500' : ''}
        ${tab.hasWarnings ? 'border-b-2 border-b-yellow-500' : ''}`}
        draggable={allowReordering}
        onDragStart={() => handleTabDragStart(tab.id)}
        onDragOver={(e) => handleTabDragOver(e, tab.id)}
        onDragEnd={handleTabDragEnd}
        onClick={() => openTab(tab)}
      >
        {/* Pin indicator */}
        {tab.isPinned && (
          <div className="absolute top-1 right-1 w-1 h-1 bg-blue-500 rounded-full" />
        )}

        {/* Tab content */}
        <div className="flex items-center space-x-2 min-w-0">
          <Icon className={`${compactMode ? 'h-3 w-3' : 'h-4 w-4'} flex-shrink-0`} />
          {!compactMode && (
            <>
              <span className="truncate text-sm font-medium">
                {tab.label}
              </span>
              {tab.isModified && (
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
              )}
              {tab.badge && (
                <Badge variant="secondary" className="text-xs">
                  {tab.badge}
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Tab actions */}
        {showTabActions && !compactMode && (
          <div className="flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {tab.canClose !== false && !tab.isPinned && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}

        {/* Tooltip */}
        {compactMode && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute inset-0" />
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <p className="font-medium">{tab.label}</p>
                  {tab.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {tab.description}
                    </p>
                  )}
                  {tab.shortcut && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {tab.shortcut}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  const renderTabGroup = (group: TabGroup) => {
    return (
      <div key={group.id} className="mb-4">
        <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span>{group.label}</span>
          <Badge variant="outline" className="text-xs">
            {group.tabs.length}
          </Badge>
        </div>
        <div className="space-y-1">
          {group.tabs.map(tab => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`w-full justify-start ${
                openTabs.some(t => t.id === tab.id && t.isActive) 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => openTab(tab)}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{tab.label}</span>
              {tab.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const overflowTabs = openTabs.slice(maxTabs - 1);
  const visibleTabs = openTabs.slice(0, Math.min(maxTabs - 1, openTabs.length));

  const tabsClasses = `
    ${position === 'top' ? 'border-b' : ''}
    ${position === 'bottom' ? 'border-t' : ''}
    ${position === 'left' ? 'border-r flex-col' : ''}
    ${position === 'right' ? 'border-l flex-col' : ''}
    bg-gray-50 border-gray-200
  `;

  if (showTabGroups && (position === 'left' || position === 'right')) {
    return (
      <div className={`w-64 ${tabsClasses}`}>
        <ScrollArea className="flex-1 p-2">
          {tabGroups
            .sort((a, b) => (a.priority || 0) - (b.priority || 0))
            .map(renderTabGroup)}
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${tabsClasses}`}>
      {/* Tab List */}
      <div className="flex-1 flex">
        <ScrollArea orientation="horizontal" className="flex-1">
          <div className="flex">
            {visibleTabs.map(renderTab)}
          </div>
        </ScrollArea>

        {/* Overflow Menu */}
        {overflowTabs.length > 0 && (
          <DropdownMenu open={showOverflowMenu} onOpenChange={setShowOverflowMenu}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 border-r border-gray-200"
              >
                <MoreVertical className="h-4 w-4" />
                <Badge variant="secondary" className="ml-1 text-xs">
                  {overflowTabs.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {overflowTabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => openTab(tab)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span className="flex-1">{tab.label}</span>
                    {tab.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {tab.badge}
                      </Badge>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Tab Actions */}
      {showTabActions && (
        <div className="flex items-center px-2 space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openTab(defaultTabs.find(t => t.id === 'builder')!)}>
                <Plus className="h-4 w-4 mr-2" />
                Open Builder
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openTab(defaultTabs.find(t => t.id === 'analytics')!)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Open Analytics
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={closeAllTabs}>
                <X className="h-4 w-4 mr-2" />
                Close All Tabs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                const activeTabId = openTabs.find(t => t.isActive)?.id;
                if (activeTabId) closeOtherTabs(activeTabId);
              }}>
                <X className="h-4 w-4 mr-2" />
                Close Other Tabs
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Tab Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default FormTabsNavigation;
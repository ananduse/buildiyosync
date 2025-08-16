import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Plus,
  Search,
  Command as CommandIcon,
  Settings,
  Bell,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Copy,
  Edit,
  Eye,
  Save,
  Trash2,
  Archive,
  Star,
  Bookmark,
  Flag,
  Filter,
  SortAsc,
  MoreVertical,
  Keyboard,
  Zap,
  Target,
  BarChart3,
  Users,
  Clock,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Database,
  Workflow,
  TestTube,
  GitBranch,
  FileTemplate,
  FormInput,
  Type,
  AtSign,
  Hash,
  CheckSquare,
  RadioButton,
  List,
  Layers,
  Layout,
  Palette,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer,
  TrendingUp,
  Activity,
  PieChart,
  LineChart,
  AreaChart,
  Shield,
  Lock,
  Unlock,
  ExternalLink,
  Link,
  Paperclip,
  Image,
  Video,
  Headphones,
  FileText,
  Folder,
  FolderOpen,
  Home,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Maximize,
  Minimize,
  X,
  Menu,
  Navigation,
  Compass,
  Map,
  Route,
  MapPin,
  Crosshair
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  shortcut?: string;
  action: () => void;
  category: string;
  description?: string;
  isNew?: boolean;
  requiresPro?: boolean;
  badge?: string;
}

interface ToolbarSection {
  id: string;
  label: string;
  items: QuickAction[];
  showLabels?: boolean;
  priority: number;
}

interface QuickAccessToolbarProps {
  position?: 'top' | 'bottom' | 'floating';
  showSearch?: boolean;
  showShortcuts?: boolean;
  customActions?: QuickAction[];
  compactMode?: boolean;
  showCategories?: boolean;
}

const QuickAccessToolbar: React.FC<QuickAccessToolbarProps> = ({
  position = 'top',
  showSearch = true,
  showShortcuts = true,
  customActions = [],
  compactMode = false,
  showCategories = true
}) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentActions, setRecentActions] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Core quick actions
  const coreActions: QuickAction[] = [
    {
      id: 'new-form',
      label: 'New Form',
      icon: Plus,
      shortcut: 'Ctrl+N',
      action: () => navigate('/leads/forms/builder/new'),
      category: 'Forms',
      description: 'Create a new form from scratch'
    },
    {
      id: 'duplicate-form',
      label: 'Duplicate',
      icon: Copy,
      shortcut: 'Ctrl+D',
      action: () => navigate('/leads/forms/duplicate'),
      category: 'Forms',
      description: 'Duplicate an existing form'
    },
    {
      id: 'form-templates',
      label: 'Templates',
      icon: FileTemplate,
      shortcut: 'Ctrl+T',
      action: () => navigate('/leads/forms/templates'),
      category: 'Forms',
      description: 'Browse form templates',
      badge: '50+'
    },
    {
      id: 'save-form',
      label: 'Save',
      icon: Save,
      shortcut: 'Ctrl+S',
      action: () => {
        // Save current form
        console.log('Saving form...');
      },
      category: 'Forms',
      description: 'Save current form'
    },
    {
      id: 'preview-form',
      label: 'Preview',
      icon: Eye,
      shortcut: 'Ctrl+P',
      action: () => {
        // Preview current form
        console.log('Previewing form...');
      },
      category: 'Forms',
      description: 'Preview form'
    },
    {
      id: 'publish-form',
      label: 'Publish',
      icon: Upload,
      shortcut: 'Ctrl+Shift+P',
      action: () => {
        // Publish form
        console.log('Publishing form...');
      },
      category: 'Forms',
      description: 'Publish form live'
    },
    {
      id: 'form-analytics',
      label: 'Analytics',
      icon: BarChart3,
      shortcut: 'Ctrl+A',
      action: () => navigate('/leads/forms/analytics'),
      category: 'Analytics',
      description: 'View form analytics'
    },
    {
      id: 'conversion-funnel',
      label: 'Funnel',
      icon: Target,
      shortcut: 'Ctrl+F',
      action: () => navigate('/leads/forms/analytics/funnel'),
      category: 'Analytics',
      description: 'View conversion funnel'
    },
    {
      id: 'ab-testing',
      label: 'A/B Test',
      icon: TestTube,
      shortcut: 'Ctrl+Shift+T',
      action: () => navigate('/leads/forms/ab-testing'),
      category: 'Testing',
      description: 'Create A/B test',
      requiresPro: true
    },
    {
      id: 'workflows',
      label: 'Workflows',
      icon: Workflow,
      shortcut: 'Ctrl+W',
      action: () => navigate('/leads/forms/workflows'),
      category: 'Automation',
      description: 'Manage workflows'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Zap,
      shortcut: 'Ctrl+I',
      action: () => navigate('/leads/forms/integrations'),
      category: 'Automation',
      description: 'Connect integrations',
      badge: '20+'
    },
    {
      id: 'form-submissions',
      label: 'Submissions',
      icon: Database,
      shortcut: 'Ctrl+Shift+S',
      action: () => navigate('/leads/forms/submissions'),
      category: 'Data',
      description: 'View submissions',
      badge: '1.2k'
    },
    {
      id: 'export-data',
      label: 'Export',
      icon: Download,
      shortcut: 'Ctrl+E',
      action: () => {
        // Export data
        console.log('Exporting data...');
      },
      category: 'Data',
      description: 'Export form data'
    },
    {
      id: 'form-settings',
      label: 'Settings',
      icon: Settings,
      shortcut: 'Ctrl+,',
      action: () => navigate('/leads/forms/settings'),
      category: 'Settings',
      description: 'Form settings'
    }
  ];

  // Field type actions
  const fieldActions: QuickAction[] = [
    {
      id: 'add-text',
      label: 'Text Field',
      icon: Type,
      shortcut: 'T',
      action: () => addFieldToForm('text'),
      category: 'Fields',
      description: 'Add text input field'
    },
    {
      id: 'add-email',
      label: 'Email Field',
      icon: AtSign,
      shortcut: 'E',
      action: () => addFieldToForm('email'),
      category: 'Fields',
      description: 'Add email input field'
    },
    {
      id: 'add-phone',
      label: 'Phone Field',
      icon: Phone,
      shortcut: 'P',
      action: () => addFieldToForm('phone'),
      category: 'Fields',
      description: 'Add phone input field'
    },
    {
      id: 'add-select',
      label: 'Dropdown',
      icon: List,
      shortcut: 'D',
      action: () => addFieldToForm('select'),
      category: 'Fields',
      description: 'Add dropdown field'
    },
    {
      id: 'add-checkbox',
      label: 'Checkbox',
      icon: CheckSquare,
      shortcut: 'C',
      action: () => addFieldToForm('checkbox'),
      category: 'Fields',
      description: 'Add checkbox field'
    },
    {
      id: 'add-radio',
      label: 'Radio Button',
      icon: RadioButton,
      shortcut: 'R',
      action: () => addFieldToForm('radio'),
      category: 'Fields',
      description: 'Add radio button field'
    }
  ];

  // Navigation actions
  const navigationActions: QuickAction[] = [
    {
      id: 'go-home',
      label: 'Home',
      icon: Home,
      shortcut: 'Ctrl+H',
      action: () => navigate('/'),
      category: 'Navigation',
      description: 'Go to homepage'
    },
    {
      id: 'go-back',
      label: 'Back',
      icon: ArrowLeft,
      shortcut: 'Alt+Left',
      action: () => navigate(-1),
      category: 'Navigation',
      description: 'Go back'
    },
    {
      id: 'go-forward',
      label: 'Forward',
      icon: ArrowRight,
      shortcut: 'Alt+Right',
      action: () => navigate(1),
      category: 'Navigation',
      description: 'Go forward'
    },
    {
      id: 'refresh',
      label: 'Refresh',
      icon: RefreshCw,
      shortcut: 'Ctrl+R',
      action: () => window.location.reload(),
      category: 'Navigation',
      description: 'Refresh page'
    }
  ];

  const allActions = [...coreActions, ...fieldActions, ...navigationActions, ...customActions];

  const addFieldToForm = (fieldType: string) => {
    // Logic to add field to current form
    console.log(`Adding ${fieldType} field to form`);
  };

  const trackActionUsage = (actionId: string) => {
    setRecentActions(prev => {
      const filtered = prev.filter(id => id !== actionId);
      return [actionId, ...filtered].slice(0, 10);
    });
  };

  const executeAction = (action: QuickAction) => {
    trackActionUsage(action.id);
    action.action();
    setCommandOpen(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
        return;
      }

      // Quick actions
      allActions.forEach(action => {
        if (action.shortcut) {
          const keys = action.shortcut.toLowerCase().split('+');
          const hasCtrl = keys.includes('ctrl') && (e.ctrlKey || e.metaKey);
          const hasShift = keys.includes('shift') && e.shiftKey;
          const hasAlt = keys.includes('alt') && e.altKey;
          const key = keys[keys.length - 1];

          const modifiersMatch = 
            (!keys.includes('ctrl') || hasCtrl) &&
            (!keys.includes('shift') || hasShift) &&
            (!keys.includes('alt') || hasAlt);

          if (modifiersMatch && e.key.toLowerCase() === key) {
            e.preventDefault();
            executeAction(action);
          }
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [allActions]);

  const toolbarSections: ToolbarSection[] = [
    {
      id: 'primary',
      label: 'Primary Actions',
      priority: 1,
      showLabels: !compactMode,
      items: [
        allActions.find(a => a.id === 'new-form')!,
        allActions.find(a => a.id === 'save-form')!,
        allActions.find(a => a.id === 'preview-form')!,
        allActions.find(a => a.id === 'publish-form')!
      ]
    },
    {
      id: 'forms',
      label: 'Forms',
      priority: 2,
      showLabels: false,
      items: [
        allActions.find(a => a.id === 'duplicate-form')!,
        allActions.find(a => a.id === 'form-templates')!,
        allActions.find(a => a.id === 'form-analytics')!
      ]
    },
    {
      id: 'data',
      label: 'Data',
      priority: 3,
      showLabels: false,
      items: [
        allActions.find(a => a.id === 'form-submissions')!,
        allActions.find(a => a.id === 'export-data')!
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      priority: 4,
      showLabels: false,
      items: [
        allActions.find(a => a.id === 'ab-testing')!,
        allActions.find(a => a.id === 'workflows')!,
        allActions.find(a => a.id === 'integrations')!
      ]
    }
  ];

  const renderQuickAction = (action: QuickAction, showLabel: boolean = false) => {
    const Icon = action.icon;
    
    return (
      <TooltipProvider key={action.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={compactMode ? "sm" : "default"}
              onClick={() => executeAction(action)}
              className="relative"
            >
              <Icon className={`${compactMode ? 'h-4 w-4' : 'h-5 w-5'} ${showLabel ? 'mr-2' : ''}`} />
              {showLabel && <span>{action.label}</span>}
              {action.badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                  {action.badge}
                </Badge>
              )}
              {action.isNew && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div>
              <p className="font-medium">{action.label}</p>
              {action.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </p>
              )}
              {action.shortcut && (
                <p className="text-xs text-muted-foreground mt-1">
                  {action.shortcut}
                </p>
              )}
              {action.requiresPro && (
                <Badge className="mt-1 text-xs bg-purple-100 text-purple-800">
                  PRO
                </Badge>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderToolbarSection = (section: ToolbarSection) => {
    return (
      <div key={section.id} className="flex items-center space-x-1">
        {section.items.filter(Boolean).map(item => 
          renderQuickAction(item, section.showLabels)
        )}
      </div>
    );
  };

  const groupedActions = allActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  const filteredActions = searchQuery
    ? allActions.filter(action =>
        action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allActions;

  const recentUsedActions = recentActions
    .map(id => allActions.find(a => a.id === id))
    .filter(Boolean) as QuickAction[];

  const toolbarClasses = `
    ${position === 'floating' ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50' : ''}
    ${position === 'top' ? 'sticky top-0 z-40' : ''}
    ${position === 'bottom' ? 'sticky bottom-0 z-40' : ''}
  `;

  return (
    <>
      {/* Quick Access Toolbar */}
      <div className={toolbarClasses}>
        <Card className={`${position === 'floating' ? 'shadow-lg' : 'rounded-none border-x-0'}`}>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Command Search */}
                {showSearch && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCommandOpen(true)}
                    className="min-w-[200px] justify-start text-muted-foreground"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search actions...
                    <CommandShortcut className="ml-auto">
                      Ctrl+K
                    </CommandShortcut>
                  </Button>
                )}

                {/* Toolbar Sections */}
                <div className="flex items-center space-x-4">
                  {toolbarSections
                    .sort((a, b) => a.priority - b.priority)
                    .map(section => renderToolbarSection(section))}
                </div>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center space-x-2">
                {showShortcuts && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCommandOpen(true)}
                  >
                    <Keyboard className="h-4 w-4" />
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCommandOpen(true)}>
                      <CommandIcon className="h-4 w-4 mr-2" />
                      Command Palette
                      <CommandShortcut>Ctrl+K</CommandShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Field
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {fieldActions.map(action => {
                          const Icon = action.icon;
                          return (
                            <DropdownMenuItem
                              key={action.id}
                              onClick={() => executeAction(action)}
                            >
                              <Icon className="h-4 w-4 mr-2" />
                              {action.label}
                              {action.shortcut && (
                                <CommandShortcut>{action.shortcut}</CommandShortcut>
                              )}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Customize Toolbar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Recent Actions */}
          {recentUsedActions.length > 0 && (
            <CommandGroup heading="Recent">
              {recentUsedActions.slice(0, 5).map(action => {
                const Icon = action.icon;
                return (
                  <CommandItem
                    key={action.id}
                    onSelect={() => executeAction(action)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{action.label}</span>
                    {action.description && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    )}
                    {action.shortcut && (
                      <CommandShortcut>{action.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* Grouped Actions */}
          {showCategories ? (
            Object.entries(groupedActions).map(([category, actions]) => (
              <CommandGroup key={category} heading={category}>
                {actions
                  .filter(action =>
                    !searchQuery || 
                    action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    action.description?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(action => {
                    const Icon = action.icon;
                    return (
                      <CommandItem
                        key={action.id}
                        onSelect={() => executeAction(action)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        <span>{action.label}</span>
                        {action.badge && (
                          <Badge className="ml-2 text-xs">
                            {action.badge}
                          </Badge>
                        )}
                        {action.isNew && (
                          <Badge className="ml-2 text-xs bg-green-100 text-green-800">
                            NEW
                          </Badge>
                        )}
                        {action.requiresPro && (
                          <Badge className="ml-2 text-xs bg-purple-100 text-purple-800">
                            PRO
                          </Badge>
                        )}
                        {action.shortcut && (
                          <CommandShortcut>{action.shortcut}</CommandShortcut>
                        )}
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            ))
          ) : (
            <CommandGroup heading="All Actions">
              {filteredActions.map(action => {
                const Icon = action.icon;
                return (
                  <CommandItem
                    key={action.id}
                    onSelect={() => executeAction(action)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{action.label}</span>
                    {action.description && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        - {action.description}
                      </span>
                    )}
                    {action.shortcut && (
                      <CommandShortcut>{action.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default QuickAccessToolbar;
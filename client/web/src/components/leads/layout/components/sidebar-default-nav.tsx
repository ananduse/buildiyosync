import {
  AccordionMenu,
  AccordionMenuItem,
} from '@/components/ui/accordion-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Plus, Pin, PinOff, Ellipsis, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { NavItem } from '@/components/leads/config/types';
import { Link } from 'react-router-dom';
import { useLayout } from './layout-context';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

function MoreDropdownMenu({ item }: { item: NavItem }) {
  const { sidebarCollapse, getSidebarNavItems, pinnedNavItems, pinSidebarNavItem } = useLayout();
  
  // Get all nav items that are not currently visible
  const unpinnedItems = useMemo(() => {
    const items = getSidebarNavItems();
    return items.filter(navItem => {
      // Don't show items that are:
      // 1. Currently pinned (either in config or dynamically)
      // 2. The "more" dropdown itself
      // 3. Explicitly marked as not pinnable
      const isPinnedInConfig = navItem.pinned === true;
      const isDynamicallyPinned = pinnedNavItems.includes(navItem.id);
      const isMoreMenu = navItem.id === 'more';
      const isNotPinnable = navItem.pinnable === false;
      
      return !isPinnedInConfig && !isDynamicallyPinned && !isMoreMenu && !isNotPinnable;
    });
  }, [getSidebarNavItems, pinnedNavItems]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 w-full cursor-pointer">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 w-full">
                {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                {!sidebarCollapse && (
                  <span className="flex-1 text-sm font-semibold">{item.title}</span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent align="center" side={sidebarCollapse ? "right" : "top"} sideOffset={sidebarCollapse ? 28 : 8}>
              More options
              <span className="text-xs text-muted-foreground block mt-1">Click to see hidden items</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" side="right" align="start" sideOffset={8}>
        <DropdownMenuLabel>Hidden Menu Items</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {unpinnedItems.length > 0 ? (
          unpinnedItems.map((navItem) => (
            <DropdownMenuItem 
              key={navItem.id} 
              className="cursor-pointer"
              onClick={() => pinSidebarNavItem(navItem.id)}
            >
              <div className="flex items-center gap-2 w-full">
                {navItem.icon && <navItem.icon className="h-4 w-4" />}
                <span className="flex-1">{navItem.title}</span>
                <Pin className="h-3 w-3 text-muted-foreground" />
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>
            <span className="text-muted-foreground">All items are visible</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavMenuItem({ item }: { item: NavItem }) {
  const { sidebarCollapse, pinnedNavItems, pinSidebarNavItem } = useLayout();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'));

  if (item.dropdown) {
    return (
      <div className={cn(
        "relative select-none flex w-full text-start items-center",
        "text-foreground rounded-lg px-2 text-sm",
        "outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground",
        "disabled:opacity-50 disabled:bg-transparent",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:opacity-60 [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0",
        "group py-0 h-8 justify-between cursor-pointer"
      )}>
        <MoreDropdownMenu item={item} />
      </div>
    );
  }

  // Main menu item with children
  if (hasChildren) {
    return (
      <div className="space-y-0.5">
        <AccordionMenuItem
          value={item.id}
          className={cn(
            "relative select-none flex w-full text-start items-center",
            "text-foreground rounded-lg px-2 text-sm",
            "outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent text-accent-foreground",
            "disabled:opacity-50 disabled:bg-transparent",
            "focus-visible:bg-accent focus-visible:text-accent-foreground",
            "[&_svg]:pointer-events-none [&_svg]:opacity-60 [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0",
            "group py-0 h-8 justify-between cursor-pointer"
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2 w-full">
            {/* Icon with Tooltip */}
            {item.icon && (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div><item.icon className="h-4 w-4" strokeWidth={2.5} /></div>
                </TooltipTrigger>
                <TooltipContent align="center" side={sidebarCollapse ? "right" : "top"} sideOffset={sidebarCollapse ? 28 : 8}>
                  {item.title}
                  {item.children && item.children.length > 0 && (
                    <span className="text-xs text-muted-foreground block mt-1">{item.children.length} items</span>
                  )}
                </TooltipContent>
              </Tooltip>
            )}
            
            {/* Title */}
            {!sidebarCollapse && (
              <span className="flex-1 text-sm font-semibold">
                {item.title}
              </span>
            )}
            
            {/* Chevron and Pin/Unpin */}
            {!sidebarCollapse && (
              <div className="flex items-center gap-1">
                {item.pinnable !== false && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Ellipsis className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          pinSidebarNavItem(item.id);
                        }}
                      >
                        {item.pinned || pinnedNavItems.includes(item.id) ? (
                          <>
                            <PinOff className="mr-2 h-4 w-4" />
                            Unpin from sidebar
                          </>
                        ) : (
                          <>
                            <Pin className="mr-2 h-4 w-4" />
                            Pin to sidebar
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform",
                  isExpanded && "rotate-90"
                )} />
              </div>
            )}
          </div>
        </AccordionMenuItem>
        
        {/* Submenu items */}
        {isExpanded && !sidebarCollapse && (
          <div className="ms-2 mt-1 space-y-0.5">
            {item.children.map((child) => (
              <Tooltip key={child.id} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    to={child.path || '#'}
                    className={cn(
                      "relative select-none flex w-full text-start items-center",
                      "text-gray-700 dark:text-gray-300 rounded-lg px-2 ps-4 text-[13px]",
                      "outline-hidden transition-all duration-200",
                      "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                      child.path && location.pathname === child.path && "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 font-medium",
                      "disabled:opacity-50 disabled:bg-transparent",
                      "focus-visible:bg-gray-100 focus-visible:text-gray-900",
                      "group py-1.5 min-h-[32px]"
                    )}
                  >
                    {/* Submenu Icon */}
                    {child.icon && (
                      <span className="flex-shrink-0 flex items-center justify-center w-4 mr-3">
                        <child.icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                    )}
                    <span className="flex-1">{child.title}</span>
                    {child.badge && (
                      <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                        {child.badge}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {child.title}
                  {child.path && (
                    <span className="text-xs text-muted-foreground block mt-1">{child.path}</span>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Simple menu item without children
  return (
    <AccordionMenuItem
      value={item.id}
      className={cn(
        "relative select-none flex w-full text-start items-center",
        "text-foreground rounded-lg px-2 text-sm",
        "outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        "disabled:opacity-50 disabled:bg-transparent",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:opacity-60 [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0",
        "group py-0 h-8 justify-between"
      )}
    >
      <Link to={item.path || '#'} className="flex items-center gap-2 w-full">
        {/* Icon with Tooltip */}
        {item.icon && (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div><item.icon className="h-4 w-4" strokeWidth={2.5} /></div>
            </TooltipTrigger>
            <TooltipContent align="center" side={sidebarCollapse ? "right" : "top"} sideOffset={sidebarCollapse ? 28 : 8}>
              {item.title}
              {item.path && !sidebarCollapse && (
                <span className="text-xs text-muted-foreground block mt-1">{item.path}</span>
              )}
            </TooltipContent>
          </Tooltip>
        )}
        
        {/* Title */}
        {!sidebarCollapse && (
          <span className="flex-1 text-sm font-semibold">
            {item.title}
          </span>
        )}
        
        {/* Badge and Pin/Unpin */}
        {!sidebarCollapse && (
          <div className="flex items-center gap-1">
            {item.badge && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {item.badge}
              </Badge>
            )}
            {item.pinnable !== false && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Ellipsis className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      pinSidebarNavItem(item.id);
                    }}
                  >
                    {item.pinned || pinnedNavItems.includes(item.id) ? (
                      <>
                        <PinOff className="mr-2 h-4 w-4" />
                        Unpin from sidebar
                      </>
                    ) : (
                      <>
                        <Pin className="mr-2 h-4 w-4" />
                        Pin to sidebar
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </Link>
    </AccordionMenuItem>
  );
}

export function SidebarDefaultNav() {
  const { pinnedNavItems, getSidebarNavItems, sidebarCollapse } = useLayout();
  
  const navItems = useMemo(() => {
    const items = getSidebarNavItems();
    return items.filter(item => {
      // Show item if:
      // 1. It's marked as pinned in config (pinned: true)
      // 2. It's in the pinnedNavItems array (dynamically pinned)
      // 3. It's a dropdown menu (more menu)
      // 4. If pinned is not explicitly false and it's in pinnedNavItems
      const isPinnedInConfig = item.pinned === true;
      const isDynamicallyPinned = pinnedNavItems.includes(item.id);
      const isDropdown = item.dropdown === true;
      
      return isPinnedInConfig || isDynamicallyPinned || isDropdown;
    });
  }, [pinnedNavItems, getSidebarNavItems]);

  return (
    <div className="px-(--sidebar-space-x)">
      <AccordionMenu className="w-full space-y-0.5">
        {navItems.map((item) => (
          <NavMenuItem key={item.id} item={item} />
        ))}
      </AccordionMenu>
    </div>
  );
}
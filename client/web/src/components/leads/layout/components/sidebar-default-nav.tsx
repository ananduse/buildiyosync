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
  
  // Get all nav items that are not currently pinned
  const unpinnedItems = useMemo(() => {
    const items = getSidebarNavItems();
    return items.filter(navItem => 
      !navItem.pinned && 
      !pinnedNavItems.includes(navItem.id) && 
      navItem.id !== 'more' &&
      navItem.pinnable !== false
    );
  }, [getSidebarNavItems, pinnedNavItems]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center w-full cursor-pointer">
          {sidebarCollapse ? (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <span className="flex-shrink-0 flex items-center justify-center w-4">
                  {item.icon && <item.icon className="h-4 w-4" />}
                </span>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={28}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <span className="flex-shrink-0 flex items-center justify-center w-4">
                {item.icon && <item.icon className="h-4 w-4" />}
              </span>
              <span className="ms-3 flex-1 text-sm text-left">{item.title}</span>
            </>
          )}
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
  const { sidebarCollapse } = useLayout();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
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
          <div className="flex items-center w-full">
            {/* Icon */}
            {item.icon && (
              sidebarCollapse ? (
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <span className="flex-shrink-0 flex items-center justify-center w-4"><item.icon className="h-4 w-4" /></span>
                  </TooltipTrigger>
                  <TooltipContent align="center" side="right" sideOffset={28}>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <span className="flex-shrink-0 flex items-center justify-center w-4">
                  <item.icon className="h-4 w-4" />
                </span>
              )
            )}
            
            {/* Title */}
            <span className={cn(
              sidebarCollapse && "hidden",
              "ms-3 flex-1 text-sm"
            )}>
              {item.title}
            </span>
            
            {/* Chevron */}
            {!sidebarCollapse && (
              <ChevronRight className={cn(
                "h-3 w-3 transition-transform",
                isExpanded && "rotate-90"
              )} />
            )}
          </div>
        </AccordionMenuItem>
        
        {/* Submenu items */}
        {isExpanded && !sidebarCollapse && (
          <div className="ms-2 mt-1 space-y-0.5">
            {item.children.map((child) => (
              <Link
                key={child.id}
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
                    <child.icon className="h-3.5 w-3.5" />
                  </span>
                )}
                <span className="flex-1">{child.title}</span>
                {child.badge && (
                  <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                    {child.badge}
                  </Badge>
                )}
              </Link>
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
      <Link to={item.path || '#'} className="flex items-center w-full">
        {/* Icon */}
        {item.icon && (
          sidebarCollapse ? (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <span className="flex-shrink-0 flex items-center justify-center w-4"><item.icon className="h-4 w-4" /></span>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={28}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <span className="flex-shrink-0 flex items-center justify-center w-4">
              <item.icon className="h-4 w-4" />
            </span>
          )
        )}
        
        {/* Title */}
        <span className={cn(
          sidebarCollapse && "hidden",
          "ms-3 flex-1 text-sm"
        )}>
          {item.title}
        </span>
        
        {/* Badge */}
        {item.badge && !sidebarCollapse && (
          <Badge variant="secondary" className="ms-auto h-5 px-1.5 text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    </AccordionMenuItem>
  );
}

export function SidebarDefaultNav() {
  const { pinnedNavItems, getSidebarNavItems, sidebarCollapse } = useLayout();
  
  const navItems = useMemo(() => {
    const items = getSidebarNavItems();
    return items.filter(item => item.pinned || pinnedNavItems.includes(item.id) || item.dropdown);
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
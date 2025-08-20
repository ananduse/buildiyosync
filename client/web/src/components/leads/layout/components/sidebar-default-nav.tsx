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
  const { isSidebarNavItemPinned, unpinSidebarNavItem, pinSidebarNavItem, sidebarCollapse, getSidebarNavItems } = useLayout();
  
  const pinnableNavItems = useMemo(() => {
    const navItems = getSidebarNavItems();
    return navItems.filter((item) => item.pinnable);
  }, [getSidebarNavItems]);

  const handlePin = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isSidebarNavItemPinned(id)) {
      unpinSidebarNavItem(id);
    } else {
      pinSidebarNavItem(id);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center grow gap-2.5 font-medium cursor-pointer">
          {sidebarCollapse ? (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <span>{item.icon && <item.icon />}</span>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={28}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            item.icon && <item.icon />
          )}
          <span className={cn(sidebarCollapse && "hidden")}>{item.title}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="start" sideOffset={18} alignOffset={-5}>
        {pinnableNavItems.map((navItem) => (
          <DropdownMenuItem className="cursor-pointer" key={navItem.id} onClick={(e) => handlePin(navItem.id, e)}>
            <div className="flex items-center gap-2.5">
              {navItem.icon && <navItem.icon />}
              <span>{navItem.title}</span>
            </div>
            {isSidebarNavItemPinned(navItem.id) ? (
              <Pin className={cn('ms-auto text-primary size-3.5')}/>
            ) : (
              <PinOff className={cn('ms-auto text-muted-foreground size-3.5')}/>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavItemComponent({ item, isSubmenu = false }: { item: NavItem; isSubmenu?: boolean }) {
  const { sidebarCollapse } = useLayout();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isActive = item.path && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
  const hasChildren = item.children && item.children.length > 0;

  if (item.dropdown) {
    return <MoreDropdownMenu item={item} />;
  }

  const content = (
    <div className={cn(
      "flex items-center w-full",
      isSubmenu && "ps-6"
    )}>
      {/* Icon only for main menu items */}
      {!isSubmenu && item.icon && (
        sidebarCollapse ? (
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <span className="flex-shrink-0"><item.icon className="h-4 w-4" /></span>
            </TooltipTrigger>
            <TooltipContent align="center" side="right" sideOffset={28}>
              {item.title}
            </TooltipContent>
          </Tooltip>
        ) : (
          <item.icon className="h-4 w-4 flex-shrink-0" />
        )
      )}
      
      {/* Title */}
      <span className={cn(
        sidebarCollapse && "hidden",
        !isSubmenu && item.icon && "ms-2.5",
        "flex-1"
      )}>
        {item.title}
      </span>
      
      {/* Badge */}
      {item.badge && !sidebarCollapse && (
        <Badge variant="secondary" className="ms-auto h-5 px-1.5 text-xs">
          {item.badge}
        </Badge>
      )}
      
      {/* Chevron for expandable items */}
      {hasChildren && !sidebarCollapse && (
        <ChevronRight className={cn(
          "h-3 w-3 transition-transform ms-1",
          isExpanded && "rotate-90"
        )} />
      )}
    </div>
  );

  if (hasChildren) {
    return (
      <>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-start"
        >
          {content}
        </button>
        {isExpanded && !sidebarCollapse && (
          <div className="mt-1 space-y-0.5">
            {item.children.map((child) => (
              <NavMenuItem key={child.id} item={child} isSubmenu={true} />
            ))}
          </div>
        )}
      </>
    );
  }

  if (item.path) {
    return (
      <Link to={item.path} className="flex items-center gap-2 w-full">
        {content}
      </Link>
    );
  }

  return content;
}

function NavMenuItem({ item, isSubmenu = false }: { item: NavItem; isSubmenu?: boolean }) {
  const location = useLocation();
  const isActive = item.path && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'));
  
  return (
    <AccordionMenuItem
      value={item.id}
      className={cn(
        "relative select-none flex w-full text-start items-center",
        "text-foreground rounded-lg gap-2 px-2 text-sm",
        "outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        "disabled:opacity-50 disabled:bg-transparent",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "[&_svg]:pointer-events-none [&_svg]:opacity-60 [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0",
        "[&_a]:flex [&>a]:w-full [&>a]:items-center [&>a]:gap-2",
        "group py-0 h-8 justify-between",
        isSubmenu && "h-7 text-[13px] ps-2"
      )}
      defaultOpen={false}
    >
      <NavItemComponent item={item} isSubmenu={isSubmenu} />
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
          <NavMenuItem key={item.id} item={item} isSubmenu={false} />
        ))}
      </AccordionMenu>
    </div>
  );
}


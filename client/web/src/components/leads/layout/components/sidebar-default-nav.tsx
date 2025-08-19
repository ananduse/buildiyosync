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
import { Plus, Pin, PinOff, Ellipsis } from 'lucide-react';
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
import { useMemo } from 'react';

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

function NavItemComponent({ item }: { item: NavItem }) {
  const { sidebarCollapse } = useLayout();
  const location = useLocation();
  
  const isActive = item.path && (location.pathname === item.path || location.pathname.startsWith(item.path + '/'));

  if (item.dropdown) {
    return <MoreDropdownMenu item={item} />;
  }

  const content = (
    <>
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
        <>
          {item.icon && <item.icon />}
          <span className={cn(sidebarCollapse && "hidden")}>{item.title}</span>
        </>
      )}
      {item.badge && !sidebarCollapse && (
        <Badge variant="secondary" className="ms-auto h-5 px-1.5 text-xs">
          {item.badge}
        </Badge>
      )}
    </>
  );

  if (item.path) {
    return (
      <Link to={item.path} className="flex items-center gap-2">
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-2">{content}</div>;
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
          <AccordionMenuItem
            key={item.id}
            value={item.id}
            className={cn(
              "relative select-none flex w-full text-start items-center",
              "text-foreground rounded-lg gap-2 px-2 text-sm",
              "outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground",
              "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
              "disabled:opacity-50 disabled:bg-transparent",
              "focus-visible:bg-accent focus-visible:text-accent-foreground",
              "[&_svg]:pointer-events-none [&_svg]:opacity-60 [&_svg:not([class*=size-])]:size-4 [&_svg]:shrink-0",
              "[&_a]:flex [&>a]:w-full [&>a]:items-center [&>a]:gap-2",
              "group py-0 h-8 justify-between",
              item.dropdown && "cursor-pointer"
            )}
            defaultOpen={false}
          >
            <NavItemComponent item={item} />
            {item.new && !sidebarCollapse && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={item.new.path}>
                    <Button variant="ghost" size="icon" className="size-6 hover:bg-input">
                      <Plus className="size-3.5"/>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  {item.new.tooltip}
                </TooltipContent>
              </Tooltip>
            )}
            {item.more && !sidebarCollapse && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-6 hover:bg-input">
                    <Ellipsis className="size-3.5"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Plus />
                      <span>Add {item.title}</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => unpinSidebarNavItem(item.id)}>
                    <PinOff/>
                    <span>Unpin from sidebar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </AccordionMenuItem>
        ))}
      </AccordionMenu>
    </div>
  );
}


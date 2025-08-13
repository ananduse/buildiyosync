import {
  BarChart3,
  Bell,
  CheckSquare,
  Code,
  HelpCircle,
  MessageSquare,
  Settings,
  Shield,
  UserCircle,
  Users,
  Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface Item {
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  title: string;
  newTab?: boolean;
  active?: boolean;
}

interface SidebarMenuProps {
  isCollapsed: boolean;
}

export function SidebarMenu({ isCollapsed }: SidebarMenuProps) {
  const items: Item[] = [
    {
      icon: BarChart3,
      path: '/',
      title: 'Dashboard',
    },
    {
      icon: UserCircle,
      path: '/public-profile/profiles/default',
      title: 'Profile',
    },
    {
      icon: Settings,
      path: '/account/home/get-started',
      title: 'Account',
    },
    {
      icon: Target,
      path: '/leads/dashboard',
      title: 'Leads',
      active: true,
    },
    {
      icon: Users,
      path: '/network/get-started',
      title: 'Network',
    },
    {
      icon: Shield,
      path: '/account/billing/plans',
      title: 'Plans',
    },
    {
      icon: MessageSquare,
      path: '/account/security/security-log',
      title: 'Security Logs',
    },
    {
      icon: Bell,
      path: '/account/notifications',
      title: 'Notifications',
    },
    {
      icon: CheckSquare,
      path: '/account/members/roles',
      title: 'ACL',
    },
    {
      icon: Code,
      path: '/account/api-keys',
      title: 'API Keys',
    },
    {
      icon: HelpCircle,
      path: 'https://docs.keenthemes.com/metronic-vite',
      title: 'Docs',
    },
  ];

  return (
    <TooltipProvider>
      <div className={cn(
        "flex flex-col grow py-3.5 lg:py-0 gap-2.5",
        isCollapsed ? "items-center" : "px-3 w-full"
      )}>
        {items.map((item, index) => (
          isCollapsed ? (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  shape="circle"
                  mode="icon"
                  {...(item.active ? { 'data-state': 'open' } : {})}
                  className={cn(
                    'data-[state=open]:bg-white data-[state=open]:border data-[state=open]:border-input data-[state=open]:text-primary',
                    'hover:bg-white hover:border hover:border-input hover:text-primary',
                  )}
                >
                  <Link
                    to={item.path || ''}
                    {...(item.newTab
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <item.icon className="size-4.5!" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              key={index}
              variant="ghost"
              {...(item.active ? { 'data-state': 'open' } : {})}
              className={cn(
                'w-full justify-start gap-3 px-3',
                'data-[state=open]:bg-white data-[state=open]:text-primary',
                'hover:bg-white hover:text-primary',
              )}
              asChild
            >
              <Link
                to={item.path || ''}
                {...(item.newTab
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <item.icon className="size-4.5!" />
                <span>{item.title}</span>
              </Link>
            </Button>
          )
        ))}
      </div>
    </TooltipProvider>
  );
}

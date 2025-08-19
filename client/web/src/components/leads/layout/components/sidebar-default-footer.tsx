import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings, Shield, HelpCircle, Star } from 'lucide-react';
import { useLayout } from './layout-context';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function SidebarDefaultFooter() {
  const { sidebarCollapse } = useLayout();

  const footerItems = [
    { icon: Star, label: 'Favorites', path: '/leads/favorites' },
    { icon: Shield, label: 'Security', path: '/leads/security' },
    { icon: Settings, label: 'Settings', path: '/leads/settings' },
  ];

  if (sidebarCollapse) {
    return (
      <div className="border-t border-border py-2 space-y-1">
        {footerItems.map((item) => (
          <div key={item.label} className="px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={item.path}>
                  <Button variant="ghost" size="icon" className="w-full h-8">
                    <item.icon className="size-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={20}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border-t border-border">
      <div className="px-[var(--sidebar-space-x)] py-2 space-y-1">
        {footerItems.map((item, index) => (
          <div key={item.label}>
            <Link to={item.path}>
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <item.icon className="size-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
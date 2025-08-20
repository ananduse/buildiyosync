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
  const { sidebarCollapse, setIsWorkspaceMode } = useLayout();

  const footerItems = [
    { icon: Star, label: 'Favorites', path: '/leads/favorites', action: null },
    { icon: Shield, label: 'Security', path: '/leads/security', action: null },
    { icon: Settings, label: 'Settings', path: null, action: () => setIsWorkspaceMode(true) },
  ];

  if (sidebarCollapse) {
    return (
      <div className="border-t border-border py-2 space-y-1">
        {footerItems.map((item) => (
          <div key={item.label} className="px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                {item.action ? (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-full h-8"
                    onClick={item.action}
                  >
                    <item.icon className="size-4" strokeWidth={2.5} />
                  </Button>
                ) : (
                  <Link to={item.path}>
                    <Button variant="ghost" size="icon" className="w-full h-8">
                      <item.icon className="size-4" strokeWidth={2.5} />
                    </Button>
                  </Link>
                )}
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
            {item.action ? (
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground"
                onClick={item.action}
              >
                <item.icon className="size-4 mr-2" strokeWidth={2.5} />
                {item.label}
              </Button>
            ) : (
              <Link to={item.path}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <item.icon className="size-4 mr-2" strokeWidth={2.5} />
                  {item.label}
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
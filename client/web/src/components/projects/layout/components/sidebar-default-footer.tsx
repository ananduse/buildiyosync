import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings, HelpCircle, LogOut } from 'lucide-react';
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
    { icon: Settings, label: 'Settings', path: null, action: () => setIsWorkspaceMode(true) },
    { icon: HelpCircle, label: 'Help & Support', path: '/projects/help', action: null },
  ];

  if (sidebarCollapse) {
    return (
      <div className="mt-auto border-t border-border py-2 space-y-1 flex-shrink-0">
        {footerItems.map((item) => (
          <div key={item.label} className="px-2">
            <Tooltip delayDuration={300}>
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
                  <Link to={item.path || '#'}>
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
        <Separator className="my-1" />
        <div className="px-2">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-full h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="size-4" strokeWidth={2.5} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={20}>
              Sign Out
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-auto border-t border-border flex-shrink-0">
      <div className="px-[var(--sidebar-space-x)] py-2 space-y-1">
        {footerItems.map((item, index) => (
          <div key={item.label}>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
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
                  <Link to={item.path || '#'}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="size-4 mr-2" strokeWidth={2.5} />
                      {item.label}
                    </Button>
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                {item.label}
                {item.label === 'Settings' && (
                  <span className="text-xs text-muted-foreground block mt-1">Open workspace settings</span>
                )}
                {item.path && (
                  <span className="text-xs text-muted-foreground block mt-1">{item.path}</span>
                )}
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
        <Separator className="my-1" />
        <Button
          variant="ghost"
          className="w-full justify-start h-8 px-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="size-4 mr-2" strokeWidth={2.5} />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
import { ChevronFirst } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';

export function SidebarHeader() {
  const { settings, storeOption } = useSettings();

  const handleToggleClick = () => {
    storeOption(
      'layouts.demo1.sidebarCollapse',
      !settings.layouts.demo1.sidebarCollapse,
    );
  };

  return (
    <div className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0">
      <Link to="/">
        <div className="dark:hidden">
          <img
            src={toAbsoluteUrl('/media/app/buildiyo-logo.svg')}
            className="default-logo w-8 h-8"
            alt="Buildiyo Logo"
          />
          <img
            src={toAbsoluteUrl('/media/app/buildiyo-logo.svg')}
            className="small-logo w-8 h-8"
            alt="Buildiyo Logo"
          />
        </div>
        <div className="hidden dark:block">
          <img
            src={toAbsoluteUrl('/media/app/buildiyo-logo-dark.svg')}
            className="default-logo w-8 h-8"
            alt="Buildiyo Logo"
          />
          <img
            src={toAbsoluteUrl('/media/app/buildiyo-logo-dark.svg')}
            className="small-logo w-8 h-8"
            alt="Buildiyo Logo"
          />
        </div>
      </Link>
      <Button
        onClick={handleToggleClick}
        size="sm"
        mode="icon"
        variant="outline"
        className={cn(
          'size-7 absolute start-full top-2/4 rtl:translate-x-2/4 -translate-x-2/4 -translate-y-2/4',
          settings.layouts.demo1.sidebarCollapse
            ? 'ltr:rotate-180'
            : 'rtl:rotate-180',
        )}
      >
        <ChevronFirst className="size-4!" />
      </Button>
    </div>
  );
}

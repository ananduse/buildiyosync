import { HeaderBrand } from '@/components/leads/layout/components/header-brand';
import { HeaderMainNav } from '@/components/leads/layout/components/header-main-nav';
import { HeaderSearch } from './header-search';
import { HeaderQuickActions } from './header-quick-actions';
import { HeaderNotifications } from '@/components/leads/layout/components/header-notifications';
import { HeaderHelp } from '@/components/leads/layout/components/header-help';
import { HeaderUsers } from '@/components/leads/layout/components/header-users';
import { Separator } from '@/components/ui/separator';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[10] flex items-center h-[var(--header-height)] bg-zinc-950 border-b border-zinc-950 dark:border-border">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HeaderBrand />
          <Separator orientation="vertical" className="bg-zinc-600 h-4" />
          <HeaderMainNav />
          <Separator orientation="vertical" className="bg-zinc-600 h-4" />
          <HeaderSearch />
        </div>
        <div className="flex items-center gap-2">
          <HeaderQuickActions />
          <Separator orientation="vertical" className="bg-zinc-600 h-4 mx-1" />
          <HeaderNotifications />
          <HeaderHelp />
          <Separator orientation="vertical" className="bg-zinc-600 h-4 mx-1" />
          <HeaderUsers />
        </div>
      </div>
    </header>
  );
}
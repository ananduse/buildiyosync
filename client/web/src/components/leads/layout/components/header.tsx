import { HeaderBrand } from './header-brand';
import { HeaderUpgrade } from './header-upgrade';
import { HeaderNew } from './header-new';
import { HeaderHelp } from './header-help';
import { HeaderUsers } from './header-users';
import { HeaderNotifications } from './header-notifications';
import { Separator } from '@/components/ui/separator';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[10] flex items-center h-[var(--header-height)] bg-zinc-950 border-b border-zinc-950 dark:border-border">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <HeaderBrand />
        </div>
        <div className="flex items-center gap-2">
          <HeaderUpgrade />
          <HeaderNew />
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
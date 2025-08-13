import { HeaderLogo } from './header-logo';
import { HeaderTopbar } from './header-topbar';

interface HeaderProps {
  sidebarWidth?: string;
}

export function Header({ sidebarWidth }: HeaderProps) {
  return (
    <header className="flex items-center fixed z-10 top-0 left-0 right-0 shrink-0 h-(--header-height) bg-muted">
      <div className="flex justify-between items-stretch w-full px-5 lg:ps-0 lg:gap-4">
        <HeaderLogo sidebarWidth={sidebarWidth} />
        <HeaderTopbar />
      </div>
    </header>
  );
}

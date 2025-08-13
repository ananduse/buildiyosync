import { NavbarLinks } from './navbar-links';
import { NavbarMenu } from './navbar-menu';

interface NavbarProps {
  sidebarWidth?: string;
}

export function Navbar({ sidebarWidth = '240px' }: NavbarProps) {
  return (
    <div 
      className="flex items-stretch lg:fixed z-5 top-(--header-height) end-5 h-(--navbar-height) mx-5 lg:mx-0 bg-muted lg:left-0"
      style={{ 
        left: sidebarWidth,
        transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="rounded-t-xl border border-border bg-background flex items-stretch grow">
        <div className="flex justify-between items-stretch gap-5 w-full px-4 lg:px-6">
          <NavbarMenu />
          <NavbarLinks />
        </div>
      </div>
    </div>
  );
}

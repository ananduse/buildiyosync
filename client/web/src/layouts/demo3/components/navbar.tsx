import { Container } from '@/components/common/container';
import { NavbarLinks } from './navbar-links';
import { NavbarMenu } from './navbar-menu';

interface NavbarProps {
  sidebarWidth?: string;
}

export function Navbar({ sidebarWidth = '58px' }: NavbarProps) {
  return (
    <div 
      className="flex items-stretch lg:fixed z-5 top-(--header-height) end-5 h-(--navbar-height) mx-5 lg:mx-0 bg-muted"
      style={{ 
        left: sidebarWidth,
        transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="rounded-t-xl border border-border bg-background flex items-stretch grow">
        <Container className="flex justify-between items-stretch gap-5">
          <NavbarMenu />
          <NavbarLinks />
        </Container>
      </div>
    </div>
  );
}

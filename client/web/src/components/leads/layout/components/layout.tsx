import { cn } from '@/lib/utils';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { ContentHeader } from './content-header';
import { ContentTitle } from './content-title';
import { SecondaryNav } from './secondary-nav';
import { useLayout } from './layout-context';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export function Layout({ children }: { children?: React.ReactNode }) {
  const { sidebarCollapse } = useLayout();
  const isMobile = useIsMobile();

  const rootProps = {
    className: cn(
      'flex grow h-screen flex-col',
      '[--header-height:40px]',
      '[--content-header-height:54px]',
      '[--sidebar-width:250px] [--sidebar-width-collapsed:52px] [--sidebar-header-height:54px] [--sidebar-footer-height:45px] [--sidebar-footer-collapsed-height:90px]'
    ),
    ...(sidebarCollapse === true && { 'data-sidebar-collapsed': true })
  };

  return (
    <div {...rootProps}>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar />}
        <main className="flex-1 flex flex-col mt-[var(--header-height)] lg:mt-[calc(var(--header-height)+var(--content-header-height))] lg:ms-[var(--sidebar-width)] lg:in-data-[sidebar-collapsed]:ms-[var(--sidebar-width-collapsed)] transition-[margin-inline-start] duration-200 ease-in-out bg-white overflow-hidden">
          <ContentHeader>
            <ContentTitle />
          </ContentHeader>
          <SecondaryNav />
          <div className="flex-1 px-4 lg:px-6 py-4 bg-gray-50 overflow-y-auto">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}
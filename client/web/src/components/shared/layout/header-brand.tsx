import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetBody, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { HeaderWorkspace } from '@/components/leads/layout/components/header-workspace';
import { Separator } from '@/components/ui/separator';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

// Import sidebar components and configs for different modules
import { SidebarContent as LeadsSidebarContent } from '@/components/leads/layout/components/sidebar-content';
import { SidebarContent as ProjectsSidebarContent } from '@/components/projects/layout/components/sidebar-content';
import { LayoutProvider as LeadsLayoutProvider } from '@/components/leads/layout/components/layout-context';
import { LayoutProvider as ProjectsLayoutProvider } from '@/components/projects/layout/components/layout-context';
import { LEADS_NAV } from '@/components/leads/config/app.config';

export function HeaderBrand() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  // Determine which sidebar to show based on current route
  const renderSidebar = () => {
    if (pathname.startsWith('/leads')) {
      return (
        <LeadsLayoutProvider sidebarNavItems={LEADS_NAV}>
          <LeadsSidebarContent />
        </LeadsLayoutProvider>
      );
    } else if (pathname.startsWith('/projects')) {
      return (
        <ProjectsLayoutProvider>
          <ProjectsSidebarContent />
        </ProjectsLayoutProvider>
      );
    } else if (pathname.startsWith('/crm')) {
      // CRM has a different module structure, fallback to leads for now
      return (
        <LeadsLayoutProvider sidebarNavItems={LEADS_NAV}>
          <LeadsSidebarContent />
        </LeadsLayoutProvider>
      );
    } else {
      // Default to projects sidebar
      return (
        <ProjectsLayoutProvider>
          <ProjectsSidebarContent />
        </ProjectsLayoutProvider>
      );
    }
  };
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <img 
          src="/media/brand-logos/buildiyosync.svg" 
          alt="BuildiyoSync" 
          className="h-6 w-auto"
        />
        <span className="font-semibold text-white text-base hidden lg:block">BuildiyoSync</span>
      </div>
      
      <Separator orientation="vertical" className="bg-zinc-600 h-5" />
      
      <HeaderWorkspace />
      
      {isMobile && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800 ms-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="p-0 gap-0 w-[var(--sidebar-width)]"
            side="left"
            close={false}
            aria-describedby="sidebar-description"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription id="sidebar-description">
                Access navigation menu and workspace options
              </SheetDescription>
            </VisuallyHidden>
            <SheetHeader className="p-0 space-y-0" />
            <SheetBody className="flex flex-col grow p-0 [--sidebar-space-x:calc(var(--spacing)*2.5)]">
              {renderSidebar()}
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
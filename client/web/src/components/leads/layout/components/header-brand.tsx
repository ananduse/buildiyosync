import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetBody } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarContent } from './sidebar-content';
import { useLocation } from 'react-router-dom';
import { HeaderWorkspace } from './header-workspace';
import { Separator } from '@/components/ui/separator';
import { LayoutProvider } from './layout-context';
import { LEADS_NAV } from '../../config/app.config';

export function HeaderBrand() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);
  
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
          >
            <SheetHeader className="p-0 space-y-0" />
            <SheetBody className="flex flex-col grow p-0 [--sidebar-space-x:calc(var(--spacing)*2.5)]">
              <LayoutProvider sidebarNavItems={LEADS_NAV}>
                <SidebarContent />
              </LayoutProvider>
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
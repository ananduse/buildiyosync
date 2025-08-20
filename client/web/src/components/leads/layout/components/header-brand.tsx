import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetBody } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarContent } from './sidebar-content';
import { useLocation } from 'react-router-dom';

export function HeaderBrand() {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);
  
  return (
    <div className="flex items-center -ms-1">
      <div className="flex items-center gap-2 text-white">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <span className="font-semibold text-sm hidden sm:inline">Lead Management</span>
      </div>
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
              <SidebarContent />
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
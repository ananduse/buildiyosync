import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MegaMenuMobile } from './mega-menu-mobile';

export function HeaderLogo() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center gap-1 lg:w-[400px] grow lg:grow-0">
      <div className="flex items-center gap-2 shrink-0">
        <Link to="/">
          <img
            src={toAbsoluteUrl('/media/app/buildiyo-logo.svg')}
            className="shrink-0 dark:hidden w-8 h-8"
            alt="Buildiyo Logo"
          />
          <img
            src={toAbsoluteUrl('/media/app/buildiyo-logo-dark.svg')}
            className="shrink-0 hidden dark:inline-block w-8 h-8"
            alt="Buildiyo Logo"
          />
        </Link>
        <h3 className="text-mono text-lg font-medium hidden md:block">
          Buildiyo
        </h3>
      </div>

      {isMobile && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="dim" mode="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="p-0 gap-0 w-[275px]"
            side="left"
            close={false}
          >
            <SheetHeader className="p-0 space-y-0" />
            <SheetBody className="p-0 overflow-y-auto">
              <MegaMenuMobile />
            </SheetBody>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

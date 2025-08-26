import { useEffect, useLayoutEffect, useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { useBodyClass } from '@/hooks/use-body-class';
import { useMenu } from '@/hooks/use-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { Toolbar, ToolbarActions, ToolbarHeading } from './components/toolbar';
// Import our enhanced lead management components
import LeadLayout from '@/components/leads/layout/LeadLayout';

export function Demo3Layout() {
  const { pathname } = useLocation();
  const { getCurrentItem } = useMenu(pathname);
  const item = getCurrentItem(MENU_SIDEBAR);
  const { setOption } = useSettings();
  const isMobileMode = useIsMobile();
  
  // Check if we're on a lead management page
  const isLeadPage = pathname.startsWith('/leads/');
  
  // Initialize collapsed state with immediate CSS variable update
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check localStorage for saved preference
    const saved = typeof window !== 'undefined' ? localStorage.getItem('sidebarCollapsed') : null;
    
    // Default to collapsed (true) if no saved preference exists OR on mobile
    const collapsed = saved !== null ? JSON.parse(saved) : true;
    
    // Calculate width based on collapsed state
    const width = collapsed ? '58px' : '240px';
    
    // Set CSS variable immediately during state initialization
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--sidebar-width', width);
      // Add class to body to prevent transition on initial load
      document.body.classList.add('sidebar-no-transition');
      
      // Force a style recalculation
      document.documentElement.offsetHeight;
      
      // Remove the no-transition class after a frame
      requestAnimationFrame(() => {
        document.body.classList.remove('sidebar-no-transition');
      });
    }
    
    return collapsed;
  });

  const sidebarWidth = isCollapsed ? '58px' : '240px';

  const handleToggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  useBodyClass(`
    [--header-height:58px] 
    [--navbar-height:56px] 
    [--sidebar-width:${sidebarWidth}]
    lg:overflow-hidden 
    bg-muted!
  `);

  // Update CSS variable dynamically - run before first render
  useLayoutEffect(() => {
    // Multiple approaches to ensure CSS variable is set immediately
    document.documentElement.style.setProperty('--sidebar-width', sidebarWidth);
    
    // Force style recalculation
    document.documentElement.offsetHeight;
    
    // Add a temporary high-priority style to override any cached styles
    const tempStyle = document.createElement('style');
    tempStyle.id = 'sidebar-width-override';
    tempStyle.textContent = `
      :root { 
        --sidebar-width: ${sidebarWidth} !important; 
      }
      body {
        --sidebar-width: ${sidebarWidth} !important;
      }
      /* Prevent transitions on initial load */
      body.sidebar-no-transition * {
        transition: none !important;
      }
    `;
    
    // Remove any existing override
    const existing = document.getElementById('sidebar-width-override');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(tempStyle);
    
    // Clean up the temporary style after components have rendered
    const cleanup = setTimeout(() => {
      const styleEl = document.getElementById('sidebar-width-override');
      if (styleEl) {
        styleEl.remove();
      }
    }, 100);
    
    return () => {
      clearTimeout(cleanup);
      const styleEl = document.getElementById('sidebar-width-override');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [sidebarWidth]);

  useEffect(() => {
    setOption('layout', 'demo3');
    setOption('container', 'fluid');
  }, [setOption]);

  // Auto-collapse sidebar on mobile devices or when route changes on mobile
  useEffect(() => {
    if (isMobileMode && !isCollapsed) {
      setIsCollapsed(true);
      localStorage.setItem('sidebarCollapsed', JSON.stringify(true));
    }
  }, [isMobileMode, pathname]);

  // If it's a lead page, use our enhanced LeadLayout
  if (isLeadPage) {
    return (
      <>
        <Helmet>
          <title>{item?.title}</title>
        </Helmet>
        <LeadLayout>
          <Outlet />
        </LeadLayout>
      </>
    );
  }

  // Otherwise, use the standard demo3 layout
  return (
    <>
      <Helmet>
        <title>{item?.title}</title>
      </Helmet>
      <div className="flex grow">
        <Header sidebarWidth={sidebarWidth} />

        <div className="flex flex-col lg:flex-row grow pt-(--header-height)">
          {!isMobileMode && (
            <Sidebar 
              isCollapsed={isCollapsed} 
            />
          )}

          {/* Toggle Button - At the bottom of sidebar */}
          {!isMobileMode && (
            <div
              className={cn(
                "fixed bottom-4 z-30 flex",
                isCollapsed ? "left-2 w-[54px] justify-center" : "left-3 w-[234px] justify-end pe-3"
              )}
              style={{ 
                backgroundColor: 'transparent',
                transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <Button
                variant="outline"
                onClick={handleToggleSidebar}
                className={cn(
                  "h-9 rounded-md bg-white hover:bg-primary/10 border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md group",
                  isCollapsed ? "w-9 p-0" : "w-auto px-3 gap-2"
                )}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-primary" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-primary" />
                    <span className="text-sm text-gray-600 group-hover:text-primary">Collapse</span>
                  </>
                )}
              </Button>
            </div>
          )}

          <Navbar sidebarWidth={sidebarWidth} />

          <div 
            className="flex grow rounded-b-xl bg-background border-x border-b border-border lg:mt-(--navbar-height) mr-5 mb-5"
            style={{ 
              marginLeft: !isMobileMode ? sidebarWidth : '20px',
              transition: 'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="flex flex-col grow kt-scrollable-y lg:[scrollbar-width:auto] pt-7 lg:[&_[data-slot=container]]:pe-2">
              <main className="grow" role="content">
                {pathname !== '/' && !pathname.startsWith('/leads/') && (
                  <Toolbar>
                    <ToolbarHeading />
                    <ToolbarActions>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={'/account/home/get-started'}>
                          <Download />
                          Export
                        </Link>
                      </Button>
                    </ToolbarActions>
                  </Toolbar>
                )}
                <Outlet />
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

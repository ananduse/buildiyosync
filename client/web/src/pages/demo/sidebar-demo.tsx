import { useState, useEffect } from 'react';
import { ProjectSidebarHover } from '@/components/shared/project-sidebar-hover';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export function SidebarDemo() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex h-screen bg-background relative">
      {/* Mobile Menu Button - Shown when sidebar is hidden on mobile */}
      {isMobile && !mobileMenuOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 h-10 w-10 md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <ProjectSidebarHover
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        onMobileToggle={setMobileMenuOpen}
        className="relative z-20"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with responsive padding for mobile menu button */}
          <div className={isMobile && !mobileMenuOpen ? "ml-14" : ""}>
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Responsive Sidebar Demo</h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              This page demonstrates the responsive sidebar with mobile-optimized features. 
              <span className="block mt-2">
                <strong>Desktop:</strong> Hover over menu items to see submenus. Use the toggle button to collapse/expand.
              </span>
              <span className="block mt-2">
                <strong>Mobile:</strong> Tap the menu button to open. Swipe left to close or tap outside. Tap items with arrows to see submenus.
              </span>
            </p>
          </div>

          {/* Responsive Info Cards */}
          <div className="grid gap-4 mb-8">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2 text-sm">Current Viewport</h3>
              <p className="text-xs text-muted-foreground">
                {isMobile ? '📱 Mobile View (< 768px)' : 
                 window.innerWidth < 1024 ? '📋 Tablet View (768px - 1024px)' : 
                 '🖥️ Desktop View (> 1024px)'}
              </p>
            </div>
          </div>

          {/* Demo Cards with responsive grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm sm:text-base">Card {i + 1}</h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded">
                    {i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Complete'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Demo content demonstrating responsive layout alongside the sidebar.
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs px-2 py-1 border rounded hover:bg-accent transition-colors">
                    View
                  </button>
                  <button className="text-xs px-2 py-1 border rounded hover:bg-accent transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile-specific information */}
          {isMobile && (
            <div className="mt-8 p-4 rounded-lg bg-muted">
              <h3 className="font-semibold mb-2">Mobile Features:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Swipe from left edge to open menu</li>
                <li>• Swipe left on menu to close</li>
                <li>• Tap outside menu to close</li>
                <li>• Tap menu items to expand submenus</li>
                <li>• 44px minimum touch targets</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
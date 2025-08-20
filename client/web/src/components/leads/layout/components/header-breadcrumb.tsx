import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function HeaderBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { path, label };
  });

  return (
    <nav className="flex items-center gap-1 text-sm">
      <Link
        to="/leads/dashboard"
        className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <Home className="h-3 w-3" />
        <span>Home</span>
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3 text-zinc-600" />
          <Link
            to={crumb.path}
            className={cn(
              "transition-colors",
              index === breadcrumbs.length - 1
                ? "text-zinc-100 font-medium"
                : "text-zinc-400 hover:text-zinc-100"
            )}
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
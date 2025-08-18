import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProjectBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbMap: Record<string, string> = {
    'projects': 'Projects',
    'dashboard': 'Dashboard',
    'list': 'All Projects',
    'kanban': 'Kanban Board',
    'calendar': 'Calendar View',
    'timeline': 'Timeline & Gantt',
    'new': 'New Project',
    'details': 'Project Details',
    'tasks': 'Tasks & Activities',
    'progress': 'Site Progress',
    'budget': 'Budget Control',
    'finance': 'Finance',
    'quotations': 'Quotations',
    'boq': 'BOQ/BOM',
    'manpower': 'Manpower',
    'labor': 'Labor Management',
    'contractors': 'Contractors',
    'supervisors': 'Site Supervisors',
    'materials': 'Materials',
    'equipment': 'Equipment',
    'inventory': 'Inventory',
    'procurement': 'Procurement',
    'vendors': 'Suppliers/Vendors',
    'documents': 'Document Repository',
    'designs': 'Designs & Approval',
    'quality': 'Quality Management',
    'safety': 'Safety Management',
    'chat': 'Team Chat',
    'whatsapp': 'WhatsApp Integration',
    'reports': 'Reports',
    'ai': 'AI Assistant',
    'automation': 'Automation',
    'settings': 'Settings',
    'users': 'Users & Roles',
    'activity': 'Activity Log',
    'help': 'Help & Support'
  };

  const generateBreadcrumbs = () => {
    const crumbs = [
      {
        label: 'Home',
        path: '/',
        icon: Home
      }
    ];

    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      const isLast = index === pathnames.length - 1;
      
      crumbs.push({
        label: breadcrumbMap[name] || name.charAt(0).toUpperCase() + name.slice(1),
        path: currentPath,
        isLast
      });
    });

    return crumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {crumb.isLast ? (
            <span className="font-medium text-gray-900">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-gray-700 transition-colors"
            >
              <div className="flex items-center gap-1">
                {crumb.icon && <crumb.icon className="h-4 w-4" />}
                {crumb.label}
              </div>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
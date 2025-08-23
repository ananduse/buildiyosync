import { Outlet } from 'react-router-dom';

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {children || <Outlet />}
    </div>
  );
}
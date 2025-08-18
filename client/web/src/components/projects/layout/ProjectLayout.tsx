'use client';

import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProjectSidebar from '../navigation/ProjectSidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectLayoutProps {
  children?: ReactNode;
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(true);

  return (
    <div className="flex h-full w-full bg-gray-50">
      {/* Custom Project Sidebar */}
      <div 
        className={cn(
          "relative transition-all duration-300 ease-in-out flex-shrink-0",
          isProjectSidebarOpen ? "w-64" : "w-0"
        )}
        style={{ overflow: isProjectSidebarOpen ? 'visible' : 'hidden' }}
      >
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isProjectSidebarOpen ? "opacity-100" : "opacity-0"
        )}>
          <ProjectSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Toggle Button for Project Sidebar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-4 z-40 h-8 w-8 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-105"
          onClick={() => setIsProjectSidebarOpen(!isProjectSidebarOpen)}
          title={isProjectSidebarOpen ? "Hide project sidebar" : "Show project sidebar"}
        >
          {isProjectSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
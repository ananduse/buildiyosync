import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Upload,
  Download,
  Calendar,
  Users,
  DollarSign,
  ClipboardCheck,
  MessageSquare,
  FileText,
  Settings,
  MoreVertical,
  Building2,
  Target,
  Package,
  Hammer,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProjectQuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: Plus,
      label: 'New Project',
      action: () => navigate('/projects/new'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: ClipboardCheck,
      label: 'Add Task',
      action: () => navigate('/projects/tasks/new'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: DollarSign,
      label: 'Add Expense',
      action: () => navigate('/projects/finance/expenses/new'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      action: () => navigate('/projects/calendar'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const moreActions = [
    { icon: Upload, label: 'Import Projects', action: () => navigate('/projects/import') },
    { icon: Download, label: 'Export Data', action: () => navigate('/projects/export') },
    { icon: FileText, label: 'Generate Report', action: () => navigate('/projects/reports/new') },
    { icon: Users, label: 'Team Management', action: () => navigate('/projects/team') },
    { icon: Package, label: 'Material Request', action: () => navigate('/projects/materials/request') },
    { icon: Hammer, label: 'Equipment Request', action: () => navigate('/projects/equipment/request') },
    { icon: Camera, label: 'Site Photos', action: () => navigate('/projects/photos/upload') },
    { icon: MessageSquare, label: 'Team Chat', action: () => navigate('/projects/chat') },
    { icon: Target, label: 'Set Milestone', action: () => navigate('/projects/milestones/new') },
    { icon: Building2, label: 'Site Survey', action: () => navigate('/projects/site-survey/new') }
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Primary Quick Actions */}
      {quickActions.map((action, index) => (
        <Button
          key={index}
          size="sm"
          onClick={action.action}
          className={`${action.color} text-white border-0 flex items-center gap-2`}
        >
          <action.icon className="h-4 w-4" />
          <span className="hidden md:inline">{action.label}</span>
        </Button>
      ))}

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
            <span className="hidden md:inline ml-2">More Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="grid grid-cols-1 gap-1">
            {moreActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={action.action}
                className="flex items-center gap-2 cursor-pointer"
              >
                <action.icon className="h-4 w-4" />
                <span>{action.label}</span>
              </DropdownMenuItem>
            ))}
          </div>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/projects/settings')}>
            <Settings className="h-4 w-4 mr-2" />
            <span>Project Settings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
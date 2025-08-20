import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CreditCard, 
  Zap, 
  Shield, 
  Palette, 
  Globe, 
  Bell, 
  ChevronLeft,
  Crown,
  CheckCircle,
  AlertCircle,
  LogOut,
  Database,
  FileText,
  BarChart3,
  GitBranch,
  UserCog,
  Mail,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Workspace {
  id: string;
  name: string;
  logo?: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  members: number;
  role: 'owner' | 'admin' | 'member';
}

interface WorkspaceMenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href: string;
  badge?: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
}

const mockWorkspace: Workspace = {
  id: '1',
  name: 'Lead Management Hub',
  logo: '/media/brand-logos/lead-hub.svg',
  plan: 'pro',
  status: 'active',
  members: 42,
  role: 'owner'
};

const workspaceMenuItems: WorkspaceMenuItem[] = [
  {
    id: 'overview',
    title: 'Workspace Overview',
    description: 'Manage your lead workspace settings',
    icon: Building2,
    href: '/leads/settings/workspace'
  },
  {
    id: 'lead-settings',
    title: 'Lead Configuration',
    description: 'Configure lead fields, stages, and workflows',
    icon: Settings,
    href: '/leads/settings',
    badge: 'Essential'
  },
  {
    id: 'data-management',
    title: 'Data Management',
    description: 'Import, export, and manage lead data',
    icon: Database,
    href: '/leads/master-data/lead-sources'
  },
  {
    id: 'team',
    title: 'Team & Roles',
    description: 'Manage team members and permissions',
    icon: UserCog,
    href: '/leads/team/roles',
    badge: mockWorkspace.members.toString()
  },
  {
    id: 'pipeline',
    title: 'Pipeline Settings',
    description: 'Configure sales pipeline and stages',
    icon: GitBranch,
    href: '/leads/pipeline'
  },
  {
    id: 'forms',
    title: 'Forms & Templates',
    description: 'Manage lead capture forms and templates',
    icon: FileText,
    href: '/leads/forms',
    badge: '12 Active'
  },
  {
    id: 'email-config',
    title: 'Email Configuration',
    description: 'Set up email templates and automation',
    icon: Mail,
    href: '/leads/admin/email-settings'
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect with CRM, email, and other tools',
    icon: Zap,
    href: '/leads/admin/integrations',
    badge: '5 Active'
  },
  {
    id: 'analytics',
    title: 'Analytics Settings',
    description: 'Configure reports and dashboards',
    icon: BarChart3,
    href: '/leads/analytics/dashboard'
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    description: 'Manage subscriptions and payment',
    icon: CreditCard,
    href: '/account/billing',
    badge: 'Pro Plan'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Manage authentication and data protection',
    icon: Shield,
    href: '/leads/admin/security'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure alerts and notifications',
    icon: Bell,
    href: '/leads/admin/notifications'
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize themes and branding',
    icon: Palette,
    href: '/account/appearance'
  },
  {
    id: 'regional',
    title: 'Regional Settings',
    description: 'Language, timezone, and localization',
    icon: Globe,
    href: '/account/regional'
  }
];

interface SidebarWorkspaceProps {
  onSwitchToDefault: () => void;
}

export function SidebarWorkspace({ onSwitchToDefault }: SidebarWorkspaceProps) {
  const location = useLocation();

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'destructive';
      case 'pro': return 'primary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="size-3 text-emerald-500" />;
      case 'trial': return <AlertCircle className="size-3 text-amber-500" />;
      default: return <AlertCircle className="size-3 text-red-500" />;
    }
  };

  return (
    <>
      {/* Header - Back to Lead Management */}
      <div className="group flex justify-between items-center gap-2.5 border-b border-border h-[var(--sidebar-header-height)] shrink-0 px-2.5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSwitchToDefault}
            className="flex items-center gap-2 text-sm hover:bg-accent"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
            <span className="in-data-[sidebar-collapsed]:hidden">Back to Leads</span>
          </Button>
        </div>
      </div>

      {/* Workspace Info */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="size-8">
            <AvatarImage src={mockWorkspace.logo} alt={mockWorkspace.name} />
            <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              LM
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 in-data-[sidebar-collapsed]:hidden">
            <h3 className="font-semibold text-sm truncate">{mockWorkspace.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Badge variant={getPlanBadgeVariant(mockWorkspace.plan)} size="xs">
                {mockWorkspace.plan === 'enterprise' && <Crown className="size-3 mr-1" />}
                {mockWorkspace.plan.charAt(0).toUpperCase() + mockWorkspace.plan.slice(1)}
              </Badge>
              {getStatusIcon(mockWorkspace.status)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {workspaceMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4 flex-shrink-0" strokeWidth={2.5} />
                <div className="flex-1 min-w-0 in-data-[sidebar-collapsed]:hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{item.title}</span>
                    {item.badge && (
                      <Badge variant={item.variant || 'secondary'} className="ml-auto h-5 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer - User Info & Logout */}
      <div className="flex items-center justify-between p-3 border-t border-border in-data-[sidebar-collapsed]:flex-col in-data-[sidebar-collapsed]:gap-2">
        <div className="flex items-center gap-2 in-data-[sidebar-collapsed]:justify-center">
          <Avatar className="size-6">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-blue-600 text-white">JD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium in-data-[sidebar-collapsed]:hidden">John Doe</span>
        </div>
        <Button variant="ghost" size="sm" className="in-data-[sidebar-collapsed]:w-full in-data-[sidebar-collapsed]:px-0">
          <LogOut className="size-3 mr-2 in-data-[sidebar-collapsed]:mr-0" strokeWidth={2.5} />
          <span className="in-data-[sidebar-collapsed]:hidden">Log Out</span>
        </Button>
      </div>
    </>
  );
}
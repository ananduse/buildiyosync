import { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Activity,
  DollarSign,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Building2,
  Home,
  Globe,
  Navigation,
  Map,
  Route,
  Compass,
  Locate,
  MapIcon,
  Crosshair,
  Landmark,
  TreePine,
  Mountain,
  Waves,
  Layers,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  FileText,
  Tag,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Gauge,
  User,
  UserCheck,
  UserX,
  Crown,
  Key,
  Lock,
  Unlock,
  Badge as BadgeIcon,
  Calendar as CalendarIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Bell,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Video
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  level: 'executive' | 'manager' | 'supervisor' | 'agent' | 'admin';
  permissions: string[];
  isActive: boolean;
  color: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'marketing' | 'support' | 'operations' | 'management';
  managerId: string;
  members: string[];
  targets: {
    leads: number;
    revenue: number;
    conversions: number;
  };
  performance: {
    leadsAssigned: number;
    leadsConverted: number;
    totalRevenue: number;
    avgResponseTime: number;
    customerSatisfaction: number;
    teamCollaboration: number;
  };
  isActive: boolean;
}

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  title: string;
  department: string;
  roleId: string;
  teamIds: string[];
  managerId?: string;
  territories: string[];
  specializations: string[];
  status: 'active' | 'inactive' | 'on-leave' | 'training';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  startDate: Date;
  location: {
    office: string;
    remote: boolean;
    timezone: string;
  };
  contact: {
    workPhone?: string;
    mobile: string;
    emergencyContact?: string;
    preferredContact: 'email' | 'phone' | 'sms';
  };
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
    language: string;
    theme: 'light' | 'dark' | 'auto';
  };
  performance: {
    leadsAssigned: number;
    leadsQualified: number;
    leadsConverted: number;
    totalRevenue: number;
    avgResponseTime: number;
    avgDealSize: number;
    conversionRate: number;
    customerRating: number;
    productivity: number;
    goalsAchieved: number;
    lastActivity: Date;
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
  };
  skills: {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    certified: boolean;
  }[];
  achievements: {
    id: string;
    name: string;
    description: string;
    date: Date;
    type: 'milestone' | 'certification' | 'award' | 'recognition';
  }[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

// Mock data
const mockRoles: Role[] = [
  {
    id: 'ROLE001',
    name: 'Sales Manager',
    description: 'Manages sales teams and processes',
    level: 'manager',
    permissions: ['leads.read', 'leads.write', 'leads.assign', 'reports.read', 'team.manage'],
    isActive: true,
    color: '#3B82F6'
  },
  {
    id: 'ROLE002',
    name: 'Lead Agent',
    description: 'Handles lead qualification and conversion',
    level: 'agent',
    permissions: ['leads.read', 'leads.write', 'leads.call', 'leads.email'],
    isActive: true,
    color: '#10B981'
  },
  {
    id: 'ROLE003',
    name: 'Marketing Specialist',
    description: 'Creates and manages marketing campaigns',
    level: 'agent',
    permissions: ['campaigns.read', 'campaigns.write', 'leads.read', 'analytics.read'],
    isActive: true,
    color: '#8B5CF6'
  },
  {
    id: 'ROLE004',
    name: 'Admin',
    description: 'System administrator with full access',
    level: 'admin',
    permissions: ['*'],
    isActive: true,
    color: '#EF4444'
  }
];

const mockTeams: Team[] = [
  {
    id: 'TEAM001',
    name: 'Sales Team Alpha',
    description: 'Primary sales team for residential leads',
    type: 'sales',
    managerId: 'USER001',
    members: ['USER001', 'USER002', 'USER003', 'USER004'],
    targets: {
      leads: 500,
      revenue: 2500000,
      conversions: 125
    },
    performance: {
      leadsAssigned: 456,
      leadsConverted: 123,
      totalRevenue: 2840000,
      avgResponseTime: 15,
      customerSatisfaction: 4.6,
      teamCollaboration: 87
    },
    isActive: true
  },
  {
    id: 'TEAM002',
    name: 'Commercial Sales',
    description: 'Dedicated team for commercial and enterprise clients',
    type: 'sales',
    managerId: 'USER005',
    members: ['USER005', 'USER006', 'USER007'],
    targets: {
      leads: 200,
      revenue: 5000000,
      conversions: 50
    },
    performance: {
      leadsAssigned: 189,
      leadsConverted: 56,
      totalRevenue: 5450000,
      avgResponseTime: 22,
      customerSatisfaction: 4.4,
      teamCollaboration: 92
    },
    isActive: true
  },
  {
    id: 'TEAM003',
    name: 'Marketing Team',
    description: 'Lead generation and campaign management',
    type: 'marketing',
    managerId: 'USER008',
    members: ['USER008', 'USER009', 'USER010'],
    targets: {
      leads: 1000,
      revenue: 0,
      conversions: 0
    },
    performance: {
      leadsAssigned: 1245,
      leadsConverted: 0,
      totalRevenue: 0,
      avgResponseTime: 8,
      customerSatisfaction: 4.2,
      teamCollaboration: 85
    },
    isActive: true
  }
];

const mockUsers: UserProfile[] = [
  {
    id: 'USER001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1-555-0101',
    avatar: undefined,
    title: 'Senior Sales Manager',
    department: 'Sales',
    roleId: 'ROLE001',
    teamIds: ['TEAM001'],
    territories: ['California', 'Nevada'],
    specializations: ['Residential Construction', 'Kitchen Renovation'],
    status: 'active',
    employmentType: 'full-time',
    startDate: new Date(2022, 0, 15),
    location: {
      office: 'San Francisco',
      remote: false,
      timezone: 'PST'
    },
    contact: {
      workPhone: '+1-555-0101',
      mobile: '+1-555-0102',
      preferredContact: 'email'
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      workingHours: {
        start: '08:00',
        end: '17:00',
        timezone: 'PST'
      },
      language: 'English',
      theme: 'light'
    },
    performance: {
      leadsAssigned: 145,
      leadsQualified: 98,
      leadsConverted: 34,
      totalRevenue: 1850000,
      avgResponseTime: 12,
      avgDealSize: 54412,
      conversionRate: 23.4,
      customerRating: 4.7,
      productivity: 89,
      goalsAchieved: 112,
      lastActivity: new Date(2024, 0, 20),
      trend: 'up',
      trendPercentage: 15.3
    },
    skills: [
      { name: 'Sales Management', level: 'expert', certified: true },
      { name: 'Lead Qualification', level: 'expert', certified: false },
      { name: 'CRM Software', level: 'advanced', certified: true }
    ],
    achievements: [
      {
        id: 'ACH001',
        name: 'Top Performer Q4 2023',
        description: 'Exceeded sales targets by 150%',
        date: new Date(2023, 11, 31),
        type: 'award'
      },
      {
        id: 'ACH002',
        name: 'Sales Leadership Certification',
        description: 'Completed advanced sales leadership program',
        date: new Date(2023, 8, 15),
        type: 'certification'
      }
    ],
    createdAt: new Date(2022, 0, 15),
    updatedAt: new Date(2024, 0, 20),
    lastLogin: new Date(2024, 0, 20, 14, 30)
  },
  {
    id: 'USER002',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@company.com',
    phone: '+1-555-0201',
    title: 'Lead Sales Agent',
    department: 'Sales',
    roleId: 'ROLE002',
    teamIds: ['TEAM001'],
    territories: ['Los Angeles', 'Orange County'],
    specializations: ['Residential Construction'],
    status: 'active',
    employmentType: 'full-time',
    startDate: new Date(2023, 2, 1),
    location: {
      office: 'Los Angeles',
      remote: true,
      timezone: 'PST'
    },
    contact: {
      mobile: '+1-555-0201',
      preferredContact: 'phone'
    },
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      workingHours: {
        start: '09:00',
        end: '18:00',
        timezone: 'PST'
      },
      language: 'English',
      theme: 'dark'
    },
    performance: {
      leadsAssigned: 89,
      leadsQualified: 67,
      leadsConverted: 28,
      totalRevenue: 1245000,
      avgResponseTime: 8,
      avgDealSize: 44464,
      conversionRate: 31.5,
      customerRating: 4.8,
      productivity: 95,
      goalsAchieved: 125,
      lastActivity: new Date(2024, 0, 20),
      trend: 'up',
      trendPercentage: 22.1
    },
    skills: [
      { name: 'Lead Qualification', level: 'advanced', certified: true },
      { name: 'Customer Communication', level: 'expert', certified: false },
      { name: 'Sales Process', level: 'advanced', certified: true }
    ],
    achievements: [
      {
        id: 'ACH003',
        name: 'Rookie of the Year 2023',
        description: 'Outstanding performance in first year',
        date: new Date(2023, 11, 31),
        type: 'award'
      }
    ],
    createdAt: new Date(2023, 2, 1),
    updatedAt: new Date(2024, 0, 20),
    lastLogin: new Date(2024, 0, 20, 16, 45)
  },
  {
    id: 'USER003',
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@company.com',
    phone: '+1-555-0301',
    title: 'Sales Agent',
    department: 'Sales',
    roleId: 'ROLE002',
    teamIds: ['TEAM001'],
    territories: ['San Francisco', 'Bay Area'],
    specializations: ['Commercial Construction', 'Office Build-out'],
    status: 'active',
    employmentType: 'full-time',
    startDate: new Date(2023, 5, 15),
    location: {
      office: 'San Francisco',
      remote: false,
      timezone: 'PST'
    },
    contact: {
      mobile: '+1-555-0301',
      preferredContact: 'email'
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      workingHours: {
        start: '08:30',
        end: '17:30',
        timezone: 'PST'
      },
      language: 'English',
      theme: 'auto'
    },
    performance: {
      leadsAssigned: 67,
      leadsQualified: 45,
      leadsConverted: 19,
      totalRevenue: 985000,
      avgResponseTime: 18,
      avgDealSize: 51842,
      conversionRate: 28.4,
      customerRating: 4.5,
      productivity: 82,
      goalsAchieved: 95,
      lastActivity: new Date(2024, 0, 19),
      trend: 'stable',
      trendPercentage: 3.2
    },
    skills: [
      { name: 'Commercial Sales', level: 'intermediate', certified: false },
      { name: 'Technical Knowledge', level: 'advanced', certified: true },
      { name: 'Project Management', level: 'intermediate', certified: false }
    ],
    achievements: [],
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2024, 0, 19),
    lastLogin: new Date(2024, 0, 19, 13, 20)
  },
  {
    id: 'USER004',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1-555-0401',
    title: 'Junior Sales Agent',
    department: 'Sales',
    roleId: 'ROLE002',
    teamIds: ['TEAM001'],
    territories: ['Sacramento', 'Central Valley'],
    specializations: ['Residential Construction'],
    status: 'training',
    employmentType: 'full-time',
    startDate: new Date(2024, 0, 8),
    location: {
      office: 'Sacramento',
      remote: true,
      timezone: 'PST'
    },
    contact: {
      mobile: '+1-555-0401',
      preferredContact: 'sms'
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      workingHours: {
        start: '09:00',
        end: '17:00',
        timezone: 'PST'
      },
      language: 'English',
      theme: 'light'
    },
    performance: {
      leadsAssigned: 23,
      leadsQualified: 12,
      leadsConverted: 3,
      totalRevenue: 145000,
      avgResponseTime: 25,
      avgDealSize: 48333,
      conversionRate: 13.0,
      customerRating: 4.2,
      productivity: 65,
      goalsAchieved: 45,
      lastActivity: new Date(2024, 0, 20),
      trend: 'up',
      trendPercentage: 35.8
    },
    skills: [
      { name: 'Sales Basics', level: 'beginner', certified: false },
      { name: 'Customer Service', level: 'intermediate', certified: false },
      { name: 'CRM Software', level: 'beginner', certified: false }
    ],
    achievements: [],
    createdAt: new Date(2024, 0, 8),
    updatedAt: new Date(2024, 0, 20),
    lastLogin: new Date(2024, 0, 20, 11, 15)
  }
];

// Helper functions
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

function getTrendIcon(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up': return ArrowUpRight;
    case 'down': return ArrowDownRight;
    case 'stable': return Activity;
  }
}

function getTrendColor(trend: 'up' | 'down' | 'stable') {
  switch (trend) {
    case 'up': return 'text-emerald-600';
    case 'down': return 'text-red-600';
    case 'stable': return 'text-gray-600';
  }
}

function getStatusColor(status: UserProfile['status']) {
  switch (status) {
    case 'active': return 'text-emerald-600 bg-emerald-50';
    case 'inactive': return 'text-red-600 bg-red-50';
    case 'on-leave': return 'text-amber-600 bg-amber-50';
    case 'training': return 'text-blue-600 bg-blue-50';
  }
}

function getSkillLevelColor(level: string) {
  switch (level) {
    case 'expert': return 'text-purple-600 bg-purple-50';
    case 'advanced': return 'text-emerald-600 bg-emerald-50';
    case 'intermediate': return 'text-amber-600 bg-amber-50';
    case 'beginner': return 'text-red-600 bg-red-50';
  }
}

function getUserInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function UserCard({ user, role, onEdit, onView, onToggle, onDelete }: {
  user: UserProfile;
  role?: Role;
  onEdit: () => void;
  onView: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const TrendIcon = getTrendIcon(user.performance.trend);
  const initials = getUserInitials(user.firstName, user.lastName);

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              {user.avatar ? (
                <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="w-12 h-12 rounded-full" />
              ) : (
                initials
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getStatusColor(user.status))}
                >
                  {user.status}
                </Badge>
                {role && (
                  <Badge variant="secondary" className="text-xs">
                    {role.name}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{user.title}</p>
              <p className="text-sm text-gray-500 mb-2">{user.email}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{user.location.office}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Badge className="h-3 w-3" />
                  <span>{user.territories.length} territories</span>
                </div>
                {user.location.remote && (
                  <div className="flex items-center space-x-1">
                    <Laptop className="h-3 w-3" />
                    <span>Remote</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Key className="h-4 w-4 mr-2" />
                Permissions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggle}>
                {user.status === 'active' ? (
                  <>
                    <UserX className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold">{user.performance.leadsAssigned}</p>
            <p className="text-xs text-gray-500">Leads Assigned</p>
          </div>
          <div className="text-center p-3 border rounded-lg">
            <p className="text-lg font-bold text-green-600">{user.performance.conversionRate}%</p>
            <p className="text-xs text-gray-500">Conversion</p>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Revenue:</span>
            <span className="font-medium">{formatCurrency(user.performance.totalRevenue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg Deal Size:</span>
            <span className="font-medium">{formatCurrency(user.performance.avgDealSize)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Response Time:</span>
            <span className="font-medium">{user.performance.avgResponseTime}min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rating:</span>
            <span className="font-medium">{user.performance.customerRating}/5</span>
          </div>
        </div>
        
        {/* Productivity */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Productivity:</span>
            <span className="font-medium">{user.performance.productivity}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${user.performance.productivity}%` }}
            />
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className={cn("flex items-center space-x-2 text-sm", getTrendColor(user.performance.trend))}>
          <TrendIcon className="h-4 w-4" />
          <span>
            {user.performance.trend === 'up' ? '+' : user.performance.trend === 'down' ? '-' : ''}
            {Math.abs(user.performance.trendPercentage)}% trend
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamCard({ team, members, onEdit, onView, onManage }: {
  team: Team;
  members: UserProfile[];
  onEdit: () => void;
  onView: () => void;
  onManage: () => void;
}) {
  const conversionRate = team.performance.leadsAssigned > 0 
    ? (team.performance.leadsConverted / team.performance.leadsAssigned) * 100 
    : 0;

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-purple-500 text-white">
              <Users className="h-5 w-5" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{team.name}</h3>
                <Badge variant="secondary" className="text-xs capitalize">
                  {team.type}
                </Badge>
                {!team.isActive && (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    Inactive
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{team.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{members.length} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>{team.targets.leads} lead target</span>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Team
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onManage}>
                <Users className="h-4 w-4 mr-2" />
                Manage Members
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Target className="h-4 w-4 mr-2" />
                Set Targets
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Performance vs Targets */}
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Leads Progress</span>
              <span>{team.performance.leadsAssigned}/{team.targets.leads}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min((team.performance.leadsAssigned / team.targets.leads) * 100, 100)}%` }}
              />
            </div>
          </div>
          
          {team.type === 'sales' && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Revenue Progress</span>
                <span>{formatCurrency(team.performance.totalRevenue)}/{formatCurrency(team.targets.revenue)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${Math.min((team.performance.totalRevenue / team.targets.revenue) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-bold">{conversionRate.toFixed(1)}%</p>
            <p className="text-gray-500">Conversion</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-bold">{team.performance.avgResponseTime}min</p>
            <p className="text-gray-500">Response Time</p>
          </div>
        </div>
        
        {/* Team Stats */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Satisfaction:</span>
            <span className="font-medium">{team.performance.customerSatisfaction}/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Collaboration:</span>
            <span className="font-medium">{team.performance.teamCollaboration}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedTab, setSelectedTab] = useState('users');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddTeamDialog, setShowAddTeamDialog] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [teams, setTeams] = useState(mockTeams);
  const [roles] = useState(mockRoles);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = !searchQuery || 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = selectedRole === 'all' || user.roleId === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      const matchesTeam = selectedTeam === 'all' || user.teamIds.includes(selectedTeam);
      
      return matchesSearch && matchesRole && matchesStatus && matchesTeam;
    });
  }, [searchQuery, selectedRole, selectedStatus, selectedTeam, users]);

  const overallStats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalTeams = teams.length;
    const activeTeams = teams.filter(t => t.isActive).length;
    const totalRevenue = users.reduce((sum, u) => sum + u.performance.totalRevenue, 0);
    const avgProductivity = users.length > 0 
      ? users.reduce((sum, u) => sum + u.performance.productivity, 0) / users.length 
      : 0;
    const avgSatisfaction = users.length > 0 
      ? users.reduce((sum, u) => sum + u.performance.customerRating, 0) / users.length 
      : 0;
    
    return { totalUsers, activeUsers, totalTeams, activeTeams, totalRevenue, avgProductivity, avgSatisfaction };
  }, [users, teams]);

  const handleToggleUser = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { 
        ...u, 
        status: u.status === 'active' ? 'inactive' : 'active' 
      } : u
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Team Management</h1>
              <Badge variant="secondary">{filteredUsers.length} users</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              
              <Button onClick={() => setShowAddUserDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-2xl font-bold">{overallStats.totalUsers}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeUsers} active</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Teams</p>
                        <p className="text-2xl font-bold">{overallStats.totalTeams}</p>
                        <p className="text-xs text-gray-500">{overallStats.activeTeams} active</p>
                      </div>
                      <Building2 className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold">{formatCurrency(overallStats.totalRevenue)}</p>
                        <p className="text-xs text-gray-500">Team generated</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-emerald-500" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Avg Productivity</p>
                        <p className={cn("text-2xl font-bold", 
                          overallStats.avgProductivity > 85 ? "text-emerald-600" : 
                          overallStats.avgProductivity > 70 ? "text-amber-600" : "text-red-600"
                        )}>
                          {overallStats.avgProductivity.toFixed(0)}%
                        </p>
                        <p className="text-xs text-gray-500">Team average</p>
                      </div>
                      <Gauge className="h-8 w-8 text-amber-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Users Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => {
                  const role = roles.find(r => r.id === user.roleId);
                  return (
                    <UserCard
                      key={user.id}
                      user={user}
                      role={role}
                      onEdit={() => {}}
                      onView={() => {}}
                      onToggle={() => handleToggleUser(user.id)}
                      onDelete={() => handleDeleteUser(user.id)}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="teams" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Teams Overview</h2>
                <Button onClick={() => setShowAddTeamDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => {
                  const teamMembers = users.filter(u => u.teamIds.includes(team.id));
                  return (
                    <TeamCard
                      key={team.id}
                      team={team}
                      members={teamMembers}
                      onEdit={() => {}}
                      onView={() => {}}
                      onManage={() => {}}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Roles & Permissions</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => {
                  const roleUsers = users.filter(u => u.roleId === role.id);
                  return (
                    <Card key={role.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="p-2 rounded-lg text-white"
                              style={{ backgroundColor: role.color }}
                            >
                              <Crown className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-base">{role.name}</CardTitle>
                              <CardDescription>{role.description}</CardDescription>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="h-4 w-4 mr-2" />
                                Manage Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <span>Users with this role:</span>
                            <Badge variant="secondary">{roleUsers.length}</Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Permissions:</p>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 3).map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                              {role.permissions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{role.permissions.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Badge 
                            variant={role.isActive ? "default" : "secondary"}
                            className="w-fit"
                          >
                            {role.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Performance Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Leaderboard</CardTitle>
                  <CardDescription>Top performing team members by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users
                      .sort((a, b) => b.performance.totalRevenue - a.performance.totalRevenue)
                      .slice(0, 5)
                      .map((user, index) => {
                        const initials = getUserInitials(user.firstName, user.lastName);
                        return (
                          <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-medium">
                                {index + 1}
                              </div>
                              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-sm">
                                {initials}
                              </div>
                              <div>
                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-gray-500">{user.title}</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold text-emerald-600">
                                {formatCurrency(user.performance.totalRevenue)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {user.performance.conversionRate.toFixed(1)}% conversion
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Team Performance Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teams.map((team) => {
                        const conversionRate = team.performance.leadsAssigned > 0 
                          ? (team.performance.leadsConverted / team.performance.leadsAssigned) * 100 
                          : 0;
                        
                        return (
                          <div key={team.id} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">{team.name}</span>
                              <span className="text-sm">{conversionRate.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${Math.min(conversionRate, 100)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skills Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['expert', 'advanced', 'intermediate', 'beginner'].map((level) => {
                        const skillsAtLevel = users.flatMap(u => u.skills).filter(s => s.level === level);
                        const total = users.flatMap(u => u.skills).length;
                        const percentage = total > 0 ? (skillsAtLevel.length / total) * 100 : 0;
                        
                        return (
                          <div key={level} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{level}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12">
                                {skillsAtLevel.length}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Add User Dialog */}
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input placeholder="Smith" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="john.smith@company.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="+1-555-0100" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Sales Agent" />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input placeholder="Sales" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Team</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Employment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Office Location</Label>
                  <Input placeholder="San Francisco" />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <Label>Territories (comma-separated)</Label>
                <Input placeholder="California, Nevada" />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Remote Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Active</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddUserDialog(false)}>
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Team Dialog */}
        <Dialog open={showAddTeamDialog} onOpenChange={setShowAddTeamDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Team Name</Label>
                  <Input placeholder="Sales Team Beta" />
                </div>
                <div>
                  <Label>Team Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe the team's purpose and responsibilities..." />
              </div>
              
              <div>
                <Label>Team Manager</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.filter(u => u.status === 'active').map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} - {user.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Lead Target</Label>
                  <Input type="number" placeholder="500" />
                </div>
                <div>
                  <Label>Revenue Target</Label>
                  <Input type="number" placeholder="2500000" />
                </div>
                <div>
                  <Label>Conversion Target</Label>
                  <Input type="number" placeholder="125" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch />
                <Label>Active Team</Label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddTeamDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddTeamDialog(false)}>
                Create Team
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

export default TeamManagement;
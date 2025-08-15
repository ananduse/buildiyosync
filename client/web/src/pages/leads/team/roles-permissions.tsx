import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search,
  Filter,
  RefreshCw,
  Settings,
  Plus,
  Edit,
  Trash2,
  Copy,
  Save,
  X,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Unlock,
  Key,
  Users,
  User,
  UserCheck,
  UserX,
  Crown,
  Award,
  Star,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Database,
  FileText,
  Mail,
  Phone,
  Building,
  Calendar,
  Activity,
  BarChart3,
  Target,
  Zap,
  Globe,
  MapPin,
  Download,
  Upload,
  Archive,
  Trash,
  Briefcase,
  UserPlus,
  UserMinus,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  level: 'system' | 'admin' | 'manager' | 'user' | 'viewer';
  isDefault: boolean;
  isBuiltIn: boolean;
  userCount: number;
  permissions: Permission[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Permission {
  id: string;
  module: string;
  action: string;
  resource: string;
  scope: 'all' | 'team' | 'own' | 'none';
  conditions?: string[];
}

interface UserRoleAssignment {
  userId: string;
  userName: string;
  email: string;
  roleId: string;
  roleName: string;
  assignedBy: string;
  assignedAt: string;
  expiresAt?: string;
  isActive: boolean;
  lastLogin?: string;
}

interface PermissionGroup {
  name: string;
  description: string;
  permissions: {
    id: string;
    name: string;
    description: string;
    actions: string[];
    scopes: string[];
    isRequired?: boolean;
  }[];
}

const RolesPermissions: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['leads']));

  // Mock data for roles
  const roles: Role[] = [
    {
      id: 'role-001',
      name: 'System Administrator',
      description: 'Full system access with all administrative privileges',
      level: 'system',
      isDefault: false,
      isBuiltIn: true,
      userCount: 2,
      permissions: [
        { id: 'perm-001', module: 'system', action: 'manage', resource: '*', scope: 'all' },
        { id: 'perm-002', module: 'users', action: 'manage', resource: '*', scope: 'all' },
        { id: 'perm-003', module: 'roles', action: 'manage', resource: '*', scope: 'all' }
      ],
      createdBy: 'System',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 'role-002',
      name: 'Sales Manager',
      description: 'Manage sales team, leads, and reports with full access to sales operations',
      level: 'manager',
      isDefault: false,
      isBuiltIn: false,
      userCount: 5,
      permissions: [
        { id: 'perm-004', module: 'leads', action: 'read', resource: '*', scope: 'all' },
        { id: 'perm-005', module: 'leads', action: 'write', resource: '*', scope: 'team' },
        { id: 'perm-006', module: 'reports', action: 'read', resource: 'sales', scope: 'team' },
        { id: 'perm-007', module: 'users', action: 'read', resource: 'team', scope: 'team' }
      ],
      createdBy: 'admin@company.com',
      createdAt: '2023-06-15T10:00:00Z',
      updatedAt: '2024-01-10T14:30:00Z'
    },
    {
      id: 'role-003',
      name: 'Sales Representative',
      description: 'Access to assigned leads and basic sales operations',
      level: 'user',
      isDefault: true,
      isBuiltIn: false,
      userCount: 12,
      permissions: [
        { id: 'perm-008', module: 'leads', action: 'read', resource: 'assigned', scope: 'own' },
        { id: 'perm-009', module: 'leads', action: 'write', resource: 'assigned', scope: 'own' },
        { id: 'perm-010', module: 'activities', action: 'read', resource: 'own', scope: 'own' },
        { id: 'perm-011', module: 'activities', action: 'write', resource: 'own', scope: 'own' }
      ],
      createdBy: 'manager@company.com',
      createdAt: '2023-06-20T11:30:00Z',
      updatedAt: '2024-01-05T09:15:00Z'
    },
    {
      id: 'role-004',
      name: 'Marketing Analyst',
      description: 'Access to marketing data, campaigns, and analytics',
      level: 'user',
      isDefault: false,
      isBuiltIn: false,
      userCount: 3,
      permissions: [
        { id: 'perm-012', module: 'leads', action: 'read', resource: 'marketing', scope: 'all' },
        { id: 'perm-013', module: 'campaigns', action: 'read', resource: '*', scope: 'all' },
        { id: 'perm-014', module: 'campaigns', action: 'write', resource: 'own', scope: 'own' },
        { id: 'perm-015', module: 'analytics', action: 'read', resource: 'marketing', scope: 'all' }
      ],
      createdBy: 'marketing@company.com',
      createdAt: '2023-07-01T14:20:00Z',
      updatedAt: '2023-12-15T16:45:00Z'
    },
    {
      id: 'role-005',
      name: 'Data Analyst',
      description: 'Read-only access to data and reporting across all modules',
      level: 'viewer',
      isDefault: false,
      isBuiltIn: false,
      userCount: 4,
      permissions: [
        { id: 'perm-016', module: 'leads', action: 'read', resource: '*', scope: 'all' },
        { id: 'perm-017', module: 'reports', action: 'read', resource: '*', scope: 'all' },
        { id: 'perm-018', module: 'analytics', action: 'read', resource: '*', scope: 'all' },
        { id: 'perm-019', module: 'dashboards', action: 'read', resource: '*', scope: 'all' }
      ],
      createdBy: 'admin@company.com',
      createdAt: '2023-08-10T12:00:00Z',
      updatedAt: '2023-11-20T10:30:00Z'
    }
  ];

  // Mock data for user role assignments
  const userAssignments: UserRoleAssignment[] = [
    {
      userId: 'user-001',
      userName: 'John Admin',
      email: 'john@company.com',
      roleId: 'role-001',
      roleName: 'System Administrator',
      assignedBy: 'System',
      assignedAt: '2023-01-01T00:00:00Z',
      isActive: true,
      lastLogin: '2024-01-15T14:30:00Z'
    },
    {
      userId: 'user-002',
      userName: 'Sarah Manager',
      email: 'sarah@company.com',
      roleId: 'role-002',
      roleName: 'Sales Manager',
      assignedBy: 'john@company.com',
      assignedAt: '2023-06-15T10:00:00Z',
      isActive: true,
      lastLogin: '2024-01-15T16:20:00Z'
    },
    {
      userId: 'user-003',
      userName: 'Mike Sales',
      email: 'mike@company.com',
      roleId: 'role-003',
      roleName: 'Sales Representative',
      assignedBy: 'sarah@company.com',
      assignedAt: '2023-07-01T14:00:00Z',
      isActive: true,
      lastLogin: '2024-01-15T11:45:00Z'
    },
    {
      userId: 'user-004',
      userName: 'Lisa Marketing',
      email: 'lisa@company.com',
      roleId: 'role-004',
      roleName: 'Marketing Analyst',
      assignedBy: 'john@company.com',
      assignedAt: '2023-08-15T09:30:00Z',
      isActive: true,
      lastLogin: '2024-01-14T15:10:00Z'
    },
    {
      userId: 'user-005',
      userName: 'Alex Data',
      email: 'alex@company.com',
      roleId: 'role-005',
      roleName: 'Data Analyst',
      assignedBy: 'sarah@company.com',
      assignedAt: '2023-09-01T11:15:00Z',
      isActive: false,
      lastLogin: '2024-01-10T08:20:00Z'
    }
  ];

  // Permission groups configuration
  const permissionGroups: PermissionGroup[] = [
    {
      name: 'Leads Management',
      description: 'Access and manage lead data',
      permissions: [
        {
          id: 'leads-read',
          name: 'View Leads',
          description: 'View lead information and details',
          actions: ['read'],
          scopes: ['all', 'team', 'own'],
          isRequired: true
        },
        {
          id: 'leads-write',
          name: 'Edit Leads',
          description: 'Create, edit, and update lead information',
          actions: ['create', 'update'],
          scopes: ['all', 'team', 'own']
        },
        {
          id: 'leads-delete',
          name: 'Delete Leads',
          description: 'Delete leads and related data',
          actions: ['delete'],
          scopes: ['all', 'team', 'own']
        },
        {
          id: 'leads-assign',
          name: 'Assign Leads',
          description: 'Assign leads to team members',
          actions: ['assign'],
          scopes: ['all', 'team']
        }
      ]
    },
    {
      name: 'Analytics & Reports',
      description: 'Access to reporting and analytics',
      permissions: [
        {
          id: 'reports-read',
          name: 'View Reports',
          description: 'Access to standard and custom reports',
          actions: ['read'],
          scopes: ['all', 'team', 'own']
        },
        {
          id: 'reports-create',
          name: 'Create Reports',
          description: 'Build custom reports and dashboards',
          actions: ['create', 'update'],
          scopes: ['all', 'team']
        },
        {
          id: 'analytics-read',
          name: 'View Analytics',
          description: 'Access analytics dashboards and insights',
          actions: ['read'],
          scopes: ['all', 'team']
        },
        {
          id: 'data-export',
          name: 'Export Data',
          description: 'Export data and reports',
          actions: ['export'],
          scopes: ['all', 'team', 'own']
        }
      ]
    },
    {
      name: 'User Management',
      description: 'Manage users and team members',
      permissions: [
        {
          id: 'users-read',
          name: 'View Users',
          description: 'View user profiles and information',
          actions: ['read'],
          scopes: ['all', 'team']
        },
        {
          id: 'users-write',
          name: 'Manage Users',
          description: 'Create, edit, and deactivate users',
          actions: ['create', 'update', 'deactivate'],
          scopes: ['all', 'team']
        },
        {
          id: 'roles-manage',
          name: 'Manage Roles',
          description: 'Create and modify user roles',
          actions: ['create', 'update', 'delete'],
          scopes: ['all']
        }
      ]
    },
    {
      name: 'System Administration',
      description: 'System configuration and administration',
      permissions: [
        {
          id: 'system-config',
          name: 'System Configuration',
          description: 'Access system settings and configuration',
          actions: ['read', 'update'],
          scopes: ['all']
        },
        {
          id: 'system-logs',
          name: 'System Logs',
          description: 'View system logs and audit trails',
          actions: ['read'],
          scopes: ['all']
        },
        {
          id: 'system-backup',
          name: 'Data Backup',
          description: 'Manage data backups and recovery',
          actions: ['create', 'read', 'restore'],
          scopes: ['all']
        }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'system': return 'text-red-600 bg-red-50';
      case 'admin': return 'text-purple-600 bg-purple-50';
      case 'manager': return 'text-blue-600 bg-blue-50';
      case 'user': return 'text-green-600 bg-green-50';
      case 'viewer': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'system': return Crown;
      case 'admin': return ShieldCheck;
      case 'manager': return Award;
      case 'user': return User;
      case 'viewer': return Eye;
      default: return User;
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'all': return 'text-red-600 bg-red-100';
      case 'team': return 'text-blue-600 bg-blue-100';
      case 'own': return 'text-green-600 bg-green-100';
      case 'none': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleGroupExpansion = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  const createRole = () => {
    console.log('Creating new role');
  };

  const editRole = (roleId: string) => {
    console.log(`Editing role: ${roleId}`);
  };

  const deleteRole = (roleId: string) => {
    console.log(`Deleting role: ${roleId}`);
  };

  const duplicateRole = (roleId: string) => {
    console.log(`Duplicating role: ${roleId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="assignments">User Assignments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-6">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Roles List */}
          <div className="space-y-4">
            {filteredRoles.map((role) => {
              const LevelIcon = getLevelIcon(role.level);
              
              return (
                <Card key={role.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 rounded-lg bg-gray-50">
                          <LevelIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{role.name}</h3>
                            <Badge className={getLevelColor(role.level)}>
                              {role.level}
                            </Badge>
                            {role.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                            {role.isBuiltIn && (
                              <Badge variant="outline" className="text-xs">Built-in</Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">{role.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Users</p>
                              <p className="font-medium">{role.userCount}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Permissions</p>
                              <p className="font-medium">{role.permissions.length}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Created</p>
                              <p className="font-medium">{new Date(role.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Updated</p>
                              <p className="font-medium">{new Date(role.updatedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map(permission => (
                              <Badge key={permission.id} variant="outline" className="text-xs">
                                {permission.module}:{permission.action}
                              </Badge>
                            ))}
                            {role.permissions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{role.permissions.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created by: {role.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editRole(role.id)}
                          disabled={role.isBuiltIn}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => duplicateRole(role.id)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteRole(role.id)}
                          disabled={role.isBuiltIn || role.userCount > 0}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>Configure permissions by module and scope</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        onClick={() => toggleGroupExpansion(group.name)}
                        className="flex items-center gap-2 p-0 h-auto"
                      >
                        {expandedGroups.has(group.name) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    
                    {expandedGroups.has(group.name) && (
                      <div className="ml-6 space-y-4">
                        {group.permissions.map((permission) => (
                          <div key={permission.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{permission.name}</h4>
                                  {permission.isRequired && (
                                    <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                                      Required
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{permission.description}</p>
                                
                                <div className="flex items-center gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Actions: </span>
                                    <div className="inline-flex gap-1">
                                      {permission.actions.map(action => (
                                        <Badge key={action} variant="outline" className="text-xs">
                                          {action}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Scopes: </span>
                                    <div className="inline-flex gap-1">
                                      {permission.scopes.map(scope => (
                                        <Badge key={scope} className={`text-xs ${getScopeColor(scope)}`}>
                                          {scope}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Role Assignments</CardTitle>
              <CardDescription>Manage user role assignments and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">User</th>
                      <th className="text-left py-3 px-4 font-medium">Role</th>
                      <th className="text-left py-3 px-4 font-medium">Assigned By</th>
                      <th className="text-left py-3 px-4 font-medium">Assigned Date</th>
                      <th className="text-left py-3 px-4 font-medium">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAssignments.map((assignment) => {
                      const role = roles.find(r => r.id === assignment.roleId);
                      const LevelIcon = role ? getLevelIcon(role.level) : User;
                      
                      return (
                        <tr key={assignment.userId} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{assignment.userName}</p>
                                <p className="text-sm text-muted-foreground">{assignment.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <LevelIcon className="h-4 w-4 text-gray-600" />
                              <span>{assignment.roleName}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{assignment.assignedBy}</td>
                          <td className="py-3 px-4">
                            {new Date(assignment.assignedAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            {assignment.lastLogin ? 
                              new Date(assignment.lastLogin).toLocaleDateString() : 
                              'Never'
                            }
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={assignment.isActive ? 'default' : 'secondary'}>
                              {assignment.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <UserX className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Settings</CardTitle>
                <CardDescription>Configure role management behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Allow role inheritance</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require approval for role changes</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Enable role expiration</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Default user role</Label>
                  <Select defaultValue="role-003">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Maximum roles per user</Label>
                  <Input type="number" defaultValue="3" min="1" max="10" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and audit settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Log permission changes</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Require MFA for admin roles</Label>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label>Session timeout for elevated roles</Label>
                  <Switch />
                </div>
                
                <div className="space-y-2">
                  <Label>Permission audit retention (days)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
                
                <div className="space-y-2">
                  <Label>Notification recipients</Label>
                  <Input placeholder="security@company.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RolesPermissions;
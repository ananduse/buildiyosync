import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { 
  FormInput,
  Plus,
  BarChart3,
  Database,
  Settings,
  FileText as FileTemplate,
  Layers,
  TestTube,
  Webhook,
  GitBranch,
  Edit,
  Eye,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const FormsOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms Management</h1>
          <p className="text-gray-600 mt-1">
            Create, manage, and analyze your lead generation forms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/leads/forms/templates">
            <Button variant="outline">
              <FileTemplate className="h-4 w-4 mr-2" />
              Browse Templates
            </Button>
          </Link>
          <Link to="/leads/forms/builder/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FormInput className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              67% of total forms
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/leads/forms/builder">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Edit className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Form Builder</CardTitle>
                  <p className="text-sm text-gray-600">Create and customize forms</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/leads/forms/templates">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileTemplate className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Templates</CardTitle>
                  <p className="text-sm text-gray-600">50+ pre-built templates</p>
                  <Badge className="mt-1 text-xs">Popular</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/leads/forms/analytics">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                  <p className="text-sm text-gray-600">Track performance metrics</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/leads/forms/multi-step">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Layers className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Multi-Step Forms</CardTitle>
                  <p className="text-sm text-gray-600">Advanced form workflows</p>
                  <Badge className="mt-1 text-xs bg-green-100 text-green-800">NEW</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/leads/forms/ab-testing">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <TestTube className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">A/B Testing</CardTitle>
                  <p className="text-sm text-gray-600">Test form variations</p>
                  <Badge className="mt-1 text-xs bg-purple-100 text-purple-800">PRO</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/leads/forms/integrations">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Webhook className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Integrations</CardTitle>
                  <p className="text-sm text-gray-600">Connect to external services</p>
                  <Badge className="mt-1 text-xs">20+ integrations</Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Recent Forms */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Forms</CardTitle>
            <Link to="/leads/forms/list">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'Construction Lead Form',
                status: 'active',
                submissions: 45,
                conversion: '32%',
                lastUpdated: '2 hours ago',
                icon: FormInput
              },
              {
                name: 'Contact Us Form',
                status: 'active', 
                submissions: 23,
                conversion: '28%',
                lastUpdated: '1 day ago',
                icon: FormInput
              },
              {
                name: 'Service Quote Request',
                status: 'draft',
                submissions: 0,
                conversion: '0%',
                lastUpdated: '3 days ago',
                icon: FormInput
              }
            ].map((form, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <form.icon className="h-5 w-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium">{form.name}</h3>
                    <p className="text-sm text-gray-600">Last updated {form.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{form.submissions}</p>
                    <p className="text-gray-600">Submissions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{form.conversion}</p>
                    <p className="text-gray-600">Conversion</p>
                  </div>
                  <Badge 
                    variant={form.status === 'active' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {form.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormsOverview;
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Type,
  Mail,
  Phone,
  Hash,
  Calendar,
  FileText,
  CheckSquare,
  Circle,
  List,
  Upload,
  Link,
  Star,
  MapPin,
  CreditCard,
  Globe,
  Plus,
  Settings,
  Code,
  Palette,
  Shield
} from 'lucide-react';

const FormFields: React.FC = () => {
  const fieldCategories = [
    {
      name: 'Basic Fields',
      fields: [
        { icon: Type, label: 'Text Field', type: 'text', description: 'Single line text input' },
        { icon: FileText, label: 'Textarea', type: 'textarea', description: 'Multi-line text input' },
        { icon: Mail, label: 'Email', type: 'email', description: 'Email address input' },
        { icon: Phone, label: 'Phone', type: 'phone', description: 'Phone number input' },
        { icon: Hash, label: 'Number', type: 'number', description: 'Numeric input' },
      ]
    },
    {
      name: 'Choice Fields',
      fields: [
        { icon: List, label: 'Dropdown', type: 'select', description: 'Single selection dropdown' },
        { icon: CheckSquare, label: 'Checkbox', type: 'checkbox', description: 'Multiple choice options' },
        { icon: Circle, label: 'Radio', type: 'radio', description: 'Single choice from options' },
        { icon: Star, label: 'Rating', type: 'rating', description: 'Star rating input' },
      ]
    },
    {
      name: 'Advanced Fields',
      fields: [
        { icon: Calendar, label: 'Date Picker', type: 'date', description: 'Date selection' },
        { icon: Upload, label: 'File Upload', type: 'file', description: 'File attachment' },
        { icon: Link, label: 'URL', type: 'url', description: 'Website URL input' },
        { icon: MapPin, label: 'Address', type: 'address', description: 'Complete address input' },
        { icon: CreditCard, label: 'Payment', type: 'payment', description: 'Payment collection' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Form Fields Library</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive collection of form field types for your forms
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Fields</TabsTrigger>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="choice">Choice</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {fieldCategories.map((category) => (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    Essential form fields for collecting user information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.fields.map((field) => {
                      const Icon = field.icon;
                      return (
                        <div
                          key={field.type}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{field.label}</h4>
                              <p className="text-sm text-gray-600 mt-1">{field.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {field.type}
                                </Badge>
                                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Input Fields</CardTitle>
                <CardDescription>
                  Standard form fields for text and data input
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Text Fields
                    </h3>
                    <div className="space-y-3 pl-6">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Short Text</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Long Text</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Rich Text Editor</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Numeric Fields
                    </h3>
                    <div className="space-y-3 pl-6">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Integer</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Decimal</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <span>Currency</span>
                        <Button size="sm" variant="outline">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="choice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Selection Fields</CardTitle>
                <CardDescription>
                  Fields for choosing from predefined options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Single Selection</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                        <span>Radio Buttons</span>
                        <Badge>Popular</Badge>
                      </div>
                      <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                        <span>Dropdown Menu</span>
                        <Badge>Recommended</Badge>
                      </div>
                      <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                        <span>Button Group</span>
                        <Badge variant="outline">New</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-3">Multiple Selection</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                        <span>Checkboxes</span>
                        <Badge>Popular</Badge>
                      </div>
                      <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                        <span>Multi-select Dropdown</span>
                        <Badge variant="outline">Advanced</Badge>
                      </div>
                      <div className="p-3 bg-gray-50 rounded flex items-center justify-between">
                        <span>Tag Input</span>
                        <Badge variant="outline">New</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Field Types</CardTitle>
                <CardDescription>
                  Specialized fields for complex data collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border-2 border-dashed rounded-lg text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium">File Upload</h4>
                    <p className="text-sm text-gray-600 mt-1">Accept documents, images, etc.</p>
                    <Button size="sm" className="mt-3">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>

                  <div className="p-4 border-2 border-dashed rounded-lg text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium">Location Picker</h4>
                    <p className="text-sm text-gray-600 mt-1">Address with map integration</p>
                    <Button size="sm" className="mt-3">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>

                  <div className="p-4 border-2 border-dashed rounded-lg text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <h4 className="font-medium">Payment Field</h4>
                    <p className="text-sm text-gray-600 mt-1">Secure payment collection</p>
                    <Button size="sm" className="mt-3">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Custom Field Builder</CardTitle>
                <CardDescription>
                  Create your own custom field types with advanced configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Code className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Build Custom Fields</h3>
                  <p className="text-gray-600 mb-4">
                    Design and implement custom field types tailored to your specific needs
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Field
                    </Button>
                    <Button variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      Browse Templates
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Field Configuration Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Validation Rules</p>
                  <p className="text-sm text-gray-600">Required, patterns, limits</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Styling Options</p>
                  <p className="text-sm text-gray-600">Colors, sizes, layouts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Advanced Logic</p>
                  <p className="text-sm text-gray-600">Conditions, calculations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormFields;
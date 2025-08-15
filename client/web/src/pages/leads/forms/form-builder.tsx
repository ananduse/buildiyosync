import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  FormInput,
  Plus,
  Trash2,
  Copy,
  Save,
  Eye,
  Code,
  Settings,
  Move,
  GripVertical,
  Mail,
  Phone,
  User,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  CheckSquare,
  Circle,
  ToggleLeft,
  Star,
  Hash,
  Link,
  Image as ImageIcon,
  Upload,
  Download,
  Send,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Paintbrush,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  ArrowUp,
  ArrowDown,
  Edit,
  RefreshCw,
  BarChart3,
  Target,
  MousePointer,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number' | 'file' | 'hidden';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: string;
  };
  options?: { label: string; value: string }[];
  conditional?: {
    dependsOn: string;
    showWhen: string;
  };
  style?: {
    width: 'full' | 'half' | 'third' | 'quarter';
    cssClass?: string;
  };
}

interface FormSettings {
  name: string;
  description: string;
  successMessage: string;
  redirectUrl?: string;
  emailNotifications: {
    enabled: boolean;
    recipients: string[];
    template: string;
  };
  integrations: {
    webhook?: {
      url: string;
      headers?: Record<string, string>;
    };
    crm?: {
      provider: string;
      mapping: Record<string, string>;
    };
    email?: {
      provider: string;
      listId?: string;
    };
  };
  styling: {
    theme: 'default' | 'modern' | 'minimal' | 'professional';
    primaryColor: string;
    fontFamily: string;
    customCSS?: string;
  };
  behavior: {
    showProgressBar: boolean;
    enableMultiStep: boolean;
    enableSaveProgress: boolean;
    enableSpamProtection: boolean;
    captchaEnabled: boolean;
  };
}

interface FormAnalytics {
  views: number;
  submissions: number;
  conversionRate: number;
  avgCompletionTime: number;
  fieldAnalytics: Record<string, {
    abandonment: number;
    errors: number;
  }>;
  sourceAnalytics: Record<string, number>;
}

const FormBuilder: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('builder');
  const [form, setForm] = useState<FormSettings>({
    name: 'Lead Capture Form',
    description: 'Capture high-quality leads from your website',
    successMessage: 'Thank you for your interest! We will contact you soon.',
    emailNotifications: {
      enabled: true,
      recipients: ['leads@company.com'],
      template: 'default'
    },
    integrations: {},
    styling: {
      theme: 'modern',
      primaryColor: '#3b82f6',
      fontFamily: 'Inter'
    },
    behavior: {
      showProgressBar: true,
      enableMultiStep: false,
      enableSaveProgress: true,
      enableSpamProtection: true,
      captchaEnabled: true
    }
  });

  const [fields, setFields] = useState<FormField[]>([
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      style: { width: 'full' }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      validation: { pattern: '^[^@]+@[^@]+\.[^@]+$' },
      style: { width: 'half' }
    },
    {
      id: 'phone',
      type: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      required: false,
      style: { width: 'half' }
    },
    {
      id: 'company',
      type: 'text',
      label: 'Company Name',
      placeholder: 'Enter your company name',
      required: true,
      style: { width: 'full' }
    },
    {
      id: 'project_type',
      type: 'select',
      label: 'Project Type',
      required: true,
      options: [
        { label: 'Residential Building', value: 'residential' },
        { label: 'Commercial Building', value: 'commercial' },
        { label: 'Industrial Facility', value: 'industrial' },
        { label: 'Renovation', value: 'renovation' }
      ],
      style: { width: 'half' }
    },
    {
      id: 'budget',
      type: 'select',
      label: 'Budget Range',
      required: true,
      options: [
        { label: 'Under $50,000', value: 'under_50k' },
        { label: '$50,000 - $100,000', value: '50k_100k' },
        { label: '$100,000 - $250,000', value: '100k_250k' },
        { label: '$250,000 - $500,000', value: '250k_500k' },
        { label: 'Over $500,000', value: 'over_500k' }
      ],
      style: { width: 'half' }
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Project Details',
      placeholder: 'Tell us about your project requirements...',
      required: false,
      validation: { maxLength: 1000 },
      style: { width: 'full' }
    }
  ]);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Mock analytics data
  const analytics: FormAnalytics = {
    views: 12456,
    submissions: 1834,
    conversionRate: 14.7,
    avgCompletionTime: 145,
    fieldAnalytics: {
      'name': { abandonment: 5.2, errors: 2.1 },
      'email': { abandonment: 8.7, errors: 12.3 },
      'phone': { abandonment: 15.4, errors: 8.9 },
      'company': { abandonment: 12.1, errors: 3.2 },
      'project_type': { abandonment: 18.9, errors: 1.5 },
      'budget': { abandonment: 25.6, errors: 2.8 },
      'message': { abandonment: 35.2, errors: 0.9 }
    },
    sourceAnalytics: {
      'Direct': 45.2,
      'Google Ads': 23.8,
      'Social Media': 18.7,
      'Email Campaign': 8.9,
      'Referral': 3.4
    }
  };

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'phone', label: 'Phone', icon: Phone },
    { type: 'textarea', label: 'Text Area', icon: FileText },
    { type: 'select', label: 'Dropdown', icon: List },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'radio', label: 'Radio Button', icon: Circle },
    { type: 'date', label: 'Date', icon: Calendar },
    { type: 'number', label: 'Number', icon: Hash },
    { type: 'file', label: 'File Upload', icon: Upload }
  ];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newFields = Array.from(fields);
    const [reorderedItem] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, reorderedItem);

    setFields(newFields);
  };

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type} Field`,
      required: false,
      style: { width: 'full' }
    };

    if (type === 'select' || type === 'radio') {
      newField.options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ];
    }

    setFields([...fields, newField]);
    setSelectedField(newField.id);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const deleteField = (fieldId: string) => {
    setFields(fields.filter(field => field.id !== fieldId));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  };

  const generateEmbedCode = () => {
    return `<!-- Buildiyo Lead Form -->
<div id="buildiyo-form-container"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://forms.buildiyo.com/embed.js';
    script.setAttribute('data-form-id', 'form_${Date.now()}');
    script.setAttribute('data-theme', '${form.styling.theme}');
    script.setAttribute('data-color', '${form.styling.primaryColor}');
    document.head.appendChild(script);
  })();
</script>`;
  };

  const generateAPICode = () => {
    return `// API Integration Example
const submitLead = async (formData) => {
  const response = await fetch('https://api.buildiyo.com/v1/forms/form_${Date.now()}/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(formData)
  });
  
  return response.json();
};

// Usage
submitLead({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  company: 'Acme Corp',
  project_type: 'commercial',
  budget: '100k_250k',
  message: 'Looking for office building construction'
});`;
  };

  const renderFieldPreview = (field: FormField) => {
    const widthClass = {
      'full': 'w-full',
      'half': 'w-1/2',
      'third': 'w-1/3',
      'quarter': 'w-1/4'
    }[field.style?.width || 'full'];

    const baseClasses = `${widthClass} p-2`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <div className={baseClasses}>
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className="mt-1"
              style={{ borderColor: form.styling.primaryColor }}
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className={baseClasses}>
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              placeholder={field.placeholder}
              className="mt-1 min-h-[100px]"
              style={{ borderColor: form.styling.primaryColor }}
            />
          </div>
        );
      
      case 'select':
        return (
          <div className={baseClasses}>
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select>
              <SelectTrigger className="mt-1" style={{ borderColor: form.styling.primaryColor }}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'checkbox':
        return (
          <div className={baseClasses}>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                style={{ accentColor: form.styling.primaryColor }}
              />
              <Label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            </div>
          </div>
        );
      
      case 'radio':
        return (
          <div className={baseClasses}>
            <Label className="text-sm font-medium mb-2 block">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    style={{ accentColor: form.styling.primaryColor }}
                  />
                  <Label className="text-sm">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className={baseClasses}>
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              type={field.type}
              placeholder={field.placeholder}
              className="mt-1"
              style={{ borderColor: form.styling.primaryColor }}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Form Builder</h1>
            <p className="text-muted-foreground mt-2">
              Create powerful lead capture forms with advanced integrations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Auto Save
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save & Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Field Types */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Form Elements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {fieldTypes.map((fieldType) => {
                    const Icon = fieldType.icon;
                    return (
                      <Button
                        key={fieldType.type}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => addField(fieldType.type as FormField['type'])}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {fieldType.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Field Settings */}
            {selectedField && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-base">Field Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const field = fields.find(f => f.id === selectedField);
                    if (!field) return null;

                    return (
                      <div className="space-y-4">
                        <div>
                          <Label>Field Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label>Placeholder</Label>
                          <Input
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Required Field</Label>
                          <Switch
                            checked={field.required}
                            onCheckedChange={(required) => updateField(field.id, { required })}
                          />
                        </div>

                        <div>
                          <Label>Field Width</Label>
                          <Select
                            value={field.style?.width || 'full'}
                            onValueChange={(width) => updateField(field.id, { 
                              style: { ...field.style, width: width as any } 
                            })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full">Full Width</SelectItem>
                              <SelectItem value="half">Half Width</SelectItem>
                              <SelectItem value="third">One Third</SelectItem>
                              <SelectItem value="quarter">One Quarter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {(field.type === 'select' || field.type === 'radio') && (
                          <div>
                            <Label>Options</Label>
                            <div className="space-y-2 mt-1">
                              {field.options?.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Input
                                    value={option.label}
                                    onChange={(e) => {
                                      const newOptions = [...(field.options || [])];
                                      newOptions[index] = { ...option, label: e.target.value };
                                      updateField(field.id, { options: newOptions });
                                    }}
                                    placeholder="Option label"
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      const newOptions = field.options?.filter((_, i) => i !== index);
                                      updateField(field.id, { options: newOptions });
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const newOptions = [...(field.options || []), { 
                                    label: `Option ${(field.options?.length || 0) + 1}`, 
                                    value: `option${(field.options?.length || 0) + 1}` 
                                  }];
                                  updateField(field.id, { options: newOptions });
                                }}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Option
                              </Button>
                            </div>
                          </div>
                        )}

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteField(field.id)}
                          className="w-full"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete Field
                        </Button>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="embed">Embed Code</TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Form Preview</CardTitle>
                        <CardDescription>Drag and drop to reorder fields</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={previewMode === 'desktop' ? 'default' : 'outline'}
                          onClick={() => setPreviewMode('desktop')}
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={previewMode === 'tablet' ? 'default' : 'outline'}
                          onClick={() => setPreviewMode('tablet')}
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={previewMode === 'mobile' ? 'default' : 'outline'}
                          onClick={() => setPreviewMode('mobile')}
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`mx-auto bg-white rounded-lg border shadow-sm p-6 ${
                      previewMode === 'mobile' ? 'max-w-sm' : 
                      previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-4xl'
                    }`}>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold" style={{ color: form.styling.primaryColor }}>
                          {form.name}
                        </h2>
                        <p className="text-gray-600 mt-2">{form.description}</p>
                      </div>

                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="form-fields">
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-2"
                            >
                              <div className="flex flex-wrap -mx-2">
                                {fields.map((field, index) => (
                                  <Draggable key={field.id} draggableId={field.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={`${snapshot.isDragging ? 'opacity-75' : ''} ${
                                          selectedField === field.id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                                        } relative group`}
                                        onClick={() => setSelectedField(field.id)}
                                      >
                                        <div
                                          {...provided.dragHandleProps}
                                          className="absolute left-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-move"
                                        >
                                          <GripVertical className="h-4 w-4 text-gray-400" />
                                        </div>
                                        {renderFieldPreview(field)}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>

                      <div className="mt-6 pt-6 border-t">
                        <Button 
                          className="w-full" 
                          style={{ backgroundColor: form.styling.primaryColor }}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Submit Form
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Form Name</Label>
                        <Input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Success Message</Label>
                        <Textarea
                          value={form.successMessage}
                          onChange={(e) => setForm({ ...form, successMessage: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Redirect URL (Optional)</Label>
                        <Input
                          value={form.redirectUrl || ''}
                          onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })}
                          placeholder="https://example.com/thank-you"
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Styling</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Theme</Label>
                        <Select
                          value={form.styling.theme}
                          onValueChange={(theme) => setForm({
                            ...form,
                            styling: { ...form.styling, theme: theme as any }
                          })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Primary Color</Label>
                        <Input
                          type="color"
                          value={form.styling.primaryColor}
                          onChange={(e) => setForm({
                            ...form,
                            styling: { ...form.styling, primaryColor: e.target.value }
                          })}
                          className="mt-1 h-10"
                        />
                      </div>
                      <div>
                        <Label>Font Family</Label>
                        <Select
                          value={form.styling.fontFamily}
                          onValueChange={(fontFamily) => setForm({
                            ...form,
                            styling: { ...form.styling, fontFamily }
                          })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Custom CSS</Label>
                        <Textarea
                          value={form.styling.customCSS || ''}
                          onChange={(e) => setForm({
                            ...form,
                            styling: { ...form.styling, customCSS: e.target.value }
                          })}
                          placeholder="/* Custom CSS */&#10;.form-container { ... }"
                          className="mt-1 font-mono text-sm"
                          rows={6}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Behavior Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Show Progress Bar</Label>
                          <p className="text-sm text-muted-foreground">Display form completion progress</p>
                        </div>
                        <Switch
                          checked={form.behavior.showProgressBar}
                          onCheckedChange={(showProgressBar) => setForm({
                            ...form,
                            behavior: { ...form.behavior, showProgressBar }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enable Multi-Step</Label>
                          <p className="text-sm text-muted-foreground">Split form into multiple steps</p>
                        </div>
                        <Switch
                          checked={form.behavior.enableMultiStep}
                          onCheckedChange={(enableMultiStep) => setForm({
                            ...form,
                            behavior: { ...form.behavior, enableMultiStep }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Save Progress</Label>
                          <p className="text-sm text-muted-foreground">Allow users to save and resume later</p>
                        </div>
                        <Switch
                          checked={form.behavior.enableSaveProgress}
                          onCheckedChange={(enableSaveProgress) => setForm({
                            ...form,
                            behavior: { ...form.behavior, enableSaveProgress }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Spam Protection</Label>
                          <p className="text-sm text-muted-foreground">Enable honeypot and rate limiting</p>
                        </div>
                        <Switch
                          checked={form.behavior.enableSpamProtection}
                          onCheckedChange={(enableSpamProtection) => setForm({
                            ...form,
                            behavior: { ...form.behavior, enableSpamProtection }
                          })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>CAPTCHA</Label>
                          <p className="text-sm text-muted-foreground">Require CAPTCHA verification</p>
                        </div>
                        <Switch
                          checked={form.behavior.captchaEnabled}
                          onCheckedChange={(captchaEnabled) => setForm({
                            ...form,
                            behavior: { ...form.behavior, captchaEnabled }
                          })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Enable Notifications</Label>
                        <Switch
                          checked={form.emailNotifications.enabled}
                          onCheckedChange={(enabled) => setForm({
                            ...form,
                            emailNotifications: { ...form.emailNotifications, enabled }
                          })}
                        />
                      </div>
                      {form.emailNotifications.enabled && (
                        <>
                          <div>
                            <Label>Recipients</Label>
                            <Input
                              value={form.emailNotifications.recipients.join(', ')}
                              onChange={(e) => setForm({
                                ...form,
                                emailNotifications: {
                                  ...form.emailNotifications,
                                  recipients: e.target.value.split(',').map(email => email.trim())
                                }
                              })}
                              placeholder="email1@example.com, email2@example.com"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Email Template</Label>
                            <Select
                              value={form.emailNotifications.template}
                              onValueChange={(template) => setForm({
                                ...form,
                                emailNotifications: { ...form.emailNotifications, template }
                              })}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="default">Default Template</SelectItem>
                                <SelectItem value="detailed">Detailed Template</SelectItem>
                                <SelectItem value="minimal">Minimal Template</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Webhook Integration
                      </CardTitle>
                      <CardDescription>
                        Send form submissions to any URL endpoint
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Webhook URL</Label>
                        <Input
                          value={form.integrations.webhook?.url || ''}
                          onChange={(e) => setForm({
                            ...form,
                            integrations: {
                              ...form.integrations,
                              webhook: { ...form.integrations.webhook, url: e.target.value }
                            }
                          })}
                          placeholder="https://api.example.com/webhook"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Custom Headers</Label>
                        <Textarea
                          placeholder='{"Authorization": "Bearer token", "Custom-Header": "value"}'
                          className="mt-1 font-mono text-sm"
                          rows={3}
                        />
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Test Webhook
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        CRM Integration
                      </CardTitle>
                      <CardDescription>
                        Connect with popular CRM systems
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>CRM Provider</Label>
                        <Select
                          value={form.integrations.crm?.provider || ''}
                          onValueChange={(provider) => setForm({
                            ...form,
                            integrations: {
                              ...form.integrations,
                              crm: { ...form.integrations.crm, provider }
                            }
                          })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select CRM" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hubspot">HubSpot</SelectItem>
                            <SelectItem value="salesforce">Salesforce</SelectItem>
                            <SelectItem value="pipedrive">Pipedrive</SelectItem>
                            <SelectItem value="zoho">Zoho CRM</SelectItem>
                            <SelectItem value="monday">Monday.com</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Field Mapping</Label>
                        <div className="mt-1 p-3 border rounded-md bg-gray-50">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Form Field</span>
                              <span>CRM Field</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>name</span>
                              <span>→ contact.name</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>email</span>
                              <span>→ contact.email</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>company</span>
                              <span>→ company.name</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Link className="h-4 w-4 mr-2" />
                        Configure Mapping
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Marketing
                      </CardTitle>
                      <CardDescription>
                        Add leads to email marketing lists
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Email Provider</Label>
                        <Select
                          value={form.integrations.email?.provider || ''}
                          onValueChange={(provider) => setForm({
                            ...form,
                            integrations: {
                              ...form.integrations,
                              email: { ...form.integrations.email, provider }
                            }
                          })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mailchimp">Mailchimp</SelectItem>
                            <SelectItem value="convertkit">ConvertKit</SelectItem>
                            <SelectItem value="mailgun">Mailgun</SelectItem>
                            <SelectItem value="sendgrid">SendGrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Email List</Label>
                        <Input
                          value={form.integrations.email?.listId || ''}
                          onChange={(e) => setForm({
                            ...form,
                            integrations: {
                              ...form.integrations,
                              email: { ...form.integrations.email, listId: e.target.value }
                            }
                          })}
                          placeholder="List ID or name"
                          className="mt-1"
                        />
                      </div>
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Sync Lists
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Analytics Integration
                      </CardTitle>
                      <CardDescription>
                        Track form performance and conversions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Google Analytics</Label>
                          <p className="text-sm text-muted-foreground">Track form submissions as goals</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Facebook Pixel</Label>
                          <p className="text-sm text-muted-foreground">Track conversions for ads</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Google Ads Conversion</Label>
                          <p className="text-sm text-muted-foreground">Track Google Ads performance</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Views</p>
                          <p className="text-2xl font-bold">{analytics.views.toLocaleString()}</p>
                        </div>
                        <Eye className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Submissions</p>
                          <p className="text-2xl font-bold">{analytics.submissions.toLocaleString()}</p>
                        </div>
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-2xl font-bold">{analytics.conversionRate}%</p>
                        </div>
                        <Target className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Time</p>
                          <p className="text-2xl font-bold">{analytics.avgCompletionTime}s</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Field Performance</CardTitle>
                      <CardDescription>Abandonment and error rates by field</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(analytics.fieldAnalytics).map(([fieldId, stats]) => {
                          const field = fields.find(f => f.id === fieldId);
                          return (
                            <div key={fieldId}>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">
                                  {field?.label || fieldId}
                                </span>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>{stats.abandonment}% abandon</span>
                                  <span>{stats.errors}% errors</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <div 
                                  className="h-2 bg-red-200 rounded-l" 
                                  style={{ width: `${stats.abandonment}%` }}
                                />
                                <div 
                                  className="h-2 bg-yellow-200" 
                                  style={{ width: `${stats.errors}%` }}
                                />
                                <div 
                                  className="h-2 bg-green-200 rounded-r" 
                                  style={{ width: `${100 - stats.abandonment - stats.errors}%` }}
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
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Where your form visitors come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(analytics.sourceAnalytics).map(([source, percentage]) => (
                          <div key={source} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{source}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12 text-right">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="embed" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        Embed Code
                      </CardTitle>
                      <CardDescription>
                        Copy and paste this code into your website
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Embed Type</Label>
                          <div className="flex gap-2 mt-1">
                            <Button size="sm" variant="default">JavaScript</Button>
                            <Button size="sm" variant="outline">iframe</Button>
                            <Button size="sm" variant="outline">React</Button>
                          </div>
                        </div>
                        <div>
                          <Label>Code</Label>
                          <div className="relative">
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto mt-1">
                              <code>{generateEmbedCode()}</code>
                            </pre>
                            <Button
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => navigator.clipboard.writeText(generateEmbedCode())}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        API Integration
                      </CardTitle>
                      <CardDescription>
                        Integrate directly with your application
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label>API Endpoint</Label>
                          <div className="flex gap-2 mt-1">
                            <Input 
                              value={`https://api.buildiyo.com/v1/forms/form_${Date.now()}/submit`}
                              readOnly
                              className="font-mono text-sm"
                            />
                            <Button size="sm" variant="outline">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label>Example Code</Label>
                          <div className="relative">
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto mt-1">
                              <code>{generateAPICode()}</code>
                            </pre>
                            <Button
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => navigator.clipboard.writeText(generateAPICode())}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">1</div>
                          <h3 className="font-medium">Copy the Code</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Copy the embed code or use our API endpoint
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">2</div>
                          <h3 className="font-medium">Add to Website</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Paste the code where you want the form to appear
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-600 text-white text-sm flex items-center justify-center">3</div>
                          <h3 className="font-medium">Start Collecting</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Begin capturing leads immediately
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
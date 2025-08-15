import { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Copy,
  Edit,
  Trash2,
  Eye,
  Star,
  Download,
  Upload,
  Settings,
  MoreHorizontal,
  Tag,
  Calendar,
  TrendingUp,
  Users,
  Activity,
  Mail,
  MessageSquare,
  Phone,
  Video,
  BookOpen,
  Zap,
  Target,
  Clock,
  BarChart3,
  Folder,
  FolderPlus,
  Save,
  RefreshCw,
  Share2,
  Import,
  ArrowUpRight,
  ArrowDownRight
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'welcome' | 'follow-up' | 'proposal' | 'meeting' | 'closing' | 'nurture' | 'custom';
  variables: string[];
  usage: number;
  performance: {
    opens: number;
    clicks: number;
    responses: number;
    sent: number;
  };
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  isActive: boolean;
  isPublic: boolean;
  tags: string[];
  folder: string;
}

interface TemplateFolder {
  id: string;
  name: string;
  description: string;
  color: string;
  templateCount: number;
}

interface TemplateVariable {
  name: string;
  description: string;
  example: string;
  category: 'lead' | 'company' | 'project' | 'user' | 'date' | 'custom';
}

// Mock data
const mockTemplates: EmailTemplate[] = [
  {
    id: 'T001',
    name: 'Welcome New Lead',
    subject: 'Welcome to {{company_name}} - Next Steps for {{project_type}}',
    content: `Hi {{contact_name}},

Thank you for your interest in our services! I'm {{assigned_to}}, and I'll be your dedicated contact throughout this process.

I've reviewed your initial requirements for {{project_type}}, and I believe we can provide exactly what you're looking for.

What makes us different:
• 15+ years of experience in {{industry}}
• Proven track record with similar projects
• Dedicated project management
• Quality guarantee on all work

Next steps:
1. I'll prepare a custom proposal based on your needs
2. We'll schedule a call to discuss details
3. I'll provide you with references from similar projects

I'll reach out within the next 24 hours to schedule our conversation.

Best regards,
{{assigned_to}}
{{company_name}}
{{phone_number}}`,
    category: 'welcome',
    variables: ['contact_name', 'company_name', 'assigned_to', 'project_type', 'industry', 'phone_number'],
    usage: 145,
    performance: {
      opens: 87,
      clicks: 34,
      responses: 23,
      sent: 145
    },
    createdAt: new Date(2024, 0, 10),
    updatedAt: new Date(2024, 0, 18),
    createdBy: 'Sarah Johnson',
    isActive: true,
    isPublic: true,
    tags: ['new-lead', 'introduction', 'high-converting'],
    folder: 'lead-nurturing'
  },
  {
    id: 'T002',
    name: 'Proposal Follow-up',
    subject: 'Following up on your {{project_type}} proposal - {{company_name}}',
    content: `Hi {{contact_name}},

I wanted to follow up on the proposal I sent for your {{project_type}} project.

Key highlights from our proposal:
• Estimated timeline: {{timeline}}
• Total investment: {{budget_range}}
• Included services: {{services}}
• Project start date: {{start_date}}

Our proposal includes:
✓ Detailed project scope and deliverables
✓ Transparent pricing with no hidden costs
✓ Dedicated project manager
✓ Regular progress updates
✓ Quality assurance guarantee

I'm available to discuss any questions you might have or to schedule a call to walk through the details together.

Would you be available for a brief call this week to discuss?

You can book a convenient time here: {{calendar_link}}

Best regards,
{{assigned_to}}
{{company_name}}`,
    category: 'follow-up',
    variables: ['contact_name', 'project_type', 'company_name', 'timeline', 'budget_range', 'services', 'start_date', 'calendar_link', 'assigned_to'],
    usage: 89,
    performance: {
      opens: 67,
      clicks: 28,
      responses: 19,
      sent: 89
    },
    createdAt: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 0, 20),
    createdBy: 'Mike Chen',
    isActive: true,
    isPublic: true,
    tags: ['follow-up', 'proposal', 'calendar-link'],
    folder: 'sales-process'
  },
  {
    id: 'T003',
    name: 'Meeting Confirmation',
    subject: 'Meeting Confirmation - {{date}} at {{time}}',
    content: `Hi {{contact_name}},

This is to confirm our meeting scheduled for {{date}} at {{time}}.

Meeting Details:
• Date & Time: {{date}} at {{time}} {{timezone}}
• Duration: {{duration}} minutes
• Location/Platform: {{location}}
• Meeting ID: {{meeting_id}}

Agenda:
{{agenda}}

What to prepare:
• List of questions or concerns
• Project requirements document
• Budget considerations
• Timeline expectations

If you need to reschedule, please let me know at least 2 hours before our meeting.

Join link: {{meeting_link}}

Looking forward to speaking with you!

Best regards,
{{assigned_to}}
{{company_name}}`,
    category: 'meeting',
    variables: ['contact_name', 'date', 'time', 'timezone', 'duration', 'location', 'meeting_id', 'agenda', 'meeting_link', 'assigned_to', 'company_name'],
    usage: 67,
    performance: {
      opens: 89,
      clicks: 45,
      responses: 31,
      sent: 67
    },
    createdAt: new Date(2024, 0, 12),
    updatedAt: new Date(2024, 0, 19),
    createdBy: 'Lisa Wang',
    isActive: true,
    isPublic: true,
    tags: ['meeting', 'confirmation', 'calendar'],
    folder: 'appointments'
  }
];

const mockFolders: TemplateFolder[] = [
  {
    id: 'lead-nurturing',
    name: 'Lead Nurturing',
    description: 'Templates for nurturing new leads',
    color: 'bg-blue-500',
    templateCount: 8
  },
  {
    id: 'sales-process',
    name: 'Sales Process',
    description: 'Templates for sales pipeline stages',
    color: 'bg-emerald-500',
    templateCount: 12
  },
  {
    id: 'appointments',
    name: 'Appointments',
    description: 'Meeting and call related templates',
    color: 'bg-purple-500',
    templateCount: 6
  },
  {
    id: 'follow-ups',
    name: 'Follow-ups',
    description: 'Various follow-up templates',
    color: 'bg-amber-500',
    templateCount: 15
  }
];

const availableVariables: TemplateVariable[] = [
  // Lead variables
  { name: 'contact_name', description: 'Lead contact person name', example: 'John Smith', category: 'lead' },
  { name: 'email', description: 'Lead email address', example: 'john@example.com', category: 'lead' },
  { name: 'phone', description: 'Lead phone number', example: '+1 555-123-4567', category: 'lead' },
  
  // Company variables
  { name: 'company_name', description: 'Lead company name', example: 'Acme Corporation', category: 'company' },
  { name: 'industry', description: 'Company industry', example: 'Construction', category: 'company' },
  { name: 'company_size', description: 'Number of employees', example: '50-100', category: 'company' },
  
  // Project variables
  { name: 'project_type', description: 'Type of project', example: 'Office Building', category: 'project' },
  { name: 'budget_range', description: 'Project budget range', example: '$100K - $250K', category: 'project' },
  { name: 'timeline', description: 'Project timeline', example: '3-4 months', category: 'project' },
  { name: 'services', description: 'Required services', example: 'Design, Construction, Project Management', category: 'project' },
  
  // User variables
  { name: 'assigned_to', description: 'Assigned sales person', example: 'Sarah Johnson', category: 'user' },
  { name: 'user_phone', description: 'Sales person phone', example: '+1 555-987-6543', category: 'user' },
  { name: 'user_title', description: 'Sales person title', example: 'Senior Sales Manager', category: 'user' },
  
  // Date variables
  { name: 'date', description: 'Current date', example: 'January 25, 2024', category: 'date' },
  { name: 'time', description: 'Current time', example: '2:30 PM', category: 'date' },
  { name: 'start_date', description: 'Project start date', example: 'February 1, 2024', category: 'date' }
];

// Helper functions
function formatNumber(num: number): string {
  return num.toLocaleString();
}

function calculatePerformanceRate(metric: number, total: number): number {
  return total > 0 ? Math.round((metric / total) * 100) : 0;
}

function getPerformanceColor(rate: number): string {
  if (rate >= 70) return 'text-emerald-600';
  if (rate >= 50) return 'text-amber-600';
  return 'text-red-600';
}

function getCategoryIcon(category: EmailTemplate['category']) {
  switch (category) {
    case 'welcome': return Users;
    case 'follow-up': return Target;
    case 'proposal': return FileText;
    case 'meeting': return Calendar;
    case 'closing': return TrendingUp;
    case 'nurture': return Activity;
    default: return Mail;
  }
}

function getCategoryColor(category: EmailTemplate['category']) {
  switch (category) {
    case 'welcome': return 'bg-blue-100 text-blue-800';
    case 'follow-up': return 'bg-emerald-100 text-emerald-800';
    case 'proposal': return 'bg-purple-100 text-purple-800';
    case 'meeting': return 'bg-amber-100 text-amber-800';
    case 'closing': return 'bg-rose-100 text-rose-800';
    case 'nurture': return 'bg-cyan-100 text-cyan-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function TemplateCard({ template, onEdit, onPreview, onDuplicate, onDelete }: {
  template: EmailTemplate;
  onEdit: () => void;
  onPreview: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const CategoryIcon = getCategoryIcon(template.category);
  const openRate = calculatePerformanceRate(template.performance.opens, template.performance.sent);
  const responseRate = calculatePerformanceRate(template.performance.responses, template.performance.sent);
  
  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={cn("p-1.5 rounded-lg", getCategoryColor(template.category).replace('text-', 'bg-').replace('800', '100'))}>
                <CategoryIcon className={cn("h-4 w-4", getCategoryColor(template.category).split(' ')[1])} />
              </div>
              <Badge className={getCategoryColor(template.category)} variant="secondary">
                {template.category}
              </Badge>
              {!template.isActive && (
                <Badge variant="outline" className="text-red-600 border-red-200">
                  Inactive
                </Badge>
              )}
            </div>
            
            <CardTitle className="text-base mb-1">{template.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-1">
              {template.subject}
            </CardDescription>
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
              <DropdownMenuItem onClick={onPreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">
          {template.content.substring(0, 100)}...
        </p>
        
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-3 pt-2 border-t">
          <div className="text-center">
            <p className="text-sm font-medium">{formatNumber(template.usage)}</p>
            <p className="text-xs text-gray-500">Uses</p>
          </div>
          <div className="text-center">
            <p className={cn("text-sm font-medium", getPerformanceColor(openRate))}>
              {openRate}%
            </p>
            <p className="text-xs text-gray-500">Opens</p>
          </div>
          <div className="text-center">
            <p className={cn("text-sm font-medium", getPerformanceColor(responseRate))}>
              {responseRate}%
            </p>
            <p className="text-xs text-gray-500">Response</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FolderCard({ folder, onSelect, isSelected }: {
  folder: TemplateFolder;
  onSelect: () => void;
  isSelected: boolean;
}) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary shadow-md"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={cn("p-2 rounded-lg", folder.color)}>
            <Folder className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{folder.name}</h3>
            <p className="text-sm text-gray-500">{folder.description}</p>
          </div>
          <Badge variant="secondary">{folder.templateCount}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateEditor({ template, onSave, onCancel }: {
  template?: EmailTemplate;
  onSave: (template: Partial<EmailTemplate>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    subject: template?.subject || '',
    content: template?.content || '',
    category: template?.category || 'custom' as EmailTemplate['category'],
    tags: template?.tags.join(', ') || '',
    folder: template?.folder || '',
    isActive: template?.isActive ?? true,
    isPublic: template?.isPublic ?? false
  });

  const handleSave = () => {
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      variables: extractVariables(formData.content)
    });
  };

  const extractVariables = (content: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const variables: string[] = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      if (!variables.includes(match[1].trim())) {
        variables.push(match[1].trim());
      }
    }
    
    return variables;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Template Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter template name..."
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value: EmailTemplate['category']) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="welcome">Welcome</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="closing">Closing</SelectItem>
              <SelectItem value="nurture">Nurture</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="subject">Subject Line</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          placeholder="Enter email subject with variables like {{contact_name}}"
        />
      </div>
      
      <div>
        <Label htmlFor="content">Email Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Enter email content with variables like {{contact_name}}, {{company_name}}, etc."
          rows={12}
        />
      </div>
      
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="e.g., follow-up, high-converting, urgent"
        />
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          />
          <Label>Active Template</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isPublic}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
          />
          <Label>Public Template</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>
    </div>
  );
}

export function EmailTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | undefined>();
  const [templates, setTemplates] = useState(mockTemplates);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = !searchQuery || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesFolder = selectedFolder === 'all' || template.folder === selectedFolder;
      
      return matchesSearch && matchesCategory && matchesFolder;
    });
  }, [searchQuery, selectedCategory, selectedFolder, templates]);

  const handleSaveTemplate = (templateData: Partial<EmailTemplate>) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, ...templateData, updatedAt: new Date() }
          : t
      ));
    } else {
      // Create new template
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: templateData.name || '',
        subject: templateData.subject || '',
        content: templateData.content || '',
        category: templateData.category || 'custom',
        variables: templateData.variables || [],
        usage: 0,
        performance: { opens: 0, clicks: 0, responses: 0, sent: 0 },
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'Current User',
        isActive: templateData.isActive ?? true,
        isPublic: templateData.isPublic ?? false,
        tags: templateData.tags || [],
        folder: templateData.folder || 'custom'
      };
      setTemplates(prev => [newTemplate, ...prev]);
    }
    
    setShowEditor(false);
    setEditingTemplate(undefined);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const templateStats = useMemo(() => {
    const totalTemplates = templates.length;
    const activeTemplates = templates.filter(t => t.isActive).length;
    const totalUsage = templates.reduce((sum, t) => sum + t.usage, 0);
    const avgOpenRate = templates.reduce((sum, t) => {
      const rate = calculatePerformanceRate(t.performance.opens, t.performance.sent);
      return sum + rate;
    }, 0) / totalTemplates;
    
    return { totalTemplates, activeTemplates, totalUsage, avgOpenRate };
  }, [templates]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Email Templates</h1>
              <Badge variant="secondary">{filteredTemplates.length} templates</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="closing">Closing</SelectItem>
                  <SelectItem value="nurture">Nurture</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              
              <Button 
                onClick={() => {
                  setEditingTemplate(undefined);
                  setShowEditor(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </div>
          </div>
        </div>

        {!showEditor ? (
          <div className="flex h-screen">
            {/* Left Sidebar */}
            <div className="w-80 bg-white border-r flex flex-col">
              {/* Stats */}
              <div className="p-4 border-b">
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Templates</p>
                          <p className="text-lg font-bold">{templateStats.totalTemplates}</p>
                        </div>
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Active</p>
                          <p className="text-lg font-bold">{templateStats.activeTemplates}</p>
                        </div>
                        <Activity className="h-5 w-5 text-emerald-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Total Uses</p>
                          <p className="text-lg font-bold">{formatNumber(templateStats.totalUsage)}</p>
                        </div>
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Avg Opens</p>
                          <p className="text-lg font-bold">{templateStats.avgOpenRate.toFixed(0)}%</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-amber-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Folders */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Folders</h3>
                  <Button variant="ghost" size="sm">
                    <FolderPlus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <FolderCard
                    folder={{
                      id: 'all',
                      name: 'All Templates',
                      description: 'View all templates',
                      color: 'bg-gray-500',
                      templateCount: templates.length
                    }}
                    onSelect={() => setSelectedFolder('all')}
                    isSelected={selectedFolder === 'all'}
                  />
                  
                  {mockFolders.map((folder) => (
                    <FolderCard
                      key={folder.id}
                      folder={folder}
                      onSelect={() => setSelectedFolder(folder.id)}
                      isSelected={selectedFolder === folder.id}
                    />
                  ))}
                </div>
              </div>

              {/* Variables Reference */}
              <div className="flex-1 p-4">
                <h3 className="font-semibold mb-3">Available Variables</h3>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {Object.entries(
                      availableVariables.reduce((groups, variable) => ({
                        ...groups,
                        [variable.category]: [...(groups[variable.category] || []), variable]
                      }), {} as Record<string, TemplateVariable[]>)
                    ).map(([category, categoryVariables]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-gray-600 mb-2 capitalize">
                          {category}
                        </h4>
                        <div className="space-y-1">
                          {categoryVariables.map((variable) => (
                            <Tooltip key={variable.name} content={`${variable.description} (e.g., ${variable.example})`}>
                              <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200">
                                {`{{${variable.name}}}`}
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {filteredTemplates.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ? 'Try adjusting your search criteria' : 'Create your first email template'}
                    </p>
                    <Button onClick={() => setShowEditor(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onEdit={() => {
                        setEditingTemplate(template);
                        setShowEditor(true);
                      }}
                      onPreview={() => {}}
                      onDuplicate={() => {
                        const duplicated = {
                          ...template,
                          id: Date.now().toString(),
                          name: `${template.name} (Copy)`,
                          usage: 0,
                          performance: { opens: 0, clicks: 0, responses: 0, sent: 0 },
                          createdAt: new Date(),
                          updatedAt: new Date()
                        };
                        setTemplates(prev => [duplicated, ...prev]);
                      }}
                      onDelete={() => handleDeleteTemplate(template.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Editor Mode */
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  {editingTemplate ? 'Edit Template' : 'Create New Template'}
                </h2>
                <p className="text-gray-500">
                  Use variables like {`{{contact_name}}`} to personalize your emails
                </p>
              </div>
              
              <TemplateEditor
                template={editingTemplate}
                onSave={handleSaveTemplate}
                onCancel={() => {
                  setShowEditor(false);
                  setEditingTemplate(undefined);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default EmailTemplates;
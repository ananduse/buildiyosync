import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus,
  Copy,
  Edit,
  Eye,
  Download,
  Upload,
  Star,
  StarOff,
  Filter,
  Search,
  Grid,
  List,
  MoreVertical,
  Clock,
  TrendingUp,
  Users,
  Building,
  ShoppingCart,
  Briefcase,
  Home,
  Heart,
  GraduationCap,
  Car,
  Plane,
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  Package,
  Settings,
  Share2,
  Lock,
  Unlock,
  Trash2,
  Archive,
  FolderOpen,
  Tag,
  Hash,
  MessageSquare,
  UserPlus,
  DollarSign,
  Percent,
  Globe,
  Smartphone,
  Code,
  Palette,
  Layout,
  Layers,
  BookOpen,
  Award,
  Shield,
  Bell,
  HelpCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  tags: string[];
  fields: number;
  conversions: number;
  rating: number;
  reviews: number;
  author: {
    name: string;
    verified: boolean;
  };
  lastUpdated: Date;
  premium: boolean;
  featured: boolean;
  preview?: string;
  stats: {
    views: number;
    uses: number;
    conversionRate: number;
  };
}

interface TemplateCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
  description: string;
}

const FormTemplates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null);
  const [filterPremium, setFilterPremium] = useState<'all' | 'free' | 'premium'>('all');

  const categories: TemplateCategory[] = [
    { id: 'all', name: 'All Templates', icon: Grid, count: 84, description: 'Browse all available templates' },
    { id: 'construction', name: 'Construction', icon: Building, count: 12, description: 'Construction and real estate forms' },
    { id: 'sales', name: 'Sales & CRM', icon: TrendingUp, count: 18, description: 'Lead generation and sales forms' },
    { id: 'recruitment', name: 'Recruitment', icon: UserPlus, count: 8, description: 'Job applications and HR forms' },
    { id: 'events', name: 'Events', icon: Calendar, count: 10, description: 'Event registration and RSVP forms' },
    { id: 'education', name: 'Education', icon: GraduationCap, count: 7, description: 'Educational and training forms' },
    { id: 'healthcare', name: 'Healthcare', icon: Heart, count: 6, description: 'Medical and health forms' },
    { id: 'finance', name: 'Finance', icon: DollarSign, count: 9, description: 'Financial and payment forms' },
    { id: 'surveys', name: 'Surveys', icon: MessageSquare, count: 14, description: 'Feedback and survey forms' }
  ];

  const templates: FormTemplate[] = [
    {
      id: '1',
      name: 'Construction Project Lead Form',
      description: 'Comprehensive lead capture for construction projects with budget qualification',
      category: 'construction',
      icon: Building,
      tags: ['lead-gen', 'construction', 'b2b', 'qualification'],
      fields: 18,
      conversions: 2847,
      rating: 4.8,
      reviews: 156,
      author: { name: 'Buildiyo Team', verified: true },
      lastUpdated: new Date('2024-01-15'),
      premium: false,
      featured: true,
      stats: {
        views: 15234,
        uses: 3421,
        conversionRate: 18.7
      }
    },
    {
      id: '2',
      name: 'Enterprise Sales Qualification',
      description: 'Multi-step form with BANT qualification for enterprise sales',
      category: 'sales',
      icon: Briefcase,
      tags: ['sales', 'enterprise', 'qualification', 'multi-step'],
      fields: 24,
      conversions: 1923,
      rating: 4.9,
      reviews: 89,
      author: { name: 'Sales Pro', verified: true },
      lastUpdated: new Date('2024-01-10'),
      premium: true,
      featured: true,
      stats: {
        views: 9876,
        uses: 2134,
        conversionRate: 21.3
      }
    },
    {
      id: '3',
      name: 'Real Estate Inquiry Form',
      description: 'Property inquiry form with automated follow-up and CRM integration',
      category: 'construction',
      icon: Home,
      tags: ['real-estate', 'property', 'inquiry', 'automation'],
      fields: 15,
      conversions: 3156,
      rating: 4.7,
      reviews: 203,
      author: { name: 'RealEstate Pro', verified: false },
      lastUpdated: new Date('2024-01-08'),
      premium: false,
      featured: false,
      stats: {
        views: 18543,
        uses: 4567,
        conversionRate: 16.9
      }
    },
    {
      id: '4',
      name: 'Job Application Form',
      description: 'Complete job application with resume upload and screening questions',
      category: 'recruitment',
      icon: UserPlus,
      tags: ['hr', 'recruitment', 'job-application', 'screening'],
      fields: 22,
      conversions: 892,
      rating: 4.6,
      reviews: 67,
      author: { name: 'HR Solutions', verified: true },
      lastUpdated: new Date('2024-01-12'),
      premium: true,
      featured: false,
      stats: {
        views: 7234,
        uses: 1876,
        conversionRate: 12.3
      }
    },
    {
      id: '5',
      name: 'Event Registration Pro',
      description: 'Event registration with ticket selection and payment processing',
      category: 'events',
      icon: Calendar,
      tags: ['events', 'registration', 'tickets', 'payment'],
      fields: 19,
      conversions: 4521,
      rating: 4.8,
      reviews: 178,
      author: { name: 'EventMaster', verified: true },
      lastUpdated: new Date('2024-01-05'),
      premium: true,
      featured: true,
      stats: {
        views: 22341,
        uses: 5678,
        conversionRate: 20.2
      }
    },
    {
      id: '6',
      name: 'Customer Feedback Survey',
      description: 'NPS and satisfaction survey with branching logic',
      category: 'surveys',
      icon: MessageSquare,
      tags: ['survey', 'feedback', 'nps', 'satisfaction'],
      fields: 12,
      conversions: 6789,
      rating: 4.5,
      reviews: 234,
      author: { name: 'Survey Expert', verified: false },
      lastUpdated: new Date('2024-01-18'),
      premium: false,
      featured: false,
      stats: {
        views: 31234,
        uses: 8901,
        conversionRate: 21.7
      }
    },
    {
      id: '7',
      name: 'Medical Appointment Request',
      description: 'Healthcare appointment booking with insurance verification',
      category: 'healthcare',
      icon: Heart,
      tags: ['healthcare', 'medical', 'appointment', 'insurance'],
      fields: 20,
      conversions: 1234,
      rating: 4.9,
      reviews: 56,
      author: { name: 'MedForms', verified: true },
      lastUpdated: new Date('2024-01-14'),
      premium: true,
      featured: false,
      stats: {
        views: 8765,
        uses: 2341,
        conversionRate: 14.1
      }
    },
    {
      id: '8',
      name: 'Course Enrollment Form',
      description: 'Online course registration with prerequisites check',
      category: 'education',
      icon: GraduationCap,
      tags: ['education', 'course', 'enrollment', 'training'],
      fields: 17,
      conversions: 2134,
      rating: 4.7,
      reviews: 98,
      author: { name: 'EduForms', verified: true },
      lastUpdated: new Date('2024-01-11'),
      premium: false,
      featured: false,
      stats: {
        views: 12456,
        uses: 3421,
        conversionRate: 17.1
      }
    },
    {
      id: '9',
      name: 'Loan Application Form',
      description: 'Financial loan application with credit score integration',
      category: 'finance',
      icon: DollarSign,
      tags: ['finance', 'loan', 'credit', 'application'],
      fields: 28,
      conversions: 567,
      rating: 4.6,
      reviews: 45,
      author: { name: 'FinTech Pro', verified: true },
      lastUpdated: new Date('2024-01-09'),
      premium: true,
      featured: false,
      stats: {
        views: 6543,
        uses: 1234,
        conversionRate: 8.7
      }
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesPremium = filterPremium === 'all' || 
                           (filterPremium === 'premium' && template.premium) ||
                           (filterPremium === 'free' && !template.premium);
    return matchesCategory && matchesSearch && matchesPremium;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">({rating})</span>
      </div>
    );
  };

  const renderTemplateCard = (template: FormTemplate) => {
    const Icon = template.icon;
    
    return (
      <Card 
        key={template.id}
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedTemplate(template)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gray-100">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">{template.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  {template.featured && (
                    <Badge variant="default" className="text-xs">Featured</Badge>
                  )}
                  {template.premium && (
                    <Badge variant="secondary" className="text-xs">Premium</Badge>
                  )}
                  {template.author.verified && (
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Use Template
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Customize
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" />
                  Add to Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {template.tags.slice(0, 3).map(tag => (
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

          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {template.fields} fields
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {template.stats.conversionRate}% conversion
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {template.stats.uses.toLocaleString()} uses
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {Math.floor((Date.now() - template.lastUpdated.getTime()) / (1000 * 60 * 60 * 24))}d ago
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {renderStars(template.rating)}
              <span className="text-xs text-muted-foreground">
                {template.reviews} reviews
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              by {template.author.name}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Form Templates Library</h1>
            <p className="text-muted-foreground mt-2">
              Choose from our collection of pre-built, high-converting form templates
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Template
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Create a reusable form template for your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input placeholder="Enter template name" className="mt-1" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c.id !== 'all').map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe your template..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Base Form</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Start from scratch or existing form" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scratch">Start from scratch</SelectItem>
                        <SelectItem value="existing">Use existing form</SelectItem>
                        <SelectItem value="import">Import from file</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCreateDialog(false)}>
                    Create Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterPremium} onValueChange={(value: any) => setFilterPremium(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="free">Free Only</SelectItem>
                  <SelectItem value="premium">Premium Only</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-12 gap-6">
          {/* Categories Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1">
                    {categories.map(category => {
                      const Icon = category.icon;
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? 'default' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          <span className="flex-1 text-left">{category.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {category.count}
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-base">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['lead-gen', 'multi-step', 'qualification', 'automation', 'payment', 'registration'].map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => setSearchTerm(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Templates Grid/List */}
          <div className="col-span-9">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Templates</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredTemplates.length} templates
                  </p>
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Sort by Rating</SelectItem>
                      <SelectItem value="uses">Sort by Most Used</SelectItem>
                      <SelectItem value="conversion">Sort by Conversion Rate</SelectItem>
                      <SelectItem value="recent">Sort by Recently Updated</SelectItem>
                      <SelectItem value="name">Sort by Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map(renderTemplateCard)}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTemplates.map(template => {
                      const Icon = template.icon;
                      return (
                        <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gray-100">
                                  <Icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold">{template.name}</h3>
                                    {template.featured && (
                                      <Badge variant="default" className="text-xs">Featured</Badge>
                                    )}
                                    {template.premium && (
                                      <Badge variant="secondary" className="text-xs">Premium</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {template.description}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{template.fields} fields</span>
                                    <span>{template.stats.uses.toLocaleString()} uses</span>
                                    <span>{template.stats.conversionRate}% conversion</span>
                                    {renderStars(template.rating)}
                                    <span>by {template.author.name}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                                <Button size="sm">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Use Template
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="featured" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.filter(t => t.featured).map(renderTemplateCard)}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates
                    .sort((a, b) => b.stats.uses - a.stats.uses)
                    .map(renderTemplateCard)}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates
                    .sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime())
                    .map(renderTemplateCard)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Template Preview Dialog */}
      {selectedTemplate && (
        <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedTemplate.name}</DialogTitle>
              <DialogDescription>
                Preview and customize this template for your needs
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Template Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Category</Label>
                      <p className="text-sm mt-1">{selectedTemplate.category}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Author</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>
                            {selectedTemplate.author.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{selectedTemplate.author.name}</span>
                        {selectedTemplate.author.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Statistics</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-xs text-muted-foreground">Views</p>
                          <p className="text-sm font-medium">{selectedTemplate.stats.views.toLocaleString()}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-xs text-muted-foreground">Uses</p>
                          <p className="text-sm font-medium">{selectedTemplate.stats.uses.toLocaleString()}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-xs text-muted-foreground">Conversions</p>
                          <p className="text-sm font-medium">{selectedTemplate.conversions.toLocaleString()}</p>
                        </div>
                        <div className="p-2 bg-gray-50 rounded">
                          <p className="text-xs text-muted-foreground">Rate</p>
                          <p className="text-sm font-medium">{selectedTemplate.stats.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Tags</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTemplate.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3">Form Preview</h3>
                  <div className="border rounded-lg p-4 bg-gray-50 h-96">
                    <div className="text-center text-muted-foreground">
                      <Layout className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p>Form preview will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Close
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Customize
              </Button>
              <Button>
                <Copy className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FormTemplates;
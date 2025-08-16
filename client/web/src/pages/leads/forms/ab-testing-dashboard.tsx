import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Plus,
  Play,
  Pause,
  Stop,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Eye,
  MousePointer,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Settings,
  Copy,
  Edit,
  Trash2,
  Download,
  Share2,
  Filter,
  Search,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Zap,
  Flag,
  Award,
  Percent,
  DollarSign,
  Send,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Info,
  HelpCircle,
  ExternalLink,
  Crown,
  Star,
  Lightbulb,
  Activity,
  PieChart,
  LineChart,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'cancelled';
  hypothesis: string;
  startDate: Date;
  endDate?: Date;
  duration: number; // days
  traffic: number; // percentage
  variants: Variant[];
  metrics: TestMetrics;
  settings: TestSettings;
  results?: TestResults;
}

interface Variant {
  id: string;
  name: string;
  description: string;
  isControl: boolean;
  traffic: number;
  changes: VariantChange[];
  preview?: string;
}

interface VariantChange {
  type: 'field' | 'layout' | 'copy' | 'style' | 'validation' | 'flow';
  target: string;
  change: string;
  value: any;
}

interface TestMetrics {
  primaryMetric: string;
  secondaryMetrics: string[];
  conversionGoals: string[];
}

interface TestSettings {
  minDetectableEffect: number;
  confidence: number;
  power: number;
  minSampleSize: number;
  maxDuration: number;
  trafficAllocation: 'equal' | 'weighted' | 'custom';
}

interface TestResults {
  winner?: string;
  confidence: number;
  improvement: number;
  statistical_significance: boolean;
  variants: VariantResults[];
  insights: string[];
}

interface VariantResults {
  variantId: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  improvement: number;
  confidence: number;
  revenue?: number;
  bounceRate: number;
  timeOnPage: number;
}

const ABTestingDashboard: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock A/B tests data
  const tests: ABTest[] = [
    {
      id: '1',
      name: 'Multi-step vs Single-page Form',
      description: 'Testing whether breaking the form into multiple steps improves completion rates',
      status: 'running',
      hypothesis: 'Multi-step forms will have higher completion rates due to reduced cognitive load',
      startDate: new Date('2024-01-10'),
      duration: 14,
      traffic: 100,
      variants: [
        {
          id: 'control',
          name: 'Single Page (Control)',
          description: 'Original single-page form with all fields visible',
          isControl: true,
          traffic: 50,
          changes: []
        },
        {
          id: 'variant_a',
          name: 'Multi-step Form',
          description: '5-step form with progress indicator',
          isControl: false,
          traffic: 50,
          changes: [
            { type: 'layout', target: 'form', change: 'Split into 5 steps', value: 'multi-step' },
            { type: 'field', target: 'progress', change: 'Add progress bar', value: true }
          ]
        }
      ],
      metrics: {
        primaryMetric: 'conversion_rate',
        secondaryMetrics: ['completion_time', 'bounce_rate', 'field_abandonment'],
        conversionGoals: ['form_submission', 'email_signup']
      },
      settings: {
        minDetectableEffect: 5,
        confidence: 95,
        power: 80,
        minSampleSize: 1000,
        maxDuration: 30,
        trafficAllocation: 'equal'
      },
      results: {
        winner: 'variant_a',
        confidence: 97.3,
        improvement: 18.5,
        statistical_significance: true,
        variants: [
          {
            variantId: 'control',
            visitors: 2847,
            conversions: 398,
            conversionRate: 14.0,
            improvement: 0,
            confidence: 0,
            revenue: 79600,
            bounceRate: 42.3,
            timeOnPage: 247
          },
          {
            variantId: 'variant_a',
            visitors: 2923,
            conversions: 485,
            conversionRate: 16.6,
            improvement: 18.5,
            confidence: 97.3,
            revenue: 97000,
            bounceRate: 34.7,
            timeOnPage: 312
          }
        ],
        insights: [
          'Multi-step form reduces cognitive load and improves completion rates',
          'Users spend more time on page but with better conversion',
          'Mobile users especially benefit from the multi-step approach'
        ]
      }
    },
    {
      id: '2',
      name: 'CTA Button Color Test',
      description: 'Testing different call-to-action button colors for better click-through rates',
      status: 'completed',
      hypothesis: 'A green button will outperform the current blue button due to stronger association with "go"',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-15'),
      duration: 14,
      traffic: 50,
      variants: [
        {
          id: 'control',
          name: 'Blue Button (Control)',
          description: 'Current blue CTA button (#3b82f6)',
          isControl: true,
          traffic: 50,
          changes: []
        },
        {
          id: 'variant_a',
          name: 'Green Button',
          description: 'Green CTA button (#10b981)',
          isControl: false,
          traffic: 50,
          changes: [
            { type: 'style', target: 'cta_button', change: 'Background color', value: '#10b981' }
          ]
        }
      ],
      metrics: {
        primaryMetric: 'click_through_rate',
        secondaryMetrics: ['conversion_rate', 'time_to_click'],
        conversionGoals: ['button_click', 'form_submission']
      },
      settings: {
        minDetectableEffect: 3,
        confidence: 95,
        power: 80,
        minSampleSize: 2000,
        maxDuration: 21,
        trafficAllocation: 'equal'
      },
      results: {
        winner: 'control',
        confidence: 94.7,
        improvement: -2.3,
        statistical_significance: true,
        variants: [
          {
            variantId: 'control',
            visitors: 1923,
            conversions: 285,
            conversionRate: 14.8,
            improvement: 0,
            confidence: 0,
            revenue: 57000,
            bounceRate: 38.2,
            timeOnPage: 198
          },
          {
            variantId: 'variant_a',
            visitors: 1897,
            conversions: 266,
            conversionRate: 14.0,
            improvement: -5.4,
            confidence: 94.7,
            revenue: 53200,
            bounceRate: 39.1,
            timeOnPage: 201
          }
        ],
        insights: [
          'Blue button performed better, likely due to brand consistency',
          'Users are accustomed to the current blue color scheme',
          'Consider testing button text instead of color'
        ]
      }
    },
    {
      id: '3',
      name: 'Form Field Order Optimization',
      description: 'Testing different field ordering to reduce abandonment',
      status: 'draft',
      hypothesis: 'Starting with easier fields (name, email) before company details will reduce abandonment',
      startDate: new Date('2024-01-20'),
      duration: 21,
      traffic: 75,
      variants: [
        {
          id: 'control',
          name: 'Current Order (Control)',
          description: 'Company details first, then personal info',
          isControl: true,
          traffic: 50,
          changes: []
        },
        {
          id: 'variant_a',
          name: 'Personal First',
          description: 'Personal info first, then company details',
          isControl: false,
          traffic: 50,
          changes: [
            { type: 'flow', target: 'field_order', change: 'Reorder fields', value: 'personal_first' }
          ]
        }
      ],
      metrics: {
        primaryMetric: 'completion_rate',
        secondaryMetrics: ['field_abandonment', 'form_abandonment', 'time_to_complete'],
        conversionGoals: ['form_completion']
      },
      settings: {
        minDetectableEffect: 8,
        confidence: 95,
        power: 80,
        minSampleSize: 800,
        maxDuration: 28,
        trafficAllocation: 'equal'
      }
    },
    {
      id: '4',
      name: 'Social Proof Elements',
      description: 'Adding testimonials and trust badges to improve conversion',
      status: 'paused',
      hypothesis: 'Social proof elements will increase trust and form submissions',
      startDate: new Date('2024-01-12'),
      duration: 28,
      traffic: 100,
      variants: [
        {
          id: 'control',
          name: 'No Social Proof (Control)',
          description: 'Form without any social proof elements',
          isControl: true,
          traffic: 50,
          changes: []
        },
        {
          id: 'variant_a',
          name: 'With Social Proof',
          description: 'Form with testimonials and trust badges',
          isControl: false,
          traffic: 50,
          changes: [
            { type: 'field', target: 'testimonials', change: 'Add testimonial section', value: true },
            { type: 'field', target: 'trust_badges', change: 'Add security badges', value: true }
          ]
        }
      ],
      metrics: {
        primaryMetric: 'conversion_rate',
        secondaryMetrics: ['trust_score', 'time_on_page', 'scroll_depth'],
        conversionGoals: ['form_submission']
      },
      settings: {
        minDetectableEffect: 10,
        confidence: 95,
        power: 80,
        minSampleSize: 1200,
        maxDuration: 35,
        trafficAllocation: 'equal'
      }
    }
  ];

  const filteredTests = tests.filter(test => {
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          test.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: ABTest['status']) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ABTest['status']) => {
    switch (status) {
      case 'running': return Play;
      case 'completed': return CheckCircle;
      case 'paused': return Pause;
      case 'cancelled': return XCircle;
      case 'draft': return Edit;
      default: return Clock;
    }
  };

  const renderTestCard = (test: ABTest) => {
    const StatusIcon = getStatusIcon(test.status);
    const isCompleted = test.status === 'completed';
    const hasResults = test.results && isCompleted;

    return (
      <Card key={test.id} className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-base">{test.name}</CardTitle>
                <Badge className={getStatusColor(test.status)}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {test.status}
                </Badge>
                {hasResults && test.results.winner && (
                  <Badge variant="outline" className="text-green-600">
                    <Crown className="h-3 w-3 mr-1" />
                    Winner Found
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm">
                {test.description}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Test
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {test.status === 'running' && (
                  <DropdownMenuItem>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Test
                  </DropdownMenuItem>
                )}
                {test.status === 'paused' && (
                  <DropdownMenuItem>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Test
                  </DropdownMenuItem>
                )}
                {test.status === 'draft' && (
                  <DropdownMenuItem>
                    <Play className="h-4 w-4 mr-2" />
                    Start Test
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Test
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {/* Test Metrics */}
          {hasResults ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Improvement</p>
                  <p className={`text-lg font-bold ${test.results.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {test.results.improvement > 0 ? '+' : ''}{test.results.improvement.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="text-lg font-bold">{test.results.confidence.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Visitors</p>
                  <p className="text-lg font-bold">
                    {test.results.variants.reduce((sum, v) => sum + v.visitors, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Variants Performance</h4>
                {test.results.variants.map(variant => {
                  const variantInfo = test.variants.find(v => v.id === variant.variantId);
                  const isWinner = test.results?.winner === variant.variantId;
                  
                  return (
                    <div key={variant.variantId} className="flex items-center justify-between p-2 rounded bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isWinner ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="text-sm font-medium">
                          {variantInfo?.name}
                          {isWinner && <Crown className="h-3 w-3 ml-1 inline text-yellow-500" />}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{variant.conversionRate.toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">
                          {variant.conversions}/{variant.visitors}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm">
                <p className="text-muted-foreground mb-2">Hypothesis:</p>
                <p className="italic">"{test.hypothesis}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {test.status === 'draft' ? 'Starts' : 'Started'} {test.startDate.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {test.duration} days
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {test.traffic}% traffic
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {test.variants.length} variants
                </div>
              </div>

              {test.status === 'running' && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>Day {Math.floor((Date.now() - test.startDate.getTime()) / (1000 * 60 * 60 * 24))} of {test.duration}</span>
                  </div>
                  <Progress 
                    value={(Math.floor((Date.now() - test.startDate.getTime()) / (1000 * 60 * 60 * 24)) / test.duration) * 100} 
                    className="h-2"
                  />
                </div>
              )}
            </div>
          )}
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
            <h1 className="text-3xl font-bold">A/B Testing Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Optimize your forms with data-driven experiments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create A/B Test
              </Button>
            </Dialog>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Tests</p>
                  <p className="text-2xl font-bold">
                    {tests.filter(t => t.status === 'running').length}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed Tests</p>
                  <p className="text-2xl font-bold">
                    {tests.filter(t => t.status === 'completed').length}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Improvement</p>
                  <p className="text-2xl font-bold text-green-600">+12.3%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Visitors</p>
                  <p className="text-2xl font-bold">47.2K</p>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tests</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tests Content */}
        <Tabs defaultValue="list">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">All Tests</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="templates">Test Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTests.map(renderTestCard)}
            </div>

            {filteredTests.length === 0 && (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">No tests found</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first A/B test to start optimizing your forms
                    </p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create A/B Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Performing Changes</CardTitle>
                  <CardDescription>Changes that consistently improve conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Multi-step forms</p>
                        <p className="text-xs text-muted-foreground">Split long forms into steps</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+18.5%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Progress indicators</p>
                        <p className="text-xs text-muted-foreground">Show completion progress</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">+12.3%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Social proof</p>
                        <p className="text-xs text-muted-foreground">Add testimonials and badges</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">+9.7%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Common Failure Patterns</CardTitle>
                  <CardDescription>Changes that typically reduce conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Too many optional fields</p>
                        <p className="text-xs text-muted-foreground">Increases form complexity</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">-8.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Weak CTAs</p>
                        <p className="text-xs text-muted-foreground">Generic button text</p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">-5.1%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Poor mobile UX</p>
                        <p className="text-xs text-muted-foreground">Forms not optimized for mobile</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">-12.4%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Optimization Opportunities</CardTitle>
                  <CardDescription>AI-powered suggestions for your next tests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Test mobile-first design:</strong> 68% of your traffic is mobile. Consider testing a mobile-optimized layout.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Optimize field labels:</strong> Users spend 40% longer on company size field. Test clearer labeling.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Add trust signals:</strong> High bounce rate suggests trust issues. Test security badges and testimonials.
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Simplify first step:</strong> 23% abandon on first step. Test reducing initial fields to name and email only.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'CTA Button Optimization',
                  description: 'Test different button colors, text, and sizes',
                  icon: MousePointer,
                  category: 'UI Elements'
                },
                {
                  name: 'Form Layout Testing',
                  description: 'Single-page vs multi-step vs accordion layouts',
                  icon: Layout,
                  category: 'Layout'
                },
                {
                  name: 'Field Order Optimization',
                  description: 'Test different field sequences and groupings',
                  icon: List,
                  category: 'User Flow'
                },
                {
                  name: 'Social Proof Elements',
                  description: 'Add testimonials, reviews, and trust badges',
                  icon: Award,
                  category: 'Trust'
                },
                {
                  name: 'Mobile vs Desktop UX',
                  description: 'Device-specific form optimizations',
                  icon: Smartphone,
                  category: 'Responsive'
                },
                {
                  name: 'Progressive Disclosure',
                  description: 'Show/hide fields based on user selections',
                  icon: Eye,
                  category: 'Advanced'
                }
              ].map((template, index) => {
                const Icon = template.icon;
                return (
                  <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Test Dialog */}
      {showCreateDialog && (
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New A/B Test</DialogTitle>
              <DialogDescription>
                Set up an experiment to optimize your form performance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Test Name</Label>
                <Input placeholder="Enter test name" className="mt-1" />
              </div>
              <div>
                <Label>Hypothesis</Label>
                <Textarea 
                  placeholder="Describe what you expect to happen and why..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Metric</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conversion_rate">Conversion Rate</SelectItem>
                      <SelectItem value="completion_rate">Completion Rate</SelectItem>
                      <SelectItem value="click_through_rate">Click-through Rate</SelectItem>
                      <SelectItem value="time_to_complete">Time to Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Traffic Allocation</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select allocation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25% of traffic</SelectItem>
                      <SelectItem value="50">50% of traffic</SelectItem>
                      <SelectItem value="75">75% of traffic</SelectItem>
                      <SelectItem value="100">100% of traffic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Test Duration</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">1 week</SelectItem>
                      <SelectItem value="14">2 weeks</SelectItem>
                      <SelectItem value="21">3 weeks</SelectItem>
                      <SelectItem value="28">4 weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Confidence Level</Label>
                  <Select defaultValue="95">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                      <SelectItem value="99">99%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateDialog(false)}>
                Create Test
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ABTestingDashboard;
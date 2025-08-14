'use client';

import { useState, useMemo } from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar, Users, Building, MapPin, Target, Filter, Plus, Save, Download, Share, Edit, Trash2, Copy, Eye, Settings, RefreshCw, Grid, Layout, Layers, Palette, Type, AlignLeft, AlignCenter, AlignRight, Maximize, Minimize } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface Widget {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'text' | 'filter';
  title: string;
  description?: string;
  config: {
    chartType?: 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'gauge';
    dataSource: string;
    metrics: string[];
    dimensions: string[];
    filters?: { field: string; operator: string; value: string }[];
    timeRange?: string;
    groupBy?: string;
    sortBy?: string;
    limit?: number;
    format?: string;
    color?: string;
    size?: 'small' | 'medium' | 'large';
    position?: { x: number; y: number; width: number; height: number };
    styling?: {
      backgroundColor?: string;
      textColor?: string;
      borderColor?: string;
      fontSize?: number;
      fontWeight?: string;
      alignment?: 'left' | 'center' | 'right';
    };
  };
  data?: any[];
  lastUpdated?: string;
}

interface Dashboard {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'marketing' | 'operations' | 'executive' | 'custom';
  widgets: Widget[];
  layout: 'grid' | 'freeform' | 'responsive';
  isPublic: boolean;
  isTemplate: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  sharing: {
    users: string[];
    teams: string[];
    permissions: 'view' | 'edit' | 'admin';
  };
  schedule?: {
    enabled: boolean;
    frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    format: 'pdf' | 'excel' | 'email';
  };
}

interface ReportTemplate {
  id: string;
  name: string;
  category: 'sales-performance' | 'lead-analytics' | 'conversion-funnel' | 'activity-report' | 'custom';
  description: string;
  widgets: Partial<Widget>[];
  previewImage?: string;
  usageCount: number;
  rating: number;
  isPublic: boolean;
  createdBy: string;
  tags: string[];
}

const mockWidgets: Widget[] = [
  {
    id: '1',
    type: 'metric',
    title: 'Total Leads',
    config: {
      dataSource: 'leads',
      metrics: ['count'],
      dimensions: [],
      timeRange: 'this-month',
      format: 'number',
      color: '#3B82F6',
      size: 'medium'
    },
    data: [{ value: 1247, change: 12.5, trend: 'up' }],
    lastUpdated: '2024-03-20T15:30:00Z'
  },
  {
    id: '2',
    type: 'chart',
    title: 'Lead Conversion Funnel',
    config: {
      chartType: 'bar',
      dataSource: 'leads',
      metrics: ['count'],
      dimensions: ['status'],
      timeRange: 'this-quarter',
      color: '#10B981',
      size: 'large'
    },
    data: [
      { status: 'New', count: 450 },
      { status: 'Qualified', count: 320 },
      { status: 'Proposal', count: 180 },
      { status: 'Negotiation', count: 120 },
      { status: 'Closed Won', count: 89 }
    ],
    lastUpdated: '2024-03-20T15:30:00Z'
  },
  {
    id: '3',
    type: 'chart',
    title: 'Leads by Source',
    config: {
      chartType: 'pie',
      dataSource: 'leads',
      metrics: ['count'],
      dimensions: ['source'],
      timeRange: 'this-month',
      color: '#8B5CF6',
      size: 'medium'
    },
    data: [
      { source: 'Website', count: 420 },
      { source: 'Referral', count: 280 },
      { source: 'Social Media', count: 230 },
      { source: 'Email Campaign', count: 180 },
      { source: 'Events', count: 137 }
    ],
    lastUpdated: '2024-03-20T15:30:00Z'
  },
  {
    id: '4',
    type: 'chart',
    title: 'Monthly Lead Trend',
    config: {
      chartType: 'line',
      dataSource: 'leads',
      metrics: ['count'],
      dimensions: ['created_month'],
      timeRange: 'last-12-months',
      color: '#F59E0B',
      size: 'large'
    },
    data: [
      { month: 'Jan', count: 890 },
      { month: 'Feb', count: 1020 },
      { month: 'Mar', count: 1247 },
      { month: 'Apr', count: 1180 },
      { month: 'May', count: 1350 },
      { month: 'Jun', count: 1420 }
    ],
    lastUpdated: '2024-03-20T15:30:00Z'
  },
  {
    id: '5',
    type: 'table',
    title: 'Top Performing Sales Reps',
    config: {
      dataSource: 'activities',
      metrics: ['lead_count', 'conversion_rate', 'revenue'],
      dimensions: ['assigned_to'],
      timeRange: 'this-quarter',
      sortBy: 'revenue',
      limit: 10,
      size: 'medium'
    },
    data: [
      { name: 'Sarah Johnson', lead_count: 45, conversion_rate: 22.2, revenue: 125000 },
      { name: 'Alex Brown', lead_count: 38, conversion_rate: 18.4, revenue: 98000 },
      { name: 'Lisa Wilson', lead_count: 42, conversion_rate: 16.7, revenue: 87000 },
      { name: 'Mike Davis', lead_count: 35, conversion_rate: 20.0, revenue: 82000 }
    ],
    lastUpdated: '2024-03-20T15:30:00Z'
  }
];

const mockDashboards: Dashboard[] = [
  {
    id: '1',
    name: 'Sales Performance Dashboard',
    description: 'Comprehensive overview of sales metrics and lead performance',
    category: 'sales',
    widgets: mockWidgets,
    layout: 'grid',
    isPublic: false,
    isTemplate: false,
    createdBy: 'sarah@company.com',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-20T15:30:00Z',
    tags: ['sales', 'performance', 'leads'],
    sharing: {
      users: ['alex@company.com', 'lisa@company.com'],
      teams: ['sales-team'],
      permissions: 'view'
    },
    schedule: {
      enabled: true,
      frequency: 'weekly',
      recipients: ['manager@company.com'],
      format: 'pdf'
    }
  },
  {
    id: '2',
    name: 'Lead Analytics Overview',
    description: 'Deep dive into lead generation and conversion analytics',
    category: 'marketing',
    widgets: mockWidgets.slice(0, 3),
    layout: 'responsive',
    isPublic: true,
    isTemplate: true,
    createdBy: 'marketing@company.com',
    createdAt: '2024-03-10T14:00:00Z',
    updatedAt: '2024-03-18T11:00:00Z',
    tags: ['marketing', 'leads', 'conversion'],
    sharing: {
      users: [],
      teams: ['marketing-team', 'sales-team'],
      permissions: 'view'
    }
  }
];

const mockTemplates: ReportTemplate[] = [
  {
    id: '1',
    name: 'Sales Performance Report',
    category: 'sales-performance',
    description: 'Complete sales team performance with lead conversion metrics',
    widgets: [
      { type: 'metric', title: 'Total Revenue', config: { dataSource: 'deals', metrics: ['revenue_sum'] } },
      { type: 'chart', title: 'Monthly Sales Trend', config: { chartType: 'line', dataSource: 'deals', metrics: ['revenue'] } },
      { type: 'table', title: 'Top Performers', config: { dataSource: 'users', metrics: ['deals_closed', 'revenue'] } }
    ],
    usageCount: 156,
    rating: 4.8,
    isPublic: true,
    createdBy: 'admin@company.com',
    tags: ['sales', 'performance', 'revenue']
  },
  {
    id: '2',
    name: 'Lead Conversion Funnel',
    category: 'conversion-funnel',
    description: 'Analyze lead progression through sales funnel stages',
    widgets: [
      { type: 'chart', title: 'Conversion Funnel', config: { chartType: 'bar', dataSource: 'leads', dimensions: ['status'] } },
      { type: 'metric', title: 'Conversion Rate', config: { dataSource: 'leads', metrics: ['conversion_rate'] } },
      { type: 'chart', title: 'Stage Duration', config: { chartType: 'bar', dataSource: 'leads', metrics: ['avg_duration'] } }
    ],
    usageCount: 89,
    rating: 4.6,
    isPublic: true,
    createdBy: 'analytics@company.com',
    tags: ['conversion', 'funnel', 'stages']
  }
];

const widgetTypeIcons = {
  chart: BarChart3,
  metric: Target,
  table: Grid,
  text: Type,
  filter: Filter
};

const chartTypeIcons = {
  bar: BarChart3,
  line: TrendingUp,
  pie: PieChart,
  area: TrendingUp,
  scatter: Target,
  gauge: Target
};

const categoryColors = {
  sales: 'bg-blue-100 text-blue-800 border-blue-200',
  marketing: 'bg-green-100 text-green-800 border-green-200',
  operations: 'bg-purple-100 text-purple-800 border-purple-200',
  executive: 'bg-red-100 text-red-800 border-red-200',
  custom: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function ReportBuilder() {
  const [selectedTab, setSelectedTab] = useState('builder');
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(mockDashboards[0]);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isDashboardSettingsOpen, setIsDashboardSettingsOpen] = useState(false);
  const [builderMode, setBuilderMode] = useState<'design' | 'preview'>('design');

  const WidgetCard = ({ widget, isEditable = false }: { widget: Widget; isEditable?: boolean }) => {
    const Icon = widgetTypeIcons[widget.type];
    
    return (
      <Card 
        className={`cursor-pointer transition-all ${selectedWidget?.id === widget.id ? 'ring-2 ring-blue-500' : ''} ${
          isEditable ? 'hover:shadow-md border-dashed border-blue-300' : ''
        }`}
        onClick={() => isEditable && setSelectedWidget(widget)}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{widget.title}</span>
            </div>
            {isEditable && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Settings className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {widget.type === 'metric' && widget.data && (
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: widget.config.color }}>
                {widget.data[0]?.value?.toLocaleString()}
              </div>
              {widget.data[0]?.change && (
                <div className={`text-sm ${widget.data[0].trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {widget.data[0].trend === 'up' ? '↗' : '↘'} {Math.abs(widget.data[0].change)}%
                </div>
              )}
            </div>
          )}
          
          {widget.type === 'chart' && widget.config.chartType === 'bar' && (
            <div className="space-y-2">
              {widget.data?.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm w-20 truncate">{Object.values(item)[0]}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(Object.values(item)[1] as number / Math.max(...widget.data!.map(d => Object.values(d)[1] as number))) * 100}%`,
                        backgroundColor: widget.config.color 
                      }}
                    />
                  </div>
                  <span className="text-sm w-12 text-right">{Object.values(item)[1]}</span>
                </div>
              ))}
            </div>
          )}
          
          {widget.type === 'chart' && widget.config.chartType === 'pie' && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              {widget.data?.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  />
                  <span className="truncate">{Object.values(item)[0]}</span>
                  <span>{Object.values(item)[1]}</span>
                </div>
              ))}
            </div>
          )}
          
          {widget.type === 'table' && (
            <div className="space-y-2">
              {widget.data?.slice(0, 3).map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 text-sm border-b pb-1">
                  <span className="font-medium truncate">{Object.values(item)[0]}</span>
                  <span className="text-center">{Object.values(item)[1]}</span>
                  <span className="text-right">{Object.values(item)[2]}</span>
                </div>
              ))}
            </div>
          )}
          
          {widget.lastUpdated && (
            <div className="text-xs text-gray-500 mt-3 pt-2 border-t">
              Updated: {new Date(widget.lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const DashboardGrid = ({ dashboard, isEditable = false }: { dashboard: Dashboard; isEditable?: boolean }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboard.widgets.map(widget => (
        <div 
          key={widget.id} 
          className={widget.config.size === 'large' ? 'md:col-span-2' : widget.config.size === 'small' ? 'md:col-span-1' : ''}
        >
          <WidgetCard widget={widget} isEditable={isEditable} />
        </div>
      ))}
      {isEditable && (
        <Card 
          className="border-dashed border-2 border-gray-300 hover:border-blue-400 cursor-pointer flex items-center justify-center min-h-[200px]"
          onClick={() => setIsAddWidgetOpen(true)}
        >
          <div className="text-center text-gray-500">
            <Plus className="h-8 w-8 mx-auto mb-2" />
            <p>Add Widget</p>
          </div>
        </Card>
      )}
    </div>
  );

  const WidgetConfigPanel = () => {
    if (!selectedWidget) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Widget Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="widgetTitle">Widget Title</Label>
            <Input id="widgetTitle" defaultValue={selectedWidget.title} />
          </div>
          
          <div>
            <Label htmlFor="widgetType">Widget Type</Label>
            <Select defaultValue={selectedWidget.type}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric</SelectItem>
                <SelectItem value="chart">Chart</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="filter">Filter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedWidget.type === 'chart' && (
            <div>
              <Label htmlFor="chartType">Chart Type</Label>
              <Select defaultValue={selectedWidget.config.chartType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                  <SelectItem value="gauge">Gauge</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <Label htmlFor="dataSource">Data Source</Label>
            <Select defaultValue={selectedWidget.config.dataSource}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="contacts">Contacts</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
                <SelectItem value="campaigns">Campaigns</SelectItem>
                <SelectItem value="deals">Deals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="timeRange">Time Range</Label>
            <Select defaultValue={selectedWidget.config.timeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-quarter">This Quarter</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="widgetSize">Widget Size</Label>
            <Select defaultValue={selectedWidget.config.size}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="widgetColor">Color</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="widgetColor" 
                type="color" 
                defaultValue={selectedWidget.config.color} 
                className="w-12 h-8"
              />
              <Input defaultValue={selectedWidget.config.color} className="flex-1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Styling Options</Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="fontSize">Font Size</Label>
                <Slider defaultValue={[14]} max={24} min={10} step={1} />
              </div>
              <div>
                <Label htmlFor="alignment">Text Alignment</Label>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4 border-t">
            <Button size="sm" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const AddWidgetDialog = () => (
    <Dialog open={isAddWidgetOpen} onOpenChange={setIsAddWidgetOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Widget</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Widget Type</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {Object.entries(widgetTypeIcons).map(([type, Icon]) => (
                  <Card key={type} className="cursor-pointer hover:bg-gray-50">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium capitalize">{type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="newTitle">Widget Title</Label>
              <Input id="newTitle" placeholder="Enter widget title" />
            </div>
            
            <div>
              <Label htmlFor="newDataSource">Data Source</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leads">Leads</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="activities">Activities</SelectItem>
                  <SelectItem value="campaigns">Campaigns</SelectItem>
                  <SelectItem value="deals">Deals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="newMetrics">Metrics</Label>
              <div className="space-y-2 mt-2">
                {['Count', 'Sum', 'Average', 'Min', 'Max', 'Conversion Rate'].map(metric => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox />
                    <Label>{metric}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label>Chart Type (for chart widgets)</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {Object.entries(chartTypeIcons).map(([type, Icon]) => (
                  <Card key={type} className="cursor-pointer hover:bg-gray-50">
                    <CardContent className="p-3 text-center">
                      <Icon className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                      <p className="text-xs capitalize">{type}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="newDimensions">Dimensions</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="source">Source</SelectItem>
                  <SelectItem value="industry">Industry</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                  <SelectItem value="assigned_to">Assigned To</SelectItem>
                  <SelectItem value="created_date">Created Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="newTimeRange">Time Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Filters</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="status">Status</SelectItem>
                      <SelectItem value="source">Source</SelectItem>
                      <SelectItem value="score">Score</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Op" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="greater">Greater</SelectItem>
                      <SelectItem value="less">Less</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value" className="flex-1" />
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="bg-white rounded border p-4 text-center text-gray-500">
                Widget preview will appear here
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setIsAddWidgetOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddWidgetOpen(false)}>
            Add Widget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const DashboardList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Dashboards</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDashboards.map(dashboard => (
          <Card key={dashboard.id} className="cursor-pointer hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{dashboard.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{dashboard.description}</p>
                  <Badge className={categoryColors[dashboard.category]}>{dashboard.category}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Share className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Widgets</p>
                  <p className="font-medium">{dashboard.widgets.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">Layout</p>
                  <p className="font-medium capitalize">{dashboard.layout}</p>
                </div>
                <div>
                  <p className="text-gray-600">Shared</p>
                  <p className="font-medium">{dashboard.sharing.users.length + dashboard.sharing.teams.length} users</p>
                </div>
                <div>
                  <p className="text-gray-600">Updated</p>
                  <p className="font-medium">{new Date(dashboard.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {dashboard.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                  {dashboard.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{dashboard.tags.length - 3}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {dashboard.isPublic && <Badge variant="outline" className="text-xs">Public</Badge>}
                  {dashboard.isTemplate && <Badge variant="outline" className="text-xs">Template</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const TemplateLibrary = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Report Templates</h3>
        <Button onClick={() => setIsTemplateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <Badge className={categoryColors[template.category.split('-')[0] as keyof typeof categoryColors] || categoryColors.custom}>
                    {template.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{template.rating}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {template.usageCount} uses
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium">Includes:</div>
                <div className="text-sm text-gray-600">
                  • {template.widgets.length} pre-configured widgets
                </div>
                <div className="text-sm text-gray-600">
                  • Responsive layout design
                </div>
                <div className="text-sm text-gray-600">
                  • Ready-to-use filters and metrics
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Builder</h1>
              <p className="text-gray-600">Create custom dashboards and analytics reports</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedTab === 'builder' && (
              <div className="flex items-center gap-2">
                <Button
                  variant={builderMode === 'design' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBuilderMode('design')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Design
                </Button>
                <Button
                  variant={builderMode === 'preview' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setBuilderMode('preview')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsDashboardSettingsOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="builder">Dashboard Builder</TabsTrigger>
              <TabsTrigger value="dashboards">My Dashboards</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-6">
              {selectedDashboard && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{selectedDashboard.name}</h2>
                      <p className="text-gray-600">{selectedDashboard.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Data
                      </Button>
                    </div>
                  </div>
                  
                  <DashboardGrid dashboard={selectedDashboard} isEditable={builderMode === 'design'} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="dashboards">
              <DashboardList />
            </TabsContent>

            <TabsContent value="templates">
              <TemplateLibrary />
            </TabsContent>
          </Tabs>
        </div>

        {selectedTab === 'builder' && builderMode === 'design' && (
          <div className="w-80 border-l bg-white p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Widget Library</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(widgetTypeIcons).map(([type, Icon]) => (
                    <Card key={type} className="cursor-pointer hover:bg-gray-50" onClick={() => setIsAddWidgetOpen(true)}>
                      <CardContent className="p-3 text-center">
                        <Icon className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                        <p className="text-xs capitalize">{type}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <WidgetConfigPanel />
            </div>
          </div>
        )}
      </div>

      <AddWidgetDialog />
    </div>
  );
}
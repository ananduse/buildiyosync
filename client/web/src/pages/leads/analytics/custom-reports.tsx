import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { 
  FileText,
  Plus,
  Save,
  Download,
  Search,
  Filter,
  RefreshCw,
  Settings,
  Eye,
  Play,
  Share,
  Copy,
  Trash2,
  Edit,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  Table,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Target,
  Layers,
  Columns,
  Grid,
  List,
  ChevronRight,
  ChevronDown,
  Code,
  FileCode,
  Zap,
  AlertCircle,
  CheckCircle,
  Info,
  HelpCircle,
  Wand2,
  Sparkles,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCcw,
  ArrowUpDown,
  ArrowLeftRight,
  Calculator,
  Sigma,
  Percent,
  Hash,
  Type,
  CalendarDays,
  MapPin,
  Building,
  Phone,
  Mail
} from 'lucide-react';

interface CustomReport {
  id: string;
  name: string;
  description: string;
  type: 'query' | 'visual' | 'tabular' | 'dashboard' | 'export';
  status: 'draft' | 'testing' | 'active' | 'archived';
  createdBy: string;
  createdAt: string;
  lastModified: string;
  lastExecuted?: string;
  executionCount: number;
  averageExecutionTime: number;
  dataSource: {
    tables: string[];
    joins: string[];
    filters: FilterCondition[];
    aggregations: Aggregation[];
    groupBy: string[];
    orderBy: OrderBy[];
    limit?: number;
  };
  visualization: {
    type: 'table' | 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap' | 'gauge' | 'map';
    config: any;
  };
  schedule?: {
    enabled: boolean;
    frequency: string;
    recipients: string[];
  };
  permissions: {
    public: boolean;
    sharedWith: string[];
    canEdit: string[];
  };
}

interface FilterCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater' | 'less' | 'between' | 'in' | 'not_in';
  value: any;
  dataType: 'string' | 'number' | 'date' | 'boolean';
  isParameter?: boolean;
}

interface Aggregation {
  field: string;
  function: 'sum' | 'avg' | 'count' | 'min' | 'max' | 'distinct' | 'median' | 'mode';
  alias?: string;
}

interface OrderBy {
  field: string;
  direction: 'asc' | 'desc';
}

interface DataField {
  name: string;
  displayName: string;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'json';
  category: 'dimension' | 'metric' | 'datetime';
  table: string;
  description: string;
  isCalculated?: boolean;
  formula?: string;
}

interface SavedQuery {
  id: string;
  name: string;
  sql: string;
  parameters: any[];
  lastUsed: string;
  usageCount: number;
}

const CustomReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<CustomReport | null>(null);
  const [queryMode, setQueryMode] = useState<'visual' | 'sql'>('visual');
  const [sqlQuery, setSqlQuery] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Mock data for custom reports
  const customReports: CustomReport[] = [
    {
      id: 'custom-1',
      name: 'High-Value Lead Analysis',
      description: 'Analysis of leads with score > 80 and potential value > $50K',
      type: 'visual',
      status: 'active',
      createdBy: 'sarah@company.com',
      createdAt: '2024-01-10T10:00:00Z',
      lastModified: '2024-01-15T14:30:00Z',
      lastExecuted: '2024-01-15T16:00:00Z',
      executionCount: 47,
      averageExecutionTime: 3.2,
      dataSource: {
        tables: ['leads', 'activities', 'companies'],
        joins: ['leads.company_id = companies.id', 'leads.id = activities.lead_id'],
        filters: [
          { field: 'lead_score', operator: 'greater', value: 80, dataType: 'number' },
          { field: 'potential_value', operator: 'greater', value: 50000, dataType: 'number' }
        ],
        aggregations: [
          { field: 'lead_id', function: 'count', alias: 'total_leads' },
          { field: 'potential_value', function: 'sum', alias: 'total_value' }
        ],
        groupBy: ['industry', 'source'],
        orderBy: [{ field: 'total_value', direction: 'desc' }],
        limit: 100
      },
      visualization: {
        type: 'bar',
        config: {
          xAxis: 'industry',
          yAxis: 'total_value',
          color: 'source'
        }
      },
      permissions: {
        public: false,
        sharedWith: ['sales-team', 'marketing-team'],
        canEdit: ['sarah@company.com']
      }
    },
    {
      id: 'custom-2',
      name: 'Conversion Rate by Campaign',
      description: 'Compare conversion rates across different marketing campaigns',
      type: 'query',
      status: 'active',
      createdBy: 'mike@company.com',
      createdAt: '2024-01-08T09:00:00Z',
      lastModified: '2024-01-14T11:00:00Z',
      lastExecuted: '2024-01-15T15:30:00Z',
      executionCount: 89,
      averageExecutionTime: 2.1,
      dataSource: {
        tables: ['leads', 'campaigns', 'conversions'],
        joins: ['leads.campaign_id = campaigns.id', 'leads.id = conversions.lead_id'],
        filters: [
          { field: 'campaign_date', operator: 'between', value: ['2024-01-01', '2024-01-31'], dataType: 'date' }
        ],
        aggregations: [
          { field: 'lead_id', function: 'count', alias: 'total_leads' },
          { field: 'conversion_id', function: 'count', alias: 'conversions' }
        ],
        groupBy: ['campaign_name', 'campaign_type'],
        orderBy: [{ field: 'conversions', direction: 'desc' }]
      },
      visualization: {
        type: 'table',
        config: {
          columns: ['campaign_name', 'campaign_type', 'total_leads', 'conversions', 'conversion_rate'],
          formatting: {
            conversion_rate: { type: 'percentage', decimals: 1 }
          }
        }
      },
      schedule: {
        enabled: true,
        frequency: 'weekly',
        recipients: ['marketing-team@company.com']
      },
      permissions: {
        public: true,
        sharedWith: [],
        canEdit: ['mike@company.com', 'admin@company.com']
      }
    },
    {
      id: 'custom-3',
      name: 'Regional Sales Performance',
      description: 'Sales metrics broken down by region with YoY comparison',
      type: 'dashboard',
      status: 'testing',
      createdBy: 'lisa@company.com',
      createdAt: '2024-01-12T13:00:00Z',
      lastModified: '2024-01-15T09:00:00Z',
      executionCount: 23,
      averageExecutionTime: 5.8,
      dataSource: {
        tables: ['deals', 'regions', 'users'],
        joins: ['deals.region_id = regions.id', 'deals.owner_id = users.id'],
        filters: [],
        aggregations: [
          { field: 'deal_value', function: 'sum', alias: 'revenue' },
          { field: 'deal_id', function: 'count', alias: 'deal_count' },
          { field: 'deal_value', function: 'avg', alias: 'avg_deal_size' }
        ],
        groupBy: ['region_name', 'quarter'],
        orderBy: [{ field: 'revenue', direction: 'desc' }]
      },
      visualization: {
        type: 'map',
        config: {
          geoField: 'region_name',
          valueField: 'revenue',
          colorScale: 'sequential'
        }
      },
      permissions: {
        public: false,
        sharedWith: ['executive-team'],
        canEdit: ['lisa@company.com']
      }
    }
  ];

  // Mock data for available fields
  const availableFields: DataField[] = [
    // Lead fields
    { name: 'lead_id', displayName: 'Lead ID', dataType: 'string', category: 'dimension', table: 'leads', description: 'Unique identifier for leads' },
    { name: 'lead_name', displayName: 'Lead Name', dataType: 'string', category: 'dimension', table: 'leads', description: 'Name of the lead' },
    { name: 'lead_score', displayName: 'Lead Score', dataType: 'number', category: 'metric', table: 'leads', description: 'Calculated lead score' },
    { name: 'potential_value', displayName: 'Potential Value', dataType: 'number', category: 'metric', table: 'leads', description: 'Estimated deal value' },
    { name: 'created_date', displayName: 'Created Date', dataType: 'date', category: 'datetime', table: 'leads', description: 'Date lead was created' },
    { name: 'status', displayName: 'Status', dataType: 'string', category: 'dimension', table: 'leads', description: 'Current lead status' },
    { name: 'source', displayName: 'Source', dataType: 'string', category: 'dimension', table: 'leads', description: 'Lead source channel' },
    { name: 'industry', displayName: 'Industry', dataType: 'string', category: 'dimension', table: 'leads', description: 'Industry classification' },
    
    // Company fields
    { name: 'company_name', displayName: 'Company Name', dataType: 'string', category: 'dimension', table: 'companies', description: 'Company name' },
    { name: 'company_size', displayName: 'Company Size', dataType: 'string', category: 'dimension', table: 'companies', description: 'Employee count range' },
    { name: 'annual_revenue', displayName: 'Annual Revenue', dataType: 'number', category: 'metric', table: 'companies', description: 'Company annual revenue' },
    
    // Activity fields
    { name: 'activity_count', displayName: 'Activity Count', dataType: 'number', category: 'metric', table: 'activities', description: 'Number of activities' },
    { name: 'last_activity_date', displayName: 'Last Activity', dataType: 'date', category: 'datetime', table: 'activities', description: 'Date of last activity' },
    
    // Calculated fields
    { name: 'conversion_rate', displayName: 'Conversion Rate', dataType: 'number', category: 'metric', table: 'calculated', description: 'Lead to customer conversion rate', isCalculated: true, formula: 'conversions / leads * 100' },
    { name: 'days_in_pipeline', displayName: 'Days in Pipeline', dataType: 'number', category: 'metric', table: 'calculated', description: 'Days from creation to close', isCalculated: true, formula: 'DATEDIFF(close_date, created_date)' }
  ];

  // Mock saved queries
  const savedQueries: SavedQuery[] = [
    {
      id: 'query-1',
      name: 'Top Performing Leads',
      sql: 'SELECT lead_name, lead_score, potential_value FROM leads WHERE lead_score > 70 ORDER BY potential_value DESC LIMIT 20',
      parameters: [],
      lastUsed: '2024-01-15T14:00:00Z',
      usageCount: 34
    },
    {
      id: 'query-2',
      name: 'Monthly Conversion Analysis',
      sql: 'SELECT DATE_TRUNC(\'month\', created_date) as month, COUNT(*) as leads, SUM(CASE WHEN status = \'Won\' THEN 1 ELSE 0 END) as conversions FROM leads GROUP BY month',
      parameters: [],
      lastUsed: '2024-01-14T10:00:00Z',
      usageCount: 67
    }
  ];

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType) {
      case 'string': return Type;
      case 'number': return Hash;
      case 'date': return CalendarDays;
      case 'boolean': return CheckCircle;
      default: return Database;
    }
  };

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case 'table': return Table;
      case 'bar': return BarChart3;
      case 'line': return LineChart;
      case 'pie': return PieChart;
      case 'map': return MapPin;
      default: return Grid;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAggregationIcon = (func: string) => {
    switch (func) {
      case 'sum': return Sigma;
      case 'avg': return Calculator;
      case 'count': return Hash;
      case 'distinct': return Layers;
      default: return Database;
    }
  };

  const executeReport = (reportId: string) => {
    console.log(`Executing report: ${reportId}`);
  };

  const saveReport = () => {
    console.log('Saving report...');
  };

  const deleteReport = (reportId: string) => {
    console.log(`Deleting report: ${reportId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Custom Reports</h1>
          <p className="text-muted-foreground">Create and manage custom reports with advanced query builder</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsCreatingNew(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">My Reports</TabsTrigger>
          <TabsTrigger value="builder">Query Builder</TabsTrigger>
          <TabsTrigger value="saved-queries">Saved Queries</TabsTrigger>
          <TabsTrigger value="help">Help & Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search custom reports..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customReports.map((report) => {
              const VisualizationIcon = getVisualizationIcon(report.visualization.type);
              
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <VisualizationIcon className="h-5 w-5 text-gray-600" />
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Executions</p>
                        <p className="font-medium">{report.executionCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Time</p>
                        <p className="font-medium">{report.averageExecutionTime}s</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tables</p>
                        <p className="font-medium">{report.dataSource.tables.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium capitalize">{report.type}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {report.dataSource.tables.map(table => (
                        <Badge key={table} variant="outline" className="text-xs">
                          {table}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last executed: {report.lastExecuted ? new Date(report.lastExecuted).toLocaleDateString() : 'Never'}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => executeReport(report.id)}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Run
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteReport(report.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          {/* Query Builder Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
              <Button
                variant={queryMode === 'visual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setQueryMode('visual')}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Visual Builder
              </Button>
              <Button
                variant={queryMode === 'sql' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setQueryMode('sql')}
              >
                <Code className="h-4 w-4 mr-2" />
                SQL Editor
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={saveReport}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {queryMode === 'visual' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Fields Selection */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base">Available Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input placeholder="Search fields..." className="mb-3" />
                    
                    {['dimension', 'metric', 'datetime'].map(category => (
                      <div key={category}>
                        <h4 className="font-medium text-sm mb-2 capitalize">{category}s</h4>
                        <div className="space-y-1">
                          {availableFields
                            .filter(f => f.category === category)
                            .slice(0, 5)
                            .map(field => {
                              const Icon = getDataTypeIcon(field.dataType);
                              return (
                                <div
                                  key={field.name}
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                                  onClick={() => setSelectedFields([...selectedFields, field.name])}
                                >
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-3 w-3 text-gray-500" />
                                    <span className="text-sm">{field.displayName}</span>
                                  </div>
                                  <Plus className="h-3 w-3" />
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Query Configuration */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Query Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selected Fields */}
                  <div>
                    <Label>Selected Fields</Label>
                    <div className="mt-2 p-3 border rounded-lg min-h-[60px]">
                      {selectedFields.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedFields.map(field => (
                            <Badge key={field} variant="secondary">
                              {field}
                              <button
                                className="ml-1"
                                onClick={() => setSelectedFields(selectedFields.filter(f => f !== field))}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Drag fields here or click to add
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Filters */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Filters</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters([...filters, { field: '', operator: 'equals', value: '', dataType: 'string' }])}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Filter
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {filters.map((filter, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Select>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableFields.map(field => (
                                <SelectItem key={field.name} value={field.name}>
                                  {field.displayName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not_equals">Not Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="greater">Greater Than</SelectItem>
                              <SelectItem value="less">Less Than</SelectItem>
                              <SelectItem value="between">Between</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="Value" className="flex-1" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFilters(filters.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Aggregations */}
                  <div>
                    <Label>Aggregations</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {['sum', 'avg', 'count', 'min', 'max', 'distinct'].map(func => {
                        const Icon = getAggregationIcon(func);
                        return (
                          <div key={func} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                            <Icon className="h-3 w-3" />
                            <span className="text-sm capitalize">{func}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grouping */}
                  <div>
                    <Label>Group By</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grouping field" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFields
                          .filter(f => f.category === 'dimension')
                          .map(field => (
                            <SelectItem key={field.name} value={field.name}>
                              {field.displayName}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Visualization Type */}
                  <div>
                    <Label>Visualization</Label>
                    <RadioGroup defaultValue="table" className="mt-2">
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { value: 'table', icon: Table, label: 'Table' },
                          { value: 'bar', icon: BarChart3, label: 'Bar Chart' },
                          { value: 'line', icon: LineChart, label: 'Line Chart' },
                          { value: 'pie', icon: PieChart, label: 'Pie Chart' }
                        ].map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                              <option.icon className="h-4 w-4" />
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">SQL Editor</CardTitle>
                <CardDescription>Write custom SQL queries directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="SELECT * FROM leads WHERE..."
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="font-mono text-sm min-h-[300px]"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Database className="h-4 w-4 mr-2" />
                      Schema
                    </Button>
                    <Button variant="outline" size="sm">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      SQL Help
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Validate
                    </Button>
                    <Button size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved-queries" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Queries</CardTitle>
              <CardDescription>
                Frequently used queries for quick access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedQueries.map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{query.name}</h4>
                      <p className="text-sm text-muted-foreground font-mono truncate">
                        {query.sql}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Used {query.usageCount} times</span>
                        <span>Last used: {new Date(query.lastUsed).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Query Builder Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Query Structure</h4>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                    SELECT fields<br />
                    FROM table<br />
                    WHERE conditions<br />
                    GROUP BY grouping<br />
                    ORDER BY sorting
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Common Functions</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• COUNT(*) - Count all rows</li>
                    <li>• SUM(field) - Sum numeric values</li>
                    <li>• AVG(field) - Calculate average</li>
                    <li>• DATE_TRUNC('month', date) - Group by month</li>
                    <li>• CASE WHEN condition THEN value - Conditional logic</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Join Types</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• INNER JOIN - Matching records in both tables</li>
                    <li>• LEFT JOIN - All records from left table</li>
                    <li>• RIGHT JOIN - All records from right table</li>
                    <li>• FULL JOIN - All records from both tables</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  Example Queries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Lead Conversion Rate by Source</h4>
                  <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                    SELECT source,<br />
                    &nbsp;&nbsp;COUNT(*) as total_leads,<br />
                    &nbsp;&nbsp;SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) as conversions,<br />
                    &nbsp;&nbsp;ROUND(SUM(CASE WHEN status = 'Won' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as conversion_rate<br />
                    FROM leads<br />
                    GROUP BY source<br />
                    ORDER BY conversion_rate DESC
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Monthly Revenue Trend</h4>
                  <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                    SELECT DATE_TRUNC('month', close_date) as month,<br />
                    &nbsp;&nbsp;SUM(deal_value) as revenue,<br />
                    &nbsp;&nbsp;COUNT(*) as deals<br />
                    FROM deals<br />
                    WHERE status = 'Won'<br />
                    GROUP BY month<br />
                    ORDER BY month DESC
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomReports;
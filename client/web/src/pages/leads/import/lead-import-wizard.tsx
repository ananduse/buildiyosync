import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  BarChart3,
  TrendingUp,
  Facebook,
  Target,
  Linkedin,
  Globe,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Download,
  Eye,
  EyeOff,
  Settings,
  Users,
  UserCheck,
  Mail,
  Clock,
  Play,
  Pause,
  X,
  RotateCcw,
  Copy,
  Filter,
  Search,
  MapPin,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  Tag,
  Zap,
  Shield,
  Database,
  FileUp,
  Trash2,
  Edit,
  Plus,
  Minus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Types
interface ImportSource {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'file' | 'external' | 'api';
  maxSize?: string;
  supportedFormats?: string[];
}

interface ValidationIssue {
  row: number;
  column: string;
  issue: 'missing_required' | 'invalid_format' | 'duplicate' | 'validation_error';
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestedFix?: string;
}

interface FieldMapping {
  sourceColumn: string;
  targetField: string;
  transformation?: 'uppercase' | 'lowercase' | 'title_case' | 'date_format';
  defaultValue?: string;
  skip?: boolean;
}

interface DuplicateRule {
  field: 'email' | 'phone' | 'company' | 'custom';
  action: 'skip' | 'update' | 'create' | 'merge';
  customCombination?: string[];
}

interface ImportSettings {
  assignmentRule: 'auto' | 'specific' | 'round_robin' | 'unassigned';
  assignedUser?: string;
  defaultStatus: string;
  defaultSource: string;
  applyScoring: boolean;
  sendWelcomeEmail: boolean;
  createFollowUpTasks: boolean;
  notifyAssignedUsers: boolean;
  sendSummaryToAdmin: boolean;
  emailImportReport: boolean;
}

interface ImportResult {
  totalProcessed: number;
  successfullyImported: number;
  updated: number;
  failed: number;
  skipped: number;
  errors: Array<{ row: number; message: string }>;
}

const importSources: ImportSource[] = [
  {
    id: 'csv',
    name: 'CSV File',
    description: 'Upload comma-separated values file',
    icon: FileText,
    type: 'file',
    maxSize: '25MB',
    supportedFormats: ['.csv']
  },
  {
    id: 'excel',
    name: 'Excel File',
    description: 'Upload Excel spreadsheet',
    icon: BarChart3,
    type: 'file',
    maxSize: '25MB',
    supportedFormats: ['.xlsx', '.xls']
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Import from Google Sheets',
    icon: TrendingUp,
    type: 'external',
  },
  {
    id: 'facebook-leads',
    name: 'Facebook Leads',
    description: 'Import Facebook lead ads',
    icon: Facebook,
    type: 'external',
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Import Google Ads leads',
    icon: Target,
    type: 'external',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Import LinkedIn leads',
    icon: Linkedin,
    type: 'external',
  },
  {
    id: 'website-forms',
    name: 'Website Forms',
    description: 'Import from website forms',
    icon: Globe,
    type: 'external',
  },
  {
    id: 'other-crm',
    name: 'Other CRM',
    description: 'Import from another CRM',
    icon: RefreshCw,
    type: 'external',
  },
  {
    id: 'api',
    name: 'API Import',
    description: 'Import via API endpoint',
    icon: Database,
    type: 'api',
  }
];

const targetFields = [
  { id: 'firstName', label: 'First Name', required: true, type: 'text' },
  { id: 'lastName', label: 'Last Name', required: true, type: 'text' },
  { id: 'email', label: 'Email', required: true, type: 'email' },
  { id: 'phone', label: 'Phone', required: true, type: 'phone' },
  { id: 'company', label: 'Company', required: false, type: 'text' },
  { id: 'designation', label: 'Designation', required: false, type: 'text' },
  { id: 'address', label: 'Address', required: false, type: 'text' },
  { id: 'city', label: 'City', required: false, type: 'text' },
  { id: 'state', label: 'State', required: false, type: 'text' },
  { id: 'country', label: 'Country', required: false, type: 'text' },
  { id: 'pincode', label: 'Pincode', required: false, type: 'text' },
  { id: 'budget', label: 'Budget', required: false, type: 'number' },
  { id: 'projectType', label: 'Project Type', required: false, type: 'text' },
  { id: 'source', label: 'Lead Source', required: false, type: 'text' },
  { id: 'notes', label: 'Notes', required: false, type: 'textarea' },
];

const users = [
  { id: 'user1', name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg' },
  { id: 'user2', name: 'Mike Chen', avatar: '/avatars/mike.jpg' },
  { id: 'user3', name: 'Lisa Wang', avatar: '/avatars/lisa.jpg' },
  { id: 'user4', name: 'David Brown', avatar: '/avatars/david.jpg' },
];

const leadStatuses = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
];

const leadSources = [
  { value: 'import', label: 'Import' },
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
];

// Mock preview data
const mockPreviewData = [
  { 'First Name': 'John', 'Last Name': 'Smith', 'Email': 'john@example.com', 'Phone': '+1-555-0123', 'Company': 'Acme Corp' },
  { 'First Name': 'Jane', 'Last Name': 'Doe', 'Email': 'jane@example.com', 'Phone': '+1-555-0456', 'Company': 'TechStart Inc' },
  { 'First Name': 'Bob', 'Last Name': 'Johnson', 'Email': 'bob@example.com', 'Phone': '+1-555-0789', 'Company': 'Global Industries' },
];

const mockValidationIssues: ValidationIssue[] = [
  {
    row: 2,
    column: 'Email',
    issue: 'invalid_format',
    severity: 'error',
    message: 'Invalid email format',
    suggestedFix: 'Correct email format: user@example.com'
  },
  {
    row: 5,
    column: 'Phone',
    issue: 'missing_required',
    severity: 'error',
    message: 'Phone number is required',
    suggestedFix: 'Add phone number'
  },
  {
    row: 8,
    column: 'Email',
    issue: 'duplicate',
    severity: 'warning',
    message: 'Duplicate email address',
    suggestedFix: 'Review duplicate entry'
  },
];

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  const steps = [
    { number: 1, title: 'Choose Source', icon: Upload },
    { number: 2, title: 'Preview & Validate', icon: Eye },
    { number: 3, title: 'Field Mapping', icon: RefreshCw },
    { number: 4, title: 'Duplicate Handling', icon: Copy },
    { number: 5, title: 'Import Settings', icon: Settings },
    { number: 6, title: 'Import Progress', icon: TrendingUp },
    { number: 7, title: 'Summary', icon: CheckCircle },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const Icon = step.icon;
          
          return (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                  isActive && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                  isCompleted && "bg-emerald-500 text-white",
                  !isActive && !isCompleted && "bg-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-xs font-medium",
                  isActive && "text-primary",
                  isCompleted && "text-emerald-600",
                  !isActive && !isCompleted && "text-gray-400"
                )}>
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function LeadImportWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState(mockPreviewData);
  const [validationIssues, setValidationIssues] = useState(mockValidationIssues);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  const [duplicateRules, setDuplicateRules] = useState<DuplicateRule>({
    field: 'email',
    action: 'skip'
  });
  const [importSettings, setImportSettings] = useState<ImportSettings>({
    assignmentRule: 'auto',
    defaultStatus: 'new',
    defaultSource: 'import',
    applyScoring: true,
    sendWelcomeEmail: false,
    createFollowUpTasks: false,
    notifyAssignedUsers: true,
    sendSummaryToAdmin: true,
    emailImportReport: true
  });
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importPaused, setImportPaused] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((file: File) => {
    setUploadedFile(file);
    // Simulate file processing
    console.log('Processing file:', file.name);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startImport = () => {
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setImportResults({
            totalProcessed: 150,
            successfullyImported: 142,
            updated: 5,
            failed: 2,
            skipped: 1,
            errors: [
              { row: 15, message: 'Invalid email format' },
              { row: 23, message: 'Missing required field: phone' }
            ]
          });
          handleNext(); // Go to summary step
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  // Step 1: Choose Import Source
  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="h-5 w-5 mr-2" />
          Choose Import Source
        </CardTitle>
        <CardDescription>
          Select how you want to import your leads
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="external">External Sources</TabsTrigger>
            <TabsTrigger value="api">API Import</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {importSources.filter(s => s.type === 'file').map((source) => {
                const Icon = source.icon;
                return (
                  <Card
                    key={source.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedSource === source.id && "ring-2 ring-primary bg-primary/5"
                    )}
                    onClick={() => setSelectedSource(source.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-12 w-12 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold">{source.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{source.description}</p>
                      {source.maxSize && (
                        <Badge variant="secondary" className="mt-2">
                          Max {source.maxSize}
                        </Badge>
                      )}
                      {source.supportedFormats && (
                        <p className="text-xs text-gray-400 mt-1">
                          {source.supportedFormats.join(', ')}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {selectedSource && importSources.find(s => s.id === selectedSource)?.type === 'file' && (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <FileText className="h-12 w-12 mx-auto text-emerald-500" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" onClick={() => setUploadedFile(null)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Replace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <FileUp className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="font-medium">Drag & drop your file here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </div>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <div className="text-xs text-gray-400">
                      <p>Supported formats: CSV, Excel</p>
                      <p>Maximum file size: 25MB</p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>
            )}
            
            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Sample Template
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="external" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {importSources.filter(s => s.type === 'external').map((source) => {
                const Icon = source.icon;
                return (
                  <Card
                    key={source.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedSource === source.id && "ring-2 ring-primary bg-primary/5"
                    )}
                    onClick={() => setSelectedSource(source.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold">{source.name}</h3>
                          <p className="text-sm text-gray-500">{source.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {selectedSource && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  External integrations require authentication and may take a few moments to connect.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>API Endpoint URL</Label>
                  <Input placeholder="https://api.example.com/leads" />
                </div>
                <div className="space-y-2">
                  <Label>Authentication Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select authentication type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>API Key / Token</Label>
                  <Input type="password" placeholder="Enter your API key or token" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  // Step 2: Data Preview & Validation
  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Data Preview & Validation
          </CardTitle>
          <CardDescription>
            Review your data and resolve any issues before importing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">150</p>
                  <p className="text-sm text-gray-500">Total Rows</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-500">145</p>
                  <p className="text-sm text-gray-500">Valid Rows</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">3</p>
                  <p className="text-sm text-gray-500">Invalid Rows</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-500">2</p>
                  <p className="text-sm text-gray-500">Duplicate Rows</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Data Preview</TabsTrigger>
              <TabsTrigger value="issues">
                Validation Issues
                {validationIssues.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {validationIssues.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(previewData[0] || {}).map((header) => (
                        <TableHead key={header}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.slice(0, 10).map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, cellIndex) => (
                          <TableCell key={cellIndex}>{String(value)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Showing first 10 rows of {previewData.length} total rows
              </p>
            </TabsContent>
            
            <TabsContent value="issues">
              <div className="space-y-3">
                {validationIssues.map((issue, index) => (
                  <Alert key={index} variant={issue.severity === 'error' ? 'destructive' : 'default'}>
                    {issue.severity === 'error' && <AlertCircle className="h-4 w-4" />}
                    {issue.severity === 'warning' && <AlertCircle className="h-4 w-4 text-amber-500" />}
                    {issue.severity === 'info' && <Info className="h-4 w-4" />}
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            Row {issue.row}, Column "{issue.column}": {issue.message}
                          </p>
                          {issue.suggestedFix && (
                            <p className="text-sm text-gray-600 mt-1">
                              Suggestion: {issue.suggestedFix}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Fix
                          </Button>
                          <Button size="sm" variant="outline">
                            <EyeOff className="h-3 w-3 mr-1" />
                            Skip
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  // Step 3: Field Mapping
  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RefreshCw className="h-5 w-5 mr-2" />
          Field Mapping
        </CardTitle>
        <CardDescription>
          Map your source columns to target lead fields
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Smart Mapping Applied</span>
            <Badge variant="secondary">AI Suggested</Badge>
          </div>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Mappings
          </Button>
        </div>

        <div className="space-y-4">
          {Object.keys(previewData[0] || {}).map((sourceColumn) => {
            const suggestedField = targetFields.find(field => 
              field.label.toLowerCase().includes(sourceColumn.toLowerCase()) ||
              sourceColumn.toLowerCase().includes(field.label.toLowerCase())
            );
            
            return (
              <div key={sourceColumn} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{sourceColumn}</Badge>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sample: {String(previewData[0][sourceColumn as keyof typeof previewData[0]])}
                  </p>
                </div>
                
                <div className="flex-1">
                  <Select defaultValue={suggestedField?.id || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Skip this column</SelectItem>
                      <Separator />
                      {targetFields.map((field) => (
                        <SelectItem key={field.id} value={field.id}>
                          <div className="flex items-center space-x-2">
                            <span>{field.label}</span>
                            {field.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Transformation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No transformation</SelectItem>
                      <SelectItem value="uppercase">UPPERCASE</SelectItem>
                      <SelectItem value="lowercase">lowercase</SelectItem>
                      <SelectItem value="title_case">Title Case</SelectItem>
                      <SelectItem value="date_format">Date Format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-shrink-0">
                  <Input placeholder="Default value" className="w-32" />
                </div>
              </div>
            );
          })}
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <div className="flex justify-between items-center">
              <span>Create custom fields for unmapped columns</span>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Custom Field
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  // Step 4: Duplicate Handling
  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Copy className="h-5 w-5 mr-2" />
          Duplicate Handling
        </CardTitle>
        <CardDescription>
          Configure how to handle duplicate records
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Duplicate Detection By</Label>
            <p className="text-sm text-gray-500 mb-3">
              Choose which field(s) to use for detecting duplicates
            </p>
            <RadioGroup value={duplicateRules.field} onValueChange={(value: any) => 
              setDuplicateRules(prev => ({ ...prev, field: value }))
            }>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address (Primary)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company" className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Company Name</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Custom Combination</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium">Action for Duplicates</Label>
            <p className="text-sm text-gray-500 mb-3">
              What should happen when duplicates are found?
            </p>
            <RadioGroup value={duplicateRules.action} onValueChange={(value: any) =>
              setDuplicateRules(prev => ({ ...prev, action: value }))
            }>
              <div className="space-y-3">
                <div className="flex items-start space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="skip" id="skip" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="skip" className="font-medium">Skip Duplicate Rows</Label>
                    <p className="text-sm text-gray-500">Don't import duplicate records</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="update" id="update" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="update" className="font-medium">Update Existing Records</Label>
                    <p className="text-sm text-gray-500">Overwrite existing data with new values</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="create" id="create" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="create" className="font-medium">Create New Records Anyway</Label>
                    <p className="text-sm text-gray-500">Import all records, including duplicates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="merge" id="merge" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="merge" className="font-medium">Merge Information</Label>
                    <p className="text-sm text-gray-500">Combine new data with existing records</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">2 potential duplicates found</p>
                  <p className="text-sm text-gray-600">Based on email address matching</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Duplicates
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );

  // Step 5: Import Settings
  const renderStep5 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Import Settings
          </CardTitle>
          <CardDescription>
            Configure assignment rules and default values
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Assignment Rules */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Assignment Rules</Label>
              <p className="text-sm text-gray-500 mb-3">
                How should leads be assigned to team members?
              </p>
              <RadioGroup 
                value={importSettings.assignmentRule} 
                onValueChange={(value: any) => 
                  setImportSettings(prev => ({ ...prev, assignmentRule: value }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="auto" />
                  <Label htmlFor="auto">Auto-assign based on rules</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="specific" id="specific" />
                  <Label htmlFor="specific">Assign all to specific user</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round_robin" id="round_robin" />
                  <Label htmlFor="round_robin">Round-robin assignment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unassigned" id="unassigned" />
                  <Label htmlFor="unassigned">Keep as unassigned</Label>
                </div>
              </RadioGroup>
            </div>

            {importSettings.assignmentRule === 'specific' && (
              <div className="space-y-2">
                <Label>Assign to User</Label>
                <Select value={importSettings.assignedUser} onValueChange={(value) =>
                  setImportSettings(prev => ({ ...prev, assignedUser: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Lead Settings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Lead Settings</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Default Lead Status</Label>
                <Select value={importSettings.defaultStatus} onValueChange={(value) =>
                  setImportSettings(prev => ({ ...prev, defaultStatus: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {leadStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Default Lead Source</Label>
                <Select value={importSettings.defaultSource} onValueChange={(value) =>
                  setImportSettings(prev => ({ ...prev, defaultSource: value }))
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {leadSources.map((source) => (
                      <SelectItem key={source.value} value={source.value}>
                        {source.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Apply Lead Scoring</Label>
                  <p className="text-sm text-gray-500">Automatically calculate lead scores</p>
                </div>
                <Switch
                  checked={importSettings.applyScoring}
                  onCheckedChange={(checked) =>
                    setImportSettings(prev => ({ ...prev, applyScoring: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Welcome Emails</Label>
                  <p className="text-sm text-gray-500">Send welcome email to imported leads</p>
                </div>
                <Switch
                  checked={importSettings.sendWelcomeEmail}
                  onCheckedChange={(checked) =>
                    setImportSettings(prev => ({ ...prev, sendWelcomeEmail: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Create Follow-up Tasks</Label>
                  <p className="text-sm text-gray-500">Automatically create follow-up tasks</p>
                </div>
                <Switch
                  checked={importSettings.createFollowUpTasks}
                  onCheckedChange={(checked) =>
                    setImportSettings(prev => ({ ...prev, createFollowUpTasks: checked }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure who gets notified about the import
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notify Assigned Users</Label>
              <p className="text-sm text-gray-500">Email assigned users about new leads</p>
            </div>
            <Switch
              checked={importSettings.notifyAssignedUsers}
              onCheckedChange={(checked) =>
                setImportSettings(prev => ({ ...prev, notifyAssignedUsers: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Send Summary to Admin</Label>
              <p className="text-sm text-gray-500">Email import summary to administrators</p>
            </div>
            <Switch
              checked={importSettings.sendSummaryToAdmin}
              onCheckedChange={(checked) =>
                setImportSettings(prev => ({ ...prev, sendSummaryToAdmin: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Import Report</Label>
              <p className="text-sm text-gray-500">Send detailed import report via email</p>
            </div>
            <Switch
              checked={importSettings.emailImportReport}
              onCheckedChange={(checked) =>
                setImportSettings(prev => ({ ...prev, emailImportReport: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Step 6: Import Progress
  const renderStep6 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Import Progress
        </CardTitle>
        <CardDescription>
          Importing your leads...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(importProgress / 100) * 351.86} 351.86`}
                className="text-primary transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{Math.round(importProgress)}%</span>
            </div>
          </div>
          
          <div>
            <p className="text-lg font-semibold">
              Processing {Math.round((importProgress / 100) * 150)} of 150 records
            </p>
            <p className="text-sm text-gray-500">
              Please don't close this window while importing
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-emerald-500">
                {Math.round((importProgress / 100) * 142)}
              </p>
              <p className="text-sm text-gray-500">Processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-500">
                {Math.round((importProgress / 100) * 5)}
              </p>
              <p className="text-sm text-gray-500">Updated</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-500">
                {Math.round((importProgress / 100) * 2)}
              </p>
              <p className="text-sm text-gray-500">Failed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-amber-500">
                {Math.round((importProgress / 100) * 1)}
              </p>
              <p className="text-sm text-gray-500">Skipped</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Import Progress</span>
            <span className="text-sm text-gray-500">{Math.round(importProgress)}%</span>
          </div>
          <Progress value={importProgress} className="h-3" />
        </div>

        <ScrollArea className="h-48 border rounded-lg p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Started import process</span>
              <span className="text-gray-500 text-xs">00:00</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Validated field mappings</span>
              <span className="text-gray-500 text-xs">00:02</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span>Applied duplicate rules</span>
              <span className="text-gray-500 text-xs">00:05</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500 animate-spin" />
              <span>Importing lead records...</span>
              <span className="text-gray-500 text-xs">00:08</span>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-center space-x-3">
          {!isImporting ? (
            <Button onClick={startImport} size="lg">
              <Play className="h-4 w-4 mr-2" />
              Start Import
            </Button>
          ) : (
            <>
              {importPaused ? (
                <Button onClick={() => setImportPaused(false)}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setImportPaused(true)}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button variant="destructive" onClick={() => setIsImporting(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel Import
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Step 7: Import Summary
  const renderStep7 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
            Import Completed Successfully
          </CardTitle>
          <CardDescription>
            Your leads have been imported and are now available in your system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {importResults && (
            <>
              <div className="grid grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{importResults.totalProcessed}</p>
                    <p className="text-sm text-gray-500">Total Processed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-500">{importResults.successfullyImported}</p>
                    <p className="text-sm text-gray-500">Successfully Imported</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-500">{importResults.updated}</p>
                    <p className="text-sm text-gray-500">Updated</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-500">{importResults.failed}</p>
                    <p className="text-sm text-gray-500">Failed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-amber-500">{importResults.skipped}</p>
                    <p className="text-sm text-gray-500">Skipped</p>
                  </CardContent>
                </Card>
              </div>

              {importResults.errors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base text-red-600">Import Errors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {importResults.errors.map((error, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span>Row {error.row}: {error.message}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-center space-x-3">
                <Button onClick={() => navigate('/leads')}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Imported Leads
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Import Report
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Error Log
                </Button>
              </div>

              <div className="text-center">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Import More Leads
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50/50">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/leads')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Leads
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold">Lead Import Wizard</h1>
                <p className="text-sm text-gray-500">Import leads from various sources</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate('/leads')}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:px-6">
          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={7} />

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
            {currentStep === 7 && renderStep7()}
          </div>

          {/* Navigation */}
          {currentStep < 7 && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !selectedSource) ||
                  (currentStep === 6 && isImporting)
                }
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
import { useState, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeft as PrevIcon,
  Upload,
  Download,
  FileSpreadsheet,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  Settings,
  Users,
  Mail,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

const steps = [
  {
    id: 1,
    title: 'Upload File',
    description: 'Select and upload your lead data file',
    icon: Upload
  },
  {
    id: 2,
    title: 'Map Columns',
    description: 'Map your data columns to system fields',
    icon: Settings
  },
  {
    id: 3,
    title: 'Review & Validate',
    description: 'Review data and fix any errors',
    icon: Eye
  },
  {
    id: 4,
    title: 'Import Settings',
    description: 'Configure import preferences',
    icon: Settings
  },
  {
    id: 5,
    title: 'Import Progress',
    description: 'Monitor the import process',
    icon: Activity
  }
];

interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
  isRequired: boolean;
  skip: boolean;
}

interface ValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
  severity: 'error' | 'warning';
}

interface ImportStats {
  total: number;
  processed: number;
  successful: number;
  errors: number;
  duplicates: number;
}

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                isCompleted
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : isCurrent
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">{steps[currentStep - 1].title}</h2>
        <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
      </div>
    </div>
  );
}

function Step1UploadFile({ 
  onFileSelect, 
  selectedFile 
}: { 
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const file = files.find(f => 
      f.type === 'text/csv' || 
      f.type === 'application/vnd.ms-excel' ||
      f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    onFileSelect(file || null);
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  return (
    <div className="space-y-6">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {selectedFile ? selectedFile.name : 'Drop your file here or browse'}
        </h3>
        <p className="text-muted-foreground mb-4">
          Supported formats: CSV, Excel (.xlsx, .xls)
        </p>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" className="cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
        </label>
      </div>

      {selectedFile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              File Selected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">File Name:</span>
                <p className="font-medium">{selectedFile.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">File Size:</span>
                <p className="font-medium">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
              <div>
                <span className="text-muted-foreground">File Type:</span>
                <p className="font-medium">{selectedFile.type || 'Unknown'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last Modified:</span>
                <p className="font-medium">{new Date(selectedFile.lastModified).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Download Template</CardTitle>
          <CardDescription>
            Use our template to ensure your data is properly formatted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Step2MapColumns({ 
  columnMappings, 
  onMappingChange 
}: { 
  columnMappings: ColumnMapping[];
  onMappingChange: (mappings: ColumnMapping[]) => void;
}) {
  const sourceColumns = [
    'Company Name', 'Contact Name', 'Email', 'Phone', 'Project Type',
    'Budget Min', 'Budget Max', 'Location', 'Source', 'Notes'
  ];

  const targetFields = [
    { value: 'companyName', label: 'Company Name', required: true },
    { value: 'contactName', label: 'Contact Name', required: true },
    { value: 'email', label: 'Email Address', required: true },
    { value: 'phone', label: 'Phone Number', required: false },
    { value: 'projectType', label: 'Project Type', required: false },
    { value: 'budgetMin', label: 'Budget Minimum', required: false },
    { value: 'budgetMax', label: 'Budget Maximum', required: false },
    { value: 'location', label: 'Location', required: false },
    { value: 'leadSource', label: 'Lead Source', required: false },
    { value: 'notes', label: 'Notes', required: false },
  ];

  const updateMapping = (index: number, updates: Partial<ColumnMapping>) => {
    const newMappings = [...columnMappings];
    newMappings[index] = { ...newMappings[index], ...updates };
    onMappingChange(newMappings);
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Map your file columns to the corresponding system fields. Required fields are marked with *.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Column Mapping</CardTitle>
          <CardDescription>
            Match your file columns with system fields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Column</TableHead>
                <TableHead>Target Field</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {columnMappings.map((mapping, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {sourceColumns[index] || `Column ${index + 1}`}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={mapping.skip ? 'skip' : mapping.targetField}
                      onValueChange={(value) => {
                        if (value === 'skip') {
                          updateMapping(index, { skip: true, targetField: '' });
                        } else {
                          updateMapping(index, { skip: false, targetField: value });
                        }
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skip">Skip this column</SelectItem>
                        {targetFields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label} {field.required && '*'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {mapping.isRequired ? (
                      <Badge variant="destructive">Required</Badge>
                    ) : (
                      <Badge variant="secondary">Optional</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={mapping.skip}
                        onCheckedChange={(checked) => 
                          updateMapping(index, { skip: checked as boolean })
                        }
                      />
                      <Label className="text-sm">Skip</Label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Step3ReviewValidate({ 
  validationErrors,
  sampleData,
  onErrorFix
}: { 
  validationErrors: ValidationError[];
  sampleData: Record<string, string>[];
  onErrorFix: (rowIndex: number, column: string, newValue: string) => void;
}) {
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);

  const errorCount = validationErrors.filter(e => e.severity === 'error').length;
  const warningCount = validationErrors.filter(e => e.severity === 'warning').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{sampleData.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{errorCount}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{warningCount}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {validationErrors.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Validation Issues</CardTitle>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={showOnlyErrors}
                  onCheckedChange={setShowOnlyErrors}
                />
                <Label>Show only errors</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {validationErrors
                .filter(error => !showOnlyErrors || error.severity === 'error')
                .map((error, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    error.severity === 'error' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">
                        Row {error.row}, Column: {error.column}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Value: "{error.value}"
                      </p>
                      <p className="text-sm">{error.error}</p>
                    </div>
                    <Badge variant={error.severity === 'error' ? 'destructive' : 'secondary'}>
                      {error.severity}
                    </Badge>
                  </div>
                  {error.severity === 'error' && (
                    <div className="mt-2">
                      <Input
                        placeholder="Enter correct value"
                        className="w-48"
                        onBlur={(e) => onErrorFix(error.row, error.column, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Data Preview</CardTitle>
          <CardDescription>
            Preview of your data after mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.slice(0, 5).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.companyName}</TableCell>
                    <TableCell>{row.contactName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.projectType}</TableCell>
                    <TableCell>
                      {validationErrors.some(e => e.row === index + 1 && e.severity === 'error') ? (
                        <Badge variant="destructive">Error</Badge>
                      ) : validationErrors.some(e => e.row === index + 1 && e.severity === 'warning') ? (
                        <Badge variant="secondary">Warning</Badge>
                      ) : (
                        <Badge variant="default">Valid</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Step4ImportSettings({ 
  settings, 
  onSettingsChange 
}: { 
  settings: any;
  onSettingsChange: (settings: any) => void;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Duplicate Handling</CardTitle>
          <CardDescription>
            How should duplicate leads be handled?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={settings.duplicateHandling}
            onValueChange={(value) => onSettingsChange({ ...settings, duplicateHandling: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="skip" id="skip" />
              <Label htmlFor="skip">Skip duplicate records</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="update" id="update" />
              <Label htmlFor="update">Update existing records</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="create" id="create" />
              <Label htmlFor="create">Create new records anyway</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Rules</CardTitle>
          <CardDescription>
            How should leads be assigned to team members?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="assignmentRule">Assignment Method</Label>
              <Select
                value={settings.assignmentRule}
                onValueChange={(value) => onSettingsChange({ ...settings, assignmentRule: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round-robin">Round Robin</SelectItem>
                  <SelectItem value="specific-user">Assign to Specific User</SelectItem>
                  <SelectItem value="territory">Territory Based</SelectItem>
                  <SelectItem value="skill-based">Skill Based</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {settings.assignmentRule === 'specific-user' && (
              <div>
                <Label htmlFor="assignedUser">Assign All To</Label>
                <Select
                  value={settings.assignedUser}
                  onValueChange={(value) => onSettingsChange({ ...settings, assignedUser: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="lisa">Lisa Wang</SelectItem>
                    <SelectItem value="david">David Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="leadSource">Override Lead Source</Label>
            <Select
              value={settings.leadSourceOverride}
              onValueChange={(value) => onSettingsChange({ ...settings, leadSourceOverride: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Keep original source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Keep original source</SelectItem>
                <SelectItem value="import">Mark as Import</SelectItem>
                <SelectItem value="bulk-upload">Bulk Upload</SelectItem>
                <SelectItem value="data-migration">Data Migration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={settings.sendNotifications}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, sendNotifications: checked })
              }
            />
            <Label>Send notifications to assigned users</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={settings.createFollowUps}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, createFollowUps: checked })
              }
            />
            <Label>Auto-create follow-up reminders</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Step5ImportProgress({ 
  importStats, 
  isImporting, 
  onViewImported 
}: { 
  importStats: ImportStats;
  isImporting: boolean;
  onViewImported: () => void;
}) {
  const progress = importStats.total > 0 ? (importStats.processed / importStats.total) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {isImporting ? (
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            )}
            {isImporting ? 'Importing...' : 'Import Complete'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span>{importStats.processed}/{importStats.total}</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{importStats.successful}</p>
                <p className="text-sm text-muted-foreground">Successful</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{importStats.errors}</p>
                <p className="text-sm text-muted-foreground">Errors</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{importStats.duplicates}</p>
                <p className="text-sm text-muted-foreground">Duplicates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{importStats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isImporting && (
        <div className="flex justify-center space-x-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Error Report
          </Button>
          <Button onClick={onViewImported}>
            <Users className="h-4 w-4 mr-2" />
            View Imported Leads
          </Button>
        </div>
      )}
    </div>
  );
}

export function ImportLeadsContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [validationErrors] = useState<ValidationError[]>([
    { row: 1, column: 'Email', value: 'invalid-email', error: 'Invalid email format', severity: 'error' },
    { row: 3, column: 'Phone', value: '123', error: 'Phone number too short', severity: 'warning' },
    { row: 5, column: 'Company Name', value: '', error: 'Required field is empty', severity: 'error' },
  ]);
  const [sampleData] = useState([
    { companyName: 'Acme Corp', contactName: 'John Smith', email: 'john@acme.com', phone: '+1-555-0123', projectType: 'Commercial' },
    { companyName: 'TechStart', contactName: 'Jane Doe', email: 'jane@techstart.com', phone: '+1-555-0456', projectType: 'Office' },
    { companyName: 'Global Inc', contactName: 'Bob Wilson', email: 'bob@global.com', phone: '+1-555-0789', projectType: 'Warehouse' },
  ]);
  const [importSettings, setImportSettings] = useState({
    duplicateHandling: 'skip',
    assignmentRule: 'round-robin',
    assignedUser: '',
    leadSourceOverride: '',
    sendNotifications: true,
    createFollowUps: false,
  });
  const [importStats, setImportStats] = useState<ImportStats>({
    total: 100,
    processed: 85,
    successful: 78,
    errors: 5,
    duplicates: 2,
  });
  const [isImporting, setIsImporting] = useState(false);

  // Initialize column mappings when file is selected
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      // Mock column mappings initialization
      const mockMappings: ColumnMapping[] = [
        { sourceColumn: 'Company Name', targetField: 'companyName', isRequired: true, skip: false },
        { sourceColumn: 'Contact Name', targetField: 'contactName', isRequired: true, skip: false },
        { sourceColumn: 'Email', targetField: 'email', isRequired: true, skip: false },
        { sourceColumn: 'Phone', targetField: 'phone', isRequired: false, skip: false },
        { sourceColumn: 'Project Type', targetField: 'projectType', isRequired: false, skip: false },
      ];
      setColumnMappings(mockMappings);
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      setIsImporting(true);
      // Simulate import process
      setTimeout(() => {
        setIsImporting(false);
        setCurrentStep(5);
      }, 3000);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedFile !== null;
      case 2: return columnMappings.some(m => !m.skip && m.targetField);
      case 3: return validationErrors.filter(e => e.severity === 'error').length === 0;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Leads
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Import Leads</h1>
        <Progress value={(currentStep / 5) * 100} className="w-full h-2" />
      </div>

      <Card>
        <CardHeader>
          <StepIndicator currentStep={currentStep} />
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 && (
            <Step1UploadFile 
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          )}
          
          {currentStep === 2 && (
            <Step2MapColumns 
              columnMappings={columnMappings}
              onMappingChange={setColumnMappings}
            />
          )}
          
          {currentStep === 3 && (
            <Step3ReviewValidate 
              validationErrors={validationErrors}
              sampleData={sampleData}
              onErrorFix={(row, column, value) => {
                console.log('Fix error:', { row, column, value });
              }}
            />
          )}
          
          {currentStep === 4 && (
            <Step4ImportSettings 
              settings={importSettings}
              onSettingsChange={setImportSettings}
            />
          )}
          
          {currentStep === 5 && (
            <Step5ImportProgress 
              importStats={importStats}
              isImporting={isImporting}
              onViewImported={() => {
                console.log('View imported leads');
              }}
            />
          )}

          {/* Navigation */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    <PrevIcon className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!canProceed() || isImporting}
                >
                  {currentStep === 4 ? (
                    isImporting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        Start Import
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
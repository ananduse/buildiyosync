import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  Clock,
  User,
  Building,
  DollarSign,
  FileText,
  Send,
  Save,
  Eye,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Target,
  Zap,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Info,
  CheckSquare,
  Edit,
  X,
  Plus,
  Trash2,
  Copy,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  Users,
  Timer,
  Shield,
  Lock,
  Unlock,
  HelpCircle,
  Lightbulb,
  Flag
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FormStep {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  fields: FormField[];
  validation?: StepValidation;
  conditional?: StepCondition;
  settings: StepSettings;
}

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string }[];
  validation?: FieldValidation;
  helpText?: string;
  layout?: 'full' | 'half' | 'third';
}

interface StepValidation {
  required: boolean;
  minFields?: number;
  maxFields?: number;
  customRules?: ValidationRule[];
}

interface ValidationRule {
  field: string;
  rule: string;
  message: string;
}

interface StepCondition {
  dependsOn: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

interface StepSettings {
  allowSkip: boolean;
  showProgress: boolean;
  autoAdvance: boolean;
  timeLimit?: number;
  saveProgress: boolean;
}

interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  customMessage?: string;
}

interface FormProgress {
  currentStep: number;
  completedSteps: number[];
  skippedSteps: number[];
  totalSteps: number;
  completionPercentage: number;
  timeSpent: number;
  lastSaved?: Date;
}

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreview, setIsPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  const steps: FormStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      subtitle: 'Tell us about yourself',
      icon: User,
      fields: [
        {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter your first name',
          required: true,
          layout: 'half',
          validation: { minLength: 2, maxLength: 50 }
        },
        {
          id: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Enter your last name',
          required: true,
          layout: 'half',
          validation: { minLength: 2, maxLength: 50 }
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true,
          layout: 'full',
          validation: { pattern: '^[^@]+@[^@]+\\.[^@]+$' },
          helpText: 'We\'ll use this to send you updates about your project'
        },
        {
          id: 'phone',
          type: 'phone',
          label: 'Phone Number',
          placeholder: '+1 (555) 123-4567',
          required: false,
          layout: 'half',
          helpText: 'Optional - for urgent project updates'
        },
        {
          id: 'preferredContact',
          type: 'radio',
          label: 'Preferred Contact Method',
          required: true,
          layout: 'half',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Text Message', value: 'sms' }
          ]
        }
      ],
      validation: { required: true, minFields: 3 },
      settings: {
        allowSkip: false,
        showProgress: true,
        autoAdvance: false,
        saveProgress: true
      }
    },
    {
      id: 'company',
      title: 'Company Details',
      subtitle: 'Information about your organization',
      icon: Building,
      fields: [
        {
          id: 'companyName',
          type: 'text',
          label: 'Company Name',
          placeholder: 'Enter your company name',
          required: true,
          layout: 'full',
          validation: { minLength: 2, maxLength: 100 }
        },
        {
          id: 'industry',
          type: 'select',
          label: 'Industry',
          required: true,
          layout: 'half',
          options: [
            { label: 'Construction', value: 'construction' },
            { label: 'Real Estate', value: 'real_estate' },
            { label: 'Architecture', value: 'architecture' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Property Management', value: 'property_management' },
            { label: 'Other', value: 'other' }
          ]
        },
        {
          id: 'companySize',
          type: 'select',
          label: 'Company Size',
          required: true,
          layout: 'half',
          options: [
            { label: '1-10 employees', value: '1-10' },
            { label: '11-50 employees', value: '11-50' },
            { label: '51-200 employees', value: '51-200' },
            { label: '201-500 employees', value: '201-500' },
            { label: '500+ employees', value: '500+' }
          ]
        },
        {
          id: 'website',
          type: 'text',
          label: 'Company Website',
          placeholder: 'https://example.com',
          required: false,
          layout: 'half',
          helpText: 'Optional - helps us understand your business better'
        },
        {
          id: 'address',
          type: 'textarea',
          label: 'Business Address',
          placeholder: 'Enter your business address',
          required: false,
          layout: 'half',
          validation: { maxLength: 200 }
        }
      ],
      validation: { required: true, minFields: 3 },
      settings: {
        allowSkip: false,
        showProgress: true,
        autoAdvance: false,
        saveProgress: true
      }
    },
    {
      id: 'project',
      title: 'Project Details',
      subtitle: 'Tell us about your project requirements',
      icon: Target,
      fields: [
        {
          id: 'projectType',
          type: 'radio',
          label: 'Project Type',
          required: true,
          layout: 'full',
          options: [
            { label: 'New Construction', value: 'new_construction' },
            { label: 'Renovation/Remodel', value: 'renovation' },
            { label: 'Addition', value: 'addition' },
            { label: 'Repair/Maintenance', value: 'repair' },
            { label: 'Commercial Development', value: 'commercial' },
            { label: 'Other', value: 'other' }
          ]
        },
        {
          id: 'projectSize',
          type: 'select',
          label: 'Project Size',
          required: true,
          layout: 'half',
          options: [
            { label: 'Small (< 1,000 sq ft)', value: 'small' },
            { label: 'Medium (1,000 - 5,000 sq ft)', value: 'medium' },
            { label: 'Large (5,000 - 20,000 sq ft)', value: 'large' },
            { label: 'Very Large (> 20,000 sq ft)', value: 'very_large' }
          ]
        },
        {
          id: 'timeline',
          type: 'select',
          label: 'Desired Timeline',
          required: true,
          layout: 'half',
          options: [
            { label: 'ASAP (< 1 month)', value: 'asap' },
            { label: '1-3 months', value: '1-3_months' },
            { label: '3-6 months', value: '3-6_months' },
            { label: '6-12 months', value: '6-12_months' },
            { label: 'Flexible (> 12 months)', value: 'flexible' }
          ]
        },
        {
          id: 'projectDescription',
          type: 'textarea',
          label: 'Project Description',
          placeholder: 'Describe your project in detail...',
          required: true,
          layout: 'full',
          validation: { minLength: 50, maxLength: 1000 },
          helpText: 'The more detail you provide, the better we can help you'
        }
      ],
      validation: { required: true, minFields: 4 },
      settings: {
        allowSkip: false,
        showProgress: true,
        autoAdvance: false,
        saveProgress: true
      }
    },
    {
      id: 'budget',
      title: 'Budget & Financing',
      subtitle: 'Help us understand your budget requirements',
      icon: DollarSign,
      fields: [
        {
          id: 'budgetRange',
          type: 'radio',
          label: 'Budget Range',
          required: true,
          layout: 'full',
          options: [
            { label: 'Under $50,000', value: 'under_50k' },
            { label: '$50,000 - $100,000', value: '50k_100k' },
            { label: '$100,000 - $250,000', value: '100k_250k' },
            { label: '$250,000 - $500,000', value: '250k_500k' },
            { label: '$500,000 - $1,000,000', value: '500k_1m' },
            { label: 'Over $1,000,000', value: 'over_1m' },
            { label: 'Not sure yet', value: 'unsure' }
          ]
        },
        {
          id: 'budgetFlexibility',
          type: 'select',
          label: 'Budget Flexibility',
          required: true,
          layout: 'half',
          options: [
            { label: 'Fixed - Cannot exceed', value: 'fixed' },
            { label: 'Somewhat flexible (±10%)', value: 'somewhat' },
            { label: 'Very flexible (±25%)', value: 'flexible' },
            { label: 'Open to discussion', value: 'open' }
          ]
        },
        {
          id: 'financingNeeded',
          type: 'radio',
          label: 'Do you need financing assistance?',
          required: true,
          layout: 'half',
          options: [
            { label: 'Yes, please help', value: 'yes' },
            { label: 'No, self-funded', value: 'no' },
            { label: 'Maybe, tell me more', value: 'maybe' }
          ]
        },
        {
          id: 'priorityFactors',
          type: 'checkbox',
          label: 'What factors are most important to you?',
          required: false,
          layout: 'full',
          options: [
            { label: 'Lowest cost', value: 'cost' },
            { label: 'Fastest completion', value: 'speed' },
            { label: 'Highest quality', value: 'quality' },
            { label: 'Energy efficiency', value: 'efficiency' },
            { label: 'Sustainability', value: 'sustainability' },
            { label: 'Local contractors', value: 'local' }
          ]
        }
      ],
      validation: { required: true, minFields: 3 },
      settings: {
        allowSkip: false,
        showProgress: true,
        autoAdvance: false,
        saveProgress: true
      }
    },
    {
      id: 'additional',
      title: 'Additional Information',
      subtitle: 'Final details to complete your submission',
      icon: FileText,
      fields: [
        {
          id: 'foundUs',
          type: 'select',
          label: 'How did you hear about us?',
          required: false,
          layout: 'half',
          options: [
            { label: 'Google Search', value: 'google' },
            { label: 'Social Media', value: 'social' },
            { label: 'Referral', value: 'referral' },
            { label: 'Advertisement', value: 'ad' },
            { label: 'Website', value: 'website' },
            { label: 'Other', value: 'other' }
          ]
        },
        {
          id: 'urgency',
          type: 'select',
          label: 'How urgent is this project?',
          required: true,
          layout: 'half',
          options: [
            { label: 'Very urgent - Need to start immediately', value: 'very_urgent' },
            { label: 'Somewhat urgent - Within next month', value: 'urgent' },
            { label: 'Planning ahead - Next 3-6 months', value: 'planning' },
            { label: 'Just exploring options', value: 'exploring' }
          ]
        },
        {
          id: 'additionalNotes',
          type: 'textarea',
          label: 'Additional Notes or Requirements',
          placeholder: 'Any other details you\'d like us to know...',
          required: false,
          layout: 'full',
          validation: { maxLength: 500 }
        },
        {
          id: 'newsletter',
          type: 'checkbox',
          label: 'Communication Preferences',
          required: false,
          layout: 'full',
          options: [
            { label: 'Subscribe to our newsletter', value: 'newsletter' },
            { label: 'Send me project updates via email', value: 'updates' },
            { label: 'Text me urgent project notifications', value: 'sms' }
          ]
        }
      ],
      validation: { required: false, minFields: 1 },
      settings: {
        allowSkip: true,
        showProgress: true,
        autoAdvance: false,
        saveProgress: true
      }
    }
  ];

  const progress: FormProgress = {
    currentStep,
    completedSteps: Array.from({ length: currentStep }, (_, i) => i),
    skippedSteps: [],
    totalSteps: steps.length,
    completionPercentage: (currentStep / steps.length) * 100,
    timeSpent,
    lastSaved: autoSave ? new Date() : undefined
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (autoSave) {
      const saveTimer = setTimeout(() => {
        // Auto-save logic here
        console.log('Auto-saving form data...', formData);
      }, 2000);

      return () => clearTimeout(saveTimer);
    }
  }, [formData, autoSave]);

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex];
    const stepErrors: Record<string, string> = {};
    let isValid = true;

    step.fields.forEach(field => {
      const value = formData[field.id];
      
      if (field.required && (!value || value === '')) {
        stepErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      if (value && field.validation) {
        if (field.validation.minLength && value.length < field.validation.minLength) {
          stepErrors[field.id] = `${field.label} must be at least ${field.validation.minLength} characters`;
          isValid = false;
        }
        if (field.validation.maxLength && value.length > field.validation.maxLength) {
          stepErrors[field.id] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
          isValid = false;
        }
        if (field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
          stepErrors[field.id] = field.validation.customMessage || `${field.label} format is invalid`;
          isValid = false;
        }
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
      setErrors({});
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    setErrors({});
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep || stepIndex <= progress.completedSteps.length) {
      setCurrentStep(stepIndex);
      setErrors({});
    }
  };

  const updateFieldValue = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const submitForm = () => {
    if (validateStep(currentStep)) {
      console.log('Submitting form:', formData);
      // Submit logic here
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];
    const layoutClass = field.layout === 'half' ? 'w-1/2' : 
                       field.layout === 'third' ? 'w-1/3' : 'w-full';

    const fieldComponent = () => {
      switch (field.type) {
        case 'text':
        case 'email':
        case 'phone':
        case 'number':
          return (
            <Input
              type={field.type}
              value={value}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={error ? 'border-red-500' : ''}
            />
          );

        case 'textarea':
          return (
            <Textarea
              value={value}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={error ? 'border-red-500' : ''}
              rows={4}
            />
          );

        case 'select':
          return (
            <Select value={value} onValueChange={(val) => updateFieldValue(field.id, val)}>
              <SelectTrigger className={error ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case 'radio':
          return (
            <RadioGroup
              value={value}
              onValueChange={(val) => updateFieldValue(field.id, val)}
            >
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${field.id}_${option.value}`} />
                  <Label htmlFor={`${field.id}_${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          );

        case 'checkbox':
          const selectedValues = Array.isArray(value) ? value : [];
          return (
            <div className="space-y-2">
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}_${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const newValues = checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter(v => v !== option.value);
                      updateFieldValue(field.id, newValues);
                    }}
                  />
                  <Label htmlFor={`${field.id}_${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          );

        default:
          return (
            <Input
              value={value}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={error ? 'border-red-500' : ''}
            />
          );
      }
    };

    return (
      <div key={field.id} className={`${layoutClass} p-2`}>
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {field.helpText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-3 w-3 ml-1 inline text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">{field.helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Label>
          {fieldComponent()}
          {error && (
            <p className="text-xs text-red-500 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error}
            </p>
          )}
          {field.helpText && !error && (
            <p className="text-xs text-muted-foreground">{field.helpText}</p>
          )}
        </div>
      </div>
    );
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Get Your Free Construction Quote</h1>
          <p className="text-muted-foreground">
            Complete this form to receive a detailed quote for your project
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Progress</span>
                <Badge variant="outline">
                  Step {currentStep + 1} of {steps.length}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                </div>
                {autoSave && progress.lastSaved && (
                  <div className="flex items-center gap-1">
                    <Save className="h-3 w-3" />
                    Auto-saved
                  </div>
                )}
              </div>
            </div>
            <Progress value={progress.completionPercentage} className="mb-4" />
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isAccessible = index <= currentStep || index <= progress.completedSteps.length;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <Button
                      variant={isCurrent ? 'default' : isCompleted ? 'default' : 'outline'}
                      size="sm"
                      className={`rounded-full w-10 h-10 p-0 ${
                        isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                      onClick={() => isAccessible && goToStep(index)}
                      disabled={!isAccessible}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </Button>
                    <span className="text-xs mt-1 text-center max-w-16 leading-tight">
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <StepIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{currentStepData.title}</CardTitle>
                {currentStepData.subtitle && (
                  <CardDescription>{currentStepData.subtitle}</CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap -mx-2">
              {currentStepData.fields.map(renderField)}
            </div>

            {/* Step-specific alerts */}
            {currentStep === 0 && (
              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  We'll use this information to create your personalized quote and connect you with the right contractors.
                </AlertDescription>
              </Alert>
            )}

            {currentStep === 3 && (
              <Alert className="mt-4">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro tip:</strong> Being flexible with your budget can help us find better options and potentially save you money.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {currentStepData.settings.allowSkip && currentStep < steps.length - 1 && (
              <Button variant="ghost" onClick={nextStep}>
                Skip this step
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={submitForm} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit Form
              </Button>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t">
          <Button variant="ghost" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save & Continue Later
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button variant="ghost" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
        </div>

        {/* Form Summary (Preview Mode) */}
        {isPreview && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Form Summary</CardTitle>
              <CardDescription>Review your information before submitting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step, stepIndex) => (
                  <div key={step.id}>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <step.icon className="h-4 w-4" />
                      {step.title}
                    </h3>
                    <div className="space-y-2">
                      {step.fields.map(field => {
                        const value = formData[field.id];
                        if (!value || value === '') return null;
                        
                        return (
                          <div key={field.id} className="text-sm">
                            <span className="text-muted-foreground">{field.label}: </span>
                            <span className="font-medium">
                              {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
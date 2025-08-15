import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  Save,
  X,
  Upload,
  MapPin,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Target,
  Tag,
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Users,
  FileText,
  Star,
  Thermometer,
  Flag,
  Plus,
  Minus,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Validation schemas for each step
const step1Schema = z.object({
  source: z.string().min(1, 'Lead source is required'),
  campaign: z.string().optional(),
  referrerName: z.string().optional(),
  referrerContact: z.string().optional(),
  sourceDetails: z.string().max(500, 'Maximum 500 characters').optional(),
});

const step2Schema = z.object({
  leadType: z.enum(['individual', 'company'], { required_error: 'Lead type is required' }),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  mobileNumber: z.string().min(10, 'Valid mobile number is required'),
  alternateNumber: z.string().optional(),
  emailAddress: z.string().email('Valid email address is required'),
  secondaryEmail: z.string().email('Valid email address').optional().or(z.literal('')),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
});

const step3Schema = z.object({
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().optional(),
  addressLine1: z.string().min(1, 'Address is required'),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  pincode: z.string().min(6, 'Valid pincode is required'),
  mapLocation: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
});

const step4Schema = z.object({
  projectType: z.string().min(1, 'Project type is required'),
  projectSubtype: z.string().optional(),
  budgetMin: z.number().min(0, 'Budget must be positive'),
  budgetMax: z.number().min(0, 'Budget must be positive'),
  budgetConfirmed: z.boolean().default(false),
  timeline: z.string().min(1, 'Timeline is required'),
  projectSize: z.number().min(0).optional(),
  requirements: z.string().max(1000, 'Maximum 1000 characters').optional(),
  urgencyLevel: z.enum(['high', 'medium', 'low'], { required_error: 'Urgency level is required' }),
});

const step5Schema = z.object({
  assignTo: z.string().min(1, 'Assignment is required'),
  leadStatus: z.string().min(1, 'Status is required'),
  temperature: z.enum(['hot', 'warm', 'cold'], { required_error: 'Temperature is required' }),
  priority: z.enum(['high', 'medium', 'low'], { required_error: 'Priority is required' }),
  tags: z.array(z.string()).optional(),
  internalNotes: z.string().max(500, 'Maximum 500 characters').optional(),
  followUpDate: z.date().optional(),
  followUpType: z.string().optional(),
});

// Combined schema
const formSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

type FormData = z.infer<typeof formSchema>;

// Mock data
const leadSources = [
  { value: 'website', label: 'Website' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'referral', label: 'Referral' },
  { value: 'cold-call', label: 'Cold Call' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'trade-show', label: 'Trade Show' },
  { value: 'partner', label: 'Partner' },
  { value: 'other', label: 'Other' },
];

const campaigns = [
  { value: 'summer-2024', label: 'Summer Campaign 2024' },
  { value: 'digital-boost', label: 'Digital Boost Campaign' },
  { value: 'referral-program', label: 'Referral Program' },
];

const countries = [
  { value: 'usa', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'india', label: 'India' },
];

const projectTypes = [
  { value: 'residential', label: 'Residential', subtypes: ['Apartment', 'Villa', 'Townhouse'] },
  { value: 'commercial', label: 'Commercial', subtypes: ['Office Building', 'Retail Space', 'Warehouse'] },
  { value: 'industrial', label: 'Industrial', subtypes: ['Manufacturing Plant', 'Storage Facility'] },
  { value: 'infrastructure', label: 'Infrastructure', subtypes: ['Road', 'Bridge', 'Utility'] },
];

const timelines = [
  { value: 'immediate', label: 'Immediate (within 1 month)' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: '1-year+', label: 'More than 1 year' },
];

const users = [
  { id: 'user1', name: 'Sarah Johnson', avatar: '/avatars/sarah.jpg', active: true },
  { id: 'user2', name: 'Mike Chen', avatar: '/avatars/mike.jpg', active: true },
  { id: 'user3', name: 'Lisa Wang', avatar: '/avatars/lisa.jpg', active: true },
  { id: 'user4', name: 'David Brown', avatar: '/avatars/david.jpg', active: true },
];

const leadStatuses = [
  { value: 'new', label: 'New', color: 'bg-gray-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-blue-500' },
  { value: 'qualified', label: 'Qualified', color: 'bg-amber-500' },
  { value: 'proposal', label: 'Proposal', color: 'bg-purple-500' },
];

const steps = [
  { number: 1, title: 'Lead Source & Campaign', description: 'How did this lead find us?', icon: Target },
  { number: 2, title: 'Contact Information', description: 'Basic contact details', icon: User },
  { number: 3, title: 'Address & Location', description: 'Physical location details', icon: MapPin },
  { number: 4, title: 'Project Requirements', description: 'Project needs and budget', icon: Building2 },
  { number: 5, title: 'Assignment & Classification', description: 'Team assignment and priority', icon: Users },
];

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

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
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors",
                  isActive && "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2",
                  isCompleted && "bg-emerald-500 text-white",
                  !isActive && !isCompleted && "bg-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-sm font-medium",
                  isActive && "text-primary",
                  isCompleted && "text-emerald-600",
                  !isActive && !isCompleted && "text-gray-400"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-24">
                  {step.description}
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

export function AddEditLeadForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadType: 'individual',
      country: 'usa',
      budgetConfirmed: false,
      urgencyLevel: 'medium',
      temperature: 'warm',
      priority: 'medium',
      leadStatus: 'new',
      tags: [],
    },
    mode: 'onChange',
  });

  const { watch, setValue, trigger, formState: { errors, isValid } } = form;
  const watchedValues = watch();

  const getStepSchema = (step: number) => {
    switch (step) {
      case 1: return step1Schema;
      case 2: return step2Schema;
      case 3: return step3Schema;
      case 4: return step4Schema;
      case 5: return step5Schema;
      default: return step1Schema;
    }
  };

  const validateCurrentStep = async () => {
    const stepSchema = getStepSchema(currentStep);
    try {
      stepSchema.parse(watchedValues);
      return await trigger(Object.keys(stepSchema.shape) as (keyof FormData)[]);
    } catch {
      return false;
    }
  };

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: FormData) => {
    console.log('Form data:', data);
    // Here you would typically submit to your API
    navigate('/leads');
  };

  const addTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      const updatedTags = [...selectedTags, newTag.trim()];
      setSelectedTags(updatedTags);
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    setValue('tags', updatedTags);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/leads')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leads
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-xl font-bold">
                {isEditing ? 'Edit Lead' : 'Add New Lead'}
              </h1>
              <p className="text-sm text-gray-500">
                {isEditing ? 'Update lead information' : 'Enter lead details to add to your pipeline'}
              </p>
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
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full min-w-full">
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

            {/* Step 1: Lead Source & Campaign */}
            {currentStep === 1 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Lead Source & Campaign
                  </CardTitle>
                  <CardDescription>
                    Help us understand how this lead discovered your services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 w-full min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lead Source *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select lead source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {leadSources.map((source) => (
                                <SelectItem key={source.value} value={source.value}>
                                  {source.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How did this lead find us?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="campaign"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marketing Campaign</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select campaign (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {campaigns.map((campaign) => (
                                <SelectItem key={campaign.value} value={campaign.value}>
                                  {campaign.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Marketing campaign if applicable
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {watchedValues.source === 'referral' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <FormField
                        control={form.control}
                        name="referrerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Referrer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Who referred this lead?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="referrerContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Referrer Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Referrer's phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="sourceDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Source Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional details about the lead source..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum 500 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Primary contact details for this lead
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 w-full min-w-full">
                  <FormField
                    control={form.control}
                    name="leadType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Lead Type *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="individual" id="individual" />
                              <Label htmlFor="individual">Individual</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="company" id="company" />
                              <Label htmlFor="company">Company</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {watchedValues.leadType === 'company' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                              <Input placeholder="Job title or position" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormDescription>Primary contact number</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="alternateNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4568" {...field} />
                          </FormControl>
                          <FormDescription>Secondary contact number</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="emailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" type="email" {...field} />
                          </FormControl>
                          <FormDescription>Primary email address</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="secondaryEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Email</FormLabel>
                          <FormControl>
                            <Input placeholder="secondary@example.com" type="email" {...field} />
                          </FormControl>
                          <FormDescription>Alternative email address</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input 
                              placeholder="https://www.example.com" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Company website</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 3: Address & Location */}
            {currentStep === 3 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address & Location
                  </CardTitle>
                  <CardDescription>
                    Physical location details for the lead
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 w-full min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area/Locality</FormLabel>
                        <FormControl>
                          <Input placeholder="Specific area or locality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1 *</FormLabel>
                          <FormControl>
                            <Input placeholder="Street address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input placeholder="Apartment, suite, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Landmark</FormLabel>
                          <FormControl>
                            <Input placeholder="Nearby landmark" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode *</FormLabel>
                          <FormControl>
                            <Input placeholder="123456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Map Location (Optional)</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Click on the map to set the exact location for this lead.
                    </p>
                    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                      <p className="text-gray-500 text-sm">Map integration would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Project Requirements */}
            {currentStep === 4 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Project Requirements
                  </CardTitle>
                  <CardDescription>
                    Details about the lead's project needs and budget
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 w-full min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {projectTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchedValues.projectType && (
                      <FormField
                        control={form.control}
                        name="projectSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Subtype</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subtype" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {projectTypes
                                  .find(type => type.value === watchedValues.projectType)
                                  ?.subtypes.map((subtype) => (
                                    <SelectItem key={subtype} value={subtype.toLowerCase()}>
                                      {subtype}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Budget Range *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budgetMin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Budget</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input 
                                  type="number" 
                                  placeholder="50000" 
                                  className="pl-10" 
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budgetMax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Budget</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input 
                                  type="number" 
                                  placeholder="100000" 
                                  className="pl-10" 
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="budgetConfirmed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Budget is confirmed</FormLabel>
                            <FormDescription>
                              Check this if the budget has been approved
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeline *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="When to start?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timelines.map((timeline) => (
                                <SelectItem key={timeline.value} value={timeline.value}>
                                  {timeline.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Size (sq ft)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="5000" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                            />
                          </FormControl>
                          <FormDescription>Area in square feet</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detailed requirements and preferences..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum 1000 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="urgencyLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Urgency Level *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-4"
                          >
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                              <RadioGroupItem value="high" id="high" />
                              <Label htmlFor="high" className="flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                High
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                              <RadioGroupItem value="medium" id="medium" />
                              <Label htmlFor="medium" className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-amber-500" />
                                Medium
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-lg p-3">
                              <RadioGroupItem value="low" id="low" />
                              <Label htmlFor="low" className="flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Low
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 5: Assignment & Classification */}
            {currentStep === 5 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Assignment & Classification
                  </CardTitle>
                  <CardDescription>
                    Assign the lead and set priority levels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 w-full min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="assignTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assign To *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select team member" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {users.filter(user => user.active).map((user) => (
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leadStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {leadStatuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  <div className="flex items-center space-x-2">
                                    <div className={cn("w-3 h-3 rounded-full", status.color)} />
                                    <span>{status.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Lead Temperature *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-2"
                            >
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="hot" id="hot" />
                                <Label htmlFor="hot" className="flex items-center">
                                  🔥 <span className="ml-2">Hot - Ready to buy</span>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="warm" id="warm" />
                                <Label htmlFor="warm" className="flex items-center">
                                  🌡️ <span className="ml-2">Warm - Interested</span>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="cold" id="cold" />
                                <Label htmlFor="cold" className="flex items-center">
                                  ❄️ <span className="ml-2">Cold - Needs nurturing</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Priority Level *</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-2"
                            >
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="high" id="priority-high" />
                                <Label htmlFor="priority-high" className="flex items-center">
                                  <Flag className="h-4 w-4 mr-2 text-red-500" />
                                  High Priority
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="medium" id="priority-medium" />
                                <Label htmlFor="priority-medium" className="flex items-center">
                                  <Flag className="h-4 w-4 mr-2 text-amber-500" />
                                  Medium Priority
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-lg p-3">
                                <RadioGroupItem value="low" id="priority-low" />
                                <Label htmlFor="priority-low" className="flex items-center">
                                  <Flag className="h-4 w-4 mr-2 text-green-500" />
                                  Low Priority
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      />
                      <Button type="button" onClick={addTag} variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">Add relevant tags for categorization</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="internalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Notes for team (not visible to lead)..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum 500 characters - visible only to your team
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FormField
                      control={form.control}
                      name="followUpDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Follow-up Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When to follow up?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchedValues.followUpDate && (
                      <FormField
                        control={form.control}
                        name="followUpType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Follow-up Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="How to follow up?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="call">Phone Call</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                <SelectItem value="meeting">In-person Meeting</SelectItem>
                                <SelectItem value="video">Video Call</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {/* Lead Score Display */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Lead Score (Auto-calculated)</span>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        85/100
                      </Badge>
                    </div>
                    <Progress value={85} className="h-2 mb-2" />
                    <p className="text-xs text-blue-700">
                      Score based on completeness, budget, timeline, and qualification criteria
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="space-x-2">
                <Button variant="outline" onClick={() => navigate('/leads')}>
                  Save as Draft
                </Button>
                
                {currentStep < steps.length ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!isValid}>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Lead' : 'Create Lead'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
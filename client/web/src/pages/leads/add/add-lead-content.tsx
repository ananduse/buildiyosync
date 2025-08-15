import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeft as PrevIcon,
  Check,
  Building,
  User,
  MapPin,
  Settings,
  AlertCircle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  // Step 1: Basic Information
  leadSource: string;
  campaign: string;
  leadType: string;
  companyName: string;
  industry: string;
  website: string;
  leadDescription: string;
  
  // Step 2: Contact Details
  contactName: string;
  designation: string;
  mobile: string;
  alternativeNumber: string;
  email: string;
  secondaryEmail: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  
  // Step 3: Project Requirements
  projectType: string;
  subCategory: string;
  budgetMin: string;
  budgetMax: string;
  timeline: string;
  expectedStartDate: string;
  projectDuration: string;
  locationPreference: string;
  area: string;
  units: string;
  specificRequirements: string;
  
  // Step 4: Assignment & Scoring
  assignedUser: string;
  leadPriority: string;
  leadTemperature: string;
  tags: string[];
  initialNotes: string;
  followUpReminder: string;
}

const initialFormData: FormData = {
  leadSource: '',
  campaign: '',
  leadType: '',
  companyName: '',
  industry: '',
  website: '',
  leadDescription: '',
  contactName: '',
  designation: '',
  mobile: '',
  alternativeNumber: '',
  email: '',
  secondaryEmail: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  projectType: '',
  subCategory: '',
  budgetMin: '',
  budgetMax: '',
  timeline: '',
  expectedStartDate: '',
  projectDuration: '',
  locationPreference: '',
  area: '',
  units: '',
  specificRequirements: '',
  assignedUser: '',
  leadPriority: '',
  leadTemperature: '',
  tags: [],
  initialNotes: '',
  followUpReminder: ''
};

const steps = [
  {
    id: 1,
    title: 'Basic Information',
    description: 'Lead source and company details',
    icon: Building
  },
  {
    id: 2,
    title: 'Contact Details',
    description: 'Primary contact information',
    icon: User
  },
  {
    id: 3,
    title: 'Project Requirements',
    description: 'Project specifications and budget',
    icon: MapPin
  },
  {
    id: 4,
    title: 'Assignment & Scoring',
    description: 'Assignment and lead priority',
    icon: Settings
  }
];

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
                <div className={`w-20 h-0.5 mx-4 ${
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

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
}

function Step1BasicInformation({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-4 w-full min-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="leadSource">Lead Source *</Label>
          <Select value={formData.leadSource} onValueChange={(value) => updateFormData({ leadSource: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select lead source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
              <SelectItem value="cold-call">Cold Call</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="advertisement">Advertisement</SelectItem>
            </SelectContent>
          </Select>
          {errors.leadSource && <p className="text-sm text-red-600 mt-1">{errors.leadSource}</p>}
        </div>

        <div>
          <Label htmlFor="campaign">Campaign</Label>
          <Select value={formData.campaign} onValueChange={(value) => updateFormData({ campaign: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select campaign (if applicable)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024 Commercial</SelectItem>
              <SelectItem value="summer-promo">Summer Promotion</SelectItem>
              <SelectItem value="referral-program">Referral Program</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Lead Type *</Label>
        <RadioGroup 
          value={formData.leadType} 
          onValueChange={(value) => updateFormData({ leadType: value })}
          className="flex space-x-6 mt-2"
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
        {errors.leadType && <p className="text-sm text-red-600 mt-1">{errors.leadType}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            placeholder="Enter company name"
          />
          {errors.companyName && <p className="text-sm text-red-600 mt-1">{errors.companyName}</p>}
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => updateFormData({ industry: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="construction">Construction</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => updateFormData({ website: e.target.value })}
          placeholder="https://example.com"
        />
      </div>

      <div>
        <Label htmlFor="leadDescription">Lead Description</Label>
        <Textarea
          id="leadDescription"
          value={formData.leadDescription}
          onChange={(e) => updateFormData({ leadDescription: e.target.value })}
          placeholder="Brief description of the lead and their interest"
          rows={3}
        />
      </div>
    </div>
  );
}

function Step2ContactDetails({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-4 w-full min-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="contactName">Primary Contact Name *</Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => updateFormData({ contactName: e.target.value })}
            placeholder="Enter contact person's name"
          />
          {errors.contactName && <p className="text-sm text-red-600 mt-1">{errors.contactName}</p>}
        </div>

        <div>
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            value={formData.designation}
            onChange={(e) => updateFormData({ designation: e.target.value })}
            placeholder="Job title or designation"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => updateFormData({ mobile: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
          {errors.mobile && <p className="text-sm text-red-600 mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <Label htmlFor="alternativeNumber">Alternative Number</Label>
          <Input
            id="alternativeNumber"
            type="tel"
            value={formData.alternativeNumber}
            onChange={(e) => updateFormData({ alternativeNumber: e.target.value })}
            placeholder="+1 (555) 123-4568"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="contact@company.com"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="secondaryEmail">Secondary Email</Label>
          <Input
            id="secondaryEmail"
            type="email"
            value={formData.secondaryEmail}
            onChange={(e) => updateFormData({ secondaryEmail: e.target.value })}
            placeholder="alternative@email.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          placeholder="Street address"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 w-full">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="City"
          />
        </div>

        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            placeholder="State"
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => updateFormData({ country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            value={formData.pincode}
            onChange={(e) => updateFormData({ pincode: e.target.value })}
            placeholder="12345"
          />
        </div>
      </div>
    </div>
  );
}

function Step3ProjectRequirements({ formData, updateFormData, errors }: StepProps) {
  return (
    <div className="space-y-4 w-full min-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="projectType">Project Type *</Label>
          <Select value={formData.projectType} onValueChange={(value) => updateFormData({ projectType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType && <p className="text-sm text-red-600 mt-1">{errors.projectType}</p>}
        </div>

        <div>
          <Label htmlFor="subCategory">Sub-category</Label>
          <Select value={formData.subCategory} onValueChange={(value) => updateFormData({ subCategory: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="office-building">Office Building</SelectItem>
              <SelectItem value="warehouse">Warehouse</SelectItem>
              <SelectItem value="retail-space">Retail Space</SelectItem>
              <SelectItem value="apartment-complex">Apartment Complex</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Budget Range *</Label>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-2 w-full">
          <div>
            <Input
              placeholder="Min budget"
              value={formData.budgetMin}
              onChange={(e) => updateFormData({ budgetMin: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder="Max budget"
              value={formData.budgetMax}
              onChange={(e) => updateFormData({ budgetMax: e.target.value })}
            />
          </div>
        </div>
        {errors.budgetMin && <p className="text-sm text-red-600 mt-1">{errors.budgetMin}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Select value={formData.timeline} onValueChange={(value) => updateFormData({ timeline: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="3-months">Within 3 months</SelectItem>
              <SelectItem value="6-months">Within 6 months</SelectItem>
              <SelectItem value="later">Later</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="expectedStartDate">Expected Start Date</Label>
          <Input
            id="expectedStartDate"
            type="date"
            value={formData.expectedStartDate}
            onChange={(e) => updateFormData({ expectedStartDate: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="projectDuration">Project Duration</Label>
          <Select value={formData.projectDuration} onValueChange={(value) => updateFormData({ projectDuration: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3-months">1-3 months</SelectItem>
              <SelectItem value="3-6-months">3-6 months</SelectItem>
              <SelectItem value="6-12-months">6-12 months</SelectItem>
              <SelectItem value="12-months">12+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="locationPreference">Location Preference</Label>
          <Input
            id="locationPreference"
            value={formData.locationPreference}
            onChange={(e) => updateFormData({ locationPreference: e.target.value })}
            placeholder="Preferred project location"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label htmlFor="area">Area/Size (sq ft)</Label>
          <Input
            id="area"
            value={formData.area}
            onChange={(e) => updateFormData({ area: e.target.value })}
            placeholder="Area in square feet"
          />
        </div>

        <div>
          <Label htmlFor="units">Number of Units</Label>
          <Input
            id="units"
            type="number"
            value={formData.units}
            onChange={(e) => updateFormData({ units: e.target.value })}
            placeholder="Number of units/floors"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="specificRequirements">Specific Requirements</Label>
        <Textarea
          id="specificRequirements"
          value={formData.specificRequirements}
          onChange={(e) => updateFormData({ specificRequirements: e.target.value })}
          placeholder="Any specific requirements or preferences"
          rows={3}
        />
      </div>
    </div>
  );
}

function Step4AssignmentScoring({ formData, updateFormData, errors }: StepProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(formData.tags);
  
  const availableTags = [
    'Hot Lead', 'Urgent', 'High Budget', 'Referral', 'VIP Client', 'Follow-up Required',
    'Price Sensitive', 'Decision Maker', 'Multiple Quotes', 'Long Term'
  ];

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    updateFormData({ tags: newTags });
  };

  return (
    <div className="space-y-4 w-full min-w-full">
      <div>
        <Label htmlFor="assignedUser">Assign to User *</Label>
        <Select value={formData.assignedUser} onValueChange={(value) => updateFormData({ assignedUser: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select team member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sarah">Sarah Johnson - Senior Sales Manager</SelectItem>
            <SelectItem value="mike">Mike Chen - Technical Lead</SelectItem>
            <SelectItem value="lisa">Lisa Wang - Project Coordinator</SelectItem>
            <SelectItem value="david">David Brown - Sales Associate</SelectItem>
          </SelectContent>
        </Select>
        {errors.assignedUser && <p className="text-sm text-red-600 mt-1">{errors.assignedUser}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        <div>
          <Label>Lead Priority</Label>
          <RadioGroup 
            value={formData.leadPriority} 
            onValueChange={(value) => updateFormData({ leadPriority: value })}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high" className="text-red-600 font-medium">High Priority</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="text-yellow-600 font-medium">Medium Priority</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low" className="text-green-600 font-medium">Low Priority</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Lead Temperature</Label>
          <RadioGroup 
            value={formData.leadTemperature} 
            onValueChange={(value) => updateFormData({ leadTemperature: value })}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hot" id="hot" />
              <Label htmlFor="hot" className="text-red-600 font-medium">🔥 Hot</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="warm" id="warm" />
              <Label htmlFor="warm" className="text-orange-600 font-medium">🌡️ Warm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cold" id="cold" />
              <Label htmlFor="cold" className="text-blue-600 font-medium">❄️ Cold</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-1">Click tags to add/remove</p>
      </div>

      <div>
        <Label htmlFor="initialNotes">Initial Notes</Label>
        <Textarea
          id="initialNotes"
          value={formData.initialNotes}
          onChange={(e) => updateFormData({ initialNotes: e.target.value })}
          placeholder="Any initial observations or notes about this lead"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="followUpReminder">Set Follow-up Reminder</Label>
        <Select value={formData.followUpReminder} onValueChange={(value) => updateFormData({ followUpReminder: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select follow-up schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-day">1 Day</SelectItem>
            <SelectItem value="3-days">3 Days</SelectItem>
            <SelectItem value="1-week">1 Week</SelectItem>
            <SelectItem value="2-weeks">2 Weeks</SelectItem>
            <SelectItem value="1-month">1 Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Review all information before submitting. You can edit the lead details after creation.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function AddLeadContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const updatedFields = Object.keys(data);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => delete newErrors[field]);
      return newErrors;
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.leadSource) newErrors.leadSource = 'Lead source is required';
        if (!formData.leadType) newErrors.leadType = 'Lead type is required';
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        break;
      case 2:
        if (!formData.contactName) newErrors.contactName = 'Contact name is required';
        if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
        if (!formData.email) newErrors.email = 'Email address is required';
        break;
      case 3:
        if (!formData.projectType) newErrors.projectType = 'Project type is required';
        if (!formData.budgetMin) newErrors.budgetMin = 'Budget range is required';
        break;
      case 4:
        if (!formData.assignedUser) newErrors.assignedUser = 'Assigned user is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      console.log('Submitting lead data:', formData);
      // TODO: Submit the form data
    }
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="w-full px-4 lg:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Leads
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Add New Lead</h1>
        <Progress value={progress} className="w-full h-2" />
      </div>

      <Card className="w-full">
        <CardHeader>
          <StepIndicator currentStep={currentStep} />
        </CardHeader>
        
        <CardContent className="w-full min-w-full">
          {currentStep === 1 && (
            <Step1BasicInformation 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}
          {currentStep === 2 && (
            <Step2ContactDetails 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}
          {currentStep === 3 && (
            <Step3ProjectRequirements 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}
          {currentStep === 4 && (
            <Step4AssignmentScoring 
              formData={formData} 
              updateFormData={updateFormData} 
              errors={errors} 
            />
          )}

          {/* Form Actions */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <PrevIcon className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline">
                Cancel
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <>
                  <Button variant="outline">
                    Save & New
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Check className="h-4 w-4 mr-2" />
                    Save Lead
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import {
  ArrowLeft,
  Check,
  X,
  CheckCircle,
  AlertTriangle,
  User,
  Building,
  DollarSign,
  Calendar,
  Folder,
  Users,
  Mail,
  Video,
  CheckSquare,
  Globe,
  ArrowRightLeft,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface ConvertLeadProps {
  leadId: string;
}

// Mock lead data
const mockLead = {
  id: 'L001',
  name: 'Acme Corporation Office Complex',
  company: 'Acme Corp',
  contact: {
    name: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567'
  },
  project: {
    type: 'Commercial Building',
    subCategory: 'Office Complex',
    budgetMin: 50000,
    budgetMax: 100000,
    location: 'New York, NY',
    expectedStartDate: '2024-03-15',
    duration: '12 months',
    area: '15000 sq ft',
    requirements: 'Modern office building with sustainable features, parking for 100+ vehicles, and flexible floor plans.'
  },
  assignedTo: {
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    role: 'Senior Sales Manager'
  }
};

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
}

interface ProjectData {
  projectName: string;
  projectCode: string;
  projectType: string;
  confirmedBudget: number;
  startDate: string;
  endDate: string;
  workspace: string;
  projectManager: string;
  teamMembers: string[];
  clientContact: string;
  description: string;
}

interface PostConversionAction {
  id: string;
  action: string;
  enabled: boolean;
  description: string;
}

function PreConversionChecklist({ 
  checklist, 
  onItemToggle 
}: { 
  checklist: ChecklistItem[];
  onItemToggle: (id: string) => void;
}) {
  const completedItems = checklist.filter(item => item.completed).length;
  const requiredItems = checklist.filter(item => item.required).length;
  const completedRequiredItems = checklist.filter(item => item.required && item.completed).length;
  
  const allRequiredCompleted = completedRequiredItems === requiredItems;
  const progressPercentage = (completedItems / checklist.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckSquare className="h-5 w-5 mr-2" />
          Pre-Conversion Checklist
        </CardTitle>
        <CardDescription>
          Ensure all requirements are met before converting the lead
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: {completedItems}/{checklist.length} items completed</span>
            <span>Required: {completedRequiredItems}/{requiredItems}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <Checkbox
                checked={item.completed}
                onCheckedChange={() => onItemToggle(item.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={item.completed ? 'line-through text-muted-foreground' : ''}>
                    {item.label}
                  </span>
                  {item.required && (
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                  )}
                </div>
              </div>
              {item.completed && (
                <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
              )}
            </div>
          ))}
        </div>
        
        {!allRequiredCompleted && (
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please complete all required items before proceeding with the conversion.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function ConversionForm({ 
  projectData, 
  onDataChange 
}: { 
  projectData: ProjectData;
  onDataChange: (data: Partial<ProjectData>) => void;
}) {
  const availableTeamMembers = [
    { id: 'mike', name: 'Mike Chen', role: 'Technical Lead' },
    { id: 'lisa', name: 'Lisa Wang', role: 'Project Coordinator' },
    { id: 'david', name: 'David Brown', role: 'Designer' },
    { id: 'emma', name: 'Emma Wilson', role: 'Engineer' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2" />
          Project Conversion Form
        </CardTitle>
        <CardDescription>
          Configure the new project details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              value={projectData.projectName}
              onChange={(e) => onDataChange({ projectName: e.target.value })}
              placeholder="Enter project name"
            />
          </div>
          
          <div>
            <Label htmlFor="projectCode">Project Code</Label>
            <Input
              id="projectCode"
              value={projectData.projectCode}
              onChange={(e) => onDataChange({ projectCode: e.target.value })}
              placeholder="Auto-generated"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="projectType">Project Type</Label>
            <Select 
              value={projectData.projectType}
              onValueChange={(value) => onDataChange({ projectType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial">Commercial Building</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="confirmedBudget">Confirmed Budget *</Label>
            <Input
              id="confirmedBudget"
              type="number"
              value={projectData.confirmedBudget}
              onChange={(e) => onDataChange({ confirmedBudget: Number(e.target.value) })}
              placeholder="Enter confirmed budget"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              value={projectData.startDate}
              onChange={(e) => onDataChange({ startDate: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              type="date"
              value={projectData.endDate}
              onChange={(e) => onDataChange({ endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="workspace">Select Workspace</Label>
            <Select 
              value={projectData.workspace}
              onValueChange={(value) => onDataChange({ workspace: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select workspace" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial-projects">Commercial Projects</SelectItem>
                <SelectItem value="residential-projects">Residential Projects</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="projectManager">Assign Project Manager *</Label>
            <Select 
              value={projectData.projectManager}
              onValueChange={(value) => onDataChange({ projectManager: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select project manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="lisa">Lisa Wang</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Initial Team Members</Label>
          <div className="mt-2 space-y-2">
            {availableTeamMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={projectData.teamMembers.includes(member.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onDataChange({ 
                        teamMembers: [...projectData.teamMembers, member.id] 
                      });
                    } else {
                      onDataChange({ 
                        teamMembers: projectData.teamMembers.filter(id => id !== member.id) 
                      });
                    }
                  }}
                />
                <Label>{member.name} - {member.role}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            value={projectData.description}
            onChange={(e) => onDataChange({ description: e.target.value })}
            placeholder="Enter project description"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function PostConversionActions({ 
  actions, 
  onActionToggle 
}: { 
  actions: PostConversionAction[];
  onActionToggle: (id: string) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckSquare className="h-5 w-5 mr-2" />
          Post-Conversion Actions
        </CardTitle>
        <CardDescription>
          Select actions to perform after successful conversion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="flex items-start space-x-3">
              <Checkbox
                checked={action.enabled}
                onCheckedChange={() => onActionToggle(action.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium">{action.action}</div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ConvertLeadContent({ leadId }: ConvertLeadProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'All required information complete', completed: true, required: true },
    { id: '2', label: 'Documents collected', completed: true, required: true },
    { id: '3', label: 'Budget confirmed with client', completed: false, required: true },
    { id: '4', label: 'Timeline agreed upon', completed: true, required: true },
    { id: '5', label: 'Decision maker identified', completed: true, required: true },
    { id: '6', label: 'Site visit completed', completed: false, required: false },
    { id: '7', label: 'References checked', completed: false, required: false },
  ]);

  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: mockLead.name,
    projectCode: 'PRJ-2024-001',
    projectType: 'commercial',
    confirmedBudget: 75000,
    startDate: mockLead.project.expectedStartDate,
    endDate: '',
    workspace: 'commercial-projects',
    projectManager: '',
    teamMembers: [],
    clientContact: mockLead.contact.name,
    description: mockLead.project.requirements
  });

  const [postActions, setPostActions] = useState<PostConversionAction[]>([
    { 
      id: '1', 
      action: 'Create project folder structure', 
      enabled: true,
      description: 'Set up organized folder structure for project files'
    },
    { 
      id: '2', 
      action: 'Send welcome email to client', 
      enabled: true,
      description: 'Automated welcome email with project details and next steps'
    },
    { 
      id: '3', 
      action: 'Schedule kickoff meeting', 
      enabled: false,
      description: 'Create calendar event for project kickoff meeting'
    },
    { 
      id: '4', 
      action: 'Create initial tasks', 
      enabled: true,
      description: 'Generate standard project tasks and milestones'
    },
    { 
      id: '5', 
      action: 'Setup client portal access', 
      enabled: false,
      description: 'Provide client access to project portal and documents'
    },
  ]);

  const [isConverting, setIsConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);

  const handleChecklistToggle = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleProjectDataChange = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };

  const handleActionToggle = (id: string) => {
    setPostActions(prev => prev.map(action => 
      action.id === id ? { ...action, enabled: !action.enabled } : action
    ));
  };

  const canConvert = () => {
    const requiredItems = checklist.filter(item => item.required);
    const completedRequiredItems = requiredItems.filter(item => item.completed);
    return completedRequiredItems.length === requiredItems.length &&
           projectData.projectName &&
           projectData.confirmedBudget &&
           projectData.startDate &&
           projectData.projectManager;
  };

  const handleConvert = async () => {
    setIsConverting(true);
    // Simulate conversion process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsConverting(false);
    setConversionComplete(true);
  };

  if (conversionComplete) {
    return (
      <div className="w-full px-4 lg:px-6">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Lead Successfully Converted!</h2>
            <p className="text-muted-foreground mb-6">
              {mockLead.name} has been converted to Project {projectData.projectCode}
            </p>
            
            <div className="flex justify-center space-x-4">
              <Button>
                <Building className="h-4 w-4 mr-2" />
                View Project
              </Button>
              <Button variant="outline">
                Back to Leads
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-4 lg:px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Lead
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <ArrowRightLeft className="h-6 w-6 mr-2" />
              Convert Lead to Project
            </h1>
            <p className="text-muted-foreground">
              Converting: <span className="font-medium">{mockLead.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Lead Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lead Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Company
              </h3>
              <p>{mockLead.company}</p>
              <p className="text-sm text-muted-foreground">{mockLead.project.type}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Primary Contact
              </h3>
              <p>{mockLead.contact.name}</p>
              <p className="text-sm text-muted-foreground">{mockLead.contact.email}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Budget Range
              </h3>
              <p>${mockLead.project.budgetMin.toLocaleString()} - ${mockLead.project.budgetMax.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{mockLead.project.area}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <PreConversionChecklist 
            checklist={checklist}
            onItemToggle={handleChecklistToggle}
          />
          
          <PostConversionActions 
            actions={postActions}
            onActionToggle={handleActionToggle}
          />
        </div>

        {/* Right Column */}
        <div>
          <ConversionForm 
            projectData={projectData}
            onDataChange={handleProjectDataChange}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button variant="outline">
          Cancel Conversion
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button 
            onClick={handleConvert}
            disabled={!canConvert() || isConverting}
          >
            {isConverting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Convert to Project
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
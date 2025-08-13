import { useState } from 'react';
import {
  ArrowLeft,
  Edit,
  Trash2,
  ArrowRightLeft,
  Star,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Clock,
  Target,
  TrendingUp,
  FileText,
  Send,
  PhoneCall,
  MessageSquare,
  Plus,
  Eye,
  Link as LinkIcon,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface LeadDetailProps {
  leadId: string;
}

// Mock lead data
const mockLead = {
  id: 'L001',
  name: 'Acme Corporation',
  company: 'Acme Corp',
  status: 'qualified' as const,
  score: 85,
  lastUpdated: '2 hours ago',
  
  // Contact Information
  contact: {
    name: 'John Smith',
    designation: 'Project Manager',
    mobile: '+1 (555) 123-4567',
    office: '+1 (555) 123-4568',
    email: 'john.smith@acme.com',
    secondaryEmail: 'john@personal.com',
    website: 'https://acme.com',
    socialMedia: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith'
    }
  },
  
  // Project Requirements
  project: {
    type: 'Commercial Building',
    subCategory: 'Office Complex',
    budgetMin: 50000,
    budgetMax: 100000,
    timeline: '3-6 months',
    expectedStartDate: '2024-03-15',
    duration: '12 months',
    location: 'New York, NY',
    area: '15000 sq ft',
    units: 1,
    requirements: 'Modern office building with sustainable features, parking for 100+ vehicles, and flexible floor plans.'
  },
  
  // Lead Scoring
  scoring: {
    overall: 85,
    budget: 90,
    timeline: 80,
    engagement: 85,
    location: 90,
    explanation: 'High-quality lead with confirmed budget and immediate timeline. Strong engagement in initial conversations.'
  },
  
  // Lead Summary
  summary: {
    stage: 'Qualified',
    daysInPipeline: 12,
    nextActionDue: '2024-01-25',
    probabilityToClose: 75,
    estimatedValue: 75000
  },
  
  // Assignment
  assignedTo: {
    salesOwner: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'Senior Sales Manager'
    },
    teamMembers: [
      { name: 'Mike Chen', avatar: '/avatars/mike.jpg', role: 'Technical Lead' },
      { name: 'Lisa Wang', avatar: '/avatars/lisa.jpg', role: 'Project Coordinator' }
    ]
  },
  
  // Key Dates
  dates: {
    created: '2024-01-10',
    lastContact: '2024-01-20',
    nextFollowUp: '2024-01-25',
    expectedClose: '2024-02-15'
  },
  
  // Source
  source: 'Website Contact Form',
  campaign: 'Q1 2024 Commercial Campaign'
};

function getStatusColor(status: string) {
  const colors = {
    new: 'bg-gray-100 text-gray-800',
    contacted: 'bg-blue-100 text-blue-800',
    qualified: 'bg-yellow-100 text-yellow-800',
    proposal: 'bg-orange-100 text-orange-800',
    negotiation: 'bg-purple-100 text-purple-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || colors.new;
}

function LeadScoreStars({ score }: { score: number }) {
  const stars = Math.round(score / 20);
  
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">({score}/100)</span>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Primary Contact</label>
            <p className="font-medium">{mockLead.contact.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Designation</label>
            <p>{mockLead.contact.designation}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Mobile</label>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <Button variant="link" className="p-0 h-auto text-blue-600">
                {mockLead.contact.mobile}
              </Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Office</label>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <Button variant="link" className="p-0 h-auto text-blue-600">
                {mockLead.contact.office}
              </Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <Button variant="link" className="p-0 h-auto text-blue-600">
                {mockLead.contact.email}
              </Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Website</label>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              <Button variant="link" className="p-0 h-auto text-blue-600">
                {mockLead.contact.website}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Project Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Project Type</label>
            <p className="font-medium">{mockLead.project.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Sub-category</label>
            <p>{mockLead.project.subCategory}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <p className="font-medium text-green-600">
                ${mockLead.project.budgetMin.toLocaleString()} - ${mockLead.project.budgetMax.toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Timeline</label>
            <p>{mockLead.project.timeline}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Expected Start Date</label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <p>{mockLead.project.expectedStartDate}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Duration</label>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <p>{mockLead.project.duration}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <p>{mockLead.project.location}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Area/Size</label>
            <p>{mockLead.project.area}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground">Special Requirements</label>
            <p className="mt-1">{mockLead.project.requirements}</p>
          </div>
        </CardContent>
      </Card>

      {/* Lead Scoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Lead Scoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Overall Score</span>
              <span className="text-2xl font-bold text-blue-600">{mockLead.scoring.overall}/100</span>
            </div>
            <Progress value={mockLead.scoring.overall} className="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { label: 'Budget', value: mockLead.scoring.budget },
              { label: 'Timeline', value: mockLead.scoring.timeline },
              { label: 'Engagement', value: mockLead.scoring.engagement },
              { label: 'Location', value: mockLead.scoring.location }
            ].map((item) => (
              <div key={item.label}>
                <label className="text-sm text-muted-foreground">{item.label}</label>
                <div className="flex items-center space-x-2">
                  <Progress value={item.value} className="flex-1 h-2" />
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Breakdown Explanation</label>
            <p className="text-sm mt-1">{mockLead.scoring.explanation}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivitiesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activities & Timeline</CardTitle>
        <CardDescription>Recent interactions and scheduled activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Activities timeline will be displayed here</p>
          <Button className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CommunicationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Communications</CardTitle>
        <CardDescription>Email, SMS, and call history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Communication history will be displayed here</p>
          <div className="flex justify-center space-x-2 mt-4">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Make Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LeadDetailContent({ leadId }: LeadDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" className="mr-3">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Leads
            </Button>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{mockLead.name}</h1>
                <Badge className={getStatusColor(mockLead.status)}>
                  {mockLead.status.charAt(0).toUpperCase() + mockLead.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-2">{mockLead.company}</p>
              <LeadScoreStars score={mockLead.score} />
              <p className="text-sm text-muted-foreground mt-1">
                Last updated: {mockLead.lastUpdated}
              </p>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Button>
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Convert to Project
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="communications">Communications</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="overview">
                  <OverviewTab />
                </TabsContent>
                <TabsContent value="activities">
                  <ActivitiesTab />
                </TabsContent>
                <TabsContent value="communications">
                  <CommunicationsTab />
                </TabsContent>
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Document management coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="notes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Notes section coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Change history coming soon...</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Lead Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lead Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Current Stage</label>
                  <p className="font-medium">{mockLead.summary.stage}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Days in Pipeline</label>
                  <p className="font-medium">{mockLead.summary.daysInPipeline} days</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Next Action Due</label>
                  <p className="font-medium">{mockLead.summary.nextActionDue}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Probability to Close</label>
                  <div className="flex items-center space-x-2">
                    <Progress value={mockLead.summary.probabilityToClose} className="flex-1" />
                    <span className="text-sm font-medium">{mockLead.summary.probabilityToClose}%</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Estimated Value</label>
                  <p className="font-medium text-green-600">${mockLead.summary.estimatedValue.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Assigned Team */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assigned Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Sales Owner</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockLead.assignedTo.salesOwner.avatar} />
                      <AvatarFallback>
                        {mockLead.assignedTo.salesOwner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{mockLead.assignedTo.salesOwner.name}</p>
                      <p className="text-xs text-muted-foreground">{mockLead.assignedTo.salesOwner.role}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm text-muted-foreground">Team Members</label>
                  <div className="space-y-2 mt-1">
                    {mockLead.assignedTo.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  Reassign Lead
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <ArrowRightLeft className="h-4 w-4 mr-2" />
                  Convert to Project
                </Button>
              </CardContent>
            </Card>

            {/* Key Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Created Date</label>
                  <p className="text-sm">{mockLead.dates.created}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Last Contact</label>
                  <p className="text-sm">{mockLead.dates.lastContact}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Next Follow-up</label>
                  <p className="text-sm">{mockLead.dates.nextFollowUp}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Expected Close</label>
                  <p className="text-sm">{mockLead.dates.expectedClose}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
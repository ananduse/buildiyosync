import { useState } from 'react';
import { 
  Building2, Camera, Palette, Ruler, Plus, Edit, 
  FileText, CheckCircle, AlertCircle, Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProjectDetailsForm from './project-details-form';
import ProjectRecce from './project-recce';
import ProjectMoodBoards from './project-mood-boards';
import ProjectSiteSurvey from './project-site-survey';
import type { 
  ProjectDetails, 
  RecceData, 
  MoodBoard, 
  SiteSurvey 
} from '@/types/project-details.types';

interface ProjectDetailsViewProps {
  projectId: string;
}

export default function ProjectDetailsView({ projectId }: ProjectDetailsViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const [recceData, setRecceData] = useState<RecceData | null>(null);
  const [moodBoards, setMoodBoards] = useState<MoodBoard[]>([]);
  const [siteSurvey, setSiteSurvey] = useState<SiteSurvey | null>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const handleSaveProjectDetails = (data: ProjectDetails) => {
    setProjectDetails(data);
    setShowDetailsForm(false);
  };

  const handleSaveRecce = (data: RecceData) => {
    setRecceData(data);
  };

  const handleSaveMoodBoard = (board: MoodBoard) => {
    setMoodBoards([...moodBoards, board]);
  };

  const handleSaveSurvey = (data: SiteSurvey) => {
    setSiteSurvey(data);
  };

  const ProjectOverview = () => {
    if (!projectDetails) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Building2 className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Project Details Yet</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            Start by adding comprehensive project details including site information, 
            construction specifications, and regulatory requirements.
          </p>
          <Button onClick={() => setShowDetailsForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project Details
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Project Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{projectDetails.projectName}</h2>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary">{projectDetails.projectType}</Badge>
              <Badge className={getStatusColor(projectDetails.projectStatus)}>
                {projectDetails.projectStatus}
              </Badge>
              {projectDetails.approvalStatus && (
                <Badge className={getApprovalColor(projectDetails.approvalStatus)}>
                  {projectDetails.approvalStatus}
                </Badge>
              )}
            </div>
          </div>
          <Button onClick={() => setShowDetailsForm(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{projectDetails.plotArea} {projectDetails.plotAreaUnit}</div>
              <p className="text-xs text-gray-500">Plot Area</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{projectDetails.numberOfFloors}</div>
              <p className="text-xs text-gray-500">Floors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {projectDetails.currency} {(projectDetails.estimatedBudget / 10000000).toFixed(1)}Cr
              </div>
              <p className="text-xs text-gray-500">Budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{projectDetails.builtUpArea} sqft</div>
              <p className="text-xs text-gray-500">Built-up Area</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{projectDetails.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{projectDetails.clientContact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{projectDetails.clientEmail}</p>
              </div>
            </CardContent>
          </Card>

          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Site Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{projectDetails.siteAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City & State</p>
                <p className="font-medium">{projectDetails.city}, {projectDetails.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Orientation</p>
                <p className="font-medium capitalize">{projectDetails.orientation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Construction Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Construction Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <Badge variant="outline">{projectDetails.constructionType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Structure</span>
                <Badge variant="outline">{projectDetails.structureType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Foundation</span>
                <Badge variant="outline">{projectDetails.foundationType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Roof Type</span>
                <Badge variant="outline">{projectDetails.roofType}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Design Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Design Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Architectural Style</p>
                <p className="font-medium">{projectDetails.architecturalStyle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ceiling Height</p>
                <p className="font-medium">{projectDetails.ceilingHeight} ft</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Flooring</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {projectDetails.flooringType.map((floor, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {floor}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Special Features */}
        {(projectDetails.sustainabilityFeatures?.length > 0 || 
          projectDetails.smartHomeFeatures?.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Special Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectDetails.sustainabilityFeatures?.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Sustainability Features</p>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.sustainabilityFeatures.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="bg-green-50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {projectDetails.smartHomeFeatures?.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Smart Home Features</p>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.smartHomeFeatures.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Challenges Alert */}
        {projectDetails.challenges && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Challenges:</strong> {projectDetails.challenges}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: 'bg-blue-100 text-blue-700',
      design: 'bg-purple-100 text-purple-700',
      approval: 'bg-yellow-100 text-yellow-700',
      construction: 'bg-orange-100 text-orange-700',
      completed: 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getApprovalColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      resubmitted: 'bg-blue-100 text-blue-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (showDetailsForm) {
    return (
      <ProjectDetailsForm
        initialData={projectDetails || undefined}
        onSave={handleSaveProjectDetails}
        onCancel={() => setShowDetailsForm(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="recce" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Site Recce
          </TabsTrigger>
          <TabsTrigger value="survey" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Site Survey
          </TabsTrigger>
          <TabsTrigger value="moodboards" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Mood Boards
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="recce">
          <ProjectRecce 
            projectId={projectId}
            recceData={recceData || undefined}
            onSave={handleSaveRecce}
          />
        </TabsContent>

        <TabsContent value="survey">
          <ProjectSiteSurvey
            projectId={projectId}
            surveyData={siteSurvey || undefined}
            onSave={handleSaveSurvey}
          />
        </TabsContent>

        <TabsContent value="moodboards">
          <ProjectMoodBoards
            projectId={projectId}
            moodBoards={moodBoards}
            onSave={handleSaveMoodBoard}
          />
        </TabsContent>

        <TabsContent value="reports">
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Generate comprehensive reports including project summary, cost analysis, 
              progress tracking, and compliance documentation.
            </p>
            <div className="flex gap-3">
              <Button variant="outline">
                Generate Project Report
              </Button>
              <Button variant="outline">
                Export Survey Data
              </Button>
              <Button variant="outline">
                Cost Analysis
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
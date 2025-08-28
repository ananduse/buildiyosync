import { useState } from 'react';
import { 
  Save, X, Calendar, MapPin, Building2, Ruler, Home, 
  DollarSign, FileCheck, AlertCircle, Plus, Trash2, Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import type { ProjectDetails } from '@/types/project-details.types';

interface ProjectDetailsFormProps {
  initialData?: Partial<ProjectDetails>;
  onSave: (data: ProjectDetails) => void;
  onCancel: () => void;
}

export default function ProjectDetailsForm({ 
  initialData, 
  onSave, 
  onCancel 
}: ProjectDetailsFormProps) {
  const [formData, setFormData] = useState<Partial<ProjectDetails>>({
    projectCategory: 'residential',
    projectType: 'new-construction',
    projectStatus: 'planning',
    projectPhase: 'concept',
    clientType: 'private',
    plotAreaUnit: 'sqft',
    constructionMethodology: 'conventional',
    structureType: 'rcc-frame',
    foundationType: 'isolated',
    roofType: 'flat',
    approvalStatus: 'not-started',
    currency: 'INR',
    numberOfFloors: 1,
    basementFloors: 0,
    totalFloors: 1,
    ceilingHeight: 10,
    far: 2.0,
    groundCoverage: 60,
    retentionPercentage: 10,
    ...initialData
  });

  const [flooringTypes, setFlooringTypes] = useState<string[]>(
    initialData?.flooringType || ['Vitrified Tiles']
  );
  const [wallFinishes, setWallFinishes] = useState<string[]>(
    initialData?.wallFinish || ['Paint']
  );
  const [sustainabilityFeatures, setSustainabilityFeatures] = useState<string[]>(
    initialData?.sustainabilityFeatures || []
  );
  const [smartHomeFeatures, setSmartHomeFeatures] = useState<string[]>(
    initialData?.smartBuildingFeatures || []
  );
  const [qualityStandards, setQualityStandards] = useState<string[]>(
    initialData?.qualityStandards || []
  );
  const [constructionStandards, setConstructionStandards] = useState<string[]>(
    initialData?.constructionStandards || []
  );
  const [safetyStandards, setSafetyStandards] = useState<string[]>(
    initialData?.safetyStandards || []
  );

  const handleInputChange = (field: keyof ProjectDetails, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddItem = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    value: string
  ) => {
    if (value && !list.includes(value)) {
      setList([...list, value]);
    }
  };

  const handleRemoveItem = (
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>, 
    index: number
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const completeData: ProjectDetails = {
      id: initialData?.id || `PRJ-${Date.now()}`,
      projectId: initialData?.projectId || '',
      projectCode: formData.projectCode || `PC-${Date.now()}`,
      projectName: formData.projectName || '',
      projectCategory: formData.projectCategory || 'residential',
      projectType: formData.projectType || 'new-construction',
      projectSubType: formData.projectSubType,
      projectStatus: formData.projectStatus || 'planning',
      projectPhase: formData.projectPhase || 'concept',
      clientName: formData.clientName || '',
      clientOrganization: formData.clientOrganization,
      clientType: formData.clientType || 'private',
      clientContact: formData.clientContact || '',
      clientEmail: formData.clientEmail || '',
      clientAddress: formData.clientAddress,
      clientGSTIN: formData.clientGSTIN,
      architect: formData.architect,
      structuralConsultant: formData.structuralConsultant,
      mepConsultant: formData.mepConsultant,
      pmcName: formData.pmcName,
      mainContractor: formData.mainContractor,
      projectInitiationDate: formData.projectInitiationDate || new Date().toISOString(),
      designStartDate: formData.designStartDate,
      approvalSubmissionDate: formData.approvalSubmissionDate,
      constructionStartDate: formData.constructionStartDate || new Date().toISOString(),
      expectedCompletion: formData.expectedCompletion || '',
      actualCompletion: formData.actualCompletion,
      warrantyPeriod: formData.warrantyPeriod,
      defectLiabilityPeriod: formData.defectLiabilityPeriod,
      siteAddress: formData.siteAddress || '',
      city: formData.city || '',
      state: formData.state || '',
      pincode: formData.pincode || '',
      latitude: formData.latitude,
      longitude: formData.longitude,
      plotArea: formData.plotArea || 0,
      plotAreaUnit: formData.plotAreaUnit || 'sqft',
      orientation: formData.orientation || 'north',
      constructionMethodology: formData.constructionMethodology || 'conventional',
      structureType: formData.structureType || 'rcc-frame',
      foundationType: formData.foundationType || 'isolated',
      numberOfFloors: formData.numberOfFloors || 1,
      basementFloors: formData.basementFloors || 0,
      stiltFloors: formData.stiltFloors,
      podiumFloors: formData.podiumFloors,
      typicalFloors: formData.typicalFloors,
      totalFloors: formData.totalFloors || 1,
      builtUpArea: formData.builtUpArea || 0,
      carpetArea: formData.carpetArea || 0,
      superBuiltUpArea: formData.superBuiltUpArea || 0,
      commonAreaPercentage: formData.commonAreaPercentage,
      efficiencyRatio: formData.efficiencyRatio,
      far: formData.far || 2.0,
      groundCoverage: formData.groundCoverage || 60,
      openSpaceRatio: formData.openSpaceRatio,
      parkingSpaces: formData.parkingSpaces,
      greenAreaPercentage: formData.greenAreaPercentage,
      architecturalStyle: formData.architecturalStyle || '',
      facadeType: formData.facadeType || '',
      roofType: formData.roofType || 'flat',
      flooringType: flooringTypes,
      ceilingHeight: formData.ceilingHeight || 10,
      wallFinish: wallFinishes,
      approvalStatus: formData.approvalStatus || 'not-started',
      masterPlanZone: formData.masterPlanZone,
      landUsePermitted: formData.landUsePermitted,
      environmentalClearance: formData.environmentalClearance,
      buildingPlanApproval: formData.buildingPlanApproval,
      fireNOC: formData.fireNOC,
      structuralStabilityCertificate: formData.structuralStabilityCertificate,
      occupancyCertificate: formData.occupancyCertificate,
      completionCertificate: formData.completionCertificate,
      projectValue: formData.projectValue || 0,
      contractValue: formData.contractValue || 0,
      estimatedBudget: formData.estimatedBudget || 0,
      approvedBudget: formData.approvedBudget || 0,
      revisedBudget: formData.revisedBudget,
      actualCost: formData.actualCost,
      currency: formData.currency || 'INR',
      costBreakdown: formData.costBreakdown,
      paymentTerms: formData.paymentTerms,
      billingMilestones: formData.billingMilestones,
      retentionPercentage: formData.retentionPercentage,
      mobilizationAdvance: formData.mobilizationAdvance,
      performanceGuarantee: formData.performanceGuarantee,
      insurancePolicies: formData.insurancePolicies,
      sustainabilityFeatures,
      greenBuildingCertification: formData.greenBuildingCertification,
      smartBuildingFeatures: smartHomeFeatures,
      specialRequirements: formData.specialRequirements,
      qualityStandards,
      constructionStandards,
      testingProtocols: formData.testingProtocols,
      qualityControlPlan: formData.qualityControlPlan,
      safetyStandards,
      riskAssessment: formData.riskAssessment,
      challenges: formData.challenges,
      risks: formData.risks,
      kpis: formData.kpis,
      dataSource: formData.dataSource || 'manual-entry',
      lastAuditDate: formData.lastAuditDate,
      nextReviewDate: formData.nextReviewDate,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: initialData?.createdBy || 'current-user',
      lastModifiedBy: 'current-user'
    };
    
    onSave(completeData);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Project Details' : 'Add Project Details'}
        </h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Save Details
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid grid-cols-8 w-full">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="site">Site Details</TabsTrigger>
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="quality">Quality & Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName || ''}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="Enter project name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectCode">Project Code *</Label>
                <Input
                  id="projectCode"
                  value={formData.projectCode || ''}
                  onChange={(e) => handleInputChange('projectCode', e.target.value)}
                  placeholder="e.g., PC-2024-001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectCategory">Project Category *</Label>
                <Select 
                  value={formData.projectCategory}
                  onValueChange={(value) => handleInputChange('projectCategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                    <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select 
                  value={formData.projectType}
                  onValueChange={(value) => handleInputChange('projectType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-construction">New Construction</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="expansion">Expansion</SelectItem>
                    <SelectItem value="retrofit">Retrofit</SelectItem>
                    <SelectItem value="demolition">Demolition</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectSubType">Project Sub-Type</Label>
                <Input
                  id="projectSubType"
                  value={formData.projectSubType || ''}
                  onChange={(e) => handleInputChange('projectSubType', e.target.value)}
                  placeholder="e.g., high-rise, villa, warehouse"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectPhase">Project Phase</Label>
                <Input
                  id="projectPhase"
                  value={formData.projectPhase || ''}
                  onChange={(e) => handleInputChange('projectPhase', e.target.value)}
                  placeholder="Current phase within status"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectStatus">Project Status *</Label>
                <Select 
                  value={formData.projectStatus}
                  onValueChange={(value) => handleInputChange('projectStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="initiation">Initiation</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="tendering">Tendering</SelectItem>
                    <SelectItem value="approval">Approval</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="commissioning">Commissioning</SelectItem>
                    <SelectItem value="handover">Handover</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectInitiationDate">Project Initiation Date *</Label>
                <Input
                  id="projectInitiationDate"
                  type="date"
                  value={formData.projectInitiationDate?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange('projectInitiationDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designStartDate">Design Start Date</Label>
                <Input
                  id="designStartDate"
                  type="date"
                  value={formData.designStartDate?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange('designStartDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="constructionStartDate">Construction Start Date *</Label>
                <Input
                  id="constructionStartDate"
                  type="date"
                  value={formData.constructionStartDate?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange('constructionStartDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedCompletion">Expected Completion *</Label>
                <Input
                  id="expectedCompletion"
                  type="date"
                  value={formData.expectedCompletion?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange('expectedCompletion', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warrantyPeriod">Warranty Period (months)</Label>
                <Input
                  id="warrantyPeriod"
                  type="number"
                  value={formData.warrantyPeriod || ''}
                  onChange={(e) => handleInputChange('warrantyPeriod', parseInt(e.target.value))}
                  placeholder="e.g., 12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defectLiabilityPeriod">Defect Liability Period (months)</Label>
                <Input
                  id="defectLiabilityPeriod"
                  type="number"
                  value={formData.defectLiabilityPeriod || ''}
                  onChange={(e) => handleInputChange('defectLiabilityPeriod', parseInt(e.target.value))}
                  placeholder="e.g., 12"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stakeholders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stakeholders Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName || ''}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientOrganization">Client Organization</Label>
                <Input
                  id="clientOrganization"
                  value={formData.clientOrganization || ''}
                  onChange={(e) => handleInputChange('clientOrganization', e.target.value)}
                  placeholder="Organization name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientType">Client Type *</Label>
                <Select 
                  value={formData.clientType}
                  onValueChange={(value) => handleInputChange('clientType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="ppp">Public-Private Partnership</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientContact">Client Contact *</Label>
                <Input
                  id="clientContact"
                  value={formData.clientContact || ''}
                  onChange={(e) => handleInputChange('clientContact', e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail || ''}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="client@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientGSTIN">Client GSTIN</Label>
                <Input
                  id="clientGSTIN"
                  value={formData.clientGSTIN || ''}
                  onChange={(e) => handleInputChange('clientGSTIN', e.target.value)}
                  placeholder="GST identification number"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea
                  id="clientAddress"
                  value={formData.clientAddress || ''}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                  placeholder="Complete address"
                  rows={2}
                />
              </div>

              <Separator className="col-span-2" />

              <div className="space-y-2">
                <Label htmlFor="architect">Architect</Label>
                <Input
                  id="architect"
                  value={formData.architect || ''}
                  onChange={(e) => handleInputChange('architect', e.target.value)}
                  placeholder="Architect name/firm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="structuralConsultant">Structural Consultant</Label>
                <Input
                  id="structuralConsultant"
                  value={formData.structuralConsultant || ''}
                  onChange={(e) => handleInputChange('structuralConsultant', e.target.value)}
                  placeholder="Structural consultant name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mepConsultant">MEP Consultant</Label>
                <Input
                  id="mepConsultant"
                  value={formData.mepConsultant || ''}
                  onChange={(e) => handleInputChange('mepConsultant', e.target.value)}
                  placeholder="MEP consultant name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pmcName">Project Management Consultant</Label>
                <Input
                  id="pmcName"
                  value={formData.pmcName || ''}
                  onChange={(e) => handleInputChange('pmcName', e.target.value)}
                  placeholder="PMC name"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="mainContractor">Main Contractor</Label>
                <Input
                  id="mainContractor"
                  value={formData.mainContractor || ''}
                  onChange={(e) => handleInputChange('mainContractor', e.target.value)}
                  placeholder="Main contractor name"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="site" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="siteAddress">Site Address *</Label>
                  <Textarea
                    id="siteAddress"
                    value={formData.siteAddress || ''}
                    onChange={(e) => handleInputChange('siteAddress', e.target.value)}
                    placeholder="Enter complete site address"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode || ''}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="Enter pincode"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orientation">Site Orientation</Label>
                  <Select 
                    value={formData.orientation}
                    onValueChange={(value) => handleInputChange('orientation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north">North</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                      <SelectItem value="northeast">North-East</SelectItem>
                      <SelectItem value="northwest">North-West</SelectItem>
                      <SelectItem value="southeast">South-East</SelectItem>
                      <SelectItem value="southwest">South-West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plotArea">Plot Area *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="plotArea"
                      type="number"
                      value={formData.plotArea || ''}
                      onChange={(e) => handleInputChange('plotArea', parseFloat(e.target.value))}
                      placeholder="Enter area"
                    />
                    <Select 
                      value={formData.plotAreaUnit}
                      onValueChange={(value) => handleInputChange('plotAreaUnit', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqft">Sq.ft</SelectItem>
                        <SelectItem value="sqm">Sq.m</SelectItem>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="cents">Cents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latitude">GPS Coordinates (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="latitude"
                      type="number"
                      step="0.000001"
                      value={formData.latitude || ''}
                      onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value))}
                      placeholder="Latitude"
                    />
                    <Input
                      id="longitude"
                      type="number"
                      step="0.000001"
                      value={formData.longitude || ''}
                      onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value))}
                      placeholder="Longitude"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="construction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Construction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="constructionType">Construction Type</Label>
                <Select 
                  value={formData.constructionType}
                  onValueChange={(value) => handleInputChange('constructionType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Construction</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="extension">Extension</SelectItem>
                    <SelectItem value="interior">Interior Work</SelectItem>
                    <SelectItem value="restoration">Restoration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="structureType">Structure Type</Label>
                <Select 
                  value={formData.structureType}
                  onValueChange={(value) => handleInputChange('structureType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rcc">RCC Frame</SelectItem>
                    <SelectItem value="steel">Steel Structure</SelectItem>
                    <SelectItem value="wood">Wood Frame</SelectItem>
                    <SelectItem value="composite">Composite</SelectItem>
                    <SelectItem value="prefab">Prefabricated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="foundationType">Foundation Type</Label>
                <Select 
                  value={formData.foundationType}
                  onValueChange={(value) => handleInputChange('foundationType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shallow">Shallow Foundation</SelectItem>
                    <SelectItem value="deep">Deep Foundation</SelectItem>
                    <SelectItem value="pile">Pile Foundation</SelectItem>
                    <SelectItem value="raft">Raft Foundation</SelectItem>
                    <SelectItem value="combined">Combined Foundation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfFloors">Number of Floors</Label>
                <Input
                  id="numberOfFloors"
                  type="number"
                  min="0"
                  value={formData.numberOfFloors || 0}
                  onChange={(e) => handleInputChange('numberOfFloors', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="basementFloors">Basement Floors</Label>
                <Input
                  id="basementFloors"
                  type="number"
                  min="0"
                  value={formData.basementFloors || 0}
                  onChange={(e) => handleInputChange('basementFloors', parseInt(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="builtUpArea">Built-up Area (sqft)</Label>
                <Input
                  id="builtUpArea"
                  type="number"
                  value={formData.builtUpArea || ''}
                  onChange={(e) => handleInputChange('builtUpArea', parseFloat(e.target.value))}
                  placeholder="Enter built-up area"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carpetArea">Carpet Area (sqft)</Label>
                <Input
                  id="carpetArea"
                  type="number"
                  value={formData.carpetArea || ''}
                  onChange={(e) => handleInputChange('carpetArea', parseFloat(e.target.value))}
                  placeholder="Enter carpet area"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="superBuiltUpArea">Super Built-up Area (sqft)</Label>
                <Input
                  id="superBuiltUpArea"
                  type="number"
                  value={formData.superBuiltUpArea || ''}
                  onChange={(e) => handleInputChange('superBuiltUpArea', parseFloat(e.target.value))}
                  placeholder="Enter super built-up area"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Design Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="architecturalStyle">Architectural Style</Label>
                  <Input
                    id="architecturalStyle"
                    value={formData.architecturalStyle || ''}
                    onChange={(e) => handleInputChange('architecturalStyle', e.target.value)}
                    placeholder="e.g., Modern, Contemporary, Traditional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facadeType">Facade Type</Label>
                  <Input
                    id="facadeType"
                    value={formData.facadeType || ''}
                    onChange={(e) => handleInputChange('facadeType', e.target.value)}
                    placeholder="e.g., Glass, Stone, Brick"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roofType">Roof Type</Label>
                  <Select 
                    value={formData.roofType}
                    onValueChange={(value) => handleInputChange('roofType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flat">Flat Roof</SelectItem>
                      <SelectItem value="sloped">Sloped Roof</SelectItem>
                      <SelectItem value="curved">Curved Roof</SelectItem>
                      <SelectItem value="green">Green Roof</SelectItem>
                      <SelectItem value="mixed">Mixed Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ceilingHeight">Ceiling Height (ft)</Label>
                  <Input
                    id="ceilingHeight"
                    type="number"
                    value={formData.ceilingHeight || ''}
                    onChange={(e) => handleInputChange('ceilingHeight', parseFloat(e.target.value))}
                    placeholder="Enter ceiling height"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Flooring Types</Label>
                  <div className="flex gap-2">
                    <Input
                      id="newFlooring"
                      placeholder="Add flooring type"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          handleAddItem(flooringTypes, setFlooringTypes, input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('newFlooring') as HTMLInputElement;
                        handleAddItem(flooringTypes, setFlooringTypes, input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {flooringTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {type}
                        <button
                          onClick={() => handleRemoveItem(flooringTypes, setFlooringTypes, index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Wall Finishes</Label>
                  <div className="flex gap-2">
                    <Input
                      id="newWallFinish"
                      placeholder="Add wall finish"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          handleAddItem(wallFinishes, setWallFinishes, input.value);
                          input.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('newWallFinish') as HTMLInputElement;
                        handleAddItem(wallFinishes, setWallFinishes, input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {wallFinishes.map((finish, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {finish}
                        <button
                          onClick={() => handleRemoveItem(wallFinishes, setWallFinishes, index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulatory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Regulatory Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="approvalStatus">Approval Status</Label>
                <Select 
                  value={formData.approvalStatus}
                  onValueChange={(value) => handleInputChange('approvalStatus', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="resubmitted">Resubmitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sanctionNumber">Sanction Number</Label>
                <Input
                  id="sanctionNumber"
                  value={formData.sanctionNumber || ''}
                  onChange={(e) => handleInputChange('sanctionNumber', e.target.value)}
                  placeholder="Enter sanction number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sanctionDate">Sanction Date</Label>
                <Input
                  id="sanctionDate"
                  type="date"
                  value={formData.sanctionDate?.split('T')[0] || ''}
                  onChange={(e) => handleInputChange('sanctionDate', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="occupancyCertificate">Occupancy Certificate</Label>
                  <Switch
                    id="occupancyCertificate"
                    checked={formData.occupancyCertificate || false}
                    onCheckedChange={(checked) => handleInputChange('occupancyCertificate', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="completionCertificate">Completion Certificate</Label>
                  <Switch
                    id="completionCertificate"
                    checked={formData.completionCertificate || false}
                    onCheckedChange={(checked) => handleInputChange('completionCertificate', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget">Estimated Budget</Label>
                <div className="flex gap-2">
                  <Select 
                    value={formData.currency}
                    onValueChange={(value) => handleInputChange('currency', value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">₹ INR</SelectItem>
                      <SelectItem value="USD">$ USD</SelectItem>
                      <SelectItem value="EUR">€ EUR</SelectItem>
                      <SelectItem value="GBP">£ GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="estimatedBudget"
                    type="number"
                    value={formData.estimatedBudget || ''}
                    onChange={(e) => handleInputChange('estimatedBudget', parseFloat(e.target.value))}
                    placeholder="Enter amount"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="actualCost">Actual Cost (if completed)</Label>
                <Input
                  id="actualCost"
                  type="number"
                  value={formData.actualCost || ''}
                  onChange={(e) => handleInputChange('actualCost', parseFloat(e.target.value))}
                  placeholder="Enter actual cost"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Textarea
                  id="paymentTerms"
                  value={formData.paymentTerms || ''}
                  onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                  placeholder="Enter payment terms and conditions"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Special Features & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Sustainability Features</Label>
                <div className="flex gap-2">
                  <Input
                    id="newSustainability"
                    placeholder="Add sustainability feature (e.g., Solar panels, Rainwater harvesting)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        handleAddItem(sustainabilityFeatures, setSustainabilityFeatures, input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.getElementById('newSustainability') as HTMLInputElement;
                      handleAddItem(sustainabilityFeatures, setSustainabilityFeatures, input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sustainabilityFeatures.map((feature, index) => (
                    <Badge key={index} variant="outline" className="gap-1 bg-green-50">
                      {feature}
                      <button
                        onClick={() => handleRemoveItem(sustainabilityFeatures, setSustainabilityFeatures, index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Smart Home Features</Label>
                <div className="flex gap-2">
                  <Input
                    id="newSmartHome"
                    placeholder="Add smart home feature (e.g., Home automation, Security system)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        handleAddItem(smartHomeFeatures, setSmartHomeFeatures, input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.getElementById('newSmartHome') as HTMLInputElement;
                      handleAddItem(smartHomeFeatures, setSmartHomeFeatures, input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {smartHomeFeatures.map((feature, index) => (
                    <Badge key={index} variant="outline" className="gap-1 bg-blue-50">
                      {feature}
                      <button
                        onClick={() => handleRemoveItem(smartHomeFeatures, setSmartHomeFeatures, index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements || ''}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Enter any special requirements or unique features"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">Challenges & Constraints</Label>
                <Textarea
                  id="challenges"
                  value={formData.challenges || ''}
                  onChange={(e) => handleInputChange('challenges', e.target.value)}
                  placeholder="Describe any challenges or constraints faced"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
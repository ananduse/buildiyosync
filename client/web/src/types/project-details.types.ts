// Project Details Types

export interface ProjectDetails {
  id: string;
  projectId: string;
  projectCode: string; // Enterprise project code
  
  // Basic Information
  projectName: string;
  projectCategory: 'infrastructure' | 'real-estate' | 'commercial' | 'residential' | 'industrial' | 'institutional' | 'mixed-use';
  projectType: 'new-construction' | 'renovation' | 'expansion' | 'retrofit' | 'demolition';
  projectSubType?: string; // e.g., 'high-rise', 'villa', 'warehouse', 'hospital'
  projectStatus: 'initiation' | 'planning' | 'design' | 'tendering' | 'approval' | 'construction' | 'commissioning' | 'handover' | 'completed' | 'on-hold' | 'cancelled';
  projectPhase: string; // Current phase within status
  
  // Client & Stakeholder Information
  clientName: string;
  clientOrganization?: string;
  clientType: 'private' | 'government' | 'ppp' | 'corporate' | 'individual';
  clientContact: string;
  clientEmail: string;
  clientAddress?: string;
  clientGSTIN?: string; // For Indian projects
  
  // Key Stakeholders
  architect?: string;
  structuralConsultant?: string;
  mepConsultant?: string;
  pmcName?: string; // Project Management Consultant
  mainContractor?: string;
  
  // Timeline
  projectInitiationDate: string;
  designStartDate?: string;
  approvalSubmissionDate?: string;
  constructionStartDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  warrantyPeriod?: number; // in months
  defectLiabilityPeriod?: number; // in months
  
  // Site Information
  siteAddress: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  plotArea: number; // in sq ft
  plotAreaUnit: 'sqft' | 'sqm' | 'acres' | 'cents';
  orientation: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  
  // Construction Details
  constructionMethodology: 'conventional' | 'prefab' | 'modular' | 'hybrid' | 'fast-track';
  structureType: 'rcc-frame' | 'steel-frame' | 'composite' | 'load-bearing' | 'pre-engineered' | 'timber' | 'hybrid';
  foundationType: 'isolated' | 'combined' | 'raft' | 'pile' | 'well' | 'caisson' | 'special';
  
  // Building Configuration
  numberOfFloors: number;
  basementFloors: number;
  stiltFloors?: number;
  podiumFloors?: number;
  typicalFloors?: number;
  totalFloors: number;
  
  // Areas (Enterprise metrics)
  plotArea: number; // Total site area
  plotAreaUnit: 'sqft' | 'sqm' | 'acres' | 'hectares';
  builtUpArea: number; // Total constructed area
  carpetArea: number; // Usable area
  superBuiltUpArea: number; // Including common areas
  commonAreaPercentage?: number;
  efficiencyRatio?: number; // Carpet/Super built-up
  
  // Advanced Metrics
  far: number; // Floor Area Ratio
  groundCoverage: number; // percentage
  openSpaceRatio?: number;
  parkingSpaces?: number;
  greenAreaPercentage?: number;
  
  // Design Specifications
  architecturalStyle: string;
  facadeType: string;
  roofType: 'flat' | 'sloped' | 'curved' | 'green' | 'mixed';
  flooringType: string[];
  ceilingHeight: number; // in feet
  wallFinish: string[];
  
  // Regulatory Information
  approvalStatus: 'not-started' | 'in-progress' | 'pending' | 'approved' | 'rejected' | 'resubmitted' | 'expired';
  masterPlanZone?: string;
  landUsePermitted?: string;
  
  // Approvals & Certifications
  environmentalClearance?: {
    required: boolean;
    status?: string;
    number?: string;
    date?: string;
  };
  buildingPlanApproval?: {
    number?: string;
    date?: string;
    validUpto?: string;
  };
  fireNOC?: {
    number?: string;
    date?: string;
    validUpto?: string;
  };
  structuralStabilityCertificate?: {
    number?: string;
    date?: string;
    issuedBy?: string;
  };
  occupancyCertificate?: {
    obtained: boolean;
    number?: string;
    date?: string;
    type?: 'partial' | 'full';
  };
  completionCertificate?: {
    obtained: boolean;
    number?: string;
    date?: string;
  };
  
  // Financial Information
  projectValue: number; // Total project value
  contractValue: number; // Construction contract value
  estimatedBudget: number;
  approvedBudget: number;
  revisedBudget?: number;
  actualCost?: number;
  currency: string;
  
  // Cost Breakdown
  costBreakdown?: {
    land?: number;
    construction?: number;
    consultancy?: number;
    approvals?: number;
    utilities?: number;
    contingency?: number;
    financing?: number;
    other?: number;
  };
  
  // Payment & Billing
  paymentTerms?: string;
  billingMilestones?: string[];
  retentionPercentage?: number;
  mobilizationAdvance?: number;
  
  // Insurance & Guarantees
  performanceGuarantee?: {
    amount: number;
    validUpto: string;
    bankName?: string;
  };
  insurancePolicies?: {
    car?: string; // Contractor All Risk
    wc?: string; // Workmen Compensation
    tpl?: string; // Third Party Liability
    professionalIndemnity?: string;
  };
  
  // Special Requirements & Certifications
  sustainabilityFeatures?: string[];
  greenBuildingCertification?: {
    type?: 'leed' | 'igbc' | 'griha' | 'edge' | 'well' | 'breeam';
    targetRating?: string;
    achievedRating?: string;
    certificationDate?: string;
  };
  smartBuildingFeatures?: string[];
  specialRequirements?: string;
  
  // Quality & Standards
  qualityStandards?: string[]; // ISO 9001, etc.
  constructionStandards?: string[]; // IS codes, BS codes, etc.
  testingProtocols?: string[];
  qualityControlPlan?: boolean;
  
  // Safety & Risk
  safetyStandards?: string[]; // ISO 45001, etc.
  riskAssessment?: {
    conducted: boolean;
    date?: string;
    highRiskActivities?: string[];
    mitigationMeasures?: string[];
  };
  
  // Project Challenges & Risks
  challenges?: string;
  risks?: {
    technical?: string[];
    financial?: string[];
    regulatory?: string[];
    environmental?: string[];
    social?: string[];
  };
  
  // Key Performance Indicators
  kpis?: {
    scheduleVariance?: number; // percentage
    costVariance?: number; // percentage
    qualityScore?: number; // out of 100
    safetyScore?: number; // out of 100
    customerSatisfaction?: number; // out of 100
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  dataSource?: string; // ERP system, manual entry, etc.
  lastAuditDate?: string;
  nextReviewDate?: string;
}

export interface RecceData {
  id: string;
  projectId: string;
  visitDate: string;
  visitedBy: string[];
  weatherCondition: string;
  
  // Site Observations
  siteAccess: string;
  neighboringStructures: string;
  vegetation: string;
  soilType: string;
  topography: string;
  utilities: {
    electricity: boolean;
    water: boolean;
    sewage: boolean;
    gas: boolean;
    internet: boolean;
  };
  
  // Measurements
  measurements: SiteMeasurement[];
  
  // Media
  photos: RecceMedia[];
  videos: RecceMedia[];
  
  // Notes
  observations: string;
  recommendations: string;
  concerns: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface SiteMeasurement {
  id: string;
  label: string;
  value: number;
  unit: 'ft' | 'm' | 'inch' | 'cm';
  type: 'length' | 'width' | 'height' | 'area' | 'perimeter' | 'diagonal';
  notes?: string;
}

export interface RecceMedia {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  tags: string[];
  location?: string;
  takenAt: string;
  uploadedAt: string;
  uploadedBy: string;
  fileSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number; // for videos in seconds
}

export interface MoodBoard {
  id: string;
  projectId: string;
  title: string;
  description: string;
  category: 'interior' | 'exterior' | 'landscape' | 'furniture' | 'color' | 'material' | 'lighting';
  
  // Board Items
  items: MoodBoardItem[];
  
  // Color Palette
  colorPalette: ColorSwatch[];
  
  // Materials
  materials: MaterialSample[];
  
  // Status
  status: 'draft' | 'review' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedDate?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface MoodBoardItem {
  id: string;
  type: 'image' | 'product' | 'texture' | 'reference';
  imageUrl: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
  source?: string;
  productLink?: string;
  price?: number;
  specifications?: Record<string, any>;
  tags: string[];
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export interface ColorSwatch {
  id: string;
  name: string;
  hexCode: string;
  rgbCode?: string;
  pantone?: string;
  usage: string[];
  brand?: string;
}

export interface MaterialSample {
  id: string;
  name: string;
  type: 'tile' | 'wood' | 'fabric' | 'paint' | 'metal' | 'glass' | 'stone' | 'other';
  imageUrl?: string;
  supplier: string;
  productCode?: string;
  price?: number;
  unit?: string;
  specifications?: Record<string, any>;
  availability: 'available' | 'order' | 'discontinued';
}

export interface SiteSurvey {
  id: string;
  projectId: string;
  surveyDate: string;
  surveyType: 'initial' | 'progress' | 'final' | 'issue';
  surveyTeam: SurveyTeamMember[];
  
  // Survey Data
  measurements: DetailedMeasurement[];
  levelData: LevelData[];
  
  // Site Conditions
  weatherDuringVisit: string;
  siteCondition: 'dry' | 'wet' | 'muddy' | 'rocky' | 'sandy';
  accessibility: 'good' | 'moderate' | 'poor';
  
  // Documentation
  photos: SurveyPhoto[];
  videos: SurveyVideo[];
  sketches: SketchDocument[];
  
  // Technical Data
  existingStructures?: string;
  demolitionRequired?: boolean;
  excavationDepth?: number;
  backfillingRequired?: boolean;
  
  // Services & Utilities
  electricityConnection?: {
    available: boolean;
    distance: number;
    capacity: string;
  };
  waterSupply?: {
    available: boolean;
    source: 'municipal' | 'borewell' | 'tanker';
    quality: string;
  };
  sewerConnection?: {
    available: boolean;
    type: 'municipal' | 'septic';
    distance: number;
  };
  
  // Environmental Factors
  sunPath: string;
  windDirection: string;
  noiseLevel: 'low' | 'moderate' | 'high';
  trafficCondition: string;
  
  // Legal & Compliance
  setbacks: {
    front: number;
    rear: number;
    left: number;
    right: number;
  };
  heightRestrictions?: number;
  floorAreaRatio?: number;
  groundCoverage?: number;
  
  // Recommendations
  recommendations: string;
  challenges: string;
  proposedSolutions: string;
  
  // Sign-off
  surveyorName: string;
  surveyorSignature?: string;
  clientApproval?: boolean;
  clientSignature?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface SurveyTeamMember {
  id: string;
  name: string;
  role: 'surveyor' | 'architect' | 'engineer' | 'assistant';
  contact: string;
  email: string;
}

export interface DetailedMeasurement {
  id: string;
  category: 'boundary' | 'structure' | 'room' | 'opening' | 'level' | 'offset';
  label: string;
  startPoint: string;
  endPoint: string;
  dimension: number;
  unit: 'ft' | 'm' | 'inch' | 'cm';
  tolerance?: number;
  verified: boolean;
  notes?: string;
}

export interface LevelData {
  id: string;
  pointName: string;
  reducedLevel: number;
  benchmarkReference: string;
  remarks?: string;
}

export interface SurveyPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption: string;
  angle: 'front' | 'rear' | 'left' | 'right' | 'aerial' | 'interior' | 'detail';
  location: string;
  timestamp: string;
  annotations?: PhotoAnnotation[];
}

export interface PhotoAnnotation {
  id: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
  color: string;
}

export interface SurveyVideo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  duration: number;
  location: string;
  timestamp: string;
}

export interface SketchDocument {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  type: 'plan' | 'elevation' | 'section' | 'detail' | 'freehand';
  drawnBy: string;
  scale?: string;
  notes?: string;
}
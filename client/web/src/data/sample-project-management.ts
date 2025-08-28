// Comprehensive Project Management Sample Data
// Based on Indian Construction Industry Standards

import { 
  ProjectDetails, 
  RecceData, 
  MoodBoard, 
  SiteSurvey,
  SiteMeasurement,
  RecceMedia,
  MoodBoardItem,
  ColorSwatch,
  MaterialSample,
  SurveyTeamMember,
  DetailedMeasurement,
  LevelData,
  SurveyPhoto,
  SurveyVideo,
  SketchDocument
} from '../types/project-details.types';

// Enhanced Project Interface with Complete Management Features
export interface ProjectManagement extends ProjectDetails {
  // Additional Management Fields
  tasks: Task[];
  milestones: Milestone[];
  resources: Resource[];
  riskRegister: Risk[];
  changeOrders: ChangeOrder[];
  meetings: Meeting[];
  reports: Report[];
  vendors: Vendor[];
  invoices: Invoice[];
  qualityLogs: QualityLog[];
  safetyIncidents: SafetyIncident[];
}

export interface Task {
  id: string;
  code: string;
  title: string;
  description: string;
  wbsCode: string; // Work Breakdown Structure
  category: 'civil' | 'electrical' | 'plumbing' | 'hvac' | 'interior' | 'landscape' | 'external' | 'general';
  phase: string;
  milestone: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  assignee: TeamMember;
  assignedDate: string;
  startDate: string;
  endDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  duration: number; // in days
  predecessors: string[]; // Task IDs
  successors: string[]; // Task IDs
  percentComplete: number;
  estimatedCost: number;
  actualCost: number;
  estimatedHours: number;
  actualHours: number;
  resources: Resource[];
  constraints?: TaskConstraint[];
  notes?: string;
  attachments?: Attachment[];
  approvals?: Approval[];
  lastUpdated: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  date: string;
  status: 'pending' | 'achieved' | 'delayed' | 'cancelled';
  linkedTasks: string[];
  deliverables: string[];
  paymentLinked: boolean;
  paymentPercentage?: number;
  criticalPath: boolean;
  completionCriteria: string[];
  approver: string;
  achievedDate?: string;
  delayReason?: string;
  impactAssessment?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'human' | 'equipment' | 'material';
  category: string;
  skillSet?: string[];
  availability: number; // percentage
  rate: number; // per hour or per unit
  unit: string;
  allocatedTo: string[]; // Task IDs
  totalAllocated: number;
  totalAvailable: number;
  vendor?: string;
  contactInfo?: ContactInfo;
  certifications?: string[];
  performanceRating?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar?: string;
  skills: string[];
  certifications: string[];
  availability: number;
  currentTasks: string[];
  completedTasks: string[];
  performanceScore: number;
  joinedDate: string;
  reportingTo?: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'financial' | 'schedule' | 'safety' | 'environmental' | 'regulatory' | 'quality';
  probability: 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost-certain';
  impact: 'negligible' | 'minor' | 'moderate' | 'major' | 'catastrophic';
  riskScore: number;
  status: 'identified' | 'analyzing' | 'mitigating' | 'monitoring' | 'closed';
  identifiedDate: string;
  identifiedBy: string;
  owner: string;
  mitigationStrategy: string;
  contingencyPlan: string;
  triggerEvents: string[];
  relatedTasks: string[];
  costImpact?: number;
  scheduleImpact?: number; // in days
  actualOccurrence?: boolean;
  lessonsLearned?: string;
}

export interface ChangeOrder {
  id: string;
  number: string;
  title: string;
  description: string;
  type: 'scope' | 'design' | 'schedule' | 'budget' | 'quality';
  requestedBy: string;
  requestDate: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'implemented';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  costImpact: number;
  scheduleImpact: number; // in days
  affectedTasks: string[];
  affectedMilestones: string[];
  justification: string;
  alternatives?: string;
  approvals: Approval[];
  implementationPlan?: string;
  completedDate?: string;
  attachments: Attachment[];
}

export interface Meeting {
  id: string;
  title: string;
  type: 'kick-off' | 'progress' | 'review' | 'safety' | 'quality' | 'client' | 'vendor' | 'emergency';
  scheduledDate: string;
  duration: number; // in minutes
  location: string;
  organizer: string;
  attendees: Attendee[];
  agenda: AgendaItem[];
  minutes?: MeetingMinutes;
  actionItems: ActionItem[];
  decisions: Decision[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  recurring?: RecurrencePattern;
  attachments: Attachment[];
  videoLink?: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'progress' | 'quality' | 'safety' | 'financial' | 'executive';
  generatedDate: string;
  generatedBy: string;
  period: {
    from: string;
    to: string;
  };
  summary: string;
  sections: ReportSection[];
  metrics: Metric[];
  attachments: Attachment[];
  distribution: string[];
  status: 'draft' | 'review' | 'final' | 'distributed';
  approvedBy?: string;
  approvedDate?: string;
}

export interface Vendor {
  id: string;
  companyName: string;
  type: 'contractor' | 'supplier' | 'consultant' | 'service-provider';
  specialization: string[];
  registrationNumber: string;
  gstNumber: string;
  panNumber?: string;
  contact: ContactInfo;
  bankDetails: BankDetails;
  contracts: Contract[];
  performanceRating: number;
  blacklisted: boolean;
  certifications: string[];
  insurancePolicies: Insurance[];
  currentProjects: string[];
  completedProjects: string[];
  totalBusinessValue: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  date: string;
  dueDate: string;
  amount: number;
  tax: number;
  totalAmount: number;
  currency: string;
  status: 'draft' | 'submitted' | 'approved' | 'paid' | 'overdue' | 'disputed';
  paymentTerms: string;
  milestone?: string;
  workOrder: string;
  description: string;
  lineItems: LineItem[];
  approvals: Approval[];
  paymentDetails?: PaymentDetails;
  attachments: Attachment[];
}

export interface QualityLog {
  id: string;
  date: string;
  inspector: string;
  type: 'material' | 'workmanship' | 'process' | 'safety' | 'environmental';
  area: string;
  element: string;
  standard: string;
  checklistUsed: string;
  result: 'pass' | 'fail' | 'conditional';
  deviations: Deviation[];
  correctiveActions: CorrectiveAction[];
  photos: Attachment[];
  signoff: Approval;
  followUpRequired: boolean;
  followUpDate?: string;
  closedDate?: string;
}

export interface SafetyIncident {
  id: string;
  incidentNumber: string;
  date: string;
  time: string;
  location: string;
  type: 'near-miss' | 'first-aid' | 'medical-treatment' | 'lost-time' | 'fatality';
  severity: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  involvedPersonnel: Person[];
  witnesses: Person[];
  immediateAction: string;
  rootCause?: string;
  correctiveActions: CorrectiveAction[];
  reportedBy: string;
  reportedTo: string;
  investigator?: string;
  investigationReport?: string;
  preventiveMeasures: string[];
  trainingRequired: string[];
  regulatoryReporting: boolean;
  insuranceClaim?: InsuranceClaim;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  attachments: Attachment[];
}

// Supporting Interfaces
interface TaskConstraint {
  type: 'start-no-earlier' | 'finish-no-later' | 'must-start-on' | 'must-finish-on';
  date: string;
  reason: string;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedDate: string;
  version?: string;
  description?: string;
}

interface Approval {
  id: string;
  approver: string;
  role: string;
  status: 'pending' | 'approved' | 'rejected' | 'conditionally-approved';
  date?: string;
  comments?: string;
  conditions?: string[];
}

interface ContactInfo {
  primaryContact: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
}

interface BankDetails {
  bankName: string;
  branch: string;
  accountNumber: string;
  ifscCode: string;
  accountType: 'current' | 'savings';
}

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'terminated' | 'suspended';
}

interface Insurance {
  type: string;
  policyNumber: string;
  provider: string;
  coverage: number;
  validFrom: string;
  validTo: string;
}

interface LineItem {
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  tax: number;
}

interface PaymentDetails {
  paidAmount: number;
  paidDate: string;
  paymentMode: 'cash' | 'cheque' | 'bank-transfer' | 'upi' | 'credit';
  referenceNumber: string;
  bank?: string;
}

interface Deviation {
  parameter: string;
  expected: string;
  actual: string;
  variance: string;
  acceptable: boolean;
}

interface CorrectiveAction {
  id: string;
  action: string;
  responsiblePerson: string;
  targetDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  completedDate?: string;
  effectiveness?: 'effective' | 'partially-effective' | 'ineffective';
}

interface Person {
  name: string;
  employeeId?: string;
  designation: string;
  contractor?: string;
  injuries?: string;
  treatment?: string;
}

interface InsuranceClaim {
  claimNumber: string;
  claimAmount: number;
  status: 'filed' | 'under-review' | 'approved' | 'rejected' | 'settled';
  settlementAmount?: number;
}

interface Attendee {
  name: string;
  role: string;
  attended: boolean;
  arrivalTime?: string;
  departureTime?: string;
}

interface AgendaItem {
  topic: string;
  presenter: string;
  duration: number;
  materials?: string[];
}

interface MeetingMinutes {
  recordedBy: string;
  summary: string;
  discussions: Discussion[];
  nextSteps: string[];
}

interface Discussion {
  topic: string;
  keyPoints: string[];
  concerns?: string[];
  resolution?: string;
}

interface ActionItem {
  id: string;
  action: string;
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  completedDate?: string;
}

interface Decision {
  id: string;
  decision: string;
  rationale: string;
  madeBy: string;
  impactedAreas: string[];
}

interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
  interval: number;
  daysOfWeek?: string[];
  endDate?: string;
  occurrences?: number;
}

interface ReportSection {
  title: string;
  content: string;
  data?: any[];
  charts?: ChartConfig[];
  tables?: TableConfig[];
}

interface Metric {
  name: string;
  value: number | string;
  unit?: string;
  target?: number | string;
  variance?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'gantt' | 'burndown';
  title: string;
  data: any;
}

interface TableConfig {
  title: string;
  headers: string[];
  rows: any[][];
}

// Sample Data Generation
export const generateSampleProjectManagement = (): ProjectManagement[] => {
  const projects: ProjectManagement[] = [
    {
      // Residential High-Rise Project
      id: 'PROJ001',
      projectId: 'SKY-2024-001',
      projectCode: 'SKY-RES-001',
      
      // Basic Information
      projectName: 'Skyline Heights - Luxury Residential Tower',
      projectCategory: 'residential',
      projectType: 'new-construction',
      projectSubType: 'high-rise',
      projectStatus: 'construction',
      projectPhase: 'Structural Work - 15th Floor',
      
      // Client Information
      clientName: 'Mr. Rajesh Kumar Sharma',
      clientOrganization: 'Skyline Developers Pvt. Ltd.',
      clientType: 'private',
      clientContact: '+91 98765 43210',
      clientEmail: 'rajesh.sharma@skylinedevelopers.com',
      clientAddress: 'Plot No. 45, Sector 54, Gurugram, Haryana - 122003',
      clientGSTIN: '06AABCS1234K1Z5',
      
      // Stakeholders
      architect: 'DesignArch Studios',
      structuralConsultant: 'StructureMax Consultants',
      mepConsultant: 'MEP Solutions India',
      pmcName: 'ProjectPro Management Services',
      mainContractor: 'BuildWell Construction Ltd.',
      
      // Timeline
      projectInitiationDate: '2023-06-01',
      designStartDate: '2023-07-01',
      approvalSubmissionDate: '2023-10-15',
      constructionStartDate: '2024-01-15',
      expectedCompletion: '2026-06-30',
      warrantyPeriod: 12,
      defectLiabilityPeriod: 24,
      
      // Site Information
      siteAddress: 'Plot No. 127, Sector 79',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122004',
      latitude: 28.4089,
      longitude: 77.0677,
      plotArea: 25000,
      plotAreaUnit: 'sqft',
      orientation: 'north',
      
      // Construction Details
      constructionMethodology: 'conventional',
      structureType: 'rcc-frame',
      foundationType: 'raft',
      
      // Building Configuration
      numberOfFloors: 42,
      basementFloors: 3,
      stiltFloors: 1,
      podiumFloors: 2,
      typicalFloors: 36,
      totalFloors: 42,
      
      // Areas
      builtUpArea: 385000,
      carpetArea: 308000,
      superBuiltUpArea: 423500,
      commonAreaPercentage: 20,
      efficiencyRatio: 72.8,
      
      // Metrics
      far: 4.5,
      groundCoverage: 35,
      openSpaceRatio: 65,
      parkingSpaces: 450,
      greenAreaPercentage: 25,
      
      // Design Specifications
      architecturalStyle: 'Contemporary Modern',
      facadeType: 'Glass Curtain Wall with ACP',
      roofType: 'flat',
      flooringType: ['Vitrified Tiles', 'Italian Marble', 'Wooden Flooring'],
      ceilingHeight: 10.5,
      wallFinish: ['Textured Paint', 'Wallpaper', 'Stone Cladding'],
      
      // Regulatory
      approvalStatus: 'approved',
      masterPlanZone: 'Residential',
      landUsePermitted: 'Group Housing',
      
      // Approvals
      environmentalClearance: {
        required: true,
        status: 'Obtained',
        number: 'EC/HR/2023/0156',
        date: '2023-11-20'
      },
      buildingPlanApproval: {
        number: 'BPA/GGM/2023/4567',
        date: '2023-12-15',
        validUpto: '2026-12-14'
      },
      fireNOC: {
        number: 'FIRE/GGM/2024/0234',
        date: '2024-01-10',
        validUpto: '2027-01-09'
      },
      
      // Financial
      projectValue: 4500000000, // 450 Crores
      contractValue: 2700000000, // 270 Crores
      estimatedBudget: 4500000000,
      approvedBudget: 4500000000,
      actualCost: 2025000000, // 45% spent
      currency: 'INR',
      
      // Cost Breakdown
      costBreakdown: {
        land: 900000000,
        construction: 2700000000,
        consultancy: 135000000,
        approvals: 45000000,
        utilities: 90000000,
        contingency: 225000000,
        financing: 315000000,
        other: 90000000
      },
      
      // Payment Terms
      paymentTerms: 'Milestone Based - 20% Advance, 60% Progress, 20% Completion',
      billingMilestones: [
        'Foundation Complete',
        'Structure 10 Floors',
        'Structure 20 Floors',
        'Structure 30 Floors',
        'Structure Complete',
        'MEP 50%',
        'Finishing 50%',
        'Project Completion'
      ],
      retentionPercentage: 5,
      mobilizationAdvance: 20,
      
      // Quality & Standards
      qualityStandards: ['ISO 9001:2015', 'ISO 14001:2015'],
      constructionStandards: ['IS 456:2000', 'NBC 2016'],
      
      // KPIs
      kpis: {
        scheduleVariance: -2.5,
        costVariance: 1.8,
        qualityScore: 92,
        safetyScore: 95,
        customerSatisfaction: 88
      },
      
      // Metadata
      createdAt: '2023-06-01T10:00:00Z',
      updatedAt: '2024-01-27T15:30:00Z',
      createdBy: 'admin@skylinedevelopers.com',
      lastModifiedBy: 'pm@skylinedevelopers.com',
      
      // Management Data
      tasks: generateSampleTasks(),
      milestones: generateSampleMilestones(),
      resources: generateSampleResources(),
      riskRegister: generateSampleRisks(),
      changeOrders: generateSampleChangeOrders(),
      meetings: generateSampleMeetings(),
      reports: generateSampleReports(),
      vendors: generateSampleVendors(),
      invoices: generateSampleInvoices(),
      qualityLogs: generateSampleQualityLogs(),
      safetyIncidents: generateSampleSafetyIncidents()
    }
  ];
  
  return projects;
};

// Task Generation
function generateSampleTasks(): Task[] {
  return [
    {
      id: 'TSK001',
      code: 'SKY-TSK-001',
      title: 'Foundation Excavation - Tower A',
      description: 'Complete excavation for tower A foundation including dewatering and shoring',
      wbsCode: '1.1.1',
      category: 'civil',
      phase: 'Foundation',
      milestone: 'Foundation Complete',
      priority: 'high',
      status: 'completed',
      assignee: {
        id: 'TM001',
        name: 'Ramesh Verma',
        role: 'Site Engineer',
        department: 'Civil',
        email: 'ramesh.verma@buildwell.com',
        phone: '+91 98765 12345',
        skills: ['Foundation Work', 'Excavation', 'Concrete'],
        certifications: ['B.Tech Civil', 'PMP'],
        availability: 100,
        currentTasks: [],
        completedTasks: ['TSK001'],
        performanceScore: 4.5,
        joinedDate: '2023-01-15',
        reportingTo: 'Suresh Kumar'
      },
      assignedDate: '2024-01-10',
      startDate: '2024-01-15',
      endDate: '2024-01-25',
      actualStartDate: '2024-01-15',
      actualEndDate: '2024-01-24',
      duration: 10,
      predecessors: [],
      successors: ['TSK002'],
      percentComplete: 100,
      estimatedCost: 5000000,
      actualCost: 4850000,
      estimatedHours: 240,
      actualHours: 232,
      resources: [],
      lastUpdated: '2024-01-24T16:00:00Z'
    },
    {
      id: 'TSK002',
      code: 'SKY-TSK-002',
      title: 'Raft Foundation Casting',
      description: 'RCC raft foundation casting including reinforcement',
      wbsCode: '1.1.2',
      category: 'civil',
      phase: 'Foundation',
      milestone: 'Foundation Complete',
      priority: 'critical',
      status: 'in-progress',
      assignee: {
        id: 'TM002',
        name: 'ABC Construction Team',
        role: 'Contractor',
        department: 'Civil',
        email: 'team@abcconstruction.com',
        phone: '+91 98765 67890',
        skills: ['RCC Work', 'Formwork', 'Concrete'],
        certifications: ['ISO 9001'],
        availability: 100,
        currentTasks: ['TSK002'],
        completedTasks: [],
        performanceScore: 4.2,
        joinedDate: '2024-01-01',
        reportingTo: 'Project Manager'
      },
      assignedDate: '2024-01-20',
      startDate: '2024-01-26',
      endDate: '2024-02-10',
      actualStartDate: '2024-01-26',
      duration: 15,
      predecessors: ['TSK001'],
      successors: ['TSK003'],
      percentComplete: 65,
      estimatedCost: 15000000,
      actualCost: 9750000,
      estimatedHours: 480,
      actualHours: 312,
      resources: [],
      lastUpdated: '2024-01-27T10:00:00Z'
    }
  ];
}

// Milestone Generation
function generateSampleMilestones(): Milestone[] {
  return [
    {
      id: 'MS001',
      name: 'Foundation Complete',
      description: 'Complete foundation work for all towers',
      date: '2024-03-31',
      status: 'pending',
      linkedTasks: ['TSK001', 'TSK002', 'TSK003'],
      deliverables: ['Foundation Completion Certificate', 'Structural Stability Report'],
      paymentLinked: true,
      paymentPercentage: 15,
      criticalPath: true,
      completionCriteria: [
        'All foundation casting completed',
        'Curing period completed',
        'Load tests passed',
        'Quality inspection approved'
      ],
      approver: 'Structural Consultant'
    },
    {
      id: 'MS002',
      name: 'Structure 10 Floors',
      description: 'Complete structural work up to 10th floor',
      date: '2024-08-31',
      status: 'pending',
      linkedTasks: [],
      deliverables: ['Structural Inspection Report', 'Concrete Test Results'],
      paymentLinked: true,
      paymentPercentage: 20,
      criticalPath: true,
      completionCriteria: [
        'All columns and beams cast',
        'Slab casting completed',
        'Vertical transportation installed',
        'Safety measures verified'
      ],
      approver: 'PMC'
    }
  ];
}

// Resource Generation
function generateSampleResources(): Resource[] {
  return [
    {
      id: 'RES001',
      name: 'Tower Crane TC-01',
      type: 'equipment',
      category: 'Heavy Machinery',
      availability: 100,
      rate: 15000,
      unit: 'per day',
      allocatedTo: ['TSK002', 'TSK003'],
      totalAllocated: 30,
      totalAvailable: 365,
      vendor: 'Equipment Rental Services',
      performanceRating: 4.5
    },
    {
      id: 'RES002',
      name: 'Skilled Mason Team',
      type: 'human',
      category: 'Labor',
      skillSet: ['Brick Work', 'Plastering', 'Tile Work'],
      availability: 80,
      rate: 800,
      unit: 'per day',
      allocatedTo: [],
      totalAllocated: 0,
      totalAvailable: 20,
      vendor: 'Labor Contractor',
      performanceRating: 4.0
    },
    {
      id: 'RES003',
      name: 'M30 Grade Concrete',
      type: 'material',
      category: 'Construction Material',
      availability: 100,
      rate: 5500,
      unit: 'per cubic meter',
      allocatedTo: ['TSK002'],
      totalAllocated: 500,
      totalAvailable: 10000,
      vendor: 'UltraTech Cement',
      performanceRating: 4.8
    }
  ];
}

// Risk Generation
function generateSampleRisks(): Risk[] {
  return [
    {
      id: 'RSK001',
      title: 'Monsoon Impact on Construction',
      description: 'Heavy monsoon may delay foundation and structural work',
      category: 'schedule',
      probability: 'likely',
      impact: 'major',
      riskScore: 16,
      status: 'mitigating',
      identifiedDate: '2024-01-15',
      identifiedBy: 'Site Engineer',
      owner: 'Project Manager',
      mitigationStrategy: 'Prepare temporary shelters, adjust work schedule, stockpile materials',
      contingencyPlan: 'Extend timeline by 30 days, deploy additional resources post-monsoon',
      triggerEvents: ['IMD monsoon forecast', 'Rainfall > 100mm/day'],
      relatedTasks: ['TSK001', 'TSK002'],
      costImpact: 5000000,
      scheduleImpact: 30
    },
    {
      id: 'RSK002',
      title: 'Material Price Escalation',
      description: 'Steel and cement prices may increase beyond budget',
      category: 'financial',
      probability: 'possible',
      impact: 'moderate',
      riskScore: 9,
      status: 'monitoring',
      identifiedDate: '2024-01-10',
      identifiedBy: 'Purchase Manager',
      owner: 'CFO',
      mitigationStrategy: 'Long-term contracts with suppliers, bulk purchasing',
      contingencyPlan: 'Use contingency budget, value engineering',
      triggerEvents: ['Price increase > 10%', 'Supply chain disruption'],
      relatedTasks: [],
      costImpact: 25000000,
      scheduleImpact: 0
    }
  ];
}

// Change Order Generation
function generateSampleChangeOrders(): ChangeOrder[] {
  return [
    {
      id: 'CO001',
      number: 'SKY-CO-2024-001',
      title: 'Additional Parking Levels',
      description: 'Client requested 2 additional basement parking levels',
      type: 'scope',
      requestedBy: 'Rajesh Kumar Sharma',
      requestDate: '2024-01-20',
      status: 'under-review',
      priority: 'high',
      costImpact: 75000000,
      scheduleImpact: 45,
      affectedTasks: ['TSK001', 'TSK002'],
      affectedMilestones: ['MS001'],
      justification: 'Increased parking demand due to larger apartment sizes',
      alternatives: 'Automated parking system, off-site parking',
      approvals: [
        {
          id: 'APR001',
          approver: 'Structural Consultant',
          role: 'Technical Reviewer',
          status: 'pending',
          comments: 'Reviewing structural implications'
        }
      ],
      attachments: []
    }
  ];
}

// Meeting Generation
function generateSampleMeetings(): Meeting[] {
  return [
    {
      id: 'MTG001',
      title: 'Weekly Progress Review',
      type: 'progress',
      scheduledDate: '2024-01-29T10:00:00Z',
      duration: 120,
      location: 'Site Office Conference Room',
      organizer: 'Suresh Kumar',
      attendees: [
        {
          name: 'Rajesh Kumar Sharma',
          role: 'Client',
          attended: false
        },
        {
          name: 'Suresh Kumar',
          role: 'Project Manager',
          attended: false
        },
        {
          name: 'Ramesh Verma',
          role: 'Site Engineer',
          attended: false
        }
      ],
      agenda: [
        {
          topic: 'Last Week Progress',
          presenter: 'Site Engineer',
          duration: 20
        },
        {
          topic: 'Current Week Plan',
          presenter: 'Project Manager',
          duration: 20
        },
        {
          topic: 'Issues and Blockers',
          presenter: 'All',
          duration: 30
        },
        {
          topic: 'Safety Review',
          presenter: 'Safety Officer',
          duration: 15
        },
        {
          topic: 'Quality Updates',
          presenter: 'Quality Manager',
          duration: 15
        },
        {
          topic: 'Client Concerns',
          presenter: 'Client',
          duration: 20
        }
      ],
      actionItems: [],
      decisions: [],
      status: 'scheduled',
      recurring: {
        frequency: 'weekly',
        interval: 1,
        daysOfWeek: ['Monday'],
        endDate: '2026-06-30'
      },
      attachments: []
    }
  ];
}

// Report Generation
function generateSampleReports(): Report[] {
  return [
    {
      id: 'RPT001',
      title: 'Monthly Progress Report - January 2024',
      type: 'monthly',
      generatedDate: '2024-01-31',
      generatedBy: 'Project Manager',
      period: {
        from: '2024-01-01',
        to: '2024-01-31'
      },
      summary: 'Foundation work progressing as per schedule with 65% completion',
      sections: [
        {
          title: 'Executive Summary',
          content: 'Project is progressing well with minor delays due to weather'
        },
        {
          title: 'Work Progress',
          content: 'Foundation excavation completed, raft casting in progress'
        },
        {
          title: 'Financial Status',
          content: 'Budget utilization at 45%, within approved limits'
        },
        {
          title: 'Safety Performance',
          content: 'Zero accidents, 15 near-miss incidents reported and addressed'
        }
      ],
      metrics: [
        {
          name: 'Overall Progress',
          value: 12,
          unit: '%',
          target: 15,
          variance: -3,
          trend: 'up'
        },
        {
          name: 'Budget Spent',
          value: 2025000000,
          unit: 'INR',
          target: 2100000000,
          variance: 75000000,
          trend: 'stable'
        },
        {
          name: 'Safety Score',
          value: 95,
          unit: 'points',
          target: 90,
          variance: 5,
          trend: 'up'
        },
        {
          name: 'Quality Score',
          value: 92,
          unit: 'points',
          target: 95,
          variance: -3,
          trend: 'stable'
        }
      ],
      attachments: [],
      distribution: ['Client', 'PMC', 'Senior Management', 'Consultants'],
      status: 'draft'
    }
  ];
}

// Vendor Generation
function generateSampleVendors(): Vendor[] {
  return [
    {
      id: 'VND001',
      companyName: 'BuildWell Construction Ltd.',
      type: 'contractor',
      specialization: ['Civil Work', 'Structural Work', 'Finishing'],
      registrationNumber: 'CIN U45201HR2010PTC040234',
      gstNumber: '06AABCB1234K1Z5',
      panNumber: 'AABCB1234K',
      contact: {
        primaryContact: 'Mr. Arun Mehta',
        designation: 'Director',
        email: 'arun.mehta@buildwell.com',
        phone: '+91 98765 54321',
        address: 'Industrial Area, Phase 2, Gurugram'
      },
      bankDetails: {
        bankName: 'HDFC Bank',
        branch: 'Gurugram',
        accountNumber: '50200012345678',
        ifscCode: 'HDFC0001234',
        accountType: 'current'
      },
      contracts: [
        {
          id: 'CNT001',
          contractNumber: 'SKY/BW/2024/001',
          title: 'Main Civil Contract',
          value: 2700000000,
          startDate: '2024-01-15',
          endDate: '2026-06-30',
          status: 'active'
        }
      ],
      performanceRating: 4.5,
      blacklisted: false,
      certifications: ['ISO 9001:2015', 'ISO 45001:2018', 'ISO 14001:2015'],
      insurancePolicies: [
        {
          type: 'Contractor All Risk',
          policyNumber: 'CAR/2024/12345',
          provider: 'New India Assurance',
          coverage: 3000000000,
          validFrom: '2024-01-01',
          validTo: '2026-12-31'
        },
        {
          type: 'Workmen Compensation',
          policyNumber: 'WC/2024/67890',
          provider: 'Oriental Insurance',
          coverage: 100000000,
          validFrom: '2024-01-01',
          validTo: '2024-12-31'
        }
      ],
      currentProjects: ['SKY-2024-001'],
      completedProjects: ['PRJ-2023-045', 'PRJ-2022-112'],
      totalBusinessValue: 5500000000
    },
    {
      id: 'VND002',
      companyName: 'MEP Solutions India',
      type: 'contractor',
      specialization: ['Electrical', 'Plumbing', 'HVAC', 'Fire Fighting'],
      registrationNumber: 'CIN U45202DL2012PTC234567',
      gstNumber: '07AABCM5678L1Z9',
      panNumber: 'AABCM5678L',
      contact: {
        primaryContact: 'Mr. Vijay Singh',
        designation: 'Managing Director',
        email: 'vijay.singh@mepsolutions.in',
        phone: '+91 98765 98765',
        address: 'Okhla Industrial Area, New Delhi'
      },
      bankDetails: {
        bankName: 'ICICI Bank',
        branch: 'Okhla',
        accountNumber: '002105001234',
        ifscCode: 'ICIC0000021',
        accountType: 'current'
      },
      contracts: [
        {
          id: 'CNT002',
          contractNumber: 'SKY/MEP/2024/001',
          title: 'MEP Services Contract',
          value: 450000000,
          startDate: '2024-03-01',
          endDate: '2026-03-31',
          status: 'active'
        }
      ],
      performanceRating: 4.3,
      blacklisted: false,
      certifications: ['ISO 9001:2015', 'ISHRAE Certified'],
      insurancePolicies: [
        {
          type: 'Professional Indemnity',
          policyNumber: 'PI/2024/11111',
          provider: 'Bajaj Allianz',
          coverage: 500000000,
          validFrom: '2024-01-01',
          validTo: '2024-12-31'
        }
      ],
      currentProjects: ['SKY-2024-001', 'OTH-2024-023'],
      completedProjects: ['PRJ-2023-089', 'PRJ-2023-056'],
      totalBusinessValue: 1200000000
    }
  ];
}

// Invoice Generation
function generateSampleInvoices(): Invoice[] {
  return [
    {
      id: 'INV001',
      invoiceNumber: 'BW/SKY/2024/001',
      vendor: 'BuildWell Construction Ltd.',
      date: '2024-01-25',
      dueDate: '2024-02-24',
      amount: 45000000,
      tax: 8100000,
      totalAmount: 53100000,
      currency: 'INR',
      status: 'submitted',
      paymentTerms: '30 days from invoice date',
      milestone: 'Foundation 50% Complete',
      workOrder: 'WO/SKY/2024/001',
      description: 'Foundation work progress payment - 50% completion',
      lineItems: [
        {
          description: 'Excavation Work',
          quantity: 5000,
          unit: 'cum',
          rate: 500,
          amount: 2500000,
          tax: 450000
        },
        {
          description: 'PCC Work',
          quantity: 800,
          unit: 'cum',
          rate: 4500,
          amount: 3600000,
          tax: 648000
        },
        {
          description: 'Raft Foundation RCC',
          quantity: 2000,
          unit: 'cum',
          rate: 7500,
          amount: 15000000,
          tax: 2700000
        },
        {
          description: 'Reinforcement Steel',
          quantity: 300,
          unit: 'MT',
          rate: 65000,
          amount: 19500000,
          tax: 3510000
        },
        {
          description: 'Formwork',
          quantity: 5000,
          unit: 'sqm',
          rate: 900,
          amount: 4500000,
          tax: 810000
        }
      ],
      approvals: [
        {
          id: 'APR001',
          approver: 'Site Engineer',
          role: 'Technical Verification',
          status: 'approved',
          date: '2024-01-26',
          comments: 'Work completed as per specifications'
        },
        {
          id: 'APR002',
          approver: 'Project Manager',
          role: 'Administrative Approval',
          status: 'pending'
        }
      ],
      attachments: []
    }
  ];
}

// Quality Log Generation
function generateSampleQualityLogs(): QualityLog[] {
  return [
    {
      id: 'QL001',
      date: '2024-01-24',
      inspector: 'Quality Control Team',
      type: 'material',
      area: 'Foundation - Tower A',
      element: 'Concrete M30',
      standard: 'IS 456:2000',
      checklistUsed: 'Concrete Quality Checklist v2.1',
      result: 'pass',
      deviations: [],
      correctiveActions: [],
      photos: [],
      signoff: {
        id: 'SGN001',
        approver: 'Quality Manager',
        role: 'QC Head',
        status: 'approved',
        date: '2024-01-24',
        comments: 'All parameters within acceptable limits'
      },
      followUpRequired: false
    },
    {
      id: 'QL002',
      date: '2024-01-25',
      inspector: 'Quality Inspector',
      type: 'workmanship',
      area: 'Foundation - Tower A',
      element: 'Reinforcement Binding',
      standard: 'IS 2502:1963',
      checklistUsed: 'Reinforcement Inspection Checklist v1.5',
      result: 'conditional',
      deviations: [
        {
          parameter: 'Spacing',
          expected: '150mm c/c',
          actual: '160mm c/c',
          variance: '10mm',
          acceptable: false
        }
      ],
      correctiveActions: [
        {
          id: 'CA001',
          action: 'Adjust reinforcement spacing to match design',
          responsiblePerson: 'Site Supervisor',
          targetDate: '2024-01-26',
          status: 'completed',
          completedDate: '2024-01-26',
          effectiveness: 'effective'
        }
      ],
      photos: [],
      signoff: {
        id: 'SGN002',
        approver: 'Quality Manager',
        role: 'QC Head',
        status: 'conditionally-approved',
        date: '2024-01-25',
        conditions: ['Rectify spacing issues before concrete pour']
      },
      followUpRequired: true,
      followUpDate: '2024-01-26'
    }
  ];
}

// Safety Incident Generation
function generateSampleSafetyIncidents(): SafetyIncident[] {
  return [
    {
      id: 'SI001',
      incidentNumber: 'SKY/SAF/2024/001',
      date: '2024-01-20',
      time: '14:30',
      location: 'Foundation Area - Tower A',
      type: 'near-miss',
      severity: 'minor',
      description: 'Worker slipped on wet surface but prevented fall using safety harness',
      involvedPersonnel: [
        {
          name: 'Raju Kumar',
          employeeId: 'EMP456',
          designation: 'Mason',
          contractor: 'ABC Construction'
        }
      ],
      witnesses: [
        {
          name: 'Sunil Sharma',
          employeeId: 'EMP457',
          designation: 'Supervisor',
          contractor: 'ABC Construction'
        }
      ],
      immediateAction: 'Area cordoned off, anti-slip material applied',
      rootCause: 'Water accumulation due to dewatering pump overflow',
      correctiveActions: [
        {
          id: 'CA001',
          action: 'Install proper drainage channel',
          responsiblePerson: 'Site Engineer',
          targetDate: '2024-01-22',
          status: 'completed',
          completedDate: '2024-01-22'
        },
        {
          id: 'CA002',
          action: 'Conduct safety briefing on slip hazards',
          responsiblePerson: 'Safety Officer',
          targetDate: '2024-01-21',
          status: 'completed',
          completedDate: '2024-01-21'
        }
      ],
      reportedBy: 'Safety Officer',
      reportedTo: 'Project Manager',
      investigator: 'Safety Manager',
      investigationReport: 'Near-miss due to housekeeping issue, no injury occurred',
      preventiveMeasures: [
        'Daily housekeeping inspection',
        'Install permanent drainage system',
        'Anti-slip coating in wet areas'
      ],
      trainingRequired: ['Slip and Fall Prevention', 'Housekeeping Standards'],
      regulatoryReporting: false,
      status: 'closed',
      attachments: []
    }
  ];
}

// Export complete sample data
export const sampleProjectManagementData = generateSampleProjectManagement();

// Helper function to get project by ID
export const getProjectManagementById = (id: string): ProjectManagement | undefined => {
  return sampleProjectManagementData.find(project => project.id === id);
};

// Helper function to get all active tasks
export const getActiveTasks = (): Task[] => {
  const allTasks: Task[] = [];
  sampleProjectManagementData.forEach(project => {
    allTasks.push(...project.tasks.filter(task => task.status === 'in-progress'));
  });
  return allTasks;
};

// Helper function to get upcoming milestones
export const getUpcomingMilestones = (days: number = 30): Milestone[] => {
  const allMilestones: Milestone[] = [];
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  sampleProjectManagementData.forEach(project => {
    allMilestones.push(...project.milestones.filter(milestone => {
      const milestoneDate = new Date(milestone.date);
      return milestoneDate <= futureDate && milestone.status === 'pending';
    }));
  });
  return allMilestones;
};

// Helper function to get high priority risks
export const getHighPriorityRisks = (): Risk[] => {
  const allRisks: Risk[] = [];
  sampleProjectManagementData.forEach(project => {
    allRisks.push(...project.riskRegister.filter(risk => 
      risk.riskScore >= 12 && risk.status !== 'closed'
    ));
  });
  return allRisks;
};

// Helper function to get pending approvals
export const getPendingApprovals = (): Approval[] => {
  const pendingApprovals: Approval[] = [];
  sampleProjectManagementData.forEach(project => {
    // From change orders
    project.changeOrders.forEach(co => {
      pendingApprovals.push(...co.approvals.filter(a => a.status === 'pending'));
    });
    // From invoices
    project.invoices.forEach(inv => {
      pendingApprovals.push(...inv.approvals.filter(a => a.status === 'pending'));
    });
  });
  return pendingApprovals;
};

// Export all helper functions
export const projectManagementHelpers = {
  getProjectManagementById,
  getActiveTasks,
  getUpcomingMilestones,
  getHighPriorityRisks,
  getPendingApprovals
};
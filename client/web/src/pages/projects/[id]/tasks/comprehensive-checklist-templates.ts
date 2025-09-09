export interface ChecklistAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface ChecklistComment {
  id: string;
  text: string;
  createdAt: Date;
  createdBy: string;
  createdByName: string;
  createdByAvatar?: string;
}

export interface ChecklistItemDetail {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  mandatory: boolean;
  critical?: boolean;
  category?: string;
  subCategory?: string;
  
  // Detailed tracking
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
  completedBy?: string;
  completedByName?: string;
  
  // Time tracking
  estimatedHours?: number;
  actualHours?: number;
  timeEntries?: {
    startTime: Date;
    endTime: Date;
    duration: number;
    user: string;
    notes?: string;
  }[];
  
  // Verification
  requiresVerification?: boolean;
  verifiedBy?: string;
  verifiedByName?: string;
  verifiedDate?: Date;
  verificationNotes?: string;
  
  // Attachments and comments
  attachments?: ChecklistAttachment[];
  comments?: ChecklistComment[];
  
  // Standards and specifications
  standards?: string[];
  specifications?: string[];
  acceptanceCriteria?: string[];
  
  // Risk and priority
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  
  // Dependencies
  dependencies?: string[];
  blockedBy?: string[];
  
  // Custom fields
  customFields?: Record<string, any>;
  
  // Status tracking
  status?: 'pending' | 'in_progress' | 'completed' | 'verified' | 'failed' | 'skipped';
  failureReason?: string;
  correctiveAction?: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  category: string;
  type: 'quality' | 'safety' | 'inspection' | 'compliance' | 'testing' | 'commissioning' | 'maintenance' | 'audit' | 'custom';
  description: string;
  version: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  tags: string[];
  applicablePhases?: string[];
  estimatedDuration?: number; // in hours
  items: ChecklistItemDetail[];
  metadata?: {
    industry?: string;
    projectType?: string;
    regulations?: string[];
    certifications?: string[];
  };
}

// Quality Control Templates
const qualityTemplates: ChecklistTemplate[] = [
  {
    id: 'qc-foundation-001',
    name: 'Foundation Quality Control Checklist',
    category: 'Foundation',
    type: 'quality',
    description: 'Comprehensive quality checks for foundation work including excavation, PCC, and RCC',
    version: '2.0',
    createdDate: new Date('2024-01-01'),
    updatedDate: new Date('2024-12-01'),
    createdBy: 'system',
    tags: ['foundation', 'structural', 'concrete', 'excavation'],
    applicablePhases: ['foundation', 'substructure'],
    estimatedDuration: 48,
    items: [
      {
        id: 'qc-f-001',
        title: 'Site Survey & Marking Verification',
        description: 'Verify site survey points, boundaries, and foundation marking as per approved drawings',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Survey',
        riskLevel: 'high',
        priority: 'urgent',
        standards: ['IS 962:1989', 'NBC 2016'],
        specifications: ['Total station accuracy ±2mm', 'Benchmark verification required'],
        acceptanceCriteria: [
          'All corners marked with permanent markers',
          'Dimensions within ±10mm tolerance',
          'Levels checked against benchmark'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'qc-f-002',
        title: 'Soil Testing & Report Verification',
        description: 'Verify soil bearing capacity and test reports from approved laboratory',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Geotechnical',
        riskLevel: 'critical',
        priority: 'urgent',
        standards: ['IS 2720', 'IS 6403:1981'],
        specifications: ['SBC ≥ 200 kN/m²', 'Moisture content < 20%'],
        acceptanceCriteria: [
          'Lab test report from NABL accredited lab',
          'SBC meets design requirements',
          'No organic content in foundation soil'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'qc-f-003',
        title: 'Excavation Depth & Dimensions',
        description: 'Check excavation depth, width, and slopes as per structural drawings',
        completed: false,
        mandatory: true,
        category: 'Excavation',
        riskLevel: 'high',
        priority: 'high',
        standards: ['IS 3764:1992', 'CPWD Specifications'],
        specifications: ['Depth tolerance ±25mm', 'Width tolerance ±50mm', 'Slope 1:1 for depth >1.5m'],
        acceptanceCriteria: [
          'Excavation dimensions match drawings',
          'Proper shoring for deep excavation',
          'No water accumulation'
        ],
        estimatedHours: 6,
        status: 'pending'
      }
    ]
  },
  {
    id: 'qc-concrete-001',
    name: 'Concrete Pour Quality Checklist',
    category: 'Concrete',
    type: 'quality',
    description: 'Quality control for concrete mixing, pouring, and curing processes',
    version: '1.5',
    createdDate: new Date('2024-01-15'),
    updatedDate: new Date('2024-11-20'),
    createdBy: 'system',
    tags: ['concrete', 'rcc', 'structural'],
    applicablePhases: ['structure', 'foundation'],
    estimatedDuration: 24,
    items: [
      {
        id: 'qc-c-001',
        title: 'Concrete Mix Design Approval',
        description: 'Verify approved mix design and test certificates',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Mix Design',
        standards: ['IS 456:2000', 'IS 10262:2019'],
        specifications: ['M20/M25/M30 as per design', 'Slump 75-100mm'],
        estimatedHours: 1,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  }
];

// Safety Inspection Templates
const safetyTemplates: ChecklistTemplate[] = [
  {
    id: 'safety-site-001',
    name: 'Daily Site Safety Inspection',
    category: 'Safety',
    type: 'safety',
    description: 'Daily safety inspection checklist for construction site',
    version: '3.0',
    createdDate: new Date('2024-02-01'),
    updatedDate: new Date('2024-12-10'),
    createdBy: 'system',
    tags: ['safety', 'daily', 'inspection', 'ppe'],
    estimatedDuration: 2,
    items: [
      {
        id: 'sf-001',
        title: 'PPE Compliance Check',
        description: 'Verify all workers wearing appropriate PPE',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'PPE',
        priority: 'urgent',
        standards: ['IS 2925', 'IS 8519', 'IS 9873'],
        acceptanceCriteria: [
          'All workers wearing helmets (IS 2925)',
          'Safety shoes for all ground workers',
          'High-visibility vests worn',
          'Safety harness for height work >2m'
        ],
        estimatedHours: 0.5,
        status: 'pending'
      },
      {
        id: 'sf-002',
        title: 'Scaffolding Safety Inspection',
        description: 'Check scaffolding stability, ties, and platforms',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Scaffolding',
        priority: 'high',
        standards: ['IS 3696', 'IS 4014'],
        specifications: [
          'Platform width min 600mm',
          'Guard rails at 1m height',
          'Toe boards min 150mm',
          'Ties every 4m vertical, 6m horizontal'
        ],
        estimatedHours: 1,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'sf-003',
        title: 'Electrical Safety Check',
        description: 'Inspect electrical installations and equipment',
        completed: false,
        mandatory: true,
        category: 'Electrical',
        priority: 'high',
        standards: ['IS 732', 'IS 3043'],
        acceptanceCriteria: [
          'All connections properly insulated',
          'ELCB/RCCB functional',
          'Earthing resistance <5 ohms',
          'No temporary wiring at ground level'
        ],
        estimatedHours: 0.5,
        status: 'pending'
      }
    ]
  },
  {
    id: 'safety-height-001',
    name: 'Height Work Safety Checklist',
    category: 'Safety',
    type: 'safety',
    description: 'Safety checks for work at height operations',
    version: '2.0',
    createdDate: new Date('2024-03-01'),
    updatedDate: new Date('2024-11-15'),
    createdBy: 'system',
    tags: ['safety', 'height', 'fall-protection'],
    estimatedDuration: 3,
    items: [
      {
        id: 'sh-001',
        title: 'Fall Protection Systems',
        description: 'Verify fall protection equipment and systems',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Fall Protection',
        standards: ['IS 3521', 'IS 11057'],
        estimatedHours: 1,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  }
];

// Inspection Templates
const inspectionTemplates: ChecklistTemplate[] = [
  {
    id: 'insp-pre-slab-001',
    name: 'Pre-Slab Inspection Checklist',
    category: 'Structural',
    type: 'inspection',
    description: 'Comprehensive inspection before slab casting',
    version: '2.5',
    createdDate: new Date('2024-01-20'),
    updatedDate: new Date('2024-12-05'),
    createdBy: 'system',
    tags: ['slab', 'rcc', 'inspection', 'structural'],
    applicablePhases: ['structure'],
    estimatedDuration: 6,
    items: [
      {
        id: 'ps-001',
        title: 'Shuttering Level & Alignment',
        description: 'Check shuttering level, slope, and alignment',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Shuttering',
        standards: ['IS 14687:1999', 'IS 456:2000'],
        specifications: [
          'Level tolerance ±5mm',
          'Camber as per design',
          'Joint gaps <2mm'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ps-002',
        title: 'Reinforcement Inspection',
        description: 'Verify reinforcement diameter, spacing, and cover',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Reinforcement',
        standards: ['IS 456:2000', 'IS 1786:2008'],
        specifications: [
          'Bar diameter as per BBS',
          'Spacing tolerance ±10mm',
          'Clear cover 20-25mm',
          'Lap length 50d'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ps-003',
        title: 'Electrical Conduit Layout',
        description: 'Check electrical conduits and boxes placement',
        completed: false,
        mandatory: true,
        category: 'MEP',
        standards: ['IS 732:2019', 'IS 694:2010'],
        specifications: [
          'Conduit size as per drawings',
          'Junction box positions verified',
          'Proper support and ties'
        ],
        estimatedHours: 1,
        status: 'pending'
      },
      {
        id: 'ps-004',
        title: 'Plumbing Sleeve Positions',
        description: 'Verify plumbing sleeves and openings',
        completed: false,
        mandatory: true,
        category: 'MEP',
        standards: ['IS 2064', 'CPHEEO Manual'],
        specifications: [
          'Sleeve positions as per drawings',
          'Proper sealing around sleeves',
          'No conflict with reinforcement'
        ],
        estimatedHours: 1,
        status: 'pending'
      }
    ]
  },
  {
    id: 'insp-finishing-001',
    name: 'Finishing Work Inspection',
    category: 'Finishing',
    type: 'inspection',
    description: 'Quality inspection for finishing works',
    version: '1.8',
    createdDate: new Date('2024-04-01'),
    updatedDate: new Date('2024-11-25'),
    createdBy: 'system',
    tags: ['finishing', 'plaster', 'paint', 'tiles'],
    applicablePhases: ['finishing'],
    estimatedDuration: 8,
    items: [
      {
        id: 'fi-001',
        title: 'Plastering Quality Check',
        description: 'Inspect plaster thickness, level, and finish',
        completed: false,
        mandatory: true,
        category: 'Plaster',
        standards: ['IS 1661:1972', 'IS 2402:1963'],
        specifications: [
          'Thickness 12-15mm internal, 15-20mm external',
          'Surface deviation <3mm in 2m',
          'No cracks or hollowness'
        ],
        estimatedHours: 2,
        status: 'pending'
      }
    ]
  }
];

// Compliance Templates
const complianceTemplates: ChecklistTemplate[] = [
  {
    id: 'comp-env-001',
    name: 'Environmental Compliance Checklist',
    category: 'Environmental',
    type: 'compliance',
    description: 'Environmental compliance and pollution control measures',
    version: '2.0',
    createdDate: new Date('2024-02-15'),
    updatedDate: new Date('2024-12-01'),
    createdBy: 'system',
    tags: ['environment', 'pollution', 'compliance', 'green'],
    estimatedDuration: 4,
    metadata: {
      regulations: ['EPA Act 1986', 'Water Act 1974', 'Air Act 1981'],
      certifications: ['ISO 14001', 'Green Building']
    },
    items: [
      {
        id: 'ec-001',
        title: 'Dust Control Measures',
        description: 'Verify dust suppression and control systems',
        completed: false,
        mandatory: true,
        category: 'Air Quality',
        standards: ['CPCB Guidelines', 'Air Act 1981'],
        acceptanceCriteria: [
          'Water sprinkling twice daily',
          'Covered material transport',
          'Wind barriers installed',
          'PM10 levels within limits'
        ],
        estimatedHours: 1,
        status: 'pending'
      },
      {
        id: 'ec-002',
        title: 'Waste Segregation & Disposal',
        description: 'Check waste management and disposal practices',
        completed: false,
        mandatory: true,
        category: 'Waste Management',
        standards: ['SWM Rules 2016', 'C&D Waste Rules 2016'],
        acceptanceCriteria: [
          'Separate bins for different waste',
          'Authorized disposal vendor',
          'Waste manifest maintained',
          'No open burning'
        ],
        estimatedHours: 1,
        status: 'pending'
      },
      {
        id: 'ec-003',
        title: 'Water Conservation Measures',
        description: 'Verify water conservation and treatment systems',
        completed: false,
        mandatory: true,
        category: 'Water Management',
        standards: ['Water Act 1974', 'CGWB Guidelines'],
        acceptanceCriteria: [
          'Rainwater harvesting system',
          'Wastewater treatment',
          'No groundwater extraction without permit',
          'Water meters installed'
        ],
        estimatedHours: 1,
        status: 'pending'
      },
      {
        id: 'ec-004',
        title: 'Noise Level Monitoring',
        description: 'Check noise levels and control measures',
        completed: false,
        mandatory: true,
        category: 'Noise Control',
        standards: ['Noise Rules 2000', 'CPCB Standards'],
        specifications: [
          'Day time <75 dB',
          'Night time <70 dB',
          'Residential area <55 dB'
        ],
        estimatedHours: 1,
        status: 'pending'
      }
    ]
  },
  {
    id: 'comp-statutory-001',
    name: 'Statutory Compliance Checklist',
    category: 'Legal',
    type: 'compliance',
    description: 'Statutory and regulatory compliance verification',
    version: '3.0',
    createdDate: new Date('2024-03-10'),
    updatedDate: new Date('2024-12-08'),
    createdBy: 'system',
    tags: ['legal', 'statutory', 'permits', 'licenses'],
    estimatedDuration: 6,
    metadata: {
      regulations: ['Building Bylaws', 'Labor Laws', 'Factory Act'],
      certifications: ['Building Permit', 'Fire NOC', 'Environmental Clearance']
    },
    items: [
      {
        id: 'sc-001',
        title: 'Building Plan Approval',
        description: 'Verify sanctioned building plan and deviations',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Permits',
        priority: 'urgent',
        standards: ['Local Building Bylaws', 'NBC 2016'],
        acceptanceCriteria: [
          'Approved plan available on site',
          'No unauthorized deviations',
          'Setbacks as per approval',
          'FAR/FSI within limits'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'sc-002',
        title: 'Labor License & Insurance',
        description: 'Verify labor license and insurance coverage',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Labor Compliance',
        standards: ['Contract Labor Act 1970', 'ESI Act 1948', 'EPF Act 1952'],
        acceptanceCriteria: [
          'Valid labor license',
          'ESI registration and payment',
          'EPF registration and payment',
          'Workmen compensation policy'
        ],
        estimatedHours: 1,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'sc-003',
        title: 'Fire Safety Compliance',
        description: 'Verify fire safety measures and NOC',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Fire Safety',
        standards: ['NBC 2016 Part 4', 'State Fire Rules'],
        acceptanceCriteria: [
          'Fire NOC obtained',
          'Fire extinguishers installed',
          'Emergency exits marked',
          'Fire alarm system functional'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'sc-004',
        title: 'Environmental Clearance',
        description: 'Verify environmental clearance if applicable',
        completed: false,
        mandatory: false,
        category: 'Environmental',
        standards: ['EIA Notification 2006', 'State Pollution Board Rules'],
        acceptanceCriteria: [
          'EC certificate if required',
          'CTE/CTO from pollution board',
          'Conditions compliance report',
          'Monitoring reports submitted'
        ],
        estimatedHours: 1,
        status: 'pending'
      }
    ]
  }
];

// Testing Templates
const testingTemplates: ChecklistTemplate[] = [
  {
    id: 'test-concrete-001',
    name: 'Concrete Testing Protocol',
    category: 'Material Testing',
    type: 'testing',
    description: 'Comprehensive concrete testing procedures and acceptance criteria',
    version: '2.2',
    createdDate: new Date('2024-01-25'),
    updatedDate: new Date('2024-11-30'),
    createdBy: 'system',
    tags: ['concrete', 'testing', 'quality', 'strength'],
    estimatedDuration: 72,
    items: [
      {
        id: 'ct-001',
        title: 'Slump Test',
        description: 'Measure concrete workability',
        completed: false,
        mandatory: true,
        category: 'Fresh Concrete',
        standards: ['IS 1199:1959'],
        specifications: [
          'Slump cone height 300mm',
          'Base diameter 200mm',
          'Top diameter 100mm'
        ],
        acceptanceCriteria: [
          'Slump value 75-100mm for normal concrete',
          'Test at batching plant and site',
          'Every 50m³ or part thereof'
        ],
        estimatedHours: 0.5,
        status: 'pending'
      },
      {
        id: 'ct-002',
        title: 'Cube Compressive Strength Test',
        description: 'Test concrete compressive strength at 7 and 28 days',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Hardened Concrete',
        standards: ['IS 516:1959', 'IS 456:2000'],
        specifications: [
          'Cube size 150mm x 150mm x 150mm',
          'Minimum 3 cubes per sample',
          'Curing in water at 27±2°C'
        ],
        acceptanceCriteria: [
          '7-day strength ≥ 65% of target',
          '28-day strength ≥ target strength',
          'Individual variation < 15%'
        ],
        estimatedHours: 1,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ct-003',
        title: 'Core Test',
        description: 'Core cutting test for in-situ concrete strength',
        completed: false,
        mandatory: false,
        category: 'In-situ Testing',
        standards: ['IS 516:1959', 'IS 1199:2018'],
        specifications: [
          'Core diameter 100mm minimum',
          'Length/diameter ratio 1-2',
          'Three cores per location'
        ],
        acceptanceCriteria: [
          'Average strength ≥ 85% of cube strength',
          'No individual < 75%',
          'Test if cube results unsatisfactory'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ct-004',
        title: 'Rebound Hammer Test',
        description: 'Non-destructive test for concrete strength',
        completed: false,
        mandatory: false,
        category: 'NDT',
        standards: ['IS 13311 (Part 2):1992'],
        specifications: [
          'Schmidt hammer Type N',
          'Test area 300mm x 300mm',
          'Minimum 12 readings per location'
        ],
        acceptanceCriteria: [
          'Correlation with cube strength',
          'Surface preparation required',
          'Not for acceptance, only uniformity'
        ],
        estimatedHours: 1,
        status: 'pending'
      }
    ]
  },
  {
    id: 'test-steel-001',
    name: 'Steel Reinforcement Testing',
    category: 'Material Testing',
    type: 'testing',
    description: 'Testing procedures for steel reinforcement bars',
    version: '1.5',
    createdDate: new Date('2024-02-10'),
    updatedDate: new Date('2024-11-20'),
    createdBy: 'system',
    tags: ['steel', 'reinforcement', 'testing', 'tensile'],
    estimatedDuration: 24,
    items: [
      {
        id: 'st-001',
        title: 'Tensile Strength Test',
        description: 'Test ultimate tensile strength and yield stress',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Mechanical Properties',
        standards: ['IS 1786:2008', 'IS 1608:2005'],
        specifications: [
          'Test length 5.65√A or 200mm',
          'Loading rate as per IS 1608',
          'Minimum 3 samples per lot'
        ],
        acceptanceCriteria: [
          'Fe 415: YS ≥ 415 N/mm²',
          'Fe 500: YS ≥ 500 N/mm²',
          'Elongation ≥ 14.5%',
          'UTS/YS ≥ 1.08'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'st-002',
        title: 'Bend & Rebend Test',
        description: 'Test ductility of reinforcement bars',
        completed: false,
        mandatory: true,
        category: 'Ductility',
        standards: ['IS 1786:2008', 'IS 1599:1985'],
        specifications: [
          'Bend angle 135° for ≤22mm',
          'Mandrel diameter as per IS',
          'Rebend after aging at 100°C'
        ],
        acceptanceCriteria: [
          'No cracks on bent surface',
          'Complete bend without fracture',
          'Rebend test for TMT bars only'
        ],
        estimatedHours: 1,
        status: 'pending'
      }
    ]
  },
  {
    id: 'test-soil-001',
    name: 'Soil Testing Protocol',
    category: 'Geotechnical',
    type: 'testing',
    description: 'Comprehensive soil testing for foundation design',
    version: '1.8',
    createdDate: new Date('2024-03-05'),
    updatedDate: new Date('2024-11-15'),
    createdBy: 'system',
    tags: ['soil', 'geotechnical', 'foundation', 'bearing'],
    estimatedDuration: 48,
    items: [
      {
        id: 'soil-001',
        title: 'Standard Penetration Test (SPT)',
        description: 'Determine soil bearing capacity and density',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'In-situ Testing',
        standards: ['IS 2131:1981', 'IS 6403:1981'],
        specifications: [
          'Split spoon sampler 50mm OD',
          'Hammer weight 63.5kg',
          'Drop height 750mm',
          'Test every 1.5m depth'
        ],
        acceptanceCriteria: [
          'N-value recorded for 300mm',
          'Correlation with bearing capacity',
          'Minimum 2 boreholes per building'
        ],
        estimatedHours: 8,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  }
];

// Commissioning Templates
const commissioningTemplates: ChecklistTemplate[] = [
  {
    id: 'comm-electrical-001',
    name: 'Electrical System Commissioning',
    category: 'Electrical',
    type: 'commissioning',
    description: 'Complete electrical system testing and commissioning',
    version: '2.5',
    createdDate: new Date('2024-04-15'),
    updatedDate: new Date('2024-12-02'),
    createdBy: 'system',
    tags: ['electrical', 'commissioning', 'testing', 'safety'],
    estimatedDuration: 24,
    items: [
      {
        id: 'el-001',
        title: 'Insulation Resistance Test',
        description: 'Test insulation resistance of all circuits',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Safety Testing',
        standards: ['IS 732:2019', 'IS 3043:2018'],
        specifications: [
          'Test voltage 500V DC',
          'Minimum IR value 1MΩ',
          'Test between phases and earth'
        ],
        acceptanceCriteria: [
          'IR > 50MΩ for new installation',
          'IR > 1MΩ for circuits in use',
          'No breakdown during test'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'el-002',
        title: 'Earth Resistance Test',
        description: 'Measure earth pit resistance',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Earthing',
        standards: ['IS 3043:2018', 'IEEE 80'],
        specifications: [
          'Fall of potential method',
          'Test in dry conditions',
          'All earth pits tested'
        ],
        acceptanceCriteria: [
          'Resistance < 1Ω for LT systems',
          'Resistance < 0.5Ω for HT systems',
          'Resistance < 5Ω for residential'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'el-003',
        title: 'Load Testing',
        description: 'Test electrical system under full load',
        completed: false,
        mandatory: true,
        category: 'Performance',
        standards: ['IS 732:2019', 'CEA Regulations'],
        specifications: [
          'Run at 100% load for 2 hours',
          'Monitor temperature rise',
          'Check voltage drop'
        ],
        acceptanceCriteria: [
          'Voltage drop < 5%',
          'No abnormal heating',
          'All protective devices functional'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  },
  {
    id: 'comm-hvac-001',
    name: 'HVAC System Commissioning',
    category: 'HVAC',
    type: 'commissioning',
    description: 'Testing and commissioning of HVAC systems',
    version: '2.0',
    createdDate: new Date('2024-05-01'),
    updatedDate: new Date('2024-11-28'),
    createdBy: 'system',
    tags: ['hvac', 'air-conditioning', 'ventilation', 'commissioning'],
    estimatedDuration: 16,
    items: [
      {
        id: 'hvac-001',
        title: 'Air Flow Testing',
        description: 'Measure and balance air flow rates',
        completed: false,
        mandatory: true,
        category: 'Performance',
        standards: ['ISHRAE Standards', 'NBC 2016'],
        specifications: [
          'Design CFM ±10%',
          'Fresh air as per occupancy',
          'Proper air distribution'
        ],
        acceptanceCriteria: [
          'All diffusers balanced',
          'No dead zones',
          'Noise levels within limits'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'hvac-002',
        title: 'Temperature Control Test',
        description: 'Test temperature control and set points',
        completed: false,
        mandatory: true,
        category: 'Controls',
        standards: ['ISHRAE', 'ASHRAE 55'],
        specifications: [
          'Set point accuracy ±1°C',
          'Response time < 15 min',
          'Uniform temperature distribution'
        ],
        acceptanceCriteria: [
          'Maintains set temperature',
          'No overcooling/overheating',
          'Proper sensor calibration'
        ],
        estimatedHours: 3,
        status: 'pending'
      }
    ]
  },
  {
    id: 'comm-plumbing-001',
    name: 'Plumbing System Commissioning',
    category: 'Plumbing',
    type: 'commissioning',
    description: 'Complete plumbing system testing and commissioning',
    version: '1.5',
    createdDate: new Date('2024-05-15'),
    updatedDate: new Date('2024-11-22'),
    createdBy: 'system',
    tags: ['plumbing', 'water-supply', 'drainage', 'commissioning'],
    estimatedDuration: 12,
    items: [
      {
        id: 'pl-001',
        title: 'Pressure Testing',
        description: 'Test water supply lines for leaks',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Water Supply',
        standards: ['IS 2064', 'CPHEEO Manual'],
        specifications: [
          'Test pressure 1.5 x working pressure',
          'Hold for 2 hours minimum',
          'Pressure drop < 5%'
        ],
        acceptanceCriteria: [
          'No visible leaks',
          'Pressure maintained',
          'All joints checked'
        ],
        estimatedHours: 3,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'pl-002',
        title: 'Flow Rate Testing',
        description: 'Test flow rates at fixtures',
        completed: false,
        mandatory: true,
        category: 'Performance',
        standards: ['NBC 2016', 'IS 1172'],
        specifications: [
          'Kitchen sink: 0.3 lps',
          'Wash basin: 0.15 lps',
          'Shower: 0.2 lps'
        ],
        acceptanceCriteria: [
          'Adequate flow at all points',
          'No water hammer',
          'Proper drainage'
        ],
        estimatedHours: 2,
        status: 'pending'
      }
    ]
  }
];

// Maintenance Templates
const maintenanceTemplates: ChecklistTemplate[] = [
  {
    id: 'maint-monthly-001',
    name: 'Monthly Building Maintenance',
    category: 'Preventive',
    type: 'maintenance',
    description: 'Monthly preventive maintenance checklist',
    version: '2.0',
    createdDate: new Date('2024-06-01'),
    updatedDate: new Date('2024-12-01'),
    createdBy: 'system',
    tags: ['maintenance', 'monthly', 'preventive', 'building'],
    estimatedDuration: 8,
    items: [
      {
        id: 'mm-001',
        title: 'DG Set Maintenance',
        description: 'Check and maintain diesel generator',
        completed: false,
        mandatory: true,
        category: 'Electrical',
        standards: ['IS 4722', 'IS 10000'],
        specifications: [
          'Oil level check',
          'Coolant level check',
          'Battery voltage check',
          'Test run for 30 minutes'
        ],
        acceptanceCriteria: [
          'Starts within 10 seconds',
          'No abnormal noise/vibration',
          'Output voltage stable'
        ],
        estimatedHours: 1,
        status: 'pending'
      },
      {
        id: 'mm-002',
        title: 'Fire Fighting Equipment',
        description: 'Check fire extinguishers and systems',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Fire Safety',
        standards: ['IS 2190', 'NBC Part 4'],
        specifications: [
          'Pressure gauge in green zone',
          'Pin and seal intact',
          'No physical damage',
          'Access not blocked'
        ],
        acceptanceCriteria: [
          'All extinguishers serviceable',
          'Hydrant system pressure OK',
          'Sprinklers unobstructed'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'mm-003',
        title: 'Lift Maintenance',
        description: 'Monthly lift inspection and maintenance',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Mechanical',
        standards: ['IS 14665', 'IS 15785'],
        specifications: [
          'Safety devices check',
          'Wire rope inspection',
          'Brake system check',
          'Emergency alarm test'
        ],
        acceptanceCriteria: [
          'Smooth operation',
          'All safety features functional',
          'Emergency phone working'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  },
  {
    id: 'maint-annual-001',
    name: 'Annual Building Maintenance',
    category: 'Preventive',
    type: 'maintenance',
    description: 'Annual comprehensive maintenance checklist',
    version: '1.5',
    createdDate: new Date('2024-01-01'),
    updatedDate: new Date('2024-11-01'),
    createdBy: 'system',
    tags: ['maintenance', 'annual', 'comprehensive', 'building'],
    estimatedDuration: 40,
    items: [
      {
        id: 'am-001',
        title: 'Structural Inspection',
        description: 'Annual structural integrity inspection',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Structural',
        standards: ['IS 456:2000', 'IS 13311'],
        specifications: [
          'Visual inspection for cracks',
          'Settlement monitoring',
          'Waterproofing check',
          'Expansion joint inspection'
        ],
        acceptanceCriteria: [
          'No structural cracks',
          'No differential settlement',
          'Waterproofing intact'
        ],
        estimatedHours: 8,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  }
];

// Audit Templates
const auditTemplates: ChecklistTemplate[] = [
  {
    id: 'audit-quality-001',
    name: 'Quality Management System Audit',
    category: 'QMS',
    type: 'audit',
    description: 'ISO 9001 based quality system audit',
    version: '3.0',
    createdDate: new Date('2024-07-01'),
    updatedDate: new Date('2024-12-05'),
    createdBy: 'system',
    tags: ['audit', 'quality', 'iso9001', 'management'],
    estimatedDuration: 16,
    metadata: {
      certifications: ['ISO 9001:2015']
    },
    items: [
      {
        id: 'qa-001',
        title: 'Document Control System',
        description: 'Audit document control procedures',
        completed: false,
        mandatory: true,
        category: 'Documentation',
        standards: ['ISO 9001:2015 Clause 7.5'],
        acceptanceCriteria: [
          'Controlled documents list maintained',
          'Version control implemented',
          'Obsolete documents removed',
          'Distribution records maintained'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'qa-002',
        title: 'Corrective Action Process',
        description: 'Review corrective and preventive actions',
        completed: false,
        mandatory: true,
        category: 'Improvement',
        standards: ['ISO 9001:2015 Clause 10.2'],
        acceptanceCriteria: [
          'Root cause analysis done',
          'Actions implemented',
          'Effectiveness verified',
          'Records maintained'
        ],
        estimatedHours: 3,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  },
  {
    id: 'audit-safety-001',
    name: 'Safety Management System Audit',
    category: 'SMS',
    type: 'audit',
    description: 'ISO 45001 based safety system audit',
    version: '2.0',
    createdDate: new Date('2024-07-15'),
    updatedDate: new Date('2024-11-30'),
    createdBy: 'system',
    tags: ['audit', 'safety', 'iso45001', 'ohsas'],
    estimatedDuration: 20,
    metadata: {
      certifications: ['ISO 45001:2018']
    },
    items: [
      {
        id: 'sa-001',
        title: 'Hazard Identification & Risk Assessment',
        description: 'Audit HIRA process and records',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Risk Management',
        standards: ['ISO 45001:2018 Clause 6.1'],
        acceptanceCriteria: [
          'HIRA register updated',
          'Control measures defined',
          'Residual risk acceptable',
          'Workers consulted'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'sa-002',
        title: 'Emergency Preparedness',
        description: 'Review emergency response procedures',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Emergency',
        standards: ['ISO 45001:2018 Clause 8.2'],
        acceptanceCriteria: [
          'Emergency plan documented',
          'Regular drills conducted',
          'Emergency team trained',
          'Equipment maintained'
        ],
        estimatedHours: 3,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  }
];

// Custom Templates
const customTemplates: ChecklistTemplate[] = [
  {
    id: 'custom-handover-001',
    name: 'Project Handover Checklist',
    category: 'Handover',
    type: 'custom',
    description: 'Complete project handover documentation and verification',
    version: '2.5',
    createdDate: new Date('2024-08-01'),
    updatedDate: new Date('2024-12-07'),
    createdBy: 'system',
    tags: ['handover', 'completion', 'documentation', 'client'],
    estimatedDuration: 24,
    items: [
      {
        id: 'ho-001',
        title: 'As-Built Drawings',
        description: 'Verify and submit final as-built drawings',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Documentation',
        acceptanceCriteria: [
          'All changes incorporated',
          'Signed by architect/engineer',
          'Digital and hard copies',
          'All disciplines covered'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ho-002',
        title: 'Test Certificates',
        description: 'Compile all material and system test certificates',
        completed: false,
        mandatory: true,
        category: 'Quality',
        acceptanceCriteria: [
          'Concrete test reports',
          'Steel test certificates',
          'Electrical test reports',
          'Plumbing pressure test'
        ],
        estimatedHours: 2,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ho-003',
        title: 'Warranty Documents',
        description: 'Collect and organize warranty documents',
        completed: false,
        mandatory: true,
        category: 'Warranty',
        acceptanceCriteria: [
          'All equipment warranties',
          'Waterproofing warranty',
          'Paint warranty',
          'Contact details included'
        ],
        estimatedHours: 2,
        status: 'pending'
      },
      {
        id: 'ho-004',
        title: 'O&M Manuals',
        description: 'Prepare operation and maintenance manuals',
        completed: false,
        mandatory: true,
        category: 'Documentation',
        acceptanceCriteria: [
          'Equipment operation guides',
          'Maintenance schedules',
          'Troubleshooting guides',
          'Spare parts list'
        ],
        estimatedHours: 3,
        status: 'pending'
      },
      {
        id: 'ho-005',
        title: 'Statutory Approvals',
        description: 'Obtain all final statutory approvals',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Legal',
        acceptanceCriteria: [
          'Completion certificate',
          'Occupancy certificate',
          'Fire NOC',
          'Lift license'
        ],
        estimatedHours: 8,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 'ho-006',
        title: 'Snagging List Closure',
        description: 'Complete all pending snagging items',
        completed: false,
        mandatory: true,
        category: 'Quality',
        acceptanceCriteria: [
          'All items addressed',
          'Client verification done',
          'Sign-off obtained',
          'Photos attached'
        ],
        estimatedHours: 4,
        requiresVerification: true,
        status: 'pending'
      }
    ]
  },
  {
    id: 'custom-vendor-001',
    name: 'Vendor Evaluation Checklist',
    category: 'Procurement',
    type: 'custom',
    description: 'Comprehensive vendor assessment and qualification',
    version: '1.0',
    createdDate: new Date('2024-09-01'),
    updatedDate: new Date('2024-11-25'),
    createdBy: 'system',
    tags: ['vendor', 'procurement', 'evaluation', 'qualification'],
    estimatedDuration: 8,
    items: [
      {
        id: 've-001',
        title: 'Technical Capability Assessment',
        description: 'Evaluate vendor technical competence',
        completed: false,
        mandatory: true,
        category: 'Technical',
        acceptanceCriteria: [
          'Relevant experience verified',
          'Technical team qualified',
          'Equipment/resources adequate',
          'Past performance satisfactory'
        ],
        estimatedHours: 2,
        status: 'pending'
      },
      {
        id: 've-002',
        title: 'Financial Stability Check',
        description: 'Verify vendor financial health',
        completed: false,
        mandatory: true,
        critical: true,
        category: 'Financial',
        acceptanceCriteria: [
          'Bank statements reviewed',
          'Credit rating checked',
          'GST compliance verified',
          'No major litigations'
        ],
        estimatedHours: 1,
        requiresVerification: true,
        status: 'pending'
      },
      {
        id: 've-003',
        title: 'Quality System Review',
        description: 'Assess vendor quality management system',
        completed: false,
        mandatory: true,
        category: 'Quality',
        acceptanceCriteria: [
          'Quality policy defined',
          'QC procedures documented',
          'Testing facilities available',
          'Certifications valid'
        ],
        estimatedHours: 2,
        status: 'pending'
      }
    ]
  }
];

// Combine all templates
export const allChecklistTemplates: ChecklistTemplate[] = [
  ...qualityTemplates,
  ...safetyTemplates,
  ...inspectionTemplates,
  ...complianceTemplates,
  ...testingTemplates,
  ...commissioningTemplates,
  ...maintenanceTemplates,
  ...auditTemplates,
  ...customTemplates
];

// Helper functions
export function getTemplatesByType(type: ChecklistTemplate['type']): ChecklistTemplate[] {
  return allChecklistTemplates.filter(template => template.type === type);
}

export function getTemplatesByCategory(category: string): ChecklistTemplate[] {
  return allChecklistTemplates.filter(template => template.category === category);
}

export function getTemplateById(id: string): ChecklistTemplate | undefined {
  return allChecklistTemplates.find(template => template.id === id);
}

export function searchTemplates(query: string): ChecklistTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return allChecklistTemplates.filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    template.category.toLowerCase().includes(lowercaseQuery)
  );
}

export function getTemplateCategories(): string[] {
  const categories = new Set(allChecklistTemplates.map(template => template.category));
  return Array.from(categories).sort();
}

export function getTemplateTypes(): ChecklistTemplate['type'][] {
  return ['quality', 'safety', 'inspection', 'compliance', 'testing', 'commissioning', 'maintenance', 'audit', 'custom'];
}

export function createChecklistFromTemplate(templateId: string, customizations?: Partial<ChecklistItemDetail>[]): ChecklistItemDetail[] {
  const template = getTemplateById(templateId);
  if (!template) return [];
  
  return template.items.map((item, index) => {
    const customization = customizations?.[index] || {};
    return {
      ...item,
      ...customization,
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      completed: false,
      status: 'pending'
    };
  });
}

export function calculateChecklistProgress(items: ChecklistItemDetail[]): {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  verified: number;
  failed: number;
  completionPercentage: number;
  mandatoryCompletion: number;
  criticalCompletion: number;
} {
  const total = items.length;
  const completed = items.filter(item => item.status === 'completed').length;
  const pending = items.filter(item => item.status === 'pending').length;
  const inProgress = items.filter(item => item.status === 'in_progress').length;
  const verified = items.filter(item => item.status === 'verified').length;
  const failed = items.filter(item => item.status === 'failed').length;
  
  const mandatoryItems = items.filter(item => item.mandatory);
  const mandatoryCompleted = mandatoryItems.filter(item => 
    item.status === 'completed' || item.status === 'verified'
  ).length;
  
  const criticalItems = items.filter(item => item.critical);
  const criticalCompleted = criticalItems.filter(item => 
    item.status === 'completed' || item.status === 'verified'
  ).length;
  
  return {
    total,
    completed,
    pending,
    inProgress,
    verified,
    failed,
    completionPercentage: total > 0 ? Math.round(((completed + verified) / total) * 100) : 0,
    mandatoryCompletion: mandatoryItems.length > 0 
      ? Math.round((mandatoryCompleted / mandatoryItems.length) * 100) 
      : 100,
    criticalCompletion: criticalItems.length > 0 
      ? Math.round((criticalCompleted / criticalItems.length) * 100) 
      : 100
  };
}

export function validateChecklistCompletion(items: ChecklistItemDetail[]): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check mandatory items
  const incompleteMandatory = items.filter(item => 
    item.mandatory && item.status !== 'completed' && item.status !== 'verified'
  );
  
  if (incompleteMandatory.length > 0) {
    errors.push(`${incompleteMandatory.length} mandatory items are not completed`);
    incompleteMandatory.forEach(item => {
      errors.push(`- ${item.title}`);
    });
  }
  
  // Check critical items
  const incompleteCritical = items.filter(item => 
    item.critical && item.status !== 'completed' && item.status !== 'verified'
  );
  
  if (incompleteCritical.length > 0) {
    errors.push(`${incompleteCritical.length} critical items are not completed`);
  }
  
  // Check failed items
  const failedItems = items.filter(item => item.status === 'failed');
  if (failedItems.length > 0) {
    warnings.push(`${failedItems.length} items have failed and need corrective action`);
  }
  
  // Check items requiring verification
  const unverifiedItems = items.filter(item => 
    item.requiresVerification && item.status === 'completed' && !item.verifiedDate
  );
  
  if (unverifiedItems.length > 0) {
    warnings.push(`${unverifiedItems.length} items are awaiting verification`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function exportChecklistToExcel(checklist: ChecklistItemDetail[], templateName: string): any {
  // This would integrate with a library like xlsx or exceljs
  // For now, returning a structured data format
  return {
    templateName,
    exportDate: new Date(),
    items: checklist.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      status: item.status,
      completed: item.completed,
      mandatory: item.mandatory,
      critical: item.critical,
      category: item.category,
      completedDate: item.completedDate,
      completedBy: item.completedByName,
      verifiedBy: item.verifiedByName,
      verifiedDate: item.verifiedDate,
      attachments: item.attachments?.length || 0,
      comments: item.comments?.length || 0
    }))
  };
}
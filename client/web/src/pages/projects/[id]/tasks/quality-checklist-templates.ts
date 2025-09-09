// Quality Control Checklist Templates for Construction Projects

export interface ChecklistItem {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  mandatory: boolean;
  category: string;
  subcategory?: string;
  assignee?: string;
  dueDate?: string;
  completedDate?: string;
  completedBy?: string;
  notes?: string;
  attachments?: any[];
  verificationRequired?: boolean;
  verifiedBy?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  tags?: string[];
  dependsOn?: string[];
  estimatedTime?: number; // in minutes
  actualTime?: number;
  costImpact?: number;
  qualityScore?: number; // 1-10
  comments?: any[];
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  items: Omit<ChecklistItem, 'id' | 'completed' | 'completedDate' | 'completedBy'>[];
  totalItems: number;
  estimatedDuration: number; // in hours
  requiredForApproval: boolean;
  regulatoryCompliance?: string[];
  industry: string;
}

export const masterChecklistTemplates: ChecklistTemplate[] = [
  // Foundation Category Checklists
  {
    id: 'foundation-quality',
    name: 'Foundation Quality Control Checklist',
    category: 'foundation',
    description: 'Comprehensive quality checks for foundation work including excavation, reinforcement, and concrete',
    totalItems: 25,
    estimatedDuration: 8,
    requiredForApproval: true,
    regulatoryCompliance: ['IS 456:2000', 'IS 2950:1981', 'NBC 2016'],
    industry: 'construction',
    items: [
      // Site Preparation
      {
        text: 'Site clearing and grubbing completed',
        description: 'Ensure all vegetation, debris, and unsuitable materials removed from foundation area',
        mandatory: true,
        category: 'Site Preparation',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['safety', 'preparation']
      },
      {
        text: 'Soil testing report approved',
        description: 'Verify soil bearing capacity meets design requirements (min 150 kN/m²)',
        mandatory: true,
        category: 'Site Preparation',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 30,
        tags: ['documentation', 'compliance']
      },
      {
        text: 'Survey and layout verification',
        description: 'Check foundation dimensions, levels, and alignment as per approved drawings',
        mandatory: true,
        category: 'Site Preparation',
        priority: 'critical',
        estimatedTime: 90,
        tags: ['accuracy', 'measurement']
      },
      
      // Excavation
      {
        text: 'Excavation depth verified',
        description: 'Confirm excavation depth matches design specifications (±10mm tolerance)',
        mandatory: true,
        category: 'Excavation',
        priority: 'critical',
        estimatedTime: 45,
        tags: ['measurement', 'accuracy']
      },
      {
        text: 'Excavation slopes stable',
        description: 'Ensure side slopes are stable and properly shored if required',
        mandatory: true,
        category: 'Excavation',
        priority: 'high',
        estimatedTime: 30,
        tags: ['safety', 'stability']
      },
      {
        text: 'Dewatering system operational',
        description: 'Verify dewatering pumps working if groundwater present',
        mandatory: false,
        category: 'Excavation',
        priority: 'medium',
        estimatedTime: 20,
        tags: ['water-management']
      },
      
      // PCC (Plain Cement Concrete)
      {
        text: 'PCC bed level checked',
        description: 'Verify PCC bed is level and at correct elevation',
        mandatory: true,
        category: 'PCC Work',
        priority: 'high',
        estimatedTime: 30,
        tags: ['leveling', 'concrete']
      },
      {
        text: 'PCC mix design approved',
        description: 'Confirm M10/M15 grade concrete mix as per specifications',
        mandatory: true,
        category: 'PCC Work',
        priority: 'high',
        verificationRequired: true,
        estimatedTime: 20,
        tags: ['mix-design', 'quality']
      },
      {
        text: 'PCC thickness verified',
        description: 'Check PCC thickness is minimum 75mm or as specified',
        mandatory: true,
        category: 'PCC Work',
        priority: 'high',
        estimatedTime: 25,
        tags: ['measurement', 'concrete']
      },
      
      // Reinforcement
      {
        text: 'Rebar grade and diameter verified',
        description: 'Check steel reinforcement grade (Fe415/Fe500) and bar diameters match design',
        mandatory: true,
        category: 'Reinforcement',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 60,
        tags: ['steel', 'specifications']
      },
      {
        text: 'Rebar spacing checked',
        description: 'Verify spacing between bars as per structural drawings',
        mandatory: true,
        category: 'Reinforcement',
        priority: 'critical',
        estimatedTime: 45,
        tags: ['spacing', 'structural']
      },
      {
        text: 'Concrete cover maintained',
        description: 'Ensure minimum cover of 40mm for footings, 50mm for raft',
        mandatory: true,
        category: 'Reinforcement',
        priority: 'critical',
        estimatedTime: 30,
        tags: ['cover', 'protection']
      },
      {
        text: 'Lap length and anchorage verified',
        description: 'Check lap lengths (40d for compression, 50d for tension) and anchorage',
        mandatory: true,
        category: 'Reinforcement',
        priority: 'high',
        estimatedTime: 40,
        tags: ['structural', 'connections']
      },
      {
        text: 'Chair bars and spacers installed',
        description: 'Verify proper support for top reinforcement mesh',
        mandatory: true,
        category: 'Reinforcement',
        priority: 'high',
        estimatedTime: 25,
        tags: ['support', 'positioning']
      },
      
      // Formwork
      {
        text: 'Formwork dimensions checked',
        description: 'Verify formwork dimensions match drawing specifications',
        mandatory: true,
        category: 'Formwork',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['dimensions', 'accuracy']
      },
      {
        text: 'Formwork properly braced',
        description: 'Ensure formwork is rigid and properly supported',
        mandatory: true,
        category: 'Formwork',
        priority: 'high',
        estimatedTime: 45,
        tags: ['stability', 'safety']
      },
      {
        text: 'Formwork joints sealed',
        description: 'Check all joints are sealed to prevent concrete leakage',
        mandatory: true,
        category: 'Formwork',
        priority: 'medium',
        estimatedTime: 30,
        tags: ['sealing', 'quality']
      },
      
      // Concrete Pour
      {
        text: 'Concrete grade test conducted',
        description: 'Cube test samples taken for 7-day and 28-day strength testing',
        mandatory: true,
        category: 'Concrete Pour',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 30,
        tags: ['testing', 'quality-control']
      },
      {
        text: 'Slump test performed',
        description: 'Verify concrete workability (75-100mm slump for normal conditions)',
        mandatory: true,
        category: 'Concrete Pour',
        priority: 'high',
        estimatedTime: 15,
        tags: ['testing', 'workability']
      },
      {
        text: 'Vibration completed properly',
        description: 'Ensure adequate vibration for concrete compaction',
        mandatory: true,
        category: 'Concrete Pour',
        priority: 'high',
        estimatedTime: 60,
        tags: ['compaction', 'quality']
      },
      {
        text: 'Concrete surface finished',
        description: 'Check surface is level and properly finished',
        mandatory: true,
        category: 'Concrete Pour',
        priority: 'medium',
        estimatedTime: 45,
        tags: ['finishing', 'surface']
      },
      
      // Curing
      {
        text: 'Curing started within 12 hours',
        description: 'Verify curing process initiated within specified time',
        mandatory: true,
        category: 'Curing',
        priority: 'critical',
        estimatedTime: 15,
        tags: ['curing', 'timing']
      },
      {
        text: 'Curing method appropriate',
        description: 'Check ponding/wet gunny bags/curing compound applied',
        mandatory: true,
        category: 'Curing',
        priority: 'high',
        estimatedTime: 20,
        tags: ['curing', 'method']
      },
      {
        text: '7-day continuous curing maintained',
        description: 'Ensure minimum 7 days of continuous curing for footings',
        mandatory: true,
        category: 'Curing',
        priority: 'critical',
        estimatedTime: 15,
        tags: ['curing', 'duration']
      },
      
      // Final Checks
      {
        text: 'Waterproofing membrane applied',
        description: 'Verify waterproofing treatment on external faces if required',
        mandatory: false,
        category: 'Waterproofing',
        priority: 'medium',
        estimatedTime: 60,
        tags: ['waterproofing', 'protection']
      }
    ]
  },

  // Electrical Category Checklists
  {
    id: 'electrical-quality',
    name: 'Electrical Installation Quality Checklist',
    category: 'electrical',
    description: 'Complete quality control for electrical installations including wiring, panels, and safety systems',
    totalItems: 30,
    estimatedDuration: 10,
    requiredForApproval: true,
    regulatoryCompliance: ['IS 732:2019', 'NBC 2016 Part 8', 'CEA Regulations'],
    industry: 'construction',
    items: [
      // Conduit and Wiring
      {
        text: 'Conduit size and type verified',
        description: 'Check PVC/GI conduit sizes match electrical drawings',
        mandatory: true,
        category: 'Conduit Work',
        priority: 'high',
        estimatedTime: 45,
        tags: ['conduit', 'specifications']
      },
      {
        text: 'Conduit routing as per layout',
        description: 'Verify conduit paths follow approved electrical layout',
        mandatory: true,
        category: 'Conduit Work',
        priority: 'high',
        estimatedTime: 60,
        tags: ['routing', 'layout']
      },
      {
        text: 'Wire gauge appropriate for load',
        description: 'Confirm wire sizes: 1.5sq.mm for lights, 2.5sq.mm for power, 4sq.mm for AC',
        mandatory: true,
        category: 'Wiring',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 90,
        tags: ['wire-gauge', 'load-calculation']
      },
      {
        text: 'Color coding followed',
        description: 'Red-Phase, Yellow-Phase, Blue-Phase, Black-Neutral, Green-Earth',
        mandatory: true,
        category: 'Wiring',
        priority: 'high',
        estimatedTime: 30,
        tags: ['color-code', 'standards']
      },
      
      // Distribution Board
      {
        text: 'MCB ratings correct',
        description: 'Verify MCB ratings: 6A for lights, 16A for power, 20A for AC',
        mandatory: true,
        category: 'Distribution Board',
        priority: 'critical',
        estimatedTime: 45,
        tags: ['MCB', 'protection']
      },
      {
        text: 'RCCB/ELCB installed',
        description: 'Check 30mA RCCB for bathroom/kitchen, 100mA for other areas',
        mandatory: true,
        category: 'Distribution Board',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 30,
        tags: ['safety', 'RCCB']
      },
      {
        text: 'Proper labeling of circuits',
        description: 'All circuits clearly labeled in distribution board',
        mandatory: true,
        category: 'Distribution Board',
        priority: 'medium',
        estimatedTime: 30,
        tags: ['labeling', 'identification']
      },
      
      // Earthing System
      {
        text: 'Earth pit resistance tested',
        description: 'Verify earth resistance less than 5 ohms for domestic, 1 ohm for industrial',
        mandatory: true,
        category: 'Earthing',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 60,
        tags: ['earthing', 'testing']
      },
      {
        text: 'Earth continuity verified',
        description: 'Check continuity from all outlets to earth pit',
        mandatory: true,
        category: 'Earthing',
        priority: 'critical',
        estimatedTime: 120,
        tags: ['continuity', 'safety']
      },
      {
        text: 'Equipment earthing connected',
        description: 'Verify all metal enclosures and equipment properly earthed',
        mandatory: true,
        category: 'Earthing',
        priority: 'critical',
        estimatedTime: 90,
        tags: ['equipment', 'grounding']
      },
      
      // Testing
      {
        text: 'Insulation resistance test',
        description: 'Megger test showing minimum 1 MΩ between conductors',
        mandatory: true,
        category: 'Testing',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 90,
        tags: ['megger', 'insulation']
      },
      {
        text: 'Polarity test completed',
        description: 'Verify correct polarity at all outlets',
        mandatory: true,
        category: 'Testing',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['polarity', 'safety']
      },
      {
        text: 'Load test performed',
        description: 'Test with actual load to verify voltage drop within limits',
        mandatory: true,
        category: 'Testing',
        priority: 'high',
        estimatedTime: 120,
        tags: ['load-test', 'performance']
      }
    ]
  },

  // Plumbing Category Checklists
  {
    id: 'plumbing-quality',
    name: 'Plumbing Installation Quality Checklist',
    category: 'plumbing',
    description: 'Quality control for plumbing work including water supply, drainage, and fixtures',
    totalItems: 28,
    estimatedDuration: 8,
    requiredForApproval: true,
    regulatoryCompliance: ['IS 2064:1993', 'NBC 2016 Part 9', 'CPHEEO Manual'],
    industry: 'construction',
    items: [
      // Water Supply
      {
        text: 'Pipe material and class verified',
        description: 'Check CPVC/PPR pipes with correct pressure rating (SDR 11 for hot water)',
        mandatory: true,
        category: 'Water Supply',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 45,
        tags: ['materials', 'specifications']
      },
      {
        text: 'Pipe sizing as per design',
        description: 'Verify pipe diameters: 15mm for taps, 20mm for main lines, 25mm for risers',
        mandatory: true,
        category: 'Water Supply',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['sizing', 'flow-rate']
      },
      {
        text: 'Pressure test conducted',
        description: 'Hydrostatic test at 1.5 times working pressure for 2 hours',
        mandatory: true,
        category: 'Water Supply',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 120,
        tags: ['pressure-test', 'leak-detection']
      },
      {
        text: 'Insulation on hot water pipes',
        description: 'Verify proper insulation on all hot water supply lines',
        mandatory: false,
        category: 'Water Supply',
        priority: 'medium',
        estimatedTime: 45,
        tags: ['insulation', 'energy-efficiency']
      },
      
      // Drainage System
      {
        text: 'Pipe slope verified',
        description: 'Check minimum slope: 1:40 for 100mm pipes, 1:60 for 150mm pipes',
        mandatory: true,
        category: 'Drainage',
        priority: 'critical',
        estimatedTime: 90,
        tags: ['slope', 'drainage']
      },
      {
        text: 'Trap seals adequate',
        description: 'Verify 50mm water seal in all P-traps and floor traps',
        mandatory: true,
        category: 'Drainage',
        priority: 'high',
        estimatedTime: 60,
        tags: ['traps', 'odor-prevention']
      },
      {
        text: 'Vent pipes installed',
        description: 'Check anti-siphonage pipes extended above roof level',
        mandatory: true,
        category: 'Drainage',
        priority: 'high',
        estimatedTime: 45,
        tags: ['venting', 'air-circulation']
      },
      {
        text: 'Inspection chambers accessible',
        description: 'Verify IC covers are at correct level and easily accessible',
        mandatory: true,
        category: 'Drainage',
        priority: 'high',
        estimatedTime: 30,
        tags: ['access', 'maintenance']
      },
      
      // Fixtures
      {
        text: 'Fixture alignment checked',
        description: 'Verify all fixtures are level and properly aligned',
        mandatory: true,
        category: 'Fixtures',
        priority: 'medium',
        estimatedTime: 60,
        tags: ['alignment', 'aesthetics']
      },
      {
        text: 'Water-saving fixtures installed',
        description: 'Check for dual-flush cisterns, aerators on taps',
        mandatory: false,
        category: 'Fixtures',
        priority: 'low',
        estimatedTime: 30,
        tags: ['water-conservation', 'green']
      },
      {
        text: 'Leak test at fixtures',
        description: 'Check for leaks at all connection points',
        mandatory: true,
        category: 'Fixtures',
        priority: 'high',
        estimatedTime: 90,
        tags: ['leak-test', 'connections']
      }
    ]
  },

  // Planning Category Checklists
  {
    id: 'planning-quality',
    name: 'Project Planning Quality Checklist',
    category: 'planning',
    description: 'Pre-construction planning and documentation quality checks',
    totalItems: 20,
    estimatedDuration: 6,
    requiredForApproval: true,
    regulatoryCompliance: ['NBC 2016', 'Local Building Bylaws'],
    industry: 'construction',
    items: [
      // Documentation
      {
        text: 'Building permit obtained',
        description: 'Verify all necessary permits from local authorities',
        mandatory: true,
        category: 'Permits',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 30,
        tags: ['legal', 'compliance']
      },
      {
        text: 'Architectural drawings approved',
        description: 'Check for client and authority approvals on all drawings',
        mandatory: true,
        category: 'Documentation',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['drawings', 'approvals']
      },
      {
        text: 'Structural drawings verified',
        description: 'Ensure structural design approved by licensed engineer',
        mandatory: true,
        category: 'Documentation',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 60,
        tags: ['structural', 'engineering']
      },
      {
        text: 'MEP drawings coordinated',
        description: 'Verify no clashes between mechanical, electrical, and plumbing',
        mandatory: true,
        category: 'Documentation',
        priority: 'high',
        estimatedTime: 120,
        tags: ['MEP', 'coordination']
      },
      
      // Site Planning
      {
        text: 'Site layout finalized',
        description: 'Confirm site boundaries, setbacks, and orientation',
        mandatory: true,
        category: 'Site Planning',
        priority: 'critical',
        estimatedTime: 90,
        tags: ['layout', 'boundaries']
      },
      {
        text: 'Material storage areas identified',
        description: 'Designate proper storage areas for different materials',
        mandatory: true,
        category: 'Site Planning',
        priority: 'high',
        estimatedTime: 45,
        tags: ['storage', 'logistics']
      },
      {
        text: 'Safety plan prepared',
        description: 'Comprehensive safety plan with emergency procedures',
        mandatory: true,
        category: 'Safety Planning',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 120,
        tags: ['safety', 'emergency']
      },
      
      // Schedule
      {
        text: 'Project schedule approved',
        description: 'Detailed schedule with milestones approved by stakeholders',
        mandatory: true,
        category: 'Scheduling',
        priority: 'critical',
        estimatedTime: 180,
        tags: ['schedule', 'timeline']
      },
      {
        text: 'Resource plan prepared',
        description: 'Manpower and equipment deployment plan ready',
        mandatory: true,
        category: 'Resources',
        priority: 'high',
        estimatedTime: 120,
        tags: ['resources', 'deployment']
      },
      {
        text: 'Quality plan documented',
        description: 'Quality control procedures and checkpoints defined',
        mandatory: true,
        category: 'Quality',
        priority: 'high',
        estimatedTime: 90,
        tags: ['quality', 'procedures']
      }
    ]
  },

  // Development/Construction Category Checklists
  {
    id: 'development-quality',
    name: 'Structural Development Quality Checklist',
    category: 'development',
    description: 'Quality control for structural construction including columns, beams, and slabs',
    totalItems: 35,
    estimatedDuration: 12,
    requiredForApproval: true,
    regulatoryCompliance: ['IS 456:2000', 'IS 13920:2016', 'NBC 2016'],
    industry: 'construction',
    items: [
      // Column Construction
      {
        text: 'Column starter checked',
        description: 'Verify column starter bars from foundation',
        mandatory: true,
        category: 'Columns',
        priority: 'critical',
        estimatedTime: 45,
        tags: ['columns', 'reinforcement']
      },
      {
        text: 'Column reinforcement as per drawing',
        description: 'Check main bars and stirrups spacing and diameter',
        mandatory: true,
        category: 'Columns',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 60,
        tags: ['reinforcement', 'structural']
      },
      {
        text: 'Column verticality checked',
        description: 'Verify plumb within tolerance of H/1000 or 15mm max',
        mandatory: true,
        category: 'Columns',
        priority: 'critical',
        estimatedTime: 45,
        tags: ['verticality', 'alignment']
      },
      {
        text: 'Concrete cover maintained',
        description: 'Ensure 40mm clear cover to reinforcement',
        mandatory: true,
        category: 'Columns',
        priority: 'high',
        estimatedTime: 30,
        tags: ['cover', 'durability']
      },
      
      // Beam Construction
      {
        text: 'Beam bottom level verified',
        description: 'Check beam soffit level as per structural drawings',
        mandatory: true,
        category: 'Beams',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['level', 'beams']
      },
      {
        text: 'Beam reinforcement checked',
        description: 'Verify top and bottom bars with proper anchorage',
        mandatory: true,
        category: 'Beams',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 90,
        tags: ['reinforcement', 'structural']
      },
      {
        text: 'Stirrup spacing verified',
        description: 'Check closer spacing near supports as per IS 13920',
        mandatory: true,
        category: 'Beams',
        priority: 'high',
        estimatedTime: 45,
        tags: ['stirrups', 'shear']
      },
      
      // Slab Construction
      {
        text: 'Slab thickness verified',
        description: 'Check slab thickness as per design (typically 100-150mm)',
        mandatory: true,
        category: 'Slabs',
        priority: 'critical',
        estimatedTime: 60,
        tags: ['thickness', 'slabs']
      },
      {
        text: 'Slab reinforcement placed',
        description: 'Verify main and distribution bars with proper spacing',
        mandatory: true,
        category: 'Slabs',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 120,
        tags: ['reinforcement', 'mesh']
      },
      {
        text: 'Electrical conduits placed',
        description: 'Check all electrical conduits laid before concreting',
        mandatory: true,
        category: 'Slabs',
        priority: 'high',
        estimatedTime: 90,
        tags: ['conduits', 'coordination']
      },
      {
        text: 'Concrete grade verified',
        description: 'Confirm M20/M25 grade as per design mix',
        mandatory: true,
        category: 'Concrete',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 30,
        tags: ['concrete', 'grade']
      },
      {
        text: 'Curing for 14 days',
        description: 'Ensure continuous curing for slabs minimum 14 days',
        mandatory: true,
        category: 'Curing',
        priority: 'critical',
        estimatedTime: 30,
        tags: ['curing', 'strength']
      }
    ]
  },

  // Finalization Category Checklists
  {
    id: 'finalization-quality',
    name: 'Finishing Works Quality Checklist',
    category: 'finalization',
    description: 'Quality control for finishing works including plastering, painting, flooring, and final touches',
    totalItems: 40,
    estimatedDuration: 15,
    requiredForApproval: true,
    regulatoryCompliance: ['IS 1661:1972', 'IS 13432:1992'],
    industry: 'construction',
    items: [
      // Plastering
      {
        text: 'Surface preparation done',
        description: 'Wall surface cleaned, hacked if needed, and wetted',
        mandatory: true,
        category: 'Plastering',
        priority: 'high',
        estimatedTime: 60,
        tags: ['preparation', 'surface']
      },
      {
        text: 'Plaster thickness checked',
        description: 'Verify 12mm internal, 15-20mm external plaster thickness',
        mandatory: true,
        category: 'Plastering',
        priority: 'high',
        estimatedTime: 45,
        tags: ['thickness', 'plaster']
      },
      {
        text: 'Plaster surface level',
        description: 'Check with straight edge, max 3mm variation in 3m',
        mandatory: true,
        category: 'Plastering',
        priority: 'high',
        estimatedTime: 90,
        tags: ['level', 'finish']
      },
      {
        text: 'No cracks or hollowness',
        description: 'Tap test for hollow spots, check for cracks',
        mandatory: true,
        category: 'Plastering',
        priority: 'high',
        estimatedTime: 120,
        tags: ['defects', 'quality']
      },
      
      // Painting
      {
        text: 'Surface moisture checked',
        description: 'Verify moisture content below 10% before painting',
        mandatory: true,
        category: 'Painting',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 60,
        tags: ['moisture', 'preparation']
      },
      {
        text: 'Primer coat applied',
        description: 'Check proper primer application and drying',
        mandatory: true,
        category: 'Painting',
        priority: 'high',
        estimatedTime: 180,
        tags: ['primer', 'base-coat']
      },
      {
        text: 'Paint coats uniform',
        description: 'Verify minimum 2 coats with uniform coverage',
        mandatory: true,
        category: 'Painting',
        priority: 'medium',
        estimatedTime: 240,
        tags: ['painting', 'finish']
      },
      {
        text: 'Color consistency verified',
        description: 'Check color matches approved shade card',
        mandatory: true,
        category: 'Painting',
        priority: 'medium',
        estimatedTime: 30,
        tags: ['color', 'aesthetics']
      },
      
      // Flooring
      {
        text: 'Floor level checked',
        description: 'Verify floor levels and slopes as per design',
        mandatory: true,
        category: 'Flooring',
        priority: 'critical',
        estimatedTime: 90,
        tags: ['level', 'flooring']
      },
      {
        text: 'Tile alignment verified',
        description: 'Check tile lines are straight and joints uniform',
        mandatory: true,
        category: 'Flooring',
        priority: 'high',
        estimatedTime: 120,
        tags: ['alignment', 'tiles']
      },
      {
        text: 'No hollow tiles',
        description: 'Tap test to ensure no hollow spots under tiles',
        mandatory: true,
        category: 'Flooring',
        priority: 'high',
        estimatedTime: 180,
        tags: ['hollow', 'bonding']
      },
      {
        text: 'Grouting completed',
        description: 'Verify proper grouting with no gaps',
        mandatory: true,
        category: 'Flooring',
        priority: 'medium',
        estimatedTime: 120,
        tags: ['grouting', 'joints']
      },
      
      // Doors and Windows
      {
        text: 'Door/window alignment checked',
        description: 'Verify frames are plumb and square',
        mandatory: true,
        category: 'Doors & Windows',
        priority: 'high',
        estimatedTime: 90,
        tags: ['alignment', 'carpentry']
      },
      {
        text: 'Smooth operation verified',
        description: 'Check all doors and windows open/close smoothly',
        mandatory: true,
        category: 'Doors & Windows',
        priority: 'high',
        estimatedTime: 60,
        tags: ['operation', 'functionality']
      },
      {
        text: 'Hardware fixed properly',
        description: 'Verify handles, locks, hinges properly fixed',
        mandatory: true,
        category: 'Doors & Windows',
        priority: 'medium',
        estimatedTime: 90,
        tags: ['hardware', 'fittings']
      },
      {
        text: 'Weather sealing done',
        description: 'Check gaps sealed for weatherproofing',
        mandatory: true,
        category: 'Doors & Windows',
        priority: 'medium',
        estimatedTime: 60,
        tags: ['sealing', 'weatherproofing']
      },
      
      // Final Cleaning
      {
        text: 'Construction debris removed',
        description: 'All construction waste cleared from site',
        mandatory: true,
        category: 'Cleaning',
        priority: 'high',
        estimatedTime: 240,
        tags: ['cleaning', 'debris']
      },
      {
        text: 'All surfaces cleaned',
        description: 'Floors, walls, windows, fixtures cleaned',
        mandatory: true,
        category: 'Cleaning',
        priority: 'medium',
        estimatedTime: 360,
        tags: ['cleaning', 'final']
      },
      {
        text: 'Final inspection completed',
        description: 'Comprehensive walkthrough with checklist',
        mandatory: true,
        category: 'Inspection',
        priority: 'critical',
        verificationRequired: true,
        estimatedTime: 180,
        tags: ['inspection', 'handover']
      }
    ]
  }
];

// Function to get checklist template by category
export const getChecklistByCategory = (category: string): ChecklistTemplate | undefined => {
  return masterChecklistTemplates.find(template => 
    template.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to get all templates
export const getAllChecklistTemplates = (): ChecklistTemplate[] => {
  return masterChecklistTemplates;
};

// Function to create checklist items from template
export const createChecklistFromTemplate = (templateId: string): ChecklistItem[] => {
  const template = masterChecklistTemplates.find(t => t.id === templateId);
  if (!template) return [];
  
  return template.items.map((item, index) => ({
    ...item,
    id: `${templateId}-${Date.now()}-${index}`,
    completed: false,
    completedDate: undefined,
    completedBy: undefined
  }));
};

// Function to calculate checklist statistics
export const calculateChecklistStats = (items: ChecklistItem[]) => {
  const total = items.length;
  const completed = items.filter(item => item.completed).length;
  const mandatory = items.filter(item => item.mandatory).length;
  const mandatoryCompleted = items.filter(item => item.mandatory && item.completed).length;
  const critical = items.filter(item => item.priority === 'critical').length;
  const criticalCompleted = items.filter(item => item.priority === 'critical' && item.completed).length;
  
  return {
    total,
    completed,
    completionPercentage: total > 0 ? (completed / total) * 100 : 0,
    mandatory,
    mandatoryCompleted,
    mandatoryCompletionPercentage: mandatory > 0 ? (mandatoryCompleted / mandatory) * 100 : 0,
    critical,
    criticalCompleted,
    criticalCompletionPercentage: critical > 0 ? (criticalCompleted / critical) * 100 : 0,
    estimatedTime: items.reduce((sum, item) => sum + (item.estimatedTime || 0), 0),
    actualTime: items.reduce((sum, item) => sum + (item.actualTime || 0), 0)
  };
};

// Function to validate checklist completion
export const validateChecklistCompletion = (items: ChecklistItem[]): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  // Check if all mandatory items are completed
  const incompleteMandatory = items.filter(item => item.mandatory && !item.completed);
  if (incompleteMandatory.length > 0) {
    errors.push(`${incompleteMandatory.length} mandatory items are not completed`);
  }
  
  // Check if all critical items are completed
  const incompleteCritical = items.filter(item => item.priority === 'critical' && !item.completed);
  if (incompleteCritical.length > 0) {
    errors.push(`${incompleteCritical.length} critical items are not completed`);
  }
  
  // Check if verification required items are verified
  const unverified = items.filter(item => item.verificationRequired && item.completed && !item.verifiedBy);
  if (unverified.length > 0) {
    errors.push(`${unverified.length} items require verification`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export categories for UI
export const checklistCategories = [
  { id: 'foundation', name: 'Foundation', color: '#f97316', icon: 'Building2' },
  { id: 'electrical', name: 'Electrical', color: '#c084fc', icon: 'Bolt' },
  { id: 'plumbing', name: 'Plumbing', color: '#14b8a6', icon: 'Droplets' },
  { id: 'planning', name: 'Planning', color: '#e91e63', icon: 'ClipboardList' },
  { id: 'development', name: 'Development', color: '#5b5fc7', icon: 'Hammer' },
  { id: 'finalization', name: 'Finalization', color: '#fbbf24', icon: 'PaintBucket' }
];
// Comprehensive Indian Property and Project Management Data
// Combines real estate properties with project management

export interface IndianPropertyProject {
  // Property Information
  property_id: string;
  property_type: 'Apartment' | 'Villa' | 'Independent House' | 'Penthouse' | 'Row House' | 'Studio' | 'Duplex' | 'Traditional House';
  configuration: string;
  project_name: string;
  builder: string;
  rera_number: string;
  
  // Location Details
  location: {
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    landmarks: string[];
    nearest_metro?: string;
    nearest_railway?: string;
  };
  
  // Property Specifications
  property_details: {
    carpet_area_sqft: number;
    built_up_area_sqft: number;
    super_built_up_area_sqft: number;
    carpet_area_sqm: number;
    floor_number?: number | string;
    total_floors: number;
    facing: string;
    age_of_property: string;
    possession_status: string;
    possession_date?: string;
    furnishing_status: string;
  };
  
  // Pricing
  pricing: {
    total_price: number;
    price_per_sqft: number;
    maintenance_charges: number;
    maintenance_per_sqft: number;
    registration_charges: number;
    gst_applicable: boolean;
    gst_amount?: number;
    negotiable: boolean;
  };
  
  // Project Management Fields
  projectId: string;
  projectCode: string;
  projectStatus: 'initiation' | 'planning' | 'design' | 'construction' | 'completed' | 'on-hold';
  projectPhase: string;
  progress: number;
  
  // Timeline
  startDate: string;
  endDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  
  // Team
  manager: string;
  architect?: string;
  contractor?: string;
  team: string[];
  
  // Tasks & Milestones
  totalTasks: number;
  completedTasks: number;
  activeTasks: number;
  upcomingMilestones: string[];
  
  // Financial
  budget: number;
  spent: number;
  costVariance: number;
  
  // Quality & Safety
  qualityScore: number;
  safetyScore: number;
  inspectionsPassed: number;
  totalInspections: number;
  
  // Risk Management
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  activeRisks: number;
  mitigatedRisks: number;
  
  // Documents
  documentsCount: number;
  pendingApprovals: number;
  
  // Status Indicators
  priority: 'low' | 'medium' | 'high' | 'urgent';
  health: 'good' | 'warning' | 'critical';
  tags: string[];
}

export const indianPropertyProjects: IndianPropertyProject[] = [
  {
    // Luxury Residential Tower - Gurugram
    property_id: 'PROP001',
    property_type: 'Apartment',
    configuration: '3BHK',
    project_name: 'Godrej Platinum Heights',
    builder: 'Godrej Properties Ltd',
    rera_number: 'GRG-RERA-2024-001',
    
    location: {
      address: 'Sector 79, Dwarka Expressway',
      locality: 'Sector 79',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122004',
      landmarks: ['Dwarka Expressway - 0.5 km', 'IGI Airport - 15 km', 'Cyber City - 12 km'],
      nearest_metro: 'Sector 55-56 Metro - 3 km'
    },
    
    property_details: {
      carpet_area_sqft: 1850,
      built_up_area_sqft: 2200,
      super_built_up_area_sqft: 2500,
      carpet_area_sqm: 172,
      floor_number: '15',
      total_floors: 42,
      facing: 'North-East',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'December 2026',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 28500000,
      price_per_sqft: 11400,
      maintenance_charges: 7500,
      maintenance_per_sqft: 3,
      registration_charges: 1710000,
      gst_applicable: true,
      gst_amount: 1425000,
      negotiable: false
    },
    
    // Project Management
    projectId: 'PRJ-GRG-001',
    projectCode: 'GPH-2024',
    projectStatus: 'construction',
    projectPhase: 'Structure Complete - Tower A (25 floors)',
    progress: 58,
    
    startDate: '2023-03-01',
    endDate: '2026-12-31',
    actualStartDate: '2023-03-15',
    
    manager: 'Rajesh Kumar Sharma',
    architect: 'Hafeez Contractor',
    contractor: 'L&T Construction',
    team: ['Site Team A', 'MEP Team', 'Finishing Team'],
    
    totalTasks: 450,
    completedTasks: 261,
    activeTasks: 42,
    upcomingMilestones: ['Tower A - Floor 30', 'MEP Installation Start', 'Sample Flat Ready'],
    
    budget: 4500000000,
    spent: 2610000000,
    costVariance: -2.3,
    
    qualityScore: 92,
    safetyScore: 95,
    inspectionsPassed: 28,
    totalInspections: 30,
    
    riskLevel: 'medium',
    activeRisks: 5,
    mitigatedRisks: 12,
    
    documentsCount: 156,
    pendingApprovals: 3,
    
    priority: 'high',
    health: 'good',
    tags: ['luxury', 'high-rise', 'gated-community', 'premium']
  },
  
  {
    // Villa Project - Bangalore
    property_id: 'PROP002',
    property_type: 'Villa',
    configuration: '4BHK',
    project_name: 'Prestige Silver Oak Villas',
    builder: 'Prestige Constructions',
    rera_number: 'BNG-RERA-2023-089',
    
    location: {
      address: 'Whitefield Main Road',
      locality: 'Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560066',
      landmarks: ['Phoenix Marketcity - 3 km', 'ITPL - 2 km', 'Columbia Asia Hospital - 4 km'],
      nearest_railway: 'Whitefield Railway Station - 2 km'
    },
    
    property_details: {
      carpet_area_sqft: 3200,
      built_up_area_sqft: 3600,
      super_built_up_area_sqft: 4000,
      carpet_area_sqm: 297,
      floor_number: 'Ground + 2',
      total_floors: 3,
      facing: 'East',
      age_of_property: 'New Construction',
      possession_status: 'Ready to Move',
      furnishing_status: 'Semi-Furnished'
    },
    
    pricing: {
      total_price: 42000000,
      price_per_sqft: 10500,
      maintenance_charges: 12000,
      maintenance_per_sqft: 3,
      registration_charges: 2520000,
      gst_applicable: false,
      negotiable: true
    },
    
    projectId: 'PRJ-BNG-002',
    projectCode: 'PSO-2023',
    projectStatus: 'completed',
    projectPhase: 'Handover Phase',
    progress: 95,
    
    startDate: '2021-06-01',
    endDate: '2024-03-31',
    actualStartDate: '2021-06-15',
    actualEndDate: '2024-02-28',
    
    manager: 'Suresh Menon',
    architect: 'RSP Architects',
    contractor: 'Sobha Developers',
    team: ['Villa Team 1', 'Landscape Team', 'Interior Team'],
    
    totalTasks: 320,
    completedTasks: 304,
    activeTasks: 8,
    upcomingMilestones: ['Final Inspection', 'Handover Ceremony'],
    
    budget: 1200000000,
    spent: 1140000000,
    costVariance: 5.0,
    
    qualityScore: 94,
    safetyScore: 98,
    inspectionsPassed: 45,
    totalInspections: 46,
    
    riskLevel: 'low',
    activeRisks: 1,
    mitigatedRisks: 8,
    
    documentsCount: 234,
    pendingApprovals: 1,
    
    priority: 'medium',
    health: 'good',
    tags: ['villa', 'gated-community', 'premium', 'ready-possession']
  },
  
  {
    // Affordable Housing - Mumbai
    property_id: 'PROP003',
    property_type: 'Apartment',
    configuration: '2BHK',
    project_name: 'Lodha Palava City',
    builder: 'Lodha Group',
    rera_number: 'MUM-RERA-2024-045',
    
    location: {
      address: 'Kalyan-Shil Road',
      locality: 'Dombivli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '421204',
      landmarks: ['Xperia Mall - 1 km', 'Lodha World School - 0.5 km', 'Jupiter Hospital - 3 km'],
      nearest_railway: 'Dombivli Station - 8 km'
    },
    
    property_details: {
      carpet_area_sqft: 680,
      built_up_area_sqft: 850,
      super_built_up_area_sqft: 950,
      carpet_area_sqm: 63,
      floor_number: 7,
      total_floors: 15,
      facing: 'West',
      age_of_property: '1 year',
      possession_status: 'Ready to Move',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 6800000,
      price_per_sqft: 7158,
      maintenance_charges: 2850,
      maintenance_per_sqft: 3,
      registration_charges: 408000,
      gst_applicable: false,
      negotiable: true
    },
    
    projectId: 'PRJ-MUM-003',
    projectCode: 'LPC-2024',
    projectStatus: 'completed',
    projectPhase: 'Occupied - 80%',
    progress: 100,
    
    startDate: '2020-01-01',
    endDate: '2023-12-31',
    actualStartDate: '2020-01-15',
    actualEndDate: '2023-11-30',
    
    manager: 'Amit Joshi',
    architect: 'Lodha Design Studio',
    contractor: 'Lodha Construction',
    team: ['Tower C Team', 'Infrastructure Team'],
    
    totalTasks: 280,
    completedTasks: 280,
    activeTasks: 0,
    upcomingMilestones: [],
    
    budget: 3500000000,
    spent: 3450000000,
    costVariance: 1.4,
    
    qualityScore: 88,
    safetyScore: 92,
    inspectionsPassed: 38,
    totalInspections: 40,
    
    riskLevel: 'low',
    activeRisks: 0,
    mitigatedRisks: 15,
    
    documentsCount: 189,
    pendingApprovals: 0,
    
    priority: 'low',
    health: 'good',
    tags: ['affordable', 'township', 'mass-housing']
  },
  
  {
    // Commercial Complex - Delhi
    property_id: 'PROP004',
    property_type: 'Independent House',
    configuration: '5BHK',
    project_name: 'DLF Capital Greens',
    builder: 'DLF Limited',
    rera_number: 'DEL-RERA-2023-112',
    
    location: {
      address: 'Shivaji Marg, Moti Nagar',
      locality: 'Moti Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110015',
      landmarks: ['Kirti Nagar Metro - 1 km', 'DLF Mall - 2 km', 'AIIMS - 5 km'],
      nearest_metro: 'Moti Nagar Metro - 0.5 km'
    },
    
    property_details: {
      carpet_area_sqft: 4500,
      built_up_area_sqft: 5200,
      super_built_up_area_sqft: 5800,
      carpet_area_sqm: 418,
      floor_number: 'Ground + 3',
      total_floors: 4,
      facing: 'South',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'March 2025',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 85000000,
      price_per_sqft: 14655,
      maintenance_charges: 17400,
      maintenance_per_sqft: 3,
      registration_charges: 5950000,
      gst_applicable: true,
      gst_amount: 4250000,
      negotiable: false
    },
    
    projectId: 'PRJ-DEL-004',
    projectCode: 'DCG-2023',
    projectStatus: 'construction',
    projectPhase: 'Interior Work Phase',
    progress: 72,
    
    startDate: '2022-09-01',
    endDate: '2025-03-31',
    actualStartDate: '2022-09-15',
    
    manager: 'Vikram Malhotra',
    architect: 'CP Kukreja Architects',
    contractor: 'DLF Construction',
    team: ['Civil Team', 'MEP Team', 'Interior Team', 'Landscape Team'],
    
    totalTasks: 380,
    completedTasks: 274,
    activeTasks: 35,
    upcomingMilestones: ['Interior Completion', 'External Facade', 'Final Inspection'],
    
    budget: 950000000,
    spent: 684000000,
    costVariance: -1.8,
    
    qualityScore: 93,
    safetyScore: 96,
    inspectionsPassed: 42,
    totalInspections: 44,
    
    riskLevel: 'medium',
    activeRisks: 4,
    mitigatedRisks: 10,
    
    documentsCount: 267,
    pendingApprovals: 2,
    
    priority: 'high',
    health: 'good',
    tags: ['luxury', 'independent-house', 'prime-location']
  },
  
  {
    // IT Park - Pune
    property_id: 'PROP005',
    property_type: 'Studio',
    configuration: 'Studio',
    project_name: 'EON IT Park Phase 4',
    builder: 'Kharadi IT Parks',
    rera_number: 'PUN-RERA-2024-078',
    
    location: {
      address: 'EON Free Zone, Kharadi',
      locality: 'Kharadi',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411014',
      landmarks: ['EON IT Park - 0 km', 'World Trade Center - 2 km', 'Phoenix Mall - 3 km'],
      nearest_railway: 'Pune Station - 10 km'
    },
    
    property_details: {
      carpet_area_sqft: 450,
      built_up_area_sqft: 520,
      super_built_up_area_sqft: 580,
      carpet_area_sqm: 42,
      floor_number: 8,
      total_floors: 15,
      facing: 'North',
      age_of_property: 'New Construction',
      possession_status: 'Under Construction',
      possession_date: 'June 2024',
      furnishing_status: 'Fully Furnished'
    },
    
    pricing: {
      total_price: 3800000,
      price_per_sqft: 6552,
      maintenance_charges: 2900,
      maintenance_per_sqft: 5,
      registration_charges: 228000,
      gst_applicable: true,
      gst_amount: 190000,
      negotiable: false
    },
    
    projectId: 'PRJ-PUN-005',
    projectCode: 'EON-P4-2024',
    projectStatus: 'construction',
    projectPhase: 'MEP Installation',
    progress: 65,
    
    startDate: '2023-01-01',
    endDate: '2024-06-30',
    actualStartDate: '2023-01-10',
    
    manager: 'Prasad Kulkarni',
    architect: 'Studio A Architects',
    contractor: 'Shapoorji Pallonji',
    team: ['Tower 4 Team', 'MEP Specialists'],
    
    totalTasks: 220,
    completedTasks: 143,
    activeTasks: 28,
    upcomingMilestones: ['MEP Complete', 'Interior Fitout', 'Testing & Commissioning'],
    
    budget: 850000000,
    spent: 552500000,
    costVariance: 0.5,
    
    qualityScore: 90,
    safetyScore: 94,
    inspectionsPassed: 25,
    totalInspections: 26,
    
    riskLevel: 'low',
    activeRisks: 2,
    mitigatedRisks: 7,
    
    documentsCount: 145,
    pendingApprovals: 1,
    
    priority: 'medium',
    health: 'good',
    tags: ['studio', 'IT-park', 'co-living', 'furnished']
  },
  
  {
    // Penthouse - Chennai
    property_id: 'PROP006',
    property_type: 'Penthouse',
    configuration: '4BHK',
    project_name: 'The Address Boulevard',
    builder: 'Casagrand Builder',
    rera_number: 'CHN-RERA-2023-234',
    
    location: {
      address: 'OMR Road, Sholinganallur',
      locality: 'Sholinganallur',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600119',
      landmarks: ['Tidel Park - 3 km', 'Apollo Hospital - 2 km', 'VGP Universal Kingdom - 5 km'],
      nearest_railway: 'Chennai Central - 20 km'
    },
    
    property_details: {
      carpet_area_sqft: 3800,
      built_up_area_sqft: 4400,
      super_built_up_area_sqft: 5000,
      carpet_area_sqm: 353,
      floor_number: '28-29',
      total_floors: 29,
      facing: 'Sea Facing',
      age_of_property: '2 years',
      possession_status: 'Ready to Move',
      furnishing_status: 'Semi-Furnished'
    },
    
    pricing: {
      total_price: 65000000,
      price_per_sqft: 13000,
      maintenance_charges: 15000,
      maintenance_per_sqft: 3,
      registration_charges: 4550000,
      gst_applicable: false,
      negotiable: true
    },
    
    projectId: 'PRJ-CHN-006',
    projectCode: 'TAB-2023',
    projectStatus: 'completed',
    projectPhase: 'Maintenance Phase',
    progress: 100,
    
    startDate: '2020-04-01',
    endDate: '2023-03-31',
    actualStartDate: '2020-04-10',
    actualEndDate: '2023-02-28',
    
    manager: 'Kumar Swamy',
    architect: 'FXFOWLE Architects',
    contractor: 'Casagrand Construction',
    team: ['Penthouse Team', 'Premium Finishing Team'],
    
    totalTasks: 420,
    completedTasks: 420,
    activeTasks: 0,
    upcomingMilestones: [],
    
    budget: 1800000000,
    spent: 1755000000,
    costVariance: 2.5,
    
    qualityScore: 96,
    safetyScore: 98,
    inspectionsPassed: 58,
    totalInspections: 58,
    
    riskLevel: 'low',
    activeRisks: 0,
    mitigatedRisks: 18,
    
    documentsCount: 312,
    pendingApprovals: 0,
    
    priority: 'low',
    health: 'good',
    tags: ['penthouse', 'luxury', 'sea-view', 'premium']
  },
  
  {
    // Row House - Ahmedabad
    property_id: 'PROP007',
    property_type: 'Row House',
    configuration: '3BHK',
    project_name: 'Shantigram Villas',
    builder: 'Adani Realty',
    rera_number: 'GUJ-RERA-2024-156',
    
    location: {
      address: 'SG Highway',
      locality: 'Shantigram',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '382421',
      landmarks: ['GIFT City - 5 km', 'Karnavati Club - 3 km', 'SGVP Hospital - 2 km'],
      nearest_railway: 'Ahmedabad Junction - 15 km'
    },
    
    property_details: {
      carpet_area_sqft: 1650,
      built_up_area_sqft: 1950,
      super_built_up_area_sqft: 2200,
      carpet_area_sqm: 153,
      floor_number: 'Ground + 1',
      total_floors: 2,
      facing: 'West',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'September 2024',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 12500000,
      price_per_sqft: 5682,
      maintenance_charges: 4400,
      maintenance_per_sqft: 2,
      registration_charges: 750000,
      gst_applicable: true,
      gst_amount: 625000,
      negotiable: false
    },
    
    projectId: 'PRJ-AHM-007',
    projectCode: 'SGV-2024',
    projectStatus: 'construction',
    projectPhase: 'Structural Work',
    progress: 45,
    
    startDate: '2023-06-01',
    endDate: '2024-09-30',
    actualStartDate: '2023-06-15',
    
    manager: 'Jignesh Patel',
    architect: 'HCP Design',
    contractor: 'Adani Construction',
    team: ['Row House Team', 'Infrastructure Team'],
    
    totalTasks: 250,
    completedTasks: 113,
    activeTasks: 22,
    upcomingMilestones: ['Structure Complete', 'Brickwork', 'Plastering'],
    
    budget: 450000000,
    spent: 202500000,
    costVariance: -0.8,
    
    qualityScore: 89,
    safetyScore: 93,
    inspectionsPassed: 18,
    totalInspections: 20,
    
    riskLevel: 'medium',
    activeRisks: 3,
    mitigatedRisks: 6,
    
    documentsCount: 132,
    pendingApprovals: 2,
    
    priority: 'medium',
    health: 'good',
    tags: ['row-house', 'gated-community', 'township']
  },
  
  {
    // Duplex - Hyderabad
    property_id: 'PROP008',
    property_type: 'Duplex',
    configuration: '3BHK',
    project_name: 'My Home Bhooja',
    builder: 'My Home Constructions',
    rera_number: 'HYD-RERA-2023-445',
    
    location: {
      address: 'Gachibowli-Miyapur Road',
      locality: 'Tellapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '502032',
      landmarks: ['Microsoft Campus - 4 km', 'IKEA - 3 km', 'Inorbit Mall - 5 km'],
      nearest_metro: 'HITEC City Metro - 6 km'
    },
    
    property_details: {
      carpet_area_sqft: 2200,
      built_up_area_sqft: 2600,
      super_built_up_area_sqft: 2950,
      carpet_area_sqm: 204,
      floor_number: '10-11',
      total_floors: 25,
      facing: 'North-East',
      age_of_property: '6 months',
      possession_status: 'Ready to Move',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 18500000,
      price_per_sqft: 6271,
      maintenance_charges: 5900,
      maintenance_per_sqft: 2,
      registration_charges: 1110000,
      gst_applicable: false,
      negotiable: true
    },
    
    projectId: 'PRJ-HYD-008',
    projectCode: 'MHB-2023',
    projectStatus: 'completed',
    projectPhase: 'Handover Complete',
    progress: 100,
    
    startDate: '2021-01-01',
    endDate: '2023-12-31',
    actualStartDate: '2021-01-15',
    actualEndDate: '2023-11-30',
    
    manager: 'Venkat Reddy',
    architect: 'Mindspace Architects',
    contractor: 'My Home Construction Division',
    team: ['Tower B Team', 'Finishing Team'],
    
    totalTasks: 350,
    completedTasks: 350,
    activeTasks: 0,
    upcomingMilestones: [],
    
    budget: 2200000000,
    spent: 2145000000,
    costVariance: 2.5,
    
    qualityScore: 91,
    safetyScore: 95,
    inspectionsPassed: 48,
    totalInspections: 48,
    
    riskLevel: 'low',
    activeRisks: 0,
    mitigatedRisks: 14,
    
    documentsCount: 245,
    pendingApprovals: 0,
    
    priority: 'low',
    health: 'good',
    tags: ['duplex', 'ready-to-move', 'IT-corridor']
  },
  
  {
    // Traditional House - Kochi
    property_id: 'PROP009',
    property_type: 'Traditional House',
    configuration: '4BHK',
    project_name: 'Heritage Homes',
    builder: 'Kerala Traditional Builders',
    rera_number: 'KER-RERA-2024-089',
    
    location: {
      address: 'Marine Drive',
      locality: 'Marine Drive',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682031',
      landmarks: ['Marine Drive Walkway - 0.1 km', 'High Court - 2 km', 'Lulu Mall - 5 km'],
      nearest_railway: 'Ernakulam Junction - 3 km'
    },
    
    property_details: {
      carpet_area_sqft: 3200,
      built_up_area_sqft: 3600,
      super_built_up_area_sqft: 4000,
      carpet_area_sqm: 297,
      floor_number: 'Ground + 1',
      total_floors: 2,
      facing: 'East',
      age_of_property: 'Renovation',
      possession_status: 'Under Construction',
      possession_date: 'August 2024',
      furnishing_status: 'Semi-Furnished'
    },
    
    pricing: {
      total_price: 38000000,
      price_per_sqft: 9500,
      maintenance_charges: 8000,
      maintenance_per_sqft: 2,
      registration_charges: 2660000,
      gst_applicable: true,
      gst_amount: 1900000,
      negotiable: true
    },
    
    projectId: 'PRJ-KOC-009',
    projectCode: 'HH-2024',
    projectStatus: 'construction',
    projectPhase: 'Restoration Work',
    progress: 55,
    
    startDate: '2023-10-01',
    endDate: '2024-08-31',
    actualStartDate: '2023-10-10',
    
    manager: 'George Thomas',
    architect: 'Traditional Architecture Studio',
    contractor: 'Heritage Restoration Pvt Ltd',
    team: ['Restoration Team', 'Carpentry Specialists'],
    
    totalTasks: 180,
    completedTasks: 99,
    activeTasks: 18,
    upcomingMilestones: ['Woodwork Complete', 'Traditional Roofing', 'Interior Restoration'],
    
    budget: 85000000,
    spent: 46750000,
    costVariance: -1.2,
    
    qualityScore: 94,
    safetyScore: 92,
    inspectionsPassed: 22,
    totalInspections: 23,
    
    riskLevel: 'medium',
    activeRisks: 3,
    mitigatedRisks: 5,
    
    documentsCount: 98,
    pendingApprovals: 1,
    
    priority: 'medium',
    health: 'good',
    tags: ['heritage', 'traditional', 'waterfront', 'renovation']
  },
  
  {
    // Mixed Use Development - Kolkata
    property_id: 'PROP010',
    property_type: 'Apartment',
    configuration: '2BHK',
    project_name: 'Forum Atmosphere',
    builder: 'Forum Projects',
    rera_number: 'WB-RERA-2024-234',
    
    location: {
      address: 'EM Bypass',
      locality: 'Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      landmarks: ['Salt Lake Stadium - 2 km', 'City Centre Mall - 1 km', 'Nicco Park - 3 km'],
      nearest_metro: 'Salt Lake Sector V - 1.5 km'
    },
    
    property_details: {
      carpet_area_sqft: 950,
      built_up_area_sqft: 1150,
      super_built_up_area_sqft: 1300,
      carpet_area_sqm: 88,
      floor_number: 12,
      total_floors: 35,
      facing: 'South',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'October 2025',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 8500000,
      price_per_sqft: 6538,
      maintenance_charges: 3900,
      maintenance_per_sqft: 3,
      registration_charges: 595000,
      gst_applicable: true,
      gst_amount: 425000,
      negotiable: false
    },
    
    projectId: 'PRJ-KOL-010',
    projectCode: 'FA-2024',
    projectStatus: 'construction',
    projectPhase: 'Foundation Work',
    progress: 25,
    
    startDate: '2023-12-01',
    endDate: '2025-10-31',
    actualStartDate: '2023-12-15',
    
    manager: 'Subrata Ghosh',
    architect: 'Forum Design Studio',
    contractor: 'Bengal Construction Co',
    team: ['Foundation Team', 'Structure Team'],
    
    totalTasks: 400,
    completedTasks: 100,
    activeTasks: 30,
    upcomingMilestones: ['Foundation Complete', 'Plinth Level', 'Ground Floor Slab'],
    
    budget: 3200000000,
    spent: 800000000,
    costVariance: 0.2,
    
    qualityScore: 87,
    safetyScore: 91,
    inspectionsPassed: 12,
    totalInspections: 14,
    
    riskLevel: 'medium',
    activeRisks: 4,
    mitigatedRisks: 3,
    
    documentsCount: 156,
    pendingApprovals: 3,
    
    priority: 'high',
    health: 'warning',
    tags: ['mixed-use', 'commercial', 'residential', 'mall-integrated']
  }
];

// Helper functions for data access
export const getProjectById = (id: string): IndianPropertyProject | undefined => {
  return indianPropertyProjects.find(project => project.projectId === id);
};

export const getActiveProjects = (): IndianPropertyProject[] => {
  return indianPropertyProjects.filter(project => 
    project.projectStatus === 'construction' || project.projectStatus === 'planning'
  );
};

export const getProjectsByCity = (city: string): IndianPropertyProject[] => {
  return indianPropertyProjects.filter(project => 
    project.location.city.toLowerCase() === city.toLowerCase()
  );
};

export const getHighPriorityProjects = (): IndianPropertyProject[] => {
  return indianPropertyProjects.filter(project => 
    project.priority === 'high' || project.priority === 'urgent'
  );
};

export const getProjectsByStatus = (status: string): IndianPropertyProject[] => {
  return indianPropertyProjects.filter(project => project.projectStatus === status);
};

export const getProjectMetrics = () => {
  const total = indianPropertyProjects.length;
  const active = indianPropertyProjects.filter(p => p.projectStatus === 'construction').length;
  const completed = indianPropertyProjects.filter(p => p.projectStatus === 'completed').length;
  const onHold = indianPropertyProjects.filter(p => p.projectStatus === 'on-hold').length;
  
  const totalBudget = indianPropertyProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = indianPropertyProjects.reduce((sum, p) => sum + p.spent, 0);
  
  const avgProgress = indianPropertyProjects.reduce((sum, p) => sum + p.progress, 0) / total;
  const avgQualityScore = indianPropertyProjects.reduce((sum, p) => sum + p.qualityScore, 0) / total;
  const avgSafetyScore = indianPropertyProjects.reduce((sum, p) => sum + p.safetyScore, 0) / total;
  
  return {
    totalProjects: total,
    activeProjects: active,
    completedProjects: completed,
    onHoldProjects: onHold,
    totalBudget,
    totalSpent,
    budgetUtilization: (totalSpent / totalBudget) * 100,
    averageProgress: avgProgress,
    averageQualityScore: avgQualityScore,
    averageSafetyScore: avgSafetyScore
  };
};

// Export all helper functions
export const indianPropertyHelpers = {
  getProjectById,
  getActiveProjects,
  getProjectsByCity,
  getHighPriorityProjects,
  getProjectsByStatus,
  getProjectMetrics
};
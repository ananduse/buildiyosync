// Tamil/South Indian Property and Project Management Data
// Authentic local names and realistic project details

export interface TamilPropertyProject {
  // Property Information
  property_id: string;
  property_type: 'House' | 'Villa' | 'Apartment' | 'Flat' | 'Plot' | 'Building' | 'Complex' | 'Residency';
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
    nearest_bus_stop?: string;
    nearest_railway?: string;
  };
  
  // Property Specifications
  property_details: {
    carpet_area_sqft: number;
    built_up_area_sqft: number;
    super_built_up_area_sqft: number;
    plot_area_sqft?: number;
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
    registration_charges: number;
    negotiable: boolean;
  };
  
  // Project Management Fields
  projectId: string;
  projectCode: string;
  projectStatus: 'planning' | 'design' | 'construction' | 'completed' | 'on-hold';
  projectPhase: string;
  progress: number;
  
  // Timeline
  startDate: string;
  endDate: string;
  
  // Team
  owner: string;
  architect?: string;
  contractor?: string;
  team: string[];
  
  // Metrics
  totalTasks: number;
  completedTasks: number;
  budget: number;
  spent: number;
  
  // Quality & Safety
  qualityScore: number;
  safetyScore: number;
  
  // Risk Management
  riskLevel: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Status
  health: 'good' | 'warning' | 'critical';
  tags: string[];
}

export const tamilPropertyProjects: TamilPropertyProject[] = [
  {
    property_id: 'TNP001',
    property_type: 'House',
    configuration: '2BHK',
    project_name: 'Ramasamy House',
    builder: 'Ramasamy Constructions',
    rera_number: 'TN/01/Building/2024/0001',
    
    location: {
      address: '15, Pillaiyar Koil Street',
      locality: 'T. Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600017',
      landmarks: ['Pondy Bazaar - 500m', 'Panagal Park - 1km', 'T Nagar Bus Terminus - 800m'],
      nearest_bus_stop: 'T Nagar Bus Stop - 200m',
      nearest_railway: 'Mambalam Station - 1.5km'
    },
    
    property_details: {
      carpet_area_sqft: 1200,
      built_up_area_sqft: 1400,
      super_built_up_area_sqft: 1500,
      plot_area_sqft: 2400,
      floor_number: 'Ground + 1',
      total_floors: 2,
      facing: 'East',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'March 2025',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 15500000,
      price_per_sqft: 10333,
      maintenance_charges: 3000,
      registration_charges: 1085000,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-001',
    projectCode: 'RAM-HSE-2024',
    projectStatus: 'construction',
    projectPhase: 'First Floor Slab Work',
    progress: 65,
    
    startDate: '2024-01-15',
    endDate: '2025-03-31',
    
    owner: 'Mr. P. Ramasamy',
    architect: 'Murugan Associates',
    contractor: 'Velmurugan Builders',
    team: ['Ravi - Site Supervisor', 'Kumar - Mason', 'Selvam - Electrician'],
    
    totalTasks: 120,
    completedTasks: 78,
    budget: 15500000,
    spent: 10075000,
    
    qualityScore: 88,
    safetyScore: 92,
    
    riskLevel: 'low',
    priority: 'high',
    health: 'good',
    tags: ['residential', 'individual-house', 't-nagar', 'east-facing']
  },
  
  {
    property_id: 'TNP002',
    property_type: 'Villa',
    configuration: '3BHK',
    project_name: 'Sundaram Villa',
    builder: 'Sundaram Developers',
    rera_number: 'TN/02/Building/2024/0002',
    
    location: {
      address: '42, MGR Nagar Main Road',
      locality: 'Velachery',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600042',
      landmarks: ['Phoenix MarketCity - 2km', 'Velachery Railway Station - 1km', 'Vijayanagar Bus Terminus - 500m'],
      nearest_bus_stop: 'MGR Nagar Bus Stop - 100m',
      nearest_railway: 'Velachery MRTS - 1km'
    },
    
    property_details: {
      carpet_area_sqft: 1850,
      built_up_area_sqft: 2100,
      super_built_up_area_sqft: 2400,
      plot_area_sqft: 3200,
      floor_number: 'Ground + 2',
      total_floors: 3,
      facing: 'North',
      age_of_property: '6 months',
      possession_status: 'Ready to Move',
      possession_date: 'Immediate',
      furnishing_status: 'Semi-Furnished'
    },
    
    pricing: {
      total_price: 24000000,
      price_per_sqft: 10000,
      maintenance_charges: 4500,
      registration_charges: 1680000,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-002',
    projectCode: 'SUN-VIL-2024',
    projectStatus: 'completed',
    projectPhase: 'Handover Phase',
    progress: 100,
    
    startDate: '2023-06-01',
    endDate: '2024-11-30',
    
    owner: 'Mr. K. Sundaram',
    architect: 'Lakshmi Design Studio',
    contractor: 'Murugan Construction',
    team: ['Balu - Project Manager', 'Senthil - Site Engineer'],
    
    totalTasks: 180,
    completedTasks: 180,
    budget: 24000000,
    spent: 23500000,
    
    qualityScore: 92,
    safetyScore: 95,
    
    riskLevel: 'low',
    priority: 'medium',
    health: 'good',
    tags: ['villa', 'ready-to-move', 'velachery', 'premium']
  },
  
  {
    property_id: 'TNP003',
    property_type: 'Apartment',
    configuration: '2BHK',
    project_name: 'Moorthy Apartments',
    builder: 'Moorthy & Sons Builders',
    rera_number: 'TN/03/Building/2024/0003',
    
    location: {
      address: '78, Kamaraj Avenue',
      locality: 'Adyar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600020',
      landmarks: ['IIT Madras - 3km', 'Adyar Signal - 1km', 'Sathyam Cinemas - 2km'],
      nearest_bus_stop: 'Adyar Gate - 300m',
      nearest_railway: 'Kasturba Nagar MRTS - 1.5km'
    },
    
    property_details: {
      carpet_area_sqft: 950,
      built_up_area_sqft: 1100,
      super_built_up_area_sqft: 1250,
      floor_number: 3,
      total_floors: 5,
      facing: 'South',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'June 2025',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 11250000,
      price_per_sqft: 9000,
      maintenance_charges: 3750,
      registration_charges: 787500,
      negotiable: false
    },
    
    projectId: 'PRJ-TN-003',
    projectCode: 'MTY-APT-2024',
    projectStatus: 'construction',
    projectPhase: 'Third Floor Construction',
    progress: 55,
    
    startDate: '2024-02-01',
    endDate: '2025-06-30',
    
    owner: 'Mr. S. Moorthy',
    architect: 'Vinayagar Architects',
    contractor: 'Saravana Builders',
    team: ['Ganesh - Supervisor', 'Muthu - Foreman', 'Raju - Safety Officer'],
    
    totalTasks: 150,
    completedTasks: 83,
    budget: 45000000,
    spent: 24750000,
    
    qualityScore: 86,
    safetyScore: 90,
    
    riskLevel: 'medium',
    priority: 'high',
    health: 'good',
    tags: ['apartment', 'mid-segment', 'adyar', 'under-construction']
  },
  
  {
    property_id: 'TNP004',
    property_type: 'Residency',
    configuration: '4BHK',
    project_name: 'Gopal Residency',
    builder: 'Gopal Estates Pvt Ltd',
    rera_number: 'TN/04/Building/2024/0004',
    
    location: {
      address: '5, Beach Road',
      locality: 'Besant Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600090',
      landmarks: ['Elliot Beach - 500m', 'Ashtalakshmi Temple - 1km', 'Besant Nagar Bus Depot - 800m'],
      nearest_bus_stop: 'Beach Road Junction - 200m',
      nearest_railway: 'Thiruvanmiyur MRTS - 2km'
    },
    
    property_details: {
      carpet_area_sqft: 2800,
      built_up_area_sqft: 3200,
      super_built_up_area_sqft: 3600,
      floor_number: 'Penthouse',
      total_floors: 12,
      facing: 'Sea Facing',
      age_of_property: '2 years',
      possession_status: 'Ready to Move',
      possession_date: 'Immediate',
      furnishing_status: 'Fully Furnished'
    },
    
    pricing: {
      total_price: 54000000,
      price_per_sqft: 15000,
      maintenance_charges: 10800,
      registration_charges: 3780000,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-004',
    projectCode: 'GPL-RES-2022',
    projectStatus: 'completed',
    projectPhase: 'Occupied',
    progress: 100,
    
    startDate: '2021-03-01',
    endDate: '2023-09-30',
    
    owner: 'Mr. R. Gopal',
    architect: 'Coastal Designs',
    contractor: 'Marine Constructions',
    team: ['Suresh - Facility Manager'],
    
    totalTasks: 250,
    completedTasks: 250,
    budget: 180000000,
    spent: 175000000,
    
    qualityScore: 95,
    safetyScore: 98,
    
    riskLevel: 'low',
    priority: 'low',
    health: 'good',
    tags: ['luxury', 'sea-facing', 'penthouse', 'besant-nagar']
  },
  
  {
    property_id: 'TNP005',
    property_type: 'Complex',
    configuration: 'Multiple Units',
    project_name: 'Murugan Complex',
    builder: 'Murugan Properties',
    rera_number: 'TN/05/Building/2024/0005',
    
    location: {
      address: '120, GST Road',
      locality: 'Chromepet',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600044',
      landmarks: ['Chromepet Railway Station - 500m', 'MIT College - 2km', 'Chennai Airport - 8km'],
      nearest_bus_stop: 'Chromepet Bus Stand - 300m',
      nearest_railway: 'Chromepet Station - 500m'
    },
    
    property_details: {
      carpet_area_sqft: 800,
      built_up_area_sqft: 950,
      super_built_up_area_sqft: 1100,
      floor_number: '1-4',
      total_floors: 4,
      facing: 'East',
      age_of_property: 'New',
      possession_status: 'Under Construction',
      possession_date: 'December 2024',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 7700000,
      price_per_sqft: 7000,
      maintenance_charges: 2200,
      registration_charges: 539000,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-005',
    projectCode: 'MRG-CPX-2024',
    projectStatus: 'construction',
    projectPhase: 'Finishing Work',
    progress: 80,
    
    startDate: '2023-08-01',
    endDate: '2024-12-31',
    
    owner: 'Mr. V. Murugan',
    architect: 'Tamil Architects',
    contractor: 'Chromepet Builders',
    team: ['Karthik - Site Manager', 'Velu - Supervisor'],
    
    totalTasks: 200,
    completedTasks: 160,
    budget: 65000000,
    spent: 52000000,
    
    qualityScore: 85,
    safetyScore: 88,
    
    riskLevel: 'low',
    priority: 'medium',
    health: 'good',
    tags: ['complex', 'affordable', 'chromepet', 'multi-unit']
  },
  
  {
    property_id: 'TNP006',
    property_type: 'Villa',
    configuration: '5BHK',
    project_name: 'Krishnan Villa Estate',
    builder: 'Krishnan Developers',
    rera_number: 'TN/06/Building/2024/0006',
    
    location: {
      address: '88, ECR Link Road',
      locality: 'Neelankarai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600115',
      landmarks: ['VGP Beach Resort - 3km', 'Mayajaal - 5km', 'ECR Beach - 1km'],
      nearest_bus_stop: 'Neelankarai Bus Stop - 400m',
      nearest_railway: 'Velachery Railway Station - 6km'
    },
    
    property_details: {
      carpet_area_sqft: 4200,
      built_up_area_sqft: 4800,
      super_built_up_area_sqft: 5500,
      plot_area_sqft: 8000,
      floor_number: 'Ground + 2',
      total_floors: 3,
      facing: 'North-East',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'September 2025',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 82500000,
      price_per_sqft: 15000,
      maintenance_charges: 16500,
      registration_charges: 5775000,
      negotiable: false
    },
    
    projectId: 'PRJ-TN-006',
    projectCode: 'KRV-EST-2024',
    projectStatus: 'construction',
    projectPhase: 'Foundation Work',
    progress: 25,
    
    startDate: '2024-06-01',
    endDate: '2025-09-30',
    
    owner: 'Mr. T. Krishnan',
    architect: 'ECR Architects',
    contractor: 'Coastal Builders',
    team: ['Anand - Project Director', 'Ramesh - Chief Engineer', 'Prakash - Quality Head'],
    
    totalTasks: 280,
    completedTasks: 70,
    budget: 82500000,
    spent: 20625000,
    
    qualityScore: 90,
    safetyScore: 93,
    
    riskLevel: 'medium',
    priority: 'high',
    health: 'good',
    tags: ['luxury-villa', 'ecr', 'beach-proximity', 'premium']
  },
  
  {
    property_id: 'TNP007',
    property_type: 'Flat',
    configuration: '1BHK',
    project_name: 'Subramani Flats',
    builder: 'Subramani Constructions',
    rera_number: 'TN/07/Building/2024/0007',
    
    location: {
      address: '23, Bazaar Street',
      locality: 'Tambaram',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600045',
      landmarks: ['Tambaram Railway Station - 1km', 'Tambaram Sanatorium - 2km', 'GST Road - 500m'],
      nearest_bus_stop: 'Tambaram Bus Stand - 600m',
      nearest_railway: 'Tambaram Station - 1km'
    },
    
    property_details: {
      carpet_area_sqft: 550,
      built_up_area_sqft: 650,
      super_built_up_area_sqft: 750,
      floor_number: 2,
      total_floors: 3,
      facing: 'West',
      age_of_property: 'Ready to Move',
      possession_status: 'Ready to Move',
      possession_date: 'Immediate',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 4125000,
      price_per_sqft: 5500,
      maintenance_charges: 1500,
      registration_charges: 288750,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-007',
    projectCode: 'SUB-FLT-2024',
    projectStatus: 'completed',
    projectPhase: 'Completed',
    progress: 100,
    
    startDate: '2023-01-01',
    endDate: '2024-03-31',
    
    owner: 'Mr. P. Subramani',
    architect: 'Local Architects',
    contractor: 'Tambaram Builders',
    team: ['Mani - Supervisor'],
    
    totalTasks: 100,
    completedTasks: 100,
    budget: 12000000,
    spent: 11500000,
    
    qualityScore: 82,
    safetyScore: 85,
    
    riskLevel: 'low',
    priority: 'low',
    health: 'good',
    tags: ['affordable', 'ready-flat', 'tambaram', 'budget']
  },
  
  {
    property_id: 'TNP008',
    property_type: 'House',
    configuration: '3BHK',
    project_name: 'Natarajan House',
    builder: 'Natarajan Builders',
    rera_number: 'TN/08/Building/2024/0008',
    
    location: {
      address: '67, Temple Street',
      locality: 'Mylapore',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600004',
      landmarks: ['Kapaleeshwar Temple - 300m', 'San Thome Church - 2km', 'Marina Beach - 3km'],
      nearest_bus_stop: 'Mylapore Tank - 200m',
      nearest_railway: 'Mandaveli MRTS - 1.5km'
    },
    
    property_details: {
      carpet_area_sqft: 1600,
      built_up_area_sqft: 1850,
      super_built_up_area_sqft: 2000,
      plot_area_sqft: 2500,
      floor_number: 'Ground + 1',
      total_floors: 2,
      facing: 'East',
      age_of_property: 'Renovation',
      possession_status: 'Under Renovation',
      possession_date: 'April 2025',
      furnishing_status: 'Semi-Furnished'
    },
    
    pricing: {
      total_price: 32000000,
      price_per_sqft: 16000,
      maintenance_charges: 4000,
      registration_charges: 2240000,
      negotiable: false
    },
    
    projectId: 'PRJ-TN-008',
    projectCode: 'NAT-HSE-2024',
    projectStatus: 'construction',
    projectPhase: 'Renovation Work',
    progress: 45,
    
    startDate: '2024-01-01',
    endDate: '2025-04-30',
    
    owner: 'Mr. M. Natarajan',
    architect: 'Heritage Architects',
    contractor: 'Traditional Builders',
    team: ['Sekar - Renovation Expert', 'Durai - Carpenter'],
    
    totalTasks: 90,
    completedTasks: 41,
    budget: 8000000,
    spent: 3600000,
    
    qualityScore: 89,
    safetyScore: 91,
    
    riskLevel: 'low',
    priority: 'medium',
    health: 'good',
    tags: ['heritage', 'renovation', 'mylapore', 'traditional']
  },
  
  {
    property_id: 'TNP009',
    property_type: 'Building',
    configuration: 'Commercial + Residential',
    project_name: 'Kannan Towers',
    builder: 'Kannan Group',
    rera_number: 'TN/09/Building/2024/0009',
    
    location: {
      address: '200, Mount Road',
      locality: 'Anna Salai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600002',
      landmarks: ['Express Avenue Mall - 1km', 'Government Estate - 500m', 'US Consulate - 2km'],
      nearest_bus_stop: 'Anna Salai - 100m',
      nearest_railway: 'Chennai Central - 3km'
    },
    
    property_details: {
      carpet_area_sqft: 1200,
      built_up_area_sqft: 1400,
      super_built_up_area_sqft: 1600,
      floor_number: '5-15',
      total_floors: 20,
      facing: 'North',
      age_of_property: 'Under Construction',
      possession_status: 'Under Construction',
      possession_date: 'March 2026',
      furnishing_status: 'Unfurnished'
    },
    
    pricing: {
      total_price: 19200000,
      price_per_sqft: 12000,
      maintenance_charges: 4800,
      registration_charges: 1344000,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-009',
    projectCode: 'KAN-TWR-2024',
    projectStatus: 'construction',
    projectPhase: 'Structure Work - 10th Floor',
    progress: 35,
    
    startDate: '2024-01-01',
    endDate: '2026-03-31',
    
    owner: 'Kannan Group of Companies',
    architect: 'Metropolitan Architects',
    contractor: 'L&T Construction',
    team: ['Vijay - Project Head', 'Rahman - Site Manager', 'Joseph - Safety Manager'],
    
    totalTasks: 400,
    completedTasks: 140,
    budget: 850000000,
    spent: 297500000,
    
    qualityScore: 91,
    safetyScore: 94,
    
    riskLevel: 'medium',
    priority: 'high',
    health: 'good',
    tags: ['mixed-use', 'commercial', 'high-rise', 'anna-salai']
  },
  
  {
    property_id: 'TNP010',
    property_type: 'Plot',
    configuration: 'Residential Plot',
    project_name: 'Selvam Garden',
    builder: 'Selvam Developers',
    rera_number: 'TN/10/Building/2024/0010',
    
    location: {
      address: 'Survey No. 45/2',
      locality: 'Padappai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '601301',
      landmarks: ['Padappai Bus Stand - 2km', 'Chennai-Bangalore Highway - 1km', 'Oragadam - 8km'],
      nearest_bus_stop: 'Padappai Junction - 2km',
      nearest_railway: 'Tambaram Railway Station - 15km'
    },
    
    property_details: {
      plot_area_sqft: 2400,
      facing: 'South',
      age_of_property: 'New',
      possession_status: 'Ready',
      possession_date: 'Immediate',
      furnishing_status: 'NA'
    },
    
    pricing: {
      total_price: 3600000,
      price_per_sqft: 1500,
      maintenance_charges: 0,
      registration_charges: 252000,
      negotiable: true
    },
    
    projectId: 'PRJ-TN-010',
    projectCode: 'SEL-PLT-2024',
    projectStatus: 'completed',
    projectPhase: 'Plot Development Complete',
    progress: 100,
    
    startDate: '2023-06-01',
    endDate: '2024-06-30',
    
    owner: 'Mr. A. Selvam',
    architect: 'NA',
    contractor: 'Plot Development Team',
    team: ['Kumar - Survey Team'],
    
    totalTasks: 30,
    completedTasks: 30,
    budget: 50000000,
    spent: 48000000,
    
    qualityScore: 85,
    safetyScore: 90,
    
    riskLevel: 'low',
    priority: 'low',
    health: 'good',
    tags: ['plot', 'ready', 'padappai', 'investment']
  }
];

// Helper functions
export const getTamilProjectById = (id: string): TamilPropertyProject | undefined => {
  return tamilPropertyProjects.find(project => project.projectId === id);
};

export const getActiveProjects = (): TamilPropertyProject[] => {
  return tamilPropertyProjects.filter(project => 
    project.projectStatus === 'construction' || project.projectStatus === 'planning'
  );
};

export const getProjectsByCity = (city: string): TamilPropertyProject[] => {
  return tamilPropertyProjects.filter(project => 
    project.location.city.toLowerCase() === city.toLowerCase()
  );
};

export const getProjectsByOwner = (owner: string): TamilPropertyProject[] => {
  return tamilPropertyProjects.filter(project => 
    project.owner.toLowerCase().includes(owner.toLowerCase())
  );
};

export const getProjectStats = () => {
  const total = tamilPropertyProjects.length;
  const active = tamilPropertyProjects.filter(p => p.projectStatus === 'construction').length;
  const completed = tamilPropertyProjects.filter(p => p.projectStatus === 'completed').length;
  
  const totalBudget = tamilPropertyProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = tamilPropertyProjects.reduce((sum, p) => sum + p.spent, 0);
  
  return {
    totalProjects: total,
    activeProjects: active,
    completedProjects: completed,
    totalBudget,
    totalSpent,
    averageProgress: tamilPropertyProjects.reduce((sum, p) => sum + p.progress, 0) / total
  };
};
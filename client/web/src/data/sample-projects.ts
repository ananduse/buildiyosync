export interface SampleProject {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  team: string[];
  client: string;
  location: string;
  category: string;
  tags: string[];
}

export const sampleProjects: SampleProject[] = [
  {
    id: 'P001',
    name: 'Sunrise Tower Complex',
    description: 'Luxury residential tower with 42 floors including amenities and commercial spaces',
    status: 'active',
    priority: 'high',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2025-06-30',
    budget: 850000000,
    spent: 552500000,
    manager: 'Rajesh Kumar',
    team: ['Team Alpha', 'Team Delta'],
    client: 'Sunrise Developers Ltd',
    location: 'Mumbai, Maharashtra',
    category: 'Residential',
    tags: ['high-rise', 'luxury', 'mixed-use']
  },
  {
    id: 'P002',
    name: 'Tech Park Phase 2',
    description: 'Modern IT park with sustainable design and smart building features',
    status: 'active',
    priority: 'high',
    progress: 45,
    startDate: '2024-03-01',
    endDate: '2025-09-30',
    budget: 650000000,
    spent: 292500000,
    manager: 'Priya Sharma',
    team: ['Team Beta', 'Team Gamma'],
    client: 'InfoTech Infrastructure',
    location: 'Bangalore, Karnataka',
    category: 'Commercial',
    tags: ['IT-park', 'green-building', 'LEED-certified']
  },
  {
    id: 'P003',
    name: 'Green Valley Villas',
    description: 'Eco-friendly villa community with 120 units and recreational facilities',
    status: 'active',
    priority: 'medium',
    progress: 78,
    startDate: '2023-11-01',
    endDate: '2025-02-28',
    budget: 420000000,
    spent: 327600000,
    manager: 'Arun Patel',
    team: ['Team Sigma'],
    client: 'Green Homes Pvt Ltd',
    location: 'Pune, Maharashtra',
    category: 'Residential',
    tags: ['villas', 'gated-community', 'eco-friendly']
  },
  {
    id: 'P004',
    name: 'City Hospital Expansion',
    description: 'Adding new wing with 200 beds and advanced medical facilities',
    status: 'planning',
    priority: 'high',
    progress: 15,
    startDate: '2024-06-01',
    endDate: '2026-03-31',
    budget: 580000000,
    spent: 87000000,
    manager: 'Dr. Sunita Reddy',
    team: ['Team Omega'],
    client: 'City Healthcare Group',
    location: 'Chennai, Tamil Nadu',
    category: 'Healthcare',
    tags: ['hospital', 'healthcare', 'expansion']
  },
  {
    id: 'P005',
    name: 'Metro Mall Renovation',
    description: 'Complete renovation and modernization of existing shopping complex',
    status: 'active',
    priority: 'medium',
    progress: 52,
    startDate: '2024-02-15',
    endDate: '2024-11-30',
    budget: 180000000,
    spent: 93600000,
    manager: 'Vikram Singh',
    team: ['Team Zeta'],
    client: 'Metro Retail Corporation',
    location: 'Delhi NCR',
    category: 'Commercial',
    tags: ['renovation', 'retail', 'mall']
  },
  {
    id: 'P006',
    name: 'Industrial Warehouse Complex',
    description: 'Large-scale warehousing facility with automated storage systems',
    status: 'active',
    priority: 'medium',
    progress: 38,
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    budget: 320000000,
    spent: 121600000,
    manager: 'Suresh Nair',
    team: ['Team Eta'],
    client: 'LogiSpace Industries',
    location: 'Ahmedabad, Gujarat',
    category: 'Industrial',
    tags: ['warehouse', 'logistics', 'automation']
  },
  {
    id: 'P007',
    name: 'Riverfront Promenade',
    description: 'Public infrastructure project with walking paths, gardens, and recreational areas',
    status: 'completed',
    priority: 'low',
    progress: 100,
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    budget: 150000000,
    spent: 145000000,
    manager: 'Anjali Mehta',
    team: ['Team Theta'],
    client: 'Municipal Corporation',
    location: 'Surat, Gujarat',
    category: 'Infrastructure',
    tags: ['public-space', 'infrastructure', 'recreational']
  },
  {
    id: 'P008',
    name: 'Smart School Campus',
    description: 'Modern educational facility with smart classrooms and sports complex',
    status: 'active',
    priority: 'high',
    progress: 60,
    startDate: '2024-01-01',
    endDate: '2025-04-30',
    budget: 280000000,
    spent: 168000000,
    manager: 'Prof. Ravi Krishnan',
    team: ['Team Iota'],
    client: 'Education Foundation Trust',
    location: 'Hyderabad, Telangana',
    category: 'Educational',
    tags: ['school', 'education', 'smart-campus']
  },
  {
    id: 'P009',
    name: 'Luxury Beach Resort',
    description: 'Premium beachfront resort with 150 rooms and world-class amenities',
    status: 'on-hold',
    priority: 'low',
    progress: 25,
    startDate: '2024-02-01',
    endDate: '2025-12-31',
    budget: 450000000,
    spent: 112500000,
    manager: 'Deepak Joshi',
    team: ['Team Kappa'],
    client: 'Coastal Resorts International',
    location: 'Goa',
    category: 'Hospitality',
    tags: ['resort', 'luxury', 'beachfront']
  },
  {
    id: 'P010',
    name: 'Township Infrastructure',
    description: 'Complete infrastructure development for new residential township',
    status: 'active',
    priority: 'high',
    progress: 42,
    startDate: '2023-10-01',
    endDate: '2025-09-30',
    budget: 920000000,
    spent: 386400000,
    manager: 'Amit Saxena',
    team: ['Team Lambda', 'Team Mu'],
    client: 'Urban Development Authority',
    location: 'Noida, Uttar Pradesh',
    category: 'Infrastructure',
    tags: ['township', 'infrastructure', 'mixed-development']
  },
  {
    id: 'P011',
    name: 'Heritage Hotel Restoration',
    description: 'Restoration and conversion of heritage building into boutique hotel',
    status: 'active',
    priority: 'medium',
    progress: 55,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    budget: 220000000,
    spent: 121000000,
    manager: 'Kavita Desai',
    team: ['Team Nu'],
    client: 'Heritage Hotels Group',
    location: 'Jaipur, Rajasthan',
    category: 'Hospitality',
    tags: ['heritage', 'restoration', 'boutique-hotel']
  },
  {
    id: 'P012',
    name: 'Data Center Facility',
    description: 'Tier-4 data center with advanced cooling and security systems',
    status: 'active',
    priority: 'high',
    progress: 70,
    startDate: '2023-12-01',
    endDate: '2024-10-31',
    budget: 480000000,
    spent: 336000000,
    manager: 'Tech Lead Team',
    team: ['Team Xi'],
    client: 'CloudServe Technologies',
    location: 'Pune, Maharashtra',
    category: 'Technology',
    tags: ['data-center', 'tier-4', 'technology']
  },
  {
    id: 'P013',
    name: 'Sports Complex',
    description: 'Multi-sport facility with stadium, indoor courts, and training centers',
    status: 'planning',
    priority: 'medium',
    progress: 8,
    startDate: '2024-07-01',
    endDate: '2026-06-30',
    budget: 680000000,
    spent: 54400000,
    manager: 'Coach Raj Kumar',
    team: ['Team Omicron'],
    client: 'State Sports Authority',
    location: 'Bhopal, Madhya Pradesh',
    category: 'Sports',
    tags: ['sports', 'stadium', 'training-facility']
  },
  {
    id: 'P014',
    name: 'Airport Terminal Expansion',
    description: 'New terminal building with increased capacity and modern facilities',
    status: 'active',
    priority: 'high',
    progress: 35,
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    budget: 1500000000,
    spent: 525000000,
    manager: 'Aviation Authority',
    team: ['Team Pi', 'Team Rho'],
    client: 'Airport Authority of India',
    location: 'Kolkata, West Bengal',
    category: 'Infrastructure',
    tags: ['airport', 'terminal', 'infrastructure']
  },
  {
    id: 'P015',
    name: 'Affordable Housing Project',
    description: 'Government-backed affordable housing with 500 units for economically weaker sections',
    status: 'active',
    priority: 'high',
    progress: 48,
    startDate: '2023-09-01',
    endDate: '2025-03-31',
    budget: 350000000,
    spent: 168000000,
    manager: 'Social Housing Team',
    team: ['Team Sigma', 'Team Tau'],
    client: 'State Housing Board',
    location: 'Lucknow, Uttar Pradesh',
    category: 'Residential',
    tags: ['affordable-housing', 'government-project', 'social-housing']
  }
];

export const getProjectById = (id: string): SampleProject | undefined => {
  return sampleProjects.find(project => project.id === id);
};

export const getActiveProjects = (): SampleProject[] => {
  return sampleProjects.filter(project => project.status === 'active');
};

export const getProjectsByCategory = (category: string): SampleProject[] => {
  return sampleProjects.filter(project => project.category === category);
};

export const getProjectsByManager = (manager: string): SampleProject[] => {
  return sampleProjects.filter(project => project.manager === manager);
};

export const getHighPriorityProjects = (): SampleProject[] => {
  return sampleProjects.filter(project => project.priority === 'high');
};
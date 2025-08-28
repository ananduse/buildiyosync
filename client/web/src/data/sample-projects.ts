// Integrated Indian Property and Project Management Data
import { indianPropertyProjects, IndianPropertyProject } from './indian-property-projects';

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
  // Extended fields for integration
  projectCode?: string;
  projectType?: string;
  currentPhase?: string;
  nextMilestone?: string;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  qualityScore?: number;
  safetyScore?: number;
}

// Transform Indian Property Projects to Sample Projects format
const transformToSampleProject = (property: IndianPropertyProject): SampleProject => {
  // Map project status
  const getStatus = (status: string): 'active' | 'completed' | 'on-hold' | 'planning' => {
    switch(status) {
      case 'construction': return 'active';
      case 'completed': return 'completed';
      case 'on-hold': return 'on-hold';
      case 'initiation':
      case 'planning':
      case 'design': return 'planning';
      default: return 'active';
    }
  };

  // Map priority
  const getPriority = (priority: string): 'high' | 'medium' | 'low' => {
    switch(priority) {
      case 'urgent':
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  };

  // Format location
  const formatLocation = (location: any): string => {
    return `${location.locality}, ${location.city}, ${location.state}`;
  };

  return {
    id: property.projectId,
    name: property.project_name,
    description: `${property.configuration} ${property.property_type} - ${property.property_details.super_built_up_area_sqft} sqft`,
    status: getStatus(property.projectStatus),
    priority: getPriority(property.priority),
    progress: property.progress,
    startDate: property.startDate,
    endDate: property.endDate,
    budget: property.budget,
    spent: property.spent,
    manager: property.manager,
    team: property.team,
    client: property.builder,
    location: formatLocation(property.location),
    category: property.property_type,
    tags: property.tags,
    // Extended fields
    projectCode: property.projectCode,
    projectType: property.property_type,
    currentPhase: property.projectPhase,
    nextMilestone: property.upcomingMilestones?.[0],
    riskLevel: property.riskLevel,
    qualityScore: property.qualityScore,
    safetyScore: property.safetyScore
  };
};

// Transform Indian property projects
const transformedProjects: SampleProject[] = indianPropertyProjects.map(transformToSampleProject);

// Additional hardcoded projects for variety
const additionalProjects: SampleProject[] = [
  {
    id: 'P011',
    name: 'Metro Rail Extension Project',
    description: 'Extension of metro line connecting airport to city center',
    status: 'active',
    priority: 'high',
    progress: 42,
    startDate: '2023-07-01',
    endDate: '2026-06-30',
    budget: 12500000000,
    spent: 5250000000,
    manager: 'Rail Development Authority',
    team: ['Infrastructure Team', 'Rail Systems Team', 'Station Development Team'],
    client: 'State Metro Corporation',
    location: 'Multiple Locations, Mumbai',
    category: 'Infrastructure',
    tags: ['metro', 'public-transport', 'infrastructure', 'government'],
    projectCode: 'MRL-2023',
    projectType: 'Infrastructure',
    currentPhase: 'Tunneling Work',
    nextMilestone: 'Tunnel Boring Complete',
    riskLevel: 'high',
    qualityScore: 90,
    safetyScore: 94
  },
  {
    id: 'P012',
    name: 'Smart City Command Center',
    description: 'Integrated command and control center for smart city operations',
    status: 'planning',
    priority: 'medium',
    progress: 15,
    startDate: '2024-04-01',
    endDate: '2025-12-31',
    budget: 450000000,
    spent: 67500000,
    manager: 'Smart City Mission',
    team: ['IT Infrastructure Team', 'Systems Integration Team'],
    client: 'Municipal Corporation',
    location: 'CBD, Navi Mumbai',
    category: 'Technology',
    tags: ['smart-city', 'IoT', 'command-center', 'government'],
    projectCode: 'SCC-2024',
    projectType: 'Technology',
    currentPhase: 'Design & Architecture',
    nextMilestone: 'Technical Specifications Approval',
    riskLevel: 'medium',
    qualityScore: 0,
    safetyScore: 0
  },
  {
    id: 'P013',
    name: 'International Convention Center',
    description: 'World-class convention center with 5000+ seating capacity',
    status: 'active',
    priority: 'high',
    progress: 68,
    startDate: '2022-10-01',
    endDate: '2024-09-30',
    budget: 2800000000,
    spent: 1904000000,
    manager: 'Convention Center Authority',
    team: ['Main Construction Team', 'Acoustic Team', 'Interior Design Team'],
    client: 'State Tourism Department',
    location: 'HITEC City, Hyderabad',
    category: 'Commercial',
    tags: ['convention-center', 'commercial', 'tourism', 'events'],
    projectCode: 'ICC-2022',
    projectType: 'Commercial',
    currentPhase: 'Interior Finishing',
    nextMilestone: 'Acoustic Treatment Complete',
    riskLevel: 'medium',
    qualityScore: 93,
    safetyScore: 96
  },
  {
    id: 'P014',
    name: 'Riverfront Development Phase 2',
    description: 'Beautification and development of 10km riverfront stretch',
    status: 'active',
    priority: 'medium',
    progress: 35,
    startDate: '2023-11-01',
    endDate: '2025-03-31',
    budget: 850000000,
    spent: 297500000,
    manager: 'Urban Development Authority',
    team: ['Landscape Team', 'Civil Works Team', 'Lighting Team'],
    client: 'State Government',
    location: 'Sabarmati Riverfront, Ahmedabad',
    category: 'Infrastructure',
    tags: ['riverfront', 'public-space', 'urban-development', 'beautification'],
    projectCode: 'RFD-P2-2023',
    projectType: 'Infrastructure',
    currentPhase: 'Embankment Construction',
    nextMilestone: 'Promenade Section 1 Complete',
    riskLevel: 'low',
    qualityScore: 88,
    safetyScore: 91
  },
  {
    id: 'P015',
    name: 'Multi-Specialty Hospital Complex',
    description: '500-bed hospital with advanced medical facilities',
    status: 'active',
    priority: 'high',
    progress: 52,
    startDate: '2023-01-01',
    endDate: '2025-06-30',
    budget: 3600000000,
    spent: 1872000000,
    manager: 'Healthcare Infrastructure Ltd',
    team: ['Hospital Construction Team', 'Medical Systems Team', 'MEP Specialists'],
    client: 'Apollo Hospitals Group',
    location: 'Whitefield, Bangalore',
    category: 'Healthcare',
    tags: ['hospital', 'healthcare', 'medical', 'multi-specialty'],
    projectCode: 'AHC-2023',
    projectType: 'Healthcare',
    currentPhase: 'MEP Installation',
    nextMilestone: 'OT Complex Ready',
    riskLevel: 'medium',
    qualityScore: 95,
    safetyScore: 97
  }
];

// Combine all projects
const allProjects = [...transformedProjects, ...additionalProjects];

// Main export - use allProjects as sampleProjects for compatibility
export const sampleProjects = allProjects;

// Export helper functions
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

export const getProjectsByLocation = (location: string): SampleProject[] => {
  return sampleProjects.filter(project => 
    project.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getProjectStats = () => {
  const total = sampleProjects.length;
  const active = sampleProjects.filter(p => p.status === 'active').length;
  const completed = sampleProjects.filter(p => p.status === 'completed').length;
  const planning = sampleProjects.filter(p => p.status === 'planning').length;
  const onHold = sampleProjects.filter(p => p.status === 'on-hold').length;
  
  const totalBudget = sampleProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = sampleProjects.reduce((sum, p) => sum + p.spent, 0);
  
  const categories = [...new Set(sampleProjects.map(p => p.category))];
  const locations = [...new Set(sampleProjects.map(p => p.location.split(',')[1]?.trim()))].filter(Boolean);
  
  return {
    total,
    active,
    completed,
    planning,
    onHold,
    totalBudget,
    totalSpent,
    budgetUtilization: (totalSpent / totalBudget) * 100,
    categories,
    locations,
    averageProgress: sampleProjects.reduce((sum, p) => sum + p.progress, 0) / total
  };
};
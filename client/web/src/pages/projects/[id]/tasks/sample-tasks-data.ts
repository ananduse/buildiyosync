import { format, addDays } from 'date-fns';

interface Assignee {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  department?: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface WorkLogEntry {
  id: string;
  userId: string;
  userName: string;
  date: string;
  hours: number;
  description: string;
}

interface Task {
  id: string;
  taskCode: string;
  title: string;
  description: string;
  type: 'task' | 'milestone' | 'subtask' | 'bug' | 'feature' | 'epic';
  status: 'todo' | 'in-progress' | 'in-review' | 'blocked' | 'completed' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    department: string;
  };
  reporter: {
    id: string;
    name: string;
    avatar: string;
  };
  startDate: string;
  dueDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  estimatedHours: number;
  actualHours: number;
  remainingHours: number;
  progress: number;
  dependencies: string[];
  blockedBy: string[];
  blocks: string[];
  subtasks: Task[];
  parentId?: string;
  tags: string[];
  attachments: number;
  comments: Comment[];
  watchers: string[];
  customFields: Record<string, any>;
  workLog: WorkLogEntry[];
  checklist: ChecklistItem[];
  budget: {
    estimated: number;
    actual: number;
    currency: string;
  };
  risk: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  effort: number;
  sprint?: string;
  epic?: string;
}

// Helper function to create a complete task with all required fields
const createTask = (partial: Partial<Task> & { id: string; title: string }): Task => {
  return {
    id: partial.id,
    taskCode: partial.taskCode || `TASK-${partial.id}`,
    title: partial.title,
    description: partial.description || '',
    type: partial.type || 'task',
    status: partial.status || 'todo',
    priority: partial.priority || 'medium',
    assignee: partial.assignee || {
      id: 'user-1',
      name: 'John Doe',
      avatar: '',
      role: 'Developer',
      department: 'Engineering'
    },
    reporter: partial.reporter || {
      id: 'user-2',
      name: 'Jane Smith',
      avatar: ''
    },
    startDate: partial.startDate || format(new Date(), 'yyyy-MM-dd'),
    dueDate: partial.dueDate || format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    actualStartDate: partial.actualStartDate,
    actualEndDate: partial.actualEndDate,
    estimatedHours: partial.estimatedHours || 8,
    actualHours: partial.actualHours || 0,
    remainingHours: partial.remainingHours || 8,
    progress: partial.progress || 0,
    dependencies: partial.dependencies || [],
    blockedBy: partial.blockedBy || [],
    blocks: partial.blocks || [],
    subtasks: partial.subtasks || [],
    parentId: partial.parentId,
    tags: partial.tags || [],
    attachments: partial.attachments || 0,
    comments: partial.comments || [],
    watchers: partial.watchers || [],
    customFields: partial.customFields || {},
    workLog: partial.workLog || [],
    checklist: partial.checklist || [],
    budget: partial.budget || {
      estimated: 0,
      actual: 0,
      currency: 'USD'
    },
    risk: partial.risk || 'low',
    impact: partial.impact || 'medium',
    effort: partial.effort || 1,
    sprint: partial.sprint,
    epic: partial.epic
  };
};

export const generateSampleTasks = (): Task[] => {
  const today = new Date();
  
  return [
    // ==================== PHASE 1: SITE PREPARATION & FOUNDATION ====================
    createTask({
      id: 'phase-1',
      taskCode: 'PHASE-001',
      title: '📍 PHASE 1: SITE PREPARATION & FOUNDATION',
      description: 'Complete all site preparation and foundation work',
      status: 'completed',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '', role: 'Project Manager', department: 'Construction' },
      reporter: { id: 'user-admin', name: 'Admin', avatar: '' },
      startDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -15), 'yyyy-MM-dd'),
      actualStartDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      actualEndDate: format(addDays(today, -15), 'yyyy-MM-dd'),
      estimatedHours: 720,
      actualHours: 700,
      remainingHours: 0,
      progress: 100,
      tags: ['phase-1', 'foundation', 'milestone'],
      impact: 'critical',
      risk: 'low',
      effort: 30,
      budget: { estimated: 250000, actual: 245000, currency: 'USD' }
    }),
    {
      id: 'task-001',
      taskCode: 'SITE-001',
      title: 'Site Clearance and Demolition',
      description: 'Clear existing structures and prepare site',
      status: 'completed',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-2', name: 'Sarah Chen', avatar: '' },
      startDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -42), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['site-prep', 'demolition'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-002',
      taskCode: 'SITE-002',
      title: 'Site Survey and Layout Marking',
      description: 'Complete topographical survey and mark boundaries',
      status: 'completed',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-3', name: 'Tom Wilson', avatar: '' },
      startDate: format(addDays(today, -42), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -39), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['survey', 'layout'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-003',
      taskCode: 'FNDN-001',
      title: 'Excavation and Earth Work',
      description: 'Excavate foundation area to required depth',
      status: 'completed',
      priority: 'critical',
      type: 'epic',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '' },
      startDate: format(addDays(today, -39), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -33), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['excavation', 'earthwork'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-004',
      taskCode: 'FNDN-002',
      title: 'Foundation Steel Work',
      description: 'Install reinforcement steel for foundation',
      status: 'completed',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-4', name: 'Alex Kumar', avatar: '' },
      startDate: format(addDays(today, -33), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -28), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['steel-work', 'reinforcement'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-005',
      taskCode: 'FNDN-003',
      title: 'Foundation Concrete Pouring',
      description: 'Pour concrete for foundation and footings',
      status: 'completed',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-5', name: 'James Brown', avatar: '' },
      startDate: format(addDays(today, -28), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -24), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['concrete', 'foundation'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-006',
      taskCode: 'FNDN-004',
      title: 'Foundation Waterproofing',
      description: 'Apply waterproofing membrane to foundation',
      status: 'completed',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-6', name: 'Lisa Anderson', avatar: '' },
      startDate: format(addDays(today, -24), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -20), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['waterproofing', 'foundation'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-007',
      taskCode: 'FNDN-005',
      title: 'Backfilling and Compaction',
      description: 'Backfill foundation and compact soil',
      status: 'completed',
      priority: 'medium',
      type: 'task',
      assignee: { id: 'user-7', name: 'David Park', avatar: '' },
      startDate: format(addDays(today, -20), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -15), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['backfill', 'compaction'],
      comments: [],
      attachments: [],
      subtasks: []
    },

    // ==================== PHASE 2: STRUCTURAL FRAMEWORK ====================
    {
      id: 'phase-2',
      taskCode: 'PHASE-002',
      title: '🏗️ PHASE 2: STRUCTURAL FRAMEWORK',
      description: 'Complete structural framework for all floors',
      status: 'in-progress',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '' },
      startDate: format(addDays(today, -15), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      progress: 65,
      tags: ['phase-2', 'structure', 'milestone'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-008',
      taskCode: 'STRC-001',
      title: 'Ground Floor Columns',
      description: 'Cast reinforced concrete columns for ground floor',
      status: 'completed',
      priority: 'critical',
      type: 'epic',
      assignee: { id: 'user-2', name: 'Sarah Chen', avatar: '' },
      startDate: format(addDays(today, -15), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -8), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['columns', 'ground-floor', 'structure'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-009',
      taskCode: 'STRC-002',
      title: 'Ground Floor Slab',
      description: 'Pour concrete slab for ground floor',
      status: 'completed',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-8', name: 'Robert Wilson', avatar: '' },
      startDate: format(addDays(today, -8), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -3), 'yyyy-MM-dd'),
      progress: 100,
      tags: ['slab', 'ground-floor', 'concrete'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-010',
      taskCode: 'STRC-003',
      title: 'First Floor Columns',
      description: 'Cast columns for first floor structure',
      status: 'in-progress',
      priority: 'critical',
      type: 'epic',
      assignee: { id: 'user-2', name: 'Sarah Chen', avatar: '' },
      startDate: format(addDays(today, -3), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 4), 'yyyy-MM-dd'),
      progress: 75,
      tags: ['columns', 'first-floor', 'structure'],
      comments: [
        { id: 'c1', userId: 'user-1', userName: 'Mike Johnson', content: '12 of 16 columns completed', timestamp: format(today, 'yyyy-MM-dd HH:mm:ss'), avatar: '' }
      ],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-011',
      taskCode: 'STRC-004',
      title: 'First Floor Beam Work',
      description: 'Install beams for first floor',
      status: 'in-progress',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-9', name: 'Emily Davis', avatar: '' },
      startDate: format(addDays(today, 2), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 8), 'yyyy-MM-dd'),
      progress: 30,
      tags: ['beams', 'first-floor', 'structure'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-012',
      taskCode: 'STRC-005',
      title: 'First Floor Slab Preparation',
      description: 'Prepare formwork and reinforcement for slab',
      status: 'todo',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-10', name: 'Chris Martinez', avatar: '' },
      startDate: format(addDays(today, 8), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 12), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['slab-prep', 'first-floor', 'formwork'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-013',
      taskCode: 'STRC-006',
      title: 'First Floor Slab Concrete',
      description: 'Pour concrete for first floor slab',
      status: 'todo',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '' },
      startDate: format(addDays(today, 12), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 15), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['slab', 'first-floor', 'concrete', 'milestone'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-014',
      taskCode: 'STRC-007',
      title: 'Staircase Construction',
      description: 'Build main staircase structure',
      status: 'in-progress',
      priority: 'medium',
      type: 'task',
      assignee: { id: 'user-11', name: 'Karen Lee', avatar: '' },
      startDate: format(addDays(today, -2), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 10), 'yyyy-MM-dd'),
      progress: 40,
      tags: ['staircase', 'structure'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-015',
      taskCode: 'STRC-008',
      title: 'Second Floor Columns',
      description: 'Cast columns for second floor',
      status: 'todo',
      priority: 'critical',
      type: 'epic',
      assignee: { id: 'user-2', name: 'Sarah Chen', avatar: '' },
      startDate: format(addDays(today, 15), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['columns', 'second-floor', 'structure'],
      comments: [],
      attachments: [],
      subtasks: []
    },

    // ==================== PHASE 3: MEP INSTALLATIONS ====================
    {
      id: 'phase-3',
      taskCode: 'PHASE-003',
      title: '⚡ PHASE 3: MEP INSTALLATIONS',
      description: 'Mechanical, Electrical, and Plumbing installations',
      status: 'in-progress',
      priority: 'high',
      type: 'milestone',
      assignee: { id: 'user-12', name: 'Paul Thompson', avatar: '' },
      startDate: format(addDays(today, -5), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      progress: 25,
      tags: ['phase-3', 'mep', 'milestone'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-016',
      taskCode: 'ELEC-001',
      title: 'Electrical Conduit - Ground Floor',
      description: 'Install electrical conduits and junction boxes',
      status: 'in-progress',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-13', name: 'Nancy White', avatar: '' },
      startDate: format(addDays(today, -5), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 5), 'yyyy-MM-dd'),
      progress: 60,
      tags: ['electrical', 'conduit', 'ground-floor'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-017',
      taskCode: 'PLMB-001',
      title: 'Water Supply Piping',
      description: 'Install main water supply lines',
      status: 'in-progress',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-14', name: 'George Hall', avatar: '' },
      startDate: format(addDays(today, -3), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 7), 'yyyy-MM-dd'),
      progress: 45,
      tags: ['plumbing', 'water-supply'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-018',
      taskCode: 'PLMB-002',
      title: 'Drainage System Installation',
      description: 'Install drainage and sewage pipes',
      status: 'in-progress',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-14', name: 'George Hall', avatar: '' },
      startDate: format(addDays(today, -2), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 8), 'yyyy-MM-dd'),
      progress: 35,
      tags: ['plumbing', 'drainage'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-019',
      taskCode: 'HVAC-001',
      title: 'HVAC Ducting Design',
      description: 'Complete HVAC ducting design and approval',
      status: 'in-review',
      priority: 'medium',
      type: 'task',
      assignee: { id: 'user-15', name: 'Diana Ross', avatar: '' },
      startDate: format(addDays(today, -1), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 3), 'yyyy-MM-dd'),
      progress: 80,
      tags: ['hvac', 'design', 'ducting'],
      comments: [
        { id: 'c2', userId: 'user-12', userName: 'Paul Thompson', content: 'Minor revisions needed for floor 2', timestamp: format(today, 'yyyy-MM-dd HH:mm:ss'), avatar: '' }
      ],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-020',
      taskCode: 'HVAC-002',
      title: 'HVAC Equipment Installation',
      description: 'Install HVAC units and equipment',
      status: 'todo',
      priority: 'high',
      type: 'epic',
      assignee: { id: 'user-15', name: 'Diana Ross', avatar: '' },
      startDate: format(addDays(today, 10), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['hvac', 'equipment', 'installation'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-021',
      taskCode: 'FIRE-001',
      title: 'Fire Safety System',
      description: 'Install fire detection and suppression system',
      status: 'blocked',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-16', name: 'Frank Miller', avatar: '' },
      startDate: format(addDays(today, 5), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 15), 'yyyy-MM-dd'),
      progress: 10,
      tags: ['fire-safety', 'mep', 'blocked'],
      comments: [
        { id: 'c3', userId: 'user-1', userName: 'Mike Johnson', content: 'Waiting for fire department approval', timestamp: format(today, 'yyyy-MM-dd HH:mm:ss'), avatar: '' }
      ],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-022',
      taskCode: 'ELEC-002',
      title: 'Main Electrical Panel',
      description: 'Install main electrical distribution panel',
      status: 'todo',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-13', name: 'Nancy White', avatar: '' },
      startDate: format(addDays(today, 8), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 12), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['electrical', 'panel', 'distribution'],
      comments: [],
      attachments: [],
      subtasks: []
    },

    // ==================== PHASE 4: EXTERIOR & ROOFING ====================
    {
      id: 'phase-4',
      taskCode: 'PHASE-004',
      title: '🏠 PHASE 4: EXTERIOR & ROOFING',
      description: 'Complete exterior walls and roofing',
      status: 'todo',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '' },
      startDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 45), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['phase-4', 'exterior', 'roofing', 'milestone'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-023',
      taskCode: 'EXTW-001',
      title: 'Exterior Wall - East Side',
      description: 'Build exterior brick walls for east side',
      status: 'todo',
      priority: 'high',
      type: 'epic',
      assignee: { id: 'user-17', name: 'Helen Garcia', avatar: '' },
      startDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 28), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['exterior-walls', 'masonry', 'east-side'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-024',
      taskCode: 'EXTW-002',
      title: 'Exterior Wall - West Side',
      description: 'Build exterior brick walls for west side',
      status: 'todo',
      priority: 'high',
      type: 'epic',
      assignee: { id: 'user-17', name: 'Helen Garcia', avatar: '' },
      startDate: format(addDays(today, 22), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['exterior-walls', 'masonry', 'west-side'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-025',
      taskCode: 'ROOF-001',
      title: 'Roof Structure Installation',
      description: 'Install roof trusses and structural framework',
      status: 'todo',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-18', name: 'Ian Cooper', avatar: '' },
      startDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 35), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['roofing', 'structure', 'milestone'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-026',
      taskCode: 'ROOF-002',
      title: 'Roof Waterproofing',
      description: 'Apply waterproofing membrane to roof',
      status: 'todo',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-18', name: 'Ian Cooper', avatar: '' },
      startDate: format(addDays(today, 35), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 38), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['roofing', 'waterproofing'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-027',
      taskCode: 'ROOF-003',
      title: 'Roof Tiles Installation',
      description: 'Install roof tiles and finishing',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      assignee: { id: 'user-18', name: 'Ian Cooper', avatar: '' },
      startDate: format(addDays(today, 38), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 45), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['roofing', 'tiles', 'finishing'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-028',
      taskCode: 'EXTW-003',
      title: 'Window Installation',
      description: 'Install windows in all exterior walls',
      status: 'todo',
      priority: 'high',
      type: 'epic',
      assignee: { id: 'user-19', name: 'Julia Adams', avatar: '' },
      startDate: format(addDays(today, 32), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 40), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['windows', 'exterior', 'installation'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-029',
      taskCode: 'EXTW-004',
      title: 'External Door Installation',
      description: 'Install main entrance and emergency exit doors',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      assignee: { id: 'user-19', name: 'Julia Adams', avatar: '' },
      startDate: format(addDays(today, 35), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 38), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['doors', 'exterior', 'installation'],
      comments: [],
      attachments: [],
      subtasks: []
    },

    // ==================== ONGOING TASKS ====================
    {
      id: 'task-030',
      taskCode: 'QLTY-001',
      title: '🔍 Quality Control Inspections',
      description: 'Regular quality control and testing',
      status: 'in-progress',
      priority: 'high',
      type: 'task',
      assignee: { id: 'user-20', name: 'Kevin Turner', avatar: '' },
      startDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 60), 'yyyy-MM-dd'),
      progress: 40,
      tags: ['quality', 'inspection', 'ongoing'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-031',
      taskCode: 'SFTY-001',
      title: '⚠️ Safety Compliance',
      description: 'Ensure safety standards and compliance',
      status: 'in-progress',
      priority: 'critical',
      type: 'task',
      assignee: { id: 'user-21', name: 'Laura Phillips', avatar: '' },
      startDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 60), 'yyyy-MM-dd'),
      progress: 45,
      tags: ['safety', 'compliance', 'ongoing'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-032',
      taskCode: 'DOCS-001',
      title: '📄 Documentation & As-Built Drawings',
      description: 'Maintain project documentation and drawings',
      status: 'in-progress',
      priority: 'medium',
      type: 'task',
      assignee: { id: 'user-22', name: 'Mark Stevens', avatar: '' },
      startDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 60), 'yyyy-MM-dd'),
      progress: 35,
      tags: ['documentation', 'drawings', 'ongoing'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-033',
      taskCode: 'ELEV-001',
      title: '🛗 Elevator Installation',
      description: 'Install elevator system and shaft',
      status: 'blocked',
      priority: 'high',
      type: 'epic',
      assignee: { id: 'user-23', name: 'Oliver Brown', avatar: '' },
      startDate: format(addDays(today, 10), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 25), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['elevator', 'mep', 'blocked'],
      comments: [
        { id: 'c4', userId: 'user-1', userName: 'Mike Johnson', content: 'Pending structural approval for shaft modifications', timestamp: format(today, 'yyyy-MM-dd HH:mm:ss'), avatar: '' }
      ],
      attachments: [],
      subtasks: []
    },

    // ==================== UPCOMING MILESTONES ====================
    {
      id: 'task-034',
      taskCode: 'MLST-001',
      title: '🎯 Structural Completion',
      description: 'Complete all structural work',
      status: 'todo',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '' },
      startDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['milestone', 'structure', 'critical-path'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-035',
      taskCode: 'MLST-002',
      title: '🎯 MEP Rough-in Complete',
      description: 'Complete all MEP rough-in work',
      status: 'todo',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-12', name: 'Paul Thompson', avatar: '' },
      startDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['milestone', 'mep', 'critical-path'],
      comments: [],
      attachments: [],
      subtasks: []
    },
    {
      id: 'task-036',
      taskCode: 'MLST-003',
      title: '🎯 Building Weathertight',
      description: 'Building envelope complete and weathertight',
      status: 'todo',
      priority: 'critical',
      type: 'milestone',
      assignee: { id: 'user-1', name: 'Mike Johnson', avatar: '' },
      startDate: format(addDays(today, 45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 45), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['milestone', 'exterior', 'critical-path'],
      comments: [],
      attachments: [],
      subtasks: []
    }
  ];
};
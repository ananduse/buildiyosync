import { format, addDays } from 'date-fns';

// Simplified sample tasks that work with the existing Task interface
export const generateSampleTasks = () => {
  const today = new Date();
  
  // Helper to create a complete task with all required fields
  const createTask = (id: string, title: string, overrides: any = {}) => ({
    id,
    taskCode: overrides.taskCode || `TASK-${id}`,
    title,
    description: overrides.description || '',
    type: overrides.type || 'task',
    status: overrides.status || 'todo',
    priority: overrides.priority || 'medium',
    assignee: overrides.assignee || {
      id: 'user-1',
      name: 'Mike Johnson',
      avatar: '',
      role: 'Project Manager',
      department: 'Construction'
    },
    reporter: {
      id: 'user-admin',
      name: 'System Admin',
      avatar: ''
    },
    startDate: overrides.startDate || format(today, 'yyyy-MM-dd'),
    dueDate: overrides.dueDate || format(addDays(today, 7), 'yyyy-MM-dd'),
    actualStartDate: overrides.actualStartDate,
    actualEndDate: overrides.actualEndDate,
    estimatedHours: overrides.estimatedHours || 40,
    actualHours: overrides.actualHours || 0,
    remainingHours: overrides.remainingHours || 40,
    progress: overrides.progress || 0,
    dependencies: overrides.dependencies || [],
    blockedBy: overrides.blockedBy || [],
    blocks: overrides.blocks || [],
    subtasks: overrides.subtasks || [],
    parentId: overrides.parentId,
    tags: overrides.tags || [],
    attachments: overrides.attachments || 0,
    comments: overrides.comments || [],
    watchers: overrides.watchers || [],
    customFields: overrides.customFields || {},
    workLog: overrides.workLog || [],
    checklist: overrides.checklist || [],
    budget: overrides.budget || {
      estimated: 10000,
      actual: 0,
      currency: 'USD'
    },
    risk: overrides.risk || 'low',
    impact: overrides.impact || 'medium',
    effort: overrides.effort || 1,
    sprint: overrides.sprint,
    epic: overrides.epic
  });

  const tasks = [
    // ========== COMPLETED TASKS (Past) ==========
    createTask('1', 'Site Clearance and Demolition', {
      taskCode: 'SITE-001',
      description: 'Clear existing structures and prepare site for construction',
      type: 'milestone',
      status: 'completed',
      priority: 'critical',
      startDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -40), 'yyyy-MM-dd'),
      actualStartDate: format(addDays(today, -45), 'yyyy-MM-dd'),
      actualEndDate: format(addDays(today, -40), 'yyyy-MM-dd'),
      progress: 100,
      actualHours: 40,
      remainingHours: 0,
      tags: ['site-prep', 'phase-1'],
      budget: { estimated: 50000, actual: 48000, currency: 'USD' },
      impact: 'critical'
    }),

    createTask('2', 'Site Survey and Layout', {
      taskCode: 'SITE-002',
      description: 'Complete topographical survey and site layout marking',
      status: 'completed',
      priority: 'high',
      startDate: format(addDays(today, -40), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -35), 'yyyy-MM-dd'),
      progress: 100,
      actualHours: 24,
      remainingHours: 0,
      tags: ['survey', 'planning'],
      assignee: { id: 'user-2', name: 'Sarah Chen', avatar: '', role: 'Site Engineer', department: 'Engineering' }
    }),

    createTask('3', 'Foundation Excavation', {
      taskCode: 'FNDN-001',
      description: 'Excavate foundation area to required depth',
      type: 'epic',
      status: 'completed',
      priority: 'critical',
      startDate: format(addDays(today, -35), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -25), 'yyyy-MM-dd'),
      progress: 100,
      actualHours: 80,
      remainingHours: 0,
      tags: ['foundation', 'excavation'],
      budget: { estimated: 75000, actual: 72000, currency: 'USD' }
    }),

    createTask('4', 'Foundation Concrete Pour', {
      taskCode: 'FNDN-002',
      description: 'Pour concrete for foundation and footings',
      type: 'milestone',
      status: 'completed',
      priority: 'critical',
      startDate: format(addDays(today, -25), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -20), 'yyyy-MM-dd'),
      progress: 100,
      actualHours: 48,
      remainingHours: 0,
      tags: ['foundation', 'concrete'],
      impact: 'critical',
      assignee: { id: 'user-3', name: 'Tom Wilson', avatar: '', role: 'Concrete Specialist', department: 'Construction' }
    }),

    // ========== IN PROGRESS TASKS (Current) ==========
    createTask('5', 'Ground Floor Columns', {
      taskCode: 'STRC-001',
      description: 'Cast reinforced concrete columns for ground floor',
      type: 'epic',
      status: 'in-progress',
      priority: 'critical',
      startDate: format(addDays(today, -10), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 5), 'yyyy-MM-dd'),
      progress: 75,
      estimatedHours: 120,
      actualHours: 90,
      remainingHours: 30,
      tags: ['structure', 'columns', 'ground-floor'],
      budget: { estimated: 150000, actual: 112500, currency: 'USD' },
      impact: 'high',
      assignee: { id: 'user-2', name: 'Sarah Chen', avatar: '', role: 'Structural Engineer', department: 'Engineering' }
    }),

    createTask('6', 'First Floor Slab Preparation', {
      taskCode: 'STRC-002',
      description: 'Prepare formwork and reinforcement for first floor slab',
      status: 'in-progress',
      priority: 'high',
      startDate: format(addDays(today, -5), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 10), 'yyyy-MM-dd'),
      progress: 40,
      estimatedHours: 80,
      actualHours: 32,
      remainingHours: 48,
      tags: ['structure', 'slab', 'first-floor'],
      assignee: { id: 'user-4', name: 'James Brown', avatar: '', role: 'Site Supervisor', department: 'Construction' }
    }),

    createTask('7', 'Electrical Conduit Installation', {
      taskCode: 'ELEC-001',
      description: 'Install electrical conduits and junction boxes for ground floor',
      status: 'in-progress',
      priority: 'high',
      startDate: format(addDays(today, -3), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 7), 'yyyy-MM-dd'),
      progress: 60,
      estimatedHours: 60,
      actualHours: 36,
      remainingHours: 24,
      tags: ['electrical', 'mep'],
      assignee: { id: 'user-5', name: 'Robert Wilson', avatar: '', role: 'Electrical Engineer', department: 'MEP' }
    }),

    createTask('8', 'Plumbing Rough-in', {
      taskCode: 'PLMB-001',
      description: 'Install water supply and drainage pipes',
      status: 'in-progress',
      priority: 'medium',
      startDate: format(addDays(today, -2), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 12), 'yyyy-MM-dd'),
      progress: 30,
      estimatedHours: 80,
      actualHours: 24,
      remainingHours: 56,
      tags: ['plumbing', 'mep'],
      assignee: { id: 'user-6', name: 'Emily Davis', avatar: '', role: 'Plumbing Engineer', department: 'MEP' }
    }),

    // ========== IN REVIEW TASKS ==========
    createTask('9', 'HVAC Design Approval', {
      taskCode: 'HVAC-001',
      description: 'Review and approve HVAC ducting design for all floors',
      status: 'in-review',
      priority: 'medium',
      startDate: format(addDays(today, -1), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 3), 'yyyy-MM-dd'),
      progress: 80,
      estimatedHours: 20,
      actualHours: 16,
      remainingHours: 4,
      tags: ['hvac', 'design', 'review'],
      assignee: { id: 'user-7', name: 'Chris Martinez', avatar: '', role: 'HVAC Engineer', department: 'MEP' },
      comments: [
        {
          id: 'c1',
          userId: 'user-1',
          userName: 'Mike Johnson',
          content: 'Minor revisions needed in floor 3 layout',
          timestamp: format(today, 'yyyy-MM-dd HH:mm:ss'),
          avatar: ''
        }
      ]
    }),

    // ========== BLOCKED TASKS ==========
    createTask('10', 'Fire Safety System Installation', {
      taskCode: 'FIRE-001',
      description: 'Install fire detection and suppression system',
      status: 'blocked',
      priority: 'critical',
      startDate: format(addDays(today, 5), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 15), 'yyyy-MM-dd'),
      progress: 10,
      tags: ['fire-safety', 'mep', 'blocked'],
      blockedBy: ['regulatory-approval'],
      risk: 'high',
      impact: 'critical',
      assignee: { id: 'user-8', name: 'Paul Thompson', avatar: '', role: 'Safety Engineer', department: 'Safety' },
      comments: [
        {
          id: 'c2',
          userId: 'user-1',
          userName: 'Mike Johnson',
          content: 'Waiting for fire department approval',
          timestamp: format(today, 'yyyy-MM-dd HH:mm:ss'),
          avatar: ''
        }
      ]
    }),

    createTask('11', 'Elevator Shaft Construction', {
      taskCode: 'ELEV-001',
      description: 'Construct elevator shaft and machine room',
      type: 'epic',
      status: 'blocked',
      priority: 'high',
      startDate: format(addDays(today, 10), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      progress: 0,
      tags: ['elevator', 'vertical-transport', 'blocked'],
      blockedBy: ['structural-approval'],
      risk: 'medium',
      assignee: { id: 'user-9', name: 'Nancy White', avatar: '', role: 'Structural Engineer', department: 'Engineering' }
    }),

    // ========== UPCOMING TASKS (Future) ==========
    createTask('12', 'Roof Structure Installation', {
      taskCode: 'ROOF-001',
      description: 'Install roof trusses and structural framework',
      type: 'milestone',
      status: 'todo',
      priority: 'critical',
      startDate: format(addDays(today, 20), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 30), 'yyyy-MM-dd'),
      progress: 0,
      estimatedHours: 120,
      tags: ['roofing', 'structure', 'milestone'],
      dependencies: ['5', '6'],
      impact: 'critical',
      budget: { estimated: 200000, actual: 0, currency: 'USD' }
    }),

    createTask('13', 'Exterior Wall Construction', {
      taskCode: 'EXTW-001',
      description: 'Build exterior brick walls for all sides',
      type: 'epic',
      status: 'todo',
      priority: 'high',
      startDate: format(addDays(today, 15), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 35), 'yyyy-MM-dd'),
      progress: 0,
      estimatedHours: 160,
      tags: ['exterior', 'walls', 'masonry'],
      dependencies: ['5'],
      budget: { estimated: 180000, actual: 0, currency: 'USD' }
    }),

    createTask('14', 'Window Installation', {
      taskCode: 'WIND-001',
      description: 'Install windows in all exterior walls',
      status: 'todo',
      priority: 'medium',
      startDate: format(addDays(today, 35), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 45), 'yyyy-MM-dd'),
      progress: 0,
      estimatedHours: 80,
      tags: ['windows', 'exterior'],
      dependencies: ['13']
    }),

    createTask('15', 'Interior Wall Framing', {
      taskCode: 'INTW-001',
      description: 'Frame interior walls and partitions',
      status: 'todo',
      priority: 'medium',
      startDate: format(addDays(today, 25), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 40), 'yyyy-MM-dd'),
      progress: 0,
      estimatedHours: 100,
      tags: ['interior', 'framing'],
      dependencies: ['6']
    }),

    // ========== CALENDAR VIEW TASKS (Spread across dates) ==========
    createTask('16', 'Weekly Safety Inspection', {
      taskCode: 'SFTY-001',
      description: 'Conduct comprehensive safety inspection',
      status: 'todo',
      priority: 'critical',
      startDate: format(addDays(today, 1), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 1), 'yyyy-MM-dd'),
      estimatedHours: 4,
      tags: ['safety', 'inspection'],
      assignee: { id: 'user-10', name: 'Ian Cooper', avatar: '', role: 'Safety Officer', department: 'Safety' }
    }),

    createTask('17', 'Progress Meeting', {
      taskCode: 'MGMT-001',
      description: 'Weekly progress review meeting',
      status: 'todo',
      priority: 'high',
      startDate: format(addDays(today, 2), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 2), 'yyyy-MM-dd'),
      estimatedHours: 2,
      tags: ['meeting', 'management']
    }),

    createTask('18', 'Concrete Testing', {
      taskCode: 'QLTY-001',
      description: 'Test concrete samples for strength',
      status: 'todo',
      priority: 'high',
      startDate: format(addDays(today, 3), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 3), 'yyyy-MM-dd'),
      estimatedHours: 6,
      tags: ['quality', 'testing'],
      assignee: { id: 'user-11', name: 'Helen Garcia', avatar: '', role: 'Quality Engineer', department: 'QA' }
    }),

    createTask('19', 'Structural Inspection', {
      taskCode: 'INSP-001',
      description: 'Inspect completed structural work',
      status: 'todo',
      priority: 'critical',
      startDate: format(addDays(today, 4), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 4), 'yyyy-MM-dd'),
      estimatedHours: 8,
      tags: ['inspection', 'structure']
    }),

    createTask('20', 'Material Delivery', {
      taskCode: 'MATL-001',
      description: 'Receive steel reinforcement delivery',
      status: 'todo',
      priority: 'high',
      startDate: format(addDays(today, 6), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 6), 'yyyy-MM-dd'),
      estimatedHours: 3,
      tags: ['materials', 'delivery']
    })
  ];

  // Add some subtasks to a few main tasks
  tasks[4].subtasks = [
    createTask('5-1', 'Column Reinforcement', {
      taskCode: 'STRC-001-1',
      parentId: '5',
      type: 'subtask',
      status: 'completed',
      priority: 'high',
      startDate: format(addDays(today, -10), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -5), 'yyyy-MM-dd'),
      progress: 100,
      actualHours: 40,
      remainingHours: 0,
      tags: ['reinforcement']
    }),
    createTask('5-2', 'Column Formwork', {
      taskCode: 'STRC-001-2',
      parentId: '5',
      type: 'subtask',
      status: 'completed',
      priority: 'high',
      startDate: format(addDays(today, -8), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, -3), 'yyyy-MM-dd'),
      progress: 100,
      actualHours: 30,
      remainingHours: 0,
      tags: ['formwork']
    }),
    createTask('5-3', 'Column Concrete Pour', {
      taskCode: 'STRC-001-3',
      parentId: '5',
      type: 'subtask',
      status: 'in-progress',
      priority: 'critical',
      startDate: format(addDays(today, -3), 'yyyy-MM-dd'),
      dueDate: format(addDays(today, 5), 'yyyy-MM-dd'),
      progress: 50,
      actualHours: 20,
      remainingHours: 30,
      tags: ['concrete']
    })
  ];

  return tasks;
};
import React from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Circle, 
  Flag, 
  MoreVertical,
  Plus,
  Filter,
  List,
  Kanban,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskData {
  id: string;
  name: string;
  status: string;
  statusLabel: string;
  category: string;
  assignee: string;
  priority: string;
  estimatedDuration: string;
  startDate: string;
  dueDate: string;
  dateClosed: string;
  variance: string;
  estimatedCost: string;
  actualCost: string;
  hasSubtasks?: boolean;
  isExpanded?: boolean;
  level?: number;
}

const mockTasks: TaskData[] = [
  // Planning tasks
  {
    id: '1',
    name: 'Site visit and evaluation',
    status: 'in-progress',
    statusLabel: 'In Progress',
    category: 'Planning',
    assignee: 'Normal...',
    priority: 'Urgent',
    estimatedDuration: '8/31/24 4am - 9/2/24 4am',
    startDate: '9/2/24 4am',
    dueDate: '9/8/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$25,000',
    actualCost: '-'
  },
  {
    id: '2',
    name: 'Preparation of utilities and equipment',
    status: 'planning',
    statusLabel: 'Planning',
    category: 'Planning',
    assignee: 'Normal...',
    priority: 'High',
    estimatedDuration: '9/2/24 4am - 9/8/24 4am',
    startDate: '9/2/24 4am',
    dueDate: '9/8/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$25,000',
    actualCost: '-'
  },
  {
    id: '3',
    name: 'Awarding of the construction contract',
    status: 'planning',
    statusLabel: 'Planning',
    category: 'Planning',
    assignee: 'Normal...',
    priority: 'Urgent',
    estimatedDuration: '8/27/24 4am - 9/28/24 4am',
    startDate: '8/27/24 4am',
    dueDate: '9/28/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '-',
    actualCost: '-'
  },
  // Development tasks
  {
    id: '4',
    name: 'Site excavation',
    status: 'development',
    statusLabel: 'Development',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'Normal',
    estimatedDuration: '9/10/24 4am - 9/16/24 4am',
    startDate: '9/10/24 4am',
    dueDate: '9/16/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$2,000',
    actualCost: '-',
    hasSubtasks: true
  },
  {
    id: '4.1',
    name: 'Floors and wall erection',
    status: 'development',
    statusLabel: 'Development',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'Normal',
    estimatedDuration: '9/30/24 4am - 10/7/24 4am',
    startDate: '9/30/24 4am',
    dueDate: '10/7/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$11,500',
    actualCost: '-',
    level: 1
  },
  {
    id: '4.2',
    name: 'Roof installment',
    status: 'todo',
    statusLabel: 'To Do',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'High',
    estimatedDuration: '10/7/24 4am - 10/13/24 4am',
    startDate: '10/7/24 4am',
    dueDate: '10/13/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$11,500',
    actualCost: '-',
    level: 1
  },
  {
    id: '5',
    name: 'Site clearing and preparation',
    status: 'development',
    statusLabel: 'Development',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'High',
    estimatedDuration: '9/2/24 4am - 9/8/24 4am',
    startDate: '9/2/24 4am',
    dueDate: '9/8/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$1,250',
    actualCost: '-'
  },
  {
    id: '6',
    name: 'Installment of foundation and backfilling',
    status: 'in-progress',
    statusLabel: 'In Progress',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'Normal',
    estimatedDuration: '9/16/24 4am - 9/30/24 4am',
    startDate: '9/16/24 4am',
    dueDate: '9/30/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '-',
    actualCost: '-',
    hasSubtasks: true
  },
  {
    id: '6.1',
    name: 'Footings installment',
    status: 'todo',
    statusLabel: 'To Do',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'Normal',
    estimatedDuration: '9/16/24 4am - 9/23/24 4am',
    startDate: '9/16/24 4am',
    dueDate: '9/23/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$11,000',
    actualCost: '-',
    level: 1
  },
  {
    id: '6.2',
    name: 'Wall foundation installment',
    status: 'todo',
    statusLabel: 'To Do',
    category: 'Development',
    assignee: 'Normal...',
    priority: 'Normal',
    estimatedDuration: '9/23/24 4am - 9/30/24 4am',
    startDate: '9/23/24 4am',
    dueDate: '9/30/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$11,000',
    actualCost: '-',
    level: 1
  },
  // Finalization tasks
  {
    id: '7',
    name: 'Wall exterior and interior finishing',
    status: 'finalization',
    statusLabel: 'Finalization',
    category: 'Finalization',
    assignee: 'Normal...',
    priority: 'Normal',
    estimatedDuration: '10/12/24 4am - 10/16/24 4am',
    startDate: '10/12/24 4am',
    dueDate: '10/16/24 4am',
    dateClosed: '-',
    variance: '-',
    estimatedCost: '$1,800',
    actualCost: '-'
  }
];

export default function TasksListView() {
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['Planning', 'Development', 'Finalization']));
  const [expandedTasks, setExpandedTasks] = React.useState<Set<string>>(new Set());
  const [selectedTasks, setSelectedTasks] = React.useState<Set<string>>(new Set());

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const toggleTaskSelection = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId);
    } else {
      newSelected.add(taskId);
    }
    setSelectedTasks(newSelected);
  };

  const getStatusBadge = (status: string, label: string) => {
    const statusStyles: Record<string, string> = {
      'in-progress': 'bg-blue-500 text-white',
      'planning': 'bg-purple-500 text-white',
      'development': 'bg-blue-500 text-white',
      'todo': 'bg-gray-500 text-white',
      'finalization': 'bg-yellow-500 text-white'
    };
    
    return (
      <span className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium",
        statusStyles[status] || 'bg-gray-500 text-white'
      )}>
        {label}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryStyles: Record<string, string> = {
      'Planning': 'bg-purple-500 text-white',
      'Development': 'bg-blue-500 text-white',
      'Finalization': 'bg-yellow-500 text-black'
    };
    
    return (
      <span className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium",
        categoryStyles[category] || 'bg-gray-500 text-white'
      )}>
        {category}
      </span>
    );
  };

  const groupedTasks = {
    Planning: mockTasks.filter(t => t.category === 'Planning'),
    Development: mockTasks.filter(t => t.category === 'Development' && !t.level),
    Finalization: mockTasks.filter(t => t.category === 'Finalization')
  };

  const renderTask = (task: TaskData) => {
    const isExpanded = expandedTasks.has(task.id);
    const isSelected = selectedTasks.has(task.id);
    const subtasks = task.hasSubtasks ? mockTasks.filter(t => t.level === 1 && t.id.startsWith(task.id + '.')) : [];

    return (
      <React.Fragment key={task.id}>
        <tr className="hover:bg-gray-50/50 border-b border-gray-100">
          <td className="px-2 py-1.5 w-8">
            <Checkbox 
              className="h-4 w-4"
              checked={isSelected}
              onCheckedChange={() => toggleTaskSelection(task.id)}
            />
          </td>
          <td className="px-2 py-1.5">
            <div className="flex items-center gap-1.5" style={{ paddingLeft: `${(task.level || 0) * 20}px` }}>
              {task.hasSubtasks && (
                <button onClick={() => toggleTask(task.id)} className="p-0">
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-3 w-3 text-gray-500" />
                  )}
                </button>
              )}
              <Circle className={cn(
                "h-2 w-2",
                task.status === 'in-progress' ? "fill-blue-500 text-blue-500" :
                task.status === 'completed' ? "fill-green-500 text-green-500" :
                "text-gray-400"
              )} />
              <span className="text-[13px] text-gray-900">{task.name}</span>
            </div>
          </td>
          <td className="px-2 py-1.5">
            {getStatusBadge(task.status, task.statusLabel)}
          </td>
          <td className="px-2 py-1.5">
            {getCategoryBadge(task.category)}
          </td>
          <td className="px-2 py-1.5">
            <span className="text-[13px] text-gray-700">{task.assignee}</span>
          </td>
          <td className="px-2 py-1.5">
            <div className="flex items-center gap-1">
              <Flag className={cn(
                "h-3 w-3",
                task.priority === 'Urgent' || task.priority === 'High' ? "text-red-500" : "text-gray-400"
              )} />
              <span className={cn(
                "text-[13px]",
                task.priority === 'Urgent' || task.priority === 'High' ? "text-red-600 font-medium" : "text-gray-600"
              )}>
                {task.priority}
              </span>
            </div>
          </td>
          <td className="px-2 py-1.5">
            <span className="text-[13px] text-gray-700">{task.estimatedDuration}</span>
          </td>
          <td className="px-2 py-1.5">
            <span className="text-[13px] text-gray-700">{task.startDate}</span>
          </td>
          <td className="px-2 py-1.5">
            <span className="text-[13px] text-gray-700">{task.dueDate}</span>
          </td>
          <td className="px-2 py-1.5 text-center">
            <span className="text-[13px] text-gray-500">{task.dateClosed}</span>
          </td>
          <td className="px-2 py-1.5 text-center">
            <span className="text-[13px] text-gray-500">{task.variance}</span>
          </td>
          <td className="px-2 py-1.5 text-right">
            <span className="text-[13px] text-gray-700 font-medium">{task.estimatedCost}</span>
          </td>
          <td className="px-2 py-1.5 text-right">
            <span className="text-[13px] text-gray-500">{task.actualCost}</span>
          </td>
          <td className="px-2 py-1.5 text-center w-8">
            <MoreVertical className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </td>
        </tr>
        {isExpanded && subtasks.map(subtask => renderTask(subtask))}
      </React.Fragment>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Controls */}
      <div className="border-b px-4 py-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-gray-600">Group: Activity Category</span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
            <span className="text-gray-300">|</span>
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Plus className="h-3 w-3 mr-1" />
              <span className="text-[12px]">Add Task</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 px-2">
              <Filter className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-[12px]">
              Expanded
            </Button>
            <span className="text-gray-300">|</span>
            <div className="flex border rounded">
              <Button variant="secondary" size="sm" className="h-7 px-2 rounded-none rounded-l border-r">
                <List className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 rounded-none border-r">
                <Kanban className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 rounded-none border-r">
                <BarChart3 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 rounded-none rounded-r">
                <Calendar className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50 border-b">
            <tr className="text-left">
              <th className="px-2 py-2 w-8">
                <Checkbox className="h-4 w-4" />
              </th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Name</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Status</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Activity Category</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Assignee</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Priority</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Estimated Duration</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Start date</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600">Due date</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600 text-center">Date closed</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600 text-center">Variance (ID...)</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600 text-right">Estimated Cost</th>
              <th className="px-2 py-2 font-normal text-[11px] text-gray-600 text-right">Actual Cost</th>
              <th className="px-2 py-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedTasks).map(([group, tasks]) => (
              <React.Fragment key={group}>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td colSpan={14} className="px-2 py-1">
                    <button 
                      onClick={() => toggleGroup(group)}
                      className="flex items-center gap-2 w-full"
                    >
                      {expandedGroups.has(group) ? (
                        <ChevronDown className="h-3 w-3 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-gray-500" />
                      )}
                      <span className="text-[12px] font-medium text-gray-700">{group}</span>
                      <span className="text-[11px] text-gray-500">({tasks.length})</span>
                    </button>
                  </td>
                </tr>
                {expandedGroups.has(group) && tasks.map(task => renderTask(task))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
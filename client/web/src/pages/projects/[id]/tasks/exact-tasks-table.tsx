import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus,
  Link2,
  Edit2,
  Trash2,
  Eye,
  Copy,
  Flag,
  GripVertical,
  X,
  Check,
  Settings,
  ChevronUp,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

// Status picker component
const StatusPicker = ({ value, onChange, onClose }: any) => {
  const [showEdit, setShowEdit] = useState(false);
  const [customStatuses, setCustomStatuses] = useState([
    { id: 'todo', label: 'TO DO', color: '#6b7280', group: 'Not started' },
    { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7', group: 'Active' },
    { id: 'on-hold', label: 'ON HOLD', color: '#fb6340', group: 'Done' },
    { id: 'complete', label: 'COMPLETE', color: '#22c55e', group: 'Closed' }
  ]);

  const statusGroups = [
    { name: 'Not started', color: '#6b7280' },
    { name: 'Active', color: '#5b5fc7' },
    { name: 'Done', color: '#fb6340' },
    { name: 'Closed', color: '#22c55e' }
  ];

  if (showEdit) {
    return (
      <div style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '20px',
        width: '500px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Edit Project Management statuses</h3>
          <X style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={() => setShowEdit(false)} />
        </div>
        
        {statusGroups.map(group => (
          <div key={group.name} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>{group.name}</span>
              <Plus style={{ width: '16px', height: '16px', cursor: 'pointer', color: '#6b7280' }} />
            </div>
            {customStatuses.filter(s => s.group === group.name).map(status => (
              <div key={status.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                marginBottom: '8px'
              }}>
                <GripVertical style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: status.color
                }} />
                <span style={{ flex: 1, fontSize: '13px' }}>{status.label}</span>
                <MoreHorizontal style={{ width: '16px', height: '16px', color: '#9ca3af', cursor: 'pointer' }} />
              </div>
            ))}
            <button style={{
              width: '100%',
              padding: '8px',
              border: '1px dashed #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'transparent',
              fontSize: '13px',
              color: '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <Plus style={{ width: '14px', height: '14px' }} />
              Add status
            </button>
          </div>
        ))}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
          <button style={{
            padding: '8px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: 'white',
            fontSize: '13px',
            cursor: 'pointer'
          }}>
            Save as template
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            cursor: 'pointer'
          }}>
            Apply changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '8px',
      minWidth: '200px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      {customStatuses.map(status => (
        <div
          key={status.id}
          onClick={() => {
            onChange(status);
            onClose();
          }}
          style={{
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: status.color
          }} />
          <span style={{ fontSize: '13px' }}>{status.label}</span>
        </div>
      ))}
      <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '8px', paddingTop: '8px' }}>
        <div
          onClick={() => setShowEdit(true)}
          style={{
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Settings style={{ width: '14px', height: '14px', color: '#6b7280' }} />
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Edit statuses</span>
        </div>
      </div>
    </div>
  );
};

// Category picker component
const CategoryPicker = ({ value, onChange, onClose }: any) => {
  const categories = [
    { id: 'planning', label: 'Planning', color: '#e91e63' },
    { id: 'development', label: 'Development', color: '#5b5fc7' },
    { id: 'finalization', label: 'Finalization', color: '#fbbf24' },
    { id: 'completion', label: 'Completion', color: '#4ade80' },
    { id: 'plaster', label: 'Plaster', color: '#60a5fa' },
    { id: 'electrical', label: 'Electrical', color: '#c084fc' }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px',
      width: '280px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>
          SELECT AN OPTION
        </h4>
        <input
          type="text"
          placeholder="Type to search or add..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none'
          }}
        />
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => {
              onChange(cat);
              onClose();
            }}
            style={{
              padding: '10px',
              backgroundColor: cat.color,
              color: 'white',
              borderRadius: '6px',
              marginBottom: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
};

// Assignee picker component
const AssigneePicker = ({ value, onChange, onClose }: any) => {
  const assignees = [
    { id: 'as', name: 'AS', color: '#5b5fc7' },
    { id: 'jb', name: 'JB', color: '#ef4444' },
    { id: 'av', name: 'AV', color: '#22c55e' },
    { id: 'mt', name: 'MT', color: '#8b5cf6' },
    { id: 'sk', name: 'SK', color: '#f59e0b' },
    { id: 'jd', name: 'JD', color: '#06b6d4' }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '12px',
      minWidth: '200px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div style={{ marginBottom: '8px' }}>
        <input
          type="text"
          placeholder="Search assignee..."
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            fontSize: '12px',
            outline: 'none'
          }}
        />
      </div>
      {assignees.map(assignee => (
        <div
          key={assignee.id}
          onClick={() => {
            onChange(assignee);
            onClose();
          }}
          style={{
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: assignee.color,
            color: 'white',
            padding: '4px 8px',
            borderRadius: '50%',
            fontWeight: '600',
            minWidth: '28px',
            textAlign: 'center'
          }}>
            {assignee.name}
          </span>
          <span style={{ fontSize: '13px' }}>{assignee.name}</span>
        </div>
      ))}
    </div>
  );
};

const ExactTasksTable: React.FC = () => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['planning', 'development', 'finalization']);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<any>(null);
  const [openPicker, setOpenPicker] = useState<{ type: string; taskId: string } | null>(null);
  const [tasks, setTasks] = useState<any>({
    planning: [],
    development: [],
    finalization: []
  });

  // Initialize tasks
  useEffect(() => {
    setTasks({
      planning: [
        {
          id: '1',
          name: 'Site visit and evaluation',
          status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
          category: { id: 'planning', label: 'Planning', color: '#e91e63' },
          assignee: { id: 'as', name: 'AS', color: '#5b5fc7' },
          priority: 'Urgent',
          priorityColor: '#ef4444',
          priorityLevel: 2,
          estimatedDuration: '8/31/24, 4am',
          startDate: '9/2/24, 4am',
          dueDate: '9/5/24, 4am',
          progress: 65,
          hasSubtasks: true,
          subtasks: [
            {
              id: '1.1',
              name: 'Initial site survey',
              status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
              category: { id: 'planning', label: 'Planning', color: '#e91e63' },
              assignee: { id: 'av', name: 'AV', color: '#22c55e' },
              priority: 'High',
              priorityColor: '#fb923c',
              priorityLevel: 3,
              estimatedDuration: '8/31/24, 4am',
              startDate: '9/2/24, 4am',
              dueDate: '9/3/24, 4am',
              progress: 80
            }
          ]
        }
      ],
      development: [
        {
          id: '4',
          name: 'Site excavation',
          status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
          category: { id: 'development', label: 'Development', color: '#5b5fc7' },
          assignee: null,
          priority: 'Normal',
          priorityColor: '#10b981',
          priorityLevel: 6,
          estimatedDuration: '9/10/24, 4am',
          startDate: '9/16/24, 4am',
          dueDate: '9/20/24, 4am',
          progress: 45,
          hasSubtasks: false
        }
      ],
      finalization: [
        {
          id: '5',
          name: 'Wall exterior and interior finishing',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'finalization', label: 'Finalization', color: '#fbbf24' },
          assignee: null,
          priority: 'Normal',
          priorityColor: '#10b981',
          priorityLevel: 4,
          estimatedDuration: '10/13/24, 4am',
          startDate: '10/16/24, 4am',
          dueDate: '10/20/24, 4am',
          progress: 0,
          hasSubtasks: false
        }
      ]
    });
  }, []);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev =>
      prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group]
    );
  };

  const toggleAllGroups = () => {
    if (expandedGroups.length === 3) {
      setExpandedGroups([]);
    } else {
      setExpandedGroups(['planning', 'development', 'finalization']);
    }
  };

  const toggleTask = (taskId: string) => {
    setExpandedTasks(prev =>
      prev.includes(taskId) ? prev.filter(t => t !== taskId) : [...prev, taskId]
    );
  };

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev =>
      prev.includes(taskId) ? prev.filter(t => t !== taskId) : [...prev, taskId]
    );
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, task: any, group: string) => {
    setDraggedTask({ task, group });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetGroup: string, targetIndex: number) => {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, group: sourceGroup } = draggedTask;
    
    if (sourceGroup !== targetGroup) {
      // Move between groups
      setTasks((prev: any) => {
        const newTasks = { ...prev };
        newTasks[sourceGroup] = newTasks[sourceGroup].filter((t: any) => t.id !== task.id);
        newTasks[targetGroup].splice(targetIndex, 0, task);
        return newTasks;
      });
    } else {
      // Reorder within group
      setTasks((prev: any) => {
        const newTasks = { ...prev };
        const items = [...newTasks[sourceGroup]];
        const draggedIndex = items.findIndex(t => t.id === task.id);
        items.splice(draggedIndex, 1);
        items.splice(targetIndex, 0, task);
        newTasks[sourceGroup] = items;
        return newTasks;
      });
    }
    
    setDraggedTask(null);
  };

  // Progress circle component
  const ProgressCircle = ({ progress = 0, size = 20 }: { progress?: number; size?: number }) => {
    const strokeWidth = 2.5;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progress === 100 ? '#22c55e' : progress > 50 ? '#3b82f6' : '#fbbf24'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
        {progress === 100 && (
          <Check 
            style={{ 
              width: size * 0.5, 
              height: size * 0.5,
              transform: `translate(${size * 0.25}px, ${size * 0.25}px)`,
              color: '#22c55e'
            }} 
          />
        )}
      </svg>
    );
  };

  const renderTask = (task: any, group: string, index: number, isSubtask: boolean = false) => {
    return (
      <tr 
        key={task.id}
        draggable={!isSubtask}
        onDragStart={(e) => !isSubtask && handleDragStart(e, task, group)}
        onDragOver={handleDragOver}
        onDrop={(e) => !isSubtask && handleDrop(e, group, index)}
        style={{ 
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: hoveredRow === task.id ? '#f9fafb' : 'transparent',
          transition: 'background-color 0.2s',
          cursor: !isSubtask ? 'move' : 'default'
        }}
        onMouseEnter={() => setHoveredRow(task.id)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <td style={{ padding: '10px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {!isSubtask && (
              <GripVertical style={{ width: '14px', height: '14px', color: '#d1d5db', cursor: 'grab' }} />
            )}
            <input type="checkbox" 
                   checked={selectedTasks.includes(task.id)}
                   onChange={() => toggleTaskSelection(task.id)}
                   style={{ width: '14px', height: '14px' }} />
          </div>
        </td>
        <td style={{ padding: '10px 8px', paddingLeft: isSubtask ? '48px' : '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {task.hasSubtasks && !isSubtask && (
              <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer' }}>
                {expandedTasks.includes(task.id) ? 
                  <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} /> : 
                  <ChevronRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                }
              </span>
            )}
            <ProgressCircle progress={task.progress} size={isSubtask ? 16 : 20} />
            <span style={{ 
              fontSize: '14px', 
              color: hoveredRow === task.id ? '#3b82f6' : isSubtask ? '#6b7280' : '#111827',
              transition: 'color 0.2s',
              fontWeight: '500'
            }}>
              {task.name}
            </span>
            {hoveredRow === task.id && (
              <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
                <Plus 
                  style={{ width: '16px', height: '16px', color: '#6b7280', cursor: 'pointer' }}
                  onClick={() => console.log('Add subtask')}
                />
                <Link2 
                  style={{ width: '16px', height: '16px', color: '#6b7280', cursor: 'pointer' }}
                  onClick={() => console.log('Link task')}
                />
                <Edit2 
                  style={{ width: '16px', height: '16px', color: '#6b7280', cursor: 'pointer' }}
                  onClick={() => console.log('Edit task')}
                />
                <Trash2 
                  style={{ width: '16px', height: '16px', color: '#ef4444', cursor: 'pointer' }}
                  onClick={() => console.log('Delete task')}
                />
              </div>
            )}
          </div>
        </td>
        <td style={{ padding: '10px 8px', position: 'relative' }}>
          {task.status && (
            <>
              <span 
                onClick={() => setOpenPicker({ type: 'status', taskId: task.id })}
                style={{
                  fontSize: '12px',
                  backgroundColor: task.status.color,
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-block'
                }}>
                {task.status.label}
              </span>
              {openPicker?.type === 'status' && openPicker.taskId === task.id && (
                <StatusPicker
                  value={task.status}
                  onChange={(status: any) => {
                    // Update task status
                    console.log('Update status', status);
                  }}
                  onClose={() => setOpenPicker(null)}
                />
              )}
            </>
          )}
        </td>
        <td style={{ padding: '10px 8px', position: 'relative' }}>
          <span 
            onClick={() => setOpenPicker({ type: 'category', taskId: task.id })}
            style={{
              fontSize: '12px',
              backgroundColor: task.category.color,
              color: 'white',
              padding: '4px 10px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'inline-block'
            }}>
            {task.category.label}
          </span>
          {openPicker?.type === 'category' && openPicker.taskId === task.id && (
            <CategoryPicker
              value={task.category}
              onChange={(category: any) => {
                // Update task category
                console.log('Update category', category);
              }}
              onClose={() => setOpenPicker(null)}
            />
          )}
        </td>
        <td style={{ padding: '10px 8px', textAlign: 'center', position: 'relative' }}>
          {task.assignee ? (
            <>
              <span 
                onClick={() => setOpenPicker({ type: 'assignee', taskId: task.id })}
                style={{
                  fontSize: '12px',
                  backgroundColor: task.assignee.color,
                  color: 'white',
                  padding: '6px 10px',
                  borderRadius: '50%',
                  fontWeight: '600',
                  display: 'inline-block',
                  minWidth: '32px',
                  cursor: 'pointer'
                }}>
                {task.assignee.name}
              </span>
              {openPicker?.type === 'assignee' && openPicker.taskId === task.id && (
                <AssigneePicker
                  value={task.assignee}
                  onChange={(assignee: any) => {
                    // Update task assignee
                    console.log('Update assignee', assignee);
                  }}
                  onClose={() => setOpenPicker(null)}
                />
              )}
            </>
          ) : (
            <Users 
              onClick={() => setOpenPicker({ type: 'assignee', taskId: task.id })}
              style={{ width: '16px', height: '16px', color: '#9ca3af', cursor: 'pointer' }} 
            />
          )}
        </td>
        <td style={{ padding: '10px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flag style={{ width: '14px', height: '14px', color: task.priorityColor }} />
            <span style={{
              fontSize: '13px',
              color: task.priorityColor,
              fontWeight: '500'
            }}>
              {task.priority}
            </span>
            <span style={{ fontSize: '13px', color: '#6b7280' }}>{task.priorityLevel}</span>
          </div>
        </td>
        <td style={{ padding: '10px 8px', fontSize: '14px', color: '#374151' }}>{task.estimatedDuration}</td>
        <td style={{ padding: '10px 8px', fontSize: '14px', color: '#374151' }}>{task.startDate}</td>
        <td style={{ padding: '10px 8px', fontSize: '14px', color: '#374151' }}>{task.dueDate}</td>
      </tr>
    );
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '0', fontFamily: 'inherit' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ 
            fontSize: '14px', 
            color: '#6b7280',
            fontWeight: '500'
          }}>
            Group: Activity Category
          </span>
          <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} />
          <button 
            onClick={toggleAllGroups}
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              backgroundColor: expandedGroups.length === 3 ? '#7c3aed' : 'transparent',
              color: expandedGroups.length === 3 ? 'white' : '#6b7280',
              border: expandedGroups.length === 3 ? 'none' : '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            {expandedGroups.length === 3 ? (
              <>
                <ChevronUp style={{ width: '14px', height: '14px' }} />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown style={{ width: '14px', height: '14px' }} />
                Expand All
              </>
            )}
          </button>
          <button style={{
            padding: '6px 12px',
            fontSize: '13px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Columns
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{
            padding: '6px 12px',
            fontSize: '13px',
            backgroundColor: 'transparent',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Filter style={{ width: '14px', height: '14px' }} />
            Filter
          </button>
          <button style={{
            padding: '6px',
            backgroundColor: 'transparent',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            <ChevronDown style={{ width: '14px', height: '14px' }} />
          </button>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Closed</span>
          <button style={{
            padding: '6px 12px',
            fontSize: '13px',
            backgroundColor: 'transparent',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Assignee
          </button>
          <div style={{ position: 'relative' }}>
            <Search style={{ 
              position: 'absolute', 
              left: '10px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '16px', 
              height: '16px',
              color: '#9ca3af'
            }} />
            <input 
              type="text" 
              placeholder="Search..."
              style={{
                padding: '6px 10px 6px 32px',
                fontSize: '13px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                width: '160px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '60px' }}>
              <input type="checkbox" style={{ width: '14px', height: '14px' }} />
            </th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af' }}>Name</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '120px' }}>Status</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '140px' }}>Activity Category</th>
            <th style={{ padding: '12px 8px', textAlign: 'center', fontWeight: '500', color: '#9ca3af', width: '100px' }}>Assignee</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '120px' }}>Priority</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '160px' }}>Estimated Duration</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '140px' }}>Start date</th>
            <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: '500', color: '#9ca3af', width: '140px' }}>Due date</th>
          </tr>
        </thead>
        <tbody>
          {/* Render groups */}
          {Object.entries(tasks).map(([groupKey, groupTasks]: [string, any]) => (
            <React.Fragment key={groupKey}>
              <tr>
                <td colSpan={9} style={{ padding: '10px 12px', backgroundColor: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                       onClick={() => toggleGroup(groupKey)}>
                    {expandedGroups.includes(groupKey) ? 
                      <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} /> : 
                      <ChevronRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                    }
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '600',
                      backgroundColor: groupKey === 'planning' ? '#e91e63' : 
                                      groupKey === 'development' ? '#3b82f6' : '#f59e0b',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}>
                      {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{groupTasks.length}</span>
                    <Plus style={{ width: '16px', height: '16px', color: '#6b7280', marginLeft: '6px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '4px' }}>Add Task</span>
                  </div>
                </td>
              </tr>
              
              {expandedGroups.includes(groupKey) && groupTasks.map((task: any, index: number) => (
                <React.Fragment key={task.id}>
                  {renderTask(task, groupKey, index)}
                  {task.hasSubtasks && expandedTasks.includes(task.id) && task.subtasks?.map((subtask: any, subIndex: number) => 
                    renderTask(subtask, groupKey, subIndex, true)
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExactTasksTable;
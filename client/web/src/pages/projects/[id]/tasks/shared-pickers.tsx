import React, { useState, useEffect } from 'react';
import { Check, Settings, Plus, Edit2, Trash2, X, ChevronDown, Users } from 'lucide-react';
import { pickerStyles, mergeStyles, usePickerBehavior } from './unified-picker-styles';

// Status Picker Component
export const StatusPicker = ({ value, onChange, onClose, taskId, context = 'list' }: any) => {
  const [showEdit, setShowEdit] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customStatuses, setCustomStatuses] = useState([
    { id: 'todo', label: 'TO DO', color: '#6b7280', group: 'Not started' },
    { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7', group: 'Active' },
    { id: 'on-hold', label: 'ON HOLD', color: '#fb6340', group: 'Done' },
    { id: 'complete', label: 'COMPLETE', color: '#22c55e', group: 'Closed' }
  ]);

  useEffect(() => {
    const triggerElement = document.querySelector(`[data-status-trigger-${context}="${taskId}"]`);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 2,
        left: rect.left
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on the picker itself
      if (target.closest(`[data-status-picker-list="${taskId}"]`)) {
        return;
      }
      // Don't close if clicking on the trigger button
      if (target.closest(`[data-status-trigger-${context}="${taskId}"]`)) {
        return;
      }
      onClose();
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [taskId, onClose, context]);

  const filteredStatuses = customStatuses.filter(status =>
    status.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!position) return null;

  return (
    <div 
      data-status-picker-list={taskId} 
      onClick={(e) => e.stopPropagation()}
      style={mergeStyles(pickerStyles.container, {
        minWidth: '240px',
        top: position.top,
        left: position.left,
        transform: 'none'
      })}
    >
      <div style={pickerStyles.header}>
        <div style={pickerStyles.title}>STATUS</div>
        <input
          type="text"
          placeholder="Search status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={pickerStyles.searchInput}
          onFocus={(e) => e.currentTarget.style.backgroundColor = 'white'}
          onBlur={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
        />
      </div>
      {filteredStatuses.map(status => (
        <div
          key={`${taskId}-status-${status.id}`}
          onClick={() => {
            onChange(status);
            onClose();
          }}
          style={mergeStyles(
            pickerStyles.option,
            value?.id === status.id ? pickerStyles.optionSelected : {}
          )}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, 
              value?.id === status.id ? pickerStyles.optionSelected : pickerStyles.optionHover
            );
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, 
              value?.id === status.id ? pickerStyles.optionSelected : pickerStyles.option
            );
          }}
        >
          <div style={mergeStyles(pickerStyles.colorDot, {
            backgroundColor: status.color
          })} />
          <span style={mergeStyles(pickerStyles.optionLabel, {
            fontWeight: '600'
          })}>{status.label}</span>
          {value?.id === status.id && (
            <Check style={pickerStyles.checkmark} />
          )}
        </div>
      ))}
    </div>
  );
};

// Priority Picker Component
export const PriorityPicker = ({ value, onChange, onClose, taskId, context = 'list' }: any) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorities] = useState([
    { id: 'critical', label: 'Critical', color: '#dc2626', icon: '🔴', level: 1 },
    { id: 'urgent', label: 'Urgent', color: '#ef4444', icon: '🟠', level: 2 },
    { id: 'high', label: 'High', color: '#fb923c', icon: '🟡', level: 3 },
    { id: 'medium', label: 'Medium', color: '#fbbf24', icon: '🟢', level: 4 },
    { id: 'normal', label: 'Normal', color: '#10b981', icon: '🔵', level: 5 },
    { id: 'low', label: 'Low', color: '#3b82f6', icon: '⚪', level: 6 }
  ]);

  const filteredPriorities = priorities.filter(priority =>
    priority.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const triggerElement = document.querySelector(`[data-priority-trigger-${context}="${taskId}"]`);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 2,
        left: rect.left
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on the picker itself
      if (target.closest(`[data-priority-picker-list="${taskId}"]`)) {
        return;
      }
      // Don't close if clicking on the trigger button
      if (target.closest(`[data-priority-trigger-${context}="${taskId}"]`)) {
        return;
      }
      onClose();
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [taskId, onClose, context]);

  if (!position) return null;

  return (
    <div 
      data-priority-picker-list={taskId} 
      onClick={(e) => e.stopPropagation()}
      style={mergeStyles(pickerStyles.container, {
        width: '260px',
        top: position.top,
        left: position.left,
        transform: 'none'
      })}
    >
      <div style={pickerStyles.header}>
        <div style={pickerStyles.title}>PRIORITY</div>
        <input
          type="text"
          placeholder="Search priority..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={pickerStyles.searchInput}
        />
      </div>
      <div style={pickerStyles.content}>
        {filteredPriorities.map(priority => (
          <div
            key={`${taskId}-priority-${priority.id}`}
            onClick={() => {
              onChange(priority);
              onClose();
            }}
            style={mergeStyles(
              pickerStyles.option,
              (value?.id === priority.id || value?.priority === priority.id) ? pickerStyles.optionSelected : {}
            )}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style,
                (value?.id === priority.id || value?.priority === priority.id) ? pickerStyles.optionSelected : pickerStyles.optionHover
              );
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style,
                (value?.id === priority.id || value?.priority === priority.id) ? pickerStyles.optionSelected : pickerStyles.option
              );
            }}
          >
            <span style={{ fontSize: '16px' }}>{priority.icon}</span>
            <span style={mergeStyles(pickerStyles.optionLabel, {
              fontWeight: '600',
              color: priority.color
            })}>{priority.label}</span>
            <span style={{
              fontSize: '11px',
              color: '#9ca3af',
              marginLeft: 'auto',
              fontWeight: '500'
            }}>Level {priority.level}</span>
            {(value?.id === priority.id || value?.priority === priority.id) && (
              <Check style={pickerStyles.checkmark} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Category Picker Component
export const CategoryPicker = ({ value, onChange, onClose, taskId, context = 'list' }: any) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState([
    { id: 'planning', label: 'Planning', color: '#e91e63' },
    { id: 'development', label: 'Development', color: '#5b5fc7' },
    { id: 'finalization', label: 'Finalization', color: '#fbbf24' },
    { id: 'completion', label: 'Completion', color: '#4ade80' },
    { id: 'plaster', label: 'Plaster', color: '#60a5fa' },
    { id: 'electrical', label: 'Electrical', color: '#c084fc' },
    { id: 'foundation', label: 'Foundation', color: '#f97316' },
    { id: 'roofing', label: 'Roofing', color: '#06b6d4' },
    { id: 'plumbing', label: 'Plumbing', color: '#14b8a6' },
    { id: 'painting', label: 'Painting', color: '#ec4899' },
    { id: 'flooring', label: 'Flooring', color: '#8b5cf6' },
    { id: 'landscaping', label: 'Landscaping', color: '#22c55e' }
  ]);

  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const triggerElement = document.querySelector(`[data-category-trigger-${context}="${taskId}"]`);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 2,
        left: rect.left
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on the picker itself
      if (target.closest(`[data-category-picker-list="${taskId}"]`)) {
        return;
      }
      // Don't close if clicking on the trigger button
      if (target.closest(`[data-category-trigger-${context}="${taskId}"]`)) {
        return;
      }
      onClose();
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [taskId, onClose, context]);

  if (!position) return null;

  return (
    <div 
      data-category-picker-list={taskId}
      onClick={(e) => e.stopPropagation()}
      style={mergeStyles(pickerStyles.container, {
        width: '280px',
        top: position.top,
        left: position.left,
        transform: 'none'
      })}
    >
      <div style={pickerStyles.header}>
        <h4 style={pickerStyles.title}>SELECT AN OPTION</h4>
        <input
          type="text"
          placeholder="Type to search or add..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={pickerStyles.searchInput}
        />
      </div>
      <div style={pickerStyles.content}>
        {filteredCategories.map(cat => (
          <div
            key={`${taskId}-cat-${cat.id}`}
            onClick={() => {
              onChange(cat);
              onClose();
            }}
            style={mergeStyles(
              pickerStyles.option,
              value?.id === cat.id ? pickerStyles.optionSelected : {}
            )}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style,
                value?.id === cat.id ? pickerStyles.optionSelected : pickerStyles.optionHover
              );
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style,
                value?.id === cat.id ? pickerStyles.optionSelected : pickerStyles.option
              );
            }}
          >
            <div style={mergeStyles(pickerStyles.colorDot, {
              backgroundColor: cat.color,
              width: '16px',
              height: '16px'
            })} />
            <span style={mergeStyles(pickerStyles.optionLabel, {
              fontWeight: '600'
            })}>{cat.label}</span>
            {value?.id === cat.id && (
              <Check style={pickerStyles.checkmark} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Assignee Picker Component
export const AssigneePicker = ({ value, onChange, onClose, taskId, context = 'list' }: any) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assignees] = useState([
    { id: 'john', fullName: 'John Doe', name: 'JD', color: '#3b82f6' },
    { id: 'jane', fullName: 'Jane Smith', name: 'JS', color: '#8b5cf6' },
    { id: 'alex', fullName: 'Alex Johnson', name: 'AJ', color: '#10b981' },
    { id: 'sarah', fullName: 'Sarah Wilson', name: 'SW', color: '#f59e0b' },
    { id: 'mike', fullName: 'Mike Brown', name: 'MB', color: '#ef4444' },
    { id: 'emma', fullName: 'Emma Davis', name: 'ED', color: '#ec4899' }
  ]);

  const filteredAssignees = assignees.filter(assignee =>
    assignee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const triggerElement = document.querySelector(`[data-assignee-trigger-${context}="${taskId}"]`);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 2,
        left: rect.left
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking on the picker itself
      if (target.closest(`[data-assignee-picker-list="${taskId}"]`)) {
        return;
      }
      // Don't close if clicking on the trigger button
      if (target.closest(`[data-assignee-trigger-${context}="${taskId}"]`)) {
        return;
      }
      onClose();
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [taskId, onClose, context]);

  if (!position) return null;

  return (
    <div 
      data-assignee-picker-list={taskId}
      onClick={(e) => e.stopPropagation()}
      style={mergeStyles(pickerStyles.container, {
        minWidth: '240px',
        top: position.top,
        left: position.left,
        transform: 'none'
      })}
    >
      <div style={pickerStyles.header}>
        <div style={pickerStyles.title}>ASSIGNEE</div>
        <input
          type="text"
          placeholder="Search assignee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={pickerStyles.searchInput}
        />
      </div>
      <div style={pickerStyles.content}>
        {filteredAssignees.map(assignee => (
          <div
            key={`${taskId}-assignee-${assignee.id}`}
            onClick={() => {
              onChange(assignee);
              onClose();
            }}
            style={mergeStyles(
              pickerStyles.option,
              value?.id === assignee.id ? pickerStyles.optionSelected : {}
            )}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style,
                value?.id === assignee.id ? pickerStyles.optionSelected : pickerStyles.optionHover
              );
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style,
                value?.id === assignee.id ? pickerStyles.optionSelected : pickerStyles.option
              );
            }}
          >
            <span style={mergeStyles(pickerStyles.avatar, {
              backgroundColor: assignee.color
            })}>
              {assignee.name}
            </span>
            <span style={mergeStyles(pickerStyles.optionLabel, {
              fontWeight: '600'
            })}>{assignee.fullName}</span>
            {value?.id === assignee.id && (
              <Check style={pickerStyles.checkmark} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
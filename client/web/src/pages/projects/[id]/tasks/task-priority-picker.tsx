import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Plus, 
  Edit2, 
  Trash2,
  AlertCircle,
  AlertTriangle,
  ChevronUp,
  TrendingUp,
  Minus,
  ChevronDown,
  Flag
} from 'lucide-react';
import { pickerStyles, mergeStyles } from './unified-picker-styles';

// Task List Priority Picker - Used everywhere for consistency
export const TaskPriorityPicker = ({ value, onChange, onClose, taskId, context = 'list' }: any) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorities, setPriorities] = useState([
    { id: 'critical', label: 'Critical', color: '#dc2626', bgColor: '#fee2e2', icon: AlertCircle, level: 1 },
    { id: 'urgent', label: 'Urgent', color: '#ef4444', bgColor: '#fee2e2', icon: AlertTriangle, level: 2 },
    { id: 'high', label: 'High', color: '#f97316', bgColor: '#fff7ed', icon: ChevronUp, level: 3 },
    { id: 'medium', label: 'Medium', color: '#f59e0b', bgColor: '#fffbeb', icon: TrendingUp, level: 4 },
    { id: 'normal', label: 'Normal', color: '#10b981', bgColor: '#ecfdf5', icon: Minus, level: 5 },
    { id: 'low', label: 'Low', color: '#6b7280', bgColor: '#f9fafb', icon: ChevronDown, level: 6 }
  ]);
  const [showEdit, setShowEdit] = useState(false);
  const [editingPriority, setEditingPriority] = useState<any>(null);
  const [newPriorityName, setNewPriorityName] = useState('');
  const [newPriorityColor, setNewPriorityColor] = useState('#9333ea');
  const [newPriorityLevel, setNewPriorityLevel] = useState('7');

  const filteredPriorities = priorities.filter(priority =>
    priority.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Calculate position based on trigger element
    const triggerElement = document.querySelector(`[data-priority-trigger-${context}="${taskId}"]`);
    if (triggerElement) {
      const rect = triggerElement.getBoundingClientRect();
      const pickerWidth = 260;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      let leftPos = rect.left + rect.width / 2;
      if (leftPos - pickerWidth / 2 < 10) {
        leftPos = pickerWidth / 2 + 10;
      } else if (leftPos + pickerWidth / 2 > windowWidth - 10) {
        leftPos = windowWidth - pickerWidth / 2 - 10;
      }
      
      let topPos = rect.bottom + 8;
      if (topPos + 300 > windowHeight) {
        topPos = rect.top - 308;
      }
      
      setPosition({
        top: topPos,
        left: leftPos
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is on the picker itself
      if (target.closest(`[data-priority-picker-${context}="${taskId}"]`)) {
        return;
      }
      // Don't close if clicking on the trigger button
      if (target.closest(`[data-priority-trigger-${context}="${taskId}"]`)) {
        return;
      }
      // Close the picker for any outside click
      onClose();
    };

    // Use setTimeout to avoid immediate close on open
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [taskId, onClose, context]);

  const handleAddPriority = () => {
    if (newPriorityName.trim()) {
      setPriorities([...priorities, {
        id: newPriorityName.toLowerCase().replace(/\s+/g, '-'),
        label: newPriorityName,
        color: newPriorityColor,
        bgColor: newPriorityColor + '10',
        icon: Flag,
        level: parseInt(newPriorityLevel)
      }].sort((a, b) => a.level - b.level));
      setNewPriorityName('');
      setNewPriorityColor('#9333ea');
      setNewPriorityLevel('7');
    }
  };

  const handleDeletePriority = (priorityId: string) => {
    setPriorities(priorities.filter(p => p.id !== priorityId));
  };

  const handleUpdatePriority = (priorityId: string, newLabel: string, newColor: string, newLevel: number) => {
    setPriorities(priorities.map(p => 
      p.id === priorityId ? { ...p, label: newLabel, color: newColor, level: newLevel } : p
    ).sort((a, b) => a.level - b.level));
    setEditingPriority(null);
  };

  if (!position) return null;

  return (
    <div 
      data-priority-picker-list={taskId}
      data-priority-picker-context={context}
      onClick={(e) => e.stopPropagation()}
      style={mergeStyles(pickerStyles.container, {
        width: '260px',
        top: position.top,
        left: position.left,
        transform: 'translateX(-50%)'
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
        {filteredPriorities.map(priority => {
          const IconComponent = priority.icon;
          const isSelected = value?.priority === priority.label;
          
          return (
            <div
              key={`${taskId}-priority-${priority.id}`}
              onClick={() => {
                onChange({
                  priority: priority.label,
                  priorityColor: priority.color,
                  priorityLevel: priority.level,
                  priorityIcon: priority.icon,
                  priorityBgColor: priority.bgColor
                });
                onClose();
              }}
              style={{
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '6px',
                marginBottom: '2px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backgroundColor: isSelected ? priority.bgColor : 'transparent',
                border: `1px solid ${isSelected ? priority.color + '30' : 'transparent'}`
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: priority.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${priority.color}20`
              }}>
                <IconComponent 
                  style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: priority.color,
                    strokeWidth: 2.5
                  }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '2px'
                }}>
                  {priority.label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Flag style={{ width: '10px', height: '10px' }} />
                  Level {priority.level}
                </div>
              </div>
              {isSelected && (
                <Check style={{ 
                  width: '16px', 
                  height: '16px', 
                  color: priority.color 
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
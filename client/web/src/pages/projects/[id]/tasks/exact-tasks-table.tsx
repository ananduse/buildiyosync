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
  DollarSign,
  Circle,
  Paperclip,
  MessageSquare,
  CheckCircle,
  ListTodo,
  GitBranch,
  Clock,
  AlertTriangle,
  FileText
} from 'lucide-react';
import ComprehensiveTaskModal from './comprehensive-task-modal';
import { ConfirmationDialog, useNotification } from './confirmation-dialog';
import { pickerStyles, mergeStyles, usePickerBehavior } from './unified-picker-styles';

// Status picker component
const StatusPicker = ({ value, onChange, onClose, taskId }: any) => {
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is on the picker itself
      if (target.closest(`[data-status-picker="${taskId}"]`)) {
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
  }, [taskId, onClose]);

  if (showEdit) {
    return (
      <div data-status-picker={taskId} style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        width: '520px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        zIndex: 2000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Edit Project Management statuses</h3>
          <X style={{ width: '20px', height: '20px', cursor: 'pointer', color: '#6b7280' }} onClick={() => setShowEdit(false)} />
        </div>
        
        {statusGroups.map(group => (
          <div key={group.name} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>{group.name}</span>
              <Plus style={{ width: '16px', height: '16px', cursor: 'pointer', color: '#9ca3af' }} />
            </div>
            {customStatuses.filter(s => s.group === group.name).map(status => (
              <div key={status.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <GripVertical style={{ width: '16px', height: '16px', color: '#d1d5db', cursor: 'grab' }} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: status.color,
                  flexShrink: 0
                }} />
                <span style={{ flex: 1, fontSize: '14px', color: '#374151', fontWeight: '600' }}>{status.label}</span>
                <MoreHorizontal style={{ width: '16px', height: '16px', color: '#9ca3af', cursor: 'pointer' }} />
              </div>
            ))}
            <button style={{
              width: '100%',
              padding: '10px',
              border: '1px dashed #d1d5db',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              fontSize: '13px',
              color: '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}>
              <Plus style={{ width: '14px', height: '14px' }} />
              Add status
            </button>
          </div>
        ))}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '10px', 
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button style={{
            padding: '10px 20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#374151',
            fontWeight: '500'
          }}>
            Save as template
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
          onClick={() => {
            setShowEdit(false);
            onClose();
          }}>
            Apply changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-status-picker={taskId} style={mergeStyles(pickerStyles.container, {
      minWidth: '240px'
    })}>
      {customStatuses.map(status => (
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
      <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '6px', paddingTop: '6px' }}>
        <div
          onClick={() => setShowEdit(true)}
          style={{
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background-color 0.15s'
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
const CategoryPicker = ({ value, onChange, onClose, taskId }: any) => {
  const [categories, setCategories] = useState([
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
  const [showEdit, setShowEdit] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#7c3aed');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is on the picker itself
      if (target.closest(`[data-category-picker="${taskId}"]`)) {
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
  }, [taskId, onClose]);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      setCategories([...categories, {
        id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        label: newCategoryName,
        color: newCategoryColor
      }]);
      setNewCategoryName('');
      setNewCategoryColor('#7c3aed');
    }
  };

  const handleDeleteCategory = (catId: string) => {
    setCategories(categories.filter(cat => cat.id !== catId));
  };

  const handleUpdateCategory = (catId: string, newLabel: string, newColor: string) => {
    setCategories(categories.map(cat => 
      cat.id === catId ? { ...cat, label: newLabel, color: newColor } : cat
    ));
    setEditingCategory(null);
  };

  if (showEdit) {
    return (
      <div data-category-picker={taskId} style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        width: '480px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        zIndex: 2000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Edit Categories</h3>
          <X style={{ width: '20px', height: '20px', cursor: 'pointer', color: '#6b7280' }} 
             onClick={() => setShowEdit(false)} />
        </div>
        
        {/* Add new category */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '16px', 
          backgroundColor: '#f9fafb', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>Add New Category</h4>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                {newCategoryColor}
              </span>
            </div>
            <button
              onClick={handleAddCategory}
              style={{
                padding: '8px 16px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Categories list */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              {editingCategory?.id === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editingCategory.label}
                    onChange={(e) => setEditingCategory({ ...editingCategory, label: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="color"
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>
                    {editingCategory.color}
                  </span>
                  <Check 
                    style={{ width: '18px', height: '18px', color: '#10b981', cursor: 'pointer' }}
                    onClick={() => handleUpdateCategory(cat.id, editingCategory.label, editingCategory.color)}
                  />
                  <X 
                    style={{ width: '18px', height: '18px', color: '#6b7280', cursor: 'pointer' }}
                    onClick={() => setEditingCategory(null)}
                  />
                </>
              ) : (
                <>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: cat.color,
                    borderRadius: '4px',
                    flexShrink: 0
                  }} />
                  <span style={{ flex: 1, fontSize: '14px', color: '#374151', fontWeight: '600' }}>{cat.label}</span>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>
                    {cat.color}
                  </span>
                  <Edit2 
                    style={{ width: '16px', height: '16px', color: '#6b7280', cursor: 'pointer' }}
                    onClick={() => setEditingCategory({ ...cat })}
                  />
                  <Trash2 
                    style={{ width: '16px', height: '16px', color: '#ef4444', cursor: 'pointer' }}
                    onClick={() => handleDeleteCategory(cat.id)}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '10px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button style={{
            padding: '10px 20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#374151',
            fontWeight: '500'
          }}
          onClick={() => setShowEdit(false)}>
            Cancel
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
          onClick={() => {
            setShowEdit(false);
            onClose();
          }}>
            Apply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-category-picker={taskId} style={mergeStyles(pickerStyles.container, {
      width: '280px'
    })}>
      <div style={{ marginBottom: '10px' }}>
        <h4 style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>
          SELECT AN OPTION
        </h4>
        <input
          type="text"
          placeholder="Type to search or add..."
          style={{
            width: '100%',
            padding: '6px 10px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#9ca3af'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />
      </div>
      <div style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
        {categories.map(cat => (
          <div
            key={`${taskId}-cat-${cat.id}`}
            onClick={() => {
              onChange(cat);
              onClose();
            }}
            style={{
              padding: '10px',
              backgroundColor: cat.color,
              color: 'white',
              borderRadius: '8px',
              marginBottom: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '700',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(2px)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            {cat.label}
          </div>
        ))}
      </div>
      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        marginTop: '8px', 
        paddingTop: '8px' 
      }}>
        <div
          onClick={() => setShowEdit(true)}
          style={{
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Settings style={{ width: '14px', height: '14px', color: '#6b7280' }} />
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Edit categories</span>
        </div>
      </div>
    </div>
  );
};

// Priority picker component
const PriorityPicker = ({ value, onChange, onClose, taskId }: any) => {
  const [priorities, setPriorities] = useState([
    { id: 'critical', label: 'Critical', color: '#dc2626', icon: '🔴', level: 1 },
    { id: 'urgent', label: 'Urgent', color: '#ef4444', icon: '🟠', level: 2 },
    { id: 'high', label: 'High', color: '#fb923c', icon: '🟡', level: 3 },
    { id: 'medium', label: 'Medium', color: '#fbbf24', icon: '🟢', level: 4 },
    { id: 'normal', label: 'Normal', color: '#10b981', icon: '🔵', level: 5 },
    { id: 'low', label: 'Low', color: '#3b82f6', icon: '⚪', level: 6 }
  ]);
  const [showEdit, setShowEdit] = useState(false);
  const [editingPriority, setEditingPriority] = useState<any>(null);
  const [newPriorityName, setNewPriorityName] = useState('');
  const [newPriorityColor, setNewPriorityColor] = useState('#9333ea');
  const [newPriorityLevel, setNewPriorityLevel] = useState('7');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is on the picker itself
      if (target.closest(`[data-priority-picker="${taskId}"]`)) {
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
  }, [taskId, onClose]);

  const handleAddPriority = () => {
    if (newPriorityName.trim()) {
      setPriorities([...priorities, {
        id: newPriorityName.toLowerCase().replace(/\s+/g, '-'),
        label: newPriorityName,
        color: newPriorityColor,
        icon: '🏷️',
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

  if (showEdit) {
    return (
      <div data-priority-picker={taskId} style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        width: '480px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        zIndex: 2000
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Edit Priority Levels</h3>
          <X style={{ width: '20px', height: '20px', cursor: 'pointer', color: '#6b7280' }} 
             onClick={() => setShowEdit(false)} />
        </div>
        
        {/* Add new priority */}
        <div style={{ 
          marginBottom: '20px', 
          padding: '16px', 
          backgroundColor: '#f9fafb', 
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>Add New Priority</h4>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="text"
              value={newPriorityName}
              onChange={(e) => setNewPriorityName(e.target.value)}
              placeholder="Priority name..."
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <input
              type="number"
              value={newPriorityLevel}
              onChange={(e) => setNewPriorityLevel(e.target.value)}
              placeholder="Level"
              min="1"
              max="10"
              style={{
                width: '70px',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="color"
                value={newPriorityColor}
                onChange={(e) => setNewPriorityColor(e.target.value)}
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                {newPriorityColor}
              </span>
            </div>
            <button
              onClick={handleAddPriority}
              style={{
                padding: '8px 16px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Priorities list */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
          {priorities.map(priority => (
            <div key={priority.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              marginBottom: '8px'
            }}>
              {editingPriority?.id === priority.id ? (
                <>
                  <input
                    type="text"
                    value={editingPriority.label}
                    onChange={(e) => setEditingPriority({ ...editingPriority, label: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="number"
                    value={editingPriority.level}
                    onChange={(e) => setEditingPriority({ ...editingPriority, level: parseInt(e.target.value) })}
                    min="1"
                    max="10"
                    style={{
                      width: '60px',
                      padding: '6px 10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="color"
                    value={editingPriority.color}
                    onChange={(e) => setEditingPriority({ ...editingPriority, color: e.target.value })}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>
                    {editingPriority.color}
                  </span>
                  <Check 
                    style={{ width: '18px', height: '18px', color: '#10b981', cursor: 'pointer' }}
                    onClick={() => handleUpdatePriority(priority.id, editingPriority.label, editingPriority.color, editingPriority.level)}
                  />
                  <X 
                    style={{ width: '18px', height: '18px', color: '#6b7280', cursor: 'pointer' }}
                    onClick={() => setEditingPriority(null)}
                  />
                </>
              ) : (
                <>
                  <span style={{ fontSize: '16px' }}>{priority.icon}</span>
                  <Flag style={{ width: '16px', height: '16px', color: priority.color }} />
                  <span style={{ flex: 1, fontSize: '14px', color: '#374151', fontWeight: '600' }}>{priority.label}</span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    Level {priority.level}
                  </span>
                  <span style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace' }}>
                    {priority.color}
                  </span>
                  <Edit2 
                    style={{ width: '16px', height: '16px', color: '#6b7280', cursor: 'pointer' }}
                    onClick={() => setEditingPriority({ ...priority })}
                  />
                  <Trash2 
                    style={{ width: '16px', height: '16px', color: '#ef4444', cursor: 'pointer' }}
                    onClick={() => handleDeletePriority(priority.id)}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '10px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button style={{
            padding: '10px 20px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#374151',
            fontWeight: '500'
          }}
          onClick={() => setShowEdit(false)}>
            Cancel
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
          onClick={() => {
            setShowEdit(false);
            onClose();
          }}>
            Apply
          </button>
        </div>
      </div>
    );
  }

  return (
    <div data-priority-picker={taskId} style={mergeStyles(pickerStyles.container, {
      width: '260px'
    })}>
      <div style={{ marginBottom: '10px' }}>
        <h4 style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px', fontWeight: '600', letterSpacing: '0.5px' }}>
          SELECT PRIORITY
        </h4>
        <input
          type="text"
          placeholder="Search priority..."
          style={{
            width: '100%',
            padding: '6px 10px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#9ca3af'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />
      </div>
      <div style={{ maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
        {priorities.map(priority => (
          <div
            key={`${taskId}-priority-${priority.id}`}
            onClick={() => {
              onChange({
                priority: priority.label,
                priorityColor: priority.color,
                priorityLevel: priority.level
              });
              onClose();
            }}
            style={{
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '8px',
              marginBottom: '4px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Flag style={{ width: '16px', height: '16px', color: priority.color }} />
            <span style={{ flex: 1, fontSize: '14px', color: '#374151', fontWeight: '600' }}>{priority.label}</span>
            <span style={{ 
              fontSize: '11px', 
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {priority.level}
            </span>
          </div>
        ))}
      </div>
      <div style={{ 
        borderTop: '1px solid #e5e7eb', 
        marginTop: '8px', 
        paddingTop: '8px' 
      }}>
        <div
          onClick={() => setShowEdit(true)}
          style={{
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Settings style={{ width: '14px', height: '14px', color: '#6b7280' }} />
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Edit priorities</span>
        </div>
      </div>
    </div>
  );
};

// Assignee picker component
const AssigneePicker = ({ value, onChange, onClose, taskId }: any) => {
  const assignees = [
    { id: 'as', name: 'AS', fullName: 'Alex Smith', color: '#5b5fc7' },
    { id: 'jb', name: 'JB', fullName: 'John Brown', color: '#ef4444' },
    { id: 'av', name: 'AV', fullName: 'Anna Violet', color: '#22c55e' },
    { id: 'mt', name: 'MT', fullName: 'Mike Turner', color: '#8b5cf6' },
    { id: 'sk', name: 'SK', fullName: 'Sarah King', color: '#f59e0b' },
    { id: 'jd', name: 'JD', fullName: 'James Davis', color: '#06b6d4' }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is on the picker itself
      if (target.closest(`[data-assignee-picker="${taskId}"]`)) {
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
  }, [taskId, onClose]);

  return (
    <div data-assignee-picker={taskId} style={mergeStyles(pickerStyles.container, {
      minWidth: '240px'
    })}>
      <div style={{ marginBottom: '8px', padding: '0 8px' }}>
        <input
          type="text"
          placeholder="Search assignee..."
          style={{
            width: '100%',
            padding: '8px 10px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#9ca3af'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />
      </div>
      {assignees.map(assignee => (
        <div
          key={`${taskId}-assignee-${assignee.id}`}
          onClick={() => {
            onChange(assignee);
            onClose();
          }}
          style={{
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            borderRadius: '6px',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span style={{
            fontSize: '11px',
            backgroundColor: assignee.color,
            color: 'white',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            fontWeight: '600',
            flexShrink: 0
          }}>
            {assignee.name}
          </span>
          <span style={{ fontSize: '13px', color: '#374151', fontWeight: '600' }}>{assignee.fullName}</span>
        </div>
      ))}
    </div>
  );
};

const ExactTasksTable: React.FC = () => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['planning', 'development', 'finalization', 'foundation', 'plumbing', 'electrical']);
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const hoveredTimeout = useRef<NodeJS.Timeout | null>(null);
  const [draggedTask, setDraggedTask] = useState<any>(null);
  const [openPicker, setOpenPicker] = useState<{ type: string; taskId: string } | null>(null);
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; taskId: string | null; taskName: string; taskGroup: string }>({ isOpen: false, taskId: null, taskName: '', taskGroup: '' });
  const { showNotification, NotificationContainer } = useNotification();
  
  // Close any open picker when clicking to open a new one
  const handleOpenPicker = (type: string, taskId: string) => {
    if (openPicker?.type === type && openPicker?.taskId === taskId) {
      setOpenPicker(null);
    } else {
      setOpenPicker({ type, taskId });
    }
  };
  
  const confirmDeleteTask = () => {
    if (deleteConfirmation.taskId && deleteConfirmation.taskGroup) {
      setTasks((prev: any) => {
        const newTasks = { ...prev };
        newTasks[deleteConfirmation.taskGroup] = newTasks[deleteConfirmation.taskGroup].filter(
          (t: any) => t.id !== deleteConfirmation.taskId
        );
        return newTasks;
      });
      showNotification(`Task "${deleteConfirmation.taskName}" deleted successfully`, 'success');
    }
  };
  const [tasks, setTasks] = useState<any>({
    planning: [],
    development: [],
    finalization: [],
    foundation: [],
    plumbing: [],
    electrical: []
  });

  // Initialize tasks with more sample data
  useEffect(() => {
    setTasks({
      planning: [
        {
          id: 'task-1',
          name: 'Site visit and evaluation',
          status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
          category: { id: 'planning', label: 'Planning', color: '#e91e63' },
          assignee: { id: 'as', name: 'AS', fullName: 'Alex Smith', color: '#5b5fc7' },
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
              id: 'subtask-1-1',
              name: 'Initial site survey',
              status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
              category: { id: 'planning', label: 'Planning', color: '#e91e63' },
              assignee: { id: 'av', name: 'AV', fullName: 'Anna Violet', color: '#22c55e' },
              priority: 'High',
              priorityColor: '#fb923c',
              priorityLevel: 3,
              estimatedDuration: '8/31/24, 4am',
              startDate: '9/2/24, 4am',
              dueDate: '9/3/24, 4am',
              progress: 80
            },
            {
              id: 'subtask-1-2',
              name: 'Permit documentation',
              status: { id: 'complete', label: 'COMPLETE', color: '#22c55e' },
              category: { id: 'planning', label: 'Planning', color: '#e91e63' },
              assignee: { id: 'jb', name: 'JB', fullName: 'John Brown', color: '#ef4444' },
              priority: 'Normal',
              priorityColor: '#10b981',
              priorityLevel: 5,
              estimatedDuration: '8/28/24, 4am',
              startDate: '8/29/24, 4am',
              dueDate: '9/1/24, 4am',
              progress: 100
            }
          ]
        },
        {
          id: 'task-2',
          name: 'Architectural drawings and approvals',
          status: { id: 'complete', label: 'COMPLETE', color: '#22c55e' },
          category: { id: 'planning', label: 'Planning', color: '#e91e63' },
          assignee: { id: 'mt', name: 'MT', fullName: 'Mike Turner', color: '#8b5cf6' },
          priority: 'High',
          priorityColor: '#fb923c',
          priorityLevel: 3,
          estimatedDuration: '8/25/24, 4am',
          startDate: '8/26/24, 4am',
          dueDate: '8/30/24, 4am',
          progress: 100,
          hasSubtasks: false
        },
        {
          id: 'task-3',
          name: 'Budget estimation and approval',
          status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
          category: { id: 'planning', label: 'Planning', color: '#e91e63' },
          assignee: { id: 'sk', name: 'SK', fullName: 'Sarah King', color: '#f59e0b' },
          priority: 'Urgent',
          priorityColor: '#ef4444',
          priorityLevel: 1,
          estimatedDuration: '9/1/24, 4am',
          startDate: '9/3/24, 4am',
          dueDate: '9/7/24, 4am',
          progress: 35,
          hasSubtasks: false
        }
      ],
      development: [
        {
          id: 'task-4',
          name: 'Site excavation',
          status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
          category: { id: 'development', label: 'Development', color: '#5b5fc7' },
          assignee: { id: 'jd', name: 'JD', fullName: 'James Davis', color: '#06b6d4' },
          priority: 'Normal',
          priorityColor: '#10b981',
          priorityLevel: 6,
          estimatedDuration: '9/10/24, 4am',
          startDate: '9/16/24, 4am',
          dueDate: '9/20/24, 4am',
          progress: 45,
          hasSubtasks: false
        },
        {
          id: 'task-5',
          name: 'Foundation concrete pouring',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'development', label: 'Development', color: '#5b5fc7' },
          assignee: null,
          priority: 'High',
          priorityColor: '#fb923c',
          priorityLevel: 3,
          estimatedDuration: '9/20/24, 4am',
          startDate: '9/22/24, 4am',
          dueDate: '9/25/24, 4am',
          progress: 0,
          hasSubtasks: true,
          subtasks: [
            {
              id: 'subtask-5-1',
              name: 'Formwork installation',
              status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
              category: { id: 'development', label: 'Development', color: '#5b5fc7' },
              assignee: null,
              priority: 'Normal',
              priorityColor: '#10b981',
              priorityLevel: 5,
              estimatedDuration: '9/20/24, 4am',
              startDate: '9/22/24, 4am',
              dueDate: '9/23/24, 4am',
              progress: 0
            }
          ]
        }
      ],
      finalization: [
        {
          id: 'task-6',
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
        },
        {
          id: 'task-7',
          name: 'Final inspection and handover',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'finalization', label: 'Finalization', color: '#fbbf24' },
          assignee: { id: 'as', name: 'AS', fullName: 'Alex Smith', color: '#5b5fc7' },
          priority: 'Low',
          priorityColor: '#3b82f6',
          priorityLevel: 8,
          estimatedDuration: '10/25/24, 4am',
          startDate: '10/28/24, 4am',
          dueDate: '10/30/24, 4am',
          progress: 0,
          hasSubtasks: false
        }
      ],
      foundation: [
        {
          id: 'task-8',
          name: 'Foundation steel reinforcement',
          status: { id: 'in-progress', label: 'IN PROGRESS', color: '#5b5fc7' },
          category: { id: 'foundation', label: 'Foundation', color: '#f97316' },
          assignee: { id: 'mt', name: 'MT', fullName: 'Mike Turner', color: '#8b5cf6' },
          priority: 'High',
          priorityColor: '#fb923c',
          priorityLevel: 2,
          estimatedDuration: '9/12/24, 4am',
          startDate: '9/14/24, 4am',
          dueDate: '9/18/24, 4am',
          progress: 55,
          hasSubtasks: false
        },
        {
          id: 'task-9',
          name: 'Foundation waterproofing',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'foundation', label: 'Foundation', color: '#f97316' },
          assignee: null,
          priority: 'Normal',
          priorityColor: '#10b981',
          priorityLevel: 5,
          estimatedDuration: '9/19/24, 4am',
          startDate: '9/21/24, 4am',
          dueDate: '9/24/24, 4am',
          progress: 0,
          hasSubtasks: false
        }
      ],
      plumbing: [
        {
          id: 'task-10',
          name: 'Main water line installation',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'plumbing', label: 'Plumbing', color: '#14b8a6' },
          assignee: { id: 'jb', name: 'JB', fullName: 'John Brown', color: '#ef4444' },
          priority: 'Normal',
          priorityColor: '#10b981',
          priorityLevel: 5,
          estimatedDuration: '9/25/24, 4am',
          startDate: '9/28/24, 4am',
          dueDate: '10/2/24, 4am',
          progress: 0,
          hasSubtasks: false
        },
        {
          id: 'task-11',
          name: 'Bathroom fixtures installation',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'plumbing', label: 'Plumbing', color: '#14b8a6' },
          assignee: null,
          priority: 'Low',
          priorityColor: '#3b82f6',
          priorityLevel: 7,
          estimatedDuration: '10/5/24, 4am',
          startDate: '10/8/24, 4am',
          dueDate: '10/12/24, 4am',
          progress: 0,
          hasSubtasks: false
        }
      ],
      electrical: [
        {
          id: 'task-12',
          name: 'Main electrical panel installation',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'electrical', label: 'Electrical', color: '#c084fc' },
          assignee: { id: 'av', name: 'AV', fullName: 'Anna Violet', color: '#22c55e' },
          priority: 'High',
          priorityColor: '#fb923c',
          priorityLevel: 3,
          estimatedDuration: '9/30/24, 4am',
          startDate: '10/3/24, 4am',
          dueDate: '10/7/24, 4am',
          progress: 0,
          hasSubtasks: false
        },
        {
          id: 'task-13',
          name: 'Wiring for all floors',
          status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
          category: { id: 'electrical', label: 'Electrical', color: '#c084fc' },
          assignee: { id: 'sk', name: 'SK', fullName: 'Sarah King', color: '#f59e0b' },
          priority: 'Normal',
          priorityColor: '#10b981',
          priorityLevel: 4,
          estimatedDuration: '10/8/24, 4am',
          startDate: '10/10/24, 4am',
          dueDate: '10/15/24, 4am',
          progress: 0,
          hasSubtasks: true,
          subtasks: [
            {
              id: 'subtask-13-1',
              name: 'Ground floor wiring',
              status: { id: 'todo', label: 'TO DO', color: '#6b7280' },
              category: { id: 'electrical', label: 'Electrical', color: '#c084fc' },
              assignee: null,
              priority: 'Normal',
              priorityColor: '#10b981',
              priorityLevel: 4,
              estimatedDuration: '10/8/24, 4am',
              startDate: '10/10/24, 4am',
              dueDate: '10/11/24, 4am',
              progress: 0
            }
          ]
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
    const allGroups = Object.keys(tasks);
    if (expandedGroups.length === allGroups.length) {
      setExpandedGroups([]);
    } else {
      setExpandedGroups(allGroups);
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

  // Enhanced Progress circle component with improved design
  const ProgressCircle = ({ progress = 0, size = 28 }: { progress?: number; size?: number }) => {
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    // Determine color based on progress
    let progressColor = '#ef4444'; // red for 0-24%
    if (progress === 100) progressColor = '#10b981'; // green for complete
    else if (progress >= 75) progressColor = '#3b82f6'; // blue for 75-99%
    else if (progress >= 50) progressColor = '#8b5cf6'; // purple for 50-74%
    else if (progress >= 25) progressColor = '#f59e0b'; // amber for 25-49%

    return (
      <div style={{ 
        position: 'relative', 
        width: size, 
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg 
          width={size} 
          height={size} 
          style={{ 
            transform: 'rotate(-90deg)',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 3px ${progressColor}30)`
            }}
          />
        </svg>
        {/* Center content */}
        <div style={{
          position: 'relative',
          fontSize: progress === 100 ? '12px' : '10px',
          fontWeight: '600',
          color: progressColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(0deg)'
        }}>
          {progress === 100 ? (
            <Check style={{ width: '14px', height: '14px' }} />
          ) : (
            <span>{progress}%</span>
          )}
        </div>
      </div>
    );
  };

  const renderTask = (task: any, group: string, index: number, isSubtask: boolean = false) => {
    // Generate truly unique row ID using index to prevent duplicates
    const uniqueRowId = `${group}-${task.id}-${index}`;
    
    return (
      <tr 
        key={uniqueRowId}
        draggable={!isSubtask}
        onDragStart={(e) => !isSubtask && handleDragStart(e, task, group)}
        onDragOver={handleDragOver}
        onDrop={(e) => !isSubtask && handleDrop(e, group, index)}
        style={{ 
          borderBottom: '1px solid #f0f0f0',
          backgroundColor: 'transparent',
          transition: 'background-color 0.2s',
          cursor: !isSubtask ? 'move' : 'default'
        }}
        onMouseEnter={() => {
          // Use unique ID to prevent duplicate hover states
          setHoveredRow(uniqueRowId);
        }}
        onMouseLeave={() => setHoveredRow(null)}
      >
        <td style={{ padding: '4px 6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {!isSubtask && (
              <GripVertical style={{ width: '14px', height: '14px', color: '#d1d5db', cursor: 'grab' }} />
            )}
            <input type="checkbox" 
                   checked={selectedTasks.includes(task.id)}
                   onChange={() => toggleTaskSelection(task.id)}
                   style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
          </div>
        </td>
        <td style={{ padding: '4px 6px', paddingLeft: isSubtask ? '48px' : '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {task.hasSubtasks && !isSubtask && (
              <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {expandedTasks.includes(task.id) ? 
                  <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} /> : 
                  <ChevronRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                }
              </span>
            )}
            <ProgressCircle progress={task.progress} size={isSubtask ? 24 : 28} />
            <span 
              onClick={() => {
                // Mark subtasks with parentTaskId for proper handling
                const taskToEdit = isSubtask ? { ...task, parentTaskId: group } : task;
                setSelectedTaskForEdit(taskToEdit);
              }}
              style={{ 
                fontSize: '14px', 
                color: hoveredRow === uniqueRowId ? '#3b82f6' : isSubtask ? '#6b7280' : '#111827',
                transition: 'color 0.2s',
                fontWeight: isSubtask ? '400' : '500',
                cursor: 'pointer',
                textDecoration: hoveredRow === uniqueRowId ? 'underline' : 'none'
              }}>
              {task.name}
              {isSubtask && (
                <span style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  marginLeft: '8px',
                  fontStyle: 'italic'
                }}>
                  (subtask)
                </span>
              )}
            </span>
            
            {/* Task Quick Stats */}
            <div style={{ display: 'flex', gap: '12px', marginLeft: '12px' }}>
              {/* Subtasks */}
              {task.hasSubtasks && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Open comprehensive modal with subtasks tab selected
                    setSelectedTaskForEdit({ ...task, defaultTab: 'checklist', isManagingSubtasks: true });
                  }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#f3f4f6',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                >
                  <ListTodo style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                    {task.subtasks?.length || 0}
                  </span>
                </div>
              )}
              
              {/* Attachments */}
              {task.attachments && task.attachments.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Paperclip style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{task.attachments.length}</span>
                </div>
              )}
              
              {/* Comments */}
              {task.comments && task.comments.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MessageSquare style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{task.comments.length}</span>
                </div>
              )}
              
              {/* Checklist Progress */}
              {task.checklist && task.checklist.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle style={{ width: '14px', height: '14px', color: '#22c55e' }} />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>
                    {task.checklist.filter((c: any) => c.completed).length}/{task.checklist.length}
                  </span>
                </div>
              )}
              
              {/* Time Tracked */}
              {task.timeTracked && task.timeTracked > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{task.timeTracked}h</span>
                </div>
              )}
              
              {/* Overdue Indicator */}
              {task.isOverdue && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                  <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: '500' }}>Overdue</span>
                </div>
              )}
            </div>
            {hoveredRow === uniqueRowId && (
              <div 
                key={`actions-${uniqueRowId}`}
                style={{ 
                  display: 'flex', 
                  gap: '4px', 
                  marginLeft: 'auto'
                }}
              >
                <div 
                  title="Add Subtask"
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Open comprehensive modal for adding/managing subtasks
                    setSelectedTaskForEdit({ ...task, isManagingSubtasks: true });
                  }}
                >
                  <Plus style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                </div>
                <div 
                  title="Link Task"
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Link task functionality');
                  }}
                >
                  <Link2 style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                </div>
                <div 
                  title="Edit Task"
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTaskForEdit(task);
                  }}
                >
                  <Edit2 style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                </div>
                <div 
                  title="Delete Task"
                  style={{
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fee2e2';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirmation({
                      isOpen: true,
                      taskId: task.id,
                      taskName: task.name,
                      taskGroup: group
                    });
                  }}
                >
                  <Trash2 style={{ width: '18px', height: '18px', color: '#ef4444' }} />
                </div>
              </div>
            )}
          </div>
        </td>
        <td style={{ padding: '4px 6px', position: 'relative' }}>
          {task.status && (
            <>
              <span 
                data-status-trigger={task.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPicker('status', task.id);
                }}
                style={{
                  fontSize: '11px',
                  backgroundColor: task.status.color,
                  color: 'white',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-block',
                  letterSpacing: '0.5px'
                }}>
                {task.status.label}
              </span>
              {openPicker?.type === 'status' && openPicker.taskId === task.id && (
                <StatusPicker
                  taskId={task.id}
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
        <td style={{ padding: '4px 6px', position: 'relative' }}>
          <span 
            data-category-trigger={task.id}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPicker('category', task.id);
            }}
            style={{
              fontSize: '12px',
              backgroundColor: task.category.color,
              color: 'white',
              padding: '5px 12px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'inline-block'
            }}>
            {task.category.label}
          </span>
          {openPicker?.type === 'category' && openPicker.taskId === task.id && (
            <CategoryPicker
              taskId={task.id}
              value={task.category}
              onChange={(category: any) => {
                // Update task category
                console.log('Update category', category);
              }}
              onClose={() => setOpenPicker(null)}
            />
          )}
        </td>
        <td style={{ padding: '4px 6px', textAlign: 'center', position: 'relative' }}>
          {task.assignee ? (
            <>
              <span 
                onClick={(e) => {
                e.stopPropagation();
                handleOpenPicker('assignee', task.id);
              }}
                style={{
                  fontSize: '11px',
                  backgroundColor: task.assignee.color,
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                {task.assignee.name}
              </span>
            </>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleOpenPicker('assignee', task.id);
              }}
              style={{
                width: '32px',
                height: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              <Users style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
            </div>
          )}
          {openPicker?.type === 'assignee' && openPicker.taskId === task.id && (
            <AssigneePicker
              taskId={task.id}
              value={task.assignee}
              onChange={(assignee: any) => {
                // Update task assignee
                console.log('Update assignee', assignee);
              }}
              onClose={() => setOpenPicker(null)}
            />
          )}
        </td>
        <td style={{ padding: '4px 6px', position: 'relative' }}>
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPicker('priority', task.id);
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Flag style={{ width: '14px', height: '14px', color: task.priorityColor }} />
            <span style={{
              fontSize: '13px',
              color: task.priorityColor,
              fontWeight: '500'
            }}>
              {task.priority}
            </span>
            <span style={{ 
              fontSize: '11px', 
              color: '#9ca3af',
              backgroundColor: '#f3f4f6',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {task.priorityLevel}
            </span>
          </div>
          {openPicker?.type === 'priority' && openPicker.taskId === task.id && (
            <PriorityPicker
              taskId={task.id}
              value={task}
              onChange={(priorityData: any) => {
                // Update task priority
                console.log('Update priority', priorityData);
                // You would update the task here
                setTasks((prev: any) => {
                  const newTasks = { ...prev };
                  Object.keys(newTasks).forEach(group => {
                    newTasks[group] = newTasks[group].map((t: any) => 
                      t.id === task.id ? { ...t, ...priorityData } : t
                    );
                  });
                  return newTasks;
                });
              }}
              onClose={() => setOpenPicker(null)}
            />
          )}
        </td>
        <td style={{ padding: '4px 6px', fontSize: '13px', color: '#374151' }}>{task.estimatedDuration}</td>
        <td style={{ padding: '4px 6px', fontSize: '13px', color: '#374151' }}>{task.startDate}</td>
        <td style={{ padding: '4px 6px', fontSize: '13px', color: '#374151' }}>{task.dueDate}</td>
      </tr>
    );
  };

  return (
    <div style={{ backgroundColor: 'transparent', padding: '0', fontFamily: 'inherit', height: 'auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '8px 20px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'transparent'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
          <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'transparent' }}>
            <th style={{ padding: '6px 6px', textAlign: 'left', fontWeight: '600', color: '#374151', width: '60px' }}>
              <input type="checkbox" style={{ width: '14px', height: '14px' }} />
            </th>
            <th style={{ padding: '6px 6px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Name</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', color: '#6b7280', width: '140px' }}>Status</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', color: '#6b7280', width: '150px' }}>Activity Category</th>
            <th style={{ padding: '6px 6px', textAlign: 'center', fontWeight: '600', color: '#374151', width: '100px' }}>Assignee</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', color: '#6b7280', width: '130px' }}>Priority</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', color: '#6b7280', width: '160px' }}>Estimated Duration</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', color: '#6b7280', width: '140px' }}>Start date</th>
            <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: '500', color: '#6b7280', width: '140px' }}>Due date</th>
          </tr>
        </thead>
        <tbody>
          {/* Render groups */}
          {Object.entries(tasks).map(([groupKey, groupTasks]: [string, any]) => (
            <React.Fragment key={groupKey}>
              <tr>
                <td colSpan={9} style={{ padding: '4px 6px', backgroundColor: 'transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      onClick={() => toggleGroup(groupKey)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      title={expandedGroups.includes(groupKey) ? 'Collapse group' : 'Expand group'}
                    >
                      {expandedGroups.includes(groupKey) ? 
                        <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} /> : 
                        <ChevronRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      }
                    </button>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: '600',
                      backgroundColor: groupKey === 'planning' ? '#e91e63' : 
                                      groupKey === 'development' ? '#5b5fc7' : 
                                      groupKey === 'finalization' ? '#fbbf24' :
                                      groupKey === 'foundation' ? '#f97316' :
                                      groupKey === 'plumbing' ? '#14b8a6' :
                                      groupKey === 'electrical' ? '#c084fc' : '#6b7280',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                    </span>
                    <span style={{ 
                      fontSize: '11px', 
                      color: '#6b7280',
                      backgroundColor: 'transparent',
                      padding: '0px 4px',
                      borderRadius: '3px',
                      border: '1px solid #e5e7eb'
                    }}>
                      {groupTasks.length}
                    </span>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                      <Plus style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Add Task</span>
                    </div>
                  </div>
                </td>
              </tr>
              
              {expandedGroups.includes(groupKey) && groupTasks.map((task: any, index: number) => (
                <React.Fragment key={`${groupKey}-task-${task.id}`}>
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
      
      {/* Comprehensive Task Edit Modal (Used for both tasks and subtasks) */}
      {selectedTaskForEdit && (
        <ComprehensiveTaskModal
          isOpen={true}
          onClose={() => setSelectedTaskForEdit(null)}
          task={selectedTaskForEdit}
          onSave={(updatedTask) => {
            // Update the task
            setTasks((prev: any) => {
              const newTasks = { ...prev };
              Object.keys(newTasks).forEach(group => {
                newTasks[group] = newTasks[group].map((t: any) => 
                  t.id === selectedTaskForEdit.id ? updatedTask : t
                );
              });
              return newTasks;
            });
            setSelectedTaskForEdit(null);
          }}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, taskId: null, taskName: '', taskGroup: '' })}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete the task "${deleteConfirmation.taskName}"? This will also delete all its subtasks and cannot be undone.`}
        type="danger"
        confirmText="Delete Task"
        cancelText="Keep Task"
      />
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
};

export default ExactTasksTable;
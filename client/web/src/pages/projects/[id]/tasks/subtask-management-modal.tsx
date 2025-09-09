import React, { useState } from 'react';
import { ConfirmationDialog, useNotification } from './confirmation-dialog';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle,
  Circle,
  ChevronRight,
  ChevronDown,
  Users,
  Calendar,
  Flag,
  Paperclip,
  MessageSquare,
  Clock,
  Link2,
  GripVertical,
  Copy,
  BarChart3,
  AlertTriangle,
  FileText,
  Upload,
  Image,
  File,
  Download,
  Play,
  Pause,
  Timer
} from 'lucide-react';

interface Subtask {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee?: { id: string; name: string; color: string };
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  dueDate?: string;
  description?: string;
  attachments?: Attachment[];
  checklist?: ChecklistItem[];
  comments?: Comment[];
  timeTracked?: number;
  estimatedHours?: number;
  progress?: number;
  dependencies?: string[];
  parentTaskId?: string;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

interface SubtaskManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskName: string;
  subtasks: Subtask[];
  onUpdate: (subtasks: Subtask[]) => void;
}

export const SubtaskManagementModal: React.FC<SubtaskManagementModalProps> = ({
  isOpen,
  onClose,
  taskId,
  taskName,
  subtasks: initialSubtasks,
  onUpdate
}) => {
  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);
  const [editingSubtask, setEditingSubtask] = useState<string | null>(null);
  const [expandedSubtasks, setExpandedSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState<Partial<Subtask>>({
    name: '',
    status: 'pending',
    priority: 'Normal'
  });
  const [activeTab, setActiveTab] = useState<'list' | 'timeline' | 'dependencies'>('list');
  const [draggedSubtask, setDraggedSubtask] = useState<string | null>(null);
  const [attachmentDragActive, setAttachmentDragActive] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; subtaskId: string | null; subtaskName: string }>({
    isOpen: false,
    subtaskId: null,
    subtaskName: ''
  });
  const { showNotification, NotificationContainer } = useNotification();

  if (!isOpen) return null;

  const handleAddSubtask = () => {
    if (!newSubtask.name) return;

    const subtask: Subtask = {
      id: `subtask-${Date.now()}`,
      name: newSubtask.name,
      status: newSubtask.status || 'pending',
      priority: newSubtask.priority || 'Normal',
      description: newSubtask.description,
      assignee: newSubtask.assignee,
      dueDate: newSubtask.dueDate,
      attachments: [],
      checklist: [],
      comments: [],
      timeTracked: 0,
      estimatedHours: newSubtask.estimatedHours,
      progress: 0,
      dependencies: [],
      parentTaskId: taskId
    };

    const updatedSubtasks = [...subtasks, subtask];
    setSubtasks(updatedSubtasks);
    onUpdate(updatedSubtasks);
    setNewSubtask({ name: '', status: 'pending', priority: 'Normal' });
    showNotification(`Subtask "${subtask.name}" added successfully`, 'success');
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const subtask = subtasks.find(s => s.id === subtaskId);
    if (subtask) {
      setDeleteConfirmation({
        isOpen: true,
        subtaskId,
        subtaskName: subtask.name
      });
    }
  };

  const confirmDeleteSubtask = () => {
    if (deleteConfirmation.subtaskId) {
      const updatedSubtasks = subtasks.filter(s => s.id !== deleteConfirmation.subtaskId);
      setSubtasks(updatedSubtasks);
      onUpdate(updatedSubtasks);
      showNotification(`Subtask "${deleteConfirmation.subtaskName}" deleted successfully`, 'success');
    }
  };

  const handleUpdateSubtask = (subtaskId: string, updates: Partial<Subtask>) => {
    const updatedSubtasks = subtasks.map(s =>
      s.id === subtaskId ? { ...s, ...updates } : s
    );
    setSubtasks(updatedSubtasks);
    onUpdate(updatedSubtasks);
  };

  const toggleSubtaskExpansion = (subtaskId: string) => {
    setExpandedSubtasks(prev =>
      prev.includes(subtaskId)
        ? prev.filter(id => id !== subtaskId)
        : [...prev, subtaskId]
    );
  };

  const handleFileUpload = (subtaskId: string, files: FileList | null) => {
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map(file => ({
      id: `attach-${Date.now()}-${Math.random()}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      uploadedBy: 'current-user'
    }));

    const subtask = subtasks.find(s => s.id === subtaskId);
    if (subtask) {
      handleUpdateSubtask(subtaskId, {
        attachments: [...(subtask.attachments || []), ...newAttachments]
      });
    }
  };

  const handleDragStart = (subtaskId: string) => {
    setDraggedSubtask(subtaskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedSubtask || draggedSubtask === targetId) return;

    const draggedIndex = subtasks.findIndex(s => s.id === draggedSubtask);
    const targetIndex = subtasks.findIndex(s => s.id === targetId);

    const newSubtasks = [...subtasks];
    const [removed] = newSubtasks.splice(draggedIndex, 1);
    newSubtasks.splice(targetIndex, 0, removed);

    setSubtasks(newSubtasks);
    onUpdate(newSubtasks);
    setDraggedSubtask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return '#ef4444';
      case 'High': return '#fb923c';
      case 'Normal': return '#10b981';
      case 'Low': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#5b5fc7';
      case 'pending': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const renderSubtaskRow = (subtask: Subtask) => {
    const isExpanded = expandedSubtasks.includes(subtask.id);
    const isEditing = editingSubtask === subtask.id;

    return (
      <div
        key={subtask.id}
        draggable
        onDragStart={() => handleDragStart(subtask.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, subtask.id)}
        style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '8px',
          transition: 'all 0.2s',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtask Indicator Strip */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: getStatusColor(subtask.status),
          transition: 'background-color 0.3s'
        }} />
        
        {/* Main Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 12px 12px 16px',
          gap: '12px',
          backgroundColor: subtask.status === 'completed' ? 'rgba(34, 197, 94, 0.05)' : 'transparent',
          transition: 'background-color 0.3s'
        }}>
          <GripVertical style={{ width: '16px', height: '16px', color: '#d1d5db', cursor: 'grab' }} />
          
          <button
            onClick={() => toggleSubtaskExpansion(subtask.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isExpanded ? (
              <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} />
            ) : (
              <ChevronRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
            )}
          </button>

          <button
            onClick={() => handleUpdateSubtask(subtask.id, {
              status: subtask.status === 'completed' ? 'pending' : 'completed'
            })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            {subtask.status === 'completed' ? (
              <CheckCircle style={{ width: '20px', height: '20px', color: '#22c55e', filter: 'drop-shadow(0 1px 2px rgba(34, 197, 94, 0.2))' }} />
            ) : (
              <Circle style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
            )}
          </button>

          {isEditing ? (
            <input
              type="text"
              value={subtask.name}
              onChange={(e) => handleUpdateSubtask(subtask.id, { name: e.target.value })}
              style={{
                flex: 1,
                padding: '4px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              autoFocus
            />
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{
                fontSize: '14px',
                color: subtask.status === 'completed' ? '#6b7280' : '#111827',
                textDecoration: subtask.status === 'completed' ? 'line-through' : 'none',
                fontWeight: '500'
              }}>
                {subtask.name}
              </span>
              <span style={{
                fontSize: '11px',
                color: '#9ca3af',
                fontStyle: 'italic'
              }}>
                Subtask of: {taskName}
              </span>
            </div>
          )}

          {/* Status Badge */}
          <select
            value={subtask.status}
            onChange={(e) => handleUpdateSubtask(subtask.id, { status: e.target.value as any })}
            style={{
              padding: '4px 8px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              border: 'none',
              backgroundColor: getStatusColor(subtask.status),
              color: 'white',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            <option value="pending">PENDING</option>
            <option value="in-progress">IN PROGRESS</option>
            <option value="completed">COMPLETED</option>
          </select>

          {/* Priority */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Flag style={{ width: '14px', height: '14px', color: getPriorityColor(subtask.priority) }} />
            <select
              value={subtask.priority}
              onChange={(e) => handleUpdateSubtask(subtask.id, { priority: e.target.value as any })}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '12px',
                color: getPriorityColor(subtask.priority),
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Assignee */}
          {subtask.assignee ? (
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: subtask.assignee.color,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '600'
            }}>
              {subtask.assignee.name}
            </span>
          ) : (
            <button
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Users style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
            </button>
          )}

          {/* Due Date */}
          {subtask.dueDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar style={{ width: '14px', height: '14px', color: '#6b7280' }} />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{subtask.dueDate}</span>
            </div>
          )}

          {/* Quick Stats */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {subtask.attachments && subtask.attachments.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Paperclip style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{subtask.attachments.length}</span>
              </div>
            )}
            {subtask.comments && subtask.comments.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MessageSquare style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{subtask.comments.length}</span>
              </div>
            )}
            {subtask.checklist && subtask.checklist.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {subtask.checklist.filter(c => c.completed).length}/{subtask.checklist.length}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setEditingSubtask(isEditing ? null : subtask.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              {isEditing ? (
                <Save style={{ width: '16px', height: '16px', color: '#22c55e' }} />
              ) : (
                <Edit2 style={{ width: '16px', height: '16px', color: '#6b7280' }} />
              )}
            </button>
            <button
              onClick={() => handleDeleteSubtask(subtask.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <Trash2 style={{ width: '16px', height: '16px', color: '#ef4444' }} />
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div style={{
            borderTop: '1px solid #e5e7eb',
            padding: '16px',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Left Column */}
              <div>
                {/* Description */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                    Description
                  </label>
                  <textarea
                    value={subtask.description || ''}
                    onChange={(e) => handleUpdateSubtask(subtask.id, { description: e.target.value })}
                    placeholder="Add a description..."
                    style={{
                      width: '100%',
                      minHeight: '80px',
                      padding: '8px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '13px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Time Tracking */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                    Time Tracking
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        value={subtask.estimatedHours || ''}
                        onChange={(e) => handleUpdateSubtask(subtask.id, { estimatedHours: Number(e.target.value) })}
                        placeholder="Est. hours"
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '4px',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        padding: '6px 8px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        fontSize: '13px',
                        color: '#374151'
                      }}>
                        {subtask.timeTracked || 0}h tracked
                      </div>
                    </div>
                    <button
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#5b5fc7',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Timer style={{ width: '14px', height: '14px' }} />
                      Track
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                    Progress: {subtask.progress || 0}%
                  </label>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${subtask.progress || 0}%`,
                      backgroundColor: '#22c55e',
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={subtask.progress || 0}
                    onChange={(e) => handleUpdateSubtask(subtask.id, { progress: Number(e.target.value) })}
                    style={{ width: '100%', marginTop: '8px' }}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Attachments */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                    Attachments ({subtask.attachments?.length || 0})
                  </label>
                  <div
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setAttachmentDragActive(subtask.id);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setAttachmentDragActive(null);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      setAttachmentDragActive(null);
                      handleFileUpload(subtask.id, e.dataTransfer.files);
                    }}
                    style={{
                      border: `2px dashed ${attachmentDragActive === subtask.id ? '#5b5fc7' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      padding: '16px',
                      textAlign: 'center',
                      backgroundColor: attachmentDragActive === subtask.id ? '#f0f1ff' : 'white',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(subtask.id, e.target.files)}
                      style={{ display: 'none' }}
                      id={`file-upload-${subtask.id}`}
                    />
                    <label htmlFor={`file-upload-${subtask.id}`} style={{ cursor: 'pointer' }}>
                      <Upload style={{ width: '24px', height: '24px', color: '#9ca3af', margin: '0 auto 8px' }} />
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        Drop files here or click to upload
                      </div>
                    </label>
                  </div>
                  {subtask.attachments && subtask.attachments.length > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      {subtask.attachments.map(attachment => (
                        <div key={attachment.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '4px',
                          marginBottom: '4px'
                        }}>
                          {attachment.type.startsWith('image/') ? (
                            <Image style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                          ) : (
                            <File style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                          )}
                          <span style={{ flex: 1, fontSize: '12px', color: '#374151' }}>{attachment.name}</span>
                          <Download style={{ width: '14px', height: '14px', color: '#6b7280', cursor: 'pointer' }} />
                          <Trash2
                            style={{ width: '14px', height: '14px', color: '#ef4444', cursor: 'pointer' }}
                            onClick={() => {
                              const updatedAttachments = subtask.attachments?.filter(a => a.id !== attachment.id) || [];
                              handleUpdateSubtask(subtask.id, { attachments: updatedAttachments });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Checklist */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                    Checklist ({subtask.checklist?.filter(c => c.completed).length || 0}/{subtask.checklist?.length || 0})
                  </label>
                  <div style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '8px'
                  }}>
                    {subtask.checklist?.map(item => (
                      <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '6px'
                      }}>
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => {
                            const updatedChecklist = subtask.checklist?.map(c =>
                              c.id === item.id ? { ...c, completed: e.target.checked } : c
                            ) || [];
                            handleUpdateSubtask(subtask.id, { checklist: updatedChecklist });
                          }}
                        />
                        <span style={{
                          flex: 1,
                          fontSize: '13px',
                          color: '#374151',
                          textDecoration: item.completed ? 'line-through' : 'none'
                        }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newItem: ChecklistItem = {
                          id: `checklist-${Date.now()}`,
                          text: 'New checklist item',
                          completed: false
                        };
                        const updatedChecklist = [...(subtask.checklist || []), newItem];
                        handleUpdateSubtask(subtask.id, { checklist: updatedChecklist });
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#5b5fc7',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus style={{ width: '14px', height: '14px' }} />
                      Add item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
              Subtask Management
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {taskName} • {subtasks.length} subtasks
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '24px',
          padding: '0 24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          {(['list', 'timeline', 'dependencies'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #5b5fc7' : '2px solid transparent',
                color: activeTab === tab ? '#5b5fc7' : '#6b7280',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab === 'list' && 'List View'}
              {tab === 'timeline' && 'Timeline'}
              {tab === 'dependencies' && 'Dependencies'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto'
        }}>
          {activeTab === 'list' && (
            <>
              {/* Add New Subtask */}
              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  Add New Subtask
                </h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={newSubtask.name || ''}
                      onChange={(e) => setNewSubtask({ ...newSubtask, name: e.target.value })}
                      placeholder="Enter subtask name..."
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                      Priority
                    </label>
                    <select
                      value={newSubtask.priority}
                      onChange={(e) => setNewSubtask({ ...newSubtask, priority: e.target.value as any })}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newSubtask.dueDate || ''}
                      onChange={(e) => setNewSubtask({ ...newSubtask, dueDate: e.target.value })}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <button
                    onClick={handleAddSubtask}
                    style={{
                      padding: '8px 20px',
                      backgroundColor: '#5b5fc7',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} />
                    Add Subtask
                  </button>
                </div>
              </div>

              {/* Subtask List */}
              <div>
                {subtasks.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '48px',
                    color: '#6b7280'
                  }}>
                    <FileText style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '16px', marginBottom: '8px' }}>No subtasks yet</p>
                    <p style={{ fontSize: '14px' }}>Add subtasks to break down this task into smaller pieces</p>
                  </div>
                ) : (
                  subtasks.map(renderSubtaskRow)
                )}
              </div>
            </>
          )}

          {activeTab === 'timeline' && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
              <BarChart3 style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
              <p>Timeline view coming soon</p>
            </div>
          )}

          {activeTab === 'dependencies' && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
              <Link2 style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
              <p>Dependencies view coming soon</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
            <span>{subtasks.filter(s => s.status === 'completed').length} completed</span>
            <span>{subtasks.filter(s => s.status === 'in-progress').length} in progress</span>
            <span>{subtasks.filter(s => s.status === 'pending').length} pending</span>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              backgroundColor: '#5b5fc7',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, subtaskId: null, subtaskName: '' })}
        onConfirm={confirmDeleteSubtask}
        title="Delete Subtask"
        message={`Are you sure you want to delete the subtask "${deleteConfirmation.subtaskName}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete Subtask"
        cancelText="Keep Subtask"
      />
      
      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
};
import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Paperclip,
  MessageSquare,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download,
  Trash2,
  Edit2,
  Save,
  Plus,
  Timer,
  Play,
  Pause,
  FileText,
  Image,
  File,
  Send,
  User,
  Tag,
  Flag,
  Target,
  GitBranch,
  Link2,
  Info,
  BarChart3
} from 'lucide-react';
import { ChecklistItemDetail, ChecklistAttachment, ChecklistComment } from './comprehensive-checklist-templates';

interface ChecklistItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ChecklistItemDetail;
  onUpdate: (updatedItem: ChecklistItemDetail) => void;
}

export const ChecklistItemDetailModal: React.FC<ChecklistItemDetailModalProps> = ({
  isOpen,
  onClose,
  item,
  onUpdate
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'attachments' | 'comments' | 'time' | 'verification'>('details');
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState<ChecklistItemDetail>(item);
  const [newComment, setNewComment] = useState('');
  const [newTimeEntry, setNewTimeEntry] = useState({ hours: 0, notes: '' });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [attachmentDragActive, setAttachmentDragActive] = useState(false);

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newAttachments: ChecklistAttachment[] = Array.from(files).map(file => ({
      id: `attach-${Date.now()}-${Math.random()}`,
      name: file.name,
      url: URL.createObjectURL(file), // In production, upload to server
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      uploadedBy: 'current-user' // Get from auth context
    }));

    const updatedItem = {
      ...editedItem,
      attachments: [...(editedItem.attachments || []), ...newAttachments]
    };
    setEditedItem(updatedItem);
    onUpdate(updatedItem);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAttachmentDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAttachmentDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAttachmentDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  // Add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: ChecklistComment = {
      id: `comment-${Date.now()}`,
      text: newComment,
      createdAt: new Date(),
      createdBy: 'current-user',
      createdByName: 'Current User', // Get from auth context
      createdByAvatar: undefined
    };

    const updatedItem = {
      ...editedItem,
      comments: [...(editedItem.comments || []), comment]
    };
    setEditedItem(updatedItem);
    onUpdate(updatedItem);
    setNewComment('');
  };

  // Add time entry
  const handleAddTimeEntry = () => {
    if (newTimeEntry.hours <= 0) return;
    
    const entry = {
      startTime: new Date(),
      endTime: new Date(Date.now() + newTimeEntry.hours * 3600000),
      duration: newTimeEntry.hours,
      user: 'current-user',
      notes: newTimeEntry.notes
    };

    const updatedItem = {
      ...editedItem,
      timeEntries: [...(editedItem.timeEntries || []), entry],
      actualHours: (editedItem.actualHours || 0) + newTimeEntry.hours
    };
    setEditedItem(updatedItem);
    onUpdate(updatedItem);
    setNewTimeEntry({ hours: 0, notes: '' });
  };

  // Save changes
  const handleSave = () => {
    onUpdate(editedItem);
    setEditMode(false);
  };

  // Delete attachment
  const handleDeleteAttachment = (attachmentId: string) => {
    const updatedItem = {
      ...editedItem,
      attachments: editedItem.attachments?.filter(a => a.id !== attachmentId)
    };
    setEditedItem(updatedItem);
    onUpdate(updatedItem);
  };

  // Delete comment
  const handleDeleteComment = (commentId: string) => {
    const updatedItem = {
      ...editedItem,
      comments: editedItem.comments?.filter(c => c.id !== commentId)
    };
    setEditedItem(updatedItem);
    onUpdate(updatedItem);
  };

  // Timer functionality
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    const hours = timerSeconds / 3600;
    setNewTimeEntry({ hours: parseFloat(hours.toFixed(2)), notes: 'Timer tracked' });
    setTimerSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

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
      zIndex: 10001
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '1200px',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start'
        }}>
          <div style={{ flex: 1 }}>
            {editMode ? (
              <input
                type="text"
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  width: '100%',
                  marginBottom: '8px'
                }}
              />
            ) : (
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                {item.title}
              </h2>
            )}
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {item.mandatory && (
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  MANDATORY
                </span>
              )}
              {item.critical && (
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  backgroundColor: '#fef2f2',
                  color: '#b91c1c',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  CRITICAL
                </span>
              )}
              {item.requiresVerification && (
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  borderRadius: '4px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}>
                  <Shield style={{ width: '10px', height: '10px' }} />
                  REQUIRES VERIFICATION
                </span>
              )}
              {item.status && (
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  backgroundColor: 
                    item.status === 'completed' ? '#dcfce7' :
                    item.status === 'verified' ? '#dbeafe' :
                    item.status === 'in_progress' ? '#fef3c7' :
                    item.status === 'failed' ? '#fee2e2' : '#f3f4f6',
                  color: 
                    item.status === 'completed' ? '#166534' :
                    item.status === 'verified' ? '#1e40af' :
                    item.status === 'in_progress' ? '#92400e' :
                    item.status === 'failed' ? '#dc2626' : '#374151',
                  borderRadius: '4px',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {item.status.replace('_', ' ')}
                </span>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Edit2 style={{ width: '14px', height: '14px' }} />
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Save style={{ width: '14px', height: '14px' }} />
                Save
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px'
              }}
            >
              <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          padding: '0 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          gap: '24px',
          backgroundColor: '#f9fafb'
        }}>
          {[
            { id: 'details', label: 'Details', icon: Info },
            { id: 'attachments', label: `Attachments (${editedItem.attachments?.length || 0})`, icon: Paperclip },
            { id: 'comments', label: `Comments (${editedItem.comments?.length || 0})`, icon: MessageSquare },
            { id: 'time', label: 'Time Tracking', icon: Clock },
            { id: 'verification', label: 'Verification', icon: Shield }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 0',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #7c3aed' : '2px solid transparent',
                color: activeTab === tab.id ? '#7c3aed' : '#6b7280',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
            >
              <tab.icon style={{ width: '16px', height: '16px' }} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Description */}
              <div>
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                  Description
                </label>
                {editMode ? (
                  <textarea
                    value={editedItem.description || ''}
                    onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                    {item.description || 'No description provided'}
                  </p>
                )}
              </div>

              {/* Dates and Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Start Date
                  </label>
                  {editMode ? (
                    <input
                      type="date"
                      value={editedItem.startDate ? new Date(editedItem.startDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => setEditedItem({ ...editedItem, startDate: new Date(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      {item.startDate ? new Date(item.startDate).toLocaleDateString() : 'Not set'}
                    </p>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Due Date
                  </label>
                  {editMode ? (
                    <input
                      type="date"
                      value={editedItem.dueDate ? new Date(editedItem.dueDate).toISOString().split('T')[0] : ''}
                      onChange={(e) => setEditedItem({ ...editedItem, dueDate: new Date(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'Not set'}
                    </p>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Estimated Hours
                  </label>
                  {editMode ? (
                    <input
                      type="number"
                      value={editedItem.estimatedHours || ''}
                      onChange={(e) => setEditedItem({ ...editedItem, estimatedHours: parseFloat(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>
                      {item.estimatedHours || 0} hours
                    </p>
                  )}
                </div>
              </div>

              {/* Rich Metadata - Standards, Specifications, Acceptance Criteria */}
              <div>
                {/* Standards */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Standards (e.g., IS codes, NBC standards)
                  </label>
                  {editMode ? (
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          placeholder="Add a standard (e.g., IS 456:2000)"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const value = (e.target as HTMLInputElement).value;
                              if (value) {
                                setEditedItem({
                                  ...editedItem,
                                  standards: [...(editedItem.standards || []), value]
                                });
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px'
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              setEditedItem({
                                ...editedItem,
                                standards: [...(editedItem.standards || []), input.value]
                              });
                              input.value = '';
                            }
                          }}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {editedItem.standards?.map((standard, idx) => (
                          <span key={idx} style={{
                            padding: '4px 8px',
                            backgroundColor: '#e0e7ff',
                            color: '#4338ca',
                            borderRadius: '4px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {standard}
                            <button
                              onClick={() => setEditedItem({
                                ...editedItem,
                                standards: editedItem.standards?.filter((_, i) => i !== idx)
                              })}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#4338ca',
                                cursor: 'pointer',
                                padding: '0',
                                marginLeft: '4px'
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.standards?.length ? item.standards.map((standard, idx) => (
                        <span key={idx} style={{
                          padding: '4px 8px',
                          backgroundColor: '#e0e7ff',
                          color: '#4338ca',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {standard}
                        </span>
                      )) : (
                        <span style={{ fontSize: '13px', color: '#9ca3af' }}>No standards specified</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Specifications */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Specifications
                  </label>
                  {editMode ? (
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          placeholder="Add a specification"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const value = (e.target as HTMLInputElement).value;
                              if (value) {
                                setEditedItem({
                                  ...editedItem,
                                  specifications: [...(editedItem.specifications || []), value]
                                });
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px'
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              setEditedItem({
                                ...editedItem,
                                specifications: [...(editedItem.specifications || []), input.value]
                              });
                              input.value = '';
                            }
                          }}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        {editedItem.specifications?.map((spec, idx) => (
                          <li key={idx} style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ flex: 1 }}>{spec}</span>
                            <button
                              onClick={() => setEditedItem({
                                ...editedItem,
                                specifications: editedItem.specifications?.filter((_, i) => i !== idx)
                              })}
                              style={{
                                padding: '2px 6px',
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '11px',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {item.specifications?.length ? item.specifications.map((spec, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                          {spec}
                        </li>
                      )) : (
                        <li style={{ fontSize: '13px', color: '#9ca3af', listStyle: 'none', marginLeft: '-20px' }}>No specifications added</li>
                      )}
                    </ul>
                  )}
                </div>

                {/* Acceptance Criteria */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Acceptance Criteria
                  </label>
                  {editMode ? (
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          placeholder="Add acceptance criteria"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              const value = (e.target as HTMLInputElement).value;
                              if (value) {
                                setEditedItem({
                                  ...editedItem,
                                  acceptanceCriteria: [...(editedItem.acceptanceCriteria || []), value]
                                });
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px'
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              setEditedItem({
                                ...editedItem,
                                acceptanceCriteria: [...(editedItem.acceptanceCriteria || []), input.value]
                              });
                              input.value = '';
                            }
                          }}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            cursor: 'pointer'
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        {editedItem.acceptanceCriteria?.map((criteria, idx) => (
                          <li key={idx} style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ flex: 1 }}>{criteria}</span>
                            <button
                              onClick={() => setEditedItem({
                                ...editedItem,
                                acceptanceCriteria: editedItem.acceptanceCriteria?.filter((_, i) => i !== idx)
                              })}
                              style={{
                                padding: '2px 6px',
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '11px',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {item.acceptanceCriteria?.length ? item.acceptanceCriteria.map((criteria, idx) => (
                        <li key={idx} style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                          {criteria}
                        </li>
                      )) : (
                        <li style={{ fontSize: '13px', color: '#9ca3af', listStyle: 'none', marginLeft: '-20px' }}>No acceptance criteria defined</li>
                      )}
                    </ul>
                  )}
                </div>

                {/* Risk Level and Priority */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Risk Level
                    </label>
                    {editMode ? (
                      <select
                        value={editedItem.riskLevel || 'low'}
                        onChange={(e) => setEditedItem({ ...editedItem, riskLevel: e.target.value as any })}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    ) : (
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: 
                          item.riskLevel === 'critical' ? '#fee2e2' :
                          item.riskLevel === 'high' ? '#fef3c7' :
                          item.riskLevel === 'medium' ? '#fed7aa' : '#dcfce7',
                        color: 
                          item.riskLevel === 'critical' ? '#dc2626' :
                          item.riskLevel === 'high' ? '#ea580c' :
                          item.riskLevel === 'medium' ? '#d97706' : '#16a34a',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {item.riskLevel || 'Low'}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Priority
                    </label>
                    {editMode ? (
                      <select
                        value={editedItem.priority || 'low'}
                        onChange={(e) => setEditedItem({ ...editedItem, priority: e.target.value as any })}
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    ) : (
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: 
                          item.priority === 'urgent' ? '#fee2e2' :
                          item.priority === 'high' ? '#fef3c7' :
                          item.priority === 'medium' ? '#e0e7ff' : '#f3f4f6',
                        color: 
                          item.priority === 'urgent' ? '#dc2626' :
                          item.priority === 'high' ? '#ea580c' :
                          item.priority === 'medium' ? '#4338ca' : '#6b7280',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>
                        {item.priority || 'Low'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attachments Tab */}
          {activeTab === 'attachments' && (
            <div>
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${attachmentDragActive ? '#7c3aed' : '#d1d5db'}`,
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  backgroundColor: attachmentDragActive ? '#f3f0ff' : '#f9fafb',
                  marginBottom: '24px',
                  transition: 'all 0.2s'
                }}
              >
                <Upload style={{ width: '48px', height: '48px', color: '#9ca3af', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#7c3aed',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}
                >
                  Browse Files
                </label>
              </div>

              {/* Attachments List */}
              <div style={{ display: 'grid', gap: '12px' }}>
                {editedItem.attachments?.map(attachment => (
                  <div
                    key={attachment.id}
                    style={{
                      padding: '12px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <FileText style={{ width: '24px', height: '24px', color: '#6b7280' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                        {attachment.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>
                        {(attachment.size / 1024).toFixed(2)} KB • Uploaded {new Date(attachment.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          padding: '6px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Download style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                      <button
                        onClick={() => handleDeleteAttachment(attachment.id)}
                        style={{
                          padding: '6px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {(!editedItem.attachments || editedItem.attachments.length === 0) && (
                <div style={{
                  padding: '48px',
                  textAlign: 'center',
                  color: '#9ca3af'
                }}>
                  <Paperclip style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#d1d5db' }} />
                  <p style={{ fontSize: '14px' }}>No attachments yet</p>
                </div>
              )}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div>
              {/* Add Comment */}
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical',
                    marginBottom: '12px'
                  }}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: newComment.trim() ? '#7c3aed' : '#e5e7eb',
                    color: newComment.trim() ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Send style={{ width: '14px', height: '14px' }} />
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {editedItem.comments?.map(comment => (
                  <div
                    key={comment.id}
                    style={{
                      padding: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#e0e7ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <User style={{ width: '16px', height: '16px', color: '#4338ca' }} />
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                            {comment.createdByName}
                          </p>
                          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        style={{
                          padding: '4px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                      </button>
                    </div>
                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

              {(!editedItem.comments || editedItem.comments.length === 0) && (
                <div style={{
                  padding: '48px',
                  textAlign: 'center',
                  color: '#9ca3af'
                }}>
                  <MessageSquare style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#d1d5db' }} />
                  <p style={{ fontSize: '14px' }}>No comments yet</p>
                </div>
              )}
            </div>
          )}

          {/* Time Tracking Tab */}
          {activeTab === 'time' && (
            <div>
              {/* Timer */}
              <div style={{
                padding: '20px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '32px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                  {formatTime(timerSeconds)}
                </h3>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  {!isTimerRunning ? (
                    <button
                      onClick={() => setIsTimerRunning(true)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Play style={{ width: '16px', height: '16px' }} />
                      Start Timer
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsTimerRunning(false)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Pause style={{ width: '16px', height: '16px' }} />
                        Pause
                      </button>
                      <button
                        onClick={handleStopTimer}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Timer style={{ width: '16px', height: '16px' }} />
                        Stop & Log
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Manual Time Entry */}
              <div style={{
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                  Manual Time Entry
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="number"
                    value={newTimeEntry.hours}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, hours: parseFloat(e.target.value) })}
                    placeholder="Hours"
                    step="0.25"
                    style={{
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <input
                    type="text"
                    value={newTimeEntry.notes}
                    onChange={(e) => setNewTimeEntry({ ...newTimeEntry, notes: e.target.value })}
                    placeholder="Notes (optional)"
                    style={{
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                <button
                  onClick={handleAddTimeEntry}
                  disabled={newTimeEntry.hours <= 0}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: newTimeEntry.hours > 0 ? '#7c3aed' : '#e5e7eb',
                    color: newTimeEntry.hours > 0 ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: newTimeEntry.hours > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus style={{ width: '14px', height: '14px' }} />
                  Add Time Entry
                </button>
              </div>

              {/* Time Summary */}
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                  Time Summary
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Estimated</p>
                    <p style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>
                      {editedItem.estimatedHours || 0}h
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Actual</p>
                    <p style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>
                      {editedItem.actualHours || 0}h
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Variance</p>
                    <p style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: (editedItem.actualHours || 0) > (editedItem.estimatedHours || 0) ? '#ef4444' : '#10b981'
                    }}>
                      {((editedItem.actualHours || 0) - (editedItem.estimatedHours || 0)).toFixed(1)}h
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Entries */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                  Time Entries
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {editedItem.timeEntries?.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          {entry.duration}h - {new Date(entry.startTime).toLocaleDateString()}
                        </p>
                        {entry.notes && (
                          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <div>
              {/* Verification Settings */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Shield style={{ width: '20px', height: '20px', color: '#7c3aed' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    Verification Settings
                  </h3>
                </div>
                
                {editMode ? (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input
                          type="checkbox"
                          checked={editedItem.requiresVerification || false}
                          onChange={(e) => setEditedItem({ ...editedItem, requiresVerification: e.target.checked })}
                        />
                        Requires Verification
                      </label>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginLeft: '24px' }}>
                        This item must be verified by an authorized person after completion
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '12px',
                    backgroundColor: item.requiresVerification ? '#fef3c7' : '#f3f4f6',
                    borderRadius: '6px'
                  }}>
                    <p style={{ fontSize: '14px', color: item.requiresVerification ? '#92400e' : '#6b7280' }}>
                      {item.requiresVerification ? 'This item requires verification after completion' : 'This item does not require verification'}
                    </p>
                  </div>
                )}
              </div>

              {/* Verification Workflow */}
              {item.requiresVerification && (
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                    Verification Workflow
                  </h4>
                  
                  {/* Status Timeline */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      {[
                        { status: 'pending', label: 'Pending', icon: Clock },
                        { status: 'in_progress', label: 'In Progress', icon: Timer },
                        { status: 'completed', label: 'Completed', icon: CheckCircle },
                        { status: 'verified', label: 'Verified', icon: Shield }
                      ].map((stage, idx) => (
                        <div key={stage.status} style={{ flex: 1, position: 'relative' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: 
                                (item.status === 'verified' && idx <= 3) ||
                                (item.status === 'completed' && idx <= 2) ||
                                (item.status === 'in_progress' && idx <= 1) ||
                                (item.status === 'pending' && idx === 0)
                                  ? '#7c3aed' : '#e5e7eb',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '8px'
                            }}>
                              <stage.icon style={{ 
                                width: '20px', 
                                height: '20px', 
                                color: 
                                  (item.status === 'verified' && idx <= 3) ||
                                  (item.status === 'completed' && idx <= 2) ||
                                  (item.status === 'in_progress' && idx <= 1) ||
                                  (item.status === 'pending' && idx === 0)
                                    ? 'white' : '#9ca3af'
                              }} />
                            </div>
                            <span style={{ 
                              fontSize: '12px', 
                              fontWeight: '500',
                              color: 
                                (item.status === 'verified' && idx <= 3) ||
                                (item.status === 'completed' && idx <= 2) ||
                                (item.status === 'in_progress' && idx <= 1) ||
                                (item.status === 'pending' && idx === 0)
                                  ? '#7c3aed' : '#9ca3af'
                            }}>
                              {stage.label}
                            </span>
                          </div>
                          {idx < 3 && (
                            <div style={{
                              position: 'absolute',
                              top: '20px',
                              left: '50%',
                              width: 'calc(100% - 40px)',
                              height: '2px',
                              backgroundColor: 
                                (item.status === 'verified' && idx < 3) ||
                                (item.status === 'completed' && idx < 2) ||
                                (item.status === 'in_progress' && idx < 1)
                                  ? '#7c3aed' : '#e5e7eb'
                            }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Actions */}
                  {item.status === 'completed' && !item.verifiedDate && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#92400e', marginBottom: '12px' }}>
                        Verification Required
                      </h4>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                          Verification Type
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            marginBottom: '12px'
                          }}
                        >
                          <option value="visual">Visual Inspection</option>
                          <option value="measurement">Measurement Verification</option>
                          <option value="testing">Testing & Validation</option>
                          <option value="documentation">Documentation Review</option>
                          <option value="compliance">Compliance Check</option>
                        </select>
                        
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                          Verification Notes
                        </label>
                        <textarea
                          placeholder="Enter verification details, observations, or issues found..."
                          rows={4}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical',
                            marginBottom: '12px'
                          }}
                        />
                        
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                          Verification Result
                        </label>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="radio" name="result" value="pass" defaultChecked />
                            <span style={{ fontSize: '13px' }}>Pass</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="radio" name="result" value="pass-with-notes" />
                            <span style={{ fontSize: '13px' }}>Pass with Notes</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input type="radio" name="result" value="fail" />
                            <span style={{ fontSize: '13px' }}>Fail</span>
                          </label>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <button
                            onClick={() => {
                              const notes = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || '';
                              const updatedItem = {
                                ...editedItem,
                                status: 'verified' as const,
                                verifiedBy: 'current-user',
                                verifiedByName: 'Current User',
                                verifiedDate: new Date(),
                                verificationNotes: notes
                              };
                              setEditedItem(updatedItem);
                              onUpdate(updatedItem);
                            }}
                            style={{
                              flex: 1,
                              padding: '10px',
                              backgroundColor: '#10b981',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px'
                            }}
                          >
                            <CheckCircle style={{ width: '16px', height: '16px' }} />
                            Verify & Approve
                          </button>
                          <button
                            onClick={() => {
                              const updatedItem = {
                                ...editedItem,
                                status: 'failed' as const,
                                failureReason: 'Verification failed'
                              };
                              setEditedItem(updatedItem);
                              onUpdate(updatedItem);
                            }}
                            style={{
                              flex: 1,
                              padding: '10px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px'
                            }}
                          >
                            <X style={{ width: '16px', height: '16px' }} />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Verification History */}
                  {item.verifiedDate && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <CheckCircle style={{ width: '24px', height: '24px', color: '#10b981' }} />
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#166534' }}>
                          Verification Complete
                        </h4>
                      </div>
                      
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#166534', fontWeight: '500' }}>Verified By:</span>
                          <p style={{ fontSize: '14px', color: '#166534' }}>{item.verifiedByName}</p>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#166534', fontWeight: '500' }}>Verification Date:</span>
                          <p style={{ fontSize: '14px', color: '#166534' }}>
                            {new Date(item.verifiedDate).toLocaleString()}
                          </p>
                        </div>
                        {item.verificationNotes && (
                          <div>
                            <span style={{ fontSize: '12px', color: '#166534', fontWeight: '500' }}>Verification Notes:</span>
                            <p style={{ fontSize: '14px', color: '#166534', marginTop: '4px' }}>
                              {item.verificationNotes}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {editMode && (
                        <button
                          onClick={() => {
                            const updatedItem = {
                              ...editedItem,
                              status: 'completed' as const,
                              verifiedBy: undefined,
                              verifiedByName: undefined,
                              verifiedDate: undefined,
                              verificationNotes: undefined
                            };
                            setEditedItem(updatedItem);
                            onUpdate(updatedItem);
                          }}
                          style={{
                            marginTop: '12px',
                            padding: '8px 12px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Revoke Verification
                        </button>
                      )}
                    </div>
                  )}

                  {/* Failed Verification */}
                  {item.status === 'failed' && (
                    <div style={{
                      padding: '20px',
                      backgroundColor: '#fee2e2',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <AlertTriangle style={{ width: '24px', height: '24px', color: '#dc2626' }} />
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#dc2626' }}>
                          Verification Failed
                        </h4>
                      </div>
                      
                      {item.failureReason && (
                        <p style={{ fontSize: '14px', color: '#dc2626', marginBottom: '12px' }}>
                          Reason: {item.failureReason}
                        </p>
                      )}
                      
                      {item.correctiveAction && (
                        <div>
                          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '500' }}>Corrective Action Required:</span>
                          <p style={{ fontSize: '14px', color: '#dc2626', marginTop: '4px' }}>
                            {item.correctiveAction}
                          </p>
                        </div>
                      )}
                      
                      <button
                        onClick={() => {
                          const updatedItem = {
                            ...editedItem,
                            status: 'in_progress' as const,
                            failureReason: undefined,
                            correctiveAction: undefined
                          };
                          setEditedItem(updatedItem);
                          onUpdate(updatedItem);
                        }}
                        style={{
                          marginTop: '12px',
                          padding: '8px 12px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Retry Task
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { 
  getTemplatesByType,
  getTemplatesByCategory,
  getTemplateById,
  searchTemplates,
  getTemplateCategories,
  getTemplateTypes,
  createChecklistFromTemplate,
  calculateChecklistProgress,
  validateChecklistCompletion,
  exportChecklistToExcel,
  allChecklistTemplates,
  ChecklistTemplate,
  ChecklistItemDetail,
  ChecklistAttachment,
  ChecklistComment
} from './comprehensive-checklist-templates';
import { TemplateManagementModal } from './template-management-modal';
import { ChecklistItemDetailModal } from './checklist-item-detail-modal';
import { CustomFieldsTab } from './custom-fields-tab';
import {
  X,
  Calendar,
  Clock,
  DollarSign,
  Paperclip,
  MessageSquare,
  Users,
  Flag,
  Tag,
  Link2,
  CheckSquare,
  Plus,
  Trash2,
  Upload,
  Download,
  Play,
  Pause,
  Timer,
  GitBranch,
  AlertCircle,
  FileText,
  Image,
  File,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Hash,
  Percent,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Layers,
  Eye,
  Send,
  Bold,
  Italic,
  List,
  Link,
  Code,
  Quote,
  Smile,
  AtSign,
  Zap,
  Building2,
  MapPin,
  Briefcase,
  Award,
  BarChart3,
  PieChart,
  Archive,
  Bell,
  BellOff,
  Copy,
  ExternalLink,
  History,
  Info,
  Lock,
  Unlock,
  RefreshCw,
  Save,
  Settings,
  Share2,
  Star,
  StarOff,
  Bookmark,
  BookmarkCheck,
  Filter,
  SortAsc,
  Search,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  MinusCircle,
  PlusCircle,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  Shield,
  Edit,
  ClipboardList,
  Edit2
} from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: any;
  onSave: (taskData: any) => void;
  mode?: 'add' | 'edit';
}

const ComprehensiveTaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task, onSave, mode = 'edit' }) => {
  // State for all task fields
  const [activeTab, setActiveTab] = useState(task?.defaultTab || 'details');
  const [taskData, setTaskData] = useState({
    // Basic Information
    title: '',
    description: '',
    taskCode: '',
    type: 'task',
    status: 'todo',
    priority: 'medium',
    category: '',
    tags: [] as string[],
    
    // Assignment
    assignee: null as any,
    reporter: null as any,
    watchers: [] as any[],
    team: [] as any[],
    
    // Timeline
    startDate: '',
    dueDate: '',
    estimatedHours: 0,
    actualHours: 0,
    
    // Budget
    estimatedCost: 0,
    actualCost: 0,
    currency: 'USD',
    costVariance: 0,
    
    // Progress
    progress: 0,
    milestones: [] as any[],
    
    // Dependencies
    dependencies: [] as string[],
    blockedBy: [] as string[],
    blocks: [] as string[],
    
    // Checklist
    checklist: [] as any[],
    
    // Comments
    comments: [] as any[],
    
    // Attachments
    attachments: [] as any[],
    
    // Time Tracking
    timeEntries: [] as any[],
    isTimerRunning: false,
    currentTimerStart: null as Date | null,
    
    // Risk & Impact
    risk: 'low',
    impact: 'low',
    
    // Custom Fields
    customFields: [] as Array<{
      id: string;
      name: string;
      type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'url' | 'email' | 'phone' | 'currency' | 'percentage';
      value: any;
      required: boolean;
      options?: string[]; // for dropdown type
      placeholder?: string;
      validation?: string; // regex pattern
      min?: number; // for number type
      max?: number; // for number type
    }>,
    
    // Metadata
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    updatedBy: ''
  });

  const [newComment, setNewComment] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [showDependencySearch, setShowDependencySearch] = useState(false);
  const [dependencySearch, setDependencySearch] = useState('');
  const [attachmentDragActive, setAttachmentDragActive] = useState(false);
  const [showTemplateManagement, setShowTemplateManagement] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<ChecklistTemplate[]>([]);
  const [expandedChecklistItems, setExpandedChecklistItems] = useState<Set<string>>(new Set());
  const [editingChecklistItem, setEditingChecklistItem] = useState<ChecklistItemDetail | null>(null);
  const [showItemDetailModal, setShowItemDetailModal] = useState(false);
  const [showAddCustomField, setShowAddCustomField] = useState(false);
  const [newCustomField, setNewCustomField] = useState({
    name: '',
    type: 'text' as const,
    required: false,
    options: [] as string[],
    placeholder: '',
    validation: '',
    min: undefined as number | undefined,
    max: undefined as number | undefined
  });
  const [isStarred, setIsStarred] = useState(task?.isStarred || false);
  const [isWatching, setIsWatching] = useState(task?.isWatching || false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDuplicateConfirm, setShowDuplicateConfirm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  // Initialize task data
  useEffect(() => {
    if (task) {
      // Ensure checklist is an array
      const taskWithChecklist = {
        ...task,
        checklist: Array.isArray(task.checklist) ? task.checklist : []
      };
      setTaskData({ ...taskData, ...taskWithChecklist });
    } else {
      // Generate new task code
      const newTaskCode = `TSK-${Date.now().toString().slice(-6)}`;
      setTaskData({ ...taskData, taskCode: newTaskCode, checklist: [] });
    }
  }, [task]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (taskData.isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [taskData.isTimerRunning]);

  // Close more menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showMoreMenu && !target.closest('[data-more-menu]')) {
        setShowMoreMenu(false);
      }
    };
    
    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMoreMenu]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newAttachments = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
      uploadedBy: 'Current User'
    }));
    
    setTaskData({
      ...taskData,
      attachments: [...taskData.attachments, ...newAttachments]
    });
  };

  // Handle drag and drop
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
  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'Current User',
      avatar: '',
      timestamp: new Date().toISOString(),
      edited: false,
      reactions: []
    };
    
    setTaskData({
      ...taskData,
      comments: [...taskData.comments, comment]
    });
    setNewComment('');
  };

  // Add checklist item
  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    
    const item = {
      id: Date.now(),
      text: newChecklistItem,
      completed: false,
      addedAt: new Date().toISOString()
    };
    
    setTaskData({
      ...taskData,
      checklist: [...taskData.checklist, item]
    });
    setNewChecklistItem('');
  };

  // Toggle checklist item
  const toggleChecklistItem = (id: number | string) => {
    setTaskData({
      ...taskData,
      checklist: taskData.checklist.map((item: any) =>
        item.id === id ? { 
          ...item, 
          completed: !item.completed,
          completedDate: !item.completed ? new Date().toISOString() : null,
          completedBy: !item.completed ? 'Current User' : null
        } : item
      )
    });
  };

  // Start/Stop timer
  const toggleTimer = () => {
    if (taskData.isTimerRunning) {
      // Stop timer and save time entry
      const timeEntry = {
        id: Date.now(),
        startTime: taskData.currentTimerStart,
        endTime: new Date(),
        duration: timerSeconds,
        description: 'Work session',
        date: new Date().toISOString()
      };
      
      setTaskData({
        ...taskData,
        isTimerRunning: false,
        currentTimerStart: null,
        timeEntries: [...taskData.timeEntries, timeEntry],
        actualHours: taskData.actualHours + (timerSeconds / 3600)
      });
      setTimerSeconds(0);
    } else {
      // Start timer
      setTaskData({
        ...taskData,
        isTimerRunning: true,
        currentTimerStart: new Date()
      });
    }
  };

  // Calculate metrics
  const calculateMetrics = () => {
    const checklist = Array.isArray(taskData.checklist) ? taskData.checklist : [];
    const checklistStats = calculateChecklistProgress(checklist as ChecklistItemDetail[]);
    
    const costVariance = taskData.estimatedCost > 0 
      ? ((taskData.actualCost - taskData.estimatedCost) / taskData.estimatedCost) * 100 
      : 0;
    
    const timeVariance = taskData.estimatedHours > 0
      ? ((taskData.actualHours - taskData.estimatedHours) / taskData.estimatedHours) * 100
      : 0;
    
    return { 
      checklistProgress: checklistStats.completionPercentage,
      mandatoryProgress: checklistStats.mandatoryCompletion,
      criticalProgress: checklistStats.criticalCompletion,
      checklistStats,
      costVariance, 
      timeVariance 
    };
  };

  const metrics = calculateMetrics();

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
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '1200px',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
              {mode === 'add' ? 'Create New Task' : task?.isManagingSubtasks ? 'Manage Subtasks' : task?.parentTaskId ? 'Edit Subtask' : 'Edit Task'}
            </h2>
            {task?.parentTaskId && (
              <span style={{
                fontSize: '12px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                padding: '4px 10px',
                borderRadius: '20px',
                fontWeight: '500'
              }}>
                Subtask
              </span>
            )}
            {task?.isManagingSubtasks && (
              <span style={{
                fontSize: '12px',
                backgroundColor: '#f3e8ff',
                color: '#6b21a8',
                padding: '4px 10px',
                borderRadius: '20px',
                fontWeight: '500'
              }}>
                {task?.subtasks?.length || 0} Subtasks
              </span>
            )}
            <span style={{
              fontSize: '12px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              padding: '2px 8px',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              {taskData.taskCode}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: taskData.isTimerRunning ? '#fee2e2' : '#f3f4f6',
              borderRadius: '6px'
            }}>
              <Timer style={{ width: '16px', height: '16px', color: taskData.isTimerRunning ? '#ef4444' : '#6b7280' }} />
              <span style={{ fontSize: '14px', fontWeight: '500', fontFamily: 'monospace' }}>
                {formatTime(timerSeconds)}
              </span>
              <button
                onClick={toggleTimer}
                style={{
                  padding: '4px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {taskData.isTimerRunning ? (
                  <Pause style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                ) : (
                  <Play style={{ width: '16px', height: '16px', color: '#10b981' }} />
                )}
              </button>
            </div>
            
            <button 
              onClick={() => setIsStarred(!isStarred)}
              title={isStarred ? 'Remove from favorites' : 'Add to favorites'}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Star style={{ 
                width: '20px', 
                height: '20px', 
                color: isStarred ? '#fbbf24' : '#6b7280',
                fill: isStarred ? '#fbbf24' : 'none'
              }} />
            </button>
            <button 
              onClick={() => setIsWatching(!isWatching)}
              title={isWatching ? 'Stop watching' : 'Watch for updates'}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Bell style={{ 
                width: '20px', 
                height: '20px', 
                color: isWatching ? '#3b82f6' : '#6b7280',
                fill: isWatching ? '#3b82f6' : 'none'
              }} />
              {isWatching && (
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  border: '2px solid white'
                }} />
              )}
            </button>
            <div style={{ position: 'relative' }} data-more-menu>
              <button 
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                style={{
                  padding: '8px',
                  backgroundColor: showMoreMenu ? '#f3f4f6' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                <MoreVertical style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
              
              {showMoreMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                  minWidth: '180px',
                  padding: '8px'
                }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href + '/' + taskData.taskCode);
                      setShowMoreMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Link2 style={{ width: '16px', height: '16px' }} />
                    Copy Link
                  </button>
                  
                  <button
                    onClick={() => {
                      const printContent = document.getElementById('task-content');
                      if (printContent) {
                        window.print();
                      }
                      setShowMoreMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <FileText style={{ width: '16px', height: '16px' }} />
                    Print
                  </button>
                  
                  <button
                    onClick={() => {
                      // Export as JSON
                      const dataStr = JSON.stringify(taskData, null, 2);
                      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                      const exportFileDefaultName = `task-${taskData.taskCode}.json`;
                      const linkElement = document.createElement('a');
                      linkElement.setAttribute('href', dataUri);
                      linkElement.setAttribute('download', exportFileDefaultName);
                      linkElement.click();
                      setShowMoreMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Download style={{ width: '16px', height: '16px' }} />
                    Export
                  </button>
                  
                  <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '8px 0' }} />
                  
                  <button
                    onClick={() => {
                      // Convert to template functionality
                      console.log('Convert to template');
                      setShowMoreMenu(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <ClipboardList style={{ width: '16px', height: '16px' }} />
                    Convert to Template
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          padding: '0 24px',
          gap: '24px'
        }}>
          {['details', 'timeline', 'budget', 'dependencies', 'checklist', 'custom', 'attachments', 'comments', 'activity'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 0',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #7c3aed' : '2px solid transparent',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === tab ? '#7c3aed' : '#6b7280',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px'
        }}>
          {activeTab === 'details' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Title */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    placeholder="Enter task title"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Description
                  </label>
                  <div style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: '#f9fafb'
                    }}>
                      <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Bold style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                      <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Italic style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                      <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <List style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                      <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Link style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                      <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <Code style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                      </button>
                    </div>
                    <textarea
                      value={taskData.description}
                      onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                      placeholder="Enter task description..."
                      style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        border: 'none',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                {/* Type and Category */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Type
                    </label>
                    <select
                      value={taskData.type}
                      onChange={(e) => setTaskData({ ...taskData, type: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="task">Task</option>
                      <option value="milestone">Milestone</option>
                      <option value="bug">Bug</option>
                      <option value="feature">Feature</option>
                      <option value="epic">Epic</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Category
                    </label>
                    <select
                      value={taskData.category}
                      onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="planning">Planning</option>
                      <option value="development">Development</option>
                      <option value="foundation">Foundation</option>
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="finalization">Finalization</option>
                    </select>
                  </div>
                </div>

                {/* Status and Priority */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Status
                    </label>
                    <select
                      value={taskData.status}
                      onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="in-review">In Review</option>
                      <option value="blocked">Blocked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Priority
                    </label>
                    <select
                      value={taskData.priority}
                      onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Progress ({taskData.progress}%)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={taskData.progress}
                      onChange={(e) => setTaskData({ ...taskData, progress: parseInt(e.target.value) })}
                      style={{ flex: 1 }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: taskData.progress === 100 ? '#10b981' : '#374151',
                      minWidth: '45px'
                    }}>
                      {taskData.progress}%
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    marginTop: '8px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${taskData.progress}%`,
                      backgroundColor: taskData.progress === 100 ? '#10b981' : '#7c3aed',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Assignee */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Assignee
                  </label>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    <Users style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                    <span style={{ fontSize: '14px', color: '#374151' }}>Select Assignee</span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Tags
                  </label>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    minHeight: '42px'
                  }}>
                    {taskData.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          backgroundColor: '#e0e7ff',
                          color: '#4338ca',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {tag}
                        <X
                          style={{ width: '12px', height: '12px', cursor: 'pointer' }}
                          onClick={() => setTaskData({
                            ...taskData,
                            tags: taskData.tags.filter((_, i) => i !== index)
                          })}
                        />
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add tag..."
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        minWidth: '100px',
                        backgroundColor: 'transparent'
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          setTaskData({
                            ...taskData,
                            tags: [...taskData.tags, e.currentTarget.value]
                          });
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Risk and Impact */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Risk Level
                    </label>
                    <select
                      value={taskData.risk}
                      onChange={(e) => setTaskData({ ...taskData, risk: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
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
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Impact Level
                    </label>
                    <select
                      value={taskData.impact}
                      onChange={(e) => setTaskData({ ...taskData, impact: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
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
                  </div>
                </div>

                {/* Metrics Overview */}
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#374151' }}>
                    Task Metrics
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Checklist Progress</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#10b981' }}>
                        {metrics.checklistProgress.toFixed(0)}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Cost Variance</div>
                      <div style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        color: metrics.costVariance > 0 ? '#ef4444' : '#10b981' 
                      }}>
                        {metrics.costVariance > 0 ? '+' : ''}{metrics.costVariance.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Time Logged</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>
                        {taskData.actualHours.toFixed(1)}h
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Attachments</div>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: '#374151' }}>
                        {taskData.attachments.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                  Schedule
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      value={taskData.startDate}
                      onChange={(e) => setTaskData({ ...taskData, startDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Due Date
                    </label>
                    <input
                      type="datetime-local"
                      value={taskData.dueDate}
                      onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Estimated Hours
                    </label>
                    <input
                      type="number"
                      value={taskData.estimatedHours}
                      onChange={(e) => setTaskData({ ...taskData, estimatedHours: parseFloat(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                  Time Tracking
                </h3>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Time Logged</div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#374151' }}>
                      {taskData.actualHours.toFixed(1)} hours
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Time Variance</div>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: '500', 
                      color: metrics.timeVariance > 0 ? '#ef4444' : '#10b981' 
                    }}>
                      {metrics.timeVariance > 0 ? '+' : ''}{metrics.timeVariance.toFixed(1)}%
                    </div>
                  </div>
                  
                  <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '12px', color: '#374151' }}>
                    Recent Time Entries
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {taskData.timeEntries.slice(-3).map((entry: any) => (
                      <div
                        key={entry.id}
                        style={{
                          padding: '8px',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13px', color: '#374151' }}>{entry.description}</span>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            {(entry.duration / 3600).toFixed(1)}h
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'budget' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                Budget Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Currency
                  </label>
                  <select
                    value={taskData.currency}
                    onChange={(e) => setTaskData({ ...taskData, currency: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                <div />
                
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Estimated Cost
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                    <input
                      type="number"
                      value={taskData.estimatedCost}
                      onChange={(e) => setTaskData({ ...taskData, estimatedCost: parseFloat(e.target.value) })}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                    Actual Cost
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                    <input
                      type="number"
                      value={taskData.actualCost}
                      onChange={(e) => setTaskData({ ...taskData, actualCost: parseFloat(e.target.value) })}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: metrics.costVariance > 10 ? '#fee2e2' : '#f0fdf4',
                borderRadius: '8px',
                border: `1px solid ${metrics.costVariance > 10 ? '#fecaca' : '#bbf7d0'}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {metrics.costVariance > 10 ? (
                    <AlertTriangle style={{ width: '20px', height: '20px', color: '#ef4444' }} />
                  ) : (
                    <CheckCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
                  )}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                      Cost Variance: {metrics.costVariance > 0 ? '+' : ''}{metrics.costVariance.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                      {metrics.costVariance > 10 
                        ? 'Task is over budget. Review and adjust costs.'
                        : 'Task is within budget parameters.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dependencies' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                Task Dependencies
              </h3>
              
              {/* Depends On */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                  Depends On
                </label>
                <div style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '12px',
                  minHeight: '100px'
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    {taskData.dependencies.map((dep: string, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 10px',
                          backgroundColor: '#fef3c7',
                          borderRadius: '6px',
                          fontSize: '13px'
                        }}
                      >
                        <GitBranch style={{ width: '14px', height: '14px', color: '#d97706' }} />
                        <span style={{ color: '#92400e' }}>{dep}</span>
                        <X
                          style={{ width: '14px', height: '14px', cursor: 'pointer', color: '#92400e' }}
                          onClick={() => setTaskData({
                            ...taskData,
                            dependencies: taskData.dependencies.filter((_: string, i: number) => i !== index)
                          })}
                        />
                      </div>
                    ))}
                  </div>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    backgroundColor: 'transparent',
                    border: '1px dashed #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#6b7280',
                    cursor: 'pointer'
                  }}>
                    <Plus style={{ width: '14px', height: '14px' }} />
                    Add Dependency
                  </button>
                </div>
              </div>

              {/* Blocks */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px', display: 'block' }}>
                  Blocks
                </label>
                <div style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '12px',
                  minHeight: '100px'
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                    {taskData.blocks.map((block: string, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 10px',
                          backgroundColor: '#fee2e2',
                          borderRadius: '6px',
                          fontSize: '13px'
                        }}
                      >
                        <AlertCircle style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                        <span style={{ color: '#991b1b' }}>{block}</span>
                        <X
                          style={{ width: '14px', height: '14px', cursor: 'pointer', color: '#991b1b' }}
                          onClick={() => setTaskData({
                            ...taskData,
                            blocks: taskData.blocks.filter((_: string, i: number) => i !== index)
                          })}
                        />
                      </div>
                    ))}
                  </div>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 10px',
                    backgroundColor: 'transparent',
                    border: '1px dashed #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#6b7280',
                    cursor: 'pointer'
                  }}>
                    <Plus style={{ width: '14px', height: '14px' }} />
                    Add Blocking Task
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div>
              {/* Header with Template Selector */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    Checklist Management
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setShowTemplateManagement(true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <ClipboardList style={{ width: '16px', height: '16px' }} />
                      Manage Templates
                    </button>
                    <button
                      onClick={() => {
                        const data = exportChecklistToExcel(taskData.checklist || [], taskData.title);
                        console.log('Export data:', data);
                        // Implement actual export functionality
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <Download style={{ width: '16px', height: '16px' }} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Selected Templates Display */}
                {selectedTemplates.length > 0 && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#ede9fe',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#7c3aed', marginBottom: '8px' }}>
                      Selected Templates ({selectedTemplates.length})
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedTemplates.map(template => (
                        <span
                          key={template.id}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: 'white',
                            color: '#7c3aed',
                            border: '1px solid #c084fc',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {template.name} ({template.items.length} items)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bars */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', color: '#374151' }}>Overall Progress</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                      {metrics.checklistProgress.toFixed(0)}%
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${metrics.checklistProgress}%`,
                      backgroundColor: '#10b981',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Mandatory Items Progress */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Mandatory Items</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {taskData.checklist.filter((i: any) => i.mandatory && i.completed).length}/
                      {taskData.checklist.filter((i: any) => i.mandatory).length}
                    </span>
                  </div>
                  <div style={{
                    height: '4px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${taskData.checklist.filter((i: any) => i.mandatory).length > 0 
                        ? (taskData.checklist.filter((i: any) => i.mandatory && i.completed).length / 
                           taskData.checklist.filter((i: any) => i.mandatory).length) * 100 
                        : 0}%`,
                      backgroundColor: '#ef4444',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Critical Items Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Critical Items</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>
                      {taskData.checklist.filter((i: any) => i.priority === 'critical' && i.completed).length}/
                      {taskData.checklist.filter((i: any) => i.priority === 'critical').length}
                    </span>
                  </div>
                  <div style={{
                    height: '4px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${taskData.checklist.filter((i: any) => i.priority === 'critical').length > 0 
                        ? (taskData.checklist.filter((i: any) => i.priority === 'critical' && i.completed).length / 
                           taskData.checklist.filter((i: any) => i.priority === 'critical').length) * 100 
                        : 0}%`,
                      backgroundColor: '#f59e0b',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '16px',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '8px'
              }}>
                {['All', 'Mandatory', 'Critical', 'Pending', 'Completed'].map(filter => (
                  <button
                    key={filter}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#6b7280',
                      cursor: 'pointer'
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Grouped Checklist Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px', maxHeight: '400px', overflowY: 'auto' }}>
                {/* Group items by category */}
                {Object.entries(
                  taskData.checklist.reduce((groups: any, item: any) => {
                    const category = item.category || 'General';
                    if (!groups[category]) groups[category] = [];
                    groups[category].push(item);
                    return groups;
                  }, {})
                ).map(([category, items]: [string, any]) => (
                  <div key={category}>
                    <h4 style={{ 
                      fontSize: '13px', 
                      fontWeight: '600', 
                      color: '#6b7280', 
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Layers style={{ width: '14px', height: '14px' }} />
                      {category}
                      <span style={{ fontSize: '11px', fontWeight: '400' }}>
                        ({items.filter((i: any) => i.completed).length}/{items.length})
                      </span>
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '22px' }}>
                      {items.map((item: ChecklistItemDetail) => {
                        const isExpanded = expandedChecklistItems.has(item.id);
                        return (
                          <div
                            key={item.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '12px',
                            backgroundColor: item.status === 'completed' ? '#f0fdf4' : 
                                           item.status === 'verified' ? '#eff6ff' :
                                           item.status === 'failed' ? '#fef2f2' : 'white',
                            border: `1px solid ${item.critical ? '#dc2626' : 
                                                item.mandatory ? '#f59e0b' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            position: 'relative'
                          }}
                        >
                          {/* Priority Indicator */}
                          {item.priority === 'critical' && (
                            <div style={{
                              position: 'absolute',
                              left: '-2px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '4px',
                              height: '70%',
                              backgroundColor: '#ef4444',
                              borderRadius: '2px'
                            }} />
                          )}
                          
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleChecklistItem(item.id)}
                            style={{ width: '16px', height: '16px', cursor: 'pointer', marginTop: '2px' }}
                          />
                          
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{
                                fontSize: '13px',
                                fontWeight: item.mandatory ? '600' : '400',
                                color: item.completed ? '#6b7280' : '#111827',
                                textDecoration: item.completed ? 'line-through' : 'none'
                              }}>
                                {item.text}
                              </span>
                              {item.mandatory && (
                                <span style={{
                                  fontSize: '10px',
                                  padding: '2px 6px',
                                  backgroundColor: '#fee2e2',
                                  color: '#dc2626',
                                  borderRadius: '4px',
                                  fontWeight: '600'
                                }}>
                                  MANDATORY
                                </span>
                              )}
                              {item.verificationRequired && (
                                <Shield style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
                              )}
                            </div>
                            
                            {item.description && (
                              <p style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                                {item.description}
                              </p>
                            )}
                            
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              {item.estimatedTime && (
                                <span style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Clock style={{ width: '12px', height: '12px' }} />
                                  {item.estimatedTime} min
                                </span>
                              )}
                              {item.assignee && (
                                <span style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Users style={{ width: '12px', height: '12px' }} />
                                  {item.assignee}
                                </span>
                              )}
                              {item.dueDate && (
                                <span style={{ fontSize: '11px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Calendar style={{ width: '12px', height: '12px' }} />
                                  {new Date(item.dueDate).toLocaleDateString()}
                                </span>
                              )}
                              {item.tags && item.tags.length > 0 && (
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  {item.tags.map((tag: string, idx: number) => (
                                    <span key={idx} style={{
                                      fontSize: '10px',
                                      padding: '1px 4px',
                                      backgroundColor: '#e0e7ff',
                                      color: '#4338ca',
                                      borderRadius: '3px'
                                    }}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            {item.completed && item.completedBy && (
                              <div style={{ 
                                marginTop: '4px', 
                                fontSize: '10px', 
                                color: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <CheckCircle style={{ width: '12px', height: '12px' }} />
                                Completed by {item.completedBy} on {new Date(item.completedDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                          
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button
                              onClick={() => {
                                setEditingChecklistItem(item);
                                setShowItemDetailModal(true);
                              }}
                              style={{
                                padding: '4px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <Edit style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                            </button>
                            <button
                              onClick={() => setTaskData({
                                ...taskData,
                                checklist: taskData.checklist.filter((i: any) => i.id !== item.id)
                              })}
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
                        </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Item */}
              <div style={{ 
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                  Add Custom Checklist Item
                </h4>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Enter checklist item..."
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '13px'
                    }}
                  />
                  <select style={{
                    padding: '6px 10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    fontSize: '13px',
                    backgroundColor: 'white'
                  }}>
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="critical">Critical</option>
                  </select>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
                    <input type="checkbox" />
                    Mandatory
                  </label>
                  <button
                    onClick={addChecklistItem}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Plus style={{ width: '14px', height: '14px' }} />
                    Add
                  </button>
                </div>
              </div>

              {/* Validation Summary */}
              {taskData.checklist.length > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  backgroundColor: taskData.checklist.filter((i: any) => i.mandatory && !i.completed).length > 0 
                    ? '#fee2e2' 
                    : '#f0fdf4',
                  borderRadius: '6px',
                  border: `1px solid ${taskData.checklist.filter((i: any) => i.mandatory && !i.completed).length > 0 
                    ? '#fecaca' 
                    : '#bbf7d0'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {taskData.checklist.filter((i: any) => i.mandatory && !i.completed).length > 0 ? (
                      <AlertTriangle style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                    ) : (
                      <CheckCircle style={{ width: '16px', height: '16px', color: '#10b981' }} />
                    )}
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>
                      {taskData.checklist.filter((i: any) => i.mandatory && !i.completed).length > 0 
                        ? `${taskData.checklist.filter((i: any) => i.mandatory && !i.completed).length} mandatory items pending completion`
                        : 'All mandatory items completed'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'attachments' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                Attachments ({taskData.attachments.length})
              </h3>
              
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
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>
                  Supports: PDF, DOC, XLS, PPT, Images, Videos (Max 10MB)
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
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#7c3aed',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  <Upload style={{ width: '16px', height: '16px' }} />
                  Choose Files
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {taskData.attachments.map((attachment: any) => (
                  <div
                    key={attachment.id}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px',
                      backgroundColor: 'white'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {attachment.type.startsWith('image/') ? (
                        <Image style={{ width: '24px', height: '24px', color: '#10b981' }} />
                      ) : (
                        <File style={{ width: '24px', height: '24px', color: '#6b7280' }} />
                      )}
                      <span style={{ fontSize: '13px', fontWeight: '500', color: '#374151', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {attachment.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>
                      {(attachment.size / 1024).toFixed(1)} KB
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        flex: 1,
                        padding: '4px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}>
                        <Eye style={{ width: '12px', height: '12px' }} />
                        View
                      </button>
                      <button style={{
                        flex: 1,
                        padding: '4px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}>
                        <Download style={{ width: '12px', height: '12px' }} />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                Comments ({taskData.comments.length})
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {taskData.comments.map((comment: any) => (
                  <div
                    key={comment.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {comment.author.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          {comment.author}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          {new Date(comment.timestamp).toLocaleString()}
                        </span>
                        {comment.edited && (
                          <span style={{ fontSize: '11px', color: '#9ca3af' }}>(edited)</span>
                        )}
                      </div>
                      <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb'
                }}>
                  <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Bold style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                  </button>
                  <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Italic style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                  </button>
                  <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Link style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                  </button>
                  <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <AtSign style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                  </button>
                  <button style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Paperclip style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                  </button>
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '12px',
                    border: 'none',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '8px 12px',
                  backgroundColor: '#f9fafb',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <button
                    onClick={addComment}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
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
                    <Send style={{ width: '16px', height: '16px' }} />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#111827' }}>
                Activity Log
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { id: 1, action: 'Task created', user: 'John Doe', time: '2 hours ago', icon: Plus, color: '#10b981' },
                  { id: 2, action: 'Status changed to In Progress', user: 'Jane Smith', time: '1 hour ago', icon: Activity, color: '#3b82f6' },
                  { id: 3, action: 'Added 3 attachments', user: 'Mike Johnson', time: '45 minutes ago', icon: Paperclip, color: '#6b7280' },
                  { id: 4, action: 'Commented on task', user: 'Sarah Williams', time: '30 minutes ago', icon: MessageSquare, color: '#8b5cf6' },
                  { id: 5, action: 'Updated due date', user: 'Tom Brown', time: '15 minutes ago', icon: Calendar, color: '#f59e0b' }
                ].map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: `${activity.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <activity.icon style={{ width: '16px', height: '16px', color: activity.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', color: '#111827', marginBottom: '2px' }}>
                        <span style={{ fontWeight: '500' }}>{activity.user}</span>
                        <span style={{ color: '#6b7280' }}> {activity.action}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Fields Tab */}
          {activeTab === 'custom' && (
            <CustomFieldsTab
              customFields={taskData.customFields}
              onUpdateFields={(fields) => setTaskData({ ...taskData, customFields: fields })}
            />
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => {
                // Create a duplicate of the task
                const duplicatedTask = {
                  ...taskData,
                  taskCode: `${taskData.taskCode}-COPY`,
                  title: `${taskData.title} (Copy)`,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  id: undefined // New task should get new ID
                };
                onSave(duplicatedTask);
                onClose();
              }}
              title="Create a duplicate of this task"
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              <Copy style={{ width: '16px', height: '16px' }} />
              Duplicate
            </button>
            <button 
              onClick={() => {
                // Archive the task
                const archivedTask = {
                  ...taskData,
                  status: 'archived',
                  archivedAt: new Date().toISOString(),
                  archivedBy: 'current-user' // Replace with actual user
                };
                onSave(archivedTask);
                onClose();
              }}
              title="Archive this task"
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.borderColor = '#fca5a5';
                e.currentTarget.style.color = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#374151';
              }}
            >
              <Archive style={{ width: '16px', height: '16px' }} />
              Archive
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(taskData)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#7c3aed',
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
              <Save style={{ width: '16px', height: '16px' }} />
              {mode === 'add' ? 'Create Task' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Template Management Modal */}
      <TemplateManagementModal
        isOpen={showTemplateManagement}
        onClose={() => setShowTemplateManagement(false)}
        onSelectTemplate={(template) => {
          const newItems = createChecklistFromTemplate(template.id);
          setTaskData({
            ...taskData,
            checklist: [...(taskData.checklist || []), ...newItems]
          });
          setSelectedTemplates([...selectedTemplates, template]);
        }}
        onCreateTemplate={(template) => {
          // Handle template creation - could save to a database or local storage
          console.log('New template created:', template);
        }}
        selectedTemplates={selectedTemplates}
      />

      {/* Checklist Item Detail Modal */}
      {editingChecklistItem && (
        <ChecklistItemDetailModal
          isOpen={showItemDetailModal}
          onClose={() => {
            setShowItemDetailModal(false);
            setEditingChecklistItem(null);
          }}
          item={editingChecklistItem}
          onUpdate={(updatedItem) => {
            const updatedChecklist = taskData.checklist.map((item: ChecklistItemDetail) =>
              item.id === updatedItem.id ? updatedItem : item
            );
            setTaskData({ ...taskData, checklist: updatedChecklist });
            setEditingChecklistItem(updatedItem);
          }}
        />
      )}
    </div>
  );
};

export default ComprehensiveTaskModal;
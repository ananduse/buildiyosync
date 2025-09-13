import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Download,
  Upload,
  Save,
  FileText,
  ClipboardList,
  Shield,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Clock,
  Paperclip,
  MessageSquare,
  Users,
  Tag,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  Layers,
  Settings,
  Archive,
  Star,
  StarOff,
  Eye,
  EyeOff,
  MoreVertical,
  Hash,
  DollarSign,
  Timer,
  Target,
  Flag,
  GitBranch,
  Link2,
  Lock,
  Unlock,
  RefreshCw,
  Info,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Package,
  Building2,
  Wrench,
  Zap,
  Droplet,
  Wind,
  Flame,
  Award,
  FileCheck,
  FolderOpen,
  Database
} from 'lucide-react';

import {
  allChecklistTemplates,
  getTemplatesByType,
  getTemplatesByCategory,
  getTemplateById,
  createChecklistFromTemplate,
  ChecklistTemplate,
  ChecklistItemDetail,
  ChecklistAttachment,
  ChecklistComment
} from './comprehensive-checklist-templates';

interface TemplateManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: ChecklistTemplate) => void;
  onCreateTemplate: (template: ChecklistTemplate) => void;
  selectedTemplates?: ChecklistTemplate[];
}

export const TemplateManagementModal: React.FC<TemplateManagementModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  onCreateTemplate,
  selectedTemplates = []
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'manage' | 'selected'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTemplates, setExpandedTemplates] = useState<Set<string>>(new Set());
  const [editingTemplate, setEditingTemplate] = useState<ChecklistTemplate | null>(null);
  const [favoriteTemplates, setFavoriteTemplates] = useState<Set<string>>(new Set());
  const [templates, setTemplates] = useState<ChecklistTemplate[]>(allChecklistTemplates);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItemDetail | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number>(-1);
  
  // New template creation state
  const [newTemplate, setNewTemplate] = useState<Partial<ChecklistTemplate>>({
    name: '',
    category: '',
    type: 'custom',
    description: '',
    version: '1.0',
    tags: [],
    items: []
  });
  
  const [newItem, setNewItem] = useState<Partial<ChecklistItemDetail>>({
    title: '',
    description: '',
    mandatory: false,
    critical: false,
    requiresVerification: false,
    estimatedHours: 0,
    category: '',
    standards: [],
    specifications: [],
    acceptanceCriteria: []
  });

  const [showItemForm, setShowItemForm] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingTemplate) {
      setNewTemplate({
        ...editingTemplate,
        items: [...editingTemplate.items]
      });
    } else {
      setNewTemplate({
        name: '',
        category: '',
        type: 'custom',
        description: '',
        version: '1.0',
        tags: [],
        items: []
      });
    }
  }, [editingTemplate]);

  // Filter templates based on search and filters
  const filteredTemplates = allChecklistTemplates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  // Get unique categories and types
  const categories = Array.from(new Set(allChecklistTemplates.map(t => t.category))).sort();
  const types: ChecklistTemplate['type'][] = ['quality', 'safety', 'inspection', 'compliance', 'testing', 'commissioning', 'maintenance', 'audit', 'custom'];

  const handleAddItem = () => {
    if (newItem.title) {
      const item: ChecklistItemDetail = {
        id: `item-${Date.now()}`,
        title: newItem.title || '',
        description: newItem.description,
        completed: false,
        mandatory: newItem.mandatory || false,
        critical: newItem.critical,
        category: newItem.category,
        requiresVerification: newItem.requiresVerification,
        estimatedHours: newItem.estimatedHours,
        standards: newItem.standards,
        specifications: newItem.specifications,
        acceptanceCriteria: newItem.acceptanceCriteria,
        status: 'pending'
      };

      if (editingItemIndex !== -1) {
        const updatedItems = [...(newTemplate.items || [])];
        updatedItems[editingItemIndex] = item;
        setNewTemplate({ ...newTemplate, items: updatedItems });
        setEditingItemIndex(null);
      } else {
        setNewTemplate({ 
          ...newTemplate, 
          items: [...(newTemplate.items || []), item] 
        });
      }

      // Reset form
      setNewItem({
        title: '',
        description: '',
        mandatory: false,
        critical: false,
        requiresVerification: false,
        estimatedHours: 0,
        category: '',
        standards: [],
        specifications: [],
        acceptanceCriteria: []
      });
      setShowItemForm(false);
    }
  };

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.category && newTemplate.items && newTemplate.items.length > 0) {
      const template: ChecklistTemplate = {
        id: editingTemplate ? editingTemplate.id : `custom-${Date.now()}`,
        name: newTemplate.name,
        category: newTemplate.category,
        type: newTemplate.type as ChecklistTemplate['type'],
        description: newTemplate.description || '',
        version: newTemplate.version || '1.0',
        createdDate: new Date(),
        updatedDate: new Date(),
        createdBy: 'user',
        tags: newTemplate.tags || [],
        applicablePhases: newTemplate.applicablePhases,
        estimatedDuration: newTemplate.estimatedDuration,
        items: newTemplate.items as ChecklistItemDetail[],
        metadata: newTemplate.metadata
      };
      
      if (editingTemplate) {
        // Update existing template
        const updatedTemplates = templates.map(t => 
          t.id === editingTemplate.id ? template : t
        );
        setTemplates(updatedTemplates);
        setEditingTemplate(null);
        setActiveTab('manage');
      } else {
        // Create new template
        onCreateTemplate(template);
        setTemplates([...templates, template]);
      }
      
      // Reset form
      setNewTemplate({
        name: '',
        category: '',
        type: 'custom',
        description: '',
        version: '1.0',
        tags: [],
        items: []
      });
      
      setActiveTab('browse');
    }
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
      zIndex: 10000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '95%',
        maxWidth: '1400px',
        height: '90vh',
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
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
              Master Template Management
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Browse, create, and manage checklist templates for your projects
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}
          >
            <X style={{ width: '20px', height: '20px', color: '#6b7280' }} />
          </button>
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
            { id: 'browse', label: 'Browse Templates', icon: FolderOpen },
            { id: 'create', label: 'Create Template', icon: Plus },
            { id: 'manage', label: 'Manage Templates', icon: Settings },
            { id: 'selected', label: `Selected (${selectedTemplates.length})`, icon: CheckCircle }
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
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {/* Browse Templates Tab */}
          {activeTab === 'browse' && (
            <div style={{ flex: 1, display: 'flex' }}>
              {/* Sidebar Filters */}
              <div style={{
                width: '280px',
                borderRight: '1px solid #e5e7eb',
                padding: '20px',
                overflowY: 'auto',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                    Search Templates
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                    <input
                      type="text"
                      placeholder="Search by name, tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 8px 8px 36px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                    Template Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="all">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type} style={{ textTransform: 'capitalize' }}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px', display: 'block' }}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#ede9fe',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Info style={{ width: '16px', height: '16px', color: '#7c3aed' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#7c3aed' }}>Quick Stats</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6' }}>
                    <div>{filteredTemplates.length} templates found</div>
                    <div>{selectedTemplates.length} selected</div>
                    <div>{favoriteTemplates.size} favorites</div>
                  </div>
                </div>
              </div>

              {/* Template List */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {filteredTemplates.map(template => {
                    const isExpanded = expandedTemplates.has(template.id);
                    const isFavorite = favoriteTemplates.has(template.id);
                    const isSelected = selectedTemplates.some(t => t.id === template.id);
                    
                    return (
                      <div
                        key={template.id}
                        style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#f3f0ff' : 'white',
                          transition: 'all 0.2s'
                        }}
                      >
                        {/* Template Header */}
                        <div style={{
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'start',
                          gap: '12px'
                        }}>
                          <button
                            onClick={() => {
                              const newExpanded = new Set(expandedTemplates);
                              if (isExpanded) {
                                newExpanded.delete(template.id);
                              } else {
                                newExpanded.add(template.id);
                              }
                              setExpandedTemplates(newExpanded);
                            }}
                            style={{
                              padding: '4px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {isExpanded ? 
                              <ChevronDown style={{ width: '16px', height: '16px', color: '#6b7280' }} /> :
                              <ChevronRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
                            }
                          </button>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827' }}>
                                {template.name}
                              </h3>
                              <span style={{
                                padding: '2px 8px',
                                backgroundColor: '#e0e7ff',
                                color: '#4338ca',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '500'
                              }}>
                                {template.type}
                              </span>
                              <span style={{
                                padding: '2px 8px',
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '500'
                              }}>
                                {template.category}
                              </span>
                              <span style={{
                                padding: '2px 8px',
                                backgroundColor: '#dbeafe',
                                color: '#1e40af',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '500'
                              }}>
                                v{template.version}
                              </span>
                            </div>
                            
                            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                              {template.description}
                            </p>
                            
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              <span style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ClipboardList style={{ width: '14px', height: '14px' }} />
                                {template.items.length} items
                              </span>
                              {template.estimatedDuration && (
                                <span style={{ fontSize: '12px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Clock style={{ width: '14px', height: '14px' }} />
                                  {template.estimatedDuration}h estimated
                                </span>
                              )}
                              {template.tags.length > 0 && (
                                <div style={{ display: 'flex', gap: '4px' }}>
                                  <Tag style={{ width: '14px', height: '14px', color: '#9ca3af' }} />
                                  {template.tags.slice(0, 3).map(tag => (
                                    <span key={tag} style={{
                                      fontSize: '11px',
                                      padding: '1px 6px',
                                      backgroundColor: '#f3f4f6',
                                      color: '#6b7280',
                                      borderRadius: '3px'
                                    }}>
                                      {tag}
                                    </span>
                                  ))}
                                  {template.tags.length > 3 && (
                                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                                      +{template.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => {
                                const newFavorites = new Set(favoriteTemplates);
                                if (isFavorite) {
                                  newFavorites.delete(template.id);
                                } else {
                                  newFavorites.add(template.id);
                                }
                                setFavoriteTemplates(newFavorites);
                              }}
                              style={{
                                padding: '6px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              {isFavorite ? 
                                <Star style={{ width: '16px', height: '16px', color: '#fbbf24', fill: '#fbbf24' }} /> :
                                <StarOff style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
                              }
                            </button>
                            <button
                              onClick={() => onSelectTemplate(template)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: isSelected ? '#10b981' : '#7c3aed',
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
                              {isSelected ? (
                                <>
                                  <CheckCircle style={{ width: '14px', height: '14px' }} />
                                  Selected
                                </>
                              ) : (
                                <>
                                  <Plus style={{ width: '14px', height: '14px' }} />
                                  Select
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div style={{
                            padding: '0 16px 16px 16px',
                            borderTop: '1px solid #e5e7eb'
                          }}>
                            <div style={{ marginTop: '16px' }}>
                              <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                                Checklist Items Preview
                              </h4>
                              <div style={{ display: 'grid', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                                {template.items.slice(0, 5).map((item, idx) => (
                                  <div
                                    key={item.id}
                                    style={{
                                      padding: '10px',
                                      backgroundColor: '#f9fafb',
                                      borderRadius: '6px',
                                      fontSize: '12px'
                                    }}
                                  >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                      <span style={{ fontWeight: '600', color: '#111827' }}>
                                        {idx + 1}. {item.title}
                                      </span>
                                      {item.mandatory && (
                                        <span style={{
                                          fontSize: '10px',
                                          padding: '1px 4px',
                                          backgroundColor: '#fee2e2',
                                          color: '#dc2626',
                                          borderRadius: '3px',
                                          fontWeight: '600'
                                        }}>
                                          MANDATORY
                                        </span>
                                      )}
                                      {item.critical && (
                                        <span style={{
                                          fontSize: '10px',
                                          padding: '1px 4px',
                                          backgroundColor: '#fef2f2',
                                          color: '#b91c1c',
                                          borderRadius: '3px',
                                          fontWeight: '600'
                                        }}>
                                          CRITICAL
                                        </span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <p style={{ color: '#6b7280', marginBottom: '4px' }}>
                                        {item.description}
                                      </p>
                                    )}
                                    <div style={{ display: 'flex', gap: '12px', color: '#9ca3af', fontSize: '11px' }}>
                                      {item.estimatedHours && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                          <Clock style={{ width: '10px', height: '10px' }} />
                                          {item.estimatedHours}h
                                        </span>
                                      )}
                                      {item.standards && item.standards.length > 0 && (
                                        <span>Standards: {item.standards.join(', ')}</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                                {template.items.length > 5 && (
                                  <p style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic', textAlign: 'center', padding: '8px' }}>
                                    +{template.items.length - 5} more items
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Template Actions */}
                            <div style={{
                              marginTop: '16px',
                              paddingTop: '16px',
                              borderTop: '1px solid #e5e7eb',
                              display: 'flex',
                              gap: '8px'
                            }}>
                              <button
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#f3f4f6',
                                  color: '#374151',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                <Copy style={{ width: '14px', height: '14px' }} />
                                Duplicate
                              </button>
                              <button
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#f3f4f6',
                                  color: '#374151',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '6px',
                                  fontSize: '12px',
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
                              <button
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#f3f4f6',
                                  color: '#374151',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                              >
                                <Download style={{ width: '14px', height: '14px' }} />
                                Export
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Create Template Tab */}
          {activeTab === 'create' && (
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                  {editingTemplate ? `Edit Template: ${editingTemplate.name}` : 'Create New Template'}
                </h3>

                {/* Template Basic Info */}
                <div style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
                    Template Information
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                        Template Name *
                      </label>
                      <input
                        type="text"
                        value={newTemplate.name || ''}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder="Enter template name"
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
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                        Category *
                      </label>
                      <input
                        type="text"
                        value={newTemplate.category || ''}
                        onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                        placeholder="e.g., Foundation, Electrical, Safety"
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                        Type *
                      </label>
                      <select
                        value={newTemplate.type || 'custom'}
                        onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value as ChecklistTemplate['type'] })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'white'
                        }}
                      >
                        {types.map(type => (
                          <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                        Version
                      </label>
                      <input
                        type="text"
                        value={newTemplate.version || ''}
                        onChange={(e) => setNewTemplate({ ...newTemplate, version: e.target.value })}
                        placeholder="1.0"
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
                      <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                        Est. Duration (hours)
                      </label>
                      <input
                        type="number"
                        value={newTemplate.estimatedDuration || ''}
                        onChange={(e) => setNewTemplate({ ...newTemplate, estimatedDuration: parseInt(e.target.value) })}
                        placeholder="0"
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

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Description
                    </label>
                    <textarea
                      value={newTemplate.description || ''}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      placeholder="Describe the purpose and scope of this template"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px', display: 'block' }}>
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newTemplate.tags?.join(', ') || ''}
                      onChange={(e) => setNewTemplate({ 
                        ...newTemplate, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                      })}
                      placeholder="e.g., quality, safety, inspection"
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

                {/* Checklist Items */}
                <div style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#374151' }}>
                      Checklist Items ({newTemplate.items?.length || 0})
                    </h4>
                    <button
                      onClick={() => setShowItemForm(true)}
                      style={{
                        padding: '6px 12px',
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
                      <Plus style={{ width: '14px', height: '14px' }} />
                      Add Item
                    </button>
                  </div>

                  {/* Item Form */}
                  {showItemForm && (
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}>
                      <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>
                        {editingItemIndex !== -1 ? 'Edit Item' : 'New Item'}
                      </h5>
                      
                      <div style={{ display: 'grid', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px', display: 'block' }}>
                            Title *
                          </label>
                          <input
                            type="text"
                            value={newItem.title || ''}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            placeholder="Enter item title"
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px', display: 'block' }}>
                            Description
                          </label>
                          <textarea
                            value={newItem.description || ''}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            placeholder="Enter item description"
                            rows={2}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '13px',
                              resize: 'vertical'
                            }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px', display: 'block' }}>
                              Category
                            </label>
                            <input
                              type="text"
                              value={newItem.category || ''}
                              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                              placeholder="e.g., Excavation, Concrete"
                              style={{
                                width: '100%',
                                padding: '6px 10px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '4px', display: 'block' }}>
                              Estimated Hours
                            </label>
                            <input
                              type="number"
                              value={newItem.estimatedHours || ''}
                              onChange={(e) => setNewItem({ ...newItem, estimatedHours: parseFloat(e.target.value) })}
                              placeholder="0"
                              style={{
                                width: '100%',
                                padding: '6px 10px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '13px'
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                          <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={newItem.mandatory || false}
                              onChange={(e) => setNewItem({ ...newItem, mandatory: e.target.checked })}
                            />
                            <span style={{ fontWeight: '500', color: '#374151' }}>Mandatory</span>
                          </label>
                          <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={newItem.critical || false}
                              onChange={(e) => setNewItem({ ...newItem, critical: e.target.checked })}
                            />
                            <span style={{ fontWeight: '500', color: '#374151' }}>Critical</span>
                          </label>
                          <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={newItem.requiresVerification || false}
                              onChange={(e) => setNewItem({ ...newItem, requiresVerification: e.target.checked })}
                            />
                            <span style={{ fontWeight: '500', color: '#374151' }}>Requires Verification</span>
                          </label>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => {
                              setShowItemForm(false);
                              setEditingItemIndex(null);
                              setNewItem({
                                title: '',
                                description: '',
                                mandatory: false,
                                critical: false,
                                requiresVerification: false,
                                estimatedHours: 0,
                                category: ''
                              });
                            }}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: 'white',
                              color: '#374151',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddItem}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#7c3aed',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            {editingItemIndex !== -1 ? 'Update Item' : 'Add Item'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Items List */}
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {newTemplate.items?.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'start',
                          gap: '12px'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                              {index + 1}. {item.title}
                            </span>
                            {item.mandatory && (
                              <span style={{
                                fontSize: '10px',
                                padding: '1px 4px',
                                backgroundColor: '#fee2e2',
                                color: '#dc2626',
                                borderRadius: '3px',
                                fontWeight: '600'
                              }}>
                                MANDATORY
                              </span>
                            )}
                            {item.critical && (
                              <span style={{
                                fontSize: '10px',
                                padding: '1px 4px',
                                backgroundColor: '#fef2f2',
                                color: '#b91c1c',
                                borderRadius: '3px',
                                fontWeight: '600'
                              }}>
                                CRITICAL
                              </span>
                            )}
                            {item.requiresVerification && (
                              <Shield style={{ width: '12px', height: '12px', color: '#f59e0b' }} />
                            )}
                          </div>
                          {item.description && (
                            <p style={{ fontSize: '12px', color: '#6b7280' }}>
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            onClick={() => {
                              setNewItem(item);
                              setEditingItemIndex(index);
                              setShowItemForm(true);
                            }}
                            style={{
                              padding: '4px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit2 style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                          </button>
                          <button
                            onClick={() => {
                              const updatedItems = newTemplate.items?.filter((_, i) => i !== index);
                              setNewTemplate({ ...newTemplate, items: updatedItems });
                            }}
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
                    ))}
                  </div>

                  {(!newTemplate.items || newTemplate.items.length === 0) && !showItemForm && (
                    <div style={{
                      padding: '32px',
                      textAlign: 'center',
                      color: '#9ca3af'
                    }}>
                      <ClipboardList style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#d1d5db' }} />
                      <p style={{ fontSize: '13px' }}>No items added yet</p>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setActiveTab('browse')}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'white',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTemplate}
                    disabled={!newTemplate.name || !newTemplate.category || !newTemplate.items?.length}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: newTemplate.name && newTemplate.category && newTemplate.items?.length ? '#7c3aed' : '#e5e7eb',
                      color: newTemplate.name && newTemplate.category && newTemplate.items?.length ? 'white' : '#9ca3af',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: newTemplate.name && newTemplate.category && newTemplate.items?.length ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Save style={{ width: '16px', height: '16px' }} />
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manage Templates Tab */}
          {activeTab === 'manage' && (
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Manage Templates
              </h3>
              
              <div style={{ display: 'grid', gap: '12px' }}>
                {templates.map(template => (
                  <div
                    key={template.id}
                    style={{
                      padding: '16px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                          {template.name}
                        </h4>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                          {template.description}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{
                            padding: '2px 8px',
                            backgroundColor: '#e0e7ff',
                            color: '#4338ca',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {template.type}
                          </span>
                          <span style={{
                            padding: '2px 8px',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {template.category}
                          </span>
                          <span style={{
                            padding: '2px 8px',
                            backgroundColor: '#dcfce7',
                            color: '#166534',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {template.items.length} items
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setEditingTemplate(template);
                            setShowEditModal(true);
                            setActiveTab('create');
                          }}
                          title="Edit template"
                          style={{
                            padding: '6px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Edit2 style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                        </button>
                        <button
                          onClick={() => {
                            const duplicatedTemplate = {
                              ...template,
                              id: `template-${Date.now()}`,
                              name: `${template.name} (Copy)`,
                              items: [...template.items]
                            };
                            setTemplates([...templates, duplicatedTemplate]);
                          }}
                          title="Duplicate template"
                          style={{
                            padding: '6px',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Copy style={{ width: '14px', height: '14px', color: '#6b7280' }} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${template.name}"?`)) {
                              setTemplates(templates.filter(t => t.id !== template.id));
                            }
                          }}
                          title="Delete template"
                          style={{
                            padding: '6px',
                            backgroundColor: '#fee2e2',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Templates Tab */}
          {activeTab === 'selected' && (
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
                Selected Templates ({selectedTemplates.length})
              </h3>
              
              {selectedTemplates.length > 0 ? (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {selectedTemplates.map(template => (
                    <div
                      key={template.id}
                      style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                            {template.name}
                          </h4>
                          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                            {template.description}
                          </p>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                              padding: '2px 8px',
                              backgroundColor: '#e0e7ff',
                              color: '#4338ca',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              {template.type}
                            </span>
                            <span style={{
                              padding: '2px 8px',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              {template.items.length} items
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            // Remove from selected
                            const updated = selectedTemplates.filter(t => t.id !== template.id);
                            // You'd call a parent function here to update the selected templates
                          }}
                          style={{
                            padding: '6px',
                            backgroundColor: '#fee2e2',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <X style={{ width: '16px', height: '16px', color: '#dc2626' }} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '48px',
                  textAlign: 'center',
                  color: '#9ca3af'
                }}>
                  <Package style={{ width: '48px', height: '48px', margin: '0 auto 16px', color: '#d1d5db' }} />
                  <p style={{ fontSize: '14px', marginBottom: '8px' }}>No templates selected</p>
                  <p style={{ fontSize: '13px' }}>Browse and select templates to use in your project</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
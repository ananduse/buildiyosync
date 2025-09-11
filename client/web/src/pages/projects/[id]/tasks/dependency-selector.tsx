import React, { useState } from 'react';
import { 
  Search, 
  GitBranch, 
  AlertCircle, 
  X, 
  Plus,
  ArrowRight,
  ArrowLeft,
  Link2
} from 'lucide-react';

interface DependencySelectorProps {
  existingDependencies: string[];
  existingBlocks: string[];
  onAddDependency: (taskId: string) => void;
  onAddBlock: (taskId: string) => void;
  onRemoveDependency: (taskId: string) => void;
  onRemoveBlock: (taskId: string) => void;
}

export const DependencySelector: React.FC<DependencySelectorProps> = ({
  existingDependencies,
  existingBlocks,
  onAddDependency,
  onAddBlock,
  onRemoveDependency,
  onRemoveBlock
}) => {
  const [showDependencyPicker, setShowDependencyPicker] = useState(false);
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'dependency' | 'block'>('dependency');

  // Sample tasks for selection - in real app, this would come from props or API
  const availableTasks = [
    { id: 'task-1', name: 'Site visit and evaluation', status: 'In Progress' },
    { id: 'task-2', name: 'Architectural drawings and approvals', status: 'Complete' },
    { id: 'task-3', name: 'Budget estimation and approval', status: 'In Progress' },
    { id: 'task-4', name: 'Site excavation', status: 'In Progress' },
    { id: 'task-5', name: 'Foundation concrete pouring', status: 'To Do' },
    { id: 'task-6', name: 'Wall exterior and interior finishing', status: 'To Do' },
    { id: 'task-7', name: 'Final inspection and handover', status: 'To Do' },
    { id: 'task-8', name: 'Foundation steel reinforcement', status: 'In Progress' },
    { id: 'task-9', name: 'Foundation waterproofing', status: 'To Do' },
    { id: 'task-10', name: 'Main water line installation', status: 'To Do' }
  ];

  const filteredTasks = availableTasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !existingDependencies.includes(task.name) &&
    !existingBlocks.includes(task.name)
  );

  return (
    <div>
      {/* Dependencies Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <ArrowLeft style={{ width: '16px', height: '16px', color: '#6b7280' }} />
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            This Task Depends On
          </label>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            (Tasks that must be completed before this one)
          </span>
        </div>
        
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          minHeight: '120px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {existingDependencies.map((dep, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: 'white',
                  border: '1px solid #fbbf24',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}
              >
                <GitBranch style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
                <span style={{ color: '#111827', fontWeight: '500' }}>{dep}</span>
                <X
                  style={{ width: '14px', height: '14px', cursor: 'pointer', color: '#6b7280' }}
                  onClick={() => onRemoveDependency(dep)}
                />
              </div>
            ))}
          </div>
          
          {showDependencyPicker ? (
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '12px',
              marginTop: '8px'
            }}>
              <div style={{ marginBottom: '8px', position: 'relative' }}>
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
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 8px 8px 32px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                />
              </div>
              
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => {
                      onAddDependency(task.name);
                      setShowDependencyPicker(false);
                      setSearchTerm('');
                    }}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>{task.name}</span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      backgroundColor: task.status === 'Complete' ? '#ecfdf5' :
                                       task.status === 'In Progress' ? '#eff6ff' : '#f3f4f6',
                      color: task.status === 'Complete' ? '#065f46' :
                             task.status === 'In Progress' ? '#1e40af' : '#6b7280',
                      borderRadius: '4px'
                    }}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={() => {
                    setShowDependencyPicker(false);
                    setSearchTerm('');
                  }}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDependencyPicker(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'white',
                border: '1px dashed #d1d5db',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9ca3af';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <Plus style={{ width: '14px', height: '14px' }} />
              Add Dependency
            </button>
          )}
        </div>
      </div>

      {/* Blocks Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <ArrowRight style={{ width: '16px', height: '16px', color: '#6b7280' }} />
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>
            This Task Blocks
          </label>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            (Tasks that cannot start until this one is complete)
          </span>
        </div>
        
        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          minHeight: '120px'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {existingBlocks.map((block, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: 'white',
                  border: '1px solid #ef4444',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}
              >
                <AlertCircle style={{ width: '14px', height: '14px', color: '#ef4444' }} />
                <span style={{ color: '#111827', fontWeight: '500' }}>{block}</span>
                <X
                  style={{ width: '14px', height: '14px', cursor: 'pointer', color: '#6b7280' }}
                  onClick={() => onRemoveBlock(block)}
                />
              </div>
            ))}
          </div>
          
          {showBlockPicker ? (
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '12px',
              marginTop: '8px'
            }}>
              <div style={{ marginBottom: '8px', position: 'relative' }}>
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
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 8px 8px 32px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                />
              </div>
              
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {filteredTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => {
                      onAddBlock(task.name);
                      setShowBlockPicker(false);
                      setSearchTerm('');
                    }}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>{task.name}</span>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      backgroundColor: task.status === 'Complete' ? '#ecfdf5' :
                                       task.status === 'In Progress' ? '#eff6ff' : '#f3f4f6',
                      color: task.status === 'Complete' ? '#065f46' :
                             task.status === 'In Progress' ? '#1e40af' : '#6b7280',
                      borderRadius: '4px'
                    }}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={() => {
                    setShowBlockPicker(false);
                    setSearchTerm('');
                  }}
                  style={{
                    flex: 1,
                    padding: '6px',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowBlockPicker(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'white',
                border: '1px dashed #d1d5db',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#9ca3af';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              <Plus style={{ width: '14px', height: '14px' }} />
              Add Blocking Task
            </button>
          )}
        </div>
      </div>

      {/* Dependency Visualization */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#fefce8',
        borderRadius: '8px',
        border: '1px solid #fef3c7'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Link2 style={{ width: '16px', height: '16px', color: '#ca8a04' }} />
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#713f12' }}>
            Dependency Chain
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#854d0e', lineHeight: '1.5' }}>
          {existingDependencies.length > 0 && (
            <div>
              <strong>Must wait for:</strong> {existingDependencies.join(' → ')}
            </div>
          )}
          {existingBlocks.length > 0 && (
            <div style={{ marginTop: '4px' }}>
              <strong>Blocks:</strong> {existingBlocks.join(', ')}
            </div>
          )}
          {existingDependencies.length === 0 && existingBlocks.length === 0 && (
            <div style={{ color: '#9ca3af' }}>
              No dependencies configured
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
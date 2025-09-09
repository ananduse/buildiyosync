import React from 'react';
import { Plus, Trash2, Settings } from 'lucide-react';

interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'url' | 'email' | 'phone' | 'currency' | 'percentage';
  value: any;
  required: boolean;
  options?: string[];
  placeholder?: string;
  validation?: string;
  min?: number;
  max?: number;
}

interface CustomFieldsTabProps {
  customFields: CustomField[];
  onUpdateFields: (fields: CustomField[]) => void;
}

export const CustomFieldsTab: React.FC<CustomFieldsTabProps> = ({ customFields, onUpdateFields }) => {
  const [showAddField, setShowAddField] = React.useState(false);
  const [newField, setNewField] = React.useState({
    name: '',
    type: 'text' as const,
    required: false,
    options: [] as string[],
    placeholder: '',
    validation: '',
    min: undefined as number | undefined,
    max: undefined as number | undefined
  });

  const handleAddField = () => {
    if (newField.name) {
      const field: CustomField = {
        id: `field-${Date.now()}`,
        ...newField,
        value: newField.type === 'checkbox' ? false : ''
      };
      onUpdateFields([...customFields, field]);
      setShowAddField(false);
      setNewField({
        name: '',
        type: 'text',
        required: false,
        options: [],
        placeholder: '',
        validation: '',
        min: undefined,
        max: undefined
      });
    }
  };

  const handleUpdateFieldValue = (fieldId: string, value: any) => {
    const updatedFields = customFields.map(f =>
      f.id === fieldId ? { ...f, value } : f
    );
    onUpdateFields(updatedFields);
  };

  const handleDeleteField = (fieldId: string) => {
    onUpdateFields(customFields.filter(f => f.id !== fieldId));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
          Custom Fields
        </h3>
        <button
          onClick={() => setShowAddField(true)}
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
          <Plus style={{ width: '16px', height: '16px' }} />
          Add Field
        </button>
      </div>

      {/* Add Field Form */}
      {showAddField && (
        <div style={{
          padding: '16px',
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                Field Name *
              </label>
              <input
                type="text"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                placeholder="e.g., Customer ID"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                Field Type *
              </label>
              <select
                value={newField.type}
                onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="url">URL</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="currency">Currency (₹)</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
          </div>

          {/* Dropdown Options */}
          {newField.type === 'dropdown' && (
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                Options (comma separated)
              </label>
              <input
                type="text"
                placeholder="Option 1, Option 2, Option 3"
                onChange={(e) => setNewField({ ...newField, options: e.target.value.split(',').map(o => o.trim()) })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
          )}

          {/* Number Range */}
          {(newField.type === 'number' || newField.type === 'currency' || newField.type === 'percentage') && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Min Value
                </label>
                <input
                  type="number"
                  value={newField.min || ''}
                  onChange={(e) => setNewField({ ...newField, min: e.target.value ? Number(e.target.value) : undefined })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                  Max Value
                </label>
                <input
                  type="number"
                  value={newField.max || ''}
                  onChange={(e) => setNewField({ ...newField, max: e.target.value ? Number(e.target.value) : undefined })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          )}

          {/* Placeholder */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
              Placeholder Text
            </label>
            <input
              type="text"
              value={newField.placeholder}
              onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
              placeholder="Enter placeholder text"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Required Checkbox */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={newField.required}
                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
              />
              <span style={{ fontSize: '14px', color: '#374151' }}>Required field</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setShowAddField(false);
                setNewField({
                  name: '',
                  type: 'text',
                  required: false,
                  options: [],
                  placeholder: '',
                  validation: '',
                  min: undefined,
                  max: undefined
                });
              }}
              style={{
                padding: '6px 12px',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddField}
              style={{
                padding: '6px 12px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Add Field
            </button>
          </div>
        </div>
      )}

      {/* Fields List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {customFields.length === 0 && !showAddField ? (
          <div style={{
            textAlign: 'center',
            padding: '32px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px dashed #d1d5db'
          }}>
            <Settings style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
              No custom fields yet
            </p>
            <p style={{ fontSize: '13px', color: '#9ca3af' }}>
              Add custom fields to capture additional information specific to your workflow
            </p>
          </div>
        ) : (
          customFields.map((field) => (
            <div
              key={field.id}
              style={{
                padding: '12px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                    {field.name}
                    {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    textTransform: 'capitalize'
                  }}>
                    {field.type}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteField(field.id)}
                  style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#ef4444'
                  }}
                >
                  <Trash2 style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

              {/* Field Inputs */}
              {field.type === 'text' && (
                <input
                  type="text"
                  value={field.value || ''}
                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                  placeholder={field.placeholder || `Enter ${field.name.toLowerCase()}`}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  value={field.value || ''}
                  min={field.min}
                  max={field.max}
                  onChange={(e) => handleUpdateFieldValue(field.id, Number(e.target.value))}
                  placeholder={field.placeholder || `Enter ${field.name.toLowerCase()}`}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              )}

              {field.type === 'date' && (
                <input
                  type="date"
                  value={field.value || ''}
                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              )}

              {field.type === 'dropdown' && (
                <select
                  value={field.value || ''}
                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select {field.name}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => handleUpdateFieldValue(field.id, e.target.checked)}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>
                    {field.placeholder || `Enable ${field.name.toLowerCase()}`}
                  </span>
                </label>
              )}

              {field.type === 'url' && (
                <input
                  type="url"
                  value={field.value || ''}
                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                  placeholder={field.placeholder || 'https://example.com'}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              )}

              {field.type === 'email' && (
                <input
                  type="email"
                  value={field.value || ''}
                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                  placeholder={field.placeholder || 'email@example.com'}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              )}

              {field.type === 'phone' && (
                <input
                  type="tel"
                  value={field.value || ''}
                  onChange={(e) => handleUpdateFieldValue(field.id, e.target.value)}
                  placeholder={field.placeholder || '+91 98765 43210'}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              )}

              {field.type === 'currency' && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>₹</span>
                  <input
                    type="number"
                    value={field.value || ''}
                    min={field.min}
                    max={field.max}
                    onChange={(e) => handleUpdateFieldValue(field.id, Number(e.target.value))}
                    placeholder={field.placeholder || '0.00'}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              )}

              {field.type === 'percentage' && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="number"
                    value={field.value || ''}
                    min={field.min || 0}
                    max={field.max || 100}
                    onChange={(e) => handleUpdateFieldValue(field.id, Number(e.target.value))}
                    placeholder={field.placeholder || '0'}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>%</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
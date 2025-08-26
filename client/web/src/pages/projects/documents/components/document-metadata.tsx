import { useState } from 'react';
import { 
  Settings, Plus, Edit2, Trash2, Save, X, Info,
  Calendar, Hash, Type, ToggleLeft, Link, Users, List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Document, CustomField, DocumentMetadata } from '@/types/document.types';

interface DocumentMetadataProps {
  document: Document;
  customFields: CustomField[];
  onUpdateMetadata: (metadata: DocumentMetadata) => void;
  onManageFields?: () => void;
}

export default function DocumentMetadataComponent({
  document,
  customFields,
  onUpdateMetadata,
  onManageFields
}: DocumentMetadataProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMetadata, setEditedMetadata] = useState<DocumentMetadata>(
    document.metadata || {}
  );
  const [showFieldManager, setShowFieldManager] = useState(false);
  const [newField, setNewField] = useState<Partial<CustomField>>({
    type: 'text',
    required: false,
  });
  
  // Standard metadata fields
  const standardFields = [
    { key: 'author', label: 'Author', type: 'text', icon: Users },
    { key: 'revisedBy', label: 'Revised By', type: 'text', icon: Users },
    { key: 'checkedBy', label: 'Checked By', type: 'text', icon: Users },
    { key: 'approvedBy', label: 'Approved By', type: 'text', icon: Users },
    { key: 'issueDate', label: 'Issue Date', type: 'date', icon: Calendar },
    { key: 'effectiveDate', label: 'Effective Date', type: 'date', icon: Calendar },
    { key: 'expiryDate', label: 'Expiry Date', type: 'date', icon: Calendar },
    { key: 'drawingScale', label: 'Drawing Scale', type: 'text', icon: Hash },
    { key: 'paperSize', label: 'Paper Size', type: 'select', icon: Type, options: ['A0', 'A1', 'A2', 'A3', 'A4'] },
    { key: 'discipline', label: 'Discipline', type: 'text', icon: List },
    { key: 'phase', label: 'Phase', type: 'select', icon: List, options: ['Concept', 'Design', 'Construction', 'Commissioning', 'Handover'] },
    { key: 'zone', label: 'Zone', type: 'text', icon: Hash },
    { key: 'level', label: 'Level', type: 'text', icon: Hash },
    { key: 'grid', label: 'Grid', type: 'text', icon: Hash },
    { key: 'revision', label: 'Revision', type: 'text', icon: Hash },
    { key: 'contractPackage', label: 'Contract Package', type: 'text', icon: Type },
    { key: 'submittalNumber', label: 'Submittal Number', type: 'text', icon: Hash },
    { key: 'transmittalNumber', label: 'Transmittal Number', type: 'text', icon: Hash },
  ];
  
  const handleSaveMetadata = () => {
    onUpdateMetadata(editedMetadata);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedMetadata(document.metadata || {});
    setIsEditing(false);
  };
  
  const updateFieldValue = (key: string, value: any) => {
    setEditedMetadata(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const updateCustomFieldValue = (fieldId: string, value: any) => {
    setEditedMetadata(prev => ({
      ...prev,
      customFields: {
        ...(prev.customFields || {}),
        [fieldId]: value,
      },
    }));
  };
  
  const getFieldIcon = (type: string) => {
    const icons: Record<string, any> = {
      text: Type,
      number: Hash,
      date: Calendar,
      select: List,
      multiselect: List,
      boolean: ToggleLeft,
      user: Users,
      url: Link,
    };
    return icons[type] || Info;
  };
  
  const renderFieldInput = (field: any, value: any, onChange: (val: any) => void) => {
    switch (field.type) {
      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={!isEditing}
          />
        );
        
      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange} disabled={!isEditing}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {(field.options || []).map((opt: string) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'boolean':
        return (
          <Switch
            checked={value || false}
            onCheckedChange={onChange}
            disabled={!isEditing}
          />
        );
        
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={!isEditing}
          />
        );
        
      case 'url':
        return (
          <Input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            disabled={!isEditing}
          />
        );
        
      default:
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={!isEditing}
          />
        );
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Document Metadata</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFieldManager(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Manage Fields
            </Button>
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveMetadata}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="standard">
            <TabsList className="w-full">
              <TabsTrigger value="standard" className="flex-1">
                Standard Fields
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex-1">
                Custom Fields ({customFields.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {standardFields.map(field => {
                  const Icon = field.icon;
                  const value = (editedMetadata as any)[field.key];
                  
                  return (
                    <div key={field.key}>
                      <Label className="flex items-center gap-2 mb-2">
                        <Icon className="h-3 w-3" />
                        {field.label}
                      </Label>
                      {renderFieldInput(
                        field,
                        value,
                        (val) => updateFieldValue(field.key, val)
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Additional Metadata */}
              <div className="pt-4 border-t">
                <Label className="flex items-center gap-2 mb-2">
                  <Info className="h-3 w-3" />
                  Response Required
                </Label>
                <div className="flex items-center gap-4">
                  <Switch
                    checked={editedMetadata.responseRequired || false}
                    onCheckedChange={(checked) => updateFieldValue('responseRequired', checked)}
                    disabled={!isEditing}
                  />
                  {editedMetadata.responseRequired && (
                    <div className="flex-1">
                      <Input
                        type="date"
                        value={editedMetadata.responseDate || ''}
                        onChange={(e) => updateFieldValue('responseDate', e.target.value)}
                        disabled={!isEditing}
                        placeholder="Response date"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Users className="h-3 w-3" />
                  Distribution List
                </Label>
                <Textarea
                  value={(editedMetadata.distribution || []).join(', ')}
                  onChange={(e) => updateFieldValue('distribution', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="Enter email addresses separated by commas"
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4 mt-4">
              {customFields.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-3">No custom fields defined</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFieldManager(true)}
                  >
                    Add Custom Field
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customFields.map(field => {
                    const Icon = getFieldIcon(field.type);
                    const value = editedMetadata.customFields?.[field.id];
                    
                    return (
                      <div key={field.id}>
                        <Label className="flex items-center gap-2 mb-2">
                          <Icon className="h-3 w-3" />
                          {field.name}
                          {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        {renderFieldInput(
                          field,
                          value,
                          (val) => updateCustomFieldValue(field.id, val)
                        )}
                        {field.validation?.message && (
                          <p className="text-xs text-gray-500 mt-1">
                            {field.validation.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Field Manager Dialog */}
      <Dialog open={showFieldManager} onOpenChange={setShowFieldManager}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Manage Custom Fields</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col h-full">
            <Tabs defaultValue="existing" className="flex-1">
              <TabsList className="w-full">
                <TabsTrigger value="existing" className="flex-1">
                  Existing Fields
                </TabsTrigger>
                <TabsTrigger value="add" className="flex-1">
                  Add New Field
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="existing" className="mt-4">
                <ScrollArea className="h-96">
                  <div className="space-y-2 pr-4">
                    {customFields.map(field => {
                      const Icon = getFieldIcon(field.type);
                      
                      return (
                        <div
                          key={field.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{field.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {field.type}
                                </Badge>
                                {field.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    Required
                                  </Badge>
                                )}
                                {field.category && (
                                  <Badge variant="secondary" className="text-xs">
                                    {field.category}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="add" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Field Name</Label>
                    <Input
                      value={newField.name || ''}
                      onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter field name"
                    />
                  </div>
                  
                  <div>
                    <Label>Field Type</Label>
                    <Select
                      value={newField.type}
                      onValueChange={(value: any) => setNewField(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                        <SelectItem value="multiselect">Multi-Select</SelectItem>
                        <SelectItem value="boolean">Yes/No</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Category</Label>
                    <Input
                      value={newField.category || ''}
                      onChange={(e) => setNewField(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Optional category"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newField.required || false}
                      onCheckedChange={(checked) => setNewField(prev => ({ ...prev, required: checked }))}
                    />
                    <Label>Required Field</Label>
                  </div>
                </div>
                
                {(newField.type === 'select' || newField.type === 'multiselect') && (
                  <div>
                    <Label>Options (one per line)</Label>
                    <Textarea
                      value={(newField.options || []).join('\n')}
                      onChange={(e) => setNewField(prev => ({
                        ...prev,
                        options: e.target.value.split('\n').filter(o => o.trim())
                      }))}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      rows={4}
                    />
                  </div>
                )}
                
                {newField.type === 'number' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Min Value</Label>
                      <Input
                        type="number"
                        value={newField.validation?.min || ''}
                        onChange={(e) => setNewField(prev => ({
                          ...prev,
                          validation: { ...prev.validation, min: Number(e.target.value) }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Max Value</Label>
                      <Input
                        type="number"
                        value={newField.validation?.max || ''}
                        onChange={(e) => setNewField(prev => ({
                          ...prev,
                          validation: { ...prev.validation, max: Number(e.target.value) }
                        }))}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFieldManager(false)}>
              Close
            </Button>
            {onManageFields && (
              <Button onClick={onManageFields}>
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
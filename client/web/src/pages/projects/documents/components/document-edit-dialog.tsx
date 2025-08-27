import { useState, useEffect } from 'react';
import {
  FileText, Upload, X, AlertCircle, Folder, Hash, Shield,
  Calendar, User, Tag, Building, FileSignature
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import type { Document, DocumentCategory } from '@/types/document.types';
import { DOCUMENT_CATEGORIES } from '@/types/document.types';

interface DocumentEditDialogProps {
  document: Document | null;
  open: boolean;
  onClose: () => void;
  onSave: (document: Partial<Document>) => void;
}

export default function DocumentEditDialog({
  document,
  open,
  onClose,
  onSave
}: DocumentEditDialogProps) {
  const [formData, setFormData] = useState<Partial<Document>>({
    title: '',
    description: '',
    documentNumber: '',
    category: DOCUMENT_CATEGORIES[0],
    confidential: false,
    tags: [],
    metadata: {}
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (document) {
      setFormData({
        ...document,
        tags: document.tags || [],
        metadata: document.metadata || {}
      });
    } else {
      // Reset for new document
      setFormData({
        title: '',
        description: '',
        documentNumber: generateDocumentNumber(),
        category: DOCUMENT_CATEGORIES[0],
        confidential: false,
        tags: [],
        metadata: {}
      });
    }
    setIsDirty(false);
    setErrors({});
  }, [document, open]);

  const generateDocumentNumber = () => {
    const prefix = 'DOC';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleInputChange = (field: keyof Document, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    const category = DOCUMENT_CATEGORIES.find(cat => cat.id === categoryId);
    if (category) {
      handleInputChange('category', category);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      const updatedTags = [...(formData.tags || []), newTag.trim()];
      handleInputChange('tags', updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = formData.tags?.filter(tag => tag !== tagToRemove) || [];
    handleInputChange('tags', updatedTags);
  };

  const handleMetadataChange = (key: string, value: string) => {
    const updatedMetadata = {
      ...formData.metadata,
      [key]: value
    };
    handleInputChange('metadata', updatedMetadata);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Document title is required';
    }

    if (!formData.documentNumber?.trim()) {
      newErrors.documentNumber = 'Document number is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const updatedDocument: Partial<Document> = {
      ...formData,
      updatedAt: new Date().toISOString()
    };

    onSave(updatedDocument);
    onClose();
  };

  const handleClose = () => {
    if (isDirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirm) return;
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-5 w-5" />
            {document ? 'Edit Document' : 'New Document'}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-1">
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Document Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter document title"
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentNumber">
                    Document Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="documentNumber"
                      value={formData.documentNumber}
                      onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                      placeholder="DOC-123456"
                      className={cn("flex-1", errors.documentNumber && "border-red-500")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('documentNumber', generateDocumentNumber())}
                    >
                      <Hash className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.documentNumber && (
                    <p className="text-sm text-red-500">{errors.documentNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category?.id}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCUMENT_CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <span>{cat.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter document description"
                  rows={4}
                  className={cn(errors.description && "border-red-500")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="px-2 py-1">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {document && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1 text-sm">
                      <p><strong>Current Version:</strong> {document.currentVersion.versionNumber}</p>
                      <p><strong>Last Modified:</strong> {new Date(document.updatedAt).toLocaleString()}</p>
                      <p><strong>Modified By:</strong> {document.currentVersion.uploadedBy.name}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discipline">Discipline</Label>
                  <Input
                    id="discipline"
                    value={formData.metadata?.discipline || ''}
                    onChange={(e) => handleMetadataChange('discipline', e.target.value)}
                    placeholder="e.g., Architecture, Structural"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phase">Project Phase</Label>
                  <Select
                    value={formData.metadata?.phase || ''}
                    onValueChange={(value) => handleMetadataChange('phase', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concept">Concept Design</SelectItem>
                      <SelectItem value="schematic">Schematic Design</SelectItem>
                      <SelectItem value="detailed">Detailed Design</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="as-built">As-Built</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="drawingScale">Drawing Scale</Label>
                  <Input
                    id="drawingScale"
                    value={formData.metadata?.drawingScale || ''}
                    onChange={(e) => handleMetadataChange('drawingScale', e.target.value)}
                    placeholder="e.g., 1:100, 1:50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paperSize">Paper Size</Label>
                  <Select
                    value={formData.metadata?.paperSize || ''}
                    onValueChange={(value) => handleMetadataChange('paperSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A0">A0 (841 × 1189 mm)</SelectItem>
                      <SelectItem value="A1">A1 (594 × 841 mm)</SelectItem>
                      <SelectItem value="A2">A2 (420 × 594 mm)</SelectItem>
                      <SelectItem value="A3">A3 (297 × 420 mm)</SelectItem>
                      <SelectItem value="A4">A4 (210 × 297 mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zone">Zone/Area</Label>
                  <Input
                    id="zone"
                    value={formData.metadata?.zone || ''}
                    onChange={(e) => handleMetadataChange('zone', e.target.value)}
                    placeholder="e.g., Zone A, Building 1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level/Floor</Label>
                  <Input
                    id="level"
                    value={formData.metadata?.level || ''}
                    onChange={(e) => handleMetadataChange('level', e.target.value)}
                    placeholder="e.g., Ground Floor, Level 2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="system">System/Trade</Label>
                  <Input
                    id="system"
                    value={formData.metadata?.system || ''}
                    onChange={(e) => handleMetadataChange('system', e.target.value)}
                    placeholder="e.g., HVAC, Electrical, Plumbing"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specification">Specification Reference</Label>
                  <Input
                    id="specification"
                    value={formData.metadata?.specification || ''}
                    onChange={(e) => handleMetadataChange('specification', e.target.value)}
                    placeholder="e.g., SPEC-001"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="customField1">Custom Field 1</Label>
                <Input
                  id="customField1"
                  value={formData.metadata?.customField1 || ''}
                  onChange={(e) => handleMetadataChange('customField1', e.target.value)}
                  placeholder="Enter custom value"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customField2">Custom Field 2</Label>
                <Input
                  id="customField2"
                  value={formData.metadata?.customField2 || ''}
                  onChange={(e) => handleMetadataChange('customField2', e.target.value)}
                  placeholder="Enter custom value"
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="confidential">Confidential Document</Label>
                  <p className="text-sm text-gray-500">
                    Mark this document as confidential to restrict access
                  </p>
                </div>
                <Switch
                  id="confidential"
                  checked={formData.confidential}
                  onCheckedChange={(checked) => handleInputChange('confidential', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireApproval">Require Approval</Label>
                  <p className="text-sm text-gray-500">
                    Changes to this document require approval
                  </p>
                </div>
                <Switch
                  id="requireApproval"
                  checked={formData.metadata?.requireApproval || false}
                  onCheckedChange={(checked) => handleMetadataChange('requireApproval', checked.toString())}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableVersioning">Enable Version Control</Label>
                  <p className="text-sm text-gray-500">
                    Track all changes with version history
                  </p>
                </div>
                <Switch
                  id="enableVersioning"
                  checked={formData.metadata?.enableVersioning !== 'false'}
                  onCheckedChange={(checked) => handleMetadataChange('enableVersioning', checked.toString())}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowComments">Allow Comments</Label>
                  <p className="text-sm text-gray-500">
                    Users can add comments to this document
                  </p>
                </div>
                <Switch
                  id="allowComments"
                  checked={formData.metadata?.allowComments !== 'false'}
                  onCheckedChange={(checked) => handleMetadataChange('allowComments', checked.toString())}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">Retention Period</Label>
                <Select
                  value={formData.metadata?.retentionPeriod || ''}
                  onValueChange={(value) => handleMetadataChange('retentionPeriod', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="7years">7 Years</SelectItem>
                    <SelectItem value="permanent">Permanent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select
                  value={formData.metadata?.accessLevel || 'project'}
                  onValueChange={(value) => handleMetadataChange('accessLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="project">Project Team</SelectItem>
                    <SelectItem value="management">Management Only</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            {document ? 'Save Changes' : 'Create Document'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
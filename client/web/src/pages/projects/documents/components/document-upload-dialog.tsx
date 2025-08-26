import { useState, useCallback } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { DOCUMENT_CATEGORIES } from '@/types/document.types';

interface UploadFile {
  file: File;
  id: string;
  title: string;
  description: string;
  category: string;
  confidential: boolean;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

interface DocumentUploadDialogProps {
  projectId: string;
  onClose: () => void;
  onUpload: (files: UploadFile[]) => void;
}

export default function DocumentUploadDialog({
  projectId,
  onClose,
  onUpload
}: DocumentUploadDialogProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  }, []);
  
  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      title: file.name.replace(/\.[^/.]+$/, ''),
      description: '',
      category: DOCUMENT_CATEGORIES[0].id,
      confidential: false,
      progress: 0,
      status: 'pending'
    }));
    
    setFiles(prev => [...prev, ...uploadFiles]);
  };
  
  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };
  
  const updateFile = (fileId: string, updates: Partial<UploadFile>) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, ...updates } : f
    ));
  };
  
  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress
    for (const file of files) {
      updateFile(file.id, { status: 'uploading' });
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        updateFile(file.id, { progress });
      }
      
      updateFile(file.id, { status: 'complete', progress: 100 });
    }
    
    setIsUploading(false);
    onUpload(files);
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const canUpload = files.length > 0 && !isUploading && 
    files.every(f => f.title && f.category);
  
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
          <p className="text-sm text-gray-600">
            Upload documents to project {projectId}
          </p>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto px-1">
          {/* Drop Zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
              files.length > 0 ? "mb-4" : "mb-0"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              Drag and drop files here
            </p>
            <p className="text-sm text-gray-600 mb-4">
              or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button variant="outline" asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Files
              </label>
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Supported formats: PDF, Word, Excel, AutoCAD, Images
            </p>
          </div>
          
          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">
                  {files.length} file{files.length > 1 ? 's' : ''} selected
                </h3>
                {files.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFiles([])}
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="space-y-4">
                {files.map((file) => (
                  <div 
                    key={file.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="h-10 w-10 text-gray-400 mt-1" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {file.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.file.size)}
                          </p>
                        </div>
                      </div>
                      
                      {file.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {file.status === 'complete' && (
                        <Badge className="bg-green-100 text-green-700">
                          Complete
                        </Badge>
                      )}
                    </div>
                    
                    {file.status === 'uploading' && (
                      <Progress value={file.progress} className="h-1" />
                    )}
                    
                    {file.status === 'pending' && (
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`title-${file.id}`}>
                            Document Title
                          </Label>
                          <Input
                            id={`title-${file.id}`}
                            value={file.title}
                            onChange={(e) => updateFile(file.id, { title: e.target.value })}
                            placeholder="Enter document title"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`category-${file.id}`}>
                            Category
                          </Label>
                          <Select
                            value={file.category}
                            onValueChange={(value) => updateFile(file.id, { category: value })}
                          >
                            <SelectTrigger id={`category-${file.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DOCUMENT_CATEGORIES.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2">
                          <Label htmlFor={`desc-${file.id}`}>
                            Description (optional)
                          </Label>
                          <Textarea
                            id={`desc-${file.id}`}
                            value={file.description}
                            onChange={(e) => updateFile(file.id, { description: e.target.value })}
                            placeholder="Enter document description"
                            rows={2}
                          />
                        </div>
                        
                        <div className="col-span-2 flex items-center gap-2">
                          <Checkbox
                            id={`conf-${file.id}`}
                            checked={file.confidential}
                            onCheckedChange={(checked) => 
                              updateFile(file.id, { confidential: checked as boolean })
                            }
                          />
                          <Label 
                            htmlFor={`conf-${file.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Mark as confidential
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!canUpload}>
            {isUploading ? 'Uploading...' : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
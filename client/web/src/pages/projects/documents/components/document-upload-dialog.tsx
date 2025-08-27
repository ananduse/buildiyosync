import { useState, useCallback } from 'react';
import { 
  Upload, X, FileText, AlertCircle, Video, Image, File,
  CheckCircle, Clock, Play, FileVideo, Music, FileImage
} from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  preview?: string;
  duration?: string; // For videos
  dimensions?: { width: number; height: number }; // For images/videos
}

interface DocumentUploadDialogProps {
  projectId: string;
  onClose: () => void;
  onUpload: (files: UploadFile[]) => void;
}

const ACCEPTED_FILE_TYPES = {
  documents: {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    'text/csv': ['.csv'],
  },
  images: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp'],
    'image/bmp': ['.bmp'],
    'image/svg+xml': ['.svg'],
  },
  videos: {
    'video/mp4': ['.mp4'],
    'video/quicktime': ['.mov'],
    'video/x-msvideo': ['.avi'],
    'video/x-ms-wmv': ['.wmv'],
    'video/webm': ['.webm'],
    'video/x-matroska': ['.mkv'],
  },
  cad: {
    'application/dwg': ['.dwg'],
    'application/dxf': ['.dxf'],
    'model/vnd.ifc': ['.ifc'],
    'application/x-autocad': ['.dwg', '.dxf'],
  }
};

export default function DocumentUploadDialog({
  projectId,
  onClose,
  onUpload
}: DocumentUploadDialogProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  
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
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };
  
  const addFiles = async (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = await Promise.all(newFiles.map(async (file) => {
      const id = Math.random().toString(36).substr(2, 9);
      const preview = await generatePreview(file);
      const metadata = await getFileMetadata(file);
      
      return {
        file,
        id,
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: '',
        category: guessCategory(file),
        confidential: false,
        progress: 0,
        status: 'pending' as const,
        preview,
        ...metadata
      };
    }));
    
    setFiles(prev => [...prev, ...uploadFiles]);
  };
  
  const generatePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        video.onloadedmetadata = () => {
          video.currentTime = 1; // Seek to 1 second
        };
        
        video.onseeked = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx?.drawImage(video, 0, 0);
          resolve(canvas.toDataURL());
        };
        
        video.src = URL.createObjectURL(file);
      } else {
        resolve(undefined);
      }
    });
  };
  
  const getFileMetadata = (file: File): Promise<Partial<UploadFile>> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const duration = formatDuration(video.duration);
          resolve({
            duration,
            dimensions: { width: video.videoWidth, height: video.videoHeight }
          });
        };
        video.src = URL.createObjectURL(file);
      } else if (file.type.startsWith('image/')) {
        const img = new Image();
        img.onload = () => {
          resolve({
            dimensions: { width: img.width, height: img.height }
          });
        };
        img.src = URL.createObjectURL(file);
      } else {
        resolve({});
      }
    });
  };
  
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const guessCategory = (file: File): string => {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      return '10'; // Media/Documentation
    }
    if (file.name.toLowerCase().includes('spec')) {
      return '11'; // Specifications
    }
    return '1'; // Default to Architectural
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };
  
  const updateFile = (id: string, updates: Partial<UploadFile>) => {
    setFiles(prev => prev.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
  };
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    if (file.type.startsWith('video/')) {
      return <FileVideo className="h-5 w-5 text-purple-500" />;
    }
    if (file.type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />;
    }
    return <File className="h-5 w-5 text-gray-500" />;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setFiles(prev => prev.map(f => ({
        ...f,
        status: 'uploading',
        progress: i
      })));
    }
    
    setFiles(prev => prev.map(f => ({
      ...f,
      status: 'complete',
      progress: 100
    })));
    
    setTimeout(() => {
      onUpload(files);
      onClose();
    }, 500);
  };
  
  const filteredFiles = files.filter(f => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'documents') return !f.file.type.startsWith('image/') && !f.file.type.startsWith('video/');
    if (selectedTab === 'images') return f.file.type.startsWith('image/');
    if (selectedTab === 'videos') return f.file.type.startsWith('video/');
    return true;
  });
  
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
              "hover:border-gray-400"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              Drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supports PDF, Images, Videos, CAD files, and Office documents
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Max: 500MB for videos, 100MB for other files
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg,.mp4,.mov,.avi,.wmv,.webm,.mkv,.dwg,.dxf,.ifc"
            />
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select Files
            </Button>
          </div>
          
          {/* Files List */}
          {files.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Files to Upload ({files.length})</h3>
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="h-8">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
                    <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
                    <TabsTrigger value="videos" className="text-xs">Videos</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <ScrollArea className="h-[300px] border rounded-lg">
                <div className="p-4 space-y-3">
                  {filteredFiles.map((uploadFile) => (
                    <div
                      key={uploadFile.id}
                      className="border rounded-lg p-3 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        {/* Preview */}
                        {uploadFile.preview ? (
                          <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                            <img 
                              src={uploadFile.preview} 
                              alt={uploadFile.title}
                              className="w-full h-full object-cover"
                            />
                            {uploadFile.file.type.startsWith('video/') && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {getFileIcon(uploadFile.file)}
                          </div>
                        )}
                        
                        {/* File Details */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <Input
                                value={uploadFile.title}
                                onChange={(e) => updateFile(uploadFile.id, { title: e.target.value })}
                                placeholder="Document title"
                                className="font-medium mb-1"
                              />
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{formatFileSize(uploadFile.file.size)}</span>
                                {uploadFile.duration && (
                                  <>
                                    <span>•</span>
                                    <span>{uploadFile.duration}</span>
                                  </>
                                )}
                                {uploadFile.dimensions && (
                                  <>
                                    <span>•</span>
                                    <span>{uploadFile.dimensions.width}x{uploadFile.dimensions.height}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFile(uploadFile.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Select
                              value={uploadFile.category}
                              onValueChange={(value) => updateFile(uploadFile.id, { category: value })}
                            >
                              <SelectTrigger className="h-8 text-xs">
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
                            
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`confidential-${uploadFile.id}`}
                                checked={uploadFile.confidential}
                                onCheckedChange={(checked) => 
                                  updateFile(uploadFile.id, { confidential: !!checked })
                                }
                              />
                              <label 
                                htmlFor={`confidential-${uploadFile.id}`}
                                className="text-xs cursor-pointer"
                              >
                                Confidential
                              </label>
                            </div>
                          </div>
                          
                          <Textarea
                            value={uploadFile.description}
                            onChange={(e) => updateFile(uploadFile.id, { description: e.target.value })}
                            placeholder="Description (optional)"
                            className="min-h-[50px] text-xs"
                          />
                          
                          {uploadFile.status === 'uploading' && (
                            <Progress value={uploadFile.progress} className="h-1" />
                          )}
                          
                          {uploadFile.status === 'complete' && (
                            <div className="flex items-center gap-1 text-green-600 text-xs">
                              <CheckCircle className="h-3 w-3" />
                              Upload complete
                            </div>
                          )}
                          
                          {uploadFile.status === 'error' && (
                            <div className="flex items-center gap-1 text-red-600 text-xs">
                              <AlertCircle className="h-3 w-3" />
                              {uploadFile.error || 'Upload failed'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
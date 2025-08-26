import { useState } from 'react';
import { 
  X, Download, Share2, Printer, History, MessageSquare, 
  ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight,
  Highlighter, Type, Square, Circle, ArrowRight, Trash2,
  Save, Edit3, Lock, Unlock, MoreVertical, Maximize2
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Document, DocumentComment, DocumentAnnotation } from '@/types/document.types';

interface DocumentViewerProps {
  document: Document;
  onClose: () => void;
  onShowHistory: () => void;
}

export default function DocumentViewer({
  document,
  onClose,
  onShowHistory
}: DocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10); // Mock total pages
  const [zoom, setZoom] = useState(100);
  const [annotationTool, setAnnotationTool] = useState<string | null>(null);
  const [comments, setComments] = useState<DocumentComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<DocumentAnnotation[]>([]);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };
  
  const handleRotate = () => {
    console.log('Rotating document');
  };
  
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };
  
  const handleAnnotationToolSelect = (tool: string) => {
    setAnnotationTool(annotationTool === tool ? null : tool);
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: DocumentComment = {
      id: Math.random().toString(36).substr(2, 9),
      documentId: document.id,
      versionId: document.currentVersion.id,
      userId: 'current-user',
      user: {
        id: 'current-user',
        name: 'Current User',
        email: 'user@example.com'
      },
      content: newComment,
      pageNumber: currentPage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      resolved: false
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      review: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };
  
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold">{document.title}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-500">{document.documentNumber}</span>
                <Badge className={cn("text-xs", getStatusColor(document.currentVersion.status))}>
                  {document.currentVersion.status}
                </Badge>
                <span className="text-sm text-gray-500">v{document.currentVersion.versionNumber}</span>
                {document.confidential && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <Lock className="h-3 w-3" />
                    <span className="text-xs">Confidential</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onShowHistory}>
              <History className="h-4 w-4 mr-2" />
              Version History
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Document Viewer */}
          <div className="flex-1 flex flex-col bg-gray-100">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 border-r pr-2">
                  <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
                  <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Page Navigation */}
                <div className="flex items-center gap-1 border-r pr-2">
                  <Button variant="ghost" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-2">
                    {currentPage} / {totalPages}
                  </span>
                  <Button variant="ghost" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Annotation Tools */}
                <div className="flex items-center gap-1">
                  <Button 
                    variant={annotationTool === 'highlight' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleAnnotationToolSelect('highlight')}
                  >
                    <Highlighter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={annotationTool === 'text' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleAnnotationToolSelect('text')}
                  >
                    <Type className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={annotationTool === 'rectangle' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleAnnotationToolSelect('rectangle')}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={annotationTool === 'circle' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleAnnotationToolSelect('circle')}
                  >
                    <Circle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={annotationTool === 'arrow' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => handleAnnotationToolSelect('arrow')}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleRotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* PDF Viewer Area */}
            <div className="flex-1 overflow-auto p-8">
              <div 
                className="mx-auto bg-white shadow-lg"
                style={{
                  width: `${8.5 * zoom}px`,
                  minHeight: `${11 * zoom}px`,
                  transform: `scale(${zoom / 100}`,
                  transformOrigin: 'top center'
                }}
              >
                {/* Mock PDF Page */}
                <div className="p-8">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                  </div>
                  <div className="h-64 bg-gray-100 rounded mb-6"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-96 bg-white border-l flex flex-col">
            <Tabs defaultValue="comments" className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none">
                <TabsTrigger value="comments" className="flex-1">
                  Comments ({comments.length})
                </TabsTrigger>
                <TabsTrigger value="annotations" className="flex-1">
                  Annotations ({annotations.length})
                </TabsTrigger>
                <TabsTrigger value="info" className="flex-1">
                  Info
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="comments" className="flex-1 flex flex-col mt-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div 
                        key={comment.id}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer hover:bg-gray-50",
                          selectedComment === comment.id && "bg-blue-50 border-blue-300"
                        )}
                        onClick={() => setSelectedComment(comment.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback>
                              {comment.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {comment.user.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">
                              {comment.content}
                            </p>
                            {comment.pageNumber && (
                              <span className="text-xs text-gray-500 mt-1">
                                Page {comment.pageNumber}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Add Comment */}
                <div className="p-4 border-t">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="mb-2"
                  />
                  <Button 
                    className="w-full" 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="annotations" className="flex-1 p-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Select an annotation tool from the toolbar to start annotating the document.
                  </p>
                  {annotations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Edit3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No annotations yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="flex-1 p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="text-sm font-medium">{document.category.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Uploaded By</p>
                    <p className="text-sm font-medium">{document.currentVersion.uploadedBy.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Upload Date</p>
                    <p className="text-sm font-medium">{formatDate(document.currentVersion.uploadedAt)}</p>
                  </div>
                  {document.metadata && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm font-medium mb-2">Metadata</p>
                        <div className="space-y-2 text-sm">
                          {document.metadata.discipline && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Discipline:</span>
                              <span>{document.metadata.discipline}</span>
                            </div>
                          )}
                          {document.metadata.phase && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Phase:</span>
                              <span>{document.metadata.phase}</span>
                            </div>
                          )}
                          {document.metadata.drawingScale && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Scale:</span>
                              <span>{document.metadata.drawingScale}</span>
                            </div>
                          )}
                          {document.metadata.paperSize && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Paper Size:</span>
                              <span>{document.metadata.paperSize}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
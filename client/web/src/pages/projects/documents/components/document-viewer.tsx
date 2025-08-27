import { useState } from 'react';
import { 
  X, Download, Share2, Printer, History, MessageSquare,
  Edit3, Lock
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DocumentWorkflow from './document-workflow';
import DocumentRelated from './document-related';
import DocumentMetadataComponent from './document-metadata';
import SamplePDFViewer from './sample-pdf-viewer';
import DocumentComments from './document-comments';
import DocumentReviewHierarchy from './document-review-hierarchy';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { ColorAvatar } from '@/components/ui/color-avatar';
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
  const [comments, setComments] = useState<DocumentComment[]>(
    document.currentVersion.comments || []
  );
  const [newComment, setNewComment] = useState('');
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<DocumentAnnotation[]>(
    document.currentVersion.annotations || []
  );
  const [currentPage, setCurrentPage] = useState(1);
  
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
            {/* PDF Viewer with built-in toolbar */}
            <SamplePDFViewer
              documentUrl={document.currentVersion.fileUrl}
              initialPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              onAnnotation={(annotation) => {
                setAnnotations(prev => [...prev, annotation]);
                console.log('New annotation:', annotation);
              }}
            />
          </div>
          
          {/* Sidebar */}
          <div className="w-[420px] bg-white border-l flex flex-col">
            <Tabs defaultValue="comments" className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none flex justify-start gap-0.5 p-1 bg-gray-50">
                <TabsTrigger value="comments" className="text-xs px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Comments ({comments.length})
                </TabsTrigger>
                <TabsTrigger value="review" className="text-xs px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Review
                </TabsTrigger>
                <TabsTrigger value="workflow" className="text-xs px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Workflow
                </TabsTrigger>
                <TabsTrigger value="related" className="text-xs px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Related
                </TabsTrigger>
                <TabsTrigger value="metadata" className="text-xs px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Metadata
                </TabsTrigger>
                <TabsTrigger value="annotations" className="text-xs px-2 py-1.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Annotations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="comments" className="flex-1 flex flex-col mt-0 p-0">
                <DocumentComments
                  comments={comments}
                  currentUserId="current-user"
                  onAddComment={(comment, parentId) => {
                    // Handle adding comment with threading
                    const newComment: DocumentComment = {
                      id: Math.random().toString(36).substr(2, 9),
                      documentId: document.id,
                      versionId: document.currentVersion.id,
                      userId: comment.userId || 'current-user',
                      user: {
                        id: comment.userId || 'current-user',
                        name: 'Current User',
                        email: 'user@buildiyo.com'
                      },
                      content: comment.content || '',
                      pageNumber: currentPage,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      resolved: false
                    };
                    
                    if (parentId) {
                      // Add as reply to parent comment
                      const updateComments = (comments: DocumentComment[]): DocumentComment[] => {
                        return comments.map(c => {
                          if (c.id === parentId) {
                            return {
                              ...c,
                              replies: [...(c.replies || []), newComment]
                            };
                          }
                          if (c.replies) {
                            return {
                              ...c,
                              replies: updateComments(c.replies)
                            };
                          }
                          return c;
                        });
                      };
                      setComments(updateComments(comments));
                    } else {
                      setComments([...comments, newComment]);
                    }
                  }}
                  onResolveComment={(commentId) => {
                    const updateComments = (comments: DocumentComment[]): DocumentComment[] => {
                      return comments.map(c => {
                        if (c.id === commentId) {
                          return {
                            ...c,
                            resolved: true,
                            resolvedBy: {
                              id: 'current-user',
                              name: 'Current User',
                              email: 'user@buildiyo.com'
                            },
                            resolvedAt: new Date().toISOString()
                          };
                        }
                        if (c.replies) {
                          return {
                            ...c,
                            replies: updateComments(c.replies)
                          };
                        }
                        return c;
                      });
                    };
                    setComments(updateComments(comments));
                  }}
                  onDeleteComment={(commentId) => {
                    const filterComments = (comments: DocumentComment[]): DocumentComment[] => {
                      return comments
                        .filter(c => c.id !== commentId)
                        .map(c => ({
                          ...c,
                          replies: c.replies ? filterComments(c.replies) : undefined
                        }));
                    };
                    setComments(filterComments(comments));
                  }}
                  onEditComment={(commentId, content) => {
                    const updateComments = (comments: DocumentComment[]): DocumentComment[] => {
                      return comments.map(c => {
                        if (c.id === commentId) {
                          return {
                            ...c,
                            content,
                            updatedAt: new Date().toISOString()
                          };
                        }
                        if (c.replies) {
                          return {
                            ...c,
                            replies: updateComments(c.replies)
                          };
                        }
                        return c;
                      });
                    };
                    setComments(updateComments(comments));
                  }}
                />
              </TabsContent>
              
              <TabsContent value="review" className="flex-1 overflow-auto mt-0 p-0">
                <ScrollArea className="h-full">
                  <div className="px-3 py-3">
                    <DocumentReviewHierarchy
                      documentId={document.id}
                      onSubmitReview={(level, review) => {
                        console.log('Review submitted:', level, review);
                      }}
                      onRequestReview={(reviewerId) => {
                        console.log('Requesting review from:', reviewerId);
                      }}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="annotations" className="flex-1 px-3 py-3">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Select an annotation tool from the PDF viewer toolbar to add annotations.
                  </p>
                  {annotations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Edit3 className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No annotations yet</p>
                      <p className="text-xs mt-2">Use the highlight, text, or shape tools in the viewer</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {annotations.map((annotation, idx) => (
                        <div key={annotation.id} className="p-3 border rounded-lg bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium capitalize text-gray-700">
                                  {annotation.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Page {annotation.pageNumber || 1}
                                </span>
                              </div>
                              {annotation.content && (
                                <p className="text-sm text-gray-600">{annotation.content}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">
                                Added by {annotation.createdBy?.name || 'You'}
                              </p>
                            </div>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="workflow" className="flex-1 overflow-auto mt-0 p-0">
                <ScrollArea className="h-full">
                  <div className="px-3 py-3">
                    <DocumentWorkflow
                      document={document}
                      onStatusChange={(status, comment) => {
                        console.log('Status changed to:', status, comment);
                      }}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="related" className="flex-1 overflow-auto mt-0 p-0">
                <ScrollArea className="h-full">
                  <div className="px-3 py-3">
                    <DocumentRelated
                      document={document}
                      allDocuments={[]} // Would be passed from parent
                      relations={[]} // Would be passed from parent
                      onAddRelation={(relation) => {
                        console.log('Adding relation:', relation);
                      }}
                      onRemoveRelation={(id) => {
                        console.log('Removing relation:', id);
                      }}
                      onViewDocument={(doc) => {
                        console.log('Viewing document:', doc);
                      }}
                    />
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="metadata" className="flex-1 overflow-auto mt-0 p-0">
                <ScrollArea className="h-full">
                  <div className="px-3 py-3">
                    <DocumentMetadataComponent
                      document={document}
                      customFields={[]} // Would be passed from parent
                      onUpdateMetadata={(metadata) => {
                        console.log('Updating metadata:', metadata);
                      }}
                      onManageFields={() => {
                        console.log('Managing custom fields');
                      }}
                    />
                  </div>
                </ScrollArea>
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
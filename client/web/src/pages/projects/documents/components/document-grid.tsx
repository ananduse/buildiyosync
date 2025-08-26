import { Eye, Download, MoreVertical, Lock, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Document } from '@/types/document.types';

interface DocumentGridProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (docId: string, checked: boolean) => void;
  onDocumentClick: (document: Document) => void;
  onSelectAll: (checked: boolean) => void;
  getCategoryIcon: (iconName: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

export default function DocumentGrid({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onDocumentClick,
  onSelectAll,
  getCategoryIcon,
  getStatusColor
}: DocumentGridProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return formatDate(date);
  };
  
  return (
    <>
      {/* Select All */}
      {documents.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <Checkbox
            checked={selectedDocuments.length === documents.length}
            onCheckedChange={onSelectAll}
          />
          <span className="text-sm text-gray-600">
            Select all {documents.length} documents
          </span>
        </div>
      )}
      
      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((doc) => {
          const isSelected = selectedDocuments.includes(doc.id);
          
          return (
            <Card 
              key={doc.id}
              className={cn(
                "relative group hover:shadow-lg transition-all cursor-pointer",
                isSelected && "ring-2 ring-blue-500"
              )}
            >
              <CardContent className="p-0">
                {/* Document Preview */}
                <div 
                  className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden"
                  onClick={() => onDocumentClick(doc)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: doc.category.color + '20' }}
                    >
                      <div style={{ color: doc.category.color }}>
                        {getCategoryIcon(doc.category.icon)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Document
                    </Button>
                  </div>
                  
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        onDocumentSelect(doc.id, checked as boolean);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white"
                    />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className={cn("text-xs", getStatusColor(doc.currentVersion.status))}>
                      {doc.currentVersion.status}
                    </Badge>
                  </div>
                  
                  {/* Confidential Indicator */}
                  {doc.confidential && (
                    <div className="absolute bottom-2 left-2">
                      <Lock className="h-4 w-4 text-white drop-shadow-lg" />
                    </div>
                  )}
                </div>
                
                {/* Document Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 line-clamp-1">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {doc.documentNumber}
                      </p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onDocumentClick(doc)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Version History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Category */}
                  <div className="flex items-center gap-1 mb-3">
                    <div style={{ color: doc.category.color }}>
                      {getCategoryIcon(doc.category.icon)}
                    </div>
                    <span className="text-xs font-medium" style={{ color: doc.category.color }}>
                      {doc.category.name}
                    </span>
                  </div>
                  
                  {/* File Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(doc.currentVersion.fileSize)}</span>
                    <span>v{doc.currentVersion.versionNumber}</span>
                  </div>
                  
                  {/* Footer */}
                  <div className="mt-3 pt-3 border-t flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{getTimeAgo(doc.updatedAt)}</span>
                    </div>
                    
                    {doc.currentVersion.comments && doc.currentVersion.comments.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MessageSquare className="h-3 w-3" />
                        <span>{doc.currentVersion.comments.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-lg font-medium">No documents found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </>
  );
}
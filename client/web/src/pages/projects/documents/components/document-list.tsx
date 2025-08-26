import { Eye, Download, MoreVertical, Lock, MessageSquare, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Document } from '@/types/document.types';

interface DocumentListProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (docId: string, checked: boolean) => void;
  onDocumentClick: (document: Document) => void;
  onSelectAll: (checked: boolean) => void;
  getCategoryIcon: (iconName: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

export default function DocumentList({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onDocumentClick,
  onSelectAll,
  getCategoryIcon,
  getStatusColor
}: DocumentListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={documents.length > 0 && selectedDocuments.length === documents.length}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => {
            const isSelected = selectedDocuments.includes(doc.id);
            
            return (
              <TableRow 
                key={doc.id}
                className={cn(
                  "cursor-pointer hover:bg-gray-50",
                  isSelected && "bg-blue-50"
                )}
                onClick={() => onDocumentClick(doc)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      onDocumentSelect(doc.id, checked as boolean);
                    }}
                  />
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: doc.category.color + '20' }}
                    >
                      <div style={{ color: doc.category.color }}>
                        {getCategoryIcon(doc.category.icon)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          {doc.title}
                        </p>
                        {doc.confidential && (
                          <Lock className="h-3 w-3 text-gray-500" />
                        )}
                        {doc.currentVersion.comments && doc.currentVersion.comments.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MessageSquare className="h-3 w-3" />
                            <span>{doc.currentVersion.comments.length}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {doc.documentNumber}
                      </p>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div style={{ color: doc.category.color }}>
                      {getCategoryIcon(doc.category.icon)}
                    </div>
                    <span className="text-sm">{doc.category.name}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm font-medium">
                    v{doc.currentVersion.versionNumber}
                  </span>
                </TableCell>
                
                <TableCell>
                  <Badge className={cn("text-xs", getStatusColor(doc.currentVersion.status))}>
                    {doc.currentVersion.status}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatFileSize(doc.currentVersion.fileSize)}
                  </span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={doc.currentVersion.uploadedBy.avatar} />
                      <AvatarFallback>
                        {doc.currentVersion.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                      {doc.currentVersion.uploadedBy.name}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {formatDate(doc.updatedAt)}
                  </span>
                </TableCell>
                
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-lg font-medium">No documents found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
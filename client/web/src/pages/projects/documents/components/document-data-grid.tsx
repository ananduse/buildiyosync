import { useState } from 'react';
import { 
  Eye, Download, MoreVertical, Lock, MessageSquare, Clock, 
  ChevronUp, ChevronDown, ArrowUpDown, FileText, History, Star,
  Users, Edit, Trash2, Share2, Archive
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColorAvatar } from '@/components/ui/color-avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Document } from '@/types/document.types';

interface DocumentDataGridProps {
  documents: Document[];
  selectedDocuments: string[];
  onDocumentSelect: (docId: string, checked: boolean) => void;
  onDocumentClick: (document: Document) => void;
  onSelectAll: (checked: boolean) => void;
  getCategoryIcon: (iconName: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

type SortConfig = {
  key: keyof Document | 'category' | 'status' | 'uploadedBy' | 'fileSize';
  direction: 'asc' | 'desc';
} | null;

export default function DocumentDataGrid({
  documents,
  selectedDocuments,
  onDocumentSelect,
  onDocumentClick,
  onSelectAll,
  getCategoryIcon,
  getStatusColor
}: DocumentDataGridProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return formatDate(date);
  };
  
  const handleSort = (key: SortConfig['key']) => {
    if (!key) return;
    
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };
  
  const sortedDocuments = [...documents].sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue: any;
    let bValue: any;
    
    switch (sortConfig.key) {
      case 'category':
        aValue = a.category.name;
        bValue = b.category.name;
        break;
      case 'status':
        aValue = a.currentVersion.status;
        bValue = b.currentVersion.status;
        break;
      case 'uploadedBy':
        aValue = a.currentVersion.uploadedBy.name;
        bValue = b.currentVersion.uploadedBy.name;
        break;
      case 'fileSize':
        aValue = a.currentVersion.fileSize;
        bValue = b.currentVersion.fileSize;
        break;
      default:
        aValue = a[sortConfig.key as keyof Document];
        bValue = b[sortConfig.key as keyof Document];
    }
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
  
  const SortIcon = ({ column }: { column: SortConfig['key'] }) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-3 w-3 ml-1" />
      : <ChevronDown className="h-3 w-3 ml-1" />;
  };
  
  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedDocuments.length === documents.length && documents.length > 0}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[300px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => handleSort('title')}
                >
                  Document
                  <SortIcon column="title" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => handleSort('category')}
                >
                  Category
                  <SortIcon column="category" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => handleSort('status')}
                >
                  Status
                  <SortIcon column="status" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => handleSort('uploadedBy')}
                >
                  Uploaded By
                  <SortIcon column="uploadedBy" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => handleSort('fileSize')}
                >
                  Size
                  <SortIcon column="fileSize" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 lg:px-3"
                  onClick={() => handleSort('updatedAt')}
                >
                  Modified
                  <SortIcon column="updatedAt" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDocuments.map((doc) => {
              const isSelected = selectedDocuments.includes(doc.id);
              const hasComments = (doc.currentVersion.comments?.length || 0) > 0;
              const hasVersions = (doc.versions?.length || 0) > 1;
              const isHovered = hoveredRow === doc.id;
              
              return (
                <TableRow 
                  key={doc.id}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected && "bg-blue-50",
                    isHovered && "bg-gray-50"
                  )}
                  onMouseEnter={() => setHoveredRow(doc.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onDocumentClick(doc)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => onDocumentSelect(doc.id, checked as boolean)}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-start gap-3">
                      {/* Document Icon/Thumbnail */}
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: doc.category.color ? `${doc.category.color}15` : '#f3f4f6',
                          color: doc.category.color || '#6b7280'
                        }}
                      >
                        {getCategoryIcon(doc.category.icon)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 truncate">
                            {doc.title}
                          </p>
                          {doc.confidential && (
                            <Lock className="h-3 w-3 text-amber-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 font-mono">
                            {doc.documentNumber}
                          </span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            v{doc.currentVersion.versionNumber}
                          </span>
                          {doc.tags?.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs h-5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{doc.category.name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={cn("text-xs", getStatusColor(doc.currentVersion.status))}>
                      {doc.currentVersion.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ColorAvatar
                        name={doc.currentVersion.uploadedBy.name}
                        email={doc.currentVersion.uploadedBy.email}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-medium line-clamp-1">
                          {doc.currentVersion.uploadedBy.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.currentVersion.uploadedBy.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {formatFileSize(doc.currentVersion.fileSize)}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <p className="text-sm text-gray-600">
                            {getTimeAgo(doc.updatedAt)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(doc.updatedAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {formatDate(doc.updatedAt)}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      {hasComments && (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {doc.currentVersion.comments?.length}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {doc.currentVersion.comments?.length} comments
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {hasVersions && (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1">
                              <History className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {doc.versions?.length || 1}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {doc.versions?.length || 1} versions
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {doc.currentVersion.annotations && doc.currentVersion.annotations.length > 0 && (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1">
                              <Edit className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {doc.currentVersion.annotations.length}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {doc.currentVersion.annotations.length} annotations
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDocumentClick(doc);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View</TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Download', doc.id);
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download</TooltipContent>
                      </Tooltip>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onDocumentClick(doc)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="h-4 w-4 mr-2" />
                            Version History
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        {documents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No documents found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
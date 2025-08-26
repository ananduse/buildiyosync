import { Eye, Download, MoreVertical, Lock, MessageSquare, Clock, FileText, Users, History, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
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

// Generate document thumbnail based on category
const generateThumbnail = (doc: Document) => {
  const categoryColors = {
    '1': { bg: '#1e40af', pattern: 'grid' }, // Architectural - Blue
    '2': { bg: '#dc2626', pattern: 'diagonal' }, // Structural - Red
    '3': { bg: '#facc15', pattern: 'dots' }, // Electrical - Yellow
    '4': { bg: '#16a34a', pattern: 'horizontal' }, // Mechanical - Green
    '5': { bg: '#06b6d4', pattern: 'vertical' }, // Plumbing - Cyan
    '6': { bg: '#9333ea', pattern: 'cross' }, // HVAC - Purple
  };
  
  const style = categoryColors[doc.category.id as keyof typeof categoryColors] || { bg: '#6b7280', pattern: 'solid' };
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${style.bg}15 0%, ${style.bg}05 100%)`,
        }}
      />
      
      {/* Document Preview Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-4">
        {/* Document Number */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-mono bg-white/90 px-2 py-1 rounded shadow-sm">
            {doc.documentNumber}
          </span>
        </div>
        
        {/* Category Icon */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg"
          style={{ backgroundColor: style.bg + '20', border: `2px solid ${style.bg}40` }}
        >
          <div className="text-3xl" style={{ color: style.bg }}>
            {doc.category.icon === 'Building2' ? '🏢' :
             doc.category.icon === 'Layers' ? '📚' :
             doc.category.icon === 'Zap' ? '⚡' :
             doc.category.icon === 'Settings2' ? '⚙️' :
             doc.category.icon === 'Droplets' ? '💧' :
             doc.category.icon === 'Wind' ? '💨' :
             '📄'}
          </div>
        </div>
        
        {/* Document Title */}
        <div className="text-center">
          <p className="text-xs font-medium text-gray-700 line-clamp-2">
            {doc.title}
          </p>
        </div>
        
        {/* Version Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="text-xs">
            v{doc.currentVersion.versionNumber}
          </Badge>
        </div>
      </div>
    </div>
  );
};

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getTimeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return formatDate(date);
  };
  
  const getWorkflowProgress = (status: string) => {
    const progress = {
      'draft': 25,
      'review': 50,
      'approved': 100,
      'rejected': 0
    };
    return progress[status] || 0;
  };
  
  return (
    <TooltipProvider>
      {/* Select All */}
      {documents.length > 0 && (
        <div className="mb-4 flex items-center justify-between bg-white p-3 rounded-lg border">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedDocuments.length === documents.length}
              onCheckedChange={onSelectAll}
            />
            <span className="text-sm text-gray-600">
              Select all {documents.length} documents
            </span>
          </div>
          {selectedDocuments.length > 0 && (
            <span className="text-sm font-medium text-blue-600">
              {selectedDocuments.length} selected
            </span>
          )}
        </div>
      )}
      
      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {documents.map((doc) => {
          const isSelected = selectedDocuments.includes(doc.id);
          const hasComments = (doc.currentVersion.comments?.length || 0) > 0;
          const hasVersions = (doc.versions?.length || 0) > 1;
          
          return (
            <Card 
              key={doc.id}
              className={cn(
                "relative group hover:shadow-xl transition-all duration-200",
                isSelected && "ring-2 ring-primary shadow-lg"
              )}
            >
              {/* Card Header with Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onDocumentSelect(doc.id, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
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
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History className="h-4 w-4 mr-2" />
                      Version History
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <CardContent className="p-0">
                {/* Document Thumbnail */}
                <div 
                  className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg overflow-hidden cursor-pointer"
                  onClick={() => onDocumentClick(doc)}
                >
                  {generateThumbnail(doc)}
                  
                  {/* Confidential Badge */}
                  {doc.confidential && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-amber-500 text-white">
                        <Lock className="h-3 w-3 mr-1" />
                        Confidential
                      </Badge>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute bottom-3 right-3">
                    <Badge className={cn("text-xs", getStatusColor(doc.currentVersion.status))}>
                      {doc.currentVersion.status}
                    </Badge>
                  </div>
                </div>
                
                {/* Document Details */}
                <div className="p-4 space-y-3">
                  {/* Title and Category */}
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1 mb-1">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(doc.category.icon)}
                        {doc.category.name}
                      </span>
                      <span>•</span>
                      <span className="font-mono">{doc.documentNumber}</span>
                    </div>
                  </div>
                  
                  {/* Workflow Progress */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Workflow Progress</span>
                      <span className="font-medium">{getWorkflowProgress(doc.currentVersion.status)}%</span>
                    </div>
                    <Progress value={getWorkflowProgress(doc.currentVersion.status)} className="h-1" />
                  </div>
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      {hasComments && (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{doc.currentVersion.comments?.length}</span>
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
                              <History className="h-3 w-3" />
                              <span>{doc.versions?.length || 1}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {doc.versions?.length || 1} versions
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{getTimeAgo(doc.updatedAt)}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Updated {formatDate(doc.updatedAt)}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{formatFileSize(doc.currentVersion.fileSize)}</span>
                  </div>
                  
                  {/* User Avatar */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={doc.currentVersion.uploadedBy.avatar} />
                        <AvatarFallback className="text-xs">
                          {doc.currentVersion.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium line-clamp-1">
                          {doc.currentVersion.uploadedBy.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {doc.currentVersion.uploadedBy.role}
                        </span>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDocumentClick(doc);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Download', doc.id);
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Empty State */}
      {documents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium">No documents found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </TooltipProvider>
  );
}
import { useState } from 'react';
import {
  Clock, Download, Eye, RotateCcw, CheckCircle, XCircle,
  User, Calendar, FileText, ArrowUpRight, ArrowDownRight,
  GitBranch, Tag, AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorAvatar } from '@/components/ui/color-avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Document, DocumentVersion } from '@/types/document.types';

interface DocumentVersionHistoryProps {
  document: Document;
  open: boolean;
  onClose: () => void;
  onRestore: (versionId: string) => void;
  onDownload: (versionId: string) => void;
  onCompare: (version1: string, version2: string) => void;
}

export default function DocumentVersionHistory({
  document,
  open,
  onClose,
  onRestore,
  onDownload,
  onCompare
}: DocumentVersionHistoryProps) {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  
  // Generate sample version history if not present
  const versions: DocumentVersion[] = document.versions?.length > 0 
    ? document.versions 
    : [
      {
        ...document.currentVersion,
        id: '1',
        versionNumber: '3.0',
        uploadedAt: new Date().toISOString(),
        changes: 'Updated floor plan layout, revised electrical connections'
      },
      {
        ...document.currentVersion,
        id: '2',
        versionNumber: '2.0',
        status: 'approved',
        uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@buildiyo.com',
          role: 'Project Manager'
        },
        changes: 'Added HVAC system details, updated specifications'
      },
      {
        ...document.currentVersion,
        id: '3',
        versionNumber: '1.0',
        status: 'superseded',
        uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: {
          id: '3',
          name: 'Mike Chen',
          email: 'mike@buildiyo.com',
          role: 'Architect'
        },
        changes: 'Initial design submission'
      }
    ];
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'review':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'review':
        return 'bg-blue-100 text-blue-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      case 'superseded':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const handleVersionSelect = (versionId: string) => {
    if (selectedVersions.includes(versionId)) {
      setSelectedVersions(prev => prev.filter(id => id !== versionId));
    } else if (selectedVersions.length < 2) {
      setSelectedVersions(prev => [...prev, versionId]);
    }
  };
  
  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      onCompare(selectedVersions[0], selectedVersions[1]);
    }
  };
  
  const getVersionDiff = (current: DocumentVersion, previous?: DocumentVersion) => {
    if (!previous) return { added: 0, removed: 0, modified: 0 };
    
    // Simulated diff calculation
    const sizeChange = (current.fileSize || 0) - (previous.fileSize || 0);
    return {
      added: sizeChange > 0 ? Math.abs(Math.floor(sizeChange / 1024)) : 0,
      removed: sizeChange < 0 ? Math.abs(Math.floor(sizeChange / 1024)) : 0,
      modified: Math.floor(Math.random() * 10) + 1
    };
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Version History - {document.title}</span>
              </div>
              <Badge variant="outline">
                {versions.length} versions
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'timeline')} className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            {selectedVersions.length === 2 && (
              <Button onClick={handleCompare} size="sm">
                Compare Selected
              </Button>
            )}
          </div>
          
          <TabsContent value="list" className="mt-0 flex-1 overflow-hidden">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Changes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {versions.map((version, index) => {
                    const diff = index < versions.length - 1 
                      ? getVersionDiff(version, versions[index + 1])
                      : null;
                    
                    return (
                      <TableRow 
                        key={version.id}
                        className={cn(
                          "hover:bg-gray-50",
                          selectedVersions.includes(version.id) && "bg-blue-50"
                        )}
                      >
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedVersions.includes(version.id)}
                            onChange={() => handleVersionSelect(version.id)}
                            disabled={selectedVersions.length === 2 && !selectedVersions.includes(version.id)}
                            className="rounded border-gray-300"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">v{version.versionNumber}</span>
                            {index === 0 && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(version.status)}
                            <Badge className={cn("text-xs", getStatusColor(version.status))}>
                              {version.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ColorAvatar
                              name={version.uploadedBy.name}
                              email={version.uploadedBy.email}
                              size="xs"
                            />
                            <div>
                              <p className="text-sm font-medium">{version.uploadedBy.name}</p>
                              <p className="text-xs text-gray-500">{version.uploadedBy.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{formatDate(version.uploadedAt)}</p>
                            {diff && (
                              <div className="flex items-center gap-2 mt-1">
                                {diff.added > 0 && (
                                  <span className="text-xs text-green-600">
                                    +{diff.added}KB
                                  </span>
                                )}
                                {diff.removed > 0 && (
                                  <span className="text-xs text-red-600">
                                    -{diff.removed}KB
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{formatFileSize(version.fileSize)}</TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-600 max-w-xs truncate">
                            {version.changes || 'No changes recorded'}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => console.log('Preview version:', version.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Preview</TooltipContent>
                              </Tooltip>
                              
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => onDownload(version.id)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Download</TooltipContent>
                              </Tooltip>
                              
                              {index !== 0 && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => onRestore(version.id)}
                                    >
                                      <RotateCcw className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Restore this version</TooltipContent>
                                </Tooltip>
                              )}
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0 flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
                
                {/* Timeline items */}
                <div className="space-y-6 p-4">
                  {versions.map((version, index) => (
                    <div key={version.id} className="relative flex items-start gap-4">
                      {/* Timeline dot */}
                      <div className={cn(
                        "absolute left-6 w-4 h-4 rounded-full border-2 bg-white",
                        index === 0 ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      )} />
                      
                      {/* Content */}
                      <div className="ml-12 flex-1">
                        <div className={cn(
                          "p-4 rounded-lg border",
                          index === 0 ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                        )}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">Version {version.versionNumber}</span>
                                {getStatusIcon(version.status)}
                                <Badge className={cn("text-xs", getStatusColor(version.status))}>
                                  {version.status}
                                </Badge>
                                {index === 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{formatDate(version.uploadedAt)}</p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onDownload(version.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              {index !== 0 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => onRestore(version.id)}
                                >
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <ColorAvatar
                              name={version.uploadedBy.name}
                              email={version.uploadedBy.email}
                              size="xs"
                            />
                            <div>
                              <p className="text-sm font-medium">{version.uploadedBy.name}</p>
                              <p className="text-xs text-gray-500">{version.uploadedBy.role}</p>
                            </div>
                          </div>
                          
                          {version.changes && (
                            <p className="text-sm text-gray-600 mt-2">
                              {version.changes}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                            <span>Size: {formatFileSize(version.fileSize)}</span>
                            {index < versions.length - 1 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                                  5 additions
                                </span>
                                <span className="flex items-center gap-1">
                                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                                  2 deletions
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
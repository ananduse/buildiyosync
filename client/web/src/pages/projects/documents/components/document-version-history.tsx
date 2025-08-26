import { Download, Eye, RotateCcw } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Document, DocumentVersion } from '@/types/document.types';

interface DocumentVersionHistoryProps {
  document: Document;
  onClose: () => void;
}

// Mock version history
const generateVersionHistory = (document: Document): DocumentVersion[] => {
  const versions: DocumentVersion[] = [document.currentVersion];
  
  for (let i = 1; i < 5; i++) {
    const version: DocumentVersion = {
      id: `ver-${document.id}-${i + 1}`,
      documentId: document.id,
      versionNumber: `${i + 1}.0`,
      fileUrl: '/sample.pdf',
      fileName: document.currentVersion.fileName,
      fileSize: document.currentVersion.fileSize + Math.random() * 100000,
      fileType: document.currentVersion.fileType,
      uploadedBy: {
        id: `user${i}`,
        name: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'][i - 1],
        email: `user${i}@example.com`,
        role: ['Engineer', 'Architect', 'Project Manager', 'Reviewer'][i - 1]
      },
      uploadedAt: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString(),
      changes: [
        'Updated dimensions and specifications',
        'Revised structural details',
        'Added electrical annotations',
        'Modified plumbing layout'
      ][i - 1],
      status: ['approved', 'approved', 'rejected', 'draft'][i - 1] as any
    };
    versions.push(version);
  }
  
  return versions;
};

export default function DocumentVersionHistory({
  document,
  onClose
}: DocumentVersionHistoryProps) {
  const versions = generateVersionHistory(document);
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
          <p className="text-sm text-gray-600">
            {document.title} - {versions.length} versions
          </p>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="space-y-4 pr-4">
            {versions.map((version, index) => {
              const isCurrent = index === 0;
              
              return (
                <div
                  key={version.id}
                  className={cn(
                    "border rounded-lg p-4",
                    isCurrent && "border-blue-500 bg-blue-50"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={version.uploadedBy.avatar} />
                          <AvatarFallback>
                            {version.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {index < versions.length - 1 && (
                          <div className="absolute top-12 left-5 h-full w-0.5 bg-gray-300"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Version {version.versionNumber}</span>
                          {isCurrent && (
                            <Badge variant="default" className="text-xs">Current</Badge>
                          )}
                          <Badge className={cn("text-xs", getStatusColor(version.status))}>
                            {version.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600">
                          Uploaded by <span className="font-medium">{version.uploadedBy.name}</span>
                          {' · '}
                          {formatDate(version.uploadedAt)}
                        </p>
                        
                        {version.changes && (
                          <p className="text-sm text-gray-700 mt-2">
                            {version.changes}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{formatFileSize(version.fileSize)}</span>
                          <span>{version.uploadedBy.role}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      {!isCurrent && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
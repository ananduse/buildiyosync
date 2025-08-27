'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Upload, Download, FolderOpen, FileText, Search, Filter, Grid3x3, List, 
  Plus, Eye, Edit, Trash2, History, MessageSquare, Share2, Lock, Unlock,
  CheckCircle, XCircle, Clock, AlertTriangle, FileSignature, Settings,
  ChevronDown, MoreVertical, Star, Archive, RefreshCw, Layers, Building2,
  Zap, Settings2, Droplets, Wind, Flame, Trees, Map, Palette, Shield,
  ClipboardList, Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DOCUMENT_CATEGORIES, type Document, type DocumentCategory, type DocumentFilter } from '@/types/document.types';
import { formatFileSize, formatDate, sortDocuments, filterDocuments } from '@/utils/document-utils';
import { getCompleteDocumentData } from '@/data/sample-document-data';
import DocumentUploadDialog from './components/document-upload-dialog';
import DocumentViewer from './components/document-viewer';
import DocumentVersionHistory from './components/document-version-history';
import DocumentFilters from './components/document-filters';
import DocumentGrid from './components/document-grid';
import DocumentDataGrid from './components/document-data-grid';


export default function ProjectDocuments() {
  const { projectId = 'P015' } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<DocumentFilter['sortBy']>('date');
  const [sortOrder, setSortOrder] = useState<DocumentFilter['sortOrder']>('desc');
  
  // Get complete sample data with all features
  const { documents, relationships: relations, customFields } = useMemo(
    () => getCompleteDocumentData(projectId), 
    [projectId]
  );
  
  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    const filter: DocumentFilter = {
      search: searchQuery,
      categories: selectedCategory === 'all' ? undefined : [selectedCategory],
      sortBy,
      sortOrder,
    };
    
    return filterDocuments(documents, filter);
  }, [documents, searchQuery, selectedCategory, sortBy, sortOrder]);
  
  // Group documents by category
  const groupedDocuments = useMemo(() => {
    const grouped: Record<string, Document[]> = {};
    filteredDocuments.forEach(doc => {
      if (!grouped[doc.category.id]) {
        grouped[doc.category.id] = [];
      }
      grouped[doc.category.id].push(doc);
    });
    return grouped;
  }, [filteredDocuments]);
  
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedDocuments(filteredDocuments.map(d => d.id));
    } else {
      setSelectedDocuments([]);
    }
  }, [filteredDocuments]);
  
  const handleDocumentSelect = useCallback((docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments(prev => [...prev, docId]);
    } else {
      setSelectedDocuments(prev => prev.filter(id => id !== docId));
    }
  }, []);
  
  const handleDocumentClick = useCallback((document: Document) => {
    setSelectedDocument(document);
    setShowDocumentViewer(true);
  }, []);
  
  const handleBulkAction = useCallback((action: string) => {
    console.log(`Performing ${action} on ${selectedDocuments.length} documents`);
    setSelectedDocuments([]);
  }, [selectedDocuments]);
  
  const getCategoryIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Building2, Layers, Zap, Settings2, Droplets, Wind, Flame, Trees, Map, 
      Palette, FileText, FileSignature, Shield, ClipboardList, Mail
    };
    const Icon = icons[iconName] || FileText;
    return <Icon className="h-4 w-4" />;
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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
            <p className="text-gray-600 mt-1">Project {projectId} - {filteredDocuments.length} documents</p>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedDocuments.length > 0 && (
              <div className="flex items-center gap-2 mr-4">
                <span className="text-sm text-gray-600">
                  {selectedDocuments.length} selected
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Bulk Actions
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleBulkAction('download')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('share')}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('delete')}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={() => setShowUploadDialog(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents by name, number, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {DOCUMENT_CATEGORIES.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(cat.icon)}
                    <span>{cat.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Sort Options */}
          <Select 
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [newSortBy, newSortOrder] = value.split('-');
              setSortBy(newSortBy as DocumentFilter['sortBy']);
              setSortOrder(newSortOrder as DocumentFilter['sortOrder']);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="size-desc">Largest First</SelectItem>
              <SelectItem value="size-asc">Smallest First</SelectItem>
              <SelectItem value="modified-desc">Recently Modified</SelectItem>
              <SelectItem value="status-asc">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <DocumentFilters 
          onClose={() => setShowFilters(false)}
          onApply={(filters) => {
            console.log('Applying filters:', filters);
            setShowFilters(false);
          }}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {viewMode === 'grid' ? (
          <DocumentGrid
            documents={filteredDocuments}
            selectedDocuments={selectedDocuments}
            onDocumentSelect={handleDocumentSelect}
            onDocumentClick={handleDocumentClick}
            onSelectAll={handleSelectAll}
            getCategoryIcon={getCategoryIcon}
            getStatusColor={getStatusColor}
            onEdit={(doc) => {
              console.log('Edit document:', doc);
              setSelectedDocument(doc);
              setShowUploadDialog(true); // Reuse upload dialog for editing
            }}
            onArchive={(doc) => {
              console.log('Archive document:', doc);
              // Implement archive functionality
              alert(`Document "${doc.title}" has been archived`);
            }}
            onShare={(doc) => {
              console.log('Share document:', doc);
              setSelectedDocument(doc);
              setShowDocumentViewer(true); // This will open the viewer with share dialog
            }}
            onDownload={(doc) => {
              console.log('Download document:', doc);
              const link = document.createElement('a');
              link.href = doc.currentVersion.fileUrl;
              link.download = doc.currentVersion.fileName || doc.title;
              link.click();
            }}
            onVersionHistory={(doc) => {
              console.log('Show version history:', doc);
              setSelectedDocument(doc);
              setShowVersionHistory(true);
            }}
          />
        ) : (
          <DocumentDataGrid
            documents={filteredDocuments}
            selectedDocuments={selectedDocuments}
            onDocumentSelect={handleDocumentSelect}
            onDocumentClick={handleDocumentClick}
            onSelectAll={handleSelectAll}
            getCategoryIcon={getCategoryIcon}
            getStatusColor={getStatusColor}
            onEdit={(doc) => {
              console.log('Edit document:', doc);
              setSelectedDocument(doc);
              setShowUploadDialog(true);
            }}
            onArchive={(doc) => {
              console.log('Archive document:', doc);
              alert(`Document "${doc.title}" has been archived`);
            }}
            onShare={(doc) => {
              console.log('Share document:', doc);
              setSelectedDocument(doc);
              setShowDocumentViewer(true);
            }}
            onDownload={(doc) => {
              console.log('Download document:', doc);
              const link = document.createElement('a');
              link.href = doc.currentVersion.fileUrl;
              link.download = doc.currentVersion.fileName || doc.title;
              link.click();
            }}
            onVersionHistory={(doc) => {
              console.log('Show version history:', doc);
              setSelectedDocument(doc);
              setShowVersionHistory(true);
            }}
          />
        )}
      </div>
      
      {/* Dialogs */}
      {showUploadDialog && (
        <DocumentUploadDialog
          projectId={projectId}
          onClose={() => setShowUploadDialog(false)}
          onUpload={(files) => {
            console.log('Uploading files:', files);
            setShowUploadDialog(false);
          }}
        />
      )}
      
      {showDocumentViewer && selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => {
            setShowDocumentViewer(false);
            setSelectedDocument(null);
          }}
          onEdit={() => {
            console.log('Edit from viewer:', selectedDocument);
            setShowUploadDialog(true);
          }}
          onArchive={() => {
            console.log('Archive from viewer:', selectedDocument);
            alert(`Document "${selectedDocument.title}" has been archived`);
            setShowDocumentViewer(false);
          }}
        />
      )}
      
      {showVersionHistory && selectedDocument && (
        <DocumentVersionHistory
          document={selectedDocument}
          open={showVersionHistory}
          onClose={() => setShowVersionHistory(false)}
          onRestore={(versionId) => {
            console.log('Restoring version:', versionId);
            setShowVersionHistory(false);
          }}
          onDownload={(versionId) => {
            console.log('Downloading version:', versionId);
          }}
          onCompare={(v1, v2) => {
            console.log('Comparing versions:', v1, v2);
          }}
        />
      )}
    </div>
  );
}
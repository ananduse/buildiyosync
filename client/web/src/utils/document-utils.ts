import type { Document, DocumentFilter, RelatedDocument } from '@/types/document.types';

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format date with various options
 */
export function formatDate(
  date: string | Date,
  format: 'full' | 'short' | 'relative' | 'time' = 'short'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'full':
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      
    case 'short':
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      
    case 'relative':
      return getRelativeTime(d);
      
    case 'time':
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      
    default:
      return d.toLocaleDateString();
  }
}

/**
 * Get relative time (e.g., "2 hours ago", "yesterday")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Sort documents based on various criteria
 */
export function sortDocuments(
  documents: Document[],
  sortBy: DocumentFilter['sortBy'] = 'date',
  sortOrder: DocumentFilter['sortOrder'] = 'desc'
): Document[] {
  const sorted = [...documents].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.title.localeCompare(b.title);
        break;
        
      case 'date':
      case 'created':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
        
      case 'modified':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
        
      case 'size':
        comparison = a.currentVersion.fileSize - b.currentVersion.fileSize;
        break;
        
      case 'status':
        comparison = a.currentVersion.status.localeCompare(b.currentVersion.status);
        break;
        
      case 'category':
        comparison = a.category.name.localeCompare(b.category.name);
        break;
        
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
}

/**
 * Group documents by various criteria
 */
export function groupDocuments(
  documents: Document[],
  groupBy: 'category' | 'status' | 'date' | 'user' = 'category'
): Record<string, Document[]> {
  const grouped: Record<string, Document[]> = {};
  
  documents.forEach(doc => {
    let key: string;
    
    switch (groupBy) {
      case 'category':
        key = doc.category.name;
        break;
        
      case 'status':
        key = doc.currentVersion.status;
        break;
        
      case 'date':
        key = formatDate(doc.createdAt, 'short');
        break;
        
      case 'user':
        key = doc.currentVersion.uploadedBy.name;
        break;
        
      default:
        key = 'Other';
    }
    
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(doc);
  });
  
  return grouped;
}

/**
 * Filter documents based on filter criteria
 */
export function filterDocuments(
  documents: Document[],
  filter: DocumentFilter
): Document[] {
  let filtered = [...documents];
  
  // Search filter
  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    filtered = filtered.filter(doc =>
      doc.title.toLowerCase().includes(searchLower) ||
      doc.documentNumber.toLowerCase().includes(searchLower) ||
      doc.description?.toLowerCase().includes(searchLower) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Category filter
  if (filter.categories && filter.categories.length > 0) {
    filtered = filtered.filter(doc =>
      filter.categories!.includes(doc.category.id)
    );
  }
  
  // Status filter
  if (filter.status && filter.status.length > 0) {
    filtered = filtered.filter(doc =>
      filter.status!.includes(doc.currentVersion.status)
    );
  }
  
  // Date range filter
  if (filter.dateRange) {
    const startDate = new Date(filter.dateRange.start).getTime();
    const endDate = new Date(filter.dateRange.end).getTime();
    filtered = filtered.filter(doc => {
      const docDate = new Date(doc.createdAt).getTime();
      return docDate >= startDate && docDate <= endDate;
    });
  }
  
  // Uploaded by filter
  if (filter.uploadedBy && filter.uploadedBy.length > 0) {
    filtered = filtered.filter(doc =>
      filter.uploadedBy!.includes(doc.currentVersion.uploadedBy.id)
    );
  }
  
  // Tags filter
  if (filter.tags && filter.tags.length > 0) {
    filtered = filtered.filter(doc =>
      doc.tags.some(tag => filter.tags!.includes(tag))
    );
  }
  
  // Has comments filter
  if (filter.hasComments !== undefined) {
    filtered = filtered.filter(doc =>
      filter.hasComments
        ? doc.currentVersion.comments && doc.currentVersion.comments.length > 0
        : !doc.currentVersion.comments || doc.currentVersion.comments.length === 0
    );
  }
  
  // Confidential filter
  if (filter.confidential !== undefined) {
    filtered = filtered.filter(doc => doc.confidential === filter.confidential);
  }
  
  // Sort the results
  if (filter.sortBy) {
    filtered = sortDocuments(filtered, filter.sortBy, filter.sortOrder);
  }
  
  return filtered;
}

/**
 * Get related documents for a given document
 */
export function getRelatedDocuments(
  documentId: string,
  relations: RelatedDocument[],
  allDocuments: Document[]
): {
  parents: Document[];
  children: Document[];
  references: Document[];
  supersedes: Document[];
  supersededBy: Document[];
  related: Document[];
} {
  const result = {
    parents: [] as Document[],
    children: [] as Document[],
    references: [] as Document[],
    supersedes: [] as Document[],
    supersededBy: [] as Document[],
    related: [] as Document[],
  };
  
  relations
    .filter(rel => rel.documentId === documentId || rel.relatedDocumentId === documentId)
    .forEach(rel => {
      const isSource = rel.documentId === documentId;
      const targetId = isSource ? rel.relatedDocumentId : rel.documentId;
      const targetDoc = allDocuments.find(d => d.id === targetId);
      
      if (targetDoc) {
        switch (rel.relationType) {
          case 'parent':
            if (isSource) {
              result.parents.push(targetDoc);
            } else {
              result.children.push(targetDoc);
            }
            break;
            
          case 'child':
            if (isSource) {
              result.children.push(targetDoc);
            } else {
              result.parents.push(targetDoc);
            }
            break;
            
          case 'reference':
            result.references.push(targetDoc);
            break;
            
          case 'supersedes':
            if (isSource) {
              result.supersedes.push(targetDoc);
            } else {
              result.supersededBy.push(targetDoc);
            }
            break;
            
          case 'superseded_by':
            if (isSource) {
              result.supersededBy.push(targetDoc);
            } else {
              result.supersedes.push(targetDoc);
            }
            break;
            
          case 'related':
            result.related.push(targetDoc);
            break;
        }
      }
    });
  
  return result;
}

/**
 * Calculate document statistics
 */
export function calculateDocumentStats(documents: Document[]) {
  const totalSize = documents.reduce((sum, doc) => sum + doc.currentVersion.fileSize, 0);
  const avgSize = documents.length > 0 ? totalSize / documents.length : 0;
  
  const statusCounts = documents.reduce((counts, doc) => {
    counts[doc.currentVersion.status] = (counts[doc.currentVersion.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const categoryCounts = documents.reduce((counts, doc) => {
    counts[doc.category.name] = (counts[doc.category.name] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const recentDocuments = documents
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
  
  const oldestDocument = documents.reduce((oldest, doc) => {
    if (!oldest || new Date(doc.createdAt) < new Date(oldest.createdAt)) {
      return doc;
    }
    return oldest;
  }, null as Document | null);
  
  const newestDocument = documents.reduce((newest, doc) => {
    if (!newest || new Date(doc.createdAt) > new Date(newest.createdAt)) {
      return doc;
    }
    return newest;
  }, null as Document | null);
  
  return {
    totalDocuments: documents.length,
    totalSize,
    avgSize,
    statusCounts,
    categoryCounts,
    recentDocuments,
    oldestDocument,
    newestDocument,
  };
}

/**
 * Export documents to various formats
 */
export function exportDocuments(
  documents: Document[],
  format: 'csv' | 'json' | 'xlsx' = 'csv'
): string | Blob {
  switch (format) {
    case 'csv':
      return exportToCSV(documents);
    case 'json':
      return JSON.stringify(documents, null, 2);
    case 'xlsx':
      // Would require a library like xlsx
      console.warn('XLSX export not implemented');
      return new Blob();
    default:
      return '';
  }
}

function exportToCSV(documents: Document[]): string {
  const headers = [
    'Document Number',
    'Title',
    'Category',
    'Status',
    'Version',
    'Size',
    'Uploaded By',
    'Created Date',
    'Modified Date',
    'Confidential',
    'Tags',
  ];
  
  const rows = documents.map(doc => [
    doc.documentNumber,
    doc.title,
    doc.category.name,
    doc.currentVersion.status,
    doc.currentVersion.versionNumber,
    formatFileSize(doc.currentVersion.fileSize),
    doc.currentVersion.uploadedBy.name,
    formatDate(doc.createdAt, 'short'),
    formatDate(doc.updatedAt, 'short'),
    doc.confidential ? 'Yes' : 'No',
    doc.tags.join(', '),
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  return csvContent;
}
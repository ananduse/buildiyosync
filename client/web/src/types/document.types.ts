export interface DocumentCategory {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: string;
  description?: string;
  parentId?: string;
  order: number;
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  { id: '1', name: 'Architectural', code: 'ARCH', color: '#3B82F6', icon: 'Building2', order: 1 },
  { id: '2', name: 'Structural', code: 'STRUC', color: '#EF4444', icon: 'Layers', order: 2 },
  { id: '3', name: 'Electrical', code: 'ELEC', color: '#F59E0B', icon: 'Zap', order: 3 },
  { id: '4', name: 'Mechanical', code: 'MECH', color: '#10B981', icon: 'Settings2', order: 4 },
  { id: '5', name: 'Plumbing', code: 'PLUMB', color: '#06B6D4', icon: 'Droplets', order: 5 },
  { id: '6', name: 'HVAC', code: 'HVAC', color: '#8B5CF6', icon: 'Wind', order: 6 },
  { id: '7', name: 'Fire Protection', code: 'FIRE', color: '#DC2626', icon: 'Flame', order: 7 },
  { id: '8', name: 'Landscape', code: 'LAND', color: '#16A34A', icon: 'Trees', order: 8 },
  { id: '9', name: 'Civil', code: 'CIVIL', color: '#7C3AED', icon: 'Map', order: 9 },
  { id: '10', name: 'Interior Design', code: 'INT', color: '#EC4899', icon: 'Palette', order: 10 },
  { id: '11', name: 'Specifications', code: 'SPEC', color: '#6366F1', icon: 'FileText', order: 11 },
  { id: '12', name: 'Contracts', code: 'CONT', color: '#059669', icon: 'FileSignature', order: 12 },
  { id: '13', name: 'Permits', code: 'PERM', color: '#D97706', icon: 'Shield', order: 13 },
  { id: '14', name: 'Reports', code: 'REP', color: '#7C2D12', icon: 'ClipboardList', order: 14 },
  { id: '15', name: 'Correspondence', code: 'CORR', color: '#1E40AF', icon: 'Mail', order: 15 },
];

export interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: User;
  uploadedAt: string;
  changes?: string;
  status: 'draft' | 'review' | 'approved' | 'rejected' | 'archived';
  approvedBy?: User;
  approvedAt?: string;
  comments?: DocumentComment[];
  annotations?: DocumentAnnotation[];
  checksum?: string;
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  documentNumber: string;
  category: DocumentCategory;
  subcategory?: string;
  currentVersion: DocumentVersion;
  versions: DocumentVersion[];
  tags: string[];
  status: 'active' | 'archived' | 'deleted';
  confidential: boolean;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  lastAccessedAt?: string;
  permissions: DocumentPermission[];
  metadata?: DocumentMetadata;
  relatedDocuments?: string[];
  workflow?: DocumentWorkflow;
}

export interface DocumentComment {
  id: string;
  documentId: string;
  versionId: string;
  userId: string;
  user: User;
  content: string;
  pageNumber?: number;
  coordinates?: { x: number; y: number; width: number; height: number };
  parentId?: string;
  replies?: DocumentComment[];
  createdAt: string;
  updatedAt: string;
  resolved: boolean;
  resolvedBy?: User;
  resolvedAt?: string;
}

export interface DocumentAnnotation {
  id: string;
  type: 'highlight' | 'underline' | 'strikethrough' | 'drawing' | 'text' | 'stamp' | 'arrow' | 'rectangle' | 'circle';
  pageNumber: number;
  coordinates: { x: number; y: number; width: number; height: number };
  content?: string;
  color?: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPermission {
  id: string;
  documentId: string;
  userId?: string;
  roleId?: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canComment: boolean;
  canAnnotate: boolean;
  canApprove: boolean;
  canDownload: boolean;
  canPrint: boolean;
  canShare: boolean;
}

export interface DocumentMetadata {
  author?: string;
  revisedBy?: string;
  checkedBy?: string;
  approvedBy?: string;
  issueDate?: string;
  effectiveDate?: string;
  expiryDate?: string;
  drawingScale?: string;
  paperSize?: string;
  discipline?: string;
  phase?: string;
  zone?: string;
  level?: string;
  grid?: string;
  revision?: string;
  customFields?: Record<string, any>;
}

export interface DocumentWorkflow {
  id: string;
  name: string;
  stages: WorkflowStage[];
  currentStage: string;
  history: WorkflowHistory[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  assignees: User[];
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  completedAt?: string;
  completedBy?: User;
  comments?: string;
}

export interface WorkflowHistory {
  id: string;
  stageId: string;
  action: string;
  userId: string;
  user: User;
  timestamp: string;
  comments?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
}

export interface DocumentFilter {
  search?: string;
  categories?: string[];
  status?: string[];
  dateRange?: { start: string; end: string };
  uploadedBy?: string[];
  tags?: string[];
  hasComments?: boolean;
  confidential?: boolean;
}
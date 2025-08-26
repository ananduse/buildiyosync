import { DOCUMENT_CATEGORIES, type Document, type DocumentComment, type RelatedDocument } from '@/types/document.types';

// Sample users for testing
export const SAMPLE_USERS = [
  { id: 'user1', name: 'John Doe', email: 'john.doe@buildiyo.com', role: 'Project Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 'user2', name: 'Jane Smith', email: 'jane.smith@buildiyo.com', role: 'Lead Architect', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 'user3', name: 'Mike Johnson', email: 'mike.johnson@buildiyo.com', role: 'Structural Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
  { id: 'user4', name: 'Sarah Williams', email: 'sarah.williams@buildiyo.com', role: 'MEP Coordinator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'user5', name: 'David Chen', email: 'david.chen@buildiyo.com', role: 'QA/QC Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
];

// Sample comments for documents
export const generateSampleComments = (documentId: string, versionId: string): DocumentComment[] => [
  {
    id: 'com1',
    documentId,
    versionId,
    userId: 'user2',
    user: SAMPLE_USERS[1],
    content: 'Please review the updated dimensions on Grid Line A. The column spacing has been adjusted per structural requirements.',
    pageNumber: 1,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
  {
    id: 'com2',
    documentId,
    versionId,
    userId: 'user3',
    user: SAMPLE_USERS[2],
    content: 'Structural calculations have been verified. The beam sizes are adequate for the specified loads.',
    pageNumber: 2,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    resolved: true,
    resolvedBy: SAMPLE_USERS[0],
    resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'com3',
    documentId,
    versionId,
    userId: 'user4',
    user: SAMPLE_USERS[3],
    content: 'HVAC ductwork routing conflicts with the proposed ceiling height in Conference Room. Please coordinate.',
    pageNumber: 1,
    coordinates: { x: 250, y: 180, width: 100, height: 60 },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    resolved: false,
  },
];

// Generate comprehensive sample documents
export const generateSampleDocuments = (projectId: string): Document[] => {
  const documents: Document[] = [];
  
  // Architectural Documents
  const archDocs = [
    { title: 'Ground Floor Plan', number: 'A-101', description: 'Detailed ground floor architectural layout with dimensions' },
    { title: 'First Floor Plan', number: 'A-102', description: 'First floor plan showing office spaces and circulation' },
    { title: 'Building Elevations', number: 'A-201', description: 'North, South, East, and West elevations' },
    { title: 'Building Sections', number: 'A-301', description: 'Cross sections through main building areas' },
    { title: 'Wall Details', number: 'A-501', description: 'Typical wall sections and construction details' },
  ];
  
  archDocs.forEach((doc, idx) => {
    const docId = `arch-${idx + 1}`;
    const versionId = `ver-arch-${idx + 1}-1`;
    documents.push({
      id: docId,
      projectId,
      title: doc.title,
      description: doc.description,
      documentNumber: doc.number,
      category: DOCUMENT_CATEGORIES[0], // Architectural
      currentVersion: {
        id: versionId,
        documentId: docId,
        versionNumber: '1.0',
        fileUrl: '/sample.pdf',
        fileName: `${doc.number}.pdf`,
        fileSize: 2500000 + Math.floor(Math.random() * 5000000),
        fileType: 'application/pdf',
        uploadedBy: SAMPLE_USERS[1],
        uploadedAt: new Date(Date.now() - (30 - idx * 5) * 24 * 60 * 60 * 1000).toISOString(),
        changes: idx > 0 ? 'Updated per client feedback' : 'Initial submission',
        status: idx === 0 ? 'approved' : idx === 1 ? 'review' : 'draft',
        comments: idx === 2 ? generateSampleComments(docId, versionId) : [],
      },
      versions: [],
      tags: ['construction', 'phase-1', '2024'],
      status: 'active',
      confidential: false,
      createdBy: SAMPLE_USERS[1],
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - (30 - idx * 5) * 24 * 60 * 60 * 1000).toISOString(),
      permissions: [],
      metadata: {
        author: SAMPLE_USERS[1].name,
        discipline: 'Architectural',
        phase: 'Construction Documents',
        drawingScale: '1/8" = 1\'-0"',
        paperSize: 'ARCH D (24x36)',
        revision: 'A',
        issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    });
  });
  
  // Structural Documents
  const structDocs = [
    { title: 'Foundation Plan', number: 'S-101', description: 'Foundation layout and details' },
    { title: 'Framing Plan - Level 1', number: 'S-201', description: 'Structural framing for first level' },
    { title: 'Column Schedule', number: 'S-301', description: 'Column sizes and reinforcement details' },
  ];
  
  structDocs.forEach((doc, idx) => {
    const docId = `struct-${idx + 1}`;
    documents.push({
      id: docId,
      projectId,
      title: doc.title,
      description: doc.description,
      documentNumber: doc.number,
      category: DOCUMENT_CATEGORIES[1], // Structural
      currentVersion: {
        id: `ver-struct-${idx + 1}-1`,
        documentId: docId,
        versionNumber: '2.0',
        fileUrl: '/sample.pdf',
        fileName: `${doc.number}.pdf`,
        fileSize: 3500000 + Math.floor(Math.random() * 2000000),
        fileType: 'application/pdf',
        uploadedBy: SAMPLE_USERS[2],
        uploadedAt: new Date(Date.now() - (25 - idx * 3) * 24 * 60 * 60 * 1000).toISOString(),
        status: 'approved',
        changes: 'Updated reinforcement details',
      },
      versions: [],
      tags: ['structural', 'critical', 'phase-1'],
      status: 'active',
      confidential: false,
      createdBy: SAMPLE_USERS[2],
      createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - (25 - idx * 3) * 24 * 60 * 60 * 1000).toISOString(),
      permissions: [],
      metadata: {
        author: SAMPLE_USERS[2].name,
        discipline: 'Structural',
        phase: 'Construction Documents',
        drawingScale: '1/4" = 1\'-0"',
        paperSize: 'ARCH D (24x36)',
        revision: 'B',
      },
    });
  });
  
  // MEP Documents
  const mepCategories = [
    { cat: DOCUMENT_CATEGORIES[2], prefix: 'E', name: 'Electrical' }, // Electrical
    { cat: DOCUMENT_CATEGORIES[3], prefix: 'M', name: 'Mechanical' }, // Mechanical
    { cat: DOCUMENT_CATEGORIES[4], prefix: 'P', name: 'Plumbing' }, // Plumbing
    { cat: DOCUMENT_CATEGORIES[5], prefix: 'H', name: 'HVAC' }, // HVAC
  ];
  
  mepCategories.forEach((mep, mepIdx) => {
    const docId = `mep-${mep.prefix}-1`;
    documents.push({
      id: docId,
      projectId,
      title: `${mep.name} Layout - Level 1`,
      description: `${mep.name} systems layout and routing`,
      documentNumber: `${mep.prefix}-101`,
      category: mep.cat,
      currentVersion: {
        id: `ver-${docId}-1`,
        documentId: docId,
        versionNumber: '1.0',
        fileUrl: '/sample.pdf',
        fileName: `${mep.prefix}-101.pdf`,
        fileSize: 1800000 + Math.floor(Math.random() * 1000000),
        fileType: 'application/pdf',
        uploadedBy: SAMPLE_USERS[3],
        uploadedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        status: mepIdx === 0 ? 'review' : 'draft',
      },
      versions: [],
      tags: ['mep', mep.name.toLowerCase()],
      status: 'active',
      confidential: false,
      createdBy: SAMPLE_USERS[3],
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      permissions: [],
      metadata: {
        author: SAMPLE_USERS[3].name,
        discipline: mep.name,
        phase: 'Design Development',
        drawingScale: '1/8" = 1\'-0"',
        paperSize: 'ARCH D (24x36)',
      },
    });
  });
  
  // Specifications and Reports
  const specs = [
    { title: 'Technical Specifications', number: 'SPEC-001', cat: DOCUMENT_CATEGORIES[10] },
    { title: 'Material Submittal', number: 'SUB-001', cat: DOCUMENT_CATEGORIES[10] },
    { title: 'Structural Calculation Report', number: 'RPT-S-001', cat: DOCUMENT_CATEGORIES[13] },
    { title: 'Energy Analysis Report', number: 'RPT-E-001', cat: DOCUMENT_CATEGORIES[13] },
  ];
  
  specs.forEach((spec, idx) => {
    const docId = `spec-${idx + 1}`;
    documents.push({
      id: docId,
      projectId,
      title: spec.title,
      description: `Detailed ${spec.title.toLowerCase()} for the project`,
      documentNumber: spec.number,
      category: spec.cat,
      currentVersion: {
        id: `ver-${docId}-1`,
        documentId: docId,
        versionNumber: '1.0',
        fileUrl: '/sample.pdf',
        fileName: `${spec.number}.pdf`,
        fileSize: 850000 + Math.floor(Math.random() * 500000),
        fileType: 'application/pdf',
        uploadedBy: SAMPLE_USERS[4],
        uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'approved',
      },
      versions: [],
      tags: ['specifications', 'submittal'],
      status: 'active',
      confidential: idx === 3,
      createdBy: SAMPLE_USERS[4],
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      permissions: [],
      metadata: {
        author: SAMPLE_USERS[4].name,
        responseRequired: true,
        responseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        distribution: ['contractor@example.com', 'consultant@example.com'],
      },
    });
  });
  
  return documents;
};

// Generate sample document relationships
export const generateSampleRelations = (documents: Document[]): RelatedDocument[] => {
  const relations: RelatedDocument[] = [];
  
  // Link floor plans to each other (parent-child)
  const floorPlans = documents.filter(d => d.title.includes('Floor Plan'));
  if (floorPlans.length >= 2) {
    relations.push({
      id: 'rel1',
      documentId: floorPlans[0].id,
      relatedDocumentId: floorPlans[1].id,
      relationType: 'child',
      description: 'Upper floor continuation',
      createdAt: new Date().toISOString(),
      createdBy: SAMPLE_USERS[0],
    });
  }
  
  // Link structural to architectural (reference)
  const structural = documents.find(d => d.category.id === '2');
  const architectural = documents.find(d => d.category.id === '1');
  if (structural && architectural) {
    relations.push({
      id: 'rel2',
      documentId: structural.id,
      relatedDocumentId: architectural.id,
      relationType: 'reference',
      description: 'Architectural base reference',
      createdAt: new Date().toISOString(),
      createdBy: SAMPLE_USERS[2],
    });
  }
  
  // Link specifications to drawings (related)
  const specs = documents.filter(d => d.category.id === '11');
  const drawings = documents.filter(d => ['1', '2', '3'].includes(d.category.id));
  if (specs.length > 0 && drawings.length > 0) {
    relations.push({
      id: 'rel3',
      documentId: specs[0].id,
      relatedDocumentId: drawings[0].id,
      relationType: 'related',
      description: 'Technical specifications for drawings',
      createdAt: new Date().toISOString(),
      createdBy: SAMPLE_USERS[4],
    });
  }
  
  return relations;
};
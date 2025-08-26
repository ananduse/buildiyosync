import { 
  DOCUMENT_CATEGORIES, 
  WORKFLOW_STATUSES,
  type Document, 
  type DocumentVersion,
  type DocumentComment, 
  type DocumentAnnotation,
  type RelatedDocument,
  type CustomField,
  type DocumentWorkflow,
  type WorkflowHistory,
  type User,
  type DocumentMetadata,
  type DocumentPermission
} from '@/types/document.types';

// ==========================================
// USERS & TEAMS
// ==========================================
export const SAMPLE_USERS: User[] = [
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'Project Manager',
    department: 'Project Management'
  },
  {
    id: 'user-002',
    name: 'Jane Smith',
    email: 'jane.smith@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'Lead Architect',
    department: 'Architecture'
  },
  {
    id: 'user-003',
    name: 'Michael Johnson',
    email: 'michael.johnson@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    role: 'Structural Engineer',
    department: 'Engineering'
  },
  {
    id: 'user-004',
    name: 'Sarah Williams',
    email: 'sarah.williams@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'MEP Coordinator',
    department: 'MEP'
  },
  {
    id: 'user-005',
    name: 'David Chen',
    email: 'david.chen@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: 'QA/QC Manager',
    department: 'Quality Assurance'
  },
  {
    id: 'user-006',
    name: 'Emily Brown',
    email: 'emily.brown@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    role: 'BIM Coordinator',
    department: 'BIM'
  },
  {
    id: 'user-007',
    name: 'Robert Taylor',
    email: 'robert.taylor@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    role: 'Site Engineer',
    department: 'Construction'
  },
  {
    id: 'user-008',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@buildiyo.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    role: 'Interior Designer',
    department: 'Interior Design'
  }
];

// ==========================================
// CUSTOM FIELD DEFINITIONS
// ==========================================
export const CUSTOM_FIELDS: CustomField[] = [
  {
    id: 'field-001',
    name: 'Cost Code',
    type: 'text',
    required: true,
    category: 'Financial',
    order: 1,
    validation: {
      pattern: '^[A-Z]{2}-[0-9]{4}$',
      message: 'Format: XX-0000'
    }
  },
  {
    id: 'field-002',
    name: 'Submittal Required',
    type: 'boolean',
    required: false,
    category: 'Compliance',
    order: 2
  },
  {
    id: 'field-003',
    name: 'Review Priority',
    type: 'select',
    required: true,
    options: ['Low', 'Medium', 'High', 'Critical'],
    defaultValue: 'Medium',
    category: 'Review',
    order: 3
  },
  {
    id: 'field-004',
    name: 'Construction Phase',
    type: 'select',
    required: true,
    options: ['Foundation', 'Structure', 'Envelope', 'MEP Rough-in', 'Finishes', 'Commissioning'],
    category: 'Schedule',
    order: 4
  },
  {
    id: 'field-005',
    name: 'Estimated Cost Impact',
    type: 'number',
    required: false,
    category: 'Financial',
    order: 5,
    validation: {
      min: 0,
      max: 10000000,
      message: 'Enter value between 0 and 10,000,000'
    }
  },
  {
    id: 'field-006',
    name: 'RFI Reference',
    type: 'text',
    required: false,
    category: 'References',
    order: 6
  },
  {
    id: 'field-007',
    name: 'Specification Section',
    type: 'multiselect',
    required: false,
    options: ['Division 01', 'Division 02', 'Division 03', 'Division 04', 'Division 05'],
    category: 'Specifications',
    order: 7
  },
  {
    id: 'field-008',
    name: 'Vendor/Manufacturer',
    type: 'text',
    required: false,
    category: 'Procurement',
    order: 8
  }
];

// ==========================================
// DOCUMENT VERSIONS GENERATOR
// ==========================================
function generateVersions(documentId: string, currentVersion: DocumentVersion): DocumentVersion[] {
  const versions: DocumentVersion[] = [];
  const versionCount = Math.floor(Math.random() * 3) + 2; // 2-4 versions
  
  for (let i = versionCount; i >= 1; i--) {
    const daysAgo = i * 7;
    const user = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
    
    versions.push({
      id: `${documentId}-v${i}`,
      documentId,
      versionNumber: `${i}.0`,
      fileUrl: '/sample.pdf',
      fileName: currentVersion.fileName.replace('.pdf', `-v${i}.pdf`),
      fileSize: currentVersion.fileSize - (i * 50000) + Math.random() * 100000,
      fileType: 'application/pdf',
      uploadedBy: user,
      uploadedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      changes: i === versionCount 
        ? 'Initial document upload' 
        : `Revision ${i}: ${['Updated dimensions', 'Corrected specifications', 'Added details', 'Client feedback incorporated'][Math.floor(Math.random() * 4)]}`,
      status: i === versionCount ? 'approved' : ['draft', 'review', 'approved'][Math.floor(Math.random() * 3)] as any,
      approvedBy: i === versionCount ? SAMPLE_USERS[0] : undefined,
      approvedAt: i === versionCount ? new Date(Date.now() - (daysAgo - 1) * 24 * 60 * 60 * 1000).toISOString() : undefined
    });
  }
  
  return versions.reverse(); // Most recent first
}

// ==========================================
// COMMENTS GENERATOR
// ==========================================
function generateComments(documentId: string, versionId: string): DocumentComment[] {
  const comments: DocumentComment[] = [];
  const commentTemplates = [
    { 
      content: 'Please verify the dimensions on Grid Line A-3. They seem to conflict with the structural drawings.',
      page: 2,
      coords: { x: 150, y: 200, width: 100, height: 50 }
    },
    {
      content: 'The specified material is no longer available. Suggesting an alternative: Grade 60 rebar instead of Grade 40.',
      page: 1
    },
    {
      content: 'This detail needs to be coordinated with the MEP team. There might be a clash with the HVAC ductwork.',
      page: 3,
      coords: { x: 250, y: 150, width: 120, height: 80 }
    },
    {
      content: 'Client has requested a change in this area. Please see attached RFI-045 for details.',
      page: 1
    },
    {
      content: 'Approved with comments. Please ensure all safety requirements are clearly marked on the final version.',
      page: 1
    },
    {
      content: 'The fire rating for this wall assembly needs to be 2-hour, not 1-hour as shown.',
      page: 4,
      coords: { x: 100, y: 300, width: 150, height: 60 }
    }
  ];
  
  const numComments = Math.floor(Math.random() * 4) + 1; // 1-4 comments
  
  for (let i = 0; i < numComments && i < commentTemplates.length; i++) {
    const template = commentTemplates[i];
    const user = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
    const daysAgo = Math.floor(Math.random() * 7);
    const commentId = `comment-${documentId}-${i}`;
    
    const comment: DocumentComment = {
      id: commentId,
      documentId,
      versionId,
      userId: user.id,
      user,
      content: template.content,
      pageNumber: template.page,
      coordinates: template.coords,
      createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      resolved: Math.random() > 0.6,
      resolvedBy: Math.random() > 0.6 ? SAMPLE_USERS[0] : undefined,
      resolvedAt: Math.random() > 0.6 ? new Date(Date.now() - (daysAgo - 1) * 24 * 60 * 60 * 1000).toISOString() : undefined
    };
    
    // Add replies to some comments
    if (i === 0 && Math.random() > 0.5) {
      comment.replies = [
        {
          id: `${commentId}-reply-1`,
          documentId,
          versionId,
          userId: SAMPLE_USERS[1].id,
          user: SAMPLE_USERS[1],
          content: 'I\'ve reviewed this with the structural team. The dimensions are correct as shown.',
          parentId: commentId,
          createdAt: new Date(Date.now() - (daysAgo - 1) * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - (daysAgo - 1) * 24 * 60 * 60 * 1000).toISOString(),
          resolved: false
        }
      ];
    }
    
    comments.push(comment);
  }
  
  return comments;
}

// ==========================================
// ANNOTATIONS GENERATOR
// ==========================================
function generateAnnotations(documentId: string, versionId: string): DocumentAnnotation[] {
  const annotations: DocumentAnnotation[] = [];
  const annotationTypes: DocumentAnnotation['type'][] = ['highlight', 'rectangle', 'circle', 'text', 'arrow'];
  
  const numAnnotations = Math.floor(Math.random() * 5) + 2; // 2-6 annotations
  
  for (let i = 0; i < numAnnotations; i++) {
    const user = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
    
    annotations.push({
      id: `annotation-${documentId}-${i}`,
      type: annotationTypes[Math.floor(Math.random() * annotationTypes.length)],
      pageNumber: Math.floor(Math.random() * 3) + 1,
      coordinates: {
        x: Math.random() * 400 + 50,
        y: Math.random() * 500 + 50,
        width: Math.random() * 150 + 50,
        height: Math.random() * 100 + 30
      },
      content: i === 0 ? 'Important: Verify this dimension' : undefined,
      color: ['#FFEB3B', '#2196F3', '#4CAF50', '#FF5722'][Math.floor(Math.random() * 4)],
      userId: user.id,
      user,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return annotations;
}

// ==========================================
// WORKFLOW GENERATOR
// ==========================================
function generateWorkflow(documentId: string): DocumentWorkflow {
  const stages = ['draft', 'internal_review', 'client_review', 'approval', 'construction'];
  const currentStageIndex = Math.floor(Math.random() * 3) + 1;
  
  const history: WorkflowHistory[] = [];
  
  for (let i = 0; i <= currentStageIndex; i++) {
    const user = SAMPLE_USERS[Math.floor(Math.random() * SAMPLE_USERS.length)];
    const daysAgo = (stages.length - i) * 3;
    
    history.push({
      id: `wf-history-${documentId}-${i}`,
      stageId: stages[i],
      action: i === 0 ? 'Document Created' : `Moved to ${stages[i].replace('_', ' ').toUpperCase()}`,
      userId: user.id,
      user,
      timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      comments: i === 1 ? 'Ready for review' : i === 2 ? 'Submitted to client' : undefined
    });
  }
  
  return {
    id: `workflow-${documentId}`,
    name: 'Standard Document Review',
    stages: stages.map((stage, index) => ({
      id: stage,
      name: stage.replace('_', ' ').charAt(0).toUpperCase() + stage.replace('_', ' ').slice(1),
      order: index,
      assignees: [SAMPLE_USERS[index % SAMPLE_USERS.length]],
      status: index <= currentStageIndex ? 'completed' : index === currentStageIndex + 1 ? 'in_progress' : 'pending',
      completedAt: index <= currentStageIndex 
        ? new Date(Date.now() - (stages.length - index) * 3 * 24 * 60 * 60 * 1000).toISOString() 
        : undefined,
      completedBy: index <= currentStageIndex ? SAMPLE_USERS[index % SAMPLE_USERS.length] : undefined
    })),
    currentStage: stages[currentStageIndex],
    history,
    transitions: [
      {
        id: 'trans-1',
        from: 'draft',
        to: 'internal_review',
        name: 'Submit for Review',
        requiresApproval: false
      },
      {
        id: 'trans-2',
        from: 'internal_review',
        to: 'client_review',
        name: 'Send to Client',
        requiresApproval: true,
        approvers: ['user-001', 'user-002']
      },
      {
        id: 'trans-3',
        from: 'client_review',
        to: 'approval',
        name: 'Submit for Approval',
        requiresApproval: false
      },
      {
        id: 'trans-4',
        from: 'approval',
        to: 'construction',
        name: 'Release for Construction',
        requiresApproval: true,
        approvers: ['user-001', 'user-003', 'user-005']
      }
    ]
  };
}

// ==========================================
// PERMISSIONS GENERATOR
// ==========================================
function generatePermissions(documentId: string): DocumentPermission[] {
  return [
    {
      id: `perm-${documentId}-1`,
      documentId,
      roleId: 'role-admin',
      canView: true,
      canEdit: true,
      canDelete: true,
      canComment: true,
      canAnnotate: true,
      canApprove: true,
      canDownload: true,
      canPrint: true,
      canShare: true
    },
    {
      id: `perm-${documentId}-2`,
      documentId,
      roleId: 'role-manager',
      canView: true,
      canEdit: true,
      canDelete: false,
      canComment: true,
      canAnnotate: true,
      canApprove: true,
      canDownload: true,
      canPrint: true,
      canShare: true
    },
    {
      id: `perm-${documentId}-3`,
      documentId,
      roleId: 'role-engineer',
      canView: true,
      canEdit: false,
      canDelete: false,
      canComment: true,
      canAnnotate: true,
      canApprove: false,
      canDownload: true,
      canPrint: true,
      canShare: false
    },
    {
      id: `perm-${documentId}-4`,
      documentId,
      roleId: 'role-viewer',
      canView: true,
      canEdit: false,
      canDelete: false,
      canComment: false,
      canAnnotate: false,
      canApprove: false,
      canDownload: false,
      canPrint: false,
      canShare: false
    }
  ];
}

// ==========================================
// COMPLETE DOCUMENT GENERATOR
// ==========================================
export function generateCompleteDocuments(projectId: string): Document[] {
  const documents: Document[] = [];
  
  // Document templates with realistic data
  const documentTemplates = [
    // Architectural Documents
    {
      category: DOCUMENT_CATEGORIES[0], // Architectural
      documents: [
        { title: 'Site Plan', number: 'A-001', description: 'Overall site layout with building footprint, parking, and landscaping' },
        { title: 'Ground Floor Plan', number: 'A-101', description: 'Detailed ground floor layout with dimensions and room labels' },
        { title: 'First Floor Plan', number: 'A-102', description: 'First floor plan showing office spaces, meeting rooms, and circulation' },
        { title: 'Second Floor Plan', number: 'A-103', description: 'Second floor layout with open office areas and support spaces' },
        { title: 'Roof Plan', number: 'A-104', description: 'Roof layout showing drainage, equipment, and access points' },
        { title: 'Building Elevations', number: 'A-201', description: 'North, South, East, and West elevations with materials' },
        { title: 'Building Sections', number: 'A-301', description: 'Cross sections showing vertical relationships and heights' },
        { title: 'Wall Sections', number: 'A-401', description: 'Detailed wall assemblies and construction details' },
        { title: 'Stair Details', number: 'A-501', description: 'Staircase construction details and dimensions' },
        { title: 'Door & Window Schedule', number: 'A-601', description: 'Complete schedule of all doors and windows' }
      ]
    },
    // Structural Documents
    {
      category: DOCUMENT_CATEGORIES[1], // Structural
      documents: [
        { title: 'Foundation Plan', number: 'S-101', description: 'Foundation layout with footings and grade beams' },
        { title: 'Foundation Details', number: 'S-102', description: 'Detailed foundation sections and reinforcement' },
        { title: 'Ground Floor Framing', number: 'S-201', description: 'Structural framing plan for ground floor' },
        { title: 'First Floor Framing', number: 'S-202', description: 'First floor structural framing and beam layout' },
        { title: 'Roof Framing Plan', number: 'S-203', description: 'Roof structure and support system' },
        { title: 'Column Schedule', number: 'S-301', description: 'Column types, sizes, and reinforcement details' },
        { title: 'Beam Schedule', number: 'S-302', description: 'Beam specifications and connection details' },
        { title: 'Structural Details', number: 'S-401', description: 'Typical structural connections and details' }
      ]
    },
    // Electrical Documents
    {
      category: DOCUMENT_CATEGORIES[2], // Electrical
      documents: [
        { title: 'Electrical Site Plan', number: 'E-001', description: 'Site electrical distribution and lighting' },
        { title: 'Power Plan - Ground Floor', number: 'E-101', description: 'Power outlets and distribution for ground floor' },
        { title: 'Lighting Plan - Ground Floor', number: 'E-201', description: 'Lighting layout and switching for ground floor' },
        { title: 'Single Line Diagram', number: 'E-301', description: 'Electrical distribution single line diagram' },
        { title: 'Panel Schedules', number: 'E-401', description: 'Electrical panel schedules and loads' },
        { title: 'Electrical Details', number: 'E-501', description: 'Typical electrical installation details' }
      ]
    },
    // Mechanical Documents
    {
      category: DOCUMENT_CATEGORIES[3], // Mechanical
      documents: [
        { title: 'HVAC Plan - Ground Floor', number: 'M-101', description: 'HVAC equipment and ductwork layout' },
        { title: 'HVAC Plan - First Floor', number: 'M-102', description: 'First floor HVAC distribution' },
        { title: 'Mechanical Equipment Schedule', number: 'M-201', description: 'Schedule of all mechanical equipment' },
        { title: 'HVAC Details', number: 'M-301', description: 'Typical HVAC installation details' }
      ]
    },
    // Plumbing Documents
    {
      category: DOCUMENT_CATEGORIES[4], // Plumbing
      documents: [
        { title: 'Plumbing Plan - Ground Floor', number: 'P-101', description: 'Plumbing fixtures and piping layout' },
        { title: 'Plumbing Riser Diagram', number: 'P-201', description: 'Vertical plumbing distribution diagram' },
        { title: 'Plumbing Details', number: 'P-301', description: 'Typical plumbing installation details' }
      ]
    }
  ];
  
  // Generate documents for each category
  documentTemplates.forEach((template, catIndex) => {
    template.documents.forEach((doc, docIndex) => {
      const documentId = `doc-${catIndex}-${docIndex}`;
      const currentVersionId = `${documentId}-current`;
      const createdDaysAgo = 90 - (catIndex * 10) - docIndex;
      const updatedDaysAgo = Math.floor(Math.random() * 30);
      
      // Generate current version
      const currentVersion: DocumentVersion = {
        id: currentVersionId,
        documentId,
        versionNumber: `${Math.floor(Math.random() * 3) + 1}.0`,
        fileUrl: '/sample.pdf',
        fileName: `${doc.number}.pdf`,
        fileSize: 1500000 + Math.floor(Math.random() * 8500000),
        fileType: 'application/pdf',
        uploadedBy: SAMPLE_USERS[docIndex % SAMPLE_USERS.length],
        uploadedAt: new Date(Date.now() - updatedDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
        status: ['draft', 'review', 'approved', 'approved', 'approved'][Math.floor(Math.random() * 5)] as any,
        changes: 'Latest revision with updated specifications',
        comments: generateComments(documentId, currentVersionId),
        annotations: generateAnnotations(documentId, currentVersionId)
      };
      
      // Generate metadata
      const metadata: DocumentMetadata = {
        author: SAMPLE_USERS[docIndex % SAMPLE_USERS.length].name,
        discipline: template.category.name,
        phase: ['Schematic Design', 'Design Development', 'Construction Documents', 'Construction'][Math.floor(Math.random() * 4)],
        drawingScale: ['1:100', '1:50', '1/8"=1\'-0"', '1/4"=1\'-0"', 'NTS'][Math.floor(Math.random() * 5)],
        paperSize: ['A1', 'A0', 'ARCH D', 'ARCH E'][Math.floor(Math.random() * 4)],
        revision: ['A', 'B', 'C', '0', '1', '2'][Math.floor(Math.random() * 6)],
        issueDate: new Date(Date.now() - createdDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
        effectiveDate: new Date(Date.now() - (createdDaysAgo - 7) * 24 * 60 * 60 * 1000).toISOString(),
        checkedBy: SAMPLE_USERS[(docIndex + 1) % SAMPLE_USERS.length].name,
        approvedBy: SAMPLE_USERS[0].name,
        contractPackage: `CP-${String(catIndex + 1).padStart(2, '0')}`,
        submittalNumber: Math.random() > 0.5 ? `SUB-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}` : undefined,
        responseRequired: Math.random() > 0.7,
        responseDate: Math.random() > 0.7 
          ? new Date(Date.now() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toISOString() 
          : undefined,
        distribution: ['contractor@example.com', 'consultant@example.com', 'owner@example.com'],
        customFields: {
          'field-001': `${template.category.code}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
          'field-002': Math.random() > 0.5,
          'field-003': ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
          'field-004': ['Foundation', 'Structure', 'Envelope', 'MEP Rough-in', 'Finishes'][Math.floor(Math.random() * 5)],
          'field-005': Math.floor(Math.random() * 100000),
          'field-006': Math.random() > 0.5 ? `RFI-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}` : undefined
        }
      };
      
      // Create the complete document
      const document: Document = {
        id: documentId,
        projectId,
        title: doc.title,
        description: doc.description,
        documentNumber: doc.number,
        category: template.category,
        subcategory: Math.random() > 0.5 ? 'For Construction' : 'For Review',
        currentVersion,
        versions: generateVersions(documentId, currentVersion),
        tags: [
          template.category.name.toLowerCase(),
          'construction',
          'phase-1',
          '2024',
          Math.random() > 0.5 ? 'critical' : 'standard'
        ],
        status: 'active',
        confidential: Math.random() > 0.8,
        createdBy: SAMPLE_USERS[docIndex % SAMPLE_USERS.length],
        createdAt: new Date(Date.now() - createdDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - updatedDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
        lastAccessedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
        permissions: generatePermissions(documentId),
        metadata,
        workflow: generateWorkflow(documentId)
      };
      
      documents.push(document);
    });
  });
  
  return documents;
}

// ==========================================
// DOCUMENT RELATIONSHIPS GENERATOR
// ==========================================
export function generateDocumentRelationships(documents: Document[]): RelatedDocument[] {
  const relationships: RelatedDocument[] = [];
  
  // Create relationships between documents
  documents.forEach((doc, index) => {
    // Link floor plans together (parent-child)
    if (doc.title.includes('Floor Plan') && index < documents.length - 1) {
      const nextFloorPlan = documents.find((d, i) => i > index && d.title.includes('Floor Plan'));
      if (nextFloorPlan) {
        relationships.push({
          id: `rel-${doc.id}-${nextFloorPlan.id}`,
          documentId: doc.id,
          relatedDocumentId: nextFloorPlan.id,
          relationType: 'child',
          description: 'Next floor level',
          createdAt: new Date().toISOString(),
          createdBy: SAMPLE_USERS[0]
        });
      }
    }
    
    // Link structural to architectural (reference)
    if (doc.category.id === '2' && doc.title.includes('Framing')) {
      const archPlan = documents.find(d => 
        d.category.id === '1' && d.title.includes('Floor Plan') && 
        d.title.toLowerCase().includes(doc.title.split(' ')[0].toLowerCase())
      );
      if (archPlan) {
        relationships.push({
          id: `rel-${doc.id}-${archPlan.id}`,
          documentId: doc.id,
          relatedDocumentId: archPlan.id,
          relationType: 'reference',
          description: 'Architectural base drawing',
          createdAt: new Date().toISOString(),
          createdBy: SAMPLE_USERS[2]
        });
      }
    }
    
    // Link MEP to architectural (reference)
    if (['3', '4', '5'].includes(doc.category.id) && doc.title.includes('Plan')) {
      const archPlan = documents.find(d => 
        d.category.id === '1' && d.title.includes('Floor Plan')
      );
      if (archPlan) {
        relationships.push({
          id: `rel-${doc.id}-${archPlan.id}-ref`,
          documentId: doc.id,
          relatedDocumentId: archPlan.id,
          relationType: 'reference',
          description: 'Base architectural layout',
          createdAt: new Date().toISOString(),
          createdBy: SAMPLE_USERS[3]
        });
      }
    }
    
    // Link details to main drawings (parent-child)
    if (doc.title.includes('Details')) {
      const mainDrawing = documents.find(d => 
        d.category.id === doc.category.id && 
        d.title.includes('Plan') &&
        !d.title.includes('Details')
      );
      if (mainDrawing) {
        relationships.push({
          id: `rel-${mainDrawing.id}-${doc.id}-detail`,
          documentId: mainDrawing.id,
          relatedDocumentId: doc.id,
          relationType: 'child',
          description: 'Detailed views',
          createdAt: new Date().toISOString(),
          createdBy: SAMPLE_USERS[1]
        });
      }
    }
    
    // Create some superseded relationships
    if (index > 0 && Math.random() > 0.8 && doc.category.id === documents[index - 1].category.id) {
      relationships.push({
        id: `rel-${doc.id}-supersedes-${documents[index - 1].id}`,
        documentId: doc.id,
        relatedDocumentId: documents[index - 1].id,
        relationType: 'supersedes',
        description: 'Updated version supersedes previous document',
        createdAt: new Date().toISOString(),
        createdBy: SAMPLE_USERS[4]
      });
    }
  });
  
  return relationships;
}

// ==========================================
// MAIN EXPORT FUNCTION
// ==========================================
export function getCompleteDocumentData(projectId: string = 'P015') {
  const documents = generateCompleteDocuments(projectId);
  const relationships = generateDocumentRelationships(documents);
  
  return {
    documents,
    relationships,
    users: SAMPLE_USERS,
    customFields: CUSTOM_FIELDS,
    categories: DOCUMENT_CATEGORIES,
    workflowStatuses: WORKFLOW_STATUSES,
    stats: {
      totalDocuments: documents.length,
      totalVersions: documents.reduce((sum, doc) => sum + doc.versions.length, 0),
      totalComments: documents.reduce((sum, doc) => 
        sum + (doc.currentVersion.comments?.length || 0), 0
      ),
      totalRelationships: relationships.length,
      byCategory: DOCUMENT_CATEGORIES.map(cat => ({
        category: cat.name,
        count: documents.filter(d => d.category.id === cat.id).length
      })),
      byStatus: ['draft', 'review', 'approved'].map(status => ({
        status,
        count: documents.filter(d => d.currentVersion.status === status).length
      }))
    }
  };
}
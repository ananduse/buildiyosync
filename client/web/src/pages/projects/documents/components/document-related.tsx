import { useState } from 'react';
import { 
  Link2, Plus, X, FileText, ArrowRight, ArrowLeft, 
  GitBranch, RefreshCw, ExternalLink, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Document, RelatedDocument } from '@/types/document.types';

interface DocumentRelatedProps {
  document: Document;
  allDocuments: Document[];
  relations: RelatedDocument[];
  onAddRelation: (relation: Omit<RelatedDocument, 'id' | 'createdAt' | 'createdBy'>) => void;
  onRemoveRelation: (relationId: string) => void;
  onViewDocument: (document: Document) => void;
}

export default function DocumentRelated({
  document,
  allDocuments,
  relations,
  onAddRelation,
  onRemoveRelation,
  onViewDocument
}: DocumentRelatedProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState('');
  const [relationType, setRelationType] = useState<RelatedDocument['relationType']>('related');
  const [relationDescription, setRelationDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get related documents for current document
  const getRelatedDocuments = () => {
    const related = {
      parents: [] as Document[],
      children: [] as Document[],
      references: [] as Document[],
      supersedes: [] as Document[],
      supersededBy: [] as Document[],
      related: [] as Document[],
    };
    
    relations
      .filter(rel => rel.documentId === document.id || rel.relatedDocumentId === document.id)
      .forEach(rel => {
        const isSource = rel.documentId === document.id;
        const targetId = isSource ? rel.relatedDocumentId : rel.documentId;
        const targetDoc = allDocuments.find(d => d.id === targetId);
        
        if (targetDoc) {
          const relationWithDoc = { ...rel, document: targetDoc };
          
          switch (rel.relationType) {
            case 'parent':
              if (isSource) {
                related.parents.push(targetDoc);
              } else {
                related.children.push(targetDoc);
              }
              break;
              
            case 'child':
              if (isSource) {
                related.children.push(targetDoc);
              } else {
                related.parents.push(targetDoc);
              }
              break;
              
            case 'reference':
              related.references.push(targetDoc);
              break;
              
            case 'supersedes':
              if (isSource) {
                related.supersedes.push(targetDoc);
              } else {
                related.supersededBy.push(targetDoc);
              }
              break;
              
            case 'superseded_by':
              if (isSource) {
                related.supersededBy.push(targetDoc);
              } else {
                related.supersedes.push(targetDoc);
              }
              break;
              
            case 'related':
              related.related.push(targetDoc);
              break;
          }
        }
      });
    
    return related;
  };
  
  const relatedDocs = getRelatedDocuments();
  const totalRelations = Object.values(relatedDocs).reduce((sum, docs) => sum + docs.length, 0);
  
  // Filter documents for search
  const availableDocuments = allDocuments
    .filter(d => d.id !== document.id)
    .filter(d => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(query) ||
        d.documentNumber.toLowerCase().includes(query) ||
        d.category.name.toLowerCase().includes(query)
      );
    });
  
  const handleAddRelation = () => {
    if (!selectedDocumentId) return;
    
    onAddRelation({
      documentId: document.id,
      relatedDocumentId: selectedDocumentId,
      relationType,
      description: relationDescription,
    });
    
    setShowAddDialog(false);
    setSelectedDocumentId('');
    setRelationType('related');
    setRelationDescription('');
    setSearchQuery('');
  };
  
  const getRelationIcon = (type: RelatedDocument['relationType']) => {
    const icons = {
      parent: ArrowLeft,
      child: ArrowRight,
      reference: Link2,
      supersedes: RefreshCw,
      superseded_by: RefreshCw,
      related: GitBranch,
    };
    return icons[type] || FileText;
  };
  
  const getRelationColor = (type: RelatedDocument['relationType']) => {
    const colors = {
      parent: 'text-blue-600',
      child: 'text-green-600',
      reference: 'text-purple-600',
      supersedes: 'text-orange-600',
      superseded_by: 'text-red-600',
      related: 'text-gray-600',
    };
    return colors[type] || 'text-gray-600';
  };
  
  const DocumentLink = ({ doc, type }: { doc: Document; type: RelatedDocument['relationType'] }) => {
    const Icon = getRelationIcon(type);
    const color = getRelationColor(type);
    
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100", color)}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-sm">{doc.title}</p>
            <p className="text-xs text-gray-500">{doc.documentNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {doc.category.name}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDocument(doc)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Related Documents</CardTitle>
          <div className="flex items-center gap-2">
            {totalRelations > 0 && (
              <Badge variant="secondary">{totalRelations} linked</Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {totalRelations === 0 ? (
            <div className="text-center py-8">
              <GitBranch className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-3">No related documents</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddDialog(true)}
              >
                Link Document
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Parent Documents */}
              {relatedDocs.parents.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowLeft className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium">Parent Documents</p>
                    <Badge variant="secondary" className="text-xs">
                      {relatedDocs.parents.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {relatedDocs.parents.map(doc => (
                      <DocumentLink key={doc.id} doc={doc} type="parent" />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Child Documents */}
              {relatedDocs.children.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium">Child Documents</p>
                    <Badge variant="secondary" className="text-xs">
                      {relatedDocs.children.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {relatedDocs.children.map(doc => (
                      <DocumentLink key={doc.id} doc={doc} type="child" />
                    ))}
                  </div>
                </div>
              )}
              
              {/* References */}
              {relatedDocs.references.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="h-4 w-4 text-purple-600" />
                    <p className="text-sm font-medium">References</p>
                    <Badge variant="secondary" className="text-xs">
                      {relatedDocs.references.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {relatedDocs.references.map(doc => (
                      <DocumentLink key={doc.id} doc={doc} type="reference" />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Supersedes */}
              {relatedDocs.supersedes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-medium">Supersedes</p>
                    <Badge variant="secondary" className="text-xs">
                      {relatedDocs.supersedes.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {relatedDocs.supersedes.map(doc => (
                      <DocumentLink key={doc.id} doc={doc} type="supersedes" />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Superseded By */}
              {relatedDocs.supersededBy.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-4 w-4 text-red-600" />
                    <p className="text-sm font-medium">Superseded By</p>
                    <Badge variant="secondary" className="text-xs">
                      {relatedDocs.supersededBy.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {relatedDocs.supersededBy.map(doc => (
                      <DocumentLink key={doc.id} doc={doc} type="superseded_by" />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Related */}
              {relatedDocs.related.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="h-4 w-4 text-gray-600" />
                    <p className="text-sm font-medium">Related Documents</p>
                    <Badge variant="secondary" className="text-xs">
                      {relatedDocs.related.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {relatedDocs.related.map(doc => (
                      <DocumentLink key={doc.id} doc={doc} type="related" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Relation Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Link Related Document</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Relation Type</Label>
              <Select value={relationType} onValueChange={(v: any) => setRelationType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent Document</SelectItem>
                  <SelectItem value="child">Child Document</SelectItem>
                  <SelectItem value="reference">Reference</SelectItem>
                  <SelectItem value="supersedes">Supersedes</SelectItem>
                  <SelectItem value="superseded_by">Superseded By</SelectItem>
                  <SelectItem value="related">Related</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Search Documents</Label>
              <Input
                placeholder="Search by title, number, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Select Document</Label>
              <ScrollArea className="h-64 border rounded-lg p-2">
                <div className="space-y-2">
                  {availableDocuments.map(doc => (
                    <div
                      key={doc.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                        selectedDocumentId === doc.id
                          ? "bg-blue-50 border-blue-300 border"
                          : "hover:bg-gray-50 border border-gray-200"
                      )}
                      onClick={() => setSelectedDocumentId(doc.id)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{doc.title}</p>
                          <p className="text-xs text-gray-500">
                            {doc.documentNumber} • {doc.category.name}
                          </p>
                        </div>
                      </div>
                      {selectedDocumentId === doc.id && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                placeholder="Add a description for this relationship..."
                value={relationDescription}
                onChange={(e) => setRelationDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRelation} disabled={!selectedDocumentId}>
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
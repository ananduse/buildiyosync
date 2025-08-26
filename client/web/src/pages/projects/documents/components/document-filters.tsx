import { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DOCUMENT_CATEGORIES, type DocumentFilter } from '@/types/document.types';

interface DocumentFiltersProps {
  onClose: () => void;
  onApply: (filters: DocumentFilter) => void;
}

export default function DocumentFilters({
  onClose,
  onApply
}: DocumentFiltersProps) {
  const [filters, setFilters] = useState<DocumentFilter>({
    categories: [],
    status: [],
    uploadedBy: [],
    tags: [],
    confidential: undefined,
    hasComments: undefined
  });
  
  const statuses = [
    { id: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-700' },
    { id: 'review', label: 'In Review', color: 'bg-blue-100 text-blue-700' },
    { id: 'approved', label: 'Approved', color: 'bg-green-100 text-green-700' },
    { id: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-700' }
  ];
  
  const users = [
    { id: 'user1', name: 'John Doe', role: 'Project Manager' },
    { id: 'user2', name: 'Jane Smith', role: 'Architect' },
    { id: 'user3', name: 'Mike Johnson', role: 'Engineer' },
    { id: 'user4', name: 'Sarah Williams', role: 'Reviewer' }
  ];
  
  const tags = [
    'technical', 'draft', 'final', 'revision', 'urgent', 
    'client-review', 'internal', 'external', '2024', 'construction'
  ];
  
  const handleCategoryToggle = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories?.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...(prev.categories || []), categoryId]
    }));
  };
  
  const handleStatusToggle = (statusId: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status?.includes(statusId)
        ? prev.status.filter(id => id !== statusId)
        : [...(prev.status || []), statusId]
    }));
  };
  
  const handleUserToggle = (userId: string) => {
    setFilters(prev => ({
      ...prev,
      uploadedBy: prev.uploadedBy?.includes(userId)
        ? prev.uploadedBy.filter(id => id !== userId)
        : [...(prev.uploadedBy || []), userId]
    }));
  };
  
  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };
  
  const handleReset = () => {
    setFilters({
      categories: [],
      status: [],
      uploadedBy: [],
      tags: [],
      confidential: undefined,
      hasComments: undefined
    });
  };
  
  const activeFilterCount = 
    (filters.categories?.length || 0) +
    (filters.status?.length || 0) +
    (filters.uploadedBy?.length || 0) +
    (filters.tags?.length || 0) +
    (filters.confidential !== undefined ? 1 : 0) +
    (filters.hasComments !== undefined ? 1 : 0);
  
  return (
    <div className="border-b bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Filters</h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" onClick={() => onApply(filters)}>
              Apply Filters
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="max-h-96">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Categories */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Categories</Label>
              <div className="space-y-2">
                {DOCUMENT_CATEGORIES.slice(0, 6).map(category => (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${category.id}`}
                      checked={filters.categories?.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <Label
                      htmlFor={`cat-${category.id}`}
                      className="text-sm font-normal cursor-pointer flex items-center gap-1"
                    >
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Status */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Status</Label>
              <div className="space-y-2">
                {statuses.map(status => (
                  <div key={status.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`status-${status.id}`}
                      checked={filters.status?.includes(status.id)}
                      onCheckedChange={() => handleStatusToggle(status.id)}
                    />
                    <Label
                      htmlFor={`status-${status.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Uploaded By */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Uploaded By</Label>
              <div className="space-y-2">
                {users.map(user => (
                  <div key={user.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={filters.uploadedBy?.includes(user.id)}
                      onCheckedChange={() => handleUserToggle(user.id)}
                    />
                    <Label
                      htmlFor={`user-${user.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {user.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Additional Filters */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Additional Filters</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="confidential"
                    checked={filters.confidential === true}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, confidential: checked ? true : undefined }))
                    }
                  />
                  <Label
                    htmlFor="confidential"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Confidential only
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="hasComments"
                    checked={filters.hasComments === true}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, hasComments: checked ? true : undefined }))
                    }
                  />
                  <Label
                    htmlFor="hasComments"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Has comments
                  </Label>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <Label className="text-sm font-medium mb-2 block">Tags</Label>
              <div className="flex flex-wrap gap-1">
                {tags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags?.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
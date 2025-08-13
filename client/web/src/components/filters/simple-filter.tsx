import { useState } from 'react';
import { Plus, Trash2, HelpCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from './date-range-picker';
import { cn } from '@/lib/utils';

export interface SimpleFilterRule {
  id: string;
  field: string;
  operator: string;
  value: string | Date | { startDate?: Date; endDate?: Date; startTime?: string; endTime?: string; };
  connector?: 'AND' | 'OR';
}

interface FilterField {
  value: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  options?: { value: string; label: string; }[];
}

interface SimpleFilterProps {
  fields: FilterField[];
  filters: SimpleFilterRule[];
  onFiltersChange: (filters: SimpleFilterRule[]) => void;
  savedFilters?: { name: string; filters: SimpleFilterRule[]; }[];
  onSaveFilter?: (name: string, filters: SimpleFilterRule[]) => void;
  onLoadFilter?: (filters: SimpleFilterRule[]) => void;
}

const OPERATORS = {
  text: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does not contain' },
    { value: 'starts_with', label: 'Starts with' },
    { value: 'ends_with', label: 'Ends with' },
    { value: 'is_empty', label: 'Is empty' },
    { value: 'is_not_empty', label: 'Is not empty' },
  ],
  number: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' },
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'greater_equal', label: 'Greater or equal' },
    { value: 'less_equal', label: 'Less or equal' },
    { value: 'between', label: 'Between' },
  ],
  date: [
    { value: 'is', label: 'Is' },
    { value: 'is_not', label: 'Is not' },
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
    { value: 'between', label: 'Between' },
    { value: 'in_range', label: 'In date range' },
  ],
  select: [
    { value: 'equals', label: 'Is' },
    { value: 'not_equals', label: 'Is not' },
    { value: 'in', label: 'Is any of' },
    { value: 'not_in', label: 'Is none of' },
  ],
  boolean: [
    { value: 'is_true', label: 'Is true' },
    { value: 'is_false', label: 'Is false' },
  ],
};

function FilterRuleComponent({ 
  rule, 
  fields, 
  index,
  onUpdate, 
  onRemove,
  showConnector = true 
}: {
  rule: SimpleFilterRule;
  fields: FilterField[];
  index: number;
  onUpdate: (rule: SimpleFilterRule) => void;
  onRemove: () => void;
  showConnector?: boolean;
}) {
  const field = fields.find(f => f.value === rule.field);
  const operators = field ? OPERATORS[field.type] || [] : [];

  const handleFieldChange = (fieldValue: string) => {
    const newField = fields.find(f => f.value === fieldValue);
    const defaultOperator = newField ? OPERATORS[newField.type]?.[0]?.value || '' : '';
    
    onUpdate({
      ...rule,
      field: fieldValue,
      operator: defaultOperator,
      value: newField?.type === 'date' ? {} : '',
    });
  };

  const renderValueInput = () => {
    if (!field) return null;

    switch (field.type) {
      case 'date':
        return (
          <div className="flex-1 min-w-0">
            <DateRangePicker
              value={typeof rule.value === 'object' && rule.value !== null ? rule.value : {}}
              onChange={(dateRange) => onUpdate({ ...rule, value: dateRange })}
              placeholder="Select date"
            />
          </div>
        );

      case 'select':
        return (
          <div className="flex-1 min-w-0">
            <Select value={rule.value as string} onValueChange={(value) => onUpdate({ ...rule, value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'number':
        return (
          <div className="flex-1 min-w-0">
            <Input
              type="number"
              value={rule.value as string}
              onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
              placeholder="Enter value"
            />
          </div>
        );

      default:
        return (
          <div className="flex-1 min-w-0">
            <Input
              value={rule.value as string}
              onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
              placeholder="Enter value"
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      {showConnector && index > 0 && (
        <div className="flex items-center gap-2">
          <Select
            value={rule.connector || 'AND'}
            onValueChange={(value) => onUpdate({ ...rule, connector: value as 'AND' | 'OR' })}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-start gap-2 p-3 border rounded-lg bg-background">
        {/* Field Selection */}
        <div className="min-w-0">
          <Select value={rule.field} onValueChange={handleFieldChange}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Field" />
            </SelectTrigger>
            <SelectContent>
              {fields.map(field => (
                <SelectItem key={field.value} value={field.value}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Operator Selection */}
        <div className="min-w-0">
          <Select value={rule.operator} onValueChange={(value) => onUpdate({ ...rule, operator: value })}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Is" />
            </SelectTrigger>
            <SelectContent>
              {operators.map(op => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Value Input */}
        {renderValueInput()}

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-muted-foreground hover:text-destructive shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function SimpleFilter({ 
  fields, 
  filters, 
  onFiltersChange, 
  savedFilters = [],
  onSaveFilter,
  onLoadFilter 
}: SimpleFilterProps) {
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addFilter = () => {
    const newFilter: SimpleFilterRule = {
      id: `filter_${Date.now()}`,
      field: fields[0]?.value || '',
      operator: fields[0] ? OPERATORS[fields[0].type]?.[0]?.value || '' : '',
      value: '',
      connector: filters.length > 0 ? 'AND' : undefined,
    };
    onFiltersChange([...filters, newFilter]);
  };

  const updateFilter = (index: number, updatedRule: SimpleFilterRule) => {
    const newFilters = [...filters];
    newFilters[index] = updatedRule;
    onFiltersChange(newFilters);
  };

  const removeFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  const saveCurrentFilter = () => {
    if (saveFilterName.trim() && onSaveFilter) {
      onSaveFilter(saveFilterName.trim(), filters);
      setSaveFilterName('');
      setShowSaveDialog(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filter
          {filters.length > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
              {filters.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[600px] p-0" align="end" side="bottom" sideOffset={8}>
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Filters</CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              {filters.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all
                </Button>
              )}

              {savedFilters.length > 0 && (
                <Select onValueChange={(value) => {
                  const saved = savedFilters.find(s => s.name === value);
                  if (saved && onLoadFilter) {
                    onLoadFilter(saved.filters);
                  }
                }}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Saved" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedFilters.map(saved => (
                      <SelectItem key={saved.name} value={saved.name}>
                        {saved.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
            {/* Filter Rules */}
            {filters.map((filter, index) => (
              <FilterRuleComponent
                key={filter.id}
                rule={filter}
                fields={fields}
                index={index}
                onUpdate={(updatedRule) => updateFilter(index, updatedRule)}
                onRemove={() => removeFilter(index)}
              />
            ))}

            {/* Add Filter Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addFilter}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add filter
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={addFilter}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add nested filter
              </Button>

              {filters.length > 0 && onSaveFilter && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveDialog(true)}
                >
                  Save filter
                </Button>
              )}
            </div>

            {/* Save Filter Dialog */}
            {showSaveDialog && (
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
                <Input
                  placeholder="Filter name"
                  value={saveFilterName}
                  onChange={(e) => setSaveFilterName(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={saveCurrentFilter}>
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSaveDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* No filters state */}
            {filters.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-lg font-medium mb-2">No filters applied</div>
                <p className="text-sm">Click "Add filter" to start filtering your data</p>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
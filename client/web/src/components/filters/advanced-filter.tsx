import { useState } from 'react';
import { CalendarIcon, Plus, Trash2, HelpCircle, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string | Date | Date[];
  dateRange?: string;
  connector?: 'AND' | 'OR';
}

interface FilterField {
  value: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  options?: { value: string; label: string; }[];
}

interface AdvancedFilterProps {
  fields: FilterField[];
  filters: FilterRule[];
  onFiltersChange: (filters: FilterRule[]) => void;
  savedFilters?: { name: string; filters: FilterRule[]; }[];
  onSaveFilter?: (name: string, filters: FilterRule[]) => void;
  onLoadFilter?: (filters: FilterRule[]) => void;
}

const DATE_PRESETS = [
  { value: 'today', label: 'Today', getRange: () => [new Date(), new Date()] },
  { value: 'tomorrow', label: 'Tomorrow', getRange: () => [addDays(new Date(), 1), addDays(new Date(), 1)] },
  { value: 'this_week', label: 'This week', getRange: () => [startOfWeek(new Date()), endOfWeek(new Date())] },
  { value: 'next_week', label: 'Next week', getRange: () => [startOfWeek(addDays(new Date(), 7)), endOfWeek(addDays(new Date(), 7))] },
  { value: 'this_month', label: 'This month', getRange: () => [startOfMonth(new Date()), endOfMonth(new Date())] },
  { value: 'custom', label: 'Custom range', getRange: () => [new Date(), new Date()] },
];

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
  rule: FilterRule;
  fields: FilterField[];
  index: number;
  onUpdate: (rule: FilterRule) => void;
  onRemove: () => void;
  showConnector?: boolean;
}) {
  const field = fields.find(f => f.value === rule.field);
  const operators = field ? OPERATORS[field.type] || [] : [];
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFieldChange = (fieldValue: string) => {
    const newField = fields.find(f => f.value === fieldValue);
    const defaultOperator = newField ? OPERATORS[newField.type]?.[0]?.value || '' : '';
    
    onUpdate({
      ...rule,
      field: fieldValue,
      operator: defaultOperator,
      value: newField?.type === 'date' ? new Date() : '',
    });
  };

  const handleDatePresetChange = (preset: string) => {
    const presetConfig = DATE_PRESETS.find(p => p.value === preset);
    if (presetConfig) {
      const range = presetConfig.getRange();
      onUpdate({
        ...rule,
        dateRange: preset,
        value: preset === 'custom' ? [new Date(), new Date()] : range,
      });
    }
  };

  const renderValueInput = () => {
    if (!field) return null;

    switch (field.type) {
      case 'date':
        return (
          <div className="flex gap-2 items-center">
            <Select value={rule.dateRange || 'custom'} onValueChange={handleDatePresetChange}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                {DATE_PRESETS.map(preset => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-44 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {Array.isArray(rule.value) 
                      ? `${format(rule.value[0], 'MMM dd')} - ${format(rule.value[1], 'MMM dd')}`
                      : rule.value instanceof Date 
                      ? format(rule.value, 'MMM dd, yyyy')
                      : 'Select date'
                    }
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="bottom">
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Quick date options */}
                    <div className="min-w-[140px] space-y-1">
                      <div className="font-medium text-sm mb-2">Quick options</div>
                      {DATE_PRESETS.slice(0, -1).map(preset => (
                        <Button
                          key={preset.value}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 px-2"
                          onClick={() => {
                            handleDatePresetChange(preset.value);
                            if (preset.value !== 'custom') {
                              setShowDatePicker(false);
                            }
                          }}
                        >
                          <div className="text-left">
                            <div className="text-sm">{preset.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {preset.value === 'today' && format(new Date(), 'EEE')}
                              {preset.value === 'tomorrow' && format(addDays(new Date(), 1), 'EEE')}
                              {preset.value === 'this_week' && format(new Date(), 'MMM dd')}
                              {preset.value === 'next_week' && format(addDays(new Date(), 7), 'MMM dd')}
                              {preset.value === 'this_month' && format(new Date(), 'MMM yyyy')}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {/* Calendar */}
                    <div>
                      <Calendar
                        mode="single"
                        selected={rule.value instanceof Date ? rule.value : new Date()}
                        onSelect={(date) => {
                          if (date) {
                            onUpdate({ ...rule, value: date, dateRange: 'custom' });
                          }
                        }}
                        initialFocus
                        className="rounded-md border"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );

      case 'select':
        return (
          <Select value={rule.value as string} onValueChange={(value) => onUpdate({ ...rule, value })}>
            <SelectTrigger className="w-full">
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
        );

      case 'number':
        return (
          <Input
            type="number"
            value={rule.value as string}
            onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
            placeholder="Enter value"
            className="w-full"
          />
        );

      default:
        return (
          <Input
            value={rule.value as string}
            onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
            placeholder="Enter value"
            className="w-full"
          />
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
        <div className="flex-1 min-w-0">
          {renderValueInput()}
        </div>

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

export function AdvancedFilter({ 
  fields, 
  filters, 
  onFiltersChange, 
  savedFilters = [],
  onSaveFilter,
  onLoadFilter 
}: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const addFilter = () => {
    const newFilter: FilterRule = {
      id: `filter_${Date.now()}`,
      field: fields[0]?.value || '',
      operator: fields[0] ? OPERATORS[fields[0].type]?.[0]?.value || '' : '',
      value: '',
      connector: filters.length > 0 ? 'AND' : undefined,
    };
    onFiltersChange([...filters, newFilter]);
  };

  const updateFilter = (index: number, updatedRule: FilterRule) => {
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
    setIsOpen(false);
  };

  const saveCurrentFilter = () => {
    if (saveFilterName.trim() && onSaveFilter) {
      onSaveFilter(saveFilterName.trim(), filters);
      setSaveFilterName('');
      setShowSaveDialog(false);
    }
  };

  const activeFiltersCount = filters.length;

  return (
    <div className="relative">
      {/* Filter Toggle Button with Active Filters Preview */}
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-[800px] p-0" align="start" side="bottom" sideOffset={8}>
            <Card className="border-0 shadow-lg">
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
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Saved filters" />
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
              
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
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

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filters Preview - Shown below the button */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.map((filter, index) => {
            const field = fields.find(f => f.value === filter.field);
            const operator = field ? OPERATORS[field.type]?.find(op => op.value === filter.operator) : null;
            
            return (
              <Badge key={filter.id} variant="secondary" className="flex items-center gap-1">
                {field?.label} {operator?.label} {
                  Array.isArray(filter.value) 
                    ? `${format(filter.value[0], 'MMM dd')} - ${format(filter.value[1], 'MMM dd')}`
                    : filter.value instanceof Date 
                    ? format(filter.value, 'MMM dd')
                    : filter.value
                }
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilter(index)}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
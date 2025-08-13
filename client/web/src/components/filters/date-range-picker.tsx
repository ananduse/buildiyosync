import { useState, useEffect } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addWeeks,
  addMonths,
  subMonths,
  isSameDay,
  getDaysInMonth,
  startOfDay,
  setHours,
  setMinutes,
} from 'date-fns';

interface DateTimeRange {
  startDate?: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
}

interface DateRangePickerProps {
  value?: DateTimeRange;
  onChange: (value: DateTimeRange) => void;
  placeholder?: string;
}

const QUICK_OPTIONS = [
  {
    label: 'Today',
    value: 'today',
    getRange: () => ({ startDate: new Date(), endDate: new Date() }),
  },
  {
    label: 'Later',
    value: 'later',
    getRange: () => ({ startDate: new Date(), endDate: new Date() }),
  },
  {
    label: 'Tomorrow',
    value: 'tomorrow',
    getRange: () => {
      const tomorrow = addDays(new Date(), 1);
      return { startDate: tomorrow, endDate: tomorrow };
    },
  },
  {
    label: 'This weekend',
    value: 'this_weekend',
    getRange: () => {
      const now = new Date();
      const saturday = addDays(startOfWeek(now), 6);
      const sunday = addDays(saturday, 1);
      return { startDate: saturday, endDate: sunday };
    },
  },
  {
    label: 'Next week',
    value: 'next_week',
    getRange: () => {
      const nextWeek = addWeeks(new Date(), 1);
      return { startDate: startOfWeek(nextWeek), endDate: endOfWeek(nextWeek) };
    },
  },
  {
    label: 'Next weekend',
    value: 'next_weekend',
    getRange: () => {
      const nextWeek = addWeeks(new Date(), 1);
      const saturday = addDays(startOfWeek(nextWeek), 6);
      const sunday = addDays(saturday, 1);
      return { startDate: saturday, endDate: sunday };
    },
  },
  {
    label: '2 weeks',
    value: '2_weeks',
    getRange: () => ({
      startDate: new Date(),
      endDate: addWeeks(new Date(), 2),
    }),
  },
  {
    label: '4 weeks',
    value: '4_weeks',
    getRange: () => ({
      startDate: new Date(),
      endDate: addWeeks(new Date(), 4),
    }),
  },
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function TimeInput({ 
  value, 
  onChange, 
  onRemove, 
  placeholder = "Add time",
  variant = "default"
}: { 
  value?: string;
  onChange: (time: string) => void;
  onRemove?: () => void;
  placeholder?: string;
  variant?: "default" | "selected";
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [timeInput, setTimeInput] = useState(value || '');

  const handleTimeChange = (newTime: string) => {
    setTimeInput(newTime);
    onChange(newTime);
  };

  const formatDisplayTime = (time: string) => {
    if (!time) return placeholder;
    // Parse time and format it nicely
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const isPM = hour24 >= 12;
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    return `Today at ${hour12}:${minutes} ${isPM ? 'pm' : 'am'}`;
  };

  if (value && !isEditing) {
    return (
      <div className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs",
        variant === "selected" 
          ? "bg-blue-100 text-blue-900 border border-blue-200" 
          : "bg-gray-200 text-gray-700"
      )}>
        <Clock className="h-2 w-2" />
        <span onClick={() => setIsEditing(true)} className="cursor-pointer text-xs">
          {formatDisplayTime(value)}
        </span>
        {onRemove && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-3 w-3 p-0 hover:bg-transparent ml-0.5"
          >
            <X className="h-2 w-2" />
          </Button>
        )}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="inline-flex items-center">
        <Input
          type="time"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          onBlur={() => {
            handleTimeChange(timeInput);
            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTimeChange(timeInput);
              setIsEditing(false);
            }
          }}
          className="w-16 h-5 text-xs p-1"
          autoFocus
        />
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsEditing(true)}
      className="text-blue-600 h-auto p-0.5 text-xs"
    >
      <Plus className="h-2 w-2 mr-0.5" />
      {placeholder}
    </Button>
  );
}

function Calendar({ 
  selectedDate, 
  endDate,
  onDateSelect, 
  month, 
  onMonthChange,
  selectingEndDate
}: {
  selectedDate?: Date;
  endDate?: Date;
  onDateSelect: (date: Date) => void;
  month: Date;
  onMonthChange: (month: Date) => void;
  selectingEndDate?: boolean;
}) {
  const today = new Date();
  const daysInMonth = getDaysInMonth(month);
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDayOfWeek = firstDayOfMonth.getDay();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month's trailing days
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    calendarDays.push(date);
  }

  return (
    <div className="w-64">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMonthChange(subMonths(month, 1))}
          className="h-6 w-6 p-0"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {MONTHS[month.getMonth()]} {month.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
          >
            Today
            <ChevronRight className="h-2 w-2 ml-1" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMonthChange(addMonths(month, 1))}
          className="h-6 w-6 p-0"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="h-6 flex items-center justify-center text-xs font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-6" />;
          }

          const isStartDate = selectedDate && isSameDay(date, selectedDate);
          const isEndDate = endDate && isSameDay(date, endDate);
          const isInRange = selectedDate && endDate && !isSameDay(selectedDate, endDate) && 
                           date > selectedDate && date < endDate;
          const isToday = isSameDay(date, today);
          const isSelected = isStartDate || isEndDate;

          return (
            <Button
              key={date.toISOString()}
              variant="ghost"
              size="sm"
              onClick={() => onDateSelect(date)}
              className={cn(
                "h-6 w-6 p-0 text-xs font-normal relative",
                isSelected && "bg-blue-600 text-white hover:bg-blue-700 z-10",
                isInRange && "bg-blue-100 text-blue-900 hover:bg-blue-200",
                isToday && !isSelected && !isInRange && "bg-blue-50 text-blue-600 border border-blue-200",
                !isSelected && !isInRange && !isToday && "hover:bg-gray-100",
                selectingEndDate && selectedDate && "hover:bg-blue-50"
              )}
            >
              {date.getDate()}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangePicker({ value, onChange, placeholder = "Select date" }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedQuickOption, setSelectedQuickOption] = useState<string>('');
  const [selectingEndDate, setSelectingEndDate] = useState(false);

  const handleQuickOptionSelect = (option: typeof QUICK_OPTIONS[0]) => {
    const range = option.getRange();
    const newValue = {
      ...value,
      startDate: range.startDate,
      endDate: range.endDate,
    };
    onChange(newValue);
    setSelectedQuickOption(option.value);
    setSelectingEndDate(false);
  };

  const handleDateSelect = (date: Date) => {
    if (!value?.startDate || selectingEndDate) {
      // If no start date or we're selecting end date
      if (selectingEndDate && value?.startDate) {
        // Ensure end date is after start date
        const startDate = value.startDate;
        const endDate = date < startDate ? startDate : date;
        const finalStartDate = date < startDate ? date : startDate;
        
        onChange({
          ...value,
          startDate: finalStartDate,
          endDate: endDate,
        });
        setSelectingEndDate(false);
      } else {
        // Set start date
        onChange({
          ...value,
          startDate: date,
          endDate: date,
        });
        setSelectingEndDate(true);
      }
    } else {
      // We have a start date and are selecting end date
      const startDate = value.startDate;
      if (isSameDay(date, startDate)) {
        // Same date selected, keep as single date
        onChange({
          ...value,
          startDate: date,
          endDate: date,
        });
        setSelectingEndDate(false);
      } else {
        // Different date, create range
        const endDate = date < startDate ? startDate : date;
        const finalStartDate = date < startDate ? date : startDate;
        
        onChange({
          ...value,
          startDate: finalStartDate,
          endDate: endDate,
        });
        setSelectingEndDate(false);
      }
    }
    setSelectedQuickOption('custom');
  };

  const handleStartTimeChange = (time: string) => {
    onChange({
      ...value,
      startTime: time,
    });
  };

  const handleEndTimeChange = (time: string) => {
    onChange({
      ...value,
      endTime: time,
    });
  };

  const removeStartTime = () => {
    const newValue = { ...value };
    delete newValue.startTime;
    onChange(newValue);
  };

  const removeEndTime = () => {
    const newValue = { ...value };
    delete newValue.endTime;
    onChange(newValue);
  };

  const clearSelection = () => {
    onChange({});
    setSelectingEndDate(false);
    setSelectedQuickOption('');
  };

  const formatButtonText = () => {
    if (!value?.startDate) return placeholder;
    
    if (value.startDate && value.endDate && !isSameDay(value.startDate, value.endDate)) {
      return `${format(value.startDate, 'MMM dd')} - ${format(value.endDate, 'MMM dd')}`;
    }
    
    return format(value.startDate, 'MMM dd, yyyy');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{formatButtonText()}</span>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-auto p-0" align="start" side="bottom" sideOffset={8}>
        <div className="flex">
          {/* Left Panel - Quick Options */}
          <div className="w-[160px] p-3 border-r bg-gray-50/50">
            <div className="space-y-1">
              {QUICK_OPTIONS.map((option) => {
                const range = option.getRange();
                const dateText = option.value === 'today' 
                  ? 'Thu'
                  : option.value === 'tomorrow'
                  ? 'Fri'
                  : option.value === 'this_weekend'
                  ? 'Sat'
                  : option.value === 'next_week'
                  ? 'Mon'
                  : option.value === 'next_weekend'
                  ? '23 Aug'
                  : option.value === '2_weeks'
                  ? '28 Aug'
                  : option.value === '4_weeks'
                  ? '11 Sep'
                  : '2:08 am';

                return (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickOptionSelect(option)}
                    className={cn(
                      "w-full justify-between h-auto py-1.5 px-2 text-xs",
                      selectedQuickOption === option.value && "bg-blue-50 text-blue-700"
                    )}
                  >
                    <span className="text-left">
                      <div className="font-medium">{option.label}</div>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {dateText}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Right Panel - Calendar */}
          <div className="p-3">
            {/* Date Selection Status */}
            {selectingEndDate && (
              <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                <div className="text-xs text-blue-700 font-medium">
                  Select end date or click the same date for single day
                </div>
              </div>
            )}
            
            {/* Date Badges at Top */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b min-h-[40px]">
              <div className="flex flex-wrap items-center gap-2">
                {value?.startDate && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md border text-xs">
                    <CalendarIcon className="h-3 w-3 text-gray-600" />
                    <span className="font-medium">
                      {format(value.startDate, 'M/d/yy')}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onChange({ ...value, startDate: undefined, endDate: undefined })}
                      className="h-3 w-3 p-0 hover:bg-transparent ml-1"
                    >
                      <X className="h-2 w-2" />
                    </Button>
                    <div className="ml-1">
                      <TimeInput
                        value={value?.startTime}
                        onChange={handleStartTimeChange}
                        onRemove={value?.startTime ? removeStartTime : undefined}
                        placeholder="Add time"
                      />
                    </div>
                  </div>
                )}
                
                {value?.endDate && value?.startDate && !isSameDay(value.startDate, value.endDate) && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md border text-xs">
                    <CalendarIcon className="h-3 w-3 text-gray-600" />
                    <span className="font-medium">
                      {format(value.endDate, 'M/d/yy')}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onChange({ ...value, endDate: value.startDate })}
                      className="h-3 w-3 p-0 hover:bg-transparent ml-1"
                    >
                      <X className="h-2 w-2" />
                    </Button>
                    <div className="ml-1">
                      <TimeInput
                        value={value?.endTime}
                        onChange={handleEndTimeChange}
                        onRemove={value?.endTime ? removeEndTime : undefined}
                        placeholder="Add time"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {(value?.startDate || value?.endDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="text-xs text-gray-500 hover:text-red-600 p-1"
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Calendar Component */}
            <Calendar
              selectedDate={value?.startDate}
              endDate={value?.endDate}
              onDateSelect={handleDateSelect}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              selectingEndDate={selectingEndDate}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
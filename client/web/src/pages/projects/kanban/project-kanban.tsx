import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Building2,
  Calendar,
  Users,
  DollarSign,
  Clock,
  MapPin,
  MoreVertical,
  Plus,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  Home,
  Building,
  Layers,
  Target,
  TrendingUp,
  Package,
  FileText,
  MessageSquare,
  Paperclip,
  Flag,
  User,
  ChevronDown,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

// Types
interface ProjectCard {
  id: string;
  name: string;
  code: string;
  type: 'residential' | 'commercial' | 'industrial' | 'infrastructure';
  client: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  budget: {
    total: number;
    spent: number;
  };
  timeline: {
    endDate: string;
    daysRemaining: number;
  };
  team: {
    manager: string;
    members: number;
  };
  tasks: {
    completed: number;
    total: number;
  };
  issues: number;
  attachments: number;
  comments: number;
  image?: string;
  sqft: number;
}

interface Column {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  projects: ProjectCard[];
}

// Sortable Project Card Component
function SortableProjectCard({ project, columnId }: { project: ProjectCard; columnId: string }) {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: project.id,
    data: {
      type: 'project',
      project,
      columnId
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return Home;
      case 'commercial': return Building;
      case 'industrial': return Building2;
      case 'infrastructure': return Layers;
      default: return Building2;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const TypeIcon = getTypeIcon(project.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-3"
    >
      <Card className="cursor-move hover:shadow-lg transition-shadow">
        {project.image && (
          <div className="h-32 bg-gray-200 rounded-t-lg overflow-hidden">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          </div>
        )}
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-100 rounded">
                <TypeIcon className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm line-clamp-1">{project.name}</h4>
                <p className="text-xs text-gray-500">{project.code}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem>Assign Team</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Priority and Client */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flag className={cn("h-3 w-3", getPriorityColor(project.priority))} />
              <span className="text-xs text-gray-600">{project.priority}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">{project.client}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">{project.location}</span>
            <Badge variant="outline" className="ml-auto text-xs px-1 py-0">
              {project.sqft.toLocaleString()} sqft
            </Badge>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-1.5" />
          </div>

          {/* Budget */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">
                ₹{(project.budget.spent / 10000000).toFixed(1)}Cr / ₹{(project.budget.total / 10000000).toFixed(1)}Cr
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">
                {new Date(project.timeline.endDate).toLocaleDateString()}
              </span>
            </div>
            <Badge 
              variant={project.timeline.daysRemaining < 30 ? "destructive" : "secondary"}
              className="text-xs px-1 py-0"
            >
              {project.timeline.daysRemaining}d left
            </Badge>
          </div>

          {/* Team and Tasks */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">{project.team.members} members</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">
                {project.tasks.completed}/{project.tasks.total} tasks
              </span>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Footer Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {project.issues > 0 && (
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-gray-600">{project.issues}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">{project.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Paperclip className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">{project.attachments}</span>
              </div>
            </div>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {project.team.manager.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProjectKanban() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial columns with projects
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'planning',
      title: 'Planning',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      projects: [
        {
          id: 'proj-1',
          name: 'Tech Park Complex',
          code: 'TPC-2024-03',
          type: 'commercial',
          client: 'Global Tech Solutions',
          location: 'HITEC City, Hyderabad',
          priority: 'critical',
          progress: 15,
          budget: { total: 250000000, spent: 37500000 },
          timeline: { endDate: '2025-06-30', daysRemaining: 450 },
          team: { manager: 'Vikram Singh', members: 12 },
          tasks: { completed: 42, total: 280 },
          issues: 3,
          attachments: 15,
          comments: 8,
          sqft: 350000
        },
        {
          id: 'proj-2',
          name: 'Luxury Villa Project',
          code: 'LVP-2024-05',
          type: 'residential',
          client: 'Elite Homes',
          location: 'Jubilee Hills, Hyderabad',
          priority: 'medium',
          progress: 5,
          budget: { total: 45000000, spent: 2250000 },
          timeline: { endDate: '2025-03-31', daysRemaining: 380 },
          team: { manager: 'Priya Sharma', members: 8 },
          tasks: { completed: 5, total: 120 },
          issues: 1,
          attachments: 12,
          comments: 4,
          sqft: 25000
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      projects: [
        {
          id: 'proj-3',
          name: 'Skyline Towers - Phase 2',
          code: 'SKY-2024-02',
          type: 'residential',
          client: 'Kumar Developers',
          location: 'Sector 42, Gurgaon',
          priority: 'high',
          progress: 68,
          budget: { total: 85000000, spent: 57800000 },
          timeline: { endDate: '2024-12-31', daysRemaining: 245 },
          team: { manager: 'Amit Sharma', members: 45 },
          tasks: { completed: 98, total: 156 },
          issues: 5,
          attachments: 28,
          comments: 15,
          sqft: 125000
        },
        {
          id: 'proj-4',
          name: 'Green Valley Villas',
          code: 'GVV-2024-01',
          type: 'residential',
          client: 'Green Homes Ltd',
          location: 'Whitefield, Bangalore',
          priority: 'medium',
          progress: 45,
          budget: { total: 45000000, spent: 20250000 },
          timeline: { endDate: '2024-10-31', daysRemaining: 180 },
          team: { manager: 'Sunita Reddy', members: 32 },
          tasks: { completed: 54, total: 120 },
          issues: 2,
          attachments: 18,
          comments: 12,
          sqft: 85000
        },
        {
          id: 'proj-5',
          name: 'Industrial Warehouse',
          code: 'IWH-2024-01',
          type: 'industrial',
          client: 'LogiCorp Industries',
          location: 'MIDC, Pune',
          priority: 'high',
          progress: 52,
          budget: { total: 65000000, spent: 33800000 },
          timeline: { endDate: '2024-11-30', daysRemaining: 210 },
          team: { manager: 'Rajesh Kumar', members: 28 },
          tasks: { completed: 75, total: 145 },
          issues: 4,
          attachments: 22,
          comments: 10,
          sqft: 75000
        }
      ]
    },
    {
      id: 'review',
      title: 'Under Review',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      projects: [
        {
          id: 'proj-6',
          name: 'Office Complex Renovation',
          code: 'OCR-2024-02',
          type: 'commercial',
          client: 'Corporate Solutions',
          location: 'BKC, Mumbai',
          priority: 'medium',
          progress: 85,
          budget: { total: 35000000, spent: 29750000 },
          timeline: { endDate: '2024-08-31', daysRemaining: 120 },
          team: { manager: 'Neha Gupta', members: 22 },
          tasks: { completed: 110, total: 130 },
          issues: 1,
          attachments: 25,
          comments: 18,
          sqft: 45000
        }
      ]
    },
    {
      id: 'on-hold',
      title: 'On Hold',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      projects: [
        {
          id: 'proj-7',
          name: 'Metro Mall Extension',
          code: 'MME-2024-01',
          type: 'commercial',
          client: 'Metro Holdings',
          location: 'Andheri West, Mumbai',
          priority: 'high',
          progress: 72,
          budget: { total: 120000000, spent: 95000000 },
          timeline: { endDate: '2024-08-31', daysRemaining: 120 },
          team: { manager: 'Arun Mehta', members: 58 },
          tasks: { completed: 130, total: 180 },
          issues: 8,
          attachments: 35,
          comments: 22,
          sqft: 180000
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      projects: [
        {
          id: 'proj-8',
          name: 'Riverside Apartments',
          code: 'RSA-2024-02',
          type: 'residential',
          client: 'Sharma Builders',
          location: 'Powai, Mumbai',
          priority: 'low',
          progress: 100,
          budget: { total: 65000000, spent: 63000000 },
          timeline: { endDate: '2024-03-15', daysRemaining: 0 },
          team: { manager: 'Ravi Kumar', members: 38 },
          tasks: { completed: 145, total: 145 },
          issues: 0,
          attachments: 42,
          comments: 28,
          sqft: 95000
        }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data?.current;

    if (!activeData || !overData) return;

    const activeColumnId = activeData.columnId;
    const overColumnId = overData.columnId || over.id;

    if (activeColumnId === overColumnId) {
      // Reordering within the same column
      const columnIndex = columns.findIndex(col => col.id === activeColumnId);
      const column = columns[columnIndex];
      const oldIndex = column.projects.findIndex(p => p.id === active.id);
      const newIndex = column.projects.findIndex(p => p.id === over.id);

      const newColumns = [...columns];
      newColumns[columnIndex] = {
        ...column,
        projects: arrayMove(column.projects, oldIndex, newIndex)
      };
      setColumns(newColumns);
    } else {
      // Moving to a different column
      const sourceColumnIndex = columns.findIndex(col => col.id === activeColumnId);
      const destColumnIndex = columns.findIndex(col => col.id === overColumnId);
      
      const sourceColumn = columns[sourceColumnIndex];
      const destColumn = columns[destColumnIndex];
      
      const projectToMove = sourceColumn.projects.find(p => p.id === active.id);
      
      if (projectToMove) {
        const newColumns = [...columns];
        
        // Remove from source column
        newColumns[sourceColumnIndex] = {
          ...sourceColumn,
          projects: sourceColumn.projects.filter(p => p.id !== active.id)
        };
        
        // Add to destination column
        newColumns[destColumnIndex] = {
          ...destColumn,
          projects: [...destColumn.projects, projectToMove]
        };
        
        setColumns(newColumns);
      }
    }

    setActiveId(null);
  };

  const getActiveProject = () => {
    if (!activeId) return null;
    for (const column of columns) {
      const project = column.projects.find(p => p.id === activeId);
      if (project) return project;
    }
    return null;
  };

  const activeProject = getActiveProject();

  return (
    <div className="p-4">

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-full sm:w-[350px] min-w-[280px]">
              <div className={cn("p-3 rounded-t-lg", column.bgColor)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className={cn("font-semibold", column.color)}>{column.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {column.projects.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-250px)] bg-gray-100/50 rounded-b-lg p-3">
                <SortableContext
                  items={column.projects.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="min-h-[100px]">
                    {column.projects
                      .filter(project => 
                        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.client.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((project) => (
                        <SortableProjectCard
                          key={project.id}
                          project={project}
                          columnId={column.id}
                        />
                      ))}
                  </div>
                </SortableContext>
              </ScrollArea>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeProject && (
            <Card className="cursor-move shadow-xl opacity-90">
              <CardContent className="p-4">
                <h4 className="font-medium">{activeProject.name}</h4>
                <p className="text-sm text-gray-500">{activeProject.code}</p>
              </CardContent>
            </Card>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
import { useState, lazy, Suspense } from 'react';
import { format } from 'date-fns';
import {
  Users,
  DollarSign,
  FileText,
  CheckSquare,
  BarChart3,
  Activity,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  UserPlus,
  UserCheck,
  Shield,
  Award,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  FolderOpen,
  File,
  Image,
  Film,
  FileX,
  Paperclip,
  ExternalLink,
  Copy,
  Share2,
  Printer,
  Archive,
  ChevronRight,
  Building2,
  MapPin,
  Briefcase,
  Target,
  DollarSignIcon,
  CircleDollarSign,
  Receipt,
  CreditCard,
  Wallet,
  Calculator,
  ArrowUp,
  ArrowDown,
  Info,
  HelpCircle,
  Settings,
  ChevronDown,
  Hash,
  Percent,
  Timer,
  Flag,
  GitBranch,
  Zap,
  MessageCircle,
  ThumbsUp,
  Heart,
  ArrowRight,
  Save,
  CheckCircle,
  Palette,
  Home,
  Square,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ProjectCalendar } from './project-calendar';

// Continue with the rest of your imports...
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Lazy load the ProjectDocuments component
const ProjectDocuments = lazy(() =>
  import('../project-documents').then(module => ({
    default: module.ProjectDocuments
  }))
);

// Keep only the essential DetailsTab function
export function DetailsTab({ project }: { project: any }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState<any>(null);

  // Essential project requirements only
  const projectDetails = {
    // Plot Requirements
    plotSize: '12,500 sq ft',
    dimensions: '100 x 125 ft', 
    facing: 'North-East',
    
    // Building Configuration
    floors: '45',
    basements: '3',
    towers: '2',
    totalUnits: '240',
    parkingSpaces: '480',
    
    // Area Distribution
    builtUpArea: '450,000 sq ft',
    carpetArea: '320,000 sq ft',
    
    // Unit Mix
    units: [
      { type: '1 BHK', count: '60', area: '650 sq ft' },
      { type: '2 BHK', count: '80', area: '1,100 sq ft' },
      { type: '3 BHK', count: '60', area: '1,500 sq ft' },
      { type: '4 BHK', count: '30', area: '2,200 sq ft' },
      { type: 'Penthouse', count: '10', area: '3,500 sq ft' }
    ],
    
    // Elevation & Design
    elevationStyle: 'Modern Contemporary',
    exteriorFinish: 'Glass Facade with ACP Cladding',
    buildingHeight: '450 ft',
    
    // Core Specifications
    structureType: 'RCC Frame Structure',
    slabThickness: '150mm - 200mm',
    wallType: 'AAC Blocks',
    
    // Essential Amenities
    amenities: [
      'Swimming Pool',
      'Gymnasium', 
      'Clubhouse',
      'Children\'s Play Area',
      'Parking',
      'Power Backup',
      'Security System'
    ]
  };

  const handleEdit = () => {
    setEditedDetails({ ...projectDetails });
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Here you would save the edited details to your backend
    console.log('Saving details:', editedDetails);
    setIsEditMode(false);
    // Show success message
  };

  const handleCancel = () => {
    setEditedDetails(null);
    setIsEditMode(false);
  };

  const details = editedDetails || projectDetails;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Project Requirements</h2>
        <div className="flex gap-2">
          {!isEditMode ? (
            <>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Plot & Land Requirements */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Plot & Land</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Plot Size</p>
              <p className="font-medium">{details.plotSize}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dimensions</p>
              <p className="font-medium">{details.dimensions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Facing</p>
              <p className="font-medium">{details.facing}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Configuration */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Building Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.floors}</p>
              <p className="text-xs text-gray-500">Floors</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.basements}</p>
              <p className="text-xs text-gray-500">Basements</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.towers}</p>
              <p className="text-xs text-gray-500">Towers</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.totalUnits}</p>
              <p className="text-xs text-gray-500">Total Units</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <p className="text-2xl font-bold">{details.parkingSpaces}</p>
              <p className="text-xs text-gray-500">Parking</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">Built-up Area</p>
              <p className="font-medium">{details.builtUpArea}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Carpet Area</p>
              <p className="font-medium">{details.carpetArea}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unit Mix */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Unit Mix</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Units</TableHead>
                <TableHead>Area</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.units.map((unit: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{unit.type}</TableCell>
                  <TableCell className="text-center">{unit.count}</TableCell>
                  <TableCell>{unit.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Elevation & Design */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Elevation & Design</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Elevation Style</p>
              <p className="font-medium">{details.elevationStyle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exterior Finish</p>
              <p className="font-medium">{details.exteriorFinish}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Building Height</p>
              <p className="font-medium">{details.buildingHeight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Specifications */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Core Specifications</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Structure Type</p>
              <p className="font-medium">{details.structureType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Slab Thickness</p>
              <p className="font-medium">{details.slabThickness}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Wall Type</p>
              <p className="font-medium">{details.wallType}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Essential Amenities */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="py-4 bg-gray-50">
          <CardTitle className="text-base font-medium">Essential Amenities</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            {details.amenities.map((amenity: string, index: number) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
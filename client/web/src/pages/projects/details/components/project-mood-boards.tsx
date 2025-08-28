import { useState } from 'react';
import { 
  Plus, Palette, Image, Package, Layers, Tag, 
  Edit, Trash2, Download, Share2, CheckCircle, 
  XCircle, Clock, Grid3x3, List, Search, Filter 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { MoodBoard, MoodBoardItem, ColorSwatch, MaterialSample } from '@/types/project-details.types';

interface ProjectMoodBoardsProps {
  projectId: string;
  moodBoards?: MoodBoard[];
  onSave?: (moodBoard: MoodBoard) => void;
  onDelete?: (id: string) => void;
}

export default function ProjectMoodBoards({ 
  projectId, 
  moodBoards = [], 
  onSave,
  onDelete 
}: ProjectMoodBoardsProps) {
  const [boards, setBoards] = useState<MoodBoard[]>(moodBoards.length > 0 ? moodBoards : generateSampleBoards());
  const [selectedBoard, setSelectedBoard] = useState<MoodBoard | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  function generateSampleBoards(): MoodBoard[] {
    return [
      {
        id: '1',
        projectId,
        title: 'Living Room Interior',
        description: 'Modern minimalist design with warm tones',
        category: 'interior',
        items: [
          {
            id: 'item1',
            type: 'image',
            imageUrl: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=400',
            thumbnailUrl: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=200',
            title: 'Minimalist Sofa',
            description: 'L-shaped sectional in neutral gray',
            source: 'West Elm',
            productLink: 'https://example.com/sofa',
            price: 45000,
            tags: ['furniture', 'seating', 'living'],
            position: { x: 100, y: 100 },
            size: { width: 200, height: 150 }
          },
          {
            id: 'item2',
            type: 'texture',
            imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
            title: 'Oak Wood Flooring',
            description: 'Wide plank engineered oak',
            tags: ['flooring', 'wood', 'texture'],
            position: { x: 320, y: 100 },
            size: { width: 150, height: 150 }
          }
        ],
        colorPalette: [
          { id: 'c1', name: 'Warm Gray', hexCode: '#8B8680', usage: ['walls', 'furniture'] },
          { id: 'c2', name: 'Soft White', hexCode: '#FAF9F6', usage: ['ceiling', 'trim'] },
          { id: 'c3', name: 'Charcoal', hexCode: '#36454F', usage: ['accent', 'fixtures'] },
          { id: 'c4', name: 'Sand Beige', hexCode: '#C2B280', usage: ['textiles', 'decor'] }
        ],
        materials: [
          {
            id: 'm1',
            name: 'Oak Wood',
            type: 'wood',
            imageUrl: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=200',
            supplier: 'TimberCraft',
            productCode: 'OAK-001',
            price: 250,
            unit: 'sqft',
            availability: 'available'
          },
          {
            id: 'm2',
            name: 'Linen Fabric',
            type: 'fabric',
            imageUrl: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=200',
            supplier: 'TextilePro',
            productCode: 'LIN-445',
            price: 150,
            unit: 'meter',
            availability: 'available'
          }
        ],
        status: 'approved',
        approvedBy: 'Sarah Johnson',
        approvedDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Interior Designer'
      },
      {
        id: '2',
        projectId,
        title: 'Master Bedroom',
        description: 'Cozy and sophisticated bedroom design',
        category: 'interior',
        items: [
          {
            id: 'item3',
            type: 'image',
            imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
            thumbnailUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200',
            title: 'Upholstered Bed',
            description: 'King size bed with tufted headboard',
            source: 'Restoration Hardware',
            tags: ['furniture', 'bedroom', 'bed'],
            position: { x: 50, y: 50 },
            size: { width: 250, height: 200 }
          }
        ],
        colorPalette: [
          { id: 'c5', name: 'Midnight Blue', hexCode: '#191970', usage: ['accent wall'] },
          { id: 'c6', name: 'Cream', hexCode: '#FFFDD0', usage: ['walls', 'bedding'] }
        ],
        materials: [],
        status: 'review',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Interior Designer'
      },
      {
        id: '3',
        projectId,
        title: 'Exterior Facade',
        description: 'Contemporary exterior with natural materials',
        category: 'exterior',
        items: [
          {
            id: 'item4',
            type: 'reference',
            imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
            thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200',
            title: 'Modern Villa Reference',
            description: 'Clean lines with mixed materials',
            tags: ['exterior', 'facade', 'reference'],
            position: { x: 100, y: 100 },
            size: { width: 300, height: 200 }
          }
        ],
        colorPalette: [
          { id: 'c7', name: 'Stone Gray', hexCode: '#928E85', usage: ['cladding'] },
          { id: 'c8', name: 'Wood Brown', hexCode: '#8B4513', usage: ['accents'] }
        ],
        materials: [
          {
            id: 'm3',
            name: 'Natural Stone Cladding',
            type: 'stone',
            imageUrl: 'https://images.unsplash.com/photo-1606594318681-756a5e3e4b5f?w=200',
            supplier: 'StoneWorld',
            productCode: 'NS-234',
            price: 450,
            unit: 'sqft',
            availability: 'order'
          }
        ],
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Architect'
      }
    ];
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Edit className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredBoards = filterCategory === 'all' 
    ? boards 
    : boards.filter(board => board.category === filterCategory);

  const BoardCard = ({ board }: { board: MoodBoard }) => (
    <Card 
      className="group hover:shadow-lg transition-all cursor-pointer"
      onClick={() => setSelectedBoard(board)}
    >
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg bg-gray-100">
        <div className="grid grid-cols-2 gap-1 p-2 h-full">
          {board.items.slice(0, 4).map((item, idx) => (
            <div key={idx} className="relative overflow-hidden rounded bg-white">
              <img 
                src={item.thumbnailUrl || item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={cn("gap-1", getStatusColor(board.status))}>
            {getStatusIcon(board.status)}
            {board.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{board.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{board.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary">{board.category}</Badge>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{board.items.length} items</span>
            <span>•</span>
            <span>{board.colorPalette.length} colors</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {board.colorPalette.slice(0, 5).map((color) => (
              <div
                key={color.id}
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              />
            ))}
            {board.colorPalette.length > 5 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                +{board.colorPalette.length - 5}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Created by {board.createdBy}
          </p>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mood Boards</h2>
          <p className="text-gray-600 mt-1">Design inspiration and material selection</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Board
          </Button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="interior">Interior</SelectItem>
                <SelectItem value="exterior">Exterior</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="color">Color Schemes</SelectItem>
                <SelectItem value="material">Materials</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search boards..." 
              className="pl-9 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mood Boards Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredBoards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBoards.map((board) => (
            <Card key={board.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="grid grid-cols-2 gap-1 w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    {board.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="bg-gray-100">
                        <img 
                          src={item.thumbnailUrl || item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{board.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{board.description}</p>
                      </div>
                      <Badge className={cn("gap-1", getStatusColor(board.status))}>
                        {getStatusIcon(board.status)}
                        {board.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary">{board.category}</Badge>
                      <span className="text-sm text-gray-500">{board.items.length} items</span>
                      <span className="text-sm text-gray-500">{board.colorPalette.length} colors</span>
                      <span className="text-sm text-gray-500">{board.materials.length} materials</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                          {board.colorPalette.slice(0, 8).map((color) => (
                            <div
                              key={color.id}
                              className="w-6 h-6 rounded-full border-2 border-white"
                              style={{ backgroundColor: color.hexCode }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedBoard(board)}
                        >
                          View Board
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Board Dialog */}
      {selectedBoard && (
        <Dialog open={!!selectedBoard} onOpenChange={() => setSelectedBoard(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedBoard.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedBoard.description}</p>
                </div>
                <Badge className={cn("gap-1", getStatusColor(selectedBoard.status))}>
                  {getStatusIcon(selectedBoard.status)}
                  {selectedBoard.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="board" className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="board">Board</TabsTrigger>
                <TabsTrigger value="colors">Colors ({selectedBoard.colorPalette.length})</TabsTrigger>
                <TabsTrigger value="materials">Materials ({selectedBoard.materials.length})</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="board" className="flex-1 overflow-auto">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {selectedBoard.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.type === 'product' && item.price && (
                          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                            ₹{item.price.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        {item.description && (
                          <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="colors" className="flex-1 overflow-auto">
                <div className="grid grid-cols-4 gap-4 p-4">
                  {selectedBoard.colorPalette.map((color) => (
                    <Card key={color.id}>
                      <div 
                        className="h-32 rounded-t-lg"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <CardContent className="p-4">
                        <h4 className="font-medium">{color.name}</h4>
                        <p className="text-sm text-gray-600 font-mono">{color.hexCode}</p>
                        {color.pantone && (
                          <p className="text-sm text-gray-600">Pantone: {color.pantone}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {color.usage.map((use, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="materials" className="flex-1 overflow-auto">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {selectedBoard.materials.map((material) => (
                    <Card key={material.id}>
                      {material.imageUrl && (
                        <div className="h-32 rounded-t-lg overflow-hidden">
                          <img 
                            src={material.imageUrl} 
                            alt={material.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <h4 className="font-medium">{material.name}</h4>
                        <Badge variant="secondary" className="mb-2">{material.type}</Badge>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Supplier: {material.supplier}</p>
                          {material.productCode && <p>Code: {material.productCode}</p>}
                          {material.price && (
                            <p className="font-medium">₹{material.price}/{material.unit}</p>
                          )}
                        </div>
                        <Badge 
                          variant={material.availability === 'available' ? 'default' : 'secondary'}
                          className="mt-2"
                        >
                          {material.availability}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm text-gray-600">Category</Label>
                          <p className="font-medium capitalize">{selectedBoard.category}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Created By</Label>
                          <p className="font-medium">{selectedBoard.createdBy}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Created Date</Label>
                          <p className="font-medium">
                            {new Date(selectedBoard.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Last Updated</Label>
                          <p className="font-medium">
                            {new Date(selectedBoard.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        {selectedBoard.approvedBy && (
                          <>
                            <div>
                              <Label className="text-sm text-gray-600">Approved By</Label>
                              <p className="font-medium">{selectedBoard.approvedBy}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Approved Date</Label>
                              <p className="font-medium">
                                {new Date(selectedBoard.approvedDate!).toLocaleDateString()}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedBoard(null)}>
                Close
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Board
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
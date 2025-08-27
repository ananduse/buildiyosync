import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn, ZoomOut, RotateCw, Move, MousePointer, Ruler, Grid3x3,
  Layers, Eye, EyeOff, Download, Upload, Maximize2, Minimize2,
  Square, Circle, Pen, Type, Eraser, Home, Settings, Info,
  ChevronDown, ChevronRight, Lock, Unlock, Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface CADLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  color: string;
  opacity: number;
  elements: CADElement[];
}

interface CADElement {
  id: string;
  type: 'line' | 'polyline' | 'circle' | 'arc' | 'rectangle' | 'text' | 'dimension' | 'hatch';
  points?: Array<{ x: number; y: number }>;
  center?: { x: number; y: number };
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  width?: number;
  height?: number;
  text?: string;
  style?: {
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    fontSize?: number;
    fontFamily?: string;
    lineType?: 'solid' | 'dashed' | 'dotted' | 'dashdot';
  };
}

interface CADAnnotation {
  id: string;
  type: 'measurement' | 'area' | 'angle' | 'note' | 'cloud' | 'callout';
  points: Array<{ x: number; y: number }>;
  value?: string | number;
  unit?: string;
  text?: string;
  style?: {
    color: string;
    fontSize: number;
    strokeWidth: number;
  };
}

interface CADViewerProps {
  fileUrl?: string;
  layers?: CADLayer[];
  onMeasurement?: (measurement: CADAnnotation) => void;
  onAnnotation?: (annotation: CADAnnotation) => void;
  onExport?: (format: 'pdf' | 'dwg' | 'dxf' | 'png') => void;
}

// Sample CAD data for demonstration
const sampleLayers: CADLayer[] = [
  {
    id: '1',
    name: 'Walls',
    visible: true,
    locked: false,
    color: '#000000',
    opacity: 1,
    elements: [
      {
        id: 'wall1',
        type: 'rectangle',
        points: [{ x: 100, y: 100 }, { x: 500, y: 400 }],
        style: { stroke: '#000000', strokeWidth: 2, fill: 'none' }
      },
      {
        id: 'wall2',
        type: 'line',
        points: [{ x: 300, y: 100 }, { x: 300, y: 400 }],
        style: { stroke: '#000000', strokeWidth: 2 }
      }
    ]
  },
  {
    id: '2',
    name: 'Doors',
    visible: true,
    locked: false,
    color: '#FF0000',
    opacity: 1,
    elements: [
      {
        id: 'door1',
        type: 'arc',
        center: { x: 150, y: 100 },
        radius: 50,
        startAngle: 0,
        endAngle: 90,
        style: { stroke: '#FF0000', strokeWidth: 1, fill: 'none' }
      }
    ]
  },
  {
    id: '3',
    name: 'Windows',
    visible: true,
    locked: false,
    color: '#0000FF',
    opacity: 1,
    elements: [
      {
        id: 'window1',
        type: 'rectangle',
        points: [{ x: 200, y: 100 }, { x: 250, y: 105 }],
        style: { stroke: '#0000FF', strokeWidth: 2, fill: '#87CEEB' }
      }
    ]
  },
  {
    id: '4',
    name: 'Dimensions',
    visible: true,
    locked: true,
    color: '#808080',
    opacity: 0.8,
    elements: [
      {
        id: 'dim1',
        type: 'dimension',
        points: [{ x: 100, y: 80 }, { x: 500, y: 80 }],
        text: "400 mm",
        style: { stroke: '#808080', strokeWidth: 0.5, fontSize: 12 }
      }
    ]
  },
  {
    id: '5',
    name: 'Furniture',
    visible: true,
    locked: false,
    color: '#8B4513',
    opacity: 1,
    elements: [
      {
        id: 'desk1',
        type: 'rectangle',
        points: [{ x: 350, y: 200 }, { x: 450, y: 250 }],
        style: { stroke: '#8B4513', strokeWidth: 1, fill: '#D2691E' }
      },
      {
        id: 'chair1',
        type: 'circle',
        center: { x: 400, y: 280 },
        radius: 20,
        style: { stroke: '#8B4513', strokeWidth: 1, fill: '#DEB887' }
      }
    ]
  }
];

export default function CADViewer({
  fileUrl,
  layers = sampleLayers,
  onMeasurement,
  onAnnotation,
  onExport
}: CADViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [cadLayers, setCadLayers] = useState<CADLayer[]>(layers);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<CADAnnotation[]>([]);
  const [measurementPoints, setMeasurementPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [showProperties, setShowProperties] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 500));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 10));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleResetView = () => {
    setZoom(100);
    setRotation(0);
    setPan({ x: 0, y: 0 });
  };
  
  const toggleLayerVisibility = (layerId: string) => {
    setCadLayers(prev => prev.map(layer =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };
  
  const toggleLayerLock = (layerId: string) => {
    setCadLayers(prev => prev.map(layer =>
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ));
  };
  
  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setCadLayers(prev => prev.map(layer =>
      layer.id === layerId ? { ...layer, opacity } : layer
    ));
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedTool === 'pan') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    } else if (selectedTool === 'measure') {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) * (100 / zoom);
      const y = (e.clientY - rect.top - pan.y) * (100 / zoom);
      
      if (snapToGrid) {
        const snappedX = Math.round(x / gridSize) * gridSize;
        const snappedY = Math.round(y / gridSize) * gridSize;
        setMeasurementPoints(prev => [...prev, { x: snappedX, y: snappedY }]);
      } else {
        setMeasurementPoints(prev => [...prev, { x, y }]);
      }
      
      if (measurementPoints.length === 1) {
        const distance = calculateDistance(measurementPoints[0], { x, y });
        const measurement: CADAnnotation = {
          id: Date.now().toString(),
          type: 'measurement',
          points: [...measurementPoints, { x, y }],
          value: distance,
          unit: 'mm',
          style: { color: '#FF0000', fontSize: 12, strokeWidth: 1 }
        };
        setAnnotations(prev => [...prev, measurement]);
        onMeasurement?.(measurement);
        setMeasurementPoints([]);
      }
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsPanning(false);
  };
  
  const calculateDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  
  const renderElement = (element: CADElement, layer: CADLayer) => {
    const style = {
      ...element.style,
      opacity: layer.opacity,
      stroke: element.style?.stroke || layer.color,
    };
    
    switch (element.type) {
      case 'line':
        if (!element.points || element.points.length < 2) return null;
        return (
          <line
            key={element.id}
            x1={element.points[0].x}
            y1={element.points[0].y}
            x2={element.points[1].x}
            y2={element.points[1].y}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            strokeDasharray={
              style.lineType === 'dashed' ? '5,5' :
              style.lineType === 'dotted' ? '2,2' :
              style.lineType === 'dashdot' ? '10,5,2,5' : undefined
            }
            opacity={style.opacity}
          />
        );
      
      case 'polyline':
        if (!element.points || element.points.length < 2) return null;
        const pathData = element.points.map((p, i) =>
          `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
        ).join(' ');
        return (
          <path
            key={element.id}
            d={pathData}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill || 'none'}
            opacity={style.opacity}
          />
        );
      
      case 'circle':
        if (!element.center || !element.radius) return null;
        return (
          <circle
            key={element.id}
            cx={element.center.x}
            cy={element.center.y}
            r={element.radius}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill || 'none'}
            opacity={style.opacity}
          />
        );
      
      case 'arc':
        if (!element.center || !element.radius || element.startAngle === undefined || element.endAngle === undefined) return null;
        const startRad = (element.startAngle * Math.PI) / 180;
        const endRad = (element.endAngle * Math.PI) / 180;
        const startX = element.center.x + element.radius * Math.cos(startRad);
        const startY = element.center.y + element.radius * Math.sin(startRad);
        const endX = element.center.x + element.radius * Math.cos(endRad);
        const endY = element.center.y + element.radius * Math.sin(endRad);
        const largeArc = Math.abs(element.endAngle - element.startAngle) > 180 ? 1 : 0;
        
        return (
          <path
            key={element.id}
            d={`M ${startX} ${startY} A ${element.radius} ${element.radius} 0 ${largeArc} 1 ${endX} ${endY}`}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill="none"
            opacity={style.opacity}
          />
        );
      
      case 'rectangle':
        if (!element.points || element.points.length < 2) return null;
        const x = Math.min(element.points[0].x, element.points[1].x);
        const y = Math.min(element.points[0].y, element.points[1].y);
        const width = Math.abs(element.points[1].x - element.points[0].x);
        const height = Math.abs(element.points[1].y - element.points[0].y);
        
        return (
          <rect
            key={element.id}
            x={x}
            y={y}
            width={width}
            height={height}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill || 'none'}
            opacity={style.opacity}
          />
        );
      
      case 'text':
        if (!element.points || !element.text) return null;
        return (
          <text
            key={element.id}
            x={element.points[0].x}
            y={element.points[0].y}
            fill={style.stroke}
            fontSize={style.fontSize || 14}
            fontFamily={style.fontFamily || 'Arial'}
            opacity={style.opacity}
          >
            {element.text}
          </text>
        );
      
      case 'dimension':
        if (!element.points || element.points.length < 2 || !element.text) return null;
        const midX = (element.points[0].x + element.points[1].x) / 2;
        const midY = (element.points[0].y + element.points[1].y) / 2;
        
        return (
          <g key={element.id}>
            <line
              x1={element.points[0].x}
              y1={element.points[0].y}
              x2={element.points[1].x}
              y2={element.points[1].y}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              opacity={style.opacity}
            />
            <line
              x1={element.points[0].x}
              y1={element.points[0].y - 5}
              x2={element.points[0].x}
              y2={element.points[0].y + 5}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              opacity={style.opacity}
            />
            <line
              x1={element.points[1].x}
              y1={element.points[1].y - 5}
              x2={element.points[1].x}
              y2={element.points[1].y + 5}
              stroke={style.stroke}
              strokeWidth={style.strokeWidth}
              opacity={style.opacity}
            />
            <text
              x={midX}
              y={midY - 5}
              fill={style.stroke}
              fontSize={style.fontSize || 10}
              textAnchor="middle"
              opacity={style.opacity}
            >
              {element.text}
            </text>
          </g>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex h-full bg-gray-900 text-white">
      {/* Layer Panel */}
      {showLayerPanel && (
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <h3 className="font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Layers
            </h3>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {cadLayers.map(layer => (
              <div
                key={layer.id}
                className={cn(
                  "mb-2 p-2 rounded border",
                  selectedLayer === layer.id
                    ? "bg-blue-900 border-blue-600"
                    : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                )}
                onClick={() => setSelectedLayer(layer.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{layer.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayerVisibility(layer.id);
                      }}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      {layer.visible ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayerLock(layer.id);
                      }}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      {layer.locked ? (
                        <Lock className="h-3 w-3 text-yellow-500" />
                      ) : (
                        <Unlock className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-gray-500"
                    style={{ backgroundColor: layer.color }}
                  />
                  <Slider
                    value={[layer.opacity * 100]}
                    onValueChange={(v) => updateLayerOpacity(layer.id, v[0] / 100)}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-xs text-gray-400 w-8">
                    {Math.round(layer.opacity * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Main Viewer */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* View Tools */}
              <div className="flex items-center gap-1 border-r border-gray-600 pr-2">
                <Button
                  variant={selectedTool === 'select' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTool('select')}
                >
                  <MousePointer className="h-4 w-4" />
                </Button>
                <Button
                  variant={selectedTool === 'pan' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTool('pan')}
                >
                  <Move className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border-r border-gray-600 pr-2">
                <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
                <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleResetView}>
                  <Home className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Measurement Tools */}
              <div className="flex items-center gap-1 border-r border-gray-600 pr-2">
                <Button
                  variant={selectedTool === 'measure' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTool('measure')}
                >
                  <Ruler className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Grid Controls */}
              <div className="flex items-center gap-2 border-r border-gray-600 pr-2">
                <div className="flex items-center gap-1">
                  <Switch
                    checked={showGrid}
                    onCheckedChange={setShowGrid}
                    className="h-4 w-8"
                  />
                  <Label className="text-xs">Grid</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Switch
                    checked={snapToGrid}
                    onCheckedChange={setSnapToGrid}
                    className="h-4 w-8"
                  />
                  <Label className="text-xs">Snap</Label>
                </div>
              </div>
              
              {/* View Options */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLayerPanel(!showLayerPanel)}
                >
                  <Layers className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProperties(!showProperties)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleRotate}>
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div className="space-y-1">
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                      onClick={() => onExport?.('pdf')}
                    >
                      Export as PDF
                    </button>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                      onClick={() => onExport?.('dwg')}
                    >
                      Export as DWG
                    </button>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                      onClick={() => onExport?.('dxf')}
                    >
                      Export as DXF
                    </button>
                    <button
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                      onClick={() => onExport?.('png')}
                    >
                      Export as PNG
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        {/* CAD Canvas */}
        <div
          ref={canvasRef}
          className={cn(
            "flex-1 overflow-hidden relative bg-gray-950",
            selectedTool === 'pan' && "cursor-move",
            selectedTool === 'measure' && "cursor-crosshair"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsPanning(false)}
        >
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            {/* Grid */}
            {showGrid && (
              <defs>
                <pattern
                  id="grid"
                  width={gridSize}
                  height={gridSize}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
            )}
            {showGrid && (
              <rect width="100%" height="100%" fill="url(#grid)" />
            )}
            
            {/* CAD Elements */}
            {cadLayers
              .filter(layer => layer.visible)
              .map(layer =>
                layer.elements.map(element => renderElement(element, layer))
              )}
            
            {/* Annotations */}
            {annotations.map(annotation => (
              <g key={annotation.id}>
                {annotation.type === 'measurement' && annotation.points.length === 2 && (
                  <>
                    <line
                      x1={annotation.points[0].x}
                      y1={annotation.points[0].y}
                      x2={annotation.points[1].x}
                      y2={annotation.points[1].y}
                      stroke={annotation.style?.color || '#FF0000'}
                      strokeWidth={annotation.style?.strokeWidth || 1}
                      strokeDasharray="5,5"
                    />
                    <text
                      x={(annotation.points[0].x + annotation.points[1].x) / 2}
                      y={(annotation.points[0].y + annotation.points[1].y) / 2 - 5}
                      fill={annotation.style?.color || '#FF0000'}
                      fontSize={annotation.style?.fontSize || 12}
                      textAnchor="middle"
                    >
                      {annotation.value?.toFixed(2)} {annotation.unit}
                    </text>
                  </>
                )}
              </g>
            ))}
            
            {/* Active Measurement */}
            {selectedTool === 'measure' && measurementPoints.length === 1 && (
              <circle
                cx={measurementPoints[0].x}
                cy={measurementPoints[0].y}
                r="3"
                fill="#FF0000"
              />
            )}
          </svg>
          
          {/* Coordinates Display */}
          <div className="absolute bottom-2 left-2 bg-gray-800 px-2 py-1 rounded text-xs">
            X: {Math.round(pan.x)} Y: {Math.round(pan.y)} | Zoom: {zoom}% | Rotation: {rotation}°
          </div>
        </div>
      </div>
      
      {/* Properties Panel */}
      {showProperties && selectedLayer && (
        <div className="w-64 bg-gray-800 border-l border-gray-700">
          <div className="p-3 border-b border-gray-700">
            <h3 className="font-semibold flex items-center gap-2">
              <Info className="h-4 w-4" />
              Properties
            </h3>
          </div>
          <div className="p-3 text-sm">
            <div className="mb-3">
              <label className="text-xs text-gray-400">Layer</label>
              <p className="font-medium">
                {cadLayers.find(l => l.id === selectedLayer)?.name}
              </p>
            </div>
            <div className="mb-3">
              <label className="text-xs text-gray-400">Elements</label>
              <p className="font-medium">
                {cadLayers.find(l => l.id === selectedLayer)?.elements.length} objects
              </p>
            </div>
            <div className="mb-3">
              <label className="text-xs text-gray-400">Color</label>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-6 h-6 rounded border border-gray-600"
                  style={{
                    backgroundColor: cadLayers.find(l => l.id === selectedLayer)?.color
                  }}
                />
                <span className="font-mono text-xs">
                  {cadLayers.find(l => l.id === selectedLayer)?.color}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight,
  Highlighter, Type, Square, Circle, ArrowRight, Download,
  Maximize2, Minimize2, FileText, Pen, Eraser, Palette,
  MousePointer, Triangle, Hexagon, Star, Hash, MessageSquare,
  Undo, Redo, Save, Trash2, Copy, Move, Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface Annotation {
  id: string;
  page: number;
  type: 'highlight' | 'text' | 'rectangle' | 'circle' | 'arrow' | 'pen' | 'triangle' | 'hexagon' | 'star' | 'comment';
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: Array<{x: number, y: number}>;
  text?: string;
  color: string;
  strokeWidth?: number;
  fontSize?: number;
  timestamp?: string;
  author?: string;
}

interface EnhancedPDFViewerProps {
  documentUrl?: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onAnnotation?: (annotation: Annotation) => void;
  onAnnotationDelete?: (id: string) => void;
  onAnnotationUpdate?: (id: string, annotation: Partial<Annotation>) => void;
}

const colors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#FFC0CB', '#000000', '#808080', '#FFFFFF'
];

const strokeWidths = [1, 2, 3, 4, 5, 8];

export default function EnhancedPDFViewer({ 
  documentUrl, 
  initialPage = 1,
  onPageChange,
  onAnnotation,
  onAnnotationDelete,
  onAnnotationUpdate
}: EnhancedPDFViewerProps) {
  const printContentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [penPoints, setPenPoints] = useState<Array<{x: number, y: number}>>([]);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [selectedStrokeWidth, setSelectedStrokeWidth] = useState(2);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPos, setTextInputPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<Annotation[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const totalPages = 10; // Simulated page count
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  
  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };
  
  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };
  
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setAnnotations(history[newIndex]);
    }
  };
  
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setAnnotations(history[newIndex]);
    }
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const content = printContentRef.current?.innerHTML || '';
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Document - Page ${currentPage}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none !important; }
              .print-only { display: block !important; }
            }
            body { font-family: Arial, sans-serif; }
            h1 { font-size: 24px; margin-bottom: 20px; }
            .content { max-width: 100%; }
            svg { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <h1>Document - Page ${currentPage} of ${totalPages}</h1>
          <div class="content">${content}</div>
          <script>
            window.onload = function() { 
              window.print(); 
              setTimeout(function() { window.close(); }, 100);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
  
  const addToHistory = (newAnnotations: Annotation[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedTool || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (100 / zoom);
    const y = (e.clientY - rect.top) * (100 / zoom);
    
    if (selectedTool === 'text') {
      setTextInputPos({ x, y });
      setShowTextInput(true);
      return;
    }
    
    if (selectedTool === 'comment') {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        page: currentPage,
        type: 'comment',
        x,
        y,
        width: 200,
        height: 100,
        color: selectedColor,
        text: '',
        timestamp: new Date().toISOString(),
        author: 'Current User'
      };
      const newAnnotations = [...annotations, newAnnotation];
      setAnnotations(newAnnotations);
      addToHistory(newAnnotations);
      onAnnotation?.(newAnnotation);
      return;
    }
    
    setIsDrawing(true);
    setStartPos({ x, y });
    
    if (selectedTool === 'pen') {
      setPenPoints([{ x, y }]);
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (100 / zoom);
    const y = (e.clientY - rect.top) * (100 / zoom);
    
    if (selectedTool === 'pen') {
      setPenPoints(prev => [...prev, { x, y }]);
    } else {
      setCurrentPos({ x, y });
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !selectedTool || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const endX = (e.clientX - rect.left) * (100 / zoom);
    const endY = (e.clientY - rect.top) * (100 / zoom);
    
    let newAnnotation: Annotation | null = null;
    
    if (selectedTool === 'pen' && penPoints.length > 1) {
      newAnnotation = {
        id: Date.now().toString(),
        page: currentPage,
        type: 'pen',
        x: Math.min(...penPoints.map(p => p.x)),
        y: Math.min(...penPoints.map(p => p.y)),
        points: penPoints,
        color: selectedColor,
        strokeWidth: selectedStrokeWidth,
      };
    } else if (Math.abs(endX - startPos.x) > 5 || Math.abs(endY - startPos.y) > 5) {
      const typeMap: Record<string, Annotation['type']> = {
        highlight: 'highlight',
        rectangle: 'rectangle',
        circle: 'circle',
        arrow: 'arrow',
        triangle: 'triangle',
        hexagon: 'hexagon',
        star: 'star',
      };
      
      newAnnotation = {
        id: Date.now().toString(),
        page: currentPage,
        type: typeMap[selectedTool] || 'rectangle',
        x: Math.min(startPos.x, endX),
        y: Math.min(startPos.y, endY),
        width: Math.abs(endX - startPos.x),
        height: Math.abs(endY - startPos.y),
        color: selectedTool === 'highlight' ? `${selectedColor}40` : selectedColor,
        strokeWidth: selectedStrokeWidth,
      };
    }
    
    if (newAnnotation) {
      const newAnnotations = [...annotations, newAnnotation];
      setAnnotations(newAnnotations);
      addToHistory(newAnnotations);
      onAnnotation?.(newAnnotation);
    }
    
    setIsDrawing(false);
    setPenPoints([]);
    setCurrentPos({ x: 0, y: 0 });
  };
  
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        page: currentPage,
        type: 'text',
        x: textInputPos.x,
        y: textInputPos.y,
        text: textInput,
        color: selectedColor,
        fontSize: 14,
      };
      const newAnnotations = [...annotations, newAnnotation];
      setAnnotations(newAnnotations);
      addToHistory(newAnnotations);
      onAnnotation?.(newAnnotation);
    }
    setShowTextInput(false);
    setTextInput('');
  };
  
  const deleteAnnotation = (id: string) => {
    const newAnnotations = annotations.filter(a => a.id !== id);
    setAnnotations(newAnnotations);
    addToHistory(newAnnotations);
    onAnnotationDelete?.(id);
    setSelectedAnnotation(null);
  };
  
  const renderAnnotation = (annotation: Annotation) => {
    switch (annotation.type) {
      case 'highlight':
        return (
          <rect
            x={annotation.x}
            y={annotation.y}
            width={annotation.width}
            height={annotation.height}
            fill={annotation.color}
            opacity={0.3}
          />
        );
      
      case 'rectangle':
        return (
          <rect
            x={annotation.x}
            y={annotation.y}
            width={annotation.width}
            height={annotation.height}
            fill="none"
            stroke={annotation.color}
            strokeWidth={annotation.strokeWidth}
          />
        );
      
      case 'circle':
        return (
          <ellipse
            cx={annotation.x + (annotation.width || 0) / 2}
            cy={annotation.y + (annotation.height || 0) / 2}
            rx={(annotation.width || 0) / 2}
            ry={(annotation.height || 0) / 2}
            fill="none"
            stroke={annotation.color}
            strokeWidth={annotation.strokeWidth}
          />
        );
      
      case 'arrow':
        const arrowEndX = annotation.x + (annotation.width || 0);
        const arrowEndY = annotation.y + (annotation.height || 0);
        return (
          <>
            <line
              x1={annotation.x}
              y1={annotation.y}
              x2={arrowEndX}
              y2={arrowEndY}
              stroke={annotation.color}
              strokeWidth={annotation.strokeWidth}
            />
            <polygon
              points={`${arrowEndX},${arrowEndY} ${arrowEndX - 10},${arrowEndY - 5} ${arrowEndX - 10},${arrowEndY + 5}`}
              fill={annotation.color}
            />
          </>
        );
      
      case 'pen':
        if (!annotation.points || annotation.points.length < 2) return null;
        const pathData = annotation.points.reduce((acc, point, index) => {
          if (index === 0) return `M ${point.x} ${point.y}`;
          return `${acc} L ${point.x} ${point.y}`;
        }, '');
        return (
          <path
            d={pathData}
            fill="none"
            stroke={annotation.color}
            strokeWidth={annotation.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      
      case 'triangle':
        const cx = annotation.x + (annotation.width || 0) / 2;
        const points = [
          `${cx},${annotation.y}`,
          `${annotation.x},${annotation.y + (annotation.height || 0)}`,
          `${annotation.x + (annotation.width || 0)},${annotation.y + (annotation.height || 0)}`
        ].join(' ');
        return (
          <polygon
            points={points}
            fill="none"
            stroke={annotation.color}
            strokeWidth={annotation.strokeWidth}
          />
        );
      
      case 'text':
        return (
          <text
            x={annotation.x}
            y={annotation.y}
            fill={annotation.color}
            fontSize={annotation.fontSize || 14}
            fontFamily="Arial, sans-serif"
          >
            {annotation.text}
          </text>
        );
      
      case 'comment':
        return (
          <g>
            <rect
              x={annotation.x}
              y={annotation.y}
              width={annotation.width || 200}
              height={annotation.height || 100}
              fill="#FFF9C4"
              stroke="#F9A825"
              strokeWidth={1}
              rx={4}
            />
            <text
              x={annotation.x + 10}
              y={annotation.y + 20}
              fontSize={12}
              fill="#333"
            >
              {annotation.author || 'User'}
            </text>
            <text
              x={annotation.x + 10}
              y={annotation.y + 40}
              fontSize={11}
              fill="#666"
            >
              {annotation.text || 'Click to add comment...'}
            </text>
          </g>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Enhanced Toolbar */}
      <div className="bg-white border-b">
        {/* Primary Toolbar */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Page Navigation */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* History Controls */}
            <div className="flex items-center gap-1 border-r pr-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUndo}
                disabled={historyIndex === 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
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
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Annotation Tools Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-t">
          <div className="flex items-center gap-1">
            {/* Selection Tool */}
            <Button
              variant={selectedTool === null ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(null)}
            >
              <MousePointer className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-gray-300 mx-1" />
            
            {/* Drawing Tools */}
            <Button
              variant={selectedTool === 'pen' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'pen' ? null : 'pen')}
            >
              <Pen className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedTool === 'highlight' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'highlight' ? null : 'highlight')}
            >
              <Highlighter className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedTool === 'text' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'text' ? null : 'text')}
            >
              <Type className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-gray-300 mx-1" />
            
            {/* Shape Tools */}
            <Button
              variant={selectedTool === 'rectangle' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'rectangle' ? null : 'rectangle')}
            >
              <Square className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedTool === 'circle' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'circle' ? null : 'circle')}
            >
              <Circle className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedTool === 'triangle' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'triangle' ? null : 'triangle')}
            >
              <Triangle className="h-4 w-4" />
            </Button>
            <Button
              variant={selectedTool === 'arrow' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'arrow' ? null : 'arrow')}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-gray-300 mx-1" />
            
            {/* Comment Tool */}
            <Button
              variant={selectedTool === 'comment' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'comment' ? null : 'comment')}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            
            <div className="w-px h-6 bg-gray-300 mx-1" />
            
            {/* Eraser */}
            <Button
              variant={selectedTool === 'eraser' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                if (selectedAnnotation) {
                  deleteAnnotation(selectedAnnotation);
                }
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Color and Style Controls */}
          <div className="flex items-center gap-2">
            {/* Color Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: selectedColor }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="grid grid-cols-6 gap-1">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded border-2",
                        selectedColor === color ? "border-gray-800" : "border-gray-300"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Stroke Width */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedStrokeWidth}px
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="space-y-1">
                  {strokeWidths.map(width => (
                    <button
                      key={width}
                      className={cn(
                        "w-full px-3 py-1 text-left hover:bg-gray-100 rounded",
                        selectedStrokeWidth === width && "bg-gray-100"
                      )}
                      onClick={() => setSelectedStrokeWidth(width)}
                    >
                      <div
                        className="bg-black rounded"
                        style={{ height: `${width}px` }}
                      />
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      {/* PDF Content Area */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50">
        <div
          ref={canvasRef}
          className={cn(
            "relative mx-auto bg-white shadow-2xl",
            selectedTool && "cursor-crosshair"
          )}
          style={{
            width: `${8.5 * 96}px`,
            minHeight: `${11 * 96}px`,
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: 'top center',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
        >
          {/* Sample PDF Content */}
          <div className="p-8" ref={printContentRef}>
            <h1 className="text-2xl font-bold mb-4">Sample PDF Document - Page {currentPage}</h1>
            <div className="prose max-w-none">
              <p>This is a sample PDF viewer with enhanced annotation capabilities.</p>
              <p>You can use various tools to annotate this document:</p>
              <ul>
                <li>Pen tool for freehand drawing</li>
                <li>Highlighter for text highlighting</li>
                <li>Text tool for adding text annotations</li>
                <li>Shape tools (rectangle, circle, triangle, arrow)</li>
                <li>Comment tool for sticky notes</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>
          
          {/* Annotations Layer */}
          <svg
            ref={svgRef}
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Render existing annotations */}
            {annotations
              .filter(a => a.page === currentPage)
              .map(annotation => (
                <g
                  key={annotation.id}
                  className={cn(
                    selectedAnnotation === annotation.id && "opacity-80"
                  )}
                  onClick={() => setSelectedAnnotation(annotation.id)}
                  style={{ pointerEvents: selectedTool === null ? 'auto' : 'none' }}
                >
                  {renderAnnotation(annotation)}
                </g>
              ))}
            
            {/* Drawing preview */}
            {isDrawing && selectedTool === 'pen' && penPoints.length > 1 && (
              <path
                d={penPoints.reduce((acc, point, index) => {
                  if (index === 0) return `M ${point.x} ${point.y}`;
                  return `${acc} L ${point.x} ${point.y}`;
                }, '')}
                fill="none"
                stroke={selectedColor}
                strokeWidth={selectedStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.6}
              />
            )}
            
            {isDrawing && selectedTool && selectedTool !== 'pen' && currentPos.x !== 0 && (
              <g opacity={0.6}>
                {renderAnnotation({
                  id: 'preview',
                  page: currentPage,
                  type: selectedTool as any,
                  x: Math.min(startPos.x, currentPos.x),
                  y: Math.min(startPos.y, currentPos.y),
                  width: Math.abs(currentPos.x - startPos.x),
                  height: Math.abs(currentPos.y - startPos.y),
                  color: selectedTool === 'highlight' ? `${selectedColor}40` : selectedColor,
                  strokeWidth: selectedStrokeWidth,
                })}
              </g>
            )}
          </svg>
          
          {/* Text Input Modal */}
          {showTextInput && (
            <div
              className="absolute bg-white border-2 border-gray-300 rounded p-2 shadow-lg"
              style={{
                left: `${textInputPos.x}px`,
                top: `${textInputPos.y}px`,
                zIndex: 1000,
              }}
            >
              <Input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTextSubmit();
                  if (e.key === 'Escape') {
                    setShowTextInput(false);
                    setTextInput('');
                  }
                }}
                placeholder="Enter text..."
                autoFocus
                className="min-w-[200px]"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Page Thumbnails */}
      <div className="bg-white border-t p-2">
        <div className="flex gap-2 overflow-x-auto">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={cn(
                "flex-shrink-0 w-20 h-28 border-2 rounded overflow-hidden transition-all",
                currentPage === page
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              )}
              onClick={() => {
                setCurrentPage(page);
                onPageChange?.(page);
              }}
            >
              <div className="h-full bg-white p-1 text-xs">
                <div className="h-full border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                    <span className="text-gray-600">Page {page}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
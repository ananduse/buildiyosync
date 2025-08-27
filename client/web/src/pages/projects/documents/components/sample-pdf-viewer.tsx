import { useState, useRef, useEffect } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight,
  Highlighter, Type, Square, Circle, ArrowRight, Download,
  Maximize2, Minimize2, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Annotation {
  id: string;
  page: number;
  type: 'highlight' | 'text' | 'rectangle' | 'circle' | 'arrow';
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color: string;
}

interface SamplePDFViewerProps {
  documentUrl?: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
  onAnnotation?: (annotation: Annotation) => void;
}

// Sample PDF pages with different content types
const samplePages = [
  {
    id: 1,
    title: 'ARCHITECTURAL FLOOR PLAN - LEVEL 1',
    content: {
      type: 'floorplan',
      elements: [
        { type: 'room', label: 'LOBBY', x: 20, y: 20, width: 150, height: 100 },
        { type: 'room', label: 'OFFICE 101', x: 180, y: 20, width: 100, height: 100 },
        { type: 'room', label: 'CONFERENCE', x: 290, y: 20, width: 120, height: 100 },
        { type: 'room', label: 'RESTROOM', x: 20, y: 130, width: 60, height: 60 },
        { type: 'room', label: 'STORAGE', x: 90, y: 130, width: 60, height: 60 },
        { type: 'room', label: 'OFFICE 102', x: 160, y: 130, width: 100, height: 100 },
        { type: 'room', label: 'OFFICE 103', x: 270, y: 130, width: 100, height: 100 },
        { type: 'room', label: 'BREAK ROOM', x: 380, y: 130, width: 80, height: 100 },
        { type: 'dimension', value: "42'-6\"", x: 20, y: 250 },
        { type: 'dimension', value: "28'-0\"", x: 470, y: 100, vertical: true },
      ],
      notes: [
        '1. ALL DIMENSIONS ARE IN FEET AND INCHES',
        '2. VERIFY ALL DIMENSIONS ON SITE',
        '3. COORDINATE WITH STRUCTURAL DRAWINGS',
      ]
    }
  },
  {
    id: 2,
    title: 'STRUCTURAL DETAILS - FOUNDATION',
    content: {
      type: 'structural',
      elements: [
        { type: 'detail', label: 'SECTION A-A', x: 50, y: 50, width: 180, height: 150 },
        { type: 'detail', label: 'DETAIL 1', x: 250, y: 50, width: 150, height: 150 },
        { type: 'table', label: 'REBAR SCHEDULE', x: 50, y: 220, width: 350, height: 120 },
      ],
      specifications: [
        'CONCRETE: 4000 PSI @ 28 DAYS',
        'REINFORCEMENT: ASTM A615 GRADE 60',
        'COVER: 3" MIN. AT EARTH FACE',
      ]
    }
  },
  {
    id: 3,
    title: 'ELECTRICAL SINGLE LINE DIAGRAM',
    content: {
      type: 'electrical',
      elements: [
        { type: 'panel', label: 'MAIN PANEL', x: 200, y: 30, width: 100, height: 60 },
        { type: 'panel', label: 'SUB PANEL A', x: 100, y: 150, width: 80, height: 50 },
        { type: 'panel', label: 'SUB PANEL B', x: 320, y: 150, width: 80, height: 50 },
        { type: 'line', from: { x: 250, y: 90 }, to: { x: 140, y: 150 } },
        { type: 'line', from: { x: 250, y: 90 }, to: { x: 360, y: 150 } },
      ],
      legend: [
        '━━━ PRIMARY FEEDER',
        '- - - SECONDARY FEEDER',
        '▢ CIRCUIT BREAKER',
      ]
    }
  },
  {
    id: 4,
    title: 'MECHANICAL HVAC LAYOUT',
    content: {
      type: 'mechanical',
      elements: [
        { type: 'equipment', label: 'RTU-1', x: 100, y: 80, size: 60 },
        { type: 'equipment', label: 'RTU-2', x: 300, y: 80, size: 60 },
        { type: 'duct', from: { x: 130, y: 110 }, to: { x: 130, y: 200 }, size: '24x12' },
        { type: 'duct', from: { x: 330, y: 110 }, to: { x: 330, y: 200 }, size: '24x12' },
      ],
      schedule: [
        'RTU-1: 10 TON COOLING / 150 MBH HEATING',
        'RTU-2: 10 TON COOLING / 150 MBH HEATING',
        'SUPPLY AIR: 4000 CFM @ 1.5" SP',
      ]
    }
  },
  {
    id: 5,
    title: 'PLUMBING RISER DIAGRAM',
    content: {
      type: 'plumbing',
      elements: [
        { type: 'riser', label: 'CW RISER', x: 150, y: 50, height: 250 },
        { type: 'riser', label: 'HW RISER', x: 250, y: 50, height: 250 },
        { type: 'riser', label: 'WASTE', x: 350, y: 50, height: 250 },
        { type: 'floor', label: 'LEVEL 3', y: 80 },
        { type: 'floor', label: 'LEVEL 2', y: 150 },
        { type: 'floor', label: 'LEVEL 1', y: 220 },
      ],
      notes: [
        'CW: COLD WATER, 3/4" TYPE L COPPER',
        'HW: HOT WATER, 3/4" TYPE L COPPER',
        'WASTE: 4" PVC SCHEDULE 40',
      ]
    }
  }
];

export default function SamplePDFViewer({ 
  documentUrl, 
  initialPage = 1,
  onPageChange,
  onAnnotation 
}: SamplePDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const totalPages = samplePages.length;
  const currentPageData = samplePages[currentPage - 1];
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
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
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedTool || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);
    
    setIsDrawing(true);
    setStartPos({ x, y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);
    
    setCurrentPos({ x, y });
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !selectedTool || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const endX = (e.clientX - rect.left) / (zoom / 100);
    const endY = (e.clientY - rect.top) / (zoom / 100);
    
    // Only create annotation if there's actual movement
    if (Math.abs(endX - startPos.x) > 5 || Math.abs(endY - startPos.y) > 5) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        page: currentPage,
        type: selectedTool as any,
        x: Math.min(startPos.x, endX),
        y: Math.min(startPos.y, endY),
        width: Math.abs(endX - startPos.x),
        height: Math.abs(endY - startPos.y),
        color: selectedTool === 'highlight' ? '#ffeb3b80' : '#2196f3',
      };
      
      setAnnotations([...annotations, newAnnotation]);
      if (onAnnotation) onAnnotation(newAnnotation);
    }
    
    setIsDrawing(false);
    setCurrentPos({ x: 0, y: 0 });
  };
  
  const renderPageContent = () => {
    const page = currentPageData;
    
    return (
      <div className="relative w-full h-full bg-white p-8" style={{ minHeight: '1056px' }}>
        {/* Page Header */}
        <div className="border-b-2 border-black pb-4 mb-6">
          <h2 className="text-2xl font-bold text-center">{page.title}</h2>
          <div className="flex justify-between mt-2 text-sm">
            <span>PROJECT: BUILDIYO TOWER</span>
            <span>DRAWING NO: {page.id.toString().padStart(3, '0')}-A</span>
            <span>DATE: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="relative h-[500px] border-2 border-gray-300 mb-6">
          {page.content.type === 'floorplan' && (
            <svg className="w-full h-full">
              {/* Draw rooms */}
              {page.content.elements?.filter(e => e.type === 'room').map((room, idx) => (
                <g key={idx}>
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <text
                    x={room.x + (room.width || 0) / 2}
                    y={room.y + (room.height || 0) / 2}
                    textAnchor="middle"
                    fontSize="12"
                    fill="black"
                  >
                    {room.label}
                  </text>
                </g>
              ))}
              
              {/* Draw dimensions */}
              {page.content.elements?.filter(e => e.type === 'dimension').map((dim, idx) => (
                <g key={`dim-${idx}`}>
                  {dim.vertical ? (
                    <>
                      <line x1={dim.x} y1="20" x2={dim.x} y2="240" stroke="black" strokeWidth="0.5" />
                      <text x={dim.x - 20} y="130" fontSize="10" transform={`rotate(-90, ${dim.x - 20}, 130)`}>
                        {dim.value}
                      </text>
                    </>
                  ) : (
                    <>
                      <line x1="20" y1={dim.y} x2="460" y2={dim.y} stroke="black" strokeWidth="0.5" />
                      <text x="240" y={dim.y + 15} textAnchor="middle" fontSize="10">
                        {dim.value}
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>
          )}
          
          {page.content.type === 'structural' && (
            <div className="p-4">
              {page.content.elements?.map((elem, idx) => (
                <div
                  key={idx}
                  className="absolute border-2 border-black flex items-center justify-center font-bold"
                  style={{
                    left: elem.x,
                    top: elem.y,
                    width: elem.width,
                    height: elem.height,
                  }}
                >
                  {elem.label}
                </div>
              ))}
            </div>
          )}
          
          {page.content.type === 'electrical' && (
            <svg className="w-full h-full">
              {/* Draw panels */}
              {page.content.elements?.filter(e => e.type === 'panel').map((panel, idx) => (
                <g key={idx}>
                  <rect
                    x={panel.x}
                    y={panel.y}
                    width={panel.width}
                    height={panel.height}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <text
                    x={panel.x + (panel.width || 0) / 2}
                    y={panel.y + (panel.height || 0) / 2}
                    textAnchor="middle"
                    fontSize="10"
                    fill="black"
                  >
                    {panel.label}
                  </text>
                </g>
              ))}
              
              {/* Draw lines */}
              {page.content.elements?.filter(e => e.type === 'line').map((line, idx) => (
                <line
                  key={`line-${idx}`}
                  x1={line.from?.x}
                  y1={line.from?.y}
                  x2={line.to?.x}
                  y2={line.to?.y}
                  stroke="black"
                  strokeWidth="2"
                />
              ))}
            </svg>
          )}
          
          {/* Render annotations */}
          {annotations
            .filter(a => a.page === currentPage)
            .map(annotation => (
              <div
                key={annotation.id}
                className="absolute pointer-events-none"
                style={{
                  left: annotation.x,
                  top: annotation.y,
                  width: annotation.width,
                  height: annotation.height,
                  backgroundColor: annotation.type === 'highlight' ? annotation.color : 'transparent',
                  border: annotation.type !== 'highlight' ? `2px solid ${annotation.color}` : 'none',
                }}
              />
            ))}
        </div>
        
        {/* Notes/Specifications Section */}
        <div className="border border-gray-300 p-4">
          <h3 className="font-bold mb-2">NOTES:</h3>
          <ul className="text-sm space-y-1">
            {page.content.notes?.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
            {page.content.specifications?.map((spec, idx) => (
              <li key={idx}>{spec}</li>
            ))}
            {page.content.schedule?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          
          {page.content.legend && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">LEGEND:</h3>
              <ul className="text-sm space-y-1">
                {page.content.legend.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Drawing Border */}
        <div className="absolute inset-0 border-4 border-black pointer-events-none" />
        
        {/* Title Block */}
        <div className="absolute bottom-4 right-4 border-2 border-black bg-white p-2 text-xs">
          <table>
            <tbody>
              <tr>
                <td className="pr-2">SCALE:</td>
                <td>1/8" = 1'-0"</td>
              </tr>
              <tr>
                <td className="pr-2">DRAWN BY:</td>
                <td>JD</td>
              </tr>
              <tr>
                <td className="pr-2">CHECKED:</td>
                <td>MS</td>
              </tr>
              <tr>
                <td className="pr-2">REV:</td>
                <td>A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
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
          
          {/* Annotation Tools */}
          <div className="flex items-center gap-1">
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
              variant={selectedTool === 'arrow' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTool(selectedTool === 'arrow' ? null : 'arrow')}
            >
              <ArrowRight className="h-4 w-4" />
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
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* PDF Content Area */}
      <div className="flex-1 overflow-auto p-8 bg-gray-50">
        <div
          ref={canvasRef}
          className={cn(
            "relative mx-auto bg-white shadow-2xl transition-all duration-200",
            selectedTool && "cursor-crosshair"
          )}
          style={{
            width: `${8.5 * 96}px`, // Letter size at 96 DPI
            minHeight: `${11 * 96}px`, // Letter size height
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: 'top center',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDrawing(false)}
        >
          {renderPageContent()}
          
          {/* Drawing Preview */}
          {isDrawing && selectedTool && (
            <div
              className="absolute border-2 pointer-events-none"
              style={{
                left: `${Math.min(startPos.x, currentPos.x)}px`,
                top: `${Math.min(startPos.y, currentPos.y)}px`,
                width: `${Math.abs(currentPos.x - startPos.x)}px`,
                height: `${Math.abs(currentPos.y - startPos.y)}px`,
                borderColor: selectedTool === 'highlight' ? '#ffeb3b' : '#2196f3',
                backgroundColor: selectedTool === 'highlight' ? '#ffeb3b30' : 'transparent',
                borderStyle: 'dashed',
              }}
            />
          )}
          
          {/* Annotations Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {annotations
              .filter(ann => ann.page === currentPage)
              .map(ann => (
                <div
                  key={ann.id}
                  className="absolute border-2"
                  style={{
                    left: `${ann.x}px`,
                    top: `${ann.y}px`,
                    width: ann.width ? `${ann.width}px` : 'auto',
                    height: ann.height ? `${ann.height}px` : 'auto',
                    borderColor: ann.color,
                    backgroundColor: ann.type === 'highlight' ? ann.color : 'transparent',
                    opacity: ann.type === 'highlight' ? 0.3 : 1,
                  }}
                >
                  {ann.text && (
                    <span className="text-xs p-1 bg-yellow-100 text-black">
                      {ann.text}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Page Thumbnails */}
      <div className="bg-white border-t p-2">
        <div className="flex gap-2 overflow-x-auto">
          {samplePages.map((page, idx) => (
            <button
              key={page.id}
              className={cn(
                "flex-shrink-0 w-20 h-28 border-2 rounded overflow-hidden transition-all",
                currentPage === idx + 1
                  ? "border-blue-500 shadow-lg"
                  : "border-gray-300 hover:border-gray-400"
              )}
              onClick={() => {
                const newPage = idx + 1;
                setCurrentPage(newPage);
                onPageChange?.(newPage);
              }}
            >
              <div className="h-full bg-white p-1 text-xs">
                <div className="h-full border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                    <span className="text-gray-600">Page {idx + 1}</span>
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
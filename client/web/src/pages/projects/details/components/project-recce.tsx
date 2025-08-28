import { useState } from 'react';
import { 
  Camera, Video, MapPin, Calendar, User, Cloud, Sun, 
  CloudRain, Wind, Thermometer, Upload, Plus, Edit, 
  Trash2, Eye, Download, Tag, Maximize2, X
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { RecceData, RecceMedia, SiteMeasurement } from '@/types/project-details.types';

interface ProjectRecceProps {
  projectId: string;
  recceData?: RecceData;
  onSave?: (data: RecceData) => void;
}

export default function ProjectRecce({ projectId, recceData, onSave }: ProjectRecceProps) {
  const [isEditing, setIsEditing] = useState(!recceData);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<RecceMedia | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [formData, setFormData] = useState<Partial<RecceData>>(recceData || {
    projectId,
    visitDate: new Date().toISOString().split('T')[0],
    visitedBy: [],
    weatherCondition: '',
    siteAccess: '',
    neighboringStructures: '',
    vegetation: '',
    soilType: '',
    topography: '',
    utilities: {
      electricity: false,
      water: false,
      sewage: false,
      gas: false,
      internet: false
    },
    measurements: [],
    photos: [],
    videos: [],
    observations: '',
    recommendations: '',
    concerns: ''
  });

  const [measurements, setMeasurements] = useState<SiteMeasurement[]>(
    recceData?.measurements || []
  );

  const [photos, setPhotos] = useState<RecceMedia[]>(
    recceData?.photos || generateSamplePhotos()
  );

  const [videos, setVideos] = useState<RecceMedia[]>(
    recceData?.videos || generateSampleVideos()
  );

  function generateSamplePhotos(): RecceMedia[] {
    return [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200',
        caption: 'Site Front View',
        tags: ['entrance', 'front', 'main'],
        location: 'Main Entrance',
        takenAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'John Doe',
        fileSize: 2456789,
        dimensions: { width: 1920, height: 1080 }
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200',
        caption: 'Plot Boundary - East Side',
        tags: ['boundary', 'east', 'perimeter'],
        location: 'East Boundary',
        takenAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'John Doe',
        fileSize: 1987654,
        dimensions: { width: 1920, height: 1080 }
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=200',
        caption: 'Neighboring Buildings',
        tags: ['surroundings', 'context', 'neighbors'],
        location: 'North Side',
        takenAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Sarah Smith',
        fileSize: 3214567,
        dimensions: { width: 1920, height: 1080 }
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=200',
        caption: 'Site Terrain and Vegetation',
        tags: ['terrain', 'vegetation', 'landscape'],
        location: 'Center Plot',
        takenAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Sarah Smith',
        fileSize: 2876543,
        dimensions: { width: 1920, height: 1080 }
      }
    ];
  }

  function generateSampleVideos(): RecceMedia[] {
    return [
      {
        id: 'v1',
        url: 'https://sample-video-url.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=200',
        caption: 'Site Walkthrough',
        tags: ['walkthrough', 'overview', 'complete'],
        location: 'Full Site',
        takenAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Mike Chen',
        fileSize: 45678901,
        duration: 180
      },
      {
        id: 'v2',
        url: 'https://sample-video-url-2.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=200',
        caption: 'Access Road Condition',
        tags: ['access', 'road', 'infrastructure'],
        location: 'Site Entrance',
        takenAt: new Date().toISOString(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Mike Chen',
        fileSize: 23456789,
        duration: 90
      }
    ];
  }

  const handleAddMeasurement = () => {
    const newMeasurement: SiteMeasurement = {
      id: Date.now().toString(),
      label: '',
      value: 0,
      unit: 'ft',
      type: 'length',
      notes: ''
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  const handleUpdateMeasurement = (id: string, field: keyof SiteMeasurement, value: any) => {
    setMeasurements(measurements.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleDeleteMeasurement = (id: string) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const handleSave = () => {
    const completeData: RecceData = {
      id: formData.id || Date.now().toString(),
      projectId,
      visitDate: formData.visitDate || new Date().toISOString(),
      visitedBy: formData.visitedBy || [],
      weatherCondition: formData.weatherCondition || '',
      siteAccess: formData.siteAccess || '',
      neighboringStructures: formData.neighboringStructures || '',
      vegetation: formData.vegetation || '',
      soilType: formData.soilType || '',
      topography: formData.topography || '',
      utilities: formData.utilities || {
        electricity: false,
        water: false,
        sewage: false,
        gas: false,
        internet: false
      },
      measurements,
      photos,
      videos,
      observations: formData.observations || '',
      recommendations: formData.recommendations || '',
      concerns: formData.concerns || '',
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave?.(completeData);
    setIsEditing(false);
  };

  const MediaCard = ({ media, type }: { media: RecceMedia; type: 'photo' | 'video' }) => (
    <Card className="group relative hover:shadow-lg transition-all">
      <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-100">
        <img 
          src={media.thumbnailUrl || media.url} 
          alt={media.caption}
          className="w-full h-full object-cover"
        />
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="bg-white/90 rounded-full p-3">
              <Video className="h-6 w-6" />
            </div>
            {media.duration && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {Math.floor(media.duration / 60)}:{(media.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8"
              onClick={() => {
                setSelectedMedia(media);
                setShowMediaViewer(true);
              }}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <h4 className="font-medium text-sm mb-1">{media.caption}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <MapPin className="h-3 w-3" />
          {media.location}
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {media.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{media.uploadedBy}</span>
          <span>{(media.fileSize / 1024 / 1024).toFixed(1)} MB</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Recce</h2>
          <p className="text-gray-600 mt-1">Site reconnaissance and documentation</p>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Recce
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="notes">Notes & Observations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Visit Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Visit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Visit Date</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{formData.visitDate}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Weather</Label>
                    {isEditing ? (
                      <Select
                        value={formData.weatherCondition}
                        onValueChange={(value) => setFormData({...formData, weatherCondition: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select weather" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunny">Sunny</SelectItem>
                          <SelectItem value="cloudy">Cloudy</SelectItem>
                          <SelectItem value="rainy">Rainy</SelectItem>
                          <SelectItem value="windy">Windy</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <p className="font-medium">{formData.weatherCondition || 'Sunny'}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Visited By</Label>
                  {isEditing ? (
                    <Input
                      placeholder="Enter team members (comma separated)"
                      value={formData.visitedBy?.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData, 
                        visitedBy: e.target.value.split(',').map(s => s.trim())
                      })}
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(formData.visitedBy || ['John Doe', 'Sarah Smith']).map((person, idx) => (
                        <Badge key={idx} variant="secondary">
                          <User className="h-3 w-3 mr-1" />
                          {person}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Site Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Site Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Site Access</Label>
                    {isEditing ? (
                      <Input
                        placeholder="e.g., Good, 20ft wide road"
                        value={formData.siteAccess}
                        onChange={(e) => setFormData({...formData, siteAccess: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{formData.siteAccess || 'Good, 20ft wide road'}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Soil Type</Label>
                    {isEditing ? (
                      <Select
                        value={formData.soilType}
                        onValueChange={(value) => setFormData({...formData, soilType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="loamy">Loamy</SelectItem>
                          <SelectItem value="rocky">Rocky</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="font-medium">{formData.soilType || 'Loamy'}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Topography</Label>
                  {isEditing ? (
                    <Input
                      placeholder="e.g., Flat, Sloped, Undulating"
                      value={formData.topography}
                      onChange={(e) => setFormData({...formData, topography: e.target.value})}
                    />
                  ) : (
                    <p className="font-medium">{formData.topography || 'Flat with slight slope to east'}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Utilities Available */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Utilities Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(formData.utilities || {}).map(([utility, available]) => (
                    <div key={utility} className="flex items-center justify-between">
                      <Label className="capitalize">{utility}</Label>
                      {isEditing ? (
                        <input
                          type="checkbox"
                          checked={available}
                          onChange={(e) => setFormData({
                            ...formData,
                            utilities: {
                              ...formData.utilities,
                              [utility]: e.target.checked
                            }
                          })}
                          className="h-4 w-4"
                        />
                      ) : (
                        <Badge variant={available ? 'default' : 'secondary'}>
                          {available ? 'Available' : 'Not Available'}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Surroundings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Surroundings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Neighboring Structures</Label>
                  {isEditing ? (
                    <Textarea
                      placeholder="Describe neighboring buildings/structures"
                      value={formData.neighboringStructures}
                      onChange={(e) => setFormData({...formData, neighboringStructures: e.target.value})}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm">{formData.neighboringStructures || '2-story residential buildings on north and south sides'}</p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Vegetation</Label>
                  {isEditing ? (
                    <Textarea
                      placeholder="Describe existing vegetation"
                      value={formData.vegetation}
                      onChange={(e) => setFormData({...formData, vegetation: e.target.value})}
                      rows={2}
                    />
                  ) : (
                    <p className="text-sm">{formData.vegetation || 'Few mature trees on the eastern boundary, grass coverage'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Site Photos ({photos.length})</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {photos.map((photo) => (
                <MediaCard key={photo.id} media={photo} type="photo" />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Site Videos ({videos.length})</h3>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Videos
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {videos.map((video) => (
                <MediaCard key={video.id} media={video} type="video" />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="measurements" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Site Measurements</h3>
              {isEditing && (
                <Button onClick={handleAddMeasurement}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Measurement
                </Button>
              )}
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {measurements.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No measurements recorded yet
                    </div>
                  ) : (
                    measurements.map((measurement) => (
                      <div key={measurement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        {isEditing ? (
                          <>
                            <Input
                              placeholder="Label"
                              value={measurement.label}
                              onChange={(e) => handleUpdateMeasurement(measurement.id, 'label', e.target.value)}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              placeholder="Value"
                              value={measurement.value}
                              onChange={(e) => handleUpdateMeasurement(measurement.id, 'value', parseFloat(e.target.value))}
                              className="w-32"
                            />
                            <Select
                              value={measurement.unit}
                              onValueChange={(value) => handleUpdateMeasurement(measurement.id, 'unit', value)}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ft">ft</SelectItem>
                                <SelectItem value="m">m</SelectItem>
                                <SelectItem value="inch">inch</SelectItem>
                                <SelectItem value="cm">cm</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select
                              value={measurement.type}
                              onValueChange={(value) => handleUpdateMeasurement(measurement.id, 'type', value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="length">Length</SelectItem>
                                <SelectItem value="width">Width</SelectItem>
                                <SelectItem value="height">Height</SelectItem>
                                <SelectItem value="area">Area</SelectItem>
                                <SelectItem value="perimeter">Perimeter</SelectItem>
                                <SelectItem value="diagonal">Diagonal</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteMeasurement(measurement.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="flex-1">
                              <p className="font-medium">{measurement.label}</p>
                              <p className="text-sm text-gray-500">{measurement.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">
                                {measurement.value} {measurement.unit}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Observations</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    placeholder="Enter your observations..."
                    value={formData.observations}
                    onChange={(e) => setFormData({...formData, observations: e.target.value})}
                    rows={6}
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {formData.observations || 'The site is well-positioned with good road access. The plot is relatively flat with a slight slope towards the east, which will aid in natural drainage. Existing vegetation includes some mature trees that could be preserved in the design.'}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    placeholder="Enter your recommendations..."
                    value={formData.recommendations}
                    onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
                    rows={6}
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {formData.recommendations || 'Consider preserving the existing trees on the eastern boundary. The natural slope can be utilized for rainwater harvesting. Foundation design should account for the loamy soil condition. Recommend conducting a detailed soil test before finalizing foundation design.'}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                  Concerns & Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    placeholder="Enter any concerns or challenges..."
                    value={formData.concerns}
                    onChange={(e) => setFormData({...formData, concerns: e.target.value})}
                    rows={6}
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {formData.concerns || 'Power lines running across the north-west corner may need to be relocated. The neighboring construction on the south side might affect foundation work timing. Seasonal water logging reported by locals during monsoon needs to be addressed.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Media Viewer Dialog */}
      <Dialog open={showMediaViewer} onOpenChange={setShowMediaViewer}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedMedia?.caption}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <img 
              src={selectedMedia?.url} 
              alt={selectedMedia?.caption}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {selectedMedia?.location}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {selectedMedia?.uploadedBy}
              </span>
            </div>
            <div className="flex gap-2">
              {selectedMedia?.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
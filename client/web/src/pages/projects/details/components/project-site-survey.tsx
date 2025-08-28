import { useState } from 'react';
import { 
  Ruler, MapPin, Camera, Video, FileText, Plus, Edit, Save,
  Trash2, Download, CheckCircle, AlertCircle, Wind, Sun,
  Droplets, Volume2, Building, TreePine, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { 
  SiteSurvey, 
  DetailedMeasurement, 
  LevelData,
  SurveyPhoto,
  SurveyVideo,
  SketchDocument 
} from '@/types/project-details.types';

interface ProjectSiteSurveyProps {
  projectId: string;
  surveyData?: SiteSurvey;
  onSave?: (data: SiteSurvey) => void;
}

export default function ProjectSiteSurvey({ 
  projectId, 
  surveyData, 
  onSave 
}: ProjectSiteSurveyProps) {
  const [isEditing, setIsEditing] = useState(!surveyData);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [formData, setFormData] = useState<Partial<SiteSurvey>>(surveyData || {
    projectId,
    surveyDate: new Date().toISOString().split('T')[0],
    surveyType: 'initial',
    surveyTeam: [
      { id: '1', name: 'John Doe', role: 'surveyor', contact: '+91 98765 43210', email: 'john@example.com' },
      { id: '2', name: 'Sarah Smith', role: 'architect', contact: '+91 98765 43211', email: 'sarah@example.com' }
    ],
    weatherDuringVisit: 'Clear',
    siteCondition: 'dry',
    accessibility: 'good',
    setbacks: { front: 10, rear: 5, left: 5, right: 5 },
    electricityConnection: { available: true, distance: 50, capacity: '10KV' },
    waterSupply: { available: true, source: 'municipal', quality: 'Good' },
    sewerConnection: { available: true, type: 'municipal', distance: 30 },
    sunPath: 'East to West',
    windDirection: 'North-East',
    noiseLevel: 'low',
    trafficCondition: 'Moderate',
    heightRestrictions: 45,
    floorAreaRatio: 2.5,
    groundCoverage: 60
  });

  const [measurements, setMeasurements] = useState<DetailedMeasurement[]>(
    surveyData?.measurements || [
      { id: '1', category: 'boundary', label: 'Plot Length (North)', startPoint: 'NW Corner', endPoint: 'NE Corner', dimension: 60, unit: 'ft', tolerance: 0.5, verified: true },
      { id: '2', category: 'boundary', label: 'Plot Width (West)', startPoint: 'NW Corner', endPoint: 'SW Corner', dimension: 40, unit: 'ft', tolerance: 0.5, verified: true },
      { id: '3', category: 'boundary', label: 'Plot Length (South)', startPoint: 'SW Corner', endPoint: 'SE Corner', dimension: 60, unit: 'ft', tolerance: 0.5, verified: true },
      { id: '4', category: 'boundary', label: 'Plot Width (East)', startPoint: 'SE Corner', endPoint: 'NE Corner', dimension: 40, unit: 'ft', tolerance: 0.5, verified: true }
    ]
  );

  const [levelData, setLevelData] = useState<LevelData[]>(
    surveyData?.levelData || [
      { id: '1', pointName: 'NW Corner', reducedLevel: 100.00, benchmarkReference: 'BM-01', remarks: 'Reference point' },
      { id: '2', pointName: 'NE Corner', reducedLevel: 99.85, benchmarkReference: 'BM-01', remarks: '' },
      { id: '3', pointName: 'SW Corner', reducedLevel: 99.75, benchmarkReference: 'BM-01', remarks: '' },
      { id: '4', pointName: 'SE Corner', reducedLevel: 99.60, benchmarkReference: 'BM-01', remarks: 'Lowest point' },
      { id: '5', pointName: 'Center', reducedLevel: 99.80, benchmarkReference: 'BM-01', remarks: '' }
    ]
  );

  const [photos] = useState<SurveyPhoto[]>(
    surveyData?.photos || [
      { 
        id: '1', 
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200',
        caption: 'Site Front View',
        angle: 'front',
        location: 'Main Road',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=200',
        caption: 'Rear Boundary',
        angle: 'rear',
        location: 'Back Side',
        timestamp: new Date().toISOString()
      }
    ]
  );

  const handleAddMeasurement = () => {
    const newMeasurement: DetailedMeasurement = {
      id: Date.now().toString(),
      category: 'boundary',
      label: '',
      startPoint: '',
      endPoint: '',
      dimension: 0,
      unit: 'ft',
      tolerance: 0,
      verified: false
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  const handleUpdateMeasurement = (id: string, field: keyof DetailedMeasurement, value: any) => {
    setMeasurements(measurements.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleDeleteMeasurement = (id: string) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const handleAddLevelData = () => {
    const newLevel: LevelData = {
      id: Date.now().toString(),
      pointName: '',
      reducedLevel: 0,
      benchmarkReference: 'BM-01',
      remarks: ''
    };
    setLevelData([...levelData, newLevel]);
  };

  const handleUpdateLevelData = (id: string, field: keyof LevelData, value: any) => {
    setLevelData(levelData.map(l => 
      l.id === id ? { ...l, [field]: value } : l
    ));
  };

  const handleDeleteLevelData = (id: string) => {
    setLevelData(levelData.filter(l => l.id !== id));
  };

  const calculateSurveyProgress = () => {
    let progress = 0;
    const checks = [
      measurements.length > 0,
      levelData.length > 0,
      photos.length > 0,
      formData.setbacks,
      formData.electricityConnection,
      formData.waterSupply,
      formData.recommendations,
      formData.surveyorName
    ];
    progress = (checks.filter(Boolean).length / checks.length) * 100;
    return progress;
  };

  const handleSave = () => {
    const completeData: SiteSurvey = {
      id: formData.id || Date.now().toString(),
      projectId,
      surveyDate: formData.surveyDate || new Date().toISOString(),
      surveyType: formData.surveyType || 'initial',
      surveyTeam: formData.surveyTeam || [],
      measurements,
      levelData,
      weatherDuringVisit: formData.weatherDuringVisit || '',
      siteCondition: formData.siteCondition || 'dry',
      accessibility: formData.accessibility || 'good',
      photos: photos,
      videos: [],
      sketches: [],
      existingStructures: formData.existingStructures,
      demolitionRequired: formData.demolitionRequired,
      excavationDepth: formData.excavationDepth,
      backfillingRequired: formData.backfillingRequired,
      electricityConnection: formData.electricityConnection,
      waterSupply: formData.waterSupply,
      sewerConnection: formData.sewerConnection,
      sunPath: formData.sunPath || '',
      windDirection: formData.windDirection || '',
      noiseLevel: formData.noiseLevel || 'low',
      trafficCondition: formData.trafficCondition || '',
      setbacks: formData.setbacks || { front: 0, rear: 0, left: 0, right: 0 },
      heightRestrictions: formData.heightRestrictions,
      floorAreaRatio: formData.floorAreaRatio,
      groundCoverage: formData.groundCoverage,
      recommendations: formData.recommendations || '',
      challenges: formData.challenges || '',
      proposedSolutions: formData.proposedSolutions || '',
      surveyorName: formData.surveyorName || '',
      surveyorSignature: formData.surveyorSignature,
      clientApproval: formData.clientApproval,
      clientSignature: formData.clientSignature,
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSave?.(completeData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Survey</h2>
          <p className="text-gray-600 mt-1">Detailed site measurements and technical data</p>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Survey
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Survey
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <Label>Survey Completion</Label>
            <span className="text-sm font-medium">{calculateSurveyProgress().toFixed(0)}%</span>
          </div>
          <Progress value={calculateSurveyProgress()} className="h-2" />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="levels">Level Data</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="media">Photos & Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Survey Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Survey Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Survey Date</Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={formData.surveyDate}
                        onChange={(e) => setFormData({...formData, surveyDate: e.target.value})}
                      />
                    ) : (
                      <p className="font-medium">{formData.surveyDate}</p>
                    )}
                  </div>
                  <div>
                    <Label>Survey Type</Label>
                    {isEditing ? (
                      <Select
                        value={formData.surveyType}
                        onValueChange={(value) => setFormData({...formData, surveyType: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="initial">Initial Survey</SelectItem>
                          <SelectItem value="progress">Progress Survey</SelectItem>
                          <SelectItem value="final">Final Survey</SelectItem>
                          <SelectItem value="issue">Issue Survey</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="secondary">{formData.surveyType}</Badge>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label>Survey Team</Label>
                  <div className="space-y-2 mt-2">
                    {formData.surveyTeam?.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                        <Badge variant="outline">{member.contact}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Site Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Site Conditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Weather</Label>
                    {isEditing ? (
                      <Input
                        value={formData.weatherDuringVisit}
                        onChange={(e) => setFormData({...formData, weatherDuringVisit: e.target.value})}
                        placeholder="e.g., Clear, Cloudy"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <p className="font-medium">{formData.weatherDuringVisit}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Site Condition</Label>
                    {isEditing ? (
                      <Select
                        value={formData.siteCondition}
                        onValueChange={(value) => setFormData({...formData, siteCondition: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dry">Dry</SelectItem>
                          <SelectItem value="wet">Wet</SelectItem>
                          <SelectItem value="muddy">Muddy</SelectItem>
                          <SelectItem value="rocky">Rocky</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge>{formData.siteCondition}</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Accessibility</Label>
                  {isEditing ? (
                    <Select
                      value={formData.accessibility}
                      onValueChange={(value) => setFormData({...formData, accessibility: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={formData.accessibility === 'good' ? 'default' : 'secondary'}>
                      {formData.accessibility}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Demolition Required</Label>
                    {isEditing ? (
                      <Switch
                        checked={formData.demolitionRequired || false}
                        onCheckedChange={(checked) => setFormData({...formData, demolitionRequired: checked})}
                      />
                    ) : (
                      <Badge variant={formData.demolitionRequired ? 'destructive' : 'secondary'}>
                        {formData.demolitionRequired ? 'Yes' : 'No'}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Backfilling Required</Label>
                    {isEditing ? (
                      <Switch
                        checked={formData.backfillingRequired || false}
                        onCheckedChange={(checked) => setFormData({...formData, backfillingRequired: checked})}
                      />
                    ) : (
                      <Badge variant={formData.backfillingRequired ? 'default' : 'secondary'}>
                        {formData.backfillingRequired ? 'Yes' : 'No'}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Factors */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Environmental Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Sun Path
                    </Label>
                    {isEditing ? (
                      <Input
                        value={formData.sunPath}
                        onChange={(e) => setFormData({...formData, sunPath: e.target.value})}
                        placeholder="e.g., East to West"
                      />
                    ) : (
                      <p className="font-medium mt-1">{formData.sunPath}</p>
                    )}
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Wind className="h-4 w-4" />
                      Wind Direction
                    </Label>
                    {isEditing ? (
                      <Input
                        value={formData.windDirection}
                        onChange={(e) => setFormData({...formData, windDirection: e.target.value})}
                        placeholder="e.g., North-East"
                      />
                    ) : (
                      <p className="font-medium mt-1">{formData.windDirection}</p>
                    )}
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Noise Level
                    </Label>
                    {isEditing ? (
                      <Select
                        value={formData.noiseLevel}
                        onValueChange={(value) => setFormData({...formData, noiseLevel: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={formData.noiseLevel === 'low' ? 'default' : 'secondary'}>
                        {formData.noiseLevel}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label>Traffic Condition</Label>
                    {isEditing ? (
                      <Input
                        value={formData.trafficCondition}
                        onChange={(e) => setFormData({...formData, trafficCondition: e.target.value})}
                        placeholder="e.g., Light, Moderate"
                      />
                    ) : (
                      <p className="font-medium mt-1">{formData.trafficCondition}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="measurements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Detailed Measurements</span>
                {isEditing && (
                  <Button size="sm" onClick={handleAddMeasurement}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Measurement
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>All measurements are in {measurements[0]?.unit || 'ft'}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Start Point</TableHead>
                    <TableHead>End Point</TableHead>
                    <TableHead>Dimension</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Verified</TableHead>
                    {isEditing && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurements.map((measurement) => (
                    <TableRow key={measurement.id}>
                      <TableCell>
                        {isEditing ? (
                          <Select
                            value={measurement.category}
                            onValueChange={(value) => handleUpdateMeasurement(measurement.id, 'category', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="boundary">Boundary</SelectItem>
                              <SelectItem value="structure">Structure</SelectItem>
                              <SelectItem value="room">Room</SelectItem>
                              <SelectItem value="opening">Opening</SelectItem>
                              <SelectItem value="level">Level</SelectItem>
                              <SelectItem value="offset">Offset</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant="outline">{measurement.category}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={measurement.label}
                            onChange={(e) => handleUpdateMeasurement(measurement.id, 'label', e.target.value)}
                            className="w-40"
                          />
                        ) : (
                          measurement.label
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={measurement.startPoint}
                            onChange={(e) => handleUpdateMeasurement(measurement.id, 'startPoint', e.target.value)}
                            className="w-32"
                          />
                        ) : (
                          measurement.startPoint
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={measurement.endPoint}
                            onChange={(e) => handleUpdateMeasurement(measurement.id, 'endPoint', e.target.value)}
                            className="w-32"
                          />
                        ) : (
                          measurement.endPoint
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            value={measurement.dimension}
                            onChange={(e) => handleUpdateMeasurement(measurement.id, 'dimension', parseFloat(e.target.value))}
                            className="w-24"
                          />
                        ) : (
                          <span className="font-medium">{measurement.dimension}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Select
                            value={measurement.unit}
                            onValueChange={(value) => handleUpdateMeasurement(measurement.id, 'unit', value)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ft">ft</SelectItem>
                              <SelectItem value="m">m</SelectItem>
                              <SelectItem value="inch">inch</SelectItem>
                              <SelectItem value="cm">cm</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          measurement.unit
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Switch
                            checked={measurement.verified}
                            onCheckedChange={(checked) => handleUpdateMeasurement(measurement.id, 'verified', checked)}
                          />
                        ) : (
                          measurement.verified && <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteMeasurement(measurement.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="levels" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Level Data</span>
                {isEditing && (
                  <Button size="sm" onClick={handleAddLevelData}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Level Point
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>All levels are relative to benchmark BM-01</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Point Name</TableHead>
                    <TableHead>Reduced Level (m)</TableHead>
                    <TableHead>Benchmark Reference</TableHead>
                    <TableHead>Remarks</TableHead>
                    {isEditing && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {levelData.map((level) => (
                    <TableRow key={level.id}>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={level.pointName}
                            onChange={(e) => handleUpdateLevelData(level.id, 'pointName', e.target.value)}
                          />
                        ) : (
                          <span className="font-medium">{level.pointName}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={level.reducedLevel}
                            onChange={(e) => handleUpdateLevelData(level.id, 'reducedLevel', parseFloat(e.target.value))}
                            className="w-32"
                          />
                        ) : (
                          <span className="font-mono">{level.reducedLevel.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={level.benchmarkReference}
                            onChange={(e) => handleUpdateLevelData(level.id, 'benchmarkReference', e.target.value)}
                          />
                        ) : (
                          level.benchmarkReference
                        )}
                      </TableCell>
                      <TableCell>
                        {isEditing ? (
                          <Input
                            value={level.remarks || ''}
                            onChange={(e) => handleUpdateLevelData(level.id, 'remarks', e.target.value)}
                          />
                        ) : (
                          level.remarks || '-'
                        )}
                      </TableCell>
                      {isEditing && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteLevelData(level.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="utilities" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Electricity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  ⚡ Electricity Connection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Available</Label>
                  {isEditing ? (
                    <Switch
                      checked={formData.electricityConnection?.available}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        electricityConnection: {
                          ...formData.electricityConnection,
                          available: checked
                        } as any
                      })}
                    />
                  ) : (
                    <Badge variant={formData.electricityConnection?.available ? 'default' : 'secondary'}>
                      {formData.electricityConnection?.available ? 'Yes' : 'No'}
                    </Badge>
                  )}
                </div>
                <div>
                  <Label>Distance (m)</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={formData.electricityConnection?.distance}
                      onChange={(e) => setFormData({
                        ...formData,
                        electricityConnection: {
                          ...formData.electricityConnection,
                          distance: parseFloat(e.target.value)
                        } as any
                      })}
                    />
                  ) : (
                    <p className="font-medium">{formData.electricityConnection?.distance}m</p>
                  )}
                </div>
                <div>
                  <Label>Capacity</Label>
                  {isEditing ? (
                    <Input
                      value={formData.electricityConnection?.capacity}
                      onChange={(e) => setFormData({
                        ...formData,
                        electricityConnection: {
                          ...formData.electricityConnection,
                          capacity: e.target.value
                        } as any
                      })}
                    />
                  ) : (
                    <p className="font-medium">{formData.electricityConnection?.capacity}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Water Supply */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Water Supply
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Available</Label>
                  {isEditing ? (
                    <Switch
                      checked={formData.waterSupply?.available}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        waterSupply: {
                          ...formData.waterSupply,
                          available: checked
                        } as any
                      })}
                    />
                  ) : (
                    <Badge variant={formData.waterSupply?.available ? 'default' : 'secondary'}>
                      {formData.waterSupply?.available ? 'Yes' : 'No'}
                    </Badge>
                  )}
                </div>
                <div>
                  <Label>Source</Label>
                  {isEditing ? (
                    <Select
                      value={formData.waterSupply?.source}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        waterSupply: {
                          ...formData.waterSupply,
                          source: value
                        } as any
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="municipal">Municipal</SelectItem>
                        <SelectItem value="borewell">Borewell</SelectItem>
                        <SelectItem value="tanker">Tanker</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="secondary">{formData.waterSupply?.source}</Badge>
                  )}
                </div>
                <div>
                  <Label>Quality</Label>
                  {isEditing ? (
                    <Input
                      value={formData.waterSupply?.quality}
                      onChange={(e) => setFormData({
                        ...formData,
                        waterSupply: {
                          ...formData.waterSupply,
                          quality: e.target.value
                        } as any
                      })}
                    />
                  ) : (
                    <p className="font-medium">{formData.waterSupply?.quality}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Sewer Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🚿 Sewer Connection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Available</Label>
                  {isEditing ? (
                    <Switch
                      checked={formData.sewerConnection?.available}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        sewerConnection: {
                          ...formData.sewerConnection,
                          available: checked
                        } as any
                      })}
                    />
                  ) : (
                    <Badge variant={formData.sewerConnection?.available ? 'default' : 'secondary'}>
                      {formData.sewerConnection?.available ? 'Yes' : 'No'}
                    </Badge>
                  )}
                </div>
                <div>
                  <Label>Type</Label>
                  {isEditing ? (
                    <Select
                      value={formData.sewerConnection?.type}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        sewerConnection: {
                          ...formData.sewerConnection,
                          type: value
                        } as any
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="municipal">Municipal</SelectItem>
                        <SelectItem value="septic">Septic Tank</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="secondary">{formData.sewerConnection?.type}</Badge>
                  )}
                </div>
                <div>
                  <Label>Distance (m)</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={formData.sewerConnection?.distance}
                      onChange={(e) => setFormData({
                        ...formData,
                        sewerConnection: {
                          ...formData.sewerConnection,
                          distance: parseFloat(e.target.value)
                        } as any
                      })}
                    />
                  ) : (
                    <p className="font-medium">{formData.sewerConnection?.distance}m</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Setbacks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Required Setbacks (ft)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Front</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={formData.setbacks?.front}
                        onChange={(e) => setFormData({
                          ...formData,
                          setbacks: {
                            ...formData.setbacks!,
                            front: parseFloat(e.target.value)
                          }
                        })}
                      />
                    ) : (
                      <p className="font-bold text-lg">{formData.setbacks?.front} ft</p>
                    )}
                  </div>
                  <div>
                    <Label>Rear</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={formData.setbacks?.rear}
                        onChange={(e) => setFormData({
                          ...formData,
                          setbacks: {
                            ...formData.setbacks!,
                            rear: parseFloat(e.target.value)
                          }
                        })}
                      />
                    ) : (
                      <p className="font-bold text-lg">{formData.setbacks?.rear} ft</p>
                    )}
                  </div>
                  <div>
                    <Label>Left</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={formData.setbacks?.left}
                        onChange={(e) => setFormData({
                          ...formData,
                          setbacks: {
                            ...formData.setbacks!,
                            left: parseFloat(e.target.value)
                          }
                        })}
                      />
                    ) : (
                      <p className="font-bold text-lg">{formData.setbacks?.left} ft</p>
                    )}
                  </div>
                  <div>
                    <Label>Right</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={formData.setbacks?.right}
                        onChange={(e) => setFormData({
                          ...formData,
                          setbacks: {
                            ...formData.setbacks!,
                            right: parseFloat(e.target.value)
                          }
                        })}
                      />
                    ) : (
                      <p className="font-bold text-lg">{formData.setbacks?.right} ft</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Building Regulations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Building Regulations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Height Restriction (ft)</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={formData.heightRestrictions}
                      onChange={(e) => setFormData({...formData, heightRestrictions: parseFloat(e.target.value)})}
                    />
                  ) : (
                    <p className="font-bold text-lg">{formData.heightRestrictions} ft</p>
                  )}
                </div>
                <div>
                  <Label>Floor Area Ratio (FAR)</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.floorAreaRatio}
                      onChange={(e) => setFormData({...formData, floorAreaRatio: parseFloat(e.target.value)})}
                    />
                  ) : (
                    <p className="font-bold text-lg">{formData.floorAreaRatio}</p>
                  )}
                </div>
                <div>
                  <Label>Ground Coverage (%)</Label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={formData.groundCoverage}
                      onChange={(e) => setFormData({...formData, groundCoverage: parseFloat(e.target.value)})}
                    />
                  ) : (
                    <p className="font-bold text-lg">{formData.groundCoverage}%</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Recommendations</Label>
                {isEditing ? (
                  <Textarea
                    value={formData.recommendations}
                    onChange={(e) => setFormData({...formData, recommendations: e.target.value})}
                    rows={4}
                    placeholder="Enter your recommendations..."
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {formData.recommendations || 'The site is suitable for the proposed construction. Foundation design should account for the slight slope. Consider preserving existing trees where possible.'}
                  </p>
                )}
              </div>
              <div>
                <Label className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-4 w-4" />
                  Challenges
                </Label>
                {isEditing ? (
                  <Textarea
                    value={formData.challenges}
                    onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                    rows={3}
                    placeholder="Enter any challenges..."
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {formData.challenges || 'Slight slope towards the east needs proper drainage design. Adjacent construction may affect work schedule.'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={photo.thumbnailUrl || photo.url} 
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {photo.angle}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <p className="font-medium text-sm">{photo.caption}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <MapPin className="inline h-3 w-3 mr-1" />
                    {photo.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
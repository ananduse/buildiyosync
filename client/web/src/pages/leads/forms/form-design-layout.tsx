import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Palette,
  Layout,
  Type,
  Smartphone,
  Monitor,
  Tablet,
  Sun,
  Moon,
  Image,
  Grid,
  Columns,
  Square,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize,
  Settings,
  Eye,
  Code,
  Layers,
  PaintBucket,
  Sparkles
} from 'lucide-react';

const FormDesignLayout: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#1F2937');
  const [borderRadius, setBorderRadius] = useState(8);
  const [spacing, setSpacing] = useState(16);
  const [fontSize, setFontSize] = useState(14);
  const [darkMode, setDarkMode] = useState(false);
  const [layout, setLayout] = useState('single');
  const [alignment, setAlignment] = useState('left');

  const presetThemes = [
    { name: 'Modern Blue', primary: '#3B82F6', bg: '#FFFFFF', text: '#1F2937' },
    { name: 'Dark Elegant', primary: '#8B5CF6', bg: '#1F2937', text: '#F9FAFB' },
    { name: 'Nature Green', primary: '#10B981', bg: '#F0FDF4', text: '#064E3B' },
    { name: 'Warm Orange', primary: '#F97316', bg: '#FFF7ED', text: '#7C2D12' },
    { name: 'Professional', primary: '#6B7280', bg: '#F9FAFB', text: '#111827' },
    { name: 'Vibrant Pink', primary: '#EC4899', bg: '#FDF2F8', text: '#831843' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Form Design & Layout</h1>
          <p className="text-muted-foreground mt-2">
            Customize the appearance and layout of your forms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Design Controls */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Theme Presets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {presetThemes.map((theme) => (
                    <Button
                      key={theme.name}
                      variant="outline"
                      className="h-auto p-3 flex flex-col items-start"
                      onClick={() => {
                        setPrimaryColor(theme.primary);
                        setBackgroundColor(theme.bg);
                        setTextColor(theme.text);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: theme.bg }}
                        />
                      </div>
                      <span className="text-xs">{theme.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PaintBucket className="h-5 w-5" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm">Primary Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-9"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Background Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-9"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Text Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-16 h-9"
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="#1F2937"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Layout Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">Form Layout</Label>
                  <Select value={layout} onValueChange={setLayout}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">
                        <div className="flex items-center gap-2">
                          <Square className="h-4 w-4" />
                          Single Column
                        </div>
                      </SelectItem>
                      <SelectItem value="two-column">
                        <div className="flex items-center gap-2">
                          <Columns className="h-4 w-4" />
                          Two Columns
                        </div>
                      </SelectItem>
                      <SelectItem value="three-column">
                        <div className="flex items-center gap-2">
                          <Grid className="h-4 w-4" />
                          Three Columns
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm mb-2 block">Alignment</Label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={alignment === 'left' ? 'default' : 'outline'}
                      onClick={() => setAlignment('left')}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={alignment === 'center' ? 'default' : 'outline'}
                      onClick={() => setAlignment('center')}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={alignment === 'right' ? 'default' : 'outline'}
                      onClick={() => setAlignment('right')}
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm mb-2 block">
                    Border Radius: {borderRadius}px
                  </Label>
                  <Slider
                    value={[borderRadius]}
                    onValueChange={(value) => setBorderRadius(value[0])}
                    max={24}
                    step={1}
                  />
                </div>

                <div>
                  <Label className="text-sm mb-2 block">
                    Spacing: {spacing}px
                  </Label>
                  <Slider
                    value={[spacing]}
                    onValueChange={(value) => setSpacing(value[0])}
                    max={32}
                    min={8}
                    step={4}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Dark Mode</Label>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm mb-2 block">
                    Font Size: {fontSize}px
                  </Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={12}
                    max={20}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="open-sans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2">
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg min-h-[500px]"
                  style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    borderRadius: `${borderRadius}px`
                  }}
                >
                  <h2 
                    className="text-2xl font-bold mb-4"
                    style={{ 
                      color: primaryColor,
                      textAlign: alignment as any
                    }}
                  >
                    Sample Form Title
                  </h2>
                  <p 
                    className="mb-6"
                    style={{ 
                      fontSize: `${fontSize}px`,
                      textAlign: alignment as any
                    }}
                  >
                    This is a preview of how your form will look with the current design settings.
                  </p>

                  <div className={`grid gap-4 ${
                    layout === 'three-column' ? 'md:grid-cols-3' :
                    layout === 'two-column' ? 'md:grid-cols-2' :
                    'grid-cols-1'
                  }`} style={{ gap: `${spacing}px` }}>
                    <div>
                      <label className="block mb-2" style={{ fontSize: `${fontSize}px` }}>
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full p-2 border"
                        style={{
                          borderRadius: `${borderRadius}px`,
                          borderColor: primaryColor + '40',
                          fontSize: `${fontSize}px`
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ fontSize: `${fontSize}px` }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 border"
                        style={{
                          borderRadius: `${borderRadius}px`,
                          borderColor: primaryColor + '40',
                          fontSize: `${fontSize}px`
                        }}
                      />
                    </div>
                    <div className={layout === 'single' ? '' : layout === 'two-column' ? 'md:col-span-2' : 'md:col-span-3'}>
                      <label className="block mb-2" style={{ fontSize: `${fontSize}px` }}>
                        Message
                      </label>
                      <textarea
                        placeholder="Enter your message"
                        className="w-full p-2 border"
                        rows={4}
                        style={{
                          borderRadius: `${borderRadius}px`,
                          borderColor: primaryColor + '40',
                          fontSize: `${fontSize}px`
                        }}
                      />
                    </div>
                  </div>

                  <button
                    className="mt-6 px-6 py-2 text-white font-medium"
                    style={{
                      backgroundColor: primaryColor,
                      borderRadius: `${borderRadius}px`,
                      fontSize: `${fontSize}px`
                    }}
                  >
                    Submit Form
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  CSS Export
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`/* Form Styles */
.form-container {
  background-color: ${backgroundColor};
  color: ${textColor};
  border-radius: ${borderRadius}px;
  padding: ${spacing}px;
}

.form-title {
  color: ${primaryColor};
  text-align: ${alignment};
}

.form-input {
  font-size: ${fontSize}px;
  border-radius: ${borderRadius}px;
  border-color: ${primaryColor}40;
}

.form-button {
  background-color: ${primaryColor};
  border-radius: ${borderRadius}px;
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDesignLayout;
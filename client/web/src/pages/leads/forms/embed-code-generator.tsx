import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Code,
  Copy,
  Download,
  Eye,
  ExternalLink,
  Palette,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Share,
  QrCode,
  Link,
  Mail,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  FileText,
  Braces,
  Layout,
  Zap,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface EmbedSettings {
  formId: string;
  embedType: 'inline' | 'popup' | 'slide-in' | 'fullscreen';
  theme: 'default' | 'modern' | 'minimal' | 'custom';
  primaryColor: string;
  backgroundColor: string;
  borderRadius: number;
  showBranding: boolean;
  autoResize: boolean;
  triggerSettings?: {
    trigger: 'button' | 'scroll' | 'exit-intent' | 'time-delay';
    buttonText?: string;
    scrollPercentage?: number;
    timeDelay?: number;
  };
  customization: {
    width: string;
    height: string;
    padding: number;
    shadow: boolean;
    animation: 'none' | 'fade' | 'slide' | 'scale';
  };
  tracking: {
    googleAnalytics: boolean;
    facebookPixel: boolean;
    customEvents: boolean;
  };
}

const EmbedCodeGenerator: React.FC = () => {
  const [settings, setSettings] = useState<EmbedSettings>({
    formId: 'form_123456',
    embedType: 'inline',
    theme: 'modern',
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    showBranding: true,
    autoResize: true,
    triggerSettings: {
      trigger: 'button',
      buttonText: 'Get Quote',
      scrollPercentage: 50,
      timeDelay: 5
    },
    customization: {
      width: '100%',
      height: 'auto',
      padding: 20,
      shadow: true,
      animation: 'fade'
    },
    tracking: {
      googleAnalytics: true,
      facebookPixel: false,
      customEvents: true
    }
  });

  const [selectedTab, setSelectedTab] = useState('preview');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [codeType, setCodeType] = useState<'html' | 'react' | 'vue' | 'angular'>('html');

  const generateInlineEmbedCode = () => {
    const config = {
      formId: settings.formId,
      theme: settings.theme,
      primaryColor: settings.primaryColor,
      backgroundColor: settings.backgroundColor,
      borderRadius: settings.borderRadius,
      showBranding: settings.showBranding,
      autoResize: settings.autoResize,
      width: settings.customization.width,
      height: settings.customization.height,
      padding: settings.customization.padding,
      shadow: settings.customization.shadow,
      animation: settings.customization.animation,
      tracking: settings.tracking
    };

    switch (codeType) {
      case 'html':
        return `<!-- Buildiyo Form Embed -->
<div id="buildiyo-form-${settings.formId}"></div>
<script>
  (function() {
    var config = ${JSON.stringify(config, null, 2)};
    var script = document.createElement('script');
    script.src = 'https://cdn.buildiyo.com/embed/v1/form.js';
    script.onload = function() {
      BuildiyoForm.init('buildiyo-form-${settings.formId}', config);
    };
    document.head.appendChild(script);
  })();
</script>`;

      case 'react':
        return `import React, { useEffect, useRef } from 'react';

const BuildiyoForm = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const config = ${JSON.stringify(config, null, 2)};
    
    const script = document.createElement('script');
    script.src = 'https://cdn.buildiyo.com/embed/v1/form.js';
    script.onload = () => {
      window.BuildiyoForm.init(containerRef.current, config);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (window.BuildiyoForm) {
        window.BuildiyoForm.destroy('${settings.formId}');
      }
    };
  }, []);

  return <div ref={containerRef} id="buildiyo-form-${settings.formId}" />;
};

export default BuildiyoForm;`;

      case 'vue':
        return `<template>
  <div ref="formContainer" id="buildiyo-form-${settings.formId}"></div>
</template>

<script>
export default {
  name: 'BuildiyoForm',
  mounted() {
    const config = ${JSON.stringify(config, null, 2)};
    
    const script = document.createElement('script');
    script.src = 'https://cdn.buildiyo.com/embed/v1/form.js';
    script.onload = () => {
      window.BuildiyoForm.init(this.$refs.formContainer, config);
    };
    document.head.appendChild(script);
  },
  beforeUnmount() {
    if (window.BuildiyoForm) {
      window.BuildiyoForm.destroy('${settings.formId}');
    }
  }
}
</script>`;

      case 'angular':
        return `import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buildiyo-form',
  template: '<div #formContainer id="buildiyo-form-${settings.formId}"></div>'
})
export class BuildiyoFormComponent implements OnInit, OnDestroy {
  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;

  ngOnInit() {
    const config = ${JSON.stringify(config, null, 2)};
    
    const script = document.createElement('script');
    script.src = 'https://cdn.buildiyo.com/embed/v1/form.js';
    script.onload = () => {
      (window as any).BuildiyoForm.init(this.formContainer.nativeElement, config);
    };
    document.head.appendChild(script);
  }

  ngOnDestroy() {
    if ((window as any).BuildiyoForm) {
      (window as any).BuildiyoForm.destroy('${settings.formId}');
    }
  }
}`;

      default:
        return '';
    }
  };

  const generatePopupEmbedCode = () => {
    const config = {
      ...settings,
      trigger: settings.triggerSettings?.trigger,
      buttonText: settings.triggerSettings?.buttonText,
      scrollPercentage: settings.triggerSettings?.scrollPercentage,
      timeDelay: settings.triggerSettings?.timeDelay
    };

    return `<!-- Buildiyo Popup Form -->
<script>
  (function() {
    var config = ${JSON.stringify(config, null, 2)};
    var script = document.createElement('script');
    script.src = 'https://cdn.buildiyo.com/embed/v1/popup.js';
    script.onload = function() {
      BuildiyoPopup.init(config);
    };
    document.head.appendChild(script);
  })();
</script>

${settings.triggerSettings?.trigger === 'button' ? `
<!-- Trigger Button -->
<button onclick="BuildiyoPopup.show('${settings.formId}')">
  ${settings.triggerSettings.buttonText || 'Get Quote'}
</button>` : ''}`;
  };

  const generateShareableLink = () => {
    const params = new URLSearchParams({
      theme: settings.theme,
      color: settings.primaryColor.replace('#', ''),
      bg: settings.backgroundColor.replace('#', ''),
      radius: settings.borderRadius.toString(),
      branding: settings.showBranding.toString()
    });
    
    return `https://forms.buildiyo.com/${settings.formId}?${params.toString()}`;
  };

  const generateQRCode = () => {
    // In a real implementation, you would generate an actual QR code
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateShareableLink())}`;
  };

  const getEmbedCode = () => {
    switch (settings.embedType) {
      case 'popup':
      case 'slide-in':
        return generatePopupEmbedCode();
      default:
        return generateInlineEmbedCode();
    }
  };

  const platformSnippets = {
    wordpress: `1. Install the "Custom HTML" plugin (if not already installed)
2. Add a new Custom HTML block in your post/page
3. Paste the embed code in the HTML content
4. Publish or update your page`,

    shopify: `1. Go to Online Store > Themes in your Shopify admin
2. Click "Actions" > "Edit code" for your active theme
3. Open the template where you want to add the form
4. Paste the embed code where you want the form to appear
5. Save the file`,

    webflow: `1. Open your Webflow project in the Designer
2. Drag an "Embed" element to where you want the form
3. Paste the embed code in the embed settings
4. Publish your site`,

    squarespace: `1. Edit the page where you want to add the form
2. Add a "Code Block" from the content panel
3. Paste the embed code in the code block
4. Save and publish your page`,

    wix: `1. Open your Wix site editor
2. Click "Add" > "More" > "HTML iFrame"
3. Select "HTML Code" and paste the embed code
4. Adjust the size and position as needed
5. Publish your site`
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Embed Code Generator</h1>
            <p className="text-muted-foreground mt-2">
              Generate and customize embed codes for your forms
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Settings Panel */}
          <div className="col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Embed Settings</CardTitle>
                <CardDescription>Configure how your form will appear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Form ID</Label>
                  <Input
                    value={settings.formId}
                    onChange={(e) => setSettings({ ...settings, formId: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Embed Type</Label>
                  <Select
                    value={settings.embedType}
                    onValueChange={(value) => setSettings({ ...settings, embedType: value as any })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inline">Inline Form</SelectItem>
                      <SelectItem value="popup">Popup Modal</SelectItem>
                      <SelectItem value="slide-in">Slide-in Form</SelectItem>
                      <SelectItem value="fullscreen">Fullscreen Overlay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => setSettings({ ...settings, theme: value as any })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Primary Color</Label>
                    <Input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="mt-1 h-10"
                    />
                  </div>
                  <div>
                    <Label>Background</Label>
                    <Input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                      className="mt-1 h-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Border Radius: {settings.borderRadius}px</Label>
                  <Slider
                    value={[settings.borderRadius]}
                    onValueChange={(value) => setSettings({ ...settings, borderRadius: value[0] })}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Buildiyo Branding</Label>
                  <Switch
                    checked={settings.showBranding}
                    onCheckedChange={(checked) => setSettings({ ...settings, showBranding: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Auto Resize</Label>
                  <Switch
                    checked={settings.autoResize}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoResize: checked })}
                  />
                </div>

                {(settings.embedType === 'popup' || settings.embedType === 'slide-in') && (
                  <div className="space-y-3 pt-3 border-t">
                    <h4 className="font-medium">Trigger Settings</h4>
                    
                    <div>
                      <Label>Trigger Type</Label>
                      <Select
                        value={settings.triggerSettings?.trigger}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          triggerSettings: { ...settings.triggerSettings!, trigger: value as any }
                        })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="button">Button Click</SelectItem>
                          <SelectItem value="scroll">Scroll Percentage</SelectItem>
                          <SelectItem value="exit-intent">Exit Intent</SelectItem>
                          <SelectItem value="time-delay">Time Delay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {settings.triggerSettings?.trigger === 'button' && (
                      <div>
                        <Label>Button Text</Label>
                        <Input
                          value={settings.triggerSettings.buttonText}
                          onChange={(e) => setSettings({
                            ...settings,
                            triggerSettings: { ...settings.triggerSettings!, buttonText: e.target.value }
                          })}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {settings.triggerSettings?.trigger === 'scroll' && (
                      <div>
                        <Label>Scroll Percentage: {settings.triggerSettings.scrollPercentage}%</Label>
                        <Slider
                          value={[settings.triggerSettings.scrollPercentage || 50]}
                          onValueChange={(value) => setSettings({
                            ...settings,
                            triggerSettings: { ...settings.triggerSettings!, scrollPercentage: value[0] }
                          })}
                          max={100}
                          step={5}
                          className="mt-2"
                        />
                      </div>
                    )}

                    {settings.triggerSettings?.trigger === 'time-delay' && (
                      <div>
                        <Label>Delay (seconds): {settings.triggerSettings.timeDelay}s</Label>
                        <Slider
                          value={[settings.triggerSettings.timeDelay || 5]}
                          onValueChange={(value) => setSettings({
                            ...settings,
                            triggerSettings: { ...settings.triggerSettings!, timeDelay: value[0] }
                          })}
                          max={60}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3 pt-3 border-t">
                  <h4 className="font-medium">Customization</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Width</Label>
                      <Input
                        value={settings.customization.width}
                        onChange={(e) => setSettings({
                          ...settings,
                          customization: { ...settings.customization, width: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Height</Label>
                      <Input
                        value={settings.customization.height}
                        onChange={(e) => setSettings({
                          ...settings,
                          customization: { ...settings.customization, height: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Padding: {settings.customization.padding}px</Label>
                    <Slider
                      value={[settings.customization.padding]}
                      onValueChange={(value) => setSettings({
                        ...settings,
                        customization: { ...settings.customization, padding: value[0] }
                      })}
                      max={50}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Drop Shadow</Label>
                    <Switch
                      checked={settings.customization.shadow}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        customization: { ...settings.customization, shadow: checked }
                      })}
                    />
                  </div>

                  <div>
                    <Label>Animation</Label>
                    <Select
                      value={settings.customization.animation}
                      onValueChange={(value) => setSettings({
                        ...settings,
                        customization: { ...settings.customization, animation: value as any }
                      })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="fade">Fade</SelectItem>
                        <SelectItem value="slide">Slide</SelectItem>
                        <SelectItem value="scale">Scale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t">
                  <h4 className="font-medium">Tracking</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label>Google Analytics</Label>
                    <Switch
                      checked={settings.tracking.googleAnalytics}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        tracking: { ...settings.tracking, googleAnalytics: checked }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Facebook Pixel</Label>
                    <Switch
                      checked={settings.tracking.facebookPixel}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        tracking: { ...settings.tracking, facebookPixel: checked }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Custom Events</Label>
                    <Switch
                      checked={settings.tracking.customEvents}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        tracking: { ...settings.tracking, customEvents: checked }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-8">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Embed Code</TabsTrigger>
                <TabsTrigger value="share">Share & QR</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>See how your form will look</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={previewMode === 'desktop' ? 'default' : 'outline'}
                          onClick={() => setPreviewMode('desktop')}
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={previewMode === 'tablet' ? 'default' : 'outline'}
                          onClick={() => setPreviewMode('tablet')}
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={previewMode === 'mobile' ? 'default' : 'outline'}
                          onClick={() => setPreviewMode('mobile')}
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`mx-auto bg-white rounded-lg p-6 ${
                      previewMode === 'mobile' ? 'max-w-sm' : 
                      previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-4xl'
                    } ${settings.customization.shadow ? 'shadow-lg' : 'border'}`}
                    style={{
                      backgroundColor: settings.backgroundColor,
                      borderRadius: `${settings.borderRadius}px`,
                      padding: `${settings.customization.padding}px`
                    }}>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold" style={{ color: settings.primaryColor }}>
                            Lead Capture Form
                          </h2>
                          <p className="text-gray-600">Get started with your project today</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name</Label>
                            <Input placeholder="Enter your name" className="mt-1" />
                          </div>
                          <div>
                            <Label>Email Address</Label>
                            <Input type="email" placeholder="Enter your email" className="mt-1" />
                          </div>
                        </div>

                        <div>
                          <Label>Company Name</Label>
                          <Input placeholder="Enter company name" className="mt-1" />
                        </div>

                        <div>
                          <Label>Project Details</Label>
                          <Textarea placeholder="Tell us about your project..." className="mt-1" />
                        </div>

                        <Button 
                          className="w-full" 
                          style={{ backgroundColor: settings.primaryColor }}
                        >
                          Submit Form
                        </Button>

                        {settings.showBranding && (
                          <div className="text-center">
                            <p className="text-xs text-gray-500">
                              Powered by <span className="font-semibold">Buildiyo</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {settings.embedType === 'popup' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Popup Preview</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          This form will appear as a popup when triggered by {settings.triggerSettings?.trigger} on your website.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Embed Code</CardTitle>
                        <CardDescription>Copy and paste this code into your website</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={codeType} onValueChange={(value) => setCodeType(value as any)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="react">React</SelectItem>
                            <SelectItem value="vue">Vue.js</SelectItem>
                            <SelectItem value="angular">Angular</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={() => navigator.clipboard.writeText(getEmbedCode())}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Code
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto max-h-96">
                      <code>{getEmbedCode()}</code>
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Installation Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">1</div>
                          <h3 className="font-medium">Copy the Code</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Copy the embed code above for your framework
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">2</div>
                          <h3 className="font-medium">Paste in Website</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add the code where you want the form to appear
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-600 text-white text-sm flex items-center justify-center">3</div>
                          <h3 className="font-medium">Go Live</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Publish your site and start collecting leads
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="share" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Link className="h-5 w-5 mr-2" />
                        Shareable Link
                      </CardTitle>
                      <CardDescription>Direct link to your form</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Form URL</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            value={generateShareableLink()}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigator.clipboard.writeText(generateShareableLink())}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          SMS
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Facebook className="h-3 w-3 mr-1" />
                          Facebook
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Twitter className="h-3 w-3 mr-1" />
                          Twitter
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <QrCode className="h-5 w-5 mr-2" />
                        QR Code
                      </CardTitle>
                      <CardDescription>For easy mobile access</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        <img
                          src={generateQRCode()}
                          alt="QR Code"
                          className="w-48 h-48 border rounded-lg"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download PNG
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download SVG
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(platformSnippets).map(([platform, instructions]) => (
                    <Card key={platform}>
                      <CardHeader>
                        <CardTitle className="capitalize">{platform}</CardTitle>
                        <CardDescription>
                          How to add the form to your {platform} site
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-sm whitespace-pre-line text-muted-foreground">
                          {instructions}
                        </pre>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;
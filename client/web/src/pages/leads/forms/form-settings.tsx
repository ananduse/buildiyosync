import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  Shield,
  Bell,
  Globe,
  Clock,
  Users,
  Mail,
  MessageSquare,
  Link,
  Database,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  Save,
  RefreshCw,
  Key,
  FileText,
  Languages,
  Smartphone
} from 'lucide-react';

const FormSettings: React.FC = () => {
  const [autoSave, setAutoSave] = useState(true);
  const [captchaEnabled, setCaptchaEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [saveProgress, setSaveProgress] = useState(true);
  const [ipTracking, setIpTracking] = useState(false);
  const [gdprCompliant, setGdprCompliant] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Form Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure form behavior, security, and integrations
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential form details and configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Form Name</Label>
                    <Input placeholder="Contact Form" className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">Internal name for identification</p>
                  </div>
                  <div>
                    <Label>Form ID</Label>
                    <Input value="form-12345" disabled className="mt-1" />
                    <p className="text-xs text-gray-500 mt-1">Unique identifier</p>
                  </div>
                </div>

                <div>
                  <Label>Form Title</Label>
                  <Input placeholder="Get in Touch" className="mt-1" />
                  <p className="text-xs text-gray-500 mt-1">Displayed to users</p>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="We'd love to hear from you. Fill out the form below and we'll get back to you soon."
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Help text shown to users</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Form Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Active
                          </div>
                        </SelectItem>
                        <SelectItem value="draft">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-600" />
                            Draft
                          </div>
                        </SelectItem>
                        <SelectItem value="paused">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-600" />
                            Paused
                          </div>
                        </SelectItem>
                        <SelectItem value="archived">
                          <div className="flex items-center gap-2">
                            <EyeOff className="h-4 w-4 text-red-600" />
                            Archived
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Actions</CardTitle>
                <CardDescription>
                  What happens after successful form submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Success Message</Label>
                  <Textarea
                    placeholder="Thank you for your submission! We'll be in touch soon."
                    className="mt-1"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Redirect URL (Optional)</Label>
                  <Input 
                    placeholder="https://example.com/thank-you"
                    className="mt-1"
                    type="url"
                  />
                  <p className="text-xs text-gray-500 mt-1">Redirect users after submission</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Confirmation Page</Label>
                    <p className="text-sm text-gray-500">Display a custom confirmation page</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Protect your form from spam and abuse
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>CAPTCHA Protection</Label>
                    <p className="text-sm text-gray-500">Require CAPTCHA verification</p>
                  </div>
                  <Switch
                    checked={captchaEnabled}
                    onCheckedChange={setCaptchaEnabled}
                  />
                </div>

                {captchaEnabled && (
                  <div className="ml-4 p-4 bg-gray-50 rounded-lg space-y-3">
                    <div>
                      <Label>CAPTCHA Provider</Label>
                      <Select defaultValue="recaptcha">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recaptcha">Google reCAPTCHA v3</SelectItem>
                          <SelectItem value="hcaptcha">hCaptcha</SelectItem>
                          <SelectItem value="cloudflare">Cloudflare Turnstile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Site Key</Label>
                      <Input placeholder="Your CAPTCHA site key" className="mt-1" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Honeypot Field</Label>
                    <p className="text-sm text-gray-500">Hidden field to catch bots</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rate Limiting</Label>
                    <p className="text-sm text-gray-500">Limit submissions per IP</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SSL Only</Label>
                    <p className="text-sm text-gray-500">Require HTTPS for submissions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Tracking</Label>
                    <p className="text-sm text-gray-500">Record submitter IP addresses</p>
                  </div>
                  <Switch
                    checked={ipTracking}
                    onCheckedChange={setIpTracking}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Privacy</CardTitle>
                <CardDescription>
                  Compliance and data protection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>GDPR Compliance</Label>
                    <p className="text-sm text-gray-500">Enable GDPR features</p>
                  </div>
                  <Switch
                    checked={gdprCompliant}
                    onCheckedChange={setGdprCompliant}
                  />
                </div>

                {gdprCompliant && (
                  <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label>Consent Checkbox</Label>
                      <Switch defaultChecked />
                    </div>
                    <div>
                      <Label>Consent Text</Label>
                      <Textarea
                        defaultValue="I agree to the processing of my personal data in accordance with the Privacy Policy"
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Privacy Policy URL</Label>
                      <Input 
                        placeholder="https://example.com/privacy-policy"
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Retention</Label>
                    <p className="text-sm text-gray-500">Auto-delete old submissions</p>
                  </div>
                  <Select defaultValue="90">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
                <CardDescription>
                  Configure email alerts for form submissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send emails on form submission</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                {emailNotifications && (
                  <div className="space-y-4">
                    <div>
                      <Label>Recipient Email(s)</Label>
                      <Input 
                        placeholder="admin@example.com, team@example.com"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Comma-separated for multiple</p>
                    </div>

                    <div>
                      <Label>Email Subject</Label>
                      <Input 
                        defaultValue="New Form Submission: {form_name}"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Reply-To Address</Label>
                      <Input 
                        placeholder="{email_field}"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Use form field variables</p>
                    </div>

                    <div>
                      <Label>Email Template</Label>
                      <Select defaultValue="default">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default Template</SelectItem>
                          <SelectItem value="detailed">Detailed Template</SelectItem>
                          <SelectItem value="minimal">Minimal Template</SelectItem>
                          <SelectItem value="custom">Custom HTML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Auto-Response</CardTitle>
                <CardDescription>
                  Send automatic confirmation emails to submitters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Auto-Response</Label>
                    <p className="text-sm text-gray-500">Send confirmation to users</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Form Behavior</CardTitle>
                <CardDescription>
                  Control how your form functions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Save Progress</Label>
                    <p className="text-sm text-gray-500">Save user input automatically</p>
                  </div>
                  <Switch
                    checked={saveProgress}
                    onCheckedChange={setSaveProgress}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Save & Resume</Label>
                    <p className="text-sm text-gray-500">Users can save and continue later</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Progress Bar</Label>
                    <p className="text-sm text-gray-500">Display completion progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Keyboard Navigation</Label>
                    <p className="text-sm text-gray-500">Tab through fields</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Smart Field Order</Label>
                    <p className="text-sm text-gray-500">Optimize tab order</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submission Limits</CardTitle>
                <CardDescription>
                  Control form submission restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Limit Total Submissions</Label>
                    <p className="text-sm text-gray-500">Set maximum submissions</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>One Submission Per User</Label>
                    <p className="text-sm text-gray-500">Prevent duplicate submissions</p>
                  </div>
                  <Switch />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="datetime-local" className="mt-1" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="datetime-local" className="mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Third-Party Integrations
                </CardTitle>
                <CardDescription>
                  Connect your form to external services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Webhook</p>
                        <p className="text-sm text-gray-500">Send data to custom endpoint</p>
                      </div>
                    </div>
                    <Button size="sm">Configure</Button>
                  </div>

                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Mailchimp</p>
                        <p className="text-sm text-gray-500">Add to email list</p>
                      </div>
                    </div>
                    <Badge variant="outline">Connected</Badge>
                  </div>

                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">HubSpot CRM</p>
                        <p className="text-sm text-gray-500">Create contacts automatically</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>

                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-sm text-gray-500">Send notifications to channel</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>
                  Technical configuration and developer options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Custom CSS</Label>
                  <Textarea
                    placeholder=".form-container { /* your styles */ }"
                    className="mt-1 font-mono text-sm"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Custom JavaScript</Label>
                  <Textarea
                    placeholder="// Your custom form logic"
                    className="mt-1 font-mono text-sm"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Form Endpoint</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value="https://api.example.com/forms/submit/form-12345"
                      disabled
                    />
                    <Button size="sm" variant="outline">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-gray-500">Enable console logging</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Save Settings</Label>
                    <p className="text-sm text-gray-500">Save changes automatically</p>
                  </div>
                  <Switch
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormSettings;
'use client';

import { useState, useMemo } from 'react';
import { Search, Database, Shield, CheckCircle, XCircle, AlertCircle, RefreshCw, Download, Upload, Settings, Plus, Edit, Trash2, Filter, Eye, Mail, Phone, Building, Globe, MapPin, User, Star, TrendingUp, BarChart3, Zap, Target, Clock, FileText, Link, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

interface LeadEnrichment {
  id: string;
  leadId: string;
  leadName: string;
  leadEmail: string;
  enrichmentType: 'contact' | 'company' | 'social' | 'technology' | 'intent' | 'firmographic';
  status: 'pending' | 'completed' | 'failed' | 'partial';
  source: 'clearbit' | 'zoominfo' | 'apollo' | 'linkedin' | 'builtin' | 'manual';
  requestedAt: string;
  completedAt?: string;
  confidence: number;
  dataPoints: {
    field: string;
    oldValue: string | null;
    newValue: string;
    confidence: number;
    source: string;
    verified: boolean;
  }[];
  cost: number;
  autoApproved: boolean;
  reviewedBy?: string;
}

interface LeadVerification {
  id: string;
  leadId: string;
  verificationType: 'email' | 'phone' | 'address' | 'company' | 'all';
  status: 'pending' | 'verified' | 'invalid' | 'risky' | 'unknown';
  confidence: number;
  method: 'api' | 'manual' | 'automated';
  results: {
    email?: {
      deliverable: boolean;
      valid: boolean;
      risky: boolean;
      reason: string;
      lastVerified: string;
    };
    phone?: {
      valid: boolean;
      type: 'mobile' | 'landline' | 'voip' | 'unknown';
      carrier: string;
      country: string;
      lastVerified: string;
    };
    company?: {
      exists: boolean;
      domain: string;
      employees: number;
      revenue: string;
      industry: string;
      lastVerified: string;
    };
    address?: {
      valid: boolean;
      formatted: string;
      coordinates: { lat: number; lng: number };
      lastVerified: string;
    };
  };
  cost: number;
  verifiedAt: string;
}

interface DataSource {
  id: string;
  name: string;
  type: 'enrichment' | 'verification' | 'intent' | 'social';
  provider: string;
  description: string;
  coverage: string;
  accuracy: number;
  costPerRecord: number;
  fields: string[];
  isActive: boolean;
  apiKey?: string;
  rateLimits: {
    requests: number;
    period: 'minute' | 'hour' | 'day' | 'month';
  };
  usage: {
    thisMonth: number;
    limit: number;
    cost: number;
  };
}

interface LeadTool {
  id: string;
  name: string;
  category: 'enrichment' | 'verification' | 'analysis' | 'automation';
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
  usageCount: number;
  successRate: number;
  averageCost: number;
  lastUsed?: string;
}

const mockEnrichments: LeadEnrichment[] = [
  {
    id: '1',
    leadId: 'lead-1',
    leadName: 'John Smith',
    leadEmail: 'john@acme.com',
    enrichmentType: 'company',
    status: 'completed',
    source: 'clearbit',
    requestedAt: '2024-03-20T10:00:00Z',
    completedAt: '2024-03-20T10:05:00Z',
    confidence: 95,
    dataPoints: [
      {
        field: 'Company Size',
        oldValue: null,
        newValue: '500-1000 employees',
        confidence: 95,
        source: 'clearbit',
        verified: true
      },
      {
        field: 'Industry',
        oldValue: 'Technology',
        newValue: 'SaaS - Enterprise Software',
        confidence: 90,
        source: 'clearbit',
        verified: true
      },
      {
        field: 'Annual Revenue',
        oldValue: null,
        newValue: '$50M - $100M',
        confidence: 85,
        source: 'clearbit',
        verified: false
      },
      {
        field: 'LinkedIn URL',
        oldValue: null,
        newValue: 'https://linkedin.com/company/acme-corp',
        confidence: 100,
        source: 'clearbit',
        verified: true
      }
    ],
    cost: 2.50,
    autoApproved: true
  },
  {
    id: '2',
    leadId: 'lead-2',
    leadName: 'Sarah Davis',
    leadEmail: 'sarah@techstart.com',
    enrichmentType: 'contact',
    status: 'partial',
    source: 'apollo',
    requestedAt: '2024-03-20T14:30:00Z',
    completedAt: '2024-03-20T14:35:00Z',
    confidence: 75,
    dataPoints: [
      {
        field: 'Phone Number',
        oldValue: null,
        newValue: '+1-555-0123',
        confidence: 80,
        source: 'apollo',
        verified: false
      },
      {
        field: 'Job Title',
        oldValue: 'Manager',
        newValue: 'VP of Engineering',
        confidence: 85,
        source: 'apollo',
        verified: true
      },
      {
        field: 'LinkedIn Profile',
        oldValue: null,
        newValue: 'https://linkedin.com/in/sarah-davis-tech',
        confidence: 95,
        source: 'apollo',
        verified: true
      }
    ],
    cost: 1.75,
    autoApproved: false,
    reviewedBy: 'manager@company.com'
  }
];

const mockVerifications: LeadVerification[] = [
  {
    id: '1',
    leadId: 'lead-1',
    verificationType: 'email',
    status: 'verified',
    confidence: 95,
    method: 'api',
    results: {
      email: {
        deliverable: true,
        valid: true,
        risky: false,
        reason: 'Valid mailbox, accepts emails',
        lastVerified: '2024-03-20T10:15:00Z'
      }
    },
    cost: 0.10,
    verifiedAt: '2024-03-20T10:15:00Z'
  },
  {
    id: '2',
    leadId: 'lead-2',
    verificationType: 'phone',
    status: 'invalid',
    confidence: 90,
    method: 'api',
    results: {
      phone: {
        valid: false,
        type: 'unknown',
        carrier: 'N/A',
        country: 'US',
        lastVerified: '2024-03-20T14:40:00Z'
      }
    },
    cost: 0.15,
    verifiedAt: '2024-03-20T14:40:00Z'
  }
];

const mockDataSources: DataSource[] = [
  {
    id: '1',
    name: 'Clearbit Enrichment API',
    type: 'enrichment',
    provider: 'Clearbit',
    description: 'Company and contact data enrichment with high accuracy',
    coverage: '15M+ companies, 100M+ contacts',
    accuracy: 95,
    costPerRecord: 2.50,
    fields: ['Company Size', 'Revenue', 'Industry', 'Location', 'Social Profiles', 'Contact Details'],
    isActive: true,
    rateLimits: {
      requests: 100,
      period: 'hour'
    },
    usage: {
      thisMonth: 1250,
      limit: 5000,
      cost: 3125.00
    }
  },
  {
    id: '2',
    name: 'ZeroBounce Email Verification',
    type: 'verification',
    provider: 'ZeroBounce',
    description: 'Email deliverability and validation service',
    coverage: 'Global email validation',
    accuracy: 98,
    costPerRecord: 0.10,
    fields: ['Email Validity', 'Deliverability', 'Risk Assessment', 'Mailbox Type'],
    isActive: true,
    rateLimits: {
      requests: 1000,
      period: 'hour'
    },
    usage: {
      thisMonth: 8950,
      limit: 25000,
      cost: 895.00
    }
  },
  {
    id: '3',
    name: 'Apollo Contact Database',
    type: 'enrichment',
    provider: 'Apollo',
    description: 'B2B contact and company data platform',
    coverage: '265M+ contacts, 60M+ companies',
    accuracy: 88,
    costPerRecord: 1.75,
    fields: ['Contact Info', 'Job Details', 'Social Profiles', 'Company Info', 'Technologies'],
    isActive: true,
    rateLimits: {
      requests: 200,
      period: 'hour'
    },
    usage: {
      thisMonth: 2100,
      limit: 10000,
      cost: 3675.00
    }
  }
];

const mockLeadTools: LeadTool[] = [
  {
    id: '1',
    name: 'Smart Lead Enrichment',
    category: 'enrichment',
    description: 'Automatically enrich leads with company and contact data from multiple sources',
    icon: 'database',
    features: ['Multi-source enrichment', 'Confidence scoring', 'Auto-approval rules', 'Bulk processing'],
    isActive: true,
    usageCount: 1847,
    successRate: 87,
    averageCost: 2.15,
    lastUsed: '2024-03-20T15:30:00Z'
  },
  {
    id: '2',
    name: 'Email & Phone Validator',
    category: 'verification',
    description: 'Validate email addresses and phone numbers to ensure data quality',
    icon: 'shield',
    features: ['Real-time validation', 'Risk assessment', 'Batch verification', 'API integration'],
    isActive: true,
    usageCount: 3421,
    successRate: 94,
    averageCost: 0.12,
    lastUsed: '2024-03-20T14:45:00Z'
  },
  {
    id: '3',
    name: 'Lead Intent Analyzer',
    category: 'analysis',
    description: 'Analyze lead behavior and intent signals to prioritize prospects',
    icon: 'target',
    features: ['Intent scoring', 'Behavior tracking', 'Buying signals', 'Predictive analytics'],
    isActive: true,
    usageCount: 892,
    successRate: 78,
    averageCost: 1.50,
    lastUsed: '2024-03-20T12:20:00Z'
  },
  {
    id: '4',
    name: 'Lead Deduplication',
    category: 'analysis',
    description: 'Identify and merge duplicate leads to maintain clean data',
    icon: 'search',
    features: ['Fuzzy matching', 'Merge suggestions', 'Batch processing', 'Custom rules'],
    isActive: true,
    usageCount: 234,
    successRate: 91,
    averageCost: 0.05,
    lastUsed: '2024-03-19T16:10:00Z'
  },
  {
    id: '5',
    name: 'Social Profile Finder',
    category: 'enrichment',
    description: 'Find and link social media profiles for better lead understanding',
    icon: 'link',
    features: ['LinkedIn matching', 'Twitter profiles', 'Facebook pages', 'Profile verification'],
    isActive: true,
    usageCount: 1156,
    successRate: 73,
    averageCost: 0.75,
    lastUsed: '2024-03-20T11:15:00Z'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  verified: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  invalid: 'bg-red-100 text-red-800 border-red-200',
  partial: 'bg-orange-100 text-orange-800 border-orange-200',
  risky: 'bg-orange-100 text-orange-800 border-orange-200',
  unknown: 'bg-gray-100 text-gray-800 border-gray-200'
};

const typeColors = {
  contact: 'bg-blue-100 text-blue-800 border-blue-200',
  company: 'bg-purple-100 text-purple-800 border-purple-200',
  social: 'bg-pink-100 text-pink-800 border-pink-200',
  technology: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  intent: 'bg-orange-100 text-orange-800 border-orange-200',
  firmographic: 'bg-green-100 text-green-800 border-green-200',
  email: 'bg-blue-100 text-blue-800 border-blue-200',
  phone: 'bg-green-100 text-green-800 border-green-200',
  address: 'bg-purple-100 text-purple-800 border-purple-200',
  all: 'bg-gray-100 text-gray-800 border-gray-200'
};

const categoryColors = {
  enrichment: 'bg-blue-100 text-blue-800 border-blue-200',
  verification: 'bg-green-100 text-green-800 border-green-200',
  analysis: 'bg-purple-100 text-purple-800 border-purple-200',
  automation: 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function LeadTools() {
  const [selectedTab, setSelectedTab] = useState('enrichment');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedEnrichment, setSelectedEnrichment] = useState<LeadEnrichment | null>(null);
  const [selectedTool, setSelectedTool] = useState<LeadTool | null>(null);
  const [isEnrichDialogOpen, setIsEnrichDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);

  const filteredEnrichments = useMemo(() => {
    return mockEnrichments.filter(enrichment => {
      const matchesSearch = enrichment.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           enrichment.leadEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || enrichment.status === statusFilter;
      const matchesType = typeFilter === 'all' || enrichment.enrichmentType === typeFilter;
      const matchesSource = sourceFilter === 'all' || enrichment.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesSource;
    });
  }, [searchQuery, statusFilter, typeFilter, sourceFilter]);

  const enrichmentStats = useMemo(() => {
    const total = mockEnrichments.length;
    const completed = mockEnrichments.filter(e => e.status === 'completed').length;
    const pending = mockEnrichments.filter(e => e.status === 'pending').length;
    const failed = mockEnrichments.filter(e => e.status === 'failed').length;
    const totalCost = mockEnrichments.reduce((sum, e) => sum + e.cost, 0);
    const avgConfidence = mockEnrichments.length > 0 ? mockEnrichments.reduce((sum, e) => sum + e.confidence, 0) / mockEnrichments.length : 0;
    const successRate = total > 0 ? (completed / total) * 100 : 0;
    
    return { total, completed, pending, failed, totalCost, avgConfidence, successRate };
  }, []);

  const verificationStats = useMemo(() => {
    const total = mockVerifications.length;
    const verified = mockVerifications.filter(v => v.status === 'verified').length;
    const invalid = mockVerifications.filter(v => v.status === 'invalid').length;
    const risky = mockVerifications.filter(v => v.status === 'risky').length;
    const totalCost = mockVerifications.reduce((sum, v) => sum + v.cost, 0);
    const avgConfidence = mockVerifications.length > 0 ? mockVerifications.reduce((sum, v) => sum + v.confidence, 0) / mockVerifications.length : 0;
    
    return { total, verified, invalid, risky, totalCost, avgConfidence };
  }, []);

  const EnrichmentCard = ({ enrichment }: { enrichment: LeadEnrichment }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedEnrichment(enrichment)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{enrichment.leadName}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Mail className="h-4 w-4" />
              <span>{enrichment.leadEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Requested: {new Date(enrichment.requestedAt).toLocaleString()}</span>
              {enrichment.completedAt && (
                <>
                  <span>•</span>
                  <span>Completed: {new Date(enrichment.completedAt).toLocaleString()}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={statusColors[enrichment.status]}>{enrichment.status}</Badge>
            <div className="text-sm text-gray-600">${enrichment.cost.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Badge className={typeColors[enrichment.enrichmentType]}>{enrichment.enrichmentType}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Database className="h-4 w-4" />
            <span className="capitalize">{enrichment.source}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-4 w-4" />
            <span>{enrichment.confidence}% confidence</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Data Points Added ({enrichment.dataPoints.length})</div>
          <div className="space-y-1">
            {enrichment.dataPoints.slice(0, 3).map((point, index) => (
              <div key={index} className="flex items-center justify-between text-sm bg-gray-50 rounded p-2">
                <span className="font-medium">{point.field}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">{point.newValue}</span>
                  {point.verified && <CheckCircle className="h-3 w-3 text-green-600" />}
                </div>
              </div>
            ))}
            {enrichment.dataPoints.length > 3 && (
              <div className="text-sm text-gray-500 text-center">
                +{enrichment.dataPoints.length - 3} more fields
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {enrichment.autoApproved ? (
              <Badge variant="outline" className="text-xs">Auto-approved</Badge>
            ) : (
              <Badge variant="outline" className="text-xs">Manual review</Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {enrichment.reviewedBy && `Reviewed by ${enrichment.reviewedBy}`}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const VerificationCard = ({ verification }: { verification: LeadVerification }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Lead {verification.leadId}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Verified: {new Date(verification.verifiedAt).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge className={statusColors[verification.status]}>{verification.status}</Badge>
            <div className="text-sm text-gray-600">${verification.cost.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Badge className={typeColors[verification.verificationType]}>{verification.verificationType}</Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="h-4 w-4" />
            <span>{verification.confidence}% confidence</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Settings className="h-4 w-4" />
            <span className="capitalize">{verification.method}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {verification.results.email && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-sm mb-2">Email Verification</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Deliverable:</span>
                  <span className={verification.results.email.deliverable ? 'text-green-600' : 'text-red-600'}>
                    {verification.results.email.deliverable ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Valid:</span>
                  <span className={verification.results.email.valid ? 'text-green-600' : 'text-red-600'}>
                    {verification.results.email.valid ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="text-gray-600">{verification.results.email.reason}</div>
              </div>
            </div>
          )}
          
          {verification.results.phone && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-sm mb-2">Phone Verification</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Valid:</span>
                  <span className={verification.results.phone.valid ? 'text-green-600' : 'text-red-600'}>
                    {verification.results.phone.valid ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="capitalize">{verification.results.phone.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carrier:</span>
                  <span>{verification.results.phone.carrier}</span>
                </div>
              </div>
            </div>
          )}
          
          {verification.results.company && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="font-medium text-sm mb-2">Company Verification</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Exists:</span>
                  <span className={verification.results.company.exists ? 'text-green-600' : 'text-red-600'}>
                    {verification.results.company.exists ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Domain:</span>
                  <span>{verification.results.company.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employees:</span>
                  <span>{verification.results.company.employees.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const ToolCard = ({ tool }: { tool: LeadTool }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedTool(tool)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{tool.name}</h3>
                <Badge className={categoryColors[tool.category]}>{tool.category}</Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
          </div>
          <Switch checked={tool.isActive} />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{tool.usageCount.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Uses</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{tool.successRate}%</div>
            <div className="text-xs text-gray-600">Success</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">${tool.averageCost.toFixed(2)}</div>
            <div className="text-xs text-gray-600">Avg Cost</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Features</div>
          <div className="flex flex-wrap gap-2">
            {tool.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">{feature}</Badge>
            ))}
            {tool.features.length > 3 && (
              <Badge variant="outline" className="text-xs">+{tool.features.length - 3} more</Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {tool.lastUsed && `Last used: ${new Date(tool.lastUsed).toLocaleDateString()}`}
          </div>
          <Button size="sm">
            Use Tool
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const DataSourceCard = ({ source }: { source: DataSource }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{source.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{source.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Badge className={typeColors[source.type]}>{source.type}</Badge>
              <span>{source.accuracy}% accuracy</span>
              <span>${source.costPerRecord.toFixed(2)} per record</span>
            </div>
          </div>
          <Switch checked={source.isActive} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-medium mb-2">Usage This Month</div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-bold text-blue-600">{source.usage.thisMonth.toLocaleString()}</span>
              <span className="text-sm text-gray-600">/ {source.usage.limit.toLocaleString()}</span>
            </div>
            <Progress value={(source.usage.thisMonth / source.usage.limit) * 100} className="h-2" />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Cost This Month</div>
            <div className="text-2xl font-bold text-green-600">${source.usage.cost.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Available Fields</div>
          <div className="flex flex-wrap gap-2">
            {source.fields.slice(0, 4).map((field, index) => (
              <Badge key={index} variant="outline" className="text-xs">{field}</Badge>
            ))}
            {source.fields.length > 4 && (
              <Badge variant="outline" className="text-xs">+{source.fields.length - 4} more</Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Coverage: {source.coverage}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrichments</p>
                <p className="text-2xl font-bold text-gray-900">{enrichmentStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verifications</p>
                <p className="text-2xl font-bold text-gray-900">{verificationStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{enrichmentStats.successRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-gray-900">${(enrichmentStats.totalCost + verificationStats.totalCost).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Source Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDataSources.map(source => (
                <div key={source.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Database className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{source.name}</p>
                      <p className="text-sm text-gray-600">{source.accuracy}% accuracy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${source.usage.cost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{source.usage.thisMonth} uses</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tool Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeadTools.map(tool => (
                <div key={tool.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-sm text-gray-600">{tool.successRate}% success rate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tool.usageCount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">uses</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Tools</h1>
              <p className="text-gray-600">Data enrichment and verification tools</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setIsEnrichDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Enrich Leads
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="enrichment">Enrichment</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="enrichment" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search enrichments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="intent">Intent</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="clearbit">Clearbit</SelectItem>
                    <SelectItem value="apollo">Apollo</SelectItem>
                    <SelectItem value="zoominfo">ZoomInfo</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={() => setIsEnrichDialogOpen(true)}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Batch Enrich
              </Button>
            </div>

            <div className="grid gap-6">
              {filteredEnrichments.map(enrichment => (
                <EnrichmentCard key={enrichment.id} enrichment={enrichment} />
              ))}
              {filteredEnrichments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No enrichments found matching your criteria
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Lead Verifications</h3>
              <Button onClick={() => setIsVerifyDialogOpen(true)}>
                <Shield className="h-4 w-4 mr-2" />
                Verify Leads
              </Button>
            </div>
            
            <div className="grid gap-6">
              {mockVerifications.map(verification => (
                <VerificationCard key={verification.id} verification={verification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Available Tools</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockLeadTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Data Sources</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Source
              </Button>
            </div>
            
            <div className="grid gap-6">
              {mockDataSources.map(source => (
                <DataSourceCard key={source.id} source={source} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsView />
          </TabsContent>
        </Tabs>
      </div>

      {selectedEnrichment && (
        <Dialog open={!!selectedEnrichment} onOpenChange={() => setSelectedEnrichment(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Enrichment Details - {selectedEnrichment.leadName}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Lead Information</Label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedEnrichment.leadName}</p>
                    <p className="text-sm text-gray-600">{selectedEnrichment.leadEmail}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={typeColors[selectedEnrichment.enrichmentType]}>
                        {selectedEnrichment.enrichmentType}
                      </Badge>
                      <Badge className={statusColors[selectedEnrichment.status]}>
                        {selectedEnrichment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Enrichment Details</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Source:</span>
                      <span className="capitalize">{selectedEnrichment.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span>{selectedEnrichment.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost:</span>
                      <span>${selectedEnrichment.cost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto Approved:</span>
                      <span>{selectedEnrichment.autoApproved ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Data Points ({selectedEnrichment.dataPoints.length})</Label>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedEnrichment.dataPoints.map((point, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{point.field}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-600">{point.confidence}%</span>
                            {point.verified && <CheckCircle className="h-3 w-3 text-green-600" />}
                          </div>
                        </div>
                        <div className="text-sm">
                          {point.oldValue && (
                            <div className="text-gray-500 line-through mb-1">
                              Old: {point.oldValue}
                            </div>
                          )}
                          <div className="font-medium">
                            {point.oldValue ? 'New: ' : ''}{point.newValue}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Source: {point.source}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
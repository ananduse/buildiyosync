import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Filter,
  Plus,
  MoreHorizontal
} from 'lucide-react';

export default function LeadPipelineView() {
  const pipelineStages = [
    {
      id: 'new',
      name: 'New Leads',
      count: 45,
      value: 235000,
      color: 'bg-blue-500',
      leads: [
        { id: 1, name: 'ABC Corp', value: 25000, contact: 'John Smith' },
        { id: 2, name: 'XYZ Ltd', value: 18000, contact: 'Sarah Johnson' },
        { id: 3, name: 'Tech Solutions', value: 35000, contact: 'Mike Davis' },
      ]
    },
    {
      id: 'qualified',
      name: 'Qualified',
      count: 32,
      value: 580000,
      color: 'bg-yellow-500',
      leads: [
        { id: 4, name: 'Global Inc', value: 85000, contact: 'Lisa Brown' },
        { id: 5, name: 'Innovation Co', value: 42000, contact: 'David Wilson' },
        { id: 6, name: 'Future Tech', value: 67000, contact: 'Emma Taylor' },
      ]
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      count: 18,
      value: 890000,
      color: 'bg-orange-500',
      leads: [
        { id: 7, name: 'Enterprise LLC', value: 125000, contact: 'Robert Clark' },
        { id: 8, name: 'Digital Works', value: 78000, contact: 'Jennifer Lee' },
      ]
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      count: 12,
      value: 650000,
      color: 'bg-purple-500',
      leads: [
        { id: 9, name: 'MegaCorp', value: 185000, contact: 'Thomas Anderson' },
        { id: 10, name: 'StartupXYZ', value: 95000, contact: 'Alice Cooper' },
      ]
    },
    {
      id: 'closed-won',
      name: 'Closed Won',
      count: 8,
      value: 420000,
      color: 'bg-green-500',
      leads: [
        { id: 11, name: 'Success Corp', value: 155000, contact: 'Mark Johnson' },
        { id: 12, name: 'Winner Ltd', value: 88000, contact: 'Rachel Green' },
      ]
    },
    {
      id: 'closed-lost',
      name: 'Closed Lost',
      count: 15,
      value: 185000,
      color: 'bg-red-500',
      leads: []
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600 mt-1">Track leads through your sales process</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">130</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900">$2.96M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">22.5%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Deal Size</p>
                <p className="text-2xl font-bold text-gray-900">$52.5K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stage.count}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(stage.value)}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {stage.leads.map((lead) => (
                      <Card key={lead.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{lead.name}</h4>
                            <span className="text-xs text-green-600 font-medium">
                              {formatCurrency(lead.value)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users className="h-3 w-3" />
                            <span>{lead.contact}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {/* Add Lead Button */}
                    <Button 
                      variant="ghost" 
                      className="w-full border-2 border-dashed border-gray-300 h-16 text-gray-500 hover:border-gray-400 hover:text-gray-600"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lead
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
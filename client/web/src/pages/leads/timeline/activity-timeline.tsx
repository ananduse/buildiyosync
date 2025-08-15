import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Calendar,
  Target,
  FileText,
  Plus,
  Filter,
  Search
} from 'lucide-react';

export default function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      type: 'lead_created',
      title: 'New lead created',
      description: 'ABC Corp lead was created by John Smith',
      user: 'John Smith',
      userInitials: 'JS',
      timestamp: '2 hours ago',
      icon: User,
      color: 'bg-blue-500',
      details: {
        leadName: 'ABC Corp',
        leadValue: '$25,000',
        source: 'Website Form'
      }
    },
    {
      id: 2,
      type: 'email_sent',
      title: 'Email sent',
      description: 'Welcome email sent to contact@xyz-ltd.com',
      user: 'Sarah Johnson',
      userInitials: 'SJ',
      timestamp: '4 hours ago',
      icon: Mail,
      color: 'bg-green-500',
      details: {
        template: 'Welcome Email Template',
        recipient: 'contact@xyz-ltd.com',
        status: 'Delivered'
      }
    },
    {
      id: 3,
      type: 'call_completed',
      title: 'Call completed',
      description: 'Discovery call with Tech Solutions - 45 minutes',
      user: 'Mike Davis',
      userInitials: 'MD',
      timestamp: '6 hours ago',
      icon: Phone,
      color: 'bg-purple-500',
      details: {
        duration: '45 minutes',
        outcome: 'Interested',
        nextStep: 'Send proposal'
      }
    },
    {
      id: 4,
      type: 'meeting_scheduled',
      title: 'Meeting scheduled',
      description: 'Demo meeting scheduled with Global Inc for tomorrow',
      user: 'Lisa Brown',
      userInitials: 'LB',
      timestamp: '8 hours ago',
      icon: Calendar,
      color: 'bg-orange-500',
      details: {
        meetingType: 'Product Demo',
        date: 'Tomorrow, 2:00 PM',
        duration: '1 hour'
      }
    },
    {
      id: 5,
      type: 'lead_qualified',
      title: 'Lead qualified',
      description: 'Innovation Co moved to qualified stage',
      user: 'David Wilson',
      userInitials: 'DW',
      timestamp: '1 day ago',
      icon: Target,
      color: 'bg-teal-500',
      details: {
        previousStage: 'New Lead',
        currentStage: 'Qualified',
        score: '85/100'
      }
    },
    {
      id: 6,
      type: 'proposal_sent',
      title: 'Proposal sent',
      description: 'Detailed proposal sent to Future Tech',
      user: 'Emma Taylor',
      userInitials: 'ET',
      timestamp: '1 day ago',
      icon: FileText,
      color: 'bg-indigo-500',
      details: {
        proposalValue: '$67,000',
        validUntil: '2 weeks',
        template: 'Standard Proposal'
      }
    },
    {
      id: 7,
      type: 'sms_sent',
      title: 'SMS sent',
      description: 'Follow-up reminder sent to Enterprise LLC',
      user: 'Robert Clark',
      userInitials: 'RC',
      timestamp: '2 days ago',
      icon: MessageSquare,
      color: 'bg-pink-500',
      details: {
        message: 'Hi! Just following up on our conversation...',
        status: 'Delivered',
        response: 'No reply yet'
      }
    }
  ];

  const getActivityTypeColor = (type: string) => {
    const colors = {
      lead_created: 'bg-blue-100 text-blue-800',
      email_sent: 'bg-green-100 text-green-800',
      call_completed: 'bg-purple-100 text-purple-800',
      meeting_scheduled: 'bg-orange-100 text-orange-800',
      lead_qualified: 'bg-teal-100 text-teal-800',
      proposal_sent: 'bg-indigo-100 text-indigo-800',
      sms_sent: 'bg-pink-100 text-pink-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Timeline</h1>
          <p className="text-gray-600 mt-1">Recent activity across all leads and contacts</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Activities</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calls Made</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Meetings</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="relative flex gap-4">
                  {/* Timeline Line */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                  )}
                  
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${activity.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                          <Badge className={getActivityTypeColor(activity.type)}>
                            {activity.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        
                        {/* Activity Details */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-2">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                            {Object.entries(activity.details).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="ml-1 font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* User and Timestamp */}
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{activity.userInitials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
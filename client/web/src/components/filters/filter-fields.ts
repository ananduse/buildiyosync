// Filter field definitions for different screens

export const LEAD_FILTER_FIELDS = [
  {
    value: 'company_name',
    label: 'Company Name',
    type: 'text' as const,
  },
  {
    value: 'contact_name',
    label: 'Contact Name',
    type: 'text' as const,
  },
  {
    value: 'email',
    label: 'Email',
    type: 'text' as const,
  },
  {
    value: 'phone',
    label: 'Phone',
    type: 'text' as const,
  },
  {
    value: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { value: 'new', label: 'New' },
      { value: 'contacted', label: 'Contacted' },
      { value: 'qualified', label: 'Qualified' },
      { value: 'proposal_sent', label: 'Proposal Sent' },
      { value: 'negotiation', label: 'Negotiation' },
      { value: 'won', label: 'Won' },
      { value: 'lost', label: 'Lost' },
    ],
  },
  {
    value: 'priority',
    label: 'Priority',
    type: 'select' as const,
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' },
    ],
  },
  {
    value: 'source',
    label: 'Lead Source',
    type: 'select' as const,
    options: [
      { value: 'website', label: 'Website' },
      { value: 'referral', label: 'Referral' },
      { value: 'social_media', label: 'Social Media' },
      { value: 'cold_call', label: 'Cold Call' },
      { value: 'email_campaign', label: 'Email Campaign' },
      { value: 'trade_show', label: 'Trade Show' },
      { value: 'advertisement', label: 'Advertisement' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    value: 'industry',
    label: 'Industry',
    type: 'select' as const,
    options: [
      { value: 'construction', label: 'Construction' },
      { value: 'real_estate', label: 'Real Estate' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'retail', label: 'Retail' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'education', label: 'Education' },
      { value: 'technology', label: 'Technology' },
      { value: 'finance', label: 'Finance' },
      { value: 'hospitality', label: 'Hospitality' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    value: 'project_value',
    label: 'Project Value',
    type: 'number' as const,
  },
  {
    value: 'created_date',
    label: 'Created Date',
    type: 'date' as const,
  },
  {
    value: 'last_contact_date',
    label: 'Last Contact Date',
    type: 'date' as const,
  },
  {
    value: 'follow_up_date',
    label: 'Follow-up Date',
    type: 'date' as const,
  },
  {
    value: 'assigned_to',
    label: 'Assigned To',
    type: 'select' as const,
    options: [
      { value: 'sarah_johnson', label: 'Sarah Johnson' },
      { value: 'mike_chen', label: 'Mike Chen' },
      { value: 'lisa_wang', label: 'Lisa Wang' },
      { value: 'david_brown', label: 'David Brown' },
      { value: 'unassigned', label: 'Unassigned' },
    ],
  },
  {
    value: 'location',
    label: 'Location',
    type: 'text' as const,
  },
  {
    value: 'is_qualified',
    label: 'Is Qualified',
    type: 'boolean' as const,
  },
  {
    value: 'has_budget',
    label: 'Has Budget',
    type: 'boolean' as const,
  },
];

export const ACTIVITY_FILTER_FIELDS = [
  {
    value: 'activity_type',
    label: 'Activity Type',
    type: 'select' as const,
    options: [
      { value: 'call', label: 'Call' },
      { value: 'email', label: 'Email' },
      { value: 'meeting', label: 'Meeting' },
      { value: 'note', label: 'Note' },
      { value: 'task', label: 'Task' },
      { value: 'proposal', label: 'Proposal' },
      { value: 'follow_up', label: 'Follow-up' },
    ],
  },
  {
    value: 'activity_date',
    label: 'Activity Date',
    type: 'date' as const,
  },
  {
    value: 'due_date',
    label: 'Due Date',
    type: 'date' as const,
  },
  {
    value: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
  },
  {
    value: 'priority',
    label: 'Priority',
    type: 'select' as const,
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' },
    ],
  },
  {
    value: 'assigned_to',
    label: 'Assigned To',
    type: 'select' as const,
    options: [
      { value: 'sarah_johnson', label: 'Sarah Johnson' },
      { value: 'mike_chen', label: 'Mike Chen' },
      { value: 'lisa_wang', label: 'Lisa Wang' },
      { value: 'david_brown', label: 'David Brown' },
    ],
  },
  {
    value: 'subject',
    label: 'Subject',
    type: 'text' as const,
  },
  {
    value: 'description',
    label: 'Description',
    type: 'text' as const,
  },
  {
    value: 'is_completed',
    label: 'Is Completed',
    type: 'boolean' as const,
  },
];

export const COMMUNICATION_FILTER_FIELDS = [
  {
    value: 'communication_type',
    label: 'Communication Type',
    type: 'select' as const,
    options: [
      { value: 'email', label: 'Email' },
      { value: 'phone', label: 'Phone Call' },
      { value: 'sms', label: 'SMS' },
      { value: 'video_call', label: 'Video Call' },
      { value: 'meeting', label: 'In-Person Meeting' },
      { value: 'letter', label: 'Letter' },
    ],
  },
  {
    value: 'direction',
    label: 'Direction',
    type: 'select' as const,
    options: [
      { value: 'inbound', label: 'Inbound' },
      { value: 'outbound', label: 'Outbound' },
    ],
  },
  {
    value: 'date',
    label: 'Communication Date',
    type: 'date' as const,
  },
  {
    value: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { value: 'sent', label: 'Sent' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'read', label: 'Read' },
      { value: 'replied', label: 'Replied' },
      { value: 'failed', label: 'Failed' },
    ],
  },
  {
    value: 'subject',
    label: 'Subject',
    type: 'text' as const,
  },
  {
    value: 'content',
    label: 'Content',
    type: 'text' as const,
  },
  {
    value: 'from_contact',
    label: 'From Contact',
    type: 'text' as const,
  },
  {
    value: 'to_contact',
    label: 'To Contact',
    type: 'text' as const,
  },
  {
    value: 'has_attachment',
    label: 'Has Attachment',
    type: 'boolean' as const,
  },
];

export const REPORT_FILTER_FIELDS = [
  {
    value: 'report_type',
    label: 'Report Type',
    type: 'select' as const,
    options: [
      { value: 'pipeline', label: 'Pipeline Report' },
      { value: 'source_analysis', label: 'Source Analysis' },
      { value: 'team_performance', label: 'Team Performance' },
      { value: 'conversion', label: 'Conversion Analysis' },
    ],
  },
  {
    value: 'date_range',
    label: 'Date Range',
    type: 'date' as const,
  },
  {
    value: 'team_member',
    label: 'Team Member',
    type: 'select' as const,
    options: [
      { value: 'sarah_johnson', label: 'Sarah Johnson' },
      { value: 'mike_chen', label: 'Mike Chen' },
      { value: 'lisa_wang', label: 'Lisa Wang' },
      { value: 'david_brown', label: 'David Brown' },
    ],
  },
  {
    value: 'lead_source',
    label: 'Lead Source',
    type: 'select' as const,
    options: [
      { value: 'website', label: 'Website' },
      { value: 'referral', label: 'Referral' },
      { value: 'social_media', label: 'Social Media' },
      { value: 'cold_call', label: 'Cold Call' },
      { value: 'events', label: 'Events' },
    ],
  },
  {
    value: 'status',
    label: 'Lead Status',
    type: 'select' as const,
    options: [
      { value: 'new', label: 'New' },
      { value: 'contacted', label: 'Contacted' },
      { value: 'qualified', label: 'Qualified' },
      { value: 'won', label: 'Won' },
      { value: 'lost', label: 'Lost' },
    ],
  },
];

export const DASHBOARD_FILTER_FIELDS = [
  {
    value: 'date_range',
    label: 'Date Range',
    type: 'date' as const,
  },
  {
    value: 'team_member',
    label: 'Team Member',
    type: 'select' as const,
    options: [
      { value: 'all', label: 'All Team Members' },
      { value: 'sarah_johnson', label: 'Sarah Johnson' },
      { value: 'mike_chen', label: 'Mike Chen' },
      { value: 'lisa_wang', label: 'Lisa Wang' },
      { value: 'david_brown', label: 'David Brown' },
    ],
  },
  {
    value: 'lead_source',
    label: 'Lead Source',
    type: 'select' as const,
    options: [
      { value: 'all', label: 'All Sources' },
      { value: 'website', label: 'Website' },
      { value: 'referral', label: 'Referral' },
      { value: 'social_media', label: 'Social Media' },
      { value: 'cold_call', label: 'Cold Call' },
    ],
  },
  {
    value: 'status',
    label: 'Lead Status',
    type: 'select' as const,
    options: [
      { value: 'all', label: 'All Statuses' },
      { value: 'new', label: 'New' },
      { value: 'contacted', label: 'Contacted' },
      { value: 'qualified', label: 'Qualified' },
      { value: 'won', label: 'Won' },
      { value: 'lost', label: 'Lost' },
    ],
  },
];
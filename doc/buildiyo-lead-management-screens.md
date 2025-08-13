# Buildiyo - Lead Management Module
# Screen Design & Navigation Structure

## 📊 Module Overview

**Module Name:** Lead Management System  
**Primary Users:** Sales Team, Marketing Team, Project Managers, Organization Owners  
**Access Points:** BuildiyoHub (Web), BuildiyoField (Mobile)

---

## 🗺️ Navigation Structure

```
Lead Management
├── Dashboard
│   └── Lead Analytics Dashboard
├── Leads
│   ├── All Leads (List View)
│   ├── Kanban Board View
│   ├── Calendar View
│   └── Map View
├── Lead Details
│   ├── Lead Profile
│   ├── Activities & Timeline
│   ├── Communications
│   ├── Documents
│   └── Convert to Project
├── Lead Capture
│   ├── Quick Add Lead
│   ├── Bulk Import
│   └── Web Form Builder
└── Reports & Analytics
    ├── Lead Reports
    ├── Conversion Analytics
    └── Team Performance
```

---

## 📱 Screen List & Details

### 1. **Lead Dashboard** 
`Path: /leads/dashboard`

#### Screen Elements:
- **Header Section**
  - Page Title: "Lead Management Dashboard"
  - Date Range Filter (Today/Week/Month/Quarter/Custom)
  - Quick Actions: "+ New Lead", "Import Leads", "Export Report"
  - Search Bar with filters

- **KPI Cards Row**
  - Total Leads (Number + % change)
  - New Leads This Month (Number + trend graph)
  - Conversion Rate (Percentage + indicator)
  - Average Lead Value (Currency + comparison)
  - Hot Leads (Count + list preview)
  - Follow-ups Due Today (Number + quick access)

- **Lead Funnel Chart**
  - Visual funnel showing: New → Contacted → Qualified → Proposal → Negotiation → Won/Lost
  - Click-through to filtered list
  - Conversion rates between stages

- **Recent Activities Feed**
  - Last 10 lead activities
  - Activity type icons (call, email, meeting, note)
  - Quick action buttons per activity

- **Lead Source Performance**
  - Pie/Donut chart of lead sources
  - Table with source metrics
  - ROI per source

- **Team Performance Widget**
  - Top performers leaderboard
  - Leads per team member
  - Conversion rates by team member

---

### 2. **All Leads List View**
`Path: /leads/list`

#### Screen Layout:
- **Top Action Bar**
  - Title: "All Leads" with total count
  - View Switcher: List | Kanban | Calendar | Map
  - Bulk Actions: Select All, Assign, Delete, Export
  - Filter Button (opens filter panel)
  - Sort Dropdown
  - "+ New Lead" button

- **Filter Panel (Collapsible)**
  - Lead Status (Multi-select checkboxes)
  - Date Range (Created/Modified)
  - Lead Source
  - Assigned To
  - Lead Score Range
  - Budget Range
  - Location/Region
  - Tags
  - Project Type
  - Save Filter / Clear Filters

- **Data Table Columns**
  - Checkbox (for bulk selection)
  - Lead ID
  - Lead Name/Company
  - Contact Person
  - Phone (click to call)
  - Email (click to email)
  - Lead Source
  - Lead Score (visual indicator)
  - Status (color-coded badge)
  - Budget Range
  - Project Type
  - Location
  - Assigned To (avatar + name)
  - Last Contact Date
  - Next Follow-up
  - Created Date
  - Actions (View, Edit, Delete)

- **Table Features**
  - Sortable columns
  - Resizable columns
  - Sticky header on scroll
  - Inline quick edit
  - Hover row highlight
  - Click row to view details

- **Bottom Section**
  - Pagination (Items per page: 25/50/100)
  - Showing X-Y of Z results
  - Page navigation

---

### 3. **Lead Kanban Board**
`Path: /leads/board`

#### Board Structure:
- **Board Header**
  - View title and controls
  - Board Settings (customize columns)
  - Filter tags display
  - Team member filter

- **Kanban Columns**
  - New Leads
  - Contacted
  - Qualified
  - Proposal Sent
  - Negotiation
  - Won
  - Lost
  - On Hold

- **Lead Cards**
  - Lead name (bold)
  - Company name
  - Budget badge
  - Priority indicator (color strip)
  - Assigned user avatar
  - Due date/follow-up date
  - Quick actions (hover)
  - Lead score stars
  - Source icon
  - Days in stage indicator

- **Column Features**
  - Column count badge
  - Column value total
  - Add new lead button
  - Collapse/expand column
  - WIP limits (optional)

---

### 4. **Lead Detail View**
`Path: /leads/{id}/profile`

#### Layout: Two-Column Layout (70-30 split)

**Left Column (Main Content):**

- **Header Section**
  - Back to leads button
  - Lead name (editable)
  - Company name
  - Status badge
  - Lead score (stars)
  - Quick actions: Edit, Delete, Convert to Project
  - Last updated timestamp

- **Navigation Tabs**
  - Overview
  - Activities
  - Communications
  - Documents
  - Notes
  - History

- **Overview Tab Content**
  - **Contact Information Card**
    - Primary contact name
    - Designation
    - Phone numbers (Mobile, Office)
    - Email addresses
    - Website
    - Social media links
    
  - **Project Requirements Card**
    - Project type
    - Estimated budget
    - Expected start date
    - Project duration
    - Location details
    - Area/Size requirements
    - Special requirements (text)
    
  - **Lead Scoring Card**
    - Overall score (visual)
    - Budget score
    - Timeline score
    - Engagement score
    - Location score
    - Breakdown explanation

- **Activities Tab**
  - Activity timeline (chronological)
  - Activity filters (All, Calls, Emails, Meetings, Notes)
  - Add activity button
  - Each activity shows:
    - Icon, type, subject
    - Description
    - User, date, duration
    - Edit/delete options

**Right Column (Sidebar):**
- **Lead Summary Widget**
  - Current stage
  - Days in pipeline
  - Next action due
  - Probability to close
  - Estimated value

- **Assigned Team**
  - Sales owner (avatar + name)
  - Team members
  - Reassign button

- **Key Dates**
  - Created date
  - Last contact
  - Next follow-up
  - Expected close date

- **Quick Actions**
  - Send Email
  - Schedule Call
  - Create Task
  - Schedule Meeting
  - Add Note
  - Convert to Project

- **Related Items**
  - Similar leads
  - Previous interactions
  - Related projects

---

### 5. **Add/Edit Lead Form**
`Path: /leads/new` or `/leads/{id}/edit`

#### Form Layout: Multi-Step Form

**Step 1: Basic Information**
- Lead source* (dropdown)
- Campaign (if applicable)
- Lead type (Individual/Company)
- Company name*
- Industry (dropdown)
- Website
- Lead description

**Step 2: Contact Details**
- Primary contact name*
- Designation
- Mobile number*
- Alternative number
- Email address*
- Secondary email
- Address fields
- City/State/Country
- Pincode

**Step 3: Project Requirements**
- Project type* (dropdown)
- Sub-category
- Budget range* (min-max)
- Timeline (immediate/3months/6months/later)
- Expected start date
- Project duration
- Location preference
- Area/Size (sq ft)
- Number of units
- Specific requirements (textarea)

**Step 4: Assignment & Scoring**
- Assign to user* (dropdown)
- Lead priority (High/Medium/Low)
- Lead temperature (Hot/Warm/Cold)
- Tags (multi-select)
- Initial notes
- Set follow-up reminder

**Form Actions:**
- Save & Close
- Save & New
- Cancel
- Previous/Next (for steps)

---

### 6. **Lead Import Screen**
`Path: /leads/import`

#### Import Wizard:

**Step 1: Upload File**
- Drag & drop zone
- Browse button
- Supported formats: CSV, Excel
- Download template link
- File preview area

**Step 2: Map Columns**
- Two-column mapping interface
- Source columns (from file)
- Target fields (system fields)
- Auto-mapping suggestions
- Required fields indicator
- Skip column option

**Step 3: Review & Validate**
- Data preview table
- Validation errors highlight
- Duplicate detection
- Fix errors inline
- Skip invalid rows option

**Step 4: Import Settings**
- Duplicate handling (Skip/Update/Create)
- Assignment rules
- Lead source override
- Send notifications (yes/no)
- Auto-follow-up creation

**Step 5: Import Progress**
- Progress bar
- Records processed counter
- Success/Error counts
- Download error report
- View imported leads

---

### 7. **Lead Activities Timeline**
`Path: /leads/{id}/activities`

#### Screen Elements:
- **Activity Header**
  - Total activities count
  - Filter by type
  - Date range filter
  - Search activities

- **Add Activity Section**
  - Quick activity buttons: Call, Email, Meeting, Note
  - Full activity form (expandable)

- **Timeline View**
  - Date separators
  - Activity cards with:
    - Activity icon and type
    - Subject/Title
    - Description preview
    - Attached files
    - Duration (for calls/meetings)
    - Created by (user avatar)
    - Timestamp
    - Edit/Delete actions

- **Activity Types:**
  - Phone Call Log
  - Email Sent/Received
  - Meeting Notes
  - Site Visit
  - Document Shared
  - Status Change
  - Assignment Change
  - Note Added

---

### 8. **Lead Communication Hub**
`Path: /leads/{id}/communications`

#### Communication Channels:

**Email Section**
- Compose new email
- Email templates dropdown
- Email history (threaded view)
- Attachments
- Track email opens

**SMS/WhatsApp Section**
- Send SMS/WhatsApp
- Message templates
- Conversation history
- Media attachments

**Call Section**
- Click-to-call button
- Log call details
- Call recordings (if available)
- Call history
- Schedule callback

---

### 9. **Lead Conversion Screen**
`Path: /leads/{id}/convert`

#### Conversion Wizard:

**Pre-Conversion Checklist**
- ✓ All required information complete
- ✓ Documents collected
- ✓ Budget confirmed
- ✓ Timeline agreed
- ✓ Decision maker identified

**Conversion Form**
- Project name (pre-filled)
- Project code (auto-generated)
- Project type confirmation
- Confirmed budget
- Start date
- End date
- Select workspace
- Assign project manager
- Initial team members

**Post-Conversion Actions**
- Create project folder structure
- Send welcome email
- Schedule kickoff meeting
- Create initial tasks
- Setup client portal access

---

### 10. **Lead Reports Dashboard**
`Path: /leads/reports`

#### Report Sections:

**Summary Cards**
- Total leads (MTD, QTD, YTD)
- Conversion rate trends
- Average conversion time
- Win/Loss ratio

**Report Types:**
- **Lead Pipeline Report**
  - Funnel visualization
  - Stage-wise breakdown
  - Bottleneck analysis

- **Source Analysis**
  - Lead source performance
  - Cost per lead by source
  - ROI analysis

- **Team Performance**
  - Individual performance metrics
  - Team comparison
  - Activity tracking

- **Conversion Analysis**
  - Win/loss reasons
  - Lost opportunity value
  - Conversion by project type

**Report Actions:**
- Export (PDF, Excel, CSV)
- Schedule email
- Save as template
- Share report
- Print

---

### 11. **Lead Settings**
`Path: /settings/leads`

#### Configuration Options:

**Lead Stages**
- Customize pipeline stages
- Set stage colors
- Define stage rules
- Conversion probability

**Lead Sources**
- Add/edit sources
- Set source tracking
- Default assignments

**Lead Scoring**
- Configure scoring rules
- Weight adjustments
- Auto-scoring triggers

**Assignment Rules**
- Round-robin settings
- Territory mapping
- Skill-based routing
- Capacity limits

**Notifications**
- Email templates
- SMS templates
- Notification triggers
- Reminder settings

**Custom Fields**
- Add custom fields
- Field types and validation
- Required field settings
- Field visibility rules

---

## 🔄 Navigation Flow

### Primary User Flow:
1. **Dashboard** → View overview and metrics
2. **All Leads** → Browse and filter leads
3. **Lead Details** → View/Edit specific lead
4. **Activities** → Log interactions
5. **Convert** → Transform lead to project

### Quick Actions Flow:
- From any screen → **+ New Lead** → Add Lead Form
- Lead List → **Bulk Select** → Bulk Actions Menu
- Lead Details → **Convert** → Conversion Wizard
- Dashboard → **KPI Card** → Filtered List View

### Mobile Navigation (BuildiyoField):
- Bottom tab navigation:
  - Dashboard | Leads | Add | Activities | More
- Swipe gestures for stage changes in Kanban
- Pull-to-refresh on all list views
- Floating action button for quick add

---

## 📐 Responsive Design Requirements

### Desktop (1920x1080)
- Full feature set
- Multi-column layouts
- Side panels and modals
- Hover interactions
- Keyboard shortcuts

### Tablet (768x1024)
- Simplified navigation
- Single column forms
- Collapsible sidebars
- Touch-optimized controls

### Mobile (375x812)
- Bottom navigation
- Card-based layouts
- Swipe gestures
- Minimal scrolling
- Thumb-friendly buttons

---

## 🎨 UI/UX Guidelines

### Visual Hierarchy
- **Primary Actions**: Blue buttons (Add Lead, Convert)
- **Secondary Actions**: Outline buttons
- **Destructive Actions**: Red confirmation required
- **Status Colors**: 
  - New (Gray)
  - Contacted (Blue)
  - Qualified (Yellow)
  - Won (Green)
  - Lost (Red)

### Data Density
- **List View**: 25 items default, up to 100
- **Kanban**: 10 cards per column visible
- **Dashboard**: 6-8 widgets maximum
- **Forms**: 5-7 fields per section

### Interaction Patterns
- Double-click to edit inline
- Drag-drop in Kanban view
- Right-click context menus (desktop)
- Long-press options (mobile)
- Bulk selection with checkboxes
- Auto-save on form fields

---

## ✨ Special Features

### Smart Features
- **Duplicate Detection**: Alert on similar leads
- **Auto-Enrichment**: Fetch company data from web
- **Lead Scoring**: AI-based scoring
- **Next Best Action**: Suggested follow-ups
- **Predictive Analytics**: Conversion probability

### Integrations
- Email sync (Gmail, Outlook)
- Calendar integration
- WhatsApp Business API
- Web form embeddings
- API for third-party CRMs

---

This comprehensive screen design document provides all the necessary details to begin UI/UX design and development of the Lead Management module for Buildiyo.
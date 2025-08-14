# 📊 COMPLETE LEAD MANAGEMENT SYSTEM
## Comprehensive Screen Design & Functional Specification Document

---

## 🎯 MODULE OVERVIEW

**Module Name:** Advanced Lead Management System  
**Version:** 3.0 Enhanced  
**Total Screens:** 45+  
**User Roles:** Admin, Sales Manager, Sales Rep, Marketing, Support, Viewer  
**Integration Points:** Email, WhatsApp, SMS, Call, Calendar, Documents

---

## 📱 SCREEN INVENTORY

### Core Screens (15)
1. Lead Dashboard
2. Lead List View
3. Lead Kanban Board
4. Lead Calendar View
5. Lead Map View
6. Lead Detail View
7. Add/Edit Lead
8. Lead Import
9. Lead Export
10. Lead Conversion
11. Lead Analytics
12. Lead Reports
13. Lead Settings
14. Lead Search
15. Lead Timeline

### Communication Screens (8)
16. Communication Hub
17. Email Composer
18. Email Templates
19. WhatsApp Chat
20. SMS Center
21. Call Center
22. Communication History
23. Communication Analytics

### Master Data Screens (10)
24. Lead Source Master
25. Lead Status Master
26. Lead Category Master
27. Industry Master
28. Project Type Master
29. Location Master
30. Team Management
31. Assignment Rules
32. Scoring Rules
33. Workflow Automation

### Additional Screens (12)
34. Activity Management
35. Task Management
36. Document Management
37. Proposal Management
38. Quote Generator
39. Meeting Scheduler
40. Follow-up Manager
41. Campaign Manager
42. Lead Duplicate Checker
43. Lead Merge Tool
44. Bulk Operations
45. Audit Trail

---

## 🖥️ DETAILED SCREEN SPECIFICATIONS

### 1. LEAD DASHBOARD
**Path:** `/leads/dashboard`  
**Icon:** 📊 Dashboard  
**Purpose:** Central command center for lead management

#### Screen Sections:

**A. Header Bar**
- Title: "Lead Management Dashboard"
- Date Range Selector: Today | Yesterday | This Week | This Month | This Quarter | This Year | Custom Range
- Refresh Button (Icon: 🔄) - Tooltip: "Refresh data (Auto-refreshes every 5 minutes)"
- Export Button (Icon: 📥) - Tooltip: "Export dashboard as PDF/Image"
- Settings Button (Icon: ⚙️) - Tooltip: "Customize dashboard widgets"

**B. AI Insights Panel** (New)
- **Today's Priority Actions**
  - Red Alert Items: Overdue follow-ups with count
  - Orange Alert Items: Proposals expiring today
  - Yellow Alert Items: Leads requiring attention
- **Smart Recommendations**
  - Best time to call based on historical data
  - Suggested leads to prioritize
  - Conversion probability alerts
- **Quick Win Opportunities**
  - Hot leads ready to convert
  - Re-engagement opportunities
  - Upsell possibilities

**C. KPI Metrics Cards** (6 Cards)

| Metric | Calculation | Visual | Drill-down Action | Alert Rules |
|--------|------------|---------|-------------------|-------------|
| Total Active Leads | COUNT(status != 'Won' OR 'Lost') | Number + Trend Arrow | Opens filtered list | None |
| New Leads Today | COUNT(created_date = TODAY) | Number + Comparison | Opens today's leads | < 5 = Yellow, 0 = Red |
| Conversion Rate | (Won/Total) × 100 | Percentage + Gauge | Opens funnel view | < 10% = Red, < 20% = Yellow |
| Average Lead Value | SUM(budget)/COUNT(leads) | Currency + Chart | Opens value analysis | Below target = Yellow |
| Response Time | AVG(first_contact - created) | Hours + Status | Opens team performance | > 4 hrs = Red, > 2 hrs = Yellow |
| Pipeline Value | SUM(all_active_lead_values) | Currency + Breakdown | Opens pipeline report | Below forecast = Yellow |

**D. Interactive Sales Funnel**
- **Stages Display:**
  - New (Gray badge with count)
  - Contacted (Blue badge with count)
  - Qualified (Yellow badge with count)
  - Proposal (Purple badge with count)
  - Negotiation (Pink badge with count)
  - Won (Green badge with count)
  - Lost (Red badge with count)
- **Interactive Features:**
  - Click stage → Filter leads by that stage
  - Hover → Show conversion rate, average time, value
  - Drag between stages → Bulk status change
- **Metrics Shown:**
  - Count of leads per stage
  - Total value per stage
  - Conversion rate between stages
  - Average days in stage

**E. Lead Source Performance Chart**
- **Chart Type:** Donut chart with table
- **Data Points:**
  - Source name with icon
  - Number of leads
  - Conversion rate
  - ROI percentage
  - Cost per lead
- **Interactions:**
  - Click segment → Filter leads by source
  - Hover → Detailed metrics
  - Right-click → Source analytics

**F. Team Performance Leaderboard**
- **Columns:**
  - Rank (1, 2, 3 with medals)
  - Team Member (Avatar + Name)
  - Total Leads
  - Converted
  - In Progress
  - Conversion Rate
  - Revenue Generated
  - Activity Score
- **Features:**
  - Sort by any column
  - Click name → Individual performance
  - Award badges for achievements

**G. Activity Timeline**
- **Recent Activities (Last 20)**
  - Activity icon based on type
  - Description with lead name
  - User who performed
  - Timestamp (relative)
  - Quick action buttons
- **Activity Types:**
  - 📞 Call made/received
  - 📧 Email sent/received
  - 💬 WhatsApp message
  - 📅 Meeting scheduled
  - 📝 Note added
  - 🔄 Status changed
  - ⭐ Lead scored

**H. Upcoming Actions Widget**
- **Today's Schedule:**
  - Time-based list of tasks
  - Call reminders with dial button
  - Meeting links with join button
  - Follow-up reminders
- **Overdue Items:**
  - Red highlighted items
  - Days overdue count
  - Quick complete/reschedule buttons

---

### 2. LEAD LIST VIEW (ENHANCED)
**Path:** `/leads/list`  
**Icon:** 📋 List  
**Purpose:** Comprehensive lead inventory management

#### Top Navigation Bar:
- **View Title:** "All Leads" with total count badge
- **View Switcher:** List | Kanban | Calendar | Map | Timeline
- **Quick Filters:** 
  - All Leads | My Leads | Team Leads | Unassigned
  - Hot 🔥 | Warm 🌡️ | Cold ❄️
  - Today | This Week | This Month
- **Search Bar:** 
  - Placeholder: "Search by name, email, phone, company..."
  - Advanced search link
  - Recent searches dropdown

#### Action Toolbar:
- **Primary Actions:**
  - ➕ New Lead (Ctrl+L) - Tooltip: "Create new lead"
  - 📥 Import (Ctrl+I) - Tooltip: "Import leads from file"
  - 📤 Export - Tooltip: "Export filtered leads"
  - 🔄 Refresh - Tooltip: "Refresh lead list"
- **Bulk Actions (Appears on selection):**
  - Assign To - Opens assignment modal
  - Change Status - Opens status change modal
  - Send Email - Opens bulk email composer
  - Send WhatsApp - Opens bulk message modal
  - Add Tags - Opens tag selector
  - Delete - Confirmation required

#### Advanced Filter Panel (Collapsible):

**Filter Categories:**

| Category | Filter Options | Input Type | Business Logic |
|----------|---------------|------------|----------------|
| **Status** | New, Contacted, Qualified, Proposal, Negotiation, Won, Lost, On Hold | Multi-checkbox | Can select multiple |
| **Date Range** | Created Date, Modified Date, Last Activity | Date picker | From-To range |
| **Lead Score** | 0-25 (Cold), 26-50 (Cool), 51-75 (Warm), 76-100 (Hot) | Range slider | Min-Max values |
| **Budget** | < 10L, 10L-50L, 50L-1Cr, 1Cr-5Cr, > 5Cr | Multi-checkbox | Currency in INR |
| **Source** | Website, Social Media, Referral, Walk-in, Phone, Email, Partner | Multi-checkbox | Predefined list |
| **Location** | Country, State, City, Area, Pincode | Cascading dropdown | Hierarchical selection |
| **Assigned To** | Team members list with avatar | Multi-select dropdown | Active users only |
| **Tags** | Custom tags | Tag selector | User-defined tags |
| **Activity** | Has Email, Has Call, Has Meeting, No Activity | Checkboxes | Activity presence |
| **Project Type** | Residential, Commercial, Industrial, Infrastructure | Multi-checkbox | Based on master |

**Filter Actions:**
- Save Filter - Save current filter combination
- Load Saved Filter - Dropdown of saved filters
- Clear All - Reset all filters
- Export Filter - Export filter configuration

#### Data Table Configuration:

**Column Specifications:**

| Column | Width | Sortable | Searchable | Format | Actions | Tooltip |
|--------|-------|----------|------------|--------|---------|---------|
| □ Select | 40px | No | No | Checkbox | Select for bulk action | "Select lead" |
| Lead ID | 80px | Yes | Yes | #00001 | Copy ID | "Lead reference number" |
| Lead Name | 200px | Yes | Yes | Avatar + Name + Company | Click to view | "Lead contact details" |
| Contact | 180px | No | Yes | 📞 Phone / 📧 Email | Click to call/email | "Contact information" |
| Score | 100px | Yes | No | Stars (1-5) + Number | View breakdown | "Lead quality score" |
| Status | 120px | Yes | Yes | Colored badge | Change status | "Current lead status" |
| Budget | 120px | Yes | No | ₹ XX.XX L/Cr | View details | "Estimated project budget" |
| Source | 100px | Yes | Yes | Icon + Text | View source analytics | "Lead origin" |
| Location | 150px | Yes | Yes | City, State | View on map | "Lead location" |
| Assigned To | 120px | Yes | Yes | Avatar + Name | Reassign | "Lead owner" |
| Last Activity | 130px | Yes | No | Relative time | View activities | "Last interaction" |
| Next Action | 150px | Yes | No | Action + Date | Schedule action | "Upcoming task" |
| Created | 100px | Yes | No | DD/MM/YYYY | View history | "Lead creation date" |
| Actions | 100px | No | No | Icon buttons | Multiple actions | "Quick actions" |

**Row Actions Menu:**
- 👁️ View Details (Enter) - Opens lead detail view
- ✏️ Quick Edit (E) - Inline edit mode
- 📞 Call (C) - Initiate call
- 📧 Email (M) - Compose email
- 💬 WhatsApp (W) - Send WhatsApp
- 📅 Schedule (S) - Schedule meeting
- 📄 Generate Proposal (P) - Create proposal
- 🔄 Convert (Ctrl+Shift+C) - Convert to project
- 📋 Duplicate (Ctrl+D) - Duplicate lead
- 🗑️ Delete (Del) - Delete with confirmation

**Table Features:**
- **Pagination:** 25 | 50 | 100 | 200 items per page
- **Column Customization:** Show/hide columns, reorder columns
- **Row Highlighting:** Hover highlight, selection highlight
- **Sticky Header:** Header remains visible on scroll
- **Infinite Scroll:** Optional lazy loading
- **Quick View:** Space bar for preview panel
- **Keyboard Navigation:** Arrow keys to navigate

---

### 3. LEAD KANBAN BOARD
**Path:** `/leads/kanban`  
**Icon:** 📌 Board  
**Purpose:** Visual pipeline management

#### Board Configuration:

**Swimlane Options:**
- By Status (Default)
- By Assignee
- By Source
- By Priority
- By Project Type

**Column Structure:**

| Stage | Color | Icon | WIP Limit | Auto-Actions | Business Rules |
|-------|-------|------|-----------|--------------|----------------|
| New | Gray | 🆕 | 50 | Auto-assign after 1 hour | Cannot skip to Won |
| Contacted | Blue | 📞 | 100 | Log activity required | Minimum 1 contact |
| Qualified | Yellow | ✅ | 75 | Score > 50 required | Budget must be specified |
| Proposal | Purple | 📄 | 50 | Document attachment required | Valid till date required |
| Negotiation | Pink | 💰 | 30 | Approval may be needed | Discount limits apply |
| Won | Green | 🎉 | - | Auto-convert to project | Send thank you email |
| Lost | Red | ❌ | - | Reason required | Add to nurture campaign |
| On Hold | Orange | ⏸️ | 25 | Set reminder | Max 90 days |

**Card Information:**
- **Card Header:**
  - Lead name (Bold)
  - Company name
  - Priority flag (🚩 High, 🏴 Normal, 🏳️ Low)
  - Hot lead indicator 🔥
- **Card Body:**
  - Budget range badge
  - Lead score stars
  - Source icon
  - Location tag
  - Assigned user avatar
- **Card Footer:**
  - Days in current stage
  - Next action date
  - Activity indicators (📞 📧 💬)
- **Card Actions (On Hover):**
  - Quick edit
  - View details
  - Add note
  - Change assignee

**Drag & Drop Rules:**
- Confirmation for backward movement
- Validation before stage change
- Bulk drag with multi-select
- Auto-save on drop
- Undo last move option

---

### 4. LEAD DETAIL VIEW (COMPREHENSIVE)
**Path:** `/leads/{id}/view`  
**Icon:** 👤 Profile  
**Purpose:** Complete lead information and management

#### Page Layout: Three-Column Design

**Left Sidebar (20%):**
- **Lead Summary Card:**
  - Profile picture/Avatar
  - Lead name
  - Company name
  - Designation
  - Lead score (visual)
  - Temperature indicator
  - Status badge
  - Tags
- **Quick Info:**
  - 📞 Primary phone
  - 📧 Primary email
  - 📍 Location
  - 🏢 Industry
  - 💰 Budget range
  - 📅 Timeline
- **Quick Actions:**
  - Call Now button
  - Send Email button
  - WhatsApp button
  - Schedule Meeting
  - Add Note
  - Create Task

**Main Content Area (60%):**

**Navigation Tabs:**

| Tab | Icon | Badge | Content | Permissions |
|-----|------|-------|---------|-------------|
| Overview | 📋 | - | Basic information, requirements | View |
| Timeline | 📅 | Activity count | All activities chronologically | View |
| Communications | 💬 | Unread count | Email, SMS, WhatsApp threads | View/Send |
| Documents | 📁 | File count | Uploaded documents | View/Upload |
| Proposals | 📄 | Proposal count | Sent proposals | View/Create |
| Tasks | ✅ | Open tasks | Related tasks | View/Create |
| Notes | 📝 | - | Internal notes | View/Add |
| Analytics | 📊 | - | Lead analytics | View |
| History | 🕐 | - | Audit trail | View |

**Tab: Overview**
- **Contact Information Section:**
  - Primary contact details (Editable)
  - Secondary contacts grid
  - Social media links
  - Communication preferences
  - Best time to contact
- **Company Information Section:**
  - Company name and website
  - Industry and size
  - Annual revenue
  - Decision makers
  - Company description
- **Project Requirements Section:**
  - Project type and subtype
  - Detailed requirements
  - Budget breakdown
  - Timeline and milestones
  - Specific needs/preferences
  - Competition information
- **Lead Qualification Section:**
  - BANT qualifiers (Budget, Authority, Need, Timeline)
  - Pain points identified
  - Solution fit score
  - Risk factors
  - Win probability

**Tab: Timeline**
- **Activity Filters:**
  - All Activities
  - Calls (📞)
  - Emails (📧)
  - Meetings (📅)
  - Notes (📝)
  - Status Changes (🔄)
  - Documents (📁)
- **Timeline Entry Structure:**
  - Activity icon and type
  - Title and description
  - User avatar and name
  - Timestamp (relative and absolute)
  - Duration (for calls/meetings)
  - Outcome/Result
  - Next action required
  - Edit/Delete options (based on permissions)
- **Quick Add Bar:**
  - Log Call button
  - Send Email button
  - Schedule Meeting button
  - Add Note button

**Tab: Communications**
- **Communication Channels:**
  - Email Thread View
  - WhatsApp Chat View
  - SMS Conversation View
  - Call Logs
- **Email Section:**
  - Compose with templates
  - Thread view with replies
  - Attachments handling
  - Track opens/clicks
  - Schedule sending
- **WhatsApp Section:**
  - Real-time chat interface
  - Media sharing
  - Voice notes
  - Template messages
  - Broadcast capability
- **Call Section:**
  - Click-to-call button
  - Call recording playback
  - Call notes
  - Call scripts
  - Call scheduling

**Right Sidebar (20%):**
- **Lead Metrics:**
  - Days in pipeline
  - Activities count
  - Email open rate
  - Response time
  - Engagement score
- **Related Information:**
  - Similar leads
  - Previous interactions
  - Company's other leads
  - Related projects
- **Team Collaboration:**
  - Assigned team members
  - Followers
  - Internal comments
  - @mentions
- **Upcoming Actions:**
  - Scheduled tasks
  - Follow-up reminders
  - Meeting schedules
  - Deadlines

---

### 5. ADD/EDIT LEAD FORM
**Path:** `/leads/new` or `/leads/{id}/edit`  
**Icon:** ➕ Add / ✏️ Edit  
**Purpose:** Lead data capture and modification

#### Form Structure: Multi-Step Wizard

**Progress Indicator:** Step 1 of 5 [====----] 20%

**Step 1: Lead Source & Campaign**
| Field | Type | Required | Validation | Default | Tooltip |
|-------|------|----------|------------|---------|---------|
| Lead Source | Dropdown | Yes | From master list | - | "How did this lead find us?" |
| Campaign | Dropdown | No | Active campaigns only | - | "Marketing campaign if applicable" |
| Referrer Name | Text | Conditional | If source = Referral | - | "Who referred this lead?" |
| Referrer Contact | Phone | Conditional | Valid phone number | - | "Referrer's contact number" |
| Source Details | Textarea | No | Max 500 chars | - | "Additional source information" |

**Step 2: Contact Information**
| Field | Type | Required | Validation | Default | Tooltip |
|-------|------|----------|------------|---------|---------|
| Lead Type | Radio | Yes | Individual/Company | Individual | "Is this a person or organization?" |
| First Name | Text | Yes | Letters only | - | "Contact's first name" |
| Last Name | Text | Yes | Letters only | - | "Contact's last name" |
| Company Name | Text | Conditional | If type = Company | - | "Organization name" |
| Designation | Text | No | - | - | "Job title or position" |
| Mobile Number | Phone | Yes | 10 digits | +91 | "Primary contact number" |
| Alternate Number | Phone | No | 10 digits | +91 | "Secondary contact number" |
| Email Address | Email | Yes | Valid email format | - | "Primary email address" |
| Secondary Email | Email | No | Valid email format | - | "Alternative email address" |
| Website | URL | No | Valid URL | https:// | "Company website" |

**Step 3: Address & Location**
| Field | Type | Required | Validation | Default | Tooltip |
|-------|------|----------|------------|---------|---------|
| Country | Dropdown | Yes | Country list | India | "Country location" |
| State | Dropdown | Yes | Based on country | - | "State or province" |
| City | Dropdown | Yes | Based on state | - | "City location" |
| Area/Locality | Text | No | - | - | "Specific area or locality" |
| Address Line 1 | Text | Yes | - | - | "Street address" |
| Address Line 2 | Text | No | - | - | "Additional address info" |
| Landmark | Text | No | - | - | "Nearby landmark" |
| Pincode | Number | Yes | 6 digits | - | "Postal code" |
| Map Location | Map Picker | No | Lat/Long | - | "Click to set location on map" |

**Step 4: Project Requirements**
| Field | Type | Required | Validation | Default | Tooltip |
|-------|------|----------|------------|---------|---------|
| Project Type | Dropdown | Yes | From master | - | "Type of project interested in" |
| Project Subtype | Dropdown | No | Based on type | - | "Specific project category" |
| Budget Range | Range Selector | Yes | Min < Max | - | "Estimated project budget" |
| Budget Confirmed | Checkbox | No | - | No | "Is budget approved?" |
| Timeline | Dropdown | Yes | Immediate/1M/3M/6M/1Y | - | "When to start project?" |
| Project Size | Number | No | > 0 | - | "Area in sq ft" |
| Specific Requirements | Textarea | No | Max 1000 chars | - | "Detailed requirements" |
| Urgency Level | Radio | Yes | High/Medium/Low | Medium | "How urgent is this requirement?" |

**Step 5: Assignment & Classification**
| Field | Type | Required | Validation | Default | Tooltip |
|-------|------|----------|------------|---------|---------|
| Assign To | User Dropdown | Yes | Active users only | Current user | "Who will handle this lead?" |
| Lead Status | Dropdown | Yes | From status master | New | "Initial lead status" |
| Lead Temperature | Radio | Yes | Hot/Warm/Cold | Warm | "Lead interest level" |
| Priority | Radio | Yes | High/Medium/Low | Medium | "Lead priority level" |
| Tags | Tag Input | No | - | - | "Add relevant tags" |
| Lead Score | Auto-calculated | - | 0-100 | Calculated | "Automatic scoring based on data" |
| Internal Notes | Textarea | No | Max 500 chars | - | "Notes for team (not visible to lead)" |
| Follow-up Date | DateTime | No | >= Today | Tomorrow | "When to follow up?" |
| Follow-up Type | Dropdown | Conditional | If follow-up set | Call | "How to follow up?" |

**Form Actions:**
- Save & Continue - Save and stay on form
- Save & New - Save and create another
- Save & View - Save and open lead details
- Cancel - Discard changes
- Save as Draft - Save incomplete form

---

### 6. COMMUNICATION HUB
**Path:** `/leads/{id}/communications`  
**Icon:** 💬 Communications  
**Purpose:** Centralized communication management

#### Communication Dashboard:

**Channel Statistics:**
| Channel | Total | Sent | Received | Pending | Failed | Last Activity |
|---------|-------|------|----------|---------|--------|---------------|
| 📧 Email | 45 | 23 | 22 | 2 | 0 | 2 hours ago |
| 💬 WhatsApp | 89 | 44 | 45 | 1 | 0 | 30 mins ago |
| 📱 SMS | 12 | 8 | 4 | 0 | 1 | Yesterday |
| 📞 Calls | 15 | 10 | 5 | 3 | 0 | Today 2:30 PM |

#### Email Management Section:

**Email Composer:**
- **To/CC/BCC Fields:** Auto-populate from lead contacts
- **Subject Line:** With variables {{lead_name}}, {{company}}
- **Template Selector:** 
  - Welcome Templates
  - Follow-up Templates  
  - Proposal Templates
  - Thank You Templates
  - Custom Templates
- **Rich Text Editor:**
  - Formatting tools
  - Insert images
  - Insert links
  - Insert variables
  - Attach files (Max 25MB)
- **Email Options:**
  - Track Opens (Toggle)
  - Track Clicks (Toggle)
  - Request Read Receipt
  - Set Priority (High/Normal/Low)
  - Schedule Send (Date/Time picker)
- **Signature:** Auto-append user signature

**Email Thread View:**
- Conversation threading
- Expand/Collapse messages
- Quick reply option
- Forward capability
- Print thread
- Mark as unread
- Star important emails
- Delete with confirmation

#### WhatsApp Integration:

**WhatsApp Chat Interface:**
- **Chat Header:**
  - Contact name and number
  - Online status indicator
  - Last seen timestamp
  - Profile picture
- **Message Types:**
  - Text messages
  - Images (with preview)
  - Documents (PDF, DOC)
  - Voice notes
  - Location sharing
  - Contact cards
- **Quick Replies:** Predefined response buttons
- **Template Messages:**
  - Greeting templates
  - Information templates
  - Follow-up templates
  - Promotional templates (with opt-in)
- **Message Status:**
  - ⭕ Sending
  - ✓ Sent
  - ✓✓ Delivered
  - ✓✓ Read (Blue)
- **Chat Actions:**
  - Search in conversation
  - Export chat
  - Clear messages
  - Block contact
  - Report spam

#### SMS Center:

**SMS Composer:**
- Recipient number (auto-filled)
- Message text (160 chars counter)
- Unicode support toggle
- Template selector
- Variable insertion
- Schedule sending
- Sender ID selection

**SMS Thread:**
- Chronological view
- Delivery status
- Read receipts (if available)
- Quick reply
- Resend failed messages

#### Call Management:

**Call Interface:**
- **Click-to-Call Button:** Initiate call
- **Call Panel:**
  - Number pad
  - Mute/Unmute
  - Hold/Resume
  - Transfer call
  - Add participant
  - Record toggle
- **During Call:**
  - Timer display
  - Call script viewer
  - Note-taking area
  - Screen sharing option
- **After Call:**
  - Call duration
  - Call outcome selector
  - Call notes
  - Next action
  - Schedule follow-up

**Call Log:**
| Date/Time | Direction | Number | Duration | Recording | Notes | Outcome |
|-----------|-----------|---------|----------|-----------|-------|---------|
| Today 3:30 PM | Outbound | +91-XXXXX | 5:23 | ▶️ Play | View | Interested |
| Today 11:00 AM | Inbound | +91-XXXXX | 2:15 | ▶️ Play | View | Callback |

---

### 7. LEAD IMPORT WIZARD
**Path:** `/leads/import`  
**Icon:** 📥 Import  
**Purpose:** Bulk lead import with intelligence

#### Import Steps:

**Step 1: Choose Import Source**
- **File Upload:**
  - CSV File (Icon: 📄)
  - Excel File (Icon: 📊)
  - Google Sheets (Icon: 📈)
  - Drag & drop zone
  - Max file size: 25MB
  - Download sample template
- **External Sources:**
  - Facebook Leads (Icon: 📘)
  - Google Ads (Icon: 🎯)
  - LinkedIn (Icon: 💼)
  - Website Forms (Icon: 🌐)
  - Other CRM (Icon: 🔄)
- **API Import:**
  - Endpoint URL
  - Authentication method
  - Field mapping

**Step 2: Data Preview & Validation**
- **Preview Table:** First 10 rows
- **Statistics:**
  - Total rows: XXX
  - Valid rows: XXX
  - Invalid rows: XXX
  - Duplicate rows: XXX
- **Validation Issues:**
  - Missing required fields (Red)
  - Invalid format (Orange)
  - Duplicate entries (Yellow)
  - Fix inline or skip rows

**Step 3: Field Mapping**
- **Smart Mapping:** AI-suggested mappings
- **Manual Mapping:**
  - Source Column → Target Field
  - Transform options (Uppercase, Lowercase, Date format)
  - Default values for empty cells
  - Skip unmapped columns
- **Create Custom Fields:** For unmapped columns

**Step 4: Duplicate Handling**
- **Duplicate Detection By:**
  - Email (Primary)
  - Phone number
  - Company name
  - Custom combination
- **Action for Duplicates:**
  - Skip duplicate rows
  - Update existing records
  - Create new records anyway
  - Merge information

**Step 5: Import Settings**
- **Assignment Rules:**
  - Auto-assign based on rules
  - Assign all to specific user
  - Round-robin assignment
  - Keep as unassigned
- **Lead Settings:**
  - Default lead status
  - Default lead source
  - Apply lead scoring
  - Send welcome emails
  - Create follow-up tasks
- **Notifications:**
  - Notify assigned users
  - Send summary to admin
  - Email import report

**Step 6: Import Progress**
- Progress bar with percentage
- Records processed counter
- Success/Failed/Skipped counts
- Real-time log display
- Pause/Resume option
- Cancel import button

**Step 7: Import Summary**
- **Results:**
  - Total processed: XXX
  - Successfully imported: XXX
  - Updated: XXX
  - Failed: XXX
  - Skipped: XXX
- **Actions:**
  - View imported leads
  - Download import report
  - Download error log
  - Retry failed records
  - Import more leads

---

### 8. LEAD CONVERSION WIZARD
**Path:** `/leads/{id}/convert`  
**Icon:** 🔄 Convert  
**Purpose:** Convert qualified leads to projects/customers

#### Pre-Conversion Checklist:

| Check Item | Status | Required | Action | Validation Rule |
|------------|--------|----------|--------|-----------------|
| Contact Information | ✅ Complete | Yes | Edit | All required fields filled |
| Email Verified | ✅ Verified | Yes | Verify | Valid email with confirmation |
| Phone Verified | ⚠️ Pending | No | Verify | OTP verification |
| Budget Confirmed | ✅ Confirmed | Yes | Confirm | Budget range specified |
| Requirements Documented | ✅ Complete | Yes | Edit | Detailed requirements present |
| Decision Maker Identified | ✅ Yes | Yes | Add | Authority person added |
| Documents Collected | ⚠️ Partial | No | Upload | KYC documents uploaded |
| Site Visit Done | ❌ No | No | Schedule | At least one visit logged |
| Proposal Accepted | ✅ Yes | Yes | View | Proposal status = Accepted |
| Payment Terms Agreed | ✅ Yes | Yes | Define | Terms documented |

**Readiness Score:** 85% (8/10 checks passed)

#### Conversion Options:

**Option 1: Convert to Project**
- **Project Details:**
  - Project Name (Auto-filled from lead)
  - Project Code (Auto-generated: PRJ-2024-XXXX)
  - Project Type (From lead data)
  - Project Category
  - Start Date (Date picker)
  - End Date (Date picker)
  - Project Value (From lead budget)
- **Team Assignment:**
  - Project Manager (Required)
  - Team Members (Multi-select)
  - External Consultants
- **Initial Setup:**
  - ☑️ Create project workspace
  - ☑️ Set up folder structure
  - ☑️ Copy lead documents
  - ☑️ Create initial milestones
  - ☑️ Send welcome email
  - ☑️ Schedule kickoff meeting
  - ☑️ Grant portal access

**Option 2: Convert to Customer**
- **Customer Details:**
  - Customer Code (Auto-generated)
  - Customer Type (Individual/Company)
  - Category (Premium/Regular)
  - Credit Limit
  - Payment Terms
- **Account Setup:**
  - ☑️ Create customer account
  - ☑️ Set up billing profile
  - ☑️ Configure portal access
  - ☑️ Subscribe to newsletters

**Option 3: Convert to Opportunity**
- **Opportunity Details:**
  - Opportunity Name
  - Expected Close Date
  - Probability (%)
  - Potential Value
  - Competition Analysis
- **Next Steps:**
  - Define action plan
  - Set milestones
  - Assign tasks

**Post-Conversion Actions:**
- Archive lead record
- Transfer all communications
- Update reports and analytics
- Notify team members
- Trigger automation workflows

---

### 9. MASTER DATA SCREENS

#### 9.1 LEAD SOURCE MASTER
**Path:** `/settings/masters/lead-sources`  
**Icon:** 🌐 Sources

**List View:**
| Source Name | Category | Leads Count | Conversion Rate | Cost/Lead | Status | Actions |
|-------------|----------|-------------|-----------------|-----------|---------|---------|
| Website | Online | 245 | 23% | ₹500 | Active | Edit/Delete |
| Google Ads | Online | 189 | 18% | ₹750 | Active | Edit/Delete |
| Referral | Direct | 67 | 45% | ₹0 | Active | Edit/Delete |

**Add/Edit Form:**
| Field | Type | Required | Validation | Business Rule |
|-------|------|----------|------------|---------------|
| Source Name | Text | Yes | Unique | Max 50 chars |
| Category | Dropdown | Yes | Predefined list | Online/Offline/Direct/Partner |
| Tracking URL | Text | No | Valid URL | UTM parameters |
| Cost Per Lead | Number | No | >= 0 | Default 0 |
| Auto-Assign | User Select | No | Active users | If set, override round-robin |
| Follow-up Template | Template Select | No | Active templates | Auto-send on lead creation |
| Scoring Weight | Number | No | 0-100 | Affects lead score calculation |
| Active | Toggle | Yes | - | Inactive sources hidden in forms |

#### 9.2 LEAD STATUS MASTER
**Path:** `/settings/masters/lead-statuses`  
**Icon:** 🔄 Statuses

**Status Configuration:**
| Status | Code | Color | Icon | Can Move To | SLA (Hours) | Auto Actions |
|--------|------|-------|------|-------------|-------------|--------------|
| New | NEW | Gray | 🆕 | Contacted, Invalid | 4 | Auto-assign if unassigned |
| Contacted | CONT | Blue | 📞 | Qualified, Not Interested | 24 | Send follow-up reminder |
| Qualified | QUAL | Yellow | ✅ | Proposal, Hold | 48 | Notify manager |
| Proposal | PROP | Purple | 📄 | Negotiation, Lost | 72 | Track document views |
| Won | WON | Green | 🎉 | - | - | Convert to project |

**Status Rules:**
- Backward movement requires reason
- Some statuses need approval
- Auto-escalation on SLA breach
- Email notifications on change
- Activity log for all changes

#### 9.3 ASSIGNMENT RULES
**Path:** `/settings/masters/assignment-rules`  
**Icon:** 👥 Assignment

**Rule Types:**
1. **Round Robin**
   - Equal distribution
   - Skip unavailable users
   - Consider workload
   
2. **Load Balanced**
   - Based on current load
   - Weight by capacity
   - Performance factor
   
3. **Skill Based**
   - Match requirements
   - Language preference
   - Industry expertise
   
4. **Territory Based**
   - Geographic assignment
   - Pincode mapping
   - Region allocation

**Rule Configuration:**
| Rule Name | Type | Priority | Conditions | Assignment Logic | Active |
|-----------|------|----------|------------|------------------|---------|
| High Value Leads | Skill Based | 1 | Budget > 1Cr | Senior sales only | Yes |
| Metro Cities | Territory | 2 | City in list | City-wise teams | Yes |
| Default | Round Robin | 3 | All others | All sales team | Yes |

---

### 10. ANALYTICS & REPORTS

#### 10.1 LEAD ANALYTICS DASHBOARD
**Path:** `/leads/analytics`  
**Icon:** 📊 Analytics

**Analytics Sections:**

**A. Conversion Funnel Analysis**
- Stage-wise conversion rates
- Bottleneck identification
- Time spent per stage
- Drop-off analysis
- Improvement suggestions

**B. Source Performance**
- Lead quality by source
- Cost per acquisition
- ROI by source
- Conversion time by source
- Source trend analysis

**C. Team Performance**
- Individual metrics
- Team comparisons
- Activity analysis
- Response time metrics
- Win/loss analysis

**D. Predictive Analytics**
- Lead scoring accuracy
- Conversion probability
- Revenue forecasting
- Churn prediction
- Best time to contact

#### 10.2 REPORT BUILDER
**Path:** `/leads/reports/builder`  
**Icon:** 📈 Reports

**Report Components:**
- Drag-drop widgets
- Custom metrics
- Multiple visualizations
- Dynamic filters
- Real-time data

**Report Types:**
1. **Standard Reports**
   - Daily Activity Report
   - Weekly Performance Report
   - Monthly Conversion Report
   - Quarterly Business Review
   - Annual Summary Report

2. **Custom Reports**
   - User-defined metrics
   - Custom date ranges
   - Specific filters
   - Scheduled delivery
   - Multiple formats

**Export Options:**
- PDF with branding
- Excel with raw data
- CSV for analysis
- PNG/JPG images
- Email delivery
- Scheduled reports

---

### 11. AUTOMATION & WORKFLOWS

#### 11.1 WORKFLOW BUILDER
**Path:** `/settings/automation/workflows`  
**Icon:** ⚙️ Automation

**Trigger Events:**
| Trigger | Description | Available Conditions | Available Actions |
|---------|-------------|---------------------|-------------------|
| Lead Created | New lead added | Source, Value, Location | Assign, Email, Score |
| Status Changed | Status updated | From/To status, Duration | Notify, Task, Email |
| No Activity | Inactive period | Days, Last action | Reminder, Escalate |
| Score Changed | Score updated | Threshold, Direction | Temperature, Assign |
| Email Opened | Engagement | Count, Type | Score, Notify, Call |

**Workflow Designer:**
- Visual flow builder
- Condition branches
- Time delays
- Action blocks
- Testing mode
- Version control

**Example Workflows:**
1. **New Lead Welcome**
   - Trigger: Lead Created
   - Wait: 5 minutes
   - Action: Send welcome email
   - Wait: 1 day
   - Action: Follow-up call task

2. **Hot Lead Alert**
   - Trigger: Score > 80
   - Action: Change temperature to Hot
   - Action: Notify sales manager
   - Action: Assign to senior rep
   - Action: Create urgent task

---

### 12. SYSTEM CONFIGURATION

#### 12.1 LEAD SETTINGS
**Path:** `/settings/leads/configuration`  
**Icon:** ⚙️ Settings

**General Settings:**
| Setting | Description | Type | Default | Options |
|---------|-------------|------|---------|---------|
| Lead ID Format | ID pattern | Text | L-YYYY-XXXXX | Customizable |
| Default Status | New lead status | Dropdown | New | From status master |
| Auto-Assignment | Enable auto-assign | Toggle | On | On/Off |
| Duplicate Check | Check duplicates | Multi-select | Email, Phone | Email/Phone/Company |
| Lead Aging | Days before stale | Number | 30 | 1-365 days |
| Score Calculation | Scoring method | Radio | Automatic | Auto/Manual |
| Activity Tracking | Track all activities | Toggle | On | On/Off |

**Communication Settings:**
- Email tracking (Open/Click)
- WhatsApp integration
- SMS gateway configuration
- Call recording settings
- Communication templates

**Notification Settings:**
- New lead alerts
- Status change notifications
- SLA breach alerts
- Daily summary emails
- Mobile push notifications

---

## 🔄 USER FLOWS

### Flow 1: New Lead Creation
1. User clicks "+ New Lead"
2. Select lead source
3. Enter contact information
4. Add requirements
5. Set assignment
6. Save lead
7. Auto-actions trigger
8. Redirect to lead view

### Flow 2: Lead Qualification
1. Open lead details
2. Review requirements
3. Make initial contact
4. Log call/email
5. Update lead score
6. Change status to Qualified
7. Create proposal task
8. Set follow-up

### Flow 3: Lead Conversion
1. Verify checklist items
2. Select conversion type
3. Enter project details
4. Assign team
5. Configure settings
6. Review summary
7. Confirm conversion
8. Navigate to project

### Flow 4: Bulk Operations
1. Select multiple leads
2. Choose bulk action
3. Configure action parameters
4. Preview affected leads
5. Confirm action
6. Process in background
7. Show progress
8. Display results

---

## 💡 TOOLTIPS & HELP TEXTS

### Field-Level Tooltips:
- **Lead Score:** "Automatically calculated based on engagement, budget, timeline, and profile completeness"
- **Temperature:** "Hot = Ready to buy, Warm = Interested, Cold = Needs nurturing"
- **SLA:** "Service Level Agreement - Maximum time to respond to this lead"
- **Assignment:** "Lead owner responsible for all communications and conversion"
- **Tags:** "Labels for categorization and filtering. Use comma to separate multiple tags"

### Action Tooltips:
- **Convert:** "Transform this qualified lead into an active project or customer"
- **Merge:** "Combine duplicate lead records into a single profile"
- **Archive:** "Move to archived status. Can be restored later if needed"
- **Export:** "Download lead data in Excel, CSV, or PDF format"

### Status Tooltips:
- **New:** "Uncontacted lead requiring initial outreach"
- **Qualified:** "Lead has budget, authority, need, and timeline"
- **On Hold:** "Temporarily paused, will resume later"
- **Won:** "Successfully converted to customer/project"
- **Lost:** "Did not convert, add reason for analysis"

---

## 🚨 VALIDATION RULES & BUSINESS LOGIC

### Lead Creation Rules:
1. Email or Phone is mandatory
2. Duplicate check on save
3. Auto-assign based on rules
4. Score calculation triggers
5. Welcome workflow starts
6. SLA timer begins

### Status Change Rules:
1. Cannot skip stages (except to Lost/Hold)
2. Reason required for Lost status
3. Backward movement needs approval
4. Auto-log status change activity
5. Trigger status-based workflows
6. Update reports real-time

### Assignment Rules:
1. Check user availability
2. Respect capacity limits
3. Consider skill matching
4. Apply territory rules
5. Notify new owner
6. Transfer open tasks

### Communication Rules:
1. Track all interactions
2. Auto-link to lead profile
3. Update engagement score
4. Check opt-out status
5. Respect communication preferences
6. Log in activity timeline

---

## 📱 RESPONSIVE DESIGN SPECIFICATIONS

### Desktop (1920x1080):
- Three-column layouts
- Side panels for filters
- Hover effects enabled
- Keyboard shortcuts active
- Drag-drop functionality
- Multi-window support

### Tablet (768x1024):
- Two-column layouts
- Collapsible sidebars
- Touch-optimized controls
- Swipe gestures
- Floating action buttons
- Responsive tables

### Mobile (375x812):
- Single column layout
- Bottom navigation bar
- Card-based views
- Minimal scrolling
- Thumb-friendly buttons
- Offline capability

---

## ⚡ PERFORMANCE REQUIREMENTS

### Page Load Times:
- Dashboard: < 2 seconds
- List View: < 1.5 seconds
- Lead Details: < 1 second
- Search Results: < 500ms
- Report Generation: < 5 seconds

### Data Handling:
- Pagination: 50 records default
- Lazy loading for images
- Virtual scrolling for large lists
- Background processing for bulk ops
- Cache frequently accessed data
- Compress API responses

### Real-time Updates:
- WebSocket for notifications
- Auto-refresh every 5 minutes
- Instant status updates
- Live activity feed
- Real-time collaboration
- Presence indicators

---

## 🔐 SECURITY & PERMISSIONS

### Role-Based Access:
| Feature | Admin | Manager | Sales Rep | Marketing | Viewer |
|---------|-------|---------|-----------|-----------|---------|
| View All Leads | ✅ | ✅ | ❌ | ✅ | ✅ |
| Edit Any Lead | ✅ | ✅ | ❌ | ❌ | ❌ |
| Delete Leads | ✅ | ✅ | ❌ | ❌ | ❌ |
| Bulk Operations | ✅ | ✅ | ⚠️ | ⚠️ | ❌ |
| Export Data | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| View Reports | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| Configure System | ✅ | ❌ | ❌ | ❌ | ❌ |

### Data Security:
- Encrypted sensitive fields
- Audit trail for all changes
- Session timeout after inactivity
- Two-factor authentication
- IP restriction options
- Data backup every 4 hours

---

## 🎯 SUCCESS METRICS

### Key Performance Indicators:
1. **Lead Response Time:** < 1 hour average
2. **Conversion Rate:** > 20% target
3. **Lead Velocity:** 10% month-over-month growth
4. **Pipeline Value:** Track against forecast
5. **Activity Per Lead:** Minimum 5 touchpoints
6. **Lead Score Accuracy:** 80% correlation with conversion

### User Adoption Metrics:
1. Daily active users
2. Features utilized
3. Mobile usage percentage
4. Report generation frequency
5. Automation usage
6. API integration calls

---

This comprehensive screen design document provides complete functional specifications for building a fully-featured Lead Management System with all necessary screens, workflows, integrations, and business logic clearly defined.
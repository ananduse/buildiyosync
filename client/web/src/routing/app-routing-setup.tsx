import { AuthRouting } from '@/auth/auth-routing';
import { RequireAuth } from '@/auth/require-auth';
import { ErrorRouting } from '@/errors/error-routing';
import { Demo1Layout } from '@/layouts/demo1/layout';
import { Demo3Layout } from '@/layouts/demo3/layout';
import {
  AccountActivityPage,
  AccountAllowedIPAddressesPage,
  AccountApiKeysPage,
  AccountAppearancePage,
  AccountBackupAndRecoveryPage,
  AccountBasicPage,
  AccountCompanyProfilePage,
  AccountCurrentSessionsPage,
  AccountDeviceManagementPage,
  AccountEnterprisePage,
  AccountGetStartedPage,
  AccountHistoryPage,
  AccountImportMembersPage,
  AccountIntegrationsPage,
  AccountInviteAFriendPage,
  AccountMembersStarterPage,
  AccountNotificationsPage,
  AccountOverviewPage,
  AccountPermissionsCheckPage,
  AccountPermissionsTogglePage,
  AccountPlansPage,
  AccountPrivacySettingsPage,
  AccountRolesPage,
  AccountSecurityGetStartedPage,
  AccountSecurityLogPage,
  AccountSettingsEnterprisePage,
  AccountSettingsModalPage,
  AccountSettingsPlainPage,
  AccountSettingsSidebarPage,
  AccountTeamInfoPage,
  AccountTeamMembersPage,
  AccountTeamsPage,
  AccountTeamsStarterPage,
  AccountUserProfilePage,
} from '@/pages/account';
import {
  AuthAccountDeactivatedPage,
  AuthWelcomeMessagePage,
} from '@/pages/auth';
import { DefaultPage, Demo1DarkSidebarPage } from '@/pages/dashboards';
import {
  NetworkAppRosterPage,
  NetworkAuthorPage,
  NetworkGetStartedPage,
  NetworkMarketAuthorsPage,
  NetworkMiniCardsPage,
  NetworkNFTPage,
  NetworkSaasUsersPage,
  NetworkSocialPage,
  NetworkStoreClientsPage,
  NetworkUserCardsTeamCrewPage,
  NetworkUserTableTeamCrewPage,
  NetworkVisitorsPage,
} from '@/pages/network';
import {
  CampaignsCardPage,
  CampaignsListPage,
  ProfileActivityPage,
  ProfileBloggerPage,
  ProfileCompanyPage,
  ProfileCreatorPage,
  ProfileCRMPage,
  ProfileDefaultPage,
  ProfileEmptyPage,
  ProfileFeedsPage,
  ProfileGamerPage,
  ProfileModalPage,
  ProfileNetworkPage,
  ProfileNFTPage,
  ProfilePlainPage,
  ProfileTeamsPage,
  ProfileWorksPage,
  ProjectColumn2Page,
  ProjectColumn3Page,
} from '@/pages/public-profile';
import { AllProductsPage, DashboardPage } from '@/pages/store-admin';
import {
  MyOrdersPage,
  OrderPlacedPage,
  OrderReceiptPage,
  OrderSummaryPage,
  PaymentMethodPage,
  ProductDetailsPage,
  SearchResultsGridPage,
  SearchResultsListPage,
  ShippingInfoPage,
  StoreClientPage,
  WishlistPage,
} from '@/pages/store-client';
import {
  LeadDashboardPage,
  AllLeadsPage,
  LeadKanbanPage,
  AddLeadPage,
  ImportLeadsPage,
  LeadActivitiesPage,
  LeadCommunicationsPage,
  ConvertLeadPage,
  LeadReportsPage,
} from '@/pages/leads';
import { LeadDetailView } from '@/pages/leads/detail/lead-detail-view';

// Import all lead management components
import LeadCalendarView from '@/pages/leads/calendar/lead-calendar-view';
import LeadMapView from '@/pages/leads/map/lead-map-view';
import LeadPipelineView from '@/pages/leads/pipeline/lead-pipeline-view';
import AdvancedSearch from '@/pages/leads/search/advanced-lead-search';
import ActivityTimeline from '@/pages/leads/timeline/activity-timeline';
import LeadAnalyticsDashboard from '@/pages/leads/analytics/lead-analytics-dashboard';

// Communication components
import CommunicationHub from '@/pages/leads/communication/communication-hub';
import EmailComposer from '@/pages/leads/communication/email-composer';
import EmailTemplates from '@/pages/leads/communication/email-templates';
import EmailCampaigns from '@/pages/leads/communication/email-campaigns';
import EmailAnalytics from '@/pages/leads/communication/email-analytics';
import LiveChat from '@/pages/leads/communication/live-chat';
import WhatsAppChat from '@/pages/leads/communication/whatsapp-chat';
import SMSCenter from '@/pages/leads/communication/sms-center';
import CallCenter from '@/pages/leads/communication/call-center';
import VideoMeetings from '@/pages/leads/communication/video-meetings';
import CallAnalytics from '@/pages/leads/communication/call-analytics';
import CommunicationHistory from '@/pages/leads/communication/communication-history';
import InteractionTimeline from '@/pages/leads/communication/interaction-timeline';
import ResponseAnalytics from '@/pages/leads/communication/response-analytics';

// Master data components
import LeadSources from '@/pages/leads/master-data/lead-sources';
import LeadStatuses from '@/pages/leads/master-data/lead-statuses';
import LeadCategories from '@/pages/leads/master-data/lead-categories';
import LeadStages from '@/pages/leads/master-data/lead-stages';
import CompanySizes from '@/pages/leads/master-data/company-sizes';
import Industries from '@/pages/leads/master-data/industries';
import ProjectTypes from '@/pages/leads/master-data/project-types';
import LocationMasters from '@/pages/leads/master-data/location-masters';
import TeamManagement from '@/pages/leads/master-data/team-management';
import AssignmentRules from '@/pages/leads/master-data/assignment-rules';
import ScoringRules from '@/pages/leads/master-data/scoring-rules';

// Additional components
import { ActivityManagement } from '@/pages/leads/additional/activity-management';
import { QuoteGenerator } from '@/pages/leads/additional/quote-generator';
import MeetingScheduler from '@/pages/leads/additional/meeting-scheduler';
import FollowUpManager from '@/pages/leads/additional/follow-up-manager';
import CampaignManager from '@/pages/leads/additional/campaign-manager';
import LeadTools from '@/pages/leads/additional/lead-tools';
import BulkOperations from '@/pages/leads/additional/bulk-operations';
import AuditTrail from '@/pages/leads/additional/audit-trail';
import TaskManagement from '@/pages/leads/additional/task-management';

// Automation components
import WorkflowBuilder from '@/pages/leads/automation/workflow-builder';
import TriggerEvents from '@/pages/leads/automation/triggers';
import ConditionBuilder from '@/pages/leads/automation/conditions';
import ActionBlocks from '@/pages/leads/automation/actions';
import LeadNurturingTemplates from '@/pages/leads/automation/lead-nurturing-templates';
import FollowUpSequences from '@/pages/leads/automation/follow-up-sequences';
import WelcomeSeries from '@/pages/leads/automation/welcome-series';
import WorkflowAnalytics from '@/pages/leads/automation/workflow-analytics';
import AutomationLogs from '@/pages/leads/automation/automation-logs';
import PerformanceMetrics from '@/pages/leads/automation/performance-metrics';

// Analytics components
import ReportBuilder from '@/pages/leads/analytics/report-builder';
import SalesDashboard from '@/pages/leads/analytics/sales-dashboard';
import PerformanceDashboard from '@/pages/leads/analytics/performance-dashboard';
import ExecutiveDashboard from '@/pages/leads/analytics/executive-dashboard';
import StandardReports from '@/pages/leads/analytics/standard-reports';
import CustomReports from '@/pages/leads/analytics/custom-reports';
import ScheduledReports from '@/pages/leads/analytics/scheduled-reports';
import ExportCenter from '@/pages/leads/analytics/export-center';
import DataBackup from '@/pages/leads/analytics/data-backup';
import APIAccess from '@/pages/leads/analytics/api-access';

// Data Quality components
import DuplicateManagement from '@/pages/leads/data-quality/duplicate-management';
import DataValidation from '@/pages/leads/data-quality/data-validation';
import DataCleanup from '@/pages/leads/data-quality/data-cleanup';

// Team Management components
import RolesPermissions from '@/pages/leads/team/roles-permissions';
import TeamPerformance from '@/pages/leads/team/team-performance';
import LoadBalancing from '@/pages/leads/team/load-balancing';
import TerritoryManagement from '@/pages/leads/team/territory-management';

// Collaboration components
import SharedNotes from '@/pages/leads/collaboration/shared-notes';
import InternalMessaging from '@/pages/leads/collaboration/internal-messaging';
import LeadHandoffs from '@/pages/leads/collaboration/lead-handoffs';

// Sales components
import OpportunityManagement from '@/pages/leads/sales/opportunities';
import DealTracking from '@/pages/leads/sales/deal-tracking';
import SalesForecasting from '@/pages/leads/sales/sales-forecasting';
import ProposalManagement from '@/pages/leads/sales/proposal-management';
import ContractManagement from '@/pages/leads/sales/contract-management';

// Conversion component
import LeadConversionWizard from '@/pages/leads/conversion/lead-conversion-wizard';

// Admin components
import SystemConfiguration from '@/pages/leads/admin/system-configuration';
import QualificationCriteria from '@/pages/leads/admin/qualification-criteria';
import EscalationRules from '@/pages/leads/admin/escalation-rules';
import DataPrivacy from '@/pages/leads/admin/data-privacy';
import AccessLogs from '@/pages/leads/admin/access-logs';
import SecuritySettings from '@/pages/leads/admin/security-settings';
import SystemHealth from '@/pages/leads/admin/system-health';
import PerformanceMonitoring from '@/pages/leads/admin/performance-monitoring';
import SystemLogs from '@/pages/leads/admin/system-logs';
import LeadManagementSettings from '@/pages/leads/settings/lead-management-settings';
import LeadEnrichmentAnalytics from '@/pages/leads/analytics/lead-enrichment-analytics';
import ServiceTypes from '@/pages/leads/master-data/service-types';
import EmailConfiguration from '@/pages/leads/admin/email-configuration';
import Integrations from '@/pages/leads/admin/integrations';

import { Navigate, Route, Routes } from 'react-router';

export function AppRoutingSetup() {
  return (
    <Routes>
      {/* Comprehensive Lead Management Routes */}
      <Route element={<Demo3Layout />}>
        {/* Core Lead Management */}
        <Route path="/leads/dashboard" element={<LeadDashboardPage />} />
        <Route path="/leads/list" element={<AllLeadsPage />} />
        <Route path="/leads/board" element={<LeadKanbanPage />} />
        <Route path="/leads/calendar" element={<LeadCalendarView />} />
        <Route path="/leads/map" element={<LeadMapView />} />
        <Route path="/leads/pipeline" element={<LeadPipelineView />} />
        <Route path="/leads/detail" element={<LeadDetailView />} />
        <Route path="/leads/:id" element={<LeadDetailView />} />
        <Route path="/leads/:id/view" element={<LeadDetailView />} />
        <Route path="/leads/:id/edit" element={<LeadDetailView />} />
        <Route path="/leads/add" element={<AddLeadPage />} />
        <Route path="/leads/new" element={<AddLeadPage />} />
        <Route path="/leads/conversion" element={<LeadConversionWizard />} />
        <Route path="/leads/search" element={<AdvancedSearch />} />
        <Route path="/leads/import-export" element={<ImportLeadsPage />} />
        <Route path="/leads/timeline" element={<ActivityTimeline />} />

        {/* Communication Hub */}
        <Route path="/leads/communication/hub" element={<CommunicationHub />} />
        <Route path="/leads/communication/email-composer" element={<EmailComposer />} />
        <Route path="/leads/communication/email-templates" element={<EmailTemplates />} />
        <Route path="/leads/communication/campaigns" element={<EmailCampaigns />} />
        <Route path="/leads/communication/email-analytics" element={<EmailAnalytics />} />
        <Route path="/leads/communication/whatsapp" element={<WhatsAppChat />} />
        <Route path="/leads/communication/sms" element={<SMSCenter />} />
        <Route path="/leads/communication/live-chat" element={<LiveChat />} />
        <Route path="/leads/communication/call-center" element={<CallCenter />} />
        <Route path="/leads/communication/video-meetings" element={<VideoMeetings />} />
        <Route path="/leads/communication/call-analytics" element={<CallAnalytics />} />
        <Route path="/leads/communication/history" element={<CommunicationHistory />} />
        <Route path="/leads/communication/timeline" element={<InteractionTimeline />} />
        <Route path="/leads/communication/analytics" element={<ResponseAnalytics />} />

        {/* Sales Operations */}
        <Route path="/leads/sales/opportunities" element={<OpportunityManagement />} />
        <Route path="/leads/sales/deals" element={<DealTracking />} />
        <Route path="/leads/sales/forecasting" element={<SalesForecasting />} />
        <Route path="/leads/sales/contracts" element={<ContractManagement />} />
        <Route path="/leads/sales/proposals" element={<ProposalManagement />} />

        {/* Automation & Workflows */}
        <Route path="/leads/automation/workflow-builder" element={<WorkflowBuilder />} />
        <Route path="/leads/automation/triggers" element={<TriggerEvents />} />
        <Route path="/leads/automation/conditions" element={<ConditionBuilder />} />
        <Route path="/leads/automation/actions" element={<ActionBlocks />} />
        <Route path="/leads/automation/templates/nurturing" element={<LeadNurturingTemplates />} />
        <Route path="/leads/automation/templates/followup" element={<FollowUpSequences />} />
        <Route path="/leads/automation/templates/welcome" element={<WelcomeSeries />} />
        <Route path="/leads/automation/analytics" element={<WorkflowAnalytics />} />
        <Route path="/leads/automation/logs" element={<AutomationLogs />} />
        <Route path="/leads/automation/metrics" element={<PerformanceMetrics />} />

        {/* Analytics & Reporting */}
        <Route path="/leads/analytics/dashboard" element={<LeadAnalyticsDashboard />} />
        <Route path="/leads/analytics/sales-dashboard" element={<SalesDashboard />} />
        <Route path="/leads/analytics/performance-dashboard" element={<PerformanceDashboard />} />
        <Route path="/leads/analytics/executive-dashboard" element={<ExecutiveDashboard />} />
        <Route path="/leads/analytics/report-builder" element={<ReportBuilder />} />
        <Route path="/leads/analytics/standard-reports" element={<StandardReports />} />
        <Route path="/leads/analytics/custom-reports" element={<CustomReports />} />
        <Route path="/leads/analytics/scheduled-reports" element={<ScheduledReports />} />
        <Route path="/leads/analytics/export-center" element={<ExportCenter />} />
        <Route path="/leads/analytics/backup" element={<DataBackup />} />
        <Route path="/leads/analytics/api" element={<APIAccess />} />
        <Route path="/leads/analytics/enrichment" element={<LeadEnrichmentAnalytics />} />

        {/* Data Management */}
        <Route path="/leads/master-data/lead-sources" element={<LeadSources />} />
        <Route path="/leads/master-data/lead-statuses" element={<LeadStatuses />} />
        <Route path="/leads/lead-statuses" element={<LeadStatuses />} />
        <Route path="/leads/master-data/lead-categories" element={<LeadCategories />} />
        <Route path="/leads/master-data/lead-stages" element={<LeadStages />} />
        <Route path="/leads/lead-stages" element={<LeadStages />} />
        <Route path="/leads/master-data/industries" element={<Industries />} />
        <Route path="/leads/master-data/company-sizes" element={<CompanySizes />} />
        <Route path="/leads/master-data/project-types" element={<ProjectTypes />} />
        <Route path="/leads/project-types" element={<ProjectTypes />} />
        <Route path="/leads/master-data/service-types" element={<ServiceTypes />} />
        <Route path="/leads/service-types" element={<ServiceTypes />} />
        <Route path="/leads/master-data/countries" element={<LocationMasters />} />
        <Route path="/leads/countries" element={<LocationMasters />} />
        <Route path="/leads/master-data/states" element={<LocationMasters />} />
        <Route path="/leads/states" element={<LocationMasters />} />
        <Route path="/leads/master-data/cities" element={<LocationMasters />} />
        <Route path="/leads/master-data/territories" element={<LocationMasters />} />
        <Route path="/leads/territories" element={<LocationMasters />} />
        <Route path="/leads/master-data/team-management" element={<TeamManagement />} />
        <Route path="/leads/master-data/assignment-rules" element={<AssignmentRules />} />
        <Route path="/leads/master-data/scoring-rules" element={<ScoringRules />} />

        {/* Data Quality */}
        <Route path="/leads/data-quality/duplicates" element={<DuplicateManagement />} />
        <Route path="/leads/data-quality/validation" element={<DataValidation />} />
        <Route path="/leads/data-quality/cleanup" element={<DataCleanup />} />

        {/* Additional Tools */}
        <Route path="/leads/additional/quote-generator" element={<QuoteGenerator />} />
        <Route path="/leads/additional/proposal-management" element={<ProposalManagement />} />
        <Route path="/leads/additional/meeting-scheduler" element={<MeetingScheduler />} />
        <Route path="/leads/additional/follow-up-manager" element={<FollowUpManager />} />
        <Route path="/leads/additional/task-management" element={<TaskManagement />} />
        <Route path="/leads/additional/activity-management" element={<ActivityManagement />} />
        <Route path="/leads/additional/document-management" element={<div>Document Management Page</div>} />
        <Route path="/leads/additional/campaign-manager" element={<CampaignManager />} />
        <Route path="/leads/additional/lead-tools" element={<LeadTools />} />
        <Route path="/leads/additional/bulk-operations" element={<BulkOperations />} />
        <Route path="/leads/additional/audit-trail" element={<AuditTrail />} />

        {/* Team & Collaboration */}
        <Route path="/leads/team/roles" element={<RolesPermissions />} />
        <Route path="/leads/team/performance" element={<TeamPerformance />} />
        <Route path="/leads/team/load-balancing" element={<LoadBalancing />} />
        <Route path="/leads/team/territories" element={<TerritoryManagement />} />
        <Route path="/leads/collaboration/notes" element={<SharedNotes />} />
        <Route path="/leads/collaboration/messaging" element={<InternalMessaging />} />
        <Route path="/leads/collaboration/handoffs" element={<LeadHandoffs />} />

        {/* Administration */}
        <Route path="/leads/admin/general-settings" element={<SystemConfiguration />} />
        <Route path="/leads/admin/email-settings" element={<EmailConfiguration />} />
        <Route path="/leads/admin/integrations" element={<Integrations />} />
        <Route path="/leads/admin/qualification" element={<QualificationCriteria />} />
        <Route path="/leads/admin/escalation" element={<EscalationRules />} />
        <Route path="/leads/admin/privacy" element={<DataPrivacy />} />
        <Route path="/leads/admin/access-logs" element={<AccessLogs />} />
        <Route path="/leads/admin/security" element={<SecuritySettings />} />
        <Route path="/leads/admin/system-health" element={<SystemHealth />} />
        <Route path="/leads/admin/performance" element={<PerformanceMonitoring />} />
        <Route path="/leads/admin/logs" element={<SystemLogs />} />

        {/* Settings */}
        <Route path="/leads/settings" element={<LeadManagementSettings />} />

        {/* Legacy routes for backward compatibility */}
        <Route path="/leads/import" element={<ImportLeadsPage />} />
        <Route path="/leads/:id/activities" element={<LeadActivitiesPage />} />
        <Route path="/leads/:id/communications" element={<LeadCommunicationsPage />} />
        <Route path="/leads/:id/convert" element={<ConvertLeadPage />} />
        <Route path="/leads/reports" element={<LeadReportsPage />} />
      </Route>
      
      <Route element={<RequireAuth />}>
        <Route element={<Demo3Layout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/dark-sidebar" element={<Demo1DarkSidebarPage />} />
          <Route
            path="/public-profile/profiles/default/"
            element={<ProfileDefaultPage />}
          />
          <Route
            path="/public-profile/profiles/creator"
            element={<ProfileCreatorPage />}
          />
          <Route
            path="/public-profile/profiles/company"
            element={<ProfileCompanyPage />}
          />
          <Route
            path="/public-profile/profiles/nft"
            element={<ProfileNFTPage />}
          />
          <Route
            path="/public-profile/profiles/blogger"
            element={<ProfileBloggerPage />}
          />
          <Route
            path="/public-profile/profiles/crm"
            element={<ProfileCRMPage />}
          />
          <Route
            path="/public-profile/profiles/gamer"
            element={<ProfileGamerPage />}
          />
          <Route
            path="/public-profile/profiles/feeds"
            element={<ProfileFeedsPage />}
          />
          <Route
            path="/public-profile/profiles/plain"
            element={<ProfilePlainPage />}
          />
          <Route
            path="/public-profile/profiles/modal"
            element={<ProfileModalPage />}
          />
          <Route
            path="/public-profile/projects/3-columns"
            element={<ProjectColumn3Page />}
          />
          <Route
            path="/public-profile/projects/2-columns"
            element={<ProjectColumn2Page />}
          />
          <Route path="/public-profile/works" element={<ProfileWorksPage />} />
          <Route path="/public-profile/teams" element={<ProfileTeamsPage />} />
          <Route
            path="/public-profile/network"
            element={<ProfileNetworkPage />}
          />
          <Route
            path="/public-profile/activity"
            element={<ProfileActivityPage />}
          />
          <Route
            path="/public-profile/campaigns/card"
            element={<CampaignsCardPage />}
          />
          <Route
            path="/public-profile/campaigns/list"
            element={<CampaignsListPage />}
          />
          <Route path="/public-profile/empty" element={<ProfileEmptyPage />} />
          <Route
            path="/account/home/get-started"
            element={<AccountGetStartedPage />}
          />
          <Route
            path="/account/home/user-profile"
            element={<AccountUserProfilePage />}
          />
          <Route
            path="/account/home/company-profile"
            element={<AccountCompanyProfilePage />}
          />
          <Route
            path="/account/home/settings-sidebar"
            element={<AccountSettingsSidebarPage />}
          />
          <Route
            path="/account/home/settings-enterprise"
            element={<AccountSettingsEnterprisePage />}
          />
          <Route
            path="/account/home/settings-plain"
            element={<AccountSettingsPlainPage />}
          />
          <Route
            path="/account/home/settings-modal"
            element={<AccountSettingsModalPage />}
          />
          <Route path="/account/billing/basic" element={<AccountBasicPage />} />
          <Route
            path="/account/billing/enterprise"
            element={<AccountEnterprisePage />}
          />
          <Route path="/account/billing/plans" element={<AccountPlansPage />} />
          <Route
            path="/account/billing/history"
            element={<AccountHistoryPage />}
          />
          <Route
            path="/account/security/get-started"
            element={<AccountSecurityGetStartedPage />}
          />
          <Route
            path="/account/security/overview"
            element={<AccountOverviewPage />}
          />
          <Route
            path="/account/security/allowed-ip-addresses"
            element={<AccountAllowedIPAddressesPage />}
          />
          <Route
            path="/account/security/privacy-settings"
            element={<AccountPrivacySettingsPage />}
          />
          <Route
            path="/account/security/device-management"
            element={<AccountDeviceManagementPage />}
          />
          <Route
            path="/account/security/backup-and-recovery"
            element={<AccountBackupAndRecoveryPage />}
          />
          <Route
            path="/account/security/current-sessions"
            element={<AccountCurrentSessionsPage />}
          />
          <Route
            path="/account/security/security-log"
            element={<AccountSecurityLogPage />}
          />
          <Route
            path="/account/members/team-starter"
            element={<AccountTeamsStarterPage />}
          />
          <Route path="/account/members/teams" element={<AccountTeamsPage />} />
          <Route
            path="/account/members/team-info"
            element={<AccountTeamInfoPage />}
          />
          <Route
            path="/account/members/members-starter"
            element={<AccountMembersStarterPage />}
          />
          <Route
            path="/account/members/team-members"
            element={<AccountTeamMembersPage />}
          />
          <Route
            path="/account/members/import-members"
            element={<AccountImportMembersPage />}
          />
          <Route path="/account/members/roles" element={<AccountRolesPage />} />
          <Route
            path="/account/members/permissions-toggle"
            element={<AccountPermissionsTogglePage />}
          />
          <Route
            path="/account/members/permissions-check"
            element={<AccountPermissionsCheckPage />}
          />
          <Route
            path="/account/integrations"
            element={<AccountIntegrationsPage />}
          />
          <Route
            path="/account/notifications"
            element={<AccountNotificationsPage />}
          />
          <Route path="/account/api-keys" element={<AccountApiKeysPage />} />
          <Route
            path="/account/appearance"
            element={<AccountAppearancePage />}
          />
          <Route
            path="/account/invite-a-friend"
            element={<AccountInviteAFriendPage />}
          />
          <Route path="/account/activity" element={<AccountActivityPage />} />
          <Route
            path="/network/get-started"
            element={<NetworkGetStartedPage />}
          />
          <Route
            path="/network/user-cards/mini-cards"
            element={<NetworkMiniCardsPage />}
          />
          <Route
            path="/network/user-cards/team-crew"
            element={<NetworkUserCardsTeamCrewPage />}
          />
          <Route
            path="/network/user-cards/author"
            element={<NetworkAuthorPage />}
          />
          <Route path="/network/user-cards/nft" element={<NetworkNFTPage />} />
          <Route
            path="/network/user-cards/social"
            element={<NetworkSocialPage />}
          />
          <Route
            path="/network/user-table/team-crew"
            element={<NetworkUserTableTeamCrewPage />}
          />
          <Route
            path="/network/user-table/app-roster"
            element={<NetworkAppRosterPage />}
          />
          <Route
            path="/network/user-table/market-authors"
            element={<NetworkMarketAuthorsPage />}
          />
          <Route
            path="/network/user-table/saas-users"
            element={<NetworkSaasUsersPage />}
          />
          <Route
            path="/network/user-table/store-clients"
            element={<NetworkStoreClientsPage />}
          />
          <Route
            path="/network/user-table/visitors"
            element={<NetworkVisitorsPage />}
          />
          <Route
            path="/auth/welcome-message"
            element={<AuthWelcomeMessagePage />}
          />
          <Route
            path="/auth/account-deactivated"
            element={<AuthAccountDeactivatedPage />}
          />
          <Route path="/store-client/home" element={<StoreClientPage />} />
          <Route
            path="/store-client/search-results-grid"
            element={<SearchResultsGridPage />}
          />
          <Route
            path="/store-client/search-results-list"
            element={<SearchResultsListPage />}
          />
          <Route
            path="/store-client/product-details"
            element={<ProductDetailsPage />}
          />
          <Route path="/store-client/wishlist" element={<WishlistPage />} />
          <Route
            path="/store-client/checkout/order-summary"
            element={<OrderSummaryPage />}
          />
          <Route
            path="/store-client/checkout/shipping-info"
            element={<ShippingInfoPage />}
          />
          <Route
            path="/store-client/checkout/payment-method"
            element={<PaymentMethodPage />}
          />
          <Route
            path="/store-client/checkout/order-placed"
            element={<OrderPlacedPage />}
          />
          <Route path="/store-client/my-orders" element={<MyOrdersPage />} />
          <Route
            path="/store-client/order-receipt"
            element={<OrderReceiptPage />}
          />
          <Route path="/store-admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/store-admin/inventory/all-products"
            element={<AllProductsPage />}
          />
          <Route path="/auth/get-started" element={<AccountGetStartedPage />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorRouting />} />
      <Route path="auth/*" element={<AuthRouting />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
}

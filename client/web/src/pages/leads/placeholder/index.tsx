import React from 'react';
import { useLocation } from 'react-router-dom';

export const PlaceholderPage: React.FC<{ title?: string }> = ({ title }) => {
  const location = useLocation();
  const pageTitle = title || location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page';
  
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 capitalize mb-2">
          {pageTitle}
        </h2>
        <p className="text-gray-500">This page is under construction</p>
        <p className="text-sm text-gray-400 mt-2">{location.pathname}</p>
      </div>
    </div>
  );
};

// Export individual placeholder components for each route
export const LeadConversionWizard = () => <PlaceholderPage title="Lead Conversion Wizard" />;
export const ServiceTypes = () => <PlaceholderPage title="Service Types" />;

// Sales components
export const OpportunityManagement = () => <PlaceholderPage title="Opportunity Management" />;
export const DealTracking = () => <PlaceholderPage title="Deal Tracking" />;
export const SalesForecasting = () => <PlaceholderPage title="Sales Forecasting" />;
export const ContractManagement = () => <PlaceholderPage title="Contract Management" />;
export const ProposalManagement = () => <PlaceholderPage title="Proposal Management" />;

// Automation components  
export const WorkflowBuilder = () => <PlaceholderPage title="Workflow Builder" />;
export const TriggerEvents = () => <PlaceholderPage title="Trigger Events" />;
export const ConditionBuilder = () => <PlaceholderPage title="Condition Builder" />;
export const ActionBlocks = () => <PlaceholderPage title="Action Blocks" />;
export const LeadNurturingTemplates = () => <PlaceholderPage title="Lead Nurturing Templates" />;
export const FollowUpSequences = () => <PlaceholderPage title="Follow-up Sequences" />;
export const WelcomeSeries = () => <PlaceholderPage title="Welcome Series" />;
export const WorkflowAnalytics = () => <PlaceholderPage title="Workflow Analytics" />;
export const AutomationLogs = () => <PlaceholderPage title="Automation Logs" />;
export const PerformanceMetrics = () => <PlaceholderPage title="Performance Metrics" />;

// Analytics components
export const SalesDashboard = () => <PlaceholderPage title="Sales Dashboard" />;
export const PerformanceDashboard = () => <PlaceholderPage title="Performance Dashboard" />;
export const ExecutiveDashboard = () => <PlaceholderPage title="Executive Dashboard" />;
export const ReportBuilder = () => <PlaceholderPage title="Report Builder" />;
export const StandardReports = () => <PlaceholderPage title="Standard Reports" />;
export const CustomReports = () => <PlaceholderPage title="Custom Reports" />;
export const ScheduledReports = () => <PlaceholderPage title="Scheduled Reports" />;
export const ExportCenter = () => <PlaceholderPage title="Export Center" />;
export const DataBackup = () => <PlaceholderPage title="Data Backup" />;
export const APIAccess = () => <PlaceholderPage title="API Access" />;
export const LeadEnrichmentAnalytics = () => <PlaceholderPage title="Lead Enrichment Analytics" />;

// Data Quality components
export const DuplicateManagement = () => <PlaceholderPage title="Duplicate Management" />;
export const DataValidation = () => <PlaceholderPage title="Data Validation" />;
export const DataCleanup = () => <PlaceholderPage title="Data Cleanup" />;

// Additional components
export const FollowUpManager = () => <PlaceholderPage title="Follow-up Manager" />;
export const TaskManagement = () => <PlaceholderPage title="Task Management" />;
export const CampaignManager = () => <PlaceholderPage title="Campaign Manager" />;
export const LeadTools = () => <PlaceholderPage title="Lead Tools" />;
export const BulkOperations = () => <PlaceholderPage title="Bulk Operations" />;
export const AuditTrail = () => <PlaceholderPage title="Audit Trail" />;

// Team components
export const RolesPermissions = () => <PlaceholderPage title="Roles & Permissions" />;
export const TeamPerformance = () => <PlaceholderPage title="Team Performance" />;
export const LoadBalancing = () => <PlaceholderPage title="Load Balancing" />;
export const TerritoryManagement = () => <PlaceholderPage title="Territory Management" />;
export const SharedNotes = () => <PlaceholderPage title="Shared Notes" />;
export const InternalMessaging = () => <PlaceholderPage title="Internal Messaging" />;
export const LeadHandoffs = () => <PlaceholderPage title="Lead Handoffs" />;

// Admin components
export const SystemConfiguration = () => <PlaceholderPage title="System Configuration" />;
export const EmailConfiguration = () => <PlaceholderPage title="Email Configuration" />;
export const Integrations = () => <PlaceholderPage title="Integrations" />;
export const QualificationCriteria = () => <PlaceholderPage title="Qualification Criteria" />;
export const EscalationRules = () => <PlaceholderPage title="Escalation Rules" />;
export const DataPrivacy = () => <PlaceholderPage title="Data Privacy" />;
export const AccessLogs = () => <PlaceholderPage title="Access Logs" />;
export const SecuritySettings = () => <PlaceholderPage title="Security Settings" />;
export const SystemHealth = () => <PlaceholderPage title="System Health" />;
export const PerformanceMonitoring = () => <PlaceholderPage title="Performance Monitoring" />;
export const SystemLogs = () => <PlaceholderPage title="System Logs" />;

// Forms components
export const FormsOverview = () => <PlaceholderPage title="Forms Overview" />;
export const FormBuilder = () => <PlaceholderPage title="Form Builder" />;
export const FormFields = () => <PlaceholderPage title="Form Fields" />;
export const FormDesignLayout = () => <PlaceholderPage title="Form Design Layout" />;
export const FormSettings = () => <PlaceholderPage title="Form Settings" />;
export const FormTemplates = () => <PlaceholderPage title="Form Templates" />;
export const MultiStepForm = () => <PlaceholderPage title="Multi-Step Form" />;
export const ConditionalLogic = () => <PlaceholderPage title="Conditional Logic" />;
export const FormVersioning = () => <PlaceholderPage title="Form Versioning" />;
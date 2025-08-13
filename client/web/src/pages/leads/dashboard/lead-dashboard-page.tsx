import { Helmet } from 'react-helmet-async';
import { LeadDashboardContent } from './lead-dashboard-content';

export function LeadDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Lead Management Dashboard</title>
      </Helmet>
      <LeadDashboardContent />
    </>
  );
}
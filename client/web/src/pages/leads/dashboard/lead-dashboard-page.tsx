import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/common/container';
import { LeadDashboardContent } from './lead-dashboard-content';

export function LeadDashboardPage() {
  return (
    <>
      <Helmet>
        <title>Lead Management Dashboard</title>
      </Helmet>
      <Container>
        <LeadDashboardContent />
      </Container>
    </>
  );
}
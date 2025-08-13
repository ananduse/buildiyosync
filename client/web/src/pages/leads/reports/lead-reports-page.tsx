import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/common/container';
import { LeadReportsContent } from './lead-reports-content';

export function LeadReportsPage() {
  return (
    <>
      <Helmet>
        <title>Lead Reports & Analytics - Lead Management</title>
      </Helmet>
      <Container>
        <LeadReportsContent />
      </Container>
    </>
  );
}
import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/common/container';
import { AllLeadsContent } from './all-leads-content';

export function AllLeadsPage() {
  return (
    <>
      <Helmet>
        <title>All Leads - Lead Management</title>
      </Helmet>
      <Container>
        <AllLeadsContent />
      </Container>
    </>
  );
}
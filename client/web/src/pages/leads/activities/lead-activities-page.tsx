import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/common/container';
import { LeadActivitiesContent } from './lead-activities-content';

export function LeadActivitiesPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Lead Activities Timeline - Lead Management</title>
      </Helmet>
      <Container>
        <LeadActivitiesContent leadId={id || ''} />
      </Container>
    </>
  );
}
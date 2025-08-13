import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Container } from '@/components/common/container';
import { LeadCommunicationsContent } from './lead-communications-content';

export function LeadCommunicationsPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Lead Communications Hub - Lead Management</title>
      </Helmet>
      <Container>
        <LeadCommunicationsContent leadId={id || ''} />
      </Container>
    </>
  );
}
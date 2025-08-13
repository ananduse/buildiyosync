import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { LeadDetailContent } from './lead-detail-content';

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Lead Details - Lead Management</title>
      </Helmet>
      <LeadDetailContent leadId={id || ''} />
    </>
  );
}
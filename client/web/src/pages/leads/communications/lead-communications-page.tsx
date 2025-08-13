import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { LeadCommunicationsContent } from './lead-communications-content';

export function LeadCommunicationsPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Lead Communications Hub - Lead Management</title>
      </Helmet>
      <div className="w-full px-4 lg:px-6">
        <LeadCommunicationsContent leadId={id || ''} />
      </div>
    </>
  );
}
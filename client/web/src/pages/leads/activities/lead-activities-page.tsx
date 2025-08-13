import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { LeadActivitiesContent } from './lead-activities-content';

export function LeadActivitiesPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Lead Activities Timeline - Lead Management</title>
      </Helmet>
      <div className="w-full px-4 lg:px-6">
        <LeadActivitiesContent leadId={id || ''} />
      </div>
    </>
  );
}
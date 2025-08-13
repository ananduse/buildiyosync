import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { ConvertLeadContent } from './convert-lead-content';

export function ConvertLeadPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Convert Lead to Project - Lead Management</title>
      </Helmet>
      <ConvertLeadContent leadId={id || ''} />
    </>
  );
}
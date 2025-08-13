import { Helmet } from 'react-helmet-async';
import { AddLeadContent } from './add-lead-content';

export function AddLeadPage() {
  return (
    <>
      <Helmet>
        <title>Add New Lead - Lead Management</title>
      </Helmet>
      <AddLeadContent />
    </>
  );
}
import { Helmet } from 'react-helmet-async';
import { ImportLeadsContent } from './import-leads-content';

export function ImportLeadsPage() {
  return (
    <>
      <Helmet>
        <title>Import Leads - Lead Management</title>
      </Helmet>
      <ImportLeadsContent />
    </>
  );
}
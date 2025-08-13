import { Helmet } from 'react-helmet-async';
import { AllLeadsContent } from './all-leads-content';

export function AllLeadsPage() {
  return (
    <>
      <Helmet>
        <title>All Leads - Lead Management</title>
      </Helmet>
      <div className="w-full px-4 lg:px-6">
        <AllLeadsContent />
      </div>
    </>
  );
}
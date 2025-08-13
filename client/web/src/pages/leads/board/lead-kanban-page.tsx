import { Helmet } from 'react-helmet-async';
import { LeadKanbanContent } from './lead-kanban-content';

export function LeadKanbanPage() {
  return (
    <>
      <Helmet>
        <title>Lead Kanban Board - Lead Management</title>
      </Helmet>
      <div className="w-full px-4 lg:px-6">
        <LeadKanbanContent />
      </div>
    </>
  );
}
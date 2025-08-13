import { Helmet } from 'react-helmet-async';
import { Container } from '@/components/common/container';
import { LeadKanbanContent } from './lead-kanban-content';

export function LeadKanbanPage() {
  return (
    <>
      <Helmet>
        <title>Lead Kanban Board - Lead Management</title>
      </Helmet>
      <Container>
        <LeadKanbanContent />
      </Container>
    </>
  );
}
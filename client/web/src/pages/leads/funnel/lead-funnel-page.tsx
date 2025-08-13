import { Container } from '@/components/common/container';
import { LeadFunnelContent } from './lead-funnel-content';

export function LeadFunnelPage() {
  return (
    <Container className="grid gap-5 lg:gap-7.5">
      <LeadFunnelContent />
    </Container>
  );
}
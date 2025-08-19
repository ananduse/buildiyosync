import { LayoutProvider } from './components/layout-context';
import { LEADS_NAV } from '../config/app.config';
import { Layout } from './components/layout';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LeadLayoutNewProps {
  children?: React.ReactNode;
}

export default function LeadLayoutNew({ children }: LeadLayoutNewProps) {
  return (
    <TooltipProvider>
      <LayoutProvider sidebarNavItems={LEADS_NAV}>
        <Layout>
          {children}
        </Layout>
      </LayoutProvider>
    </TooltipProvider>
  );
}
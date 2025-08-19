
import { LayoutProvider } from './components/layout-context';
import { MAIN_NAV } from '@/crm/config/app.config';
import { Layout } from './components/layout';

export function DefaultLayout() {
  return (
    <LayoutProvider sidebarNavItems={MAIN_NAV}>
      <Layout/>
    </LayoutProvider>
  );
}

import { LayoutProvider } from './components/layout-context';
import { ProjectLayout } from './components/layout';

export function ProjectLayoutWithProvider({ children }: { children?: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ProjectLayout>{children}</ProjectLayout>
    </LayoutProvider>
  );
}

export { ProjectLayout } from './components/layout';
export { LayoutProvider } from './components/layout-context';
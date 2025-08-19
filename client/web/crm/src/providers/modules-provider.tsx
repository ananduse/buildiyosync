import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ScreenLoader } from '@/components/screen-loader';
const LazyCrmModule = lazy(() => import('@/crm'));

export function ModulesProvider() {
  const location = useLocation();
  const path = location.pathname;

  // Detect if current path is for CRM or Store
  const isCrm = path.startsWith('/crm');

  if (isCrm) {
    return (
      <Routes>
        <Route
          path="/crm/*"
          element={
            <Suspense fallback={<ScreenLoader/>}>
              <LazyCrmModule />
            </Suspense>
          }
        />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/crm" replace />} />
      </Routes>
    );
  }
}


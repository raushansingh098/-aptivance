import React, { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/common/AuthModal';
import { LandingPage } from './components/marketing/LandingPage';

const MainContent = lazy(() => import('./components/app/MainContent'));

export function App() {
  return (
    <AppProvider>
      <AppSession />
    </AppProvider>
  );
}

const AppSession: React.FC = () => {
  const { isAuthenticated } = useApp();

  return (
    <>
      {isAuthenticated ? (
        <Suspense
          fallback={
            <div
              className="flex min-h-screen items-center justify-center bg-[#f4f7f6] text-sm font-semibold text-slate-600"
              role="status"
            >
              Opening your Aptivance workspace…
            </div>
          }
        >
          <MainContent />
        </Suspense>
      ) : (
        <LandingPage />
      )}
      <AuthModal />
      <ToastContainer />
    </>
  );
};

export default App;

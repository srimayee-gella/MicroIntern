import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { FindProjectsPage } from './pages/FindProjectsPage';
import { ForBusinessesPage } from './pages/ForBusinessesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectDetailsModal } from './components/projects/ProjectDetailsModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { BusinessDashboard } from './components/business/BusinessDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';

const AppContent = () => {
  const { currentPage, selectedProjectId, navigateTo } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'find-projects':
        return <FindProjectsPage />;
      case 'project-details':
        return (
          <ProjectDetailsModal
            projectId={selectedProjectId}
            onBack={() => navigateTo('find-projects')}
          />
        );
      case 'for-businesses':
        return <ForBusinessesPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'about':
        return <AboutPage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'business-dashboard':
        return <BusinessDashboard />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      default:
        return <LandingPage />;
    }
  };

  const isDashboardView = currentPage === 'student-dashboard' || currentPage === 'business-dashboard';

  return (
    <div className="flex flex-col min-h-screen">
      <DemoBanner />
      <Navbar />
      <div className="flex-1">
        {renderPage()}
      </div>
      {!isDashboardView && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ToastProvider>
  );
}

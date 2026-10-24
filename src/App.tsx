import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/common/AuthModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { SkillProfileView } from './components/profile/SkillProfileView';
import { TargetRolesView } from './components/roles/TargetRolesView';
import { GapAnalysisView } from './components/gap-analysis/GapAnalysisView';
import { SelfAssessmentView } from './components/assessment/SelfAssessmentView';
import { RecommendationsView } from './components/recommendations/RecommendationsView';
import { ProgressTrackerView } from './components/progress/ProgressTrackerView';
import { ReportView } from './components/reports/ReportView';
import { SkillTaxonomyAdminView } from './components/taxonomy/SkillTaxonomyAdminView';
import { SettingsView } from './components/settings/SettingsView';
import { QuizzesView } from './components/quizzes/QuizzesView';
import { MentorView } from './components/mentor/MentorView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-60 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 px-4 sm:px-8 py-5 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'profile' && <SkillProfileView />}
          {activeTab === 'roles' && <TargetRolesView />}
          {activeTab === 'gap-analysis' && <GapAnalysisView />}
          {activeTab === 'recommendations' && <RecommendationsView />}
          {activeTab === 'assessment' && <SelfAssessmentView />}
          {activeTab === 'quizzes' && <QuizzesView />}
          {activeTab === 'roadmap' && <ProgressTrackerView />}
          {activeTab === 'progress' && <ProgressTrackerView />}
          {activeTab === 'reports' && <ReportView />}
          {activeTab === 'mentor' && <MentorView />}
          {activeTab === 'taxonomy' && <SkillTaxonomyAdminView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Global Interactive Utilities */}
      <CommandPalette />
      <ToastContainer />
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;

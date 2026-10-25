import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';
import { CommandPalette } from '../common/CommandPalette';
import { DashboardView } from '../dashboard/DashboardView';
import { SkillProfileView } from '../profile/SkillProfileView';
import { TargetRolesView } from '../roles/TargetRolesView';
import { GapAnalysisView } from '../gap-analysis/GapAnalysisView';
import { SelfAssessmentView } from '../assessment/SelfAssessmentView';
import { RecommendationsView } from '../recommendations/RecommendationsView';
import { ProgressTrackerView } from '../progress/ProgressTrackerView';
import { ReportView } from '../reports/ReportView';
import { SkillTaxonomyAdminView } from '../taxonomy/SkillTaxonomyAdminView';
import { SettingsView } from '../settings/SettingsView';
import { QuizzesView } from '../quizzes/QuizzesView';
import { MentorView } from '../mentor/MentorView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex">
      <Sidebar />

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

      <CommandPalette />
    </div>
  );
};

export default MainContent;

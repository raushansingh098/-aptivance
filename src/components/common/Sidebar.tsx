import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { 
  LayoutDashboard, 
  Briefcase, 
  Sliders, 
  Sparkles, 
  ClipboardCheck, 
  BookOpen, 
  Milestone, 
  FileText, 
  Layers, 
  Settings, 
  X,
  Target,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  HelpCircle,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    activeRole, 
    gapAnalysis, 
    isMobileSidebarOpen, 
    setIsMobileSidebarOpen,
    sidebarTheme,
    setSidebarTheme
  } = useApp();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const isDark = sidebarTheme === 'dark-navy';

  const navItemClass = (tab: ActiveTab) => {
    const isActive = activeTab === tab;
    if (isDark) {
      return `group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
        isActive
          ? 'bg-[#14323b] text-[#2dd4bf] shadow-sm'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
      }`;
    }
    return `group flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-[#e8f7f0] text-[#00875a] shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
    }`;
  };

  const iconClass = (tab: ActiveTab) => {
    const isActive = activeTab === tab;
    if (isDark) {
      return `w-4 h-4 transition-colors ${
        isActive ? 'text-[#2dd4bf]' : 'text-slate-400 group-hover:text-slate-200'
      }`;
    }
    return `w-4 h-4 transition-colors ${
      isActive ? 'text-[#00875a]' : 'text-slate-400 group-hover:text-slate-600'
    }`;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 border-r flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isDark 
            ? 'bg-[#091124] border-slate-800/80 text-white' 
            : 'bg-white border-slate-200/80 text-slate-800'
        } ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${
          isDark ? 'border-slate-800/70' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00875a] to-[#2dd4bf] flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">Aptivance</span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items (Exact order from screenshots 2, 3, 4, 5) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full ${navItemClass('dashboard')}`}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className={iconClass('dashboard')} />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('profile')}
            className={`w-full ${navItemClass('profile')}`}
          >
            <div className="flex items-center gap-3">
              <Sliders className={iconClass('profile')} />
              <span>My Skills</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('roles')}
            className={`w-full ${navItemClass('roles')}`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className={iconClass('roles')} />
              <span>Career Roles</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('gap-analysis')}
            className={`w-full ${navItemClass('gap-analysis')}`}
          >
            <div className="flex items-center gap-3">
              <Target className={iconClass('gap-analysis')} />
              <span>Gap Analysis</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('recommendations')}
            className={`w-full ${navItemClass('recommendations')}`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className={iconClass('recommendations')} />
              <span>Recommendations</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('assessment')}
            className={`w-full ${navItemClass('assessment')}`}
          >
            <div className="flex items-center gap-3">
              <ClipboardCheck className={iconClass('assessment')} />
              <span>Assessment</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('quizzes')}
            className={`w-full ${navItemClass('quizzes')}`}
          >
            <div className="flex items-center gap-3">
              <CheckSquare className={iconClass('quizzes')} />
              <span>Quizzes</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-teal-900/60 text-teal-300">
              New
            </span>
          </button>

          <button
            onClick={() => handleNavClick('roadmap')}
            className={`w-full ${navItemClass('roadmap')}`}
          >
            <div className="flex items-center gap-3">
              <Calendar className={iconClass('roadmap')} />
              <span>Roadmap</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('progress')}
            className={`w-full ${navItemClass('progress')}`}
          >
            <div className="flex items-center gap-3">
              <TrendingUp className={iconClass('progress')} />
              <span>Progress</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('reports')}
            className={`w-full ${navItemClass('reports')}`}
          >
            <div className="flex items-center gap-3">
              <FileText className={iconClass('reports')} />
              <span>Reports</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('mentor')}
            className={`w-full ${navItemClass('mentor')}`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className={iconClass('mentor')} />
              <span>Mentor</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-900/60 text-emerald-300">
              AI
            </span>
          </button>

          <button
            onClick={() => handleNavClick('taxonomy')}
            className={`w-full ${navItemClass('taxonomy')}`}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className={iconClass('taxonomy')} />
              <span>Admin</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('settings')}
            className={`w-full ${navItemClass('settings')}`}
          >
            <div className="flex items-center gap-3">
              <Settings className={iconClass('settings')} />
              <span>Settings</span>
            </div>
          </button>
        </div>

        {/* Bottom Theme & Target Role Card */}
        <div className={`p-3 border-t ${isDark ? 'border-slate-800/70' : 'border-slate-100'}`}>
          <div className={`p-3 rounded-2xl ${
            isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-emerald-50 border border-emerald-100'
          }`}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Target Role
              </span>
              <span className={`font-bold ${isDark ? 'text-[#2dd4bf]' : 'text-emerald-700'}`}>
                {gapAnalysis.overallMatchPercentage}%
              </span>
            </div>
            <p className="text-xs font-bold truncate mb-2">
              {activeRole.title}
            </p>
            <button
              onClick={() => handleNavClick('gap-analysis')}
              className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                isDark 
                  ? 'bg-[#14323b] text-[#2dd4bf] hover:bg-[#1a424e]' 
                  : 'bg-white text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <span>View Analysis</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

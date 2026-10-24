import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Briefcase, 
  Sparkles, 
  BookOpen, 
  Target, 
  Layers, 
  ArrowRight,
  Sliders
} from 'lucide-react';
import { ActiveTab } from '../../types';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    setActiveTab, 
    roles, 
    skills, 
    recommendations,
    setTargetRole 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredRoles = roles.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSkills = skills.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRecs = recommendations.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.skillName.toLowerCase().includes(query.toLowerCase())
  );

  const navigationPages: { name: string; tab: ActiveTab; icon: any }[] = [
    { name: 'Dashboard Overview', tab: 'dashboard', icon: Sparkles },
    { name: 'Student Skill Profile', tab: 'profile', icon: Sliders },
    { name: 'Target Roles Catalog', tab: 'roles', icon: Briefcase },
    { name: 'Skill Gap Analysis', tab: 'gap-analysis', icon: Target },
    { name: 'Self-Assessment Wizard', tab: 'assessment', icon: Sparkles },
    { name: 'Personalized Recommendations', tab: 'recommendations', icon: BookOpen },
    { name: 'Progress & Roadmap Tracker', tab: 'progress', icon: Target },
    { name: 'Reports & Export', tab: 'reports', icon: Sparkles },
    { name: 'Skill Taxonomy Manager (Admin)', tab: 'taxonomy', icon: Layers },
  ];

  const filteredPages = navigationPages.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectPage = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
  };

  const handleSelectRole = (roleId: string) => {
    setTargetRole(roleId);
    setActiveTab('gap-analysis');
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCommandPaletteOpen(false)}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, target roles, courses, or jump to page..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Pages */}
          {filteredPages.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Navigate
              </div>
              <div className="space-y-1">
                {filteredPages.slice(0, 4).map(page => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.tab}
                      onClick={() => handleSelectPage(page.tab)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-emerald-600" />
                        <span>{page.name}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Roles */}
          {filteredRoles.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Target Roles
              </div>
              <div className="space-y-1">
                {filteredRoles.slice(0, 4).map(role => (
                  <button
                    key={role.id}
                    onClick={() => handleSelectRole(role.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-900 transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                      <div className="text-left">
                        <p className="font-semibold">{role.title}</p>
                        <p className="text-[11px] text-slate-400">{role.category} • {role.salaryRange}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 font-medium">
                      Analyze Role
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {filteredSkills.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Skills Taxonomy
              </div>
              <div className="space-y-1">
                {filteredSkills.slice(0, 4).map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => {
                      setActiveTab('profile');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-indigo-500" />
                      <div className="text-left">
                        <span className="font-medium">{skill.name}</span>
                        <span className="ml-2 text-[11px] text-slate-400">({skill.category})</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">View in Profile</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {filteredRecs.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Learning Recommendations
              </div>
              <div className="space-y-1">
                {filteredRecs.slice(0, 3).map(rec => (
                  <button
                    key={rec.id}
                    onClick={() => {
                      setActiveTab('recommendations');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      <span className="truncate">{rec.title}</span>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                      {rec.provider}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && filteredRoles.length === 0 && filteredSkills.length === 0 && filteredRecs.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              No matching skills, roles, or actions found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded">ESC</kbd> to exit</span>
          </div>
          <span>Antigravity Career System</span>
        </div>
      </div>
    </div>
  );
};

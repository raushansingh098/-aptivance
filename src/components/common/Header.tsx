import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Menu, 
  ChevronDown, 
  LogIn,
  Sun,
  Moon
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentStudent, 
    roles,
    activeRole,
    setTargetRole,
    setIsMobileSidebarOpen, 
    setIsCommandPaletteOpen,
    setIsAuthModalOpen,
    setAuthMode,
    sidebarTheme,
    setSidebarTheme,
    showToast,
    isAuthenticated,
    logoutUser,
    isSyncing
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#f4f7f6]/95 backdrop-blur-md px-4 sm:px-8 pt-4 pb-3 border-b border-slate-200/50">
      {/* Top Bar Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Welcome Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 lg:hidden shadow-xs"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hi {currentStudent.name}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Target role: <span className="font-bold text-slate-800">{activeRole.title}</span>
            </p>
          </div>
        </div>

        {/* Right Controls: Role Selector, Search, Auth, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role Quick Selector Dropdown (Matching screenshot 2 & 5) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs hover:border-slate-300 transition"
            >
              <span>{activeRole.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                  Select Target Role
                </span>
                <div className="space-y-1">
                  {roles.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setTargetRole(r.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        r.id === activeRole.id
                          ? 'bg-teal-50 text-teal-800 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Search Shortcut */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-700 hover:border-slate-300 shadow-xs transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="px-1 py-0.5 text-[10px] bg-slate-100 text-slate-500 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Theme switcher */}
          <button
            onClick={() => {
              const next = sidebarTheme === 'dark-navy' ? 'light' : 'dark-navy';
              setSidebarTheme(next);
              showToast(`Switched to ${next === 'dark-navy' ? 'Dark Navy' : 'Light'} sidebar theme`);
            }}
            title="Toggle Sidebar Theme"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
          >
            {sidebarTheme === 'dark-navy' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => {
                void logoutUser();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:border-slate-300 shadow-xs transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('register');
                setIsAuthModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-xs transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSyncing ? 'Syncing' : 'Account'}</span>
            </button>
          )}

          <div className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 bg-white border border-slate-200 rounded-xl shadow-xs">
            <img
              src={currentStudent.avatarUrl}
              alt={currentStudent.name}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <span className="hidden sm:inline text-xs font-bold text-slate-800">
              {currentStudent.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

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
    <header className="aptivance-app-header sticky top-0 z-30 px-4 sm:px-8 pt-4 pb-3">
      {/* Top Bar Row */}
      <div className="aptivance-header-inner flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Welcome Greeting */}
        <div className="aptivance-header-greeting flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="aptivance-header-menu p-2 rounded-xl lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="aptivance-greeting-title text-xl sm:text-2xl font-black tracking-tight">
              Hi {currentStudent.name}
            </h1>
            <p className="aptivance-greeting-subtitle text-xs font-medium">
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
              className="aptivance-role-selector flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <span className="aptivance-role-label">Target role</span>
              <span className="aptivance-role-name">{activeRole.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="aptivance-role-menu absolute right-0 mt-2 w-56 rounded-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <span className="aptivance-menu-label text-[10px] font-bold uppercase tracking-wider px-2 py-1 block">
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
                          ? 'aptivance-role-option-active font-bold'
                          : 'aptivance-role-option'
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
            className="aptivance-search hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd             className="aptivance-search-shortcut px-1 py-0.5 text-[10px] rounded border">
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
            aria-label="Toggle sidebar theme"
            className="aptivance-header-icon p-2 rounded-xl"
          >
            {sidebarTheme === 'dark-navy' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => {
                void logoutUser();
              }}
              className="aptivance-signout flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition"
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
              className="aptivance-account-button flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSyncing ? 'Syncing' : 'Account'}</span>
            </button>
          )}

          <div className="aptivance-user-chip flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-xl">
            <img
              src={currentStudent.avatarUrl}
              alt={currentStudent.name}
              className="w-7 h-7 rounded-lg object-cover"
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

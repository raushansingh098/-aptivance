import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  User, 
  Send, 
  ArrowRight, 
  Target, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const MentorView: React.FC = () => {
  const { 
    currentStudent, 
    activeRole, 
    gapAnalysis, 
    mentorMessages, 
    sendMentorMessage, 
    setActiveTab, 
    showToast 
  } = useApp();

  const [activeMentorTab, setActiveMentorTab] = useState<'dashboard' | 'ai-chat'>('dashboard');
  const [inputQuery, setInputQuery] = useState('');

  // Check if current student has granted access to any mentors
  const grantedMentors = currentStudent.grantedMentors || [];
  const hasGrantedStudents = grantedMentors.length > 0;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendMentorMessage(inputQuery);
    setInputQuery('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* View Switcher: Mentor Dashboard (Faculty) vs AI Career Coach */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveMentorTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeMentorTab === 'dashboard'
              ? 'bg-[#14323b] text-[#2dd4bf] shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Mentor Dashboard</span>
        </button>

        <button
          onClick={() => setActiveMentorTab('ai-chat')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeMentorTab === 'ai-chat'
              ? 'bg-[#14323b] text-[#2dd4bf] shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Career Mentor (Interactive Chat)</span>
        </button>
      </div>

      {activeMentorTab === 'dashboard' ? (
        /* Mentor Dashboard matching Screenshot 1 (media_1792789455435_dbb19b55.png) */
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Mentor Dashboard
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              You only see students who have granted you access.
            </p>
          </div>

          {!hasGrantedStudents ? (
            /* Empty State Container matching Screenshot 1 */
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-xs text-slate-700 leading-relaxed">
              No students have granted you access yet. Students can add you by email from their Settings page.
            </div>
          ) : (
            /* Granted Students View */
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Students who granted you access:
              </h3>

              <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-sm">
                    {currentStudent.name.split(' ').map(p => p[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{currentStudent.name}</h4>
                    <p className="text-xs text-slate-500">{currentStudent.email} • Target: <strong className="text-slate-800">{activeRole.title}</strong></p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-teal-800">{gapAnalysis.overallMatchPercentage}% match</span>
                    <span className="block text-[10px] text-slate-400">{gapAnalysis.priorityGaps.length} priority gaps</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('gap-analysis')}
                    className="px-3 py-1.5 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                  >
                    Inspect Gaps
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick instructions pill */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex items-center justify-between">
            <span>Want to test mentor access? Go to <strong>Settings</strong> $\rightarrow$ <strong>Mentor access</strong> and add any mentor email!</span>
            <button
              onClick={() => setActiveTab('settings')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Go to Settings →
            </button>
          </div>
        </div>
      ) : (
        /* AI Career Mentor Chat */
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col h-[560px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {mentorMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-xl ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-teal-600 text-white shadow-sm'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>

                  {msg.suggestedAction && (
                    <button
                      onClick={() => setActiveTab(msg.suggestedAction!.tab)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 transition"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask your career mentor anything about ${activeRole.title}...`}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 bg-[#f8fafc] text-xs sm:text-sm focus:outline-hidden focus:border-teal-500 focus:bg-white transition"
            />
            <button
              type="submit"
              className="p-3 bg-[#1d4ed8] text-white rounded-2xl hover:bg-blue-700 shadow-xs transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

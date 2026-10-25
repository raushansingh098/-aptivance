import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Printer, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { getImportanceBadge, getProficiencyColor } from '../../utils/analysisUtils';

export const ReportView: React.FC = () => {
  const { 
    currentStudent, 
    activeRole, 
    gapAnalysis, 
    exportData, 
    showToast 
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const reportDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aptivance-Report-${currentStudent.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Student report & taxonomy data exported as JSON!');
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Shareable student report link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="no-print bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Career Readiness Assessment Report</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Formal competency analysis, prioritized skill gaps, and milestone pathway ready for sharing with academic advisors or employers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-xs flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-4 py-2 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2 rounded-2xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] transition shadow-xs flex items-center gap-1.5 print-allow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="print-card bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md max-w-4xl mx-auto space-y-8">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#00875a] text-white flex items-center justify-center font-black text-sm">
                A
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">Aptivance Career Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Student Competency & Gap Audit
            </h1>
            <p className="text-xs text-slate-500 mt-1">Generated: {reportDate}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-right shrink-0">
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Target Role Readiness</span>
            <span className="text-3xl font-black text-[#00875a]">{gapAnalysis.overallMatchPercentage}%</span>
            <p className="text-[11px] text-slate-600 font-semibold">{activeRole.title}</p>
          </div>
        </div>

        {/* Student Demographics Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Student Name</span>
            <strong className="text-slate-900 text-sm">{currentStudent.name}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Institution</span>
            <strong className="text-slate-900">{currentStudent.university}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Academic Program</span>
            <strong className="text-slate-900">{currentStudent.major}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Graduation</span>
            <strong className="text-slate-900">{currentStudent.expectedGraduation}</strong>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            1. Executive Career Readiness Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The candidate demonstrates a <strong>{gapAnalysis.overallMatchPercentage}% composite readiness</strong> for the entry-level <strong>{activeRole.title}</strong> role. Currently, <strong>{gapAnalysis.strengths.length} competencies</strong> fully meet or exceed the benchmark, <strong>{gapAnalysis.partialMatches.length}</strong> require minor skill elevation, and <strong>{gapAnalysis.priorityGaps.length} priority gaps</strong> are identified as prerequisites for job offer competitiveness.
          </p>
        </div>

        {/* Strategic 30-60-90 Day Milestone Roadmap */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            2. Strategic 30-60-90 Day Action Roadmap
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                Days 1 - 30: Priority Gaps
              </span>
              <p className="font-extrabold text-slate-900">Close Core Deficits</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Tackle top critical deficits in {gapAnalysis.priorityGaps.slice(0, 2).map(g => g.skill.name).join(' & ') || 'core skills'} through structured labs.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-amber-100 bg-amber-50/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                Days 31 - 60: Partial Matches
              </span>
              <p className="font-extrabold text-slate-900">Portfolio Capstones</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Build end-to-end multi-tier applications to elevate partial competencies to production autonomy.
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Days 61 - 90: Interview Polish
              </span>
              <p className="font-extrabold text-slate-900">System Design & Review</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Complete mock behavioral audits, system design interview briefs, and push code to public GitHub repositories.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Competency Gap Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            3. Full Competency Audit Matrix
          </h3>
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-4">Skill Domain</th>
                  <th className="py-2.5 px-4">Importance</th>
                  <th className="py-2.5 px-4 text-center">Student Level</th>
                  <th className="py-2.5 px-4 text-center">Benchmark</th>
                  <th className="py-2.5 px-4 text-right">Status / Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[...gapAnalysis.priorityGaps, ...gapAnalysis.partialMatches, ...gapAnalysis.strengths].map(item => {
                  const badge = getImportanceBadge(item.importance);
                  return (
                    <tr key={item.skill.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-4">
                        <strong className="text-slate-900">{item.skill.name}</strong>
                        <span className="block text-[10px] text-slate-400">{item.skill.category}</span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.color}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center font-bold text-slate-800">
                        Level {item.currentLevel}
                      </td>
                      <td className="py-2.5 px-4 text-center font-bold text-slate-800">
                        Level {item.requiredLevel}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        {item.status === 'gap' && (
                          <span className="text-rose-600 font-bold text-[11px] bg-rose-50 px-2 py-0.5 rounded-full">
                            Deficit: -{item.gap}
                          </span>
                        )}
                        {item.status === 'partial' && (
                          <span className="text-amber-600 font-bold text-[11px] bg-amber-50 px-2 py-0.5 rounded-full">
                            Deficit: -1
                          </span>
                        )}
                        {item.status === 'strength' && (
                          <span className="text-[#00875a] font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full">
                            ✓ Meets Benchmark
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Advisor Sign-off Section */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-700">Student Signature:</p>
            <div className="mt-8 border-b border-slate-300 w-48" />
            <p className="mt-1 text-[11px]">{currentStudent.name}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">Career Advisor Verification:</p>
            <div className="mt-8 border-b border-slate-300 w-48" />
            <p className="mt-1 text-[11px]">Aptivance Authorized Assessment</p>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Share Skill Gap Report</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Share your verified skill gap report with career coaches, faculty mentors, or recruiter networks.
            </p>

            {/* Preview Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-800 to-[#00875a] text-white shadow-md mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 block">
                Aptivance Verified Profile
              </span>
              <h4 className="font-black text-lg mt-1">{currentStudent.name}</h4>
              <p className="text-xs text-emerald-100">{currentStudent.headline}</p>
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <span>{activeRole.title}</span>
                <span className="font-black text-white text-sm">{gapAnalysis.overallMatchPercentage}% Match</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopyShareLink}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] flex items-center justify-center gap-2 shadow-xs transition"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Shareable Public Link'}</span>
              </button>

              <button
                onClick={handleDownloadJSON}
                className="w-full py-2 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Data Backup (JSON)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

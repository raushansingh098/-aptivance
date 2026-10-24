import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    currentStudent, 
    updateStudentProfile, 
    resetAllDataToDefaults, 
    setIsAuthModalOpen,
    setAuthMode,
    showToast 
  } = useApp();

  // Local state for all Settings fields from screenshots
  const [name, setName] = useState(currentStudent.name || 'Raushan Singh');
  const [email, setEmail] = useState(currentStudent.email || 'raushansinghy648@gmail.com');
  const [institution, setInstitution] = useState(currentStudent.institution || '');
  const [course, setCourse] = useState(currentStudent.course || '');
  const [academicYear, setAcademicYear] = useState(currentStudent.academicYear || '');
  const [studyHours, setStudyHours] = useState(currentStudent.weeklyStudyHours || 5);
  const [interests, setInterests] = useState(currentStudent.interests || '');
  const [careerGoals, setCareerGoals] = useState(currentStudent.careerGoals || '');

  // Mentor Access state
  const [mentorEmailInput, setMentorEmailInput] = useState('');
  const [grantedMentors, setGrantedMentors] = useState<string[]>(currentStudent.grantedMentors || []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name,
      email,
      institution,
      course,
      academicYear,
      weeklyStudyHours: Number(studyHours),
      interests,
      careerGoals,
      grantedMentors
    });
    showToast('Profile settings saved successfully!');
  };

  const handleGrantMentorAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorEmailInput.trim() || !mentorEmailInput.includes('@')) {
      showToast('Please enter a valid mentor email address', 'warning');
      return;
    }
    if (grantedMentors.includes(mentorEmailInput.trim())) {
      showToast('Mentor already has access', 'info');
      return;
    }
    const updated = [...grantedMentors, mentorEmailInput.trim()];
    setGrantedMentors(updated);
    updateStudentProfile({ grantedMentors: updated });
    setMentorEmailInput('');
    showToast(`Access granted to ${mentorEmailInput}! Mentor can now review your skills.`);
  };

  const handleRevokeMentorAccess = (mentorEmail: string) => {
    const updated = grantedMentors.filter(m => m !== mentorEmail);
    setGrantedMentors(updated);
    updateStudentProfile({ grantedMentors: updated });
    showToast(`Access revoked for ${mentorEmail}`);
  };

  const handleLoadDemoData = () => {
    resetAllDataToDefaults();
    showToast('Synthetic skills and target roles reloaded.');
  };

  // Get Initials (e.g. RS)
  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'RS';

  return (
    <div className="max-w-4xl space-y-6 pb-16 animate-in fade-in duration-150">
      {/* Settings Form matching Screenshot 2 & 3 */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Avatar Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            {/* Initials Circle */}
            <div className="w-16 h-16 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {initials}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => showToast('Photo upload dialog: only you can view your photo.')}
                className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-xs"
              >
                Change photo
              </button>
              <button
                type="button"
                onClick={() => showToast('Photo removed')}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 transition"
              >
                Remove
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            PNG, JPEG or WebP, up to 2 MB. Only you can see your photo.
          </p>
        </div>

        {/* 2-Column Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Institution
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder=""
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Course
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder=""
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Academic year
            </label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              placeholder=""
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Study hours per week
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Interests Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Interests
          </label>
          <textarea
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            rows={3}
            placeholder=""
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
          />
        </div>

        {/* Career Goals Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Career goals
          </label>
          <textarea
            value={careerGoals}
            onChange={(e) => setCareerGoals(e.target.value)}
            rows={3}
            placeholder=""
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
          />
        </div>

        {/* Save Profile Button */}
        <div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-700 shadow-xs transition"
          >
            Save profile
          </button>
        </div>
      </form>

      {/* Demo Data Card matching Screenshot 3 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base">
          Demo data
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Load synthetic skills and target roles to explore the app. It is example data, clearly marked, and you can remove it from My Skills.
        </p>
        <div>
          <button
            type="button"
            onClick={handleLoadDemoData}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-xs"
          >
            Load demo data
          </button>
        </div>
      </div>

      {/* Privacy Card matching Screenshot 4 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
        <h3 className="font-extrabold text-slate-900 text-base">
          Privacy
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your skills, plans and reports are private to you. Mentors can see them only if you grant access below, and you can revoke it at any time.
        </p>
      </div>

      {/* Mentor Access Card matching Screenshot 4 & 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Mentor access
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Mentors only see your skills, progress and reports if you grant access. You can revoke it at any time.
          </p>
        </div>

        {/* Input & Grant Access Button */}
        <form onSubmit={handleGrantMentorAccess} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            value={mentorEmailInput}
            onChange={(e) => setMentorEmailInput(e.target.value)}
            placeholder="mentor@school.edu"
            className="flex-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#f8fafc] text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-blue-600 focus:bg-white transition"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition whitespace-nowrap shadow-xs"
          >
            Grant access
          </button>
        </form>

        {/* Granted Mentors List */}
        {grantedMentors.length > 0 && (
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Mentors with Access ({grantedMentors.length})
            </span>
            {grantedMentors.map(mEmail => (
              <div key={mEmail} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800">{mEmail}</span>
                <button
                  type="button"
                  onClick={() => handleRevokeMentorAccess(mEmail)}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Revoke access
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Card matching Screenshot 4 & 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Account
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Your skills, plans and reports are private to you. Mentors can see them only if you approve them. Deleting your account permanently removes your profile, skills, plans, progress and reports.
          </p>
        </div>

        {/* Buttons: Log out and Delete account */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              setIsAuthModalOpen(true);
              setAuthMode('login');
              showToast('Logged out.');
            }}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-xs"
          >
            Log out
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                resetAllDataToDefaults();
                showToast('Account deleted and reset.');
              }
            }}
            className="px-4 py-2 bg-[#b91c1c] text-white rounded-xl text-xs font-bold hover:bg-red-800 transition shadow-xs"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

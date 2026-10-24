import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  X,
  ChevronDown
} from 'lucide-react';
import { ProficiencyLevel, SkillCategory, StudentSkill } from '../../types';

export const SkillProfileView: React.FC = () => {
  const { 
    currentStudent, 
    skills, 
    updateSkillProficiency, 
    removeStudentSkill, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<{
    skillId: string;
    proficiency: ProficiencyLevel | 0;
    confidence: 'Low' | 'Medium' | 'High';
    notes: string;
  } | null>(null);

  // New skill addition state
  const [newSkillId, setNewSkillId] = useState('');
  const [newProficiency, setNewProficiency] = useState<ProficiencyLevel>(3);
  const [newConfidence, setNewConfidence] = useState<'Low' | 'Medium' | 'High'>('High');

  const categories = [
    'All categories',
    'AI/ML',
    'Programming',
    'Problem-solving',
    'Web development',
    'Cloud & DevOps'
  ];

  const studentSkillMap = new Map(currentStudent.skills.map(s => [s.skillId, s]));
  const unassessedSkills = skills.filter(s => !studentSkillMap.has(s.id));

  const filteredStudentSkills = currentStudent.skills.filter(item => {
    const skillMeta = skills.find(s => s.id === item.skillId);
    if (!skillMeta) return false;

    const matchesSearch = 
      skillMeta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skillMeta.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'All categories' || 
      skillMeta.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleAddNewSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillId) {
      showToast('Please select a skill to add', 'warning');
      return;
    }
    updateSkillProficiency(newSkillId, newProficiency, newConfidence);
    setIsAddSkillModalOpen(false);
    setNewSkillId('');
  };

  const handleSaveEditSkill = () => {
    if (!editingSkill) return;
    updateSkillProficiency(
      editingSkill.skillId, 
      editingSkill.proficiency, 
      editingSkill.confidence, 
      editingSkill.notes
    );
    setEditingSkill(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header matching Screenshot 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            My Skills
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Levels are your own estimates, a starting point rather than a validated measure.
          </p>
        </div>

        {/* + Add skill blue button matching screenshot 4 */}
        <button
          onClick={() => setIsAddSkillModalOpen(true)}
          className="px-4 py-2 bg-[#1d4ed8] text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add skill</span>
        </button>
      </div>

      {/* Main Skills Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search & Category Dropdown */}
        <div className="space-y-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your skills"
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200/90 bg-[#f8fafc] focus:outline-hidden focus:border-teal-500 focus:bg-white transition"
            />
          </div>

          <div className="relative inline-block w-full sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200/90 bg-white font-medium text-slate-700 focus:outline-hidden focus:border-teal-500 cursor-pointer appearance-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Skills Table matching Screenshot 4 */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                <th className="pb-3 w-1/4">Skill</th>
                <th className="pb-3 w-1/5">Category</th>
                <th className="pb-3 w-1/4">Level</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Updated</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudentSkills.map((item: StudentSkill) => {
                const skillMeta = skills.find(s => s.id === item.skillId);
                if (!skillMeta) return null;

                return (
                  <tr key={item.skillId} className="hover:bg-slate-50/70 transition">
                    {/* SKILL Name & Confidence Badge */}
                    <td className="py-3.5 font-bold text-slate-900 pr-3">
                      <div className="flex items-center gap-2">
                        <span>{skillMeta.name}</span>
                        {item.confidence === 'Low' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffedd5] text-[#9a3412]">
                            Low confidence
                          </span>
                        )}
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="py-3.5 text-slate-600 font-medium pr-3">
                      {skillMeta.category}
                    </td>

                    {/* LEVEL 5-Segment Bar & Text e.g. 2/5 */}
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-3">
                        {/* 5-Block Segmented Bar */}
                        <div className="flex items-center gap-1 w-28">
                          {[1, 2, 3, 4, 5].map(seg => (
                            <div
                              key={seg}
                              className={`h-2 flex-1 rounded-xs transition-all ${
                                item.proficiency >= seg
                                  ? 'bg-[#0d9488]'
                                  : 'bg-slate-200/80'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-slate-700 text-xs">
                          {item.proficiency}/5
                        </span>
                      </div>
                    </td>

                    {/* METHOD */}
                    <td className="py-3.5 text-slate-600 font-medium whitespace-nowrap">
                      {item.method || 'Self-assessment'}
                    </td>

                    {/* UPDATED */}
                    <td className="py-3.5 text-slate-500 whitespace-nowrap font-medium">
                      {item.lastAssessed || '22/10/2026'}
                    </td>

                    {/* Actions: Pencil & Trash */}
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingSkill({
                            skillId: item.skillId,
                            proficiency: item.proficiency,
                            confidence: item.confidence,
                            notes: item.evidenceNotes || ''
                          })}
                          className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
                          title="Edit skill"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeStudentSkill(item.skillId)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Remove skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Skill Modal */}
      {isAddSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Add Skill to Inventory</h3>
              <button
                onClick={() => setIsAddSkillModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Skill Name
                </label>
                <select
                  value={newSkillId}
                  onChange={(e) => setNewSkillId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-teal-500"
                  required
                >
                  <option value="">-- Choose a skill ({unassessedSkills.length} available) --</option>
                  {unassessedSkills.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Estimated Proficiency (1 to 5)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {([1, 2, 3, 4, 5] as ProficiencyLevel[]).map(lvl => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setNewProficiency(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold transition text-center ${
                        newProficiency === lvl
                          ? 'bg-[#0d9488] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl}/5
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confidence
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map(conf => (
                    <button
                      type="button"
                      key={conf}
                      onClick={() => setNewConfidence(conf)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition ${
                        newConfidence === conf
                          ? 'bg-teal-50 text-teal-800 border border-teal-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {conf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">
                Edit {skills.find(s => s.id === editingSkill.skillId)?.name}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Proficiency (1 to 5)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {([1, 2, 3, 4, 5] as ProficiencyLevel[]).map(lvl => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setEditingSkill({ ...editingSkill, proficiency: lvl })}
                      className={`py-2 rounded-xl text-xs font-bold transition text-center ${
                        editingSkill.proficiency === lvl
                          ? 'bg-[#0d9488] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl}/5
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confidence
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map(conf => (
                    <button
                      type="button"
                      key={conf}
                      onClick={() => setEditingSkill({ ...editingSkill, confidence: conf })}
                      className={`py-1.5 rounded-xl text-xs font-bold transition ${
                        editingSkill.confidence === conf
                          ? 'bg-teal-50 text-teal-800 border border-teal-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {conf}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEditSkill}
                  className="px-5 py-2 rounded-xl bg-[#0d9488] text-white text-xs font-bold hover:bg-teal-700 shadow-xs"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

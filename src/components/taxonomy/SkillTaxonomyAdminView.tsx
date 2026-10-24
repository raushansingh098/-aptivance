import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Skill, SkillCategory, ProficiencyLevel, TargetRole } from '../../types';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Check, 
  X, 
  ShieldCheck, 
  Sparkles,
  Briefcase,
  Sliders,
  ChevronDown,
  Info
} from 'lucide-react';
import { getProficiencyColor } from '../../utils/analysisUtils';

export const SkillTaxonomyAdminView: React.FC = () => {
  const { 
    skills, 
    addNewSkillToTaxonomy, 
    updateTaxonomySkill, 
    deleteTaxonomySkill,
    roles,
    updateRoleInCatalog,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'skills' | 'roles'>('skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Add / Edit skill modal state
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<SkillCategory>('Frontend');
  const [formDescription, setFormDescription] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formRubrics, setFormRubrics] = useState<Record<ProficiencyLevel, string>>({
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  });

  const categories: SkillCategory[] = [
    'Frontend',
    'Backend',
    'Database',
    'Cloud & DevOps',
    'AI & Data Science',
    'Mobile',
    'System Design',
    'Soft Skills'
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenAddSkill = () => {
    setEditingSkillId(null);
    setFormName('');
    setFormCategory('Frontend');
    setFormDescription('');
    setFormTags('');
    setFormRubrics({
      1: 'Novice: Basic awareness and understanding of elementary terms.',
      2: 'Elementary: Can implement guided tasks with mentoring.',
      3: 'Intermediate: Competent and autonomous on standard workflows.',
      4: 'Advanced: Solves complex corner cases and leads implementation.',
      5: 'Expert: Architects systems and sets industry standard best practices.'
    });
    setIsSkillModalOpen(true);
  };

  const handleOpenEditSkill = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setFormName(skill.name);
    setFormCategory(skill.category);
    setFormDescription(skill.description);
    setFormTags(skill.tags.join(', '));
    setFormRubrics({ ...skill.levelRubrics });
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Skill name is required', 'warning');
      return;
    }

    const tagsArray = formTags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingSkillId) {
      updateTaxonomySkill(editingSkillId, {
        name: formName,
        category: formCategory,
        description: formDescription,
        tags: tagsArray,
        levelRubrics: formRubrics
      });
    } else {
      addNewSkillToTaxonomy({
        name: formName,
        category: formCategory,
        description: formDescription,
        tags: tagsArray,
        levelRubrics: formRubrics
      });
    }

    setIsSkillModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Skill Taxonomy & Role Benchmark Management
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Authorized admin & advisor interface to add, edit, group, or deprecate competencies and target role benchmarks across the platform.
          </p>
        </div>

        <button
          onClick={handleOpenAddSkill}
          className="px-4 py-2.5 rounded-2xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] shadow-xs flex items-center gap-1.5 self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'skills'
              ? 'bg-[#00875a] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Global Skill Taxonomy ({skills.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'roles'
              ? 'bg-[#00875a] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Target Role Standards ({roles.length})</span>
        </button>
      </div>

      {activeTab === 'skills' && (
        <>
          {/* Search and Category Filter Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter taxonomy by skill name, description, or tag..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <span className="text-xs text-slate-500 font-semibold">
                {filteredSkills.length} of {skills.length} skills listed
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                  selectedCategory === 'All' ? 'bg-[#00875a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat ? 'bg-[#00875a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {skill.category}
                      </span>
                      {skill.isCustom && (
                        <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          Custom
                        </span>
                      )}
                      <h3 className="font-extrabold text-slate-900 text-base mt-1">
                        {skill.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditSkill(skill)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                        title="Edit taxonomy definition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTaxonomySkill(skill.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {skill.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {skill.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>5 Level Rubrics Defined</span>
                  <button
                    onClick={() => handleOpenEditSkill(skill)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 text-xs"
                  >
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roles.map(role => (
            <div key={role.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {role.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{role.title}</h3>
                  <p className="text-xs text-slate-500">{role.salaryRange} • {role.marketDemand} Demand</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">
                  {role.skills.length} Benchmark Skills
                </span>
              </div>

              {/* Required Skills Table */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {role.skills.map(req => {
                  const sMeta = skills.find(s => s.id === req.skillId);
                  return (
                    <div key={req.skillId} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs">
                      <span className="font-semibold text-slate-800">{sMeta?.name || 'Skill'}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400">{req.importance}</span>
                        <span className="font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          Lvl {req.requiredLevel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {editingSkillId ? 'Edit Competency in Taxonomy' : 'Add New Competency to Taxonomy'}
              </h3>
              <button
                onClick={() => setIsSkillModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. GraphQL & Apollo Federation"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Domain Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as SkillCategory)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-emerald-500"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Skill Description
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Summarize this skill and why it matters in industry engineering..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. APIs, Schemas, Resolvers, Backend"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              {/* Rubric Definitions for Levels 1-5 */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Proficiency Level Rubric Definitions (1 to 5)
                </label>
                {([1, 2, 3, 4, 5] as ProficiencyLevel[]).map(lvl => (
                  <div key={lvl} className="flex items-start gap-2">
                    <span className="w-16 text-[11px] font-bold text-slate-500 shrink-0 mt-2">
                      Lvl {lvl}:
                    </span>
                    <input
                      type="text"
                      value={formRubrics[lvl]}
                      onChange={(e) => setFormRubrics({ ...formRubrics, [lvl]: e.target.value })}
                      placeholder={`Criteria for demonstrated Level ${lvl} competency...`}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] shadow-xs"
                >
                  {editingSkillId ? 'Update Skill in Taxonomy' : 'Add to Taxonomy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

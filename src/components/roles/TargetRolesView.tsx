import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TargetRole } from '../../types';
import { computeGapAnalysis } from '../../utils/analysisUtils';
import './TargetRolesView.css';

type RoleFilter = 'All roles' | 'Entry' | 'Intermediate';

const fitFor = (role: TargetRole, skills: ReturnType<typeof useApp>['skills'], studentSkills: ReturnType<typeof useApp>['currentStudent']['skills']) =>
  computeGapAnalysis(role, studentSkills, skills);

const isEntryRole = (role: TargetRole) => role.level.toLowerCase().includes('entry');

const RoleFit: React.FC<{ score: number; compact?: boolean }> = ({ score, compact = false }) => (
  <span
    className={`career-role-fit${compact ? ' career-role-fit-compact' : ''}`}
    role="img"
    aria-label={`${Math.round(score)}% fit`}
  >
    <svg viewBox="0 0 42 42" aria-hidden="true">
      <circle className="career-role-fit-track" cx="21" cy="21" r="17" />
      <circle
        className="career-role-fit-value"
        cx="21"
        cy="21"
        r="17"
        strokeDasharray="106.8"
        strokeDashoffset={`${106.8 * (1 - score / 100)}`}
      />
    </svg>
    <span>{Math.round(score)}</span>
  </span>
);

export const TargetRolesView: React.FC = () => {
  const {
    roles,
    skills,
    currentStudent,
    setTargetRole,
    setActiveTab,
    roleComparisonIds,
    toggleRoleComparison,
  } = useApp();

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [filter, setFilter] = useState<RoleFilter>('All roles');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const roleResults = useMemo(
    () =>
      roles
        .map(role => ({
          role,
          analysis: fitFor(role, skills, currentStudent.skills),
        }))
        .sort((a, b) => b.analysis.overallMatchPercentage - a.analysis.overallMatchPercentage),
    [roles, skills, currentStudent.skills],
  );
  const selectedRole =
    roles.find(role => role.id === selectedRoleId) ??
    roles.find(role => role.id === currentStudent.targetRoleId) ??
    roles[0];
  const selectedAnalysis = selectedRole
    ? fitFor(selectedRole, skills, currentStudent.skills)
    : null;
  const comparedRoles = roles.filter(role => roleComparisonIds.includes(role.id));
  const visibleResults = roleResults.filter(({ role }) => {
    if (filter === 'Entry') return isEntryRole(role);
    if (filter === 'Intermediate') return !isEntryRole(role);
    return true;
  });
  const strongMatches = visibleResults.filter(({ analysis }) => analysis.overallMatchPercentage >= 60);
  const adjacentPaths = visibleResults.filter(({ analysis }) => analysis.overallMatchPercentage < 60);
  const filters: RoleFilter[] = ['All roles', 'Entry', 'Intermediate'];

  const renderRoleRow = (role: TargetRole, score: number, gapCount: number) => {
    const isTarget = role.id === currentStudent.targetRoleId;
    const isSelected = role.id === selectedRole?.id;
    const isCompared = roleComparisonIds.includes(role.id);

    return (
      <div
        key={role.id}
        className={`career-role-row${isSelected ? ' is-selected' : ''}`}
      >
        <button
          type="button"
          className="career-role-row-main"
          onClick={() => setSelectedRoleId(role.id)}
          aria-pressed={isSelected}
        >
          <RoleFit score={score} compact />
          <span className="career-role-row-copy">
            <span className="career-role-row-title">
              {role.title}
              {isTarget && <span className="career-role-target-tag">Your target</span>}
            </span>
            <span className="career-role-row-description">{role.description}</span>
            <span className="career-role-row-meta">
              <span>{role.level}</span>
              <span>{role.skills.length} skills</span>
              <span>~{role.weeksOfLearning} wks</span>
              <span>{role.salaryRange}</span>
              <span className={`career-demand career-demand-${role.marketDemand.toLowerCase().replace(' ', '-')}`}>
                {role.marketDemand}
              </span>
              <span>{gapCount} {gapCount === 1 ? 'gap' : 'gaps'}</span>
            </span>
          </span>
        </button>
        <button
          type="button"
          className={`career-role-compare${isCompared ? ' is-compared' : ''}`}
          onClick={() => toggleRoleComparison(role.id)}
          aria-pressed={isCompared}
          aria-label={`${isCompared ? 'Remove' : 'Add'} ${role.title} ${isCompared ? 'from' : 'to'} comparison`}
        >
          {isCompared ? <Check size={15} /> : <span aria-hidden="true">+</span>}
          <span>{isCompared ? 'Added' : 'Compare'}</span>
        </button>
        <ChevronRight className="career-role-chevron" size={16} aria-hidden="true" />
      </div>
    );
  };

  return (
    <div className="career-roles-page">
      <div className="career-roles-heading">
        <div>
          <div className="career-roles-breadcrumb">Career <span>/</span> Career roles</div>
          <h2>Career roles</h2>
          <p>{roles.length} paths matched to your profile. Compare fit, money and time before you commit.</p>
        </div>
        <div className="career-roles-heading-actions">
          <button
            type="button"
            className="career-secondary-button"
            onClick={() => setIsCompareModalOpen(true)}
            disabled={roleComparisonIds.length === 0}
          >
            <SlidersHorizontal size={15} />
            Compare <span className="career-button-count">{roleComparisonIds.length}</span>
          </button>
          <button
            type="button"
            className="career-secondary-button"
            onClick={() => setActiveTab('gap-analysis')}
          >
            Gap analysis
          </button>
        </div>
      </div>

      <div className="career-role-filters" aria-label="Filter roles">
        {filters.map(option => {
          const count = option === 'All roles'
            ? roles.length
            : roles.filter(role => option === 'Entry' ? isEntryRole(role) : !isEntryRole(role)).length;
          return (
            <button
              type="button"
              key={option}
              className={`career-role-filter${filter === option ? ' is-active' : ''}`}
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
            >
              {option} <span>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="career-roles-layout">
        <section className="career-role-list" aria-label="Matching career roles">
          {strongMatches.length > 0 && (
            <div className="career-role-group">
              <div className="career-role-group-heading">
                <span>Strong match</span><span>{strongMatches.length}</span>
              </div>
              {strongMatches.map(({ role, analysis }) =>
                renderRoleRow(role, analysis.overallMatchPercentage, analysis.priorityGaps.length),
              )}
            </div>
          )}
          {adjacentPaths.length > 0 && (
            <div className="career-role-group">
              <div className="career-role-group-heading">
                <span>Adjacent paths</span><span>{adjacentPaths.length}</span>
              </div>
              {adjacentPaths.map(({ role, analysis }) =>
                renderRoleRow(role, analysis.overallMatchPercentage, analysis.priorityGaps.length),
              )}
            </div>
          )}
          {visibleResults.length === 0 && (
            <div className="career-role-empty">No roles match this filter yet.</div>
          )}
        </section>

        {selectedRole && selectedAnalysis && (
          <aside className="career-role-detail" aria-label={`${selectedRole.title} details`}>
            <div className="career-role-detail-eyebrow">Selected role</div>
            <div className="career-role-detail-title-row">
              <div>
                <h3>{selectedRole.title}</h3>
                <p>{selectedRole.description}</p>
              </div>
              <RoleFit score={selectedAnalysis.overallMatchPercentage} />
            </div>

            <div className="career-role-stats">
              <div><span>Salary range</span><strong>{selectedRole.salaryRange}</strong></div>
              <div><span>Market demand</span><strong>{selectedRole.marketDemand}</strong></div>
              <div><span>Time to ready</span><strong>~{selectedAnalysis.estimatedTimeToReadyWeeks} wks</strong></div>
              <div><span>Required skills</span><strong>{selectedRole.skills.length}</strong></div>
            </div>

            <div className="career-role-overlap">
              <div className="career-role-section-heading">
                <strong>Skill overlap</strong>
                <span>{selectedAnalysis.strengths.length} of {selectedRole.skills.length} covered</span>
              </div>
              <div className="career-role-skill-chips">
                {selectedAnalysis.items.map(item => (
                  <span
                    className={`career-role-skill-chip${item.status === 'strength' ? ' is-covered' : ''}`}
                    key={item.skill.id}
                  >
                    {item.status === 'strength' && <Check size={11} />}
                    {item.skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="career-role-responsibilities">
              <strong>What you'd do</strong>
              <ul>
                {selectedRole.responsibilities.slice(0, 3).map((responsibility, index) => (
                  <li key={`${selectedRole.id}-responsibility-${index}`}>{responsibility}</li>
                ))}
              </ul>
            </div>

            <div className="career-role-gap-note">
              <CircleCheck size={15} />
              <span><strong>{selectedAnalysis.priorityGaps.length} priority gaps</strong> · about {selectedAnalysis.estimatedTimeToReadyWeeks} weeks to prepare</span>
            </div>

            <div className="career-role-detail-actions">
              {selectedRole.id === currentStudent.targetRoleId ? (
                <button
                  type="button"
                  className="career-secondary-button"
                  onClick={() => toggleRoleComparison(selectedRole.id)}
                >
                  {roleComparisonIds.includes(selectedRole.id) ? <X size={14} /> : <SlidersHorizontal size={14} />}
                  {roleComparisonIds.includes(selectedRole.id) ? 'Remove' : 'Compare'}
                </button>
              ) : (
                <button
                  type="button"
                  className="career-secondary-button"
                  onClick={() => toggleRoleComparison(selectedRole.id)}
                >
                  {roleComparisonIds.includes(selectedRole.id) ? <X size={14} /> : <SlidersHorizontal size={14} />}
                  {roleComparisonIds.includes(selectedRole.id) ? 'Remove' : 'Compare'}
                </button>
              )}
              <button
                type="button"
                className="career-primary-button"
                onClick={() => {
                  setTargetRole(selectedRole.id);
                  setActiveTab('gap-analysis');
                }}
              >
                {selectedRole.id === currentStudent.targetRoleId ? 'Your target — view gaps' : 'Set as target — view gaps'}
                <ArrowRight size={14} />
              </button>
            </div>
          </aside>
        )}
      </div>

      {roleComparisonIds.length > 0 && (
        <div className="career-compare-dock" role="region" aria-label="Role comparison selection">
          <div className="career-compare-dock-label">
            <span>Compare</span>
            <div className="career-compare-dock-chips">
              {comparedRoles.map(role => (
                <span className="career-compare-chip" key={role.id}>
                  {role.title}
                  <button
                    type="button"
                    onClick={() => toggleRoleComparison(role.id)}
                    aria-label={`Remove ${role.title} from comparison`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="career-primary-button"
            onClick={() => setIsCompareModalOpen(true)}
          >
            Compare {comparedRoles.length} <ArrowRight size={14} />
          </button>
        </div>
      )}

      {isCompareModalOpen && (
        <div
          className="career-modal-backdrop"
          onClick={event => {
            if (event.target === event.currentTarget) setIsCompareModalOpen(false);
          }}
        >
          <div className="career-compare-modal" role="dialog" aria-modal="true" aria-labelledby="career-compare-title">
            <div className="career-compare-modal-heading">
              <div>
                <span className="career-role-detail-eyebrow">Make your next move</span>
                <h3 id="career-compare-title">Compare career paths</h3>
              </div>
              <button
                type="button"
                className="career-modal-close"
                onClick={() => setIsCompareModalOpen(false)}
                aria-label="Close comparison"
              >
                <X size={18} />
              </button>
            </div>
            <div className="career-compare-modal-grid">
              {comparedRoles.map(role => {
                const analysis = fitFor(role, skills, currentStudent.skills);
                return (
                  <article className="career-compare-card" key={role.id}>
                    <span className="career-role-detail-eyebrow">{role.level}</span>
                    <h4>{role.title}</h4>
                    <RoleFit score={analysis.overallMatchPercentage} />
                    <div className="career-compare-card-stats">
                      <span>Salary <strong>{role.salaryRange}</strong></span>
                      <span>Time to ready <strong>~{analysis.estimatedTimeToReadyWeeks} weeks</strong></span>
                      <span>Priority gaps <strong>{analysis.priorityGaps.length}</strong></span>
                    </div>
                    <button
                      type="button"
                      className="career-primary-button"
                      onClick={() => {
                        setTargetRole(role.id);
                        setIsCompareModalOpen(false);
                        setActiveTab('gap-analysis');
                      }}
                    >
                      Set as target <ArrowRight size={14} />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

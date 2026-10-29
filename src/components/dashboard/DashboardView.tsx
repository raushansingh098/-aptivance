import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleAlert,
  Compass,
  Gauge,
  Layers3,
  Target,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillGapItem } from '../../types';
import './DashboardView.css';

export const DashboardView: React.FC = () => {
  const {
    currentStudent,
    activeRole,
    gapAnalysis,
    setActiveTab,
    roles,
    setTargetRole
  } = useApp();

  const alternativeRoles = roles.filter((role) => role.id !== activeRole.id).slice(0, 3);
  const topGaps = gapAnalysis.priorityGaps.slice(0, 3);
  const firstName = currentStudent.name.trim().split(/\s+/)[0] || 'there';
  const recommendedSkill = topGaps[0]?.skill.name;

  const metrics = [
    {
      label: 'Role readiness',
      value: `${gapAnalysis.overallMatchPercentage}%`,
      detail: 'Based on assessed skills',
      icon: Gauge,
      className: 'is-readiness',
      progress: gapAnalysis.overallMatchPercentage
    },
    {
      label: 'Assessment coverage',
      value: `${gapAnalysis.assessmentCoveragePercentage}%`,
      detail: `${gapAnalysis.assessedCount} of ${gapAnalysis.totalRequiredCount} skills assessed`,
      icon: BookOpenCheck,
      className: 'is-coverage',
      progress: gapAnalysis.assessmentCoveragePercentage
    },
    {
      label: 'Weighted skill gap',
      value: `${gapAnalysis.weightedGapPercentage}%`,
      detail: 'Weighted by role importance',
      icon: TrendingUp,
      className: 'is-gap',
      progress: gapAnalysis.weightedGapPercentage
    }
  ];

  return (
    <div className="aptivance-dashboard space-y-6 pb-12 animate-in fade-in duration-150">
      <section className="aptivance-welcome-panel" aria-labelledby="dashboard-title">
        <div className="aptivance-welcome-copy">
          <span className="aptivance-welcome-eyebrow">
            <span className="aptivance-welcome-dot" />
            YOUR CAREER, IN FOCUS
          </span>
          <h2 id="dashboard-title">Good to see you, {firstName}.</h2>
          <p>
            Every skill you build brings your next opportunity a little closer. Here’s where your path stands today.
          </p>
          <button
            type="button"
            className="aptivance-welcome-action"
            onClick={() => setActiveTab(gapAnalysis.assessmentCoveragePercentage < 100 ? 'assessment' : 'gap-analysis')}
          >
            {gapAnalysis.assessmentCoveragePercentage < 100 ? 'Continue your assessment' : 'Explore your skill gaps'}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="aptivance-welcome-aside">
          <span className="aptivance-welcome-aside-label">CURRENTLY EXPLORING</span>
          <div className="aptivance-welcome-role">
            <span className="aptivance-welcome-role-icon"><BriefcaseBusiness size={19} /></span>
            <div>
              <span>Target role</span>
              <strong>{activeRole.title}</strong>
            </div>
            <span className="aptivance-welcome-role-arrow"><ArrowUpRight size={16} /></span>
          </div>
          <div className="aptivance-welcome-foot">
            <span className="aptivance-welcome-check"><Check size={12} /></span>
            <span>Your plan moves at your pace</span>
          </div>
        </div>
        <span className="aptivance-welcome-orbit aptivance-welcome-orbit-one" aria-hidden="true" />
        <span className="aptivance-welcome-orbit aptivance-welcome-orbit-two" aria-hidden="true" />
      </section>

      <section className="aptivance-metric-grid" aria-label="Career readiness metrics">
        {metrics.map(({ label, value, detail, icon: Icon, className, progress }) => (
          <article className={`aptivance-metric-card ${className}`} key={label}>
            <div className="aptivance-metric-top">
              <span className="aptivance-metric-icon"><Icon size={18} aria-hidden="true" /></span>
              <span className="aptivance-metric-label">{label}</span>
            </div>
            <div className="aptivance-metric-value">{value}</div>
            <div className="aptivance-metric-bottom">
              <span>{detail}</span>
              <div
                className="aptivance-metric-track"
                role="progressbar"
                aria-label={label}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="aptivance-dashboard-main">
        <div className="aptivance-surface aptivance-gaps-panel">
          <div className="aptivance-surface-heading">
            <div>
              <span className="aptivance-overline">YOUR NEXT OPPORTUNITY</span>
              <h3>Skills worth focusing on</h3>
              <p>Start with the capabilities that matter most for your target role.</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('gap-analysis')}
              className="aptivance-text-action"
            >
              Full analysis <ChevronRight size={15} aria-hidden="true" />
            </button>
          </div>

          {topGaps.length > 0 ? (
            <div className="aptivance-gap-list">
              {topGaps.map((item: SkillGapItem, index) => {
                const currentLevel = Math.max(0, Math.min(5, item.currentLevel));
                const requiredLevel = Math.max(0, Math.min(5, item.requiredLevel));
                const severityClass = item.severity.toLowerCase().replace(/\s+/g, '-');

                return (
                  <article className="aptivance-gap-item" key={item.skill.id}>
                    <div className="aptivance-gap-heading">
                      <span className="aptivance-gap-index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="aptivance-gap-title">
                        <strong>{item.skill.name}</strong>
                        <span>Priority skill</span>
                      </div>
                      <span className={`aptivance-severity ${severityClass}`}>
                        <CircleAlert size={12} aria-hidden="true" />
                        {item.severity}
                      </span>
                    </div>

                    <div
                      className="aptivance-level-track"
                      role="img"
                      aria-label={`${item.skill.name}: current level ${currentLevel} of 5; target level ${requiredLevel} of 5`}
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <span className="aptivance-level-segment" key={level}>
                          {level <= currentLevel && <i className="aptivance-level-current" />}
                          {level === requiredLevel && <i className="aptivance-level-target" />}
                        </span>
                      ))}
                    </div>

                    <div className="aptivance-gap-scale">
                      <span>Current <strong>Level {currentLevel}</strong></span>
                      <span>Target <strong>Level {requiredLevel}</strong></span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="aptivance-no-gaps">
              <span><Check size={19} /></span>
              <div>
                <strong>A strong match for {activeRole.title}</strong>
                <p>No priority gaps found. Keep learning and revisit your profile as you grow.</p>
              </div>
            </div>
          )}
        </div>

        <aside className="aptivance-next-step" aria-labelledby="next-step-title">
          <span className="aptivance-next-step-icon"><Compass size={18} /></span>
          <span className="aptivance-overline">A GOOD PLACE TO BEGIN</span>
          <h3 id="next-step-title">
            {recommendedSkill ? `Take a closer look at ${recommendedSkill}.` : 'Keep your momentum going.'}
          </h3>
          <p>
            {recommendedSkill
              ? `It’s one of the priority skills for ${activeRole.title}. Review your current level and choose a practical next step.`
              : `Your skill profile is looking strong for ${activeRole.title}. Review your learning plan and set a new goal.`}
          </p>
          <button
            type="button"
            className="aptivance-next-step-button"
            onClick={() => setActiveTab(recommendedSkill ? 'assessment' : 'roadmap')}
          >
            {recommendedSkill ? 'Review this skill' : 'View your roadmap'}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          <span className="aptivance-next-step-note">
            <Layers3 size={13} aria-hidden="true" />
            One step at a time is still progress.
          </span>
        </aside>
      </section>

      <section className="aptivance-pathway-section" aria-labelledby="pathway-title">
        <div className="aptivance-surface-heading aptivance-pathway-heading">
          <div>
            <span className="aptivance-overline">THERE’S MORE THAN ONE WAY FORWARD</span>
            <h3 id="pathway-title">Explore other pathways</h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('roles')}
            className="aptivance-text-action"
          >
            Browse all roles <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="aptivance-pathway-grid">
          {alternativeRoles.map((role, index) => (
            <article className={`aptivance-pathway-card pathway-${index + 1}`} key={role.id}>
              <div className="aptivance-pathway-card-top">
                <span className="aptivance-pathway-icon"><BriefcaseBusiness size={17} aria-hidden="true" /></span>
                <span className="aptivance-pathway-time">~{role.weeksOfLearning} weeks</span>
              </div>
              <span className="aptivance-pathway-level">{role.level} pathway</span>
              <h4>{role.title}</h4>
              <p>{role.description}</p>
              <div className="aptivance-pathway-card-bottom">
                <span><Target size={13} aria-hidden="true" /> {role.skills.length} skills</span>
                <button type="button" onClick={() => setTargetRole(role.id)}>
                  Explore <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

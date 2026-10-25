import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Menu,
  Route,
  Sparkles,
  Target,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './LandingPage.css';

const steps = [
  {
    number: '01',
    icon: Target,
    title: 'Choose a direction',
    description: 'Pick a career role you are curious about. You can compare paths whenever your goals change.'
  },
  {
    number: '02',
    icon: Layers3,
    title: 'See your skill picture',
    description: 'Assess what you know and see where your current strengths meet the role’s requirements.'
  },
  {
    number: '03',
    icon: Route,
    title: 'Build your next steps',
    description: 'Turn priority gaps into a practical learning plan, then keep track as you grow.'
  }
];

export const LandingPage: React.FC = () => {
  const { setAuthMode, setIsAuthModalOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openAccount = (mode: 'login' | 'register') => {
    setIsMenuOpen(false);
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="aptivance-site">
      <a className="aptivance-skip-link" href="#main-content">Skip to content</a>

      <header className="aptivance-topbar">
        <nav className="aptivance-nav" aria-label="Main navigation">
          <a className="aptivance-brand" href="#top" aria-label="Aptivance home">
            <span className="aptivance-brand-mark" aria-hidden="true">
              <GraduationCap size={20} strokeWidth={2.2} />
            </span>
            <span>Aptivance</span>
          </a>

          <div id="site-navigation-links" className={`aptivance-nav-links${isMenuOpen ? ' is-open' : ''}`}>
            <a href="#platform" onClick={() => setIsMenuOpen(false)}>The platform</a>
            <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How it works</a>
            <a href="#principles" onClick={() => setIsMenuOpen(false)}>Our approach</a>
          </div>

          <div className="aptivance-nav-actions">
            <button className="aptivance-login-link" onClick={() => openAccount('login')}>
              Sign in
            </button>
            <button className="aptivance-button aptivance-button-dark aptivance-nav-cta" onClick={() => openAccount('register')}>
              Get started <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <button
              className="aptivance-menu-toggle"
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-navigation-links"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section className="aptivance-hero" id="top" aria-labelledby="hero-title">
          <div className="aptivance-hero-copy">
            <div className="aptivance-eyebrow">
              <span className="aptivance-eyebrow-dot" aria-hidden="true" />
              A more intentional way to grow
            </div>
            <h1 id="hero-title">
              Your next chapter
              <span>starts with a skill.</span>
            </h1>
            <p className="aptivance-hero-description">
              Make sense of where you are, see what your next role asks for, and build a learning plan that moves you forward.
            </p>
            <div className="aptivance-hero-actions">
              <button className="aptivance-button aptivance-button-dark" onClick={() => openAccount('register')}>
                Create your free account <ArrowRight size={17} aria-hidden="true" />
              </button>
              <a className="aptivance-text-link" href="#how-it-works">
                Take a look around <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="aptivance-hero-note">
              <LockKeyhole size={14} aria-hidden="true" />
              Your learning profile belongs to you.
            </div>
          </div>

          <div className="aptivance-hero-art" aria-label="Illustration of a career skills roadmap">
            <div className="aptivance-art-orbit aptivance-art-orbit-one" />
            <div className="aptivance-art-orbit aptivance-art-orbit-two" />
            <div className="aptivance-art-stamp" aria-hidden="true">
              <span>CAREER</span>
              <span>CLARITY</span>
              <Sparkles size={15} />
            </div>

            <div className="aptivance-preview-card">
              <div className="aptivance-preview-topline">
                <span className="aptivance-preview-kicker">YOUR ROLE MAP</span>
                <span className="aptivance-live-dot"><span /> Example</span>
              </div>

              <div className="aptivance-preview-role">
                <div className="aptivance-role-icon"><Compass size={19} /></div>
                <div>
                  <span className="aptivance-preview-label">Exploring</span>
                  <strong>Data analyst</strong>
                </div>
                <ArrowUpRight className="aptivance-role-arrow" size={17} />
              </div>

              <div className="aptivance-readiness">
                <div className="aptivance-readiness-copy">
                  <span className="aptivance-preview-label">Role readiness</span>
                  <strong>Build your picture</strong>
                </div>
                <div className="aptivance-dial" aria-label="Example readiness visualization">
                  <div className="aptivance-dial-inner"><Sparkles size={16} /></div>
                </div>
              </div>

              <div className="aptivance-preview-divider" />
              <div className="aptivance-skills-title">
                <span>Skills to explore</span>
                <span>VIEW ALL <ArrowUpRight size={12} /></span>
              </div>
              <div className="aptivance-skill-row">
                <span className="aptivance-skill-icon aptivance-skill-icon-green">S</span>
                <span className="aptivance-skill-name">SQL</span>
                <span className="aptivance-skill-tag">Build</span>
                <div className="aptivance-skill-track"><span className="aptivance-skill-fill aptivance-fill-short" /></div>
              </div>
              <div className="aptivance-skill-row">
                <span className="aptivance-skill-icon aptivance-skill-icon-lime">D</span>
                <span className="aptivance-skill-name">Data storytelling</span>
                <span className="aptivance-skill-tag">Explore</span>
                <div className="aptivance-skill-track"><span className="aptivance-skill-fill aptivance-fill-medium" /></div>
              </div>
              <div className="aptivance-preview-foot">
                <span className="aptivance-foot-check"><Check size={12} /></span>
                <span>A thoughtful plan, one step at a time</span>
              </div>
            </div>
            <div className="aptivance-art-caption">
              <span className="aptivance-caption-line" />
              <span>A clearer view of what comes next.</span>
            </div>
          </div>
        </section>

        <section className="aptivance-value-strip" aria-label="What Aptivance helps you do">
          <p>Make your next move with</p>
          <div><span>01</span> A direction that feels yours</div>
          <div><span>02</span> Skills in the right context</div>
          <div><span>03</span> Progress you can see</div>
        </section>

        <section className="aptivance-platform section-shell" id="platform" aria-labelledby="platform-title">
          <div className="aptivance-section-heading">
            <p className="aptivance-section-label">A better way to plan</p>
            <h2 id="platform-title">Less guesswork.<br /><em>More forward.</em></h2>
          </div>
          <div className="aptivance-platform-copy">
            <p>
              Career growth can feel like a thousand open tabs. Aptivance brings your role goals, skill gaps, and learning steps into one calm, useful place.
            </p>
            <a className="aptivance-inline-link" href="#how-it-works">
              See how it works <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="aptivance-feature-grid">
            <article className="aptivance-feature-card aptivance-feature-card-dark">
              <div className="aptivance-feature-icon"><Compass size={20} /></div>
              <span className="aptivance-feature-number">01 / DIRECTION</span>
              <h3>Start with a role, not a random course.</h3>
              <p>Explore career paths and focus on the skills connected to the future you have in mind.</p>
              <div className="aptivance-pathway-art" aria-hidden="true">
                <span>YOU ARE HERE</span><i /><b /><i /><b /><i /><span>NEXT</span>
              </div>
            </article>

            <article className="aptivance-feature-card aptivance-feature-card-cream">
              <div className="aptivance-feature-icon aptivance-feature-icon-green"><Layers3 size={20} /></div>
              <span className="aptivance-feature-number">02 / PERSPECTIVE</span>
              <h3>Make your strengths visible.</h3>
              <p>Map your current skills against a role’s requirements and find the places worth your attention.</p>
              <div className="aptivance-feature-bars" aria-label="Illustrative skill comparison">
                <div><span>Analysis</span><i><b style={{ width: '76%' }} /></i></div>
                <div><span>SQL</span><i><b style={{ width: '48%' }} /></i></div>
                <div><span>Communication</span><i><b style={{ width: '64%' }} /></i></div>
              </div>
            </article>

            <article className="aptivance-feature-card aptivance-feature-card-lime">
              <div className="aptivance-feature-icon aptivance-feature-icon-paper"><Route size={20} /></div>
              <span className="aptivance-feature-number">03 / MOMENTUM</span>
              <h3>Turn insight into action.</h3>
              <p>Set learning goals, record milestones, and keep your progress moving at a pace that works for you.</p>
              <div className="aptivance-momentum-art" aria-hidden="true">
                <span className="aptivance-momentum-node"><Check size={13} /></span>
                <span className="aptivance-momentum-line" />
                <span className="aptivance-momentum-node"><Check size={13} /></span>
                <span className="aptivance-momentum-line" />
                <span className="aptivance-momentum-node aptivance-momentum-next">03</span>
                <span className="aptivance-momentum-label">Your next milestone</span>
              </div>
            </article>
          </div>
        </section>

        <section className="aptivance-how section-shell" id="how-it-works" aria-labelledby="how-title">
          <div className="aptivance-how-intro">
            <p className="aptivance-section-label">Simple by design</p>
            <h2 id="how-title">A small step can<br />change your <em>direction.</em></h2>
            <p>Start where you are. Your plan can grow as you do.</p>
            <button className="aptivance-button aptivance-button-light" onClick={() => openAccount('register')}>
              Find your starting point <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="aptivance-steps">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <article className="aptivance-step" key={number}>
                <div className="aptivance-step-top">
                  <span>{number}</span>
                  <Icon size={19} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aptivance-principles section-shell" id="principles" aria-labelledby="principles-title">
          <div className="aptivance-principles-heading">
            <div>
              <p className="aptivance-section-label">Built around your growth</p>
              <h2 id="principles-title">Your path. Your pace.</h2>
            </div>
            <p>
              Aptivance is a practical companion for career development—not a promise of shortcuts. You choose the direction; the platform helps make the next steps clearer.
            </p>
          </div>
          <div className="aptivance-principle-list">
            <div><span>01</span><strong>Personal, by default</strong><p>Your own account keeps your skill profile and goals in one place.</p></div>
            <div><span>02</span><strong>Clear, not overwhelming</strong><p>Turn a broad career ambition into concrete skills and manageable goals.</p></div>
            <div><span>03</span><strong>Progress over perfection</strong><p>Revisit your plan as your experience, interests, and next steps change.</p></div>
          </div>
        </section>

        <section className="aptivance-final-cta" aria-labelledby="cta-title">
          <div className="aptivance-cta-orbit" aria-hidden="true" />
          <div className="aptivance-cta-content">
            <p className="aptivance-section-label">Make room for what’s next</p>
            <h2 id="cta-title">Start with where<br /><em>you are.</em></h2>
            <p>Your next step does not have to be a giant leap. It just has to be yours.</p>
            <button className="aptivance-button aptivance-button-lime" onClick={() => openAccount('register')}>
              Create your free account <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="aptivance-cta-aside" aria-hidden="true">
            <span>Curiosity</span><i /><span>Clarity</span><i /><span>Momentum</span>
          </div>
        </section>
      </main>

      <footer className="aptivance-footer">
        <a className="aptivance-brand" href="#top" aria-label="Aptivance, back to top">
          <span className="aptivance-brand-mark" aria-hidden="true"><GraduationCap size={18} /></span>
          <span>Aptivance</span>
        </a>
        <p>Make your next move a thoughtful one.</p>
        <button className="aptivance-footer-link" onClick={() => openAccount('login')}>Already have an account? Sign in</button>
        <span className="aptivance-footer-copy">© Aptivance</span>
      </footer>
    </div>
  );
};

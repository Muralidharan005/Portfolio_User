import { api } from '../api.js';
import { useData, openExternalUrl } from '../utils/helpers.js';
import { Loading, Err } from './Common.jsx';
import { getSkillLogo } from '../utils/skillIcons.js';

function getProjectLogo(title, desc) {
  const text = `${title || ''} ${desc || ''}`.toLowerCase();
  if (text.includes('event') || text.includes('ticket') || text.includes('bridge2event')) {
    return '/icons/project-event.png';
  }
  if (text.includes('job') || text.includes('portal') || text.includes('career') || text.includes('recruitment')) {
    return '/icons/project-job.png';
  }
  if (text.includes('vote') || text.includes('election') || text.includes('ballot') || text.includes('voting')) {
    return '/icons/project-vote.png';
  }
  if (text.includes('luck') || text.includes('fortune') || text.includes('prediction')) {
    return '/icons/project-luck.png';
  }
  if (text.includes('game') || text.includes('running') || text.includes('runner') || text.includes('canvas')) {
    return '/icons/project-game.png';
  }
  if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('cloud') || text.includes('moderation')) {
    return '/icons/project-ai.png';
  }
  return '/icons/project-code.png';
}

function parseProjectDetails(proName) {
  if (!proName) return { title: '', techStack: [] };
  const parts = proName.split('|');
  const title = parts[0].trim();
  const techStack = parts.length > 1
    ? parts.slice(1).join(',').split(',').map(t => t.trim()).filter(Boolean)
    : [];
  return { title, techStack };
}

export default function Projects() {
  const { data, loading, error } = useData(api.getProjects);
  if (loading) return <section className="section" id="projects"><div className="container"><Loading /></div></section>;
  if (error) return <section className="section" id="projects"><div className="container"><Err msg={error} /></div></section>;
  
  const allItems = data || [];
  const projectsList = allItems.filter(p => p.proName && p.proName.trim() !== '');
  const publicationsList = allItems.filter(p => p.pubTitle && p.pubTitle.trim() !== '');

  return (
    <section className="section" id="projects" style={{ background: 'rgba(108,99,255,0.02)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Portfolio & Research</div>
          <h2 className="section-title">My <span className="gradient-text">Projects</span> &amp; Publications</h2>
          <div className="section-line" />
        </div>

        <div className="projects-category-section">
          <div className="category-header">
            <div className="category-badge">💻 Applications</div>
            <h3 className="category-title">Featured Projects</h3>
            <p className="category-desc">Web applications, platforms, and interactive software systems.</p>
          </div>

          {projectsList.length === 0 ? (
            <div className="error-msg">No projects added yet</div>
          ) : (
            <div className="projects-grid">
              {projectsList.map((p, i) => {
                const { title, techStack } = parseProjectDetails(p.proName);
                const projectLogo = getProjectLogo(p.proName, p.proDesc);

                return (
                  <div key={p.id} className="card project-card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="project-card-top">
                      <div className="project-icon">
                        <img
                          src={projectLogo}
                          alt={title}
                          className="project-logo-img"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div className="project-header-info">
                        <h3 className="project-name">{title || p.proName}</h3>
                      </div>
                    </div>

                    <p className="project-desc">{p.proDesc}</p>

                    {techStack.length > 0 && (
                      <div className="project-tech-tags">
                        {techStack.map((tech, idx) => {
                          const logo = getSkillLogo(tech);
                          return (
                            <span key={idx} className="project-tech-pill">
                              {logo && (
                                <img
                                  src={logo}
                                  alt={tech}
                                  className="project-tech-icon"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              )}
                              <span>{tech}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div className="project-links">
                      {p.gitLink && (
                        <button
                          type="button"
                          className="btn-action btn-github"
                          onClick={(e) => { e.stopPropagation(); openExternalUrl(p.gitLink); }}
                          title="Open GitHub Repository"
                        >
                          <span className="btn-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0022 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                          </span>
                          <span>GitHub</span>
                          <span className="btn-arrow">↗</span>
                        </button>
                      )}
                      {p.liveLink && (
                        <button
                          type="button"
                          className="btn-action btn-live"
                          onClick={(e) => { e.stopPropagation(); openExternalUrl(p.liveLink); }}
                          title="Open Live Demo"
                        >
                          <span className="btn-icon">🌐</span>
                          <span>Live Demo</span>
                          <span className="btn-arrow">↗</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {publicationsList.length > 0 && (
          <div className="publications-category-section" style={{ marginTop: 54 }}>
            <div className="category-header">
              <div className="category-badge pub-category-badge">📄 Research &amp; Conference</div>
              <h3 className="category-title">Publications</h3>
              <p className="category-desc">Peer-reviewed conference presentations, research papers, and publications.</p>
            </div>

            <div className="publications-grid">
              {publicationsList.map((pub, i) => (
                <div key={pub.id} className="card publication-card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="pub-card-header">
                    <div className="pub-card-icon">
                      <img src="/icons/project-ai.png" alt="Research Logo" className="project-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="pub-card-meta">
                      <span className="pub-badge-tag">Conference Paper</span>
                      <h4 className="pub-card-title">{pub.pubTitle}</h4>
                    </div>
                  </div>
                  {pub.pubDesc && <p className="pub-card-desc">{pub.pubDesc}</p>}
                  {(pub.gitLink || pub.liveLink) && (
                    <div className="project-links" style={{ marginTop: 14 }}>
                      {pub.gitLink && (
                        <button
                          type="button"
                          className="btn-action btn-github"
                          onClick={(e) => { e.stopPropagation(); openExternalUrl(pub.gitLink); }}
                          title="Open Repository"
                        >
                          <span className="btn-icon">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0022 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                          </span>
                          <span>Code / Repo</span>
                          <span className="btn-arrow">↗</span>
                        </button>
                      )}
                      {pub.liveLink && (
                        <button
                          type="button"
                          className="btn-action btn-live"
                          onClick={(e) => { e.stopPropagation(); openExternalUrl(pub.liveLink); }}
                          title="View Publication"
                        >
                          <span className="btn-icon">📄</span>
                          <span>View Publication</span>
                          <span className="btn-arrow">↗</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import { IMG_BASE } from '../utils/helpers';

function getHeroShortDesc(desc) {
  if (!desc || typeof desc !== 'string') {
    return 'Aspiring Java Full Stack Developer passionate about building robust, scalable web applications.';
  }
  const clean = desc.trim();
  if (clean.length <= 160) return clean;
  const sentences = clean.split(/(?<=[a-z]{2,}[.!?])\s+(?=[A-Z])/);
  if (sentences && sentences.length > 0 && sentences[0].trim().length >= 20) {
    return sentences[0].trim();
  }
  return clean.length > 150 ? clean.substring(0, 150) + '...' : clean;
}

export default function Home({ about }) {
  if (!about?.length) return null;
  const me = about[0];
  const shortDesc = getHeroShortDesc(me.description);

  return (
    <section className="hero" id="hero">
      <div className="hero-ambient-glow" />
      <div className="hero-bg-grid" />
      <div className="container">
        <div className="hero-inner">
          <div className="hero-text fade-in">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              <span>Available for jobs</span>
            </div>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{me.name}</span>
            </h1>
            <p className="hero-sub">{me.profession}</p>
            <p className="hero-desc">{shortDesc}</p>

            <div className="hero-tech-pills">
              <span className="hero-tech-pill">
                <img src="/icons/java.png" alt="Java" className="tech-pill-img" />
                <span>Java</span>
              </span>
              <span className="hero-tech-pill">
                <img src="/icons/springboot.png" alt="Spring Boot" className="tech-pill-img" />
                <span>Spring Boot</span>
              </span>
              <span className="hero-tech-pill">
                <img src="/icons/postgresql.png" alt="PostgreSQL" className="tech-pill-img" />
                <span>PostgreSQL</span>
              </span>
              <span className="hero-tech-pill">
                <img src="/icons/react.png" alt="React" className="tech-pill-img" />
                <span>React</span>
              </span>
              <span className="hero-tech-pill">
                <img src="/icons/restapi.png" alt="REST APIs" className="tech-pill-img" />
                <span>REST APIs</span>
              </span>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                <span>View Projects</span>
                <span className="btn-arrow">↗</span>
              </a>
              <a href="#contact" className="btn btn-outline">
                <span>Get In Touch</span>
                <img src="/icons/contact-mail.png" alt="Get In Touch" className="btn-icon-img" />
              </a>
              {me.resume && (
                <a
                  href={`${IMG_BASE}${me.resume}`}
                  download={`${(me.name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`}
                  className="btn btn-hero-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download Resume"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>Resume</span>
                  <span>⬇</span>
                </a>
              )}
            </div>
          </div>
          <div className="hero-right fade-in">
            <div className="hero-avatar-wrap">
              <div className="hero-avatar-ambient-blur" />
              <div className="hero-avatar-ring" />
              <div className="hero-avatar">
                {me.img
                  ? <img src={IMG_BASE + me.img} alt={me.name} onError={e => e.target.style.display = 'none'} />
                  : <span style={{ fontSize: '4.5rem' }}>👤</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';

export default function Navbar({ name, resume }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 220;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <span className="nav-logo-badge">
            <img src="/Md.png" alt="Logo" className="nav-logo-img" />
          </span>
          <span className="nav-logo-text">{name || 'Portfolio'}</span>
        </a>

        <ul className="nav-links">
          {links.map(l => {
            const target = l.toLowerCase();
            const isActive = activeSection === target;
            return (
              <li key={l}>
                <a
                  href={`#${target}`}
                  className={isActive ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, target)}
                >
                  {l}
                </a>
              </li>
            );
          })}
          <li>
            {resume ? (
              <a
                href={`/images/${resume}`}
                download={`${(name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`}
                className="nav-resume-btn"
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume / CV"
              >
                <span>Resume</span>
                <span className="nav-resume-icon">⬇</span>
              </a>
            ) : (
              <a
                href="#contact"
                className="nav-resume-btn nav-resume-btn-outline"
                title="Download Resume"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Resume document has not been uploaded yet. Please upload it via the Admin Panel!');
                }}
              >
                <span>Resume</span>
                <span className="nav-resume-icon">📄</span>
              </a>
            )}
          </li>
        </ul>

        <div className={`nav-hamburger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Toggle Navigation">
          <span /><span /><span />
        </div>
      </div>

      {open && (
        <div className="nav-mobile-drawer">
          {links.map(l => {
            const target = l.toLowerCase();
            const isActive = activeSection === target;
            return (
              <a
                key={l}
                href={`#${target}`}
                className={`nav-mobile-link${isActive ? ' active' : ''}`}
                onClick={(e) => handleNavClick(e, target)}
              >
                {l}
              </a>
            );
          })}
          {resume ? (
            <a
              href={`/images/${resume}`}
              download={`${(name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`}
              className="nav-mobile-resume-btn"
              onClick={() => setOpen(false)}
            >
              <span>📄 Download Resume</span>
              <span>⬇</span>
            </a>
          ) : (
            <a
              href="#contact"
              className="nav-mobile-resume-btn"
              style={{ opacity: 0.8 }}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                alert('Resume document has not been uploaded yet. Please upload it via the Admin Panel!');
              }}
            >
              <span>📄 Resume</span>
              <span>(Upload in Admin)</span>
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

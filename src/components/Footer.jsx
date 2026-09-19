export default function Footer({ name, resume }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-logo-badge">
              <img src="/Md.png" alt="Logo" className="footer-logo-img" />
            </span>
            <span className="footer-logo-text">{name || 'Portfolio'}</span>
          </div>
          <p className="footer-copy">
            Built with ❤️ by <span>{name || 'Me'}</span> · © {currentYear} All rights reserved.
          </p>
          <p className="footer-sub">React · Spring Boot · PostgreSQL</p>
        </div>

        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          {resume && (
            <a
              href={`/images/${resume}`}
              download={`${(name || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`}
              className="footer-resume-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Resume
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

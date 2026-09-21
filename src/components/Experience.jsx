import { api } from '../api.js';
import { useData } from '../utils/helpers.js';
import { Loading, Err } from './Common.jsx';

function getCertificateLogo(title, issuer) {
  const text = `${title || ''} ${issuer || ''}`.toLowerCase();
  if (text.includes('java')) {
    return '/icons/java.png';
  }
  if (text.includes('ui/ux') || text.includes('ui') || text.includes('ux') || text.includes('design') || text.includes('figma') || text.includes('marcello')) {
    return '/icons/figma.png';
  }
  if (text.includes('excel') || text.includes('spreadsheet') || text.includes('office master') || text.includes('upgrade')) {
    return '/icons/cert-excel.png';
  }
  if (text.includes('react')) {
    return '/icons/react.png';
  }
  if (text.includes('spring')) {
    return '/icons/springboot.png';
  }
  if (text.includes('python')) {
    return '/icons/cert-python.png';
  }
  if (text.includes('web') || text.includes('frontend') || text.includes('full stack')) {
    return '/icons/cert-web.png';
  }
  if (text.includes('sql') || text.includes('database') || text.includes('postgres')) {
    return '/icons/postgresql.png';
  }
  if (text.includes('git') || text.includes('github')) {
    return '/icons/git.png';
  }
  return '/icons/cert-badge.png';
}

import { initialEducation, initialInternships } from '../data/initialData.js';

export default function Experience() {
  const edu = useData(api.getEducation, 'education', initialEducation);
  const intern = useData(api.getInternships, 'internships', initialInternships);
  const loading = (edu.loading && !edu.data) || (intern.loading && !intern.data);
  const error = (edu.error && !edu.data) || (intern.error && !intern.data);
  if (loading) return <section className="section" id="experience"><div className="container"><Loading /></div></section>;
  if (error) return <section className="section" id="experience"><div className="container"><Err msg={edu.error || intern.error} /></div></section>;
  const educations = edu.data || [];
  const rawInternships = intern.data || [];

  const internships = rawInternships.filter(i => i.internTitle && i.internTitle.trim() !== '');
  const certifications = rawInternships.filter(i => i.certifiTitle && i.certifiTitle.trim() !== '');

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">My Journey</div>
          <h2 className="section-title">Education &amp; <span>Experience</span></h2>
          <div className="section-line" />
        </div>
        <div className="experience-grid">
          <div>
            <h3 style={{ marginBottom: 24, fontSize: '1.15rem', color: 'var(--accent-light)' }}>🎓 Education</h3>
            <div className="timeline">
              {educations.length === 0
                ? <div className="error-msg">No education data yet</div>
                : educations.map((e, i) => (
                    <div key={e.id} className="timeline-item fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="timeline-dot-wrap">
                        <div className="timeline-dot" />
                        {i < educations.length - 1 && <div className="timeline-line" />}
                      </div>
                      <div className="timeline-content card" style={{ padding: '16px 20px' }}>
                        <div className="timeline-type">{e.eduType}</div>
                        <div className="timeline-desc">{e.eduDesc}</div>
                        <div className="timeline-per">{e.eduPer}%</div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: 24, fontSize: '1.15rem', color: 'var(--accent2)' }}>💼 Internships</h3>
            <div className="timeline">
              {internships.length === 0
                ? <div className="error-msg">No internship data yet</div>
                : internships.map((item, i) => (
                    <div key={item.id} className="timeline-item fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="timeline-dot-wrap">
                        <div className="timeline-dot" style={{ background: 'linear-gradient(135deg, var(--accent2), var(--accent))' }} />
                        {i < internships.length - 1 && <div className="timeline-line" />}
                      </div>
                      <div className="timeline-content card" style={{ padding: '16px 20px' }}>
                        <div className="timeline-type" style={{ color: 'var(--accent2)' }}>{item.internDur}</div>
                        <div className="timeline-desc">{item.internTitle}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 4 }}>{item.internDesc}</div>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>

        {certifications.length > 0 && (
          <div className="certifications-category-section" style={{ marginTop: 54 }}>
            <div className="category-header">
              <div className="category-badge cert-category-badge">🏆 Credentials</div>
              <h3 className="category-title">Certificates &amp; Courses</h3>
              <p className="category-desc">Recognized skill certifications, specialized training, and course completions.</p>
            </div>

            <div className="certifications-grid">
              {certifications.map((c, i) => {
                const certLogo = getCertificateLogo(c.certifiTitle, c.certifiDesc);
                return (
                  <div key={c.id} className="card cert-card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="cert-card-header">
                      <div className="cert-card-icon">
                        <img
                          src={certLogo}
                          alt={c.certifiTitle}
                          className="cert-logo-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/icons/cert-badge.png';
                          }}
                        />
                      </div>
                      <div className="cert-card-meta">
                        <span className="cert-badge-tag">Certified</span>
                        <h4 className="cert-card-title">{c.certifiTitle}</h4>
                      </div>
                    </div>
                    {c.certifiDesc && (
                      <div className="cert-card-issuer">
                        <span className="cert-issuer-label">Issued by:</span> {c.certifiDesc}
                      </div>
                    )}
                    {c.certifiDur && (
                      <div className="cert-card-dur">
                        <span className="cert-dur-icon">📅</span> {c.certifiDur}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

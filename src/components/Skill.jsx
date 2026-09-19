import { api } from '../api.js';
import { useData, IMG_BASE } from '../utils/helpers.js';
import { Loading, Err } from './Common.jsx';
import { CATEGORY_DEFAULT_ICONS, getSkillLogo, parseSkillItems } from '../utils/skillIcons.js';

export default function Skill() {
  const { data, loading, error } = useData(api.getSkills);
  if (loading) return <section className="section" id="skills"><div className="container"><Loading /></div></section>;
  if (error) return <section className="section" id="skills"><div className="container"><Err msg={error} /></div></section>;
  
  const rawSkills = data || [];
  const skills = [...rawSkills].sort((a, b) => (a.id || 0) - (b.id || 0));

  return (
    <section className="section" id="skills" style={{ background: 'rgba(108,99,255,0.02)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">What I know</div>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <div className="section-line" />
        </div>
        {skills.length === 0 ? (
          <div className="error-msg">No skills added yet</div>
        ) : (
          <div className="skills-grid">
            {skills.map((s, i) => {
              const items = parseSkillItems(s.skill);
              const catKey = (s.skillTitle || '').toLowerCase().trim();
              const categoryDefaultIcon = CATEGORY_DEFAULT_ICONS[catKey] || '/icons/java.png';

              return (
                <div key={s.id} className="card skill-card fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="skill-card-header">
                    <div className="skill-card-icon-box">
                      {s.skillImg ? (
                        <img
                          src={IMG_BASE + s.skillImg}
                          alt={s.skillTitle}
                          className="skill-card-cat-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = categoryDefaultIcon;
                          }}
                        />
                      ) : (
                        <img
                          src={categoryDefaultIcon}
                          alt={s.skillTitle}
                          className="skill-card-cat-img"
                        />
                      )}
                    </div>
                    <div className="skill-card-meta">
                      <h3 className="skill-title-card">{s.skillTitle}</h3>
                      <span className="skill-count-badge">
                        {items.length} {items.length === 1 ? 'skill' : 'skills'}
                      </span>
                    </div>
                  </div>

                  <div className="skill-items-grid">
                    {items.map((item, idx) => {
                      const logo = getSkillLogo(item);
                      return (
                        <div key={idx} className="skill-item-pill">
                          {logo ? (
                            <img
                              src={logo}
                              alt={item}
                              className="skill-item-img"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <span className="skill-item-dot" />
                          )}
                          <span className="skill-item-name">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

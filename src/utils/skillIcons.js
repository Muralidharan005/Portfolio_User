export const SKILL_ICONS = {
  // Programming & Java
  'java': '/icons/java.png',
  'oop': '/icons/oop.png',
  'collections': '/icons/collections.png',
  'exception handling': '/icons/exception.png',
  'java 8+ features': '/icons/lambda.png',
  'java 8+': '/icons/lambda.png',

  // Frontend
  'html': '/icons/html.png',
  'html5': '/icons/html.png',
  'css': '/icons/css.png',
  'css3': '/icons/css.png',
  'javascript': '/icons/javascript.png',
  'js': '/icons/javascript.png',
  'react': '/icons/react.png',
  'react.js': '/icons/react.png',
  'reactjs': '/icons/react.png',

  // Backend
  'spring': '/icons/spring.png',
  'spring boot': '/icons/springboot.png',
  'spring framework': '/icons/spring.png',
  'spring security': '/icons/security.png',
  'hibernate': '/icons/hibernate.png',
  'servlets': '/icons/servlet.png',
  'servlet': '/icons/servlet.png',
  'jsp': '/icons/jsp.png',
  'jdbc': '/icons/jdbc.png',
  'restful apis': '/icons/restapi.png',
  'rest api': '/icons/restapi.png',
  'rest apis': '/icons/restapi.png',
  'jwt': '/icons/jwt.svg',

  // Database
  'postgresql': '/icons/postgresql.png',
  'postgres': '/icons/postgresql.png',
  'mysql': '/icons/mysql.png',
  'sql': '/icons/sql.png',

  // Tools
  'git': '/icons/git.png',
  'github': '/icons/github.png',
  'maven': '/icons/maven.svg',
  'apache maven': '/icons/maven.svg',
  'postman': '/icons/postman.png',

  // UI/UX
  'figma': '/icons/figma.png',
  'canva': '/icons/canva.png',

  // Development Environment
  'visual studio code': '/icons/vscode.png',
  'vs code': '/icons/vscode.png',
  'vscode': '/icons/vscode.png',
  'visual studio': '/icons/visualstudio.png',
  'jupyter notebook': '/icons/jupyter.svg',
  'jupyter': '/icons/jupyter.svg',
  'anaconda': '/icons/anaconda.svg'
};

export const CATEGORY_DEFAULT_ICONS = {
  'programming': '/icons/java.png',
  'frontend': '/icons/react.png',
  'backend': '/icons/springboot.png',
  'database': '/icons/postgresql.png',
  'tools': '/icons/git.png',
  'ui/ux': '/icons/figma.png',
  'development environment': '/icons/vscode.png'
};

export function getSkillLogo(name) {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  if (SKILL_ICONS[key]) return SKILL_ICONS[key];
  for (const [k, v] of Object.entries(SKILL_ICONS)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

export function parseSkillItems(skillString) {
  if (!skillString) return [];
  const parenMatch = skillString.match(/^(.*?)\s*\((.*?)\)$/);
  if (parenMatch) {
    const raw = [];
    if (parenMatch[1].trim()) raw.push(parenMatch[1].trim());
    const inner = parenMatch[2].split('|').map(s => s.trim()).filter(Boolean);
    raw.push(...inner);
    return raw;
  }
  return skillString.split('|').map(s => s.trim()).filter(Boolean);
}

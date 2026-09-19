export const BASE = import.meta.env.VITE_API_URL || '';

export function getImageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\/?images\//, '');
  return `${BASE}/images/${clean}`;
}

async function get(url) {
  const res = await fetch(BASE + url);
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export const api = {
  getAbout:       () => get('/About/fetchAll'),
  getContact:     (id) => get(`/contact/fetchById/${id}`),
  getEducation:   () => get('/education/fetchAll'),
  getProjects:    () => get('/project/fetchAll'),
  getSkills:      () => get('/skill/fetchAll'),
  getInternships: () => get('/internship/fetchAll'),
  getAboutById:   (id) => get(`/About/fetchById/${id}`),
};

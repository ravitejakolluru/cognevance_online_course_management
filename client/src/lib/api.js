const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function api(path, options = {}) {
  const token = localStorage.getItem('course_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed.');
  return data;
}
export function saveSession(data) { localStorage.setItem('course_token', data.token); localStorage.setItem('course_user', JSON.stringify(data.user)); }
export function getUser() { try { return JSON.parse(localStorage.getItem('course_user') || 'null'); } catch { return null; } }
export function logout() { localStorage.removeItem('course_token'); localStorage.removeItem('course_user'); }

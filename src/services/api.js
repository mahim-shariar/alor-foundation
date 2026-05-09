const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() { return localStorage.getItem('admin_token'); }

function buildQuery(params) {
  if (!params) return '';
  const filtered = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''));
  const qs = new URLSearchParams(filtered).toString();
  return qs ? `?${qs}` : '';
}

async function request(path, { method = 'GET', body: bodyData, headers: extraHeaders = {} } = {}) {
  const headers = { 'Content-Type': 'application/json', ...extraHeaders };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: bodyData ? JSON.stringify(bodyData) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// Stats
export const getStats = () => request('/stats');
export const createStat = (d) => request('/admin/stats', { method: 'POST', body: d });
export const updateStat = (id, d) => request(`/admin/stats/${id}`, { method: 'PUT', body: d });
export const deleteStat = (id) => request(`/admin/stats/${id}`, { method: 'DELETE' });

// Projects
export const getProjects = (params) => request(`/projects${buildQuery(params)}`);
export const getProject = (id) => request(`/projects/${id}`);
export const createProject = (d) => request('/admin/projects', { method: 'POST', body: d });
export const updateProject = (id, d) => request(`/admin/projects/${id}`, { method: 'PUT', body: d });
export const deleteProject = (id) => request(`/admin/projects/${id}`, { method: 'DELETE' });

// Gallery
export const getGallery = (params) => request(`/gallery${buildQuery(params)}`);
export const createGalleryItem = (d) => request('/admin/gallery', { method: 'POST', body: d });
export const updateGalleryItem = (id, d) => request(`/admin/gallery/${id}`, { method: 'PUT', body: d });
export const deleteGalleryItem = (id) => request(`/admin/gallery/${id}`, { method: 'DELETE' });

// News
export const getNews = (params) => request(`/news${buildQuery(params)}`);
export const getNewsItem = (id) => request(`/news/${id}`);
export const createNewsItem = (d) => request('/admin/news', { method: 'POST', body: d });
export const updateNewsItem = (id, d) => request(`/admin/news/${id}`, { method: 'PUT', body: d });
export const deleteNewsItem = (id) => request(`/admin/news/${id}`, { method: 'DELETE' });

// Stories
export const getStories = (params) => request(`/stories${buildQuery(params)}`);
export const createStory = (d) => request('/admin/stories', { method: 'POST', body: d });
export const updateStory = (id, d) => request(`/admin/stories/${id}`, { method: 'PUT', body: d });
export const deleteStory = (id) => request(`/admin/stories/${id}`, { method: 'DELETE' });

// Team
export const getLeadership = () => request('/team/leadership');
export const getVolunteers = () => request('/team/volunteers');
export const getAllTeamMembers = async () => {
  const [leadRes, volRes] = await Promise.all([
    request('/team/leadership').catch(() => ({ data: [] })),
    request('/team/volunteers').catch(() => ({ data: [] })),
  ]);
  const lead = (leadRes.data || []).map(m => ({ ...m, type: 'leadership' }));
  const vol = (volRes.data || []).map(m => ({ ...m, type: 'volunteer' }));
  return [...lead, ...vol];
};
export const createTeamMember = (d) => request('/admin/team', { method: 'POST', body: d });
export const updateTeamMember = (id, d) => request(`/admin/team/${id}`, { method: 'PUT', body: d });
export const deleteTeamMember = (id) => request(`/admin/team/${id}`, { method: 'DELETE' });

// Departments
export const getDepartments = () => request('/departments');
export const createDepartment = (d) => request('/admin/team/departments', { method: 'POST', body: d });
export const updateDepartment = (id, d) => request(`/admin/team/departments/${id}`, { method: 'PUT', body: d });
export const deleteDepartment = (id) => request(`/admin/team/departments/${id}`, { method: 'DELETE' });

// Milestones
export const getMilestones = () => request('/milestones');
export const createMilestone = (d) => request('/admin/milestones', { method: 'POST', body: d });
export const updateMilestone = (id, d) => request(`/admin/milestones/${id}`, { method: 'PUT', body: d });
export const deleteMilestone = (id) => request(`/admin/milestones/${id}`, { method: 'DELETE' });

// Values
export const getValues = () => request('/values');
export const createValue = (d) => request('/admin/values', { method: 'POST', body: d });
export const updateValue = (id, d) => request(`/admin/values/${id}`, { method: 'PUT', body: d });
export const deleteValue = (id) => request(`/admin/values/${id}`, { method: 'DELETE' });

// FAQs
export const getFAQs = () => request('/faqs');
export const createFAQ = (d) => request('/admin/faqs', { method: 'POST', body: d });
export const updateFAQ = (id, d) => request(`/admin/faqs/${id}`, { method: 'PUT', body: d });
export const deleteFAQ = (id) => request(`/admin/faqs/${id}`, { method: 'DELETE' });

// Partners
export const getPartners = () => request('/partners');
export const createPartner = (d) => request('/admin/partners', { method: 'POST', body: d });
export const updatePartner = (id, d) => request(`/admin/partners/${id}`, { method: 'PUT', body: d });
export const deletePartner = (id) => request(`/admin/partners/${id}`, { method: 'DELETE' });

// Settings
export const getPublicSettings = () => request('/settings/public');
export const getAdminSettings = () => request('/admin/settings');
export const updateSetting = (key, d) => request(`/admin/settings/${key}`, { method: 'PUT', body: d });

// Contact submissions
export const getContactSubmissions = (params) => request(`/admin/contact-submissions${buildQuery(params)}`);
export const markContactRead = (id) => request(`/admin/contact-submissions/${id}/read`, { method: 'PUT' });
export const deleteContact = (id) => request(`/admin/contact-submissions/${id}`, { method: 'DELETE' });

// Newsletter
export const getNewsletterSubscribers = () => request('/admin/newsletter-subscribers');
export const deleteNewsletterSubscriber = (id) => request(`/admin/newsletter-subscribers/${id}`, { method: 'DELETE' });

// Public forms
export const submitContact = (d) => request('/contact', { method: 'POST', body: d });
export const subscribeNewsletter = (email) => request('/newsletter', { method: 'POST', body: { email } });

// Auth
export const login = (username, password) => request('/auth/login', { method: 'POST', body: { username, password } });
export const logout = () => request('/auth/logout', { method: 'POST' });
export const getMe = () => request('/auth/me');
export const setup = (d) => request('/auth/setup', { method: 'POST', body: d });
export const changePassword = (d) => request('/auth/change-password', { method: 'POST', body: d });
export const changeSecurityQuestion = (d) => request('/auth/change-security-question', { method: 'POST', body: d });
export const getSecurityQuestion = () => request('/auth/security-question');
export const verifySecurityAnswer = (answer) => request('/auth/verify-security-answer', { method: 'POST', body: { security_answer: answer } });
export const resetPassword = (reset_token, new_password) => request('/auth/reset-password', { method: 'POST', body: { reset_token, new_password } });

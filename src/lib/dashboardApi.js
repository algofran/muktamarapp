// src/lib/dashboardApi.js - Client Backend Custom (JWT + auto-refresh)
const BASE = import.meta.env.VITE_DASHBOARD_API_URL

let access = localStorage.getItem('access_token')

/**
 * Request wrapper dengan auto-refresh token
 * @param {string} path - API path seperti '/api/dashboard/overview'
 * @param {Object} options - { method, body, query }
 * @returns {Promise<any>} Response JSON
 */
async function req(path, { method = 'GET', body, query } = {}) {
  const url = new URL(BASE + path)
  
  // Tambahkan query parameters
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v != null && v !== undefined) {
        url.searchParams.set(k, v)
      }
    })
  }
  
  // Request pertama
  let res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  
  // Handle 401 Unauthorized - coba refresh token
  if (res.status === 401) {
    const refreshResponse = await fetch(BASE + '/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh_token: localStorage.getItem('refresh_token')
      }),
    })
    
    if (!refreshResponse.ok) {
      // Refresh gagal, logout user
      localStorage.clear()
      window.location.href = '/login'
      return
    }
    
    const { access_token } = await refreshResponse.json()
    access = access_token
    localStorage.setItem('access_token', access)
    
    // Retry request dengan token baru
    res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access}`
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  }
  
  // Handle 403 Forbidden
  if (res.status === 403) {
    throw new Error('Akses ditolak (role tidak cukup)')
  }
  
  // Handle error lainnya
  if (!res.ok) {
    throw new Error(`API ${res.status}`)
  }
  
  // Return null untuk 204 No Content, otherwise parse JSON
  return res.status === 204 ? null : res.json()
}

/**
 * API methods untuk Dashboard Backend Custom
 */
export const api = {
  // Authentication
  login: (credentials) => req('/api/auth/login', { method: 'POST', body: credentials }),
  logout: () => req('/api/auth/logout', { method: 'POST' }),
  me: () => req('/api/auth/me'),
  refreshToken: () => req('/api/auth/refresh', { method: 'POST', body: { refresh_token: localStorage.getItem('refresh_token') } }),
  forgotPassword: (email) => req('/api/auth/forgot-password', { method: 'POST', body: { email } }),
  resetPassword: (token, newPassword) => req('/api/auth/reset-password', { method: 'POST', body: { token, new_password: newPassword } }),
  
  // Dashboard Overview
  overview: () => req('/api/dashboard/overview'),
  room: (id) => req(`/api/dashboard/room/${id}`),
  
  // Activity & Graph
  activity: (query) => req('/api/dashboard/activity', { query }),
  activityHistory: (participantId) => req(`/api/dashboard/activity/${participantId}/history`),
  graph: (query) => req('/api/dashboard/graph', { query }),
  
  // Reminders
  sendReminder: (body) => req('/api/reminders', { method: 'POST', body }),
  reminders: (query) => req('/api/reminders', { query }),
  reminderById: (id) => req(`/api/reminders/${id}`),
  reminderTemplates: () => req('/api/reminders/templates'),
  agendas: () => req('/api/agendas'),
  
  // Reports
  reportAttendance: (query) => req('/api/reports/attendance', { query }),
  reportSummary: (query) => req('/api/reports/summary', { query }),
  scheduleReport: (body) => req('/api/reports/schedule', { method: 'POST', body }),
  
  // Settings
  getZoomSettings: () => req('/api/settings/zoom'),
  updateZoomSettings: (body) => req('/api/settings/zoom', { method: 'PUT', body }),
  getRefreshInterval: () => req('/api/settings/refresh-interval'),
  updateRefreshInterval: (body) => req('/api/settings/refresh-interval', { method: 'PUT', body }),
  getRoomSettings: (id) => req(`/api/settings/rooms/${id}`),
  updateRoomSettings: (id, body) => req(`/api/settings/rooms/${id}`, { method: 'PUT', body }),
  getTemplates: () => req('/api/settings/templates'),
  updateTemplates: (body) => req('/api/settings/templates', { method: 'PUT', body }),
  getRetention: () => req('/api/settings/retention'),
  updateRetention: (body) => req('/api/settings/retention', { method: 'PUT', body }),
  getTheme: () => req('/api/settings/theme'),
  updateTheme: (body) => req('/api/settings/theme', { method: 'PUT', body }),
  
  // User Management
  users: (query) => req('/api/users', { query }),
  createUser: (body) => req('/api/users', { method: 'POST', body }),
  updateUser: (id, body) => req(`/api/users/${id}`, { method: 'PUT', body }),
  deleteUser: (id) => req(`/api/users/${id}`, { method: 'DELETE' }),
  
  // Audit Log
  audit: (query) => req('/api/activity-logs', { query }),
}

// Export fungsi req untuk custom usage
export default req

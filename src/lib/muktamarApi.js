// src/lib/muktamarApi.js - Client API Public Muktamar (data master, read-only)
const BASE = import.meta.env.VITE_MUKTAMAR_API_URL
const TOKEN = import.meta.env.VITE_MUKTAMAR_API_TOKEN
const USE_PROXY = import.meta.env.VITE_USE_MUKTAMAR_PROXY === 'true'

/**
 * Fetch data dari API Public Muktamar
 * @param {string} endpoint - Endpoint seperti '/peserta', '/users', '/panitia', dll.
 * @param {Object} params - Query parameters (field, match, search, fields, limit, offset, dll.)
 * @returns {Promise<Object>} Response JSON dari API
 */
export async function muktamar(endpoint, params = {}) {
  const url = new URL(
    USE_PROXY ? `/proxy/muktamar${endpoint}` : `${BASE}${endpoint}`,
    location.origin
  )
  
  // Tambahkan query parameters
  Object.entries(params).forEach(([k, v]) => {
    if (v != null && v !== undefined) {
      url.searchParams.set(k, v)
    }
  })
  
  // Header Authorization (hanya jika tidak pakai proxy)
  const headers = USE_PROXY ? {} : { Authorization: `Bearer ${TOKEN}` }
  
  const res = await fetch(url, { headers })
  
  if (res.status === 403) {
    throw new Error('Token Muktamar tidak valid')
  }
  if (res.status === 503) {
    throw new Error('Data Muktamar sedang sync, coba lagi')
  }
  if (!res.ok) {
    throw new Error(`Muktamar API ${res.status}`)
  }
  
  return res.json()
}

// Helper functions untuk endpoint umum
export const muktamarApi = {
  peserta: (params) => muktamar('/peserta', params),
  users: (params) => muktamar('/users', params),
  kapal: (params) => muktamar('/kapal', params),
  panitia: (params) => muktamar('/panitia', params),
  timeline: (params) => muktamar('/timeline', params),
  landing: () => muktamar('/landing'),
  lpj: () => muktamar('/lpj'),
  health: () => muktamar('/health'),
  token: () => muktamar('/token'),
  fields: (endpoint) => muktamar('/fields', { endpoint }),
  endpoints: () => muktamar('/endpoints'),
}

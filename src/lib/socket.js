// src/lib/socket.js - WebSocket real-time dengan auto-reconnect
import { ref } from 'vue'

/**
 * Hook composable untuk koneksi WebSocket Dashboard
 * @param {Object} handlers - Object handler untuk berbagai event
 * @returns {{ status: Ref<string>, close: Function }}
 */
export function useDashboardSocket(handlers = {}) {
  const status = ref('offline')
  let ws = null
  let retry = 0
  let reconnectTimeout = null
  
  const connect = () => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      console.warn('WebSocket: No access token, skipping connection')
      return
    }
    
    const wsUrl = `${import.meta.env.VITE_DASHBOARD_WS_URL}/?token=${token}`
    console.log('WebSocket connecting to:', wsUrl.replace(token, '[REDACTED]'))
    
    ws = new WebSocket(wsUrl)
    
    ws.onopen = () => {
      console.log('WebSocket connected')
      status.value = 'online'
      retry = 0
    }
    
    ws.onmessage = (event) => {
      try {
        const { event: eventName, data } = JSON.parse(event.data)
        console.log('WebSocket event received:', eventName, data)
        
        // Panggil handler yang sesuai
        if (handlers[eventName]) {
          handlers[eventName](data)
        }
      } catch (err) {
        console.error('WebSocket: Failed to parse message', err)
      }
    }
    
    ws.onclose = (event) => {
      console.log('WebSocket closed', event.code, event.reason)
      status.value = 'offline'
      
      // Auto-reconnect dengan exponential backoff
      const delay = Math.min(30000, 1000 * 2 ** retry++)
      console.log(`WebSocket reconnecting in ${delay}ms...`)
      
      reconnectTimeout = setTimeout(connect, delay)
    }
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }
  
  // Koneksi otomatis saat hook dipanggil
  connect()
  
  // Fungsi untuk menutup koneksi secara manual
  const close = () => {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
    if (ws) {
      ws.close()
      ws = null
    }
  }
  
  return { status, close }
}

/**
 * Event types yang didukung (dokumentasi):
 * 
 * dashboard:stats     - Update statistik Zoom (zoom1, zoom2, total)
 * dashboard:activity  - Aktivitas peserta baru (join/leave)
 * dashboard:graph     - Data titik grafik real-time
 * dashboard:alert     - Peringatan sistem (capacity, no host, dll.)
 * reminder:sent       - Status pengiriman reminder
 * system:sync         - Status sinkronisasi (syncing/online/offline)
 */
export default useDashboardSocket

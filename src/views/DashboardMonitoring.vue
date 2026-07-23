<template>
  <div>
      <!-- Banner modul (seperti gambar) -->
      <div class="mb-5 flex flex-col items-center text-center">
        <span class="rounded-full bg-[#0096A6] px-4 py-1 text-xs font-semibold text-white shadow-sm">
          6. DASHBOARD MONITORING PANITIA
        </span>
        <p class="mt-2 text-sm text-[#0F172A]/70">
          Panitia bisa memantau jumlah peserta dan status secara real-time.
        </p>
      </div>

      <!-- Panel putih -->
      <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <!-- Header panel + refresh -->
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-lg font-bold text-[#0F172A]">Dashboard Monitoring Zoom</h2>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span class="inline-flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-[#0096A6]" /> Online
            </span>
            <span>Update: {{ lastUpdated }}</span>
            <button
              @click="refresh"
              class="inline-flex items-center gap-1 rounded-md bg-[#0096A6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#007D8A]"
            >
              <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': loading }" /> Refresh
            </button>
          </div>
        </div>

        <!-- 3 Stat Cards -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ZoomStatCard variant="blue"  title="Zoom 1 (Laki-laki)" :total="1024" :join="856"  :active="124" :leave="44" />
          <ZoomStatCard variant="pink"  title="Zoom 2 (Perempuan)" :total="843"  :join="712"  :active="96"  :leave="35" />
          <ZoomStatCard variant="teal" title="Total Keseluruhan"  :total="1867" :join="1568" :active="220" :leave="79" />
        </div>

        <!-- Tabel + Grafik -->
        <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div class="lg:col-span-3">
            <ActivityTable :rows="activities" />
          </div>
          <div class="lg:col-span-2">
            <RealtimeChart :series="chartSeries" />
          </div>
        </div>
      </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RefreshCw } from 'lucide-vue-next'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ZoomStatCard from '@/components/dashboard/ZoomStatCard.vue'
import ActivityTable from '@/components/dashboard/ActivityTable.vue'
import RealtimeChart from '@/components/dashboard/RealtimeChart.vue'
import { api } from '@/lib/dashboardApi.js'
import { muktamarApi } from '@/lib/muktamarApi.js'
import { useDashboardSocket } from '@/lib/socket.js'

const loading = ref(false)
const lastUpdated = ref(new Date().toLocaleTimeString('id-ID'))
const connectionStatus = ref('offline')

// State untuk data real-time
const stats = ref({
  zoom1: { total: 0, join: 0, active: 0, leave: 0 },
  zoom2: { total: 0, join: 0, active: 0, leave: 0 },
  total: { total: 0, join: 0, active: 0, leave: 0 },
})

const activities = ref([
  { nama: 'DPP.Pusdatin - Sekretaris - Muhammad Adhan', zoom: 'Zoom 1', status: 'Join',        waktu: '09:02:15' },
  { nama: 'DPW.Sultra - Ketua - Muh. Ikhwan Kapai',     zoom: 'Zoom 1', status: 'Join',        waktu: '09:02:47' },
  { nama: 'DPW.Kalimantan - Sekretaris - Harun',        zoom: 'Zoom 2', status: 'Sedang Join', waktu: '09:03:12' },
  { nama: 'DPD.Banten - Anggota - Fahmi',               zoom: 'Zoom 1', status: 'Leave',       waktu: '09:05:31' },
  { nama: 'DPW.Jawa Barat - Ketua - Ust. Fadli',        zoom: 'Zoom 2', status: 'Join',        waktu: '09:06:03' },
])

const chartSeries = ref([
  { name: 'Zoom 1 (Laki-laki)', data: [220, 540, 820, 1080, 1240, 1380] },
  { name: 'Zoom 2 (Perempuan)', data: [180, 360, 520, 640, 760, 850] },
])

// Setup WebSocket dengan handlers
useDashboardSocket({
  'dashboard:stats': (data) => {
    if (data.zoom1) stats.value.zoom1 = data.zoom1
    if (data.zoom2) stats.value.zoom2 = data.zoom2
    if (data.total) stats.value.total = data.total
    lastUpdated.value = new Date().toLocaleTimeString('id-ID')
  },
  'dashboard:activity': (data) => {
    // Prepend aktivitas baru ke tabel
    activities.value.unshift({
      nama: data.nama || 'Peserta Baru',
      zoom: data.room === 1 ? 'Zoom 1' : 'Zoom 2',
      status: data.status || 'Join',
      waktu: new Date(data.timestamp).toLocaleTimeString('id-ID'),
    })
    // Batasi maksimal 50 baris
    if (activities.value.length > 50) {
      activities.value = activities.value.slice(0, 50)
    }
  },
  'dashboard:graph': (data) => {
    // Update grafik dengan titik baru
    const seriesIndex = data.room === 1 ? 0 : 1
    chartSeries.value[seriesIndex].data.push(data.count)
    chartSeries.value[seriesIndex].data.shift() // Geser keluar titik lama
  },
  'system:sync': (data) => {
    connectionStatus.value = data.status
  },
  'dashboard:alert': (data) => {
    // Tampilkan alert/toast (implementasi sesuai kebutuhan)
    console.warn('Dashboard Alert:', data.type, data.message)
  },
})

// Fungsi refresh manual
const refresh = async () => {
  loading.value = true
  try {
    // Fetch overview dari backend custom
    const overview = await api.overview()
    if (overview) {
      stats.value.zoom1 = overview.zoom1 || stats.value.zoom1
      stats.value.zoom2 = overview.zoom2 || stats.value.zoom2
      stats.value.total = overview.total || stats.value.total
    }
    
    // Fetch aktivitas terbaru
    const activityRes = await api.activity({ limit: 50 })
    if (activityRes?.items) {
      activities.value = activityRes.items.map(item => ({
        nama: item.nama || `${item.organization} - ${item.role}`,
        zoom: item.room === 1 ? 'Zoom 1' : 'Zoom 2',
        status: translateStatus(item.status),
        waktu: new Date(item.timestamp).toLocaleTimeString('id-ID'),
      }))
    }
    
    // Fetch data grafik
    const graphRes = await api.graph()
    if (graphRes?.series) {
      chartSeries.value = graphRes.series
    }
    
    lastUpdated.value = new Date().toLocaleTimeString('id-ID')
  } catch (err) {
    console.error('Failed to refresh dashboard:', err)
    // Fallback: coba health check API Muktamar
    try {
      await muktamarApi.health()
      connectionStatus.value = 'online'
    } catch {
      connectionStatus.value = 'offline'
    }
  } finally {
    loading.value = false
  }
}

// Helper untuk translate status
const translateStatus = (status) => {
  const map = {
    join: 'Join',
    currently_join: 'Sedang Join',
    leave: 'Leave',
  }
  return map[status] || status
}

// Auto-refresh interval (default 30s sesuai FR-DASH-2)
let timer = null
onMounted(() => {
  refresh() // Initial fetch
  
  timer = setInterval(() => {
    lastUpdated.value = new Date().toLocaleTimeString('id-ID')
    // Simulasi update grafik jika tidak ada WebSocket
    if (connectionStatus.value !== 'online') {
      chartSeries.value = chartSeries.value.map((s) => ({
        ...s,
        data: [...s.data.slice(1), Math.max(0, s.data.at(-1) + Math.round((Math.random() - 0.4) * 80))],
      }))
    }
  }, 30000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

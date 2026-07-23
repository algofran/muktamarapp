<template>
  <div class="flex min-h-screen bg-[#F8FAFC] text-[#0F172A]">
    <AppSidebar />

    <main class="flex-1 overflow-y-auto p-6">
      <!-- Banner modul (seperti gambar) -->
      <div class="mb-5 flex flex-col items-center text-center">
        <span class="rounded-full bg-[#4AA465] px-4 py-1 text-xs font-semibold text-white shadow-sm">
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
              <span class="h-2 w-2 rounded-full bg-[#4AA465]" /> Online
            </span>
            <span>Update: {{ lastUpdated }}</span>
            <button
              @click="refresh"
              class="inline-flex items-center gap-1 rounded-md bg-[#4AA465] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3d8b54]"
            >
              <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': loading }" /> Refresh
            </button>
          </div>
        </div>

        <!-- 3 Stat Cards -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ZoomStatCard variant="blue"  title="Zoom 1 (Laki-laki)" :total="1024" :join="856"  :active="124" :leave="44" />
          <ZoomStatCard variant="pink"  title="Zoom 2 (Perempuan)" :total="843"  :join="712"  :active="96"  :leave="35" />
          <ZoomStatCard variant="green" title="Total Keseluruhan"  :total="1867" :join="1568" :active="220" :leave="79" />
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
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RefreshCw } from 'lucide-vue-next'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ZoomStatCard from '@/components/dashboard/ZoomStatCard.vue'
import ActivityTable from '@/components/dashboard/ActivityTable.vue'
import RealtimeChart from '@/components/dashboard/RealtimeChart.vue'

const loading = ref(false)
const lastUpdated = ref(new Date().toLocaleTimeString('id-ID'))

// --- Data dummy (ganti dengan fetch ke /api/dashboard/* atau WebSocket) ---
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

// --- Auto-refresh 30s (FR-DASH-2) + simulasi data real-time ---
let timer = null
const refresh = async () => {
  loading.value = true
  // TODO: await fetch('/api/dashboard/overview') & '/activity' & '/graph'
  lastUpdated.value = new Date().toLocaleTimeString('id-ID')
  setTimeout(() => (loading.value = false), 400)
}
onMounted(() => {
  timer = setInterval(() => {
    lastUpdated.value = new Date().toLocaleTimeString('id-ID')
    // simulasi: geser series (ganti dengan event WebSocket `dashboard:graph`)
    chartSeries.value = chartSeries.value.map((s) => ({
      ...s,
      data: [...s.data.slice(1), Math.max(0, s.data.at(-1) + Math.round((Math.random() - 0.4) * 80))],
    }))
  }, 30000)
})
onUnmounted(() => clearInterval(timer))
</script>

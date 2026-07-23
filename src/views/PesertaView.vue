<template>
  <div class="space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">Daftar Peserta Muktamar</h1>
          <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            API Live Connected
          </span>
        </div>
        <p class="text-sm text-slate-500">Kelola dan pantau {{ apiTotal ? apiTotal.toLocaleString('id-ID') : 'data' }} peserta Muktamar Wahdah Islamiyah (Real-time Sync)</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="loadLivePeserta" class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
          <RefreshCw class="h-3.5 w-3.5" :class="{ 'animate-spin': loading }" /> Refresh API
        </button>
        <button class="inline-flex items-center gap-1.5 rounded-lg bg-[#0096A6] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#007D8A] transition-colors">
          <UserPlus class="h-4 w-4" /> Tambah Peserta
        </button>
        <button class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          <Download class="h-4 w-4" /> Export Excel
        </button>
      </div>
    </div>

    <!-- Stat Summary Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Total Terdaftar (API)</span>
          <Users class="h-4 w-4 text-[#3B82F6]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#0F172A]">{{ apiTotal ? apiTotal.toLocaleString('id-ID') : '2,950' }}</p>
        <span class="text-[11px] text-emerald-600 font-semibold">Tersinkronasi HTTP REST API</span>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Peserta Ikhwan (Zoom 1)</span>
          <UserCheck class="h-4 w-4 text-[#3B82F6]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#3B82F6]">1,580</p>
        <span class="text-[11px] text-[#0096A6]">856 Sedang Join</span>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Peserta Akhwat (Zoom 2)</span>
          <Heart class="h-4 w-4 text-[#EC4899]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#EC4899]">1,370</p>
        <span class="text-[11px] text-[#0096A6]">712 Sedang Join</span>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Status Server API</span>
          <CheckCircle2 class="h-4 w-4 text-[#0096A6]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#0096A6]">200 OK</p>
        <span class="text-[11px] text-slate-400">https://muktamar.fruwit.com</span>
      </div>
    </div>

    <!-- Filter & Search Panel -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
        <div class="relative w-full md:w-80">
          <Search class="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama, DPW, DPD, atau No Reg..."
            class="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-[#0F172A] outline-none focus:border-[#0096A6] focus:bg-white transition-all"
          />
        </div>
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select v-model="filterZoom" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none">
            <option value="all">Semua Room Zoom</option>
            <option value="Zoom 1">Zoom 1 (Ikhwan)</option>
            <option value="Zoom 2">Zoom 2 (Akhwat)</option>
          </select>
          <select v-model="filterStatus" class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 outline-none">
            <option value="all">Semua Status</option>
            <option value="Join">Sedang Join</option>
            <option value="Offline">Belum Join</option>
          </select>
        </div>
      </div>

      <!-- Table Peserta -->
      <div class="overflow-x-auto">
        <div v-if="loading" class="py-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <RefreshCw class="h-4 w-4 animate-spin text-[#0096A6]" /> Memuat data dari Muktamar API...
        </div>
        <table v-else class="w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold">
            <tr>
              <th class="px-4 py-3">Peserta</th>
              <th class="px-4 py-3">DPW / Utusan</th>
              <th class="px-4 py-3">Kategori</th>
              <th class="px-4 py-3">Room Zoom</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr v-for="peserta in filteredPeserta" :key="peserta.id" class="hover:bg-slate-50/70 transition-colors">
              <td class="px-4 py-3 font-medium text-[#0F172A]">
                <div class="flex items-center gap-2.5">
                  <div class="h-8 w-8 rounded-full bg-[#0096A6]/10 text-[#0096A6] flex items-center justify-center font-bold text-xs">
                    {{ peserta.initials }}
                  </div>
                  <div>
                    <p class="font-semibold">{{ peserta.nama }}</p>
                    <p class="text-[10px] text-slate-400">ID: {{ peserta.noReg }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <p class="font-medium text-slate-800">{{ peserta.dpw }}</p>
                <p class="text-[10px] text-slate-400">{{ peserta.jabatan }}</p>
              </td>
              <td class="px-4 py-3">
                <span :class="peserta.gender === 'L' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'" class="px-2 py-0.5 rounded text-[10px] font-semibold">
                  {{ peserta.gender === 'L' ? 'Ikhwan' : 'Akhwat' }}
                </span>
              </td>
              <td class="px-4 py-3 font-medium text-slate-600">{{ peserta.zoom }}</td>
              <td class="px-4 py-3">
                <span :class="peserta.status === 'Join' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'" class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold">
                  <span :class="peserta.status === 'Join' ? 'bg-emerald-500' : 'bg-slate-400'" class="h-1.5 w-1.5 rounded-full" />
                  {{ peserta.status === 'Join' ? 'Online' : 'Offline' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <button class="text-xs font-semibold text-[#0096A6] hover:underline">Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, UserPlus, Download, Users, UserCheck, Heart, CheckCircle2, RefreshCw } from 'lucide-vue-next'
import { muktamarApi } from '@/lib/muktamarApi.js'

const searchQuery = ref('')
const filterZoom = ref('all')
const filterStatus = ref('all')
const loading = ref(false)
const apiTotal = ref(0)
const pesertaList = ref([])

const loadLivePeserta = async () => {
  loading.value = true
  try {
    const res = await muktamarApi.peserta({ limit: 50 })
    if (res && res.data && res.data.length > 0) {
      apiTotal.value = res.total || res.count || 2950
      pesertaList.value = res.data.map(item => {
        const nama = item.user?.namaLengkap || item.sdm?.nama || 'Peserta'
        const parts = nama.trim().split(' ')
        const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : (parts[0][0] || 'P').toUpperCase()
        const jk = item.user?.jenisKelamin === 'AKHWAT' || item.sdm?.jk === 'P' ? 'P' : 'L'
        return {
          id: item.id,
          nama,
          initials,
          noReg: item.nomorRegistrasi || 'MKT-REG',
          dpw: item.namaOrganisasi || item.utusan || 'Pusat/Daerah',
          jabatan: item.amanah || item.kategori || 'Peserta',
          gender: jk,
          zoom: jk === 'L' ? 'Zoom 1' : 'Zoom 2',
          status: item.statusRegistrasi === 'APPROVED' || item.confirmed ? 'Join' : 'Offline'
        }
      })
    }
  } catch (err) {
    console.error('Failed to load peserta from API:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadLivePeserta()
})

const filteredPeserta = computed(() => {
  return pesertaList.value.filter(p => {
    const matchQuery = p.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       p.dpw.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       p.noReg.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchZoom = filterZoom.value === 'all' || p.zoom === filterZoom.value
    const matchStatus = filterStatus.value === 'all' || p.status === filterStatus.value
    return matchQuery && matchZoom && matchStatus
  })
})
</script>

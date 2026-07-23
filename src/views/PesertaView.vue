<template>
  <div class="space-y-6">
    <!-- Header Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">Daftar Peserta Muktamar</h1>
        <p class="text-sm text-slate-500">Kelola dan pantau data peserta Muktamar Wahdah Islamiyah</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="inline-flex items-center gap-1.5 rounded-lg bg-[#4AA465] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#3d8b54] transition-colors">
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
          <span class="text-xs font-semibold text-slate-500">Total Terdaftar</span>
          <Users class="h-4 w-4 text-[#3B82F6]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#0F172A]">1,867</p>
        <span class="text-[11px] text-slate-400">Terverifikasi 100%</span>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Peserta Ikhwan (Zoom 1)</span>
          <UserCheck class="h-4 w-4 text-[#3B82F6]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#3B82F6]">1,024</p>
        <span class="text-[11px] text-[#4AA465]">856 Sedang Join</span>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Peserta Akhwat (Zoom 2)</span>
          <Heart class="h-4 w-4 text-[#EC4899]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#EC4899]">843</p>
        <span class="text-[11px] text-[#4AA465]">712 Sedang Join</span>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500">Kehadiran Hari Ini</span>
          <CheckCircle2 class="h-4 w-4 text-[#4AA465]" />
        </div>
        <p class="mt-2 text-2xl font-bold text-[#4AA465]">84.0%</p>
        <span class="text-[11px] text-slate-400">1,568 dari 1,867 peserta</span>
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
            class="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-[#0F172A] outline-none focus:border-[#4AA465] focus:bg-white transition-all"
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
        <table class="w-full text-left text-xs">
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
                  <div class="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
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
                <button class="text-xs font-semibold text-[#4AA465] hover:underline">Detail</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, UserPlus, Download, Users, UserCheck, Heart, CheckCircle2 } from 'lucide-vue-next'

const searchQuery = ref('')
const filterZoom = ref('all')
const filterStatus = ref('all')

const pesertaList = ref([
  { id: 1, nama: 'Muhammad Adhan', initials: 'MA', noReg: 'MKT-001', dpw: 'DPP Pusdatin', jabatan: 'Sekretaris', gender: 'L', zoom: 'Zoom 1', status: 'Join' },
  { id: 2, nama: 'Muh. Ikhwan Kapai', initials: 'IK', noReg: 'MKT-002', dpw: 'DPW Sultra', jabatan: 'Ketua', gender: 'L', zoom: 'Zoom 1', status: 'Join' },
  { id: 3, nama: 'Siti Nurhaliza', initials: 'SN', noReg: 'MKT-003', dpw: 'DPW Jabar', jabatan: 'Ketua Akhwat', gender: 'P', zoom: 'Zoom 2', status: 'Join' },
  { id: 4, nama: 'Harun Al-Rasyid', initials: 'HA', noReg: 'MKT-004', dpw: 'DPW Kalimantan', jabatan: 'Sekretaris', gender: 'L', zoom: 'Zoom 1', status: 'Offline' },
  { id: 5, nama: 'Fahmi Abdillah', initials: 'FA', noReg: 'MKT-005', dpw: 'DPD Banten', jabatan: 'Anggota', gender: 'L', zoom: 'Zoom 1', status: 'Join' },
  { id: 6, nama: 'Aisyah Rahma', initials: 'AR', noReg: 'MKT-006', dpw: 'DPW Jateng', jabatan: 'Bendahara Akhwat', gender: 'P', zoom: 'Zoom 2', status: 'Join' },
  { id: 7, nama: 'Fadli Ahmad', initials: 'FA', noReg: 'MKT-007', dpw: 'DPW Sulawesi Selatan', jabatan: 'Utusan', gender: 'L', zoom: 'Zoom 1', status: 'Join' }
])

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

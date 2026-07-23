<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">{{ roomTitle }}</h1>
        <p class="text-sm text-slate-500">Monitoring detail peserta dan status room Zoom real-time</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Connected
        </span>
      </div>
    </div>

    <!-- Capacity Card -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kapasitas Room</h3>
        <div class="mt-3 flex items-baseline justify-between">
          <span class="text-3xl font-bold text-[#0F172A]">{{ currentStats.join }} <span class="text-sm font-normal text-slate-400">/ {{ currentStats.total }} Peserta</span></span>
          <span class="text-sm font-bold text-[#4AA465]">{{ Math.round((currentStats.join / currentStats.total) * 100) }}%</span>
        </div>
        <div class="mt-3 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div class="h-full bg-[#4AA465] rounded-full transition-all duration-500" :style="{ width: `${(currentStats.join / currentStats.total) * 100}%` }" />
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktif Berbicara</h3>
        <p class="mt-3 text-3xl font-bold text-[#3B82F6]">{{ currentStats.active }}</p>
        <span class="text-[11px] text-slate-400">Peserta unmuted</span>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Keluar (Leave)</h3>
        <p class="mt-3 text-3xl font-bold text-amber-500">{{ currentStats.leave }}</p>
        <span class="text-[11px] text-slate-400">Terdeteksi leave room</span>
      </div>
    </div>

    <!-- Active Participants in Room -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="text-base font-bold text-[#0F172A] mb-4">Daftar Peserta di {{ roomTitle }}</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold">
            <tr>
              <th class="px-4 py-3">Nama Peserta</th>
              <th class="px-4 py-3">Utusan DPW</th>
              <th class="px-4 py-3">Waktu Join</th>
              <th class="px-4 py-3">Audio / Video</th>
              <th class="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr v-for="p in participants" :key="p.id" class="hover:bg-slate-50/70">
              <td class="px-4 py-3 font-semibold text-[#0F172A]">{{ p.nama }}</td>
              <td class="px-4 py-3 text-slate-600">{{ p.dpw }}</td>
              <td class="px-4 py-3 text-slate-500 font-mono">{{ p.waktuJoin }}</td>
              <td class="px-4 py-3">
                <span :class="p.mic ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'" class="px-2 py-0.5 rounded text-[10px] font-semibold mr-1">
                  {{ p.mic ? 'Mic ON' : 'Mic Mute' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <button class="text-xs font-semibold text-rose-600 hover:underline">Mute</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = computed(() => route.params.id || '1')
const roomTitle = computed(() => roomId.value === '2' ? 'Zoom 2 (Perempuan)' : 'Zoom 1 (Laki-laki)')

const currentStats = computed(() => {
  return roomId.value === '2'
    ? { total: 843, join: 712, active: 96, leave: 35 }
    : { total: 1024, join: 856, active: 124, leave: 44 }
})

const participants = [
  { id: 1, nama: 'DPP.Pusdatin - Muhammad Adhan', dpw: 'DPP Pusdatin', waktuJoin: '08:02:15', mic: true },
  { id: 2, nama: 'DPW.Sultra - Muh. Ikhwan Kapai', dpw: 'DPW Sultra', waktuJoin: '08:05:40', mic: false },
  { id: 3, nama: 'DPD.Banten - Fahmi Abdillah', dpw: 'DPD Banten', waktuJoin: '08:12:01', mic: false },
]
</script>

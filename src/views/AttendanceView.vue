<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">Presensi & Kehadiran</h1>
        <p class="text-sm text-slate-500">Rekapitulasi absensi kehadiran peserta Muktamar</p>
      </div>
      <button class="inline-flex items-center gap-1.5 rounded-lg bg-[#4AA465] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#3d8b54]">
        <Download class="h-4 w-4" /> Download Rekap Absensi
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-xs font-semibold text-slate-500">Hadir (Checked-In)</h3>
        <p class="mt-2 text-3xl font-bold text-[#4AA465]">1,568</p>
        <span class="text-[11px] text-slate-400">84.0% dari total peserta</span>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-xs font-semibold text-slate-500">Izin / Sakit</h3>
        <p class="mt-2 text-3xl font-bold text-amber-500">42</p>
        <span class="text-[11px] text-slate-400">Telah memberikan konfirmasi</span>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-xs font-semibold text-slate-500">Belum Hadir</h3>
        <p class="mt-2 text-3xl font-bold text-rose-500">257</p>
        <span class="text-[11px] text-slate-400">Diingatkan via WhatsApp</span>
      </div>
    </div>

    <!-- Attendance Table -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="text-base font-bold text-[#0F172A] mb-4">Log Kehadiran Peserta</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold">
            <tr>
              <th class="px-4 py-3">Nama Peserta</th>
              <th class="px-4 py-3">DPW</th>
              <th class="px-4 py-3">Sesi Muktamar</th>
              <th class="px-4 py-3">Waktu Presensi</th>
              <th class="px-4 py-3">Metode</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr v-for="log in attendanceLogs" :key="log.id" class="hover:bg-slate-50/70">
              <td class="px-4 py-3 font-semibold text-[#0F172A]">{{ log.nama }}</td>
              <td class="px-4 py-3 text-slate-600">{{ log.dpw }}</td>
              <td class="px-4 py-3 text-slate-600">{{ log.sesi }}</td>
              <td class="px-4 py-3 font-mono text-slate-500">{{ log.waktu }}</td>
              <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                  {{ log.metode }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download } from 'lucide-vue-next'

const attendanceLogs = ref([
  { id: 1, nama: 'Muhammad Adhan', dpw: 'DPP Pusdatin', sesi: 'Sidang Pleno I', waktu: '08:02:15', metode: 'Zoom Auto Sync' },
  { id: 2, nama: 'Muh. Ikhwan Kapai', dpw: 'DPW Sultra', sesi: 'Sidang Pleno I', waktu: '08:05:40', metode: 'Zoom Auto Sync' },
  { id: 3, nama: 'Siti Nurhaliza', dpw: 'DPW Jabar', sesi: 'Sidang Pleno I', waktu: '08:10:12', metode: 'Zoom Auto Sync' },
])
</script>

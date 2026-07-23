<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">Agenda & Jadwal Muktamar</h1>
        <p class="text-sm text-slate-500">Susunan acara dan sidang Pra Muktamar V Wahdah Islamiyah</p>
      </div>
      <button class="inline-flex items-center gap-1.5 rounded-lg bg-[#4AA465] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#3d8b54]">
        <Plus class="h-4 w-4" /> Tambah Sesi
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div v-for="agenda in agendas" :key="agenda.id" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
          <span :class="agenda.status === 'Berlangsung' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600'" class="px-2.5 py-1 rounded-md border text-[11px] font-semibold flex items-center gap-1.5">
            <span :class="agenda.status === 'Berlangsung' ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'" class="h-2 w-2 rounded-full" />
            {{ agenda.status }}
          </span>
          <span class="text-xs text-slate-400 font-mono">{{ agenda.waktu }}</span>
        </div>

        <div>
          <h3 class="font-bold text-base text-[#0F172A]">{{ agenda.judul }}</h3>
          <p class="mt-1 text-xs text-slate-500">{{ agenda.deskripsi }}</p>
        </div>

        <div class="space-y-2 pt-2 text-xs text-slate-600">
          <div class="flex items-center gap-2">
            <User class="h-3.5 w-3.5 text-slate-400" />
            <span>Pemateri: <strong>{{ agenda.pemateri }}</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <Video class="h-3.5 w-3.5 text-slate-400" />
            <span>Ruang: <strong>{{ agenda.room }}</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus, User, Video } from 'lucide-vue-next'

const agendas = ref([
  { id: 1, judul: 'Sidang Pleno I: Pembacaan Tatib & Laporan', waktu: '08:00 - 10:00 WITA', status: 'Berlangsung', pemateri: 'Panitia Pengarah', room: 'Zoom 1 & Zoom 2' },
  { id: 2, judul: 'Sidang Pleno II: Tanggapan LPJ DPW', waktu: '10:15 - 12:00 WITA', status: 'Akan Datang', pemateri: 'Presidium Sidang', room: 'Zoom 1 (Laki-laki)' },
  { id: 3, judul: 'Sidang Komisi A, B & C', waktu: '13:30 - 16:00 WITA', status: 'Akan Datang', pemateri: 'Ketua Komisi', room: 'Breakout Rooms' },
])
</script>

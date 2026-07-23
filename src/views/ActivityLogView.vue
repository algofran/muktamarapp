<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">Log Aktivitas & Audit Trail</h1>
        <p class="text-sm text-slate-500">Catatan aktivitas real-time panitia dan sistem Pra Muktamar V</p>
      </div>
      <button class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
        <Filter class="h-4 w-4" /> Filter Log
      </button>
    </div>

    <!-- Table Audit Log -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold">
            <tr>
              <th class="px-4 py-3">Waktu</th>
              <th class="px-4 py-3">Aktor / Panitia</th>
              <th class="px-4 py-3">Aktivitas</th>
              <th class="px-4 py-3">Kategori</th>
              <th class="px-4 py-3">IP / Device</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr v-for="log in logs" :key="log.id" class="hover:bg-slate-50/70">
              <td class="px-4 py-3 font-mono text-slate-500">{{ log.waktu }}</td>
              <td class="px-4 py-3 font-semibold text-[#0F172A]">{{ log.aktor }}</td>
              <td class="px-4 py-3 text-slate-600">{{ log.aktivitas }}</td>
              <td class="px-4 py-3">
                <span :class="kategoriClass(log.kategori)" class="px-2 py-0.5 rounded text-[10px] font-semibold">
                  {{ log.kategori }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-400 font-mono text-[11px]">{{ log.ip }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Filter } from 'lucide-vue-next'

const logs = ref([
  { id: 1, waktu: '09:05:31', aktor: 'System Auto', aktivitas: 'Peserta Fahmi Abdillah leave Zoom 1', kategori: 'Zoom Event', ip: '10.0.4.12' },
  { id: 2, waktu: '09:02:47', aktor: 'DPW.Sultra (Ikhwan)', aktivitas: 'Peserta Muh. Ikhwan Kapai join Zoom 1', kategori: 'Zoom Event', ip: '192.168.1.19' },
  { id: 3, waktu: '08:45:10', aktor: 'Admin Pusdatin', aktivitas: 'Kirim broadcast pengingat Zoom ke 257 peserta', kategori: 'Broadcast', ip: '172.27.16.1' },
  { id: 4, waktu: '08:00:00', aktor: 'Admin Pusdatin', aktivitas: 'Membuka room Zoom 1 & Zoom 2', kategori: 'System', ip: '172.27.16.1' }
])

const kategoriClass = (kat) => {
  if (kat === 'Zoom Event') return 'bg-blue-50 text-blue-700'
  if (kat === 'Broadcast') return 'bg-emerald-50 text-emerald-700'
  return 'bg-purple-50 text-purple-700'
}
</script>

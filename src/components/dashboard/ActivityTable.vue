<template>
  <div class="rounded-xl border border-slate-200">
    <div class="border-b border-slate-200 px-4 py-3">
      <h3 class="text-sm font-semibold text-[#0F172A]">Aktivitas Peserta Terbaru</h3>
    </div>

    <div class="max-h-[340px] overflow-y-auto">
      <table class="w-full text-left text-[13px]">
        <thead class="sticky top-0 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
          <tr>
            <th class="px-4 py-2 font-semibold">Nama Peserta</th>
            <th class="px-4 py-2 font-semibold">Zoom</th>
            <th class="px-4 py-2 font-semibold">Status</th>
            <th class="px-4 py-2 font-semibold">Waktu</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="(row, i) in rows" :key="i" class="hover:bg-slate-50/70">
            <td class="px-4 py-2.5 text-[#0F172A]">{{ row.nama }}</td>
            <td class="px-4 py-2.5 text-slate-600">{{ row.zoom }}</td>
            <td class="px-4 py-2.5">
              <span
                class="inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold text-white"
                :class="statusClass(row.status)"
              >{{ row.status }}</span>
            </td>
            <td class="px-4 py-2.5 tabular-nums text-slate-500">{{ row.waktu }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({ rows: Array })

// Join & Sedang Join = hijau (sesuai gambar); Leave = merah (palet)
// Ubah 'Sedang Join' ke 'bg-[#3B82F6]' bila ingin mengikuti PRD §9.1
const statusClass = (s) => ({
  'Join':        'bg-[#4AA465]',
  'Sedang Join': 'bg-[#4AA465]',
  'Leave':       'bg-[#DE3B32]',
}[s] || 'bg-slate-400')
</script>

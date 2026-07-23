<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-[#0F172A]">Pengingat & Broadcast WhatsApp</h1>
        <p class="text-sm text-slate-500">Kirim notifikasi pengingat ke peserta Muktamar</p>
      </div>
      <button class="inline-flex items-center gap-1.5 rounded-lg bg-[#0096A6] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#007D8A]">
        <Send class="h-4 w-4" /> Broadcast Baru
      </button>
    </div>

    <!-- Form Broadcast Quick Send -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <h3 class="text-base font-bold text-[#0F172A]">Kirim Broadcast Pengingat Cepat</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Target Penerima</label>
          <select v-model="target" class="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 outline-none">
            <option value="belum_join">Peserta yang Belum Join Zoom (257 Peserta)</option>
            <option value="semua">Semua Peserta Terdaftar (1,867 Peserta)</option>
            <option value="ikhwan">Ikhwan Saja (Zoom 1)</option>
            <option value="akhwat">Akhwat Saja (Zoom 2)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Template Pesan</label>
          <select v-model="template" class="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 outline-none">
            <option value="pleno">Pengingat Sidang Pleno Segera Dimulai</option>
            <option value="sholat">Pengingat Istirahat & Shalat</option>
            <option value="custom">Pesan Custom</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Isi Pesan WhatsApp</label>
        <textarea
          rows="3"
          v-model="messageText"
          class="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-[#0F172A] outline-none focus:border-[#0096A6] focus:bg-white"
        />
      </div>

      <div class="flex justify-end">
        <button @click="sendBroadcast" class="inline-flex items-center gap-2 rounded-lg bg-[#0096A6] px-5 py-2 text-xs font-semibold text-white hover:bg-[#007D8A]">
          <Send class="h-4 w-4" /> Kirim Sekarang
        </button>
      </div>
    </div>

    <!-- Log History -->
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 class="text-base font-bold text-[#0F172A] mb-4">Riwayat Pengiriman Pengingat</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold">
            <tr>
              <th class="px-4 py-3">Waktu</th>
              <th class="px-4 py-3">Target</th>
              <th class="px-4 py-3">Isi Pesan</th>
              <th class="px-4 py-3">Jumlah Terkirim</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr v-for="h in history" :key="h.id" class="hover:bg-slate-50/70">
              <td class="px-4 py-3 font-mono text-slate-500">{{ h.waktu }}</td>
              <td class="px-4 py-3 font-semibold text-slate-800">{{ h.target }}</td>
              <td class="px-4 py-3 text-slate-600 max-w-xs truncate">{{ h.pesan }}</td>
              <td class="px-4 py-3 font-semibold text-emerald-700">{{ h.terkirim }} Peserta</td>
              <td class="px-4 py-3">
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                  Selesai
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
import { Send } from 'lucide-vue-next'

const target = ref('belum_join')
const template = ref('pleno')
const messageText = ref('Assalamu\'alaikum Wr. Wb. Bapak/Ibu Peserta Muktamar, Sidang Pleno I akan segera dimulai dalam 15 menit. Mohon segera bergabung ke Zoom.')

const history = ref([
  { id: 1, waktu: '08:45:10', target: 'Belum Join Zoom 1 & 2', pesan: 'Assalamu\'alaikum, mohon segera bergabung ke Zoom.', terkirim: 257 },
  { id: 2, waktu: '07:30:00', target: 'Semua Peserta', pesan: 'Selamat pagi, persiapkan absensi Pra Muktamar V.', terkirim: 1867 }
])

const sendBroadcast = () => {
  alert('Broadcast pengingat berhasil dikirim ke ' + target.value)
}
</script>

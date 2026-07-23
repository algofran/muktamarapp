<template>
  <div class="flex h-[80vh] flex-col items-center justify-center text-center">
    <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm max-w-md w-full space-y-4">
      <div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-600">
        <LogOut class="h-7 w-7" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-[#0F172A]">Konfirmasi Keluar</h2>
        <p class="mt-1 text-xs text-slate-500">Apakah Anda yakin ingin keluar dari aplikasi Dashboard Panitia Pra Muktamar V?</p>
      </div>

      <div class="flex items-center gap-3 pt-2">
        <router-link to="/dashboard" class="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
          Batal
        </router-link>
        <button @click="doLogout" class="flex-1 rounded-lg bg-rose-600 py-2.5 text-xs font-semibold text-white hover:bg-rose-700">
          Ya, Keluar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()
const doLogout = () => {
  localStorage.removeItem('access_token')
  router.push('/dashboard')
}
</script>

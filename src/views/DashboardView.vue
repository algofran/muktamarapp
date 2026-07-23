<template>
  <div class="flex min-h-screen bg-[#F8FAFC]">
    <Sidebar />
    
    <main class="flex-1 p-8">
      <!-- Header Halaman -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-[#0F172A]">Dashboard Pra Muktamar</h2>
          <p class="text-muted-foreground mt-1">
            Pantau registrasi, agenda, dan laporan kegiatan secara real-time.
          </p>
        </div>
        <Button class="bg-[#4AA465] hover:bg-[#3d8b54] text-white">
          + Tambah Peserta Manual
        </Button>
      </div>

      <!-- Grid Statistik -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Total Peserta Terdaftar" 
          value="1,248" 
          description="+12% dari bulan lalu" 
          badge="Aktif"
          :icon="UsersIcon"
        />
        <StatCard 
          title="Menunggu Verifikasi" 
          value="42" 
          description="Perlu tindak lanjut segera" 
          badgeType="warning"
          badge="Perlu Aksi"
          :icon="ClockIcon"
        />
        <StatCard 
          title="Sesi Agenda Aktif" 
          value="3" 
          description="Hari ini di Aula Utama" 
          :icon="CalendarIcon"
        />
        <StatCard 
          title="Laporan Generated" 
          value="18" 
          description="Dokumen siap unduh" 
          :icon="FileTextIcon"
        />
      </div>

      <!-- Area Konten Utama (Tabel/Chart) -->
      <div class="rounded-xl border bg-card p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-[#0F172A] mb-4">Aktivitas Registrasi Terbaru</h3>
        <!-- Di sini Anda bisa memasukkan komponen DataTable Shadcn Vue -->
        <div class="h-64 flex items-center justify-center bg-[#A1D6E2]/10 rounded-lg border border-dashed border-[#A1D6E2]">
          <p class="text-[#0F172A]/60">Tabel Data Peserta akan dirender di sini</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import StatCard from '@/components/StatCard.vue'
import { Button } from '@/components/ui/button'
// Import ikon dari lucide-vue-next
import { Users as UsersIcon, Clock as ClockIcon, Calendar as CalendarIcon, FileText as FileTextIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex min-h-screen bg-background">
    <!-- Sidebar Navigasi -->
    <Sidebar />
    
    <!-- Konten Utama -->
    <main class="flex-1 p-8 overflow-y-auto">
      <!-- Header Halaman -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-foreground">Dashboard Pra Muktamar</h2>
          <p class="text-muted-foreground mt-1">
            Pantau registrasi, agenda, dan laporan kegiatan secara real-time.
          </p>
        </div>
        <Button class="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
          <span class="mr-2">+</span> Tambah Peserta Manual
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
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-foreground">Aktivitas Registrasi Terbaru</h3>
          <Button variant="outline" size="sm" class="text-foreground border-border hover:bg-secondary/30">
            Lihat Semua
          </Button>
        </div>
        
        <!-- Placeholder Tabel Data -->
        <div class="rounded-lg border border-dashed bg-muted/30 p-8">
          <div class="flex flex-col items-center justify-center text-center">
            <div class="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mb-3">
              <UsersIcon class="h-6 w-6 text-secondary-foreground/60" />
            </div>
            <h4 class="text-sm font-medium text-foreground mb-1">Data Peserta Akan Ditampilkan Di Sini</h4>
            <p class="text-xs text-muted-foreground max-w-md">
              Tabel interaktif dengan fitur pencarian, filter, dan pagination akan diimplementasikan pada modul Manajemen Data Peserta.
            </p>
          </div>
        </div>
      </div>

      <!-- Section Agenda Mendatang -->
      <div class="mt-6 rounded-xl border bg-card p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-foreground">Agenda Mendatang</h3>
          <Button variant="ghost" size="sm" class="text-primary hover:text-primary/80">
            Lihat Kalender
          </Button>
        </div>
        
        <div class="space-y-3">
          <div class="flex items-center gap-4 p-3 rounded-lg border bg-background hover:shadow-sm transition-shadow">
            <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CalendarIcon class="h-5 w-5 text-primary" />
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-foreground">Rapat Koordinasi Panitia</h4>
              <p class="text-xs text-muted-foreground">Aula Utama • 14:00 WIB</p>
            </div>
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">Hari Ini</span>
          </div>
          
          <div class="flex items-center gap-4 p-3 rounded-lg border bg-background hover:shadow-sm transition-shadow">
            <div class="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <UsersIcon class="h-5 w-5 text-secondary-foreground" />
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-foreground">Verifikasi Berkas Peserta</h4>
              <p class="text-xs text-muted-foreground">Ruang Administrasi • 09:00 WIB</p>
            </div>
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">Besok</span>
          </div>
          
          <div class="flex items-center gap-4 p-3 rounded-lg border bg-background hover:shadow-sm transition-shadow">
            <div class="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <FileTextIcon class="h-5 w-5 text-accent-foreground" />
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold text-foreground">Finalisasi Laporan Tahap 1</h4>
              <p class="text-xs text-muted-foreground">Online • Deadline 23:59 WIB</p>
            </div>
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/20 text-accent-foreground">3 Hari</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import StatCard from '@/components/StatCard.vue'
import Button from '@/components/ui/Button.vue'
// Import ikon dari lucide-vue-next
import { 
  Users as UsersIcon, 
  Clock as ClockIcon, 
  Calendar as CalendarIcon, 
  FileText as FileTextIcon 
} from 'lucide-vue-next'

// State untuk data dinamis (akan diisi dari API)
const stats = ref({
  totalPeserta: 1248,
  menungguVerifikasi: 42,
  sesiAktif: 3,
  laporanGenerated: 18
})
</script>

<style scoped>
/* Animasi smooth untuk hover effects */
.rounded-xl {
  transition: all 0.2s ease-in-out;
}
</style>

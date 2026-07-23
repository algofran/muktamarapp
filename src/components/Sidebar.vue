<template>
  <aside class="w-64 bg-card border-r border-border h-screen flex flex-col">
    <!-- Header Sidebar -->
    <div class="h-16 flex items-center px-6 border-b border-border">
      <h1 class="text-xl font-bold text-[#4AA465] flex items-center gap-2">
        <span class="text-2xl">🕌</span> Muktamar App
      </h1>
    </div>

    <!-- Navigasi -->
    <nav class="flex-1 px-4 py-6 space-y-2">
      <SidebarLink 
        v-for="item in menuItems" 
        :key="item.name"
        :item="item"
        :is-active="currentRoute === item.route"
      />
    </nav>

    <!-- Footer Sidebar (User Profile) -->
    <div class="p-4 border-t border-border">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-full bg-[#A1D6E2] flex items-center justify-center text-[#0F172A] font-bold">
          AD
        </div>
        <div>
          <p class="text-sm font-semibold text-foreground">Admin Dashboard</p>
          <p class="text-xs text-muted-foreground">admin@muktamar.id</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import SidebarLink from './SidebarLink.vue'
import { LayoutDashboard, Users, Calendar, FileText } from 'lucide-vue-next'

// Asumsi Anda menggunakan Vue Router
const currentRoute = ref('/dashboard')

const menuItems = [
  { name: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
  { name: 'Data Peserta', route: '/peserta', icon: Users },
  { name: 'Agenda Kegiatan', route: '/agenda', icon: Calendar },
  { name: 'Laporan & Unduhan', route: '/laporan', icon: FileText },
]
</script>

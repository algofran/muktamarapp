<template>
  <aside
    class="flex w-64 shrink-0 flex-col bg-gradient-to-b from-[#155431] to-[#0b3a1f] text-white"
  >
    <!-- Brand / Logo -->
    <div class="flex items-center gap-3 px-5 py-5">
      <div class="grid h-10 w-10 place-items-center rounded-xl bg-[#4AA465]/30 ring-1 ring-[#4AA465]/50">
        <Leaf class="h-5 w-5 text-[#A1D6E2]" />
      </div>
      <div class="leading-tight">
        <p class="text-sm font-bold">Pra Muktamar V</p>
        <p class="text-[11px] text-white/70">Wahdah Islamiyah</p>
      </div>
    </div>

    <!-- Menu -->
    <nav class="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      <router-link
        v-for="item in menu"
        :key="item.label"
        :to="item.to"
        class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        :class="
          isActive(item.to)
            ? 'bg-[#4AA465] text-white shadow-sm'
            : 'text-white/75 hover:bg-white/10 hover:text-white'
        "
      >
        <component :is="item.icon" class="h-[18px] w-[18px] shrink-0" />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer -->
    <div class="border-t border-white/10 px-4 py-3 text-[11px] text-white/50">
      v1.0 · Terpantau, Tertib, Tercatat
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import {
  Home, Users, CalendarDays, Video, ClipboardList,
  Bell, Megaphone, FileText, Settings, ScrollText, LogOut, Leaf,
} from 'lucide-vue-next'

const route = useRoute()
const isActive = (to) => route.path === to

const menu = [
  { label: 'Dashboard',            to: '/dashboard',     icon: Home },
  { label: 'Peserta',              to: '/peserta',       icon: Users },
  { label: 'Agenda',               to: '/agenda',        icon: CalendarDays },
  { label: 'Zoom 1 (Laki-laki)',   to: '/zoom/1',        icon: Video },
  { label: 'Zoom 2 (Perempuan)',   to: '/zoom/2',        icon: Video },
  { label: 'Attendance',           to: '/attendance',    icon: ClipboardList },
  { label: 'Reminder',             to: '/reminder',      icon: Bell },
  { label: 'Pengingat (Reminder)', to: '/pengingat',     icon: Megaphone },
  { label: 'Laporan',              to: '/laporan',       icon: FileText },
  { label: 'Pengaturan',           to: '/pengaturan',    icon: Settings },
  { label: 'Log Aktivitas',        to: '/log-aktivitas', icon: ScrollText },
  { label: 'Keluar',               to: '/logout',        icon: LogOut },
]
</script>

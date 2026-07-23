<template>
  <aside class="w-64 border-r bg-white p-4">
    <div class="mb-6 flex items-center gap-2">
      <div class="h-8 w-8 rounded-lg bg-[#4AA465]" />
      <span v-if="expanded" class="text-base font-bold text-[#0F172A]">Zoom Monitoring</span>
    </div>

    <nav class="space-y-1">
      <a
        v-for="item in menuItems"
        :key="item.name"
        :href="item.href"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="isActive(item.href) ? 'bg-[#4AA465]/10 text-[#4AA465]' : 'text-slate-600 hover:bg-slate-100'"
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span v-if="expanded">{{ item.name }}</span>
      </a>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { LayoutDashboard, Users, Activity, Settings } from 'lucide-vue-next'

const route = useRoute()
const expanded = ref(true)

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Peserta', href: '/participants', icon: Users },
  { name: 'Aktivitas', href: '/activity', icon: Activity },
  { name: 'Pengaturan', href: '/settings', icon: Settings },
]

const isActive = (href) => route.path === href
</script>

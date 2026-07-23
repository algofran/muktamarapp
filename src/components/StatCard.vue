<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
    <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 class="tracking-tight text-sm font-medium text-muted-foreground">
        {{ title }}
      </h3>
      <!-- Ikon dengan warna aksen sesuai konteks -->
      <component :is="icon" class="h-5 w-5" :class="iconColorClass" />
    </div>
    <div class="p-6 pt-0">
      <div class="text-2xl font-bold">{{ value }}</div>
      <p class="text-xs text-muted-foreground mt-1">
        {{ description }}
      </p>
      <!-- Badge opsional -->
      <div v-if="badge" class="mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
           :class="badgeType === 'success' ? 'bg-primary/10 text-primary' : 'bg-accent/20 text-yellow-700'">
        {{ badge }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  description: String,
  icon: Object,
  badge: String,
  badgeType: { type: String, default: 'success' } // 'success' | 'warning'
})

const iconColorClass = computed(() => {
  if (props.badgeType === 'warning') return 'text-[#F9CA33]' // Kuning
  return 'text-[#4AA465]' // Hijau Utama
})
</script>

<template>
  <router-link 
    :to="item.route"
    class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    :class="isActive 
      ? 'bg-[#4AA465] text-white shadow-sm' 
      : 'text-foreground hover:bg-[#A1D6E2]/30 hover:text-[#0F172A]'"
  >
    <!-- Icon placeholder -->
    <span class="h-4 w-4">
      <component :is="item.icon" v-if="item.icon" />
    </span>
    {{ item.name }}
  </router-link>
</template>

<script setup>
defineProps({
  item: Object,
  isActive: Boolean
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl border p-5 transition-shadow hover:shadow-md"
    :class="containerClass"
  >
    <!-- Ikon pojok kiri atas -->
    <component :is="icon" class="absolute left-5 top-5 h-7 w-7" :class="accentText" />

    <!-- Judul + angka (tengah) -->
    <div class="text-center">
      <p class="text-sm font-semibold text-[#0F172A]">{{ title }}</p>
      <p class="mt-2 text-[44px] font-bold leading-none tracking-tight text-[#0F172A]">
        {{ total.toLocaleString('id-ID') }}
      </p>
      <p class="mt-1 text-xs text-[#0F172A]/60">Peserta</p>
    </div>

    <!-- Join / Sedang Join / Leave -->
    <div class="mt-4 grid grid-cols-3 border-t pt-3 text-center" :class="borderClass">
      <div v-for="s in subs" :key="s.label">
        <p class="text-[11px] text-[#0F172A]/60">{{ s.label }}</p>
        <p class="mt-0.5 text-lg font-bold text-[#0F172A]">
          {{ s.value.toLocaleString('id-ID') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { User, UsersRound } from 'lucide-vue-next'

const props = defineProps({
  variant: { type: String, default: 'teal' }, // 'blue' | 'pink' | 'teal' | 'red'
  title: String,
  total: Number,
  join: Number,
  active: Number,
  leave: Number,
})

const icon = computed(() => (props.variant === 'teal' || props.variant === 'green' ? UsersRound : User))

const palette = {
  blue:  { box: 'bg-[#0096A6]/10 border-[#0096A6]/30', text: 'text-[#0096A6]', border: 'border-[#0096A6]/25' },
  pink:  { box: 'bg-[#EC4899]/10 border-[#EC4899]/30', text: 'text-[#EC4899]', border: 'border-[#EC4899]/25' },
  teal:  { box: 'bg-[#0096A6]/15 border-[#0096A6]/40', text: 'text-[#0096A6]', border: 'border-[#0096A6]/30' },
  red:   { box: 'bg-[#ED1C24]/10 border-[#ED1C24]/30', text: 'text-[#ED1C24]', border: 'border-[#ED1C24]/25' },
  green: { box: 'bg-[#0096A6]/15 border-[#0096A6]/40', text: 'text-[#0096A6]', border: 'border-[#0096A6]/30' },
}

const containerClass = computed(() => (palette[props.variant] || palette.teal).box)
const accentText     = computed(() => (palette[props.variant] || palette.teal).text)
const borderClass    = computed(() => (palette[props.variant] || palette.teal).border)

const subs = computed(() => [
  { label: 'Join',        value: props.join },
  { label: 'Sedang Join', value: props.active },
  { label: 'Leave',       value: props.leave },
])
</script>

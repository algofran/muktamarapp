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
  variant: { type: String, default: 'green' }, // 'blue' | 'pink' | 'green'
  title: String,
  total: Number,
  join: Number,
  active: Number,
  leave: Number,
})

const icon = computed(() => (props.variant === 'green' ? UsersRound : User))

const palette = {
  blue:  { box: 'bg-[#A1D6E2]/35 border-[#A1D6E2]', text: 'text-[#3B82F6]', border: 'border-[#A1D6E2]/60' },
  pink:  { box: 'bg-[#EC4899]/10 border-[#EC4899]/30', text: 'text-[#EC4899]', border: 'border-[#EC4899]/25' },
  green: { box: 'bg-[#4AA465]/10 border-[#4AA465]/30', text: 'text-[#4AA465]', border: 'border-[#4AA465]/25' },
}

const containerClass = computed(() => palette[props.variant].box)
const accentText     = computed(() => palette[props.variant].text)
const borderClass    = computed(() => palette[props.variant].border)

const subs = computed(() => [
  { label: 'Join',        value: props.join },
  { label: 'Sedang Join', value: props.active },
  { label: 'Leave',       value: props.leave },
])
</script>

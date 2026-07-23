<template>
  <div class="rounded-xl border border-slate-200 p-4">
    <h3 class="mb-2 text-sm font-semibold text-[#0F172A]">Grafik Peserta (Real-time)</h3>
    <apexchart type="line" height="280" :options="options" :series="series" />
  </div>
</template>

<script setup>
defineProps({ series: Array })

const options = {
  chart: { id: 'realtime', animations: { enabled: true, speed: 400 }, toolbar: { show: false }, zoom: { enabled: false } },
  colors: ['#3B82F6', '#EC4899'],
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 3 },
  grid: { borderColor: '#E2E8F0', xaxis: { lines: { show: false } } },
  legend: { position: 'top', horizontalAlign: 'center', markers: { radius: 12 } },
  xaxis: { categories: ['08:00','08:30','09:00','09:30','10:00','10:30'], labels: { style: { colors: '#64748B' } } },
  yaxis: { min: 0, max: 1500, tickAmount: 3, labels: { style: { colors: '#64748B' } } },
  tooltip: { shared: true, intersect: false },
}
</script>

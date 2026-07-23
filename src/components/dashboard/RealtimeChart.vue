<template>
  <div class="rounded-xl border border-slate-200 bg-white">
    <div class="border-b border-slate-200 px-4 py-3">
      <h3 class="text-sm font-semibold text-[#0F172A]">Grafik Real-time Peserta</h3>
    </div>
    
    <div class="p-4">
      <div ref="chartContainer" class="h-[280px] w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  series: {
    type: Array,
    default: () => []
  }
})

const chartContainer = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartContainer.value) return
  
  chartInstance = echarts.init(chartContainer.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E2E8F0',
      borderWidth: 1,
      textStyle: {
        color: '#0F172A',
        fontSize: 12
      },
      padding: [10, 14],
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#4AA465'
        }
      }
    },
    legend: {
      data: props.series.map(s => s.name),
      bottom: 0,
      textStyle: {
        fontSize: 11,
        color: '#64748B'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['09:00', '09:05', '09:10', '09:15', '09:20', '09:25'],
      axisLine: {
        lineStyle: {
          color: '#E2E8F0'
        }
      },
      axisLabel: {
        color: '#64748B',
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#F1F5F9',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#64748B',
        fontSize: 10,
        formatter: '{value}'
      }
    },
    series: props.series.map((s, index) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineWidth: 2,
      data: s.data,
      itemStyle: {
        color: index === 0 ? '#3B82F6' : index === 1 ? '#EC4899' : '#4AA465'
      },
      lineStyle: {
        color: index === 0 ? '#3B82F6' : index === 1 ? '#EC4899' : '#4AA465',
        width: 2
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: index === 0 ? 'rgba(59, 130, 246, 0.1)' : index === 1 ? 'rgba(236, 72, 153, 0.1)' : 'rgba(74, 164, 101, 0.1)'
        }, {
          offset: 1,
          color: index === 0 ? 'rgba(59, 130, 246, 0.01)' : index === 1 ? 'rgba(236, 72, 153, 0.01)' : 'rgba(74, 164, 101, 0.01)'
        }])
      }
    }))
  }
  
  chartInstance.setOption(option)
}

onMounted(() => {
  initChart()
  
  window.addEventListener('resize', () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  })
})

watch(() => props.series, () => {
  if (chartInstance) {
    chartInstance.setOption({
      series: props.series.map((s, index) => ({
        name: s.name,
        data: s.data,
        itemStyle: {
          color: index === 0 ? '#3B82F6' : index === 1 ? '#EC4899' : '#4AA465'
        },
        lineStyle: {
          color: index === 0 ? '#3B82F6' : index === 1 ? '#EC4899' : '#4AA465'
        }
      })),
      legend: {
        data: props.series.map(s => s.name)
      }
    })
  }
}, { deep: true })
</script>

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/',          redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardMonitoring.vue') },
  // { path: '/peserta', ... }, { path: '/zoom/:id', ... }, dst.
]

export default createRouter({ history: createWebHistory(), routes })

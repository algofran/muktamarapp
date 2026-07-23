import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/',          redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/DashboardMonitoring.vue') },
  { path: '/peserta',   name: 'peserta',   component: () => import('@/views/Contacts.vue') },
  { path: '/laporan',   name: 'laporan',   component: () => import('@/views/Reports.vue') },
  { path: '/pengaturan', name: 'pengaturan', component: () => import('@/views/Settings.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

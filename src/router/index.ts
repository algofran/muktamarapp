import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/DashboardMonitoring.vue') },
      { path: 'peserta', name: 'peserta', component: () => import('@/views/PesertaView.vue') },
      { path: 'agenda', name: 'agenda', component: () => import('@/views/AgendaView.vue') },
      { path: 'zoom/:id', name: 'zoom-detail', component: () => import('@/views/ZoomDetailView.vue') },
      { path: 'attendance', name: 'attendance', component: () => import('@/views/AttendanceView.vue') },
      { path: 'reminder', name: 'reminder', component: () => import('@/views/ReminderView.vue') },
      { path: 'pengingat', name: 'pengingat', component: () => import('@/views/ReminderView.vue') },
      { path: 'laporan', name: 'laporan', component: () => import('@/views/Reports.vue') },
      { path: 'pengaturan', name: 'pengaturan', component: () => import('@/views/Settings.vue') },
      { path: 'log-aktivitas', name: 'log-aktivitas', component: () => import('@/views/ActivityLogView.vue') },
      { path: 'logout', name: 'logout', component: () => import('@/views/LogoutView.vue') },

      // Legacy & Template Aliases
      { path: 'contacts', redirect: '/peserta' },
      { path: 'companies', redirect: '/peserta' },
      { path: 'deals', redirect: '/zoom/1' },
      { path: 'tasks', redirect: '/agenda' },
      { path: 'reports', redirect: '/laporan' },
      { path: 'settings', redirect: '/pengaturan' },
      { path: 'billing', redirect: '/laporan' },
      { path: 'docs', redirect: '/dashboard' },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

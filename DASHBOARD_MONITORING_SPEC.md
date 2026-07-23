# Dashboard Monitoring Panitia — Pra Muktamar V

> **Tagline:** *Terpantau, Tertib, Tercatat*  
> **Stack:** Vue 3 + Vite + Tailwind CSS + Shadcn‑Vue + ApexCharts + Lucide Icons  
> **Versi Dokumen:** 1.0 (23 Juli 2026)

---

## 📋 Ringkasan

Dashboard ini adalah *command center* real-time bagi panitia untuk memantau dua ruang Zoom terpisah gender:
- **Zoom 1** = Laki-laki (tema biru `#A1D6E2`, grafik `#3B82F6`)
- **Zoom 2** = Perempuan (tema pink `#EC4899`, grafik `#EC4899`)

### Dua Sumber Data

| Sumber | Sifat | Token | Kegunaan |
|---|---|---|---|
| **API Public Muktamar** `muktamar.fruwit.com` | Read-only, sync tiap jam | Bearer `mkt_7F13...hflM` | Data master/statik: peserta, users, panitia, kapal, timeline, landing, lpj |
| **Backend Custom** `api.pramuktamar.wahdah.or.id` | Read-write + real-time | JWT (login dashboard) | Auth, Zoom real-time, reminder, laporan, audit log, settings |

> ⚠️ **PENTING:** API Public **TIDAK** menyediakan data Zoom real-time. Data real-time mengalir via: **Zoom Webhook → Backend Custom → WebSocket → Frontend**.

---

## 🎨 Palet Warna

| Peran | Nama | Hex | Penggunaan |
|---|---|---|---|
| Utama | Hijau | `#4AA465` | Tombol aksi, sidebar aktif, badge Join |
| Sekunder | Biru Muda | `#A1D6E2` | Latar card Zoom 1 |
| Error | Merah | `#DE3B32` | Badge Leave, status error |
| Warning | Kuning | `#F9CA33` | Peringatan, rating |
| Zoom 1 Grafik | Biru | `#3B82F6` | Garis grafik, ikon |
| Zoom 2 Grafik | Pink | `#EC4899` | Garis grafik, ikon |
| Sidebar | Gradient | `#155431 → #0b3a1f` | Latar sidebar |
| Latar App | Abu Terang | `#F8FAFC` | Background aplikasi |
| Teks | Abu Gelap | `#0F172A` | Teks utama |

---

## 📁 Struktur File Implementasi

```
src/
├─ assets/index.css              # CSS variables palet warna
├─ components/
│  ├─ layout/AppSidebar.vue      # Sidebar 12 menu
│  └─ dashboard/
│     ├─ ZoomStatCard.vue        # Card statistik (blue/pink/green)
│     ├─ ActivityTable.vue       # Tabel aktivitas peserta
│     └─ RealtimeChart.vue       # Grafik ApexCharts 2 seri
├─ views/DashboardMonitoring.vue # Halaman utama dashboard
├─ lib/
│  ├─ muktamarApi.js             # Client API Public Muktamar
│  ├─ dashboardApi.js            # Client Backend Custom (JWT + auto-refresh)
│  └─ socket.js                  # WebSocket real-time dengan auto-reconnect
├─ router/index.ts               # Router Vue
└─ main.ts                       # Entry point (ApexCharts registered)

.env                             # Environment variables (API URLs, tokens)
```

---

## 🔧 Environment Variables (`.env`)

```bash
# === A. API PUBLIC MUKTAMAR (data master, read-only) ===
VITE_MUKTAMAR_API_URL=https://muktamar.fruwit.com 
VITE_MUKTAMAR_API_TOKEN=mkt_7F13d0U9GqGdzJVca0XonFKd8EXEnTNelEMhP3GhflM
VITE_USE_MUKTAMAR_PROXY=false   # true = token disuntikkan server-side

# === B. BACKEND CUSTOM (auth + real-time + write) ===
VITE_DASHBOARD_API_URL=https://api.pramuktamar.wahdah.or.id 
VITE_DASHBOARD_WS_URL=wss://api.pramuktamar.wahdah.or.id

# === Backend only (JANGAN expose ke frontend) ===
# ZOOM_WEBHOOK_SECRET=zoom_whsec_xxxxxxxxxxxxx
# ZOOM_CLIENT_ID=...
# ZOOM_CLIENT_SECRET=...
# JWT_SECRET=ganti_dengan_string_acak_panjang
# JWT_EXPIRES_IN=30m
# JWT_REFRESH_EXPIRES_IN=7d
```

---

## 🚀 Instalasi & Menjalankan

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 📡 Spesifikasi API

### API Public Muktamar (Read-Only)

**Base URL:** `https://muktamar.fruwit.com`  
**Auth:** `Authorization: Bearer mkt_7F13d0U9GqGdzJVca0XonFKd8EXEnTNelEMhP3GhflM`

| Endpoint | Kegunaan |
|---|---|
| `GET /peserta` | Data peserta (2.870 records) |
| `GET /users` | Data users (2.380 records) |
| `GET /panitia` | Data panitia (1.064 records) |
| `GET /timeline` | Agenda/timeline event |
| `GET /landing` | Info event utama |
| `GET /lpj` | Laporan pertanggungjawaban |
| `GET /health` | Health check (no auth) |

**Filter dinamis:** `?field=nilai&match=exact&fields=a,b&limit=50&offset=0`

### Backend Custom (JWT Required)

**Base URL:** `https://api.pramuktamar.wahdah.or.id`

#### Authentication
| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | `/api/auth/login` | `{username,password}` | `{access_token, refresh_token, user}` |
| POST | `/api/auth/refresh` | `{refresh_token}` | `{access_token}` |
| POST | `/api/auth/logout` | — | `204` |
| GET | `/api/auth/me` | — | `{id,username,full_name,email,role}` |

#### Dashboard
| Method | Endpoint | Query | Response |
|---|---|---|---|
| GET | `/api/dashboard/overview` | — | `{zoom1, zoom2, total, connection, last_updated}` |
| GET | `/api/dashboard/room/:id` | — | `{room_name, gender, host, current, peak}` |
| GET | `/api/dashboard/activity` | `?limit=50&status=&room=` | `{items:[], total}` |
| GET | `/api/dashboard/graph` | `?from=&to=&room=1,2` | `{series:[{name,color,points}]}` |

#### Reminders
| Method | Endpoint | Body | Fitur |
|---|---|---|---|
| POST | `/api/reminders` | `{agenda_id, message, target, channels}` | Kirim reminder |
| GET | `/api/reminders` | `?limit&offset` | History reminder |
| GET | `/api/reminders/templates` | — | Template pesan |

#### Reports
| Method | Endpoint | Query | Response |
|---|---|---|---|
| GET | `/api/reports/attendance` | `?format=xlsx|pdf|csv&from=&to=` | File binary |
| GET | `/api/reports/summary` | `?from=&to=` | `{total_participants, avg_duration, attendance_rate}` |

### WebSocket Events

**Connection:** `wss://api.pramuktamar.wahdah.or.id/?token=<JWT>`

| Event | Arah | Payload | Trigger Update |
|---|---|---|---|
| `dashboard:stats` | S→C | `{zoom1:{}, zoom2:{}, total:{}}` | 3 Stat Cards |
| `dashboard:activity` | S→C | `{nama, room, status, timestamp}` | Tabel Aktivitas |
| `dashboard:graph` | S→C | `{room, count}` | Grafik Real-time |
| `dashboard:alert` | S→C | `{type, message, severity}` | Banner Alert |
| `system:sync` | S→C | `{status: "online"|"offline"|"syncing"}` | Indikator Koneksi |

---

## 🧩 Komponen Frontend

### AppSidebar.vue
- 12 menu sesuai PRD §5.8
- Active highlight hijau `#4AA465`
- Gradient background `#155431 → #0b3a1f`

### ZoomStatCard.vue
- Props: `variant` ('blue' | 'pink' | 'green'), `title`, `total`, `join`, `active`, `leave`
- Icon berbeda untuk Total (`UsersRound`) vs per-Zoom (`User`)

### ActivityTable.vue
- Kolom: Nama Peserta, Zoom, Status, Waktu
- Badge warna: Join/Sedang Join = hijau `#4AA465`, Leave = merah `#DE3B32`
- Scrollable max-height 340px

### RealtimeChart.vue
- ApexCharts line chart 2 seri
- Warna: Zoom 1 `#3B82F6`, Zoom 2 `#EC4899`
- Smooth curve, animated update

---

## 🔌 Integrasi Real-time

### useDashboardSocket Hook

```js
import { useDashboardSocket } from '@/lib/socket.js'

useDashboardSocket({
  'dashboard:stats': (data) => { /* update stat cards */ },
  'dashboard:activity': (data) => { /* prepend to activity table */ },
  'dashboard:graph': (data) => { /* append graph point */ },
  'system:sync': (data) => { /* update connection status */ },
  'dashboard:alert': (data) => { /* show alert toast */ },
})
```

**Fitur:**
- Auto-connect saat hook dipanggil
- Auto-reconnect dengan exponential backoff (max 30s)
- Handler per event type

### dashboardApi.js

Client dengan auto-refresh token:
- Simpan `access_token` dan `refresh_token` di localStorage
- Retry otomatis saat 401 dengan refresh token
- Redirect ke `/login` jika refresh gagal

---

## 🛡️ Error Handling

| Status | Aksi Frontend |
|---|---|
| 200 | Render data |
| 401 | Refresh token → retry sekali |
| 403 | Tampilkan "Akses ditolak" (no retry) |
| 404 | Tampilkan "Data tidak ditemukan" |
| 503 | Retry exponential backoff (data sync) |
| 500 | Tampilkan error + log |
| WS close | Reconnect backoff + indikator `system:sync` |

---

## 🗄️ Skema Database (Backend)

Tabel utama:
- `users` — User dashboard (admin/operator/viewer)
- `zoom_rooms` — Konfigurasi ruang Zoom
- `participants` — Data peserta (sync dari API Muktamar)
- `attendance_logs` — Log join/leave real-time
- `reminders` — History pengiriman reminder
- `activity_logs` — Audit trail aktivitas user

---

## ✅ Checklist Implementasi

- [x] Sidebar 12 menu dengan active highlight
- [x] 3 Stat Cards (blue/pink/green variants)
- [x] Activity Table dengan badge warna
- [x] Realtime Chart ApexCharts 2 seri
- [x] WebSocket hook dengan auto-reconnect
- [x] API client Muktamar (read-only)
- [x] API client Dashboard (JWT + auto-refresh)
- [x] Environment variables (.env)
- [x] Auto-refresh 30s interval
- [x] Manual refresh button
- [x] Connection status indicator
- [ ] Login page & auth flow
- [ ] Reminder page & form
- [ ] Attendance report export
- [ ] Settings page
- [ ] User management CRUD
- [ ] Audit log viewer
- [ ] Zoom webhook inbound (backend)

---

## 📝 Catatan Deviasi

| Elemen | PRD | Mockup | Keputusan |
|---|---|---|---|
| Badge Sedang Join | Biru `#2196F3` | Hijau `#4AA465` | Ikuti **mockup** (hijau) |
| Hijau Utama | `#4CAF50` | `#4AA465` | Ikuti **brief** (`#4AA465`) |
| Latar Zoom 1 | `#E3F2FD` | `#A1D6E2` | Ikuti **brief** (`#A1D6E2`) |

---

## 🔗 Referensi

- PRD: `PRD_Dashboard_WebApp_Pra_Muktamar_V.pdf`
- API Guide: `panduan_api_muktamar_lengkap.pdf`
- Template: Material Dashboard Shadcn‑Vue (Creative Tim)

---

*Dokumen ini adalah master spec tunggal untuk Dashboard Monitoring Panitia Pra Muktamar V.*

# 🚀 PeopleBox ATS v2 - Applicant Tracking System

Modern bir Applicant Tracking System (ATS) projesi. Laravel 12 backend ve React + TypeScript frontend ile geliştirilmiştir.

## 📋 Proje Durumu

### ✅ Tamamlanan Özellikler

#### 🎯 Aşama 1: Authentication System
- [x] **Laravel Sanctum Authentication**
  - Token tabanlı authentication
  - Login/Register API endpoints
  - Protected routes
- [x] **React Frontend Auth**
  - Modern login/register formları
  - Auth state management
  - Protected routes ve redirects
- [x] **Modern UI Design**
  - Tailwind CSS v4 ile modern tasarım
  - Responsive layout
  - Clean ve minimal interface

#### 🎯 Aşama 2: Candidate Management
- [x] **Candidate Model & Migration**
  - Complete candidate schema
  - File upload support (resume)
  - Status management (new, reviewed, shortlisted, interviewed, hired, rejected)
- [x] **CRUD Operations**
  - Create, Read, Update, Delete candidates
  - Form validation (frontend & backend)
  - File upload handling
- [x] **Candidate List & Search**
  - Paginated candidate listing
  - Status filtering
  - Search functionality
  - Sort by date/name

#### 🎯 Aşama 3: Search Integration
- [x] **Laravel Scout Integration**
  - Database driver configuration
  - Search indexing
  - Real-time search capabilities
- [x] **Search UI Components**
  - SearchBar component
  - Manual search with Enter key
  - Search results display
  - Clear search functionality

#### 🎯 Aşama 4: Advanced UI & UX
- [x] **Candidate Form**
  - Comprehensive form with all fields
  - File upload for resumes
  - Client-side validation
  - Loading states
- [x] **Modal System**
  - Reusable Modal component
  - Form integration
  - Responsive design
- [x] **Notification System**
  - Success/Error notifications
  - Auto-dismiss functionality
  - Toast-style notifications
- [x] **Enhanced UX**
  - Page reload after successful operations
  - Loading indicators
  - Error handling
  - User feedback

### 🔄 Geliştirme Aşamaları

#### 🚧 Aşama 5: Job Postings (Devam Ediyor)
- [ ] Job model ve migration
- [ ] Job CRUD operations
- [ ] Job listing sayfası
- [ ] Job application form

#### 📋 Planlanan Aşamalar
- [ ] **Aşama 6:** Applications (Başvurular)
  - Application model (Candidate + Job ilişkisi)
  - Application tracking
  - Status management

- [ ] **Aşama 7:** Dashboard Analytics
  - Charts ve grafikler
  - Statistics dashboard
  - Performance metrics

- [ ] **Aşama 8:** Advanced Features
  - Email notifications
  - File management
  - Export/Import
  - Advanced search filters

## 🛠️ Teknoloji Stack'i

| Katman       | Teknoloji                    | Açıklama |
|--------------|-------------------------------|----------|
| Frontend     | React + Vite + TypeScript     | Hızlı geliştirme, modülerlik |
| Styling      | Tailwind CSS v4               | Modern utility-first CSS |
| Backend      | Laravel 12 + Sanctum          | API, auth, job sistemi |
| Veritabanı   | SQLite (Development)          | Gelişmiş filtreleme |
| Auth         | Laravel Sanctum               | SPA için token tabanlı auth |
| Search       | Laravel Scout (Database)      | Real-time search |
| File Upload  | Laravel Storage               | Resume upload handling |

## 📁 Proje Yapısı

```
/peoplebox-v2/
├── apps/
│   ├── frontend/         → React + Vite + TS (Tailwind v4)
│   │   ├── src/
│   │   │   ├── components/  → UI Components
│   │   │   ├── services/    → API Services
│   │   │   ├── types/       → TypeScript Types
│   │   │   └── App.tsx      → Main App
│   │   └── package.json
│   └── backend/          → Laravel 12
│       ├── app/
│       │   ├── Models/       → Eloquent Models
│       │   ├── Http/
│       │   │   ├── Controllers/  → API Controllers
│       │   │   └── Requests/     → Form Requests
│       │   └── ...
│       ├── database/migrations/   → Database Migrations
│       └── routes/api.php         → API Routes
├── packages/
│   └── shared-types/     → Ortak Type tanımları
├── docker/               → PostgreSQL, Redis, Meilisearch için docker-compose
├── peoplebox-v2-tech.md  → Teknik dökümantasyon
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

### Backend (Laravel)

```bash
cd apps/backend

# Gerekli paketler zaten yüklü
# Laravel Sanctum, Scout, Meilisearch kurulu

# Migration'ları çalıştır
php artisan migrate

# Development server'ı başlat
php artisan serve
```

Backend: http://localhost:8000

### Frontend (React)

```bash
cd apps/frontend

# Gerekli paketler zaten yüklü
# React Router, Axios, Tailwind CSS v4 kurulu

# Development server'ı başlat
npm run dev
```

Frontend: http://localhost:5173

## 🔐 API Endpoints

### Auth Endpoints
- `POST /api/login` - Kullanıcı girişi
- `POST /api/register` - Kullanıcı kaydı
- `POST /api/logout` - Çıkış (Auth gerekli)
- `GET /api/profile` - Kullanıcı profili (Auth gerekli)

### Candidate Endpoints
- `GET /api/candidates` - Aday listesi (filtreleme, arama, sayfalama)
- `POST /api/candidates` - Yeni aday oluşturma
- `GET /api/candidates/{id}` - Aday detayı
- `PUT /api/candidates/{id}` - Aday güncelleme
- `DELETE /api/candidates/{id}` - Aday silme
- `GET /api/candidates-statistics` - Aday istatistikleri
- `GET /api/candidates-search` - Aday arama

### Örnek Kullanım

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get Candidates
curl -X GET http://localhost:8000/api/candidates \
  -H "Authorization: Bearer {token}"

# Create Candidate
curl -X POST http://localhost:8000/api/candidates \
  -H "Authorization: Bearer {token}" \
  -F "first_name=John" \
  -F "last_name=Doe" \
  -F "email=john@example.com" \
  -F "status=new"
```

## 🎨 Frontend Bileşenleri

### Auth Components
- `<Login />` - Giriş ekranı
- `<Register />` - Kayıt ekranı
- `<Dashboard />` - Ana dashboard

### Candidate Components
- `<CandidateList />` - Aday listesi ve CRUD
- `<CandidateForm />` - Aday ekleme/düzenleme formu
- `<SearchBar />` - Arama bileşeni
- `<Modal />` - Modal dialog bileşeni
- `<Notification />` - Bildirim bileşeni

### Services
- `authService` - Authentication işlemleri
- `candidateService` - Candidate CRUD işlemleri
- `searchService` - Arama işlemleri

## 🔧 Geliştirme Notları

### Backend
- Laravel 12 ile modern PHP geliştirme
- Sanctum ile SPA authentication
- CORS ayarları frontend için yapılandırıldı
- API response formatları standardize edildi
- Form Request validation ile güvenli veri işleme
- File upload handling (resume dosyaları)
- Laravel Scout ile search functionality

### Frontend
- React Router ile SPA routing
- Axios interceptors ile auth token yönetimi
- Tailwind CSS v4 ile modern UI
- TypeScript ile type safety
- FormData ile file upload
- Notification system ile user feedback
- Responsive design

## 📝 Commit Mesajları

Proje geliştirme sürecinde kullanılan commit mesaj formatı:

```
feat: candidate create form completed
fix: meilisearch typo match issue
chore: added Redis queue and tested email jobs
feat: notification system implemented
fix: update candidate validation issues
```

## 🎯 Sonraki Adımlar

1. **Aşama 5:** Job Postings sistemi
   - Job model ve migration
   - Job CRUD operations
   - Job listing ve application form

2. **Aşama 6:** Applications sistemi
   - Application model (Candidate + Job ilişkisi)
   - Application tracking
   - Status management

3. **Aşama 7:** Dashboard Analytics
   - Charts ve grafikler
   - Statistics dashboard
   - Performance metrics

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'feat: add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Not:** Bu proje geliştirme aşamasındadır. Production kullanımı için ek güvenlik önlemleri alınmalıdır. 
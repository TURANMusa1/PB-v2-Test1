# 🚀 PeopleBox ATS v2 - Applicant Tracking System

Modern bir Applicant Tracking System (ATS) projesi. Laravel 12 backend ve React + TypeScript frontend ile geliştirilmiştir.

## 📋 Proje Durumu

### ✅ Tamamlanan Özellikler (Aşama 1)
- [x] **Auth Sistemi (Sanctum + React Login)**
  - Laravel Sanctum ile token tabanlı authentication
  - React frontend ile login/register formları
  - Modern UI tasarımı (Tailwind CSS)
  - Protected routes ve auth state management

### 🔄 Geliştirme Aşamaları
- [ ] **Aşama 2:** Aday modeli ve CRUD işlemleri
- [ ] **Aşama 3:** Meilisearch ile canlı arama
- [ ] **Aşama 4:** Tailwind ile UI geliştirme
- [ ] **Aşama 5:** Queue + Redis ile başvuru sonrası e-posta
- [ ] **Aşama 6:** Websocket ile canlı bildirim
- [ ] **Aşama 7:** AI destekli CV sıralama

## 🛠️ Teknoloji Stack'i

| Katman       | Teknoloji                    | Açıklama |
|--------------|-------------------------------|----------|
| Frontend     | React + Vite + TypeScript     | Hızlı geliştirme, modülerlik |
| Styling      | Tailwind CSS                  | Minimal, utility-first CSS |
| Backend      | Laravel 12 + Sanctum          | API, auth, job sistemi |
| Veritabanı   | SQLite (Development)          | Gelişmiş filtreleme |
| Auth         | Laravel Sanctum               | SPA için token tabanlı auth |

## 📁 Proje Yapısı

```
/peoplebox-v2/
├── apps/
│   ├── frontend/         → React + Vite + TS (Tailwind)
│   └── backend/          → Laravel 12
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
# React Router, Axios, Tailwind CSS kurulu

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

### Örnek Kullanım

```bash
# Login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Register
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password","password_confirmation":"password"}'
```

## 🎨 Frontend Bileşenleri

- `<Login />` - Giriş ekranı
- `<Register />` - Kayıt ekranı
- `<Dashboard />` - Ana dashboard
- API servisleri ve auth state management

## 🔧 Geliştirme Notları

### Backend
- Laravel 12 ile modern PHP geliştirme
- Sanctum ile SPA authentication
- CORS ayarları frontend için yapılandırıldı
- API response formatları standardize edildi

### Frontend
- React Router ile SPA routing
- Axios interceptors ile auth token yönetimi
- Tailwind CSS ile modern UI
- TypeScript ile type safety

## 📝 Commit Mesajları

Proje geliştirme sürecinde kullanılan commit mesaj formatı:

```
feat: candidate create form completed
fix: meilisearch typo match issue
chore: added Redis queue and tested email jobs
```

## 🎯 Sonraki Adımlar

1. **Aşama 2:** Candidate modeli ve migration'ları
2. **Aşama 3:** Meilisearch kurulumu ve konfigürasyonu
3. **Aşama 4:** Candidate CRUD bileşenleri
4. **Aşama 5:** Queue sistemi ve e-posta işlemleri

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
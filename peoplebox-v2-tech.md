# 📌 PeopleBox ATS v2 - Teknik Dökümantasyon (Cursor + Vibe Coding)

## 1. Hedef Teknolojiler

| Katman       | Teknoloji                    | Açıklama |
|--------------|-------------------------------|----------|
| Frontend     | React + Vite + TypeScript     | Hızlı geliştirme, modülerlik |
| Styling      | Tailwind CSS                  | Minimal, utility-first CSS |
| Backend      | Laravel 11 + Octane (opsiyonel)| API, queue, auth, job sistemi |
| Veritabanı   | PostgreSQL                    | Gelişmiş filtreleme |
| Queue        | Laravel Queue + Redis         | E-posta, bildirim iş yükleri |
| Auth         | Laravel Sanctum               | SPA için token tabanlı auth |
| Search       | Laravel Scout + Meilisearch   | Aday arama, hızlı filtreleme |

---

## 2. Sistem Mimarisi Şeması

```
              [Frontend - React + Vite + TS]
                         |
                         | REST API / Sanctum Auth
                         v
              [Laravel Backend - PHP 8.3+]
               |         |           |       |
               |         |           |       |
         Auth (Sanctum)  Job Queue   Scout   API Routes
               |               |         |          |
               v               v         v          v
         PostgreSQL        Redis     Meilisearch    S3
```

---

## 3. Geliştirme Adımları - Cursor İçin Teknik Döküman

### 📁 A. Proje Klasör Yapısı (Monorepo Önerisi)

```
/peoplebox-v2/
├── apps/
│   ├── frontend/         → React + Vite + TS (Tailwind)
│   └── backend/          → Laravel
├── packages/
│   ├── shared-types/     → Ortak Type tanımları
├── docker/               → PostgreSQL, Redis, Meilisearch için docker-compose
├── .env
├── README.md
```

### 🧱 B. Backend Kurulumu (Laravel)

```bash
cd apps/backend
composer create-project laravel/laravel .
composer require laravel/sanctum laravel/scout meilisearch/meilisearch-php

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

**Octane (opsiyonel)**

```bash
composer require laravel/octane
php artisan octane:install
php artisan serve
```

### API Endpoint Örnekleri

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/candidates', [CandidateController::class, 'index']);
    Route::post('/candidates', [CandidateController::class, 'store']);
});
```

### Meilisearch Konfigürasyonu

```env
SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://localhost:7700
```

```php
use Laravel\Scout\Searchable;

class Candidate extends Model {
    use Searchable;
}
```

### 🚀 Queue Sistemi

```bash
php artisan queue:work
```

```env
QUEUE_CONNECTION=redis
```

---

### 🌐 C. Frontend Kurulumu (React + Vite + TypeScript)

```bash
cd apps/frontend
npm create vite@latest peoplebox-frontend -- --template react-ts
cd peoplebox-frontend
npm install
npm install axios react-router-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Tailwind config:**

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

**Axios API servisi:**

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
});

export default api;
```

---

## 4. Docker Compose (opsiyonel)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: peoplebox
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  meilisearch:
    image: getmeili/meilisearch
    ports:
      - "7700:7700"
    environment:
      MEILI_NO_ANALYTICS: "true"

volumes:
  pgdata:
```

---

## 5. Geliştirme Aşamaları (Vibe Coding Yaklaşımı)

| Aşama | Yapılacak |
|-------|-----------|
| 1     | Auth sistemi kur (Sanctum + React Login) |
| 2     | Aday modeli ve CRUD işlemleri |
| 3     | Meilisearch ile canlı arama |
| 4     | Tailwind ile UI geliştirme |
| 5     | Queue + Redis ile başvuru sonrası e-posta |
| 6     | Websocket (opsiyonel) ile canlı bildirim |
| 7     | AI destekli CV sıralama (OpenAI API) |

---

## 6. Önerilen React Bileşenleri

| Bileşen         | Açıklama |
|------------------|----------|
| `<CandidateList />` | Aday listesi + filtreleme |
| `<CandidateForm />` | Ekle / Düzenle formu |
| `<SearchBar />`     | Meilisearch arama kutusu |
| `<Notification />`  | Queue mesajları için toast |
| `<Login />`         | Giriş ekranı |
| `<Dashboard />`     | Özet veriler ve istatistik |

---

## 🎯 Bonus: Vibe Coding Tavsiyeleri

- Her bileşeni iteratif ve keyifli şekilde geliştir.
- UI için `tailwindui.com` ya da `shadcn/ui` kullan.
- `console.log()` ile her aşamada çıktı al.
- `README.md` dosyasını günlük ilerlemelerle güncelle.
- `git commit` mesajları kısa sprint log’ları gibi yaz:
  - `feat: candidate create form completed`
  - `fix: meilisearch typo match issue`
  - `chore: added Redis queue and tested email jobs`
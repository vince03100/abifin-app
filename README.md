# Abifin App

Applicazione web per la gestione interna di pratiche aziendali, sviluppata con Laravel 12, React + Inertia.js, HeroUI e PostgreSQL.

## Stack Tecnologico

- **Backend**: Laravel 12
- **Frontend**: React + Inertia.js
- **UI Library**: HeroUI
- **CSS**: Tailwind CSS
- **Database**: PostgreSQL

## Requisiti

- PHP >= 8.2
- Composer >= 2.x
- Node.js >= 20.x
- PostgreSQL >= 15

## Installazione

### 1. Clona il repository
```bash
git clone https://github.com/vince03100/abifin-app.git
cd abifin-app
```

### 2. Installa le dipendenze PHP
```bash
composer install
```

### 3. Installa le dipendenze JavaScript
```bash
npm install
```

### 4. Configura il file .env
```bash
cp .env.example .env
php artisan key:generate
```

Modifica il file `.env` con le tue credenziali PostgreSQL:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=abifin_app
DB_USERNAME=postgres
DB_PASSWORD=tua_password
```

### 5. Crea il database
```bash
psql -U postgres -c "CREATE DATABASE abifin_app;"
```

### 6. Esegui le migrations e il seeder
```bash
php artisan migrate
php artisan db:seed
```

### 7. Avvia i server

In due terminali separati:
```bash
# Terminale 1
php artisan serve

# Terminale 2
npm run dev
```

Apri il browser su `http://localhost:8000`

## Credenziali di Test

### Admin
- **Email**: admin@abifin.it
- **Password**: password

### Cliente (Rossi Srl)
- **Email**: rossi@example.com
- **Password**: password

### Cliente (Bianchi SpA)
- **Email**: bianchi@example.com
- **Password**: password

## Funzionalità

### Admin
- Gestione completa clienti (crea, modifica, elimina)
- Gestione completa pratiche (crea, modifica, elimina)
- Dashboard con statistiche generali

### Cliente
- Visualizzazione proprie pratiche
- Dashboard personale con stato pratiche

## Struttura del Progetto

- `app/Models` — Modelli Eloquent (User, Cliente, Pratica)
- `app/Http/Controllers` — Resource Controller
- `app/Http/Requests` — Form Request per la validazione
- `app/Policies` — Laravel Policies per l'autorizzazione
- `database/migrations` — Migrations
- `database/seeders` — Seeder con dati di test
- `resources/js/Pages` — Componenti React (Dashboard, Clienti, Pratiche)
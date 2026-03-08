# Event Ticket App - Local Setup

## Prerequisites

- Node.js `>= 20.19.0`
- npm `>= 10`
- Docker + Docker Compose
- Git

## 1. Clone project

```powershell
git clone <your-repo-url>
cd event-ticket-app
```

## 2. Install dependencies

```powershell
npm ci
```

If needed:

```powershell
npm install
```

## 3. Create `.env` file

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/event_ticket_app?schema=public"
```

## 4. Start PostgreSQL (Docker)

```powershell
docker compose up -d
docker compose ps
```

## 5. Prisma setup

Generate client:

```powershell
npx prisma generate
```

Run migrations:

```powershell
npx prisma migrate dev
```

Format schema (after editing schema.prisma):

```powershell
npx prisma format
```

Optional seed:

```powershell
npx prisma db seed
```

## 6. Run app in dev mode

```powershell
npm run dev
```

Open `http://localhost:3000`
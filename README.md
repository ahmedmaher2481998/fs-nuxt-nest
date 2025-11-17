# Permit Request Service Portal

A full-stack web application for managing permit applications built with Nuxt 4, NestJS, and PostgreSQL.

## Architecture

**Monorepo** with three containerized services:

- **Frontend**: Nuxt 4 + Vue 3 + Tailwind CSS (port 3000)
- **Backend**: NestJS + Prisma ORM (port 3001)
- **Database**: PostgreSQL 16 (port 5432)

```
fs-task/
├── backend/           # NestJS REST API
├── frontend/          # Nuxt 4 UI + Server Routes
├── common/            # Shared types & Zod schemas
└── docker-compose.yml
```

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

## Setup & Run

### 1. Clone Repository

```bash
git clone <repository-url>
cd fs-task
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Default values work out of the box - no changes needed.

### 3. Start Application

```bash
docker-compose up --build
```

**What happens:**

- Builds Docker images
- Starts PostgreSQL with health check
- Runs Prisma migrations automatically
- Starts backend with hot-reload
- Starts frontend with hot-reload

**First run**: Takes 3-5 minutes

### 4. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

## Development

### Hot Reload

Edit code and save - changes appear immediately without restarting containers.

### Stop Application

```bash
docker-compose down
```

Stop and remove data:

```bash
docker-compose down -v
```

### Database Management

View/edit data with Prisma Studio:

```bash
docker-compose exec backend npx prisma studio
```

Access at: http://localhost:5555

Create migration:

```bash
docker-compose exec backend npm run prisma:migrate:dev -- --name migration_name
```

## Project Structure

```
backend/
├── prisma/schema.prisma        # Database schema
└── src/permits/                # Permits module

frontend/
├── app/
│   ├── components/             # Vue components
│   ├── pages/                  # Routes (index, apply)
│   └── app.vue                 # Root layout
└── server/api/permits/         # API Gateway

common/types/
└── index.ts                    # Shared Zod schemas & types
```

## Database Schema

**Table**: `permit_applications`

| Column             | Type     | Default |
| ------------------ | -------- | ------- |
| id                 | UUID     | Auto    |
| applicant_name     | String   | -       |
| applicant_email    | String   | -       |
| permit_type        | String   | -       |
| application_status | Enum     | Pending |
| submitted_at       | DateTime | now()   |

## API Endpoints

Frontend proxies all requests through `/api/permits/*` to backend:

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | `/api/permits`     | Get all permits  |
| POST   | `/api/permits`     | Create permit    |
| GET    | `/api/permits/:id` | Get permit by ID |

## Troubleshooting

**Port conflict**:

```bash
lsof -i :3000
lsof -i :3001
```

**Check logs**:

```bash
docker-compose logs frontend
docker-compose logs backend
```

**Reset everything**:

```bash
docker-compose down -v
docker-compose up --build
```

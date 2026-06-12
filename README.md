# GadgetHive

GadgetHive is a full-stack e-commerce application for selling electronics, smart devices, and tech accessories. It features a React + Vite frontend, Express backend with JWT authentication, and PostgreSQL database.

## Features

- Product listing and filtering by category
- Shopping cart with quantity management
- Secure checkout process
- User authentication with JWT tokens
- Admin panel for product management
- Responsive mobile-first design
- Docker containerization for production
- PostgreSQL database with persistent storage
- Nginx reverse proxy for routing
- Production-ready deployment configuration

## Tech Stack

**Frontend:**
- React 19
- Vite (build tool)
- Tailwind CSS 4
- React Router DOM 7
- Lucide React (icons)

**Backend:**
- Node.js with Express
- SQLite3 for development
- JWT authentication
- PBKDF2 password hashing

**DevOps:**
- Docker & Docker Compose
- Nginx reverse proxy
- PostgreSQL for production

## Project Structure

```
GadgetHive/
├── src/                      # React application
│   ├── components/           # Reusable components
│   ├── context/              # React context
│   ├── data/                 # Product data
│   ├── pages/                # Route pages
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                   # Static assets
├── server.js                 # Express backend
├── Dockerfile                # Frontend production
├── Dockerfile.backend        # Backend production
├── docker-compose.yml        # Production orchestration
├── nginx.conf                # Nginx configuration
├── vite.config.js            # Vite configuration
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker & Docker Compose (for containerized deployment)

### Installation

```bash
# Install dependencies
npm install
```

### Development

**Frontend only:**
```bash
npm run dev
```
Open http://localhost:5173

**Full stack (with Docker):**
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production Build

```bash
npm run build
npm run preview
```

## Docker Deployment

### Quick Start

1. Create environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your configuration:
```env
DB_PASSWORD=your_secure_password
JWT_SECRET=your_secure_jwt_secret
```

3. Deploy:
```bash
docker compose up --build
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Database: localhost:5432

### Environment Variables

**Required for production:**
- `JWT_SECRET` - Secret key for JWT signing
- `DB_PASSWORD` - PostgreSQL password
- `NODE_ENV` - Set to "production"
- `PORT` - Backend port (default: 4000)
- `DOMAIN` - Your domain name

## API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/categories` - List categories
- `GET /api/products` - List products
- `GET /api/products/:id` - Product details
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/orders` - Create order

### Protected (require JWT token)
- `GET /api/auth/me` - Current user
- `POST /api/products` - Create product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

## Default Admin Account

⚠️ **Change in production:**
- Email: admin@gadgethive.com
- Password: admin123

## Security Features

- JWT-based authentication
- PBKDF2 password hashing with salt (310,000 iterations)
- Timing-safe token verification
- CORS configuration
- Security headers (X-Frame-Options, X-XSS-Protection)
- Gzip compression
- Rate limiting ready
- Role-based access control

## Deployment

This application is ready for deployment on:
- AWS (ECS, Fargate, EC2)
- DigitalOcean (App Platform, Droplets)
- Heroku
- Railway.app
- Render.com
- Self-hosted Docker servers

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

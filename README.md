# GadgetHive

GadgetHive is a React + Vite e-commerce application for a gadget store. It includes product browsing, a shopping cart, checkout flow, and a backend server using Express with PostgreSQL database.

## Features

- Product listing and details pages
- Cart management with quantity updates
- Checkout page with order summary
- Responsive layout for desktop and mobile
- Backend API served with Express
- PostgreSQL database for data persistence
- Docker-friendly setup with production-ready configuration
- User authentication with JWT tokens
- Admin panel for product management

## Technologies

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM 7
- Express
- PostgreSQL
- Lucide React icons
- Docker & Docker Compose

## Project structure

```
GadgetHive/
├── public/                # Static assets
├── src/                   # React application source
│   ├── components/        # UI components
│   ├── context/           # React context providers/hooks
│   ├── data/              # Static product data
│   ├── pages/             # Route pages
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── Dockerfile             # Frontend production build
├── Dockerfile.backend     # Backend production build
├── docker-compose.yml     # Production orchestration with PostgreSQL
├── docker-compose.dev.yml # Development orchestration
├── nginx.conf             # Nginx reverse proxy configuration
├── package.json
├── vite.config.js
├── .env.example           # Environment variables template
├── LICENSE
└── README.md
```

## Setup

### Prerequisites

- Node.js 18 or higher
- npm
- Docker & Docker Compose (for containerized deployment)

### Install dependencies

```bash
npm install
```

### Local Development

#### Frontend only:
```bash
npm run dev
```
Open `http://localhost:5173`.

#### Full stack with dev docker-compose:
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Build for production

```bash
npm run build
npm run preview
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Create environment file:**
```bash
cp .env.example .env
```

2. **Update environment variables in `.env`:**
```env
DB_PASSWORD=your_secure_password_here
JWT_SECRET=your_secure_jwt_secret_here
```

3. **Start services:**
```bash
docker compose up --build
```

4. **Access application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:4000`
   - Database: `localhost:5432`

### Manual Docker Build

```bash
# Build frontend
docker build -t gadgethive-frontend .

# Build backend
docker build -f Dockerfile.backend -t gadgethive-backend .

# Run with external PostgreSQL
docker run -p 3000:80 gadgethive-frontend
docker run -p 4000:4000 -e DATABASE_URL=postgresql://... gadgethive-backend
```

## Production Deployment

### Environment Variables

All these must be set in production (see `.env.example`):

- `JWT_SECRET` - Secure random string for JWT signing
- `DB_PASSWORD` - PostgreSQL password
- `NODE_ENV` - Set to `production`
- `DOMAIN` - Your domain name for security headers

### Deployment Platforms

This app is ready for deployment on:

- **AWS (ECS/Fargate)**
- **DigitalOcean (App Platform)**
- **Heroku**
- **Railway**
- **Render**
- **Self-hosted Docker servers**

### Database Persistence

The PostgreSQL database is persisted in Docker volumes:
- Volume name: `gadgethive_db_data`
- Data persists across container restarts

### Security Features

- JWT-based authentication
- PBKDF2 password hashing with salt
- Timing-safe token verification
- CORS configuration
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Gzip compression
- Role-based access control (admin/customer)

## API Endpoints

### Public Endpoints
- `GET /api/categories` - List all categories
- `GET /api/products` - List all products
- `GET /api/products?category=audio` - Filter by category
- `GET /api/products/:id` - Get product details
- `POST /api/orders` - Create an order
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/health` - Health check

### Protected Endpoints (require JWT token)
- `GET /api/auth/me` - Get current user info
- `POST /api/products` - Create product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## Default Admin Credentials

**⚠️ Change these immediately in production:**
- Email: `admin@gadgethive.com`
- Password: `admin123`

## Troubleshooting

### Database won't connect
- Ensure PostgreSQL container is running: `docker ps`
- Check DATABASE_URL in .env
- Verify DB_PASSWORD matches

### Frontend can't reach API
- Check nginx.conf proxy_pass configuration
- Ensure backend container is running
- Verify port mappings in docker-compose.yml

### Build fails in Docker
- Clear Docker cache: `docker system prune`
- Rebuild: `docker compose up --build`

## Notes

- Static product data is seeded from `src/data/products.js`
- All data persists in PostgreSQL database
- Update the repository URL after creating the GitHub repo
- Use environment variables for all sensitive data

## GitHub setup

After creating the repository on GitHub, add the remote and push:

```bash
git remote add origin https://github.com/dush-rw/GadgetHive.git
git branch -M main
git push -u origin main
```

## License

MIT

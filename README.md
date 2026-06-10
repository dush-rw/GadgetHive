# GadgetHive - E-Commerce Platform

GadgetHive is a modern e-commerce platform built with React and Tailwind CSS, designed for a Rwanda-based tech gadget store. It enables customers to browse products, add items to a shopping cart, place orders, and manage purchases online.

## Features

- Responsive and professional design
- Homepage with navigation menu
- Product listing with categories and filtering
- Product details page
- Shopping cart (add/remove items, update quantities, calculate totals)
- Checkout process (customer details, order summary, order confirmation)
- Persistent cart using localStorage
- Mobile-friendly interface

## Technologies Used

- React 19 with Vite
- Tailwind CSS 4 for styling
- React Router 7 for navigation
- Lucide React for icons
- Context API for cart state management
- Docker for containerization
- GitHub Actions for CI/CD
- NGINX for production serving

## System Architecture

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── context/          # React Context for state management
│   └── CartContext.jsx
├── data/             # Data layer (products, categories)
│   └── products.js
├── pages/            # Page-level components
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── About.jsx
├── App.jsx           # Main app component with routing
├── main.jsx          # Entry point
└── index.css         # Global styles (Tailwind)
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/gadgethive.git
cd gadgethive
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Docker

### Build and run with Docker

```bash
docker build -t gadgethive .
docker run -p 3000:80 gadgethive
```

### Running with Docker Compose

```bash
docker compose up -d
docker compose up --build
```

The application will be available at `http://localhost:3000`.

## CI/CD

The project uses GitHub Actions for CI/CD. On every push to `main` or `develop`:
1. Tests the build process
2. Runs lint checks
3. Builds the Docker container
4. Validates the Docker Compose configuration

## Git Commit History

The project maintains a meaningful commit history, with commits for:
- Initial React app setup
- Tailwind CSS integration
- Cart context and state management
- Product listing and details pages
- Checkout flow
- Docker and CI/CD configuration
- Build and deployment fixes

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured products and promotions |
| `/products` | Product listing with category filtering and search |
| `/products/:id` | Product details page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout with order confirmation |
| `/about` | About page |

## Live Demo

The application is deployed at: `https://gadgethive.netlify.app` *(update with your actual deployment URL)*

## GitHub Repository

https://github.com/YOUR_USERNAME/gadgethive *(update with your actual repository URL)*

## Project Structure

```
gadgethive/
├── .github/
│   └── workflows/
│       └── ci-cd.yml         # CI/CD pipeline
├── public/
│   └── images/               # Static images
├── src/
│   ├── assets/               # Static assets
│   ├── components/           # Reusable components
│   ├── context/              # React Context providers
│   ├── data/                 # Data layer
│   ├── pages/                # Page components
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile                # Production Docker image
├── Dockerfile.dev            # Development Docker image
├── docker-compose.yml        # Production compose
├── docker-compose.dev.yml    # Development compose
├── nginx.conf                # NGINX configuration
├── package.json
├── vite.config.js
└── README.md
```

## License

MIT License - see LICENSE file for details

---

**GadgetHive** - Rwanda's premier destination for premium tech gadgets.

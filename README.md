# Easy Dispatch

> Professional logistics quote management system for businesses of all sizes

Easy Dispatch is a full-stack application that enables businesses to compare shipping quotes from multiple carriers, manage quotes efficiently, and track shipments with real-time updates. The system features multi-language support (English and Portuguese), secure authentication, and a modern, responsive user interface.

** [Leia em Português (Brasil)](README-pt-BR.md)**

##  Features

### Core Functionality
- **Multi-Carrier Quote Comparison** - Get instant quotes from multiple carriers (FedEx, UPS, DHL, etc.)
- **Real-Time Quote Updates** - Automatic polling for quote status changes
- **Label Generation** - Generate shipping labels for approved quotes
- **Quote Management** - Create, view, filter, and track shipping quotes
- **Dashboard Analytics** - KPIs and visualizations for quote statistics

### Technical Features
- **Multi-Language Support** - English and Portuguese (Brazil) with dynamic language switching
- **JWT Authentication** - Secure user authentication and authorization
- **Responsive UI** - Modern, mobile-friendly interface built with shadcn-ui
- **Error Handling** - Comprehensive error handling with correlation IDs and retry mechanisms
- **API Documentation** - Interactive Swagger documentation
- **Circuit Breaker Pattern** - Resilient carrier API integration
- **Server-Side Profit Margin Calculation** - Configurable markup on carrier quotes

##  Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form + Zod** - Form validation
- **i18next** - Internationalization
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Firebase Firestore** - Database
- **JWT** - Authentication
- **Passport** - Authentication strategies
- **Swagger** - API documentation
- **nestjs-i18n** - Backend internationalization
- **Axios** - HTTP client
- **Circuit Breaker** - Resilient API calls

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Firebase Project** with Firestore enabled
- **Carrier API Credentials** (e.g., Frenet API)
- **Git** (for cloning the repository)

##  Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Easy Dispatch"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Firebase Configuration
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
# OR use environment variables:
# FIREBASE_PROJECT_ID=your-project-id
# FIREBASE_CLIENT_EMAIL=your-client-email
# FIREBASE_PRIVATE_KEY=your-private-key

# Carrier API Configuration (Frenet example)
FRENET_API_URL=https://api.frenet.com.br
FRENET_API_TOKEN=your-frenet-api-token

# CORS Configuration (optional, defaults to localhost origins)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Profit Margin Configuration
DEFAULT_PROFIT_MARGIN=0.15
```

#### Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend` directory (optional):

```env
# API Configuration (optional - auto-detected in production)
VITE_API_BASE=http://localhost:3000/api
VITE_BACKEND_PORT=3000
```

### 5. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file as `serviceAccountKey.json` in the `backend` directory
4. Update `FIREBASE_CREDENTIALS_PATH` in your `.env` file

### 6. Seed Demo Client (Optional)

```bash
cd backend
npm run seed:client
```

This creates a demo client for testing purposes.

##  Running the Application

### Development Mode

#### Option 1: Separate Frontend and Backend (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Backend API: `http://localhost:3000/api`
- Frontend: `http://localhost:5173`
- Swagger Docs: `http://localhost:3000/api/docs`

#### Option 2: Backend Serves Frontend (Production-like)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Copy built files to backend:
```bash
# Windows PowerShell
cd backend
.\scripts\build-frontend.ps1

# Linux/Mac
cd backend
chmod +x scripts/build-frontend.sh
./scripts/build-frontend.sh
```

3. Start the backend:
```bash
cd backend
npm run start:dev
```

- Application: `http://localhost:3000`
- API: `http://localhost:3000/api`
- Swagger Docs: `http://localhost:3000/api/docs`

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Copy built files to backend:
```bash
# Use the build script (see above)
```

3. Build and start the backend:
```bash
cd backend
npm run build
npm run start:prod
```

##  Project Structure

```
Easy Dispatch/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module (JWT, Passport)
│   │   ├── billing/        # Profit margin calculation
│   │   ├── carriers/       # Carrier adapters (Frenet, etc.)
│   │   │   ├── adapters/   # Carrier-specific implementations
│   │   │   └── circuit-breaker.service.ts
│   │   ├── common/         # Shared utilities
│   │   │   ├── dto/        # Common DTOs
│   │   │   ├── filters/    # Exception filters
│   │   │   └── interceptors/ # Request interceptors
│   │   ├── config/         # Configuration schemas
│   │   ├── firestore/      # Firestore service
│   │   ├── i18n/          # Backend translations (en.json, pt-BR.json)
│   │   ├── labels/        # Label generation
│   │   ├── quotes/        # Quote management
│   │   ├── scripts/       # Utility scripts
│   │   ├── app.module.ts  # Root module
│   │   └── main.ts        # Application entry point
│   ├── frontend/          # Built frontend (for production serving)
│   ├── test/              # E2E tests
│   ├── package.json
│   └── nest-cli.json
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/        # shadcn-ui components
│   │   │   └── ...
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API client
│   │   ├── types/         # TypeScript types
│   │   ├── i18n/          # Frontend translations
│   │   │   ├── locales/   # Translation files
│   │   │   └── config.ts  # i18n configuration
│   │   ├── App.tsx        # Root component
│   │   └── main.tsx       # Entry point
│   ├── public/            # Static assets
│   ├── package.json
│   └── vite.config.ts
│
└── README.md              # This file
```

##  API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:3000/api/docs`

The API documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Try-it-out functionality

### Main API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/quotes` - List quotes (with filters)
- `POST /api/quotes` - Create new quote
- `GET /api/quotes/:id` - Get quote details
- `POST /api/labels` - Generate shipping label
- `GET /api/carriers/:carrierName/test` - Test carrier connection

##  Multi-Language Support

Easy Dispatch supports two languages:
- **English (en)** - Default
- **Portuguese - Brazil (pt-BR)** - Default for Brazilian users

### Changing Language

Users can switch languages using the language switcher in the header. The preference is saved in localStorage.

### Adding New Languages

1. **Frontend**: Add translation files in `frontend/src/i18n/locales/`
2. **Backend**: Add translation files in `backend/src/i18n/`
3. Update language configuration in:
   - `frontend/src/i18n/config.ts`
   - `backend/src/app.module.ts`

##  Testing

### Backend Tests

```bash
cd backend

# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend

# Run tests (if configured)
npm run test
```

##  Security Features

- **JWT Authentication** - Secure token-based authentication
- **CORS Configuration** - Explicit origin whitelist (not wildcard)
- **Input Validation** - Server-side validation with class-validator
- **Error Handling** - Correlation IDs for error tracking
- **Password Hashing** - bcrypt for password security
- **Environment Variables** - Sensitive data in environment variables

##  Deployment

### Backend Deployment

1. Set production environment variables
2. Build the application:
```bash
npm run build
```
3. Start the production server:
```bash
npm run start:prod
```

### Frontend Deployment

1. Build the frontend:
```bash
npm run build
```
2. Copy the `dist` folder contents to `backend/frontend/`
3. The backend will serve the frontend automatically

### Environment-Specific Configuration

- **Development**: Frontend and backend run separately
- **Production**: Backend serves the built frontend from `backend/frontend/`

##  Available Scripts

### Backend

```bash
npm run build          # Build for production
npm run start          # Start production server
npm run start:dev      # Start development server with watch
npm run start:debug    # Start with debug mode
npm run start:prod     # Start production server
npm run lint           # Run ESLint
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run seed:client    # Seed demo client
```

### Frontend

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run build:dev      # Build in development mode
npm run lint           # Run ESLint
npm run preview        # Preview production build
```

##  Troubleshooting

### Common Issues

1. **Frontend not loading when served by backend**
   - Ensure frontend is built: `cd frontend && npm run build`
   - Copy files to `backend/frontend/` directory
   - Check that `backend/frontend/index.html` exists

2. **CORS errors**
   - Check `CORS_ORIGINS` environment variable
   - Ensure your origin is in the allowed list
   - Default allows: `localhost:3000`, `localhost:5173`

3. **Firebase connection errors**
   - Verify `serviceAccountKey.json` exists and is valid
   - Check `FIREBASE_CREDENTIALS_PATH` in `.env`
   - Ensure Firestore is enabled in Firebase Console

4. **API connection refused**
   - Verify backend is running on port 3000
   - Check `VITE_API_BASE` in frontend `.env` (if set)
   - In production, ensure frontend uses relative path `/api`

5. **Translation files not loading**
   - Check that `backend/src/i18n/` files are copied to `dist/i18n/`
   - Verify `nest-cli.json` includes assets configuration
   - Rebuild backend: `npm run build`

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is private and proprietary. All rights reserved.

##  Authors

- Easy Dispatch Team

##  Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

For more information, visit the [API Documentation](http://localhost:3000/api/docs) when the server is running.


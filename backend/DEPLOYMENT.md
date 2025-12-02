# Deployment Guide

This guide covers deploying the Easy Dispatch backend to various platforms.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase project set up with Firestore enabled
- [ ] Firebase security rules configured
- [ ] Carrier API credentials obtained
- [ ] Demo client seeded (if needed)
- [ ] Tests passing locally

## Environment Variables

Ensure all required environment variables are set on your hosting platform:

### Required
- `JWT_SECRET` - Secure random string for JWT signing
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `FIREBASE_CREDENTIALS_PATH` OR (`FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY`)
- `CARRIER_FRENET_APIKEY` - Frenet API key

### Optional (with defaults)
- `NODE_ENV` - `production` for production
- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS
- `CARRIER_TIMEOUT_MS` - Timeout in ms (default: 10000)
- `CARRIER_RETRY_ATTEMPTS` - Retry count (default: 1)
- `BILLING_MARKUP_PERCENT` - Markup percentage (default: 20)
- `BILLING_FIXED_FEE` - Fixed fee (default: 5.0)

## Platform-Specific Instructions

### Render

1. Create a new Web Service
2. Connect your Git repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment**: `Node`
   - **Node Version**: `18` or higher
4. Add all environment variables
5. Deploy

### Railway

1. Create a new project
2. Add a new service from GitHub
3. Railway will auto-detect Node.js
4. Add environment variables in the Variables tab
5. Deploy automatically on push

### DigitalOcean App Platform

1. Create a new App
2. Connect GitHub repository
3. Configure:
   - **Type**: Web Service
   - **Build Command**: `npm run build`
   - **Run Command**: `npm run start:prod`
   - **HTTP Port**: `3000`
4. Add environment variables
5. Deploy

### Google Cloud Run

1. Build container:
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/easy-dispatch-backend
```

2. Deploy:
```bash
gcloud run deploy easy-dispatch-backend \
  --image gcr.io/PROJECT_ID/easy-dispatch-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "JWT_SECRET=...,FIREBASE_PROJECT_ID=..."
```

3. Set environment variables in Cloud Run console

## Firebase Setup

### 1. Create Firestore Database

1. Go to Firebase Console
2. Create a new project (or use existing)
3. Enable Firestore Database
4. Start in production mode

### 2. Set Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Clients collection
    match /clients/{clientId} {
      allow read: if request.auth != null && 
        request.auth.token.clientId == clientId;
      
      // Quotes subcollection
      match /quotes/{quoteId} {
        allow read, write: if request.auth != null && 
          request.auth.token.clientId == clientId;
      }
    }
  }
}
```

### 3. Get Service Account

1. Go to Project Settings > Service Accounts
2. Generate new private key
3. Download JSON file
4. Either:
   - Upload to hosting platform and set `FIREBASE_CREDENTIALS_PATH`
   - Or extract values and set as environment variables

## Seeding Demo Client

After deployment, seed the demo client:

```bash
# SSH into your server or use a one-off command
npm run seed:client
```

Or manually create via Firebase Console:
- Collection: `clients`
- Document ID: (auto-generated)
- Fields:
  - `email`: `demo@easydispatch.com`
  - `name`: `Demo Client`
  - `passwordHash`: (bcrypt hash of `demo123`)

## Health Checks

The API doesn't have a dedicated health endpoint, but you can check:
- `GET /api/docs` - Swagger documentation (should return 200)
- `POST /api/auth/login` - Login endpoint (should return 401 without credentials)

## Monitoring

### Logs

All requests are logged with correlation IDs. Check your platform's logs for:
- Request/response details
- Error messages with stack traces
- Carrier API call results

### Error Tracking

Consider integrating:
- **Sentry**: Error tracking and monitoring
- **LogDNA**: Centralized logging
- **Datadog**: Full observability

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify credentials are correct
   - Check Firestore is enabled
   - Ensure security rules allow access

2. **Carrier API Timeout**
   - Check API credentials
   - Verify network connectivity
   - Check circuit breaker status

3. **JWT Authentication Fails**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings
   - Ensure client exists in Firestore

4. **CORS Errors**
   - Set `FRONTEND_URL` correctly
   - Check CORS configuration in `main.ts`

## Post-Deployment

1. Test login endpoint
2. Create a test quote
3. Verify quote appears in Firestore
4. Check logs for any errors
5. Monitor performance

## Scaling

For high traffic:
- Use a load balancer
- Enable horizontal scaling
- Consider caching for frequently accessed quotes
- Use a message queue for label generation (future)

## Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Firebase credentials are secure
- [ ] Carrier API keys are not exposed
- [ ] CORS is properly configured
- [ ] Firestore security rules are active
- [ ] HTTPS is enabled
- [ ] Environment variables are encrypted


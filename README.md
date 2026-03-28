# This Project is Under Construction!!!!

# LocalGuide - Discover Authentic Travel Experiences

> Connect with passionate local experts for personalized tours and authentic experiences around the world.

LocalGuide is a full-stack web application that bridges the gap between travelers seeking authentic local experiences and expert local guides offering personalized tours. The platform enables users to browse, book, and review tours while providing guides with tools to create and manage their tour offerings.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Key Features](#-key-features)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### For Tourists
- **Browse Tours**: Explore a wide variety of tours by location, category, and price
- **Search & Filter**: Advanced search and filtering options for finding the perfect tour
- **Book Tours**: Seamless booking experience with secure payment processing
- **Manage Bookings**: View and manage your upcoming and past tour bookings
- **Reviews & Ratings**: Share your experience by rating and reviewing tours
- **User Profiles**: Create and manage your tourist profile

### For Guides
- **Create Tours**: Design and publish detailed tour listings with images, itineraries, and pricing
- **Manage Tours**: Update, activate, or deactivate your tour offerings
- **Profile Management**: Build your guide profile showcasing expertise and specialties
- **Booking Management**: Track and manage bookings for your tours

### For Administrators
- **Dashboard**: Comprehensive admin dashboard for platform management
- **User Management**: Oversee users, guides, and tourists
- **Tour Moderation**: Review and manage tour listings
- **Analytics**: Access platform statistics and insights

### General Features
- **Authentication**: Secure JWT-based authentication with refresh tokens
- **OTP Verification**: Email-based OTP verification for account security
- **Payment Integration**: Stripe payment gateway for secure transactions
- **Image Upload**: Cloudinary integration for tour and profile images
- **Email Notifications**: Automated emails for bookings, confirmations, and updates
- **Responsive Design**: Modern, mobile-friendly UI built with Next.js and TailwindCSS

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: TailwindCSS 4.1
- **UI Components**: Radix UI
- **Form Management**: React Hook Form + Zod
- **State Management**: React Context API
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Notifications**: Sonner (Toast notifications)
- **Analytics**: Vercel Analytics

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Processing**: Stripe
- **File Upload**: Multer + Cloudinary
- **Email Service**: Nodemailer
- **Validation**: Zod
- **Password Hashing**: bcryptjs

### DevOps & Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint
- **Development**: ts-node-dev

## 📁 Project Structure

```
assignment-8/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app router pages
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (dashboard)/      # Dashboard pages
│   │   ├── (public)/         # Public pages
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── module/           # Feature-specific components
│   │   ├── shared/           # Shared components
│   │   └── ui/               # UI primitives
│   ├── lib/                  # Utility functions and contexts
│   ├── services/             # API service functions
│   ├── interfaces/           # TypeScript interfaces
│   ├── hooks/                # Custom React hooks
│   ├── constants/            # Application constants
│   └── public/               # Static assets
│
└── server/                   # Express.js backend application
    ├── src/
    │   ├── app/
    │   │   ├── modules/      # Feature modules
    │   │   │   ├── auth/     # Authentication
    │   │   │   ├── tour/     # Tour management
    │   │   │   ├── guide/    # Guide management
    │   │   │   ├── tourist/  # Tourist management
    │   │   │   ├── booking/  # Booking system
    │   │   │   ├── payment/  # Payment processing
    │   │   │   ├── review/   # Review system
    │   │   │   ├── trip/     # Trip management
    │   │   │   ├── otp/      # OTP verification
    │   │   │   └── admin/    # Admin functionality
    │   │   ├── config/       # Configuration files
    │   │   ├── middlewares/  # Express middlewares
    │   │   ├── utils/        # Utility functions
    │   │   ├── helpers/      # Helper functions
    │   │   └── routes/       # Route definitions
    │   ├── app.ts            # Express app configuration
    │   └── server.ts         # Server entry point
    ├── script/               # Utility scripts
    └── dist/                 # Compiled JavaScript (generated)
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Stripe Account** (for payment processing)
- **Cloudinary Account** (for image storage)
- **SMTP Email Service** (for sending emails - Gmail, SendGrid, etc.)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd assignment-8
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

## 🔐 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
PORT=5000
APP_NAME=LocalGuide
NODE_ENV=development

# Database
DB_URI=mongodb://localhost:27017/localguide
# or for MongoDB Atlas:
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/localguide

# JWT Secrets
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret_here
JWT_ACCESS_TOKEN_EXPIRES_IN=15m
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
JWT_REFRESH_TOKEN_EXPIRES_IN=7d
JWT_RESET_PASSWORD_TOKEN_SECRET=your_reset_password_secret_here
JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN=1h

# Client URL
CLIENT_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin Credentials (will be seeded on first run)
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@localguide.com
ADMIN_PASSWORD=your_secure_admin_password

# SMTP Configuration (for email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_FROM=noreply@localguide.com
SMTP_PASSWORD=your_app_specific_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

**Note**: Generate secure random strings for JWT secrets. You can use:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## ▶️ Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

#### 2. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`.

### Production Mode

#### Build and Start Backend

```bash
cd server
npm run build
npm start
```

#### Build and Start Frontend

```bash
cd frontend
npm run build
npm start
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Main API Endpoints

#### Authentication (`/api/v1/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh-token` - Refresh access token
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `POST /logout` - User logout

#### Tours (`/api/v1/tours`)
- `GET /` - Get all tours (with filters)
- `GET /:id` - Get tour details
- `POST /` - Create new tour (Guide only)
- `PATCH /:id` - Update tour (Guide/Admin)
- `DELETE /:id` - Delete tour (Guide/Admin)

#### Bookings (`/api/v1/bookings`)
- `GET /` - Get user bookings
- `GET /:id` - Get booking details
- `POST /` - Create new booking
- `PATCH /:id` - Update booking status
- `DELETE /:id` - Cancel booking

#### Payments (`/api/v1/payments`)
- `POST /create-payment-intent` - Create payment intent
- `POST /webhook` - Stripe webhook handler
- `GET /` - Get payment history

#### Guides (`/api/v1/guides`)
- `GET /` - Get all guides
- `GET /:id` - Get guide profile
- `PATCH /:id` - Update guide profile

#### Tourists (`/api/v1/tourists`)
- `GET /` - Get all tourists
- `GET /:id` - Get tourist profile
- `PATCH /:id` - Update tourist profile

#### Reviews (`/api/v1/reviews`)
- `GET /` - Get reviews
- `POST /` - Create review
- `PATCH /:id` - Update review
- `DELETE /:id` - Delete review

#### Admin (`/api/v1/admin`)
- Dashboard statistics and management endpoints

#### OTP (`/api/v1/otp`)
- `POST /send` - Send OTP
- `POST /verify` - Verify OTP

## 🎯 Key Features

### Authentication & Authorization
- JWT-based authentication with access and refresh tokens
- Role-based access control (Admin, Guide, Tourist)
- Protected routes and API endpoints
- Password reset functionality via email

### Tour Management
- Create detailed tour listings with:
  - Title, description, category
  - Location (city, country)
  - Pricing and duration
  - Detailed itinerary
  - Multiple images
  - Meeting point
  - Group size limits
  - Language preferences
- Search and filter tours
- Featured tours system
- Tour activation/deactivation

### Booking System
- Real-time availability checking
- Secure booking creation
- Booking status tracking (Pending, Confirmed, Cancelled, Completed)
- Booking history for users

### Payment Processing
- Stripe integration for secure payments
- Payment intent creation
- Webhook handling for payment confirmation
- Payment history tracking

### Review System
- Rating system (1-5 stars)
- Written reviews
- Review aggregation (average rating, total reviews)
- Review management (edit, delete)

### Image Management
- Cloudinary integration for image uploads
- Multiple image support for tours
- Profile picture uploads
- Image optimization

### Email Notifications
- Account verification
- Booking confirmations
- Password reset emails
- OTP delivery

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Backend Deployment

The backend can be deployed to platforms like:
- **Heroku**
- **Railway**
- **DigitalOcean**
- **AWS EC2**
- **Render**

Make sure to:
- Set all environment variables in your hosting platform
- Update `CLIENT_URL` to your frontend URL
- Configure CORS settings
- Set up MongoDB Atlas or similar cloud database
- Configure Stripe webhooks with your production URL

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Ensure code passes linting (`npm run lint`)
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Emon**

## 🙏 Acknowledgments

- Programming Hero for the assignment
- All open-source contributors whose packages made this project possible

---

**Note**: This is a learning project created for educational purposes. Ensure you follow best practices for security, especially regarding environment variables, authentication, and payment processing when deploying to production.

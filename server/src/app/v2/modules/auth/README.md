# Auth Module V2 - Prisma Migration & Provider Login

## Overview

This is the cloned and enhanced version of the auth module from V1, with the following improvements:

- **MongoDB → Prisma ORM** conversion for better type safety and database abstraction
- **OAuth Provider Support** for Google and Facebook login
- **Enhanced Security** with proper password hashing and validation
- **Improved Error Handling** with descriptive messages

## Key Changes from V1

### 1. Database Layer

- **Old**: Mongoose models (MongoDB)
- **New**: Prisma ORM with PostgreSQL
- All `User.findOne()`, `User.findById()`, etc. replaced with Prisma queries
- Type-safe database operations with generated Prisma types

### 2. Provider Login Support

Added two new endpoints:

- `POST /auth/login/google` - Google OAuth login
- `POST /auth/login/facebook` - Facebook OAuth login

New service method: `loginWithProvider()`

- Automatically creates user if doesn't exist
- Updates provider info on existing accounts
- Handles avatar upload for provider users

### 3. Password Handling

- Users created through providers have `password: null`
- Attempting credential login on provider account shows clear error
- `resetPassword()` and `changePassword()` validate password exists

### 4. Database Schema Updates

Required Prisma User model fields:

```prisma
model User {
  id          String   @id @default(uuid())
  email       String   @unique
  password    String?  // nullable for provider accounts
  provider    AuthProvider?
  providerId  String?
  avatar      String?
  // ... other fields
}

enum AuthProvider {
  GOOGLE
  FACEBOOK
  CREDENTIALS
}
```

## Endpoint Structure

### Authentication

- `POST /v2/auth/login` - Email/password login
- `POST /v2/auth/login/google` - Google OAuth login
- `POST /v2/auth/login/facebook` - Facebook OAuth login

### Token Management

- `GET /v2/auth/me` - Get current user profile
- `GET /v2/auth/refresh-token` - Refresh access token

### Password Management

- `POST /v2/auth/forgot-password` - Request password reset OTP
- `POST /v2/auth/reset-password` - Reset password with token
- `POST /v2/auth/change-password` - Change password (authenticated)

## Request/Response Examples

### Google Login

```json
POST /v2/auth/login/google
{
  "email": "user@gmail.com",
  "name": "John Doe",
  "providerId": "google_id_12345",
  "avatar": "https://..."
}
```

### Facebook Login

```json
POST /v2/auth/login/facebook
{
  "email": "user@facebook.com",
  "name": "Jane Doe",
  "providerId": "facebook_id_67890",
  "avatar": "https://..."
}
```

## Migration Notes

### OTP Handling

V1 used a MongoDB `Otp` model. In V2:

- For temporary OTP storage, consider using:
  - Redis (recommended for production)
  - In-memory storage with TTL
  - Add Otp model to Prisma if persistent storage needed

Current implementation sends OTP but doesn't persist it. Implement based on your requirements.

### JWT Tokens

- Access Token: 24 hours (configurable via JWT_ACCESS_TOKEN_EXPIRES_IN)
- Refresh Token: 90 days (configurable via JWT_REFRESH_TOKEN_EXPIRES_IN)
- Both stored as HTTP-only cookies with secure flag

## Security Considerations

1. **Password Hashing**: Using bcryptjs with 10 salt rounds
2. **Token Validation**: JWT tokens verified against secrets
3. **Cookie Security**:
   - HttpOnly flag prevents XSS attacks
   - Secure flag requires HTTPS in production
   - SameSite: none allows cross-origin requests (adjust for your needs)

4. **Provider Integration**:
   - Validate provider tokens before creating accounts
   - Use providerId to prevent duplicate accounts
   - Update avatar from provider during login

## Future Enhancements

- [ ] Implement OTP model in Prisma for forgot password
- [ ] Add email verification for credential signups
- [ ] Support additional OAuth providers (GitHub, LinkedIn)
- [ ] Add rate limiting on login attempts
- [ ] Implement refresh token rotation
- [ ] Add audit logging for auth events

## Testing

Example test cases needed:

- [ ] Login with credentials
- [ ] Login with Google
- [ ] Login with Facebook
- [ ] Refresh token
- [ ] Get user profile
- [ ] Change password
- [ ] Forgot password
- [ ] Error cases (invalid credentials, blocked users, etc.)

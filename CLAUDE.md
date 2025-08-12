# CLAUDE.md - BuildiyoSync Project Documentation

## Project Overview

**BuildiyoSync** is a modern React-based web application built on the Metronic 9 template framework. It's an all-in-one Tailwind CSS-based application designed for modern web development with comprehensive UI components, authentication, and multiple demo layouts.

### Tech Stack Summary

**Frontend Framework:**
- **React 19.1.0** - Latest React version with modern features
- **TypeScript** - Full type safety and modern JavaScript features
- **Vite** - Fast build tool and development server
- **React Router DOM 7.6.3** - Client-side routing

**Styling & UI:**
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **ReUI Components** - Custom React component library
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Modern icon library
- **Radix UI** - Headless UI primitives

**Authentication & Backend:**
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Supabase Auth** - Complete authentication system
- **Row Level Security (RLS)** - Database security

**State Management & Data:**
- **React Query (TanStack Query)** - Server state management
- **Context API** - Client state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

**Additional Features:**
- **React Intl** - Internationalization (i18n)
- **Framer Motion** - Animations
- **ApexCharts & Recharts** - Data visualization
- **React Helmet** - Head management
- **Leaflet** - Interactive maps

## Project Purpose

This application serves as a comprehensive admin dashboard and client interface with:

1. **Multi-layout Dashboard System** - 10+ different layout variations
2. **User Management** - Complete user profiles, teams, and role management
3. **Authentication System** - Sign in/up, 2FA, password reset
4. **E-commerce Store** - Both client and admin interfaces
5. **Network/Social Features** - User cards, tables, and social interactions
6. **Account Management** - Billing, security, integrations, notifications

## Key Architectural Patterns

### 1. Component-Based Architecture
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── common/         # Shared components
│   └── keenicons/      # Icon system
├── pages/              # Page components organized by feature
├── layouts/            # Layout systems (demo1-demo10)
├── partials/           # Partial components (cards, dialogs, etc.)
└── providers/          # Context providers
```

### 2. Authentication Architecture
- **Supabase Provider** - Centralized auth state management
- **Route Protection** - RequireAuth wrapper for protected routes
- **User Context** - Global user state with admin role support
- **Adapter Pattern** - Clean abstraction over Supabase auth

### 3. Layout System
- **Multiple Demo Layouts** - 10 different layout variations
- **Responsive Design** - Mobile-first approach
- **Theme Support** - Dark/light mode with CSS variables
- **Layout Composition** - Header, Sidebar, Footer, Toolbar components

### 4. Configuration-Driven Navigation
```typescript
// Hierarchical menu configuration
export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    children: [...]
  },
  // ... more menu items
];
```

## Database Schema Insights

The database uses Supabase with a simplified user management approach:

```sql
-- Uses Supabase's built-in auth.users table
-- User metadata stored in raw_user_meta_data JSON field
-- Accessible via user_profiles view

CREATE OR REPLACE VIEW user_profiles AS
SELECT
  id,
  email,
  raw_user_meta_data->>'username' AS username,
  raw_user_meta_data->>'first_name' AS first_name,
  raw_user_meta_data->>'last_name' AS last_name,
  raw_user_meta_data->>'fullname' AS fullname,
  raw_user_meta_data->>'occupation' AS occupation,
  raw_user_meta_data->>'company_name' AS company_name,
  raw_user_meta_data->>'phone' AS phone,
  raw_user_meta_data->>'pic' AS pic,
  raw_user_meta_data->>'language' AS language,
  (raw_user_meta_data->>'is_admin')::boolean AS is_admin,
  raw_user_meta_data->'roles' AS roles,
  created_at,
  updated_at
FROM auth.users;
```

**Key Features:**
- **No separate profile table** - Uses auth.users metadata
- **Admin role support** - is_admin boolean field
- **Flexible metadata** - JSON field for extensibility
- **Helper function** - update_user_metadata() for admin operations

## Main Development Commands

```bash
# Install dependencies (requires --force due to React 19)
npm install --force

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting and formatting
npm run lint
npm run format

# Create demo user (email: demo@kt.com, password: demo123)
npm run create-demo-user

# Debug authentication issues
npm run debug-auth
```

## Project Structure Overview

```
buildiyoSync/
├── public/                    # Static assets
│   └── media/                # Images, icons, illustrations
├── src/
│   ├── auth/                 # Authentication system
│   │   ├── adapters/         # Supabase adapter
│   │   ├── providers/        # Auth context providers
│   │   ├── pages/           # Auth pages (signin, signup, etc.)
│   │   └── layouts/         # Auth layouts (branded, classic)
│   ├── components/          # Reusable components
│   │   ├── ui/              # Base UI components
│   │   └── common/          # Shared components
│   ├── layouts/             # Layout systems
│   │   ├── demo1/           # Layout variation 1
│   │   ├── demo2/           # Layout variation 2
│   │   └── ...              # More layout variations
│   ├── pages/               # Application pages
│   │   ├── dashboards/      # Dashboard pages
│   │   ├── account/         # Account management
│   │   ├── network/         # User network features
│   │   ├── public-profile/  # Profile pages
│   │   └── store-client/    # E-commerce pages
│   ├── lib/                 # Utility libraries
│   ├── hooks/               # Custom React hooks
│   ├── providers/           # Global providers
│   └── routing/             # Application routing
├── migration_setup.sql      # Database setup
└── components.json          # shadcn/ui configuration
```

## Environment Setup Requirements

### Required Environment Variables
```env
# Application
VITE_APP_NAME=metronic-tailwind-react
VITE_APP_VERSION=9.2.4

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Prerequisites
- **Node.js 16.x or higher**
- **npm or Yarn**
- **Supabase account and project**
- **Modern browser** with ES2020+ support

## Special Configuration Notes

### 1. React 19 Compatibility
- Uses `npm install --force` due to dependency conflicts
- Configured for React 19 with modern features

### 2. Tailwind CSS 4.x
- Uses the latest Tailwind CSS 4.x with new features
- CSS-in-JS configuration via `@tailwindcss/vite`

### 3. TypeScript Configuration
- Strict mode enabled
- Path aliases configured (`@/*` → `./src/*`)
- Modern ES modules with bundler resolution

### 4. Authentication Flow
- **Sign In**: `/auth/signin`
- **Sign Up**: `/auth/signup`
- **Demo User**: email: `demo@kt.com`, password: `demo123`
- **Password Reset**: Complete flow with email verification
- **2FA Support**: Two-factor authentication pages

### 5. Internationalization
- **Supported Languages**: English, Arabic, French, Chinese
- **Message Files**: Located in `src/i18n/messages/`
- **RTL Support**: Arabic language support

## Development Best Practices

### 1. Component Organization
- **UI Components**: Reusable, styled components in `components/ui/`
- **Page Components**: Feature-specific in `pages/`
- **Partial Components**: Reusable page sections in `partials/`

### 2. State Management
- **Server State**: React Query for API data
- **Client State**: Context API for global state
- **Form State**: React Hook Form with Zod validation

### 3. Authentication
- **Protected Routes**: Use `RequireAuth` wrapper
- **User Context**: Access via `useAuth()` hook
- **Admin Checks**: `user.is_admin` boolean check

### 4. Styling
- **Utility-First**: Use Tailwind CSS classes
- **Component Variants**: Use `class-variance-authority`
- **Responsive**: Mobile-first design approach

## Getting Started

1. **Clone and Install**:
   ```bash
   npm install --force
   ```

2. **Environment Setup**:
   - Copy `.env.example` to `.env`
   - Configure Supabase credentials

3. **Database Setup**:
   - Run `migration_setup.sql` in your Supabase SQL editor

4. **Create Demo User**:
   ```bash
   npm run create-demo-user
   ```

5. **Start Development**:
   ```bash
   npm run dev
   ```

6. **Access Application**:
   - Main App: `http://localhost:5173`
   - Login: `http://localhost:5173/auth/signin`

## Support and Documentation

- **Metronic Documentation**: [https://docs.keenthemes.com/metronic-react](https://docs.keenthemes.com/metronic-react)
- **Support**: [support@keenthemes.com](mailto:support@keenthemes.com)
- **ReUI Components**: [https://reui.io](https://reui.io)

---

*This documentation was generated for the BuildiyoSync project based on Metronic 9 template framework.*
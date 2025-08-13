# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BuildiyoSync is a sophisticated admin dashboard and client interface built on Metronic 9 template with React, TypeScript, and Supabase. It features multiple layout variations, complete authentication system, user management, e-commerce interfaces, and social networking features.

## Tech Stack

- **React 19.1.0** with TypeScript
- **Vite** as build tool
- **Tailwind CSS 4.1.11** with shadcn/ui components
- **Supabase** for authentication and database
- **React Query** for server state management
- **React Router 7.6.3** for routing
- **Lucide React** for icons

## Essential Commands

```bash
# Installation (React 19 requires --force flag)
npm install --force

# Development
npm run dev              # Start development server on port 5173

# Build
npm run build           # Production build
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run format:check    # Check formatting without fixing

# Testing
npm run create-demo-user  # Creates demo@kt.com with password demo123
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Application core
│   ├── routing/           # Route configuration and components
│   └── App.tsx            # Main application component
├── auth/                   # Authentication system
│   ├── adapters/          # Supabase adapter implementation
│   └── services/          # Auth service layer
├── components/            # Reusable components
│   ├── forms/             # Form components and controls
│   ├── tabs/              # Tab navigation components
│   └── ui/                # shadcn/ui components
├── layouts/               # Application layouts
│   ├── demo*/             # 10+ demo layout variations
│   └── components/        # Layout components (header, sidebar, etc.)
├── metronic/              # Metronic theme core
│   ├── core/              # Core functionality
│   ├── helpers/           # Utility functions
│   └── layout/            # Layout system components
├── pages/                 # Page components
├── partials/              # Partial components (widgets, drawers, modals)
├── store/                 # State management
└── utils/                 # Utility functions
```

### Key Architectural Patterns

1. **Provider Pattern**: Uses context providers for global state (ThemeProvider, LayoutProvider, MenuProvider)
2. **Layout Composition**: Flexible layout system with multiple demo variations
3. **Authentication Adapter**: Abstracts Supabase auth behind a service interface
4. **Configuration-Driven Navigation**: Menu structure defined in configuration files
5. **Component Composition**: Heavy use of compound components and render props

### Database Schema

The application uses Supabase with the following key tables:

```sql
-- Core authentication uses Supabase's built-in auth.users table
-- User metadata stored as JSONB for flexibility

-- User profiles view for easier access
CREATE VIEW user_profiles AS
SELECT 
  id,
  email,
  created_at,
  raw_user_meta_data->>'avatar' AS avatar,
  raw_user_meta_data->>'username' AS username,
  raw_user_meta_data->>'full_name' AS full_name,
  raw_user_meta_data->>'first_name' AS first_name,
  raw_user_meta_data->>'last_name' AS last_name,
  raw_user_meta_data->>'phone' AS phone,
  raw_user_meta_data->>'is_admin' AS is_admin
FROM auth.users;
```

### Authentication Flow

1. Authentication is handled through Supabase adapter at `src/auth/adapters/supabase/`
2. Auth state managed via React Query with automatic token refresh
3. Protected routes handled by `AuthenticatedRoute` component
4. Role-based access control through user metadata

### Routing System

- Routes defined in `src/app/routing/AppRoutes.tsx`
- Layout-specific routes in each demo directory
- Private routes wrapped with authentication guard
- Error boundaries at route level for resilience

## Environment Configuration

Required environment variables (see .env.example):

```env
VITE_APP_SUPABASE_URL=your_supabase_url
VITE_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_API_URL=your_api_url
VITE_APP_VERSION=1.0.0
VITE_APP_THEME_MODE=light
VITE_APP_THEME_DIRECTION=ltr
```

## Development Guidelines

### Component Development

- Components follow the compound component pattern when appropriate
- Use TypeScript interfaces for all props
- Leverage shadcn/ui components in `src/components/ui/`
- Follow existing naming conventions (PascalCase for components, camelCase for utilities)

### State Management

- Server state: React Query with Supabase
- UI state: React Context API with providers
- Form state: React Hook Form (where implemented)
- URL state: React Router params and search params

### Styling

- Tailwind CSS 4.x with new Vite plugin configuration
- Custom theme configuration in tailwind.config.js
- CSS variables for theme colors defined in index.css
- Avoid inline styles; use Tailwind utility classes

### Testing Approach

While no test files are currently present, when adding tests:
- Place test files adjacent to components with `.test.tsx` extension
- Use React Testing Library for component tests
- Mock Supabase client for auth-dependent tests

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/app/routing/AppRoutes.tsx`
3. Update navigation config if needed in layout's menu configuration
4. Apply authentication guard if required

### Modifying Layouts

Each demo layout has its own directory under `src/layouts/demo*/`. To modify:
1. Navigate to specific demo directory
2. Update layout components (header, sidebar, etc.)
3. Modify menu configuration in the layout's config file

### Working with Supabase

- Auth functions in `src/auth/services/`
- Database queries should use the Supabase client from context
- Handle errors consistently with try-catch blocks
- Use React Query for data fetching and caching

## Important Notes

- React 19 compatibility requires `npm install --force`
- Tailwind CSS 4.x uses new plugin system - check vite.config.ts
- Demo user credentials: demo@kt.com / demo123
- Multiple layout demos available - default is demo1
- Authentication tokens auto-refresh via React Query
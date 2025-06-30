# Yaki & Dori Website

## Overview

This is a kawaii-themed website showcasing the Yaki & Dori characters - adorable animated GIF characters that have gained popularity on GIPHY. The application is built as a full-stack web application featuring a React frontend with a Node.js/Express backend, designed to display character information and their associated GIF collections.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom kawaii-themed color palette
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API endpoints
- **Session Management**: PostgreSQL-based session store

### Data Storage
- **Primary Database**: PostgreSQL via Neon Database
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations with schema definitions
- **Fallback Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
- **Characters Table**: Stores character information (name, type, color, personality, description, avatar)
- **GIFs Table**: Stores GIF metadata (title, URL, character association, category, tags)
- **Users Table**: User authentication (maintained for compatibility)

### API Endpoints
- `GET /api/characters` - Retrieve all characters
- `GET /api/characters/:id` - Get specific character details
- `GET /api/gifs` - Get all GIFs with optional category filtering
- `GET /api/characters/:id/gifs` - Get GIFs for specific character

### Frontend Components
- **Navigation**: Fixed navigation with smooth scrolling
- **Hero Section**: Landing area with character showcase
- **Character Sections**: Individual sections for Yaki and Dori
- **Gallery Section**: Filterable GIF gallery
- **About Section**: Information about the characters and creator

## Data Flow

1. **Initial Load**: React app bootstraps with Vite, establishes API connection
2. **Data Fetching**: TanStack Query manages API calls with caching and error handling
3. **Character Display**: Components consume character data and associated GIFs
4. **User Interaction**: Smooth scrolling navigation and interactive filtering
5. **Responsive Design**: Tailwind CSS ensures mobile-first responsive layout

## External Dependencies

### Core Dependencies
- **Database**: Neon Database for PostgreSQL hosting
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **UI Components**: Radix UI primitives for accessibility
- **Animations**: CSS animations with Tailwind utilities

### Development Dependencies
- **Build**: Vite with React plugin
- **TypeScript**: Full TypeScript support across stack
- **Linting**: ESBuild for production bundling
- **Development**: Hot module replacement and error overlay

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution
- **Database**: Development database connection via environment variables

### Production Build
- **Frontend**: Vite build to static assets in `dist/public`
- **Backend**: ESBuild bundle to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command
- **Environment**: Production configuration via environment variables

### Architecture Decisions

1. **Monorepo Structure**: Single repository with shared TypeScript types
2. **Type Safety**: End-to-end TypeScript with Drizzle ORM for database types
3. **Modern Stack**: ES modules, Vite, and modern React patterns
4. **Responsive Design**: Mobile-first approach with Tailwind CSS
5. **Performance**: Static asset optimization and query caching
6. **Accessibility**: Radix UI primitives ensure WCAG compliance

## Changelog

```
Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Updated hero section to replace character cards with user-provided video
- June 30, 2025. Applied custom Sinchon Rhapsody ExtraBold font to ALL text elements throughout entire website
- June 30, 2025. Implemented comprehensive English/Korean translation system with instant language switching
- June 30, 2025. Optimized layout: tighter spacing, larger GIFs, removed drop shadows, added subtle bounce animations
- June 30, 2025. Integrated authentic GIF collection from sick_yaki GIPHY profile with comprehensive duplicate prevention system
- June 30, 2025. Fixed GIF categorization to ensure proper character separation in gallery sections
- June 30, 2025. Removed "Together" category from gallery, recategorized all GIFs to Yaki or Dori only
- June 30, 2025. Fixed "I Love You Kiss" display issue with user-provided updated file
- June 30, 2025. Corrected "Excited Jump Classic" categorization from Dori to Yaki
- June 30, 2025. Implemented curved text effect for hero subtitle using CSS transforms with perspective effects and white text outline for full text visibility
- June 30, 2025. Added cute wiggle-pulse animation to hero title with 3-second cycle combining gentle rotation and scaling effects
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
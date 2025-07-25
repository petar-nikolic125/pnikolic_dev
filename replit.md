# Replit.md

## Overview

This is a full-stack React portfolio application built with TypeScript, showcasing a professional software engineer's work experience, skills, and projects. The application features a modern, responsive design with sophisticated animations, a sticky navigation system, and a comprehensive portfolio showcase.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system using CSS variables
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **State Management**: React hooks (useState, useEffect) for local state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Structure**: RESTful API with `/api` prefix routing

### Design System
The application implements a comprehensive design system with:
- Custom CSS variables for consistent theming
- Dark mode support with CSS class-based switching
- Brand color palette (sky, fuchsia, lime, amber, cyan, purple, rose)
- Typography system using Inter and Playfair Display fonts
- Responsive breakpoints and spacing utilities

## Key Components

### Hero Section
- Animated name display with "sword-shine" effect
- Professional title and tagline
- Location and availability information
- Call-to-action buttons for resume and contact
- Social media links with hover animations

### Navigation System
- Sticky navigation that appears after scrolling past hero
- Smooth scrolling between sections
- Active section highlighting
- Responsive design with mobile considerations

### Work & Education Timeline
- Dual timeline layout for work experience and education
- Animated entry effects with intersection observer
- Metrics display with count-up animations
- Technology badges and ribbons for status indicators

### Skills Showcase
- Categorized skill display (Web, Databases, AI/ML, Tools, etc.)
- Icon integration with Simple Icons library
- Emoji fallbacks for accessibility
- Responsive grid layout

### Projects Gallery
- Filterable project showcase with search functionality
- Category and technology filtering
- Image banners for visual appeal
- External link integration

### Footer/Contact
- Social media links with animation effects
- Professional monogram display
- Contact information and copyright

## Data Flow

1. **Static Data**: Portfolio content is stored in TypeScript files under the data directory
2. **Component State**: Local component state managed with React hooks
3. **Animations**: Intersection Observer API for scroll-triggered animations
4. **Navigation**: Hash-based routing for single-page navigation
5. **External Links**: Direct navigation to external resources (GitHub, LinkedIn, etc.)

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Query
- **UI Framework**: Radix UI components, Tailwind CSS
- **Icons**: Lucide React, Simple Icons
- **Utilities**: Class Variance Authority, clsx, date-fns
- **Database**: Drizzle ORM, Neon Database serverless client
- **Validation**: Zod for schema validation

### Development Dependencies
- **Build Tools**: Vite, TypeScript, ESBuild
- **Replit Integration**: Vite plugins for runtime error overlay and cartographer

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- TypeScript compilation with incremental builds
- Replit-specific plugins for enhanced development experience

### Production Build
- Vite production build for optimized client bundle
- ESBuild for server-side bundling
- Static assets served from `/dist/public`
- Server bundle output to `/dist/index.js`

### Deployment Platform
- **Primary**: Vercel with custom configuration
- **Database**: Neon Database (serverless PostgreSQL)
- **Static Assets**: Served through Vercel's CDN
- **API Routes**: Server-side rendering through Vercel Functions

### Database Management
- Drizzle migrations in `/migrations` directory
- Schema definitions in `/shared/schema.ts`
- Environment-based database URL configuration

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
- January 23, 2025. Fixed DOM nesting warning in ProjectsEnhanced component by removing nested anchor tags
- January 23, 2025. Debugged and resolved application startup issues - both client and server now running properly
- January 25, 2025. Created modular project pages system with individual routes for each project
- January 25, 2025. Implemented shared components (ProjectHeader, TechStack, Gallery, LinksPanel) for consistent styling
- January 25, 2025. Updated routing system to support individual project URLs (/projects/[slug])
- January 25, 2025. Added rich content support for tables, images, and detailed technical descriptions
- January 25, 2025. Fixed routing from WorkEducationEnhanced component - all project links now properly navigate to individual project pages
- January 25, 2025. Added GitHub source links to all 7 projects in portfolio data
- January 25, 2025. Connected work experience JSON data to project detail pages via detailUrl properties
- January 25, 2025. Enhanced portfolio data with extensive methodologies, programming paradigms, architecture details, and taglines
- January 25, 2025. Created EnhancedTags component with beautiful interactive styling and animations
- January 25, 2025. Added GradientCard and MetricCard components for enhanced visual presentation
- January 25, 2025. Integrated enhanced tag displays into all 7 project pages with expanded technical details
- January 25, 2025. Successfully migrated project from Replit Agent to Replit environment
- January 25, 2025. Implemented modular image system: created public/projects/[slug]/ structure, added Express static middleware, moved images to correct project folders
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
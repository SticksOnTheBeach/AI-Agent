# Agent IA - Chat Application

## Overview

Agent IA is a full-stack chat application designed to provide AI-powered conversational experiences. The application features a modern React frontend with a shadcn/ui component library and an Express.js backend. It implements a complete chat system with session management, message persistence, and OpenAI GPT integration for intelligent responses.

The project is structured as a monorepo with shared schemas and type definitions, supporting both development and production deployments. The application emphasizes user privacy, modern UI design, and scalable architecture patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints for chat operations
- **Session Management**: In-memory storage with abstracted storage interface
- **Development Server**: Custom Vite integration for hot module replacement

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Management**: Shared TypeScript schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database schema management
- **Current Implementation**: Memory-based storage with database interface ready for production

### Authentication and Authorization
- **Current State**: No authentication implemented (development phase)
- **Planned**: Session-based authentication with cookie management using connect-pg-simple

### External Service Integrations
- **AI Provider**: OpenAI GPT API for chat completions
- **Model**: Configured to use GPT-5 (latest model as of implementation)
- **API Management**: Environment variable configuration for API keys
- **Response Processing**: Structured chat message handling with metadata support

### Development Workflow
- **Build System**: ESBuild for server bundling, Vite for client bundling
- **Type Safety**: Comprehensive TypeScript configuration with strict mode
- **Hot Reload**: Vite development server with Express middleware integration
- **Code Quality**: Path mapping for clean imports and modular architecture

### Deployment Strategy
- **Production Build**: Optimized bundles with static asset serving
- **Environment Configuration**: Environment-specific database and API configurations
- **Scalability**: Abstracted storage layer allowing easy transition from memory to database storage

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clean separation of concerns between frontend, backend, and shared utilities.

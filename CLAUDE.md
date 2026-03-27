# V2 - Sales Lead Scoring — Claude Development Guide

## Project Overview
V2 is an AI-powered sales lead scoring and assignment system built with Next.js 15 and Supabase. It automatically scores leads from multiple sources (HubSpot, email, phone) and intelligently assigns them to sales reps with real-time notifications and AI qualification.

## Tech Stack
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes, Server Actions, Supabase (PostgreSQL + Auth)
- **AI:** OpenAI (ChatGPT), Anthropic (Claude)
- **Integrations:** HubSpot, Twilio, Gmail API, Google Drive API, Salesforce
- **Deployment:** Vercel

## Folder Structure


/app/
├── (auth)/              # Public auth pages: login, signup, forgot-password
├── (dashboard)/         # Protected pages: dashboard, leads, scoring, etc.
├── api/                 # API routes for integrations and webhooks
├── globals.css          # Global styles
└── layout.tsx           # Root layout

/components/
├── ui/                  # shadcn/ui components
├── forms/               # Form components
├── charts/              # Data visualization
├── layout/              # Navigation, headers, sidebars
└── features/            # Feature-specific components

/lib/
├── utils.ts             # Utility functions
├── validations.ts       # Zod schemas
├── scoring.ts           # Lead scoring logic
├── assignment.ts        # Lead assignment logic
├── notifications.ts     # SMS/email notification logic
└── integrations/        # Integration clients (HubSpot, Twilio, etc.)

/db/
├── index.ts             # Supabase client
├── users.ts             # User data access
├── leads.ts             # Lead data access
├── scoring.ts           # Scoring data access
└── assignments.ts       # Assignment data access

/actions/
├── leads.ts             # Lead server actions
├── scoring.ts           # Scoring server actions
├── assignments.ts       # Assignment server actions
└── notifications.ts     # Notification server actions

/types/
├── database.ts          # Supabase generated types
├── integrations.ts      # Integration types
└── index.ts             # Shared types

/supabase/
├── migrations/          # Database migrations
└── config.toml          # Supabase configuration


## Coding Conventions

1. **TypeScript:** Strict mode enabled, no `any` types
2. **Components:** Server components by default, use 'use client' only when necessary
3. **Data Access:** Only in `/db` folder functions
4. **Business Logic:** Only in `/lib` and `/actions` folders
5. **Secrets:** Never expose API keys in client components
6. **Forms:** Use react-hook-form with Zod validation
7. **Styling:** Tailwind CSS with shadcn/ui components
8. **Error Handling:** Proper try/catch blocks with meaningful error messages

## Current State: Scaffold Generated

### ✅ Generated Scaffold Includes:
- Complete Next.js 15 project structure with App Router
- Supabase integration with auth and database
- 15 database tables with proper relationships
- 32 page routes (public auth + protected dashboard)
- Basic UI components and layout structure
- Integration stubs for all required services
- TypeScript configuration and type definitions
- Tailwind CSS setup with shadcn/ui
- Environment variable configuration
- Basic RLS policies on all tables

### 📋 Database Tables Created:
- `users` - User accounts with roles (Sales Rep, Sales Manager, Admin)
- `leads` - Lead records with contact info and metadata
- `lead_tags` - Tagging system for leads
- `lead_requested_items` - Items/services requested by leads
- `scoring_rules` - Configurable scoring parameters
- `lead_scores` - Historical scoring data
- `assignment_rules` - Lead assignment configuration
- `sms_notifications` - Twilio notification tracking
- `email_sequences` - Gmail follow-up campaigns
- `email_templates` - Email template library
- `email_sends` - Email delivery tracking
- `chatbot_conversations` - AI qualification sessions
- `integration_configs` - Integration settings
- `sync_logs` - Integration sync history
- `reports` - Analytics and reporting data

## What to Build Next: V1 Features

### 1. Automated Lead Scoring Engine (~8 hours)
Build the core scoring algorithm that evaluates:
- Email domain patterns (corporate vs consumer)
- Phone number area codes and patterns
- Requested items/services value
- Customizable weighting rules
- Real-time score calculation

### 2. Smart Lead Assignment System (~6 hours)
Implement intelligent lead distribution:
- Score threshold configuration
- Sales rep availability tracking
- Round-robin and weighted assignment
- Workload balancing
- Assignment history and audit trail

### 3. Real-time SMS Notifications (~4 hours)
Twilio integration for instant notifications:
- High-value lead alerts to assigned reps
- Customizable message templates
- Delivery status tracking
- Notification preferences
- SMS history and analytics

### 4. HubSpot Integration (~10 hours)
Bi-directional HubSpot sync:
- Automated lead import from HubSpot
- Company size and industry detection
- Automatic tagging based on HubSpot data
- Lead status sync back to HubSpot
- Deal creation for qualified leads

### 5. AI-Powered Lead Qualification (~12 hours)
ChatGPT/Claude chatbot integration:
- Initial qualification conversation flow
- Lead scoring input generation
- Conversation history tracking
- Integration with main scoring engine
- Handoff to human sales reps

## Never Touch Rules

❌ **Never modify without explicit instruction:**
- `.env` files (ask for specific variables to add/change)
- Migration files in `/supabase/migrations/`
- RLS policies (requires security review)
- Supabase generated types in `/types/database.ts`

## How to Work on This Project

### Before Starting Any Task:
1. **Read this file completely** - understand current state and architecture
2. **Check TECHNICAL_DEBT.md** - be aware of known limitations
3. **Review the specific feature requirements** in detail

### Development Workflow:
1. **Always run `npm run build`** before committing to catch TypeScript errors
2. **Commit small and often** with conventional commit messages:
   - `feat: add lead scoring algorithm`
   - `fix: resolve assignment rule bug`
   - `refactor: optimize database queries`
3. **Document technical debt explicitly** when taking shortcuts
4. **Test integrations thoroughly** - use sandbox/test environments

### Code Quality:
- Write TypeScript without any `any` types
- Use proper error handling with try/catch blocks
- Validate all user inputs with Zod schemas
- Keep server components as the default
- Only use 'use client' when absolutely necessary for interactivity
- Follow the single responsibility principle
- Write descriptive variable and function names

### Database Work:
- Use the established `/db` functions for all database access
- Never write raw SQL in components or pages
- Always use Supabase RLS for security
- Test database changes thoroughly before committing

### Integration Development:
- Use environment variables for all API keys
- Implement proper rate limiting
- Add retry logic for failed API calls
- Log integration activities for debugging
- Test with real but safe data

### Mobile-First Development:
- Design for mobile screens first
- Use responsive Tailwind classes
- Test on actual mobile devices
- Optimize for touch interactions
- Ensure fast loading times
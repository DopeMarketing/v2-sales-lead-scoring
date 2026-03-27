# V2 - Sales Lead Scoring

> An AI-powered sales lead scoring and assignment system that automatically evaluates, tags, and distributes leads to sales reps based on customizable scoring rules.

## What it does

V2 automatically scores incoming sales leads using email domains, phone patterns, and requested items, then intelligently assigns them to sales reps. It integrates with HubSpot, Twilio, Gmail, and other tools to create a complete lead management workflow with real-time notifications and AI-powered qualification.

**Built for:** Sales teams that need to automatically qualify and distribute leads at scale

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Supabase (PostgreSQL + Auth)
- **AI:** ChatGPT, Claude for lead qualification
- **Integrations:** HubSpot, Twilio, Gmail, Google Drive, Salesforce, Google Sheets
- **Automation:** Make, Zapier
- **Deployment:** Vercel

## Prerequisites

- Node.js 20+
- npm or yarn
- Supabase CLI
- Git

## Quick Start

1. **Clone and install**
   bash
   git clone <repo-url>
   cd v2-sales-lead-scoring
   npm install
   

2. **Environment setup**
   bash
   cp .env.example .env.local
   # Fill in your environment variables (see table below)
   

3. **Database setup**
   bash
   supabase start
   supabase db push
   

4. **Run development server**
   bash
   npm run dev
   

   Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |
| `HUBSPOT_API_KEY` | HubSpot private app access token | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account identifier | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token | Yes |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number | Yes |
| `GMAIL_CLIENT_ID` | Gmail OAuth client ID | Yes |
| `GMAIL_CLIENT_SECRET` | Gmail OAuth client secret | Yes |
| `GOOGLE_DRIVE_API_KEY` | Google Drive API key | Yes |
| `OPENAI_API_KEY` | OpenAI API key for ChatGPT | Yes |
| `CLAUDE_API_KEY` | Anthropic API key for Claude | Yes |
| `SALESFORCE_CLIENT_ID` | Salesforce connected app client ID | No |
| `SALESFORCE_CLIENT_SECRET` | Salesforce connected app secret | No |
| `MAKE_WEBHOOK_URL` | Make.com webhook endpoint | No |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook endpoint | No |

## Database Setup

The project uses Supabase PostgreSQL with these main tables:
- `users` - User accounts with role-based access
- `leads` - Lead records with scoring data
- `scoring_rules` - Configurable scoring logic
- `assignment_rules` - Lead assignment configuration
- `sms_notifications` - Twilio notification history
- `chatbot_conversations` - AI qualification sessions

Run migrations:
bash
supabase db push


## Deploy to Vercel

1. **Connect repository to Vercel**
   bash
   vercel
   

2. **Set environment variables** in Vercel dashboard

3. **Configure Supabase** for production domain

## Project Structure


/
├── app/                 # Next.js 15 app directory
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Protected dashboard pages
│   └── api/            # API routes
├── components/         # Reusable React components
├── lib/               # Business logic and utilities
├── db/                # Database access functions
├── actions/           # Server actions
├── types/             # TypeScript type definitions
├── supabase/          # Database migrations and config
└── public/            # Static assets


## Key Features (v1)

- ✅ Automated lead scoring engine
- ✅ Smart lead assignment system
- ✅ Real-time SMS notifications via Twilio
- ✅ HubSpot integration with auto-tagging
- ✅ AI-powered lead qualification chatbot

## Contributing

1. Read `CLAUDE.md` for AI development guidelines
2. Check `TECHNICAL_DEBT.md` for known issues
3. Follow conventional commit format
4. Run `npm run build` before committing

## License

Internal use only
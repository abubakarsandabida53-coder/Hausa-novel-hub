# Hausa Novels Hub — Website starter

A new, independent multilingual reading and audiobook platform foundation.

## What is included now

- Responsive premium dark-and-gold homepage.
- Multilingual catalogue preview and working client-side search/filter.
- Hausa, English, Arabic, Yoruba, Igbo and French language entry points.
- Responsive book cards and audiobook/premium sections.
- Next.js + TypeScript project structure.
- Supabase client placeholder and initial PostgreSQL schema.
- Environment-variable template.

**Important:** The book cards are sample preview content. Authentication, real catalogue data, audio streaming, subscriptions, payment processing, admin permissions and uploads are not live yet. They will be implemented in later phases and must be tested before launch.

## Run on your computer

1. Install Node.js LTS from https://nodejs.org/.
2. Install Visual Studio Code from https://code.visualstudio.com/.
3. Extract this ZIP file.
4. Open the extracted `hausa-novels-hub` folder in VS Code.
5. Open Terminal → New Terminal.
6. Run:

   ```bash
   npm install
   npm run dev
   ```

7. Open http://localhost:3000 in your browser.

## Configure Supabase

1. Create a project at https://supabase.com/.
2. In Project Settings → API, copy the Project URL and anon/public key.
3. Copy `.env.example` to `.env.local`.
4. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. In Supabase SQL Editor, review and run `supabase/schema.sql`.

Never put a Supabase service-role key or payment secret key in browser code. Payment verification must happen on the server.

## Recommended build phases

1. Finish branding and responsive pages.
2. Configure Supabase Auth and profile management.
3. Complete database schema, migrations and Row Level Security.
4. Connect real novels, chapters and secure media storage.
5. Build reader, bookmarks and progress tracking.
6. Build audiobook streaming and background playback.
7. Build admin and author dashboards with server-side role checks.
8. Integrate Paystack checkout, server verification and signed webhooks.
9. Add premium entitlements, notifications, analytics and moderation.
10. Test, secure and deploy.

## Arabic / RTL note

The database stores each language's text direction. The next UI phase should apply `dir="rtl"` to Arabic reading and navigation contexts and test mixed Arabic/Latin text carefully.

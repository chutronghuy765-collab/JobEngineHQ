# JobEngineHQ - Job Website V2

A modern, redesigned job board platform for connecting digital marketers with top companies worldwide.

## Features

- 🎨 Modern, beautiful UI with Material-UI
- 🔍 Advanced job search with filters
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🔐 Secure application system
- 📊 Real-time job listings from Supabase

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Backend**: Supabase
- **Routing**: React Router v6
- **Deployment**: Netlify

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
5. Deploy!

## Project Structure

```
job-website-v2/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Jobs.tsx
│   │   ├── JobDetail.tsx
│   │   ├── PostJobs.tsx
│   │   └── ...
│   ├── services/
│   │   ├── jobService.ts
│   │   └── applicationService.ts
│   ├── hooks/
│   │   └── useJobs.ts
│   ├── supabase.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── netlify.toml
```

## Supabase Setup

This project uses Supabase for backend services. Make sure your Supabase project has the following tables:

- `jobs` - Job listings
- `applications` - Job applications
- `users` - User profiles (optional, uses Supabase Auth)

## License

MIT


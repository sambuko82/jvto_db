# JVTO Unified Dashboard

**Next.js + Tailwind CSS | Database Mirror + Backoffice + SSOT Integration**

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)
![Database](https://img.shields.io/badge/Database-PostgreSQL%2095%2B%20Tables-orange)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Ready-purple)

---

## 📊 Dashboard Overview

Comprehensive dashboard integrating:
- **Database Mirror** — 95+ PostgreSQL tables, 1000+ records
- **Backoffice Live** — Real-time booking data, payments, metrics
- **SSOT Integration** — Narrative structure, content mapping
- **6-Layer Architecture** — Website, CMS, CRM, Ads, Portal, Operations

### 5 Dashboard Tabs

| Tab | Purpose | Features |
|-----|---------|----------|
| 📊 **Overview** | Key metrics & readiness | KPIs, layer progress, live stats |
| 🏗️ **Architecture** | System design | 6 layers, data relationships, stack |
| 📋 **Inventory** | Table explorer | 95+ tables, search, sort, type filter |
| ⚙️ **Backoffice** | Live integration | API status, connected systems, sync health |
| 🔗 **Data Flow** | Integration flows | SSOT→CMS→Ads flows, real-time events |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

```bash
# 1. Clone repo
git clone https://github.com/sambuko82/jvto_db.git
cd jvto_db_repo

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run development server
npm run dev

# 5. Open browser
# Visit http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```bash
# Database (PostgreSQL Mirror)
DB_HOST=31.97.223.43
DB_PORT=5432
DB_NAME=jvto_dev
DB_USER=postgres
DB_PASSWORD=SuksesL@ncarRezek1
DB_SSL=disable

# Backoffice
BACKOFFICE_URL=https://new-backoffice.javavolcano-touroperator.com
BACKOFFICE_EMAIL=jvto@new-backoffice.javavolcano-touroperator.com
BACKOFFICE_PASSWORD=bismillahsukses

# App
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=JVTO Unified Dashboard
```

---

## 🌐 Vercel Deployment

### Option 1: Automatic Deployment (Recommended)

**GitHub → Vercel Auto-Deploy**

1. **Connect Repository**
   - Visit: https://vercel.com/new
   - Connect GitHub repo: `sambuko82/jvto_db`
   - Select project root: `/` (default)

2. **Configure Environment**
   - Settings → Environment Variables
   - Add all variables from `.env.example`
   - Select: Production, Preview, Development

3. **Deploy**
   - Click "Deploy" button
   - Vercel builds and deploys automatically

4. **Auto-Updates**
   - Every push to `main` → automatic deployment
   - Preview URLs for branches

### Option 2: Manual Deployment with Vercel CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Follow prompts to set environment variables
```

### Option 3: Docker Deployment

```bash
# Build
docker build -t jvto-dashboard .

# Run
docker run -p 3000:3000 \
  -e DB_HOST=31.97.223.43 \
  -e DB_PASSWORD=SuksesL@ncarRezek1 \
  jvto-dashboard
```

---

## 📈 Key Metrics Displayed

### Overview Tab
- **442** Customers
- **415** Bookings
- **28** Tour Packages
- **10** Destinations
- **23** Crew Members
- **95+** Database Tables

### Architecture Tab
1. **Website Layer** (100% Live) — Public website
2. **CMS Layer** (75% Ready) — Content management
3. **CRM Layer** (75% Ready) — Customer management
4. **Ads Layer** (75% Ready) — Campaign management
5. **Portal Layer** (50% Ready) — Customer portal
6. **Operations Layer** (50% Ready) — Internal ops

### Data Flow Tab
- SSOT → CMS (daily sync)
- CMS → Ads (real-time suggestions)
- Ads → Attribution (conversion tracking)
- Attribution → CRM (ROI data)
- CRM → SSOT (insights export)

---

## 🏗️ Project Structure

```
jvto_db_repo/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (dashboard)
│   ├── globals.css              # Global styles
│   └── providers.tsx            # Client providers
│
├── components/                   # React components
│   ├── DashboardHeader.tsx       # Header with branding
│   ├── MetricsGrid.tsx          # KPI cards
│   ├── LayerVisualization.tsx   # 6-layer architecture
│   ├── TableInventory.tsx       # Database explorer
│   ├── BackofficeIntegration.tsx # Live status
│   ├── DataFlowChart.tsx        # Integration flows
│   └── RealtimeMetrics.tsx      # Live activity
│
├── public/                       # Static assets
│   └── JVTO_SSOT_v4_0_CLEAN.json
│
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind CSS
├── postcss.config.js            # PostCSS config
├── tsconfig.json                # TypeScript config
├── vercel.json                  # Vercel deployment
├── package.json                 # Dependencies
├── .env.example                 # Environment template
└── .gitignore                   # Git ignore
```

---

## 🎨 Design System

### Colors (Tailwind)
- **Primary**: Blue (from-blue-500 to-blue-600)
- **Secondary**: Purple (from-purple-500 to-purple-600)
- **Success**: Green (from-green-500 to-green-600)
- **Warning**: Amber (from-amber-500 to-amber-600)
- **Accent**: Pink, Cyan, Red

### Components
- Cards: Semi-transparent with border
- Buttons: Gradient backgrounds
- Metrics: Stat cards with trending indicators
- Tables: Sortable, searchable rows

### Typography
- Headings: Gradient text or white
- Body: Slate-300 for secondary content
- Code: Monospace font-mono

---

## 🔌 API Integration

### Database Connection
```typescript
// Connection details in .env.local
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
```

### Backoffice Integration
```typescript
// Real-time data from backoffice
const backofficeAPI = {
  baseURL: process.env.BACKOFFICE_URL,
  auth: {
    email: process.env.BACKOFFICE_EMAIL,
    password: process.env.BACKOFFICE_PASSWORD,
  },
};
```

### SSOT Integration
```typescript
// Load SSOT narrative structure
import SSOT from '@/public/JVTO_SSOT_v4_0_CLEAN.json';
```

---

## 📋 Build & Deployment Commands

```bash
# Development
npm run dev            # Start dev server (port 3000)

# Production
npm run build          # Build for production
npm run start          # Start production server

# Type checking
npm run type-check     # Check TypeScript types

# Linting
npm run lint           # Run ESLint
```

---

## 🔐 Security

### Environment Variables
- ✅ Never commit `.env.local`
- ✅ Use `.env.example` as template
- ✅ Rotate credentials regularly
- ✅ Store secrets in Vercel UI, not code

### Database Access
- ✅ PostgreSQL SSL ready (set `DB_SSL=require` in production)
- ✅ Connection pooling recommended
- ✅ Read-only credentials for analytics

---

## 📊 Performance

### Optimization
- Code splitting by route
- Image optimization enabled
- CSS modules for component styles
- TypeScript strict mode

### Monitoring
- Real-time metrics on dashboard
- Database connection status
- API request monitoring
- Sync health indicators

---

## 🐛 Troubleshooting

### Development Issues

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

**Dependencies issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors**
```bash
npm run type-check    # Check TypeScript
npm run lint          # Check linting
```

### Deployment Issues

**Vercel build fails**
- Check `vercel.json` configuration
- Verify environment variables in Vercel UI
- Check build logs: https://vercel.com/dashboard

**Database connection fails**
- Verify IP whitelist on database server
- Check credentials in `.env`
- Test with `psql` CLI

---

## 📚 Documentation

- [Database Mirror Analysis](./DB_MIRROR_ANALYSIS.md)
- [README Database](./README_DATABASE.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m "feat: description"`
4. Push to branch: `git push origin feature/name`
5. Open Pull Request

---

## 📄 License

SPDX-License-Identifier: Apache-2.0

---

## 🚀 Deployment Status

| Platform | Status | URL |
|----------|--------|-----|
| GitHub | ✅ Ready | [sambuko82/jvto_db](https://github.com/sambuko82/jvto_db) |
| Vercel | 🔄 Deploy Ready | [vercel.com/new](https://vercel.com/new) |
| Database | ✅ Online | 31.97.223.43:5432 |
| Backoffice | ✅ Live | new-backoffice.javavolcano-touroperator.com |

---

## 📞 Support

**Issues or Questions?**
- GitHub Issues: [Create Issue](https://github.com/sambuko82/jvto_db/issues)
- Documentation: See links above
- Contact: [JVTO Team]

---

**Last Updated**: 2026-04-08  
**Framework**: Next.js 14  
**Status**: Production Ready ✅  
**Deployment**: Vercel Ready 🚀  


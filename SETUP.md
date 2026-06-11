# NEXUS BY THierry - Development Setup

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Allancity/NEXUS-BY-THierry.git
cd NEXUS-BY-THierry
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Create a web app in your Firebase project
3. Copy your Firebase config
4. Create `.env.local` from the template:
```bash
cp .env.local.example .env.local
```

5. Add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎬 Demo Credentials

```
Admin:        admin@nexus.com / Admin@123
HSE Manager:  manager@nexus.com / Manager@123
Supervisor:   supervisor@nexus.com / Supervisor@123
Employee:     employee@nexus.com / Employee@123
```

## 📁 Project Structure

```
NEXUS-BY-THierry/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx           # Dashboard layout with auth guard
│   │   ├── page.tsx             # Main dashboard
│   │   ├── events/
│   │   │   └── page.tsx         # Incidents page
│   │   ├── risks/               # Coming in Phase 2
│   │   ├── inspections/         # Coming in Phase 2
│   │   └── hazards/             # Coming in Phase 2
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── page.tsx                 # Login page
├── components/
│   ├── Navigation.tsx           # Sidebar navigation
│   ├── KPICard.tsx              # KPI display card
│   ├── IoTStrip.tsx             # Real-time sensor monitoring
│   ├── IncidentModal.tsx        # Incident reporting form
│   └── ProtectedRoute.tsx       # Auth protection wrapper
├── context/
│   └── AuthContext.tsx          # Auth provider and hook
├── lib/
│   ├── firebase.ts              # Firebase initialization
│   ├── auth.ts                  # Auth utilities and demo data
│   └── authStore.ts             # Zustand auth store
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🔑 Key Features - Phase 1

✅ **Authentication**
- Email/password login
- Role-based access control (RBAC)
- Demo credentials for testing
- Firebase Auth integration

✅ **Dashboard**
- 6 KPI cards (Incidents, Compliance, Risk, Response Time, etc.)
- Real-time Recharts visualizations
  - Line chart: Incident trends
  - Pie chart: Risk distribution
  - Bar chart: Department compliance
- IoT sensor strip with live updates

✅ **Incidents Management**
- Report incidents with modal form
- Search and filter by title, location, severity, status
- Severity levels: Low, Medium, High, Critical
- Status tracking: Open, Investigating, Resolved

✅ **Navigation**
- Role-based menu items
- Responsive sidebar (mobile-friendly)
- User profile section with logout
- Smooth transitions

## 🚀 Build for Production

```bash
npm run build
npm run start
```

## 📦 Dependencies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase 10** - Backend services
- **Recharts 2** - Data visualization
- **Zustand** - State management
- **Lucide React** - Icons

## 🔄 Phase Roadmap

### Phase 1 ✅ COMPLETED
- Login with role selector
- Dashboard with KPIs & IoT
- Incidents page with modal

### Phase 2 🔄 IN PROGRESS
- Risk assessment (5×5 matrix)
- Inspections & audits
- Hazard reporting

### Phase 3 📋 PLANNED
- User management
- Training tracking
- Corrective actions
- Analytics dashboards

### Phase 4 🔮 FUTURE
- Full IoT integration
- Flutter mobile app
- Real-time notifications
- Advanced analytics

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
npx kill-port 3000
npm run dev
```

### Firebase Errors
- Verify all env variables are set correctly
- Check Firebase project has Authentication enabled
- Enable Firestore database

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📞 Support

For issues or questions, please check:
- GitHub Issues
- Firebase Documentation
- Next.js Documentation

---

**Version:** 1.0.0  
**Last Updated:** June 2026  
**Status:** Active Development

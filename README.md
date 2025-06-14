# GrantMate Pro

A web-based SaaS tool designed to help freelance grant consultants and boutique firms accelerate and streamline the grant writing process with AI-assisted workflows.

## 🎯 Features

- **Homepage**: Clear product value proposition and demo CTA
- **Client Dashboard**: Manage multiple clients and associated applications
- **AI Application Writer**: Smart wizard that generates editable draft sections
- **Grant Finder**: AI-assisted grant discovery (coming soon)
- **Authentication**: Email/password + Google OAuth via Supabase
- **Responsive Design**: Clean, card-based layouts optimized for web

## 🧱 Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components inspired by shadcn/ui
- **Backend**: Supabase (PostgreSQL, auth, storage)
- **Routing**: React Router DOM
- **Auth**: Supabase Authentication

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd grantmate-pro
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎨 Design System

### Colors
- **Consultant Blue**: `#2D6CDF` - Primary brand color
- **Success Green**: `#5FD068` - Success states and positive actions
- **Background**: White and slate gray variants

### Typography
- **Font**: Inter (300, 400, 500, 600, 700 weights)
- Clean, readable typography optimized for professional use

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components
├── contexts/            # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component
```

## 🗄️ Data Model

### Core Entities

- **User**: Authentication and subscription management
- **Client**: Customer organizations and their details
- **Grant**: Funding opportunities and requirements
- **Application**: Grant applications with draft sections and status
- **DraftSection**: Individual sections of grant applications

## 🔐 Authentication

Built with Supabase Auth supporting:
- Email/password authentication
- Google OAuth
- Session management
- Protected routes

## 📝 Development Roadmap

### MVP (Phase 1)
- [x] Project setup and basic structure
- [x] Homepage with clear value proposition
- [x] Authentication system
- [ ] Client dashboard
- [ ] AI Application Writer wizard
- [ ] Export functionality

### V1 (Phase 2)
- [ ] Freemium model with Stripe integration
- [ ] Grant Finder feature
- [ ] Advanced client management

### V2 (Phase 3)
- [ ] Client collaboration portal
- [ ] Team features for larger firms
- [ ] Advanced AI capabilities

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

---

**GrantMate Pro** - Transforming grant writing through AI-powered assistance.

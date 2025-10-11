# Personal Portfolio Website

A sophisticated, responsive portfolio website built with Nuxt 3, Vue.js, and Tailwind CSS. This modern web application showcases my software development projects, professional experience, and technical skills with an elegant, user-friendly interface optimized for all devices.

## 🌟 Features

### 📱 **Mobile-First Design**

- Fully responsive layout optimized for desktop, tablet, and mobile devices
- Touch-friendly navigation with swipe gestures for mobile menu
- Sliding mobile panels and optimized component layouts
- Native app-like user experience on mobile devices

### 🌐 **Multilingual Support**

- Complete English and Spanish translations
- Dynamic language switching with persistent state
- Localized content for projects, skills, and personal information
- SEO-optimized multilingual routing

### 🎨 **Advanced UI/UX**

- Modern gradient backgrounds and smooth animations
- Interactive project galleries with modal image viewing
- Scroll-based animations and smooth section transitions
- Professional typography and consistent design system

### 📂 **Comprehensive Project Showcase**

- Detailed project pages with overview, features, and tech stack
- High-quality project galleries with multiple screenshots
- Direct links to GitHub repositories and live demonstrations
- Featured projects section with expandable project collections

### 👨‍💻 **Professional Resume Section**

- Interactive resume with expandable experience details
- Skills section with technology icons and proficiency indicators
- Education section with degree details and certifications
- Downloadable resume functionality

### 📧 **Contact & Communication**

- Server-side contact form with rate limiting and validation
- Professional contact information display
- Social media and professional network links
- Responsive contact section with modern styling

## 🛠 Tech Stack

### **Core Framework**

- **[Nuxt 3](https://nuxt.com)** - Full-stack Vue.js framework
- **[Vue 3](https://vuejs.org)** - Progressive JavaScript framework with Composition API
- **[TypeScript](https://typescriptlang.org)** - Type-safe development

### **Styling & UI**

- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **Custom CSS Animations** - Smooth transitions and hover effects
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### **State Management**

- **[Pinia](https://pinia.vuejs.org)** - Intuitive state management
- **[Pinia Persisted State](https://github.com/prazdevs/pinia-plugin-persistedstate)** - Persistent language preferences

### **Development Tools**

- **[ESLint](https://eslint.org)** - Code linting and formatting
- **[Vite SVG Loader](https://github.com/jpkleemans/vite-svg-loader)** - SVG icon integration
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

### **Backend Features**

- **Server API Routes** - Contact form processing with validation
- **[Rate Limiter Flexible](https://github.com/animir/node-rate-limiter-flexible)** - API rate limiting and spam protection

### **Performance & SEO**

- **Nuxt 3 Optimizations** - Auto-imports, code splitting, and tree shaking
- **Image Optimization** - Cloudinary integration for responsive images
- **SEO Meta Tags** - Dynamic meta information for all pages

## 📁 Project Structure

```text
portfolio/
├── components/          # Reusable Vue components
│   ├── Contact.vue     # Contact form and information
│   ├── Hero.vue        # Landing page hero section
│   ├── NavBar.vue      # Navigation with mobile menu
│   ├── Project*.vue    # Project showcase components
│   ├── Resume*.vue     # Resume section components
│   └── Skills.vue      # Skills and technologies display
├── pages/              # Nuxt 3 file-based routing
│   ├── index.vue       # Home page
│   ├── about.vue       # About me page
│   ├── resume.vue      # Professional resume
│   └── projects/       # Project pages
├── locales/            # Internationalization
│   ├── en.json         # English translations
│   └── es.json         # Spanish translations
├── composables/        # Vue composables
├── stores/             # Pinia state stores
├── server/             # API routes
└── assets/             # Static assets and styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/natelandrum/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Build for production**

   ```bash
   pnpm build
   ```

## 🌍 Deployment

This portfolio is optimized for deployment on modern hosting platforms:

- **Vercel** (recommended) - Zero-config deployment
- **Netlify** - Static site generation support
- **Railway** - Full-stack deployment with server API routes

## 📄 License

MIT [License](LICENSE) - feel free to use this project as inspiration for your own portfolio!

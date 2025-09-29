# ASDF Studio Backend

> Creative studio showcase platform with integrated admin system - Portfolio and project management

[![Next.js](https://img.shields.io/badge/Next.js-13.1-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Commercial](https://img.shields.io/badge/License-Commercial-orange.svg)](LICENSE)
[![Live](https://img.shields.io/badge/Live-asdfstudio.com-success.svg)](https://asdfstudio.com/)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Build & Deployment](#build--deployment)
- [Team](#team)
- [License](#license)

## 🎯 About

**ASDF Studio Admin** is a creative Admin panel that can manage the portfolio system. Built with ReactJS, it provides a dynamic platform for displaying projects, managing content, and showcasing creative work with optimal performance and analytics.

Visit the live platform at **[admin.asdfstudio.com](https://admin.asdfstudio.com/)**

Developed by **ASDF Studio**, this platform serves as both a portfolio showcase and an internal project management system.

## ✨ Features

- **Admin System**: Integrated content management and control
- **SEO Optimized**: Automatic sitemap generation with next-sitemap
- **Responsive Design**: Mobile-first, optimized for all devices
- **Smooth Animations**: React Scroll for seamless navigation
- **Carousel Support**: Slick carousel for media galleries
- **State Management**: Redux Toolkit for efficient state handling
- **Icon Library**: Font Awesome integration for extensive iconography
- **UI Components**: Ant Design for professional UI elements
- **Image Optimization**: Sharp for fast image processing
- **Static Export**: Support for static site generation

## 🛠️ Tech Stack

### Core
- **Frontend**: [React](https://reactjs.org/) 18.2

### UI & Components
- **UI Library**: [Ant Design](https://ant.design/) 5.3.2
- **Icons**: [Font Awesome](https://fontawesome.com/) 6.4.0
- **Carousel**: [React Slick](https://react-slick.neostack.com/) 0.29.0
- **Scroll**: [React Scroll](https://www.npmjs.com/package/react-scroll) 1.8.9

### State Management
- **Redux**: [Redux Toolkit](https://redux-toolkit.js.org/) 1.9.5
- **Middleware**: [Redux Thunk](https://github.com/reduxjs/redux-thunk) 2.4.2
- **DevTools**: Redux DevTools Extension 2.13.9

### Utilities
- **HTTP Client**: [Axios](https://axios-http.com/) 1.5.0
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) 0.32.0
- **SEO**: [next-sitemap](https://www.npmjs.com/package/next-sitemap) 4.0.7

### Development
- **CSS Processing**: [PostCSS](https://postcss.org/) 8.4.21, [Autoprefixer](https://github.com/postcss/autoprefixer) 10.4.13
- **Linting**: [ESLint](https://eslint.org/) 8.31.0 with Next.js config

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js**: Version 16.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Latest version (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

Optional:
- **VS Code**: Recommended code editor with TypeScript support

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ASDF-Studio/asdf-web.git
   cd asdf-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure all required environment variables.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🏃 Running the Application

### Development Mode

```bash
# Start development server
npm run dev

# Access at http://localhost:3000
```


## 🏗️ Project Structure

```
├── server.js                 # Application entry point
├── package.json              # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── README.md                # This file
│
│
├── controllers/             # Route controllers
│   ├── authController.js    # Authentication logic
│   ├── noteController.js    # Note generation logic
│   ├── paymentController.js # Payment processing
│   ├── userController.js    # User management
│   └── patientController.js # Patient management
│
├── middleware/              # Custom middleware
│   ├── auth.js              # Authentication middleware
│   ├── errorHandler.js      # Error handling
│   ├── validation.js        # Input validation
│   ├── rateLimiter.js       # Rate limiting
│   └── security.js          # Security headers
│
├── models/                  # Mongoose models
│   ├── User.js              # User schema
│   ├── Note.js              # Note schema
│   ├── Patient.js           # Patient schema
│   ├── Session.js           # Session schema
│   └── Subscription.js      # Subscription schema
│
├── routes/                  # API routes
│   ├── auth.js              # Authentication routes
│   ├── notes.js             # Note management routes
│   ├── payments.js          # Payment routes
│   ├── users.js             # User routes
│   └── patients.js          # Patient routes
│
├── utils/                   # Utility functions
│   ├── helpers.js           # Common helpers
│   ├── validators.js        # Validation functions
│   ├── encryption.js        # Data encryption
│   └── logger.js            # Logging utility
│
├── uploads/                 # File uploads directory
├── logs/                    # Application logs
└── tests/                   # Test files (future)
    ├── auth.test.js
    ├── notes.test.js
    └── payments.test.js
```


## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run export           # Build and export static site
npm run lint             # Run ESLint
```

### Additional Commands

```bash
# Type checking
npx tsc --noEmit

# Clean build cache
rm -rf .next

# Update dependencies
npm update
```

## 🚀 Build & Deployment

### Production Build

```bash
# Create optimized production build
npm run build
```

This creates an optimized `.next` folder and generates sitemap automatically.

### Static Export

```bash
# Export as static site
npm run export
```

Output will be in the `out` directory.

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Static Hosting
Use the `npm run export` command and deploy the `out` folder to any static hosting service.

### Environment Variables

Required environment variables for production:
- API endpoints
- Admin authentication credentials
- Analytics IDs
- External service API keys

## ⚡ Performance

### Optimization Features

- **Next.js 13**: Optimized routing and rendering
- **Image Optimization**: Built-in Next.js Image component with Sharp
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for faster loading
- **Sitemap Generation**: Automatic sitemap for better SEO
- **TypeScript**: Type safety for better performance
- **Lazy Loading**: Components loaded on demand

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🎨 Styling

### Tailwind CSS

Modern utility-first CSS framework with:
- Responsive design utilities
- Custom theme configuration
- Component-based styling

### Ant Design

Professional UI component library providing:
- Pre-built components
- Consistent design system
- Accessibility features

## 🔐 Security

### Security Features

- **Admin Authentication**: Secure admin panel access
- **Environment Variables**: Secure credential storage
- **HTTPS**: Secure data transmission
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery protection

### Best Practices

1. Keep dependencies up to date
2. Use environment variables for secrets
3. Enable HTTPS in production
4. Implement proper error boundaries
5. Regular security audits
6. Monitor for vulnerabilities

## 📄 License

This project is proprietary software owned by **ASDF Studio**. All rights reserved.

**© 2025 ASDF Studio.**

This software and its documentation are proprietary to ASDF Studio and are protected by copyright law. Unauthorized copying, distribution, or modification is strictly prohibited.

## 👥 Team

**Developed by Airly Studio**

- **[Taraqul Islam Rony](https://github.com/TIRony)** - *Senior Full Stack Engineer*
- **[Sakil Sazzad Joy](https://github.com/ss-joy)** - *Full Stack Engineer*
- **[Shams Shahriar Bhuiyan](https://github.com/Shams000)** - *Developer*

## 🙏 Acknowledgments

- Next.js team for the powerful framework
- Ant Design team for UI components
- Redux team for state management
- Open source community for libraries

## 📞 Support & Contact

- **Website**: [asdfstudio.com](https://asdfstudio.com/)
- **Company**: ASDF Studio
- **Email**: hello@asdfstudio.com

For platform support, technical assistance, or project inquiries, contact our development team.

---

⭐ **Showcasing Creative Excellence | Built with precision by ASDF Studio**


POST http://localhost:3000/api/sign-up
Content-Type: application/json

{
  "email": "tester3",
  "password": "123456",
  "retypePassword": "123456"
}

###

POST http://localhost:3000/api/login
Content-Type: application/json

{
  "email": "tester3",
  "password": "123456"
}

###

GET http://localhost:3000/api/secret-route
Authorization: Bearer eyhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxvcmVueiIsInVzZXJJZCI6IjFhODNiZGFiLTJmNDYtNGJhNC05MjJmLTkyYWRiYTI5ODk4NCIsImlhdCI6MTY4NDM5MDUzOCwiZXhwIjoxNjg0OTk1MzM4fQ.YjM-W3dk7XaqHXX2ZgVj2v94UWrNEuRyEh0mTpE5NFA

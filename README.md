# HBPlus Secure Staff Portal

A professional, minimalist, and secure web-first portal built for **HBPlus** fitness company as part of the internship assignment. The application ensures secure access through strict corporate domain restrictions, Role-Based Access Control (RBAC), and Google OAuth authentication.

---

## 🚀 Live Demo & Repository

- **Live Deployment:** [https://hbplusss.netlify.app/](https://hbplusss.netlify.app/)
- **GitHub Repository:** [https://github.com/AdityaKR555/hbplus-assessment](https://github.com/AdityaKR555/hbplus-assessment)

---

## 🛠️ Technology Stack

- **Frontend Framework:** React Native (Expo Router) for cross-platform web capabilities.
- **Authentication:** Firebase Auth with Google OAuth 2.0 (Email domain restriction to `@hbplus.fit`).
- **Database & Persistence:** Google Cloud Firestore (User profiles and session tracking).
- **Styling:** Custom responsive design with a minimalist dark theme.
- **Deployment & Hosting:** Netlify.

---

## 🛡️ Key Features & Security Architecture

### 1. Corporate Domain Restriction (`@hbplus.fit`)

- **Client-Side Guard:** Validates user email addresses immediately upon Google sign-in.
- **Server-Side Enforcement:** Unauthenticated or unauthorized email domains (e.g., standard `@gmail.com`) are automatically intercepted, signed out, and denied access.

### 2. Role-Based Access Control (RBAC)

- Dynamically assigns user privileges based on email identifiers:
  - **Admin:** Accounts prefixed with `admin` receive elevated management privileges and dashboard badges.
  - **Member/User:** Standard `@hbplus.fit` staff accounts receive member dashboard access.

### 3. Persistent Firestore Synchronization

- Automatically synchronizes user profile metadata (UID, display name, email, avatar, and role) into the Firestore `users` collection upon successful authentication.

---

## 📁 Project Structure

```text
hbplus-portal/
├── assets/
│   └── images/               # App icons and branding assets
├── src/
│   ├── app/
│   │   ├── _layout.tsx       # Root layout with AuthProvider & Expo Router Stack
│   │   ├── index.tsx         # Public landing page & authentication entry
│   │   ├── login.tsx         # Google OAuth login interface
│   │   └── dashboard.tsx     # Protected RBAC staff dashboard
│   ├── context/
│   │   └── AuthContext.tsx   # Global authentication state & Firestore sync
│   └── services/
│       └── firebase.ts       # Firebase initialization & configuration
├── app.json                  # Expo project configuration
├── package.json              # Project dependencies & scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation

```

# ⚙️ Local Development Setup

## 1. Prerequisites

- Node.js (v18.x or later)

- npm or yarn

## 2. Installation

- Clone the repository and install dependencies:

- git clone https://github.com/your-username/hbplus-auth.git
- cd hbplus-assessment
- npm install

## 3. Environment Configuration

- Create a .env file in the root directory and supply your Firebase web project credentials:

  EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
  EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

## 4. Running Locally

- Start the development server for web:

- npx expo start -c --web

- Open http://localhost:8081 in your browser.

# Personal Portfolio Showcase Website

A production-ready personal portfolio built with Next.js App Router, Tailwind CSS, Shadcn UI, and Firebase.

## Features
- **Public Portfolio:** Clean, minimal, and fast UI to showcase your work, resume, and skills.
- **Admin Dashboard:** Secure area to manage your projects, categories, and profile information.
- **Firebase Backend:** Leverages Firestore for data and Firebase Storage for files.
- **Authentication:** Firebase Authentication for secure admin login.

---

## 1. Project Setup

**Prerequisites:** Node.js 18+ and npm installed.

1. Clone the repository or navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 2. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database** (Start in production mode or update rules later).
3. Enable **Firebase Storage**.
4. Enable **Authentication** and add the **Email/Password** provider.
5. In Project Settings, add a Web App and copy the Firebase configuration.

---

## 3. Environment Variables

Create a `.env.local` file in the root of the project by copying the provided `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the variables using your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

---

## 4. Admin Account Setup

Since this is a personal portfolio, you only need one admin account.
1. Go to your Firebase Console -> Authentication.
2. Click "Add user" and enter your admin email and password.
3. This email and password will be used to log in at `/admin/login`.
4. (Optional) In Firestore, create a `users` collection, add a document with the UID of the user you just created, and set `role: "admin"`.

---

## 5. Vercel Deployment Steps

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your GitHub repository.
4. In the Environment Variables section, add all the variables from your `.env.local` file.
5. Click **Deploy**.

*(Note: Vercel Analytics is already installed via `@vercel/analytics`. Once deployed on Vercel, enable the Analytics tab in the Vercel Dashboard.)*

---

## 6. Firestore Rules

Apply these rules in your Firebase Console -> Firestore Database -> Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null; // Restrict this further using custom claims if needed
    }

    match /projects/{project} {
      allow read: if resource.data.isPublished == true || isAdmin();
      allow write: if isAdmin();
    }
    
    // Allow public read, admin write for other collections
    match /{collection}/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

---

## 7. Firebase Storage Rules

Apply these rules in your Firebase Console -> Storage -> Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isAdmin() {
      return request.auth != null;
    }

    match /{allPaths=**} {
      allow read: if true;
      allow write, delete: if isAdmin();
    }
  }
}
```

---

## 8. Folder Structure Explanation

This project follows a **Feature-Based Architecture**:

- `/src/app` - Next.js App Router (Public and Admin routes).
- `/src/components` - Shared UI components (Shadcn) and Layouts.
- `/src/features` - Feature-specific modules (auth, projects, etc.). Each feature contains its own `components`, `hooks`, `schemas`, and `services`.
- `/src/lib` - Core libraries and integrations (e.g., Firebase client, Utils).
- `/src/store` - Zustand global state stores (e.g., Auth Store).
- `/src/utils` - Helper functions and the database seeding script (`seed.ts`).

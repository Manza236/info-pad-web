# 📓 Info Pad

**Info Pad** is a premium, web-based note-taking application designed for modern thinkers. Capture your thoughts with a sleek glassmorphic interface, sync them in real-time, and share your wisdom with the world.

![Info Pad Preview](https://img.shields.io/badge/UI-Glassmorphism-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node%20%7C%20Firebase-orange?style=for-the-badge)

## ✨ Features

- **🎨 Premium Aesthetics**: A stunning dark-mode interface using modern glassmorphism and smooth animations.
- **🔐 Google Authentication**: Secure and easy login with your Google account.
- **⚡ Real-time Sync**: Your notes are saved and synced instantly across all devices using Firebase Firestore.
- **🤝 Seamless Sharing**: Share notes directly with other users via their email address.
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile screens.

## 🚀 Technical Stack

- **Frontend**: React (Vite), Framer Motion, Lucide Icons, Vanilla CSS.
- **Backend**: Node.js, Express.
- **Cloud**: Firebase (Auth, Firestore, Admin SDK).

## 🛠️ Installation & Setup

### 1. Prerequisite: Firebase Project
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Google Provider).
3. Enable **Firestore Database** and use the rules provided in `firestore.rules`.
4. Create a **Web App** in settings and copy your config.

### 2. Clone and Install
```bash
git clone https://github.com/Manza236/info-pad-web.git
cd info-pad-web
```

### 3. Frontend Setup
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory and add your Firebase config (see `.env.example`).
```bash
npm run dev
```

### 4. Backend Setup
```bash
cd ../server
npm install
node index.js
```

## 🔒 Security Rules
The database is protected by custom Firestore Security Rules. Only the owner of a note can edit or delete it, while shared users are granted read-only access.

## 📄 License
MIT License. Feel free to use and modify for your own projects!

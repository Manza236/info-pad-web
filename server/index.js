const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
// You'll need to download your service account key from Firebase Console
// and place it in the server directory as serviceAccountKey.json
try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin Initialized");
} catch (error) {
  console.warn("Firebase Admin NOT initialized. Please add serviceAccountKey.json");
}

app.get('/', (req, res) => {
  res.send('Info Pad Backend Running');
});

// Endpoint to find user by email (for sharing)
app.get('/api/users/search', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).send('Email is required');

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.json({
      uid: userRecord.uid,
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      email: userRecord.email
    });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      res.status(404).send('User not found');
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

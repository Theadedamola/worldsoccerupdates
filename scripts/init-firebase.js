import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Initialize admin users
const admins = [
  { username: 'admin1', password: 'admin123', isAdmin: true },
  { username: 'admin2', password: 'admin456', isAdmin: true },
  { username: 'admin3', password: 'admin789', isAdmin: true },
]

const initializeData = async () => {
  try {
    // Add all admin users
    for (const admin of admins) {
      await addDoc(collection(db, 'users'), {
        ...admin,
        createdAt: new Date().toISOString(),
      })
    }

    console.log('Firebase initialized with admin users and nominees')
  } catch (error) {
    console.error('Error initializing Firebase:', error)
  }
}

initializeData()

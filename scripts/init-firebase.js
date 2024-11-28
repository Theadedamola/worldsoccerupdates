import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAoTnTC-bkM06QAoQO5Fx3G7KREVV2oJu4',
  authDomain: 'voting-app-f9fde.firebaseapp.com',
  projectId: 'voting-app-f9fde',
  storageBucket: 'voting-app-f9fde.firebasestorage.app',
  messagingSenderId: '1001743771594',
  appId: '1:1001743771594:web:8a5d1d8c9642bd10a49133',
  measurementId: 'G-JHK73635ER',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize users
const users = [
  // Regular users
  { username: 'john', isAdmin: false },
  { username: 'jane', isAdmin: false },
  { username: 'bob', isAdmin: false },
  { username: 'alice', isAdmin: false },
  { username: 'charlie', isAdmin: false },
  // Admin users
  { username: 'admin1', password: 'admin123', isAdmin: true },
  { username: 'admin2', password: 'admin456', isAdmin: true },
  { username: 'admin3', password: 'admin789', isAdmin: true }
];

// Initialize nominees
const nominees = [
  { category: 'most-active', name: 'John Doe', description: 'Consistently contributes to discussions' },
  { category: 'most-active', name: 'Jane Smith', description: 'Regular participant in community events' },
  { category: 'best-contributor', name: 'Bob Wilson', description: 'Quality code contributions' },
  { category: 'best-contributor', name: 'Alice Brown', description: 'Innovative solution provider' },
  { category: 'best-helper', name: 'Charlie Davis', description: 'Always helps newcomers' },
  { category: 'best-helper', name: 'Eva Martinez', description: 'Detailed problem solver' },
  { category: 'rising-star', name: 'David Kim', description: 'Rapid growth in contributions' },
  { category: 'rising-star', name: 'Sarah Johnson', description: 'Emerging community leader' }
];

const initializeData = async () => {
  try {
    // Add all users
    for (const user of users) {
      await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: new Date().toISOString()
      });
    }

    // Add nominees
    for (const nominee of nominees) {
      await addDoc(collection(db, 'nominees'), nominee);
    }

    console.log('Firebase initialized with users and nominees');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

initializeData();
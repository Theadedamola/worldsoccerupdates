import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';



// Initialize admin users
const admins = [
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

export const initializeFirebaseData = async () => {
  try {
    // Check if data already exists
    const usersRef = collection(db, 'users');
    const adminQuery = query(usersRef, where('isAdmin', '==', true));
    const adminSnapshot = await getDocs(adminQuery);

    if (adminSnapshot.empty) {
      // Add admin users
      for (const admin of admins) {
        await addDoc(collection(db, 'users'), {
          ...admin,
          createdAt: new Date().toISOString()
        });
      }

      // Add nominees
      for (const nominee of nominees) {
        await addDoc(collection(db, 'nominees'), nominee);
      }

      console.log('Firebase initialized with admin users and nominees');
    } else {
      console.log('Firebase data already initialized');
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};
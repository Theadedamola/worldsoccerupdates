import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export { db };
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export const submitVote = async (category: string, nomineeId: string, username: string) => {
  try {
    // Check if user has already voted in this category
    const votesRef = collection(db, 'votes');
    const q = query(votesRef, 
      where('category', '==', category),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error('Already voted in this category');
    }

    // Record the vote
    await addDoc(collection(db, 'votes'), {
      category,
      nomineeId,
      username,
      createdAt: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
};

export const getNomineesByCategory = async (category: string) => {
  try {
    const nomineesRef = collection(db, 'nominees');
    const q = query(nomineesRef, where('category', '==', category));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting nominees:', error);
    throw error;
  }
}; 
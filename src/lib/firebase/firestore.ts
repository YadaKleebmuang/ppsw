import { db } from './client';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';

export const getDocument = async <T = DocumentData>(collectionName: string, id: string): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
};

export const getDocuments = async <T = DocumentData>(
  collectionName: string, 
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  const collRef = collection(db, collectionName);
  const q = query(collRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
};

export const createDocument = async (collectionName: string, id: string, data: Record<string, unknown>) => {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  return id;
};

export const updateDocument = async (collectionName: string, id: string, data: Record<string, unknown>) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

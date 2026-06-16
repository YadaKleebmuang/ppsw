import { auth } from './client';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return firebaseSignOut(auth);
};

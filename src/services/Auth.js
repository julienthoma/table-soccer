import { auth } from 'firebase';

export const login = () => {
  const provider = new auth.GoogleAuthProvider();
  auth().signInWithPopup(provider);
};

export const logout = () => {
  auth().signOut();
};

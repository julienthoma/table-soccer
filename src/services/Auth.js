import { auth } from 'firebase';

export const login = () => {
  const provider = new auth.GoogleAuthProvider();
  auth().signInWithRedirect(provider);
};

export const logout = () => auth().signOut();

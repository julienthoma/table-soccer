import firebase from './firebase';

export const login = () => {
  const provider = new auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export const logout = () => firebase.auth().signOut();

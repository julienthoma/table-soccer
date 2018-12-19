import firebase from 'firebase/app';
import firebaseApp from './firebase';

export const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseApp.auth().signInWithRedirect(provider);
};

export const logout = () => firebaseApp.auth().signOut();

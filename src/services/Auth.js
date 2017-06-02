import firebase from 'firebase';

export const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export const logout = () => {
  firebase.auth().signOut();
}
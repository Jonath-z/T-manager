import firebaseConfig from './config';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const signInwithPopup = async () =>
  await auth.signInWithPopup(provider);

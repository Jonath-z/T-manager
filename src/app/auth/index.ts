import firebaseConfig from './config';
import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth';
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();

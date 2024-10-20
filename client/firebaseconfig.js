import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-ZU7Zrr6P4hs-CLwHrwx-k5wbsW3YfXo",
  authDomain: "nscproject-d5898.firebaseapp.com",
  projectId: "nscproject-d5898",
  storageBucket: 'nscproject-d5898.appspot.com',
  messagingSenderId: '512508273400',
  appId: '1:512508273400:android:305bad5c3b2a15b829510d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
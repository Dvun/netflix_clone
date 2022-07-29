import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDMIl3t8bdLi-cTHW3ivhhkqvwq3oK1u3o",
  authDomain: "netflix-clone-5e5f6.firebaseapp.com",
  projectId: "netflix-clone-5e5f6",
  storageBucket: "netflix-clone-5e5f6.appspot.com",
  messagingSenderId: "144737250574",
  appId: "1:144737250574:web:edd218feeba9bb69653b5f"
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore();
export const auth = getAuth(app);

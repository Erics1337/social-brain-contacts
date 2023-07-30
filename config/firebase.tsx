import { initializeApp } from 'firebase/app';
import { initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

import Constants from 'expo-constants';

// add firebase config
const firebaseConfig = {
  apiKey: Constants?.expoConfig?.extra?.apiKey,
  authDomain: Constants?.expoConfig?.extra?.authDomain,
  projectId: Constants?.expoConfig?.extra?.projectId,
  storageBucket: Constants?.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants?.expoConfig?.extra?.messagingSenderId,
  appId: Constants?.expoConfig?.extra?.appId,
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize firestore
const db = getFirestore(app);

// initialize auth
const auth = initializeAuth(app);

export { auth, db };

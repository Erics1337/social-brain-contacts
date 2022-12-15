// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBYiwcsUkYBMrgi8szewnNe1ZHLLZfdHXM',
	authDomain: 'fireship-lessons-8324d.firebaseapp.com',
	projectId: 'fireship-lessons-8324d',
	storageBucket: 'fireship-lessons-8324d.appspot.com',
	messagingSenderId: '412753396653',
	appId: '1:412753396653:web:ee6eff7abab293abbc9724',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };

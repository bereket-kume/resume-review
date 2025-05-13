import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCJBjcKYRKubCYZ85okFCQJVyqo_GD2VzY",
  authDomain: "nest-auth-ebc26.firebaseapp.com",
  projectId: "nest-auth-ebc26",
  storageBucket: "nest-auth-ebc26.firebasestorage.app",
  messagingSenderId: "494167958012",
  appId: "1:494167958012:web:9cf92b3961d4990b6bd279",
  measurementId: "G-5CK64PVLWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
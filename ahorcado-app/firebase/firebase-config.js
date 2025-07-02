// firebase/firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: "AIzaSyDSPL3JnMvV1fCwohj2dwhqKH9Vt9SbHno",
  authDomain: "ahorcado-61eb7.firebaseapp.com",
  projectId: "ahorcado-61eb7",
  storageBucket: "ahorcado-61eb7.firebasestorage.app",
  messagingSenderId: "195463021161",
  appId: "1:195463021161:web:71569b5d6455dc790d18f8",
  measurementId: "G-F6C3Q5FZEM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db };

import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBewqx03O7MTv4OY_bkJ42XiRIECDG9KPk",
  authDomain: "challenge-tugerente.firebaseapp.com",
  databaseURL: "https://challenge-tugerente-default-rtdb.firebaseio.com",
  projectId: "challenge-tugerente",
  storageBucket: "challenge-tugerente.appspot.com",
  messagingSenderId: "979434469545",
  appId: "1:979434469545:web:4913f10c6a3f3152dcd1b8"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getDatabase, ref, set } from "firebase/database";
import { 
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail, 
  signOut,
} from 'firebase/auth'

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxbvwkfCXQdptqpkqAJ_m3mmK60n0IndU",
  authDomain: "gamelist-abeac.firebaseapp.com",
  projectId: "gamelist-abeac",
  storageBucket: "gamelist-abeac.appspot.com",
  messagingSenderId: "983545049598",
  appId: "1:983545049598:web:b8ffc79f09dfbdd0d210af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Configurar os serviços do Firebase que você deseja usar
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res.id);
    return res.user;
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res.id);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err) {
    throw Error(err);
  }
};

const addFavMovie = async (userId, title) => {
  const citiesRef = collection(db, "users");
  console.log(userId);
  const q = query(citiesRef, where('uid', '==', userId.uid));
  const querySnapshot = await getDocs(q);
  let id = 0;
  let gamesList=[];
  querySnapshot.forEach((doc) => {
    gamesList = doc.data().favGames;
    id = doc.id;
  });
  gamesList = [...gamesList, title];
  const washingtonRef = doc(db, "users", id);
  try {
    await updateDoc(washingtonRef, {
      favGames: [...new Set(gamesList)],
    });
  } catch (err) {
    throw Error(err);
  }
}

const getFavGames = async (userId) => {
  const citiesRef = collection(db, "users");
  const q = query(citiesRef, where('uid', '==', userId.uid));
  const querySnapshot = await getDocs(q);
  let gamesList=[];
  querySnapshot.forEach((doc) => {
    gamesList = doc.data().favGames;
  });
  return gamesList;
}

export {
  auth,
  db,
  addFavMovie,
  getFavGames,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
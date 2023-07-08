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
    console.error('log in with email and password');
    throw Error(err);
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
    console.log('end')
  } catch (err) {
    console.log('register with email')
    throw Error(err);
  }
};

const addFavGame = async (userId, gameObject) => {
  console.log('ADD FAV GAME FOI CHAMADO UHUL')
  const gamesRef = collection(db, "users");
  console.log(userId, gameObject);
  const q = query(gamesRef, where('uid', '==', userId));
  const querySnapshot = await getDocs(q);
  let id = 0;
  let gamesList=[];
  querySnapshot.forEach((doc) => {
    gamesList = doc.data().favGames;
    id = doc.id;
  });
  if (gamesList) {
    if (!gamesList.some((x) => x.title === gameObject.title)) {
      gamesList = [...gamesList, gameObject];
    }
  } else {
    gamesList = [gameObject];
  }
  const washingtonRef = doc(db, "users", id);
  try {
    await updateDoc(washingtonRef, {
      favGames: gamesList,
    });
    return gamesList;
  } catch (err) {
    console.log('add fav game', userId, gameObject);
    throw Error(err);
  }
}

const getFavGames = async (userId) => {
  console.log('getfav', userId)
  const gamesRef = collection(db, "users");
  const q = query(gamesRef, where('uid', '==', userId));
  try {
    const querySnapshot = await getDocs(q);
    let gamesList=[];
    querySnapshot.forEach((doc) => {
      gamesList = doc.data().favGames;
    });
    return gamesList;
  } catch (err) {
    console.log('getFavGames', userId);
    throw Error(err);
  }
}

const logout = () => {
  signOut(auth);
};


const addRating = async (userId, gameObject) => {
  console.log('add rating', userId, gameObject)
  const gamesRef = collection(db, "users");
  console.log(userId, gameObject);
  const q = query(gamesRef, where('uid', '==', userId));
  const querySnapshot = await getDocs(q);
  let id = 0;
  let ratings=[];
  querySnapshot.forEach((doc) => {
    ratings = doc.data().ratings;
    id = doc.id;
  });
  if (ratings) {
    if (!ratings.some((x) => x.title === gameObject.title)) {
      ratings = [...ratings, gameObject];
    } else {
      const newRatins = ratings.map((x) => {
        if (x.title === gameObject.title) {
          x.stars = gameObject.stars;
        }
        return x;
      })
      ratings = newRatins;
      console.log(newRatins, ratings);
    }
  } else {
    ratings = [gameObject];
  }
  const washingtonRef = doc(db, "users", id);
  try {
    await updateDoc(washingtonRef, {
      ratings,
    });
    console.log(gameObject);
    const res = await getFavGames(userId);
    if (res.some((x) => x.title === gameObject.title)) {
      await updateDoc(washingtonRef, {
        favGames: res.map((x) => {
          if (x.title === gameObject.title) {
            x.stars = gameObject.stars;
          }
          return x;
        }),
      });
    }
    return ratings;
  } catch (err) {
    console.log('add rating', userId, gameObject)
    throw Error(err);
  }
}


const getRatins = async (userId) => {
  console.log("getratings", userId)
  const gamesRef = collection(db, "users");
  const q = query(gamesRef, where('uid', '==', userId));
  try {
    const querySnapshot = await getDocs(q);
    let ratings=[];
    querySnapshot.forEach((doc) => {
      ratings = doc.data().ratings;
    });
    return ratings;
  } catch (err) {
    console.log('Get Ratings', userId)
    throw Error(err);
  }
}


export {
  auth,
  db,
  logout,
  addRating,
  addFavGame,
  getRatins,
  getFavGames,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
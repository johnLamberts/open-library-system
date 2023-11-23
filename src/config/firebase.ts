import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIITHS1HmqkFhbx8Xa50k2s0a9faXZ-WY",
  authDomain: "mock-app-7f7f4.firebaseapp.com",
  projectId: "mock-app-7f7f4",
  storageBucket: "mock-app-7f7f4.appspot.com",
  messagingSenderId: "869316601262",
  appId: "1:869316601262:web:d2bc1c881d8216018b543f",
  measurementId: "G-VGBSSGKQFV",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export { app, auth, firestore, storage };

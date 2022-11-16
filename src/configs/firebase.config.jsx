import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhenfOpJRgC7jjbf84MSjO6x6NZct4B5Y",
  authDomain: "furniture-a5b70.firebaseapp.com",
  projectId: "furniture-a5b70",
  storageBucket: "furniture-a5b70.appspot.com",
  messagingSenderId: "710051304108",
  appId: "1:710051304108:web:06b4f41f78e778313c8509",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDezgAUxT_14dfBObnBEoDv7-Fb0jXLPdg",
  authDomain: "hwitter-reloaded-6be5b.firebaseapp.com",
  projectId: "hwitter-reloaded-6be5b",
  storageBucket: "hwitter-reloaded-6be5b.firebasestorage.app",
  messagingSenderId: "89682586837",
  appId: "1:89682586837:web:715abf659eb6cfdd65865c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
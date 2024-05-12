import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFOoqKnTsipjqH2cXOS__T609IzpXKEpE",
  authDomain: "ttcs-v2.firebaseapp.com",
  databaseURL:
    "https://ttcs-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ttcs-v2",
  storageBucket: "ttcs-v2.appspot.com",
  messagingSenderId: "148266489126",
  appId: "1:148266489126:web:4dae4ae185ea673f1e5de7",
  measurementId: "G-FD3PZSWW9L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database, app };

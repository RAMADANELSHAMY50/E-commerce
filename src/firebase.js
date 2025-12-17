import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR2Vi43awneSKvDJFlhSOS9C3rVo-jC14",
  authDomain: "fire-beeb1.firebaseapp.com",
  databaseURL: "https://fire-beeb1-default-rtdb.firebaseio.com",
  projectId: "fire-beeb1",
  storageBucket: "fire-beeb1.firebasestorage.app",
  messagingSenderId: "949309883671",
  appId: "1:949309883671:web:b60f7df334584e0d7da352"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

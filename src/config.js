import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAFn9Dg17XWUdO2uAFy3_CJPYcKA3BkCTU",
  authDomain: "techshop-test-2024.firebaseapp.com",
  projectId: "techshop-test-2024",
  storageBucket: "techshop-test-2024.appspot.com",
  messagingSenderId: "449254518289",
  appId: "1:449254518289:web:0a8571ec4414693e428bb0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
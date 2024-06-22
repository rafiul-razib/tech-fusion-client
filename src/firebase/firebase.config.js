// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCd1il9paYkGVS8psZR8l6KXL-mFy2PD3Y",
  // authDomain: "tech-fusion-194e6.firebaseapp.com",
  // projectId: "tech-fusion-194e6",
  // storageBucket: "tech-fusion-194e6.appspot.com",
  // messagingSenderId: "1006681310614",
  // appId: "1:1006681310614:web:c1e59b37971e8364c009b7"

  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
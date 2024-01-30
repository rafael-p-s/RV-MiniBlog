// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbN5DXxmFPwGuEaVXUvLeev7bt9UJITn0",
  authDomain: "miniblog-5279d.firebaseapp.com",
  projectId: "miniblog-5279d",
  storageBucket: "miniblog-5279d.appspot.com",
  messagingSenderId: "345311573417",
  appId: "1:345311573417:web:a6aeb2bd341716ecd100b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db}

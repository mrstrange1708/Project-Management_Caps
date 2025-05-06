import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyBDBUNOShEKKbb7JpuVVF0bmVAA2cYKogc",
  authDomain: "task-flow-66114.firebaseapp.com",
  projectId: "task-flow-66114",
  storageBucket: "task-flow-66114.appspot.com",
  messagingSenderId: "1017748893135",
  appId: "1:1017748893135:web:c9de1e83c2b3ed4410b6ba",
  measurementId: "G-ML78SNPHEC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 
const provider = new GoogleAuthProvider();
export { app, auth , provider};  

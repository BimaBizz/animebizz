import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCxHEhN8qNSZ-xnF2bKzhzZ4NLYAk18ud8",
    authDomain: "DILARANG ASAL COMOT-b65f0.firebaseapp.com",
    projectId: "DILARANG ASAL COMOT-b65f0",
    storageBucket: "DILARANG ASAL COMOT-b65f0.appspot.com",
    messagingSenderId: "681021886436",
    appId: "1:681021886436:web:1aeb53fc9baee7938481f1",
    measurementId: "G-G6E2W2KFZ8",
    databaseURL: "https://DILARANG ASAL COMOT-b65f0-default-rtdb.asia-southeast1.firebasedatabase.app",
  };
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({   
    prompt : "select_account "
  });
  const app = initializeApp(firebaseConfig);
  
  export const database = getDatabase(app);
  export const auth = getAuth(app);
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export default app;
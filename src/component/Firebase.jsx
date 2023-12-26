import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCxHEhN8qNSZ-xnF2bKzhzZ4NLYAk18ud8",
    authDomain: "animebizz-b65f0.firebaseapp.com",
    projectId: "animebizz-b65f0",
    storageBucket: "animebizz-b65f0.appspot.com",
    messagingSenderId: "681021886436",
    appId: "1:681021886436:web:1aeb53fc9baee7938481f1",
    measurementId: "G-G6E2W2KFZ8"
  };
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({   
    prompt : "select_account "
  });
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

  export default app;
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({   
    prompt : "select_account "
  });
  const app = initializeApp(firebaseConfig);
  
  export const database = getDatabase(app);
  export const auth = getAuth(app);
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export default app;
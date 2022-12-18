import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
      error: null,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const registerEmailPassword = async ({email, username, password}: {email: string, username: string, password: string}) => {
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = response.user;
    
    if(FirebaseAuth.currentUser) 
      await updateProfile(FirebaseAuth.currentUser, {displayName: username});

    return {
      ok: true,
      displayName: username,
      uid,
      email: response.user.email,
      photoURL,
      error: null,
    }

  } catch (error: any) {
    throw error;
    // return {
    //   ok: false,
    //   error: error.message || 'error',
    // }
  }
};


export const signInWithEmailPassword = async ({email, password}: {email: string, password: string}) => {

  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    return {
      ok: true,
      displayName: response.user.displayName,
      uid: response.user.uid,
      email: response.user.email,
      photoURL: response.user.photoURL,
      error: null
    }
  }
  catch (error) {
    throw error;
  }

}

export const logoutFirebase = async () => {
  await FirebaseAuth.signOut();
}
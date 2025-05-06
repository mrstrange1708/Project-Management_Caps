import { signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithPopup } from 'firebase/auth';



export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


export const registerUser = async (email, password, username) => {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    

    await updateProfile(userCredential.user, {
      displayName: username,
    });
  
    return userCredential; 
  };

  export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };


export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};
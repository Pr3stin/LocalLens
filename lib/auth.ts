import { auth, googleProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export function signupEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function loginGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logoutUser() {
  return signOut(auth);
}
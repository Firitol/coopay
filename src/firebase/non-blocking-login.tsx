
'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

/** Initiate anonymous sign-in. Returns a promise for handled feedback. */
export function initiateAnonymousSignIn(authInstance: Auth) {
  return signInAnonymously(authInstance);
}

/** Initiate email/password sign-up with optional display name. Returns a promise. */
export async function initiateEmailSignUp(authInstance: Auth, email: string, password: string, displayName?: string) {
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

/** Initiate email/password sign-in. Returns a promise. */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/** Initiate password reset. Returns a promise. */
export function initiatePasswordReset(authInstance: Auth, email: string) {
  return sendPasswordResetEmail(authInstance, email);
}

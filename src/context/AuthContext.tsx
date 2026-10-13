// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { Platform } from 'react-native';

const ALLOWED_DOMAIN = process.env.EXPO_PUBLIC_ALLOWED_DOMAIN;

export type UserRole = 'Admin' | 'User';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const saveUserToFirestore = async (firebaseUser: User) => {
    const email = firebaseUser.email || '';
    const role: UserRole = email.toLowerCase().startsWith('admin') ? 'Admin' : 'User';

    const userRef = doc(db, 'users', firebaseUser.uid);
    const profileData: UserProfile = {
      uid: firebaseUser.uid,
      email: email,
      displayName: firebaseUser.displayName || 'Team Member',
      photoURL: firebaseUser.photoURL || null,
      role: role,
      lastLogin: new Date().toISOString(),
    };

    await setDoc(userRef, profileData, { merge: true });
    setUserProfile(profileData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || '';
        if (email.endsWith(ALLOWED_DOMAIN)) {
          setUser(firebaseUser);
          try {
            await saveUserToFirestore(firebaseUser);
          } catch (dbError) {
            console.warn("Firestore error:", dbError);
          }
          setError(null);
        } else {
          await firebaseSignOut(auth);
          setUser(null);
          setUserProfile(null);
          setError(`Access restricted. Please login using your official domain email (${ALLOWED_DOMAIN}).`);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await signInWithPopup(auth, provider);
        const email = result.user.email || '';

        if (!email.endsWith(ALLOWED_DOMAIN)) {
          await firebaseSignOut(auth);
          setUser(null);
          setUserProfile(null);
          setError(`Access restricted. Please login using your official domain email (${ALLOWED_DOMAIN}).`);
        }
      } else {
        // Fallback for mobile / emulator testing before setting up native client IDs
        setError("Google Sign-In on mobile requires native client configuration. Please test on Web via 'npx expo start --web'.");
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, error, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
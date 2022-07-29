import React, { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import { IAuth } from '../types/types';

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  isLoading: false,
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error] = useState(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(true);
        router.push('/login');
      }
      setInitialLoading(false);
    })
  }, [auth])

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => setUser(null))
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const memoValues = useMemo(() => ({
      user, signUp, signIn, error, isLoading, logout
  }),[user, isLoading, error])

  return (
    // @ts-ignore
    <AuthContext.Provider value={memoValues}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
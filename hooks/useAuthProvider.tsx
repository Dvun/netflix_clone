import React, { createContext, FC, memo, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase';
import { ILoginAndRegister } from '../types/types';
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

export const useAuthProvider: FC<Props> = memo(({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
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

  const authFunc = async (email: string, password: string) => {
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push('/');
      })
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const signUp = async ({email, password}: ILoginAndRegister) => {
    await authFunc(email, password);
  };

  const signIn = async ({email, password}: ILoginAndRegister) => {
    await authFunc(email, password);
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
});

export default function useAuth() {
  return useContext(AuthContext);
}
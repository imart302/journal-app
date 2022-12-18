import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { AppDispatch, login, logout, RootState } from '../store';

export const useCheckAuth = () => {
  const authState = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect (() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {

      if(!user) return dispatch(logout());

      dispatch(login({
        displayName: user?.displayName || '',
        email: user?.email || '',
        errorMessage: '',
        photoURL: user?.photoURL || '',
        uid: user?.uid || '',
      }));
    });
  }, []);

  return (
    {
      authState,
    }
  )
}

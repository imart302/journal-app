import { Route, Router } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Navigate, Routes } from 'react-router'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalPage } from '../journal/pages/JournalPage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, login, RootState } from '../store'
import { LoaderSpinner } from '../ui/components/LoaderSpinner'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {
 const { authState } = useCheckAuth();
 
  if(authState == 'Cheking' ) return <LoaderSpinner />

  return (
    <Routes>
      {
        (authState == 'Auth' ? <Route path='/*' element={<JournalPage />} /> : <Route path='/auth/*' element={<AuthRoutes />} />)
      }

      <Route path='/*' element={<Navigate to={'/auth/login'} />} />
    </Routes>
  )
}

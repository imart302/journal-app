import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<JournalPage />} />

      <Route path='/*' element={<Navigate to='/'/>} />
    </Routes>
  )
}

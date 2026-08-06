import React from 'react'
import Login from './feature/auth/pages/Login'
import Signup from './feature/auth/pages/Signup'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
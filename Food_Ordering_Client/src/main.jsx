// import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <RouterProvider router={router}/>,

  // auth context heduwat passe
  <AuthProvider>
    <RouterProvider router={router}/>,
  </AuthProvider>
)

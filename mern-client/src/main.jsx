import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx';
import AuthProvider from './contects/AuthProvider.jsx'


// const stripePromise = loadStripe('pk_test_51Ox301SJZ7HGVRiknhcApObzraBoN4hcvmr1tmJPc7ESZswzeScc9T0HAXKUL0HknRzPBEETgSmkh6KEV87FM1bh00UKzAxUQf');


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)

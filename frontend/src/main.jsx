// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'
import React from 'react'


createRoot(document.getElementById('root')).render(
    <React.Suspense fallback={<div>Loading...</div>}>
        <App />
    </React.Suspense>
)

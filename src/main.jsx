import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvaider } from './context/AppContext.jsx'
import './css/index.css'
import process from 'process'

if (!window.process)
    window.process = process;

// let process = {}

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <AppProvaider>
            <App />
        </AppProvaider>
    // </React.StrictMode>,
)
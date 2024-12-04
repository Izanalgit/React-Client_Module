import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvaider } from './context/AppContext.jsx'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <AppProvaider>
            <App />
        </AppProvaider>
    // </React.StrictMode>,
)
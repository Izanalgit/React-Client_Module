import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvaider } from './context/AppContext.jsx'
import './css/index.css'

import { Buffer } from 'buffer';
import process from 'process';

if (!window.Buffer) 
    window.Buffer = Buffer;

if (!window.process)
    window.process = process;


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProvaider>
            <App />
        </AppProvaider>
    </React.StrictMode>,
)
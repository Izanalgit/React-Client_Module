import React from 'react'
import './css/App.css';
import { ChatProvider } from './context/ChatContext';
import AppRoutes from './routes/AppRoutes';


function App() {

  return (
    <ChatProvider>
      <AppRoutes />
    </ChatProvider>
  )
}

export default App;

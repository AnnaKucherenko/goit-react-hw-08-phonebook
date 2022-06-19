import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage  from './pages/HomePage';
import RegisterPage  from './pages/RegisterPage';
import LoginPage  from './pages/LoginPage';
import { ContactsPage } from './pages/ContactsPage';
import HeaderBar from './components/HeaderBar/HeaderBar';
  
function App() {
  return (
      <div>
        <HeaderBar/>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/contacts" element={<ContactsPage/>} />
        </Routes>
      </div>
      
  ); 
  
}

export default App;

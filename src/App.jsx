import React from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getCurrentUser } from './Redax/auth/authSlice';
import { RequireAuth } from './components/RequireAuth';
import HomePage  from './pages/HomePage/HomePage';
import RegisterPage  from './pages/RegisterPage/RegisterPage';
import LoginPage  from './pages/LoginPage/LoginPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';
import HeaderBar from './components/HeaderBar/HeaderBar';
  
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
      <div>
        <HeaderBar/>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route 
            path="contacts" 
            element={
              <RequireAuth>
                <ContactsPage/>
              </RequireAuth>
            } 
          />
        </Routes>
      </div>
      
  ); 
  
}

export default App;

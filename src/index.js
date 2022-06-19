import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from './Redax/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter basename="/goit-react-hw-08-phonebook/" >
        <App />
      </BrowserRouter>
    </ReduxProvider>
    
  </React.StrictMode>
);

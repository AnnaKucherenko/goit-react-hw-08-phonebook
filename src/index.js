import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {store,persistor} from './Redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/goit-react-hw-08-phonebook/" >
          <App />
        </BrowserRouter>
      </PersistGate>
      
    </ReduxProvider>
    
  </React.StrictMode>
);

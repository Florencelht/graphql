import React from 'react';
import {createRoot}  from 'react-dom/client';
import App from './07-Tailwind/01-intro'
import './index.css'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './06-React-Redux/redux/store';

const container=document.getElementById("root")
const root=createRoot(container)
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App></App>  
      </PersistGate>
    </Provider>
)
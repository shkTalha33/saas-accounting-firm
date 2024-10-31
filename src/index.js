/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { finabeelight, finabeeoutline, finabeesingle, logoDynomo } from './components/icons/icon';
import { CircularProgress } from '@mui/material';
const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={
    <main className='h-screen flex flex-col justify-center items-center'>
      <CircularProgress className='text_darkprimary' size={40} thickness={2} />
      {/* <img style={{ width: '2rem', height: "auto" }} src={finabeesingle} className='absolute' alt="" /> */}
    </main>
  }>  
    <React.StrictMode>  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

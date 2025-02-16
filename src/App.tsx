import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Hotels = lazy(() => import('./pages/Hotels'));
const HotelDetails = lazy(() => import('./pages/HotelDetails'));

const App = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
      </Routes>
    </Suspense>
  );
};

export default App;

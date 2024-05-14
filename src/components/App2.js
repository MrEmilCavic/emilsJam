import React from 'react';
import Root from './Root.js';
import App from '/App.js';
import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
    <Routes>
    <Route path='callback' element={<App />} />
    <Route path='*' element={<Root />} />
    </Routes>
));

export default function App2() {
    return (
        <RouterProvider router={ router } />
    );
}
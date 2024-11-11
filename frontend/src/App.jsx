import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen bg-accent-content'>
        <Navbar/>
        <main className='flex-1'>
          Hello
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App

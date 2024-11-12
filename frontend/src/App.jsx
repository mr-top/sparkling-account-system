import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute';
import UnauthorisedRoute from './components/utils/UnauthorisedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';


function App() {
  const [message, setMessage] = useState(localStorage.getItem('message') || '');

  useEffect(() => {
    localStorage.removeItem('message');
  }, []);

  useEffect(() => {
    localStorage.setItem('message', message);
  }, [message]);

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen bg-accent-content'>
        <Navbar />
        <main className='flex-1 flex flex-row justify-center'>
          <div className='flex flex-col'>
            {message && <p className='bg-primary-content mt-5 rounded-md'>{message}</p>}
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='/settings' element={<p>Settings</p>} />
              </Route>
              <Route element={<UnauthorisedRoute />}>
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='/home' element={<Home />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

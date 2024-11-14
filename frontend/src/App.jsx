import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useContext, useLayoutEffect } from 'react';
import ProtectedRoute from './components/utils/ProtectedRoute';
import UnauthorisedRoute from './components/utils/UnauthorisedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Settings from './components/Settings';
import Profile from './components/Profile';


function App() {
  const [message, setMessage] = useState('');

  function setAlert(text){
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <BrowserRouter>
      <div className='flex flex-col h-screen bg-neutral'>
        <Navbar />
        <main className='flex-1 flex flex-row justify-center'>
          <div className='flex flex-col'>
            {message && <p className='bg-base-100 mt-5 rounded-md py-4 px-2'>{message}</p>}
            <Routes>
              <Route element={<ProtectedRoute setAlert={setAlert}/>}>
                <Route path='/settings' element={<Settings setAlert={setAlert}/>} />
              </Route>
              <Route element={<UnauthorisedRoute setAlert={setAlert}/>}>
                <Route path='/login' element={<Login setAlert={setAlert}/>} />
                <Route path='/register' element={<Register setAlert={setAlert}/>}/>
              </Route>
              <Route path='/profile/:id' element={<Profile setAlert={setAlert}/>}/>
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

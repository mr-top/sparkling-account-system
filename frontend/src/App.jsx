import { useContext, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from './context/ThemeContext'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from './components/Home';
import ProtectedRoute from "./utils/ProtectedRoute";
import UnauthorisedRoute from "./utils/UnauthorisedRoute";
import Login from "./components/Login";

function App() {
  const theme = useContext(ThemeContext);

  const themeClass = theme.darkOn ? 'bg-zinc-950' : 'bg-slate-50';

  return (
    <div className={`${themeClass} h-screen flex flex-col`}>
      <BrowserRouter>
        <Navbar />
        <main className="flex-1 flex justify-center">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/settings" />
            </Route>
            <Route element={<UnauthorisedRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/Register" />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

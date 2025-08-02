import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Navbar from './Componenst/Navbar'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Footer from './Componenst/Footer'


function App() {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App

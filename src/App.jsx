import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Navbar from './Components/Navbar'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Footer from './Components/Footer'
import MyProfile from './Profile/MyProfile'
import Dashboard from './Dashboard/Dashboard'


function App() {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/myProfile' element={<MyProfile/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
      
    </>
  )
}

export default App

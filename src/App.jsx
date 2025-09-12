import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Footer from './Components/Footer'
import MyProfile from './Profile/MyProfile'
import Dashboard from './Dashboard/Dashboard'
import TodaysMatch from './TodaysMatch/TodaysMatch'
import MyMatch from './myMatch/MyMatch'
import MoreMatches from './more matches/MoreMatches'
import Swal from 'sweetalert2';


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
        <Route path='/todaysMatch' element={<TodaysMatch/>} />
        <Route path='/myMatch' element={<MyMatch/>} />
        <Route path='/moreMatch' element={<MoreMatches/>} />
      </Routes>
      
    </>
  )
}

export default App

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
import Inbox from './Inbox/Inbox'
import Subscription from './subscription/Subscription'
import AllSuccessStories from './all stories/AllSuccessStories'
import AddNewSuccessStory from './all stories/AddNewSuccessStory'
import ViewSuccessStory from './all stories/ViewSuccessStory'
import PartnerProfile from './partner profile/PartnerProfile'
import "react-datepicker/dist/react-datepicker.css";
import ProfileVisits from './Profile visits/ProfileVisits'
import Shortlisted from './Shortlisted/Shortlisted'


function App() {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todaysMatch' element={<TodaysMatch />} />
        <Route path='/myMatch' element={<MyMatch />} />
        <Route path='/moreMatch' element={<MoreMatches />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/all-Success-Stories' element={<AllSuccessStories />} />
        <Route path='/add-New-success-Story' element={<AddNewSuccessStory />} />
        <Route path='/view-success-story' element={<ViewSuccessStory />} />
        <Route path='/partner-profile/:profileId' element={<PartnerProfile/>} />
        <Route path='/profile-vists' element={<ProfileVisits/>}  />
        <Route path='shortlisted' element={<Shortlisted/>}  />
      </Routes>

    </>
  )
}

export default App

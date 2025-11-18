import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import AdminDashboard from './Admin/AdminPages/AdminDashboard'
import SubscriptionManagement from './Admin/AdminPages/SubscriptionManagement'
import Enquiries from './Admin/AdminPages/Enquiries'
import UserManagement from './Admin/AdminPages/UserManagement'
import AdminSuccessStories from './Admin/AdminPages/AdminSuccessStories'
import AdminProfile from './Admin/AdminPages/AdminProfile'
import BannerSettings from './Admin/AdminPages/BannerSettings'
import UserProfileView from './Admin/AdminPages/UserProfileView'
import AdminSuccessStoryView from './Admin/AdminPages/AdminSuccessStoryView'
import ChatWindow from './chat/ChatWindow'
// import {A}
import {AuthProvider} from './AuthContext/AuthProvider'
import ProtectedRoute from './AuthContext/ProtectedRoute/ProtectedRoute'

function App() {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Home />} />
         <AuthProvider>
        <ProtectedRoute>
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todaysMatch' element={<TodaysMatch />} />
        <Route path='/myMatch' element={<MyMatch />} />
        <Route path='/moreMatch' element={<MoreMatches />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/chatWindow' element={<ChatWindow />} />
        <Route path='/subscription' element={<Subscription />} />
        <Route path='/all-Success-Stories' element={<AllSuccessStories />} />
        <Route path='/add-New-success-Story' element={<AddNewSuccessStory />} />
        <Route path='/view-success-story' element={<ViewSuccessStory />} />
        <Route path='/partner-profile/:profileId' element={<PartnerProfile />} />
        <Route path='/profile-vists' element={<ProfileVisits />} />
        <Route path='/shortlisted' element={<Shortlisted />} />
        <Route path='/admin'  element={<Home />}  />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/subscription-management' element={<SubscriptionManagement />} />
        <Route path='/enquiries' element={<Enquiries />} />
        <Route path='/userManagement' element={<UserManagement />} />
        <Route path='/admin-succestories' element={<AdminSuccessStories />} />
        <Route path='/admin-profile' element={<AdminProfile />} />
        <Route path='/banner-settings' element={<BannerSettings />} />
        <Route path="/user-profileView" element={<UserProfileView />} />
        <Route path='/admin-successStoryView' element={<AdminSuccessStoryView />} />
        </ProtectedRoute>
        </AuthProvider>
      </Routes> */}

          <AuthProvider>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Home />} />
          {/* <Route path='/login' element={<Login />} /> */}
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/myProfile' element={<MyProfile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/todaysMatch' element={<TodaysMatch />} />
            <Route path='/myMatch' element={<MyMatch />} />
            <Route path='/moreMatch' element={<MoreMatches />} />
            <Route path='/inbox' element={<Inbox />} />
            <Route path='/chatWindow' element={<ChatWindow />} />
            <Route path='/subscription' element={<Subscription />} />
            <Route path='/all-Success-Stories' element={<AllSuccessStories />} />
            <Route path='/add-New-success-Story' element={<AddNewSuccessStory />} />
            <Route path='/view-success-story' element={<ViewSuccessStory />} />
            <Route path='/partner-profile/:profileId' element={<PartnerProfile />} />
            <Route path='/profile-vists' element={<ProfileVisits />} />
            <Route path='/shortlisted' element={<Shortlisted />} />
            
            <Route path='/admin-dashboard' element={<AdminDashboard />} />
            <Route path='/subscription-management' element={<SubscriptionManagement />} />
            <Route path='/enquiries' element={<Enquiries />} />
            <Route path='/userManagement' element={<UserManagement />} />
            <Route path='/admin-succestories' element={<AdminSuccessStories />} />
            <Route path='/admin-profile' element={<AdminProfile />} />
            <Route path='/banner-settings' element={<BannerSettings />} />
            <Route path="/user-profileView" element={<UserProfileView />} />
            <Route path='/admin-successStoryView' element={<AdminSuccessStoryView />} />
          </Route>
        </Routes>

    </AuthProvider>
    </>
  )
}

export default App

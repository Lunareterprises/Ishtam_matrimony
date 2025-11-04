import React, { useEffect, useState } from 'react';
import WhyIshttamMarry from './WhyIshttamMarry';
import OurProcess from './OurProcess';
import TrustUs from './TrustUs';
import HomeContactSection from './HomeContactSection';
import Nav from '../Components/Nav'
import Footer from '../Components/Footer';
import AppFeatures from './AppFeatures';
import RealStories from './RealStories';
import AboutUs from './AboutUs';
import { fetchHomeBannersApi } from '../Services/allApi';
import Registration from '../Components/Registration';
import Login from '../Components/Login';
import ForgotPassword from '../Components/ForgotPassword';
import LoginWithOtp from '../Components/LoginWithOtp';
import VerifyOtp from '../Components/VerifyOtp';
import FAQ from './FAQ';
import { useLocation } from 'react-router-dom';
import AdminLogin from '../Admin/AdminComponents/AdminLogin';
import { useNavigate } from "react-router-dom";



function Home() {
  const [banners, setBanners] = useState([])

  // --- Modal States ---
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLoginWithOtp, setShowLoginWithOtp] = useState(false);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState("");

  const location = useLocation();
  const [showAdminModal, setShowAdminModal] = useState(false);

  useEffect(() => {
    // If visiting /admin, open modal
    if (location.pathname === "/admin") {
      setShowAdminModal(true);
    } else {
      setShowAdminModal(false);
    }
  }, [location]);

  const navigate = useNavigate();

  // Close admin modal and redirect to home
  const handleCloseModal = () => {
    setShowAdminModal(false);
    navigate("/");
  };


  const fetchHomeBanners = async () => {
    try {
      const result = await fetchHomeBannersApi();
      console.log(result);

      if (result?.data?.result === true && Array.isArray(result.data.data)) {
        setBanners(result.data.data); // now banners is always an array
      } else {
        setBanners([]); // fallback to empty array
      }
    } catch (error) {
      console.log(error);
      setBanners([]); // fallback to empty array on error
    }
  };


  useEffect(() => {
    fetchHomeBanners()
  }, [])



  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      <Nav onOpenLogin={() => setShowLogin(true)}
        onOpenRegistration={() => setShowRegistration(true)} />

      <div id='home' name="home" className='pt-[80px]' >
        <section className="relative w-full h-[80vh] sm:h-[90vh] overflow-hidden">
          {banners.length > 0 && (
            <img
              src={`https://lunarsenterprises.com:6050${banners[current].b_file}`}
              alt={`Slide ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out"
            />
          )}


          {/* {banners.map((banner, index) => (
  <img
    key={banner.b_id}
    src={`https://lunarsenterprises.com:6050${banner.b_file}`}
    alt={`Slide ${index + 1}`}
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
      index === current ? 'opacity-100' : 'opacity-0'
    }`}
  />
))} */}


          <div className="relative z-10 flex flex-col gap-5 items-center justify-center text-center h-full bg-black/10 px-7">
            <h1 className="text-white text-[29px] sm:text-5xl px-5 font-bold leading-tight">
              Find Your ishtam –<br />
              <span className="text-white">A Match Made in Heart & Heaven</span>
            </h1>
            <p className="text-white italic text-[15px] sm:text-lg ">
              Begin your journey with trusted matches, family values, and soulful connections
            </p>

            <div className=" flex flex-col gap-4">
              <button onClick={() => setShowRegistration(true)} className="bg-pink-600 text-white w-45 h-12 text-[12px] sm:text-[15px] sm:w-60 sm:h-13 rounded-full font-semibold hover:bg-pink-700 transition">
                JOIN ISHTAM MARRY
              </button>
              <button onClick={() => setShowLogin(true)} className="border border-white text-white w-45 h-12 text-[12px] sm:text-[15px] sm:w-60 sm:h-13 rounded-full hover:bg-white hover:text-pink-600 transition">
                CONTINUE YOUR JOURNEY
              </button>
            </div>
          </div>
        </section>
      </div>

      {showRegistration && (
        <Registration
          onClose={() => setShowRegistration(false)}
          onSuccess={(email) => {
            setEmailToVerify(email);
            setShowRegistration(false);
            setShowVerifyOtp(true);
          }}
        />
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onOtpLogin={() => {
            setShowLogin(false);
            setShowLoginWithOtp(true);
          }}
          onForgotPassword={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
          }}
          openRegistrationModal={() => setShowRegistration(true)}
        />
      )}

      {showForgotPassword && (
        <ForgotPassword
          onClose={() => setShowForgotPassword(false)}
          onSuccess={() => setShowLogin(true)}
        />
      )}

      {showLoginWithOtp && (
        <LoginWithOtp
          onClose={() => setShowLoginWithOtp(false)}
          onSendOtp={() => {
            setShowLoginWithOtp(false);
            setShowVerifyOtp(true);
          }}
        />
      )}

      {showVerifyOtp && (
        <VerifyOtp
          onClose={() => setShowVerifyOtp(false)}
          email={emailToVerify}
          onVerified={() => {
            setShowVerifyOtp(false);
            setShowLogin(true);
          }}
        />
      )}


      <WhyIshttamMarry />
      <AboutUs />
      <RealStories />
      <OurProcess />
      <HomeContactSection />
      <AppFeatures />
      <FAQ />
      {/* <TrustUs /> */}
      <Footer />

      {showAdminModal && (
        <AdminLogin
          isOpen={showAdminModal}
          onClose={handleCloseModal}
        />
      )}

    </>
  );
}

export default Home;

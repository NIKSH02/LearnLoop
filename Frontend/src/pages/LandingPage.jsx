import React from "react";
// import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Images from "../components/Images.jsx";
import StudyHub from "../components/StudyHUb.jsx";
import StudyMitraCard from "../components/StudyMitraCard.jsx";
import RoleGuard from "../components/RoleGuard.jsx";

// Icons commented out since dock is not used
/*
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
  VscBell,
  VscMail,
  VscGraphLine,
  VscRobot,
} from 'react-icons/vsc';
*/

const LandingPage = () => {
  // Navigation functions commented out since dock is not used
  /*
  const navigate = useNavigate();

  // Function to scroll to hero section
  const scrollToHero = () => {
    const heroElement = document.querySelector('#hero-section');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no ID found, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Function to navigate to signup page
  const goToSignup = () => {
    navigate('/signup');
  };

  // Function to navigate to AI assistant
  const goToAIAssistant = () => {
    navigate('/ai-assistant');
  };
  */

  // Dock items - temporarily commented out
  /*
const items = [
  { icon: <VscHome size={18} />, label: 'Home', onClick: scrollToHero },
  { icon: <VscRobot size={18} />, label: 'AI Assistant', onClick: goToAIAssistant },
  { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={18} />, label: 'Profile', onClick: goToSignup },
  { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  { icon: <VscBell size={18} />, label: 'Notifications', onClick: () => alert('Notifications!') },
//   { icon: <VscMail size={18} />, label: 'Messages', onClick: () => alert('Messages!') },
  { icon: <VscGraphLine size={18} />, label: 'Analytics', onClick: () => alert('Analytics!') },
];
*/

  return (
    <RoleGuard>
      <div className=" text-white font-['Inter'] relative">
        <Navbar />
        <HeroSection />
        <StudyMitraCard />
        <Images />
        <StudyHub />

        {/* Dock navigation - temporarily commented out */}
        {/* <div className="my-class" style={{ zIndex: "10", position: 'fixed', bottom: "0",left: "50%"}}>
             <Dock
              items={items}
              className="my-class"
              panelHeight={80}
              baseItemSize={50}
              magnification={90}
              />
         </div> */}

        {/* Footer - temporarily commented out */}
        {/* <Footer/> */}
      </div>
    </RoleGuard>
  );
};

export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import RolePopup from '../components/RolePopup';
import { useTheme } from '../context/ThemeContext';

const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <RolePopup open={true} onClose={handleClose} />
    </div>
  );
};

export default RoleSelectionPage;

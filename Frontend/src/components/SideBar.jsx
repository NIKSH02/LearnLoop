import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SideBar = ({ location, activeUsers = 0 }) => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock user data - replace with actual user context data
  const currentUser = {
    name: user?.fullName || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    branch: user?.branch || 'Computer Science',
    avatar: user?.avatar || null,
    initials: user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JD'
  };

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      href: '/MentorProfile'
    },
    {
      id: 'messages',
      label: 'Private Messages',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: '/privatechat',
      badge: 3 // Unread messages count
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5H15m-5 10V7a3 3 0 10-6 0v10a1 1 0 001 1h4a1 1 0 001-1z" />
        </svg>
      ),
      href: '/notifications',
      badge: 7
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      href: '/settings'
    }
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 2000);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNavigation = (href) => {
    // Handle navigation - replace with actual navigation logic
    window.location.href = href;
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Mobile Hamburger Menu
  if (isMobile) {
    return (
      <>
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 left-4 z-50 w-12 h-12 bg-gradient-to-br from-[#7968ed] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 transform ${
              isMenuOpen ? 'rotate-45' : '-translate-y-2'
            }`}></span>
            <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`absolute w-6 h-0.5 bg-white transition-all duration-300 transform ${
              isMenuOpen ? '-rotate-45' : 'translate-y-2'
            }`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          <div className={`absolute left-0 top-0 h-full w-80 backdrop-blur-md bg-white/90 border-r border-white/30 shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            {/* Mobile Menu Content */}
            <div className="p-6 pt-20">
              {/* Brand */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#7968ed] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🌍</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-800">Global Chat</h1>
                  <p className="text-sm text-gray-600">Community Hub</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-3 mb-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href)}
                    className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-white/60 border border-gray-200/50 hover:bg-gradient-to-r hover:from-[#7968ed]/10 hover:to-purple-200/30 hover:border-[#7968ed]/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#7968ed]/20 group-hover:to-purple-200/50 transition-all duration-300">
                        <div className="text-gray-600 group-hover:text-[#7968ed] transition-colors duration-300">
                          {item.icon}
                        </div>
                      </div>
                      {item.badge && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                          {item.badge}
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-[#7968ed] transition-colors duration-300">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* User Profile */}
              <div className="bg-gradient-to-r from-white/60 to-purple-50/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#7968ed] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                      {currentUser.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name}
                          className="w-14 h-14 rounded-2xl object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {currentUser.initials}
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 text-base truncate">{currentUser.name}</h4>
                    <p className="text-sm text-gray-600 truncate">{currentUser.branch}</p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                  </div>
                  
                  <button className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar (Always visible, no collapse)
  return (
    <div className="fixed left-0 top-0 h-full w-80 z-30">
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/90 border-r border-white/30 shadow-2xl">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-[#7968ed]/20 to-purple-300/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-indigo-300/20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7968ed] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🌍</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">Global Chat</h1>
                <p className="text-sm text-gray-600">Community Hub</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 px-6 py-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
                Navigation
              </h3>
            </div>

            <div className="space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-white/60 border border-gray-200/50 hover:bg-gradient-to-r hover:from-[#7968ed]/10 hover:to-purple-200/30 hover:border-[#7968ed]/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="relative">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-[#7968ed]/20 group-hover:to-purple-200/50 transition-all duration-300 w-10 h-10 flex items-center justify-center">
                      <div className="text-gray-600 group-hover:text-[#7968ed] transition-colors duration-300">
                        {item.icon}
                      </div>
                    </div>
                    
                    {item.badge && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                        {item.badge}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-800 group-hover:text-[#7968ed] transition-colors duration-300">
                      {item.label}
                    </p>
                  </div>

                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#7968ed] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-t border-white/20">
            <div className="bg-gradient-to-r from-white/60 to-purple-50/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#7968ed] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name}
                        className="w-14 h-14 rounded-2xl object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {currentUser.initials}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-base truncate">{currentUser.name}</h4>
                  <p className="text-sm text-gray-600 truncate">{currentUser.branch}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                </div>
                
                <button className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <svg className="w-4 h-4 text-red-600 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
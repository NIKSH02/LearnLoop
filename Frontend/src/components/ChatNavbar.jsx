import axios from "axios";
import { Search, Bell, Settings, ChevronDown, X, Filter, Menu, MessageCircle, Loader, LucideLoader, Loader2, House } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { ChatState } from '../context/chatProvider.jsx';
import { useNavigate } from "react-router-dom";


export default function ChatNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchFilters, setShowSearchFilters] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading ] = useState(false);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);


  const navigate = useNavigate();

  const token = Cookies.get("accessToken"); // works if cookie is not HttpOnly
  console.log("token in cookie", token);



//   const token = localStorage.accessToken; 
  const user = JSON.parse(localStorage.getItem("userData"));

//   const { user, selectedChat, setSelectedChat, chats, setChats, setLoadingChat } = ChatState();

  // my state var's 
  const [ search, setSearch ] = useState('');
  const [ searchResult, setSearchResult ] = useState([]);


  // Mock search suggestions
  const searchSuggestions = [
    "John Doe conversation",
    "Project updates",
    "Team meeting notes",
    "Sarah Wilson chat"
  ];

  // Mock notifications
  const notifications = [
    { id: 1, user: "Alex Chen", message: "Sent you a message", time: "2m ago", unread: true },
    { id: 2, user: "Sarah Wilson", message: "Replied to your message", time: "1h ago", unread: true },
    { id: 3, user: "Mike Johnson", message: "Shared a file", time: "3h ago", unread: false }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
        setShowSearchFilters(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearNotifications = () => {
    setNotificationCount(0);
    setShowNotifications(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      setShowMobileMenu(false);
    }
  };

  const closeMobileSearch = () => {
    setShowMobileSearch(false);
    setSearchQuery("");
    setIsSearchFocused(false);
  };

    const handleSearch = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization : `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`http://localhost:5001/api/users?search=${searchQuery}`, config);
      setIsLoading(false);
      console.log("data from search " , data);
      setSearchResult(data);
    } catch (error) {
      console.log( 'error in search global ', error)
    }
  }

  const accessChat = async ( userId ) => {
    console.log("access chat userid ", userId);

    try {
      // setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5001/api/chat`, { userId }, config);
      console.log('data feom access chat', data)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      console.log("sele chat", selectedChat)
      // setLoadingChat(false);
      onClose();
    } catch (error) {
      console.log("error in access chat: ", error )
    }
  }

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-gray-50 backdrop-blur-sm border-b border-gray-200/80 px-3 sm:px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="fixed inset-0 bg-white z-60 md:hidden">
            <div className="flex items-center p-4 border-b border-gray-200">
              <button
                onClick={closeMobileSearch}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg mr-2"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex-1" ref={searchRef}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-blue-500" />
                  </div>
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="block w-full pl-10 pr-12 py-3 border border-blue-400 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:text-sm"
                    placeholder="Search conversations..."
                    autoFocus
                  />

                  <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => setShowSearchFilters(!showSearchFilters)}
                      className={`p-1 rounded-md transition-colors ${
                        showSearchFilters 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Mobile Search Suggestions */}
                  {(isSearchFocused || searchQuery) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      {searchQuery === "" ? (
                        <>
                          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Recent Searches
                          </div>
                          {searchSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setSearchQuery(suggestion)}
                              className="w-full text-left px-3 py-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                            >
                              <Search className="h-4 w-4 inline mr-2 text-gray-400" />
                              {suggestion}
                            </button>
                          ))}
                        </>
                      ) : (
                        <div className="px-3 py-3 flex justify-center items-center text-sm text-gray-600">
                          
                          { isLoading ? <Loader2 /> : `Press Enter to search for ${searchQuery}}` }
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mobile Search Filters */}
                  {showSearchFilters && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                        Search Filters
                      </div>
                      <div className="p-3 space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 w-4 h-4" defaultChecked />
                          <span className="text-sm text-gray-700">Messages</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 w-4 h-4" defaultChecked />
                          <span className="text-sm text-gray-700">Users</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 w-4 h-4" />
                          <span className="text-sm text-gray-700">Files</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Left section - Responsive heading */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 md:hidden" />
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Private Messages
              </h1>
            </div>
            <h1 className="text-lg font-semibold text-gray-900 md:hidden">
              Messages
            </h1>
          </div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium hidden sm:inline-block">
            Online
          </span>
        </div>

        {/* Center section - Desktop search only */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8" ref={searchRef}>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors duration-200 ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>  { setSearchQuery(e.target.value); handleSearch();}}
              onFocus={() => setIsSearchFocused(true)}
              className={`block w-full pl-10 pr-12 py-3 border rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${
                isSearchFocused 
                  ? 'border-blue-400 ring-4 ring-blue-100 bg-white' 
                  : 'border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100'
              } focus:outline-none sm:text-sm`}
              placeholder="Search conversations, users, or content..."
            />

            <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-md transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setShowSearchFilters(!showSearchFilters)}
                className={`p-1 rounded-md transition-colors ${
                  showSearchFilters 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop Search Suggestions */}
            {(isSearchFocused || searchQuery) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                {searchQuery === "" ? (
                  <>
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Recent Searches
                    </div>
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                      >
                        <Search className="h-4 w-4 inline mr-2 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-3 py-2 flex flex-col items-center justify-center text-sm text-gray-600">
                    {isLoading ? (
                        <LucideLoader /> 
                    ) : (
                        Array.isArray(searchResult) && searchResult.map((user) => (
                            <button
                                key={user._id}
                                onClick={() => accessChat(user._id)}
                                className="w-full flex flex-row text-left px-3 py-2 hover:bg-gray-50 transition-colors text-sm text-gray-700"
                            >
                                {/* <Search className="h-4 w-4 inline mr-2 text-gray-400" /> */}
                                  <img style={{height: "50px", width: "50px", marginRight: "10px"}} src="https://static.vecteezy.com/system/resources/thumbnails/048/926/084/small_2x/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-illustration-vector.jpg" alt="User" />
                                  <span className="flex flex-col py-1">
                                    <p>{user?.name} </p>
                                    {user?.email}
                                  </span>
                            </button>
                            ))
                        )
                    }
                  </div>
                )}
              </div>
            )}

            {/* Desktop Search Filters */}
            {showSearchFilters && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 w-64 animate-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  Search Filters
                </div>
                <div className="p-3 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Messages</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-sm text-gray-700">Users</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">Files</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section - Responsive actions */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          
          {/* Mobile Search Button */}
          <button 
            onClick={toggleMobileSearch}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Settings button - Hidden on small mobile */}
          <button className="hidden sm:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Settings className="h-5 w-5" />
          </button>
          <button onClick={() => navigate('/')} className="hidden sm:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <House  className="h-5 w-5" />
          </button>

          {/* Notification button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 text-xs font-medium text-white bg-red-500 rounded-full ring-2 ring-white animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown - Responsive width */}
            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={clearNotifications}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${
                        notification.unread ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{notification.user}</p>
                          <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="relative sm:hidden" ref={mobileMenuRef}>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Mobile Menu Dropdown */}
            {showMobileMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200">
                <div className="py-2">
                  <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Online Status</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
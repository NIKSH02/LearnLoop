import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, MoreVertical, Send, Smile, ArrowLeft, Paperclip, Mic, Image, MapPin, Clock, CheckCheck, Check, Star, Heart, ThumbsUp, Coffee } from 'lucide-react';
import { ChatState } from '../context/chatProvider.jsx'
import ChatNavbar from '../components/ChatNavbar.jsx'
import axios from "axios";

const PersonalChatUI = () => {

//   const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();  
  const user  = JSON.parse(localStorage.userData)
  console.log("user in private " , user)
  const token = localStorage.accessToken; 


  // Add loading check for user
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-600 font-medium">Loading your conversations...</div>
        </div>
      </div>
    );
  }

  // Enhanced state management
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chats');
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(['raj_kumar', 'priya_sharma']);
  const [messageReactions, setMessageReactions] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  //my state 
  const [ loggedUser, setLoggedUser ] = useState()


  // Refs for file inputs
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  // Refs
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const messageInputRef = useRef(null);

  // Enhanced mock conversations with richer data
  const mockConversations = [
    {
      conversationId: 'conv_1',
      otherUser: { 
        userId: 'raj_kumar', 
        userName: user?.name || 'Raj Kumar',
        status: 'Busy with orders',
        location: 'Mumbai Market'
      },
      lastMessage: { 
        message: 'Perfect! I\'ll place the order now 🛒', 
        timestamp: new Date(Date.now() - 2 * 60 * 1000), 
        senderId: 'raj_kumar',
        type: 'text',
        status: 'delivered'
      },
      unreadCount: 2,
      avatar: '🧑‍🌾',
      isPinned: true,
      category: 'business'
    },
    {
      conversationId: 'conv_2',
      otherUser: { 
        userId: 'priya_sharma', 
        userName: 'Priya Sharma',
        status: 'Available for quick delivery',
        location: 'Pune Central'
      },
      lastMessage: { 
        message: 'Thanks for the amazing service! ⭐', 
        timestamp: new Date(Date.now() - 45 * 60 * 1000), 
        senderId: 'priya_sharma',
        type: 'text',
        status: 'read'
      },
      unreadCount: 0,
      avatar: '👩‍💼',
      isPinned: false,
      category: 'customer'
    },
    {
      conversationId: 'conv_3',
      otherUser: { 
        userId: 'vikram_singh', 
        userName: 'Vikram Singh',
        status: 'Looking for fresh produce',
        location: 'Delhi Markets'
      },
      lastMessage: { 
        message: 'Can you send me photos of tomatoes?', 
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), 
        senderId: 'vikram_singh',
        type: 'text',
        status: 'delivered'
      },
      unreadCount: 0,
      avatar: '👨‍🌾',
      isPinned: false,
      category: 'inquiry'
    },
    {
      conversationId: 'conv_4',
      otherUser: { 
        userId: 'anita_devi', 
        userName: 'Anita Devi',
        status: 'Wholesale buyer',
        location: 'Bangalore'
      },
      lastMessage: { 
        message: 'Weekly order ready for pickup', 
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), 
        senderId: user?.name ,
        type: 'text',
        status: 'delivered'
      },
      unreadCount: 0,
      avatar: '👩‍🌾',
      isPinned: false,
      category: 'regular'
    }
  ];

  // Enhanced mock messages with more variety
  const mockMessages = {
  'conv_1': [
    {
      id: 'msg1',
      senderId: 'vendor_123',
      senderName: 'Campus Supplies Vendor',
      receiverId: user?.userId,
      receiverName: user?.userName,
      message: 'Hi! We have a new batch of high-quality stationery sets. Would you like to check them out for your semester? ✏️📚',
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg2',
      senderId: user?.userId,
      senderName: user?.userName,
      receiverId: 'vendor_123',
      receiverName: 'Campus Supplies Vendor',
      message: 'Yes, I’m interested. Do you have any student discount offers?',
      timestamp: new Date(Date.now() - 33 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg3',
      senderId: 'vendor_123',
      senderName: 'Campus Supplies Vendor',
      receiverId: user?.userId,
      receiverName: user?.userName,
      message: 'Absolutely! 15% off for all students with a valid ID card. 🎓',
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg4',
      senderId: user?.userId,
      senderName: user?.userName,
      receiverId: 'vendor_123',
      receiverName: 'Campus Supplies Vendor',
      message: 'Perfect. I’ll take one stationery set with extra notebooks.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg5',
      senderId: 'vendor_123',
      senderName: 'Campus Supplies Vendor',
      receiverId: user?.userId,
      receiverName: user?.userName,
      message: 'Order confirmed! I’ll deliver it to your hostel tomorrow morning 🚚',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: 'text',
      status: 'delivered'
    }
  ],
  'conv_2': [
    {
      id: 'msg6',
      senderId: 'vendor_456',
      senderName: 'Canteen Vendor',
      receiverId: user?.userId,
      receiverName: user?.userName,
      message: 'Thanks for always ordering from us! Glad you liked the fresh juice yesterday 🥤',
      timestamp: new Date(Date.now() - 75 * 60 * 1000),
      type: 'text',
      status: 'read'
    }
  ],
  'conv_3': [
    {
      id: 'msg7',
      senderId: 'vendor_789',
      senderName: 'Library Vendor',
      receiverId: user?.userId,
      receiverName: user?.userName,
      message: 'Would you like me to send photos of the new academic reference books? 📖',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      type: 'text',
      status: 'delivered'
    }
  ]
};


  // Quick reactions
  const quickReactions = ['❤️', '👍', '😊', '🔥', '👏', '☕'];
  const quickReplies = [
    'Available now! 🟢',
    'Let me check the timing ⏰',
    'Will get back to you 🔄',
    ' which subject 📖',
    ' today ? 🗓️',
  ];

  // Initialize data with animation
  useEffect(() => {
    setTimeout(() => {
      setConversations(mockConversations);
      setSelectedConversation(mockConversations[0]);
      setMessages(mockMessages['conv_1'] || []);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Auto-scroll with smooth animation
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedConversation && Math.random() > 0.7) {
      setTypingUsers([selectedConversation.otherUser.userName]);
      setTimeout(() => setTypingUsers([]), 3000);
    }
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
      return diffInMinutes < 1 ? 'now' : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return messageTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return messageTime.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages[conversation.conversationId] || []);
    setShowSidebar(false);
    
    // Mark as read with animation
    setConversations(prev => 
      prev.map(conv => 
        conv.conversationId === conversation.conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const messageData = {
      id: 'msg_' + Date.now(),
      senderId: user?.userId,
      senderName: user?.userName,
      receiverId: selectedConversation.otherUser.userId,
      receiverName: selectedConversation.otherUser.userName,
      message: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    };

    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageData.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    // Update conversation preview
    setConversations(prev =>
      prev.map(conv =>
        conv.conversationId === selectedConversation.conversationId
          ? {
              ...conv,
              lastMessage: {
                message: messageData.message,
                timestamp: messageData.timestamp,
                senderId: messageData.senderId,
                type: messageData.type,
                status: 'delivered'
              }
            }
          : conv
      )
    );
  };

  const handleQuickReply = (reply) => {
    setNewMessage(reply);
    messageInputRef.current?.focus();
  };

  // Add missing handleReaction function
  const handleReaction = (messageId, reaction) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), reaction]
    }));
  };

  // Voice Recording Functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        setAudioChunks(prev => [...prev, event.data]);
      };
      
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };
      
      setMediaRecorder(recorder);
      setAudioChunks([]);
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
      
      // Process audio after stopping
      setTimeout(() => {
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          sendVoiceMessage(audioBlob);
        }
      }, 100);
    }
  };

  const sendVoiceMessage = (audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const messageData = {
      id: 'msg_' + Date.now(),
      senderId: user?.userId,
      senderName: user?.userName,
      receiverId: selectedConversation.otherUser.userId,
      receiverName: selectedConversation.otherUser.userName,
      message: `🎤 Voice message (${recordingTime}s)`,
      timestamp: new Date(),
      type: 'voice',
      audioUrl: audioUrl,
      duration: recordingTime,
      status: 'sending'
    };

    setMessages(prev => [...prev, messageData]);
    setAudioChunks([]);
    setRecordingTime(0);

    // Simulate delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageData.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  // File Upload Functions
  const handleImageSelect = () => {
    imageInputRef.current?.click();
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          sendImageMessage(e.target.result, file.name);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = '';
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      sendFileMessage(file);
    });
    event.target.value = '';
  };

  const sendImageMessage = (imageUrl, fileName) => {
    const messageData = {
      id: 'msg_' + Date.now(),
      senderId: user?.userId,
      senderName: user?.userName,
      receiverId: selectedConversation.otherUser.userId,
      receiverName: selectedConversation.otherUser.userName,
      message: `📷 ${fileName}`,
      timestamp: new Date(),
      type: 'image',
      imageUrl: imageUrl,
      fileName: fileName,
      status: 'sending'
    };

    setMessages(prev => [...prev, messageData]);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageData.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  const sendFileMessage = (file) => {
    const messageData = {
      id: 'msg_' + Date.now(),
      senderId: user?.userId,
      senderName: user?.userName,
      receiverId: selectedConversation.otherUser.userId,
      receiverName: selectedConversation.otherUser.userName,
      message: `📎 ${file.name}`,
      timestamp: new Date(),
      type: 'file',
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      status: 'sending'
    };

    setMessages(prev => [...prev, messageData]);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageData.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

    const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("http://localhost:5001/api/chat", config);
      setChats(data);
      setConversations(chats);
      console.log("fetched chats; :", conversations);
    } catch (error) {
      console.log("error in fetching chats " , error)
    }
  };

    useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, []); //fetchAgain

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400 animate-pulse" />;
      case 'delivered':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'business': return 'bg-green-500';
      case 'customer': return 'bg-blue-500';
      case 'inquiry': return 'bg-yellow-500';
      case 'regular': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };



  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="text-gray-600 font-medium">Setting up your workspace...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ChatNavbar /> 
      <div className="flex-1 flex overflow-hidden">
        
        {/* Enhanced Sidebar */}
        <div className={`w-full md:w-80 bg-white/80 backdrop-blur-lg border-r border-gray-200/50 flex flex-col transition-all duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200/50 bg-white/50">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Messages
              </h1>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-500">{onlineUsers.length} online</span>
              </div>
            </div>
      
            {/* Enhanced Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>
            
            {/* Enhanced Tabs */}
            <div className="flex space-x-1 bg-gray-100/80 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'chats'
                    ? 'bg-white text-gray-900 shadow-md transform scale-[0.98]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                💬 Chats
              </button>
              {/* <button
                onClick={() => setActiveTab('groups')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'groups'
                    ? 'bg-white text-gray-900 shadow-md transform scale-[0.98]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                👥 Groups
              </button> */}
            </div>
          </div>
          
          {/* Enhanced Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations
              .filter(conv => conv.otherUser.userName.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => b.isPinned - a.isPinned)
              .map((conversation, index) => (
              <div
                key={conversation.conversationId}
                onClick={() => handleConversationSelect(conversation)}
                className={`relative p-4 border-b border-gray-100/50 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 group ${
                  selectedConversation?.conversationId === conversation.conversationId
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-r-4 border-r-blue-500'
                    : ''
                } animate-in slide-in-from-left duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {conversation.isPinned && (
                  <div className="absolute top-2 right-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-200">
                      {conversation.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                      onlineUsers.includes(conversation.otherUser.userId) ? 'bg-green-400' : 'bg-gray-300'
                    }`}></div>
                    <div className={`absolute -top-1 -left-1 w-3 h-3 rounded-full ${getCategoryColor(conversation.category)}`}></div>
                  </div>
      
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-900 transition-colors">
                        {conversation.otherUser.userName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                        {conversation.lastMessage.senderId === user?.userId && (
                          <div className="ml-1">
                            {getStatusIcon(conversation.lastMessage.status)}
                          </div>
                        )}
                      </div>
                    </div>
      
                    <p className="text-xs text-gray-500 truncate mb-1">{conversation.otherUser.status}</p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {conversation.lastMessage.message}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center min-w-[20px] h-5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-1 ml-2 animate-pulse">
                          {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Main Chat Area */}
        <div className={`flex-1 flex flex-col bg-gradient-to-br from-white to-blue-50/30 transition-all duration-300 ${
          showSidebar ? 'hidden md:flex' : 'flex'
        }`}>
          {selectedConversation ? (
            <>
              {/* Enhanced Chat Header */}
              <div className="p-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleBackToSidebar}
                      className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white shadow-lg">
                        {conversations.find(c => c.conversationId === selectedConversation.conversationId)?.avatar}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        onlineUsers.includes(selectedConversation.otherUser.userId) ? 'bg-green-400' : 'bg-gray-300'
                      }`}></div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {selectedConversation.otherUser.userName}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm ${onlineUsers.includes(selectedConversation.otherUser.userId) ? 'text-green-600' : 'text-gray-500'}`}>
                          {onlineUsers.includes(selectedConversation.otherUser.userId) ? 'Online' : 'Last seen recently'}
                        </p>
                        {selectedConversation.otherUser.location && (
                          <>
                            <span className="text-gray-300">•</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{selectedConversation.otherUser.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
      
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200 group">
                      <Phone className="w-5 h-5 group-hover:animate-pulse" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-blue-50/20">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex group animate-in slide-in-from-bottom duration-500 ${
                      message.senderId === user?.userId ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col max-w-xs lg:max-w-md">
                      <div
                        className={`relative px-4 py-3 rounded-2xl shadow-md transition-all duration-200 group-hover:shadow-lg ${
                          message.senderId === user?.userId
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md transform hover:scale-[1.02]'
                            : 'bg-white text-gray-900 rounded-bl-md border border-gray-200 hover:border-gray-300 transform hover:scale-[1.02]'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        
                        <div className={`flex items-center justify-between mt-2 space-x-2 ${
                          message.senderId === user?.userId ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">
                            {formatTime(message.timestamp)}
                          </span>
                          {message.senderId === user?.userId && (
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(message.status)}
                            </div>
                          )}
                        </div>

                        {/* Message Reactions */}
                        {messageReactions[message.id] && messageReactions[message.id].length > 0 && (
                          <div className="absolute -bottom-2 left-2 flex space-x-1">
                            {messageReactions[message.id].slice(0, 3).map((reaction, idx) => (
                              <span key={idx} className="bg-white rounded-full px-1 py-0.5 text-xs shadow-sm border">
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Quick Reaction Buttons */}
                      <div className={`flex items-center mt-1 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        message.senderId === user?.userId ? 'justify-end' : 'justify-start'
                      }`}>
                        {quickReactions.slice(0, 3).map((reaction) => (
                          <button
                            key={reaction}
                            onClick={() => handleReaction(message.id, reaction)}
                            className="text-xs p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {typingUsers.length > 0 && (
                  <div className="flex justify-start animate-in slide-in-from-bottom duration-300">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-md border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">{typingUsers[0]} is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies Bar */}
              <div className="px-4 py-2 border-t border-gray-200/50 bg-white/50">
                <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="flex-shrink-0 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 transition-all duration-200 hover:shadow-md transform hover:scale-105"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Message Input */}
              <div className="p-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-lg">
                
                {/* Hidden File Inputs */}
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                />

                <div className="flex items-end space-x-3">
                  
                  {/* Attachment Menu */}
                  <div className="relative group">
                    <button 
                      onClick={handleFileSelect}
                      className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 group"
                    >
                      <Paperclip className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    </button>
                    
                    {/* Attachment Options Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                        Attach files
                      </div>
                    </div>
                  </div>

                  {/* Main Input Container */}
                  <div className="flex-1 relative">
                    <div className="flex items-end bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      
                      {/* Text Input */}
                      <textarea
                        ref={messageInputRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 bg-transparent border-none resize-none focus:outline-none text-sm placeholder-gray-500 max-h-32 min-h-[48px]"
                        rows="1"
                      />
                      
                      {/* Input Actions */}
                      <div className="flex items-center space-x-1 px-2 pb-2">
                        {/* Image Button */}
                        <div className="relative group">
                          <button 
                            onClick={handleImageSelect}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-200"
                          >
                            <Image className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                              Add image
                            </div>
                          </div>
                        </div>
                        
                        {/* Emoji Button */}
                        <div className="relative group">
                          <button 
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200"
                          >
                            <Smile className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                              Add emoji
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 animate-in slide-in-from-bottom duration-200">
                        <div className="text-sm font-medium text-gray-700 mb-3">Frequently Used</div>
                        <div className="grid grid-cols-8 gap-2 max-w-xs">
                          {['😊', '😂', '❤️', '👍', '👏', '🔥', '⭐', '🎉', '💯', '🙌', '😍', '🤝', '💰', '🚚', '📦', '🛒', '🍚', '🍅', '☕', '⚡', '👌', '💪', '🙏', '✨'].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                setNewMessage(prev => prev + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="text-xl hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200 hover:scale-110 transform"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Voice/Send Button */}
                  {newMessage.trim() ? (
                    <div className="relative group">
                      <button
                        onClick={handleSendMessage}
                        className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                          Send message
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        onMouseLeave={stopRecording}
                        className={`p-3 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                            : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-2 whitespace-nowrap">
                          {isRecording ? 'Recording...' : 'Hold to record'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recording Indicator */}
                {isRecording && (
                  <div className="flex items-center justify-center mt-3 animate-in slide-in-from-bottom duration-200">
                    <div className="flex items-center space-x-3 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-sm text-red-600 font-medium">
                        Recording {formatDuration(recordingTime)}
                      </span>
                      <span className="text-xs text-red-500">Release to send</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-indigo-100/50">
              <div className="text-center animate-in fade-in duration-1000">
                <div className="relative mb-6">
                  <div className="text-8xl mb-4 animate-bounce">💬</div>
                  <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ready to Connect!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                  Select a conversation from the sidebar to start chatting with your customers and partners
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">{onlineUsers.length} users online</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalChatUI;
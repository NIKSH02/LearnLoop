
// this context is for personal chat only 

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext();

const ChatProvider = ({ children = null }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    console.log("usesr ingo " , userInfo);
    setUser(userInfo);

    if (!userInfo) {
      nav('/login')
    }
  }, [nav]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
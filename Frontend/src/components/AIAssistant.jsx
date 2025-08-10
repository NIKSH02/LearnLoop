import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  X, 
  Volume2,
  Bot,
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from './Navbar';

const AIAssistant = () => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'hinglish', name: 'Hinglish', flag: '🇮🇳' }
  ];

  const aiNames = [
    { name: 'StudyMitra', description: 'Your Learning Companion' },
    { name: 'EduGenius', description: 'AI Study Assistant' },
    { name: 'LearnBot', description: 'Smart Study Helper' },
    { name: 'AcademiAI', description: 'Academic Assistant' }
  ];

  const [selectedAI] = useState(aiNames[0]);

  // Initialize with welcome message and language selection
  useEffect(() => {
    const initialWelcomeMessage = {
      id: Date.now(),
      text: `Hello! I am your ${selectedAI.name}, ${selectedAI.description}. \n\nI'm here to help you with your studies, homework, and any academic questions you might have.\n\nWhich language are you most comfortable with?`,
      sender: 'ai',
      timestamp: new Date(),
      showLanguageOptions: true
    };
    setMessages([initialWelcomeMessage]);
  }, [selectedAI]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    
    // Add confirmation message
    const confirmationMessage = {
      id: Date.now(),
      text: getWelcomeMessage(language.code),
      sender: 'ai',
      timestamp: new Date(),
      language: language.code
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const getWelcomeMessage = (langCode) => {
    const welcomeMessages = {
      'en': `Perfect! I'll communicate with you in English. Now I'm ready to help you with your studies, homework, assignments, or any academic questions. What would you like to work on today?`,
      'hi': `बहुत बढ़िया! मैं आपसे हिंदी में बात करूंगा। अब मैं आपकी पढ़ाई, गृहकार्य, असाइनमेंट या किसी भी शैक्षणिक प्रश्न में मदद करने के लिए तैयार हूं। आज आप किस पर काम करना चाहते हैं?`,
      'mr': `उत्तम! मी तुमच्याशी मराठीत बोलेन। आता मी तुमच्या अभ्यासात, गृहपाठात, असाइनमेंटमध्ये किंवा कोणत्याही शैक्षणिक प्रश्नात मदत करण्यासाठी तयार आहे। आज तुम्ही कशावर काम करू इच्छिता?`,
      'hinglish': `Great choice! Main aapse Hinglish mein baat karunga। Ab main aapki studies, homework, assignments ya koi bhi academic questions mein help karne ke liye ready hun। Aaj aap kis topic pe work karna chahte hain?`
    };
    return welcomeMessages[langCode] || welcomeMessages['en'];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !uploadedImage) return;
    if (!selectedLanguage) return; // Don't send messages without language selection

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      image: uploadedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setUploadedImage(null);
    setIsLoading(true);

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputText, selectedLanguage.code),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input, langCode) => {
    // This would be replaced with actual OpenAI API integration
    const responses = {
      'en': `I understand you're asking about "${input}". Let me help you with that! Based on your query, here's what I can suggest...`,
      'hi': `मैं समझ गया कि आप "${input}" के बारे में पूछ रहे हैं। मैं इसमें आपकी मदद करता हूँ! आपके प्रश्न के आधार पर, यह सुझाव है...`,
      'mr': `मला समजले की तुम्ही "${input}" बद्दल विचारत आहात। मी यात तुमची मदत करतो! तुमच्या प्रश्नावर आधारित, हा सल्ला आहे...`,
      'hinglish': `Main samajh gaya ki aap "${input}" ke baare mein pooch rahe hain. Main isme aapki help karta hun! Aapke question ke base par, yeh suggestion hai...`
    };
    return responses[langCode] || responses['en'];
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        // Here you would send the audio to OpenAI Whisper API for transcription
        handleVoiceToText(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleVoiceToText = async (audioBlob) => {
    // Simulate voice-to-text conversion (replace with OpenAI Whisper API)
    // TODO: Implement actual voice-to-text with audioBlob
    console.log('Processing audio blob:', audioBlob);
    setInputText('This is a simulated voice-to-text conversion. Replace with actual Whisper API.');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window && selectedLanguage) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage.code === 'hi' ? 'hi-IN' : 
                      selectedLanguage.code === 'mr' ? 'mr-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
        isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Chat Interface */}
      <div className="max-w-6xl mx-auto p-6 flex flex-col" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '100px' }}>        {/* Header */}
        <div className={`rounded-2xl p-6 mb-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        } backdrop-blur-lg`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedAI.name}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedAI.description} • {selectedLanguage?.name || 'Select Language'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className={`flex-1 rounded-2xl p-6 overflow-hidden ${
          isDarkMode 
            ? 'bg-gray-800/30 border border-gray-700' 
            : 'bg-white/50 border border-gray-200'
        } backdrop-blur-lg`}>
          <div className="h-full overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-100'
                      : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.image && (
                    <img src={message.image} alt="Uploaded" className="w-full rounded-lg mb-2" />
                  )}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  
                  {/* Language Selection Buttons */}
                  {message.showLanguageOptions && (
                    <div className="mt-4 space-y-2">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang)}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-left ${
                            isDarkMode 
                              ? 'border-gray-600 hover:border-blue-500 bg-gray-600 hover:bg-gray-500' 
                              : 'border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{lang.flag}</span>
                            <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {lang.name}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {message.sender === 'ai' && !message.showLanguageOptions && (
                    <button
                      onClick={() => speakText(message.text)}
                      className="mt-2 p-1 rounded opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-2xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className={`mt-6 rounded-2xl p-4 ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700' 
            : 'bg-white/70 border border-gray-200'
        } backdrop-blur-lg`}>
          
          {uploadedImage && (
            <div className="mb-4 relative inline-block">
              <img src={uploadedImage} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
            </button>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Type your message in ${selectedLanguage?.name || 'your selected language'}...`}
              disabled={!selectedLanguage}
              className={`flex-1 p-3 rounded-xl border-none outline-none transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              } ${!selectedLanguage ? 'opacity-50 cursor-not-allowed' : ''}`}
            />

            <button
              onClick={handleSendMessage}
              disabled={(!inputText.trim() && !uploadedImage) || !selectedLanguage}
              className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

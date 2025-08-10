import React, { useState } from 'react';
import { Clock, Users, BookOpen, Calendar, Trophy, CheckCircle, Vote, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer.jsx';

// Poll Card Component
const SubjectPollCard = ({ 
  poll, 
  onVote, 
  hasVoted = false, 
  isLoading = false 
}) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showResults, setShowResults] = useState(hasVoted || false);

  // Format time remaining
  const formatTimeRemaining = (timeMs) => {
    if (timeMs <= 0) return 'Voting Ended';
    
    const hours = Math.floor(timeMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} left`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else {
      return `${minutes}m left`;
    }
  };

  // Handle vote submission
  const handleVote = async () => {
    if (selectedSubject !== null && onVote && !hasVoted) {
      await onVote(poll._id, selectedSubject);
      setShowResults(true);
    }
  };

  // Get subject icon based on subject type
  const getSubjectIcon = (subjectName) => {
    const name = subjectName.toLowerCase();
    if (name.includes('data') || name.includes('algorithm')) return '🔢';
    if (name.includes('web') || name.includes('react') || name.includes('javascript')) return '💻';
    if (name.includes('database') || name.includes('sql')) return '🗄️';
    if (name.includes('machine') || name.includes('ai') || name.includes('ml')) return '🤖';
    if (name.includes('network') || name.includes('security')) return '🔒';
    if (name.includes('mobile') || name.includes('android') || name.includes('ios')) return '📱';
    if (name.includes('python') || name.includes('java') || name.includes('programming')) return '⚡';
    return '📚';
  };

  const isActive = poll && poll.isActive && poll.timeRemaining > 0;
  const totalVotes = poll ? poll.totalVotes || 0 : 0;
  const winningSubject = poll ? poll.winner : null;

  if (!poll) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
        <p className="text-gray-500">Poll data not available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white via-[#7B61FF]/3 to-[#7968ED]/5 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B61FF] to-[#7968ED] p-6 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`
               }}
          />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 leading-tight">{poll.title}</h3>
              <p className="text-[#d7d4e0] opacity-90 leading-relaxed">{poll.description}</p>
            </div>
            <div className="flex items-center space-x-3 ml-6">
              {hasVoted && (
                <div className="flex items-center bg-green-500 bg-opacity-25 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  <span className="text-xs font-semibold">Voted</span>
                </div>
              )}
              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                isActive ? 'bg-green-500 bg-opacity-25 text-green-100' : 'bg-red-500 bg-opacity-25 text-red-100'
              }`}>
                {isActive ? 'Active Poll' : poll.status === 'ended' ? 'Poll Ended' : 'Inactive'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-[#d7d4e0] border-opacity-30">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center bg-white bg-opacity-15 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-medium">{formatTimeRemaining(poll.timeRemaining)}</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-15 px-3 py-1.5 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                <span className="font-medium">{totalVotes} votes</span>
              </div>
            </div>
            <div className="text-sm font-semibold bg-white bg-opacity-15 px-3 py-1.5 rounded-full">
              Weekly Session Poll
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-white via-gray-50/50 to-[#7B61FF]/5">
        {/* Poll Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-br from-[#7B61FF]/10 to-[#7968ED]/10 rounded-xl border border-[#7B61FF]/20">
            <div className="text-2xl font-bold text-[#7B61FF] mb-1">{poll.participationRate || 0}%</div>
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Participation</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#7968ED]/10 to-[#7B61FF]/10 rounded-xl border border-[#7968ED]/20">
            <div className="text-2xl font-bold text-[#7968ED] mb-1">{poll.eligibleStudentCount || 0}</div>
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Eligible Students</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-[#7B61FF]/10 to-[#7968ED]/10 rounded-xl border border-[#7B61FF]/20">
            <div className="text-2xl font-bold text-[#7B61FF] mb-1">{poll.subjectOptions?.length || 0}</div>
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Subject Options</div>
          </div>
        </div>

        {/* Show results only after voting or if poll ended */}
        {(showResults || hasVoted || poll.status === 'ended') && winningSubject ? (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-500 rounded-full mr-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-green-800">🎉 Winning Subject - Next Weekend Session</h4>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-green-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getSubjectIcon(winningSubject.subjectName)}</span>
                  <div>
                    <h5 className="text-lg font-bold text-gray-800">{winningSubject.subjectName}</h5>
                    <p className="text-sm font-medium text-gray-600">{winningSubject.subjectCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{winningSubject.votes} votes</div>
                  <div className="text-xs text-green-500 font-medium">Winner!</div>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">{winningSubject.sessionDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{winningSubject.sessionTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="font-medium">{winningSubject.venue || 'Online'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Voting Interface - only shown before voting */
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-800 flex items-center">
                <div className="p-2 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] rounded-full mr-3">
                  <Vote className="w-5 h-5 text-white" />
                </div>
                Vote for Weekend Session Subject
              </h4>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Select your preference
              </div>
            </div>
            
            {poll.subjectOptions?.map((subject, index) => {
              const isSelected = selectedSubject === index;
              
              return (
                <div
                  key={index}
                  className={`border-2 rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'border-[#7B61FF] bg-gradient-to-br from-[#7B61FF]/10 to-[#7968ED]/10 shadow-lg' 
                      : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm'
                  }`}
                  onClick={() => {
                    if (!hasVoted && !showResults && isActive) {
                      setSelectedSubject(isSelected ? null : index);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`text-4xl p-3 rounded-2xl ${
                        isSelected ? 'bg-[#7B61FF]/20' : 'bg-gray-100'
                      }`}>
                        {getSubjectIcon(subject.name)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h5 className="text-lg font-bold text-gray-800">{subject.name}</h5>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{subject.code}</p>
                        {subject.description && (
                          <p className="text-sm text-gray-500 mb-3 leading-relaxed">{subject.description}</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                          {subject.proposedDate && (
                            <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                              <Calendar className="w-3 h-3 mr-1.5 text-[#7B61FF]" />
                              <span className="font-medium">{subject.proposedDate}</span>
                            </div>
                          )}
                          {subject.proposedTime && (
                            <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                              <Clock className="w-3 h-3 mr-1.5 text-[#7968ED]" />
                              <span className="font-medium">{subject.proposedTime}</span>
                            </div>
                          )}
                          {subject.expectedMentor && (
                            <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                              <BookOpen className="w-3 h-3 mr-1.5 text-[#7B61FF]" />
                              <span className="font-medium">{subject.expectedMentor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      {isSelected && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#7968ED] flex items-center justify-center shadow-lg">
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Buttons - only show before voting */}
        {!showResults && !hasVoted && isActive && (
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={handleVote}
              disabled={selectedSubject === null || isLoading}
              className={`flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                selectedSubject !== null && !isLoading
                  ? 'bg-gradient-to-r from-[#7B61FF] to-[#7968ED] text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                  Submitting Vote...
                </>
              ) : (
                <>
                  <span className="mr-3 text-xl">🗳️</span>
                  Submit Vote
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main PollPage component with sample data
const PollPage = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([
    {
      _id: '1',
      title: 'Weekend Session Poll - Week 12',
      description: 'Vote for which subject session you want this weekend',
      timeRemaining: 2 * 24 * 60 * 60 * 1000, // 2 days
      totalVotes: 67,
      participationRate: 85,
      eligibleStudentCount: 79,
      isActive: true,
      status: 'active',
      subjectOptions: [
        {
          _id: 'sub1',
          name: 'Data Structures & Algorithms',
          code: 'CS301',
          description: 'Advanced tree algorithms and graph traversal',
          proposedDate: 'Saturday, Dec 16',
          proposedTime: '10:00 AM - 12:00 PM',
          expectedMentor: 'Dr. Priya Sharma',
          votesReceived: 32
        },
        {
          _id: 'sub2',
          name: 'React Development',
          code: 'CS401',
          description: 'Hooks, Context API, and State Management',
          proposedDate: 'Sunday, Dec 17',
          proposedTime: '2:00 PM - 4:00 PM',
          expectedMentor: 'Prof. Arjun Patel',
          votesReceived: 21
        },
        {
          _id: 'sub3',
          name: 'Machine Learning Basics',
          code: 'CS501',
          description: 'Linear regression and classification algorithms',
          proposedDate: 'Saturday, Dec 16',
          proposedTime: '3:00 PM - 5:00 PM',
          expectedMentor: 'Dr. Sneha Reddy',
          votesReceived: 14
        }
      ]
    },
    {
      _id: '2',
      title: 'Weekend Session Poll - Week 11',
      description: 'Previous week\'s poll results',
      timeRemaining: 0,
      totalVotes: 84,
      participationRate: 92,
      eligibleStudentCount: 91,
      isActive: false,
      status: 'ended',
      winner: {
        subjectId: 'sub4',
        subjectName: 'Database Management Systems',
        subjectCode: 'CS302',
        votes: 45,
        sessionDate: 'Saturday, Dec 9, 2023',
        sessionTime: '11:00 AM - 1:00 PM',
        venue: 'Lab 204'
      },
      subjectOptions: [
        {
          _id: 'sub4',
          name: 'Database Management Systems',
          code: 'CS302',
          description: 'SQL queries, joins, and database optimization',
          proposedDate: 'Saturday, Dec 9',
          proposedTime: '11:00 AM - 1:00 PM',
          expectedMentor: 'Prof. Rajesh Kumar',
          votesReceived: 45
        },
        {
          _id: 'sub5',
          name: 'Web Development',
          code: 'CS401',
          description: 'Full-stack development with MERN',
          proposedDate: 'Sunday, Dec 10',
          proposedTime: '2:00 PM - 4:00 PM',
          expectedMentor: 'Dr. Meera Singh',
          votesReceived: 25
        },
        {
          _id: 'sub6',
          name: 'Python Programming',
          code: 'CS201',
          description: 'Object-oriented programming concepts',
          proposedDate: 'Saturday, Dec 9',
          proposedTime: '4:00 PM - 6:00 PM',
          expectedMentor: 'Prof. Vikram Gupta',
          votesReceived: 14
        }
      ]
    }
  ]);

  const [votedPolls, setVotedPolls] = useState(new Set(['2'])); // User already voted in poll 2
  const [loading, setLoading] = useState(new Set());

  const handleVote = async (pollId, subjectIndex) => {
    setLoading(prev => new Set([...prev, pollId]));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update poll data
    setPolls(prevPolls => 
      prevPolls.map(poll => {
        if (poll._id === pollId) {
          const updatedSubjects = [...poll.subjectOptions];
          updatedSubjects[subjectIndex].votesReceived += 1;
          
          return {
            ...poll,
            subjectOptions: updatedSubjects,
            totalVotes: poll.totalVotes + 1,
            participationRate: Math.round(((poll.totalVotes + 1) / poll.eligibleStudentCount) * 100)
          };
        }
        return poll;
      })
    );
    
    setVotedPolls(prev => new Set([...prev, pollId]));
    setLoading(prev => {
      const newSet = new Set([...prev]);
      newSet.delete(pollId);
      return newSet;
    });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-[#7B61FF]/8 via-white to-[#7968ED]/8 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#7B61FF]/10"
              >
                <ArrowLeft className="w-6 h-6 text-[#7B61FF]" />
              </button>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#7B61FF] to-[#7968ED] bg-clip-text text-transparent">
                Weekend Session Polls
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              🗳️ Vote for which subject sessions you want on weekends and help shape your learning experience
            </p>
            <div className="mt-6 flex items-center justify-center space-x-8 text-sm font-medium">
              <div className="flex items-center text-[#7B61FF]">
                <div className="w-3 h-3 bg-[#7B61FF] rounded-full mr-2 animate-pulse"></div>
                Active Polls
              </div>
              <div className="flex items-center text-gray-500">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                Ended Polls
              </div>
            </div>
          </div>
          
          {/* Polls Grid - Vertical Layout */}
          <div className="space-y-8">
            {polls.map((poll, index) => (
              <div key={poll._id} className="transform transition-all duration-500 hover:scale-[1.02]">
                <SubjectPollCard
                  poll={poll}
                  onVote={handleVote}
                  hasVoted={votedPolls.has(poll._id)}
                  isLoading={loading.has(poll._id)}
                />
                {index < polls.length - 1 && (
                  <div className="mt-8 flex items-center justify-center">
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#7B61FF]/30 to-transparent"></div>
                    <div className="mx-4 p-2 bg-white rounded-full shadow-md">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] rounded-full"></div>
                    </div>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#7968ED]/30 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Footer Info */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#7968ED]/10 rounded-2xl p-8 border border-[#7B61FF]/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Choose Your Subject</h4>
                  <p className="text-gray-600">Select the subject you want to study this weekend</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7968ED] to-[#7B61FF] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Cast Your Vote</h4>
                  <p className="text-gray-600">Submit your vote and see real-time results</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#7B61FF] to-[#7968ED] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Join the Session</h4>
                  <p className="text-gray-600">Attend the winning subject's weekend session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PollPage;
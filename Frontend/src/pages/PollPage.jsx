import React, { useState } from 'react';
import { Clock, Users, BookOpen, Calendar, Trophy, CheckCircle, Vote, MapPin } from 'lucide-react';

const PollPage = ({ 
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

  const isActive = poll.isActive && poll.timeRemaining > 0;
  const totalVotes = poll.totalVotes || 0;
  const winningSubject = poll.winner;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{poll.title}</h3>
            <p className="text-indigo-100 text-sm opacity-90">{poll.description}</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {hasVoted && (
              <div className="flex items-center bg-green-500 bg-opacity-20 px-2 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Voted</span>
              </div>
            )}
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              isActive ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'
            }`}>
              {isActive ? 'Active' : poll.status === 'ended' ? 'Ended' : 'Inactive'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-indigo-400 border-opacity-30">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTimeRemaining(poll.timeRemaining)}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{totalVotes} votes</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="font-medium">Weekend Session Poll</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Poll Stats */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">{poll.participationRate || 0}%</div>
            <div className="text-xs text-gray-600">Participation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">{poll.eligibleStudentCount || 0}</div>
            <div className="text-xs text-gray-600">Eligible Students</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800">{poll.subjectOptions?.length || 0}</div>
            <div className="text-xs text-gray-600">Subject Options</div>
          </div>
        </div>

        {/* Winner Display (if poll ended) */}
        {winningSubject && poll.status === 'ended' && (
          <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <Trophy className="w-5 h-5 text-green-600 mr-2" />
              <h4 className="font-semibold text-green-800">Winning Subject Session</h4>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getSubjectIcon(winningSubject.subjectName)}</span>
                  <div>
                    <h5 className="font-semibold text-gray-800">{winningSubject.subjectName}</h5>
                    <p className="text-sm text-gray-600">{winningSubject.subjectCode}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">{winningSubject.votes} votes</div>
                </div>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{winningSubject.sessionDate}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{winningSubject.sessionTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{winningSubject.venue || 'Online'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subject Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 mb-2 flex items-center">
            <Vote className="w-4 h-4 mr-2" />
            {poll.status === 'ended' ? 'Final Results' : 'Vote for Weekend Session Subject'}
          </h4>
          
          {poll.subjectOptions?.map((subject, index) => {
            const votePercentage = totalVotes > 0 ? Math.round((subject.votesReceived / totalVotes) * 100) : 0;
            const isSelected = selectedSubject === index;
            const isWinner = winningSubject && subject._id === winningSubject.subjectId;
            
            return (
              <div
                key={index}
                className={`border rounded-lg p-4 transition-all duration-200 ${
                  isWinner
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : isSelected 
                    ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                    : showResults || hasVoted || !isActive
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
                }`}
                onClick={() => {
                  if (!hasVoted && !showResults && isActive) {
                    setSelectedSubject(isSelected ? null : index);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{getSubjectIcon(subject.name)}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-semibold text-gray-800">{subject.name}</h5>
                        {isWinner && (
                          <div className="flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            <Trophy className="w-3 h-3 mr-1" />
                            <span className="text-xs font-medium">Winner</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{subject.code}</p>
                      {subject.description && (
                        <p className="text-xs text-gray-500 mt-1">{subject.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        {subject.proposedDate && (
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{subject.proposedDate}</span>
                          </div>
                        )}
                        {subject.proposedTime && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{subject.proposedTime}</span>
                          </div>
                        )}
                        {subject.expectedMentor && (
                          <div className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            <span>{subject.expectedMentor}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {(showResults || hasVoted) && (
                      <div className="text-sm">
                        <div className="font-semibold text-gray-800">{subject.votesReceived} votes</div>
                        <div className="text-xs text-gray-600">{votePercentage}%</div>
                      </div>
                    )}
                    {isSelected && !hasVoted && !showResults && (
                      <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress bar for results */}
                {(showResults || hasVoted) && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isWinner 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}
                        style={{ width: `${votePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setShowResults(!showResults)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            disabled={!hasVoted && totalVotes === 0}
          >
            {showResults ? 'Hide Results' : 'View Results'}
          </button>
          
          {!hasVoted && isActive && (
            <button
              onClick={handleVote}
              disabled={selectedSubject === null || isLoading}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedSubject !== null && !isLoading
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? 'Submitting Vote...' : 'Submit Vote'}
            </button>
          )}
          
          {hasVoted && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-1" />
              Vote Submitted
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage component with sample data
const SubjectPollExample = () => {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weekend Session Polls</h1>
          <p className="text-gray-600">Vote for which subject sessions you want on weekends</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {polls.map(poll => (
            <SubjectPollCard
              key={poll._id}
              poll={poll}
              onVote={handleVote}
              hasVoted={votedPolls.has(poll._id)}
              isLoading={loading.has(poll._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollPage;
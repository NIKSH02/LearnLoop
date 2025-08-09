import React, { useState, useRef, useEffect } from "react";
import {
  User,
  GraduationCap,
  BookOpen,
  Users,
  Bell,
  Star,
  Clock,
  Plus,
  X,
  Save,
  Edit3,
  Camera,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Eye,
  Activity,
  Calendar,
  Award,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import StudentService from "../services/studentService";

// Subject Skills Input Component
const SubjectSkillsInput = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const { isDarkMode } = useTheme();
  const inputRef = useRef(null);

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      onChange([...skills, inputValue.trim()]);
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-3">
      <div
        className={`flex flex-wrap gap-2 min-h-[40px] p-3 rounded-lg border transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[#7968ed] text-white rounded-full text-sm animate-fadeIn"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="hover:text-gray-200 transition-colors ml-1"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a strong subject..."
          className={`flex-1 px-4 py-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
          }`}
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

// Main Student Profile Component
const StudentProfile = () => {
  const { isDarkMode } = useTheme();

  // Section-specific states
  const [sectionStates, setSectionStates] = useState({
    profile: { isEditing: true, isSaved: false, isLoading: false },
    academic: { isEditing: true, isSaved: false, isLoading: false },
    subjects: { isEditing: false, isSaved: true, isLoading: false }, // Auto-complete based on academic info
    strongSubjects: { isEditing: true, isSaved: false, isLoading: false },
    mentors: { isEditing: false, isSaved: true, isLoading: false }, // View-only section
    mentees: { isEditing: false, isSaved: true, isLoading: false }, // For 2nd year+ students
    activity: { isEditing: false, isSaved: true, isLoading: false },
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [pendingImageFile, setPendingImageFile] = useState(null);

  const [studentData, setStudentData] = useState({
    name: "",
    phone: "",
    branch: "",
    year: "",
    currentSemester: "",
    profileImage: null,
    strongSubjects: [],
    academicInfo: {
      cgpa: 0,
      completedSemesters: [],
    },
    subjects: [], // Auto-fetched based on semester
    mentors: [],
    mentees: [],
    isActive: true,
    totalSessions: 0,
    averageRating: 0,
  });

  // Load student profile data on component mount
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const response = await StudentService.getProfile();
        if (response.success && response.data) {
          const profile = response.data;
          setStudentData(profile);
          setProfileExists(true);
          setIsDataLoaded(true);

          // Update section states based on existing data
          const updatedStates = {};
          profileSteps.forEach((step) => {
            const hasData = hasRequiredFields(profile, step.id);
            updatedStates[step.id] = {
              isEditing: !hasData,
              isSaved: hasData,
              isLoading: false,
            };
          });
          setSectionStates((prev) => ({ ...prev, ...updatedStates }));
        }
      } catch (error) {
        console.error("Error loading student profile:", error);
        setProfileExists(false);
        setIsDataLoaded(true);
      }
    };

    loadStudentData();
  }, []);

  // Update section states when studentData changes
  useEffect(() => {
    if (!isDataLoaded) return;

    const updatedStates = {};
    profileSteps.forEach((step) => {
      if (!sectionStates[step.id]?.isEditing) {
        const hasData = hasRequiredFields(studentData, step.id);
        if (sectionStates[step.id]?.isSaved !== hasData) {
          updatedStates[step.id] = {
            ...sectionStates[step.id],
            isSaved: hasData,
          };
        }
      }
    });

    if (Object.keys(updatedStates).length > 0) {
      setSectionStates((prev) => ({ ...prev, ...updatedStates }));
    }
  }, [isDataLoaded]);

  const hasRequiredFields = (data, sectionId) => {
    const dataToCheck = data || studentData;
    switch (sectionId) {
      case "profile":
        return dataToCheck.name && dataToCheck.phone && dataToCheck.branch;
      case "academic":
        return (
          dataToCheck.year &&
          dataToCheck.currentSemester &&
          dataToCheck.academicInfo?.cgpa
        );
      case "subjects":
        return true; // Auto-complete based on academic info
      case "strongSubjects":
        return (
          dataToCheck.strongSubjects && dataToCheck.strongSubjects.length > 0
        );
      case "mentors":
        return true; // Always complete (view-only)
      case "mentees":
        return true; // Always complete (conditional display)
      case "activity":
        return true; // Always complete (view-only)
      default:
        return false;
    }
  };

  const [activeSection, setActiveSection] = useState("overview");
  const [currentStep, setCurrentStep] = useState(0);

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "profile", label: "Profile Information", icon: User },
    { id: "academic", label: "Academic Info", icon: GraduationCap },
    { id: "subjects", label: "Current Subjects", icon: BookOpen },
    { id: "strongSubjects", label: "Strong Subjects", icon: Star },
    { id: "mentors", label: "Your Mentors", icon: Users },
    ...(parseInt(studentData.year) > 1
      ? [{ id: "mentees", label: "Your Mentees", icon: Users }]
      : []),
    { id: "activity", label: "Activity & Notifications", icon: Bell },
  ];

  const profileSteps = [
    { id: "profile", label: "Profile Information", required: true },
    { id: "academic", label: "Academic Details", required: true },
    { id: "subjects", label: "Current Subjects", required: true },
    { id: "strongSubjects", label: "Strong Subjects", required: true },
  ];

  // Check if student is eligible to mentor (2nd year and above)
  const canMentor = () => {
    return parseInt(studentData.year) > 1;
  };

  // Section-specific handlers
  const handleSectionSave = async (sectionName) => {
    setSectionStates((prev) => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], isLoading: true },
    }));

    try {
      const sectionData = getSectionData(sectionName);

      if (!profileExists) {
        // For new profiles, use createProfile with all current data
        const allStudentData = {
          name: studentData.name,
          phone: studentData.phone,
          branch: studentData.branch,
          year: studentData.year,
          currentSemester: studentData.currentSemester,
          strongSubjects: studentData.strongSubjects,
          academicInfo: studentData.academicInfo,
          isActive: studentData.isActive,
        };

        const response = await StudentService.createProfile(
          allStudentData,
          pendingImageFile
        );

        if (response.success && response.data) {
          setStudentData(response.data);
          setProfileExists(true);
          setPendingImageFile(null);
        }
      } else {
        await StudentService.updateProfile(sectionData);
      }

      setSectionStates((prev) => ({
        ...prev,
        [sectionName]: { isEditing: false, isSaved: true, isLoading: false },
      }));

      setShowSuccessMessage(`✅ ${sectionName} section saved successfully!`);
      setTimeout(() => setShowSuccessMessage(""), 3000);
    } catch (error) {
      console.error(`Error saving ${sectionName} section:`, error);
      setSectionStates((prev) => ({
        ...prev,
        [sectionName]: { ...prev[sectionName], isLoading: false },
      }));
      setShowSuccessMessage(
        `❌ Error saving ${sectionName} section. Please try again.`
      );
      setTimeout(() => setShowSuccessMessage(""), 5000);
    }
  };

  const getSectionData = (sectionName) => {
    switch (sectionName) {
      case "profile":
        return {
          name: studentData.name,
          phone: studentData.phone,
          branch: studentData.branch,
        };
      case "academic":
        return {
          year: studentData.year,
          currentSemester: studentData.currentSemester,
          academicInfo: studentData.academicInfo,
        };
      case "strongSubjects":
        return {
          strongSubjects: studentData.strongSubjects,
        };
      default:
        return {};
    }
  };

  const handleSectionEdit = (sectionName) => {
    setSectionStates((prev) => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], isEditing: true },
    }));
  };

  const updateStudentData = (field, value) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
  };

  // Progress calculation
  const calculateProgress = () => {
    const requiredSections = profileSteps.filter((step) => step.required);
    const completedSections = requiredSections.filter(
      (step) => sectionStates[step.id]?.isSaved
    );
    return Math.round(
      (completedSections.length / requiredSections.length) * 100
    );
  };

  const getSectionCompletionStatus = (sectionId) => {
    const state = sectionStates[sectionId];
    if (state?.isSaved) return "completed";
    if (state?.isEditing && hasRequiredFields(studentData, sectionId))
      return "in-progress";
    return "not-started";
  };

  const isProfileComplete = () => {
    return profileSteps.every((step) =>
      step.required ? sectionStates[step.id]?.isSaved : true
    );
  };

  // Navigation handlers
  const handleNext = () => {
    const currentIndex = profileSteps.findIndex(
      (step) => step.id === activeSection
    );
    if (currentIndex < profileSteps.length - 1) {
      const nextStep = profileSteps[currentIndex + 1];
      setActiveSection(nextStep.id);
      setCurrentStep(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    const currentIndex = profileSteps.findIndex(
      (step) => step.id === activeSection
    );
    if (currentIndex > 0) {
      const prevStep = profileSteps[currentIndex - 1];
      setActiveSection(prevStep.id);
      setCurrentStep(currentIndex - 1);
    }
  };

  const canProceedToNext = (sectionId) => {
    const step = profileSteps.find((s) => s.id === sectionId);
    return step?.required ? hasRequiredFields(studentData, sectionId) : true;
  };

  // Helper function to navigate to a section and update currentStep
  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);
    const stepIndex = profileSteps.findIndex((step) => step.id === sectionId);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  };

  // Utility functions for consistent styling
  const getCardClasses = () =>
    `rounded-2xl p-8 shadow-sm transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    } border`;

  const getHeadingClasses = () =>
    `text-2xl font-semibold flex items-center gap-3 transition-colors duration-300 ${
      isDarkMode ? "text-white" : "text-gray-900"
    }`;

  const getLabelClasses = () =>
    `block text-sm font-medium mb-2 transition-colors duration-300 ${
      isDarkMode ? "text-gray-300" : "text-gray-700"
    }`;

  const getInputClasses = () =>
    `w-full px-4 py-3 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#7968ed] focus:border-transparent ${
      isDarkMode
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
    }`;

  const getReadOnlyClasses = () =>
    `w-full px-4 py-3 border rounded-lg transition-colors duration-300 ${
      isDarkMode
        ? "bg-gray-700 border-gray-600 text-white"
        : "bg-gray-100 border-gray-200 text-gray-900"
    }`;

  const getEmptyStateClasses = () =>
    `p-8 text-center rounded-lg border transition-colors duration-300 ${
      isDarkMode
        ? "text-gray-400 bg-gray-700 border-gray-600"
        : "text-gray-500 bg-gray-50 border-gray-200"
    }`;

  // Image upload handlers
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    updateStudentData("profileImage", null);
    setPendingImageFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setShowSuccessMessage("❌ File size must be less than 5MB");
        setTimeout(() => setShowSuccessMessage(""), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        updateStudentData("profileImage", e.target.result);
        setPendingImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1
                className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Complete Your Student Profile
              </h1>
              <p
                className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Set up your profile to connect with mentors and start learning
              </p>
            </div>

            {/* Progress Overview */}
            <div
              className={`p-6 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-xl font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Profile Completion Progress
                </h2>
                <span
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    calculateProgress() === 100
                      ? "text-green-500"
                      : "text-[#7968ed]"
                  }`}
                >
                  {calculateProgress()}%
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className={`w-full bg-gray-200 rounded-full h-3 mb-6 transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className="bg-gradient-to-r from-[#7968ed] to-[#6b5ce0] h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>

              {/* Section Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileSteps.map((step, index) => {
                  const status = getSectionCompletionStatus(step.id);
                  const StatusIcon =
                    status === "completed"
                      ? CheckCircle
                      : status === "in-progress"
                      ? AlertCircle
                      : Eye;

                  return (
                    <div
                      key={step.id}
                      onClick={() => navigateToSection(step.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                        status === "completed"
                          ? isDarkMode
                            ? "bg-green-900/20 border-green-600 hover:bg-green-900/30"
                            : "bg-green-50 border-green-300 hover:bg-green-100"
                          : status === "in-progress"
                          ? isDarkMode
                            ? "bg-orange-900/20 border-orange-600 hover:bg-orange-900/30"
                            : "bg-orange-50 border-orange-300 hover:bg-orange-100"
                          : isDarkMode
                          ? "bg-gray-800 border-gray-600 hover:bg-gray-750"
                          : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <StatusIcon
                          size={24}
                          className={`transition-colors duration-300 ${
                            status === "completed"
                              ? "text-green-500"
                              : status === "in-progress"
                              ? "text-orange-500"
                              : isDarkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <h3
                            className={`font-medium transition-colors duration-300 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {step.label}
                          </h3>
                          <p
                            className={`text-sm transition-colors duration-300 ${
                              status === "completed"
                                ? "text-green-600"
                                : status === "in-progress"
                                ? "text-orange-600"
                                : isDarkMode
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {status === "completed"
                              ? "Completed"
                              : status === "in-progress"
                              ? "In Progress"
                              : "Not Started"}
                          </p>
                        </div>
                        <ChevronRight
                          size={20}
                          className={`transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {
                        profileSteps.filter(
                          (step) => sectionStates[step.id]?.isSaved
                        ).length
                      }
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Completed
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {studentData.mentors.length}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Mentors
                    </div>
                  </div>
                  <div>
                    <div
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {canMentor() ? studentData.mentees.length : "N/A"}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Mentees
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 text-center">
                {isProfileComplete() ? (
                  <button
                    onClick={() => navigateToSection("profile")}
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-300"
                  >
                    View Complete Profile
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const nextIncomplete = profileSteps.find(
                        (step) => !sectionStates[step.id]?.isSaved
                      );
                      if (nextIncomplete) {
                        navigateToSection(nextIncomplete.id);
                      }
                    }}
                    className="px-8 py-3 bg-[#7968ed] hover:bg-[#6b5ce0] text-white font-medium rounded-lg transition-all duration-300"
                  >
                    Continue Setup
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={getHeadingClasses()}>
                  <User className="text-[#7968ed]" size={24} />
                  Profile Information
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.profile.isSaved &&
                    !sectionStates.profile.isEditing && (
                      <button
                        onClick={() => handleSectionEdit("profile")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    )}
                  {sectionStates.profile.isEditing && (
                    <button
                      onClick={() => handleSectionSave("profile")}
                      disabled={sectionStates.profile.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.profile.isLoading
                        ? "Saving..."
                        : sectionStates.profile.isSaved
                        ? "Save Changes"
                        : "Save Profile"}
                      {sectionStates.profile.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-8 mb-8">
                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#7968ed]/20 shadow-lg transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    {studentData.profileImage ? (
                      <img
                        src={studentData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User
                        size={48}
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>

                  {/* Image Upload Section */}
                  {sectionStates.profile.isEditing && (
                    <div className="mt-4 flex flex-col gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        onClick={handleImageUpload}
                        className={`flex items-center gap-2 px-4 py-2 border text-sm rounded-lg transition-all ${
                          studentData.profileImage
                            ? isDarkMode
                              ? "bg-gray-600 hover:bg-gray-500 border-gray-500 text-gray-200"
                              : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
                            : "bg-[#7968ed] hover:bg-[#6b5ce0] border-[#7968ed] text-white"
                        }`}
                      >
                        {studentData.profileImage ? (
                          <>
                            <Edit3 size={16} />
                            Edit Image
                          </>
                        ) : (
                          <>
                            <Camera size={16} />
                            Upload Photo
                          </>
                        )}
                      </button>
                      {studentData.profileImage && (
                        <button
                          onClick={handleRemoveImage}
                          className={`flex items-center gap-2 px-4 py-2 border text-sm rounded-lg transition-all ${
                            isDarkMode
                              ? "bg-red-900/50 hover:bg-red-900/70 border-red-700 text-red-300"
                              : "bg-red-50 hover:bg-red-100 border-red-200 text-red-600"
                          }`}
                        >
                          <X size={16} />
                          Remove Photo
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={getLabelClasses()}>Full Name</label>
                      {sectionStates.profile.isEditing ? (
                        <input
                          type="text"
                          value={studentData.name}
                          onChange={(e) =>
                            updateStudentData("name", e.target.value)
                          }
                          placeholder="Enter your full name"
                          className={getInputClasses()}
                        />
                      ) : (
                        <div className={getReadOnlyClasses()}>
                          {studentData.name || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className={getLabelClasses()}>Phone Number</label>
                      {sectionStates.profile.isEditing ? (
                        <input
                          type="tel"
                          value={studentData.phone}
                          onChange={(e) =>
                            updateStudentData("phone", e.target.value)
                          }
                          placeholder="Enter your phone number"
                          className={getInputClasses()}
                        />
                      ) : (
                        <div className={getReadOnlyClasses()}>
                          {studentData.phone || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className={getLabelClasses()}>Branch</label>
                    {sectionStates.profile.isEditing ? (
                      <select
                        value={studentData.branch}
                        onChange={(e) =>
                          updateStudentData("branch", e.target.value)
                        }
                        className={getInputClasses()}
                      >
                        <option value="">Select Branch</option>
                        <option value="Computer">Computer Engineering</option>
                        <option value="IT">Information Technology</option>
                        <option value="AIML">
                          Artificial Intelligence & Machine Learning
                        </option>
                        <option value="ECS">
                          Electronics & Communication Systems
                        </option>
                      </select>
                    ) : (
                      <div className={getReadOnlyClasses()}>
                        {studentData.branch || "Not provided"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "academic":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={getHeadingClasses()}>
                  <GraduationCap className="text-[#7968ed]" size={24} />
                  Academic Information
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.academic.isSaved &&
                    !sectionStates.academic.isEditing && (
                      <button
                        onClick={() => handleSectionEdit("academic")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    )}
                  {sectionStates.academic.isEditing && (
                    <button
                      onClick={() => handleSectionSave("academic")}
                      disabled={sectionStates.academic.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.academic.isLoading
                        ? "Saving..."
                        : sectionStates.academic.isSaved
                        ? "Save Changes"
                        : "Save Academic Info"}
                      {sectionStates.academic.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={getLabelClasses()}>Current Year</label>
                    {sectionStates.academic.isEditing ? (
                      <select
                        value={studentData.year}
                        onChange={(e) =>
                          updateStudentData("year", e.target.value)
                        }
                        className={getInputClasses()}
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    ) : (
                      <div className={getReadOnlyClasses()}>
                        {studentData.year
                          ? `${studentData.year}${
                              studentData.year === "1"
                                ? "st"
                                : studentData.year === "2"
                                ? "nd"
                                : studentData.year === "3"
                                ? "rd"
                                : "th"
                            } Year`
                          : "Not provided"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={getLabelClasses()}>
                      Current Semester
                    </label>
                    {sectionStates.academic.isEditing ? (
                      <select
                        value={studentData.currentSemester}
                        onChange={(e) => {
                          const semester = e.target.value;
                          updateStudentData("currentSemester", semester);
                          // Auto-generate completed semesters
                          if (semester) {
                            const completedSems = [];
                            for (let i = 1; i < parseInt(semester); i++) {
                              completedSems.push(i);
                            }
                            updateStudentData("academicInfo", {
                              ...studentData.academicInfo,
                              completedSemesters: completedSems,
                            });
                          }
                        }}
                        className={getInputClasses()}
                      >
                        <option value="">Select Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <option key={sem} value={sem}>
                            Semester {sem}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className={getReadOnlyClasses()}>
                        {studentData.currentSemester
                          ? `Semester ${studentData.currentSemester}`
                          : "Not provided"}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={getLabelClasses()}>CGPA</label>
                    {sectionStates.academic.isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={studentData.academicInfo?.cgpa || ""}
                        onChange={(e) => {
                          const cgpa = e.target.value;
                          updateStudentData("academicInfo", {
                            ...studentData.academicInfo,
                            cgpa: cgpa,
                          });
                        }}
                        placeholder="Enter your CGPA (0-10)"
                        className={getInputClasses()}
                      />
                    ) : (
                      <div className={getReadOnlyClasses()}>
                        {studentData.academicInfo?.cgpa
                          ? `${studentData.academicInfo.cgpa}/10`
                          : "Not provided"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={getLabelClasses()}>
                      Completed Semesters
                    </label>
                    <div className={getReadOnlyClasses()}>
                      {studentData.academicInfo?.completedSemesters?.length > 0
                        ? `${
                            studentData.academicInfo.completedSemesters.length
                          } semesters (${studentData.academicInfo.completedSemesters.join(
                            ", "
                          )})`
                        : studentData.currentSemester > 1
                        ? `${
                            parseInt(studentData.currentSemester) - 1
                          } semesters`
                        : "None"}
                    </div>
                    {sectionStates.academic.isEditing && (
                      <p
                        className={`text-xs mt-1 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Auto-generated based on current semester
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl font-bold text-[#7968ed]">
                      {studentData.academicInfo?.cgpa || 0}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      CGPA
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl font-bold text-[#7968ed]">
                      {studentData.academicInfo?.completedSemesters?.length ||
                        0}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Completed Semesters
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl font-bold text-[#7968ed]">
                      {studentData.totalSessions}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Total Sessions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "subjects":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <h2 className={getHeadingClasses()}>
                <BookOpen className="text-[#7968ed]" size={24} />
                Current Subjects
              </h2>

              <div className="space-y-4">
                <p
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Subjects are automatically assigned based on your current
                  semester.
                </p>

                {studentData.subjects && studentData.subjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentData.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <h4
                          className={`font-medium transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {subject}
                        </h4>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Semester {studentData.currentSemester}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={getEmptyStateClasses()}>
                    <BookOpen
                      size={48}
                      className={`mx-auto mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-600" : "text-gray-300"
                      }`}
                    />
                    <h3
                      className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      No Subjects Found
                    </h3>
                    <p>
                      Complete your academic information to see your current
                      subjects.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "strongSubjects":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={getHeadingClasses()}>
                  <Star className="text-[#7968ed]" size={24} />
                  Strong Subjects
                </h2>
                <div className="flex items-center gap-3">
                  {sectionStates.strongSubjects.isSaved &&
                    !sectionStates.strongSubjects.isEditing && (
                      <button
                        onClick={() => handleSectionEdit("strongSubjects")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all"
                      >
                        <Edit3 size={16} />
                        Edit
                      </button>
                    )}
                  {sectionStates.strongSubjects.isEditing && (
                    <button
                      onClick={() => handleSectionSave("strongSubjects")}
                      disabled={sectionStates.strongSubjects.isLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#7968ed] hover:bg-[#6b5ce0] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                    >
                      <Save size={16} />
                      {sectionStates.strongSubjects.isLoading
                        ? "Saving..."
                        : sectionStates.strongSubjects.isSaved
                        ? "Save Changes"
                        : "Save Strong Subjects"}
                      {sectionStates.strongSubjects.isLoading && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <p
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Add subjects you feel confident in and can help other students
                  with.
                </p>

                <div>
                  <label className={getLabelClasses()}>Strong Subjects</label>
                  {sectionStates.strongSubjects.isEditing ? (
                    <SubjectSkillsInput
                      skills={studentData.strongSubjects}
                      onChange={(subjects) =>
                        updateStudentData("strongSubjects", subjects)
                      }
                    />
                  ) : (
                    <div
                      className={`min-h-[40px] p-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-100 border-gray-200"
                      }`}
                    >
                      {studentData.strongSubjects.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {studentData.strongSubjects.map((subject, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-[#7968ed] text-white rounded-full text-sm"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span
                          className={
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          No strong subjects added
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case "mentors":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <h2 className={getHeadingClasses()}>
                <Users className="text-[#7968ed]" size={24} />
                Your Mentors
              </h2>

              <div className="space-y-4">
                {studentData.mentors && studentData.mentors.length > 0 ? (
                  studentData.mentors.map((mentor, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#7968ed] rounded-full flex items-center justify-center text-white font-semibold">
                          {mentor.name
                            ? mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "M"}
                        </div>
                        <div>
                          <h3
                            className={`font-medium transition-colors duration-300 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {mentor.name}
                          </h3>
                          <p
                            className={`text-sm transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {mentor.designation || "Mentor"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-[#7968ed]">
                          {mentor.sessions || 0}
                        </div>
                        <div
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Sessions
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={getEmptyStateClasses()}>
                    <Users
                      size={48}
                      className={`mx-auto mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-600" : "text-gray-300"
                      }`}
                    />
                    <h3
                      className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      No Mentors Yet
                    </h3>
                    <p>Connect with mentors to get guidance in your studies.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "mentees":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <h2 className={getHeadingClasses()}>
                <Users className="text-[#7968ed]" size={24} />
                Your Mentees
              </h2>

              <div className="space-y-4">
                {!canMentor() ? (
                  <div className={getEmptyStateClasses()}>
                    <AlertTriangle
                      size={48}
                      className={`mx-auto mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-yellow-500" : "text-yellow-600"
                      }`}
                    />
                    <h3
                      className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      You're Too Young to be a Mentor
                    </h3>
                    <p>
                      Mentoring is available for 2nd year students and above.
                      Focus on your studies and connect with mentors to learn!
                    </p>
                  </div>
                ) : studentData.mentees && studentData.mentees.length > 0 ? (
                  studentData.mentees.map((mentee, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#7968ed] rounded-full flex items-center justify-center text-white font-semibold">
                          {mentee.name
                            ? mentee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "S"}
                        </div>
                        <div>
                          <h3
                            className={`font-medium transition-colors duration-300 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {mentee.name}
                          </h3>
                          <p
                            className={`text-sm transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {mentee.branch} - {mentee.year}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-[#7968ed]">
                          {mentee.progress || 0}%
                        </div>
                        <div
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Progress
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={getEmptyStateClasses()}>
                    <Users
                      size={48}
                      className={`mx-auto mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-600" : "text-gray-300"
                      }`}
                    />
                    <h3
                      className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      No Mentees Yet
                    </h3>
                    <p>
                      Start mentoring other students by sharing your knowledge
                      in your strong subjects.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "activity":
        return (
          <div className="space-y-8">
            <div className={getCardClasses()}>
              <h2 className={getHeadingClasses()}>
                <Bell className="text-[#7968ed]" size={24} />
                Activity & Notifications
              </h2>

              <div className="space-y-4">
                <div className={getEmptyStateClasses()}>
                  <Bell
                    size={48}
                    className={`mx-auto mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  />
                  <h3
                    className={`text-lg font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    No Activity Yet
                  </h3>
                  <p>
                    Your learning activities and notifications will appear here
                    once you start connecting with mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Navbar />

      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`w-64 min-h-screen flex flex-col transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          } border-r`}
        >
          <div className="p-6">
            <h2
              className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-[#7968ed]"
              }`}
            >
              TutorLink
            </h2>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (profileSteps.some((step) => step.id === item.id)) {
                      navigateToSection(item.id);
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? isDarkMode
                        ? "bg-[#7968ed] text-white"
                        : "bg-[#7968ed] text-white"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-[#7968ed] hover:bg-gray-100"
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Profile Photo at Bottom */}
          <div
            className={`p-6 border-t transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#7968ed] flex items-center justify-center overflow-hidden border-2 border-[#7968ed]/20">
                {studentData.profileImage ? (
                  <img
                    src={studentData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-sm truncate transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {studentData.name || "Student"}
                </p>
                <p
                  className={`text-xs truncate transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {studentData.branch || "Student"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <div
            className={`p-6 border-b transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {
                    sidebarItems.find((item) => item.id === activeSection)
                      ?.label
                  }
                </h1>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Manage your student profile and academic information
                </p>
              </div>
              {showSuccessMessage && (
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    showSuccessMessage.includes("❌")
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-green-100 text-green-800 border border-green-200"
                  }`}
                >
                  {showSuccessMessage}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderContent()}

            {/* Navigation and Progress Bar - Only show for profile steps, not overview */}
            {activeSection !== "overview" &&
              activeSection !== "mentors" &&
              activeSection !== "mentees" &&
              activeSection !== "activity" && (
                <div
                  className={`mt-8 p-6 rounded-xl border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Profile Completion
                      </span>
                      <span
                        className={`text-sm font-bold transition-colors duration-300 ${
                          calculateProgress() === 100
                            ? "text-green-500"
                            : "text-[#7968ed]"
                        }`}
                      >
                        {calculateProgress()}%
                      </span>
                    </div>
                    <div
                      className={`w-full bg-gray-200 rounded-full h-2 transition-colors duration-300 ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className="bg-gradient-to-r from-[#7968ed] to-[#6b5ce0] h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${calculateProgress()}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevious}
                      disabled={
                        profileSteps.findIndex(
                          (step) => step.id === activeSection
                        ) === 0
                      }
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        profileSteps.findIndex(
                          (step) => step.id === activeSection
                        ) === 0
                          ? isDarkMode
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>

                    {/* Center Info */}
                    <div className="text-center">
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Step{" "}
                        {profileSteps.findIndex(
                          (step) => step.id === activeSection
                        ) + 1}{" "}
                        of {profileSteps.length}
                      </p>
                    </div>

                    {/* Next/Complete Button */}
                    {profileSteps.findIndex(
                      (step) => step.id === activeSection
                    ) ===
                    profileSteps.length - 1 ? (
                      <button
                        onClick={() => setActiveSection("overview")}
                        disabled={
                          !canProceedToNext(activeSection) ||
                          !isProfileComplete()
                        }
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          !canProceedToNext(activeSection) ||
                          !isProfileComplete()
                            ? isDarkMode
                              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        <CheckCircle size={20} />
                        Complete Profile
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={!canProceedToNext(activeSection)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                          !canProceedToNext(activeSection)
                            ? isDarkMode
                              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#7968ed] hover:bg-[#6b5ce0] text-white"
                        }`}
                      >
                        Next
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  {/* Required fields hint */}
                  {!canProceedToNext(activeSection) && (
                    <div
                      className={`mt-4 p-3 rounded-lg transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-orange-900/20 border-orange-700"
                          : "bg-orange-50 border-orange-200"
                      } border`}
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-orange-500" />
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-orange-300" : "text-orange-700"
                          }`}
                        >
                          Please fill in all required fields to continue
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaStar,
  FaThumbsUp,
  FaComment,
  FaCalendarAlt,
  FaFilter,
  FaReply,
  FaHandshake,
  FaCreditCard,
  FaFileContract,
  FaArrowLeft,
} from "react-icons/fa";

const Feedback = () => {
  const { userType } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("received");
  const [filterRating, setFilterRating] = useState("all");
  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: "",
    projectId: "",
    type: "overall", // overall, communication, quality, timeliness
  });

  // Get current user data from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUserEmail = localStorage.getItem("currentUser");

    if (currentUserEmail) {
      const user = users.find((u) => u.email === currentUserEmail);
      if (user) {
        setCurrentUser({
          ...user,
          role: user.role || userType,
        });
      }
    }
  }, [userType]);

  // Sample feedback data with role-based filtering
  const feedbackData = [
    {
      id: 1,
      from: {
        name: "Ahmed Hassan",
        role: "client",
        avatar: "https://ui-avatars.com/api/?name=Ahmed+Hassan",
      },
      to: {
        name: "Sarah Wilson",
        role: "freelancer",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson",
      },
      project: "E-commerce Website Development",
      rating: 5,
      comment:
        "Excellent work! Sarah delivered exactly what we needed on time. Very professional and responsive.",
      date: "2024-02-15",
      type: "overall",
      helpful: 12,
      replies: [
        {
          id: 1,
          author: "Sarah Wilson",
          text: "Thank you Ahmed! It was a pleasure working with you.",
          date: "2024-02-16",
        },
      ],
    },
    {
      id: 2,
      from: {
        name: "Sarah Wilson",
        role: "freelancer",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson",
      },
      to: {
        name: "Ahmed Hassan",
        role: "client",
        avatar: "https://ui-avatars.com/api/?name=Ahmed+Hassan",
      },
      project: "E-commerce Website Development",
      rating: 5,
      comment:
        "Ahmed was very clear with his requirements and provided timely feedback. Great communication throughout the project.",
      date: "2024-02-15",
      type: "communication",
      helpful: 8,
      replies: [],
    },
    {
      id: 3,
      from: {
        name: "Omar Al-Rashid",
        role: "client",
        avatar: "https://ui-avatars.com/api/?name=Omar+AlRashid",
      },
      to: {
        name: "John Doe",
        role: "freelancer",
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
      },
      project: "Mobile App UI Design",
      rating: 4,
      comment:
        "Good design work, though there were some minor delays. Overall satisfied with the final result.",
      date: "2024-02-10",
      type: "quality",
      helpful: 5,
      replies: [],
    },
    // Additional feedback for different roles
    {
      id: 4,
      from: {
        name: "John Doe",
        role: "freelancer",
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
      },
      to: {
        name: "Omar Al-Rashid",
        role: "client",
        avatar: "https://ui-avatars.com/api/?name=Omar+AlRashid",
      },
      project: "Mobile App UI Design",
      rating: 4,
      comment:
        "Great project to work on. Client was responsive and provided clear feedback throughout the process.",
      date: "2024-02-10",
      type: "overall",
      helpful: 6,
      replies: [],
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const renderStars = (
    rating,
    size = "text-lg",
    interactive = false,
    onRatingChange = null
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`${size} cursor-pointer transition-all ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            } ${interactive ? "hover:text-yellow-400" : ""}`}
            onClick={() =>
              interactive && onRatingChange && onRatingChange(star)
            }
          />
        ))}
      </div>
    );
  };

  const getFilteredFeedback = () => {
    let filtered = feedbackData;

    // Only filter if currentUser is available
    if (currentUser?.role) {
      if (activeTab === "received") {
        filtered = filtered.filter((f) => f.to.role === currentUser.role);
      } else if (activeTab === "given") {
        filtered = filtered.filter((f) => f.from.role === currentUser.role);
      }
    }

    if (filterRating !== "all") {
      filtered = filtered.filter((f) => f.rating === parseInt(filterRating));
    }

    return filtered;
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Submit feedback logic here
    alert("Feedback submitted successfully!");
    setNewFeedback({ rating: 5, comment: "", projectId: "", type: "overall" });
  };

  // Don't render until we have user data
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Navigation */}
        <motion.div
          {...fadeIn}
          className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {currentUser.role === "client"
                  ? "Client Feedback & Reviews"
                  : "Freelancer Feedback & Reviews"}
              </h1>
              <p className="mt-2 text-purple-100">
                {currentUser.role === "client"
                  ? "Share and view feedback on your freelance projects"
                  : "Share and view feedback on your freelance work"}
              </p>
            </div>
            <Link
              to="/manage-contracts"
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
            >
              <FaArrowLeft />
              Back to Contracts
            </Link>
          </div>
        </motion.div>

        {/* Quick Links */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/manage-contracts"
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-blue-200 transition-all flex items-center gap-3"
          >
            <FaHandshake className="text-2xl text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">Manage Contracts</h3>
              <p className="text-sm text-blue-600">View active contracts</p>
            </div>
          </Link>
          <Link
            to="/payment"
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-all flex items-center gap-3"
          >
            <FaCreditCard className="text-2xl text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Payments</h3>
              <p className="text-sm text-green-600">Process payments</p>
            </div>
          </Link>
          <Link
            to="/contract-templates"
            className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border-2 border-orange-200 transition-all flex items-center gap-3"
          >
            <FaFileContract className="text-2xl text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-800">
                Contract Templates
              </h3>
              <p className="text-sm text-orange-600">Manage templates</p>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            {
              id: "received",
              label:
                currentUser.role === "client"
                  ? "Received from Freelancers"
                  : "Received from Clients",
            },
            {
              id: "given",
              label:
                currentUser.role === "client"
                  ? "Given to Freelancers"
                  : "Given to Clients",
            },
            { id: "give-feedback", label: "Give Feedback" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        {(activeTab === "received" || activeTab === "given") && (
          <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span>Filter by Rating:</span>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {getFilteredFeedback().length} reviews found
            </div>
          </div>
        )}

        {/* Feedback List */}
        {(activeTab === "received" || activeTab === "given") && (
          <motion.div className="space-y-6" {...fadeIn}>
            {getFilteredFeedback().length > 0 ? (
              getFilteredFeedback().map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Feedback Header */}
                    <div className="lg:w-1/4">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={feedback.from.avatar}
                          alt={feedback.from.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">
                            {feedback.from.name}
                          </h3>
                          <span className="text-sm text-gray-600 capitalize">
                            {feedback.from.role === "client"
                              ? "Client"
                              : "Freelancer"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-purple-500" />
                          <span>{feedback.date}</span>
                        </div>
                        <div>
                          <span className="font-medium">Project:</span>
                          <p className="text-gray-600">{feedback.project}</p>
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs ml-2">
                            {feedback.type.charAt(0).toUpperCase() +
                              feedback.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Feedback Content */}
                    <div className="lg:w-3/4">
                      <div className="flex items-center gap-4 mb-4">
                        {renderStars(feedback.rating)}
                        <span className="text-lg font-bold text-gray-700">
                          {feedback.rating}/5
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {feedback.comment}
                      </p>

                      {/* Feedback Actions */}
                      <div className="flex items-center gap-4 mb-4">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-all">
                          <FaThumbsUp />
                          <span>Helpful ({feedback.helpful})</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all">
                          <FaReply />
                          <span>Reply</span>
                        </button>
                      </div>

                      {/* Replies */}
                      {feedback.replies.length > 0 && (
                        <div className="border-l-4 border-purple-200 pl-4 space-y-3">
                          {feedback.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium">
                                  {reply.author}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {reply.date}
                                </span>
                              </div>
                              <p className="text-gray-700">{reply.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaStar className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {activeTab === "received"
                    ? "No feedback received yet"
                    : "No feedback given yet"}
                </h3>
                <p className="text-gray-500">
                  {activeTab === "received"
                    ? "Complete some projects to receive feedback"
                    : "Start giving feedback to build your reputation"}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Give Feedback Form */}
        {activeTab === "give-feedback" && (
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            {...fadeIn}
          >
            <h2 className="text-2xl font-bold mb-6">Give Feedback</h2>

            <form onSubmit={handleSubmitFeedback} className="space-y-6">
              {/* Project Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select{" "}
                  {currentUser.role === "client" ? "Project" : "Client Project"}
                </label>
                <select
                  value={newFeedback.projectId}
                  onChange={(e) =>
                    setNewFeedback({
                      ...newFeedback,
                      projectId: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a project</option>
                  {currentUser.role === "client" ? (
                    <>
                      <option value="1">E-commerce Website Development</option>
                      <option value="2">Mobile App UI Design</option>
                      <option value="3">Logo Design Project</option>
                    </>
                  ) : (
                    <>
                      <option value="1">
                        E-commerce Website Development (Ahmed Hassan)
                      </option>
                      <option value="2">
                        Mobile App UI Design (Omar Al-Rashid)
                      </option>
                      <option value="3">
                        Content Writing Project (Khalid Al-Mansouri)
                      </option>
                    </>
                  )}
                </select>
              </div>

              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Type
                </label>
                <select
                  value={newFeedback.type}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, type: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="overall">Overall</option>
                  <option value="communication">Communication</option>
                  <option value="quality">Work Quality</option>
                  <option value="timeliness">Timeliness</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Rating (1-5 Stars)
                </label>
                {renderStars(newFeedback.rating, "text-2xl", true, (rating) =>
                  setNewFeedback({ ...newFeedback, rating })
                )}
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {newFeedback.rating} stars
                </p>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) =>
                    setNewFeedback({ ...newFeedback, comment: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="5"
                  placeholder="Share your experience..."
                  required
                />
              </div>

              {/* Guidelines */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-medium text-purple-800 mb-2">
                  Feedback Guidelines
                </h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Be honest and constructive</li>
                  <li>• Focus on specific aspects of the work</li>
                  <li>• Maintain professional language</li>
                  <li>• Consider the overall experience</li>
                  {currentUser.role === "client" && (
                    <li>• Rate freelancer&apos;s communication and delivery</li>
                  )}
                  {currentUser.role === "freelancer" && (
                    <li>
                      • Comment on client&apos;s communication and clarity
                    </li>
                  )}
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
              >
                <FaComment />
                Submit Feedback
              </button>
            </form>
          </motion.div>
        )}

        {/* Role-based Feedback Statistics */}
        {(activeTab === "received" || activeTab === "given") && (
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            {...fadeIn}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {getFilteredFeedback().length > 0
                  ? (
                      getFilteredFeedback().reduce(
                        (sum, f) => sum + f.rating,
                        0
                      ) / getFilteredFeedback().length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <div className="text-gray-600">Average Rating</div>
              {renderStars(
                getFilteredFeedback().length > 0
                  ? Math.round(
                      getFilteredFeedback().reduce(
                        (sum, f) => sum + f.rating,
                        0
                      ) / getFilteredFeedback().length
                    )
                  : 0,
                "text-sm"
              )}
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {getFilteredFeedback().length}
              </div>
              <div className="text-gray-600">
                Total {activeTab === "received" ? "Received" : "Given"}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {getFilteredFeedback().length > 0
                  ? Math.round(
                      (getFilteredFeedback().filter((f) => f.rating >= 4)
                        .length /
                        getFilteredFeedback().length) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="text-gray-600">Positive Feedback</div>
            </div>
          </motion.div>
        )}

        {/* Role-based Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4">
            {currentUser.role === "client"
              ? "Tips for Clients"
              : "Tips for Freelancers"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {currentUser.role === "client" ? (
              <>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Rate freelancers honestly to help the community</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Provide specific feedback about work quality</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Comment on communication and professionalism</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Leave feedback promptly after project completion</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Rate clients based on communication clarity</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Comment on project requirements clarity</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Mention timely payments and responsiveness</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaStar className="text-yellow-500 mt-1" />
                  <span>Build your reputation through honest feedback</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Feedback;

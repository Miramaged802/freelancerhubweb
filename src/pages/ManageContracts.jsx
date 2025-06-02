import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaFileContract,
  FaUser,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
  FaSpinner,
  FaFileAlt,
  FaComments,
  FaExclamationTriangle,
  FaPause,
  FaCreditCard,
  FaGavel,
  FaFlag,
  FaStar,
  FaMoneyBillWave,
  FaBriefcase,
} from "react-icons/fa";

const ManageContracts = () => {
  const navigate = useNavigate();
  const { userType } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDescription, setPaymentDescription] = useState("");

  // Get current user data
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

  // Role-based contract data with different perspectives
  const [contracts] = useState([
    {
      id: 1,
      title: "E-commerce Website Development",
      freelancer: {
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
        rating: 4.8,
        completedProjects: 45,
      },
      client: {
        name: "Ahmed Hassan",
        avatar: "https://ui-avatars.com/api/?name=Ahmed+Hassan",
        rating: 4.9,
      },
      status: "active",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      budget: 2500,
      paidAmount: 1000,
      remainingAmount: 1500,
      contractType: "Fixed Price",
      priority: "high",
      category: "Web Development",
      clientRole: "client", // Who created the contract
      freelancerRole: "freelancer", // Who is working on it
      milestones: [
        {
          id: 1,
          title: "Frontend Development",
          status: "completed",
          amount: 1000,
          dueDate: "2024-02-25",
          completedDate: "2024-02-23",
          description: "Complete responsive frontend with React",
          canPay: true, // Client can pay completed milestones
        },
        {
          id: 2,
          title: "Backend Integration",
          status: "in-progress",
          amount: 1000,
          dueDate: "2024-03-05",
          description: "API development and database integration",
          canPay: false,
        },
        {
          id: 3,
          title: "Testing & Deployment",
          status: "pending",
          amount: 500,
          dueDate: "2024-03-15",
          description: "Quality assurance and live deployment",
          canPay: false,
        },
      ],
      progress: 65,
      lastActivity: "2024-02-20",
      disputes: [],
      communications: [
        {
          id: 1,
          sender: "Client",
          message: "Great work on the frontend!",
          timestamp: "2024-02-20 10:30",
        },
      ],
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      freelancer: {
        name: "Sarah Smith",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Smith",
        rating: 4.9,
        completedProjects: 32,
      },
      client: {
        name: "Omar Al-Rashid",
        avatar: "https://ui-avatars.com/api/?name=Omar+AlRashid",
        rating: 4.7,
      },
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-02-01",
      budget: 1800,
      paidAmount: 1800,
      remainingAmount: 0,
      contractType: "Fixed Price",
      priority: "medium",
      category: "UI/UX Design",
      clientRole: "client",
      freelancerRole: "freelancer",
      milestones: [
        {
          id: 1,
          title: "Wireframes",
          status: "completed",
          amount: 600,
          dueDate: "2024-01-10",
          completedDate: "2024-01-08",
          canPay: false, // Already paid
        },
        {
          id: 2,
          title: "UI Design",
          status: "completed",
          amount: 800,
          dueDate: "2024-01-20",
          completedDate: "2024-01-18",
          canPay: false,
        },
        {
          id: 3,
          title: "Design System",
          status: "completed",
          amount: 400,
          dueDate: "2024-02-01",
          completedDate: "2024-01-30",
          canPay: false,
        },
      ],
      progress: 100,
      lastActivity: "2024-02-01",
      disputes: [],
      communications: [],
    },
    // Add more contracts for different scenarios
  ]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "disputed":
        return "bg-red-100 text-red-800";
      case "paused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Filter contracts based on user role
  const getFilteredContracts = () => {
    let filtered = contracts;

    // Filter by user role - show contracts where user is involved
    if (currentUser?.role === "client") {
      // Client sees contracts they created
      filtered = filtered.filter(
        (contract) => contract.clientRole === "client"
      );
    } else if (currentUser?.role === "freelancer") {
      // Freelancer sees contracts they're working on
      filtered = filtered.filter(
        (contract) => contract.freelancerRole === "freelancer"
      );
    }

    // Filter by active tab
    if (activeTab !== "all") {
      filtered = filtered.filter((contract) => contract.status === activeTab);
    }

    return filtered;
  };

  const filteredContracts = getFilteredContracts();

  const handleMakePayment = (contract, milestone = null) => {
    // Set up payment data
    const amount = milestone ? milestone.amount : contract.remainingAmount;
    const description = milestone
      ? `Payment for milestone: ${milestone.title}`
      : `Final payment for: ${contract.title}`;

    setPaymentAmount(amount);
    setPaymentDescription(description);
    setSelectedContract({ contract, milestone });
    setShowPaymentModal(true);
  };

  const handlePaymentRedirect = () => {
    // Navigate to payment page with pre-filled data
    const paymentData = {
      amount: paymentAmount,
      contractId: selectedContract?.contract?.id,
      description: paymentDescription,
      contractTitle: selectedContract?.contract?.title,
      milestone: selectedContract?.milestone,
    };

    // Store payment data in localStorage for payment page
    localStorage.setItem("pendingPayment", JSON.stringify(paymentData));

    // Navigate to payment page
    navigate("/payment");
    setShowPaymentModal(false);
  };

  const handleDispute = (contract) => {
    setSelectedContract(contract);
    setShowDisputeModal(true);
  };

  const handleContractAction = (contractId, action) => {
    alert(`Contract ${action} action triggered for contract ${contractId}`);
  };

  // Role-based view permissions
  const canMakePayments = currentUser?.role === "client";
  const canViewEarnings = currentUser?.role === "freelancer";

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...fadeIn}
          className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {currentUser?.role === "client"
                  ? "Manage Your Projects"
                  : "Manage Your Contracts"}
              </h1>
              <p className="mt-2 text-primary-100">
                {currentUser?.role === "client"
                  ? "Track and manage projects you've posted"
                  : "Handle contracts and track your work"}
              </p>
            </div>
            <div className="flex gap-3">
              {canMakePayments && (
                <Link
                  to="/payment"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-all"
                >
                  <FaCreditCard />
                  Make Payment
                </Link>
              )}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all"
              >
                <FaBriefcase />
                Dashboard
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Role-based Quick Access */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/payment"
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-all flex items-center gap-3"
          >
            <FaCreditCard className="text-2xl text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">
                {canMakePayments
                  ? "Make Payments"
                  : "View Earnings"}
              </h3>
              <p className="text-sm text-green-600">
                {canMakePayments ? "Pay freelancers" : "Track your income"}
              </p>
            </div>
          </Link>
          <Link
            to="/contract-templates"
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-blue-200 transition-all flex items-center gap-3"
          >
            <FaFileContract className="text-2xl text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800">
                Contract Templates
              </h3>
              <p className="text-sm text-blue-600">Manage templates</p>
            </div>
          </Link>
          <Link
            to="/feedback"
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border-2 border-purple-200 transition-all flex items-center gap-3"
          >
            <FaStar className="text-2xl text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-800">
                Feedback
              </h3>
              <p className="text-sm text-purple-600">Reviews & ratings</p>
            </div>
          </Link>
        </div>

        {/* Enhanced Stats - Role Based */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {currentUser?.role === "client" ? (
            // Client Stats
            <>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Active Projects
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {
                        contracts.filter(
                          (c) =>
                            c.status === "active" && c.clientRole === "client"
                        ).length
                      }
                    </p>
                  </div>
                  <FaFileContract className="text-3xl text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {contracts
                        .filter((c) => c.clientRole === "client")
                        .reduce((sum, c) => sum + c.paidAmount, 0)}
                    </p>
                  </div>
                  <FaDollarSign className="text-3xl text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Pending Payments
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      $
                      {contracts
                        .filter((c) => c.clientRole === "client")
                        .reduce((sum, c) => sum + c.remainingAmount, 0)}
                    </p>
                  </div>
                  <FaMoneyBillWave className="text-3xl text-orange-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Completed Projects
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {
                        contracts.filter(
                          (c) =>
                            c.status === "completed" &&
                            c.clientRole === "client"
                        ).length
                      }
                    </p>
                  </div>
                  <FaCheckCircle className="text-3xl text-purple-600" />
                </div>
              </div>
            </>
          ) : (
            // Freelancer Stats
            <>
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Active Contracts
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {
                        contracts.filter(
                          (c) =>
                            c.status === "active" &&
                            c.freelancerRole === "freelancer"
                        ).length
                      }
                    </p>
                  </div>
                  <FaFileContract className="text-3xl text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Total Earned
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {contracts
                        .filter((c) => c.freelancerRole === "freelancer")
                        .reduce((sum, c) => sum + c.paidAmount, 0)}
                    </p>
                  </div>
                  <FaDollarSign className="text-3xl text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Pending Earnings
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      $
                      {contracts
                        .filter((c) => c.freelancerRole === "freelancer")
                        .reduce((sum, c) => sum + c.remainingAmount, 0)}
                    </p>
                  </div>
                  <FaMoneyBillWave className="text-3xl text-orange-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Completed Work
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {
                        contracts.filter(
                          (c) =>
                            c.status === "completed" &&
                            c.freelancerRole === "freelancer"
                        ).length
                      }
                    </p>
                  </div>
                  <FaCheckCircle className="text-3xl text-purple-600" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Enhanced Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            {
              id: "all",
              label: `All ${currentUser?.role === "client" ? "Projects" : "Contracts"}`,
              count: filteredContracts.length,
            },
            {
              id: "active",
              label: "Active",
              count: contracts.filter((c) => c.status === "active").length,
            },
            {
              id: "completed",
              label: "Completed",
              count: contracts.filter((c) => c.status === "completed").length,
            },
            {
              id: "dispute",
              label: "Disputes",
              count: contracts.filter((c) => c.status === "dispute").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg capitalize transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              <span className="bg-white text-primary-500 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Enhanced Contracts Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredContracts.map((contract) => (
            <motion.div
              key={contract.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              {...fadeIn}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Enhanced Contract Header */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <FaFileContract
                      className={`text-4xl ${getPriorityColor(contract.priority)}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">
                          {contract.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs ${getStatusColor(contract.status)}`}
                        >
                          {contract.status.charAt(0).toUpperCase() +
                            contract.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {contract.contractType}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {contract.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded ${
                            contract.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : contract.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {contract.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-primary-500" />
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            currentUser?.role === "client"
                              ? contract.freelancer.avatar
                              : contract.client.avatar
                          }
                          alt={
                            currentUser?.role === "client"
                              ? contract.freelancer.name
                              : contract.client.name
                          }
                          className="w-6 h-6 rounded-full"
                        />
                        <span>
                          {currentUser?.role === "client"
                            ? contract.freelancer.name
                            : contract.client.name}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>
                            {currentUser?.role === "client"
                              ? contract.freelancer.rating
                              : contract.client.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primary-500" />
                      <span>
                        {contract.startDate} - {contract.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-primary-500" />
                      <span>
                        ${contract.budget} (Paid: ${contract.paidAmount},
                        Remaining: ${contract.remainingAmount})
                      </span>
                    </div>
                  </div>

                  {/* Role-based Quick Actions */}
                  <div className="mt-6 space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-all flex items-center justify-center gap-2">
                      <FaFileAlt />
                      View Contract
                    </button>
                    <Link
                      to="/messages"
                      className="w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FaComments />
                      Message
                    </Link>

                    {/* Client-specific actions */}
                    {canMakePayments && contract.remainingAmount > 0 && (
                      <button
                        onClick={() => handleMakePayment(contract)}
                        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <FaCreditCard />
                        Make Payment
                      </button>
                    )}

                    {/* Freelancer-specific actions */}
                    {canViewEarnings && (
                      <Link
                        to="/earnings"
                        className="w-full px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <FaMoneyBillWave />
                        View Earnings
                      </Link>
                    )}

                    {contract.status === "active" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleContractAction(contract.id, "pause")
                          }
                          className="flex-1 px-3 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <FaPause />
                          Pause
                        </button>
                        <button
                          onClick={() => handleDispute(contract)}
                          className="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <FaFlag />
                          Dispute
                        </button>
                      </div>
                    )}
                    <Link
                      to="/feedback"
                      className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <FaStar />
                      Give Feedback
                    </Link>
                  </div>
                </div>

                {/* Enhanced Milestones */}
                <div className="lg:w-2/3">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">
                        Project Progress
                      </h4>
                      <span className="text-sm text-gray-600">
                        {contract.progress}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary-500 h-3 rounded-full transition-all duration-500 relative"
                        style={{ width: `${contract.progress}%` }}
                      >
                        <div className="absolute right-0 top-0 h-full w-2 bg-primary-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-4">
                    Milestones
                  </h4>
                  <div className="space-y-4">
                    {contract.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-l-primary-500"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {milestone.status === "completed" ? (
                            <FaCheckCircle className="text-green-500 text-xl" />
                          ) : milestone.status === "in-progress" ? (
                            <FaSpinner className="text-yellow-500 animate-spin text-xl" />
                          ) : milestone.status === "disputed" ? (
                            <FaExclamationTriangle className="text-red-500 text-xl" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                {milestone.title}
                              </span>
                              <span className="font-bold text-primary-600">
                                ${milestone.amount}
                              </span>
                            </div>
                            {milestone.description && (
                              <p className="text-sm text-gray-600 mt-1">
                                {milestone.description}
                              </p>
                            )}
                            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                              <span>Due: {milestone.dueDate}</span>
                              {milestone.completedDate && (
                                <span>
                                  Completed: {milestone.completedDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(milestone.status)}`}
                          >
                            {milestone.status.charAt(0).toUpperCase() +
                              milestone.status.slice(1)}
                          </span>
                          {/* Role-based milestone actions */}
                          {canMakePayments &&
                            milestone.status === "completed" &&
                            milestone.canPay && (
                              <button
                                onClick={() =>
                                  handleMakePayment(contract, milestone)
                                }
                                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-all"
                              >
                                Pay Now
                              </button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contract Status Actions */}
                  {contract.disputes.length > 0 && (
                    <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FaGavel className="text-red-600" />
                        <span className="font-medium text-red-800">
                          Active Dispute
                        </span>
                      </div>
                      <p className="text-sm text-red-700">
                        Reason: {contract.disputes[0].reason}
                      </p>
                      <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
                        View Dispute Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Payment Modal with Payment Page Integration */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">
                Confirm Payment
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Contract:</span>
                    <span className="text-sm">
                      {selectedContract?.contract?.title}
                    </span>
                  </div>
                  {selectedContract?.milestone && (
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Milestone:</span>
                      <span className="text-sm">
                        {selectedContract.milestone.title}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">Amount:</span>
                    <span className="text-lg font-bold text-green-600">
                      ${paymentAmount}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Description
                  </label>
                  <textarea
                    value={paymentDescription}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows="2"
                    placeholder="Add payment notes..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePaymentRedirect}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaCreditCard />
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dispute Modal */}
        {showDisputeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">
                File Dispute
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Quality Issues</option>
                    <option>Late Delivery</option>
                    <option>Scope Changes</option>
                    <option>Communication Issues</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe the issue..."
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDisputeModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                    File Dispute
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Role-based Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">
            {currentUser?.role === "client"
              ? "Client Tips"
              : "Freelancer Tips"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {currentUser?.role === "client" ? (
              <>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>
                    Pay milestones promptly to maintain good relationships
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Use the messaging system for clear communication</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Review work regularly and provide feedback</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Rate freelancers to help the community</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Submit work on time to meet deadlines</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Keep clients updated on progress regularly</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Request payment only after milestone completion</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>Maintain professional communication</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ManageContracts;

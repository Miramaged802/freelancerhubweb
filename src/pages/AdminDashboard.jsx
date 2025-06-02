import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaDollarSign,
  FaFileContract,
  FaChartBar,
  FaExclamationTriangle,
  FaBan,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaDownload,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaArrowUp,
  FaBell,
  FaShieldAlt,
  FaDatabase,
  FaServer,
  FaSave,
  FaUndo,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [settings, setSettings] = useState({
    siteName: "FreelanceHub",
    platformFee: 10,
    minWithdrawal: 50,
    maxWithdrawal: 5000,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    allowRegistrations: true,
    requireEmailVerification: true,
    autoApproveProjects: false,
  });

  // Admin credentials - should match Login.jsx
  const ADMIN_CREDENTIALS = {
    email: "FreelanceHub_Admin_2024@gmail.com",
    password: "SecureAdmin@123$",
  };

  // Sample admin data
  const dashboardStats = {
    totalUsers: 1247,
    totalContracts: 342,
    totalRevenue: 284750,
    pendingPayments: 18500,
    activeProjects: 89,
    completedProjects: 253,
    disputeResolution: 12,
    systemUptime: "99.9%",
  };

  // Enhanced payment data
  const paymentTransactions = [
    {
      id: 1,
      transactionId: "TXN-2024-001",
      from: "Ahmed Hassan",
      to: "Sarah Wilson",
      amount: 2500,
      fee: 250,
      netAmount: 2250,
      method: "Credit Card",
      status: "Completed",
      date: "2024-02-15",
      project: "E-commerce Website",
      type: "Project Payment",
    },
    {
      id: 2,
      transactionId: "TXN-2024-002",
      from: "Platform",
      to: "John Doe",
      amount: 1800,
      fee: 0,
      netAmount: 1800,
      method: "PayPal",
      status: "Pending",
      date: "2024-02-14",
      project: "Mobile App Design",
      type: "Withdrawal",
    },
    {
      id: 3,
      transactionId: "TXN-2024-003",
      from: "Omar Al-Rashid",
      to: "Platform",
      amount: 500,
      fee: 25,
      netAmount: 475,
      method: "Bank Transfer",
      status: "Failed",
      date: "2024-02-13",
      project: "Logo Design",
      type: "Escrow Deposit",
    },
    {
      id: 4,
      transactionId: "TXN-2024-004",
      from: "Platform",
      to: "Sarah Wilson",
      amount: 1200,
      fee: 0,
      netAmount: 1200,
      method: "Wallet",
      status: "Completed",
      date: "2024-02-12",
      project: "Website Maintenance",
      type: "Withdrawal",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      role: "Client",
      status: "Active",
      joinDate: "2024-02-15",
      projects: 3,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Freelancer",
      status: "Active",
      joinDate: "2024-02-10",
      projects: 8,
    },
    {
      id: 3,
      name: "Omar Al-Rashid",
      email: "omar@example.com",
      role: "Client",
      status: "Suspended",
      joinDate: "2024-01-20",
      projects: 1,
    },
  ];

  const recentContracts = [
    {
      id: 1,
      project: "E-commerce Website Development",
      client: "Ahmed Hassan",
      freelancer: "Sarah Wilson",
      value: 2500,
      status: "Active",
      startDate: "2024-02-15",
    },
    {
      id: 2,
      project: "Mobile App UI Design",
      client: "Omar Al-Rashid",
      freelancer: "John Doe",
      value: 1800,
      status: "Completed",
      startDate: "2024-01-01",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High server load detected",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "New user registration spike",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "error",
      message: "Payment gateway timeout",
      time: "2 hours ago",
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      loginData.username === ADMIN_CREDENTIALS.email &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials! Please check your email and password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
  };

  const handleSettingsSave = () => {
    // Simulate saving settings
    alert("Settings saved successfully!");
  };

  const handleSettingsReset = () => {
    setSettings({
      siteName: "FreelanceHub",
      platformFee: 10,
      minWithdrawal: 50,
      maxWithdrawal: 5000,
      emailNotifications: true,
      smsNotifications: false,
      maintenanceMode: false,
      allowRegistrations: true,
      requireEmailVerification: true,
      autoApproveProjects: false,
    });
  };

  // Filter payments based on status
  const filteredPayments = paymentTransactions.filter((payment) => {
    if (paymentFilter === "all") return true;
    return payment.status.toLowerCase() === paymentFilter;
  });

  // Login Form
  if (!isAuthenticated) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <FaUserShield className="text-6xl text-red-400 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-300">FreelanceHub Administrative Portal</p>
            <div className="mt-4 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <p className="text-sm text-blue-200 font-medium mb-2">
                Admin Credentials:
              </p>
              <p className="text-xs text-blue-100">
                Email: FreelanceHub_Admin_2024@gmail.com
              </p>
              <p className="text-xs text-blue-100">
                Password: SecureAdmin@123$
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-gray-300"
                placeholder="Enter admin email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-gray-300"
                placeholder="Enter admin password"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 font-medium shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaUserShield />
              Access Admin Dashboard
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-600/30">
            <p className="text-sm text-gray-300 text-center">
              Authorized personnel only
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Admin Dashboard
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-xl">
                <FaUserShield className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  FreelanceHub Control Panel
                </p>
              </div>
            </div>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            { id: "overview", label: "Overview", icon: FaChartBar },
            { id: "users", label: "Users", icon: FaUsers },
            {
              id: "contracts",
              label: "Contracts",
              icon: FaFileContract,
            },
            {
              id: "payments",
              label: "Payments",
              icon: FaDollarSign,
            },
            { id: "system", label: "Settings", icon: FaCog },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-3 font-medium ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div className="space-y-8" {...fadeIn}>
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.totalUsers}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaArrowUp className="text-blue-200 text-sm" />
                      <span className="text-blue-100 text-xs">
                        +5% this month
                      </span>
                    </div>
                  </div>
                  <FaUsers className="text-4xl text-blue-200" />
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold">
                      ${dashboardStats.totalRevenue.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaArrowUp className="text-green-200 text-sm" />
                      <span className="text-green-100 text-xs">
                        +12% this month
                      </span>
                    </div>
                  </div>
                  <FaDollarSign className="text-4xl text-green-200" />
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl shadow-xl p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">
                      Active Projects
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.activeProjects}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaArrowUp className="text-purple-200 text-sm" />
                      <span className="text-purple-100 text-xs">
                        +8% this week
                      </span>
                    </div>
                  </div>
                  <FaFileContract className="text-4xl text-purple-200" />
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">
                      System Uptime
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.systemUptime}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <FaCheckCircle className="text-orange-200 text-sm" />
                      <span className="text-orange-100 text-xs">
                        Excellent performance
                      </span>
                    </div>
                  </div>
                  <FaChartBar className="text-4xl text-orange-200" />
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Projects Status
                  </h3>
                  <FaFileContract className="text-2xl text-purple-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-bold text-green-600">
                      {dashboardStats.completedProjects}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active</span>
                    <span className="font-bold text-blue-600">
                      {dashboardStats.activeProjects}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">In Dispute</span>
                    <span className="font-bold text-red-600">
                      {dashboardStats.disputeResolution}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Financial Overview
                  </h3>
                  <FaDollarSign className="text-2xl text-green-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Payments</span>
                    <span className="font-bold text-yellow-600">
                      ${dashboardStats.pendingPayments.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fees</span>
                    <span className="font-bold text-green-600">
                      ${(dashboardStats.totalRevenue * 0.1).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Contracts</span>
                    <span className="font-bold text-blue-600">
                      {dashboardStats.totalContracts}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    User Activity
                  </h3>
                  <FaUsers className="text-2xl text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Users</span>
                    <span className="font-bold text-green-600">1,180</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Registrations</span>
                    <span className="font-bold text-blue-600">67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Online Now</span>
                    <span className="font-bold text-purple-600">234</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced System Alerts */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  System Alerts
                </h2>
                <div className="flex items-center gap-2">
                  <FaBell className="text-xl text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {systemAlerts.length} alerts
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      alert.type === "error"
                        ? "bg-red-50 border-l-4 border-red-500"
                        : alert.type === "warning"
                          ? "bg-yellow-50 border-l-4 border-yellow-500"
                          : "bg-blue-50 border-l-4 border-blue-500"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaExclamationTriangle
                      className={`text-xl ${
                        alert.type === "error"
                          ? "text-red-500"
                          : alert.type === "warning"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {alert.message}
                      </p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaTimesCircle />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div className="space-y-8" {...fadeIn}>
            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.totalUsers}
                    </p>
                  </div>
                  <FaUsers className="text-4xl text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      Active Users
                    </p>
                    <p className="text-3xl font-bold">1,180</p>
                  </div>
                  <FaCheckCircle className="text-4xl text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">
                      Suspended Users
                    </p>
                    <p className="text-3xl font-bold">67</p>
                  </div>
                  <FaBan className="text-4xl text-orange-200" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  User Management
                </h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">
                    <FaDownload />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Role
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Projects
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Joined {user.joinDate}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-4 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              user.role === "Client"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status === "Active" ? (
                              <FaCheckCircle />
                            ) : (
                              <FaBan />
                            )}
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-semibold text-gray-800">
                            {user.projects}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <motion.button
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEye />
                            </motion.button>
                            <motion.button
                              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEdit />
                            </motion.button>
                            <motion.button
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaBan />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contracts Tab */}
        {activeTab === "contracts" && (
          <motion.div className="space-y-8" {...fadeIn}>
            {/* Contract Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">
                      Total Contracts
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.totalContracts}
                    </p>
                  </div>
                  <FaFileContract className="text-4xl text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">
                      Active Contracts
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.activeProjects}
                    </p>
                  </div>
                  <FaClock className="text-4xl text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      Completed
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.completedProjects}
                    </p>
                  </div>
                  <FaCheckCircle className="text-4xl text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">
                      In Dispute
                    </p>
                    <p className="text-3xl font-bold">
                      {dashboardStats.disputeResolution}
                    </p>
                  </div>
                  <FaExclamationTriangle className="text-4xl text-orange-200" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Contract Management
                </h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search contracts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">
                    <FaDownload />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Project
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Client
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Freelancer
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Value
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContracts.map((contract, index) => (
                      <motion.tr
                        key={contract.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium text-gray-800">
                              {contract.project}
                            </p>
                            <p className="text-sm text-gray-500">
                              Started {contract.startDate}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {contract.client.charAt(0)}
                            </div>
                            <span className="text-gray-700">
                              {contract.client}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {contract.freelancer.charAt(0)}
                            </div>
                            <span className="text-gray-700">
                              {contract.freelancer}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span className="font-bold text-green-600 text-lg">
                            ${contract.value}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit ${
                              contract.status === "Active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {contract.status === "Active" ? (
                              <FaClock />
                            ) : (
                              <FaCheckCircle />
                            )}
                            {contract.status}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <motion.button
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEye />
                            </motion.button>
                            <motion.button
                              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEdit />
                            </motion.button>
                            <motion.button
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <motion.div className="space-y-8" {...fadeIn}>
            {/* Payment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold">
                      ${dashboardStats.totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-green-100 text-xs mt-1">
                      +12% from last month
                    </p>
                  </div>
                  <FaDollarSign className="text-4xl text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">
                      Pending Payments
                    </p>
                    <p className="text-3xl font-bold">
                      ${dashboardStats.pendingPayments.toLocaleString()}
                    </p>
                    <p className="text-blue-100 text-xs mt-1">
                      15 transactions
                    </p>
                  </div>
                  <FaClock className="text-4xl text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">
                      Platform Fees
                    </p>
                    <p className="text-3xl font-bold">
                      ${(dashboardStats.totalRevenue * 0.1).toLocaleString()}
                    </p>
                    <p className="text-purple-100 text-xs mt-1">
                      10% commission
                    </p>
                  </div>
                  <FaMoneyBillWave className="text-4xl text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">
                      Failed Payments
                    </p>
                    <p className="text-3xl font-bold">23</p>
                    <p className="text-orange-100 text-xs mt-1">
                      -5% from last week
                    </p>
                  </div>
                  <FaTimesCircle className="text-4xl text-orange-200" />
                </div>
              </div>
            </div>

            {/* Payment Filters and Search */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Payment Transactions
                </h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">
                    <FaDownload />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Transaction ID
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        From/To
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Method
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-4 px-2 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <motion.tr
                        key={payment.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: payment.id * 0.1 }}
                      >
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium text-gray-800">
                              {payment.transactionId}
                            </p>
                            <p className="text-sm text-gray-500">
                              {payment.type}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium">{payment.from}</p>
                            <p className="text-sm text-gray-500">
                              → {payment.to}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-bold text-gray-800">
                              ${payment.amount}
                            </p>
                            <p className="text-sm text-gray-500">
                              Fee: ${payment.fee}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            {payment.method === "Credit Card" && (
                              <FaCreditCard className="text-blue-500" />
                            )}
                            {payment.method === "PayPal" && (
                              <FaPaypal className="text-blue-600" />
                            )}
                            {payment.method === "Wallet" && (
                              <FaMoneyBillWave className="text-green-500" />
                            )}
                            <span className="text-sm">{payment.method}</span>
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              payment.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status === "Completed" && (
                              <FaCheckCircle className="inline mr-1" />
                            )}
                            {payment.status === "Pending" && (
                              <FaClock className="inline mr-1" />
                            )}
                            {payment.status === "Failed" && (
                              <FaTimesCircle className="inline mr-1" />
                            )}
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-600">
                          {payment.date}
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-1">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-800 p-1">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* System Tab */}
        {activeTab === "system" && (
          <motion.div className="space-y-8" {...fadeIn}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* General Settings */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
                    <FaCog className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    General Settings
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) =>
                        setSettings({ ...settings, siteName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform Fee (%)
                    </label>
                    <input
                      type="number"
                      value={settings.platformFee}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          platformFee: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      max="50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min Withdrawal
                      </label>
                      <input
                        type="number"
                        value={settings.minWithdrawal}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            minWithdrawal: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Withdrawal
                      </label>
                      <input
                        type="number"
                        value={settings.maxWithdrawal}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            maxWithdrawal: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-xl">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Security Settings
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Send email notifications to users
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            emailNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        SMS Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Send SMS notifications to users
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            smsNotifications: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Require Email Verification
                      </p>
                      <p className="text-sm text-gray-500">
                        Users must verify email before accessing platform
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.requireEmailVerification}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            requireEmailVerification: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* System Control */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-3 rounded-xl">
                    <FaServer className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    System Control
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Maintenance Mode
                      </p>
                      <p className="text-sm text-gray-500">
                        Enable maintenance mode for system updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            maintenanceMode: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Allow Registrations
                      </p>
                      <p className="text-sm text-gray-500">
                        Allow new users to register on the platform
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.allowRegistrations}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            allowRegistrations: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Auto Approve Projects
                      </p>
                      <p className="text-sm text-gray-500">
                        Automatically approve new projects without review
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoApproveProjects}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            autoApproveProjects: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Database & Backup */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                    <FaDatabase className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Database & Backup
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        Database Size
                      </span>
                      <span className="font-bold text-blue-600">1.2 GB</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        Last Backup
                      </span>
                      <span className="text-green-600">2 hours ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        Auto Backup
                      </span>
                      <span className="text-green-600">Enabled</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2">
                      <FaDownload />
                      Create Backup
                    </button>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2">
                      <FaDatabase />
                      Optimize DB
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Action Buttons */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Save Settings
                  </h3>
                  <p className="text-gray-600">
                    Make sure to save your changes before leaving this page
                  </p>
                </div>
                <div className="flex gap-4">
                  <motion.button
                    onClick={handleSettingsReset}
                    className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaUndo />
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={handleSettingsSave}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all flex items-center gap-2 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSave />
                    Save Settings
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

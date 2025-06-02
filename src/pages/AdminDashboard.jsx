import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaDollarSign,
  FaFileContract,
  FaChartBar,
  FaExclamationTriangle,
  FaBan,
  FaCheck,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaDownload,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Admin credentials - In production, this should be secured properly
  const ADMIN_CREDENTIALS = {
    username: "FreelanceHub_Admin_2024",
    password: "SecureAdmin@123$"
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
    systemUptime: "99.9%"
  };

  const recentUsers = [
    {
      id: 1,
      name: "Ahmed Hassan / أحمد حسن",
      email: "ahmed@example.com",
      role: "Client",
      status: "Active",
      joinDate: "2024-02-15",
      projects: 3,
    },
    {
      id: 2,
      name: "Sarah Wilson / سارة ويلسون",
      email: "sarah@example.com",
      role: "Freelancer",
      status: "Active",
      joinDate: "2024-02-10",
      projects: 8,
    },
    {
      id: 3,
      name: "Omar Al-Rashid / عمر الراشد",
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
      message: "High server load detected / حمولة خادم عالية مكتشفة",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "New user registration spike / زيادة في تسجيل المستخدمين الجدد",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "error",
      message: "Payment gateway timeout / انقطاع بوابة الدفع",
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
      loginData.username === ADMIN_CREDENTIALS.username &&
      loginData.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials! Please check your username and password. / بيانات غير صحيحة! يرجى التحقق من اسم المستخدم وكلمة المرور.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <FaUserShield className="text-5xl text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Access / دخول المدير
            </h1>
            <p className="text-gray-600 mt-2">
              Secure admin portal / بوابة المدير الآمنة
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username / اسم المستخدم
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password / كلمة المرور
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              <FaUserShield />
              Access Dashboard / دخول لوحة التحكم
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Authorized personnel only / للموظفين المخولين فقط
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Admin Dashboard
  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <FaUserShield className="text-3xl text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard / لوحة تحكم المدير
                </h1>
                <p className="text-sm text-gray-600">
                  FreelanceHub Admin Panel / لوحة إدارة فريلانس هب
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              <FaSignOutAlt />
              Logout / تسجيل خروج
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            { id: "overview", label: "Overview / نظرة عامة", icon: FaChartBar },
            { id: "users", label: "Users / المستخدمون", icon: FaUsers },
            { id: "contracts", label: "Contracts / العقود", icon: FaFileContract },
            { id: "payments", label: "Payments / المدفوعات", icon: FaDollarSign },
            { id: "system", label: "System / النظام", icon: FaCog },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div className="space-y-8" {...fadeIn}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users / إجمالي المستخدمين</p>
                    <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalUsers}</p>
                  </div>
                  <FaUsers className="text-4xl text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue / إجمالي الإيرادات</p>
                    <p className="text-3xl font-bold text-green-600">${dashboardStats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <FaDollarSign className="text-4xl text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Projects / المشاريع النشطة</p>
                    <p className="text-3xl font-bold text-purple-600">{dashboardStats.activeProjects}</p>
                  </div>
                  <FaFileContract className="text-4xl text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">System Uptime / وقت تشغيل النظام</p>
                    <p className="text-3xl font-bold text-orange-600">{dashboardStats.systemUptime}</p>
                  </div>
                  <FaChartBar className="text-4xl text-orange-600" />
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">
                System Alerts / تنبيهات النظام
              </h2>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      alert.type === "error"
                        ? "bg-red-50 border-l-4 border-red-500"
                        : alert.type === "warning"
                        ? "bg-yellow-50 border-l-4 border-yellow-500"
                        : "bg-blue-50 border-l-4 border-blue-500"
                    }`}
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
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div className="space-y-6" {...fadeIn}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                  User Management / إدارة المستخدمين
                </h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users... / البحث عن المستخدمين..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all">
                    <FaDownload />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Name / الاسم</th>
                      <th className="text-left py-3">Email / البريد</th>
                      <th className="text-left py-3">Role / الدور</th>
                      <th className="text-left py-3">Status / الحالة</th>
                      <th className="text-left py-3">Projects / المشاريع</th>
                      <th className="text-left py-3">Actions / الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 font-medium">{user.name}</td>
                        <td className="py-4">{user.email}</td>
                        <td className="py-4">{user.role}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4">{user.projects}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <FaBan />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contracts Tab */}
        {activeTab === "contracts" && (
          <motion.div className="space-y-6" {...fadeIn}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">
                Contract Management / إدارة العقود
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Project / المشروع</th>
                      <th className="text-left py-3">Client / العميل</th>
                      <th className="text-left py-3">Freelancer / المستقل</th>
                      <th className="text-left py-3">Value / القيمة</th>
                      <th className="text-left py-3">Status / الحالة</th>
                      <th className="text-left py-3">Actions / الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentContracts.map((contract) => (
                      <tr key={contract.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 font-medium">{contract.project}</td>
                        <td className="py-4">{contract.client}</td>
                        <td className="py-4">{contract.freelancer}</td>
                        <td className="py-4 font-bold">${contract.value}</td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              contract.status === "Active"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {contract.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <FaEye />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <FaEdit />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional tabs content would go here */}
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 
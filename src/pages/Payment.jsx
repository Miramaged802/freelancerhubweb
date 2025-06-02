import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaShieldAlt,
  FaCheckCircle,
  FaReceipt,
  FaDownload,
  FaHandshake,
  FaFileContract,
  FaArrowLeft,
} from "react-icons/fa";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [activeTab, setActiveTab] = useState("make-payment");
  const [paymentData, setPaymentData] = useState({
    amount: "",
    contractId: "",
    description: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
    paypalEmail: "",
  });

  // Load pre-filled payment data from ManageContracts
  useEffect(() => {
    const pendingPayment = localStorage.getItem("pendingPayment");
    if (pendingPayment) {
      try {
        const paymentInfo = JSON.parse(pendingPayment);
        setPaymentData((prevData) => ({
          ...prevData,
          amount: paymentInfo.amount || "",
          contractId: paymentInfo.contractId || "",
          description: paymentInfo.description || "",
        }));
        // Clear the pending payment data
        localStorage.removeItem("pendingPayment");
      } catch (error) {
        console.error("Error parsing pending payment data:", error);
      }
    }
  }, []);

  // Payment history data
  const paymentHistory = [
    {
      id: 1,
      date: "2024-02-15",
      amount: 1000,
      method: "Credit Card",
      status: "completed",
      contract: "E-commerce Website Development",
      invoice: "INV-001",
    },
    {
      id: 2,
      date: "2024-02-10",
      amount: 800,
      method: "PayPal",
      status: "completed",
      contract: "Mobile App UI Design",
      invoice: "INV-002",
    },
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: FaCreditCard },
    { id: "paypal", name: "PayPal", icon: FaPaypal },
    { id: "apple", name: "Apple Pay", icon: FaApplePay },
    { id: "google", name: "Google Pay", icon: FaGooglePay },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    // Show detailed payment confirmation
    const confirmMessage = paymentData.contractId
      ? `Confirm payment of $${paymentData.amount} for contract?\n\nContract: ${paymentData.description}\nMethod: ${selectedMethod === "card" ? "Credit Card" : selectedMethod}\n\nProceed with payment?`
      : `Confirm payment of $${paymentData.amount}?\n\nMethod: ${selectedMethod === "card" ? "Credit Card" : selectedMethod}\n\nProceed with payment?`;

    if (window.confirm(confirmMessage)) {
      // Simulate payment processing
      alert("Payment processed successfully!");

      // Reset form
      setPaymentData({
        amount: "",
        contractId: "",
        description: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        holderName: "",
        paypalEmail: "",
      });

      // Redirect based on whether this was a contract payment
      setTimeout(() => {
        if (paymentData.contractId) {
          if (
            window.confirm(
              "Payment successful! Would you like to return to contract management?"
            )
          ) {
            navigate("/manage-contracts");
          }
        } else {
          // For general payments, stay on payment page or go to dashboard
          if (
            window.confirm(
              "Payment successful! Would you like to view your dashboard?"
            )
          ) {
            navigate("/dashboard");
          }
        }
      }, 1000);
    }
  };

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
          className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Payment Center</h1>
              <p className="mt-2 text-green-100">
                Secure and convenient payment processing
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
            to="/contract-templates"
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border-2 border-purple-200 transition-all flex items-center gap-3"
          >
            <FaFileContract className="text-2xl text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-800">
                Contract Templates
              </h3>
              <p className="text-sm text-purple-600">Manage templates</p>
            </div>
          </Link>
          <Link
            to="/earnings"
            className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border-2 border-orange-200 transition-all flex items-center gap-3"
          >
            <FaCreditCard className="text-2xl text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-800">View Earnings</h3>
              <p className="text-sm text-orange-600">Track your income</p>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            { id: "make-payment", label: "Make Payment" },
            { id: "history", label: "Payment History" },
            { id: "templates", label: "Payment Templates" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Make Payment Tab */}
        {activeTab === "make-payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              {...fadeIn}
            >
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, amount: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter amount"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={paymentData.description}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="Payment description"
                  />
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                            selectedMethod === method.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <Icon className="text-xl" />
                          <span className="text-sm font-medium">
                            {method.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card Details */}
                {selectedMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            cardNumber: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              expiryDate: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              cvv: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.holderName}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            holderName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* PayPal Email */}
                {selectedMethod === "paypal" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      value={paymentData.paypalEmail}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          paypalEmail: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <FaShieldAlt />
                  Process Payment
                </button>
              </form>
            </motion.div>

            {/* Payment Summary */}
            <motion.div
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              {...fadeIn}
            >
              <h3 className="text-xl font-bold mb-6">Payment Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold">
                    ${paymentData.amount || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>$2.99</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    $
                    {(parseFloat(paymentData.amount) + 2.99 || 2.99).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-600">
                  <FaShieldAlt />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Your payment is protected by 256-bit SSL encryption
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === "history" && (
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            {...fadeIn}
          >
            <h2 className="text-2xl font-bold mb-6">Payment History</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Amount</th>
                    <th className="text-left py-3">Method</th>
                    <th className="text-left py-3">Contract</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4">{payment.date}</td>
                      <td className="py-4 font-bold">${payment.amount}</td>
                      <td className="py-4">{payment.method}</td>
                      <td className="py-4">{payment.contract}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          <FaCheckCircle className="inline mr-1" />
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                          <FaReceipt />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <FaDownload />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Payment Templates Tab */}
        {activeTab === "templates" && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            {...fadeIn}
          >
            {[
              {
                name: "Milestone Payment",
                description: "Pay for specific project milestones",
                amount: "25% of total project",
              },
              {
                name: "Hourly Payment",
                description: "Pay for hours worked",
                amount: "$50/hour",
              },
              {
                name: "Project Completion",
                description: "Final payment upon project completion",
                amount: "Remaining balance",
              },
            ].map((template, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all cursor-pointer"
              >
                <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">
                    {template.amount}
                  </span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Payment;

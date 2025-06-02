import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFileContract,
  FaEdit,
  FaDownload,
  FaSave,
  FaEye,
  FaPlus,
  FaCopy,
  FaTrash,
  FaHandshake,
  FaCreditCard,
  FaArrowLeft,
} from "react-icons/fa";

const ContractTemplates = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const contractTemplates = [
    {
      id: 1,
      name: "Web Development Contract",
      type: "Fixed Price",
      category: "Development",
      description: "Complete web development project with milestones",
      terms: {
        duration: "30 days",
        payment: "50% upfront, 50% on completion",
        deliverables: ["Frontend", "Backend", "Testing", "Deployment"],
        revisions: "3 rounds included",
      },
      content: `
PROJECT DETAILS:
- Project Name: [PROJECT_NAME]
- Client: [CLIENT_NAME] 
- Freelancer: [FREELANCER_NAME]
- Start Date: [START_DATE]
- End Date: [END_DATE]

SCOPE OF WORK:
1. Frontend Development
2. Backend Development  
3. Database Design
4. Testing & Quality Assurance
5. Deployment & Launch

PAYMENT TERMS:
- Total Amount: $[AMOUNT]
- Payment Schedule: 50% upfront, 50% on completion
- Late Payment Fee: 5% per month

DELIVERABLES:
- Responsive website
- Source code
- Documentation
- Training materials

TERMS & CONDITIONS:
- Project scope cannot be changed without written agreement
- Client must provide all necessary materials within 5 business days
- Freelancer retains copyright until final payment is received
      `,
    },
    {
      id: 2,
      name: "Mobile App Development",
      type: "Hourly",
      category: "Development",
      description: "Mobile application development contract",
      terms: {
        duration: "45 days",
        payment: "$50/hour",
        deliverables: ["iOS App", "Android App", "Backend API"],
        revisions: "Unlimited during development",
      },
      content: `
MOBILE APP DEVELOPMENT CONTRACT

PROJECT SCOPE:
- Native iOS and Android applications
- Backend API development
- User authentication system
- Push notifications
- App store submission

TECHNICAL REQUIREMENTS:
- iOS: Swift/SwiftUI
- Android: Kotlin/Java
- Backend: Node.js/Python
- Database: MongoDB/PostgreSQL

HOURLY RATE:
- Development: $50/hour
- Testing: $40/hour  
- Consultation: $60/hour

MILESTONES:
1. UI/UX Design (Week 1-2)
2. Backend Development (Week 3-4)
3. Mobile App Development (Week 5-6)
4. Testing & Deployment (Week 7)
      `,
    },
    {
      id: 3,
      name: "Graphic Design Project",
      type: "Fixed Price",
      category: "Design",
      description: "Logo and branding materials design",
      terms: {
        duration: "14 days",
        payment: "25% upfront, 75% on approval",
        deliverables: ["Logo", "Business Card", "Letterhead", "Brand Guide"],
        revisions: "5 rounds included",
      },
      content: `
GRAPHIC DESIGN CONTRACT

DESIGN BRIEF:
- Company Name: [COMPANY_NAME]
- Industry: [INDUSTRY]
- Target Audience: [TARGET_AUDIENCE]
- Design Style: [STYLE_PREFERENCES]

DELIVERABLES:
1. Logo Design (Multiple concepts)
2. Business Card Design
3. Letterhead Design
4. Brand Guidelines Document

FILE FORMATS:
- Vector formats: AI, EPS, SVG
- Raster formats: PNG, JPG (High resolution)
- Print-ready files: PDF

REVISION POLICY:
- 5 rounds of revisions included
- Additional revisions: $25 per round
- Major concept changes: Additional 50% fee

COPYRIGHT:
- Full copyright transfer upon final payment
- Designer retains right to showcase work in portfolio
      `,
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const createNewContract = () => {
    setSelectedTemplate({
      id: Date.now(),
      name: "New Contract",
      type: "Fixed Price",
      category: "General",
      description: "Custom contract template",
      terms: {
        duration: "",
        payment: "",
        deliverables: [],
        revisions: "",
      },
      content: "Enter your contract content here...",
    });
    setIsEditing(true);
    setActiveTab("editor");
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
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Contract Templates</h1>
              <p className="mt-2 text-blue-100">
                Professional contract templates for all project types
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
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-all flex items-center gap-3"
          >
            <FaHandshake className="text-2xl text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Manage Contracts</h3>
              <p className="text-sm text-green-600">View active contracts</p>
            </div>
          </Link>
          <Link
            to="/payment"
            className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border-2 border-orange-200 transition-all flex items-center gap-3"
          >
            <FaCreditCard className="text-2xl text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-800">Payments</h3>
              <p className="text-sm text-orange-600">Process payments</p>
            </div>
          </Link>
          <Link
            to="/feedback"
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border-2 border-purple-200 transition-all flex items-center gap-3"
          >
            <FaFileContract className="text-2xl text-purple-600" />
            <div>
              <h3 className="font-semibold text-purple-800">Feedback</h3>
              <p className="text-sm text-purple-600">Reviews & ratings</p>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            { id: "templates", label: "Templates" },
            { id: "editor", label: "Contract Editor" },
            { id: "my-contracts", label: "My Contracts" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={createNewContract}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
          >
            <FaPlus />
            New Contract
          </button>
        </div>

        {/* Templates Tab */}
        {activeTab === "templates" && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            {...fadeIn}
          >
            {contractTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaFileContract className="text-3xl text-blue-500" />
                  <div>
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {template.type}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        {template.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{template.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">
                      {template.terms.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="font-medium">
                      {template.terms.payment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revisions:</span>
                    <span className="font-medium">
                      {template.terms.revisions}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setActiveTab("editor");
                    }}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaEye />
                    View
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                    <FaCopy />
                  </button>
                  <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                    <FaDownload />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Contract Editor Tab */}
        {activeTab === "editor" && selectedTemplate && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            {...fadeIn}
          >
            {/* Contract Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Contract Editor</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      <FaEdit />
                      {isEditing ? "Preview" : "Edit"}
                    </button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all flex items-center gap-2">
                      <FaSave />
                      Save
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={selectedTemplate.content}
                    onChange={(e) =>
                      setSelectedTemplate({
                        ...selectedTemplate,
                        content: e.target.value,
                      })
                    }
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Enter contract content..."
                  />
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {selectedTemplate.content}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Contract Details Sidebar */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Contract Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contract Name
                    </label>
                    <input
                      type="text"
                      value={selectedTemplate.name}
                      onChange={(e) =>
                        setSelectedTemplate({
                          ...selectedTemplate,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={selectedTemplate.type}
                      onChange={(e) =>
                        setSelectedTemplate({
                          ...selectedTemplate,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Fixed Price">Fixed Price</option>
                      <option value="Hourly">Hourly</option>
                      <option value="Milestone">Milestone</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedTemplate.category}
                      onChange={(e) =>
                        setSelectedTemplate({
                          ...selectedTemplate,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="Writing">Writing</option>
                      <option value="Marketing">Marketing</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Variables */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Quick Variables</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>[PROJECT_NAME]</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaCopy />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>[CLIENT_NAME]</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaCopy />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>[FREELANCER_NAME]</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaCopy />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>[AMOUNT]</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaCopy />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>[START_DATE]</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaCopy />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>[END_DATE]</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                    <FaDownload />
                    Download PDF
                  </button>
                  <Link
                    to="/manage-contracts"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <FaHandshake />
                    Use in Contract
                  </Link>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                    <FaCopy />
                    Duplicate
                  </button>
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2">
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* My Contracts Tab */}
        {activeTab === "my-contracts" && (
          <motion.div
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            {...fadeIn}
          >
            <h2 className="text-2xl font-bold mb-6">My Contracts</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Type</th>
                    <th className="text-left py-3">Category</th>
                    <th className="text-left py-3">Created</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contractTemplates.map((template) => (
                    <tr key={template.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 font-medium">{template.name}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {template.type}
                        </span>
                      </td>
                      <td className="py-4">{template.category}</td>
                      <td className="py-4">2024-02-15</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <FaEdit />
                          </button>
                          <button className="text-green-600 hover:text-green-800">
                            <FaDownload />
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
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ContractTemplates;

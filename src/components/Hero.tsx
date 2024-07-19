import React, { useState } from "react";
import ReferralModal from "./ReferralModal";
import {
  ArrowDownDoubleIcon,
  BitcoinCircleIcon,
  UserMultiple02Icon,
  CheckmarkCircle01Icon,
} from "./icons";

const ReferAndEarnPage: React.FC = () => {
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const benefits = [
    {
      icon: <BitcoinCircleIcon className="w-12 h-12 text-yellow-400" />,
      title: "Earn Rewards",
      description: "Get up to $5,000 for successful referrals",
    },
    {
      icon: <UserMultiple02Icon className="w-12 h-12 text-blue-500" />,
      title: "Help Friends",
      description: "Support your network in their learning journey",
    },
    {
      icon: <CheckmarkCircle01Icon className="w-12 h-12 text-green-500" />,
      title: "Easy Process",
      description: "Simple steps to refer and track your earnings",
    },
  ];

  const referralData = [
    {
      name: "Harsh",
      course: "Web Development",
      status: "Enrolled",
      reward: "$100",
    },
    {
      name: "Raman",
      course: "Data Science",
      status: "Completed",
      reward: "$200",
    },
    {
      name: "Alisha",
      course: "UX Design",
      status: "In Progress",
      reward: "$150",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-blue-600">Accredian</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Let's Learn <span className="text-blue-600">&</span> Earn
              </h1>
              <p className="text-xl text-gray-600">
                Refer friends and earn up to{" "}
                <span className="font-semibold text-blue-600">$5,000</span>{" "}
                while helping them succeed!
              </p>
              <button
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg shadow-lg hover:bg-blue-700 transition duration-300 "
                onClick={handleOpenModal}
              >
                Start Referring Now
              </button>
            </div>
            <div className="relative">
              <img
                src="/refer.svg"
                alt="Mobile app demo"
                className="mx-auto rounded-xl shadow-2xl transform hover:scale-105 transition duration-300"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 rounded-full px-4 py-2 font-semibold transform rotate-12 animate-bounce">
                New!
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why Refer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Referral Table Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Your Referrals
          </h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reward
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralData
                  .slice(0, isTableExpanded ? undefined : 2)
                  .map((referral, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {referral.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {referral.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            referral.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : referral.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-green-600">
                        {referral.reward}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {!isTableExpanded && referralData.length > 2 && (
              <div className="text-center py-4">
                <button
                  onClick={() => setIsTableExpanded(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto transition duration-300 transform hover:scale-105"
                >
                  Show More <ArrowDownDoubleIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="mt-20 bg-blue-600 rounded-lg shadow-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-6">
              Join our referral program today and unlock amazing rewards!
            </p>
            <button
              onClick={handleOpenModal}
              className="bg-gradient-to-b from-blue-50 to-white text-blue-600 px-8 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition duration-300 "
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2023 Accredian. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ReferralModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ReferAndEarnPage;

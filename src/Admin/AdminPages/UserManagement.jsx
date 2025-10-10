import React, { useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar';
import AdminSidebar from '../AdminComponents/AdminSidebar';

function UserManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pendingProfiles = [
    {
      id: "#12567",
      name: "Aarav K.",
      age: 29,
      gender: "Male",
      location: "Bangalore",
      date: "26 Aug 25",
    },
    {
      id: "#12568",
      name: "Aarav K.",
      age: 29,
      gender: "Male",
      location: "Bangalore",
      date: "26 Aug 25",
    },
    {
      id: "#12569",
      name: "Aarav K.",
      age: 29,
      gender: "Male",
      location: "Bangalore",
      date: "26 Aug 25",
    },
  ];

  return (
    <div className="flex h-screen bg-pink-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-y-auto px-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              User Management
            </h1>
            <p className="text-gray-500 mb-8">
              Monitor, manage, and keep your platform safe.
            </p>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  Pending Profile Approvals
                </h2>
             
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-gray-800 text-white text-sm">
                      <th className="p-3 rounded-l-lg">Profile ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Age</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Date Joined</th>
                      <th className="p-3 rounded-r-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingProfiles.map((profile, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-b-0 hover:bg-pink-50 transition-colors"
                      >
                        <td className="p-3 text-gray-700">
                          <input type="checkbox" className="mr-2" />
                          {profile.id}
                        </td>
                        <td className="p-3 text-gray-700">{profile.name}</td>
                        <td className="p-3 text-gray-700">{profile.age}</td>
                        <td className="p-3 text-gray-700">{profile.gender}</td>
                        <td className="p-3 text-gray-700">{profile.location}</td>
                        <td className="p-3 text-gray-700">{profile.date}</td>
                        <td className="p-3">
                          <div className="flex gap-3 flex-wrap">
                            <button className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition whitespace-nowrap">
                              Approve
                            </button>
                            <button className="text-green-700 font-medium hover:underline whitespace-nowrap">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default UserManagement

import React, { useEffect, useState } from 'react'
import AdminNavbar from '../AdminComponents/AdminNavbar';
import AdminSidebar from '../AdminComponents/AdminSidebar';
import { FaCreditCard, FaEye, FaUser } from "react-icons/fa";
import AssignPlanModal from "../AdminComponents/AssignPlanModal";
import { useNavigate } from "react-router-dom";
import { listAllUsersApi, updateUserStatusApi } from "../../Services/allApi";
import Swal from "sweetalert2";
import { IoSearch } from 'react-icons/io5';
import { useAuth } from '../../AuthContext/AuthContext';

function UserManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { admin } = useAuth();
      const token = admin?.token



  const getAllUsersList = async (currentPage = page, currentSearch = searchTerm) => {
    
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const reqBody = { page: currentPage, limit, search: currentSearch };
      const result = await listAllUsersApi(reqHeader, reqBody);
      console.log(result);

      const usersOnly = result?.data?.data?.filter(user => user.u_role === "user");
      setUserData(usersOnly);

      setTotalPages(result?.data?.pagination?.totalPages || 1);
      setPage(currentPage);
    } catch (error) {
      console.log(error);
    }
  };


  //for navigation to user profile view
  const userProfileView = (u_id) => {
    console.log("userid on user management :::", u_id);
    navigate('/user-profileView', { state: { userId: u_id } });

  }

  const updateUserStatus = async (u_id) => {
    
    try {
      console.log("update user status :::", u_id);
      const payload = { user_id: u_id };
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await updateUserStatusApi(reqHeader, payload);
      console.log(result);
      // Update local state to reflect the toggle
      setActiveStatus(prev => ({
        ...prev,
        [u_id]: !prev[u_id]
      }));
      if (result?.data?.result === true) {
        await Swal.fire({
          title: 'User Status Updated!',
          text: 'The user’s status has been updated successfully.',
          icon: 'success',
          iconColor: '#E33183',
          confirmButtonText: 'OK',
        });
        getAllUsersList()
      } else {
        Swal.fire({
          title: 'User Status Updation Failed',
          text: result?.data?.message || 'Unable to update user status. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }

    } catch (error) {
      Swal.fire({
        title: 'Something went wrong',
        text: 'Unable to update user status. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  }



  const calculateAge = (dob) => {
    if (!dob) return null;

    const birthDate = new Date(dob);   // "2025-09-17T04:07:10.000Z"
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // adjust if birthday hasn't happened yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getAllUsersList(1, searchTerm);
    }, 500); // waits for user to stop typing

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);



  return (
    <div className="flex h-screen bg-pink-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar onSearchChange={setSearchTerm} onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className="flex-1 overflow-y-auto px-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              User Management
            </h1>
            <p className="text-gray-500 mb-8">
              Monitor, manage, and keep your platform safe.
            </p>

            <div className="flex items-center justify-center pb-8">
              <div className="relative flex-1 max-w-[450px] block md:hidden">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border-2 border-gray-300 pl-6 pr-12 py-3 focus:outline-none text-gray-600"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer"
                  onClick={() => getAllUsersList(1, searchTerm)} // manual trigger on click
                >
                  <IoSearch className="text-[17px]" />
                </div>
              </div>
            </div>



            {/* User management table */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                  User Management
                </h2>

              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-800 text-white text-sm">
                      <th className="p-3 rounded-l-lg whitespace-nowrap">Profile ID</th>
                      <th className="p-3 whitespace-nowrap">Name</th>
                      <th className="p-3 whitespace-nowrap">Profile picture</th>
                      <th className="p-3 whitespace-nowrap">Age</th>
                      <th className="p-3 whitespace-nowrap">Gender</th>
                      <th className="p-3 whitespace-nowrap">Location</th>
                      <th className="p-3 whitespace-nowrap">Date Joined</th>
                      <th className="p-3 rounded-r-lg whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]" >
                    {userData.map((profile, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-b-0 hover:bg-pink-50 transition-colors"
                      >
                        <td className="p-3 text-gray-700 whitespace-nowrap">ITM{profile.u_id}</td>
                        <td className="p-3 text-gray-700 whitespace-nowrap">{profile.u_firstname} {profile.u_lastname}</td>
                        <td className="p-3 text-gray-700 whitespace-nowrap">
                          {profile.u_profile_pic ? (
                            <img
                              className="sm:w-20 sm:h-20 w-15 h-15 object-cover rounded-xl"
                              src={`https://lunarsenterprises.com:6050${profile.u_profile_pic}`}
                              alt="Profile"
                            />
                          ) : (
                            <div className="sm:w-20 sm:h-20 w-15 h-15 flex items-center justify-center bg-gray-300 rounded-xl text-white text-2xl">
                              <FaUser />
                            </div>
                          )}

                        </td>
                        <td className="p-3 text-gray-700 whitespace-nowrap">{calculateAge(profile.u_dob)}</td>
                        <td className="p-3 text-gray-700 whitespace-nowrap">{profile.u_gender}</td>
                        <td className="p-3 text-gray-700 whitespace-nowrap">{profile.u_district ? profile.u_district : "Not specified"}</td>
                        <td className="p-3 text-gray-700 whitespace-nowrap">
                          {new Date(profile.u_created_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short", // use "long" for full month name
                            year: "numeric"
                          })}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center  gap-4 flex-nowrap">
                            {/* Toggle */}
                            <div className="flex flex-col items-center gap-1 shrink-0">
                              <span
                                className={`text-sm font-medium ${profile.u_status === "active" ? "text-green-600" : "text-gray-600"}`}
                              >
                                {profile.u_status === "active" ? "Active" : "Inactive"}
                              </span>
                              <button
                                onClick={() => updateUserStatus(profile.u_id)}
                                className={`relative w-14 h-7 flex items-center rounded-full p-1 transition-colors ${profile.u_status === "active" ? "bg-green-500" : "bg-gray-400"
                                  }`}
                              >
                                <span
                                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${profile.u_status === "active" ? "translate-x-7" : "translate-x-0"
                                    }`}
                                ></span>
                              </button>

                            </div>

                            {/* View Button */}
                            <button onClick={() => userProfileView(profile.u_id)} className="bg-gray-400 hover:bg-gray-500 font-sm py-[9px] px-4 rounded-lg text-white whitespace-nowrap shrink-0 transition-colors duration-300 ">
                              <div className="flex items-center justify-center gap-2">
                                <FaEye />
                                <span className="text-[14px]">View</span>
                              </div>
                            </button>

                            {/* Activate Button */}
                            <button onClick={() => {
                              setSelectedUser(profile); // pass clicked user
                              setIsModalOpen(true); // open modal
                            }} className=" bg-[#E33183] hover:bg-pink-700 font-sm py-[9px] px-4 rounded-lg text-white whitespace-nowrap shrink-0 transition-colors duration-300">
                              <div className="flex items-center justify-center gap-2">
                                <FaCreditCard />
                                <span className="text-[14px]">Activate Plan</span>
                              </div>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => getAllUsersList(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 hover:bg-[#E33183] bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => getAllUsersList(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-200 hover:bg-[#E33183] rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </main>

        </div>
      </div>

      <AssignPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={selectedUser}
      />
    </div>
  )
}

export default UserManagement

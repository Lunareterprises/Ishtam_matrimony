import React, { useEffect, useState } from 'react'
import AdminSidebar from '../AdminComponents/AdminSidebar'
import AdminNavbar from '../AdminComponents/AdminNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { deleteSuccessStoriesApi, HandleSuccessStoriesApi, listSuccessStoriesApi } from '../../Services/allApi'
import Swal from 'sweetalert2'
import { MdOutlineHourglassEmpty } from 'react-icons/md'
import { FiInbox } from 'react-icons/fi'
import DoubleHearts from '../../assets/DoubleHearts.png';
import { useAuth } from '../../AuthContext/AuthContext'


function AdminSuccessStories() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [successStoryData, setSuccessStoryData] = useState([])
    const navigate = useNavigate();
    const {admin} = useAuth();
           const token = admin?.token


    //for listing success stories 
    const listSuccessStory = async () => {
        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const result = await listSuccessStoriesApi(reqHeader)
            setSuccessStoryData(result.data.data)
            console.log("success story data :::", result);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        listSuccessStory()
    }, [])


    //for approving success stories 
    const approveSuccessstories = async (ss_id) => {
        console.log("Inside approve success stories ");
      
        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                story_id: ss_id,
                status: "approved"
            }
            const result = await HandleSuccessStoriesApi(reqHeader, reqBody);
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Story Approved!',
                    text: 'Success story approved successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                listSuccessStory()
            } else {
                Swal.fire({
                    title: 'Story rejection Failed',
                    text: result?.data?.message || 'Unable to approve story. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Something went wrong',
                text: 'Unable to approve story. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });

        }
    }

    //for approving success stories 
    const rejectSuccessstories = async (ss_id) => {
        console.log("Inside approve success stories ");
        

        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                story_id: ss_id,
                status: "rejected"
            }
            const result = await HandleSuccessStoriesApi(reqHeader, reqBody);
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Story Rejected!',
                    text: 'Success story rejected successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                listSuccessStory()
            } else {
                Swal.fire({
                    title: 'Story rejection Failed',
                    text: result?.data?.message || 'Unable to reject story. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
            console.log(result);
        }
        catch (error) {
            Swal.fire({
                title: 'Something went wrong',
                text: 'Unable to reject story. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    }

    //for deleting success stories 
    const deleteSuccessStories = async (ss_id) => {
        console.log("Successs story data ::", ss_id);
        try {
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            const reqBody = {
                story_id: ss_id
            }
            const result = await deleteSuccessStoriesApi(reqHeader, reqBody);
            console.log(result);
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Story Deleted!',
                    text: 'Success story Deleted successfully.',
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                listSuccessStory()
            } else {
                Swal.fire({
                    title: 'Story deletion Failed',
                    text: result?.data?.message || 'Unable to delete story. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        }
        catch (error) {
            Swal.fire({
                title: 'Something went wrong',
                text: 'Unable to reject story. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    }

    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 flex-col overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Success stories in Review
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Stories awaiting your approval for homepage display
                        </p>

                        <div className='flex justify-start items-start' >
                            <div className="flex flex-wrap gap-6 py-2 w-full">
                                {successStoryData.filter(item => item.ss_status === "pending").length > 0 ?
                                    successStoryData
                                        .filter(item => item.ss_status === "pending")
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="w-full sm:max-w-[400px] md:max-w-[380px] lg:max-w-[320px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                            >
                                                <div className="relative overflow-hidden group">
                                                    <img
                                                        src={`https://lunarsenterprises.com:6050${item.ss_image}`}
                                                        alt={item.name}
                                                        className="w-80 h-70 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    <div className="absolute top-4 right-4 bg-[#E33183] text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-lg">
                                                        PENDING
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                                                        {item.bride_firstname} & {item.groom_firstname}
                                                    </h2>
                                                    <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3 italic">
                                                        {item.ss_story.length > 200
                                                            ? `${item.ss_story.substring(0, 200)}...`
                                                            : item.ss_story}
                                                    </p>
                                                    <button onClick={() => navigate('/admin-successStoryView', { state: { storyData: item } })} >
                                                        <button className="text-left text-pink-600 hover:text-pink-700 font-semibold text-sm transition-colors flex items-center pb-2 gap-2">
                                                            Read Full Story →
                                                        </button>
                                                    </button>

                                                    <div className='flex flex-col gap-3 pt-4 border-t border-gray-200'>
                                                        <div className='flex gap-3 w-full'>
                                                            <button onClick={() => approveSuccessstories(item.ss_id)} className="flex-1 bg-[#E33183] hover:bg-pink-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                                                                Approve
                                                            </button>
                                                            <button onClick={() => rejectSuccessstories(item.ss_id)} className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    : (
                                        <div className="flex flex-col items-center text-gray-400 justify-center py-20 w-full">
                                            <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                                            <p>No pending success stories.</p>
                                        </div>
                                    )}
                            </div>

                        </div>

                        <div className='py-20' >
                            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                                Manage success stories
                            </h1>
                            <p className="text-gray-500 mb-8">
                                Remove stories currently featured on the homepage
                            </p>

                            <div className='flex justify-start items-start' >
                                <div className="flex flex-wrap gap-6 py-2  w-full">
                                    {successStoryData.filter(item => item.ss_status === "approved").length > 0 ?
                                        successStoryData
                                            .filter(item => item.ss_status === "approved")
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full sm:max-w-[400px] md:max-w-[380px] lg:max-w-[320px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                                                >
                                                    <div className="relative overflow-hidden group">
                                                        <img
                                                            src={`https://lunarsenterprises.com:6050${item.ss_image}`}
                                                            alt={item.name}
                                                            className="w-80 h-70 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                    </div>
                                                    <div className="p-6">
                                                        <h2 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                                                            {item.bride_firstname} & {item.groom_firstname}
                                                        </h2>
                                                        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3 italic">
                                                            {item.ss_story.length > 200
                                                                ? `${item.ss_story.substring(0, 200)}...`
                                                                : item.ss_story}
                                                        </p>
                                                        <button onClick={() => navigate('/admin-successStoryView', { state: { storyData: item } })}  >
                                                            <button className="text-left text-pink-600 hover:text-pink-700 font-semibold text-sm transition-colors flex items-center pb-2 gap-2">
                                                                Read Full Story →
                                                            </button>
                                                        </button>

                                                        <div className='flex flex-col items-center justify-center gap-3 pt-4 border-t border-gray-200'>
                                                            <button onClick={() => deleteSuccessStories(item.ss_id)} className='bg-[#f82222] hover:bg-[#bc1e1e] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md'  >
                                                                Delete from success stories
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        : (
                                            <div className="flex flex-col items-center text-gray-400 justify-center py-20 w-full">
                                                <img src={DoubleHearts} alt="" className="h-6 mb-2" />
                                                <p>Approved stories are currently empty</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AdminSuccessStories

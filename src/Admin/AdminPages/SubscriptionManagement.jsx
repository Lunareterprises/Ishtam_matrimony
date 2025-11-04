import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminComponents/AdminNavbar';
import AdminSidebar from '../AdminComponents/AdminSidebar';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FiUploadCloud } from 'react-icons/fi';
import { BsBalloonHeart, BsQrCode } from 'react-icons/bs';
import addStoryImg from '../../assets/addStoryImg.png';
import DoubleHearts from '../../assets/DoubleHearts.png';
import { addNewSubscriptionPlanApi, getSubscriptionPlanApi } from '../../Services/allApi';
import Swal from 'sweetalert2';
import EditSubscriptionPlanModal from '../AdminComponents/EditSubscriptionPlanModal';
import AdminSubscriptionPlanCards from '../AdminComponents/AdminSubscriptionPlanCards';

function SubscriptionManagement({ plans: subscriptionPlans }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [plans, setPlans] = useState([]);
    const [planData, setPlanData] = useState({
        name: "",
        price: "",
        duration: "",
        contact_limit: "",
    });
    const [flippedIndex, setFlippedIndex] = useState(null);

    // For editing subscription plan
    const [viewEditModal, setViewEditModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleEditClick = (plan) => {
        setSelectedPlan(plan);
        setViewEditModal(true);
    };

    const handleCloseModal = () => {
        setViewEditModal(false);
        setSelectedPlan(null);
    };

    const addSubscriptionPlan = async (planData) => {
        console.log("Plan data ::", planData); // Console log for planData
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await addNewSubscriptionPlanApi(reqHeader, planData);
            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Plan Added Successfully!',
                    text: `The "${planData.name}" subscription plan has been added.`,
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                selectedPlan({
                    name: "",
                    price: "",
                    duration: "",
                    contact_limit: "",
                })
                getSubscriptionPlan();
            } else {
                Swal.fire({
                    title: 'Failed to Add Plan',
                    text: 'Unable to add the subscription plan. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Failed',
                text: 'Something went wrong, please try again!',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };

    // For fetching subscription plan data
    const getSubscriptionPlan = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const reqHeader = { Authorization: `Bearer ${token}` };
            const result = await getSubscriptionPlanApi(reqHeader);
            console.log("API Result:", result); // Log the full result
            if (result?.data?.data) {
                setPlans(result.data.data); // Set plans from API response
                console.log("Fetched Plans:", result.data.data); // Log fetched plans
            } else {
                console.log("No plans data found in response");
                setPlans([]); // Fallback to empty array if no data
            }
        } catch (error) {
            console.log("Error fetching plans:", error);
        }
    };

    useEffect(() => {
        getSubscriptionPlan();
    }, []);

    // State-based increment/decrement for add form
    const updateDuration = (delta) => {
        setPlanData(prev => ({
            ...prev,
            duration: Math.max(1, (parseInt(prev.duration) || 0) + delta).toString()
        }));
    };

    const updateContactLimit = (delta) => {
        setPlanData(prev => ({
            ...prev,
            contact_limit: Math.max(1, (parseInt(prev.contact_limit) || 0) + delta).toString()
        }));
    };

    return (
        <div className="flex h-screen bg-pink-50 overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminNavbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex flex-1 overflow-hidden">
                    <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                    <main className="flex-1 overflow-y-auto px-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            Subscription Plans
                        </h1>
                        <p className="text-gray-500 mb-8">
                            Monitor, manage, and keep your platform safe.
                        </p>
                        <div className='pt-5'>
                            <form className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-6">
                                <div className='flex flex-col items-center justify-center gap-2'>
                                    <img src={DoubleHearts} width={33} alt="" />
                                    <h2 className="text-2xl font-bold text-center text-pink-600">
                                        Add New Subscription Plan
                                    </h2>
                                </div>

                                {/* SINGLE ROW - Groom, Bride, Date */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
                                    {/* Plan Name */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Plan Name
                                        </label>
                                        <input
                                            value={planData.name}
                                            onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                                            type="text"
                                            placeholder="Enter New Plan Name"
                                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    {/* Subscription Price */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Subscription Price
                                        </label>
                                        <input
                                            value={planData.price}
                                            onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                                            type="text"
                                            placeholder="Enter the Price for This Plan"
                                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    {/* Plan Duration with increment/decrement */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Plan Duration (Months)
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full px-2">
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => updateDuration(-1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                placeholder="Enter Duration"
                                                min={1}
                                                value={planData.duration}
                                                onChange={(e) => setPlanData({ ...planData, duration: e.target.value })}
                                                className="w-full text-center p-2 focus:ring-2 focus:ring-pink-400 outline-none"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => updateDuration(1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contact Limit with increment/decrement */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">
                                            Contact Limit
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full px-2">
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => updateContactLimit(-1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                placeholder="Enter Contact Limit"
                                                value={planData.contact_limit}
                                                onChange={(e) => setPlanData({ ...planData, contact_limit: e.target.value })}
                                                min={1}
                                                className="w-full text-center p-2 focus:ring-2 focus:ring-pink-400 outline-none"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
                                                onClick={() => updateContactLimit(1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className='flex items-center justify-center pt-5'>
                                    <button onClick={() => addSubscriptionPlan(planData)}
                                        type="button"
                                        className="px-5 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition"
                                    >
                                        Confirm and Add Plan
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className='py-20' >
                            <h2 className="text-2xl font-semibold text-gray-800 ">
                                Active Plans
                            </h2>
                            <p className="text-gray-500">
                                All active plans currently available on Ishtam Marry
                            </p>
                            <div className="flex flex-col sm:items-start items-center w-full">
                                <div className="grid gap-6 py-10 px-4 
                grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3 
                sm:justify-items-start justify-items-center">
                                    {plans.map((plan, index) => (
                                        <AdminSubscriptionPlanCards
                                            key={index}
                                            plan={plan}
                                            flipped={flippedIndex === index}
                                            onFlip={() => setFlippedIndex(index)}
                                            onBack={() => setFlippedIndex(null)}
                                            onEdit={() => handleEditClick(plan)}
                                            onDeleteSuccess={getSubscriptionPlan}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {viewEditModal && (
                <EditSubscriptionPlanModal
                    isOpen={viewEditModal}
                    onClose={handleCloseModal}
                    plan={selectedPlan}
                    onUpdateSuccess={getSubscriptionPlan}
                />
            )}
        </div>
    );
}

export default SubscriptionManagement;
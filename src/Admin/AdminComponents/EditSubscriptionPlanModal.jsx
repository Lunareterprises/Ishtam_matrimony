import React, { useEffect, useState } from 'react'
import DoubleHearts from '../../assets/DoubleHearts.png';
import { editSubscriptionPlanApi } from '../../Services/allApi';
import Swal from 'sweetalert2';
import { useAuth } from '../../AuthContext/AuthContext';

function EditSubscriptionPlanModal({ onClose, plan, onUpdateSuccess }) {
    const [planData, setPlanData] = useState({
        name: plan.p_name,
        price: plan.p_price,
        duration: plan.p_duration,
        contact_limit: plan.p_contact_limit,
    });
    const { admin } = useAuth();
    const token = admin?.token

    useEffect(() => {
        console.log("Plan :::", plan);
    }, [])

    // State-based increment/decrement to avoid DOM manipulation
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


    // for closing the modal
    const handleCancel = () => {
        if (onClose) onClose();
    };


    const editSubscriptionPlan = async (p_id) => {
        try {
            console.log("pid :::", p_id);

            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };
            console.log("plan data:::", planData);
            const reqBody = {
                plan_id: p_id,
                name: planData.name,
                price: planData.price,
                duration: planData.duration,
                contact_limit: planData.contact_limit
            }
            const result = await editSubscriptionPlanApi(reqHeader, reqBody);
            console.log("result", result);

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Plan updated Successfully!',
                    text: `The "${planData.name}" subscription plan has been updated.`,
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });
                if (onClose) onClose();
                //for re rendering subscriptionManagement Page
                if (onUpdateSuccess) onUpdateSuccess();
            } else {
                Swal.fire({
                    title: 'Failed to edit  Add Plan',
                    text: 'Unable to update the subscription plan. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Failed',
                text: 'Something went wrong, please try again!',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    }



    return (
        <div className='fixed inset-0 flex items-center justify-center z-40 px-4'>
            {/* Blurred Backdrop for Closing */}
            <div
                className="absolute inset-0 bg-opacity-50 backdrop-blur-xs"
                onClick={handleCancel}
            ></div>

            <form className="relative w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-6">
                <div className='flex flex-col items-center justify-center gap-2'>
                    <img src={DoubleHearts} width={33} alt="" />
                    <h2 className="text-2xl font-bold text-center text-pink-600">
                        Edit Subscription Plan
                    </h2>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
                    {/* Plan Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Plan Name</label>
                        <input
                            type="text"
                            value={planData.name}
                            onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                            placeholder="Enter New Plan Name"
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Subscription Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Subscription Price</label>
                        <input
                            type="text"
                            value={planData.price}
                            onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                            placeholder="Enter the Price for This Plan"
                            className="w-full border text-gray-700 border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Plan Duration */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Plan Duration (Months)</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full px-2">
                            <button type="button" className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => updateDuration(-1)}>-</button>
                            <input
                                type="number"
                                value={planData.duration}
                                onChange={(e) => setPlanData({ ...planData, duration: e.target.value })}
                                min={1}
                                placeholder="Enter Duration"
                                className="w-full text-center p-2 focus:ring-2 focus:ring-pink-400 outline-none"
                            />
                            <button type="button" className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => updateDuration(1)}>+</button>
                        </div>
                    </div>

                    {/* Contact Limit */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Contact Limit</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full px-2">
                            <button type="button" className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => updateContactLimit(-1)}>-</button>
                            <input
                                type="number"
                                value={planData.contact_limit}
                                onChange={(e) => setPlanData({ ...planData, contact_limit: e.target.value })}
                                min={1}
                                placeholder="Enter Contact Limit"
                                className="w-full text-center p-2 focus:ring-2 focus:ring-pink-400 outline-none"
                            />
                            <button type="button" className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={() => updateContactLimit(1)}>+</button>
                        </div>
                    </div>
                </div>

                {/* Buttons - Responsive Layout */}
                <div className='flex flex-col sm:flex-row gap-3 items-center justify-center pt-5'>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full sm:w-54 py-2 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition"
                    >
                        Cancel Editing
                    </button>
                    <button
                        type="button"
                        onClick={() => editSubscriptionPlan(plan.p_id)}
                        className="w-full sm:w-54 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition"
                    >
                        Confirm and Edit Plan
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditSubscriptionPlanModal;
import React, { useEffect, useState } from 'react'
import { FaPen, FaQrcode } from 'react-icons/fa'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { IoArrowBack, IoTrashBin } from 'react-icons/io5'
import EditSubscriptionPlanModal from './EditSubscriptionPlanModal'
import { LuIndianRupee } from "react-icons/lu";
import { deleteSubscriptionPlanApi } from '../../Services/allApi'
import Swal from 'sweetalert2'



function AdminSubscriptionPlanCards({ plan, flipped, onFlip, onBack, onEdit, onDeleteSuccess }) {
    useEffect(() => {
        console.log("plan data :::", plan);
    })


    const deleteSubscriptionPlan = async (p_id, planName) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This Plan will be permanently deleted.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#E33183",
                cancelButtonColor: "#aaa",
                confirmButtonText: "Yes, delete it!",
            });

            if (!confirm.isConfirmed) return;

            const token = sessionStorage.getItem("token");
            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const reqBody = { plan_id: p_id };


            const result = await deleteSubscriptionPlanApi(reqHeader, reqBody);
            console.log("result for delete sub plan", result);

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Plan Deleted Successfully!',
                    text: `The subscription plan has been deleted.`,
                    icon: 'success',
                    iconColor: '#E33183',
                    confirmButtonText: 'OK',
                });

                if (onDeleteSuccess) onDeleteSuccess();
            } else {
                Swal.fire({
                    title: 'Failed to Delete Plan',
                    text: result?.data?.message || 'Unable to delete the subscription plan. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Failed to Delete Plan',
                text: 'An unexpected error occurred. Please try again.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
        }
    };


    return (
        <div className="w-full md:w-72 [perspective:1000px]">
            <div
                className={`relative w-auto h-100 transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [backface-visibility:hidden] flex flex-col gap-4">
                    <div className="text-center p-5 border-b border-gray-200">
                        <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border-1 border-[#5A0A1D] rounded-[8px]">
                            {plan.p_name}
                        </h2>
                    </div>
                    <div className=" flex flex-col gap-1 text-center">
                        <div className='flex items-center justify-center gap-1' >
                            <h3 className="text-[40px] font-medium text-[#5A0A1D]">
                                {plan.p_price}
                            </h3>
                            <LuIndianRupee className="text-[35px] font-medium text-[#5A0A1D]" />
                        </div>
                        <p className="text-[14px] text-gray-500">{plan.p_duration} Months</p>
                        <div className='flex items-center justify-center gap-2' >
                            <IoIosCheckmarkCircleOutline className="text-[#E33183] text-xl" />
                            <p>{plan.p_contact_limit} Contact limit</p>
                        </div>
                    </div>

                    <div className="pt-2 pb-5 px-6 flex flex-col gap-3">
                        <button
                            onClick={onFlip}
                            className="w-full py-2 rounded-md font-semibold bg-[#E33183] text-white transition-colors hover:bg-pink-700 flex items-center justify-center gap-2"
                        >
                            <FaQrcode /> View QR
                        </button>
                        <button
                            onClick={onEdit}
                            className="w-full py-2 rounded-md font-semibold bg-[#ff6a00] hover:bg-[#c65300] text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <FaPen /> Edit Plan
                        </button>
                        <button onClick={() => deleteSubscriptionPlan(plan.p_id)}
                            className="w-full py-2 rounded-md font-semibold bg-[#f82222] hover:bg-[#bc1e1e]  text-white transition-colors flex items-center justify-center gap-2"
                        >
                            <IoTrashBin /> Delete Plan
                        </button>
                    </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-white rounded-lg border border-[#5A0A1D] shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center p-6">
                    <div className="mb-4 flex flex-col items-center">
                        <FaQrcode className="text-5xl text-[#5A0A1D] mb-2" />
                        <p className="text-[#5A0A1D] font-semibold text-center">
                            Scan to Pay for {plan.name} Plan
                        </p>
                    </div>
                    <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                        <FaQrcode className="text-6xl text-[#5A0A1D]" />
                    </div>
                    <button
                        onClick={onBack}
                        className="mt-4 px-4 py-2 rounded-md bg-[#E33183] text-white flex items-center gap-2 hover:bg-pink-700"
                    >
                        <IoArrowBack /> Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSubscriptionPlanCards
import React from 'react'
import { FaPen } from 'react-icons/fa'
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'
import { IoTrashBin } from 'react-icons/io5'
import { LuIndianRupee } from "react-icons/lu"
import Swal from 'sweetalert2'
import { deleteSubscriptionPlanApi } from '../../Services/allApi'
import { useAuth } from '../../AuthContext/AuthContext'

function AdminSubscriptionPlanCards({ plan, onEdit, onDeleteSuccess }) {
    const { admin } = useAuth();
    const token = admin?.token

    const deleteSubscriptionPlan = async (p_id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "This plan will be permanently deleted.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#E33183",
                cancelButtonColor: "#aaa",
                confirmButtonText: "Yes, delete it!",
            });

            if (!confirm.isConfirmed) return;


            const reqHeader = {
                Authorization: `Bearer ${token}`,
            };

            const reqBody = { plan_id: p_id };

            const result = await deleteSubscriptionPlanApi(reqHeader, reqBody);
            console.log("result for delete sub plan", result);

            if (result?.data?.result === true) {
                await Swal.fire({
                    title: 'Plan Deleted Successfully!',
                    text: 'The subscription plan has been deleted.',
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
        <div className=" w-[250px] bg-white rounded-xl border border-[#5A0A1D] shadow-md p-5 flex flex-col justify-between transition-transform hover:scale-[1.02]">
            {/* Plan Title */}
            <div className="text-center border-b border-gray-200 pb-3 mb-3">
                <h2 className="inline-block px-4 py-1 font-semibold text-[#5A0A1D] border border-[#5A0A1D] rounded-md text-lg">
                    {plan.p_name}
                </h2>
            </div>

            {/* Plan Details */}
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center justify-center gap-1">
                    <LuIndianRupee className="text-[28px] text-[#5A0A1D]" />
                    <h3 className="text-[36px] font-medium text-[#5A0A1D]">{plan.p_price}</h3>
                </div>
                <p className="text-sm text-gray-500">{plan.p_duration} Months</p>

                <div className="flex items-center justify-center gap-2">
                    <IoIosCheckmarkCircleOutline className="text-[#E33183] text-xl" />
                    <p className="text-gray-700">{plan.p_contact_limit} Contact limit</p>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3">
                <button
                    onClick={onEdit}
                    className="w-full py-2 rounded-md font-semibold bg-[#ff6a00] hover:bg-[#c65300] text-white transition-colors flex items-center justify-center gap-2"
                >
                    <FaPen /> Edit Plan
                </button>
                <button
                    onClick={() => deleteSubscriptionPlan(plan.p_id)}
                    className="w-full py-2 rounded-md font-semibold bg-[#f82222] hover:bg-[#bc1e1e] text-white transition-colors flex items-center justify-center gap-2"
                >
                    <IoTrashBin /> Delete Plan
                </button>
            </div>
        </div>
    )
}

export default AdminSubscriptionPlanCards

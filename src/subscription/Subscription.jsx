import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import DashboardHeader from "../Components/DashboardHeader";
import ChatMessages from "../Components/ChatMessages";
import DashboardNav from "../Components/DashboardNav";
import SubscriptionPlanCards from "./SubscriptionPlanCards";
import { fetchSubscriptionPlanApi } from "../Services/allApi";
import { useAuth } from "../AuthContext/AuthContext";

function Subscription() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [plans, setPlans] = useState([]);
  const { user } = useAuth();
  const token = user?.token

  const fetchSubscrptionPlans = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const result = await fetchSubscriptionPlanApi(reqHeader);
      console.log("fetch subscription plan :::", result);
      setPlans(result.data.data);
    } catch (error) {
      console.log(error);
      setPlans([]); // fallback
    }
  };

  useEffect(() => {
    console.log("hi monee");
    fetchSubscrptionPlans()
  }, [])


  return (
    <div className="flex">
      <div className="hidden lg:block w-64">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-white z-50 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <DashboardNav />
        <div className="flex flex-col justify-center">
          <DashboardHeader />
          <div className="flex w-full md:pl-10 sm:px-0 px-2 py-10 sm:py-20">
            <div className="max-w-[1200px] w-full px-4 sm:px-10">
              {/* Pricing Plans */}
              <div className="grid gap-6 py-20 sm:py-10 px-4 
  grid-cols-1 
  md:grid-cols-2 
  xl:grid-cols-3 
  sm:justify-items-start justify-items-center">

                {plans.length > 0 ? (
                  plans.map((plan, index) => (
                    <SubscriptionPlanCards
                      key={index}
                      plan={plan}
                      flipped={flippedIndex === index}
                      onFlip={() => setFlippedIndex(index)}
                      onBack={() => setFlippedIndex(null)}
                    />
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p>No Plans Available</p>
                  </div>
                )}

              </div>

            </div>
            <ChatMessages />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;

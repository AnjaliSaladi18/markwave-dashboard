import { useState } from "react";
import { useSelector } from "react-redux";

import Referral from "./Referral";
import VerifiedUsers from "./VerifiedUsers";
import Products from "./Products";
import Navbar from "../../components/Navbar/Navbar";
import DotLoader from "../../components/DotLoader";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;

  const [activeTab, setActiveTab] = useState("Referral");
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
      setActiveTab(tab);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-900 text-black dark:text-white animate-fadeIn px-4 sm:px-6 lg:px-12">

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center pt-8 sm:pt-6 text-[#00878a]">
        Markwave Dashboard
      </h1>

      {/* FULL-WIDTH NAVBAR */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* TAB CONTENT */}
      <div className="mt-6 w-full">
        {loading ? (
          < DotLoader/>
        ) : (
          <>
            {activeTab === "Referral" && <Referral />}
            {activeTab === "Verified Users" && <VerifiedUsers />}
            {activeTab === "Products" && role === "SUPERADMIN" && <Products />}
          </>
        )}
      </div>

    </div>
  );
};

export default Dashboard;

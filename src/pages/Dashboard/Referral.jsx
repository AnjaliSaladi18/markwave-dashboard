import { useState } from "react";
import { useSelector } from "react-redux";
import AddUserModal from "../../components/Referral/AddUserModal";
import ReferralTable from "../../components/Referral/ReferralTable";

export default function Referral() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterName, setFilterName] = useState("");
  const [sort, setSort] = useState("");

  // GET REFERRALS FROM REDUX
  const referrals = useSelector((state) => state.referrals.items);

  // UNIQUE REFERRER LIST
  const referrers = [...new Set(referrals.map((r) => r.referredBy))];

  return (
    <div className="pb-5 bg-white dark:bg-[#0f172a] min-h-screen animate-fadeIn px-3 sm:px-6 lg:px-10">

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 text-[#00878a]">
        Referrals
      </h2>

      {/* SEARCH + FILTER + SORT + ADD BUTTON */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 w-full flex-wrap">

        {/* SEARCH */}
        <input
          className="border border-gray-700 px-3 py-2 rounded w-[300px] dark:border-gray-400 dark:bg-slate-900 dark:text-gray-200"
          placeholder="🔍︎ Search by name or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* FILTER + SORT + ADD BUTTON */}
        <div className="flex gap-3 flex-wrap justify-center">

          {/* FILTER */}
          <select
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border border-black px-3 py-2 rounded w-[150px] sm:w-[200px] 
                       text-gray-600 dark:border-gray-400 dark:bg-slate-900 dark:text-gray-300"
          >
            <option value="">All Referrers</option>
            {referrers.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-black px-3 py-2 rounded w-[150px] sm:w-[200px] 
                       text-gray-600 dark:border-gray-400 dark:bg-slate-900 dark:text-gray-300"
          >
            <option value="">Sort By</option>
            <option value="firstName">Name</option>
            <option value="mobile">Mobile</option>
            <option value="aadhar">Aadhar</option>
            <option value="dob">DOB</option>
            <option value="referredBy">Referrer Name</option>
          </select>

          {/* ADD REFERRAL BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2 bg-[#00878a] text-white rounded-md font-medium 
                       hover:scale-105 transition-all duration-300 btn-glow"
          >
            Add Referral
          </button>

        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="w-full max-w-[1080px] mx-auto overflow-x-auto shadow-xl">
        <ReferralTable query={search} filterName={filterName} sort={sort} />
      </div>

      {/* MODAL */}
      <AddUserModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

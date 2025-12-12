import { useState } from "react";
import { useSelector } from "react-redux";
import VerifiedTable from "../../components/Verified/VerifiedTable";

export default function VerifiedUsers() {
  const users = useSelector((state) => state.verifiedUsers.users);

  const [search, setSearch] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="flex flex-col items-center pb-5 bg-white dark:bg-[#0f172a] min-h-screen animate-fadeIn ">

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-5 text-[#00878a]">
        Verified Users
      </h2>

      {/* SEARCH + FILTER + SORT */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-6 w-full px-3">

        {/* SEARCH */}
        <input
          className="border border-gray-700 px-3 py-2 rounded w-[300px] 
                     dark:border-gray-400 text-sm sm:text-base dark:bg-slate-900 dark:text-gray-300"
          placeholder="🔍︎ Search by name or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3"> 
          {/* FILTER VERIFIED */}
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="border border-black px-3 py-2 rounded sm:w-[200px] w-[145px]
                     text-gray-600 text-sm sm:text-base dark:border-gray-400 dark:bg-slate-900 dark:text-gray-400"
          >
            <option value="">All Users</option>
            <option value="Yes">Verified Only</option>
            <option value="No">Not Verified</option>
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-black px-3 py-2 rounded sm:w-[200px] w-[145px]
                     text-gray-600 text-sm sm:text-base dark:border-gray-400 dark:bg-slate-900 dark:text-gray-400"
          >
            <option value="">Sort By</option>
            <option value="firstName">First Name</option>
            <option value="mobile">Mobile</option>
            <option value="formFilled">Form Filled</option>
            <option value="verified">Verified</option>
          </select>
        </div>

      </div>

      {/* TABLE */}
      <div className=" w-full max-w-[1080px] mx-auto shadow-xl">
        <VerifiedTable
          users={users}
          search={search}
          verifiedFilter={verifiedFilter}
          sort={sort}
        />
      </div>

    </div>
  );
}

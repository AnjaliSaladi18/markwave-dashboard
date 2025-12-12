import { useMemo, useState, useEffect } from "react";

export default function VerifiedTable({
  users,
  search,
  verifiedFilter,
  sort,
}) {
  // -----------------------------
  // FILTER + SORT (memoized)
  // -----------------------------
  const filteredUsers = useMemo(() => {
    let list = [...users];

    if (search.trim() !== "") {
      list = list.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()) ||
          u.mobile.includes(search)
      );
    }

    if (verifiedFilter) {
      list = list.filter((u) => u.verified === verifiedFilter);
    }

    if (sort) {
      list.sort((a, b) => {
        const A = a[sort] || "";
        const B = b[sort] || "";
        return A.localeCompare(B);
      });
    }

    return list;
  }, [users, search, verifiedFilter, sort]);

  // -----------------------------
  // ⭐ PAGINATION
  // -----------------------------
  const [page, setPage] = useState(1);
  const pageSize = 4; // show 5 entries per page

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Reset page when filter/search/sort changes
  useEffect(() => {
    setPage(1);
  }, [search, verifiedFilter, sort]);

  return (
    <div className="w-full overflow-x-auto px-2 sm:px-0 shadow-xl">

      <table className="min-w-[900px] w-full text-center bg-white dark:bg-[#1f2937] dark:text-gray-300 rounded-xl text-sm sm:text-base">
        
        {/* HEADER */}
        <thead className="bg-[#eef2f7] dark:bg-[#1b2a41] dark:text-gray-300 text-xs sm:text-sm">
          <tr>
            <th className="px-3 py-4">First Name</th>
            <th className="px-3 py-4">Last Name</th>
            <th className="px-3 py-4">Mobile</th>
            <th className="px-3 py-4">Form Filled</th>
            <th className="px-3 py-4">Referred By</th>
            <th className="px-3 py-4">Referrer Mobile</th>
            <th className="px-3 py-4">Verified</th>
          </tr>
        </thead>

        {/* ROWS */}
        <tbody>
          {paginatedUsers.map((u, i) => (
            <tr
              key={i}
              className="
                odd:bg-white even:bg-[#f9fafb] 
                dark:odd:bg-[#111827] dark:even:bg-[#1f2937]
                transition-colors duration-150 
                hover:bg-[#e6f7f7] dark:hover:bg-[#243447]
              "
            >
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.firstName}</td>
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.lastName}</td>
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.mobile}</td>
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.formFilled}</td>
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.referredBy}</td>
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.refMobile}</td>
              <td className="px-3 py-2 sm:py-3 border-b dark:border-gray-700">{u.verified}</td>
            </tr>
          ))}
        </tbody>

      </table>

      {/* -------------------------
          PAGINATION CONTROLS
      -------------------------- */}
      <div className="flex justify-center items-center gap-3 py-4">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 rounded border border-gray-500 ${
            page === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-200 dark:hover:bg-[#243447]"
          }`}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-[#00878a] text-white"
                : "hover:bg-gray-200 dark:hover:bg-[#243447]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={`px-3 py-1 rounded border border-gray-500 ${
            page === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-200 dark:hover:bg-[#243447]"
          }`}
        >
          Next
        </button>
      </div>

    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import {
  updateReferral,
  removeReferral,
} from "../../features/referrals/referralsSlice";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useState, useEffect } from "react";

export default function ReferralTable({ query, filterName, sort }) {
  const dispatch = useDispatch();
  const referrals = useSelector((state) => state.referrals.items);

  const [filtered, setFiltered] = useState([]);

  // Editing
  const [editingId, setEditingId] = useState(null);
  const [temp, setTemp] = useState({});

  // Delete modal
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: "",
  });

  // -----------------------------
  // ⭐ Pagination
  // -----------------------------
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedData = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Reset page when search/filter/sort changes
  useEffect(() => {
    setPage(1);
  }, [query, filterName, sort]);

  // -----------------------------
  // FILTER + SORT
  // -----------------------------
  useEffect(() => {
    let list = [...referrals];

    if (query) {
      list = list.filter(
        (r) =>
          r.firstName.toLowerCase().includes(query.toLowerCase()) ||
          r.mobile.includes(query)
      );
    }

    if (filterName) {
      list = list.filter((r) => r.referredBy === filterName);
    }

    if (sort) {
      list.sort((a, b) => {
        const A = a[sort] || "";
        const B = b[sort] || "";
        return A < B ? -1 : A > B ? 1 : 0;
      });
    }

    setFiltered(list);
  }, [referrals, query, filterName, sort]);

  // -----------------------------
  // Editing Handlers
  // -----------------------------
  const startEdit = (row) => {
    setEditingId(row.id);
    setTemp({ ...row });
  };

  const saveEdit = () => {
    dispatch(updateReferral({ id: editingId, changes: temp }));
    setEditingId(null);
  };

  return (
    <div className="w-full mx-auto rounded-xl overflow-hidden shadow-xl bg-white dark:bg-[#1f2937]">

      {/* TABLE */}
      <table className="w-full text-center dark:text-gray-300">
        <thead className="bg-[#eef2f7] dark:bg-[#1b2a41] font-medium dark:text-gray-300">
          <tr>
            <th className="px-2 py-4 text-sm">Name</th>
            <th className="px-2 py-4 text-sm">Mobile</th>
            <th className="px-2 py-4 text-sm">Aadhar</th>
            <th className="px-2 py-4 text-sm">DOB</th>
            <th className="px-2 py-4 text-sm">Referred By</th>
            <th className="px-2 py-4 text-sm">Referrer Mobile</th>
            <th className="px-2 py-4 text-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              className="dark:odd:bg-[#111827] dark:even:bg-[#1f2937] odd:bg-white even:bg-[#f9fafb] transition-colors hover:bg-[#e6f7f7] dark:hover:bg-[#243447]"
            >
              {/* NAME */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                {editingId === row.id ? (
                  <div className="flex gap-2 justify-center">
                    <input
                      value={temp.firstName}
                      onChange={(e) =>
                        setTemp({ ...temp, firstName: e.target.value })
                      }
                      className="border px-2 py-1 w-[110px] dark:bg-[#111827] dark:border-gray-400 rounded-md"
                    />
                    <input
                      value={temp.lastName}
                      onChange={(e) =>
                        setTemp({ ...temp, lastName: e.target.value })
                      }
                      className="border px-2 py-1 w-[110px] dark:bg-[#111827] dark:border-gray-400 rounded-md"
                    />
                  </div>
                ) : (
                  row.firstName + " " + row.lastName
                )}
              </td>

              {/* MOBILE */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                {row.mobile}
              </td>

              {/* AADHAR */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                {editingId === row.id ? (
                  <input
                    value={temp.aadhar}
                    onChange={(e) =>
                      setTemp({
                        ...temp,
                        aadhar: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="border px-2 py-1 w-[130px] dark:bg-[#111827] dark:border-gray-400 rounded-md"
                  />
                ) : (
                  row.aadhar
                )}
              </td>

              {/* DOB */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                {editingId === row.id ? (
                  <input
                    type="date"
                    value={temp.dob}
                    onChange={(e) => setTemp({ ...temp, dob: e.target.value })}
                    className="border px-2 py-1 w-[130px] dark:bg-[#111827] dark:border-gray-400 rounded-md"
                  />
                ) : (
                  row.dob
                )}
              </td>

              {/* REFERRED BY */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                {editingId === row.id ? (
                  <input
                    value={temp.referredBy}
                    onChange={(e) =>
                      setTemp({ ...temp, referredBy: e.target.value })
                    }
                    className="border px-2 py-1 w-[120px] dark:bg-[#111827] dark:border-gray-400 rounded-md"
                  />
                ) : (
                  row.referredBy
                )}
              </td>

              {/* REFERRER MOBILE */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                {editingId === row.id ? (
                  <input
                    value={temp.refMobile}
                    onChange={(e) =>
                      setTemp({
                        ...temp,
                        refMobile: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="border px-2 py-1 w-[130px] dark:bg-[#111827] dark:border-gray-400 rounded-md"
                  />
                ) : (
                  row.refMobile
                )}
              </td>

              {/* ACTIONS */}
              <td className="px-2 py-3 border-b dark:border-gray-700">
                <div className="flex justify-center gap-2">
                  {editingId === row.id ? (
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-green-200 dark:bg-green-500 dark:text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEdit(row)}
                      className="px-3 py-1 bg-gray-200 dark:bg-[#374151] rounded hover:scale-105"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setDeleteModal({
                        open: true,
                        id: row.id,
                        name: `${row.firstName} ${row.lastName}`,
                      })
                    }
                    className="px-3 py-1 bg-red-200 text-red-700 dark:bg-red-500 dark:text-white rounded hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -------------------------
          PAGINATION CONTROLS
      -------------------------- */}
      <div className="flex justify-center items-center gap-3 py-4">

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

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDeleteModal
        open={deleteModal.open}
        name={deleteModal.name}
        onClose={() => setDeleteModal({ open: false })}
        onConfirm={() => {
          dispatch(removeReferral(deleteModal.id));
          setDeleteModal({ open: false });
        }}
      />
    </div>
  );
}

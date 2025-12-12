import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReferral } from "../../features/referrals/referralsSlice";
import { addVerifiedUser } from "../../features/verifiedusers/verifiedUsersSlice";

const MIN_AGE = 21;

export default function AddUserModal({ open, onClose }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    aadhar: "",
    dob: "",
    referredBy: "",
    refMobile: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({
        firstName: "",
        lastName: "",
        mobile: "",
        aadhar: "",
        dob: "",
        referredBy: "",
        refMobile: "",
      });
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const e = {};

    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile";
    if (!/^\d{12}$/.test(form.aadhar)) e.aadhar = "Aadhar must be 12 digits";

    if (!form.dob) e.dob = "DOB required";
    else {
      const age =
        new Date().getFullYear() - new Date(form.dob).getFullYear();
      if (age < MIN_AGE) e.dob = "Must be 21+ years old";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(addReferral(form));

    const formFilled = Math.random() < 0.5 ? "Yes" : "No";
    const verified = formFilled === "Yes" ? "Yes" : "No";

    dispatch(
      addVerifiedUser({
        firstName: form.firstName,
        lastName: form.lastName,
        mobile: form.mobile,
        formFilled,
        referredBy: form.referredBy,
        refMobile: form.refMobile,
        verified,
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center z-50 p-5">
      <div className="bg-white dark:bg-[#1f2937] dark:text-gray-200 w-[90%] sm:w-[420px] p-4 rounded-xl shadow-xl relative modal-zoom">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-600 dark:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-[#00878a] dark:text-[#4dd0d0] mb-3">
          Add Referral
        </h2>

        <form onSubmit={submitForm} className="space-y-2">

          {/* NAME ROW (side by side) */}
          <div className="flex gap-2">
            {/* First Name */}
            <div className="w-1/2">
              <label className="block text-sm mb-1 dark:text-gray-300 font-medium">
                First Name:
              </label>
              <input
                className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
                dark:border-gray-600 dark:text-gray-200"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="w-1/2">
              <label className="font-medium block text-sm mb-1 dark:text-gray-300">
                Last Name:
              </label>
              <input
                className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
                dark:border-gray-600 dark:text-gray-200"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="font-medium block text-sm mb-1 dark:text-gray-300">
              Mobile:
            </label>
            <input
              className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
              dark:border-gray-600 dark:text-gray-200"
              placeholder="10-digit mobile"
              maxLength={10}
              value={form.mobile}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })
              }
            />
            {errors.mobile && (
              <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Aadhar */}
          <div>
            <label className="font-medium block text-sm mb-1 dark:text-gray-300">
              Aadhar:
            </label>
            <input
              className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
              dark:border-gray-600 dark:text-gray-200"
              placeholder="12-digit Aadhar"
              maxLength={12}
              value={form.aadhar}
              onChange={(e) =>
                setForm({ ...form, aadhar: e.target.value.replace(/\D/g, "") })
              }
            />
            {errors.aadhar && (
              <p className="text-red-400 text-xs mt-1">{errors.aadhar}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="font-medium block text-sm mb-1 dark:text-gray-300">
              Date of Birth:
            </label>
            <input
              type="date"
              className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
              dark:border-gray-600 dark:text-gray-200"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
            {errors.dob && (
              <p className="text-red-400 text-xs mt-1">{errors.dob}</p>
            )}
          </div>

          {/* Referred By */}
          <div>
            <label className="font-medium block text-sm mb-1 dark:text-gray-300">
              Referred By:
            </label>
            <input
              className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
              dark:border-gray-600 dark:text-gray-200"
              placeholder="Referrer Name"
              value={form.referredBy}
              onChange={(e) =>
                setForm({ ...form, referredBy: e.target.value })
              }
            />
          </div>

          {/* Referrer Mobile */}
          <div>
            <label className="font-medium block text-sm mb-1 dark:text-gray-300">
              Referrer Mobile:
            </label>
            <input
              className="border p-2 rounded-lg w-full text-sm bg-white dark:bg-[#374151] 
              dark:border-gray-600 dark:text-gray-200"
              placeholder="10-digit mobile"
              maxLength={10}
              value={form.refMobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  refMobile: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 
              rounded-lg font-medium text-sm hover:scale-105 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-[#00878a] dark:bg-[#0d999c] text-white 
              rounded-lg font-medium text-sm hover:scale-105 transition btn-glow"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

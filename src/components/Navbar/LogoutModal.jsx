import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ open, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!open) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); 
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-slate-700 dark:text-gray-200 p-6 rounded-xl w-[350px] shadow-xl transition modal-zoom">

        <h2 className="text-lg font-semibold text-center text-[#00878a] dark:text-[#4dd0d0] mb-3">
          Confirm Logout
        </h2>

        <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 
                       dark:bg-slate-500 dark:text-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-[#00878a] dark:bg-[#0d999c] 
                       text-white rounded btn-glow"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

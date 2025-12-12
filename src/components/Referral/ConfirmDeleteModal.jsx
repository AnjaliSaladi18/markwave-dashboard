export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  name,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-xl w-[380px] modal-zoom">

        <h2 className="text-xl font-semibold mb-4 text-center text-[#00878a]">
          Delete Referral?
        </h2>

        <p className="text-center text-gray-700 mb-6 dark:text-gray-300">
          Are you sure you want to delete
          <span className="font-semibold text-black"> {name} </span>?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-slate-500"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-[#00878a] text-white rounded btn-glow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

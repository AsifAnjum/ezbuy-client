import { useEffect } from "react";

const PermissionModal = ({ confirm }) => {
  useEffect(() => {
    // Automatically show modal when the component is mounted
    document.getElementById("permission_modal").showModal();
  }, []);

  return (
    <>
      {/* Modal structure */}
      <dialog id="permission_modal" className="modal">
        <div className="relative modal-box">
          {/* Close button inside the modal */}
          <form method="dialog">
            <button
              onClick={() => confirm(false)}
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="flex flex-col items-center justify-center gap-6 py-6">
            <p className="text-xl font-bold">Are You Sure?</p>
            <p className="text-xs text-error">
              Once you proceed, this action cannot be reversed.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => confirm(true)}
                className="text-white btn btn-error"
              >
                Yes
              </button>
              <button
                onClick={() => confirm(false)}
                className="text-white btn btn-success"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default PermissionModal;

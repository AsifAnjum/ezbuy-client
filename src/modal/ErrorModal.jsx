const ErrorModal = () => {
  return (
    <>
      {/* Modal structure */}
      <dialog id="error_modal" className="modal">
        <div className="relative modal-box">
          {/* Close button inside the modal */}
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <p className="p-4 text-xl font-semibold">
            Something Went Wrong. Please Try Again!
          </p>
        </div>
        {/* Add the modal-backdrop to allow closing by clicking outside */}
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
};

export default ErrorModal;

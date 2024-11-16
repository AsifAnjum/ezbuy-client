import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { usePostProductReviewMutation } from "../redux/features/product/productApi";

const ReviewModal = ({ confirm, productId }) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");

  const [postProductReview, { isLoading, isSuccess, error, reset, isError }] =
    usePostProductReviewMutation();

  useEffect(() => {
    // Automatically show modal when the component is mounted

    document.getElementById("review_modal").showModal();
  }, [reset]);

  let errorContent;
  if (isError) {
    if (error.status === 409) {
      errorContent = "You have already reviewed this product";
    } else if (error.status === 403) {
      errorContent = "You are not authorized to review this product";
    } else if (error.status === 401) {
      errorContent = "You must be logged in to review this product";
    } else {
      errorContent = "An error occurred. Please try again later";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRating) {
      postProductReview({
        id: productId,
        data: { rating: userRating, comment },
      });
    }
  };
  return (
    <dialog id="review_modal" className="modal">
      <div className="relative modal-box">
        {/* Close button inside the modal */}
        <form method="dialog">
          <button
            onClick={() => confirm(false)}
            className="absolute text-error right-6 top-5"
          >
            ✕
          </button>
        </form>

        {isSuccess ? (
          <p className="font-serif text-xl tracking-wider text-green-500">
            Thank you for your review!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Your Rating:
              </label>
              <div className="flex star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="focus:outline-none"
                  >
                    <TiStarFullOutline
                      className={`w-6 h-6 ${
                        star <= userRating
                          ? "fill-yellow-400 "
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Your Review:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed "
            >
              <span className={`${isLoading ? "animate-pulse" : ""}`}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </span>
            </button>

            <p className="text-error">{errorContent}</p>
          </form>
        )}
      </div>
    </dialog>
  );
};
export default ReviewModal;

import { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const [resetPassword, { isLoading, isSuccess, error, isError }] =
    useResetPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({ email });
  };

  let errorContent;
  if (isError) {
    if (error.status === 404) {
      errorContent = error.data.message;
    } else {
      errorContent = "An error occurred. Please try again later";
    }
  }

  return (
    <div className="flex items-center justify-center my-36">
      <div className="p-6 rounded-lg shadow-lg w-96 bg-base-100">
        {isSuccess ? (
          <div className="font-mono text-center">
            <FaRegEnvelope className="inline text-success" size={40} />
            <h2 className="mb-2 text-2xl font-bold text-base-content">
              Check Your Email
            </h2>
            <p className="text-base-content/70">
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox or spam and follow the instructions to
              reset your password.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="mb-6 font-mono text-2xl font-bold text-base-content">
              Reset Your Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="profile-input"
                />
              </div>
              {/* {error && <p className="mb-4 text-sm text-error">{error}</p>} */}
              <button
                type="submit"
                disabled={isLoading}
                className="text-white btn btn-error btn-block disabled:pointer-events-none disabled:bg-error disabled:text-white"
              >
                {isLoading ? (
                  <span className="animate-pulse">Resetting... </span>
                ) : (
                  "Reset Password"
                )}
              </button>
              {errorContent && (
                <p className="mt-4 text-sm text-error">{errorContent}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default ResetPassword;

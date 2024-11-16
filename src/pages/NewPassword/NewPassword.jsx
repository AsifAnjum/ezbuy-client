import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useGetResetPasswordTokenQuery,
  useUpdatePasswordMutation,
} from "../../redux/features/auth/authApi";
import { useState, useRef, useEffect } from "react";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, error, isSuccess } =
    useGetResetPasswordTokenQuery(token, {
      skip: token.length !== 64,
    });

  const [
    updatePassword,
    {
      isLoading: updateLoading,
      isError: updateIsError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdatePasswordMutation();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errorContent, setErrorContent] = useState("");
  const passwordsRef = useRef({
    password: "",
    confirmPassword: "",
  });

  const toggleShowPass = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    passwordsRef.current = {
      ...passwordsRef.current,
      [name]: value,
    };

    if (passwordsRef.current.password.length < 6) {
      //
    } else if (
      passwordsRef.current.password !== passwordsRef.current.confirmPassword
    ) {
      setErrorContent("Password don't match");
    } else {
      setErrorContent("");
      //
    }
  };

  useEffect(() => {
    if (updateIsSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 10000);
    }

    return () => clearTimeout();
  }, [updateIsSuccess, navigate]);

  if (token.length !== 64) {
    return <Navigate to="/new-password" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = passwordsRef.current;
    if (password !== confirmPassword) {
      setErrorContent("Password don't match");
    } else if (password.length < 6) {
      setErrorContent("Password must be at least 6 characters long");
    } else {
      setErrorContent("");
      updatePassword({ token, data: { password, confirmPassword } });
    }
  };

  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-col w-full gap-10">
        <div className="w-48 h-6 skeleton"></div>
        <div className="w-full h-10 rounded-md skeleton"></div>
        <div className="w-full h-10 rounded-md skeleton"></div>
        <div className="w-full h-10 rounded-md skeleton"></div>
      </div>
    );
  } else if (isError) {
    content = <div>{error.data.message}</div>;
  } else if (isSuccess) {
    content = (
      <div>
        <h2 className="mb-6 font-mono text-2xl font-bold text-base-content">
          New Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4 form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword.password ? "text" : "password"}
              placeholder="New Password"
              className="profile-input"
              autoComplete="off"
              onChange={handlePasswordChange}
              name="password"
            />
            {!showPassword.password ? (
              <IoEyeOutline
                size={24}
                onClick={() => toggleShowPass("password")}
                className="absolute cursor-pointer right-2 bottom-3"
              />
            ) : (
              <IoEyeOffOutline
                size={24}
                onClick={() => toggleShowPass("password")}
                className="absolute cursor-pointer right-2 bottom-3"
              />
            )}
          </div>
          <div className="relative mb-4 form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="profile-input"
              autoComplete="off"
              onChange={handlePasswordChange}
              name="confirmPassword"
            />
            {!showPassword.confirmPassword ? (
              <IoEyeOutline
                size={24}
                onClick={() => toggleShowPass("confirmPassword")}
                className="absolute cursor-pointer right-2 bottom-3"
              />
            ) : (
              <IoEyeOffOutline
                size={24}
                onClick={() => toggleShowPass("confirmPassword")}
                className="absolute cursor-pointer right-2 bottom-3"
              />
            )}
          </div>
          {errorContent && <p className="form-error">{errorContent}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="text-white btn btn-error btn-block disabled:pointer-events-none disabled:bg-error disabled:text-white"
          >
            {updateLoading ? (
              <span className="animate-pulse">Updating... </span>
            ) : (
              "Update Password"
            )}
          </button>

          {updateIsError && (
            <p className="mt-4 text-sm text-error">
              Password update failed. Try again
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center my-36">
      <div className="p-6 rounded-lg shadow-lg w-96 bg-base-100">
        {updateIsSuccess ? (
          <div className="font-mono text-center">
            <h2 className="mb-2 text-2xl font-bold text-base-content">
              Password Updated
            </h2>
            <p className="text-base-content/70">
              Your password has been updated successfully. You can now login
              with your new password.
            </p>
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
};
export default NewPassword;

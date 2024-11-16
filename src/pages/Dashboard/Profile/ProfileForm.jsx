import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../../../schemas/userSchema";
import {
  useUpdateUserPasswordMutation,
  useUpdateUserProfileMutation,
} from "../../../redux/features/user/userApi";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../redux/features/auth/authSlice";

const ProfileForm = ({ user }) => {
  const { fullName, email, gender, address, contactNumber } = user || {};

  const [updateUserProfile, { isLoading, error, isSuccess, reset }] =
    useUpdateUserProfileMutation();

  const [
    updateUserPassword,
    {
      isLoading: passwordLoading,
      isSuccess: passwordSuccess,
      error: passwordError,
    },
  ] = useUpdateUserPasswordMutation();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName,
      address,
      email,
      gender,
      contactNumber,
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data) => {
    const updatedData = {};

    Object.keys(data).forEach((key) => {
      if (JSON.stringify(data[key]) !== JSON.stringify(user[key])) {
        updatedData[key] = data[key];
      }
    });
    if (Object.keys(updatedData).length === 0) {
      toast.warn("No Data Changes");
    } else {
      updateUserProfile(updatedData);
    }
  };

  //?password
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const dispatch = useDispatch();

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
      setError("password", {
        type: "manual",
        message: "Password must be at least 6 characters long",
      });
    } else {
      clearErrors("password");
    }
  };

  const handleSubmitPassword = () => {
    const { password, confirmPassword } = passwordsRef.current;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Password don't match",
      });
    } else {
      clearErrors("confirmPassword");
      updateUserPassword({ password, confirmPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile Updated Successfully");
      reset();
    }

    if (error?.data) {
      toast.error("Oops! Profile Updated Failed");
      const apiErrors = error?.data?.error?.[0]?.field;

      if (apiErrors) {
        error.data.error.forEach((err) => {
          setError(err?.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        setError("global", {
          type: "manual",
          message: error.data.message,
        });
      }
    }

    if (passwordSuccess) {
      toast.success("Password Updated Successfully");
      clearErrors("password");
      clearErrors("confirmPassword");

      passwordsRef.current = {
        password: "",
        confirmPassword: "",
      };
      dispatch(userLoggedOut());
    }
    if (passwordError?.data) {
      toast.error("Oops! Password Updated Failed");
      const apiErrors = passwordError?.data?.error?.[0]?.field;

      if (apiErrors) {
        passwordError.data.error.forEach((err) => {
          setError(err?.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        setError("password", {
          type: "manual",
          message: passwordError.data.message,
        });
      }
    }
  }, [
    error,
    isSuccess,
    setError,
    reset,
    passwordSuccess,
    passwordError,
    clearErrors,
    dispatch,
  ]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
        <label className="w-full form-control">
          <span className="mb-2 font-semibold label-text">
            Full Name<span className="text-red-500">*</span>
          </span>

          <input
            type="text"
            placeholder="Full Name"
            className="profile-input"
            {...register("fullName")}
          />

          {errors.fullName && (
            <p className="form-error">{errors.fullName.message} !!!</p>
          )}
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            Email Address<span className="text-red-500">*</span>
          </span>

          <input
            type="text"
            placeholder="Email Address"
            className="profile-input"
            {...register("email")}
          />
          {errors.email && (
            <p className="form-error">{errors.email.message} !!!</p>
          )}
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">Full Address</span>

          <input
            type="text"
            placeholder="Full Address"
            className="profile-input"
            {...register("address")}
          />
          {errors.address && (
            <p className="form-error">{errors.address.message} !!!</p>
          )}
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">Phone Number</span>

          <input
            type="tel"
            placeholder="Phone Number"
            className="profile-input"
            {...register("contactNumber")}
          />
          {errors.contactNumber && (
            <p className="form-error">{errors.contactNumber.message} !!!</p>
          )}
        </label>
        <label className="w-full form-control">
          <span className="mb-2 label-text">
            Gender<span className="text-red-500">*</span>
          </span>

          <select
            className="profile-input"
            defaultValue=""
            {...register("gender")}
          >
            <option disabled value="">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        {errors.global && (
          <p className="form-error">{errors.global.message} !!!</p>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white btn btn-error"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-10 divider divider-neutral">Update Password</div>

      <div className="mt-10 space-y-8">
        <div>
          <label className="relative w-full form-control">
            <span className="mb-2 label-text">
              New Password<span className="text-red-500">*</span>
            </span>
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
          </label>
          {errors.password && (
            <p className="form-error">{errors.password.message} !!!</p>
          )}
        </div>
        <div>
          <label className="relative w-full form-control">
            <span className="mb-2 label-text">
              Confirm Password<span className="text-red-500">*</span>
            </span>

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
          </label>
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message} !!!</p>
          )}
        </div>
        <button
          onClick={handleSubmitPassword}
          disabled={passwordLoading}
          className="w-full text-white btn btn-error"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};
export default ProfileForm;

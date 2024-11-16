import { Link } from "react-router-dom";
import img from "../../assets/Side Image.png";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signupSchema } from "../../schemas/userSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import SuccessModal from "../../modal/SuccessModal";
import GoogleLogin from "../../component/GoogleLogin/GoogleLogin";

const Signup = () => {
  const [signup, { data: signupData, error: signupError, isLoading, isError }] =
    useSignupMutation();

  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (isError) {
      toast.error("OOPS!!! Try again.");
      const apiErrors = signupError?.data?.error[0]?.field;

      if (apiErrors) {
        signupError.data.error.forEach((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        setError("global", {
          type: "manual",
          message: signupError.data.message,
        });
      }
    }

    if (signupData?.success) {
      toast.success("Successfully signed up");
      setShowModal(true);
    }
  }, [setError, signupError, signupData, isError]);

  const onSubmit = (data) => {
    signup(data);
  };

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleShowPass = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-between px-4 my-24 min-[1280px]:flex-row min-[1280px]:px-0 gap-4">
      <img
        src={img}
        loading="lazy"
        alt=""
        className="hidden min-[1280px]:block"
      />

      {/* form  */}
      <div className="w-[400px] sm:px-4 px-12">
        <p className="text-3xl font-bold sm:text-4xl">Create An Account</p>
        <p className="mt-4 font-semibold">Enter your details below</p>
        <form
          action=""
          className="mt-10 space-y-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Name*"
              className="w-full border-b-2 peer focus:placeholder-transparent placeholder- focus:outline-none focus:border-black placeholder-shown:pb-2 focus:pb-2"
              {...register("fullName")}
            />
            <label className="absolute left-0 duration-300 opacity-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:font-bold peer-focus:opacity-100">
              Name<span className="text-red-500">*</span>
            </label>
            {errors.fullName && (
              <p className="form-error">{errors.fullName.message} !!!</p>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              name="email"
              placeholder="Email*"
              className="w-full border-b-2 peer focus:placeholder-transparent placeholder- focus:outline-none focus:border-black placeholder-shown:pb-2 focus:pb-2"
              {...register("email")}
              autoComplete="off"
            />

            <label className="absolute left-0 duration-300 opacity-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:font-bold peer-focus:opacity-100">
              Email<span className="text-red-500">*</span>
            </label>

            {errors.email && (
              <p className="form-error">{errors.email.message} !!!</p>
            )}
          </div>

          <div className="relative">
            <select
              className="w-full pb-2 border-b-2 peer focus:placeholder-transparent placeholder- focus:outline-none focus:border-black"
              {...register("gender")}
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="absolute left-0 duration-300 opacity-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:font-bold peer-focus:opacity-100">
              Gender<span className="text-red-500">*</span>
            </label>
            {errors.gender && (
              <p className="form-error">{errors.gender.message} !!!</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              name="password"
              autoComplete="off"
              placeholder="Password*"
              className="w-full border-b-2 peer focus:placeholder-transparent placeholder- focus:outline-none focus:border-black placeholder-shown:pb-2 focus:pb-2"
              {...register("password")}
            />
            {!showPassword.password ? (
              <IoEyeOutline
                size={24}
                onClick={() => toggleShowPass("password")}
                className="absolute top-0 right-0 cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                size={24}
                onClick={() => toggleShowPass("password")}
                className="absolute top-0 right-0 cursor-pointer"
              />
            )}
            <label className="absolute left-0 duration-300 opacity-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:font-bold peer-focus:opacity-100">
              Password<span className="text-red-500">*</span>
            </label>

            {errors.password && (
              <p className="form-error">{errors.password.message} !!!</p>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="off"
              placeholder="Confirm Password*"
              className="w-full border-b-2 peer focus:placeholder-transparent placeholder- focus:outline-none focus:border-black placeholder-shown:pb-2 focus:pb-2"
              {...register("confirmPassword")}
            />
            {!showPassword.confirmPassword ? (
              <IoEyeOutline
                size={24}
                onClick={() => toggleShowPass("confirmPassword")}
                className="absolute top-0 right-0 cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                size={24}
                onClick={() => toggleShowPass("confirmPassword")}
                className="absolute top-0 right-0 cursor-pointer"
              />
            )}
            <label className="absolute left-0 duration-300 opacity-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:font-bold peer-focus:opacity-100">
              Confirm Password<span className="text-red-500">*</span>
            </label>

            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message} !!!</p>
            )}
          </div>

          <div className="mt-5 space-y-4">
            <button
              disabled={isLoading || Object.keys(errors).length}
              className="w-full font-bold tracking-wider text-white btn btn-error disabled:bg-slate-200"
            >
              <span className={`${isLoading ? "animate-pulse" : ""}`}>
                Create Account
              </span>
              {isLoading && (
                <span className="loading loading-dots loading-lg"></span>
              )}
            </button>
          </div>
        </form>

        <GoogleLogin message="Signup with Google" />

        <p className="mt-10 text-slate-400">
          Already Have An Account?{" "}
          <Link className="font-bold text-black underline" to="/login">
            Login
          </Link>
        </p>
      </div>

      {showModal && (
        <SuccessModal title="Your account has been successfully created. Please log in with your email and password." />
      )}
    </div>
  );
};
export default Signup;

import { Link, useNavigate, useLocation } from "react-router-dom";
import img from "../../assets/Side Image.png";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/userSchema";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import GoogleLogin from "../../component/GoogleLogin/GoogleLogin";

const Login = () => {
  const [login, { data: loginData, error: loginError, isLoading }] =
    useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const toggleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (loginError?.data) {
      toast.error("OOPS!!! Try again.");
      const apiErrors = loginError.data?.error[0]?.field;

      if (apiErrors) {
        loginError.data.error.forEach((err) => {
          setError(err.field, {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        setError("global", {
          type: "manual",
          message: loginError.data.message,
        });
      }
    }

    if (loginData?.success) {
      toast.success("Successfully Logged In");
      navigate(from, { replace: true });
    }
  }, [loginData, loginError, setError, from, navigate]);

  return (
    <div className=" flex flex-col items-center justify-between  px-4 my-24 min-[1280px]:flex-row min-[1280px]:px-0 gap-4">
      <img
        src={img}
        loading="lazy"
        alt=""
        className="hidden min-[1280px]:block"
      />

      <div className="w-[400px] sm:px-4 px-12">
        <p className="text-4xl font-bold sm:tracking-widest">Log in to EZBUY</p>
        <p className="mt-4 font-semibold">Enter your details below</p>
        <form
          action=""
          className="mt-10 space-y-12"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password*"
              autoComplete="current-password"
              className="w-full border-b-2 peer focus:placeholder-transparent placeholder- focus:outline-none focus:border-black placeholder-shown:pb-2 focus:pb-2"
              {...register("password")}
            />
            {!showPassword ? (
              <IoEyeOutline
                size={24}
                onClick={toggleShowPass}
                className="absolute top-0 right-0 cursor-pointer"
              />
            ) : (
              <IoEyeOffOutline
                size={24}
                onClick={toggleShowPass}
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

          {errors.global && (
            <p className="form-error">
              {errors?.global?.message || "An error occurred"} !!!
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between mt-5">
            <button
              type="submit"
              disabled={isLoading}
              className="font-bold tracking-widest text-white btn btn-error"
            >
              Login
            </button>
            <Link to="/reset-password" className="link link-error">
              Forget Password ?
            </Link>
          </div>
        </form>

        <GoogleLogin message="Login with Google" />

        <p className="mt-10 text-slate-400">
          New to EZBUY? &nbsp;
          <Link className="font-bold text-black underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;

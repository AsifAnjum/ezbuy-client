import { FcGoogle } from "react-icons/fc";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
} from "../../lib/reactOauthGoogle";
import { useLazyGoogleLoginQuery } from "../../redux/features/auth/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginButton = ({ message }) => {
  const [trigger, { data, isSuccess, isError }] = useLazyGoogleLoginQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      trigger(response.code);
    },
    onError: () => toast.error("Oops!!! Failed To Login"),
    flow: "auth-code",
  });

  useEffect(() => {
    if (data?.success) {
      toast.success("Successfully Logged In");
      navigate(from, { replace: true });
    }

    if (isError) {
      toast.error("Oops!!! Failed To Login");
    }
  }, [isSuccess, data, navigate, from, isError]);

  return (
    <button
      type="button"
      onClick={googleLogin}
      className="w-full mt-10 font-bold tracking-wider btn btn-outline"
    >
      <FcGoogle size={30} />
      {message}
    </button>
  );
};

const GoogleLogin = ({ message }) => {
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLoginButton message={message} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLogin;

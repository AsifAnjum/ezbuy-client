import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { tokenDecode } from "../lib/helperFunction";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.accessToken) {
        // Decode the JWT token to get the user data
        const user = tokenDecode(auth.accessToken);

        if (user) {
          dispatch(
            userLoggedIn({
              accessToken: auth.accessToken,
              user: user,
            })
          );
        }
      }
    }

    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
}

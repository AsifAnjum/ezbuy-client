import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";
import { toast, Zoom } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
    }

    if (result?.error?.originalStatus === 413) {
      toast.error("File size is too large, please upload a smaller file");
    }

    if (result?.error?.originalStatus === 504) {
      toast.error("Request Timeout, please try again later", {
        pauseOnFocusLoss: false,
        position: "top-center",
        delay: 200,
        autoClose: 2000,
        transition: Zoom,
      });
    }

    if (result?.error?.status === "FETCH_ERROR") {
      document.getElementById("error_modal").showModal();
    }

    return result;
  },
  tagTypes: [
    "Products",
    "Messages",
    "Coupons",
    "Orders",
    "User-Dashboard",
    "Staff-Dashboard",
    "Profile",
  ],
  endpoints: () => ({}),
});

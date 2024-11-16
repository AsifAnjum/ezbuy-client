import { tokenDecode } from "../../../lib/helperFunction";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.token,
            })
          );

          const user = tokenDecode(result.data.data.token);

          if (user) {
            dispatch(
              userLoggedIn({
                accessToken: result.data.data.token,
                user: user,
              })
            );
          }

          if (!["moderator", "admin"].includes(user.role)) {
            dispatch(
              apiSlice.util.invalidateTags([
                "User-Dashboard",
                "Staff-Dashboard",
                "Orders",
                "Coupons",
                "Messages",
                "Profile",
              ])
            );
            // dispatch(apiSlice.util.resetApiState())
          }
        } catch {
          //oops
        }
      },
    }),

    googleLogin: builder.query({
      query: (code) => {
        return {
          url: `/user/auth/google/callback?code=${code}`,
          method: "GET",
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.token,
            })
          );

          const user = tokenDecode(result.data.data.token);

          if (user) {
            dispatch(
              userLoggedIn({
                accessToken: result.data.data.token,
                user: user,
              })
            );
          }

          if (!["moderator", "admin"].includes(user.role)) {
            dispatch(
              apiSlice.util.invalidateTags([
                "User-Dashboard",
                "Staff-Dashboard",
                "Orders",
                "Coupons",
                "Messages",
                "Profile",
              ])
            );
            // dispatch(apiSlice.util.resetApiState())
          }
        } catch {
          //oops
        }
      },
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    getResetPasswordToken: builder.query({
      query: (token) => ({
        url: `/user/reset-password/${token}`,
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/user/reset-password/${token}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(userLoggedOut());
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLazyGoogleLoginQuery,
  useResetPasswordMutation,
  useGetResetPasswordTokenQuery,
  useUpdatePasswordMutation,
} = authApi;

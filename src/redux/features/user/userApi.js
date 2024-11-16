import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => ({
        url: `/admin/users?${query || ""}`,
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getMe", undefined, (draft) => {
              Object.assign(draft.data, { ...draft.data, ...arg });
            })
          );
        } catch {
          //
        }
      },
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: "/user/update-password",
        method: "PATCH",
        body: data,
      }),
    }),

    //!admin part
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `/admin/user/update-role/`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getUser", arg.id, (draft) => {
              Object.assign(draft.data, { ...draft.data, role: arg.role });
            })
          );
        } catch {
          //
        }
      },
    }),
    updateUserStatus: builder.mutation({
      query: (data) => ({
        url: `/admin/user/update-status/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getUser", arg.id, (draft) => {
              Object.assign(draft.data, { ...draft.data, status: arg.status });
            })
          );
        } catch {
          //
        }
      },
    }),

    userDashboardAnalytics: builder.query({
      query: () => ({
        url: `/user/dashboard-analytics`,
        method: "GET",
      }),
      providesTags: ["User-Dashboard"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useGetMeQuery,
  useUpdateUserProfileMutation,
  useUpdateUserPasswordMutation,
  useUserDashboardAnalyticsQuery,
} = userApi;

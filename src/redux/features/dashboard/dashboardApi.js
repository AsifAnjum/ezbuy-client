import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboardAnalytics: builder.query({
      query: () => ({
        url: `/admin/dashboard-analytics`,
        method: "GET",
      }),
      providesTags: ["Staff-Dashboard"],
    }),
  }),
});

export const { useDashboardAnalyticsQuery } = dashboardApi;

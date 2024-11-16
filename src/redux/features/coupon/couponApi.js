import { apiSlice } from "../api/apiSlice";

const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCoupon: builder.mutation({
      query: (data) => ({
        url: `/coupon`,
        method: "POST",
        body: data,
      }),
    }),

    getCoupons: builder.query({
      query: (query) => ({
        url: `/coupon`,
        params: query || "",
        method: "GET",
      }),
      providesTags: ["Coupons"],
    }),
    getCoupon: builder.query({
      query: (code) => ({
        url: `/coupon/${code}`,
        method: "GET",
      }),
    }),
    getCouponByStaff: builder.query({
      query: (code) => ({
        url: `/coupon/staff/${code}`,
        method: "GET",
      }),
    }),
    editCoupon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: coupon } = await queryFulfilled;

          dispatch(apiSlice.util.invalidateTags(["Coupons"]));
          dispatch(
            apiSlice.util.updateQueryData(
              "getCouponByStaff",
              coupon.data.code,
              (draft) => {
                Object.assign(draft.data, coupon.data);
              }
            )
          );
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  useAddCouponMutation,
  useGetCouponsQuery,
  useGetCouponQuery,
  useGetCouponByStaffQuery,
  useEditCouponMutation,
  useLazyGetCouponQuery,
} = couponApi;

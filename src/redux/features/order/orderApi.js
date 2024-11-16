import { apiSlice } from "../api/apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    paymentIntent: builder.mutation({
      query: (data) => ({
        url: `/order/create-payment-intent`,
        method: "POST",
        body: data,
      }),
    }),
    placeOrder: builder.mutation({
      query: (data) => ({
        url: `/order`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(apiSlice.util.invalidateTags(["Orders", "User-Dashboard"]));
        } catch {
          //
        }
      },
    }),

    getOrdersByUser: builder.query({
      query: (query) => ({
        url: "/order",
        params: query || "",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getOrdersByStaff: builder.query({
      query: (query) => ({
        url: "/admin/orders",
        params: query || "",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `admin/order/${id}`,
        method: "GET",
      }),
    }),

    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: order } = await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags(["Orders"]));

          dispatch(
            apiSlice.util.updateQueryData("getOrderById", arg.id, (draft) => {
              Object.assign(draft.data, order.data);
            })
          );
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  usePaymentIntentMutation,
  usePlaceOrderMutation,
  useGetOrdersByUserQuery,
  useGetOrdersByStaffQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = orderApi;

import { apiSlice } from "../api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `/cart`,
        method: "GET",
      }),
    }),

    addCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: cart } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
              Object.assign(draft.data, cart.data);
            })
          );
        } catch {
          //
        }
      },
    }),

    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart/update",
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: cart } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
              Object.assign(draft.data, cart.data);
            })
          );
        } catch {
          //
        }
      },
    }),

    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/cart/remove",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            draft.data.products = draft.data.products.filter(
              (product) => product.productId !== arg.productId
            );
            draft.data.totalAmount = draft.data.products
              .reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )
              .toFixed(2);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;

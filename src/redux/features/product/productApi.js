import { apiSlice } from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
    }),

    getProducts: builder.query({
      query: (query) => {
        return {
          url: `/product`,
          params: query || "",
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    getOfferProducts: builder.query({
      query: () => ({
        url: `/product/offer`,
        method: "GET",
      }),
    }),

    getBestSellingProducts: builder.query({
      query: () => ({
        url: `/product/best-seller`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: product } = await queryFulfilled;

          // cause there multiple query for getProduct,force refetch

          dispatch(apiSlice.util.invalidateTags(["Products"]));

          // dispatch(
          //   apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
          //     console.log(JSON.stringify(draft.data, null, 2));
          //     const indexToUpdate = draft.data.products.findIndex(
          //       (a) => a._id == arg.id
          //     );

          //     draft.data.products[indexToUpdate] = product.data;
          //   })
          // );

          dispatch(
            apiSlice.util.updateQueryData("getProduct", arg.id, (draft) => {
              Object.assign(draft.data, product.data);
            })
          );
        } catch {
          //
        }
      },
    }),

    editProductImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}/update-images`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getProduct", arg.id, (draft) => {
              let newImgs = [];
              for (let [, value] of arg.data.entries()) {
                const createImgUri = URL.createObjectURL(value);
                newImgs.push(createImgUri);
              }

              draft.data.imgUrls = [...draft.data.imgUrls, ...newImgs];
            })
          );
        } catch {
          //
        }
      },
    }),

    deleteProductImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}/delete-image`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getProduct", arg.id, (draft) => {
              draft.data.imgUrls.forEach((img, index) => {
                if (img === arg.data[0]) {
                  draft.data.imgUrls.splice(index, 1);
                }
              });
            })
          );
        } catch {
          //
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `admin/product/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(apiSlice.util.invalidateTags(["Products"]));
        } catch {
          //
        }
      },
    }),

    postProductReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}/review`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getProduct", arg.id, (draft) => {
              Object.assign(draft.data.averageRating, data.data);
            })
          );

          const cachedArgs = apiSlice.util.selectCachedArgsForQuery(
            getState(),
            "getProducts"
          );

          for (const cacheKey of cachedArgs) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProducts",
                cacheKey,
                (draft) => {
                  const indexToUpdate = draft.data.products.findIndex(
                    (a) => a._id == arg.id
                  );

                  draft.data.products[indexToUpdate].averageRating = data.data;
                }
              )
            );
          }

          // for (const { endpointName, originalArgs }  of apiSlice.util.selectCacheu)

          // for (const { endpointName, originalArgs } of api.util.selectInvalidatedBy(getState(), [{ type: "Post", id}])) {
          //   // we only want to update `getPosts` here
          //   if ( endpointName !== 'getPosts') continue;
          //   dispatch(
          //     api.util.updateQueryData(endpoint, originalArgs, (draft) => {
          //        // find in list & update
          //     })
          //   )
          // }
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useEditProductMutation,
  useEditProductImageMutation,
  useDeleteProductImageMutation,
  useGetOfferProductsQuery,
  useGetBestSellingProductsQuery,
  usePostProductReviewMutation,
  useDeleteProductMutation,
} = productApi;

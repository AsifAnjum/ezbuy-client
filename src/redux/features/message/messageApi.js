import { apiSlice } from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
      }),
    }),

    getMessages: builder.query({
      query: (query) => ({
        url: `/message?${query}`,
        method: "GET",
      }),
      // providesTags: ["Messages"],
      providesTags: (result) =>
        result
          ? [
              ...result.data.messages.map(({ _id }) => ({
                type: "Messages",
                id: _id,
              })),
              { type: "Messages", id: "LIST" },
            ]
          : [{ type: "Messages", id: "LIST" }],
    }),
    getMessage: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
        method: "GET",
      }),
    }),

    editMessageStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/message/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: message } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getMessage", arg.id, (draft) => {
              Object.assign(draft.data, message.data);
            })
          );
          // dispatch(apiSlice.util.invalidateTags(["Messages"]));
          const queries = apiSlice.util.selectInvalidatedBy(getState(), [
            { type: "Messages", id: "LIST" },
          ]);

          // Update all matching `getMessages` cache entries
          queries.forEach(({ originalArgs }) => {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                originalArgs,
                (draft) => {
                  const indexToUpdate = draft.data.messages.findIndex(
                    (msg) => msg._id === arg.id
                  );

                  const prevStatus = draft.data.messages[indexToUpdate].status;
                  const currentStatus = message.data.status;

                  if (prevStatus !== currentStatus) {
                    draft.data[prevStatus] -= 1;
                    draft.data[currentStatus] += 1;
                  }

                  if (indexToUpdate !== -1) {
                    draft.data.messages[indexToUpdate] = message.data;
                  }
                }
              )
            );
          });
        } catch {
          //
        }
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetMessageQuery,
  useEditMessageStatusMutation,
} = messageApi;

import { emptySplitApi } from "./emptySplit";

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: builder => ({
    getUserInfo: builder.query({
      query: userSub => `users?sub=${userSub}`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserInfoQuery } = userApi;

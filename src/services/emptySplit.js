// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Config from "react-native-config";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: Config.ONBOARD_API_URL,
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Clients",
    "User",
    "Addresses",
    "Contacts",
    "Programs",
    "Details",
    "ProgramInfo",
    "Pricing",
    "Status",
    "Approvals",
  ],
});

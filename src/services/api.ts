// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BACKEND } from "../constants";
import { stringify } from "query-string";

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: URL_BACKEND,
    paramsSerializer: (params) => {
      return stringify(params);
    },
  }),
  endpoints: () => ({}),
});

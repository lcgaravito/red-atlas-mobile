import { Listing, ListingBackend } from "../../types";
import { responseListingAdapter } from "../adapters/responseListingAdapter";
import { api } from "../api";

const listingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    listingsResidential: build.query({
      query: () => "/public/listings/",
      transformResponse: (response: { data: ListingBackend[] }): Listing[] => {
        return response.data.map((listing) => responseListingAdapter(listing));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useListingsResidentialQuery } = listingsApi;

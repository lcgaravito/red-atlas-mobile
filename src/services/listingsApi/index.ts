import { Listing, ListingBackend } from "../../types";
import { PaginationBackend } from "../../utilities";
import { responseListingAdapter } from "../adapters/responseListingAdapter";
import { api } from "../api";

const listingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    listingsResidential: build.query<
      Array<Listing>,
      { pagination: PaginationBackend; page: number }
    >({
      query: ({ pagination, page }) => {
        return {
          url: "/public/listings/",
          params: {
            page,
            count: 25,
          },
        };
      },
      transformResponse: (response: { data: ListingBackend[] }): Listing[] => {
        return response.data.map((listing) => responseListingAdapter(listing));
      },
    }),
  }),
  overrideExisting: false,
});

export const { useListingsResidentialQuery } = listingsApi;

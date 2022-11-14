import { FiltersBackendKey, Listing, ListingBackend } from "../../types";
import { PaginationBackend } from "../../utilities";
import { responseListingAdapter } from "../adapters/responseListingAdapter";
import { api } from "../api";

const listingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    listingsResidential: build.query<
      Array<Listing>,
      { pagination: PaginationBackend }
    >({
      query: ({ pagination }) => {
        return {
          url: "/public/listings/",
          params: {
            [FiltersBackendKey.page]: pagination.page,
            [FiltersBackendKey.count]: pagination.count,
          },
        };
      },
      transformResponse: (response: { data: ListingBackend[] }): Listing[] => {
        return response.data.map((listing) => responseListingAdapter(listing));
      },
    }),
    listingDetail: build.query<Listing, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/public/listings/${id}`,
        };
      },
      transformResponse: (response: { data: ListingBackend }): Listing => {
        return responseListingAdapter(response.data);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useListingsResidentialQuery, useListingDetailQuery } =
  listingsApi;

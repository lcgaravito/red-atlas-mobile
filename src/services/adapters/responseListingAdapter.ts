import { Listing, ListingBackend } from "../../types";

export const responseListingAdapter = (listing: ListingBackend): Listing => ({
  id: listing.id,
  location: listing.location,
  title: listing.title,
  url: listing.url,
  price: listing.price,
  isForRent: listing.isForRent,
  address: listing.address,
  builtArea: listing.builtArea,
  lotArea: listing?.lotArea,
  toilets: listing.toilets,
  rooms: listing.rooms,
  parkingSpaces: listing.parkingSpaces,
  buildingDate: listing.buildingDate,
  createdAt: listing.createdAt,
  descriptionText: listing.descriptionText,
  active: listing.active,
  listingSector: listing.listing_sector,
  photos: listing.photos,
  dataSource: {
    name: listing.data_source?.name,
    logoUrl: listing.data_source?.logo_url,
  },
  brokerName: listing.brokerName,
  phones: listing.phones,
  floodZone: listing.flood_zone,
});

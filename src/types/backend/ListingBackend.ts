import { ListingSector } from "../ListingSector";
import { Location } from "../Location";
import { Photo } from "../Photo";
import { AmenityBackend } from "./AmenityBackend";
import { DataSourceBackend } from "./DataSourceBackend";

export interface ListingBackend {
  id: string;
  location: Location;
  title: string;
  url: string;
  price: string;
  isForRent: boolean;
  address: string;
  builtArea: number;
  lotArea: number;
  toilets: number;
  rooms: number;
  parkingSpaces: number;
  buildingDate: Date;
  createdAt: Date;
  descriptionText: string;
  active: boolean;
  listing_sector: ListingSector;
  photos: Photo[];
  data_source: DataSourceBackend;
  listing_amenities?: AmenityBackend[];
  brokerName: string;
  phones: [];
  flood_zone: string;
}

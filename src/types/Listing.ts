import { DataSource } from "./DataSource";
import { ListingSector } from "./ListingSector";
import { Location } from "./Location";
import { Photo } from "./Photo";

export interface Listing {
  id: string;
  location: Location;
  title: string;
  url: string;
  price: string;
  isForRent: boolean;
  address: string;
  builtArea: number | null;
  lotArea: number | null;
  toilets: number;
  rooms: number;
  parkingSpaces: number;
  buildingDate: Date;
  createdAt: Date;
  descriptionText: string;
  active: boolean;
  listingSector: ListingSector;
  photos?: Photo[];
  listing_picture_url: string;
  dataSource: DataSource;
  brokerName: string;
  phones: [];
  floodZone: string;
}

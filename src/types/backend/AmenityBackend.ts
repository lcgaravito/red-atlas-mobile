export interface AmenityBackend {
  has_amenity: boolean;
  amenity_category: {
    id: number;
    name: string;
  };
}

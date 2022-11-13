import { FiltersBackendKey } from "../types";

type OffsetPaginationProps = {
  page: number;
  perPage: number;
  sortBy?: string;
  sortDirection?: string;
};

export const offsetPagination = ({
  page,
  perPage,
  sortBy,
  sortDirection,
}: OffsetPaginationProps) => {
  const filter = {
    [FiltersBackendKey.page]: page,
    [FiltersBackendKey.count]: perPage,
    [FiltersBackendKey.sort_by]: sortBy || null,
    [FiltersBackendKey.order]: sortDirection || null,
  };
  return filter;
};

export type PaginationBackend = ReturnType<typeof offsetPagination>;

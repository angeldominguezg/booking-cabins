import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  // FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  const [field, direction] = sortByRaw.split("-");

  // SORT
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: {data: bookings, count} = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({filter, sortBy, page}),
  });

  return { isLoading, bookings, count, error };
}
import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {

  const {bookings, isLoading} = useRecentBookings();
  const {stays, confirmedStays, isLoadingStays} = useRecentStays();

  if(isLoading || isLoadingStays) return <Spinner />

  // console.log("Bookings", bookings);
  // console.log("Stays", stays);
  // console.log("ConfirmedStays", confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>
        Statistics
      </div>
      <div>
        Today's Activity
      </div>
      <div>
        Chart Stays duration
      </div>
      <div>
        Chart Sales
      </div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
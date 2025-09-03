import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";


function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  // 1- Number Of bookigns
  const numberOgbookigns = bookings.length;

  // 2- Sales
  const sales = confirmedStays?.reduce((acc, stay) => {
    return acc + stay.totalPrice;
  }, 0);

  //check ins
  const checkIns = confirmedStays?.length;

  //occupancy rate
  const occupancyRate = confirmedStays?.reduce((acc, cur) => {
    return acc + cur.numNights;
  }, 0) / (numDays * numCabins);


  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numberOgbookigns}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;

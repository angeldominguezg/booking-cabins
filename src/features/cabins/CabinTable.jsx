import styled from "styled-components";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   /* grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr; */
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [serchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if(!cabins.length) return <Empty resourceName="cabins" />


  // 1) Filter Logic
  const filterValue = serchParams.get("discount") || "all";
  // console.log("CabinTable", filterValue);

  let filteredCabins = cabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  }

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2) Sort Logic
  const sortBy = serchParams.get("sortBy") || "startDate-asc";
  console.log("CabinTable", sortBy.split("-"));

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  console.log("filteredCabins", filteredCabins);

  // Sort Without modifier
  // const sortedCabins = filteredCabins.sort((a, b) => {
  //   if (direction === 'asc') {
  //     return a[field] > b[field] ? 1 : -1;
  //   } else {
  //     return a[field] < b[field] ? 1 : -1;
  //   }
  // })

  // Sort With Modifier
  const sortedCabins = filteredCabins
    .slice()
    .sort(
      (a, b) =>
        (typeof a[field] === "string"
          ? a[field].localeCompare(b[field])
          : a[field] - b[field]) * modifier
    );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* <Table.Body>
        {cabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </Table.Body> */}

        {/* Here I'm applying the render props pattern */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

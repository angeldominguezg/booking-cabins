import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        filterOptions={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperations;

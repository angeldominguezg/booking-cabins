import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    async function fetchCabins() {
      try {
        const data = await getCabins();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCabins();
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://mmbmwaytrjwsfgarltjz.supabase.co/storage/v1/object/public/cabins-images//cabin-001.jpg" alt="" />
    </Row>
  );
}

export default Cabins;

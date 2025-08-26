import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {isLoading, booking, error} = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const {checkout, isCheckout} = useCheckout();
  const { deleteBooking, isDeleting: isDeletingBooking } = useDeleteBooking();



  if (isLoading || isDeletingBooking || isCheckout) return <Spinner />;

  const {id, status} = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

    function handleDeleteBooking(id) {
      deleteBooking(id, {onSuccess: () => navigate("/bookings")});
    }


  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
         {
            status === "unconfirmed" &&
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check In
            </Button>
          }
          {
            status === "checked-in" &&
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(id)}
              disabled={isCheckout}
            >
              Check Out
            </Button>
          }
          <Modal>
            <Modal.Open opens="delete">

              <Button
                variation="danger"
                icon={<HiTrash />}
                onClick={() => handleDeleteBooking(id)}
                disabled={isDeletingBooking}
              >
                Delete
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Booking"
                onConfirm={() => handleDeleteBooking(id)}
                disabled={isDeletingBooking}
              />
            </Modal.Window>
          </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

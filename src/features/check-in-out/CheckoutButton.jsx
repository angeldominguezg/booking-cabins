import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const {checkout, isCheckout} = useCheckout();
  
  function handleCheckout() {
    checkout(bookingId);
  }


  return (
    <Button variation="primary" size="small" disabled={isCheckout} onClick={handleCheckout}>
      {!isCheckout ? "Check out" : <SpinnerMini />}
    </Button>
  );
}

export default CheckoutButton;

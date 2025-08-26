import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: checkout, isLoading: isCheckout} = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { 
        status: "checked-out"
      }), 

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Check-out successfully!`);
      queryClient.invalidateQueries({ active: true }); // invalidate all the queries current on this page
      // navigate("/");
    },

    onError: (err) => toast.error(err.message),
  });

  return { checkout, isCheckout };
}

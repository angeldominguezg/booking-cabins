import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate: checkin, isLoading: isCheckin} = useMutation({
    mutationFn: ({bookingId, breakfast}) =>
      updateBooking(bookingId, { 
        status: "checked-in", 
        isPaid: true,
        ...breakfast,
      }), 

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} Check-in successfully!`);
      queryClient.invalidateQueries({ active: true }); // invalidate all the queries current on this page
      navigate("/");
    },

    onError: (err) => toast.error(err.message),
  });

  return { checkin, isCheckin };
}

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking as updateBookingAPI, deleteBooking as deleteBookingAPI, deleteBookingAddOns as deleteBookingAddOnsAPI } from "../services/apiBookings";

export function useDeleteBooking() {
    const { isLoading, mutate: deleteBooking } = useMutation({
        mutationFn: ({reservationId}) => deleteBookingAPI({reservationId}),
        onSuccess: () => {
            toast.success("Booking has been deleted successfully")
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })
    return { isLoading, deleteBooking };
}

export function useDeleteBookingAddOns() {
    const { isLoading, mutate: deleteBookingAddOns } = useMutation({
        mutationFn: ({reservationId}) => deleteBookingAddOnsAPI({reservationId}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })
    return { isLoading, deleteBookingAddOns };
}

export function useCancelBooking() {
    const { isLoading, mutate: cancelBooking } = useMutation({
        mutationFn: ({reservationId, status='cancelled'}) => updateBookingAPI({reservationId, status}),
        onSuccess: () => {
            toast.success("Booking has been Cancelled successfully")
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })
    return { isLoading, cancelBooking };
}
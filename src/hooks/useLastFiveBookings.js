
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import {useDispatch} from 'react-redux';
import { getLast5Bookings } from "../services/apiBookings";
export function useGetLastFiveBookings() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getFiveBookings } = useMutation({
        mutationFn: () => getLast5Bookings(),
        onSuccess: (bookings) => {
            dispatch({ type: 'setFiveBooking', payload: bookings.data })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getFiveBookings }
}   

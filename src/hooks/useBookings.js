import { getBookings as getbookingsAPI, updateBooking as updateBookingAPI,getCustomerAllBookings as getAllCustomerBookingsAPI} from "../services/apiBookings";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import {useDispatch} from 'react-redux';
export function useBookings() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getBookings } = useMutation({
        mutationFn: () => getbookingsAPI(),
        onSuccess: (bookings) => {
            dispatch({ type: 'setbookings', payload: bookings })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getBookings }
}   

export function useUpdateStatus() {
    const { isLoading, mutate: updateBookingStatus } = useMutation({
        mutationFn: ({status, reservationId}) => updateBookingAPI({status, reservationId}),
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, updateBookingStatus }
}   

export function getAllCustomerBookings() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getAllCustomerBooking } = useMutation({
        mutationFn: ({customerId}) => getAllCustomerBookingsAPI({customerId}),
        onSuccess: (bookings) => {
            dispatch({ type: 'setCustomerAllBookings', payload: bookings })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getAllCustomerBooking }
}   

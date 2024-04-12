import { useDispatch } from "react-redux";
import { getCabins as getCabinsAPI, deleteCabin as deleteCabinAPI, createEditCabin as createCabinAPI} from "../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
export function useGetRooms() {
    const dispatch = useDispatch()
    const { isLoading, mutate: getRooms } = useMutation({
        mutationFn: () => getCabinsAPI(),
        onSuccess: (rooms) => {
            dispatch({ type: 'setAllRooms', payload: rooms })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, getRooms }
}  

export function useDeleteRooms() {
    const dispatch = useDispatch()
    const { isLoading, mutate: deleteRooms } = useMutation({
        mutationFn: ({customerId}) => deleteCabinAPI({customerId}),
        onSuccess: (bookings) => {
            dispatch({ type: 'setCustomerAllBookings', payload: bookings })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, deleteRooms }
}  

export function useCreateRooms() {
    const dispatch = useDispatch()
    const { isLoading, mutate: createRoom } = useMutation({
        mutationFn: ({customerId}) => createCabinAPI({customerId}),
        onSuccess: (bookings) => {
            dispatch({ type: 'setCustomerAllBookings', payload: bookings })
           
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message)
        }
    })

    return { isLoading, createRoom }
}  